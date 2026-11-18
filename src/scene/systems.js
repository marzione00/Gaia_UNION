/** Star systems of the galaxy: the bodies drawn in src/scene/layout.js placed at physical distances
 * (src/worlds/physics.js), the galaxy stars that host them and the picking helpers of the scene. */
import { AREAS, DISCIPLINE_NAMES, SYSTEM_COUNT, SYSTEM_SEED, systemBodies, indicesForSystem, systemForPlanet } from './layout.js';
import { dwarf, subtypeOf, placeBodies, FAMILIES } from '../worlds/physics.js';
import { starTypes, planetCards } from '../worlds/genome.js';
export { DISCIPLINE_NAMES, AREAS, SYSTEM_COUNT, UNIT_COUNT, systemForPlanet, indicesForSystem, areaOf, unitPlace, SYSTEM_SEED, seededRandom, systemBodies } from './layout.js';
export const MIN_STARS = 1000000;
export const SYSTEM_SCALE = .0025;

/** Star of system `id`: the systems sharing a star type take its subtypes in order, from the hottest. */
export function systemStar(id) {
    const types = starTypes(), type = types[id], peers = types.flatMap((t, i) => t === type ? [i] : []);
    return { type, ...dwarf(subtypeOf(type, peers.indexOf(id), peers.length)) };
}
/** Drawn scale of the orbits: system units per e-fold of physical distance. */
export const LOG_SCALE = 2.2;
const architectureCache = new Map();
/** Bodies of system `id` sorted by physical distance. Each keeps its drawn parameters and gains `a` (au);
 * the drawn orbit grows with the logarithm of `a`, never closer than the old spacing between two bodies.
 * The planets' atmospheres come from their identity cards (the default seed only). */
export function systemArchitecture(id, seed = SYSTEM_SEED) {
    const key = seed + ':' + id; if (architectureCache.has(key)) return architectureCache.get(key);
    const base = systemBodies(id, seed), star = systemStar(id), cards = seed === SYSTEM_SEED ? planetCards() : null;
    const density = b => cards ? cards[b.index].atmosphere.density : (FAMILIES[b.type].density[0] + FAMILIES[b.type].density[1]) / 2;
    const placed = placeBodies(star, base.bodies.map(b => ({ type: b.type, explorable: b.explorable, radius: b.radius, density: b.explorable ? density(b) : undefined })));
    const order = base.bodies.map((b, i) => i).sort((i, j) => placed.a[i] - placed.a[j]);
    let orbit = 2.25 + base.starRadius, prev = null;
    const bodies = order.map((i, slot) => {
        const b = base.bodies[i], a = placed.a[i], gap = b.radius + (prev?.radius || .2) + .55 + b.gap * .6;
        orbit += prev ? Math.max(gap, LOG_SCALE * Math.log(a / prev.a)) : gap;
        return prev = { ...b, slot, a, orbit, speed: b.pace / Math.pow(orbit, 1.18) };
    });
    const result = { ...base, bodies, star, outerRadius: orbit + bodies.at(-1).radius * 2, placementScore: placed.score };
    architectureCache.set(key, result); return result;
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
