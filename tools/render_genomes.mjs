/** Writes content/worlds/genomes.json and the raw tiles of the contact sheet (top views of the 100 planets).
 * Usage: node tools/render_genomes.mjs [tiles-dir]. The PNG sheet is assembled by tools/genome_sheet.py. */
import fs from 'node:fs';
import { buildGenomes, genomeDistance, STYLE_NAMES, MIN_DISTANCE } from '../src/worlds/genome.js';
import { terrainHeights, colorAt } from '../src/worlds/terrain.js';
import { AREAS } from '../src/scene/systems.js';
const root = new URL('../', import.meta.url), catalogue = JSON.parse(fs.readFileSync(new URL('content/catalogue.json', root), 'utf8'));
const genomes = buildGenomes(), byIndex = new Map(catalogue.modules.map(m => [m.planetIndex, m]));
const snapshot = { schemaVersion: 1, note: `Carte d'identità dei ${genomes.length} pianeti esplorabili, generate da src/worlds/genome.js. Valori illustrativi.`, minDistance: MIN_DISTANCE,
    planets: genomes.map(g => ({ unit: byIndex.get(g.index).id, title: byIndex.get(g.index).title, styleName: STYLE_NAMES[g.style], ...g })) };
fs.writeFileSync(new URL('content/worlds/genomes.json', root), JSON.stringify(snapshot, null, 1) + '\n');
const out = process.argv[2]; if (!out) process.exit(0);
fs.mkdirSync(out, { recursive: true });
const T = 150, n = T, tiles = [];
// Order: one 5 × 5 block per discipline, areas in study order, units in area order.
const order = [0, 1, 2, 3].flatMap(sector => AREAS.filter(a => a.sector === sector).flatMap(a => a.units));
for (const index of order) {
    const g = genomes[index], { h, sea, lava } = terrainHeights(g, n), rgb = Buffer.alloc(T * T * 3), az = (g.terrain.seed % 360) * Math.PI / 180, L = [Math.cos(az) * .77, Math.sin(az) * .77, .64];
    for (let j = 0; j < n; j++) for (let i = 0; i < n; i++) {
        const k = j * n + i, hx = h[j * n + Math.min(n - 1, i + 1)] - h[j * n + Math.max(0, i - 1)], hy = h[Math.min(n - 1, j + 1) * n + i] - h[Math.max(0, j - 1) * n + i];
        const water = h[k] <= sea, s = water ? 0 : 9, nx = -hx * s, ny = -hy * s, nl = Math.hypot(nx, ny, 1), slope = Math.min(1, Math.hypot(hx, hy) * 14);
        const shade = .38 + .62 * Math.max(0, (nx * L[0] + ny * L[1] + L[2]) / nl), c = colorAt(g, h[k], sea, slope, 0, lava ? lava[k] : 0), haze = g.atmosphere.density * .18;
        const col = c.map((v, q) => v * shade * (water ? 1 : g.star.light[q] * 1.05) * (1 - haze) + g.atmosphere.sky[q] * haze);
        rgb.set(col.map(v => Math.max(0, Math.min(255, Math.round(Math.pow(Math.max(0, v), .92) * 255)))), k * 3);
    }
    fs.writeFileSync(`${out}/${index}.rgb`, rgb);
    const m = byIndex.get(index);
    tiles.push({ index, sector: m.sector, title: m.title, style: STYLE_NAMES[g.style], star: g.star.type, sky: g.atmosphere.sky, moons: g.satellites.moons, rings: g.satellites.rings, pilot: [20, 36, 69, 99].includes(index) });
}
let min = 9; for (let i = 0; i < 100; i++) for (let j = i + 1; j < 100; j++) min = Math.min(min, genomeDistance(genomes[i], genomes[j]));
fs.writeFileSync(`${out}/tiles.json`, JSON.stringify({ size: T, tiles, minDistance: min }));
console.log('tiles', tiles.length, 'min distance', min.toFixed(3));
