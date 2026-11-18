/** Research outposts: one for each of the 30 systems of the map (src/scene/layout.js). An outpost gathers in
 * one place what the student has done in its area: the chapters and their sections read, the guided paths
 * with their laboratory, the expeditions (src/navigation/expeditions.js), the planets measured and visited,
 * and the passages towards other areas (src/navigation/passages.js). The outpost is built when the first
 * expedition of the area is completed; before that its site already shows the same summary, because the
 * outpost locks nothing. Chapter sections are in content/atlas/chapters.json, built by
 * tools/build_chapters.mjs. */
import { AREAS } from '../scene/layout.js';
import { expeditionProgress } from './expeditions.js';
import { openPassages, passagesOf } from './passages.js';

/** Steps of a guided path, and the step of its laboratory. */
export const PATH_STEPS = 6, LAB_STAGE = 2;

/** Section ids of each chapter of the loaded file; an unexpected file gives none. */
export function cleanChapterSections(file) {
    const out = {};
    if (file?.schemaVersion !== 1 || !file.units || typeof file.units !== 'object') return out;
    for (const [unit, ids] of Object.entries(file.units)) if (Array.isArray(ids) && ids.every(x => typeof x === 'string')) out[unit] = ids;
    return out;
}
/** Whether the outpost of area `area` is built: an expedition of one of its planets is complete. */
export function outpostBuilt(area, modules, data, lists) {
    return AREAS[area].units.some(i => modules[i] && expeditionProgress(modules[i].id, data, lists).some(x => x.done));
}
/** Summary of the outpost of area `area`. `modules` are the catalogue modules by planet index, `lists` the
 * expedition lists, `sections` the chapter sections, `passages` the passages of the map. */
export function outpostReport(area, modules, data, { lists = {}, sections = {}, passages = [] } = {}) {
    const read = new Set(data.read || []), units = [], t = { sectionsRead: 0, sections: 0, chapters: 0, paths: 0, done: 0, available: 0, solved: 0, exercises: 0, measured: 0, landed: 0, species: 0 };
    for (const index of AREAS[area].units) {
        const m = modules[index]; if (!m) continue;
        const ids = sections[m.id], course = data.courses?.[m.id], rec = data.explore?.[String(index)];
        const chapter = ids ? { read: ids.filter(id => read.has('libro:' + m.id + '#' + id)).length, total: ids.length } : null;
        const path = { stage: Math.max(0, Math.min(PATH_STEPS - 1, Number(course?.stage) || 0)), completed: !!(course?.completedAt && course?.completionSignature) };
        const expeditions = expeditionProgress(m.id, data, lists), open = expeditions.filter(x => x.kind !== 'attesa');
        const explore = { measured: rec?.m?.length || 0, landed: !!(rec && (rec.v === 1 || rec.s?.length)), species: rec?.s?.length || 0 };
        units.push({ index, unit: m.id, title: m.title, chapter, path, expeditions, explore });
        if (chapter) { t.chapters++; t.sectionsRead += chapter.read; t.sections += chapter.total; }
        if (path.completed) t.paths++;
        t.available += open.length; t.done += open.filter(x => x.done).length; t.solved += open.reduce((s, x) => s + x.solved, 0); t.exercises += open.reduce((s, x) => s + x.total, 0);
        if (explore.measured) t.measured++; if (explore.landed) t.landed++; t.species += explore.species;
    }
    const opened = openPassages(passages, data), touching = passagesOf(passages, area);
    const routes = touching.filter(p => opened.has(p.id)).map(p => ({ id: p.id, kind: p.kind, to: p.other, name: AREAS[p.other].name }));
    return { area, name: AREAS[area].name, sector: AREAS[area].sector, built: t.done > 0, units, totals: t, routes, closed: touching.length - routes.length };
}
