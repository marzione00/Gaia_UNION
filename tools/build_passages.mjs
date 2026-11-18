/** Writes content/atlas/passages.json: the passages between star systems, from the cross-references of
 * the book chapters and from the connections and prerequisites of the guided paths. Two systems are joined
 * by a passage when at least one unit of the first refers to a unit of the second; the passage is a lane
 * inside one galaxy arm and a jump between two arms. Each reference keeps what opens it: the chapter
 * section that contains the link, or the guided path that lists the connection. */
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { parseChapter } from '../src/book/markdown.js';
import { systemForPlanet, AREAS } from '../src/scene/systems.js';

const root = new URL('../', import.meta.url), read = p => fs.readFileSync(new URL(p, root), 'utf8');
/** The passage file, computed from the chapters and the guided paths of the repository. */
export function buildPassages() {
    const modules = JSON.parse(read('content/catalogue.json')).modules, byId = new Map(modules.map(m => [m.id, m]));
    const systemOf = id => systemForPlanet(byId.get(id).planetIndex), references = [];
    // Book chapters: every unit link, with the section that contains it (the opening counts as the first section).
    for (const entry of JSON.parse(read('content/libro/index.json')).capitoli) {
        const parts = parseChapter(read(entry.file)).html.split('<section class="libro-sezione" id="'), first = parts[1]?.slice(0, parts[1].indexOf('"'));
        parts.forEach((part, k) => {
            const section = k === 0 ? first : part.slice(0, part.indexOf('"'));
            for (const m of part.matchAll(/data-unit="([a-z]+-[a-z0-9]+)"/g)) if (m[1] !== entry.unit && byId.has(m[1])) references.push({ from: entry.unit, to: m[1], via: 'capitolo', section });
        });
    }
    // Guided paths: connections and prerequisites of every course.
    for (const course of JSON.parse(read('content/curriculum/bundle.json')).courses)
        for (const to of [...course.connections, ...course.prerequisites]) if (to !== course.id && byId.has(to)) references.push({ from: course.id, to, via: 'percorso' });
    const passages = new Map();
    for (const r of references) {
        const a = systemOf(r.from), b = systemOf(r.to);
        if (a === b) continue;
        const [x, y] = a < b ? [a, b] : [b, a], key = x + '-' + y;
        if (!passages.has(key)) passages.set(key, { id: key, systems: [x, y], kind: AREAS[x].sector === AREAS[y].sector ? 'corsia' : 'salto', links: [] });
        const p = passages.get(key), sig = JSON.stringify(r);
        if (!p.links.some(l => JSON.stringify(l) === sig)) p.links.push(r);
    }
    const list = [...passages.values()].sort((p, q) => p.systems[0] - q.systems[0] || p.systems[1] - q.systems[1]);
    return { schemaVersion: 1, note: 'Generato da tools/build_passages.mjs: non modificare a mano.', passages: list };
}
if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
    const out = buildPassages(), list = out.passages, kinds = k => list.filter(p => p.kind === k).length;
    fs.mkdirSync(new URL('content/atlas/', root), { recursive: true });
    fs.writeFileSync(new URL('content/atlas/passages.json', root), JSON.stringify(out, null, 1) + '\n');
    console.log('Passaggi:', list.length, '· corsie', kinds('corsia'), '· salti', kinds('salto'), '· rimandi', list.reduce((n, p) => n + p.links.length, 0));
}
