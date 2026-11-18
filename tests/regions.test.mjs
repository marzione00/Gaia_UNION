import test from 'node:test'; import assert from 'node:assert/strict'; import fs from 'node:fs';
import { ARM_NAMES, ARM_SKIES, armAreas, armCloud, regionReport } from '../src/navigation/regions.js';
import { SYNTHESIS_WORLDS, SYNTHESIS_IDS, SUN_AGE, youngSun, modelRows, modelText, cleanVisited } from '../src/worlds/synthesis.js';
import { REFERENCE_WORLDS } from '../src/worlds/biosignatures.js';
import { CALIBRATION } from '../src/worlds/physics.js';
import { cleanAtlas } from '../src/navigation/atlas-model.js';
import { cleanExpeditionLists } from '../src/navigation/expeditions.js';
import { cleanChapterSections } from '../src/navigation/outposts.js';
import { cleanPassages } from '../src/navigation/passages.js';
import { fresh } from '../src/store.js';

const json = p => JSON.parse(fs.readFileSync(new URL('../' + p, import.meta.url), 'utf8'));
const opts = { lists: cleanExpeditionLists(json('content/atlas/expeditions.json')), sections: cleanChapterSections(json('content/atlas/chapters.json')), passages: cleanPassages(json('content/atlas/passages.json')) };
const modules = json('content/catalogue.json').modules.reduce((a, m) => (a[m.planetIndex] = m, a), []);

test('Regioni: quattro bracci con le loro aree, le loro nubi e tutti i passaggi', () => {
    const all = [0, 1, 2, 3].map(k => regionReport(k, modules, fresh(), opts));
    assert.deepEqual(all.map(r => r.name), ARM_NAMES);
    assert.deepEqual(all.map(r => [r.totals.areas, r.totals.units]), [[6, 25], [9, 40], [6, 25], [9, 35]]);
    assert.deepEqual(all.map(r => r.cloud.family), ['Ammasso aperto', 'Nube a riflessione', 'Polveri interstellari', 'Formazione stellare']);
    assert.ok(all.every(r => armAreas(r.sector).length === r.areas.length && r.sky === ARM_SKIES[r.sector]));
    // Lanes stay inside one arm, jumps join two: together they are the 147 passages of the map.
    const lanes = all.reduce((s, r) => s + r.lanes.total, 0), jumps = all.reduce((s, r) => s + r.jumps.total, 0);
    assert.deepEqual([lanes, jumps / 2, lanes + jumps / 2], [78, 69, opts.passages.length]);
    assert.equal(armCloud(0).share, Math.max(...[0, 1, 2, 3].map(k => armCloud(k).share)));
});

test('Regioni: una sezione letta apre una porta di salto verso un altro braccio', () => {
    const data = fresh();
    data.read.push('libro:biology-02#apertura');
    const bio = regionReport(3, modules, data, opts), math = regionReport(0, modules, data, opts);
    assert.deepEqual(bio.jumps.open.map(p => [p.id, p.sector]), [['2-18', 0]]);
    assert.deepEqual(math.jumps.open.map(p => [p.id, p.sector]), [['2-18', 3]]);
    assert.equal(bio.totals.sectionsRead, 1);
});

test('Sintesi: il Sole giovane segue la formula di Gough', () => {
    assert.equal(SUN_AGE, 4.57); assert.equal(youngSun(0), 1);
    assert.ok(Math.abs(youngSun(SUN_AGE) - 1 / 1.4) < 1e-12);
    // 75 and 82 per cent between 3.8 and 2.5 billion years ago, as the card of the Archean says.
    assert.equal(Math.round(youngSun(3.8) * 100), 75); assert.equal(Math.round(youngSun(2.5) * 100), 82);
    const [late, early] = modelRows('archeano');
    assert.ok(early.todayTs < 273 && late.todayTs > 273, 'con l’effetto serra di oggi la Terra dell’Archeano gela soltanto all’inizio');
    assert.ok(early.freezingTau > early.todayTau);
    assert.match(modelText('archeano'), /almeno 1,00, più di oggi/); assert.match(modelText('archeano'), /profondità ottica 0,83/);
});

test('Sintesi: i dati dei mondi coincidono con le schede NASA e con i valori dello squilibrio', () => {
    const [venus, mars] = SYNTHESIS_WORLDS, row = (w, l) => w.rows.find(r => r[0] === l)[1];
    assert.deepEqual(SYNTHESIS_IDS, ['venere', 'marte', 'archeano']);
    assert.match(row(venus, 'Pressione al suolo'), new RegExp('^' + CALIBRATION.venus.p + ' bar'));
    assert.match(row(venus, 'Temperatura media'), new RegExp('^' + CALIBRATION.venus.ts + ' K'));
    assert.match(row(mars, 'Pressione al suolo'), /^0,00636 bar/); assert.equal(CALIBRATION.mars.p, .00636);
    assert.match(row(venus, 'Luce del Sole'), /1,91 volte/); assert.equal((CALIBRATION.venus.irradiance / 1361).toFixed(2), '1.91');
    assert.match(row(mars, 'Luce del Sole'), /0,43 volte/); assert.equal((CALIBRATION.mars.irradiance / 1361).toFixed(2), '0.43');
    const ref = Object.fromEntries(REFERENCE_WORLDS.map(r => [r.name, r.phi]));
    assert.equal(row(venus, 'Squilibrio chimico'), String(ref.Venere).replace('.', ',') + ' J/mol');
    assert.equal(row(mars, 'Squilibrio chimico'), ref.Marte + ' J/mol');
    assert.match(modelText('venere'), /profondità ottica di 148/);
    assert.deepEqual(cleanVisited(['marte', 'giove', 'venere']), ['venere', 'marte']);
    assert.deepEqual(cleanAtlas({ version: 2, core: ['archeano', 'x'] }).core, ['archeano']);
});

test('Regioni e sintesi: i testi rispettano lo stile del sito', () => {
    const text = ['src/navigation/regions.js', 'src/worlds/synthesis.js'].map(p => fs.readFileSync(new URL('../' + p, import.meta.url), 'utf8')).join('\n');
    const italian = [...text.matchAll(/['`]([^'`\n]*[a-zà-ù][^'`\n]*)['`]/g)].map(m => m[1]).filter(s => / /.test(s) && /[àèéìòù’]|\b(di|il|la|le|del|della|con)\b/.test(s));
    assert.ok(italian.length > 12, italian.length);
    for (const s of italian) {
        assert.doesNotMatch(s, /—/, s); assert.doesNotMatch(s, /\bnon (solo|soltanto)\b/i, s);
        assert.doesNotMatch(s, /\bnon\b[^.;:\n]{0,80}\bma\b/i, s); assert.doesNotMatch(s, /\bnon\b[^.;\n]{0,70}:/i, s); assert.doesNotMatch(s, /, e non /i, s);
    }
});
