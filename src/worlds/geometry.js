/** Small meshes for the planet phenomena. Every vertex: position, normal, uv, colour (12 floats). */
import { sphereMesh } from '../renderer.js';
import { tubePath, mergeMeshes } from '../education/geometry.js';

/** Copy of a mesh with a transform applied to positions and normals and a uniform colour. */
export function shaped(mesh, { scale = [1, 1, 1], move = [0, 0, 0], turn = 0, tilt = 0, color = null } = {}) {
    const v = new Float32Array(mesh.v), c = Math.cos(turn), s = Math.sin(turn), ct = Math.cos(tilt), st = Math.sin(tilt);
    const rot = p => { let [x, y, z] = p; [y, z] = [y * ct - z * st, y * st + z * ct]; return [c * x + s * z, y, -s * x + c * z]; };
    for (let i = 0; i < v.length; i += 12) {
        const p = rot([v[i] * scale[0], v[i + 1] * scale[1], v[i + 2] * scale[2]]), n = rot([v[i + 3] / scale[0], v[i + 4] / scale[1], v[i + 5] / scale[2]]), l = Math.hypot(...n) || 1;
        v.set([p[0] + move[0], p[1] + move[1], p[2] + move[2], n[0] / l, n[1] / l, n[2] / l], i);
        if (color) v.set(color, i + 8);
    }
    return { v, i: new Uint32Array(mesh.i), stride: 12 };
}
const tinted = (mesh, color) => shaped(mesh, { color });

/** Flat disc facing up, centred at the origin, radius 1. */
export function disc(segments = 40) {
    const v = [0, 0, 0, 0, 1, 0, .5, .5, 1, 1, 1, 1], i = [];
    for (let k = 0; k <= segments; k++) { const a = k / segments * Math.PI * 2; v.push(Math.cos(a), 0, Math.sin(a), 0, 1, 0, .5 + Math.cos(a) / 2, .5 + Math.sin(a) / 2, 1, 1, 1, 1); if (k < segments) i.push(0, k + 2, k + 1); }
    return { v: new Float32Array(v), i: new Uint32Array(i), stride: 12 };
}
/** Plane grid facing up, used for the open sea; vertex heights are displaced in the shader. */
export function seaPlane(width = 150, depth = 110, nx = 150, nz = 110, cx = -2, cz = -1) {
    const v = [], i = [];
    for (let z = 0; z <= nz; z++) for (let x = 0; x <= nx; x++) v.push(cx - width / 2 + width * x / nx, 0, cz - depth / 2 + depth * z / nz, 0, 1, 0, x / nx, z / nz, 1, 1, 1, 1);
    for (let z = 0; z < nz; z++) for (let x = 0; x < nx; x++) { const a = z * (nx + 1) + x; i.push(a, a + nx + 1, a + 1, a + 1, a + nx + 1, a + nx + 2); }
    return { v: new Float32Array(v), i: new Uint32Array(i), stride: 12 };
}
/** A daisy about one unit tall: green stem, ten petals, a yellow centre. Petals take the instance colour. */
export function daisy() {
    const stem = tinted(tubePath([[0, 0, 0], [.04, .45, .02], [0, .9, 0]], .05, 5), [.28, .52, .22, 1]);
    const petal = shaped(sphereMesh(8, 6), { scale: [.32, .045, .11], move: [.3, 0, 0] }), parts = [];
    for (let k = 0; k < 10; k++) parts.push(shaped(petal, { turn: k * Math.PI / 5, move: [0, .92, 0], color: [1, 1, 1, 1] }));
    const head = mergeMeshes(parts);
    const centre = shaped(sphereMesh(10, 8), { scale: [.17, .08, .17], move: [0, .95, 0], color: [.98, .78, .22, 1] });
    return mergeMeshes([stem, head, centre]);
}
/** Grazing animal facing +x, about 1.3 units long: body, neck, head, four legs and a tail. */
export function grazer() {
    const sphere = sphereMesh(14, 10), parts = [];
    parts.push(shaped(sphere, { scale: [.62, .36, .3], move: [0, .78, 0], color: [1, 1, 1, 1] }));
    parts.push(shaped(sphere, { scale: [.22, .16, .15], move: [.72, 1.05, 0], color: [.92, .9, .86, 1] }));
    parts.push(tinted(tubePath([[.45, .9, 0], [.66, 1.04, 0]], .11, 6), [1, 1, 1, 1]));
    for (const [x, z] of [[.36, .16], [.36, -.16], [-.38, .16], [-.38, -.16]]) parts.push(tinted(tubePath([[x, .7, z], [x + .02, .35, z], [x, 0, z]], .055, 5), [.55, .5, .45, 1]));
    parts.push(tinted(tubePath([[-.6, .86, 0], [-.78, .7, 0], [-.82, .5, 0]], .04, 5), [.7, .66, .6, 1]));
    for (const z of [.07, -.07]) parts.push(shaped(sphere, { scale: [.035, .035, .035], move: [.9, 1.1, z], color: [.05, .05, .05, 1] }));
    return mergeMeshes(parts);
}
/** Tuft of grass blades, colour from the instance. */
export function tuft() {
    const parts = [];
    for (let k = 0; k < 5; k++) { const a = k * 1.3, r = .12; parts.push(tinted(tubePath([[Math.cos(a) * r * .3, 0, Math.sin(a) * r * .3], [Math.cos(a) * r, .35, Math.sin(a) * r], [Math.cos(a) * r * 2.2, .7, Math.sin(a) * r * 2.2]], .035, 4), [1, 1, 1, 1])); }
    return mergeMeshes(parts);
}
/** Low dark cone with a glowing mouth, for the geothermal vent. */
export function vent() {
    const ring = (y, r) => Array.from({ length: 25 }, (_, k) => { const a = k / 24 * Math.PI * 2; return [Math.cos(a) * r, y, Math.sin(a) * r]; });
    const parts = [];
    for (const [y, r] of [[0, 2.4], [.6, 1.9], [1.2, 1.4], [1.7, 1.0]]) parts.push(tinted(tubePath(ring(y, r), .42, 6), [.16, .13, .12, 1]));
    parts.push(shaped(sphereMesh(16, 10), { scale: [.85, .25, .85], move: [0, 1.75, 0], color: [1, .45, .15, 1] }));
    return mergeMeshes(parts);
}

/** Compact research station facing +x: hexagonal pad, white dome, antenna with a glowing tip. */
export function station() {
    const hex = Array.from({ length: 7 }, (_, k) => { const a = Math.PI / 6 + k * Math.PI / 3; return [Math.cos(a) * 2.6, .15, Math.sin(a) * 2.6]; });
    const pad = shaped(disc(6), { scale: [2.6, 1, 2.6], move: [0, .3, 0], turn: Math.PI / 6, color: [.42, .46, .5, 1] });
    const rim = tinted(tubePath(hex, .16, 5), [.3, .33, .36, 1]);
    const dome = shaped(sphereMesh(20, 12), { scale: [1.45, 1.15, 1.45], move: [0, .3, 0], color: [.9, .92, .94, 1] });
    const band = tinted(tubePath(Array.from({ length: 25 }, (_, k) => { const a = k / 24 * Math.PI * 2; return [Math.cos(a) * 1.46, .62, Math.sin(a) * 1.46]; }), .07, 5), [.3, .62, .9, 1]);
    const mast = tinted(tubePath([[.9, 1, .5], [.95, 2.6, .5], [1, 3.4, .5]], .05, 5), [.75, .78, .8, 1]);
    const tip = shaped(sphereMesh(8, 6), { scale: [.16, .16, .16], move: [1, 3.45, .5], color: [1, .78, .35, 1] });
    return mergeMeshes([pad, rim, dome, band, mast, tip]);
}
/** Rock: a flattened, slightly irregular sphere. */
export function rock() { const m = shaped(sphereMesh(10, 7), { scale: [1, .55, .8] }); for (let i = 0; i < m.v.length; i += 12) { const k = 1 + .18 * Math.sin(m.v[i] * 7.1 + m.v[i + 2] * 5.3); m.v[i] *= k; m.v[i + 1] *= k; m.v[i + 2] *= k; } return m; }

// Body plans of the species (src/worlds/species.js). White parts take the colour of the species.
const WHITE = [1, 1, 1, 1];
/** Fern rosette: seven leaves rising from a bud. */
export function frond() {
    const leaf = shaped(sphereMesh(8, 5), { scale: [.13, .035, .5], move: [0, 0, .5] }), parts = [];
    for (let k = 0; k < 7; k++) parts.push(shaped(shaped(leaf, { tilt: -.55 - .18 * (k % 2) }), { turn: k * Math.PI * 2 / 7, move: [0, .08, 0], color: WHITE }));
    parts.push(shaped(sphereMesh(8, 6), { scale: [.12, .14, .12], move: [0, .1, 0], color: [.3, .25, .18, 1] }));
    return mergeMeshes(parts);
}
/** Umbrella tree: slender trunk, two flat layers of leaves. */
export function tree() {
    const trunk = tinted(tubePath([[0, 0, 0], [.06, 1.1, .02], [-.02, 2.2, .05], [0, 2.65, 0]], .13, 7), [.34, .26, .2, 1]);
    const crown = shaped(sphereMesh(18, 10), { scale: [1.5, .36, 1.5], move: [0, 2.7, 0], color: WHITE });
    const top = shaped(sphereMesh(14, 8), { scale: [.95, .3, .95], move: [.1, 3, -.05], color: WHITE });
    return mergeMeshes([trunk, crown, top]);
}
/** Ribbed column with two arms and a flower, like a cactus. */
export function column() {
    const body = shaped(sphereMesh(16, 14), { scale: [.32, 1.2, .32], move: [0, 1.1, 0], color: WHITE });
    for (let i = 0; i < body.v.length; i += 12) { const k = 1 + .09 * Math.cos(Math.atan2(body.v[i + 2], body.v[i]) * 8); body.v[i] *= k; body.v[i + 2] *= k; }
    const arm = (a, b, c, r) => [tinted(tubePath([a, b, c], r, 7), WHITE), shaped(sphereMesh(8, 6), { scale: [r, r, r], move: c, color: WHITE })];
    const flower = shaped(sphereMesh(8, 6), { scale: [.13, .1, .13], move: [0, 2.32, 0], color: [.96, .6, .66, 1] });
    return mergeMeshes([body, ...arm([.2, .9, 0], [.55, 1, 0], [.62, 1.5, 0], .14), ...arm([-.2, 1.2, .05], [-.5, 1.3, .05], [-.55, 1.75, .05], .12), flower]);
}
/** Low cushion of small rounded shoots. */
export function cushion() {
    const parts = [shaped(sphereMesh(12, 8), { scale: [.6, .3, .6], move: [0, .02, 0], color: WHITE })];
    for (let k = 0; k < 9; k++) { const a = k * 2.4, d = .2 + .125 * (k % 3); parts.push(shaped(sphereMesh(6, 4), { scale: [.16, .12, .16], move: [Math.cos(a) * d, .18 + .08 * (1 - d), Math.sin(a) * d], color: WHITE })); }
    return mergeMeshes(parts);
}
/** Group of pale tubes with coloured plumes, like the tube worms of hydrothermal vents. */
export function cup() {
    const parts = [];
    for (const [x, z, h] of [[0, 0, 1.1], [.28, .12, .8], [-.22, .2, .65], [.05, -.3, .9]]) {
        parts.push(tinted(tubePath([[x, 0, z], [x + .03, h * .5, z], [x, h, z]], .09, 7), [.86, .84, .78, 1]));
        parts.push(shaped(sphereMesh(10, 6), { scale: [.17, .14, .17], move: [x, h + .08, z], color: WHITE }));
    }
    return mergeMeshes(parts);
}
/** Flat irregular crust with a few small bumps. */
export function patch() {
    const m = shaped(disc(18), { move: [0, .03, 0], color: WHITE });
    for (let i = 12; i < m.v.length; i += 12) { const a = Math.atan2(m.v[i + 2], m.v[i]), k = .75 + .25 * Math.sin(a * 3 + 1) + .1 * Math.sin(a * 7); m.v[i] *= k; m.v[i + 2] *= k; }
    const bumps = Array.from({ length: 6 }, (_, k) => { const a = k * 1.9, d = .25 + .1 * k / 6; return shaped(sphereMesh(6, 4), { scale: [.12, .05, .12], move: [Math.cos(a) * d, .04, Math.sin(a) * d], color: WHITE }); });
    return mergeMeshes([m, ...bumps]);
}
/** Six-legged walker facing +x: abdomen, thorax, head, legs and antennae. */
export function hexapod() {
    const s = sphereMesh(12, 8), dark = [.2, .18, .16, 1], parts = [];
    parts.push(shaped(s, { scale: [.42, .2, .27], move: [-.28, .34, 0], color: WHITE }));
    parts.push(shaped(s, { scale: [.22, .16, .2], move: [.14, .36, 0], color: WHITE }));
    parts.push(shaped(s, { scale: [.13, .11, .13], move: [.38, .38, 0], color: [.16, .14, .13, 1] }));
    for (const x of [.22, .08, -.08]) for (const side of [1, -1]) parts.push(tinted(tubePath([[x, .32, .12 * side], [x + .06, .42, .36 * side], [x + .12, 0, .5 * side]], .028, 4), dark));
    for (const side of [1, -1]) parts.push(tinted(tubePath([[.46, .42, .04 * side], [.62, .6, .14 * side], [.72, .62, .2 * side]], .015, 4), dark));
    return mergeMeshes(parts);
}
/** Flyer facing +x with the wings along z (they flap in the shader, instance mode 4). */
export function flyer() {
    const s = sphereMesh(10, 6), parts = [];
    parts.push(shaped(s, { scale: [.42, .12, .13], color: WHITE }));
    parts.push(shaped(s, { scale: [.11, .1, .1], move: [.44, .04, 0], color: WHITE }));
    parts.push(shaped(s, { scale: [.07, .03, .03], move: [.58, .03, 0], color: [.9, .7, .3, 1] }));
    for (const side of [1, -1]) parts.push(shaped(s, { scale: [.26, .02, .7], move: [-.02, .03, .72 * side], color: WHITE }));
    parts.push(shaped(s, { scale: [.22, .015, .14], move: [-.5, .02, 0], color: WHITE }));
    return mergeMeshes(parts);
}
/** Floating colony: gas float, a sail and tentacles under the water. */
export function floater() {
    const s = sphereMesh(14, 8), parts = [shaped(s, { scale: [.6, .28, .45], move: [0, .1, 0], color: WHITE }), shaped(s, { scale: [.42, .3, .05], move: [0, .42, 0], color: WHITE })];
    for (let k = 0; k < 6; k++) { const a = k * Math.PI / 3, x = Math.cos(a) * .3, z = Math.sin(a) * .22; parts.push(tinted(tubePath([[x, 0, z], [x * 1.2, -.5, z * 1.2], [x * .9, -1, z * .9]], .03, 4), [.75, .8, .95, 1])); }
    return mergeMeshes(parts);
}
/** Marker of a point of interest: base and pole (the coloured top is drawn separately). */
export function beacon() {
    return mergeMeshes([tinted(tubePath([[0, 0, 0], [0, 2.5, 0], [0, 5, 0]], .08, 6), [.82, .85, .88, 1]), shaped(disc(18), { scale: [.9, 1, .9], move: [0, .05, 0], color: [.5, .55, .6, 1] })]);
}
/** Aurora curtain in sky coordinates around the eye: an arc of `span` radians centred on `azimuth`,
 * between two wavy elevations, opaque at the bottom and transparent at the top (vertex alpha). */
export function curtain(azimuth, span, seed, distance = 260, low = .012, height = .14) {
    const v = [], i = [], n = 96;
    for (let k = 0; k <= n; k++) {
        const u = k / n, a = azimuth - span / 2 + span * u, d = distance * (1 + .05 * Math.sin(u * 9 + seed)), e0 = low + .01 * Math.sin(u * 5 + seed * 2), e1 = e0 + height * (.75 + .25 * Math.sin(u * 13 + seed));
        const x = Math.cos(a), z = Math.sin(a), edge = Math.min(1, Math.min(u, 1 - u) * 8);
        for (const [e, alpha] of [[e0, .95 * edge], [e1, 0]]) v.push(x * d, Math.tan(e) * d, z * d, -x, 0, -z, u, e === e0 ? 0 : 1, 1, 1, 1, alpha);
        if (k < n) { const b = k * 2; i.push(b, b + 1, b + 2, b + 1, b + 3, b + 2, b, b + 2, b + 1, b + 1, b + 2, b + 3); }
    }
    return { v: new Float32Array(v), i: new Uint32Array(i), stride: 12 };
}
