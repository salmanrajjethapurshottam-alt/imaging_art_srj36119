/**
 * ImagingArts — 7 Print Tiers, Company Profile Specs & Quote Estimator Logic
 */

export type FinishOption =
  | 'Matte / Velvet Lamination'
  | '24K Metallic Foil + Emboss'
  | 'Heavy Outdoor UV Vinyl / 3D Acrylic'
  | 'PVC Card / Cotton Apparel';

export type CurrencyCode = 'TZS' | 'USD';

export interface PrintTierData {
  zoneId: number;
  badge: string;
  techSpec: string;
  accent: 'red' | 'navy';
  title: string;
  subtitle: string;
  bullets: Array<{ lead: string; text: string }>;
  sideNote: {
    eyebrow: string;
    heading: string;
    body: string;
  };
  inspectKey: string;
  quoteCategory: string;
}

export interface InspectorRecord {
  badge: string;
  title: string;
  desc: string;
  preset: string;
  specs: Array<[string, string]>;
}

export const PRINT_TIERS: PrintTierData[] = [
  {
    zoneId: 1,
    badge: 'TIER 01 // GIANT & EXTERIOR BRANDING',
    techSpec: '2D & 3D SIGNS',
    accent: 'red',
    title: 'Giant & Large-Format Printing',
    subtitle:
      'Wide-format inkjet printers, 3D signage fabrication, and specialized presses creating monumental interior & exterior brand presence across Tanzania.',
    bullets: [
      {
        lead: 'Billboards & Building Wraps:',
        text: 'Massive vinyl/mesh banners for scaffolding, skyscrapers, and highway unipoles.',
      },
      {
        lead: 'Vehicle & Fleet Wraps:',
        text: 'Cast vinyl fleet branding for cars, buses, Fuso Canter trucks, trains, and commercial fleets (e.g., ESON Super Battery).',
      },
      {
        lead: 'Trade Show & Stage Displays:',
        text: 'Press conference backdrops, pop-up booths, step-and-repeat banners, and tension fabric structures.',
      },
      {
        lead: '2D & 3D Architectural Signs:',
        text: 'Road directional signs, entrance signs, custom wallpaper, floor graphics, window clings, PVC, acrylic & aluminum.',
      },
      {
        lead: 'Flags & Outdoor Banners:',
        text: 'Institutional flags (Rightway Schools), feather flags, mesh wind banners, and street pole banners.',
      },
    ],
    sideNote: {
      eyebrow: 'Proven in Dar es Salaam',
      heading: 'ESON Fleet & SF Smart Energy Signs',
      body: 'Full Fuso Canter truck wraps, road directional signage, and illuminated 3D office branding.',
    },
    inspectKey: 'tier1',
    quoteCategory: 'Giant & Large-Format Printing',
  },
  {
    zoneId: 2,
    badge: 'TIER 02 // EDITORIAL & PROFILES',
    techSpec: 'OFFSET & WEB PRESS',
    accent: 'navy',
    title: 'Publishing & Commercial Editorial',
    subtitle:
      'High-speed offset, digital, and web presses producing high-impact multi-page publications and corporate profiles.',
    bullets: [
      {
        lead: 'Company Profiles & Books:',
        text: 'Custom corporate profile design & printing (500+ profiles for IZ Engineering), hardcovers, textbooks & coffee table books.',
      },
      {
        lead: 'Periodicals & Conference Journals:',
        text: 'Glossy magazines, catalogs, trade journals, and Mwana Kigosi / Mwalimu Conference program journals.',
      },
      {
        lead: 'Directories, Concept Notes & Manuals:',
        text: 'Technical guides, event concept notes, product instruction manuals, and reference directories.',
      },
    ],
    sideNote: {
      eyebrow: 'Design + Print Turnkey',
      heading: 'Company Profiles & Program Journals',
      body: 'From editorial layout to Smyth-sewn & PUR perfect-bound high-gloss production.',
    },
    inspectKey: 'tier2',
    quoteCategory: 'Publishing & Commercial Editorial',
  },
  {
    zoneId: 3,
    badge: 'TIER 03 // STRUCTURAL PACKAGING',
    techSpec: 'BOXES, CANS & POUCHES',
    accent: 'red',
    title: 'Packaging & Containers',
    subtitle:
      'Structural packaging design combined with durable printing on cardboard, plastic, metal, and glass for East African manufacturers & retailers.',
    bullets: [
      {
        lead: 'Corrugated Boxes:',
        text: 'Heavy-duty shipping cartons, retail display boxes, and custom branded subscription boxes.',
      },
      {
        lead: 'Folding Cartons & Industrial Casing:',
        text: 'Product boxes for cosmetics, perfumes (Nicovic Perfumes), batteries (ESON 12N9L-BS), pharmaceuticals & foods.',
      },
      {
        lead: 'Flexible Packaging:',
        text: 'Stand-up pouches, snack bags, shrink sleeves, and metallic foil wrappers.',
      },
      {
        lead: 'Rigid & Disposable Containers:',
        text: 'Direct-to-shape printing on aluminum cans, glass bottles, plastic tubs, and branded disposable cups (Mr RedCups).',
      },
    ],
    sideNote: {
      eyebrow: 'Retail Shelf Impact',
      heading: 'ESON Battery & Perfume Packaging',
      body: 'High-contrast UV coating, structural die-lines, and moisture-resistant laminations.',
    },
    inspectKey: 'tier3',
    quoteCategory: 'Packaging & Containers',
  },
  {
    zoneId: 4,
    badge: 'TIER 04 // RETAIL, WEB & EVENTS',
    techSpec: '360° BRAND ACTIVATION',
    accent: 'navy',
    title: 'Marketing, Retail & Events Collateral',
    subtitle:
      'Sheet-fed commercial printing paired with full Events Management, Corporate Photography/Videography, and Web Design & Development.',
    bullets: [
      {
        lead: 'Flyers, Brochures & Campaign Posters:',
        text: 'Single-sheet handouts, tri-fold brochures, direct mail postcards, and awareness campaigns (POCET).',
      },
      {
        lead: 'Posters & POS Displays:',
        text: 'Retail window posters, cardboard standees, shelf talkers, and exhibition front-desk branding.',
      },
      {
        lead: 'Menus, Table Tents & Calendars:',
        text: 'Waterproof laminated menus, placemats, wall calendars, desk pads, and pocket planners.',
      },
      {
        lead: 'Events, Web & Media Production:',
        text: 'Congress management, stage setup (Zanzibar Cake Festival), documentary videos, and responsive websites.',
      },
    ],
    sideNote: {
      eyebrow: 'Print + Digital + Events',
      heading: 'Full Congress & Media Execution',
      body: 'We handle your printed collateral, stage banners, event coverage, and corporate website under one roof.',
    },
    inspectKey: 'tier4',
    quoteCategory: 'Marketing & Retail Collateral',
  },
  {
    zoneId: 5,
    badge: 'TIER 05 // STATIONERY & SUPPLY',
    techSpec: 'SCHOOL, OFFICE & HOME',
    accent: 'red',
    title: 'Corporate Stationery & Office Essentials',
    subtitle:
      'Unlimited supply of standardized, matching corporate, school, and office stationery engineered for consistent daily branding.',
    bullets: [
      {
        lead: 'Identity Sets & Digital Stamps:',
        text: 'Letterheads, matching envelopes, compliment slips, presentation folders, and custom digital/self-inking stamps.',
      },
      {
        lead: 'Business Forms:',
        text: 'Carbonless (NCR) invoice books, receipt books, delivery notes, order forms, and packing slips.',
      },
      {
        lead: 'Notebooks, Diaries & Office Paper:',
        text: 'Branded spiral notebooks, executive diaries, sticky notes, legal pads, and bulk Double A office paper supply.',
      },
    ],
    sideNote: {
      eyebrow: 'Unlimited Contract Supply',
      heading: 'Trusted by Schools & Contractors',
      body: 'Continuous stationery & printable supply for Rightway Schools, IZ Engineering, and MINE Foundation.',
    },
    inspectKey: 'tier5',
    quoteCategory: 'Corporate Stationery & Office Essentials',
  },
  {
    zoneId: 6,
    badge: 'TIER 06 // APPAREL & PROMO ITEMS',
    techSpec: 'SCREEN, EMBROIDERY & UV',
    accent: 'navy',
    title: 'Textiles & Promotional Merchandise',
    subtitle:
      'High-durability screen printing, embroidery, sublimation, and rotary UV pad printing on garments, decor, trophies, and 3D objects.',
    bullets: [
      {
        lead: 'Corporate & Event Apparel:',
        text: 'Polo shirts, T-shirts (100+ Mwana Kigosi Camp shirts), hoodies, uniforms, caps, and tote bags.',
      },
      {
        lead: 'Soft Signage & Decor:',
        text: 'Custom-printed curtains, upholstery fabric, promotional pillows, and throw blankets.',
      },
      {
        lead: 'Drinkware, Trophies & Hard Goods:',
        text: 'Branded mugs, water bottles, executive pens, keychains, phone cases, and custom award trophies.',
      },
    ],
    sideNote: {
      eyebrow: 'Uniforms & Awards',
      heading: 'Polos, Caps, Trophies & Mugs',
      body: 'Crisp chest embroidery and vibrant screen prints built to withstand heavy institutional wear.',
    },
    inspectKey: 'tier6',
    quoteCategory: 'Textiles & Promotional Merchandise',
  },
  {
    zoneId: 7,
    badge: 'TIER 07 // MICRO PRECISION & IDs',
    techSpec: '2400 DPI & PVC CARDS',
    accent: 'red',
    title: 'Small & Micro-Format Printing',
    subtitle:
      'Ultra-fine precision printing for staff identification, event passes, product tracking, and anti-counterfeit security.',
    bullets: [
      {
        lead: 'Business Cards & PVC Staff IDs:',
        text: 'Embossed, foil-stamped, matte-laminated cards (500+ for SF Smart Energy) & PVC lanyard IDs (500+ Mwalimu Conference IDs).',
      },
      {
        lead: 'Labels & Stickers:',
        text: 'Product ingredient labels, barcode stickers, shipping labels, and die-cut vinyl decals.',
      },
      {
        lead: 'Tickets, Certificates & Wristbands:',
        text: 'Graduation & award certificates (500+ Rightway & Mwalimu), event tickets, boarding passes & Tyvek wristbands.',
      },
      {
        lead: 'Security, Financial & Pharma Inserts:',
        text: 'Tamper-evident holograms, scratch-off cards, asset tags, and precision-folded pharmaceutical leaflet inserts.',
      },
    ],
    sideNote: {
      eyebrow: 'High-Volume PVC & Foil',
      heading: '1,500+ IDs & Certificates Delivered',
      body: 'Variable-data staff badges, UV-varnished business cards, and tamper-evident security labels.',
    },
    inspectKey: 'tier7',
    quoteCategory: 'Small & Micro-Format Printing',
  },
];

export const INSPECTOR_DATA: Record<string, InspectorRecord> = {
  about: {
    badge: 'IMAGINGARTS COMPANY PROFILE // JUNE 2026',
    title: 'We Think BIG for Your Brand!',
    desc: 'ImagingArts specializes in corporate branding (interior and exterior), 2D and 3D signs, billboards, banners, general printing and supply, promotional items, web design and development, corporate photography and videography, and events management. Located at White Beach Park Commercial Complex, First Floor, Office #207/210, Mbezi Beach, Dar es Salaam.',
    preset: 'Giant & Large-Format Printing',
    specs: [
      [
        'Vision',
        'To empower brands, organizations, and individuals through strategic visual storytelling—delivering photography, videography, and design solutions that inspire trust, preserve legacy, and drive meaningful growth.',
      ],
      [
        'Mission',
        'To be Tanzania’s leading creative hub where art meets strategy, shaping narratives that transcend borders and generations, and positioning ImagingArts as a trusted partner in branding, communication, and innovation.',
      ],
      ['Core Value', 'Close to our customers every time, everywhere.'],
      [
        'Our Approach',
        'Build strong client relationships, listen closely, understand each client’s personality and objectives, and refine their needs into effective, creative solutions—even within fast-paced timelines.',
      ],
      [
        'Why ImagingArts',
        'Quality products and service at competitive prices, with efficient and prompt delivery.',
      ],
      [
        'Delivery Means',
        'Free delivery in Mbezi Beach and surrounding areas. Delivery to other locations can be discussed.',
      ],
      [
        'Goals',
        'Invest in quality management, build a strong reputation in areas of specialization, and become a key player in the industry.',
      ],
      [
        'Legal Accreditation',
        'Certificate of Incorporation No. 488483 | Business License No. BL01396912025-2600010011 | TIN 139-769-368',
      ],
    ],
  },
  tier1: {
    badge: 'TIER 01 // GIANT & EXTERIOR BRANDING',
    title: 'Giant & Large-Format Printing + 2D/3D Signs',
    desc: 'Wide-format inkjet printing, 3D fabrication, and vehicle wraps engineered for maximum outdoor visibility.',
    preset: 'Giant & Large-Format Printing',
    specs: [
      ['Signage & Wraps', 'Billboards, Building Wraps, Vehicle & Truck Wraps, 2D & 3D Signs, Road Directional Signs'],
      ['Exhibitions & Flags', 'Trade Show Booths, Press Backdrops, Step-and-Repeat Banners, Institutional & Feather Flags'],
      ['Substrates', 'Cast Air-Release Vinyl, Mesh Banners, PVC, Acrylic, Aluminum Composite'],
    ],
  },
  tier2: {
    badge: 'TIER 02 // PUBLISHING & EDITORIAL',
    title: 'Publishing, Books & Company Profiles',
    desc: 'High-speed offset and digital presses for multi-page publications, corporate profiles, and conference journals.',
    preset: 'Publishing & Commercial Editorial',
    specs: [
      ['Publications', 'Company Profiles, Hardcover & Paperback Books, Glossy Magazines, Catalogs, Manuals'],
      ['Binding Options', 'Smyth-Sewn Hardcover, PUR Perfect Binding, Saddle Stitch, Wire-O'],
      ['Track Record', '500+ Company Profiles for IZ Engineering & Program Journals for MINE Foundation'],
    ],
  },
  tier3: {
    badge: 'TIER 03 // PACKAGING & CONTAINERS',
    title: 'Packaging, Cartons & Product Labels',
    desc: 'Structural packaging design and durable printing across cardboard, plastic, metal, and glass.',
    preset: 'Packaging & Containers',
    specs: [
      ['Packaging Lines', 'Corrugated Shipping Boxes, Folding Cartons, Stand-Up Pouches, Shrink Sleeves, Cups'],
      ['Industrial & Retail', 'Battery Casing & Labels (ESON Super Battery), Cosmetics, Foods & Disposable Cups'],
      ['Finishes', 'UV Gloss/Matte Varnish, Foil Stamping, Embossing, Die-Cut Windows'],
    ],
  },
  tier4: {
    badge: 'TIER 04 // MARKETING, EVENTS & WEB',
    title: 'Marketing Collateral, Events & Web Design',
    desc: 'Commercial sheet-fed printing integrated with full Congress Management, Corporate Photography/Videography, and Responsive Web Development.',
    preset: 'Marketing & Retail Collateral',
    specs: [
      ['Print Collateral', 'Flyers, Tri-Fold Brochures, POS Standees, Waterproof Menus, Wall & Desk Calendars'],
      ['Events Management', 'Participant Registration, Stage Setup, Press Banners, Front-Desk & Exhibition Logistics'],
      ['Digital & Media', 'Responsive Corporate Websites, Product Photography & After-Event Documentary Films'],
    ],
  },
  tier5: {
    badge: 'TIER 05 // CORPORATE STATIONERY',
    title: 'Corporate Stationery & Unlimited Office Supply',
    desc: 'Matching corporate identity sets, NCR books, and continuous office/school supply contracts.',
    preset: 'Corporate Stationery & Office Essentials',
    specs: [
      ['Identity & Stamps', 'Letterheads, Envelopes, Presentation Folders, Digital & Self-Inking Stamps'],
      ['Business Forms', 'Carbonless (NCR) Invoice Books, Receipts, Delivery Notes & Packing Slips'],
      ['Notebooks & Paper', 'Branded Spiral Notebooks, Executive Diaries, Legal Pads & Bulk Double A Reams'],
    ],
  },
  tier6: {
    badge: 'TIER 06 // TEXTILES & PROMO MERCH',
    title: 'Apparel, Uniforms, Trophies & Hard Goods',
    desc: 'Screen printing, embroidery, sublimation, and rotary UV printing on textiles and 3D promotional items.',
    preset: 'Textiles & Promotional Merchandise',
    specs: [
      ['Apparel & Decor', 'Polo Shirts, Event T-Shirts, Hoodies, School/Staff Uniforms, Caps, Curtains & Pillows'],
      ['Hard Goods & Awards', 'Ceramic Mugs, Water Bottles, Executive Pens, Keychains, Phone Cases & Custom Trophies'],
      ['Track Record', '100+ Mwana Kigosi Camp T-Shirts & Zanzibar Cake Festival Participant Uniforms'],
    ],
  },
  tier7: {
    badge: 'TIER 07 // SMALL & MICRO-FORMAT PRINT',
    title: 'PVC Staff IDs, Foil Cards & Micro Security',
    desc: 'High-precision 2400 DPI printing for identification, certificates, product tracking, and anti-counterfeit security.',
    preset: 'Small & Micro-Format Printing',
    specs: [
      ['Cards & Badges', 'Embossed & Foil Business Cards, Laminated PVC Staff & Conference IDs (1,500+ Delivered)'],
      ['Certificates & Tickets', 'Graduation & Award Certificates, Event Tickets, Boarding Passes & Tyvek Wristbands'],
      ['Security & Pharma', 'Tamper-Evident Holograms, Banknotes, Stamps, Barcodes & Thin Pharmaceutical Box Inserts'],
    ],
  },
};

export interface QuoteEstimate {
  lowUSD: number;
  highUSD: number;
  lowTZS: number;
  highTZS: number;
  formatted: string;
}

export function estimatePrintQuote(
  category: string,
  finish: FinishOption,
  quantity: number,
  currency: CurrencyCode,
): QuoteEstimate {
  const safeQty = Math.max(1, Math.round(quantity || 1));
  let baseUSD = 3.5;

  if (category.includes('Giant')) baseUSD = 45;
  else if (category.includes('Publishing')) baseUSD = 12;
  else if (category.includes('Packaging')) baseUSD = 5.5;
  else if (category.includes('Marketing')) baseUSD = 1.5;
  else if (category.includes('Corporate')) baseUSD = 2.8;
  else if (category.includes('Textiles')) baseUSD = 11;
  else if (category.includes('Small & Micro')) baseUSD = 0.6;

  if (finish.includes('Foil')) baseUSD *= 1.35;
  if (finish.includes('Vinyl')) baseUSD *= 1.25;

  const discount = safeQty > 2000 ? 0.52 : safeQty > 500 ? 0.72 : safeQty > 50 ? 0.88 : 1.0;
  const lowUSD = Math.max(30, Math.round(baseUSD * safeQty * discount * 0.85));
  const highUSD = Math.round(lowUSD * 1.28);

  const rate = 2650;
  const lowTZS = Math.round((lowUSD * rate) / 5000) * 5000;
  const highTZS = Math.round((highUSD * rate) / 5000) * 5000;

  const formatted =
    currency === 'TZS'
      ? `TZS ${lowTZS.toLocaleString('en-US')} — ${highTZS.toLocaleString('en-US')}`
      : `$${lowUSD.toLocaleString('en-US')} — $${highUSD.toLocaleString('en-US')} USD`;

  return { lowUSD, highUSD, lowTZS, highTZS, formatted };
}
