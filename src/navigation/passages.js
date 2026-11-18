/** Passages between star systems (content/atlas/passages.json, built by tools/build_passages.mjs) and the
 * part of the map the student has discovered. A passage opens when one of its references has been met:
 * the chapter section that contains the link has been read to its end, or the guided path that lists the
 * connection has reached its connections stage. Visiting a system and opening a passage never awards
 * learning credit; they only reveal the map. */
import { AREAS, SYSTEM_COUNT } from '../scene/systems.js';

/** Stage of a guided path that shows its connections (src/app.js, «Stazione dei collegamenti»). */
export const CONNECTIONS_STAGE = 5;
/** Passages of a loaded file, or none if the file is not in the expected format. */
export function cleanPassages(file) {
    const ok = p => p && typeof p.id === 'string' && Array.isArray(p.systems) && p.systems.length === 2 && p.systems.every(n => Number.isInteger(n) && n >= 0 && n < SYSTEM_COUNT)
        && ['corsia', 'salto'].includes(p.kind) && Array.isArray(p.links);
    return file?.schemaVersion === 1 && Array.isArray(file.passages) ? file.passages.filter(ok) : [];
}
/** Whether one reference is open, given the saved data and the set of read keys. */
export function linkOpen(link, data, read = new Set(data.read || [])) {
    if (link.via === 'capitolo') return read.has('libro:' + link.from + '#' + link.section);
    const r = data.courses?.[link.from];
    return !!(r && (r.stage >= CONNECTIONS_STAGE || r.completedAt));
}
/** Ids of the open passages. */
export function openPassages(passages, data) {
    const read = new Set(data.read || []);
    return new Set(passages.filter(p => p.links.some(l => linkOpen(l, data, read))).map(p => p.id));
}
/** Passages that touch system `id`, each with the system at the other end. */
export const passagesOf = (passages, id) => passages.filter(p => p.systems.includes(id)).map(p => ({ ...p, other: p.systems[0] === id ? p.systems[1] : p.systems[0] }));
/** Exploration of the map: systems visited, passages open by kind. */
export function exploration(passages, data) {
    const open = openPassages(passages, data), visited = new Set(data.atlas?.visited || []);
    const count = kind => passages.filter(p => p.kind === kind && open.has(p.id)).length;
    return { open, visited: visited.size, systems: SYSTEM_COUNT, passages: passages.length, opened: open.size, lanes: count('corsia'), jumps: count('salto') };
}
/** Short Italian description of a passage seen from system `id`. */
export function passageLabel(p, id) {
    const other = p.systems[0] === id ? p.systems[1] : p.systems[0];
    return (p.kind === 'salto' ? 'Porta di salto verso ' : 'Corsia verso ') + '«' + AREAS[other].name + '»';
}
