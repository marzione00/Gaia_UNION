/** Orbit map of an explorable planet, generated from its identity card (src/worlds/genome.js): the terrain
 * style of the landing surface evaluated with 3D noise on the sphere (no seam at the date line, no pinch at
 * the poles), the same sea level as a quantile of the ground and the same colours (colorAt). The alpha
 * channel marks the sea, so the planet material can make it glossy. Values are illustrative. */
import { colorAt } from './terrain.js';
import { seededRandom } from '../scene/systems.js';

function noiseField(seed) {
    const r = seededRandom(seed ^ 0x0B17), perm = new Uint8Array(512);
    for (let i = 0; i < 256; i++) perm[i] = i;
    for (let i = 255; i > 0; i--) { const j = Math.floor(r() * (i + 1)), t = perm[i]; perm[i] = perm[j]; perm[j] = t; }
    for (let i = 0; i < 256; i++) perm[i + 256] = perm[i];
    const fade = t => t * t * (3 - 2 * t);
    const noise = (x, y, z) => {
        const xi = Math.floor(x), yi = Math.floor(y), zi = Math.floor(z), fx = fade(x - xi), fy = fade(y - yi), fz = fade(z - zi);
        const X = xi & 255, Y = yi & 255, Z = zi & 255, A = perm[X] + Y, B = perm[X + 1] + Y;
        const AA = perm[A & 511] + Z, AB = perm[(A + 1) & 511] + Z, BA = perm[B & 511] + Z, BB = perm[(B + 1) & 511] + Z;
        const v = (k) => perm[k & 511] / 255;
        const x00 = v(AA) + (v(BA) - v(AA)) * fx, x10 = v(AB) + (v(BB) - v(AB)) * fx, x01 = v(AA + 1) + (v(BA + 1) - v(AA + 1)) * fx, x11 = v(AB + 1) + (v(BB + 1) - v(AB + 1)) * fx;
        const y0 = x00 + (x10 - x00) * fy, y1 = x01 + (x11 - x01) * fy;
        return y0 + (y1 - y0) * fz;
    };
    const fbm = (x, y, z, o = 5) => { let s = 0, a = .5, f = 1, n = 0; for (let i = 0; i < o; i++) { s += a * noise(x * f + i * 17.1, y * f - i * 9.3, z * f + i * 5.9); n += a; a *= .5; f *= 2.03; } return s / n; };
    const ridged = (x, y, z, o = 5) => { let s = 0, a = .5, f = 1, n = 0; for (let i = 0; i < o; i++) { s += a * (1 - Math.abs(noise(x * f + i * 5.7, y * f + i * 3.1, z * f - i * 2.3) * 2 - 1)) ** 2; n += a; a *= .5; f *= 2.1; } return s / n; };
    return { r, noise, fbm, ridged };
}
const smooth = (a, b, x) => { const t = Math.max(0, Math.min(1, (x - a) / (b - a))); return t * t * (3 - 2 * t); };
const gauss = (d, w) => Math.exp(-(d * d) / (w * w));
const unit = v => { const l = Math.hypot(...v) || 1; return v.map(x => x / l); };
/** Features of the style on the sphere: count and angular radius range (radians). */
const FEATURES = { atollo: [26, .05, .12], crateri: [46, .035, .2], criovulcani: [9, .08, .16], vulcani: [7, .1, .2], caldera: [3, .22, .3] };
function features(r, [count, rmin, rmax]) {
    const out = [];
    for (let k = 0; k < count * 10 && out.length < count; k++) {
        const z = r() * 2 - 1, a = r() * Math.PI * 2, s = Math.sqrt(1 - z * z), f = { d: [Math.cos(a) * s, z, Math.sin(a) * s], R: rmin + r() * (rmax - rmin), k: r() * 50 };
        if (out.every(o => Math.acos(Math.max(-1, Math.min(1, o.d[0] * f.d[0] + o.d[1] * f.d[1] + o.d[2] * f.d[2]))) > (o.R + f.R) * .7 + .03)) out.push(f);
    }
    return out;
}
const angle = (p, d) => Math.acos(Math.max(-1, Math.min(1, p[0] * d[0] + p[1] * d[1] + p[2] * d[2])));

/** Height in [0, 1] of the genome's terrain style at the unit direction p, and the lava mask. */
export function sphereTerrain(g) {
    const t = g.terrain, N = noiseField(t.seed), style = t.style, F = FEATURES[style] ? features(N.r, FEATURES[style]) : [], D = unit([N.r() - .5, N.r() - .5, N.r() - .5]);
    const base = p => {
        const x = p[0] * 2.5, y = p[1] * 2.5, z = p[2] * 2.5, f = N.fbm(x, y, z), warp = N.fbm(x + 4.2, y - 1.3, z + 2.7);
        switch (style) {
            case 'colline': { const river = Math.abs(N.fbm(x * .5 + warp, y * .5, z * .5) - .5); return .3 + .45 * f - .22 * gauss(river, .035); }
            case 'terrazze': { const h = .15 + f * 1.1, step = Math.floor(h * 7) / 7, s = h * 7 - Math.floor(h * 7); return step + smooth(.75, .95, s) / 7; }
            case 'pianura': { const ch = Math.abs(N.fbm(x * .8 + warp * 1.5, y * .3, z * .8) - .5); return .32 + .12 * f - .12 * gauss(ch, .025); }
            case 'arcipelago': return .05 + f * 1.05;
            case 'atollo': { let h = .18 + .1 * f; for (const c of F) { const d = angle(p, c.d); if (d > c.R * 1.8) continue; const wob = 1 + .35 * (N.noise(x * 3 + c.k, y * 3, z * 3) - .5), gaps = smooth(.3, .55, N.noise(x * 5 - c.k, y * 5, z * 5)); h = Math.max(h, .3 + .42 * gauss(d - c.R * wob, c.R * .2) * gaps * (.7 + .5 * N.noise(x * 30, y * 30, z * 30))); } return h; }
            case 'fiordi': return .02 + N.ridged(x * .8, y * .8, z * .8) * 1.1;
            // Seen from orbit, dunes are fine streaks along the wind belts of the low latitudes (as on Titan),
            // over broad sandy basins; at high latitudes only the basins remain.
            case 'dune': { const lat = Math.asin(Math.max(-1, Math.min(1, p[1]))), s = lat * 60 + warp * 3 - Math.floor(lat * 60 + warp * 3), belt = 1 - smooth(.45, .75, Math.abs(p[1])); return .3 + .3 * f + .07 * belt * (s < .78 ? s / .78 : (1 - s) / .22); }
            case 'canyon': { const ch = Math.abs(N.fbm(x * .55 + warp, y * .55 - warp, z * .55) - .5); return .72 + .06 * f - .5 * (1 - smooth(0, .07, ch)); }
            case 'mesa': return .25 + .45 * smooth(.5, .54, f + .08 * N.noise(x * 6, y * 6, z * 6)) + .05 * f;
            case 'crateri': { let h = .45 + .14 * f; for (const c of F) { const d = angle(p, c.d) / c.R; if (d > 1.6) continue; const depth = Math.min(.12, c.R * .6) * 4; if (d < 1) h -= .32 * depth * (1 - d * d); h += .1 * depth * gauss(d - 1, .18); } return h; }
            case 'altopiano': { const crack = Math.abs(N.noise(x * 1.4 + warp * 2, y * 1.4, z * 1.4) - .5); return .62 + .1 * f - .3 * gauss(crack, .02); }
            case 'dorsali': { const line = ((p[0] * D[0] + p[1] * D[1] + p[2] * D[2]) * 4.5 + warp * 1.6) * 1.6, s = line - Math.floor(line); return .38 + .12 * f + .14 * smooth(.55, .62, s) * (1 - smooth(.62, 1, s)) + .1 * Math.floor(line) / 10; }
            case 'ghiacciai': return .1 + N.ridged(x * .7, y * .7, z * .7) * .95;
            case 'banchisa': { const plate = N.noise(x * 2.2, y * 2.2, z * 2.2), crack = Math.abs(N.noise(x * 2.2 + 31, y * 2.2 - 7, z * 2.2) - .5); return .5 + .03 * plate - .08 * gauss(crack, .03); }
            case 'criovulcani': { let h = .42 + .1 * f; for (const c of F) { const d = angle(p, c.d) / c.R; if (d > 1.2) continue; h += .35 * Math.max(0, 1 - d) ** 1.6 - .15 * gauss(d, .18); } return h; }
            case 'vulcani': { let h = .3 + .12 * f; for (const c of F) { const d = angle(p, c.d) / c.R; if (d > 1.2) continue; h += .55 * Math.max(0, 1 - d) ** 1.4 - .25 * gauss(d, .15); } return h; }
            case 'colate': return .32 + .3 * f + .05 * N.noise(x * 8, y * 8, z * 8);
            case 'caldera': { let h = .45 + .12 * f; for (const c of F) { const d = angle(p, c.d) / c.R; if (d > 1.8) continue; h += .28 * gauss(d - 1, .22) - .32 * (d < 1 ? 1 - d * d : 0); } return h; }
            default: return f;
        }
    };
    // Fine detail is weaker than on the landing surface, so coasts stay readable at planetary scale.
    const height = p => { const b = base(p), detail = (N.fbm(p[0] * 24, p[1] * 24, p[2] * 24, 3) - .5) * .05 * t.roughness; return Math.max(0, Math.min(1, .5 + (b - .5) * (.6 + .8 * t.relief) + detail)); };
    const lava = style === 'colate' ? p => gauss(Math.abs(N.fbm(p[0] * 5 + 3, p[1] * 9, p[2] * 7) - .5), .02) : () => 0;
    // Sea level as an area quantile, from 4000 points evenly spread on the sphere.
    let sea = -1;
    if (t.seaLevel > 0) { const n = 4000, hs = new Float32Array(n); for (let i = 0; i < n; i++) { const y = 1 - 2 * (i + .5) / n, s = Math.sqrt(1 - y * y), a = i * Math.PI * (3 - Math.sqrt(5)); hs[i] = height([Math.cos(a) * s, y, Math.sin(a) * s]); } hs.sort(); sea = hs[Math.min(n - 1, Math.floor(t.seaLevel * n))]; }
    return { height, lava, sea };
}
/** Direction of texel (i, j) of a w × h map, matching the UVs of sphereMesh (u = 1 − longitude/2π, v = colatitude/π). */
export const texelDirection = (i, j, w, h) => { const phi = (1 - (i + .5) / w) * Math.PI * 2, theta = (j + .5) / h * Math.PI, s = Math.sin(theta); return [Math.cos(phi) * s, Math.cos(theta), Math.sin(phi) * s]; };

/** Incremental generation of a w × h RGBA map: `step(ms)` computes rows for about `ms` milliseconds and
 * returns true when the map is complete; `pixels` holds the result. Heights are computed one row ahead,
 * so slopes use the rows above and below. */
export function orbitMap(g, w = 1024, h = 512) {
    const T = sphereTerrain(g), heights = new Float32Array(w * h), pixels = new Uint8ClampedArray(w * h * 4);
    let rowsHeight = 0, rowsColour = 0;
    const heightRow = j => { for (let i = 0; i < w; i++) heights[j * w + i] = T.height(texelDirection(i, j, w, h)); };
    const colourRow = j => {
        const theta = (j + .5) / h * Math.PI, dPhi = Math.PI * 2 / w, dTheta = Math.PI / h, s = Math.max(.05, Math.sin(theta));
        for (let i = 0; i < w; i++) {
            const k = j * w + i, hk = heights[k], hx = (heights[j * w + (i + 1) % w] - heights[j * w + (i + w - 1) % w]) / (2 * dPhi * s), hy = (heights[Math.min(h - 1, j + 1) * w + i] - heights[Math.max(0, j - 1) * w + i]) / (2 * dTheta);
            const slope = Math.min(1, Math.hypot(hx, hy) * .45), water = hk <= T.sea, c = colorAt(g, hk, T.sea, slope, 0, T.lava(texelDirection(i, j, w, h)));
            const shade = water ? 1 : 1 - .28 * slope;
            pixels[k * 4] = Math.round(Math.pow(Math.max(0, c[0] * shade), .92) * 255); pixels[k * 4 + 1] = Math.round(Math.pow(Math.max(0, c[1] * shade), .92) * 255); pixels[k * 4 + 2] = Math.round(Math.pow(Math.max(0, c[2] * shade), .92) * 255);
            pixels[k * 4 + 3] = water ? 0 : 255;
        }
    };
    return {
        width: w, height: h, pixels, sea: T.sea,
        get done() { return rowsColour === h; },
        step(ms = Infinity) {
            const t0 = performance.now();
            while (rowsColour < h && performance.now() - t0 < ms) {
                if (rowsHeight < h && rowsHeight <= rowsColour + 1) heightRow(rowsHeight++);
                else colourRow(rowsColour++);
            }
            return rowsColour === h;
        }
    };
}
