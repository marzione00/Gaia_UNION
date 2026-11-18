import test from 'node:test'; import assert from 'node:assert/strict'; import fs from 'node:fs';
import { buildPassages } from '../tools/build_passages.mjs';
import { cleanPassages, openPassages, linkOpen, exploration, passagesOf, passageLabel, CONNECTIONS_STAGE } from '../src/navigation/passages.js';
import { AREAS, SYSTEM_COUNT, systemForPlanet } from '../src/scene/systems.js';
import { parseChapter } from '../src/book/markdown.js';
import { fresh } from '../src/store.js';

const file = JSON.parse(fs.readFileSync(new URL('../content/atlas/passages.json', import.meta.url), 'utf8'));
const passages = cleanPassages(file), modules = JSON.parse(fs.readFileSync(new URL('../content/catalogue.json', import.meta.url), 'utf8')).modules;
const byId = new Map(modules.map(m => [m.id, m])), index = JSON.parse(fs.readFileSync(new URL('../content/libro/index.json', import.meta.url), 'utf8')).capitoli;

test('Passaggi: il file è aggiornato rispetto ai capitoli e ai percorsi guidati', () => {
    assert.deepEqual(file, buildPassages());
    assert.equal(passages.length, file.passages.length);
    assert.equal(passages.length, 147);
    assert.equal(passages.filter(p => p.kind === 'corsia').length, 78);
    assert.equal(passages.filter(p => p.kind === 'salto').length, 69);
    const links = passages.flatMap(p => p.links);
    assert.deepEqual([links.length, links.filter(l => l.via === 'capitolo').length, links.filter(l => l.via === 'percorso').length], [624, 426, 198]);
    const degree = Array.from({ length: SYSTEM_COUNT }, (_, id) => passagesOf(passages, id).length);
    assert.deepEqual([Math.min(...degree), Math.max(...degree)], [3, 16]);
});

test('Passaggi: ogni rimando unisce due sistemi diversi e indica una sezione esistente', () => {
    const sections = new Map(index.map(c => [c.unit, new Set(parseChapter(fs.readFileSync(new URL('../' + c.file, import.meta.url), 'utf8')).toc.filter(t => t.level === 2).map(t => t.id))]));
    for (const p of passages) {
        const [a, b] = p.systems;
        assert.ok(a < b); assert.equal(p.id, a + '-' + b);
        assert.equal(p.kind, AREAS[a].sector === AREAS[b].sector ? 'corsia' : 'salto');
        for (const l of p.links) {
            const ends = [l.from, l.to].map(id => systemForPlanet(byId.get(id).planetIndex)).sort((x, y) => x - y);
            assert.deepEqual(ends, p.systems);
            if (l.via === 'capitolo') assert.ok(sections.get(l.from)?.has(l.section), l.from + ' ' + l.section);
            else assert.equal(l.via, 'percorso');
        }
    }
});

test('Passaggi: la rete tocca tutti i sistemi e li collega tutti', () => {
    const adj = Array.from({ length: SYSTEM_COUNT }, () => new Set());
    for (const p of passages) { adj[p.systems[0]].add(p.systems[1]); adj[p.systems[1]].add(p.systems[0]); }
    assert.ok(adj.every(s => s.size >= 3));
    const seen = new Set([0]), stack = [0];
    while (stack.length) for (const y of adj[stack.pop()]) if (!seen.has(y)) { seen.add(y); stack.push(y); }
    assert.equal(seen.size, SYSTEM_COUNT);
    for (let id = 0; id < SYSTEM_COUNT; id++) assert.equal(passagesOf(passages, id).length, adj[id].size);
});

test('Passaggi: si aprono leggendo la sezione o arrivando ai collegamenti del percorso, mai da soli', () => {
    const data = fresh();
    assert.equal(openPassages(passages, data).size, 0);
    const e0 = exploration(passages, data); assert.deepEqual([e0.visited, e0.opened, e0.passages, e0.systems], [0, 0, 147, 30]);
    // Reading the section of a chapter link opens its passage, and only the passages that link touches.
    const chapterLink = passages.flatMap(p => p.links.map(l => ({ p, l }))).find(x => x.l.via === 'capitolo');
    data.read.push('libro:' + chapterLink.l.from + '#' + chapterLink.l.section);
    const opened = openPassages(passages, data);
    assert.ok(opened.has(chapterLink.p.id));
    for (const id of opened) assert.ok(passages.find(p => p.id === id).links.some(l => linkOpen(l, data)));
    // A guided path opens its connections at the connections stage, not before.
    const pathLink = passages.flatMap(p => p.links.map(l => ({ p, l }))).find(x => x.l.via === 'percorso' && !opened.has(x.p.id));
    data.courses[pathLink.l.from] = { stage: CONNECTIONS_STAGE - 1 };
    assert.ok(!openPassages(passages, data).has(pathLink.p.id));
    data.courses[pathLink.l.from] = { stage: CONNECTIONS_STAGE };
    assert.ok(openPassages(passages, data).has(pathLink.p.id));
    data.atlas.visited = [0, 3];
    const e = exploration(passages, data); assert.equal(e.visited, 2); assert.equal(e.opened, e.lanes + e.jumps); assert.ok(e.opened >= 2);
    assert.match(passageLabel(chapterLink.p, chapterLink.p.systems[0]), /^(Corsia|Porta di salto) verso «.+»$/);
});

test('Passaggi: un file malformato non apre nulla', () => {
    assert.deepEqual(cleanPassages(null), []);
    assert.deepEqual(cleanPassages({ schemaVersion: 2, passages: file.passages }), []);
    assert.deepEqual(cleanPassages({ schemaVersion: 1, passages: [{ id: 'x', systems: [0, 99], kind: 'corsia', links: [] }, { id: 'y', systems: [0, 1], kind: 'volo', links: [] }] }), []);
});
