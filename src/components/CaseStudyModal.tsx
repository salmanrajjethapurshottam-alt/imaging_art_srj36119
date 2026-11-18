import { useEffect } from 'react';
import { Expand, X } from 'lucide-react';
import type { CaseStudyItem } from '../data/caseStudies';
import { UI_DICTIONARY, type LanguageCode } from '../i18n/translations';
import type { LightboxImageItem } from './ImageLightbox';
import { SmartImage } from './SmartImage';

interface CaseStudyModalProps {
  project: CaseStudyItem | null;
  lang: LanguageCode;
  onClose: () => void;
  onOpenGallery: (items: LightboxImageItem[], startIndex: number) => void;
}

export function CaseStudyModal({
  project,
  lang,
  onClose,
  onOpenGallery,
}: CaseStudyModalProps) {
  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [project, onClose]);

  if (!project) return null;

  const dict = UI_DICTIONARY[lang].caseModal;

  const lightboxItems: LightboxImageItem[] = project.images.map((im) => ({
    src: im.src,
    caption: im.alt || project.name,
  }));

  return (
    <div
      className="fixed inset-0 z-[160] flex items-center justify-center p-2 sm:p-6 bg-slate-950/75 dark:bg-black/85"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="case-modal-title"
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto custom-scroll bg-white dark:bg-[#0D111B] border border-slate-200 dark:border-white/15 border-t-[3px] border-t-[#E31E24] rounded-2xl p-5 sm:p-8 shadow-2xl"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label={dict.closeAria}
          className="sticky top-0 float-right w-9 h-9 rounded-full bg-slate-100 dark:bg-[#17213B] border border-slate-300 dark:border-white/15 hover:bg-[#E31E24] text-slate-800 dark:text-white hover:text-white flex items-center justify-center transition-colors z-10 cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-start gap-4 pr-10">
          {project.logo && (
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white border border-slate-200 dark:border-white/20 overflow-hidden shrink-0 flex items-center justify-center shadow-sm">
              <SmartImage
                src={project.logo}
                alt={`${project.name} logo`}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div>
            <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-[#C8191E] dark:text-[#F87171] font-bold">
              {project.eyebrow}
            </span>
            <h2
              id="case-modal-title"
              className="font-display font-extrabold text-2xl sm:text-4xl text-slate-900 dark:text-white leading-tight mt-1"
            >
              {project.name}
            </h2>
          </div>
        </div>

        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mt-4 max-w-3xl">
          {project.description}
        </p>

        {project.campaign && (
          <p className="mt-3 text-sm font-display font-bold text-[#C8191E] dark:text-[#F87171]">
            {project.campaign}
          </p>
        )}

        {project.services.length > 0 && (
          <div className="mt-5">
            <div className="font-mono text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
              {dict.deliveredScope}
            </div>
            <div className="flex flex-wrap gap-2 text-xs text-slate-800 dark:text-slate-200">
              {project.services.map((srv) => (
                <span
                  key={srv}
                  className="px-3 py-1.5 rounded-lg bg-[#162A64]/10 dark:bg-[#162A64]/45 border border-[#162A64]/20 dark:border-blue-400/25 font-medium"
                >
                  {srv}
                </span>
              ))}
            </div>
          </div>
        )}

        {project.stats && project.stats.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-5">
            {project.stats.map(([value, desc]) => (
              <div
                key={desc}
                className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10"
              >
                <strong className="block font-display text-xl text-slate-900 dark:text-white font-extrabold">
                  {value}
                </strong>
                <span className="block text-[11px] text-slate-600 dark:text-slate-400 leading-snug mt-1">
                  {desc}
                </span>
              </div>
            ))}
          </div>
        )}

        <div className="mt-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-display font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider">
              {dict.visualsHeading} · {project.images.length} {dict.itemsLabel}
            </h3>
            <span className="font-mono text-[10px] text-slate-500 dark:text-slate-400">
              {dict.tapToZoom}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {project.images.map((im, i) => (
              <button
                key={`${im.src}-${i}`}
                type="button"
                onClick={() => onOpenGallery(lightboxItems, i)}
                className="group relative rounded-xl overflow-hidden border border-slate-200 dark:border-white/12 bg-slate-50 dark:bg-[#07090F] text-left cursor-pointer focus:outline-none focus:border-[#E31E24]"
              >
                <div className="h-44 sm:h-48 w-full overflow-hidden">
                  <SmartImage
                    src={im.src}
                    alt={im.alt}
                    className={`w-full h-full transition-transform duration-300 group-hover:scale-[1.03] ${
                      im.fit === 'contain'
                        ? 'object-contain p-2 bg-slate-100 dark:bg-[#0A0E18]'
                        : 'object-cover'
                    }`}
                  />
                </div>
                <div className="p-2.5 flex items-center justify-between gap-2 bg-white dark:bg-[#0B0F1A] border-t border-slate-200 dark:border-white/8">
                  <span className="text-[11px] text-slate-700 dark:text-slate-300 line-clamp-1">
                    {im.alt}
                  </span>
                  <Expand className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400 group-hover:text-[#E31E24] shrink-0" />
                </div>
              </button>
            ))}
          </div>
        </div>

        {project.quote && (
          <blockquote className="mt-6 p-4 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200 text-xs sm:text-sm leading-relaxed">
            “{project.quote}”
            {project.quoteBy && (
              <footer className="mt-2 font-mono text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                — {project.quoteBy}
              </footer>
            )}
          </blockquote>
        )}
      </div>
    </div>
  );
}
