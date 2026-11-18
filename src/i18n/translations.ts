import { CASE_STUDIES, type CaseStudyCategory, type CaseStudyItem } from '../data/caseStudies';
import {
  INSPECTOR_DATA,
  PRINT_TIERS,
  type InspectorRecord,
  type PrintTierData,
} from '../data/printTiers';

export type LanguageCode = 'en' | 'sw';
export type ThemeMode = 'dark' | 'light';

export interface UiDictionary {
  header: {
    returnHomeAria: string;
    portfolioBtn: string;
    quoteBtn: string;
    langToggleAria: string;
    themeToLight: string;
    themeToDark: string;
  };
  preloader: {
    subtitleLead: string;
    subtitleHighlight: string;
    subtitleTail: string;
    enterStudio: string;
  };
  dock: {
    prev: string;
    next: string;
    prevAria: string;
    nextAria: string;
    scrubberAria: string;
    navAria: string;
  };
  hero: {
    kicker: string;
    headlineLine1: string;
    headlineHighlight: string;
    headlineLine2: string;
    bodyStart: string;
    bodyBold1: string;
    bodyMid: string;
    bodyBold2: string;
    bodyClosing: string;
    ctaExplore: string;
    ctaClients: string;
    ctaProfile: string;
    ctaMediaStudio: string;
  };
  tierCard: {
    inspectBtn: string;
    quoteBtn: string;
  };
  inspector: {
    closeAria: string;
    closeBtn: string;
    configureBtn: string;
  };
  cases: {
    eyebrow: string;
    title: string;
    subtitle: string;
    badgeCount: string;
    allWorkTab: string;
    projectSingular: string;
    projectPlural: string;
    visualsCount: string;
    viewCaseStudy: string;
    clientsEyebrow: string;
    clientsHeading: string;
    viewPage09: string;
    caseStudyLink: string;
    otherEyebrow: string;
    otherHeading: string;
    viewPage19: string;
    profileEyebrow: string;
    profileHeading: string;
    profileSubtitle: string;
    spreadsEyebrow: string;
    spreadsHeading: string;
    show8Spreads: string;
    expandAll20: string;
    pagePrefix: string;
    footerBrand: string;
    footerCue: string;
    categoryLabels: Record<'All' | CaseStudyCategory, string>;
    openMediaStudioBtn: string;
    mediaStripEyebrow: string;
    mediaStripHeading: string;
    mediaStripSub: string;
  };
  caseModal: {
    closeAria: string;
    deliveredScope: string;
    visualsHeading: string;
    tapToZoom: string;
    itemsLabel: string;
  };
  quote: {
    eyebrow: string;
    title: string;
    currencyLabel: string;
    estimatedTier: string;
    freeDelivery: string;
    officeHeading: string;
    accreditedHeading: string;
    incorpLabel: string;
    licenseLabel: string;
    tinLabel: string;
    step1: string;
    step2: string;
    step3: string;
    step4: string;
    nameLabel: string;
    namePlaceholder: string;
    contactLabel: string;
    contactPlaceholder: string;
    notesLabel: string;
    notesPlaceholder: string;
    submitBtn: string;
    statusTitle: string;
    newQuoteBtn: string;
    finishLabels: {
      matte: string;
      foil: string;
      vinyl: string;
      pvc: string;
    };
    categoryOptions: Array<{ value: string; label: string }>;
  };
  mediaStudio: {
    title: string;
    subtitle: string;
    closeAria: string;
    tabShowreels: string;
    tab3DModels: string;
    tabArchitecture: string;
    backgroundVideoLabel: string;
    backgroundVideoOn: string;
    backgroundVideoOff: string;
    tvTextureLabel: string;
    loadLocalVideo: string;
    loadLocalGlb: string;
    playBtn: string;
    pauseBtn: string;
    muteBtn: string;
    unmuteBtn: string;
    loopLabel: string;
    placementLabel: string;
    triggerLabel: string;
    activeOnTv: string;
    sendToTv: string;
    sendToBg: string;
    modelsHeading: string;
    modelsSub: string;
    jumpToModelZone: string;
    archHeading: string;
    archNotes: string[];
  };
}

export const UI_DICTIONARY: Record<LanguageCode, UiDictionary> = {
  en: {
    header: {
      returnHomeAria: 'Return to ImagingArts Home',
      portfolioBtn: 'Client Portfolio',
      quoteBtn: 'Request Quote',
      langToggleAria: 'Select website language',
      themeToLight: 'Switch to Light theme',
      themeToDark: 'Switch to Dark theme',
    },
    preloader: {
      subtitleLead: 'We Think',
      subtitleHighlight: 'BIG',
      subtitleTail: 'for Your Brand · Dar es Salaam',
      enterStudio: 'Enter Studio →',
    },
    dock: {
      prev: 'Prev',
      next: 'Next',
      prevAria: 'Previous Section',
      nextAria: 'Next Section',
      scrubberAria: 'Spatial depth scrubber',
      navAria: 'Scale Spectrum Navigation',
    },
    hero: {
      kicker: 'Creative Branding · General Printing · Web & Events · Dar es Salaam',
      headlineLine1: 'We think',
      headlineHighlight: 'BIG',
      headlineLine2: 'for your Brand!',
      bodyStart: 'Powered by 6+ years of creative excellence in Tanzania — from ',
      bodyBold1: 'Skyscraper Billboards, 3D Signs & Fleet Wraps',
      bodyMid: ' to ',
      bodyBold2: 'Corporate Stationery, Apparel, Web & Micro Security IDs',
      bodyClosing: '. We Print Everything.',
      ctaExplore: 'Explore 7 Print Tiers',
      ctaClients: 'Clients & Case Studies',
      ctaProfile: 'Company Profile & Legal',
      ctaMediaStudio: '3D & Video Studio',
    },
    tierCard: {
      inspectBtn: 'Inspect Specifications',
      quoteBtn: 'Configure Quote →',
    },
    inspector: {
      closeAria: 'Close specifications',
      closeBtn: 'Close',
      configureBtn: 'Configure This Service',
    },
    cases: {
      eyebrow: 'SELECTED WORK · JUNE 2026 COMPANY PROFILE ARCHIVE',
      title: 'Clients & Case Studies',
      subtitle:
        'Every brand, organization, event campaign, partner logo, and profile visual from our Dar es Salaam June 2026 portfolio.',
      badgeCount: '9 CASE STUDIES · 41 BRANDS',
      allWorkTab: 'All work',
      projectSingular: 'project',
      projectPlural: 'projects',
      visualsCount: 'visuals',
      viewCaseStudy: 'View case study',
      clientsEyebrow: 'OUR CLIENTS · PDF PAGE 09',
      clientsHeading: 'All 19 Featured Client & Partner Logos',
      viewPage09: 'View Page 09 Client Wall',
      caseStudyLink: 'Case study ↗',
      otherEyebrow: 'OTHER PROJECTS / CUSTOMERS · PDF PAGE 19',
      otherHeading: 'All 22 Partner Brand Commissions',
      viewPage19: 'View Page 19 Customer Wall',
      profileEyebrow: 'COMPANY PROFILE VISUALS · PAGES 01–08',
      profileHeading: 'More from ImagingArts Studio & Team',
      profileSubtitle:
        'Editorial portraits, studio workspace, digital presence, and Mbezi Beach delivery fleet.',
      spreadsEyebrow: 'COMPLETE JUNE 2026 DOCUMENT · 20 PAGES',
      spreadsHeading: 'Full Company Profile Spreads (Pages 01–20)',
      show8Spreads: 'Show 8 Featured Spreads',
      expandAll20: 'Expand All 20 PDF Pages',
      pagePrefix: 'PAGE',
      footerBrand: 'IMAGINGARTS · CREATIVE BRANDING · DAR ES SALAAM',
      footerCue: 'KEEP SCROLLING DOWN AT THE END TO ENTER STUDIO & QUOTE CONFIGURATOR ↓',
      categoryLabels: {
        All: 'All work',
        Corporate: 'Corporate',
        Education: 'Education',
        'NGO & Community': 'NGO & Community',
        Events: 'Events',
        'Product Branding': 'Product Branding',
        Other: 'Other',
      },
      openMediaStudioBtn: 'Open Video & 3D Media Studio',
      mediaStripEyebrow: 'MODULAR MEDIA ENGINE · VIDEO & GLB READY',
      mediaStripHeading: 'Showreels, 3D VideoTexture & Blender Assets',
      mediaStripSub:
        'Independent Video Engine & Layer-02 3D GLB loader driving live VideoTexture screens without disturbing existing animations.',
    },
    caseModal: {
      closeAria: 'Close case study details',
      deliveredScope: 'Delivered Scope',
      visualsHeading: 'Project Visuals & Profile Spreads',
      tapToZoom: 'Tap any visual to zoom',
      itemsLabel: 'items',
    },
    quote: {
      eyebrow: 'IMAGINGARTS CREATIVE BRANDING · HQ',
      title: 'Start Your Print or Branding Project',
      currencyLabel: 'Currency',
      estimatedTier: 'Estimated Tier',
      freeDelivery: 'FREE DELIVERY IN MBEZI BEACH & SURROUNDING AREAS',
      officeHeading: 'Our Dials & Office',
      accreditedHeading: 'ACCREDITED & REGISTERED:',
      incorpLabel: 'Incorporation No',
      licenseLabel: 'Business License',
      tinLabel: 'TIN Number',
      step1: '1. Service Pillar / Print Tier',
      step2: '2. Material & Finish',
      step3: '3. Dimensions / Scope',
      step4: '4. Qty',
      nameLabel: 'Your Name / Organization',
      namePlaceholder: 'e.g. Asha Mwinyi / Horizon Ltd',
      contactLabel: 'Phone (WhatsApp) or Email',
      contactPlaceholder: '+255 7XX XXX XXX / email',
      notesLabel: 'Project Specifications',
      notesPlaceholder: 'Tell us about your branding, printing, signage, or event needs...',
      submitBtn: 'Send Project Brief to ImagingArts',
      statusTitle: 'Inquiry Logged for ImagingArts Mbezi Beach HQ!',
      newQuoteBtn: 'New Quote',
      finishLabels: {
        matte: 'Matte / Velvet',
        foil: 'Foil + Emboss',
        vinyl: 'Outdoor Vinyl / 3D',
        pvc: 'PVC ID / Cotton',
      },
      categoryOptions: [
        {
          value: 'Giant & Large-Format Printing',
          label: '01. Giant & Large-Format (Billboards, Wraps, 3D Signs)',
        },
        {
          value: 'Publishing & Commercial Editorial',
          label: '02. Publishing & Editorial (Profiles, Books, Journals)',
        },
        {
          value: 'Packaging & Containers',
          label: '03. Packaging & Containers (Cartons, Pouches, Labels)',
        },
        {
          value: 'Marketing & Retail Collateral',
          label: '04. Marketing, Retail, Web Design & Events',
        },
        {
          value: 'Corporate Stationery & Office Essentials',
          label: '05. Corporate Stationery & NCR Books',
        },
        {
          value: 'Textiles & Promotional Merchandise',
          label: '06. Textiles, Uniforms, Trophies & Merch',
        },
        {
          value: 'Small & Micro-Format Printing',
          label: '07. Small & Micro Print (PVC IDs, Foil Cards, Holograms)',
        },
      ],
    },
    mediaStudio: {
      title: 'ImagingArts Modular Media & 3D Studio',
      subtitle:
        'Independent Video Engine, Three.js VideoTexture Monitor, and Modular GLB Model Loader (Layer 02/03).',
      closeAria: 'Close Media Studio',
      tabShowreels: 'Video Library & Reels',
      tab3DModels: '3D Models (GLB) & TV Texture',
      tabArchitecture: 'Media Architecture',
      backgroundVideoLabel: 'Ambient Website Background Reel',
      backgroundVideoOn: 'Active',
      backgroundVideoOff: 'Off',
      tvTextureLabel: 'Live 3D TV VideoTexture Feed',
      loadLocalVideo: 'Test Local MP4 / WebM',
      loadLocalGlb: 'Preview Blender .GLB Model',
      playBtn: 'Play',
      pauseBtn: 'Pause',
      muteBtn: 'Mute',
      unmuteBtn: 'Unmute',
      loopLabel: 'Loop',
      placementLabel: 'Placement',
      triggerLabel: 'Scroll Trigger',
      activeOnTv: 'Playing on 3D TV',
      sendToTv: 'Project to 3D TV',
      sendToBg: 'Set Background Reel',
      modelsHeading: 'Personal 3D Model Registry (`src/data/models.ts`)',
      modelsSub:
        'Each GLB or procedural model runs on its own AnimationMixer without altering Layer 01 background animations.',
      jumpToModelZone: 'Inspect in 3D Scene →',
      archHeading: 'Decoupled 3-Layer & Video Engine Architecture',
      archNotes: [
        'Layer 01 (Existing 3D Environment): Background tunnel, camera flight, lights, and tier monoliths remain untouched.',
        'Layer 02 (Personal 3D Models via GLTFLoader): Blender `.glb` assets mount with independent `AnimationMixer` instances—never calling `scene.clear()`.',
        'Layer 03 (Interaction & Motion): Hover, scroll zone triggers, and rotation controls run independently per model.',
        'Video Engine (`src/engine/videoManager.ts`): Manages H.264 MP4/WebM reels, lazy metadata loading, Android single-stream protection, and Three.js `VideoTexture` projection onto 3D surfaces.',
      ],
    },
  },
  sw: {
    header: {
      returnHomeAria: 'Rudi Mwanzo ImagingArts',
      portfolioBtn: 'Kazi za Wateja',
      quoteBtn: 'Omba Bei',
      langToggleAria: 'Chagua lugha ya tovuti',
      themeToLight: 'Badilisha kwenda Mwanga',
      themeToDark: 'Badilisha kwenda Giza',
    },
    preloader: {
      subtitleLead: 'Tunafikiri',
      subtitleHighlight: 'KUBWA',
      subtitleTail: 'kwa Chapa Yako · Dar es Salaam',
      enterStudio: 'Ingia Studio →',
    },
    dock: {
      prev: 'Nyuma',
      next: 'Mbele',
      prevAria: 'Sehemu Iliyopita',
      nextAria: 'Sehemu Inayofuata',
      scrubberAria: 'Kipimo cha usafiri wa 3D',
      navAria: 'Mpangilio wa Sehemu za Tovuti',
    },
    hero: {
      kicker: 'Ubunifu wa Chapa · Uchapishaji wa Jumla · Tovuti & Matukio · Dar es Salaam',
      headlineLine1: 'Tunafikiri',
      headlineHighlight: 'KUBWA',
      headlineLine2: 'kwa Chapa Yako!',
      bodyStart: 'Tukitumia uzoefu wa miaka 6+ wa ubunifu Tanzania — kuanzia ',
      bodyBold1: 'Mabango Makubwa, Alama za 3D & Chapa za Magari',
      bodyMid: ' hadi ',
      bodyBold2: 'Vifaa vya Ofisi, Sare za Nguo, Tovuti & Vitambulisho vya PVC',
      bodyClosing: '. Tunachapisha Kila Kitu.',
      ctaExplore: 'Chunguza Daraja 7 za Kazi',
      ctaClients: 'Wateja & Miradi Yetu',
      ctaProfile: 'Wasifu wa Kampuni & Usajili',
      ctaMediaStudio: 'Studio ya Video & 3D',
    },
    tierCard: {
      inspectBtn: 'Angalia Vipimo',
      quoteBtn: 'Panga Gharama →',
    },
    inspector: {
      closeAria: 'Funga maelezo',
      closeBtn: 'Funga',
      configureBtn: 'Panga Huduma Hii',
    },
    cases: {
      eyebrow: 'KAZI TEULE · KUMBUKUMBU YA WASIFU WA JUNI 2026',
      title: 'Wateja & Miradi Yetu',
      subtitle:
        'Kila chapa, taasisi, kampeni ya matukio, nembo za washirika na picha kutoka wasifu wetu wa Dar es Salaam Juni 2026.',
      badgeCount: 'MIRADI 9 · CHAPA 41',
      allWorkTab: 'Kazi Zote',
      projectSingular: 'mradi',
      projectPlural: 'miradi',
      visualsCount: 'picha',
      viewCaseStudy: 'Fungua mradi',
      clientsEyebrow: 'WATEJA WETU · UKURASA WA 09',
      clientsHeading: 'Nembo Zote 19 za Wateja na Washirika',
      viewPage09: 'Tazama Ukurasa wa 09',
      caseStudyLink: 'Maelezo ya mradi ↗',
      otherEyebrow: 'MIRADI MINGINE / WATEJA · UKURASA WA 19',
      otherHeading: 'Chapa Zote 22 za Wateja Wengine',
      viewPage19: 'Tazama Ukurasa wa 19',
      profileEyebrow: 'PICHA ZA STUDIO · KURASA 01–08',
      profileHeading: 'Zaidi Kutoka Studio na Timu ya ImagingArts',
      profileSubtitle:
        'Picha za timu, mazingira ya kazi, huduma za kidijitali na usafirishaji Mbezi Beach.',
      spreadsEyebrow: 'WASIFU KAMILI WA JUNI 2026 · KURASA 20',
      spreadsHeading: 'Kurasa Zote za Wasifu wa Kampuni (01–20)',
      show8Spreads: 'Onyesha Kurasa 8 Muhimu',
      expandAll20: 'Fungua Kurasa Zote 20 za PDF',
      pagePrefix: 'UKURASA',
      footerBrand: 'IMAGINGARTS · UBUNIFU WA CHAPA · DAR ES SALAAM',
      footerCue: 'ENDELEA KUSHUKA CHINI KUFUNGUA SEHEMU YA MAWASILIANO NA MAKISIO ↓',
      categoryLabels: {
        All: 'Kazi Zote',
        Corporate: 'Kampuni',
        Education: 'Elimu',
        'NGO & Community': 'Mashirika & Jamii',
        Events: 'Matukio',
        'Product Branding': 'Chapa za Bidhaa',
        Other: 'Nyingine',
      },
      openMediaStudioBtn: 'Fungua Studio ya Video & 3D',
      mediaStripEyebrow: 'MFUMO WA VIDEO & 3D · TAYARI KWA GLB & MP4',
      mediaStripHeading: 'Video za Kazi, Runinga ya 3D & Models za Blender',
      mediaStripSub:
        'Mfumo huru wa Video na Models za 3D (Layer 02) unaocheza VideoTexture kwenye 3D bila kuvuruga michoro ya zamani.',
    },
    caseModal: {
      closeAria: 'Funga maelezo ya mradi',
      deliveredScope: 'Kazi Zilizotekelezwa',
      visualsHeading: 'Picha za Mradi na Kurasa za Wasifu',
      tapToZoom: 'Bonyeza picha yoyote kukuza',
      itemsLabel: 'picha',
    },
    quote: {
      eyebrow: 'IMAGINGARTS CREATIVE BRANDING · MAKAO MAKUU',
      title: 'Anza Mradi Wako wa Chapa au Uchapishaji',
      currencyLabel: 'Sarafu',
      estimatedTier: 'Makisio ya Gharama',
      freeDelivery: 'USAFIRISHAJI BURE MBEZI BEACH NA MAENEO YA JIRANI',
      officeHeading: 'Mawasiliano & Ofisi Yetu',
      accreditedHeading: 'USAJILI HALALI NA LESENI:',
      incorpLabel: 'Namba ya Usajili (BRELA)',
      licenseLabel: 'Leseni ya Biashara',
      tinLabel: 'Namba ya TIN',
      step1: '1. Aina ya Huduma / Daraja',
      step2: '2. Malighafi & Kumalizia',
      step3: '3. Vipimo / Maelezo',
      step4: '4. Idadi',
      nameLabel: 'Jina Lako / Taasisi',
      namePlaceholder: 'mf. Asha Mwinyi / Horizon Ltd',
      contactLabel: 'Simu (WhatsApp) au Barua Pepe',
      contactPlaceholder: '+255 7XX XXX XXX / barua pepe',
      notesLabel: 'Maelezo ya Ziada ya Mradi',
      notesPlaceholder: 'Eleza mahitaji yako ya chapa, mabango, uchapishaji au matukio...',
      submitBtn: 'Tuma Maelezo ya Mradi ImagingArts',
      statusTitle: 'Ombi Lako Limepokelewa — Ofisi ya Mbezi Beach!',
      newQuoteBtn: 'Makisio Mapya',
      finishLabels: {
        matte: 'Matte / Velvet',
        foil: 'Foil ya Dhahabu + Emboss',
        vinyl: 'Vinyl ya Nje / 3D',
        pvc: 'Kadi za PVC / Pamba',
      },
      categoryOptions: [
        {
          value: 'Giant & Large-Format Printing',
          label: '01. Uchapishaji Mkubwa (Mabango, Magari, Alama za 3D)',
        },
        {
          value: 'Publishing & Commercial Editorial',
          label: '02. Uchapishaji wa Vitabu, Majarida & Wasifu',
        },
        {
          value: 'Packaging & Containers',
          label: '03. Vifungashio, Maboksi, Makopo & Lebo',
        },
        {
          value: 'Marketing & Retail Collateral',
          label: '04. Masoko, Matukio, Tovuti & Vipeperushi',
        },
        {
          value: 'Corporate Stationery & Office Essentials',
          label: '05. Vifaa vya Ofisi, Stakabadhi & Vitabu vya NCR',
        },
        {
          value: 'Textiles & Promotional Merchandise',
          label: '06. Nguo, Sare, Vikombe & Tuzo za Utangazaji',
        },
        {
          value: 'Small & Micro-Format Printing',
          label: '07. Uchapishaji Mdogo (Vitambulisho vya PVC, Kadi & Hologramu)',
        },
      ],
    },
    mediaStudio: {
      title: 'Studio ya Video na 3D ya ImagingArts',
      subtitle:
        'Injini Huru ya Video, Runinga ya 3D VideoTexture, na Mfumo wa Models za Blender (.glb) Layer 02/03.',
      closeAria: 'Funga Studio ya Media',
      tabShowreels: 'Maktaba ya Video',
      tab3DModels: 'Models za 3D (GLB) & TV',
      tabArchitecture: 'Mpangilio wa Mfumo',
      backgroundVideoLabel: 'Video ya Mandharinyuma ya Tovuti',
      backgroundVideoOn: 'Imewashwa',
      backgroundVideoOff: 'Imezimwa',
      tvTextureLabel: 'Video Inayocheza Kwenye Runinga ya 3D',
      loadLocalVideo: 'Jaribu Video ya MP4 / WebM',
      loadLocalGlb: 'Jaribu Model ya Blender (.GLB)',
      playBtn: 'Cheza',
      pauseBtn: 'Simamisha',
      muteBtn: 'Zima Sauti',
      unmuteBtn: 'Washa Sauti',
      loopLabel: 'Irudie (Loop)',
      placementLabel: 'Mahali',
      triggerLabel: 'Kichocheo cha Scroll',
      activeOnTv: 'Inacheza Kwenye TV ya 3D',
      sendToTv: 'Onyesha Kwenye TV ya 3D',
      sendToBg: 'Weka Kama Mandharinyuma',
      modelsHeading: 'Orodha ya Models za 3D (`src/data/models.ts`)',
      modelsSub:
        'Kila model ya GLB hutumia AnimationMixer yake yenyewe bila kuvuruga michoro iliyopo kwenye Layer 01.',
      jumpToModelZone: 'Tazama Kwenye 3D →',
      archHeading: 'Muundo wa Tabaka 3 & Injini Huru ya Video',
      archNotes: [
        'Layer 01 (Mazingira ya 3D Yaliyopo): Mwendo wa kamera, mwanga na mabango ya msingi hubaki kama yalivyo.',
        'Layer 02 (Models Zako za Blender kupitia GLTFLoader): Kila `.glb` hupewa `AnimationMixer` yake binafsi bila kuita `scene.clear()`.',
        'Layer 03 (Mwingiliano): Mzunguko, hover na vichocheo vya scroll husimamiwa kivyake kwa kila model.',
        'Video Engine (`src/engine/videoManager.ts`): Husimamia video za MP4/WebM, lazy loading kwa Android, na `VideoTexture` kwenye runinga ya 3D.',
      ],
    },
  },
};

const ZONE_LABELS_SW: Record<number, { label: string; title: string }> = {
  0: { label: '00 · Tunafikiri KUBWA', title: 'Makao Makuu ya Ubunifu' },
  1: { label: '01 · Mabango & Alama za 3D', title: 'Mabango, Magari & 3D' },
  2: { label: '02 · Vitabu & Wasifu', title: 'Wasifu, Majarida & Vitabu' },
  3: { label: '03 · Vifungashio & Makasha', title: 'Maboksi, Makopo & Lebo' },
  4: { label: '04 · Masoko, Tovuti & Matukio', title: 'Kampeni, Jukwaa & Tovuti' },
  5: { label: '05 · Vifaa vya Ofisi', title: 'Barua, Stakabadhi & NCR' },
  6: { label: '06 · Nguo & Zawadi za Chapa', title: 'Sare, Fulana & Tuzo' },
  7: { label: '07 · Vitambulisho & Kazi Ndogo', title: 'Kadi za PVC & Foil' },
  8: { label: '08 · Wateja & Miradi Yetu', title: 'Matokeo ya Chapa Tanzania' },
  9: { label: '09 · Makisio & Mbezi Beach', title: 'Omba Bei & Mawasiliano' },
};

export function getLocalizedZoneLabel(
  zoneId: number,
  defaultLabel: string,
  lang: LanguageCode,
): string {
  if (lang === 'sw' && ZONE_LABELS_SW[zoneId]) {
    return ZONE_LABELS_SW[zoneId].label;
  }
  return defaultLabel;
}

const PRINT_TIERS_SW_PATCH: Record<
  number,
  {
    badge: string;
    techSpec: string;
    title: string;
    subtitle: string;
    bullets: Array<{ lead: string; text: string }>;
    sideNote: { eyebrow: string; heading: string; body: string };
  }
> = {
  1: {
    badge: 'DARAJA 01 · MABANGO MAKUBWA & NJE',
    techSpec: 'ALAMA ZA 2D & 3D',
    title: 'Uchapishaji Mkubwa & Mabango',
    subtitle:
      'Mashine za kisasa za wide-format, utengenezaji wa alama za 3D na chapa za nje zinazoonekana kila kona Tanzania.',
    bullets: [
      { lead: 'Mabango Makubwa & Majengo:', text: 'Bango kubwa za vinyl na mesh kwa ajili ya majengo marefu na barabara kuu.' },
      { lead: 'Chapa Kwenye Magari & Malori:', text: 'Uwekaji wa stika bora kwenye magari, mabasi na malori ya usambazaji (mf. ESON Super Battery).' },
      { lead: 'Maonyesho & Jukwaa:', text: 'Mabango ya mikutano ya waandishi, mabanda ya maonyesho na maandalizi ya jukwaa.' },
      { lead: 'Alama za 2D & 3D:', text: 'Vibao vya mwelekeo barabarani, alama za milangoni, stika za kioo, PVC, acrylic na alumini.' },
      { lead: 'Bendera & Mabango ya Nje:', text: 'Bendera za taasisi (Rightway Schools), feather flags na mabango ya nguzo za barabarani.' },
    ],
    sideNote: {
      eyebrow: 'Imethibitishwa Dar es Salaam',
      heading: 'Malori ya ESON & Alama za SF Smart Energy',
      body: 'Uwekaji wa chapa kwenye malori ya Fuso Canter, vibao vya barabarani na alama za 3D zenye mwanga.',
    },
  },
  2: {
    badge: 'DARAJA 02 · UCHAPISHAJI WA VITABU & WASIFU',
    techSpec: 'OFFSET & DIGITAL PRESS',
    title: 'Vitabu, Majarida & Wasifu wa Kampuni',
    subtitle:
      'Uchapishaji wa kasi wa offset na digital kwa machapisho yenye kurasa nyingi na hadhi ya kimataifa.',
    bullets: [
      { lead: 'Wasifu wa Kampuni & Vitabu:', text: 'Ubunifu na uchapishaji wa wasifu (nakala 500+ kwa IZ Engineering), vitabu vigumu na vya kiada.' },
      { lead: 'Majarida & Programu za Mikutano:', text: 'Majarida ya rangi, katalogi na vitabu vya programu za Mwana Kigosi & Mwalimu Conference.' },
      { lead: 'Miongozo & Maandiko ya Miradi:', text: 'Vitabu vya mwongozo wa kiufundi, concept notes na orodha za huduma.' },
    ],
    sideNote: {
      eyebrow: 'Ubunifu + Uchapishaji Pamoja',
      heading: 'Wasifu wa Kampuni & Majarida ya Kongamano',
      body: 'Kuanzia mpangilio wa kurasa hadi ujalada imara wa Smyth-sewn na PUR glossy.',
    },
  },
  3: {
    badge: 'DARAJA 03 · VIFUNGASHIO & MAKASHA',
    techSpec: 'MABOKSI, MAKOPO & LEBO',
    title: 'Vifungashio & Makontena ya Bidhaa',
    subtitle:
      'Ubunifu wa vifungashio imara na uchapishaji kwenye karatasi ngumu, plastiki, chuma na kioo kwa viwanda vya Afrika Mashariki.',
    bullets: [
      { lead: 'Maboksi ya Usafirishaji:', text: 'Katoni imara za kusafirishia bidhaa na maboksi ya kuonyesha dukani.' },
      { lead: 'Makasha ya Bidhaa & Viwandani:', text: 'Maboksi ya vipodozi, manukato (Nicovic Perfumes), betri (ESON 12N9L-BS) na vyakula.' },
      { lead: 'Vifungashio Laini:', text: 'Mifuko ya kusimama (stand-up pouches), lebo za joto na vifungashio vya foil.' },
      { lead: 'Chupa, Makopo & Vikombe:', text: 'Uchapishaji kwenye chupa, makopo na vikombe vya matumizi ya haraka (Mr RedCups).' },
    ],
    sideNote: {
      eyebrow: 'Mvuto Dukani',
      heading: 'Vifungashio vya ESON & Manukato',
      body: 'Rangi ang’avu zenye mipako ya UV zinazozuia unyevu na mikwaruzo.',
    },
  },
  4: {
    badge: 'DARAJA 04 · MASOKO, TOVUTI & MATUKIO',
    techSpec: 'HUDUMA KAMILI 360°',
    title: 'Masoko, Tovuti & Usimamizi wa Matukio',
    subtitle:
      'Vipeperushi vya biashara vikiambatana na Usimamizi wa Matukio, Picha/Video za Kampuni na Ujenzi wa Tovuti za Kisasa.',
    bullets: [
      { lead: 'Vipeperushi & Mabango ya Kampeni:', text: 'Flyers, brochures za kukunja mara tatu na mabango ya uhamasishaji jamii (POCET).' },
      { lead: 'Mabango ya Dukani & POS:', text: 'Stendi za maonyesho, vibandiko vya rafu na mapambo ya meza za maonyesho.' },
      { lead: 'Menyu & Kalenda:', text: 'Menyu zisizolowa maji, kalenda za ukutani, za mezani na vitabu vya kumbukumbu.' },
      { lead: 'Matukio, Tovuti & Video:', text: 'Usimamizi wa kongamano (Zanzibar Cake Festival), upigaji video na tovuti za simu na kompyuta.' },
    ],
    sideNote: {
      eyebrow: 'Chapa + Dijitali + Matukio',
      heading: 'Uratibu Kamili wa Kongamano',
      body: 'Tunaandaa vifaa vya chapa, jukwaa, video ya kumbukumbu na tovuti yako chini ya paa moja.',
    },
  },
  5: {
    badge: 'DARAJA 05 · VIFAA VYA OFISI',
    techSpec: 'SHULE, OFISI & NYUMBANI',
    title: 'Vifaa vya Ofisi & Usambazaji Endelevu',
    subtitle:
      'Usambazaji usiokoma wa vifaa vya ofisi na shule vyenye nembo yako kwa muonekano mmoja thabiti kila siku.',
    bullets: [
      { lead: 'Barua Rasmi & Mihuri ya Kidijitali:', text: 'Letterheads, bahasha zinazolingana, mafolda na mihuri ya kisasa ya wino.' },
      { lead: 'Vitabu vya Stakabadhi (NCR):', text: 'Vitabu vya ankara, risiti, hati za usafirishaji na fomu za maagizo zisizohitaji karatasi ya kaboni.' },
      { lead: 'Madaftari & Karatasi za Double A:', text: 'Madaftari ya chapa, shajara za viongozi na usambazaji wa rimu za karatasi za Double A.' },
    ],
    sideNote: {
      eyebrow: 'Mikataba ya Usambazaji',
      heading: 'Inaaminiwa na Shule & Wakandarasi',
      body: 'Usambazaji endelevu kwa Rightway Schools, IZ Engineering na MINE Foundation.',
    },
  },
  6: {
    badge: 'DARAJA 06 · NGUO & ZAWADI ZA CHAPA',
    techSpec: 'SCREEN, DARIZI & UV',
    title: 'Nguo, Sare & Bidhaa za Utangazaji',
    subtitle:
      'Uchapishaji imara wa screen printing, darizi (embroidery) na UV kwenye sare, mapambo, tuzo na vifaa vigumu.',
    bullets: [
      { lead: 'Sare za Kampuni & Matukio:', text: 'Fulana za polo, T-shirts (100+ kwa kambi ya Mwana Kigosi), sare za kazi, kofia na mifuko.' },
      { lead: 'Mapambo ya Vitambaa:', text: 'Mapazia yaliyochapwa chapa, mito ya mapambo na vitambaa vya maonyesho.' },
      { lead: 'Vikombe, Tuzo & Vifaa Vigumu:', text: 'Vikombe vya kahawa, chupa za maji, kalamu za kiofisi, funguo na tuzo maalum za kioo/chuma.' },
    ],
    sideNote: {
      eyebrow: 'Sare & Tuzo',
      heading: 'Polo, Kofia, Tuzo & Vikombe',
      body: 'Darizi nadhifu na rangi zisizochujuka zilizojengwa kudumu kwenye matumizi makubwa.',
    },
  },
  7: {
    badge: 'DARAJA 07 · KAZI NDOGO & VITAMBULISHO',
    techSpec: '2400 DPI & KADI ZA PVC',
    title: 'Uchapishaji Mdogo & Usalama wa Kadi',
    subtitle:
      'Usahihi wa hali ya juu kwa vitambulisho vya wafanyakazi, kadi za matukio, lebo za bidhaa na alama za usalama.',
    bullets: [
      { lead: 'Business Cards & Vitambulisho vya PVC:', text: 'Kadi zenye foil au emboss (500+ kwa SF Smart Energy) & vitambulisho vya shingoni (500+ Mwalimu Conference).' },
      { lead: 'Lebo & Stika za Bidhaa:', text: 'Lebo za viungo vya bidhaa, stika za barcode na stika za vinyl zilizokatwa kwa umbo.' },
      { lead: 'Vyeti, Tiketi & Mikanda ya Mkononi:', text: 'Vyeti vya mahafali na tuzo (500+ Rightway & Mwalimu), tiketi na wristbands.' },
      { lead: 'Usalama & Vipeperushi vya Dawa:', text: 'Hologramu za kuzuia ughushi, kadi za kukwangua na vikaratasi vidogo vya ndani ya maboksi ya dawa.' },
    ],
    sideNote: {
      eyebrow: 'PVC & Foil kwa Wingi',
      heading: 'Vitambulisho & Vyeti 1,500+ Vimekabidhiwa',
      body: 'Kadi zenye taarifa binafsi, mipako ya UV na lebo za usalama za hali ya juu.',
    },
  },
};

export function getPrintTiers(lang: LanguageCode): PrintTierData[] {
  if (lang === 'en') return PRINT_TIERS;
  return PRINT_TIERS.map((tier) => {
    const patch = PRINT_TIERS_SW_PATCH[tier.zoneId];
    return patch ? { ...tier, ...patch } : tier;
  });
}

const INSPECTOR_SW_PATCH: Record<string, Partial<InspectorRecord>> = {
  about: {
    badge: 'WASIFU WA KAMPUNI IMAGINGARTS · JUNI 2026',
    title: 'Tunafikiri KUBWA kwa Chapa Yako!',
    desc: 'ImagingArts ni wataalamu wa ubunifu wa chapa (ndani na nje ya ofisi), alama za 2D na 3D, mabango, uchapishaji na usambazaji wa jumla, bidhaa za matangazo, ubunifu wa tovuti, picha na video za makampuni, pamoja na usimamizi wa matukio. Tunapatikana White Beach Park Commercial Complex, Ghorofa ya Kwanza, Ofisi #207/210, Mbezi Beach, Dar es Salaam.',
    specs: [
      ['Maono (Vision)', 'Kuwezesha chapa, taasisi na watu binafsi kupitia hadithi za kuona zinazoaminika, kuhifadhi historia na kukuza biashara.'],
      ['Dhamira (Mission)', 'Kuwa kituo kinachoongoza cha ubunifu Tanzania ambapo sanaa hukutana na mkakati wa kibiashara.'],
      ['Thamani Kuu', 'Karibu na wateja wetu kila wakati, kila mahali.'],
      ['Mbinu Yetu', 'Kujenga uhusiano imara, kusikiliza kwa makini na kubadili mahitaji ya mteja kuwa suluhisho bora la ubunifu kwa wakati.'],
      ['Kwa Nini ImagingArts', 'Bidhaa na huduma bora kwa bei shindani, pamoja na ufikishaji wa haraka na uhakika.'],
      ['Usafirishaji', 'Usafirishaji bure ndani ya Mbezi Beach na maeneo jirani; maeneo mengine tunajadiliana.'],
      ['Usajili Halali', 'Cheti cha Usajili #488483 | Leseni BL01396912025-2600010011 | TIN 139-769-368'],
    ],
  },
  tier1: { badge: 'DARAJA 01 · MABANGO & NJE', title: 'Mabango Makubwa & Alama za 2D/3D' },
  tier2: { badge: 'DARAJA 02 · VITABU & WASIFU', title: 'Vitabu, Majarida & Wasifu wa Kampuni' },
  tier3: { badge: 'DARAJA 03 · VIFUNGASHIO', title: 'Maboksi, Makasha & Lebo za Bidhaa' },
  tier4: { badge: 'DARAJA 04 · MASOKO & MATUKIO', title: 'Vipeperushi, Matukio & Ujenzi wa Tovuti' },
  tier5: { badge: 'DARAJA 05 · VIFAA VYA OFISI', title: 'Stationery & Usambazaji Usio na Kikomo' },
  tier6: { badge: 'DARAJA 06 · NGUO & TUZO', title: 'Sare, Fulana, Vikombe & Tuzo' },
  tier7: { badge: 'DARAJA 07 · KAZI NDOGO & PVC', title: 'Vitambulisho vya PVC, Foil & Usalama' },
};

export function getInspectorData(lang: LanguageCode): Record<string, InspectorRecord> {
  if (lang === 'en') return INSPECTOR_DATA;
  const result: Record<string, InspectorRecord> = {};
  for (const [k, rec] of Object.entries(INSPECTOR_DATA)) {
    const patch = INSPECTOR_SW_PATCH[k];
    const tierPatch = k.startsWith('tier')
      ? PRINT_TIERS_SW_PATCH[Number(k.replace('tier', ''))]
      : undefined;
    result[k] = {
      ...rec,
      ...(tierPatch ? { desc: tierPatch.subtitle } : {}),
      ...(patch || {}),
    };
  }
  return result;
}

const CASE_STUDIES_SW_PATCH: Record<
  string,
  { eyebrow: string; description: string; services: string[] }
> = {
  'eson-super-battery': {
    eyebrow: 'CHAPA YA BIDHAA & MAGARI',
    description:
      'Uzinduzi kamili wa chapa ya ESON ("Energy Solution — Powerful energy store"): lebo za betri (12N9L-BS), uwekaji chapa kwenye malori ya Fuso Canter na mabango ya kampeni.',
    services: [
      'Ubunifu wa picha za bidhaa',
      'Lebo na makasha ya betri (12N9L-BS)',
      'Uwekaji chapa kwenye malori ya biashara',
      'Mabango na picha za matangazo',
    ],
  },
  'sf-smart-energy': {
    eyebrow: 'CHAPA YA KAMPUNI & MAKALA',
    description:
      'Kampuni ya Tanzania inayounganisha na kusambaza mita janja za umeme, maji na gesi. ImagingArts iliandaa nembo, vibao vya barabarani, upigaji picha na video za makala.',
    services: [
      'Ubunifu wa nembo',
      'Alama za barabarani na milangoni',
      'Upigaji picha za kiufundi',
      'Uzalishaji wa video ya makala',
      'Vitambulisho vya PVC & business cards',
    ],
  },
  'iz-engineering': {
    eyebrow: 'CHAPA YA OFISI & UHANDISI',
    description:
      'Kampuni tanzu ya I & Z Group inayohusika na njia za umeme, ujenzi wa majengo na usambazaji vifaa. Tuliandaa nembo, wasifu 500+, chapa ya ofisi na karatasi za ofisi.',
    services: [
      'Ubunifu wa nembo',
      'Vitambulisho vya wafanyakazi & kadi za biashara',
      'Wasifu wa kampuni & uchapishaji 500+',
      'Chapa ya ndani na nje ya ofisi',
      'Usambazaji endelevu wa karatasi za Double A',
    ],
  },
  'rightway-schools': {
    eyebrow: 'CHAPA YA SHULE & VIFAA',
    description:
      'Shule ya Daycare, Nursery & Primary iliyoko Mbezi Beach. Tuliboresha nembo, vibao vya maadili ukutani, bendera ya shule, vyeti 500+ vya mahafali na vifaa vya ofisi.',
    services: [
      'Uboreshaji wa nembo ya shule',
      'Mapambo ya kuta za elimu',
      'Vitambulisho vya PVC vya walimu (50+)',
      'Vyeti vya mahafali (500+) & mabango',
      'Bendera maalum ya shule',
    ],
  },
  'mine-foundation': {
    eyebrow: 'CHAPA YA TAASISI & PROGRAMU',
    description:
      'Shirika la Tanzania linalowawezesha vijana wa kiume kupitia malezi na kambi za mafunzo kama Mwana Kigosi Camp katika msitu wa Magoroto.',
    services: [
      'Chapa ya ndani ya ofisi',
      'Fulana za polo zilizodariziwa & kuchapwa',
      'Vyeti vya programu & mabango',
      'Majarida ya programu & stationery',
    ],
  },
  'mwalimu-conference': {
    eyebrow: 'KONGAMANO & VIFAA VYA MATUKIO',
    description:
      'Kongamano la kitaifa la elimu linalowakutanisha walimu, wizara na mashirika ya kulinda watoto tangu 2022.',
    services: [
      'Vitambulisho vya PVC & kamba za shingoni (500+)',
      'Ratiba za kongamano & vifaa vya washiriki',
      'Vyeti vya ushiriki',
      'Mabango makubwa ya jukwaa & waandishi',
      'Majarida ya mkutano',
    ],
  },
  pocet: {
    eyebrow: 'KAMPENI YA UHAMASISHAJI JAMII',
    description:
      'Shirika la Wazazi wa Watoto Wenye Kifafa Tanzania (POCET) katika kampeni za elimu na kupinga unyanyapaa ikiwemo Siku ya Kifafa Duniani (#50MillionStepsForEpilepsy).',
    services: [
      'Mabango ya kampeni & backdrops',
      'Vipeperushi vya elimu',
      'Mabango ya mitandao ya kijamii',
      'Upigaji picha za jamii',
      'Video za makala',
    ],
  },
  'zanzibar-cake-festival': {
    eyebrow: 'USIMAMIZI WA MATUKIO & MAWASILIANO',
    description:
      'Tamasha la utamaduni na sanaa ya upishi wa keki Zanzibar — lililosimamiwa na ImagingArts kuanzia wazo la awali, matangazo, jukwaa, sare na video ya kumbukumbu.',
    services: [
      'Usimamizi kamili wa tukio',
      'Mabango ya mitandao & nukuu za tamasha',
      'Maandiko ya tukio & programu',
      'Sare za washiriki & mabango ya nje',
      'Mpangilio wa jukwaa, picha & makala',
    ],
  },
  'other-projects': {
    eyebrow: 'CHAPA 22 ZA WATEJA WENGINE',
    description:
      'Miradi mingine ya nembo, vifungashio na matangazo katika Ukurasa wa 19 wa wasifu wa Juni 2026 — ikiwemo Zamzam Tours, Inundo, Mr RedCups, OLPER, ImagingPixels, PYF na Ndoto Ajira.',
    services: [
      'Ubunifu wa nembo za kipekee',
      'Vifungashio na vikombe vya biashara',
      'Tawi la picha & video (ImagingPixels, ImagingMovies)',
      'Machapisho ya maduka na kampuni',
    ],
  },
};

export function getCaseStudies(lang: LanguageCode): CaseStudyItem[] {
  if (lang === 'en') return CASE_STUDIES;
  return CASE_STUDIES.map((cs) => {
    const patch = CASE_STUDIES_SW_PATCH[cs.id];
    return patch ? { ...cs, ...patch } : cs;
  });
}
