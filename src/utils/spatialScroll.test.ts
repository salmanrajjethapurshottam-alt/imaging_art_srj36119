import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  clampZ,
  computeZonePresentation,
  findNearestZone,
  resolveScrollStep,
  SPATIAL_ZONES,
} from './spatialScroll.ts';

describe('resolveScrollStep (free card scroll & boundary handoff)', () => {
  it('routes scroll directly to 3D Z-axis when no scrollable container exists', () => {
    const res = resolveScrollStep(100, null, 1.5);
    assert.equal(res.internalDelta, 0);
    assert.equal(res.spatialDeltaZ, -150);
    assert.equal(res.handedOffToSpatial, true);
  });

  it('routes scroll directly to 3D Z-axis when card content fits without vertical overflow', () => {
    const res = resolveScrollStep(80, { scrollTop: 0, scrollHeight: 500, clientHeight: 500 }, 1.2);
    assert.equal(res.internalDelta, 0);
    assert.equal(res.spatialDeltaZ, -96);
    assert.equal(res.handedOffToSpatial, true);
  });

  it('scrolls inside an overflowing card before reaching the bottom', () => {
    const res = resolveScrollStep(120, { scrollTop: 50, scrollHeight: 1200, clientHeight: 600 }, 1.0);
    assert.equal(res.internalDelta, 120);
    assert.equal(res.spatialDeltaZ, 0);
    assert.equal(res.handedOffToSpatial, false);
  });

  it('hands off seamlessly to the next 3D zone once the card reaches bottom', () => {
    // Already at bottom (scrollTop + clientHeight === scrollHeight)
    const res = resolveScrollStep(90, { scrollTop: 600, scrollHeight: 1200, clientHeight: 600 }, 1.0);
    assert.equal(res.internalDelta, 0);
    assert.equal(res.spatialDeltaZ, -90);
    assert.equal(res.handedOffToSpatial, true);
  });

  it('splits a single scroll impulse across the bottom boundary without losing travel', () => {
    // Only 30px remaining to bottom, impulse is 100px
    const res = resolveScrollStep(100, { scrollTop: 570, scrollHeight: 1200, clientHeight: 600 }, 1.0);
    assert.equal(res.internalDelta, 30);
    assert.equal(res.spatialDeltaZ, -70);
    assert.equal(res.handedOffToSpatial, true);
  });

  it('scrolls upward inside a scrolled card, then hands off to previous 3D zone at top', () => {
    const inside = resolveScrollStep(-100, { scrollTop: 250, scrollHeight: 1200, clientHeight: 600 }, 1.0);
    assert.equal(inside.internalDelta, -100);
    assert.equal(inside.spatialDeltaZ, 0);
    assert.equal(inside.handedOffToSpatial, false);

    const atTop = resolveScrollStep(-100, { scrollTop: 0, scrollHeight: 1200, clientHeight: 600 }, 1.0);
    assert.equal(atTop.internalDelta, 0);
    assert.equal(atTop.spatialDeltaZ, 100);
    assert.equal(atTop.handedOffToSpatial, true);
  });
});

describe('findNearestZone (magnetic viewport snap)', () => {
  it('snaps to the closest zone when resting mid-transition', () => {
    assert.equal(findNearestZone(-8350, SPATIAL_ZONES).id, 8);
    assert.equal(findNearestZone(-8650, SPATIAL_ZONES).id, 9);
    assert.equal(findNearestZone(-10, SPATIAL_ZONES).id, 0);
  });

  it('biases toward the next zone when user flings decisively downward', () => {
    const snapped = findNearestZone(-8220, SPATIAL_ZONES, -1);
    assert.equal(snapped.id, 9);
  });

  it('clamps Z positions within tunnel bounds', () => {
    assert.equal(clampZ(500), 0);
    assert.equal(clampZ(-12000), -9000);
  });
});

describe('computeZonePresentation (zero blur & crisp scale)', () => {
  it('never applies blur even during transitions', () => {
    for (const offset of [0, 50, 200, 450, 650]) {
      const p = computeZonePresentation(-8000 + offset, -8000);
      assert.equal(p.blurPx, 0);
    }
  });

  it('locks active snapped card at exact scale 1 and opacity 1', () => {
    const p = computeZonePresentation(-8010, -8000);
    assert.equal(p.active, true);
    assert.equal(p.scale, 1);
    assert.equal(p.opacity, 1);
    assert.equal(p.blurPx, 0);
  });
});
