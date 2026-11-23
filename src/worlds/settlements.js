/** Settlements of the landing surfaces (1.64.0). Every planet has a human colony, laid out along streets that
 * grow from a square over the flat dry ground beyond the stations, and adapted to the identity card: sealed
 * domes where the air is too thin to breathe, houses on piles over the shallow sea of the oceanic planets,
 * low buildings under high gravity, towers under low gravity. The planets with a sea, an atmosphere of density
 * at least 0.45 and at least 15 species also have a village of a native people, round a fire, with paths to
 * the huts and to the water. Plans are deterministic: the same planet gives the same colony. */
import { dice } from '../craft/kit.js';
import { buildingSpec, VILLAGE_TYPES } from './buildings.js';
import { archSpec, archPalette, typologyOf, ARCH_TYPES, TYPOLOGIES } from './architecture.js';
import { TAU } from '../craft/kit.js';
import { colonistSpec, nativeSpec, COLONIST_FIGURES, GEAR } from './people.js';

export const COLONY_ID = 'l8', VILLAGE_ID = 'l9';
/** Length of the stretch of street along which one inhabitant walks back and forth (shader mode 7). */
export const WALK = Object.freeze({ colonia: 6, villaggio: 4 });
/** A village needs liquid water, air that can carry a biosphere and a rich one. */
export const VILLAGE_RULE = Object.freeze({ sea: .15, density: .45, species: 15 });
const VIEW = [[2, 2], [-4, 8]], EYE = [37.4, 53.8], EDGE = 104;
const comma = (x, d = 2) => x.toFixed(d).replace('.', ',');
const mix = (a, b, t) => a.map((x, i) => x + (b[i] - x) * t);
const rgba = c => [...c.slice(0, 3).map(v => Math.round(Math.max(0, Math.min(1, v)) * 1000) / 1000), 1];
const SYL = ['ra', 'ne', 'to', 'li', 'va', 'mo', 'se', 'ca', 'du', 'ri', 'pa', 'lo', 'ten', 'mar', 'sol', 'ver', 'ar', 'el', 'ora', 'is'];
const NATIVE_SYL = ['ka', 'ru', 'ti', 'mo', 'en', 'sha', 'lu', 'ok', 'ya', 'zi', 'ha', 'no', 'ur', 'qe', 'ma', 'tal'];
const word = (d, list, n) => { let w = ''; for (let k = 0; k < n; k++) w += d.pick(list); return w[0].toUpperCase() + w.slice(1); };

/** Traits of the colony of a planet, read from its identity card (1.66.0): its kind of settlement, the gravity,
 * the climate, the source of power and the colours of its buildings. */
export function colonyParams(g, speciesCount = 0) {
    const d = g.atmosphere.density, typology = typologyOf(g, speciesCount), low = g.gravity > 1.15, tall = g.gravity < .85, cold = g.family === 'arctic', hot = g.family === 'desert' || g.family === 'volcanic';
    const power = g.family === 'volcanic' ? 'geotermia' : d > .6 ? 'vento' : 'sole';
    return { typology, sealed: typology === 'sigillato', low, tall, cold, hot, volcanic: g.family === 'volcanic', power, gravity: g.gravity, floorsMax: low ? 2 : tall ? 5 : 4, colors: archPalette(g, typology) };
}
/** Number of buildings the colony of a planet aims at: more where the planet is easier to live on. */
const HOSPITALITY = { terrestrial: 1, oceanic: .85, volcanic: .45, desert: .35, arctic: .35, barren: .15 };
export const colonyTarget = (g, u) => Math.round(28 + 72 * HOSPITALITY[g.family] * (.75 + .25 * u));

/** Settlements of surface `s` (src/worlds/surface.js): the colony, then the village where there is one. The
 * plans read the ground as it is; then streets and building pads are graded into the height grid `T`
 * ({ Y, n, cell }) of the surface, as colonists level the ground before building, and the paths of the
 * village follow the graded ground. */
export function settle(s, speciesCount, T = null) {
    const g = s.genome, wants = g.terrain.seaLevel >= VILLAGE_RULE.sea && g.atmosphere.density >= VILLAGE_RULE.density && speciesCount >= VILLAGE_RULE.species;
    // The ground of the village is chosen first and kept free of the colony.
    const site = wants ? villageSite(s) : null, ops = [], colony = colonyPlan(s, ops, site ? [site[0], site[1], VILLAGE_RADIUS + 6] : null), out = [colony];
    if (site) { const v = villagePlan(s, colony, ops, site); if (v) out.push(v); }
    if (T) grade(T, ops);
    for (const v of out.filter(t => t.kind === 'villaggio')) {
        for (const p of v.streets) for (const q of p.points) q[1] = Math.round((s.heightAt(q[0], q[2]) + .08) * 1000) / 1000;
        for (const w of v.walkers) { const a = [w.x + Math.cos(w.h) * WALK.villaggio / 2, w.z - Math.sin(w.h) * WALK.villaggio / 2], b = [w.x - Math.cos(w.h) * WALK.villaggio / 2, w.z + Math.sin(w.h) * WALK.villaggio / 2], ya = s.heightAt(...a), yb = s.heightAt(...b); w.y = (ya + yb) / 2 + .08; w.slope = (ya - yb) / WALK.villaggio; }
        for (const b of v.buildings) b.y = s.heightAt(b.x, b.z);
        v.position[1] = s.heightAt(v.position[0], v.position[2]);
    }
    return out;
}
/** Levels the height grid under the streets (a linear profile between crossings) and the building pads,
 * with a slope of 1.5 units round them; where two works meet, the one whose edge is nearer decides. */
export function grade(T, ops) {
    const { Y, n, cell } = T, X0 = -(n - 1) * cell / 2, best = new Float32Array(n * n).fill(Infinity), target = new Float32Array(n * n), weight = new Float32Array(n * n);
    for (const o of ops) {
        const [x0, z0, x1, z1] = o.seg ? [Math.min(o.seg[0], o.seg[2]), Math.min(o.seg[1], o.seg[3]), Math.max(o.seg[0], o.seg[2]), Math.max(o.seg[1], o.seg[3])] : [o.pad[0], o.pad[1], o.pad[0], o.pad[1]], reach = (o.seg ? o.half : o.r) + o.fall;
        const i0 = Math.max(0, Math.floor((x0 - reach - X0) / cell)), i1 = Math.min(n - 1, Math.ceil((x1 + reach - X0) / cell)), j0 = Math.max(0, Math.floor((z0 - reach - X0) / cell)), j1 = Math.min(n - 1, Math.ceil((z1 + reach - X0) / cell));
        for (let j = j0; j <= j1; j++) for (let i = i0; i <= i1; i++) {
            const x = X0 + i * cell, z = X0 + j * cell; let dist, y;
            if (o.seg) { const [ax, az, bx, bz] = o.seg, dx = bx - ax, dz = bz - az, l = dx * dx + dz * dz || 1, t = Math.max(0, Math.min(1, ((x - ax) * dx + (z - az) * dz) / l)); dist = Math.hypot(x - ax - t * dx, z - az - t * dz) - o.half; y = o.ya + (o.yb - o.ya) * t; }
            else { dist = Math.hypot(x - o.pad[0], z - o.pad[1]) - o.r; y = o.y; }
            const k = j * n + i;
            if (dist < o.fall && dist < best[k]) { best[k] = dist; target[k] = y; weight[k] = dist <= 0 ? 1 : 1 - dist / o.fall; }
        }
    }
    for (let k = 0; k < n * n; k++) if (weight[k] > 0) Y[k] += (target[k] - Y[k]) * weight[k];
}

/** Spatial index of the footprints and streets of the settlements: what the species must leave free and what
 * the camera must stay above. */
export function clearance(settlements) {
    const cell = 4, map = new Map(), key = (i, j) => i * 4096 + j, roofs = new Map();
    const add = (x0, z0, x1, z1, item) => { for (let i = Math.floor(x0 / cell); i <= Math.floor(x1 / cell); i++) for (let j = Math.floor(z0 / cell); j <= Math.floor(z1 / cell); j++) { const k = key(i, j); if (!map.has(k)) map.set(k, []); map.get(k).push(item); } };
    for (const t of settlements) {
        for (const b of t.buildings) { const r = b.radius + .4; add(b.x - r, b.z - r, b.x + r, b.z + r, { c: [b.x, b.z, r] }); for (let i = Math.floor((b.x - b.radius) / 2); i <= Math.floor((b.x + b.radius) / 2); i++) for (let j = Math.floor((b.z - b.radius) / 2); j <= Math.floor((b.z + b.radius) / 2); j++) { const k = key(i, j); roofs.set(k, Math.max(roofs.get(k) ?? -1e9, b.y + b.height)); } }
        for (const st of t.streets) for (let k = 1; k < st.points.length; k++) { const a = st.points[k - 1], b = st.points[k], w = st.width / 2 + .5; add(Math.min(a[0], b[0]) - w, Math.min(a[2], b[2]) - w, Math.max(a[0], b[0]) + w, Math.max(a[2], b[2]) + w, { s: [a[0], a[2], b[0], b[2], w] }); }
    }
    const blocked = (x, z) => (map.get(key(Math.floor(x / cell), Math.floor(z / cell))) || []).some(it => it.c ? Math.hypot(x - it.c[0], z - it.c[1]) < it.c[2] : segment(x, z, ...it.s.slice(0, 4)) < it.s[4]);
    const roofAt = (x, z) => roofs.get(key(Math.floor(x / 2), Math.floor(z / 2))) ?? -1e9;
    return { blocked, roofAt };
}
function segment(x, z, ax, az, bx, bz) { const dx = bx - ax, dz = bz - az, l = dx * dx + dz * dz || 1, t = Math.max(0, Math.min(1, ((x - ax) * dx + (z - az) * dz) / l)); return Math.hypot(x - ax - t * dx, z - az - t * dz); }

/** Common checks of a footprint: inside the square, clear of stations, places, the view and other buildings. */
function siteChecks(s, placed, streets, reserve = null) {
    const sea = s.seaY, free = (x, z, r) => !reserve || Math.hypot(x - reserve[0], z - reserve[1]) > reserve[2] + r;
    const ground = (x, z) => s.heightAt(x, z);
    const clearOf = (x, z, r) => free(x, z, r) && Math.abs(x) + r < EDGE && Math.abs(z) + r < EDGE && s.stations.every(st => Math.hypot(st.position[0] - x, st.position[2] - z) > r + 5)
        && s.places.every(p => Math.hypot(p.position[0] - x, p.position[2] - z) > r + 4) && VIEW.every(v => Math.hypot(v[0] - x, v[1] - z) > r + 7)
        && placed.every(b => Math.hypot(b.x - x, b.z - z) > b.radius + r + .6) && streets.every(st => st.points.every((p, k) => !k || segment(x, z, st.points[k - 1][0], st.points[k - 1][2], p[0], p[2]) > r + st.width / 2 + .3));
    // Ground that can be levelled for a footprint: dry, with the heights at the centre and at eight points of
    // the rim within `cut` units of the floor `y`. On piles: shallow sea, floor 1.1 units over the water.
    const level = (x, z, r, y = null, cut = 3, water = false) => {
        const h = [ground(x, z), ...[0, 1, 2, 3, 4, 5, 6, 7].map(k => ground(x + Math.cos(k * .785) * r, z + Math.sin(k * .785) * r))];
        if (water) return sea !== null && h.every(q => q < sea + .3 && q > sea - 4) ? sea + 1.1 : null;
        if (sea !== null && h.some(q => q < sea + .3)) return null;
        const floor = y ?? h.reduce((a, b) => a + b, 0) / h.length;
        return h.every(q => Math.abs(q - floor) <= cut) && (sea === null || floor > sea + .35) ? floor : null;
    };
    return { clearOf, level, ground, free };
}
const heading = (dx, dz) => Math.atan2(-dz, dx);

/** Central building, zones and services of the three kinds of colony (1.66.0). The colony grows from a hub
 * along spokes and rings of streets; each sector between two spokes has one function, and the sides of the
 * streets near the hub take the homes of the core. Caps limit the buildings that a colony needs only once or
 * twice. */
export const HUB = Object.freeze({ sigillato: 'hub', simbiotico: 'cuore', adattato: 'centrale' });
export const ZONES = Object.freeze({
    sigillato: { nucleo: ['modulo', 'modulo', 'schermato', 'cupola'], abitativo: ['modulo', 'schermato', 'cupola', 'pila'], agricolo: ['serra', 'serra', 'cupola'], industriale: ['estrattore', 'reattore', 'radiatori', 'modulo'], scientifico: ['antenna', 'cupola', 'modulo'] },
    simbiotico: { nucleo: ['baccello', 'gemelli', 'torreviva'], abitativo: ['baccello', 'baccello', 'gemelli', 'torreviva'], agricolo: ['membrana', 'membrana', 'bioreattore'], industriale: ['bioreattore', 'membrana', 'baccello'], scientifico: ['regolatore', 'ramo', 'baccello'] },
    adattato: { nucleo: ['piloni', 'terrazza'], abitativo: ['piloni', 'piloni', 'terrazza'], agricolo: ['capannone', 'capannone', 'sfere'], industriale: ['processore', 'sfere', 'container', 'hangar'], scientifico: ['antenna', 'piloni', 'sfere'] }
});
export const ZONE_NAMES = Object.freeze({ nucleo: 'nucleo abitato', abitativo: 'abitazioni', agricolo: 'coltivazioni', industriale: 'industria', scientifico: 'ricerca' });
const CAPS = { reattore: 1, estrattore: 2, processore: 2, hangar: 2, container: 3, torreviva: 4, antenna: 2, regolatore: 4, ramo: 3, pila: 4 };
const SECTORS = { 5: ['abitativo', 'agricolo', 'abitativo', 'industriale', 'scientifico'], 6: ['abitativo', 'agricolo', 'abitativo', 'industriale', 'abitativo', 'scientifico'], 7: ['abitativo', 'agricolo', 'abitativo', 'industriale', 'abitativo', 'agricolo', 'scientifico'] };
const SERVICES = { sigillato: [['piattaforma', 2], ['solare', 3], ['radiatori', 1], ['antenna', 1]], simbiotico: [['foglia', 2], ['regolatore', 2], ['ramo', 1]], adattato: [['piattaforma', 1], ['energia', 2], ['antenna', 1]] };
const ROLES = [[.86, .46, .16], [.27, .42, .66], [.86, .72, .22], [.9, .9, .88], [.68, .22, .16], [.3, .56, .36]];

/** The colony: a hub at the centre, streets along spokes and rings grown over the flat dry ground, buildings
 * along the streets by zone, services at the edge, inhabitants walking along the streets. */
export function colonyPlan(s, ops = [], reserve = null) {
    const g = s.genome, d = dice(g.terrain.seed ^ 0xC0105), P = colonyParams(g, s.species?.length ?? 0), typ = P.typology, sea = s.seaY;
    const target = colonyTarget(g, d.next()), name = d.pick(['Porto', 'Nuova', 'Base', 'Rada', 'Borgo', 'Approdo']) + ' ' + word(d, SYL, d.int(2, 3));
    const C0 = siteChecks(s, [], [], reserve), stilts = g.family === 'oceanic' && sea !== null;
    const wetAt = (x, z) => sea !== null && C0.ground(x, z) < sea + .3;
    const smooth = (x, z) => (C0.ground(x, z) * 2 + C0.ground(x + 2, z) + C0.ground(x - 2, z) + C0.ground(x, z + 2) + C0.ground(x, z - 2)) / 6;
    // Centres: beyond the view target, away from the default camera, where the ground is flat and dry. The
    // best six, at least 20 units apart, are tried in turn until one carries most of the colony.
    const away = [VIEW[0][0] - EYE[0], VIEW[0][1] - EYE[1]], al = Math.hypot(...away), base = Math.atan2(away[1] / al, away[0] / al), found = [];
    for (const dist of [34, 42, 50, 58, 66, 76]) for (const da of [0, .3, -.3, .6, -.6, .9, -.9, 1.25, -1.25, 1.6, -1.6, 2, -2, 2.5, -2.5, 3.1]) {
        const x = VIEW[0][0] + Math.cos(base + da) * dist, z = VIEW[0][1] + Math.sin(base + da) * dist;
        if (Math.abs(x) > EDGE - 20 || Math.abs(z) > EDGE - 20 || !C0.clearOf(x, z, 8) || C0.level(x, z, 8, null, 3) === null) continue;
        let dry = 0, n = 0, lo = Infinity, hi = -Infinity;
        for (let a = 0; a < 12; a++) for (const rr of [6, 12, 18, 26]) { const y = C0.ground(x + Math.cos(a * .5236) * rr, z + Math.sin(a * .5236) * rr); n++; if (sea === null || y > sea + .3) dry++; lo = Math.min(lo, y); hi = Math.max(hi, y); }
        found.push({ x, z, score: dry / n * 10 - (hi - lo) * .25 - Math.abs(da) * .8 - dist * .02 });
    }
    found.sort((p, q) => q.score - p.score);
    const centres = []; for (const c of found) if (centres.length < 6 && centres.every(o => Math.hypot(o[0] - c.x, o[1] - c.z) >= 20)) centres.push([c.x, c.z]);
    if (!centres.length) centres.push([VIEW[0][0] + Math.cos(base) * 40, VIEW[0][1] + Math.sin(base) * 40]);
    // On rugged planets (canyons, steep relief) a second round accepts steeper streets and deeper cuts, as in
    // the hill towns of the Earth. A plan with its hub beats one without.
    const better = (t, o) => !o || t.placed.length + (t.hub ? 15 : 0) > o.placed.length + (o.hub ? 15 : 0);
    let plan = null;
    for (const steep of [false, true]) { for (const [k, c] of centres.entries()) { const t = layout(c, k, steep); if (better(t, plan)) plan = t; if (plan.hub && plan.placed.length >= target * .8) break; } if (plan.hub && plan.placed.length >= target * .5) break; }
    ops.push(...plan.ops);
    const { placed, streets, edges, types, centre } = plan, dd = plan.d, C = siteChecks(s, placed, streets, reserve);
    function layout(centre, attempt, steep) {
    const d = dice((g.terrain.seed ^ 0xC0105) + 101 * (attempt + 1) + (steep ? 7 : 0)), CUT = steep ? 6 : 3.5, placed = [], streets = [], ops = [], C = siteChecks(s, placed, streets, reserve), W = 2.4, RISE = steep ? .4 : .28;
    const types = {}, spec = t => (types[t] ||= archSpec(t, dice((g.terrain.seed ^ 0xB11D) + Object.keys(ARCH_TYPES[typ]).indexOf(t) * 7919), P)), SQUARE = spec(HUB[typ]).radius + .5;
    // Polar lattice: S spokes from the hub, rings R1 + (i − 1) B apart; on the second and the fourth ring every
    // arc is split in two, so the blocks stay about as long as they are deep.
    const S = d.int(5, 7), T0 = d.range(0, TAU), R1 = SQUARE + d.range(8, 10), B = d.range(14, 17), RINGS = 6, per = i => S * (i >= 4 ? 4 : i >= 2 ? 2 : 1);
    const moved = new Map(), ideal = (i, j, da = 0, dr = 0) => { if (!i) return centre; const a = T0 + (j + da) * TAU / per(i), r = R1 + (i - 1 + dr) * B; return [centre[0] + Math.cos(a) * r, centre[1] + Math.sin(a) * r]; }, node = (i, j) => moved.get(i + ',' + j) || ideal(i, j);
    const around = (i, j) => {
        if (!i) return Array.from({ length: S }, (_, q) => [1, q]);
        const out = [[i, (j + 1) % per(i)], [i, (j + per(i) - 1) % per(i)]];
        if (i < RINGS) out.push([i + 1, j * per(i + 1) / per(i)]);
        const f = per(i) / (i > 1 ? per(i - 1) : S); if (i === 1) out.push([0, 0]); else if (j % f === 0) out.push([i - 1, j / f]);
        return out;
    };
    // A street runs straight between two crossings with a linear profile of at most 28 % slope: the ground
    // is cut or filled by at most 3.5 units, and over shallow sea a boardwalk on piles carries it.
    // The profile is flat for `fa` units from the start and `fb` from the end, so the streets meeting at a
    // crossing, or at the hub, share its level.
    const profile = (len, ya, yb, fa, fb) => t => t <= fa ? ya : t >= len - fb ? yb : ya + (yb - ya) * (t - fa) / (len - fa - fb);
    const streetOf = (a, b, ya, yb, width = W, fa = W / 2 + .6, fb = W / 2 + .6) => {
        const len = Math.hypot(b[0] - a[0], b[1] - a[1]), n = Math.ceil(len), pts = [], dry = [], prof = profile(len, ya, yb, fa, fb);
        if (len - fa - fb < 2 || Math.abs(yb - ya) > RISE * (len - fa - fb)) return null;
        for (let k = 0; k <= n; k++) {
            const x = a[0] + (b[0] - a[0]) * k / n, z = a[1] + (b[1] - a[1]) * k / n, raw = C.ground(x, z), wet = sea !== null && raw < sea + .3;
            if (Math.abs(x) > EDGE || Math.abs(z) > EDGE || !C.free(x, z, width / 2 + 1)) return null;
            if (s.stations.some(st => Math.hypot(st.position[0] - x, st.position[2] - z) < 5) || s.places.some(p => Math.hypot(p.position[0] - x, p.position[2] - z) < 3.5)) return null;
            if (placed.some(o => o.type !== HUB[typ] && Math.hypot(o.x - x, o.z - z) < o.radius + width / 2 + .3)) return null;
            if (wet && !(stilts && raw > sea - 3.5)) return null;
            const y = wet ? sea + .9 : Math.max(prof(len * k / n), sea === null ? -1e9 : sea + .35);
            if (!wet && Math.abs(raw - y) > CUT) return null;
            // From the ground to a boardwalk the step must stay gentle too.
            if (k && Math.abs(y - pts[k - 1][1]) > RISE * len / n + .01) return null;
            pts.push([x, y, z]); dry.push(!wet);
        }
        return { points: pts.map(p => [p[0], p[1] + .08, p[2]].map(c => Math.round(c * 1000) / 1000)), width, dry, ground: pts.map(p => p[1]), prof };
    };
    const levelOf = new Map([['0,0', smooth(...centre)]]), queue = [[0, 0, 0]], edges = [], ids = new Set();
    const grow = count => {
        const before = edges.length;
        while (queue.length && edges.length < before + count) {
            queue.sort((a, b) => a[2] - b[2]); const [i, j] = queue.shift(), yi = levelOf.get(i + ',' + j);
            for (const [ni, nj] of around(i, j)) {
                const key = ni + ',' + nj, id = [i + ',' + j, key].sort().join('|'); if (ids.has(id)) continue;
                // A crossing not yet built may move by up to a third of a block, so the streets follow the lie of
                // the land, as the streets of a real colony do.
                let st = null, yj = null, q = null;
                for (const [da, dr] of levelOf.has(key) ? [[0, 0]] : [[0, 0], [.3, 0], [-.3, 0], [0, .3], [0, -.3], [.3, .3], [-.3, -.3]]) {
                    q = levelOf.has(key) ? node(ni, nj) : ideal(ni, nj, da, dr); const len = Math.hypot(q[0] - node(i, j)[0], q[1] - node(i, j)[1]);
                    yj = levelOf.has(key) ? levelOf.get(key) : wetAt(...q) ? (stilts ? sea + .9 : null) : Math.max(yi - RISE * len, Math.min(yi + RISE * len, smooth(...q)));
                    if (yj === null) continue;
                    st = streetOf(node(i, j), q, yi, yj, W, i ? W / 2 + .6 : SQUARE, ni ? W / 2 + .6 : SQUARE); if (st) break;
                }
                if (!st) continue;
                if (!levelOf.has(key)) moved.set(key, q);
                st.kind = i !== ni ? 'raggio' : 'anello'; ids.add(id); edges.push({ id, a: [i, j], b: [ni, nj], ya: yi, yb: yj, ...st }); streets.push(st);
                if (!levelOf.has(key)) { levelOf.set(key, yj); queue.push([ni, nj, ni + d.next() * .8]); }
            }
        }
        return edges.slice(before);
    };
    // Buildings. The hub first, then the zones along the streets by distance from the centre, then the
    // services at the edge of the colony; every pad is levelled.
    const counts = {}, put = (t, x, z, h, y, tint, zone) => { const sp = spec(t); counts[t] = (counts[t] || 0) + 1; placed.push({ type: t, x, y, z, h, s: 1, radius: sp.radius, height: sp.height, tint, zone }); ops.push({ pad: [x, z], y, r: sp.radius + .2, fall: 1.5 }); };
    const hub = spec(HUB[typ]), y0 = C.level(centre[0], centre[1], hub.radius * .8, levelOf.get('0,0'), 5), white = [1, 1, 1, 1];
    const hasHub = y0 !== null && C.clearOf(centre[0], centre[1], hub.radius);
    if (hasHub) put(HUB[typ], centre[0], centre[1], T0, y0, white, 'nucleo');
    const sectorOf = (x, z) => SECTORS[S][Math.floor(((((Math.atan2(z - centre[1], x - centre[0]) - T0) % TAU) + TAU) % TAU) / (TAU / S)) % S];
    const choose = list => { const ok = list.filter(t => !CAPS[t] || (counts[t] || 0) < CAPS[t]); return ok.length ? d.pick(ok) : null; };
    // The streets grow a few at a time and buildings fill their sides, until the colony reaches its size or
    // the ground runs out. Along each side buildings follow one another with 0.8 units between them and keep
    // clear of the crossing streets.
    const homesTarget = target - Math.round(target / 8);
    const fill = list => {
        const sides = [];
        for (const e of list) { const [ax, az] = node(...e.a), [bx, bz] = node(...e.b); for (const side of [1, -1]) sides.push({ e, ax, az, bx, bz, side, r: Math.hypot((ax + bx) / 2 - centre[0], (az + bz) / 2 - centre[1]) }); }
        sides.sort((p, q) => p.r - q.r);
        for (const { e, ax, az, bx, bz, side } of sides) {
            const L = Math.hypot(bx - ax, bz - az), tx = (bx - ax) / L, tz = (bz - az) / L, nx = -tz * side, nz = tx * side;
            for (let cursor = (e.a[0] ? W / 2 + .6 : SQUARE) + .3, tries = 0; placed.length < homesTarget && tries < 6; tries++) {
                const mx = ax + tx * (cursor + 3) + nx * 6, mz = az + tz * (cursor + 3) + nz * 6, rr = Math.hypot(mx - centre[0], mz - centre[1]), zone = rr < R1 + B * .45 ? 'nucleo' : sectorOf(mx, mz);
                const t = choose(ZONES[typ][zone]); if (!t) break;
                const sp = spec(t), at = cursor + sp.radius; if (at + sp.radius > L - W / 2 - .6) break;
                const off = W / 2 + .8 + sp.radius, x = ax + tx * at + nx * off, z = az + tz * at + nz * off, ly = e.prof(at);
                const y = C.clearOf(x, z, sp.radius) ? C.level(x, z, sp.radius, ly, CUT) : null;
                if (y === null) { cursor += 2; continue; }
                put(t, x, z, heading(-nx, -nz), y, d.pick(ROLES).concat(1), zone); cursor = at + sp.radius + .8;
            }
        }
    };
    // Room is kept for the services: about one building in eight.
    for (let batch = grow(4); batch.length && placed.length < homesTarget; batch = grow(4)) fill(batch);
    // Services at the edge: sampled around the outer crossings, facing the nearest street.
    const outer = [...levelOf.keys()].map(k => k.split(',').map(Number)).sort((a, b) => b[0] - a[0] || a[1] - b[1]).map(([i, j]) => node(i, j));
    for (const [t, n] of SERVICES[typ]) for (let m = 0; m < n; m++) {
        const sp = spec(t);
        for (let tries = 0; tries < 60; tries++) {
            const o = outer[(m * 3 + tries) % outer.length], a = d.range(0, TAU), rr = W / 2 + sp.radius + .8 + d.range(0, 6), x = o[0] + Math.cos(a) * rr, z = o[1] + Math.sin(a) * rr;
            if (!C.clearOf(x, z, sp.radius)) continue;
            const y = C.level(x, z, sp.radius, null, CUT - .5); if (y === null) continue;
            put(t, x, z, heading(o[0] - x, o[1] - z), y, white, 'servizi'); break;
        }
    }
    // Every function has its place: a zone that found no ground in its sector gets one building at the edge.
    for (const zone of ['agricolo', 'industriale', 'scientifico']) if (!placed.some(b => b.zone === zone)) {
        const t = choose(ZONES[typ][zone]), sp = t && spec(t); if (!t) continue;
        for (let tries = 0; tries < 80; tries++) {
            const o = outer[(tries * 7) % outer.length], a = d.range(0, TAU), rr = W / 2 + sp.radius + .8 + d.range(0, 8), x = o[0] + Math.cos(a) * rr, z = o[1] + Math.sin(a) * rr;
            if (!C.clearOf(x, z, sp.radius)) continue;
            const y = C.level(x, z, sp.radius, null, CUT); if (y === null) continue;
            put(t, x, z, heading(o[0] - x, o[1] - z), y, d.pick(ROLES).concat(1), zone); break;
        }
    }
    // A road from the stations to the nearest crossing of the colony.
    const port = [14, 28], keys = [...levelOf.keys()].map(k => k.split(',').map(Number)), nearest = keys.sort((a, b) => Math.hypot(node(...a)[0] - port[0], node(...a)[1] - port[1]) - Math.hypot(node(...b)[0] - port[0], node(...b)[1] - port[1]))[0], near = node(...nearest), gap = Math.hypot(near[0] - port[0], near[1] - port[1]);
    if (gap > 14) { const start = [port[0] + (near[0] - port[0]) * 12 / gap, port[1] + (near[1] - port[1]) * 12 / gap], y1 = levelOf.get(nearest.join()), ys = Math.max(y1 - RISE * (gap - 12), Math.min(y1 + RISE * (gap - 12), smooth(...start))), road = streetOf(start, near, ys, y1, 2.8, 0, nearest[0] ? W / 2 + .6 : SQUARE); if (road) { road.kind = 'accesso'; streets.push(road); } }
    // The streets are graded: a flat strip 0.4 units wider than the street, then a slope of 1.5 units.
    for (const st of streets) for (let k = 1; k < st.points.length; k++) if (st.dry[k] && st.dry[k - 1]) ops.push({ seg: [st.points[k - 1][0], st.points[k - 1][2], st.points[k][0], st.points[k][2]], ya: st.ground[k - 1], yb: st.ground[k], half: st.width / 2 + .4, fall: 1.5 });
    return { placed, streets, ops, edges, types, centre, d, steep, hub: hasHub, spokes: S };
    }
    // Inhabitants walking along the streets: one for about every building and a half, in the colours of
    // their roles.
    const figures = COLONIST_FIGURES.map((f, k) => colonistSpec(f, GEAR[typ], k + (g.index % 4))), walkers = [];
    const L = WALK.colonia, legs = edges.filter(e => e.points.length > L + 2);
    for (let k = 0; k < Math.round(placed.length * .7) && legs.length; k++) {
        const e = legs[Math.floor(dd.next() * legs.length)], n = e.points.length - 1, c0 = 1 + Math.floor(dd.next() * (n - L - 1)), a = e.points[c0], b = e.points[c0 + L], back = dd.next() < .5;
        const [p, q] = back ? [b, a] : [a, b], slope = (q[1] - p[1]) / L, f = dd.next() < .6 ? 0 : dd.next() < .7 ? 1 : 2;
        walkers.push({ x: (p[0] + q[0]) / 2, y: (p[1] + q[1]) / 2, z: (p[2] + q[2]) / 2, h: heading(q[0] - p[0], q[2] - p[2]), slope, s: .94 + dd.next() * .12, figure: f, tint: rgba(dd.pick(ROLES)) });
    }
    const counts = {}; for (const b of placed) counts[b.type] = (counts[b.type] || 0) + 1;
    for (const t of Object.keys(types)) if (!counts[t]) delete types[t];
    const zones = {}; for (const b of placed) if (b.zone !== 'servizi') zones[b.zone] = (zones[b.zone] || 0) + 1;
    const square = placed.find(b => b.type === HUB[typ]) || placed[0] || { x: centre[0], y: C.ground(...centre), z: centre[1] };
    for (const st of streets) { delete st.dry; delete st.ground; delete st.prof; }
    const colony = { id: COLONY_ID, kind: 'colonia', typology: typ, name, params: P, types, buildings: placed, streets, walkers, figures, counts, zones, spokes: plan.spokes, target, steep: plan.steep, position: [square.x, square.y, square.z] };
    colony.traits = colonyText(g, colony); colony.text = colony.traits.join(' ');
    return colony;
}

export const VILLAGE_RADIUS = 24;
/** Ground of a village: dry and gentle within 16 units, near the water if possible, at least 26 units from
 * the stations and 20 from the view target, and far from where the colony grows. */
export function villageSite(s) {
    const sea = s.seaY, ground = (x, z) => s.heightAt(x, z), away = [VIEW[0][0] - EYE[0], VIEW[0][1] - EYE[1]], al = Math.hypot(...away), town = [VIEW[0][0] + away[0] / al * 50, VIEW[0][1] + away[1] / al * 50];
    let best = null, top = -Infinity;
    for (let x = -80; x <= 80; x += 4) for (let z = -80; z <= 80; z += 4) {
        if (Math.hypot(x - town[0], z - town[1]) < 48 || s.stations.some(st => Math.hypot(st.position[0] - x, st.position[2] - z) < 26) || VIEW.some(v => Math.hypot(v[0] - x, v[1] - z) < 20) || s.places.some(p => Math.hypot(p.position[0] - x, p.position[2] - z) < 8)) continue;
        let dry = 0, n = 0, lo = Infinity, hi = -Infinity, water = 99;
        for (let a = 0; a < 12; a++) for (const rr of [5, 10, 16]) { const y = ground(x + Math.cos(a * .5236) * rr, z + Math.sin(a * .5236) * rr); n++; if (sea === null || y > sea + .3) dry++; lo = Math.min(lo, y); hi = Math.max(hi, y); }
        if (dry < n * .85) continue;
        for (let a = 0; a < 16 && sea !== null; a++) for (let rr = 18; rr <= 40; rr += 4) if (ground(x + Math.cos(a * .3927) * rr, z + Math.sin(a * .3927) * rr) < sea - .3) { water = Math.min(water, rr); break; }
        const score = -(hi - lo) * .5 - (n - dry) * .5 - (water < 99 ? water * .05 : 3) - Math.hypot(x, z) * .01;
        if (score > top) { top = score; best = [x, z, water]; }
    }
    return best;
}
/** The village: a fire in the middle, huts on rings facing it, granaries and long houses, paths to the huts
 * and to the water, and its people. */
export function villagePlan(s, colony, ops = [], site = villageSite(s)) {
    const g = s.genome, d = dice(g.terrain.seed ^ 0x51AE), sea = s.seaY, placed = [], streets = [], C = siteChecks(s, placed, streets), centre = site;
    if (!centre) return null;
    const P = { gravity: g.gravity, hutShape: d.chance(.5) ? 'cono' : 'cupola', colors: { roof: rgba(mix(g.palette.pigment, [.62, .5, .3], .55)), dark: rgba(g.palette.rock.map(v => v * .4)), steel: [.5, .45, .4, 1], trim: [.6, .5, .38, 1], accent: rgba(mix(g.palette.pigment, [.9, .3, .2], .5)), glass: [.3, .4, .5, 1], window: [1, .7, .4, 1], soil: rgba(g.palette.rock.map(v => v * .55)) } };
    const types = {}, spec = t => (types[t] ||= buildingSpec(t, dice((g.terrain.seed ^ 0x5EED) + Object.keys(VILLAGE_TYPES).indexOf(t) * 7919), P));
    const mud = [rgba(mix(g.palette.rock, [.8, .7, .55], .5)), rgba(mix(g.palette.rock, [.6, .45, .3], .4)), rgba(mix(g.palette.rock, [.9, .85, .75], .6))];
    const [cx, cz] = centre, put = (t, x, z, h, tint) => { const sp = spec(t), y = C.level(x, z, sp.radius, null, 2); if (y === null || !C.clearOf(x, z, sp.radius)) return false; placed.push({ type: t, x, y, z, h, s: 1, radius: sp.radius, height: sp.height, tint }); ops.push({ pad: [x, z], y, r: sp.radius + .1, fall: 1.2 }); return true; };
    put('focolare', cx, cz, 0, [1, 1, 1, 1]);
    const huts = 12 + Math.round(d.next() * 16), rings = [7, 12, 17, 22];
    for (const R of rings) {
        const n = Math.floor(2 * Math.PI * R / 5.2), a0 = d.range(0, 1);
        for (let k = 0; k < n && placed.filter(b => b.type !== 'focolare' && b.type !== 'totem').length < huts; k++) {
            const a = a0 + k * 2 * Math.PI / n, x = cx + Math.cos(a) * R, z = cz + Math.sin(a) * R, t = R === 7 && k % 3 === 0 ? 'totem' : R >= 12 && k % 4 === 0 ? 'casalunga' : k % 5 === 2 ? 'granaio' : 'capanna';
            put(t, x, z, heading(cx - x, cz - z), t === 'totem' ? [1, 1, 1, 1] : d.pick(mud));
        }
    }
    // Paths from the fire to each door, and to the water when it is near.
    const path = (a, b) => { const n = Math.ceil(Math.hypot(b[0] - a[0], b[1] - a[1])), pts = []; for (let k = 0; k <= n; k++) { const x = a[0] + (b[0] - a[0]) * k / n, z = a[1] + (b[1] - a[1]) * k / n, y = C.ground(x, z); if (sea !== null && y < sea + .3) break; pts.push([x, y + .08, z].map(c => Math.round(c * 1000) / 1000)); } return pts.length > 2 ? { points: pts, width: .9 } : null; };
    const fire = placed[0] ? spec('focolare').radius + .4 : 1.5;
    for (const b of placed.filter(b => b.type === 'capanna' || b.type === 'casalunga')) { const dx = b.x - cx, dz = b.z - cz, l = Math.hypot(dx, dz), p = path([cx + dx / l * fire, cz + dz / l * fire], [b.x - dx / l * (b.radius - .1), b.z - dz / l * (b.radius - .1)]); if (p) streets.push(p); }
    if (centre[2] < 99) { let bestA = 0, bestY = Infinity; for (let a = 0; a < 16; a++) { const y = C.ground(cx + Math.cos(a * .3927) * centre[2], cz + Math.sin(a * .3927) * centre[2]); if (y < bestY) { bestY = y; bestA = a * .3927; } } const p = path([cx + Math.cos(bestA) * 3, cz + Math.sin(bestA) * 3], [cx + Math.cos(bestA) * (centre[2] + 2), cz + Math.sin(bestA) * (centre[2] + 2)]); if (p) streets.push(p); }
    // The people: walking along the paths, and a few round the fire.
    const body = nativeSpec(d.next, g), people = word(d, NATIVE_SYL, 2), walkers = [], skins = [0, 1, 2].map(k => rgba(mix(g.palette.pigment, g.palette.rock, .3 + k * .2).map(v => v * (1.1 - k * .1))));
    const L = WALK.villaggio, legs = streets.filter(p => p.points.length > L + 1), dwellers = Math.round((placed.length - 1) * (1.5 + d.next()));
    for (let k = 0; k < dwellers && legs.length; k++) {
        const e = legs[Math.floor(d.next() * legs.length)], n = e.points.length - 1, c0 = Math.floor(d.next() * (n - L + 1)), back = d.next() < .5, [p, q] = back ? [e.points[c0 + L], e.points[c0]] : [e.points[c0], e.points[c0 + L]];
        walkers.push({ x: (p[0] + q[0]) / 2, y: (p[1] + q[1]) / 2, z: (p[2] + q[2]) / 2, h: heading(q[0] - p[0], q[2] - p[2]), slope: (q[1] - p[1]) / L, s: k % 4 === 3 ? .62 : .92 + d.next() * .16, figure: 0, tint: d.pick(skins) });
    }
    const counts = {}; for (const b of placed) counts[b.type] = (counts[b.type] || 0) + 1;
    const village = { id: VILLAGE_ID, kind: 'villaggio', name: 'Villaggio di ' + word(d, NATIVE_SYL, 3), people, body, types, buildings: placed, streets, walkers, figures: [body], counts, position: [cx, C.ground(cx, cz), cz], water: centre[2] < 99 ? centre[2] : null };
    village.traits = villageText(g, village, s.species); village.text = village.traits.join(' ');
    return village;
}

/** Diary text of a colony, in parts: what it has and why it is built that way. */
function colonyText(g, c) {
    const P = c.params, n = c.buildings.length, people = c.walkers.length, zones = Object.entries(c.zones).filter(([z]) => z !== 'nucleo').sort((a, b) => b[1] - a[1]).map(([z]) => ZONE_NAMES[z]);
    const list = zones.length > 1 ? zones.slice(0, -1).join(', ') + ' e ' + zones.at(-1) : zones[0] || ZONE_NAMES.abitativo;
    const parts = [`${c.name}, ${TYPOLOGIES[c.typology]}: ${n} edifici e ${people} abitanti. Dal nodo centrale partono ${c.spokes} strade a raggiera, unite da anelli; intorno al nodo sta il nucleo abitato e i settori ospitano ${list}.`];
    if (c.typology === 'sigillato') parts.push(`L’atmosfera ha densità ${comma(g.atmosphere.density)}, troppo sottile per respirare: si vive in moduli pressurizzati e cupole geodetiche e si esce con la tuta. I moduli sono cilindri chiusi da calotte, perché a parità di spessore la parete di una sfera sotto pressione sopporta metà della tensione di quella di un cilindro dello stesso raggio.${c.counts.schermato ? ' Alcuni sono coperti di regolite, che scherma la radiazione.' : ''}`);
    else if (c.typology === 'simbiotico') parts.push(`Aria di densità ${comma(g.atmosphere.density)} e una biosfera ricca: gli edifici sono cresciuti da biomassa locale e i regolatori di albedo alternano superfici chiare e scure, come le margherite del modello Daisyworld di Watson e Lovelock, in cui la vegetazione stessa regola la temperatura del pianeta.`);
    else parts.push(`Aria di densità ${comma(g.atmosphere.density)}: si respira con un respiratore e i processori atmosferici filtrano e arricchiscono l’aria degli edifici, che poggiano su piloni o su gradoni.`);
    if (P.low) parts.push(`Gravità di ${comma(g.gravity)} g: torri e strutture alte restano più basse, perché il peso che la base deve reggere cresce con l’altezza e con la gravità${c.typology === 'adattato' ? '; i blocchi su piloni hanno al più due piani' : ''}.`);
    else if (P.tall) parts.push(`Gravità di ${comma(g.gravity)} g: torri e strutture alte salgono di più, perché a parità di altezza il peso da reggere è minore.`);
    if (P.cold) parts.push('Freddo intenso: forme compatte e arrotondate. Il calore si disperde attraverso la superficie, e a parità di volume una forma compatta ne ha meno.');
    else if (P.volcanic && c.typology === 'adattato') parts.push('Blocchi su piloni più alti: i gas vulcanici più densi dell’aria, come l’anidride carbonica, ristagnano nelle zone basse.');
    else if (P.hot && c.typology === 'sigillato') parts.push('Scafi chiari: riflettono la luce della stella e scaldano meno l’interno.');
    parts.push(P.power === 'vento' ? 'Turbine eoliche: la potenza del vento cresce con la densità dell’aria e con il cubo della sua velocità.' : P.power === 'geotermia' ? 'Centrale geotermica: il calore del sottosuolo, vicino alla superficie su un pianeta vulcanico, scalda un fluido che muove le turbine.' : `Pannelli solari: la luce della stella di tipo ${g.star.type} alimenta la colonia.`);
    return parts;
}
/** Diary text of a village, in parts: its people, the materials of the huts, food and water. */
function villageText(g, v, species) {
    const plants = species.filter(s => s.kind === 'plant'), trees = plants.filter(s => s.form === 'albero' || s.form === 'canneto'), grazers = species.filter(s => s.role === 'erbivoro' && s.form !== 'volatore');
    const huts = (v.counts.capanna || 0) + (v.counts.casalunga || 0), B = v.body, thatch = plants.find(s => s.form === 'ciuffo' || s.form === 'felce') || plants[0], wood = trees[0] || plants[1] || plants[0];
    const parts = [`${v.name}: ${huts} abitazioni e ${v.walkers.length} abitanti del popolo ${v.people}, intorno al fuoco.`];
    parts.push(`Camminano su due gambe, con ${B.arms === 4 ? 'quattro braccia' : 'due braccia'}${B.tail ? ' e una coda che bilancia il corpo' : ''}. Con una gravità di ${comma(g.gravity)} g sono alti circa ${comma(B.height / 1.1 * 1.75, 1)} m, se un colono misura 1,75 m.`);
    parts.push(`I tetti sono di foglie di ${thatch.name}${wood && wood !== thatch ? `, i pali di ${wood.name}` : ''}: materiali del luogo, come nelle capanne della Terra.`);
    if (grazers.length) parts.push(`Allevano ${grazers[0].name} e conservano le scorte nei granai, sollevati da terra.`);
    if (v.water !== null) parts.push(`L’acqua è a circa ${Math.round(v.water / 5) * 5} unità: un sentiero la raggiunge dal fuoco.`);
    return parts;
}
