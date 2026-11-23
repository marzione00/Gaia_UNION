/** Architecture of the colonies (1.66.0). Three kinds of settlement are chosen from the identity card and drawn
 * as hard-surface models with the kit of the stations and ships (src/craft/kit.js), so that the colonies on the
 * ground and the stations in orbit share one visual language.
 *  - Sealed outposts, where the air is too thin to breathe: pressurised modules on saddles, some under regolith
 *    shielding, geodesic domes, radiators, solar fields, a reactor under a berm, a regolith plant.
 *  - Symbiotic settlements (Gaia, Lovelock), where the biosphere is rich: shells grown from local biomass,
 *    pods raised on roots, living towers, membrane greenhouses, bioreactors and albedo regulators that take
 *    part in the regulation of the climate, as the daisies of Daisyworld.
 *  - Adapted towns elsewhere: blocks on pillars, terraces, atmospheric processors, spherical tanks, sawtooth
 *    greenhouses, hangars, wind or geothermal power, container yards.
 * A building is a spec (sizes and choices drawn for one colony) and a mesh built from the spec at two levels of
 * detail. Buildings face +x, stand on a plinth 2.5 units deep and are dusted with the colour of the soil near
 * the ground. A colonist is about 1.1 units tall, so one unit is about 1.6 m. */
import { Kit, TAU, hash } from '../craft/kit.js';

export const TYPOLOGIES = Object.freeze({ sigillato: 'avamposto sigillato', simbiotico: 'insediamento simbiotico', adattato: 'città adattata' });
/** Building types of each kind of settlement, with the Italian name used in the diary. */
export const ARCH_TYPES = Object.freeze({
    sigillato: { hub: 'nodo di comando', modulo: 'moduli abitativi', schermato: 'moduli sotto regolite', cupola: 'cupole geodetiche', pila: 'torri di moduli', serra: 'serre pressurizzate', radiatori: 'radiatori', solare: 'campi solari', reattore: 'reattore', estrattore: 'impianto della regolite', piattaforma: 'piattaforme di atterraggio', antenna: 'antenne per lo spazio profondo' },
    simbiotico: { cuore: 'sala centrale', baccello: 'baccelli abitativi', gemelli: 'baccelli gemelli', torreviva: 'torri vive', membrana: 'serre a membrana', bioreattore: 'bioreattori', regolatore: 'regolatori di albedo', foglia: 'piattaforme a foglia', ramo: 'antenne ramificate' },
    adattato: { centrale: 'centro di controllo', piloni: 'blocchi su piloni', terrazza: 'blocchi a gradoni', processore: 'processori atmosferici', energia: 'impianti di energia', sfere: 'serbatoi sferici', capannone: 'serre industriali', hangar: 'hangar', container: 'depositi di container', piattaforma: 'piattaforme di atterraggio', antenna: 'antenne per lo spazio profondo' }
});
export const PLINTH = 2.5;
const round = x => Math.round(x * 100) / 100;
const add = (a, b) => a.map((v, i) => v + b[i]), sub = (a, b) => a.map((v, i) => v - b[i]), mul = (a, s) => a.map(v => v * s), dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]], unit = a => { const l = Math.hypot(...a) || 1; return a.map(v => v / l); };
const shade = (c, f) => [c[0] * f, c[1] * f, c[2] * f, c[3] ?? 1];

/** Smooth surface through rows of points with the same count, closed loops or open arcs: normals are averaged,
 * so curved shells read as curved and not as facets. Closed rows may be capped at either end. */
export function smooth(k, rows, { closed = true, capStart = false, capEnd = false, paint = null } = {}) {
    const R = rows.length, n = rows[0].length, J = j => closed ? ((j % n) + n) % n : Math.max(0, Math.min(n - 1, j)), P = (i, j) => rows[Math.max(0, Math.min(R - 1, i))][J(j)];
    const centre = rows.map(r => mul(r.reduce((a, p) => add(a, p), [0, 0, 0]), 1 / n)), base = k.v.length / 16, normals = [];
    for (let i = 0; i < R; i++) for (let j = 0; j < n; j++) {
        let raw = cross(sub(P(i + 1, j), P(i - 1, j)), sub(P(i, j + 1), P(i, j - 1))), nn = unit(raw);
        // A row shrunk to a point (the tip of a seed or a pod) takes the direction of the axis.
        if (Math.hypot(...raw) < 1e-9) nn = unit(i ? sub(centre[i], centre[i - 1]) : sub(centre[0], centre[1]));
        else if (dot(nn, sub(P(i, j), centre[i])) < 0) nn = mul(nn, -1);
        if (paint) normals.push(nn); else k.vertex(P(i, j), nn, j / n, i / Math.max(1, R - 1));
    }
    // With `paint(i, j)` every quad takes its own colour and PBR (panels, window bands): its corners are not
    // shared, but keep the averaged normals, so the surface still reads as smooth.
    const keep = [k.color, k.pbr];
    for (let i = 0; i + 1 < R; i++) for (let j = 0; j < (closed ? n : n - 1); j++) {
        const j1 = (j + 1) % n, f = cross(sub(P(i, j1), P(i, j)), sub(P(i + 1, j), P(i, j))), out = dot(f, sub(P(i, j), centre[i])) > 0;
        let a, b, c, d;
        if (paint) { const look = paint(i, j); if (look) k.paint(...look); else [k.color, k.pbr] = keep; const V = (ii, jj) => k.vertex(P(ii, jj), normals[ii * n + jj]); a = V(i, j); b = V(i, j1); c = V(i + 1, j1); d = V(i + 1, j); }
        else { a = base + i * n + j; b = base + i * n + j1; c = base + (i + 1) * n + j1; d = base + (i + 1) * n + j; }
        if (out) k.i.push(a, b, c, a, c, d); else k.i.push(a, c, b, a, d, c);
    }
    [k.color, k.pbr] = keep;
    if (closed) for (const [i, on, s] of [[0, capStart, -1], [R - 1, capEnd, 1]]) if (on) {
        const c = centre[i], nn = mul(unit(sub(centre[Math.min(R - 1, i + 1)], centre[Math.max(0, i - 1)])), s), m = k.vertex(c, nn);
        for (let j = 0; j < n; j++) { const p = k.vertex(rows[i][j], nn), q = k.vertex(rows[i][(j + 1) % n], nn); if (dot(cross(sub(rows[i][(j + 1) % n], c), sub(rows[i][j], c)), nn) > 0) k.i.push(m, q, p); else k.i.push(m, p, q); }
    }
}
/** Tube swept along a polyline, with radius `r` (a number or a function of the fraction along the line) and
 * frames carried along the line, so twisted strands, roots and branches stay round. */
export function sweep(k, pts, r, sides = 8, { capEnd = true } = {}) {
    sides = k.low ? Math.max(4, Math.round(sides * .6)) : sides;
    const T = pts.map((p, i) => unit(sub(pts[Math.min(pts.length - 1, i + 1)], pts[Math.max(0, i - 1)])));
    let u = unit(cross(T[0], Math.abs(T[0][1]) < .9 ? [0, 1, 0] : [1, 0, 0])); const rows = [];
    for (let i = 0; i < pts.length; i++) {
        u = unit(sub(u, mul(T[i], dot(u, T[i])))); const v = cross(T[i], u), rr = typeof r === 'function' ? r(i / (pts.length - 1)) : r;
        rows.push(Array.from({ length: sides }, (_, j) => { const a = j / sides * TAU; return add(pts[i], add(mul(u, Math.cos(a) * rr), mul(v, Math.sin(a) * rr))); }));
    }
    smooth(k, rows, { capEnd });
}
/** Ring of `n` points of an ellipse of half axes a (along x) and b (along y) at depth z, centred on (cx, cy). */
const ring = (n, a, b, z, cx = 0, cy = 0) => Array.from({ length: n }, (_, j) => { const t = j / n * TAU; return [cx + Math.cos(t) * a, cy + Math.sin(t) * b, z]; });
/** Open half ellipse from angle 0 to π, n + 1 points: the cross-section of vaults and shells on the ground. */
const arch = (n, a, b) => Array.from({ length: n + 1 }, (_, j) => { const t = j / n * Math.PI; return [Math.cos(t) * a, Math.sin(t) * b]; });
/** Rounded rectangle of size w × d with corner radius r, counter-clockwise in the xz plane. */
export const rrect = (w, d, r, n = 5) => rrectBase(w, d, r, n);
const rrectBase = (w, d, r, n = 5) => { r = Math.min(r, w / 2 - .01, d / 2 - .01); const out = []; for (const [cx, cz, a0] of [[w / 2 - r, d / 2 - r, 0], [-w / 2 + r, d / 2 - r, Math.PI / 2], [-w / 2 + r, -d / 2 + r, Math.PI], [w / 2 - r, -d / 2 + r, Math.PI * 1.5]]) for (let i = 0; i <= n; i++) { const a = a0 + i / n * Math.PI / 2; out.push([cx + Math.cos(a) * r, cz + Math.sin(a) * r]); } return out; };
/** Ring of n vertical faces between a regular polygon of radius r0 at y0 and one of radius r1 at y1, flat
 * shaded, with a cap on top: hexagonal plans and sloped walls. */
function frustumN(k, n, r0, r1, y0, y1, { rot = Math.PI / n, top = true } = {}) {
    const P = (r, y, i) => [Math.cos(rot + i * TAU / n) * r, y, Math.sin(rot + i * TAU / n) * r];
    for (let i = 0; i < n; i++) k.quad(P(r0, y0, i + 1), P(r0, y0, i), P(r1, y1, i), P(r1, y1, i + 1));
    if (top) for (let i = 0; i < n; i++) k.tri([0, y1, 0], P(r1, y1, i + 1), P(r1, y1, i));
}
/** Oblate seed: a body of revolution round the vertical axis, flatter below and domed above, centred at c with
 * radius R and height H; `paint(i, j)` may colour its panels. Returns the height of its rim. */
export function lens(k, c, R, H, M, N, paint = null) {
    const rows = []; for (let i = 0; i <= N; i++) { const t = .05 + .9 * i / N, th = t * Math.PI, r = R * Math.sin(th) ** .75, y = c[1] - Math.cos(th) * H * (th < Math.PI / 2 ? .38 : .62); rows.push(Array.from({ length: M }, (_, j) => { const a = j / M * TAU; return [c[0] + Math.cos(a) * r, y, c[2] + Math.sin(a) * r]; })); }
    smooth(k, rows, { capStart: true, capEnd: true, paint });
    return c[1];
}
/** Seed-shaped body along x, centred at c, of length L, width W and height H: blunt towards +x and tapered
 * behind, rising slightly towards the front. `paint(i, j)` may colour its panels; rows run from the back. */
export function seed(k, c, L, W, H, M, N, paint = null, rise = .12) {
    const rows = []; for (let i = 0; i <= N; i++) { const t = .03 + .97 * i / N, f = Math.sin(Math.PI * Math.min(1, t) ** 1.35) ** .62, x = c[0] + (t - .5) * L, y = c[1] + (t - .5) * L * rise; rows.push(Array.from({ length: M }, (_, j) => { const a = j / M * TAU; return [x, y + Math.sin(a) * H / 2 * f, c[2] + Math.cos(a) * W / 2 * f]; })); }
    smooth(k, rows, { capStart: true, capEnd: true, paint });
    return rows;
}
/** Soil and regolith: the colour of the ground with its grain (kind 1 of material 10). */
const soil = (k, c) => { k.paint(c.soil, 0, .95); k.pbr = [0, .95, 0, 1]; };
/** Horizontal tube along z from z0 to z1, radius r, centred at (x, y): pressurised modules and corridors. */
function tubeZ(k, x, y, z0, z1, r, seg, bands = 0, caps = false) { k.push([x, y, (z0 + z1) / 2], [Math.PI / 2, 0, 0]); k.cyl(r, r, -(z1 - z0) / 2, (z1 - z0) / 2, seg, { caps, bands }); k.pop(); }
/** Horizontal tube along x from x0 to x1, radius r, centred at (y, z). */
function tubeX(k, y, z, x0, x1, r, seg, caps = true) { k.push([(x0 + x1) / 2, y, z], [0, 0, -Math.PI / 2]); k.cyl(r, r, -(x1 - x0) / 2, (x1 - x0) / 2, seg, { caps }); k.pop(); }
/** Shallow dome closing a tube along z: a spherical cap of base radius `r` and depth `d`. */
function endCap(k, x, y, z, r, d, dir, seg) { const R = (r * r + d * d) / (2 * d), t1 = Math.asin(Math.min(1, r / R)); k.push([x, y, z + dir * (d - R)], [dir * Math.PI / 2, 0, 0]); k.sphere([0, 0, 0], R, seg, Math.max(4, Math.round(seg / 3)), 0, t1); k.pop(); }
/** Geodesic dome: an icosahedron subdivided `f` times on each edge, upper half, with glass and opaque panels
 * and, in the detailed model, a frame of struts along the edges. */
function geodesic(k, c, r, f, glass, frame, col, glow = .15) {
    const t = (1 + Math.sqrt(5)) / 2, V = [[-1, t, 0], [1, t, 0], [-1, -t, 0], [1, -t, 0], [0, -1, t], [0, 1, t], [0, -1, -t], [0, 1, -t], [t, 0, -1], [t, 0, 1], [-t, 0, -1], [-t, 0, 1]].map(unit);
    const F = [[0, 11, 5], [0, 5, 1], [0, 1, 7], [0, 7, 10], [0, 10, 11], [1, 5, 9], [5, 11, 4], [11, 10, 2], [10, 7, 6], [7, 1, 8], [3, 9, 4], [3, 4, 2], [3, 2, 6], [3, 6, 8], [3, 8, 9], [4, 9, 5], [2, 4, 11], [6, 2, 10], [8, 6, 7], [9, 8, 1]];
    // A vertex of the icosahedron at the top: the panels round the zenith form a pentagon, as in real domes.
    const tilt = Math.atan2(1, t), rot = p => [p[0] * Math.cos(tilt) - p[1] * Math.sin(tilt), p[0] * Math.sin(tilt) + p[1] * Math.cos(tilt), p[2]], edges = new Map();
    let n = 0;
    for (const [a, b, d] of F) for (let i = 0; i < f; i++) for (let j = 0; j < f - i; j++) for (const up of [0, 1]) {
        if (up && j === f - i - 1) continue;
        const P = (u, v) => unit(rot(add(add(mul(V[a], 1 - (u + v) / f), mul(V[b], u / f)), mul(V[d], v / f))));
        const tri = up ? [P(i + 1, j), P(i + 1, j + 1), P(i, j + 1)] : [P(i, j), P(i + 1, j), P(i, j + 1)];
        if ((tri[0][1] + tri[1][1] + tri[2][1]) / 3 < -.05) continue;
        const q = tri.map(p => [c[0] + p[0] * r, c[1] + Math.max(p[1], 0) * r, c[2] + p[2] * r]), mid = mul(add(add(tri[0], tri[1]), tri[2]), 1 / 3);
        // Opaque panels low down and a few glass ones; more glass towards the top.
        const isGlass = hash(n++, f, r) < glass * (.4 + 1.2 * Math.max(0, mid[1]));
        if (isGlass) k.paint(col.glass, .85, .08, glow); else k.paint(shade(col.hull, .9 + .2 * hash(n, r)), .15, .55);
        k.tri(q[0], q[2], q[1]);
        if (frame && !k.low) for (const [p, s] of [[q[0], q[1]], [q[1], q[2]], [q[2], q[0]]]) { const key = [p, s].map(v => v.map(x => x.toFixed(2)).join()).sort().join('|'); if (!edges.has(key)) edges.set(key, [p, s]); }
    }
    if (frame && !k.low) { k.paint(col.steel, .7, .35); for (const [p, s] of edges.values()) k.beam(p, s, .045); }
}
/** Regolith or soil mound over a building: a rough half ellipsoid with semi-axes a (x), h (y), b (z). */
function mound(k, c, a, b, h, seed) { k.push(c); k.sphere([0, 0, 0], 1, 26, 9, 0, Math.PI / 2, nn => (1 + .05 * Math.sin(nn[0] * 9 + seed) * Math.sin(nn[2] * 7 - seed) + .03 * Math.sin(nn[0] * 23 - nn[2] * 19)) / Math.hypot(nn[0] / a, nn[1] / h, nn[2] / b)); k.pop(); }
/** Row of round windows along z on the side x = ±r of a tube along z, lit from inside. */
function portholes(k, x, y, z0, z1, side, col, gap = 1.25) {
    if (k.low) return;
    for (let z = z0, i = 0; z <= z1 + 1e-6; z += gap, i++) { k.push([x, y, z], [0, 0, -side * Math.PI / 2]); k.paint(col.dark, .6, .4); k.cyl(.21, .21, -.02, .06, 12, { caps: true }); k.paint(hash(i, z, x) < .6 ? col.window : col.glass, .7, .25, hash(i, z, x) < .6 ? 1 : .05); k.cyl(.14, .14, .06, .075, 12, { caps: true }); k.pop(); }
}
/** Pipe from a to b with flanges every 2.5 units. */
function pipe(k, a, b, r, color) {
    const d = sub(b, a), L = Math.hypot(...d); if (L < 1e-3) return;
    k.paint(color, .7, .35); const yaw = Math.atan2(d[0], d[2]), pitch = Math.atan2(Math.hypot(d[0], d[2]), d[1]);
    k.push(a, [pitch, yaw, 0]); k.cyl(r, r, 0, L, 10, { caps: false }); if (!k.low) for (let s = 1.2; s < L - .3; s += 2.5) k.cyl(r * 1.45, r * 1.45, s, s + .1, 10, { caps: true }); k.pop();
}
/** Hatch with a frame and a status light on the face x = x0, centred at height y and depth z. */
function hatch(k, x0, y, z, w, h, c) {
    k.paint(c.dark, .5, .5); k.box([x0 + .03, y, z], [.05, h / 2, w / 2]);
    k.paint(c.steel, .7, .35); k.box([x0 + .07, y + h / 2 + .05, z], [.05, .05, w / 2 + .08]); for (const s of [-1, 1]) k.box([x0 + .07, y, z + s * (w / 2 + .04)], [.05, h / 2 + .1, .04]);
    if (!k.low) { k.paint(c.dark, .4, .6); k.box([x0 + .09, y + h * .15, z], [.02, h * .25, w * .32]); k.paint(c.accent, .2, .4, 1.2); k.box([x0 + .1, y + h * .3, z + w / 2 + .18], [.03, .06, .03]); }
}
/** Band of windows on a wall facing `n` (a unit axis), of length `len` along `t`, at height y: glass, lit panes
 * and mullions. A share `lit` of the panes is lit. */
function windowBand(k, c, centre, n, t, len, y, h, lit = .6) {
    const ax = v => [Math.abs(v[0]), Math.abs(v[1]), Math.abs(v[2])], T = ax(t), N = ax(n), half = (along, across) => add(mul(T, along), mul(N, across));
    k.paint(shade(c.glass, .7), .85, .1, .03); k.box(add(add(centre, mul(n, .02)), [0, y, 0]), add(half(len / 2, .03), [0, h / 2, 0]));
    if (k.low) return;
    const m = Math.max(2, Math.round(len / .85));
    for (let i = 0; i < m; i++) { const u = -len / 2 + (i + .5) * len / m; if (hash(i, centre[0] + y * 3, centre[2] + n[0]) > lit) continue; k.paint(c.window, .7, .25, 1); k.box(add(add(centre, mul(n, .05)), add(mul(t, u), [0, y, 0])), add(half(len / m * .38, .01), [0, h * .4, 0])); }
    k.paint(c.steel, .6, .4); for (let i = 0; i <= m; i++) { const u = -len / 2 + i * len / m; k.box(add(add(centre, mul(n, .06)), add(mul(t, u), [0, y, 0])), add(half(.03, .02), [0, h / 2 + .03, 0])); }
}
/** Block with chamfered vertical edges, dark seams between the floors and a cornice: c is its centre on the
 * ground, w its size along x, d along z, from height y0 to y0 + h. */
function block(k, c, w, d, h, y0, color, chamfer = .25, seams = 1.5) {
    const x = w / 2, z = d / 2, e = Math.min(chamfer, x * .4, z * .4), poly = [[x - e, -z], [x, -z + e], [x, z - e], [x - e, z], [-x + e, z], [-x, z - e], [-x, -z + e], [-x + e, -z]], grow = g => poly.map(([px, pz]) => [px * (1 + g / x), pz * (1 + g / z)]);
    k.push([c[0], 0, c[2]]); k.paint(color, .1, .7); k.extrude(poly, y0, y0 + h);
    if (!k.low && seams) { k.paint(shade(color, .6), .1, .8); for (let yy = y0 + seams; yy < y0 + h - .2; yy += seams) k.extrude(grow(.015), yy - .03, yy + .03); }
    k.paint(shade(color, .82), .15, .6); k.extrude(grow(.06), y0 + h - .02, y0 + h + .12); k.pop();
}
/** Small glowing bulb: lights of pads, masts and paths. */
function lamp(k, p, color, size = .12) { if (k.low) return; k.paint(color, 0, .4, 3); k.sphere(p, size, 8, 5); }
/** Shell grown on the ground: rows of half ellipses across z, from z0 to z1, with half width w(t) and height
 * h(t) for t from 0 to 1, flaring out at the foot. */
function shell(k, z0, z1, w, h, N, n, flare = .14) {
    const rows = [];
    for (let i = 0; i <= N; i++) { const t = i / N, z = z0 + (z1 - z0) * t; rows.push(arch(n, 1, 1).map(([cx, sy]) => [cx * w(t) * (1 + flare * (1 - sy) ** 4), sy * h(t), z])); }
    smooth(k, rows, { closed: false });
    return rows;
}

/** Typology of the settlement of a planet from its identity card: sealed where the air is too thin to breathe,
 * symbiotic where the biosphere is rich and the air dense, adapted elsewhere. */
export function typologyOf(g, speciesCount) { const d = g.atmosphere.density; return d < .3 ? 'sigillato' : speciesCount >= 15 && d >= .45 ? 'simbiotico' : 'adattato'; }
const mixc = (a, b, t) => a.map((x, i) => x + (b[i] - x) * t);
/** Colour with its saturation (max − min) / max limited to `top`, and alpha 1. */
export function tame(c, top) { const M = Math.max(...c.slice(0, 3)), m = Math.min(...c.slice(0, 3)), sat = M > 0 ? (M - m) / M : 0, k = sat > top ? top / sat : 1; return [...c.slice(0, 3).map(v => Math.round(Math.max(0, Math.min(1, M - (M - v) * k)) * 1000) / 1000), 1]; }
/** Limits of saturation: hulls and frames stay close to grey, the accent of the colony may be stronger. */
export const SATURATION = Object.freeze({ hull: .22, trim: .25, steel: .15, dark: .3, soil: .6, glass: .5, accent: .8, window: .5 });
/** Colours of a settlement: hull and frames from the local soil or biomass, one accent, glass and lights. */
export function archPalette(g, typology) {
    const rock = g.palette.rock, pig = g.palette.pigment, soil = rock.map(v => v * .6), c = typology === 'sigillato'
        ? { hull: mixc([.84, .85, .86], rock, .1), trim: [.6, .61, .63], steel: [.46, .48, .52], dark: [.14, .15, .17], accent: mixc([.92, .46, .14], pig, .25), glass: [.2, .28, .34], window: [.64, .52, .34] }
        : typology === 'simbiotico'
            ? { hull: mixc([.66, .6, .48], pig, .22), trim: mixc([.3, .25, .18], pig, .1), steel: [.42, .4, .36], dark: [.12, .11, .09], accent: mixc(pig, [.35, 1, .8], .55), glass: mixc([.42, .58, .46], pig, .25), window: [.52, .6, .38] }
            : { hull: mixc([.66, .63, .58], rock, .45), trim: [.46, .46, .45], steel: [.45, .47, .5], dark: [.15, .15, .16], accent: mixc([.86, .52, .2], pig, .3), glass: [.18, .24, .3], window: [.62, .5, .32] };
    c.soil = soil; for (const [key, top] of Object.entries(SATURATION)) c[key] = tame(c[key], top);
    return c;
}
/** Spec of building `type` for a settlement with parameters P (src/worlds/settlements.js), drawn with the dice
 * `d`. `radius` is the half diagonal of the footprint and `height` the top above the ground. */
export function archSpec(type, d, P) {
    const tall = Math.pow(1 / P.gravity, .5), s = { type, typology: P.typology };
    switch (type) {
        case 'hub': Object.assign(s, { r: d.range(6, 7.5), tower: d.range(7, 9) * tall, locks: d.int(3, 4) }); break;
        case 'modulo': case 'schermato': Object.assign(s, { len: d.range(6.5, 9.5), r: d.range(1.3, 1.6), bands: d.int(3, 5), roof: d.pick(['radiatore', 'tubi', 'antenna']) }); break;
        case 'cupola': Object.assign(s, { r: d.range(3.2, 4.2), glass: d.range(.3, .5), lock: d.range(1.6, 2.2) }); break;
        case 'pila': Object.assign(s, { r: d.range(1.5, 1.8), levels: Math.max(2, Math.min(5, Math.round(d.range(2.6, 4.4) * tall))), platform: d.chance(.6) }); break;
        case 'serra': Object.assign(s, { len: d.range(8, 12), r: d.range(1.8, 2.3), ribs: d.int(6, 9) }); break;
        case 'radiatori': Object.assign(s, { n: d.int(5, 8), h: d.range(2.4, 3.2) }); break;
        case 'solare': Object.assign(s, { rows: d.int(2, 3), cols: d.int(3, 4), tilt: d.range(.35, .7) }); break;
        case 'reattore': Object.assign(s, { r: d.range(1.8, 2.2), h: d.range(2.6, 3.4) }); break;
        case 'estrattore': Object.assign(s, { h: d.range(4, 5.5) * tall }); break;
        case 'piattaforma': Object.assign(s, { r: d.range(4.2, 5), lander: d.chance(.65), organic: P.typology === 'simbiotico' }); break;
        case 'antenna': Object.assign(s, { dish: d.range(2.2, 3), h: d.range(3.5, 4.5) }); break;
        case 'cuore': Object.assign(s, { R: d.range(6.4, 7.6), H: d.range(4.6, 5.6) * Math.pow(tall, .5), lobes: d.int(3, 4), twist: d.range(.9, 1.3), ribs: d.int(11, 14) }); break;
        case 'baccello': case 'gemelli': Object.assign(s, { w: d.range(4.2, 5), h: d.range(2.7, 3.1), stem: d.range(1.7, 2.4) * tall, n: type === 'gemelli' ? 2 : 1 }); break;
        case 'torreviva': Object.assign(s, { h: d.range(12, 16) * tall, r: d.range(1.3, 1.7), strands: d.int(3, 4), twist: d.range(.35, .6), leaves: d.int(2, 3) }); break;
        case 'membrana': Object.assign(s, { len: d.range(9, 12), w: d.range(6, 7.5), h: d.range(3.2, 4), ribs: d.int(5, 7) }); break;
        case 'bioreattore': Object.assign(s, { n: d.int(6, 9), h: d.range(3.5, 5) * tall, r: d.range(2, 2.6) }); break;
        case 'regolatore': Object.assign(s, { rings: d.int(2, 3), mast: d.range(6, 8) * tall }); break;
        case 'foglia': Object.assign(s, { len: d.range(9, 11), w: d.range(6, 7) }); break;
        case 'ramo': Object.assign(s, { h: d.range(9, 12) * tall, depth: 3 }); break;
        case 'centrale': Object.assign(s, { R: d.range(5.2, 6.2), tiers: P.low ? 1 : 2, tower: d.range(7, 9.5) * tall }); break;
        case 'piloni': Object.assign(s, { w: d.range(5.5, 7.5), dz: d.range(3.6, 4.4), floors: Math.max(1, Math.min(P.floorsMax, d.int(2, 4))), lift: P.volcanic || P.cold ? d.range(1.8, 2.6) : d.range(1.2, 1.8) }); break;
        case 'terrazza': Object.assign(s, { w: d.range(6, 8), dz: d.range(5, 6.5), steps: Math.max(2, Math.min(P.floorsMax + 1, d.int(3, 4))) }); break;
        case 'processore': Object.assign(s, { r: d.range(2.6, 3.2), h: d.range(11, 15) * tall, fans: 4 }); break;
        case 'energia': Object.assign(s, { kind: P.power, h: P.power === 'vento' ? d.range(14, 18) * tall : d.range(7, 9) }); break;
        case 'sfere': Object.assign(s, { n: d.int(2, 3), r: d.range(1.5, 2) }); break;
        case 'capannone': Object.assign(s, { len: d.range(10, 13), w: d.range(5.4, 6.6), h: d.range(2.8, 3.3), bays: d.int(5, 7) }); break;
        case 'hangar': Object.assign(s, { len: d.range(9, 12), r: d.range(3.4, 4.2) }); break;
        case 'container': Object.assign(s, { rows: d.int(2, 3), cols: d.int(3, 4), colors: [0, 1, 2, 3, 4].map(() => d.int(0, 5)) }); break;
        default: throw new Error('Tipo di edificio sconosciuto: ' + type);
    }
    for (const key of Object.keys(s)) if (typeof s[key] === 'number') s[key] = round(s[key]);
    // The footprint and the height are measured on the detailed model, so the layout never lets two buildings
    // overlap and the camera never passes through a roof.
    const spec = { ...s, palette: P.colors }, m = archMesh(spec, 0); let radius = 0, height = 0;
    for (let i = 0; i < m.v.length; i += 16) if (m.v[i + 1] > -.05) { radius = Math.max(radius, Math.hypot(m.v[i], m.v[i + 2])); height = Math.max(height, m.v[i + 1]); }
    return { ...spec, radius: round(radius + .2), height: round(height) };
}
/** Dust: near the ground the colours turn towards the colour of the soil, as on buildings in a dusty place. */
export function weather(m, soil, top = 1.6) {
    for (let i = 0; i < m.v.length; i += 16) { const y = m.v[i + 1]; if (y >= top || m.v[i + 14] > .5) continue; const t = Math.min(1, (top - Math.max(y, 0)) / top) ** 1.5 * .6; for (let q = 0; q < 3; q++) m.v[i + 8 + q] += (soil[q] - m.v[i + 8 + q]) * t; }
    return m;
}

/** Mesh of a building spec at level 0 (detailed) or 1 (light). */
export function archMesh(s, level = 0) {
    const c = s.palette, k = new Kit({ ...c, panel: c.dark, detail: level ? .35 : 1 }), seg = n => level ? Math.max(6, Math.round(n * .45)) : n, low = !!level;
    // Plinths of compacted soil, flush with the ground and as grainy as the ground round them.
    const rrect = (w, d, r, n) => rrectBase(w, d, r, n ?? (low ? 2 : 5));
    const disc = r => { soil(k, c); k.cyl(r, r, -PLINTH, .06, seg(24), { caps: true }); };
    const pad = (w, d) => { soil(k, c); k.extrude(rrect(w, d, .8, 3), -PLINTH, .06); };
    switch (s.type) {
        // ----- Sealed outposts -----
        case 'modulo': case 'schermato': {
            const L = s.len, r = s.r, y = r + .55, shield = s.type === 'schermato';
            pad(r * 2 + 1.4, L + 1.6);
            k.paint(c.steel, .6, .45); for (const z of [-L * .32, L * .32]) { k.box([0, .35, z], [r * .95, .3, .28]); k.box([0, .72, z], [r * .72, .12, .3]); }
            k.paint(c.hull, .2, .55); tubeZ(k, 0, y, -L / 2, L / 2, r, seg(28), s.bands);
            for (const dir of [-1, 1]) endCap(k, 0, y, dir * L / 2, r, r * .42, dir, seg(24));
            k.paint(c.trim, .3, .5); for (const z of [-L / 2, L / 2]) tubeZ(k, 0, y, z - .14, z + .14, r + .05, seg(28), 0, true);
            if (!low) { k.paint(c.accent, .2, .45); tubeZ(k, 0, y, -L / 2 + .7, -L / 2 + .95, r + .025, seg(28)); }
            if (!shield) { portholes(k, r - .03, y + .25, -L / 2 + 1.4, L / 2 - 1.4, 1, c); portholes(k, -r + .03, y + .25, -L / 2 + 1.4, L / 2 - 1.4, -1, c); }
            // Airlock towards the street: a short tube across the module, with a hatch on its end and steps.
            const ax = r + (shield ? 2.1 : 1.35), ay = y - .3; k.paint(c.hull, .2, .55); tubeX(k, ay, 0, 0, ax, .78, seg(18)); k.paint(c.trim, .3, .5); tubeX(k, ay, 0, ax - .32, ax - .12, .84, seg(18)); hatch(k, ax, ay, 0, .72, 1.1, c);
            k.paint(c.steel, .6, .45); for (let i = 0; i < 3; i++) k.box([ax + .25 + i * .3, (ay - .55) * (1 - i / 3) / 2, 0], [.16, (ay - .55) * (1 - i / 3) / 2 + .04, .5]);
            if (s.roof === 'radiatore') { k.paint(c.steel, .6, .4); k.box([0, y + r + .2, 0], [.08, .22, L * .3]); k.paint([.88, .89, .9, 1], .25, .45); for (const sd of [-1, 1]) k.box([sd * 1, y + r + .42, 0], [.85, .025, L * .28]); if (!low) { k.paint(c.steel, .6, .4); for (const sd of [-1, 1]) for (let zz = -L * .28; zz <= L * .28 + 1e-6; zz += L * .14) k.box([sd * 1, y + r + .45, zz], [.86, .02, .03]); } }
            else if (s.roof === 'tubi') { for (const x of [-.45, .45]) pipe(k, [x, y + r * .93, -L / 2 + .5], [x, y + r * .93, L / 2 - .5], .11, c.steel); k.paint(c.dark, .5, .5); k.box([0, y + r + .15, L * .2], [.7, .25, .5]); }
            else { k.paint(c.steel, .7, .35); k.cyl(.12, .08, y + r - .1, y + r + 2.2, 8, { caps: true }); k.push([0, y + r + 2.2, 0], [0, 0, -.6]); k.paint([.9, .9, .92, 1], .3, .45); k.dish(.6, .2, seg(24), 4); k.pop(); lamp(k, [0, y + r + 2.5, 0], [1, .3, .25, 1]); }
            if (shield) { soil(k, c); mound(k, [-.2, 0, 0], r * 2 + .3, L / 2 + 1.1, y + r + .25, L); }
            break;
        }
        case 'hub': {
            disc(s.r + 1.2);
            k.paint(c.hull, .2, .55); k.cyl(s.r + .15, s.r + .15, .1, 1.2, seg(40), { caps: false, bands: 2 }); k.paint(c.trim, .3, .5); k.cyl(s.r + .25, s.r + .25, 1.1, 1.3, seg(40), { caps: false });
            if (!low) for (let i = 0; i < 16; i++) { const a = (i + .5) * TAU / 16; k.push([Math.cos(a) * (s.r + .16), .65, Math.sin(a) * (s.r + .16)], [0, -a, 0]); k.paint(c.window, .7, .25, 1); k.box([0, 0, 0], [.03, .18, .35]); k.pop(); }
            geodesic(k, [0, 1.2, 0], s.r, low ? 2 : 4, .55, true, c, .25);
            for (let i = 0; i < s.locks; i++) {
                const a = (i + .5) * TAU / s.locks; k.push([Math.cos(a) * (s.r - .3), 0, -Math.sin(a) * (s.r - .3)], [0, a, 0]);
                k.paint(c.hull, .2, .55); tubeX(k, 1.05, 0, 0, 2.6, .95, seg(18)); k.paint(c.trim, .3, .5); tubeX(k, 1.05, 0, 2.3, 2.5, 1.02, seg(18)); hatch(k, 2.62, .95, 0, .85, 1.3, c); k.paint(c.steel, .6, .4); k.box([1.4, .08, 0], [1.3, .08, .9]); k.pop();
            }
            // Control tower behind, with a lit ring of windows and a beacon.
            k.push([-s.r - .6, 0, 0]); k.paint(c.hull, .2, .55); k.cyl(1.3, .95, .1, s.tower, seg(18), { caps: false, bands: 3 });
            k.paint(c.dark, .4, .5); k.cyl(1.4, 1.4, s.tower, s.tower + .25, seg(20), { caps: true }); k.paint(c.glass, .85, .08, .5); k.cyl(1.45, 1.55, s.tower + .25, s.tower + 1.2, seg(20), { caps: false }); k.paint(c.hull, .2, .55); k.cyl(1.6, 1.1, s.tower + 1.2, s.tower + 1.6, seg(20), { caps: true });
            k.paint(c.steel, .7, .35); k.cyl(.07, .05, s.tower + 1.6, s.tower + 3.2, 6, { caps: true }); lamp(k, [0, s.tower + 3.3, 0], [1, .3, .25, 1], .16); k.pop();
            break;
        }
        case 'cupola': {
            disc(s.r + .5); k.paint(c.hull, .2, .55); k.cyl(s.r + .12, s.r + .12, .1, .85, seg(32), { caps: false, bands: 1 });
            geodesic(k, [0, .85, 0], s.r, low ? 2 : 3, s.glass, true, c, .2);
            k.paint(c.hull, .2, .55); tubeX(k, .95, 0, s.r - .5, s.r + s.lock, .82, seg(16)); k.paint(c.trim, .3, .5); tubeX(k, .95, 0, s.r + s.lock - .3, s.r + s.lock - .1, .88, seg(16)); hatch(k, s.r + s.lock + .02, .9, 0, .8, 1.25, c);
            k.paint(c.steel, .6, .4); for (const z of [-1.2, 1.2]) { k.push([-s.r - .5, 0, z]); k.cyl(.5, .5, 0, 1.7, seg(14), { caps: false }); k.sphere([0, 1.7, 0], .5, seg(14), 4, 0, Math.PI / 2); k.pop(); }
            pipe(k, [-s.r - .5, 1.2, -1.2], [-s.r + .1, 1.2, -1.2], .09, c.steel);
            break;
        }
        case 'pila': {
            disc(s.r + 1.3); k.paint(c.steel, .7, .35); k.truss([s.r + .55, .1, 0], [s.r + .55, s.levels * 2.6 + .3, 0], .32, 1.3, .05);
            for (let i = 0; i < s.levels; i++) {
                const y0 = .1 + i * 2.6; k.paint(c.hull, .2, .55); k.cyl(s.r, s.r, y0, y0 + 2.35, seg(24), { caps: true, bands: 1 }); k.paint(c.trim, .3, .5); k.cyl(s.r + .07, s.r + .07, y0 + 2.35, y0 + 2.6, seg(24), { caps: true });
                if (!low) for (let a = 0; a < 6; a++) { const t = a * TAU / 6 + i * .5; k.push([Math.cos(t) * (s.r - .02), y0 + 1.3, Math.sin(t) * (s.r - .02)], [0, -t, -Math.PI / 2]); k.paint(c.dark, .6, .4); k.cyl(.22, .22, 0, .06, 10, { caps: true }); k.paint(hash(i, a) < .7 ? c.window : c.glass, .7, .25, hash(i, a) < .7 ? 1 : .05); k.cyl(.16, .16, .06, .08, 10, { caps: true }); k.pop(); }
                if (s.platform && i === s.levels - 1) { k.paint(c.steel, .6, .4); k.cyl(s.r + .9, s.r + .9, y0 + 2.6, y0 + 2.72, seg(24), { caps: true }); }
            }
            geodesic(k, [0, .1 + s.levels * 2.6, 0], s.r * .92, 2, .6, true, c, .2); hatch(k, s.r - .06, .85, 0, .8, 1.25, c);
            break;
        }
        case 'serra': {
            pad(s.r * 2 + .7, s.len + .7);
            k.paint([.16, .26, .12, 1], 0, .9); for (const x of [-.6, .6]) k.box([x * s.r, .3, 0], [s.r * .28, .18, s.len / 2 - .5]);
            if (!low) { k.paint([.36, .55, .22, 1], 0, .8); for (const x of [-.6, .6]) for (let z = -s.len / 2 + .8; z < s.len / 2 - .6; z += .55) k.sphere([x * s.r, .55, z], .22, 8, 4, 0, Math.PI / 2); k.paint([.95, .45, .9, 1], 0, .5, 1.6); for (const x of [-.6, .6]) k.box([x * s.r, s.r * .8, 0], [.05, .03, s.len / 2 - .7]); }
            k.paint(c.glass, .85, .06, .18); tubeZ(k, 0, .12, -s.len / 2, s.len / 2, s.r, low ? 8 : 16);
            k.paint(c.hull, .2, .55); for (let i = 0; i <= s.ribs; i++) { const z = -s.len / 2 + i * s.len / s.ribs; tubeZ(k, 0, .12, z - .08, z + .08, s.r + .05, low ? 8 : 16); }
            for (const dir of [-1, 1]) { const pts = arch(low ? 6 : 12, s.r + .06, s.r + .06).map(([x, y]) => [x, .12 + y, dir * (s.len / 2 + .1)]); k.paint(c.hull, .2, .55); for (let j = 0; j + 1 < pts.length; j++) k.tri([0, .12, dir * (s.len / 2 + .1)], pts[j], pts[j + 1]); }
            k.paint(c.hull, .2, .55); k.box([s.r + .35, .85, s.len * .3], [.45, .75, .6]); hatch(k, s.r + .8, .8, s.len * .3, .75, 1.2, c);
            break;
        }
        case 'radiatori': {
            pad(3, s.n * 1.1 + .8); pipe(k, [0, .55, -s.n * .55], [0, .55, s.n * .55], .16, c.steel);
            for (let i = 0; i < s.n; i++) {
                const z = (i - (s.n - 1) / 2) * 1.1; k.paint(c.steel, .7, .35); k.box([0, .5, z], [.1, .42, .1]); k.paint([.9, .91, .92, 1], .25, .4); k.box([0, .95 + s.h / 2, z], [1.25, s.h / 2, .03]);
                if (!low) { k.paint(c.steel, .6, .4); for (let yy = 1.1; yy < s.h + .8; yy += .42) k.box([0, yy, z], [1.27, .015, .045]); k.box([0, .95 + s.h / 2, z], [.04, s.h / 2 + .02, .05]); }
            }
            break;
        }
        case 'solare': {
            soil(k, c); k.box([0, -PLINTH / 2, 0], [s.rows * 1.6, PLINTH / 2, s.cols * 1.3]);
            for (let i = 0; i < s.rows; i++) for (let j = 0; j < s.cols; j++) {
                const x = (i - (s.rows - 1) / 2) * 3.2, z = (j - (s.cols - 1) / 2) * 2.6; k.paint(c.steel, .7, .35);
                k.push([x, 0, z]); k.cyl(.09, .09, 0, 1.05, 6, { caps: true }); k.push([0, 1.1, 0], [0, 0, s.tilt]); k.paint([.05, .08, .17, 1], .85, .12, .02); k.box([0, 0, 0], [1.3, .035, 1.15]);
                if (!low) { k.paint(c.steel, .6, .4); for (let u = -1; u <= 1.01; u += .5) k.box([u * 1.25, .04, 0], [.012, .008, 1.15]); for (const w of [-.58, 0, .58]) k.box([0, .04, w], [1.3, .008, .012]); }
                k.pop(); k.pop();
            }
            break;
        }
        case 'reattore': {
            soil(k, c); mound(k, [0, 0, 0], s.r + 2.2, s.r + 2.2, s.h * .62, 3);
            k.paint(c.hull, .2, .5); k.cyl(s.r, s.r, 0, s.h, seg(28), { caps: false, bands: 2 }); k.sphere([0, s.h, 0], s.r, seg(28), 7, 0, Math.PI / 2);
            k.paint(c.accent, .2, .45); k.cyl(s.r + .02, s.r + .02, s.h * .72, s.h * .72 + .18, seg(28), { caps: false });
            k.paint([.9, .91, .92, 1], .25, .4); for (const sd of [-1, 1]) { k.box([0, s.h * .75, sd * (s.r + 1.45)], [1, s.h * .32, .035]); k.paint(c.steel, .6, .4); k.box([0, s.h * .75, sd * (s.r + .55)], [.08, .08, .9]); k.paint([.9, .91, .92, 1], .25, .4); }
            k.paint(c.hull, .2, .55); k.box([s.r + .9, .8, 0], [1, .8, .8]); hatch(k, s.r + 1.9, .8, 0, .8, 1.25, c); lamp(k, [0, s.h + s.r + .1, 0], [1, .3, .25, 1], .15);
            break;
        }
        case 'estrattore': {
            pad(9, 6.5);
            k.paint(c.steel, .6, .45); for (const [x, z] of [[1, 1], [1, -1], [-1, 1], [-1, -1]]) k.beam([2.4 + x * .8, .1, z * .8], [2.4 + x * .6, s.h * .55, z * .6], .09);
            k.paint(c.hull, .3, .55); k.push([2.4, s.h * .55, 0]); k.cyl(.3, 1.3, 0, 1.6, seg(14), { caps: true }); k.pop(); k.paint(c.dark, .5, .5); k.push([2.4, s.h * .55 - .5, 0]); k.cyl(.25, .3, 0, .5, 8, { caps: false }); k.pop();
            k.paint(c.steel, .7, .35); k.truss([1.6, s.h * .55 + 1.4, 0], [-1.2, s.h - .3, 0], .25, 1, .04);
            block(k, [-2.3, 0, 0], 3.2, 3.4, s.h - .7, .1, c.hull, .3, 1.4);
            windowBand(k, c, [-.7, 0, 0], [1, 0, 0], [0, 0, 1], 2.4, s.h - 1.6, .5, .7);
            k.paint(c.dark, .4, .5); k.push([-3.1, 0, .8]); k.cyl(.28, .24, s.h - .6, s.h + 1.6, 10, { caps: false }); k.pop(); lamp(k, [-3.1, s.h + 1.7, .8], [1, .55, .2, 1], .16);
            for (const z of [-2.5, 2.5]) { k.paint(c.steel, .6, .4); for (const x of [-3.3, -1.3]) k.box([x, .35, z], [.15, .3, .5]); k.paint(c.hull, .2, .5); k.push([-2.3, 1.15, z], [0, 0, -Math.PI / 2]); k.capsule(.75, -1.3, 1.3, seg(16), low ? 0 : 2); k.pop(); }
            hatch(k, -.68, .85, -.9, .8, 1.25, c);
            break;
        }
        case 'piattaforma': {
            if (s.organic) {
                soil(k, c); k.cyl(s.r * .8, s.r * .8, -PLINTH, .1, seg(18), { caps: true });
                const rows = []; for (let i = 0; i <= (low ? 6 : 12); i++) { const t = i / (low ? 6 : 12), z = (t - .5) * s.r * 2.1, w = Math.sin(t * Math.PI) ** .7 * s.r + .05; rows.push(ring(seg(24), w, .12, z, 0, .3 + Math.sin(t * Math.PI) * .1)); }
                k.paint(c.hull, .05, .6); smooth(k, rows, { capStart: true, capEnd: true });
                if (!low) { k.paint(c.accent, 0, .4, 1.4); k.push([0, .45, 0]); k.torus(s.r * .55, .05, 36, 4); k.pop(); k.paint(c.trim, .1, .7); sweep(k, [[0, .43, -s.r * 1.02], [0, .47, 0], [0, .43, s.r * 1.02]], .07, 6); for (let i = 1; i < 6; i++) { const z = (i / 6 - .5) * s.r * 2; for (const sd of [-1, 1]) sweep(k, [[0, .45, z], [sd * s.r * .45, .43, z + s.r * .12], [sd * s.r * .8 * Math.sin(i / 6 * Math.PI), .4, z + s.r * .2]], .035, 5); } }
                break;
            }
            soil(k, c); k.cyl(s.r + .4, s.r + .4, -PLINTH, .1, 8, { caps: true }); k.paint(c.trim, .2, .7); k.cyl(s.r, s.r + .3, .1, .32, 8, { caps: true });
            k.paint(shade(c.trim, .75), .2, .8); k.cyl(s.r * .92, s.r * .92, .32, .34, 8, { caps: true });
            k.paint([.85, .78, .2, 1], .1, .6, .08); k.push([0, .35, 0]); k.torus(s.r * .62, .06, 40, 3); k.pop();
            k.paint(c.dark, .2, .7); k.cyl(s.r * .4, s.r * .4, .34, .36, 24, { caps: true });
            for (let i = 0; i < 8; i++) { const a = (i + .5) * TAU / 8; lamp(k, [Math.cos(a) * s.r * .97, .42, Math.sin(a) * s.r * .97], i % 2 ? [1, .7, .3, 1] : [.4, 1, .5, 1], .12); }
            k.paint(c.steel, .5, .5); for (let i = 0; i < 3; i++) { const a = Math.PI * .7 + i * .3; k.push([Math.cos(a) * (s.r + .9), 0, Math.sin(a) * (s.r + .9)], [0, -a, 0]); k.box([0, .9, 0], [.07, .9, 1.2]); if (!low) for (const z of [-1, 0, 1]) k.box([0, .9, z * 1.1], [.12, .9, .06]); k.pop(); }
            if (s.lander) {
                k.push([0, .36, 0], [0, .4, 0]); k.paint(c.steel, .6, .4);
                for (let i = 0; i < 4; i++) { const a = i * TAU / 4 + .785; k.beam([Math.cos(a) * .9, 1.25, Math.sin(a) * .9], [Math.cos(a) * 1.85, .05, Math.sin(a) * 1.85], .07); k.push([Math.cos(a) * 1.85, 0, Math.sin(a) * 1.85]); k.cyl(.28, .28, 0, .06, 8, { caps: true }); k.pop(); }
                k.paint(c.dark, .6, .4); k.cyl(.6, .32, .35, 1, 14, { caps: false });
                k.paint(c.hull, .2, .5); k.cyl(1.25, 1.05, 1, 2.1, seg(10), { caps: true, bands: 1 }); k.cyl(1.05, .55, 2.1, 2.8, seg(10), { caps: true }); k.paint(c.glass, .85, .08, .35); k.push([.82, 2.35, 0], [0, 0, -.6]); k.box([0, 0, 0], [.05, .18, .38]); k.pop();
                k.paint(c.accent, .2, .45); k.cyl(1.27, 1.27, 1.6, 1.72, seg(10), { caps: false }); lamp(k, [0, 2.9, 0], [1, .3, .25, 1], .12); k.pop();
            }
            break;
        }
        case 'antenna': {
            pad(3.2, 3.2); k.paint(c.hull, .2, .55); k.cyl(1, .75, .12, s.h * .55, seg(16), { caps: true, bands: 1 }); k.paint(c.steel, .7, .35);
            for (const z of [-.55, .55]) k.box([0, s.h * .55 + .55, z], [.22, .6, .07]);
            k.push([0, s.h, 0], [0, 0, -.65]); k.paint([.9, .9, .92, 1], .3, .45); k.dish(s.dish, s.dish * .3, seg(36), low ? 4 : 8); k.paint(c.steel, .6, .4); k.cyl(.35, .35, -.4, .05, 10, { caps: true });
            if (!low) { k.paint(c.steel, .7, .35); for (let i = 0; i < 3; i++) { const a = i * TAU / 3; k.beam([Math.cos(a) * s.dish * .85, s.dish * .22, Math.sin(a) * s.dish * .85], [0, s.dish * .85, 0], .03); } k.paint(c.dark, .5, .5); k.cyl(.14, .1, s.dish * .8, s.dish * .98, 8, { caps: true }); } k.pop();
            hatch(k, .98, .8, 0, .7, 1.1, c); lamp(k, [0, s.h + s.dish * .9, 0], [1, .3, .25, 1]);
            break;
        }
        // ----- Symbiotic settlements -----
        case 'cuore': {
            // A gridshell grown from biomass, as the lattice shells of Frei Otto: a lobed plan, a diagonal lattice
            // of ribs, membrane below and glazing above, an oculus at the top and an entrance shell on every lobe.
            disc(s.R * 1.2 + .4);
            const L = s.lobes, rOf = th => s.R * (1 + .16 * Math.cos(L * th)), M = low ? 24 : 48, N = low ? 6 : 14, F0 = .12;
            const Pt = (f, th, lift = 0) => { const r = rOf(th) * f * (1 + lift * .012), h = s.H * Math.max(0, 1 - f * f) ** .55 * (1 + .07 * Math.cos(L * th)) + lift * .07; return [Math.cos(th) * r, h, Math.sin(th) * r]; };
            const rows = []; for (let i = 0; i <= N; i++) { const f = F0 + (1 - F0) * i / N; rows.push(Array.from({ length: M }, (_, j) => Pt(f, j / M * TAU))); }
            smooth(k, rows, { paint: i => i < N * .45 ? [c.glass, .35, .25, .22] : [shade(c.hull, .92 + .1 * (i % 2)), .05, .6] });
            k.paint(c.trim, .1, .5);
            if (!low) for (let q = 0; q < s.ribs; q++) for (const dir of [-1, 1]) sweep(k, Array.from({ length: 10 }, (_, i) => { const f = 1 - (1 - F0) * i / 9; return Pt(f, q / s.ribs * TAU + dir * s.twist * (1 - f), 1); }), .07, 4, { capEnd: false });
            sweep(k, Array.from({ length: (low ? 24 : 48) + 1 }, (_, j) => Pt(1, j / (low ? 24 : 48) * TAU, 1)), .16, 6, { capEnd: false });
            k.paint(c.accent, 0, .4, 1.2); sweep(k, Array.from({ length: 25 }, (_, j) => Pt(F0, j / 24 * TAU, 1)), .09, 5, { capEnd: false });
            k.paint(c.glass, .4, .2, .35); k.sphere([0, Pt(F0, 0)[1] - .05, 0], rOf(0) * F0 * 1.02, low ? 10 : 20, 4, 0, Math.PI / 2.4);
            for (let m = 0; m < L; m++) {
                const th = m * TAU / L, r0 = rOf(th) * .9; k.push([Math.cos(th) * r0, 0, Math.sin(th) * r0], [0, Math.PI / 2 - th, 0]);
                k.paint(shade(c.hull, .95), .05, .6); shell(k, -.6, 2.4, t => 1.45 - .25 * t, t => 2.5 - .45 * t, low ? 3 : 7, seg(16), .1);
                k.paint(c.trim, .1, .5); sweep(k, arch(low ? 8 : 14, 1.22, 2.07).map(([x, y]) => [x, y, 2.4]), .11, 5, { capEnd: false });
                k.paint(c.window, 0, .4, .9); k.box([0, .7, 2.38], [.55, .65, .04]); k.pop();
            }
            break;
        }
        case 'baccello': case 'gemelli': {
            // Seed pods on stems that flare into buttress roots, with a band of windows round the rim; twin pods
            // are joined by a glazed bridge.
            const gap = s.w + 1.6; disc(s.w * .45 + (s.n - 1) * gap / 2 + .6);
            const pods = Array.from({ length: s.n }, (_, n) => ({ z: (n - (s.n - 1) / 2) * gap, y: s.stem + n * .9 + s.h * .38 }));
            for (const [n, p] of pods.entries()) {
                k.push([0, 0, p.z]);
                k.paint(c.trim, .05, .65); k.cyl(.42, .34, 0, p.y, seg(12), { caps: false });
                for (let i = 0; i < 5; i++) { const a = i * TAU / 5 + n; sweep(k, [0, .3, .6, .85, 1].map(t => [Math.cos(a) * (.3 + t * t * 1.5), 1.5 * (1 - t) ** 1.4 - .12 * t, Math.sin(a) * (.3 + t * t * 1.5)]), q => .26 - q * .17, 6); }
                // Body: a seed with a band of windows along each side and a ridge along the back.
                const M = seg(28), N = low ? 8 : 18, L = s.w * 1.45, Wd = s.w * .72, side = j => Math.abs(Math.sin(j / M * TAU + Math.PI / M)) < .16;
                k.paint(c.hull, .05, .55); seed(k, [0, p.y, 0], L, Wd, s.h, M, N, (i, j) => side(j) && i >= N * .3 && i < N * .86 ? (hash(i, j, n) < .4 ? [c.window, .7, .25, 1] : [shade(c.glass, .7), .8, .12, .03]) : [shade(c.hull, .95 + .07 * ((i + (j > M / 2 ? 1 : 0)) % 2)), .05, .55]);
                if (!low) {
                    const along = (t0, t1, f0) => Array.from({ length: 11 }, (_, q) => { const t = t0 + (t1 - t0) * q / 10, f = Math.sin(Math.PI * t ** 1.35) ** .62; return f0(t, f); });
                    k.paint(c.trim, .1, .55); sweep(k, along(.12, .88, (t, f) => [(t - .5) * L, p.y + (t - .5) * L * .12 + s.h / 2 * f + .03, 0]), .07, 5);
                    k.paint(c.accent, 0, .4, 1); sweep(k, along(.2, .8, (t, f) => [(t - .5) * L, p.y + (t - .5) * L * .12 - s.h / 2 * f - .02, 0]), .035, 4);
                    k.paint(c.trim, .1, .55); k.push([-L * .2, 0, 0]); k.cyl(.08, .05, p.y + s.h * .35, p.y + s.h * .35 + 1.2, 6, { caps: true }); k.pop(); lamp(k, [-L * .2, p.y + s.h * .35 + 1.25, 0], c.accent, .07);
                }
                if (n === 0) {
                    // A glazed lift beside the stem, from a lit door on the ground to the belly of the pod.
                    const lx = .95, top = p.y - s.h * .3; k.paint(c.glass, .5, .15, .25); k.push([lx, 0, 0]); k.cyl(.42, .42, .05, top, seg(14), { caps: false }); k.paint(c.trim, .1, .55);
                    for (let y = .05; y <= top + 1e-6; y += Math.max(.6, (top - .05) / 4)) k.cyl(.47, .47, y, y + .1, seg(14), { caps: true }); k.cyl(.48, .4, top - .1, top + .25, seg(14), { caps: true });
                    k.paint(c.window, 0, .4, .9); k.box([.43, .65, 0], [.03, .6, .26]); k.pop();
                }
                k.pop();
            }
            if (s.n > 1) { const a = [0, pods[0].y, pods[0].z + s.w * .3], b = [0, pods[1].y, pods[1].z - s.w * .3]; k.paint(c.glass, .4, .2, .25); sweep(k, [a, mul(add(a, b), .5), b], .42, low ? 6 : 10, { capEnd: false }); k.paint(c.trim, .1, .55); for (const t of [.2, .5, .8]) { k.push(add(a, mul(sub(b, a), t)), [Math.PI / 2 - Math.atan2(b[1] - a[1], b[2] - a[2]), 0, 0]); k.torus(.45, .05, 16, 4); k.pop(); } }
            break;
        }
        case 'torreviva': {
            disc(s.r + 1.4);
            const M = low ? 8 : 20, axis = t => [0, t * s.h, 0];
            // Strands twisting round the core, flaring into roots at the foot.
            k.paint(c.hull, .05, .55);
            for (let q = 0; q < s.strands; q++) sweep(k, Array.from({ length: M + 1 }, (_, i) => { const t = i / M, a = q * TAU / s.strands + t * s.twist * TAU, rr = s.r * (1 - t * .5) * (1 + 1.4 * (1 - t) ** 6); return add(axis(t), [Math.cos(a) * rr, 0, Math.sin(a) * rr]); }), t => .45 * (1 - t * .55), 8);
            k.paint(c.trim, .05, .6); k.cyl(s.r * .7, s.r * .38, 0, s.h, seg(14), { caps: false, bands: 0 });
            if (!low) { k.paint(c.window, 0, .4, .9); for (let i = 0; i < Math.floor(s.h / 2.2); i++) { const y = 1.6 + i * 2.2, a = i * 1.7, rr = s.r * (1 - y / s.h * .5) * .72; k.push([Math.cos(a) * rr, y, Math.sin(a) * rr], [0, -a, 0]); k.box([0, 0, 0], [.05, .3, .22]); k.pop(); } }
            // Rooms: seed pods cantilevered on curved struts round the trunk, with a band of windows.
            for (let l = 0; l < s.leaves; l++) {
                const y = s.h * (.36 + l * .2), a = l * 2.3 + .4, out = s.r * .5 + 2.1, p = [Math.cos(a) * out, y, Math.sin(a) * out];
                k.paint(c.trim, .05, .6); sweep(k, [[Math.cos(a) * s.r * .4, y - 1.6, Math.sin(a) * s.r * .4], [Math.cos(a) * out * .55, y - 1.1, Math.sin(a) * out * .55], add(p, [0, -.45, 0])], t => .2 - t * .06, 6);
                const N = low ? 5 : 12, M = seg(20); k.push(p, [0, -a, 0]); k.paint(c.hull, .05, .55); seed(k, [.4, 0, 0], 3.4, 2, 1.5, M, N, (i, j) => Math.abs(Math.sin(j / M * TAU + Math.PI / M)) < .26 && i >= N * .3 && i < N * .85 ? (hash(j, i, l) < .45 ? [c.window, .7, .25, 1] : [shade(c.glass, .7), .8, .12, .03]) : [c.hull, .05, .55]); k.pop();
            }
            // Crown: five sails of membrane rising from the top, as the leaves of a plant, each on a rib.
            for (let q = 0; q < 5; q++) {
                const a = q * TAU / 5 + .3, o = [Math.cos(a), 0, Math.sin(a)], t = [-o[2], 0, o[0]], top = [0, s.h - .2, 0], rows = [], spine = [];
                for (let i = 0; i <= (low ? 4 : 8); i++) { const u = i / (low ? 4 : 8), w = Math.sin(Math.PI * Math.min(1, u * 1.1)) ** .8 * 1.15 + .02, base = add(add(top, mul(o, .3 + u * 3.3)), [0, u * 2.6 - u * u * .9, 0]); spine.push(base); rows.push([-1, -.5, 0, .5, 1].map(e => add(add(base, mul(t, e * w)), [0, -Math.abs(e) * w * .3, 0]))); }
                k.paint(c.glass, .3, .3, .3); smooth(k, rows, { closed: false }); k.paint(c.trim, .1, .5); sweep(k, spine, r => .1 - r * .06, 5);
            }
            lamp(k, [0, s.h + 1.5, 0], c.accent, .22);
            break;
        }
        case 'membrana': {
            pad(s.w + .8, s.len + .8);
            k.paint([.15, .27, .12, 1], 0, .9); for (let i = -1; i <= 1; i++) k.box([i * s.w * .28, .25, 0], [s.w * .1, .14, s.len / 2 - .6]);
            if (!low) { k.paint([.3, .5, .2, 1], 0, .8); for (let i = -1; i <= 1; i++) for (let z = -s.len / 2 + .9; z < s.len / 2 - .6; z += .6) k.sphere([i * s.w * .28 + (hash(i, z) - .5) * .3, .45, z], .26, 8, 4, 0, Math.PI / 2); }
            const W = () => s.w / 2, H = t => s.h * (1 - .18 * Math.abs(t - .5) * 2);
            k.paint(c.glass, .3, .2, .28); shell(k, -s.len / 2, s.len / 2, W, H, low ? 4 : 12, seg(20), .05);
            k.paint(c.trim, .1, .5); for (let i = 0; i <= s.ribs; i++) { const t = i / s.ribs, z = (t - .5) * s.len; sweep(k, arch(low ? 8 : 16, 1, 1).map(([cx, sy]) => [cx * (W() * (1 + .05 * (1 - sy) ** 4) + .05), sy * (H(t) + .05), z]), .09, 6, { capEnd: false }); }
            for (const dir of [-1, 1]) { const pts = arch(seg(20), W(), H(dir < 0 ? 0 : 1)).map(([x, y]) => [x, y, dir * s.len / 2]); k.paint(c.glass, .3, .2, .28); for (let j = 0; j + 1 < pts.length; j++) k.tri([0, 0, dir * s.len / 2], pts[j], pts[j + 1]); }
            k.paint(c.window, 0, .4, .9); k.box([0, .8, s.len / 2 + .02], [.55, .7, .04]);
            break;
        }
        case 'bioreattore': {
            disc(s.r + .8); k.paint(c.trim, .05, .7); k.cyl(s.r + .65, s.r + .45, .1, .6, seg(28), { caps: true });
            for (let i = 0; i < s.n; i++) {
                const a = i * TAU / s.n, x = Math.cos(a) * s.r, z = Math.sin(a) * s.r, f = .55 + .4 * hash(i, s.h);
                k.push([x, .6, z]); k.paint(c.glass, .4, .12, .12); k.cyl(.44, .44, 0, s.h, seg(16), { caps: false }); k.paint(c.accent, 0, .5, 1.1); k.cyl(.36, .36, .05, s.h * f, seg(12), { caps: true });
                k.paint(c.trim, .05, .6); k.cyl(.5, .5, -.05, .25, seg(16), { caps: true }); k.cyl(.48, .3, s.h - .1, s.h + .3, seg(16), { caps: true }); k.pop();
            }
            if (!low) { k.paint(c.trim, .05, .6); for (let i = 0; i < s.n; i++) { const a = i * TAU / s.n; sweep(k, [[Math.cos(a) * s.r, s.h + .85, Math.sin(a) * s.r], [Math.cos(a) * s.r * .6, s.h + 1.35, Math.sin(a) * s.r * .6], [0, s.h + 1.3, 0]], .08, 5); } }
            k.paint(c.hull, .05, .55); k.cyl(.85, .7, .6, s.h + 1.1, seg(16), { caps: true }); k.paint(c.trim, .05, .6); k.cyl(.9, .9, s.h + 1.1, s.h + 1.3, seg(16), { caps: true });
            k.paint(c.accent, 0, .4, 1); sweep(k, Array.from({ length: low ? 12 : 40 }, (_, i) => { const t = i / (low ? 11 : 39), a = t * TAU * 3; return [Math.cos(a) * .92, .8 + t * (s.h - .2), Math.sin(a) * .92]; }), .07, 4); lamp(k, [0, s.h + 1.4, 0], c.accent, .12);
            break;
        }
        case 'regolatore': {
            // Tiles of high and low albedo round a mast with sensors: the colony tunes how much light the ground
            // reflects, like the daisies of Daisyworld.
            soil(k, c); k.cyl(.7, .7, -PLINTH, .1, 10, { caps: true });
            let i = 0; for (let r = 1; r <= s.rings; r++) { const n = r * 6; for (let j = 0; j < n; j++) { const a = j * TAU / n + r * .3, R = r * 2.1, x = Math.cos(a) * R, z = Math.sin(a) * R; k.push([x, 0, z]); k.paint(c.trim, .2, .6); if (!low) k.cyl(.07, .07, 0, .5, 5, { caps: false }); k.push([0, .55, 0], [hash(i, r) * .25 - .12, a, 0]); const light = (i++ + r) % 3 === 0; k.paint(light ? [.92, .91, .86, 1] : [.07, .08, .08, 1], light ? .05 : .4, light ? .7 : .35); if (low) k.extrude(Array.from({ length: 6 }, (_, q) => [Math.cos(q * TAU / 6) * .97, Math.sin(q * TAU / 6) * .97]), -.04, .04); else { k.cyl(.97, .97, -.04, .04, 6, { caps: true }); k.paint(c.trim, .2, .6); k.cyl(1, 1, -.06, -.04, 6, { caps: true }); } k.pop(); k.pop(); } }
            k.paint(c.trim, .2, .5); k.cyl(.32, .16, 0, s.mast, seg(10), { caps: false }); k.paint(c.accent, 0, .4, 1.3); for (const y of [s.mast * .55, s.mast * .78]) { k.push([0, y, 0]); k.torus(.55, .05, 24, 4); k.pop(); }
            k.paint(c.hull, .2, .5); k.sphere([0, s.mast + .3, 0], .45, 14, 9); k.paint(c.steel, .6, .4); k.beam([0, s.mast + .7, 0], [0, s.mast + .8, 0], .02); lamp(k, [0, s.mast + .8, 0], c.accent, .1);
            break;
        }
        case 'foglia': {
            soil(k, c); k.cyl(2.2, 2.2, -PLINTH, .1, 14, { caps: true });
            const N = low ? 6 : 14, rows = []; for (let i = 0; i <= N; i++) { const t = i / N, w = Math.sin(t * Math.PI) ** .75 * s.w / 2 + .03, x = (t - .5) * s.len; rows.push(ring(seg(26), w, .13, 0, 0, .34 + Math.sin(t * Math.PI) * .1).map(([u, v]) => [x, v - Math.abs(u) * .05, u])); }
            k.paint(c.hull, .05, .55); smooth(k, rows, { capStart: true, capEnd: true });
            if (!low) { k.paint(c.trim, .05, .6); sweep(k, [[-s.len / 2, .5, 0], [0, .58, 0], [s.len / 2, .5, 0]], .08, 6); for (let i = 1; i < 7; i++) { const x = (i / 7 - .5) * s.len; for (const sd of [-1, 1]) sweep(k, [[x, .55, 0], [x + s.len * .05, .53, sd * s.w * .2], [x + s.len * .09, .48, sd * s.w * .44 * Math.sin(i / 7 * Math.PI)]], .04, 5); } k.paint(c.accent, 0, .4, 1.4); k.push([0, .56, 0]); k.torus(Math.min(s.w, s.len) * .28, .045, 36, 4); k.pop(); }
            break;
        }
        case 'ramo': {
            disc(1.3);
            const grow = (p, dir, len, r, depth, seed) => {
                const bend = unit(add(dir, [Math.sin(seed) * .25, .1, Math.cos(seed) * .25])), mid = add(p, mul(dir, len * .5)), q = add(mid, mul(bend, len * .5));
                k.paint(c.hull, .05, .55); sweep(k, [p, mid, q], t => r * (1 - t * .35), low ? 5 : 8, { capEnd: depth === 0 });
                if (depth === 0) { lamp(k, q, c.accent, .08); if (!low) { k.paint(c.steel, .6, .4); k.beam(q, add(q, mul(bend, .8)), .02); } return; }
                for (let b = 0; b < (low ? 2 : 3); b++) { const a = b * TAU / 3 + depth * 1.3 + seed; grow(q, unit(add(bend, [Math.cos(a) * .75, .25, Math.sin(a) * .75])), len * .64, r * .6, depth - 1, seed + b * 2.1); }
            };
            grow([0, 0, 0], [0, 1, 0], s.h * .42, .36, s.depth, 1);
            k.paint(c.trim, .05, .6); for (let i = 0; i < 5; i++) { const a = i * TAU / 5; sweep(k, [[0, .9, 0], [Math.cos(a) * .7, .3, Math.sin(a) * .7], [Math.cos(a) * 1.2, -.1, Math.sin(a) * 1.2]], .14, 6); }
            break;
        }
        // ----- Adapted towns -----
        case 'centrale': {
            // Hexagonal command centre: a base with sloped walls, bands of glazing, buttresses at three corners
            // and a mast with an observation pod.
            const R = s.R; soil(k, c); k.cyl(R + 1.4, R + 1.4, -PLINTH, .06, 6, { caps: true });
            k.paint(c.hull, .15, .6); frustumN(k, 6, R, R * .94, .06, 1.8);
            k.paint(shade(c.glass, .8), .85, .1, .2); frustumN(k, 6, R * .94, R * .96, 1.8, 2.5);
            k.paint(c.hull, .15, .6); frustumN(k, 6, R * .96, R * .72, 2.5, 4.4);
            let y = 4.4, r = R * .72;
            if (s.tiers > 1) { k.paint(shade(c.glass, .8), .85, .1, .2); frustumN(k, 6, r, r * 1.02, y, y + .7); k.paint(c.hull, .15, .6); frustumN(k, 6, r * 1.02, r * .75, y + .7, y + 2.2); y += 2.2; r *= .75; }
            k.paint(c.trim, .2, .55); frustumN(k, 6, r + .15, r + .15, y, y + .25);
            if (!low) { k.paint(c.window, .7, .25, 1); for (let i = 0; i < 6; i++) { const a = i * TAU / 6, ap = R * .95 * Math.cos(Math.PI / 6) + .02; for (let q = -2; q <= 2; q++) if (hash(i, q) < .55) { k.push([Math.cos(a) * ap, 2.15, Math.sin(a) * ap], [0, -a, 0]); k.box([0, 0, q * R * .17], [.02, .26, R * .07]); k.pop(); } } }
            k.paint(shade(c.hull, .85), .15, .6); for (let i = 0; i < 3; i++) { const a = Math.PI / 6 + (2 * i + 1) * Math.PI / 3, o = [Math.cos(a), 0, Math.sin(a)], t = [-o[2], 0, o[0]], A = mul(o, R * .9), B = mul(o, R + 1.5), w = .38;
                for (const sd of [-1, 1]) k.quad(add(A, mul(t, sd * w)), add(B, mul(t, sd * w)), add(add(A, mul(t, sd * w)), [0, 2.8, 0]), add(add(A, mul(t, sd * w)), [0, 2.8, 0]));
                k.quad(add(B, mul(t, -w)), add(B, mul(t, w)), add(add(A, mul(t, w)), [0, 2.8, 0]), add(add(A, mul(t, -w)), [0, 2.8, 0])); }
            k.paint(c.hull, .2, .55); k.cyl(.55, .4, y, y + s.tower, seg(12), { caps: false, bands: 2 });
            lens(k, [0, y + s.tower, 0], 1.6, 1.1, seg(24), low ? 5 : 9, i => i >= (low ? 2 : 4) && i <= (low ? 3 : 5) ? [c.glass, .85, .08, .45] : null);
            k.paint(c.steel, .7, .35); k.cyl(.05, .04, y + s.tower + .6, y + s.tower + 2.4, 6, { caps: true }); lamp(k, [0, y + s.tower + 2.5, 0], [1, .3, .25, 1], .13);
            k.push([R * .5, y + .25, R * .3]); k.paint(c.steel, .6, .4); k.cyl(.12, .1, 0, .9, 6, { caps: true }); k.push([0, .9, 0], [0, 0, -.7]); k.paint([.9, .9, .92, 1], .3, .45); k.dish(.75, .22, seg(20), 4); k.pop(); k.pop();
            // Entrance canopy on the face towards +x.
            const ap = R * Math.cos(Math.PI / 6); k.paint(c.trim, .2, .55); k.box([ap + .7, 1.5, 0], [.8, .07, 1.1]); for (const z of [-1, 1]) k.box([ap + 1.4, .75, z * 1], [.06, .72, .06]); hatch(k, ap - .05, .8, 0, 1, 1.35, c);
            break;
        }
        case 'piloni': {
            // Habitat on pillars: a rounded hull on V-shaped columns, ribbon windows, a stair tower and roof plant.
            pad(s.w + 1.6, s.dz + 1.4); const h = s.floors * 1.5, rr = s.dz * .42, top = s.lift + h;
            k.paint(c.steel, .5, .5); for (let i = 0; i < 3; i++) for (const z of [-1, 1]) { const x = (i - 1) * (s.w / 2 - 1), zz = z * (s.dz / 2 - .7); for (const sd of [-1, 1]) sweep(k, [[x + sd * .7, .04, zz], [x, s.lift - .1, zz]], .13, 6); }
            k.paint(c.trim, .2, .55); k.extrude(rrect(s.w + .25, s.dz + .25, rr + .1), s.lift - .22, s.lift);
            k.paint(c.hull, .1, .65); k.extrude(rrect(s.w, s.dz, rr), s.lift, top);
            for (let f = 0; f < s.floors; f++) {
                const y0 = s.lift + f * 1.5 + .55; k.paint(shade(c.glass, .7), .85, .1, .03); k.extrude(rrect(s.w + .05, s.dz + .05, rr + .02), y0, y0 + .5);
                if (!low) { for (const sd of [-1, 1]) for (let q = 0; q < 6; q++) { if (hash(f, q, sd) > .45) continue; const x = -s.w / 2 + rr + (q + .5) * (s.w - 2 * rr) / 6; k.paint(c.window, .7, .25, 1); k.box([x, y0 + .25, sd * (s.dz / 2 + .03)], [(s.w - 2 * rr) / 14, .2, .015]); } k.paint(shade(c.hull, .65), .1, .8); k.extrude(rrect(s.w + .03, s.dz + .03, rr + .01), y0 + 1.15, y0 + 1.2); }
            }
            k.paint(shade(c.hull, .85), .15, .6); k.extrude(rrect(s.w + .15, s.dz + .15, rr + .05), top, top + .14);
            k.paint(c.dark, .3, .55); k.box([-s.w * .2, top + .45, 0], [.8, .32, .6], low ? 0 : .5); k.paint(c.steel, .6, .4); for (const z of [-.3, .3]) { k.push([-s.w * .2 + .3, top + .78, z]); k.cyl(.24, .24, 0, .1, 10, { caps: true }); k.pop(); }
            k.push([s.w * .22, top + .5, 0], [0, 0, .5]); k.paint([.05, .08, .17, 1], .85, .12, .02); k.box([0, 0, 0], [.8, .03, .6]); k.pop(); k.paint(c.steel, .6, .4); k.box([s.w * .22, top + .25, 0], [.05, .2, .05]);
            k.push([s.w / 2 - .2, 0, -s.dz / 2 + .3]); k.paint(c.hull, .1, .65); k.cyl(.85, .85, .04, top + .7, seg(16), { caps: true, bands: s.floors });
            k.paint(c.glass, .85, .1, .25); k.push([.84, (top + .7) / 2 + .5, 0]); k.box([0, 0, 0], [.03, (top + .7) / 2 - .6, .22]); k.pop(); hatch(k, .84, .75, 0, .7, 1.2, c); k.pop();
            break;
        }
        case 'terrazza': {
            // Terraced block: each level steps back and its terrace is covered by a lean-to greenhouse.
            pad(s.w + 1, s.dz + 1); const rr = 1.2, H = 1.7;
            for (let t = 0; t < s.steps; t++) {
                const d = s.dz * (1 - t / s.steps * .62), z = -(s.dz - d) / 2, y0 = .06 + t * H, front = z + d / 2;
                k.push([0, 0, z]); k.paint(c.hull, .1, .65); k.extrude(rrect(s.w, d, rr), y0, y0 + H);
                k.paint(shade(c.glass, .7), .85, .1, .03); k.extrude(rrect(s.w + .04, d + .04, rr + .02), y0 + .6, y0 + 1.15);
                k.paint(shade(c.hull, .82), .15, .6); k.extrude(rrect(s.w + .12, d + .12, rr + .06), y0 + H - .06, y0 + H + .06); k.pop();
                if (!low) for (let q = 0; q < 7; q++) if (hash(t, q) < .5) { k.paint(c.window, .7, .25, 1); k.box([-s.w / 2 + rr + (q + .5) * (s.w - 2 * rr) / 7, y0 + .87, front + .03], [(s.w - 2 * rr) / 16, .22, .015]); }
                if (t + 1 < s.steps) {
                    const d2 = s.dz * (1 - (t + 1) / s.steps * .62), f2 = -(s.dz - d2) / 2 + d2 / 2, yb = y0 + H + .06, x0 = -s.w / 2 + rr, x1 = s.w / 2 - rr;
                    k.paint(c.glass, .85, .08, .28); k.quad([x1, yb, front - .1], [x0, yb, front - .1], [x0, yb + 1.25, f2 + .02], [x1, yb + 1.25, f2 + .02]);
                    for (const x of [x0, x1]) k.tri([x, yb, front - .1], [x, yb + 1.25, f2 + .02], [x, yb, f2 + .02]);
                    if (!low) { k.paint(c.steel, .6, .4); for (let q = 0; q <= 6; q++) { const x = x0 + (x1 - x0) * q / 6; k.beam([x, yb, front - .1], [x, yb + 1.25, f2 + .02], .03); } k.paint([.3, .48, .22, 1], 0, .8); k.box([0, yb + .12, (front + f2) / 2], [(x1 - x0) / 2 - .2, .1, (front - f2) / 2 - .25]); }
                }
            }
            hatch(k, s.w / 2, .8, s.dz * .25, .9, 1.3, c);
            break;
        }
        case 'processore': {
            pad(s.r * 2 + 3.6, s.r * 2 + 3.6); k.paint(c.hull, .3, .55); k.cyl(s.r, s.r * .78, .12, s.h, seg(32), { caps: false, bands: 4 });
            k.paint(c.dark, .5, .45); k.cyl(s.r * .8, s.r * .7, s.h, s.h + 1.2, seg(32), { caps: false }); k.cyl(s.r * .66, s.r * .66, s.h + .8, s.h + .82, seg(24), { caps: true });
            k.paint(c.accent, .2, .45); for (const y of [s.h * .33, s.h * .66]) k.cyl(s.r * (1 - y / s.h * .22) + .03, s.r * (1 - (y + .25) / s.h * .22) + .03, y, y + .25, seg(32), { caps: false });
            if (!low) { k.paint(c.steel, .6, .4); k.push([s.r * .9, 0, 0]); k.truss([0, .12, 0], [-.6, s.h, 0], .25, 1.2, .04); k.pop(); }
            for (let i = 0; i < s.fans; i++) {
                const a = (i + .5) * TAU / s.fans; k.push([Math.cos(a) * (s.r + .75), 1.9, Math.sin(a) * (s.r + .75)], [0, -a, 0]);
                k.paint(c.steel, .6, .4); tubeX(k, 0, 0, -.6, .6, 1.55, seg(22), false); k.paint(c.dark, .5, .5); tubeX(k, 0, 0, -.55, .55, 1.48, seg(22), false); k.box([0, -1.2, 0], [.55, .7, .9]);
                if (!low) { k.paint(c.dark, .5, .5); for (let b = 0; b < 7; b++) { const t = b * TAU / 7; k.push([.45, 0, 0], [t, 0, 0]); k.box([0, .75, 0], [.03, .65, .16]); k.pop(); } k.paint(c.steel, .6, .4); tubeX(k, 0, 0, .3, .62, .3, 12); }
                k.pop();
            }
            pipe(k, [s.r * .95, s.h * .4, 0], [s.r + 2.4, s.h * .4, 0], .3, c.steel); pipe(k, [s.r + 2.4, s.h * .4 + .3, 0], [s.r + 2.4, .1, 0], .3, c.steel); lamp(k, [0, s.h + 1.3, 0], [1, .3, .25, 1], .18);
            break;
        }
        case 'energia': {
            if (s.kind === 'vento') {
                disc(1.6); k.paint([.88, .89, .9, 1], .2, .45); k.cyl(.6, .28, .1, s.h, seg(18), { caps: false, bands: 2 });
                k.push([0, s.h, 0]); k.paint([.88, .89, .9, 1], .2, .45); k.box([.2, .3, 0], [1.3, .42, .48], low ? 0 : .6); k.sphere([1.65, .3, 0], .4, 14, 9);
                for (let b = 0; b < 3; b++) { const a = b * TAU / 3 + .4, rows = []; for (let i = 0; i <= (low ? 3 : 7); i++) { const t = i / (low ? 3 : 7), w = .38 * (1 - t * .78) * (t < .15 ? .5 + t * 3.3 : 1) + .04, L = .3 + t * 4.3, tw = (1 - t) * .5; rows.push(ring(8, .07, w, 0).map(([u, v]) => { const v2 = v * Math.cos(tw) - u * Math.sin(tw), u2 = u * Math.cos(tw) + v * Math.sin(tw); return [1.85 + u2, .3 + Math.cos(a) * L - Math.sin(a) * v2, Math.sin(a) * L + Math.cos(a) * v2]; })); } k.paint([.9, .91, .92, 1], .15, .45); smooth(k, rows, { capEnd: true }); }
                k.pop(); lamp(k, [-.9, s.h + .8, 0], [1, .3, .25, 1], .12);
                break;
            }
            if (s.kind === 'geotermia') {
                pad(12, 7.2); block(k, [2, 0, 0], 5, 4.2, 3.2, .12, c.hull, .3, 1.6); windowBand(k, c, [4.5, 0, 0], [1, 0, 0], [0, 0, 1], 3, 2.2, .5, .6); hatch(k, 4.5, .85, -1.2, .9, 1.3, c);
                const rows = []; for (let i = 0; i <= (low ? 6 : 14); i++) { const t = i / (low ? 6 : 14), r = 2.5 * (1 - .4 * Math.sin(t * Math.PI * .82)); rows.push(ring(seg(30), r, r, 0).map(([u, v]) => [u - 3.2, .1 + t * s.h, v])); }
                k.paint([.76, .75, .72, 1], .1, .8); smooth(k, rows); k.paint(shade([.76, .75, .72, 1], .5), .1, .9); k.push([-3.2, 0, 0]); k.cyl(2.5, 2.5, .1, .5, seg(30), { caps: false }); k.cyl(2.05, 2.05, s.h - .2, s.h, seg(30), { caps: false }); k.pop();
                pipe(k, [-.7, 2.2, 0], [-.5, 2.2, 0], .4, c.steel); pipe(k, [-.6, 2.2, .9], [-.6, .1, .9], .3, c.steel); pipe(k, [4.5, 1.2, 1.6], [6, 1.2, 1.6], .3, c.steel); lamp(k, [-3.2 + 2.1, s.h + .1, 0], [1, .3, .25, 1], .15);
                break;
            }
            for (let i = 0; i < 2; i++) for (let j = 0; j < 3; j++) { const x = (i - .5) * 3.2, z = (j - 1) * 2.6; k.push([x, 0, z]); k.paint(c.steel, .7, .35); k.cyl(.09, .09, 0, 1.05, 6, { caps: true }); k.push([0, 1.1, 0], [0, 0, .5]); k.paint([.05, .08, .17, 1], .85, .12, .02); k.box([0, 0, 0], [1.3, .035, 1.15]); if (!low) { k.paint(c.steel, .6, .4); for (const w of [-.58, 0, .58]) k.box([0, .04, w], [1.3, .008, .012]); } k.pop(); k.pop(); }
            break;
        }
        case 'sfere': {
            pad(s.n * s.r * 2.5 + 1, s.r * 2.5 + .6);
            for (let i = 0; i < s.n; i++) {
                const x = (i - (s.n - 1) / 2) * s.r * 2.5, y = s.r + 1.2; k.paint(c.steel, .6, .4);
                for (let a = 0; a < 6; a++) { const t = a * TAU / 6; k.beam([x + Math.cos(t) * s.r * .95, .1, Math.sin(t) * s.r * .95], [x + Math.cos(t) * s.r * .78, y, Math.sin(t) * s.r * .78], .08); }
                k.paint(c.hull, .3, .4); k.sphere([x, y, 0], s.r, seg(28), seg(18)); k.paint(c.trim, .3, .5); k.push([x, y, 0]); k.torus(s.r + .02, .07, seg(28), 4); k.pop();
                if (!low) { k.paint(c.accent, .2, .45); k.push([x, y, 0]); k.torus(s.r * .7, .05, 24, 4, TAU, 0, 0, TAU); k.pop(); k.paint(c.steel, .6, .4); k.beam([x + s.r * .6, y + s.r * .8, 0], [x + s.r * .6, .1, s.r * .6], .03); }
            }
            pipe(k, [-(s.n - 1) / 2 * s.r * 2.5, .9, s.r * .95], [(s.n - 1) / 2 * s.r * 2.5, .9, s.r * .95], .2, c.steel);
            break;
        }
        case 'capannone': {
            // Hydroponic hall: a faceted glazed vault on a low wall, with frames on every edge and grow lights.
            pad(s.w + 1, s.len + 1); const n = 5, sec = Array.from({ length: n + 1 }, (_, i) => { const a = i / n * Math.PI; return [Math.cos(a) * s.w / 2, .55 + Math.sin(a) * (s.h - .55)]; });
            k.paint(c.hull, .1, .65); k.extrude(rrect(s.w + .1, s.len + .1, .3, 2), .06, .55);
            k.paint([.16, .26, .12, 1], 0, .9); for (const x of [-.25, .25]) k.box([x * s.w, .7, 0], [s.w * .16, .16, s.len / 2 - .5]);
            if (!low) { k.paint([.3, .5, .2, 1], 0, .8); for (const x of [-.25, .25]) for (let z = -s.len / 2 + .8; z < s.len / 2 - .5; z += .5) k.sphere([x * s.w, .85, z], .2, 8, 4, 0, Math.PI / 2); k.paint([.95, .45, .9, 1], 0, .5, 1.5); for (const x of [-.25, .25]) k.box([x * s.w, s.h * .8, 0], [.05, .03, s.len / 2 - .6]); }
            const Z = j => -s.len / 2 + j * s.len / s.bays;
            k.paint(c.glass, .85, .08, .26); for (let j = 0; j < s.bays; j++) for (let i = 0; i < n; i++) { const [x0, y0] = sec[i], [x1, y1] = sec[i + 1]; k.quad([x0, y0, Z(j)], [x1, y1, Z(j)], [x1, y1, Z(j + 1)], [x0, y0, Z(j + 1)]); }
            for (const z of [-s.len / 2, s.len / 2]) for (let i = 0; i < n; i++) k.tri([0, .55, z], sec[i].concat(z), sec[i + 1].concat(z));
            k.paint(c.steel, .6, .4); for (let j = 0; j <= s.bays; j++) for (let i = 0; i < n; i++) k.beam([...sec[i], Z(j)], [...sec[i + 1], Z(j)], .06);
            for (let i = 0; i <= n; i++) k.beam([...sec[i], -s.len / 2], [...sec[i], s.len / 2], .05);
            k.paint(c.hull, .1, .65); k.box([s.w / 2 + .4, .95, s.len * .3], [.5, .85, .7]); hatch(k, s.w / 2 + .9, .85, s.len * .3, .8, 1.25, c);
            break;
        }
        case 'hangar': {
            pad(s.len + 1.2, s.r * 2 + 1.2);
            k.push([0, .1, 0], [0, Math.PI / 2, 0]); k.paint(c.hull, .3, .5); shell(k, -s.len / 2, s.len / 2, () => s.r, () => s.r, low ? 4 : 10, seg(28), 0);
            k.paint(c.steel, .6, .4); for (let i = 0; i <= 5; i++) { const z = (i / 5 - .5) * s.len; sweep(k, arch(low ? 8 : 18, s.r + .08, s.r + .08).map(([x, y]) => [x, y, z]), .1, 5, { capEnd: false }); }
            k.pop();
            for (const dir of [-1, 1]) {
                const pts = arch(seg(24), s.r * .99, s.r * .99).map(([z, y]) => [dir * s.len / 2, .1 + y, z]), mid = [dir * s.len / 2, .1, 0];
                k.paint(dir > 0 ? c.dark : c.hull, .4, .5); for (let j = 0; j + 1 < pts.length; j++) k.tri(mid, pts[j], pts[j + 1]);
                if (dir > 0 && !low) { k.paint(c.steel, .6, .4); for (let z = -s.r * .7; z <= s.r * .7 + 1e-6; z += s.r * .35) k.box([s.len / 2 + .03, .1 + Math.sqrt(Math.max(0, s.r * s.r - z * z)) * .5, z], [.03, Math.sqrt(Math.max(0, s.r * s.r - z * z)) * .48, .04]); k.paint(c.accent, .2, .5, .3); k.box([s.len / 2 + .05, s.r * .86, 0], [.03, .08, s.r * .55]); }
            }
            lamp(k, [s.len / 2 + .1, s.r + .15, 0], [1, .7, .3, 1], .12);
            break;
        }
        case 'container': {
            // Cargo yard: pressurised canisters on racks, in muted colours with bands, under a gantry crane.
            const tints = [[.42, .24, .17, 1], [.22, .27, .32, 1], [.46, .39, .22, 1], [.26, .3, .21, 1], [.38, .38, .36, 1], [.33, .24, .22, 1]], X = 3.2, Zs = 1.45;
            pad(s.cols * X + 1.6, s.rows * Zs * 2 + 1.4);
            for (let i = 0; i < s.rows; i++) {
                const z0 = (i - (s.rows - 1) / 2) * Zs * 2; k.paint(c.steel, .6, .45);
                for (const sd of [-1, 1]) k.box([0, .3, z0 + sd * .55], [s.cols * X / 2, .06, .05]);
                for (let j = 0; j <= s.cols; j++) { const x = (j - s.cols / 2) * X; for (const sd of [-1, 1]) k.box([x, .17, z0 + sd * .55], [.06, .17, .06]); }
                for (let j = 0; j < s.cols; j++) for (let q = 0; q < 1 + (hash(i, j) < .55 ? 1 : 0); q++) {
                    const x = (j - (s.cols - 1) / 2) * X, y = .98 + q * 1.22, col = tints[s.colors[(i * 3 + j + q) % 5]];
                    k.push([x, y, z0], [0, 0, -Math.PI / 2]); k.paint(col, .35, .55); k.cyl(.6, .6, -1.35, 1.35, seg(14), { caps: true, bands: low ? 0 : 1 });
                    if (!low) { k.paint(c.hull, .3, .5); for (const e of [-1, 1]) k.cyl(.62, .62, e * 1.35 - .1, e * 1.35 + .02 * e, 14, { caps: false }); k.paint(shade(col, .55), .3, .6); k.cyl(.62, .62, -.15, .15, 14, { caps: false }); } k.pop();
                }
            }
            k.paint(c.steel, .6, .4); const gx = s.cols * X / 2 + .5, gz = s.rows * Zs + .5, gh = 3.6;
            for (const x of [-gx, gx]) { for (const z of [-gz, gz]) k.box([x, gh / 2, z], [.12, gh / 2, .12]); k.box([x, gh + .05, 0], [.14, .14, gz + .1]); k.box([x, .5, 0], [.08, .08, gz]); }
            for (const z of [-gz, gz]) { k.box([0, gh + .1, z], [gx + .1, .1, .1]); k.box([0, gh + .5, z], [gx + .1, .08, .08]); if (!low) for (let x = -gx; x < gx - .1; x += 1.2) k.beam([x, gh + .1, z], [x + 1.2, gh + .5, z], .03); } k.paint(c.accent, .3, .5); k.box([gx * .3, gh + .3, 0], [.5, .3, gz + .3]); k.paint(c.steel, .6, .4); k.beam([gx * .3, gh, 0], [gx * .3, 2.6, 0], .015);
            break;
        }
        default: throw new Error('Tipo di edificio sconosciuto: ' + s.type);
    }
    return weather(k.mesh(), c.soil);
}

/** Works along the streets of a colony, as one mesh: pipelines beside the spokes on their supports (sealed and
 * adapted colonies) and lamps along every street, which light the colony at night. */
export function worksMesh(colony) {
    const c = colony.params.colors, typ = colony.typology, k = new Kit({ ...c, panel: c.dark, detail: 1 });
    for (const st of colony.streets) {
        const P = st.points, side = st.width / 2 + .45;
        const at = (u, off) => { const n = P.length - 1, q = Math.min(n - 1, Math.floor(u)), f = u - q, a = P[q], b = P[q + 1], dx = b[0] - a[0], dz = b[2] - a[2], l = Math.hypot(dx, dz) || 1; return [a[0] + dx * f - dz / l * off, a[1] + (b[1] - a[1]) * f - .08, a[2] + dz * f + dx / l * off]; };
        const length = P.length - 1;
        if (st.kind === 'raggio' && typ !== 'simbiotico' && length > 8) {
            const from = 3, to = length - 3, step = 3; let prev = null;
            for (let u = from; u <= to + 1e-6; u += step) {
                const p = at(u, side), q = add(p, [0, .5, 0]); k.paint(c.steel, .6, .45); k.box(add(p, [0, .22, 0]), [.06, .22, .06]); k.box(add(p, [0, .44, 0]), [.08, .03, .18]);
                if (prev) { pipe(k, add(prev, [0, .03, .08]), add(q, [0, .03, .08]), .1, c.steel); pipe(k, add(prev, [0, .03, -.08]), add(q, [0, .03, -.08]), .07, typ === 'sigillato' ? c.trim : c.accent); }
                prev = q;
            }
        }
        // Lamps every 9 units, on alternate sides; in symbiotic settlements low glowing markers.
        for (let u = 4, n = 0; u < length - 2; u += 9, n++) {
            const p = at(u, (n % 2 ? 1 : -1) * (st.width / 2 + .3));
            if (typ === 'simbiotico') { k.paint(c.trim, .05, .6); k.cyl(.07, .05, p[1], p[1] + .55, 6, { caps: true }); k.paint(c.accent, 0, .4, 2.2); k.sphere(add(p, [0, .6, 0]), .09, 8, 5); }
            else { k.paint(c.steel, .6, .4); k.push([p[0], 0, p[2]]); k.cyl(.05, .04, p[1], p[1] + 2.3, 6, { caps: true }); k.pop(); k.box(add(p, [0, 2.3, 0]), [.22, .04, .07]); k.paint(c.window, 0, .4, 2.4); k.box(add(p, [0, 2.26, 0]), [.16, .015, .05]); }
        }
    }
    return k.mesh();
}
