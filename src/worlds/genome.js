/** "Carta d'identità" of each explorable planet: a deterministic set of parameters derived from what the
 * planet already has (family, size, moons, rings, spin, tilt, area) plus a star type for its system.
 * Everything that makes a world look different (terrain, sea, sky, light, colours, events) comes from here,
 * so the orbit view and the surface stay consistent. Values are illustrative, not astronomical data. */
import { systemArchitecture, systemForPlanet, AREAS, seededRandom } from '../scene/systems.js';

/** Star types, with an approximate colour of the light (sRGB) and a plant pigment chosen for contrast. */
export const STARS = Object.freeze({
    M: { name: 'nana rossa', light: [1, .62, .38], pigment: [.22, .1, .2] },
    K: { name: 'nana arancione', light: [1, .78, .56], pigment: [.55, .16, .12] },
    G: { name: 'nana gialla', light: [1, .95, .86], pigment: [.2, .5, .18] },
    F: { name: 'stella bianco-gialla', light: [.97, .97, 1], pigment: [.62, .5, .12] },
    A: { name: 'stella bianco-azzurra', light: [.82, .88, 1], pigment: [.12, .42, .5] }
});
/** Terrain styles available to each planet family. */
export const STYLES = Object.freeze({
    terrestrial: ['colline', 'terrazze', 'pianura'],
    oceanic: ['arcipelago', 'atollo', 'fiordi'],
    desert: ['dune', 'canyon', 'mesa'],
    barren: ['crateri', 'altopiano', 'dorsali'],
    arctic: ['ghiacciai', 'banchisa', 'criovulcani'],
    volcanic: ['vulcani', 'colate', 'caldera']
});
export const STYLE_NAMES = Object.freeze({ colline: 'Colline e fiumi', terrazze: 'Altopiani a terrazze', pianura: 'Pianura alluvionale', arcipelago: 'Arcipelago', atollo: 'Atolli e lagune', fiordi: 'Fiordi', dune: 'Mare di dune', canyon: 'Canyon', mesa: 'Mese e altipiani', crateri: 'Pianura di crateri', altopiano: 'Altopiano fratturato', ghiacciai: 'Valli glaciali', banchisa: 'Banchisa', criovulcani: 'Criovulcani', dorsali: 'Dorsali e scarpate', vulcani: 'Campo vulcanico', colate: 'Colate laviche', caldera: 'Caldera con lago' });
/** Atmosphere by family: [minimum, maximum] density from 0 (none) to 1 (dense). */
const ATMOSPHERE = { terrestrial: [.4, .75], oceanic: [.45, .85], desert: [.05, .4], barren: [0, .06], arctic: [.15, .5], volcanic: [.5, .95] };
/** Sea level as a fraction of the relief, by family. */
const SEA = { terrestrial: [.25, .48], oceanic: [.5, .7], desert: [0, .18], barren: [0, .05], arctic: [.2, .5], volcanic: [.05, .25] };
const ROCK = { terrestrial: [.42, .38, .32], oceanic: [.4, .4, .38], desert: [.72, .45, .28], barren: [.45, .44, .42], arctic: [.55, .58, .62], volcanic: [.18, .16, .16] };
// Prototype worlds keep the terrain their phenomenon needs (src/worlds/pilots.js).
const PILOT_STYLES = { 20: 'atollo', 36: 'arcipelago', 69: 'vulcani', 99: 'colline' };

/** One star type per system: a balanced set of the five types, shuffled with a fixed seed. */
export function starTypes() {
    const r = seededRandom(0x53544152), list = Array.from({ length: 25 }, (_, i) => 'MKGFA'[i % 5]);
    for (let i = list.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [list[i], list[j]] = [list[j], list[i]]; }
    return list;
}
const between = (r, [a, b]) => a + (b - a) * r();
const hueOf = ([r, g, b]) => { const max = Math.max(r, g, b), min = Math.min(r, g, b), d = max - min; if (d < 1e-6) return 0; const h = max === r ? ((g - b) / d) % 6 : max === g ? (b - r) / d + 2 : (r - g) / d + 4; return (h * 60 + 360) % 360; };
function shiftHue([r, g, b], deg) {
    const a = deg * Math.PI / 180, k = 1 / Math.sqrt(3), c = Math.cos(a), s = Math.sin(a), dot = k * (r + g + b);
    const cross = [k * (b - g), k * (r - b), k * (g - r)];
    return [r, g, b].map((v, i) => Math.max(0, Math.min(1, v * c + cross[i] * s + k * dot * (1 - c))));
}
/** Sky colour seen from the surface: none = black, thin = dusty star light, dense = scattered blue mixed with the star. */
function skyColor(light, density, haze) {
    const blue = [.32, .52, .86], dust = light.map(v => v * .55);
    return [0, 1, 2].map(i => +(((1 - density) * dust[i] * Math.min(1, density * 4) + density * (blue[i] * (1 - haze) + light[i] * haze) * .9)).toFixed(3));
}

/** Candidate genome of planet `index` at attempt `k` (attempts change only the free parameters). */
function candidate(index, k, stars) {
    const system = systemForPlanet(index), body = systemArchitecture(system).bodies.find(b => b.index === index), family = body.type;
    const r = seededRandom((index + 1) * 0x9E3779B1 + k * 0x85EBCA6B), star = stars[system], S = STARS[star];
    // Attempts cycle through the styles of the family, so a crowded style can be avoided.
    const options = STYLES[family], style = PILOT_STYLES[index] || options[(index + k) % options.length];
    const density = +between(r, ATMOSPHERE[family]).toFixed(3), haze = +r().toFixed(3);
    const pigment = shiftHue(S.pigment, (r() - .5) * 50).map(v => +v.toFixed(3)), rock = shiftHue(ROCK[family], (r() - .5) * 40).map(v => +v.toFixed(3));
    return {
        index, system, area: AREAS[system].name, family, style,
        terrain: { style, relief: +(.45 + r() * .55).toFixed(3), roughness: +(.35 + r() * .6).toFixed(3), seaLevel: +between(r, SEA[family]).toFixed(3), seed: Math.floor(r() * 1e9) },
        star: { type: star, name: S.name, light: S.light },
        atmosphere: { density, haze, sky: skyColor(S.light, density, haze), clouds: +(density > .15 ? .2 + r() * .6 * density : 0).toFixed(3) },
        gravity: +(body.radius / .42).toFixed(3),
        day: { length: +(Math.PI * 2 / Math.abs(body.spin)).toFixed(1), tilt: +(body.tilt * 180 / Math.PI).toFixed(1) },
        satellites: { moons: body.moons, rings: body.rings },
        palette: { pigment, rock, water: shiftHue([.08, .3, .42], (r() - .5) * 70).map(v => +v.toFixed(3)) },
        magnetosphere: body.radius > .38 ? r() < .75 : r() < .3,
        events: []
    };
}
function withEvents(g) {
    const e = [];
    if (g.magnetosphere && g.atmosphere.density > .1) e.push('aurora');
    if (g.satellites.moons > 0) e.push('eclissi');
    if (g.atmosphere.density > .6) e.push('tempesta');
    if (g.atmosphere.density < .1) e.push('pioggia di meteore');
    if (['arctic', 'volcanic'].includes(g.family)) e.push('eruzione di geyser');
    return { ...g, events: e };
}
/** Normalised distance between two genomes, from 0 (identical) to about 1. */
export function genomeDistance(a, b) {
    const hue = (x, y) => { const d = Math.abs(hueOf(x) - hueOf(y)) % 360; return Math.min(d, 360 - d) / 180; };
    const parts = [
        [.22, a.terrain.style !== b.terrain.style ? 1 : 0], [.1, a.family !== b.family ? 1 : 0], [.1, a.star.type !== b.star.type ? 1 : 0],
        [.12, Math.abs(a.terrain.seaLevel - b.terrain.seaLevel) / .7], [.1, Math.abs(a.terrain.relief - b.terrain.relief) / .55], [.08, Math.abs(a.terrain.roughness - b.terrain.roughness) / .6],
        [.1, hue(a.palette.pigment, b.palette.pigment)], [.1, Math.abs(a.atmosphere.density - b.atmosphere.density)], [.08, Math.abs(a.gravity - b.gravity) / .6]
    ];
    return parts.reduce((s, [w, v]) => s + w * Math.min(1, v), 0);
}
/** Target used while generating, and the minimum guaranteed by the tests over all 4.950 pairs. */
export const TARGET_DISTANCE = .2, MIN_DISTANCE = .17;
/** Genomes of the 100 explorable planets, in planet-index order. Each planet is regenerated (up to 160
 * attempts) until it is at least TARGET_DISTANCE from every planet already generated, keeping the
 * most distant attempt otherwise. */
export function buildGenomes(count = 100) {
    const stars = starTypes(), out = [];
    for (let index = 0; index < count; index++) {
        let best = null, bestD = -1;
        for (let k = 0; k < 160; k++) {
            const g = withEvents(candidate(index, k, stars)), d = out.length ? Math.min(...out.map(o => genomeDistance(o, g))) : 1;
            if (d > bestD) { best = g; bestD = d; }
            if (d >= TARGET_DISTANCE) break;
        }
        out.push(best);
    }
    return out;
}
