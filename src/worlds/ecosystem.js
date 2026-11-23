/** Ecosystems of the landing surfaces (1.65.0): the animals move on the processor, in herds, packs, flocks
 * and drifting colonies, and the sun crosses the sky of the landing site. Grazers walk in herds between the
 * places where their species was placed (src/worlds/species.js, populate), so they stay in their habitat;
 * predators patrol, stalk the nearest herd of the species they eat and sprint for a few seconds, while the
 * herd flees; flyers fly in flocks that follow three rules on their neighbours (Reynolds, 1987) and roost at
 * night; floating colonies drift with the wind over the sea. Diurnal animals rest at night and nocturnal
 * predators hunt then. The simulation advances in fixed steps of 1/30 s from a seed, so the same planet with
 * the same steps gives the same scene; nothing is removed: a successful hunt makes the predator rest. */
import { seededRandom } from '../scene/systems.js';

export const STEP = 1 / 30;
/** Speeds in units per second and times in seconds of the scene. */
export const SPEED = Object.freeze({ graze: .25, walk: .7, flee: 3.2, stalk: 1.1, sprint: 4.2, fly: 3, drift: .35 });
export const HUNT = Object.freeze({ sight: 45, sprintFrom: 12, sprintTime: 8, fear: 16, fleeTime: 10, rest: 40, fail: 15, catch: 1.6 });
/** Share of its time an animal of a herd spends with its head up, watching (illustrative). */
export const VIGILANCE = .2;

/** Day on a landing site: the sun stays on the celestial equator, as at an equinox, so it is above the horizon
 * for half a rotation at every latitude. `hours` is the length of the day of the card in hours, with the
 * median planet at 24 h; a day of 24 h lasts 600 s of the scene. */
export const DAY_SECONDS = 600;
export function dayOf(g, site, light) {
    const hours = 24 * g.day.length / 177.3, seconds = DAY_SECONDS * hours / 24, lat = Math.asin(Math.max(-1, Math.min(1, site?.dir?.[1] ?? 0)));
    // Noon is towards the azimuth of the light of the surface (src/worlds/surface.js); the clock starts when
    // the sun has the height of that light, in the morning, so the landing view keeps its light.
    const az = Math.atan2(light[2], light[0]), el = Math.asin(light[1]), c = Math.cos(lat), start = Math.sin(el) >= c ? .5 : .5 - Math.acos(Math.sin(el) / c) / (2 * Math.PI);
    return { hours, seconds, lat, az, start };
}
/** Sun of a day at time `t` of the scene from the landing: direction, height in radians, fraction of the day. */
export function sunAt(D, t) {
    const f = ((D.start + t / D.seconds) % 1 + 1) % 1, H = 2 * Math.PI * (f - .5), s = D.lat < 0 ? -1 : 1;
    const noon = [Math.cos(D.az), Math.sin(D.az)], north = [-noon[0] * s, -noon[1] * s], east = [-noon[1], noon[0]];
    const e = -Math.sin(H), u = Math.cos(D.lat) * Math.cos(H), n = -Math.sin(D.lat) * Math.cos(H);
    const dir = [east[0] * e + north[0] * n, u, east[1] * e + north[1] * n], l = Math.hypot(...dir);
    return { dir: dir.map(v => v / l), height: Math.asin(u / l), fraction: f, hour: f * D.hours };
}

/** Ecosystem of a surface `s` with the individuals of its species `population` (surfaceScatter). */
export function ecosystem(s, population) {
    const g = s.genome, r = seededRandom(g.terrain.seed ^ 0xEC05), sea = s.seaY, groups = [];
    const dry = (x, z) => Math.abs(x) < 108 && Math.abs(z) < 108 && (sea === null || s.heightAt(x, z) > sea + .3) && !s.clear?.blocked(x, z);
    const wet = (x, z) => Math.abs(x) < 400 && Math.abs(z) < 400 && sea !== null && s.heightAt(x, z) < sea - .1;
    const wind = r() * Math.PI * 2;
    population.forEach((p, k) => {
        const sp = p.species; if (sp.kind !== 'animal' || !p.instances.length) return;
        const items = p.instances, spots = items.map(o => [o.x, o.z]);
        // Night habits: diurnal grazers and flyers; about half of the predators hunt at night.
        const nocturnal = sp.role === 'predatore' && ((g.terrain.seed >>> (k % 24)) & 1) === 1;
        const kind = sp.form === 'medusa' ? 'deriva' : sp.form === 'volatore' ? (sp.role === 'predatore' ? 'rapace' : 'stormo') : sp.role === 'predatore' ? 'branco' : 'mandria';
        // Groups: the individuals within 14 units of the first one still free form a group.
        const free = items.map((_, i) => i);
        while (free.length) {
            const first = items[free[0]], members = free.filter(i => Math.hypot(items[i].x - first.x, items[i].z - first.z) < 14);
            for (const i of members) free.splice(free.indexOf(i), 1);
            let cx = members.reduce((a, i) => a + items[i].x, 0) / members.length, cz = members.reduce((a, i) => a + items[i].z, 0) / members.length;
            // A walking group whose middle falls on water or on a street gathers round its member nearest to it.
            if (kind !== 'deriva' && kind !== 'stormo' && kind !== 'rapace' && !dry(cx, cz)) { const m = members.map(i => items[i]).filter(o => dry(o.x, o.z)).sort((a, b) => Math.hypot(a.x - cx, a.z - cz) - Math.hypot(b.x - cx, b.z - cz))[0] || items[members[0]]; cx = m.x; cz = m.z; }
            groups.push({ k, species: sp, kind, nocturnal, members, items, spots, x: cx, z: cz, heading: r() * Math.PI * 2, speed: 0, state: 'pascolo', timer: 3 + r() * 10, target: null, prey: null, chaser: null, hunts: 0, catches: 0,
                offsets: members.map(i => [items[i].x - cx, items[i].z - cz]), headings: members.map(i => items[i].h), gaits: members.map(() => 0), vel: members.map(() => { const a = r() * Math.PI * 2; return [Math.cos(a) * 2, Math.sin(a) * 2]; }), alt: members.map(i => items[i].y - s.heightAt(items[i].x, items[i].z)) });
        }
    });
    const eco = { groups, time: 0, acc: 0, wind: [Math.cos(wind) * SPEED.drift, Math.sin(wind) * SPEED.drift], hunts: 0, catches: 0 };
    const pick = G => { const near = G.spots.filter(([x, z]) => Math.hypot(x - G.x, z - G.z) < 35); const list = near.length ? near : G.spots; return list[Math.floor(r() * list.length)]; };
    const preyOf = G => groups.filter(H => H.kind === 'mandria' && G.species.diet.includes(H.species.id));
    function move(G, speed, toX, toZ, dt) {
        const dx = toX - G.x, dz = toZ - G.z, d = Math.hypot(dx, dz); if (d < 1e-6) { G.speed = 0; return d; }
        const step = Math.min(d, speed * dt), nx = G.x + dx / d * step, nz = G.z + dz / d * step;
        if (G.kind !== 'stormo' && G.kind !== 'rapace' && !dry(nx, nz)) { G.target = pick(G); G.speed = 0; return d; }
        G.x = nx; G.z = nz; G.heading = Math.atan2(-dz, dx); G.speed = speed; return d - step;
    }
    function tick(dt, daylight) {
        for (const G of groups) {
            const awake = G.nocturnal ? daylight < .2 : daylight > .15;
            // A drifting colony moves while every float of it stays over the sea; at the shore the wind turns.
            if (G.kind === 'deriva') { const w = G.wind ||= [...eco.wind], nx = G.x + w[0] * dt, nz = G.z + w[1] * dt; if (G.offsets.every(([ox, oz]) => wet(nx + ox, nz + oz))) { G.x = nx; G.z = nz; G.speed = SPEED.drift; } else { G.wind = [-w[0], -w[1]]; G.speed = 0; } G.heading = Math.atan2(-G.wind[1], G.wind[0]); continue; }
            if (G.kind === 'mandria') {
                // A predator closer than HUNT.fear makes the herd run away from it.
                const threat = groups.find(P => P.prey === G && P.state === 'scatto' && Math.hypot(P.x - G.x, P.z - G.z) < HUNT.fear);
                if (threat) { G.state = 'fuga'; G.timer = HUNT.fleeTime; G.chaser = threat; }
                if (G.state === 'fuga') { const P = G.chaser, dx = G.x - P.x, dz = G.z - P.z, d = Math.hypot(dx, dz) || 1; move(G, SPEED.flee, G.x + dx / d * 10, G.z + dz / d * 10, dt); if ((G.timer -= dt) <= 0) { G.state = 'pascolo'; G.timer = 6; G.chaser = null; } continue; }
                if (!awake) { G.state = 'riposo'; G.speed = 0; continue; }
                if (G.state === 'riposo') G.state = 'pascolo';
                if ((G.timer -= dt) <= 0) { if (G.state === 'pascolo') { G.state = 'cammino'; G.target = pick(G); G.timer = 25; } else { G.state = 'pascolo'; G.timer = 8 + r() * 14; } }
                if (G.state === 'cammino') { if (!G.target || move(G, SPEED.walk, G.target[0], G.target[1], dt) < .5) { G.state = 'pascolo'; G.timer = 8 + r() * 14; } }
                else G.speed = SPEED.graze * .2;
                continue;
            }
            if (G.kind === 'branco' || G.kind === 'rapace') {
                if (G.state === 'pasto' || G.state === 'sosta') { G.speed = 0; if ((G.timer -= dt) <= 0) G.state = 'pattuglia'; continue; }
                if (!awake) { G.state = 'riposo'; G.speed = 0; G.prey = null; continue; }
                if (G.state === 'riposo' || G.state === 'pascolo') G.state = 'pattuglia';
                if (G.state === 'pattuglia') {
                    const near = preyOf(G).map(H => [H, Math.hypot(H.x - G.x, H.z - G.z)]).filter(([, d]) => d < HUNT.sight).sort((a, b) => a[1] - b[1])[0];
                    if (near) { G.state = 'agguato'; G.prey = near[0]; }
                    else { if (!G.target || move(G, SPEED.walk, G.target[0], G.target[1], dt) < .5) G.target = pick(G); }
                    continue;
                }
                const H = G.prey, d = Math.hypot(H.x - G.x, H.z - G.z);
                if (G.state === 'agguato') { if (d < HUNT.sprintFrom) { G.state = 'scatto'; G.timer = HUNT.sprintTime; eco.hunts++; G.hunts++; } else if (d > HUNT.sight * 1.3) { G.state = 'pattuglia'; G.prey = null; } else move(G, SPEED.stalk, H.x, H.z, dt); continue; }
                if (G.state === 'scatto') {
                    move(G, SPEED.sprint, H.x, H.z, dt); G.timer -= dt;
                    // Within HUNT.catch of the herd: the chance of success falls as the herd grows (dilution).
                    if (Math.hypot(H.x - G.x, H.z - G.z) < HUNT.catch) { const ok = r() < 1.5 / (H.members.length + 1); if (ok) { G.catches++; eco.catches++; } G.state = ok ? 'pasto' : 'sosta'; G.timer = ok ? HUNT.rest : HUNT.fail; G.prey = null; }
                    else if (G.timer <= 0) { G.state = 'sosta'; G.timer = HUNT.fail; G.prey = null; }
                }
                continue;
            }
            // Flock: the centre wanders between the spots of the species; at night the flock roosts.
            if (!awake) { G.state = 'riposo'; G.speed = 0; continue; }
            G.state = 'volo';
            if (!G.target || Math.hypot(G.target[0] - G.x, G.target[1] - G.z) < 3) G.target = pick(G);
            const dx = G.target[0] - G.x, dz = G.target[1] - G.z, d = Math.hypot(dx, dz) || 1; G.x += dx / d * SPEED.walk * dt; G.z += dz / d * SPEED.walk * dt; G.heading = Math.atan2(-dz, dx); G.speed = SPEED.walk;
        }
    }
    /** Positions, headings and gaits of the individuals from the state of their groups. */
    function place(dt) {
        for (const G of groups) {
            const n = G.members.length, flying = G.kind === 'stormo' || G.kind === 'rapace', airborne = flying && !['riposo', 'pasto', 'sosta'].includes(G.state), low = G.state === 'scatto' ? .25 : 1;
            if (airborne) {
                // Reynolds: towards the centre of the flock, along its mean velocity, away from close neighbours.
                const cx = G.members.reduce((a, i) => a + G.items[i].x, 0) / n, cz = G.members.reduce((a, i) => a + G.items[i].z, 0) / n, mv = G.vel.reduce((a, v) => [a[0] + v[0] / n, a[1] + v[1] / n], [0, 0]);
                G.members.forEach((i, j) => {
                    const o = G.items[i], v = G.vel[j]; let sx = 0, sz = 0;
                    G.members.forEach((m, q) => { if (q === j) return; const dx = o.x - G.items[m].x, dz = o.z - G.items[m].z, dd = Math.hypot(dx, dz); if (dd < 2.5 && dd > 1e-6) { sx += dx / dd / dd; sz += dz / dd / dd; } });
                    const ax = (cx - o.x) * .25 + (mv[0] - v[0]) * .8 + sx * 3 + (G.x - cx) * .6, az = (cz - o.z) * .25 + (mv[1] - v[1]) * .8 + sz * 3 + (G.z - cz) * .6;
                    v[0] += ax * dt; v[1] += az * dt; const sp = Math.hypot(...v) || 1, k = Math.max(SPEED.fly * .7, Math.min(SPEED.fly * 1.3, sp)) / sp; v[0] *= k; v[1] *= k;
                    o.x += v[0] * dt; o.z += v[1] * dt; o.y += (s.heightAt(o.x, o.z) + G.alt[j] * low - o.y) * Math.min(1, dt * 1.5); o.h = Math.atan2(-v[1], v[0]); G.gaits[j] = 2;
                });
                continue;
            }
            G.members.forEach((i, j) => {
                const o = G.items[i], [ox, oz] = G.offsets[j], x = G.x + ox, z = G.z + oz, moving = G.speed > SPEED.graze;
                // Flyers at rest glide down to their place in the roost.
                if (flying) { o.x += (x - o.x) * Math.min(1, dt * .8); o.z += (z - o.z) * Math.min(1, dt * .8); const ground = s.heightAt(o.x, o.z) - .05; o.y = ground + Math.max(0, o.y - ground) * Math.max(0, 1 - dt); G.gaits[j] = 0; return; }
                if (G.kind === 'deriva') { o.x = x; o.z = z; o.h = G.heading; G.gaits[j] = 0; return; }
                o.x = x; o.z = z; o.y = s.heightAt(x, z) - .05;
                if (moving) { o.h = G.heading; G.gaits[j] = G.speed > 2 ? 2 : 1; }
                else { o.h += (Math.sin(eco.time * .3 + j * 1.7) * .2) * dt; G.gaits[j] = G.state === 'pascolo' && Math.sin(eco.time * .5 + j) > .7 ? 1 : 0; }
            });
        }
    }
    eco.step = (dt, daylight = 1) => {
        eco.acc += Math.min(dt, .5); let n = 0;
        while (eco.acc >= STEP) { eco.acc -= STEP; eco.time += STEP; tick(STEP, daylight); place(STEP); n++; }
        if (n) for (const G of groups) G.members.forEach((i, j) => { G.items[i].gait = G.gaits[j]; });
        return n;
    };
    /** Group of species `k` nearest to a point, for the camera and the panel. */
    eco.groupOf = (k, near = [0, 0]) => groups.filter(G => G.k === k).sort((a, b) => Math.hypot(a.x - near[0], a.z - near[1]) - Math.hypot(b.x - near[0], b.z - near[1]))[0] || null;
    return eco;
}
/** Heading of an animal with its gait (0 standing, 1 walking, 2 running or flying), for shader mode 8. */
export const gaitHeading = (h, gait) => (((h % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI)) + 7 * gait;
