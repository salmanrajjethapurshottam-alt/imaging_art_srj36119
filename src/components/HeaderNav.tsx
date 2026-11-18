import { Globe, Moon, Sun } from 'lucide-react';
import { BrandMark } from './BrandMark';
import { UI_DICTIONARY, type LanguageCode, type ThemeMode } from '../i18n/translations';

interface HeaderNavProps {
  activeZoneId: number;
  lang: LanguageCode;
  theme: ThemeMode;
  onChangeLang: (lang: LanguageCode) => void;
  onToggleTheme: () => void;
  onJumpToZone: (zoneId: number) => void;
}

export function HeaderNav({
  activeZoneId,
  lang,
  theme,
  onChangeLang,
  onToggleTheme,
  onJumpToZone,
}: HeaderNavProps) {
  const dict = UI_DICTIONARY[lang].header;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-2.5 sm:px-7 py-2.5 sm:py-3 flex items-center justify-between gap-2 pointer-events-none">
      <button
        type="button"
        onClick={() => onJumpToZone(0)}
        className="pointer-events-auto group text-left focus:outline-none cursor-pointer transition-transform hover:scale-[1.02] shrink-0"
        aria-label={dict.returnHomeAria}
      >
        <BrandMark compact />
      </button>

      <div className="flex items-center gap-1.5 sm:gap-2.5 pointer-events-auto shrink-0">
        {/* Language Switcher: EN (default) / SW (Swahili) */}
        <div
          role="group"
          aria-label={dict.langToggleAria}
          className="inline-flex items-center rounded-xl border border-slate-300/80 dark:border-white/15 bg-white/95 dark:bg-[#121622]/95 p-0.5 shadow-sm whitespace-nowrap shrink-0"
        >
          <Globe className="w-3.5 h-3.5 text-[#162A64] dark:text-blue-300 ml-1.5 mr-1 hidden sm:block shrink-0" />
          <button
            type="button"
            onClick={() => onChangeLang('en')}
            aria-pressed={lang === 'en'}
            className={`px-2 py-1 rounded-lg font-mono text-[11px] font-bold transition-colors cursor-pointer ${
              lang === 'en'
                ? 'bg-[#162A64] text-white'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            EN
          </button>
          <button
            type="button"
            onClick={() => onChangeLang('sw')}
            aria-pressed={lang === 'sw'}
            className={`px-2 py-1 rounded-lg font-mono text-[11px] font-bold transition-colors cursor-pointer ${
              lang === 'sw'
                ? 'bg-[#E31E24] text-white'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            SW
          </button>
        </div>

        {/* Theme Switcher: Dark <-> Light */}
        <button
          type="button"
          onClick={onToggleTheme}
          aria-label={theme === 'dark' ? dict.themeToLight : dict.themeToDark}
          title={theme === 'dark' ? dict.themeToLight : dict.themeToDark}
          className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl border border-slate-300/80 dark:border-white/15 bg-white/95 dark:bg-[#121622]/95 text-slate-800 dark:text-amber-300 hover:border-[#E31E24] flex items-center justify-center shadow-sm transition-colors cursor-pointer shrink-0"
        >
          {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4 text-[#162A64]" />}
        </button>

        <button
          type="button"
          onClick={() => onJumpToZone(8)}
          className={`hidden md:inline-flex items-center px-3.5 py-2 rounded-xl border font-display font-bold text-xs tracking-wide transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
            activeZoneId === 8
              ? 'bg-[#162A64] border-blue-400/60 text-white'
              : 'bg-[#162A64]/95 border-slate-300/40 dark:border-white/15 text-white hover:bg-[#25449C]'
          }`}
        >
          {dict.portfolioBtn}
        </button>

        <button
          type="button"
          onClick={() => onJumpToZone(9)}
          className="px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-[#E31E24] text-white font-display font-bold text-[11px] sm:text-sm tracking-wide hover:bg-[#B31217] transition-all shadow-md shadow-[#E31E24]/25 active:scale-95 cursor-pointer whitespace-nowrap shrink-0"
        >
          {dict.quoteBtn}
        </button>
      </div>
    </header>
  );
}
