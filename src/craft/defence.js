/** Defence fleet (1.47.0): eleven ship classes, from the fighter to the super-carrier, and five defensive
 * stations, built in the defence style (src/craft/styles.js). Ships point the bow towards +z with y up, as in
 * src/craft/ships.js; their hulls are faceted and armoured, with laser turrets, point defence, launchers of
 * interceptor drones, radar masts, shield emitters, hangars and flight decks. The fleet guards the stations
 * and the gate of its system against the natural threats and the swarm of the later releases. Every model is
 * built from its seed, and its structural choices are written down as the recipe. */
import { Kit, TAU, hash, section, assemble, WHITE, RED, GREEN, AMBER } from './kit.js';
import { mast, smallDish, hangar, radiator, solarWing, polyhedron, windowRing } from './parts.js';
import { hull, canopy, nozzle, engines, wingPair, fins } from './ships.js';

const GUN = [1, .38, .26, 1], SHIELD = [.45, .8, 1, 1], HOT = [1, .6, .3, 1];
const around = (n, f, offset = 0) => { for (let s = 0; s < n; s++) f(offset + s / n * TAU, s); };
const shade = (c, k) => [c[0] * k, c[1] * k, c[2] * k, c[3] ?? 1];

/** Armoured hull through faceted sections from the bow (+z): dark keel, a band in the trim colour across
 * the back behind the bow and a darker armour belt every third section. `prof` lists [t, width, height,
 * centre]. */
function armour(k, L, prof, n = 8) {
    const st = k.style, top = Math.round(n / 2), sec = prof.map(([t, w, h, cy = 0]) => section(L / 2 - t * L, Math.max(.05, w), Math.max(.05, h), cy, n, 1.9));
    const paint = (m, s, q) => {
        if (q === 0 || q === n - 1) return st.dark;
        if (s === 1 && q > 1 && q < n - 2) return st.trim;
        if (s % 3 === 2) return shade(st.hull, .7);
        return shade(st.hull, .88 + .18 * hash(s, q, L));
    };
    k.hull(); k.loft(sec, { paint });
    return sec;
}
/** Laser turret of radius r at p with n barrels along +z; `flip` mounts it under the hull. */
function turret(k, p, r, n = 2, flip = false) {
    k.push(p, [0, 0, flip ? Math.PI : 0]);
    k.steel(); k.cyl(r * 1.1, r, 0, r * .3, 12);
    k.hull(); k.box([0, r * .55, r * .05], [r * .72, r * .27, r * .8], r * .5);
    k.dark(); k.box([0, r * .55, r * .86], [r * .58, r * .2, r * .06]);
    for (let i = 0; i < n; i++) { const x = (i - (n - 1) / 2) * r * .42; k.steel(); k.beam([x, r * .55, r * .9], [x, r * .55, r * 3], r * .08); k.glow(GUN, 2); k.box([x, r * .55, r * 3], [r * .1, r * .1, r * .04]); }
    k.pop();
}
/** Point defence: a small dome with one barrel. */
function pointDefence(k, p, r, flip = false) {
    k.push(p, [0, 0, flip ? Math.PI : 0]); k.dark(); k.sphere([0, 0, 0], r, 10, 6, 0, Math.PI / 2); k.steel(); k.beam([0, r * .6, 0], [0, r * 1.1, r * 1.9], r * .14); k.pop();
}
/** Launcher of interceptor drones: a box with a grid of tube mouths facing +z. */
function launcher(k, p, w, h, len, rows, cols) {
    k.push(p); k.dark(); k.box([0, 0, 0], [w, h, len], .5);
    for (let i = 0; i < rows; i++) for (let j = 0; j < cols; j++) { k.glow(GUN, 1); k.box([(j - (cols - 1) / 2) * w * 1.6 / cols, (i - (rows - 1) / 2) * h * 1.6 / rows, len + .01], [w * .55 / cols, h * .55 / rows, .02]); }
    k.pop();
}
/** Command tower at p, w wide, h high, d deep, with lit windows towards the bow and a radar mast. */
function bridge(k, p, w, h, d, dish = true) {
    k.push(p); k.hull(); k.box([0, h / 2, 0], [w, h / 2, d], .45); k.dark(); k.box([0, h + .06, -d * .2], [w * .8, .06, d * .7]);
    for (let row = 0; row < 2; row++) for (let i = 0; i < Math.max(2, Math.round(w * 6)); i++) k.pane([-w * .8 + i * w * 1.6 / Math.max(1, Math.round(w * 6) - 1), h * (.62 + row * .2), d + .012], [0, 0, 1], [1, 0, 0], .1, .05);
    k.push([0, h + .1, -d * .4]); mast(k, h * .9, 1, 1.3); k.pop();
    if (dish) { k.push([w * .55, h + .1, -d * .1], [.4, 0, 0]); smallDish(k, Math.min(.45, w * .5), .12); k.pop(); }
    k.pop();
}
/** Shield emitter at p: a ring around a glowing core. */
function shieldEmitter(k, p, r) {
    k.push(p); k.steel(); k.cyl(r * .45, r * .3, 0, r * .5, 10); k.accent(.6); k.push([0, r * .55, 0]); k.torus(r, r * .1, 28, 6); k.pop();
    k.glow(SHIELD, 3); k.sphere([0, r * .55, 0], r * .32, 12, 8); k.light([0, r * .55, 0], SHIELD, r * .55, 0); k.pop();
}
/** Flight deck from z0 to z1 at height y, half width w: runway marks and a chase of approach lights. */
function deck(k, z0, z1, w, y, lights = 6) {
    const L = z1 - z0; k.dark(); k.box([0, y, (z0 + z1) / 2], [w, .06, L / 2], .7);
    k.paint([.86, .84, .78, 1], .2, .6); for (let i = 0; i < 7; i++) k.box([0, y + .065, z0 + L * (i + .5) / 7], [.04, .005, L * .03]);
    k.paint(k.style.trim, .4, .5); for (const sx of [1, -1]) k.box([sx * w * .97, y + .065, (z0 + z1) / 2], [.03, .008, L / 2]);
    for (let i = 0; i < lights; i++) for (const sx of [1, -1]) k.light([sx * w * .97, y + .1, z1 - L * i / lights], i ? AMBER : WHITE, .05, -(i * .09));
}
/** Hangar mouth on the face z of a hull, w wide and h high at height y, lit inside. */
function bay(k, z, w, h, y = 0, facing = 1) {
    k.dark(); k.box([0, y, z], [w, h, .1]); k.glow(k.style.window, 1.4); k.box([0, y, z + facing * .11], [w * .86, h * .8, .01]);
    k.accent(.5); for (const sx of [1, -1]) k.box([sx * w * 1.04, y, z + facing * .05], [.04, h * 1.05, .07]);
}
/** Engine block at the stern z: n nozzles (one to eight) in rows of up to four. */
function block(k, n, z, spread, r, color = HOT) {
    if (n <= 4) { engines(k, n, z, spread, r, 0, color); return; }
    const a = Math.ceil(n / 2), b = n - a;
    engines(k, a, z, spread, r, spread * .55, color); engines(k, b, z, spread * .8, r, -spread * .6, color);
}
const navStubs = (k, W, L, y = 0) => wingPair(k, [[W * .9, -L * .05], [W * 1.5, -L * .12], [W * 1.5, -L * .2], [W * .9, -L * .22]], y, .03);

// Ships
function caccia(d, st) {
    const k = new Kit(st), L = d.range(3.4, 4.2), W = d.range(.42, .52), H = W * .72, liv = d.choose('livrea', ['fascia', 'dorso', 'prua']), wing = d.cycle('ali', ['delta', 'freccia', 'avanti']);
    hull(k, d, L, [[0, .04, .04], [.15, W * .45, H * .45], [.4, W * .85, H * .85], [.7, W, H], [1, W * .8, H * .75]], liv);
    canopy(k, L * .3, L * .04, W * .55, H * .65, H * .35);
    const plan = wing === 'delta' ? [[W * .8, L * .1], [W * 3.1, -L * .38], [W * 3.1, -L * .45], [W * .85, -L * .42]] : wing === 'freccia' ? [[W * .8, -L * .02], [W * 3.3, -L * .3], [W * 3.3, -L * .37], [W * .85, -L * .36]] : [[W * .85, -L * .38], [W * 3, -L * .1], [W * 3, -L * .03], [W * .8, -L * .2]];
    wingPair(k, plan, -H * .2, .035);
    const tip = plan.reduce((m, p) => p[0] > m[0] ? p : m);
    for (const sx of [1, -1]) { k.steel(); k.beam([sx * tip[0], -H * .2, tip[1] - .15], [sx * tip[0], -H * .2, tip[1] + L * .22], .035); }
    engines(k, d.count('ugelli', 1, 2), -L / 2, W * .42, W * .34, 0, HOT);
    fins(k, d.count('derive', 1, 2), -L * .36, H * 1.1, L * .25, H * .6, W);
    k.light([0, H * .3, -L / 2 + .1], WHITE, .05, 1.4);
    return assemble([[k]]);
}
function intercettore(d, st) {
    const k = new Kit(st), L = d.range(4.6, 5.4), W = d.range(.36, .44), H = W * .9, liv = d.choose('livrea', ['fascia', 'dorso', 'prua']), boost = d.count('propulsori laterali', 0, 2) * 2;
    hull(k, d, L, [[0, .02, .02], [.25, W * .5, H * .5], [.6, W, H], [1, W * 1.1, H * 1.05]], liv);
    canopy(k, L * .2, -L * .02, W * .5, H * .6, H * .3);
    nozzle(k, [0, 0, -L / 2], W * 1, W * 1.8, HOT);
    around(boost, a => { const p = [Math.cos(a) * W * 1.5, Math.sin(a) * W * 1.1, -L * .25]; k.push(p, [Math.PI / 2, 0, 0]); k.dark(); k.capsule(W * .3, -L * .18, L * .14, 10); k.pop(); nozzle(k, [p[0], p[1], -L * .44], W * .26, W * .5, HOT); k.steel(); k.beam([p[0] * .5, p[1] * .5, -L * .25], p, .04); }, 0);
    wingPair(k, [[W * .7, L * .2], [W * 1.7, L * .12], [W * 1.7, L * .08], [W * .7, L * .07]], 0, .025);
    wingPair(k, [[W * .9, -L * .15], [W * 2.4, -L * .36], [W * 2.4, -L * .42], [W * .9, -L * .4]], 0, .03);
    fins(k, 1, -L * .36, H * 1.2, L * .25, H * .7, W);
    return assemble([[k]]);
}
function pattugliatore(d, st) {
    const k = new Kit(st), L = d.range(5.2, 6.2), W = d.range(.8, .95), H = W * .65, guns = d.count('canne', 1, 2), radar = d.choose('radar', ['albero', 'parabola']);
    armour(k, L, [[0, W * .3, H * .3], [.15, W * .8, H * .75], [.4, W, H], [.85, W, H * .95], [1, W * .85, H * .8]]);
    canopy(k, L * .32, L * .12, W * .55, H * .85, H * .3);
    turret(k, [0, H * .9, L * .05], .32, guns);
    if (radar === 'albero') { k.push([0, H * .95, -L * .2]); mast(k, 1, 1, 1.2); k.pop(); } else { k.push([0, H * .95, -L * .2], [.3, 0, 0]); smallDish(k, .4, .12); k.pop(); }
    pointDefence(k, [0, -H * .9, -L * .05], .2, true);
    k.light([0, -H * .4, L * .48], WHITE, .1, 0);
    navStubs(k, W, L);
    engines(k, 2, -L / 2, W * .45, W * .3, 0, HOT);
    return assemble([[k]]);
}
function corvetta(d, st) {
    const k = new Kit(st), L = d.range(6.8, 7.8), W = d.range(.9, 1.05), H = W * .7, rows = d.count('file di lanciatori', 1, 2), nEng = d.count('ugelli', 2, 3);
    armour(k, L, [[0, W * .2, H * .25], [.12, W * .7, H * .7], [.35, W, H], [.6, W, H * 1.15, H * .15], [.85, W * .95, H * 1.1, H * .1], [1, W * .8, H * .8]]);
    turret(k, [0, H * .95, L * .2], .38, 2);
    bridge(k, [0, H * 1.25, -L * .08], W * .5, .55, .4, false);
    launcher(k, [0, H * 1.3, -L * .3], W * .45, .12 * rows, .35, rows, 4);
    for (const sx of [1, -1]) pointDefence(k, [sx * W * .95, 0, L * .05], .16);
    navStubs(k, W, L, -H * .2); fins(k, 2, -L * .4, H * .9, L * .2, H * .7, W);
    engines(k, nEng, -L / 2, W * .48, W * .3, 0, HOT);
    return assemble([[k]]);
}
function fregata(d, st) {
    const k = new Kit(st), L = d.range(8.5, 9.5), W = d.range(1.05, 1.2), H = W * .7, aft = d.choose('torretta di poppa', ['dorsale', 'ventrale']), side = d.flag('lanciatori laterali', .6);
    armour(k, L, [[0, W * .2, H * .2], [.1, W * .65, H * .65], [.3, W, H], [.7, W, H * 1.1, H * .1], [.9, W * 1.05, H * 1.05], [1, W * .9, H * .9]]);
    turret(k, [0, H * .95, L * .25], .4, 2);
    turret(k, aft === 'dorsale' ? [0, H * 1.15, -L * .28] : [0, -H * .95, -L * .1], .36, 2, aft !== 'dorsale');
    bridge(k, [0, H * 1.05, L * .02], W * .55, .7, .5);
    bay(k, -L / 2 + .05, W * .5, H * .35, -H * .35, -1);
    if (side) for (const sx of [1, -1]) launcher(k, [sx * W * 1.05, H * .2, -L * .1], .14, .22, .7, 2, 1);
    for (const sx of [1, -1]) pointDefence(k, [sx * W * .9, -H * .5, L * .3], .16, true);
    navStubs(k, W, L, -H * .2);
    block(k, 3, -L / 2, W * .5, W * .3);
    return assemble([[k]]);
}
function cacciatorpediniere(d, st) {
    const k = new Kit(st), L = d.range(10.5, 11.5), W = d.range(.85, .95), H = W * .8, spike = d.flag('sperone di prua', .6), n = d.count('torrette', 3, 3);
    armour(k, L, [[0, W * .15, H * .15], [.12, W * .6, H * .6], [.3, W, H], [.8, W, H], [1, W * .9, H * .85]]);
    if (spike) { k.steel(); k.beam([0, 0, L / 2], [0, 0, L / 2 + L * .12], .06); k.light([0, 0, L / 2 + L * .12], RED, .07, 1.5); }
    for (let i = 0; i < n; i++) turret(k, [0, H * .95, L * (.28 - i * .17)], .36, i === 1 ? 3 : 2);
    bridge(k, [0, H * .95, -L * .26], W * .55, .65, .45);
    for (const sx of [1, -1]) launcher(k, [sx * W * 1.02, 0, L * .02], .12, .3, L * .18, 3, 1);
    for (const sx of [1, -1]) pointDefence(k, [sx * W * .8, -H * .7, -L * .15], .16, true);
    navStubs(k, W, L); fins(k, 2, -L * .42, H * .9, L * .14, H * .8, W);
    block(k, 4, -L / 2, W * .5, W * .26);
    return assemble([[k]]);
}
function incrociatore(d, st) {
    const k = new Kit(st), L = d.range(12.5, 13.5), W = d.range(1.25, 1.4), H = W * .7, sponsons = d.flag('sponsoni', .6), shield = d.choose('scudo', ['prua', 'ponte']);
    armour(k, L, [[0, W * .25, H * .2], [.12, W * .7, H * .6], [.3, W, H], [.65, W * 1.05, H * 1.1], [.9, W, H], [1, W * .85, H * .85]]);
    for (const [z, flip] of [[.28, false], [.12, false], [.2, true], [-.05, true]]) turret(k, [0, flip ? -H * .95 : H * .95, L * z], .42, 2, flip);
    bridge(k, [0, H * 1.05, -L * .12], W * .55, .9, .6);
    shieldEmitter(k, shield === 'prua' ? [0, H * .7, L * .4] : [0, H * 1.05, -L * .32], .45);
    if (sponsons) for (const sx of [1, -1]) { k.dark(); k.box([sx * W * 1.12, 0, -L * .05], [W * .18, H * .35, L * .18], .5); pointDefence(k, [sx * W * 1.12, H * .35, L * .05], .16); pointDefence(k, [sx * W * 1.12, H * .35, -L * .15], .16); }
    navStubs(k, W, L, -H * .3); fins(k, 2, -L * .42, H, L * .16, H * .8, W);
    block(k, 4, -L / 2, W * .5, W * .3);
    return assemble([[k]]);
}
function incrociatorePesante(d, st) {
    const k = new Kit(st), L = d.range(14, 15.5), W = d.range(1.45, 1.6), H = W * .72, belt = d.choose('corazza', ['fasce', 'piastre']), nEng = d.count('ugelli', 5, 6);
    armour(k, L, [[0, W * .3, H * .25], [.1, W * .75, H * .65], [.28, W, H], [.7, W * 1.05, H * 1.05], [.92, W, H], [1, W * .85, H * .85]]);
    for (const sx of [1, -1]) { k.dark(); if (belt === 'fasce') k.box([sx * W * 1.02, 0, 0], [.08, H * .45, L * .32], .5); else for (let i = 0; i < 4; i++) k.box([sx * W * 1.02, 0, L * (.24 - i * .16)], [.1, H * .42, L * .07], .4); }
    for (const [z, flip] of [[.3, false], [.16, false], [.02, false], [.22, true], [-.12, true]]) turret(k, [0, flip ? -H * .95 : H * .95, L * z], .46, flip ? 2 : 3, flip);
    for (const sx of [1, -1]) launcher(k, [sx * W * .55, H * 1.1, -L * .3], .26, .18, .6, 2, 3);
    bridge(k, [0, H * .95, -L * .15], W * .5, 1, .6);
    shieldEmitter(k, [0, H * .7, L * .42], .5);
    navStubs(k, W, L, -H * .3);
    block(k, nEng, -L / 2, W * .55, W * .26);
    return assemble([[k]]);
}
function corazzata(d, st) {
    const k = new Kit(st), L = d.range(16, 18), W = d.range(1.8, 2), H = W * .66, spinal = d.flag('cannone spinale', .5), nEng = d.count('ugelli', 6, 8);
    armour(k, L, [[0, W * .35, H * .3], [.08, W * .8, H * .7], [.25, W, H], [.75, W * 1.05, H * 1.05], [.93, W, H], [1, W * .9, H * .9]]);
    for (const sx of [1, -1]) for (let i = 0; i < 5; i++) { k.dark(); k.box([sx * W * 1.03, H * .1, L * (.3 - i * .14)], [.12, H * .5, L * .06], .45); }
    for (const [z, flip] of [[.3, false], [.16, false], [-.2, false], [.25, true], [.05, true], [-.15, true]]) turret(k, [0, flip ? -H * .95 : H * .95, L * z], .55, 3, flip);
    if (spinal) { k.steel(); k.push([0, 0, L / 2], [Math.PI / 2, 0, 0]); k.cyl(W * .28, W * .22, -L * .1, 0, 12, { bands: 2 }); k.pop(); k.glow(GUN, 2.5); k.push([0, 0, L / 2 + L * .1], [Math.PI / 2, 0, 0]); k.cyl(W * .2, W * .2, -.02, 0, 12); k.pop(); }
    bridge(k, [0, H * .95, -L * .04], W * .45, 1.3, .7);
    for (const sx of [1, -1]) { shieldEmitter(k, [sx * W * .6, H * .95, L * .38], .4); pointDefence(k, [sx * W * .7, H * .95, -L * .32], .2); pointDefence(k, [sx * W * .7, -H * .95, -L * .32], .2, true); }
    navStubs(k, W, L, -H * .3);
    block(k, nEng, -L / 2, W * .55, W * .28);
    return assemble([[k]]);
}
function portaerei(d, st) {
    const k = new Kit(st), L = d.range(17, 19), W = d.range(2, 2.3), H = W * .42, island = d.choose('isola', ['dritta', 'sinistra']), lifts = d.count('elevatori', 2, 3);
    armour(k, L, [[0, W * .45, H * .4], [.08, W * .85, H * .8], [.2, W, H], [.9, W, H], [1, W * .9, H * .9]]);
    const top = H + .3; k.steel(); k.box([0, H + .12, 0], [W * .9, .14, L * .45]);
    deck(k, -L * .48, L * .5, W * 1.25, top, 7);
    for (let i = 0; i < lifts; i++) { k.paint(shade(k.style.hull, .75), .5, .5); k.box([(i % 2 ? 1 : -1) * W * .72, top + .07, L * (.2 - i * .22)], [W * .28, .01, L * .05]); }
    const sx = island === 'dritta' ? -1 : 1; bridge(k, [sx * W * 1.02, top + .06, -L * .08], W * .22, 1.4, L * .08);
    bay(k, L / 2 - .1, W * .7, H * .45, top - .45, 1); bay(k, -L / 2 + .1, W * .6, H * .4, -H * .2, -1);
    for (const x of [1, -1]) for (const z of [.42, -.42]) pointDefence(k, [x * W * 1.2, top - .2, L * z], .2, true);
    shieldEmitter(k, [0, -H * .95, L * .1], .45);
    navStubs(k, W, L, -H * .3);
    block(k, 4, -L / 2, W * .5, W * .32);
    return assemble([[k]]);
}
function superportaerei(d, st) {
    const k = new Kit(st), ring = new Kit(st), L = d.range(23, 26), W = d.range(1.6, 1.8), D = d.range(3.2, 3.6), H = W * .5, towers = d.count('torri di comando', 1, 2), spokes = d.choose('raggi dell\'anello', [4, 6]);
    for (const sx of [1, -1]) {
        k.push([sx * D, 0, 0]); armour(k, L, [[0, W * .4, H * .4], [.07, W * .85, H * .8], [.18, W, H], [.92, W, H], [1, W * .9, H * .9]]);
        deck(k, -L * .48, L * .49, W * 1.15, H + .2, 6); bay(k, L / 2 - .1, W * .6, H * .5, H - .2, 1); block(k, 4, -L / 2, W * .5, W * .3); k.pop();
    }
    k.dark(); k.box([0, 0, L * .02], [D - W * .8, H * .55, L * .3], .6); k.steel(); for (const z of [.3, -.3]) k.box([0, 0, L * z], [D - W * .8, H * .3, .3]);
    for (let t = 0; t < towers; t++) bridge(k, [0, H * .55, L * (.12 - t * .25)], W * .6, 1.8, .9);
    for (const sx of [1, -1]) shieldEmitter(k, [sx * D, -H * .95, L * .3], .55);
    for (const z of [.4, .15, -.1, -.35]) for (const sx of [1, -1]) pointDefence(k, [sx * (D + W * 1.05), 0, L * z], .22);
    // Crew ring around the spine, turning for gravity.
    const Rr = D * .55, zr = -L * .32; ring.push([0, 0, zr], [Math.PI / 2, 0, 0]); ring.hull(); ring.torus(Rr, .22, st.seg(40), 8);
    around(spokes, a => { ring.steel(); ring.beam([Math.cos(a) * .4, 0, Math.sin(a) * .4], [Math.cos(a) * Rr, 0, Math.sin(a) * Rr], .06); }); around(Math.round(Rr * 7), a => ring.pane([Math.cos(a) * (Rr + .22), 0, Math.sin(a) * (Rr + .22)], [Math.cos(a), 0, Math.sin(a)], [-Math.sin(a), 0, Math.cos(a)], .14, .07)); ring.pop();
    wingPair(k, [[D + W * .9, -L * .1], [D + W * 1.6, -L * .16], [D + W * 1.6, -L * .22], [D + W * .9, -L * .24]], -H * .2, .04);
    return assemble([[k], [ring, [0, 0, .2]]]);
}

// Stations
function baseflotta(d, st) {
    const k = new Kit(st), arms = d.count('bracci di attracco', 2, 4), R = d.range(1.5, 1.8), docked = d.count('navi ormeggiate', 1, 3);
    k.hull(); k.cyl(R, R, -1, 1, 8, { bands: 3 }); k.cyl(R, R * .55, 1, 1.7, 8); k.cyl(R * .55, R, -1.7, -1, 8); windowRing(k, R, .3, 16, .16, .08, 8);
    k.push([0, 1.7, 0], [0, 0, Math.PI / 2]); hangar(k, .8, 1.8, 3, 6); k.pop();
    k.push([0, -1.7, 0], [Math.PI, 0, 0]); mast(k, 1.2, 2, 1.1); k.pop();
    let ships = 0;
    around(arms, (a, s) => {
        const u = [Math.cos(a), 0, Math.sin(a)], at = r => u.map(v => v * r);
        k.steel(); k.truss(at(R), at(6.2), .32, 1.2, .045);
        for (const r of [3.2, 5]) {
            const c = at(r); k.push(c, [0, Math.PI / 2 - a, 0]); k.trim();
            for (const x of [-1, 1]) for (const y of [-1, 1]) k.beam([x * .9, y * .6, -.5], [x * .9, y * .6, .5], .035);
            for (const z of [-.5, .5]) { k.beam([-.9, .6, z], [.9, .6, z], .03); k.beam([-.9, -.6, z], [.9, -.6, z], .03); }
            k.light([.9, .6, .5], GREEN, .07, -(s * .2 + r * .05)); k.light([-.9, .6, .5], RED, .07, -(s * .2 + r * .05));
            if (ships < docked && hash(s, r, arms) > .35) { ships++; k.push([0, 0, 0], [0, Math.PI / 2, 0]); armour(k, 1.6, [[0, .1, .1], [.3, .32, .24], [1, .28, .2]], 6); k.pop(); }
            k.pop();
        }
        k.light(at(6.3), WHITE, .1, 1.2);
    }, d.range(0, 1));
    for (const a of [0, Math.PI]) pointDefence(k, [Math.cos(a) * R * .7, 1.7, Math.sin(a) * R * .7], .25);
    return assemble([[k]]);
}
function fortezza(d, st) {
    const k = new Kit(st), core = d.choose('nucleo', ['cubottaedro', 'ottaedro troncato']), n = d.count('torrette per piano', 3, 4), shield = d.flag('emettitore di scudo', .7);
    k.hull(); polyhedron(k, core, [0, 0, 0], 2.3, null, .12);
    k.dark(); k.cyl(2.35, 2.35, -.35, .35, 8, { bands: 1 }); k.accent(.5); k.cyl(2.4, 2.4, -.06, .06, 8, { caps: false });
    for (const y of [1, -1]) { k.steel(); k.cyl(1.25, 1.25, y * 1.45, y * 1.75, 8); around(n, a => turret(k, [Math.cos(a) * .85, y * 1.75, Math.sin(a) * .85], .34, 2, y < 0), y > 0 ? 0 : Math.PI / n); }
    around(8, a => pointDefence(k, [Math.cos(a) * 2.38, 0, Math.sin(a) * 2.38], .16), Math.PI / 8);
    if (shield) shieldEmitter(k, [0, 1.75, 0], .55); else { k.push([0, 1.75, 0]); mast(k, 1.4, 2, 1.1); k.pop(); }
    around(4, a => k.light([Math.cos(a) * 2.42, 0, Math.sin(a) * 2.42], RED, .1, 1 + a * .1));
    return assemble([[k]]);
}
function piattaforma(d, st) {
    const k = new Kit(st), n = d.count('torrette', 3, 4), power = d.choose('energia', ['pannelli', 'radiatori']), R = d.range(1.8, 2.1);
    k.hull(); k.cyl(R, R, -.22, .22, 6, { bands: 1 }); k.dark(); k.cyl(R, .55, -.22, -1.1, 6); k.accent(.4); k.cyl(R * 1.02, R * 1.02, -.04, .04, 6, { caps: false });
    around(n, a => turret(k, [Math.cos(a) * R * .62, .22, Math.sin(a) * R * .62], .36, 2), Math.PI / 6);
    k.push([0, .22, 0]); mast(k, 1.3, 2, 1.2); k.pop();
    for (const sx of [1, -1]) { k.push([sx * R * 1.05, -.5, 0], [0, 0, 0]); if (power === 'pannelli') { k.push([0, 0, 0], [0, 0, sx > 0 ? 0 : Math.PI]); solarWing(k, 2, .9, [6, 3]); k.pop(); } else { k.push([sx * .8, 0, 0], [0, Math.PI / 2, 0]); radiator(k, 1.5, .8, 5, .5); k.pop(); } k.pop(); }
    around(6, a => k.light([Math.cos(a) * R, .26, Math.sin(a) * R], a < 1 ? WHITE : RED, .07, -(a * .15)));
    return assemble([[k]]);
}
function sorveglianza(d, st) {
    const k = new Kit(st), ring = new Kit(st), panels = d.count('schiere di antenne', 2, 4), dishes = d.count('parabole', 1, 2);
    k.steel(); k.cyl(.3, .3, -3, 3, 10, { bands: 4 }); k.hull(); k.capsule(.85, -.6, .6, 14, 2); windowRing(k, .85, 0, 10, .14, .07);
    around(panels, a => {
        k.steel(); k.beam([Math.cos(a) * .8, 0, Math.sin(a) * .8], [Math.cos(a) * 2.2, 0, Math.sin(a) * 2.2], .06);
        k.push([Math.cos(a) * 2.3, 0, Math.sin(a) * 2.3], [0, Math.PI / 2 - a, 0]); k.paint(k.style.panel, .4, .4); k.box([0, 0, 0], [1.4, 1, .07], .5);
        for (let i = 0; i < 5; i++) for (let j = 0; j < 4; j++) k.pane([-1.12 + i * .56, -.72 + j * .48, .075], [0, 0, 1], [1, 0, 0], .36, .3, k.style.accent, .7);
        k.pop();
    }, d.range(0, 1));
    for (let i = 0; i < dishes; i++) { const y = i ? -3 : 3; k.push([0, y, 0], [i ? Math.PI - .4 : .4, 0, 0]); k.steel(); k.cyl(.12, .08, 0, .5, 8); k.push([0, .5, 0]); k.paint([.82, .82, .8, 1], .3, .5); k.dish(1.3, .35, 32, 8); k.pop(); k.pop(); }
    k.light([0, 3.1, 0], WHITE, .12, 1); k.light([0, -3.1, 0], RED, .12, .7);
    ring.steel(); ring.torus(2.9, .07, st.seg(48), 6); around(4, a => { ring.dark(); ring.box([Math.cos(a) * 2.9, .12, Math.sin(a) * 2.9], [.12, .18, .12]); ring.light([Math.cos(a) * 2.9, .34, Math.sin(a) * 2.9], AMBER, .06, -(a * .2)); }); around(4, a => { ring.steel(); ring.beam([Math.cos(a) * .32, 0, Math.sin(a) * .32], [Math.cos(a) * 2.9, 0, Math.sin(a) * 2.9], .035); }, Math.PI / 4);
    return assemble([[k], [ring, [0, .3, 0]]]);
}
function scudo(d, st) {
    const k = new Kit(st), n = d.count('anelli emettitori', 2, 3), R = d.range(2.4, 2.8), fins4 = d.flag('radiatori', .6);
    k.hull(); k.capsule(.9, -2, 2, 16, 3); k.glow(SHIELD, 2.5); for (const y of [-.9, .9]) k.cyl(.95, .95, y - .12, y + .12, 16, { caps: false });
    k.steel(); k.cyl(.25, .25, -3, 3, 8); k.light([0, 3.1, 0], SHIELD, .2, .6); k.light([0, -3.1, 0], SHIELD, .2, .6);
    if (fins4) around(4, a => { k.push([Math.cos(a) * 1.4, 0, Math.sin(a) * 1.4], [0, -a, 0]); k.push([0, 0, 0], [0, Math.PI / 2, 0]); radiator(k, 1, 2.6, 5, .4); k.pop(); k.pop(); }, Math.PI / 4);
    const rings = [];
    for (let i = 0; i < n; i++) {
        const r = new Kit(st), y = n === 2 ? (i ? -1.3 : 1.3) : (i - 1) * 1.6;
        r.push([0, y, 0]); r.steel(); r.torus(R - i * .15, .16, st.seg(40), 8);
        around(6, a => { r.steel(); r.beam([Math.cos(a) * .3, 0, Math.sin(a) * .3], [Math.cos(a) * (R - i * .15), 0, Math.sin(a) * (R - i * .15)], .05); r.glow(SHIELD, 3); r.sphere([Math.cos(a) * (R - i * .15), 0, Math.sin(a) * (R - i * .15)], .2, 10, 6); }, i * .4);
        around(3, a => r.light([Math.cos(a) * (R - i * .15), 0, Math.sin(a) * (R - i * .15)], SHIELD, .14, -(i * .3 + a * .1)), i * .4);
        r.pop(); rings.push([r, [0, i % 2 ? -.35 : .35, 0]]);
    }
    return assemble([[k], ...rings]);
}

/** The eleven classes of the defence fleet, from the smallest: builder, noun and gender, length, drawn
 * radius in system units, speed, docking time and the size of the formation it flies in. */
export const DEFENCE_SHIPS = {
    caccia: { name: 'Caccia', gender: 'm', build: caccia, size: 'circa 18 m', drawn: .025, speed: 4.5, dock: 12, wing: 3, about: 'Caccia da intercettazione: vola in formazione di tre e ferma droni e frammenti prima che arrivino alle stazioni.' },
    intercettore: { name: 'Intercettore', gender: 'm', build: intercettore, size: 'circa 24 m', drawn: .03, speed: 5, dock: 10, wing: 2, about: 'Il più veloce della flotta: vola in coppia e raggiunge per primo ogni allarme.' },
    pattugliatore: { name: 'Pattugliatore', gender: 'm', build: pattugliatore, size: 'circa 40 m', drawn: .045, speed: 3.2, dock: 14, about: 'Piccola nave di ronda fra le stazioni, con una torretta laser e un faro.' },
    corvetta: { name: 'Corvetta', gender: 'f', build: corvetta, size: 'circa 70 m', drawn: .055, speed: 2.8, dock: 16, about: 'Nave di scorta leggera con una torretta, lanciatori di droni intercettori e difese ravvicinate.' },
    fregata: { name: 'Fregata', gender: 'f', build: fregata, size: 'circa 110 m', drawn: .07, speed: 2.5, dock: 18, about: 'Scorta i convogli alla porta; un hangar di poppa ospita i droni di ricognizione.' },
    cacciatorpediniere: { name: 'Cacciatorpediniere', gender: 'm', build: cacciatorpediniere, size: 'circa 150 m', drawn: .085, speed: 2.4, dock: 18, about: 'Nave lunga e veloce con tre torrette in fila e due batterie di lanciatori sui fianchi.' },
    incrociatore: { name: 'Incrociatore', gender: 'm', build: incrociatore, size: 'circa 210 m', drawn: .11, speed: 2, dock: 22, about: 'Nave di linea con quattro torrette, un ponte di comando e un emettitore di scudo.' },
    incrociatorePesante: { name: 'Incrociatore pesante', gender: 'm', build: incrociatorePesante, size: 'circa 280 m', drawn: .13, speed: 1.8, dock: 24, about: 'Fasce di corazza sui fianchi, cinque torrette e due batterie di lanciatori.' },
    corazzata: { name: 'Corazzata', gender: 'f', build: corazzata, size: 'circa 380 m', drawn: .16, speed: 1.4, dock: 28, about: 'La nave più protetta della flotta: sei torrette, piastre di corazza e due emettitori di scudo.' },
    portaerei: { name: 'Portaerei', gender: 'f', build: portaerei, size: 'circa 420 m', drawn: .18, speed: 1.4, dock: 28, about: 'Un ponte di volo lungo tutto lo scafo, hangar a prua e a poppa e un\'isola di comando sul fianco.' },
    superportaerei: { name: 'Superportaerei', gender: 'f', build: superportaerei, size: 'circa 720 m', drawn: .26, speed: 1.1, dock: 32, about: 'Ammiraglia della frontiera: due scafi con due ponti di volo, torri di comando sulla trave centrale e un anello abitato che ruota.' }
};
export const DEFENCE_SHIP_KEYS = Object.keys(DEFENCE_SHIPS);
/** The five defensive stations: builder, name, drawn radius in system units, recipe and description. */
export const DEFENCE_STATIONS = {
    baseflotta: { name: 'Base della flotta', build: baseflotta, size: 'circa 600 m', drawn: .22, works: 'difesa-base', about: 'Ospita, rifornisce e ripara la flotta di difesa del sistema; le navi tornano qui fra una pattuglia e l\'altra.' },
    sorveglianza: { name: 'Stazione di sorveglianza', build: sorveglianza, size: 'circa 400 m', drawn: .16, works: 'difesa-sorveglianza', about: 'Schiere di antenne, parabole e un anello radar rotante osservano i confini del sistema.' },
    piattaforma: { name: 'Piattaforma di difesa', build: piattaforma, size: 'circa 250 m', drawn: .12, works: 'difesa-piattaforma', about: 'Piattaforma esagonale con torrette laser contro frammenti e droni.' },
    fortezza: { name: 'Fortezza orbitale', build: fortezza, size: 'circa 500 m', drawn: .2, works: 'difesa-fortezza', about: 'Nucleo corazzato con due piani di torrette e difese ravvicinate tutto attorno: protegge la porta del sistema.' },
    scudo: { name: 'Generatore di scudo', build: scudo, size: 'circa 450 m', drawn: .18, works: 'difesa-scudo', about: 'Anelli emettitori rotanti attorno a un reattore: stende uno scudo davanti alla porta.' }
};
export const DEFENCE_STATION_KEYS = Object.keys(DEFENCE_STATIONS);
