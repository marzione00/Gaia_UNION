/** Writes docs/VARIETA_MONDI.md, the measures of variety of the zones of the landing sites (1.77.0): how far the
 * explorer is, from any point of dry land, from something new (a place to see or another biome), and how much the
 * 125 zones differ from each other: `node scripts/varieta.mjs`. tests/collaudo-mondi.test.mjs checks the file.
 * Since 1.78.0 the places to see include the minor places (src/worlds/finds.js). */
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { planetSurface } from '../src/worlds/surface.js';
import { prepareZone } from '../src/worlds/lander.js';
import { BIOME } from '../src/worlds/biomes.js';
import { SITE_KINDS } from '../src/worlds/sites.js';
import { RARE_KINDS } from '../src/worlds/wonders.js';
import { FIND_KINDS } from '../src/worlds/finds.js';
import { typologyOf } from '../src/worlds/architecture.js';
import { EDGE, METRE } from '../src/worlds/explorer.js';
import { PLANET_TYPES } from '../src/scene/planet-types.js';

/** Spacing of the points measured (metres), and the walks against which the distances are read. */
export const GRID = 50, NEAR = [300, 500];
const median = l => { const s = [...l].sort((a, b) => a - b); return s.length % 2 ? s[(s.length - 1) / 2] : (s[s.length / 2 - 1] + s[s.length / 2]) / 2; };
const quantile = (l, q) => { const s = [...l].sort((a, b) => a - b); return s[Math.min(s.length - 1, Math.floor(q * s.length))]; };
const dec = (v, d = 0) => v.toFixed(d).replace('.', ',');
/** A share as a percentage; a share just below 1 keeps one decimal, so it never reads as 100%. */
const pct = v => v < 1 && Math.round(v * 100) === 100 ? dec(Math.floor(v * 1000) / 10, 1) + '%' : dec(v * 100, 0) + '%';
/** «il 49%», «l’81%»: the article of a percentage read aloud. */
const cap = t => t[0].toUpperCase() + t.slice(1), thePct = v => { const n = Math.round(v * 100); return (n === 1 || n === 11 || String(n)[0] === '8' ? 'l’' : 'il ') + pct(v); };

/** The measures of planet i. The zone is covered by points GRID metres apart; on each point of dry land (no deeper
 * than half a unit of water) the distance to the nearest novelty is the smaller of the distance to the nearest
 * place to see (the base, a settlement, a place of the card, a site, a rare place, a minor place) and the
 * distance to the nearest point of another biome, from a chamfer distance over the points with a neighbour of
 * another biome. */
export function varietyOf(i) {
    const s = prepareZone(planetSurface(i)), step = GRID * METRE, n = Math.floor(2 * EDGE / step), at = k => -EDGE + (k + .5) * step;
    const st = s.stations, base = [st.reduce((a, q) => a + q.position[0], 0) / st.length, st.reduce((a, q) => a + q.position[2], 0) / st.length];
    const marks = [base, ...(s.settlements || []).map(t => [t.position[0], t.position[2]]), ...s.places.map(p => [p.position[0], p.position[2]]), ...s.sites.map(x => [x.x, x.z]), ...s.rares.map(x => [x.x, x.z]), ...s.finds.map(x => [x.x, x.z])];
    const ids = new Array(n * n), land = new Uint8Array(n * n);
    for (let j = 0; j < n; j++) for (let k = 0; k < n; k++) { const x = at(k), z = at(j), q = j * n + k; ids[q] = s.field.biomeAt(x, z).id; land[q] = s.seaY === null || s.heightAt(x, z) >= s.seaY - .5 ? 1 : 0; }
    // Chamfer distance (1 and √2 steps) from the points that touch another biome.
    const D = new Float64Array(n * n).fill(Infinity), r2 = Math.SQRT2;
    for (let j = 0; j < n; j++) for (let k = 0; k < n; k++) { const q = j * n + k; for (let dj = -1; dj <= 1 && D[q]; dj++) for (let dk = -1; dk <= 1; dk++) { const jj = j + dj, kk = k + dk; if ((dj || dk) && jj >= 0 && kk >= 0 && jj < n && kk < n && ids[jj * n + kk] !== ids[q]) { D[q] = 0; break; } } }
    const relax = (q, p, w) => { if (D[p] + w < D[q]) D[q] = D[p] + w; };
    for (let j = 0; j < n; j++) for (let k = 0; k < n; k++) { const q = j * n + k; if (k) relax(q, q - 1, 1); if (j) { relax(q, q - n, 1); if (k) relax(q, q - n - 1, r2); if (k < n - 1) relax(q, q - n + 1, r2); } }
    for (let j = n - 1; j >= 0; j--) for (let k = n - 1; k >= 0; k--) { const q = j * n + k; if (k < n - 1) relax(q, q + 1, 1); if (j < n - 1) { relax(q, q + n, 1); if (k < n - 1) relax(q, q + n + 1, r2); if (k) relax(q, q + n - 1, r2); } }
    const d = [], place = [], biomes = new Set();
    for (let j = 0; j < n; j++) for (let k = 0; k < n; k++) {
        const q = j * n + k; if (!land[q]) continue; biomes.add(ids[q]);
        const x = at(k), z = at(j); let m = Infinity; for (const [px, pz] of marks) m = Math.min(m, Math.hypot(px - x, pz - z));
        place.push(m / METRE); d.push(Math.min(m / METRE, D[q] * GRID));
    }
    const siteKinds = [...new Set(s.sites.map(x => x.kind))].sort(), rareKinds = [...new Set(s.rares.map(x => x.kind))].sort(), towns = s.settlements || [];
    const typology = typologyOf(s.genome, s.species.length), village = towns.some(t => t.kind === 'villaggio');
    const tokens = ['famiglia:' + s.genome.family, 'stile:' + s.genome.terrain.style, 'colonia:' + typology, 'villaggio:' + village, ...[...biomes].sort().map(b => 'bioma:' + b), ...siteKinds.map(k => 'sito:' + k), ...rareKinds.map(k => 'raro:' + k)];
    return { index: i, family: s.genome.family, style: s.genome.terrain.style, typology, land: d.length, points: n * n, biomes: [...biomes].sort(), sites: s.sites.length, siteKinds, rares: s.rares.length, rareKinds, finds: s.finds.length, settlements: towns.length, places: s.places.length, species: s.species.length + (s.endemics || []).length,
        median: median(d), p90: quantile(d, .9), max: Math.max(...d), within: NEAR.map(m => d.filter(v => v <= m).length / d.length), beyond: d.filter(v => v > NEAR[1]).length,
        place: { median: median(place), p90: quantile(place, .9), max: Math.max(...place), within: NEAR.map(m => place.filter(v => v <= m).length / place.length) }, tokens };
}
/** Similarity of two zones: shared features over all their features (Jaccard index of the tokens). */
export const similarity = (a, b) => { const A = new Set(a.tokens), B = new Set(b.tokens); let k = 0; for (const t of A) if (B.has(t)) k++; return k / (A.size + B.size - k); };
export const allVariety = () => Array.from({ length: 125 }, (_, i) => varietyOf(i));

/** The row of planet v in the table of the file. */
export const varietyRow = (v, titles) => `| ${v.index + 1}. ${titles[v.index]} | ${PLANET_TYPES[v.family].name} | ${v.biomes.length} | ${v.sites} (${v.siteKinds.length}) | ${v.rares} (${v.rareKinds.length}) | ${v.finds} | ${v.settlements} | ${v.species} | ${dec(v.place.median)} / ${dec(v.place.p90)} | ${dec(v.median)} / ${dec(v.p90)} | ${pct(v.within[0])} |`;
export function varietyMarkdown(data = allVariety(), titles = JSON.parse(fs.readFileSync(new URL('../content/catalogue.json', import.meta.url), 'utf8')).modules.map(m => m.title)) {
    const out = [], name = i => `«${titles[i]}» (pianeta ${i + 1})`, all = data.map(v => v.median), p90 = data.map(v => v.p90), worst = data.reduce((a, v) => v.p90 > a.p90 ? v : a);
    const pairs = []; for (let a = 0; a < data.length; a++) for (let b = a + 1; b < data.length; b++) pairs.push([similarity(data[a], data[b]), a, b]);
    pairs.sort((x, y) => y[0] - x[0]); const same = pairs.filter(p => p[0] === 1).length, top = pairs[0], signatures = new Set(data.map(v => v.tokens.slice().sort().join('|'))).size;
    const nb = data.map(v => v.biomes.length), ns = data.map(v => v.sites), nr = data.map(v => v.rares), nf = data.map(v => v.finds), within = k => data.reduce((a, v) => a + v.within[k] * v.land, 0) / data.reduce((a, v) => a + v.land, 0);
    out.push('# Varietà delle zone di atterraggio', '');
    out.push('Questo file è generato da `node scripts/varieta.mjs`; `tests/collaudo-mondi.test.mjs` controlla che corrisponda al codice.', '');
    out.push(`La serie «Mondi aperti» chiede zone in cui ogni 300-500 m si incontri qualcosa di nuovo e nessun pianeta somigli a un altro. Le due richieste si misurano così. La zona di 4 × 4 km di ogni pianeta è coperta da punti a ${GRID} m l’uno dall’altro; su ogni punto di terraferma si misura la distanza dalla novità più vicina, cioè il più vicino fra la base, gli insediamenti, i luoghi della carta, i siti, i luoghi rari e i luoghi minori, oppure il più vicino punto di un altro bioma, con una distanza a scacchiera sulla griglia. Per confrontare i pianeti, ogni zona è descritta dalla famiglia del pianeta, dallo stile del terreno, dal tipo di colonia, dalla presenza di un villaggio, dai biomi, dai tipi di sito e dai tipi di luogo raro; la somiglianza di due zone è la quota di queste caratteristiche che hanno in comune (indice di Jaccard). I luoghi minori restano fuori dal confronto, perché i loro sette tipi si ripetono su quasi ogni pianeta.`, '');
    out.push('## Una novità ogni poche centinaia di metri', '');
    const land = data.reduce((a, v) => a + v.land, 0), beyond = data.reduce((a, v) => a + v.beyond, 0), pm = data.map(v => v.place.median), pp = data.map(v => v.place.p90), pw = k => data.reduce((a, v) => a + v.place.within[k] * v.land, 0) / land;
    out.push(`I punti di terraferma dei 125 pianeti sono ${land.toLocaleString('it-IT')}. Il più vicino luogo da vedere (base, insediamento, luogo della carta, sito, luogo raro o luogo minore) è in mediana a ${dec(median(pm))} m, mediana delle mediane dei pianeti; il 90% dei punti di un pianeta ne ha uno entro ${dec(Math.min(...pp))}-${dec(Math.max(...pp))} m, in mediana entro ${dec(median(pp))} m. ${cap(thePct(pw(0)))} dei punti ha un luogo da vedere entro ${NEAR[0]} m e ${thePct(pw(1))} entro ${NEAR[1]} m.`, '');
    out.push(`Contando anche il passaggio a un altro bioma, la novità più vicina è in mediana a ${dec(median(all))} m; il 90% dei punti di un pianeta ne ha una entro ${dec(Math.min(...p90))}-${dec(Math.max(...p90))} m, in mediana entro ${dec(median(p90))} m. ${cap(thePct(within(0)))} dei punti ha una novità entro ${NEAR[0]} m e ${beyond ? `tutti tranne ${beyond.toLocaleString('it-IT')} entro ${NEAR[1]} m` : `tutti entro ${NEAR[1]} m`}. La zona più uniforme è quella di ${name(worst.index)}, dove il 90% dei punti ha una novità entro ${dec(worst.p90)} m e il punto più lontano da tutto dista ${dec(worst.max)} m.`, '');
    out.push(`Ogni zona ha da ${Math.min(...nb)} a ${Math.max(...nb)} biomi sulla terraferma (in mediana ${median(nb)}), da ${Math.min(...ns)} a ${Math.max(...ns)} siti costruiti, da ${Math.min(...nr)} a ${Math.max(...nr)} luoghi rari e da ${Math.min(...nf)} a ${Math.max(...nf)} luoghi minori (in mediana ${median(nf)}), oltre alla base, agli insediamenti e ai luoghi della carta.`, '');
    out.push('## Nessuna zona uguale a un’altra', '');
    out.push(`${signatures === data.length ? `Le descrizioni delle ${data.length} zone sono tutte diverse` : `Le ${data.length} zone hanno ${signatures} descrizioni diverse; ${same === 1 ? 'una coppia ha' : same + ' coppie hanno'} le stesse caratteristiche`}. La somiglianza fra due zone vale in mediana ${dec(median(pairs.map(p => p[0])), 2)}; la coppia più simile, ${name(top[1])} e ${name(top[2])}, condivide ${thePct(top[0])} delle caratteristiche. Anche le zone più simili differiscono nel rilievo, nei colori, nelle specie e nella posizione di ogni sito, perché ogni pianeta ha il proprio seme.`, '');
    out.push('## Pianeti', '', 'Distanze in metri: mediana e 90° percentile sui punti di terraferma del pianeta.', '', '| Pianeta | Famiglia | Biomi | Siti (tipi) | Luoghi rari (tipi) | Luoghi minori | Insediamenti | Specie | Luogo da vedere | Novità | Novità entro 300 m |', '|---|---|---:|---:|---:|---:|---:|---:|---|---|---:|');
    for (const v of data) out.push(varietyRow(v, titles));
    out.push('', '## Tipi', '', `I siti sono di ${Object.keys(SITE_KINDS).length} tipi, i luoghi rari di ${Object.keys(RARE_KINDS).length} e i luoghi minori di ${Object.keys(FIND_KINDS).length} (\`docs/LUOGHI_MINORI.md\`); i biomi della zona sono fra i ${Object.keys(BIOME).length} del catalogo dei biomi (\`docs/BIOMI.md\`).`, '');
    return out.join('\n');
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
    const data = allVariety(); fs.writeFileSync(new URL('../docs/VARIETA_MONDI.md', import.meta.url), varietyMarkdown(data));
    console.log('Scritto docs/VARIETA_MONDI.md: ' + data.length + ' pianeti');
}
