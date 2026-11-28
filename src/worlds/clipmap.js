/** Ground of a landing surface streamed around the camera (1.70.0). Six nested square grids of 128 × 128 cells,
 * 1, 2, 4, 8, 16 and 32 units apart, are centred on the point the camera looks at; each covers twice the side
 * of the one inside it and leaves a hole where that one lies, so the ground is detailed under the explorer and
 * coarser towards the horizon, up to 2048 units away, wherever it walks in the zone of the landing site. The
 * heights are those of the surface (heightAt, src/worlds/surface.js): inside the square of the stations the
 * graded grid with streets and pads, beyond it the field of the planet. The finest grid samples whole units,
 * as the grid of the stations, so there it reproduces the earlier ground exactly. Points are cached in a
 * window per level that wraps round (a toroidal array), so moving by a few units computes only the new rows.
 * The outer edge of every grid is set on the straight lines of the coarser one, with no cracks between them.
 * Since 1.71.0 the colour and roughness of a point come from the biomes of the field (field.colour); since
 * 1.74.0 the relief of the rare places (reliefAt, src/worlds/wonders.js) is added to the heights of the field.
 * Since 1.77.0 a level computes only the points its triangles use, leaving out those inside the hole of the
 * level within it, and the first build of the outer levels may wait: update leaves them pending and fill builds
 * them a few rows at a time within a budget of milliseconds, from the inside out, so a surface opens sooner. */
import { colorAt } from './terrain.js';
import { CORE, stitch } from './field.js';

export const LEVELS = 6, CELLS = 128;
/** Half side covered by level k, and the reach of the whole ground from its centre. */
export const half = k => CELLS / 2 * 2 ** k;
export const REACH = half(LEVELS - 1);
const M = CELLS + 3, FLOATS = 16;
const mod = (a, m) => ((a % m) + m) % m;

/** One level: its spacing, its centre, the cache of heights and of vertex records, and its last mesh. */
function level(k) {
    return { k, step: 2 ** k, centre: null, mesh: null, heights: new Float32Array(M * M * 3), hTag: new Int32Array(M * M * 2).fill(0x7fffffff), rec: new Float32Array(M * M * FLOATS), rTag: new Int32Array(M * M * 2).fill(0x7fffffff), v: null };
}
/** Centre of level k for a focus at (x, z): a multiple of twice its spacing, so its edges fall on the grid
 * lines of the next level. */
export function centreOf(k, x, z) { const s = 2 * 2 ** k; return [Math.round(x / s) * s, Math.round(z / s) * s]; }

export class GroundClipmap {
    /** `s` is a landing surface: heightAt, field (E, lava, sea), genome. */
    constructor(s) {
        this.s = s; this.levels = Array.from({ length: LEVELS }, (_, k) => level(k)); this.samples = 0; this.built = 0; this.pending = new Set();
        const g = s.genome, F = s.field, h = CORE / 2, n = s.n, grid = s.cell === 1 && s.fieldGrid ? s.fieldGrid : null;
        this.rough = .88 - .3 * (g.family === 'arctic');
        // Height, height of the field for the colour and lava at a point of the lattice of level L. Inside the
        // square of the stations the points are those of its grid (whole units); outside, the field is read
        // once for the height and the colour.
        this.point = (L, a, b) => {
            const i = mod(a, M) + mod(b, M) * M;
            if (L.hTag[i * 2] !== a || L.hTag[i * 2 + 1] !== b) {
                const x = a * L.step, z = b * L.step, H = L.heights;
                if (Math.abs(x) <= h && Math.abs(z) <= h) { const k = (z + h) * n + (x + h); H[i * 3] = grid ? s.heights[k] : s.heightAt(x, z); H[i * 3 + 1] = grid ? grid[k] : F.E(x, z); H[i * 3 + 2] = s.lavaAt ? s.lavaAt(x, z) : 0; }
                else { const e = F.E(x, z), y = (e - F.sea) * F.S; H[i * 3] = s.reliefAt ? y + s.reliefAt(x, z, y) : y; H[i * 3 + 1] = e; H[i * 3 + 2] = F.lava(x, z); }
                L.hTag[i * 2] = a; L.hTag[i * 2 + 1] = b; this.samples++;
            }
            return i;
        };
    }
    /** Vertex record of the lattice point (a, b) of level L: position, normal from the neighbours, texture
     * coordinates of the square of the stations, colour and PBR, as in the mesh of the surface. */
    record(L, a, b) {
        const i = mod(a, M) + mod(b, M) * M, o = i * FLOATS;
        if (L.rTag[i * 2] === a && L.rTag[i * 2 + 1] === b) return o;
        const H = L.heights, p = this.point(L, a, b), y = H[p * 3], h = k => H[k * 3], s = L.step, g = this.s.genome, F = this.s.field;
        const hx = (h(this.point(L, a + 1, b)) - h(this.point(L, a - 1, b))) / (2 * s), hz = (h(this.point(L, a, b + 1)) - h(this.point(L, a, b - 1))) / (2 * s);
        const l = Math.hypot(hx, 1, hz), slope = Math.min(1, Math.hypot(hx, hz) * .9), lava = H[p * 3 + 2], x = a * s, z = b * s, c = F.colour ? F.colour(x, z, H[p * 3 + 1], slope, lava) : colorAt(g, H[p * 3 + 1], F.sea, slope, 0, lava);
        const R = L.rec; R[o] = x; R[o + 1] = y; R[o + 2] = z; R[o + 3] = -hx / l; R[o + 4] = 1 / l; R[o + 5] = -hz / l; R[o + 6] = x / CORE + .5; R[o + 7] = z / CORE + .5;
        R[o + 8] = Math.pow(c[0], 1.6); R[o + 9] = Math.pow(c[1], 1.6); R[o + 10] = Math.pow(c[2], 1.6); R[o + 11] = 1; R[o + 12] = 0; R[o + 13] = c[3] ?? this.rough; R[o + 14] = lava > .3 ? .9 : 0; R[o + 15] = 1;
        L.rTag[i * 2] = a; L.rTag[i * 2 + 1] = b;
        return o;
    }
    /** Vertices of level L around its centre: (CELLS + 1)² records, but those whose four cells all lie in the
     * hole of the level within it, which no triangle uses (1.77.0); on the outer edge of every level but the last
     * the points between two points of the coarser grid are set on the line between them. With a deadline
     * (performance.now) the rows stop when it passes and go on from L.row at the next call; null until done. */
    vertices(L, deadline = Infinity) {
        const n = CELLS + 1, v = L.v ||= new Float32Array(n * n * FLOATS), [cx, cz] = L.centre, a0 = cx / L.step - CELLS / 2, b0 = cz / L.step - CELLS / 2;
        const inner = L.k ? this.levels[L.k - 1] : null, h = inner?.centre ? half(inner.k) - L.step / 2 - 1e-9 : -1, [ix, iz] = inner?.centre || [0, 0];
        for (let j = L.row || 0; j < n; j++) {
            if (deadline < Infinity && j > (L.row || 0) && performance.now() > deadline) { L.row = j; return null; }
            const inRow = Math.abs(cz + (j - CELLS / 2) * L.step - iz) < h;
            for (let i = 0; i < n; i++) { if (inRow && Math.abs(cx + (i - CELLS / 2) * L.step - ix) < h) continue; const o = this.record(L, a0 + i, b0 + j); v.set(L.rec.subarray(o, o + FLOATS), (j * n + i) * FLOATS); }
        }
        L.row = 0; L.hole = inner?.centre ? [ix, iz] : null;
        if (L.k < LEVELS - 1) {
            const Y = this.edge ||= new Float32Array(n * n); for (let k = 0; k < n * n; k++) Y[k] = v[k * FLOATS + 1];
            for (const edge of [k => k, k => (n - 1) * n + k, k => k * n, k => k * n + n - 1]) stitch(Y, n, L.step, 2 * L.step, edge);
            for (let k = 0; k < n * n; k++) v[k * FLOATS + 1] = Y[k];
        }
        return v;
    }
    /** After the level within L moved and L did not: the points left out inside the old hole that now lie
     * outside the new one get their records, a strip along the side of the hole (1.77.0). */
    uncover(L) {
        const inner = this.levels[L.k - 1], h = half(inner.k) - L.step / 2 - 1e-9, [ox, oz] = L.hole, [ix, iz] = inner.centre, n = CELLS + 1, [cx, cz] = L.centre, a0 = cx / L.step - CELLS / 2, b0 = cz / L.step - CELLS / 2;
        const j0 = Math.max(0, Math.ceil((oz - h - cz) / L.step + CELLS / 2)), j1 = Math.min(n - 1, Math.floor((oz + h - cz) / L.step + CELLS / 2)), i0 = Math.max(0, Math.ceil((ox - h - cx) / L.step + CELLS / 2)), i1 = Math.min(n - 1, Math.floor((ox + h - cx) / L.step + CELLS / 2));
        for (let j = j0; j <= j1; j++) {
            const z = cz + (j - CELLS / 2) * L.step, wasRow = Math.abs(z - oz) < h, inRow = Math.abs(z - iz) < h; if (!wasRow) continue;
            for (let i = i0; i <= i1; i++) { const x = cx + (i - CELLS / 2) * L.step; if (Math.abs(x - ox) >= h || (inRow && Math.abs(x - ix) < h)) continue; const o = this.record(L, a0 + i, b0 + j); L.v.set(L.rec.subarray(o, o + FLOATS), (j * n + i) * FLOATS); }
        }
        // The edge of the level is the same: the stitched heights there do not change.
        L.hole = [ix, iz];
    }
    /** Triangles of level L: every cell of its grid but those inside the level within it. */
    indices(L) {
        const n = CELLS + 1, inner = L.k ? this.levels[L.k - 1] : null, out = L.idx ||= new Uint32Array(CELLS * CELLS * 6), [cx, cz] = L.centre, h = inner ? half(inner.k) : 0;
        let q = 0;
        for (let j = 0; j < CELLS; j++) for (let i = 0; i < CELLS; i++) {
            if (inner) { const x = cx + (i - CELLS / 2 + .5) * L.step, z = cz + (j - CELLS / 2 + .5) * L.step; if (Math.abs(x - inner.centre[0]) < h && Math.abs(z - inner.centre[1]) < h) continue; }
            const a = j * n + i; out[q++] = a; out[q++] = a + n; out[q++] = a + 1; out[q++] = a + 1; out[q++] = a + n; out[q++] = a + n + 1;
        }
        return out.subarray(0, q);
    }
    /** Moves the levels to the focus (x, z). Returns the levels whose mesh changed: those that moved, and the
     * level outside each of them, whose hole moved and may need points it left out. Levels from `eager` out that
     * have never been built wait for fill (1.77.0); a pending level that moves starts again. */
    update(x, z, eager = LEVELS) {
        const moved = new Set(), out = [];
        for (const L of this.levels) { const c = centreOf(L.k, x, z); if (!L.centre || L.centre[0] !== c[0] || L.centre[1] !== c[1]) { L.centre = c; moved.add(L.k); } }
        const changed = new Set(); for (const k of moved) { changed.add(k); if (k + 1 < LEVELS) changed.add(k + 1); }
        for (const k of [...changed].sort((a, b) => a - b)) {
            const L = this.levels[k];
            if (this.pending.has(k) || (k >= eager && !L.mesh)) { this.pending.add(k); L.row = 0; continue; }
            if (moved.has(k) || !L.v || !L.hole) this.vertices(L); else this.uncover(L);
            L.mesh = { v: L.v, i: this.indices(L), stride: FLOATS }; this.built++; out.push(k);
        }
        return out;
    }
    /** Builds the pending levels, from the inside out, until `ms` milliseconds have passed. Returns those done. */
    fill(ms) {
        const out = [], deadline = performance.now() + ms;
        for (const k of [...this.pending].sort((a, b) => a - b)) {
            const L = this.levels[k], v = this.vertices(L, deadline); if (!v) break;
            L.mesh = { v, i: this.indices(L), stride: FLOATS }; this.built++; this.pending.delete(k); out.push(k);
            if (performance.now() > deadline) break;
        }
        return out;
    }
}
