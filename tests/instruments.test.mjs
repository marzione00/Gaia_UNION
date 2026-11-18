import test from 'node:test'; import assert from 'node:assert/strict'; import fs from 'node:fs';
import { buildInstruments } from '../tools/build_instruments.mjs';
import { INSTRUMENTS, BASE_ROWS, SURFACE_ROWS, instrumentById, instrumentForRow, cleanInstrumentSections, obtainedBy, onBoard, sectionsLeft, explorerMode } from '../src/navigation/instruments.js';
import { planetPhysics, physicsRows, physicsText, speciesCount } from '../src/worlds/planet-physics.js';
import { fresh, cleanState, cleanExplore } from '../src/store.js';
import { resolveRoute } from '../src/routing.js';

const file = JSON.parse(fs.readFileSync(new URL('../content/atlas/instruments.json', import.meta.url), 'utf8')), sections = cleanInstrumentSections(file);
const modules = JSON.parse(fs.readFileSync(new URL('../content/catalogue.json', import.meta.url), 'utf8')).modules;

test('Strumenti: il file delle sezioni è aggiornato e ogni strumento viene da un’unità', () => {
    assert.deepEqual(file, buildInstruments());
    assert.equal(INSTRUMENTS.length, 8); assert.equal(Object.keys(sections).length, 8);
    // The onboard computer comes from a mathematics unit, which has a guided path and no chapter.
    for (const i of INSTRUMENTS) { assert.ok(modules.some(m => m.id === i.unit), i.unit); assert.ok(i.unit.startsWith('math-') ? sections[i.id].length === 0 : sections[i.id].length >= 12, i.id); assert.match(i.the, new RegExp(i.name + '$')); }
    assert.deepEqual(INSTRUMENTS.map(i => sections[i.id].length), [18, 0, 19, 12, 17, 17, 17, 15]);
    assert.equal(instrumentById('computer').unit, 'math-c05');
});

test('Strumenti: ogni riga della scheda fisica ha un solo strumento, salvo stella, orbita e vita', () => {
    const labels = new Set(planetPhysics().flatMap(p => physicsRows(p, 1).flatMap(([, rows]) => rows.map(r => r[0])))), free = l => BASE_ROWS.includes(l) || SURFACE_ROWS.includes(l);
    for (const l of labels) assert.equal(free(l) ? null : instrumentForRow(l)?.id ?? 'nessuno', free(l) ? null : INSTRUMENTS.find(i => i.rows.includes(l)).id, l);
    for (const l of SURFACE_ROWS) { assert.ok(labels.has(l)); assert.equal(instrumentForRow(l), null); }
    for (const i of INSTRUMENTS) for (const r of i.rows) { assert.ok(labels.has(r), r); assert.equal(INSTRUMENTS.filter(x => x.rows.includes(r)).length, 1); }
    // With the base sensors only, the card shows the star and the orbit and names the instrument for the rest.
    const p = planetPhysics()[7], reveal = l => BASE_ROWS.includes(l), rows = physicsRows(p, 6, reveal).flatMap(([, r]) => r);
    assert.deepEqual(rows.filter(r => !r[2]).map(r => r[0]), ['Stella', 'Orbita']);
    for (const r of rows.filter(r => r[2])) assert.equal(r[1], SURFACE_ROWS.includes(r[0]) ? 'da osservare scendendo in superficie' : 'da misurare con ' + instrumentForRow(r[0]).the);
    assert.match(physicsText(p, 6, reveal), /Temperatura: da misurare con il radiometro infrarosso\./);
    assert.match(physicsText(p, 6, reveal), /Zona abitabile: da misurare con il computer di bordo\. .*Firma atmosferica: da misurare con l’analizzatore di biofirme\. Vita: da osservare scendendo in superficie\./);
});

test('Strumenti: a bordo con il percorso completato o con tutte le sezioni del capitolo lette', () => {
    const data = fresh(), radiometer = INSTRUMENTS[0];
    assert.equal(onBoard(data, sections).size, 0);
    assert.deepEqual(sectionsLeft(radiometer, data, sections), { left: 18, total: 18 });
    for (const s of sections.radiometro.slice(0, 17)) data.read.push('libro:physics-30#' + s);
    assert.equal(obtainedBy(radiometer, data, sections), null);
    data.read.push('libro:physics-30#' + sections.radiometro[17]);
    assert.equal(obtainedBy(radiometer, data, sections), 'capitolo');
    data.courses['physics-33'] = { completedAt: '2026-11-18T08:00:00.000Z', completionSignature: 'abcdef12' };
    assert.equal(obtainedBy(instrumentById('magnetometro'), data, sections), 'percorso');
    data.courses['physics-34'] = { stage: 5 };
    assert.equal(obtainedBy(instrumentById('radar'), data, sections), null);
    assert.deepEqual([...onBoard(data, sections)], ['radiometro', 'magnetometro']);
    // Without a chapter, the computer comes on board with its guided path only.
    const computer = instrumentById('computer');
    assert.deepEqual(sectionsLeft(computer, data, sections), { left: 0, total: 0 });
    assert.equal(obtainedBy(computer, data, sections), null);
    data.courses['math-c05'] = { completedAt: '2026-11-18T09:00:00.000Z', completionSignature: '12abcdef' };
    assert.equal(obtainedBy(computer, data, sections), 'percorso');
    assert.deepEqual([...onBoard(data, sections)], ['radiometro', 'computer', 'magnetometro']);
    assert.deepEqual(cleanInstrumentSections({ schemaVersion: 2, instruments: file.instruments }), {});
});

test('Strumenti: modalità esploratore, misure nel diario e pianeti oltre il centesimo', () => {
    assert.equal(explorerMode(fresh()), true);
    const s = fresh(); s.preferences.explorer = false; assert.equal(explorerMode(cleanState(JSON.parse(JSON.stringify(s)))), false);
    assert.equal(cleanState({ schema: 1 }).preferences.explorer, true);
    const e = cleanExplore({ 7: { s: ['s0'] }, 120: { l: ['l1'], m: ['radar', 'sonar'] }, 124: { m: ['radiometro'] }, 125: { s: ['s1'] }, x: {} });
    assert.deepEqual(e, { 7: { s: ['s0'], l: [] }, 120: { s: [], l: ['l1'], m: ['radar'] }, 124: { s: [], l: [], m: ['radiometro'] } });
    // A landing alone is kept; other values of the flag are dropped.
    assert.deepEqual(cleanExplore({ 50: { v: 1 }, 51: { v: true }, 52: { v: 2, s: ['s2'] } }), { 50: { s: [], l: [], v: 1 }, 52: { s: ['s2'], l: [] } });
});

test('Strumenti: la nave ha un indirizzo proprio', () => {
    assert.equal(resolveRoute('#/ship?unit=physics-06', modules, ['math-c08', 'gaia']).scene, 'ship');
    assert.equal(resolveRoute('#/nave', modules, ['math-c08', 'gaia']).scene, 'ship');
    assert.equal(resolveRoute('#/gaia', modules, ['math-c08', 'gaia']).scene, 'gaia');
    assert.equal(resolveRoute('#/nucleo?unit=biology-33', modules, ['math-c08', 'gaia']).scene, 'gaia');
});
