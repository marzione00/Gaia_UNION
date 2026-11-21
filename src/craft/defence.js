/** Defence fleet (1.47.0): eleven ship classes, from the fighter to the super-carrier, and five defensive
 * stations, built in the defence style (src/craft/styles.js). Ships point the bow towards +z with y up, as in
 * src/craft/ships.js; their hulls are faceted and armoured, with laser turrets, point defence, launchers of
 * interceptor drones, radar masts, shield emitters, hangars and flight decks. The fleet guards the stations
 * and the gate of its system against the natural threats and the swarm of the later releases. Every model is
 * built from its seed, and its structural choices are written down as the recipe. */
import { Kit, TAU, hash, section, assemble, WHITE, RED, GREEN, AMBER } from './kit.js';
import { mast, smallDish, hangar, radiator, solarWing, polyhedron, windowRing } from './parts.js';
import { canopy, wingPair } from './ships.js';

const GUN = [1, .38, .26, 1], SHIELD = [.45, .8, 1, 1], ENGINE = [.55, .78, 1, 1];
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
/** Hangar mouth on the face z of a hull, w wide and h high at height y, lit inside. */
function bay(k, z, w, h, y = 0, facing = 1, x = 0) {
    k.push([x, 0, 0]); k.dark(); k.box([0, y, z], [w, h, .1]); k.glow(k.style.window, 1.4); k.box([0, y, z + facing * .11], [w * .86, h * .8, .01]);
    k.accent(.5); for (const sx of [1, -1]) k.box([sx * w * 1.04, y, z + facing * .05], [.04, h * 1.05, .07]); k.pop();
}
/** Hexagonal section of an armour plate: half width w, half height h, centre height y, chamfer c. */
const plateSec = (z, w, h, y, c) => ({ z, pts: [[w * (1 - c), y - h], [w, y], [w * (1 - c), y + h], [-w * (1 - c), y + h], [-w, y], [-w * (1 - c), y - h]] });
/** Armour plate through stations [z, w, h, y] from the bow to the stern, centred at x: a lit top, two
 * shaded bevels on each side and a dark underside. `tone` is hull, dark, steel or trim (the fleet colour). */
function plate(k, stations, tone = 'hull', x = 0, c = .3) {
    // Long plates are cut into panels about 0.8 units long, each with its own shade, and every fourth seam
    // is a darker joint, so the armour reads as plating.
    const st = k.style, base = st[tone], cut = [];
    stations.forEach((a, i) => { cut.push(a); const b = stations[i + 1]; if (!b) return; const n = k.low ? 1 : Math.max(1, Math.round((a[0] - b[0]) / .8)); for (let j = 1; j < n; j++) cut.push(a.map((v, m) => v + (b[m] - v) * j / n)); });
    const panel = s => tone === 'trim' ? 1 : s % 4 === 3 ? .74 : .88 + .2 * hash(s, x, stations.length);
    const paint = (m, s, q) => shade(base, panel(s) * (q === 2 ? 1.04 : q === 1 || q === 3 ? .84 : q === 5 ? .45 : .66));
    k.push([x, 0, 0]); k.paint(base, tone === 'trim' ? .4 : .55, .5); k.loft(cut.map(([z, w, h, y]) => plateSec(z, w, h, y, c)), { paint }); k.pop();
}
/** Dark recessed strip along both sides of a hull at height y, from z0 to z1, set in by `inset`. */
function recess(k, W, H, y, z0, z1) { for (const sx of [1, -1]) plate(k, [[z0, .06, H, y], [z1, .06, H, y]], 'dark', sx * W, .2); }
/** Field of greebles on a deck: a low box covered with small blocks. */
function greebles(k, c, h, n = 2) { k.steel(); k.box(c, h, .4, n); }
/** Band in the fleet colour wrapped across the top of a plate at z: a thin raised plate. */
const band = (k, z, len, w, y, x = 0) => plate(k, [[z + len / 2, w, .035, y], [z - len / 2, w, .035, y]], 'trim', x, .2);
/** Engine bank at the stern z: a dark housing with cols × rows rectangular nozzles glowing blue-white, and
 * one flame for each column. */
function engineBank(k, z, w, h, cols, rows, y = 0, x = 0) {
    const cw = 2 * w / cols, rh = 2 * h / rows;
    k.push([x, y, z]); k.dark(); k.box([0, 0, .25], [w * 1.04, h * 1.06, .3], .5);
    for (let i = 0; i < cols; i++) for (let j = 0; j < rows; j++) {
        const cx = -w + cw * (i + .5), cy = -h + rh * (j + .5);
        k.steel(); k.box([cx, cy, -.08], [cw * .44, rh * .4, .1]); k.glow(ENGINE, 3.2); k.box([cx, cy, -.19], [cw * .34, rh * .3, .01]);
    }
    for (let i = 0; i < cols; i++) k.flame([-w + cw * (i + .5), 0, -.5], ENGINE, Math.min(cw * 1.1, h * 1.4));
    k.pop();
}
/** Thin fin at p, length len and height h, swept back, canted by `cant` around the bow axis. */
function vane(k, p, len, h, cant = 0, sweep = .35) {
    k.push(p, [0, 0, cant]); k.hull(); k.push([0, 0, 0], [0, 0, Math.PI / 2]); k.extrude([[0, len * .5], [h, len * (.5 - sweep)], [h, -len * (.5 - sweep * .3)], [0, -len * .5]], -.035, .035); k.pop();
    k.trim(); k.box([0, h * .93, -len * (.15 + sweep * .2)], [.045, h * .07, len * .2]); k.pop();
}
/** Antenna from a to b with a light at the tip. */
function spike(k, a, b, color = WHITE, blink = 1.3) { k.steel(); k.beam(a, b, .025); k.light(b, color, .05, blink); }
/** Lit windows along the side x of a plate, at height y between z0 and z1, on both sides. */
function portholes(k, x, y, z0, z1, n) { for (let i = 0; i < n; i++) { if (hash(i, x, y) < .2) continue; const z = z0 + (z1 - z0) * (i + .5) / n; for (const sx of [1, -1]) k.pane([sx * (x + .015), y, z], [sx, 0, 0], [0, 0, 1], .12, .05); } }
/** Running lights: red to port (+x), green to starboard (−x). */
function nav(k, X, y, z) { k.light([X, y, z], RED, .07, .9); k.light([-X, y, z], GREEN, .07, .9); }
/** Flight deck lights of a carrier pod at x: a chase of amber lights along both edges. */
function runway(k, x, z0, z1, w, y, n = 6) { for (let i = 0; i < n; i++) for (const sx of [1, -1]) k.light([x + sx * w, y, z1 - (z1 - z0) * i / n], i ? AMBER : WHITE, .05, -(i * .09)); }

// Ships. The hulls are built from layered armour plates: a keel with a wedge prow, upper decks set back
// and narrower, side skirts and sponsons, with bands in the fleet colour, a large engine bank at the stern,
// swept fins and a command tower set to one side.
function caccia(d, st) {
    const k = new Kit(st), L = d.range(3.6, 4.2), W = d.range(.5, .6), H = W * .45, nose = d.cycle('prua', ['forcuta', 'a cuneo', 'a lama']), pods = d.flag('gondole alle estremità', .6);
    plate(k, [[L * .45, .06, .05, 0], [L * .2, W * .55, H, 0], [-L * .3, W * .7, H * 1.1, 0], [-L * .5, W * .6, H, 0]]);
    if (nose === 'forcuta') for (const sx of [1, -1]) plate(k, [[L * .62, .03, .03, 0], [L * .32, .12, .1, 0], [L * .1, .15, .1, 0]], 'steel', sx * W * .32);
    else if (nose === 'a lama') plate(k, [[L * .66, .02, .02, -H * .3], [L * .25, W * .3, .05, -H * .3]], 'dark');
    else plate(k, [[L * .58, .04, .03, -H * .2], [L * .3, W * .35, H * .45, -H * .1]], 'steel');
    canopy(k, L * .22, -L * .05, W * .3, H * 1.05, H * .35); band(k, -L * .12, L * .06, W * .66, H * 1.05);
    wingPair(k, [[W * .6, L * .02], [W * 2.4, -L * .26], [W * 2.4, -L * .38], [W * .6, -L * .34]], -H * .2, .035);
    if (pods) for (const sx of [1, -1]) { plate(k, [[-L * .1, .05, .05, -H * .2], [-L * .22, .14, .12, -H * .2], [-L * .44, .14, .12, -H * .2]], 'dark', sx * W * 2.4); k.flame([sx * W * 2.4, -H * .2, -L * .48], ENGINE, .22); }
    engineBank(k, -L * .5, W * .45, H * .6, 2, 1);
    vane(k, [0, H, -L * .28], L * .32, H * 1.6, 0, .5);
    return assemble([[k]]);
}
function intercettore(d, st) {
    const k = new Kit(st), L = d.range(4.8, 5.4), W = d.range(.38, .45), H = W * .7, vanes = d.count('alette', 2, 3), side = d.choose('sonda', ['destra', 'sinistra']);
    plate(k, [[L * .5, .03, .03, 0], [L * .25, W * .35, H * .5, 0], [-L * .2, W * .5, H * .7, 0], [-L * .3, W * .55, H * .75, 0]]);
    plate(k, [[-L * .25, W * .9, H * 1.05, 0], [-L * .5, W * .95, H * 1.1, 0]], 'dark'); band(k, -L * .3, L * .04, W * .92, H * 1.06);
    engineBank(k, -L * .5, W * .85, H * .95, 2, 2);
    canopy(k, L * .2, -L * .02, W * .3, H * .55, H * .3);
    for (let i = 0; i < vanes; i++) { const a = vanes === 2 ? (i ? 2.1 : -2.1) : (i - 1) * 2.1; vane(k, [0, 0, -L * .05], L * .4, W * 1.6, a, .55); }
    const sx = side === 'destra' ? -1 : 1; spike(k, [sx * W * .35, H * .3, L * .15], [sx * W * .35, H * .3, L * .7], RED, 1.6);
    nav(k, W * .97, 0, -L * .45);
    return assemble([[k]]);
}
function pattugliatore(d, st) {
    const k = new Kit(st), L = d.range(5.6, 6.4), W = d.range(.8, .95), H = W * .55, guns = d.count('canne', 1, 2), fin = d.choose('deriva', ['ventrale', 'dorsale']);
    plate(k, [[L * .5, W * .12, H * .2, -H * .25], [L * .3, W * .7, H * .6, 0], [-L * .35, W, H, 0], [-L * .5, W * .9, H * .9, 0]]);
    plate(k, [[L * .12, W * .4, H * .3, H * 1.1], [-L * .4, W * .55, H * .35, H * 1.15]]); band(k, -L * .05, L * .05, W * .42, H * 1.42);
    portholes(k, W * .97, H * .2, L * .2, -L * .3, 6);
    turret(k, [0, H * .95, L * .22], .3, guns);
    bridge(k, [-W * .3, H * 1.45, -L * .2], .22, .35, .25, false);
    for (const sx of [1, -1]) { plate(k, [[-L * .05, W * .18, H * .25, -H * .35], [-L * .25, W * .28, H * .35, -H * .35], [-L * .5, W * .28, H * .35, -H * .35]], 'dark', sx * W * 1.2); engineBank(k, -L * .5, W * .22, H * .28, 1, 1, -H * .35, sx * W * 1.2); k.steel(); k.box([sx * W * 1.05, -H * .3, -L * .3], [W * .2, H * .08, L * .1]); }
    engineBank(k, -L * .5, W * .6, H * .6, 2, 1);
    vane(k, fin === 'ventrale' ? [0, -H, -L * .2] : [0, H * 1.45, -L * .32], L * .35, H * 1.3, fin === 'ventrale' ? Math.PI : 0, .4);
    k.light([0, -H * .2, L * .5], WHITE, .1, 0); nav(k, W * 1.48, -H * .35, -L * .2);
    return assemble([[k]]);
}
function corvetta(d, st) {
    const k = new Kit(st), L = d.range(7.2, 7.9), W = d.range(.9, 1.05), H = W * .6, rows = d.count('file di lanciatori', 1, 2), split = d.flag('prua divisa', .5);
    plate(k, [[L * .5, W * .1, H * .15, -H * .4], [L * .32, W * .7, H * .6, -H * .1], [-L * .2, W, H, 0], [-L * .5, W * .95, H, 0]]);
    if (split) for (const sx of [1, -1]) plate(k, [[L * .62, .04, .04, -H * .3], [L * .4, W * .2, H * .25, -H * .25]], 'steel', sx * W * .3);
    plate(k, [[L * .2, W * .55, H * .3, H * .95], [-L * .45, W * .7, H * .35, H * 1.05]]);
    for (const sx of [1, -1]) plate(k, [[L * .25, W * .1, H * .45, -H * .25], [-L * .42, W * .16, H * .65, -H * .2]], 'dark', sx * W * .98);
    band(k, L * .1, L * .04, W * .58, H * 1.27); band(k, -L * .3, L * .04, W * .68, H * 1.36);
    portholes(k, W * .98, H * .3, L * .15, -L * .35, 7);
    turret(k, [0, H * 1.25, L * .08], .34, 2);
    bridge(k, [-W * .38, H * 1.38, -L * .24], W * .2, .55, .35);
    launcher(k, [W * .3, H * 1.48, -L * .3], W * .22, .1 * rows, .32, rows, 2);
    vane(k, [W * .45, H * 1.38, -L * .38], L * .25, H * 1.2, -.35); vane(k, [-W * .45, H * 1.38, -L * .38], L * .25, H * 1.2, .35);
    for (const sx of [1, -1]) pointDefence(k, [sx * W * 1.06, 0, L * .12], .15);
    engineBank(k, -L * .5, W * .85, H * .85, 3, 2);
    spike(k, [0, -H * .4, L * .5], [0, -H * .4, L * .62], RED); nav(k, W * 1.08, -H * .2, -L * .4);
    return assemble([[k]]);
}
function fregata(d, st) {
    const k = new Kit(st), L = d.range(9, 9.8), W = d.range(1.05, 1.2), H = W * .58, aft = d.choose('torretta di poppa', ['dorsale', 'ventrale']), pods = d.choose('sponsoni', ['lanciatori', 'hangar']);
    plate(k, [[L * .5, W * .18, H * .2, -H * .3], [L * .3, W * .75, H * .7, -H * .1], [-L * .3, W, H, 0], [-L * .5, W * .9, H * .9, 0]]);
    plate(k, [[L * .35, W * .25, H * .25, H * .9], [L * .1, W * .4, H * .35, H * .95], [-L * .45, W * .45, H * .4, H * 1.05]]);
    band(k, L * .2, L * .04, W * .3, H * 1.17); band(k, -L * .25, L * .05, W * .47, H * 1.47);
    portholes(k, W * .98, H * .25, L * .2, -L * .35, 8);
    for (const sx of [1, -1]) {
        const x = sx * W * 1.75; k.steel(); for (const z of [L * .05, -L * .25]) k.box([sx * W * 1.3, 0, z], [W * .38, H * .1, L * .05]);
        plate(k, [[L * .22, W * .2, H * .3, 0], [L * .1, W * .32, H * .42, 0], [-L * .38, W * .36, H * .45, 0]], 'hull', x);
        if (pods === 'lanciatori') launcher(k, [x, 0, L * .22], W * .16, H * .2, .1, 2, 2); else bay(k, L * .225, W * .2, H * .25, 0, 1, x);
        engineBank(k, -L * .38, W * .3, H * .38, 1, 2, 0, x); band(k, -L * .1, L * .04, W * .33, H * .44, x);
    }
    turret(k, [0, H * 1.18, L * .18], .38, 2);
    turret(k, aft === 'dorsale' ? [0, H * 1.45, -L * .12] : [0, -H * .95, -L * .1], .34, 2, aft !== 'dorsale');
    bridge(k, [W * .25, H * 1.45, -L * .32], W * .2, .6, .4);
    bay(k, -L / 2 + .05, W * .45, H * .3, -H * .45, -1);
    vane(k, [-W * .2, H * 1.45, -L * .42], L * .2, H * 1.6, .15);
    engineBank(k, -L * .5, W * .75, H * .8, 3, 2);
    spike(k, [W * .3, -H * .3, L * .45], [W * .3, -H * .3, L * .62]); spike(k, [-W * .3, -H * .3, L * .45], [-W * .3, -H * .3, L * .58], RED);
    nav(k, W * 2.12, 0, -L * .3);
    return assemble([[k]]);
}
function cacciatorpediniere(d, st) {
    const k = new Kit(st), L = d.range(11, 11.8), W = d.range(.85, .95), H = W * .7, prow = d.choose('prua', ['a martello', 'a cuneo']), n = d.count('torrette', 3, 3);
    plate(k, [[L * .38, W * .45, H * .55, 0], [-L * .3, W * .6, H * .75, 0], [-L * .5, W * .6, H * .75, 0]]);
    if (prow === 'a martello') { plate(k, [[L * .5, W * 1.4, H * .2, 0], [L * .4, W * 1.55, H * .32, 0], [L * .33, W * 1.1, H * .4, 0]]); band(k, L * .43, L * .03, W * 1.45, H * .3); nav(k, W * 1.55, 0, L * .42); }
    else { plate(k, [[L * .52, .06, .06, -H * .2], [L * .36, W * .55, H * .55, -H * .05]], 'steel'); nav(k, W * .62, 0, -L * .45); }
    plate(k, [[L * .2, W * .35, H * .25, H * .9], [-L * .35, W * .42, H * .3, H * .95]]);
    for (let i = 0; i < n; i++) turret(k, [0, H * 1.18, L * (.14 - i * .15)], .34, i === 1 ? 3 : 2);
    for (const sx of [1, -1]) { const x = sx * W * 1.45; k.steel(); k.box([sx * W * .9, 0, -L * .05], [W * .35, H * .1, L * .04]); plate(k, [[L * .12, W * .2, H * .22, 0], [-L * .22, W * .28, H * .3, 0]], 'dark', x); launcher(k, [x, 0, L * .12], W * .16, H * .16, .08, 1, 3); }
    portholes(k, W * .6, H * .2, L * .3, -L * .3, 9);
    plate(k, [[-L * .32, W * .95, H * .9, 0], [-L * .5, W, H * .95, 0]], 'dark'); band(k, -L * .36, L * .03, W * .97, H * .93);
    bridge(k, [-W * .25, H * 1.2, -L * .25], W * .25, .7, .4);
    vane(k, [W * .5, H * .9, -L * .44], L * .14, H * 1.1, -.5); vane(k, [-W * .5, H * .9, -L * .44], L * .14, H * 1.1, .5); vane(k, [0, -H * .9, -L * .42], L * .16, H * 1.2, Math.PI);
    engineBank(k, -L * .5, W * .9, H * .85, 4, 2);
    return assemble([[k]]);
}
/** Layered body of the cruisers and the battleship: keel with a wedge prow, decks stepping up and back,
 * dark side skirts, bands in the fleet colour and windows along the sides. */
function layered(k, L, W, H, decks, skirts = true) {
    plate(k, [[L * .5, W * .25, H * .25, -H * .35], [L * .3, W * .8, H * .7, -H * .1], [-L * .3, W, H, 0], [-L * .5, W * .95, H * .95, 0]]);
    let y = H * .95;
    for (let i = 0; i < decks; i++) { const f = 1 - i * .25, z0 = L * (.28 - i * .18), z1 = -L * (.45 - i * .02); plate(k, [[z0, W * .68 * f, H * .3, y], [z1, W * .82 * f, H * .36, y + H * .05]]); band(k, (z0 + z1) / 2, L * .04, W * .8 * f, y + H * .37); y += H * .62; }
    if (skirts) for (const sx of [1, -1]) plate(k, [[L * .3, W * .1, H * .5, -H * .25], [-L * .42, W * .16, H * .75, -H * .2]], 'dark', sx * W * 1.02);
    recess(k, W * .99, H * .12, H * .45, L * .22, -L * .45);
    portholes(k, W * 1.0, H * .3, L * .25, -L * .38, 10);
    greebles(k, [0, H * 1.3, -L * .38], [W * .5, H * .06, L * .06]);
    return y;
}
function incrociatore(d, st) {
    const k = new Kit(st), L = d.range(13, 13.8), W = d.range(1.25, 1.4), H = W * .62, side = d.choose('torre', ['destra', 'sinistra']), shield = d.choose('scudo', ['prua', 'poppa']);
    const top = layered(k, L, W, H, 2), sx = side === 'destra' ? -1 : 1;
    for (const [z, flip] of [[.24, false], [.12, false], [.2, true], [-.05, true]]) turret(k, [0, flip ? -H * .95 : H * 1.25, L * z], .4, 2, flip);
    plate(k, [[-L * .14, W * .3, H * .5, top + H * .2], [-L * .32, W * .35, H * .6, top + H * .25]], 'hull', sx * W * .35);
    bridge(k, [sx * W * .35, top + H * .85, -L * .24], W * .22, .9, .4);
    shieldEmitter(k, shield === 'prua' ? [0, H * .55, L * .38] : [-sx * W * .4, top, -L * .38], .42);
    vane(k, [W * .6, top - H * .3, -L * .42], L * .14, H * 1.4, -.4); vane(k, [-W * .6, top - H * .3, -L * .42], L * .14, H * 1.4, .4); vane(k, [0, -H, -L * .38], L * .2, H * 1.3, Math.PI);
    engineBank(k, -L * .5, W * .85, H * .9, 4, 3);
    spike(k, [W * .3, -H * .4, L * .45], [W * .3, -H * .4, L * .6]); nav(k, W * 1.18, -H * .2, -L * .4);
    return assemble([[k]]);
}
function incrociatorePesante(d, st) {
    const k = new Kit(st), L = d.range(14.6, 15.6), W = d.range(1.45, 1.6), H = W * .62, gun = d.flag('arma spinale', .6), nEng = d.count('colonne di ugelli', 4, 5);
    for (const sx of [1, -1]) plate(k, [[L * .5, W * .12, H * .2, 0], [L * .28, W * .35, H * .55, 0], [L * .08, W * .42, H * .7, 0]], 'hull', sx * W * .5);
    plate(k, [[L * .3, W * .18, H * .3, 0], [L * .08, W * .3, H * .4, 0]], 'dark');
    if (gun) { k.glow(GUN, 2.5); k.box([0, 0, L * .3], [W * .12, H * .15, .02]); k.light([0, 0, L * .31], GUN, .12, .5); }
    plate(k, [[L * .15, W * .92, H * .8, 0], [-L * .35, W, H, 0], [-L * .5, W * .95, H * .95, 0]]);
    let y = H * .95; for (let i = 0; i < 3; i++) { const f = 1 - i * .22, z0 = L * (.1 - i * .12), z1 = -L * .44; plate(k, [[z0, W * .7 * f, H * .3, y], [z1, W * .82 * f, H * .35, y + H * .05]]); band(k, (z0 + z1) / 2 - L * .05, L * .04, W * .8 * f, y + H * .36); y += H * .6; }
    for (const sx of [1, -1]) for (let i = 0; i < 4; i++) { k.dark(); k.box([sx * W * 1.04, H * .05, L * (.1 - i * .13)], [.1, H * .45, L * .055], .4); }
    for (const [z, flip] of [[.04, false], [-.1, false], [.22, true], [-.02, true], [-.2, true]]) turret(k, [0, flip ? -H * .95 : H * 1.25, L * z], .44, flip ? 2 : 3, flip);
    for (const sx of [1, -1]) launcher(k, [sx * W * .6, y - H * .3, -L * .3], .24, .16, .5, 2, 3);
    bridge(k, [-W * .3, y, -L * .3], W * .24, 1.1, .45);
    vane(k, [W * .55, y - H * .4, -L * .43], L * .12, H * 1.4, -.45); vane(k, [-W * .55, y - H * .4, -L * .43], L * .12, H * 1.4, .45);
    engineBank(k, -L * .5, W * .88, H * .9, nEng, 3);
    nav(k, W * .62, 0, L * .4); nav(k, W * 1.15, 0, -L * .35);
    return assemble([[k]]);
}
function corazzata(d, st) {
    const k = new Kit(st), L = d.range(17, 18.2), W = d.range(1.85, 2), H = W * .6, spinal = d.flag('cannone spinale', .5), side = d.choose('torre', ['destra', 'sinistra']);
    const top = layered(k, L, W, H, 3), sx = side === 'destra' ? -1 : 1;
    plate(k, [[L * .4, W * .08, H * .45, -H * 1.25], [-L * .3, W * .1, H * .6, -H * 1.3]], 'dark');
    for (const s2 of [1, -1]) for (let i = 0; i < 5; i++) { k.dark(); k.box([s2 * W * 1.14, H * .05, L * (.26 - i * .14)], [.12, H * .5, L * .06], .45); }
    for (const [z, flip, y] of [[.26, false, H * 1.25], [.14, false, H * 1.25], [-.04, false, H * 1.87], [.25, true, 0], [.08, true, 0], [-.12, true, 0]]) turret(k, [0, flip ? -H * .95 : y, L * z], .52, 3, flip);
    if (spinal) { plate(k, [[L * .52, W * .15, H * .2, 0], [L * .4, W * .25, H * .3, 0]], 'dark'); k.glow(GUN, 2.5); k.box([0, 0, L * .52], [W * .1, H * .12, .02]); }
    plate(k, [[-L * .16, W * .35, H * .6, top + H * .3], [-L * .34, W * .4, H * .7, top + H * .35]], 'hull', sx * W * .3);
    bridge(k, [sx * W * .3, top + H * 1.05, -L * .26], W * .24, 1.3, .5);
    for (const s2 of [1, -1]) shieldEmitter(k, [s2 * W * .6, H * 1.25, L * .36], .38);
    for (const s2 of [1, -1]) { vane(k, [s2 * W * .7, top - H * .5, -L * .44], L * .12, H * 1.6, -s2 * .4); vane(k, [s2 * W * .6, -H * .9, -L * .42], L * .12, H * 1.2, Math.PI + s2 * .5); }
    engineBank(k, -L * .5, W * .88, H * .9, 6, 3);
    nav(k, W * 1.27, 0, -L * .3);
    return assemble([[k]]);
}
function portaerei(d, st) {
    const k = new Kit(st), L = d.range(17.4, 18.6), W = d.range(1.1, 1.25), H = W * .7, side = d.choose('torre', ['destra', 'sinistra']), links = d.count('ponti di collegamento', 2, 3);
    plate(k, [[L * .45, W * .4, H * .4, 0], [L * .3, W * .7, H * .8, 0], [-L * .4, W * .75, H * .85, 0], [-L * .5, W * .7, H * .8, 0]]);
    plate(k, [[L * .2, W * .45, H * .3, H * .95], [-L * .45, W * .55, H * .35, H * 1.0]]); band(k, -L * .1, L * .04, W * .56, H * 1.32);
    for (const s2 of [1, -1]) {
        const x = s2 * W * 1.75;
        plate(k, [[L * .5, W * .45, H * .6, 0], [L * .42, W * .62, H * .78, 0], [-L * .35, W * .62, H * .78, 0], [-L * .46, W * .52, H * .66, 0]], 'hull', x);
        bay(k, L * .5 - .02, W * .4, H * .48, 0, 1, x); runway(k, x, -L * .3, L * .45, W * .5, H * .8, 7);
        band(k, L * .3, L * .03, W * .64, H * .79, x); band(k, -L * .2, L * .03, W * .64, H * .79, x);
        engineBank(k, -L * .46, W * .48, H * .55, 2, 2, 0, x);
        for (const z of [.35, -.25]) pointDefence(k, [x + s2 * W * .55, H * .55, L * z], .18);
    }
    for (let i = 0; i < links; i++) { const z = L * (.25 - i * .55 / Math.max(1, links - 1)); k.steel(); k.box([0, 0, z], [W * 1.4, H * .3, L * .04], .5); }
    const sx = side === 'destra' ? -1 : 1; bridge(k, [sx * W * .3, H * 1.32, -L * .25], W * .25, 1.2, .5);
    shieldEmitter(k, [0, -H * .8, L * .1], .42);
    vane(k, [-sx * W * .25, H * 1.32, -L * .4], L * .12, H * 1.5, sx * .2);
    engineBank(k, -L * .5, W * .6, H * .7, 3, 2);
    nav(k, W * 2.4, 0, L * .3);
    return assemble([[k]]);
}
function superportaerei(d, st) {
    const k = new Kit(st), ring = new Kit(st), L = d.range(23.5, 26), W = d.range(1.6, 1.8), D = d.range(3.2, 3.5), H = W * .55, towers = d.count('torri di comando', 1, 2), spokes = d.choose('raggi dell\'anello', [4, 6]);
    for (const sx of [1, -1]) {
        const x = sx * D;
        plate(k, [[L * .5, W * .45, H * .5, 0], [L * .38, W * .85, H * .85, 0], [-L * .4, W, H, 0], [-L * .5, W * .9, H * .9, 0]], 'hull', x);
        plate(k, [[L * .3, W * .55, H * .3, H * .95], [-L * .45, W * .7, H * .35, H * 1.0]], 'hull', x);
        for (const z of [.36, .05, -.28]) band(k, L * z, L * .025, W * .72, H * 1.33, x);
        bay(k, L * .5 - .02, W * .4, H * .42, 0, 1, x); runway(k, x, -L * .4, L * .28, W * .55, H * 1.36, 6);
        engineBank(k, -L * .5, W * .85, H * .85, 3, 3, 0, x);
        for (const z of [.3, 0, -.3]) pointDefence(k, [x + sx * W * 1.02, 0, L * z], .2);
    }
    plate(k, [[L * .32, D * .55, H * .45, 0], [-L * .44, D * .62, H * .5, 0]], 'dark');
    for (let t = 0; t < towers; t++) { const z = L * (.1 - t * .26); plate(k, [[z + L * .08, W * .55, H * .55, H * 1.0], [z - L * .08, W * .7, H * .65, H * 1.05]]); bridge(k, [0, H * 1.7, z], W * .4, 1.4, .7); }
    for (const sx of [1, -1]) shieldEmitter(k, [sx * D, -H * .9, L * .3], .5);
    vane(k, [D * .5, H * .4, -L * .42], L * .1, H * 2, -.3); vane(k, [-D * .5, H * .4, -L * .42], L * .1, H * 2, .3);
    // Crew ring around the spine, turning for gravity.
    const Rr = D * .55, zr = -L * .32; ring.push([0, 0, zr], [Math.PI / 2, 0, 0]); ring.hull(); ring.torus(Rr, .22, st.seg(40), 8);
    around(spokes, a => { ring.steel(); ring.beam([Math.cos(a) * .4, 0, Math.sin(a) * .4], [Math.cos(a) * Rr, 0, Math.sin(a) * Rr], .06); }); around(Math.round(Rr * 7), a => ring.pane([Math.cos(a) * (Rr + .22), 0, Math.sin(a) * (Rr + .22)], [Math.cos(a), 0, Math.sin(a)], [-Math.sin(a), 0, Math.cos(a)], .14, .07)); ring.pop();
    nav(k, D + W * 1.02, 0, L * .4);
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
