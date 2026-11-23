/** Landing surface of a planet, generated from its identity card (src/worlds/genome.js). It replaces the
 * three shared Blender surfaces: every planet gets its own ground, sea, light, sky, moons and a compact group
 * of four stations at the side of the view. Since 1.62.0 the ground is the piece of the planet seen from
 * orbit around its landing site (src/worlds/field.js), with rings of coarser terrain up to the horizon. */
import { planetCards, STARS, starTypes } from './genome.js';
import { colorAt } from './terrain.js';
import { surfaceField, stitch, CORE, RINGS } from './field.js';
import { LANDING_SITES } from './landing-sites.js';
import { seededRandom } from '../scene/systems.js';
import { allSpecies, populate } from './species.js';
import { placeList, locatePlaces } from './places.js';

export const planetGenomes = planetCards;
let speciesCache = null;
/** Species of every planet (names unique over the galaxy), in planet order. */
export const planetSpecies = () => speciesCache ||= allSpecies(planetGenomes());
export const systemStarLight = system => STARS[starTypes()[system]].light;
export const EXTENT = CORE, GRID = 225;
const mix = (a, b, t) => a.map((x, i) => x + (b[i] - x) * t);
const norm = v => { const l = Math.hypot(...v) || 1; return v.map(x => x / l); };

/** Surface data of planet `index` (mesh arrays included; the GPU upload is done by the caller). */
export function planetSurface(index, n = GRID) {
    const g = planetGenomes()[index], F = surfaceField(g, LANDING_SITES[index]), r = seededRandom(g.terrain.seed ^ 0x5EA);
    const cell = EXTENT / (n - 1), X = i => -EXTENT / 2 + i * cell, Y = new Float32Array(n * n), E = new Float32Array(n * n), lavaGrid = g.terrain.style === 'colate' ? new Float32Array(n * n) : null;
    for (let j = 0; j < n; j++) for (let i = 0; i < n; i++) { const k = j * n + i, e = F.E(X(i), X(j)); E[k] = e; Y[k] = (e - F.sea) * F.S; if (lavaGrid) lavaGrid[k] = F.lava(X(i), X(j)); }
    const seaY = F.sea >= 0 ? 0 : null;
    const sample = (A, x, z) => { const fx = Math.max(0, Math.min(n - 1.001, (x + EXTENT / 2) / cell)), fz = Math.max(0, Math.min(n - 1.001, (z + EXTENT / 2) / cell)), i = Math.floor(fx), j = Math.floor(fz), a = fx - i, b = fz - j; return A[j * n + i] * (1 - a) * (1 - b) + A[j * n + i + 1] * a * (1 - b) + A[(j + 1) * n + i] * (1 - a) * b + A[(j + 1) * n + i + 1] * a * b; };
    // Beyond the detailed square the ground is the field itself, as in the rings of the horizon.
    const inside = (x, z) => Math.abs(x) <= EXTENT / 2 && Math.abs(z) <= EXTENT / 2;
    const heightAt = (x, z) => inside(x, z) ? sample(Y, x, z) : F.Y(x, z), lavaAt = lavaGrid ? (x, z) => inside(x, z) ? sample(lavaGrid, x, z) : F.lava(x, z) : null;
    // Four stations on flattened pads, or on platforms where the ground is under water.
    // In a row across the lower left of the default view, below the panels and clear of the centre.
    const centre = [14, 28], across = [.825, -.565], stations = [];
    for (let k = 0; k < 4; k++) {
        const x = centre[0] + (k - 1.5) * 6 * across[0], z = centre[1] + (k - 1.5) * 6 * across[1];
        let y = 0, c = 0; for (let dz = -2; dz <= 2; dz += 1) for (let dx = -2; dx <= 2; dx += 1) { y += heightAt(x + dx, z + dz); c++; } y /= c;
        const pad = seaY !== null ? Math.max(y, seaY + .45) : y;
        stations.push({ index: k, position: [x, pad, z], labelPosition: [x, pad + 3.6, z], radius: 2.2, platform: seaY !== null && y < seaY + .45 });
    }
    for (const s of stations) for (let j = 0; j < n; j++) for (let i = 0; i < n; i++) { const d = Math.hypot(X(i) - s.position[0], X(j) - s.position[2]); if (d < 3.4 && !s.platform) { const w = d < 2.2 ? 1 : 1 - (d - 2.2) / 1.2; Y[j * n + i] += (s.position[1] - .3 - Y[j * n + i]) * w; } }
    // The edges meet the first ring of the horizon (src/worlds/field.js) on its grid lines.
    for (const edge of [k => k, k => (n - 1) * n + k, k => k * n, k => k * n + n - 1]) stitch(Y, n, cell, RINGS[0], edge);
    // Mesh: position, normal, uv, colour, PBR (metal, roughness, emission, kind 1 = ground).
    const v = new Float32Array(n * n * 16), idx = new Uint32Array((n - 1) * (n - 1) * 6);
    for (let j = 0; j < n; j++) for (let i = 0; i < n; i++) {
        const k = j * n + i, hx = (Y[j * n + Math.min(n - 1, i + 1)] - Y[j * n + Math.max(0, i - 1)]) / (2 * cell), hz = (Y[Math.min(n - 1, j + 1) * n + i] - Y[Math.max(0, j - 1) * n + i]) / (2 * cell);
        const nn = norm([-hx, 1, -hz]), slope = Math.min(1, Math.hypot(hx, hz) * .9), lava = lavaGrid ? lavaGrid[k] : 0;
        const col = colorAt(g, E[k], F.sea, slope, 0, lava), lin = col.map(c => Math.pow(c, 1.6));
        v.set([X(i), Y[k], X(j), ...nn, i / (n - 1), j / (n - 1), ...lin, 1, 0, .88 - .3 * (g.family === 'arctic'), lava > .3 ? .9 : 0, 1], k * 16);
    }
    let q = 0; for (let j = 0; j < n - 1; j++) for (let i = 0; i < n - 1; i++) { const a = j * n + i; idx.set([a, a + n, a + 1, a + 1, a + n, a + n + 1], q); q += 6; }
    // Cells for the phenomena (same shape as the old grid): every 2 units inside ±50.
    const cells = [];
    for (let z = -50; z <= 50; z += 2) for (let x = -50; x <= 50; x += 2) { const y = heightAt(x, z); cells.push({ x, z, groundY: y, wet: seaY !== null && y <= seaY + .05, veg: 0 }); }
    const sunAz = r() * Math.PI * 2, sunEl = .45 + r() * .45, light = norm([Math.cos(sunAz) * Math.cos(sunEl), Math.sin(sunEl), Math.sin(sunAz) * Math.cos(sunEl)]);
    const density = g.atmosphere.density, horizon = density > .04 ? g.atmosphere.sky : [.035, .035, .04], top = density > .04 ? mix([.004, .006, .012], g.atmosphere.sky.map(c => c * .45), Math.min(1, density * 1.4)) : [.002, .002, .004];
    const out = {
        key: 'planet-' + index, index, genome: g, n, cell, heights: Y, heightAt, lavaAt, seaY, stations, mesh: { v, i: idx, stride: 16 }, field: F, site: F.site,
        grid: { radius: 2, cells }, water: g.palette.water, light: { direction: light, color: g.star.light },
        fog: { color: horizon, density: .0004 + .0016 * density }, sky: { top, horizon, sun: g.star.light, stars: Math.max(0, 1 - density * 3) },
        // Moons sit right of the screen title, from the centre of the view to its right edge.
        moons: Array.from({ length: g.satellites.moons }, (_, k) => ({ azimuth: .1 + k * .14 + r() * .05, elevation: .06 + r() * .08, size: 4 + r() * 6 })),
        vegetation: ['terrestrial', 'oceanic', 'volcanic'].includes(g.family) ? Math.min(1, density * 1.6) * (g.family === 'volcanic' ? .25 : 1) : 0,
        species: planetSpecies()[index]
    };
    // Points of interest, placed on the final heights (after the station pads).
    out.places = locatePlaces(out, placeList(g));
    return out;
}
/** Instances of the species (src/worlds/species.js) and of the rocks for the surface, deterministic. */
export function surfaceScatter(s) {
    const g = s.genome, r = seededRandom(g.terrain.seed ^ 0xF10), rocks = [], near = (x, z) => s.stations.some(st => Math.hypot(st.position[0] - x, st.position[2] - z) < 6);
    for (let k = 0; k < 900 && rocks.length < 260; k++) {
        const x = (r() - .5) * 130, z = (r() - .5) * 130, y = s.heightAt(x, z);
        if ((s.seaY !== null && y < s.seaY - .2) || near(x, z)) continue;
        const c = g.palette.rock.map(v => v * (.7 + r() * .4));
        rocks.push({ x, y: y - .25, z, s: .5 + r() * r() * 2.6, r: c[0], g: c[1], b: c[2], h: r() * 6.283 });
    }
    return { rocks, species: populate(s, s.species) };
}
