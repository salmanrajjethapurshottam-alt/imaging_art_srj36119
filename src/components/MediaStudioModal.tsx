import { useEffect, useRef, useState, type ChangeEvent, type MutableRefObject } from 'react';
import {
  Box,
  Film,
  Layers,
  MonitorPlay,
  Pause,
  Play,
  Upload,
  Volume2,
  VolumeX,
  X,
} from 'lucide-react';
import { MODULAR_MODELS } from '../data/models';
import { MODULAR_VIDEOS, type ModularVideoConfig } from '../data/videos';
import type { VideoEngineManager } from '../engine/videoManager';
import { UI_DICTIONARY, type LanguageCode } from '../i18n/translations';

interface MediaStudioModalProps {
  open: boolean;
  lang: LanguageCode;
  onClose: () => void;
  videoEngineRef: MutableRefObject<VideoEngineManager | null>;
  activeTvVideoId: string;
  onSelectTvVideo: (videoId: string) => void;
  bgVideoId: string | null;
  onToggleBgVideo: (videoId: string) => void;
  onLoadLocalVideo: (videoId: string, file: File) => void;
  onLoadLocalGlb: (file: File) => void;
  customGlbName: string | null;
  onJumpToZone: (zoneId: number) => void;
}

type StudioTab = 'videos' | 'models' | 'arch';

export function MediaStudioModal({
  open,
  lang,
  onClose,
  videoEngineRef,
  activeTvVideoId,
  onSelectTvVideo,
  bgVideoId,
  onToggleBgVideo,
  onLoadLocalVideo,
  onLoadLocalGlb,
  customGlbName,
  onJumpToZone,
}: MediaStudioModalProps) {
  const dict = UI_DICTIONARY[lang].mediaStudio;
  const [activeTab, setActiveTab] = useState<StudioTab>('videos');
  const [selectedVideoId, setSelectedVideoId] = useState<string>(MODULAR_VIDEOS[0].id);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const previewVideoRef = useRef<HTMLVideoElement | null>(null);
  const videoInputRef = useRef<HTMLInputElement | null>(null);
  const glbInputRef = useRef<HTMLInputElement | null>(null);

  const selectedVideo: ModularVideoConfig =
    MODULAR_VIDEOS.find((v) => v.id === selectedVideoId) ?? MODULAR_VIDEOS[0];

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  // Attach VideoEngine stream or source into the preview <video> inside the modal
  useEffect(() => {
    if (!open || activeTab !== 'videos') return;
    const engine = videoEngineRef.current;
    const el = previewVideoRef.current;
    if (!engine || !el) return;

    const handle = engine.getOrCreateHandle(selectedVideo.id);
    if (!handle) return;

    if (handle.videoEl.src) {
      el.srcObject = null;
      el.src = handle.videoEl.src;
    } else if (handle.videoEl.srcObject) {
      el.removeAttribute('src');
      el.srcObject = handle.videoEl.srcObject;
    }

    el.muted = isMuted;
    el.loop = selectedVideo.loop;

    if (isPlaying) {
      void el.play().catch(() => undefined);
      void engine.play(selectedVideo.id);
    } else {
      el.pause();
    }
  }, [open, activeTab, selectedVideo.id, selectedVideo.loop, isPlaying, isMuted, videoEngineRef]);

  if (!open) return null;

  const handleTogglePlay = () => {
    const next = !isPlaying;
    setIsPlaying(next);
    const el = previewVideoRef.current;
    if (el) {
      if (next) {
        void el.play().catch(() => undefined);
      } else {
        el.pause();
      }
    }
  };

  const handleVideoFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    onLoadLocalVideo(selectedVideo.id, file);
    setIsPlaying(true);
    e.target.value = '';
  };

  const handleGlbFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    onLoadLocalGlb(file);
    e.target.value = '';
  };

  return (
    <div
      className="fixed inset-0 z-[165] flex items-center justify-center p-2 sm:p-6 bg-slate-950/75 dark:bg-black/85"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="media-studio-title"
        onClick={(e) => e.stopPropagation()}
        className="studio-card relative w-full max-w-5xl max-h-[92vh] overflow-y-auto custom-scroll border-t-[3px] border-t-[#E31E24] rounded-2xl p-4 sm:p-7"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label={dict.closeAria}
          className="sticky top-0 float-right w-9 h-9 rounded-full bg-slate-100 dark:bg-[#17213B] border border-slate-300 dark:border-white/15 text-slate-800 dark:text-white hover:bg-[#E31E24] hover:text-white flex items-center justify-center transition-colors z-10 cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="pr-10 pb-4 border-b border-slate-200 dark:border-white/12">
          <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-[#C8191E] dark:text-[#F87171] font-bold">
            IMAGINGARTS · MODULAR MEDIA ENGINE
          </div>
          <h2
            id="media-studio-title"
            className="font-display font-extrabold text-xl sm:text-3xl text-slate-900 dark:text-white mt-1"
          >
            {dict.title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
            {dict.subtitle}
          </p>
        </div>

        {/* Status Bar & Tabs */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 py-4 border-b border-slate-200 dark:border-white/10">
          <div role="tablist" className="flex flex-wrap gap-2">
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'videos'}
              onClick={() => setActiveTab('videos')}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border text-xs font-bold transition-colors cursor-pointer ${
                activeTab === 'videos'
                  ? 'bg-[#162A64] border-[#162A64] dark:border-blue-400/70 text-white'
                  : 'bg-slate-100 dark:bg-white/[0.05] border-slate-200 dark:border-white/12 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10'
              }`}
            >
              <Film className="w-3.5 h-3.5" />
              <span>{dict.tabShowreels}</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'models'}
              onClick={() => setActiveTab('models')}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border text-xs font-bold transition-colors cursor-pointer ${
                activeTab === 'models'
                  ? 'bg-[#162A64] border-[#162A64] dark:border-blue-400/70 text-white'
                  : 'bg-slate-100 dark:bg-white/[0.05] border-slate-200 dark:border-white/12 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10'
              }`}
            >
              <Box className="w-3.5 h-3.5" />
              <span>{dict.tab3DModels}</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'arch'}
              onClick={() => setActiveTab('arch')}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border text-xs font-bold transition-colors cursor-pointer ${
                activeTab === 'arch'
                  ? 'bg-[#162A64] border-[#162A64] dark:border-blue-400/70 text-white'
                  : 'bg-slate-100 dark:bg-white/[0.05] border-slate-200 dark:border-white/12 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>{dict.tabArchitecture}</span>
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono">
            <button
              type="button"
              onClick={() => onToggleBgVideo(bgVideoId ?? selectedVideo.id)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-semibold transition-colors cursor-pointer ${
                bgVideoId
                  ? 'bg-[#E31E24] border-[#E31E24] text-white'
                  : 'bg-slate-100 dark:bg-white/[0.05] border-slate-300 dark:border-white/15 text-slate-700 dark:text-slate-200 hover:border-[#E31E24]'
              }`}
            >
              <span>{dict.backgroundVideoLabel}:</span>
              <span className="font-bold">
                {bgVideoId ? dict.backgroundVideoOn : dict.backgroundVideoOff}
              </span>
            </button>
          </div>
        </div>

        {/* TAB 1: Video Library & Reels */}
        {activeTab === 'videos' && (
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 mt-5">
            <div className="lg:col-span-3 flex flex-col gap-3">
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-white/15 bg-slate-950 aspect-video shadow-lg">
                <video
                  ref={previewVideoRef}
                  poster={selectedVideo.poster}
                  playsInline
                  muted={isMuted}
                  loop={selectedVideo.loop}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/85 via-black/45 to-transparent flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleTogglePlay}
                      className="px-3 py-1.5 rounded-lg bg-[#E31E24] hover:bg-[#B31217] text-white text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer"
                    >
                      {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                      <span>{isPlaying ? dict.pauseBtn : dict.playBtn}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsMuted((m) => !m)}
                      className="px-2.5 py-1.5 rounded-lg bg-white/15 hover:bg-white/25 text-white text-xs font-semibold inline-flex items-center gap-1 cursor-pointer"
                    >
                      {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                      <span>{isMuted ? dict.unmuteBtn : dict.muteBtn}</span>
                    </button>
                  </div>

                  <span className="font-mono text-[10px] text-slate-200 uppercase">
                    {selectedVideo.durationLabel} · {selectedVideo.placement}
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-wider text-[#C8191E] dark:text-[#F87171] font-bold">
                      {lang === 'sw' ? selectedVideo.categorySw : selectedVideo.category}
                    </div>
                    <h3 className="font-display font-extrabold text-lg text-slate-900 dark:text-white mt-0.5">
                      {lang === 'sw' ? selectedVideo.titleSw : selectedVideo.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                      {lang === 'sw' ? selectedVideo.subtitleSw : selectedVideo.subtitle}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 mt-4 pt-3 border-t border-slate-200 dark:border-white/10">
                  <button
                    type="button"
                    onClick={() => onSelectTvVideo(selectedVideo.id)}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                      activeTvVideoId === selectedVideo.id
                        ? 'bg-emerald-600 text-white'
                        : 'bg-[#162A64] hover:bg-[#25449C] text-white'
                    }`}
                  >
                    <MonitorPlay className="w-3.5 h-3.5" />
                    <span>
                      {activeTvVideoId === selectedVideo.id ? dict.activeOnTv : dict.sendToTv}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onToggleBgVideo(selectedVideo.id)}
                    className={`px-3.5 py-2 rounded-xl border text-xs font-semibold transition-colors cursor-pointer ${
                      bgVideoId === selectedVideo.id
                        ? 'bg-[#E31E24] border-[#E31E24] text-white'
                        : 'bg-white dark:bg-white/[0.06] border-slate-300 dark:border-white/15 text-slate-800 dark:text-slate-200 hover:border-[#E31E24]'
                    }`}
                  >
                    {dict.sendToBg}
                  </button>

                  <input
                    ref={videoInputRef}
                    type="file"
                    accept="video/mp4,video/webm"
                    onChange={handleVideoFileChange}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => videoInputRef.current?.click()}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-200/80 dark:bg-white/[0.08] text-slate-800 dark:text-white text-xs font-semibold hover:bg-slate-300 dark:hover:bg-white/15 transition-colors cursor-pointer"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>{dict.loadLocalVideo}</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 space-y-2.5">
              {MODULAR_VIDEOS.map((vid) => {
                const isSelected = vid.id === selectedVideo.id;
                const isTv = activeTvVideoId === vid.id;
                return (
                  <button
                    key={vid.id}
                    type="button"
                    onClick={() => {
                      setSelectedVideoId(vid.id);
                      setIsPlaying(true);
                    }}
                    className={`w-full text-left p-2.5 rounded-xl border transition-all flex items-center gap-3 cursor-pointer ${
                      isSelected
                        ? 'bg-[#162A64]/10 dark:bg-[#162A64]/45 border-[#E31E24]'
                        : 'bg-slate-50 dark:bg-white/[0.03] border-slate-200 dark:border-white/10 hover:border-[#E31E24]/60'
                    }`}
                  >
                    <img
                      src={vid.poster}
                      alt={vid.title}
                      className="w-20 h-14 rounded-lg object-cover shrink-0 border border-slate-200 dark:border-white/10"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1">
                        <span className="font-mono text-[9px] font-bold uppercase text-[#C8191E] dark:text-[#F87171]">
                          {lang === 'sw' ? vid.categorySw : vid.category}
                        </span>
                        <span className="font-mono text-[9px] text-slate-500 dark:text-slate-400">
                          {vid.durationLabel}
                        </span>
                      </div>
                      <div className="font-display font-bold text-xs sm:text-sm text-slate-900 dark:text-white line-clamp-1 mt-0.5">
                        {lang === 'sw' ? vid.titleSw : vid.title}
                      </div>
                      <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400 mt-0.5 truncate">
                        {isTv ? '3D TV Active' : `${dict.placementLabel}: ${vid.placement}`}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: 3D Models (GLB) & TV Texture */}
        {activeTab === 'models' && (
          <div className="mt-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10">
              <div>
                <h3 className="font-display font-extrabold text-base sm:text-lg text-slate-900 dark:text-white">
                  {dict.modelsHeading}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">{dict.modelsSub}</p>
              </div>
              <div className="shrink-0">
                <input
                  ref={glbInputRef}
                  type="file"
                  accept=".glb,.gltf"
                  onChange={handleGlbFileChange}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => glbInputRef.current?.click()}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#E31E24] hover:bg-[#B31217] text-white text-xs font-bold transition-colors cursor-pointer"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>{dict.loadLocalGlb}</span>
                </button>
              </div>
            </div>

            {customGlbName && (
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/35 text-xs font-mono text-emerald-800 dark:text-emerald-200">
                GLB Active in Layer 02: <strong>{customGlbName}</strong>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {MODULAR_MODELS.map((m) => (
                <div
                  key={m.id}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-[#0A0D16] border border-slate-200 dark:border-white/12 flex flex-col justify-between gap-4"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-[10px] font-bold uppercase text-[#C8191E] dark:text-[#F87171]">
                        {m.sourceType.toUpperCase()} · ZONE {String(m.scrollTriggerZone).toUpperCase()}
                      </span>
                      <span className="font-mono text-[10px] text-slate-500 dark:text-slate-400">
                        rotY: {m.animation.autoRotateY}
                      </span>
                    </div>
                    <h4 className="font-display font-extrabold text-lg text-slate-900 dark:text-white mt-1">
                      {lang === 'sw' ? m.nameSw : m.name}
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed">
                      {lang === 'sw' ? m.descriptionSw : m.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-slate-200 dark:border-white/10">
                    {m.videoTextureId ? (
                      <span className="font-mono text-[10px] text-emerald-700 dark:text-emerald-300 font-semibold">
                        {dict.tvTextureLabel}: {activeTvVideoId}
                      </span>
                    ) : (
                      <span className="font-mono text-[10px] text-slate-500 dark:text-slate-400">
                        {dict.loopLabel}: Auto-Spin + Bob
                      </span>
                    )}

                    <button
                      type="button"
                      onClick={() => {
                        const targetZone =
                          typeof m.scrollTriggerZone === 'number' ? m.scrollTriggerZone : 0;
                        onClose();
                        onJumpToZone(targetZone);
                      }}
                      className="px-3.5 py-1.5 rounded-lg bg-[#162A64] hover:bg-[#25449C] text-white text-xs font-bold transition-colors cursor-pointer"
                    >
                      {dict.jumpToModelZone}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: Decoupled Architecture */}
        {activeTab === 'arch' && (
          <div className="mt-5 space-y-3">
            <h3 className="font-display font-extrabold text-lg text-slate-900 dark:text-white">
              {dict.archHeading}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {dict.archNotes.map((note, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/12 text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed"
                >
                  <div className="font-mono text-[10px] font-bold uppercase text-[#C8191E] dark:text-[#F87171] mb-1">
                    MODULE 0{idx + 1}
                  </div>
                  {note}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
