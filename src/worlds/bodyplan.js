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

const WHITE = [1, 1, 1, 1];
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
 * the species goes. Animals face +x; the wings of flyers lie along z, where the shader flaps them. */
export function bodyMesh(p, level = 0) {
    const L = LEVELS[level], T = L.tube, parts = [], D = p.dark, A = p.accent, ring = (n, k, off = 0) => k * Math.PI * 2 / n + off;
    switch (p.form) {
        case 'ciuffo': for (let k = 0; k < count(p.blades, L); k++) { const a = ring(count(p.blades, L), k, .3), d = p.spread * (.4 + .6 * ((k * 7) % 5) / 5), h = p.height * (.7 + .3 * ((k * 3) % 4) / 4), x = Math.cos(a) * d, z = Math.sin(a) * d; parts.push(tube([[x * .3, 0, z * .3], [x * .8, h * .55, z * .8], [x * (1.3 + p.curl), h, z * (1.3 + p.curl)]], .035, Math.max(3, T - 3), WHITE)); } break;
        case 'felce': { const n = count(p.fronds, L); parts.push(blob(L, [.12, .1 + .1 * p.heart, .12], [0, .08, 0], A, 0, 0, true)); for (let k = 0; k < n; k++) parts.push(leaf(L, p.length, p.width, -p.rise - .2 * (k % 2), ring(n, k), [0, .08, 0])); break; }
        case 'canneto': for (let k = 0; k < count(p.stems, L); k++) { const a = ring(count(p.stems, L), k, 1.1), d = .08 + .1 * (k % 3), x = Math.cos(a) * d, z = Math.sin(a) * d, h = p.height * (.75 + .25 * ((k * 5) % 4) / 4); parts.push(tube([[x, 0, z], [x * 1.3, h * .6, z * 1.3], [x * 1.6, h, z * 1.6]], .025, Math.max(3, T - 2), D)); parts.push(blob(L, [.05 + .05 * p.plume, .14 + .1 * p.plume, .05 + .05 * p.plume], [x * 1.6, h + .1, z * 1.6], WHITE, 0, 0, true)); } break;
        case 'albero': {
            const H = p.height, top = [p.bend * H * .3, H, 0];
            parts.push(tube([[0, 0, 0], [p.bend * H * .1, H * .4, 0], [p.bend * H * .25, H * .75, .02], top], p.trunk, T, D));
            if (p.crown === 'ombrello') for (let k = 0; k < p.layers; k++) parts.push(blob(L, [p.width * (1 - k * .3), .26 - .04 * k, p.width * (1 - k * .3)], [top[0] + .08 * k, H + k * .26, top[2] - .05 * k], WHITE, 0, 0, 'wide'));
            else if (p.crown === 'cono') { const n = p.layers + 2, step = H * .62 / n; for (let k = 0; k < n; k++) { const w = p.width * .62 * (1 - k / (n + .5)); parts.push(blob(L, [w, step * .85, w], [top[0] * (.4 + .6 * k / n), H * .38 + (k + .5) * step, top[2]], WHITE)); } }
            else if (p.crown === 'sfere') for (let k = 0; k < 3 + p.layers; k++) { const a = k * 2.2; parts.push(blob(L, [.32 * p.width, .28 * p.width, .32 * p.width], [top[0] + Math.cos(a) * .35 * p.width, H + .1 * (k % 2), top[2] + Math.sin(a) * .35 * p.width], WHITE)); }
            else if (p.crown === 'salice') { parts.push(blob(L, [.6 * p.width, .32, .6 * p.width], [top[0], H, top[2]], WHITE, 0, 0, 'wide')); for (let k = 0; k < count(7, L); k++) { const a = ring(count(7, L), k), x = top[0] + Math.cos(a) * .55 * p.width, z = Math.sin(a) * .55 * p.width; parts.push(tube([[x, H, z], [x * 1.1, H * .7, z * 1.1], [x * 1.05, H * .45, z * 1.05]], .03, 3, WHITE)); } }
            else { const n = count(7, L); for (let k = 0; k < n; k++) parts.push(leaf(L, 1.1 * p.width, .14, .35 + .15 * (k % 2), ring(n, k), [top[0], H, top[2]])); }
            break;
        }
        case 'arbusto': for (let k = 0; k < count(p.clumps, L); k++) { const a = k * 2.4, d = p.width * (.2 + .25 * (k % 3) / 2), h = p.height * (.6 + .4 * ((k * 5) % 3) / 2), x = Math.cos(a) * d, z = Math.sin(a) * d; parts.push(tube([[0, 0, 0], [x * .6, h * .5, z * .6]], .03, 3, D)); parts.push(blob(L, [.22 * p.width + .05, .2 * p.height + .05, .22 * p.width + .05], [x, h, z], WHITE)); if (p.berries && level === 0) parts.push(blob(L, [.04, .04, .04], [x + .1, h + .12, z], A, 0, 0, true)); } break;
        case 'colonna': {
            const body = blob(L, [p.girth, p.height / 2, p.girth], [0, p.height / 2, 0], WHITE);
            for (let i = 0; i < body.v.length; i += 12) { const k = 1 + .1 * Math.cos(Math.atan2(body.v[i + 2], body.v[i]) * p.ribs); body.v[i] *= k; body.v[i + 2] *= k; }
            parts.push(body);
            for (let k = 0; k < p.arms; k++) { const a = k * 2.3 + .4, y = p.height * (.35 + .15 * k), x = Math.cos(a), z = Math.sin(a), r0 = p.girth * .5; parts.push(tube([[x * p.girth * .7, y, z * p.girth * .7], [x * p.girth * 1.6, y + .1, z * p.girth * 1.6], [x * p.girth * 1.8, y + .5, z * p.girth * 1.8]], r0, T, WHITE)); }
            if (p.flower) parts.push(blob(L, [.12, .08, .12], [0, p.height + .02, 0], A, 0, 0, true));
            break;
        }
        case 'cuscino': parts.push(blob(L, [p.width, p.height, p.width], [0, .02, 0], WHITE, 0, 0, 'mid')); for (let k = 0; k < count(p.shoots, L); k++) { const a = k * 2.4, d = p.width * (.3 + .55 * (k % 3) / 2); parts.push(blob(L, [.15, .11, .15], [Math.cos(a) * d, p.height * (.75 - .3 * (k % 3) / 2), Math.sin(a) * d], WHITE, 0, 0, 'tiny')); } break;
        case 'calice': for (let k = 0; k < count(p.tubes, L); k++) { const a = k * 2.3, d = k ? .18 + .08 * (k % 2) : 0, x = Math.cos(a) * d, z = Math.sin(a) * d, h = p.height * (1 - .15 * k); parts.push(tube([[x, 0, z], [x + .03, h * .5, z], [x, h, z]], .08, T, [.86, .84, .78, 1])); parts.push(blob(L, [p.plume + .04, p.plume, p.plume + .04], [x, h + .07, z], WHITE)); } break;
        case 'crosta': for (let k = 0; k < count(p.lobes, L); k++) { const a = k * 2.1, d = k ? .3 : 0; parts.push(blob(L, [.4, .04, .32], [Math.cos(a) * d, .02, Math.sin(a) * d], WHITE, a, 0, true)); } for (let k = 0; k < count(p.bumps, L); k++) { const a = k * 1.9, d = .2 + .1 * (k % 3); parts.push(blob(L, [.08, .05, .08], [Math.cos(a) * d, .05, Math.sin(a) * d], D, 0, 0, true)); } break;
        case 'fungo': for (let k = 0; k < count(p.caps, L); k++) { const a = k * 2.5, d = k ? .25 + .1 * k : 0, x = Math.cos(a) * d, z = Math.sin(a) * d, h = p.height * (1 - .2 * k), c = p.cap * (1 - .15 * k); parts.push(tube([[x, 0, z], [x + .02, h * .6, z], [x, h, z]], c * .25, T, [.9, .86, .78, 1])); parts.push(blob(L, [c, p.shape === 'piatto' ? c * .25 : p.shape === 'cupola' ? c * .55 : c * .9, c], [x, h, z], WHITE)); } break;
        case 'pascolatore': {
            const y = p.legs + p.height * .35, head = [p.length + p.neck * .5, y + p.neck * .9, 0];
            parts.push(blob(L, [p.length, p.height * .38, p.height * .32], [0, y, 0], WHITE));
            parts.push(tube([[p.length * .7, y + .05, 0], [head[0] - .08, head[1] - .04, 0]], .1, T, WHITE));
            parts.push(blob(L, [.2, .15, .14], head, WHITE));
            for (const [x, z] of [[.6, .5], [.6, -.5], [-.6, .5], [-.6, -.5]]) parts.push(tube([[x * p.length, y - .05, z * p.height * .32], [x * p.length + .02, p.legs * .5, z * p.height * .32], [x * p.length, 0, z * p.height * .32]], p.thick, Math.max(3, T - 1), D));
            parts.push(tube([[-p.length, y + .05, 0], [-p.length - p.tail * .6, y - .1, 0], [-p.length - p.tail, y - .3, 0]], .035, 3, D));
            for (let k = 0; k < p.horns; k++) { const z = k ? -.07 : .07; parts.push(tube([[head[0], head[1] + .1, z], [head[0] - .05, head[1] + .25, z * 2.4]], .025, 3, A)); }
            if (p.crest) parts.push(blob(L, [p.length * .7, .08, .03], [0, y + p.height * .36, 0], A));
            for (const z of [.07, -.07]) parts.push(blob(L, [.03, .03, .03], [head[0] + .17, head[1] + .04, z], [.05, .05, .05, 1], 0, 0, true));
            break;
        }
        case 'cacciatore': {
            const y = p.legs + p.height * .3, head = [p.length + .25, y + .06, 0];
            parts.push(blob(L, [p.length, p.height * .3, p.height * .26], [0, y, 0], WHITE));
            parts.push(blob(L, [.26, .14, .13], head, WHITE));
            parts.push(blob(L, [p.jaw + .06, .04, .09], [head[0] + .14, head[1] - .08, 0], D));
            for (const [x, z] of [[.55, .7], [.55, -.7], [-.6, .7], [-.6, -.7]]) parts.push(tube([[x * p.length, y, z * p.height * .26], [x * p.length + .08, p.legs * .45, z * p.height * .3], [x * p.length + .02, 0, z * p.height * .3]], p.thick, Math.max(3, T - 1), D));
            parts.push(tube([[-p.length, y + .04, 0], [-p.length - p.tail * .5, y + .12, 0], [-p.length - p.tail, y - .05, 0]], .05, Math.max(3, T - 2), WHITE));
            for (const z of [.06, -.06]) parts.push(blob(L, [.03, .03, .03], [head[0] + .2, head[1] + .06, z], A, 0, 0, true));
            break;
        }
        case 'bipede': {
            const hip = p.height * .55, chest = [.18, hip + p.height * .25, 0], head = [.36, hip + p.height * .42, 0];
            parts.push(blob(L, [.34, .28, .22], [0, hip + .1, 0], WHITE, 0, -.0));
            parts.push(tube([[.05, hip + .15, 0], chest, [head[0] - .08, head[1] - .05, 0]], .12, T, WHITE));
            parts.push(blob(L, [p.head * 1.6, p.head, p.head * .9], head, WHITE));
            parts.push(blob(L, [p.head * 1.2, p.head * .3, p.head * .7], [head[0] + p.head * .6, head[1] - p.head * .55, 0], D));
            for (const z of [.12, -.12]) { parts.push(tube([[0, hip, z], [.12, hip * .55, z * 1.2], [-.05, 0, z * 1.2]], p.thick, Math.max(3, T - 1), D)); parts.push(tube([[chest[0] + .05, chest[1] - .05, z * .8], [chest[0] + .12, chest[1] - .05 - p.arms, z]], .025, 3, D)); }
            parts.push(tube([[-.3, hip + .12, 0], [-.3 - p.tail * .6, hip + .05, 0], [-.3 - p.tail, hip - .1, 0]], .07, Math.max(3, T - 2), WHITE));
            if (p.crest) parts.push(blob(L, [p.head * 1.2, p.head * .5, .02], [head[0] - .05, head[1] + p.head * .8, 0], A));
            break;
        }
        case 'saltatore': {
            const y = p.legs + .2;
            parts.push(blob(L, [.2, p.height * .32, .17], [0, y, 0], WHITE));
            parts.push(blob(L, [.15, .12, .12], [.14, y + p.height * .32, 0], WHITE));
            for (const z of [.05, -.05]) parts.push(blob(L, [.03, p.ears, .025], [.1, y + p.height * .32 + p.ears, z * 1.4], WHITE, 0, 0, true));
            for (const z of [.12, -.12]) parts.push(tube([[-.05, y - .1, z], [.12, p.legs * .45, z], [-.1, 0, z], [.08, 0, z]], .05, Math.max(3, T - 2), D));
            parts.push(tube([[-.18, y - .05, 0], [-.18 - p.tail * .6, y - .2, 0], [-.18 - p.tail, .02, 0]], .045, 3, WHITE));
            break;
        }
        case 'esapode': {
            const s = p.size, segs = p.segments + 1;
            for (let k = 0; k < segs; k++) { const x = (k - segs / 2) * .26 * s, last = k === segs - 1; parts.push(blob(L, [last ? .12 * s : .2 * s, last ? .1 * s : .14 * s, last ? .11 * s : .17 * s], [x, p.legs * .9, 0], last ? D : WHITE)); }
            for (let k = 0; k < 3; k++) for (const side of [1, -1]) { const x = (k - 1) * .16 * s; parts.push(tube([[x, p.legs * .85, .1 * side], [x + .06, p.legs * 1.15, .32 * side * s], [x + .12, 0, .45 * side * s]], .022, 3, D)); }
            const front = (segs / 2 - .5) * .26 * s;
            for (const side of [1, -1]) parts.push(tube([[front + .08, p.legs, .03 * side], [front + .08 + p.antennae, p.legs + p.antennae, .12 * side]], .012, 3, D));
            if (p.shell) parts.push(blob(L, [.32 * s, .08 * s, .2 * s], [-.1 * s, p.legs * .9 + .1 * s, 0], A));
            break;
        }
        case 'ottopode': {
            const y = p.legs * .7;
            parts.push(blob(L, [p.body * 1.3, p.body, p.body * 1.2], [0, y, 0], WHITE));
            parts.push(blob(L, [p.body * .6, p.body * .5, p.body * .6], [p.body * 1.2, y, 0], WHITE));
            for (let k = 0; k < count(8, L); k++) { const a = ring(count(8, L), k, .2), x = Math.cos(a), z = Math.sin(a); parts.push(tube([[x * p.body, y, z * p.body], [x * p.spread, y + p.legs * .5, z * p.spread], [x * p.spread * 1.6, 0, z * p.spread * 1.6]], .025, 3, D)); }
            for (let k = 0; k < (level ? 0 : p.eyes); k++) parts.push(blob(L, [.025, .025, .025], [p.body * 1.7, y + .05 + .03 * (k >> 1), (k % 2 ? 1 : -1) * (.04 + .03 * (k >> 1))], A, 0, 0, true));
            break;
        }
        case 'serpentino': {
            const n = count(p.segments, L);
            for (let k = 0; k < n; k++) { const t = k / Math.max(1, n - 1), x = (t - .5) * n * p.width * 1.6, z = Math.sin(t * Math.PI * 2) * p.wave * n * .25, r = p.width * (k === n - 1 ? 1.3 : 1 - .4 * Math.abs(t - .6)); parts.push(blob(L, [r * 1.2, r, r], [x, r, z], k === n - 1 ? D : WHITE, 0, 0, true)); if (p.legs && level === 0 && k < n - 1) for (const side of [1, -1]) parts.push(tube([[x, r * .5, z + side * r * .6], [x + .02, 0, z + side * r * 1.6]], .012, 3, D)); }
            break;
        }
        case 'volatore': parts.push(blob(L, [p.body, .12, .13], [0, 0, 0], WHITE)); parts.push(blob(L, [.11, .1, .1], [p.body + .02, .04, 0], WHITE)); parts.push(blob(L, [.07, .03, .03], [p.body + .16, .03, 0], A, 0, 0, true)); for (const side of [1, -1]) parts.push(blob(L, [.26, .02, p.span], [-.02, .03, (p.span + .02) * side], WHITE)); parts.push(blob(L, [p.tail + .05, .015, .14], [-p.body - p.tail * .5, .02, 0], WHITE)); if (p.crest) parts.push(blob(L, [.08, .08, .02], [p.body, .14, 0], A, 0, 0, true)); break;
        case 'medusa': parts.push(blob(L, [p.dome, p.dome * .45, p.dome * .75], [0, .1, 0], WHITE)); parts.push(blob(L, [p.dome * .7, p.sail, .05], [0, .1 + p.sail, 0], WHITE)); for (let k = 0; k < count(p.tentacles, L); k++) { const a = ring(count(p.tentacles, L), k), x = Math.cos(a) * p.dome * .5, z = Math.sin(a) * p.dome * .37; parts.push(tube([[x, 0, z], [x * 1.2, -p.drop * .5, z * 1.2], [x * .9, -p.drop, z * .9]], .03, 3, shade(A, 1))); } break;
        default: throw new Error('Forma senza piano corporeo: ' + p.form);
    }
    return merge(parts);
}
/** A short text key of a plan: two species share it only if their shapes are the same. */
export const planKey = p => JSON.stringify(p);
