import { systemForPlanet, indicesForSystem, SYSTEM_COUNT } from './scene/systems.js';
import { DOCUMENTS, docKey, docOf } from './documents.js';
/** Resolve current and previous-edition deep links without trusting URL numbers. */
export function resolveRoute(hash, modules, lessonIds) {
    const [path = '', query = ''] = String(hash).replace(/^#\/?/, '').split('?');
    const parts = path.split('/');
    const q = new URLSearchParams(query);
    const aliases = { study: 'theory', planet: 'orbit', archive: 'catalogue', notebook: 'journal', nave: 'ship', nucleo: 'gaia', avamposto: 'outpost' };
    const allowed = ['galaxy', 'system', 'orbit', 'surface', 'research', 'catalogue', 'briefing', 'theory', 'pdf', 'lab', 'quiz', 'journal', 'sources', 'mission', 'pilot', 'paths', 'libro', 'ship', 'gaia', 'outpost'];
    const name = aliases[parts[0]] || parts[0];
    let scene = allowed.includes(name) ? name : 'galaxy';
    const moduleId = q.get('unit') || (['study', 'planet', 'briefing'].includes(parts[0]) ? parts[1] : null);
    let selected = Math.max(0, modules.findIndex(m => m.id === (moduleId || 'math-c08')));
    if (scene === 'pilot') selected = Math.max(0, modules.findIndex(m => m.id === 'math-c08'));
    const unit = modules[selected];
    let reader = q.get('reader') || (parts[0] === 'study' ? parts[1] : null) || unit.id;
    const labs = ['daisyworld', 'transform', 'rectangle', 'radical', 'linear', 'reserve', 'rational'];
    const oldLabs = { 'function-transform': 'transform', 'rectangle-area': 'rectangle', 'radical-domain': 'radical', 'linear-system': 'linear', 'exponential-reserve': 'reserve', 'rational-signs': 'rational' };
    const candidate = q.get('model') || oldLabs[parts[1]];
    const lab = labs.includes(candidate) ? candidate : 'daisyworld';
    const integer = (key, fallback, min, max) => {
        const n = Number(q.get(key));
        return q.has(key) && Number.isFinite(n) ? Math.max(min, Math.min(max, Math.floor(n))) : fallback;
    };
    let pdfDoc = docKey(q.get('doc')), pdfPage = integer('page', DOCUMENTS[pdfDoc].defaultPage, 1, DOCUMENTS[pdfDoc].pages), courseStage = null;
    if (scene === 'quiz' && unit.id !== 'math-c08' && unit.curriculum) { scene = 'mission'; courseStage = 4; }
    if (scene === 'theory' && !lessonIds.includes(reader)) {
        const target = modules.find(m => m.id === reader) || unit;
        // The mathematics chapters open their handout; physics units keep their guided course,
        // and reach the physics handout from the course or the briefing.
        if (target.source && docOf(target.source) === 'mat') {
            scene = 'pdf';
            pdfDoc = docOf(target.source);
            pdfPage = target.source.pdfPages[0];
        }
        else
            { scene = target.curriculum ? 'mission' : 'briefing'; if (scene === 'mission') courseStage = 1; }
        reader = 'math-c08';
    }
    let system=systemForPlanet(selected);
    if(scene==='system' && q.has('system')){system=integer('system',system,0,SYSTEM_COUNT-1);if(systemForPlanet(selected)!==system)selected=indicesForSystem(system)[0];}
    return { scene, selected, system, reader, section: integer('section', 0, 0, 100), pdfDoc, pdfPage, lab, courseStage, explore: scene === 'surface' && q.get('mode') === 'esplora', bookSection: scene === 'libro' && /^[\w-]{1,80}$/.test(q.get('sezione') || '') ? q.get('sezione') : null };
}
