/** Writes docs/SITI.md, the structures, wrecks and ruins of the zones of the landing sites (1.73.0), from the
 * code of src/worlds/sites.js and the surfaces of the 125 planets: `node scripts/siti.mjs`. tests/siti.test.mjs
 * checks that the file matches the code. */
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { planetSurface } from '../src/worlds/surface.js';
import { siteList, SITE_KINDS, STATES, SITE_GAP, SITE_INNER, FEWEST_SITES, MOST_SITES } from '../src/worlds/sites.js';
import { METRE } from '../src/worlds/explorer.js';
import { PLANET_TYPES } from '../src/scene/planet-types.js';

const metres = u => Math.round(u / METRE), median = list => { const s = [...list].sort((a, b) => a - b); return s.length % 2 ? s[(s.length - 1) / 2] : (s[s.length / 2 - 1] + s[s.length / 2]) / 2; };
/** The sites of every planet, in planet order. */
export const allSites = () => Array.from({ length: 125 }, (_, i) => { const s = planetSurface(i); return { family: s.genome.family, sites: siteList(s) }; });

export function sitesMarkdown(data = allSites(), titles = JSON.parse(fs.readFileSync(new URL('../content/catalogue.json', import.meta.url), 'utf8')).modules.map(m => m.title)) {
    const all = data.flatMap(d => d.sites), out = [], count = f => all.filter(f).length, gaps = data.flatMap(d => d.sites.map(a => Math.min(...d.sites.filter(b => b !== a).map(b => Math.hypot(a.x - b.x, a.z - b.z)))));
    out.push('# Siti delle zone di atterraggio', '');
    out.push('Questo file è generato da `node scripts/siti.mjs` a partire da `src/worlds/sites.js`; `tests/siti.test.mjs` controlla che corrisponda al codice.', '');
    out.push(`Dalla versione 1.73.0 la zona di atterraggio di ogni pianeta ospita da ${FEWEST_SITES} a ${MOST_SITES} siti costruiti: in tutto ${all.length} sui 125 pianeti, di cui ${Object.keys(STATES).map(k => `${count(x => x.state === k)} ${STATES[k].toLowerCase().replace('struttura ', 'strutture ').replace('abitata', 'abitate').replace('abbandonata', 'abbandonate').replace('relitto', 'relitti').replace('rovina', 'rovine')}`).join(', ')}. I siti distano almeno ${SITE_GAP} unità (${metres(SITE_GAP)} m) l’uno dall’altro e ${SITE_INNER} unità (${metres(SITE_INNER)} m) dalla base, stanno su terra asciutta e quasi in piano, e ogni pianeta ne ha almeno uno per stato. La quota di siti abitati cresce con l’ospitalità della famiglia del pianeta, dalla terrestre alla rocciosa; la distanza mediana fra un sito e il più vicino è di ${metres(median(gaps))} m.`, '');
    out.push('## Tipi di sito', '', '| Tipo | Stato | Modelli | Pianeti | Siti |', '|---|---|---|---:|---:|');
    const MODELS = {
        avamposto: 'quattro o cinque edifici della colonia attorno a un modulo, con un rover', miniera: 'estrattori, serbatoi o bioreattori della colonia, con un rover', stazione: 'antenna, pannelli e radiatori o regolatori, con un rover',
        serre: 'serre della colonia e i loro impianti', campo: 'capanne, un granaio, un totem e un fuoco dei nativi', abbandonato: 'edifici della colonia inclinati, affondati, impolverati, con le finestre spente, un tetto mancante e detriti',
        'miniera-abbandonata': 'impianti di miniera invecchiati allo stesso modo', relitto: 'una nave del sistema spezzata in due, bruciata, mezza sepolta, con una scia di detriti', rovine: 'cerchio di pietre attorno a un focolare e muri spezzati di case, con muschio dove crescono piante',
        'serre-abbandonate': 'serre della colonia invecchiate allo stesso modo, con i telai rotti', sonda: 'una sonda della flotta spezzata e bruciata, con il paracadute disteso dal vento dove l’aria è abbastanza densa',
        faro: 'antenna e pannelli della prima spedizione, crollati', osservatorio: 'cupola, antenna e modulo della prima spedizione, crollati', spedizione: 'moduli sigillati, cupola, antenna e pannelli della prima spedizione, piegati e coperti di polvere'
    };
    for (const [k, v] of Object.entries(SITE_KINDS)) out.push(`| ${v.label[0].toUpperCase() + v.label.slice(1)} | ${STATES[v.state].toLowerCase()} | ${MODELS[k]} | ${data.filter(d => d.sites.some(x => x.kind === k)).length} | ${count(x => x.kind === k)} |`);
    out.push('');
    out.push('## Le storie', '');
    out.push('Ogni sito ha una storia di tre o quattro frasi, scritta dai dati del pianeta: la temperatura media, la pressione e l’effetto serra della scheda «Fisica», il flusso della stella e la durata dell’anno, la gravità e la velocità di fuga, il bioma in cui sta il sito e la sua specie endemica, il nome della colonia e quello del popolo nativo. Le cause di abbandono dipendono dal pianeta: un brillamento dove la stella è una nana di tipo M o K e manca la magnetosfera, gli sciami di meteoroidi dove l’aria è rada, le tempeste di polvere nei deserti, le colate sui pianeti vulcanici, il ghiaccio su quelli glaciali, le mareggiate su quelli oceanici, le frane su quelli terrestri, l’esaurimento del ghiaccio sotterraneo sui pianeti rocciosi e desertici. Il relitto riproduce una nave del sistema stellare del pianeta, lunga al più 100 m, e ne dice la classe; la sonda precipitata riproduce una delle sonde della flotta, quella del sistema quando c’è, e ha un paracadute dove la pressione al suolo raggiunge 0,1 bar. L’osservatorio ricorda la terza legge di Keplero con il periodo e la distanza dalla stella del pianeta.', '');
    out.push('## Esempio: i siti del primo pianeta', '');
    for (const x of data[0].sites) out.push(`- **${x.name}** (${SITE_KINDS[x.kind].label}). ${x.story.join(' ')}`);
    out.push('', '## Siti dei pianeti', '');
    data.forEach((d, i) => out.push(`- **${titles[i]}** (pianeta ${i + 1}, ${PLANET_TYPES[d.family].name.toLowerCase()}): ${d.sites.map(x => `${x.name} (${SITE_KINDS[x.kind].label})`).join(', ')}.`));
    out.push('');
    return out.join('\n');
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
    fs.writeFileSync(new URL('../docs/SITI.md', import.meta.url), sitesMarkdown());
    console.log('docs/SITI.md scritto.');
}
