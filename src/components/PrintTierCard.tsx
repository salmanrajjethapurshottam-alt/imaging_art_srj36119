import type { PrintTierData } from '../data/printTiers';
import { UI_DICTIONARY, type LanguageCode } from '../i18n/translations';

interface PrintTierCardProps {
  tier: PrintTierData;
  lang: LanguageCode;
  reverseLayout?: boolean;
  onInspect: (inspectKey: string) => void;
  onQuotePreset: (quoteCategory: string) => void;
}

export function PrintTierCard({
  tier,
  lang,
  reverseLayout = false,
  onInspect,
  onQuotePreset,
}: PrintTierCardProps) {
  const isRed = tier.accent === 'red';
  const dict = UI_DICTIONARY[lang].tierCard;

  return (
    <div
      className={`flex flex-col ${
        reverseLayout ? 'md:flex-row-reverse' : 'md:flex-row'
      } items-center justify-between gap-6 w-full max-w-5xl mx-auto`}
    >
      <div
        className={`studio-card rounded-2xl w-full max-w-lg max-h-[calc(100dvh-168px)] overflow-y-auto zone-scroll-area custom-scroll border-t-[3px] ${
          isRed ? 'border-t-[#E31E24]' : 'border-t-[#3B66E0]'
        } p-5 sm:p-7`}
      >
        <div className="flex items-center justify-between gap-2 pb-3 mb-3 border-b border-slate-200 dark:border-white/10">
          <span
            className={`font-mono text-[11px] font-bold tracking-wider uppercase ${
              isRed
                ? 'text-[#C8191E] dark:text-[#F87171]'
                : 'text-[#162A64] dark:text-blue-300'
            }`}
          >
            {tier.badge}
          </span>
          <span className="font-mono text-[10px] text-slate-500 dark:text-slate-400 uppercase">
            {tier.techSpec}
          </span>
        </div>

        <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white mb-2 leading-tight">
          {tier.title}
        </h2>

        <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed mb-4">
          {tier.subtitle}
        </p>

        <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 mb-6">
          {tier.bullets.map((b) => (
            <li key={b.lead} className="flex items-start gap-2.5">
              <span
                className={`font-bold mt-0.5 ${
                  isRed ? 'text-[#E31E24]' : 'text-[#25449C] dark:text-blue-400'
                }`}
              >
                •
              </span>
              <span>
                <strong className="text-slate-900 dark:text-white font-semibold">{b.lead}</strong>{' '}
                {b.text}
              </span>
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-2.5 pt-3 border-t border-slate-200 dark:border-white/10">
          <button
            type="button"
            onClick={() => onInspect(tier.inspectKey)}
            className="px-4 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-[#0D0E12] font-display font-bold text-xs tracking-wide hover:bg-[#E31E24] hover:text-white transition-colors cursor-pointer"
          >
            {dict.inspectBtn}
          </button>
          <button
            type="button"
            onClick={() => onQuotePreset(tier.quoteCategory)}
            className="px-4 py-2 rounded-xl bg-[#162A64] hover:bg-[#25449C] text-white font-medium text-xs transition-colors cursor-pointer"
          >
            {dict.quoteBtn}
          </button>
        </div>
      </div>

      <aside className="hidden lg:flex flex-col gap-3 max-w-xs">
        <div
          className={`studio-card rounded-2xl p-5 border-t-2 ${
            isRed ? 'border-t-[#E31E24]' : 'border-t-[#3B66E0]'
          }`}
        >
          <div
            className={`font-mono text-[10px] uppercase tracking-wider font-bold ${
              isRed
                ? 'text-[#C8191E] dark:text-[#F87171]'
                : 'text-[#162A64] dark:text-blue-300'
            }`}
          >
            {tier.sideNote.eyebrow}
          </div>
          <div className="font-display font-bold text-base text-slate-900 dark:text-white mt-1">
            {tier.sideNote.heading}
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed">
            {tier.sideNote.body}
          </p>
        </div>
      </aside>
    </div>
  );
}
