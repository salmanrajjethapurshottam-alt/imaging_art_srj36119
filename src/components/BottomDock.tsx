import { ChevronLeft, ChevronRight } from 'lucide-react';
import { MIN_Z, SPATIAL_ZONES } from '../utils/spatialScroll';
import {
  getLocalizedZoneLabel,
  UI_DICTIONARY,
  type LanguageCode,
} from '../i18n/translations';

interface BottomDockProps {
  activeZoneId: number;
  progressRatio: number;
  lang: LanguageCode;
  onJumpToZone: (zoneId: number) => void;
  onScrubToRatio: (ratio: number) => void;
}

export function BottomDock({
  activeZoneId,
  progressRatio,
  lang,
  onJumpToZone,
  onScrubToRatio,
}: BottomDockProps) {
  const dict = UI_DICTIONARY[lang].dock;
  const activeZone = SPATIAL_ZONES[activeZoneId] ?? SPATIAL_ZONES[0];
  const activeZoneLabel = getLocalizedZoneLabel(activeZone.id, activeZone.label, lang);

  const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    onScrubToRatio(ratio);
  };

  return (
    <>
      {/* Right Floating Zone Rail (Desktop lg+) */}
      <nav
        aria-label={dict.navAria}
        className="fixed right-3 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-end gap-1.5 pointer-events-auto max-h-[78vh] overflow-y-auto custom-scroll pr-0.5 max-w-[235px]"
      >
        {SPATIAL_ZONES.map((zone) => {
          const isCurrent = zone.id === activeZoneId;
          const localizedLabel = getLocalizedZoneLabel(zone.id, zone.label, lang);
          return (
            <button
              key={zone.id}
              type="button"
              onClick={() => onJumpToZone(zone.id)}
              className={`group flex items-center gap-2 px-2.5 py-1.5 rounded-lg border transition-all cursor-pointer ${
                isCurrent
                  ? 'bg-[#162A64] border-[#E31E24] text-white shadow-md'
                  : 'bg-white/90 dark:bg-[#0D0E12]/90 border-slate-300/80 dark:border-white/10 text-slate-700 dark:text-slate-400 hover:border-[#E31E24]/70 hover:text-slate-950 dark:hover:text-white'
              }`}
            >
              <span className="font-mono text-[9.5px] tracking-wide uppercase font-semibold whitespace-nowrap">
                {localizedLabel}
              </span>
              <span
                className={`h-2 rounded-full shrink-0 transition-all ${
                  isCurrent
                    ? 'w-3.5 bg-[#E31E24]'
                    : 'w-2 bg-slate-400 dark:bg-slate-500 group-hover:bg-[#E31E24]'
                }`}
              />
            </button>
          );
        })}
      </nav>

      {/* Bottom Progress & Quick Zone Controls */}
      <footer className="fixed bottom-0 left-0 right-0 z-50 px-3 sm:px-8 py-2.5 pointer-events-none bg-gradient-to-t from-[#E8EEF8]/95 via-[#E8EEF8]/75 dark:from-[#0D0E12]/95 dark:via-[#0D0E12]/70 to-transparent">
        <div className="max-w-4xl mx-auto flex flex-col gap-1.5 pointer-events-auto">
          <div className="flex items-center justify-between gap-2 text-[10px] sm:text-[11px] font-mono text-slate-700 dark:text-slate-300">
            <button
              type="button"
              disabled={activeZoneId <= 0}
              onClick={() => onJumpToZone(Math.max(0, activeZoneId - 1))}
              className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-white/90 dark:bg-white/[0.06] border border-slate-300/80 dark:border-white/10 text-slate-800 dark:text-white disabled:opacity-35 hover:bg-slate-200 dark:hover:bg-white/15 transition-colors cursor-pointer disabled:cursor-default"
              aria-label={dict.prevAria}
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{dict.prev}</span>
            </button>

            <span className="truncate text-center uppercase tracking-wider text-slate-900 dark:text-slate-200 font-semibold">
              {activeZoneLabel}
            </span>

            <button
              type="button"
              disabled={activeZoneId >= SPATIAL_ZONES.length - 1}
              onClick={() => onJumpToZone(Math.min(SPATIAL_ZONES.length - 1, activeZoneId + 1))}
              className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-white/90 dark:bg-white/[0.06] border border-slate-300/80 dark:border-white/10 text-slate-800 dark:text-white disabled:opacity-35 hover:bg-slate-200 dark:hover:bg-white/15 transition-colors cursor-pointer disabled:cursor-default"
              aria-label={dict.nextAria}
            >
              <span className="hidden sm:inline">{dict.next}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div
            role="slider"
            tabIndex={0}
            aria-label={dict.scrubberAria}
            aria-valuemin={0}
            aria-valuemax={Math.abs(MIN_Z)}
            aria-valuenow={Math.round(progressRatio * Math.abs(MIN_Z))}
            onClick={handleTrackClick}
            className="relative h-2 w-full rounded-full bg-slate-300/80 dark:bg-white/12 overflow-hidden cursor-pointer"
          >
            <div
              className="h-full brand-bar rounded-full transition-all duration-100"
              style={{ width: `${Math.max(2, Math.min(100, progressRatio * 100)).toFixed(1)}%` }}
            />
          </div>
        </div>
      </footer>
    </>
  );
}
