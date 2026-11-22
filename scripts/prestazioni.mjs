// Measured cost of the series «Galassia viva» (1.57.0–1.61.0) on the processor. Every one of the 30 systems is
// drawn by the World of the site with the renderer replaced by a counter that keeps the rules of
// src/renderer.js (a call on a missing mesh or instance set is skipped, an instanced call counts its
// triangles once per instance), at the three graphics settings and with the camera of «CENTRA». The counter
// gives the draw calls, the triangles and the instances a frame sends to the graphics card; the clock gives
// the time the main thread spends preparing the frame. The graphics card itself is measured in the browser
// with ?diagnostica (src/ui/diagnostics.js). Usage:
//   node scripts/prestazioni.mjs [--frames 240] [--systems 0,13] [--out docs/PRESTAZIONI.md]
import fs from 'node:fs';
import os from 'node:os';
import { fileURLToPath } from 'node:url';
import { performance } from 'node:perf_hooks';

const MAIN = process.argv[1] === fileURLToPath(import.meta.url);
// The economy and the front of the swarm draw their seed from the session; the report fixes it, so two runs
// on the same machine give the same scene.
export const SEED = 20261122;
if (MAIN) Object.defineProperty(globalThis, 'crypto', { value: { getRandomValues: a => a.fill(SEED) }, configurable: true });

const { World, minorBodies } = await import('../src/scene/world.js');
const { systemArchitecture } = await import('../src/scene/systems.js');
const { stars } = await import('../src/scene/data.js');
const { beltRing, dustBand } = await import('../src/scene/minor-bodies.js');
const { meteorShowers, cometState, streamOf } = await import('../src/scene/comete.js');
const { sphereMesh } = await import('../src/renderer.js');
const { whatHappens } = await import('../src/craft/succede.js');

export const QUALITIES = ['high', 'balanced', 'low'];
export const QUALITY_NAMES = { high: 'dettaglio alto', balanced: 'bilanciato', low: 'leggero' };
/** Structural limits of one frame of a system, checked by tests/galassia.test.mjs. */
export const BUDGET = Object.freeze({ draws: 160, triangles: 1.2e6, instances: 2500, beltVertices: 200000, keptBelts: 3 });
const read = p => JSON.parse(fs.readFileSync(new URL('../' + p, import.meta.url), 'utf8'));

/** A renderer that records what a frame would send to the graphics card and draws nothing. */
export function counter(quality = 'high', w = 1600, h = 1000) {
    const R = {
        w, h, sceneQuality: quality, shadowKey: null, starCount: 1000000, meshes: new Map(), instanceSets: new Map(), frame: null,
        makeStars() {}, drawEnvironment() {}, drawStars() {}, renderShadow() {},
        makeMesh(id, d) { R.meshes.set(id, { count: d.i.length, vertices: d.v.length / (d.stride || 12) }); return id; },
        deleteMesh(id) { R.meshes.delete(id); },
        makeInstances(key, mesh, data) { if (!R.meshes.has(mesh)) throw Error('Mesh mancante per le istanze: ' + mesh); R.instanceSets.set(key, { mesh, n: data.length / 8 }); return key; },
        updateInstances(key, data) { const set = R.instanceSets.get(key); if (set) set.n = data.length / 8; },
        deleteInstances(key) { R.instanceSets.delete(key); },
        begin() { R.frame = { draws: 0, instanced: 0, triangles: 0, instances: 0 }; },
        drawMesh(id, vp, model, { instances = null, count = null } = {}) {
            const m = R.meshes.get(id); if (!m) return; const set = instances ? R.instanceSets.get(instances) : null; if (instances && !set) return;
            const f = R.frame; if (!f) return; f.draws++;
            if (set) { const n = Math.max(0, Math.min(set.n, count ?? set.n)); f.instanced++; f.instances += n; f.triangles += m.count / 3 * n; } else f.triangles += m.count / 3;
        },
    };
    return R;
}
/** The World of the site over the galaxy of the site (one million stars, seed 554412). */
export function world(quality = 'high') {
    const R = counter(quality), catalogue = read('content/catalogue.json'), modules = catalogue.modules || catalogue;
    const w = new World(R, {}, read('assets/scenes/manifest.json').biomes);
    w.bindStars(stars(1000000, 554412), modules);
    return { R, w, modules };
}
const percentile = (list, q) => { const s = [...list].sort((a, b) => a - b); return s[Math.min(s.length - 1, Math.floor(s.length * q))]; };
const mean = list => list.reduce((a, b) => a + b, 0) / Math.max(1, list.length);

/** One system at one setting: frames are drawn until the models of the stations and ships are built and the
 * camera has arrived, then `frames` frames of 1/60 s are measured. `follow(w, s)` may return the object
 * followed by the camera; the panel «Che cosa succede» is then worked out at every frame, as in src/app.js. */
export function measureSystem(ctx, id, quality, { frames = 240, follow = null, start = 300 } = {}) {
    const { R, w } = ctx, system = w.systems[id];
    R.sceneQuality = quality;
    const s = { scene: 'system', system: id, selected: system.planets[0], time: start, yaw: 0, pitch: .48, distance: 34, paused: false, lastFrameMs: 1000 / 60 };
    const step = () => { R.begin(); w.draw('system', s, ctx); if (s.follow && w.followed) whatHappens(w.followed.subject); s.time += 1 / 60; };
    const settle = min => { let n = 0; while (n < min || ((w.factory?.pending() || w.cameraProgress < 1) && n < 4000)) { step(); n++; } return n; };
    let warm = settle(30);
    if (follow) { s.follow = follow(w, s); warm += settle(90); }
    // In the browser the models are built by a module worker (src/craft/factory.js); here the factory works on
    // the main thread, so the time it takes during the measured frames is left out.
    const F = w.factory; let built = 0;
    if (F && !F.timed) { const pump = F.pump.bind(F); F.pump = () => { const t = performance.now(); pump(); F.spent += performance.now() - t; }; F.timed = true; }
    const ms = [], draws = [], triangles = [], instances = [];
    for (let k = 0; k < frames; k++) {
        if (F) F.spent = 0; const before = F?.stats.built || 0;
        const t = performance.now(); step(); ms.push(performance.now() - t - (F?.spent || 0)); built += (F?.stats.built || 0) - before;
        draws.push(R.frame.draws); triangles.push(R.frame.triangles); instances.push(R.frame.instances);
    }
    const c = w.craftStats || {};
    return { id, quality, warm, times: ms, ms: { mean: mean(ms), p95: percentile(ms, .95), worst: Math.max(...ms) }, draws: { mean: mean(draws), max: Math.max(...draws) },
        triangles: { mean: mean(triangles), max: Math.max(...triangles) }, instances: { mean: mean(instances), max: Math.max(...instances) },
        craft: { stations: c.stations || 0, ships: (c.ships || 0) + (c.visitors || 0), service: c.service || 0, full: c.full || 0, low: c.low || 0, light: c.light || 0 },
        built, followed: follow ? w.followed?.kind ?? null : null };
}
/** Belts of one system: rocks and dust as the scene builds them on the first visit, with the time to build them. */
export function beltCost(system) {
    const rock = sphereMesh(6, 4), t = performance.now(); let vertices = 0, triangles = 0, rocks = 0;
    for (const b of system.belts) {
        const per = Math.round(b.count / b.rings.length);
        b.rings.forEach((_, j) => { const m = beltRing(b, j, rock, per); vertices += m.v.length / 12; triangles += m.i.length / 3; rocks += per; });
        const d = dustBand(b); vertices += d.v.length / 12; triangles += d.i.length / 3;
    }
    return { id: system.id, belts: system.belts.length, rocks, vertices, triangles, bytes: vertices * 48 + triangles * 12, ms: performance.now() - t };
}
/** Belts, comets and showers worked out from the architecture of a system, as bindStars does once. */
export function minorCost(id) {
    const t = performance.now(), system = minorBodies({ ...systemArchitecture(id), id }), points = system.comets.reduce((n, c) => n + streamOf(c, system.map).length / 3, 0), a = performance.now();
    const showers = meteorShowers(system, system.comets, system.map), b = performance.now();
    return { id, comets: system.comets.length, streamPoints: points, showers: [...showers.values()].reduce((n, l) => n + l.length, 0), ms: a - t, showerMs: b - a };
}
/** The objects that can be followed in a system, each as a `follow` of the state. */
export const FOLLOWS = {
    stella: () => ({ kind: 'star' }),
    pianeta: (w, s) => ({ kind: 'planet', slot: w.systems[s.system].bodies.find(b => b.explorable).slot }),
    cometa: () => ({ kind: 'comet', k: 0 }),
    cintura: () => ({ kind: 'belt', k: 0, angle: 0 }),
    stazione: () => ({ kind: 'station', k: 0 }),
    // The ship on the longest trip still ahead: in travel the panel measures the length of the path at every frame.
    nave: (w, s) => { const list = w.craft.life.ships.filter(x => x.phase === 'travel'), ship = list.reduce((a, x) => (x.t1 > a.t1 ? x : a), list[0] || w.craft.life.ships[0]); return { kind: 'ship', id: ship.id }; },
    servizio: w => ({ kind: 'service', id: 0, plan: w.craft.serviceKey }),
};
/** Time of the shooting stars of one frame on the surface of a planet with air, inside and outside a shower. */
export function meteorCost(w, selected, time, calls = 2000) {
    const t = performance.now(); let n = 0; for (let k = 0; k < calls; k++) n += w.meteors({ selected, time: time + k / 60 }).length;
    return { ms: (performance.now() - t) / calls, perFrame: n / calls };
}
export function cometCost(w, id, calls = 20000) {
    const system = w.systems[id], c = system.comets[0], t = performance.now();
    for (let k = 0; k < calls; k++) cometState(c, 300 + k / 60, system.map, system.star);
    return (performance.now() - t) / calls;
}

// Numbers in Italian.
const dec = (v, n = 1) => v.toFixed(n).replace('.', ',');
const int = v => Math.round(v).toLocaleString('it-IT');
const mega = v => dec(v / 1e6, 2) + ' milioni';

export function report({ frames, results, belts, minors, follows, meteors, comet, machine }) {
    const by = q => results.filter(r => r.quality === q), worst = (list, f) => list.reduce((a, r) => (f(r) > f(a) ? r : a)), name = id => `${id}`;
    const L = [];
    L.push('# Prestazioni misurate della serie «Galassia viva»', '');
    L.push('Questo documento è generato da `node scripts/prestazioni.mjs`; `tests/galassia.test.mjs` ne controlla la struttura e i limiti. ' +
        `Ognuno dei ${new Set(results.map(r => r.id)).size} sistemi è stato disegnato dal codice del sito con la vista di «CENTRA» (distanza 34, inclinazione 0,48), dopo il tempo necessario a costruire i modelli delle stazioni e delle navi; seguono ${frames} fotogrammi da 1/60 di secondo misurati. ` +
        'Al posto della scheda grafica c\'è un contatore che applica le regole di `src/renderer.js`, per cui chiamate di disegno, triangoli e istanze sono quelli che il sito invia alla scheda. ' +
        `I tempi sono quelli del processore che prepara il fotogramma, misurati su ${machine}; il seme della sessione è fissato a ${SEED}, quindi due esecuzioni sulla stessa macchina disegnano la stessa scena.`, '');
    L.push('I tempi della scheda grafica dipendono dalla scheda e dalla risoluzione e si misurano nel browser aprendo il sito con `?diagnostica` nell\'indirizzo: il pannello in basso a destra riporta fotogrammi al secondo, tempo di disegno sul processore, chiamate di disegno e triangoli (`src/ui/diagnostics.js`).', '');
    L.push('## Un fotogramma di sistema', '');
    L.push('| Grafica | Tempo medio | 95° percentile | Peggiore | Chiamate di disegno (media / massimo) | Triangoli (massimo) | Istanze (massimo) | Mezzi di servizio in vista |');
    L.push('|---|---|---|---|---|---|---|---|');
    for (const q of QUALITIES) {
        const list = by(q);
        L.push(`| ${QUALITY_NAMES[q]} | ${dec(mean(list.map(r => r.ms.mean)), 2)} ms | ${dec(percentile(list.flatMap(r => r.times), .95), 2)} ms | ${dec(Math.max(...list.map(r => r.ms.worst)), 1)} ms | ${int(mean(list.map(r => r.draws.mean)))} / ${int(Math.max(...list.map(r => r.draws.max)))} | ${mega(Math.max(...list.map(r => r.triangles.max)))} | ${int(Math.max(...list.map(r => r.instances.max)))} | ${int(Math.min(...list.map(r => r.craft.service)))}–${int(Math.max(...list.map(r => r.craft.service)))} |`);
    }
    L.push('');
    const high = by('high'), slow = worst(high, r => r.ms.mean), heavy = worst(high, r => r.triangles.max), busy = worst(high, r => r.draws.max);
    L.push(`Il tempo medio è la media sui sistemi del tempo medio di ciascuno; il 95° percentile e il peggiore riguardano i singoli fotogrammi. Con il dettaglio alto il sistema ${name(slow.id)} è il più lento da preparare (${dec(slow.ms.mean, 2)} ms in media), il ${name(heavy.id)} il più ricco di triangoli (${mega(heavy.triangles.max)}) e il ${name(busy.id)} quello con più chiamate di disegno (${int(busy.draws.max)}). ` +
        'I mezzi di servizio in vista sono quelli disegnati nel fotogramma: restano fuori i rimorchiatori senza una stazione da servire e i caccia di scorta quando nessun convoglio da accompagnare è nel sistema. ' +
        `Un fotogramma a 60 al secondo dura 16,7 ms: la preparazione della scena ne occupa in media il ${dec(100 * mean(high.map(r => r.ms.mean)) / (1000 / 60), 0)} % con il dettaglio alto e il ${dec(100 * mean(by('low').map(r => r.ms.mean)) / (1000 / 60), 0)} % con la grafica leggera, e il resto rimane alla scheda grafica e all'interfaccia.`, '');
    L.push('Le chiamate di disegno restano le stesse alle tre impostazioni, perché ogni gruppo di navi o di mezzi della stessa classe è una sola chiamata con istanze: la grafica più leggera riduce le istanze e i triangoli e lascia invariato il numero delle chiamate.', '');
    L.push(`I limiti controllati dai test per un fotogramma di sistema sono ${int(BUDGET.draws)} chiamate di disegno, ${mega(BUDGET.triangles)} di triangoli e ${int(BUDGET.instances)} istanze.`, '');
    L.push('## Oggetto seguito e pannello «Che cosa succede»', '');
    L.push(`Sistema ${follows[0].id}, dettaglio alto: la camera segue l\'oggetto e il pannello è ricalcolato a ogni fotogramma, come nel sito.`, '');
    L.push('| Oggetto seguito | Tempo medio | 95° percentile | Chiamate di disegno (massimo) |');
    L.push('|---|---|---|---|');
    for (const f of follows) L.push(`| ${f.label} | ${dec(f.ms.mean, 2)} ms | ${dec(f.ms.p95, 2)} ms | ${int(f.draws.max)} |`);
    L.push('');
    L.push(`Il calcolo della posizione di una cometa con l\'equazione di Keplero richiede ${dec(comet * 1000, 1)} µs. Le stelle cadenti di un fotogramma sulla superficie di un pianeta con aria costano ${dec(meteors.quiet.ms * 1000, 1)} µs fuori dagli sciami e ${dec(meteors.shower.ms * 1000, 1)} µs durante uno sciame, quando se ne vedono in media ${dec(meteors.shower.perFrame, 2)} per fotogramma contro ${dec(meteors.quiet.perFrame, 2)}.`, '');
    L.push('## Cinture, comete e sciami', '');
    const V = belts.map(b => b.vertices), T = belts.map(b => b.ms);
    L.push(`Le maglie delle cinture si costruiscono alla prima visita di un sistema e restano in memoria per gli ultimi ${BUDGET.keptBelts} sistemi disegnati. ` +
        `Un sistema ha da ${int(Math.min(...belts.map(b => b.rocks)))} a ${int(Math.max(...belts.map(b => b.rocks)))} rocce nelle sue cinture, cioè da ${int(Math.min(...V))} a ${int(Math.max(...V))} vertici (${dec(Math.max(...belts.map(b => b.bytes)) / 2 ** 20, 1)} MiB al massimo), costruiti in ${dec(Math.min(...T), 1)}–${dec(Math.max(...T), 1)} ms. ` +
        `Con tre sistemi in memoria i vertici delle cinture sono al più ${int(3 * Math.max(...V))}. Cinture, comete e scie dei ${belts.length} sistemi si calcolano in ${dec(minors.reduce((a, m) => a + m.ms, 0), 1)} ms all\'apertura della galassia; ogni cometa porta ${int(minors[0].streamPoints / minors[0].comets)} granuli della sua scia, disegnati in una sola chiamata. Gli sciami di un sistema si calcolano la prima volta che servono, in ${dec(Math.min(...minors.map(m => m.showerMs)), 1)}–${dec(Math.max(...minors.map(m => m.showerMs)), 1)} ms.`, '');
    L.push('| Sistema | Cinture | Rocce | Vertici | Costruzione | Comete | Sciami |');
    L.push('|---|---|---|---|---|---|---|');
    for (const b of belts) { const m = minors.find(x => x.id === b.id); L.push(`| ${b.id} | ${b.belts} | ${int(b.rocks)} | ${int(b.vertices)} | ${dec(b.ms, 1)} ms | ${m.comets} | ${m.showers} |`); }
    L.push('', '## Sistemi uno per uno', '');
    L.push('Tempo medio di preparazione e chiamate di disegno massime per fotogramma, per ognuna delle tre impostazioni.', '');
    L.push('| Sistema | Alto | Bilanciato | Leggero | Stazioni | Navi | Servizio in vista (alto) |');
    L.push('|---|---|---|---|---|---|---|');
    for (const r of high) {
        const b = results.find(x => x.id === r.id && x.quality === 'balanced'), l = results.find(x => x.id === r.id && x.quality === 'low');
        L.push(`| ${r.id} | ${dec(r.ms.mean, 2)} ms · ${int(r.draws.max)} | ${dec(b.ms.mean, 2)} ms · ${int(b.draws.max)} | ${dec(l.ms.mean, 2)} ms · ${int(l.draws.max)} | ${r.craft.stations} | ${r.craft.ships} | ${r.craft.service} |`);
    }
    L.push('');
    return L.join('\n');
}

if (MAIN) {
    const arg = (k, d) => { const i = process.argv.indexOf('--' + k); return i > 0 ? process.argv[i + 1] : d; };
    const frames = +arg('frames', 240), ids = arg('systems', null)?.split(',').map(Number) ?? Array.from({ length: 30 }, (_, i) => i), out = arg('out', 'docs/PRESTAZIONI.md');
    const machine = `${os.cpus()[0].model.replace(/\s+/g, ' ').trim()}, Node ${process.version}`;
    const ctx = world('high'), results = [];
    // The first frames run while the JavaScript engine is still compiling the code: one system is drawn at
    // every setting before the measures start.
    for (const q of QUALITIES) measureSystem(ctx, ids.at(-1), q, { frames: 300 });
    for (const q of QUALITIES) for (const id of ids) { results.push(measureSystem(ctx, id, q, { frames })); process.stderr.write(`${q} ${id} ${results.at(-1).ms.mean.toFixed(2)} ms ${results.at(-1).draws.max}\n`); }
    const target = ids.includes(13) ? 13 : ids[0], follows = [{ ...measureSystem(ctx, target, 'high', { frames }), label: 'nessuno', id: target }];
    for (const [label, f] of Object.entries(FOLLOWS)) { const r = measureSystem(ctx, target, 'high', { frames, follow: f }); follows.push({ ...r, label, id: target }); process.stderr.write(`segue ${label} ${r.followed} ${r.ms.mean.toFixed(2)} ms\n`); }
    ids.forEach(minorCost); beltCost(ctx.w.systems[ids[0]]);
    const belts = ids.map(id => beltCost(ctx.w.systems[id])), minors = ids.map(minorCost);
    const G = (await import('../src/worlds/genome.js')).planetCards();
    const shower = (() => { for (const x of ctx.w.systems) { const sh = meteorShowers(x, x.comets, x.map); for (const [slot, list] of sh) { const body = x.bodies.find(b => b.slot === slot); if (Number.isInteger(body.index) && G[body.index].atmosphere.density >= .3) return { body, x: list[0] }; } } return null; })();
    ctx.w.surface = { genome: G[shower.body.index] }; ctx.w.eye = [0, 4, 0]; ctx.w.target = [10, 4, 0];
    const t = (shower.x.mean - shower.body.phase) / shower.body.speed + 50 * 2 * Math.PI / shower.body.speed, quiet = t + Math.PI / shower.body.speed;
    meteorCost(ctx.w, shower.body.index, t - 5, 600); meteorCost(ctx.w, shower.body.index, quiet, 600);
    const meteors = { shower: meteorCost(ctx.w, shower.body.index, t - 5, 600), quiet: meteorCost(ctx.w, shower.body.index, quiet, 600) };
    cometCost(ctx.w, target);
    const md = report({ frames, results, belts, minors, follows, meteors, comet: cometCost(ctx.w, target), machine });
    fs.writeFileSync(out, md);
    console.log(`Scritto ${out}: ${results.length} misure, ${follows.length - 1} oggetti seguiti`);
}
