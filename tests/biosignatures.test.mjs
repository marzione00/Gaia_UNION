import test from 'node:test'; import assert from 'node:assert/strict'; import fs from 'node:fs';
import { SIGNATURES, VERDICTS, OUTCOMES, REFERENCE_WORLDS, SOURCES, signatureOf, signatureText, diagnosis } from '../src/worlds/biosignatures.js';
import { planetPhysics, speciesCount, habitableEdges, physicsRows } from '../src/worlds/planet-physics.js';

const physics = planetPhysics(), count = f => physics.filter(f).length;

test('Lovelock: ogni pianeta ha una firma che segue famiglia, stella e atmosfera', () => {
    const tally = {};
    for (const p of physics) tally[signatureOf(p)] = (tally[signatureOf(p)] || 0) + 1;
    assert.deepEqual(tally, { 'ossigeno-metano': 65, 'metano-anidride': 18, vulcanica: 15, esosfera: 22, 'ossigeno-abiotico': 5 });
    // Abiotic oxygen only on dry planets of red dwarfs (Luger and Barnes 2015); no atmosphere, no reading.
    for (const p of physics) {
        if (signatureOf(p) === 'ossigeno-abiotico') { assert.equal(p.family, 'desert'); assert.equal(p.star.spt[0], 'M'); }
        if (p.family === 'barren') assert.equal(signatureOf(p), 'esosfera');
        assert.equal(signatureOf(p) === 'esosfera', p.exosphere);
    }
    assert.equal(signatureText(physics[0]), 'ossigeno e metano insieme, con azoto e acqua liquida; vita probabile');
});

test('Lovelock: la diagnosi dell’atmosfera si confronta con la superficie', () => {
    const outcomes = {};
    physics.forEach((p, i) => { const d = diagnosis(p, speciesCount(i), true); outcomes[d.outcome] = (outcomes[d.outcome] || 0) + 1; });
    assert.deepEqual(outcomes, { confermata: 83, superficie: 20, 'nessuna-vita': 18, 'falso-negativo': 4 });
    // A strong signature always has life below it; the four false negatives are dry planets without an atmosphere.
    physics.forEach((p, i) => {
        if (SIGNATURES[signatureOf(p)].verdict === 'probabile') assert.ok(speciesCount(i) > 0);
        if (diagnosis(p, speciesCount(i), true).outcome === 'falso-negativo') { assert.equal(p.family, 'desert'); assert.ok(p.exosphere); }
        assert.equal(diagnosis(p, speciesCount(i), false).outcome, 'da-verificare');
    });
    assert.equal(diagnosis({ exosphere: false, family: 'terrestrial', star: { spt: 'G2V' } }, 0, true).outcome, 'falso-positivo');
    for (const id of Object.keys(SIGNATURES)) assert.ok(VERDICTS[SIGNATURES[id].verdict]);
    assert.equal(Object.keys(OUTCOMES).length, 6);
});

test('Lovelock: i mondi di riferimento riportano i valori di Krissansen-Totton, Bergsman e Catling (2016)', () => {
    assert.deepEqual(REFERENCE_WORLDS.map(r => [r.name, r.phi]), [['Terra, atmosfera e oceano', 2326], ['Marte', 136], ['Terra, sola atmosfera', 1.5], ['Titano', 1.2], ['Venere', 0.06], ['Giove', 0.001]]);
    // «Circa 17 volte» in the Nucleo di Gaia: the atmosphere-ocean of the Earth against Mars.
    assert.equal(Math.round(2326 / 136), 17);
    assert.ok(REFERENCE_WORLDS.every((r, k) => !k || r.phi < REFERENCE_WORLDS[k - 1].phi));
    assert.equal(SOURCES.length, 6);
    for (const sg of Object.values(SIGNATURES)) for (const author of sg.source.split('; ')) assert.ok(SOURCES.some(s => s.startsWith(author.split(/[ ,]/)[0])), author);
});

test('Lovelock: la zona abitabile del computer di bordo è l’intervallo delle distanze', () => {
    for (const p of physics) {
        const [inner, outer] = habitableEdges(p.star);
        assert.ok(inner < outer);
        // S_outer ≤ L/d² ≤ S_inner, solved for d.
        assert.ok(Math.abs(p.star.luminosity / inner ** 2 - p.star.hz.inner) < 1e-9 && Math.abs(p.star.luminosity / outer ** 2 - p.star.hz.outer) < 1e-9);
        assert.equal(p.a >= inner && p.a <= outer, p.zone === 'abitabile');
    }
    const row = physicsRows(physics[30], 1)[0][1].find(r => r[0] === 'Zona abitabile');
    assert.equal(row[1], 'da 0,21 a 0,4 UA; il pianeta orbita più vicino del bordo interno');
    assert.equal(count(p => p.zone === 'abitabile') + count(p => p.zone !== 'abitabile'), 125);
});

test('Lovelock: i testi delle firme rispettano lo stile del sito', () => {
    const text = fs.readFileSync(new URL('../src/worlds/biosignatures.js', import.meta.url), 'utf8');
    const italian = [...text.matchAll(/'([^'\n]*[a-zà-ù][^'\n]*)'/g)].map(m => m[1]).filter(s => / /.test(s));
    assert.ok(italian.length > 20);
    for (const s of italian) {
        assert.doesNotMatch(s, /—/, s); assert.doesNotMatch(s, /\bnon (solo|soltanto)\b/i, s);
        assert.doesNotMatch(s, /\bnon\b[^.;:\n]{0,80}\bma\b/i, s); assert.doesNotMatch(s, /\bnon\b[^.;\n]{0,70}:/i, s); assert.doesNotMatch(s, /, e non /i, s);
    }
});
