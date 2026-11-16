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
