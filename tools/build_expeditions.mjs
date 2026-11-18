/** Writes content/atlas/expeditions.json: for each unit of the catalogue, the ids of the exercises of its
 * book chapter by level (src/navigation/expeditions.js), or, for a unit without a chapter, the questions of
 * its guided path with their correct option. */
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { parseChapter } from '../src/book/markdown.js';
import { EXPEDITIONS } from '../src/navigation/expeditions.js';

const root = new URL('../', import.meta.url), read = p => fs.readFileSync(new URL(p, root), 'utf8');
export function buildExpeditions() {
    const chapters = new Map(JSON.parse(read('content/libro/index.json')).capitoli.map(c => [c.unit, c.file]));
    const courses = new Map(JSON.parse(read('content/curriculum/index.json')).courses.map(c => [c.id, c.path]));
    const units = {};
    for (const m of JSON.parse(read('content/catalogue.json')).modules) {
        const file = chapters.get(m.id);
        if (file) {
            const ex = parseChapter(read(file)).exercises;
            units[m.id] = Object.fromEntries(EXPEDITIONS.map(x => [x.level, ex.filter(e => e.level === x.level).map(e => e.id)]));
        } else if (courses.has(m.id)) units[m.id] = { questions: JSON.parse(read(courses.get(m.id))).questions.map(q => ({ id: q.id, correct: q.correct })) };
        else throw Error('Unità senza capitolo e senza percorso: ' + m.id);
    }
    return { schemaVersion: 1, note: 'Generato da tools/build_expeditions.mjs: non modificare a mano.', units };
}
if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
    const out = buildExpeditions(), all = Object.values(out.units);
    fs.writeFileSync(new URL('content/atlas/expeditions.json', root), JSON.stringify(out) + '\n');
    console.log('Spedizioni:', all.filter(u => !u.questions).length, 'capitoli,', EXPEDITIONS.map(x => x.level + ' ' + all.reduce((s, u) => s + (u[x.level]?.length || 0), 0)).join(', ') + ';', all.filter(u => u.questions).length, 'unità con le domande del percorso.');
}
