/** Where the stations of a system sit. Each station orbits a host body chosen for its role (refineries
 * around gas giants, greenhouses around habitable worlds, telescopes far from the star), mines move with
 * the asteroid belt and the passage gate stands beyond the belt, facing the star. Positions are in system
 * units (src/scene/systems.js); `radiusOf(body)` is the drawn radius of a body (displayRadius in
 * src/scene/world.js). */
import { seededRandom } from '../scene/layout.js';

const GIANTS = ['gas', 'ringed', 'icegiant'], ICY = ['icegiant', 'arctic'], LIVING = ['oceanic', 'terrestrial'];
/** Drawn size (radius in system units) of each kind of station. */
export const STATION_SIZE = { porto: .2, porta: .55, miniera: .17, default: .15 };
/** Rotation of a belt without rings, backwards (radians per unit of time), as before 1.60.0. */
export const BELT_SPIN = .0008;
/** Angular speed of a station in a belt: forwards with the ring of the belt that holds it (src/scene/comete.js),
 * or backwards at BELT_SPIN for a belt without rings. */
function beltSpin(belt, distance) {
    if (!belt.rings) return -BELT_SPIN;
    const j = Math.min(belt.rings.length - 1, Math.max(0, Math.floor((distance - belt.inner) / (belt.outer - belt.inner) * belt.rings.length)));
    return belt.rings[j].omega;
}

/** Host preferences of each station type: an ordered list of tests on the bodies of the system. */
const PREFER = {
    porto: [b => b.explorable],
    raffineria: [b => b.type === 'gas', b => b.type === 'ringed', b => GIANTS.includes(b.type)],
    laboratorio: [b => b.type === 'ringed', b => GIANTS.includes(b.type), b => b.type === 'volcanic'],
    serra: [b => b.explorable && LIVING.includes(b.type), b => LIVING.includes(b.type), b => b.explorable],
    poliedrica: [b => b.explorable],
    centrale: [(b, all) => b === all[0], (b, all) => b === all[1]],
    deposito: [b => ICY.includes(b.type)],
    telescopio: [(b, all) => b === all.at(-1), (b, all) => b === all.at(-2)],
    radiotelescopio: [(b, all) => b === all.at(-2), (b, all) => b === all.at(-1), (b, all) => b === all.at(-3)]
};

/** Host preferences of the roles of the type grammar (src/craft/grammar.js), used for the stations added in
 * 1.43.0; shipyards stay with the port and relays sit between the orbits of the planets. */
const PREFER_ROLE = {
    abitazione: [b => b.explorable && LIVING.includes(b.type), b => b.explorable, b => LIVING.includes(b.type)],
    cantiere: [b => b.explorable],
    fonderia: [b => b.type === 'volcanic', b => ['rocky', 'barren', 'desert'].includes(b.type)],
    chimica: [b => GIANTS.includes(b.type), b => b.type === 'acid'],
    energia: [(b, all) => all.indexOf(b) < 3],
    ricerca: [b => b.type === 'ringed', b => b.explorable, b => GIANTS.includes(b.type)],
    osservazione: [(b, all) => all.indexOf(b) >= all.length - 3],
    agricoltura: [b => LIVING.includes(b.type), b => b.type === 'desert'],
    deposito: [b => ICY.includes(b.type), (b, all) => all.indexOf(b) >= all.length - 4],
    comunicazioni: []
};
/** Angle of each defensive station from the gate along the defence line (1.47.0). */
const DEFENCE_PHASE = { baseflotta: .17, fortezza: -.17, scudo: .34, piattaforma: -Math.PI * .55, sorveglianza: Math.PI };
/** At most three stations orbit one planet; the next ones move to the gaps between the orbits. */
const PER_HOST = 3;

/** Placements of the stations of `system` (the result of systemArchitecture, with `id`), for the catalogue
 * entries `entries` of that system, in order. The six classic stations come first and keep the placements
 * they had before 1.43.0; the stations of the grammar follow. */
export function placeStations(system, entries, radiusOf) {
    const bodies = system.bodies, used = new Map(), rng = seededRandom(0x5741 ^ Math.imul(system.id + 1, 0x2C1B3C6D)), out = [];
    const pick = type => {
        const tests = PREFER[type] || [];
        // Prefer a body that has no station yet, then any body that passes the test, then any free body.
        for (const free of [true, false]) for (const test of tests) { const b = bodies.find(x => test(x, bodies) && (!free || !used.has(x.slot))); if (b) return b; }
        return bodies.find(x => !used.has(x.slot)) || bodies[0];
    };
    let port = null, lanes = null, ring = 0; const pending = [], guard = [];
    // Lanes around the star between consecutive orbits, clear of the planets, of their eccentric paths and
    // of the stations orbiting them (also inside the first orbit and outside the last one): stations in a
    // lane share radius and speed, so they never meet each other, and stay at least half the lane width
    // from every planet. Lanes are drawn after all the planet orbits are assigned.
    const lane = near => {
        if (!lanes) {
            const edges = bodies.map(b => [b.orbit * (1 - b.eccentricity) - reach(b), b.orbit * (1 + b.eccentricity) + reach(b), b]);
            const inner = system.starRadius * 3 + 1, outer = system.belt ? system.belt.inner - .3 : system.outerRadius + 1;
            lanes = [[inner, edges[0][0], edges[0][2], 0], ...edges.slice(1).map((e, i) => [edges[i][1], e[0], edges[i][2], i + 1]), [edges.at(-1)[1], outer, edges.at(-1)[2], edges.length]]
                .map(([lo, hi, ref, i]) => ({ i, r: (lo + hi) / 2, w: (hi - lo) / 2, speed: ref.speed * Math.pow(ref.orbit / ((lo + hi) / 2), 1.5), phase: rng() * Math.PI * 2, n: 0 }))
                .filter(l => l.w >= .3);
        }
        const open = lanes.filter(l => l.n < 6);
        if (!open.length) return null;
        const at = near ? bodies.indexOf(near) : -1, l = open.reduce((m, x) => { const d = at < 0 ? 0 : Math.min(Math.abs(x.i - at), Math.abs(x.i - at - 1)), e = at < 0 ? 0 : Math.min(Math.abs(m.i - at), Math.abs(m.i - at - 1)); return d < e || d === e && x.n < m.n ? x : m; });
        return { l, j: l.n++ };
    };
    // An added station orbits a planet only when the orbit stays inside the clearance between the planet and
    // the neighbouring orbits, at least 0.4 units beyond the previous station of that planet.
    const orbitOf = (host, size) => Math.max(radiusOf(host) * 1.5 + size * 1.5, ...out.filter(p => p.kind === 'orbit' && p.host === host.slot).map(p => p.distance + Math.max(radiusOf(host) * .5, .4)));
    // Reach of a planet: its radius or the farthest station orbiting it.
    const reach = b => Math.max(radiusOf(b), ...out.filter(p => p.kind === 'orbit' && p.host === b.slot).map(p => p.distance + p.size));
    const room = host => {
        const i = bodies.indexOf(host), a = bodies[i - 1], c = bodies[i + 1], near = host.orbit * (1 - host.eccentricity), far = host.orbit * (1 + host.eccentricity);
        return Math.min(a ? near - a.orbit * (1 + a.eccentricity) - reach(a) : Infinity, c ? c.orbit * (1 - c.eccentricity) - reach(c) - far : Infinity);
    };
    const fits = (x, size) => (used.get(x.slot) || 0) < PER_HOST && orbitOf(x, size) + size * 2 <= room(x);
    const preferred = role => { for (const test of PREFER_ROLE[role] || []) { const b = bodies.find(x => test(x, bodies)); if (b) return b; } return null; };
    const least = (tests, size) => {
        const fewest = list => list.reduce((m, x) => (used.get(x.slot) || 0) < (used.get(m.slot) || 0) ? x : m);
        for (const test of tests) { const list = bodies.filter(x => test(x, bodies) && fits(x, size)); if (list.length) return fewest(list); }
        return null;
    };
    for (const entry of entries.filter(e => e.kind === 'stazione')) {
        const size = entry.drawn ?? STATION_SIZE[entry.type] ?? STATION_SIZE.default;
        if (entry.defence) { const later = { entry, size }; out.push(later); guard.push(later); continue; }
        if (entry.role) {
            if (entry.family === 'asteroide' && system.belt) { const distance = system.belt.inner + (system.belt.outer - system.belt.inner) * (.25 + .5 * rng()); out.push({ entry, kind: 'belt', size, distance, height: (rng() - .5) * .5, phase: rng() * Math.PI * 2, spin: beltSpin(system.belt, distance) }); continue; }
            // A planet that suits the role and has room, then a lane near such a planet, then the outer ring.
            const host = entry.role === 'comunicazioni' ? null : entry.role === 'cantiere' && port && fits(port, size) ? port : least(PREFER_ROLE[entry.role] || [], size);
            if (host) {
                const k = used.get(host.slot) || 0, distance = orbitOf(host, size); used.set(host.slot, k + 1);
                out.push({ entry, kind: 'orbit', host: host.slot, size, distance, phase: rng() * Math.PI * 2 + k * 2.1, speed: .05 / (1 + k * .4) * (rng() < .5 ? 1 : -1), inclination: .25 + rng() * .35, node: rng() * Math.PI * 2 });
                continue;
            }
            const later = { entry, size }; out.push(later); pending.push(later);
            continue;
        }
        if (entry.type === 'porta') { out.push({ entry, kind: 'edge', size, distance: system.outerRadius + 5.2, phase: rng() * Math.PI * 2 }); continue; }
        if (entry.type === 'miniera' && system.belt) { const distance = (system.belt.inner + system.belt.outer) / 2; out.push({ entry, kind: 'belt', size, distance, height: .25, phase: rng() * Math.PI * 2, spin: beltSpin(system.belt, distance) }); continue; }
        const host = entry.type === 'cantiere' && port ? port : pick(entry.type), k = used.get(host.slot) || 0;
        used.set(host.slot, k + 1); if (entry.type === 'porto') port = host;
        const distance = radiusOf(host) * (1.75 + .6 * k) + size * 1.5;
        out.push({ entry, kind: 'orbit', host: host.slot, size, distance, phase: rng() * Math.PI * 2 + k * 2.1, speed: .05 / (1 + k * .4) * (rng() < .5 ? 1 : -1), inclination: .25 + rng() * .35, node: rng() * Math.PI * 2 });
    }
    for (const p of pending) {
        const spot = lane(p.entry.role === 'comunicazioni' ? null : preferred(p.entry.role));
        if (spot) { Object.assign(p, { kind: 'star', distance: spot.l.r, height: 0, phase: spot.l.phase + spot.j * 2.39996, speed: spot.l.speed }); continue; }
        const gate = out.find(q => q.entry.type === 'porta'), r = ring++;
        const last = bodies.at(-1), clear = last.orbit * (1 + last.eccentricity) + reach(last) + p.size * 3;
        Object.assign(p, { kind: 'edge', distance: Math.max(system.belt ? system.belt.outer + 1.05 : system.outerRadius + 2.6, clear), phase: (gate ? gate.phase : 0) + Math.PI * (.5 + .618 * r) });
    }
    // The defensive stations (1.47.0) form a line 1.8 units beyond the gate and the outer ring: the fleet
    // base, the fortress and the shield generator beside the gate, the surveillance station on the far side
    // of the system and the platform between the two. They come last, so the other stations keep their places.
    if (guard.length) {
        const gate = out.find(q => q.entry.type === 'porta'), line = Math.max(gate ? gate.distance : system.outerRadius + 5.2, ...out.filter(q => q.kind === 'edge').map(q => q.distance)) + 1.8;
        for (const p of guard) Object.assign(p, { kind: 'edge', distance: line, phase: (gate ? gate.phase : 0) + DEFENCE_PHASE[p.entry.type] });
    }
    return out;
}

/** Position of a placement at `time`; `hostAt(slot)` gives the position of a body at the same time. */
export function stationPosition(p, time, hostAt) {
    if (p.kind === 'edge') return [Math.cos(p.phase) * p.distance, 0, Math.sin(p.phase) * p.distance];
    if (p.kind === 'belt') { const a = p.phase + time * (p.spin ?? -BELT_SPIN); return [Math.cos(a) * p.distance, p.height, Math.sin(a) * p.distance]; }
    if (p.kind === 'star') { const a = p.phase + time * p.speed; return [Math.cos(a) * p.distance, p.height, Math.sin(a) * p.distance]; }
    const a = p.phase + time * p.speed, x = Math.cos(a) * p.distance, z = Math.sin(a) * p.distance, ci = Math.cos(p.inclination), si = Math.sin(p.inclination);
    const y = z * si, zz = z * ci, cn = Math.cos(p.node), sn = Math.sin(p.node), h = hostAt(p.host);
    return [h[0] + x * cn - zz * sn, h[1] + y, h[2] + x * sn + zz * cn];
}
/** Heading of a station around the vertical axis: gates turn their ring axis towards the star, the others
 * turn slowly on themselves. */
export function stationYaw(p, time, position) {
    if (p.kind === 'edge') return Math.PI / 2 - Math.atan2(position[2], position[0]);
    return p.phase + time * .01;
}
