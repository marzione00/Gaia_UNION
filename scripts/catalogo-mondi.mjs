/** Writes content/worlds/modelli.json, the index of the models of the living worlds (1.69.0), and
 * docs/CATALOGO_MONDI.md, their catalogue, from the surfaces of the 125 planets built by the code:
 * `node scripts/catalogo-mondi.mjs`. tests/mondi.test.mjs checks that both match the code. */
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { planetSurface } from '../src/worlds/surface.js';
import { indexRecord, worldModels, worldCounts, WORLD_KINDS } from '../src/worlds/catalogo.js';
import { TYPOLOGIES } from '../src/worlds/architecture.js';
import { AREAS, UNIT_COUNT, indicesForSystem } from '../src/scene/layout.js';

const read = p => JSON.parse(fs.readFileSync(new URL('../' + p, import.meta.url), 'utf8'));
/** The index: one record per planet, from its built surface. */
export function buildIndex(surface = planetSurface) { return { version: 1, planets: Array.from({ length: UNIT_COUNT }, (_, i) => indexRecord(surface(i))) }; }
/** The index as written in the file: one planet per line, so a change shows on its own line. */
export const indexText = index => '{"version":' + index.version + ',"planets":[\n' + index.planets.map(p => JSON.stringify(p)).join(',\n') + '\n]}\n';
const names = list => list.map(e => e.name).join(', ');
export function worldCatalogueMarkdown(index, titles = read('content/catalogue.json').modules.map(m => m.title)) {
    const list = worldModels(index), c = worldCounts(list), out = [];
    out.push('# Catalogo dei modelli dei mondi', '');
    out.push(`Questo file elenca i ${c.total} modelli dei mondi vivi: ${c.kinds.specie} specie, ${c.kinds.colonia} edifici delle colonie, ${c.kinds.villaggio} edifici dei villaggi, ${c.kinds.nativo} popoli nativi, ${c.kinds.colono} coloni e ${c.kinds.rover} rover. Con i 997 modelli delle stazioni e delle navi (\`docs/CATALOGO.md\`) il catalogo 3D del sito ne mostra ${c.total + 997}. Il file è generato dal codice con \`node scripts/catalogo-mondi.mjs\`, che costruisce le superfici dei 125 pianeti e scrive anche l'indice \`content/worlds/modelli.json\`; \`tests/mondi.test.mjs\` controlla che entrambi corrispondano al codice. Nel sito i modelli si guardano nel catalogo 3D, con i gruppi «Specie», «Edifici» e «Abitanti e rover»; triangoli e tempi di costruzione sono in \`docs/PRESTAZIONI_MONDI.md\`.`, '');
    out.push('## Riepilogo', '', '| Genere | Modelli |', '|---|---:|');
    for (const [k, name] of Object.entries(WORLD_KINDS)) out.push(`| ${name} | ${c.kinds[k] || 0} |`);
    const shared = list.filter(e => e.planets).sort((a, b) => (a.kind === 'rover') - (b.kind === 'rover') || a.name.localeCompare(b.name, 'it'));
    out.push('', 'Coloni e rover sono gli stessi su più pianeti: un colono dipende dalla tenuta della tipologia, dalla figura e dal colore della pelle e dei capelli, un rover dalla tipologia. Il catalogo li mette sotto il primo pianeta in cui compaiono.', '');
    out.push('| Modello condiviso | Pianeti |', '|---|---:|');
    for (const e of shared) out.push(`| ${e.name} | ${e.planets.length} |`);
    out.push('', '## Pianeti', '', 'Per ogni sistema e per ogni pianeta: le specie, gli edifici della colonia e, dove c\'è, il villaggio con il suo popolo.', '');
    AREAS.forEach((area, id) => {
        out.push(`### ${id + 1}. ${area.name}`, '');
        for (const i of indicesForSystem(id)) {
            const mine = list.filter(e => e.planet === i), rec = index.planets[i], of = k => mine.filter(e => e.kind === k), typ = of('colonia')[0]?.typology;
            out.push(`**${titles[i]}** (pianeta ${i + 1}): ${mine.length} modelli.`, '');
            if (of('specie').length) out.push(`- Specie (${of('specie').length}): ${names(of('specie'))}.`);
            out.push(`- Colonia ${rec.c}, ${TYPOLOGIES[typ]} (${of('colonia').length} edifici): ${of('colonia').map(e => e.typeName.toLowerCase()).join(', ')}.`);
            if (rec.v) out.push(`- ${rec.v.n}, popolo ${rec.v.p} (${of('villaggio').length} edifici): ${of('villaggio').map(e => e.typeName.toLowerCase()).join(', ')}.`);
            const more = [...of('colono'), ...of('rover')]; if (more.length) out.push(`- Prima comparsa: ${more.map(e => e.name).join('; ')}.`);
            out.push('');
        }
    });
    return out.join('\n');
}
if (process.argv[1] === fileURLToPath(import.meta.url)) {
    const t = Date.now(), index = buildIndex();
    fs.writeFileSync(new URL('../content/worlds/modelli.json', import.meta.url), indexText(index));
    fs.writeFileSync(new URL('../docs/CATALOGO_MONDI.md', import.meta.url), worldCatalogueMarkdown(index));
    const c = worldCounts(worldModels(index));
    console.log(`content/worlds/modelli.json e docs/CATALOGO_MONDI.md: ${c.total} modelli in ${((Date.now() - t) / 1000).toFixed(1)} s`, JSON.stringify(c.kinds));
}
