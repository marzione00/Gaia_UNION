/** Organic shapes (1.67.0): bodies, limbs, branches, leaves and fronds built as smooth surfaces through rows of
 * points, in the 12-float vertex of the species and of the native peoples (position, normal, uv, colour). The
 * parts painted white take the colour of each instance. A body is one surface swept along a spine with a
 * profile of radii, so a trunk, a neck and a head join without seams, and limbs are tapered tubes through
 * their joints: the shapes read as animals and plants, where 1.63.0 joined scaled spheres and tubes. */

const add = (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]], sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]], mul = (a, s) => [a[0] * s, a[1] * s, a[2] * s];
const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2], cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const unit = a => { const l = Math.hypot(a[0], a[1], a[2]) || 1; return [a[0] / l, a[1] / l, a[2] / l]; };
export const V3 = Object.freeze({ add, sub, mul, dot, cross, unit, lerp: (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t] });
export const WHITE = Object.freeze([1, 1, 1, 1]);
const TAU = Math.PI * 2;

/** Builder of one mesh at level 0 (detailed) or 1 (light): counts of rows and sides shrink at level 1. */
export class Shape {
    constructor(level = 0) { this.v = []; this.i = []; this.level = level; this.low = level > 0; }
    /** Count at the current level: at level 1 a little more than half, never below `min`. */
    n(x, min = 3) { return this.low ? Math.max(min, Math.round(x * .5)) : x; }
    vtx(p, n, c) { this.v.push(p[0], p[1], p[2], n[0], n[1], n[2], 0, 0, c[0], c[1], c[2], c[3] ?? 1); return this.v.length / 12 - 1; }
    /** Smooth surface through rows of points (closed rings or open arcs) with averaged normals; `color` is a
     * colour or a function of the row and the column. A row shrunk to a point takes the normal of the axis. */
    surface(rows, color, { closed = true, capStart = false, capEnd = false } = {}) {
        const R = rows.length, n = rows[0].length, J = j => closed ? ((j % n) + n) % n : Math.max(0, Math.min(n - 1, j)), P = (i, j) => rows[Math.max(0, Math.min(R - 1, i))][J(j)];
        const centre = rows.map(r => mul(r.reduce((a, p) => add(a, p), [0, 0, 0]), 1 / n)), base = this.v.length / 12, col = typeof color === 'function' ? color : () => color;
        for (let i = 0; i < R; i++) for (let j = 0; j < n; j++) {
            const raw = cross(sub(P(i + 1, j), P(i - 1, j)), sub(P(i, j + 1), P(i, j - 1)));
            let nn = unit(raw);
            if (Math.hypot(...raw) < 1e-10) nn = unit(i ? sub(centre[i], centre[i - 1]) : sub(centre[0], centre[1]));
            else if (closed && dot(nn, sub(P(i, j), centre[i])) < 0) nn = mul(nn, -1);
            this.vtx(P(i, j), nn, col(i, j));
        }
        for (let i = 0; i + 1 < R; i++) for (let j = 0; j < (closed ? n : n - 1); j++) {
            const j1 = (j + 1) % n, a = base + i * n + j, b = base + i * n + j1, c = base + (i + 1) * n + j1, d = base + (i + 1) * n + j;
            this.i.push(a, b, c, a, c, d);
        }
        if (closed) for (const [i, on, s] of [[0, capStart, -1], [R - 1, capEnd, 1]]) if (on) {
            const c = centre[i], nn = mul(unit(sub(centre[Math.min(R - 1, i + 1)], centre[Math.max(0, i - 1)])), s), m = this.vtx(c, nn, col(i, 0));
            const ids = rows[i].map((p, j) => this.vtx(p, nn, col(i, j)));
            for (let j = 0; j < n; j++) this.i.push(m, ids[j], ids[(j + 1) % n]);
        }
        return this;
    }
    /** Tube through `pts` with radius `r(t)` (a number, or [up, side] for an elliptic section), `sides` points
     * round it; the section keeps its up direction along a planar spine, so a body stays upright. */
    tube(pts, r, sides, color, { capStart = false, capEnd = true, up = [0, 1, 0] } = {}) {
        sides = this.n(sides, 3);
        const N = pts.length, T = pts.map((p, i) => unit(sub(pts[Math.min(N - 1, i + 1)], pts[Math.max(0, i - 1)])));
        let u = sub(up, mul(T[0], dot(up, T[0]))); if (Math.hypot(...u) < 1e-6) u = cross(T[0], [0, 0, 1]); u = unit(u);
        const rows = [];
        for (let i = 0; i < N; i++) {
            u = unit(sub(u, mul(T[i], dot(u, T[i])))); const v = cross(T[i], u), q = typeof r === 'function' ? r(i / (N - 1), i) : r, [a, b] = Array.isArray(q) ? q : [q, q];
            rows.push(Array.from({ length: sides }, (_, j) => { const t = j / sides * TAU; return add(pts[i], add(mul(u, Math.cos(t) * a), mul(v, Math.sin(t) * b))); }));
        }
        return this.surface(rows, color, { capStart, capEnd });
    }
    /** Ellipsoid centred at c with semi-axes ax; `bump(d)` may scale the radius in the direction d. */
    ellipsoid(c, ax, u, w, color, bump = null) {
        u = this.n(u, 5); w = this.n(w, 3); const rows = [];
        for (let j = 1; j < w; j++) { const t = j / w * Math.PI; rows.push(Array.from({ length: u }, (_, i) => { const f = i / u * TAU, d = [Math.cos(f) * Math.sin(t), Math.cos(t), Math.sin(f) * Math.sin(t)], k = bump ? bump(d) : 1; return [c[0] + d[0] * ax[0] * k, c[1] + d[1] * ax[1] * k, c[2] + d[2] * ax[2] * k]; })); }
        rows.unshift(Array.from({ length: u }, () => [c[0], c[1] + ax[1] * (bump ? bump([0, 1, 0]) : 1), c[2]]));
        rows.push(Array.from({ length: u }, () => [c[0], c[1] - ax[1] * (bump ? bump([0, -1, 0]) : 1), c[2]]));
        return this.surface(rows, color);
    }
    /** Flat strip along `pts` with half width `w(t)` across the direction `across(t)`; `fold` raises the edges
     * by that share of the width, as the midrib of a leaf or the gutter of a blade of grass. */
    ribbon(pts, w, across, color, { fold = 0, cols = 2 } = {}) {
        const N = pts.length, rows = [];
        for (let i = 0; i < N; i++) {
            const t = i / (N - 1), half = typeof w === 'function' ? w(t) : w, a = typeof across === 'function' ? across(t, i) : across, T = unit(sub(pts[Math.min(N - 1, i + 1)], pts[Math.max(0, i - 1)])), lift = unit(cross(a, T));
            rows.push(Array.from({ length: cols + 1 }, (_, j) => { const s = -1 + 2 * j / cols; return add(add(pts[i], mul(a, s * half)), mul(lift, Math.abs(s) * half * fold)); }));
        }
        return this.surface(rows, color, { closed: false });
    }
    mesh() { return { v: new Float32Array(this.v), i: new Uint32Array(this.i), stride: 12 }; }
}
/** Points of a smooth curve through control points (Catmull-Rom), `n` per span. */
export function curve(ctrl, n = 3) {
    if (ctrl.length < 3) { const out = []; for (let k = 0; k <= n; k++) out.push(V3.lerp(ctrl[0], ctrl[1], k / n)); return out; }
    const P = i => ctrl[Math.max(0, Math.min(ctrl.length - 1, i))], out = [];
    for (let i = 0; i + 1 < ctrl.length; i++) for (let k = 0; k < n; k++) {
        const t = k / n, t2 = t * t, t3 = t2 * t, a = P(i - 1), b = P(i), c = P(i + 1), d = P(i + 2);
        out.push([0, 1, 2].map(q => .5 * (2 * b[q] + (-a[q] + c[q]) * t + (2 * a[q] - 5 * b[q] + 4 * c[q] - d[q]) * t2 + (-a[q] + 3 * b[q] - 3 * c[q] + d[q]) * t3)));
    }
    out.push(ctrl[ctrl.length - 1]);
    return out;
}
/** Smooth step of a profile through (t, value) pairs, linear between them. */
export function profile(pairs) { return t => { for (let k = 1; k < pairs.length; k++) if (t <= pairs[k][0]) { const [t0, a] = pairs[k - 1], [t1, b] = pairs[k], f = (t - t0) / (t1 - t0 || 1), s = f * f * (3 - 2 * f); return a + (b - a) * s; } return pairs[pairs.length - 1][1]; }; }
/** Deterministic value in [0, 1) from two numbers, for irregular outlines. */
export const noise = (a, b = 0) => { const s = Math.sin(a * 127.1 + b * 311.7) * 43758.5453; return s - Math.floor(s); };
