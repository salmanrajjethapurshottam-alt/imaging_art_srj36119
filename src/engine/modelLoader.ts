/**
 * ImagingArts Modular 3D Model Loader & VideoTexture Binder (`src/engine/modelLoader.ts`)
 * ----------------------------------------------------------------------------
 * Manages Layer 02 (Personal 3D GLB / procedural hero assets) and Layer 03
 * (independent AnimationMixers, hover/rotation kinematics, VideoTexture screens)
 * inside the existing Three.js scene without ever clearing or altering Layer 01.
 */

import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import type { ModularModelConfig } from '../data/models';

export interface LoadedModularModel {
  config: ModularModelConfig;
  root: THREE.Group;
  mixer: THREE.AnimationMixer | null;
  baseY: number;
  screenMaterial: THREE.MeshStandardMaterial | THREE.MeshBasicMaterial | null;
  videoTexture: THREE.VideoTexture | null;
  dispose: () => void;
}

/**
 * Builds a multi-part 3D Studio Broadcast Television (`THREE.Group`) with a matte
 * obsidian chassis, brushed aluminum bezel, stand pillar, base plate, power LED,
 * and a dedicated `TVScreen` mesh ready for live `THREE.VideoTexture` playback.
 */
export function createProceduralStudioTv(
  initialTexture?: THREE.Texture | null,
): {
  group: THREE.Group;
  screenMaterial: THREE.MeshBasicMaterial;
  dispose: () => void;
} {
  const group = new THREE.Group();
  const geometries: THREE.BufferGeometry[] = [];
  const materials: THREE.Material[] = [];

  const bodyMat = new THREE.MeshStandardMaterial({
    color: 0x141824,
    roughness: 0.42,
    metalness: 0.45,
  });
  const bezelMat = new THREE.MeshStandardMaterial({
    color: 0xcbd5e1,
    roughness: 0.25,
    metalness: 0.85,
  });
  const accentMat = new THREE.MeshStandardMaterial({
    color: 0xe31e24,
    roughness: 0.3,
    metalness: 0.2,
  });
  const screenMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    map: initialTexture ?? null,
  });
  materials.push(bodyMat, bezelMat, accentMat, screenMat);

  // Outer rear cabinet
  const cabinetGeo = new THREE.BoxGeometry(250, 148, 16);
  const cabinet = new THREE.Mesh(cabinetGeo, bodyMat);
  cabinet.position.z = -4;

  // Brushed aluminum trim frame
  const bezelGeo = new THREE.BoxGeometry(258, 156, 8);
  const bezel = new THREE.Mesh(bezelGeo, bezelMat);
  bezel.position.z = -10;

  // Active 16:9 Screen Surface (`TVScreen`)
  const screenGeo = new THREE.PlaneGeometry(236, 134);
  const screen = new THREE.Mesh(screenGeo, screenMat);
  screen.name = 'TVScreen';
  screen.position.z = 4.6;

  // Neck & floor stand plinth
  const neckGeo = new THREE.CylinderGeometry(8, 10, 48, 16);
  const neck = new THREE.Mesh(neckGeo, bezelMat);
  neck.position.set(0, -96, -4);

  const plinthGeo = new THREE.BoxGeometry(118, 8, 56);
  const plinth = new THREE.Mesh(plinthGeo, bodyMat);
  plinth.position.set(0, -120, -2);

  // Red ImagingArts chassis status strip
  const ledGeo = new THREE.BoxGeometry(34, 4, 4);
  const led = new THREE.Mesh(ledGeo, accentMat);
  led.position.set(0, -72, 4.8);

  geometries.push(cabinetGeo, bezelGeo, screenGeo, neckGeo, plinthGeo, ledGeo);
  group.add(bezel, cabinet, screen, neck, plinth, led);

  return {
    group,
    screenMaterial: screenMat,
    dispose: () => {
      geometries.forEach((g) => g.dispose());
      materials.forEach((m) => m.dispose());
    },
  };
}

/**
 * Builds an articulated 4-part ImagingArts Creative Totem (`THREE.Group`)
 * that hovers beside Zone 0 until swapped for a custom Blender `.glb`.
 */
export function createProceduralBrandTotem(): {
  group: THREE.Group;
  dispose: () => void;
} {
  const group = new THREE.Group();
  const geometries: THREE.BufferGeometry[] = [];
  const materials: THREE.Material[] = [];

  const navyMat = new THREE.MeshStandardMaterial({ color: 0x162a64, roughness: 0.28, metalness: 0.65 });
  const redMat = new THREE.MeshStandardMaterial({ color: 0xe31e24, roughness: 0.24, metalness: 0.35 });
  const goldMat = new THREE.MeshStandardMaterial({ color: 0xd4a94f, roughness: 0.22, metalness: 0.88 });
  materials.push(navyMat, redMat, goldMat);

  const coreGeo = new THREE.OctahedronGeometry(46, 0);
  const core = new THREE.Mesh(coreGeo, navyMat);

  const ringGeo = new THREE.TorusGeometry(68, 4.5, 14, 48);
  const ring = new THREE.Mesh(ringGeo, redMat);
  ring.rotation.x = Math.PI / 3;

  const haloGeo = new THREE.TorusGeometry(84, 2.5, 12, 48);
  const halo = new THREE.Mesh(haloGeo, goldMat);
  halo.rotation.y = Math.PI / 4;

  geometries.push(coreGeo, ringGeo, haloGeo);
  group.add(core, ring, halo);

  return {
    group,
    dispose: () => {
      geometries.forEach((g) => g.dispose());
      materials.forEach((m) => m.dispose());
    },
  };
}

export function attachVideoTextureToModel(
  model: LoadedModularModel,
  videoEl: HTMLVideoElement,
  targetMeshName = 'TVScreen',
) {
  if (model.videoTexture) {
    model.videoTexture.dispose();
  }

  const videoTexture = new THREE.VideoTexture(videoEl);
  videoTexture.colorSpace = THREE.SRGBColorSpace;
  videoTexture.minFilter = THREE.LinearFilter;
  videoTexture.magFilter = THREE.LinearFilter;
  model.videoTexture = videoTexture;

  if (model.screenMaterial) {
    model.screenMaterial.map = videoTexture;
    model.screenMaterial.needsUpdate = true;
    return;
  }

  model.root.traverse((child) => {
    if (child instanceof THREE.Mesh && child.name === targetMeshName) {
      if (Array.isArray(child.material)) return;
      if (
        child.material instanceof THREE.MeshStandardMaterial ||
        child.material instanceof THREE.MeshBasicMaterial
      ) {
        child.material.map = videoTexture;
        child.material.needsUpdate = true;
        model.screenMaterial = child.material;
      }
    }
  });
}

export async function loadModularModelAsset(
  config: ModularModelConfig,
  customGlbUrl?: string,
  videoEl?: HTMLVideoElement | null,
): Promise<LoadedModularModel> {
  const effectiveUrl = customGlbUrl || config.modelUrl;

  if ((config.sourceType === 'glb' || customGlbUrl) && effectiveUrl) {
    const loader = new GLTFLoader();
    const gltf = await loader.loadAsync(effectiveUrl);
    const root = new THREE.Group();
    const loadedScene = gltf.scene;

    // Normalize Blender model scale to fit viewport proportions cleanly
    const box = new THREE.Box3().setFromObject(loadedScene);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z, 0.001);
    const normScale = 180 / maxDim;
    loadedScene.position.sub(center);
    loadedScene.scale.setScalar(normScale);
    root.add(loadedScene);

    root.position.set(...config.position);
    root.scale.set(...config.scale);
    root.rotation.set(...config.rotation);

    let mixer: THREE.AnimationMixer | null = null;
    if (config.animation.playEmbeddedClips && gltf.animations.length > 0) {
      mixer = new THREE.AnimationMixer(loadedScene);
      const targetClip = config.animation.clipName
        ? THREE.AnimationClip.findByName(gltf.animations, config.animation.clipName)
        : gltf.animations[0];
      if (targetClip) {
        mixer.clipAction(targetClip).play();
      }
    }

    const loaded: LoadedModularModel = {
      config,
      root,
      mixer,
      baseY: config.position[1],
      screenMaterial: null,
      videoTexture: null,
      dispose: () => {
        loaded.videoTexture?.dispose();
        loadedScene.traverse((obj) => {
          if (obj instanceof THREE.Mesh) {
            obj.geometry?.dispose();
            const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
            mats.forEach((m) => m?.dispose());
          }
        });
      },
    };

    if (videoEl && config.videoScreenMeshName) {
      attachVideoTextureToModel(loaded, videoEl, config.videoScreenMeshName);
    }

    return loaded;
  }

  if (config.sourceType === 'procedural-tv') {
    const tv = createProceduralStudioTv(null);
    tv.group.position.set(...config.position);
    tv.group.scale.set(...config.scale);
    tv.group.rotation.set(...config.rotation);

    const loaded: LoadedModularModel = {
      config,
      root: tv.group,
      mixer: null,
      baseY: config.position[1],
      screenMaterial: tv.screenMaterial,
      videoTexture: null,
      dispose: () => {
        loaded.videoTexture?.dispose();
        tv.dispose();
      },
    };

    if (videoEl) {
      attachVideoTextureToModel(loaded, videoEl, config.videoScreenMeshName || 'TVScreen');
    }

    return loaded;
  }

  // Fallback procedural brand sculpture
  const totem = createProceduralBrandTotem();
  totem.group.position.set(...config.position);
  totem.group.scale.set(...config.scale);
  totem.group.rotation.set(...config.rotation);

  return {
    config,
    root: totem.group,
    mixer: null,
    baseY: config.position[1],
    screenMaterial: null,
    videoTexture: null,
    dispose: () => totem.dispose(),
  };
}
