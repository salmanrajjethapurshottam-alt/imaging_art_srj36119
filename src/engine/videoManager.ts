/**
 * ImagingArts Independent Video Engine (`src/engine/videoManager.ts`)
 * ----------------------------------------------------------------------------
 * Manages video reels, Android single-stream discipline, scroll-zone triggers,
 * local MP4/WebM previews, and live VideoTexture source elements without coupling
 * to the 3D animation loop.
 */

import { MODULAR_VIDEOS, type ModularVideoConfig } from '../data/videos';

export interface ActiveVideoHandle {
  config: ModularVideoConfig;
  videoEl: HTMLVideoElement;
  cleanup: () => void;
}

/**
 * Generates an animated 16:9 Canvas-backed MediaStream fallback when a registry
 * entry has not yet been wired to a local `.mp4` / `.webm` file, ensuring zero
 * 404s while demonstrating live VideoTexture projection on 3D geometry.
 */
export function createCanvasStreamVideoElement(
  config: ModularVideoConfig,
): { videoEl: HTMLVideoElement; cleanup: () => void } {
  const videoEl = document.createElement('video');
  videoEl.playsInline = true;
  videoEl.muted = config.muted;
  videoEl.loop = config.loop;
  videoEl.crossOrigin = 'anonymous';

  if (config.source) {
    videoEl.preload = 'metadata';
    videoEl.src = config.source;
    return {
      videoEl,
      cleanup: () => {
        videoEl.pause();
        videoEl.removeAttribute('src');
        videoEl.load();
      },
    };
  }

  // Procedural animated showreel canvas stream (supports Three.js VideoTexture)
  const canvas = document.createElement('canvas');
  canvas.width = 640;
  canvas.height = 360;
  const ctx = canvas.getContext('2d');

  let posterImg: HTMLImageElement | null = null;
  if (typeof Image !== 'undefined' && config.poster) {
    posterImg = new Image();
    posterImg.src = config.poster;
  }

  let phase = 0;
  const drawFrame = () => {
    if (!ctx) return;
    phase += 0.035;

    ctx.fillStyle = '#0B0E18';
    ctx.fillRect(0, 0, 640, 360);

    // Subtle poster pan if loaded
    if (posterImg && posterImg.complete && posterImg.naturalWidth > 0) {
      ctx.save();
      ctx.globalAlpha = 0.42;
      const scale = 1.08 + Math.sin(phase * 0.5) * 0.04;
      const w = 640 * scale;
      const h = 360 * scale;
      const ox = (640 - w) / 2 + Math.cos(phase * 0.4) * 14;
      const oy = (360 - h) / 2;
      ctx.drawImage(posterImg, ox, oy, w, h);
      ctx.restore();
    }

    // Crisp editorial scrim + animated brand ticker bars
    const grad = ctx.createLinearGradient(0, 0, 640, 360);
    grad.addColorStop(0, 'rgba(13, 18, 36, 0.78)');
    grad.addColorStop(1, 'rgba(13, 14, 18, 0.90)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 640, 360);

    ctx.fillStyle = '#162A64';
    ctx.fillRect(0, 0, 420, 10);
    ctx.fillStyle = config.accentHex || '#E31E24';
    ctx.fillRect(420, 0, 220, 10);

    // Animated graphic sweep bar
    const sweepX = ((phase * 95) % 740) - 100;
    ctx.fillStyle = 'rgba(227, 30, 36, 0.25)';
    ctx.fillRect(sweepX, 0, 90, 360);

    ctx.fillStyle = '#F87171';
    ctx.font = '700 18px "JetBrains Mono", monospace';
    ctx.fillText(`IMAGINGARTS MEDIA ENGINE · ${config.category.toUpperCase()}`, 36, 74);

    ctx.fillStyle = '#FFFFFF';
    ctx.font = '800 34px "Outfit", sans-serif';
    ctx.fillText(config.title.slice(0, 30), 36, 152);

    ctx.fillStyle = '#CBD5E1';
    ctx.font = '500 19px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('Dar es Salaam · Creative Branding & 3D Signage', 36, 204);

    // Animated timeline progress strip (kept above bottom player control bar safe area)
    ctx.fillStyle = 'rgba(255,255,255,0.16)';
    ctx.fillRect(36, 242, 568, 6);
    const barW = ((Math.sin(phase * 0.7) + 1) / 2) * 568;
    ctx.fillStyle = '#E31E24';
    ctx.fillRect(36, 242, Math.max(40, barW), 6);

    ctx.fillStyle = '#94A3B8';
    ctx.font = '600 15px "JetBrains Mono", monospace';
    ctx.fillText(`LIVE 3D VIDEOTEXTURE  |  ${config.durationLabel}`, 36, 276);
  };

  drawFrame();
  const intervalId = window.setInterval(drawFrame, 60);

  const hasCapture = typeof (canvas as HTMLCanvasElement & { captureStream?: (fps?: number) => MediaStream }).captureStream === 'function';
  if (hasCapture) {
    try {
      const stream = (canvas as HTMLCanvasElement & { captureStream: (fps?: number) => MediaStream }).captureStream(18);
      videoEl.srcObject = stream;
    } catch {
      // Fallback for restricted environments without captureStream
    }
  }

  return {
    videoEl,
    cleanup: () => {
      window.clearInterval(intervalId);
      const stream = videoEl.srcObject as MediaStream | null;
      if (stream) {
        stream.getTracks().forEach((t) => t.stop());
      }
      videoEl.srcObject = null;
    },
  };
}

export class VideoEngineManager {
  private handles = new Map<string, ActiveVideoHandle>();
  private activeId: string | null = null;

  getCatalog(): ModularVideoConfig[] {
    return MODULAR_VIDEOS;
  }

  getVideoConfig(id: string): ModularVideoConfig | undefined {
    return MODULAR_VIDEOS.find((v) => v.id === id);
  }

  /**
   * Ensures Android / mobile devices only decode one active video stream at a time.
   */
  pauseOthers(exceptId: string | null) {
    for (const [id, handle] of this.handles.entries()) {
      if (id !== exceptId && !handle.videoEl.paused) {
        handle.videoEl.pause();
      }
    }
  }

  getOrCreateHandle(videoId: string): ActiveVideoHandle | null {
    const existing = this.handles.get(videoId);
    if (existing) return existing;

    const config = this.getVideoConfig(videoId);
    if (!config) return null;

    const { videoEl, cleanup } = createCanvasStreamVideoElement(config);
    const handle: ActiveVideoHandle = { config, videoEl, cleanup };
    this.handles.set(videoId, handle);
    return handle;
  }

  setSourceUrl(videoId: string, objectUrl: string) {
    const handle = this.getOrCreateHandle(videoId);
    if (!handle) return;
    handle.cleanup();
    handle.videoEl.srcObject = null;
    handle.videoEl.src = objectUrl;
    handle.videoEl.loop = true;
    handle.videoEl.muted = true;
    void handle.videoEl.play().catch(() => undefined);
  }

  async play(videoId: string) {
    this.pauseOthers(videoId);
    this.activeId = videoId;
    const handle = this.getOrCreateHandle(videoId);
    if (!handle) return;
    try {
      await handle.videoEl.play();
    } catch {
      // Ignore autoplay restriction if triggered before user gesture
    }
  }

  syncZonePlayback(activeZoneId: number) {
    for (const config of MODULAR_VIDEOS) {
      if (config.scrollTriggerZone === activeZoneId && config.autoplay) {
        void this.play(config.id);
        return;
      }
    }
    if (this.activeId) {
      const current = this.handles.get(this.activeId);
      if (current && current.config.scrollTriggerZone !== 'manual') {
        current.videoEl.pause();
      }
    }
  }

  disposeAll() {
    for (const handle of this.handles.values()) {
      handle.cleanup();
    }
    this.handles.clear();
    this.activeId = null;
  }
}
