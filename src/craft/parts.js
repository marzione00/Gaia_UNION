/** Modules shared by stations and ships: solar wings, radiators, hangars, masts, tanks, coils, pipes,
 * hazard stripes, pods, polyhedra and tubes swept along curves. Each module draws into a Kit at its
 * current frame. Seeds and choices come from the caller, so the modules are deterministic. */
import { TAU, hash, add, sub, scale, cross, unit, WHITE, RED, GREEN, AMBER } from './kit.js';

const shade = (c, k) => [c[0] * k, c[1] * k, c[2] * k, c[3] ?? 1];
export { shade };

/** Solar array centred at the origin in the xz plane: frame and dark cells on both faces. */
export function solarWing(k, len, wid, cells = [8, 3]) {
    k.steel(); k.box([0, 0, 0], [len / 2, .03, wid / 2]);
    const [nx, nz] = cells, cw = len / nx, cd = wid / nz, P = k.style.panel;
    k.paint(P, .2, .25, 0);
    for (let i = 0; i < nx; i++) for (let j = 0; j < nz; j++) for (const y of [.035, -.035]) {
        const x0 = -len / 2 + i * cw + .05, z0 = -wid / 2 + j * cd + .05, x1 = x0 + cw - .1, z1 = z0 + cd - .1, t = .85 + .3 * hash(i, j, len);
        const c = [P[0] * t, P[1] * t, P[2] * t + .03 * hash(j, i), 1];
        if (y > 0) k.quad([x0, y, z0], [x0, y, z1], [x1, y, z1], [x1, y, z0], c); else k.quad([x0, y, z0], [x1, y, z0], [x1, y, z1], [x0, y, z1], c);
    }
}
/** Radiator panel in the xy plane, pale with ribs; `hot` adds a glowing root along its lower edge. */
export function radiator(k, w, h, ribs = 6, hot = 0) {
    k.paint([.8, .8, .8, 1], .2, .6); k.box([0, 0, 0], [w / 2, h / 2, .025], Math.max(w, h) / ribs);
    k.steel(); for (let r = 0; r <= ribs; r++) k.box([-w / 2 + r * w / ribs, 0, 0], [.025, h / 2, .045]);
    if (hot) { k.glow([1, .45, .2, 1], 1.2 * hot); k.box([0, -h / 2 - .04, 0], [w / 2, .05, .06]); }
}
/** Hangar facing +x: plated pod with a recessed lit mouth, an accent frame and approach beacons. */
export function hangar(k, R = 1.05, L = 2.2, beacons = 5, sides = 6) {
    k.push([0, 0, 0], [0, 0, -Math.PI / 2]);
    k.hull(); k.cyl(R, R, -L / 2, L / 2, sides, { bands: 4, caps: false });
    k.dark(); k.cyl(R, R * .6, -L / 2, -L / 2 - .5, sides, { bands: 1 });
    k.accent(.5); k.cyl(R * 1.05, R * 1.05, L / 2 - .12, L / 2 + .02, sides, { caps: false }); k.cyl(R * 1.05, R * .82, L / 2 + .02, L / 2 + .02, sides, { caps: false });
    k.paint([.55, .5, .42, 1], .2, .6, .55); k.cyl(R * .8, R * .8, L / 2 + .02, -L / 2 + .5, sides, { caps: false, outward: false });
    k.glow(k.style.window, 2.4); k.cyl(R * .8, R * .8, -L / 2 + .5, -L / 2 + .52, sides);
    for (let q = 0; q < 3; q++) { k.glow(k.style.window, 2); k.cyl(R * .79, R * .79, -L / 2 + .9 + q * .45, -L / 2 + .95 + q * .45, sides, { caps: false, outward: false }); }
    k.pop();
    for (const sy of [1, -1]) {
        k.steel(); k.beam([L / 2, sy * R * .75, 0], [L / 2 + beacons * .55, sy * R * .75, 0], .035);
        for (let b = 1; b <= beacons; b++) k.light([L / 2 + b * .55, sy * R * .75, 0], b === beacons ? WHITE : GREEN, .06, -(b * .18));
    }
}
/** Antenna mast along +y with crossbars and a blinking tip. */
export function mast(k, h, bars = 2, blink = 1) {
    k.paint(k.style.steel, .8, .35); k.cyl(.08, .05, 0, h, 8);
    for (let b = 0; b < bars; b++) { const y = h * (.45 + .4 * b / Math.max(1, bars)); k.box([0, y, 0], [.5 - b * .12, .025, .025]); }
    k.light([0, h + .1, 0], WHITE, .14, blink);
}
/** Small dish on a stalk opening towards +y. */
export function smallDish(k, R, depth = .3) {
    k.steel(); k.cyl(.06, .06, -.5, 0, 8);
    k.paint([.88, .9, .92, 1], .25, .35); k.dish(R, depth, 24, 5);
    k.steel(); k.beam([0, 0, 0], [0, R * .9, 0], .03); k.dark(); k.box([0, R * .9, 0], [.08, .08, .08]);
}
/** Spherical tank with an equatorial belt; chemistry draws hazard stripes on the belt. */
export function tank(k, c, r, color = null, glow = 0) {
    k.paint(color || [.82, .82, .8, 1], .35, .45); k.sphere(c, r, 20, 14);
    k.push(c);
    if (k.style.pipes) hazardBand(k, r * 1.01, -.12 * r, .12 * r, 20); else { k.accent(glow); k.cyl(r * 1.01, r * 1.01, -.1 * r, .1 * r, 20, { caps: false }); }
    k.pop();
}
/** Capsule tank along y. */
export function capsuleTank(k, r, y0, y1, color = null) {
    k.paint(color || [.82, .82, .8, 1], .35, .45); k.capsule(r, y0, y1, 18, Math.max(1, Math.round((y1 - y0) / .8)));
    k.trim(); k.cyl(r * 1.02, r * 1.02, (y0 + y1) / 2 - .08, (y0 + y1) / 2 + .08, 18, { caps: false });
}
/** Ring of diagonal hazard stripes around the y axis. */
export function hazardBand(k, r, y0, y1, seg = 24) {
    const tilt = TAU / seg * .5;
    for (let s = 0; s < seg; s++) {
        const a0 = s / seg * TAU, a1 = (s + 1) / seg * TAU, P = (a, y) => [Math.cos(a) * r, y, Math.sin(a) * r];
        k.paint(s % 2 ? k.style.trim : [.08, .08, .08, 1], .3, .5);
        k.quad(P(a0, y0), P(a0 + tilt, y1), P(a1 + tilt, y1), P(a1, y0));
    }
}
/** Coil: stack of glowing rings around the y axis between y0 and y1. */
export function coil(k, r, y0, y1, turns = 5, w = .07) {
    for (let t = 0; t < turns; t++) {
        const y = y0 + (y1 - y0) * (t + .5) / turns;
        const seg = Math.max(12, Math.min(40, Math.round(r * 16)));
        k.push([0, y, 0]); k.trim(); k.torus(r, w, seg, 6); k.accent(1.1); k.torus(r + w * .7, w * .35, seg, 4); k.pop();
    }
}
/** Pipe swept along a polyline with rounded joints. */
export function pipe(k, pts, r = .07, color = null) {
    k.paint(color || k.style.trim, .6, .45);
    for (let s = 0; s + 1 < pts.length; s++) tube(k, [pts[s], pts[s + 1]], r, 8, false);
    for (const p of pts.slice(1, -1)) k.sphere(p, r * 1.15, 8, 6);
}
/** Tube of radius r swept along points, with parallel-transport frames. */
export function tube(k, pts, r, sides = 10, closed = false) {
    const n = pts.length, T = pts.map((p, i) => unit(sub(pts[closed ? (i + 1) % n : Math.min(n - 1, i + 1)], pts[closed ? (i - 1 + n) % n : Math.max(0, i - 1)])));
    let N = unit(cross(T[0], Math.abs(T[0][1]) < .9 ? [0, 1, 0] : [1, 0, 0])); const base = k.v.length / 16, rings = closed ? n + 1 : n;
    for (let i = 0; i < rings; i++) {
        const j = i % n, t = T[j]; N = unit(sub(N, scale(t, N[0] * t[0] + N[1] * t[1] + N[2] * t[2]))); const B = cross(t, N);
        for (let s = 0; s <= sides; s++) { const a = s / sides * TAU, nn = add(scale(N, Math.cos(a)), scale(B, Math.sin(a))); k.vertex(add(pts[j], scale(nn, r)), nn, i / rings, s / sides); }
    }
    for (let i = 0; i + 1 < rings; i++) for (let s = 0; s < sides; s++) { const a = base + i * (sides + 1) + s, b = a + sides + 1; k.i.push(a, a + 1, b + 1, a, b + 1, b); }
    if (!closed) for (const [i, sgn] of [[0, -1], [rings - 1, 1]]) { const c = k.vertex(pts[i], scale(T[i], sgn)); for (let s = 0; s < sides; s++) { const a = base + i * (sides + 1) + s; if (sgn > 0) k.i.push(c, a, a + 1); else k.i.push(c, a + 1, a); } }
}
/** Closed curve of a (p, q) torus knot of major radius R and tube offset a. */
export const torusKnot = (p, q, R, a, n = 160) => Array.from({ length: n }, (_, i) => { const t = i / n * TAU, w = R + a * Math.cos(q * t); return [w * Math.cos(p * t), a * Math.sin(q * t), w * Math.sin(p * t)]; });

// Convex polyhedra from their vertices: faces are found once per solid and cached.
const PHI = (1 + Math.sqrt(5)) / 2;
const perms = (v, all = false) => { const out = [], cyc = [[0, 1, 2], [1, 2, 0], [2, 0, 1]], every = [[0, 1, 2], [0, 2, 1], [1, 0, 2], [1, 2, 0], [2, 0, 1], [2, 1, 0]]; for (const p of all ? every : cyc) for (const sx of [1, -1]) for (const sy of [1, -1]) for (const sz of [1, -1]) { const w = [v[p[0]] * sx, v[p[1]] * sy, v[p[2]] * sz]; if (!out.some(o => Math.hypot(o[0] - w[0], o[1] - w[1], o[2] - w[2]) < 1e-6)) out.push(w); } return out; };
const SOLIDS = {
    tetraedro: () => [[1, 1, 1], [1, -1, -1], [-1, 1, -1], [-1, -1, 1]],
    cubo: () => perms([1, 1, 1]),
    ottaedro: () => perms([1, 0, 0]),
    icosaedro: () => perms([0, 1, PHI]),
    dodecaedro: () => [...perms([1, 1, 1]), ...perms([0, 1 / PHI, PHI])],
    cubottaedro: () => perms([1, 1, 0]),
    'ottaedro troncato': () => perms([0, 1, 2], true),
    'dodecaedro rombico': () => [...perms([1, 1, 1]), ...perms([2, 0, 0])],
    'icosaedro troncato': () => [...perms([0, 1, 3 * PHI]), ...perms([1, 2 + PHI, 2 * PHI]), ...perms([PHI, 2, PHI ** 3])],
    'cubo troncato': () => perms([Math.SQRT2 - 1, 1, 1], true),
    rombicubottaedro: () => perms([1, 1, 1 + Math.SQRT2], true)
};
export const SOLID_NAMES = Object.keys(SOLIDS);
const hulls = new Map();
export function solid(name) {
    if (hulls.has(name)) return hulls.get(name);
    const raw = SOLIDS[name](), R = Math.max(...raw.map(p => Math.hypot(...p))), V = raw.map(p => scale(p, 1 / R)), faces = [], planes = [];
    for (let a = 0; a < V.length; a++) for (let b = a + 1; b < V.length; b++) for (let c = b + 1; c < V.length; c++) {
        let n = cross(sub(V[b], V[a]), sub(V[c], V[a])); if (Math.hypot(...n) < 1e-6) continue; n = unit(n);
        let dd = n[0] * V[a][0] + n[1] * V[a][1] + n[2] * V[a][2]; if (dd < 0) { n = scale(n, -1); dd = -dd; }
        if (planes.some(([m, e]) => Math.abs(e - dd) < 1e-5 && Math.hypot(...sub(m, n)) < 1e-5)) continue;
        if (V.some(p => n[0] * p[0] + n[1] * p[1] + n[2] * p[2] > dd + 1e-6)) continue;
        planes.push([n, dd]);
        const on = V.map((p, i) => [p, i]).filter(([p]) => Math.abs(n[0] * p[0] + n[1] * p[1] + n[2] * p[2] - dd) < 1e-5).map(([, i]) => i);
        const c0 = scale(on.reduce((s, i) => add(s, V[i]), [0, 0, 0]), 1 / on.length), u = unit(sub(V[on[0]], c0)), w = cross(n, u);
        on.sort((i, j) => Math.atan2(dot(sub(V[i], c0), w), dot(sub(V[i], c0), u)) - Math.atan2(dot(sub(V[j], c0), w), dot(sub(V[j], c0), u)));
        faces.push(on);
    }
    const edges = new Set(); for (const f of faces) f.forEach((a, i) => { const b = f[(i + 1) % f.length]; edges.add(a < b ? a + ',' + b : b + ',' + a); });
    const out = { V, faces, edges: [...edges].map(e => e.split(',').map(Number)) }; hulls.set(name, out); return out;
}
const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
/** Solid polyhedron of circumradius r at c; faces alternate between two tints, `inset` adds raised panels. */
export function polyhedron(k, name, c, r, tints = null, inset = 0) {
    const { V, faces } = solid(name), base = k.color;
    faces.forEach((f, i) => {
        const P = f.map(j => add(c, scale(V[j], r))), col = tints ? tints[i % tints.length] : shade(base, .82 + .3 * hash(i, r));
        for (let t = 1; t + 1 < P.length; t++) k.tri(P[0], P[t], P[t + 1], col);
        if (inset) {
            const m = scale(P.reduce((s, p) => add(s, p), [0, 0, 0]), 1 / P.length), n = unit(sub(m, c)), Q = P.map(p => add(add(m, scale(sub(p, m), .7)), scale(n, inset)));
            for (let t = 1; t + 1 < Q.length; t++) k.tri(Q[0], Q[t], Q[t + 1], shade(col, 1.12));
            for (let t = 0; t < P.length; t++) { const u = (t + 1) % P.length; k.quad(P[t], P[u], Q[u], Q[t], shade(col, .6)); }
        }
    });
}
/** Polyhedron drawn as a frame: beams on the edges and nodes at the vertices. */
export function polyFrame(k, name, c, r, w = .08, nodes = true) {
    const { V, edges } = solid(name);
    for (const [a, b] of edges) k.beam(add(c, scale(V[a], r)), add(c, scale(V[b], r)), w);
    if (nodes) for (const p of V) k.sphere(add(c, scale(p, r)), w * 2.2, 8, 6);
}
/** Ring of windows on a cylinder of radius r at height y. */
export function windowRing(k, r, y, n, w = .14, h = .08, sides = 0) {
    for (let s = 0; s < n; s++) {
        if (hash(s, r * 7, y * 3) < .2) continue;
        let a = s / n * TAU, rr = r + .01, fa = a;
        if (sides && sides < 24) { const step = TAU / sides; fa = (Math.floor(a / step) + .5) * step; rr = r * Math.cos(step / 2) / Math.cos(a - fa) + .01; }
        const c = Math.cos(fa), q = Math.sin(fa); k.pane([Math.cos(a) * rr, y, Math.sin(a) * rr], [c, 0, q], [-q, 0, c], w, h);
    }
}
/** Navigation lights at the tips of an object of half span s along x: red to port, green to starboard. */
export function navLights(k, s, y = 0, z = 0, blink = .8) { k.light([s, y, z], GREEN, .1, blink); k.light([-s, y, z], RED, .1, blink); }
/** Style ornament at the current origin, about `size` across: amber polyhedron, coil, hazard tank, pod. */
export function ornament(k, size, d) {
    const st = k.style;
    if (st.facets) { k.trim(); polyhedron(k, d.pick(['ottaedro', 'icosaedro', 'dodecaedro', 'cubottaedro']), [0, 0, 0], size * .5, null, size * .03); }
    else if (st.coils) { k.steel(); k.cyl(size * .18, size * .18, -size * .5, size * .5, 12); coil(k, size * .32, -size * .4, size * .4, 3, size * .05); }
    else if (st.pipes) tank(k, [0, 0, 0], size * .42);
    else if (st.smooth) { k.glass(.4); k.sphere([0, 0, 0], size * .45, 18, 12); k.hull(); k.cyl(size * .47, size * .47, -size * .06, size * .06, 18, { caps: false }); }
    else { k.hull(); k.box([0, 0, 0], [size * .45, size * .3, size * .35], size * .3); k.accent(.4); k.box([0, size * .31, 0], [size * .4, .02, size * .1]); }
}
export { AMBER };
