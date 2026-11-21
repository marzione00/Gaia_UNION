/** Writes docs/CATALOGO.md, the catalogue of every station and ship of the galaxy (1.51.0), from the code in
 * src/craft/registry.js: `node scripts/craft-catalogue.mjs`. tests/catalogo.test.mjs checks that the file
 * matches the code. */
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { CRAFT, STYLE_NAMES, craftCounts, craftList, kindName } from '../src/craft/registry.js';
import { RECIPES, FLEET } from '../src/craft/economy.js';
import { POWER } from '../src/craft/threats.js';
import { AREAS, DISCIPLINE_NAMES } from '../src/scene/layout.js';

const cell = t => String(t).replace(/\|/g, '/');
/** What a model does, in a few words: the process of a station, the goods of a ship, the strength of a defence ship. */
function work(e) {
    if (e.kind === 'stazione') return RECIPES[e.works || e.type].process.toLowerCase();
    if (e.defence) return 'forza ' + POWER[e.type];
    const f = e.fleet || FLEET[e.type];
    return `carico ${f.capacity}, ${f.carries.length} merci`;
}
export function catalogueMarkdown() {
    const c = craftCounts(), out = [];
    out.push('# Catalogo delle stazioni e delle navi', '');
    out.push(`Questo file elenca i ${c.total} modelli della galassia: ${c.kinds.stazione} stazioni e ${c.kinds.nave} navi di ${c.types} tipi e classi, di cui ${c.groups.difesa} della flotta di difesa. È generato dal codice con \`node scripts/craft-catalogue.mjs\` (\`src/craft/registry.js\`), e \`tests/catalogo.test.mjs\` controlla che corrisponda. Nel sito gli stessi modelli si guardano nel catalogo 3D, che si apre dalla schermata di ogni sistema; la costruzione dei modelli, gli stili e l'economia sono descritti in \`docs/STAZIONI_NAVI.md\`.`, '');
    out.push('## Provenienza', '', '| Gruppo | Modelli |', '|---|---:|');
    for (const [, name, n] of c.sources) out.push(`| ${name} | ${n} |`);
    out.push('', '## Stili', '', '| Stile | Modelli |', '|---|---:|');
    for (const [style, name] of Object.entries(STYLE_NAMES)) out.push(`| ${name[0].toUpperCase() + name.slice(1)} | ${c.styles[style] || 0} |`);
    out.push('', '## Sistemi', '', 'Per ogni sistema: stazioni, navi e difesa, nell\'ordine del catalogo 3D. La colonna «Lavoro» riporta il processo di una stazione, il carico e il numero di merci di una nave civile e la forza contro i droni dello Sciame di una nave di difesa.', '');
    AREAS.forEach((area, id) => {
        const list = craftList({ system: id });
        out.push(`### ${id + 1}. ${area.name}`, '', `Braccio della ${DISCIPLINE_NAMES[area.sector]}: ${list.length} modelli, ${list.filter(e => e.kind === 'stazione').length} stazioni e ${list.filter(e => e.kind === 'nave').length} navi.`, '');
        out.push('| Modello | Tipo | Genere | Stile | Lavoro |', '|---|---|---|---|---|');
        for (const e of list) out.push(`| ${cell(e.name)} | ${cell(e.typeName)} | ${kindName(e)} | ${STYLE_NAMES[e.style].replace(/^stile (della )?/, '')} | ${cell(work(e))} |`);
        out.push('');
    });
    return out.join('\n');
}
if (process.argv[1] === fileURLToPath(import.meta.url)) {
    const file = new URL('../docs/CATALOGO.md', import.meta.url);
    fs.writeFileSync(file, catalogueMarkdown());
    console.log(`docs/CATALOGO.md: ${CRAFT.length} modelli`);
}
