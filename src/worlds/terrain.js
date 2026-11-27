/** Terrain of each planet, computed from its genome (src/worlds/genome.js). Heights are in [0, 1] on an
 * n × n grid; `colorAt` gives the ground colour from height, slope and the genome palette. The same code
 * serves the contact sheet of the 100 planets and, later, the landing surfaces. */
import { seededRandom } from '../scene/systems.js';

export function noiseField(seed) {
    const r = seededRandom(seed), perm = Array.from({ length: 512 }, (_, i) => i % 256);
    for (let i = 255; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [perm[i], perm[j]] = [perm[j], perm[i]]; }
    for (let i = 0; i < 256; i++) perm[i + 256] = perm[i];
    const val = (x, y) => perm[(perm[x & 255] + y) & 511] / 255;
    const fade = t => t * t * (3 - 2 * t);
    const noise = (x, y) => { const xi = Math.floor(x), yi = Math.floor(y), fx = fade(x - xi), fy = fade(y - yi); const a = val(xi, yi), b = val(xi + 1, yi), c = val(xi, yi + 1), d = val(xi + 1, yi + 1); return a + (b - a) * fx + (c - a) * fy + (a - b - c + d) * fx * fy; };
    const fbm = (x, y, o = 5) => { let s = 0, a = .5, f = 1, n = 0; for (let i = 0; i < o; i++) { s += a * noise(x * f + i * 17.1, y * f - i * 9.3); n += a; a *= .5; f *= 2.03; } return s / n; };
    const ridged = (x, y, o = 5) => { let s = 0, a = .5, f = 1, n = 0; for (let i = 0; i < o; i++) { s += a * (1 - Math.abs(noise(x * f + i * 5.7, y * f + i * 3.1) * 2 - 1)) ** 2; n += a; a *= .5; f *= 2.1; } return s / n; };
    return { r, noise, fbm, ridged };
}
const smooth = (a, b, x) => { const t = Math.max(0, Math.min(1, (x - a) / (b - a))); return t * t * (3 - 2 * t); };
const gauss = (d, w) => Math.exp(-(d * d) / (w * w));
/** Random features (cones, craters, rings) placed with a fixed seed, at least `gap` apart. */
export function features(r, count, rmin, rmax, gap = .08) {
    const out = [];
    for (let k = 0; k < count * 8 && out.length < count; k++) { const f = { x: .08 + r() * .84, y: .08 + r() * .84, R: rmin + r() * (rmax - rmin) }; if (out.every(o => Math.hypot(o.x - f.x, o.y - f.y) > (o.R + f.R) * .7 + gap)) out.push(f); }
    return out;
}

/** Height of the style at (u, v) in [0, 1]²; the features F may lie anywhere (the biomes of 1.71.0 tile them).
 * With `ramps` the scarps of the ridges rise over a tenth of their spacing, so the ground has no step. */
export function styleHeight(style, N, F, u, v, ramps = false) {
    const x = u * 6, y = v * 6, f = N.fbm(x, y), warp = N.fbm(x + 4.2, y - 1.3);
    switch (style) {
        case 'colline': { const river = Math.abs(N.fbm(x * .5 + warp, y * .5) - .5); return .3 + .45 * f - .22 * gauss(river, .035); }
        case 'terrazze': { const h = .15 + f * 1.1, step = Math.floor(h * 7) / 7, t = h * 7 - Math.floor(h * 7); return step + smooth(.75, .95, t) / 7; }
        case 'pianura': { const ch = Math.abs(N.fbm(x * .8 + warp * 1.5, y * .3) - .5); return .32 + .12 * f - .12 * gauss(ch, .025); }
        case 'arcipelago': return .05 + f * 1.05;
        case 'atollo': { let h = .18 + .1 * f; for (const c of F) { const a = Math.atan2(v - c.y, u - c.x), wob = 1 + .35 * (N.noise(Math.cos(a) * 2 + c.x * 9, Math.sin(a) * 2 + c.y * 9) - .5), d = Math.hypot(u - c.x, v - c.y), gapsAround = smooth(.3, .55, N.noise(a * 1.6 + c.x * 7, c.y * 5)); h = Math.max(h, .3 + .42 * gauss(d - c.R * wob, c.R * .2) * gapsAround * (.7 + .5 * N.noise(u * 30, v * 30))); } return h; }
        case 'fiordi': return .02 + N.ridged(x * .8, y * .8) * 1.1;
        case 'dune': { const dir = x * .9 + y * .45 + warp * 2.2, s = dir * 3.1 - Math.floor(dir * 3.1); return .32 + .2 * (s < .78 ? s / .78 : (1 - s) / .22) * (.6 + .5 * N.fbm(x * .4, y * .4)) + .08 * f; }
        case 'canyon': { const ch = Math.abs(N.fbm(x * .55 + warp, y * .55 - warp) - .5); return .72 + .06 * f - .5 * (1 - smooth(.0, .07, ch)); }
        case 'mesa': return .25 + .45 * smooth(.5, .54, f + .08 * N.noise(x * 6, y * 6)) + .05 * f;
        case 'crateri': { let h = .45 + .14 * f; for (const c of F) { const d = Math.hypot(u - c.x, v - c.y) / c.R; if (d < 1) h -= .32 * c.R * 4 * (1 - d * d); h += .1 * c.R * 4 * gauss(d - 1, .18); } return h; }
        case 'altopiano': { const crack = Math.abs(N.noise(x * 1.4 + warp * 2, y * 1.4) - .5); return .62 + .1 * f - .3 * gauss(crack, .02); }
        case 'dorsali': { const line = (x * .7 + y * .3 + warp * 1.6) * 1.6, s = line - Math.floor(line); return .38 + .12 * f + .14 * smooth(.55, .62, s) * (1 - smooth(.62, 1, s)) + .1 * (Math.floor(line) + (ramps ? smooth(.9, 1, s) : 0)) / 10; }
        case 'ghiacciai': { const r = N.ridged(x * .7, y * .7); return .1 + r * .95; }
        case 'banchisa': { const plate = N.noise(x * 2.2, y * 2.2), crack = Math.abs(N.noise(x * 2.2 + 31, y * 2.2 - 7) - .5); return .5 + .03 * plate - .08 * gauss(crack, .03); }
        case 'criovulcani': { let h = .42 + .1 * f; for (const c of F) { const d = Math.hypot(u - c.x, v - c.y) / c.R; h += .35 * c.R * 5 * Math.max(0, 1 - d) ** 1.6 - .15 * c.R * 5 * gauss(d, .18); } return h; }
        case 'vulcani': { let h = .3 + .12 * f; for (const c of F) { const d = Math.hypot(u - c.x, v - c.y) / c.R; h += .55 * c.R * 3.5 * Math.max(0, 1 - d) ** 1.4 - .25 * c.R * 3.5 * gauss(d, .15); } return h; }
        case 'colate': return .32 + .3 * f + .05 * N.noise(x * 8, y * 8);
        case 'caldera': { let h = .45 + .12 * f; for (const c of F) { const d = Math.hypot(u - c.x, v - c.y) / c.R; h = h + .28 * gauss(d - 1, .22) - .32 * (d < 1 ? 1 - d * d : 0); } return h; }
        default: return f;
    }
}
export const FEATURES = { atollo: [9, .04, .11], crateri: [14, .025, .12], criovulcani: [4, .05, .1], vulcani: [3, .08, .16], caldera: [1, .3, .34] };

/** The style of the genome as a function of (u, v), unclamped and defined beyond [0, 1]²: the shapes of
 * terrainHeights with the same seed and features, for the landing surface (src/worlds/field.js, 1.62.0). */
export function styleField(genome) {
    const t = genome.terrain, N = noiseField(t.seed), spec = FEATURES[t.style], F = spec ? features(N.r, ...spec) : [];
    return (u, v) => .5 + (styleHeight(t.style, N, F, u, v) - .5) * (.6 + .8 * t.relief) + (N.fbm(u * 40, v * 40, 3) - .5) * .12 * t.roughness;
}
/** Heights of the planet on an n × n grid, plus its sea level (same units). */
export function terrainHeights(genome, n = 128) {
    const t = genome.terrain, N = noiseField(t.seed), spec = FEATURES[t.style], F = spec ? features(N.r, ...spec) : [], h = new Float32Array(n * n);
    for (let j = 0; j < n; j++) for (let i = 0; i < n; i++) {
        const u = i / (n - 1), v = j / (n - 1), base = styleHeight(t.style, N, F, u, v), detail = (N.fbm(u * 40, v * 40, 3) - .5) * .12 * t.roughness;
        h[j * n + i] = Math.max(0, Math.min(1, .5 + (base - .5) * (.6 + .8 * t.relief) + detail));
    }
    // Sea level as a quantile of the heights, so the sea covers the intended fraction of the ground.
    const sorted = Float32Array.from(h).sort(), sea = t.seaLevel > 0 ? sorted[Math.min(n * n - 1, Math.floor(t.seaLevel * n * n))] : -1;
    // Lava channels of the 'colate' style, as a mask used only for colour.
    const lava = t.style === 'colate' ? Float32Array.from(h, (_, k) => { const u = (k % n) / (n - 1), v = Math.floor(k / n) / (n - 1); return gauss(Math.abs(N.fbm(u * 5 + 3, v * 9) - .5), .02); }) : null;
    return { n, h, sea, lava };
}
const mix = (a, b, t) => a.map((x, i) => x + (b[i] - x) * t);
/** Ground colour at a cell: water, shore, vegetation, rock, ice or snow, lava. */
export function colorAt(g, height, sea, slope, wet = 0, lava = 0) {
    const p = g.palette, fam = g.family;
    if (height <= sea) { const depth = Math.min(1, (sea - height) * 6); return fam === 'arctic' && g.terrain.style === 'banchisa' ? mix([.78, .86, .92], p.water, .5 + depth * .3) : mix(mix(p.water, [.6, .7, .7], .35), p.water.map(v => v * .55), depth); }
    let c = p.rock.slice();
    if (fam === 'desert') c = mix(p.rock, [.86, .7, .5], .35 * (1 - slope));
    if (height - sea < .025 && sea > 0) c = mix(c, [.84, .78, .62], .7);
    const green = (fam === 'terrestrial' ? .85 : fam === 'oceanic' ? .6 : fam === 'volcanic' ? .15 : 0) * Math.min(1, g.atmosphere.density * 1.6);
    if (green > 0) c = mix(c, p.pigment, green * (1 - smooth(.25, .6, slope)) * (.7 + .3 * wet));
    if (fam === 'arctic') c = mix(c, [.88, .93, .98], .75 * (1 - smooth(.35, .8, slope)));
    else if (g.atmosphere.density > .2 && height > .86) c = mix(c, [.95, .96, .98], smooth(.86, .93, height));
    if (lava > 0) c = mix(c, [1, .38, .1], Math.min(1, lava * 1.2));
    return c;
}
