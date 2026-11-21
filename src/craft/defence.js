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

/** Hull in overlapping segments from z0 (bow) to z1 (stern): `f(t)` gives half width, height of the back
 * and centre height along the hull, t from 0 at the bow to 1 at the stern. The cross-section has a sharp
 * chine at the sides: a full rounded back over a flatter belly (`belly` times the back). Each segment
 * starts a little inside the one before, with a narrow joint at its front edge, so the plating reads in
 * rings; the joint is in the fleet colour on the segments listed in `bands`. The back is pale, the flanks
 * alternate pale and slate panels (or follow `pattern(segment, around)`), the belly is dark slate. */
function shell(k, z0, z1, segs, f, o = {}) {
    const m = k.low ? 4 : o.n || 8, L = z0 - z1, step = L / segs, st = k.style, bands = o.bands || [], lip = o.lip ?? .93, belly = o.belly ?? .55, e = o.e || 2.3;
    // Blade prow: towards the bow the hull flattens faster than it narrows.
    const blade = o.blade ?? .4, at = z => { const t = Math.min(1, Math.max(0, (z0 - z) / L)), v = f(t); return t < blade ? [v[0], v[1] * (.3 + .7 * t / blade), v[2]] : v; };
    const half = (z, sc, up) => { const [w0, h0, y] = at(z), w = Math.max(.03, w0 * sc), h = Math.max(.03, h0 * sc * (up ? 1 : belly)), pts = [];
        for (let j = 0; j <= m; j++) { const a = (up ? 0 : Math.PI) + Math.PI * j / m, c = Math.cos(a), q = Math.sin(a); pts.push([Math.sign(c) * Math.abs(c) ** (2 / e) * w, y + Math.sign(q) * Math.abs(q) ** (2 / e) * h]); }
        return { z, pts }; };
    k.push([o.x || 0, o.y || 0, 0]);
    for (let i = 0; i < segs; i++) {
        const za = z0 - i * step + (i ? step * .1 : 0), zj = za - step * (bands.includes(i) ? .2 : .12), zm = z0 - (i + .5) * step, zb = z0 - (i + 1) * step, band = bands.includes(i);
        const slate = fr => o.pattern ? o.pattern(i, fr) : i % 2 === 0;
        const up = (pt, s, q) => {
            if (q === m) return st.dark;
            const fr = (q + .5) / m, mid = Math.abs(fr - .5);
            if (s === 0) return band ? st.trim : shade(st.steel, .62);
            if (mid < .16) return shade(st.hull, .97 + .07 * hash(i, s, 7));
            if (mid < .3) return shade(slate(fr) ? st.steel : st.hull, .92 + .08 * hash(i, q, s));
            return shade(st.steel, .8 + .1 * hash(i, q, s));
        };
        const down = (pt, s, q) => q === m ? st.dark : shade(s === 0 ? st.dark : st.steel, .55 + .15 * hash(i, q, s));
        for (const [isUp, paint] of [[true, up], [false, down]]) { k.paint(st.hull, .55, .45); k.loft([half(za, i ? lip : 1, isUp), half(zj, i ? .985 : 1, isUp), half(zm, 1, isUp), half(zb, 1, isUp)], { paint }); }
    }
    k.pop();
}
/** Nose taper: 0 at the bow, full size after the fraction `nose` of the length, a little smaller at the stern. */
const taper = (t, nose = .3, tail = .85) => t < nose ? .12 + .88 * Math.sqrt(t / nose) : 1 - (1 - tail) * (t - nose) / (1 - nose);
/** Engine nacelle ending at p (its stern), radius r and length len: a smooth pod with a lit ring and a
 * glowing disc at the back and a long flame. */
function nacelle(k, p, r, len, band = false) {
    const [x, y, z] = p;
    shell(k, z + len, z, 2, t => { const g = t < .35 ? .45 + 1.57 * t : 1; return [r * g, r * g, 0]; }, { x, y, n: 6, e: 2.2, belly: 1, blade: 0, pattern: () => false, bands: band ? [1] : [] });
    k.push([x, y, z], [Math.PI / 2, 0, 0]); k.steel(); k.cyl(r * .98, r * .84, 0, -r * .35, 12, { caps: false }); k.glow(ENGINE, 3.4); k.cyl(r * .8, r * .8, -r * .2, -r * .23, 12); k.pop();
    k.flame([x, y, z - r * .8], ENGINE, r * 1.8);
}
/** Pylon from the hull to a nacelle: a flat blade from a to b. */
function pylon(k, a, b, w, t = .06) { k.steel(); k.box([(a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2], [Math.abs(b[0] - a[0]) / 2 + .02, Math.max(t, Math.abs(b[1] - a[1]) / 2), w]); }
/** Streamlined superstructure on the back at height y, from z0 to z1, with a row of lit windows towards
 * the bow and a mast. */
function tower(k, x, y, z0, z1, w, h, windows = 6) {
    shell(k, z0, z1, 2, t => [w * (.55 + .45 * Math.min(1, t * 2.5)), h * (.4 + .6 * Math.min(1, t * 2.5)), h * .2], { x, y, n: 6, blade: 0, belly: .3, pattern: () => true });
    const zw = z0 - (z0 - z1) * .45; for (let i = 0; i < windows; i++) k.pane([x - w * .6 + i * w * 1.2 / Math.max(1, windows - 1), y + h * .85, zw + .02], [0, .35, .94], [1, 0, 0], .1, .05);
    k.push([x, y + h * 1.1, z1 + (z0 - z1) * .25]); mast(k, h * 1.2, 1, 1.3); k.pop();
}

// Ships. The hulls are long and smooth, built of overlapping segments in two tones, with tapering noses,
// forward prongs on the larger ships, fins, nacelles on pylons and banks of engines glowing blue-white.
function caccia(d, st) {
    const k = new Kit(st), L = d.range(3.8, 4.3), W = d.range(.42, .5), H = W * .55, wing = d.cycle('ali', ['a freccia', 'a freccia invertita', 'a delta']), twin = d.flag('due gondole', .6);
    shell(k, L * .5, -L * .5, 3, t => [W * taper(t, .45), H * taper(t, .45), 0], { bands: [1] });
    canopy(k, L * .2, -L * .08, W * .32, H * .9, H * .32);
    const plan = wing === 'a freccia' ? [[W * .6, -L * .02], [W * 2.5, -L * .3], [W * 2.5, -L * .38], [W * .6, -L * .32]] : wing === 'a freccia invertita' ? [[W * .6, -L * .34], [W * 2.4, -L * .1], [W * 2.4, -L * .03], [W * .6, -L * .18]] : [[W * .6, L * .1], [W * 2.3, -L * .36], [W * .6, -L * .4]];
    wingPair(k, plan, -H * .15, .03);
    if (twin) for (const sx of [1, -1]) nacelle(k, [sx * W * .8, 0, -L * .5], W * .32, L * .45); else nacelle(k, [0, 0, -L * .5], W * .5, L * .4);
    vane(k, [0, H * .8, -L * .3], L * .3, H * 1.5, 0, .55);
    return assemble([[k]]);
}
function intercettore(d, st) {
    const k = new Kit(st), L = d.range(4.8, 5.4), W = d.range(.34, .4), H = W * .8, fins = d.count('alette', 2, 3), probe = d.choose('sonda', ['destra', 'sinistra']);
    shell(k, L * .5, -L * .2, 3, t => [W * taper(t, .6, 1.3), H * taper(t, .6, 1.3), 0], { bands: [2] });
    nacelle(k, [0, 0, -L * .5], W * 1.05, L * .38, true);
    canopy(k, L * .2, -L * .02, W * .3, H * .6, H * .3);
    for (let i = 0; i < fins; i++) vane(k, [0, 0, -L * .2], L * .3, W * 1.8, fins === 2 ? (i ? 2 : -2) : (i - 1) * 2.1, .6);
    const sx = probe === 'destra' ? -1 : 1; spike(k, [sx * W * .3, H * .2, L * .1], [sx * W * .3, H * .2, L * .7], RED, 1.6);
    nav(k, W * 1.1, 0, -L * .45);
    return assemble([[k]]);
}
function pattugliatore(d, st) {
    const k = new Kit(st), L = d.range(5.8, 6.4), W = d.range(.75, .85), H = W * .52, guns = d.count('canne', 1, 2), fin = d.choose('deriva', ['ventrale', 'dorsale']);
    shell(k, L * .5, -L * .45, 4, t => [W * taper(t, .35), H * taper(t, .35), 0], { bands: [1] });
    for (const sx of [1, -1]) { pylon(k, [sx * W * .8, -H * .1, -L * .25], [sx * W * 1.35, -H * .1, -L * .25], L * .07); nacelle(k, [sx * W * 1.5, -H * .1, -L * .5], W * .32, L * .5); }
    turret(k, [0, H * .9, L * .12], .28, guns);
    tower(k, 0, H * .75, -L * .02, -L * .3, W * .35, H * .5, 5);
    vane(k, fin === 'ventrale' ? [0, -H * .9, -L * .3] : [0, H * 1.3, -L * .38], L * .25, H * 1.3, fin === 'ventrale' ? Math.PI : 0, .45);
    k.light([0, -H * .2, L * .48], WHITE, .1, 0); nav(k, W * 1.85, -H * .1, -L * .3);
    return assemble([[k]]);
}
function corvetta(d, st) {
    const k = new Kit(st), L = d.range(7.2, 7.9), W = d.range(.9, 1), H = W * .52, rows = d.count('file di lanciatori', 1, 2), prongs = d.flag('punte di prua', .5);
    shell(k, L * .5, -L * .45, 4, t => [W * taper(t, .3), H * taper(t, .3), -H * .05 * t], { bands: [2] });
    if (prongs) for (const sx of [1, -1]) shell(k, L * .62, L * .25, 2, t => [W * .16 * taper(t, .5, 1), H * .2 * taper(t, .5, 1), -H * .3], { x: sx * W * .45, n: 10, pattern: () => true });
    tower(k, -W * .2, H * .8, L * .05, -L * .3, W * .4, H * .55, 6);
    turret(k, [0, H * .9, L * .2], .32, 2);
    launcher(k, [W * .45, H * .75, -L * .1], W * .2, .1 * rows, .3, rows, 2);
    for (const sx of [1, -1]) { pylon(k, [sx * W * .9, 0, -L * .32], [sx * W * 1.3, 0, -L * .32], L * .06); nacelle(k, [sx * W * 1.45, 0, -L * .5], W * .35, L * .42, true); }
    vane(k, [0, -H * .9, -L * .3], L * .28, H * 1.4, Math.PI, .5);
    nav(k, W * 1.8, 0, -L * .35);
    return assemble([[k]]);
}
function fregata(d, st) {
    const k = new Kit(st), L = d.range(9.2, 9.8), W = d.range(1.05, 1.15), H = W * .52, aft = d.choose('torretta di poppa', ['dorsale', 'ventrale']), side = d.choose('fianchi', ['lanciatori', 'hangar']);
    shell(k, L * .38, -L * .45, 5, t => [W * taper(t, .25), H * taper(t, .25), 0], { bands: [1, 3] });
    for (const sx of [1, -1]) shell(k, L * .55, L * .1, 3, t => [W * .22 * taper(t, .5, 1.1), H * .32 * taper(t, .5, 1.1), 0], { x: sx * W * .5, n: 10, bands: [2] });
    tower(k, W * .2, H * .85, -L * .02, -L * .3, W * .4, H * .55, 7);
    turret(k, [0, H * .95, L * .18], .36, 2);
    turret(k, aft === 'dorsale' ? [0, H * .95, -L * .36] : [0, -H * .95, -L * .1], .32, 2, aft !== 'dorsale');
    for (const sx of [1, -1]) {
        if (side === 'lanciatori') launcher(k, [sx * W * 1.02, 0, -L * .05], .1, H * .25, .6, 2, 1); else bay(k, -L * .05, .02, H * .3, 0, 1, sx * W * 1.0);
        pylon(k, [sx * W * .85, 0, -L * .34], [sx * W * 1.45, 0, -L * .34], L * .06); nacelle(k, [sx * W * 1.6, 0, -L * .5], W * .38, L * .4, true);
    }
    engineBank(k, -L * .45, W * .7, H * .55, 3, 1, -H * .1);
    vane(k, [0, -H * .6, -L * .32], L * .26, H * 1.4, Math.PI, .5);
    spike(k, [W * .5, 0, L * .55], [W * .5, 0, L * .66]); spike(k, [-W * .5, 0, L * .55], [-W * .5, 0, L * .63], RED);
    nav(k, W * 2, 0, -L * .3);
    return assemble([[k]]);
}
function cacciatorpediniere(d, st) {
    const k = new Kit(st), L = d.range(12, 12.8), W = d.range(.9, 1), H = W * .55, prow = d.choose('prua', ['a forchetta', 'ad ago']), n = d.count('torrette', 3, 3);
    shell(k, L * (prow === 'ad ago' ? .5 : .36), -L * .42, 6, t => [W * taper(t, .22), H * taper(t, .22), 0], { bands: [1, 4] });
    if (prow === 'a forchetta') for (const sx of [1, -1]) shell(k, L * .52, L * .1, 3, t => [W * .2 * taper(t, .4, 1.1), H * .35 * taper(t, .4, 1.1), -H * .1], { x: sx * W * .55, n: 10, pattern: (i, fr) => fr > .5 });
    for (let i = 0; i < n; i++) turret(k, [0, H * .95, L * (.18 - i * .14)], .32, i === 1 ? 3 : 2);
    tower(k, -W * .15, H * .85, -L * .2, -L * .38, W * .35, H * .5, 6);
    for (const sx of [1, -1]) { pylon(k, [sx * W * .8, 0, -L * .08], [sx * W * 1.3, 0, -L * .08], L * .04); shell(k, L * .08, -L * .2, 2, t => [W * .22, H * .28, 0], { x: sx * W * 1.45, n: 10, pattern: () => true }); launcher(k, [sx * W * 1.45, 0, L * .08], W * .14, H * .16, .05, 1, 2); }
    engineBank(k, -L * .42, W * .75, H * .62, 4, 2, -H * .1);
    vane(k, [0, H * .9, -L * .4], L * .16, H * 1.4, 0, .5);
    nav(k, W * 1.68, 0, -L * .1);
    return assemble([[k]]);
}
/** Long capital hull: the main shell with a raised back shell, fins and wings on the flanks. */
function capital(k, L, W, H, segs, back, cols = 4) {
    shell(k, L * .5, -L * .44, segs, t => [W * taper(t, .24), H * taper(t, .24), 0], { bands: [1, segs - 2] });
    if (back) shell(k, L * .22, -L * .4, Math.max(2, segs - 3), t => [W * .55 * taper(t, .3, .95), H * .45 * taper(t, .3, .95), H * .75], { blade: .2, belly: .3, pattern: (i, fr) => i % 2 === 1 });
    engineBank(k, -L * .44, W * .72, H * .62, cols, 2, -H * .12);
    for (let i = 0; i < Math.round(segs * 1.2); i++) for (const sx of [1, -1]) k.pane([sx * (W * .97), H * .1, L * (.25 - i * .6 / Math.round(segs * 1.2))], [sx, 0, 0], [0, 0, 1], .12, .05);
}
function incrociatore(d, st) {
    const k = new Kit(st), L = d.range(13, 13.8), W = d.range(1.25, 1.35), H = W * .5, side = d.choose('torre', ['destra', 'sinistra']), shield = d.choose('scudo', ['prua', 'poppa']);
    capital(k, L, W, H, 6, true); const sx = side === 'destra' ? -1 : 1;
    for (const [z, flip] of [[.26, false], [.14, false], [.18, true], [-.06, true]]) turret(k, [0, flip ? -H * .95 : H * (z > .2 ? .95 : 1.15), L * z], .38, 2, flip);
    tower(k, sx * W * .25, H * 1.15, -L * .12, -L * .34, W * .38, H * .55, 7);
    shieldEmitter(k, shield === 'prua' ? [0, H * .55, L * .4] : [-sx * W * .35, H * 1.15, -L * .36], .38);
    for (const s2 of [1, -1]) { wingPair(k, [[W * .9, -L * .05], [W * 2, -L * .2], [W * 2, -L * .26], [W * .9, -L * .3]], 0, .05); pylon(k, [s2 * W * .9, 0, -L * .38], [s2 * W * 1.35, 0, -L * .38], L * .05); nacelle(k, [s2 * W * 1.5, 0, -L * .5], W * .4, L * .3, true); }
    vane(k, [0, -H * .6, -L * .34], L * .2, H * 1.4, Math.PI, .5);
    spike(k, [W * .3, -H * .3, L * .44], [W * .3, -H * .3, L * .58]);
    return assemble([[k]]);
}
function incrociatorePesante(d, st) {
    const k = new Kit(st), L = d.range(14.6, 15.6), W = d.range(1.45, 1.55), H = W * .5, gun = d.flag('arma spinale', .6), nEng = d.count('gondole di poppa', 4, 6);
    shell(k, L * .32, -L * .44, 7, t => [W * taper(t, .2), H * taper(t, .2), 0], { bands: [1, 5] });
    for (const sx of [1, -1]) shell(k, L * .52, L * .02, 4, t => [W * .3 * taper(t, .35, 1.15), H * .45 * taper(t, .35, 1.15), 0], { x: sx * W * .62, bands: [2] });
    if (gun) { k.glow(GUN, 2.5); k.push([0, 0, L * .33], [Math.PI / 2, 0, 0]); k.cyl(W * .16, W * .16, 0, .02, 12); k.pop(); k.light([0, 0, L * .34], GUN, .12, .5); }
    shell(k, L * .1, -L * .4, 4, t => [W * .55 * taper(t, .3, .95), H * .45 * taper(t, .3, .95), H * .75], { blade: .2, belly: .3, pattern: (i) => i % 2 === 1 });
    for (const [z, flip] of [[.04, false], [-.12, false], [.2, true], [0, true], [-.18, true]]) turret(k, [0, flip ? -H * .95 : H * 1.15, L * z], .42, flip ? 2 : 3, flip);
    for (const sx of [1, -1]) launcher(k, [sx * W * .7, H * .6, -L * .25], .2, .14, .45, 2, 3);
    tower(k, -W * .22, H * 1.15, -L * .2, -L * .38, W * .36, H * .55, 7);
    engineBank(k, -L * .44, W * .72, H * .6, nEng, 2, -H * .12);
    for (const sx of [1, -1]) { pylon(k, [sx * W * .9, 0, -L * .36], [sx * W * 1.3, 0, -L * .36], L * .05); nacelle(k, [sx * W * 1.45, 0, -L * .48], W * .34, L * .26, true); }
    for (const sx of [1, -1]) vane(k, [sx * W * .7, H * .5, -L * .4], L * .16, H * 1.4, -sx * .5, .5);
    nav(k, W * .92, 0, L * .45);
    return assemble([[k]]);
}
function corazzata(d, st) {
    const k = new Kit(st), L = d.range(17, 18.2), W = d.range(1.75, 1.9), H = W * .5, spinal = d.flag('cannone spinale', .5), side = d.choose('torre', ['destra', 'sinistra']);
    capital(k, L, W, H, 8, true, 6); const sx = side === 'destra' ? -1 : 1;
    for (const s2 of [1, -1]) shell(k, L * .2, -L * .42, 5, t => [W * .32 * taper(t, .3, 1), H * .6 * taper(t, .3, 1), -H * .1], { x: s2 * W * 1.15, bands: [3] });
    plate(k, [[L * .35, W * .06, H * .05, -H * .75], [L * .2, W * .07, H * .35, -H * .95], [-L * .3, W * .08, H * .45, -H * 1.0]], 'steel');
    for (const [z, flip, y] of [[.3, false, H * .95], [.18, false, H * 1.15], [-.06, false, H * 1.6], [.25, true, 0], [.08, true, 0], [-.12, true, 0]]) turret(k, [0, flip ? -H * .95 : y, L * z], .5, 3, flip);
    if (spinal) { k.glow(GUN, 2.5); k.push([0, 0, L * .5], [Math.PI / 2, 0, 0]); k.cyl(W * .12, W * .12, 0, .02, 12); k.pop(); k.light([0, 0, L * .51], GUN, .14, .5); }
    tower(k, sx * W * .28, H * 1.2, -L * .14, -L * .32, W * .4, H * .7, 8);
    for (const s2 of [1, -1]) shieldEmitter(k, [s2 * W * .55, H * .9, L * .32], .36);
    for (const s2 of [1, -1]) nacelle(k, [s2 * W * 1.15, -H * .1, -L * .48], W * .28, L * .14, true);
    for (const s2 of [1, -1]) vane(k, [s2 * W * .7, H * .8, -L * .4], L * .14, H * 1.6, -s2 * .45, .5);
    nav(k, W * 1.5, 0, -L * .3);
    return assemble([[k]]);
}
function portaerei(d, st) {
    const k = new Kit(st), L = d.range(17.4, 18.6), W = d.range(1.2, 1.3), H = W * .6, side = d.choose('torre', ['destra', 'sinistra']), links = d.count('ponti di collegamento', 2, 3);
    shell(k, L * .48, -L * .44, 7, t => [W * taper(t, .2), H * taper(t, .2), 0], { bands: [1, 5] });
    for (const s2 of [1, -1]) {
        const x = s2 * W * 1.8;
        shell(k, L * .46, -L * .4, 6, t => [W * .62 * taper(t, .12, .95), H * .85 * taper(t, .12, .95), 0], { x, bands: [2], pattern: (i, fr) => (fr > .5) === (i % 2 === 0) });
        bay(k, L * .44, W * .4, H * .5, 0, 1, x); runway(k, x, -L * .3, L * .4, W * .45, H * .82, 7);
        nacelle(k, [x, 0, -L * .5], W * .45, L * .14, true);
        for (const z of [.3, -.2]) pointDefence(k, [x + s2 * W * .6, H * .3, L * z], .16);
    }
    for (let i = 0; i < links; i++) { const z = L * (.25 - i * .55 / Math.max(1, links - 1)); shell(k, z + L * .03, z - L * .03, 1, () => [W * 1.6, H * .25, 0], { n: 10, pattern: () => true }); }
    const sx = side === 'destra' ? -1 : 1; tower(k, sx * W * .25, H * .85, -L * .12, -L * .32, W * .4, H * .65, 7);
    shieldEmitter(k, [0, -H * .85, L * .1], .38);
    engineBank(k, -L * .44, W * .72, H * .6, 3, 2, -H * .1);
    nav(k, W * 2.42, 0, L * .3);
    return assemble([[k]]);
}
function superportaerei(d, st) {
    const k = new Kit(st), ring = new Kit(st), L = d.range(23.5, 26), W = d.range(1.6, 1.75), D = d.range(3.2, 3.5), H = W * .55, towers = d.count('torri di comando', 1, 2), spokes = d.choose('raggi dell\'anello', [4, 6]);
    for (const sx of [1, -1]) {
        const x = sx * D;
        shell(k, L * .5, -L * .44, 8, t => [W * taper(t, .14, .9), H * taper(t, .14, .9), 0], { x, bands: [1, 4, 6] });
        bay(k, L * .48, W * .45, H * .45, 0, 1, x); runway(k, x, -L * .38, L * .3, W * .6, H * 1.0, 6);
        engineBank(k, -L * .44, W * .7, H * .6, 3, 2, -H * .1, x);
        for (const z of [.3, 0, -.3]) pointDefence(k, [x + sx * W * .98, 0, L * z], .2);
    }
    shell(k, L * .32, -L * .44, 6, t => [(D - W * .7) * taper(t, .15, 1), H * .45 * taper(t, .15, 1), 0], { pattern: (i, fr) => fr > .5 });
    for (let t = 0; t < towers; t++) { const z = L * (.12 - t * .26); tower(k, 0, H * .4, z + L * .08, z - L * .08, W * .7, H * .9, 9); }
    for (const sx of [1, -1]) shieldEmitter(k, [sx * D, -H * .9, L * .3], .48);
    vane(k, [D * .45, H * .3, -L * .42], L * .1, H * 2, -.3); vane(k, [-D * .45, H * .3, -L * .42], L * .1, H * 2, .3);
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
