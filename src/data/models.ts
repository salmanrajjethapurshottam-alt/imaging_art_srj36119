/* ============================================================================
 * IMAGINGARTS PERSONAL 3D MODEL LIBRARY (MODULAR LAYER 02 / LAYER 03)
 * ----------------------------------------------------------------------------
 * HOW TO ADD YOUR OWN BLENDER (.glb) MODEL:
 *   1. Export your model from Blender as `.glb` into `public/assets/models/`
 *   2. Add a new entry in `MODULAR_MODELS` below with `sourceType: 'glb'`
 *      and `modelUrl: '/assets/models/your-model.glb'`.
 *   3. Configure its `position`, `scale`, `rotation`, `animation`,
 *      `scrollTriggerZone`, and optional `videoScreenTarget` (for VideoTexture).
 *
 * Existing 3D environment animations (Layer 01) remain untouched.
 * ============================================================================ */

export type ModelSourceType = 'glb' | 'procedural-tv' | 'procedural-prism';

export interface ModularModelAnimation {
  autoRotateY: number;
  bobAmplitude: number;
  bobSpeed: number;
  playEmbeddedClips: boolean;
  clipName?: string;
}

export interface ModularModelConfig {
  id: string;
  name: string;
  nameSw: string;
  description: string;
  descriptionSw: string;
  sourceType: ModelSourceType;
  /** Path to `.glb` inside `/assets/models/...` when `sourceType === 'glb'`. */
  modelUrl?: string;
  position: [number, number, number];
  scale: [number, number, number];
  rotation: [number, number, number];
  animation: ModularModelAnimation;
  /** Zone ID (0..9) where this model is centered or triggered, or 'global'. */
  scrollTriggerZone: number | 'global';
  visible: boolean;
  interaction: {
    hoverLift: boolean;
    clickInspect: boolean;
  };
  /** Optional video ID from `src/data/videos.ts` to project as a Three.js VideoTexture. */
  videoTextureId?: string;
  /** Optional mesh name inside a GLB model to receive the VideoTexture (e.g. 'Screen'). */
  videoScreenMeshName?: string;
}

export const MODULAR_MODELS: ModularModelConfig[] = [
  {
    id: 'studio-broadcast-tv',
    name: '3D Studio Broadcast Monitor (VideoTexture)',
    nameSw: 'Runinga ya Studio ya 3D (VideoTexture)',
    description:
      'Rotating 3D studio television display playing an active Three.js VideoTexture feed independently of Layer 01 tunnel animations.',
    descriptionSw:
      'Runinga ya studio ya 3D inayozunguka ikicheza VideoTexture moja kwa moja bila kuathiri michoro ya msingi ya 3D.',
    sourceType: 'procedural-tv',
    position: [260, -10, -8040],
    scale: [1, 1, 1],
    rotation: [0, -0.35, 0],
    animation: {
      autoRotateY: 0.22,
      bobAmplitude: 6,
      bobSpeed: 1.1,
      playEmbeddedClips: true,
    },
    scrollTriggerZone: 8,
    visible: true,
    interaction: {
      hoverLift: true,
      clickInspect: true,
    },
    videoTextureId: 'imagingarts-showreel',
    videoScreenMeshName: 'TVScreen',
  },
  {
    id: 'imagingarts-brand-totem',
    name: 'ImagingArts Geometric Creative Totem',
    nameSw: 'Mnara wa Ubunifu wa ImagingArts 3D',
    description:
      'Modular Layer 02 sculptural emblem hovering beside the Hero zone; ready to swap with `imagingarts_logo.glb` from Blender.',
    descriptionSw:
      'Sanamu ya ubunifu ya Layer 02 pembeni mwa ukurasa wa mwanzo; tayari kubadilishwa na faili la `.glb` kutoka Blender.',
    sourceType: 'procedural-prism',
    position: [-295, 24, -180],
    scale: [1, 1, 1],
    rotation: [0.15, 0.45, 0],
    animation: {
      autoRotateY: 0.36,
      bobAmplitude: 8,
      bobSpeed: 1.35,
      playEmbeddedClips: true,
    },
    scrollTriggerZone: 0,
    visible: true,
    interaction: {
      hoverLift: true,
      clickInspect: false,
    },
  },
];
