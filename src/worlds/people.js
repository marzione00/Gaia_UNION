/** Inhabitants of the settlements (1.64.0): the colonists, in three figures, and the native people of the
 * villages, whose body is drawn for each village from the card of its planet. Meshes face +x, are about 1.1
 * units tall at scale 1 for an adult colonist and have white clothes or skin, which take the colour of each
 * instance. The legs end at the hip height `legs`, which the shader uses to swing them while walking. */
import { sphereMesh } from '../renderer.js';
import { tubePath } from '../education/geometry.js';
import { shaped } from './geometry.js';
import { merge } from './bodyplan.js';

const WHITE = [1, 1, 1, 1], round = x => Math.round(x * 1000) / 1000;
const LEVEL = [{ sphere: [10, 7], tube: 6 }, { sphere: [6, 4], tube: 3 }];
const spheres = new Map(), sphere = (u, v) => spheres.get(u * 100 + v) || (spheres.set(u * 100 + v, sphereMesh(u, v)), spheres.get(u * 100 + v));
const blob = (L, scale, move, color) => shaped(sphere(...L.sphere), { scale, move, color });
const tube = (L, points, r, color) => shaped(tubePath(points, r, L.tube), { color });
/** Skin tones of the colonists and the colours of their suits and trousers. */
const SKINS = [[.96, .8, .68, 1], [.82, .62, .46, 1], [.6, .42, .3, 1], [.38, .26, .19, 1]];
export const COLONIST_FIGURES = Object.freeze(['adulto', 'zaino', 'bambino']);

/** Spec of a colonist figure: `suit` where the air cannot be breathed (helmet and backpack). */
export function colonistSpec(figure, suit, k = 0) {
    return { figure, suit, skin: SKINS[k % SKINS.length], legs: figure === 'bambino' ? .32 : .5, trousers: suit ? [.82, .84, .86, 1] : [.2, .22, .28, 1] };
}
export function colonistMesh(p, level = 0) {
    const L = LEVEL[level], parts = [], child = p.figure === 'bambino', hip = p.legs, k = child ? .72 : 1, head = child ? .1 : .085;
    for (const z of [.07, -.07]) parts.push(tube(L, [[0, hip, z * k], [.02, hip * .5, z * k], [0, .02, z * k]], .045 * k, p.trousers));
    for (const z of [.06, -.06]) parts.push(blob(L, [.07, .035, .045], [.04, .03, z * k], [.15, .14, .14, 1]));
    parts.push(blob(L, [.12 * k, .21 * k, .15 * k], [0, hip + .18 * k, 0], WHITE));
    for (const z of [.17, -.17]) parts.push(tube(L, [[0, hip + .3 * k, z * k], [.04, hip + .12 * k, z * 1.1 * k], [.08, hip - .02 * k, z * 1.05 * k]], .035 * k, WHITE));
    const top = hip + .43 * k + head;
    parts.push(blob(L, [head, head * 1.1, head], [0, top, 0], p.skin));
    if (p.suit) { parts.push(blob(L, [head * 1.55, head * 1.5, head * 1.55], [0, top + .01, 0], [.45, .62, .72, 1])); parts.push(blob(L, [.07, .16, .12], [-.15, hip + .2, 0], [.55, .58, .62, 1])); }
    else if (p.figure === 'zaino') parts.push(blob(L, [.07, .13, .1], [-.14, hip + .2, 0], [.42, .3, .2, 1]));
    if (p.figure === 'zaino' && !p.suit) parts.push(tube(L, [[.08, hip, .2], [.1, hip + .5, .22]], .02, [.5, .5, .52, 1]));
    return merge(parts);
}

/** Body of the natives of a village, from its random source `r` and the identity card of the planet. Under
 * low gravity they are taller and slimmer, under high gravity shorter with thicker legs. */
export function nativeSpec(r, card) {
    const g = card.gravity, tall = Math.pow(1 / g, .25);
    return { height: round((.95 + r() * .45) * tall), neck: round(.04 + r() * .2), arms: r() < .3 ? 4 : 2, crest: r() < .5, tail: round(r() < .4 ? .3 + r() * .3 : 0), ears: round(r() * .14), thick: round(.04 + .02 * g), head: round(.09 + r() * .05),
        cloth: [...[0, 1, 2].map(() => round(.3 + r() * .6)), 1], eye: [...[0, 1, 2].map(() => round(r() * .3)), 1] };
}
export function nativeMesh(p, level = 0) {
    const L = LEVEL[level], parts = [], H = p.height, hip = H * .46, chest = hip + H * .22, neckTop = chest + H * .12 + p.neck;
    for (const z of [.08, -.08]) parts.push(tube(L, [[0, hip, z], [.05, hip * .5, z * 1.1], [0, .02, z * 1.1]], p.thick, WHITE));
    parts.push(blob(L, [.13, H * .17, .14], [0, hip + H * .13, 0], WHITE));
    parts.push(blob(L, [.15, .07, .16], [0, hip + .02, 0], p.cloth));
    parts.push(tube(L, [[0, chest, 0], [.03, neckTop, 0]], .045, WHITE));
    parts.push(blob(L, [p.head * 1.25, p.head, p.head * .9], [.05, neckTop + p.head * .7, 0], WHITE));
    for (const z of [.035, -.035]) parts.push(blob(L, [.022, .022, .022], [.05 + p.head * 1.1, neckTop + p.head * .85, z * 1.6], p.eye));
    const pairs = p.arms === 4 ? [chest, chest - H * .1] : [chest];
    for (const y of pairs) for (const z of [.16, -.16]) parts.push(tube(L, [[0, y, z * .8], [.05, y - H * .14, z * 1.05], [.1, y - H * .26, z]], .03, WHITE));
    if (p.tail) parts.push(tube(L, [[-.1, hip, 0], [-.1 - p.tail * .6, hip - .1, 0], [-.1 - p.tail, hip - .25, 0]], .04, WHITE));
    if (p.crest) parts.push(blob(L, [p.head * .9, p.head * .45, .02], [.0, neckTop + p.head * 1.55, 0], p.cloth));
    if (p.ears) for (const z of [1, -1]) parts.push(tube(L, [[.02, neckTop + p.head, z * p.head * .7], [-.02, neckTop + p.head + p.ears, z * (p.head * .7 + p.ears * .6)]], .02, WHITE));
    return merge(parts);
}
/** Hip height of a native body: the legs below it swing while walking. */
export const nativeLegs = p => p.height * .46;
