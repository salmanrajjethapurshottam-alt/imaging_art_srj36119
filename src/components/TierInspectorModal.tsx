import { X } from 'lucide-react';
import { getInspectorData, UI_DICTIONARY, type LanguageCode } from '../i18n/translations';

interface TierInspectorModalProps {
  inspectKey: string | null;
  lang: LanguageCode;
  onClose: () => void;
  onConfigureQuote: (presetCategory: string) => void;
}

export function TierInspectorModal({
  inspectKey,
  lang,
  onClose,
  onConfigureQuote,
}: TierInspectorModalProps) {
  if (!inspectKey) return null;
  const inspectorMap = getInspectorData(lang);
  const data = inspectorMap[inspectKey] ?? inspectorMap.about;
  const dict = UI_DICTIONARY[lang].inspector;

  return (
    <div
      className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-slate-950/75 dark:bg-black/85"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="inspector-modal-title"
        onClick={(e) => e.stopPropagation()}
        className="studio-card rounded-2xl max-w-xl w-full p-6 sm:p-7 relative max-h-[86vh] overflow-y-auto custom-scroll border-t-[3px] border-t-[#E31E24]"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label={dict.closeAria}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 dark:bg-white/10 hover:bg-[#E31E24] text-slate-800 dark:text-white hover:text-white flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="font-mono text-[11px] font-bold text-[#C8191E] dark:text-[#F87171] uppercase tracking-wider mb-2 pr-8">
          {data.badge}
        </div>
        <h3
          id="inspector-modal-title"
          className="font-display font-extrabold text-2xl text-slate-900 dark:text-white mb-2"
        >
          {data.title}
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-5">
          {data.desc}
        </p>

        <div className="space-y-2.5 mb-6">
          {data.specs.map(([label, val]) => (
            <div
              key={label}
              className="p-3.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 flex flex-col gap-1"
            >
              <span className="font-mono text-[10px] uppercase text-[#C8191E] dark:text-[#F87171] font-bold">
                {label}
              </span>
              <span className="text-xs sm:text-sm font-medium text-slate-900 dark:text-white leading-snug">
                {val}
              </span>
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-white/10 text-slate-800 dark:text-white text-xs font-medium hover:bg-slate-200 dark:hover:bg-white/20 cursor-pointer"
          >
            {dict.closeBtn}
          </button>
          <button
            type="button"
            onClick={() => {
              onClose();
              onConfigureQuote(data.preset);
            }}
            className="px-5 py-2 rounded-xl bg-[#E31E24] text-white font-display font-bold text-xs hover:bg-[#B31217] cursor-pointer"
          >
            {dict.configureBtn}
          </button>
        </div>
      </div>
    </div>
  );
}
