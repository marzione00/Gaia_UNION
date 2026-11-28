/** The ship of the explorer on the surface (1.75.0): a shuttle of the catalogue (src/craft/catalog.js), at its
 * catalogue length of about 50 m, with four landing legs that reach the ground each at its own height, a ramp
 * under the belly and the plumes of four vertical thrusters, all built in code.
 * The ship lands on the pad of the base, a terrace levelled outside the square of the stations, or where the
 * explorer chooses in the zone of the landing site, on dry ground that its legs can take, clear of the stations,
 * the settlements, the places, the sites and the rare places (landingSpot), and takes off again for the orbit.
 * The descent and the climb follow simple physics with the gravity of the planet, in a time compressed for the
 * screen: the ship brakes uniformly from DESCENT.metres over the ground to a stop in DESCENT.seconds, so its height
 * is h(1 − τ)² and its thrust (a + g)/g times its weight, with a = 2h/T²; it takes off with a thrust twice its
 * weight, so it climbs with an acceleration equal to g. */
import { CATALOG, build as buildCraft, LOW_DETAIL } from '../craft/catalog.js';
import { style as craftStyle } from '../craft/styles.js';
import { Kit } from '../craft/kit.js';
import { EDGE, METRE } from './explorer.js';
import { CORE } from './field.js';
import { planetPhysics } from './planet-physics.js';
import { siteList, clearingOf } from './sites.js';
import { rareList, reliefOf } from './wonders.js';

export const LANDER = CATALOG.find(e => e.id === 's06-6');
export const LANDER_METRES = parseFloat(LANDER.size.replace(/[^\d.]/g, '')), LENGTH = LANDER_METRES * METRE;
/** Height of the keel over the feet, length of the ramp, and the largest difference of height that the legs take
 * between their feet (units). */
export const LEG = 3.2, RAMP = 7, DROP = 2;
/** The descent and the climb (metres, seconds, thrust in weights); the time to open the ramp after the touchdown
 * (s), and the distance from the end of the ramp within which the explorer boards (units, about 30 m). */
export const DESCENT = Object.freeze({ metres: 670, seconds: 10 }), ASCENT = Object.freeze({ seconds: 8, thrust: 2, close: .9 });
export const RAMP_SECONDS = 1.5, BOARD = 19;
/** The pad of the base: radius of its level ground and width of the slope that joins it to the terrain (units). */
export const PAD_R = 24, PAD_BLEND = 18;
const G0 = 9.80665;
const it = (x, d = 1) => x.toFixed(d).replace('.', ',');
const smooth = (a, b, x) => { const k = Math.max(0, Math.min(1, (x - a) / (b - a))); return k * k * (3 - 2 * k); };

let cache = null;
/** Meshes of the ship at two levels of detail (hull), and of its ramp and plumes, with its sizes. The hull lies
 * along +z (the bow) with its keel LEG units over the feet; the ramp turns about its hinge, at the origin of its
 * mesh, and stretches towards −z; the legs (landerLegs) and the plumes hang under the hull. */
export function landerMeshes() {
    if (cache) return cache;
    const st = craftStyle(LANDER.style);
    const hulls = [0, 1].map(level => {
        const model = buildCraft(LANDER, LANDER.seed, level ? { detail: LOW_DETAIL } : {}), parts = model.parts.map(p => p.mesh);
        let nv = 0, ni = 0; for (const m of parts) { nv += m.v.length; ni += m.i.length; }
        const v = new Float32Array(nv), i = new Uint32Array(ni); let ov = 0, oi = 0;
        for (const m of parts) { v.set(m.v, ov); for (let k = 0; k < m.i.length; k++) i[oi + k] = m.i[k] + ov / 16; ov += m.v.length; oi += m.i.length; }
        return { v, i, stride: 16 };
    });
    const lo = [Infinity, Infinity, Infinity], hi = [-Infinity, -Infinity, -Infinity], m0 = hulls[0];
    for (let k = 0; k < m0.v.length; k += 16) for (let a = 0; a < 3; a++) { lo[a] = Math.min(lo[a], m0.v[k + a]); hi[a] = Math.max(hi[a], m0.v[k + a]); }
    const s = LENGTH / (hi[2] - lo[2]), cx = (lo[0] + hi[0]) / 2, cz = (lo[2] + hi[2]) / 2;
    for (const m of hulls) for (let k = 0; k < m.v.length; k += 16) { m.v[k] = (m.v[k] - cx) * s; m.v[k + 1] = (m.v[k + 1] - lo[1]) * s + LEG; m.v[k + 2] = (m.v[k + 2] - cz) * s; }
    // The underside of the hull at (x, z): the lowest point where a vertical line meets its triangles, or null.
    const under = (x, z) => {
        const V = m0.v, I = m0.i; let y = Infinity;
        for (let t = 0; t < I.length; t += 3) {
            const a = I[t] * 16, b = I[t + 1] * 16, c = I[t + 2] * 16, ax = V[a], az = V[a + 2], bx = V[b], bz = V[b + 2], cx2 = V[c], cz2 = V[c + 2];
            const d = (bz - cz2) * (ax - cx2) + (cx2 - bx) * (az - cz2); if (Math.abs(d) < 1e-9) continue;
            const u = ((bz - cz2) * (x - cx2) + (cx2 - bx) * (z - cz2)) / d, w = ((cz2 - az) * (x - cx2) + (ax - cx2) * (z - cz2)) / d;
            if (u < 0 || w < 0 || u + w > 1) continue;
            y = Math.min(y, u * V[a + 1] + w * V[b + 1] + (1 - u - w) * V[c + 1]);
        }
        return y < Infinity ? y : null;
    };
    const half = (hi[0] - lo[0]) * s / 2, height = (hi[1] - lo[1]) * s, legZ = LENGTH * .26;
    // The legs hang from the widest point of the underside, at most 2.2 units over the keel, at the bow and stern.
    let legX = 1.5; for (let x = 8; x >= 1.5; x -= .25) { const a = under(x, legZ), b = under(x, -legZ); if (a !== null && b !== null && a < LEG + 2.2 && b < LEG + 2.2) { legX = x; break; } }
    const tops = [[1, 1], [-1, 1], [1, -1], [-1, -1]].map(([sx, sz]) => [sx * legX, under(sx * legX, sz * legZ) + .2, sz * legZ]);
    // The ramp: its hinge at the forward edge of the hatch, under the middle of the hull.
    const hz = -LENGTH * .12, hinge = [0, under(0, hz) - .06, hz];
    // Housings of the legs, the frame of the hatch and the landing lights, added to both hulls.
    const extra = new Kit(st);
    for (const t of tops) { extra.dark(); extra.box([t[0], t[1] + .15, t[2]], [.75, .35, 1.1], 0); extra.glow([1, .86, .6, 1], 2); extra.box([t[0] * 1.02, t[1] - .02, t[2] + Math.sign(t[2]) * 1.15], [.18, .1, .06]); }
    extra.dark(); for (const sx of [-1, 1]) extra.box([sx * 1.85, hinge[1] + .04, hz - RAMP / 2], [.08, .08, RAMP / 2 + .15]);
    extra.box([0, hinge[1] + .04, hz + .1], [1.9, .08, .08]);
    const add = extra.mesh();
    for (const m of hulls) {
        const v = new Float32Array(m.v.length + add.v.length), i = new Uint32Array(m.i.length + add.i.length);
        v.set(m.v); v.set(add.v, m.v.length); i.set(m.i); for (let k = 0; k < add.i.length; k++) i[m.i.length + k] = add.i[k] + m.v.length / 16;
        m.v = v; m.i = i;
    }
    // Ramp: a ribbed plate with side rails, hinged at its forward edge.
    const ramp = new Kit(st);
    ramp.hull(); ramp.box([0, -.07, -RAMP / 2], [1.7, .07, RAMP / 2], 1.2, 0);
    ramp.dark(); for (let k = 1; k < 10; k++) ramp.box([0, .02, -k * RAMP / 10], [1.5, .035, .06]);
    ramp.steel(); for (const sx of [-1, 1]) { ramp.beam([sx * 1.72, .05, 0], [sx * 1.72, .05, -RAMP], .09); ramp.beam([sx * 1.72, .9, -.4], [sx * 1.72, .9, -RAMP + .3], .05); for (const f of [.15, .5, .85]) ramp.beam([sx * 1.72, .05, -RAMP * f], [sx * 1.72, .9, -RAMP * f], .04); }
    // Plumes of the four vertical thrusters: a soft glow, drawn translucent, round a hot core that shines; each
    // nozzle is a dark ring under the hull.
    const plume = new Kit(st), flame = new Kit(st);
    for (const [sx, sz] of [[1, 1], [-1, 1], [1, -1], [-1, -1]]) {
        const at = [sx * Math.max(1, legX * .55), under(sx * Math.max(1, legX * .55), sz * legZ * .62) ?? LEG, sz * legZ * .62];
        plume.push(at); plume.glow([1, .74, .45, 1], 2.4); plume.cyl(1.7, .55, -9, 0, 18, { caps: false }); plume.glow([1, .86, .66, 1], 2.4); plume.cyl(1.05, .3, -5.5, 0, 16, { caps: false }); plume.pop();
        flame.push(at); flame.dark(); flame.cyl(.75, .62, -.1, .15, 16); flame.glow([.8, .9, 1, 1], 3.2); flame.cyl(.5, .06, -2.6, -.1, 14, { caps: false }); flame.pop();
    }
    cache = { hulls, ramp: ramp.mesh(), plume: plume.mesh(), flame: flame.mesh(), half, height, legX, legZ, tops, hinge, style: st };
    return cache;
}

const legCache = new Map();
/** The four legs, each with its foot `drop[k]` units under the plane of the feet (0 to DROP): a strut and a
 * piston from the housing under the hull to a foot pad, splayed outwards. Order: bow right, bow left, stern
 * right, stern left. */
export function landerLegs(drop = [0, 0, 0, 0]) {
    const key = drop.map(d => d.toFixed(2)).join(',');
    if (legCache.has(key)) return legCache.get(key);
    const { tops, style } = landerMeshes(), legs = new Kit(style);
    tops.forEach((t, k) => {
        const sx = Math.sign(t[0]), sz = Math.sign(t[2]), d = Math.max(0, Math.min(DROP, drop[k] || 0));
        const knee = [t[0] + sx * 1.1, LEG * .55, t[2] + sz * .6], foot = [t[0] + sx * 1.6, -d + .35, t[2] + sz * .9];
        legs.steel(); legs.beam(t, knee, .34); legs.trim(); legs.beam(knee, [knee[0] + (foot[0] - knee[0]) * .4, knee[1] + (foot[1] - knee[1]) * .4, knee[2] + (foot[2] - knee[2]) * .4], .26);
        legs.steel(); legs.beam(knee, foot, .19);
        legs.dark(); legs.beam([t[0], t[1] - .1, t[2] - sz * 1.1], [foot[0], foot[1] + .55, foot[2]], .14);
        legs.push([foot[0], -d, foot[2]]); legs.steel(); legs.cyl(1.05, .85, 0, .3, 18); legs.dark(); legs.cyl(.42, .42, .3, .75, 12); legs.pop();
    });
    const m = legs.mesh(); if (legCache.size > 16) legCache.clear(); legCache.set(key, m);
    return m;
}

/** The feet of the ship at (x, z) with heading h, in the order of landerLegs. */
export function feetOf(x, z, h) {
    const { tops } = landerMeshes(), c = Math.cos(h), sn = Math.sin(h);
    return tops.map(t => { const lx = t[0] + Math.sign(t[0]) * 1.6, lz = t[2] + Math.sign(t[2]) * .9; return [x + c * lx + sn * lz, z - sn * lx + c * lz]; });
}
/** A point of the frame of the ship (x, z, heading h) given in its coordinates (lx to the right, lz to the bow). */
export const toWorld = (x, z, h, lx, lz) => [x + Math.cos(h) * lx + Math.sin(h) * lz, z - Math.sin(h) * lx + Math.cos(h) * lz];

/** How the ship stands at (x, z) with heading h: the height of the plane of its feet (the highest ground under
 * them), the drop of each foot, the angle of the open ramp and the point where it touches the ground, and whether
 * it can land there: dry ground, feet within DROP of each other, no ground that reaches the hull, and a ramp that
 * meets the ground at an angle between 9° and 60°. */
export function landerPose(s, x, z, h) {
    const { hinge } = landerMeshes(), sea = s.seaY, g = (px, pz) => s.heightAt(px, pz);
    const feet = feetOf(x, z, h), ground = feet.map(([px, pz]) => g(px, pz)), y = Math.max(...ground), drop = ground.map(v => y - v);
    let ok = drop.every(d => d <= DROP) && (sea === null || Math.min(...ground) >= sea + .3);
    // Ground under the hull: a grid of points of its outline must stay 0.6 units under the keel.
    for (let i = -2; i <= 2 && ok; i++) for (let j = -3; j <= 3 && ok; j++) { const [px, pz] = toWorld(x, z, h, i * 2.4, j * LENGTH / 7); const q = g(px, pz); if (q > y + LEG - .6 || (sea !== null && q < sea + .2)) ok = false; }
    // The ramp: from its hinge down to the ground behind it (three steps of the angle).
    let ang = Math.asin(Math.min(1, (hinge[1]) / RAMP)), end = null;
    for (let k = 0; k < 3; k++) { const lz = hinge[2] - RAMP * Math.cos(ang); end = toWorld(x, z, h, 0, lz); const fall = y + hinge[1] - g(end[0], end[1]); ang = Math.asin(Math.max(-1, Math.min(1, fall / RAMP))); }
    if (!(ang > .16 && ang < 1.05)) ok = false;
    const lz = hinge[2] - RAMP * Math.cos(ang); end = toWorld(x, z, h, 0, lz);
    return { x, z, h, y, drop, ramp: ang, end: [end[0], g(end[0], end[1]), end[1]], ok };
}

/** The nearest point to (x, z), within `reach` units, where the ship can land with heading h: inside the zone
 * with a margin, in a good pose (landerPose), at least 30 units from the stations and clear of the buildings and
 * streets of the settlements, of the places, the sites and the rare places, or on the pad of the base. Returns its
 * pose, or null when there is none. */
export function landingSpot(s, x, z, h = 0, reach = 160) {
    const r = Math.max(landerMeshes().half, LENGTH / 2) + 3, pad = s.pad;
    const fits = (px, pz) => {
        if (Math.abs(px) > EDGE - r - 20 || Math.abs(pz) > EDGE - r - 20) return null;
        if (pad && Math.hypot(px - pad.x, pz - pad.z) < PAD_R - r + 2) { const P = landerPose(s, px, pz, h); return P.ok ? P : null; }
        if (s.stations.some(st => Math.hypot(st.position[0] - px, st.position[2] - pz) < 30 + r)) return null;
        if (s.siteClear?.(px, pz, r - 4) || (s.places || []).some(p => Math.hypot(p.position[0] - px, p.position[2] - pz) < r + 6)) return null;
        for (let k = 0; k < 8; k++) { const a = k * Math.PI / 4, qx = px + Math.cos(a) * r, qz = pz + Math.sin(a) * r; if (s.clear?.blocked?.(qx, qz) || s.clear?.solid?.(qx, qz)) return null; }
        if (s.clear?.blocked?.(px, pz) || s.clear?.solid?.(px, pz)) return null;
        const P = landerPose(s, px, pz, h); return P.ok ? P : null;
    };
    // On the pad the ship lands at its middle.
    if (pad && Math.hypot(x - pad.x, z - pad.z) < PAD_R) { const P = landerPose(s, pad.x, pad.z, h); if (P.ok) return P; }
    let P = fits(x, z); if (P) return P;
    for (let d = 6; d <= reach; d += 6) {
        const n = Math.max(8, Math.round(d / 4));
        for (let k = 0; k < n; k++) { const a = k / n * Math.PI * 2; P = fits(+(x + Math.cos(a) * d).toFixed(2), +(z + Math.sin(a) * d).toFixed(2)); if (P) return P; }
    }
    return null;
}

/** The pad of the base (1.75.0): a disc of level ground of radius PAD_R, joined to the terrain by a slope
 * PAD_BLEND units wide, just outside the square of the stations (the relief changes only outside it), behind the
 * stations as seen from their camera. It is the point with least cutting and filling, on dry ground, clear of
 * the settlements, the places, the sites and the rare places; its height is the median of the ground under it. */
export function padOf(s, clear = () => false) {
    const reach = PAD_R + PAD_BLEND, inner = CORE / 2 + reach + 2, sea = s.seaY, want = [-104, -154];
    // Ground around a candidate: `n` points on each of the rings, with the centre; null where it is wet or built.
    const ground = (x, z, rings, n) => {
        const ys = [];
        for (const d of rings) for (let k = 0; k < (d ? n : 1); k++) {
            const a = k * Math.PI * 2 / n, px = x + Math.cos(a) * d, pz = z + Math.sin(a) * d, y = s.heightAt(px, pz);
            if ((sea !== null && y < sea + .5) || s.clear?.blocked?.(px, pz) || s.clear?.solid?.(px, pz)) return null; ys.push(y);
        }
        return ys;
    };
    const free = (x, z) => Math.max(Math.abs(x), Math.abs(z)) >= inner && Math.abs(x) <= EDGE - reach - 40 && Math.abs(z) <= EDGE - reach - 40 && !clear(x, z, reach) && !(s.places || []).some(p => Math.hypot(p.position[0] - x, p.position[2] - z) < reach + 10);
    const score = (x, z, ys) => Math.max(...ys) - Math.min(...ys) + .04 * Math.hypot(x - want[0], z - want[1]);
    // A coarse look with few points near the preferred place, then wider; the best eight are measured again.
    for (const [span, step] of [[150, 12], [420, 24]]) {
        const coarse = [];
        for (let x = want[0] - span; x <= want[0] + span; x += step) for (let z = want[1] - span; z <= want[1] + span; z += step) {
            if (!free(x, z)) continue; const ys = ground(x, z, [0, PAD_R, reach], 6); if (ys) coarse.push({ x, z, score: score(x, z, ys) });
        }
        coarse.sort((a, b) => a.score - b.score);
        let best = null;
        for (const c of coarse.slice(0, 8)) { const ys = ground(c.x, c.z, [0, PAD_R * .5, PAD_R, reach], 12); if (ys) { const q = score(c.x, c.z, ys); if (!best || q < best.score) best = { x: c.x, z: c.z, score: q, ys }; } }
        if (best) { const ys = best.ys.slice().sort((a, b) => a - b), y = Math.max(ys[ys.length >> 1], sea === null ? -Infinity : sea + 1.2); return { x: best.x, z: best.z, y: +y.toFixed(3), r: PAD_R }; }
    }
    return null;
}
/** Relief of the pad: the ground goes to its height inside PAD_R and back to the terrain over PAD_BLEND. */
export function padRelief(pad) {
    const reach = PAD_R + PAD_BLEND;
    return (x, z, y) => { const ax = Math.abs(x - pad.x), az = Math.abs(z - pad.z); if (ax > reach || az > reach) return 0; const d = Math.hypot(ax, az); return d >= reach ? 0 : (pad.y - y) * (1 - smooth(PAD_R, reach, d)); };
}
/** Sum of two reliefs, the second applied to the ground already changed by the first. */
export const joinRelief = (a, b) => !a ? b : !b ? a : (x, z, y) => { const d = a(x, z, y); return d + b(x, z, y + d); };

/** Sites, rare places, the pad of the base and the ground they shape (1.73.0 to 1.75.0), in this order, once for
 * each surface: the sites and rare places come before the pad, so they stay where they were. */
export function prepareZone(s) {
    if (s.siteClear) return s;
    s.sites ||= s.field?.biomes ? siteList(s) : [];
    if (!s.rares) { s.rares = s.field?.biomes ? rareList(s, s.sites) : []; s.setRelief?.(reliefOf(s.rares)); }
    if (s.pad === undefined) {
        s.pad = s.field?.biomes && s.setRelief ? padOf(s, clearingOf([...s.sites, ...s.rares])) : null;
        if (s.pad) s.setRelief(joinRelief(s.reliefAt, padRelief(s.pad)));
    }
    s.siteClear = clearingOf([...s.sites, ...s.rares, ...(s.pad ? [{ x: s.pad.x, z: s.pad.z, r: PAD_R + PAD_BLEND - 6 }] : [])]);
    return s;
}
/** Model of the pad: a slab with its markings, a ring of lamps and four lamp posts, at the origin. */
let padCache = null;
export function padMesh() {
    if (padCache) return padCache;
    const k = new Kit(landerMeshes().style), R = PAD_R - 3;
    k.paint([.27, .27, .26, 1], .05, .92); k.cyl(R, R + .4, -.6, .08, 40);
    k.paint([.86, .78, .4, 1], .05, .7); k.push([0, .085, 0]); k.cyl(R * .72, R * .72, 0, .01, 48, { caps: false }); k.pop();
    for (const ring of [R * .7, R * .74]) { k.push([0, .09, 0]); for (let j = 0; j < 48; j++) { const a0 = j / 48 * Math.PI * 2, a1 = (j + .6) / 48 * Math.PI * 2; k.quad([Math.cos(a1) * ring, 0, Math.sin(a1) * ring], [Math.cos(a1) * (ring + .3), 0, Math.sin(a1) * (ring + .3)], [Math.cos(a0) * (ring + .3), 0, Math.sin(a0) * (ring + .3)], [Math.cos(a0) * ring, 0, Math.sin(a0) * ring]); } k.pop(); }
    for (let j = 0; j < 4; j++) { const a = j * Math.PI / 2, c = Math.cos(a), sn = Math.sin(a), p = (u, v) => [c * u - sn * v, .1, sn * u + c * v]; k.quad(p(R * .2, -.5), p(R * .2, .5), p(R * .55, 1.6), p(R * .55, .6)); k.quad(p(R * .2, -.5), p(R * .55, -.6), p(R * .55, -1.6), p(R * .2, .5)); }
    for (let j = 0; j < 24; j++) { const a = j / 24 * Math.PI * 2; k.glow(j % 2 ? [1, .74, .4, 1] : [.5, .8, 1, 1], 1.6); k.box([Math.cos(a) * (R - .9), .13, Math.sin(a) * (R - .9)], [.12, .05, .12]); }
    for (let j = 0; j < 4; j++) { const a = Math.PI / 4 + j * Math.PI / 2, x = Math.cos(a) * (R + 1.6), z = Math.sin(a) * (R + 1.6); k.steel(); k.beam([x, -.4, z], [x, 4.5, z], .12); k.dark(); k.box([x, 4.6, z], [.35, .14, .35]); k.glow([1, .9, .7, 1], 2.2); k.box([x, 4.43, z], [.25, .04, .25]); }
    return padCache = k.mesh();
}

/** State of the ship at time `now` (ms): height of the plane of its feet over the ground (units), vertical speed
 * (units/s, positive up), legs (0 folded, 1 down), ramp (0 closed, 1 open), thrust in weights, dust (0 to 1), and
 * whether the phase is over. */
export function landerState(L, now, gravity) {
    const g = gravity * G0 * METRE, t = Math.max(0, (now - L.t0) / 1000), H = DESCENT.metres * METRE, T = DESCENT.seconds;
    if (L.phase === 'descent') {
        const tau = Math.min(1, t / T), h = H * (1 - tau) ** 2, v = tau < 1 ? -2 * H * (1 - tau) / T : 0, a = 2 * H / (T * T);
        const ramp = Math.max(0, Math.min(1, (t - T) / RAMP_SECONDS));
        return { height: h, speed: v, legs: smooth(.55, .85, tau), ramp, thrust: tau < 1 ? (a + g) / g : 0, dust: tau < 1 ? Math.max(0, 1 - h / 28) : Math.max(0, 1 - (t - T) / 1.2), done: t >= T + RAMP_SECONDS };
    }
    if (L.phase === 'ascent') {
        const c = ASCENT.close, tt = Math.max(0, t - c), a = (ASCENT.thrust - 1) * g, h = .5 * a * tt * tt, end = L.then === 'hop' ? HOP_CLIMB : ASCENT.seconds;
        return { height: h, speed: a * tt, legs: 1 - smooth(1.2, 2.4, tt), ramp: Math.max(0, 1 - t / c), thrust: t > c * .7 ? ASCENT.thrust : 0, dust: t > c * .7 ? Math.max(0, 1 - h / 30) : 0, done: t >= c + end };
    }
    return { height: 0, speed: 0, legs: 1, ramp: 1, thrust: 0, dust: 0, done: false };
}
/** A hop to another point of the zone: the climb lasts HOP_CLIMB seconds, then the ship flies to the new point
 * in cruiseSeconds(d) and comes down there with the descent of DESCENT. */
export const HOP_CLIMB = 3;
export const cruiseSeconds = d => 4 + d / 260;
/** Position of the ship in a hop at fraction u (0 to 1) of the flight: the horizontal path eases in and out, the
 * height follows a cubic that leaves with the speed of the climb and arrives DESCENT.metres over the new point with
 * the speed at which the descent begins, so the motion has no jumps. */
export function cruiseAt(C, u) {
    const k = Math.max(0, Math.min(1, u)), e = k * k * (3 - 2 * k), T = C.seconds;
    const h00 = 2 * k ** 3 - 3 * k * k + 1, h10 = k ** 3 - 2 * k * k + k, h01 = -2 * k ** 3 + 3 * k * k, h11 = k ** 3 - k * k;
    const y = h00 * C.from[1] + h10 * C.v0 * T + h01 * C.to[1] + h11 * C.v1 * T;
    return [C.from[0] + (C.to[0] - C.from[0]) * e, y, C.from[2] + (C.to[2] - C.from[2]) * e];
}
/** Speed at which the descent begins (units/s, downwards). */
export const descentSpeed = () => 2 * DESCENT.metres * METRE / DESCENT.seconds;

/** Circles (x, z, r) that stop the explorer: the four legs of a ship that has landed. The hull is high enough to
 * walk under it, as from the end of the ramp. */
export function landerBlocks(L) {
    return feetOf(L.x, L.z, L.h).map(([x, z], k) => { const t = landerMeshes().tops[k], [tx, tz] = toWorld(L.x, L.z, L.h, t[0], t[2]); return [(x + tx) / 2, (z + tz) / 2, 1.6]; });
}
/** Model matrix of a part of the ship at (x, y, z) with heading h: the part sits at `local` in the frame of the
 * ship and is pitched by `pitch` about its own x axis (positive lowers its −z end). Columns as in transform(). */
export function landerMatrix(x, y, z, h, local = [0, 0, 0], pitch = 0) {
    const c = Math.cos(h), sn = Math.sin(h), X = [c, 0, -sn], Z = [sn, 0, c], cp = Math.cos(pitch), sp = Math.sin(pitch);
    const c1 = [Z[0] * -sp, cp, Z[2] * -sp], c2 = [Z[0] * cp, sp, Z[2] * cp];
    return new Float32Array([...X, 0, ...c1, 0, ...c2, 0, x + X[0] * local[0] + Z[0] * local[2], y + local[1], z + X[2] * local[0] + Z[2] * local[2], 1]);
}

/** The physics of the descent and of the take-off on planet `i`, for the card of the ship: orbital speed, the role
 * of the atmosphere, the thrust of the last braking and of the climb. */
export function landerStory(i, gravity) {
    const p = planetPhysics()[i], g = gravity * G0, a = 2 * DESCENT.metres / DESCENT.seconds ** 2, v0 = 2 * DESCENT.metres / DESCENT.seconds, orbit = p.escape / Math.SQRT2;
    return [
        `${LANDER.name}, lunga ${LANDER_METRES} m, con quattro gambe che si allungano fino al terreno, una rampa sotto lo scafo e quattro motori verticali.`,
        `In orbita bassa la nave viaggia a circa ${it(orbit, 1)} km/s, la velocità di fuga del pianeta divisa per √2: per atterrare deve perdere quasi tutta questa velocità.`,
        p.pressure >= .1 ? `L’atmosfera, con ${it(p.pressure, p.pressure < 1 ? 2 : 1)} bar, frena la nave con l’attrito e la scalda: lo scudo termico disperde l’energia, e i motori lavorano soltanto negli ultimi chilometri.`
            : 'Senza un’atmosfera densa che la freni, tutta la velocità va tolta con i motori, come per gli atterraggi sulla Luna.',
        `Nell’ultima fase la nave scende da ${DESCENT.metres} m a ${it(v0, 0)} m/s e frena in modo uniforme: per fermarsi da v in un’altezza h serve un’accelerazione a = v²/(2h) = ${it(a, 1)} m/s². Con g = ${it(g, 2)} m/s² la spinta deve valere (a + g)/g = ${it((a + g) / g, 2)} volte il peso.`,
        `Per decollare i motori danno una spinta doppia del peso: la forza netta verso l’alto è uguale al peso, e la nave sale con un’accelerazione pari a g, ${it(g, 2)} m/s². In ${ASCENT.seconds} s sale di ${it(.5 * g * ASCENT.seconds ** 2, 0)} m.`
    ];
}
