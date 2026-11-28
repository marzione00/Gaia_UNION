/** Writes docs/LUOGHI_MINORI.md, the minor places of the zones of the landing sites (1.78.0), from the code of
 * src/worlds/finds.js and the surfaces of the 125 planets: `node scripts/minori.mjs`. tests/minori.test.mjs checks
 * that the file matches the code. */
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { planetSurface } from '../src/worlds/surface.js';
import { prepareZone } from '../src/worlds/lander.js';
import { FIND_KINDS, FIND_TARGET, FIND_STEP, MOST_FINDS, FIND_GAP, FIND_SEARCH, FIND_SCAN, MINERALS, marksOf } from '../src/worlds/finds.js';
import { FIND_MARK } from '../src/scene/world.js';
import { EDGE, METRE } from '../src/worlds/explorer.js';
import { PLANET_TYPES } from '../src/scene/planet-types.js';

const median = list => { const s = [...list].sort((a, b) => a - b); return s.length % 2 ? s[(s.length - 1) / 2] : (s[s.length / 2 - 1] + s[s.length / 2]) / 2; };
const pct = v => v < 1 && Math.round(v * 100) === 100 ? (Math.floor(v * 1000) / 10).toFixed(1).replace('.', ',') + '%' : Math.round(v * 100) + '%', thePct = v => { const n = Math.round(v * 100); return (n === 1 || n === 11 || String(n)[0] === '8' ? 'l’' : 'il ') + pct(v); };
/** Plural names of the kinds, for the rows of the planets. */
const PLURAL = { affioramento: ['vena', 'vene'], grotta: ['grotta', 'grotte'], meteorite: ['meteorite', 'meteoriti'], faro: ['faro', 'fari'], attrezzatura: ['trivella', 'trivelle'], cippo: ['cippo', 'cippi'], ossa: ['scheletro', 'scheletri'] };
/** What each kind is and what its description computes. */
const ABOUT = {
    affioramento: ['vena di un minerale fra due blocchi di roccia, con cristalli o croste', 'peso di 1 m³ del minerale, ρ · g · V, contro il peso sulla Terra'],
    grotta: ['ingresso ad arco in un dosso di roccia, con l’interno buio', 'temperatura all’interno vicina alla media della superficie'],
    meteorite: ['blocco di ferro e nichel mezzo sepolto in un anello di terra smossa', 'massa (densità 7800 kg/m³) ed energia cinetica ½ m v² alla velocità di fuga, in tonnellate di tritolo'],
    faro: ['traliccio con la lanterna, l’antenna, un pannello solare e tre tiranti', 'distanza dell’orizzonte √(2Rh) dalla lanterna'],
    attrezzatura: ['trivella su treppiede con l’argano, le casse dei campioni, i tubi e un pannello caduto', 'luce della stella sul pianeta, 1361 W/m² per il flusso relativo, e potenza di un pannello di 2 m²'],
    cippo: ['cumulo di pietre a secco con la targa del primo equipaggio', 'periodo di un pendolo lungo 1 m, 2π√(L/g), e la gravità che se ne ricava'],
    ossa: ['spina dorsale, costole, cranio e ossa delle zampe di un grande animale', 'legge del quadrato e del cubo e peso che le ossa reggono con la gravità del pianeta']
};
/** The minor places of every planet, in planet order, with the distance of each point of dry land from the nearest
 * place to see without them and with them (metres, points FIND_STEP metres apart). */
export function allFinds() {
    return Array.from({ length: 125 }, (_, i) => {
        const s = prepareZone(planetSurface(i)), step = FIND_STEP * METRE, n = Math.floor(2 * EDGE / step), at = k => -EDGE + (k + .5) * step;
        const marks = marksOf(s), extra = s.finds.map(x => [x.x, x.z]), before = [], after = [];
        for (let j = 0; j < n; j++) for (let k = 0; k < n; k++) {
            const x = at(k), z = at(j); if (s.seaY !== null && s.heightAt(x, z) < s.seaY - .5) continue;
            let d = Infinity; for (const [px, pz] of marks) d = Math.min(d, Math.hypot(px - x, pz - z));
            let e = d; for (const [px, pz] of extra) e = Math.min(e, Math.hypot(px - x, pz - z));
            before.push(d / METRE); after.push(e / METRE);
        }
        return { family: s.genome.family, finds: s.finds, before, after };
    });
}
/** The row of planet i in the list of the file. */
export function findsRow(d, i, titles) {
    const by = Object.keys(FIND_KINDS).map(k => [k, d.finds.filter(x => x.kind === k)]).filter(([, l]) => l.length);
    const parts = by.map(([k, l]) => `${l.length} ${PLURAL[k][l.length === 1 ? 0 : 1]}` + (k === 'affioramento' ? ` (${[...new Set(l.map(x => x.mineral))].join(', ')})` : ''));
    return `- **${titles[i]}** (pianeta ${i + 1}, ${PLANET_TYPES[d.family].name.toLowerCase()}): ${d.finds.length} luoghi minori, ${parts.join(', ')}.`;
}
export function findsMarkdown(data = allFinds(), titles = JSON.parse(fs.readFileSync(new URL('../content/catalogue.json', import.meta.url), 'utf8')).modules.map(m => m.title)) {
    const all = data.flatMap(d => d.finds), counts = data.map(d => d.finds.length), out = [], land = data.reduce((a, d) => a + d.after.length, 0);
    const share = (key, m) => data.reduce((a, d) => a + d[key].filter(v => v <= m).length, 0) / land, q90 = l => { const s = [...l].sort((a, b) => a - b); return s[Math.min(s.length - 1, Math.floor(.9 * s.length))]; };
    const far = key => data.filter(d => q90(d[key]) > 800).length, full = counts.filter(c => c === MOST_FINDS).length;
    out.push('# Luoghi minori delle zone di atterraggio', '');
    out.push('Questo file è generato da `node scripts/minori.mjs` a partire da `src/worlds/finds.js`; `tests/minori.test.mjs` controlla che corrisponda al codice.', '');
    out.push(`Dalla versione 1.78.0 la zona di atterraggio di ogni pianeta ospita da ${Math.min(...counts)} a ${Math.max(...counts)} luoghi minori, in mediana ${median(counts)}: in tutto ${all.length.toLocaleString('it-IT')} sui 125 pianeti, di ${Object.keys(FIND_KINDS).length} tipi. Sono vene di minerale, ingressi di grotte, meteoriti, fari di navigazione della colonia, trivelle abbandonate, cippi della prima spedizione e scheletri di grandi animali, questi soltanto sui pianeti con animali dotati di ossa, cioè con forme diverse dalle meduse galleggianti.`, '');
    out.push(`I luoghi minori riempiono le parti della zona più lontane da tutto il resto. La zona è coperta da punti a ${FIND_STEP} m l’uno dall’altro; per ogni punto di terraferma si calcola la distanza dal luogo da vedere più vicino (la base, gli insediamenti, i luoghi della carta, i siti e i luoghi rari), e il luogo minore successivo va sul punto più lontano, oppure sul posto adatto più vicino a quel punto entro ${Math.round(FIND_SEARCH / METRE)} m: asciutto, quasi in piano, fuori dal quadrato delle stazioni e lontano dai siti, dai luoghi rari, dalla piazzola, dagli edifici e dagli altri luoghi minori, almeno ${Math.round(FIND_GAP / METRE)} m. Il calcolo si ferma quando nessun punto di terraferma è più lontano di ${FIND_TARGET} m da un luogo da vedere o quando i luoghi minori sono ${MOST_FINDS}; ${full} pianeti arrivano a ${MOST_FINDS}.`, '');
    out.push(`Senza i luoghi minori ${thePct(share('before', 300))} dei punti di terraferma ha un luogo da vedere entro 300 m e ${thePct(share('before', 500))} entro 500 m; con i luoghi minori le quote diventano ${thePct(share('after', 300))} e ${thePct(share('after', 500))}. Le zone in cui il 90% dei punti ha il luogo da vedere più vicino oltre 800 m passano da ${far('before')} a ${far('after')}: i punti rimasti lontani sono soprattutto bassure e secche al livello del mare, che la misura conta come terraferma fino a mezza unità sotto l’acqua e dove nessun luogo minore trova un posto asciutto.`, '');
    out.push(`Un luogo minore raggiunto a piedi conta come scoperto, come uno rilevato dall’impulso dello scanner, che arriva a ${Math.round(FIND_SCAN / METRE)} m per i luoghi minori e a 1,3 km per i siti e i luoghi rari; la bussola e la mappa della zona mostrano quelli scoperti, e la mappa offre il viaggio rapido fino a loro. Lo scanner ne registra la descrizione nel diario. Sulla scena un luogo minore ha un indicatore soltanto quando è la voce scelta, e il suo nome compare entro ${Math.round(FIND_MARK / METRE)} m dalla camera.`, '');
    out.push('## Tipi di luogo minore', '', '| Tipo | Modello | Calcolo della descrizione | Pianeti | Luoghi |', '|---|---|---|---:|---:|');
    for (const [k, v] of Object.entries(FIND_KINDS)) out.push(`| ${v.label[0].toUpperCase() + v.label.slice(1)} | ${ABOUT[k][0]} | ${ABOUT[k][1]} | ${data.filter(d => d.finds.some(x => x.kind === k)).length} | ${all.filter(x => x.kind === k).length} |`);
    out.push('');
    out.push(`Le vene sono di minerali diversi secondo la famiglia del pianeta: ${Object.keys(MINERALS).map(m => `${m} (${MINERALS[m].rho.toLocaleString('it-IT')} kg/m³)`).join(', ')}. Quarzo e gesso formano cristalli prismatici lunghi da 25 a 60 cm, pirite e magnetite cristalli cubici larghi da 6 a 15 cm, gli altri croste e noduli. Le rocce, le vene, i meteoriti e le ossa sono illuminati come il terreno, con la sua grana; i fari, le trivelle e le targhe come gli scafi.`, '');
    out.push('## Esempio: i luoghi minori del primo pianeta', '');
    for (const x of data[0].finds) out.push(`- **${x.name}** (${FIND_KINDS[x.kind].label}). ${x.story.join(' ')}`);
    out.push('', '## Luoghi minori dei pianeti', '');
    data.forEach((d, i) => out.push(findsRow(d, i, titles)));
    out.push('');
    return out.join('\n');
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
    fs.writeFileSync(new URL('../docs/LUOGHI_MINORI.md', import.meta.url), findsMarkdown());
    console.log('docs/LUOGHI_MINORI.md scritto.');
}
