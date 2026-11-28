/** Writes docs/LUOGHI_RARI.md, the rare natural places of the zones of the landing sites (1.74.0), from the code of
 * src/worlds/wonders.js and the surfaces of the 125 planets: `node scripts/rari.mjs`. tests/rari.test.mjs checks
 * that the file matches the code. */
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { planetSurface } from '../src/worlds/surface.js';
import { siteList } from '../src/worlds/sites.js';
import { rareList, RARE_KINDS, RARE_GAP, RARE_INNER, MOST_RARE } from '../src/worlds/wonders.js';
import { SCAN_RANGE, SCAN_COOLDOWN, COMPASS_FIELD } from '../src/worlds/compass.js';
import { BIOME } from '../src/worlds/biomes.js';
import { METRE } from '../src/worlds/explorer.js';
import { PLANET_TYPES } from '../src/scene/planet-types.js';

const metres = u => Math.round(u / METRE), median = list => { const s = [...list].sort((a, b) => a - b); return s.length % 2 ? s[(s.length - 1) / 2] : (s[s.length / 2 - 1] + s[s.length / 2]) / 2; };
/** The sites and rare places of every planet, in planet order. */
export const allRares = () => Array.from({ length: 125 }, (_, i) => { const s = planetSurface(i), sites = siteList(s); return { family: s.genome.family, rares: rareList(s, sites) }; });
/** What each kind needs, in words; the numbers are those of RARE_KINDS. */
const NEEDS = {
    arco: 'nessuna condizione', camini: 'aria di almeno 0,01 bar', sorgente: 'vita, pressione da 0,5 a 150 bar, aria più fredda di almeno 30 °C della temperatura di ebollizione',
    travertino: 'pressione di almeno 0,3 bar, temperatura media fra −13 e 87 °C', cratere: 'pressione sotto 3 bar', cristalli: 'nessuna condizione', penitenti: 'temperatura media sotto 2 °C',
    ragni: 'pressione fra 0,001 e 0,2 bar, temperatura media sotto −28 °C', stromatoliti: 'vita, mare, pressione di almeno 0,3 bar, temperatura media fra 0 e 57 °C', poligoni: 'nessuna condizione',
    inselberg: 'nessuna condizione', masso: 'nessuna condizione', fossili: 'piante fra le specie del pianeta', lava: 'pianeti vulcanici', seracchi: 'temperatura media sotto 0 °C', barcane: 'aria di almeno 0,005 bar'
};
const GROUND = { cratere: 'conca e bordo rialzato', lava: 'pozzo dalle pareti ripide', sorgente: 'conca poco profonda e un argine di depositi', poligoni: 'terreno spianato', barcane: 'dune a mezzaluna' };

export function raresMarkdown(data = allRares(), titles = JSON.parse(fs.readFileSync(new URL('../content/catalogue.json', import.meta.url), 'utf8')).modules.map(m => m.title)) {
    const all = data.flatMap(d => d.rares), counts = data.map(d => d.rares.length), out = [];
    const near = data.flatMap(d => d.rares.length > 1 ? d.rares.map(a => Math.min(...d.rares.filter(b => b !== a).map(b => Math.hypot(a.x - b.x, a.z - b.z)))) : []);
    out.push('# Luoghi naturali rari delle zone di atterraggio', '');
    out.push('Questo file è generato da `node scripts/rari.mjs` a partire da `src/worlds/wonders.js`; `tests/rari.test.mjs` controlla che corrisponda al codice.', '');
    out.push(`Dalla versione 1.74.0 la zona di atterraggio di ogni pianeta ospita da ${Math.min(...counts)} a ${Math.max(...counts)} luoghi naturali rari, in mediana ${median(counts)}: in tutto ${all.length} sui 125 pianeti, di ${Object.keys(RARE_KINDS).length} tipi. Ogni tipo compare al più una volta per pianeta, soltanto dove la fisica del pianeta lo permette e soltanto nei biomi in cui si forma; un pianeta ne ha al più ${MOST_RARE}. I luoghi rari distano almeno ${RARE_GAP} unità (${metres(RARE_GAP)} m) l’uno dall’altro e ${RARE_INNER} unità (${metres(RARE_INNER)} m) dalla base, stanno lontano dai siti costruiti e su un terreno adatto: in piano, sul bordo dell’acqua per le stromatoliti, su un pendio per le terrazze di travertino. La distanza mediana fra un luogo raro e il più vicino è di ${metres(median(near))} m.`, '');
    out.push(`L’impulso dello scanner rileva i siti e i luoghi rari entro ${SCAN_RANGE} unità (${(SCAN_RANGE / METRE / 1000).toFixed(1).replace('.', ',')} km) dall’esploratore, uno ogni ${SCAN_COOLDOWN / 1000} s; la bussola li mostra, con la base e la voce scelta, su una striscia che copre ${COMPASS_FIELD}° attorno alla direzione della vista. L’est è la direzione in cui sorge la stella del sito, il nord un quarto di giro a sinistra dell’est.`, '');
    out.push('## Tipi di luogo raro', '', '| Tipo | Biomi in cui si forma | Condizioni del pianeta | Terreno | Pianeti |', '|---|---|---|---|---:|');
    for (const [k, v] of Object.entries(RARE_KINDS)) out.push(`| ${v.label[0].toUpperCase() + v.label.slice(1)} | ${v.biomes.map(b => BIOME[b].name.toLowerCase()).join(', ')} | ${NEEDS[k]} | ${GROUND[k] || 'invariato'} | ${data.filter(d => d.rares.some(x => x.kind === k)).length} |`);
    out.push('');
    out.push('## Le descrizioni', '');
    out.push('Ogni luogo raro ha una descrizione di tre o quattro frasi con i numeri del pianeta. La sorgente calda riporta la temperatura di ebollizione dell’acqua alla pressione del pianeta, dalla relazione di Clausius e Clapeyron; i ragni di anidride carbonica la temperatura a cui il gas gela, dalla stessa relazione; il cratere la velocità di fuga e l’energia per chilogrammo di un corpo che arriva a quella velocità, confrontata con il tritolo; il lago di lava la potenza irradiata dalla lava secondo la legge di Stefan e Boltzmann, confrontata con la luce della stella; il monolite la pressione alla base, ρgh; il masso in bilico il peso con la gravità del pianeta; l’arco le dimensioni che la gravità permette; i penitenti l’altezza della stella a mezzogiorno; le barcane la direzione del vento e il rapporto fra le velocità delle dune.', '');
    out.push('## Esempio: i luoghi rari del primo pianeta', '');
    for (const x of data[0].rares) out.push(`- **${x.name}** (${RARE_KINDS[x.kind].label}). ${x.story.join(' ')}`);
    out.push('', '## Luoghi rari dei pianeti', '');
    data.forEach((d, i) => out.push(`- **${titles[i]}** (pianeta ${i + 1}, ${PLANET_TYPES[d.family].name.toLowerCase()}): ${d.rares.map(x => `${x.name} (${RARE_KINDS[x.kind].label})`).join(', ')}.`));
    out.push('');
    return out.join('\n');
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
    fs.writeFileSync(new URL('../docs/LUOGHI_RARI.md', import.meta.url), raresMarkdown());
    console.log('docs/LUOGHI_RARI.md scritto.');
}
