import { ArrowDown, Film } from 'lucide-react';
import { UI_DICTIONARY, type LanguageCode } from '../i18n/translations';

interface HeroZoneProps {
  lang: LanguageCode;
  onExploreTiers: () => void;
  onOpenCaseStudies: () => void;
  onOpenProfile: () => void;
  onOpenMediaStudio: () => void;
}

export function HeroZone({
  lang,
  onExploreTiers,
  onOpenCaseStudies,
  onOpenProfile,
  onOpenMediaStudio,
}: HeroZoneProps) {
  const dict = UI_DICTIONARY[lang].hero;

  return (
    <div className="flex flex-col items-center text-center max-w-4xl mx-auto px-3 py-4">
      <p className="font-mono text-[11px] sm:text-xs tracking-[0.2em] uppercase text-slate-700 dark:text-slate-300 mb-4 border-b border-slate-300/90 dark:border-white/15 pb-2">
        {dict.kicker}
      </p>

      <h1 className="font-display font-extrabold text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[0.96] mb-5">
        <span className="block text-slate-900 dark:text-white">
          {dict.headlineLine1} <span className="text-[#E31E24]">{dict.headlineHighlight}</span>
        </span>
        <span className="block brand-gradient-text">{dict.headlineLine2}</span>
      </h1>

      <p className="max-w-2xl text-sm sm:text-lg text-slate-700 dark:text-slate-300 font-normal leading-relaxed mb-7 px-2">
        {dict.bodyStart}
        <strong className="text-slate-950 dark:text-white font-semibold">{dict.bodyBold1}</strong>{' '}
        {dict.bodyMid}{' '}
        <strong className="text-slate-950 dark:text-white font-semibold">{dict.bodyBold2}</strong>
        <span className="text-[#E31E24] font-semibold">{dict.bodyClosing}</span>
      </p>

      <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
        <button
          type="button"
          onClick={onExploreTiers}
          className="px-5 sm:px-6 py-3 rounded-xl bg-[#E31E24] text-white font-display font-bold text-sm tracking-wide hover:bg-[#B31217] transition-all shadow-lg shadow-[#E31E24]/30 flex items-center gap-2 cursor-pointer"
        >
          <span>{dict.ctaExplore}</span>
          <ArrowDown className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={onOpenCaseStudies}
          className="px-5 sm:px-6 py-3 rounded-xl bg-[#162A64] border border-transparent dark:border-white/20 text-white font-display font-bold text-sm hover:bg-[#25449C] transition-colors cursor-pointer"
        >
          {dict.ctaClients}
        </button>
        <button
          type="button"
          onClick={onOpenMediaStudio}
          className="px-4 sm:px-5 py-3 rounded-xl bg-white dark:bg-[#121622] border border-slate-300 dark:border-white/20 text-slate-900 dark:text-slate-100 font-semibold text-sm hover:border-[#E31E24] transition-colors inline-flex items-center gap-2 cursor-pointer"
        >
          <Film className="w-4 h-4 text-[#E31E24]" />
          <span>{dict.ctaMediaStudio}</span>
        </button>
        <button
          type="button"
          onClick={onOpenProfile}
          className="px-4 sm:px-5 py-3 rounded-xl bg-white/90 dark:bg-[#121622] border border-slate-300 dark:border-white/20 text-slate-700 dark:text-slate-200 font-medium text-sm hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
        >
          {dict.ctaProfile}
        </button>
      </div>
    </div>
  );
}
