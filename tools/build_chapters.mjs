/** Writes content/atlas/chapters.json: for each chapter of the book, the ids of its sections, which the
 * research outposts count as read (src/navigation/outposts.js). */
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { parseChapter } from '../src/book/markdown.js';

const root = new URL('../', import.meta.url), read = p => fs.readFileSync(new URL(p, root), 'utf8');
export function buildChapters() {
    const units = {};
    for (const c of JSON.parse(read('content/libro/index.json')).capitoli) units[c.unit] = parseChapter(read(c.file)).toc.filter(t => t.level === 2).map(t => t.id);
    return { schemaVersion: 1, note: 'Generato da tools/build_chapters.mjs: non modificare a mano.', units };
}
if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
    const out = buildChapters(), all = Object.values(out.units);
    fs.writeFileSync(new URL('content/atlas/chapters.json', root), JSON.stringify(out) + '\n');
    console.log('Capitoli:', all.length, 'con', all.reduce((s, x) => s + x.length, 0), 'sezioni.');
}
