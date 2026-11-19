/** Where the stations of a system sit. Each station orbits a host body chosen for its role (refineries
 * around gas giants, greenhouses around habitable worlds, telescopes far from the star), mines move with
 * the asteroid belt and the passage gate stands beyond the belt, facing the star. Positions are in system
 * units (src/scene/systems.js); `radiusOf(body)` is the drawn radius of a body (displayRadius in
 * src/scene/world.js). */
import { seededRandom } from '../scene/layout.js';

const GIANTS = ['gas', 'ringed', 'icegiant'], ICY = ['icegiant', 'arctic'], LIVING = ['oceanic', 'terrestrial'];
/** Drawn size (radius in system units) of each kind of station. */
export const STATION_SIZE = { porto: .2, porta: .55, miniera: .17, default: .15 };
/** Rotation of the asteroid belt, as drawn by src/scene/world.js (radians per unit of time). */
export const BELT_SPIN = .0008;

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

/** Placements of the stations of `system` (the result of systemArchitecture, with `id`), for the catalogue
 * entries `entries` of that system, in order. */
export function placeStations(system, entries, radiusOf) {
    const bodies = system.bodies, used = new Map(), rng = seededRandom(0x5741 ^ Math.imul(system.id + 1, 0x2C1B3C6D)), out = [];
    const pick = type => {
        const tests = PREFER[type] || [];
        // Prefer a body that has no station yet, then any body that passes the test, then any free body.
        for (const free of [true, false]) for (const test of tests) { const b = bodies.find(x => test(x, bodies) && (!free || !used.has(x.slot))); if (b) return b; }
        return bodies.find(x => !used.has(x.slot)) || bodies[0];
    };
    let port = null;
    for (const entry of entries.filter(e => e.kind === 'stazione')) {
        const size = STATION_SIZE[entry.type] ?? STATION_SIZE.default;
        if (entry.type === 'porta') { out.push({ entry, kind: 'edge', size, distance: system.outerRadius + 5.2, phase: rng() * Math.PI * 2 }); continue; }
        if (entry.type === 'miniera' && system.belt) { out.push({ entry, kind: 'belt', size, distance: (system.belt.inner + system.belt.outer) / 2, height: .25, phase: rng() * Math.PI * 2 }); continue; }
        const host = entry.type === 'cantiere' && port ? port : pick(entry.type), k = used.get(host.slot) || 0;
        used.set(host.slot, k + 1); if (entry.type === 'porto') port = host;
        const distance = radiusOf(host) * (1.75 + .6 * k) + size * 1.5;
        out.push({ entry, kind: 'orbit', host: host.slot, size, distance, phase: rng() * Math.PI * 2 + k * 2.1, speed: .05 / (1 + k * .4) * (rng() < .5 ? 1 : -1), inclination: .25 + rng() * .35, node: rng() * Math.PI * 2 });
    }
    return out;
}

/** Position of a placement at `time`; `hostAt(slot)` gives the position of a body at the same time. */
export function stationPosition(p, time, hostAt) {
    if (p.kind === 'edge') return [Math.cos(p.phase) * p.distance, 0, Math.sin(p.phase) * p.distance];
    if (p.kind === 'belt') { const a = p.phase - time * BELT_SPIN; return [Math.cos(a) * p.distance, p.height, Math.sin(a) * p.distance]; }
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
