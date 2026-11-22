/** Comets, meteor streams and belts of the systems (1.60.0). Pure functions of the architecture of a system
 * (src/scene/systems.js), so the scene, the panel and the tests share one model.
 *
 * Distances: physical in au; on the map the orbits grow with the logarithm of the distance (LOG_SCALE), so a
 * point at a au is drawn at map.toScene(a) units from the star, in the same direction. Times: the comets move
 * on their ellipses with Kepler's equation in seconds of the model, which runs much faster than real time;
 * the panel quotes the physical period in years. */
import { LOG_SCALE, seededRandom } from './systems.js';

const TAU = Math.PI * 2;
/** Angular speed of a ring of a belt on the map, the same rule as the planets: pace / r^1.18. */
export const BELT_PACE = .175, BELT_RINGS = 4;
/** Water ice sublimates within about 3 au of the Sun: the distance scales with the square root of the
 * luminosity, where a comet receives a ninth of the light that reaches the Earth. */
export const ACTIVATION = 3;
/** Earth's orbital speed in km/s. */
export const V_EARTH = 29.78;

/** Map between physical distances (au) and distances on the map (units), piecewise logarithmic through the
 * planets of the system; inside the first planet and beyond the last one the slope is LOG_SCALE. */
export function distanceMap(system) {
    const pts = system.bodies.map(b => [Math.log(b.a), b.orbit]).sort((x, y) => x[0] - y[0]), n = pts.length, floor = system.starRadius * 1.35;
    const toScene = a => {
        const l = Math.log(a);
        if (l <= pts[0][0]) return Math.max(floor, pts[0][1] + LOG_SCALE * (l - pts[0][0]));
        if (l >= pts[n - 1][0]) return pts[n - 1][1] + LOG_SCALE * (l - pts[n - 1][0]);
        let k = 0; while (pts[k + 1][0] < l) k++;
        const u = (l - pts[k][0]) / (pts[k + 1][0] - pts[k][0]); return pts[k][1] + u * (pts[k + 1][1] - pts[k][1]);
    };
    const toAU = r => {
        if (r <= pts[0][1]) return Math.exp(pts[0][0] + (r - pts[0][1]) / LOG_SCALE);
        if (r >= pts[n - 1][1]) return Math.exp(pts[n - 1][0] + (r - pts[n - 1][1]) / LOG_SCALE);
        let k = 0; while (pts[k + 1][1] < r) k++;
        const u = (r - pts[k][1]) / (pts[k + 1][1] - pts[k][1]); return Math.exp(pts[k][0] + u * (pts[k + 1][0] - pts[k][0]));
    };
    return { toScene, toAU };
}
/** Orbital period in years and speed in km/s from Kepler's third law and the vis-viva equation. */
export const years = (a, M) => Math.sqrt(a ** 3 / M);
export const visViva = (r, a, M) => V_EARTH * Math.sqrt(M * Math.max(0, 2 / r - 1 / a));

/** Belts of a system: a rocky belt near the snow line, 2.7 au × √L, where the gap between two planets
 * leaves room, and an icy belt beyond the planets, from 1.7 to 3.1 map units past the outer radius of the
 * system, where the belt of the earlier versions stood. Each belt turns in rings, each with the angular speed
 * of an orbit at its radius, inner rings faster. */
export function systemBelts(system, map = distanceMap(system)) {
    const L = system.star.luminosity, a = system.bodies.map(b => b.a).sort((x, y) => x - y), belts = [];
    const snow = 2.7 * Math.sqrt(L), k = a.findIndex(x => x > snow);
    if (k > 0) {
        const aIn = Math.max(a[k - 1] * 1.3, snow / 1.45), aOut = Math.min(a[k] / 1.3, snow * 1.3);
        if (aOut / aIn >= 1.2 && map.toScene(aOut) - map.toScene(aIn) >= .4) belts.push(belt(system, 'rocciosa', aIn, aOut, map));
    }
    belts.push(belt(system, 'ghiacciata', map.toAU(system.outerRadius + 1.7), map.toAU(system.outerRadius + 3.1), map));
    return belts;
}
function belt(system, kind, aIn, aOut, map) {
    const inner = map.toScene(aIn), outer = map.toScene(aOut), rng = seededRandom(0x42454c54 ^ (system.id * 7 + (kind === 'rocciosa' ? 1 : 2)));
    const count = (kind === 'rocciosa' ? 520 : 680) + Math.floor(rng() * 200);
    const rings = Array.from({ length: BELT_RINGS }, (_, j) => { const r0 = inner + (outer - inner) * j / BELT_RINGS, r1 = inner + (outer - inner) * (j + 1) / BELT_RINGS, mid = (r0 + r1) / 2; return { inner: r0, outer: r1, omega: BELT_PACE / mid ** 1.18 }; });
    return { kind, name: kind === 'rocciosa' ? 'Cintura di asteroidi' : 'Cintura di ghiaccio', aIn, aOut, inner, outer, rings, count, seed: system.id * 2 + (kind === 'rocciosa' ? 0 : 1) };
}
/** Angular speed of the ring of a belt that contains the map radius r. */
export function ringOmega(b, r) { const j = Math.min(BELT_RINGS - 1, Math.max(0, Math.floor((r - b.inner) / (b.outer - b.inner) * BELT_RINGS))); return b.rings[j].omega; }

/** Comets of a system: one in every system, like the comets of the Jupiter family, with the perihelion well
 * inside the distance where the ices sublimate and the aphelion near a planet of the outer half; a second
 * one where the id leaves remainder 1 on division by 3, with the aphelion beyond the icy belt. The model
 * period is between 900 and 1500 s. Some comets orbit backwards, like Halley's. */
export function systemComets(system) {
    const rng = seededRandom(0x434f4d ^ system.id), a = system.bodies.map(b => b.a).sort((x, y) => x - y), n = system.id % 3 === 1 ? 2 : 1, out = [], ract = ACTIVATION * Math.sqrt(system.star.luminosity);
    for (let j = 0; j < n; j++) {
        const q = ract * (.25 + rng() * .45), far = j ? a.at(-1) * (2 + rng() * 1.5) : a[Math.floor(a.length * (.55 + rng() * .4))] * (1.05 + rng() * .25), Q = Math.max(far, q * 4), sma = (q + Q) / 2, e = (Q - q) / (Q + q);
        out.push({ name: `Cometa ${NAMES[(system.id * 3 + j) % NAMES.length]}`, q, Q, a: sma, e, inclination: rng() < .25 ? Math.PI - .35 + (rng() - .5) * .5 : (rng() - .5) * .9, node: rng() * TAU, peri: rng() * TAU, period: 900 + rng() * 600, phase: rng() });
    }
    return out;
}
const NAMES = ['Arianna', 'Borsa', 'Cassini', 'Donati', 'Encke', 'Faye', 'Giacobini', 'Holmes', 'Ikeya', 'Kohoutek', 'Lexell', 'Messier', 'Olbers', 'Pons', 'Respighi', 'Schiaparelli', 'Swift', 'Tempel', 'Tuttle', 'Westphal'];
/** Eccentric anomaly from the mean anomaly M and the eccentricity e (Newton's method on Kepler's equation). */
export function eccentricAnomaly(M, e) { let E = e > .8 ? Math.PI : M; for (let i = 0; i < 30; i++) { const d = (E - e * Math.sin(E) - M) / (1 - e * Math.cos(E)); E -= d; if (Math.abs(d) < 1e-12) break; } return E; }
/** Rotate a point of the orbital plane (x towards the perihelion, z ahead) to the system. */
function orient(c, x, z) {
    const cw = Math.cos(c.peri), sw = Math.sin(c.peri), x1 = x * cw - z * sw, z1 = x * sw + z * cw, ci = Math.cos(c.inclination), si = Math.sin(c.inclination), cn = Math.cos(c.node), sn = Math.sin(c.node);
    const y2 = z1 * si, z2 = z1 * ci; return [x1 * cn - z2 * sn, y2, x1 * sn + z2 * cn];
}
/** Physical position (au) and velocity (km/s) at eccentric anomaly E. */
export function cometAt(c, E, M) {
    const b = c.a * Math.sqrt(1 - c.e ** 2), p = orient(c, c.a * (Math.cos(E) - c.e), b * Math.sin(E)), r = Math.hypot(...p);
    const d = orient(c, -c.a * Math.sin(E), b * Math.cos(E)), n = Math.hypot(...d), v = visViva(r, c.a, M);
    return { p, r, velocity: d.map(x => x / n * v), v };
}
/** State of a comet at `time`: physical position and speed, position on the map, direction away from the
 * star, direction of motion and activity of the nucleus, from 0 far from the star to 1 when the light it
 * receives is nine times the light at the activation distance. */
export function cometState(c, time, map, star) {
    const M = TAU * (time / c.period + c.phase), E = eccentricAnomaly(((M % TAU) + TAU) % TAU, c.e), s = cometAt(c, E, star.mass);
    const out = s.p.map(x => x / s.r), position = out.map(x => x * map.toScene(s.r)), ahead = s.velocity.map(x => x / s.v);
    const ract = ACTIVATION * Math.sqrt(star.luminosity), activity = Math.min(1, Math.max(0, ((ract / s.r) ** 2 - 1) / 8));
    return { ...s, position, out, ahead, activity, ract, flux: star.luminosity / s.r ** 2 };
}
/** Points of the meteoroid stream along the orbit of a comet, on the map, spread a little around it. */
export function streamOf(c, map, count = 480) {
    const rng = seededRandom(0x53545245 ^ Math.round(c.period * 1000)), out = new Float32Array(count * 3);
    for (let j = 0; j < count; j++) {
        const E = TAU * (j + rng()) / count, b = c.a * Math.sqrt(1 - c.e ** 2), p = orient(c, c.a * (Math.cos(E) - c.e), b * Math.sin(E)), r = Math.hypot(...p), s = map.toScene(r) / r;
        for (let i = 0; i < 3; i++) out[j * 3 + i] = p[i] * s + (rng() - .5) * .16;
    }
    return out;
}
/** Meteor showers: a planet whose orbit passes within 0.3 map units of the stream of a comet crosses it once
 * per orbit, at the mean anomaly `mean`. `speed` is the speed of the meteoroids relative to the planet in
 * km/s, from the velocities of the comet at that point and of the planet on its orbit. */
export function meteorShowers(system, comets, map) {
    // The closest pair of 360 points of the comet orbit and 180 points of the planet orbit. The points are
    // worked out once (1.61.0) and compared by squared distance; a pair within a hair of the best one is
    // compared again by its distance, as before, so the crossing found is the same and it costs about a twentieth.
    const M = system.star.mass, out = new Map();
    const tracks = comets.map(c => { const q = new Float64Array(360 * 3); for (let i = 0; i < 360; i++) { const s = cometAt(c, TAU * i / 360, M), r = map.toScene(s.r); for (let k = 0; k < 3; k++) q[i * 3 + k] = s.p[k] / s.r * r; } return q; });
    for (const body of system.bodies) {
        const list = [], cn = Math.cos(body.node), sn = Math.sin(body.node), P = new Float64Array(180 * 3);
        for (let j = 0; j < 180; j++) {
            const F = TAU * j / 180, x = body.orbit * (Math.cos(F) - body.eccentricity), z = body.orbit * Math.sqrt(1 - body.eccentricity ** 2) * Math.sin(F), zz = z * Math.cos(body.inclination);
            P[j * 3] = x * cn - zz * sn; P[j * 3 + 1] = z * Math.sin(body.inclination); P[j * 3 + 2] = x * sn + zz * cn;
        }
        comets.forEach((c, k) => {
            const q = tracks[k];let best = { gap: Infinity }, near = Infinity;
            for (let i = 0; i < 360; i++) {
                const qx = q[i * 3], qy = q[i * 3 + 1], qz = q[i * 3 + 2];
                for (let j = 0; j < 180; j++) {
                    const dx = P[j * 3] - qx, dy = P[j * 3 + 1] - qy, dz = P[j * 3 + 2] - qz, d2 = dx * dx + dy * dy + dz * dz;
                    if (d2 > near) continue;
                    const gap = Math.hypot(dx, dy, dz);
                    if (gap < best.gap) { best = { gap, E: TAU * i / 360, F: TAU * j / 180, p: [P[j * 3], P[j * 3 + 1], P[j * 3 + 2]] }; near = d2 * (1 + 1e-9); }
                }
            }
            if (best.gap > .3) return;
            // The planet moves on a nearly circular orbit, forwards, at the speed of a circular orbit at its distance.
            const s = cometAt(c, best.E, M), t = [-best.p[2], 0, best.p[0]].map(x => x / Math.hypot(best.p[0], best.p[2])), vp = V_EARTH * Math.sqrt(M / body.a);
            const rel = s.velocity.map((x, i) => x - t[i] * vp);
            list.push({ comet: k, name: c.name, mean: best.F - body.eccentricity * Math.sin(best.F), gap: best.gap, speed: Math.hypot(...rel) });
        });
        if (list.length) out.set(body.slot, list);
    }
    return out;
}
/** Where a planet stands with respect to a shower at `time`: active while its mean anomaly is within 0.2 rad
 * of the crossing, otherwise the seconds to the next crossing. */
export function showerState(body, shower, time) {
    const mean = body.phase + time * body.speed, d = ((shower.mean - mean) % TAU + TAU) % TAU, from = Math.min(d, TAU - d);
    return { active: from < .2, next: d / body.speed, strength: from < .2 ? 1 - from / .2 : 0 };
}
