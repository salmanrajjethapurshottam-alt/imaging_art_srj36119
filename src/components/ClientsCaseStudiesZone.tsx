import { useMemo, useState } from 'react';
import { ArrowUpRight, BookOpen, Film } from 'lucide-react';
import {
  CASE_STUDY_CATEGORIES,
  CLIENT_LOGOS,
  OTHER_CUSTOMERS_WALL,
  PDF_SPREADS,
  PROFILE_VISUALS,
  type CaseStudyCategory,
  type CaseStudyItem,
} from '../data/caseStudies';
import { MODULAR_VIDEOS } from '../data/videos';
import {
  getCaseStudies,
  UI_DICTIONARY,
  type LanguageCode,
} from '../i18n/translations';
import type { LightboxImageItem } from './ImageLightbox';
import { SmartImage } from './SmartImage';

interface ClientsCaseStudiesZoneProps {
  lang: LanguageCode;
  onSelectCaseStudy: (project: CaseStudyItem) => void;
  onOpenLightbox: (items: LightboxImageItem[], startIndex: number) => void;
  onOpenMediaStudio: () => void;
}

export function ClientsCaseStudiesZone({
  lang,
  onSelectCaseStudy,
  onOpenLightbox,
  onOpenMediaStudio,
}: ClientsCaseStudiesZoneProps) {
  const [activeFilter, setActiveFilter] = useState<'All' | CaseStudyCategory>('All');
  const [showAllSpreads, setShowAllSpreads] = useState(false);

  const dict = UI_DICTIONARY[lang].cases;
  const localizedCaseStudies = useMemo(() => getCaseStudies(lang), [lang]);

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') return localizedCaseStudies;
    return localizedCaseStudies.filter((p) => p.category === activeFilter);
  }, [activeFilter, localizedCaseStudies]);

  const logoLightboxItems: LightboxImageItem[] = useMemo(
    () =>
      CLIENT_LOGOS.map((l) => ({
        src: l.src,
        caption: `${l.name} — ${l.sector}`,
      })),
    [],
  );

  const otherCustomerLightboxItems: LightboxImageItem[] = useMemo(
    () =>
      OTHER_CUSTOMERS_WALL.map((c) => ({
        src: c.src,
        caption: `${c.name} — Partner Brand Identity`,
      })),
    [],
  );

  const profileLightboxItems: LightboxImageItem[] = useMemo(
    () =>
      PROFILE_VISUALS.map((pv) => ({
        src: pv.src,
        caption: `${pv.caption} (${pv.pageLabel}) — ${pv.alt}`,
      })),
    [],
  );

  const spreadLightboxItems: LightboxImageItem[] = useMemo(
    () =>
      PDF_SPREADS.map((sp) => ({
        src: sp.src,
        caption: `Profile Page ${String(sp.page).padStart(2, '0')} — ${sp.title}`,
      })),
    [],
  );

  const visibleSpreads = showAllSpreads ? PDF_SPREADS : PDF_SPREADS.slice(0, 8);

  return (
    <div className="studio-card rounded-2xl w-full max-w-6xl mx-auto max-h-[calc(100dvh-168px)] overflow-hidden border-t-[3px] border-t-[#E31E24]">
      <div className="zone-scroll-area custom-scroll max-h-[calc(100dvh-172px)] overflow-y-auto p-4 sm:p-7">
        {/* Header */}
        <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-5 border-b border-slate-200 dark:border-white/12">
          <div>
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#C8191E] dark:text-[#F87171] font-bold">
              {dict.eyebrow}
            </span>
            <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-slate-900 dark:text-white mt-1">
              {dict.title}
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm mt-1.5 max-w-2xl leading-relaxed">
              {dict.subtitle}
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <span className="block w-8 h-1 bg-gradient-to-r from-[#162A64] to-[#E31E24] rounded-full" />
            <div className="text-right sm:text-left leading-tight">
              <div className="font-display font-extrabold text-xs tracking-wider text-slate-900 dark:text-white">
                IMAGINGARTS
              </div>
              <div className="font-mono text-[9px] tracking-[0.18em] text-slate-500 dark:text-slate-400">
                {dict.badgeCount}
              </div>
            </div>
          </div>
        </header>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-between gap-3 py-4">
          <div
            role="tablist"
            aria-label="Filter client case studies"
            className="flex flex-wrap gap-1.5 sm:gap-2"
          >
            {CASE_STUDY_CATEGORIES.map((category) => {
              const isSelected = activeFilter === category;
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveFilter(category)}
                  className={`px-3 py-1.5 rounded-lg border text-[11px] font-bold transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-[#162A64] border-[#162A64] dark:border-blue-400/70 text-white'
                      : 'bg-slate-100 dark:bg-white/[0.04] border-slate-200 dark:border-white/12 text-slate-700 dark:text-slate-300 hover:border-slate-400 dark:hover:border-white/30 hover:text-slate-950 dark:hover:text-white'
                  }`}
                >
                  {dict.categoryLabels[category]}
                </button>
              );
            })}
          </div>
          <span className="font-mono text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400 tabular-nums">
            {filteredProjects.length}{' '}
            {filteredProjects.length === 1 ? dict.projectSingular : dict.projectPlural}
          </span>
        </div>

        {/* 1. Case Study Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProjects.map((project, index) => {
            const isHeroFeature = activeFilter === 'All' && index === 0;
            return (
              <article
                key={project.id}
                onClick={() => onSelectCaseStudy(project)}
                className={`group rounded-2xl overflow-hidden border border-slate-200 dark:border-white/12 bg-slate-50 dark:bg-[#0A0D16] hover:border-[#E31E24]/70 transition-all flex flex-col cursor-pointer ${
                  isHeroFeature ? 'md:col-span-2 lg:col-span-2' : ''
                }`}
              >
                <div
                  className={`relative overflow-hidden border-b border-slate-200 dark:border-white/10 ${
                    isHeroFeature ? 'h-52 sm:h-64' : 'h-48 sm:h-52'
                  } ${
                    project.fit === 'contain'
                      ? 'bg-slate-100 dark:bg-[#080B14]'
                      : 'bg-slate-200 dark:bg-[#090B12]'
                  }`}
                >
                  <SmartImage
                    src={project.cover}
                    alt={`${project.name} cover visual`}
                    className={`w-full h-full transition-transform duration-500 group-hover:scale-[1.03] ${
                      project.fit === 'contain' ? 'object-contain p-3' : 'object-cover'
                    }`}
                  />
                  {project.logo && (
                    <div className="absolute top-3 left-3 w-10 h-10 rounded-full bg-white border border-slate-200 dark:border-white/40 shadow-md overflow-hidden flex items-center justify-center">
                      <SmartImage
                        src={project.logo}
                        alt={`${project.name} emblem`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>

                <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between">
                  <div>
                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#C8191E] dark:text-[#F87171]">
                      {project.eyebrow}
                    </span>
                    <h3 className="font-display font-extrabold text-lg text-slate-900 dark:text-white mt-1 leading-snug">
                      {project.name}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mt-1.5 line-clamp-3">
                      {project.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between gap-3 mt-4 pt-3 border-t border-slate-200 dark:border-white/10">
                    <span className="font-mono text-[10px] text-slate-500 dark:text-slate-400 uppercase tabular-nums">
                      {project.images.length} {dict.visualsCount}
                    </span>
                    <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#E31E24] group-hover:bg-[#B31217] text-white text-[11px] font-bold transition-colors">
                      {dict.viewCaseStudy}
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Modular Video Engine & 3D Studio Strip */}
        <section className="mt-7 p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-white/12 bg-slate-100/85 dark:bg-[#0D1322] flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="max-w-xl">
            <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-[#C8191E] dark:text-[#F87171] font-bold">
              {dict.mediaStripEyebrow}
            </span>
            <h3 className="font-display font-extrabold text-lg sm:text-xl text-slate-900 dark:text-white mt-0.5">
              {dict.mediaStripHeading}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
              {dict.mediaStripSub}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <div className="hidden sm:flex items-center -space-x-2 mr-1">
              {MODULAR_VIDEOS.slice(0, 3).map((vid) => (
                <img
                  key={vid.id}
                  src={vid.poster}
                  alt={vid.title}
                  className="w-10 h-10 rounded-lg object-cover border-2 border-white dark:border-[#0D1322] shadow-sm"
                />
              ))}
            </div>
            <button
              type="button"
              onClick={onOpenMediaStudio}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#E31E24] hover:bg-[#B31217] text-white font-display font-bold text-xs tracking-wide shadow-md transition-colors cursor-pointer"
            >
              <Film className="w-4 h-4" />
              <span>{dict.openMediaStudioBtn}</span>
            </button>
          </div>
        </section>

        {/* 2. ALL 19 Circular Client Logos (Profile Page 9) */}
        <section className="pt-7 mt-7 border-t border-slate-200 dark:border-white/12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-4">
            <div>
              <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-[#C8191E] dark:text-[#F87171] font-bold">
                {dict.clientsEyebrow}
              </span>
              <h3 className="font-display font-extrabold text-xl text-slate-900 dark:text-white mt-0.5">
                {dict.clientsHeading}
              </h3>
            </div>
            <button
              type="button"
              onClick={() =>
                onOpenLightbox(
                  [
                    {
                      src: '/assets/imagingarts/pdf-spreads/page-09.jpg',
                      caption: 'Page 09 — Complete 19 Client Logos Wall & Legal Status',
                    },
                  ],
                  0,
                )
              }
              className="self-start sm:self-auto px-3.5 py-2 rounded-lg bg-[#162A64] border border-transparent dark:border-white/15 text-xs font-semibold text-white hover:bg-[#25449C] transition-colors cursor-pointer inline-flex items-center gap-1.5"
            >
              <span>{dict.viewPage09}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-7 gap-2.5">
            {CLIENT_LOGOS.map((client, idx) => {
              const linkedCase = client.caseStudyId
                ? localizedCaseStudies.find((c) => c.id === client.caseStudyId)
                : undefined;

              return (
                <button
                  key={client.name}
                  type="button"
                  onClick={() => {
                    if (linkedCase) {
                      onSelectCaseStudy(linkedCase);
                    } else {
                      onOpenLightbox(logoLightboxItems, idx);
                    }
                  }}
                  className="group p-2 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#0A0D16] hover:border-[#E31E24]/60 transition-all flex flex-col items-center text-center cursor-pointer"
                >
                  <div
                    className={`w-16 h-16 sm:w-18 sm:h-18 rounded-full overflow-hidden border border-slate-200 dark:border-white/25 flex items-center justify-center ${
                      client.src.includes('nicovic-perfumes') ? 'bg-[#050608]' : 'bg-white'
                    }`}
                  >
                    <SmartImage
                      src={client.src}
                      alt={`${client.name} logo`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <span className="mt-2 text-[11px] font-semibold text-slate-900 dark:text-slate-200 line-clamp-1">
                    {client.name}
                  </span>
                  <span className="text-[9px] font-mono text-slate-500 dark:text-slate-400 line-clamp-1">
                    {linkedCase ? dict.caseStudyLink : client.sector}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* 3. ALL 22 Other Projects / Customers Identities (Profile Page 19) */}
        <section className="pt-7 mt-7 border-t border-slate-200 dark:border-white/12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-4">
            <div>
              <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-[#C8191E] dark:text-[#F87171] font-bold">
                {dict.otherEyebrow}
              </span>
              <h3 className="font-display font-extrabold text-xl text-slate-900 dark:text-white mt-0.5">
                {dict.otherHeading}
              </h3>
            </div>
            <button
              type="button"
              onClick={() =>
                onOpenLightbox(
                  [
                    {
                      src: '/assets/imagingarts/pdf-spreads/page-19.jpg',
                      caption: 'Page 19 — Complete 22 Partner & Customer Brand Wall',
                    },
                  ],
                  0,
                )
              }
              className="self-start sm:self-auto px-3.5 py-2 rounded-lg bg-[#162A64] border border-transparent dark:border-white/15 text-xs font-semibold text-white hover:bg-[#25449C] transition-colors cursor-pointer inline-flex items-center gap-1.5"
            >
              <span>{dict.viewPage19}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2.5">
            {OTHER_CUSTOMERS_WALL.map((brand, idx) => (
              <button
                key={brand.name}
                type="button"
                onClick={() => onOpenLightbox(otherCustomerLightboxItems, idx)}
                className="group rounded-xl overflow-hidden border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#0A0D16] hover:border-[#E31E24]/60 text-left transition-all cursor-pointer"
              >
                <div className="h-20 sm:h-24 w-full overflow-hidden bg-slate-100 dark:bg-[#0D111B]">
                  <SmartImage
                    src={brand.src}
                    alt={`${brand.name} brand identity`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <div className="px-2.5 py-1.5 text-[10px] font-medium text-slate-800 dark:text-slate-300 truncate border-t border-slate-200 dark:border-white/10">
                  {brand.name}
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* 4. Company Profile Visuals (Pages 01-08) */}
        <section className="pt-7 mt-7 border-t border-slate-200 dark:border-white/12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-4">
            <div>
              <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-[#C8191E] dark:text-[#F87171] font-bold">
                {dict.profileEyebrow}
              </span>
              <h3 className="font-display font-extrabold text-xl text-slate-900 dark:text-white mt-0.5">
                {dict.profileHeading}
              </h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">{dict.profileSubtitle}</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {PROFILE_VISUALS.map((item, idx) => (
              <button
                key={item.src}
                type="button"
                onClick={() => onOpenLightbox(profileLightboxItems, idx)}
                className="group rounded-xl overflow-hidden border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#090B12] hover:border-[#E31E24]/60 text-left transition-all cursor-pointer"
              >
                <div className="h-32 sm:h-36 w-full overflow-hidden">
                  <SmartImage
                    src={item.src}
                    alt={item.alt}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform"
                  />
                </div>
                <div className="p-2.5 border-t border-slate-200 dark:border-white/10">
                  <span className="block text-[11px] font-semibold text-slate-900 dark:text-white line-clamp-1">
                    {item.caption}
                  </span>
                  <span className="block font-mono text-[9px] text-slate-500 dark:text-slate-400 mt-0.5">
                    {item.pageLabel}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* 5. Complete 20-Page June 2026 PDF Spread Archive */}
        <section className="pt-7 mt-7 border-t border-slate-200 dark:border-white/12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div>
              <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-[#C8191E] dark:text-[#F87171] font-bold">
                {dict.spreadsEyebrow}
              </span>
              <h3 className="font-display font-extrabold text-xl text-slate-900 dark:text-white mt-0.5">
                {dict.spreadsHeading}
              </h3>
            </div>
            <button
              type="button"
              onClick={() => setShowAllSpreads((prev) => !prev)}
              className="self-start sm:self-auto px-3.5 py-2 rounded-lg bg-slate-100 dark:bg-white/[0.06] border border-slate-200 dark:border-white/15 text-xs font-semibold text-slate-800 dark:text-white hover:bg-slate-200 dark:hover:bg-white/12 transition-colors cursor-pointer inline-flex items-center gap-1.5"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>{showAllSpreads ? dict.show8Spreads : dict.expandAll20}</span>
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {visibleSpreads.map((sp) => (
              <button
                key={sp.page}
                type="button"
                onClick={() => onOpenLightbox(spreadLightboxItems, sp.page - 1)}
                className="group rounded-xl overflow-hidden border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#090B12] hover:border-[#E31E24]/60 text-left transition-all cursor-pointer"
              >
                <div className="aspect-[16/11] w-full overflow-hidden bg-slate-200 dark:bg-[#0B0F1A]">
                  <SmartImage
                    src={sp.src}
                    alt={`Page ${sp.page}: ${sp.title}`}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform"
                  />
                </div>
                <div className="px-2.5 py-2 border-t border-slate-200 dark:border-white/10">
                  <span className="font-mono text-[9px] text-[#C8191E] dark:text-[#F87171] font-bold">
                    {dict.pagePrefix} {String(sp.page).padStart(2, '0')}
                  </span>
                  <span className="block text-[11px] text-slate-800 dark:text-slate-200 line-clamp-1 mt-0.5">
                    {sp.title}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Bottom Continuation Cue */}
        <footer className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-5 mt-7 border-t border-slate-200 dark:border-white/10 font-mono text-[10px] tracking-wider text-slate-500 dark:text-slate-400">
          <span>{dict.footerBrand}</span>
          <span className="text-slate-700 dark:text-slate-300">{dict.footerCue}</span>
        </footer>
      </div>
    </div>
  );
}
