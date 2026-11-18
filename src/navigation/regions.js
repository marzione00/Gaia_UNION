/** Regions of the galaxy: the four discipline arms (src/scene/systems.js), each with its own cloud and star
 * density (src/scene/cosmos.js) and a summary of the progress made along it, gathered from the research
 * outposts of its areas (src/navigation/outposts.js) and from the passages of the map. */
import { AREAS } from '../scene/layout.js';
import { COSMIC_FAMILIES, ARM_REGION, REGION_STAR_SHARE } from '../scene/cosmos.js';
import { outpostReport } from './outposts.js';
import { openPassages } from './passages.js';

export const ARM_NAMES = Object.freeze(['Matematica', 'Fisica', 'Chimica', 'Biologia']);
/** The sky of each arm: its cloud, and what that cloud is. */
export const ARM_SKIES = Object.freeze([
    'Un ammasso aperto: stelle nate dalla stessa nube, con la stessa età e la stessa composizione chimica. Il braccio ha la quota più alta di stelle brillanti aggiunte intorno alla sua nube.',
    'Una nube a riflessione: polvere che diffonde la luce delle stelle vicine, in modo più efficace per la luce azzurra, da cui il suo colore.',
    'Nubi di polvere e gas freddo che oscurano le stelle dietro di sé: sulla superficie dei grani di polvere si formano molecole, a cominciare dall’idrogeno molecolare.',
    'Una regione di formazione stellare: l’idrogeno ionizzato dalle stelle giovani si ricombina ed emette la riga rossa H-alfa, a 656 nanometri.'
]);
/** Areas of arm `sector`, from the core outwards in study order. */
export const armAreas = sector => AREAS.map((a, k) => k).filter(k => AREAS[k].sector === sector);
/** The cloud of arm `sector`: family name and its share of the extra stars. */
export const armCloud = sector => ({ family: COSMIC_FAMILIES[ARM_REGION[sector]], share: REGION_STAR_SHARE[ARM_REGION[sector]] });

/** Summary of arm `sector`: the outposts of its areas, their totals, and the passages that stay inside the
 * arm (lanes) or leave it (jumps), with the open ones. */
export function regionReport(sector, modules, data, { lists = {}, sections = {}, passages = [] } = {}) {
    const areas = armAreas(sector).map(k => outpostReport(k, modules, data, { lists, sections, passages })), own = new Set(armAreas(sector));
    const t = { areas: areas.length, built: areas.filter(r => r.built).length, units: 0, sectionsRead: 0, sections: 0, paths: 0, done: 0, available: 0, measured: 0, landed: 0 };
    for (const r of areas) { t.units += r.units.length; for (const key of ['sectionsRead', 'sections', 'paths', 'done', 'available', 'measured', 'landed']) t[key] += r.totals[key]; }
    const open = openPassages(passages, data), inside = passages.filter(p => p.systems.every(s => own.has(s))), outside = passages.filter(p => p.systems.some(s => own.has(s)) && !p.systems.every(s => own.has(s)));
    const jumps = outside.filter(p => open.has(p.id)).map(p => { const to = p.systems.find(s => !own.has(s)); return { id: p.id, to, name: AREAS[to].name, sector: AREAS[to].sector }; });
    return { sector, name: ARM_NAMES[sector], cloud: armCloud(sector), sky: ARM_SKIES[sector], areas, totals: t, lanes: { open: inside.filter(p => open.has(p.id)).length, total: inside.length }, jumps: { open: jumps, total: outside.length } };
}
