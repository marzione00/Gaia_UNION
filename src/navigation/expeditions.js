/** Expeditions of the planets. Each planet offers three expeditions, made of the exercises of its book
 * chapter at one level: the base exercises in orbit, the medium ones on the surface, the advanced ones in
 * depth. An exercise counts once the student marks it as solved in the book, after comparing the working
 * with the written solution: a self-assessment, declared as such. The mathematics units have no chapter;
 * their orbit expedition is made of the questions of the guided path, graded by the path itself, and their
 * other two expeditions wait for a chapter. The lists are in content/atlas/expeditions.json, built by
 * tools/build_expeditions.mjs. Expeditions never lock content: the chapters and the paths stay open. */

/** The three expeditions, from the orbit downwards. */
export const EXPEDITIONS = Object.freeze([
    { level: 'base', place: 'orbita', name: 'Spedizione in orbita', levelName: 'esercizi di base' },
    { level: 'medio', place: 'superficie', name: 'Spedizione in superficie', levelName: 'esercizi intermedi' },
    { level: 'avanzato', place: 'profondità', name: 'Spedizione in profondità', levelName: 'esercizi avanzati' }
]);
/** Most solved exercises kept in a save: more than the exercises of the book. */
export const SOLVED_MAX = 5000;
/** Key of a solved exercise in the save. */
export const solvedKey = (unit, id) => unit + '#' + id;
const KEY = /^[a-z]+-[a-z0-9]{1,4}#[a-z0-9-]{1,40}$/;

/** Solved exercises of a loaded save: unique well-formed keys only. */
export function cleanSolved(list) {
    return Array.isArray(list) ? [...new Set(list.filter(k => typeof k === 'string' && KEY.test(k)))].slice(0, SOLVED_MAX) : [];
}
/** Lists of the loaded file, by unit; an unexpected file gives none. */
export function cleanExpeditionLists(file) {
    const out = {}, ids = v => Array.isArray(v) && v.every(x => typeof x === 'string');
    if (file?.schemaVersion !== 1 || !file.units || typeof file.units !== 'object') return out;
    for (const [unit, e] of Object.entries(file.units)) {
        if (e && EXPEDITIONS.every(x => ids(e[x.level]))) out[unit] = { base: e.base, medio: e.medio, avanzato: e.avanzato };
        else if (Array.isArray(e?.questions) && e.questions.every(q => typeof q?.id === 'string' && /^[A-D]$/.test(q.correct))) out[unit] = { questions: e.questions };
    }
    return out;
}
/** Progress of the three expeditions of `unit`: kind ('libro', 'percorso' or 'attesa'), solved, total,
 * done, and the first exercise still to solve. */
export function expeditionProgress(unit, data, lists) {
    const e = lists[unit], solved = new Set(data.solved || []);
    return EXPEDITIONS.map((x, k) => {
        if (e?.questions) {
            if (k) return { ...x, kind: 'attesa', solved: 0, total: 0, done: false, next: null };
            const answers = data.courses?.[unit]?.answers || {}, right = e.questions.filter(q => answers[q.id] === q.correct).length;
            return { ...x, kind: 'percorso', solved: right, total: e.questions.length, done: right === e.questions.length, next: null };
        }
        const list = e?.[x.level] || [], left = list.filter(id => !solved.has(solvedKey(unit, id)));
        return { ...x, kind: list.length ? 'libro' : 'attesa', solved: list.length - left.length, total: list.length, done: list.length > 0 && !left.length, next: left[0] || null };
    });
}
/** Totals over the units: expeditions available and done, exercises and questions solved, planets with at
 * least one expedition done. */
export function expeditionTotals(data, lists) {
    const t = { available: 0, done: 0, solved: 0, total: 0, planets: 0 };
    for (const unit of Object.keys(lists)) {
        const p = expeditionProgress(unit, data, lists).filter(x => x.kind !== 'attesa');
        t.available += p.length; t.done += p.filter(x => x.done).length; t.solved += p.reduce((s, x) => s + x.solved, 0); t.total += p.reduce((s, x) => s + x.total, 0);
        if (p.some(x => x.done)) t.planets++;
    }
    return t;
}
/** Marks the exercise `id` of `unit` as solved (or not); returns whether the save changed. */
export function setSolved(data, unit, id, value) {
    const key = solvedKey(unit, id), list = data.solved ||= [], has = list.includes(key);
    if (value === has || !KEY.test(key)) return false;
    if (value) { if (list.length >= SOLVED_MAX) return false; list.push(key); } else list.splice(list.indexOf(key), 1);
    return true;
}
