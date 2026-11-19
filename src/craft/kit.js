/** Mesh kit for the stations and ships of the star systems. Every model is built in code from primitives,
 * so the site downloads no geometry. Meshes use the 16-float vertex of src/renderer.js: position, normal,
 * uv, colour, then PBR (metal, roughness, emission, kind). Kind 4 is the hull shading of material 10
 * without the ground grain. Colours come from the style (src/craft/styles.js). */
import { seededRandom } from '../scene/layout.js';

export const TAU = Math.PI * 2;
export const WHITE = [1, 1, 1, 1], RED = [1, .22, .18, 1], GREEN = [.25, 1, .45, 1], AMBER = [1, .7, .25, 1];
/** Deterministic value in [0, 1) from up to three numbers. */
export const hash = (a, b = 0, c = 0) => { const s = Math.sin(a * 127.1 + b * 311.7 + c * 74.7) * 43758.5453; return s - Math.floor(s); };
/** Random source of one model: numbers, integers, choices and coin flips from a seed. */
export function dice(seed, nth = 0) {
    const next = seededRandom(seed), notes = [];
    const d = { next, notes, range: (a, b) => a + (b - a) * next(), int: (a, b) => a + Math.floor(next() * (b - a + 1)), pick: list => list[Math.floor(next() * list.length)], chance: p => next() < p };
    // Structural choices are also written down: the list is the recipe of the model.
    d.choose = (name, list) => { const v = d.pick(list); notes.push(name + ': ' + v); return v; };
    d.count = (name, a, b) => { const v = d.int(a, b); notes.push(name + ': ' + v); return v; };
    // The main layout of a type cycles with the instance number, so every layout appears equally often.
    d.cycle = (name, list) => { const v = list[nth % list.length]; notes.push(name + ': ' + v); return v; };
    d.flag = (name, p) => { const v = d.chance(p); notes.push(name + ': ' + (v ? 'sì' : 'no')); return v; };
    return d;
}

// 3 × 4 affine frames: rotation (Ry · Rx · Rz) and translation. Sizes are passed to the primitives.
function rotation(rx = 0, ry = 0, rz = 0) {
    const [a, b, c, d, e, f] = [Math.cos(rx), Math.sin(rx), Math.cos(ry), Math.sin(ry), Math.cos(rz), Math.sin(rz)];
    return m3([c, 0, d, 0, 1, 0, -d, 0, c], m3([1, 0, 0, 0, a, -b, 0, b, a], [e, -f, 0, f, e, 0, 0, 0, 1]));
}
function m3(A, B) { const o = []; for (let r = 0; r < 3; r++) for (let k = 0; k < 3; k++) o.push(A[r * 3] * B[k] + A[r * 3 + 1] * B[3 + k] + A[r * 3 + 2] * B[6 + k]); return o; }
const apply = (F, p) => { const R = F.R; return [R[0] * p[0] + R[1] * p[1] + R[2] * p[2] + F.t[0], R[3] * p[0] + R[4] * p[1] + R[5] * p[2] + F.t[1], R[6] * p[0] + R[7] * p[1] + R[8] * p[2] + F.t[2]]; };
const turn = (F, n) => { const R = F.R; return [R[0] * n[0] + R[1] * n[1] + R[2] * n[2], R[3] * n[0] + R[4] * n[1] + R[5] * n[2], R[6] * n[0] + R[7] * n[1] + R[8] * n[2]]; };
export const sub = (a, b) => a.map((v, i) => v - b[i]), add = (a, b) => a.map((v, i) => v + b[i]), scale = (a, s) => a.map(v => v * s);
export const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
export const unit = a => { const l = Math.hypot(...a) || 1; return a.map(v => v / l); };
const shade = (c, k) => [c[0] * k, c[1] * k, c[2] * k, c[3] ?? 1];

/** Mesh builder with a frame stack, a current colour, current PBR values and the running lights. */
export class Kit {
    constructor(style) {
        this.style = style; this.v = []; this.i = []; this.F = { R: rotation(), t: [0, 0, 0] }; this.stack = []; this.lights = [];
        this.color = style.hull; this.pbr = [.55, .5, 0, 4];
    }
    push(t = [0, 0, 0], r = [0, 0, 0]) { this.stack.push(this.F); const C = { R: rotation(...r), t }; this.F = { R: m3(this.F.R, C.R), t: apply(this.F, C.t) }; return this; }
    pop() { this.F = this.stack.pop(); return this; }
    paint(color, metal = .55, rough = .5, glow = 0) { this.color = color; this.pbr = [metal, rough, glow, 4]; return this; }
    hull() { return this.paint(this.style.hull, .5, .5); }
    dark() { return this.paint(this.style.dark, .6, .55); }
    steel() { return this.paint(this.style.steel, .7, .4); }
    trim() { return this.paint(this.style.trim, .85, .35); }
    accent(glow = .35) { return this.paint(this.style.accent, .3, .45, glow); }
    glass(glow = .3) { return this.paint(this.style.glass, .9, .08, glow); }
    glow(color, level = 2) { return this.paint(color, 0, .45, level); }
    vertex(p, n, u = 0, w = 0, color = this.color) {
        const q = apply(this.F, p), m = unit(turn(this.F, n));
        this.v.push(q[0], q[1], q[2], m[0], m[1], m[2], u, w, color[0], color[1], color[2], color[3] ?? 1, ...this.pbr);
        return this.v.length / 16 - 1;
    }
    /** Flat quad a, b, c, d, counter-clockwise seen from the side it faces. */
    quad(a, b, c, d, color = this.color) {
        const n = unit(cross(sub(b, a), sub(d, a)));
        const k = [this.vertex(a, n, 0, 0, color), this.vertex(b, n, 1, 0, color), this.vertex(c, n, 1, 1, color), this.vertex(d, n, 0, 1, color)];
        this.i.push(k[0], k[1], k[2], k[0], k[2], k[3]);
    }
    tri(a, b, c, color = this.color) { const n = unit(cross(sub(b, a), sub(c, a))); this.i.push(this.vertex(a, n, 0, 0, color), this.vertex(b, n, 1, 0, color), this.vertex(c, n, 0, 1, color)); }
    /** Box centred at c with half sizes h. With `plates` each face is covered by inset panels of slightly
     * different tints over a dark base, so the seams read as shadowed lines; `greebles` adds small boxes. */
    box(c, h, plates = 0, greebles = 0) {
        const [x, y, z] = c, [a, b, d] = h, P = [[x - a, y - b, z - d], [x + a, y - b, z - d], [x + a, y + b, z - d], [x - a, y + b, z - d], [x - a, y - b, z + d], [x + a, y - b, z + d], [x + a, y + b, z + d], [x - a, y + b, z + d]];
        const faces = [[1, 0, 3, 2], [4, 5, 6, 7], [0, 4, 7, 3], [5, 1, 2, 6], [3, 7, 6, 2], [0, 1, 5, 4]], base = this.color;
        for (const [fi, f] of faces.entries()) {
            const [A, B, , D] = f.map(k => P[k]);
            if (!plates) { this.quad(P[f[0]], P[f[1]], P[f[2]], P[f[3]]); continue; }
            this.quad(P[f[0]], P[f[1]], P[f[2]], P[f[3]], shade(base, .32));
            const U = sub(B, A), V = sub(D, A), lu = Math.hypot(...U), lv = Math.hypot(...V), nu = Math.max(1, Math.round(lu / plates)), nv = Math.max(1, Math.round(lv / plates));
            const n = unit(cross(U, V)), off = scale(n, .012), gu = Math.min(.035, lu / nu * .12) / lu, gv = Math.min(.035, lv / nv * .12) / lv;
            for (let i = 0; i < nu; i++) for (let j = 0; j < nv; j++) {
                const p = (s, t) => add(off, add(A, add(scale(U, s), scale(V, t))));
                const s0 = i / nu + gu, s1 = (i + 1) / nu - gu, t0 = j / nv + gv, t1 = (j + 1) / nv - gv;
                this.quad(p(s0, t0), p(s1, t0), p(s1, t1), p(s0, t1), shade(base, .74 + .36 * hash(i + fi * 13, j, x + y * 3 + z * 7)));
            }
            const count = Math.round(greebles * lu * lv);
            for (let g = 0; g < count; g++) {
                const r = q => hash(g * 7 + q, fi * 17 + x * 3, y * 5 + z * 11), du = .04 + .14 * r(3), dv = .04 + .14 * r(4), dh = .02 + .07 * r(5);
                const o = add(add(A, add(scale(U, .1 + .8 * r(1)), scale(V, .1 + .8 * r(2)))), scale(n, dh + .012)), eu = unit(U), ev = unit(V);
                const corners = [[-1, -1], [1, -1], [1, 1], [-1, 1]].map(([s, t]) => add(o, add(scale(eu, s * du), scale(ev, t * dv))));
                const col = r(6) < .5 ? shade(base, .45) : shade(base, 1.1), down = scale(n, -dh);
                this.quad(...corners, col);
                for (let e = 0; e < 4; e++) { const a2 = corners[e], b2 = corners[(e + 1) % 4]; this.quad(add(a2, down), add(b2, down), b2, a2, col); }
            }
        }
    }
    /** Frustum along y from y0 (radius r0) to y1 (radius r1). `bands` adds plated rings with seams. */
    cyl(r0, r1, y0, y1, seg = 24, { caps = true, bands = 0, outward = true, start = 0 } = {}) {
        const s = outward ? 1 : -1, slope = (r0 - r1) / (y1 - y0 || 1), base = this.color, rows = Math.max(1, bands), seams = bands > 0 && outward;
        const P = (a, y, r) => [Math.cos(a) * r, y, Math.sin(a) * r], N = a => unit([Math.cos(a) * s, slope * s, Math.sin(a) * s]);
        const strip = (a0, a1, ya, yb, ra, rb, col) => {
            const i0 = this.vertex(P(a0, ya, ra), N(a0), 0, 0, col), i1 = this.vertex(P(a1, ya, ra), N(a1), 1, 0, col), i2 = this.vertex(P(a1, yb, rb), N(a1), 1, 1, col), i3 = this.vertex(P(a0, yb, rb), N(a0), 0, 1, col);
            if (outward) this.i.push(i0, i2, i1, i0, i3, i2); else this.i.push(i0, i1, i2, i0, i2, i3);
        };
        const per = seams ? Math.max(1, Math.round(seg / Math.max(6, Math.round(TAU * Math.max(r0, r1) / .9)))) : 1, R = Math.max(r0, r1, .01);
        for (let k = 0; k < seg; k++) {
            const a0 = start + k / seg * TAU, a1 = start + (k + 1) / seg * TAU;
            for (let j = 0; j < rows; j++) {
                const ya = y0 + (y1 - y0) * j / rows, yb = y0 + (y1 - y0) * (j + 1) / rows, ra = r0 + (r1 - r0) * j / rows, rb = r0 + (r1 - r0) * (j + 1) / rows;
                if (!seams) { strip(a0, a1, ya, yb, ra, rb, base); continue; }
                strip(a0, a1, ya, yb, ra, rb, shade(base, .32));
                const ga = k % per === 0 ? .025 / R : 0, gb = (k + 1) % per === 0 ? .025 / R : 0, gy = Math.min(.03, Math.abs(yb - ya) * .12) * Math.sign(yb - ya);
                strip(a0 + ga, a1 - gb, ya + gy, yb - gy, ra + .012, rb + .012, shade(base, .74 + .36 * hash(Math.floor(k / per), j, r0 * 9 + y0)));
            }
        }
        if (caps) for (const [y, r, n] of [[y0, r0, -1], [y1, r1, 1]]) {
            if (r <= 0) continue;
            const c = this.vertex([0, y, 0], [0, n, 0]);
            for (let k = 0; k < seg; k++) {
                const a0 = start + k / seg * TAU, a1 = start + (k + 1) / seg * TAU, p = this.vertex(P(a0, y, r), [0, n, 0]), q = this.vertex(P(a1, y, r), [0, n, 0]);
                if (n > 0) this.i.push(c, q, p); else this.i.push(c, p, q);
            }
        }
    }
    /** Torus in the xz plane: major radius R, tube radius r, optionally only an arc of the ring (arc,
     * start) or a band of the tube (b0 to b1, measured from the outer equator towards +y). */
    torus(R, r, seg = 48, sides = 12, arc = TAU, start = 0, b0 = 0, b1 = TAU) {
        const base = this.v.length / 16;
        for (let k = 0; k <= seg; k++) for (let j = 0; j <= sides; j++) {
            const a = start + k / seg * arc, b = b0 + j / sides * (b1 - b0), n = [Math.cos(a) * Math.cos(b), Math.sin(b), Math.sin(a) * Math.cos(b)];
            this.vertex([Math.cos(a) * (R + r * Math.cos(b)), r * Math.sin(b), Math.sin(a) * (R + r * Math.cos(b))], n, k / seg, j / sides);
        }
        for (let k = 0; k < seg; k++) for (let j = 0; j < sides; j++) { const a = base + k * (sides + 1) + j, b = a + sides + 1; this.i.push(a, a + 1, b + 1, a, b + 1, b); }
    }
    /** Sphere, or the zone between polar angles t0 and t1, with optional per-vertex displacement. */
    sphere(c, r, u = 18, w = 12, t0 = 0, t1 = Math.PI, bump = null) {
        const base = this.v.length / 16;
        for (let j = 0; j <= w; j++) for (let k = 0; k <= u; k++) {
            const t = t0 + (t1 - t0) * j / w, a = k / u * TAU, n = [Math.cos(a) * Math.sin(t), Math.cos(t), Math.sin(a) * Math.sin(t)], rr = bump ? r * bump(n, k % u, j) : r;
            this.vertex(add(c, scale(n, rr)), n, k / u, j / w);
        }
        for (let j = 0; j < w; j++) for (let k = 0; k < u; k++) { const a = base + j * (u + 1) + k, b = a + u + 1; this.i.push(a, b, a + 1, a + 1, b, b + 1); }
    }
    /** Capsule along y: cylinder of radius r from y0 to y1 with hemispherical ends. */
    capsule(r, y0, y1, seg = 20, bands = 0) {
        this.cyl(r, r, y0, y1, seg, { caps: false, bands });
        this.sphere([0, y1, 0], r, seg, Math.max(4, seg / 4), 0, Math.PI / 2); this.sphere([0, y0, 0], r, seg, Math.max(4, seg / 4), Math.PI / 2, Math.PI);
    }
    /** Thin square beam from a to b. */
    beam(a, b, w = .06) {
        const d = unit(sub(b, a)), u = unit(cross(d, Math.abs(d[1]) < .9 ? [0, 1, 0] : [1, 0, 0])), v = cross(d, u);
        const c = (p, su, sv) => add(p, add(scale(u, su * w), scale(v, sv * w))), A = [c(a, -1, -1), c(a, 1, -1), c(a, 1, 1), c(a, -1, 1)], B = [c(b, -1, -1), c(b, 1, -1), c(b, 1, 1), c(b, -1, 1)];
        for (let k = 0; k < 4; k++) { const l = (k + 1) % 4; this.quad(A[k], A[l], B[l], B[k]); }
    }
    /** Square truss from a to b: four longerons, rings and diagonals. */
    truss(a, b, half = .45, step = 1.2, w = .05) {
        const d = unit(sub(b, a)), u = unit(cross(d, Math.abs(d[1]) < .9 ? [0, 1, 0] : [1, 0, 0])), v = cross(d, u), L = Math.hypot(...sub(b, a)), n = Math.max(1, Math.round(L / step));
        const corner = (p, k) => add(p, add(scale(u, (k === 0 || k === 3 ? -1 : 1) * half), scale(v, (k < 2 ? -1 : 1) * half)));
        for (let k = 0; k < 4; k++) this.beam(corner(a, k), corner(b, k), w);
        for (let s = 0; s <= n; s++) {
            const p = add(a, scale(d, L * s / n)), q = add(a, scale(d, L * Math.min(n, s + 1) / n));
            for (let k = 0; k < 4; k++) { this.beam(corner(p, k), corner(p, (k + 1) % 4), w * .8); if (s < n) this.beam(corner(p, k), corner(q, (k + 1) % 4), w * .6); }
        }
    }
    /** Paraboloid dish opening towards +y, radius R and depth D, both faces. */
    dish(R, D, seg = 40, rings = 10) {
        for (const side of [1, -1]) {
            const base = this.v.length / 16, off = side > 0 ? 0 : -.05 * R / 4;
            for (let j = 0; j <= rings; j++) for (let k = 0; k <= seg; k++) {
                const r = R * j / rings, a = k / seg * TAU, slope = 2 * D * r / (R * R), n = unit([-Math.cos(a) * slope * side, side, -Math.sin(a) * slope * side]);
                this.vertex([Math.cos(a) * r, D * (r / R) ** 2 + off, Math.sin(a) * r], n, k / seg, j / rings, shade(this.color, .92 + .1 * hash(Math.floor(k / 4), j)));
            }
            for (let j = 0; j < rings; j++) for (let k = 0; k < seg; k++) {
                const a = base + j * (seg + 1) + k, b = a + seg + 1;
                if (side > 0) this.i.push(a, a + 1, b + 1, a, b + 1, b); else this.i.push(a, b + 1, a + 1, a, b, b + 1);
            }
        }
    }
    /** Hull lofted through sections { z, pts: [[x, y], ...] } with the same point count, counter-clockwise
     * seen from +z. `paint(mid, section, edge)` may return the colour of one quad. */
    loft(sections, { closeFront = true, closeBack = true, paint = null } = {}) {
        const n = sections[0].pts.length;
        for (let s = 0; s + 1 < sections.length; s++) {
            const A = sections[s], B = sections[s + 1];
            for (let k = 0; k < n; k++) {
                const l = (k + 1) % n, P = (S, i) => [S.pts[i][0], S.pts[i][1], S.z];
                this.quad(P(A, k), P(B, k), P(B, l), P(A, l), paint ? paint(A.pts[k], s, k) || this.color : this.color);
            }
        }
        const cap = (S, front) => { const c = [S.pts.reduce((t, p) => t + p[0], 0) / n, S.pts.reduce((t, p) => t + p[1], 0) / n, S.z]; for (let k = 0; k < n; k++) { const l = (k + 1) % n, a = [S.pts[k][0], S.pts[k][1], S.z], b = [S.pts[l][0], S.pts[l][1], S.z]; if (front) this.tri(c, a, b); else this.tri(c, b, a); } };
        if (closeFront) cap(sections[0], sections[0].z > sections.at(-1).z);
        if (closeBack) cap(sections.at(-1), sections.at(-1).z > sections[0].z);
    }
    /** Flat plate: convex polygon in the xz plane, from y0 to y1. */
    extrude(poly, y0, y1) {
        const [x0, z0] = poly[0], [x1, z1] = poly[1], [x2, z2] = poly[2];
        if ((z2 - z0) * (x1 - x0) - (x2 - x0) * (z1 - z0) < 0) poly = [...poly].reverse();
        const n = poly.length, top = poly.map(([x, z]) => [x, y1, z]), bot = poly.map(([x, z]) => [x, y0, z]);
        for (let k = 1; k + 1 < n; k++) { this.tri(top[0], top[k + 1], top[k]); this.tri(bot[0], bot[k], bot[k + 1]); }
        for (let k = 0; k < n; k++) { const l = (k + 1) % n; this.quad(bot[l], bot[k], top[k], top[l]); }
    }
    /** Running light: a small glowing sphere here and a halo drawn by the scene. Positive `blink` is a
     * frequency in hertz, negative a phase in a chase sequence, zero a steady light. */
    light(p, color, size = .12, blink = 0) {
        const keep = [this.color, this.pbr];
        this.paint(color, 0, .4, 4); this.sphere(p, size * .45, 8, 6);
        [this.color, this.pbr] = keep;
        this.lights.push({ p: apply(this.F, p), color, size, blink });
    }
    /** Engine or flare glow drawn by the scene only. */
    flame(p, color, size = .6) { this.lights.push({ p: apply(this.F, p), color, size, blink: 0, flame: 1 }); }
    /** Row of lit windows along +x from p. */
    windows(p, n, gap = .3, w = .14, h = .08, color = this.style.window, depth = .02) {
        const keep = [this.color, this.pbr];
        this.paint(color, 0, .4, 2.2);
        for (let k = 0; k < n; k++) if (hash(k, p[0] * 5 + p[1], p[2]) > .18) this.box([p[0] + k * gap, p[1], p[2]], [w / 2, h / 2, depth]);
        [this.color, this.pbr] = keep;
    }
    /** Flat glowing pane centred at c, facing n, long side along t: windows drawn with two triangles. */
    pane(c, n, t, w, h, color = this.style.window, glow = 2.2) {
        const b = cross(n, t), o = add(c, scale(n, .012)), keep = [this.color, this.pbr];
        this.glow(color, glow);
        const p = (s, q) => add(o, add(scale(t, s * w / 2), scale(b, q * h / 2)));
        this.quad(p(-1, -1), p(1, -1), p(1, 1), p(-1, 1));
        [this.color, this.pbr] = keep;
    }
    mesh() { return { v: new Float32Array(this.v), i: new Uint32Array(this.i), stride: 16 }; }
}

/** Hull section: superellipse of half width w and half height h centred at height cy, n points. */
export const section = (z, w, h, cy = 0, n = 16, e = 2.6) => ({ z, pts: Array.from({ length: n }, (_, k) => { const a = -Math.PI / 2 + k / n * TAU, c = Math.cos(a), s = Math.sin(a); return [Math.sign(c) * Math.abs(c) ** (2 / e) * w, cy + Math.sign(s) * Math.abs(s) ** (2 / e) * h]; }) });
export const mirror = poly => poly.map(([x, z]) => [-x, z]).reverse();

/** A model made of kits: the first is fixed, the others may turn around an axis through the origin. */
export function assemble(kits, field = null) {
    const parts = kits.map(([kit, spin]) => ({ mesh: kit.mesh(), spin: spin || null }));
    const lights = kits.flatMap(([kit], part) => kit.lights.map(l => ({ ...l, p: [...l.p], part })));
    // Models are centred on their bounding box, so their radius is as small as it can be. A part turning
    // around an axis through the origin allows a shift only along that axis; gates keep their ring centred.
    const free = [0, 1, 2].filter(a => !field && parts.every(p => !p.spin || p.spin.every((w, b) => b === a || !w)));
    if (free.length) {
        const lo = [Infinity, Infinity, Infinity], hi = [-Infinity, -Infinity, -Infinity];
        for (const p of parts) for (let i = 0; i < p.mesh.v.length; i += 16) for (let a = 0; a < 3; a++) { lo[a] = Math.min(lo[a], p.mesh.v[i + a]); hi[a] = Math.max(hi[a], p.mesh.v[i + a]); }
        const c = lo.map((v, a) => free.includes(a) ? (v + hi[a]) / 2 : 0);
        for (const m of [...parts.map(p => p.mesh.v), ...(field ? [field.v] : [])]) for (let i = 0; i < m.length; i += 16) for (let a = 0; a < 3; a++) m[i + a] -= c[a];
        for (const l of lights) for (let a = 0; a < 3; a++) l.p[a] -= c[a];
    }
    let radius = 0;
    for (const p of parts) for (let i = 0; i < p.mesh.v.length; i += 16) radius = Math.max(radius, Math.hypot(p.mesh.v[i], p.mesh.v[i + 1], p.mesh.v[i + 2]));
    const triangles = parts.reduce((n, p) => n + p.mesh.i.length / 3, 0) + (field ? field.i.length / 3 : 0);
    return { parts, lights, field: field ? field.mesh() : null, radius, triangles };
}
