import test from 'node:test'; import assert from 'node:assert/strict'; import fs from 'node:fs';
import { buildChapters } from '../tools/build_chapters.mjs';
import { PATH_STEPS, LAB_STAGE, cleanChapterSections, outpostBuilt, outpostReport } from '../src/navigation/outposts.js';
import { cleanExpeditionLists, setSolved } from '../src/navigation/expeditions.js';
import { cleanPassages } from '../src/navigation/passages.js';
import { AREAS } from '../src/scene/layout.js';
import { fresh } from '../src/store.js';

const json = p => JSON.parse(fs.readFileSync(new URL('../' + p, import.meta.url), 'utf8'));
const chapters = json('content/atlas/chapters.json'), sections = cleanChapterSections(chapters), lists = cleanExpeditionLists(json('content/atlas/expeditions.json')), passages = cleanPassages(json('content/atlas/passages.json'));
const modules = json('content/catalogue.json').modules.reduce((a, m) => (a[m.planetIndex] = m, a), []);
const report = (area, data) => outpostReport(area, modules, data, { lists, sections, passages });

test('Avamposti: il file delle sezioni è aggiornato e coincide con quello degli strumenti', () => {
    assert.deepEqual(chapters, buildChapters());
    assert.equal(Object.keys(sections).length, 100);
    assert.equal(Object.values(sections).reduce((s, x) => s + x.length, 0), 1554);
    for (const i of json('content/atlas/instruments.json').instruments) if (i.sections.length) assert.deepEqual(sections[i.unit], i.sections, i.unit);
    assert.deepEqual(cleanChapterSections({ schemaVersion: 2, units: chapters.units }), {});
    assert.equal(PATH_STEPS, 6); assert.equal(LAB_STAGE, 2);
});

test('Avamposti: i trenta avamposti coprono tutte le unità, le sezioni e le spedizioni', () => {
    const data = fresh(), all = AREAS.map((a, k) => report(k, data));
    assert.equal(all.length, 30);
    assert.equal(all.reduce((s, r) => s + r.units.length, 0), 125);
    const sum = key => all.reduce((s, r) => s + r.totals[key], 0);
    assert.deepEqual([sum('chapters'), sum('sections'), sum('available'), sum('exercises'), sum('done'), sum('solved')], [100, 1554, 325, 2078, 0, 0]);
    assert.ok(all.every(r => !r.built && r.routes.length === 0 && r.units.every(u => u.path.stage === 0 && !u.path.completed)));
    // Every passage has two ends, so the closed passages seen from the outposts are twice the passages.
    assert.equal(all.reduce((s, r) => s + r.closed, 0), 2 * passages.length);
});

test('Avamposti: la prima spedizione completata costruisce l’avamposto della sua area', () => {
    const data = fresh(), area = AREAS.findIndex(a => a.units.includes(modules.findIndex(m => m?.id === 'physics-30')));
    assert.equal(report(area, data).name, AREAS[area].name);
    for (const id of lists['physics-30'].base.slice(0, 5)) setSolved(data, 'physics-30', id, true);
    assert.equal(outpostBuilt(area, modules, data, lists), false);
    setSolved(data, 'physics-30', lists['physics-30'].base[5], true);
    assert.equal(outpostBuilt(area, modules, data, lists), true);
    const r = report(area, data);
    assert.equal(r.built, true); assert.equal(r.totals.done, 1); assert.equal(r.totals.solved, 6);
    assert.equal(AREAS.filter((a, k) => outpostBuilt(k, modules, data, lists)).length, 1);
});

test('Avamposti: capitoli, percorsi, esplorazione e rotte entrano nel riepilogo', () => {
    const data = fresh(), u = modules.findIndex(m => m?.id === 'biology-02'), area = AREAS.findIndex(a => a.units.includes(u));
    data.read.push('libro:biology-02#apertura', 'libro:biology-02#' + sections['biology-02'][1]);
    data.courses['biology-02'] = { stage: 3 };
    data.explore[String(u)] = { s: ['s0', 's1'], l: [], m: ['radiometro'], v: 1 };
    const r = report(area, data), unit = r.units.find(x => x.unit === 'biology-02');
    assert.deepEqual(unit.chapter, { read: 2, total: sections['biology-02'].length });
    assert.deepEqual(unit.path, { stage: 3, completed: false });
    assert.deepEqual(unit.explore, { measured: 1, landed: true, species: 2 });
    assert.deepEqual([r.totals.sectionsRead, r.totals.measured, r.totals.landed, r.totals.species], [2, 1, 1, 2]);
    // The read section of biology-02 opens its jump from its area (18) towards the area of math-c06 (2).
    assert.deepEqual([area, r.routes.find(p => p.id === '2-18')], [18, { id: '2-18', kind: 'salto', to: 2, name: AREAS[2].name }]);
    data.courses['biology-02'] = { stage: 5, completedAt: '2026-11-18T10:00:00.000Z', completionSignature: 'abcdef12' };
    assert.equal(report(area, data).units.find(x => x.unit === 'biology-02').path.completed, true);
});
