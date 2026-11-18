import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { estimatePrintQuote } from './printTiers.ts';
import {
  CASE_STUDIES,
  CLIENT_LOGOS,
  OTHER_CUSTOMERS_WALL,
  PDF_SPREADS,
  PROFILE_VISUALS,
} from './caseStudies.ts';

describe('estimatePrintQuote', () => {
  it('computes scaled TZS & USD ranges cleanly with volume discounts', () => {
    const small = estimatePrintQuote('Giant & Large-Format Printing', 'Matte / Velvet Lamination', 10, 'USD');
    const large = estimatePrintQuote('Giant & Large-Format Printing', 'Matte / Velvet Lamination', 2500, 'TZS');
    assert.ok(small.lowUSD >= 30);
    assert.ok(small.highUSD > small.lowUSD);
    assert.ok(small.formatted.includes('USD'));
    assert.ok(large.formatted.startsWith('TZS '));
  });

  it('applies metallic foil surcharge over standard matte lamination', () => {
    const matte = estimatePrintQuote('Small & Micro-Format Printing', 'Matte / Velvet Lamination', 1000, 'USD');
    const foil = estimatePrintQuote('Small & Micro-Format Printing', '24K Metallic Foil + Emboss', 1000, 'USD');
    assert.ok(foil.lowUSD > matte.lowUSD);
  });
});

describe('Case Studies & Complete PDF Visual Coverage (Zero-404 Check)', () => {
  it('verifies every single referenced image path exists in /public', () => {
    const publicRoot = path.resolve(process.cwd(), 'public');
    const allPaths: string[] = [];

    for (const cs of CASE_STUDIES) {
      allPaths.push(cs.cover);
      if (cs.logo) allPaths.push(cs.logo);
      for (const img of cs.images) allPaths.push(img.src);
    }
    for (const logo of CLIENT_LOGOS) allPaths.push(logo.src);
    for (const tile of OTHER_CUSTOMERS_WALL) allPaths.push(tile.src);
    for (const pv of PROFILE_VISUALS) allPaths.push(pv.src);
    for (const spread of PDF_SPREADS) allPaths.push(spread.src);

    assert.equal(CLIENT_LOGOS.length, 19);
    assert.equal(OTHER_CUSTOMERS_WALL.length, 22);
    assert.equal(PDF_SPREADS.length, 20);

    for (const rel of allPaths) {
      const clean = rel.startsWith('/') ? rel.slice(1) : rel;
      const diskPath = path.join(publicRoot, clean);
      assert.ok(fs.existsSync(diskPath), `Missing public asset on disk: ${rel}`);
    }
  });
});
