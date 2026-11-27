/** The explorer on the ground (1.68.0): a colonist in the gear of the colony of the planet who walks, runs and
 * jumps with the gravity of the planet, or drives a six-wheeled rover. A colonist is 1.1 units tall, as a
 * person of 1.75 m, so one metre is 1.1 / 1.75 units. Speeds are human: 1.4 m/s walking, 3.6 m/s running; a
 * standing jump leaves the ground at 3.1 m/s, which on the Earth lifts the body by about 0.49 m. The rover
 * reaches 10 m/s. The functions are pure, so the same motion runs in the browser and in the tests. */
export const METRE = 1.1 / 1.75;
export const G0 = 9.81;
export const WALK = 1.4, RUN = 3.6, JUMP = 3.1;
export const FOOT = Object.freeze({ slope: 35, wade: .5, turn: 2.4, accel: 6 });
export const ROVER = Object.freeze({ top: 10, accel: 2.5, brake: 6, turn: .9, slope: 25, wade: .3, length: 1.3, width: .9 });
/** Half side of the zone of the landing site that the explorer may walk (1.70.0): 1250 units, about 2 km, so
 * the zone is about 4 km × 4 km around the base, as in Starfield, where one lands at a point and explores
 * the land round it. Until 1.69.0 the explorer stayed within 100 units. */
export const EDGE = 1250;
const clamp = (x, a, b) => Math.max(a, Math.min(b, x)), wrap = a => Math.atan2(Math.sin(a), Math.cos(a));

/** A standing jump with the gravity `g` of the planet, in units of the Earth's: height and time of flight from
 * h = v² / 2a and t = 2v / a, with a = g · 9.81 m/s². */
export function jumpOf(g) { const a = G0 * g; return { speed: JUMP, accel: a, height: JUMP * JUMP / (2 * a), time: 2 * JUMP / a, earth: JUMP * JUMP / (2 * G0) }; }

/** Forward direction of a heading: the models face +x, turned by the heading round the vertical axis. */
export const forward = h => [Math.cos(h), -Math.sin(h)];

/** A new explorer at (x, z) on foot, with the rover parked `park` units to its side. */
export function newExplorer(x, z, h, env, park = 3) {
    const y = env.ground(x, z), side = [Math.sin(h), Math.cos(h)];
    let spot = [x + side[0] * park, z + side[1] * park];
    if (!parkable(spot[0], spot[1], h, env)) spot = freeSpot(x, z, env, ROVER, park, h) || [x, z];
    const rover = { x: spot[0], z: spot[1], h, ...lean(spot[0], spot[1], h, env) };
    return { x, z, y, vy: 0, h, cam: h, speed: 0, mode: 'piedi', grounded: true, jumping: false, gait: 0, take: y, peak: y, jumps: 0, last: 0, best: 0, walked: 0, driven: 0, pitch: 0, roll: 0, rover };
}

/** Whether the explorer may step from (x0, z0) to (x, z): inside the map, outside the buildings and the
 * stations, out of water deeper than it can wade, and not up a slope steeper than it can climb. */
export function passable(x, z, x0, z0, env, limits, airborne) {
    if (Math.abs(x) > EDGE || Math.abs(z) > EDGE || env.blocked(x, z)) return false;
    const y = env.ground(x, z);
    if (env.sea !== null && env.sea !== undefined && y < env.sea - limits.wade) return false;
    const run = Math.hypot(x - x0, z - z0), rise = y - env.ground(x0, z0);
    return airborne || rise <= Math.tan(limits.slope * Math.PI / 180) * run + 1e-6;
}

/** One step of `dt` seconds. `input` has forward and turn in [−1, 1], run and jump; a heading with a push,
 * from a joystick; or a goal [x, z] that steers the explorer there and a distance `stop` at which it halts.
 * Returns the events of the step: 'salto', 'atterraggio', 'fermo', 'arrivato', and 'confine' at the edge
 * of the zone. */
export function stepExplorer(a, input, dt, env) {
    dt = clamp(dt, 0, .1);
    const rover = a.mode === 'rover', L = rover ? ROVER : FOOT, M = METRE, ev = [];
    let fwd = clamp(input.forward || 0, -1, 1), turn = clamp(input.turn || 0, -1, 1), run = !!input.run;
    // A joystick gives a heading and a push from 0 to 1: the explorer turns towards it and runs past 0.75.
    if (Number.isFinite(input.heading)) {
        const diff = wrap(input.heading - a.h), push = clamp(input.push ?? 1, 0, 1);
        turn = clamp(diff * 3, -1, 1); fwd = push * (Math.abs(diff) > 1.6 ? .1 : 1); run = push > .75;
    }
    if (input.goal) {
        const dx = input.goal[0] - a.x, dz = input.goal[1] - a.z, d = Math.hypot(dx, dz);
        if (d < (input.stop ?? (rover ? 3 : 1.5))) { ev.push('arrivato'); fwd = 0; turn = 0; }
        else { const diff = wrap(Math.atan2(-dz, dx) - a.h); turn = clamp(diff * 2, -1, 1); fwd = Math.abs(diff) > 1.2 ? .15 : rover ? clamp(d / 12, .25, 1) : 1; run = true; }
    }
    if (rover) {
        const top = ROVER.top * M, want = fwd * top, same = want === 0 ? false : Math.sign(want) === Math.sign(a.speed) || Math.abs(a.speed) < 1e-3;
        const acc = (same ? ROVER.accel : ROVER.brake) * M * dt;
        a.speed += clamp(want - a.speed, -acc, acc);
        a.h = wrap(a.h + turn * ROVER.turn * dt * clamp(Math.abs(a.speed) / (2 * M) + .25, 0, 1) * (a.speed < -1e-3 ? -1 : 1));
    } else {
        a.h = wrap(a.h + turn * FOOT.turn * dt);
        const want = fwd * (fwd < 0 ? WALK * .6 : run ? RUN : WALK) * M, acc = FOOT.accel * dt;
        a.speed += clamp(want - a.speed, -acc, acc);
    }
    const step = a.speed * dt;
    if (Math.abs(step) > 1e-7) {
        const [fx, fz] = forward(a.h), air = !a.grounded, ok = (x, z) => passable(x, z, a.x, a.z, env, L, air) && (!rover || corners(x, z, a.h).every(([cx, cz]) => !env.blocked(cx, cz)));
        let nx = a.x + fx * step, nz = a.z + fz * step;
        if (!ok(nx, nz)) { if (Math.abs(nx) > EDGE || Math.abs(nz) > EDGE) ev.push('confine'); if (Math.abs(nx - a.x) > 1e-9 && ok(nx, a.z)) nz = a.z; else if (Math.abs(nz - a.z) > 1e-9 && ok(a.x, nz)) nx = a.x; else { nx = a.x; nz = a.z; a.speed = 0; ev.push('fermo'); } }
        const moved = Math.hypot(nx - a.x, nz - a.z) / M; a.x = nx; a.z = nz;
        if (rover) a.driven += moved; else a.walked += moved;
    }
    const ground = env.ground(a.x, a.z), g = env.gravity * G0 * M;
    if (!rover && input.jump && a.grounded) { a.vy = JUMP * M; a.grounded = false; a.jumping = true; a.take = a.y; a.peak = a.y; a.jumps++; ev.push('salto'); }
    // Walking off a ledge more than 0.6 units high starts a fall with the gravity of the planet.
    if (a.grounded && !rover && ground < a.y - .6) { a.grounded = false; a.jumping = false; a.vy = 0; a.take = a.y; a.peak = a.y; }
    if (!a.grounded) {
        // Exact for a constant acceleration: the top of the arc is y + v² / 2g when the speed changes sign.
        if (a.vy > 0 && a.vy <= g * dt) a.peak = Math.max(a.peak, a.y + a.vy * a.vy / (2 * g));
        a.y += a.vy * dt - g * dt * dt / 2; a.vy -= g * dt; a.peak = Math.max(a.peak, a.y);
        if (a.y <= ground) { a.y = ground; a.vy = 0; a.grounded = true; if (a.jumping) { a.last = (a.peak - a.take) / M; a.best = Math.max(a.best, a.last); } a.jumping = false; ev.push('atterraggio'); }
    } else a.y = ground;
    if (rover) {
        // The rover leans with the ground under its wheels.
        const L0 = lean(a.x, a.z, a.h, env), k = clamp(dt * 8, 0, 1);
        a.pitch += (L0.pitch - a.pitch) * k; a.roll += (L0.roll - a.roll) * k; a.y = L0.y;
        a.rover = { x: a.x, z: a.z, h: a.h, y: a.y, pitch: a.pitch, roll: a.roll };
    }
    a.gait = !a.grounded ? 0 : Math.abs(a.speed) > WALK * M * 1.25 ? 2 : Math.abs(a.speed) > .05 ? 1 : 0;
    // The camera turns behind the explorer while it moves.
    if (Math.abs(a.speed) > .05 || rover) a.cam = wrap(a.cam + wrap(a.h - a.cam) * clamp(dt * 2.5, 0, 1));
    return ev;
}
/** Height, pitch and roll of the rover standing at (x, z) with heading h: the mean height of the ground under
 * the front and the rear wheels, and the slopes along and across the chassis. */
export function lean(x, z, h, env) {
    const [fx, fz] = forward(h), g = (u, v) => env.ground(x + fx * u + fz * v, z + fz * u - fx * v), L = ROVER.length, W = ROVER.width;
    const front = (g(L, W) + g(L, -W)) / 2, back = (g(-L, W) + g(-L, -W)) / 2, left = (g(L, W) + g(-L, W)) / 2, right = (g(L, -W) + g(-L, -W)) / 2;
    return { y: Math.max(env.ground(x, z), (front + back) / 2), pitch: Math.atan2(front - back, 2 * L), roll: Math.atan2(left - right, 2 * W) };
}
/** Whether the rover may stand at (x, z) with heading h: its centre and its four corners on free ground. */
export function parkable(x, z, h, env) { return passable(x, z, x, z, env, ROVER, true) && corners(x, z, h).every(([cx, cz]) => passable(cx, cz, cx, cz, env, ROVER, true)); }
/** The free point nearest to (x, z) on rings 1.5 units apart, from radius `from` to 40: free for the explorer
 * on foot, or for the rover with heading h when `limits` is ROVER. */
export function freeSpot(x, z, env, limits = FOOT, from = 0, h = 0) {
    for (let r = from; r <= 40; r += 1.5) {
        const n = r ? Math.ceil(r * 4) : 1;
        for (let k = 0; k < n; k++) { const t = k / n * 2 * Math.PI, px = x + Math.cos(t) * r, pz = z + Math.sin(t) * r; if (limits === ROVER ? parkable(px, pz, h, env) : passable(px, pz, px, pz, env, limits, true)) return [px, pz]; }
    }
    return null;
}
/** Quick travel to the point (x, z): the explorer, or the rover with the explorer on board, stops on free
 * ground `gap` units before it, on the side it comes from, facing it; on foot the rover follows and parks
 * beside. Returns false when no free ground is found within 40 units. */
export function travelTo(a, x, z, env, gap = a.mode === 'rover' ? 9 : 5) {
    const dx = a.x - x, dz = a.z - z, d = Math.hypot(dx, dz) || 1, h = Math.atan2(dz / d, -dx / d), rover = a.mode === 'rover';
    const spot = freeSpot(x + dx / d * gap, z + dz / d * gap, env, rover ? ROVER : FOOT, 0, h); if (!spot) return false;
    Object.assign(a, { x: spot[0], z: spot[1], h, cam: h, speed: 0, vy: 0, grounded: true, jumping: false });
    if (rover) { const L0 = lean(a.x, a.z, h, env); Object.assign(a, { y: L0.y, pitch: L0.pitch, roll: L0.roll }); a.rover = { x: a.x, z: a.z, h, ...L0 }; }
    else { a.y = env.ground(a.x, a.z); const side = [Math.sin(h) * 3, Math.cos(h) * 3], p = parkable(a.x + side[0], a.z + side[1], h, env) ? [a.x + side[0], a.z + side[1]] : freeSpot(a.x, a.z, env, ROVER, 3, h); if (p) a.rover = { x: p[0], z: p[1], h, ...lean(p[0], p[1], h, env) }; }
    return true;
}
/** Column-major matrix of the rover: translation, heading round the vertical axis, pitch round its side axis
 * and roll round its long axis, R = Ry(h) · Rz(pitch) · Rx(roll). */
export function roverMatrix(x, y, z, h, pitch = 0, roll = 0) {
    const ch = Math.cos(h), sh = Math.sin(h), cp = Math.cos(pitch), sp = Math.sin(pitch), cr = Math.cos(roll), sr = Math.sin(roll);
    return new Float32Array([cp * ch, sp, -cp * sh, 0, -sp * cr * ch + sh * sr, cp * cr, sp * cr * sh + ch * sr, 0, ch * sp * sr + sh * cr, -cp * sr, -sh * sp * sr + ch * cr, 0, x, y, z, 1]);
}
/** The four corners of the rover at (x, z) with heading h. */
export function corners(x, z, h) { const [fx, fz] = forward(h), L = ROVER.length, W = ROVER.width; return [[L, W], [L, -W], [-L, W], [-L, -W]].map(([u, v]) => [x + fx * u + fz * v, z + fz * u - fx * v]); }

/** Boards the rover when it is within 6 units, or leaves it on the side with free ground. Returns true when
 * the mode changed. */
export function toggleRover(a, env) {
    if (a.mode === 'rover') {
        const [fx, fz] = forward(a.h);
        for (const s of [1, -1, 2, -2]) { const x = a.x + fz * s * 1.8, z = a.z - fx * s * 1.8; if (passable(x, z, x, z, env, FOOT, true)) { a.rover = { x: a.x, z: a.z, h: a.h, ...lean(a.x, a.z, a.h, env) }; a.mode = 'piedi'; a.x = x; a.z = z; a.y = env.ground(x, z); a.speed = 0; a.pitch = a.roll = 0; return true; } }
        return false;
    }
    if (Math.hypot(a.rover.x - a.x, a.rover.z - a.z) > 6) return false;
    const L0 = lean(a.rover.x, a.rover.z, a.rover.h, env);
    Object.assign(a, { mode: 'rover', x: a.rover.x, z: a.rover.z, h: a.rover.h, cam: a.rover.h, speed: 0, vy: 0, grounded: true, jumping: false, y: L0.y, pitch: L0.pitch, roll: L0.roll });
    return true;
}
