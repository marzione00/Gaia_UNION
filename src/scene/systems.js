import { PLANET_TYPES } from './planet-types.js';
export const MIN_STARS = 1000000;
export const SYSTEM_COUNT = 25;
export const SYSTEM_SCALE = .0025;
export const systemForPlanet = index => Math.max(0, Math.min(99, Math.floor(index))) % SYSTEM_COUNT;
export const indicesForSystem = index => [0, 1, 2, 3].map(sector => sector * SYSTEM_COUNT + index);

export const SYSTEM_SEED = 0x47414941;
const architectureCache=new Map();
export function seededRandom(seed) { let a=seed>>>0;return ()=>{a+=0x6D2B79F5;let t=a;t=Math.imul(t^t>>>15,t|1);t^=t+Math.imul(t^t>>>7,t|61);return ((t^t>>>14)>>>0)/4294967296;}; }
function shuffled(values,rng){const a=[...values];for(let i=a.length-1;i>0;i--){const j=Math.floor(rng()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
export function systemArchitecture(id,seed=SYSTEM_SEED){
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
