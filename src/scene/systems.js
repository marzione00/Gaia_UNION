import { PLANET_TYPES } from './planet-types.js';
export const MIN_STARS = 1000000;
export const SYSTEM_COUNT = 25;
export const SYSTEM_SCALE = .0025;
/** Thematic areas: one galaxy arm per discipline, one star system per area, units in study order.
 * Indices refer to the catalogue order (0-24 mathematics, 25-49 physics, 50-74 chemistry, 75-99 biology). */
export const DISCIPLINE_NAMES = Object.freeze(['Matematica', 'Fisica', 'Chimica', 'Biologia']);
export const AREAS = Object.freeze([
    { key:'mat-numeri', sector:0, name:'Numeri e ragionamento', units:[0, 13, 12, 17] },
    { key:'mat-algebra', sector:0, name:'Algebra ed equazioni', units:[1, 2, 3, 4, 11, 15] },
    { key:'mat-funzioni', sector:0, name:'Funzioni e variazione', units:[7, 5, 16, 20] },
    { key:'mat-geometria', sector:0, name:'Geometria e trasformazioni', units:[10, 6, 8, 14, 18] },
    { key:'mat-probabilita', sector:0, name:'Probabilità e dati', units:[9, 19, 22] },
    { key:'mat-scienze', sector:0, name:'Matematica per le scienze', units:[21, 23, 24] },
    { key:'fis-moto', sector:1, name:'Misura e moto', units:[25, 26, 27, 28, 29] },
    { key:'fis-forze', sector:1, name:'Forze ed energia', units:[30, 31, 32, 33] },
    { key:'fis-gravita', sector:1, name:'Rotazioni e gravità', units:[34, 35, 36, 37] },
    { key:'fis-onde', sector:1, name:'Fluidi, oscillazioni e onde', units:[38, 39, 40, 41] },
    { key:'fis-termo', sector:1, name:'Calore e termodinamica', units:[42, 43, 44] },
    { key:'fis-elettro', sector:1, name:'Elettromagnetismo e quanti', units:[45, 46, 47, 48, 49] },
    { key:'chi-atomi', sector:2, name:'Materia e atomi', units:[50, 51, 52, 53, 54] },
    { key:'chi-legami', sector:2, name:'Legami e molecole', units:[55, 56, 57, 58] },
    { key:'chi-stati', sector:2, name:'Stati e soluzioni', units:[59, 60, 61, 62] },
    { key:'chi-reazioni', sector:2, name:'Reazioni e quantità', units:[63, 64, 65] },
    { key:'chi-equilibrio', sector:2, name:'Velocità ed equilibrio', units:[66, 67, 68, 69] },
    { key:'chi-acidi', sector:2, name:'Acidi, redox e carbonio', units:[70, 71, 72, 73, 74] },
    { key:'bio-cellula', sector:3, name:'La cellula', units:[75, 76, 77] },
    { key:'bio-energia', sector:3, name:'Energia della vita', units:[78, 79, 80] },
    { key:'bio-ereditarieta', sector:3, name:'Divisione ed ereditarietà', units:[81, 82, 83] },
    { key:'bio-geni', sector:3, name:'Geni e mutazioni', units:[84, 85, 86] },
    { key:'bio-evoluzione', sector:3, name:'Evoluzione', units:[87, 88, 89, 90, 91] },
    { key:'bio-popolazioni', sector:3, name:'Popolazioni e comunità', units:[92, 93, 94, 95] },
    { key:'bio-ecosistemi', sector:3, name:'Ecosistemi e regolazione', units:[96, 97, 98, 99] }
]);
const AREA_OF_UNIT = new Array(100).fill(0);
AREAS.forEach((area, id) => area.units.forEach(index => { AREA_OF_UNIT[index] = id; }));
export const systemForPlanet = index => AREA_OF_UNIT[Math.max(0, Math.min(99, Math.floor(Number(index) || 0)))];
export const indicesForSystem = index => [...(AREAS[Math.max(0, Math.min(SYSTEM_COUNT - 1, Math.floor(Number(index) || 0)))].units)];
export const areaOf = index => AREAS[systemForPlanet(index)];
/** Position of a unit inside its area, counted from 1, and the area's unit count. */
export function unitPlace(index) { const area = areaOf(index); return { position: area.units.indexOf(index) + 1, count: area.units.length }; }
// Planet families tied to the landing surfaces of the four web lessons and to the prototype units:
// a glacial world for logic, a volcanic one for molecular shapes, a living one for Mendel's greenhouse.
const UNIT_ANCHORS = { 1:'oceanic', 2:'desert', 3:'volcanic', 7:'terrestrial', 0:'arctic', 57:'volcanic', 83:'terrestrial' };

export const SYSTEM_SEED = 0x47414941;
const architectureCache=new Map();
export function seededRandom(seed) { let a=seed>>>0;return ()=>{a+=0x6D2B79F5;let t=a;t=Math.imul(t^t>>>15,t|1);t^=t+Math.imul(t^t>>>7,t|61);return ((t^t>>>14)>>>0)/4294967296;}; }
function shuffled(values,rng){const a=[...values];for(let i=a.length-1;i>0;i--){const j=Math.floor(rng()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
export function systemArchitecture(id,seed=SYSTEM_SEED){
 const key=seed+':'+id;if(architectureCache.has(key))return architectureCache.get(key);
 const units=indicesForSystem(id),rng=seededRandom(seed^Math.imul(id+1,0x9E3779B1)),count=Math.min(12,Math.max(units.length+1,5+Math.floor(rng()*8))),starRadius=.65+rng()*.65;
 const slots=shuffled(Array.from({length:count},(_,i)=>i),rng).slice(0,units.length).sort((a,b)=>a-b);
 const solid=shuffled(['terrestrial','oceanic','desert','barren','arctic','volcanic'],rng);
 // Keep the established landing biomes of the introductory lessons, each on its own unit.
 units.forEach((index,k)=>{const anchor=UNIT_ANCHORS[index];if(anchor&&k<solid.length){const at=solid.indexOf(anchor);[solid[k],solid[at]]=[solid[at],solid[k]];}});
 let orbit=2.25+starRadius,bodies=[];
 const extras=['gas','ringed','icegiant','rocky','arctic','volcanic','acid','desert'];let extraIndex=0;
 for(let slot=0;slot<count;slot++){
  const sector=slots.indexOf(slot),explorable=sector>=0,type=explorable?solid[sector%solid.length]:extras[(id+extraIndex++)%extras.length],profile=PLANET_TYPES[type];
  const radius=profile.solid?.30+rng()*.25:.62+rng()*.29;
  orbit+=radius+(bodies.at(-1)?.radius||.2)+.55+rng()*.6;
  const phase=rng()*Math.PI*2,tilt=(rng()-.5)*.9,inclination=(rng()-.5)*.24,eccentricity=rng()*.012;
  bodies.push({id:'s'+id+'-p'+slot,slot,system:id,index:explorable?units[sector]:null,sector:explorable?AREAS[id].sector:-1,order:sector,explorable,type,profile,
   orbit,radius,phase,tilt,inclination,eccentricity,node:rng()*Math.PI*2,speed:(.16+rng()*.03)/Math.pow(orbit,1.18),spin:(rng()<.15?-1:1)*(.016+rng()*.04),rotation:rng()*Math.PI*2,
   moons:Math.floor(rng()*(profile.solid?3:5)),rings:type==='ringed'||(!profile.solid&&rng()<.25)});
 }
 const result={id,seed,count,bodies,starRadius,outerRadius:orbit+bodies.at(-1).radius*2,architecture:count>=10?'Affollato':count<=6?'Rado':bodies.some(p=>Math.abs(p.inclination)>.1)?'Inclinato':'Misto'};
 architectureCache.set(key,result);return result;
}
export function bodyAtTime(body,time=0){
 const mean=body.phase+time*body.speed;let eccentric=mean;
 for(let i=0;i<3;i++)eccentric-=(eccentric-body.eccentricity*Math.sin(eccentric)-mean)/(1-body.eccentricity*Math.cos(eccentric));
 const x=body.orbit*(Math.cos(eccentric)-body.eccentricity),z=body.orbit*Math.sqrt(1-body.eccentricity**2)*Math.sin(eccentric),c=Math.cos(body.node),s=Math.sin(body.node),zz=z*Math.cos(body.inclination);
 return {...body,position:[x*c-zz*s,z*Math.sin(body.inclination),x*s+zz*c]};
}

// Choose stars that already exist in the million-point buffer. No extra marker stars.
export function buildSystems(stars, modules) {
    if (stars.length < MIN_STARS * 7) throw Error('La galassia richiede almeno 1.000.000 di stelle');
    const used = new Set(), systems = [];
    for (let id = 0; id < SYSTEM_COUNT; id++) {
        // Each discipline follows its own spiral arm, from the core outwards in study order.
        const area = AREAS[id], peers = AREAS.filter(a => a.sector === area.sector), step = peers.indexOf(area);
        const radius = 12 + step * 22 / Math.max(1, peers.length - 1), angle = area.sector * Math.PI / 2 + 1.85 * Math.log(radius + 1);
        const target = [Math.cos(angle) * radius, Math.sin(id * 1.7) * .4, Math.sin(angle) * radius];
        let best = -1, score = Infinity;
        for (let index = 11; index < stars.length / 7; index += 19) {
            if (used.has(index)) continue;
            const j = index * 7, x = stars[j], y = stars[j + 1], z = stars[j + 2];
            if (Math.abs(y) > 2) continue;
            const distance = (x-target[0])**2 + (y-target[1])**2*2 + (z-target[2])**2;
            if (distance < score && systems.every(s => (x-s.position[0])**2 + (z-s.position[2])**2 > 15)) { score = distance; best = index; }
        }
        if (best < 0) throw Error('Impossibile associare un sistema a una stella');
        used.add(best); const j = best * 7, planets = indicesForSystem(id), titles = planets.map(i => modules?.[i]?.title).filter(Boolean);
        const layout=systemArchitecture(id),discipline=DISCIPLINE_NAMES[area.sector];
        systems.push({...layout,id, starIndex:best, name:area.name, key:area.key, sector:area.sector, discipline, step:step+1, steps:peers.length, position:Array.from(stars.slice(j,j+3)), color:Array.from(stars.slice(j+3,j+6)), planets,
            description:discipline+', area '+(step+1)+' di '+peers.length+'. '+planets.length+' unità: '+titles.join(', ')+'.',
            available:planets.filter(i => modules?.[i]?.status !== 'planned').length});
    }
    return systems;
}
export function highlightSystemStars(stars, systems) {
    for (const s of systems) stars[s.starIndex * 7 + 6] = 11;
    return stars;
}
export function systemPlanet(index, time = 0) {
    const body=systemArchitecture(systemForPlanet(index)).bodies.find(p=>p.index===index);
    if(!body)throw Error('Pianeta esplorabile non trovato: '+index);
    return bodyAtTime(body,time);
}

export function pickProjected(projections,x,y) {
    return projections.filter(p => p.depth > 0 && Math.hypot(p.x-x,p.y-y) <= p.r)
        .sort((a,b) => (Math.hypot(a.x-x,a.y-y)/a.r - Math.hypot(b.x-x,b.y-y)/b.r) || a.depth-b.depth)[0] || null;
}

export class HoverTarget {
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
