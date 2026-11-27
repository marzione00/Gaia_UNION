/** Ground of a planet around its landing site (1.62.0). The height field of the orbit map
 * (sphereTerrain in src/worlds/orbit-texture.js) is read on the plane tangent to the sphere at the landing
 * site, and the local shapes of the terrain style (styleField in src/worlds/terrain.js) are added on top. The
 * landing surface is the piece of the planet seen from orbit: the same seas, coasts, craters and colours,
 * with the fine relief that a map of the whole planet leaves out. Since 1.70.0 the ground is drawn by nested
 * grids that follow the camera (src/worlds/clipmap.js); the half side of the square of the stations, 112, is
 * still a multiple of the spacing of the rings of 1.62.0, so its edges fall on the lines of a 4-unit grid.
 * Since 1.71.0 the zone beyond the square is a mosaic of biomes (src/worlds/biomes.js), with their shapes and
 * colours, on the heights and coasts of the map of the sphere. */
import { sphereTerrain } from './orbit-texture.js';
import { styleField, colorAt } from './terrain.js';
import { biomeMap, biomeColour, biomeWeight, INNER } from './biomes.js';

/** Side of the detailed square in scene units, radians of the sphere per scene unit, and the rings around
 * the square: each doubles the side and the spacing of the one inside it. */
export const CORE = 224, ANGLE = 1.2e-4, RINGS = Object.freeze([4, 8, 16, 32]);
const unit = v => { const l = Math.hypot(v[0], v[1], v[2]) || 1; return [v[0] / l, v[1] / l, v[2] / l]; };
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
/** East and north on the sphere at the unit direction d (d away from the poles). */
export function tangent(d) { const e1 = unit(cross([0, 1, 0], d)); return { e1, e2: cross(d, e1) }; }

/** Landing site: land away from the poles, with dry and gentle ground under the stations. 1500 points evenly
 * spread are scored: on planets with seas the coast is in sight, about a third of the ground being water
 * between 0.02 and 0.13 rad from the point; on dry planets the point looks at relief of about 0.18 in height.
 * On planets with seas the site is then moved, within 0.1 rad of one of the best points, to where the sea
 * comes into the area of the species (±78 units): the ground of the surface, field and local style together,
 * is dry at the stations and at least 2 units under the sea at 5 % to 50 % of a grid of 49 points over the
 * area. Over that area the field of the sphere changes little and the local style decides where the coast
 * runs: when its shapes do not allow such a coast, they are shifted (`offset`, in style units) and the search
 * is repeated. */
export function landingSite(g, T = sphereTerrain(g), style = styleField(g)) {
    const n = 1500, wet = g.terrain.seaLevel > .05, RADII = [.02, .05, .09, .13], found = [], { S, L } = scales(g);
    const ring = (r, off) => [0, 1, 2, 3, 4, 5, 6, 7].map(k => [Math.cos(k * Math.PI / 4 + off) * r, Math.sin(k * Math.PI / 4 + off) * r]);
    // The stations stand around (14, 28) (src/worlds/surface.js); the default view looks at the centre.
    const pads = [[14, 28], ...ring(10, 0).map(([x, z]) => [x + 14, z + 28]), ...ring(18, .4)], area = [];
    for (let z = -78; z <= 78; z += 26) for (let x = -78; x <= 78; x += 26) area.push([x, z]);
    const localOf = offset => (x, z) => (style(x / CORE + .5 + offset[0], z / CORE + .5 + offset[1]) - .5) * L * localWeight(x, z);
    const around = d => { const { e1, e2 } = tangent(d); return (u, v) => T.height(unit([0, 1, 2].map(j => d[j] + (e1[j] * u + e2[j] * v)))); };
    const dryAt = (at, local) => pads.filter(([x, z]) => at(x * ANGLE, z * ANGLE) + local(x, z) > T.sea + 1 / S).length;
    const wetAt = (at, local) => area.filter(([x, z]) => at(x * ANGLE, z * ANGLE) + local(x, z) < T.sea - 2 / S).length / area.length;
    const plain = localOf([0, 0]);
    let high = null, highest = -Infinity;
    for (let i = 0; i < n; i++) {
        const y = 1 - 2 * (i + .5) / n;
        if (Math.abs(y) > .8) continue;
        const s = Math.sqrt(1 - y * y), a = i * Math.PI * (3 - Math.sqrt(5)), d = [Math.cos(a) * s, y, Math.sin(a) * s], h = T.height(d);
        if (h > highest) { highest = h; high = d; }
        if (h <= T.sea) continue;
        const at = around(d), dry = dryAt(at, plain), polar = (r, b) => at(Math.cos(b) * r, Math.sin(b) * r);
        let water = 0, lo = Infinity, hi = -Infinity, rough = 0;
        for (const r of RADII) for (let k = 0; k < 12; k++) { const q = polar(r, k * Math.PI / 6 + r * 7); water += q < T.sea; lo = Math.min(lo, q); hi = Math.max(hi, q); }
        for (let k = 0; k < 4; k++) rough = Math.max(rough, Math.abs(polar(.004, k * Math.PI / 2) - h));
        found.push({ d, score: (wet ? -3 * Math.abs(water / 48 - .3) - 2 * Math.abs(h - T.sea - .04) : -3 * Math.abs(hi - lo - .18)) - 4 * rough - 6 * (1 - dry / pads.length) });
    }
    found.sort((a, b) => b.score - a.score);
    const site = found[0]?.d || high;
    // Near the best points, on a grid 0.005 rad apart: dry at the stations, sea on 5 % to 50 % of the area,
    // as close as possible to a quarter. The plain local style is tried on 16 points, then two shifts on 6.
    if (wet) for (const [offset, count] of [[[0, 0], 16], ...OFFSETS.slice(1, 3).map(o => [o, 6])]) {
        const local = localOf(offset);
        let best = null, bestScore = -Infinity;
        for (const c of found.slice(0, count)) {
            const { e1, e2 } = tangent(c.d);
            for (let v = -.1; v <= .1 + 1e-9; v += .005) for (let u = -.1; u <= .1 + 1e-9; u += .005) {
                const d = unit([0, 1, 2].map(j => c.d[j] + e1[j] * u + e2[j] * v)), at = around(d);
                if (dryAt(at, local) < pads.length) continue;
                const w = wetAt(at, local);
                if (w < .05 || w > .5) continue;
                const score = -Math.abs(w - .25) - Math.hypot(u, v);
                if (score > bestScore) { bestScore = score; best = d; }
            }
            if (bestScore > -.1) break;
        }
        if (best) return { dir: best, offset, ...tangent(best) };
    }
    return { dir: site, offset: [0, 0], ...tangent(site) };
}
/** A site stored as [x, y, z, offset u, offset v] (src/worlds/landing-sites.js), and the other way round. */
export const siteOf = ([x, y, z, u, v]) => { const dir = unit([x, y, z]); return { dir, offset: [u, v], ...tangent(dir) }; };
export const storedSite = site => [...site.dir, ...site.offset].map(v => Math.round(v * 1e6) / 1e6);
/** Weight of the local shapes around the base (1.62.0): 0.35 within 30 units of the middle of the stations
 * and of the default camera, (20, 34), rising to 1 at 80 units, so the camera sees the stations and the
 * horizon over gentle ground; beyond 150 units the shapes fade to a quarter towards the horizon. */
export function localWeight(x, z) {
    const s = t => t * t * (3 - 2 * t), near = Math.max(0, Math.min(1, (Math.hypot(x - 20, z - 34) - 30) / 50)), far = Math.max(0, Math.min(1, (Math.hypot(x, z) - 150) / 450));
    return (.35 + .65 * s(near)) * (1 - .75 * s(far));
}
/** Shifts of the local style tried in turn by landingSite. */
const OFFSETS = Object.freeze([[0, 0], [.5, .5], [1.3, .2], [.2, 1.7], [2.1, 2.6], [3.3, .9], [.9, 3.7], [4.4, 4.1], [5.2, 1.5]]);
/** Vertical scale S, scene units per unit of the field (90 + 90 × relief: 131 to 180 on the 125 cards), and
 * weight L of the local style: the relief of the planet over the rings of the horizon, tens of units for
 * hills and up to a hundred for the cones of volcanoes, and the relief of the previous surfaces, 12 to 24
 * units, for the style. */
function scales(g) { const S = 90 + 90 * g.terrain.relief; return { S, L: (12 + 12 * g.terrain.relief) / S }; }
/** The field of the surface of planet g: E(x, z) on the scale of the orbit map (sea at `sea`), the height
 * Y(x, z) in scene units (sea at 0), the lava mask and the direction on the sphere of a point. The landing
 * site is the stored one when given (src/worlds/landing-sites.js), otherwise it is searched. */
export function surfaceField(g, stored = null) {
    // g is a card of src/worlds/genome.js; its index chooses the biomes of the planet (src/worlds/biomes.js).
    const T = sphereTerrain(g), style = styleField(g), site = stored ? siteOf(stored) : landingSite(g, T, style), { S, L } = scales(g), { dir: d, e1, e2, offset } = site;
    // The local shapes are lower around the base and fade to a quarter between 150 and 600 units, so the
    // coasts of the horizon are those of the orbit map (localWeight).
    const local = (x, z) => (style(x / CORE + .5 + offset[0], z / CORE + .5 + offset[1]) - .5) * L * localWeight(x, z);
    const dir = (x, z) => unit([d[0] + (x * e1[0] + z * e2[0]) * ANGLE, d[1] + (x * e1[1] + z * e2[1]) * ANGLE, d[2] + (x * e1[2] + z * e2[2]) * ANGLE]);
    // Beyond 160 units from the base the biomes take the place of the local style on dry land (1.71.0): the
    // seas and the coasts stay those of the earlier field, map of the sphere and local style, and so does the
    // ground under the sea. The map of the biomes is made the first time a point there is asked for. Over the
    // square of the stations, within 158 units of the base, the ground is the earlier one.
    let map = null;
    const biomes = () => map ||= biomeMap(g, { T, dir, own: (x, z) => style(x / CORE + .5 + offset[0], z / CORE + .5 + offset[1]), S, L });
    const E = (x, z) => {
        const r = Math.hypot(x, z), sv = style(x / CORE + .5 + offset[0], z / CORE + .5 + offset[1]) - .5, near = sv * L * localWeight(x, z), e = T.height(dir(x, z)) + near;
        if (r <= INNER || e <= T.sea) return e;
        return T.sea + biomes().height(x, z, (e - T.sea) * S, biomeWeight(r), sv * L * S, near * S) / S;
    };
    const lava = (x, z) => { const m = T.lava(dir(x, z)), r = Math.hypot(x, z); return r <= INNER ? m : Math.max(m, biomeWeight(r) * biomes().lava(x, z)); };
    /** Ground colour at a point of height e (field units) and slope: the colours of the biomes there, blended
     * with those of the earlier surface near the base; the last value is the roughness. */
    const colour = (x, z, e, slope, lv = 0) => {
        const r = Math.hypot(x, z);
        if (r <= INNER) return colorAt(g, e, T.sea, slope, 0, lv);
        const B = biomes(), w = B.weights(x, z), wb = biomeWeight(r), c = [0, 0, 0]; let rough = 0;
        for (let t = 0; t < B.types.length; t++) if (w[t]) { const b = B.types[t], k = biomeColour(g, b, t === 0, e, T.sea, slope); for (let i = 0; i < 3; i++) c[i] += w[t] * k[i]; rough += w[t] * (b.rough ?? (.88 - .3 * (g.family === 'arctic'))); }
        const near = colorAt(g, e, T.sea, slope, 0, 0), out = near.map((v, i) => v + (c[i] - v) * wb);
        if (lv > 0) for (let i = 0; i < 3; i++) out[i] += ([1, .38, .1][i] - out[i]) * Math.min(1, lv * 1.2);
        out.push(.88 - .3 * (g.family === 'arctic') + (rough - (.88 - .3 * (g.family === 'arctic'))) * wb);
        return out;
    };
    /** The biome with most weight at a point: the planet's own style near the base. */
    const biomeAt = (x, z) => { const B = biomes(); return B.types[biomeWeight(Math.hypot(x, z)) < .5 ? 0 : B.at(x, z)]; };
    return { site, sea: T.sea, S, L, dir, E, Y: (x, z) => (E(x, z) - T.sea) * S, lava, colour, biomes, biomeAt, terrain: T };
}
/** Heights on the edge of a grid of spacing `cell` set on the straight lines between its points `step`
 * apart (a whole multiple of the spacing), so the grid meets the coarser one around it without cracks.
 * `at(k)` is the index of edge point k of `count`. */
export function stitch(Y, count, cell, step, at) {
    const ratio = Math.round(step / cell);
    if (ratio < 2 || Math.abs(ratio * cell - step) > 1e-6 * step) return;
    for (let k = 0; k < count; k++) {
        const a = Math.floor(k / ratio) * ratio, b = Math.min(count - 1, a + ratio);
        if (k === a || b === a) continue;
        Y[at(k)] = Y[at(a)] + (Y[at(b)] - Y[at(a)]) * (k - a) / (b - a);
    }
}
