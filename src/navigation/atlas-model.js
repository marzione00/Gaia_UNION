/** Deterministic atlas navigation. No renderer, network, or inferred learning credit. */
import { systemForPlanet, AREAS, SYSTEM_COUNT } from '../scene/systems.js';
export const DISCIPLINES = ['Matematica', 'Fisica', 'Chimica', 'Biologia'];
export const TEXT_SCALES = [1, 1.2, 1.4];
export const normalize = value => String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('it').trim();
const integer = (n, min, max) => Number.isInteger(n) && n >= min && n <= max;
const safeId = id => typeof id === 'string' && /^(math-(?:c\d{2}|p\d{2}|a|b)|(?:physics|chemistry|biology)-\d{2})$/.test(id);
export function cleanAtlas(value = {}) {
    return {
        version: 2,
        textScale: TEXT_SCALES.includes(value?.textScale) ? value.textScale : 1,
        contrast: value?.contrast === true,
        visited: value?.version === 2 && Array.isArray(value?.visited) ? [...new Set(value.visited.filter(n => integer(n, 0, SYSTEM_COUNT - 1)))].slice(0,SYSTEM_COUNT) : [],
        recent: Array.isArray(value?.recent) ? [...new Set(value.recent.filter(safeId))].slice(0,12) : [],
        lastUnit: safeId(value?.lastUnit) ? value.lastUnit : null,
        guideDone: value?.guideDone === true,
        showLabels: value?.showLabels !== false
    };
}
export function searchModules(modules, query = '', sector = -1, path = null) {
    const words = normalize(query).split(/\s+/).filter(Boolean);
    const allowed = path ? new Set(path.units) : null;
    const found = modules.filter(m => (sector < 0 || m.sector === sector) && (!allowed || allowed.has(m.id)))
        .map(m => {
            const area = AREAS[systemForPlanet(m.planetIndex)].name;
            const title = normalize(m.title), hay = normalize([area, m.code, m.id, m.title, m.description, DISCIPLINES[m.sector], ...(m.tags || [])].join(' '));
            return { module: m, match: words.every(w => hay.includes(w)), rank: words.reduce((n,w) => n + (title.includes(w) ? 3 : 0), 0) };
        }).filter(r => r.match);
    return found.sort((a,b) => b.rank - a.rank || (path ? path.units.indexOf(a.module.id) - path.units.indexOf(b.module.id) : a.module.planetIndex - b.module.planetIndex)).map(r => r.module);
}
export function unitStatus(module, data) {
    const record = data.courses?.[module.id];
    if (record?.completedAt && record?.completionSignature) return { code: 'complete', label: 'Percorso completato' };
    if (record?.snapshots?.A || record?.snapshots?.B) return { code: 'experiment', label: 'Esperimento registrato' };
    if (record && (record.stage > 0 || Object.keys(record.answers || {}).length || data.notes?.['course:' + module.id]?.trim())) return { code: 'started', label: 'Percorso iniziato' };
    return data.atlas?.visited?.includes(systemForPlanet(module.planetIndex)) ? { code: 'visited', label: 'Sistema visitato' } : { code: 'new', label: 'Da esplorare' };
}
export function rememberVisit(data, module, enteredSystem = false) {
    data.atlas = cleanAtlas(data.atlas);
    const system = systemForPlanet(module.planetIndex);
    if (enteredSystem && !data.atlas.visited.includes(system)) data.atlas.visited.push(system);
    data.atlas.recent = [module.id, ...data.atlas.recent.filter(id => id !== module.id)].slice(0,12);
    data.atlas.lastUnit = module.id;
}
export function atlasLayout(w, h, scale = 1) {
    const short = h < 600, compact = w < (short ? 700 : 950), pad = w < 500 ? 12 : 20;
    const header = w < 850 ? 106 : 90;
    // One toolbar row; the map controls float inside the map instead of a full-width bar.
    const toolbar = { x: pad, y: header, w: w - pad * 2, h: 50 };
    const top = toolbar.y + toolbar.h + 8, bottom = h - 44;
    const card = compact ? { x:pad, y:bottom - (h < 650 ? 144 : 188), w:w-pad*2, h:h < 650 ? 144 : 188 }
        : { x:w - Math.min(420, w*.34) - pad, y:top, w:Math.min(420, w*.34), h:bottom - top };
    const map = compact ? {x:pad, y:top, w:w-pad*2, h:Math.max(50, card.y-top-8)}
        : {x:pad, y:top, w:card.x-pad-12, h:bottom-top};
    const legendW = Math.min(compact || map.w < 560 ? 86 : 130, (map.w - 18) / 4) * 4 + 18, controlsW = 4 * 44 + 72 + 4 * 6;
    // Beside the legend when both fit on the bottom row, otherwise in the top right corner.
    const low = legendW + controlsW + 16 <= map.w;
    const controls = { x: map.x + map.w - controlsW - (low ? 0 : 8), y: low ? map.y + map.h - 48 : map.y + 8, w: controlsW, h: 44 };
    const sheetY=short?12:header;
    const sheet = { x:pad, y:sheetY, w:w-pad*2, h:Math.max(160, h-sheetY-20) };
    return { compact, short, pad, toolbar, controls, card, map, sheet, scale };
}
export const contains = (r,x,y) => !!r && x >= r.x && y >= r.y && x <= r.x+r.w && y <= r.y+r.h;
export const overlaps = (a,b,gap=0) => a.x < b.x+b.w+gap && a.x+a.w+gap > b.x && a.y < b.y+b.h+gap && a.y+a.h+gap > b.y;
/** Greedy stable labels: selected/focused systems get first choice, never move the star. */
export function placeLabels(points, bounds, selected, measure, radius=22, nameOf=index=>AREAS[index]?.name||'', blocked=[], show=()=>true) {
    const result = [], occupied = [...points.filter(p=>p.depth>0).map(p=>({x:p.x-radius,y:p.y-radius,w:radius*2,h:radius*2})),...blocked];
    const sorted = [...points].filter(p=>p.depth>0 && contains(bounds,p.x,p.y) && (p.index===selected || show(p.index))).sort((a,b)=>(b.index===selected)-(a.index===selected)||a.index-b.index);
    for (const p of sorted) {
        const text = nameOf(p.index), w=measure(text)+10, h=22;
        const positions = [[p.x+radius+4,p.y-11],[p.x-w-radius-4,p.y-11],[p.x-w/2,p.y-radius-h-4],[p.x-w/2,p.y+radius+4]];
        for (const [x,y] of positions) {
            const r={x,y,w,h};
            if(!contains(bounds,x,y)||!contains(bounds,x+w,y+h)||occupied.some(o=>overlaps(r,o,3)))continue;
            result.push({...r,text,index:p.index});occupied.push(r);break;
        }
    }
    return result;
}
export function edgeIndicator(point, bounds) {
    if (!point || !Number.isFinite(point.x) || !Number.isFinite(point.y)) return null;
    const cx=bounds.x+bounds.w/2,cy=bounds.y+bounds.h/2;
    if(point.depth>0&&contains(bounds,point.x,point.y))return null;
    let dx=point.x-cx,dy=point.y-cy;
    if(point.depth<=0){dx=-dx;dy=-dy;}
    if(Math.abs(dx)+Math.abs(dy)<1e-6)dy=-1;
    const rx=Math.max(6,bounds.w/2-28),ry=Math.max(6,bounds.h/2-28),k=Math.min(rx/(Math.abs(dx)||1e-9),ry/(Math.abs(dy)||1e-9));
    return {x:cx+dx*k,y:cy+dy*k,angle:Math.atan2(dy,dx)};
}
export function routeSystems(path, modules) {
    const lookup = new Map(modules.map(m=>[m.id,systemForPlanet(m.planetIndex)]));
    return (path?.units || []).map(id=>lookup.get(id)).filter((n,i,a)=>Number.isInteger(n)&&(i===0||a[i-1]!==n));
}
export const GUIDE = [
    { title:'1 / Quattro bracci, quattro discipline', text:'Ogni braccio è una disciplina: ambra la matematica, azzurro la fisica, viola la chimica, verde la biologia. Ogni esagono è un\u2019area: pieno se l\u2019hai visitata, con un arco per le unità completate. Le linee sono i passaggi scoperti leggendo.', target:'map' },
    { title:'2 / Scegli una disciplina', text:'Questi quattro pulsanti evidenziano un braccio, ne mostrano i nomi delle aree e limitano la ricerca a quella disciplina. Toccalo di nuovo per vederle tutte.', target:'legend' },
    { title:'3 / Apri un\u2019unità', text:'La scheda elenca le unità dell\u2019area selezionata. Scegline una e premi \u00abApri l\u2019unità\u00bb, oppure \u00abSistema 3D\u00bb per visitare i pianeti.', target:'card' },
    { title:'4 / Cerca per nome', text:'\u00abCerca\u00bb trova un argomento scrivendone il nome, per esempio \u00abgas\u00bb o \u00abgenetica\u00bb, e porta la mappa sulla sua area.', target:'list' },
    { title:'5 / Percorsi e ripresa', text:'\u00abPercorsi\u00bb collega unità di discipline diverse. \u00abRiprendi\u00bb riapre le ultime unità studiate su questo dispositivo. La guida si riapre da \u00abGuida\u00bb.', target:'routes' }
];
/** Frame the galaxy inside the usable map rectangle, without moving any star. */
export function galaxyCamera(s,w,h) {
    const map=s.atlasViewport,center=Array.isArray(s.atlasTarget)&&s.atlasTarget.length===3&&s.atlasTarget.every(Number.isFinite)?s.atlasTarget:[0,0,0];
    const distance=s.distance*(map?Math.max(1,h*.72/Math.max(100,map.w)):1),yaw=s.yaw,pitch=s.pitch;
    const direction=[Math.sin(yaw)*Math.cos(pitch),Math.sin(pitch),Math.cos(yaw)*Math.cos(pitch)];
    const right=[Math.cos(yaw),0,-Math.sin(yaw)],up=[-Math.sin(yaw)*Math.sin(pitch),Math.cos(pitch),-Math.cos(yaw)*Math.sin(pitch)];
    const perPixel=2*distance*Math.tan(.84/2)/h,dx=map?(map.x+map.w/2-w/2)*perPixel:0,dy=map?(map.y+map.h/2-h/2)*perPixel:0;
    const target=center.map((v,i)=>v-right[i]*dx+up[i]*dy);
    return {target,eye:target.map((v,i)=>v+direction[i]*distance)};
}
