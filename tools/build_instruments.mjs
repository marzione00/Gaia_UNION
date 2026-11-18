/** Writes content/atlas/instruments.json: for each instrument of the ship (src/navigation/instruments.js),
 * the sections of its unit's chapter that must all be read to bring it on board. */
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { parseChapter } from '../src/book/markdown.js';
import { INSTRUMENTS } from '../src/navigation/instruments.js';

const root = new URL('../', import.meta.url), read = p => fs.readFileSync(new URL(p, root), 'utf8');
export function buildInstruments() {
    const chapters = new Map(JSON.parse(read('content/libro/index.json')).capitoli.map(c => [c.unit, c.file]));
    return { schemaVersion: 1, note: 'Generato da tools/build_instruments.mjs: non modificare a mano.', instruments: INSTRUMENTS.map(i => {
        const file = chapters.get(i.unit);
        if (!file) throw Error('Capitolo mancante per lo strumento ' + i.id + ': ' + i.unit);
        return { id: i.id, unit: i.unit, sections: parseChapter(read(file)).toc.filter(t => t.level === 2).map(t => t.id) };
    }) };
}
if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
    const out = buildInstruments();
    fs.mkdirSync(new URL('content/atlas/', root), { recursive: true });
    fs.writeFileSync(new URL('content/atlas/instruments.json', root), JSON.stringify(out, null, 1) + '\n');
    console.log('Strumenti:', out.instruments.map(i => i.id + ' ' + i.sections.length).join(', '));
}
