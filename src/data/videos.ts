/* ============================================================================
 * IMAGINGARTS MODULAR VIDEO LIBRARY
 * ----------------------------------------------------------------------------
 * HOW TO ADD YOUR OWN MP4 / WEBM VIDEO:
 *   1. Convert `.mov` videos to H.264 `.mp4` (or `.webm`) for Android & web.
 *   2. Place the video file inside `public/assets/videos/` (e.g. `showreel.mp4`).
 *   3. Update or append an object inside `MODULAR_VIDEOS` below with `source`.
 *
 * Each video operates via the independent Video Engine (`src/engine/videoManager.ts`)
 * with lazy loading and Android single-stream protection.
 * ============================================================================ */

export type VideoPlacement = 'background' | '3d-texture' | 'showcase' | 'modal';
export type VideoCategory =
  | 'Showreel'
  | 'Behind the Scenes'
  | 'Product Ad'
  | 'Client Project'
  | 'Cinematography';

export interface ModularVideoConfig {
  id: string;
  title: string;
  titleSw: string;
  subtitle: string;
  subtitleSw: string;
  category: VideoCategory;
  categorySw: string;
  /** Local `/assets/videos/*.mp4` or `.webm` path. Optional until local MP4 is uploaded. */
  source?: string;
  /** Verified poster frame displayed prior to playback or when idle. */
  poster: string;
  durationLabel: string;
  autoplay: boolean;
  loop: boolean;
  muted: boolean;
  scrollTriggerZone: number | 'manual';
  controls: boolean;
  placement: VideoPlacement;
  accentHex: string;
}

export const MODULAR_VIDEOS: ModularVideoConfig[] = [
  {
    id: 'imagingarts-showreel',
    title: 'ImagingArts Creative Showreel 2026',
    titleSw: 'Onyesho Kuu la Kazi za ImagingArts 2026',
    subtitle: 'Billboards, 3D architectural signage, fleet wraps & print craftsmanship in Dar es Salaam.',
    subtitleSw: 'Mabango makubwa, alama za 3D, uwekaji chapa kwenye magari na uchapishaji bora Dar es Salaam.',
    category: 'Showreel',
    categorySw: 'Onyesho Kuu',
    poster: '/assets/imagingarts/profile/cover-brand-photo.jpg',
    durationLabel: '01:15',
    autoplay: true,
    loop: true,
    muted: true,
    scrollTriggerZone: 8,
    controls: true,
    placement: '3d-texture',
    accentHex: '#E31E24',
  },
  {
    id: 'sf-smart-energy-doc',
    title: 'SF Smart Energy — Metering Documentary Reel',
    titleSw: 'SF Smart Energy — Makala ya Teknolojia',
    subtitle: 'Technical assembly filming, exterior directional signage & product cinematography.',
    subtitleSw: 'Upigaji picha za kiufundi za mita janja, alama za barabarani na video ya kampuni.',
    category: 'Client Project',
    categorySw: 'Mradi wa Mteja',
    poster: '/assets/imagingarts/case-studies/sf-smart-energy/field-installation.jpg',
    durationLabel: '01:40',
    autoplay: false,
    loop: true,
    muted: false,
    scrollTriggerZone: 'manual',
    controls: true,
    placement: 'showcase',
    accentHex: '#25449C',
  },
  {
    id: 'zanzibar-cake-reel',
    title: 'Zanzibar Cake Festival — Event Aftermovie',
    titleSw: 'Tamasha la Keki Zanzibar — Video ya Tukio',
    subtitle: 'Stage production, culinary showcase coverage, runway highlights & VIP interviews.',
    subtitleSw: 'Maandalizi ya jukwaa, maonyesho ya wapishi wa keki na mahojiano ya wageni maalum.',
    category: 'Cinematography',
    categorySw: 'Sinema & Matukio',
    poster: '/assets/imagingarts/case-studies/zanzibar-cake-festival/award-moment.jpg',
    durationLabel: '02:05',
    autoplay: false,
    loop: true,
    muted: false,
    scrollTriggerZone: 'manual',
    controls: true,
    placement: 'showcase',
    accentHex: '#E31E24',
  },
  {
    id: 'eson-fleet-ad',
    title: 'ESON Super Battery — Product & Fleet Spot',
    titleSw: 'ESON Super Battery — Tangazo la Bidhaa & Lori',
    subtitle: 'Commercial product launch spot featuring 12N9L-BS packaging & Fuso Canter truck branding.',
    subtitleSw: 'Tangazo la uzinduzi wa betri za 12N9L-BS na uwekaji chapa kwenye malori ya usambazaji.',
    category: 'Product Ad',
    categorySw: 'Tangazo la Bidhaa',
    poster: '/assets/imagingarts/case-studies/eson-super-battery/eson-campaign-wide.jpg',
    durationLabel: '00:45',
    autoplay: false,
    loop: true,
    muted: true,
    scrollTriggerZone: 'manual',
    controls: true,
    placement: 'background',
    accentHex: '#16A34A',
  },
  {
    id: 'studio-behind-scenes',
    title: 'Mbezi Beach Print & Branding Behind-the-Scenes',
    titleSw: 'Nyuma ya Pazia — Studio ya Mbezi Beach',
    subtitle: 'Inside White Beach Park Office #207/210: wide-format proofing, laminations & delivery fleet.',
    subtitleSw: 'Ndani ya ofisi za White Beach Park #207/210: uchapishaji, ukaguzi wa ubora na usambazaji.',
    category: 'Behind the Scenes',
    categorySw: 'Nyuma ya Pazia',
    poster: '/assets/imagingarts/profile/delivery-team.jpg',
    durationLabel: '01:10',
    autoplay: false,
    loop: true,
    muted: false,
    scrollTriggerZone: 'manual',
    controls: true,
    placement: 'showcase',
    accentHex: '#162A64',
  },
];
