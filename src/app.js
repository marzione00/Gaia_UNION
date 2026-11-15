import { AtlasUI } from './navigation/atlas-ui.js';
import { CourseUI } from './education/course-ui.js';
import { loadCurriculum } from './education/curriculum-loader.js';
import { fetchJsonWithRetry } from './education/resource-loader.js';
import { MissionUI } from './education/mission-ui.js';
import { MIN_STARS, systemForPlanet, indicesForSystem, areaOf, unitPlace, highlightSystemStars, HoverTarget } from './scene/systems.js';
import { NavigationMemory } from './scene/navigation.js';
import { loadScenes, planetProfile, PlanetTextures } from './scene/assets.js';
import { resolveRoute } from './routing.js';
import { GPU, color, clamp, project, transform, mesh } from './renderer.js';
import { World, RESEARCH, EDGES, box } from './scene/world.js';
import { UI, C, ImageCache } from './ui/toolkit.js';
import { openStore, grade } from './store.js';
import { simulate, sweep, DEFAULTS } from './models/daisyworld.js';
import { rectangleModel, transformFunction, radicalValue, intersectLines, exponentialReserve, halfLife, rationalValue, rationalSignAnalysis } from './models/math.js';
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
const S = { scene: 'galaxy', selected: 7, system: systemForPlanet(7), hoveredTarget: null, observedBody: null, sector: -1, node: 0, station: 0, quality: MIN_STARS, graphics: store.data.preferences.graphics, yaw: 0, pitch: .45, distance: 60, time: 0, paused: !store.data.preferences.motion || matchMedia('(prefers-reduced-motion: reduce)').matches, scroll: 0, maxScroll: 0, reader: 'math-c08', section: 0, light: false, pdfPage: 245, pdfZoom: 1, lab: 'daisyworld', lum: 1, death: .3, sim: null, sweep: null, labValues: { p: 80, x: 13, base: 'quadratic', a: 1, b: 1, h: 0, k: 0, index: 2, mode: 'root', m1: 1, q1: 0, m2: -1, q2: 5, initial: 100, loss: .1, t: 10, zeroA: -2, zeroB: 1, pole: 3 }, labCompare: null, quizIndex: 0, quizFilter: null, quizMode: 'training', examSubmitted: false, exam: {}, quizSolution: false, catalogPage: 0, query: '', editing: null, journalTab: 'general', menu: false, settings: false, popup: null, loaded: false, contextLost: false, lastFrameMs: 0, toast: '', toastUntil: 0, focusId: null };
let education, pilotEducation, atlas;
function activeEducation(){return S.scene==='pilot'?pilotEducation:education;}
function openCourse(id,stage=null){const m=moduleById(id);if(!m)return;selectIndex(m.planetIndex);education.select(id);if(stage!==null)education.setStage(stage);route('mission');}
function openExternal(url){if(!education.bundle.sources.some(s=>s.url===url))throw Error('Fonte non registrata');window.open(url,'_blank','noopener,noreferrer');}
let R, U, W, cache, data, lessons, questions, readerIndex, pdfIndex, textureManifest, raf, prevTime = 0, pointer = null, activeSlider = null, semanticSignature = '', textSignature = '', frameCount = 0, worker = null;
const navigation = new NavigationMemory(), hover = new HoverTarget();
let hoverPointer = null, touchTarget = null;
const sectors = ['Matematica', 'Fisica', 'Chimica', 'Biologia'];
const sectorColors = [C.amber, C.cyan, C.purple, C.lime];
const nav = [['galaxy', 'MAPPA'], ['catalogue', 'ARGOMENTI'], ['paths', 'PERCORSI'], ['lab', 'LABORATORI'], ['journal', 'DIARIO']];
const navGroups = { galaxy: ['galaxy', 'system', 'orbit', 'surface'], catalogue: ['catalogue', 'mission', 'briefing', 'theory', 'pdf', 'quiz', 'sources', 'research', 'pilot'], paths: ['paths'], lab: ['lab'], journal: ['journal'] };
const sceneNames = { system: 'MAPPA', orbit: 'MAPPA', surface: 'MAPPA', mission: 'UNITÀ', briefing: 'UNITÀ', theory: 'TEORIA', pdf: 'DISPENSA', quiz: 'VERIFICA', sources: 'FONTI', research: 'RICERCA', pilot: 'MISSIONE' };
const areaTrail = (m, extra = []) => { const a = areaOf(m.planetIndex); return ['GALASSIA', sectors[a.sector].toUpperCase(), a.name.toUpperCase(), ...extra].join(' ▸ '); };
const labNames = { daisyworld: 'Daisyworld', transform: 'Trasformazioni', rectangle: 'Area a perimetro fissato', radical: 'Dominio dei radicali', linear: 'Due vincoli lineari', reserve: 'Riserve e decadimento', rational: 'Zeri, segni e punti esclusi' };
const labIds = Object.keys(labNames);
const sourceLabs = { 'function-transform': 'transform', 'rectangle-area': 'rectangle', 'radical-domain': 'radical', 'linear-system': 'linear', 'exponential-reserve': 'reserve', 'rational-signs': 'rational' };
function say(t) { S.toast = t; S.toastUntil = performance.now() + 6500; document.querySelector('#status').textContent = t; }
function selected() { return data.modules[S.selected] || data.modules[7]; }
function moduleById(id) { return data.modules.find(m => m.id === id); }
function selectIndex(i) { S.observedBody=null;S.selected = clamp(i, 0, 99); S.system = systemForPlanet(S.selected); S.scroll = 0; S.reader = selected().id; }
function route(scene, extra = {}) {
    const targetModule = Number.isInteger(extra.selected) ? data.modules[extra.selected] || selected() : selected();
    if(scene==='quiz' && targetModule.id!=='math-c08'){openCourse(targetModule.id,4);return;}
    if(scene==='briefing' && education)education.page=0;
    if (scene === 'pilot') extra = { ...extra, selected: 7, system: systemForPlanet(7), reader: 'math-c08' };
    if (scene === 'theory' && !extra.reader) {
        openTheory(targetModule.id);
        return;
    }
    navigation.move(S, scene, extra);
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
function backToParent() { if(['mission','pilot'].includes(S.scene))route('briefing');else if(S.scene==='surface')route('orbit');else if(S.scene==='orbit')route('system',{system:S.system});else if(S.scene==='system')route('galaxy'); }
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
    if (S.scene === 'pdf')
        q.set('page', String(S.pdfPage));
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
    else if (m?.source) { openPDF(m.source.pdfPages[0]); }
    else
        route('briefing');
}
function openPDF(page) { route('pdf', { pdfPage: clamp(page, 1, 769), pdfZoom: 1 }); }
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
    U.wrap(heading, 34, 140, R.w - 68, C.pale, R.w < 700 ? 25 : 39, 2, R.w < 700 ? 'sub' : 'head');
    if (sub)
        U.wrap(sub, 35, 190, Math.min(R.w - 70, 680), C.muted, 24, 2);
}
function wrapClipText(s, x, y, w, style = 'body', c = C.muted, max = 3) { return U.wrap(s, x, y, w, c, style === 'body' ? 25 : 19, max, style); }
function coverage(m) { if(m.curriculum)return m.source?'PERCORSO GUIDATO + FONTE PDF':'PERCORSO GUIDATO 3D';return m.status === 'planned' ? 'IN PREPARAZIONE' : m.lesson ? (['theory-complete', 'full-theory'].includes(m.coverage) ? 'TEORIA WEB' : 'LEZIONE WEB + FONTE') : 'DISPENSA COMPLETA'; }
function buttonsModule(m, x, y, w) { U.button('read-unit', m.curriculum ? 'APRI L’UNITÀ' : m.lesson ? 'LEGGI LA TEORIA' : 'CONSULTA LA FONTE', x, y, w, 42, () => m.curriculum?openCourse(m.id):openTheory(m.id), { active: true, disabled: m.status === 'planned' }); U.button('briefing', 'SCHEDA DELL’UNITÀ', x, y + 51, w, 42, () => route('briefing')); }
function common() {
    const w = R.w, h = R.h, mobile = w < 850;
    U.begin();
    R.rect(0, 0, w, mobile ? 98 : 82, color('#03121d', .91));
    R.line([24, mobile ? 97 : 81], [w - 24, mobile ? 97 : 81], color('#5baa9e', .45), 1, 3);
    U.text('GAIA', 26, 12, mobile ? 'head' : 'number', C.pale, { track: 4 });
    if (!mobile)
        U.tag('BEYOND KNOWLEDGE', 28, 63, C.lime);
    if (mobile) {
        U.button('menu', 'MENU', w - 90, 16, 66, 35, () => S.menu = !S.menu);
        U.text(nav.find(x => x[0] === S.scene)?.[1] || sceneNames[S.scene] || S.scene.toUpperCase(), 28, 69, 'mini', C.lime, { track: 1.1 });
        U.button('settings', 'QUALITÀ', w - 180, 58, 82, 29, () => S.settings = !S.settings, { small: true });
    }
    else {
        let x = 220;
        for (const [id, label] of nav) {
            const ww = R.textWidth(label, 'mini') + 22;
            if (x + ww > w - 75)
                break;
            U.button('nav-' + id, label, x, 24, ww, 34, () => route(id), { active: navGroups[id].includes(S.scene) });
            x += ww + 6;
        }
        U.button('settings', '⚙', w - 52, 25, 30, 32, () => S.settings = !S.settings);
    }
    R.rect(0, h - 36, w, 36, color('#03121d', .93));
    R.line([25, h - 36], [w - 25, h - 36], color('#4a8a86', .45));
    U.text('GAIA / ATLANTE SCIENTIFICO', 26, h - 25, 'micro', C.dim, { track: .7 });
    U.text(mobile ? 'WEBGL 2' : 'WEBGL 2 · ' + (['galaxy','system','orbit'].includes(S.scene) ? R.frameStats.stars.toLocaleString('it-IT') + ' STELLE 3D' : 'GRAFICA GPU'), w - 25, h - 25, 'micro', C.dim, { align: 'right', track: .6 });
}
function galaxyUI() { atlas.draw(U); }
function systemPanel(system){ const mobile=R.w<850; return mobile?null:{x:32,y:300,w:268,h:64+system.planets.length*44}; }
function systemUI() {
    const w=R.w,h=R.h,mobile=w<850,system=W.systems[S.system],m=selected(),observed=S.observedBody===null?null:system.bodies[S.observedBody],place=unitPlace(S.selected),tint=sectorColors[system.sector];
    title(areaTrail(m),system.name,mobile?system.planets.length+' unità · dall’orbita interna a quella esterna.':system.planets.length+' unità di '+system.discipline.toLowerCase()+' in ordine di studio, dall’orbita interna a quella esterna. Gli altri pianeti sono di contorno.');
    const px=mobile?18:w-337,pw=mobile?w-36:304,py=mobile?h-306:245,ph=mobile?222:365;
    U.panel(px,py,pw,ph,tint,.80);U.tag(observed?'PIANETA DI CONTORNO':'UNITÀ '+place.position+' DI '+place.count,px+18,py+19,tint);
    wrapClipText(observed?observed.profile.name:m.title,px+18,py+50,pw-36,'sub',C.pale,2);U.text(observed?'NESSUNA UNITÀ':planetProfile(S.selected).name+' · '+coverage(m),px+18,py+100,'micro',C.lime);
    if(!mobile)wrapClipText(observed?'Un pianeta del sistema senza unità di studio.':m.description,px+18,py+130,pw-36,'body',C.muted,5);
    else wrapClipText(observed?'Pianeta senza unità di studio.':m.description,px+18,py+124,pw-36,'mini',C.muted,2);
    const bw=(pw-38)/2;
    U.button('orbit-unit','PIANETA 3D',px+16,py+ph-56,bw,40,()=>enterPlanet(),{disabled:!!observed||W.cameraProgress<1});
    U.button('system-open-unit','APRI L’UNITÀ',px+22+bw,py+ph-56,bw,40,()=>openCourse(m.id),{active:!observed,disabled:!!observed});
    const list=systemPanel(system);
    if(list){
        U.panel(list.x,list.y,list.w,list.h,tint,.48);U.tag('UNITÀ DELL’AREA',list.x+18,list.y+19,tint);
        system.planets.forEach((index,i)=>{const unit=data.modules[index];U.button('system-planet-'+index,(i+1)+'. '+unit.title,list.x+17,list.y+46+i*44,list.w-34,36,()=>{selectIndex(index);S.observedBody=null;},{active:S.selected===index,disabled:W.cameraProgress<1});});
    }else{
        const n=system.planets.length,bw2=(w-36-(n-1)*4)/n;system.planets.forEach((index,i)=>U.button('system-planet-'+index,String(i+1),18+i*(bw2+4),239,bw2,32,()=>{selectIndex(index);touchTarget={type:'planet',index};},{active:S.selected===index,small:true,disabled:W.cameraProgress<1}));
    }
    U.button('back-galaxy','TORNA ALLA MAPPA',35,h-88,mobile?180:220,39,()=>route('galaxy'));
    U.button('system-zoom-in','+',mobile?w-154:w/2-66,h-77,34,30,()=>changeZoom(.86));U.button('system-zoom-out','−',mobile?w-112:w/2-26,h-77,34,30,()=>changeZoom(1/.86));
    if(!mobile)U.button('system-reset','CENTRA',w/2+14,h-77,80,30,()=>{S.yaw=0;S.pitch=.48;S.distance=34;},{small:true});
}
function sceneBlocked(x,y) {
    if(S.scene==='galaxy'&&atlas)return atlas.blocked(x,y);
    const w=R.w,h=R.h,mobile=w<850;
    if(S.menu||S.settings||S.editing||y<235||y>h-115)return true;
    if(mobile)return y<278||y>h-306;
    if(['galaxy','system'].includes(S.scene)){const list=S.scene==='system'?systemPanel(W.systems[S.system]):null;return (x>=w-337&&x<=w-33&&y>=245&&y<=610)||(!!list&&x>=list.x&&x<=list.x+list.w&&y>=list.y&&y<=list.y+list.h);}
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
    }else if(hit.type==='ambient'){
        const body=W.systems[S.system].bodies[hit.index];U.tag('CORPO '+String(body.slot+1).padStart(2,'0')+' / '+body.profile.name.toUpperCase(),x+16,y+16,C.muted);
        U.text('Pianeta di contorno',x+16,y+45,'mini',C.pale);wrapClipText(body.profile.name+' con '+body.moons+' lune'+(body.rings?' e anelli.':'.')+' Non contiene unità di studio.',x+16,y+73,pw-32,'mini',C.muted,4);
        U.text('NESSUNA UNITÀ',x+16,y+ph-26,'micro',C.dim);
    }else{
        const m=data.modules[hit.index],place=unitPlace(hit.index);U.tag('UNITÀ '+place.position+' DI '+place.count,x+16,y+16,sectorColors[m.sector]);U.text(m.title,x+16,y+45,'mini',C.pale);
        wrapClipText(m.description,x+16,y+73,pw-32,'mini',C.muted,4);
        U.text('CLIC PER AVVICINARTI AL PIANETA',x+16,y+ph-26,'micro',C.lime);
    }
}
function orbitUI() {
    const w = R.w, h = R.h, m = selected(), mobile = w < 850;
    title(areaTrail(m), m.title, 'Unità '+unitPlace(S.selected).position+' di '+unitPlace(S.selected).count+' dell’area '+areaOf(S.selected).name+'.');
    const px = mobile ? 18 : w - 370, pw = mobile ? w - 36 : 334, py = mobile ? h - 360 : 247, ph = mobile ? 276 : h - 337;
    U.panel(px, py, pw, ph, sectorColors[m.sector], .76);
    U.tag(sectors[m.sector] + ' · ' + areaOf(S.selected).name, px + 20, py + 19, sectorColors[m.sector]);
    wrapClipText(m.title, px + 20, py + 50, pw - 40, 'sub', C.pale, 2);
    U.text(coverage(m), px + 20, py + 100, 'mini', C.lime);
    if (!mobile) {
        const room = ph - 110 - 139, lines = Math.max(1, Math.min(5, Math.floor((room - 64) / 25)));
        wrapClipText(m.description, px + 20, py + 139, pw - 40, 'body', C.muted, lines);
        const y = py + 139 + lines * 25 + 10;
        if (y + 54 < py + ph - 110) { U.text('NELL’UNITÀ', px + 20, y, 'mini', C.amber); wrapClipText('Lezione su tre livelli · laboratorio · quattro domande · fonti', px + 20, y + 22, pw - 40, 'micro', C.muted, 2); }
    }
    buttonsModule(m, px + 18, py + ph - 110, pw - 36);
    U.button('surface', mobile?'SUPERFICIE':'SCENDI IN SUPERFICIE', mobile?18:35, h-88, mobile?(w-48)/2:230,39,()=>route('surface'));
    U.button('back-system',mobile?'ALL’AREA':'TORNA ALL’AREA',mobile?w/2+6:277,h-88,mobile?(w-48)/2:220,39,()=>route('system',{system:S.system}));
}
function surfaceUI() {
    const w = R.w, h = R.h, mobile = w < 850, m = selected(), tint = sectorColors[m.sector];
    title(areaTrail(m, ['SUPERFICIE']), m.title, 'Quattro stazioni, una per ogni attività dell’unità.');
    const names = ['STAZIONE DELLA LEZIONE', 'LABORATORIO', 'STAZIONE DI VERIFICA', 'STAZIONE DEI COLLEGAMENTI'];
    const desc = ['La spiegazione su tre livelli: Base, Applica, Approfondisci.', 'Prevedi, cambia i parametri e confronta due esperimenti.', 'Quattro domande con la spiegazione di ogni risposta.', 'Le unità collegate e le fonti per approfondire.'];
    const stages = [0, 2, 4, 5];
    const px = mobile ? 18 : w - 353, pw = mobile ? w - 36 : 320, py = mobile ? h - 304 : 258, ph = mobile ? 220 : 300;
    U.panel(px, py, pw, ph, tint, .78);
    U.tag('STAZIONE ' + (S.station + 1).toString().padStart(2, '0'), px + 18, py + 20, tint);
    wrapClipText(names[S.station], px + 18, py + 52, pw - 36, 'sub', C.pale, 2);
    wrapClipText(desc[S.station], px + 18, py + 112, pw - 36, 'body', C.muted, 3);
    U.button('enter-station', 'APRI QUESTA ATTIVITÀ', px + 16, py + ph - 55, pw - 32, 40, () => {
        if (m.curriculum) openCourse(m.id, stages[S.station]); else openTheory(m.id);
    }, { active: true });
    if (!mobile)
        for (const p of W.projections) {
            U.tag('S' + (p.index + 1), p.x + 18, p.y - 10, tint);
        }
    U.button('back-planet',mobile?'ORBITA':'TORNA AL PIANETA',mobile?294:307,h-86,mobile?Math.max(65,w-312):190,36,()=>route('orbit'),{small:mobile});
    for (let i = 0; i < 4; i++)
        U.button('station-' + i, 'S' + (i + 1), 35 + i * 64, h - 86, 55, 36, () => S.station = i, { active: S.station === i });
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
    title('ARGOMENTI', 'Tutte le 100 unità', 'Cerca per nome o filtra per disciplina. Ogni scheda indica l’area della mappa a cui appartiene.');
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
    items.slice(S.catalogPage * per, (S.catalogPage + 1) * per).forEach((m, i) => { const xx = x + (i % cols) * (tileW + 12), yy = 348 + Math.floor(i / cols) * 94; U.panel(xx, yy, tileW, 82, sectorColors[m.sector], m.planetIndex === S.selected ? .82 : .55); U.text(m.code, xx + 14, yy + 14, 'sub', sectorColors[m.sector]); wrapClipText(m.title, xx + 66, yy + 13, tileW - 120, 'body', C.pale, 1); U.text((sectors[m.sector] + ' · ' + areaOf(m.planetIndex).name).toUpperCase(), xx + 66, yy + 50, 'micro', C.muted, { track: .4 }); const go = () => { if (m.curriculum) openCourse(m.id); else { selectIndex(m.planetIndex); route('briefing'); } }; U.button('catalog-unit-' + m.id, '▸', xx + tileW - 44, yy + 24, 32, 32, go, { small: true }); U.buttons.at(-1).label = 'Apri l’unità ' + m.title; U.buttons.push({ id: 'catalog-row-' + m.id, label: m.title + ', ' + sectors[m.sector] + ', area ' + areaOf(m.planetIndex).name, x: xx, y: yy, w: tileW - 50, h: 82, action: go }); });
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
    U.button('brief-source','DISPENSA PDF',x+2*(bw+8),by,bw,40,()=>openPDF(m.source.pdfPages[0]),{disabled:!m.source,small:mobile});
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
    const w = R.w, h = R.h, mobile = w < 850, p = pdfIndex[S.pdfPage - 1];
    title('ARCHIVIO / DISPENSA ORIGINALE', 'MATEMATICA DI BASE', `Pagina PDF ${S.pdfPage} / 769${S.pdfPage > 12 ? ' · pagina stampata ' + (S.pdfPage - 12) : ' · preliminari'}`);
    const top = 238, bottom = h - 110, available = bottom - top, baseW = Math.min(mobile ? w - 30 : w - 150, 900), scale = baseW / p.width * S.pdfZoom, ww = p.width * scale, hh = p.height * scale, x = (w - ww) / 2;
    S.maxScroll = Math.max(0, hh - available);
    S.scroll = clamp(S.scroll, 0, S.maxScroll);
    let cropTop = S.scroll / hh, cropBottom = Math.min(1, (S.scroll + available) / hh);
    cache.draw(p.file, x, top, ww, (cropBottom - cropTop) * hh, [0, cropTop, 1, cropBottom]);
    const by = h - 90;
    let bx = mobile ? 16 : 34;
    U.button('pdf-prev', '◂', bx, by, 40, 37, () => { S.pdfPage = Math.max(1, S.pdfPage - 1); S.scroll = 0; updateHash(); }, { disabled: S.pdfPage === 1 });
    U.button('pdf-next', '▸', bx + 47, by, 40, 37, () => { S.pdfPage = Math.min(769, S.pdfPage + 1); S.scroll = 0; updateHash(); }, { disabled: S.pdfPage === 769 });
    U.button('pdf-goto', 'PAGINA ' + S.pdfPage, bx + 96, by, 108, 37, () => startEdit('page'), { small: mobile });
    U.button('pdf-plus', '+', bx + 211, by, 38, 37, () => S.pdfZoom = clamp(S.pdfZoom + .2, .6, 2));
    U.button('pdf-minus', '−', bx + 256, by, 38, 37, () => S.pdfZoom = clamp(S.pdfZoom - .2, .6, 2));
    if (!mobile) {
        U.button('pdf-copy', 'COPIA TESTO ESTRATTO', bx + 315, by, 206, 37, () => copyText(p.text));
        U.button('pdf-original', 'APRI PDF ORIGINALE', bx + 529, by, 200, 37, () => window.open(asset('materials/matematica-di-base.pdf') + '#page=' + S.pdfPage, '_blank', 'noopener'));
    }
}
function labControlsFooter() { const w = R.w, h = R.h, mobile = w < 850, labels = [['lab-save', 'CONSERVA A', saveScenario], ['lab-reset', 'RIPRISTINA', () => { S.lum = 1; S.death = .3; S.labValues = { p: 80, x: 13, base: 'quadratic', a: 1, b: 1, h: 0, k: 0, index: 2, mode: 'root', m1: 1, q1: 0, m2: -1, q2: 5, initial: 100, loss: .1, t: 10, zeroA: -2, zeroB: 1, pole: 3 }; S.labCompare = null; computeLab(); }], ['lab-export', 'ESPORTA JSON', () => exportLab(false)], ['lab-csv', 'ESPORTA CSV', () => exportLab(true)]]; const bw = mobile ? (w - 50) / 3 : 145; labels.slice(0, mobile ? 3 : (S.lab === 'daisyworld' ? 4 : 3)).forEach(([id, label, act], i) => U.button(id, label, 30 + i * (bw + 8), h - 85, bw, 36, act, { small: mobile })); }
function labUI() {
    const w = R.w, h = R.h, mobile = w < 1050;
    title('LABORATORI / MODELLI RIPRODUCIBILI', labNames[S.lab].toUpperCase(), S.lab === 'daisyworld' ? 'Retroazioni fra albedo, temperatura e popolazioni. Modello ideale: non una previsione climatica della Terra.' : 'Le proprietà matematiche restano distinte dalle approssimazioni numeriche.');
    let x = 32, y = 242;
    const count = mobile ? 4 : 7, bw = mobile ? (w - 73) / 4 : (w - 104) / 7;
    labIds.slice(mobile ? Math.floor(labIds.indexOf(S.lab) / 4) * 4 : 0, mobile ? Math.floor(labIds.indexOf(S.lab) / 4) * 4 + 4 : 7).forEach((id, i) => U.button('lab-' + id, (id === 'daisyworld' ? 'GAIA' : id === 'rectangle' ? 'AREA' : id === 'transform' ? 'FUNZIONI' : id === 'radical' ? 'RADICI' : id === 'linear' ? 'SISTEMI' : id === 'reserve' ? 'RISERVE' : 'SEGNI'), x + i * (bw + 7), y, bw, 33, () => { S.lab = id; S.labCompare = null; computeLab(); updateHash(); }, { active: S.lab === id, small: true }));
    if (mobile)
        U.button('more-labs', 'ALTRI ▸', w - 112, 206, 80, 27, () => { S.lab = labIds[(labIds.indexOf(S.lab) + 4) % 7]; S.labCompare = null; computeLab(); }, { small: true });
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
        const gy = top + 210, gh = Math.max(95, h - gy - 160);
        U.graph(59, gy, w - 95, gh, [{ points: S.sweep.map(t => [t.luminosity, t.temperatureC]), color: C.amber }, { points: S.sweep.map(t => [t.luminosity, t.bareC]), color: C.muted }], { xmin: .6, xmax: 1.6, ymin: -20, ymax: 80, xLabel: 'L (adimensionale)', yLabel: 'Temperatura (°C)' });
        U.text(d.temperatureC.toFixed(1) + ' °C · scure ' + (d.black * 100).toFixed(0) + '% · chiare ' + (d.white * 100).toFixed(0) + '%', 34, h - 135, 'mini', C.lime);
        return;
    }
    const gx = Math.max(470, w * .35), gw = right - gx - 28, gh = Math.max(160, (h - 475) * .52);
    U.panel(gx - 34, top, gw + 63, h - top - 117, C.cyan, .69);
    U.tag('RISPOSTA ALLA LUMINOSITÀ', gx - 10, top + 19);
    U.graph(gx, top + 73, gw, gh, [{ points: S.sweep.map(t => [t.luminosity, t.temperatureC]), color: C.amber }, { points: S.sweep.map(t => [t.luminosity, t.bareC]), color: C.muted }], { xmin: .6, xmax: 1.6, ymin: -20, ymax: 80, xLabel: 'Luminosità L', yLabel: 'Temperatura (°C)' });
    const mark = gx + (S.lum - .6) * gw;
    R.line([mark, top + 73], [mark, top + 73 + gh], color('#e6efe8', .65), 1);
    U.text('CON BIOLOGIA', gx, top + gh + 122, 'micro', C.amber);
    U.text('SUOLO PRIVO DI ORGANISMI', gx + 124, top + gh + 122, 'micro', C.muted);
    const py = top + gh + 181, ph = Math.max(65, h - py - 178);
    U.graph(gx, py, gw, ph, [{ points: S.sweep.map(t => [t.luminosity, t.black]), color: C.cyan }, { points: S.sweep.map(t => [t.luminosity, t.white]), color: C.lime }], { xmin: .6, xmax: 1.6, ymin: 0, ymax: 1, xLabel: 'Luminosità L', yLabel: 'Frazione di superficie', ticks: 2 });
    U.text('SCURE', gx, py + ph + 52, 'micro', C.cyan);
    U.text('CHIARE', gx + 100, py + ph + 52, 'micro', C.lime);
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
        if (Number.isInteger(n) && n >= 1 && n <= 769) {
            S.pdfPage = n;
            S.scroll = 0;
            updateHash();
        }
        else
            say('La pagina deve essere compresa tra 1 e 769.');
    }
    S.editing = null;
    editor.blur();
    canvas.focus();
}
function journalUI() {
    const w = R.w, h = R.h, mobile = w < 850;
    title('DIARIO / IPOTESI, ESPERIMENTI E CONCLUSIONI', S.journalTab.startsWith('course:') ? 'DIARIO: '+(moduleById(S.journalTab.slice(7))?.code||'UNITÀ') : S.journalTab === 'mission:echo08-signal' ? 'DIARIO DELLA MISSIONE ECHO-08' : 'LA MEMORIA DELLA SPEDIZIONE', store.persistent ? 'Salvataggio locale attivo. Esporta una copia per trasferire il lavoro fra dispositivi.' : 'Persistenza non disponibile: esporta il diario prima di chiudere.');
    const x = mobile ? 20 : 40, ww = mobile ? w - 40 : w - 80;
    U.button('journal-global', 'DIARIO GENERALE', x, 245, Math.min(220, ww / 2 - 4), 35, () => { finishEdit(); S.journalTab = 'general'; }, { active: S.journalTab === 'general', small: mobile });
    U.button('journal-module', 'UNITÀ ' + selected().code, x + Math.min(228, ww / 2 + 4), 245, Math.min(220, ww / 2 - 4), 35, () => { finishEdit(); S.journalTab = 'course:'+selected().id; }, { active: S.journalTab === 'course:'+selected().id, small: mobile });
    const by = 298, hh = h - by - 180;
    U.panel(x, by, ww, hh, C.cyan, .85);
    const text = S.editing === 'notes' ? editor.value : store.data.notes[S.journalTab] || 'Domanda → Ipotesi → Parametri → Osservazioni → Conclusioni → Limiti.\n\nSeleziona «Scrivi» per iniziare.';
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
    U.button('edit-notes', 'SCRIVI', x, bottom, bw, 38, () => startEdit('notes'), { active: S.editing === 'notes' });
    U.button('save-notes', 'SALVA', x + bw + 8, bottom, bw, 38, () => finishEdit(true));
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
    const rows = [['CONTENUTI DIDATTICI', 'Dispensa «Matematica di base» di Marzio De Corato e Danilo Liuzzi: 769 pagine, 25 unità. Quattro lezioni narrative e 40 quesiti di Funzioni conservati dalla V7.'], ['DAISYWORLD', 'Equazioni di Watson & Lovelock (1983), scelte numeriche documentate. Il modello non è una previsione del clima terrestre e non garantisce autoregolazione universale.'], ['GEOMETRIA E TEXTURE', 'Mappe planetarie: NASA Earth Observatory, NASA/GSFC/SVS, NASA/JPL-Caltech/USGS e NASA VTAD. File e risoluzioni originali documentati. Famiglie ispirate a Haegemonia. Nessuna texture planetaria inventata o generata con IA.'], ['COPERTURA', '100 nuclei guidati, 25 per disciplina, con modelli ed esercizi specifici. Non sono manuali integrali: revisione scientifico-didattica umana da completare.'], ['RENDERING', 'Tutti i pixel visibili del sito sono composti in WebGL 2. Testi matematici e pagine originali sono texture tipografiche su superfici GPU. Il livello semantico non visibile supporta tastiera e lettura assistita.']];
    let yy = y + 22 - S.scroll;
    for (const [a, b] of rows) {
        if (yy >= y && yy < h - 180) {
            U.tag(a, x + 24, yy, C.lime);
            U.wrap(b, x + 24, yy + 30, ww - 48, C.pale, 27, 5);
        }
        yy += 145;
    }
    S.maxScroll = Math.max(0, rows.length * 145 - (h - y - 145));
    U.button('source-pdf', 'DISPENSA INTEGRALE', x, h - 88, 220, 39, () => openPDF(1));
    U.button('source-model', 'DOSSIER GAIA', x + 231, h - 88, 180, 39, () => openTheory('gaia'));
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
function draw() {
    if (!S.loaded || S.contextLost)
        return;
    R.sceneQuality=S.graphics;R.hoverStarIndex=S.hoveredTarget?.type==='system'?W.systems[S.hoveredTarget.index]?.starIndex:-1;
    R.begin();
    atlas?.tick(performance.now());
    W.draw(S.scene, S, data);
    atlas?.draw3D(S,hoverPointer,pointer,U?.focus);
    if(S.scene==='pilot')pilotEducation.draw3D({...S,scene:'mission'});else education.draw3D(S);
    drawMathObjects();
    common();
    const screens = { galaxy: galaxyUI, system: systemUI, orbit: orbitUI, surface: surfaceUI, research: researchUI, catalogue: catalogueUI, briefing: briefingUI, theory: theoryUI, pdf: pdfUI, lab: labUI, quiz: quizUI, journal: journalUI, sources: sourcesUI, mission: () => education.drawUI(U, S), pilot: () => pilotEducation.drawUI(U,S), paths: () => education.drawPathsUI(U,S) };
    (screens[S.scene] || galaxyUI)();
    drawHover();
    overlay();
    atlas?.drawOverlay(U);
    R.drawUI();
    frameCount++;
    syncSemantic();
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
    const key = (S.scene==='galaxy'||atlas?.sheet)?atlas?.semanticKey():S.scene==='paths'?'paths-'+education.pathIndex+'-'+education.pathPage+'-'+store.data.updatedAt:['mission','pilot'].includes(S.scene) ? activeEducation().semanticKey() : S.scene === 'theory' ? lessons[S.reader]?.sections[S.section]?.id : S.scene === 'quiz' ? (quizList()[S.quizIndex]?.id + (S.quizSolution ? '-solution' : '-question')) : S.scene === 'pdf' ? 'pdf-' + S.pdfPage : S.scene;
    if (key !== textSignature) {
        const el = document.querySelector('#semantic-text');
        if (el)
            el.textContent = (S.scene==='galaxy'||atlas?.sheet)?atlas?.semanticText():S.scene==='paths'?education.semanticPathsText():['mission','pilot'].includes(S.scene) ? activeEducation().semanticText() : S.scene === 'pdf' ? pdfIndex[S.pdfPage - 1]?.text : readerIndex[key]?.text || selected().description;
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
                else if(hit?.type==='node')S.node=hit.index;
                else if(hit?.type==='station')S.station=hit.index;
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
        [data, readerIndex, pdfIndex, textureManifest] = await Promise.all([json('content/catalogue.json'), json('assets/reader/index.json'), json('assets/pdf/index.json'), json('assets/planets/manifest.json')]);
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
        const sceneManifest = await json('assets/scenes/manifest.json');
        const biomes = await loadScenes(R, sceneManifest, asset, progress => {
            R.begin(); R.text('GAIA', 42, 40, 'display', C.pale);
            R.text('PREPARAZIONE DEI MONDI 3D · ' + Math.round(progress * 100) + '%', 44, 150, 'sub', C.cyan); R.drawUI();
        });
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
        window.GAIA = { version: '1.8.0-prototipi', state: S, get atlas() { return atlas; }, get education() { return education; }, get catalogue() { return data; }, get buttons() { return U?.buttons || []; }, get store() { return store; }, get world() { return W; }, get renderer() { return R; }, route, openCourse, openTheory, openPDF, computeLab, enterSystem, enterPlanet, backToParent, diagnostics() { const gl = R.gl, ext = gl.getExtension('WEBGL_debug_renderer_info'); return { webgl: gl.getParameter(gl.VERSION), renderer: ext ? gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER), starsGenerated: R.starCount, starsDrawn: R.frameStats.stars, starDrawCalls:R.frameStats.starDrawCalls, navigableSystems:W.systems.length, atlasMarkers:R.frameStats.atlasMarkers||0, systemStarIndices:W.systems.map(s=>s.starIndex), activeSystem:S.system, cosmicRegion:W.cosmos?.systems[S.system]?.region, cosmicVolumes:R.frameStats.cosmicVolumes||0, volumeSteps:R.frameStats.volumeSteps||0, cameraProgress:W.cameraProgress, biome: W.biome, sceneTriangles: W.surface.meshes.reduce((n,m)=>n+m.indexCount/3,0), planets: data.modules.length, mathModules: data.modules.filter(m => m.sector === 0).length, planned: data.modules.filter(m => m.status === 'planned').length, lessonSections: Object.values(lessons).reduce((a, l) => a + l.sections.length, 0), questions: questions.length, guidedModules:education.bundle.courses.length, guidedQuestions:education.bundle.courses.reduce((n,d)=>n+d.questions.length,0),courseTriangles:R.frameStats.courseTriangles||0, sourcePages: pdfIndex.length, terrainCells: W.terrain.height.size, webglError: gl.getError(), textureErrors: [...cache.errors,...W.planetTextures.errors], planetCounts:W.systems.map(s=>s.count),totalPlanetBodies:W.systems.reduce((n,s)=>n+s.count,0),explorablePlanets:100, persistent: store.persistent, allVisiblePixelsWebGL: true, graphicsBackend: 'WebGL 2 (API browser, non OpenGL desktop)', timeUnit: 'tempo del modello', frameCount }; }, saveScenario, exportLab };
        U = new UI(R);
        pilotEducation = new MissionUI(R, store, missionDefinition, { state:S, route, openTheory, openPDF, download, say });
        education = new CourseUI(R,store,curriculum,{state:S,route,openCourse,openTheory,openPDF,openExternal,download,say,currentUnit:()=>selected().id});
        education.select(selected().id);
        atlas = new AtlasUI(R,W,store,data,curriculum,{state:S,selectIndex,enterSystem,openCourse,route,zoom:changeZoom,updateHash,say,
            invalidate:()=>{semanticSignature='';textSignature='';},focusCanvas:()=>canvas.focus(),reducedMotion:()=>matchMedia('(prefers-reduced-motion: reduce)').matches});
        atlas.onRoute(S.scene);
        if(S.scene==='galaxy'&&!/[a-z]/i.test(initialHash.replace(/^#\/?(galaxy)?/,'')))atlas.open('welcome');
        const motionQuery=matchMedia('(prefers-reduced-motion: reduce)');
        motionQuery.addEventListener?.('change',e=>{if(e.matches){S.paused=true;atlas.cancelFlight();}});

        if(S.courseStage!==null && S.courseStage!==undefined)education.setStage(S.courseStage);
        const frame = now => {
            if (S.contextLost)
                return;
            S.lastFrameMs = now - (prevTime || now);
            if (!document.hidden && !S.paused)
                S.time += Math.min(.08, S.lastFrameMs / 1000);
            prevTime = now;
            try {
                draw();
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
