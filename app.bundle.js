window.__GAIA_WORKER_SOURCE__="function random(seed = 4141) { return () => { seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0; return seed / 4294967296; }; }\nfunction stars(count = 1000000, seed = 554412) {\n    if (!Number.isInteger(count) || count < 1 || count > 1000000)\n        throw new RangeError('Conteggio stelle non valido');\n    const r = random(seed), a = new Float32Array(count * 7);\n    for (let i=0;i<count;i++) {\n        const halo=i%13===0,core=i%5===0,d=core?Math.pow(r(),1.65)*10:2+Math.pow(r(),.72)*37;\n        const gaussian=(r()+r()+r()+r()-2),theta=(i%4)*Math.PI/2+1.85*Math.log(d+1)+gaussian*(core?2.5:.24);\n        const j=i*7,heightNoise=r()+r()+r()+r()-2;\n        a[j]=halo?(r()-.5)*145:Math.cos(theta)*d;\n        a[j+1]=halo?(r()-.5)*85:heightNoise*(core?2.2:.40+d*.02);\n        a[j+2]=halo?(r()-.5)*145:Math.sin(theta)*d;\n        const warm=core||r()<.16,b=.65+r()*.35;\n        a[j+3]=warm?b:b*.62;a[j+4]=warm?b*.79:b*.78;a[j+5]=warm?b*.54:b;\n        a[j+6]=.22+r()*.62+(r()<.002?1.7:0);\n        if(core&&!halo){const polar=r()*2-1,phi=r()*Math.PI*2,radial=d*Math.sqrt(1-polar*polar);a[j]=Math.cos(phi)*radial;a[j+1]=d*polar*.48;a[j+2]=Math.sin(phi)*radial;}\n    }\n    return a;\n}\nfunction planetPositions() {\n    const r = random(610);\n    const a = [];\n    for (let s = 0; s < 4; s++)\n        for (let i = 0; i < 25; i++) {\n            const radius = 8 + Math.floor(i / 5) * 4.3 + (r() - .5) * .8, theta = s * Math.PI / 2 + .1 + (i % 5 + .5) * 1.36 / 5;\n            const size = i === 7 ? .86 : .36 + r() * .22;\n            a.push({ index: s * 25 + i, sector: s, x: Math.cos(theta) * radius, y: (r() - .5) * 2.6, z: Math.sin(theta) * radius, r: size, spin: r() * Math.PI * 2 });\n        }\n    return a;\n}\nfunction raySphere(origin, direction, center, radius) {\n    const o = origin.map((v, i) => v - center[i]), b = o.reduce((n, v, i) => n + v * direction[i], 0), c = o.reduce((n, v) => n + v * v, 0) - radius * radius, d = b * b - c;\n    if (d < 0)\n        return null;\n    const t = -b - Math.sqrt(d);\n    return t >= 0 ? t : (-b + Math.sqrt(d) >= 0 ? -b + Math.sqrt(d) : null);\n}\n\nfunction backgroundStars(count=6000,seed=91071){\n    const r=random(seed),a=new Float32Array(count*7);\n    for(let i=0;i<count;i++){const y=r()*2-1,t=r()*Math.PI*2,k=Math.sqrt(1-y*y),j=i*7;a.set([Math.cos(t)*k*170,y*170,Math.sin(t)*k*170,.6+r()*.4,.65+r()*.35,.7+r()*.3,.4+r()*1.6],j);}\n    return a;\n}\n\nself.onmessage = ({ data }) => {\n    try {\n        const values = stars(data.count, data.seed);\n        self.postMessage({ values }, [values.buffer]);\n    }\n    catch (e) {\n        self.postMessage({ error: e.message });\n    }\n};\n";
(()=>{const __modules={"src/app.js":(exports,__require)=>{
const { MIN_STARS, systemForPlanet, indicesForSystem, highlightSystemStars, HoverTarget }=__require("src/scene/systems.js");
const { NavigationMemory }=__require("src/scene/navigation.js");
const { loadScenes, planetProfile, PlanetTextures }=__require("src/scene/assets.js");
const { resolveRoute }=__require("src/routing.js");
const { GPU, color, clamp, project, transform, mesh }=__require("src/renderer.js");
const { World, RESEARCH, EDGES, box }=__require("src/scene/world.js");
const { UI, C, ImageCache }=__require("src/ui/toolkit.js");
const { openStore, grade }=__require("src/store.js");
const { simulate, sweep, DEFAULTS }=__require("src/models/daisyworld.js");
const { rectangleModel, transformFunction, radicalValue, intersectLines, exponentialReserve, halfLife, rationalValue, rationalSignAnalysis }=__require("src/models/math.js");
const canvas = document.querySelector('#gaia'), error = document.querySelector('#error'), editor = document.querySelector('#editor'), semantic = document.querySelector('#semantic');
const files = globalThis.__GAIA_FILES__ || {};
const asset = p => files[p]?.url || p;
async function json(path) {
    if (files[path]?.json)
        return structuredClone(files[path].json);
    const r = await fetch(path);
    if (!r.ok)
        throw new Error('Risorsa mancante: ' + path);
    return r.json();
}
function image(path) { return new Promise((yes, no) => { const i = new Image(); i.onload = () => yes(i); i.onerror = () => no(Error('Texture mancante: ' + path)); i.src = asset(path); }); }
const store = openStore();
const S = { scene: 'galaxy', selected: 7, system: 7, hoveredTarget: null, observedBody: null, sector: -1, node: 0, station: 0, quality: MIN_STARS, graphics: store.data.preferences.graphics, yaw: 0, pitch: .45, distance: 60, time: 0, paused: !store.data.preferences.motion || matchMedia('(prefers-reduced-motion: reduce)').matches, scroll: 0, maxScroll: 0, reader: 'math-c08', section: 0, light: false, pdfPage: 245, pdfZoom: 1, lab: 'daisyworld', lum: 1, death: .3, sim: null, sweep: null, labValues: { p: 80, x: 13, base: 'quadratic', a: 1, b: 1, h: 0, k: 0, index: 2, mode: 'root', m1: 1, q1: 0, m2: -1, q2: 5, initial: 100, loss: .1, t: 10, zeroA: -2, zeroB: 1, pole: 3 }, labCompare: null, quizIndex: 0, quizFilter: null, quizMode: 'training', examSubmitted: false, exam: {}, quizSolution: false, catalogPage: 0, query: '', editing: null, journalTab: 'general', menu: false, settings: false, popup: null, loaded: false, contextLost: false, lastFrameMs: 0, toast: '', toastUntil: 0, focusId: null };
let R, U, W, cache, data, lessons, questions, readerIndex, pdfIndex, textureManifest, raf, prevTime = 0, pointer = null, activeSlider = null, semanticSignature = '', textSignature = '', frameCount = 0, worker = null;
const navigation = new NavigationMemory(), hover = new HoverTarget();
let hoverPointer = null, touchTarget = null;
const sectors = ['Matematica', 'Fisica', 'Chimica', 'Biologia'];
const sectorColors = [C.amber, C.cyan, C.purple, C.lime];
const nav = [['galaxy', 'ATLANTE'], ['surface', 'SUPERFICIE'], ['research', 'RICERCA'], ['catalogue', 'CATALOGO'], ['theory', 'TEORIA'], ['lab', 'LABORATORI'], ['quiz', 'VERIFICA'], ['journal', 'DIARIO']];
const labNames = { daisyworld: 'Daisyworld', transform: 'Trasformazioni', rectangle: 'Area a perimetro fissato', radical: 'Dominio dei radicali', linear: 'Due vincoli lineari', reserve: 'Riserve e decadimento', rational: 'Zeri, segni e punti esclusi' };
const labIds = Object.keys(labNames);
const sourceLabs = { 'function-transform': 'transform', 'rectangle-area': 'rectangle', 'radical-domain': 'radical', 'linear-system': 'linear', 'exponential-reserve': 'reserve', 'rational-signs': 'rational' };
function say(t) { S.toast = t; S.toastUntil = performance.now() + 6500; document.querySelector('#status').textContent = t; }
function selected() { return data.modules[S.selected] || data.modules[7]; }
function moduleById(id) { return data.modules.find(m => m.id === id); }
function selectIndex(i) { S.observedBody=null;S.selected = clamp(i, 0, 99); S.system = systemForPlanet(S.selected); S.scroll = 0; S.reader = selected().id; }
function route(scene, extra = {}) {
    if (scene === 'theory' && !extra.reader) {
        openTheory(selected().id);
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
    semanticSignature = '';
}
function enterSystem(id=S.system) { route('system',{system:id}); }
function enterPlanet(index=S.selected) { route('orbit',{selected:index}); }
function backToParent() { if(S.scene==='surface')route('orbit');else if(S.scene==='orbit')route('system',{system:S.system});else if(S.scene==='system')route('galaxy'); }
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
function parseHash() { const p = resolveRoute(location.hash, data.modules, Object.keys(lessons)); navigation.move(S,p.scene,p); hover.clear(); S.hoveredTarget=null; S.section = clamp(S.section, 0, (lessons[S.reader]?.sections.length || 1) - 1); }
function openTheory(id = 'math-c08', section = 0) {
    const m = moduleById(id);
    if (m)
        S.selected = m.planetIndex;
    if (lessons[id]) {
        route('theory', { reader: id, section: clamp(section, 0, lessons[id].sections.length - 1) });
    }
    else if (m?.source) {
        openPDF(m.source.pdfPages[0]);
    }
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
        catch { /* remains available */ }
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
    U.tag(kicker, 36, 110, C.lime);
    U.wrap(heading, 34, 140, R.w - 68, C.pale, R.w < 700 ? 25 : 39, 2, R.w < 700 ? 'sub' : 'head');
    if (sub)
        U.wrap(sub, 35, 190, Math.min(R.w - 70, 680), C.muted, 24, 2);
}
function wrapClipText(s, x, y, w, style = 'body', c = C.muted, max = 3) { return U.wrap(s, x, y, w, c, style === 'body' ? 25 : 19, max, style); }
function coverage(m) { return m.status === 'planned' ? 'IN PREPARAZIONE' : m.lesson ? (['theory-complete', 'full-theory'].includes(m.coverage) ? 'TEORIA WEB' : 'LEZIONE WEB + FONTE') : 'DISPENSA COMPLETA'; }
function buttonsModule(m, x, y, w) { U.button('briefing', 'DOSSIER DELL’UNITÀ', x, y, w, 42, () => route('briefing'), { active: true }); U.button('read-unit', m.lesson ? 'LEGGI LA TEORIA' : 'CONSULTA LA FONTE', x, y + 51, w, 42, () => openTheory(m.id), { disabled: m.status === 'planned' }); }
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
        U.text(nav.find(x => x[0] === S.scene)?.[1] || ({system:'SISTEMA',orbit:'ORBITA'}[S.scene]||S.scene.toUpperCase()), 28, 69, 'mini', C.lime, { track: 1.1 });
        U.button('settings', 'QUALITÀ', w - 180, 58, 82, 29, () => S.settings = !S.settings, { small: true });
    }
    else {
        let x = 220;
        for (const [id, label] of nav) {
            const ww = R.textWidth(label, 'mini') + 22;
            if (x + ww > w - 75)
                break;
            U.button('nav-' + id, label, x, 24, ww, 34, () => route(id), { active: S.scene === id || id === 'galaxy' && ['system','orbit'].includes(S.scene) });
            x += ww + 6;
        }
        U.button('settings', '⚙', w - 52, 25, 30, 32, () => S.settings = !S.settings);
    }
    R.rect(0, h - 36, w, 36, color('#03121d', .93));
    R.line([25, h - 36], [w - 25, h - 36], color('#4a8a86', .45));
    U.text('GAIA / ATLANTE SCIENTIFICO', 26, h - 25, 'micro', C.dim, { track: .7 });
    U.text(mobile ? 'WEBGL 2' : 'WEBGL 2 · ' + (['galaxy','system','orbit'].includes(S.scene) ? R.frameStats.stars.toLocaleString('it-IT') + ' STELLE 3D' : 'GRAFICA GPU'), w - 25, h - 25, 'micro', C.dim, { align: 'right', track: .6 });
}
function galaxyUI() {
    const w=R.w,h=R.h,mobile=w<850,system=W.systems[S.system]||W.systems[7];
    title('01 / GALASSIA DELLA CONOSCENZA','UN UNIVERSO DA COMPRENDERE',mobile?'Tocca una stella per scoprire il sistema.':'Un milione di stelle 3D. Passa sui sistemi per scoprirli, fai clic per entrare.');
    const px=mobile?18:w-337,pw=mobile?w-36:304,py=mobile?h-306:245,ph=mobile?222:365;
    U.panel(px,py,pw,ph,C.amber,.80);U.tag('SISTEMA STELLARE / '+String(system.id+1).padStart(2,'0'),px+18,py+19,C.amber);
    U.text(system.name,px+18,py+50,'sub',C.pale);U.text(system.count+' PIANETI · 4 ESPLORABILI',px+18,py+100,'micro',C.lime,{track:.6});
    if(!mobile){wrapClipText(system.description,px+18,py+130,pw-36,'body',C.muted,5);U.text('25 SISTEMI ESPLORABILI / 100 UNITÀ',px+18,py+260,'micro',C.dim);}
    else wrapClipText(system.description,px+18,py+124,pw-36,'mini',C.muted,2);
    U.button('enter-system','ESPLORA IL SISTEMA',px+16,py+ph-56,pw-32,40,()=>enterSystem(),{active:true});
    if(!mobile){
        U.panel(32,300,248,276,C.cyan,.48);U.tag('DISCIPLINE',50,319);
        sectors.forEach((label,i)=>U.button('sector-'+i,label.toUpperCase()+'  ·  25',49,349+i*44,214,36,()=>{S.sector=S.sector===i?-1:i;selectIndex(S.system+(S.sector<0?0:S.sector)*25);},{active:S.sector===i}));
        U.button('sector-all','TUTTE LE DISCIPLINE',49,531,214,29,()=>S.sector=-1,{small:true});
    }else{
        const bw=(w-42)/4;sectors.forEach((label,i)=>U.button('sector-'+i,['MAT','FIS','CHI','BIO'][i],18+i*(bw+2),239,bw,32,()=>{S.sector=S.sector===i?-1:i;selectIndex(S.system+(S.sector<0?0:S.sector)*25);},{active:S.sector===i,small:true}));
    }
    const by=h-77;U.button('zoom-in','+',w/2-66,by,34,30,()=>changeZoom(.86));U.button('zoom-out','−',w/2-26,by,34,30,()=>changeZoom(1/.86));
    U.button('reset-camera','CENTRA',w/2+14,by,80,30,()=>{S.yaw=0;S.pitch=.45;S.distance=60;},{small:true});
    if(!mobile)U.text('TRASCINA PER ORBITARE  ·  ROTELLA PER ZOOM  ·  CLIC SU UNA STELLA PER ENTRARE',34,h-105,'micro',C.muted,{track:.4});
}
function systemUI() {
    const w=R.w,h=R.h,mobile=w<850,system=W.systems[S.system],m=selected(),observed=S.observedBody===null?null:system.bodies[S.observedBody];
    title('02 / SISTEMA STELLARE',system.name,mobile?system.count+' pianeti · 4 esplorabili.':system.count+' pianeti in orbita, quattro esplorabili. Passa su un mondo per identificarlo.');
    const px=mobile?18:w-337,pw=mobile?w-36:304,py=mobile?h-306:245,ph=mobile?222:365;
    U.panel(px,py,pw,ph,sectorColors[m.sector],.80);U.tag(observed?'OSSERVAZIONE ORBITALE':sectors[m.sector]+' / '+m.code,px+18,py+19,sectorColors[m.sector]);
    wrapClipText(observed?observed.profile.name:m.planetName,px+18,py+50,pw-36,'sub',C.pale,2);U.text(observed?'NON ESPLORABILE':planetProfile(S.selected).name+' · '+coverage(m),px+18,py+100,'micro',C.lime);
    if(!mobile){wrapClipText(observed?observed.profile.name+' con '+observed.moons+' lune'+(observed.rings?' e anelli.':'.')+' Nessun accesso alla superficie.':m.title+' — '+m.description,px+18,py+130,pw-36,'body',C.muted,5);U.text(system.count+' PIANETI · '+system.architecture.toUpperCase(),px+18,py+260,'micro',C.dim);}
    else wrapClipText(observed?'Corpo celeste visibile in orbita. Nessun accesso alla superficie.':m.title+' — '+m.description,px+18,py+124,pw-36,'mini',C.muted,2);
    U.button('orbit-unit',observed?'NON ESPLORABILE':'ESPLORA IL PIANETA',px+16,py+ph-56,pw-32,40,()=>enterPlanet(),{active:!observed,disabled:!!observed||W.cameraProgress<1});
    if(!mobile){
        U.panel(32,300,248,276,C.cyan,.48);U.tag('QUATTRO MONDI ESPLORABILI',50,319);
        system.planets.forEach((index,i)=>{const m=data.modules[index];U.button('system-planet-'+index,sectors[m.sector].toUpperCase()+' · '+m.code,49,349+i*44,214,36,()=>enterPlanet(index),{active:S.selected===index,disabled:W.cameraProgress<1});});
        U.text('ORBITA E DISTANZE ILLUSTRATIVE',50,541,'micro',C.dim);
    }else{
        const bw=(w-42)/4;system.planets.forEach((index,i)=>U.button('system-planet-'+index,['MAT','FIS','CHI','BIO'][i],18+i*(bw+2),239,bw,32,()=>{selectIndex(index);touchTarget={type:'planet',index};},{active:S.selected===index,small:true,disabled:W.cameraProgress<1}));
    }
    U.button('back-galaxy','TORNA ALL’ATLANTE',35,h-88,mobile?180:220,39,()=>route('galaxy'));
    U.button('system-zoom-in','+',mobile?w-154:w/2-66,h-77,34,30,()=>changeZoom(.86));U.button('system-zoom-out','−',mobile?w-112:w/2-26,h-77,34,30,()=>changeZoom(1/.86));
    if(!mobile)U.button('system-reset','CENTRA',w/2+14,h-77,80,30,()=>{S.yaw=0;S.pitch=.48;S.distance=34;},{small:true});
}
function sceneBlocked(x,y) {
    const w=R.w,h=R.h,mobile=w<850;
    if(S.menu||S.settings||S.editing||y<235||y>h-115)return true;
    if(mobile)return y<278||y>h-306;
    if(['galaxy','system'].includes(S.scene))return (x>=w-337&&x<=w-33&&y>=245&&y<=610)||(x>=32&&x<=280&&y>=300&&y<=576);
    return false;
}
function sceneActions() {
    if(S.menu||S.settings||W.cameraProgress<1)return [];
    if(S.scene==='galaxy')return W.systems.map(system=>({id:'scene-system-'+system.id,label:'Sistema '+system.name+', '+system.count+' pianeti, quattro esplorabili. '+system.description,action:()=>enterSystem(system.id)}));
    if(S.scene==='system')return W.systems[S.system].planets.map(index=>({id:'scene-planet-'+index,label:'Pianeta '+data.modules[index].planetName+', '+data.modules[index].title,action:()=>enterPlanet(index)}));
    return [];
}
function drawHover() {
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
        const system=W.systems[hit.index];U.tag('SISTEMA '+system.name,x+16,y+16,C.amber);U.text(system.count+' pianeti · 4 esplorabili',x+16,y+45,'mini',C.pale);
        wrapClipText(system.description,x+16,y+73,pw-32,'mini',C.muted,4);
        U.text('CLIC PER ENTRARE NEL SISTEMA',x+16,y+ph-26,'micro',C.lime);
    }else if(hit.type==='ambient'){
        const body=W.systems[S.system].bodies[hit.index];U.tag('CORPO '+String(body.slot+1).padStart(2,'0')+' / '+body.profile.name.toUpperCase(),x+16,y+16,C.muted);
        U.text('Osservazione orbitale',x+16,y+45,'mini',C.pale);wrapClipText(body.profile.name+' con '+body.moons+' lune'+(body.rings?' e anelli.':'.')+' Destinazione non esplorabile.',x+16,y+73,pw-32,'mini',C.muted,4);
        U.text('NESSUN ACCESSO ALLA SUPERFICIE',x+16,y+ph-26,'micro',C.dim);
    }else{
        const m=data.modules[hit.index];U.tag(m.planetName,x+16,y+16,sectorColors[m.sector]);U.text(sectors[m.sector]+' · '+coverage(m),x+16,y+45,'micro',C.pale);
        wrapClipText(m.title+' — '+m.description,x+16,y+73,pw-32,'mini',C.muted,4);
        U.text('CLIC PER ESPLORARE IL PIANETA',x+16,y+ph-26,'micro',C.lime);
    }
}
function orbitUI() {
    const w = R.w, h = R.h, m = selected(), mobile = w < 850;
    title('03 / DOSSIER ORBITALE', m.planetName, m.title);
    const px = mobile ? 18 : w - 370, pw = mobile ? w - 36 : 334, py = mobile ? h - 360 : 247, ph = mobile ? 276 : h - 337;
    U.panel(px, py, pw, ph, sectorColors[m.sector], .76);
    U.tag(sectors[m.sector] + ' / ' + m.code, px + 20, py + 19);
    wrapClipText(m.title, px + 20, py + 50, pw - 40, 'sub', C.pale, 2);
    U.text(coverage(m), px + 20, py + 100, 'mini', C.lime);
    if (!mobile) {
        wrapClipText(m.description, px + 20, py + 139, pw - 40, 'body', C.muted, 5);
        U.text('Non una misura astronomica', px + 20, py + 285, 'mini', C.amber);
        wrapClipText(planetProfile(S.selected).name + ' · mappa NASA di riferimento. Sistema immaginario, superficie basata su un analogo del Sistema Solare.', px + 20, py + 310, pw - 40, 'micro', C.muted, 3);
    }
    buttonsModule(m, px + 18, py + ph - 110, pw - 36);
    U.button('surface', mobile?'SUPERFICIE':'SCENDI ALLA STAZIONE', mobile?18:35, h-88, mobile?(w-48)/2:230,39,()=>route('surface'));
    U.button('back-system',mobile?'AL SISTEMA':'TORNA AL SISTEMA',mobile?w/2+6:277,h-88,mobile?(w-48)/2:220,39,()=>route('system',{system:S.system}));
}
function surfaceUI() {
    const w = R.w, h = R.h, mobile = w < 850;
    title('04 / OSSERVAZIONE PLANETARIA', 'LA STAZIONE ECHO', W.biome.toUpperCase() + ' · ambiente 3D illustrativo. Non è una mappa climatica osservata.');
    let wet = Array.from(W.terrain.height.values()).filter(x => x.wet).length;
    const names = ['OSSERVATORIO DEI MODELLI', 'STAZIONE ENERGETICA', 'LABORATORIO DELLA MATERIA', 'OSSERVATORIO DELLA VITA'];
    const desc = ['Teoria, funzioni e strumenti di calcolo.', 'Bilancio energetico nel modello Daisyworld.', 'Nodi di collegamento; corso di chimica in preparazione.', 'Popolazioni nel modello; corso di biologia in preparazione.'];
    const px = mobile ? 18 : w - 353, pw = mobile ? w - 36 : 320, py = mobile ? h - 304 : 258, ph = mobile ? 220 : 370;
    U.panel(px, py, pw, ph, sectorColors[S.station], .78);
    U.tag('STAZIONE ' + (S.station + 1).toString().padStart(2, '0'), px + 18, py + 20);
    wrapClipText(names[S.station], px + 18, py + 52, pw - 36, 'sub', C.pale, 2);
    wrapClipText(desc[S.station], px + 18, py + 112, pw - 36, 'body', C.muted, 3);
    if (!mobile) {
        U.text('GEOMETRIA DELLA SCENA', px + 18, py + 218, 'mini', C.lime);
        U.text('875 celle / ' + wet + ' aree d’acqua', px + 18, py + 249, 'body', C.pale);
        U.text('4 stazioni / ' + W.trees.length + ' elementi vegetali', px + 18, py + 278, 'micro', C.muted);
    }
    U.button('enter-station', 'APRI IL PERCORSO', px + 16, py + ph - 55, pw - 32, 40, () => {
        if (S.station === 0)
            openTheory('math-c08');
        else if (S.station === 1)
            route('lab', { lab: 'daisyworld' });
        else {
            S.sector = S.station;
            route('catalogue');
        }
    }, { active: true });
    if (!mobile)
        for (const p of W.projections) {
            U.tag('S' + (p.index + 1), p.x + 18, p.y - 10, sectorColors[p.index]);
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
    title('05 / CATALOGO DIDATTICO', 'CENTO DESTINAZIONI', '25 unità matematiche documentate; 75 posti riservati alle future dispense.');
    const x = 34, ww = w - 68;
    U.button('search', 'CERCA: ' + (S.query || 'argomento, codice, disciplina…'), x, 245, ww, 42, () => startEdit('search'), { active: S.editing === 'search' });
    let bw = (ww - 20) / 5;
    ['TUTTE', 'MATEMATICA', 'FISICA', 'CHIMICA', 'BIOLOGIA'].forEach((t, i) => U.button('filter-' + i, mobile ? ['TUTTE', 'MAT', 'FIS', 'CHI', 'BIO'][i] : t, x + i * (bw + 5), 298, bw, 32, () => { S.sector = i - 1; S.catalogPage = 0; }, { active: S.sector === i - 1, small: mobile }));
    const items = data.modules.filter(m => (S.sector < 0 || m.sector === S.sector) && (m.title + ' ' + m.code + ' ' + sectors[m.sector] + ' ' + m.description).toLocaleLowerCase('it').includes(S.query.toLocaleLowerCase('it')));
    const cols = mobile ? 1 : w > 1400 ? 3 : 2, rows = Math.max(1, Math.floor((h - 449) / 94)), per = cols * rows, pages = Math.max(1, Math.ceil(items.length / per));
    S.catalogPage = clamp(S.catalogPage, 0, pages - 1);
    const tileW = (ww - (cols - 1) * 12) / cols;
    items.slice(S.catalogPage * per, (S.catalogPage + 1) * per).forEach((m, i) => { const xx = x + (i % cols) * (tileW + 12), yy = 348 + Math.floor(i / cols) * 94; U.panel(xx, yy, tileW, 82, sectorColors[m.sector], m.planetIndex === S.selected ? .82 : .55); U.text(m.code, xx + 14, yy + 14, 'sub', sectorColors[m.sector]); wrapClipText(m.title, xx + 66, yy + 13, tileW - 120, 'body', C.pale, 1); U.text(coverage(m), xx + 66, yy + 50, 'micro', C.muted, { track: .4 }); U.button('catalog-unit-' + m.id, '▸', xx + tileW - 44, yy + 24, 32, 32, () => { selectIndex(m.planetIndex); route('briefing'); }, { small: true }); U.buttons.push({ id: 'catalog-row-' + m.id, label: m.code + ' ' + m.title, x: xx, y: yy, w: tileW - 50, h: 82, action: () => { selectIndex(m.planetIndex); route('briefing'); } }); });
    U.button('catalog-prev', 'PRECEDENTI', x, h - 85, 126, 36, () => S.catalogPage--, { disabled: S.catalogPage === 0 });
    U.button('catalog-next', 'SUCCESSIVE', w - 160, h - 85, 126, 36, () => S.catalogPage++, { disabled: S.catalogPage >= pages - 1 });
    U.text(`${items.length} RISULTATI · ${S.catalogPage + 1}/${pages}`, w / 2, h - 72, 'micro', C.muted, { align: 'center' });
}
function briefingUI() {
    const m = selected(), w = R.w, h = R.h, mobile = w < 850;
    title('DOSSIER / ' + sectors[m.sector].toUpperCase(), m.title, coverage(m));
    const x = mobile ? 20 : Math.max(50, (w - 1050) / 2), ww = mobile ? w - 40 : Math.min(1050, w - 100), y = 245;
    U.panel(x, y, ww, h - y - 110, sectorColors[m.sector], .82);
    U.tag('DOMANDA DELLA SPEDIZIONE', x + 24, y + 23);
    wrapClipText(m.description, x + 24, y + 63, ww - 48, 'body', C.pale, 4);
    let yy = y + 178;
    U.tag('PREREQUISITI E COLLEGAMENTI', x + 24, yy);
    yy += 35;
    const pre = m.prerequisites || [];
    if (!pre.length)
        U.wrap('Nessun prerequisito obbligatorio indicato nel catalogo. La navigazione resta libera.', x + 24, yy, ww - 48, C.muted, 25, 2);
    else
        for (const id of pre.slice(0, 3)) {
            const dep = moduleById(id);
            if (dep) {
                U.button('pre-' + id, dep.code + ' · ' + dep.title, x + 24, yy, Math.min(ww - 48, 560), 34, () => { selectIndex(dep.planetIndex); route('briefing'); });
                yy += 43;
            }
        }
    if (!mobile) {
        U.tag('COPERTURA REALE', x + 24, y + 354);
        wrapClipText(m.status === 'planned' ? 'Questo pianeta è riservato alla futura dispensa. Non sono stati inventati capitoli, domande o risultati.' : m.lesson ? (lessons[m.id]?.coverage?.note || 'Lezione web disponibile; la fonte integrale resta nel PDF.') : 'La dispensa originale è consultabile interamente nel lettore WebGL. La rielaborazione narrativa di questa unità non è ancora disponibile.', x + 24, y + 390, ww - 48, 'body', C.muted, 4);
    }
    const by = h - 95;
    U.button('brief-read', m.lesson ? 'TEORIA NARRATIVA' : 'FONTE ORIGINALE', x, by, mobile ? (ww - 9) / 2 : 230, 42, () => openTheory(m.id), { active: true, disabled: m.status === 'planned' });
    U.button('brief-source', 'DISPENSA PDF', x + (mobile ? (ww + 9) / 2 : 245), by, mobile ? (ww - 9) / 2 : 220, 42, () => openPDF(m.source?.pdfPages[0] || 1), { disabled: !m.source });
    if (!mobile)
        U.button('brief-lab', 'LABORATORI', x + 480, by, 200, 42, () => route('lab', { lab: sourceLabs[m.labIds?.[0]] || 'daisyworld' }));
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
    title('DIARIO / IPOTESI, ESPERIMENTI E CONCLUSIONI', 'LA MEMORIA DELLA SPEDIZIONE', store.persistent ? 'Salvataggio locale attivo. Esporta una copia per trasferire il lavoro fra dispositivi.' : 'Persistenza non disponibile: esporta il diario prima di chiudere.');
    const x = mobile ? 20 : 40, ww = mobile ? w - 40 : w - 80;
    U.button('journal-global', 'DIARIO GENERALE', x, 245, Math.min(220, ww / 2 - 4), 35, () => { finishEdit(); S.journalTab = 'general'; }, { active: S.journalTab === 'general', small: mobile });
    U.button('journal-module', 'UNITÀ ' + selected().code, x + Math.min(228, ww / 2 + 4), 245, Math.min(220, ww / 2 - 4), 35, () => { finishEdit(); S.journalTab = selected().id; }, { active: S.journalTab === selected().id, small: mobile });
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
    const rows = [['CONTENUTI DIDATTICI', 'Dispensa «Matematica di base» di Marzio De Corato e Danilo Liuzzi: 769 pagine, 25 unità. Quattro lezioni narrative e 40 quesiti di Funzioni conservati dalla V7.'], ['DAISYWORLD', 'Equazioni di Watson & Lovelock (1983), scelte numeriche documentate. Il modello non è una previsione del clima terrestre e non garantisce autoregolazione universale.'], ['GEOMETRIA E TEXTURE', 'Mappe planetarie: NASA Earth Observatory, NASA/GSFC/SVS, NASA/JPL-Caltech/USGS e NASA VTAD. File e risoluzioni originali documentati. Famiglie ispirate a Haegemonia. Nessuna texture planetaria inventata o generata con IA.'], ['COPERTURA', 'Fisica, chimica e biologia: 75 posti riservati. La rete collega concetti e dossier trasversali; non simula tre corsi completi.'], ['RENDERING', 'Tutti i pixel visibili del sito sono composti in WebGL 2. Testi matematici e pagine originali sono texture tipografiche su superfici GPU. Il livello semantico non visibile supporta tastiera e lettura assistita.']];
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
        nav.forEach(([id, label], i) => U.button('mobile-' + id, label, 35, 132 + i * 49, w - 70, 40, () => route(id), { active: S.scene === id }));
        U.button('mobile-sources', 'FONTI E LIMITI', 35, 132 + nav.length * 49, w - 70, 40, () => route('sources'));
    }
    if (S.settings) {
        const pw = Math.min(480, w - 32), x = w - pw - 16, y = 111;
        U.panel(x, y, pw, 369, C.cyan, .97);
        U.tag('RENDERING E ACCESSIBILITÀ', x + 19, y + 21);
        [['high','DETTAGLIO ALTO · 1.000.000 STELLE'],['balanced','BILANCIATO · 1.000.000 STELLE'],['low','LEGGERO · 1.000.000 STELLE']].forEach(([mode,label],i)=>U.button('graphics-'+mode,label,x+18,y+61+i*45,pw-36,36,()=>{S.graphics=mode;store.data.preferences.graphics=mode;store.data.preferences.quality=MIN_STARS;store.save();},{active:S.graphics===mode}));
        U.button('toggle-motion', S.paused ? 'ATTIVA IL MOVIMENTO' : 'RIDUCI IL MOVIMENTO', x + 18, y + 208, pw - 36, 36, () => { S.paused = !S.paused; store.data.preferences.motion = !S.paused; store.save(); });
        U.button('open-sources', 'FONTI, MATERIALI E LIMITI', x + 18, y + 254, pw - 36, 36, () => route('sources'));
        U.button('close-settings', 'CHIUDI', x + 18, y + 304, pw - 36, 36, () => S.settings = false);
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
    W.draw(S.scene, S, data);
    drawMathObjects();
    common();
    const screens = { galaxy: galaxyUI, system: systemUI, orbit: orbitUI, surface: surfaceUI, research: researchUI, catalogue: catalogueUI, briefing: briefingUI, theory: theoryUI, pdf: pdfUI, lab: labUI, quiz: quizUI, journal: journalUI, sources: sourcesUI };
    (screens[S.scene] || galaxyUI)();
    drawHover();
    overlay();
    R.drawUI();
    frameCount++;
    syncSemantic();
}
function syncSemantic() {
    const accessibleButtons=[...U.buttons,...sceneActions()];
    const signature = S.scene + '|' + accessibleButtons.map(b => b.id + ':' + b.label + ':' + Boolean(b.disabled)).join('|');
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
            el.onfocus = () => { U.focus = b.id; };
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
    const key = S.scene === 'theory' ? lessons[S.reader]?.sections[S.section]?.id : S.scene === 'quiz' ? (quizList()[S.quizIndex]?.id + (S.quizSolution ? '-solution' : '-question')) : S.scene === 'pdf' ? 'pdf-' + S.pdfPage : S.scene;
    if (key !== textSignature) {
        const el = document.querySelector('#semantic-text');
        if (el)
            el.textContent = S.scene === 'pdf' ? pdfIndex[S.pdfPage - 1]?.text : readerIndex[key]?.text || selected().description;
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
            if (['galaxy', 'system', 'orbit', 'surface', 'research'].includes(S.scene)) {
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
                    if(touch&&!same){touchTarget=hit;S.hoveredTarget=hit;if(hit.type==='system'){S.system=hit.index;selectIndex(hit.index+(S.sector>=0?S.sector:0)*25);}else selectIndex(hit.index);updateHash();}
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
            if (file.size > 2000000)
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
        const [metrics, atlas] = await Promise.all([json('assets/glyphs.json'), image('assets/glyph-atlas.png')]);
        R.setFontAtlas(atlas, metrics);
        R.begin();
        R.text('GAIA', 42, 40, 'display', C.pale);
        R.text('PREPARAZIONE DELLA SPEDIZIONE…', 44, 150, 'sub', C.cyan);
        R.drawUI();
        [data, readerIndex, pdfIndex, textureManifest] = await Promise.all([json('content/catalogue.json'), json('assets/reader/index.json'), json('assets/pdf/index.json'), json('assets/planets/manifest.json')]);
        lessons = {};
        await Promise.all(data.modules.filter(m => m.lesson).map(async (m) => { lessons[m.id] = await json(m.lesson); }));
        lessons.gaia = await json('content/gaia.json');
        questions = (await json('content/quizzes/math-c08.json')).questions;
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
                worker = new Worker(new URL('./scene/worker.js', location.href), { type: 'module' });
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
        window.GAIA = { version: '1.4.0', state: S, get catalogue() { return data; }, get buttons() { return U?.buttons || []; }, get store() { return store; }, get world() { return W; }, get renderer() { return R; }, route, openTheory, openPDF, computeLab, enterSystem, enterPlanet, backToParent, diagnostics() { const gl = R.gl, ext = gl.getExtension('WEBGL_debug_renderer_info'); return { webgl: gl.getParameter(gl.VERSION), renderer: ext ? gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER), starsGenerated: R.starCount, starsDrawn: R.frameStats.stars, starDrawCalls:R.frameStats.starDrawCalls, navigableSystems:W.systems.length, systemStarIndices:W.systems.map(s=>s.starIndex), activeSystem:S.system, cosmicRegion:W.cosmos?.systems[S.system]?.region, cosmicVolumes:R.frameStats.cosmicVolumes||0, volumeSteps:R.frameStats.volumeSteps||0, cameraProgress:W.cameraProgress, biome: W.biome, sceneTriangles: W.surface.meshes.reduce((n,m)=>n+m.indexCount/3,0), planets: data.modules.length, mathModules: data.modules.filter(m => m.sector === 0).length, planned: data.modules.filter(m => m.status === 'planned').length, lessonSections: Object.values(lessons).reduce((a, l) => a + l.sections.length, 0), questions: questions.length, sourcePages: pdfIndex.length, terrainCells: W.terrain.height.size, webglError: gl.getError(), textureErrors: [...cache.errors,...W.planetTextures.errors], planetCounts:W.systems.map(s=>s.count),totalPlanetBodies:W.systems.reduce((n,s)=>n+s.count,0),explorablePlanets:100, persistent: store.persistent, allVisiblePixelsWebGL: true, graphicsBackend: 'WebGL 2 (API browser, non OpenGL desktop)', timeUnit: 'tempo del modello', frameCount }; }, saveScenario, exportLab };
        U = new UI(R);
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
        failure('GAIA richiede WebGL 2 e le risorse locali della repository. ' + e.message);
    }
}
init();

Object.assign(exports,{});
},
"src/scene/systems.js":(exports,__require)=>{
const { PLANET_TYPES }=__require("src/scene/planet-types.js");
const MIN_STARS = 1000000;
const SYSTEM_COUNT = 25;
const SYSTEM_SCALE = .0025;
const systemForPlanet = index => Math.max(0, Math.min(99, Math.floor(index))) % SYSTEM_COUNT;
const indicesForSystem = index => [0, 1, 2, 3].map(sector => sector * SYSTEM_COUNT + index);

const SYSTEM_SEED = 0x47414941;
const architectureCache=new Map();
function seededRandom(seed) { let a=seed>>>0;return ()=>{a+=0x6D2B79F5;let t=a;t=Math.imul(t^t>>>15,t|1);t^=t+Math.imul(t^t>>>7,t|61);return ((t^t>>>14)>>>0)/4294967296;}; }
function shuffled(values,rng){const a=[...values];for(let i=a.length-1;i>0;i--){const j=Math.floor(rng()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
function systemArchitecture(id,seed=SYSTEM_SEED){
 const key=seed+':'+id;if(architectureCache.has(key))return architectureCache.get(key);
 const rng=seededRandom(seed^Math.imul(id+1,0x9E3779B1)),count=5+Math.floor(rng()*8),starRadius=.65+rng()*.65;
 const slots=shuffled(Array.from({length:count},(_,i)=>i),rng).slice(0,4).sort((a,b)=>a-b);
 const solid=shuffled(['terrestrial','oceanic','desert','barren','arctic','volcanic'],rng);
 // Keep the established landing biomes of the introductory lessons.
 const anchor={1:'oceanic',2:'desert',3:'volcanic',7:'terrestrial'}[id];
 if(anchor){solid.splice(solid.indexOf(anchor),1);solid.unshift(anchor);}
 let orbit=2.25+starRadius,bodies=[];
 const extras=['gas','ringed','icegiant','rocky','arctic','volcanic','acid','desert'];let extraIndex=0;
 for(let slot=0;slot<count;slot++){
  const sector=slots.indexOf(slot),explorable=sector>=0,type=explorable?solid[sector]:extras[(id+extraIndex++)%extras.length],profile=PLANET_TYPES[type];
  const radius=profile.solid?.30+rng()*.25:.62+rng()*.29;
  orbit+=radius+(bodies.at(-1)?.radius||.2)+.55+rng()*.6;
  const phase=rng()*Math.PI*2,tilt=(rng()-.5)*.9,inclination=(rng()-.5)*.24,eccentricity=rng()*.012;
  bodies.push({id:'s'+id+'-p'+slot,slot,system:id,index:explorable?id+sector*SYSTEM_COUNT:null,sector,explorable,type,profile,
   orbit,radius,phase,tilt,inclination,eccentricity,node:rng()*Math.PI*2,speed:(.16+rng()*.03)/Math.pow(orbit,1.18),spin:(rng()<.15?-1:1)*(.016+rng()*.04),rotation:rng()*Math.PI*2,
   moons:Math.floor(rng()*(profile.solid?3:5)),rings:type==='ringed'||(!profile.solid&&rng()<.25)});
 }
 const result={id,seed,count,bodies,starRadius,outerRadius:orbit+bodies.at(-1).radius*2,architecture:count>=10?'Affollato':count<=6?'Rado':bodies.some(p=>Math.abs(p.inclination)>.1)?'Inclinato':'Misto'};
 architectureCache.set(key,result);return result;
}
function bodyAtTime(body,time=0){
 const mean=body.phase+time*body.speed;let eccentric=mean;
 for(let i=0;i<3;i++)eccentric-=(eccentric-body.eccentricity*Math.sin(eccentric)-mean)/(1-body.eccentricity*Math.cos(eccentric));
 const x=body.orbit*(Math.cos(eccentric)-body.eccentricity),z=body.orbit*Math.sqrt(1-body.eccentricity**2)*Math.sin(eccentric),c=Math.cos(body.node),s=Math.sin(body.node),zz=z*Math.cos(body.inclination);
 return {...body,position:[x*c-zz*s,z*Math.sin(body.inclination),x*s+zz*c]};
}

// Choose stars that already exist in the million-point buffer. No extra marker stars.
function buildSystems(stars, modules) {
    if (stars.length < MIN_STARS * 7) throw Error('La galassia richiede almeno 1.000.000 di stelle');
    const used = new Set(), systems = [];
    for (let id = 0; id < SYSTEM_COUNT; id++) {
        const angle = id * Math.PI * (3 - Math.sqrt(5)), radius = 11 + (id % 4) * 4.5;
        const target = [Math.cos(angle) * radius, Math.sin(id * 1.7) * .8, Math.sin(angle) * radius];
        let best = -1, score = Infinity;
        for (let index = 11; index < stars.length / 7; index += 19) {
            if (used.has(index)) continue;
            const j = index * 7, x = stars[j], y = stars[j + 1], z = stars[j + 2];
            if (Math.abs(y) > 2) continue;
            const distance = (x-target[0])**2 + (y-target[1])**2*2 + (z-target[2])**2;
            if (distance < score && systems.every(s => (x-s.position[0])**2 + (z-s.position[2])**2 > 15)) { score = distance; best = index; }
        }
        if (best < 0) throw Error('Impossibile associare un sistema a una stella');
        used.add(best); const j = best * 7, planets = indicesForSystem(id), topic = modules?.[id]?.title || 'Percorso ' + (id + 1);
        const layout=systemArchitecture(id);
        systems.push({...layout,id, starIndex:best, name:'ECHO ' + String(id+1).padStart(2,'0'), position:Array.from(stars.slice(j,j+3)), color:Array.from(stars.slice(j+3,j+6)), planets,
            description:layout.count+' pianeti, quattro esplorabili. '+topic+': matematica, fisica, chimica e biologia.',
            available:planets.filter(i => modules?.[i]?.status !== 'planned').length});
    }
    return systems;
}
function highlightSystemStars(stars, systems) {
    for (const s of systems) stars[s.starIndex * 7 + 6] = 11;
    return stars;
}
function systemPlanet(index, time = 0) {
    const body=systemArchitecture(systemForPlanet(index)).bodies.find(p=>p.index===index);
    if(!body)throw Error('Pianeta esplorabile non trovato: '+index);
    return bodyAtTime(body,time);
}

function pickProjected(projections,x,y) {
    return projections.filter(p => p.depth > 0 && Math.hypot(p.x-x,p.y-y) <= p.r)
        .sort((a,b) => (Math.hypot(a.x-x,a.y-y)/a.r - Math.hypot(b.x-x,b.y-y)/b.r) || a.depth-b.depth)[0] || null;
}

class HoverTarget {
    constructor(delay = 130) { this.delay = delay; this.clear(); }
    clear() { this.candidate = null; this.current = null; this.since = 0; }
    update(hit, now, blocked = false) {
        if (blocked || !hit) { this.clear(); return null; }
        const key = hit.type + ':' + hit.index;
        if (this.candidate !== key) { this.candidate = key; this.since = now; this.current = null; }
        if (now-this.since >= this.delay) this.current = hit;
        return this.current;
    }
}

Object.assign(exports,{MIN_STARS,SYSTEM_COUNT,SYSTEM_SCALE,systemForPlanet,indicesForSystem,SYSTEM_SEED,seededRandom,systemArchitecture,bodyAtTime,buildSystems,highlightSystemStars,systemPlanet,pickProjected,HoverTarget});
},
"src/scene/planet-types.js":(exports,__require)=>{
// Visual families inspired by Haegemonia; source maps are external NASA products.
// These are fictional worlds using Solar System analogues, not surveyed exoplanets.
const PLANET_TYPES = Object.freeze({
    terrestrial:{name:'Terrestre',texture:'earth',biome:'simbiosi',kind:1,atmosphere:[.11,.36,.81],clouds:true,ocean:true,solid:true},
    oceanic:{name:'Oceanico',texture:'earth-winter',biome:'marea',kind:2,atmosphere:[.10,.36,.78],clouds:true,ocean:true,solid:true},
    desert:{name:'Desertico',texture:'mars',biome:'esodo',kind:3,atmosphere:[.42,.24,.11],solid:true},
    rocky:{name:'Roccioso',texture:'mercury',biome:'esodo',kind:3,solid:true},
    barren:{name:'Craterizzato',texture:'moon',biome:'esodo',kind:3,solid:true},
    arctic:{name:'Glaciale',texture:'europa',biome:'marea',kind:2,solid:true},
    volcanic:{name:'Vulcanico',texture:'io',biome:'esodo',kind:4,solid:true},
    acid:{name:'Atmosfera acida',texture:'venus',biome:'esodo',kind:3,atmosphere:[.65,.40,.15],solid:true},
    gas:{name:'Gigante gassoso',texture:'jupiter',biome:null,kind:0,atmosphere:[.35,.28,.20],solid:false},
    ringed:{name:'Gigante con anelli',texture:'saturn',biome:null,kind:0,atmosphere:[.45,.37,.22],solid:false},
    icegiant:{name:'Gigante ghiacciato',texture:'neptune',biome:null,kind:0,atmosphere:[.08,.20,.68],solid:false}
});

Object.assign(exports,{PLANET_TYPES});
},
"src/scene/navigation.js":(exports,__require)=>{
const { systemForPlanet }=__require("src/scene/systems.js");
const defaults = scene => scene === 'galaxy' ? {yaw:0,pitch:.45,distance:60,sector:-1} : scene === 'system' ? {yaw:0,pitch:.48,distance:34} : scene === 'orbit' ? {yaw:0,pitch:.45,distance:22} : {yaw:0,pitch:.45,distance:60};
function viewKey(scene,s) { return scene==='system' ? 'system:'+s.system : ['orbit','surface'].includes(scene) ? scene+':'+s.selected : scene; }
class NavigationMemory {
    constructor() { this.views = new Map(); }
    move(s,scene,extra={}) {
        const beforeKey=viewKey(s.scene,s), next={...s,...extra,scene};
        next.system=scene==='system' && extra.system!==undefined ? Math.max(0,Math.min(24,Math.floor(extra.system))) : systemForPlanet(next.selected);
        if(scene==='system' && systemForPlanet(next.selected)!==next.system)next.selected=next.system+(next.sector>=0?next.sector:0)*25;
        const nextKey=viewKey(scene,next);
        if(beforeKey!==nextKey){
            this.views.set(beforeKey,{yaw:s.yaw,pitch:s.pitch,distance:s.distance,...(s.scene==='galaxy'?{sector:s.sector}: {})});
            Object.assign(next,defaults(scene),this.views.get(nextKey)||{});
        }
        Object.assign(s,next);
        return {from:beforeKey,to:nextKey};
    }
}

Object.assign(exports,{viewKey,NavigationMemory});
},
"src/scene/assets.js":(exports,__require)=>{
const { systemPlanet }=__require("src/scene/systems.js");
// Binary scene resources are shipped locally. Runtime never fetches a CDN.
function planetProfile(index) {
    const body=systemPlanet(index);return {...body.profile,seed:index*.731+2.7,type:body.type};
}
class PlanetTextures {
    constructor(gpu,manifest,base,loadImage){this.gpu=gpu;this.manifest=manifest;this.base=base;this.loadImage=loadImage;this.high=new Map();this.pending=new Set();this.failed=new Set();this.errors=[];this.limit=gpu.gl.getParameter(gpu.gl.MAX_TEXTURE_SIZE);}
    get(id,detailed=false){
        if(!detailed)return this.base[id];
        if(this.high.has(id)){const t=this.high.get(id);this.high.delete(id);this.high.set(id,t);return t;}
        const item=this.manifest.find(m=>m.id===id),level=item?.levels?.filter(l=>Math.max(l.width,l.height)<=this.limit).at(-1);
        if(level&&level.path!==item.path&&!this.pending.has(id)&&!this.failed.has(id)){
            this.pending.add(id);
            this.loadImage(level.path).then(img=>{
                const texture=this.gpu.uploadTexture(img);this.high.set(id,texture);
                while(this.high.size>2){const oldest=this.high.keys().next().value;this.gpu.gl.deleteTexture(this.high.get(oldest));this.high.delete(oldest);}
            }).catch(e=>{this.failed.add(id);this.errors.push(id+': '+e.message);}).finally(()=>this.pending.delete(id));
        }
        return this.base[id];
    }
}
async function loadScenes(gpu, manifest, resolveAsset = p => p, progress = () => {}) {
    const biomes = Object.values(manifest.biomes);
    let completed = 0, total = biomes.reduce((n,b) => n + b.meshes.length, 0);
    // Sequential mesh pairs bound temporary memory while uploading large scenes.
    for (const biome of biomes) {
        if (biome.grid.cells.length !== 875 || biome.stations.length !== 4) throw Error('Metadati della scena non validi');
        for (const item of biome.meshes) {
            const buffers = await Promise.all([item.vertices, item.indices].map(async path => {
                const response = await fetch(resolveAsset(path));
                if (!response.ok) throw Error('Geometria mancante: ' + path);
                return response.arrayBuffer();
            }));
            if (buffers[0].byteLength !== item.vertexCount * 64 || buffers[1].byteLength !== item.indexCount * 4) throw Error('Geometria incompleta: ' + item.id);
            gpu.makeMesh(item.id, { v: new Float32Array(buffers[0]), i: new Uint32Array(buffers[1]), stride: 16 });
            progress(++completed / total);
        }
    }
    return manifest.biomes;
}

Object.assign(exports,{planetProfile,PlanetTextures,loadScenes});
},
"src/routing.js":(exports,__require)=>{
const { systemForPlanet }=__require("src/scene/systems.js");
/** Resolve current and previous-edition deep links without trusting URL numbers. */
function resolveRoute(hash, modules, lessonIds) {
    const [path = '', query = ''] = String(hash).replace(/^#\/?/, '').split('?');
    const parts = path.split('/');
    const q = new URLSearchParams(query);
    const aliases = { study: 'theory', planet: 'orbit', archive: 'catalogue', notebook: 'journal' };
    const allowed = ['galaxy', 'system', 'orbit', 'surface', 'research', 'catalogue', 'briefing', 'theory', 'pdf', 'lab', 'quiz', 'journal', 'sources'];
    const name = aliases[parts[0]] || parts[0];
    let scene = allowed.includes(name) ? name : 'galaxy';
    const moduleId = q.get('unit') || (['study', 'planet', 'briefing'].includes(parts[0]) ? parts[1] : null);
    let selected = Math.max(0, modules.findIndex(m => m.id === (moduleId || 'math-c08')));
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
    let pdfPage = integer('page', 245, 1, 769);
    if (scene === 'theory' && !lessonIds.includes(reader)) {
        const target = modules.find(m => m.id === reader) || unit;
        if (target.source) {
            scene = 'pdf';
            pdfPage = target.source.pdfPages[0];
        }
        else
            scene = 'briefing';
        reader = 'math-c08';
    }
    let system=systemForPlanet(selected);
    if(scene==='system' && q.has('system')){system=integer('system',system,0,24);if(systemForPlanet(selected)!==system)selected=system;}
    return { scene, selected, system, reader, section: integer('section', 0, 0, 100), pdfPage, lab };
}

Object.assign(exports,{resolveRoute});
},
"src/renderer.js":(exports,__require)=>{
const { COSMIC_QUALITY, orderedVolumes }=__require("src/scene/cosmos.js");
const { starExtinction }=__require("src/scene/cosmic-shader.js");
const { vsMesh, fsMesh, vsFullscreen, fsEnvironment, vsShadow, fsShadow, fsPost, fsCopy }=__require("src/scene/shaders.js");
// GAIA · WebGL 2 renderer. No CSS background images, SVG or Canvas2D drawing.
const TAU = Math.PI * 2;
const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
const mix = (a, b, t) => a + (b - a) * t;
const smooth = (a, b, x) => { let t = clamp((x - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); };
function color(hex, a = 1) {
    let v = hex.replace('#', '');
    if (v.length === 3)
        v = v.split('').map(x => x + x).join('');
    return [parseInt(v.slice(0, 2), 16) / 255, parseInt(v.slice(2, 4), 16) / 255, parseInt(v.slice(4, 6), 16) / 255, a];
}
const mul = (a, b) => {
    const o = new Float32Array(16);
    for (let c = 0; c < 4; c++)
        for (let r = 0; r < 4; r++)
            for (let k = 0; k < 4; k++)
                o[c * 4 + r] += a[k * 4 + r] * b[c * 4 + k];
    return o;
};
function perspective(fov, ar, near, far) { let f = 1 / Math.tan(fov / 2), o = new Float32Array(16); o[0] = f / ar; o[5] = f; o[10] = (far + near) / (near - far); o[11] = -1; o[14] = 2 * far * near / (near - far); return o; }
const norm = v => { let l = Math.hypot(...v) || 1; return v.map(x => x / l); };
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const dot = (a, b) => a.reduce((s, x, i) => s + x * b[i], 0);
function lookAt(eye, center, up = [0, 1, 0]) { let z = norm(eye.map((x, i) => x - center[i])), x = norm(cross(up, z)), y = cross(z, x); return new Float32Array([x[0], y[0], z[0], 0, x[1], y[1], z[1], 0, x[2], y[2], z[2], 0, -dot(x, eye), -dot(y, eye), -dot(z, eye), 1]); }
function transform(x = 0, y = 0, z = 0, s = 1, ry = 0, rx = 0) { let a = Math.cos(ry), b = Math.sin(ry), c = Math.cos(rx), d = Math.sin(rx); return new Float32Array([s * a, s * b * d, -s * b * c, 0, 0, s * c, s * d, 0, s * b, -s * a * d, s * a * c, 0, x, y, z, 1]); }
function project(point, vp, w, h) { let x = point[0], y = point[1], z = point[2]; let q = [vp[0] * x + vp[4] * y + vp[8] * z + vp[12], vp[1] * x + vp[5] * y + vp[9] * z + vp[13], vp[2] * x + vp[6] * y + vp[10] * z + vp[14], vp[3] * x + vp[7] * y + vp[11] * z + vp[15]]; return [(q[0] / q[3] + 1) * w / 2, (1 - q[1] / q[3]) * h / 2, q[3]]; }
function shader(gl, kind, src) {
    let s = gl.createShader(kind);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS))
        throw Error('Shader: ' + gl.getShaderInfoLog(s));
    return s;
}
function program(gl, vs, fs) {
    let p = gl.createProgram(), v = shader(gl, gl.VERTEX_SHADER, vs), f = shader(gl, gl.FRAGMENT_SHADER, fs);
    gl.attachShader(p, v);
    gl.attachShader(p, f);
    gl.linkProgram(p);
    if (!gl.getProgramParameter(p, gl.LINK_STATUS))
        throw Error('Link: ' + gl.getProgramInfoLog(p));
    gl.deleteShader(v);
    gl.deleteShader(f);
    return p;
}
function mesh(verts, ind) { return { v: new Float32Array(verts), i: new Uint32Array(ind) }; }
const emit = (v, x, y, z, nx, ny, nz, u, vv, c) => v.push(x, y, z, nx, ny, nz, u, vv, ...c);
function sphereMesh(U = 32, V = 20) {
    let v = [], ix = [];
    for (let j = 0; j <= V; j++) {
        let theta = j * Math.PI / V;
        for (let i = 0; i <= U; i++) {
            let phi = i * TAU / U, p = [Math.cos(phi) * Math.sin(theta), Math.cos(theta), Math.sin(phi) * Math.sin(theta)];
            emit(v, ...p, ...p, 1 - i / U, j / V, [1, 1, 1, 1]);
        }
    }
    for (let j = 0; j < V; j++)
        for (let i = 0; i < U; i++) {
            let a = j * (U + 1) + i, b = a + U + 1;
            ix.push(a, b, a + 1, b, b + 1, a + 1);
        }
    return mesh(v, ix);
}
function prismHexWorld(cols = 35, rows = 25, seed = 37) {
    let v = [], ix = [], N = 0, topHeight = new Map();
    const rand = (x, y) => { let t = Math.sin((x + seed) * 12.9898 + (y - seed) * 78.233) * 43758.5453; return t - Math.floor(t); };
    const height = (x, y) => { let p = Math.sin(x * .32) * Math.cos(y * .23) + .55 * Math.sin(x * .9 + y * .34) + .37 * Math.cos(y * .55 - x * .3); return -0.1 + Math.max(-.45, p * .42); };
    const dx = 1.12, dz = .97, R = .62;
    for (let z = 0; z < rows; z++)
        for (let x = 0; x < cols; x++) {
            let cx = (x - cols / 2 + (z % 2) * .5) * dx, cz = (z - rows / 2) * dz, h = height(x, z), wet = h < -.03, peak = h > .42;
            let veg = rand(x, z), water = [.065, .29, .40, 1], shallow = [.14, .39, .48, 1], land = [.19 + .12 * veg, .41 + .21 * veg, .32 + .07 * veg, 1], sand = [.62, .53, .38, 1], rock = [.49, .48, .46, 1], c = wet ? (h < -.35 ? water : shallow) : peak ? rock : (h < .08 ? sand : land);
            let corners = [];
            for (let a = 0; a < 6; a++) {
                let t = (a * 60 + 30) * Math.PI / 180;
                corners.push([cx + R * Math.cos(t), h, cz + R * Math.sin(t)]);
            }
            let center = v.length / 12;
            emit(v, cx, h, cz, 0, 1, 0, 0, 0, c);
            for (let a = 0; a < 6; a++)
                emit(v, ...corners[a], 0, 1, 0, 0, 0, c);
            for (let a = 0; a < 6; a++)
                ix.push(center, center + 1 + a, center + 1 + (a + 1) % 6);
            // Walls are genuine vertical faces; edges give the world real thickness.
            for (let a = 0; a < 6; a++) {
                let p = corners[a], q = corners[(a + 1) % 6], mid = (h - .5) / 2;
                let nor = norm([(p[2] - q[2]), 0, q[0] - p[0]]);
                let cc = [c[0] * .45, c[1] * .5, c[2] * .52, 1];
                let start = v.length / 12;
                emit(v, p[0], h, p[2], ...nor, 0, 0, cc);
                emit(v, q[0], h, q[2], ...nor, 0, 0, cc);
                emit(v, p[0], h - .46, p[2], ...nor, 0, 0, cc);
                emit(v, q[0], h - .46, q[2], ...nor, 0, 0, cc);
                ix.push(start, start + 2, start + 1, start + 1, start + 2, start + 3);
            }
            topHeight.set(`${x},${z}`, { x: cx, y: h, z: cz, wet, veg });
        }
    return { geometry: mesh(v, ix), height: topHeight };
}
function coneMesh(n = 7) {
    let v = [], ix = [];
    const c = [.21, .46, .34, 1];
    for (let i = 0; i < n; i++) {
        let a = i * TAU / n, b = (i + 1) * TAU / n;
        let p = [Math.cos(a), 0, Math.sin(a)], q = [Math.cos(b), 0, Math.sin(b)], normal = norm([p[0] + q[0], .8, p[2] + q[2]]), o = v.length / 12;
        emit(v, ...p, ...normal, 0, 0, c);
        emit(v, ...q, ...normal, 0, 0, c);
        emit(v, 0, 1.8, 0, ...normal, 0, 0, [.32, .66, .44, 1]);
        ix.push(o, o + 1, o + 2);
    }
    return mesh(v, ix);
}
function daisyDiskMesh(petals = 7) {
    let v = [], ix = [], center = [0, .06, 0], r = .48;
    for (let i = 0; i < petals; i++) {
        let a = TAU * i / petals;
        let off = v.length / 12, p = [Math.cos(a) * .32, .065, Math.sin(a) * .32], q = [Math.cos(a + .2) * r, .06, Math.sin(a + .2) * r], t = [Math.cos(a - .2) * r, .06, Math.sin(a - .2) * r];
        let c = [1, 1, 1, 1];
        emit(v, ...center, 0, 1, 0, 0, 0, c);
        emit(v, ...q, 0, 1, 0, 0, 0, c);
        emit(v, ...t, 0, 1, 0, 0, 0, c);
        ix.push(off, off + 1, off + 2);
    }
    return mesh(v, ix);
}
const vsStars = `#version 300 es
layout(location=0) in vec3 aPos;layout(location=1) in vec3 aRGB;layout(location=2) in float aSize;
uniform mat4 uVP;uniform float uPixels,uTime;uniform int uHoverStar;out vec3 vRGB;out float vAlpha;
${starExtinction}
void main(){vec4 p=uVP*vec4(aPos,1.);gl_Position=p;gl_PointSize=clamp(aSize*(gl_VertexID==uHoverStar?1.5:1.)*uPixels/max(8.,p.w),.6,aSize>3.?14.:9.);vRGB=aRGB*(gl_VertexID==uHoverStar?1.6:aSize>3.?1.25:1.);vAlpha=extinction(aPos);}`;
const fsStars = `#version 300 es
precision mediump float;in vec3 vRGB;in float vAlpha;uniform float uGain;out vec4 outColor;
void main(){float r=length(gl_PointCoord-.5)*2.;if(r>1.)discard;float h=exp(-r*r*4.8);outColor=vec4(vRGB,vAlpha*h*.13*uGain);}`;
const vsUI = `#version 300 es
layout(location=0) in vec2 aPos;layout(location=1) in vec2 aUV;layout(location=2) in vec4 aCol;layout(location=3) in float aMode;
uniform vec2 uRes;out vec2 vUV;out vec4 vCol;out float vMode;
void main(){gl_Position=vec4(aPos.x/uRes.x*2.-1.,1.-aPos.y/uRes.y*2.,0.,1.);vUV=aUV;vCol=aCol;vMode=aMode;}`;
const fsUI = `#version 300 es
precision highp float;in vec2 vUV;in vec4 vCol;in float vMode;uniform sampler2D uFont;out vec4 outColor;
void main(){vec4 tex=texture(uFont,vUV);if(vMode>1.5){vec3 rgb=vMode>2.5?vec3(1.)-tex.rgb:tex.rgb;outColor=vec4(rgb*vCol.rgb,tex.a*vCol.a);}else{float a=vMode>.5?tex.r:1.;outColor=vec4(vCol.rgb,vCol.a*a);}}`;
class GPU {
    constructor(canvas) {
        this.canvas = canvas;
        this.gl = canvas.getContext('webgl2', { alpha: false, antialias: true, preserveDrawingBuffer: true, depth: true, stencil: false, powerPreference: 'high-performance' });
        if (!this.gl)
            throw new Error('WebGL 2 non disponibile: non è disponibile un renderer alternativo.');
        let gl = this.gl;
        this.versions = { gl: gl.getParameter(gl.VERSION), glsl: gl.getParameter(gl.SHADING_LANGUAGE_VERSION), renderer: gl.getParameter(gl.RENDERER) };
        this.pMesh = program(gl, vsMesh, fsMesh);
        this.pStars = program(gl, vsStars, fsStars);
        this.pUI = program(gl, vsUI, fsUI);
        this.pEnvironment = program(gl, vsFullscreen, fsEnvironment);
        this.pPost = program(gl, vsFullscreen, fsPost);
        this.pCopy = program(gl, vsFullscreen, fsCopy);
        this.pShadow = program(gl, vsShadow, fsShadow);
        this.locations = new Map();
        this.fullscreenVao = gl.createVertexArray();
        this.lightVP = transform();
        this.reflectionVP = transform();
        this.shadowKey = null;
        this.surfaceLight = [-.643102,.7243,.248615];
        this.fogColor = [.33,.40,.37];
        this.fogDensity = 0;
        this.mist = false;
        this.meshes = new Map();
        this.uiData = [];
        this.atlas = null;
        this.metrics = null;
        this.time = 0;
        this.sceneQuality = 'high';
        this.frameStats = {stars:0,starDrawCalls:0};
        this.meshVao = gl.createVertexArray();
        this.starVao = gl.createVertexArray();
        this.uiVao = gl.createVertexArray();
        this.uiBuffer = gl.createBuffer();
        this._make1px();
        this.w = 1600;
        this.h = 900;
    }
    _make1px() { let gl = this.gl; this.blank = gl.createTexture(); gl.bindTexture(gl.TEXTURE_2D, this.blank); gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([255, 255, 255, 255])); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR); }
    uploadTexture(img) { let gl = this.gl, t = gl.createTexture(); gl.bindTexture(gl.TEXTURE_2D, t); gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false); gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR); gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE); gl.generateMipmap(gl.TEXTURE_2D); return t; }
    setFontAtlas(img, metrics) { let gl = this.gl; this.metrics = metrics; this.atlas = gl.createTexture(); gl.bindTexture(gl.TEXTURE_2D, this.atlas); gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false); gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE); }
    deleteMesh(id) {
        const m = this.meshes.get(id);
        if (m) {
            this.gl.deleteVertexArray(m.vao);
            this.gl.deleteBuffer(m.vertexBuffer);
            this.gl.deleteBuffer(m.indexBuffer);
            this.meshes.delete(id);
        }
    }
    makeMesh(id, data) {
        let gl = this.gl, vao = gl.createVertexArray();
        gl.bindVertexArray(vao);
        let b = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, b);
        gl.bufferData(gl.ARRAY_BUFFER, data.v, gl.STATIC_DRAW);
        let ib = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ib);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, data.i, gl.STATIC_DRAW);
        for (let [i, size, offset] of [[0, 3, 0], [1, 3, 12], [2, 2, 24], [3, 4, 32]]) {
            gl.enableVertexAttribArray(i);
            gl.vertexAttribPointer(i, size, gl.FLOAT, false, (data.stride || 12) * 4, offset);
        }
        if (data.stride === 16) {
            gl.enableVertexAttribArray(4);
            gl.vertexAttribPointer(4, 4, gl.FLOAT, false, 64, 48);
        }
        if (this.meshes.has(id))
            this.deleteMesh(id);
        this.meshes.set(id, { vao, vertexBuffer: b, indexBuffer: ib, count: data.i.length, stride: data.stride || 12 });
        return id;
    }
    makeStars(data, background = false) {
        let gl = this.gl;
        if (background && !this.backgroundVao) this.backgroundVao = gl.createVertexArray();
        gl.bindVertexArray(background ? this.backgroundVao : this.starVao);
        let b = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, b);
        gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
        for (let [i, n, off] of [[0, 3, 0], [1, 3, 12], [2, 1, 24]]) {
            gl.enableVertexAttribArray(i);
            gl.vertexAttribPointer(i, n, gl.FLOAT, false, 28, off);
        }
        if (background) { this.backgroundCount = data.length / 7; this.backgroundBuffer = b; }
        else { this.starCount = data.length / 7; this.starBuffer = b; }
    }
    resize() {
        let w = this.canvas.clientWidth, h = this.canvas.clientHeight, dpr = Math.min(window.devicePixelRatio || 1, 1.4);
        let W = Math.round(w * dpr), H = Math.round(h * dpr);
        if (this.canvas.width !== W || this.canvas.height !== H) {
            this.canvas.width = W;
            this.canvas.height = H;
        }
        this.w = w;
        this.h = h;
        this.dpr = dpr;
        this.gl.viewport(0, 0, W, H);
    }
    uniform(p, name) {
        let map = this.locations.get(p);
        if (!map) this.locations.set(p, map = new Map());
        if (!map.has(name)) map.set(name, this.gl.getUniformLocation(p, name));
        return map.get(name);
    }
    createTargets() {
        const g = this.gl, scale = this.sceneQuality === 'low' ? .6 : this.sceneQuality === 'balanced' ? .8 : 1, w = Math.max(1,Math.round(this.canvas.width*scale)), h = Math.max(1,Math.round(this.canvas.height*scale));
        this.sceneScale=scale;
        if (this.sceneWidth === w && this.sceneHeight === h) return;
        if (this.sceneFbo) { g.deleteFramebuffer(this.sceneFbo); g.deleteTexture(this.sceneColor); g.deleteRenderbuffer(this.sceneDepth); }
        this.sceneWidth = w; this.sceneHeight = h;
        this.sceneFbo = g.createFramebuffer(); g.bindFramebuffer(g.FRAMEBUFFER, this.sceneFbo);
        this.sceneColor = g.createTexture(); g.bindTexture(g.TEXTURE_2D, this.sceneColor);
        g.texImage2D(g.TEXTURE_2D, 0, g.RGBA8, w, h, 0, g.RGBA, g.UNSIGNED_BYTE, null);
        g.texParameteri(g.TEXTURE_2D, g.TEXTURE_MIN_FILTER, g.LINEAR); g.texParameteri(g.TEXTURE_2D, g.TEXTURE_MAG_FILTER, g.LINEAR);
        g.texParameteri(g.TEXTURE_2D, g.TEXTURE_WRAP_S, g.CLAMP_TO_EDGE); g.texParameteri(g.TEXTURE_2D, g.TEXTURE_WRAP_T, g.CLAMP_TO_EDGE);
        g.framebufferTexture2D(g.FRAMEBUFFER, g.COLOR_ATTACHMENT0, g.TEXTURE_2D, this.sceneColor, 0);
        this.sceneDepth = g.createRenderbuffer(); g.bindRenderbuffer(g.RENDERBUFFER, this.sceneDepth);
        g.renderbufferStorage(g.RENDERBUFFER, g.DEPTH_COMPONENT24, w, h);
        g.framebufferRenderbuffer(g.FRAMEBUFFER, g.DEPTH_ATTACHMENT, g.RENDERBUFFER, this.sceneDepth);
        if (g.checkFramebufferStatus(g.FRAMEBUFFER) !== g.FRAMEBUFFER_COMPLETE) throw Error('Framebuffer della scena incompleto');
        g.bindFramebuffer(g.FRAMEBUFFER, null);
    }
    begin() {
        this.resize(); this.createTargets(); const g = this.gl;
        g.bindFramebuffer(g.FRAMEBUFFER, this.sceneFbo); g.viewport(0, 0, this.sceneWidth, this.sceneHeight);
        g.depthMask(true); g.clearColor(.004,.012,.024,1); g.clear(g.COLOR_BUFFER_BIT | g.DEPTH_BUFFER_BIT);
        g.enable(g.DEPTH_TEST); g.disable(g.BLEND); this.uiData.length = 0; this.resolved = false; this.frameStats={stars:0,starDrawCalls:0};
    }
    resolveScene() {
        if (this.resolved) return;
        const g = this.gl, p = this.pPost;
        g.bindFramebuffer(g.FRAMEBUFFER, null); g.viewport(0,0,this.canvas.width,this.canvas.height);
        g.disable(g.DEPTH_TEST); g.disable(g.BLEND); g.useProgram(p); g.bindVertexArray(this.fullscreenVao);
        g.activeTexture(g.TEXTURE0); g.bindTexture(g.TEXTURE_2D,this.sceneColor);
        g.uniform1i(this.uniform(p,'uScene'),0); g.uniform2f(this.uniform(p,'uPixel'),1/this.sceneWidth,1/this.sceneHeight);g.uniform1f(this.uniform(p,'uBloom'),this.sceneQuality==='low'?0:1);
        g.drawArrays(g.TRIANGLES,0,3); this.resolved = true;
    }
    drawEnvironment(mode, eye, target, fov, light = [-.6,.7,.3], fogColor = [.33,.4,.37], exposure = 1) {
        const g=this.gl,p=this.pEnvironment,forward=norm(target.map((x,i)=>x-eye[i])),right=norm(cross(forward,[0,1,0])),up=cross(right,forward);
        const quality=COSMIC_QUALITY[this.sceneQuality]||COSMIC_QUALITY.high,cosmic=mode===1&&this.cosmos;
        this.cosmicEye=eye;
        if(cosmic){
            const w=Math.max(1,Math.round(this.sceneWidth*quality.scale)),h=Math.max(1,Math.round(this.sceneHeight*quality.scale));
            if(this.cosmicWidth!==w||this.cosmicHeight!==h){
                if(this.cosmicFbo){g.deleteFramebuffer(this.cosmicFbo);g.deleteTexture(this.cosmicColor);}
                this.cosmicWidth=w;this.cosmicHeight=h;
                this.cosmicFbo=g.createFramebuffer();g.bindFramebuffer(g.FRAMEBUFFER,this.cosmicFbo);
                this.cosmicColor=g.createTexture();g.bindTexture(g.TEXTURE_2D,this.cosmicColor);g.texImage2D(g.TEXTURE_2D,0,g.RGBA8,w,h,0,g.RGBA,g.UNSIGNED_BYTE,null);
                for(const [key,value] of [[g.TEXTURE_MIN_FILTER,g.LINEAR],[g.TEXTURE_MAG_FILTER,g.LINEAR],[g.TEXTURE_WRAP_S,g.CLAMP_TO_EDGE],[g.TEXTURE_WRAP_T,g.CLAMP_TO_EDGE]])g.texParameteri(g.TEXTURE_2D,key,value);
                g.framebufferTexture2D(g.FRAMEBUFFER,g.COLOR_ATTACHMENT0,g.TEXTURE_2D,this.cosmicColor,0);
                if(g.checkFramebufferStatus(g.FRAMEBUFFER)!==g.FRAMEBUFFER_COMPLETE)throw Error('Framebuffer cosmico incompleto');
            }
            g.bindFramebuffer(g.FRAMEBUFFER,this.cosmicFbo);g.viewport(0,0,w,h);
        }
        g.disable(g.DEPTH_TEST);g.depthMask(false);g.disable(g.BLEND);g.useProgram(p);g.bindVertexArray(this.fullscreenVao);
        for(const [name,value] of Object.entries({uEye:eye,uForward:forward,uRight:right,uUp:up,uLight:light,uFogColor:fogColor}))g.uniform3fv(this.uniform(p,name),value);
        const volumes=cosmic?orderedVolumes(this.cosmos,eye):[];
        g.uniform1i(this.uniform(p,'uVolumeCount'),volumes.length);g.uniform1i(this.uniform(p,'uSteps'),quality.steps);
        volumes.forEach((v,i)=>{
            g.uniform4fv(this.uniform(p,'uVolumeCenter['+i+']'),[...v.center,v.seed]);
            g.uniform4fv(this.uniform(p,'uVolumeAxes['+i+']'),[...v.axes,v.kind]);
            g.uniform4fv(this.uniform(p,'uVolumeColor['+i+']'),[...v.color,v.strength]);
        });
        g.uniform1f(this.uniform(p,'uExposure'),exposure);g.uniform1i(this.uniform(p,'uMode'),mode);g.uniform1f(this.uniform(p,'uAspect'),this.w/this.h);g.uniform1f(this.uniform(p,'uTanHalf'),Math.tan(fov/2));g.uniform1f(this.uniform(p,'uTime'),this.time);
        g.drawArrays(g.TRIANGLES,0,3);
        if(cosmic){
            g.bindFramebuffer(g.FRAMEBUFFER,this.sceneFbo);g.viewport(0,0,this.sceneWidth,this.sceneHeight);
            g.useProgram(this.pCopy);g.activeTexture(g.TEXTURE0);g.bindTexture(g.TEXTURE_2D,this.cosmicColor);g.uniform1i(this.uniform(this.pCopy,'uScene'),0);g.drawArrays(g.TRIANGLES,0,3);
            this.frameStats.cosmicVolumes=volumes.length;this.frameStats.volumeSteps=quality.steps;
        }
        g.depthMask(true);g.enable(g.DEPTH_TEST);
    }
    renderShadow(key, ids, lightVP) {
        const g=this.gl;
        this.lightVP=lightVP;
        if(this.shadowKey===key)return;
        if(!this.shadowFbo){
            this.shadowSize=Math.min(2048,g.getParameter(g.MAX_TEXTURE_SIZE));
            this.shadowFbo=g.createFramebuffer();this.shadowTexture=g.createTexture();g.bindTexture(g.TEXTURE_2D,this.shadowTexture);
            g.texImage2D(g.TEXTURE_2D,0,g.DEPTH_COMPONENT24,this.shadowSize,this.shadowSize,0,g.DEPTH_COMPONENT,g.UNSIGNED_INT,null);
            for(const [name,value] of [[g.TEXTURE_MIN_FILTER,g.NEAREST],[g.TEXTURE_MAG_FILTER,g.NEAREST],[g.TEXTURE_WRAP_S,g.CLAMP_TO_EDGE],[g.TEXTURE_WRAP_T,g.CLAMP_TO_EDGE]])g.texParameteri(g.TEXTURE_2D,name,value);
            g.bindFramebuffer(g.FRAMEBUFFER,this.shadowFbo);g.framebufferTexture2D(g.FRAMEBUFFER,g.DEPTH_ATTACHMENT,g.TEXTURE_2D,this.shadowTexture,0);g.drawBuffers([g.NONE]);g.readBuffer(g.NONE);
            if(g.checkFramebufferStatus(g.FRAMEBUFFER)!==g.FRAMEBUFFER_COMPLETE)throw Error('Framebuffer delle ombre incompleto');
        }
        g.bindFramebuffer(g.FRAMEBUFFER,this.shadowFbo);g.viewport(0,0,this.shadowSize,this.shadowSize);g.depthMask(true);g.enable(g.DEPTH_TEST);g.disable(g.BLEND);g.clear(g.DEPTH_BUFFER_BIT);
        g.useProgram(this.pShadow);g.uniformMatrix4fv(this.uniform(this.pShadow,'uLightVP'),false,lightVP);
        g.enable(g.POLYGON_OFFSET_FILL);g.polygonOffset(1.5,2.0);
        for(const id of ids){const m=this.meshes.get(id);if(m){g.bindVertexArray(m.vao);g.drawElements(g.TRIANGLES,m.count,g.UNSIGNED_INT,0);}}
        g.disable(g.POLYGON_OFFSET_FILL);g.bindFramebuffer(g.FRAMEBUFFER,this.sceneFbo);g.viewport(0,0,this.sceneWidth,this.sceneHeight);this.shadowKey=key;
    }
    renderReflection(vp, eye, ids, light, waterLevel=-.12) {
        const g=this.gl,w=Math.max(1,Math.round(this.sceneWidth/2)),h=Math.max(1,Math.round(this.sceneHeight/2));
        if(this.reflectionWidth!==w||this.reflectionHeight!==h){
            if(this.reflectionFbo){g.deleteFramebuffer(this.reflectionFbo);g.deleteTexture(this.reflectionTexture);g.deleteRenderbuffer(this.reflectionDepth);}
            this.reflectionWidth=w;this.reflectionHeight=h;
            this.reflectionFbo=g.createFramebuffer();g.bindFramebuffer(g.FRAMEBUFFER,this.reflectionFbo);
            this.reflectionTexture=g.createTexture();g.bindTexture(g.TEXTURE_2D,this.reflectionTexture);g.texImage2D(g.TEXTURE_2D,0,g.RGBA8,w,h,0,g.RGBA,g.UNSIGNED_BYTE,null);
            for(const [name,value] of [[g.TEXTURE_MIN_FILTER,g.LINEAR],[g.TEXTURE_MAG_FILTER,g.LINEAR],[g.TEXTURE_WRAP_S,g.CLAMP_TO_EDGE],[g.TEXTURE_WRAP_T,g.CLAMP_TO_EDGE]])g.texParameteri(g.TEXTURE_2D,name,value);
            g.framebufferTexture2D(g.FRAMEBUFFER,g.COLOR_ATTACHMENT0,g.TEXTURE_2D,this.reflectionTexture,0);
            this.reflectionDepth=g.createRenderbuffer();g.bindRenderbuffer(g.RENDERBUFFER,this.reflectionDepth);g.renderbufferStorage(g.RENDERBUFFER,g.DEPTH_COMPONENT24,w,h);g.framebufferRenderbuffer(g.FRAMEBUFFER,g.DEPTH_ATTACHMENT,g.RENDERBUFFER,this.reflectionDepth);
            if(g.checkFramebufferStatus(g.FRAMEBUFFER)!==g.FRAMEBUFFER_COMPLETE)throw Error('Framebuffer dei riflessi incompleto');
        }
        const mirror=transform();mirror[5]=-1;mirror[13]=2*waterLevel;this.reflectionVP=mul(vp,mirror);
        g.bindFramebuffer(g.FRAMEBUFFER,this.reflectionFbo);g.viewport(0,0,w,h);g.depthMask(true);g.clearColor(.09,.15,.18,1);g.clear(g.COLOR_BUFFER_BIT|g.DEPTH_BUFFER_BIT);
        this.inReflection=true;
        for(const id of ids)this.drawMesh(id,this.reflectionVP,transform(),{material:10,eye:[eye[0],2*waterLevel-eye[1],eye[2]],light});
        this.inReflection=false;g.bindFramebuffer(g.FRAMEBUFFER,this.sceneFbo);g.viewport(0,0,this.sceneWidth,this.sceneHeight);
    }
    drawStars(vp, count = this.starCount, offset = 0, background = false, gain = 1) {
        if(!background&&(offset!==0||count<1000000||this.starCount<1000000))throw Error('La galassia deve disegnare almeno 1.000.000 di punti');
        const g=this.gl,p=this.pStars;g.enable(g.BLEND);g.blendFunc(g.SRC_ALPHA,g.ONE);g.depthMask(false);g.useProgram(p);g.bindVertexArray(background ? this.backgroundVao : this.starVao);
        const dust=!background&&this.cosmos?this.cosmos.volumes.slice(0,10):[];
        g.uniform1i(this.uniform(p,'uDustCount'),dust.length);g.uniform3fv(this.uniform(p,'uCosmicEye'),this.cosmicEye||[0,0,0]);
        dust.forEach((v,i)=>{g.uniform4fv(this.uniform(p,'uDustCenter['+i+']'),[...v.center,v.strength]);g.uniform4fv(this.uniform(p,'uDustAxes['+i+']'),[...v.axes,v.kind]);});
        g.uniformMatrix4fv(this.uniform(p,'uVP'),false,vp);g.uniform1f(this.uniform(p,'uPixels'),this.h*this.dpr*this.sceneScale*(background ? .22 : .087));g.uniform1f(this.uniform(p,'uTime'),this.time);
        g.uniform1i(this.uniform(p,'uHoverStar'),background?-1:(this.hoverStarIndex??-1));g.uniform1f(this.uniform(p,'uGain'),gain);const submitted=Math.min(count,(background ? this.backgroundCount : this.starCount)-offset);g.drawArrays(g.POINTS,offset,submitted);this.frameStats.stars+=submitted;this.frameStats.starDrawCalls++;g.depthMask(true);g.disable(g.BLEND);
    }
    drawMesh(id, vp, model, { texture = null, tint = [1,1,1,1], opacity = 1, rim = 0, emission = 0, eye = [0,8,40], light = [.4,1,.7], material = 0, seed = 0, center = [0,0,0], radius = 5.3, atmosphere = [.11,.36,.81], ocean = false, occluders = [] } = {}) {
        const m=this.meshes.get(id);if(!m)return;
        const g=this.gl,p=this.pMesh;g.useProgram(p);g.bindVertexArray(m.vao);
        if(m.stride!==16)g.vertexAttrib4f(4,0,.65,0,0);
        for(const [name,value] of Object.entries({uVP:vp,uModel:model,uLightVP:this.lightVP,uReflectionVP:this.reflectionVP}))g.uniformMatrix4fv(this.uniform(p,name),false,value);
        for(const [name,value] of Object.entries({uEye:eye,uLight:light,uCenter:center,uFogColor:this.fogColor,uAtmosColor:atmosphere}))g.uniform3fv(this.uniform(p,name),value);
        g.uniform4fv(this.uniform(p,'uTint'),tint);g.uniform1i(this.uniform(p,'uMaterial'),material);
        g.uniform1i(this.uniform(p,'uOccluderCount'),Math.min(4,occluders.length));occluders.slice(0,4).forEach((o,i)=>g.uniform4fv(this.uniform(p,'uOccluder['+i+']'),o));
        for(const [name,value] of Object.entries({uOcean:ocean?1:0,uTexWeight:texture?1:0,uOpacity:opacity,uRim:rim,uEmission:emission,uTime:this.time,uSeed:seed,uRadius:radius,uFog:this.fogDensity,uHasShadow:material===10&&this.shadowKey?1:0,uMist:this.mist?1:0,uClipBelow:this.inReflection?-.13:-10000}))g.uniform1f(this.uniform(p,name),value);
        g.activeTexture(g.TEXTURE0);g.bindTexture(g.TEXTURE_2D,texture||this.blank);g.uniform1i(this.uniform(p,'uTex'),0);
        g.activeTexture(g.TEXTURE1);g.bindTexture(g.TEXTURE_2D,this.shadowTexture||this.blank);g.uniform1i(this.uniform(p,'uShadow'),1);
        g.activeTexture(g.TEXTURE2);g.bindTexture(g.TEXTURE_2D,!this.inReflection&&this.reflectionTexture?this.reflectionTexture:this.blank);g.uniform1i(this.uniform(p,'uReflection'),2);
        if(opacity<1){g.enable(g.BLEND);g.blendFunc(g.SRC_ALPHA,g.ONE_MINUS_SRC_ALPHA);g.depthMask(false);}
        g.drawElements(g.TRIANGLES,m.count,g.UNSIGNED_INT,0);
        if(opacity<1){g.depthMask(true);g.disable(g.BLEND);}
        g.activeTexture(g.TEXTURE0);
    }
    // GPU-rendered rounded panels, borders, data glyphs and all text.
    quad(x, y, w, h, rgba, mode = 0, uv = [0, 0, 1, 1]) {
        const d = this.uiData;
        let [p, q, r, s] = uv;
        let v = [[x, y, p, q], [x + w, y, r, q], [x + w, y + h, r, s], [x, y + h, p, s]];
        for (let k of [0, 1, 2, 0, 2, 3])
            d.push(v[k][0], v[k][1], v[k][2], v[k][3], ...rgba, mode);
    }
    poly(points, c) {
        if (points.length < 3)
            return;
        const [x, y] = points[0];
        for (let i = 1; i < points.length - 1; i++) {
            for (let p of [[x, y], points[i], points[i + 1]])
                this.uiData.push(p[0], p[1], 0, 0, ...c, 0);
        }
    }
    polyline(points, c, w = 1, glow = 0) {
        if (glow > 0)
            this.polyline(points, [c[0], c[1], c[2], c[3] * .13], w + glow, 0);
        for (let i = 0; i < points.length - 1; i++) {
            let [a, b] = [points[i], points[i + 1]], dx = b[0] - a[0], dy = b[1] - a[1], l = Math.hypot(dx, dy) || 1, ox = -dy / l * w / 2, oy = dx / l * w / 2;
            this.poly([[a[0] + ox, a[1] + oy], [a[0] - ox, a[1] - oy], [b[0] - ox, b[1] - oy], [b[0] + ox, b[1] + oy]], c);
        }
    }
    rect(x, y, w, h, c) { this.quad(x, y, w, h, c); }
    roundPoints(x, y, w, h, r) {
        r = Math.min(r, w / 2, h / 2);
        const a = [];
        for (let [xx, yy, offset] of [[x + w - r, y + r, -Math.PI / 2], [x + w - r, y + h - r, 0], [x + r, y + h - r, Math.PI / 2], [x + r, y + r, Math.PI]])
            for (let k = 0; k <= 5; k++) {
                let t = offset + k / 5 * Math.PI / 2;
                a.push([xx + Math.cos(t) * r, yy + Math.sin(t) * r]);
            }
        return a;
    }
    roundRect(x, y, w, h, r, fill, stroke = null, glow = 0) {
        let p = this.roundPoints(x, y, w, h, r);
        this.poly([[x + w / 2, y + h / 2], ...p, p[0]], fill);
        if (stroke)
            this.polyline([...p, p[0]], stroke, 1.05, glow);
    }
    hexagon(cx, cy, r, fill, stroke = null) {
        let p = Array.from({ length: 6 }, (_, i) => [cx + Math.cos(Math.PI / 3 * i + Math.PI / 6) * r, cy + Math.sin(Math.PI / 3 * i + Math.PI / 6) * r]);
        this.poly([[cx, cy], ...p, p[0]], fill);
        if (stroke)
            this.polyline([...p, p[0]], stroke, 1.5, 3);
    }
    line(a, b, c, width = 1, glow = 0) { this.polyline([a, b], c, width, glow); }
    textWidth(s, style = 'body', tracking = 0) {
        const m = this.metrics?.styles[style];
        if (!m)
            return s.length * 10;
        let w = 0;
        for (let c of String(s)) {
            let g = m.glyphs[c] || m.glyphs['?'];
            w += (g?.advance || 7) + tracking;
        }
        return w;
    }
    text(s, x, y, style = 'body', c = color('#f0f6f5'), opts = {}) {
        let m = this.metrics?.styles[style];
        if (!m)
            return;
        const str = String(s), tracking = opts.track || 0;
        let ww = this.textWidth(str, style, tracking);
        if (opts.align === 'right')
            x -= ww;
        else if (opts.align === 'center')
            x -= ww / 2;
        const atlasW = this.metrics.width, atlasH = this.metrics.height;
        const base = y + m.size * .86;
        for (let chr of str) {
            let g = m.glyphs[chr] || m.glyphs['?'];
            if (!g)
                continue;
            if (chr !== ' ' && g.w > 1) {
                let yy = base + g.by;
                this.quad(x + g.bx, yy, g.w, g.h, c, 1, [g.x / atlasW, g.y / atlasH, (g.x + g.w) / atlasW, (g.y + g.h) / atlasH]);
            }
            x += g.advance + tracking;
        }
    }
    multiline(s, x, y, maxW, style = 'body', c = color('#d2dfdf'), lh = 26, maxLines = 99) {
        let words = String(s).split(/\s+/), line = '', n = 0;
        for (let w of words) {
            let cand = line ? line + ' ' + w : w;
            if (this.textWidth(cand, style) > maxW && line) {
                this.text(line, x, y + n * lh, style, c);
                n++;
                line = w;
                if (n >= maxLines)
                    break;
            }
            else
                line = cand;
        }
        if (line && n < maxLines) {
            this.text(line, x, y + n * lh, style, c);
            n++;
        }
        return n;
    }
    lineGraph(points, x, y, w, h, c, width = 1.8) { let pts = points.map(([px, py]) => [x + px * w, y + (1 - py) * h]); this.polyline(pts, c, width, 4); }
    drawImage(texture, x, y, w, h, uv = [0, 0, 1, 1], invert = false) { this.drawUI(); this.uiData.length = 0; this.quad(x, y, w, h, [1, 1, 1, 1], invert ? 3 : 2, uv); this.drawUI(texture); this.uiData.length = 0; }
    flush() { this.drawUI(); this.uiData.length = 0; }
    drawUI(texture = this.atlas) {
        this.resolveScene();
        let g = this.gl;
        if (!this.atlas)
            return;
        g.disable(g.DEPTH_TEST);
        g.enable(g.BLEND);
        g.blendFunc(g.SRC_ALPHA, g.ONE_MINUS_SRC_ALPHA);
        g.useProgram(this.pUI);
        g.bindVertexArray(this.uiVao);
        g.bindBuffer(g.ARRAY_BUFFER, this.uiBuffer);
        g.bufferData(g.ARRAY_BUFFER, new Float32Array(this.uiData), g.DYNAMIC_DRAW);
        for (let [i, n, off] of [[0, 2, 0], [1, 2, 8], [2, 4, 16], [3, 1, 32]]) {
            g.enableVertexAttribArray(i);
            g.vertexAttribPointer(i, n, g.FLOAT, false, 36, off);
        }
        g.uniform2f(g.getUniformLocation(this.pUI, 'uRes'), this.w, this.h);
        g.activeTexture(g.TEXTURE0);
        g.bindTexture(g.TEXTURE_2D, texture);
        g.uniform1i(g.getUniformLocation(this.pUI, 'uFont'), 0);
        g.drawArrays(g.TRIANGLES, 0, this.uiData.length / 9);
        g.disable(g.BLEND);
        g.enable(g.DEPTH_TEST);
        return 0;
    }
}

Object.assign(exports,{TAU,clamp,mix,smooth,color,mul,perspective,lookAt,transform,project,mesh,sphereMesh,prismHexWorld,coneMesh,daisyDiskMesh,GPU});
},
"src/scene/cosmos.js":(exports,__require)=>{
// One deterministic, camera-independent 3D catalogue. No image/skybox assets.
const { seededRandom }=__require("src/scene/systems.js");
const COSMIC_FAMILIES = ['Formazione stellare','Nube a riflessione','Polveri interstellari','Ammasso aperto','Periferia galattica'];
const COSMIC_QUALITY = {low:{scale:.4,steps:28},balanced:{scale:.55,steps:48},high:{scale:.7,steps:72}};
const MAX_COSMIC_VOLUMES=15;
function createCosmos(systems){
 const rng=seededRandom(0x434f534d),volumes=[],regions=[];
 const anchors=[0,7,13,20,5],colors=[[.72,.14,.23],[.13,.38,.83],[.46,.29,.13],[.22,.38,.57],[.33,.25,.48]];
 for(let i=0;i<5;i++){
  const s=systems[anchors[i]],a=i*1.8,center=s.position.map((x,k)=>x+[Math.cos(a)*3,-3.2,-7-Math.sin(a)*2][k]);
  const region={id:i,name:COSMIC_FAMILIES[i],center,color:colors[i],radius:i===4?5:7};regions.push(region);
  const axes=[region.radius,3.6+i*.25,5.4+i*.3],strength=[.68,.88,.65,.4,.24][i];
  volumes.push({id:'region-'+i,center,axes,color:colors[i],kind:i===2?1:0,strength,seed:13+i*9});
  volumes.push({id:'filament-'+i,center:center.map((v,k)=>v+[3,1,-3][k]),axes:[5.5,2.2,3.2],color:colors[i],kind:1,strength:.7,seed:57+i*11});
 }
 // Rare expanding shells; positions are persistent astronomical scenery.
 for(const [i,kind] of [[9,2],[18,3]]){
  const s=systems[i];volumes.push({id:'remnant-'+i,center:s.position.map((v,k)=>v+[2.7,1.6,-4.5][k]),axes:kind===2?[2.9,2.6,2.9]:[1.8,2.8,1.8],color:kind===2?[.14,.54,.66]:[.61,.25,.12],kind,strength:1.2,seed:i*2});
 }
 for(let i=0;i<3;i++)volumes.push({id:'distant-galaxy-'+i,center:[[80,33,-110],[-115,25,-60],[30,-35,125]][i],axes:[[13,2,10],[11,4,13],[9,2,12]][i],color:[.42,.45,.66],kind:4,strength:.9,seed:i*31});
 return {seed:0x434f534d,regions,volumes,systems:systems.map(s=>({id:s.id,region:regionAt(s.position,regions).id}))};
}
function regionAt(position,regions){return regions.reduce((a,b)=>Math.hypot(...position.map((x,k)=>x-a.center[k]))<Math.hypot(...position.map((x,k)=>x-b.center[k]))?a:b);}
function orderedVolumes(cosmos,eye){return [...cosmos.volumes].sort((a,b)=>Math.hypot(...b.center.map((v,k)=>v-eye[k]))-Math.hypot(...a.center.map((v,k)=>v-eye[k])));}
// Use existing slots in the million-point buffer, preserving all selectable stars.
function enrichCosmicStars(points,cosmos,systems){
 const reserved=new Set(systems.map(s=>s.starIndex)),rng=seededRandom(0x53544152);
 for(let i=0;i<points.length/7;i++){
  if(reserved.has(i))continue;
  const j=i*7;
  if(i%83===0){const region=cosmos.regions[Math.floor(rng()*5)],r=Math.pow(rng(),2)*2.8,az=rng()*Math.PI*2,y=rng()*2-1,q=Math.sqrt(1-y*y);points.set([region.center[0]+Math.cos(az)*q*r,region.center[1]+y*r,region.center[2]+Math.sin(az)*q*r,.64+rng()*.3,.74+rng()*.25,1,.35+rng()*.75],j);}
  if(i%397===0){points[j+6]=1.6+rng()*1.8;const warm=rng()<.32;points[j+3]=warm?1:.7;points[j+4]=warm?.72:.84;points[j+5]=warm?.48:1;}
 }
 return points;
}
// Ray/ellipsoid interval is also used by tests to check front/behind extinction.
function volumeInterval(eye,direction,volume,maxDistance=Infinity){
 const p=eye.map((v,k)=>(v-volume.center[k])/volume.axes[k]),d=direction.map((v,k)=>v/volume.axes[k]);
 const a=d.reduce((s,v)=>s+v*v,0),b=p.reduce((s,v,k)=>s+v*d[k],0),c=p.reduce((s,v)=>s+v*v,0)-1,disc=b*b-a*c;
 if(disc<=0)return null;const near=Math.max(0,(-b-Math.sqrt(disc))/a),far=Math.min(maxDistance,(-b+Math.sqrt(disc))/a);return far>near?[near,far]:null;
}

Object.assign(exports,{COSMIC_FAMILIES,COSMIC_QUALITY,MAX_COSMIC_VOLUMES,createCosmos,regionAt,orderedVolumes,enrichCosmicStars,volumeInterval});
},
"src/scene/cosmic-shader.js":(exports,__require)=>{
// Shader-defined density volumes, no raster background or AI-generated imagery.
const cosmicField = `
uniform int uVolumeCount,uSteps;
uniform vec4 uVolumeCenter[15],uVolumeAxes[15],uVolumeColor[15];
vec2 ellipsoid(vec3 ro,vec3 rd,vec3 center,vec3 axes){vec3 p=(ro-center)/axes,d=rd/axes;float a=dot(d,d),b=dot(p,d),c=dot(p,p)-1.,h=b*b-a*c;if(h<=0.)return vec2(1,-1);h=sqrt(h);return vec2(max(0.,(-b-h)/a),(-b+h)/a);}
// Domain-warped density, sculpted cavities and narrow opaque filaments.
vec2 cloudDensity(vec3 q,float seed,float kind){
 float radius=length(q);if(radius>=1.)return vec2(0);
 vec3 p=q*5.3+vec3(seed,seed*.37,seed*.19);
 vec3 warp=vec3(noise3(p*.7),noise3(p*.7+17.),noise3(p*.7-9.))-.5;
 float n=noise3(p+warp*1.9)*.62+noise3(p*2.07+warp)*.27+noise3(p*4.2)*.11;
 float edge=pow(max(0.,1.-radius*radius),1.3),ridge=pow(max(0.,1.-abs(n-.49)*5.),3.);
 float cavity=smoothstep(.12,.4,length(q-vec3(-.22,.09,.14)));
 float detail=noise3(p*3.1)*.5+noise3(p*6.3)*.3+noise3(p*12.7)*.2;
 float gas=edge*smoothstep(.40,.72,n)*cavity*smoothstep(.30,.65,detail);
 float dust=edge*ridge*smoothstep(.17,.62,noise3(p*.65+27.))*(.2+1.8*smoothstep(.35,.65,detail));
 if(kind>1.5&&kind<3.5){float shell=exp(-pow((radius-(kind<2.5?.68:.60))/.105,2.));gas=shell*(.15+n*.9);dust=gas*.12;}
 if(kind>3.5){float r=length(q.xz),angle=atan(q.z,q.x),arms=pow(.5+.5*cos(angle*2.-log(r+.07)*4.5),7.);float disk=exp(-q.y*q.y*70.)*exp(-r*r*3.);gas=disk*(arms*.6+.12)+exp(-dot(q,q)*65.)*.9;dust=disk*pow(.5+.5*cos(angle*2.-log(r+.07)*4.5+.6),12.)*.65;}
 return vec2(gas,dust);
}
vec3 nebulaRadiance(vec3 ro,vec3 rd,vec3 background){
 vec3 c=background;
 // Catalogue sorted back-to-front. Each bounded volume integrates front-to-back.
 for(int n=0;n<15;n++){
  if(n>=uVolumeCount)break;
  vec3 center=uVolumeCenter[n].xyz,axes=uVolumeAxes[n].xyz;float kind=uVolumeAxes[n].w,seed=uVolumeCenter[n].w,strength=uVolumeColor[n].w;
  vec2 hit=ellipsoid(ro,rd,center,axes);if(hit.y<=hit.x)continue;
  float dt=(hit.y-hit.x)/float(uSteps),trans=1.;vec3 light=vec3(0);
  for(int j=0;j<72;j++){
   if(j>=uSteps||trans<.015)break;
   vec3 world=ro+rd*(hit.x+(float(j)+.5)*dt),q=(world-center)/axes;
   vec2 density=cloudDensity(q,seed,kind);
   float gas=density.x,dust=density.y,absorb=(gas*.28+dust*(kind<.5?1.15:1.8))*strength;
   float optical=absorb*dt,alpha=1.-exp(-optical);
   vec3 tint=mix(uVolumeColor[n].rgb,vec3(.46,.67,.82),smoothstep(.25,.75,gas)*.35);
   float illumination=.32+1.4*exp(-length(q-vec3(-.25,.1,.1))*2.);
   vec3 source=tint*gas*illumination*strength*(kind>.5&&kind<1.5?.19:.36);
   light+=trans*source*(1.-exp(-optical))/max(absorb,.0001);trans*=1.-alpha;
  }
  c=light+trans*c;
  // Compact hot stellar core at the centre of the rare planetary nebula.
  if(kind>2.5&&kind<3.5){vec3 to=center-ro;float along=dot(to,rd),impact=length(to-rd*along);if(along>0.)c+=vec3(.7,.85,1.)*exp(-impact*impact/.002)*.65;}
 }
 return c;
}
`;
// Coarse optical depth per star, integrated only BETWEEN camera and star.
// Bounds give foreground stars zero extinction and avoid a screen-space mask.
const starExtinction = `
uniform vec3 uCosmicEye;
uniform int uDustCount;
uniform vec4 uDustCenter[10],uDustAxes[10];
float extinction(vec3 star){
 vec3 delta=star-uCosmicEye;float distanceToStar=length(delta);vec3 rd=delta/max(distanceToStar,.000001);float optical=0.;
 for(int n=0;n<10;n++){if(n>=uDustCount)break;
  vec3 p=(uCosmicEye-uDustCenter[n].xyz)/uDustAxes[n].xyz,d=rd/uDustAxes[n].xyz;
  float a=dot(d,d),b=dot(p,d),h=b*b-a*(dot(p,p)-1.);if(h<=0.)continue;
  h=sqrt(h);float nearT=max(0.,(-b-h)/a),farT=min(distanceToStar,(-b+h)/a);if(farT<=nearT)continue;
  vec3 q=p+d*(nearT+farT)*.5;float density=exp(-dot(q,q)*3.);
  optical+=(farT-nearT)*density*uDustCenter[n].w*.16;
 }
 return exp(-optical);
}
`;

Object.assign(exports,{cosmicField,starExtinction});
},
"src/scene/shaders.js":(exports,__require)=>{
const { cosmicField }=__require("src/scene/cosmic-shader.js");
// All environments are evaluated in 3D. No painted backgrounds or generated images.
const noise = `
float hash(vec3 p){p=fract(p*.1031);p+=dot(p,p.yzx+33.33);return fract((p.x+p.y)*p.z);}
float noise3(vec3 p){vec3 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(mix(hash(i),hash(i+vec3(1,0,0)),f.x),mix(hash(i+vec3(0,1,0)),hash(i+vec3(1,1,0)),f.x),f.y),mix(mix(hash(i+vec3(0,0,1)),hash(i+vec3(1,0,1)),f.x),mix(hash(i+vec3(0,1,1)),hash(i+vec3(1,1,1)),f.x),f.y),f.z);}
float fbm(vec3 p){float s=0.,a=.53;for(int i=0;i<5;i++){s+=a*noise3(p);p=p*2.03+vec3(7.1,3.2,5.8);a*=.48;}return s;}
vec3 film(vec3 x){return pow(clamp((x*(2.51*x+.03))/(x*(2.43*x+.59)+.14),0.,1.),vec3(1./2.2));}
`;
const vsMesh = `#version 300 es
layout(location=0) in vec3 aPos;layout(location=1) in vec3 aNormal;layout(location=2) in vec2 aUV;layout(location=3) in vec4 aColor;layout(location=4) in vec4 aPBR;
uniform mat4 uVP,uModel,uLightVP,uReflectionVP;uniform highp int uMaterial;out vec3 vNormal,vWorld,vLocal;out vec2 vUV;out vec4 vColor,vPBR,vShadow,vReflection;
void main(){vec3 vertex=aPos;if(uMaterial==10&&aPBR.w>1.5&&aPBR.w<2.5)vertex.xz*=8.;vec4 p=uModel*vec4(vertex,1.);vWorld=p.xyz;vLocal=aPos;vNormal=normalize(mat3(uModel)*aNormal);vUV=aUV;vColor=aColor;vPBR=aPBR;vShadow=uLightVP*p;vReflection=uReflectionVP*p;gl_Position=uVP*p;}`;
const fsMesh = `#version 300 es
precision highp float;
in vec3 vNormal,vWorld,vLocal;in vec2 vUV;in vec4 vColor,vPBR,vShadow,vReflection;out vec4 outColor;
uniform sampler2D uTex,uShadow,uReflection;uniform vec3 uEye,uLight,uCenter,uFogColor,uAtmosColor;uniform vec4 uTint;
uniform int uOccluderCount;uniform vec4 uOccluder[4];
uniform float uTexWeight,uOpacity,uRim,uEmission,uTime,uSeed,uRadius,uFog,uHasShadow,uMist,uClipBelow,uOcean;uniform highp int uMaterial;
${noise}
float solarVisibility(vec3 point,vec3 light){float visibility=1.;for(int k=0;k<4;k++){if(k>=uOccluderCount)break;vec3 delta=uOccluder[k].xyz-point;float along=dot(delta,light);if(along>0.){float impact=length(delta-light*along),r=uOccluder[k].w;visibility*=smoothstep(r*.94,r*1.06,impact);}}return visibility;}
float shadow(vec3 n,vec3 l){if(uHasShadow<.5)return 1.;vec3 p=vShadow.xyz/vShadow.w*.5+.5;if(any(lessThan(p,vec3(0)))||any(greaterThan(p,vec3(1))))return 1.;float b=max(.00065,.0014*(1.-dot(n,l))),s=0.;vec2 texel=1./vec2(textureSize(uShadow,0));for(int x=-1;x<=1;x++)for(int y=-1;y<=1;y++)s+=p.z-b<texture(uShadow,p.xy+vec2(x,y)*texel).r?1.:.24;return s/9.;}
vec3 shade(vec3 c,vec3 n,vec3 l,vec3 v,float metal,float rough,float visibility){
 float ndl=max(dot(n,l),0.),ndv=max(dot(n,v),.001);vec3 h=normalize(l+v);float ndh=max(dot(n,h),0.),vdh=max(dot(v,h),0.);
 float a=max(.045,rough*rough),a2=a*a,den=ndh*ndh*(a2-1.)+1.;float D=a2/(3.141593*den*den),k=(rough+1.)*(rough+1.)/8.;float G=ndl/(ndl*(1.-k)+k)*ndv/(ndv*(1.-k)+k);vec3 F=mix(vec3(.04),c,metal)+(1.-mix(vec3(.04),c,metal))*pow(1.-vdh,5.);
 vec3 ambient=mix(vec3(.13,.15,.18),vec3(.29,.35,.39),n.y*.5+.5)*c;
 return ambient+(c*(1.-metal)*(1.-F)+D*G*F/max(4.*ndl*ndv,.001))*ndl*visibility*2.0;
}
void main(){
 if(vWorld.y<uClipBelow)discard;
 vec3 n=normalize(vNormal),l=normalize(uLight),v=normalize(uEye-vWorld),p=normalize(vLocal),c=vColor.rgb*uTint.rgb;float alpha=uOpacity*vColor.a;
 if(uMaterial==6){
  if(dot(n,v)<0.)discard;
  vec3 ro=uEye-uCenter,rd=-v;float b=dot(ro,rd),rr=uRadius*1.028,disc=b*b-dot(ro,ro)+rr*rr;if(disc<0.)discard;
  float nearT=max(0.,-b-sqrt(disc)),farT=-b+sqrt(disc),ground=b*b-dot(ro,ro)+uRadius*uRadius;
  if(ground>0.){float hit=-b-sqrt(ground);if(hit>0.)farT=min(farT,hit);}
  float dt=max(0.,farT-nearT)/14.,opt=0.;vec3 scatter=vec3(0);
  for(int i=0;i<14;i++){vec3 q=ro+rd*(nearT+(float(i)+.5)*dt);float h=max(0.,length(q)/uRadius-1.);float density=exp(-h*155.);float sun=smoothstep(-.13,.18,dot(normalize(q),l))*solarVisibility(q+uCenter,l);vec3 tint=mix(vec3(.34,.12,.04),uAtmosColor,sun);float d=density*dt/uRadius*6.;scatter+=exp(-opt)*d*tint*(.1+sun*1.5);opt+=d;}
  alpha=(1.-exp(-opt))*.92;outColor=vec4(pow(clamp(scatter/max(alpha,.001),0.,1.),vec3(.65)),alpha*uOpacity);return;
 }
 if(uMaterial==5){if(dot(n,v)<0.)discard;float a=texture(uTex,vUV).r;float sun=max(0.,dot(n,l))*solarVisibility(vWorld,l);alpha*=smoothstep(.12,.95,a)*.84;outColor=vec4(film(vec3(.001)+vec3(1.)*sun),alpha);return;}
 if(uMaterial==12||uMaterial==15){
  if(uMaterial==15)l=normalize(uCenter-vWorld);
  vec3 albedo=texture(uTex,vUV).rgb;float water=uOcean*smoothstep(.01,.12,albedo.b-max(albedo.r,albedo.g*.85));
  vec3 base=pow(albedo,vec3(2.2));c=shade(base,n,l,v,0.,mix(.88,.18,water),solarVisibility(vWorld,l));
  float day=smoothstep(-.12,.08,dot(n,l));c*=mix(.035,1.,day);
  c+=water*pow(max(dot(reflect(-l,n),v),0.),110.)*vec3(.65,.62,.55)*day;
  if(uMaterial==15)c*=.12;
  outColor=vec4(film(c*.8),alpha);return;
 }
 if(uMaterial==14){float core=pow(abs(dot(n,v)),.7);outColor=vec4(uTint.rgb,alpha*pow(1.-vUV.y,1.7)*core*.42);return;}
 if(uMaterial==13){vec4 tex=texture(uTex,vUV);alpha*=tex.a;float sun=.25+.75*abs(dot(n,l));outColor=vec4(tex.rgb*sun,alpha);return;}
 if(uMaterial==9){float cells=fbm(p*14.+vec3(0,uTime*.03,0)),grain=noise3(p*95.);float limb=.48+.52*pow(max(0.,dot(n,v)),.4);vec3 hot=mix(uTint.rgb*vec3(1.,.62,.27),vec3(1.,.94,.73)*uTint.rgb,.3+cells*.7);outColor=vec4(film(hot*(1.5+cells+grain*.24)*limb),1);return;}
 if(uMaterial==11){if(dot(n,v)<0.)discard;float rim=pow(1.-max(0.,dot(n,v)),3.4);float flame=.65+.35*noise3(p*12.+uTime*.02);outColor=vec4(uTint.rgb,alpha*rim*flame*.40);return;}
 if(uMaterial==10){
  float kind=vPBR.w,rough=clamp(vPBR.y,.08,1.),metal=clamp(vPBR.x,0.,1.);vec3 base=max(c,vec3(0));
  if(kind<1.5){float grain=fbm(vWorld*.7);base*=.5+grain*1.0;base*=mix(vec3(.72,.80,.64),vec3(1.12,1.08,.93),smoothstep(.34,.63,fbm(vWorld*2.5)));vec3 dp1=dFdx(vWorld),dp2=dFdy(vWorld),r1=cross(dp2,n),r2=cross(n,dp1);float det=dot(dp1,r1),h=noise3(vWorld*4.)*.013;n=normalize(n-sign(det)*(dFdx(h)*r1+dFdy(h)*r2)/max(abs(det),.00001));}
  if(kind>1.5&&kind<2.5){float a=vWorld.x*2.3+vWorld.z*1.45+uTime*.48,b=vWorld.z*3.6-vWorld.x*.7-uTime*.32;n=normalize(n+vec3(cos(a)*.036+cos(b*1.8)*.012,0,sin(b)*.037+sin(a*2.1)*.014));base=vec3(.008,.046,.065);rough=.16;metal=.05;}
  c=shade(base,n,l,v,metal,rough,shadow(normalize(vNormal),l));
  if(kind>1.5&&kind<2.5){float fres=pow(1.-max(0.,dot(n,v)),5.);c+=vec3(.2,.33,.38)*(.12+fres*.65);c+=pow(max(dot(reflect(-l,n),v),0.),120.)*vec3(2.1,1.8,1.4);}
  c+=base*max(vPBR.z,uEmission)*1.4;
  if(kind>2.5&&kind<3.5)c+=base*max(0.,dot(-n,l))*.8;
  float distanceToEye=length(uEye-vWorld),heightDensity=exp(-max(vWorld.y,0.)*.12);float fog=1.-exp(-distanceToEye*uFog*(.45+.55*heightDensity));
  c=film(c*(kind>3.5?.76:.48));if(kind>1.5&&kind<2.5){vec2 uv=vReflection.xy/vReflection.w*.5+.5;uv+=n.xz*.018;vec3 reflection=texture(uReflection,clamp(uv,.002,.998)).rgb;float f=.28+.48*pow(1.-max(0.,dot(n,v)),3.);c=mix(c,reflection,f);}
  c=mix(c,uFogColor,clamp(fog,0.,.84));
  if(uMist>.5){float optical=0.;for(int j=0;j<8;j++){vec3 q=mix(uEye,vWorld,(float(j)+.5)/8.);vec3 a=(q-vec3(-15,1.4,-7))/vec3(11,2.3,9),b=(q-vec3(9,1.7,-9))/vec3(10,2.2,8),d=(q-vec3(0,2.8,-20))/vec3(19,3.2,7);optical+=(exp(-dot(a,a)*2.)+exp(-dot(b,b)*2.)+exp(-dot(d,d)*2.))*(.65+.35*noise3(q*.3+uTime*.015));}float fogVolume=1.-exp(-optical*distanceToEye*.008);c=mix(c,vec3(.15,.23,.12),fogVolume);}
  outColor=vec4(c,alpha);return;
 }
 // Original scientific objects and UI-associated geometry retain their colours.
 c=mix(c,texture(uTex,vUV).rgb*uTint.rgb,uTexWeight);c*=.22+.89*max(0.,dot(n,l));float rim=pow(1.-abs(dot(n,v)),3.);c+=uRim*rim*vec3(.16,.78,.91)+uEmission*vColor.rgb;
 outColor=vec4(c,alpha);
}`;
const vsFullscreen = `#version 300 es
out vec2 vUV;void main(){vec2 p=vec2((gl_VertexID<<1)&2,gl_VertexID&2);vUV=p;gl_Position=vec4(p*2.-1.,0,1);}`;
const fsEnvironment = `#version 300 es
precision highp float;in vec2 vUV;out vec4 outColor;
uniform vec3 uEye,uForward,uRight,uUp,uLight,uFogColor;uniform float uAspect,uTanHalf,uTime,uExposure;uniform int uMode;
${noise}
${cosmicField}
void main(){vec2 uv=vUV*2.-1.;vec3 rd=normalize(uForward+uv.x*uAspect*uTanHalf*uRight+uv.y*uTanHalf*uUp);vec3 c=vec3(.001,.002,.005);
 if(uMode==2){float elevation=max(rd.y,0.);float horizon=exp(-elevation*5.);c=mix(vec3(.035,.073,.10),uFogColor,horizon);float sun=max(dot(rd,normalize(uLight)),0.);c+=vec3(1.,.73,.42)*pow(sun,360.)*.55+vec3(.14,.13,.10)*pow(sun,12.);c+=vec3(.018)*fbm(rd*7.+vec3(0,0,uTime*.006));outColor=vec4(c,1);return;}
 if(uMode==1){
  vec3 inv=1./(rd+vec3(.000001)),a=(-vec3(43,18,43)-uEye)*inv,b=(vec3(43,18,43)-uEye)*inv;vec3 lo=min(a,b),hi=max(a,b);float t0=max(max(lo.x,lo.y),max(lo.z,0.)),t1=min(min(hi.x,hi.y),hi.z);
  if(t1>t0){float dt=(t1-t0)/float(uSteps),trans=1.;for(int j=0;j<72;j++){if(j>=uSteps)break;vec3 p=uEye+rd*(t0+(float(j)+.5)*dt);float r=length(p.xz),angle=atan(p.z,p.x),spiral=sin((angle-1.85*log(r+1.))*2.);float arm=exp(-spiral*spiral*20.);float fall=exp(-pow(r/28.,2.));float z=exp(-p.y*p.y/(2.0+r*.16));float grain=noise3(p*.65)*.75+.25;float core=exp(-r*r/25.-p.y*p.y*.25);float density=(arm*.055+ .006)*fall*z*grain;vec3 light=mix(vec3(.17,.3,.58),vec3(.63,.56,.50),exp(-r*.08));float dust=exp(-pow(sin((angle-1.85*log(r+1.)+.11)*2.),2.)*48.)*z*fall*.018;vec3 emit=density*light+core*vec3(.10,.063,.028);c+=trans*emit*dt;trans*=exp(-(density*.22+dust)*dt);}}
 }
 if(uMode==1)c=nebulaRadiance(uEye,rd,c);
 outColor=vec4(film(c*uExposure),1);
}`;
const vsShadow = `#version 300 es
layout(location=0) in vec3 aPos;uniform mat4 uLightVP;void main(){gl_Position=uLightVP*vec4(aPos,1.);}`;
const fsShadow = `#version 300 es
precision highp float;void main(){}`;
const fsPost = `#version 300 es
precision highp float;in vec2 vUV;out vec4 outColor;uniform sampler2D uScene;uniform vec2 uPixel;uniform float uBloom;
void main(){vec3 c=texture(uScene,vUV).rgb;vec3 north=texture(uScene,vUV+vec2(0,uPixel.y)).rgb,south=texture(uScene,vUV-vec2(0,uPixel.y)).rgb,east=texture(uScene,vUV+vec2(uPixel.x,0)).rgb,west=texture(uScene,vUV-vec2(uPixel.x,0)).rgb;float contrast=length(north-south)+length(east-west);c=mix(c,(north+south+east+west+c*4.)/8.,smoothstep(.14,.55,contrast)*.65);vec3 glow=vec3(0);for(int x=-2;x<=2;x++)for(int y=-2;y<=2;y++){vec3 s=texture(uScene,vUV+vec2(x,y)*uPixel*3.).rgb;float l=max(s.r,max(s.g,s.b));glow+=s*smoothstep(.78,1.,l)/25.;}outColor=vec4(c+glow*.075*uBloom,1);}`;

const fsCopy = `#version 300 es
precision highp float;in vec2 vUV;out vec4 outColor;uniform sampler2D uScene;void main(){outColor=texture(uScene,vUV);}`;

Object.assign(exports,{vsMesh,fsMesh,vsFullscreen,fsEnvironment,vsShadow,fsShadow,fsPost,fsCopy});
},
"src/scene/world.js":(exports,__require)=>{
const { asteroidBelt, cometTail }=__require("src/scene/minor-bodies.js");
const { createCosmos, enrichCosmicStars, regionAt }=__require("src/scene/cosmos.js");
const { MIN_STARS, SYSTEM_SCALE, buildSystems, bodyAtTime, systemArchitecture, systemPlanet, systemForPlanet, indicesForSystem, pickProjected }=__require("src/scene/systems.js");
const { viewKey }=__require("src/scene/navigation.js");
const { mesh, sphereMesh, transform, perspective, lookAt, mul, project, TAU }=__require("src/renderer.js");
const { random, raySphere, backgroundStars }=__require("src/scene/data.js");
const { planetProfile }=__require("src/scene/assets.js");
const normal = v => { let n = Math.hypot(...v) || 1; return v.map(x => x / n); }, cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
function annulus(inner=1,outer=1.006,planetary=false) {
    const v = [], ix = [];
    for (let i = 0; i <= 128; i++) {
        const a = i * TAU / 128;
        for (let k = 0; k < 2; k++)
            v.push(Math.cos(a) * (k?outer:inner), 0, Math.sin(a) * (k?outer:inner), 0, 1, 0, planetary?k:i/128, planetary?.5:k, 1, 1, 1, 1);
        if (i < 128) {
            let n = 2 * i;
            ix.push(n, n + 1, n + 2, n + 1, n + 3, n + 2);
        }
    }
    return mesh(v, ix);
}
function orbitMesh(body){
 const v=[],ix=[];
 for(let j=0;j<=192;j++){
  const p=bodyAtTime(body,(j/192*TAU-body.phase)/body.speed).position;
  for(const k of [0,1])v.push(...p.map(x=>x*(1+k*.0035)),0,1,0,j/192,k,1,1,1,1);
  if(j<192){const n=j*2;ix.push(n,n+1,n+2,n+1,n+3,n+2);}
 }
 return mesh(v,ix);
}
function box(sx = 1, sy = 1, sz = 1) {
    const v = [], ix = [];
    const ps = [[-sx, -sy, -sz], [sx, -sy, -sz], [sx, sy, -sz], [-sx, sy, -sz], [-sx, -sy, sz], [sx, -sy, sz], [sx, sy, sz], [-sx, sy, sz]], faces = [[0, 3, 2, 1, 0, 0, -1], [4, 5, 6, 7, 0, 0, 1], [0, 4, 7, 3, -1, 0, 0], [1, 2, 6, 5, 1, 0, 0], [3, 7, 6, 2, 0, 1, 0], [0, 1, 5, 4, 0, -1, 0]];
    for (const f of faces) {
        const n = v.length / 12;
        for (let k = 0; k < 4; k++)
            v.push(...ps[f[k]], ...f.slice(4), 0, 0, 1, 1, 1, 1);
        ix.push(n, n + 1, n + 2, n, n + 2, n + 3);
    }
    return mesh(v, ix);
}
function tube(a, b, r = .025) {
    const d = normal(b.map((v, i) => v - a[i])), u = normal(cross(d, Math.abs(d[1]) < .95 ? [0, 1, 0] : [1, 0, 0])), v0 = cross(d, u), v = [], ix = [];
    for (let end = 0; end < 2; end++)
        for (let j = 0; j < 6; j++) {
            let t = j * TAU / 6, n = u.map((v, i) => v * Math.cos(t) + v0[i] * Math.sin(t)), c = end ? b : a;
            v.push(...c.map((x, i) => x + r * n[i]), ...n, 0, 0, 1, 1, 1, 1);
        }
    for (let j = 0; j < 6; j++) {
        let k = (j + 1) % 6;
        ix.push(j, k, j + 6, k, k + 6, j + 6);
    }
    return mesh(v, ix);
}
function merge(parts) {
    let v = [], ix = [];
    for (const m of parts) {
        let o = v.length / 12;
        for (const x of m.v)
            v.push(x);
        for (const i of m.i)
            ix.push(o + i);
    }
    return mesh(v, ix);
}
const RESEARCH = [
    { id: 'gaia', label: 'GAIA', discipline: 4, pos: [0, 0, 2], module: 'gaia' },
    { id: 'functions', label: 'FUNZIONI', discipline: 0, pos: [-8, 2, 0], module: 'math-c08' },
    { id: 'systems', label: 'SISTEMI', discipline: 0, pos: [-11, -2, -1], module: 'math-c04' },
    { id: 'probability', label: 'PROBABILITÀ', discipline: 0, pos: [-7, -5, 0], module: 'math-c10' },
    { id: 'iterations', label: 'ITERAZIONI', discipline: 0, pos: [-5, 6, -1], module: 'math-p08' },
    { id: 'radiation', label: 'RADIAZIONE', discipline: 1, pos: [6, 6, 0], module: 'physics-01' },
    { id: 'energy', label: 'BILANCIO ENERGETICO', discipline: 1, pos: [4, 2, 1], module: 'gaia', section: 1 },
    { id: 'albedo', label: 'ALBEDO', discipline: 1, pos: [1, -3, 1], module: 'gaia', section: 1 },
    { id: 'atmosphere', label: 'ATMOSFERA', discipline: 2, pos: [9, 1, -1], module: 'chemistry-01' },
    { id: 'carbon', label: 'CICLO DEL CARBONIO', discipline: 2, pos: [9, -5, 0], module: 'chemistry-02' },
    { id: 'populations', label: 'POPOLAZIONI', discipline: 3, pos: [-3, -4, 1], module: 'gaia', section: 2 },
    { id: 'ecosystem', label: 'ECOSISTEMI', discipline: 3, pos: [3, -6, -1], module: 'biology-01' },
    { id: 'biodiversity', label: 'BIODIVERSITÀ', discipline: 3, pos: [-1, 7, -1], module: 'biology-02' },
    { id: 'feedback', label: 'RETROAZIONI', discipline: 4, pos: [0, 3, 1.5], module: 'gaia', section: 0 },
    { id: 'daisyworld', label: 'DAISYWORLD', discipline: 4, pos: [4, -1, 2], lab: 'daisyworld' },
    { id: 'exp', label: 'ESPONENZIALI', discipline: 0, pos: [-10, 6, -2], module: 'math-c06' }
];
const EDGES = [[0, 13], [0, 14], [13, 1], [13, 6], [13, 12], [14, 6], [14, 7], [14, 10], [10, 11], [7, 8], [8, 9], [1, 2], [1, 3], [1, 4], [6, 5], [10, 15], [3, 12], [11, 9]];
const TINTS = [[.93, .78, .47, 1], [.38, .82, .91, 1], [.69, .57, .89, 1], [.59, .83, .56, 1], [.72, .95, .91, 1]];
class World {
    constructor(gpu, textures, biomes) {
        this.R = gpu;
        this.textures = textures;
        this.biomes = biomes;
        this.biome = null;
        this.cameraScene = null;
        gpu.makeStars(backgroundStars(), true);
        this.systems = [];
        this.cameraSpace = 'other';
        this.cameraSystem = 7;
        this.projections = [];
        this.eye = [0, 23, 54];
        this.target = [0, 0, 0];
        this.fov = .84;
        this.vp = null;
        this.activateBiome(7);
        for (const [id, m] of [['sphere', sphereMesh(48, 32)], ['lowSphere', sphereMesh(14, 10)], ['fineSphere', sphereMesh(144, 96)], ['box', box()], ['ring', annulus()], ['planet-rings',annulus(1.3,2.35,true)]])
            gpu.makeMesh(id, m);
        let r = random(123);
        this.debris = Array.from({length:180},()=>{const a=r()*TAU,d=6.4+r()*1.5;return {pos:[Math.cos(a)*d,(r()-.5)*.16+Math.sin(a)*.55,Math.sin(a)*d],size:.018+r()*.075,spin:r()*TAU};});
        EDGES.forEach(([i,j],k)=>gpu.makeMesh('research-edge-'+k,tube(RESEARCH[i].pos,RESEARCH[j].pos,.032)));
        gpu.makeMesh('research-links', merge(EDGES.map(([i, j]) => tube(RESEARCH[i].pos, RESEARCH[j].pos, .022))));
        this.patches = Array.from({ length: 180 }, (_, i) => { let y = 1 - 2 * (i + .5) / 180, a = i * Math.PI * (3 - Math.sqrt(5)), rr = Math.sqrt(1 - y * y); return [Math.cos(a) * rr, y, Math.sin(a) * rr]; });
    }
    activateBiome(index) {
        const key=planetProfile(index).biome;
        if(this.biome===key)return;
        this.biome=key;this.surface=this.biomes[key];
        this.terrain={height:new Map(this.surface.grid.cells.map((p,i)=>[String(i),p]))};
        this.towers=this.surface.stations.map(s=>s.position);
        this.trees=Array.from({length:this.surface.vegetationCount});
    }
    bindStars(stars, modules) {
        this.systems=buildSystems(stars,modules);this.cosmos=createCosmos(this.systems);this.R.cosmos=this.cosmos;enrichCosmicStars(stars,this.cosmos,this.systems);
        const rock=sphereMesh(6,4);
        for(const system of this.systems){
            for(const body of system.bodies)this.R.makeMesh('orbit-'+body.id,orbitMesh(body));
            if(system.id%3===1){const belt=asteroidBelt(system,rock);system.belt={count:belt.count,inner:belt.inner,outer:belt.outer};this.R.makeMesh('belt-'+system.id,belt);}
            if(system.id%9===3){
                const head=[-system.outerRadius*.6,2.2,-system.outerRadius*.65];system.comet={head};
                this.R.makeMesh('ion-tail-'+system.id,cometTail(head,7,.16));this.R.makeMesh('dust-tail-'+system.id,cometTail(head,5,.42,1.5));
            }
        }
        return this.systems;
    }
    systemPosition(id) { return this.systems[id]?.position || [0,0,0]; }
    galacticCamera(camera) {
        if(camera.space!=='system')return {eye:camera.eye,target:camera.target,fov:camera.fov};
        const origin=this.systemPosition(camera.system);
        return {eye:camera.eye.map((v,i)=>origin[i]+v*SYSTEM_SCALE),target:camera.target.map((v,i)=>origin[i]+v*SYSTEM_SCALE),fov:camera.fov};
    }
    desiredCamera(scene,s) {
        const w=this.R.w,h=this.R.h,system=s.system??systemForPlanet(s.selected);let eye,target=[0,0,0],fov=.84,space='other';
        if(scene==='galaxy'){
            const distance=s.distance;eye=[Math.sin(s.yaw)*distance*Math.cos(s.pitch),distance*Math.sin(s.pitch),Math.cos(s.yaw)*distance*Math.cos(s.pitch)];space='galaxy';
        }else if(scene==='system'){
            const distance=s.distance*Math.max(1,systemArchitecture(system).outerRadius/13)*Math.max(1,1.05/(w/h)),pitch=s.pitch;
            eye=[Math.sin(s.yaw)*distance*Math.cos(pitch),distance*Math.sin(pitch),Math.cos(s.yaw)*distance*Math.cos(pitch)];target=w<850?[0,0,0]:[2.4,0,0];fov=.78;space='system';
        }else if(scene==='orbit'){
            const body=systemPlanet(s.selected,s.time),angle=s.yaw*.45+Math.atan2(-body.position[0],-body.position[2])+.55,pitch=.14+(s.pitch-.45)*.35,scale=body.radius/5.3,distance=s.distance||22;
            const heroEye=[Math.sin(angle)*distance*Math.cos(pitch),Math.sin(pitch)*distance,Math.cos(angle)*distance*Math.cos(pitch)];
            const framing=[Math.cos(angle)*2,0,-Math.sin(angle)*2];
            eye=heroEye.map((v,i)=>body.position[i]+(v+framing[i])*scale);target=body.position.map((v,i)=>v+framing[i]*scale);space='system';
        }else if(scene==='surface'){
            const angle=.6+s.yaw*.5,pitch=Math.max(.24,Math.min(.96,.58+(s.pitch-.45)*.6)),distance=52;
            eye=[Math.sin(angle)*distance*Math.cos(pitch),Math.sin(pitch)*distance+2,Math.cos(angle)*distance*Math.cos(pitch)];target=w<850?[-3,1.8,-1]:[3,1.8,-2];fov=.60;
        }else if(scene==='research')eye=[Math.sin(s.yaw*.12)*3,1,37];
        else if(scene==='lab'&&s.lab==='daisyworld')eye=[0,4,30];
        else eye=[0,5,32];
        return {eye,target,fov,space,system};
    }
    camera(scene,s) {
        const desired=this.desiredCamera(scene,s),key=viewKey(scene,s),previous=this.cameraSpace;
        if(this.cameraScene!==key){
            this.cameraFrom=this.vp?{eye:[...this.eye],target:[...this.target],fov:this.fov,space:this.cameraSpace,system:this.cameraSystem}:null;
            this.cameraProgress=0;this.cameraScene=key;
            this.bridge=!!this.cameraFrom&&((previous==='galaxy'&&desired.space==='system')||(previous==='system'&&desired.space==='galaxy'));
            this.travelSystem=desired.space==='system'?desired.system:this.cameraSystem;
        }
        this.cameraProgress=Math.min(1,this.cameraProgress+Math.min(80,Math.max(0,s.lastFrameMs||16))/(this.bridge?1750:950));
        if(s.paused||!this.cameraFrom)this.cameraProgress=1;
        const t=this.cameraProgress*this.cameraProgress*(3-2*this.cameraProgress);
        let from=this.cameraFrom,to=desired;
        this.travelling=this.bridge&&this.cameraProgress<1;
        if(this.travelling){from=this.galacticCamera(from);to=this.galacticCamera(desired);}
        // Different unrelated teaching scenes use the destination frame directly.
        if(!this.travelling&&from&&from.space!==desired.space)from=null;
        if(from&&t<1){
            const a=from.eye.map((v,i)=>v-from.target[i]),b=to.eye.map((v,i)=>v-to.target[i]),da=Math.hypot(...a),db=Math.hypot(...b);
            let direction=a.map((v,i)=>v/da*(1-t)+b[i]/db*t);direction=normal(Math.hypot(...direction)<.001?b:direction);
            const distance=Math.exp(Math.log(Math.max(.00001,da))*(1-t)+Math.log(Math.max(.00001,db))*t);
            const targetT=this.travelling?(desired.space==='system'?1-Math.pow(1-t,3):Math.pow(t,3)):t;
            this.target=from.target.map((v,i)=>v*(1-targetT)+to.target[i]*targetT);this.eye=this.target.map((v,i)=>v+direction[i]*distance);this.fov=from.fov*(1-t)+to.fov*t;
        }else{this.eye=[...to.eye];this.target=[...to.target];this.fov=to.fov;}
        this.cameraSpace=this.travelling?'galaxy':desired.space;this.cameraSystem=this.travelling?this.travelSystem:desired.system;
        this.vp=mul(perspective(this.fov,this.R.w/this.R.h,this.cameraSpace==='galaxy'?.00004:.012,400),lookAt(this.eye,this.target));
        const cosmic=this.galacticCamera({eye:this.eye,target:this.target,fov:this.fov,space:this.cameraSpace,system:this.cameraSystem});
        this.galaxyEye=cosmic.eye;this.galaxyTarget=cosmic.target;
        this.galaxyVP=mul(perspective(this.fov,this.R.w/this.R.h,.00004,500),lookAt(cosmic.eye,cosmic.target));
    }
    drawPlanet(body,time,center,radius,light,detailed=false) {
        const moons=Array.from({length:body.moons},(_,j)=>{const a=time*(.06/(j+1))+body.phase+j*2.4,d=radius*(2.8+j*.65);return {center:center.map((v,i)=>v+[Math.cos(a)*d,Math.sin(a)*d*.12,Math.sin(a)*d][i]),radius:radius*(.12+j*.025),angle:a};});
        const R=this.R,profile=body.profile,options={eye:this.eye,light,material:12,center,radius,texture:this.planetTextures?.get(profile.texture,detailed)||this.textures[profile.texture],atmosphere:profile.atmosphere,ocean:profile.ocean,occluders:moons.map(m=>[...m.center,m.radius])},size=radius/5.3;
        const geometry=this.R.meshes.has('planet-'+profile.texture)?'planet-'+profile.texture:detailed?'fineSphere':'sphere',rotation=time*body.spin+body.rotation;
        R.drawMesh(geometry,this.vp,transform(...center,radius,rotation,body.tilt),options);
        if(profile.clouds)R.drawMesh(geometry,this.vp,transform(...center,radius*1.006,rotation+time*.002,body.tilt),{...options,texture:this.planetTextures?.get('clouds',detailed)||this.textures.clouds,material:5,opacity:.9});
        if(profile.atmosphere)R.drawMesh(geometry,this.vp,transform(...center,radius*1.028),{...options,material:6,opacity:body.type==='desert'?.35:.85});
        if(body.rings)R.drawMesh('planet-rings',this.vp,transform(...center,radius,0,body.tilt),{eye:this.eye,light,texture:this.textures.rings,material:13,opacity:.88});
        for(const moon of moons)R.drawMesh(detailed?'sphere':'lowSphere',this.vp,transform(...moon.center,moon.radius,moon.angle),{eye:this.eye,light,material:12,texture:this.textures.moon,occluders:[[...center,radius]]});
        if(detailed&&body.explorable){
            const probe=center.map((v,i)=>v+[-4.9,-2.6,2.1][i]*size);
            R.drawMesh('box',this.vp,transform(...probe,.07*size,.3),{eye:this.eye,light,tint:[.76,.68,.47,1]});
            for(const side of [-1,1]){const m=transform(probe[0]+side*.24*size,probe[1],probe[2],.1*size,.3);for(const i of [0,1,2])m[i]*=1.55;for(const i of [4,5,6])m[i]*=.08;R.drawMesh('box',this.vp,m,{eye:this.eye,light,tint:[.08,.18,.29,1]});}
        }
    }
    drawSystem(s) {
        const R=this.R,id=this.travelling?this.travelSystem:s.system,system=this.systems[id];if(!system)return;
        const scale=this.cameraSpace==='galaxy'?SYSTEM_SCALE:1,origin=this.cameraSpace==='galaxy'?system.position:[0,0,0];
        const map=p=>p.map((v,i)=>origin[i]+v*scale),starColor=system.color.map(v=>Math.max(.3,v)),starRadius=system.starRadius*scale;
        R.drawMesh('fineSphere',this.vp,transform(...origin,starRadius,s.time*.025),{eye:this.eye,material:9,tint:[...starColor,1],seed:id,radius:starRadius,center:origin});
        R.drawMesh('sphere',this.vp,transform(...origin,starRadius*1.19),{eye:this.eye,material:11,tint:[...starColor,1],opacity:.75,radius:starRadius,center:origin});
        if(system.belt)R.drawMesh('belt-'+id,this.vp,transform(...origin,scale,s.time*.0008),{eye:this.eye,center:origin,material:15,texture:this.textures.moon});
        if(system.comet){
            const head=map(system.comet.head);
            R.drawMesh('lowSphere',this.vp,transform(...head,.075*scale),{eye:this.eye,material:12,texture:this.textures.moon});
            R.drawMesh('dust-tail-'+id,this.vp,transform(...origin,scale),{eye:this.eye,material:14,tint:[.6,.49,.28,1],opacity:.45});
            R.drawMesh('ion-tail-'+id,this.vp,transform(...origin,scale),{eye:this.eye,material:14,tint:[.18,.56,.92,1],opacity:.65});
        }
        for(const body of system.bodies){
            const p=bodyAtTime(body,s.time),center=map(p.position),radius=p.radius*scale;
            if(s.scene!=='orbit')R.drawMesh('orbit-'+body.id,this.vp,transform(...origin,scale),{eye:this.eye,tint:body.explorable?TINTS[body.sector]:[.32,.36,.39,1],opacity:s.scene==='orbit'?.035:body.explorable?.26:.11,emission:.35});
            this.drawPlanet(p,s.time,center,radius,normal(p.position.map(v=>-v)),s.scene==='orbit'&&body.index===s.selected);
            const xy=project(center,this.vp,R.w,R.h),apparent=radius*R.h/(2*Math.tan(this.fov/2)*xy[2]);
            if(s.scene==='system'&&!this.travelling)this.projections.push({type:body.explorable?'planet':'ambient',index:body.explorable?body.index:body.slot,body,...xyToObj(xy),r:Math.max(11,apparent*1.12),position:center,worldRadius:radius});
        }
    }
    draw(scene, s, data) {
        const R = this.R;
        this.activateBiome(s.selected);
        this.camera(scene, s); R.time=s.time;
        this.projections = [];
        const surface=scene==='surface';
        R.fogColor=this.surface.fog.color.map(x=>x*.58);R.fogDensity=surface?this.surface.fog.density:0;R.mist=surface&&this.biome==='simbiosi';
        const cosmic=['galaxy','system','orbit'].includes(scene);
        R.drawEnvironment(surface?2:cosmic?1:0,cosmic?this.galaxyEye:this.eye,cosmic?this.galaxyTarget:this.target,this.fov,this.surface.light.direction,R.fogColor,cosmic?.72:1);
        if(cosmic){
            if(R.starCount<MIN_STARS)throw Error('Rendering interrotto: meno di un milione di stelle');
            R.drawStars(this.galaxyVP,R.starCount,0,false,.28+.57*Math.min(1,Math.hypot(...this.galaxyEye.map((v,i)=>v-this.galaxyTarget[i]))/30));
        }else if(!surface)R.drawStars(this.vp,6000,0,true);
        if(scene==='galaxy'){
            if(this.travelling)this.drawSystem(s);
            else for(const system of this.systems){
                const xy=project(system.position,this.vp,R.w,R.h);
                this.projections.push({type:'system',index:system.id,...xyToObj(xy),r:14,starIndex:system.starIndex});
            }
        }else if(scene==='system'||scene==='orbit')this.drawSystem(s);
        else if (scene === 'surface') {
            const ortho=new Float32Array([1/48,0,0,0,0,1/48,0,0,0,0,-2/150,0,0,0,-1,1]);
            const light=this.surface.light.direction,lightEye=light.map(x=>x*75),lightVP=mul(ortho,lookAt(lightEye,[0,0,0]));
            R.renderShadow(this.biome,this.surface.meshes.filter(m=>m.kind!==2).map(m=>m.id),lightVP);
            if(this.biome==='marea')R.renderReflection(this.vp,this.eye,this.surface.meshes.filter(m=>m.kind!==2).map(m=>m.id),light);
            for(const m of this.surface.meshes)R.drawMesh(m.id,this.vp,transform(),{eye:this.eye,light,material:10});
            for(const station of this.surface.stations){
                const p=station.position,label=station.labelPosition,selected=station.index===s.station;
                if(selected)R.drawMesh('ring',this.vp,transform(p[0],p[1]+.12,p[2],station.radius*1.08),{eye:this.eye,tint:TINTS[station.index],emission:.7,opacity:.7});
                this.projections.push({type:'station',index:station.index,...xyToObj(project(label,this.vp,R.w,R.h)),r:28,position:p,worldRadius:station.radius});
            }
        }
        else if (scene === 'research') {
            R.drawMesh('research-links', this.vp, transform(), { eye: this.eye, tint: TINTS[1], opacity: .55, emission: .3 });
            EDGES.forEach(([a,b],k)=>{if(a===s.node||b===s.node)R.drawMesh('research-edge-'+k,this.vp,transform(),{eye:this.eye,tint:TINTS[4],emission:.6,opacity:.85});});
            RESEARCH.forEach((n, i) => {
                let selected = i === s.node;
                R.drawMesh('sphere', this.vp, transform(...n.pos, n.discipline === 4 ? .52 : .30, s.time * .04), { eye: this.eye, tint: TINTS[n.discipline], emission: selected ? .4 : .08, rim: .25 });
                if (selected)
                    R.drawMesh('ring', this.vp, transform(...n.pos, .85, 0, Math.PI / 2), { eye: this.eye, tint: TINTS[n.discipline], emission: .5, opacity: .8 });
                this.projections.push({ type: 'node', index: i, ...xyToObj(project(n.pos, this.vp, R.w, R.h)), r: 18 });
            });
        }
        else if (scene === 'lab' && s.lab === 'daisyworld') {
            const d = s.sim.final, c = [-6, 0, 0], r = 4.9;
            R.drawMesh('fineSphere', this.vp, transform(...c, r, s.time * .025), { eye: this.eye, tint: [.31, .40, .29, 1], rim: .3 });
            const nb = Math.round(d.black * 180), nw = Math.round(d.white * 180);
            for (let i = 0; i < nb + nw && i < 180; i++) {
                const p = this.patches[i];
                R.drawMesh('lowSphere', this.vp, transform(c[0] + p[0] * r, p[1] * r, p[2] * r, .19), { eye: this.eye, tint: i < nb ? [.07, .10, .12, 1] : [.92, .94, .83, 1], emission: .03 });
            }
            R.drawMesh('ring', this.vp, transform(...c, r * 1.08), { eye: this.eye, tint: TINTS[3], opacity: .5, emission: .3 });
        }
        else {
            R.drawMesh('sphere', this.vp, transform(10, 0, -13, 7, s.time * .023), { texture: this.textures.earth, eye: this.eye, rim: .4, opacity: .48 });
        }
    }
    pick(x, y, s) {
        if(this.cameraProgress<1)return null;
        if(s.scene==='galaxy')return pickProjected(this.projections,x,y);
        if(s.scene==='system'){
            const hits=this.projections.filter(p=>p.depth>0&&Math.hypot(p.x-x,p.y-y)<=p.r).sort((a,b)=>a.depth-b.depth);
            const hit=hits[0];if(!hit)return null;
            // Do not pick a planet hidden behind the stellar disc.
            const star=project([0,0,0],this.vp,this.R.w,this.R.h),r=this.systems[s.system].starRadius*this.R.h/(2*Math.tan(this.fov/2)*star[2]);
            return star[2]>0&&star[2]<hit.depth&&Math.hypot(star[0]-x,star[1]-y)<r?null:hit;
        }
        if(s.scene==='surface'){
            const f=normal(this.target.map((v,i)=>v-this.eye[i])),right=normal(cross(f,[0,1,0])),up=cross(right,f),t=Math.tan(this.fov/2);
            const direction=normal(f.map((v,i)=>v+right[i]*(2*x/this.R.w-1)*t*this.R.w/this.R.h+up[i]*(1-2*y/this.R.h)*t));
            const label=this.projections.find(p=>p.depth>0&&Math.hypot(p.x-x,p.y-y)<p.r);if(label)return label;
            let hit=null,near=Infinity;
            for(const station of this.surface.stations){const center=[station.position[0],(station.position[1]+station.labelPosition[1])*.5,station.position[2]],d=raySphere(this.eye,direction,center,station.radius);if(d!==null&&d<near){near=d;hit={type:'station',index:station.index};}}
            return hit;
        }
        return this.projections.filter(p => p.depth > 0 && Math.hypot(p.x - x, p.y - y) < p.r).sort((a, b) => a.depth - b.depth)[0] || null;
    }
}
function xyToObj(p) { return { x: p[0], y: p[1], depth: p[2] }; }

Object.assign(exports,{box,RESEARCH,EDGES,World});
},
"src/scene/minor-bodies.js":(exports,__require)=>{
const {seededRandom}=__require("src/scene/systems.js");
// Geometry only. Asteroid surfaces use the existing NASA lunar map.
function asteroidBelt(system,unitSphere){
 const rng=seededRandom(0x42454c54^system.id),verts=[],indices=[],count=280+Math.floor(rng()*180),inner=system.outerRadius+1.7;
 for(let j=0;j<count;j++){
  const a=rng()*Math.PI*2,d=inner+rng()*1.4,center=[Math.cos(a)*d,(rng()-.5)*.45,Math.sin(a)*d],size=.008+Math.pow(rng(),3)*.035,scale=[.7+rng()*.6,.6+rng()*.5,.8+rng()*.6],offset=verts.length/12;
  for(let k=0;k<unitSphere.v.length;k+=12){const v=unitSphere.v.slice(k,k+12);for(let c=0;c<3;c++)v[c]=center[c]+v[c]*size*scale[c];verts.push(...v);}
  for(const ix of unitSphere.i)indices.push(offset+ix);
 }
 return {v:new Float32Array(verts),i:new Uint32Array(indices),count,inner,outer:inner+1.4};
}
function cometTail(head,length,width,bend=0){
 const axis=head.map(v=>v/Math.hypot(...head)),side=[axis[2],0,-axis[0]],v=[],ix=[];
 for(let j=0;j<=24;j++){
  const t=j/24,rad=width*(.06+Math.sin(t*Math.PI*.5));
  for(let k=0;k<=12;k++){
   const a=k/12*Math.PI*2,n=[side[0]*Math.cos(a),Math.sin(a),side[2]*Math.cos(a)];
   const pos=head.map((x,i)=>x+axis[i]*t*length+n[i]*rad+side[i]*bend*t*t);
   v.push(...pos,...n,k/12,t,1,1,1,1);
   if(j<24&&k<12){const p=j*13+k;ix.push(p,p+13,p+1,p+1,p+13,p+14);}
  }
 }
 return {v:new Float32Array(v),i:new Uint32Array(ix)};
}

Object.assign(exports,{asteroidBelt,cometTail});
},
"src/scene/data.js":(exports,__require)=>{
function random(seed = 4141) { return () => { seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0; return seed / 4294967296; }; }
function stars(count = 1000000, seed = 554412) {
    if (!Number.isInteger(count) || count < 1 || count > 1000000)
        throw new RangeError('Conteggio stelle non valido');
    const r = random(seed), a = new Float32Array(count * 7);
    for (let i=0;i<count;i++) {
        const halo=i%13===0,core=i%5===0,d=core?Math.pow(r(),1.65)*10:2+Math.pow(r(),.72)*37;
        const gaussian=(r()+r()+r()+r()-2),theta=(i%4)*Math.PI/2+1.85*Math.log(d+1)+gaussian*(core?2.5:.24);
        const j=i*7,heightNoise=r()+r()+r()+r()-2;
        a[j]=halo?(r()-.5)*145:Math.cos(theta)*d;
        a[j+1]=halo?(r()-.5)*85:heightNoise*(core?2.2:.40+d*.02);
        a[j+2]=halo?(r()-.5)*145:Math.sin(theta)*d;
        const warm=core||r()<.16,b=.65+r()*.35;
        a[j+3]=warm?b:b*.62;a[j+4]=warm?b*.79:b*.78;a[j+5]=warm?b*.54:b;
        a[j+6]=.22+r()*.62+(r()<.002?1.7:0);
        if(core&&!halo){const polar=r()*2-1,phi=r()*Math.PI*2,radial=d*Math.sqrt(1-polar*polar);a[j]=Math.cos(phi)*radial;a[j+1]=d*polar*.48;a[j+2]=Math.sin(phi)*radial;}
    }
    return a;
}
function planetPositions() {
    const r = random(610);
    const a = [];
    for (let s = 0; s < 4; s++)
        for (let i = 0; i < 25; i++) {
            const radius = 8 + Math.floor(i / 5) * 4.3 + (r() - .5) * .8, theta = s * Math.PI / 2 + .1 + (i % 5 + .5) * 1.36 / 5;
            const size = i === 7 ? .86 : .36 + r() * .22;
            a.push({ index: s * 25 + i, sector: s, x: Math.cos(theta) * radius, y: (r() - .5) * 2.6, z: Math.sin(theta) * radius, r: size, spin: r() * Math.PI * 2 });
        }
    return a;
}
function raySphere(origin, direction, center, radius) {
    const o = origin.map((v, i) => v - center[i]), b = o.reduce((n, v, i) => n + v * direction[i], 0), c = o.reduce((n, v) => n + v * v, 0) - radius * radius, d = b * b - c;
    if (d < 0)
        return null;
    const t = -b - Math.sqrt(d);
    return t >= 0 ? t : (-b + Math.sqrt(d) >= 0 ? -b + Math.sqrt(d) : null);
}

function backgroundStars(count=6000,seed=91071){
    const r=random(seed),a=new Float32Array(count*7);
    for(let i=0;i<count;i++){const y=r()*2-1,t=r()*Math.PI*2,k=Math.sqrt(1-y*y),j=i*7;a.set([Math.cos(t)*k*170,y*170,Math.sin(t)*k*170,.6+r()*.4,.65+r()*.35,.7+r()*.3,.4+r()*1.6],j);}
    return a;
}

Object.assign(exports,{random,stars,planetPositions,raySphere,backgroundStars});
},
"src/ui/toolkit.js":(exports,__require)=>{
const { color, clamp }=__require("src/renderer.js");
const C = { pale: color('#e5f0ec'), cyan: color('#74d8d4'), lime: color('#b5d6a3'), amber: color('#e4c18b'), purple: color('#b1a2df'), muted: color('#9fb4b9'), dim: color('#6b8e98'), red: color('#eaa08f') };
class UI {
    constructor(R) { this.R = R; this.buttons = []; this.focus = null; this.hover = null; }
    begin() { this.buttons = []; }
    text(t, x, y, s = 'body', c = C.pale, o = {}) { this.R.text(t, x, y, s, c, o); }
    tag(t, x, y, c = C.cyan) { this.text(t.toUpperCase(), x, y, 'mini', c, { track: 1.4 }); }
    wrap(t, x, y, w, c = C.muted, line = 25, max = 99, style = 'body') { return this.R.multiline(t, x, y, w, style, c, line, max); }
    panel(x, y, w, h, c = C.cyan, alpha = .66) { this.R.roundRect(x, y, w, h, 16, color('#061b28', alpha), [...c.slice(0, 3), .48], 4); this.R.line([x + 17, y + 1], [x + Math.min(w * .35, 145), y + 1], [...c.slice(0, 3), .80], 1.8, 4); }
    button(id, label, x, y, w, h, action, { active = false, disabled = false, small = false } = {}) {
        const c = active ? C.lime : C.cyan, hover = this.hover === id, focus = this.focus === id;
        this.R.roundRect(x, y, w, h, 8, color(active ? '#1f4145' : '#0a2934', hover ? .88 : .65), [...c.slice(0, 3), focus ? 1 : active ? .8 : .4], focus ? 7 : 2);
        this.text(label, x + w / 2, y + (h - (small ? 12 : 14)) / 2 - 2, small ? 'micro' : 'mini', disabled ? C.dim : C.pale, { align: 'center', track: small ? .1 : .4 });
        if (focus)
            this.R.line([x + 10, y + h - 3], [x + w - 10, y + h - 3], C.lime, 2);
        this.buttons.push({ id, label, x, y, w, h, action, disabled });
    }
    slider(id, label, x, y, w, value, min, max, step, onChange, format = String) { this.tag(label, x, y); this.text(format(value), x + w, y, 'mini', C.lime, { align: 'right' }); let t = clamp((value - min) / (max - min), 0, 1); this.R.roundRect(x, y + 29, w, 5, 3, color('#294b54', .8)); this.R.roundRect(x, y + 29, w * t, 5, 3, C.cyan); this.R.hexagon(x + w * t, y + 31, 7, C.pale, C.cyan); this.buttons.push({ id, label, x, y: y + 19, w, h: 28, slider: true, min, max, step, value, action: onChange }); }
    metric(label, value, x, y, c = C.lime) { this.tag(label, x, y, C.muted); this.text(value, x, y + 23, 'number', c); }
    hit(x, y) { return [...this.buttons].reverse().find(b => x >= b.x && x <= b.x + b.w && y >= b.y && y <= b.y + b.h && !b.disabled); }
    activate(b, x) {
        if (!b || b.disabled)
            return;
        if (b.slider) {
            const v = clamp(b.min + clamp((x - b.x) / b.w, 0, 1) * (b.max - b.min), b.min, b.max);
            b.action(Number((Math.round(v / b.step) * b.step).toFixed(6)));
        }
        else
            b.action?.();
    }
    graph(x, y, w, h, series, { xmin = 0, xmax = 1, ymin = 0, ymax = 1, xLabel = '', yLabel = '', ticks = 4 } = {}) {
        const R = this.R;
        for (let i = 0; i <= ticks; i++) {
            const yy = y + h * (i / ticks), xx = x + w * (i / ticks);
            R.line([x, yy], [x + w, yy], color('#588289', .25), 1);
            R.line([xx, y], [xx, y + h], color('#588289', .15), 1);
            this.text((ymax - (ymax - ymin) * i / ticks).toFixed(Math.abs(ymax - ymin) > 10 ? 0 : 1), x - 9, yy - 6, 'micro', C.muted, { align: 'right' });
            this.text((xmin + (xmax - xmin) * i / ticks).toFixed(Math.abs(xmax - xmin) > 10 ? 0 : 1), xx, y + h + 10, 'micro', C.muted, { align: 'center' });
        }
        R.line([x, y], [x, y + h], C.muted);
        R.line([x, y + h], [x + w, y + h], C.muted);
        this.text(xLabel, x + w, y + h + 30, 'micro', C.muted, { align: 'right' });
        this.text(yLabel, x, y - 23, 'micro', C.muted);
        for (const s of series) {
            let pts = [];
            const flush = () => {
                if (pts.length > 1)
                    R.polyline(pts, s.color || C.cyan, 2.1, 3);
                pts = [];
            };
            for (const [a, b] of s.points) {
                if (!Number.isFinite(a) || !Number.isFinite(b) || b < ymin || b > ymax || a < xmin || a > xmax) {
                    flush();
                    continue;
                }
                pts.push([x + (a - xmin) / (xmax - xmin) * w, y + h - (b - ymin) / (ymax - ymin) * h]);
            }
            flush();
        }
    }
}
class ImageCache {
    constructor(R, resolve = p => p) { this.R = R; this.resolve = resolve; this.items = new Map(); this.errors = []; this.counter = 0; }
    get(path) {
        const o = this.items.get(path);
        if (o) {
            o.used = ++this.counter;
            return o;
        }
        const n = { loading: true, used: ++this.counter };
        this.items.set(path, n);
        const image = new Image();
        image.onload = () => {
            try {
                n.texture = this.R.uploadTexture(image);
                n.width = image.width;
                n.height = image.height;
                n.loading = false;
                this.trim();
            }
            catch (e) {
                n.error = e.message;
                n.loading = false;
                this.errors.push(path);
            }
        };
        image.onerror = () => { n.error = 'Risorsa non caricata'; n.loading = false; this.errors.push(path); };
        image.src = this.resolve(path);
        return n;
    }
    trim() {
        if (this.items.size <= 18)
            return;
        const entries = [...this.items.entries()].filter(([k, v]) => !v.loading && v.texture).sort((a, b) => a[1].used - b[1].used);
        for (const [k, v] of entries.slice(0, Math.max(0, this.items.size - 18))) {
            this.R.gl.deleteTexture(v.texture);
            this.items.delete(k);
        }
    }
    draw(path, x, y, w, h, uv = [0, 0, 1, 1], invert = false) {
        const item = this.get(path);
        if (item.texture)
            this.R.drawImage(item.texture, x, y, w, h, uv, invert);
        return item;
    }
}

Object.assign(exports,{C,UI,ImageCache});
},
"src/store.js":(exports,__require)=>{
const STORE_KEY = 'gaia.beyond-knowledge.v1';
function fresh() { return { schema: 1, notes: {}, read: [], quiz: {}, bookmarks: [], scenarios: [], preferences: { quality: 1000000, graphics: 'high', motion: true }, updatedAt: null }; }
function cleanState(value) {
    if (!value || typeof value !== 'object' || value.schema !== 1)
        throw new TypeError('Formato del diario non riconosciuto');
    const o = fresh();
    if (value.notes && typeof value.notes === 'object' && !Array.isArray(value.notes))
        for (const [k, v] of Object.entries(value.notes).slice(0, 300))
            if (typeof v === 'string' && k.length < 120 && !['__proto__', 'constructor', 'prototype'].includes(k))
                o.notes[k] = v.slice(0, 30000);
    o.read = Array.isArray(value.read) ? [...new Set(value.read.filter(x => typeof x === 'string' && x.length < 120))].slice(0, 2000) : [];
    o.bookmarks = Array.isArray(value.bookmarks) ? value.bookmarks.filter(x => typeof x === 'string').slice(0, 200) : [];
    if (value.quiz && typeof value.quiz === 'object')
        for (const [k, v] of Object.entries(value.quiz))
            if (/^08\.\d{2}$/.test(k) && ['A', 'B', 'C', 'D'].includes(v?.answer))
                o.quiz[k] = { answer: v.answer, checked: Boolean(v.checked) };
    o.scenarios = Array.isArray(value.scenarios) ? value.scenarios.filter(x => x && typeof x === 'object' && typeof x.label === 'string').slice(-30) : [];
    // Migrate old point budgets without reducing the galaxy's million stars.
    o.preferences.quality = 1000000;
    o.preferences.graphics = ['high','balanced','low'].includes(value.preferences?.graphics) ? value.preferences.graphics : value.preferences?.quality === 60000 ? 'low' : value.preferences?.quality === 250000 ? 'balanced' : 'high';
    o.preferences.motion = value.preferences?.motion !== false;
    return o;
}
function openStore(storage) {
    let data = fresh(), persistent = true, message = '';
    try {
        storage = storage || globalThis.localStorage;
        const old = storage.getItem(STORE_KEY);
        if (old)
            data = cleanState(JSON.parse(old));
        storage.setItem(STORE_KEY, JSON.stringify(data));
    }
    catch (e) {
        persistent = false;
        message = 'Salvataggio persistente non disponibile: esporta il diario.';
    }
    return { get data() { return data; }, get persistent() { return persistent; }, get message() { return message; }, save() {
            data.updatedAt = new Date().toISOString();
            try {
                storage.setItem(STORE_KEY, JSON.stringify(data));
                persistent = true;
                return true;
            }
            catch {
                persistent = false;
                message = 'Memoria non disponibile: esporta il diario.';
                return false;
            }
        }, import(value) { data = cleanState(value); this.save(); return data; }, export() { return JSON.stringify(data, null, 2); } };
}
function grade(questions, answers) {
    let correct = 0, wrong = 0, unanswered = 0;
    for (const q of questions) {
        const v = answers[q.id]?.answer;
        if (!v)
            unanswered++;
        else if (v === q.correctOptionId)
            correct++;
        else
            wrong++;
    }
    return { correct, wrong, unanswered, total: questions.length };
}

Object.assign(exports,{STORE_KEY,fresh,cleanState,openStore,grade});
},
"src/models/daisyworld.js":(exports,__require)=>{
/** Daisyworld: model family of Watson & Lovelock (1983), eqs. 1–6.
 * Numerical implementation/parameter choices are documented in docs/SCIENTIFIC_MODEL.md.
 * Temperatures in kelvin internally; model time is dimensionless, NOT calendar years.
 */
const DEFAULTS = Object.freeze({ luminosity: 1, flux: 917, sigma: 5.67e-8, q: 2e9, death: 0.3, blackAlbedo: 0.25, whiteAlbedo: 0.75, groundAlbedo: 0.5, optimalC: 22.5, curvature: 0.003265, fertile: 1, dt: 0.1, duration: 300, initialBlack: 0.01, initialWhite: 0.01 });
function validate(p = {}) {
    const o = { ...DEFAULTS, ...p };
    for (const [k, v] of Object.entries(o))
        if (!Number.isFinite(v))
            throw new TypeError(`Parametro non finito: ${k}`);
    if (o.curvature <= 0 || o.optimalC <= -273.15)
        throw new RangeError('Parametri di crescita non validi');
    if (o.luminosity <= 0 || o.flux <= 0 || o.sigma <= 0 || o.dt <= 0 || o.dt > 0.5 || o.duration <= 0 || o.duration > 3000)
        throw new RangeError('Scala o passo fuori intervallo');
    if (o.q < 0 || o.q > o.flux * o.luminosity / o.sigma)
        throw new RangeError('Contrasto termico non ammissibile');
    for (const k of ['death', 'blackAlbedo', 'whiteAlbedo', 'groundAlbedo', 'fertile', 'initialBlack', 'initialWhite'])
        if (o[k] < 0 || o[k] > 1)
            throw new RangeError(k);
    if (o.initialBlack + o.initialWhite > o.fertile || o.fertile === 0)
        throw new RangeError('Copertura iniziale oltre la superficie fertile');
    if (!(o.blackAlbedo < o.groundAlbedo && o.groundAlbedo < o.whiteAlbedo))
        throw new RangeError('Richiesto A_scure < A_suolo < A_chiare');
    return o;
}
function growth(tempC, p = DEFAULTS) { return Math.max(0, 1 - p.curvature * (p.optimalC - tempC) ** 2); }
function environment(black, white, p = DEFAULTS) { const ground = 1 - black - white; const albedo = black * p.blackAlbedo + white * p.whiteAlbedo + ground * p.groundAlbedo; const t4 = p.flux * p.luminosity * (1 - albedo) / p.sigma; const temperatureK = Math.pow(Math.max(0, t4), .25); const blackK = Math.pow(Math.max(0, t4 + p.q * (albedo - p.blackAlbedo)), .25), whiteK = Math.pow(Math.max(0, t4 + p.q * (albedo - p.whiteAlbedo)), .25); const bareK = Math.pow(p.flux * p.luminosity * (1 - p.groundAlbedo) / p.sigma, .25); return { black, white, ground, albedo, temperatureK, temperatureC: temperatureK - 273.15, blackC: blackK - 273.15, whiteC: whiteK - 273.15, bareC: bareK - 273.15, absorbed: p.flux * p.luminosity * (1 - albedo), emitted: p.sigma * temperatureK ** 4 }; }
function derivative(black, white, p) { const e = environment(black, white, p), free = Math.max(0, p.fertile - black - white); return [black * (free * growth(e.blackC, p) - p.death), white * (free * growth(e.whiteC, p) - p.death)]; }
function rk4(b, w, p, dt = p.dt) {
    const k1 = derivative(b, w, p), k2 = derivative(b + k1[0] * dt / 2, w + k1[1] * dt / 2, p), k3 = derivative(b + k2[0] * dt / 2, w + k2[1] * dt / 2, p), k4 = derivative(b + k3[0] * dt, w + k3[1] * dt, p);
    let nb = Math.max(0, b + dt / 6 * (k1[0] + 2 * k2[0] + 2 * k3[0] + k4[0])), nw = Math.max(0, w + dt / 6 * (k1[1] + 2 * k2[1] + 2 * k3[1] + k4[1]));
    if (nb + nw > p.fertile + 1e-10)
        throw new Error('Passo numerico fuori dal simplesso');
    return [nb, nw];
}
function simulate(params = {}) {
    const p = validate(params);
    let b = p.initialBlack, w = p.initialWhite, trace = [{ t: 0, ...environment(b, w, p) }], steps = Math.ceil(p.duration / p.dt);
    const stride = Math.max(1, Math.floor(steps / 300));
    for (let i = 1; i <= steps; i++) {
        [b, w] = rk4(b, w, p, Math.min(p.dt, p.duration - (i - 1) * p.dt));
        if (i % stride === 0 || i === steps)
            trace.push({ t: Math.min(p.duration, i * p.dt), ...environment(b, w, p) });
    }
    const final = environment(b, w, p), residual = Math.max(...derivative(b, w, p).map(Math.abs));
    return { parameters: p, final, trace, residual, converged: residual < 1e-7, method: 'RK4', model: 'Daisyworld pedagogico, equazioni 1–6 di Watson & Lovelock (1983)', timeUnit: 'tempo del modello, non anni' };
}
function sweep(parameters = {}, count = 51) {
    if (!Number.isInteger(count) || count < 2 || count > 501)
        throw new RangeError('Numero di campioni non valido');
    return Array.from({ length: count }, (_, i) => { const L = .6 + i / (count - 1), r = simulate({ ...parameters, luminosity: L }); return { luminosity: L, ...r.final, converged: r.converged }; });
}

Object.assign(exports,{DEFAULTS,validate,growth,environment,derivative,rk4,simulate,sweep});
},
"src/models/math.js":(exports,__require)=>{
/**
 * Modelli matematici puri dei laboratori Mentat.
 * Le funzioni restituiscono numeri JavaScript: le approssimazioni numeriche sono
 * distinte dalle proprietà algebriche riportate nelle lezioni.
 */

function finite(value, label) {
  if (typeof value !== 'number' || !Number.isFinite(value)) {
    throw new TypeError(`${label} deve essere un numero finito.`);
  }
  return value;
}

const BASE_FUNCTIONS = Object.freeze({
  quadratic: Object.freeze({ label: 'Parabola', formula: 'x²', evaluate: x => x * x }),
  absolute: Object.freeze({ label: 'Valore assoluto', formula: '|x|', evaluate: x => Math.abs(x) }),
  sine: Object.freeze({ label: 'Seno', formula: 'sin(x)', evaluate: x => Math.sin(x) }),
});

function transformFunction(x, { base = 'quadratic', a = 1, b = 1, h = 0, k = 0 } = {}) {
  finite(x, 'x');
  for (const [label, value] of Object.entries({ a, b, h, k })) finite(value, label);
  if (!Object.hasOwn(BASE_FUNCTIONS, base)) throw new RangeError('Funzione di base sconosciuta.');
  return a * BASE_FUNCTIONS[base].evaluate(b * (x - h)) + k;
}

function rectangleModel(perimeter, x) {
  finite(perimeter, 'Il perimetro');
  finite(x, 'Il lato');
  if (perimeter <= 0) throw new RangeError('Il perimetro deve essere positivo.');
  if (!(x > 0 && x < perimeter / 2)) {
    throw new RangeError('Il lato deve appartenere all’intervallo aperto (0, P/2).');
  }
  const y = perimeter / 2 - x;
  const optimalSide = perimeter / 4;
  return {
    perimeter, x, y,
    area: x * y,
    maxArea: perimeter * perimeter / 16,
    optimalSide,
    deficit: (x - optimalSide) ** 2,
  };
}

/** Restituisce null quando il radicando è fuori dal dominio reale. */
function realNthRoot(value, index = 2) {
  finite(value, 'Il radicando');
  if (!Number.isInteger(index) || index < 2) throw new RangeError('L’indice deve essere un intero almeno pari a 2.');
  if (value < 0 && index % 2 === 0) return null;
  if (value === 0) return 0;
  return value < 0 ? -((-value) ** (1 / index)) : value ** (1 / index);
}

function radicalValue(x, { index = 2, h = 0, mode = 'root' } = {}) {
  finite(x, 'x');
  finite(h, 'h');
  if (mode === 'square') return Math.abs(x - h);
  if (mode !== 'root') throw new RangeError('Modalità del radicale sconosciuta.');
  return realNthRoot(x - h, index);
}

/**
 * Risolve a*x + b*y = c; d*x + e*y = f.
 * I confronti usano una tolleranza relativa dichiarata, adatta ai parametri dei
 * laboratori. I risultati unique includono i residui delle due equazioni.
 */
function solveLinearSystem(a, b, c, d, e, f, tolerance = 1e-12) {
  for (const [label, value] of Object.entries({ a, b, c, d, e, f, tolerance })) finite(value, label);
  if (tolerance < 0) throw new RangeError('La tolleranza non può essere negativa.');
  const determinant = a * e - b * d;
  const determinantScale = Math.max(Math.abs(a * e), Math.abs(b * d), Number.MIN_VALUE);
  const isZero = (value, scale = 1) => Math.abs(value) <= tolerance * Math.max(scale, Number.MIN_VALUE);
  if (!isZero(determinant, determinantScale)) {
    const x = (c * e - b * f) / determinant;
    const y = (a * f - c * d) / determinant;
    return { type: 'unique', determinant, x, y, residuals: [a * x + b * y - c, d * x + e * y - f] };
  }
  const row1Zero = a === 0 && b === 0;
  const row2Zero = d === 0 && e === 0;
  if ((row1Zero && c !== 0) || (row2Zero && f !== 0)) return { type: 'none', determinant };
  if (row1Zero || row2Zero) return { type: 'infinite', determinant };
  const cross1 = a * f - c * d;
  const cross2 = b * f - c * e;
  const consistent = isZero(cross1, Math.max(Math.abs(a * f), Math.abs(c * d)))
    && isZero(cross2, Math.max(Math.abs(b * f), Math.abs(c * e)));
  return { type: consistent ? 'infinite' : 'none', determinant };
}

function intersectLines(m1, q1, m2, q2) {
  return solveLinearSystem(-m1, 1, q1, -m2, 1, q2);
}

function exponentialReserve(initial, lossRate, time) {
  for (const [label, value] of Object.entries({ initial, lossRate, time })) finite(value, label);
  if (initial <= 0) throw new RangeError('La riserva iniziale deve essere positiva.');
  if (!(lossRate > 0 && lossRate < 1)) throw new RangeError('La frazione persa deve appartenere a (0, 1).');
  if (time < 0) throw new RangeError('Il tempo non può essere negativo.');
  return initial * Math.exp(time * Math.log1p(-lossRate));
}

function halfLife(lossRate) {
  finite(lossRate, 'La frazione persa');
  if (!(lossRate > 0 && lossRate < 1)) throw new RangeError('La frazione persa deve appartenere a (0, 1).');
  return Math.log(0.5) / Math.log1p(-lossRate);
}

function firstHalfLifePeriod(lossRate) {
  const time = halfLife(lossRate);
  // Evita di passare all’intero successivo per il solo arrotondamento di un
  // valore che, alla precisione di macchina, coincide con un intero.
  const nearest = Math.round(time);
  return Math.abs(time - nearest) <= 8 * Number.EPSILON * Math.max(1, time) ? nearest : Math.ceil(time);
}

/** Un denominatore nullo resta escluso anche dopo una cancellazione. */
function rationalValue(x, a, b, c) {
  for (const [label, value] of Object.entries({ x, a, b, c })) finite(value, label);
  if (x === c) return null;
  return ((x - a) * (x - b)) / (x - c);
}

function rationalSignAnalysis(a, b, c) {
  for (const [label, value] of Object.entries({ a, b, c })) finite(value, label);
  const values = [...new Set([a, b, c])].sort((x, y) => x - y);
  const boundaries = [-Infinity, ...values, Infinity];
  const intervals = boundaries.slice(0, -1).map((left, i) => {
    const right = boundaries[i + 1];
    const sample = left === -Infinity ? right - Math.max(1, Math.abs(right) * 0.1)
      : right === Infinity ? left + Math.max(1, Math.abs(left) * 0.1)
        : left + (right - left) / 2;
    return { left, right, sample, sign: Math.sign(rationalValue(sample, a, b, c)) };
  });
  const removable = c === a || c === b;
  const holeValue = removable ? (c === a ? c - b : c - a) : null;
  return {
    zeros: [...new Set([a, b])].filter(x => x !== c).sort((x, y) => x - y),
    excluded: c,
    removable,
    holeValue,
    intervals,
    points: values.map(x => ({ x, excluded: x === c, zero: x !== c && (x === a || x === b), multiplicity: Number(x === a) + Number(x === b) })),
  };
}

function niceTicks(min, max, target = 6) {
  finite(min, 'Il minimo');
  finite(max, 'Il massimo');
  if (!(max > min)) throw new RangeError('La finestra deve avere ampiezza positiva.');
  const rough = (max - min) / Math.max(2, target);
  const power = 10 ** Math.floor(Math.log10(rough));
  const fraction = rough / power;
  const step = (fraction <= 1 ? 1 : fraction <= 2 ? 2 : fraction <= 5 ? 5 : 10) * power;
  const ticks = [];
  for (let value = Math.ceil(min / step) * step; value <= max + step * 1e-10; value += step) {
    ticks.push(Math.abs(value) < step * 1e-10 ? 0 : Number(value.toPrecision(12)));
    if (ticks.length > 100) break;
  }
  return ticks;
}

Object.assign(exports,{BASE_FUNCTIONS,transformFunction,rectangleModel,realNthRoot,radicalValue,solveLinearSystem,intersectLines,exponentialReserve,halfLife,firstHalfLifePeriod,rationalValue,rationalSignAnalysis,niceTicks});
}};const __cache={};function __require(id){if(__cache[id])return __cache[id];const e={};__cache[id]=e;__modules[id](e,__require);return e}__require("src/app.js");})();