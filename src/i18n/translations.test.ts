import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { MODULAR_MODELS } from '../data/models.ts';
import { MODULAR_VIDEOS } from '../data/videos.ts';
import { CASE_STUDIES } from '../data/caseStudies.ts';
import { PRINT_TIERS } from '../data/printTiers.ts';
import {
  getCaseStudies,
  getInspectorData,
  getLocalizedZoneLabel,
  getPrintTiers,
  UI_DICTIONARY,
} from './translations.ts';

describe('EN & SW Bilingual Translations Completeness', () => {
  it('provides full Swahili and English UI dictionaries with matching structures', () => {
    assert.ok(UI_DICTIONARY.en.hero.headlineHighlight === 'BIG');
    assert.ok(UI_DICTIONARY.sw.hero.headlineHighlight === 'KUBWA');
    assert.equal(UI_DICTIONARY.en.quote.categoryOptions.length, 7);
    assert.equal(UI_DICTIONARY.sw.quote.categoryOptions.length, 7);
    assert.equal(UI_DICTIONARY.en.mediaStudio.archNotes.length, 4);
    assert.equal(UI_DICTIONARY.sw.mediaStudio.archNotes.length, 4);
  });

  it('localizes all 7 print tiers, 8 inspector entries, and 9 case studies cleanly into Swahili', () => {
    const tiersEn = getPrintTiers('en');
    const tiersSw = getPrintTiers('sw');
    assert.equal(tiersEn.length, PRINT_TIERS.length);
    assert.equal(tiersSw.length, PRINT_TIERS.length);
    for (let i = 0; i < tiersSw.length; i++) {
      assert.notEqual(tiersSw[i].title, tiersEn[i].title);
    }

    const inspectorEn = getInspectorData('en');
    const inspectorSw = getInspectorData('sw');
    assert.equal(Object.keys(inspectorSw).length, Object.keys(inspectorEn).length);
    assert.ok(inspectorSw.about.title.includes('KUBWA'));

    const casesEn = getCaseStudies('en');
    const casesSw = getCaseStudies('sw');
    assert.equal(casesSw.length, CASE_STUDIES.length);
    for (let i = 0; i < casesSw.length; i++) {
      assert.notEqual(casesSw[i].description, casesEn[i].description);
    }

    assert.ok(getLocalizedZoneLabel(0, '00 · We Think BIG', 'sw').includes('Tunafikiri KUBWA'));
  });
});

describe('Modular Video & 3D Model Registries (Zero-404 Poster Check)', () => {
  it('ensures every MODULAR_VIDEOS poster path exists in /public and models reference valid videos', () => {
    const publicRoot = path.resolve(process.cwd(), 'public');
    const videoIds = new Set(MODULAR_VIDEOS.map((v) => v.id));

    for (const vid of MODULAR_VIDEOS) {
      const clean = vid.poster.startsWith('/') ? vid.poster.slice(1) : vid.poster;
      const diskPath = path.join(publicRoot, clean);
      assert.ok(fs.existsSync(diskPath), `Missing video poster on disk: ${vid.poster}`);
    }

    for (const mod of MODULAR_MODELS) {
      if (mod.videoTextureId) {
        assert.ok(
          videoIds.has(mod.videoTextureId),
          `Model ${mod.id} references unknown videoTextureId ${mod.videoTextureId}`,
        );
      }
    }
  });
});
