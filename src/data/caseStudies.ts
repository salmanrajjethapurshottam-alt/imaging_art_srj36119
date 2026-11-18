/* ============================================================================
 * IMAGINGARTS CLIENT PORTFOLIO & PDF VISUAL REGISTRY (EASY TO EXTEND)
 * ----------------------------------------------------------------------------
 * HOW TO ADD A NEW CLIENT OR CASE STUDY:
 *   1. Drop the client's images into:
 *      public/assets/imagingarts/case-studies/<client-slug>/
 *   2. Copy any object inside `CASE_STUDIES` below and update:
 *      - `id` (unique lowercase-with-hyphens)
 *      - `name`, `category`, `eyebrow`, `description`, `services`, `cover`, `images`
 *      - Optional: `stats`, `quote`, `quoteBy`, `campaign`, `logo`
 *   3. Save. Filters, project cards, lightbox galleries, and counts update automatically.
 *
 * You can also append partner circular badges in `CLIENT_LOGOS`, customer tiles
 * in `OTHER_CUSTOMERS_WALL`, or brand photography in `PROFILE_VISUALS`.
 * ============================================================================ */

export type CaseStudyCategory =
  | 'Corporate'
  | 'Education'
  | 'NGO & Community'
  | 'Events'
  | 'Product Branding'
  | 'Other';

export const CASE_STUDY_CATEGORIES: Array<'All' | CaseStudyCategory> = [
  'All',
  'Corporate',
  'Education',
  'NGO & Community',
  'Events',
  'Product Branding',
  'Other',
];

export interface CaseStudyImage {
  src: string;
  alt: string;
  fit?: 'cover' | 'contain';
}

export interface CaseStudyItem {
  id: string;
  name: string;
  category: CaseStudyCategory;
  eyebrow: string;
  description: string;
  services: string[];
  stats?: Array<[string, string]>;
  quote?: string;
  quoteBy?: string;
  campaign?: string;
  logo?: string;
  cover: string;
  fit?: 'cover' | 'contain';
  images: CaseStudyImage[];
}

export interface ClientLogoItem {
  name: string;
  sector: string;
  src: string;
  caseStudyId?: string;
}

export interface ProfileVisualItem {
  src: string;
  alt: string;
  caption: string;
  pageLabel: string;
}

export interface PdfSpreadItem {
  page: number;
  title: string;
  src: string;
}

export const CASE_STUDIES: CaseStudyItem[] = [
  {
    id: 'eson-super-battery',
    name: 'ESON Super Battery',
    category: 'Product Branding',
    eyebrow: 'PRODUCT & FLEET BRANDING',
    description:
      'Complete brand launch for ESON ("Energy Solution — Powerful energy store"): custom battery casing labels (12N9L-BS), heavy-duty Fuso Canter truck wraps, and campaign key visuals.',
    services: [
      'Product branding visuals',
      'Battery casing & label design (12N9L-BS)',
      'Commercial fleet truck wrap',
      'Promotional campaign artwork',
    ],
    stats: [
      ['3', 'Distinct battery artwork lines crafted'],
      ['360°', 'Fuso Canter commercial fleet wrap'],
      ['12N9L-BS', 'Flagship automotive & powersport series'],
    ],
    cover: '/assets/imagingarts/case-studies/eson-super-battery/eson-campaign-wide.jpg',
    fit: 'contain',
    images: [
      {
        src: '/assets/imagingarts/case-studies/eson-super-battery/eson-campaign-wide.jpg',
        alt: 'ESON Super Battery product range and wrapped truck campaign artwork',
        fit: 'contain',
      },
      {
        src: '/assets/imagingarts/pdf-spreads/page-10.jpg',
        alt: 'ESON Super Battery brand story and label variations (Profile Page 10)',
        fit: 'contain',
      },
      {
        src: '/assets/imagingarts/pdf-spreads/page-11.jpg',
        alt: 'ESON Super Battery 12N9L-BS casing & wrapped delivery truck spread (Profile Page 11)',
        fit: 'contain',
      },
    ],
  },
  {
    id: 'sf-smart-energy',
    name: 'SF Smart Energy Limited',
    category: 'Corporate',
    eyebrow: 'CORPORATE BRANDING & DOCUMENTARY',
    description:
      'A Tanzania-based electric, water, and gas smart-metering assembly and distribution company. ImagingArts delivered logo identity, exterior directional signage, technical photography, and documentary production.',
    services: [
      'Logo design',
      'Exterior road directional & entrance signs',
      'Technical product photography',
      'Documentary video production',
      'Staff PVC IDs and modern business cards',
    ],
    stats: [
      ['500+', 'Modern business cards designed and printed'],
      ['30+', 'Staff PVC identity cards delivered'],
      ['3+', 'Road directional & entrance signs installed'],
      ['30+', 'Website photos & documentary video assets'],
    ],
    logo: '/assets/imagingarts/case-studies/sf-smart-energy/sf-smart-energy-logo.jpg',
    cover: '/assets/imagingarts/case-studies/sf-smart-energy/field-installation.jpg',
    images: [
      {
        src: '/assets/imagingarts/case-studies/sf-smart-energy/field-installation.jpg',
        alt: 'SF Smart Energy technicians calibrating electric metering racks',
      },
      {
        src: '/assets/imagingarts/case-studies/sf-smart-energy/smart-meter-product.jpg',
        alt: 'Smart energy and utility meter assembly photography',
      },
      {
        src: '/assets/imagingarts/case-studies/sf-smart-energy/exterior-directional-sign.jpg',
        alt: 'SF Smart Energy exterior road directional sign installation',
        fit: 'contain',
      },
      {
        src: '/assets/imagingarts/case-studies/sf-smart-energy/corporate-architecture-visual.jpg',
        alt: 'Corporate architectural backdrop featured in SF Smart Energy profile',
      },
      {
        src: '/assets/imagingarts/case-studies/sf-smart-energy/sf-smart-energy-logo.jpg',
        alt: 'SF Smart Energy Limited official emblem',
        fit: 'contain',
      },
      {
        src: '/assets/imagingarts/pdf-spreads/page-12.jpg',
        alt: 'SF Smart Energy full company profile spread (Page 12)',
        fit: 'contain',
      },
    ],
  },
  {
    id: 'iz-engineering',
    name: 'IZ Engineering & General Supply Ltd',
    category: 'Corporate',
    eyebrow: 'CORPORATE IDENTITY & OFFICE BRANDING',
    description:
      'Subsidiary of I & Z Group specializing in electrical power lines, civil construction, and general industrial supplies. Full turnkey corporate identity, profile printing, office branding, and unlimited stationery supply.',
    services: [
      'Logo designing',
      'Staff IDs and corporate business cards',
      'Company profile designing & 500+ print run',
      'Interior & exterior office branding',
      'Unlimited stationery & Double A paper supply',
    ],
    stats: [
      ['001+', 'Interior and exterior office branding'],
      ['500+', 'Company profile books printed'],
      ['100+', 'Business cards & staff PVC IDs supplied'],
      ['Unlimited', 'Ongoing corporate stationery supply'],
    ],
    logo: '/assets/imagingarts/case-studies/iz-engineering/iz-engineering-logo.jpg',
    cover: '/assets/imagingarts/case-studies/iz-engineering/engineering-workspace.jpg',
    images: [
      {
        src: '/assets/imagingarts/case-studies/iz-engineering/engineering-workspace.jpg',
        alt: 'IZ Engineering warehouse inspector in safety gear',
      },
      {
        src: '/assets/imagingarts/case-studies/iz-engineering/project-collage.jpg',
        alt: 'IZ Engineering construction, electrical & civil works multi-panel brochure',
        fit: 'contain',
      },
      {
        src: '/assets/imagingarts/case-studies/iz-engineering/identity-materials.jpg',
        alt: 'Corporate lanyard badges and staff ID holders',
        fit: 'contain',
      },
      {
        src: '/assets/imagingarts/case-studies/iz-engineering/printed-supplies.jpg',
        alt: 'Bulk Double A stationery and printable ream supplies',
        fit: 'contain',
      },
      {
        src: '/assets/imagingarts/case-studies/iz-engineering/iz-engineering-logo.jpg',
        alt: 'IZ Engineering & General Supplier Ltd crest',
        fit: 'contain',
      },
      {
        src: '/assets/imagingarts/pdf-spreads/page-13.jpg',
        alt: 'IZ Engineering complete company profile spread (Page 13)',
        fit: 'contain',
      },
    ],
  },
  {
    id: 'rightway-schools',
    name: 'Rightway Schools',
    category: 'Education',
    eyebrow: 'SCHOOL BRANDING & PRINT SUPPLY',
    description:
      'A Daycare, Nursery & Primary School in Mbezi Beach teaching NECTA, Entrepreneurship, STEM & Environment. Features institutional identity refresh, interior values boards, flags, certificates, and stationery.',
    services: [
      'Logo remake',
      'Interior educational wall branding',
      'Staff PVC ID cards (50+)',
      'Graduation certificates (500+) & banners',
      'Custom woven outdoor school flag',
    ],
    stats: [
      ['050+', 'Designed & printed staff PVC ID cards'],
      ['500+', 'Graduation certificates designed & printed'],
      ['Unlimited', 'Supply of stationery materials'],
      ['Unlimited', 'Supply of school printable materials'],
    ],
    logo: '/assets/imagingarts/case-studies/rightway-schools/rightway-logo.jpg',
    cover: '/assets/imagingarts/case-studies/rightway-schools/school-flag.jpg',
    images: [
      {
        src: '/assets/imagingarts/case-studies/rightway-schools/branding-and-stationery-board.jpg',
        alt: 'Rightway Schools Vision, Mission, Core Values & Skills interior board',
        fit: 'contain',
      },
      {
        src: '/assets/imagingarts/case-studies/rightway-schools/school-flag.jpg',
        alt: 'Rightway Schools custom branded outdoor flag',
        fit: 'contain',
      },
      {
        src: '/assets/imagingarts/case-studies/rightway-schools/rightway-logo.jpg',
        alt: 'Rightway Nursery & Primary School identity crest',
        fit: 'contain',
      },
      {
        src: '/assets/imagingarts/pdf-spreads/page-14.jpg',
        alt: 'Rightway Schools complete profile spread (Page 14)',
        fit: 'contain',
      },
    ],
  },
  {
    id: 'mine-foundation',
    name: 'MINE Foundation',
    category: 'NGO & Community',
    eyebrow: 'FOUNDATION BRANDING & PROGRAMME MATERIALS',
    description:
      'Registered Tanzanian NGO empowering boys and youth through mentorship, advocacy, and transformative programmes including the Mwana Kigosi Camp at Magoroto Forest Estate.',
    services: [
      'Interior office branding',
      'Embroidered & printed camp polo shirts',
      'Programme certificates & banners',
      'Programme journals & stationery supply',
    ],
    stats: [
      ['Unlimited', 'Programme certificates supplied'],
      ['100+', 'Camp polo T-shirts (Mwana Kigosi 2022)'],
      ['100+', 'Programme journals (Mwana Kigosi 2022)'],
    ],
    quote:
      'Imagingarts is a great extension of our Foundation for Branding and Supplying execution. They are very passionate about what they do and they really try to understand us. Their creativity to make us succeed has been very satisfying.',
    quoteBy: 'Yoabu Onesmo Ndazi — Executive Secretary, MINE Foundation',
    logo: '/assets/imagingarts/case-studies/mine-foundation/mine-foundation-logo.jpg',
    cover: '/assets/imagingarts/case-studies/mine-foundation/community-group.jpg',
    images: [
      {
        src: '/assets/imagingarts/case-studies/mine-foundation/community-group.jpg',
        alt: 'Mwana Kigosi Boys Camp youth cohort at Magoroto Forest Estate',
      },
      {
        src: '/assets/imagingarts/case-studies/mine-foundation/school-community.jpg',
        alt: 'MINE Foundation facilitation team in branded black & white polos at Magoroto',
      },
      {
        src: '/assets/imagingarts/case-studies/mine-foundation/programme-shirts.jpg',
        alt: 'Custom crimson MINE Foundation polo uniform front and back print',
        fit: 'contain',
      },
      {
        src: '/assets/imagingarts/case-studies/mine-foundation/executive-portrait.jpg',
        alt: 'Yoabu Onesmo Ndazi, Executive Secretary of MINE Foundation',
      },
      {
        src: '/assets/imagingarts/case-studies/mine-foundation/mine-foundation-logo.jpg',
        alt: 'MINE Foundation official emblem',
        fit: 'contain',
      },
      {
        src: '/assets/imagingarts/pdf-spreads/page-15.jpg',
        alt: 'MINE Foundation complete profile spread (Page 15)',
        fit: 'contain',
      },
    ],
  },
  {
    id: 'mwalimu-conference',
    name: 'Mwalimu Conference & Awards',
    category: 'Events',
    eyebrow: 'CONFERENCE & EVENT MATERIALS',
    description:
      'Annual national MINE Foundation education summit held across Mainland Tanzania since 2022, uniting teachers, ministries, civil societies, and child-protection agencies.',
    services: [
      'Participant PVC ID cards & lanyards',
      'Programme timetables & stationery',
      'Programme certificates',
      'Press conference backdrops & stage banners',
      'Conference journals',
    ],
    stats: [
      ['500+', 'Programme certificates supplied (2022)'],
      ['500+', 'Participant PVC IDs delivered (2022)'],
      ['500+', 'Programme timetables printed'],
      ['3+', 'Stage & press conference banners'],
    ],
    logo: '/assets/imagingarts/case-studies/mwalimu-conference/mwalimu-conference-logo.jpg',
    cover: '/assets/imagingarts/case-studies/mwalimu-conference/event-stage.jpg',
    images: [
      {
        src: '/assets/imagingarts/case-studies/mwalimu-conference/event-stage.jpg',
        alt: 'Mwalimu Conference 2022 panel stage and sponsor backdrop banner',
      },
      {
        src: '/assets/imagingarts/case-studies/mwalimu-conference/participant-id.jpg',
        alt: 'Mwalimu Conference official delegate lanyard & PVC ID pass design',
        fit: 'contain',
      },
      {
        src: '/assets/imagingarts/case-studies/mwalimu-conference/program-material.jpg',
        alt: 'Mwalimu Conference 2022 printed official programme leaflet',
        fit: 'contain',
      },
      {
        src: '/assets/imagingarts/case-studies/mwalimu-conference/mwalimu-conference-logo.jpg',
        alt: 'Mwalimu Conference & Awards Teachers Growth Avenue logo',
        fit: 'contain',
      },
      {
        src: '/assets/imagingarts/pdf-spreads/page-16.jpg',
        alt: 'Mwalimu Conference complete profile spread (Page 16)',
        fit: 'contain',
      },
    ],
  },
  {
    id: 'pocet',
    name: 'POCET',
    category: 'NGO & Community',
    eyebrow: 'PUBLIC AWARENESS CAMPAIGN',
    description:
      'Parents’ Organization for Children with Epilepsy Tanzania (POCET) leads national awareness, stigma reduction, and family support campaigns including International Epilepsy Day (#50MillionStepsForEpilepsy).',
    services: [
      'Campaign banners & step-backdrops',
      'Educational brochures',
      'Social media awareness posters',
      'On-location community photography',
      'Documentary video storytelling',
    ],
    campaign: '#50MillionStepsForEpilepsy · Kifafa Kinatibika',
    logo: '/assets/imagingarts/case-studies/pocet/pocet-logo.jpg',
    cover: '/assets/imagingarts/case-studies/pocet/community-awareness-2.jpg',
    images: [
      {
        src: '/assets/imagingarts/case-studies/pocet/community-awareness-2.jpg',
        alt: 'POCET community leadership & workshop group beneath campaign banner',
      },
      {
        src: '/assets/imagingarts/case-studies/pocet/community-awareness-1.jpg',
        alt: 'POCET International Epilepsy Day outreach with ribboned coconuts',
      },
      {
        src: '/assets/imagingarts/case-studies/pocet/community-awareness-3.jpg',
        alt: 'Schoolchildren celebrating International Epilepsy Day outdoors',
      },
      {
        src: '/assets/imagingarts/case-studies/pocet/community-portrait.jpg',
        alt: 'Young student speaking at POCET school awareness session',
      },
      {
        src: '/assets/imagingarts/case-studies/pocet/parent-and-child.jpg',
        alt: 'Healthcare presenter engaging attendees during POCET awareness talk',
      },
      {
        src: '/assets/imagingarts/case-studies/pocet/campaign-poster.jpg',
        alt: 'Maadhimisho ya Siku ya Kifafa Duniani educational first-aid poster',
        fit: 'contain',
      },
      {
        src: '/assets/imagingarts/case-studies/pocet/pocet-logo.jpg',
        alt: 'POCET — Epilepsy is Curable official logo',
        fit: 'contain',
      },
      {
        src: '/assets/imagingarts/pdf-spreads/page-17.jpg',
        alt: 'POCET complete profile spread (Page 17)',
        fit: 'contain',
      },
    ],
  },
  {
    id: 'zanzibar-cake-festival',
    name: 'Zanzibar Cake Festival',
    category: 'Events',
    eyebrow: 'EVENT MANAGEMENT & VISUAL COMMUNICATION',
    description:
      'A cultural and culinary showcase celebrating cake artistry in Zanzibar—managed end-to-end by ImagingArts from concept note and social media campaigns to stage setup, uniforms, and after-event documentary films.',
    services: [
      'Full event management',
      'Social media posters, quote banners & covers',
      'Event concept note & programme materials',
      'Participant uniforms & outdoor banners',
      'Stage setup, photography & documentary film',
    ],
    campaign: '“A party without cake is just a meeting”',
    logo: '/assets/imagingarts/case-studies/zanzibar-cake-festival/zanzibar-cake-festival-logo.jpg',
    cover: '/assets/imagingarts/case-studies/zanzibar-cake-festival/festival-quote-banner.jpg',
    images: [
      {
        src: '/assets/imagingarts/case-studies/zanzibar-cake-festival/festival-quote-banner.jpg',
        alt: 'Zanzibar Cake Festival signature flour artwork — A party without cake is just a meeting',
      },
      {
        src: '/assets/imagingarts/case-studies/zanzibar-cake-festival/award-moment.jpg',
        alt: 'Zanzibar Cake Festival judges, hosts, and ceremonial cake showcase',
      },
      {
        src: '/assets/imagingarts/case-studies/zanzibar-cake-festival/panel-discussion.jpg',
        alt: 'Keynote speaker addressing attendees at Zanzibar Cake Festival',
      },
      {
        src: '/assets/imagingarts/case-studies/zanzibar-cake-festival/festival-activity.jpg',
        alt: 'Guests and pastry creators gathered at Zanzibar Cake Festival',
      },
      {
        src: '/assets/imagingarts/case-studies/zanzibar-cake-festival/stage-performance.jpg',
        alt: 'Runway showcase guest in vibrant green ankara gown in front of PBZ Bank banner',
      },
      {
        src: '/assets/imagingarts/case-studies/zanzibar-cake-festival/golden-evening-portrait.jpg',
        alt: 'Festival VIP portrait in gold silk dress on timber staircase',
      },
      {
        src: '/assets/imagingarts/case-studies/zanzibar-cake-festival/zanzibar-cake-festival-logo.jpg',
        alt: 'Zanzibar Cake Festival official emblem',
        fit: 'contain',
      },
      {
        src: '/assets/imagingarts/pdf-spreads/page-18.jpg',
        alt: 'Zanzibar Cake Festival complete profile spread (Page 18)',
        fit: 'contain',
      },
    ],
  },
  {
    id: 'other-projects',
    name: 'Other Projects & Partner Customers',
    category: 'Other',
    eyebrow: '22 SELECTED BRAND IDENTITIES',
    description:
      'Extended brand identity, packaging, digital, and print commissions featured in Page 19 of the June 2026 profile — spanning Zamzam Tours, Inundo, Mr RedCups, Rhyinos, OLPER, ImagingPixels, Raztech Energies, Setco MobileStores, PYF, JEMK Consult, and Ndoto Ajira.',
    services: [
      'Custom logo systems & wordmarks',
      'Packaging & disposable container branding',
      'Digital & media sub-brands (ImagingPixels, ImagingMovies)',
      'Corporate print & retail collateral',
    ],
    stats: [
      ['22', 'Partner & client identities showcased'],
      ['19', 'Additional corporate & NGO retainers'],
      ['100%', 'Custom vector brand design'],
    ],
    cover: '/assets/imagingarts/pdf-spreads/page-19.jpg',
    fit: 'contain',
    images: [
      {
        src: '/assets/imagingarts/pdf-spreads/page-19.jpg',
        alt: 'Complete 22-brand Other Projects / Customers matrix from Profile Page 19',
        fit: 'contain',
      },
      {
        src: '/assets/imagingarts/other-customers/olper-uzazi.jpg',
        alt: 'OLPER Uzazi pharmaceutical & healthcare packaging visual',
      },
      {
        src: '/assets/imagingarts/case-studies/other-projects/brand-mark-1.jpg',
        alt: 'Setco MobileStores geometric lightning emblem',
        fit: 'contain',
      },
      {
        src: '/assets/imagingarts/case-studies/other-projects/brand-mark-2.jpg',
        alt: 'PYF Penda Youth Fellowship illustrated identity mark',
        fit: 'contain',
      },
      {
        src: '/assets/imagingarts/other-customers/zamzam-tours.jpg',
        alt: 'Zamzam Tours — We Value Your Trip',
        fit: 'contain',
      },
      {
        src: '/assets/imagingarts/other-customers/mr-redcups.jpg',
        alt: 'Mr RedCups Enterprise Disposable & Packaging Supplier',
        fit: 'contain',
      },
      {
        src: '/assets/imagingarts/other-customers/raztech-energies.jpg',
        alt: 'Raztech Energies brand tile',
        fit: 'contain',
      },
      {
        src: '/assets/imagingarts/other-customers/ndoto-ajira.jpg',
        alt: 'Ndoto Ajira youth empowerment brand mark',
        fit: 'contain',
      },
    ],
  },
];

/**
 * ALL 19 Circular Client Logos extracted cleanly from Page 9 ("OUR CLIENTS")
 * of the June 2026 Company Profile PDF.
 */
export const CLIENT_LOGOS: ClientLogoItem[] = [
  { name: 'POCET', sector: 'Healthcare NGO', src: '/assets/imagingarts/client-logos/pocet.jpg', caseStudyId: 'pocet' },
  { name: 'SF Smart Energy', sector: 'Smart Metering', src: '/assets/imagingarts/client-logos/sf-smart-energy.jpg', caseStudyId: 'sf-smart-energy' },
  { name: 'Rightway Schools', sector: 'Education', src: '/assets/imagingarts/client-logos/rightway.jpg', caseStudyId: 'rightway-schools' },
  { name: 'Mwalimu Conference', sector: 'Education Summit', src: '/assets/imagingarts/client-logos/mwalimu-conference.jpg', caseStudyId: 'mwalimu-conference' },
  { name: 'Hill Group', sector: 'Corporate Group', src: '/assets/imagingarts/client-logos/hill-group.jpg' },
  { name: 'Cherry Garments', sector: 'Garments & Safety', src: '/assets/imagingarts/client-logos/cherry.jpg' },
  { name: 'Nicovic Perfumes', sector: 'Fragrance Retail', src: '/assets/imagingarts/client-logos/nicovic-perfumes.jpg' },
  { name: 'IZ Engineering', sector: 'Construction & Power', src: '/assets/imagingarts/client-logos/iz-engineering.jpg', caseStudyId: 'iz-engineering' },
  { name: 'Zanzibar Cake Festival', sector: 'Culinary Event', src: '/assets/imagingarts/client-logos/zanzibar-cake-festival.jpg', caseStudyId: 'zanzibar-cake-festival' },
  { name: 'MINE Foundation', sector: 'Youth NGO', src: '/assets/imagingarts/client-logos/mine-foundation.jpg', caseStudyId: 'mine-foundation' },
  { name: 'TANNA', sector: 'Nurses Association', src: '/assets/imagingarts/client-logos/tanna.jpg' },
  { name: 'COSCO Construction', sector: 'Engineering', src: '/assets/imagingarts/client-logos/cosco.jpg' },
  { name: 'Rocky & Glo', sector: 'Real Estate & Decor', src: '/assets/imagingarts/client-logos/rocky-glo.jpg' },
  { name: 'CNEEC', sector: 'National Electric Eng.', src: '/assets/imagingarts/client-logos/cneec.jpg' },
  { name: 'Reno Advocates', sector: 'Legal Practice', src: '/assets/imagingarts/client-logos/reno-advocates.jpg' },
  { name: 'JADON', sector: 'Design & Fabrication', src: '/assets/imagingarts/client-logos/jadon.jpg' },
  { name: 'KiboGate', sector: 'Enterprise Supply', src: '/assets/imagingarts/client-logos/kibogate.jpg' },
  { name: 'BOL HR Consultants', sector: 'Human Resources', src: '/assets/imagingarts/client-logos/bol-hr.jpg' },
  { name: 'Meru', sector: 'Energy & Consumer', src: '/assets/imagingarts/client-logos/meru.jpg' },
];

/**
 * ALL 22 Partner / Customer Tiles cropped from Page 19 ("OTHER PROJECTS / CUSTOMERS").
 */
export const OTHER_CUSTOMERS_WALL: Array<{ name: string; src: string }> = [
  { name: 'Zamzam Tours', src: '/assets/imagingarts/other-customers/zamzam-tours.jpg' },
  { name: 'Inundo Company Ltd', src: '/assets/imagingarts/other-customers/inundo.jpg' },
  { name: 'Mr RedCups Enterprise', src: '/assets/imagingarts/other-customers/mr-redcups.jpg' },
  { name: 'Rhyinos Services', src: '/assets/imagingarts/other-customers/rhyinos.jpg' },
  { name: 'OLPER Uzazi', src: '/assets/imagingarts/other-customers/olper-uzazi.jpg' },
  { name: 'KenWay Brand Solution', src: '/assets/imagingarts/other-customers/kenway.jpg' },
  { name: 'ImagingPixels Photography', src: '/assets/imagingarts/other-customers/imaging-pixels.jpg' },
  { name: 'Rocky & Glo Enterprises', src: '/assets/imagingarts/other-customers/rocky-glo-card.jpg' },
  { name: 'Ganizani Trading Co.', src: '/assets/imagingarts/other-customers/ganizani.jpg' },
  { name: 'Kitchen Solution', src: '/assets/imagingarts/other-customers/kitchen-solution.jpg' },
  { name: 'Kasanu Enterprises', src: '/assets/imagingarts/other-customers/kasanu.jpg' },
  { name: 'Raztech Energies', src: '/assets/imagingarts/other-customers/raztech-energies.jpg' },
  { name: 'BEVGroup Logistics', src: '/assets/imagingarts/other-customers/bevgroup.jpg' },
  { name: 'ImagingMovies', src: '/assets/imagingarts/other-customers/imaging-movies.jpg' },
  { name: 'JEP Quality Matters', src: '/assets/imagingarts/other-customers/jep.jpg' },
  { name: 'ZanzibarMall', src: '/assets/imagingarts/other-customers/zanzibarmall.jpg' },
  { name: 'FixAfrica Traders', src: '/assets/imagingarts/other-customers/fixafrica.jpg' },
  { name: 'Setco MobileStores', src: '/assets/imagingarts/other-customers/setco-mobilestores.jpg' },
  { name: 'PYF · Penda Youth', src: '/assets/imagingarts/other-customers/pyf.jpg' },
  { name: 'JEMK Consult', src: '/assets/imagingarts/other-customers/jemk-consult.jpg' },
  { name: 'KlangLink', src: '/assets/imagingarts/other-customers/klanglink.jpg' },
  { name: 'Ndoto Ajira', src: '/assets/imagingarts/other-customers/ndoto-ajira.jpg' },
];

/**
 * ALL 8 Editorial Photographs & Motifs from Pages 1–8 of the June 2026 PDF Profile.
 */
export const PROFILE_VISUALS: ProfileVisualItem[] = [
  {
    src: '/assets/imagingarts/profile/cover-brand-photo.jpg',
    alt: 'Cover portrait — We Think BIG for Your Brand!',
    caption: 'Profile Cover Feature',
    pageLabel: 'PDF Page 01',
  },
  {
    src: '/assets/imagingarts/profile/contact-team.jpg',
    alt: 'ImagingArts Client Support Desk Representative',
    caption: 'Our Dials & Client Care',
    pageLabel: 'PDF Page 02',
  },
  {
    src: '/assets/imagingarts/profile/mobile-product-mockup.jpg',
    alt: 'ImagingArts @imagingarts_tz digital & social identity showcase',
    caption: 'Digital & Social Presence',
    pageLabel: 'PDF Page 02',
  },
  {
    src: '/assets/imagingarts/profile/creative-workspace.jpg',
    alt: 'Studio client collaboration and creative win moment',
    caption: 'Studio Collaboration',
    pageLabel: 'PDF Page 03',
  },
  {
    src: '/assets/imagingarts/profile/why-us-portrait.jpg',
    alt: 'Why ImagingArts creative editorial portrait',
    caption: 'Quality & Prompt Turnaround',
    pageLabel: 'PDF Page 04',
  },
  {
    src: '/assets/imagingarts/profile/vision-portrait.jpg',
    alt: 'Vision, Mission & Core Values vibrant editorial portrait',
    caption: 'Vision, Mission & Values',
    pageLabel: 'PDF Page 05',
  },
  {
    src: '/assets/imagingarts/profile/delivery-team.jpg',
    alt: 'ImagingArts Mbezi Beach courier in branded blue polo & cap holding delivery box',
    caption: 'Free Mbezi Beach Delivery',
    pageLabel: 'PDF Page 07',
  },
  {
    src: '/assets/imagingarts/profile/profile-graphic-motif.jpg',
    alt: 'Ascending crimson arrow architectural brand growth graphic',
    caption: 'Our Strategic Approach',
    pageLabel: 'PDF Page 08',
  },
];

/**
 * Complete 20-Page June 2026 Company Profile PDF Spread Archive
 */
export const PDF_SPREADS: PdfSpreadItem[] = [
  { page: 1, title: 'Cover — We Think BIG for Your Brand!', src: '/assets/imagingarts/pdf-spreads/page-01.jpg' },
  { page: 2, title: 'Our Dials & Digital Channels', src: '/assets/imagingarts/pdf-spreads/page-02.jpg' },
  { page: 3, title: 'Profile Table of Contents', src: '/assets/imagingarts/pdf-spreads/page-03.jpg' },
  { page: 4, title: 'About Us & Why Choose ImagingArts', src: '/assets/imagingarts/pdf-spreads/page-04.jpg' },
  { page: 5, title: 'Vision, Mission & Core Value', src: '/assets/imagingarts/pdf-spreads/page-05.jpg' },
  { page: 6, title: 'Products, Web, Media & Events Services', src: '/assets/imagingarts/pdf-spreads/page-06.jpg' },
  { page: 7, title: 'Delivery Fleet, Leadership & Goals', src: '/assets/imagingarts/pdf-spreads/page-07.jpg' },
  { page: 8, title: 'Our Collaborative Approach', src: '/assets/imagingarts/pdf-spreads/page-08.jpg' },
  { page: 9, title: 'Legal Accreditation & 19 Client Logos', src: '/assets/imagingarts/pdf-spreads/page-09.jpg' },
  { page: 10, title: 'ESON Super Battery — Story & Artwork', src: '/assets/imagingarts/pdf-spreads/page-10.jpg' },
  { page: 11, title: 'ESON Super Battery — Fleet & Product Wrap', src: '/assets/imagingarts/pdf-spreads/page-11.jpg' },
  { page: 12, title: 'Case Study: SF Smart Energy Limited', src: '/assets/imagingarts/pdf-spreads/page-12.jpg' },
  { page: 13, title: 'Case Study: IZ Engineering & Supply', src: '/assets/imagingarts/pdf-spreads/page-13.jpg' },
  { page: 14, title: 'Case Study: Rightway Schools', src: '/assets/imagingarts/pdf-spreads/page-14.jpg' },
  { page: 15, title: 'Case Study: MINE Foundation', src: '/assets/imagingarts/pdf-spreads/page-15.jpg' },
  { page: 16, title: 'Case Study: Mwalimu Conference 2022', src: '/assets/imagingarts/pdf-spreads/page-16.jpg' },
  { page: 17, title: 'Case Study: POCET #50MillionSteps', src: '/assets/imagingarts/pdf-spreads/page-17.jpg' },
  { page: 18, title: 'Case Study: Zanzibar Cake Festival', src: '/assets/imagingarts/pdf-spreads/page-18.jpg' },
  { page: 19, title: 'Other Projects — 22 Partner Brands', src: '/assets/imagingarts/pdf-spreads/page-19.jpg' },
  { page: 20, title: 'Back Cover — Mbezi Beach HQ Contacts', src: '/assets/imagingarts/pdf-spreads/page-20.jpg' },
];
