/** Body plans of the species (1.63.0): every species of a planet gets its own shape, built from a small set
 * of numbers (its plan) drawn from the identity card of the planet and from the seed of the species. A plan
 * fixes the form (tree, grazer, hexapod...), its proportions, the number of parts (blades, fronds, branches,
 * legs, segments) and two colours besides the colour of the species. The same plan gives a detailed mesh,
 * drawn near the camera, and a light one, drawn further away. Plants and animals of the same form therefore
 * differ from planet to planet in shape as well as in colour. These are illustrative shapes: the proportions
 * follow the gravity of the card (taller and slimmer under low gravity), the rest is variety. */
import { sphereMesh } from '../renderer.js';
import { tubePath } from '../education/geometry.js';
import { shaped } from './geometry.js';
import { Shape, curve, profile, noise, V3, WHITE } from './organic.js';
const { add, mul, cross, unit } = V3, TAU = Math.PI * 2;

/** Detail of the two levels: segments of the spheres and sides of the tubes, and the share of repeated parts. */
export const LEVELS = Object.freeze([{ sphere: [9, 6], small: [6, 4], tiny: [5, 3], wide: [18, 8], mid: [12, 6], tube: 6, share: 1 }, { sphere: [6, 4], small: [4, 2], tiny: [4, 2], wide: [10, 4], mid: [7, 3], tube: 3, share: .5 }]);
const spheres = new Map(), sphere = (u, v) => spheres.get(u * 100 + v) || (spheres.set(u * 100 + v, sphereMesh(u, v)), spheres.get(u * 100 + v));
const round = x => Math.round(x * 1000) / 1000;
/** Meshes of 12 floats per vertex joined in one, with typed arrays. */
export function merge(parts) {
    let nv = 0, ni = 0;
    for (const p of parts) { nv += p.v.length; ni += p.i.length; }
    const v = new Float32Array(nv), i = new Uint32Array(ni);
    let ov = 0, oi = 0;
    for (const p of parts) { v.set(p.v, ov); const base = ov / 12; for (let k = 0; k < p.i.length; k++) i[oi + k] = p.i[k] + base; ov += p.v.length; oi += p.i.length; }
    return { v, i, stride: 12 };
}
const tube = (points, r, sides, color) => shaped(tubePath(points, r, sides), { color });
const blob = (L, scale, move, color, turn = 0, tilt = 0, small = false) => shaped(sphere(...(typeof small === 'string' ? L[small] : small ? L.small : L.sphere)), { scale, move, turn, tilt, color });
/** Leaf of length `length` from point `at`, raised by `-tilt` (lowered when `tilt` is positive), turned by `turn`. */
const leaf = (L, length, width, tilt, turn, at) => shaped(shaped(sphere(...L.small), { scale: [width, .035, length / 2], move: [0, 0, length / 2] }), { tilt, turn, move: at, color: WHITE });
const count = (n, L) => Math.max(1, Math.round(n * L.share));
const shade = (c, k) => [...c.slice(0, 3).map(x => Math.max(0, Math.min(1, x * k))), 1];

/** The plan of a species of form `form`: `r` is its random source, `card` the identity card of the planet. */
export function bodyPlan(form, r, card) {
    const g = card.gravity, tall = Math.pow(1 / g, .25), u = () => round(r()), pick = list => list[Math.floor(r() * list.length)];
    const dark = shade(card.palette.rock, .45 + r() * .3), accent = [...[0, 1, 2].map(() => round(.35 + r() * .6)), 1];
    const base = { form, dark: dark.map(round), accent };
    switch (form) {
        case 'ciuffo': return { ...base, blades: 6 + Math.floor(r() * 9), height: round((.5 + r() * .7) * tall), curl: u(), spread: round(.12 + r() * .25) };
        case 'felce': return { ...base, fronds: 5 + Math.floor(r() * 5), length: round(.6 + r() * .6), width: round(.12 + r() * .14), rise: round(.25 + r() * .5), heart: u() };
        case 'canneto': return { ...base, stems: 5 + Math.floor(r() * 7), height: round((1.2 + r() * 1.3) * tall), plume: u() };
        case 'albero': return { ...base, crown: pick(['ombrello', 'cono', 'sfere', 'salice', 'palma']), height: round((1.8 + r() * 2.2) * tall), trunk: round(.09 + r() * .1), bend: round((r() - .5) * .5), layers: 1 + Math.floor(r() * 3), width: round(.9 + r() * .8) };
        case 'arbusto': return { ...base, clumps: 3 + Math.floor(r() * 4), height: round((.5 + r() * .6) * tall), width: round(.4 + r() * .4), berries: r() < .5 };
        case 'colonna': return { ...base, ribs: 5 + Math.floor(r() * 8), height: round((1.2 + r() * 1.4) * tall), girth: round(.22 + r() * .16), arms: Math.floor(r() * 4), flower: r() < .6 };
        case 'cuscino': return { ...base, shoots: 4 + Math.floor(r() * 6), width: round(.45 + r() * .35), height: round((.22 + r() * .18) * tall) };
        case 'calice': return { ...base, tubes: 3 + Math.floor(r() * 4), height: round((.6 + r() * .7) * tall), plume: round(.12 + r() * .1) };
        case 'crosta': return { ...base, lobes: 3 + Math.floor(r() * 5), bumps: 3 + Math.floor(r() * 6) };
        case 'fungo': return { ...base, caps: 1 + Math.floor(r() * 4), height: round((.4 + r() * .9) * tall), cap: round(.25 + r() * .3), shape: pick(['piatto', 'cupola', 'cono']) };
        case 'pascolatore': return { ...base, length: round(.55 + r() * .25), height: round((.6 + r() * .4) * tall), neck: round(.1 + r() * .45), legs: round((.3 + r() * .3) * tall), thick: round(.04 + .03 * g + r() * .02), horns: Math.floor(r() * 3), crest: r() < .35, tail: round(.1 + r() * .3) };
        case 'cacciatore': return { ...base, length: round(.7 + r() * .3), height: round((.45 + r() * .2) * tall), legs: round((.25 + r() * .2) * tall), thick: round(.04 + .025 * g), tail: round(.4 + r() * .4), jaw: round(.12 + r() * .1) };
        case 'bipede': return { ...base, height: round((.9 + r() * .5) * tall), head: round(.14 + r() * .1), arms: round(.1 + r() * .2), tail: round(.4 + r() * .5), thick: round(.06 + .03 * g), crest: r() < .5 };
        case 'saltatore': return { ...base, height: round((.6 + r() * .4) * tall), ears: round(.1 + r() * .25), tail: round(.25 + r() * .3), legs: round((.35 + r() * .2) * tall) };
        case 'esapode': return { ...base, segments: 2 + Math.floor(r() * 2), size: round(.8 + r() * .5), legs: round((.35 + r() * .25) * tall), antennae: round(.15 + r() * .25), shell: r() < .5 };
        case 'ottopode': return { ...base, body: round(.2 + r() * .12), legs: round((.45 + r() * .3) * tall), spread: round(.5 + r() * .3), eyes: 2 + 2 * Math.floor(r() * 3) };
        case 'serpentino': return { ...base, segments: 7 + Math.floor(r() * 8), width: round(.1 + r() * .08), wave: round(.08 + r() * .14), legs: r() < .5 };
        case 'volatore': return { ...base, span: round((.55 + r() * .45) * Math.pow(g, .25)), body: round(.35 + r() * .15), tail: round(.1 + r() * .25), crest: r() < .4 };
        case 'medusa': return { ...base, dome: round(.45 + r() * .25), sail: round(.2 + r() * .3), tentacles: 4 + Math.floor(r() * 5), drop: round(.6 + r() * .7) };
    }
    throw new Error('Forma senza piano corporeo: ' + form);
}

/** Mesh of plan `p` at level `level` (0 detailed, 1 light): vertices of 12 floats, white where the colour of
 * the species goes. Animals face +x; the wings of flyers lie along z, where the shader flaps them. Since
 * 1.67.0 bodies are swept along a spine with a profile of radii, limbs are tapered tubes through their joints,
 * trees branch and carry irregular masses of foliage, and leaves, blades and fronds are thin folded strips. */
export function bodyMesh(p, level = 0) {
    const S = new Shape(level), D = p.dark, A = p.accent, low = level > 0, ring = (n, k, off = 0) => k * TAU / n + off;
    const lerp = V3.lerp, below = (k, c0 = WHITE, c1 = D) => i => i < k ? c0 : c1;
    // A body: control points of the spine, half heights and half widths at each of them.
    const body = (ctrl, ry, rz, sides, color = WHITE, per = 3) => { const pts = curve(ctrl, S.n(per, 2)), K = ctrl.length - 1, fy = profile(ry.map((v, i) => [i / K, v])), fz = profile(rz.map((v, i) => [i / K, v])); S.tube(pts, t => [fy(t), fz(t)], sides, color, { capStart: true, capEnd: true }); };
    // A limb through its joints, from radius r0 to r1, with the lower `dark` share in colour D.
    const limb = (joints, r0, r1, dark = .5, sides = 7) => { const pts = curve(joints, S.n(2, 1)); S.tube(pts, t => r0 + (r1 - r0) * t, sides, (i => i >= (pts.length - 1) * (1 - dark) ? D : WHITE)); };
    const eye = (c, r = .022, color = [.04, .04, .05, 1]) => { if (!low) S.ellipsoid(c, [r, r, r], 6, 4, color); };
    const leaf = (base, dir, side, length, width, color = WHITE, droop = .3, rows = 5) => { const pts = []; for (let i = 0; i <= S.n(rows, 3); i++) { const t = i / S.n(rows, 3); pts.push(add(add(base, mul(dir, t * length)), [0, -droop * length * t * t, 0])); } S.ribbon(pts, t => width * Math.sin(Math.PI * Math.min(1, .08 + t * .92)) ** .7, side, color, { fold: .25 }); };
    // Foliage: an irregular mass, flattened, with lobes that break the outline of the ellipsoid.
    const foliage = (c, ax, seed, color = WHITE, u = 11, w = 7) => S.ellipsoid(c, ax, u, w, color, d => 1 + .16 * Math.sin(d[0] * 5.1 + seed) * Math.sin(d[2] * 4.3 - seed) + .1 * Math.sin(d[1] * 7 + seed * 2) + .08 * (noise(Math.round(d[0] * 3), Math.round(d[2] * 3) + seed) - .5));
    switch (p.form) {
        case 'ciuffo': {
            const n = low ? Math.min(5, p.blades) : p.blades;
            for (let k = 0; k < n; k++) {
                const a = ring(n, k, .3), d = p.spread * (.4 + .6 * ((k * 7) % 5) / 5), h = p.height * (.7 + .3 * ((k * 3) % 4) / 4), o = [Math.cos(a), 0, Math.sin(a)], side = [-o[2], 0, o[0]], lean = .35 + .5 * p.curl;
                const pts = curve([mul(o, d * .2), add(mul(o, d * .5), [0, h * .5, 0]), add(mul(o, d * (1 + lean)), [0, h * .92, 0]), add(mul(o, d * (1.3 + lean * 1.6)), [0, h * (.95 - .25 * p.curl), 0])], S.n(2, 1));
                S.ribbon(pts, t => .035 * (1 - t * .85), side, i => i ? WHITE : D, { fold: .3 });
            }
            break;
        }
        case 'felce': {
            const n = S.n(p.fronds, 4);
            for (let k = 0; k < n; k++) {
                const a = ring(n, k), o = [Math.cos(a), 0, Math.sin(a)], side = [-o[2], 0, o[0]], L = p.length * (.85 + .15 * (k % 2)), rise = p.rise + .15 * (k % 2);
                const pts = curve([[0, .06, 0], add(mul(o, L * .35), [0, .06 + rise * L * .55, 0]), add(mul(o, L * .75), [0, .06 + rise * L * .5, 0]), add(mul(o, L), [0, .06 + rise * L * .15, 0])], S.n(3, 2));
                // Pinnae: the frond widens and narrows with a saw tooth along its edge.
                S.ribbon(pts, t => p.width * Math.sin(Math.PI * Math.min(1, .05 + t)) ** .8 * (low ? 1 : .8 + .4 * ((Math.round(t * 24)) % 2)), side, WHITE, { fold: .35 });
            }
            if (p.heart > .4 && !low) { const pts = []; for (let i = 0; i <= 12; i++) { const t = i / 12, a = t * TAU * 1.2, r = .09 * (1 - t * .8); pts.push([Math.cos(a) * r * .3, .1 + .12 * t + Math.sin(a) * r, Math.sin(a) * r * .2]); } S.tube(pts, t => .025 * (1 - t * .6), 5, A); }
            break;
        }
        case 'canneto': {
            const n = Math.min(low ? 4 : 8, p.stems);
            for (let k = 0; k < n; k++) {
                const a = ring(n, k, 1.1), d = .08 + .1 * (k % 3), o = [Math.cos(a), 0, Math.sin(a)], h = p.height * (.75 + .25 * ((k * 5) % 4) / 4), tip = add(mul(o, d * 1.6 + .08), [0, h, 0]);
                const stem = curve([mul(o, d), add(mul(o, d * 1.25), [0, h * .55, 0]), tip], S.n(3, 1)); S.tube(stem, t => .024 * (1 - t * .5), 4, i => i ? WHITE : D, { capEnd: false });
                for (const q of low ? [] : [.3 + .2 * (k % 2)]) { const at = stem[Math.round(q * (stem.length - 1))], dir = unit(add(o, [Math.sin(a + q * 9) * .6, .8, Math.cos(a + q * 9) * .6])); leaf(at, dir, unit(cross(dir, [0, 1, 0])), h * .45, .03, WHITE, .5, 4); }
                if (p.plume > .3 && (!low || k % 2 === 0)) S.ellipsoid(add(tip, [0, .1 + .05 * p.plume, 0]), [.04 + .03 * p.plume, .12 + .1 * p.plume, .04 + .03 * p.plume], 5, 3, k % 2 ? A : WHITE, dd => 1 + .15 * Math.sin(dd[1] * 9 + k));
            }
            break;
        }
        case 'albero': {
            const H = p.height, top = [p.bend * H * .3, H, 0], W = p.width * 1.2;
            const trunk = curve([[0, 0, 0], [p.bend * H * .1, H * .4, 0], [p.bend * H * .25, H * .75, .02], top], S.n(3, 2));
            S.tube(trunk, t => p.trunk * (1 + .7 * Math.max(0, 1 - t * 6) ** 2) * (1 - .45 * t), 7, D, { capEnd: false });
            if (!low) for (let k = 0; k < 4; k++) { const a = k * 1.7 + .4, o = [Math.cos(a), 0, Math.sin(a)]; S.tube(curve([add(mul(o, p.trunk * .5), [0, H * .06, 0]), add(mul(o, p.trunk * 1.6), [0, .02, 0]), add(mul(o, p.trunk * 2.6), [0, -.04, 0])], 1), t => p.trunk * .45 * (1 - t * .8), 4, D); }
            // Branches from the upper trunk towards the crown; `ends` keeps where they arrive.
            const branch = (from, to, r, lift = .15) => { S.tube(curve([from, add(lerp(from, to, .5), [0, lift, 0]), to], S.n(2, 1)), t => r * (1 - .6 * t), low ? 3 : 5, D, { capEnd: !low }); return to; };
            const at = t => trunk[Math.round(t * (trunk.length - 1))];
            if (p.crown === 'ombrello') {
                const n = S.n(5, 2);
                for (let k = 0; k < n; k++) { const a = ring(n, k, .5), o = [Math.cos(a), 0, Math.sin(a)]; branch(at(.72), add(top, add(mul(o, W * .5), [0, .08, 0])), p.trunk * .55, .2); }
                for (let k = 0; k < p.layers; k++) { const m = low ? 1 : p.layers > 1 ? 3 : 4; for (let q = 0; q < m; q++) { const a = q * TAU / m + k, d = m > 1 ? W * (1 - k * .28) * .42 : 0; foliage([top[0] + Math.cos(a) * d, H + .14 + k * .26 + .05 * (q % 2), top[2] + Math.sin(a) * d], [W * (1 - k * .28) * (m > 1 ? .62 : 1), .27 - .04 * k, W * (1 - k * .28) * (m > 1 ? .56 : .92)], k * 3.1 + q * 1.7 + H, WHITE, 9, 6); } }
            } else if (p.crown === 'cono') {
                const n = p.layers + 2, step = H * .66 / n;
                for (let k = 0; k < n; k++) {
                    const w = W * .62 * (1 - k / (n + .5)), y0 = H * .34 + k * step, y1 = y0 + step * 1.35, cx = top[0] * (.4 + .6 * k / n), M = S.n(14, 7);
                    const ringAt = (r, y, jag = 0) => Array.from({ length: M }, (_, j) => { const a = j / M * TAU, rr = r * (1 + jag * (j % 2 ? -1 : 1)); return [cx + Math.cos(a) * rr, y, Math.sin(a) * rr]; });
                    S.surface([ringAt(.02, y1), ringAt(w * .55, y0 + step * .55), ringAt(w, y0 - step * .15, .12), ringAt(w * .35, y0 + step * .2)], WHITE, { capEnd: true });
                }
            } else if (p.crown === 'sfere') {
                const n = 3 + p.layers;
                for (let k = 0; k < n; k++) { const a = k * 2.2, o = [Math.cos(a), 0, Math.sin(a)], end = add(top, add(mul(o, .4 * W), [0, .12 * (k % 2), 0])); if (!low || k < 2) branch(at(.7 + .05 * (k % 3)), end, p.trunk * .5); foliage(add(end, [0, .12, 0]), [.36 * W, .28 * W, .36 * W], k * 1.9); }
            } else if (p.crown === 'salice') {
                foliage([top[0], H + .05, top[2]], [.72 * W, .48, .72 * W], H);
                const n = S.n(14, 6);
                for (let k = 0; k < n; k++) { const a = ring(n, k, .2), o = [Math.cos(a), 0, Math.sin(a)], s = add(top, add(mul(o, (.4 + .25 * (k % 3) / 2) * W), [0, -.15, 0])), drop = H * (.3 + .35 * noise(k, H)); S.ribbon(curve([s, add(s, add(mul(o, .15), [0, -drop * .5, 0])), add(s, add(mul(o, .2), [0, -drop, 0]))], S.n(2, 1)), t => .08 * (1 - t * .6), [-o[2], 0, o[0]], WHITE, { fold: .2 }); }
            } else {
                // Palm: rings along the trunk and arched fronds with leaflets.
                const n = S.n(7, 5);
                for (let k = 0; k < n; k++) {
                    const a = ring(n, k), o = [Math.cos(a), 0, Math.sin(a)], side = [-o[2], 0, o[0]], L = 1.15 * W, up = .35 + .15 * (k % 2);
                    const pts = curve([top, add(top, add(mul(o, L * .35), [0, L * up * .6, 0])), add(top, add(mul(o, L * .75), [0, L * up * .35, 0])), add(top, add(mul(o, L), [0, -L * .2, 0]))], S.n(3, 2));
                    S.ribbon(pts, t => .2 * Math.sin(Math.PI * Math.min(1, .05 + t)) ** .5 * (low ? 1 : .75 + .5 * ((Math.round(t * 20)) % 2)), side, WHITE, { fold: .45 });
                }
                if (!low) S.ellipsoid(add(top, [0, -.05, 0]), [.13, .1, .13], 8, 5, A);
            }
            break;
        }
        case 'arbusto': {
            const n = S.n(p.clumps, 3);
            for (let k = 0; k < n; k++) {
                const a = k * 2.4, d = p.width * (.2 + .25 * (k % 3) / 2), h = p.height * (.6 + .4 * ((k * 5) % 3) / 2), c = [Math.cos(a) * d, h, Math.sin(a) * d];
                if (!low) S.tube(curve([[0, 0, 0], [c[0] * .3, h * .35, c[2] * .3], [c[0] * .8, h * .8, c[2] * .8]], 1), t => .03 * (1 - t * .5), 4, D);
                foliage(c, [.24 * p.width + .06, .2 * p.height + .06, .24 * p.width + .06], k * 2.7, WHITE, low ? 9 : 11, low ? 6 : 7);
                if (p.berries && !low && k % 2 === 0) S.ellipsoid(add(c, [Math.cos(a) * .14, .1, Math.sin(a) * .14]), [.04, .04, .04], 5, 3, A);
            }
            break;
        }
        case 'colonna': {
            const M = low ? 12 : 40, R = S.n(10, 4), prof = t => t < .72 ? 1 : Math.sqrt(Math.max(0, 1 - ((t - .72) / .28) ** 2)) * .94 + .06;
            const rows = []; for (let i = 0; i <= R; i++) { const t = i / R, y = p.height * t; rows.push(Array.from({ length: M }, (_, j) => { const a = j / M * TAU, r = p.girth * prof(t) * (1 - .14 * ((1 - Math.cos(a * p.ribs)) / 2) ** 3) * (1 + .08 * (1 - t)); return [Math.cos(a) * r, y, Math.sin(a) * r]; })); }
            S.surface(rows, WHITE, { capEnd: true });
            for (let k = 0; k < p.arms; k++) { const a = k * 2.3 + .4, y = p.height * (.35 + .15 * k), o = [Math.cos(a), 0, Math.sin(a)]; S.tube(curve([add(mul(o, p.girth * .6), [0, y, 0]), add(mul(o, p.girth * 1.7), [0, y + .05, 0]), add(mul(o, p.girth * 1.9), [0, y + .35, 0]), add(mul(o, p.girth * 1.9), [0, y + .7, 0])], 2), p.girth * .45, 8, WHITE); }
            if (p.flower) for (let k = 0; k < S.n(6, 4); k++) { const a = ring(S.n(6, 4), k), o = [Math.cos(a), 0, Math.sin(a)]; leaf([0, p.height + .01, 0], unit(add(o, [0, .8, 0])), [-o[2], 0, o[0]], .14, .05, A, .1, 3); }
            break;
        }
        case 'cuscino': {
            const M = low ? 8 : 22, R = S.n(7, 3), rows = [];
            for (let i = 0; i <= R; i++) { const t = i / R, th = t * Math.PI / 2; rows.push(Array.from({ length: M }, (_, j) => { const a = j / M * TAU, b = 1 + .1 * Math.sin(a * 5 + t * 6) * Math.sin(t * 3); return [Math.cos(a) * p.width * Math.cos(th) * b, .02 + p.height * Math.sin(th) * b, Math.sin(a) * p.width * Math.cos(th) * b]; })); }
            S.surface(rows, WHITE, { capEnd: true });
            if (!low) for (let k = 0; k < p.shoots; k++) { const a = k * 2.4, d = p.width * (.3 + .55 * (k % 3) / 2), y = .02 + p.height * Math.cos(Math.asin(Math.min(1, d / p.width))); for (let q = 0; q < 4; q++) { const b = q * TAU / 4 + a, o = [Math.cos(b), 0, Math.sin(b)]; leaf([Math.cos(a) * d, y, Math.sin(a) * d], unit(add(o, [0, .6, 0])), [-o[2], 0, o[0]], .09, .035, WHITE, .2, 2); } }
            break;
        }
        case 'calice': {
            const n = S.n(p.tubes, 2);
            for (let k = 0; k < n; k++) {
                const a = k * 2.3, d = k ? .18 + .08 * (k % 2) : 0, x = Math.cos(a) * d, z = Math.sin(a) * d, h = p.height * (1 - .15 * k), M = S.n(11, 6), R = S.n(4, 2), rows = [];
                // A vase open at the top: the wall goes up outside and comes back down inside.
                const outer = t => .055 + .04 * Math.sin(t * Math.PI * .9) + .1 * t ** 4;
                for (let i = 0; i <= R; i++) { const t = i / R; rows.push(Array.from({ length: M }, (_, j) => { const b = j / M * TAU; return [x + Math.cos(b) * outer(t), h * t, z + Math.sin(b) * outer(t)]; })); }
                rows.push(rows[R].map(q => [x + (q[0] - x) * .7, h * .92, z + (q[2] - z) * .7]));
                S.surface(rows, i => i >= R ? WHITE : [.86, .84, .78, 1]);
                if (!low) S.ellipsoid([x, h * .95, z], [p.plume * .7, p.plume * .5, p.plume * .7], 7, 4, WHITE, dd => 1 + .2 * Math.sin(dd[0] * 7 + k) * Math.sin(dd[2] * 6));
            }
            break;
        }
        case 'crosta': {
            const n = S.n(p.lobes, 2);
            for (let k = 0; k < n; k++) { const a = k * 2.1, d = k ? .3 : 0, c = [Math.cos(a) * d, .015, Math.sin(a) * d], M = S.n(12, 7), rows = []; for (const [f, y] of [[.05, .045], [.6, .04], [1, .01]]) rows.push(Array.from({ length: M }, (_, j) => { const b = j / M * TAU, r = (.32 + .08 * Math.sin(b * 3 + k * 1.7) + .04 * Math.sin(b * 7 + k)) * f; return [c[0] + Math.cos(b) * r * 1.15, c[1] + y, c[2] + Math.sin(b) * r]; })); S.surface(rows, WHITE, { capStart: true }); }
            if (!low) for (let k = 0; k < Math.min(4, p.bumps); k++) { const a = k * 1.9, d = .2 + .1 * (k % 3); S.ellipsoid([Math.cos(a) * d, .06, Math.sin(a) * d], [.06, .04, .06], 6, 3, k % 3 ? D : A); }
            break;
        }
        case 'fungo': {
            const n = S.n(p.caps, 1);
            for (let k = 0; k < n; k++) {
                const a = k * 2.5, d = k ? .25 + .1 * k : 0, x = Math.cos(a) * d, z = Math.sin(a) * d, h = p.height * (1 - .2 * k), c = p.cap * (1 - .15 * k), pale = [.9, .86, .78, 1];
                S.tube(curve([[x, 0, z], [x + .02, h * .55, z], [x, h, z]], S.n(2, 1)), t => c * (.3 - .1 * t) * (1 + .5 * Math.max(0, 1 - t * 5)), 7, pale, { capEnd: false });
                const depth = p.shape === 'piatto' ? .25 : p.shape === 'cupola' ? .6 : .95, M = S.n(14, 7), R = S.n(4, 2), rows = [];
                // The cap: top surface out to a rolled rim, then the gills underneath back to the stem.
                for (let i = 0; i <= R; i++) { const t = i / R, r = c * Math.sin(t * Math.PI / 2) ** (p.shape === 'cono' ? 1.4 : .8), y = h + c * depth * Math.cos(t * Math.PI / 2) * (p.shape === 'cono' ? 1 : .9); rows.push(Array.from({ length: M }, (_, j) => { const b = j / M * TAU, rr = r * (1 + .04 * Math.sin(b * 5 + k)); return [x + Math.cos(b) * rr, y, z + Math.sin(b) * rr]; })); }
                rows.push(rows[R].map(q => [x + (q[0] - x) * .96, h - c * .06, z + (q[2] - z) * .96]));
                rows.push(rows[R].map(q => [x + (q[0] - x) * .25, h + .01, z + (q[2] - z) * .25]));
                S.surface(rows, i => i > R ? shade(D, 1.4) : WHITE);
            }
            break;
        }
        case 'pascolatore': {
            const L = p.length, h = p.height, y = p.legs + h * .38, hx = L + p.neck * .5, hy = y + p.neck * .9, Z = h * .3;
            body([[-L * 1.02, y + h * .02, 0], [-L * .72, y + h * .05, 0], [0, y, 0], [L * .58, y + h * .03, 0], [L * .9, y + h * .12, 0], [L + p.neck * .22, y + p.neck * .5 + h * .1, 0], [hx - .02, hy + .02, 0], [hx + .17, hy - .05, 0]],
                [h * .14, h * .34, h * .38, h * .35, h * .24, .12, .12, .05], [h * .12, Z * .92, Z, Z * .9, Z * .6, .1, .1, .045], 9, WHITE, 3);
            for (const [fx, front] of [[.62, true], [-.62, false]]) for (const s of [1, -1]) {
                const x = fx * L, z = s * Z * .55, top = [x, y - h * .05, z];
                limb(front ? [top, [x + .02, p.legs * .72, z], [x + .01, p.legs * .32, z], [x + .04, .05, z]] : [[x, y, z], [x + .07, p.legs * .72, z], [x - .07, p.legs * .38, z], [x - .01, .05, z]], p.thick * (front ? 1.7 : 2.1), p.thick * .75, .45);
                if (!low) S.ellipsoid([x + (front ? .055 : .01), .03, z], [p.thick * 1.25, .035, p.thick * 1.1], 6, 3, [.12, .1, .09, 1]);
            }
            S.tube(curve([[-L * 1.02, y + h * .02, 0], [-L * 1.1, y - h * .1, 0], [-L * 1.12, y - h * .2 - p.tail, 0]], 2), t => .035 * (1 - t * .5), 4, i => i > 3 ? D : WHITE);
            for (let k = 0; k < p.horns; k++) { const z = k ? -1 : 1; S.tube(curve([[hx - .02, hy + .08, z * .05], [hx - .08, hy + .2, z * .1], [hx - .2, hy + .26, z * .16]], 2), t => .028 * (1 - t * .85), 5, A); }
            if (!low) for (const z of [1, -1]) leaf([hx - .06, hy + .08, z * .07], unit([-.4, .5, z * .8]), [1, 0, 0], .11, .035, WHITE, .05, 3);
            if (p.crest && !low) S.ribbon(curve([[L * .2, y + h * .36, 0], [L * .8, y + h * .3, 0], [L + p.neck * .2, y + p.neck * .55 + h * .2, 0], [hx - .06, hy + .1, 0]], 2), .05, [0, 1, 0], A);
            for (const z of [1, -1]) eye([hx + .07, hy + .03, z * .085]);
            break;
        }
        case 'cacciatore': {
            const L = p.length, h = p.height, y = p.legs + h * .34, Z = h * .24, hx = L + .25, hy = y + .07;
            body([[-L, y + .03, 0], [-L * .7, y + .05, 0], [-L * .1, y + .02, 0], [L * .5, y + .01, 0], [L * .82, y + .07, 0], [L + .1, y + .1, 0], [hx + .02, hy + .02, 0], [hx + .2 + p.jaw * .6, hy - .02, 0]],
                [.07, h * .26, h * .22, h * .33, h * .27, .1, .11, .045], [.06, Z * .9, Z * .75, Z, Z * .85, .09, .1, .04], 9, WHITE, 3);
            if (!low) S.tube(curve([[hx + .02, hy - .07, 0], [hx + .15 + p.jaw * .5, hy - .1, 0]], 1), t => [.03 * (1 - t * .4), .045 * (1 - t * .4)], 5, D);
            for (const [fx, front] of [[.55, true], [-.62, false]]) for (const s of [1, -1]) {
                const x = fx * L, z = s * Z * .6;
                limb(front ? [[x, y, z], [x - .05, p.legs * .62, z * 1.1], [x + .02, p.legs * .2, z * 1.1], [x + .09, .03, z * 1.1]] : [[x, y + .02, z], [x + .09, p.legs * .62, z * 1.1], [x - .1, p.legs * .3, z * 1.1], [x - .02, .03, z * 1.1]], p.thick * 1.8, p.thick * .7, .35);
                if (!low) S.ellipsoid([x + (front ? .11 : .01), .025, z * 1.1], [.05, .025, .035], 6, 3, D);
            }
            S.tube(curve([[-L, y + .03, 0], [-L - p.tail * .4, y + .12, 0], [-L - p.tail * .8, y + .06, 0], [-L - p.tail, y - .06, 0]], 2), t => .05 * (1 - t * .55), 5, i => i > 6 ? D : WHITE);
            if (!low) for (const z of [1, -1]) leaf([hx - .03, hy + .07, z * .06], unit([-.2, .9, z * .3]), [1, 0, 0], .09, .03, WHITE, 0, 2);
            for (const z of [1, -1]) eye([hx + .09, hy + .04, z * .07], .02, A);
            break;
        }
        case 'bipede': {
            const hip = p.height * .55, H0 = [.36, hip + p.height * .42, 0], ph = p.head;
            body([[-.3 - p.tail, hip - .1, 0], [-.3 - p.tail * .5, hip + .02, 0], [-.14, hip + .12, 0], [.06, hip + .14, 0], [.2, hip + .2, 0], [.3, hip + .34, 0], [H0[0] - .02, H0[1] - .02, 0], [H0[0] + ph * 1.3, H0[1] - ph * .2, 0]],
                [.02, .08, .21, .22, .19, .08, ph * .7, ph * .3], [.02, .07, .17, .18, .15, .07, ph * .6, ph * .28], 9, WHITE, 3);
            if (!low) S.tube(curve([[H0[0] + .02, H0[1] - ph * .45, 0], [H0[0] + ph * 1.1, H0[1] - ph * .55, 0]], 1), t => [ph * .14, ph * .22], 5, D);
            for (const z of [.12, -.12]) {
                limb([[0, hip + .08, z], [.12, hip * .6, z * 1.15], [-.08, hip * .22, z * 1.15], [.06, .055, z * 1.15]], p.thick * 2, p.thick * .7, .4);
                if (!low) S.ellipsoid([.12, .025, z * 1.15], [.09, .025, .04], 6, 3, D);
                limb([[.22, hip + .18, z * .75], [.28, hip + .08 - p.arms * .3, z * .95], [.36, hip + .08 - p.arms, z * .85]], .03, .018, .3, 5);
            }
            if (p.crest) S.ribbon(curve([[H0[0] - ph * .9, H0[1] + ph * .4, 0], [H0[0] - ph * .2, H0[1] + ph * .95, 0], [H0[0] + ph * .5, H0[1] + ph * .55, 0]], 2), ph * .35, [0, 1, 0], A);
            for (const z of [1, -1]) eye([H0[0] + ph * .45, H0[1] + ph * .15, z * ph * .5], .02, A);
            break;
        }
        case 'saltatore': {
            const y = p.legs + .2, h = p.height;
            body([[-.18 - p.tail, .04, 0], [-.18 - p.tail * .4, y * .45, 0], [-.1, y - .04, 0], [0, y + .06, 0], [.07, y + h * .22, 0], [.11, y + h * .32, 0], [.16, y + h * .36, 0], [.27, y + h * .33, 0]],
                [.025, .06, .19, .18, .13, .07, .09, .035], [.025, .05, .17, .16, .12, .065, .08, .03], 9, WHITE, 3);
            for (const z of [.12, -.12]) {
                limb([[-.04, y - .05, z], [.12, p.legs * .5, z * 1.05], [-.13, p.legs * .12, z * 1.05], [.12, .015, z * 1.05]], .07, .025, .35);
                limb([[.09, y + .1, z * .6], [.15, y - .04, z * .7], [.15, y - .15, z * .65]], .03, .018, .3, 5);
            }
            for (const z of [1, -1]) leaf([.12, y + h * .38 + .04, z * .045], unit([-.35, 1, z * .25]), [1, 0, 0], p.ears * 1.8 + .06, .04, WHITE, -.05, 4);
            for (const z of [1, -1]) eye([.21, y + h * .37, z * .06]);
            break;
        }
        case 'esapode': {
            const s = p.size, yb = p.legs * .9, segs = p.segments + 1, front = (segs / 2 - .5) * .26 * s;
            // Abdomen, thorax and head along one spine, narrowed at the joints.
            const ctrl = [], ry = [], rz = [];
            for (let k = 0; k < segs; k++) { const x = (k - segs / 2 + .5) * .26 * s, last = k === segs - 1; ctrl.push([x - .1 * s, yb, 0], [x, yb + .01, 0]); ry.push(.05 * s, last ? .1 * s : .14 * s); rz.push(.06 * s, last ? .11 * s : .17 * s); }
            ctrl.push([front + .2 * s, yb - .02, 0]); ry.push(.04 * s); rz.push(.05 * s);
            body(ctrl, ry, rz, 8, i => i > ctrl.length * 2 ? D : WHITE, 2);
            for (let k = 0; k < 3; k++) for (const side of [1, -1]) { const x = (k - 1) * .16 * s; limb([[x, yb, .08 * side * s], [x + .04, p.legs * 1.15, .3 * side * s], [x + .1, p.legs * .45, .42 * side * s], [x + .14, 0, .5 * side * s]], .025, .01, .7, 4); }
            for (const side of [1, -1]) S.tube(curve([[front + .1 * s, yb + .03, .03 * side], [front + .1 + p.antennae * .6, yb + p.antennae * .8, .1 * side], [front + .14 + p.antennae, yb + p.antennae * .9, .16 * side]], 2), .01, 3, D);
            if (p.shell) for (const side of [1, -1]) S.ellipsoid([-.08 * s, yb + .08 * s, .06 * side * s], [.3 * s, .07 * s, .1 * s], 10, 5, A);
            break;
        }
        case 'ottopode': {
            const y = p.legs * .7, b = p.body;
            S.ellipsoid([-b * .9, y + .02, 0], [b * 1.3, b * .95, b * 1.15], 12, 8, WHITE, d => 1 + .05 * Math.sin(d[0] * 9));
            S.ellipsoid([b * .55, y, 0], [b * .7, b * .55, b * .65], 10, 6, WHITE);
            const n = S.n(8, 6);
            for (let k = 0; k < n; k++) { const a = ring(n, k, .2), x = Math.cos(a), z = Math.sin(a); limb([[b * .5 + x * b * .5, y, z * b * .5], [b * .4 + x * p.spread * .7, y + p.legs * .5, z * p.spread * .7], [b * .4 + x * p.spread * 1.25, p.legs * .35, z * p.spread * 1.25], [b * .4 + x * p.spread * 1.6, 0, z * p.spread * 1.6]], .03, .01, .55, 4); }
            for (let k = 0; k < (low ? 0 : p.eyes); k++) S.ellipsoid([b * 1.15, y + .05 + .03 * (k >> 1), (k % 2 ? 1 : -1) * (.04 + .03 * (k >> 1))], [.022, .022, .022], 6, 4, A);
            break;
        }
        case 'serpentino': {
            const n = p.segments, len = n * p.width * 1.6, pts = [], N = S.n(n * 2, 8);
            for (let i = 0; i <= N; i++) { const t = i / N; pts.push([(t - .5) * len, p.width, Math.sin(t * Math.PI * 2) * p.wave * n * .25]); }
            const fr = profile([[0, .15], [.25, .8], [.6, 1], [.86, .7], [.93, 1.15], [1, .5]]);
            S.tube(pts, t => [p.width * fr(t) * .85, p.width * fr(t) * 1.05], 8, i => i >= N - 1 ? D : WHITE, { capStart: true });
            if (p.legs && !low) for (const t of [.38, .72]) { const i = Math.round(t * N), c = pts[i]; for (const s of [1, -1]) limb([[c[0], c[1], c[2] + s * p.width * .6], [c[0] + .03, c[1] + .02, c[2] + s * p.width * 1.6], [c[0] + .08, 0, c[2] + s * p.width * 2.1]], p.width * .3, p.width * .15, .5, 4); }
            const head = pts[N - 1]; for (const s of [1, -1]) eye([head[0] + p.width * .2, head[1] + p.width * .5, head[2] + s * p.width * .55], p.width * .18, A);
            break;
        }
        case 'volatore': {
            const B = p.body;
            body([[-B - p.tail * .3, .01, 0], [-B * .5, 0, 0], [B * .35, .02, 0], [B * .75, .05, 0], [B + .04, .07, 0], [B + .14, .06, 0]], [.03, .1, .11, .065, .065, .03], [.035, .11, .12, .06, .06, .03], 8, WHITE, 2);
            if (!low) S.tube(curve([[B + .12, .06, 0], [B + .26, .035, 0]], 1), t => .03 * (1 - t * .9), 4, A, { capEnd: false });
            // Wings: a surface from the body to the tip, with a feathered trailing edge, lying along z.
            for (const side of [1, -1]) {
                const R = S.n(6, 3), rows = [];
                for (let i = 0; i <= R; i++) { const t = i / R, z = side * (.07 + t * (p.span * 1.05)), lead = [B * .35 - t * B * .55, .03 + .05 * Math.sin(t * Math.PI), z], trail = [-B * .35 - t * B * (.2 + .15 * Math.sin(t * Math.PI)) - (low ? 0 : .05 * (i % 2)), .02 + .03 * Math.sin(t * Math.PI), z]; const w = 1 - t * t * .75; rows.push([lead, lerp(lead, trail, .5 * w + .25).map((v, q) => q === 1 ? v + .015 : v), lerp(lead, trail, w)]); }
                S.surface(rows, i => i >= R - 1 ? D : WHITE, { closed: false });
            }
            S.ribbon(curve([[-B, .01, 0], [-B - p.tail * .5, .015, 0], [-B - p.tail - .05, .02, 0]], 2), t => .05 + .1 * t, [0, 0, 1], WHITE, { fold: -.1 });
            if (p.crest) S.ribbon(curve([[B - .04, .11, 0], [B + .03, .17, 0], [B + .1, .1, 0]], 2), .03, [0, 1, 0], A);
            for (const z of [1, -1]) eye([B + .1, .09, z * .05], .015);
            break;
        }
        case 'medusa': {
            const M = S.n(20, 10), R = S.n(7, 4), rows = [];
            for (let i = 0; i <= R; i++) { const t = i / R, th = t * Math.PI / 2; rows.push(Array.from({ length: M }, (_, j) => { const a = j / M * TAU, frill = t > .85 ? 1 + .06 * Math.sin(a * 9) : 1; return [Math.cos(a) * p.dome * Math.sin(th) * frill, .1 + p.dome * .45 * Math.cos(th) - (t > .85 ? .04 * (j % 2) : 0), Math.sin(a) * p.dome * .75 * Math.sin(th) * frill]; })); }
            rows.push(rows[R].map(q => [q[0] * .8, .06, q[2] * .8]));
            S.surface(rows, i => i > R ? shade(A, .8) : WHITE);
            const sail = curve([[-p.dome * .6, .14, 0], [-p.dome * .2, .14 + p.sail * 1.4, 0], [p.dome * .4, .14 + p.sail * .9, 0], [p.dome * .6, .14, 0]], S.n(3, 2));
            S.surface([sail.map(q => [q[0] * .9, .14, 0]), sail], i => i ? WHITE : WHITE, { closed: false });
            const n = S.n(p.tentacles, 3);
            for (let k = 0; k < n; k++) { const a = ring(n, k), x = Math.cos(a) * p.dome * .5, z = Math.sin(a) * p.dome * .37; S.tube(curve([[x, .05, z], [x * 1.2, -p.drop * .35, z * 1.2 + .05 * Math.sin(k)], [x * .95, -p.drop * .7, z * .9], [x * .8, -p.drop, z * .85]], 2), t => .03 * (1 - t * .7), 4, shade(A, 1)); }
            break;
        }
        default: throw new Error('Forma senza piano corporeo: ' + p.form);
    }
    return S.mesh();
}
/** A short text key of a plan: two species share it only if their shapes are the same. */
export const planKey = p => JSON.stringify(p);
