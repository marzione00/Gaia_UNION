// Measured cost of the series «Mondi vivi» (1.62.0–1.69.0) on the processor. Every one of the 125 landing
// surfaces is built and drawn by the World of the site with the renderer replaced by the counter of
// scripts/prestazioni.mjs, which keeps the rules of src/renderer.js: draw calls, triangles and instances are
// those a frame sends to the graphics card. Each surface is drawn with the camera of the stations and with the
// camera that follows the explorer while it runs, at the three graphics settings, with the ecosystem and the
// day moving. The clock gives the time the main thread spends preparing a frame. Usage:
//   node scripts/prestazioni-mondi.mjs [--frames 60] [--planets 0,7] [--out docs/PRESTAZIONI_MONDI.md]
import fs from 'node:fs';
import os from 'node:os';
import { fileURLToPath } from 'node:url';
import { performance } from 'node:perf_hooks';

const MAIN = process.argv[1] === fileURLToPath(import.meta.url);
export const SEED = 20261124;
if (MAIN) Object.defineProperty(globalThis, 'crypto', { value: { getRandomValues: a => a.fill(SEED) }, configurable: true });

const { counter, QUALITIES, QUALITY_NAMES } = await import('./prestazioni.mjs');
const { World } = await import('../src/scene/world.js');
const { planetSurface, planetSpecies, planetGenomes } = await import('../src/worlds/surface.js');
const { newExplorer, stepExplorer, freeSpot, jumpOf } = await import('../src/worlds/explorer.js');
const { worldModels, worldMesh } = await import('../src/worlds/catalogo.js');
export { QUALITIES };

/** Structural limits of one frame of a landing surface, checked by tests/mondi.test.mjs. */
export const BUDGET = Object.freeze({ draws: 120, triangles: 1.3e6, instances: 6000, buildMs: 1500, meshMiB: 64 });
export const VIEWS = Object.freeze({ stazioni: 'camera delle stazioni', esploratore: 'esploratore in corsa' });
const read = p => JSON.parse(fs.readFileSync(new URL('../' + p, import.meta.url), 'utf8'));
const percentile = (list, q) => { const s = [...list].sort((a, b) => a - b); return s[Math.min(s.length - 1, Math.floor(s.length * q))]; };
const mean = list => list.reduce((a, b) => a + b, 0) / Math.max(1, list.length);
const median = list => percentile(list, .5);

/** The World of the site over a counter, ready for the surfaces. */
export function world(quality = 'high') {
    const R = counter(quality), make = R.makeMesh;
    // The counter keeps the stride too, to weigh the vertices.
    R.makeMesh = (id, d) => { make(id, d); R.meshes.get(id).stride = d.stride || 12; return id; };
    return { R, w: new World(R, {}, read('assets/scenes/manifest.json').biomes) };
}
/** Bytes of the meshes and instance data uploaded for the surface of the planet now active: positions, normals,
 * texture coordinates, colours (and PBR for the kit) with 4 bytes a float, and 4 bytes an index. */
function meshBytes(R) { let b = 0; for (const m of R.meshes.values()) b += m.vertices * (m.stride || 12) * 4 + m.count * 4; for (const set of R.instanceSets.values()) b += set.n * 32; return b; }
/** Builds the surface of planet `i` on the World: the time to make it from the card (Node) and to upload its
 * meshes, and their size. */
export function buildCost(ctx, i) {
    const { R, w } = ctx; w.planetCache?.delete(i);
    const t0 = performance.now(), s = planetSurface(i), t1 = performance.now();
    w.planetCache ||= new Map(); w.planetCache.set(i, s); w.uploadedPlanet = null;
    w.activatePlanet(i); const t2 = performance.now();
    return { index: i, surfaceMs: t1 - t0, uploadMs: t2 - t1, bytes: meshBytes(R), meshes: R.meshes.size };
}
/** `frames` frames of 1/60 s of the surface of planet `i` from one view, after the camera has settled. */
export function measureSurface(ctx, i, quality, view, { frames = 60 } = {}) {
    const { R, w } = ctx; R.sceneQuality = quality; w.activatePlanet(i);
    const s = { scene: 'surface', selected: i, time: 30, yaw: 0, pitch: .45, distance: 22, paused: false, lastFrameMs: 1000 / 60 };
    let A = null, env = null;
    if (view === 'esploratore') {
        env = w.explorerEnv(); const spot = freeSpot(2, 2, env) || [2, 2]; A = newExplorer(spot[0], spot[1], .6, env);
        Object.assign(s, { explore: true, exploreBlend: 1, exploreFocus: [A.x, A.z], avatar: A, chaseOrbit: 0 });
    }
    // The explorer runs straight on and turns away from what stops it.
    const step = () => {
        if (A) { const ev = stepExplorer(A, { forward: 1, run: true, turn: A.turning ? 1 : 0 }, 1 / 60, env); A.turning = ev.includes('fermo') ? 40 : Math.max(0, (A.turning || 0) - 1); s.exploreFocus = [A.x, A.z]; }
        R.begin(); w.draw('surface', s, { modules: [] }); s.time += 1 / 60;
    };
    w.cameraScene = null; for (let k = 0; k < 20; k++) step();
    const ms = [], draws = [], triangles = [], instances = [];
    for (let k = 0; k < frames; k++) { const t = performance.now(); step(); ms.push(performance.now() - t); draws.push(R.frame.draws); triangles.push(R.frame.triangles); instances.push(R.frame.instances); }
    return { index: i, quality, view, times: ms, ms: { mean: mean(ms), p95: percentile(ms, .95), worst: Math.max(...ms) }, draws: { mean: mean(draws), max: Math.max(...draws) }, triangles: { mean: mean(triangles), max: Math.max(...triangles) }, instances: { max: Math.max(...instances) }, walked: A ? A.walked : 0 };
}
/** The models of the catalogue: triangles at both levels and the time to build each, by kind. */
export function catalogueCost() {
    const t = performance.now(), list = worldModels(read('content/worlds/modelli.json')), listMs = performance.now() - t, by = {};
    for (const e of list) { const k = (by[e.kind] ||= { n: 0, t0: [], t1: [], ms: [] }); k.n++; for (const level of [0, 1]) { const a = performance.now(), m = worldMesh(e, level); k.ms.push(performance.now() - a); k[level ? 't1' : 't0'].push(m.i.length / 3); } }
    return { total: list.length, listMs, by };
}
/** The step of the explorer, on foot and in the rover, in microseconds. */
export function explorerCost(w, calls = 20000) {
    const env = w.explorerEnv(), spot = freeSpot(2, 2, env), A = newExplorer(spot[0], spot[1], .6, env); let t = performance.now();
    for (let k = 0; k < calls; k++) stepExplorer(A, { forward: 1, run: true, turn: k % 300 < 40 ? 1 : 0 }, 1 / 60, env);
    return (performance.now() - t) / calls * 1000;
}

const dec = (v, n = 1) => v.toFixed(n).replace('.', ',');
const int = v => Math.round(v).toLocaleString('it-IT');
const mega = v => dec(v / 1e6, 2) + ' milioni';
const KIND_NAMES = { specie: 'Specie', colonia: 'Edifici delle colonie', villaggio: 'Edifici dei villaggi', nativo: 'Popoli nativi', colono: 'Coloni', rover: 'Rover' };

export function report({ frames, results, builds, catalogue, explorer, machine, titles, gravity, speciesMs }) {
    const L = [], sel = (q, v) => results.filter(r => r.quality === q && r.view === v), worst = (list, f) => list.reduce((a, r) => (f(r) > f(a) ? r : a)), name = i => `«${titles[i]}» (pianeta ${i + 1})`;
    const planets = new Set(results.map(r => r.index)).size;
    L.push('# Prestazioni misurate della serie «Mondi vivi»', '');
    L.push('Questo documento è generato da `node scripts/prestazioni-mondi.mjs`; `tests/mondi.test.mjs` ne controlla la struttura e i limiti. ' +
        `Le superfici di ${planets} pianeti sono state costruite e disegnate dal codice del sito, con la camera delle stazioni e con la camera che segue l'esploratore mentre corre, alle tre impostazioni grafiche, con l'ecosistema e il giorno in movimento; per ogni vista si misurano ${frames} fotogrammi da 1/60 di secondo dopo 20 fotogrammi di assestamento. ` +
        'Al posto della scheda grafica c\'è il contatore di `scripts/prestazioni.mjs`, che applica le regole di `src/renderer.js`: chiamate di disegno, triangoli e istanze sono quelli che il sito invia alla scheda. ' +
        `I tempi sono quelli del processore che prepara il fotogramma, misurati su ${machine}. I tempi della scheda grafica si misurano nel browser aprendo il sito con \`?diagnostica\` nell'indirizzo.`, '');
    L.push('## Un fotogramma di superficie', '');
    L.push('| Vista | Grafica | Tempo medio | 95° percentile | Peggiore | Chiamate di disegno (media / massimo) | Triangoli (massimo) | Istanze (massimo) |');
    L.push('|---|---|---|---|---|---|---|---|');
    for (const v of Object.keys(VIEWS)) for (const q of QUALITIES) {
        const list = sel(q, v);
        L.push(`| ${VIEWS[v]} | ${QUALITY_NAMES[q]} | ${dec(mean(list.map(r => r.ms.mean)), 2)} ms | ${dec(percentile(list.flatMap(r => r.times), .95), 2)} ms | ${dec(Math.max(...list.map(r => r.ms.worst)), 1)} ms | ${int(mean(list.map(r => r.draws.mean)))} / ${int(Math.max(...list.map(r => r.draws.max)))} | ${mega(Math.max(...list.map(r => r.triangles.max)))} | ${int(Math.max(...list.map(r => r.instances.max)))} |`);
    }
    L.push('');
    const hs = sel('high', 'stazioni'), he = sel('high', 'esploratore'), all = results, slow = worst(all, r => r.ms.mean), heavy = worst(all, r => r.triangles.max), busy = worst(all, r => r.draws.max);
    L.push(`Il tempo medio è la media sui pianeti del tempo medio di ciascuno; il 95° percentile e il peggiore riguardano i singoli fotogrammi. Il pianeta più lento da preparare è ${name(slow.index)}, con ${dec(slow.ms.mean, 2)} ms in media (${VIEWS[slow.view]}, ${QUALITY_NAMES[slow.quality]}); il più ricco di triangoli è ${name(heavy.index)}, con ${mega(heavy.triangles.max)}, e quello con più chiamate di disegno ${name(busy.index)}, con ${int(busy.draws.max)}. ` +
        `Con il dettaglio alto la preparazione richiede in media ${dec(mean(hs.map(r => r.ms.mean)), 2)} ms con la camera delle stazioni e ${dec(mean(he.map(r => r.ms.mean)), 2)} ms con l'esploratore, su 16,7 ms di un fotogramma a 60 al secondo; in corsa l'esploratore sposta la camera, e gli individui si ridistribuiscono fra i due livelli di dettaglio ogni 6 unità.`, '');
    L.push(`Le impostazioni più leggere disegnano sette o quattro individui su dieci e avvicinano i modelli dettagliati alla camera, quindi riducono i triangoli e le istanze; le chiamate di disegno cambiano poco, perché ogni specie, ogni tipo di edificio e ogni figura di abitanti è una chiamata con istanze per livello. I limiti controllati dai test per un fotogramma di superficie sono ${int(BUDGET.draws)} chiamate di disegno, ${mega(BUDGET.triangles)} di triangoli e ${int(BUDGET.instances)} istanze.`, '');
    L.push('## Costruzione di una superficie', '');
    const S = builds.map(b => b.surfaceMs), U = builds.map(b => b.uploadMs), B = builds.map(b => b.bytes / 2 ** 20), big = worst(builds, b => b.bytes), long = worst(builds, b => b.surfaceMs + b.uploadMs);
    L.push(`Alla prima visita di un pianeta il sito costruisce la superficie dalla carta d'identità (terreno, mari, luoghi, colonia e villaggio, specie) e poi le maglie dei modelli, che carica sulla scheda grafica. Le ultime 3 superfici visitate restano in memoria: tornando su una di esse il sito rifà le maglie e riusa la superficie.`, '');
    L.push('| Fase | Minimo | Mediana | Massimo |', '|---|---|---|---|');
    L.push(`| Superficie dalla carta | ${int(Math.min(...S))} ms | ${int(median(S))} ms | ${int(Math.max(...S))} ms |`);
    L.push(`| Maglie dei modelli | ${int(Math.min(...U))} ms | ${int(median(U))} ms | ${int(Math.max(...U))} ms |`);
    L.push(`| Memoria delle maglie e delle istanze | ${dec(Math.min(...B), 1)} MiB | ${dec(median(B), 1)} MiB | ${dec(Math.max(...B), 1)} MiB |`, '');
    L.push(`La superficie più lunga da costruire è quella di ${name(long.index)}, con ${int(long.surfaceMs + long.uploadMs)} ms in tutto, la più pesante in memoria quella di ${name(big.index)}, con ${dec(big.bytes / 2 ** 20, 1)} MiB. La memoria conta 4 byte per ogni numero dei vertici e degli indici e 32 byte per ogni istanza. I limiti dei test sono ${int(BUDGET.buildMs)} ms per la costruzione e ${BUDGET.meshMiB} MiB per la memoria di una superficie.`, '');
    L.push('## Catalogo dei modelli dei mondi', '');
    L.push(`Il catalogo 3D elenca ${int(catalogue.total)} modelli dei mondi, ricavati in ${int(catalogue.listMs)} ms dall'indice \`content/worlds/modelli.json\` e dalle specie delle carte, che la prima volta si calcolano per tutti i pianeti in ${int(speciesMs)} ms; un modello si costruisce quando lo si apre, prima nella versione semplificata e poi in quella dettagliata.`, '');
    L.push('| Genere | Modelli | Triangoli, dettaglio (min / mediana / max) | Triangoli, versione semplificata (min / mediana / max) | Costruzione (mediana / max) |', '|---|---|---|---|---|');
    for (const [k, n] of Object.entries(KIND_NAMES)) { const c = catalogue.by[k]; if (!c) continue; L.push(`| ${n} | ${int(c.n)} | ${int(Math.min(...c.t0))} / ${int(median(c.t0))} / ${int(Math.max(...c.t0))} | ${int(Math.min(...c.t1))} / ${int(median(c.t1))} / ${int(Math.max(...c.t1))} | ${dec(median(c.ms), 2)} / ${dec(Math.max(...c.ms), 1)} ms |`); }
    L.push('');
    L.push('## Esploratore', '');
    L.push(`Un passo dell'esploratore in corsa, con il controllo del suolo, delle pendenze, dell'acqua e degli edifici, richiede ${dec(explorer, 1)} µs. Il salto si calcola con una formula esatta: ${dec(jumpOf(1).height * 100, 0)} cm sulla Terra, da ${dec(jumpOf(gravity[1]).height * 100, 0)} a ${dec(jumpOf(gravity[0]).height * 100, 0)} cm sui 125 pianeti.`, '');
    L.push('## Pianeti uno per uno', '');
    L.push('Tempo medio di preparazione e chiamate di disegno massime per fotogramma con il dettaglio alto, triangoli massimi e costruzione della superficie.', '');
    L.push('| Pianeta | Stazioni | Esploratore | Triangoli (massimo) | Costruzione |', '|---|---|---|---|---|');
    for (const r of hs) { const e = he.find(x => x.index === r.index), b = builds.find(x => x.index === r.index); L.push(`| ${r.index + 1} | ${dec(r.ms.mean, 2)} ms · ${int(r.draws.max)} | ${dec(e.ms.mean, 2)} ms · ${int(e.draws.max)} | ${mega(Math.max(r.triangles.max, e.triangles.max))} | ${b ? int(b.surfaceMs + b.uploadMs) + ' ms' : ''} |`); }
    L.push('');
    return L.join('\n');
}

if (MAIN) {
    const arg = (k, d) => { const i = process.argv.indexOf('--' + k); return i > 0 ? process.argv[i + 1] : d; };
    const frames = +arg('frames', 60), ids = arg('planets', null)?.split(',').map(Number) ?? Array.from({ length: 125 }, (_, i) => i), out = arg('out', 'docs/PRESTAZIONI_MONDI.md');
    const machine = `${os.cpus()[0].model.replace(/\s+/g, ' ').trim()}, Node ${process.version}`, titles = read('content/catalogue.json').modules.map(m => m.title);
    const t0 = performance.now(); planetSpecies(); const speciesMs = performance.now() - t0;
    const ctx = world('high'), builds = [], results = [];
    // The first frames run while the JavaScript engine is still compiling the code: one surface is drawn at
    // every setting before the measures start.
    for (const q of QUALITIES) for (const v of Object.keys(VIEWS)) measureSurface(ctx, ids.at(-1), q, v, { frames: 60 });
    for (const i of ids) {
        builds.push(buildCost(ctx, i));
        for (const q of QUALITIES) for (const v of Object.keys(VIEWS)) results.push(measureSurface(ctx, i, q, v, { frames }));
        const r = results.filter(x => x.index === i);
        process.stderr.write(`${i} build ${builds.at(-1).surfaceMs.toFixed(0)}+${builds.at(-1).uploadMs.toFixed(0)} ms ${(builds.at(-1).bytes / 2 ** 20).toFixed(1)} MiB · ${r.map(x => x.ms.mean.toFixed(2) + '/' + x.draws.max).join(' ')}\n`);
    }
    const catalogue = catalogueCost(), explorer = explorerCost(ctx.w);
    const g = planetGenomes().map(x => x.gravity);
    fs.writeFileSync(out, report({ frames, results, builds, catalogue, explorer, machine, titles, gravity: [Math.min(...g), Math.max(...g)], speciesMs }));
    console.log(`Scritto ${out}: ${results.length} misure su ${ids.length} pianeti`);
}
