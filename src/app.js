import { AtlasUI } from './navigation/atlas-ui.js';
import { CourseUI } from './education/course-ui.js';
import { loadCurriculum } from './education/curriculum-loader.js';
import { fetchJsonWithRetry } from './education/resource-loader.js';
import { MissionUI } from './education/mission-ui.js';
import { MIN_STARS, UNIT_COUNT, AREAS, systemForPlanet, indicesForSystem, areaOf, unitPlace, highlightSystemStars, HoverTarget } from './scene/systems.js';
import { NavigationMemory } from './scene/navigation.js';
import { sceneMetadata, planetProfile, PlanetTextures } from './scene/assets.js';
import { resolveRoute } from './routing.js';
import { GPU, color, clamp, project, transform, mesh } from './renderer.js';
import { World, RESEARCH, EDGES, box } from './scene/world.js';
import { UI, C, T, ImageCache, caseLabel, DISCIPLINE, fmtNum } from './ui/toolkit.js';
import { FrameMeter, diagnosticLines, mountDiagnostics } from './ui/diagnostics.js';
import { DOCUMENTS, docOf, docKey, printedLabel } from './documents.js';
import { pilotWorld, worldParameters } from './worlds/pilots.js';
import { planetGenomes, planetSpecies } from './worlds/surface.js';
import { placeList } from './worlds/places.js';
import { lifelessReason } from './worlds/species.js';
import { planetPhysics, physicsRows, physicsText, speciesCount, it as italian } from './worlds/planet-physics.js';
import { cleanPassages, exploration, linkOpen } from './navigation/passages.js';
import { INSTRUMENTS, BASE_ROWS, SURFACE_ROWS, instrumentForRow, cleanInstrumentSections, obtainedBy, onBoard, sectionsLeft, explorerMode } from './navigation/instruments.js';
import { SIGNATURES, VERDICTS, OUTCOMES, REFERENCE_WORLDS, SOURCES as GAIA_SOURCES, diagnosis } from './worlds/biosignatures.js';
import { cleanExpeditionLists, expeditionProgress, expeditionTotals, setSolved, solvedKey } from './navigation/expeditions.js';
import { PATH_STEPS, LAB_STAGE, cleanChapterSections, outpostReport } from './navigation/outposts.js';
import { ARM_NAMES, regionReport } from './navigation/regions.js';
import { SYNTHESIS_WORLDS, modelText } from './worlds/synthesis.js';
import { BookReader } from './book/reader.js';
import { fittedRows } from './education/course-ui.js';
import { descriptor as modelDescriptor } from './models/curriculum.js';
import { openStore, grade } from './store.js';
import { simulate, sweep, DEFAULTS } from './models/daisyworld.js';
import { rectangleModel, transformFunction, radicalValue, intersectLines, exponentialReserve, halfLife, rationalValue, rationalSignAnalysis } from './models/math.js';
const VERSION = '1.50.0-rapporto';
const canvas = document.querySelector('#gaia'), error = document.querySelector('#error'), editor = document.querySelector('#editor'), semantic = document.querySelector('#semantic');
const files = globalThis.__GAIA_FILES__ || {};
const initialHash = location.hash;
const asset = p => files[p]?.url || p;
async function json(path) {
    if (files[path]?.json)
        return structuredClone(files[path].json);
    return fetchJsonWithRetry(path);
}
function image(path) { return new Promise((yes, no) => { const i = new Image(); i.onload = () => yes(i); i.onerror = () => no(Error('Texture mancante: ' + path)); i.src = asset(path); }); }
const store = openStore();
const S = { scene: 'galaxy', selected: 7, system: systemForPlanet(7), hoveredTarget: null, observedBody: null, sector: -1, node: 0, station: 0, quality: MIN_STARS, graphics: store.data.preferences.graphics, yaw: 0, pitch: .45, distance: 60, time: 0, paused: !store.data.preferences.motion || matchMedia('(prefers-reduced-motion: reduce)').matches, scroll: 0, maxScroll: 0, reader: 'math-c08', section: 0, light: false, pdfPage: 245, pdfZoom: 1, lab: 'daisyworld', lum: 1, death: .3, sim: null, sweep: null, labValues: { p: 80, x: 13, base: 'quadratic', a: 1, b: 1, h: 0, k: 0, index: 2, mode: 'root', m1: 1, q1: 0, m2: -1, q2: 5, initial: 100, loss: .1, t: 10, zeroA: -2, zeroB: 1, pole: 3 }, labCompare: null, quizIndex: 0, quizFilter: null, quizMode: 'training', examSubmitted: false, exam: {}, quizSolution: false, catalogPage: 0, query: '', editing: null, journalTab: 'general', menu: false, settings: false, popup: null, loaded: false, contextLost: false, lastFrameMs: 0, toast: '', toastUntil: 0, focusId: null, explore: false, exploreEntry: 0, exploreTrait: 0, exploreFocus: null, exploreGoal: null, exploreTarget: null, exploreBlend: 0 };
let education, pilotEducation, atlas;
function activeEducation(){return S.scene==='pilot'?pilotEducation:education;}
function openCourse(id,stage=null){const m=moduleById(id);if(!m)return;selectIndex(m.planetIndex);education.select(id);if(stage!==null)education.setStage(stage);route('mission');}
function openExternal(url){if(!education.bundle.sources.some(s=>s.url===url))throw Error('Fonte non registrata');window.open(url,'_blank','noopener,noreferrer');}
let R, U, W, cache, data, lessons, questions, readerIndex, textureManifest, worlds = { worlds: [] }, raf, prevTime = 0, pointer = null, activeSlider = null, semanticSignature = '', textSignature = '', frameCount = 0, worker = null, meter = new FrameMeter(), diagnosticPanel = null, diagnosticTime = 0;
const navigation = new NavigationMemory(), hover = new HoverTarget();
let hoverPointer = null, touchTarget = null, book = null, passages = [], instrumentSections = {}, expeditionLists = {}, chapterSections = {};
const sectors = ['Matematica', 'Fisica', 'Chimica', 'Biologia'];
const sectorColors = DISCIPLINE;
/** Colour and label of the construction styles of stations and ships (src/craft/styles.js). */
const CRAFT_STYLE = { matematica: [DISCIPLINE[0], 'Matematica', '#f2b766'], fisica: [DISCIPLINE[1], 'Fisica', '#7fb2ff'], chimica: [DISCIPLINE[2], 'Chimica', '#b49cff'], biologia: [DISCIPLINE[3], 'Biologia', '#6fd3a0'], civile: [color('#ff9466'), 'Traffico civile', '#ff9466'], difesa: [color('#e8665a'), 'Flotta di difesa', '#e8665a'], minaccia: [color('#ffae5c'), 'Minaccia naturale', '#ffae5c'] };
const nav = [['galaxy', 'MAPPA'], ['catalogue', 'ARGOMENTI'], ['paths', 'PERCORSI'], ['lab', 'LABORATORI'], ['journal', 'DIARIO']];
const navGroups = { galaxy: ['galaxy', 'system', 'orbit', 'surface', 'outpost', 'region'], catalogue: ['catalogue', 'mission', 'briefing', 'theory', 'pdf', 'quiz', 'sources', 'research', 'pilot', 'libro'], paths: ['paths'], lab: ['lab'], journal: ['journal', 'ship', 'gaia'] };
const sceneNames = { ship: 'NAVE', gaia: 'NUCLEO DI GAIA', outpost: 'MAPPA', region: 'MAPPA', system: 'MAPPA', orbit: 'MAPPA', surface: 'MAPPA', mission: 'UNITÀ', briefing: 'UNITÀ', theory: 'TEORIA', pdf: 'DISPENSA', quiz: 'VERIFICA', sources: 'FONTI', research: 'RICERCA', pilot: 'MISSIONE' };
const areaTrail = (m, extra = []) => { const a = areaOf(m.planetIndex); return ['GALASSIA', sectors[a.sector].toUpperCase(), a.name.toUpperCase(), ...extra].join(' ▸ '); };
const labNames = { daisyworld: 'Daisyworld', transform: 'Trasformazioni', rectangle: 'Area a perimetro fissato', radical: 'Dominio dei radicali', linear: 'Due vincoli lineari', reserve: 'Riserve e decadimento', rational: 'Zeri, segni e punti esclusi' };
const labIds = Object.keys(labNames);
const sourceLabs = { 'function-transform': 'transform', 'rectangle-area': 'rectangle', 'radical-domain': 'radical', 'linear-system': 'linear', 'exponential-reserve': 'reserve', 'rational-signs': 'rational' };
function say(t) { S.toast = t; S.toastUntil = performance.now() + 6500; document.querySelector('#status').textContent = t; }
function selected() { return data.modules[S.selected] || data.modules[7]; }
function moduleById(id) { return data.modules.find(m => m.id === id); }
function selectIndex(i) { S.observedBody=null;S.selected = clamp(i, 0, UNIT_COUNT - 1); S.system = systemForPlanet(S.selected); S.scroll = 0; S.reader = selected().id; }
function route(scene, extra = {}) {
    const targetModule = Number.isInteger(extra.selected) ? data.modules[extra.selected] || selected() : selected();
    if(scene==='quiz' && targetModule.id!=='math-c08'){openCourse(targetModule.id,4);return;}
    if(scene==='briefing' && education)education.page=0;
    if (scene === 'pilot') extra = { ...extra, selected: 7, system: systemForPlanet(7), reader: 'math-c08' };
    if (scene === 'theory' && !extra.reader) {
        openTheory(targetModule.id);
        return;
    }
    const moved = navigation.move(S, scene, extra);
    // Exploration belongs to one surface: leaving it starts the next visit from the stations.
    if (moved.from !== moved.to && !extra.explore) Object.assign(S, { explore: false, exploreEntry: 0, exploreTrait: 0, exploreFocus: null, exploreGoal: null, exploreBlend: 0 });
    // The physical card belongs to one orbit view: any other view closes it.
    if (moved.from !== moved.to) Object.assign(S, { physicsFor: null, physicsPage: 0 });
    if(scene==='orbit')S.reader=selected().id;
    Object.assign(S, { scroll: 0, menu: false, settings: false, editing: null, hoveredTarget: null, observedBody:null });
    hover.clear(); touchTarget=null; if(U)U.focus=null;
    editor.blur();
    if (scene === 'lab')
        computeLab();
    updateHash('push');
    atlas?.onRoute(S.scene);
    semanticSignature = '';
}
function enterSystem(id=S.system) { route('system',{system:id}); }
function enterPlanet(index=S.selected) { route('orbit',{selected:index}); }
function backToParent() { if(S.scene==='region')route('galaxy');else if(S.scene==='outpost')route('system');else if(S.scene==='gaia')route('ship');else if(S.scene==='libro'||S.scene==='ship')route('orbit');else if(['mission','pilot'].includes(S.scene))route('briefing');else if(S.scene==='surface')route('orbit');else if(S.scene==='orbit')route('system',{system:S.system});else if(S.scene==='system')route('galaxy'); }
function changeZoom(factor) { const limits=S.scene==='system'?[17,70]:S.scene==='orbit'?[14,38]:[23,100]; S.distance=clamp(S.distance*factor,...limits); hover.clear(); }
function updateHash(mode = 'replace') {
    const q = new URLSearchParams();
    q.set('unit', selected().id);
    if(S.scene==='system')q.set('system',String(S.system));
    if (S.scene === 'theory') {
        q.set('reader', S.reader);
        q.set('section', String(S.section));
    }
    if (S.scene === 'lab')
        q.set('model', S.lab);
    if (S.scene === 'surface' && S.explore)
        q.set('mode', 'esplora');
    if (S.scene === 'libro' && S.bookSection)
        q.set('sezione', S.bookSection);
    if (S.scene === 'pdf') {
        if (S.pdfDoc === 'fis') q.set('doc', 'fis');
        q.set('page', String(S.pdfPage));
    }
    const hash = `#/${S.scene}?${q}`;
    if (location.hash !== hash)
        history[mode === 'push' ? 'pushState' : 'replaceState'](null, '', hash);
}
function parseHash() { const p = resolveRoute(location.hash, data.modules, Object.keys(lessons)); navigation.move(S,p.scene,p); hover.clear(); S.hoveredTarget=null; S.section = clamp(S.section, 0, (lessons[S.reader]?.sections.length || 1) - 1); if(education && p.courseStage!==null){education.select(selected().id);education.setStage(p.courseStage);} }
function openTheory(id = 'math-c08', section = 0) {
    const m = moduleById(id);
    if (m)
        S.selected = m.planetIndex;
    if (lessons[id]) {
        route('theory', { reader: id, section: clamp(section, 0, lessons[id].sections.length - 1) });
    }
    else if (m?.curriculum && education) { openCourse(m.id,1); }
    else if (m?.source) { openPDF(m.source.pdfPages[0], docOf(m.source)); }
    else
        route('briefing');
}
function openPDF(page, doc = 'mat') { const key = docKey(doc); route('pdf', { pdfDoc: key, pdfPage: clamp(page, 1, DOCUMENTS[key].pages), pdfZoom: 1 }); }
/** Page index of a handout: mathematics is loaded at start, physics on first use. */
const pdfIndexes = {}, pdfLoading = {};
function pageIndex(key) {
    if (pdfIndexes[key]) return pdfIndexes[key];
    if (!pdfLoading[key]) pdfLoading[key] = json(DOCUMENTS[key].index).then(v => { pdfIndexes[key] = v; }).catch(() => { pdfLoading[key] = null; say('Le pagine della dispensa non si sono caricate. Riprova.'); });
    return null;
}
function download(filename, value, type = 'application/json') { const blob = new Blob([typeof value === 'string' ? value : JSON.stringify(value, null, 2)], { type }); const a = document.createElement('a'), u = URL.createObjectURL(blob); a.href = u; a.download = filename; a.click(); setTimeout(() => URL.revokeObjectURL(u), 30000); say('File esportato: ' + filename); }
async function copyText(text) {
    try {
        if (!navigator.clipboard?.writeText)
            throw new Error('Clipboard non disponibile');
        await navigator.clipboard.writeText(text);
        say('Testo copiato.');
    }
    catch {
        editor.value = text;
        editor.focus();
        editor.select();
        let copied = false;
        try {
            copied = document.execCommand('copy');
        }
        catch { /* export remains available */ }
        editor.blur();
        if (copied)
            say('Testo copiato tramite editor locale.');
        else {
            download('GAIA_Testo.txt', text, 'text/plain;charset=utf-8');
            say('Copia non autorizzata dal browser: testo esportato in un file.');
        }
    }
}
function computeLab() {
    if (S.lab === 'daisyworld') {
        S.sim = simulate({ luminosity: S.lum, death: S.death });
        if (!S.sweep || S.sweepDeath !== S.death) {
            S.sweep = sweep({ death: S.death });
            S.sweepDeath = S.death;
        }
    }
}
function saveScenario() { const label = labNames[S.lab], snapshot = S.lab === 'daisyworld' ? { parameters: S.sim.parameters, final: S.sim.final } : structuredClone(S.labValues); S.labCompare = { lab: S.lab, data: snapshot }; store.data.scenarios.push({ label, lab: S.lab, data: snapshot, time: new Date().toISOString() }); store.data.scenarios = store.data.scenarios.slice(-30); store.save(); say('Scenario A conservato. Modifica un parametro per confrontare B.'); }
function exportLab(csv = false) {
    if (S.lab === 'daisyworld') {
        if (csv) {
            const rows = ['t,temperature_C,black_fraction,white_fraction,ground_fraction,albedo,bare_temperature_C'];
            for (const p of S.sim.trace)
                rows.push([p.t, p.temperatureC, p.black, p.white, p.ground, p.albedo, p.bareC].join(','));
            download('GAIA_Daisyworld.csv', rows.join('\n'), 'text/csv');
        }
        else
            download('GAIA_Daisyworld.json', S.sim);
    }
    else
        download('GAIA_' + S.lab + '.json', { lab: S.lab, parameters: S.labValues, scenarioA: S.labCompare });
}
function title(kicker, heading, sub) {
    let trail = String(kicker);
    while (trail.includes(' ▸ ') && R.textWidth(trail.toUpperCase(), 'mini', 1.4) > R.w - 72) trail = trail.slice(trail.indexOf(' ▸ ') + 3);
    U.tag(trail, 36, 110, C.lime);
    U.wrap(caseLabel(heading), 34, 140, R.w - 68, C.pale, R.w < 700 ? 25 : 39, 2, R.w < 700 ? 'sub' : 'head');
    if (sub)
        U.wrap(sub, 35, 190, Math.min(R.w - 70, 680), C.muted, 24, 2);
}
function wrapClipText(s, x, y, w, style = 'body', c = C.muted, max = 3) { return U.wrap(s, x, y, w, c, style === 'body' ? 25 : 19, max, style); }
function coverage(m) { if(m.curriculum)return m.source?'PERCORSO GUIDATO + FONTE PDF':'PERCORSO GUIDATO 3D';return m.status === 'planned' ? 'IN PREPARAZIONE' : m.lesson ? (['theory-complete', 'full-theory'].includes(m.coverage) ? 'TEORIA WEB' : 'LEZIONE WEB + FONTE') : 'DISPENSA COMPLETA'; }
/** Opens the book chapter of a unit, or flies to its planet when the chapter is not written yet. */
function openChapter(id, section = null) { const m = moduleById(id); if (!m) return; if (book?.has(id)) route('libro', { selected: m.planetIndex, bookSection: section }); else { route('orbit', { selected: m.planetIndex }); say('Capitolo in preparazione: ecco il pianeta di «' + m.title + '».'); } }
function buttonsModule(m, x, y, w) {
    // Units with a book chapter: the chapter comes first, unit and card share the second row.
    if (book?.has(m.id)) { U.button('read-chapter', 'LEGGI IL CAPITOLO', x, y, w, 42, () => openChapter(m.id), { active: true }); U.button('read-unit', 'APRI L’UNITÀ', x, y + 51, (w - 8) / 2, 42, () => m.curriculum ? openCourse(m.id) : openTheory(m.id), { disabled: m.status === 'planned' }); U.button('briefing', 'SCHEDA', x + (w + 8) / 2, y + 51, (w - 8) / 2, 42, () => route('briefing')); return; }
    U.button('read-unit', m.curriculum ? 'APRI L’UNITÀ' : m.lesson ? 'LEGGI LA TEORIA' : 'CONSULTA LA FONTE', x, y, w, 42, () => m.curriculum?openCourse(m.id):openTheory(m.id), { active: true, disabled: m.status === 'planned' }); U.button('briefing', 'SCHEDA DELL’UNITÀ', x, y + 51, w, 42, () => route('briefing'));
}
function common() {
    const w = R.w, h = R.h, mobile = w < 850;
    U.begin();
    R.rect(0, 0, w, mobile ? 98 : 82, color(T.bg, .97));
    R.line([0, mobile ? 97.5 : 81.5], [w, mobile ? 97.5 : 81.5], color(T.line, .9), 1);
    U.text('GAIA', 26, 12, mobile ? 'head' : 'number', C.pale, { track: 4 });
    if (!mobile)
        U.tag('BEYOND KNOWLEDGE', 28, 63, C.lime);
    if (mobile) {
        U.button('menu', 'MENU', w - 90, 16, 66, 35, () => S.menu = !S.menu);
        U.text(nav.find(x => x[0] === S.scene)?.[1] || sceneNames[S.scene] || S.scene.toUpperCase(), 28, 69, 'mini', C.lime, { track: 1.1 });
        U.button('settings', '⚙', w - 136, 16, 38, 35, () => S.settings = !S.settings);
    }
    else {
        let x = 220;
        for (const [id, label] of nav) {
            const ww = R.textWidth(caseLabel(label), 'mini') + 28;
            if (x + ww > w - 75)
                break;
            U.button('nav-' + id, label, x, 23, ww, 36, () => route(id), { active: navGroups[id].includes(S.scene) });
            x += ww + 8;
        }
        U.button('settings', '⚙', w - 60, 23, 38, 36, () => S.settings = !S.settings);
    }
    R.rect(0, h - 36, w, 36, color(T.bg, .97));
    R.line([0, h - 35.5], [w, h - 35.5], color(T.line, .9), 1);
    U.text('GAIA · Atlante scientifico', 26, h - 26, 'micro', C.dim);
}
/** Text screens sit on a near-opaque veil; the 3D graph of a unit, when visible, keeps a window. */
function scrim() {
    if (!['mission', 'pilot', 'paths', 'catalogue', 'briefing', 'theory', 'pdf', 'journal', 'sources'].includes(S.scene)) return;
    const hole = S.scene === 'mission' ? education.scene.rect : S.scene === 'pilot' ? pilotEducation.scene?.rect : null, c = color(T.scrim, .9), w = R.w, h = R.h;
    if (!hole) { R.rect(0, 0, w, h, c); return; }
    R.rect(0, 0, w, hole.y, c); R.rect(0, hole.y + hole.h, w, h - hole.y - hole.h, c);
    R.rect(0, hole.y, hole.x, hole.h, c); R.rect(hole.x + hole.w, hole.y, w - hole.x - hole.w, hole.h, c);
}
function galaxyUI() { atlas.draw(U); }
/** State of the prototype world of the selected planet: laboratory parameters of its unit, or the
 * session copy changed from the planet panel, which never writes into the laboratory record. */
const worldSession = { params: {}, x: {} };
function worldTick() {
    exploreTick();
    const unit = selected()?.id, pw = ['surface', 'orbit'].includes(S.scene) ? pilotWorld(unit) : null;
    S.worldCamera = S.scene === 'surface' && pw?.camera ? pw.camera : null;
    // On phones the camera looks at the phenomenon instead of the station complex.
    S.worldFocus = S.scene === 'surface' && pw?.focus ? pw.focus : null;
    if (!pw) { S.worldState = null; S.worldTint = null; return; }
    worldSession.params[unit] ||= worldParameters(unit, store.data.courses?.[unit]);
    if (worldSession.x[unit] === undefined) worldSession.x[unit] = pw.x?.value ?? null;
    S.worldState = pw.state(worldSession.params[unit], worldSession.x[unit], S.time, S.paused);
    S.worldTint = pw.orbitTint ? pw.orbitTint(S.worldState) : null;
}
const worldEntry = id => worlds.worlds.find(w => w.unit === id) || null;
// Exploration of a generated surface: species and places of the planet, registered in the diary.
const PLACE_KINDS = { vetta: 'Luogo · punto più alto', forma: 'Luogo · forma del paesaggio', costa: 'Luogo · costa', evento: 'Luogo · fenomeno raro' };
const exploreReady = () => W?.surface?.index === S.selected && Array.isArray(W.surface.species);
function exploreEntries() {
    if (!exploreReady()) return [];
    const s = W.surface, pop = W.population || [];
    return [...s.species.map((sp, k) => ({ type: 'species', index: k, id: sp.id, data: sp, at: pop[k]?.centre || null })), ...s.places.map((p, k) => ({ type: 'place', index: k, id: p.id, data: p, at: p.position }))];
}
const exploreRecord = index => store.data.explore[String(index)] || { s: [], l: [] };
const isRegistered = (e, rec) => (e.type === 'species' ? rec.s : rec.l).includes(e.id);
function selectEntry(i, fly = true) {
    const list = exploreEntries(); if (!list.length) return;
    S.exploreEntry = ((i % list.length) + list.length) % list.length; S.exploreTrait = 0;
    const e = list[S.exploreEntry]; if (fly && e.at) S.exploreGoal = [e.at[0], e.at[2]];
}
function selectTarget(t) { const k = exploreEntries().findIndex(e => e.type === t.type && e.index === t.index); if (k >= 0) selectEntry(k); }
function startExplore() { S.explore = true; S.exploreGoal = null; updateHash(); }
function stopExplore() { S.explore = false; updateHash(); }
function register(e) {
    const key = String(S.selected), rec = store.data.explore[key] ||= { s: [], l: [] }, list = e.type === 'species' ? rec.s : rec.l;
    if (list.includes(e.id)) return;
    list.push(e.id); rec.at = new Date().toISOString(); store.save();
    say((e.type === 'species' ? 'Specie registrata: ' : 'Luogo registrato: ') + e.data.name);
}
function exploreTick() {
    if (S.scene !== 'surface') { S.exploreTarget = null; S.exploreBlend = 0; return; }
    // The camera blends between the station view and the exploration view in about a second (time constant 0.38 s).
    const k = S.paused ? 1 : Math.min(1, (S.lastFrameMs || 16) / 380), want = S.explore ? 1 : 0, b = S.exploreBlend || 0;
    S.exploreBlend = Math.abs(want - b) < .003 ? want : b + (want - b) * k;
    if (!S.explore) { S.exploreTarget = null; if (!S.exploreBlend) { S.exploreFocus = null; S.exploreGoal = null; } return; }
    // A new exploration (button or link) starts from the station view and flies to the current entry.
    if (!S.exploreGoal) { if (!exploreReady()) return; S.exploreFocus ||= R.w < 850 ? [-4, 8] : [2, 2]; S.exploreGoal = [...S.exploreFocus]; selectEntry(S.exploreEntry); }
    S.exploreFocus = S.exploreFocus.map((v, i) => v + (S.exploreGoal[i] - v) * k);
    const e = exploreEntries()[S.exploreEntry]; S.exploreTarget = e ? { type: e.type, index: e.index } : null;
}
function moveExplore(forward, right) {
    const a = .6 + S.yaw * .5, f = [-Math.sin(a), -Math.cos(a)], r = [-f[1], f[0]];
    S.exploreGoal = (S.exploreGoal || [2, 2]).map((v, i) => clamp(v + (f[i] * forward + r[i] * right) * 6, -85, 85));
}
function worldPanel(m, mobile) {
    const pw = pilotWorld(m.id), entry = worldEntry(m.id), st = S.worldState; if (!pw || !entry || !st) return;
    const w = R.w, tint = sectorColors[m.sector], controls = modelDescriptor(m.id).controls.map(c => ({ ...c, id: 'world-param-' + c.key, get: () => worldSession.params[m.id][c.key], set: v => { worldSession.params[m.id] = { ...worldSession.params[m.id], [c.key]: v }; } }));
    if (pw.x) controls.push({ ...pw.x, key: 'x', id: 'world-x', get: () => worldSession.x[m.id], set: v => { worldSession.x[m.id] = v; } });
    // On phones the controls share one row and only the first line of numbers is shown.
    const px = mobile ? 18 : 35, pw2 = mobile ? w - 36 : Math.min(420, w - 430), py = mobile ? 196 : 250, lines = pw.lines(st), rowsAvail = mobile ? 2 : 6;
    const textRows = (mobile ? lines.slice(0, 1) : lines).flatMap(t => fittedRows(R, [t], pw2 - 36, 'micro').filter(Boolean)).slice(0, rowsAvail), ph = 66 + textRows.length * 18 + (mobile ? 44 : controls.length * 40) + 8;
    U.panel(px, py, pw2, ph, tint, .9);
    U.tag('Fenomeno del pianeta · prototipo', px + 18, py + 16, tint);
    U.text(entry.phenomenon, px + 18, py + 36, 'sub', C.pale);
    textRows.forEach((t, i) => U.text(t, px + 18, py + 66 + i * 18, 'micro', i < 2 ? C.pale : C.muted));
    controls.forEach((c, i) => {
        const half = (pw2 - 36) / 2, cx = mobile ? px + 18 + i * (half + 0) : px + 18, cw = mobile ? half - 6 : pw2 - 36, y = py + 66 + textRows.length * 18 + 4 + (mobile ? 0 : i * 40), v = c.get(), step = c.step, unitLabel = c.unit && c.unit !== '1' ? ' ' + c.unit : '';
        if (!mobile) U.text(c.label, cx, y + 10, 'micro', C.muted);
        U.text((mobile ? (pw.short?.[c.key] || c.label) + ' = ' : '') + fmtNum(v, 3) + (mobile ? '' : unitLabel), cx + cw - 94, y + 9, mobile ? 'micro' : 'mini', C.pale, { align: 'right' });
        for (const [j, dir] of [[0, -1], [1, 1]]) {
            U.button(c.id + '-' + (dir < 0 ? 'down' : 'up'), dir < 0 ? '−' : '+', cx + cw - 82 + j * 44, y, 38, 32, () => c.set(clamp(Number((v + dir * step).toPrecision(12)), c.min, c.max)), { disabled: dir < 0 ? v <= c.min : v >= c.max });
            U.buttons.at(-1).label = (dir < 0 ? 'Diminuisci ' : 'Aumenta ') + c.label;
        }
    });
    for (const l of W.worldLabels || []) { const [x, y, depth] = l.screen; if (depth <= 0 || x < 40 || x > w - 40 || y < 240 || y > R.h - 100) continue; const t = `${fmtNum(l.T - 273.15, 3)} °C · blu ${Math.round(l.f * 100)}%`, tw = R.textWidth(t, 'micro') + 14; R.roundRect(x - tw / 2, y - 10, tw, 20, 6, color(T.bg, .88)); U.text(t, x, y - 6, 'micro', C.pale, { align: 'center' }); }
}
// Desktop surfaces can have pale skies: a soft corner shade keeps the title readable.
function titleShade(x1 = 760, y0 = 82, y1 = 262) { if (R.w >= 850) R.shadeRect(0, y0, x1, y1 - y0, color(T.bg, .64), (u, v) => (1 - v ** 3) * (1 - u ** 3), 10); }
/** Dark band fading downwards behind the screen title on phones, where it overlaps the 3D scene. */
function titleFade(y0 = 90, y1 = 290) { if (R.w >= 850) return; const n = 22; for (let i = 0; i < n; i++) R.rect(0, y0 + (y1 - y0) * i / n, R.w, (y1 - y0) / n + 1, color(T.bg, .88 * (1 - (i / n) ** 2))); }
/** Small diamond on each station of the open system while it is still small on screen, in the colour of
 * its construction style, with a slow pulse while it produces; ships are lights in the scene and get a ring
 * only when hovered. The hovered station or ship shows its name. */
function craftMarkers() {
    for (const p of W.projections) {
        if (p.type !== 'craft' || p.depth <= 0 || !Number.isFinite(p.x) || p.apparent > 10 || p.y < 235 || p.y > R.h - 115) continue;
        const [tint] = CRAFT_STYLE[p.entry.style], hot = S.hoveredTarget?.type === 'craft' && S.hoveredTarget.index === p.index, r = hot ? 7 : 5;
        if (p.entry.kind === 'minaccia') {
            // A natural threat (1.48.0): a pulsing warning triangle.
            const k = .7 + .3 * Math.sin(S.time * 6), e = r + 3, tri = [[p.x, p.y - e], [p.x + e, p.y + e * .8], [p.x - e, p.y + e * .8]];
            R.poly([[p.x, p.y], ...tri, tri[0]], color(CRAFT_STYLE.minaccia[2], .35 + .4 * k)); R.polyline([...tri, tri[0]], tint, 1.6);
        }
        else if (p.entry.kind === 'nave') {
            // A moving ship leaves a short wake towards where it was a moment ago.
            if (p.tail && Math.hypot(p.tail[0] - p.x, p.tail[1] - p.y) > 2) R.line(p.tail, [p.x, p.y], color(CRAFT_STYLE[p.entry.style][2], .5), 2);
            R.roundRect(p.x - 2.5, p.y - 2.5, 5, 5, 2.5, tint);
            if (hot) R.roundRect(p.x - 9, p.y - 9, 18, 18, 9, color('#000000', 0), tint);
        }
        else {
            const q = [[p.x, p.y - r], [p.x + r, p.y], [p.x, p.y + r], [p.x - r, p.y]];
            if (p.active && !S.paused) { const k = (S.time * .6 + p.index * .17) % 1, e = r + 3 + k * 9, ring = [[p.x, p.y - e], [p.x + e, p.y], [p.x, p.y + e], [p.x - e, p.y]]; R.polyline([...ring, ring[0]], color(CRAFT_STYLE[p.entry.style][2], .55 * (1 - k)), 1.2); }
            R.poly([[p.x, p.y], ...q, q[0]], tint); R.polyline([...q, q[0]], color(T.bg, .9), 1.2);
        }
        if (hot && R.w >= 850) { const tw = R.textWidth(p.entry.name, 'micro') + 16; R.roundRect(p.x + 12, p.y - 10, tw, 20, 6, color(T.bg, .9)); U.text(p.entry.name, p.x + 20, p.y - 7, 'micro', C.pale); }
    }
}
/** Number badge on each unit planet, matching the list; ring and name on the selected or hovered one. */
function planetBadges(system) {
    const hovered = /^system-planet-(\d+)$/.exec(U.hover || '')?.[1], tint = sectorColors[system.sector], placed = [];
    for (const p of W.projections) {
        if (p.type !== 'planet') continue;
        const order = system.planets.indexOf(p.index), on = p.index === S.selected, hot = String(p.index) === hovered || S.hoveredTarget?.type === 'planet' && S.hoveredTarget.index === p.index;
        if (order < 0 || !Number.isFinite(p.x) || p.depth <= 0) continue;
        // First free corner around the planet, so badges of neighbouring planets do not overlap.
        const r = Math.max(10, p.r * .9), corners = [[r * .72, -r * .72 - 22], [-r * .72 - 22, -r * .72 - 22], [r * .72, r * .72], [-r * .72 - 22, r * .72]];
        const [bx, by] = corners.map(([dx, dy]) => [p.x + dx, p.y + dy]).find(([x, y]) => !placed.some(q => Math.abs(q[0] - x) < 26 && Math.abs(q[1] - y) < 26)) || [p.x + corners[0][0], p.y + corners[0][1]];
        placed.push([bx, by]);
        if (on || hot) R.roundRect(p.x - r - 6, p.y - r - 6, 2 * r + 12, 2 * r + 12, r + 6, color('#000000', 0), on ? tint : color(T.line, 1));
        R.roundRect(bx, by, 22, 22, 11, on ? tint : color(T.raised, .95), on ? null : tint);
        U.text(String(order + 1), bx + 11, by + 4, 'micro', on ? color(T.ink) : C.pale, { align: 'center' });
        // One green mark under the number for each expedition completed on the planet.
        expeditionsOf(p.index).filter(x => x.done).forEach((x, k) => R.roundRect(bx + 2 + k * 7, by + 25, 5, 5, 2.5, C.lime));
        if ((on || hot) && R.w >= 850) { const name = data.modules[p.index].title, tw = R.textWidth(name, 'micro') + 16; R.roundRect(bx + 28, by + 1, tw, 20, 6, color(T.bg, .9)); U.text(name, bx + 36, by + 4, 'micro', on ? C.pale : C.muted); }
    }
}
function systemPanel(system){ const mobile=R.w<850; return mobile?null:{x:32,y:300,w:268,h:64+system.planets.length*44}; }
function systemUI() {
    const w=R.w,h=R.h,mobile=w<850,system=W.systems[S.system],m=selected(),observed=S.observedBody===null?null:system.bodies[S.observedBody],place=unitPlace(S.selected),tint=sectorColors[system.sector];
    if(W.cameraProgress===1){planetBadges(system);craftMarkers();}titleFade();
    // Short phones drop the subtitle and the description, and the unit panel stays above the bottom buttons.
    const short=mobile&&h<700;
    title(areaTrail(m),system.name,short?'':mobile?system.planets.length+(w<360?' unità.':' unità · orbite alle distanze fisiche.'):system.planets.length+' unità di '+system.discipline.toLowerCase()+', numerate in ordine di studio. Le orbite seguono la distanza fisica dalla stella; gli altri pianeti sono di contorno.');
    const px=mobile?18:w-337,pw=mobile?w-36:304,ph=mobile?(short?176:222):365,py=mobile?h-ph-100:245;
    U.panel(px,py,pw,ph,tint,.80);U.tag(observed?'PIANETA DI CONTORNO':'UNITÀ '+place.position+' DI '+place.count,px+18,py+19,tint);
    wrapClipText(observed?observed.profile.name:m.title,px+18,py+50,pw-36,'sub',C.pale,2);wrapClipText(observed?'NESSUNA UNITÀ':planetProfile(S.selected).name+' · '+coverage(m),px+18,py+100,pw-36,'micro',C.lime,1);
    if(!mobile)wrapClipText(observed?'Un pianeta del sistema senza unità di studio.':m.description,px+18,py+130,pw-36,'body',C.muted,5);
    else if(!short)wrapClipText(observed?'Pianeta senza unità di studio.':m.description,px+18,py+124,pw-36,'mini',C.muted,2);
    const bw=(pw-38)/2;
    U.button('orbit-unit','PIANETA 3D',px+16,py+ph-56,bw,40,()=>enterPlanet(),{disabled:!!observed||W.cameraProgress<1});
    const chapter=!observed&&!!book?.has(m.id);U.button('system-open-unit',chapter?'LEGGI IL CAPITOLO':'APRI L’UNITÀ',px+22+bw,py+ph-56,bw,40,()=>chapter?openChapter(m.id):openCourse(m.id),{active:!observed,disabled:!!observed});
    const list=systemPanel(system);
    // The research outpost of the area: built with its first completed expedition (src/navigation/outposts.js).
    const built=outpostOf(S.system).built,outpost=(x,y,bw3,label)=>{U.button('system-outpost',label,x,y,bw3,mobile?32:38,()=>route('outpost'),{active:built,small:mobile});U.buttons.at(-1).label=built?'Entra nell’avamposto di ricerca dell’area':'Apri il cantiere dell’avamposto: si costruisce con la prima spedizione completata nell’area';};
    if(list){
        U.panel(list.x,list.y,list.w,list.h,tint,.48);U.tag('UNITÀ DELL’AREA',list.x+18,list.y+19,tint);
        system.planets.forEach((index,i)=>{const unit=data.modules[index];U.button('system-planet-'+index,(i+1)+'. '+unit.title,list.x+17,list.y+46+i*44,list.w-34,36,()=>{selectIndex(index);S.observedBody=null;},{active:S.selected===index,disabled:W.cameraProgress<1});});
        outpost(list.x,list.y+list.h+12,list.w,built?'AVAMPOSTO DI RICERCA':'CANTIERE DELL’AVAMPOSTO');
    }else{
        outpost(w-18-104,239,104,built?'AVAMPOSTO':'CANTIERE');
        const n=system.planets.length,bw2=(w-36-112-(n-1)*4)/n;system.planets.forEach((index,i)=>U.button('system-planet-'+index,String(i+1),18+i*(bw2+4),239,bw2,32,()=>{selectIndex(index);touchTarget={type:'planet',index};},{active:S.selected===index,small:true,disabled:W.cameraProgress<1}));
    }
    U.button('back-galaxy',mobile&&w<360?'MAPPA':'TORNA ALLA MAPPA',mobile?18:35,h-88,mobile?Math.min(180,w-154-26):220,39,()=>route('galaxy'));
    U.button('system-zoom-in','+',mobile?w-154:w/2-66,h-77,34,30,()=>changeZoom(.86));U.button('system-zoom-out','−',mobile?w-112:w/2-26,h-77,34,30,()=>changeZoom(1/.86));
    if(!mobile)U.button('system-reset','CENTRA',w/2+14,h-77,80,30,()=>{S.yaw=0;S.pitch=.48;S.distance=34;},{small:true});
    newsTicker();
}
/** Room for the news of the system under the unit panel on desktop, up to 200 px high; none when the
 * window leaves less than 90 px. */
function tickerBox(){const w=R.w,h=Math.min(200,R.h-115-622);return w>=850&&h>=90?{x:w-337,y:622,w:304,h}:null;}
/** «Cronaca del sistema»: the last events of the economy of the open system (src/craft/economy.js), newest
 * first, with how long ago they happened. */
function newsTicker(){
    const box=tickerBox(),life=W.craft?.system===S.system?W.craft.life:null;if(!box||!life||W.cameraProgress<1)return;
    U.panel(box.x,box.y,box.w,box.h,C.amber,.62);const head=life.helpers?`CRONACA DEL SISTEMA · ${life.helpers} DRONI LIBERATI`:'CRONACA DEL SISTEMA';U.tag(R.textWidth(head,'micro',.7)>box.w-36?`CRONACA · ${life.helpers} DRONI LIBERATI`:head,box.x+18,box.y+16,C.amber);
    if(!life.news.length){U.wrap('Ancora nessun evento: le stazioni avviano la produzione.',box.x+18,box.y+42,box.w-36,C.muted,15,2,'micro');return;}
    // Newest first, each item whole on up to three lines, as many as the box holds.
    let y=box.y+42;
    for(const [k,item] of life.news.slice().reverse().entries()){
        const lines=R.multilineCount(item.text,box.w-80,'micro',3);if(y+lines*15>box.y+box.h-8)break;
        const age=Math.max(0,life.time-item.time),when=age<10?'ora':age<60?Math.round(age)+' s':Math.round(age/60)+' min';
        U.text(when,box.x+18,y,'micro',k?C.dim:C.amber);U.wrap(item.text,box.x+62,y,box.w-80,k?C.muted:C.pale,15,3,'micro');y+=lines*15+7;
    }
}
function sceneBlocked(x,y) {
    if(S.scene==='galaxy'&&atlas)return atlas.blocked(x,y);
    const w=R.w,h=R.h,mobile=w<850;
    if(S.menu||S.settings||S.editing||y<235||y>h-115)return true;
    if(mobile)return y<278||y>h-306;
    if(['galaxy','system'].includes(S.scene)){const list=S.scene==='system'?systemPanel(W.systems[S.system]):null;const news=S.scene==='system'?tickerBox():null;return (x>=w-337&&x<=w-33&&y>=245&&y<=610)||(!!news&&x>=news.x&&x<=news.x+news.w&&y>=news.y&&y<=news.y+news.h)||(!!list&&x>=list.x&&x<=list.x+list.w&&y>=list.y&&y<=list.y+list.h);}
    return false;
}
function sceneActions() {
    if(S.menu||S.settings||W.cameraProgress<1)return [];
    if(S.scene==='galaxy'&&atlas)return atlas.actions();
    if(S.scene==='system')return W.systems[S.system].planets.map((index,i)=>({id:'scene-planet-'+index,label:'Pianeta dell’unità '+(i+1)+': '+data.modules[index].title,action:()=>enterPlanet(index)}));
    return [];
}
function drawHover() {
    if(S.scene==='galaxy')return;
    if(!['galaxy','system'].includes(S.scene)){S.hoveredTarget=null;hover.clear();return;}
    const focus=/^scene-(system|planet)-(\d+)$/.exec(U.focus||'');let hit=null;
    if(focus&&focus[1]===(S.scene==='galaxy'?'system':'planet')&&!S.menu&&!S.settings){const index=Number(focus[2]);hit=W.projections.find(p=>p.type===focus[1]&&p.index===index)||{type:focus[1],index,x:R.w*.5,y:R.h*.45,depth:1,r:14};}
    else if(touchTarget)hit=W.projections.find(p=>p.type===touchTarget.type&&p.index===touchTarget.index)||touchTarget;
    else if(hoverPointer){const {x,y}=hoverPointer;hit=hover.update(W.pick(x,y,S),performance.now(),!!pointer||sceneBlocked(x,y)||!!U.hit(x,y)||W.cameraProgress<1);}
    else hover.clear();
    if(W.cameraProgress<1||S.menu||S.settings)hit=null;
    S.hoveredTarget=hit;
    if(hoverPointer)canvas.style.cursor=U.hit(hoverPointer.x,hoverPointer.y)?'pointer':hit?'pointer':'grab';
    if(!hit)return;
    const p=W.projections.find(p=>p.index===hit.index&&p.type===hit.type)||hit;
    if(p.depth>0&&p.x>=0&&p.x<R.w&&p.y>=235&&p.y<R.h-115){R.hexagon(p.x,p.y,Math.max(13,p.r+4),color('#061f28',.05),C.lime);}
    if(R.w<850)return;
    const pw=336,ph=190;
    let x=(p.x||R.w*.5)+22,y=(p.y||R.h*.45)-60;
    if(x+pw>R.w-25)x=(p.x||R.w*.5)-pw-22;
    x=clamp(x,20,R.w-pw-20);y=clamp(y,238,R.h-ph-118);
    U.panel(x,y,pw,ph,C.lime,.97);
    if(hit.type==='system'){
        const system=W.systems[hit.index];U.tag(system.discipline+' · '+system.name,x+16,y+16,sectorColors[system.sector]);U.text(system.planets.length+' unità in ordine di studio',x+16,y+45,'mini',C.pale);
        wrapClipText(system.description,x+16,y+73,pw-32,'mini',C.muted,4);
        U.text('CLIC PER SCEGLIERE L’AREA',x+16,y+ph-26,'micro',C.lime);
    }else if(hit.type==='craft'){
        const e=p.entry||hit.entry,lines=p.lines||hit.lines||[],[tint,label]=CRAFT_STYLE[e.style];U.tag((e.kind==='nave'?'NAVE':e.kind==='minaccia'?'MINACCIA':'STAZIONE')+' · '+label.toUpperCase(),x+16,y+16,tint);U.text(e.name,x+16,y+45,'mini',C.pale);
        lines.forEach((t,k)=>U.text(t,x+16,y+71+k*20,'micro',k?C.muted:C.amber));
        wrapClipText(e.about||(e.typeName+', lunga '+e.size+'.'),x+16,y+71+lines.length*20+6,pw-32,'micro',C.muted,2);
        U.text(e.typeName.toUpperCase(),x+16,y+ph-26,'micro',C.dim);
    }else if(hit.type==='ambient'){
        const body=W.systems[S.system].bodies[hit.index];U.tag('CORPO '+String(body.slot+1).padStart(2,'0')+' / '+body.profile.name.toUpperCase(),x+16,y+16,C.muted);
        U.text('Pianeta di contorno',x+16,y+45,'mini',C.pale);wrapClipText(body.profile.name+' con '+body.moons+' lune'+(body.rings?' e anelli':'')+', a '+fmtNum(body.a,2)+' UA dalla stella. Non contiene unità di studio.',x+16,y+73,pw-32,'mini',C.muted,4);
        U.text('NESSUNA UNITÀ',x+16,y+ph-26,'micro',C.dim);
    }else{
        const m=data.modules[hit.index],place=unitPlace(hit.index);U.tag('UNITÀ '+place.position+' DI '+place.count,x+16,y+16,sectorColors[m.sector]);U.text(m.title,x+16,y+45,'mini',C.pale);
        wrapClipText(m.description,x+16,y+73,pw-32,'mini',C.muted,4);
        U.text('CLIC PER AVVICINARTI AL PIANETA',x+16,y+ph-26,'micro',C.lime);
    }
}
const physicsOpen = () => S.scene === 'orbit' && S.physicsFor === S.selected;
/** Physical card of the planet in orbit: star and orbit, then the four spheres. Two columns on desktop,
 * two pages on phones. */
/** Which card rows the ship can show now: all of them outside the explorer mode. The presence of life is
 * shown once the explorer has landed on the planet. */
function cardReveal(index = S.selected) {
    if (!explorerMode(store.data)) return null;
    const board = onBoard(store.data, instrumentSections), down = landed(index);
    return label => BASE_ROWS.includes(label) || board.has(instrumentForRow(label)?.id) || (down && SURFACE_ROWS.includes(label));
}
/** Whether the explorer has landed on planet `index` (a registered species also counts, from older saves). */
const landed = index => { const r = store.data.explore[String(index)]; return !!(r && (r.v === 1 || r.s?.length)); };
/** Records the landing on planet `index`. */
function markLanded(index) {
    const key = String(index);
    if (store.data.explore[key]?.v === 1) return;
    (store.data.explore[key] ||= { s: [], l: [] }).v = 1; store.save();
}
/** Logs in the diary which instruments have measured the planet in orbit. */
function logMeasurements(index) {
    if (!explorerMode(store.data)) return;
    const board = [...onBoard(store.data, instrumentSections)], key = String(index), rec = store.data.explore[key];
    if (!board.length || board.every(id => rec?.m?.includes(id))) return;
    const r = store.data.explore[key] ||= { s: [], l: [] };
    r.m = INSTRUMENTS.map(i => i.id).filter(id => board.includes(id) || r.m?.includes(id)); store.save();
}
function physicsPanel(m, mobile) {
    const w = R.w, h = R.h, tint = sectorColors[m.sector], reveal = cardReveal(), groups = physicsRows(planetPhysics()[S.selected], speciesCount(S.selected), reveal);
    logMeasurements(S.selected);
    const pw = mobile ? w - 36 : Math.min(720, w - 420), px = mobile ? 18 : w - pw - 36, py = mobile ? 108 : 247, colW = mobile ? pw - 36 : (pw - 60) / 2, line = 18;
    // Narrow phones put each label above its value.
    const stacked = colW < 300, labelW = stacked ? 0 : mobile ? 126 : 130, rowH = v => (stacked ? line : 0) + R.multilineCount(v, colW - labelW, 'micro') * line + 6;
    const groupH = ([, rows]) => 26 + rows.reduce((s, [, v]) => s + rowH(v), 0) + 8, height = col => col.reduce((y, g) => y + groupH(g), 0);
    // Desktop: two columns. Phones: as many groups per page as the screen holds.
    let pages = [groups.slice(0, 2), groups.slice(2)];
    if (mobile) {
        const room = h - py - 100 - 58 - 52, pack = limit => { const out = [[]]; for (const g of groups) { if (out.at(-1).length && height(out.at(-1)) + groupH(g) > limit) out.push([]); out.at(-1).push(g); } return out; };
        // As few pages as the screen allows, then balanced so the last page is not nearly empty.
        const n = pack(room).length; pages = pack(room);
        for (let limit = height(groups) / n; limit < room; limit += 12) { const p = pack(limit); if (p.length === n) { pages = p; break; } }
    }
    const page = Math.min(S.physicsPage || 0, pages.length - 1), columns = mobile ? [pages[page]] : pages;
    const ph = 58 + Math.max(...columns.map(height)) + (mobile ? 52 : 6);
    U.panel(px, py, pw, ph, tint, .92);
    // On the narrowest phones the shorter heading leaves room for the ship button.
    U.tag(pw < 330 ? 'Dati fisici' : 'Dati fisici del pianeta', px + 18, py + 18, tint);
    if (reveal && !mobile) U.text(`Strumenti a bordo: ${onBoard(store.data, instrumentSections).size} di ${INSTRUMENTS.length}`, px + pw - 118, py + 19, 'micro', C.muted, { align: 'right' });
    U.button('physics-ship', 'NAVE', px + pw - 104, py + 8, 86, 32, () => route('ship'), { small: true }); U.buttons.at(-1).label = 'Apri la nave: strumenti a bordo e da ottenere';
    columns.forEach((col, k) => {
        let x = px + 18 + k * (colW + 24), y = py + 48;
        for (const [heading, rows] of col) {
            U.text(heading, x, y, 'mini', C.amber); y += 26;
            for (const [label, value, hidden] of rows) { U.text(label, x, y, 'micro', C.muted); if (stacked) y += line; y += U.wrap(value, x + labelW, y, colW - labelW, hidden ? C.dim : C.pale, line, 6, 'micro') * line + 6; }
            y += 8;
        }
    });
    if (mobile) {
        const by = py + ph - 46;
        U.text((page + 1) + ' di ' + pages.length, px + pw / 2, by + 11, 'micro', C.muted, { align: 'center' });
        U.button('physics-prev', 'INDIETRO', px + 16, by, 96, 36, () => { S.physicsPage = page - 1; }, { disabled: page === 0, small: true }); U.buttons.at(-1).label = 'Pagina precedente dei dati fisici';
        U.button('physics-next', 'AVANTI', px + pw - 112, by, 96, 36, () => { S.physicsPage = page + 1; }, { disabled: page === pages.length - 1, small: true }); U.buttons.at(-1).label = 'Pagina successiva dei dati fisici';
    }
}
const expeditionsOpen = () => S.scene === 'orbit' && S.expeditionsFor === S.selected;
let expeditionCache = { key: '', map: new Map() };
/** Progress of the three expeditions of planet `index`, cached until the save changes. */
function expeditionsOf(index) {
    const key = store.data.updatedAt + '|' + store.data.solved.length;
    if (expeditionCache.key !== key) expeditionCache = { key, map: new Map() };
    const unit = data.modules[index]?.id;
    if (!expeditionCache.map.has(index)) expeditionCache.map.set(index, unit ? expeditionProgress(unit, store.data, expeditionLists) : []);
    return expeditionCache.map.get(index);
}
/** One line on the expeditions of a unit, for the book and the diary. */
function expeditionLine(unit, withHead = true) {
    const m = moduleById(unit); if (!m) return '';
    const parts = expeditionsOf(m.planetIndex).map(x => x.kind === 'attesa' ? `${x.place} in attesa del capitolo` : `${x.place} ${x.done ? 'completata' : x.solved + ' di ' + x.total}`);
    return (withHead ? 'Spedizioni del pianeta: ' : '') + parts.join('; ') + '.';
}
const EXPEDITION_HOW = { libro: x => x.levelName + ' del capitolo', percorso: () => 'domande del percorso guidato', attesa: () => 'in attesa del capitolo di matematica' };
function expeditionStatus(x) { return x.kind === 'attesa' ? 'in attesa' : x.done ? 'completata' : `${x.solved} di ${x.total}`; }
function expeditionsIntro(m) {
    return book?.has(m.id) ? `Gli esercizi del capitolo «${m.title}», in tre livelli. Un esercizio conta quando lo segni come risolto nel libro, dopo aver confrontato il tuo svolgimento con la soluzione.` : 'Questa unità di matematica è senza capitolo; la spedizione in orbita usa le domande del percorso guidato, corrette dal percorso stesso.';
}
/** The three expeditions of the planet in orbit, in place of the unit panel. */
function expeditionsPanel(m, mobile) {
    // Short screens leave the introduction to the screen reader text and pack the cards closer, so the panel
    // stays above the buttons.
    const w = R.w, short = R.h < 700, tint = sectorColors[m.sector], list = expeditionsOf(S.selected), intro = short ? '' : expeditionsIntro(m);
    const pw = mobile ? w - 36 : 420, px = mobile ? 18 : w - pw - 36, py = mobile ? 108 : 247, line = 18, introRows = intro ? R.multilineCount(intro, pw - 36, 'micro') : 0, ch = 92, gap = short ? 6 : 10;
    const ph = 56 + introRows * line + 8 + list.length * (ch + gap) + 4;
    U.panel(px, py, pw, ph, tint, .92);
    U.tag(pw < 330 ? 'Spedizioni' : 'Spedizioni del pianeta', px + 18, py + 18, tint);
    U.button('expeditions-close', 'CHIUDI', px + pw - 104, py + 8, 86, 32, () => { S.expeditionsFor = null; }, { small: true }); U.buttons.at(-1).label = 'Chiudi le spedizioni e torna alla scheda dell’unità';
    if (intro) U.wrap(intro, px + 18, py + 48, pw - 36, C.muted, line, 8, 'micro');
    list.forEach((x, k) => {
        const y = py + 56 + introRows * line + 8 + k * (ch + gap), on = x.done, color2 = on ? C.lime : x.kind === 'attesa' ? C.dim : C.pale;
        R.roundRect(px + 12, y, pw - 24, ch, 10, color(T.raised, .55), on ? C.lime : color(T.line, 1));
        U.text(x.name, px + 26, y + 12, 'mini', color2);
        U.text(expeditionStatus(x), px + pw - 26, y + 13, 'micro', on ? C.lime : C.muted, { align: 'right' });
        U.text(capital(EXPEDITION_HOW[x.kind](x)), px + 26, y + 36, 'micro', C.muted);
        const bar = pw - 24 - 28 - (x.kind === 'attesa' ? 0 : 124), frac = x.total ? x.solved / x.total : 0;
        if (x.kind !== 'attesa') R.rect(px + 26, y + 66, bar, 8, color(T.line, .9)); if (frac) R.rect(px + 26, y + 66, bar * frac, 8, on ? C.lime : tint);
        if (x.kind === 'libro') { U.button('expedition-' + x.level, 'ESERCIZI', px + pw - 132, y + 52, 106, 32, () => openChapter(m.id, x.next || expeditionLists[m.id][x.level][0]), { small: true }); U.buttons.at(-1).label = 'Apri nel libro gli ' + x.levelName + ' della ' + x.name.toLowerCase(); }
        if (x.kind === 'percorso') { U.button('expedition-' + x.level, 'DOMANDE', px + pw - 132, y + 52, 106, 32, () => openCourse(m.id, 4), { small: true }); U.buttons.at(-1).label = 'Apri le domande del percorso guidato'; }
    });
}
function expeditionsText(m) {
    return 'Spedizioni del pianeta ' + m.title + '. ' + expeditionsIntro(m) + ' ' + expeditionsOf(S.selected).map(x => `${x.name}, ${EXPEDITION_HOW[x.kind](x)}: ${expeditionStatus(x)}.`).join(' ');
}
function orbitUI() {
    const w = R.w, h = R.h, m = selected(), mobile = w < 850;
    // On phones the open card takes the place of the title.
    // On short phones the subtitle gives its room to the unit panel.
    if (!(mobile && (physicsOpen() || expeditionsOpen()))) { titleFade(); title(areaTrail(m), m.title, mobile && h < 700 ? '' : 'Unità '+unitPlace(S.selected).position+' di '+unitPlace(S.selected).count+' dell’area '+areaOf(S.selected).name+'.'); }
    const toggle = () => Object.assign(S, physicsOpen() ? { physicsFor: null } : { physicsFor: S.selected, physicsPage: 0, expeditionsFor: null });
    if (physicsOpen()) physicsPanel(m, mobile);
    else if (expeditionsOpen()) expeditionsPanel(m, mobile);
    else orbitPanel(m, mobile);
    const bw = mobile ? (w - 60) / 3 : 0;
    U.button('surface', mobile?'SUPERFICIE':'SCENDI IN SUPERFICIE', mobile?18:35, h-88, mobile?bw:230,39,()=>route('surface'),{small:mobile});
    U.button('back-system',mobile?'ALL’AREA':'TORNA ALL’AREA',mobile?30+bw:277,h-88,mobile?bw:220,39,()=>route('system',{system:S.system}),{small:mobile});
    U.button('physics', physicsOpen() ? (mobile ? 'CHIUDI' : 'CHIUDI LA SCHEDA') : 'DATI FISICI', mobile?42+2*bw:509,h-88,mobile?bw:200,39,toggle,{small:mobile,active:physicsOpen()});
}
function orbitPanel(m, mobile) {
    const w = R.w, h = R.h;
    // On phones the panel ends above the bottom buttons.
    const px = mobile ? 18 : w - 370, pw = mobile ? w - 36 : 334, py = mobile ? h - 372 : 247, ph = mobile ? 276 : h - 337;
    U.panel(px, py, pw, ph, sectorColors[m.sector], .76);
    U.tag(sectors[m.sector] + ' · ' + areaOf(S.selected).name, px + 20, py + 19, sectorColors[m.sector]);
    wrapClipText(m.title, px + 20, py + 50, pw - 40, 'sub', C.pale, 2);
    U.text(coverage(m), px + 20, py + 100, 'mini', C.lime);
    if (!mobile) {
        const room = ph - 110 - 48 - 139, lines = Math.max(1, Math.min(5, Math.floor((room - 64) / 25)));
        wrapClipText(m.description, px + 20, py + 139, pw - 40, 'body', C.muted, lines);
        const y = py + 139 + lines * 25 + 10;
        const entry = worldEntry(m.id);
        if (entry && y + 70 < py + ph - 158) { U.text('Fenomeno del pianeta', px + 20, y, 'mini', C.amber); wrapClipText(entry.phenomenon + (entry.status === 'prototipo' ? ': scendi in superficie per vederlo.' : ': in preparazione.'), px + 20, y + 22, pw - 40, 'micro', C.muted, 2); }
        else if (y + 54 < py + ph - 158) { U.text('NELL’UNITÀ', px + 20, y, 'mini', C.amber); wrapClipText('Lezione su tre livelli · laboratorio · quattro domande · fonti', px + 20, y + 22, pw - 40, 'micro', C.muted, 2); }
    }
    // The expeditions of the planet: exercises of the chapter, or questions of the mathematics path.
    const done = expeditionsOf(S.selected).filter(x => x.done).length, open = expeditionsOf(S.selected).filter(x => x.kind !== 'attesa').length;
    U.button('expeditions', `SPEDIZIONI · ${done} DI ${open}`, px + 18, mobile ? py + 124 : py + ph - 158, pw - 36, mobile ? 34 : 38, () => Object.assign(S, { expeditionsFor: S.selected, physicsFor: null }), { small: mobile }); U.buttons.at(-1).label = `Apri le spedizioni del pianeta: ${done} completate su ${open}`;
    buttonsModule(m, px + 18, py + ph - 110, pw - 36);
}
function surfaceUI() {
    const w = R.w, h = R.h, mobile = w < 850, m = selected(), tint = sectorColors[m.sector];
    markLanded(S.selected);
    titleFade();
    titleShade();
    if (S.explore && exploreReady()) { exploreUI(m, mobile); return; }
    worldPanel(m, mobile);
    title(areaTrail(m, ['SUPERFICIE']), m.title, mobile && pilotWorld(m.id) ? '' : 'Quattro stazioni, una per ogni attività dell’unità.');
    const names = ['Stazione della lezione', 'Laboratorio', 'Stazione di verifica', 'Stazione dei collegamenti'], short = ['Lezione', 'Laboratorio', 'Verifica', 'Collegamenti'];
    const desc = ['La spiegazione su tre livelli: Base, Applica, Approfondisci.', 'Prevedi, cambia i parametri e confronta due esperimenti.', 'Quattro domande con la spiegazione di ogni risposta.', 'Le unità collegate e le fonti per approfondire.'];
    const stages = [0, 2, 4, 5];
    const px = mobile ? 18 : w - 353, pw = mobile ? w - 36 : 320, py = mobile ? h - 304 : 258, ph = mobile ? 220 : 300;
    U.panel(px, py, pw, ph, tint, .78);
    // A station counts as done once the unit has moved past its phase, or the unit is complete.
    const record = store.data.courses?.[m.id], done = i => !!(record?.completedAt || (record?.stage ?? 0) > stages[i]);
    U.tag('Stazione ' + (S.station + 1) + ' di 4' + (done(S.station) ? ' · fatta' : ''), px + 18, py + 20, tint);
    wrapClipText(names[S.station], px + 18, py + 52, pw - 36, 'sub', C.pale, 2);
    wrapClipText(desc[S.station], px + 18, py + 112, pw - 36, 'body', C.muted, 3);
    U.button('enter-station', 'APRI QUESTA ATTIVITÀ', px + 16, py + ph - 55, pw - 32, 40, () => {
        if (m.curriculum) openCourse(m.id, stages[S.station]); else openTheory(m.id);
    }, { active: true });
    if (!mobile)
        for (const p of W.projections) {
            if (p.type !== 'station' || !Number.isFinite(p.x)) continue;
            const label = (done(p.index) ? '✓ ' : '') + short[p.index], tw = R.textWidth(label, 'mini') + 44, on = p.index === S.station, x = p.x + 16, y = p.y - 16;
            R.roundRect(x, y, tw, 30, 15, color(T.bg, .9), on ? tint : color(T.line, 1));
            R.roundRect(x + 4, y + 4, 22, 22, 11, on ? tint : color(T.raised, 1));
            U.text(String(p.index + 1), x + 15, y + 8, 'micro', on ? color(T.ink) : C.pale, { align: 'center' });
            U.text(label, x + 32, y + 7, 'mini', on ? C.pale : C.muted);
        }
    const sw = mobile ? 55 : 124;
    U.button('back-planet',mobile?'ORBITA':'TORNA AL PIANETA',mobile?294:35+4*(sw+8)+12,h-86,mobile?Math.max(65,w-312):190,36,()=>route('orbit'),{small:mobile});
    if (exploreReady()) U.button('explore-start', mobile ? 'ESPLORA' : 'ESPLORA IL PIANETA', mobile ? px + pw - 104 : Math.min(773, w - 220), mobile ? py + 10 : w < 1000 ? h - 132 : h - 86, mobile ? 90 : 200, mobile ? 28 : 36, startExplore, { small: mobile });
    for (let i = 0; i < 4; i++)
        U.button('station-' + i, mobile ? String(i + 1) : (i + 1) + ' · ' + short[i], 35 + i * (sw + 8), h - 86, sw, 36, () => S.station = i, { active: S.station === i });
}
/** Exploration panel: one species or place at a time, with its explanation and the diary button. */
function exploreUI(m, mobile) {
    const w = R.w, h = R.h, tint = sectorColors[m.sector], list = exploreEntries(), rec = exploreRecord(S.selected);
    title(areaTrail(m, ['SUPERFICIE', 'ESPLORAZIONE']), m.title, mobile ? 'Tocca il terreno per spostarti, trascina per ruotare.' : 'Clic sul terreno o sui segnali per spostarti; W A S D per muoverti.');
    const px = mobile ? 18 : w - 353, pw = mobile ? w - 36 : 320, ph = mobile ? 300 : Math.min(520, h - 368), py = mobile ? h - 384 : 258;
    U.panel(px, py, pw, ph, tint, .84);
    const ns = list.filter(e => e.type === 'species').length, np = list.length - ns, e = list[S.exploreEntry] || list[0];
    if (e) {
        const done = isRegistered(e, rec), species = e.type === 'species';
        U.tag((species ? 'Specie ' : 'Luogo ') + (S.exploreEntry + 1) + ' di ' + list.length + (done ? ' · nel diario' : ''), px + 18, py + 18, species ? C.lime : tint);
        wrapClipText(e.data.name, px + 18, py + 44, pw - 36, 'sub', C.pale, 1);
        U.text(species ? (e.data.kind === 'plant' ? 'Pianta' : 'Animale') + ' · ' + e.data.label + ' · ' + e.data.habitatName : PLACE_KINDS[e.data.kind], px + 18, py + 76, 'micro', species ? C.lime : tint);
        // Phones show one trait at a time; wide screens show them all.
        const parts = species ? e.data.traits : ns ? [e.data.text] : [e.data.text, lifelessReason(W.surface.genome)], bottom = py + ph - 104;
        let y = py + 102;
        if (mobile) {
            const k = Math.min(S.exploreTrait, parts.length - 1); U.wrap(parts[k], px + 18, y, pw - 36, C.pale, 19, 5, 'micro');
            if (parts.length > 1) { U.button('explore-trait', 'Caratteristica ' + (k + 1) + ' di ' + parts.length + ' ▸', px + 16, bottom - 8, pw - 32, 28, () => { S.exploreTrait = (k + 1) % parts.length; }, { small: true }); }
        } else for (const t of parts) { const rows = fittedRows(R, [t], pw - 36, 'mini').filter(Boolean), n = Math.min(rows.length, Math.floor((bottom - y) / 21)); rows.slice(0, n).forEach((row, i) => U.text(row, px + 18, y + i * 21, 'mini', C.pale)); y += n * 21 + 9; if (y > bottom - 21) break; }
        const by = py + ph - 92;
        U.button('explore-prev', '◂', px + 16, by + 20, 44, 36, () => selectEntry(S.exploreEntry - 1)); U.buttons.at(-1).label = 'Voce precedente';
        U.button('explore-next', '▸', px + 66, by + 20, 44, 36, () => selectEntry(S.exploreEntry + 1)); U.buttons.at(-1).label = 'Voce successiva';
        U.button('explore-register', done ? 'NEL DIARIO ✓' : 'REGISTRA NEL DIARIO', px + 118, by + 20, pw - 134, 36, () => register(e), { active: !done, disabled: done });
    } else wrapClipText(lifelessReason(W.surface.genome), px + 18, py + 52, pw - 36, 'body', C.pale, 6);
    U.text(`Diario: ${rec.s.length} specie su ${ns} · ${rec.l.length} luoghi su ${np}`, px + 18, py + ph - 26, 'micro', C.muted);
    if (!mobile) {
        U.text('Ipotesi illustrative ricavate dalla carta d’identità del pianeta.', 35, h - 112, 'micro', C.muted);
        for (const p of W.projections) {
            if (p.type !== 'place' || !Number.isFinite(p.x) || p.depth <= 0) continue;
            const place = W.surface.places[p.index], on = S.exploreTarget?.type === 'place' && S.exploreTarget.index === p.index, label = (exploreRecord(S.selected).l.includes(place.id) ? '✓ ' : '') + place.name, tw = R.textWidth(label, 'mini') + 24, x = p.x - tw / 2, y = p.y - 34;
            if (x < 20 || x + tw > w - 370 || y < 96 || (y < 250 && x < 760) || y > h - 120) continue;
            R.roundRect(x, y, tw, 26, 13, color(T.bg, .88), on ? tint : color(T.line, 1));
            U.text(label, x + 12, y + 6, 'mini', on ? C.pale : C.muted);
        }
    }
    U.button('explore-stop', mobile ? 'STAZIONI' : 'TORNA ALLE STAZIONI', 35, h - 86, mobile ? 120 : 220, 36, stopExplore, { small: mobile });
    U.button('back-planet', mobile ? 'ORBITA' : 'TORNA AL PIANETA', mobile ? w - 140 : 267, h - 86, mobile ? 105 : 190, 36, () => route('orbit'), { small: mobile });
}
function researchUI() {
    const w = R.w, h = R.h, n = RESEARCH[S.node], mobile = w < 850;
    title('04 / RETE DELLA RICERCA', 'LE CONOSCENZE SI COLLEGANO', 'I legami descrivono connessioni concettuali, non prerequisiti completati o blocchi di accesso.');
    const px = mobile ? 18 : w - 350, pw = mobile ? w - 36 : 316, py = mobile ? h - 295 : 250, ph = mobile ? 211 : 365;
    U.panel(px, py, pw, ph, C.cyan, .78);
    U.tag('NODO ' + String(S.node + 1).padStart(2, '0'), px + 18, py + 20);
    wrapClipText(n.label, px + 18, py + 53, pw - 36, 'sub', C.pale, 2);
    const m = moduleById(n.module);
    let available = n.lab || n.module === 'gaia' || m?.status !== 'planned';
    wrapClipText(n.lab ? 'Laboratorio interattivo con modello dichiarato.' : n.module === 'gaia' ? 'Dossier trasversale Gaia. Lezioni, ipotesi e limiti del modello.' : m?.description || '', px + 18, py + 113, pw - 36, 'body', C.muted, mobile ? 2 : 5);
    if (!mobile)
        U.text(available ? 'PERCORSO DISPONIBILE' : 'CONTENUTI IN PREPARAZIONE', px + 18, py + 270, 'micro', C.lime);
    U.button('open-node', 'ESPLORA IL COLLEGAMENTO', px + 16, py + ph - 54, pw - 32, 39, () => {
        if (n.lab)
            route('lab', { lab: n.lab });
        else if (n.module === 'gaia')
            openTheory('gaia', n.section || 0);
        else if (m) {
            selectIndex(m.planetIndex);
            openTheory(m.id);
        }
    }, { active: true });
    for (const p of W.projections) {
        if (p.x > 45 && p.x < px - 20 && p.y > 235 && p.y < h - 80) {
            U.text(RESEARCH[p.index].label, p.x, p.y + 17, 'micro', p.index === S.node ? C.pale : C.muted, { align: 'center' });
        }
    }
    U.button('node-prev', '◂', 35, h - 84, 44, 34, () => S.node = (S.node + RESEARCH.length - 1) % RESEARCH.length);
    U.button('node-next', '▸', 87, h - 84, 44, 34, () => S.node = (S.node + 1) % RESEARCH.length);
    U.text((S.node + 1) + ' / ' + RESEARCH.length + ' NODI', 145, h - 74, 'micro', C.muted);
}
function catalogueUI() {
    const w = R.w, h = R.h, mobile = w < 850;
    title('ARGOMENTI', 'Tutte le ' + UNIT_COUNT + ' unità', 'Cerca per nome o filtra per disciplina. Ogni scheda indica l’area della mappa a cui appartiene.');
    const x = 34, ww = w - 68;
    const pathsW=mobile?96:150,searchW=ww-pathsW-8;
    U.button('search',education.short('CERCA: '+(S.query||'argomento o codice'),searchW-18,'mini'),x,245,searchW,42,()=>startEdit('search'),{active:S.editing==='search'});
    U.button('open-paths','PERCORSI',x+searchW+8,245,pathsW,42,()=>route('paths'),{small:mobile});
    let bw = (ww - 20) / 5;
    ['TUTTE', 'MATEMATICA', 'FISICA', 'CHIMICA', 'BIOLOGIA'].forEach((t, i) => U.button('filter-' + i, mobile ? ['TUTTE', 'MAT', 'FIS', 'CHI', 'BIO'][i] : t, x + i * (bw + 5), 298, bw, 32, () => { S.sector = i - 1; S.catalogPage = 0; }, { active: S.sector === i - 1, small: mobile }));
    const items = data.modules.filter(m => (S.sector < 0 || m.sector === S.sector) && (m.title + ' ' + m.code + ' ' + sectors[m.sector] + ' ' + m.description).toLocaleLowerCase('it').includes(S.query.toLocaleLowerCase('it')));
    const cols = mobile ? 1 : w > 1400 ? 3 : 2, rows = Math.max(1, Math.floor((h - 449) / 94)), per = cols * rows, pages = Math.max(1, Math.ceil(items.length / per));
    S.catalogPage = clamp(S.catalogPage, 0, pages - 1);
    const tileW = (ww - (cols - 1) * 12) / cols;
    items.slice(S.catalogPage * per, (S.catalogPage + 1) * per).forEach((m, i) => { const xx = x + (i % cols) * (tileW + 12), yy = 348 + Math.floor(i / cols) * 94; U.panel(xx, yy, tileW, 82, sectorColors[m.sector], m.planetIndex === S.selected ? .82 : .55); U.text(m.code, xx + 14, yy + 14, 'sub', sectorColors[m.sector]); wrapClipText(m.title, xx + 66, yy + 13, tileW - 120, 'body', C.pale, 1); U.text((sectors[m.sector] + ' · ' + areaOf(m.planetIndex).name).toUpperCase(), xx + 66, yy + 50, 'micro', C.muted, { track: .4 }); const chapter = !!book?.has(m.id), go = () => { if (chapter) openChapter(m.id); else if (m.curriculum) openCourse(m.id); else { selectIndex(m.planetIndex); route('briefing'); } }; U.button('catalog-unit-' + m.id, '▸', xx + tileW - 44, yy + 24, 32, 32, go, { small: true }); U.buttons.at(-1).label = (chapter ? 'Leggi il capitolo ' : 'Apri l’unità ') + m.title; U.buttons.push({ id: 'catalog-row-' + m.id, label: m.title + ', ' + sectors[m.sector] + ', area ' + areaOf(m.planetIndex).name, x: xx, y: yy, w: tileW - 50, h: 82, action: go }); });
    U.button('catalog-prev', 'PRECEDENTI', x, h - 85, 126, 36, () => S.catalogPage--, { disabled: S.catalogPage === 0 });
    U.button('catalog-next', 'SUCCESSIVE', w - 160, h - 85, 126, 36, () => S.catalogPage++, { disabled: S.catalogPage >= pages - 1 });
    U.text(`${items.length} RISULTATI · ${S.catalogPage + 1}/${pages}`, w / 2, h - 72, 'micro', C.muted, { align: 'center' });
}
function briefingUI() {
    const m=selected(),w=R.w,h=R.h,mobile=w<850;
    U.tag('DOSSIER / '+sectors[m.sector].toUpperCase(),24,110,C.lime);
    U.wrap(m.title,24,139,w-48,C.pale,28,2,mobile?'body':'sub');
    U.text(coverage(m),24,207,'micro',C.muted);
    const x=mobile?18:Math.max(40,(w-1050)/2),ww=mobile?w-36:Math.min(1050,w-80),rect={x,y:245,w:ww,h:h-357};
    U.panel(rect.x,rect.y,rect.w,rect.h,sectorColors[m.sector],.94);
    education.select(m.id);const d=education.definition;
    education.readingUI(U,[d.narrativeStatus,...d.objectives,'Ambito: '+d.scope+'. Nucleo guidato: non esaurisce tutti i sottotemi del programma.','Prerequisiti consigliati: '+(d.prerequisites.map(id=>moduleById(id)?.title||id).join('; ')||'nessuno')+'. La navigazione è libera.',m.source?'La dispensa matematica originale e la numerazione delle pagine sono preservate.':'Questa unità contiene materiale originale; non è attribuita alla dispensa matematica.'],rect,'OBIETTIVI E COPERTURA');
    const bw=(ww-16)/3,by=h-95;
    U.button('brief-course','PERCORSO 3D',x,by,bw,40,()=>openCourse(m.id),{active:true,small:mobile});
    U.button('brief-read',m.lesson?'TEORIA ORIGINALE':'SPIEGAZIONI',x+bw+8,by,bw,40,()=>m.lesson?openTheory(m.id):openCourse(m.id,1),{small:mobile});
    U.button('brief-source','DISPENSA PDF',x+2*(bw+8),by,bw,40,()=>openPDF(m.source.pdfPages[0],docOf(m.source)),{disabled:!m.source,small:mobile});
}
function documentView(key, rect, { invert = false } = {}) {
    const doc = readerIndex[key];
    if (!doc) {
        U.wrap('Documento non disponibile nel pacchetto.', rect.x + 15, rect.y + 20, rect.w - 30, C.red);
        return;
    }
    const variant = doc.variants[rect.w < 570 ? 'mobile' : 'desktop'], scale = rect.w / variant.width;
    S.maxScroll = Math.max(0, variant.height * scale - rect.h);
    S.scroll = clamp(S.scroll, 0, S.maxScroll);
    let pending = false;
    for (const tile of variant.tiles) {
        const y = rect.y + tile.top * scale - S.scroll, h = tile.height * scale;
        if (y + h <= rect.y || y >= rect.y + rect.h)
            continue;
        const top = Math.max(rect.y, y), bot = Math.min(rect.y + rect.h, y + h), v0 = (top - y) / h, v1 = (bot - y) / h;
        const o = cache.draw(tile.file, rect.x, top, rect.w, bot - top, [0, v0, 1, v1], invert);
        pending = pending || o.loading;
        if (o.error)
            U.text('Errore nella pagina: ' + tile.file, rect.x + 16, top + 20, 'mini', C.red);
    }
    if (pending)
        U.text('CARICAMENTO DEL TESTO…', rect.x + 14, rect.y + 8, 'mini', C.muted);
    if (S.maxScroll > 0) {
        const xx = rect.x + rect.w + 7, hh = Math.max(25, rect.h * rect.h / (variant.height * scale));
        R.roundRect(xx, rect.y, 3, rect.h, 1, color('#427472', .3));
        R.roundRect(xx, rect.y + (rect.h - hh) * S.scroll / S.maxScroll, 3, hh, 1, C.cyan);
    }
    S.visibleDoc = { key, variant, rect, scale };
}
function theoryUI() {
    const w = R.w, h = R.h, mobile = w < 850, l = lessons[S.reader] || lessons['math-c08'], s = l.sections[S.section] || l.sections[0];
    S.reader = l.id;
    title((l.id === 'gaia' ? 'DOSSIER TRASVERSALE' : 'TEORIA / ' + l.id.toUpperCase()), l.title + ' / TEORIA', `${S.section + 1} di ${l.sections.length} sezioni · spiegazioni, condizioni, esempi e dimostrazioni`);
    const x = mobile ? 16 : 274, y = 245, ww = mobile ? w - 32 : Math.min(1010, w - x - 45), hh = h - y - (mobile ? 162 : 121);
    U.panel(x, y, ww, hh, C.cyan, S.light ? .98 : .83);
    if (S.light)
        R.roundRect(x + 1, y + 1, ww - 2, hh - 2, 15, color('#e8eedf', .98));
    if (!mobile) {
        U.tag('INDICE DEL MODULO', 32, 250);
        l.sections.forEach((sec, i) => {
            const yy = 281 + i * 43;
            if (yy > h - 150)
                return;
            U.button('section-' + i, sec.sourceSection + ' · ' + sec.title.slice(0, 23) + (sec.title.length > 23 ? '…' : ''), 30, yy, 224, 36, () => { S.section = i; S.scroll = 0; updateHash(); }, { active: i === S.section, small: true });
        });
    }
    documentView(s.id, { x: x + 8, y: y + 10, w: ww - 24, h: hh - 20 }, { invert: S.light });
    const by = h - (mobile ? 142 : 101), bw = mobile ? (w - 46) / 3 : 140;
    U.button('previous-section', '◂ PRECEDENTE', x, by, bw, 36, () => { S.section = Math.max(0, S.section - 1); S.scroll = 0; updateHash(); }, { disabled: S.section === 0, small: mobile });
    U.button('next-section', 'SUCCESSIVA ▸', x + bw + 7, by, bw, 36, () => { S.section = Math.min(l.sections.length - 1, S.section + 1); S.scroll = 0; updateHash(); }, { disabled: S.section === l.sections.length - 1, small: mobile });
    U.button('mark-read', store.data.read.includes(s.id) ? 'STUDIATA ✓' : 'SEGNA STUDIATA', x + 2 * (bw + 7), by, mobile ? bw : 160, 36, () => {
        if (!store.data.read.includes(s.id))
            store.data.read.push(s.id);
        store.save();
        say('Registrata come studiata; non equivale a una verifica di comprensione.');
    }, { active: store.data.read.includes(s.id), small: mobile });
    if (mobile) {
        U.button('copy-lesson', 'COPIA', x, h - 97, bw, 34, () => copyText(readerIndex[s.id].plainSource), { small: true });
        U.button('light-reader', S.light ? 'SCURO' : 'CHIARO', x + bw + 7, h - 97, bw, 34, () => S.light = !S.light, { small: true });
        U.button('source-reader', l.id === 'gaia' ? 'FONTI' : 'FONTE PDF', x + 2 * (bw + 7), h - 97, bw, 34, () => l.id === 'gaia' ? route('sources') : openPDF((s.printedPage || l.source.printedPages[0]) + 12), { small: true });
    }
    if (!mobile) {
        U.button('copy-lesson', 'COPIA TESTO', x + 477, by, 132, 36, () => copyText(readerIndex[s.id].plainSource));
        U.button('light-reader', S.light ? 'SCURO' : 'CHIARO', x + 617, by, 90, 36, () => S.light = !S.light);
        U.button('source-reader', l.id === 'gaia' ? 'FONTI' : 'FONTE PDF', x + 715, by, 120, 36, () => l.id === 'gaia' ? route('sources') : openPDF((s.printedPage || l.source.printedPages[0]) + 12));
    }
}
function pdfUI() {
    const w = R.w, h = R.h, mobile = w < 850, key = docKey(S.pdfDoc), d = DOCUMENTS[key], index = pageIndex(key), p = index?.[S.pdfPage - 1], label = printedLabel(key, S.pdfPage, p);
    title('Archivio / dispensa originale', d.title, `Pagina PDF ${S.pdfPage} di ${d.pages}${label && label !== String(S.pdfPage) ? ' · pagina stampata ' + label : label ? '' : ' · preliminari'}`);
    const by = h - 90;
    let bx = mobile ? 16 : 34;
    if (p) {
        const top = 238, bottom = h - 110, available = bottom - top, baseW = Math.min(mobile ? w - 30 : w - 150, 900), scale = baseW / p.width * S.pdfZoom, ww = p.width * scale, hh = p.height * scale, x = (w - ww) / 2;
        S.maxScroll = Math.max(0, hh - available);
        S.scroll = clamp(S.scroll, 0, S.maxScroll);
        let cropTop = S.scroll / hh, cropBottom = Math.min(1, (S.scroll + available) / hh);
        cache.draw(p.file, x, top, ww, (cropBottom - cropTop) * hh, [0, cropTop, 1, cropBottom]);
    } else U.text('Caricamento delle pagine…', w / 2, 300, 'body', C.muted, { align: 'center' });
    U.button('pdf-prev', '◂', bx, by, 40, 37, () => { S.pdfPage = Math.max(1, S.pdfPage - 1); S.scroll = 0; updateHash(); }, { disabled: S.pdfPage === 1 });
    U.button('pdf-next', '▸', bx + 47, by, 40, 37, () => { S.pdfPage = Math.min(d.pages, S.pdfPage + 1); S.scroll = 0; updateHash(); }, { disabled: S.pdfPage === d.pages });
    U.button('pdf-goto', 'PAGINA ' + S.pdfPage, bx + 96, by, 108, 37, () => startEdit('page'), { small: mobile });
    U.button('pdf-plus', '+', bx + 211, by, 38, 37, () => S.pdfZoom = clamp(S.pdfZoom + .2, .6, 2));
    U.button('pdf-minus', '−', bx + 256, by, 38, 37, () => S.pdfZoom = clamp(S.pdfZoom - .2, .6, 2));
    if (!mobile) {
        U.button('pdf-copy', 'COPIA TESTO ESTRATTO', bx + 315, by, 206, 37, () => copyText(p?.text || ''), { disabled: !p });
        U.button('pdf-original', 'APRI PDF ORIGINALE', bx + 529, by, 200, 37, () => window.open(asset(d.file) + '#page=' + S.pdfPage, '_blank', 'noopener'));
    }
}
function labControlsFooter() { const w = R.w, h = R.h, mobile = w < 850, labels = [['lab-save', 'CONSERVA A', saveScenario], ['lab-reset', 'RIPRISTINA', () => { S.lum = 1; S.death = .3; S.labValues = { p: 80, x: 13, base: 'quadratic', a: 1, b: 1, h: 0, k: 0, index: 2, mode: 'root', m1: 1, q1: 0, m2: -1, q2: 5, initial: 100, loss: .1, t: 10, zeroA: -2, zeroB: 1, pole: 3 }; S.labCompare = null; computeLab(); }], ['lab-export', 'ESPORTA JSON', () => exportLab(false)], ['lab-csv', 'ESPORTA CSV', () => exportLab(true)]]; const bw = mobile ? (w - 50) / 3 : 145; labels.slice(0, mobile ? 3 : (S.lab === 'daisyworld' ? 4 : 3)).forEach(([id, label, act], i) => U.button(id, label, 30 + i * (bw + 8), h - 85, bw, 36, act, { small: mobile })); }
function labUI() {
    const w = R.w, h = R.h, mobile = w < 1050;
    title('LABORATORI / MODELLI RIPRODUCIBILI', labNames[S.lab].toUpperCase(), S.lab === 'daisyworld' ? 'Retroazioni fra albedo, temperatura e popolazioni. Modello ideale: non una previsione climatica della Terra.' : 'Le proprietà matematiche restano distinte dalle approssimazioni numeriche.');
    let x = 32, y = 242;
    const count = mobile ? 4 : 7, bw = mobile ? (w - 73 - 66) / 4 : (w - 104) / 7;
    labIds.slice(mobile ? Math.floor(labIds.indexOf(S.lab) / 4) * 4 : 0, mobile ? Math.floor(labIds.indexOf(S.lab) / 4) * 4 + 4 : 7).forEach((id, i) => U.button('lab-' + id, (id === 'daisyworld' ? 'GAIA' : id === 'rectangle' ? 'AREA' : id === 'transform' ? 'FUNZIONI' : id === 'radical' ? 'RADICI' : id === 'linear' ? 'SISTEMI' : id === 'reserve' ? 'RISERVE' : 'SEGNI'), x + i * (bw + 7), y, bw, 33, () => { S.lab = id; S.labCompare = null; computeLab(); updateHash(); }, { active: S.lab === id, small: true }));
    if (mobile)
        U.button('more-labs', 'Altri ▸', w - 79, y, 59, 33, () => { S.lab = labIds[(labIds.indexOf(S.lab) + 4) % 7]; S.labCompare = null; computeLab(); }, { small: true });
    if (S.lab === 'daisyworld')
        daisyUI();
    else
        mathLabUI();
    labControlsFooter();
}
function daisyUI() {
    const w = R.w, h = R.h, d = S.sim.final, mobile = w < 1050;
    const right = mobile ? w - 285 : w - 305, top = 297;
    if (mobile) {
        U.panel(18, top, w - 36, 165, C.cyan, .89);
        U.slider('lum', 'LUMINOSITÀ L', 37, top + 15, w - 74, S.lum, .6, 1.6, .01, v => { S.lum = v; computeLab(); }, v => v.toFixed(2));
        U.slider('death', 'MORTALITÀ γ', 37, top + 75, w - 74, S.death, .1, .6, .01, v => { S.death = v; computeLab(); }, v => v.toFixed(2));
        const gy = top + 210, gh = Math.max(95, h - gy - 185);
        U.graph(59, gy, w - 95, gh, [{ points: S.sweep.map(t => [t.luminosity, t.temperatureC]), color: C.amber }, { points: S.sweep.map(t => [t.luminosity, t.bareC]), color: C.muted }], { xmin: .6, xmax: 1.6, ymin: -20, ymax: 80, xLabel: 'L (adimensionale)', yLabel: 'Temperatura (°C)' });
        U.text(d.temperatureC.toFixed(1) + ' °C · scure ' + (d.black * 100).toFixed(0) + '% · chiare ' + (d.white * 100).toFixed(0) + '%', 34, h - 135, 'mini', C.lime);
        return;
    }
    // Both graphs, their axis labels and legends fit inside the panel above the footer buttons.
    const gx = Math.max(470, w * .35), gw = right - gx - 28, avail = (h - 125) - top - 73 - 49 - 59 - 66, gh = Math.max(120, avail * .6);
    U.panel(gx - 34, top, gw + 63, h - top - 117, C.cyan, .69);
    U.tag('RISPOSTA ALLA LUMINOSITÀ', gx - 10, top + 19);
    U.graph(gx, top + 73, gw, gh, [{ points: S.sweep.map(t => [t.luminosity, t.temperatureC]), color: C.amber }, { points: S.sweep.map(t => [t.luminosity, t.bareC]), color: C.muted }], { xmin: .6, xmax: 1.6, ymin: -20, ymax: 80, xLabel: 'Luminosità L', yLabel: 'Temperatura (°C)' });
    const mark = gx + (S.lum - .6) * gw;
    R.line([mark, top + 73], [mark, top + 73 + gh], color('#e6efe8', .65), 1);
    U.text('● Con biologia', gx, top + gh + 122, 'micro', C.amber);
    U.text('● Suolo privo di organismi', gx + 130, top + gh + 122, 'micro', C.muted);
    const py = top + gh + 181, ph = Math.max(48, h - 125 - 66 - py);
    U.graph(gx, py, gw, ph, [{ points: S.sweep.map(t => [t.luminosity, t.black]), color: C.cyan }, { points: S.sweep.map(t => [t.luminosity, t.white]), color: C.lime }], { xmin: .6, xmax: 1.6, ymin: 0, ymax: 1, xLabel: 'Luminosità L', yLabel: 'Frazione di superficie', ticks: 2 });
    U.text('● Margherite scure', gx, py + ph + 52, 'micro', C.cyan);
    U.text('● Margherite chiare', gx + 150, py + ph + 52, 'micro', C.lime);
    U.panel(right, top, 270, h - top - 117, C.lime, .84);
    U.tag('ESPERIMENTO CORRENTE', right + 18, top + 18, C.lime);
    U.metric('TEMPERATURA', d.temperatureC.toFixed(2) + ' °C', right + 18, top + 50, C.amber);
    U.text('Senza organismi: ' + d.bareC.toFixed(2) + ' °C', right + 18, top + 117, 'mini', C.muted);
    U.slider('lum', 'LUMINOSITÀ L', right + 18, top + 160, 234, S.lum, .6, 1.6, .01, v => { S.lum = v; computeLab(); }, v => v.toFixed(2));
    U.slider('death', 'MORTALITÀ γ', right + 18, top + 231, 234, S.death, .1, .6, .01, v => { S.death = v; computeLab(); }, v => v.toFixed(2));
    U.text('Scure  ' + (100 * d.black).toFixed(1) + '%', right + 18, top + 308, 'body', C.cyan);
    U.text('Chiare  ' + (100 * d.white).toFixed(1) + '%', right + 18, top + 338, 'body', C.lime);
    U.text('Albedo  ' + d.albedo.toFixed(4), right + 18, top + 373, 'mini', C.muted);
    U.text('Residuo  ' + S.sim.residual.toExponential(2), right + 18, top + 401, 'micro', C.muted);
    U.text(S.sim.converged ? 'Convergenza numerica raggiunta' : 'Stato a tempo finito: non convergente', right + 18, top + 427, 'micro', S.sim.converged ? C.lime : C.amber);
    if (S.labCompare?.lab === 'daisyworld')
        U.text('A: ' + S.labCompare.data.final.temperatureC.toFixed(2) + ' °C', right + 18, top + 452, 'mini', C.amber);
    U.button('gaia-model', 'EQUAZIONI E LIMITI', right + 16, h - 173, 238, 37, () => openTheory('gaia', 1));
    U.tag('DAISYWORLD', 35, top + 20, C.lime);
    U.wrap('Le tessere sulla sfera rappresentano coperture simulate. Il terreno esagonale è una visualizzazione separata.', 35, h - 205, Math.max(260, gx - 100), C.muted, 24, 3);
}
function mathData(v = S.labValues) {
    const n = 241, range = (a, b, fn) => Array.from({ length: n }, (_, i) => { let x = a + (b - a) * i / (n - 1); return [x, fn(x)]; });
    if (S.lab === 'rectangle') {
        const m = rectangleModel(v.p, v.x);
        return { series: [{ points: range(0, v.p / 2, x => x * (v.p / 2 - x)), color: C.amber }], xmin: 0, xmax: v.p / 2, ymin: 0, ymax: v.p * v.p / 16 * 1.1, formula: `A(x) = x · (${v.p / 2} − x)`, explain: `Lati ${v.x.toFixed(1)} e ${m.y.toFixed(1)} m. Area ${m.area.toFixed(2)} m². Massimo ${m.maxArea.toFixed(2)} m².`, result: m };
    }
    if (S.lab === 'transform') {
        const base = v.base || 'quadratic', b = v.b ?? 1;
        return { series: [{ points: range(-6, 6, x => transformFunction(x, { base, a: v.a, b, h: v.h, k: v.k })), color: C.cyan }, { points: range(-6, 6, x => transformFunction(x, { base })), color: C.dim }], xmin: -6, xmax: 6, ymin: -8, ymax: 18, formula: `g(x) = ${v.a.toFixed(1)} f(${b.toFixed(1)}(x − ${v.h.toFixed(1)})) + ${v.k.toFixed(1)}`, explain: `Base f(x)=${base === 'sine' ? 'sin(x)' : base === 'absolute' ? '|x|' : 'x²'}. Grigio: base originale. a e b modificano scale e riflessioni; h e k traslano.` };
    }
    if (S.lab === 'radical') {
        const square = v.mode === 'square';
        return { series: [{ points: range(-6, 8, x => radicalValue(x, { index: v.index, h: v.h, mode: v.mode || 'root' })), color: C.lime }], xmin: -6, xmax: 8, ymin: -4, ymax: square ? 12 : 5, formula: square ? `√((x − ${v.h})²) = |x − ${v.h}|` : `f(x) = radice di indice ${v.index} di (x − ${v.h})`, explain: square ? 'Radice quadrata di un quadrato: dominio reale completo e risultato non negativo. L’indice è fissato a 2.' : v.index % 2 === 0 ? `Dominio reale: x ≥ ${v.h}. Radice principale non negativa.` : 'Indice dispari: tutti gli ingressi reali sono ammessi.' };
    }
    if (S.lab === 'linear') {
        const m = intersectLines(v.m1, v.q1, v.m2, v.q2);
        return { series: [{ points: range(-6, 6, x => v.m1 * x + v.q1), color: C.cyan }, { points: range(-6, 6, x => v.m2 * x + v.q2), color: C.amber }], xmin: -6, xmax: 6, ymin: -7, ymax: 8, formula: `y=${v.m1}x+${v.q1}  ;  y=${v.m2}x+${v.q2}`, explain: m.type === 'unique' ? `Unica soluzione: x=${m.x.toFixed(3)}, y=${m.y.toFixed(3)}. Residui: ${m.residuals.map(n => n.toExponential(1)).join(', ')}.` : m.type === 'infinite' ? 'Le due rette coincidono: infinite soluzioni.' : 'Rette parallele distinte: nessuna soluzione.', result: m };
    }
    if (S.lab === 'reserve') {
        const value = exponentialReserve(v.initial, v.loss, v.t);
        return { series: [{ points: range(0, 50, t => exponentialReserve(v.initial, v.loss, t)), color: C.lime }], xmin: 0, xmax: 50, ymin: 0, ymax: v.initial * 1.1, formula: `Q(t) = ${v.initial} · (1 − ${v.loss.toFixed(2)})^t`, explain: `Dopo ${v.t} intervalli: ${value.toFixed(3)}. Dimezzamento: ${halfLife(v.loss).toFixed(3)} intervalli. Tasso costante assunto.` };
    }
    const m = rationalSignAnalysis(v.zeroA, v.zeroB, v.pole);
    return { series: [{ points: range(-7, 7, x => Math.abs(x - v.pole) < .09 ? null : rationalValue(x, v.zeroA, v.zeroB, v.pole)), color: C.cyan }], xmin: -7, xmax: 7, ymin: -10, ymax: 10, formula: `f(x) = (x − ${v.zeroA})(x − ${v.zeroB}) / (x − ${v.pole})`, explain: `Punto escluso: ${v.pole}. Zeri ammessi: ${m.zeros.join(', ') || 'nessuno'}. ${m.removable ? 'Discontinuità eliminabile: la cancellazione non riempie il punto escluso.' : 'Il denominatore resta non nullo.'}`, result: m };
}
function mathLabUI() {
    const w = R.w, h = R.h, v = S.labValues, m = mathData(), mobile = w < 1050;
    const controls = { rectangle: [['p', 'PERIMETRO P', 20, 160, 2], ['x', 'LATO x', .1, v.p / 2 - .1, .1]], transform: [['a', 'FATTORE a', -3, 3, .1], ['b', 'FATTORE b', -3, 3, .1], ['h', 'TRASLAZIONE h', -4, 4, .1], ['k', 'TRASLAZIONE k', -5, 5, .1]], radical: [['index', 'INDICE', 2, 5, 1], ['h', 'ORIGINE h', -4, 4, .5]], linear: [['m1', 'PENDENZA 1', -3, 3, .25], ['q1', 'INTERCETTA 1', -5, 5, .5], ['m2', 'PENDENZA 2', -3, 3, .25], ['q2', 'INTERCETTA 2', -5, 5, .5]], reserve: [['initial', 'QUANTITÀ INIZIALE', 20, 300, 10], ['loss', 'FRAZIONE PERSA', .02, .5, .01], ['t', 'TEMPO', 0, 50, 1]], rational: [['zeroA', 'ZERO a', -5, 5, .5], ['zeroB', 'ZERO b', -5, 5, .5], ['pole', 'PUNTO ESCLUSO', -5, 5, .5]] }[S.lab];
    const hasChoice = S.lab === 'transform' || S.lab === 'radical';
    const cx = mobile ? 30 : 38, cy = hasChoice && mobile ? 341 : 300, cw = mobile ? w - 60 : 246;
    const cols = mobile && controls.length >= 3 ? 2 : 1;
    const rows = Math.ceil(controls.length / cols), cellWidth = cw / cols;
    U.panel(cx - 10, cy, cw + 20, mobile ? rows * 61 + 12 : h - cy - 116, C.cyan, .85);
    controls.forEach(([key, label, min, max, step], i) => U.slider('param-' + key, label, cx + 8 + (i % cols) * cellWidth, cy + 16 + Math.floor(i / cols) * 61, cellWidth - 20, v[key], min, max, step, value => { v[key] = value; if (key === 'p')
        v.x = Math.min(v.x, v.p / 2 - .1); }, n => Number(n.toFixed(2)).toString()));
    const gx = mobile ? 65 : 365, gy = mobile ? cy + rows * 61 + 72 : 359, gw = mobile ? w - 105 : w - 425, gh = Math.max(100, h - gy - 216);
    if (hasChoice) {
        const choices = S.lab === 'transform' ? [['quadratic', 'PARABOLA'], ['absolute', 'MODULO'], ['sine', 'SENO']] : [['root', 'RADICE'], ['square', 'RADICE DI QUADRATO']];
        const bx = mobile ? 30 : cx + 7, by = mobile ? 296 : cy + 16 + rows * 61 + 4, totalWidth = mobile ? w - 60 : cw - 14, bw = (totalWidth - (choices.length - 1) * 5) / choices.length;
        choices.forEach(([value, label], i) => U.button('model-' + value, label, bx + i * (bw + 5), by, bw, 32, () => { if (S.lab === 'transform')
            v.base = value;
        else
            v.mode = value; }, { active: (S.lab === 'transform' ? v.base : v.mode) === value, small: true }));
    }
    if (!mobile)
        U.panel(gx - 40, 300, gw + 70, h - 416, C.cyan, .78);
    U.text(m.formula, mobile ? 34 : gx, gy - 43, mobile ? 'mini' : 'sub', C.lime);
    if (S.labCompare?.lab === S.lab) {
        const old = mathData(S.labCompare.data);
        for (const line of old.series)
            m.series.push({ ...line, color: C.purple });
    }
    U.graph(gx, gy, gw, gh, m.series, { xmin: m.xmin, xmax: m.xmax, ymin: m.ymin, ymax: m.ymax, xLabel: S.lab === 'reserve' ? 't (intervalli)' : 'x', yLabel: S.lab === 'rectangle' ? 'A (m²)' : 'valore' });
    U.wrap(m.explain, mobile ? 34 : gx - 15, h - 160, mobile ? w - 68 : gw + 10, C.pale, 22, 2, 'mini');
    if (S.lab === 'rectangle' && mobile)
        U.button('find-square', 'QUADRATO', 30, 206, 111, 27, () => v.x = v.p / 4, { small: true });
    if (S.lab === 'rectangle' && !mobile) {
        U.button('find-square', 'TROVA IL QUADRATO', cx + 7, cy + 171, cw - 14, 38, () => v.x = v.p / 4, { active: true });
        U.text('Area: ' + m.result.area.toFixed(2) + ' m²', cx + 7, cy + 235, 'body', C.pale);
        U.text('Massimo: ' + m.result.maxArea.toFixed(2) + ' m²', cx + 7, cy + 269, 'body', C.amber);
    }
    if (S.labCompare?.lab === S.lab) {
        const a = S.labCompare.data;
        U.text('SCENARIO A CONSERVATO', mobile ? 34 : cx + 7, mobile ? h - 112 : cy + 335, 'micro', C.amber);
    }
}
function quizList() { return S.quizFilter ? questions.filter(q => S.quizFilter.includes(q.id)) : questions; }
function quizUI() {
    const w = R.w, h = R.h, mobile = w < 850, qs = quizList();
    if (!qs.length) {
        S.quizFilter = null;
        say('Nessun errore controllato da ripassare.');
        return;
    }
    S.quizIndex = clamp(S.quizIndex, 0, qs.length - 1);
    const q = qs[S.quizIndex], answers = S.quizMode === 'exam' ? S.exam : store.data.quiz, answer = answers[q.id];
    title('FUNZIONI / QUESITI DELLA DISPENSA', S.quizMode === 'exam' ? 'VERIFICA' : 'ALLENAMENTO', `Quesito ${q.id} · ${S.quizIndex + 1}/${qs.length} · ${S.quizMode === 'exam' ? 'correzione alla consegna' : 'spiegazione dopo il controllo'}`);
    const x = mobile ? 14 : 270, y = 243, ww = mobile ? w - 28 : Math.min(950, w - x - 50), hh = h - y - 167;
    U.panel(x, y, ww, hh, C.cyan, .87);
    const shownSolution = S.quizSolution && (S.quizMode === 'training' ? answer?.checked : S.examSubmitted);
    documentView(q.id + (shownSolution ? '-solution' : '-question'), { x: x + 8, y: y + 8, w: ww - 24, h: hh - 16 });
    if (!shownSolution) {
        const doc = S.visibleDoc;
        for (const o of doc.variant.options) {
            const yy = doc.rect.y + o.y * doc.scale - S.scroll, oh = o.height * doc.scale, top = Math.max(doc.rect.y, yy), bottom = Math.min(doc.rect.y + doc.rect.h, yy + oh);
            if (bottom <= top)
                continue;
            const selectedAnswer = answer?.answer === o.id;
            R.roundRect(doc.rect.x, top, doc.rect.w, bottom - top, 7, color('#50afa0', selectedAnswer ? .11 : 0), selectedAnswer ? C.lime : null, 3);
            U.buttons.push({ id: 'answer-' + o.id, label: 'Risposta ' + o.id, x: doc.rect.x, y: top, w: doc.rect.w, h: bottom - top, disabled: S.quizMode === 'exam' && S.examSubmitted, action: () => {
                    answers[q.id] = { answer: o.id, checked: false };
                    S.quizSolution = false;
                    if (S.quizMode === 'training')
                        store.save();
                } });
        }
    }
    const by = h - 148, bw = mobile ? (w - 48) / 3 : 158;
    U.button('quiz-prev', '◂', x, by, mobile ? 46 : 55, 35, () => { S.quizIndex = Math.max(0, S.quizIndex - 1); S.scroll = 0; S.quizSolution = false; }, { disabled: S.quizIndex === 0 });
    U.button('quiz-next', '▸', x + (mobile ? 53 : 63), by, mobile ? 46 : 55, 35, () => { S.quizIndex = Math.min(qs.length - 1, S.quizIndex + 1); S.scroll = 0; S.quizSolution = false; }, { disabled: S.quizIndex >= qs.length - 1 });
    if (S.quizMode === 'training')
        U.button('quiz-check', answer?.checked ? (S.quizSolution ? 'CONSEGNA' : 'SOLUZIONE') : 'CONTROLLA', x + (mobile ? 112 : 135), by, mobile ? ww - 116 : 170, 35, () => {
            if (!answer?.answer) {
                say('Seleziona prima una risposta.');
                return;
            }
            if (!answer.checked) {
                answer.checked = true;
                store.save();
                say(answer.answer === q.correctOptionId ? 'Risposta corretta. Leggi il ragionamento.' : 'Risposta da rivedere. Consulta la spiegazione.');
                S.quizSolution = true;
            }
            else
                S.quizSolution = !S.quizSolution;
            S.scroll = 0;
        });
    else
        U.button('quiz-submit', S.examSubmitted ? 'SOLUZIONE' : 'CONSEGNA VERIFICA', x + (mobile ? 112 : 135), by, mobile ? ww - 116 : 210, 35, () => {
            if (S.examSubmitted) {
                S.quizSolution = !S.quizSolution;
                S.scroll = 0;
                return;
            }
            S.examSubmitted = true;
            for (const [id, a] of Object.entries(S.exam)) {
                a.checked = true;
                store.data.quiz[id] = a;
            }
            store.save();
            const g = grade(questions, S.exam);
            say(`${g.correct} corrette, ${g.wrong} errate, ${g.unanswered} non risposte.`);
        });
    if (!mobile) {
        U.tag('MODALITÀ', 33, 254);
        U.button('mode-training', 'ALLENAMENTO', 31, 288, 212, 38, () => { S.quizMode = 'training'; S.quizSolution = false; S.scroll = 0; }, { active: S.quizMode === 'training' });
        U.button('mode-exam', 'NUOVA VERIFICA', 31, 337, 212, 38, () => { S.quizMode = 'exam'; S.exam = {}; S.examSubmitted = false; S.quizIndex = 0; S.quizFilter = null; S.quizSolution = false; S.scroll = 0; }, { active: S.quizMode === 'exam' });
        U.button('review-errors', 'RIPASSA GLI ERRORI', 31, 386, 212, 38, () => { S.quizFilter = questions.filter(v => store.data.quiz[v.id]?.checked && store.data.quiz[v.id].answer !== v.correctOptionId).map(v => v.id); S.quizMode = 'training'; S.quizIndex = 0; S.scroll = 0; S.quizSolution = false; }, { small: true });
        U.button('all-questions', 'TUTTI I QUESITI', 31, 435, 212, 38, () => { S.quizFilter = null; S.quizIndex = 0; S.scroll = 0; S.quizSolution = false; }, { small: true });
        let graded = S.quizMode === 'exam' ? S.examSubmitted : null;
        const g = grade(questions, answers);
        U.tag('RISULTATI', 34, 506, C.muted);
        if (S.quizMode === 'training' || graded) {
            U.text(g.correct + ' corrette', 34, 540, 'sub', C.lime);
            U.text(g.wrong + ' errate', 34, 576, 'body', C.red);
            U.text(g.unanswered + ' non risposte', 34, 608, 'body', C.muted);
        }
        else
            U.text((40 - g.unanswered) + ' / 40 risposte', 34, 540, 'body', C.pale);
        U.button('quiz-source', 'FONTE ORIGINALE', 31, 670, 212, 37, () => openPDF(q.source.pdfPage));
    }
    if (mobile) {
        const mw = (w - 44) / 3;
        U.button('mode-training', 'ALLENAMENTO', 14, h - 68, mw, 26, () => { S.quizMode = 'training'; S.quizSolution = false; S.scroll = 0; }, { active: S.quizMode === 'training', small: true });
        U.button('mode-exam', 'VERIFICA', 22 + mw, h - 68, mw, 26, () => { S.quizMode = 'exam'; S.exam = {}; S.examSubmitted = false; S.quizIndex = 0; S.quizFilter = null; S.quizSolution = false; S.scroll = 0; }, { active: S.quizMode === 'exam', small: true });
        U.button('review-errors', 'ERRORI', 30 + mw * 2, h - 68, mw, 26, () => { S.quizFilter = questions.filter(v => store.data.quiz[v.id]?.checked && store.data.quiz[v.id].answer !== v.correctOptionId).map(v => v.id); S.quizMode = 'training'; S.quizIndex = 0; S.scroll = 0; S.quizSolution = false; }, { small: true });
    }
    U.text(answer?.answer ? 'Scelta: ' + answer.answer : 'Nessuna scelta registrata', x, h - 92, 'mini', C.muted);
    if (S.quizMode === 'training' && answer?.checked)
        U.text(answer.answer === q.correctOptionId ? 'CORRETTA' : 'DA RIVEDERE', x + 230, h - 92, 'mini', answer.answer === q.correctOptionId ? C.lime : C.red);
}
function startEdit(mode) { S.editing = mode; editor.value = mode === 'search' ? S.query : mode === 'page' ? String(S.pdfPage) : (store.data.notes[S.journalTab] || ''); editor.focus(); editor.setSelectionRange(editor.value.length, editor.value.length); say(mode === 'page' ? 'Scrivi un numero di pagina e premi Invio.' : mode === 'search' ? 'Digita per cercare; Esc termina la ricerca.' : 'Scrivi gli appunti. Salva o premi Esc per tornare alla navigazione.'); }
function finishEdit(save = true) {
    if (S.editing === 'notes' && save) {
        store.data.notes[S.journalTab] = editor.value.slice(0, 30000);
        store.save();
        say('Appunti salvati' + (store.persistent ? ' nel browser.' : ' per la sessione; esporta una copia.'));
    }
    if (S.editing === 'page') {
        const n = Number(editor.value);
        const pages = DOCUMENTS[docKey(S.pdfDoc)].pages;
        if (Number.isInteger(n) && n >= 1 && n <= pages) {
            S.pdfPage = n;
            S.scroll = 0;
            updateHash();
        }
        else
            say('La pagina deve essere compresa tra 1 e ' + pages + '.');
    }
    S.editing = null;
    editor.blur();
    canvas.focus();
}
/** Text of the exploration diary: totals, then the registered species and places, planet by planet. */
let exploreLogCache = ['', ''];
/** Map part of the exploration diary: systems visited and passages opened, with what opened them. */
function mapLog() {
    const e = exploration(passages, store.data), read = new Set(store.data.read), title = id => moduleById(id)?.title || id, rows = [];
    rows.push(`Sistemi visitati: ${e.visited} su ${e.systems}. Passaggi scoperti: ${e.opened} su ${e.passages}, ${e.lanes} corsie nello stesso braccio e ${e.jumps} porte di salto fra bracci diversi. Un passaggio si apre leggendo fino in fondo la sezione di un capitolo che rimanda a un’altra area, oppure arrivando ai collegamenti di un percorso guidato.`);
    for (const p of passages.filter(p => e.open.has(p.id))) {
        const via = [...new Set(p.links.filter(l => linkOpen(l, store.data, read)).map(l => (l.via === 'capitolo' ? 'dal capitolo «' : 'dal percorso guidato «') + title(l.from) + '»'))].slice(0, 3);
        rows.push(`${p.kind === 'salto' ? 'Porta di salto' : 'Corsia'} fra «${AREAS[p.systems[0]].name}» e «${AREAS[p.systems[1]].name}», aperta ${via.length > 1 ? via.slice(0, -1).join(', ') + ' e ' + via.at(-1) : via[0]}.`);
    }
    return rows;
}
function exploreLog() {
    const key = store.data.updatedAt + '|' + JSON.stringify(store.data.explore) + '|' + store.data.read.length + '|' + JSON.stringify(Object.values(store.data.courses || {}).map(r => r.stage + (r.completedAt ? 'c' : ''))) + '|' + (store.data.atlas?.visited || []).length; if (exploreLogCache[0] === key) return exploreLogCache[1];
    const genomes = planetGenomes(), species = planetSpecies(), places = genomes.map(placeList), rows = [], physics = planetPhysics();
    let s = 0, l = 0, planets = 0, measuredPlanets = 0, landings = 0;
    for (const rec of Object.values(store.data.explore)) if (rec.v === 1 || rec.s.length) landings++;
    for (const [key, rec] of Object.entries(store.data.explore)) {
        const i = Number(key), m = data.modules[i], measured = (rec.m || []).map(id => INSTRUMENTS.find(x => x.id === id)?.name).filter(Boolean); if (!m || !(rec.s.length + rec.l.length + measured.length)) continue;
        planets++; s += rec.s.length; l += rec.l.length; if (measured.length) measuredPlanets++;
        const sp = species[i].filter(x => rec.s.includes(x.id)).map(x => x.name + ' (' + x.label + ')'), pl = places[i].filter(x => rec.l.includes(x.id)).map(x => x.name);
        const d = rec.m?.includes('biofirme') ? diagnosis(physics[i], species[i].length, landed(i)) : null, lovelock = d ? 'Diagnosi di Lovelock: ' + VERDICTS[d.verdict] + (d.outcome === 'da-verificare' ? '' : ', ' + OUTCOMES[d.outcome]) + '.' : '';
        rows.push([m.title.toUpperCase() + ' (' + areaOf(i).name + ').', sp.length ? 'Specie: ' + sp.join(', ') + '.' : '', pl.length ? 'Luoghi: ' + pl.join(', ') + '.' : '', measured.length ? 'Misure: ' + measured.join(', ') + '.' : '', lovelock].filter(Boolean).join(' '));
    }
    const total = species.reduce((n, x) => n + x.length, 0), totalPlaces = places.reduce((n, x) => n + x.length, 0);
    const head = `Pianeti visitati in superficie: ${landings} su ${genomes.length}. Pianeti con registrazioni: ${planets} su ${genomes.length}. Specie registrate: ${s} su ${total}. Luoghi registrati: ${l} su ${totalPlaces}. Pianeti misurati con gli strumenti della nave: ${measuredPlanets}; strumenti a bordo: ${onBoard(store.data, instrumentSections).size} su ${INSTRUMENTS.length}.`;
    const t = expeditionTotals(store.data, expeditionLists), expeditionRows = data.modules.filter(m => expeditionsOf(m.planetIndex).some(x => x.solved)).map(m => m.title.toUpperCase() + ': spedizioni ' + expeditionLine(m.id, false));
    const outposts = AREAS.filter((x, k) => outpostOf(k).built).length;
    const expeditionHead = `Mondi di sintesi visitati nel Nucleo di Gaia: ${(store.data.atlas.core || []).length} su ${SYNTHESIS_WORLDS.length}. Avamposti di ricerca costruiti: ${outposts} su ${AREAS.length}. Spedizioni completate: ${t.done} su ${t.available}, su ${t.planets} pianeti. Esercizi del libro e domande dei percorsi di matematica risolti: ${t.solved} su ${t.total}. Gli esercizi contano quando lo studente li segna come risolti nel libro, dopo il confronto con la soluzione.`;
    exploreLogCache = [key, [...mapLog(), head, expeditionHead, ...expeditionRows, ...(rows.length ? rows : ['Nessuna registrazione. Scendi su un pianeta, scegli «Esplora il pianeta» e registra specie e luoghi; in orbita, «Dati fisici» registra le misure degli strumenti a bordo.'])].join('\n')];
    return exploreLogCache[1];
}
const capital = s => s[0].toUpperCase() + s.slice(1);
/** One line per instrument: how it came on board, or what to study to obtain it. */
function instrumentStatus(i, short = false) {
    const how = obtainedBy(i, store.data, instrumentSections), chapter = moduleById(i.unit)?.title || i.unit, { left, total } = sectionsLeft(i, store.data, instrumentSections);
    if (how) return { on: true, text: how === 'percorso' ? 'A bordo: percorso guidato completato.' : 'A bordo: capitolo letto per intero.' };
    if (!total) return { on: false, text: short ? 'Completa il percorso guidato.' : `Da ottenere: completa il percorso guidato dell’unità «${chapter}».` };
    return { on: false, text: short ? `Mancano ${left} sezioni su ${total} di «${chapter}», oppure il percorso guidato.` : `Da ottenere: leggi le ${total} sezioni del capitolo «${chapter}» (ne mancano ${left}) oppure completa il suo percorso guidato.` };
}
/** The exploration ship: instruments on board and to obtain, and the explorer mode. */
function shipUI() {
    const w = R.w, h = R.h, mobile = w < 850, board = onBoard(store.data, instrumentSections), explorer = explorerMode(store.data);
    title('DIARIO ▸ NAVE', 'La nave da esplorazione', mobile ? `Strumenti a bordo: ${board.size} di ${INSTRUMENTS.length}.` : `Strumenti a bordo: ${board.size} di ${INSTRUMENTS.length}. Ogni strumento si ottiene studiando un’unità e mostra una parte dei dati fisici dei pianeti.`);
    const x = mobile ? 18 : 40, ww = mobile ? w - 36 : w - 80, top = 238;
    U.button('ship-explorer', explorer ? 'MODALITÀ ESPLORATORE: SÌ' : 'MODALITÀ ESPLORATORE: NO', x, top, mobile ? ww : 320, 38, () => { store.data.preferences.explorer = !explorer; store.save(); }, { active: explorer, small: mobile });
    U.buttons.at(-1).label = explorer ? 'Modalità esploratore attiva: i dati fisici compaiono con gli strumenti. Premi per mostrarli tutti.' : 'Modalità esploratore disattivata: i dati fisici sono tutti visibili. Premi per farli comparire con gli strumenti.';
    if (!mobile) wrapClipText(explorer ? 'I dati fisici compaiono quando lo strumento che li misura è a bordo.' : 'Tutti i dati fisici sono visibili, come in un archivio.', x + 340, top + 9, ww - 340, 'micro', C.muted, 2);
    const y0 = top + 54, cols = w >= 1100 ? 2 : 1, cw = (ww - (cols - 1) * 16) / cols, ch = mobile ? Math.min(172, Math.max(112, h - y0 - 162)) : 128;
    const per = cols * Math.max(1, Math.floor((h - y0 - 150) / (ch + 12))), pages = Math.ceil(INSTRUMENTS.length / per), page = S.shipPage = clamp(S.shipPage || 0, 0, pages - 1);
    INSTRUMENTS.slice(page * per, (page + 1) * per).forEach((ins, k) => {
        const cx = x + (k % cols) * (cw + 16), cy = y0 + Math.floor(k / cols) * (ch + 12), st = instrumentStatus(ins, mobile), unit = moduleById(ins.unit);
        U.panel(cx, cy, cw, ch, st.on ? C.lime : C.cyan, .9);
        U.text(capital(ins.name), cx + 16, cy + 14, 'sub', st.on ? C.pale : C.muted);
        // Short phones keep one line of description, so the status always fits in the card.
        const descLines = mobile ? (ch >= 160 ? 4 : 1) : 2, y = cy + 46 + 18 * wrapClipText(capital(ins.measures) + '. Rivela: ' + ins.rows.join(', ') + '.', cx + 16, cy + 46, cw - 32, 'micro', C.muted, descLines);
        // On phones the study button sits in the bottom right corner, beside the status, clear of the name.
        const study = !st.on && unit, side = study && mobile ? 112 : 0;
        wrapClipText(st.text, cx + 16, y + 4, cw - 32 - side, 'micro', st.on ? C.lime : C.pale, Math.max(1, Math.floor((cy + ch - y - 8) / 18)));
        if (study) { const label = book?.has(ins.unit) ? (mobile ? 'CAPITOLO' : 'LEGGI IL CAPITOLO') : (mobile ? 'UNITÀ' : 'APRI L’UNITÀ'); U.button('ship-study-' + ins.id, label, mobile ? cx + cw - 116 : cx + cw - 196, mobile ? cy + ch - 42 : cy + 10, mobile ? 100 : 180, 32, () => book?.has(ins.unit) ? openChapter(ins.unit) : openCourse(ins.unit), { small: true }); U.buttons.at(-1).label = 'Studia ' + unit.title + ' per ottenere ' + ins.the; }
    });
    const bw = mobile ? (w - 48) / 2 : 220;
    if (pages > 1) { U.button('ship-prev', 'INDIETRO', mobile ? 18 : w - 2 * 130 - 40, h - 134, mobile ? bw : 120, 36, () => { S.shipPage = page - 1; }, { disabled: page === 0, small: true }); U.button('ship-next', 'AVANTI', mobile ? 30 + bw : w - 160, h - 134, mobile ? bw : 120, 36, () => { S.shipPage = page + 1; }, { disabled: page === pages - 1, small: true }); }
    const nb = mobile ? (w - 60) / 3 : 220;
    U.button('ship-orbit', mobile ? 'PIANETA' : 'TORNA AL PIANETA', mobile ? 18 : 35, h - 88, nb, 39, () => route('orbit'), { small: mobile });
    U.button('ship-journal', mobile ? 'DIARIO' : 'DIARIO DI ESPLORAZIONE', mobile ? 30 + nb : 267, h - 88, nb, 39, () => { S.journalTab = 'explore'; S.scroll = 0; route('journal'); }, { small: mobile });
    U.button('ship-gaia', mobile ? 'GAIA' : 'NUCLEO DI GAIA', mobile ? 42 + 2 * nb : 499, h - 88, nb, 39, () => route('gaia'), { small: mobile }); U.buttons.at(-1).label = 'Apri il Nucleo di Gaia: la diagnosi di Lovelock dei pianeti misurati';
}
function shipText() {
    const board = onBoard(store.data, instrumentSections);
    return `La nave da esplorazione. Strumenti a bordo: ${board.size} di ${INSTRUMENTS.length}. Modalità esploratore ${explorerMode(store.data) ? 'attiva: i dati fisici compaiono con gli strumenti' : 'disattivata: i dati fisici sono tutti visibili'}. ` + INSTRUMENTS.map(i => `${capital(i.name)}: ${i.verb || 'misura'} ${i.measures}; rivela ${i.rows.join(', ')}. ${instrumentStatus(i).text}`).join(' ');
}
/** Research outposts (src/navigation/outposts.js): the summary of an area, reached from its system. */
const modulesByPlanet = () => data.modules.reduce((a, m) => (a[m.planetIndex] = m, a), []);
const outpostOf = area => outpostReport(area, modulesByPlanet(), store.data, { lists: expeditionLists, sections: chapterSections, passages });
/** Lines of text as blocks of the paged panel; the last one carries the gap below the paragraph. */
function textBlocks(t, c, at, w, gap = 10) {
    const rows = fittedRows(R, [t], w, 'micro').filter(Boolean);
    return rows.map((r, k) => ({ h: 18 + (k === rows.length - 1 ? gap : 0), draw: y => U.text(r, at, y, 'micro', c) }));
}
const pathLine = u => u.path.completed ? 'Percorso guidato completato' : `Percorso guidato: tappa ${u.path.stage + 1} di ${PATH_STEPS}`;
const chapterLine = u => u.chapter ? `Capitolo: ${u.chapter.read} di ${u.chapter.total} sezioni lette` : 'Senza capitolo nel libro';
function outpostIntro(r) {
    const t = r.totals;
    return (r.built ? `Avamposto costruito: ${t.done === 1 ? 'una spedizione completata' : t.done + ' spedizioni completate'} su ${t.available} nell’area.` : 'Cantiere: l’avamposto si costruisce completando la prima spedizione di un pianeta dell’area. Il riepilogo è già consultabile.')
        + ` L’area «${r.name}» ha ${r.units.length} unità.`;
}
function outpostBlocks(r, tab, x, ww, mobile) {
    // The status of the outpost opens the first tab; the other tabs start with their own totals.
    const tx = x + 16, tw = ww - 32, t = r.totals, blocks = tab === 'unita' ? textBlocks(outpostIntro(r), r.built ? C.lime : C.pale, tx, tw) : [];
    if (tab === 'unita') {
        blocks.push(...textBlocks(`Sezioni lette nei capitoli dell’area: ${t.sectionsRead} di ${t.sections}. Percorsi guidati completati: ${t.paths} di ${r.units.length}. Ogni percorso ha il suo laboratorio alla terza tappa.`, C.muted, tx, tw));
        r.units.forEach((u, k) => {
            const head = fittedRows(R, [(k + 1) + '. ' + u.title], tw, 'micro').filter(Boolean).slice(0, 2), bw = Math.min(150, (tw - 16) / 3);
            blocks.push({ h: head.length * 18 + 36 + 46, draw: y => {
                head.forEach((row, i) => U.text(row, tx, y + i * 18, 'micro', C.pale));
                const yy = y + head.length * 18;
                U.text(chapterLine(u), tx, yy, 'micro', u.chapter && u.chapter.read === u.chapter.total ? C.lime : C.muted);
                U.text(pathLine(u), tx, yy + 18, 'micro', u.path.completed ? C.lime : C.muted);
                if (u.chapter) { U.button('outpost-book-' + u.index, 'LIBRO', tx, yy + 40, bw, 34, () => openChapter(u.unit), { small: true }); U.buttons.at(-1).label = 'Leggi il capitolo «' + u.title + '»'; }
                U.button('outpost-lab-' + u.index, 'LABORATORIO', tx + bw + 8, yy + 40, bw, 34, () => openCourse(u.unit, LAB_STAGE), { small: true }); U.buttons.at(-1).label = 'Apri il laboratorio del percorso «' + u.title + '»';
                U.button('outpost-planet-' + u.index, 'PIANETA', tx + 2 * (bw + 8), yy + 40, bw, 34, () => enterPlanet(u.index), { small: true }); U.buttons.at(-1).label = 'Vai in orbita al pianeta «' + u.title + '»';
            } });
        });
    } else if (tab === 'spedizioni') {
        blocks.push(...textBlocks(`Spedizioni completate nell’area: ${t.done} di ${t.available}. Esercizi del libro e domande dei percorsi risolti: ${t.solved} di ${t.exercises}.` + (r.built ? '' : ' La prima spedizione completata costruisce l’avamposto.'), r.built ? C.lime : C.pale, tx, tw));
        r.units.forEach((u, k) => {
            const head = fittedRows(R, [(k + 1) + '. ' + u.title], tw - 104, 'micro').filter(Boolean);
            blocks.push({ h: Math.max(head.length * 18, 32) + u.expeditions.length * 18 + 12, draw: y => {
                head.forEach((row, i) => U.text(row, tx, y + i * 18, 'micro', C.pale));
                U.button('outpost-exp-' + u.index, 'APRI', x + ww - 16 - 92, y - 4, 92, 32, () => { enterPlanet(u.index); S.expeditionsFor = u.index; S.physicsFor = null; }, { small: true }); U.buttons.at(-1).label = 'Apri le spedizioni del pianeta «' + u.title + '»';
                const yy = y + Math.max(head.length * 18, 32);
                u.expeditions.forEach((e, i) => U.text(capital(e.place) + ': ' + expeditionStatus(e), tx + 12, yy + i * 18, 'micro', e.done ? C.lime : e.kind === 'attesa' ? C.dim : C.muted));
            } });
        });
    } else {
        blocks.push(...textBlocks(`Pianeti misurati con gli strumenti di bordo: ${t.measured} di ${r.units.length}. Pianeti visitati in superficie: ${t.landed}. Specie registrate: ${t.species}.`, C.pale, tx, tw));
        blocks.push(...textBlocks(r.routes.length ? `Passaggi aperti verso altre aree: ${r.routes.length}; ancora chiusi: ${r.closed}.` : `Nessun passaggio aperto verso altre aree; passaggi ancora chiusi: ${r.closed}. Si aprono leggendo le sezioni con i rimandi e completando i percorsi.`, C.muted, tx, tw));
        for (const p of r.routes) {
            const label = (p.kind === 'salto' ? 'Porta di salto verso «' : 'Corsia verso «') + p.name + '»', rows = fittedRows(R, [label], tw - 104, 'micro').filter(Boolean).slice(0, 2);
            blocks.push({ h: Math.max(rows.length * 18, 32) + 10, draw: y => {
                rows.forEach((row, i) => U.text(row, tx, y + i * 18, 'micro', p.kind === 'salto' ? C.amber : C.cyan));
                U.button('outpost-route-' + p.to, 'VAI', x + ww - 16 - 92, y - 4, 92, 32, () => enterSystem(p.to), { small: true }); U.buttons.at(-1).label = 'Vai al sistema «' + p.name + '»';
            } });
        }
    }
    return blocks;
}
function outpostUI() {
    const w = R.w, h = R.h, mobile = w < 850, short = h < 700, r = outpostOf(S.system), m = selected(), tint = sectorColors[r.sector];
    title(areaTrail(m, ['AVAMPOSTO']), r.built ? 'Avamposto di ricerca' : 'Cantiere dell’avamposto', short ? '' : mobile ? r.name + '.' : `«${r.name}»: capitoli, laboratori, spedizioni e rotte dell’area.`);
    pagedTabs('outpost', 'dell’avamposto', [['unita', 'UNITÀ DELL’AREA', 'UNITÀ'], ['spedizioni', 'SPEDIZIONI'], ['rotte', 'ESPLORAZIONE', 'ROTTE']], 'outpostTab', 'outpostPage', (tab, x, ww, mob) => outpostBlocks(r, tab, x, ww, mob), tint);
    const bw = mobile ? (w - 60) / 3 : 220;
    U.button('outpost-system', mobile ? 'SISTEMA' : 'TORNA AL SISTEMA', mobile ? 18 : 35, h - 88, bw, 39, () => enterSystem(S.system), { small: mobile });
    U.button('outpost-region', mobile ? 'REGIONE' : 'REGIONE DEL BRACCIO', mobile ? 30 + bw : 267, h - 88, bw, 39, () => route('region'), { small: mobile }); U.buttons.at(-1).label = 'Apri la regione del braccio della ' + ARM_NAMES[r.sector];
    U.button('outpost-journal', mobile ? 'DIARIO' : 'DIARIO DI ESPLORAZIONE', mobile ? 42 + 2 * bw : 499, h - 88, bw, 39, () => { S.journalTab = 'explore'; S.scroll = 0; route('journal'); }, { small: mobile });
}
function outpostText() {
    const r = outpostOf(S.system), t = r.totals;
    return [`${r.built ? 'Avamposto di ricerca' : 'Cantiere dell’avamposto'} dell’area «${r.name}». ${outpostIntro(r)}`,
        `Sezioni lette: ${t.sectionsRead} di ${t.sections}; percorsi guidati completati: ${t.paths} di ${r.units.length}.`,
        ...r.units.map((u, k) => `${k + 1}. ${u.title}: ${chapterLine(u).toLowerCase()}; ${pathLine(u).toLowerCase()}; spedizioni ${u.expeditions.map(e => e.place + ' ' + expeditionStatus(e)).join(', ')}.`),
        `Esercizi e domande risolti: ${t.solved} di ${t.exercises}. Pianeti misurati: ${t.measured}; visitati in superficie: ${t.landed}; specie registrate: ${t.species}.`,
        r.routes.length ? 'Passaggi aperti: ' + r.routes.map(p => (p.kind === 'salto' ? 'porta di salto verso «' : 'corsia verso «') + p.name + '»').join(', ') + `. Ancora chiusi: ${r.closed}.` : `Nessun passaggio aperto; ancora chiusi: ${r.closed}.`].join(' ');
}
/** Regions of the galaxy (src/navigation/regions.js): the progress along one discipline arm. */
const regionOf = sector => regionReport(sector, modulesByPlanet(), store.data, { lists: expeditionLists, sections: chapterSections, passages });
function regionSummary(r) {
    const t = r.totals;
    return `Il braccio della ${r.name} ha ${t.areas} aree e ${t.units} unità, disposte dal nucleo verso l’esterno nell’ordine di studio. Avamposti costruiti: ${t.built} di ${t.areas}. Spedizioni completate: ${t.done} di ${t.available}.` + (t.sections ? ` Sezioni lette: ${t.sectionsRead} di ${t.sections}.` : '') + ` Percorsi guidati completati: ${t.paths} di ${t.units}.`;
}
const areaLine = a => (a.built ? 'Avamposto costruito' : 'Cantiere') + `; spedizioni ${a.totals.done} di ${a.totals.available}` + (a.totals.sections ? `; sezioni lette ${a.totals.sectionsRead} di ${a.totals.sections}` : '');
const cloudShare = r => `Stelle brillanti aggiunte intorno alla nube del braccio: ${Math.round(r.cloud.share * 100)}% di quelle che arricchiscono le cinque nubi della galassia.`;
function regionBlocks(r, tab, x, ww, mobile) {
    const tx = x + 16, tw = ww - 32, blocks = [];
    if (tab === 'aree') {
        blocks.push(...textBlocks(regionSummary(r), C.pale, tx, tw));
        r.areas.forEach((a, k) => {
            const head = fittedRows(R, [(k + 1) + '. ' + a.name], tw, 'micro').filter(Boolean), line = fittedRows(R, [areaLine(a)], tw, 'micro').filter(Boolean), bw = Math.min(150, (tw - 8) / 2);
            blocks.push({ h: (head.length + line.length) * 18 + 46, draw: y => {
                head.forEach((row, i) => U.text(row, tx, y + i * 18, 'micro', C.pale));
                line.forEach((row, i) => U.text(row, tx, y + (head.length + i) * 18, 'micro', a.built ? C.lime : C.muted));
                const yy = y + (head.length + line.length) * 18 + 4;
                U.button('region-system-' + a.area, 'SISTEMA', tx, yy, bw, 34, () => enterSystem(a.area), { small: true }); U.buttons.at(-1).label = 'Vai al sistema «' + a.name + '»';
                U.button('region-outpost-' + a.area, a.built ? 'AVAMPOSTO' : 'CANTIERE', tx + bw + 8, yy, bw, 34, () => route('outpost', { selected: AREAS[a.area].units[0] }), { small: true, active: a.built }); U.buttons.at(-1).label = (a.built ? 'Entra nell’avamposto' : 'Apri il cantiere') + ' dell’area «' + a.name + '»';
            } });
        });
    } else if (tab === 'rotte') {
        blocks.push(...textBlocks(`Corsie fra le aree del braccio: ${r.lanes.open} aperte su ${r.lanes.total}. Porte di salto verso gli altri bracci: ${r.jumps.open.length} aperte su ${r.jumps.total}.` + (r.jumps.open.length ? '' : ' Le porte si aprono leggendo le sezioni con rimandi ad altre discipline e completando i percorsi.'), C.pale, tx, tw));
        for (const p of r.jumps.open) {
            const rows = fittedRows(R, [`Porta di salto verso «${p.name}», braccio della ${ARM_NAMES[p.sector]}`], tw - 104, 'micro').filter(Boolean);
            blocks.push({ h: Math.max(rows.length * 18, 32) + 10, draw: y => {
                rows.forEach((row, i) => U.text(row, tx, y + i * 18, 'micro', sectorColors[p.sector]));
                U.button('region-jump-' + p.id, 'VAI', x + ww - 16 - 92, y - 4, 92, 32, () => enterSystem(p.to), { small: true }); U.buttons.at(-1).label = 'Vai al sistema «' + p.name + '»';
            } });
        }
    } else {
        blocks.push(...textBlocks(`La nube del braccio: ${r.cloud.family.toLowerCase()}.`, C.pale, tx, tw), ...textBlocks(r.sky, C.muted, tx, tw), ...textBlocks(cloudShare(r), C.muted, tx, tw));
        blocks.push(...textBlocks('Le nubi sono volumi calcolati dal motore grafico del sito, senza immagini: ogni braccio ha la propria, con il colore della sua famiglia, e una nube più tenue segna la periferia della galassia in fondo al braccio della Fisica.', C.dim, tx, tw));
    }
    return blocks;
}
function regionUI() {
    const w = R.w, h = R.h, mobile = w < 850, short = h < 700, sector = AREAS[S.system].sector, r = regionOf(sector), tint = sectorColors[sector];
    title('GALASSIA ▸ ' + r.name.toUpperCase() + ' ▸ REGIONE', 'Braccio della ' + r.name, short ? '' : mobile ? r.cloud.family + '.' : `${r.cloud.family}: ${r.totals.areas} aree, ${r.totals.built} avamposti costruiti.`);
    pagedTabs('region', 'della regione', [['aree', 'AREE DEL BRACCIO', 'AREE'], ['rotte', 'ROTTE'], ['cielo', 'CIELO DEL BRACCIO', 'CIELO']], 'regionTab', 'regionPage', (tab, x, ww, mob) => regionBlocks(r, tab, x, ww, mob), tint);
    const bw = mobile ? (w - 48) / 2 : 220;
    U.button('region-map', mobile ? 'MAPPA' : 'TORNA ALLA MAPPA', mobile ? 18 : 35, h - 88, bw, 39, () => { route('galaxy'); S.sector = sector; }, { small: mobile }); U.buttons.at(-1).label = 'Torna alla mappa con il braccio della ' + r.name + ' evidenziato';
    U.button('region-outpost', mobile ? 'AVAMPOSTO' : 'AVAMPOSTO DELL’AREA', mobile ? 30 + bw : 267, h - 88, bw, 39, () => route('outpost'), { small: mobile });
}
function regionText() {
    const r = regionOf(AREAS[S.system].sector);
    return [`Braccio della ${r.name}. ${regionSummary(r)}`, ...r.areas.map((a, k) => `${k + 1}. ${a.name}: ${areaLine(a).toLowerCase()}.`),
        `Corsie aperte: ${r.lanes.open} su ${r.lanes.total}. Porte di salto aperte: ${r.jumps.open.length} su ${r.jumps.total}` + (r.jumps.open.length ? ', verso ' + r.jumps.open.map(p => '«' + p.name + '»').join(', ') : '') + '.',
        `La nube del braccio: ${r.cloud.family.toLowerCase()}. ${r.sky} ${cloudShare(r)}`].join(' ');
}
/** Nucleo di Gaia: Lovelock's diagnosis of the planets the analyser of biosignatures has measured, beside
 * the Solar System worlds that calibrate it (src/worlds/biosignatures.js). With the explorer mode off every
 * planet is diagnosed and its surface is known. */
function gaiaDiagnoses() {
    const archive = !explorerMode(store.data), physics = planetPhysics(), out = [];
    for (let i = 0; i < UNIT_COUNT; i++) {
        const m = data.modules[i];
        if (m && (archive || store.data.explore[String(i)]?.m?.includes('biofirme'))) out.push({ index: i, title: m.title, area: areaOf(i).name, ...diagnosis(physics[i], speciesCount(i), archive || landed(i)) });
    }
    return out;
}
const OUTCOME_COLOR = { confermata: C.lime, 'nessuna-vita': C.lime, superficie: C.amber, 'falso-negativo': C.red, 'falso-positivo': C.red, 'da-verificare': C.muted };
const VERDICT_COLOR = { probabile: C.lime, incerta: C.amber, assente: C.dim };
/** Outcomes counted in the summary of the diagnosis. */
const OUTCOME_COUNTS = { confermata: n => n + (n === 1 ? ' diagnosi confermata' : ' diagnosi confermate'), superficie: n => n + ' con vita trovata oltre la diagnosi aperta', 'falso-negativo': n => n + (n === 1 ? ' falso negativo' : ' falsi negativi'), 'falso-positivo': n => n + (n === 1 ? ' falso positivo' : ' falsi positivi'), 'nessuna-vita': n => n + ' senza vita in superficie' };
const jmol = x => italian(x, x >= 100 ? 4 : 2) + ' J/mol';
const GAIA_INTRO = 'Un pianeta abitato mantiene nella sua atmosfera gas che senza la vita reagirebbero fino all’equilibrio. Lovelock propose nel 1965 di cercare la vita misurando questo squilibrio chimico, che si esprime come energia libera disponibile per mole di atmosfera.';
const GAIA_WORLDS_NOTE = 'Con l’oceano la Terra supera Marte di circa 17 volte. La sua sola atmosfera, con 1,5 J/mol, resta sotto Marte, il cui squilibrio è prodotto dalla luce ultravioletta: per riconoscere la vita conta quali gas coesistono, oltre a quanto vale lo squilibrio. Valori di Krissansen-Totton, Bergsman e Catling (2016).';
function gaiaSummary(list) {
    const count = f => list.filter(f).length, done = list.filter(d => d.outcome !== 'da-verificare');
    if (!list.length) return 'Nessun pianeta analizzato. Porta a bordo l’analizzatore di biofirme e apri i dati fisici di un pianeta in orbita: la sua firma atmosferica entra in questa diagnosi. Scendendo in superficie la diagnosi si confronta con le specie che vivono sul pianeta.';
    const head = explorerMode(store.data) ? `Pianeti analizzati con l’analizzatore di biofirme: ${list.length} su ${UNIT_COUNT}.` : `Modalità esploratore disattivata: la diagnosi riguarda tutti i ${list.length} pianeti e la loro superficie è già nota.`;
    const verdicts = Object.keys(VERDICTS).map(v => `${VERDICTS[v]} ${count(d => d.verdict === v)}`).join(', ');
    const outcomes = Object.entries(OUTCOME_COUNTS).map(([o, f]) => [count(d => d.outcome === o), f]).filter(([n]) => n).map(([n, f]) => f(n));
    return `${head} Verdetti dell’atmosfera: ${verdicts}. Confrontati con la superficie: ${done.length}${outcomes.length ? ' (' + outcomes.join(', ') + ')' : ''}.`;
}
/** Blocks of the current tab, each with its height and a draw function. Text is split into lines, so a
 * page can end inside a paragraph on short screens; a block marked `keep` stays with the next one. */
function gaiaBlocks(tab, list, x, ww, mobile) {
    const line = 18, blocks = [], tx = x + 16, tw = ww - 32;
    const lines = (t, w = tw) => fittedRows(R, [t], w, 'micro').filter(Boolean);
    const para = (t, c = C.muted, at = tx, w = tw, gap = 10) => { const rows = lines(t, w); rows.forEach((r, k) => blocks.push({ h: line + (k === rows.length - 1 ? gap : 0), draw: y => U.text(r, at, y, 'micro', c) })); };
    if (tab === 'mondi') {
        para(GAIA_INTRO, C.pale);
        const nameW = mobile ? 0 : 230, barX = tx + nameW + (mobile ? 0 : 14), valueW = 110, barW = tw - nameW - (mobile ? 0 : 14) - valueW, lo = -4, hi = 4;
        para('Scala logaritmica da 0,0001 a 10.000 J/mol: ogni tacca è un fattore 10.', C.dim, mobile ? tx : barX, mobile ? tw : tw - nameW - 14, 6);
        for (const r of REFERENCE_WORLDS) {
            const top = mobile ? 22 : 0;
            blocks.push({ h: top + 22, keep: true, draw: y => {
                U.text(r.name, tx, y + 2, mobile ? 'micro' : 'mini', r.life ? C.lime : C.pale);
                const by = y + top + 4, frac = (Math.log10(r.phi) - lo) / (hi - lo);
                R.rect(barX, by, barW, 10, color(T.line, .9));
                for (let k = 1; k < hi - lo; k++) R.rect(barX + barW * k / (hi - lo), by - 2, 1, 14, color(T.hover, 1));
                R.rect(barX, by, Math.max(3, barW * frac), 10, r.life ? C.lime : C.cyan);
                U.text(jmol(r.phi), x + ww - 16, y + top + 1, 'micro', C.pale, { align: 'right' });
            } });
            para('Causa: ' + r.cause + '.', C.muted, mobile ? tx : barX, mobile ? tw : tw - nameW - 14, 12);
        }
        para(GAIA_WORLDS_NOTE);
    } else if (tab === 'firme') {
        para('Cinque firme atmosferiche, ognuna con il criterio pubblicato che la interpreta. Il verdetto viene dalla sola atmosfera; la discesa in superficie dice se era giusto.', C.pale);
        for (const [id, sg] of Object.entries(SIGNATURES)) {
            const n = list.filter(d => d.signature === id).length;
            blocks.push({ h: 24, keep: true, draw: y => { U.text(sg.name, tx, y, 'mini', C.pale); U.text(VERDICTS[sg.verdict].toUpperCase(), x + ww - 16, y + 1, 'micro', VERDICT_COLOR[sg.verdict], { align: 'right' }); } });
            para(capital(sg.gases) + '. ' + sg.reading, C.muted, tx, tw, 0);
            para('Fonte: ' + sg.source + '. Pianeti analizzati con questa firma: ' + n + '.', C.dim, tx, tw, 14);
        }
    } else if (tab === 'sintesi') {
        // The three worlds of synthesis; the world shown is recorded as visited (gaiaUI).
        const world = SYNTHESIS_WORLDS.find(v => v.id === S.gaiaWorld) || SYNTHESIS_WORLDS[0], visited = store.data.atlas.core || [], bw = Math.min(200, (tw - 16) / 3);
        para(`Tre mondi di sintesi, dove il modello fisico del sito e la diagnosi di Lovelock si incontrano. Visitati: ${visited.length} di ${SYNTHESIS_WORLDS.length}.`, C.pale);
        blocks.push({ h: 48, draw: y => SYNTHESIS_WORLDS.forEach((v, k) => { U.button('gaia-world-' + v.id, v.id === 'archeano' ? (mobile ? 'ARCHEANO' : 'TERRA ARCHEANA') : v.name.toUpperCase(), tx + k * (bw + 8), y, bw, 36, () => { S.gaiaWorld = v.id; S.gaiaPage = 0; }, { active: world.id === v.id, small: mobile }); U.buttons.at(-1).label = 'Visita ' + v.name; }) });
        blocks.push({ h: 26, keep: true, draw: y => U.text(world.name + ' · ' + world.era, tx, y, 'mini', C.lime) });
        for (const [label, value] of world.rows) para(label + ': ' + value + '.', C.muted, tx, tw, 2);
        const heading = t => blocks.push({ h: 30, keep: true, draw: y => U.text(t, tx, y + 8, 'micro', C.pale) });
        heading('IL MODELLO DEL SITO'); para(modelText(world.id));
        heading('LA LETTURA DI LOVELOCK'); para(world.reading);
        heading('CAPITOLI COLLEGATI');
        for (const id of world.units) {
            const m = moduleById(id); if (!m) continue;
            const rows = fittedRows(R, [m.title], tw - 104, 'micro').filter(Boolean);
            blocks.push({ h: Math.max(rows.length * 18, 32) + 8, draw: y => { rows.forEach((row, i) => U.text(row, tx, y + i * 18, 'micro', C.muted)); U.button('gaia-chapter-' + id, 'LIBRO', x + ww - 16 - 92, y - 4, 92, 32, () => openChapter(id), { small: true }); U.buttons.at(-1).label = 'Leggi il capitolo «' + m.title + '»'; } });
        }
        para('Fonti: ' + world.source + '.', C.dim);
    } else {
        para(gaiaSummary(list), C.pale);
        for (const d of list) {
            const verdictW = mobile ? 0 : 200, head = lines(d.title + ' · ' + d.area, tw - verdictW), text = lines(SIGNATURES[d.signature].name + '. ' + capital(OUTCOMES[d.outcome]) + '.');
            // One planet is one block: its name, the verdict of the atmosphere and the outcome at the surface.
            blocks.push({ h: (head.length + text.length + (mobile ? 1 : 0)) * line + 10, draw: y => {
                head.forEach((r, k) => U.text(r, tx, y + k * line, 'micro', C.pale));
                let yy = y + head.length * line;
                if (mobile) { U.text(VERDICTS[d.verdict], tx, yy, 'micro', VERDICT_COLOR[d.verdict]); yy += line; }
                else U.text(VERDICTS[d.verdict], x + ww - 16, y, 'micro', VERDICT_COLOR[d.verdict], { align: 'right' });
                text.forEach((r, k) => U.text(r, tx, yy + k * line, 'micro', OUTCOME_COLOR[d.outcome]));
            } });
        }
    }
    return blocks;
}
/** Tabs above a panel of blocks ({ h, draw(y), keep }) packed into pages, shared by the Nucleo di Gaia and
 * the outposts. `tabs` are [id, label, phone label]; S[tabKey] and S[pageKey] hold the tab and the page. */
function pagedTabs(prefix, name, tabs, tabKey, pageKey, blocksOf, tint = C.lime) {
    const w = R.w, h = R.h, mobile = w < 850, short = h < 700;
    // Short phones have no subtitle, and the tabs move up into its room.
    const x = mobile ? 18 : 40, ww = mobile ? w - 36 : w - 80, top = short ? 196 : 238, tab = S[tabKey] ||= tabs[0][0], tw = Math.min(240, (ww - 8 * (tabs.length - 1)) / tabs.length);
    tabs.forEach(([id, label, phone], k) => U.button(prefix + '-' + id, mobile && phone ? phone : label, x + k * (tw + 8), top, tw, 36, () => { S[tabKey] = id; S[pageKey] = 0; }, { active: tab === id, small: mobile }));
    const py = top + 48, ph = h - py - 104, room = ph - 28 - 50, blocks = blocksOf(tab, x, ww, mobile);
    // Blocks are packed into pages as tall as the panel; a heading never ends a page.
    const pages = [[]]; let used = 0;
    blocks.forEach((b, k) => {
        const need = b.h + (b.keep && blocks[k + 1] ? blocks[k + 1].h : 0);
        if (pages.at(-1).length && used + need > room) { pages.push([]); used = 0; }
        pages.at(-1).push(b); used += b.h;
    });
    const page = S[pageKey] = clamp(S[pageKey] || 0, 0, pages.length - 1);
    U.panel(x, py, ww, ph, tint, .9);
    let y = py + 16;
    for (const b of pages[page]) { b.draw(y); y += b.h; }
    if (pages.length > 1) {
        // The page buttons leave room for the counter between them on the narrowest phones.
        const by = py + ph - 46, pb = Math.min(110, (ww - 32 - 64) / 2);
        U.text((page + 1) + ' di ' + pages.length, x + ww / 2, by + 11, 'micro', C.muted, { align: 'center' });
        U.button(prefix + '-prev', 'INDIETRO', x + 16, by, pb, 36, () => { S[pageKey] = page - 1; }, { disabled: page === 0, small: true }); U.buttons.at(-1).label = 'Pagina precedente ' + name;
        U.button(prefix + '-next', 'AVANTI', x + ww - 16 - pb, by, pb, 36, () => { S[pageKey] = page + 1; }, { disabled: page === pages.length - 1, small: true }); U.buttons.at(-1).label = 'Pagina successiva ' + name;
    }
}
function gaiaUI() {
    const w = R.w, h = R.h, mobile = w < 850, short = h < 700, list = gaiaDiagnoses();
    title('DIARIO ▸ NAVE ▸ NUCLEO DI GAIA', 'Il Nucleo di Gaia', short ? '' : mobile ? 'La diagnosi di Lovelock.' : 'La diagnosi di Lovelock, dall’atmosfera alla superficie dei pianeti.');
    // A world of synthesis counts as visited once it is shown.
    if (S.gaiaTab === 'sintesi') { const id = S.gaiaWorld ||= SYNTHESIS_WORLDS[0].id, core = store.data.atlas.core ||= []; if (!core.includes(id)) { core.push(id); store.save(); } }
    pagedTabs('gaia', 'del Nucleo di Gaia', [['mondi', 'MONDI DI RIFERIMENTO', 'MONDI'], ['firme', 'FIRME ATMOSFERICHE', 'FIRME'], ['diagnosi', 'DIAGNOSI'], ['sintesi', 'MONDI DI SINTESI', 'SINTESI']], 'gaiaTab', 'gaiaPage', (tab, x, ww, mobile) => gaiaBlocks(tab, list, x, ww, mobile));
    const bw = mobile ? (w - 48) / 2 : 220;
    U.button('gaia-ship', mobile ? 'NAVE' : 'TORNA ALLA NAVE', mobile ? 18 : 35, h - 88, bw, 39, () => route('ship'), { small: mobile });
    U.button('gaia-journal', mobile ? 'DIARIO' : 'DIARIO DI ESPLORAZIONE', mobile ? 30 + bw : 267, h - 88, bw, 39, () => { S.journalTab = 'explore'; S.scroll = 0; route('journal'); }, { small: mobile });
}
function gaiaText() {
    const list = gaiaDiagnoses();
    return ['Il Nucleo di Gaia. ' + GAIA_INTRO,
        'Mondi di riferimento, energia libera disponibile: ' + REFERENCE_WORLDS.map(r => `${r.name} ${jmol(r.phi)}, per ${r.cause}`).join('; ') + '. ' + GAIA_WORLDS_NOTE,
        'Firme atmosferiche: ' + Object.values(SIGNATURES).map(sg => `${sg.name}, ${VERDICTS[sg.verdict]}: ${sg.gases}. ${sg.reading} Fonte: ${sg.source}.`).join(' '),
        'Diagnosi. ' + gaiaSummary(list) + ' ' + list.map(d => `${d.title}: ${SIGNATURES[d.signature].name.toLowerCase()}, ${VERDICTS[d.verdict]}, ${OUTCOMES[d.outcome]}.`).join(' '),
        'Mondi di sintesi, visitati ' + (store.data.atlas.core || []).length + ' di ' + SYNTHESIS_WORLDS.length + '. ' + SYNTHESIS_WORLDS.map(v => `${v.name}, ${v.era}: ${v.rows.map(([a, b]) => a + ' ' + b).join('; ')}. ${modelText(v.id)} ${v.reading}`).join(' '),
        'Fonti: ' + GAIA_SOURCES.join(' ')].join(' ');
}
function journalUI() {
    const w = R.w, h = R.h, mobile = w < 850;
    title('DIARIO / IPOTESI, ESPERIMENTI E CONCLUSIONI', S.journalTab.startsWith('course:') ? 'DIARIO: '+(moduleById(S.journalTab.slice(7))?.code||'UNITÀ') : S.journalTab === 'mission:echo08-signal' ? 'DIARIO DELLA MISSIONE ECHO-08' : S.journalTab === 'explore' ? 'DIARIO DI ESPLORAZIONE' : 'LA MEMORIA DELLA SPEDIZIONE', store.persistent ? 'Salvataggio locale attivo. Esporta una copia per trasferire il lavoro fra dispositivi.' : 'Persistenza non disponibile: esporta il diario prima di chiudere.');
    const x = mobile ? 20 : 40, ww = mobile ? w - 40 : w - 80;
    const tw = Math.min(220, (ww - 16) / 3);
    U.button('journal-global', mobile ? 'GENERALE' : 'DIARIO GENERALE', x, 245, tw, 35, () => { finishEdit(); S.journalTab = 'general'; S.scroll = 0; }, { active: S.journalTab === 'general', small: mobile });
    U.button('journal-module', 'UNITÀ ' + selected().code, x + tw + 8, 245, tw, 35, () => { finishEdit(); S.journalTab = 'course:'+selected().id; S.scroll = 0; }, { active: S.journalTab === 'course:'+selected().id, small: mobile });
    U.button('journal-explore', 'ESPLORAZIONE', x + 2 * (tw + 8), 245, tw, 35, () => { finishEdit(); S.journalTab = 'explore'; S.scroll = 0; }, { active: S.journalTab === 'explore', small: mobile });
    const by = 298, hh = h - by - 180, log = S.journalTab === 'explore';
    U.panel(x, by, ww, hh, C.cyan, .85);
    const text = log ? exploreLog() : S.editing === 'notes' ? editor.value : store.data.notes[S.journalTab] || 'Domanda → Ipotesi → Parametri → Osservazioni → Conclusioni → Limiti.\n\nSeleziona «Scrivi» per iniziare.';
    const rows = [];
    for (const paragraph of text.split('\n')) {
        let line = '';
        for (const word of paragraph.split(/\s+/)) {
            const next = line ? line + ' ' + word : word;
            if (R.textWidth(next, 'body') > ww - 44 && line) {
                rows.push(line);
                line = word;
            }
            else
                line = next;
        }
        rows.push(line || ' ');
        rows.push(' ');
    }
    S.maxScroll = Math.max(0, rows.length * 27 - hh + 46);
    S.scroll = clamp(S.scroll, 0, S.maxScroll);
    if (S.journalAutoEnd) {
        S.scroll = S.maxScroll;
        S.journalAutoEnd = false;
    }
    let yy = by + 23 - S.scroll;
    for (const line of rows) {
        if (yy >= by + 12 && yy < by + hh - 23)
            U.text(line, x + 22, yy, 'body', C.pale);
        yy += 27;
    }
    if (S.editing === 'notes' && Math.floor(performance.now() / 600) % 2 === 0)
        R.rect(x + 24, Math.min(yy, by + hh - 25), 2, 19, C.lime);
    const bottom = h - 156, bw = mobile ? (ww - 16) / 3 : 170;
    if (log) { U.button('open-ship', 'LA NAVE', x, bottom, bw, 38, () => route('ship')); U.button('open-gaia', mobile ? 'GAIA' : 'NUCLEO DI GAIA', x + bw + 8, bottom, bw, 38, () => route('gaia')); U.buttons.at(-1).label = 'Apri il Nucleo di Gaia: la diagnosi di Lovelock dei pianeti misurati'; }
    else { U.button('edit-notes', 'SCRIVI', x, bottom, bw, 38, () => startEdit('notes'), { active: S.editing === 'notes' }); U.button('save-notes', 'SALVA', x + bw + 8, bottom, bw, 38, () => finishEdit(true)); }
    U.button('export-journal', 'ESPORTA', x + 2 * (bw + 8), bottom, bw, 38, () => {
        if (S.editing === 'notes')
            finishEdit();
        download('GAIA_Diario.json', store.export());
    });
    if (mobile)
        U.button('import-journal', 'IMPORTA JSON', x, h - 79, ww, 30, () => document.querySelector('#fileInput').click(), { small: true });
    if (!mobile)
        U.button('import-journal', 'IMPORTA JSON', x + 3 * (bw + 8), bottom, bw, 38, () => document.querySelector('#fileInput').click());
    U.text(`${store.data.read.length} sezioni segnate come studiate · ${store.data.scenarios.length} scenari conservati`, x, mobile ? h - 113 : h - 95, 'mini', C.muted);
    if (!mobile) {
        U.button('import-old', 'IMPORTA REGISTRO V7', w - 300, h - 85, 240, 34, () => {
            try {
                const old = JSON.parse(localStorage.getItem('mentat-science-atlas-v1') || 'null');
                if (!old) {
                    say('Nessun registro precedente trovato su questa origine. Importa il suo JSON.');
                    return;
                }
                importJournal(old);
                say('Registro precedente importato senza cancellare la chiave originale.');
            }
            catch {
                say('Registro precedente non accessibile.');
            }
        });
    }
}
function importJournal(value) {
    if (value?.schemaVersion === 1) {
        const mapped = { schema: 1, notes: {}, read: value.readSections || [], quiz: {}, scenarios: [], preferences: store.data.preferences };
        for (const [k, v] of Object.entries(value.notes || {}))
            if (typeof v?.text === 'string')
                mapped.notes[k] = v.text;
        for (const [key, v] of Object.entries(value.quiz || {})) {
            const id = key.split(':').pop();
            mapped.quiz[id] = v;
        }
        store.import(mapped);
    }
    else
        store.import(value);
    say('Diario importato e verificato.');
}
function sourcesUI() {
    const w = R.w, h = R.h;
    title('TRACCIABILITÀ / FONTI E LIMITI', 'CHE COSA STAI OSSERVANDO', 'Sorgenti, risultati di modelli e ambientazioni illustrative sono distinti.');
    const x = 36, ww = w - 72, y = 248;
    U.panel(x, y, ww, h - y - 112, C.cyan, .84);
    const rows = [['CONTENUTI DIDATTICI', 'Dispensa «Matematica di base» di Marzio De Corato e Danilo Liuzzi: 769 pagine, 25 unità. Quattro lezioni narrative e 40 quesiti di Funzioni conservati dalla V7.'], ['DAISYWORLD', 'Equazioni di Watson & Lovelock (1983), scelte numeriche documentate. Il modello non è una previsione del clima terrestre e non garantisce autoregolazione universale.'], ['GEOMETRIA E TEXTURE', 'Mappe planetarie: NASA Earth Observatory, NASA/GSFC/SVS, NASA/JPL-Caltech/USGS e NASA VTAD. File e risoluzioni originali documentati. Famiglie ispirate a Haegemonia. Nessuna texture planetaria inventata o generata con IA.'], ['COPERTURA', UNIT_COUNT + ' nuclei guidati: 25 per matematica, fisica e chimica, 35 per la biologia orientata all’astrobiologia, con modelli ed esercizi specifici. Non sono manuali integrali: revisione scientifico-didattica umana da completare.'], ['RENDERING', 'Tutti i pixel visibili del sito sono composti in WebGL 2. Testi matematici e pagine originali sono texture tipografiche su superfici GPU. Il livello semantico non visibile supporta tastiera e lettura assistita.']];
    let yy = y + 22 - S.scroll;
    for (const [a, b] of rows) {
        if (yy >= y && yy < h - 180) {
            U.tag(a, x + 24, yy, C.lime);
            U.wrap(b, x + 24, yy + 30, ww - 48, C.pale, 27, 5);
        }
        yy += 145;
    }
    S.maxScroll = Math.max(0, rows.length * 145 - (h - y - 145));
    U.button('source-pdf', 'DISPENSA DI MATEMATICA', x, h - 88, 230, 39, () => openPDF(1));
    U.button('source-pdf-fis', 'DISPENSA DI FISICA', x + 238, h - 88, 210, 39, () => openPDF(1, 'fis'));
    U.button('source-model', 'DOSSIER GAIA', x + 456, h - 88, 180, 39, () => openTheory('gaia'));
}
function overlay() {
    const w = R.w, h = R.h;
    if (S.menu) {
        U.panel(15, 108, w - 30, h - 161, C.cyan, .97);
        const entries=[...nav,['sources','FONTI'],['access','ACCESSIBILITÀ']],rows=Math.max(1,Math.floor((h-195)/50)),columns=Math.ceil(entries.length/rows),bw=(w-70-(columns-1)*8)/columns;
        entries.forEach(([id,label],i)=>U.button('mobile-'+id,label,35+Math.floor(i/rows)*(bw+8),132+(i%rows)*50,bw,44,()=>id==='access'?atlas.open('access'):route(id),{active:(navGroups[id]||[id]).includes(S.scene),small:columns>1}));
    }
    if (S.settings) {
        const pw = Math.min(480, w - 32), x = w - pw - 16, y = 111;
        U.panel(x, y, pw, 416, C.cyan, .97);
        U.tag('RENDERING E ACCESSIBILITÀ', x + 19, y + 21);
        [['high','DETTAGLIO ALTO · 1.000.000 STELLE'],['balanced','BILANCIATO · 1.000.000 STELLE'],['low','LEGGERO · 1.000.000 STELLE']].forEach(([mode,label],i)=>U.button('graphics-'+mode,label,x+18,y+61+i*45,pw-36,36,()=>{S.graphics=mode;store.data.preferences.graphics=mode;store.data.preferences.quality=MIN_STARS;store.save();},{active:S.graphics===mode}));
        U.button('toggle-motion', S.paused ? 'ATTIVA IL MOVIMENTO' : 'RIDUCI IL MOVIMENTO', x + 18, y + 208, pw - 36, 36, () => { S.paused = !S.paused; store.data.preferences.motion = !S.paused; store.save(); });
        U.button('open-sources', 'FONTI, MATERIALI E LIMITI', x + 18, y + 254, pw - 36, 36, () => route('sources'));
        U.button('open-access', 'TESTO, CONTRASTO E NAVIGAZIONE', x + 18, y + 300, pw - 36, 44, () => atlas.open('access'));
        U.button('close-settings', 'CHIUDI', x + 18, y + 352, pw - 36, 44, () => S.settings = false);
    }
    if (S.editing === 'page') {
        const x = Math.max(15, (w - 420) / 2), pw = Math.min(420, w - 30);
        U.panel(x, 180, pw, 180, C.cyan, .97);
        U.tag('PAGINA PDF 1–769', x + 20, 205);
        U.text(editor.value || '…', x + 20, 246, 'number', C.pale);
        U.button('confirm-page', 'VAI ALLA PAGINA', x + 20, 301, pw - 40, 38, () => finishEdit());
    }
    if (S.toast && performance.now() < S.toastUntil) {
        const pw = Math.min(w - 30, 850), x = (w - pw) / 2;
        U.panel(x, h - 47 - 68, pw, 62, C.lime, .96);
        U.wrap(S.toast, x + 14, h - 103, pw - 28, C.pale, 22, 2, 'mini');
    }
}
function drawMathObjects() {
    if (S.scene !== 'lab' || S.lab !== 'rectangle')
        return;
    const m = rectangleModel(S.labValues.p, S.labValues.x), a = m.x / 6, b = m.y / 6, key = `${m.x}-${m.y}`;
    if (W.basinKey !== key) {
        R.makeMesh('basin', box(a, .1, b));
        R.makeMesh('basin-edge-x', box(a + .15, .22, .08));
        R.makeMesh('basin-edge-z', box(.08, .22, b));
        W.basinKey = key;
    }
    const base = [-7, -1, -1];
    R.drawMesh('basin', W.vp, transform(...base, .7), { eye: W.eye, tint: [.12, .48, .59, 1], emission: .12, opacity: .8 });
    for (const dz of [-b, b])
        R.drawMesh('basin-edge-x', W.vp, transform(base[0], base[1] + .11, base[2] + dz * .7, .7), { eye: W.eye, tint: [.45, .67, .64, 1] });
    for (const dx of [-a, a])
        R.drawMesh('basin-edge-z', W.vp, transform(base[0] + dx * .7, base[1] + .11, base[2], .7), { eye: W.eye, tint: [.45, .67, .64, 1] });
}
let bookFrames = 0;
function draw() {
    if (!S.loaded || S.contextLost)
        return;
    // While a chapter is open the 3D backdrop is redrawn about five times a second, which keeps reading light.
    if (S.scene === 'libro' && book?.visible && !S.menu && !S.settings && ++bookFrames % 12) { syncBook(); return; }
    R.sceneQuality=S.graphics;R.hoverStarIndex=S.hoveredTarget?.type==='system'?W.systems[S.hoveredTarget.index]?.starIndex:-1;
    R.begin();
    atlas?.tick(performance.now());
    worldTick();
    W.draw(S.scene === 'libro' ? 'orbit' : S.scene, S.scene === 'libro' ? { ...S, scene: 'orbit' } : S, data);
    atlas?.draw3D(S,hoverPointer,pointer,U?.focus);
    if(S.scene==='pilot')pilotEducation.draw3D({...S,scene:'mission'});else education.draw3D(S);
    drawMathObjects();
    scrim();
    common();
    syncBook();
    const screens = { libro: () => {}, ship: shipUI, gaia: gaiaUI, outpost: outpostUI, region: regionUI, galaxy: galaxyUI, system: systemUI, orbit: orbitUI, surface: surfaceUI, research: researchUI, catalogue: catalogueUI, briefing: briefingUI, theory: theoryUI, pdf: pdfUI, lab: labUI, quiz: quizUI, journal: journalUI, sources: sourcesUI, mission: () => education.drawUI(U, S), pilot: () => pilotEducation.drawUI(U,S), paths: () => education.drawPathsUI(U,S) };
    (screens[S.scene] || galaxyUI)();
    drawHover();
    overlay();
    atlas?.drawOverlay(U);
    R.drawUI();
    frameCount++;
    syncSemantic();
}
/** Cost of the last frames on this machine (src/ui/diagnostics.js), for the panel and GAIA.diagnostics(). */
function performanceReport() {
    const gl = R.gl, ext = gl.getExtension('WEBGL_debug_renderer_info'), fs = R.frameStats;
    return { version: VERSION, frame: meter.summary(), meshDrawCalls: fs.draws || 0, meshTriangles: fs.triangles || 0, stars: fs.stars || 0, craft: S.scene === 'system' || S.scene === 'orbit' ? W.craftStats || null : null, craftFactory: W.factory?.stats || null,
        quality: S.graphics, canvas: [R.canvas.width, R.canvas.height], sceneSize: [R.sceneWidth || 0, R.sceneHeight || 0], pixelRatio: R.dpr || 1, gpu: ext ? gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER) };
}
/** The book page is HTML over the canvas: shown in the 'libro' scene, hidden while a canvas menu is open. */
function syncBook() {
    if (!book) return;
    if (S.scene !== 'libro') { book.hide(); return; }
    book.show(selected().id, S.bookSection || null);
    book.root.style.visibility = S.menu || S.settings ? 'hidden' : '';
}
function syncSemantic() {
    const accessibleButtons=atlas?.sheet ? [...U.buttons] : [...U.buttons,...sceneActions()];
    const signature = S.scene + '|' + (atlas?.sheet||'') + '|' + accessibleButtons.map(b => b.id + ':' + b.label + ':' + Boolean(b.disabled)).join('|');
    if (signature !== semanticSignature) {
        const focused = document.activeElement?.dataset?.id;
        semantic.replaceChildren();
        const heading = document.createElement('h1');
        heading.textContent = 'GAIA — ' + (nav.find(n => n[0] === S.scene)?.[1] || S.scene);
        semantic.append(heading);
        const content = document.createElement('article');
        content.id = 'semantic-text';
        semantic.append(content);
        for (const b of accessibleButtons) {
            let el = document.createElement(b.slider ? 'input' : 'button');
            el.dataset.id = b.id;
            if (b.slider) {
                el.type = 'range';
                el.min = b.min;
                el.max = b.max;
                el.step = b.step;
                el.value = b.value;
                el.setAttribute('aria-label', b.label);
                el.oninput = () => U.buttons.find(x => x.id === b.id)?.action(Number(el.value));
            }
            else {
                el.textContent = b.label;
                el.disabled = Boolean(b.disabled);
                el.onclick = () => [...U.buttons,...sceneActions()].find(x => x.id === b.id)?.action?.();
            }
            el.onfocus = () => { U.focus = b.id; const match=/^scene-system-(\d+)$/.exec(b.id);if(S.scene==='galaxy'&&match)atlas?.focusKey(Number(match[1])); };
            el.onblur = () => {
                if (U.focus === b.id)
                    U.focus = null;
            };
            semantic.append(el);
        }
        semanticSignature = signature;
        textSignature = '';
        const restore = semantic.querySelector(`[data-id="${focused}"]`);
        if (restore)
            restore.focus();
    }
    for (const b of U.buttons.filter(b => b.slider)) {
        const e = semantic.querySelector(`[data-id="${b.id}"]`);
        if (e && document.activeElement !== e)
            e.value = b.value;
    }
    const key = physicsOpen() ? 'physics-' + S.selected + '-' + store.data.updatedAt : expeditionsOpen() ? 'expeditions-' + S.selected + '-' + store.data.updatedAt : S.scene === 'ship' ? 'ship-' + store.data.updatedAt + '-' + (S.shipPage || 0) : S.scene === 'gaia' ? 'gaia-' + store.data.updatedAt + '-' + S.gaiaTab + '-' + (S.gaiaPage || 0) + '-' + S.gaiaWorld : S.scene === 'region' ? 'region-' + S.system + '-' + store.data.updatedAt : S.scene === 'outpost' ? 'outpost-' + S.system + '-' + store.data.updatedAt : (S.scene==='galaxy'||atlas?.sheet)?atlas?.semanticKey():S.scene==='paths'?'paths-'+education.pathIndex+'-'+education.pathPage+'-'+store.data.updatedAt:['mission','pilot'].includes(S.scene) ? activeEducation().semanticKey() : S.scene === 'theory' ? lessons[S.reader]?.sections[S.section]?.id : S.scene === 'quiz' ? (quizList()[S.quizIndex]?.id + (S.quizSolution ? '-solution' : '-question')) : S.scene === 'pdf' ? 'pdf-' + S.pdfPage : S.scene;
    if (key !== textSignature) {
        const el = document.querySelector('#semantic-text');
        if (el)
            el.textContent = physicsOpen() ? 'Dati fisici del pianeta ' + selected().title + '. ' + physicsText(planetPhysics()[S.selected], speciesCount(S.selected), cardReveal()) : expeditionsOpen() ? expeditionsText(selected()) : S.scene === 'ship' ? shipText() : S.scene === 'gaia' ? gaiaText() : S.scene === 'outpost' ? outpostText() : S.scene === 'region' ? regionText() : (S.scene==='galaxy'||atlas?.sheet)?atlas?.semanticText():S.scene==='paths'?education.semanticPathsText():['mission','pilot'].includes(S.scene) ? activeEducation().semanticText() : S.scene === 'pdf' ? pdfIndexes[docKey(S.pdfDoc)]?.[S.pdfPage - 1]?.text : readerIndex[key]?.text || selected().description;
        textSignature = key;
    }
}
function pointerXY(e) { const r = canvas.getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top]; }
function events() {
    canvas.addEventListener('pointerdown', e => {
        const [x, y] = pointerXY(e), b = U.hit(x, y);
        pointer = { x, y, startX: x, startY: y, moved: false, pointerType:e.pointerType||'mouse', blocked:!!b||(['galaxy','system'].includes(S.scene)&&sceneBlocked(x,y)) };
        hover.clear();S.hoveredTarget=null;
        activeSlider = b?.slider ? b : null;
        if (activeSlider)
            U.activate(activeSlider, x);
        canvas.setPointerCapture(e.pointerId);
    });
    canvas.addEventListener('pointermove', e => {
        const [x, y] = pointerXY(e);
        hoverPointer={x,y};
        if(e.pointerType!=='touch')touchTarget=null;
        U.hover = U.hit(x, y)?.id || null;
        canvas.style.cursor = U.hover ? 'pointer' : S.scene === 'galaxy' ? 'grab' : 'default';
        if (!pointer)
            return;
        const dx = x - pointer.x, dy = y - pointer.y;
        pointer.moved = pointer.moved || Math.hypot(x - pointer.startX, y - pointer.startY) > 6;
        if (activeSlider) {
            const current = U.buttons.find(b => b.id === activeSlider.id) || activeSlider;
            U.activate(current, x);
        }
        else if (pointer.moved && !pointer.blocked) {
            atlas?.cancelFlight();
            if (['galaxy', 'system', 'orbit', 'surface', 'research'].includes(S.scene) || (['mission','pilot'].includes(S.scene) && activeEducation().scene.contains(pointer.startX, pointer.startY) && !S.menu && !S.settings)) {
                S.yaw += dx * .006;
                S.pitch = clamp(S.pitch + dy * .003, .1, 1.2);
            }
            else
                S.scroll = clamp(S.scroll - dy, 0, S.maxScroll);
        }
        pointer.x = x;
        pointer.y = y;
    });
    canvas.addEventListener('pointerup', e => {
        const [x, y] = pointerXY(e);
        if (pointer && !pointer.moved && !activeSlider) {
            const b = U.hit(x, y);
            if (b)
                U.activate(b, x);
            else if(!pointer.blocked){
                const hit=W.pick(x,y,S);
                if(hit?.type==='system'||hit?.type==='planet'){
                    const touch=pointer.pointerType==='touch',same=touchTarget?.type===hit.type&&touchTarget?.index===hit.index;
                    if(touch&&!same){touchTarget=hit;S.hoveredTarget=hit;if(hit.type==='system'){const units=indicesForSystem(hit.index);selectIndex(units.includes(S.selected)?S.selected:units[0]);}else selectIndex(hit.index);updateHash();}
                    else if(hit.type==='system')enterSystem(hit.index);else enterPlanet(hit.index);
                }else if(hit?.type==='ambient'){touchTarget=hit;S.observedBody=hit.index;say(hit.body.profile.name+' · destinazione non esplorabile');}
                else if(hit?.type==='craft'){touchTarget=hit;say([hit.entry.name,...(hit.lines||[])].join(' · '));}
                else if(hit?.type==='node')S.node=hit.index;
                else if(hit?.type==='station')S.station=hit.index;
                else if(hit?.type==='place')selectTarget({type:'place',index:hit.index});
                else if(hit?.type==='ground'){const near=W.nearest(hit.point);if(near)selectTarget(near);else S.exploreGoal=[hit.point[0],hit.point[2]];}
            }
        }
        pointer = null;
        activeSlider = null;
    });
    canvas.addEventListener('pointercancel',()=>{pointer=null;activeSlider=null;hover.clear();S.hoveredTarget=null;});
    canvas.addEventListener('pointerleave',()=>{hoverPointer=null;hover.clear();S.hoveredTarget=null;U.hover=null;});
    canvas.addEventListener('wheel', e => {
        e.preventDefault();
        if (['galaxy','system','orbit'].includes(S.scene)) {
            if(!S.menu&&!S.settings)changeZoom(Math.exp(e.deltaY*.001));
        }
        else if (['theory', 'pdf', 'quiz', 'sources', 'journal'].includes(S.scene))
            S.scroll = clamp(S.scroll + e.deltaY * .7, 0, S.maxScroll);
    }, { passive: false });
    window.addEventListener('keydown', e => {
        // In the book the browser scrolls and selects text; only Escape goes back to the planet.
        if (S.scene === 'libro' && !S.menu && !S.settings) { if (e.key === 'Escape') backToParent(); return; }
        if(atlas?.key(e))return;
        if (e.target === editor) {
            if (e.key === 'Escape' || (S.editing === 'page' && e.key === 'Enter')) {
                e.preventDefault();
                finishEdit();
            }
            return;
        }
        if (e.key === 'Tab')
            return;
        if (e.target?.tagName === 'INPUT')
            return;
        if (e.target?.tagName === 'BUTTON' && ['Enter', ' '].includes(e.key))
            return;
        if (e.key === 'Escape') {
            if(!S.menu&&!S.settings&&!S.editing)backToParent();
            S.menu = false;
            S.settings = false;
            S.quizSolution = false;
            return;
        }
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
            e.preventDefault();
            route('catalogue');
            startEdit('search');
            return;
        }
        // Exploration: W A S D move the focus on the ground, relative to the camera.
        if (S.scene === 'surface' && S.explore && !e.ctrlKey && !e.metaKey && !e.altKey) {
            const step = { w: [1, 0], s: [-1, 0], a: [0, -1], d: [0, 1] }[e.key.toLowerCase()];
            if (step) { moveExplore(...step); return; }
        }
        if (e.key === 'ArrowLeft')
            S.yaw -= .1;
        if (e.key === 'ArrowRight')
            S.yaw += .1;
        if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (['theory', 'pdf', 'quiz', 'sources', 'journal'].includes(S.scene))
                S.scroll = Math.max(0, S.scroll - 65);
            else
                S.pitch = Math.min(1.2, S.pitch + .07);
        }
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (['theory', 'pdf', 'quiz', 'sources', 'journal'].includes(S.scene))
                S.scroll = Math.min(S.maxScroll, S.scroll + 65);
            else
                S.pitch = Math.max(.1, S.pitch - .07);
        }
        if (['mission','pilot'].includes(S.scene) && ['PageDown', 'PageUp'].includes(e.key)) {
            e.preventDefault(); activeEducation().page += e.key === 'PageDown' ? 1 : -1; return;
        }
        if (e.key === 'PageDown') {
            e.preventDefault();
            S.scroll = Math.min(S.maxScroll, S.scroll + R.h * .7);
        }
        if (e.key === 'PageUp') {
            e.preventDefault();
            S.scroll = Math.max(0, S.scroll - R.h * .7);
        }
        if (e.key === '+')
            changeZoom(.9);
        if (e.key === '-')
            changeZoom(1/.9);
        if(e.key==='Enter'&&S.scene==='galaxy')enterSystem();
        else if(e.key==='Enter'&&S.scene==='system'&&W.cameraProgress===1&&S.observedBody===null)enterPlanet();
        if (e.key === ' ') {
            e.preventDefault();
            S.paused = !S.paused;
        }
    });
    editor.addEventListener('input', () => {
        if (S.editing === 'search') {
            S.query = editor.value.slice(0, 140);
            S.catalogPage = 0;
        }
        if (S.editing === 'notes') {
            store.data.notes[S.journalTab] = editor.value.slice(0, 30000);
            S.journalAutoEnd = true;
            store.save();
        }
    });
    document.querySelector('#fileInput').addEventListener('change', async (e) => {
        const file = e.target.files[0];
        if (!file)
            return;
        try {
            if (file.size > 8000000)
                throw Error('File troppo grande');
            const value = JSON.parse(await file.text());
            importJournal(value);
        }
        catch (err) {
            say('Importazione rifiutata: ' + err.message);
        }
        e.target.value = '';
    });
    canvas.addEventListener('webglcontextlost', e => { e.preventDefault(); S.contextLost = true; cancelAnimationFrame(raf); failure('Il contesto WebGL è stato perso. I contenuti e gli appunti non sono stati cancellati. Ricarica per ricreare le risorse.'); });
    canvas.addEventListener('webglcontextrestored', () => failure('WebGL ripristinato. Ricarica la pagina per ricostruire tutte le risorse.'));
    window.addEventListener('hashchange', () => { parseHash(); S.scroll = 0; computeLab(); });
    document.addEventListener('visibilitychange', () => { prevTime = performance.now(); });
}
function failure(msg) { error.style.display = 'block'; error.replaceChildren(); const p = document.createElement('p'); p.textContent = msg; error.append(p); const link = document.createElement('a'); link.href = asset('materials/matematica-di-base.pdf'); link.textContent = 'Consulta la dispensa originale'; error.append(link); const reload = document.createElement('button'); reload.textContent = 'Ricarica'; reload.onclick = () => location.reload(); error.append(document.createElement('br'), reload); }
async function init() {
    try {
        R = new GPU(canvas);
        const [metrics, fontAtlas] = await Promise.all([json('assets/glyphs.json'), image('assets/glyph-atlas.png')]);
        R.setFontAtlas(fontAtlas, metrics);
        R.begin();
        R.text('GAIA', 42, 40, 'display', C.pale);
        R.text('PREPARAZIONE DELLA SPEDIZIONE…', 44, 150, 'sub', C.cyan);
        R.drawUI();
        [data, readerIndex, pdfIndexes.mat, textureManifest, worlds] = await Promise.all([json('content/catalogue.json'), json('assets/reader/index.json'), json('assets/pdf/index.json'), json('assets/planets/manifest.json'), json('content/worlds/catalogue.json')]);
        lessons = {};
        await Promise.all(data.modules.filter(m => m.lesson).map(async (m) => { lessons[m.id] = await json(m.lesson); }));
        lessons.gaia = await json('content/gaia.json');
        questions = (await json('content/quizzes/math-c08.json')).questions;
        const missionIndex = await json('content/missions/index.json');
        const missionEntry = missionIndex.missions?.find(m => m.id === 'echo08-signal');
        if (missionIndex.schemaVersion !== 1 || missionEntry?.path !== 'content/missions/echo08-signal.json')
            throw Error('Registro delle missioni non valido');
        const missionDefinition = await json(missionEntry.path);
        const curriculum = await loadCurriculum(json, { onFallback: reason => console.warn('GAIA: caricamento alternativo del curriculum:', reason) });
        const textures = {};
        for(const m of textureManifest){
            textures[m.id]=R.uploadTexture(await image(m.path));
            if(m.mesh){const buffers=await Promise.all([m.mesh.vertices,m.mesh.indices].map(async p=>{const r=await fetch(asset(p));if(!r.ok)throw Error('Geometria planetaria mancante: '+p);return r.arrayBuffer();}));R.makeMesh(m.mesh.id,{v:new Float32Array(buffers[0]),i:new Uint32Array(buffers[1]),stride:12});}
        }
        // Book chapters written so far (content/libro/index.json) and the reading layer over the canvas.
        const bookIndex = await json('content/libro/index.json');
        // Passages between systems, opened by reading the chapters and following the guided paths.
        passages = cleanPassages(await json('content/atlas/passages.json').catch(() => null));
        // Chapter sections that bring each instrument of the ship on board.
        instrumentSections = cleanInstrumentSections(await json('content/atlas/instruments.json').catch(() => null));
        // Exercises of each chapter by level, and the questions of the mathematics paths, for the expeditions.
        expeditionLists = cleanExpeditionLists(await json('content/atlas/expeditions.json').catch(() => null));
        // Sections of each chapter, which the research outposts count as read.
        chapterSections = cleanChapterSections(await json('content/atlas/chapters.json').catch(() => null));
        book = new BookReader({
            index: bookIndex.capitoli, fetchText: async path => { const r = await fetch(asset(path)); if (!r.ok) throw Error('Capitolo mancante: ' + path); return r.text(); },
            onClose: () => backToParent(), onUnit: (unit, anchor) => openChapter(unit, anchor),
            onRead: (unit, id) => { const key = 'libro:' + unit + '#' + id; if (!store.data.read.includes(key)) { store.data.read.push(key); store.save(); } },
            isRead: (unit, id) => store.data.read.includes('libro:' + unit + '#' + id),
            onSolved: (unit, id, value) => { if (setSolved(store.data, unit, id, value)) { store.save(); say(value ? 'Esercizio segnato come risolto.' : 'Esercizio di nuovo da risolvere.'); } },
            isSolved: (unit, id) => store.data.solved.includes(solvedKey(unit, id)), expeditionNote: unit => expeditionLine(unit),
            unitInfo: unit => { const m = moduleById(unit); return m ? { title: m.title, area: areaOf(m.planetIndex).name } : null; },
            top: () => R.w < 850 ? 98 : 82
        });
        const sceneManifest = await json('assets/scenes/manifest.json');
        // Only the scene metadata: the landing surfaces are generated, the Blender geometry (about 52 MB) is not needed.
        const biomes = sceneMetadata(sceneManifest);
        W = new World(R, textures, biomes);
        W.planetTextures=new PlanetTextures(R,textureManifest,textures,image);
        cache = new ImageCache(R, asset);
        const bytes = await new Promise((resolve, reject) => {
            if (globalThis.__GAIA_WORKER_SOURCE__) {
                worker = new Worker(URL.createObjectURL(new Blob([globalThis.__GAIA_WORKER_SOURCE__], { type: 'text/javascript' })));
            }
            else
                worker = new Worker(new URL('./scene/worker.js', import.meta.url), { type: 'module' });
            const timer = setTimeout(() => reject(Error('Generazione delle stelle non completata')), 45000);
            worker.onmessage = ({ data }) => {
                clearTimeout(timer);
                if (data.error)
                    reject(Error(data.error));
                else
                    resolve(data.values);
            };
            worker.onerror = e => { clearTimeout(timer); reject(Error('Worker delle stelle: ' + e.message)); };
            worker.postMessage({ count: MIN_STARS, seed: 554412 });
        });
        W.bindStars(bytes,data.modules);
        R.makeStars(highlightSystemStars(bytes,W.systems));
        worker.terminate();
        parseHash();
        computeLab();
        events();
        S.loaded = true;
        window.GAIA = { version: VERSION, state: S, get atlas() { return atlas; }, get book() { return book; }, get education() { return education; }, get catalogue() { return data; }, get buttons() { return U?.buttons || []; }, get store() { return store; }, get world() { return W; }, get renderer() { return R; }, route, openCourse, openTheory, openPDF, computeLab, enterSystem, enterPlanet, backToParent, diagnostics() { const gl = R.gl, ext = gl.getExtension('WEBGL_debug_renderer_info'); return { webgl: gl.getParameter(gl.VERSION), renderer: ext ? gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER), starsGenerated: R.starCount, starsDrawn: R.frameStats.stars, starDrawCalls:R.frameStats.starDrawCalls, navigableSystems:W.systems.length, atlasMarkers:R.frameStats.atlasMarkers||0, systemStarIndices:W.systems.map(s=>s.starIndex), activeSystem:S.system, cosmicRegion:W.cosmos?.systems[S.system]?.region, cosmicVolumes:R.frameStats.cosmicVolumes||0, volumeSteps:R.frameStats.volumeSteps||0, cameraProgress:W.cameraProgress, biome: W.biome, sceneTriangles: W.surface.meshes ? W.surface.meshes.reduce((n,m)=>n+m.indexCount/3,0) : W.surface.mesh.i.length/3, planets: data.modules.length, mathModules: data.modules.filter(m => m.sector === 0).length, planned: data.modules.filter(m => m.status === 'planned').length, lessonSections: Object.values(lessons).reduce((a, l) => a + l.sections.length, 0), questions: questions.length, guidedModules:education.bundle.courses.length, guidedQuestions:education.bundle.courses.reduce((n,d)=>n+d.questions.length,0),courseTriangles:R.frameStats.courseTriangles||0, sourcePages: pdfIndexes.mat.length, physicsSourcePages: DOCUMENTS.fis.pages, terrainCells: W.terrain.height.size, webglError: gl.getError(), textureErrors: [...cache.errors,...W.planetTextures.errors], planetCounts:W.systems.map(s=>s.count),totalPlanetBodies:W.systems.reduce((n,s)=>n+s.count,0),explorablePlanets:UNIT_COUNT, persistent: store.persistent, performance: performanceReport(), frontier: W.frontier?.summary() || null, allVisiblePixelsWebGL: true, graphicsBackend: 'WebGL 2 (API browser, non OpenGL desktop)', timeUnit: 'tempo del modello', frameCount }; }, saveScenario, exportLab };
        U = new UI(R);
        pilotEducation = new MissionUI(R, store, missionDefinition, { state:S, route, openTheory, openPDF, download, say });
        education = new CourseUI(R,store,curriculum,{state:S,route,openCourse,openTheory,openPDF,openExternal,download,say,currentUnit:()=>selected().id});
        education.select(selected().id);
        atlas = new AtlasUI(R,W,store,data,curriculum,{state:S,passages,selectIndex,enterSystem,openCourse,openChapter,hasChapter:id=>!!book?.has(id),route,zoom:changeZoom,updateHash,say,
            invalidate:()=>{semanticSignature='';textSignature='';},focusCanvas:()=>canvas.focus(),reducedMotion:()=>matchMedia('(prefers-reduced-motion: reduce)').matches});
        atlas.onRoute(S.scene);
        if(S.scene==='galaxy'&&!/[a-z]/i.test(initialHash.replace(/^#\/?(galaxy)?/,'')))atlas.open('welcome');
        const motionQuery=matchMedia('(prefers-reduced-motion: reduce)');
        motionQuery.addEventListener?.('change',e=>{if(e.matches){S.paused=true;atlas.cancelFlight();}});

        if(S.courseStage!==null && S.courseStage!==undefined)education.setStage(S.courseStage);
        if (new URLSearchParams(location.search).has('diagnostica')) diagnosticPanel = mountDiagnostics(document);
        const frame = now => {
            if (S.contextLost)
                return;
            S.lastFrameMs = now - (prevTime || now);
            if (!document.hidden && !S.paused)
                S.time += Math.min(.08, S.lastFrameMs / 1000);
            prevTime = now;
            try {
                const start = performance.now();
                draw();
                meter.add(S.lastFrameMs, performance.now() - start);
                if (diagnosticPanel && now - diagnosticTime > 500) { diagnosticTime = now; diagnosticPanel.textContent = diagnosticLines(performanceReport()).join('\n'); }
            }
            catch (err) {
                console.error(err);
                failure('Errore nella scena: ' + err.message);
                return;
            }
            raf = requestAnimationFrame(frame);
        };
        raf = requestAnimationFrame(frame);
    }
    catch (e) {
        console.error(e);
        failure('Impossibile completare l’avvio di GAIA: ' + e.message);
    }
}
init();
