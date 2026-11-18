import { useEffect, useRef, useState, type MutableRefObject } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import type { ThemeMode } from '../i18n/translations';
import { MODULAR_MODELS } from '../data/models';
import {
  attachVideoTextureToModel,
  loadModularModelAsset,
  type LoadedModularModel,
} from '../engine/modelLoader';
import type { VideoEngineManager } from '../engine/videoManager';

interface ThreeWorldCanvasProps {
  currentZRef: MutableRefObject<number>;
  pointerRef: MutableRefObject<{ x: number; y: number }>;
  scrollActiveRef: MutableRefObject<boolean>;
  theme: ThemeMode;
  activeTvVideoId: string;
  customGlbPreviewUrl: string | null;
  videoEngineRef: MutableRefObject<VideoEngineManager | null>;
}

function createTierTexture(
  titleLine1: string,
  titleLine2: string,
  subtitle: string,
  accentHex: string,
): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    ctx.fillStyle = '#0D0E12';
    ctx.fillRect(0, 0, 1024, 1024);

    ctx.fillStyle = '#162A64';
    ctx.fillRect(0, 0, 680, 34);
    ctx.fillStyle = '#E31E24';
    ctx.fillRect(680, 0, 344, 34);

    ctx.fillStyle = '#E31E24';
    ctx.font = '700 30px "JetBrains Mono", monospace';
    ctx.fillText('IMAGINGARTS // CREATIVE BRANDING', 60, 112);

    ctx.fillStyle = '#FFFFFF';
    ctx.font = '800 96px "Outfit", sans-serif';
    ctx.fillText(titleLine1, 60, 315);

    ctx.fillStyle = accentHex;
    ctx.fillText(titleLine2, 60, 435);

    ctx.fillStyle = '#94A3B8';
    ctx.font = '500 32px "JetBrains Mono", monospace';
    ctx.fillText(subtitle, 60, 540);

    ctx.strokeStyle = 'rgba(255,255,255,0.12)';
    ctx.lineWidth = 4;
    ctx.strokeRect(48, 48, 928, 928);

    ctx.fillStyle = '#FFFFFF';
    ctx.font = '600 26px "JetBrains Mono", monospace';
    ctx.fillText('MBEZI BEACH, DAR ES SALAAM  |  +255 716 237 714', 60, 932);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}

const DARK_BG = new THREE.Color('#0D0E12');
const LIGHT_BG = new THREE.Color('#E8EEF8');

export function ThreeWorldCanvas({
  currentZRef,
  pointerRef,
  scrollActiveRef,
  theme,
  activeTvVideoId,
  customGlbPreviewUrl,
  videoEngineRef,
}: ThreeWorldCanvasProps) {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [webglFailed, setWebglFailed] = useState(false);

  const themeRef = useRef<ThemeMode>(theme);
  const loadedModelsRef = useRef<LoadedModularModel[]>([]);
  const modularGroupRef = useRef<THREE.Group | null>(null);
  const customGlbSlotRef = useRef<LoadedModularModel | null>(null);

  useEffect(() => {
    themeRef.current = theme;
  }, [theme]);

  // Dynamically re-bind VideoTexture onto the Layer 02 3D TV screen when video source changes
  useEffect(() => {
    const engine = videoEngineRef.current;
    if (!engine) return;
    const handle = engine.getOrCreateHandle(activeTvVideoId);
    if (!handle) return;

    for (const mod of loadedModelsRef.current) {
      if (mod.config.videoTextureId) {
        attachVideoTextureToModel(
          mod,
          handle.videoEl,
          mod.config.videoScreenMeshName || 'TVScreen',
        );
      }
    }
  }, [activeTvVideoId, videoEngineRef]);

  // Dynamically mount/replace only the Layer 02 Custom Blender GLB preview (never scene.clear())
  useEffect(() => {
    const modGroup = modularGroupRef.current;
    if (!modGroup) return;

    if (customGlbSlotRef.current) {
      modGroup.remove(customGlbSlotRef.current.root);
      customGlbSlotRef.current.dispose();
      customGlbSlotRef.current = null;
    }

    if (!customGlbPreviewUrl) return;

    let cancelled = false;
    const previewConfig = {
      id: 'user-glb-preview',
      name: 'User Blender GLB Preview',
      nameSw: 'Model ya Blender ya Mtumiaji',
      description: 'Live loaded GLB model',
      descriptionSw: 'Model ya GLB iliyopakiwa',
      sourceType: 'glb' as const,
      modelUrl: customGlbPreviewUrl,
      position: [260, 0, -180] as [number, number, number],
      scale: [1, 1, 1] as [number, number, number],
      rotation: [0, 0, 0] as [number, number, number],
      animation: {
        autoRotateY: 0.35,
        bobAmplitude: 6,
        bobSpeed: 1.2,
        playEmbeddedClips: true,
      },
      scrollTriggerZone: 'global' as const,
      visible: true,
      interaction: { hoverLift: true, clickInspect: false },
    };

    void loadModularModelAsset(previewConfig, customGlbPreviewUrl)
      .then((loaded) => {
        if (cancelled) {
          loaded.dispose();
          return;
        }
        modGroup.add(loaded.root);
        customGlbSlotRef.current = loaded;
      })
      .catch(() => undefined);

    return () => {
      cancelled = true;
    };
  }, [customGlbPreviewUrl]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        powerPreference: 'high-performance',
      });
    } catch {
      setWebglFailed(true);
      return;
    }

    const gl = renderer.getContext();
    const debugExt = gl.getExtension('WEBGL_debug_renderer_info');
    const glRendererName = debugExt
      ? String(gl.getParameter(debugExt.UNMASKED_RENDERER_WEBGL))
      : '';
    const isSoftwareGl = /SwiftShader|llvmpipe|Software/i.test(glRendererName);

    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    container.appendChild(renderer.domElement);

    const handleContextLost = (e: Event) => {
      e.preventDefault();
    };
    renderer.domElement.addEventListener('webglcontextlost', handleContextLost);

    const scene = new THREE.Scene();
    const initBg = themeRef.current === 'light' ? LIGHT_BG.clone() : DARK_BG.clone();
    scene.background = initBg;
    const fog = new THREE.FogExp2(initBg.getHex(), 0.00065);
    scene.fog = fog;

    const pmrem = new THREE.PMREMGenerator(renderer);
    const envTarget = pmrem.fromScene(new RoomEnvironment(), 0.04);
    scene.environment = envTarget.texture;
    pmrem.dispose();

    const camera = new THREE.PerspectiveCamera(
      54,
      window.innerWidth / window.innerHeight,
      1,
      3600,
    );
    camera.position.set(0, 0, 260);

    // Warm directional key light + cool sky/ground HemisphereLight contrast
    const hemiLight = new THREE.HemisphereLight(0x8bb0ff, 0x16121c, 0.9);
    scene.add(hemiLight);

    const warmKeyLight = new THREE.DirectionalLight(0xfff1dc, 1.45);
    warmKeyLight.position.set(320, 420, 450);
    scene.add(warmKeyLight);

    const navyAccentLight = new THREE.PointLight(0x25449c, 2.4, 3400);
    navyAccentLight.position.set(-480, 280, -800);
    scene.add(navyAccentLight);

    const redAccentLight = new THREE.PointLight(0xe31e24, 2.2, 3400);
    redAccentLight.position.set(480, -220, -4500);
    scene.add(redAccentLight);

    const textures: THREE.CanvasTexture[] = [];
    const geometries: THREE.BufferGeometry[] = [];
    const materials: THREE.Material[] = [];

    const maxAniso = isSoftwareGl ? 1 : Math.min(4, renderer.capabilities.getMaxAnisotropy());
    const makeTex = (l1: string, l2: string, sub: string, accent: string) => {
      const t = createTierTexture(l1, l2, sub, accent);
      t.anisotropy = maxAniso;
      textures.push(t);
      return t;
    };

    const navyMat = new THREE.MeshStandardMaterial({ color: 0x162a64, roughness: 0.35, metalness: 0.45 });
    const redMat = new THREE.MeshStandardMaterial({ color: 0xe31e24, roughness: 0.3, metalness: 0.25 });
    const darkTrimMat = new THREE.MeshStandardMaterial({ color: 0x1e2436, roughness: 0.72, metalness: 0.15 });
    const brassAccentMat = new THREE.MeshStandardMaterial({ color: 0xd4a94f, roughness: 0.22, metalness: 0.85 });
    materials.push(navyMat, redMat, darkTrimMat, brassAccentMat);

    // =========================================================================
    // LAYER 01: Existing 3D Environment & Tunnel Showcase (Untouched by Layer 02)
    // =========================================================================
    const layer01Group = new THREE.Group();
    scene.add(layer01Group);
    const spinningProps: Array<{ group: THREE.Group; speed: number; baseY: number }> = [];

    const makeFaceMat = (tex: THREE.CanvasTexture, roughness = 0.35) => {
      const mat = new THREE.MeshStandardMaterial({
        map: tex,
        color: 0xffffff,
        roughness,
        metalness: 0.08,
      });
      materials.push(mat);
      return mat;
    };

    // Zone 0 (-190): Composite Orbital Beacon
    const heroGroup = new THREE.Group();
    heroGroup.position.set(0, 0, -190);
    const outerRingGeo = new THREE.TorusGeometry(205, 3, 14, 72);
    const innerRingGeo = new THREE.TorusGeometry(155, 2.5, 12, 64);
    const nodeGeo = new THREE.OctahedronGeometry(11, 0);
    geometries.push(outerRingGeo, innerRingGeo, nodeGeo);

    const ringNavy = new THREE.Mesh(outerRingGeo, navyMat);
    ringNavy.rotation.x = 0.52;
    heroGroup.add(ringNavy);

    const ringRed = new THREE.Mesh(innerRingGeo, redMat);
    ringRed.rotation.y = 0.62;
    heroGroup.add(ringRed);

    for (let i = 0; i < 4; i++) {
      const node = new THREE.Mesh(nodeGeo, brassAccentMat);
      const angle = (i * Math.PI) / 2;
      node.position.set(Math.cos(angle) * 205, Math.sin(angle) * 110, 0);
      heroGroup.add(node);
    }
    layer01Group.add(heroGroup);
    spinningProps.push({ group: heroGroup, speed: 0.25, baseY: 0 });

    // Zone 1 (-1000): Billboard Gantry
    const tex1 = makeTex('WE THINK BIG', 'GIANT FORMAT', 'BILLBOARDS, WRAPS & 3D SIGNS', '#E31E24');
    const group1 = new THREE.Group();
    group1.position.set(220, 8, -1000);
    const boardGeo = new THREE.BoxGeometry(310, 180, 12);
    const frameGeo = new THREE.BoxGeometry(326, 196, 8);
    const strutGeo = new THREE.CylinderGeometry(5, 6, 95, 12);
    geometries.push(boardGeo, frameGeo, strutGeo);
    const boardMesh = new THREE.Mesh(boardGeo, makeFaceMat(tex1, 0.28));
    boardMesh.position.z = 5;
    const frameMesh = new THREE.Mesh(frameGeo, darkTrimMat);
    const strutL = new THREE.Mesh(strutGeo, navyMat);
    strutL.position.set(-100, -135, 0);
    const strutR = new THREE.Mesh(strutGeo, navyMat);
    strutR.position.set(100, -135, 0);
    const lightBar = new THREE.Mesh(new THREE.BoxGeometry(270, 6, 14), brassAccentMat);
    geometries.push(lightBar.geometry);
    lightBar.position.set(0, 104, 10);
    group1.add(frameMesh, boardMesh, strutL, strutR, lightBar);
    group1.rotation.y = -0.32;
    layer01Group.add(group1);
    spinningProps.push({ group: group1, speed: 0.14, baseY: 8 });

    // Zone 2 (-2000): Editorial Monolith
    const tex2 = makeTex('PUBLISHING', '& PROFILES', 'PROFILES, BOOKS & JOURNALS', '#3B66E0');
    const group2 = new THREE.Group();
    group2.position.set(-220, 0, -2000);
    const coverGeo = new THREE.BoxGeometry(165, 220, 38);
    const spineGeo = new THREE.BoxGeometry(16, 224, 42);
    const ribbonGeo = new THREE.BoxGeometry(12, 46, 4);
    geometries.push(coverGeo, spineGeo, ribbonGeo);
    const bookMesh = new THREE.Mesh(coverGeo, makeFaceMat(tex2, 0.26));
    const spineMesh = new THREE.Mesh(spineGeo, redMat);
    spineMesh.position.x = -84;
    const ribbonMesh = new THREE.Mesh(ribbonGeo, brassAccentMat);
    ribbonMesh.position.set(35, -125, 0);
    group2.add(bookMesh, spineMesh, ribbonMesh);
    group2.rotation.y = 0.36;
    layer01Group.add(group2);
    spinningProps.push({ group: group2, speed: 0.18, baseY: 0 });

    // Zone 3 (-3000): Structural Packaging
    const tex3 = makeTex('PACKAGING', '& CONTAINERS', 'CARTONS, POUCHES & CUPS', '#E31E24');
    const group3 = new THREE.Group();
    group3.position.set(220, 0, -3000);
    const cartonGeo = new THREE.BoxGeometry(170, 170, 170);
    const bandGeo = new THREE.BoxGeometry(176, 18, 176);
    geometries.push(cartonGeo, bandGeo);
    const cartonMesh = new THREE.Mesh(cartonGeo, makeFaceMat(tex3, 0.34));
    const topBand = new THREE.Mesh(bandGeo, navyMat);
    topBand.position.y = 76;
    const midBand = new THREE.Mesh(new THREE.BoxGeometry(22, 176, 176), redMat);
    geometries.push(midBand.geometry);
    group3.add(cartonMesh, topBand, midBand);
    group3.rotation.y = -0.25;
    layer01Group.add(group3);
    spinningProps.push({ group: group3, speed: 0.24, baseY: 0 });

    // Zone 4 (-4000): Events & Retail Activation
    const tex4 = makeTex('EVENTS, WEB', '& COLLATERAL', 'STAGE, PHOTOGRAPHY & DIGITAL', '#3B66E0');
    const group4 = new THREE.Group();
    group4.position.set(-220, 0, -4000);
    const flyerGeo = new THREE.BoxGeometry(160, 220, 10);
    const standGeo = new THREE.BoxGeometry(18, 240, 18);
    geometries.push(flyerGeo, standGeo);
    const flyerMesh = new THREE.Mesh(flyerGeo, makeFaceMat(tex4, 0.35));
    const pillarL = new THREE.Mesh(standGeo, navyMat);
    pillarL.position.x = -92;
    const pillarR = new THREE.Mesh(standGeo, redMat);
    pillarR.position.x = 92;
    group4.add(flyerMesh, pillarL, pillarR);
    group4.rotation.y = 0.25;
    layer01Group.add(group4);
    spinningProps.push({ group: group4, speed: 0.18, baseY: 0 });

    // Zone 5 (-5000): Corporate Stationery Set
    const tex5 = makeTex('STATIONERY', '& NCR BOOKS', 'LETTERHEADS & OFFICE SUPPLY', '#E31E24');
    const group5 = new THREE.Group();
    group5.position.set(220, 0, -5000);
    const folioGeo = new THREE.BoxGeometry(195, 145, 12);
    const sheetGeo = new THREE.BoxGeometry(180, 130, 8);
    const stampGeo = new THREE.CylinderGeometry(20, 24, 34, 16);
    geometries.push(folioGeo, sheetGeo, stampGeo);
    const folioMesh = new THREE.Mesh(folioGeo, makeFaceMat(tex5, 0.32));
    const sheetMesh = new THREE.Mesh(sheetGeo, darkTrimMat);
    sheetMesh.position.set(-14, -14, -14);
    const stampMesh = new THREE.Mesh(stampGeo, redMat);
    stampMesh.position.set(78, -68, 20);
    group5.add(folioMesh, sheetMesh, stampMesh);
    group5.rotation.y = -0.3;
    layer01Group.add(group5);
    spinningProps.push({ group: group5, speed: 0.2, baseY: 0 });

    // Zone 6 (-6000): Textiles & Promo Merch
    const tex6 = makeTex('APPAREL &', 'PROMO MERCH', 'UNIFORMS, TROPHIES & MUGS', '#3B66E0');
    const group6 = new THREE.Group();
    group6.position.set(-220, 0, -6000);
    const mugGeo = new THREE.CylinderGeometry(72, 66, 185, 28);
    const rimGeo = new THREE.TorusGeometry(72, 4, 10, 32);
    const handleGeo = new THREE.TorusGeometry(42, 8, 10, 24, Math.PI);
    geometries.push(mugGeo, rimGeo, handleGeo);
    const mugMesh = new THREE.Mesh(mugGeo, makeFaceMat(tex6, 0.22));
    const mugRim = new THREE.Mesh(rimGeo, brassAccentMat);
    mugRim.rotation.x = Math.PI / 2;
    mugRim.position.y = 92;
    const mugHandle = new THREE.Mesh(handleGeo, redMat);
    mugHandle.rotation.z = -Math.PI / 2;
    mugHandle.position.x = 68;
    group6.add(mugMesh, mugRim, mugHandle);
    group6.rotation.y = 0.4;
    layer01Group.add(group6);
    spinningProps.push({ group: group6, speed: 0.28, baseY: 0 });

    // Zone 7 (-7000): Micro Print & PVC IDs
    const tex7 = makeTex('MICRO PRINT', '& PVC IDS', 'FOIL CARDS & CERTIFICATES', '#E31E24');
    const group7 = new THREE.Group();
    group7.position.set(220, 0, -7000);
    const cardGeo = new THREE.BoxGeometry(225, 138, 6);
    const stripGeo = new THREE.BoxGeometry(225, 18, 8);
    const clipGeo = new THREE.BoxGeometry(36, 20, 14);
    geometries.push(cardGeo, stripGeo, clipGeo);
    const cardMesh = new THREE.Mesh(cardGeo, makeFaceMat(tex7, 0.22));
    const foilStrip = new THREE.Mesh(stripGeo, brassAccentMat);
    foilStrip.position.y = -48;
    const lanyardClip = new THREE.Mesh(clipGeo, navyMat);
    lanyardClip.position.y = 78;
    group7.add(cardMesh, foilStrip, lanyardClip);
    group7.rotation.y = -0.22;
    layer01Group.add(group7);
    spinningProps.push({ group: group7, speed: 0.3, baseY: 0 });

    // Zone 8 (-8140): Client Case Studies Gallery Wall
    const tex8 = makeTex('TANZANIA', 'CLIENT IMPACT', 'ESON · SF · MINE · POCET', '#E31E24');
    const group8 = new THREE.Group();
    group8.position.set(-320, 12, -8140);
    group8.rotation.y = 0.34;
    const mainWallGeo = new THREE.BoxGeometry(280, 175, 10);
    const wingGeo = new THREE.BoxGeometry(26, 195, 22);
    geometries.push(mainWallGeo, wingGeo);
    const showcaseMesh = new THREE.Mesh(mainWallGeo, makeFaceMat(tex8, 0.25));
    const wingL = new THREE.Mesh(wingGeo, navyMat);
    wingL.position.x = -156;
    const wingR = new THREE.Mesh(wingGeo, redMat);
    wingR.position.x = 156;
    group8.add(showcaseMesh, wingL, wingR);
    layer01Group.add(group8);
    spinningProps.push({ group: group8, speed: 0.14, baseY: 12 });

    // Instanced registration particles along Z tunnel
    const particleCount = isSoftwareGl ? 320 : 900;
    const sparkGeo = new THREE.BoxGeometry(3.2, 3.2, 3.2);
    const sparkMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    geometries.push(sparkGeo);
    materials.push(sparkMat);
    const instancedSparks = new THREE.InstancedMesh(sparkGeo, sparkMat, particleCount);
    const dummy = new THREE.Object3D();
    const colorScratch = new THREE.Color();
    const paletteHex = ['#25449C', '#E31E24', '#162A64', '#3B66E0', '#D4A94F'];

    for (let i = 0; i < particleCount; i++) {
      dummy.position.set(
        (Math.random() - 0.5) * 1900,
        (Math.random() - 0.5) * 1300,
        -Math.random() * 9600 + 250,
      );
      const s = 0.65 + Math.random() * 0.9;
      dummy.scale.set(s, s, s);
      dummy.updateMatrix();
      instancedSparks.setMatrixAt(i, dummy.matrix);
      colorScratch.set(paletteHex[i % paletteHex.length]);
      instancedSparks.setColorAt(i, colorScratch);
    }
    instancedSparks.instanceMatrix.needsUpdate = true;
    if (instancedSparks.instanceColor) instancedSparks.instanceColor.needsUpdate = true;
    instancedSparks.computeBoundingSphere();
    layer01Group.add(instancedSparks);

    // =========================================================================
    // LAYER 02 & 03: Independent Personal 3D Models & VideoTexture Screens
    // =========================================================================
    const modularGroup = new THREE.Group();
    modularGroupRef.current = modularGroup;
    scene.add(modularGroup);

    let unmounted = false;
    void (async () => {
      const loadedList: LoadedModularModel[] = [];
      for (const modelCfg of MODULAR_MODELS) {
        if (!modelCfg.visible) continue;
        const videoHandle =
          modelCfg.videoTextureId && videoEngineRef.current
            ? videoEngineRef.current.getOrCreateHandle(modelCfg.videoTextureId)
            : null;
        try {
          const loaded = await loadModularModelAsset(
            modelCfg,
            undefined,
            videoHandle?.videoEl ?? null,
          );
          if (unmounted) {
            loaded.dispose();
            return;
          }
          modularGroup.add(loaded.root);
          loadedList.push(loaded);
        } catch {
          // Non-fatal: fallback gracefully without blocking Layer 01
        }
      }
      loadedModelsRef.current = loadedList;
    })();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Pacing & render loop (software-WebGL friendly)
    let rafId = 0;
    let timerId = 0;
    let disposed = false;
    let lastTime = performance.now();

    const afterDraw = (drawFn: () => void) => {
      if (disposed) return;
      if (!isSoftwareGl) {
        rafId = requestAnimationFrame(drawFn);
      } else {
        timerId = window.setTimeout(() => {
          rafId = requestAnimationFrame(drawFn);
        }, 40);
      }
    };

    const drawFrame = () => {
      if (disposed) return;
      const now = performance.now();
      const dt = Math.min(0.05, (now - lastTime) / 1000);
      lastTime = now;

      // Smoothly transition background & fog between Dark (#0D0E12) and Light (#E8EEF8)
      const targetBg = themeRef.current === 'light' ? LIGHT_BG : DARK_BG;
      if (scene.background instanceof THREE.Color) {
        scene.background.lerp(targetBg, Math.min(1, dt * 8));
        fog.color.copy(scene.background);
      }
      hemiLight.intensity = themeRef.current === 'light' ? 1.35 : 0.9;

      const z = currentZRef.current;
      const px = pointerRef.current.x;
      const py = pointerRef.current.y;

      camera.position.z = z + 260;
      camera.position.x = px * 28;
      camera.position.y = py * 18;
      camera.lookAt(px * 8, py * 5, z - 350);

      // Update Layer 01 Props (isolated)
      for (const item of spinningProps) {
        item.group.rotation.y += item.speed * dt;
        item.group.rotation.x = py * 0.08;
        item.group.position.y = item.baseY + Math.sin(now * 0.001 + item.group.position.z) * 4;
      }

      // Update Layer 02 Modular Models & independent AnimationMixers
      for (const mod of loadedModelsRef.current) {
        if (mod.mixer) mod.mixer.update(dt);
        mod.root.rotation.y += mod.config.animation.autoRotateY * dt;
        mod.root.position.y =
          mod.baseY +
          Math.sin(now * 0.001 * mod.config.animation.bobSpeed) *
            mod.config.animation.bobAmplitude;
      }

      if (customGlbSlotRef.current) {
        const custom = customGlbSlotRef.current;
        if (custom.mixer) custom.mixer.update(dt);
        custom.root.rotation.y += custom.config.animation.autoRotateY * dt;
        custom.root.position.y =
          custom.baseY +
          Math.sin(now * 0.001 * custom.config.animation.bobSpeed) *
            custom.config.animation.bobAmplitude;
      }

      if (!isSoftwareGl || scrollActiveRef.current) {
        instancedSparks.rotation.z += 0.025 * dt;
      }

      renderer.render(scene, camera);
      afterDraw(drawFrame);
    };

    if (!isSoftwareGl) {
      renderer.compile(scene, camera);
    }
    drawFrame();

    return () => {
      disposed = true;
      unmounted = true;
      cancelAnimationFrame(rafId);
      clearTimeout(timerId);
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('webglcontextlost', handleContextLost);
      loadedModelsRef.current.forEach((m) => m.dispose());
      loadedModelsRef.current = [];
      if (customGlbSlotRef.current) {
        customGlbSlotRef.current.dispose();
        customGlbSlotRef.current = null;
      }
      modularGroupRef.current = null;
      envTarget.dispose();
      textures.forEach((t) => t.dispose());
      geometries.forEach((g) => g.dispose());
      materials.forEach((m) => m.dispose());
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [currentZRef, pointerRef, scrollActiveRef, videoEngineRef]);

  if (webglFailed) {
    return (
      <div
        aria-hidden="true"
        className="fixed inset-0 z-[1] bg-[radial-gradient(ellipse_at_top,#CBD5E1_0%,#EEF2F9_65%,#E2E8F0_100%)] dark:bg-[radial-gradient(ellipse_at_top,#162A64_0%,#0D0E12_55%,#07080B_100%)]"
      />
    );
  }

  return <div ref={mountRef} className="fixed inset-0 z-[1] pointer-events-none" aria-hidden="true" />;
}
