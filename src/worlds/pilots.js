/** The four prototype worlds. Each one is driven by the model of its unit (src/models/curriculum.js):
 * the same parameters as the laboratory produce the numbers in the panel and the objects in the scene.
 * The scenes are illustrations of the model, not simulations of a real planet. */
import { value, defaults, descriptor } from '../models/curriculum.js';
import { DEFAULTS as DAISY } from '../models/daisyworld.js';
import { fmtNum } from '../ui/toolkit.js';
import { daisy, grazer, tuft, disc, seaPlane, vent } from './geometry.js';

const clamp01 = x => Math.max(0, Math.min(1, x));
export function seeded(seed) { let a = seed >>> 0; return () => { a += 0x6D2B79F5; let t = a; t = Math.imul(t ^ t >>> 15, t | 1); t ^= t + Math.imul(t ^ t >>> 7, t | 61); return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }

/** Daisyworld: white and black cover giving the albedo A, with bare ground for the rest
 * (albedos 0,75, 0,25 and 0,5 as in the Daisyworld laboratory). Outside 0,25-0,75 the daisies
 * alone cannot reach A: `reachable` is false and the closest cover is shown. */
export function daisyCover(A, p = DAISY) {
    const mid = p.groundAlbedo, half = p.whiteAlbedo - mid, d = (A - mid) / half;
    const c = Math.min(1, Math.max(.8, Math.abs(d))), white = clamp01((c + d) / 2), black = clamp01((c - d) / 2);
    const albedo = white * p.whiteAlbedo + black * p.blackAlbedo + (1 - white - black) * p.groundAlbedo;
    return { white, black, ground: 1 - white - black, albedo, reachable: Math.abs(albedo - A) < 1e-9 };
}
/** Two-state equilibrium pink ⇌ blue: fraction of the blue form at temperature T, from K(T). */
export function blueFraction(T, p) { const K = value('chemistry-20', T, p); return K === null ? null : K / (1 + K); }
export const LAKE_TEMPERATURES = [288, 298, 308, 318, 328, 338, 348, 358, 368];
/** Tide: difference of the moon's field across the planet, proportional to μ/r³; 1 at μ = 10, r = 2. */
export function tideRatio(mu, r) { return (mu / 10) * Math.pow(2 / r, 3); }
/** Logistic map: states x₀…x_n with the unit model, and the long-run regime. */
export function logisticStates(p, n) { return Array.from({ length: n + 1 }, (_, k) => value('math-p08', k, p)); }
export function logisticRegime(a) {
    if (a <= 1) return { code: 'extinct', label: 'la popolazione si estingue' };
    let x = .2; for (let i = 0; i < 2000; i++) x = a * x * (1 - x);
    const seen = new Set(); for (let i = 0; i < 256; i++) { x = a * x * (1 - x); seen.add(x.toFixed(4)); }
    const n = seen.size;
    if (n === 1) return { code: 'stable', label: 'si stabilizza su un valore' };
    if (n <= 16) return { code: 'cycle', label: `oscilla fra ${n} valori` };
    return { code: 'chaos', label: 'cambia senza ripetersi (caos)' };
}

/** Land spots of a landing surface, away from the four stations, deterministic. */
function spots(surface, { count, seed, minDistance = 7, wet = false, filter = () => true }) {
    // Away from the stations and within the central area that the camera frames.
    const clear = c => surface.stations.every(st => Math.hypot(c.x - st.position[0], c.z - st.position[2]) > minDistance) && Math.hypot(c.x, c.z) < 46;
    const r = seeded(seed), cells = surface.grid.cells.filter(c => (wet ? c.wet : !c.wet) && clear(c) && filter(c)), out = [];
    if (!cells.length) return out;
    for (let k = 0; k < count; k++) { const c = cells[Math.floor(r() * cells.length)], j = surface.grid.radius * .8; out.push({ x: c.x + (r() - .5) * j, y: c.groundY, z: c.z + (r() - .5) * j, key: r(), cell: c }); }
    return out;
}
const pack = list => { const a = new Float32Array(list.length * 8); list.forEach((o, i) => a.set([o.x, o.y, o.z, o.s, o.r, o.g, o.b, o.h], i * 8)); return a; };
/** Smooth value noise in the plane, for patches of daisies. */
function patches(x, z) { return Math.sin(x * .17 + Math.sin(z * .11) * 1.7) * .5 + Math.sin(z * .21 - x * .07) * .35 + Math.sin((x + z) * .37) * .15; }

const WORLDS = {
    'biology-25': {
        focus: [12, 12],
        short: { a: 'A', x: 'L' },
        surface: 'simbiosi',
        x: { label: 'Luminosità L', unit: '', min: .6, max: 1.6, step: .05, value: 1 },
        state(p, x) { const cover = daisyCover(p.a), T = value('biology-25', x, p); return { A: p.a, L: x, T, ...cover }; },
        lines(s) {
            return [`Albedo A ${fmtNum(s.A, 2)} · margherite chiare ${Math.round(s.white * 100)}% · scure ${Math.round(s.black * 100)}% · suolo ${Math.round(s.ground * 100)}%`,
                `Temperatura radiativa ${fmtNum(s.T, 3)} °C con L = ${fmtNum(s.L, 3)}`,
                s.reachable ? 'Albedo del modello: 0,75 margherite chiare, 0,25 scure, 0,5 suolo.' : 'Le sole margherite non raggiungono questo albedo: è mostrata la copertura più vicina.'];
        },
        build(R, surface) { R.makeMesh('world-daisy', daisy()); this.spots = spots(surface, { count: 2200, seed: 2501 }).map(o => ({ ...o, score: patches(o.x, o.z) + (o.key - .5) * .35 })).sort((a, b) => b.score - a.score); this.key = ''; },
        update(R, s) {
            const key = s.white.toFixed(3) + s.black.toFixed(3); if (key === this.key) return; this.key = key;
            const n = this.spots.length, nw = Math.round(s.white * n), nb = Math.round(s.black * n), list = [];
            // Highest scores white, lowest black, so each colour forms patches; the middle stays bare.
            this.spots.forEach((o, i) => { const white = i < nw, black = i >= n - nb; if (!white && !black) return; const c = white ? [.96, .95, .9] : [.07, .05, .06]; list.push({ x: o.x, y: o.y - .1, z: o.z, s: 1.15 + o.key * .5, r: c[0], g: c[1], b: c[2], h: o.key * 6.283 }); });
            R.makeInstances('world-daisies', 'world-daisy', pack(list.length ? list : [{ x: 0, y: -50, z: 0, s: 0, r: 0, g: 0, b: 0, h: 0 }]));
        },
        draw(R, ctx) { R.drawMesh('world-daisy', ctx.vp, ctx.identity, { eye: ctx.eye, light: ctx.light, material: 10, instances: 'world-daisies', instanceMode: 1, motion: [0, 0, .05, 0], pbr: [0, .7, .04, 3] }); },
        orbitTint(s) { const k = .62 + .9 * s.albedo; return [k, k, k * .98, 1]; }
    },
    'chemistry-20': {
        focus: [16, 3],
        short: { a: 'K₀', b: 'ΔH' },
        surface: 'esodo',
        state(p) { return { lakes: LAKE_TEMPERATURES.map(T => ({ T, f: blueFraction(T, p) })), K0: p.a, dH: p.b }; },
        lines(s) {
            const cold = s.lakes[0], hot = s.lakes.at(-1);
            return [`K₀ = ${fmtNum(s.K0, 2)} a 298,15 K · ΔH = ${fmtNum(s.dH, 2)} kJ/mol`,
                `Lago a ${fmtNum(cold.T - 273.15, 3)} °C: forma blu ${Math.round(cold.f * 100)}% · lago a ${fmtNum(hot.T - 273.15, 3)} °C: forma blu ${Math.round(hot.f * 100)}%`,
                'Equilibrio a due forme rosa ⇌ blu, con K(T) del modello; i laghi più vicini alla bocca sono più caldi.'];
        },
        build(R, surface) {
            R.makeMesh('world-lake', disc(48)); R.makeMesh('world-vent', vent());
            // The vent sits on the far side of the stations; lakes follow it outwards, hottest first.
            const vx = 17, vz = 1, cells = surface.grid.cells.filter(c => !c.wet && surface.stations.every(st => Math.hypot(c.x - st.position[0], c.z - st.position[2]) > 8)).map(c => ({ c, d: Math.hypot(c.x - vx, c.z - vz) })).sort((a, b) => a.d - b.d);
            const ventCell = cells[0].c; this.vent = [ventCell.x, ventCell.groundY, ventCell.z]; this.lakes = [];
            for (const { c, d } of cells) { if (d < 4.5 || this.lakes.length === LAKE_TEMPERATURES.length) continue; if (this.lakes.every(o => Math.hypot(o.x - c.x, o.z - c.z) > 6.4)) this.lakes.push({ x: c.x, y: c.groundY + .12, z: c.z, radius: 2.6 + .3 * (this.lakes.length % 3) }); }
            const r = seeded(2020), steam = [];
            this.lakes.forEach((o, i) => { const hot = (LAKE_TEMPERATURES.length - 1 - i) / (LAKE_TEMPERATURES.length - 1); for (let k = 0; k < Math.round(3 + 22 * hot * hot); k++) steam.push({ x: o.x + (r() - .5) * o.radius, y: o.y + .1, z: o.z + (r() - .5) * o.radius, s: .9 + r() * .7, r: .92, g: .9, b: .88, h: r() * 6.283 }); });
            for (let k = 0; k < 40; k++) steam.push({ x: this.vent[0] + (r() - .5) * 1.4, y: this.vent[1] + 1.6, z: this.vent[2] + (r() - .5) * 1.4, s: .8 + r() * .7, r: .8, g: .78, b: .76, h: r() * 6.283 });
            R.makeInstances('world-steam', 'lowSphere', pack(steam)); this.key = '';
        },
        update(R, s) {
            const key = s.lakes.map(l => l.f.toFixed(3)).join(); if (key === this.key) return; this.key = key;
            const pink = [1, .42, .62], blue = [.1, .24, .95];
            // Lakes are listed from the vent outwards, so the hottest temperature goes to the first one.
            R.makeInstances('world-lakes', 'world-lake', pack(this.lakes.map((o, i) => { const f = s.lakes[LAKE_TEMPERATURES.length - 1 - i].f; return { x: o.x, y: o.y, z: o.z, s: o.radius, r: pink[0] + (blue[0] - pink[0]) * f, g: pink[1] + (blue[1] - pink[1]) * f, b: pink[2] + (blue[2] - pink[2]) * f, h: 0 }; })));
        },
        labels(s) { return this.lakes.map((o, i) => ({ position: [o.x, o.y + 1.4, o.z], T: s.lakes[LAKE_TEMPERATURES.length - 1 - i].T, f: s.lakes[LAKE_TEMPERATURES.length - 1 - i].f })).filter((_, i) => i % 4 === 0); },
        draw(R, ctx) {
            R.drawMesh('world-vent', ctx.vp, translate(this.vent, 1), { eye: ctx.eye, light: ctx.light, material: 10, pbr: [0, .9, .25, 4] });
            R.drawMesh('world-lake', ctx.vp, ctx.identity, { eye: ctx.eye, light: ctx.light, material: 18, instances: 'world-lakes', instanceMode: 1, opacity: .95 });
            R.drawMesh('lowSphere', ctx.vp, ctx.identity, { eye: ctx.eye, light: ctx.light, material: 19, instances: 'world-steam', instanceMode: 2, motion: [.1, 6.5, .8, 0], opacity: .3 });
        }
    },
    'physics-12': {
        short: { a: 'μ', x: 'r' },
        surface: 'marea', hidesWater: true,
        // A low camera keeps a band of sky above the horizon, where the moon passes.
        camera: { pitch: .12, distance: 58, targetY: 3.2 },
        x: { label: 'Distanza della luna r', unit: 'm', min: .5, max: 5, step: .25, value: 2 },
        state(p, x, t) {
            const ratio = tideRatio(p.a, x), height = Math.min(2.6, .55 * ratio), period = 26 * Math.sqrt(Math.pow(x / 2, 3) * 10 / p.a), angle = (t / period) * Math.PI * 2;
            return { mu: p.a, r: x, ratio, height, capped: .55 * ratio > 2.6, period, angle, level: -.12 - height * Math.cos(2 * angle), g: value('physics-12', x, p) };
        },
        lines(s) {
            return [`μ = ${fmtNum(s.mu, 3)} · r = ${fmtNum(s.r, 3)} · campo della luna g(r) = μ/r² = ${fmtNum(s.g, 3)}`,
                `Marea ${fmtNum(s.ratio, 3)} volte quella con μ = 10 e r = 2${s.capped ? ' (in scena limitata)' : ''}: la differenza del campo fra i due lati del pianeta cresce come μ/r³.`,
                'Due alte maree per ogni passaggio della luna; tempi e altezze sono in scala illustrativa.'];
        },
        build(R) { R.makeMesh('world-sea', seaPlane(700, 700, 175, 175)); },
        update() {},
        draw(R, ctx, s, textures) {
            // Moon across the sky; apparent size grows as the moon gets closer.
            // The moon crosses the sky band right of the title, from right to left; it is below the
            // horizon for half of each turn. Apparent size grows as the moon gets closer (1/r).
            const a = s.angle, up = Math.sin(a);
            if (up > -.05) {
                const fx = ctx.target[0] - ctx.eye[0], fz = ctx.target[2] - ctx.eye[2], l = Math.hypot(fx, fz), f = [fx / l, fz / l], side = [-f[1], f[0]], az = .22 + Math.cos(a) * .2, d = 190;
                const dir = [f[0] * Math.cos(az) + side[0] * Math.sin(az), f[1] * Math.cos(az) + side[1] * Math.sin(az)], size = Math.min(26, 11 / s.r);
                const moon = [ctx.eye[0] + dir[0] * d, ctx.eye[1] + Math.tan(-.03 + up * .12) * d, ctx.eye[2] + dir[1] * d];
                R.drawMesh('sphere', ctx.vp, translate(moon, size), { eye: ctx.eye, light: [-dir[0], .35, -dir[1]], material: 12, texture: textures.moon });
            }
            R.drawMesh('world-sea', ctx.vp, ctx.identity, { eye: ctx.eye, light: ctx.light, material: 18, tint: [.16, .52, .6, 1], motion: [s.level, .22, 0, 0], opacity: .97 });
        }
    },
    'math-p08': {
        focus: [10, 6],
        short: { a: 'a', b: 'x₀' },
        surface: 'marea',
        state(p, x, t, paused) {
            const season = paused ? 0 : Math.floor(t / 2.6) % 41, states = logisticStates(p, season), xn = states.at(-1);
            return { a: p.a, x0: p.b, season, xn, animals: Math.round(xn * 90), recent: states.slice(-6), regime: logisticRegime(p.a) };
        },
        lines(s) {
            return [`Stagione ${s.season}: x = ${fmtNum(s.xn, 3)}, ${s.animals} animali su 90 posti · a = ${fmtNum(s.a, 2)}, x₀ = ${fmtNum(s.x0, 2)}`,
                `Ultime stagioni: ${s.recent.map(v => Math.round(v * 90)).join(' · ')} · a lungo andare ${s.regime.label}`,
                'x_(n+1) = a x_n (1 − x_n): l’erba brucata in una stagione limita gli animali della successiva.'];
        },
        build(R, surface) {
            R.makeMesh('world-grazer', grazer()); R.makeMesh('world-tuft', tuft());
            const r = seeded(808), front = c => c.x > -30 && c.z > -20, herd = spots(surface, { count: 90, seed: 808, filter: front }).map(o => ({ x: o.x, y: o.y - .05, z: o.z, s: 1.8 + r() * .5, r: .82 + r() * .14, g: .66 + r() * .14, b: .5 + r() * .12, h: r() * 6.283 }));
            R.makeInstances('world-herd', 'world-grazer', pack(herd)); this.grass = spots(surface, { count: 520, seed: 909 }); this.key = '';
        },
        update(R, s) {
            const key = s.season + ':' + s.xn.toFixed(4); if (key === this.key) return; this.key = key;
            // Grass grows back where few animals grazed in the previous season.
            const grazed = s.recent.length > 1 ? s.recent.at(-2) : s.xn, height = .65 + .9 * (1 - grazed);
            R.makeInstances('world-grass', 'world-tuft', pack(this.grass.map(o => ({ x: o.x, y: o.y - .05, z: o.z, s: height * (.7 + o.key * .6), r: .42 + .2 * grazed, g: .62 - .12 * grazed, b: .24, h: o.key * 6.283 }))));
        },
        draw(R, ctx, s) {
            R.drawMesh('world-tuft', ctx.vp, ctx.identity, { eye: ctx.eye, light: ctx.light, material: 10, instances: 'world-grass', instanceMode: 1, motion: [0, 0, .08, 0], pbr: [0, .8, .02, 3] });
            R.drawMesh('world-grazer', ctx.vp, ctx.identity, { eye: ctx.eye, light: ctx.light, material: 10, instances: 'world-herd', instanceMode: 3, count: s.animals, motion: [.16, 1.6, 0, 0], pbr: [0, .75, .03, 4] });
        }
    }
};
function translate(p, s) { return new Float32Array([s, 0, 0, 0, 0, s, 0, 0, 0, 0, s, 0, p[0], p[1], p[2], 1]); }
export const PILOT_UNITS = Object.keys(WORLDS);
export function pilotWorld(unit) { return WORLDS[unit] || null; }
/** Parameters of the unit: the saved laboratory parameters when present, otherwise the defaults. */
export function worldParameters(unit, record) {
    const p = defaults(unit), saved = record?.parameters || {};
    for (const c of descriptor(unit).controls) if (Number.isFinite(saved[c.key]) && saved[c.key] >= c.min && saved[c.key] <= c.max) p[c.key] = saved[c.key];
    return p;
}
