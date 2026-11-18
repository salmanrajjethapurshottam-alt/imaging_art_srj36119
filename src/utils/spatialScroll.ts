/**
 * Pure spatial navigation, scroll-boundary handoff, and magnetic viewport-snap logic.
 * Kept framework-agnostic for deterministic unit testing via `node:test`.
 */

export interface SpatialZoneMeta {
  id: number;
  z: number;
  label: string;
  title: string;
}

export const SPATIAL_ZONES: SpatialZoneMeta[] = [
  { id: 0, z: 0, label: '00 · We Think BIG', title: 'Creative Branding HQ' },
  { id: 1, z: -1000, label: '01 · Giant & Large Format', title: 'Billboards, 3D Signs & Wraps' },
  { id: 2, z: -2000, label: '02 · Publishing & Editorial', title: 'Profiles, Books & Journals' },
  { id: 3, z: -3000, label: '03 · Packaging & Containers', title: 'Cartons, Pouches & Cups' },
  { id: 4, z: -4000, label: '04 · Marketing, Web & Events', title: 'Campaigns, Stage & Digital' },
  { id: 5, z: -5000, label: '05 · Corporate Stationery', title: 'Identity Sets & NCR Supply' },
  { id: 6, z: -6000, label: '06 · Textiles & Merch', title: 'Uniforms, Apparel & Trophies' },
  { id: 7, z: -7000, label: '07 · Micro Print & IDs', title: 'PVC IDs, Foil & Holograms' },
  { id: 8, z: -8000, label: '08 · Clients & Case Studies', title: 'Tanzania Brand Impact' },
  { id: 9, z: -9000, label: '09 · Studio & HQ Contact', title: 'Quote & Mbezi Beach HQ' },
];

export const MIN_Z = -9000;
export const MAX_Z = 0;

export interface ScrollContainerSnapshot {
  scrollTop: number;
  scrollHeight: number;
  clientHeight: number;
}

export interface ScrollStepResult {
  /** Pixels to apply to the internal card scroll container (0 if handing off to 3D Z-axis). */
  internalDelta: number;
  /** Delta to apply to the 3D camera targetZ (negative = advance deeper, positive = return toward 0). */
  spatialDeltaZ: number;
  /** Whether the scroll interaction should be handed off to the 3D stage rather than trapped in the card. */
  handedOffToSpatial: boolean;
}

/**
 * Determines whether an internal card scroll container can absorb scroll in the requested direction,
 * or whether it has reached its boundary and should freely transition to the next/previous 3D card.
 */
export function resolveScrollStep(
  deltaY: number,
  container: ScrollContainerSnapshot | null,
  zSensitivity = 1.35,
  boundaryThreshold = 2,
): ScrollStepResult {
  if (Math.abs(deltaY) < 0.01) {
    return { internalDelta: 0, spatialDeltaZ: 0, handedOffToSpatial: false };
  }

  // No scrollable container under pointer or container doesn't actually overflow -> move 3D stage directly
  if (!container || container.scrollHeight <= container.clientHeight + boundaryThreshold) {
    return {
      internalDelta: 0,
      spatialDeltaZ: -deltaY * zSensitivity,
      handedOffToSpatial: true,
    };
  }

  const maxScrollTop = Math.max(0, container.scrollHeight - container.clientHeight);

  if (deltaY > 0) {
    // User is scrolling DOWN (toward bottom of card / deeper into tunnel)
    const remainingDown = maxScrollTop - container.scrollTop;
    if (remainingDown > boundaryThreshold) {
      if (deltaY <= remainingDown) {
        return { internalDelta: deltaY, spatialDeltaZ: 0, handedOffToSpatial: false };
      }
      // Crossed the bottom boundary within this impulse: consume up to bottom, hand remainder to 3D tunnel
      const overflow = deltaY - remainingDown;
      return {
        internalDelta: remainingDown,
        spatialDeltaZ: -overflow * zSensitivity,
        handedOffToSpatial: true,
      };
    }
    // Already at bottom of card -> hand off immediately to next card
    return {
      internalDelta: 0,
      spatialDeltaZ: -deltaY * zSensitivity,
      handedOffToSpatial: true,
    };
  }

  // User is scrolling UP (deltaY < 0: toward top of card / back toward hero)
  const remainingUp = container.scrollTop;
  if (remainingUp > boundaryThreshold) {
    const absDelta = Math.abs(deltaY);
    if (absDelta <= remainingUp) {
      return { internalDelta: deltaY, spatialDeltaZ: 0, handedOffToSpatial: false };
    }
    const overflow = absDelta - remainingUp;
    return {
      internalDelta: -remainingUp,
      spatialDeltaZ: overflow * zSensitivity,
      handedOffToSpatial: true,
    };
  }

  // Already at top of card -> hand off immediately to previous card
  return {
    internalDelta: 0,
    spatialDeltaZ: -deltaY * zSensitivity,
    handedOffToSpatial: true,
  };
}

export function clampZ(z: number): number {
  return Math.max(MIN_Z, Math.min(MAX_Z, z));
}

/**
 * Finds the nearest zone given a Z position and optional directional fling velocity
 * (negative velocity = user was scrolling down/deeper).
 */
export function findNearestZone(
  z: number,
  zones: SpatialZoneMeta[] = SPATIAL_ZONES,
  flingDirection: -1 | 0 | 1 = 0,
): SpatialZoneMeta {
  const clamped = clampZ(z);
  let best = zones[0];
  let bestDist = Infinity;

  for (const zone of zones) {
    const dist = Math.abs(clamped - zone.z);
    if (dist < bestDist) {
      bestDist = dist;
      best = zone;
    }
  }

  // If user gave a decisive directional fling at least 18% away from the current center,
  // bias the magnet toward the next zone in their scroll direction so flicks feel crisp.
  if (flingDirection !== 0) {
    const deltaFromBest = clamped - best.z;
    // Scroll down => z becomes more negative => deltaFromBest < 0
    if (flingDirection === -1 && deltaFromBest < -160 && best.id < zones.length - 1) {
      return zones[best.id + 1];
    }
    // Scroll up => z becomes more positive => deltaFromBest > 0
    if (flingDirection === 1 && deltaFromBest > 160 && best.id > 0) {
      return zones[best.id - 1];
    }
  }

  return best;
}

export interface ZonePresentation {
  visible: boolean;
  active: boolean;
  opacity: number;
  scale: number;
  /** Always 0 (no text blur) so typography and fine UI details stay crisp. */
  blurPx: 0;
  zIndex: number;
}

/**
 * Computes crisp, blur-free visual presentation for a spatial zone at `zoneZ`
 * given the camera `currentZ`. Ensures active cards settle at exact scale = 1.0
 * to fit the viewport cleanly without fuzzy scaling or blur filters.
 */
export function computeZonePresentation(currentZ: number, zoneZ: number): ZonePresentation {
  const deltaZ = currentZ - zoneZ;
  const absDelta = Math.abs(deltaZ);

  if (absDelta > 680) {
    return {
      visible: false,
      active: false,
      opacity: 0,
      scale: 0.9,
      blurPx: 0,
      zIndex: 0,
    };
  }

  // Crisp settle zone within +-35 units: lock to exact 1:1 scale and full opacity
  if (absDelta <= 35) {
    return {
      visible: true,
      active: true,
      opacity: 1,
      scale: 1,
      blurPx: 0,
      zIndex: 30,
    };
  }

  const normalized = (absDelta - 35) / (680 - 35);
  const opacity = Math.max(0, 1 - Math.pow(normalized, 1.55));

  // Gentle depth scale that never blows cards past the screen edges
  const scale =
    deltaZ >= 0
      ? 1 - normalized * 0.14 // Zone is ahead (deeper in tunnel): slightly smaller
      : 1 + normalized * 0.06; // Zone is passing behind camera: slight lift without cropping

  const active = absDelta < 340;
  return {
    visible: opacity > 0.015,
    active,
    opacity: Number(opacity.toFixed(3)),
    scale: Number(scale.toFixed(4)),
    blurPx: 0,
    zIndex: active ? 25 : 10,
  };
}

/**
 * Frame-rate-independent exponential damping helper.
 */
export function dampValue(current: number, target: number, lambda: number, dtSeconds: number): number {
  const factor = 1 - Math.exp(-lambda * Math.max(0, dtSeconds));
  return current + (target - current) * factor;
}
