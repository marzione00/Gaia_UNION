/** The twelve station archetypes. Each builder takes a dice (src/craft/kit.js) and a style
 * (src/craft/styles.js) and draws the structure from seeded choices: number and size of the modules,
 * their layout, the docking arms, the power systems. The choices are written down as the recipe of the
 * model, so the catalogue can check that no two models repeat the same structure. */
import { Kit, TAU, hash, section, assemble, WHITE, RED, GREEN, add, scale } from './kit.js';
import { solarWing, radiator, hangar, mast, smallDish, tank, capsuleTank, hazardBand, coil, pipe, tube, torusKnot, polyhedron, polyFrame, solid, SOLID_NAMES, windowRing, ornament, shade } from './parts.js';

const around = (n, f, offset = 0) => { for (let s = 0; s < n; s++) f(offset + s / n * TAU, s); };
const ROCK = [.17, .155, .14, 1], FROST = [.88, .9, .93, 1], FOIL = [.78, .6, .3, 1], SILVER = [.8, .82, .86, 1], FLARE = [1, .58, .2, 1], ENGINE = [.6, .8, 1, 1];

/** Style hub: hexagonal prism in mathematics, coiled drum in physics, drum with pipes in chemistry, rounded
 * pod in biology. Height 2h, radius r, centred at the origin along y. */
function hub(k, d, r, h) {
    const st = k.style, seg = st.seg(20);
    k.hull(); k.cyl(r, r, -h, h, seg, { bands: Math.max(2, Math.round(h * 2)) });
    k.dark(); k.cyl(r * 1.08, r * 1.08, -.18, .18, seg);
    windowRing(k, r, h * .55, Math.round(r * 8), .14, .08, seg); windowRing(k, r, -h * .55, Math.round(r * 8), .14, .08, seg);
    k.accent(.4); k.cyl(r * 1.02, r * 1.02, h * .82, h * .92, seg, { caps: false });
    if (st.smooth) { k.hull(); k.sphere([0, h, 0], r, seg, 6, 0, Math.PI / 2); k.sphere([0, -h, 0], r, seg, 6, Math.PI / 2, Math.PI); }
    if (st.coils) coil(k, r * 1.12, -h * .7, -h * .25, 2, .06);
    if (st.pipes) { around(4, a => pipe(k, [[Math.cos(a) * r * 1.1, -h, Math.sin(a) * r * 1.1], [Math.cos(a) * r * 1.1, h, Math.sin(a) * r * 1.1]], .07), .4); hazardBand(k, r * 1.03, -h * .95, -h * .7, seg); }
}
/** Pair of solar wings or radiators on a boom along z, at the current origin. */
function wings(k, kind, span, width, gap) {
    for (const side of [1, -1]) {
        k.steel(); k.beam([0, 0, side * gap], [0, 0, side * (gap + 1.2)], .07);
        k.push([0, 0, side * (gap + 1.2 + span / 2)], [0, Math.PI / 2, 0]);
        if (kind === 'radiatori') radiator(k, span, width, Math.round(span / .7), k.style.coils ? 1 : .6); else solarWing(k, span, width, [Math.round(span / .75), 3]);
        k.pop();
    }
}
/** Small docking port facing +x with a lit collar and beacons. */
function dockPort(k, beacons = 3) {
    k.push([0, 0, 0], [0, 0, -Math.PI / 2]);
    k.hull(); k.cyl(.55, .55, 0, .7, 16, { bands: 1 }); k.trim(); k.cyl(.68, .68, .7, .86, 16);
    k.glow(k.style.window, 1.8); k.cyl(.4, .4, .86, .88, 16);
    k.pop();
    for (let b = 1; b <= beacons; b++) k.light([.9 + b * .5, .55, 0], b === beacons ? WHITE : GREEN, .05, -b * .2);
}
/** Spinning habitat ring of radius R and tube r around y at height y, with spokes to a hub of radius h. */
function habitatRing(st, R, r, spokes, h, y = 0) {
    const ring = new Kit(st), seg = st.seg(72), sides = st.smooth ? 14 : st.facets ? 6 : 12;
    ring.push([0, y, 0]);
    ring.hull(); ring.torus(R, r, seg, sides);
    ring.dark(); ring.torus(R, r * 1.06, seg, 4);
    for (let s = 0; s < seg; s += Math.max(1, Math.round(seg / 24))) { ring.push([0, 0, 0], [0, -s / seg * TAU - .012, 0]); ring.paint(s % 3 ? st.dark : st.steel, .65, .45); ring.torus(R, r * 1.1, 2, 8, .024); ring.pop(); }
    ring.accent(.45); ring.push([0, r * .93, 0]); ring.torus(R, .07, seg, 5); ring.pop();
    around(spokes, a => { ring.push([0, 0, 0], [0, a, 0]); ring.steel(); ring.push([0, 0, 0], [0, 0, -Math.PI / 2]); ring.cyl(.2, .2, h, R - r * .8, 10, { caps: false }); ring.pop(); ring.pop(); });
    ring.steel(); ring.cyl(h + .1, h + .1, -.35, .35, st.seg(28));
    const n = Math.round(R * 11);
    for (let s = 0; s < n; s++) {
        if (hash(s, R) < .22) continue;
        const a = s / n * TAU, c = Math.cos(a), q = Math.sin(a), t = [-q, 0, c];
        ring.pane([c * (R + r), 0, q * (R + r)], [c, 0, q], t, .2, .12);
        for (const sy of [1, -1]) ring.pane([c * R, sy * r, q * R], [0, sy, 0], t, .2, .12);
    }
    around(4, (a, s) => ring.light([Math.cos(a) * R, r + .12, Math.sin(a) * R], s % 2 ? RED : WHITE, .1, 1.2 + s * .3), TAU / 8);
    ring.pop();
    return ring;
}

/** Orbital port: spindle of stacked sections, habitat rings or disc, docking arms, wings. */
function porto(d, st) {
    const k = new Kit(st), kits = [[k]], seg = st.seg(28);
    const n = d.count('sezioni', 3, 6), total = d.range(7.5, 9.5), lens = Array.from({ length: n }, () => d.range(.6, 1.8)), sum = lens.reduce((a, b) => a + b, 0), segs = [];
    let y = -total / 2;
    for (const L of lens) { const h = L / sum * total; segs.push([y, y + h, d.range(.8, 1.55)]); y += h; }
    segs.forEach(([a, b, r], i) => { if (i % 2) k.dark(); else k.hull(); k.cyl(r, r, a, b, seg, { bands: Math.max(1, Math.round((b - a) / .5)) }); if (r > 1.05 && b - a > .7) windowRing(k, r, (a + b) / 2, Math.round(r * 10), .14, .08, seg); });
    for (let i = 0; i + 1 < n; i++) { const r = Math.min(segs[i][2], segs[i + 1][2]) * 1.06; k.steel(); k.cyl(r, r, segs[i][1] - .08, segs[i][1] + .08, seg, { caps: false }); }
    const big = segs.reduce((m, s) => s[2] > m[2] ? s : m); k.accent(.35); k.cyl(big[2] * 1.02, big[2] * 1.02, big[0] + .1, big[0] + .25, seg, { caps: false });
    const top = segs[n - 1][1], rTop = segs[n - 1][2], bot = segs[0][0], rBot = segs[0][2], rMax = big[2];
    const crown = d.choose('cima', ['cupola', 'antenna', 'parabola', 'ornamento']);
    if (crown === 'cupola') { k.hull(); k.sphere([0, top, 0], rTop, seg, 8, 0, Math.PI / 2); k.glass(1.2); k.cyl(rTop, rTop * .92, top + .05, top + .25, seg, { caps: false }); k.push([0, top + rTop * .95, 0]); mast(k, d.range(1.5, 2.8), 2, 1); k.pop(); }
    else if (crown === 'antenna') { k.dark(); k.cyl(rTop * .7, rTop * .4, top, top + .8, seg); k.push([0, top + .8, 0]); mast(k, d.range(2.6, 3.8), 3, 1); k.pop(); k.push([0, top + 1.8, 0], [0, 0, -.9]); smallDish(k, .7, .2); k.pop(); }
    else if (crown === 'parabola') { k.steel(); k.cyl(.35, .45, top, top + .9, 12); k.push([0, top + 1.3, 0], [d.range(-.5, .5), 0, d.range(-.4, .4)]); smallDish(k, d.range(1.4, 2.1), .45); k.pop(); k.light([0, top + .95, rTop * .4], WHITE, .1, 1); }
    else { k.steel(); k.cyl(.25, .25, top, top + 1.2, 10); k.push([0, top + 2.1, 0]); ornament(k, 1.8, d); k.pop(); k.light([0, top + 3.2, 0], WHITE, .14, 1); }
    const base = d.choose('base', ['reattore', 'motore', 'serbatoi']);
    if (base === 'reattore') {
        k.dark(); k.cyl(rBot * .9, rBot * .6, bot - 1.2, bot, seg); k.glow(FLARE, 1.8); k.cyl(rBot * .45, rBot * .45, bot - 1.35, bot - 1.2, seg);
        around(d.count('alette', 3, 6), a => { k.push([0, bot - .6, 0], [0, a, 0]); k.steel(); k.box([0, 0, rBot * .7 + .7], [.04, .55, .7], .4); k.glow([1, .45, .2, 1], 1.1); k.box([0, -.5, rBot * .7 + .2], [.05, .05, .2]); k.pop(); });
    } else if (base === 'motore') {
        const e = d.count('ugelli', 1, 4);
        around(e, a => { const x = e > 1 ? Math.cos(a) * rBot * .55 : 0, z = e > 1 ? Math.sin(a) * rBot * .55 : 0, s = e > 1 ? .7 : 1.2; k.push([x, bot, z]); k.steel(); k.cyl(.7 * s, .35 * s, -1.2 * s, 0, 18, { caps: false }); k.dark(); k.cyl(.64 * s, .3 * s, -1.2 * s, 0, 18, { caps: false, outward: false }); k.glow(ENGINE, 3); k.cyl(.3 * s, .3 * s, -.15 * s, -.1 * s, 18); k.pop(); k.flame([x, bot - 1.4 * s, z], ENGINE, .9 * s); });
    } else {
        k.dark(); k.cyl(rBot * .5, rBot * .7, bot - 1, bot, seg);
        around(d.count('serbatoi', 3, 6), a => { const c = [Math.cos(a) * (rBot + .7), bot - .3, Math.sin(a) * (rBot + .7)]; tank(k, c, .75); k.steel(); k.beam([c[0] * .4, bot - .3, c[2] * .4], c, .06); });
    }
    const hab = d.cycle('abitato', ['anello', 'due anelli', 'disco', 'nessuno']);
    const mid = segs[Math.floor(n / 2)], yMid = (mid[0] + mid[1]) / 2;
    if (hab === 'anello') kits.push([habitatRing(st, d.range(4.8, 6.4), d.range(.5, .7), d.choose('raggi', [3, 4, 6]), mid[2], yMid), [0, .12, 0]]);
    else if (hab === 'due anelli') { const sp = d.choose('raggi', [3, 4]); kits.push([habitatRing(st, d.range(4, 4.8), .45, sp, segs[n - 1][2], (segs[n - 1][0] + segs[n - 1][1]) / 2), [0, .14, 0]]); kits.push([habitatRing(st, d.range(5, 5.8), .5, sp, segs[0][2], (segs[0][0] + segs[0][1]) / 2), [0, -.1, 0]]); }
    else if (hab === 'disco') {
        const disc = new Kit(st), R = d.range(3.4, 4.6), hh = d.range(.35, .55);
        disc.push([0, yMid, 0]); disc.hull(); disc.cyl(R, R, -hh, hh, st.seg(40), { bands: 2 }); disc.dark(); disc.cyl(R * 1.03, R * 1.03, -.08, .08, st.seg(40));
        disc.cyl(R, R * .7, hh, hh + .25, st.seg(40), { caps: false }); disc.cyl(R * .7, R, -hh - .25, -hh, st.seg(40), { caps: false });
        windowRing(disc, R, hh * .5, Math.round(R * 12)); windowRing(disc, R, -hh * .5, Math.round(R * 12));
        around(6, (a, s) => disc.light([Math.cos(a) * R, hh + .1, Math.sin(a) * R], s % 2 ? RED : WHITE, .09, 1 + s * .2));
        disc.pop(); kits.push([disc, [0, .06, 0]]);
    }
    const arms = d.choose('bracci', hab === 'nessuno' ? [3, 4, 6] : [2, 3, 4]), end = d.choose('attracco', ['hangar', 'anello', 'modulo']), off = d.range(0, TAU);
    const armAt = hab === 'due anelli' || hab === 'nessuno' ? Math.floor(n / 2) : n - 1, armSec = segs[armAt], armY = (armSec[0] + armSec[1]) / 2, r0 = armSec[2];
    const used = new Set([armAt, ...(hab === 'due anelli' ? [0, n - 1] : hab === 'nessuno' ? [] : [Math.floor(n / 2)])]), free = segs.map((_, i) => i).filter(i => !used.has(i));
    const armLen = d.range(4.6, 6.4);
    around(arms, (a, s) => {
        k.push([0, armY, 0], [0, a, 0]);
        if (st.smooth) { k.hull(); k.push([0, 0, 0], [0, 0, -Math.PI / 2]); k.cyl(.3, .3, r0 * .9, armLen, 14, { bands: 3, caps: false }); k.pop(); }
        else if (st.facets) { k.hull(); k.push([0, 0, 0], [0, 0, -Math.PI / 2]); k.cyl(.34, .34, r0 * .9, armLen, 6, { bands: 3, caps: false }); k.pop(); k.push([(r0 + armLen) / 2, .9, 0]); ornament(k, .9, d); k.pop(); k.steel(); k.beam([(r0 + armLen) / 2, .3, 0], [(r0 + armLen) / 2, .55, 0], .05); }
        else { k.steel(); k.truss([r0 * .9, 0, 0], [armLen, 0, 0], .32, .9, .045); k.hull(); k.box([(r0 + armLen) / 2, 0, 0], [.4, .45, .45], .3, 4); }
        if (end === 'hangar') { k.push([armLen + 1.0, 0, 0]); hangar(k, .85, 2.0, 4, st.facets ? 6 : st.smooth ? 12 : 8); k.pop(); }
        else if (end === 'anello') { k.push([armLen, 0, 0], [0, 0, -Math.PI / 2]); k.hull(); k.cyl(.6, .6, 0, .6, 16, { bands: 1 }); k.push([0, .9, 0]); k.trim(); k.torus(.95, .2, 24, 8); k.accent(.8); k.torus(.95, .23, 24, 3); k.pop(); k.pop(); around(4, b => k.light([armLen + .9, Math.cos(b) * 1.2, Math.sin(b) * 1.2], GREEN, .06, -b * .3)); }
        else { k.hull(); k.box([armLen + .9, 0, 0], [.9, .6, .6], .35, 4); k.windows([armLen + .2, .2, .61], 6, .28); dockPort(k.push([armLen + 1.8, 0, 0]), 3); k.pop(); }
        k.light([armLen + .4, .8, 0], s === 0 ? GREEN : s === Math.floor(arms / 2) ? RED : WHITE, .11, .8 + s * .1);
        k.pop();
    }, off);
    const wing = d.choose('ali', ['solari', 'radiatori', 'nessuna']), pairs = wing === 'nessuna' ? 0 : d.count('coppie di ali', 1, 2);
    for (let p = 0; p < Math.min(pairs, free.length); p++) { const s = segs[free[p]], wy = (s[0] + s[1]) / 2; k.push([0, wy, 0], [0, off + Math.PI / arms + p * Math.PI / 2, 0]); wings(k, wing, d.range(5, 7), wing === 'radiatori' ? 1.8 : 2.4, s[2]); k.pop(); }
    if (st.coils) { const s = segs[d.int(0, n - 1)]; coil(k, s[2] * 1.15, s[0] + .1, s[1] - .1, Math.max(2, Math.round((s[1] - s[0]) / .35)), .06); }
    if (st.pipes) { around(d.count('tubi', 2, 4), a => pipe(k, [[Math.cos(a) * (rMax + .15), bot + .3, Math.sin(a) * (rMax + .15)], [Math.cos(a) * (rMax + .15), top - .3, Math.sin(a) * (rMax + .15)]], .08), off + .3); hazardBand(k, rBot * 1.02, bot + .1, bot + .4, seg); }
    if (st.smooth) { const s = segs[d.int(0, n - 1)], ys = (s[0] + s[1]) / 2; around(d.count('baccelli', 3, 6), a => { k.push([0, ys, 0], [0, a, 0]); k.steel(); k.beam([s[2], 0, 0], [s[2] + .8, 0, 0], .06); k.glass(.45); k.sphere([s[2] + 1.4, 0, 0], .65, 16, 10); k.hull(); k.push([s[2] + 1.4, 0, 0]); k.cyl(.67, .67, -.06, .06, 16, { caps: false }); k.pop(); k.pop(); }, off + .5); }
    return assemble(kits);
}

/** Passage gate: a ring (round or polygonal, single or double) held by pylons, with coils, a control
 * tower, approach buoys and a field in the colour of the system's discipline. */
function porta(d, st) {
    const k = new Kit(st), field = new Kit(st);
    const sides = d.cycle('forma', [96, 6, 8, 12, 4, 5]), R = d.range(6, 7.4), r = d.range(.5, .85), layers = d.choose('anelli', [1, 1, 2]);
    const pyl = d.choose('piloni', sides === 6 ? [2, 3, 6] : sides === 8 ? [2, 4] : sides === 12 ? [3, 4, 6] : sides === 4 ? [2, 4] : sides === 5 ? [5] : [2, 3, 4, 5, 6]), kind = d.choose('pilone', ['piramide', 'cilindro', 'traliccio']);
    const coils = d.count('bobine', 3, 6), tower = d.choose('torre', ['nessuna', 'torre', 'sfera']), buoys = d.count('boe', 0, 4), twist = sides === 96 ? d.range(0, TAU) : 0, tone = st.field || st.accent;
    const corner = i => { const a = i / sides * TAU; return [Math.cos(a) * R, Math.sin(a) * R]; };
    k.push([0, 0, 0], [Math.PI / 2, 0, 0]);
    for (let l = 0; l < layers; l++) {
        const z = layers === 2 ? (l ? 1.1 : -1.1) : 0, rr = layers === 2 ? r * .75 : r;
        k.push([0, z, 0]);
        k.hull(); k.torus(R, rr, sides, 14); k.dark(); k.torus(R, rr * 1.06, sides, 4);
        const collars = sides === 96 ? 24 : sides;
        for (let s = 0; s < collars; s++) { k.push([0, 0, 0], [0, -s / collars * TAU + .025, 0]); k.paint(s % 2 ? st.steel : st.dark, .65, .45); k.torus(R, rr * 1.16, 2, 8, .05); k.pop(); }
        const lamps = sides === 96 ? 48 : sides * 4;
        for (let q = 0; q < lamps; q++) {
            const e = Math.floor(q * sides / lamps), t = (q * sides / lamps - e), A = corner(e), B = corner(e + 1), P = [A[0] + (B[0] - A[0]) * t, A[1] + (B[1] - A[1]) * t], m = Math.hypot(A[0] + B[0], A[1] + B[1]), nx = -(A[0] + B[0]) / m, nz = -(A[1] + B[1]) / m;
            k.push([P[0] + nx * (rr + .02), 0, P[1] + nz * (rr + .02)], [0, Math.atan2(B[0] - A[0], B[1] - A[1]), 0]); k.glow(tone, 1.6); k.box([0, 0, 0], [.06, .08, .3]); k.pop();
        }
        k.pop();
    }
    for (let s = 0; s < pyl; s++) {
        const a = twist + s / pyl * TAU;
        k.push([0, 0, 0], [0, -a, 0]);
        if (kind === 'piramide') { k.push([R + r * .6, 0, 0], [0, 0, -Math.PI / 2]); k.hull(); k.cyl(1.9, .9, 0, 3.2, 4, { bands: 4 }); k.dark(); k.cyl(.9, .55, 3.2, 3.9, 4, { bands: 1 }); k.pop(); }
        else if (kind === 'cilindro') { k.push([R + r * .6, 0, 0], [0, 0, -Math.PI / 2]); k.hull(); k.cyl(1.15, 1.15, 0, 3.2, 16, { bands: 4 }); k.dark(); k.cyl(1.22, 1.22, 1.2, 1.5, 16); k.hull(); k.sphere([0, 3.2, 0], 1.15, 16, 6, 0, Math.PI / 2); k.pop(); }
        else { k.steel(); k.truss([R + r * .4, 0, 0], [R + 3.8, 0, 0], .7, 1.0, .07); k.hull(); k.box([R + 4.1, 0, 0], [.6, .9, .9], .4, 3); }
        k.push([R + 1.2, 0, 0], [0, 0, Math.PI / 2]);
        for (let c = 0; c < coils; c++) { const on = c % 2 === 0; k.paint(on ? st.accent : st.steel, on ? 0 : .8, .35, on ? .7 : 0); k.cyl(1.3, 1.3, -1.25 + c * (2.5 / coils), -1.25 + c * (2.5 / coils) + .18, 20); }
        k.pop();
        k.light([R + (kind === 'traliccio' ? 4.8 : 4.3), 0, 0], WHITE, .18, 1.4 + s * .33); k.light([R, 0, r + .6], s ? RED : GREEN, .12, .7);
        if (s === 0 && tower !== 'nessuna') {
            k.push([R + 1.8, r + 1.2, 0]);
            if (tower === 'torre') { k.hull(); k.box([0, .8, 0], [.7, 1.1, .6], .35, 3); k.windows([-.5, 1.2, .61], 5, .25); k.windows([-.5, .8, .61], 5, .25); k.accent(.4); k.box([0, 1.92, 0], [.72, .03, .2]); k.push([0, 1.9, 0]); mast(k, 1.6, 2, 1.1); k.pop(); }
            else { k.steel(); k.cyl(.25, .25, 0, .7, 10); k.hull(); k.sphere([0, 1.6, 0], 1.0, 20, 14); windowRing(k, 1.0, 1.6, 14); k.accent(.4); k.push([0, 1.6, 0]); k.cyl(1.02, 1.02, .25, .35, 20, { caps: false }); k.pop(); k.light([0, 2.7, 0], WHITE, .12, 1.1); }
            k.pop();
        }
        k.pop();
    }
    for (let b = 1; b <= buoys; b++) for (const side of [1, -1]) for (const x of [-1, 1]) {
        const p = [x * R * .55, side * (2.5 + b * 2.6), 0];
        k.paint(st.hull, .5, .5); polyhedron(k, 'ottaedro', p, .32); k.light(add(p, [0, 0, .45]), side > 0 ? GREEN : RED, .1, -b * .25);
    }
    k.pop();
    // Field: bands from the centre to the inner rim of the ring, brighter towards the rim, both faces.
    field.push([0, 0, 0], [Math.PI / 2, 0, 0]); field.glow(tone, 1.1);
    const apothem = (sides === 96 ? R : R * Math.cos(Math.PI / sides)) - r * .95, segF = sides === 96 ? 64 : sides * 6, rings = 10, w = TAU / sides;
    const rad = a => sides === 96 ? apothem : apothem / Math.cos((((a % w) + w) % w) - w / 2);
    for (const side of [1, -1]) for (let j = 0; j < rings; j++) for (let q = 0; q < segF; q++) {
        const a0 = q / segF * TAU, a1 = (q + 1) / segF * TAU, t0 = j / rings, t1 = (j + 1) / rings, al = t => .02 + .42 * t ** 5 * (.6 + .4 * Math.sin(a0 * 6 + t * 12));
        const P = (t, a) => [Math.cos(a) * rad(a) * t, side * .005, Math.sin(a) * rad(a) * t], c = t => [tone[0], tone[1], tone[2], al(t)];
        const i0 = field.vertex(P(t0, a0), [0, side, 0], 0, 0, c(t0)), i1 = field.vertex(P(t1, a0), [0, side, 0], 0, 0, c(t1)), i2 = field.vertex(P(t1, a1), [0, side, 0], 0, 0, c(t1)), i3 = field.vertex(P(t0, a1), [0, side, 0], 0, 0, c(t0));
        if (side > 0) field.i.push(i0, i2, i1, i0, i3, i2); else field.i.push(i0, i1, i2, i0, i2, i3);
    }
    field.pop();
    return { ...assemble([[k]], field), fieldColor: tone };
}

/** Refinery: tanks, distillation columns, flare stacks, gas scoops and crew quarters, laid along one truss,
 * along two parallel trusses, or around a vertical tower. */
function raffineria(d, st) {
    const k = new Kit(st), layout = d.cycle('schema', ['linea', 'doppia', 'torre']), seg = st.seg(18);
    const rows = d.count('file di serbatoi', 3, 5), shape = d.choose('serbatoi', ['sfere', 'capsule', 'misto']), cols = d.count('colonne', 1, 4), flares = d.count('torce', 1, 2), scoop = d.choose('presa', ['imbuto', 'doppia', 'nessuna']);
    const column = (x, y0, z, h, c) => {
        k.push([x, y0, z]);
        k.hull(); k.cyl(.5, .5, 0, h, seg, { bands: Math.round(h / .7) }); k.cyl(.57, .57, -.1, .25, seg);
        for (let y = 1.1; y < h - .3; y += 1.3) { k.accent(.8); k.cyl(.52, .52, y, y + .1, seg, { caps: false }); }
        k.dark(); k.sphere([0, h, 0], .5, 16, 8, 0, Math.PI / 2); k.light([0, h + .6, 0], RED, .1, 1 + c * .13);
        k.pop();
    };
    const flare = (x, y0, z, h) => { k.push([x, y0, z]); k.steel(); k.cyl(.16, .11, 0, h, 10); k.glow(FLARE, 3); k.sphere([0, h + .15, 0], .24, 10, 8); k.pop(); k.flame([x, y0 + h + .2, z], FLARE, .9); };
    const tankAt = (c, r, s) => { const tint = s % 2 ? null : shade(st.trim, .95); if (shape === 'sfere' || (shape === 'misto' && s % 2 === 0)) tank(k, c, r, tint); else { k.push(c); capsuleTank(k, r * .6, -r * 1.1, r * .6, tint); k.pop(); } };
    const funnel = (p, s) => { k.push(p); k.dark(); k.cyl(1.8 * s, .5 * s, -2.6 * s, -.1, 24, { caps: false }); k.accent(1.2); k.cyl(1.82 * s, 1.82 * s, -2.7 * s, -2.55 * s, 24, { caps: false }); k.dark(); k.cyl(1.75 * s, .45 * s, -2.58 * s, -.12, 24, { caps: false, outward: false }); k.pop(); };
    const crewBlock = (p, w) => { k.push(p); k.hull(); k.box([0, 0, 0], [w, .7, 1.1], .45, 5); k.windows([-w + .3, .25, 1.12], Math.round(w * 6), .28); k.windows([-w + .3, -.1, 1.12], Math.round(w * 6), .28); k.accent(.4); k.box([0, .72, 0], [w - .1, .03, .3]); k.push([0, .7, 0]); mast(k, 1.7, 2, 1.3); k.pop(); k.pop(); };
    if (layout === 'torre') {
        const H = d.range(5, 6.2), ring = d.range(2.1, 2.5);
        k.steel(); k.truss([0, -H, 0], [0, H, 0], 1.0, 1.3, .07);
        for (let s = 0; s < rows; s++) { const y = -H + 1.5 + s * (2 * H - 3) / (rows - 1); around(shape === 'capsule' ? 3 : 4, a => { const c = [Math.cos(a) * ring, y, Math.sin(a) * ring]; tankAt(c, .85, s); k.steel(); k.beam([Math.cos(a) * 1.0, y, Math.sin(a) * 1.0], [Math.cos(a) * (ring - .7), y, Math.sin(a) * (ring - .7)], .06); }, s * .5); }
        k.hull(); k.cyl(2.8, 2.8, H, H + .3, st.seg(24), { bands: 1 }); k.accent(.5); k.cyl(2.83, 2.83, H + .1, H + .2, st.seg(24), { caps: false });
        if (cols === 1) column(0, H + .3, 0, d.range(4, 6), 0); else around(cols, (a, c) => column(Math.cos(a) * 1.5, H + .3, Math.sin(a) * 1.5, d.range(3.6, 6), c), .3);
        around(flares, a => flare(Math.cos(a) * 2.5, H + .3, Math.sin(a) * 2.5, d.range(4.5, 6.5)), 1.9);
        k.push([0, -H - .9, 0]); k.hull(); k.cyl(1.6, 1.6, -.7, .7, st.seg(20), { bands: 2 }); windowRing(k, 1.6, .25, 14, .14, .08, st.seg(20)); windowRing(k, 1.6, -.2, 14, .14, .08, st.seg(20)); k.push([1.6, 0, 0]); dockPort(k, 3); k.pop(); k.pop();
        if (scoop === 'nessuna') { k.push([0, -H - 1.6, 0], [Math.PI, 0, 0]); mast(k, 1.6, 2, 1.1); k.pop(); }
        else for (const x of scoop === 'doppia' ? [-1.7, 1.7] : [0]) funnel([x, -H - 1.6, 0], scoop === 'doppia' ? .65 : .9);
        k.light([ring + .9, H, 0], GREEN, .1, .9); k.light([-ring - .9, H, 0], RED, .1, .9);
        return assemble([[k]]);
    }
    const L = d.range(5.5, 7.2), lanes = layout === 'doppia' ? [-2.0, 2.0] : [0];
    for (const z of lanes) { k.steel(); k.truss([-L, 0, z], [L, 0, z], 1.0, 1.4, .07); }
    if (layout === 'doppia') { for (let x = -L; x <= L + .01; x += L / 2) { k.steel(); k.beam([x, .9, -2], [x, .9, 2], .07); } k.push([0, -1.3, 0], [0, 0, Math.PI / 2]); capsuleTank(k, 1.1, -L * .7, L * .7, shade(st.trim, .9)); k.pop(); }
    const sides = layout === 'doppia' ? [-3.5, 3.5] : [-1.5, 1.5], pitch = (2 * L - 2.6) / Math.max(1, rows - 1), r = Math.min(.95, pitch * .46);
    for (let s = 0; s < rows; s++) for (const z of sides) { const x = -L + 1.3 + s * pitch, c = [x, -1.15, z]; tankAt(c, r, s); k.steel(); k.beam([x, -.1, z * .7], [x, -1.15 + r * .8, z], .06); }
    const x0 = -L + 2.7, x1 = L * .1;
    for (let c = 0; c < cols; c++) { const x = cols > 1 ? x0 + c * (x1 - x0) / (cols - 1) : (x0 + x1) / 2; column(x, 1.0, lanes[c % lanes.length], d.range(3.8, 6.6), c); }
    for (let f = 0; f < flares; f++) flare(L * (.3 + f * .16), 0, lanes.length > 1 ? lanes[f % 2] : f ? -.9 : 0, d.range(5.5, 7.5));
    crewBlock([L - .9, 1.9, lanes[lanes.length - 1]], 1.2);
    k.push([L + 1.1, 0, lanes[0]]); hangar(k, .75, 1.6, 4, st.facets ? 6 : 8); k.pop();
    const scoopAt = scoop === 'doppia' ? [-1.7, 1.7] : scoop === 'imbuto' ? [0] : [];
    for (const z of scoopAt) { const s = scoop === 'doppia' ? .7 : 1; k.steel(); k.truss([-L, 0, z], [-L, -3.2 * s, z], .45, 1.0, .05); funnel([-L, -3.2 * s, z], s); }
    if (!scoopAt.length) { k.push([-L - .5, 0, 0]); k.hull(); k.box([0, 0, 0], [.5, 1.3, layout === 'doppia' ? 2.6 : 1.3], .45, 3); k.pop(); k.push([-L - 1, 0, 0], [0, Math.PI, 0]); dockPort(k, 3); k.pop(); }
    for (const x of [-L, L]) for (const z of [Math.min(...lanes) - 1, Math.max(...lanes) + 1]) k.light([x, 1.05, z], x > 0 ? GREEN : RED, .1, .9);
    return assemble([[k]]);
}

/** Radio telescope: one large dish, an array of dishes on a truss, a crown of dishes, or twin dishes. */
function radiotelescopio(d, st) {
    const k = new Kit(st), turn = new Kit(st), layout = d.cycle('schema', ['singola', 'schiera', 'corona', 'gemelle']), kits = [[k]];
    hub(k, d, 1.6, 1.0);
    const white = [.88, .9, .92, 1];
    if (layout === 'singola') {
        const R = d.range(4.2, 5.6), tilt = d.range(.4, .8);
        k.steel(); k.cyl(.45, .55, 1.0, 2.4, 16);
        turn.push([0, 3.4, 0]); turn.steel(); turn.box([0, -.6, 0], [1.9, .25, .5], .3); turn.box([1.8, .4, 0], [.18, 1.0, .35]); turn.box([-1.8, .4, 0], [.18, 1.0, .35]);
        turn.push([0, 1.1, 0], [-tilt, 0, 0]); turn.paint(white, .25, .35); turn.dish(R, R * .29, 48, 12);
        turn.steel(); turn.cyl(.5, .5, -.4, .15, 16); around(d.count('sostegni', 3, 4), a => turn.beam([Math.cos(a) * R * .88, R * .23, Math.sin(a) * R * .88], [0, R * .8, 0], .07));
        turn.dark(); turn.box([0, R * .84, 0], [.45, .35, .45], .3); turn.accent(1.5); turn.box([0, R * .77, 0], [.25, .04, .25]); turn.light([0, R * .93, 0], RED, .1, 1);
        turn.pop(); turn.pop(); kits.push([turn, [0, .05, 0]]);
    } else if (layout === 'schiera') {
        const n = d.count('antenne', 3, 7), L = d.range(7, 9.5), R = d.range(1.0, 1.4), tilt = d.range(.15, .4), rowsZ = d.choose('file', ['una', 'due']) === 'due' ? [-1.6, 1.6] : [0], alt = d.flag('inclinazioni alterne', .5);
        for (const z of rowsZ) { k.steel(); k.truss([-L, 1.3, z], [L, 1.3, z], .35, 1.0, .05); }
        if (rowsZ.length > 1) for (const x of [-L, 0, L]) { k.steel(); k.beam([x, 1.3, -1.6], [x, 1.3, 1.6], .07); }
        for (const z of rowsZ) for (let s = 0; s < n; s++) { const x = -L + .8 + s * (2 * L - 1.6) / (n - 1); if (Math.abs(x) < 2) continue; k.push([x, 2.2, z], [alt && s % 2 ? -tilt : tilt, 0, 0]); smallDish(k, R, R * .3); k.pop(); k.steel(); k.beam([x, 1.6, z], [x, 1.8, z], .06); }
        for (const s of [-1, 1]) k.light([s * (L + .2), 1.3, 0], s > 0 ? GREEN : RED, .12, .8);
        k.push([0, 1.0, 0]); mast(k, 2.4, 2, 1); k.pop();
    } else if (layout === 'corona') {
        const n = d.count('antenne', 4, 8), R = d.range(4.6, 5.6), dr = d.range(1.0, 1.4);
        turn.steel(); turn.torus(R, .22, st.seg(64), 8); around(4, a => { turn.push([0, 0, 0], [0, a, 0]); turn.beam([1.6, 0, 0], [R, 0, 0], .08); turn.pop(); });
        around(n, a => { turn.push([Math.cos(a) * R, 0, Math.sin(a) * R], [0, -a, 0]); turn.push([0, .6, 0], [0, 0, -.6]); smallDish(turn, dr, dr * .3); turn.pop(); turn.light([0, -.3, 0], WHITE, .07, 1.1 + a); turn.pop(); });
        kits.push([turn, [0, .07, 0]]);
        k.push([0, 1.0, 0]); mast(k, 2.2, 2, 1); k.pop();
    } else {
        const R = d.range(2.8, 3.6), L = d.range(5, 6.5), tilt = d.range(.3, .7), boom = d.choose('braccio', ['traliccio', 'tubo']), opposed = d.flag('puntamenti opposti', .5);
        if (boom === 'traliccio') { k.steel(); k.truss([-L, 0, 0], [L, 0, 0], .3, .9, .05); } else { k.hull(); k.push([0, 0, 0], [0, 0, -Math.PI / 2]); k.cyl(.35, .35, -L, L, 12, { bands: 8 }); k.pop(); }
        for (const s of [-1, 1]) { k.push([s * L, 0, 0]); k.hull(); k.cyl(.6, .6, -.6, .6, 16, { bands: 2 }); k.push([0, 1.2, 0], [opposed && s > 0 ? tilt : -tilt, 0, 0]); k.paint(white, .25, .35); k.dish(R, R * .3, 40, 10); k.steel(); around(3, a => k.beam([Math.cos(a) * R * .85, R * .25, Math.sin(a) * R * .85], [0, R * .75, 0], .05)); k.dark(); k.box([0, R * .78, 0], [.3, .25, .3]); k.pop(); k.pop(); k.light([s * L, -.8, 0], s > 0 ? GREEN : RED, .1, .8); }
    }
    const panels = layout === 'schiera' ? 0 : d.count('pannelli', 0, layout === 'gemelle' ? 1 : 2);
    for (let p = 0; p < panels; p++) { k.push([0, (layout === 'corona' ? -2 : 0) - p * .6, 0], [0, p * Math.PI / 2, 0]); wings(k, 'solari', d.range(4, 5.5), 2.2, 1.7); k.pop(); }
    k.push([0, -1.0, 0], [Math.PI, 0, 0]);
    if (st.facets) { k.trim(); k.cyl(.3, .3, 0, 1, 8); k.push([0, 1.9, 0]); ornament(k, 1.6, d); k.pop(); }
    else if (st.coils) { k.steel(); k.cyl(.5, .5, 0, 2.2, 16); coil(k, .7, .3, 2, 4, .06); k.light([0, 2.4, 0], WHITE, .1, 1); }
    else if (st.pipes) { around(3, a => tank(k, [Math.cos(a) * .9, 1.4, Math.sin(a) * .9], .65)); }
    else { k.hull(); k.capsule(.7, .4, 1.8, 18); k.glass(.5); k.cyl(.72, .72, .9, 1.3, 18, { caps: false }); }
    k.pop();
    k.push([1.6, 0, 0]); dockPort(k, 3); k.pop();
    return assemble(kits);
}

/** Optical telescope: a single tube with sunshade, an interferometer of small tubes, a segmented mirror
 * over a sunshield, or a tube with a distant occulter. */
function telescopio(d, st) {
    const k = new Kit(st), layout = d.cycle('schema', ['tubo', 'interferometro', 'specchio', 'occultatore']), gold = st.trim;
    const tubeAt = (r, L, tiltX) => {
        k.hull(); k.cyl(r, r, 0, L, st.seg(24), { bands: Math.round(L / .8), caps: false }); k.paint([.06, .06, .07, 1], .5, .7); k.cyl(r * .96, r * .96, 0, L, st.seg(24), { caps: false, outward: false });
        k.paint(gold, .9, .35); k.cyl(r * 1.04, r * 1.04, 0, L * .18, st.seg(24));
        k.paint([.08, .1, .14, 1], .9, .1, .05); k.cyl(r * .9, r * .9, L * .1, L * .12, st.seg(24));
        k.accent(.4); k.cyl(r * 1.02, r * 1.02, L * .78, L * .8, st.seg(24), { caps: false });
    };
    if (layout === 'tubo') {
        const r = d.range(1.1, 1.7), L = d.range(6, 8.5), shade0 = d.flag('paraluce', .7), lid = d.flag('coperchio', .6), four = d.choose('pannelli', ['due', 'quattro']) === 'quattro';
        k.push([0, -L * .45, 0]); tubeAt(r, L);
        if (shade0) { k.hull(); k.cyl(r * 1.06, r * 1.06, L, L + r * 1.4, st.seg(24), { caps: false, start: 0 }); }
        if (lid) { k.push([r, L + (shade0 ? r * 1.4 : 0), 0], [0, 0, -1.1]); k.hull(); k.cyl(r * 1.05, r * 1.05, 0, .08, st.seg(24)); k.pop(); }
        k.dark(); k.box([0, -.6, 0], [r * 1.1, .6, r * 1.1], .4, 4);
        for (const a of four ? [0, Math.PI / 2, Math.PI, Math.PI * 1.5] : [0, Math.PI]) { k.push([0, -.6, 0], [0, a, 0]); k.steel(); k.beam([r * 1.1, 0, 0], [r + 1.2, 0, 0], .06); k.push([r + 1.2 + (four ? 1.6 : 2.2), 0, 0]); solarWing(k, four ? 3.2 : 4.4, 2.0, [four ? 4 : 6, 3]); k.pop(); k.pop(); }
        k.push([0, -1.2, 0]); k.steel(); k.cyl(.08, .05, -1.4, 0, 8); k.pop(); k.light([0, -2.7, 0], WHITE, .1, 1);
        k.pop();
    } else if (layout === 'interferometro') {
        const n = d.count('telescopi', 3, 5), L = d.range(7.5, 10), r = d.range(.5, .75), cross = d.choose('disposizione', ['linea', 'croce']) === 'croce', panels = d.flag('pannelli', .6);
        hub(k, d, 1.3, .8);
        for (const a of cross ? [0, Math.PI / 2] : [0]) {
            k.push([0, 0, 0], [0, a, 0]); k.steel(); k.truss([-L, 0, 0], [L, 0, 0], .3, 1.0, .05);
            for (let s = 0; s < n; s++) { const x = -L + s * (2 * L) / (n - 1), y = Math.abs(x) < 1.5 ? (a ? -1 : 1) : .4; if (Math.abs(x) < 1.5 && a) continue; k.push([x, y, 0]); tubeAt(r, r * 4); k.pop(); k.push([x, y - .6, 0]); k.dark(); k.box([0, 0, 0], [r * 1.1, .3, r * 1.1], .3); k.pop(); }
            for (const s of [-1, 1]) { k.light([s * (L + .3), 0, 0], s > 0 ? GREEN : RED, .1, .8); if (panels) { k.push([s * L * .5, -.4, 0]); k.steel(); k.beam([0, 0, 0], [0, -1.3, 0], .05); k.push([0, -1.4, 0]); solarWing(k, 3, 1.8, [4, 3]); k.pop(); k.pop(); } }
            k.pop();
        }
    } else if (layout === 'specchio') {
        const rings = d.count('corone di specchi', 1, 2), shield = d.choose('schermo', ['rombo', 'disco', 'esagono']), layers = d.count('strati', 3, 5), cell = rings === 1 ? 1.05 : .75;
        const tiles = [[0, 0]]; for (let q = -rings; q <= rings; q++) for (let p = -rings; p <= rings; p++) { const s = -q - p; if ((q || p) && Math.max(Math.abs(q), Math.abs(p), Math.abs(s)) <= rings) tiles.push([q, p]); }
        k.push([0, 1.8, 0], [-.35, 0, 0]);
        for (const [q, p] of tiles) { if (!q && !p) continue; const x = cell * 1.5 * q, z = cell * Math.sqrt(3) * (p + q / 2), y = .06 * (x * x + z * z); k.paint(gold, .95, .15, .05); k.push([x, y, z]); k.cyl(cell * .97, cell * .97, -.05, .05, 6); k.pop(); }
        k.dark(); k.cyl(.5, .5, -.4, .1, 12);
        const span = cell * (rings * 2 + 1) * 1.1;
        around(3, a => { k.steel(); k.beam([Math.cos(a) * span * .45, .2, Math.sin(a) * span * .45], [0, span * .8, 0], .05); }, Math.PI / 2);
        k.dark(); k.cyl(.35, .35, span * .78, span * .84, 12); k.light([0, span * .86, 0], RED, .08, 1);
        k.pop();
        k.steel(); k.cyl(.3, .3, -1.2, 1.4, 10);
        for (let l = 0; l < layers; l++) {
            const s = 4.8 - l * .35, y = -1.2 - l * .28, film = l % 2 ? SILVER : [.85, .7, .75, 1];
            k.paint(film, .8, .3);
            if (shield === 'disco') k.cyl(s * .8, s * .8, y - .015, y + .015, st.seg(32));
            else k.extrude(shield === 'rombo' ? [[s, 0], [0, s * .55], [-s, 0], [0, -s * .55]] : Array.from({ length: 6 }, (_, i) => [Math.cos(i / 6 * TAU) * s * .8, Math.sin(i / 6 * TAU) * s * .62]), y - .015, y + .015);
        }
        k.dark(); k.box([0, -3.0, 0], [1.1, .5, 1.1], .4, 4); k.push([0, -3.0, 1.1], [0, Math.PI / 2, 0]); dockPort(k, 2); k.pop();
        for (const s of [1, -1]) k.light([s * 4.9, -1.2, 0], s > 0 ? GREEN : RED, .1, .8);
    } else {
        const r = d.range(.8, 1.1), dist = d.range(7.5, 9.5), petals = d.choose('petali', [8, 10, 12, 16]), Rs = d.range(3.2, 4.2), twin = d.flag('due telescopi', .5), boom = d.choose('braccio', ['traliccio', 'tiranti']);
        k.push([0, -4, 0]); for (const x of twin ? [-r * 1.15, r * 1.15] : [0]) { k.push([x, 0, 0]); tubeAt(r * (twin ? .8 : 1), 3.4); k.pop(); } k.dark(); k.box([0, -.5, 0], [r * (twin ? 2.2 : 1.1), .5, r * 1.1], .4, 4); for (const s of [1, -1]) { k.push([s * (r * (twin ? 2.2 : 1.1) + 1.6), -.5, 0]); solarWing(k, 3, 1.8, [4, 3]); k.pop(); } k.pop();
        if (boom === 'traliccio') { k.steel(); k.truss([0, -.2, 0], [0, dist - 4.4, 0], .25, 1.0, .04); } else { k.steel(); k.cyl(.12, .12, -.6, dist - 4.3, 8); around(3, a => k.beam([Math.cos(a) * r * 1.3, -.6, Math.sin(a) * r * 1.3], [Math.cos(a) * Rs * .55, dist - 4.25, Math.sin(a) * Rs * .55], .02)); }
        k.push([0, dist - 4.2, 0]);
        k.paint([.1, .1, .12, 1], .6, .5); k.cyl(Rs * .6, Rs * .6, -.04, .04, 32);
        around(petals, a => { const c = Math.cos(a), s = Math.sin(a), t = [-s, c], w = Rs * Math.PI / petals; k.extrude([[c * Rs * .58 + t[0] * w, s * Rs * .58 + t[1] * w], [c * Rs, s * Rs], [c * Rs * .58 - t[0] * w, s * Rs * .58 - t[1] * w]], -.03, .03); });
        k.accent(.6); k.torus(Rs * .6, .06, 48, 4);
        k.light([Rs, 0, 0], GREEN, .1, .8); k.light([-Rs, 0, 0], RED, .1, .8); k.light([0, .2, 0], WHITE, .12, 1.2);
        k.pop();
    }
    return assemble([[k]]);
}

/** Orbital greenhouse: rotating farm drums on a spine, a cluster of glass domes, or a glass torus. */
function serra(d, st) {
    const k = new Kit(st), spin = new Kit(st), layout = d.cycle('schema', ['tamburi', 'cupole', 'toro']), kits = [[k]], green = st.smooth ? shade(st.glass, .62) : [.09, .24, .13, 1];
    const glass = (g = .35) => k.paint(green, .1, .15, g);
    if (layout === 'tamburi') {
        const n = d.count('tamburi', 1, 3), R = d.range(2, 2.8), H = d.range(1.6, 2.6), strips = d.choose('vetrate', [4, 6, 8]), mirrors = d.flag('specchi', .6), gap = H * 2 + 1.6, len = n * gap / 2 + 2;
        k.push([0, 0, 0], [Math.PI / 2, 0, 0]);
        k.steel(); k.cyl(.45, .45, -len, len, 12, { bands: Math.round(len) });
        k.dark(); k.cyl(.9, .5, len, len + 1.1, 16); k.glow(FLARE, 1.6); k.cyl(.4, .4, len + 1.1, len + 1.2, 16);
        k.steel(); k.cyl(.6, .6, -len - .9, -len, 16); k.light([0, -len - 1.05, 0], WHITE, .16, 1);
        k.pop();
        for (let i = 0; i < n; i++) {
            const z = (i - (n - 1) / 2) * gap;
            spin.push([0, 0, z], [Math.PI / 2, 0, 0]);
            for (let s = 0; s < strips * 2; s++) {
                const a0 = s / (strips * 2) * TAU, a1 = (s + 1) / (strips * 2) * TAU, isGlass = s % 2 === 1;
                if (isGlass) spin.paint(green, .1, .15, .4); else spin.hull();
                for (let j = 0; j < 4; j++) { const b0 = a0 + (a1 - a0) * j / 4, b1 = a0 + (a1 - a0) * (j + 1) / 4; spin.quad([Math.cos(b0) * R, -H, Math.sin(b0) * R], [Math.cos(b0) * R, H, Math.sin(b0) * R], [Math.cos(b1) * R, H, Math.sin(b1) * R], [Math.cos(b1) * R, -H, Math.sin(b1) * R]); }
                spin.dark(); spin.push([0, 0, 0], [0, -(isGlass ? (a0 + a1) / 2 : a0), 0]); spin.box([R + .03, 0, 0], [.05, H + .02, .07]); spin.pop();
            }
            for (let y = -H + H / 2; y < H; y += H / 2) { spin.push([0, y, 0]); spin.steel(); spin.torus(R + .02, .04, 48, 4); spin.pop(); }
            spin.hull(); spin.cyl(R, .9, H, H + .7, 36); spin.cyl(.9, R, -H - .7, -H, 36);
            spin.accent(.45); spin.cyl(R * 1.01, R * 1.01, H - .15, H, 36, { caps: false }); spin.cyl(R * 1.01, R * 1.01, -H, -H + .15, 36, { caps: false });
            if (mirrors) for (let s = 0; s < strips; s++) {
                const a = (s * 2 + 1.5) / (strips * 2) * TAU, up = i % 2 ? -1 : 1;
                spin.push([Math.cos(a) * (R + .1), up * H, Math.sin(a) * (R + .1)], [0, -a, 0]); spin.push([0, 0, 0], [0, 0, up * -.55]);
                spin.paint([.62, .74, .9, 1], .9, .12, .12); spin.box([0, up * H * .9, 0], [.03, H * .9, R * TAU / strips / 4]); spin.steel(); spin.box([0, up * H * .9, 0], [.06, H * .92, .05]);
                spin.pop(); spin.pop();
            }
            spin.pop();
        }
        kits.push([spin, [0, 0, .1]]);
        for (const side of [1, -1]) { k.steel(); k.beam([side * .45, 0, len - .6], [side * 3.2, 0, len - .6], .07); k.push([side * (3.2 + 2.6), 0, len - .6]); solarWing(k, 5.2, 2.2, [7, 3]); k.pop(); }
    } else if (layout === 'cupole') {
        const n = d.count('cupole', 3, 7), base = d.choose('telaio', n > 6 ? ['cubo', 'icosaedro'] : ['ottaedro', 'cubo', 'icosaedro']), V = solid(base).V, Rd = d.range(1.15, 1.6), D = Rd + d.range(2.2, 2.8);
        hub(k, d, 1.3, 1.0);
        const dirs = V.slice().sort((a, b) => hash(a[0] * 3 + a[1] * 7 + a[2] * 11) - hash(b[0] * 3 + b[1] * 7 + b[2] * 11)).slice(0, n);
        for (const v of dirs) {
            const c = scale(v, D);
            k.steel(); k.beam(scale(v, 1.2), scale(v, D - Rd * .9), .1);
            glass(.5); k.sphere(c, Rd, st.seg(20), 14);
            k.steel(); for (let m = 0; m < 4; m++) { k.push(c, [Math.PI / 2, m * Math.PI / 4, 0]); k.torus(Rd * 1.01, .035, 32, 4); k.pop(); }
            k.hull(); k.push(c); for (const y of [-.5, 0, .5]) { const rr = Math.sqrt(1 - y * y) * Rd * 1.01; k.cyl(rr, rr, y * Rd - .05, y * Rd + .05, st.seg(20), { caps: false }); } k.pop();
            k.light(add(c, scale(v, Rd + .1)), WHITE, .08, 1 + v[0]);
        }
        k.push([0, -1.0, 0], [Math.PI, 0, 0]); mast(k, 2.2, 2, 1); k.pop();
    } else {
        const R = d.range(4.6, 5.8), r = d.range(1.0, 1.3), spokes = d.choose('raggi', [3, 4, 6]), mirrors = d.flag('specchi', .6), inner = d.flag('anello interno', .5), panels = d.flag('pannelli', .5), sides = 14, seg = st.seg(64);
        spin.hull(); spin.torus(R, r, seg, sides, TAU, 0, Math.PI, TAU);
        spin.paint(green, .1, .15, .4); spin.torus(R, r, seg, sides, TAU, 0, 0, Math.PI);
        for (let s = 0; s < seg; s += 2) { spin.push([0, 0, 0], [0, -s / seg * TAU, 0]); spin.steel(); spin.torus(R, r * 1.02, 2, 8, .02, 0, 0, Math.PI); spin.pop(); }
        around(spokes, a => { spin.push([0, 0, 0], [0, a, 0]); spin.steel(); spin.push([0, 0, 0], [0, 0, -Math.PI / 2]); spin.cyl(.25, .25, 1.4, R - r * .9, 10, { caps: false }); spin.pop(); spin.pop(); });
        if (inner) { spin.paint(green, .1, .15, .4); spin.torus(R * .55, r * .45, seg, 10); around(spokes, a => { spin.push([0, 0, 0], [0, a + Math.PI / spokes, 0]); spin.steel(); spin.push([0, 0, 0], [0, 0, -Math.PI / 2]); spin.cyl(.15, .15, 1.4, R * .55 - r * .4, 8, { caps: false }); spin.pop(); spin.pop(); }); }
        kits.push([spin, [0, .1, 0]]);
        hub(k, d, 1.4, 1.3);
        k.push([0, 1.3, 0]); mast(k, 2.6, 2, 1); k.pop();
        if (mirrors) for (const side of [1, -1]) { k.push([0, -2.6 * side, 0]); k.paint([.62, .74, .9, 1], .9, .12, .15); k.cyl(R * .7, R * .7, -.03, .03, st.seg(40)); k.pop(); k.steel(); k.beam([0, -1.3 * side, 0], [0, -2.6 * side, 0], .1); }
        if (panels) { k.push([0, mirrors ? -3.4 : -1.6, 0]); k.steel(); k.beam([0, mirrors ? .8 : 0, 0], [0, 0, 0], .1); wings(k, 'solari', 4, 2, .3); k.pop(); }
    }
    return assemble(kits);
}

/** Mining station on a captured asteroid: a chain of processing modules beside it, a base anchored on its
 * surface, or a ring of modules around it, always with drill rigs and ore containers. */
function miniera(d, st) {
    const k = new Kit(st), layout = d.cycle('schema', ['catena', 'ancorata', 'anello']), R = d.range(3.0, 4.0), rigs = d.count('trivelle', 2, 4), mods = d.count('moduli', 2, 3), crates = d.count('file di container', 2, 3);
    const ph = [d.range(0, TAU), d.range(0, TAU), d.range(0, TAU)], lumps = d.int(3, 5), rock = layout === 'catena' ? [-R - .5, 0, 0] : [0, 0, 0];
    const bump = (n, i, j) => 1 + .14 * Math.sin(n[0] * lumps + ph[0]) * Math.cos(n[1] * 3 + ph[1]) + .1 * Math.sin(n[2] * (lumps + 2) + ph[2]) + .05 * (hash(i, j, R) - .5);
    k.paint(ROCK, .05, .95); k.sphere(rock, R, 36, 24, 0, Math.PI, bump);
    for (let c = 0; c < 6; c++) { const a = hash(c, R) * TAU, b = hash(c, 2, R) * Math.PI, n = [Math.cos(a) * Math.sin(b), Math.cos(b), Math.sin(a) * Math.sin(b)]; k.paint(shade(ROCK, .6), .05, .95); k.sphere(add(rock, scale(n, R * .93)), R * .22, 10, 6); }
    const rig = (u, s, standoff = 2.6) => {
        const tip = add(rock, scale(u, R * .95)), root = add(rock, scale(u, R + standoff));
        k.steel(); k.truss(root, add(rock, scale(u, R + .6)), .35, .8, .04);
        k.dark(); k.beam(add(rock, scale(u, R + .7)), tip, .25); k.glow(FLARE, 1.6); k.beam(add(rock, scale(u, R + .05)), tip, .3);
        k.hull(); k.box(root, [.5, .5, .5], .35, 3); k.light(add(root, scale(u, .7)), WHITE, .14, 0); k.light(add(root, [0, .6, 0]), AMBER_LIGHT, .08, 1.5 + s * .3);
        return root;
    };
    const COL = [[.75, .38, .16, 1], [.16, .45, .52, 1], [.62, .62, .58, 1], st.accent, [.45, .24, .16, 1]];
    const crate = (p, c, q) => { k.paint(COL[Math.floor(hash(c, q, R) * COL.length)], .35, .6); k.box(p, [.62, .58, .58], .7); };
    const module = (p, w, h) => { k.hull(); k.box(p, [w, h, h], .45, 4); k.windows([p[0] - w + .3, p[1] + h * .4, p[2] + h + .01], Math.round(w * 4), .3); k.accent(.4); k.box([p[0], p[1] + h + .02, p[2]], [w * .9, .03, h * .3]); if (st.pipes) pipe(k, [[p[0] - w + .2, p[1] + h + .1, p[2] + h * .5], [p[0] + w - .2, p[1] + h + .1, p[2] + h * .5]], .07); };
    if (layout === 'catena') {
        for (let s = 0; s < rigs; s++) { const a = Math.PI * .5 + (s - (rigs - 1) / 2) * 1.0, u = unitv([Math.cos(a) * .55, Math.sin(a), .55 * (s % 2 ? 1 : -1)]), root = rig(u, s); k.steel(); k.beam(root, [0, root[1] * .4, root[2] * .4], .07); }
        let x = 0;
        for (let m = 0; m < mods; m++) { const w = d.range(.8, 1.2), h = d.range(.8, 1.2); module([x + w, 0, 0], w, h); if (st.coils) { k.push([x + w, 0, 0], [0, 0, Math.PI / 2]); coil(k, h * 1.5, -w * .6, w * .6, 2, .06); k.pop(); } x += w * 2 + .3; k.steel(); k.beam([x - .3, 0, 0], [x, 0, 0], .2); }
        const yard = x + .2;
        k.steel(); k.truss([yard, 0, 0], [yard + crates * 1.5, 0, 0], .3, .8, .04);
        for (let c = 0; c < crates; c++) for (const [yy, zz] of [[.8, .8], [.8, -.8], [-.8, .8], [-.8, -.8]]) crate([yard + .75 + c * 1.5, yy, zz], c, yy + zz * 3);
        const hx = yard + crates * 1.5 + 1.5;
        k.push([hx, 0, 0], [0, 0, -Math.PI / 2]); k.hull(); k.cyl(1.2, 1.2, -1.2, 1.2, st.seg(20), { bands: 3 }); windowRing(k, 1.2, .3, 12); k.pop();
        k.push([hx + 1.3, 0, 0]); dockPort(k, 3); k.pop(); k.push([hx, 1.2, 0]); mast(k, 1.8, 2, 1.2); k.pop();
        k.push([x * .5, -1.4, 0]); wings(k, st.coils ? 'radiatori' : 'solari', 4, 1.8, 1.0); k.pop();
    } else if (layout === 'ancorata') {
        const top = R * .92, plat = [R * 1.5, .12, R * .9];
        k.steel(); for (const [x, z] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) k.beam([x * plat[0] * .7, top, z * plat[2] * .7], [x * R * .45, R * .55, z * R * .45], .1);
        k.dark(); k.box([0, top + .1, 0], plat, .6);
        for (let m = 0; m < mods; m++) { const w = d.range(.7, 1.0), h = d.range(.6, .9), x = -plat[0] + .9 + m * (plat[0] * 2 - 1.8) / Math.max(1, mods - 1); module([x, top + .22 + h, -plat[2] * .45], w, h); }
        for (let c = 0; c < crates; c++) for (const q of [0, 1]) crate([-plat[0] + .8 + c * 1.35, top + .82 + q * 1.18, plat[2] * .5], c, q);
        k.hull(); k.sphere([plat[0] - .9, top + 1.0, plat[2] * .5], .9, st.seg(20), 12, 0, Math.PI / 2); windowRing(k.push([plat[0] - .9, top + 1.0, plat[2] * .5]), .9, .2, 10); k.pop();
        k.push([plat[0], top + .5, 0]); dockPort(k, 3); k.pop(); k.push([-plat[0] + .3, top + .2, -plat[2] + .3]); mast(k, 2.2, 2, 1.2); k.pop();
        for (let s = 0; s < rigs; s++) { const a = s / rigs * TAU + .4, u = unitv([Math.cos(a), -.35, Math.sin(a)]); rig(u, s, 2.0); }
        for (const side of [1, -1]) { k.steel(); k.beam([0, top + .1, side * plat[2]], [0, top + .1, side * (plat[2] + 1.0)], .07); k.push([0, top + .1, side * (plat[2] + 1.0 + 2.0)], [0, Math.PI / 2, 0]); solarWing(k, 4, 1.8, [5, 3]); k.pop(); }
    } else {
        const Rr = R + 2.4;
        k.steel(); k.torus(Rr, .22, st.seg(64), 8); k.trim(); k.torus(Rr, .25, st.seg(64), 3);
        for (let s = 0; s < rigs; s++) { const a = s / rigs * TAU, u = [Math.cos(a), 0, Math.sin(a)]; rig(u, s, 2.4); }
        const slots = mods + crates;
        for (let i = 0; i < slots; i++) {
            const a = (i + .5) / slots * TAU, c = [Math.cos(a) * Rr, 0, Math.sin(a) * Rr];
            k.push(c, [0, -a, 0]);
            if (i < mods) { module([0, 0, 0], .7, .75); } else { for (const [y, z] of [[.65, 0], [-.65, 0]]) crate([0, y, z], i, y); }
            k.pop();
        }
        k.hull(); k.cyl(1.0, 1.0, R * .85, R * .85 + 1.6, st.seg(20), { bands: 2 }); windowRing(k, 1.0, R * .85 + .9, 10); k.push([0, R * .85 + 1.6, 0]); mast(k, 1.8, 2, 1.2); k.pop();
        k.push([1.0, R * .85 + .8, 0]); dockPort(k, 3); k.pop();
        k.push([0, -R * .9, 0], [Math.PI, 0, 0]); k.steel(); k.beam([0, 0, 0], [0, 1.0, 0], .08); k.push([0, 1.0, 0]); wings(k, st.coils ? 'radiatori' : 'solari', 3.6, 1.6, .3); k.pop(); k.pop();
    }
    return assemble([[k]]);
}
const unitv = a => { const l = Math.hypot(...a); return a.map(v => v / l); };

const AMBER_LIGHT = [1, .7, .25, 1];

/** Shipyard: an open frame (cage, rings or gantry bridge) around a hull under construction, cranes,
 * floodlights and welding sparks. */
function cantiere(d, st) {
    const k = new Kit(st), frame = d.cycle('struttura', ['gabbia', 'anelli', 'ponte']), L = d.range(5, 6.8), W = d.range(2.2, 2.9), H = W * d.range(.9, 1.1);
    const done = d.range(.3, .8), cranes = d.count('gru', 1, 3), shop = d.choose('officina', ['blocco', 'torre', 'doppia']);
    if (frame === 'gabbia') {
        const bays = d.count('campate', 2, 4), C = (x, y, z) => [x * L, y * H, z * W];
        k.steel();
        for (const y of [-1, 1]) for (const z of [-1, 1]) k.truss(C(-1, y, z), C(1, y, z), .2, .9, .035);
        for (let b = 0; b <= bays; b++) { const xb = -1 + 2 * b / bays; for (const y of [-1, 1]) k.truss(C(xb, y, -1), C(xb, y, 1), .15, .9, .03); for (const z of [-1, 1]) k.truss(C(xb, -1, z), C(xb, 1, z), .15, .9, .03); }
    } else if (frame === 'anelli') {
        const n = d.count('anelli', 4, 7);
        for (let i = 0; i < n; i++) { const x = -L + 2 * L * i / (n - 1); k.push([x, 0, 0], [0, 0, Math.PI / 2]); k.steel(); k.torus(W + .6, .16, st.seg(32), 6); k.accent(.5); k.torus(W + .6, .19, st.seg(32), 3); k.pop(); }
        around(d.choose('correnti', [3, 4]), a => { k.steel(); k.beam([-L, Math.cos(a) * (W + .6), Math.sin(a) * (W + .6)], [L, Math.cos(a) * (W + .6), Math.sin(a) * (W + .6)], .07); }, Math.PI / 4);
    } else {
        const n = d.count('bracci', 3, 5);
        k.steel(); k.truss([-L, H + .6, 0], [L, H + .6, 0], .4, 1.0, .05);
        for (let i = 0; i < n; i++) { const x = -L + .6 + (2 * L - 1.2) * i / (n - 1); for (const z of [-1, 1]) k.beam([x, H + .6, 0], [x, -H * .2, z * W * .9], .06); }
    }
    // Hull under construction along x: plated sections up to `done`, bare frames beyond.
    const hullShape = d.choose('scafo', ['tozzo', 'snello', 'a cuneo']), prof = hullShape === 'tozzo' ? [[1, .6, .5], [.7, .95, .8], [.3, 1, .9], [-.3, 1, .9], [-.8, .95, .85], [-1, .7, .6]] : hullShape === 'snello' ? [[1, .15, .15], [.6, .55, .5], [.2, .7, .62], [-.3, .72, .62], [-.8, .65, .55], [-1, .5, .45]] : [[1, .1, .25], [.7, .5, .45], [.3, .8, .6], [-.3, 1, .7], [-.8, 1, .75], [-1, .9, .7]];
    const S = prof.map(([z, w, h]) => [z * L * .82, w * W * .7, h * H * .7]);
    const ribs = []; for (let i = 0; i + 1 < S.length; i++) for (let t = 0; t < 3; t++) { const f = t / 3, a = S[i], b = S[i + 1]; ribs.push(a.map((v, j) => v + (b[j] - v) * f)); } ribs.push(S.at(-1));
    const cut = Math.max(2, Math.round(ribs.length * done));
    k.push([0, 0, 0], [0, Math.PI / 2, 0]);
    k.paint(st.hull, .5, .45); k.loft(ribs.slice(0, cut).map(([z, w, h]) => section(z, w, h, 0, 14)), { closeFront: true, closeBack: false, paint: (m, s, q) => q >= 12 || q <= 1 ? st.dark : null });
    for (const [z, w, h] of ribs.slice(cut - 1)) { k.paint(st.steel, .7, .4); tube(k, section(z, w, h, 0, 14).pts.map(([x, y]) => [x, y, z]), .05, 5, true); }
    const keel = -Math.max(...ribs.map(r => r[2])) - .06; k.steel(); k.beam([0, keel, ribs[0][0]], [0, keel, ribs.at(-1)[0]], .08);
    k.pop();
    for (let c = 0; c < cranes; c++) {
        const x = cranes === 1 ? L * .3 : -L * .6 + c * L * 1.2 / (cranes - 1), hy = H;
        k.trim(); k.box([x, hy + .1, 0], [.15, .15, W * 1.05], .3); k.dark(); k.box([x, hy - .1, 0], [.25, .12, .25], .2); k.steel(); k.beam([x, hy - .2, 0], [x, hy - 1.2, 0], .02); k.trim(); k.box([x, hy - 1.3, 0], [.12, .1, .12]);
        k.light([x, hy + .35, W * 1.05], AMBER_LIGHT, .08, 1.3 + c * .4);
    }
    for (const [x, y, z] of [[-1, 1, 1], [1, 1, -1], [-1, -1, -1], [1, -1, 1]]) k.light([x * L, y * H, z * W], WHITE, .2, 0);
    for (let s = 0; s < 3; s++) k.light([(hash(s, L) - .5) * L, (hash(s, 3) - .5) * H * .6, W * .62], [.7, .85, 1, 1], .1, 6 + s);
    const ox = L + 1.4;
    if (shop !== 'torre') { k.hull(); k.box([ox, 0, 0], [1.2, 1.0, 1.4], .4, 4); k.windows([ox - .9, .4, 1.41], 7, .28); k.windows([ox - .9, 0, 1.41], 7, .28); k.accent(.4); k.box([ox, 1.02, 0], [1.1, .03, .4]); k.push([ox + 1.2, 0, 0]); dockPort(k, 3); k.pop(); }
    if (shop !== 'blocco') { const tx = shop === 'doppia' ? -ox : ox; k.push([tx, 0, 0]); k.hull(); k.cyl(.9, .9, -1.4, 1.4, st.seg(16), { bands: 3 }); windowRing(k, .9, .5, 10); windowRing(k, .9, -.2, 10); k.push([0, 1.4, 0]); mast(k, 1.5, 2, 1); k.pop(); k.pop(); }
    k.push([0, -H, 0], [Math.PI, 0, 0]); k.steel(); k.beam([0, 0, 0], [0, 1.0, 0], .1); k.push([0, 1.0, 0], [0, 0, 0]); wings(k, 'solari', 3.6, 1.8, .2); k.pop(); k.pop();
    if (st.coils) coil(k.push([0, 0, 0], [0, 0, Math.PI / 2]), W + .9, -L * .95, -L * .75, 2, .07), k.pop();
    if (st.pipes) pipe(k, [[-L, H, W], [-L * .2, H + .5, W], [L, H, W]], .08);
    return assemble([[k]]);
}

/** Power station: a reactor (tokamak, sphere or column) behind a shadow shield, large radiator panels and
 * a habitat, arranged along a vertical spine, along a horizontal boom, or as a radial star. */
function centrale(d, st) {
    const k = new Kit(st), layout = d.cycle('schema', ['verticale', 'orizzontale', 'raggiera']), core = d.choose('nucleo', ['tokamak', 'sfera', 'colonna']), shield = d.choose('scudo', ['cono', 'disco']);
    const reactor = () => {
        if (core === 'tokamak') {
            const R = d.range(1.8, 2.2), r = R * .38, coils = d.count('bobine', 10, 16);
            k.hull(); k.torus(R, r, st.seg(40), 12); k.glow(st.accent, 1.5); k.torus(R, r * 1.02, st.seg(40), 4, TAU, 0, -.15, .15);
            around(coils, a => { k.push([0, 0, 0], [0, -a, 0]); k.push([R, 0, 0], [Math.PI / 2, 0, 0]); k.trim(); k.torus(r * 1.2, .12, 18, 6); k.pop(); k.pop(); });
            k.dark(); k.cyl(R * .4, R * .4, -r * 1.3, r * 1.3, 16); k.glow(st.accent, 2); k.cyl(R * .42, R * .42, -.1, .1, 16, { caps: false });
            return R + r;
        }
        if (core === 'sfera') {
            const r = d.range(1.7, 2.2); k.hull(); k.sphere([0, 0, 0], r, st.seg(28), 18);
            for (const y of [-.6, 0, .6]) { const rr = Math.sqrt(1 - y * y) * r * 1.01; k.dark(); k.cyl(rr, rr, y * r - .07, y * r + .07, st.seg(28), { caps: false }); }
            k.glow(FLARE, 1.4); k.cyl(r * .99, r * .99, r * .25, r * .32, st.seg(28), { caps: false });
            return r;
        }
        const n = d.count('anelli del nucleo', 3, 5);
        for (let i = 0; i < n; i++) { const y = -1.6 + i * 3.2 / (n - 1); k.hull(); k.cyl(1.4, 1.4, y - .35, y + .35, st.seg(20), { bands: 1 }); if (i + 1 < n) { k.glow(FLARE, 2); k.cyl(1.0, 1.0, y + .35, y + 3.2 / (n - 1) - .35, st.seg(20), { caps: false }); } }
        return 1.9;
    };
    const shieldAt = y => { k.paint(st.dark, .6, .5); if (shield === 'cono') k.cyl(2.4, .5, y - .6, y, st.seg(28)); else k.cyl(2.3, 2.3, y - .15, y, st.seg(28)); };
    const habitat = () => {
        k.hull(); k.cyl(1.2, 1.2, -1.0, 1.0, st.seg(20), { bands: 3 }); windowRing(k, 1.2, .3, 12, .14, .08, st.seg(20)); windowRing(k, 1.2, -.3, 12, .14, .08, st.seg(20)); k.accent(.4); k.cyl(1.22, 1.22, .75, .85, st.seg(20), { caps: false });
        k.push([1.2, 0, 0]); dockPort(k, 3); k.pop();
        if (st.smooth) around(3, a => { k.glass(.4); k.sphere([Math.cos(a) * 2, 0, Math.sin(a) * 2], .6, 14, 10); k.steel(); k.beam([Math.cos(a) * 1.2, 0, Math.sin(a) * 1.2], [Math.cos(a) * 1.5, 0, Math.sin(a) * 1.5], .06); }, 1);
        if (st.facets) { k.push([0, -1.9, 0]); ornament(k, 1.2, d); k.pop(); }
    };
    const w = d.range(1.6, 2.2), span = d.range(3.6, 5.2);
    if (layout === 'verticale') {
        const levels = d.count('livelli di radiatori', 1, 3), per = d.choose('pannelli per livello', [2, 3, 4]), spine = 3.4 + levels * (w + .4);
        k.push([0, spine / 2 + 2.6, 0]); const rr = reactor(); k.light([0, rr * .6 + 1, 0], RED, .12, 1); k.pop();
        shieldAt(spine / 2);
        k.steel(); k.truss([0, spine / 2 - .6, 0], [0, -spine / 2, 0], .35, 1.0, .05);
        for (let l = 0; l < levels; l++) { const y = spine / 2 - 1.2 - w / 2 - l * (w + .4); around(per, a => { k.push([0, y, 0], [0, a, 0]); k.push([.4 + span / 2, 0, 0]); radiator(k, span, w, 6, 1); k.pop(); k.pop(); }, l * .4); }
        k.push([0, -spine / 2 - 1.0, 0]); habitat(); k.push([0, -1.0, 0], [Math.PI, 0, 0]); mast(k, 1.4, 1, 1); k.pop(); k.pop();
        if (st.pipes) pipe(k, [[.6, spine / 2 - .6, .6], [.6, -spine / 2, .6]], .09);
    } else if (layout === 'orizzontale') {
        const bays = d.count('campate di radiatori', 2, 4), L = bays * (w + .3) + 3.4;
        k.push([-L / 2 - 2.4, 0, 0], [0, 0, Math.PI / 2]); const rr = reactor(); k.pop();
        k.push([-L / 2, 0, 0], [0, 0, Math.PI / 2]); shieldAt(0); k.pop();
        k.steel(); k.truss([-L / 2 + .6, 0, 0], [L / 2, 0, 0], .35, 1.0, .05);
        for (let b = 0; b < bays; b++) { const x = -L / 2 + 1.6 + w / 2 + b * (w + .3); for (const side of [1, -1]) { k.push([x, 0, side * (.4 + span / 2)], [Math.PI / 2, 0, 0]); radiator(k, w, span, 6, 1); k.pop(); } }
        k.push([L / 2 + 1.0, 0, 0], [0, 0, -Math.PI / 2]); habitat(); k.pop();
        k.light([-L / 2 - 2.4, rr + .4, 0], RED, .12, 1);
        if (st.pipes) pipe(k, [[-L / 2 + .6, .5, .5], [L / 2, .5, .5]], .09);
    } else {
        const arms = d.choose('raggi di radiatori', [4, 5, 6, 8]);
        const rr = reactor(); k.light([0, rr * .6 + .8, 0], RED, .12, 1);
        shieldAt(-rr - .2);
        around(arms, a => { k.push([0, 0, 0], [0, a, 0]); k.steel(); k.beam([rr * .9, 0, 0], [rr + .6, 0, 0], .08); k.push([rr + .6 + span / 2, 0, 0], [Math.PI / 2, 0, 0]); radiator(k, span, w * .8, 6, 1); k.pop(); k.pop(); }, .2);
        k.steel(); k.truss([0, -rr - .8, 0], [0, -rr - 3.6, 0], .3, .9, .05);
        k.push([0, -rr - 4.6, 0]); habitat(); k.pop();
    }
    return assemble([[k]]);
}

/** Field laboratory: two of four instruments (accelerator ring, coil stack, long antennas, plasma sphere in
 * a cage) around a hub. */
function laboratorio(d, st) {
    const k = new Kit(st), spin = new Kit(st), kits = [[k]], list = ['acceleratore', 'bobine', 'antenne', 'plasma'], main = d.cycle('apparato', list), second = d.choose('secondo apparato', list.filter(x => x !== main));
    hub(k, d, 1.3, 1.0);
    const build = (what, y, big) => {
        if (y) { k.steel(); k.cyl(.25, .25, Math.min(0, y), Math.max(0, y), 10); }
        if (what === 'acceleratore') {
            const R = big ? d.range(5, 6.4) : d.range(3, 3.8), mags = d.count('magneti', 12, 24);
            k.push([0, y, 0]); k.steel(); k.torus(R, .3, st.seg(64), 8);
            around(mags, (a, s) => { k.push([0, 0, 0], [0, -a, 0]); k.paint(s % 2 ? st.accent : st.trim, .4, .4, s % 2 ? .6 : 0); k.box([R, 0, 0], [.45, .45, .3], .3); k.pop(); });
            around(3, a => { k.push([0, 0, 0], [0, a, 0]); k.steel(); k.beam([1.3, 0, 0], [R - .4, 0, 0], .07); k.pop(); }, .3);
            k.push([R, 0, 0], [Math.PI / 2, 0, 0]); k.hull(); k.cyl(1.0, 1.0, -.9, .9, st.seg(20), { bands: 3 }); k.accent(.8); for (const yy of [-.6, 0, .6]) k.cyl(1.04, 1.04, yy - .05, yy + .05, st.seg(20), { caps: false }); k.pop();
            k.light([-R, .5, 0], WHITE, .1, 1); k.pop();
        } else if (what === 'bobine') {
            const n = d.count('bobine', 3, 7), Rc = big ? d.range(2.2, 2.8) : d.range(1.4, 1.8), L = big ? 7 : 4.4;
            k.push([0, y, 0]); k.steel(); k.cyl(.35, .35, -L / 2, L / 2, 12, { bands: 4 });
            for (let i = 0; i < n; i++) { const yy = -L / 2 + L * (i + .5) / n; k.push([0, yy, 0]); k.trim(); k.torus(Rc, .28, st.seg(40), 8); k.accent(i % 2 ? .4 : 1.4); k.torus(Rc, .31, st.seg(40), 3); k.steel(); around(4, a => k.beam([Math.cos(a) * .35, 0, Math.sin(a) * .35], [Math.cos(a) * (Rc - .25), 0, Math.sin(a) * (Rc - .25)], .05)); k.pop(); }
            k.light([0, L / 2 + .3, 0], WHITE, .1, 1.2); k.pop();
        } else if (what === 'antenne') {
            const n = d.count('antenne', 2, 4), len = big ? d.range(7, 9) : d.range(4, 5.5);
            k.push([0, y, 0]);
            around(n, (a, s) => { const tip = [Math.cos(a) * len, 0, Math.sin(a) * len]; k.steel(); k.beam([Math.cos(a) * 1.2, 0, Math.sin(a) * 1.2], tip, .06); for (let b = 1; b <= 5; b++) { const p = scale(tip, b / 6 + .1), t = [-Math.sin(a), 0, Math.cos(a)], w = .9 - b * .1; k.beam(add(p, scale(t, -w)), add(p, scale(t, w)), .035); } k.light(tip, s % 2 ? RED : GREEN, .09, .9 + s * .2); }, .2);
            k.pop();
        } else {
            const r = big ? d.range(1.5, 2) : d.range(1, 1.3), cage = d.choose('gabbia', ['icosaedro', 'dodecaedro', 'cubottaedro', 'ottaedro']);
            k.push([0, y, 0]); k.paint(st.accent, 0, .4, 2.6); k.sphere([0, 0, 0], r, 24, 16); k.steel(); polyFrame(k, cage, [0, 0, 0], r * 1.6, .07);
            k.lights.push({ p: [0, y, 0], color: st.accent, size: r * 2.4, blink: 0, flame: 1 }); k.pop();
        }
    };
    build(main, main === 'antenne' ? 0 : main === 'acceleratore' ? 0 : 3.4, true);
    build(second, -3.4, false);
    if (main !== 'acceleratore' && second !== 'acceleratore') { k.push([0, -1.0, 0]); wings(k, st.coils ? 'radiatori' : 'solari', 4, 1.8, 1.3); k.pop(); }
    k.push([1.3, .4, 0]); dockPort(k, 3); k.pop();
    return assemble(kits);
}

/** Cryogenic depot: tanks in a cluster, a bundle, a stack or a ring, sunshields towards the star, radiators. */
function deposito(d, st) {
    const k = new Kit(st), layout = d.cycle('serbatoi', ['grappolo', 'fascio', 'pila', 'anello']), shields = d.count('schermi', 1, 3), film = d.choose('pellicola', ['oro', 'argento']), form = d.choose('schermo', ['disco', 'esagono', 'quadrato']);
    let top = 0, spread = 4.2;
    if (layout === 'grappolo') {
        const n = d.count('sfere', 4, 8), base = n <= 4 ? 'tetraedro' : n <= 6 ? 'ottaedro' : 'cubo', V = solid(base).V.slice(0, n), r = d.range(1.3, 1.7), D = r + 1.6;
        k.steel(); polyFrame(k, base, [0, 0, 0], D * .55, .08, false);
        for (const v of V) { const c = scale(v, D); k.steel(); k.beam([0, 0, 0], c, .1); tank(k, c, r, FROST, .2); k.light(add(c, scale(v, r + .1)), WHITE, .07, 1 + v[1]); }
        top = D + r; spread = D + r;
    } else if (layout === 'fascio') {
        const n = d.count('cilindri', 3, 7), L = d.range(5.5, 7.5), r = d.range(.7, .95), ring = r * 1.25 / Math.sin(Math.PI / n);
        k.steel(); k.cyl(.4, .4, -L / 2 - .5, L / 2 + .5, 12, { bands: 4 });
        around(n, a => { k.push([Math.cos(a) * ring, 0, Math.sin(a) * ring]); capsuleTank(k, r, -L / 2 + r, L / 2 - r, FROST); k.pop(); }, .2);
        for (const y of [-L / 3, L / 3]) { k.push([0, y, 0]); k.steel(); k.torus(ring, .1, 32, 6); k.pop(); }
        top = L / 2 + .5; spread = ring + r + 1;
    } else if (layout === 'pila') {
        const n = d.count('sfere', 3, 5), sizes = Array.from({ length: n }, () => d.range(1.1, 1.6)); let y = -sizes.reduce((s, r) => s + r, 0) - (n - 1) * .25;
        k.steel(); k.cyl(.3, .3, y, -y, 10);
        for (const r of sizes) { y += r; tank(k, [0, y, 0], r, FROST, .2); for (const a of [0, Math.PI / 2]) { k.push([0, y, 0], [Math.PI / 2, a, 0]); k.steel(); k.torus(r * 1.01, .05, 32, 4); k.pop(); } y += r + .5; }
        top = y; spread = 3.4;
    } else {
        const n = d.count('serbatoi', 6, 10), Rr = d.range(3.2, 4.2), r = Math.min(.8, Rr * Math.sin(Math.PI / n) * .8), len = 2 * Rr * Math.sin(Math.PI / n) - .3;
        hub(k, d, 1.2, .9);
        around(n, a => { k.push([Math.cos(a) * Rr, 0, Math.sin(a) * Rr], [0, -a, 0]); k.push([0, 0, 0], [Math.PI / 2, 0, 0]); capsuleTank(k, r, -len / 2 + r, len / 2 - r, FROST); k.pop(); k.pop(); k.steel(); k.beam([Math.cos(a) * 1.2, 0, Math.sin(a) * 1.2], [Math.cos(a) * (Rr - r), 0, Math.sin(a) * (Rr - r)], .07); }, Math.PI / n);
        top = 1.6; spread = Rr + r + .4;
    }
    const color = film === 'oro' ? FOIL : SILVER, sides = form === 'disco' ? st.seg(36) : form === 'esagono' ? 6 : 4;
    for (let s = 0; s < shields; s++) { const R = spread * (1.05 + s * .1) / (sides === 4 ? 1.2 : 1), y = top + .9 + s * .35; k.paint(s % 2 ? SILVER : color, .8, .3); k.cyl(R, R, y - .02, y + .02, sides, { start: sides === 4 ? Math.PI / 4 : 0 }); }
    k.steel(); k.cyl(.25, .25, top, top + .9 + shields * .35, 8);
    const bottom = layout === 'anello' ? -1.6 : -top - .4;
    k.push([0, bottom, 0]); k.hull(); k.box([0, 0, 0], [1.0, .5, 1.0], .4, 4); k.windows([-.7, .1, 1.01], 5, .3); k.push([1.0, 0, 0]); dockPort(k, 3); k.pop(); k.push([0, -.5, 0], [Math.PI, 0, 0]); mast(k, 1.5, 2, 1); k.pop();
    k.push([0, 0, 0], [0, Math.PI / 4, 0]); for (const side of [1, -1]) { k.steel(); k.beam([0, 0, side * 1.0], [0, 0, side * 1.6], .06); k.push([0, 0, side * 2.8], [0, Math.PI / 2, 0]); radiator(k, 2.4, 1.6, 4, 0); k.pop(); } k.pop();
    k.pop();
    if (st.pipes) hazardBand(k, .45, top * .2, top * .3, 16);
    if (st.coils) coil(k, .7, -.3, .3, 2, .05);
    return assemble([[k]]);
}

/** Polyhedral station: a solid core with lit faces, an optional frame of another solid, a torus knot around
 * it, satellite solids at the vertices of a tetrahedron, octahedron or cube. */
function poliedrica(d, st) {
    const k = new Kit(st), spin = new Kit(st), kits = [[k]], core = d.cycle('solido', SOLID_NAMES), r = d.range(2.2, 2.9);
    const cage = d.choose('gabbia', ['nessuna', 'cubo', 'ottaedro', 'icosaedro', 'dodecaedro', 'cubottaedro']), knot = d.choose('nodo', ['nessuno', '2,3', '2,5', '3,4', '3,5', '2,7', '3,2']), sats = d.choose('satelliti', [0, 4, 6, 8]);
    const tints = [st.hull, shade(st.hull, .78), shade(st.hull, .9)];
    polyhedron(k, core, [0, 0, 0], r, tints, .1);
    const { V, faces } = solid(core);
    faces.forEach((f, i) => { if (i % 3) return; const c = scale(f.reduce((s, j) => add(s, V[j]), [0, 0, 0]), 1 / f.length), cl = Math.hypot(...c), n = scale(c, 1 / cl), t0 = V[f[0]], t = [t0[0] - c[0], t0[1] - c[1], t0[2] - c[2]], tl = Math.hypot(...t); k.pane(scale(n, r * cl + .115), n, t.map(v => v / tl), r * tl * .5, r * tl * .16); });
    if (cage !== 'nessuna') { k.trim(); polyFrame(k, cage, [0, 0, 0], r * 1.55, .07); }
    if (knot !== 'nessuno') {
        const [p, q] = knot.split(',').map(Number), pts = torusKnot(p, q, r * d.range(2.15, 2.35), r * .42, 200);
        spin.paint(shade(st.accent, .75), .5, .4, .12); tube(spin, pts, .2, 8, true);
        pts.forEach((pt, i) => { if (i % 40 === 0) spin.light(pt, WHITE, .08, 1 + i / 100); });
        kits.push([spin, [0, .08, 0]]);
    }
    if (sats) {
        const e = Math.atan(1 / Math.SQRT2), W = sats === 6 ? Array.from({ length: 6 }, (_, i) => { const a = i * Math.PI / 3, z = i % 2 ? -1 : 1; return [Math.cos(a) * Math.cos(e), z * Math.sin(e), Math.sin(a) * Math.cos(e)]; }) : solid(sats === 4 ? 'tetraedro' : 'cubo').V;
        const small = d.choose('satellite', ['tetraedro', 'cubo', 'ottaedro', 'icosaedro']), D = r * 3.1;
        for (const v of W) { const c = scale(v, D); k.steel(); k.beam(scale(v, r * .85), scale(v, D - .5), .07); k.hull(); polyhedron(k, small, c, .65, [st.hull, shade(st.hull, .8)]); k.light(scale(v, D + .75), v[1] >= 0 ? WHITE : AMBER_LIGHT, .08, 1.2 + v[0]); }
    }
    const docks = d.count('attracchi', 1, 2);
    for (let s = 0; s < docks; s++) { k.push([0, 0, 0], [0, 0, s ? Math.PI / 2 : -Math.PI / 2]); k.steel(); k.beam([r * .8, 0, 0], [r * 1.9, 0, 0], .12); k.push([r * 1.9 + .9, 0, 0]); hangar(k, .6, 1.4, 3, 6); k.pop(); k.pop(); }
    if (docks === 1) { k.push([0, r * .95, 0]); mast(k, 1.6, 2, 1); k.pop(); }
    if (st.coils) coil(k, r * 1.05, -r * .2, r * .2, 2, .06);
    if (st.pipes) hazardBand(k, r * .7, -r * 1.02, -r * .9, 16);
    return assemble(kits);
}

export const STATIONS = {
    porto: { name: 'Porto', build: porto, size: 'circa 1,2 km', about: 'Scalo principale del sistema, con attracchi per le navi e alloggi per gli equipaggi.' },
    porta: { name: 'Porta', build: porta, size: 'circa 2 km', about: 'Anello di passaggio verso gli altri sistemi della galassia, rivolto verso la stella.' },
    raffineria: { name: 'Raffineria', build: raffineria, size: 'circa 1,6 km', about: 'Separa e immagazzina i gas raccolti nel sistema, con colonne di distillazione e serbatoi.' },
    radiotelescopio: { name: 'Radiotelescopio', build: radiotelescopio, size: 'circa 1,5 km', about: 'Ascolta il cielo nelle onde radio con una o più antenne paraboliche.' },
    telescopio: { name: 'Telescopio', build: telescopio, size: 'circa 1 km', about: 'Osserva il cielo nel visibile e nell\'infrarosso, lontano dalla luce della stella.' },
    serra: { name: 'Serra', build: serra, size: 'circa 1,8 km', about: 'Coltiva piante in moduli trasparenti e nutre gli equipaggi del sistema.' },
    miniera: { name: 'Miniera', build: miniera, size: 'circa 1,5 km', about: 'Estrae metalli e ghiacci da un asteroide catturato nella fascia.' },
    cantiere: { name: 'Cantiere', build: cantiere, size: 'circa 1,4 km', about: 'Costruisce e ripara gli scafi delle navi, vicino al porto del sistema.' },
    centrale: { name: 'Centrale', build: centrale, size: 'circa 1,3 km', about: 'Produce energia per il sistema e cede il calore allo spazio con grandi radiatori.' },
    laboratorio: { name: 'Laboratorio dei campi', build: laboratorio, size: 'circa 1,2 km', about: 'Studia campi magnetici e plasmi con bobine, acceleratori e antenne.' },
    deposito: { name: 'Deposito criogenico', build: deposito, size: 'circa 1 km', about: 'Conserva gas liquefatti a bassissima temperatura, al riparo dalla luce della stella.' },
    poliedrica: { name: 'Stazione poliedrica', build: poliedrica, size: 'circa 1 km', about: 'Stazione di calcolo costruita attorno a un poliedro.' }
};
