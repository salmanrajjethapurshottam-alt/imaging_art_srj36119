import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { CaseStudyItem } from './data/caseStudies';
import {
  getPrintTiers,
  type LanguageCode,
  type ThemeMode,
} from './i18n/translations';
import { VideoEngineManager } from './engine/videoManager';
import {
  clampZ,
  computeZonePresentation,
  dampValue,
  findNearestZone,
  MIN_Z,
  resolveScrollStep,
  SPATIAL_ZONES,
} from './utils/spatialScroll';
import { ThreeWorldCanvas } from './components/ThreeWorldCanvas';
import { IntroPreloader } from './components/IntroPreloader';
import { HeaderNav } from './components/HeaderNav';
import { BottomDock } from './components/BottomDock';
import { HeroZone } from './components/HeroZone';
import { PrintTierCard } from './components/PrintTierCard';
import { ClientsCaseStudiesZone } from './components/ClientsCaseStudiesZone';
import { QuoteStudioZone } from './components/QuoteStudioZone';
import { TierInspectorModal } from './components/TierInspectorModal';
import { CaseStudyModal } from './components/CaseStudyModal';
import { ImageLightbox, type LightboxImageItem, type LightboxState } from './components/ImageLightbox';
import { MediaStudioModal } from './components/MediaStudioModal';

function shouldSkipIntroOnLoad(): boolean {
  if (typeof window === 'undefined') return false;
  const params = new URLSearchParams(window.location.search);
  return params.get('autostart') === '1' || params.get('skipIntro') === '1';
}

function getInitialLang(): LanguageCode {
  if (typeof window === 'undefined') return 'en';
  const paramLang = new URLSearchParams(window.location.search).get('lang');
  if (paramLang === 'sw' || paramLang === 'en') return paramLang;
  try {
    const stored = window.localStorage.getItem('ia-lang');
    return stored === 'sw' ? 'sw' : 'en';
  } catch {
    return 'en';
  }
}

function getInitialTheme(): ThemeMode {
  if (typeof window === 'undefined') return 'dark';
  const paramTheme = new URLSearchParams(window.location.search).get('theme');
  if (paramTheme === 'light' || paramTheme === 'dark') return paramTheme;
  try {
    const stored = window.localStorage.getItem('ia-theme');
    return stored === 'light' ? 'light' : 'dark';
  } catch {
    return 'dark';
  }
}

export default function App() {
  const [showIntro, setShowIntro] = useState<boolean>(() => !shouldSkipIntroOnLoad());
  const [lang, setLang] = useState<LanguageCode>(() => getInitialLang());
  const [theme, setTheme] = useState<ThemeMode>(() => getInitialTheme());

  const [activeZoneId, setActiveZoneId] = useState<number>(0);
  const [progressRatio, setProgressRatio] = useState<number>(0);

  const [inspectKey, setInspectKey] = useState<string | null>(null);
  const [activeCaseStudy, setActiveCaseStudy] = useState<CaseStudyItem | null>(null);
  const [lightboxState, setLightboxState] = useState<LightboxState | null>(null);
  const [mediaStudioOpen, setMediaStudioOpen] = useState<boolean>(false);

  const [selectedQuoteCategory, setSelectedQuoteCategory] = useState<string>(
    'Giant & Large-Format Printing',
  );

  // Modular Video & GLB Media State
  const [activeTvVideoId, setActiveTvVideoId] = useState<string>('imagingarts-showreel');
  const [bgVideoId, setBgVideoId] = useState<string | null>(null);
  const [customGlbPreviewUrl, setCustomGlbPreviewUrl] = useState<string | null>(null);
  const [customGlbName, setCustomGlbName] = useState<string | null>(null);

  const videoEngineRef = useRef<VideoEngineManager | null>(null);
  if (!videoEngineRef.current && typeof document !== 'undefined') {
    videoEngineRef.current = new VideoEngineManager();
  }
  const bgVideoElRef = useRef<HTMLVideoElement | null>(null);

  // Spatial physics refs (updated at 60fps without rebuilding Three.js or lagging React state)
  const targetZRef = useRef<number>(0);
  const currentZRef = useRef<number>(0);
  const pointerRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const targetPointerRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const scrollActiveRef = useRef<boolean>(false);

  const zoneElsRef = useRef<Array<HTMLElement | null>>([]);
  const magnetTimerRef = useRef<number | null>(null);
  const lastFlingDirRef = useRef<-1 | 0 | 1>(0);
  const modalOpenRef = useRef<boolean>(false);

  const localizedPrintTiers = useMemo(() => getPrintTiers(lang), [lang]);

  // Sync theme (.dark class on <html>) & lang attribute + localStorage
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    try {
      window.localStorage.setItem('ia-theme', theme);
    } catch {
      // Ignore storage quota / private mode issues
    }
  }, [theme]);

  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      window.localStorage.setItem('ia-lang', lang);
    } catch {
      // Ignore storage quota / private mode issues
    }
  }, [lang]);

  useEffect(() => {
    modalOpenRef.current = Boolean(
      inspectKey || activeCaseStudy || lightboxState || mediaStudioOpen,
    );
  }, [inspectKey, activeCaseStudy, lightboxState, mediaStudioOpen]);

  // Zone-aware VideoEngine playback + cleanup
  useEffect(() => {
    videoEngineRef.current?.syncZonePlayback(activeZoneId);
  }, [activeZoneId]);

  useEffect(() => {
    return () => {
      videoEngineRef.current?.disposeAll();
    };
  }, []);

  // Sync optional ambient background reel layer when active
  useEffect(() => {
    const el = bgVideoElRef.current;
    const engine = videoEngineRef.current;
    if (!bgVideoId || !el || !engine) return;
    const handle = engine.getOrCreateHandle(bgVideoId);
    if (!handle) return;

    if (handle.videoEl.src) {
      el.srcObject = null;
      el.src = handle.videoEl.src;
    } else if (handle.videoEl.srcObject) {
      el.removeAttribute('src');
      el.srcObject = handle.videoEl.srcObject;
    }
    el.muted = true;
    el.loop = true;
    void el.play().catch(() => undefined);
  }, [bgVideoId]);

  const scheduleMagneticSnap = useCallback((delayMs = 150) => {
    if (magnetTimerRef.current !== null) {
      window.clearTimeout(magnetTimerRef.current);
    }
    magnetTimerRef.current = window.setTimeout(() => {
      magnetTimerRef.current = null;
      scrollActiveRef.current = false;
      const snapped = findNearestZone(
        targetZRef.current,
        SPATIAL_ZONES,
        lastFlingDirRef.current,
      );
      targetZRef.current = snapped.z;
      lastFlingDirRef.current = 0;
    }, delayMs);
  }, []);

  const jumpToZone = useCallback((zoneId: number) => {
    const zone = SPATIAL_ZONES[zoneId];
    if (!zone) return;
    if (magnetTimerRef.current !== null) {
      window.clearTimeout(magnetTimerRef.current);
      magnetTimerRef.current = null;
    }
    lastFlingDirRef.current = 0;
    scrollActiveRef.current = true;
    const delta = zone.z - currentZRef.current;
    if (Math.abs(delta) > 1200) {
      currentZRef.current = zone.z - Math.sign(delta) * 750;
    }
    targetZRef.current = zone.z;
  }, []);

  const scrubToRatio = useCallback(
    (ratio: number) => {
      const nextZ = clampZ(ratio * MIN_Z);
      targetZRef.current = nextZ;
      scrollActiveRef.current = true;
      scheduleMagneticSnap(120);
    },
    [scheduleMagneticSnap],
  );

  const handleQuotePreset = useCallback(
    (category: string) => {
      setSelectedQuoteCategory(category);
      jumpToZone(9);
    },
    [jumpToZone],
  );

  const handleOpenLightbox = useCallback((items: LightboxImageItem[], startIndex: number) => {
    setLightboxState({ items, index: startIndex });
  }, []);

  const handleToggleBgVideo = useCallback((videoId: string) => {
    setBgVideoId((prev) => (prev === videoId ? null : videoId));
  }, []);

  const handleLoadLocalVideo = useCallback((videoId: string, file: File) => {
    const url = URL.createObjectURL(file);
    videoEngineRef.current?.setSourceUrl(videoId, url);
    setActiveTvVideoId(videoId);
  }, []);

  const handleLoadLocalGlb = useCallback((file: File) => {
    const url = URL.createObjectURL(file);
    setCustomGlbPreviewUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return url;
    });
    setCustomGlbName(file.name);
  }, []);

  // Spatial animation loop: smooth damping + blur-free card transforms + throttled React HUD updates
  useEffect(() => {
    let rafId = 0;
    let lastTime = performance.now();
    let lastHudZone = -1;
    let lastHudProgress = -1;
    let lastHudSyncTime = 0;

    const tick = () => {
      const now = performance.now();
      const dt = Math.min(0.05, (now - lastTime) / 1000);
      lastTime = now;

      currentZRef.current = dampValue(currentZRef.current, targetZRef.current, 13.5, dt);
      if (Math.abs(targetZRef.current - currentZRef.current) < 0.25) {
        currentZRef.current = targetZRef.current;
        if (magnetTimerRef.current === null) {
          scrollActiveRef.current = false;
        }
      }

      pointerRef.current.x = dampValue(pointerRef.current.x, targetPointerRef.current.x, 7, dt);
      pointerRef.current.y = dampValue(pointerRef.current.y, targetPointerRef.current.y, 7, dt);

      const curZ = currentZRef.current;

      // Update zone layer DOM transforms directly (zero blur, crisp 1:1 scale when settled)
      let closestId = 0;
      let minDist = Infinity;

      for (const zone of SPATIAL_ZONES) {
        const dist = Math.abs(curZ - zone.z);
        if (dist < minDist) {
          minDist = dist;
          closestId = zone.id;
        }

        const el = zoneElsRef.current[zone.id];
        if (!el) continue;

        const pres = computeZonePresentation(curZ, zone.z);
        el.style.opacity = String(pres.opacity);
        el.style.zIndex = String(pres.zIndex);
        el.style.filter = 'none';
        el.style.visibility = pres.visible ? 'visible' : 'hidden';
        el.style.pointerEvents = pres.active ? 'auto' : 'none';

        if (pres.visible) {
          // Only apply subtle pointer drift while transitioning; lock exact center when snapped
          const parallaxFactor = Math.abs(curZ - zone.z) <= 35 ? 0 : 1;
          const tx = (-pointerRef.current.x * 5 * parallaxFactor).toFixed(1);
          const ty = (pointerRef.current.y * 4 * parallaxFactor).toFixed(1);
          el.style.transform = `scale(${pres.scale}) translate3d(${tx}px, ${ty}px, 0)`;
        }
      }

      const ratio = Math.abs(curZ / MIN_Z);
      if (
        closestId !== lastHudZone ||
        (now - lastHudSyncTime > 90 && Math.abs(ratio - lastHudProgress) > 0.004)
      ) {
        lastHudZone = closestId;
        lastHudProgress = ratio;
        lastHudSyncTime = now;
        setActiveZoneId(closestId);
        setProgressRatio(ratio);
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  // Free wheel, Android/iOS touch handoff, keyboard, and pointer listeners
  useEffect(() => {
    const findActiveScrollContainer = (target: EventTarget | null): HTMLElement | null => {
      if (!(target instanceof Element)) return null;
      const scrollEl = target.closest('.zone-scroll-area');
      if (!(scrollEl instanceof HTMLElement)) return null;
      const zoneSection = scrollEl.closest('[data-zone-id]');
      if (!(zoneSection instanceof HTMLElement)) return scrollEl;
      // Only let the currently focused zone intercept internal scrolling
      const zId = Number(zoneSection.dataset.zoneId);
      const nearest = findNearestZone(currentZRef.current, SPATIAL_ZONES);
      return zId === nearest.id ? scrollEl : null;
    };

    const onWheel = (e: WheelEvent) => {
      if (modalOpenRef.current) return;

      const scrollEl = findActiveScrollContainer(e.target);
      const snapshot = scrollEl
        ? {
            scrollTop: scrollEl.scrollTop,
            scrollHeight: scrollEl.scrollHeight,
            clientHeight: scrollEl.clientHeight,
          }
        : null;

      const step = resolveScrollStep(e.deltaY, snapshot, 1.35);

      if (step.internalDelta !== 0 && scrollEl) {
        e.preventDefault();
        scrollEl.scrollTop += step.internalDelta;
      }

      if (step.spatialDeltaZ !== 0) {
        e.preventDefault();
        scrollActiveRef.current = true;
        lastFlingDirRef.current = step.spatialDeltaZ < 0 ? -1 : 1;
        targetZRef.current = clampZ(targetZRef.current + step.spatialDeltaZ);
        scheduleMagneticSnap(150);
      }
    };

    let touchStartY = 0;
    let lastTouchY = 0;
    let totalTouchMove = 0;
    let activeTouchScrollEl: HTMLElement | null = null;
    let ignoreTouch = false;

    const onTouchStart = (e: TouchEvent) => {
      if (modalOpenRef.current || e.touches.length !== 1) {
        ignoreTouch = true;
        return;
      }
      const targetEl = e.target instanceof Element ? e.target : null;
      if (targetEl && targetEl.closest('input[type="range"], select')) {
        ignoreTouch = true;
        return;
      }
      ignoreTouch = false;
      touchStartY = e.touches[0].clientY;
      lastTouchY = touchStartY;
      totalTouchMove = 0;
      activeTouchScrollEl = findActiveScrollContainer(e.target);
    };

    const onTouchMove = (e: TouchEvent) => {
      if (ignoreTouch || modalOpenRef.current || e.touches.length !== 1) return;

      const currentY = e.touches[0].clientY;
      // Finger moves UP => deltaY > 0 (scrolling down inside card / deeper into tunnel)
      const deltaY = lastTouchY - currentY;
      lastTouchY = currentY;
      totalTouchMove += Math.abs(deltaY);

      if (Math.abs(deltaY) < 0.5) return;

      const snapshot = activeTouchScrollEl
        ? {
            scrollTop: activeTouchScrollEl.scrollTop,
            scrollHeight: activeTouchScrollEl.scrollHeight,
            clientHeight: activeTouchScrollEl.clientHeight,
          }
        : null;

      const step = resolveScrollStep(deltaY, snapshot, 2.25);

      if (step.internalDelta !== 0 && activeTouchScrollEl) {
        if (e.cancelable) e.preventDefault();
        activeTouchScrollEl.scrollTop += step.internalDelta;
      }

      if (step.spatialDeltaZ !== 0) {
        if (e.cancelable) e.preventDefault();
        scrollActiveRef.current = true;
        lastFlingDirRef.current = step.spatialDeltaZ < 0 ? -1 : 1;
        targetZRef.current = clampZ(targetZRef.current + step.spatialDeltaZ);
      }
    };

    const onTouchEnd = () => {
      if (ignoreTouch || modalOpenRef.current) return;
      if (totalTouchMove > 6 && scrollActiveRef.current) {
        scheduleMagneticSnap(30);
      }
      activeTouchScrollEl = null;
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (modalOpenRef.current) return;
      const tag = document.activeElement?.tagName ?? '';
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(tag)) return;

      const current = findNearestZone(targetZRef.current, SPATIAL_ZONES).id;
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        jumpToZone(Math.min(SPATIAL_ZONES.length - 1, current + 1));
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        jumpToZone(Math.max(0, current - 1));
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      targetPointerRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      targetPointerRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('touchend', onTouchEnd, { passive: true });
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('mousemove', onMouseMove);

    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, [jumpToZone, scheduleMagneticSnap]);

  return (
    <div className="relative w-full h-full overflow-hidden bg-[var(--bg-canvas)] text-[var(--text-main)] transition-colors duration-300">
      <IntroPreloader visible={showIntro} lang={lang} onDismiss={() => setShowIntro(false)} />

      <ThreeWorldCanvas
        currentZRef={currentZRef}
        pointerRef={pointerRef}
        scrollActiveRef={scrollActiveRef}
        theme={theme}
        activeTvVideoId={activeTvVideoId}
        customGlbPreviewUrl={customGlbPreviewUrl}
        videoEngineRef={videoEngineRef}
      />

      {/* Optional Ambient Website Background Video Reel Layer (Method 1) */}
      {bgVideoId && (
        <div
          aria-hidden="true"
          className="fixed inset-0 z-[2] pointer-events-none overflow-hidden opacity-[0.10] dark:opacity-[0.18]"
        >
          <video
            ref={bgVideoElRef}
            playsInline
            muted
            loop
            autoPlay
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <HeaderNav
        activeZoneId={activeZoneId}
        lang={lang}
        theme={theme}
        onChangeLang={setLang}
        onToggleTheme={() => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))}
        onJumpToZone={jumpToZone}
      />

      <main
        id="spatial-stage"
        className="fixed inset-0 z-10 pointer-events-none flex items-center justify-center"
      >
        {/* ZONE 0: Hero */}
        <section
          ref={(el) => {
            zoneElsRef.current[0] = el;
          }}
          data-zone-id="0"
          className="absolute inset-x-0 px-3 sm:px-6 lg:pl-8 lg:pr-64 flex justify-center will-change-transform"
        >
          <HeroZone
            lang={lang}
            onExploreTiers={() => jumpToZone(1)}
            onOpenCaseStudies={() => jumpToZone(8)}
            onOpenProfile={() => setInspectKey('about')}
            onOpenMediaStudio={() => setMediaStudioOpen(true)}
          />
        </section>

        {/* ZONES 1..7: 7 Print Tiers */}
        {localizedPrintTiers.map((tier) => (
          <section
            key={tier.zoneId}
            ref={(el) => {
              zoneElsRef.current[tier.zoneId] = el;
            }}
            data-zone-id={String(tier.zoneId)}
            className="absolute inset-x-0 px-3 sm:px-6 lg:pl-8 lg:pr-64 flex justify-center will-change-transform"
            style={{ opacity: 0, visibility: 'hidden' }}
          >
            <PrintTierCard
              tier={tier}
              lang={lang}
              reverseLayout={tier.zoneId % 2 === 0}
              onInspect={(key) => setInspectKey(key)}
              onQuotePreset={handleQuotePreset}
            />
          </section>
        ))}

        {/* ZONE 8: Clients & Case Studies + Full PDF Archive */}
        <section
          ref={(el) => {
            zoneElsRef.current[8] = el;
          }}
          data-zone-id="8"
          className="absolute inset-x-0 px-2.5 sm:px-6 lg:pl-8 lg:pr-64 flex justify-center will-change-transform"
          style={{ opacity: 0, visibility: 'hidden' }}
        >
          <ClientsCaseStudiesZone
            lang={lang}
            onSelectCaseStudy={(project) => setActiveCaseStudy(project)}
            onOpenLightbox={handleOpenLightbox}
            onOpenMediaStudio={() => setMediaStudioOpen(true)}
          />
        </section>

        {/* ZONE 9: Interactive Quote Studio & Mbezi Beach HQ */}
        <section
          ref={(el) => {
            zoneElsRef.current[9] = el;
          }}
          data-zone-id="9"
          className="absolute inset-x-0 px-2.5 sm:px-6 lg:pl-8 lg:pr-64 flex justify-center will-change-transform"
          style={{ opacity: 0, visibility: 'hidden' }}
        >
          <QuoteStudioZone
            lang={lang}
            selectedCategory={selectedQuoteCategory}
            onCategoryChange={setSelectedQuoteCategory}
          />
        </section>
      </main>

      <BottomDock
        activeZoneId={activeZoneId}
        progressRatio={progressRatio}
        lang={lang}
        onJumpToZone={jumpToZone}
        onScrubToRatio={scrubToRatio}
      />

      <TierInspectorModal
        inspectKey={inspectKey}
        lang={lang}
        onClose={() => setInspectKey(null)}
        onConfigureQuote={handleQuotePreset}
      />

      <CaseStudyModal
        project={activeCaseStudy}
        lang={lang}
        onClose={() => setActiveCaseStudy(null)}
        onOpenGallery={handleOpenLightbox}
      />

      <MediaStudioModal
        open={mediaStudioOpen}
        lang={lang}
        onClose={() => setMediaStudioOpen(false)}
        videoEngineRef={videoEngineRef}
        activeTvVideoId={activeTvVideoId}
        onSelectTvVideo={setActiveTvVideoId}
        bgVideoId={bgVideoId}
        onToggleBgVideo={handleToggleBgVideo}
        onLoadLocalVideo={handleLoadLocalVideo}
        onLoadLocalGlb={handleLoadLocalGlb}
        customGlbName={customGlbName}
        onJumpToZone={jumpToZone}
      />

      <ImageLightbox
        state={lightboxState}
        onClose={() => setLightboxState(null)}
        onNavigate={(nextIndex) =>
          setLightboxState((prev) => (prev ? { ...prev, index: nextIndex } : null))
        }
      />
    </div>
  );
}
