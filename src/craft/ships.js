/** The twelve ship classes. A ship points its bow towards +z with y up; red light to port (+x), green to
 * starboard (−x). Hulls are lofted through seeded sections, and each class adds its own modules:
 * containers, tanks, claws, booms, rings, buoy racks, cranes. Choices are written down as the recipe. */
import { Kit, TAU, hash, section, mirror, assemble, WHITE, RED, GREEN } from './kit.js';
import { solarWing, radiator, mast, smallDish, tank, capsuleTank, hazardBand, coil, pipe, polyhedron, ornament, shade, windowRing } from './parts.js';

const ENGINE = [.6, .8, 1, 1], HOT = [1, .65, .35, 1], AMBER = [1, .7, .25, 1];
const around = (n, f, offset = 0) => { for (let s = 0; s < n; s++) f(offset + s / n * TAU, s); };

/** Hull through sections from the bow (+z) to the stern, with the style's cross-section: octagonal in
 * mathematics, round in biology. `prof` lists [t, width, height, centre] with t from 0 (bow) to 1. */
function hull(k, d, L, prof, livery) {
    const st = k.style, n = st.facets ? 8 : st.smooth ? 20 : 16, e = st.facets ? 2 : st.smooth ? 2.1 : 2.6;
    const sec = prof.map(([t, w, h, cy = 0]) => section(L / 2 - t * L, Math.max(.05, w), Math.max(.05, h), cy, n, e));
    const accent = st.accent, dark = st.dark;
    const side = Math.round(n / 4), top = Math.round(n / 2);
    const paint = (m, s, q) => {
        const f = q / n;
        if (f > .88 || f < .12) return dark;
        if (livery === 'fascia' && (q === side || q === n - side - 1) && s > 0) return accent;
        if (livery === 'dorso' && (q === top || q === top - 1) && s > 0) return accent;
        if (livery === 'prua' && s === 1) return accent;
        if (livery === 'scacchi' && (s + q) % 4 === 0 && f > .2 && f < .8) return shade(st.hull, .72);
        return shade(st.hull, .9 + .16 * hash(s, q, L));
    };
    k.hull(); k.loft(sec, { paint });
    return sec;
}
/** Half width of a hull section at height y (largest crossing of its outline). */
function widthAt(sec, y) {
    const P = sec.pts; let w = 0;
    for (let i = 0; i < P.length; i++) { const a = P[i], b = P[(i + 1) % P.length]; if ((a[1] - y) * (b[1] - y) <= 0 && a[1] !== b[1]) w = Math.max(w, a[0] + (b[0] - a[0]) * (y - a[1]) / (b[1] - a[1])); }
    return w;
}
/** Band wrapped on the hull at z: a short loft of the hull outline, slightly enlarged. `paint` colours
 * each quad by its index around the outline. */
function band(k, sec, z, len, paint) {
    const S = sec.reduce((m, s) => Math.abs(s.z - z) < Math.abs(m.z - z) ? s : m), grow = 1.03;
    k.loft([{ z: z + len / 2, pts: S.pts.map(([x, y]) => [x * grow, y * grow]) }, { z: z - len / 2, pts: S.pts.map(([x, y]) => [x * grow, y * grow]) }], { closeFront: false, closeBack: false, paint: (m, s, q) => paint(q) });
}
/** Rows of lit windows on both sides of the hull, at height y between z0 and z1. */
function sideWindows(k, sec, y, z0, z1, n, w = .16, h = .08) {
    for (let s = 0; s < n; s++) {
        if (hash(s, y * 7, z0) < .15) continue;
        const z = z0 + (z1 - z0) * (s + .5) / n, S = sec.reduce((m, c) => Math.abs(c.z - z) < Math.abs(m.z - z) ? c : m), x = widthAt(S, y) + .015;
        for (const sx of [1, -1]) k.pane([sx * x, y, z], [sx, 0, 0], [0, 0, 1], w, h);
    }
}
/** Canopy over the hull, from z0 to z1 at height y. */
function canopy(k, z0, z1, w, y, h = .2) {
    const n = k.style.facets ? 8 : 12;
    k.glass(.35); k.loft([section(z0, w * .55, h * .7, y - h * .1, n), section((z0 * 2 + z1) / 3, w, h, y, n), section((z0 + z1 * 2) / 3, w * .9, h * .9, y + h * .1, n), section(z1, w * .5, h * .5, y + h * .15, n)]);
}
/** Engine nozzle at p pointing to −z, radius r, with its flame. */
function nozzle(k, p, r, len = r * 1.6, color = ENGINE) {
    const seg = k.style.facets ? 8 : 16;
    k.push(p, [-Math.PI / 2, 0, 0]);
    k.steel(); k.cyl(r * 1.15, r * .9, len * .55, len, seg, { caps: false }); k.paint([.2, .2, .22, 1], .5, .7); k.cyl(r, r * .8, len * .55, len, seg, { caps: false, outward: false });
    k.dark(); k.cyl(r * .9, r * .9, 0, len * .55, seg, { bands: 2 });
    k.glow(color, 3); k.cyl(r * .75, r * .75, len * .6, len * .62, seg);
    if (k.style.coils) coil(k, r * 1.2, len * .1, len * .45, 2, r * .1);
    k.pop();
    k.flame([p[0], p[1], p[2] - len * 1.1], color, r * 1.6);
}
/** Engine layout at the stern z: 1 centred, 2 side by side, 3 in a triangle, 4 in a square. */
function engines(k, n, z, spread, r, y = 0, color = ENGINE) {
    const at = n === 1 ? [[0, 0]] : n === 2 ? [[-1, 0], [1, 0]] : n === 3 ? [[-1, .5], [1, .5], [0, -.7]] : [[-1, .6], [1, .6], [-1, -.6], [1, -.6]];
    for (const [x, yy] of at) nozzle(k, [x * spread, y + yy * spread * .8, z], r, r * 1.6, color);
}
/** Flat wing on both sides at height y: planform from a list of [x, z] for the port side. */
function wingPair(k, plan, y, t = .05, tip = null) {
    for (const sx of [1, -1]) {
        const poly = sx > 0 ? plan : mirror(plan);
        k.hull(); k.extrude(poly, y - t, y + t);
        if (tip) { k.accent(.35); k.extrude(sx > 0 ? tip : mirror(tip), y - t - .01, y + t + .01); }
        const far = poly.reduce((m, p) => Math.abs(p[0]) > Math.abs(m[0]) ? p : m);
        k.light([far[0], y, far[1]], sx > 0 ? RED : GREEN, .07, .9);
    }
}
const WINGS = {
    freccia: (W, L) => [[W * .9, L * .1], [W * 2.6, -L * .2], [W * 2.7, -L * .32], [W * .95, -L * .3]],
    delta: (W, L) => [[W * .9, L * .2], [W * 2.4, -L * .33], [W * .95, -L * .36]],
    dritta: (W, L) => [[W * .9, L * .02], [W * 2.5, -L * .02], [W * 2.5, -L * .15], [W * .9, -L * .17]],
    gabbiano: (W, L) => [[W * .9, L * .08], [W * 1.8, -L * .05], [W * 2.6, -L * .25], [W * 2.4, -L * .3], [W * .95, -L * .25]]
};
/** Vertical or canted fins at the stern. */
function fins(k, n, z, h, len, y, W) {
    const cant = n === 1 ? [0] : n === 2 ? [-.4, .4] : [-.7, 0, .7];
    for (const c of cant) {
        k.push([n === 1 ? 0 : Math.sign(c) * W * .6, y, z], [0, 0, -c]);
        k.hull(); k.push([0, 0, 0], [0, 0, Math.PI / 2]); k.extrude([[0, len * .4], [h, -len * .2], [h, -len * .55], [0, -len * .6]], -.035, .035); k.pop();
        k.accent(.3); k.box([0, h * .92, -len * .4], [.04, h * .07, len * .14]);
        k.pop();
    }
}
/** Style detail on the hull: polyhedron, coils, hazard band and tank, or glass pods. */
function styleDetail(k, d, z, W, H, sec = null) {
    const st = k.style;
    if (st.facets) { k.push([0, H + .25, z]); ornament(k, Math.min(.7, W * .6), d); k.pop(); }
    else if (st.coils) {
        if (sec) { k.trim(); band(k, sec, z, .3, () => st.trim); k.accent(1.4); band(k, sec, z, .1, () => st.accent); for (const sx of [1, -1]) { k.steel(); k.beam([sx * W * .5, H * .7, z], [sx * W * 1.1, H + 1.1, z - .6], .025); k.light([sx * W * 1.1, H + 1.15, z - .6], st.accent, .05, 1.3); } }
        else { k.push([0, 0, z], [Math.PI / 2, 0, 0]); coil(k, Math.max(W, H) * 1.08, -.3, .3, 2, .05); k.pop(); }
    }
    else if (st.pipes) { if (sec) { k.paint(st.trim, .3, .5); band(k, sec, z, .35, q => q % 2 ? st.trim : [.08, .08, .08, 1]); } else { k.push([0, 0, z], [Math.PI / 2, 0, 0]); hazardBand(k, Math.max(W, H) * 1.02, -.15, .15, 16); k.pop(); } }
    else if (st.smooth) { for (const sx of [1, -1]) { k.glass(.4); k.sphere([sx * W * 1.05, 0, z], Math.min(W, H) * .45, 14, 10); } }
}

/** Shuttle: short hull, canopy, wings, one or two engines in the tail or in nacelles, fins. */
function navetta(d, st) {
    const k = new Kit(st), L = d.range(4.4, 6), W = d.range(.75, 1), H = W * d.range(.6, .75), wing = d.cycle('ali', ['freccia', 'delta', 'dritta', 'gabbiano']), eng = d.choose('motori', ['coda', 'gondole']), nEng = d.count('ugelli', 1, 2), nFin = d.count('derive', 1, 3), liv = d.choose('livrea', ['fascia', 'dorso', 'prua']);
    const sec = hull(k, d, L, [[0, .12, .1], [.08, W * .5, H * .55], [.25, W * .85, H * .9], [.5, W, H], [.75, W * .95, H * .95], [.92, W * .8, H * .8], [1, W * .62, H * .6]], liv);
    canopy(k, L * .42, L * .1, W * .55, H * .55, H * .32);
    wingPair(k, WINGS[wing](W, L), -H * .35, .05, null);
    if (eng === 'coda') engines(k, nEng, -L / 2, W * .45, W * (nEng === 1 ? .45 : .32));
    else for (const sx of [1, -1]) { k.push([sx * W * 1.7, -H * .35, -L * .12], [Math.PI / 2, 0, 0]); k.dark(); k.capsule(W * .28, -L * .25, L * .2, 12); k.pop(); nozzle(k, [sx * W * 1.7, -H * .35, -L * .37], W * .25); }
    fins(k, nFin, -L * .38, H * 1.1, L * .3, H * .7, W);
    styleDetail(k, d, -L * .1, W, H, sec);
    k.light([0, H + .05, -L * .05], WHITE, .07, 1.1); k.light([0, -H, L * .2], WHITE, .06, 1.6);
    return assemble([[k]]);
}

/** Courier: long narrow hull with a needle bow, a large main engine and boosters, canards. */
function corriere(d, st) {
    const k = new Kit(st), L = d.range(6.5, 8.5), W = d.range(.55, .75), H = W * d.range(.75, .95), boosters = d.cycle('propulsori', [0, 2, 3, 4]), canards = d.flag('alette di prua', .5), fin = d.choose('derive', ['dorsale', 'ventrale', 'doppia']), liv = d.choose('livrea', ['fascia', 'dorso', 'scacchi']);
    const sec = hull(k, d, L, [[0, .05, .05], [.12, W * .35, H * .35], [.3, W * .75, H * .75], [.55, W, H], [.8, W * 1.05, H * 1.05], [1, W * .9, H * .9]], liv);
    canopy(k, L * .25, L * .05, W * .5, H * .55, H * .3);
    nozzle(k, [0, 0, -L / 2], W * .8, W * 1.6, st.coils ? ENGINE : HOT);
    around(boosters, a => { const p = [Math.cos(a) * W * 1.25, Math.sin(a) * W * 1.25, -L * .32]; k.push(p, [Math.PI / 2, 0, 0]); k.dark(); k.capsule(W * .22, -L * .12, L * .12, 10); k.pop(); nozzle(k, [p[0], p[1], -L * .44], W * .2); k.steel(); k.beam([p[0] * .5, p[1] * .5, -L * .32], p, .04); }, Math.PI / 2);
    if (canards) wingPair(k, [[W * .7, L * .22], [W * 1.6, L * .14], [W * 1.6, L * .1], [W * .7, L * .1]], 0, .03);
    wingPair(k, [[W * .9, -L * .18], [W * 1.9, -L * .4], [W * 1.9, -L * .45], [W * .9, -L * .42]], 0, .03);
    if (fin !== 'ventrale') fins(k, 1, -L * .3, H * 1.4, L * .3, H * .8, W);
    if (fin !== 'dorsale') { k.push([0, -H * .8, -L * .3], [0, 0, Math.PI]); fins(k, 1, 0, H * 1.0, L * .25, 0, W); k.pop(); }
    styleDetail(k, d, L * .05, W, H, sec);
    k.light([0, H + .05, 0], WHITE, .06, 1.4);
    return assemble([[k]]);
}

/** Bridge module at the bow: short lofted block with a window band. */
function bridge(k, d, z, W, H, liv, raised = false) {
    if (raised) { k.steel(); k.box([0, H * .9, z - .4], [W * .3, H * .9, .5], .4); }
    k.push([0, raised ? H * 1.6 : 0, z]);
    const sec = hull(k, d, 3.2, [[0, W * .3, H * .3], [.15, W * .75, H * .65], [.4, W, H * .9], [.8, W, H], [1, W * .8, H * .8]], liv);
    k.paint(k.style.glass, .9, .08, .3); k.loft([section(1.3, W * .55, H * .18, H * .55, 12), section(.8, W * .8, H * .25, H * .7, 12), section(.2, W * .7, H * .2, H * .82, 12)]);
    sideWindows(k, sec, H * .1, .9, -1.4, 7); sideWindows(k, sec, -H * .25, .9, -1.4, 7);
    k.push([0, H, -.6]); mast(k, .9, 1, 1.3); k.pop();
    k.pop();
}

/** Freighter: bridge, spine and rows of containers, engine block. */
function cargo(d, st) {
    const k = new Kit(st), raised = d.choose('ponte', ['basso', 'alto']) === 'alto', rows = d.count('file', 3, 6), grid = d.cycle('container per fila', [2, 4, 6]), nEng = d.count('ugelli', 2, 4), liv = d.choose('livrea', ['fascia', 'prua', 'dorso']), stack = d.flag('container alti', .4);
    const cw = .75, ch = stack ? 1.05 : .75, cz = .95, pitch = 2.1, Lc = rows * pitch, z0 = Lc / 2;
    bridge(k, d, z0 + 1.6, 1.3, .9, liv, raised);
    k.steel(); k.truss([0, 0, z0 + .2], [0, 0, -z0 - .4], .35, 1.1, .05);
    const COL = [[.75, .38, .16, 1], [.16, .45, .52, 1], [.62, .62, .58, 1], st.accent, [.45, .24, .16, 1], [.26, .32, .4, 1], [.6, .52, .2, 1]];
    const cells = grid === 2 ? [[-1, 0], [1, 0]] : grid === 4 ? [[-1, 1], [1, 1], [-1, -1], [1, -1]] : [[-1, 1], [1, 1], [-1, -1], [1, -1], [0, 1.95], [0, -1.95]];
    for (let s = 0; s < rows; s++) for (const [x, y] of cells) {
        if (hash(s, x + 3, y + rows) < .08) continue;
        const z = z0 - pitch / 2 - s * pitch, c = COL[Math.floor(hash(s, x, y + grid) * COL.length)], px = x * (cw + .1), py = y * (ch + .1) * (grid === 2 ? 0 : 1);
        k.paint(c, .35, .55); k.box([px, py, z], [cw, ch, cz], .95);
        k.dark(); for (const dz of [-cz - .02, cz + .02]) k.box([px, py, z + dz], [cw * .96, ch * .96, .02]);
        k.trim(); k.box([px + Math.sign(x || 1) * (cw + .01), py, z], [.01, .12, cz * .9]);
    }
    k.hull(); k.box([0, 0, -z0 - 1.2], [1.6, 1.3, .95], .55); k.accent(.4); k.box([0, 1.32, -z0 - 1.2], [1.35, .03, .55]);
    engines(k, nEng, -z0 - 2.15, .8, .45, 0, HOT);
    for (const sx of [1, -1]) { k.steel(); k.box([sx * 2.0, 0, -z0 - 1.0], [.45, .05, 1.2], .45); k.light([sx * 2.45, 0, -z0 - 1.0], sx > 0 ? RED : GREEN, .1, .8); }
    styleDetail(k, d, -z0 - 1.2, 1.6, 1.3);
    return assemble([[k]]);
}

/** Tanker: bridge, spine with spherical or cylindrical tanks, engine block. */
function cisterna(d, st) {
    const k = new Kit(st), raised = d.choose('ponte', ['basso', 'alto']) === 'alto', shape = d.cycle('serbatoi', ['sfere', 'cilindri', 'coppie']), n = d.count('serbatoi', 2, 5), nEng = d.count('ugelli', 2, 3), liv = d.choose('livrea', ['fascia', 'prua', 'dorso']), r = d.range(1.0, 1.35);
    const pitch = shape === 'cilindri' ? r * 2.6 : r * 2.2, Lt = n * pitch, z0 = Lt / 2;
    bridge(k, d, z0 + 1.6, 1.2, .85, liv, raised);
    k.push([0, 0, 0], [Math.PI / 2, 0, 0]); k.steel(); k.cyl(.35, .35, -z0 - .6, z0 + .2, 12, { bands: n * 2 }); k.pop();
    for (let s = 0; s < n; s++) {
        const z = z0 - pitch / 2 - s * pitch, tint = s % 2 ? null : shade(st.trim, .9);
        if (shape === 'sfere') tank(k, [0, 0, z], r, tint);
        else if (shape === 'coppie') { for (const sx of [1, -1]) tank(k, [sx * r * .95, 0, z], r * .8, tint); }
        else { k.push([0, 0, z], [Math.PI / 2, 0, 0]); capsuleTank(k, r * .85, -pitch * .5 + r * .85, pitch * .5 - r * .85, tint); k.pop(); }
        if (st.pipes || st.civil) pipe(k, [[0, r * .9, z + pitch * .3], [0, r * 1.1, z], [0, r * .9, z - pitch * .3]], .06);
    }
    k.hull(); k.box([0, 0, -z0 - 1.0], [1.3, 1.1, .8], .5); k.accent(.4); k.box([0, 1.12, -z0 - 1.0], [1.1, .03, .4]);
    engines(k, nEng, -z0 - 1.8, .7, .45, 0, HOT);
    for (const sx of [1, -1]) k.light([sx * 1.35, 0, -z0 - 1.0], sx > 0 ? RED : GREEN, .1, .8);
    styleDetail(k, d, z0 + .2, 1.2, .85);
    return assemble([[k]]);
}

/** Mining tug: stubby wide hull, claws at the bow, an ore bin behind the cockpit, large engines, floodlights. */
function rimorchiatore(d, st) {
    const k = new Kit(st), L = d.range(4, 5), W = d.range(1.2, 1.5), H = W * d.range(.65, .8), claws = d.count('pinze', 2, 3), bin = d.cycle('cassone', ['aperto', 'chiuso', 'nessuno']), nEng = d.count('ugelli', 2, 4), liv = d.choose('livrea', ['fascia', 'prua', 'scacchi']);
    const sec = hull(k, d, L, [[0, W * .7, H * .6], [.15, W * .95, H * .9], [.5, W, H], [.85, W * .95, H * .95], [1, W * .8, H * .8]], liv);
    canopy(k, L * .45, L * .2, W * .45, H * .7, H * .3);
    k.paint(st.trim, .5, .5); k.box([0, -H * .3, L / 2 + .1], [W * .8, H * .35, .12], .3);
    const at = claws === 2 ? [[-1, 0], [1, 0]] : [[-1, .4], [1, .4], [0, -.8]];
    for (const [x, y] of at) {
        const base = [x * W * .6, y * H * .7, L / 2], elbow = [x * W * .95, y * H, L / 2 + 1.1], tip = [x * W * .45, y * H * .5, L / 2 + 2.0];
        k.steel(); k.beam(base, elbow, .1); k.trim(); k.beam(elbow, tip, .08); k.dark(); k.sphere(elbow, .16, 8, 6);
        k.trim(); k.beam(tip, [tip[0] - x * .3, tip[1] + .25, tip[2] - .3], .05); k.beam(tip, [tip[0] - x * .3, tip[1] - .25, tip[2] - .3], .05);
    }
    if (bin !== 'nessuno') { k.paint(shade(st.trim, .8), .5, .6); k.box([0, H + .55, -L * .15], [W * .85, .55, L * .28], .5); if (bin === 'aperto') { k.paint([.25, .22, .2, 1], .05, .95); k.box([0, H + 1.0, -L * .15], [W * .75, .15, L * .24]); } }
    engines(k, nEng, -L / 2, W * .55, W * .3, 0, HOT);
    for (const sx of [1, -1]) { k.light([sx * W * .9, H * .6, L / 2], WHITE, .18, 0); k.light([sx * W * 1.02, 0, 0], sx > 0 ? RED : GREEN, .09, .8); }
    k.light([0, H + 1.2, 0], AMBER, .1, 2);
    styleDetail(k, d, -L * .35, W, H, sec);
    return assemble([[k]]);
}

/** Science ship: medium hull, radial sensor booms with pods, a dish, an optional instrument ring. */
function scientifica(d, st) {
    const k = new Kit(st), ring = new Kit(st), kits = [[k]], L = d.range(6, 7.5), W = d.range(.8, 1.0), H = W * .75, booms = d.count('bracci', 2, 4), dish = d.cycle('antenna', ['grande', 'piccola', 'doppia']), withRing = d.flag('anello strumenti', .5), nEng = d.count('ugelli', 1, 3), liv = d.choose('livrea', ['fascia', 'dorso']);
    const sec = hull(k, d, L, [[0, .1, .08], [.1, W * .6, H * .55], [.3, W * .9, H * .9], [.6, W, H], [.85, W * 1.1, H * 1.05], [1, W * .9, H * .9]], liv);
    canopy(k, L * .38, L * .12, W * .5, H * .6, H * .28);
    around(booms, (a, s) => {
        const dir = [Math.cos(a), Math.sin(a)], len = d.range(2.2, 3.2), end = [dir[0] * (W + len), dir[1] * (H + len * .6), -L * .05];
        k.steel(); k.beam([dir[0] * W * .8, dir[1] * H * .8, -L * .05], end, .05);
        k.push(end, [Math.PI / 2, 0, 0]); k.hull(); k.capsule(.22, -.5, .5, 10); k.trim(); k.cyl(.24, .24, -.15, .15, 10, { caps: false }); k.pop();
        k.light([end[0], end[1] + .3, end[2]], s % 2 ? RED : GREEN, .07, .9 + s * .2);
    }, Math.PI / 4);
    const dishes = dish === 'doppia' ? [[-.6, L * .2], [.6, L * .2]] : [[0, L * .15]], R = dish === 'grande' ? 1.4 : .8;
    for (const [x, z] of dishes) { k.push([x, H, z], [-.6, 0, 0]); smallDish(k, R, R * .3); k.pop(); }
    if (withRing) {
        ring.push([0, 0, -L * .25], [Math.PI / 2, 0, 0]); ring.hull(); ring.torus(W + 1.2, .22, 40, 8); ring.accent(.5); ring.torus(W + 1.2, .24, 40, 3);
        around(3, a => { ring.push([0, 0, 0], [0, a, 0]); ring.steel(); ring.push([0, 0, 0], [0, 0, -Math.PI / 2]); ring.cyl(.06, .06, W * .9, W + 1, 6, { caps: false }); ring.pop(); ring.pop(); });
        ring.pop(); kits.push([ring, [0, 0, .25]]);
    }
    engines(k, nEng, -L / 2, W * .45, W * .3);
    k.push([0, H, -L * .3]); mast(k, 1.1, 2, 1.2); k.pop();
    styleDetail(k, d, -L * .38, W, H, sec);
    return assemble(kits);
}

/** Exploration ship: slender hull, instrument wings with pods, a sensor dish, an optional slow ring. */
function esploratrice(d, st) {
    const k = new Kit(st), ring = new Kit(st), kits = [[k]], L = d.range(8.5, 10.5), W = d.range(.75, .95), H = W * .72, bow = d.choose('prua', ['ago', 'tozza']), pods = d.count('moduli', 0, 2), wing = d.cycle('ali', ['freccia', 'dritta', 'nessuna']), withRing = d.flag('anello', .6), nEng = d.count('ugelli', 2, 4), liv = d.choose('livrea', ['fascia', 'dorso', 'prua']);
    const sec = hull(k, d, L, bow === 'ago' ? [[0, .1, .08], [.06, W * .5, H * .45], [.18, W * .85, H * .85], [.45, W * .9, H * .9], [.72, W * .85, H * .85], [.88, W * 1.2, H * 1.2], [1, W * 1.05, H * 1.05]] : [[0, W * .55, H * .5], [.05, W * .9, H * .85], [.2, W * 1.05, H * 1.0], [.45, W * .8, H * .8], [.72, W * .85, H * .85], [.88, W * 1.2, H * 1.2], [1, W * 1.05, H * 1.05]], liv);
    for (let p = 0; p < pods; p++) { const z = -L * (.02 + p * .16); for (const sx of [1, -1]) { k.push([sx * (W + .35), -H * .2, z], [Math.PI / 2, 0, 0]); k.hull(); k.capsule(.32, -.6, .6, 12, 2); k.trim(); k.cyl(.34, .34, -.1, .1, 12, { caps: false }); k.pop(); k.steel(); k.beam([sx * W * .8, -H * .2, z], [sx * (W + .1), -H * .2, z], .08); } }
    canopy(k, L * .43, L * .28, W * .5, H * .55, H * .26);
    sideWindows(k, sec, H * .15, L * .25, -L * .1, 9, .14, .07);
    k.push([0, -H * .9, L * .3], [Math.PI * .72, 0, 0]); k.steel(); k.cyl(.1, .1, 0, .45, 8); k.push([0, .5, 0]); k.paint([.9, .9, .92, 1], .3, .35); k.dish(.85, .28, 24, 5); k.pop(); k.pop();
    if (wing !== 'nessuna') {
        const plan = wing === 'freccia' ? [[W * .9, -L * .1], [W * 4.2, -L * .22], [W * 4.4, -L * .28], [W * .95, -L * .3]] : [[W * .9, -L * .12], [W * 4.3, -L * .12], [W * 4.3, -L * .22], [W * .9, -L * .22]];
        wingPair(k, plan, 0, .05);
        for (const sx of [1, -1]) { const far = sx * W * 4.45, z = -L * (wing === 'freccia' ? .25 : .17); k.push([far, 0, z], [Math.PI / 2, 0, 0]); k.hull(); k.cyl(.26, .26, -1.1, 1.1, 14, { bands: 3 }); k.paint(st.trim, .9, .35); k.cyl(.28, .28, -.35, .35, 14, { caps: false }); k.accent(1.4); k.cyl(.2, .2, 1.1, 1.14, 14); k.pop(); }
    }
    if (withRing) {
        ring.push([0, 0, -L * .22], [Math.PI / 2, 0, 0]); ring.hull(); ring.torus(W + 1.1, .26, 48, 10); ring.accent(.5); ring.torus(W + 1.1, .28, 48, 3);
        around(3, a => { ring.push([0, 0, 0], [0, a, 0]); ring.steel(); ring.push([0, 0, 0], [0, 0, -Math.PI / 2]); ring.cyl(.06, .06, W * .8, W + .9, 6, { caps: false }); ring.pop(); ring.pop(); });
        ring.pop(); kits.push([ring, [0, 0, .25]]);
    }
    engines(k, nEng, -L / 2, W * .5, W * .32);
    k.push([0, H, 0]); mast(k, 1.2, 1, 1.2); k.pop();
    styleDetail(k, d, L * .1, W, H, sec);
    return assemble(kits);
}

/** Passenger liner: long smooth hull with rows of windows, an observation dome, an optional spin ring. */
function passeggeri(d, st) {
    const k = new Kit(st), ring = new Kit(st), kits = [[k]], L = d.range(9, 11.5), W = d.range(1.1, 1.4), H = W * d.range(.8, .95), nFin = d.count('derive', 0, 2), decks = d.count('ponti', 3, 5), dome = d.cycle('cupola', ['prua', 'dorso', 'nessuna']), withRing = d.flag('anello', .4), nEng = d.count('ugelli', 2, 4), liv = d.choose('livrea', ['fascia', 'dorso']);
    const sec = hull(k, d, L, [[0, W * .2, H * .2], [.08, W * .7, H * .7], [.22, W * .95, H * .95], [.5, W, H], [.78, W * .98, H * .98], [.93, W * .85, H * .85], [1, W * .7, H * .7]], liv);
    for (let r = 0; r < decks; r++) sideWindows(k, sec, H * (-.5 + .9 * (r + .5) / decks), L * .36, -L * .36, Math.round(L * 2.2), .2, .09);
    if (dome === 'prua') { k.glass(.6); k.sphere([0, H * .3, L * .3], W * .6, 18, 8, 0, Math.PI / 2); }
    else if (dome === 'dorso') { k.glass(.6); k.push([0, H * .85, 0], [Math.PI / 2, 0, 0]); k.capsule(W * .4, -L * .15, L * .15, 14); k.pop(); }
    canopy(k, L * .48, L * .38, W * .45, H * .6, H * .25);
    if (withRing) {
        ring.push([0, 0, -L * .2], [Math.PI / 2, 0, 0]); ring.hull(); ring.torus(W + 1.6, .35, 56, 10); windowRing(ring, W + 1.95, 0, 40, .2, .1);
        around(4, a => { ring.push([0, 0, 0], [0, a, 0]); ring.steel(); ring.push([0, 0, 0], [0, 0, -Math.PI / 2]); ring.cyl(.09, .09, W * .9, W + 1.3, 6, { caps: false }); ring.pop(); ring.pop(); });
        ring.pop(); kits.push([ring, [0, 0, .2]]);
    }
    engines(k, nEng, -L / 2, W * .5, W * .3);
    if (nFin) fins(k, nFin, -L * .4, H * .9, L * .2, H * .6, W);
    for (const sx of [1, -1]) k.light([sx * W * 1.02, 0, L * .2], sx > 0 ? RED : GREEN, .09, .8);
    k.light([0, H + .05, -L * .3], WHITE, .08, 1.2);
    styleDetail(k, d, -L * .4, W, H, sec);
    return assemble(kits);
}

/** Buoy layer: hull with a cradle of navigation buoys and a crane arm at the stern. */
function posaboe(d, st) {
    const k = new Kit(st), L = d.range(5.5, 7), W = d.range(.9, 1.1), H = W * .7, buoys = d.count('boe', 4, 8), rows = d.count('file di boe', 1, 2), kind = d.cycle('boa', ['ottaedro', 'cilindro', 'icosaedro']), nEng = d.count('ugelli', 1, 2), liv = d.choose('livrea', ['fascia', 'prua', 'scacchi']);
    const sec = hull(k, d, L, [[0, W * .4, H * .4], [.12, W * .85, H * .85], [.35, W, H], [.7, W, H], [1, W * .85, H * .85]], liv);
    canopy(k, L * .45, L * .3, W * .5, H * .6, H * .28);
    const per = Math.ceil(buoys / rows);
    for (let r = 0; r < rows; r++) for (let b = 0; b < per && r * per + b < buoys; b++) {
        const x = rows === 2 ? (r ? -.55 : .55) : 0, z = L * .2 - b * .9, p = [x, H + .55, z];
        k.steel(); k.beam([x, H, z], [x, H + .3, z], .04);
        if (kind === 'cilindro') { k.paint(st.accent, .4, .5, .3); k.push(p); k.cyl(.28, .28, -.3, .3, 10); k.pop(); }
        else { k.paint(st.accent, .4, .5, .3); polyhedron(k, kind, p, .36); }
        k.light([x, H + 1.0, z], AMBER, .05, 1 + b * .17);
    }
    k.steel(); k.box([0, H + .1, L * .2 - per * .45 + .45], [rows === 2 ? 1.0 : .5, .05, per * .45 + .2], .4);
    k.push([0, H, -L * .3]); k.trim(); k.cyl(.18, .22, 0, .6, 10); k.push([0, .6, 0], [-.5, 0, 0]); k.beam([0, 0, 0], [0, 2.4, 0], .07); k.beam([0, 2.4, 0], [0, 1.6, .2], .02); k.pop(); k.pop();
    engines(k, nEng, -L / 2, W * .45, W * .32);
    for (const sx of [1, -1]) k.light([sx * W * 1.02, 0, 0], sx > 0 ? RED : GREEN, .08, .8);
    styleDetail(k, d, -L * .1, W, H, sec);
    return assemble([[k]]);
}

/** Rescue ship: hull with high-visibility bands, floodlights, a docking collar, a care module, beacons. */
function soccorso(d, st) {
    const k = new Kit(st), L = d.range(5.5, 7), W = d.range(.95, 1.15), H = W * .78, lamps = d.count('fari', 2, 4), collar = d.cycle('attracco', ['prua', 'fianco', 'ventre']), module = d.choose('modulo', ['cilindro', 'blocco']), nEng = d.count('ugelli', 2, 3);
    const sec = hull(k, d, L, [[0, W * .35, H * .35], [.1, W * .8, H * .8], [.3, W, H], [.7, W, H], [1, W * .8, H * .8]], 'fascia');
    canopy(k, L * .44, L * .26, W * .5, H * .6, H * .28);
    for (const z of [L * .15, -L * .15]) { k.paint([.9, .9, .88, 1], .3, .5); band(k, sec, z, .36, () => [.9, .9, .88, 1]); k.accent(.6); band(k, sec, z, .12, () => k.style.accent); }
    if (module === 'cilindro') { k.push([0, H + .55, -L * .1], [Math.PI / 2, 0, 0]); k.paint([.9, .9, .88, 1], .3, .5); k.capsule(.5, -L * .18, L * .18, 14); k.pop(); }
    else { k.paint([.9, .9, .88, 1], .3, .5); k.box([0, H + .5, -L * .1], [W * .7, .45, L * .2], .4); }
    k.pane([W * .71, H + .5, -L * .1], [1, 0, 0], [0, 0, 1], L * .3, .12); k.pane([-W * .71, H + .5, -L * .1], [-1, 0, 0], [0, 0, 1], L * .3, .12);
    const cAt = collar === 'prua' ? [[0, 0, L / 2 + .1], [0, 0, 0]] : collar === 'fianco' ? [[W + .05, 0, 0], [0, 0, -Math.PI / 2]] : [[0, -H - .05, 0], [Math.PI, 0, 0]];
    k.push(cAt[0], collar === 'prua' ? [Math.PI / 2, 0, 0] : cAt[1]); k.steel(); k.cyl(.45, .45, 0, .4, 16); k.trim(); k.cyl(.55, .55, .4, .5, 16); k.glow(st.window, 1.6); k.cyl(.35, .35, .5, .52, 16); k.pop();
    around(lamps, (a, s) => { const p = [Math.cos(a) * W * .9, Math.sin(a) * H * .9, L * .38]; k.dark(); k.box(p, [.12, .12, .12]); k.light([p[0], p[1], p[2] + .15], WHITE, .2, 0); }, Math.PI / 4);
    k.light([.3, H + 1.0, -L * .1], AMBER, .1, 2.2); k.light([-.3, H + 1.0, -L * .1], st.accent, .1, -1.1);
    engines(k, nEng, -L / 2, W * .45, W * .3);
    for (const sx of [1, -1]) k.light([sx * W * 1.02, 0, -L * .3], sx > 0 ? RED : GREEN, .08, .8);
    styleDetail(k, d, -L * .32, W, H, sec);
    return assemble([[k]]);
}

/** Probe ship: uncrewed bus with a dish, power booms, a magnetometer boom and small thrusters. */
function sonda(d, st) {
    const k = new Kit(st), bus = d.cycle('corpo', ['prisma', 'cubo', 'poliedro']), power = d.choose('energia', ['pannelli', 'generatori']), nPow = d.count('bracci di energia', 1, 3), dishR = { grande: 1.7, media: 1.25, piccola: .85 }[d.choose('antenna', ['grande', 'media', 'piccola'])], magnet = d.flag('magnetometro', .6);
    if (bus === 'prisma') { k.push([0, 0, 0], [Math.PI / 2, 0, 0]); k.hull(); k.cyl(.8, .8, -.7, .7, st.facets ? 6 : 8, { bands: 2 }); k.pop(); }
    else if (bus === 'cubo') { k.hull(); k.box([0, 0, 0], [.75, .75, .75], .5, 3); }
    else { k.hull(); polyhedron(k, st.facets ? 'icosaedro troncato' : 'dodecaedro', [0, 0, 0], 1.0, null, .05); }
    k.paint(st.trim, .9, .35); k.box([0, -.78, 0], [.6, .04, .6]);
    k.push([0, .8, .1], [-.2, 0, 0]); smallDish(k, dishR, dishR * .32); k.pop();
    around(nPow, (a, s) => {
        const dir = [Math.cos(a), 0, Math.sin(a)];
        if (power === 'pannelli') { k.steel(); k.beam([dir[0] * .8, 0, dir[2] * .8], [dir[0] * 1.6, 0, dir[2] * 1.6], .04); k.push([dir[0] * 3.0, 0, dir[2] * 3.0], [0, -a, 0]); solarWing(k, 2.8, 1.2, [4, 2]); k.pop(); }
        else { k.steel(); k.beam([dir[0] * .8, -.3, dir[2] * .8], [dir[0] * 2.6, -.5, dir[2] * 2.6], .04); k.push([dir[0] * 2.8, -.5, dir[2] * 2.8]); k.dark(); k.cyl(.18, .18, -.4, .4, 10); for (let f = 0; f < 6; f++) { k.push([0, 0, 0], [0, f * TAU / 6, 0]); k.box([.24, 0, 0], [.08, .38, .015]); k.pop(); } k.glow(HOT, .8); k.cyl(.12, .12, .4, .44, 10); k.pop(); }
    }, Math.PI / 2);
    if (magnet) { k.steel(); k.beam([0, 0, -.8], [0, 0, -4.2], .025); k.dark(); k.box([0, 0, -4.3], [.08, .08, .12]); k.light([0, 0, -4.45], WHITE, .05, 1.5); }
    for (const [x, y] of [[.6, .6], [-.6, .6], [.6, -.6], [-.6, -.6]]) { k.steel(); k.push([x, y, -.8], [-Math.PI / 2, 0, 0]); k.cyl(.05, .08, 0, .15, 6); k.pop(); }
    nozzle(k, [0, 0, -.8], .22, .4);
    k.light([.85, 0, 0], RED, .06, .9); k.light([-.85, 0, 0], GREEN, .06, .9);
    styleDetail(k, d, .3, .8, .8);
    return assemble([[k]]);
}

/** Crane ship: hull with one or two crane booms, a hook, a counterweight and outriggers. */
function gru(d, st) {
    const k = new Kit(st), L = d.range(6, 7.5), W = d.range(1.0, 1.25), H = W * .7, cabin = d.choose('cabina', ['torre', 'bassa']), booms = d.cycle('bracci', [1, 2]), reach = d.range(4, 5.5), outriggers = d.flag('stabilizzatori', .6), nEng = d.count('ugelli', 2, 4), liv = d.choose('livrea', ['fascia', 'scacchi', 'prua']);
    const sec = hull(k, d, L, [[0, W * .5, H * .5], [.1, W * .9, H * .9], [.3, W, H], [.75, W, H], [1, W * .9, H * .85]], liv);
    if (cabin === 'torre') { k.hull(); k.box([0, H + .7, L * .32], [W * .45, .7, .5], .35, 2); k.pane([0, H + 1.05, L * .32 + .51], [0, 0, 1], [1, 0, 0], W * .7, .25); k.light([0, H + 1.5, L * .32], WHITE, .07, 1.2); }
    else canopy(k, L * .46, L * .32, W * .5, H * .6, H * .28);
    const at = booms === 1 ? [0] : [L * .12, -L * .2];
    at.forEach((z, b) => {
        k.push([0, H, z], [0, b ? Math.PI * .8 : -.4, 0]);
        k.trim(); k.cyl(.45, .5, 0, .45, 12); k.dark(); k.box([0, .7, -.3], [.4, .3, .4], .3);
        k.push([0, .9, 0], [.55, 0, 0]); k.paint(st.trim, .6, .45); k.truss([0, 0, 0], [0, reach, 0], .16, .6, .03); k.pop();
        const tip = [0, .9 + Math.cos(.55) * reach, Math.sin(.55) * reach];
        k.steel(); k.beam(tip, [tip[0], tip[1] - 1.6, tip[2]], .015); k.trim(); k.box([tip[0], tip[1] - 1.7, tip[2]], [.14, .1, .14]);
        k.light([tip[0], tip[1] + .15, tip[2]], RED, .07, 1 + b * .5);
        k.dark(); k.box([0, .8, -.9], [.35, .3, .35], .3);
        k.pop();
    });
    if (outriggers) for (const sx of [1, -1]) { k.steel(); k.beam([sx * W * .9, -H * .4, 0], [sx * W * 2.0, -H * .9, 0], .07); k.dark(); k.box([sx * W * 2.0, -H * .95, 0], [.25, .08, .4]); k.light([sx * W * 2.0, -H * .85, .4], AMBER, .06, 1.6); }
    engines(k, nEng, -L / 2, W * .5, W * .3);
    for (const sx of [1, -1]) k.light([sx * W * 1.02, 0, L * .3], sx > 0 ? RED : GREEN, .08, .8);
    styleDetail(k, d, -L * .38, W, H, sec);
    return assemble([[k]]);
}

export const SHIPS = {
    navetta: { name: 'Navetta', build: navetta, size: 'circa 50 m', about: 'Porta gli equipaggi fra le stazioni del sistema.' },
    corriere: { name: 'Corriere', build: corriere, size: 'circa 70 m', about: 'Nave veloce per dati e passeggeri urgenti.' },
    cargo: { name: 'Nave cargo', build: cargo, size: 'circa 150 m', about: 'Trasporta in container minerale, parti, cibo e celle di energia.' },
    cisterna: { name: 'Cisterna', build: cisterna, size: 'circa 140 m', about: 'Trasporta carburante dalle raffinerie ai depositi e ai porti.' },
    rimorchiatore: { name: 'Rimorchiatore minerario', build: rimorchiatore, size: 'circa 45 m', about: 'Porta il minerale dalla miniera al cantiere.' },
    scientifica: { name: 'Nave scientifica', build: scientifica, size: 'circa 80 m', about: 'Osserva i pianeti del sistema e porta i dati alla porta.' },
    esploratrice: { name: 'Nave da esplorazione', build: esploratrice, size: 'circa 100 m', about: 'Esplora i pianeti del sistema e ne riporta i dati.' },
    passeggeri: { name: 'Nave passeggeri', build: passeggeri, size: 'circa 120 m', about: 'Collega porto, porta e stazioni con decine di passeggeri.' },
    posaboe: { name: 'Posaboe', build: posaboe, size: 'circa 60 m', about: 'Mantiene le boe di segnalazione attorno alla porta.' },
    soccorso: { name: 'Nave di soccorso', build: soccorso, size: 'circa 60 m', about: 'Pattuglia le stazioni e porta celle di energia e cibo dove servono.' },
    sonda: { name: 'Sonda', build: sonda, size: 'circa 15 m', about: 'Sonda senza equipaggio che raccoglie dati sui pianeti.' },
    gru: { name: 'Nave gru', build: gru, size: 'circa 70 m', about: 'Lavora al cantiere e sposta parti di nave fra cantiere e porto.' }
};
