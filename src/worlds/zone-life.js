/** Flora and fauna of the biomes over the whole zone (1.72.0). Every biome of a planet with life has its own
 * assemblage: its endemic species (src/worlds/species.js, endemicSpecies), drawn four times as often as the
 * others, and the species of the planet whose habitat the biome offers (LIFE in src/worlds/biomes.js); the
 * biome of the planet's own style hosts every species of the planet. Plants and groups of animals are placed in
 * the chunks of 64 × 64 units that also carry the rocks of the biomes: the share of plants follows the biome,
 * the density of the air and a noise that gathers them in patches; animals come in herds, pairs or flocks.
 * The square of the stations keeps the individuals placed by populate. Animals of the zone wander around the
 * place where they were set, with pauses, and flyers circle above it. */
import { LIFE, BASE_LIFE, CHUNK, hash3 } from './biomes.js';
import { noiseField } from './terrain.js';
import { FORMS } from './species.js';

/** Candidate points for plants in a chunk, and the share of chunks with a group of animals at most. */
export const PLANTS_MOST = 72, GROUP_SHARE = .6;
/** Weight of an endemic species in the assemblage of its biome, against 1 for the other species. */
export const ENDEMIC_WEIGHT = 4;
const smooth = (a, b, x) => { const t = Math.max(0, Math.min(1, (x - a) / (b - a))); return t * t * (3 - 2 * t); };
const GRAZERS = new Set(['pascolatore', 'saltatore']);

/** Assemblages of the biomes of surface s: for each biome of the planet, its plants and animals as pairs
 * [index in `population`, weight], its share of plants and its chance of a group of animals. `population` holds
 * the species of the planet followed by its endemic species, as {species}. */
export function assemblages(s, population) {
    const g = s.genome, B = s.field.biomes(), air = .35 + .65 * Math.min(1, g.atmosphere.density * 1.6);
    return B.types.map((b, t) => {
        const L = t === 0 ? null : LIFE[b.id], base = BASE_LIFE[g.family], habitats = L ? L.habitats : null, plants = [], animals = [], sea = [];
        population.forEach((p, k) => {
            const sp = p.species, list = sp.kind === 'animal' ? animals : plants;
            if (sp.biome) { if (sp.biome === b.id) list.push([k, ENDEMIC_WEIGHT]); return; }
            if (sp.habitat === 'mare') { sea.push([k, 1]); return; }
            if (!habitats || habitats.includes(sp.habitat)) list.push([k, 1]);
        });
        return { id: b.id, plants, animals, sea, flora: (L ? L.flora : base.flora) * air, fauna: L ? L.fauna : base.fauna };
    });
}
const pick = (list, u) => { const sum = list.reduce((a, [, w]) => a + w, 0); let x = u * sum; for (const [k, w] of list) { x -= w; if (x < 0) return k; } return list.at(-1)[0]; };

/** Individuals of the chunk (ci, cj): plants at up to PLANTS_MOST points, kept with the share of plants of the
 * biome there and a patch noise, on dry ground that is not too steep (near the sea for the species of the
 * shore); then at most one group of animals, on land or, for floating colonies, on the sea. Each item has the
 * index k of its species and the 8 numbers of an instance; animals also have the centre and pace of their
 * wandering. Nothing falls in the square of the stations (|x|, |z| ≤ 120). */
export function chunkLife(s, population, A, ci, cj) {
    const out = []; if (!population.length) return out;
    const B = s.field.biomes(), seed = s.genome.terrain.seed % 1000003, sea = s.seaY, N = (s.lifeNoise ||= noiseField(s.genome.terrain.seed ^ 0x9A7C4));
    const slope = (x, z) => Math.hypot(s.heightAt(x + 1, z) - s.heightAt(x - 1, z), s.heightAt(x, z + 1) - s.heightAt(x, z - 1)) / 2;
    const fits = (sp, x, z, y) => {
        if (Math.max(Math.abs(x), Math.abs(z)) <= 120) return false;
        if (sp.habitat === 'mare') return sea !== null && y < sea - .8;
        if (sea !== null && y <= sea + .3) return false;
        if (sp.habitat === 'riva' && !sp.biome && (sea === null || y > sea + 2.4)) return false;
        return slope(x, z) <= .85;
    };
    const item = (k, x, y, z, u, v, h) => { const sp = population[k].species, tone = .86 + .28 * v; return { k, x, y, z, s: sp.size * (.78 + .44 * u), r: Math.min(1, sp.color[0] * tone), g: Math.min(1, sp.color[1] * tone), b: Math.min(1, sp.color[2] * tone), h }; };
    const dominant = (x, z) => { const w = B.weights(x, z); let t = 0; for (let q = 1; q < w.length; q++) if (w[q] > w[t]) t = q; return t; };
    for (let q = 0; q < PLANTS_MOST; q++) {
        const h = m => hash3(ci * 1013 + q, cj * 1019 + m, seed ^ 0x51A7), x = (ci + h(1)) * CHUNK, z = (cj + h(2)) * CHUNK;
        if (Math.max(Math.abs(x), Math.abs(z)) <= 120) continue;
        const a = A[dominant(x, z)]; if (!a.plants.length) continue;
        const patch = smooth(.3, .7, N.fbm(x / 48, z / 48, 2));
        if (h(3) >= a.flora * (.3 + 1.4 * patch)) continue;
        const k = pick(a.plants, h(4)), sp = population[k].species, y = s.heightAt(x, z);
        if (!fits(sp, x, z, y)) continue;
        out.push(item(k, x, y - .05, z, h(5), h(6), h(7) * 6.283));
    }
    // One group of animals at most: a herd of grazers (3 to 6), a pair of predators, a flock (3 to 5) or a few others.
    const h = m => hash3(ci * 1031 + 7, cj * 1033 + m, seed ^ 0xFA07), x = (ci + .2 + .6 * h(1)) * CHUNK, z = (cj + .2 + .6 * h(2)) * CHUNK, a = A[dominant(x, z)];
    const y0 = s.heightAt(x, z), wet = sea !== null && y0 < sea - .8, list = wet ? a.sea : a.animals;
    if (list.length && h(3) < (wet ? .5 : a.fauna) * GROUP_SHARE) {
        const k = pick(list, h(4)), sp = population[k].species, n = sp.role === 'predatore' ? 1 + Math.floor(h(5) * 2) : GRAZERS.has(sp.form) ? 3 + Math.floor(h(5) * 4) : 2 + Math.floor(h(5) * 3);
        for (let m = 0; m < n; m++) {
            const e = c => hash3(ci * 1039 + m, cj * 1049 + c, seed ^ 0xBEA57), ang = e(1) * 6.283, d = Math.sqrt(e(2)) * 5, px = x + Math.cos(ang) * d, pz = z + Math.sin(ang) * d, y = s.heightAt(px, pz);
            if (!fits(sp, px, pz, y)) continue;
            const fly = sp.form === 'volatore', float = sp.form === 'medusa', alt = fly ? 9 + 6 * e(3) : 0;
            const o = item(k, px, float ? sea + .05 : y - .05 + alt, pz, e(4), e(5), e(6) * 6.283);
            // Wandering: a circle of 2 to 6 units around the place (12 to 20 for flyers), walked at the pace of
            // grazing with pauses; drifting colonies turn slowly where they are.
            Object.assign(o, { home: [px, pz], radius: fly ? 12 + 8 * e(7) : float ? 2 : 2 + 4 * e(7), pace: fly ? 3 : float ? .2 : .25 + .45 * e(8), phase: e(9) * 6.283, rest: e(10) * 6.283, alt, fly, float });
            out.push(o);
        }
    }
    return out;
}

/** Moves the wandering animals `items` of surface s to time t (seconds): each goes round its circle with a pace
 * that falls to zero every 30 s or so, so it walks and stops; the gait (0 still, 1 walking, 2 flying) moves the
 * legs and the wings. Returns whether anything moved. */
export function wander(s, items, t) {
    const sea = s.seaY;
    for (const o of items) {
        const w = o.pace / o.radius, arc = o.fly || o.float ? w * t + o.phase : w * (t + Math.sin(.21 * t + o.rest) / .21) + o.phase;
        const speed = o.fly || o.float ? o.pace : o.pace * (1 + Math.cos(.21 * t + o.rest)), x = o.home[0] + Math.cos(arc) * o.radius, z = o.home[1] + Math.sin(arc) * o.radius;
        const ground = s.heightAt(x, z);
        if (!o.fly && !o.float && sea !== null && ground <= sea + .3) { o.gait = 0; continue; }
        o.x = x; o.z = z; o.y = o.float ? sea + .05 : ground - .05 + o.alt; o.h = Math.atan2(-Math.cos(arc), -Math.sin(arc));
        o.gait = o.fly ? 2 : o.float ? 0 : speed > .15 ? 1 : 0;
    }
    return items.length > 0;
}

/** Forms whose individuals stand on the ground, for the tests. */
export const STANDING = Object.freeze(Object.keys(FORMS).filter(f => f !== 'volatore' && f !== 'medusa'));
