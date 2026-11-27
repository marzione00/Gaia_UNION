/** Writes docs/BIOMI.md, the biomes of the zones of the landing sites (1.71.0) and their life (1.72.0), from
 * the code of src/worlds/biomes.js, src/worlds/species.js and src/worlds/zone-life.js and the fields of the 125
 * planets: `node scripts/biomi.mjs`. tests/biomi.test.mjs checks that the file matches the code. */
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { planetCards } from '../src/worlds/genome.js';
import { surfaceField } from '../src/worlds/field.js';
import { LANDING_SITES } from '../src/worlds/landing-sites.js';
import { BIOMES, BIOME, STYLE_BIOME, LIFE, BASE_LIFE, planetBiomes, conditionOf, biomeWeight, SPACING, BLEND, INNER, OUTER, MIN_CELLS, CHUNK } from '../src/worlds/biomes.js';
import { planetSpecies, planetEndemics } from '../src/worlds/surface.js';
import { FORMS, FLIGHT_DENSITY as FLIGHT } from '../src/worlds/species.js';
import { PLANTS_MOST, GROUP_SHARE, ENDEMIC_WEIGHT } from '../src/worlds/zone-life.js';
import { EDGE, METRE } from '../src/worlds/explorer.js';
import { PLANET_TYPES } from '../src/scene/planet-types.js';
import { STYLE_NAMES } from '../src/worlds/genome.js';

const FAMILIES = ['terrestrial', 'oceanic', 'desert', 'barren', 'arctic', 'volcanic'];
const metres = u => Math.round(u / METRE), median = list => { const s = [...list].sort((a, b) => a - b); return s.length % 2 ? s[(s.length - 1) / 2] : (s[s.length / 2 - 1] + s[s.length / 2]) / 2; };
const inZone = c => Math.abs(c.x) <= EDGE && Math.abs(c.z) <= EDGE;

/** For each planet: the cells of each biome in the zone, and the walk along eight straight lines from the base
 * to the edge of the zone, in steps of 4 units: where the first biome other than the base's begins, and how far
 * apart the later changes of biome are. */
export function survey(cards = planetCards()) {
    return cards.map((g, i) => {
        const F = surfaceField(g, LANDING_SITES[i]), B = F.biomes(), cells = B.ids.map((_, t) => B.zone.filter(c => inZone(c) && c.t === t).length), first = [], gaps = [];
        for (let k = 0; k < 8; k++) {
            const a = k * Math.PI / 4 + .3, top = EDGE / Math.max(Math.abs(Math.cos(a)), Math.abs(Math.sin(a)));
            let was = 0, at = null;
            for (let d = 4; d <= top; d += 4) {
                const x = Math.cos(a) * d, z = Math.sin(a) * d, t = biomeWeight(d) < .5 ? 0 : B.at(x, z);
                if (t !== was) { if (at === null) first.push(d); else gaps.push(d - at); at = d; was = t; }
            }
        }
        return { ids: B.ids, cells, first, gaps };
    });
}

export function biomesMarkdown(cards = planetCards(), titles = JSON.parse(fs.readFileSync(new URL('../content/catalogue.json', import.meta.url), 'utf8')).modules.map(m => m.title), data = survey(cards)) {
    const lists = planetBiomes(), out = [], sizes = lists.map(l => l.length), count = n => sizes.filter(s => s === n).length;
    out.push('# Biomi delle zone di atterraggio', '');
    out.push('Questo file è generato da `node scripts/biomi.mjs` a partire da `src/worlds/biomes.js`; `tests/biomi.test.mjs` controlla che corrisponda al codice.', '');
    out.push(`Dalla versione 1.71.0 la zona di atterraggio di ogni pianeta, un quadrato di circa ${(2 * EDGE / METRE / 1000).toFixed(1).replace('.', ',')} km di lato, è un mosaico di biomi. Ogni pianeta ne ha da cinque a otto (${count(5)} pianeti ne hanno cinque, ${count(6)} sei, ${count(7)} sette e ${count(8)} otto), scelti fra i ${BIOMES.length} tipi del catalogo che appartengono alla sua famiglia e che la sua fisica consente: le foreste richiedono un’aria densa, le paludi e le lagune mari estesi, i campi di crateri dei deserti un’aria sottile, che frena poco i meteoriti e cancella lentamente i bordi. Il primo bioma di ogni elenco è quello dello stile del terreno del pianeta, che resta il terreno intorno alla base. Due pianeti non hanno mai lo stesso insieme di biomi.`, '');
    out.push('## Come nasce la carta dei biomi', '');
    out.push(`La zona è divisa in celle di Voronoi intorno a punti distanti ${SPACING} unità (${metres(SPACING)} m), spostati a caso fino a 0,35 della distanza. Ogni cella prende un bioma dall’altezza, dalla pendenza e dalla vicinanza del mare nella mappa del pianeta, con una quota di caso: le paludi preferiscono le terre basse vicine al mare, i gradoni e le mesa le alture, i canyon e i campi di massi i pendii. Ogni bioma del pianeta occupa almeno ${MIN_CELLS} celle della zona e nessuno più di tre decimi; le celle entro 330 unità dalla base hanno il bioma dello stile del pianeta. Fra due celle il terreno passa da un bioma all’altro su circa ${BLEND} unità (${metres(BLEND)} m).`, '');
    out.push(`Un bioma ha forme proprie, uno stile di terreno di \`src/worlds/terrain.js\` con un suo seme, una sua scala e un suo rilievo, oppure un bacino spianato verso il mare o verso il fondo della cella; i coni, i crateri e gli anelli si ripetono su una griglia di tessere che copre tutta la zona. Ha poi colori propri della roccia, della vegetazione e della neve, e rocce proprie: massi, lastre e guglie, generati a gruppi di ${CHUNK} × ${CHUNK} unità intorno alla camera. I mari, le coste e i fondali restano quelli della mappa del pianeta. Il quadrato delle stazioni conserva il terreno delle versioni precedenti fino a ${INNER} unità dalla base, e i biomi prendono il posto delle forme locali fra ${INNER} e ${OUTER} unità (${metres(INNER)} e ${metres(OUTER)} m).`, '');
    out.push('Nella colonna del rilievo l’altezza fra il 1° e il 99° percentile delle forme del bioma, in metri, per un pianeta di rilievo medio; le rocce sono quelle attese in un gruppo di 64 × 64 unità tutto nel bioma.', '');
    out.push(`## Tipi di bioma (${BIOMES.length})`, '');
    for (const f of FAMILIES) {
        const planets = cards.filter(g => g.family === f).length;
        out.push(`### ${PLANET_TYPES[f].name} (${planets} pianeti)`, '', '| Bioma | Descrizione | Condizioni | Rilievo | Rocce | Pianeti |', '|---|---|---|---:|---:|---:|');
        for (const b of BIOMES.filter(b => b.families.includes(f))) {
            const n = cards.filter((g, i) => g.family === f && lists[i].includes(b.id)).length, style = Object.keys(STYLE_BIOME).find(k => STYLE_BIOME[k] === b.id), own = style ? ` Terreno proprio dei pianeti di stile «${STYLE_NAMES[style]}».` : '';
            out.push(`| ${b.name} | ${b.about}${own} | ${conditionOf(b)} | ${b.base ? 'dello stile' : metres(b.relief) + ' m'} | ${b.rocks[0]} | ${n} |`);
        }
        out.push('');
    }
    // Life of the biomes (1.72.0).
    const species = planetSpecies(), endemics = planetEndemics(), ends = endemics.flat(), kinds = k => ends.filter(sp => sp.kind === k).length, most = Math.max(...species.map((l, i) => l.length + endemics[i].length));
    const pct = v => Math.round(v * 100) + ' %', families = ['terrestrial', 'oceanic', 'desert', 'arctic', 'volcanic'];
    out.push('## Vita dei biomi', '');
    out.push(`Dalla versione 1.72.0 piante e animali vivono in tutta la zona. Su ogni pianeta con vita ogni bioma diverso da quello della base ha una specie endemica, che vive soltanto lì: in tutto ${ends.length} specie endemiche (${kinds('plant')} piante, ${kinds('animal')} animali e ${kinds('fungus')} funghi), che si aggiungono alle ${species.flat().length} specie delle versioni precedenti; un pianeta ne ha al più ${most} in tutto. La forma dell’endemica è una di quelle del bioma che la fisica del pianeta consente: gli animali richiedono un’aria con densità almeno 0,2, i grandi animali almeno 0,35 e i volatori almeno ${String(FLIGHT).replace('.', ',')}. Le piante prendono il pigmento del pianeta; nei biomi con un colore proprio del suolo gli animali ne prendono una parte, per mimetismo, e le piante una parte minore. Gli erbivori mangiano le piante del loro bioma, i predatori i consumatori del bioma o del pianeta.`, '');
    out.push(`Ogni bioma ospita anche le specie del pianeta il cui habitat vi si trova (pianure, alture, rive, zone calde o tutto il paesaggio); il bioma della base le ospita tutte, e l’endemica pesa ${ENDEMIC_WEIGHT} volte le altre nella scelta. In ogni gruppo di ${CHUNK} × ${CHUNK} unità attorno alla camera ci sono ${PLANTS_MOST} punti candidati per le piante: ciascuno porta una pianta con la quota del bioma, ridotta dove l’aria è rada e raccolta a chiazze da un rumore; sulla terraferma ogni gruppo ha poi una probabilità di ospitare un branco, una coppia di predatori o uno stormo pari a ${String(GROUP_SHARE).replace('.', ',')} volte la quota di animali del bioma. Gli animali della zona vagano su cerchi di 2-6 unità attorno al loro posto, 12-20 unità per i volatori, con una sosta di alcuni secondi ogni 30 secondi circa.`, '');
    out.push(`Nel bioma della base la quota di piante e quella di animali dipendono dalla famiglia del pianeta: ${families.map(f => `${PLANET_TYPES[f].name.toLowerCase()} ${pct(BASE_LIFE[f].flora)} e ${pct(BASE_LIFE[f].fauna)}`).join(', ')}.`, '');
    out.push('| Bioma | Adattamento dell’endemica | Forme possibili | Epiteto | Piante | Animali | Pianeti con l’endemica |', '|---|---|---|---|---:|---:|---:|');
    for (const b of BIOMES.filter(b => LIFE[b.id])) { const L = LIFE[b.id], n = ends.filter(sp => sp.biome === b.id).length; out.push(`| ${b.name} | ${L.trait} | ${L.forms.map(f => FORMS[f].label).join(', ')} | *${L.epithet}* | ${pct(L.flora)} | ${pct(L.fauna)} | ${n} |`); }
    out.push('');
    const first = data.flatMap(d => d.first), gaps = data.flatMap(d => d.gaps), each = data.map(d => median(d.gaps));
    out.push('## Varietà lungo il cammino', '');
    out.push(`Su ogni pianeta il codice percorre otto linee rette dalla base al confine della zona, a passi di 4 unità, e annota il bioma con più peso in ogni punto. Il primo bioma diverso da quello della base si incontra in mediana a ${metres(median(first))} m; i cambi successivi si susseguono in mediana ogni ${metres(median(gaps))} m, con una mediana per pianeta compresa fra ${metres(Math.min(...each))} e ${metres(Math.max(...each))} m. Lungo le ${data.length * 8} linee i cambi di bioma sono ${first.length + gaps.length}.`, '');
    out.push('## Biomi dei pianeti', '', 'Per ogni pianeta i biomi, il primo dei quali è quello della base, con il numero di celle che ognuno occupa nella zona, e le specie endemiche con il loro bioma.', '');
    cards.forEach((g, i) => {
        const d = data[i], e = endemics[i].map(sp => `*${sp.name}* (${BIOME[sp.biome].name.toLowerCase()})`);
        out.push(`- **${titles[i]}** (pianeta ${i + 1}, ${PLANET_TYPES[g.family].name.toLowerCase()}): ${d.ids.map((id, t) => `${BIOME[id].name} ${d.cells[t]}`).join(', ')}.${e.length ? ' Endemiche: ' + e.join(', ') + '.' : ''}`);
    });
    out.push('');
    return out.join('\n');
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
    fs.writeFileSync(new URL('../docs/BIOMI.md', import.meta.url), biomesMarkdown());
    console.log('docs/BIOMI.md scritto.');
}
