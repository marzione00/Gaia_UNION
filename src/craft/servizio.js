/** Service traffic of a system (1.57.0): the small craft that make a system look inhabited, drawn as 3D models.
 * Shuttles run back and forth between neighbouring stations, between the gate and the stations near it and on
 * regular lines from the main port to every station;
 * barges circle the busiest stations and dock one at a time; tugs tow containers from the shipyard; miners
 * work the asteroid belt or circle the mines; tankers refuel the ships docked at the stations; fighters escort
 * the convoys of the neighbouring systems; maintenance pods circle every station and inspect its hull. The plan depends on the stations of the system and on the
 * graphics quality; positions are a function of time, so the traffic costs no simulation step. */
import { Kit, TAU } from './kit.js';
import { style } from './styles.js';

export const SERVICE_KINDS = Object.freeze(['navetta', 'chiatta', 'rimorchiatore', 'container', 'minatore', 'cisterna', 'scorta', 'manutenzione']);
export const SERVICE_NAMES = Object.freeze({ navetta: 'Navetta di servizio', chiatta: 'Chiatta', rimorchiatore: 'Rimorchiatore', container: 'Container', minatore: 'Minatore', cisterna: 'Cisterna', scorta: 'Caccia di scorta', manutenzione: 'Modulo di manutenzione' });
/** What each kind does, for the hover card of the scene. */
export const SERVICE_ABOUT = Object.freeze({ navetta: 'Navetta di servizio: porta equipaggi, ricambi e piccoli carichi fra stazioni vicine.', chiatta: 'Chiatta da carico: aspetta il suo turno in coda e attracca quando il molo si libera.', rimorchiatore: 'Rimorchiatore: traina i container dal cantiere, o dalla porta, alle stazioni.', container: 'Container trainato da un rimorchiatore.', minatore: 'Minatore: estrae minerale dalla fascia degli asteroidi o lo porta alle miniere.', cisterna: 'Cisterna: rifornisce di propellente le navi attraccate alle stazioni.', scorta: 'Caccia di scorta: accompagna i convogli dei sistemi vicini lungo la rotta.', manutenzione: 'Modulo di manutenzione: gira attorno alla stazione e ne controlla lo scafo.' });
/** Drawn radius of each kind, in system units: a cargo ship of the economy is 0.1. */
export const SERVICE_SIZE = Object.freeze({ navetta: .035, chiatta: .05, rimorchiatore: .04, container: .03, minatore: .035, cisterna: .045, scorta: .03, manutenzione: .022 });
/** Mean speed on a trip of the craft that go back and forth, in system units per second. */
export const SERVICE_SPEED = Object.freeze({ navetta: .9, rimorchiatore: .45 });
/** Share of the traffic drawn at each graphics quality. */
export const SERVICE_BUDGET = Object.freeze({ high: 1, balanced: .65, low: .35 });
/** Station types where barges queue, beyond the gate. */
const BUSY = new Set(['porto', 'magazzino', 'deposito', 'habitat', 'cantiere']), MINES = new Set(['miniera', 'ghiaccio']);
const smooth = u => u * u * (3 - 2 * u), norm = v => { const l = Math.hypot(...v); return l > 1e-9 ? v.map(x => x / l) : [0, 0, 1]; };
const mix = (a, b, u) => a.map((v, i) => v + (b[i] - v) * u), dist = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
const frac = v => v - Math.floor(v), DWELL = 3;

/** Pairs of stations: each with its nearest neighbour, once per pair. */
export function serviceLanes(points) {
    const pairs = new Map();
    points.forEach((p, a) => { let best = -1, d = Infinity; points.forEach((q, b) => { if (b !== a && dist(p, q) < d) { d = dist(p, q); best = b; } }); if (best >= 0) pairs.set(Math.min(a, best) + ':' + Math.max(a, best), [Math.min(a, best), Math.max(a, best)]); });
    return [...pairs.values()];
}
/** The craft of a system. `stations` lists { type, level } in the order of the scene and `points` their
 * positions at `time`, when the plan is made; `belt` is { inner, outer } or null; `quality` is high, balanced
 * or low. The craft that travel start their first trip within twenty seconds of `time`. */
export function planService({ stations, points, belt = null, quality = 'high', time = 0 }) {
    const share = SERVICE_BUDGET[quality] ?? 1, keep = list => list.slice(0, Math.ceil(list.length * share)), out = [];
    const gate = stations.findIndex(s => s.type === 'porta'), yard = stations.findIndex(s => s.type === 'cantiere');
    // Shuttles: three on each lane, one more for each level a station of the lane has grown; two more from
    // the gate to each of its three nearest stations.
    const lanes = serviceLanes(points), shuttles = [];
    const start = offset => time - frac(offset) * 20;
    for (const [a, b] of lanes) { const n = 3 + Math.min(2, Math.max(stations[a].level || 1, stations[b].level || 1) - 1); for (let q = 0; q < n; q++) shuttles.push({ kind: 'navetta', role: 'spola', a, b, start: start(q / n + a * .37 + b * .11), flip: q % 2 }); }
    if (gate >= 0) points.map((p, k) => [k, dist(p, points[gate])]).filter(([k]) => k !== gate && !lanes.some(l => l.includes(gate) && l.includes(k))).sort((x, y) => x[1] - y[1]).slice(0, 3)
        .forEach(([k]) => { for (let q = 0; q < 2; q++) shuttles.push({ kind: 'navetta', role: 'spola', a: gate, b: k, start: start(q / 2 + k * .29), flip: q }); });
    // Regular lines: one shuttle from the main port, or from the gate, to every other station, across the
    // whole system.
    const hub = stations.findIndex(s => s.type === 'porto') >= 0 ? stations.findIndex(s => s.type === 'porto') : gate;
    if (hub >= 0) stations.forEach((s, k) => { if (k !== hub && !lanes.some(l => l.includes(hub) && l.includes(k))) shuttles.push({ kind: 'navetta', role: 'spola', a: hub, b: k, start: start(k * .618), flip: k % 2, line: true }); });
    // Barges queue at the gate and at the busiest stations, three each, docking in turn.
    const queues = [];
    stations.map((s, k) => k).filter(k => k === gate || BUSY.has(stations[k].type)).slice(0, 4).forEach(k => { for (let j = 0; j < 3; j++) queues.push({ kind: 'chiatta', role: 'attesa', at: k, slot: j }); });
    // Tugs tow containers from the shipyard, or from the gate, to the stations in turn; the target changes
    // while the tug waits at the yard.
    const from = yard >= 0 ? yard : gate, tugs = [];
    if (from >= 0) { const targets = points.map((p, k) => k).filter(k => k !== from); for (let j = 0; j < 3; j++) tugs.push({ kind: 'rimorchiatore', role: 'traino', from, targets: targets.filter((_, i) => i % 3 === j), start: time - j * 9 }); }
    // Miners: sixteen in the belt, or three around each mine.
    const miners = [];
    if (belt) for (let j = 0; j < 16; j++) miners.push({ kind: 'minatore', role: 'fascia', angle: j / 16 * TAU + frac(j * .618) * .3, radius: belt.inner + (belt.outer - belt.inner) * frac(j * .381 + .2), lift: (frac(j * .73) - .5) * .3 });
    else stations.forEach((s, k) => { if (MINES.has(s.type)) for (let j = 0; j < 3; j++) miners.push({ kind: 'minatore', role: 'miniera', at: k, slot: j }); });
    // Tankers for the ships docked at the gate and at the busiest stations, one each, and escorts for the
    // convoys.
    const parks = [...stations.map((s, k) => k).filter(k => k === gate), ...stations.map((s, k) => k).filter(k => k !== gate && BUSY.has(stations[k].type)), ...stations.map((s, k) => k).filter(k => k !== gate && !BUSY.has(stations[k].type))].slice(0, 6);
    const tankers = parks.map((park, n) => ({ kind: 'cisterna', role: 'rifornimento', n, park }));
    const escorts = Array.from({ length: 8 }, (_, n) => ({ kind: 'scorta', role: 'scorta', n: n >> 1, side: n % 2 ? 1 : -1 }));
    // Maintenance pods: two around each station, one more for each level it has grown.
    const pods = [];
    stations.forEach((s, k) => { const n = 2 + Math.min(2, (s.level || 1) - 1); for (let j = 0; j < n; j++) pods.push({ kind: 'manutenzione', role: 'ronda', at: k, slot: j, of: n }); });
    const lists = [keep(pods), keep(shuttles), keep(queues), tugs.slice(0, Math.max(1, Math.ceil(tugs.length * share))), keep(miners), keep(tankers), escorts.slice(0, 2 * Math.max(1, Math.ceil(escorts.length / 2 * share)))];
    for (const list of lists) out.push(...list);
    return out.map((v, id) => ({ id, ...v }));
}
/** Dock point of a station for the service traffic: outside its radius, on the side of `toward`. */
const dock = (st, toward) => { const d = norm(toward.map((v, i) => v - st.position[i])); return st.position.map((v, i) => v + d[i] * (st.radius * 1.6 + .05)); };
/** The trips of a craft that goes back and forth: trip n starts at a stop of DWELL seconds and then travels
 * for `length(n, t)` seconds, measured on the places of the stations when the trip starts at t. Stations on
 * different planets move apart and together, so each trip takes the time its own distance needs. The starts
 * are kept on the plan entry and found again for earlier times, such as the wake one second and a half ago. */
function trip(v, time, length) {
    const t0 = v.start;
    if (time <= t0) return { n: 0, start: t0, T: length(0, t0) };
    let list = v.trips;
    if (!list || time < list[0][1]) list = v.trips = [[0, t0, length(0, t0)]];
    let i = list.length - 1;
    while (i > 0 && list[i][1] > time) i--;
    let [n, start, T] = list[i];
    while (time >= start + DWELL + T) { start += DWELL + T; n++; T = length(n, start); list.push([n, start, T]); if (list.length > 32) list.shift(); }
    return { n, start, T };
}
/** Position on trip `r` from pa to pb, both taken at `time`: the stop at pa, then the arc to pb. */
function along(pa, pb, r, time) {
    const t = time - r.start;
    if (t < DWELL) return { position: pa, forward: norm(pb.map((x, i) => x - pa[i])), moving: false, left: DWELL - t };
    const u = smooth(Math.min(1, (t - DWELL) / r.T)), d = dist(pa, pb), p = mix(pa, pb, u); p[1] += Math.sin(u * Math.PI) * d * .06;
    return { position: p, forward: norm(pb.map((x, i) => x - pa[i])), moving: true, left: DWELL + r.T - t };
}
/** Where a craft of the plan is at `time`. `ctx` gives `station(k)` → { position, radius } at `time`,
 * `stationAt(k, t)` the same at any time t, `names[k]`, the
 * `docked` ships ({ id, at, position, forward, name, t0, t1 }, `at` the index of their station), the convoys of the neighbouring systems
 * (`visitors`: { id, position, forward, name, docked }) and the belt
 * rotation `beltSpin` in radians per second. The result tells what the craft is doing, for the scene and its
 * hover lines: `tow` is the container behind a tug, `beam` a mining beam, `link` a refuelling hose. */
export function servicePose(v, time, ctx) {
    const size = SERVICE_SIZE[v.kind], at = k => ctx.station(k), name = k => ctx.names[k], when = (k, t) => ctx.stationAt ? ctx.stationAt(k, t) : ctx.station(k);
    if (v.role === 'spola') {
        // Odd trips go from b to a; half the shuttles of a lane start from b.
        const ends = (n, t) => { const [x, y] = (n + v.flip) % 2 ? [v.b, v.a] : [v.a, v.b], X = when(x, t), Y = when(y, t); return [x, y, dock(X, Y.position), dock(Y, X.position)]; };
        const r = trip(v, time, (n, t) => { const e = ends(n, t); return Math.max(1.5, dist(e[2], e[3]) / SERVICE_SPEED.navetta); }), [x, y, pa, pb] = ends(r.n, time), p = along(pa, pb, r, time);
        const lines = p.moving ? [`Verso ${name(y)}`, `${v.line ? 'Linea regolare, a' : 'A'}rrivo fra ${Math.ceil(p.left)} s`] : [`Attraccata a ${name(x)}`, `Riparte fra ${Math.ceil(p.left)} s`];
        return { ...p, size, visible: true, lines };
    }
    if (v.role === 'attesa') {
        // A cycle of 60 s: each barge has 20 s, of which 4 to approach, 4 docked and 4 to rejoin the circle.
        const S = at(v.at), R = S.radius * 3 + .25, a = time * .12 + v.slot * TAU / 3, ring = [S.position[0] + Math.cos(a) * R, S.position[1] + .05 * Math.sin(a * 2), S.position[2] + Math.sin(a) * R];
        const t = frac(time / 60) * 60 - v.slot * 20, port = dock(S, ring), tangent = norm([-Math.sin(a), 0, Math.cos(a)]);
        if (t >= 0 && t < 12) { const u = t < 4 ? smooth(t / 4) : t < 8 ? 1 : smooth((12 - t) / 4), p = mix(ring, port, u); return { position: p, forward: t < 8 ? norm(port.map((x, i) => x - ring[i])) : tangent, size, visible: true, moving: t < 4 || t >= 8, lines: [t < 8 ? `Attracca a ${name(v.at)}` : `Lascia ${name(v.at)}`, 'Carico e scarico a turno, una chiatta alla volta'] }; }
        const wait = Math.ceil(((v.slot * 20 - frac(time / 60) * 60) % 60 + 60) % 60);
        return { position: ring, forward: tangent, size, visible: true, moving: true, lines: [`In coda a ${name(v.at)}`, `Attracca fra ${wait} s`] };
    }
    if (v.role === 'traino') {
        if (!v.targets.length) return { position: at(v.from).position, forward: [0, 0, 1], size, visible: false, lines: [] };
        // Even trips tow a container from above the yard, the same point for every target, odd trips return
        // empty; the target changes at each outward trip.
        const ends = (n, t) => { const F = when(v.from, t), k = v.targets[(n >> 1) % v.targets.length], T = when(k, t), yard = [F.position[0], F.position[1] + F.radius * 1.6 + .05, F.position[2]], there = dock(T, F.position); return [k, ...(n % 2 ? [there, yard] : [yard, there])]; };
        const r = trip(v, time, (n, t) => { const e = ends(n, t); return Math.max(2, dist(e[1], e[2]) / SERVICE_SPEED.rimorchiatore); }), [k, pa, pb] = ends(r.n, time), p = along(pa, pb, r, time), out = r.n % 2 === 0;
        const tow = out ? { position: p.position.map((x, i) => x - p.forward[i] * size * 2.4), forward: p.forward } : null;
        return { ...p, size, visible: true, tow, lines: out ? [`Container per ${name(k)}`, p.moving ? `Lo traina, arrivo fra ${Math.ceil(p.left)} s` : 'Aggancia il container'] : [`Torna vuoto a ${name(v.from)}`, p.moving ? `Arrivo fra ${Math.ceil(p.left)} s` : 'Sgancia il container'] };
    }
    if (v.role === 'fascia') {
        // The miner moves with the belt, hovers over a rock and fills its hold in two minutes.
        // The scene turns the belt by −beltSpin · time around the vertical axis (transform in src/renderer.js).
        const a = v.angle - time * (ctx.beltSpin ?? .0008), bob = Math.sin(time * .7 + v.angle * 5) * .04, p = [Math.cos(a) * v.radius, v.lift + bob, Math.sin(a) * v.radius], rock = [Math.cos(a) * (v.radius - .12), v.lift - .05, Math.sin(a) * (v.radius - .12)];
        return { position: p, forward: norm(rock.map((x, i) => x - p[i])), size, visible: true, moving: false, beam: [p, rock], lines: ['Estrae minerale nella fascia degli asteroidi', `Stiva piena al ${Math.round(frac(time / 120 + v.angle) * 100)} %`] };
    }
    if (v.role === 'miniera') {
        const S = at(v.at), a = time * .3 + v.slot * TAU / 3, R = S.radius * 2.2 + .1, p = [S.position[0] + Math.cos(a) * R, S.position[1] + .08 * Math.sin(a), S.position[2] + Math.sin(a) * R];
        return { position: p, forward: norm([-Math.sin(a), 0, Math.cos(a)]), size, visible: true, moving: true, beam: [p, S.position], lines: [`Porta minerale a ${name(v.at)}`, 'Giro di carico attorno alla miniera'] };
    }
    if (v.role === 'rifornimento') {
        // Each tanker serves the ships docked at its station, the one docked first; it reaches the ship in four
        // seconds and leaves four seconds before the ship departs.
        const P = at(v.park), a = v.n * .5 + 2, park = [P.position[0] + Math.cos(a) * (P.radius * 2.6 + .2), P.position[1] - .1, P.position[2] + Math.sin(a) * (P.radius * 2.6 + .2)];
        const ship = (ctx.docked || []).filter(d => d.at === v.park && time >= d.t0 && time <= d.t1).sort((x, y) => x.t0 - y.t0 || x.id - y.id)[0];
        if (ship) {
            const side = norm([ship.forward[2], 0, -ship.forward[0]]), beside = ship.position.map((x, i) => x + side[i] * .12), u = smooth(Math.max(0, Math.min(1, (time - ship.t0) / 4, (ship.t1 - time) / 4))), p = mix(park, beside, u);
            if (u > .98) return { position: p, forward: ship.forward, size, visible: true, moving: false, link: [p, ship.position], lines: [`Rifornisce ${ship.name}`, `Trasferisce propellente per ${Math.max(0, Math.ceil(ship.t1 - time - 4))} s`] };
            return { position: p, forward: norm(beside.map((x, i) => x - park[i]).map(x => (time - ship.t0 < 4 ? x : -x))), size, visible: true, moving: true, lines: [time - ship.t0 < 4 ? `Si avvicina a ${ship.name}` : `Lascia ${ship.name}`, 'Rifornimento di propellente'] };
        }
        return { position: park, forward: norm(P.position.map((x, i) => x - park[i])), size, visible: true, moving: false, lines: [`In attesa presso ${name(v.park)}`, 'Pronta a rifornire le navi in arrivo'] };
    }
    if (v.role === 'scorta') {
        // Two fighters for each convoy whose number leaves remainder n on division by four.
        const c = (ctx.visitors || []).find(x => x.id % 4 === v.n);
        if (!c) return { position: [0, 0, 0], forward: [0, 0, 1], size, visible: false, lines: [] };
        const side = norm([c.forward[2], 0, -c.forward[0]]), p = c.position.map((x, i) => x + side[i] * v.side * .16 - c.forward[i] * .08 + (i === 1 ? .03 : 0));
        return { position: p, forward: c.forward, size, visible: true, moving: true, lines: [`Scorta il ${c.name.replace(/^Convoglio/, 'convoglio')}`, c.docked ? 'In attesa accanto al convoglio attraccato' : 'In formazione al suo fianco'] };
    }
    if (v.role === 'ronda') {
        // A slow orbit on a tilted plane, one per pod, with a stop every 40 s to inspect a point of the hull.
        const S = at(v.at), t = time + v.at * 7.3 + v.slot * 13, lap = 40, a = t * TAU / lap / 2 + v.slot * TAU / v.of, tilt = .5 + v.slot * .7, R = S.radius * 1.35 + .04;
        const c = Math.cos(tilt), d = Math.sin(tilt), x = Math.cos(a) * R, y = Math.sin(a) * R, p = [S.position[0] + x, S.position[1] + y * d, S.position[2] + y * c];
        const forward = norm([-Math.sin(a), Math.cos(a) * d, Math.cos(a) * c]), check = frac(t / lap) > .8;
        return { position: p, forward, size, visible: true, moving: !check, scan: check ? [p, mix(p, S.position, .6)] : null, lines: [`Ispeziona ${name(v.at)}`, check ? 'Controllo dello scafo in corso' : `Prossimo controllo dello scafo fra ${Math.ceil((.8 - frac(t / lap)) * lap)} s`] };
    }
    throw new Error('ruolo sconosciuto: ' + v.role);
}

/** The models of the service craft, built once: forward along +z, up along +y, radius 1. */
export function serviceMesh(kind) {
    const civil = style('civile'), k = new Kit(kind === 'scorta' ? style('difesa') : civil), ENGINE = kind === 'scorta' ? [1, .62, .28, 1] : [.55, .8, 1, 1];
    const along = (fn) => { k.push([0, 0, 0], [Math.PI / 2, 0, 0]); fn(); k.pop(); };
    const nozzle = (x, y, z, r = .1) => { k.glow(ENGINE, 3); k.sphere([x, y, z], r, 8, 6); };
    if (kind === 'navetta') { k.hull(); along(() => k.capsule(.3, -.75, .55, 14)); k.glass(.4); k.box([0, .2, .6], [.15, .08, .14]); k.dark(); k.box([0, -.06, -.1], [.75, .035, .22]); k.trim(); k.box([0, .32, -.6], [.03, .17, .12]); nozzle(0, 0, -1.08); }
    else if (kind === 'chiatta') { k.hull(); k.box([0, 0, 0], [.42, .16, 1]); for (const z of [-.45, .05, .55]) { k.trim(); k.box([0, .3, z], [.32, .13, .2]); } k.dark(); k.box([0, .34, -.86], [.2, .16, .12]); k.glass(.4); k.box([0, .4, -.73], [.16, .05, .02]); nozzle(-.25, 0, -1.04, .09); nozzle(.25, 0, -1.04, .09); }
    else if (kind === 'rimorchiatore') { k.hull(); k.box([0, 0, .15], [.4, .28, .5]); k.glass(.4); k.box([0, .2, .66], [.28, .08, .02]); k.dark(); for (const x of [-.55, .55]) { k.push([x, 0, -.05]); along(() => k.cyl(.17, .17, -.55, .45, 12)); k.pop(); nozzle(x, 0, -.64, .12); } k.steel(); k.box([0, 0, -.6], [.12, .12, .22]); }
    else if (kind === 'container') { k.trim(); k.box([0, 0, 0], [.5, .5, 1]); k.accent(.2); k.box([0, 0, 0], [.52, .08, 1.02]); k.steel(); k.box([0, 0, 1.02], [.1, .1, .04]); }
    else if (kind === 'minatore') { k.hull(); k.box([0, 0, 0], [.4, .3, .55]); k.dark(); k.box([0, .38, -.1], [.34, .13, .4]); k.steel(); k.beam([0, -.05, .5], [0, -.22, .95], .06); k.push([0, -.22, .95]); along(() => k.cyl(.14, .01, 0, .32, 10)); k.pop(); k.glass(.4); k.box([0, .12, .56], [.2, .07, .02]); nozzle(0, 0, -.64); }
    else if (kind === 'cisterna') { k.steel(); for (const x of [-.3, .3]) { k.push([x, 0, -.15]); along(() => k.capsule(.27, -.6, .45, 14)); k.pop(); } k.hull(); k.box([0, .04, .85], [.32, .25, .2]); k.glass(.4); k.box([0, .16, 1.05], [.24, .07, .02]); nozzle(0, 0, -1.08); }
    else if (kind === 'manutenzione') { k.hull(); k.sphere([0, 0, 0], .42, 12, 8); k.dark(); k.box([0, 0, -.38], [.2, .2, .1]); k.steel(); for (const x of [-.32, .32]) k.beam([x, -.1, .2], [x * 1.4, -.25, .85], .05); k.glass(.5); k.box([0, .12, .38], [.17, .09, .04]); k.accent(.2); k.box([0, .44, 0], [.03, .12, .03]); nozzle(0, 0, -.52, .08); }
    else if (kind === 'scorta') { k.dark(); k.box([0, 0, .05], [.12, .1, .85]); k.hull(); k.box([0, -.02, -.25], [.72, .03, .26]); k.box([0, .18, -.6], [.03, .16, .14]); k.glass(.5); k.box([0, .12, .45], [.08, .05, .16]); nozzle(-.08, 0, -.86, .08); nozzle(.08, 0, -.86, .08); }
    else throw new Error('mezzo sconosciuto: ' + kind);
    const mesh = k.mesh(), v = mesh.v;
    let lo = [Infinity, Infinity, Infinity], hi = [-Infinity, -Infinity, -Infinity];
    for (let i = 0; i < v.length; i += 16) for (let a = 0; a < 3; a++) { lo[a] = Math.min(lo[a], v[i + a]); hi[a] = Math.max(hi[a], v[i + a]); }
    const c = lo.map((x, a) => (x + hi[a]) / 2);
    let r = 0; for (let i = 0; i < v.length; i += 16) { for (let a = 0; a < 3; a++) v[i + a] -= c[a]; r = Math.max(r, Math.hypot(v[i], v[i + 1], v[i + 2])); }
    for (let i = 0; i < v.length; i += 16) for (let a = 0; a < 3; a++) v[i + a] /= r;
    return mesh;
}
