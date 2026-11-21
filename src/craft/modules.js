/** Library of station modules for the type grammar (src/craft/grammar.js). Every module is drawn along +y
 * from its socket (y = 0) up to y = L, within about R of the axis, so any family can offer a socket and any
 * role can fill it. The modules are grouped by the role that uses them: habitation, shipyard, foundry,
 * chemistry, energy, research, observation, agriculture, storage and communications. Each draws a neck
 * from the socket to its base, so it stands clear of curved hulls. */
import { TAU, WHITE, RED, GREEN, AMBER } from './kit.js';
import { solarWing, radiator, mast, smallDish, tank, capsuleTank, hazardBand, coil, pipe, windowRing, polyhedron, hangar } from './parts.js';

const around = (n, f, offset = 0) => { for (let s = 0; s < n; s++) f(offset + s / n * TAU, s); };
export const HOT = [1, .42, .16, 1], FLARE = [1, .58, .2, 1], LEAF = [.25, .6, .28, 1], ALGAE = [.3, .95, .55, 1], ICE = [.82, .9, .98, 1], ORE = [.24, .2, .17, 1], MIRROR = [.86, .88, .92, 1];
const BOXES = [[.62, .3, .18, 1], [.2, .36, .5, 1], [.55, .52, .2, 1], [.3, .45, .3, 1], [.5, .5, .52, 1]];

/** Neck from the socket to the base of a module at height h, with a collar on the hull. */
export function strut(k, h, r) {
    const st = k.style;
    k.dark(); k.cyl(r * .62, r * .62, -.05, .12, st.seg(14));
    if (h <= .12) return;
    if (st.smooth) { k.hull(); k.cyl(r * .5, r * .36, .1, h, st.seg(14), { caps: false }); }
    else if (st.facets) { k.steel(); k.cyl(r * .42, r * .42, .1, h, 6, { caps: false }); k.trim(); k.cyl(r * .48, r * .48, h * .5 - .06, h * .5 + .06, 6, { caps: false }); }
    else if (h > 1.3) { k.steel(); k.truss([0, .1, 0], [0, h, 0], Math.min(.3, r * .38), .75, .035); }
    else { k.steel(); k.cyl(r * .3, r * .3, .1, h, 10, { caps: false }); }
}
/** Top of a cylindrical module: dome in biology, cone in mathematics, flat cap with a rim elsewhere. */
function cap(k, r, y, seg) {
    const st = k.style;
    if (st.smooth) k.sphere([0, y, 0], r, seg, Math.max(4, Math.round(seg / 4)), 0, Math.PI / 2);
    else if (st.facets) k.cyl(r, r * .35, y, y + r * .55, seg);
    else { k.cyl(r, r * .82, y, y + r * .22, seg); k.dark(); k.cyl(r * .45, r * .45, y + r * .22, y + r * .3, seg); }
}
const tip = (k, y, color = WHITE, blink = 1) => k.light([0, y, 0], color, .1, blink);
const side = (k, r, y, blink = 1.1) => { k.light([r, y, 0], GREEN, .08, blink); k.light([-r, y, 0], RED, .08, blink); };

// Habitation
function abitativo(k, d, L, R) {
    const seg = k.style.seg(20), r = R * .78, y0 = L * .16, y1 = L * .8;
    strut(k, y0, r); k.hull(); k.cyl(r, r, y0, y1, seg, { bands: Math.max(1, Math.round((y1 - y0) / .7)) });
    for (const f of [.3, .55, .8]) windowRing(k, r, y0 + (y1 - y0) * f, Math.round(r * 9), .13, .08, seg);
    k.accent(.4); k.cyl(r * 1.04, r * 1.04, y0 + .05, y0 + .2, seg, { caps: false });
    k.hull(); cap(k, r, y1, seg); side(k, r * 1.05, y1);
}
function cupola(k, d, L, R) {
    const seg = k.style.seg(24), r = R * .95, y0 = L * .12, h = Math.min(L * .28, .9), top = y0 + h, rr = Math.min(r, L - top);
    strut(k, y0, r * .5); k.dark(); k.cyl(r, r, y0, top, seg, { bands: 1 }); windowRing(k, r, y0 + h * .5, Math.round(r * 10), .14, .09, seg);
    k.glass(.7); if (k.style.facets) k.cyl(rr, rr * .3, top, top + rr * .75, seg); else k.sphere([0, top, 0], rr, seg, 8, 0, Math.PI / 2);
    k.trim(); k.cyl(r * 1.02, r * 1.02, top - .06, top + .06, seg, { caps: false }); tip(k, top + rr + .1, WHITE, .7);
}
function baccelli(k, d, L, R) {
    const seg = k.style.seg(16), x = R * .55, rr = R * .4;
    strut(k, L * .92, R * .45);
    around(3, (a, s) => {
        const y = L * (.34 + .24 * s), c = [Math.cos(a) * x, y, Math.sin(a) * x];
        k.steel(); k.beam([0, y, 0], c, .05); k.hull(); k.sphere(c, rr, seg, Math.max(6, Math.round(seg / 2)));
        k.push(c); windowRing(k, rr, 0, Math.round(rr * 13), .12, .07); k.pop();
    }, a0(d)); tip(k, L * .95);
}
function anelloAbitato(k, d, L, R) {
    const y = L * .62, Rr = R * .88, seg = k.style.seg(36), sides = k.style.facets ? 6 : 10;
    strut(k, L * .95, R * .4); k.push([0, y, 0]); k.hull(); k.torus(Rr, R * .17, seg, sides);
    around(3, a => { k.steel(); k.beam([0, 0, 0], [Math.cos(a) * Rr, 0, Math.sin(a) * Rr], .05); });
    around(Math.round(Rr * 7), a => k.pane([Math.cos(a) * (Rr + R * .17), 0, Math.sin(a) * (Rr + R * .17)], [Math.cos(a), 0, Math.sin(a)], [-Math.sin(a), 0, Math.cos(a)], .14, .08));
    k.pop(); tip(k, L * .98, RED, 1.3);
}
function blocco(k, d, L, R) {
    const n = 3; let y = L * .12; strut(k, y, R * .5);
    for (let s = 0; s < n; s++) {
        const w = R * (.9 - s * .2), z = R * (.6 - s * .12), h = (L * .82 - L * .12) / n;
        k.hull(); k.box([0, y + h / 2, 0], [w, h / 2 - .03, z], .45, s === 0 ? 3 : 0);
        for (const sz of [1, -1]) k.windows([-w + .2, y + h * .55, sz * (z + .02)], Math.max(2, Math.round(w * 2 / .3)), .3);
        k.accent(.3); k.box([0, y + h - .02, 0], [w + .04, .04, z + .04]); y += h;
    }
    tip(k, y + .1);
}
function parco(k, d, L, R) {
    const seg = k.style.seg(24), r = R * .9, y0 = L * .14, rr = Math.min(r, L - y0 - .2);
    strut(k, y0, r * .5); k.hull(); k.cyl(r, r, y0 - .1, y0 + .25, seg);
    k.paint(LEAF, .05, .7, .5); k.sphere([0, y0 + .25, 0], rr * .92, seg, 6, 0, Math.PI / 2);
    k.steel(); for (let m = 0; m < 6; m++) { k.push([0, y0 + .25, 0], [0, m / 6 * Math.PI, 0]); k.torus(rr * .95, .035, seg, 4, Math.PI, 0); k.pop(); }
    k.light([0, y0 + .25 + rr, 0], WHITE, .1, .6);
}

// Shipyard
function scalo(k, d, L, R) {
    const w = R * .85, z = R * .55, y0 = L * .1, n = Math.max(2, Math.round((L - y0) / .9));
    strut(k, y0, R * .6); k.steel();
    for (const sx of [1, -1]) for (const sz of [1, -1]) k.beam([sx * w, y0, sz * z], [sx * w, L, sz * z], .06);
    for (let i = 0; i <= n; i++) { const y = y0 + (L - y0) * i / n; for (const sz of [1, -1]) k.beam([-w, y, sz * z], [w, y, sz * z], .04); for (const sx of [1, -1]) k.beam([sx * w, y, -z], [sx * w, y, z], .04); }
    k.dark(); k.beam([0, y0 + .25, 0], [0, L - .3, 0], .07);
    for (let i = 1; i < n; i++) { k.push([0, y0 + (L - y0) * i / n, 0]); k.trim(); k.torus(w * .62, .045, 16, 4, Math.PI * 1.3, Math.PI * .35); k.pop(); }
    around(3, (a, s) => k.light([Math.cos(a) * w * .6, y0 + (L - y0) * (.3 + .2 * s), Math.sin(a) * z * .6], AMBER, .08, 2.6 + s * .7), a0(d));
    k.light([w, L, z], GREEN, .08, .9); k.light([-w, L, -z], RED, .08, .9);
}
function gru(k, d, L, R) {
    const h = L * .82, arm = R * 1.6;
    strut(k, .3, R * .5); k.steel(); k.truss([0, .3, 0], [0, h, 0], .22, .6, .035);
    k.truss([-arm * .35, h + .25, 0], [arm, h + .25, 0], .18, .55, .03); k.dark(); k.box([-arm * .35 - .25, h + .25, 0], [.3, .3, .3]);
    k.steel(); k.beam([arm * .85, h + .1, 0], [arm * .85, h - L * .35, 0], .015); k.trim(); k.box([arm * .85, h - L * .35 - .12, 0], [.12, .12, .12]);
    k.light([arm, h + .45, 0], RED, .09, 1); k.light([0, h + .6, 0], WHITE, .09, .6);
}
function bacino(k, d, L, R) {
    const w = R * .75, y0 = L * .1; strut(k, y0, R * .6); k.steel();
    for (const sx of [1, -1]) { k.box([sx * w, (y0 + L) / 2, 0], [.12, (L - y0) / 2, .16], .5); for (let b = 1; b <= 4; b++) k.light([sx * w, y0 + (L - y0) * b / 4.5, .2], GREEN, .06, -b * .2); }
    k.box([0, y0 + .1, 0], [w, .1, .2]);
    k.hull(); k.push([0, y0 + .2, 0]); k.capsule(w * .5, .4, L * .7 - y0, k.style.seg(14), 2); k.pop();
    k.glow(k.style.window, 1.6); k.cyl(w * .3, w * .3, y0 + .3, y0 + .38, 12); k.light([0, L, 0], WHITE, .1, .8);
}
function hangarModulo(k, d, L, R) {
    const Lh = Math.max(1.2, L - 2.4), r = R * .7;
    strut(k, .25, r); k.push([0, .75 + Lh / 2, 0], [0, 0, Math.PI / 2]); hangar(k, r, Lh, 3, k.style.facets ? 6 : k.style.smooth ? 12 : 8); k.pop();
}
function rampa(k, d, L, R) {
    const w = R * .5, y0 = L * .08; strut(k, y0, R * .5); k.steel();
    for (const sx of [1, -1]) { k.beam([sx * w, y0, 0], [sx * w, L, 0], .07); for (let b = 1; b <= 5; b++) k.light([sx * w, y0 + (L - y0) * b / 5, 0], AMBER, .05, -b * .15); }
    for (let i = 0; i <= 4; i++) k.beam([-w, y0 + (L - y0) * i / 4, 0], [w, y0 + (L - y0) * i / 4, 0], .04);
    k.hull(); k.push([0, L * .55, .25]); k.cyl(w * .55, w * .2, 0, L * .3, k.style.seg(10)); k.cyl(w * .55, w * .55, -L * .2, 0, k.style.seg(10), { caps: false }); k.pop();
    k.flame([0, L * .55 - L * .25, .25], [.6, .8, 1, 1], .4);
}

function officina(k, d, L, R) {
    const w = R * .8, z = R * .55, y0 = L * .12, y1 = L * .62; strut(k, y0, R * .5);
    k.hull(); k.box([0, (y0 + y1) / 2, 0], [w, (y1 - y0) / 2, z], .45, 3);
    k.paint([.5, .46, .38, 1], .2, .6, .5); k.box([0, (y0 + y1) / 2, z + .01], [w * .7, (y1 - y0) * .4, .02]); k.glow(k.style.window, 2); k.box([0, y0 + .1, z + .02], [w * .66, .04, .02]);
    for (const sx of [1, -1]) { const P = [[sx * w * .7, y1, 0], [sx * w * .9, y1 + L * .2, z * .4], [sx * w * .4, L * .95, z * .6]]; k.steel(); k.beam(P[0], P[1], .06); k.beam(P[1], P[2], .05); k.dark(); k.sphere(P[1], .1, 8, 6); k.light(P[2], AMBER, .07, 2.4 + sx * .4); }
    k.light([w, y1, z], GREEN, .07, .9); k.light([-w, y1, z], RED, .07, .9);
}

// Foundry
function forno(k, d, L, R) {
    const seg = k.style.seg(18), r = R * .85, y0 = L * .1, y1 = L * .55;
    strut(k, y0, r); k.dark(); k.cyl(r, r * .92, y0, y1, seg, { bands: 2 });
    for (const f of [.3, .62]) { k.glow(HOT, 1.6); k.cyl(r * 1.01, r * .99, y0 + (y1 - y0) * f, y0 + (y1 - y0) * f + .12, seg, { caps: false }); }
    k.steel(); k.cyl(r * .92, r * .3, y1, y1 + r * .5, seg); k.dark(); k.cyl(r * .22, r * .18, y1 + r * .5, L * .96, 10);
    k.glow(FLARE, 2); k.cyl(r * .2, r * .2, L * .96, L * .98, 10); k.flame([0, L, 0], FLARE, .5);
}
function tramoggia(k, d, L, R) {
    const r = R * .9, y0 = L * .35; strut(k, .2, R * .4); k.steel();
    around(4, a => k.beam([Math.cos(a) * r * .5, .15, Math.sin(a) * r * .5], [Math.cos(a) * r * .8, y0 + .2, Math.sin(a) * r * .8], .05), TAU / 8);
    k.trim(); k.cyl(r * .25, r, y0, L * .85, k.style.seg(14), { caps: false }); k.cyl(r * .25, r, y0, L * .85, k.style.seg(14), { caps: false, outward: false });
    k.paint(ORE, .1, .9); k.sphere([0, L * .78, 0], r * .92, k.style.seg(14), 4, 0, Math.PI * .28);
    hazardBand(k, r * 1.01, L * .8, L * .86, k.style.seg(14)); k.light([r, L * .86, 0], AMBER, .08, 1.5);
}
function frantoio(k, d, L, R) {
    const w = R * .85, y0 = L * .15, h = L * .45; strut(k, y0, R * .5);
    k.dark(); k.box([0, y0 + h / 2, 0], [w, h / 2, R * .5], .5, 4);
    for (const sz of [1, -1]) { k.push([0, y0 + h + .25, sz * R * .25], [0, 0, Math.PI / 2]); k.steel(); k.cyl(.28, .28, -w * .9, w * .9, 12, { bands: 3 }); k.pop(); }
    k.trim(); k.push([w * .6, y0 + h, 0], [0, 0, -.6]); k.box([0, L * .22, 0], [.14, L * .24, .25]); k.pop();
    k.glow(HOT, 1.2); k.box([0, y0 + .2, R * .51], [w * .7, .06, .02]); k.light([-w, y0 + h, 0], AMBER, .08, 1.2);
}
function camino(k, d, L, R) {
    const r = R * .45, seg = k.style.seg(14); strut(k, .25, r * 1.3);
    k.dark(); k.cyl(r, r * .6, .25, L * .94, seg, { bands: 4 }); hazardBand(k, r * .68, L * .78, L * .86, seg);
    k.glow(FLARE, 2.2); k.cyl(r * .58, r * .58, L * .94, L * .96, seg); k.flame([0, L + .2, 0], FLARE, .7);
    k.light([r * .7, L * .6, 0], RED, .08, .8);
}
function radiatoriCaldi(k, d, L, R) {
    strut(k, L * .15, R * .4); k.steel(); k.cyl(.14, .14, L * .15, L, 8);
    for (const sx of [1, -1]) { k.push([sx * R * .55, L * .58, 0]); radiator(k, R * .9, L * .75, 6, 1.4); k.pop(); }
    tip(k, L + .1, RED, 1);
}
function colata(k, d, L, R) {
    const w = R * .5, y0 = L * .12; strut(k, y0, R * .5);
    k.dark(); k.box([0, (y0 + L) / 2, 0], [w, (L - y0) / 2, w * .7], .6);
    for (let s = 0; s < 4; s++) { const y = y0 + (L - y0) * (s + .6) / 4.4; k.glow(HOT, 1.8); k.box([0, y, w * .71], [w * .7, .05, .02]); k.box([0, y, -w * .71], [w * .7, .05, .02]); }
    k.steel(); k.box([0, L + .05, 0], [w * 1.1, .06, w * .8]); k.light([w, L + .1, 0], AMBER, .08, 1.4);
}

// Chemistry
function colonna(k, d, L, R) {
    const r = R * .38, seg = k.style.seg(14); strut(k, .25, r * 1.4);
    k.hull(); k.cyl(r, r, .25, L * .9, seg, { bands: Math.max(2, Math.round(L / .8)) }); cap(k, r, L * .9, seg);
    for (let y = .7; y < L * .85; y += .65) { k.push([0, y, 0]); k.trim(); k.torus(r * 1.04, .035, seg, 4); k.pop(); }
    pipe(k, [[r * 1.6, .3, 0], [r * 1.6, L * .7, 0], [r * 1.05, L * .78, 0]], .06); k.light([0, L * .9 + r * .4, 0], RED, .08, .9);
}
function sfere(k, d, L, R) {
    const r = R * .48; strut(k, L * .9, R * .3);
    tank(k, [R * .45, L * .32, 0], r); tank(k, [-R * .45, L * .32, 0], r); tank(k, [0, L * .74, 0], r * .9);
    k.steel(); k.beam([R * .45, L * .32, 0], [-R * .45, L * .32, 0], .05); k.light([0, L * .74 + r * .95, 0], AMBER, .08, 1.1);
}
function torcia(k, d, L, R) {
    strut(k, .2, R * .4); k.steel(); k.truss([0, .2, 0], [0, L * .9, 0], .16, .55, .03);
    k.dark(); k.cyl(.12, .1, L * .5, L * .92, 8); hazardBand(k, .14, L * .85, L * .9, 10);
    k.glow(FLARE, 2.4); k.sphere([0, L * .94, 0], .12, 8, 6); k.flame([0, L + .25, 0], FLARE, .9);
}
function reattoreChimico(k, d, L, R) {
    const r = R * .6, y0 = L * .2; strut(k, y0, r);
    capsuleTank(k, r, y0 + r, L - r); hazardBand(k, r * 1.02, y0 + r + .2, y0 + r + .45, k.style.seg(18)); hazardBand(k, r * 1.02, L - r - .45, L - r - .2, k.style.seg(18));
    around(3, a => pipe(k, [[Math.cos(a) * r * 1.25, y0, Math.sin(a) * r * 1.25], [Math.cos(a) * r * 1.25, L - r, Math.sin(a) * r * 1.25], [Math.cos(a) * r * .6, L - r * .3, Math.sin(a) * r * .6]], .06), a0(d));
    k.light([0, L + .05, 0], AMBER, .08, 1.2);
}
function fascio(k, d, L, R) {
    strut(k, .2, R * .5); const n = 5;
    for (let p = 0; p < n; p++) { const x = (p - (n - 1) / 2) * R * .28, bend = (p % 2 ? 1 : -1) * R * .4; pipe(k, [[x, .15, 0], [x, L * (.55 + .07 * p), 0], [x, L * (.62 + .07 * p), bend], [x, L * .95, bend]], .07, p % 2 ? null : k.style.steel); }
    k.steel(); k.box([0, L * .4, 0], [R * .75, .06, .12]); k.light([0, L * .97, R * .4], AMBER, .07, 1.3);
}
function scambiatore(k, d, L, R) {
    const w = R * .8, y0 = L * .15; strut(k, y0, R * .5); k.steel();
    for (const sx of [1, -1]) k.beam([sx * w, y0, 0], [sx * w, L * .95, 0], .06);
    for (let s = 0; s < 3; s++) { const y = y0 + (L * .95 - y0) * (s + .5) / 3; k.push([0, y, 0], [0, 0, Math.PI / 2]); k.hull(); k.cyl(R * .28, R * .28, -w, w, k.style.seg(14), { bands: 3 }); k.pop(); }
    pipe(k, [[w * .9, y0 + .3, R * .3], [w * .9, L * .9, R * .3]], .06); k.light([0, L, 0], RED, .07, 1);
}

// Energy
function pannelli(k, d, L, R) {
    strut(k, .2, R * .35); k.steel(); k.cyl(.1, .1, .2, L, 8);
    for (const f of [.42, .8]) { k.push([0, L * f, 0]); for (const sx of [1, -1]) { k.steel(); k.beam([0, 0, 0], [sx * .5, 0, 0], .04); k.push([sx * (.5 + R * .9), 0, 0]); solarWing(k, R * 1.8, L * .3, [Math.round(R * 2.2), 2]); k.pop(); } k.pop(); }
    tip(k, L + .1, RED, 1);
}
function toroFusione(k, d, L, R) {
    const y = L * .55, Rr = R * .72, seg = k.style.seg(32); strut(k, y - .3, R * .5);
    k.dark(); k.cyl(R * .32, R * .32, y - .5, y + .5, k.style.seg(14));
    k.push([0, y, 0]); k.hull(); k.torus(Rr, R * .22, seg, k.style.facets ? 6 : 10);
    around(8, a => { k.push([Math.cos(a) * Rr, 0, Math.sin(a) * Rr], [0, -a, Math.PI / 2]); coil(k, R * .27, -.1, .1, 1, .05); k.pop(); });
    k.glow(k.style.accent, 1.6); k.torus(Rr, R * .08, seg, 6); k.pop();
    around(3, a => { k.steel(); k.beam([0, y, 0], [Math.cos(a) * Rr, y, Math.sin(a) * Rr], .05); }, a0(d)); tip(k, y + .7, WHITE, .5);
}
function radiatori(k, d, L, R) {
    strut(k, .2, R * .35); k.steel(); k.cyl(.12, .12, .2, L, 8);
    for (const sx of [1, -1]) { k.push([sx * R * .55, L * .55, 0]); radiator(k, R * .9, L * .82, 7, 0); k.pop(); } tip(k, L + .1);
}
function trallicioElettrico(k, d, L, R) {
    strut(k, .2, R * .4); k.steel(); k.truss([0, .2, 0], [0, L * .8, 0], .2, .6, .03);
    for (let s = 0; s < 5; s++) { k.push([0, L * (.82 + s * .03), 0]); k.paint([.75, .72, .62, 1], .1, .4); k.cyl(R * (.35 - s * .03), R * (.35 - s * .03), -.03, .03, 10); k.pop(); }
    k.glow(k.style.accent, 2.2); k.sphere([0, L * .98, 0], R * .18, 10, 8); k.light([0, L, 0], WHITE, .12, 0);
}
function accumulatori(k, d, L, R) {
    const w = R * .7, y0 = L * .12; strut(k, y0, R * .5); k.steel();
    for (const sx of [1, -1]) for (const sz of [1, -1]) k.beam([sx * w, y0, sz * w * .6], [sx * w, L * .95, sz * w * .6], .05);
    for (let s = 0; s < 4; s++) { const y = y0 + (L * .95 - y0) * (s + .5) / 4; k.dark(); k.box([0, y, 0], [w * .85, (L - y0) / 10, w * .5]); k.glow(k.style.accent, 1.4); k.box([0, y, w * .51], [w * .7, .03, .01]); }
    k.light([w, L * .95, 0], GREEN, .07, .7);
}
function specchio(k, d, L, R) {
    strut(k, L * .35, R * .4); k.push([0, L * .4, 0]); k.paint(MIRROR, .95, .1); k.dish(R, R * .35, k.style.seg(28), 6);
    k.steel(); around(3, a => k.beam([Math.cos(a) * R * .9, R * .32, Math.sin(a) * R * .9], [0, R * 1.1, 0], .03)); k.glow(FLARE, 2.4); k.sphere([0, R * 1.1, 0], .14, 8, 6); k.pop();
    k.light([0, L * .4 + R * 1.15, 0], FLARE, .12, 0);
}

// Research
function laboratorio(k, d, L, R) {
    const w = R * .75, z = R * .5, y0 = L * .14, y1 = L * .7; strut(k, y0, R * .5);
    k.hull(); k.box([0, (y0 + y1) / 2, 0], [w, (y1 - y0) / 2, z], .4, 4);
    for (const sz of [1, -1]) for (const f of [.35, .7]) k.windows([-w + .2, y0 + (y1 - y0) * f, sz * (z + .02)], Math.round(w * 2 / .3), .3);
    k.steel(); k.cyl(R * .14, R * .14, y1, L * .85, 8); k.push([0, L * .85, 0]); smallDish(k, R * .35, .1); k.pop();
    k.trim(); k.cyl(R * .2, R * .2, y1, y1 + .4, 10); k.push([w * .6, y1, 0]); k.cyl(R * .16, R * .16, 0, .5, 10); k.pop(); side(k, w, y1);
}
function bobine(k, d, L, R) {
    const r = R * .3; strut(k, .2, r * 1.4); k.dark(); k.cyl(r, r, .2, L * .92, k.style.seg(12));
    coil(k, R * .62, L * .2, L * .85, Math.max(3, Math.round(L / .55)), .07); k.glow(k.style.accent, 2); k.sphere([0, L * .95, 0], r * .9, 12, 8); tip(k, L + .15, WHITE, .5);
}
function acceleratore(k, d, L, R) {
    const y = L * .7, Rr = R * .95, seg = k.style.seg(36); strut(k, y, R * .4);
    k.push([0, y, 0]); k.steel(); k.torus(Rr, .14, seg, 6);
    around(8, a => { k.push([Math.cos(a) * Rr, 0, Math.sin(a) * Rr], [0, -a, 0]); k.dark(); k.box([0, 0, 0], [.2, .22, .26]); k.accent(1.2); k.box([0, .23, 0], [.16, .02, .2]); k.pop(); });
    around(4, a => { k.steel(); k.beam([0, 0, 0], [Math.cos(a) * Rr, 0, Math.sin(a) * Rr], .04); }, TAU / 16);
    k.pop(); k.light([Rr, y + .3, 0], k.style.accent, .09, .8); k.light([-Rr, y + .3, 0], k.style.accent, .09, .8);
}
function braccio(k, d, L, R) {
    strut(k, .2, R * .35); k.steel(); k.cyl(.07, .05, .2, L * .95, 8);
    for (let s = 1; s <= 3; s++) k.box([0, L * s / 4, 0], [R * .3, .02, .02]);
    k.dark(); k.box([0, L * .95, 0], [R * .22, R * .16, R * .22], 0, 2); k.push([0, L * .95 + R * .16, 0]); smallDish(k, R * .3, .08); k.pop();
    k.light([R * .3, L * .5, 0], RED, .07, 1.4); k.light([0, L + .1, 0], WHITE, .08, .9);
}
function cameraVuoto(k, d, L, R) {
    const r = R * .62, c = L * .55; strut(k, c - r * .9, r * .6);
    k.hull(); k.sphere([0, c, 0], r, k.style.seg(18), Math.max(6, Math.round(k.style.seg(18) / 2)));
    for (const n of [[1, 0, 0], [-1, 0, 0], [0, 0, 1], [0, 0, -1], [0, 1, 0]]) { k.push([n[0] * r * .9, c + n[1] * r * .9, n[2] * r * .9], [0, Math.atan2(-n[2], n[0]), -Math.acos(n[1])]); k.steel(); k.cyl(r * .2, r * .2, 0, r * .4, 10); k.glow(k.style.window, 1.6); k.cyl(r * .14, r * .14, r * .4, r * .42, 10); k.pop(); }
    k.accent(.6); k.cyl(r * 1.01, r * 1.01, c - .06, c + .06, k.style.seg(18), { caps: false }); k.light([0, c + r * 1.35, 0], WHITE, .08, .7);
}
function campionatore(k, d, L, R) {
    strut(k, .2, R * .4);
    const P = [[0, .2, 0], [R * .55, L * .4, 0], [-R * .2, L * .72, 0], [R * .3, L * .95, 0]];
    for (let s = 0; s + 1 < P.length; s++) { k.steel(); k.beam(P[s], P[s + 1], .07 - s * .012); k.dark(); k.sphere(P[s + 1], .13, 8, 6); }
    k.trim(); for (const sz of [1, -1]) k.beam(P[3], [P[3][0] + .25, P[3][1] + .2, sz * .15], .025); k.light(P[2], AMBER, .07, 1.5);
}

// Observation
function parabola(k, d, L, R) {
    strut(k, L * .45, R * .35); k.push([0, L * .5, 0], [d.range(-.25, .25), 0, d.range(-.25, .25)]); smallDish(k, R * .95, R * .32); k.pop(); k.light([0, L * .5 + R * .95, 0], RED, .08, .8);
}
function telescopioModulo(k, d, L, R) {
    const r = R * .45, seg = k.style.seg(16), y0 = L * .18; strut(k, y0, r);
    k.hull(); k.cyl(r, r, y0, L * .85, seg, { bands: 3 }); k.dark(); k.cyl(r * .85, r * .85, L * .85, L * .7, seg, { caps: false, outward: false });
    k.trim(); k.cyl(r * 1.25, r * 1.05, L * .85, L, seg, { caps: false }); k.cyl(r * 1.23, r * 1.03, L * .85, L, seg, { caps: false, outward: false });
    k.paint(k.style.panel, .2, .3); k.box([0, L * .45, r + .25], [r * .8, L * .2, .02]); k.light([r, y0 + .3, 0], GREEN, .07, 1);
}
function schiera(k, d, L, R) {
    const w = R * .8, y0 = L * .4; strut(k, y0, R * .4); k.steel(); k.box([0, y0, 0], [w, .06, w * .6]);
    for (let i = 0; i < 2; i++) for (let j = 0; j < 2; j++) { k.push([(i - .5) * w, y0 + .5, (j - .5) * w * .7]); smallDish(k, R * .36, .1); k.pop(); }
    k.light([w, y0 + .1, 0], RED, .07, 1.1);
}
function schermoSolare(k, d, L, R) {
    const y0 = L * .3; strut(k, y0, R * .4);
    for (let s = 0; s < 4; s++) { k.paint(s % 2 ? MIRROR : [.75, .55, .3, 1], .7, .3); k.cyl(R * (1 - s * .06), R * (1 - s * .06), y0 + s * .14, y0 + s * .14 + .025, 6); }
    k.steel(); k.cyl(R * .12, R * .12, y0 + .5, L * .9, 8); k.hull(); k.cyl(R * .3, R * .3, L * .6, L * .92, k.style.seg(12)); k.dark(); k.cyl(R * .26, R * .26, L * .92, L * .8, 12, { caps: false, outward: false });
    k.light([R, y0, 0], WHITE, .07, .9);
}
function interferometro(k, d, L, R) {
    strut(k, .2, R * .35); k.steel(); k.cyl(.08, .08, .2, L * .9, 8); k.beam([-R * 1.2, L * .9, 0], [R * 1.2, L * .9, 0], .05);
    for (const x of [-R * 1.2, 0, R * 1.2]) { k.paint(MIRROR, .95, .1); k.cyl(R * .2, R * .2, L * .9, L * .9 + .05, 12); k.light([x, L * .9 + .1, 0], WHITE, .06, x ? 1.3 : 0); k.push([x, L * .9, 0]); k.paint(MIRROR, .95, .1); k.cyl(R * .22, R * .22, .05, .09, 12); k.pop(); }
}
function cupolaOttica(k, d, L, R) {
    const seg = k.style.seg(20), r = R * .75, y0 = L * .2, y1 = L * .5; strut(k, y0, r);
    k.hull(); k.cyl(r, r, y0, y1, seg, { bands: 1 }); k.paint(MIRROR, .7, .25); k.sphere([0, y1, 0], r, seg, 8, 0, Math.PI / 2);
    k.dark(); k.box([0, y1 + r * .55, r * .45], [r * .14, r * .5, r * .5]); k.light([0, y1 + r + .1, 0], RED, .08, .6);
}

// Agriculture
function serraModulo(k, d, L, R) {
    const r = R * .7, seg = k.style.seg(18), y0 = L * .15, y1 = L * .88; strut(k, y0, r);
    k.paint(LEAF, .05, .5, .55); k.cyl(r, r, y0, y1, seg, { caps: false });
    k.steel(); for (let y = y0; y <= y1 + .01; y += (y1 - y0) / 4) { k.push([0, y, 0]); k.torus(r * 1.02, .05, seg, 4); k.pop(); }
    around(6, a => k.beam([Math.cos(a) * r * 1.02, y0, Math.sin(a) * r * 1.02], [Math.cos(a) * r * 1.02, y1, Math.sin(a) * r * 1.02], .03));
    k.hull(); cap(k, r, y1, seg); k.cyl(r, r, y0 - .05, y0 + .08, seg); k.light([0, y1 + r * .5, 0], WHITE, .08, .6);
}
function biocupola(k, d, L, R) {
    const seg = k.style.seg(22), r = Math.min(R * .95, L * .75), y0 = L * .12; strut(k, y0, r * .5);
    k.hull(); k.cyl(r, r, y0 - .05, y0 + .15, seg); k.paint(LEAF, .05, .5, .6); k.sphere([0, y0 + .15, 0], r * .97, seg, 7, 0, Math.PI / 2);
    k.steel(); for (let m = 0; m < 4; m++) { k.push([0, y0 + .15, 0], [0, m / 4 * Math.PI, 0]); k.push([0, 0, 0], [Math.PI / 2, 0, 0]); k.torus(r, .04, seg, 4, Math.PI, Math.PI); k.pop(); k.pop(); }
    k.light([0, y0 + .15 + r + .05, 0], WHITE, .08, .6);
}
function vasche(k, d, L, R) {
    strut(k, L * .12, R * .5); k.steel(); k.cyl(R * .8, R * .8, L * .12, L * .18, k.style.seg(14));
    around(6, (a, s) => {
        const h = L * (.7 + .05 * (s % 3));
        k.push([Math.cos(a) * R * .55, 0, Math.sin(a) * R * .55]); k.paint(ALGAE, .05, .3, 1.1); k.cyl(R * .17, R * .17, L * .18, h, 10); k.steel(); k.cyl(R * .19, R * .19, h, h + .08, 10); k.pop();
    }, a0(d));
    k.light([0, L * .2, R * .8], GREEN, .07, .8);
}
function petali(k, d, L, R) {
    strut(k, L * .3, R * .4); k.hull(); k.cyl(R * .35, R * .2, L * .3, L * .42, k.style.seg(12));
    around(6, a => { k.push([0, L * .4, 0], [0, -a, 0]); k.push([R * .25, 0, 0], [0, 0, .85]); k.paint(MIRROR, .95, .12); k.extrude([[0, -.25], [L * .6, -R * .32], [L * .62, R * .32], [0, .25]], -.02, .02); k.pop(); k.pop(); });
    k.paint(LEAF, .05, .5, .7); k.sphere([0, L * .45, 0], R * .3, 12, 8); k.light([0, L * .45 + R * .35, 0], WHITE, .08, .6);
}
function anelloVerde(k, d, L, R) {
    const y = L * .6, Rr = R * .8, seg = k.style.seg(32); strut(k, L * .95, R * .35);
    k.push([0, y, 0]); k.paint(LEAF, .05, .5, .6); k.torus(Rr, R * .22, seg, 10);
    k.steel(); around(8, a => { k.push([Math.cos(a) * Rr, 0, Math.sin(a) * Rr], [0, -a, Math.PI / 2]); k.torus(R * .23, .03, 10, 4); k.pop(); });
    around(3, a => k.beam([0, 0, 0], [Math.cos(a) * Rr, 0, Math.sin(a) * Rr], .04), a0(d)); k.pop(); tip(k, L, WHITE, .7);
}
function alveare(k, d, L, R) {
    strut(k, L * .15, R * .45); const r = R * .32, h = (L * .82) / 3;
    for (let s = 0; s < 3; s++) around(s === 1 ? 3 : 1, (a, q) => {
        const x = s === 1 ? Math.cos(a) * r * 1.7 : 0, z = s === 1 ? Math.sin(a) * r * 1.7 : 0, y = L * .15 + s * h;
        k.push([x, y, z]); k.paint(LEAF, .05, .5, .55); k.cyl(r, r, 0, h * .92, 6); k.steel(); k.cyl(r * 1.04, r * 1.04, h * .92, h, 6); k.pop();
    }, TAU / 6);
    k.light([0, L * .97, 0], WHITE, .08, .6);
}

// Storage
function serbatoi(k, d, L, R) {
    const n = 3, r = R * .42; strut(k, L * .85, R * .3);
    around(n, (a, s) => { const c = [Math.cos(a) * R * .55, L * (.35 + .15 * (s % 2)), Math.sin(a) * R * .55]; tank(k, c, r); k.steel(); k.beam([0, c[1], 0], c, .05); }, a0(d));
    tank(k, [0, L * .85, 0], r * .7); k.light([0, L * .85 + r * .75, 0], AMBER, .08, 1);
}
function container(k, d, L, R) {
    const y0 = L * .14, w = R * .3; strut(k, y0, R * .5); k.steel(); k.box([0, y0, 0], [R * .7, .05, R * .5]);
    let n = 0; for (let i = 0; i < 2; i++) for (let j = 0; j < 2; j++) for (let s = 0; s < 3; s++) { k.paint(BOXES[(i * 5 + j * 3 + s) % BOXES.length], .4, .6); k.box([(i - .5) * w * 2.1, y0 + .05 + w * .62 * (s * 2 + 1), (j - .5) * w * 1.4], [w, w * .6, w * .66], 0, 0); n++; }
    k.light([R * .7, y0 + w * 4, 0], AMBER, .07, 1.2);
}
function silo(k, d, L, R) {
    const r = R * .62, seg = k.style.seg(16), y0 = L * .14, y1 = L * .78; strut(k, y0, r);
    k.paint([.78, .76, .72, 1], .35, .5); k.cyl(r, r, y0, y1, seg, { bands: 4 }); k.steel(); k.cyl(r, r * .2, y1, L * .98, seg);
    k.trim(); k.cyl(r * 1.02, r * 1.02, y0 + .05, y0 + .2, seg, { caps: false }); k.light([0, L, 0], RED, .08, .9);
}
function rastrelliera(k, d, L, R) {
    const w = R * .7, y0 = L * .12, n = 3; strut(k, y0, R * .5); k.steel();
    for (const sx of [1, -1]) for (const sz of [1, -1]) k.beam([sx * w, y0, sz * w * .5], [sx * w, L, sz * w * .5], .045);
    for (let s = 0; s < n; s++) { const y = y0 + (L - y0) * (s + .5) / n; k.steel(); k.box([0, y - (L - y0) / n * .45, 0], [w, .03, w * .5]); k.paint(BOXES[(s * 2 + 1) % BOXES.length], .4, .6); k.box([-w * .45, y - .02, 0], [w * .42, (L - y0) / n * .35, w * .42]); k.paint(BOXES[(s * 3 + 2) % BOXES.length], .4, .6); k.box([w * .45, y - .05, 0], [w * .4, (L - y0) / n * .3, w * .4]); }
    k.light([w, L, 0], AMBER, .07, 1.1);
}
function capsule(k, d, L, R) {
    strut(k, L * .12, R * .45); k.steel(); k.box([0, L * .14, 0], [R * .75, .05, R * .3]);
    for (const x of [-1, 0, 1]) { k.push([x * R * .5, 0, 0]); capsuleTank(k, R * .24, L * .14 + R * .24, L * .9 - R * .24); k.pop(); }
    k.light([0, L * .95, 0], AMBER, .07, 1);
}
function criogenico(k, d, L, R) {
    const r = R * .55, c = L * .55; strut(k, c - r, r * .6);
    k.paint(ICE, .2, .35); k.sphere([0, c, 0], r, k.style.seg(18), Math.max(6, Math.round(k.style.seg(18) / 2)));
    around(4, a => { k.push([Math.cos(a) * r * 1.4, c, Math.sin(a) * r * 1.4], [0, -a, 0]); radiator(k, .06, r * 1.4, 2, 0); k.pop(); k.steel(); k.beam([Math.cos(a) * r, c, Math.sin(a) * r], [Math.cos(a) * r * 1.4, c, Math.sin(a) * r * 1.4], .04); }, TAU / 8);
    k.accent(.8); k.cyl(r * 1.01, r * 1.01, c - .05, c + .05, k.style.seg(18), { caps: false }); k.light([0, c + r + .1, 0], [.6, .85, 1, 1], .09, .5);
}

// Communications
function antenna(k, d, L, R) { strut(k, .2, R * .35); k.push([0, .2, 0]); mast(k, L * .95, 3, 1); k.pop(); }
function pannelloFase(k, d, L, R) {
    const y = L * .55; strut(k, y, R * .4); k.dark(); k.cyl(R * .95, R * .95, y, y + .08, 6);
    k.paint(k.style.panel, .3, .3); k.cyl(R * .88, R * .88, y + .08, y + .1, 6);
    if (!k.low) for (let i = -2; i <= 2; i++) for (let j = -2; j <= 2; j++) if (Math.abs(i) + Math.abs(j) < 4) { k.glow(k.style.accent, 1.2); k.box([i * R * .26, y + .11, j * R * .26], [.04, .01, .04]); }
    k.light([R * .9, y + .12, 0], RED, .07, 1.2);
}
function ripetitore(k, d, L, R) {
    strut(k, L * .5, R * .35); k.dark(); k.box([0, L * .52, 0], [R * .2, .12, R * .2]);
    k.push([0, L * .6, 0], [0, d.range(0, TAU), .5]); smallDish(k, R * .7, .2); k.pop(); k.light([0, L * .5, R * .25], GREEN, .07, .9);
}
function guglia(k, d, L, R) {
    const seg = k.style.seg(10); strut(k, .25, R * .5); k.hull(); k.cyl(R * .3, .04, .25, L, seg);
    for (let s = 1; s <= 6; s++) k.light([0, .25 + (L - .25) * s / 6.5, R * .3 * (1 - s / 6.5) + .03], s % 2 ? WHITE : RED, .07, -s * .15);
}
function terminaleLaser(k, d, L, R) {
    const y = L * .5; strut(k, y, R * .4); k.dark(); k.cyl(R * .35, R * .35, y, y + .35, k.style.seg(12));
    k.push([0, y + .55, 0], [0, 0, .6]); k.steel(); k.box([0, 0, 0], [R * .25, R * .22, R * .25]); k.hull(); k.cyl(R * .1, R * .1, R * .2, R * .9, 10); k.glow(k.style.accent, 3); k.cyl(R * .08, R * .08, R * .9, R * .92, 10); k.pop();
    k.light([0, y + .4, R * .36], GREEN, .07, 1);
}
function ventaglioAntenne(k, d, L, R) {
    strut(k, .25, R * .4); k.dark(); k.box([0, .35, 0], [R * .3, .1, .15]);
    for (let s = -2; s <= 2; s++) { const a = s * .32, h = L * (.95 - Math.abs(s) * .08); k.steel(); k.beam([0, .4, 0], [Math.sin(a) * h, .4 + Math.cos(a) * h, 0], .03); k.light([Math.sin(a) * h, .4 + Math.cos(a) * h, 0], s ? WHITE : RED, .06, 1 + Math.abs(s) * .2); }
}
/** Seeded angular offset of a module, so neighbouring modules do not line up. */
function a0(d) { return d.range(0, TAU); }

/** All modules by key, with the role they belong to; the keys are Italian and appear in the recipes. */
export const MODULES = {
    'modulo abitato': { role: 'abitazione', build: abitativo }, 'cupola abitata': { role: 'abitazione', build: cupola }, 'baccelli': { role: 'abitazione', build: baccelli },
    'anello abitato': { role: 'abitazione', build: anelloAbitato }, 'terrazze': { role: 'abitazione', build: blocco }, 'parco': { role: 'abitazione', build: parco },
    'scalo': { role: 'cantiere', build: scalo }, 'gru': { role: 'cantiere', build: gru }, 'bacino': { role: 'cantiere', build: bacino },
    'hangar': { role: 'cantiere', build: hangarModulo }, 'rampa di varo': { role: 'cantiere', build: rampa }, 'officina': { role: 'cantiere', build: officina },
    'forno': { role: 'fonderia', build: forno }, 'tramoggia': { role: 'fonderia', build: tramoggia }, 'frantoio': { role: 'fonderia', build: frantoio },
    'camino': { role: 'fonderia', build: camino }, 'radiatori caldi': { role: 'fonderia', build: radiatoriCaldi }, 'colata': { role: 'fonderia', build: colata },
    'colonna': { role: 'chimica', build: colonna }, 'sfere': { role: 'chimica', build: sfere }, 'torcia': { role: 'chimica', build: torcia },
    'reattore': { role: 'chimica', build: reattoreChimico }, 'fascio di tubi': { role: 'chimica', build: fascio }, 'scambiatore': { role: 'chimica', build: scambiatore },
    'pannelli': { role: 'energia', build: pannelli }, 'toro di fusione': { role: 'energia', build: toroFusione }, 'radiatori': { role: 'energia', build: radiatori },
    'traliccio elettrico': { role: 'energia', build: trallicioElettrico }, 'accumulatori': { role: 'energia', build: accumulatori }, 'specchio': { role: 'energia', build: specchio },
    'laboratorio': { role: 'ricerca', build: laboratorio }, 'bobine': { role: 'ricerca', build: bobine }, 'acceleratore': { role: 'ricerca', build: acceleratore },
    'braccio sensore': { role: 'ricerca', build: braccio }, 'camera a vuoto': { role: 'ricerca', build: cameraVuoto }, 'campionatore': { role: 'ricerca', build: campionatore },
    'parabola': { role: 'osservazione', build: parabola }, 'telescopio': { role: 'osservazione', build: telescopioModulo }, 'schiera': { role: 'osservazione', build: schiera },
    'schermo solare': { role: 'osservazione', build: schermoSolare }, 'interferometro': { role: 'osservazione', build: interferometro }, 'cupola ottica': { role: 'osservazione', build: cupolaOttica },
    'serra': { role: 'agricoltura', build: serraModulo }, 'biocupola': { role: 'agricoltura', build: biocupola }, 'vasche di alghe': { role: 'agricoltura', build: vasche },
    'petali': { role: 'agricoltura', build: petali }, 'anello verde': { role: 'agricoltura', build: anelloVerde }, 'alveare': { role: 'agricoltura', build: alveare },
    'serbatoi': { role: 'deposito', build: serbatoi }, 'container': { role: 'deposito', build: container }, 'silo': { role: 'deposito', build: silo },
    'rastrelliera': { role: 'deposito', build: rastrelliera }, 'capsule': { role: 'deposito', build: capsule }, 'criogenico': { role: 'deposito', build: criogenico },
    'antenna': { role: 'comunicazioni', build: antenna }, 'pannello a fase': { role: 'comunicazioni', build: pannelloFase }, 'ripetitore': { role: 'comunicazioni', build: ripetitore },
    'guglia': { role: 'comunicazioni', build: guglia }, 'terminale laser': { role: 'comunicazioni', build: terminaleLaser }, 'ventaglio di antenne': { role: 'comunicazioni', build: ventaglioAntenne },
};
/** Draw module `key` on socket { p, n, L, R, twist } of kit k: the frame turns +y onto the socket normal. */
export function mount(k, d, key, s) {
    const [x, y, z] = s.n;
    k.push(s.p, [0, Math.atan2(-z, x), -Math.acos(Math.max(-1, Math.min(1, y)))]); k.push([0, 0, 0], [0, s.twist || 0, 0]);
    MODULES[key].build(k, d, s.L, s.R);
    k.pop(); k.pop();
}
export { polyhedron };
