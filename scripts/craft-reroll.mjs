/** Recomputes REROLL in src/craft/catalog.js: for each model, in catalogue order, the first seed offset whose
 * recipe differs in at least two structural choices from every earlier model of the same type and style.
 * Run after changing a builder: `node scripts/craft-reroll.mjs --write`. */
import { readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { CATALOG, build, seedFor, recipeDistance } from '../src/craft/catalog.js';

const accepted = [], table = {};
for (const e of CATALOG) {
    let attempt = 0, recipe;
    for (; attempt < 200; attempt++) {
        recipe = build(e, seedFor(e.system, e.slot, attempt)).recipe;
        if (accepted.every(o => o.type !== e.type || o.style !== e.style || recipeDistance(o.recipe, recipe) >= 2)) break;
    }
    if (attempt === 200) throw new Error('nessun seme valido per ' + e.id);
    if (attempt) table[e.system * 10 + e.slot] = attempt;
    accepted.push({ type: e.type, style: e.style, recipe });
}
const line = 'export const REROLL = ' + JSON.stringify(table).replace(/"(\d+)"/g, '$1').replace(/,/g, ', ').replace(/:/g, ': ') + ';';
console.log(line);
if (process.argv.includes('--write')) {
    const file = resolve(dirname(fileURLToPath(import.meta.url)), '../src/craft/catalog.js'), src = await readFile(file, 'utf8');
    await writeFile(file, src.replace(/^export const REROLL = .*;$/m, line));
}
