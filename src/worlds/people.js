/** Inhabitants of the settlements (1.64.0): the colonists, in three figures, and the native people of the
 * villages, whose body is drawn for each village from the card of its planet. Meshes face +x, are about 1.1
 * units tall at scale 1 for an adult colonist and have white clothes or skin, which take the colour of each
 * instance. The legs end at the hip height `legs`, which the shader uses to swing them while walking. */
import { sphereMesh } from '../renderer.js';
import { tubePath } from '../education/geometry.js';
import { shaped } from './geometry.js';
import { merge } from './bodyplan.js';
import { Kit } from '../craft/kit.js';
import { smooth, sweep } from './architecture.js';
import { Shape, curve, profile, WHITE as PALE } from './organic.js';

const WHITE = [1, 1, 1, 1], round = x => Math.round(x * 1000) / 1000;
const LEVEL = [{ sphere: [10, 7], tube: 6 }, { sphere: [6, 4], tube: 3 }];
const spheres = new Map(), sphere = (u, v) => spheres.get(u * 100 + v) || (spheres.set(u * 100 + v, sphereMesh(u, v)), spheres.get(u * 100 + v));
const blob = (L, scale, move, color) => shaped(sphere(...L.sphere), { scale, move, color });
const tube = (L, points, r, color) => shaped(tubePath(points, r, L.tube), { color });
/** Skin tones of the colonists. */
const SKINS = [[.96, .8, .68, 1], [.82, .62, .46, 1], [.6, .42, .3, 1], [.38, .26, .19, 1]];
export const COLONIST_FIGURES = Object.freeze(['adulto', 'zaino', 'bambino']);
/** Gear of the colonists by kind of settlement: a pressure suit with helmet in the sealed outposts, a coverall
 * with hood and respirator in the adapted towns, light work clothes in the symbiotic settlements. */
export const GEAR = Object.freeze({ sigillato: 'tuta', adattato: 'maschera', simbiotico: 'leggero' });

/** Spec of a colonist figure (1.66.0): adults are 7.5 heads tall, 1.1 units in all, as a person of 1.75 m;
 * children 0.8 units. Parts painted white take the colour of the role of each instance. */
export function colonistSpec(figure, gear, k = 0) {
    const child = figure === 'bambino', h = child ? .8 : 1.1;
    return { figure, gear, skin: SKINS[k % SKINS.length], height: h, legs: round(h * (child ? .44 : .5)), heads: child ? 5.5 : 7.5, hair: [[.1, .07, .05, 1], [.25, .16, .09, 1], [.05, .05, .05, 1], [.45, .3, .16, 1]][(k + 1) % 4] };
}
/** Ellipsoid with semi-axes ax and true normals. */
function ellipsoid(K, c, ax, u = 12, w = 8) {
    u = K.seg(u, 6, 6); w = K.seg(w, 4, 4); const base = K.v.length / 16;
    for (let j = 0; j <= w; j++) for (let i = 0; i <= u; i++) { const t = j / w * Math.PI, f = i / u * 2 * Math.PI, d = [Math.cos(f) * Math.sin(t), Math.cos(t), Math.sin(f) * Math.sin(t)]; K.vertex([c[0] + d[0] * ax[0], c[1] + d[1] * ax[1], c[2] + d[2] * ax[2]], [d[0] / ax[0], d[1] / ax[1], d[2] / ax[2]]); }
    for (let j = 0; j < w; j++) for (let i = 0; i < u; i++) { const a = base + j * (u + 1) + i, b = a + u + 1; K.i.push(a, b, a + 1, a + 1, b, b + 1); }
}
export function colonistMesh(p, level = 0) {
    const K = new Kit({ hull: WHITE, dark: [.12, .12, .13, 1], steel: [.5, .52, .55, 1], trim: [.7, .7, .7, 1], accent: WHITE, glass: [.2, .25, .3, 1], window: [1, .9, .7, 1], detail: level ? .4 : 1 });
    const S = p.height / 1.1, H = 1.1, u = H / p.heads, hip = p.legs / S, low = level > 0, sides = low ? 5 : 9, suit = p.gear === 'tuta', mask = p.gear === 'maschera';
    const fabric = suit ? [.86, .87, .88, 1] : mask ? [.36, .38, .4, 1] : [.42, .4, .34, 1], boot = [.16, .15, .15, 1], bulk = suit ? 1.18 : 1;
    const chin = H - u, shoulder = H - 1.35 * u, waist = H - 3 * u, knee = hip * .52;
    // Legs: hip, knee and ankle, with boots; z > 0 is the left side, which the shader swings in opposite phase.
    for (const z of [1, -1]) {
        K.paint(fabric, .05, .8); sweep(K, [[0, hip + .02, z * .075 * bulk], [.012, knee, z * .07 * bulk], [-.005, .08, z * .068 * bulk]], t => (.058 - t * .02) * bulk, sides, { capEnd: true });
        K.paint(boot, .2, .6); ellipsoid(K, [.035, .035, z * .068 * bulk], [.07, .038, .036 * bulk], low ? 6 : 10, low ? 4 : 6);
        
    }
    // Pelvis and torso, lofted through sections: deeper at the chest, narrow at the waist, wide at the shoulders.
    const ring = (y, a, b, n = sides + 3, cx = 0) => Array.from({ length: n }, (_, j) => { const t = j / n * 2 * Math.PI; return [cx + Math.cos(t) * a * bulk, y, Math.sin(t) * b * bulk]; });
    K.paint(fabric, .05, .8); smooth(K, [ring(hip - .03, .068, .095), ring(hip + .06, .08, .115), ring(waist, .07, .105), ring(waist + .14 * H, .09, .135, undefined, .005), ring(shoulder - .02, .082, .155), ring(shoulder + .03, .06, .115), ring(chin - .02, .035, .04)], { capStart: true, capEnd: true });
    if (!low) { K.paint(WHITE, .05, .7); smooth(K, [ring(waist + .07 * H, .099, .144, undefined, .005), ring(waist + .1 * H, .1, .148, undefined, .006)]); K.paint(WHITE, .05, .7); smooth(K, [ring(shoulder - .1, .093, .155), ring(shoulder - .05, .09, .158)]); }
    // Arms, slightly bent, and hands.
    for (const z of [1, -1]) {
        const s0 = [0, shoulder - .01, z * .165 * bulk], el = [-.01, shoulder - .26 * H / 1.1, z * .185 * bulk], wr = [.04, waist - .2 * H / 1.1, z * .175 * bulk];
        K.paint(fabric, .05, .8); sweep(K, [s0, el, wr], t => (.042 - t * .012) * bulk, sides);
        K.paint(suit ? [.3, .3, .32, 1] : p.skin, .1, .6); ellipsoid(K, add3(wr, [.01, -.045, 0]), [.025, .045, .02], low ? 6 : 8, low ? 4 : 5);
    }
    // Head, hair, and the helmet or the respirator.
    const hc = [.008, chin + u * .5, 0];
    K.paint(p.skin, .05, .65); ellipsoid(K, hc, [.06 * H / 1.1, u * .5, .052 * H / 1.1], low ? 8 : 14, low ? 6 : 10); K.paint(p.skin, .05, .65); sweep(K, [[0, shoulder + .02, 0], [0, chin + .02, 0]], .028 * H / 1.1, 6, { capEnd: false });
    if (suit) {
        K.paint([.86, .87, .88, 1], .2, .45); ellipsoid(K, add3(hc, [-.005, .005, 0]), [.1, .105, .095], low ? 10 : 18, low ? 6 : 12);
        K.paint([.12, .1, .06, 1], .9, .08); const rows = []; for (let i = 0; i <= (low ? 3 : 6); i++) { const t = .32 + .3 * i / (low ? 3 : 6); rows.push(Array.from({ length: low ? 5 : 9 }, (_, j) => { const f = -.85 + 1.7 * j / (low ? 4 : 8); return [hc[0] - .005 + Math.cos(f) * Math.sin(t * Math.PI) * .103, hc[1] + .005 + Math.cos(t * Math.PI) * .107, Math.sin(f) * Math.sin(t * Math.PI) * .098]; })); }
        smooth(K, rows, { closed: false });
        K.paint([.82, .83, .84, 1], .3, .5); K.box([-.15 * bulk, waist + .2 * H, 0], [.055, .14, .11]); K.paint(WHITE, .1, .6); K.box([-.15 * bulk, waist + .32 * H, 0], [.057, .03, .112]);
        if (!low) { K.paint([1, .3, .2, 1], 0, .4, 2); K.box([-.2, waist + .36 * H, .07], [.01, .012, .012]); K.paint([.3, 1, .4, 1], 0, .4, 2); K.box([-.2, waist + .36 * H, -.07], [.01, .012, .012]); }
    } else {
        K.paint(p.hair, .05, .8); ellipsoid(K, add3(hc, [-.01, .018, 0]), [.064 * H / 1.1, u * .44, .056 * H / 1.1], low ? 8 : 12, low ? 4 : 6);
        if (mask) { K.paint([.2, .21, .22, 1], .4, .5); ellipsoid(K, add3(hc, [.045, -.03, 0]), [.03, .03, .035], 8, 5); K.paint(fabric, .05, .8); ellipsoid(K, add3(hc, [-.012, .01, 0]), [.066 * H / 1.1, u * .5, .058 * H / 1.1], low ? 8 : 12, low ? 4 : 7); K.paint([.5, .52, .55, 1], .5, .4); K.push([-.13, waist + .2 * H, 0]); K.cyl(.035, .035, -.12, .12, 8, { caps: true }); K.pop(); }
    }
    if (p.figure === 'zaino') { K.paint([.4, .42, .38, 1], .1, .7); K.box([-.13 * bulk - (suit ? .07 : 0), waist + .16 * H, 0], [.05, .1, .09]); K.paint([.5, .52, .55, 1], .6, .4); sweep(K, [[.05, waist - .17 * H, .2 * bulk], [.07, waist + .1 * H, .22 * bulk], [.09, waist + .25 * H, .22 * bulk]], .012, 5); }
    // Built at the height of an adult and scaled: a child keeps a larger head for its size.
    const m = K.mesh(); for (let i = 0; i < m.v.length; i += 16) for (let q = 0; q < 3; q++) m.v[i + q] *= S;
    return m;
}
const add3 = (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];

/** Body of the natives of a village, from its random source `r` and the identity card of the planet. Under
 * low gravity they are taller and slimmer, under high gravity shorter with thicker legs. */
export function nativeSpec(r, card) {
    const g = card.gravity, tall = Math.pow(1 / g, .25);
    return { height: round((.95 + r() * .45) * tall), neck: round(.04 + r() * .2), arms: r() < .3 ? 4 : 2, crest: r() < .5, tail: round(r() < .4 ? .3 + r() * .3 : 0), ears: round(r() * .14), thick: round(.04 + .02 * g), head: round(.09 + r() * .05),
        cloth: [...[0, 1, 2].map(() => round(.3 + r() * .6)), 1], eye: [...[0, 1, 2].map(() => round(r() * .3)), 1] };
}
/** A native body (1.67.0): digitigrade legs that walk on the balls of the feet, a slender torso on a long
 * neck, a small head with large eyes, two or four long arms, a tail where the plan has one, and a wrap of
 * cloth round the hips with a sash across the body. The skin is white and takes the tint of each inhabitant. */
export function nativeMesh(p, level = 0) {
    const S = new Shape(level), low = level > 0, H = p.height, hip = H * .46, chest = hip + H * .3, neckTop = chest + H * .1 + p.neck, ph = p.head, t = p.thick;
    for (const z of [1, -1]) {
        const w = z * .075;
        S.tube(curve([[0, hip + .02, w], [.07, hip * .62, w * 1.05], [-.06, hip * .28, w * 1.1], [.03, .06, w * 1.1], [.11, .02, w * 1.1]], S.n(2, 1)), q => t * (1.45 - q * 1.05), 7, WHITE, { capStart: true });
        if (!low) for (const dz of [-.025, 0, .025]) S.tube([[.09, .02, w * 1.1 + dz], [.15, .01, w * 1.1 + dz * 1.6]], .012, 3, WHITE);
    }
    // Pelvis, waist, ribcage and shoulders, then the neck and a small head looking forward.
    const spine = curve([[0, hip - .04, 0], [.01, hip + .06, 0], [.0, hip + H * .14, 0], [.02, chest - .02, 0], [.03, chest + .05, 0], [.05, neckTop - .02, 0]], S.n(2, 1)), K = spine.length - 1;
    const wy = profile([[0, .07], [.18, .1], [.42, .075], [.72, .1], [.84, .08], [1, .035]]), wz = profile([[0, .11], [.18, .13], [.42, .09], [.72, .14], [.84, .1], [1, .035]]);
    S.tube(spine, q => [wy(q), wz(q)], 9, WHITE, { capStart: true, capEnd: false, up: [1, 0, 0] });
    const hc = [.06 + ph * .35, neckTop + ph * .75, 0];
    S.tube(curve([[.04, neckTop - .04, 0], [hc[0] - ph * .6, hc[1] - ph * .3, 0], [hc[0], hc[1], 0], [hc[0] + ph * 1.05, hc[1] - ph * .25, 0]], S.n(2, 1)), q => [ph * (.5 + .55 * Math.sin(Math.PI * Math.min(1, q * 1.15))), ph * (.45 + .45 * Math.sin(Math.PI * Math.min(1, q * 1.15)))], 9, WHITE, { capStart: true });
    if (!low) for (const z of [1, -1]) S.ellipsoid([hc[0] + ph * .55, hc[1] + ph * .2, z * ph * .42], [ph * .22, ph * .18, ph * .14], 7, 5, p.eye);
    if (p.ears) for (const z of [1, -1]) S.ribbon(curve([[hc[0] - ph * .1, hc[1] + ph * .5, z * ph * .5], [hc[0] - ph * .4 - p.ears * .3, hc[1] + ph * .7 + p.ears * .6, z * (ph * .6 + p.ears * .5)]], 2), q => ph * .25 * (1 - q * .8), [1, 0, 0], WHITE, { fold: .2 });
    if (p.crest) S.ribbon(curve([[hc[0] - ph * .9, hc[1] + ph * .4, 0], [hc[0] - ph * .2, hc[1] + ph * 1.2, 0], [hc[0] + ph * .5, hc[1] + ph * .9, 0]], 2), ph * .3, [0, 1, 0], p.cloth);
    // Arms: one or two pairs, long and thin, slightly bent forward.
    for (const [k, y] of (p.arms === 4 ? [chest, chest - H * .1] : [chest]).entries()) for (const z of [1, -1]) {
        const sh = [.02, y, z * .13];
        S.tube(curve([sh, [.04, y - H * .16, z * .16], [.12, y - H * .29, z * .15], [.16, y - H * .35 - .02 * k, z * .14]], S.n(2, 1)), q => .032 - q * .016, 6, WHITE, { capStart: true });
    }
    if (p.tail) S.tube(curve([[-.08, hip + .02, 0], [-.1 - p.tail * .5, hip - .05, 0], [-.1 - p.tail, hip - .2, 0]], 2), q => .045 * (1 - q * .8), 6, WHITE);
    // Cloth: a wrap from the hips to mid thigh and a sash from the shoulder across the body.
    const wrap = []; for (const [y, k] of [[hip + .08, 1.05], [hip - .02, 1.12], [hip - H * .1, 1.25]]) wrap.push(Array.from({ length: S.n(14, 7) }, (_, j) => { const a = j / S.n(14, 7) * Math.PI * 2; return [Math.cos(a) * .085 * k + .005, y + (low ? 0 : .015 * Math.sin(a * 3)), Math.sin(a) * .135 * k]; }));
    S.surface(wrap, p.cloth);
    if (!low) S.tube(curve([[.1, chest + .03, .1], [.115, hip + H * .17, 0], [.07, hip + .05, -.11], [-.06, hip + .08, -.1], [-.09, hip + H * .2, .02], [-.05, chest + .04, .11], [.1, chest + .03, .1]], 2), .018, 4, p.cloth, { capEnd: false });
    // The body is built with a long neck and then scaled, so the top of the head is at the height of the plan.
    const m = S.mesh(), k = nativeScale(p); for (let i = 0; i < m.v.length; i += 12) for (let q = 0; q < 3; q++) m.v[i + q] *= k;
    return m;
}
/** Scale that brings the top of the head of a native body to its height. */
const nativeScale = p => p.height / (p.height * .86 + p.neck + p.head * 1.7);
/** Hip height of a native body: the legs below it swing while walking. */
export const nativeLegs = p => p.height * .46 * nativeScale(p);
