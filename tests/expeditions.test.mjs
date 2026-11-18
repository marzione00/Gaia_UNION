import test from 'node:test'; import assert from 'node:assert/strict'; import fs from 'node:fs';
import { buildExpeditions } from '../tools/build_expeditions.mjs';
import { EXPEDITIONS, SOLVED_MAX, cleanSolved, cleanExpeditionLists, expeditionProgress, expeditionTotals, setSolved, solvedKey } from '../src/navigation/expeditions.js';
import { fresh, cleanState } from '../src/store.js';
import { parseChapter } from '../src/book/markdown.js';

const file = JSON.parse(fs.readFileSync(new URL('../content/atlas/expeditions.json', import.meta.url), 'utf8')), lists = cleanExpeditionLists(file);
const read = p => fs.readFileSync(new URL('../' + p, import.meta.url), 'utf8');

test('Spedizioni: il file è aggiornato e copre i 125 pianeti', () => {
    assert.deepEqual(file, buildExpeditions());
    const units = Object.values(lists), book = units.filter(u => !u.questions), paths = units.filter(u => u.questions);
    assert.equal(units.length, 125); assert.equal(book.length, 100); assert.equal(paths.length, 25);
    assert.deepEqual(EXPEDITIONS.map(x => book.reduce((s, u) => s + u[x.level].length, 0)), [680, 684, 564]);
    assert.ok(paths.every(u => u.questions.length === 6));
    // Every exercise of a chapter is in exactly one expedition, at its own level.
    for (const c of JSON.parse(read('content/libro/index.json')).capitoli) {
        const ex = parseChapter(read(c.file)).exercises, e = lists[c.unit];
        assert.equal(EXPEDITIONS.reduce((s, x) => s + e[x.level].length, 0), ex.length, c.unit);
        for (const x of ex) assert.ok(e[x.level].includes(x.id), c.unit + ' ' + x.id);
    }
    assert.deepEqual(cleanExpeditionLists({ schemaVersion: 2, units: file.units }), {});
});

test('Spedizioni: gli esercizi segnati come risolti completano le spedizioni di un capitolo', () => {
    const data = fresh(), base = lists['physics-30'].base;
    let p = expeditionProgress('physics-30', data, lists);
    assert.deepEqual(p.map(x => [x.place, x.kind, x.solved, x.total, x.done]), [['orbita', 'libro', 0, 6, false], ['superficie', 'libro', 0, 6, false], ['profondità', 'libro', 0, 4, false]]);
    assert.equal(p[0].next, base[0]);
    for (const id of base.slice(0, 5)) assert.equal(setSolved(data, 'physics-30', id, true), true);
    assert.equal(setSolved(data, 'physics-30', base[0], true), false);
    p = expeditionProgress('physics-30', data, lists);
    assert.equal(p[0].solved, 5); assert.equal(p[0].done, false); assert.equal(p[0].next, base[5]);
    setSolved(data, 'physics-30', base[5], true);
    p = expeditionProgress('physics-30', data, lists);
    assert.equal(p[0].done, true); assert.equal(p[0].next, null); assert.equal(p[1].done, false);
    // Undoing a mark reopens the expedition; a malformed exercise id is refused.
    assert.equal(setSolved(data, 'physics-30', base[2], false), true);
    assert.equal(expeditionProgress('physics-30', data, lists)[0].done, false);
    assert.equal(setSolved(data, 'physics-30', 'Esercizio 1', true), false);
    assert.equal(data.solved.length, 5);
});

test('Spedizioni: le unità di matematica usano le domande del percorso guidato', () => {
    const data = fresh(), qs = lists['math-c05'].questions;
    data.courses['math-c05'] = { answers: Object.fromEntries(qs.map(q => [q.id, q.correct])) };
    let p = expeditionProgress('math-c05', data, lists);
    assert.deepEqual(p.map(x => [x.kind, x.solved, x.total, x.done]), [['percorso', 6, 6, true], ['attesa', 0, 0, false], ['attesa', 0, 0, false]]);
    data.courses['math-c05'].answers[qs[0].id] = qs[0].correct === 'A' ? 'B' : 'A';
    p = expeditionProgress('math-c05', data, lists);
    assert.equal(p[0].solved, 5); assert.equal(p[0].done, false);
    const t = expeditionTotals(data, lists);
    assert.deepEqual(t, { available: 325, done: 0, solved: 5, total: 2078, planets: 0 });
});

test('Spedizioni: il salvataggio conserva soltanto chiavi valide', () => {
    assert.deepEqual(cleanSolved(['physics-30#esercizio-1', 'physics-30#esercizio-1', 'math-c05#esercizio-2', 'x', 7, 'physics-30#<script>']), ['physics-30#esercizio-1', 'math-c05#esercizio-2']);
    assert.equal(cleanSolved(Array.from({ length: SOLVED_MAX + 10 }, (_, i) => 'physics-01#esercizio-' + i)).length, SOLVED_MAX);
    const s = fresh(); s.solved = [solvedKey('biology-33', 'esercizio-4')];
    assert.deepEqual(cleanState(JSON.parse(JSON.stringify(s))).solved, ['biology-33#esercizio-4']);
    assert.deepEqual(cleanState({ schema: 1 }).solved, []);
});

test('Spedizioni: i testi rispettano lo stile del sito', () => {
    const texts = [read('src/navigation/expeditions.js'), read('src/book/reader.js')].join('\n');
    const italian = [...texts.matchAll(/'([^'\n]*[a-zà-ù][^'\n]*)'/g)].map(m => m[1]).filter(s => / /.test(s) && /[àèéìòù’]|\b(di|in|il|la|le|gli|del|della|dopo|con)\b/.test(s));
    assert.ok(italian.length >= 6, italian.length);
    for (const s of italian) {
        assert.doesNotMatch(s, /—/, s); assert.doesNotMatch(s, /\bnon (solo|soltanto)\b/i, s);
        assert.doesNotMatch(s, /\bnon\b[^.;:\n]{0,80}\bma\b/i, s); assert.doesNotMatch(s, /\bnon\b[^.;\n]{0,70}:/i, s); assert.doesNotMatch(s, /, e non /i, s);
    }
});
