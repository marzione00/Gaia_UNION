/** Ship classes of the grammar: every class joins a hull family, which fixes the outline and the engines,
 * to a role, which fills the sockets of the hull with its modules and gives the ship its trade. Twelve
 * families and ten roles give 120 classes, ten times the twelve classic classes of src/craft/ships.js.
 * Ships point the bow towards +z with y up. A socket has a point, an outward normal, a height L, a half
 * width R and a half length S along the hull; ship modules are drawn in that frame, with their length
 * along the hull. Speed and hold of a class come from the role and change with the family. */
import { Kit, TAU, hash, section, assemble, WHITE, RED, GREEN, AMBER } from './kit.js';
import { mast, smallDish, tank, capsuleTank, hazardBand, coil, windowRing } from './parts.js';
import { MODULES, HOT, ORE } from './modules.js';
import { hull, canopy, nozzle, engines, wingPair, fins, styleDetail, sideWindows } from './ships.js';

const around = (n, f, offset = 0) => { for (let s = 0; s < n; s++) f(offset + s / n * TAU, s); };
const unit = v => { const l = Math.hypot(...v) || 1; return v.map(x => x / l); };
const socket = (k, p, n, L, R, S, major = true) => ({ k, p, n: unit(n), L, R, S, major });
const BOXES = [[.75, .38, .16, 1], [.16, .45, .52, 1], [.62, .62, .58, 1], [.45, .24, .16, 1], [.26, .32, .4, 1], [.6, .52, .2, 1]];
const STRIPE = [1, .55, .15, 1], ENGINE = [.6, .8, 1, 1];
const LIVERIES = ['fascia', 'dorso', 'prua', 'scacchi'];

/** Box elongated along z: centre c, half sizes h. */
const slab = (k, c, h, plates = 0) => k.box(c, h, plates);
/** Cylinder along z of radius r from z0 to z1 at (x, y). */
function along(k, x, y, r, z0, z1, seg = 14, opts = {}) { k.push([x, y, 0], [Math.PI / 2, 0, 0]); k.cyl(r, r, -z1, -z0, k.style.seg(seg), opts); k.pop(); }
/** Low pylon from the socket to the module base. */
function pylon(k, h, R, S) { k.steel(); k.box([0, h / 2, 0], [Math.min(.12, R * .3), h / 2, Math.min(S * .6, .5)]); }

// Cargo
function filaContainer(k, d, L, R, S) {
    const n = Math.max(1, Math.round(2 * S / 1.05)), pitch = 2 * S / n, h = L * .42; pylon(k, .12, R, S);
    for (let i = 0; i < n; i++) { const z = -S + pitch * (i + .5); k.paint(BOXES[Math.floor(hash(i, L, R) * BOXES.length)], .35, .55); slab(k, [0, .12 + h, z], [R * .85, h, pitch * .46], .9); k.dark(); slab(k, [0, .12 + h, z + pitch * .47], [R * .8, h * .95, .015]); }
}
function bloccoContainer(k, d, L, R, S) {
    pylon(k, .1, R, S); const h = L * .24;
    for (const x of [-1, 1]) for (const lv of [0, 1]) { k.paint(BOXES[Math.floor(hash(x + 2, lv, S) * BOXES.length)], .35, .55); slab(k, [x * R * .45, .1 + h + lv * 2 * h * 1.04, 0], [R * .42, h, S * .9], .8); }
    k.trim(); slab(k, [0, .1 + h * 4.15, 0], [R * .9, .03, S * .92]);
}
function stiva(k, d, L, R, S) {
    const r = Math.min(R, L * .5) * .92; pylon(k, .15, R, S); k.push([0, .15 + r, 0], [Math.PI / 2, 0, 0]); k.hull(); k.capsule(r, -S + r, S - r, k.style.seg(14), 3); k.pop();
    k.accent(.4); along(k, 0, .15 + r, r * 1.02, -.1, .1, 14, { caps: false }); k.dark(); slab(k, [0, .15 + 2 * r - .02, 0], [r * .5, .04, S * .5]);
}
function pianale(k, d, L, R, S) {
    k.steel(); slab(k, [0, .08, 0], [R * .9, .05, S]); for (const x of [-1, 1]) k.beam([x * R * .88, .1, -S], [x * R * .88, .1, S], .03);
    [[-.55, .55, .5], [0, .35, .75], [.55, .45, .4]].forEach(([z, w, h], i) => { k.paint(BOXES[(i * 2 + 1) % BOXES.length], .35, .55); slab(k, [0, .13 + L * h * .5, z * S], [R * w * 1.4, L * h * .5, S * .2]); });
}
// Tanker
function serbatoioLungo(k, d, L, R, S) { const r = Math.min(R, L * .5) * .9; pylon(k, .12, R, S); k.push([0, .12 + r, 0], [Math.PI / 2, 0, 0]); capsuleTank(k, r, -S + r, S - r); k.pop(); if (k.style.pipes) { k.push([0, .12 + r, 0], [Math.PI / 2, 0, 0]); hazardBand(k, r * 1.02, -.15, .15, 16); k.pop(); } }
function sfereInFila(k, d, L, R, S) {
    const n = Math.min(3, Math.max(2, Math.round(S / Math.min(R, L * .5)))), r = Math.min(R, L * .5, S / n) * .95; pylon(k, .1, R, S);
    for (let i = 0; i < n; i++) { const c = [0, .1 + r, -S + (2 * S / n) * (i + .5)]; k.paint(i % 2 ? [.82, .82, .8, 1] : [.78, .74, .62, 1], .35, .45); k.sphere(c, r, 12, 8); k.push(c); k.accent(.3); k.cyl(r * 1.01, r * 1.01, -.06 * r, .06 * r, 12, { caps: false }); k.pop(); }
}
function fascioSerbatoi(k, d, L, R, S) {
    const r = Math.min(R, L * .5) * .45; pylon(k, .1, R, S);
    for (const [x, y] of [[-1, 0], [1, 0], [0, 1.7]]) { k.paint([.82, .82, .8, 1], .35, .45); along(k, x * r * 1.05, .1 + r + y * r, r, -S * .95, S * .95, 12); }
    k.trim(); for (const z of [-S * .6, 0, S * .6]) slab(k, [0, .1 + r * 1.8, z], [r * 2.2, r * 1.9, .05]);
}
function sferaCarico(k, d, L, R, S) { const r = Math.min(R * 1.1, L * .55, S) * .95; pylon(k, .1, R, S); tank(k, [0, .1 + r, 0], r, [.85, .8, .7, 1], .4); k.light([0, .1 + 2 * r + .05, 0], AMBER, .06, 1.1); }
// Passengers
function pontePasseggeri(k, d, L, R, S) {
    const h = L * .38; pylon(k, .1, R, S); k.hull(); slab(k, [0, .1 + h, 0], [R * .85, h, S * .95], .6);
    for (const x of [-1, 1]) for (const f of [.6, 1.3]) for (let i = 0; i < Math.round(S * 3.2); i++) { if (hash(i, f, x) < .15) continue; k.pane([x * (R * .85 + .01), .1 + h * f, -S * .9 + i * (1.8 * S / Math.round(S * 3.2))], [x, 0, 0], [0, 0, 1], .16, .07); }
    k.glass(.6); slab(k, [0, .1 + 2 * h + .02, 0], [R * .4, .03, S * .85]);
}
function cupolaPanoramica(k, d, L, R, S) { const r = Math.min(R, L, S) * .85; k.hull(); k.cyl(r, r, 0, .18, k.style.seg(18)); windowRing(k, r, .09, Math.round(r * 10), .12, .06); k.glass(.75); k.sphere([0, .18, 0], r * .95, k.style.seg(18), 7, 0, Math.PI / 2); }
function veranda(k, d, L, R, S) {
    const n = k.style.facets ? 8 : 14, h = L * .45; k.hull();
    k.loft([section(S, R * .3, h * .3, h * .3, n), section(S * .5, R * .85, h * .8, h * .8, n), section(-S * .5, R * .9, h, h, n), section(-S, R * .5, h * .6, h * .6, n)]);
    k.glass(.7); k.loft([section(S * .4, R * .5, h * .25, h * 1.55, n), section(-S * .6, R * .55, h * .3, h * 1.8, n)]);
}
function moduloCabine(k, d, L, R, S) {
    const r = Math.min(R, L * .5) * .85; pylon(k, .12, R, S); k.hull(); along(k, 0, .12 + r, r, -S, S, 16, { bands: Math.max(1, Math.round(S * 2)) });
    for (let i = 0; i < Math.round(S * 2.4); i++) { k.push([0, .12 + r, -S + .3 + i * ((2 * S - .6) / Math.max(1, Math.round(S * 2.4) - 1))], [Math.PI / 2, 0, 0]); windowRing(k, r, 0, Math.round(r * 9), .12, .06); k.pop(); }
}
// Courier
function capsulaPostale(k, d, L, R, S) { const h = L * .5; pylon(k, h * .4, R, S); k.hull(); k.loft([section(S, .05, .05, h, 10), section(S * .3, R * .6, h * .5, h, 10), section(-S * .7, R * .55, h * .45, h, 10), section(-S, R * .35, h * .3, h, 10)]); k.accent(.6); slab(k, [0, h + h * .46, 0], [R * .15, .02, S * .5]); }
function propulsore(k, d, L, R, S) { const r = Math.min(R, L * .5) * .55; pylon(k, L * .5 - r, R, S); k.dark(); k.push([0, L * .5, 0], [Math.PI / 2, 0, 0]); k.capsule(r, -S * .4, S * .7, k.style.seg(12)); k.pop(); nozzle(k, [0, L * .5, -S * .75], r * .9); }
function antennaVeloce(k, d, L, R, S) { k.push([0, 0, 0]); mast(k, L * 1.6, 2, 1.6); k.pop(); }
function vanoDati(k, d, L, R, S) { const h = L * .3; pylon(k, .1, R, S); k.dark(); slab(k, [0, .1 + h, 0], [R * .7, h, S * .8], .5); for (const z of [-.5, 0, .5]) { k.glow(k.style.accent, 1.6); slab(k, [0, .1 + 2 * h + .01, z * S], [R * .6, .015, .04]); } }
// Mining
function tramoggiaNave(k, d, L, R, S) {
    const h = L * .4; pylon(k, .08, R, S); k.trim();
    for (const x of [-1, 1]) slab(k, [x * R * .85, .08 + h, 0], [.05, h, S * .95]); for (const z of [-1, 1]) slab(k, [0, .08 + h, z * S * .95], [R * .85, h, .05]); slab(k, [0, .1, 0], [R * .85, .04, S * .95]);
    k.paint(ORE, .1, .9); slab(k, [0, .08 + h * 1.5, 0], [R * .8, h * .45, S * .9]); k.light([R, .08 + 2 * h, S], AMBER, .06, 1.4);
}
function frantoioNave(k, d, L, R, S) { const h = L * .3; pylon(k, .1, R, S); k.dark(); slab(k, [0, .1 + h, 0], [R * .8, h, S * .7], .5); k.steel(); k.push([0, .1 + 2 * h + .2, 0], [0, 0, Math.PI / 2]); k.cyl(.22, .22, -R * .7, R * .7, 12, { bands: 3 }); k.pop(); k.glow(HOT, 1.2); slab(k, [0, .1 + .2, S * .71], [R * .5, .05, .02]); }
function cassoni(k, d, L, R, S) { pylon(k, .08, R, S); for (const z of [-.62, 0, .62]) { k.trim(); slab(k, [0, .08 + L * .25, z * S], [R * .75, L * .25, S * .28], .5); k.paint(ORE, .1, .9); slab(k, [0, .08 + L * .52, z * S], [R * .68, .05, S * .25]); } }
function braccioLaser(k, d, L, R, S) { const P = [[0, .1, 0], [0, L * .6, S * .4], [0, L * .8, S * 1.1]]; k.steel(); k.beam(P[0], P[1], .07); k.beam(P[1], P[2], .05); k.dark(); k.sphere(P[1], .1, 8, 6); k.glow(HOT, 3); k.sphere(P[2], .08, 8, 6); k.light(P[2], HOT, .12, 0); }
// Science
const reuse = key => (k, d, L, R, S) => MODULES[key].build(k, d, L, R);
function capsulaStrumenti(k, d, L, R, S) { const r = Math.min(R, L * .5) * .7; pylon(k, .15, R, S); k.hull(); k.push([0, .15 + r, 0], [Math.PI / 2, 0, 0]); k.capsule(r, -S * .5, S * .5, k.style.seg(12)); k.pop(); for (const z of [-S * .4, S * .3]) { k.steel(); k.beam([0, .15 + 2 * r, z], [0, .15 + 2 * r + L * .4, z], .02); k.light([0, .15 + 2 * r + L * .42, z], WHITE, .05, 1.3); } k.accent(.8); along(k, 0, .15 + r, r * 1.02, -.06, .06, 12, { caps: false }); }
function magnetometro(k, d, L, R, S) { k.steel(); k.beam([0, .05, 0], [0, L * .2, S * 1.6], .03); k.push([0, L * .2, S * 1.6], [Math.PI / 2, 0, 0]); coil(k, R * .35, -.1, .1, 1, .04); k.pop(); k.light([0, L * .2, S * 1.65], k.style.accent, .06, .9); }
// Tug
function artigli(k, d, L, R, S) { for (const x of [-1, 1]) { const a = [x * R * .4, .1, -S * .3], b = [x * R * .7, L * .6, S * .4], c = [x * R * .3, L * .5, S * 1.1]; k.steel(); k.beam(a, b, .08); k.trim(); k.beam(b, c, .06); k.dark(); k.sphere(b, .12, 8, 6); } k.light([0, L * .5, S], AMBER, .07, 1.2); }
function argano(k, d, L, R, S) { const r = Math.min(R, L * .5) * .6; pylon(k, .1, R, S); k.steel(); for (const x of [-1, 1]) slab(k, [x * R * .7, .1 + r, 0], [.05, r, r]); k.push([0, .1 + r, 0], [0, 0, Math.PI / 2]); k.trim(); k.cyl(r * .9, r * .9, -R * .6, R * .6, 14, { bands: 4 }); k.pop(); k.steel(); k.beam([0, .1 + r * 1.9, 0], [0, .1 + r * .2, -S * 1.2], .015); }
function motoreSpinta(k, d, L, R, S) { const r = Math.min(R, L * .5) * .7; pylon(k, L * .5 - r, R, S); k.dark(); k.push([0, L * .5, 0], [Math.PI / 2, 0, 0]); k.cyl(r, r, -S * .6, S * .6, k.style.seg(12), { bands: 2 }); k.pop(); nozzle(k, [0, L * .5, -S * .65], r * .95, r * 1.6, HOT); }
function paraurti(k, d, L, R, S) { for (const z of [-.6, 0, .6]) { k.paint([.08, .08, .08, 1], .3, .6); slab(k, [0, L * .12, z * S], [R * .8, L * .12, S * .22]); k.paint(k.style.trim, .4, .5); slab(k, [0, L * .25, z * S], [R * .8, .02, S * .1]); } }
// Rescue
function moduloMedico(k, d, L, R, S) { const h = L * .35; pylon(k, .1, R, S); k.paint([.86, .86, .84, 1], .3, .5); slab(k, [0, .1 + h, 0], [R * .8, h, S * .85], .5); k.paint(STRIPE, .3, .5, .3); for (const z of [-.5, .5]) slab(k, [0, .1 + h, z * S], [R * .82, h * 1.01, .06]); for (const x of [-1, 1]) for (let i = 0; i < 4; i++) k.pane([x * (R * .8 + .01), .1 + h * 1.2, -S * .3 + i * S * .2], [x, 0, 0], [0, 0, 1], .12, .07); }
function faro(k, d, L, R, S) { pylon(k, L * .4, R, S); k.dark(); k.push([0, L * .5, 0], [Math.PI / 2, 0, 0]); k.cyl(R * .3, R * .4, -S * .3, S * .3, 12); k.pop(); k.glow([1, .95, .8, 1], 3); along(k, 0, L * .5, R * .36, S * .3, S * .32, 12); k.light([0, L * .5, S * .4], [1, .95, .8, 1], .14, 0); }
function capsulaSalvataggio(k, d, L, R, S) { const r = Math.min(R, L * .5) * .55; pylon(k, .15, R, S); k.paint(STRIPE, .3, .5); k.push([0, .15 + r, 0], [Math.PI / 2, 0, 0]); k.capsule(r, -S * .35, S * .35, k.style.seg(12)); k.pop(); k.glass(.5); k.sphere([0, .15 + r, S * .35 + r * .4], r * .5, 10, 6); }
function segnalatore(k, d, L, R, S) { k.steel(); k.cyl(.05, .04, 0, L * 1.3, 8); for (let s = 1; s <= 3; s++) k.light([0, L * 1.3 * s / 3, 0], s % 2 ? RED : WHITE, .07, 2 + s * .3); }
// Construction
function telaioNave(k, d, L, R, S) { k.steel(); const h = L * .85; for (const x of [-1, 1]) for (const z of [-1, 1]) k.beam([x * R * .8, 0, z * S * .9], [x * R * .8, h, z * S * .9], .04); for (const y of [0.05, h]) { for (const z of [-1, 1]) k.beam([-R * .8, y, z * S * .9], [R * .8, y, z * S * .9], .03); for (const x of [-1, 1]) k.beam([x * R * .8, y, -S * .9], [x * R * .8, y, S * .9], .03); } k.light([R * .8, h, S * .9], AMBER, .06, 2.4); }
function portaparti(k, d, L, R, S) { pylon(k, .08, R, S); k.steel(); for (const z of [-1, 1]) slab(k, [0, L * .45, z * S * .9], [R * .8, L * .45, .04]); for (let i = 0; i < 4; i++) { k.paint(i % 2 ? [.7, .7, .66, 1] : k.style.trim, .6, .4); slab(k, [0, .15 + i * L * .22, 0], [R * .7, .05, S * .8]); } }
function braccioSaldatore(k, d, L, R, S) { const P = [[0, .05, -S * .4], [0, L * .8, 0], [0, L * .55, S * .9]]; k.steel(); k.beam(P[0], P[1], .07); k.trim(); k.beam(P[1], P[2], .05); k.dark(); k.sphere(P[1], .1, 8, 6); k.light(P[2], AMBER, .08, 3.1); }
// Shuttle
function cabina(k, d, L, R, S) { const h = L * .4; k.hull(); k.loft([section(S, R * .3, h * .3, h * .5, 10), section(S * .3, R * .8, h * .8, h * .8, 10), section(-S, R * .7, h * .7, h * .7, 10)]); k.glass(.5); k.loft([section(S * .9, R * .3, h * .2, h * 1.1, 10), section(S * .2, R * .55, h * .3, h * 1.45, 10)]); }
function bagagliaio(k, d, L, R, S) { const h = L * .3; pylon(k, .08, R, S); k.paint(BOXES[2], .35, .55); slab(k, [0, .08 + h, 0], [R * .75, h, S * .7], .6); k.trim(); slab(k, [0, .08 + 2 * h + .01, 0], [R * .6, .02, S * .5]); }
function sensore(k, d, L, R, S) { k.push([0, L * .4, 0], [.5, 0, 0]); smallDish(k, Math.min(R, L) * .6, .12); k.pop(); }
function oblo(k, d, L, R, S) { const r = Math.min(R, L * .5, S) * .8; pylon(k, .1, R, S); k.hull(); k.sphere([0, .1 + r, 0], r, k.style.seg(14), 8); k.push([0, .1 + r, 0]); windowRing(k, r, 0, Math.round(r * 12), .11, .06); k.pop(); }

/** Ship modules by key, with their role. */
export const SHIP_MODULES = {
    'fila di container': { role: 'cargo', build: filaContainer }, 'blocco di container': { role: 'cargo', build: bloccoContainer }, 'stiva': { role: 'cargo', build: stiva }, 'pianale': { role: 'cargo', build: pianale },
    'serbatoio lungo': { role: 'cisterna', build: serbatoioLungo }, 'sfere in fila': { role: 'cisterna', build: sfereInFila }, 'fascio di serbatoi': { role: 'cisterna', build: fascioSerbatoi }, 'sfera di carico': { role: 'cisterna', build: sferaCarico },
    'ponte passeggeri': { role: 'passeggeri', build: pontePasseggeri }, 'cupola panoramica': { role: 'passeggeri', build: cupolaPanoramica }, 'veranda': { role: 'passeggeri', build: veranda }, 'modulo cabine': { role: 'passeggeri', build: moduloCabine },
    'capsula postale': { role: 'corriere', build: capsulaPostale }, 'propulsore ausiliario': { role: 'corriere', build: propulsore }, 'antenna veloce': { role: 'corriere', build: antennaVeloce }, 'vano dati': { role: 'corriere', build: vanoDati },
    'tramoggia di bordo': { role: 'minerario', build: tramoggiaNave }, 'frantoio di bordo': { role: 'minerario', build: frantoioNave }, 'cassoni': { role: 'minerario', build: cassoni }, 'braccio laser': { role: 'minerario', build: braccioLaser },
    'braccio sensore': { role: 'scientifica', build: reuse('braccio sensore') }, 'parabola': { role: 'scientifica', build: reuse('parabola') }, 'capsula strumenti': { role: 'scientifica', build: capsulaStrumenti }, 'magnetometro': { role: 'scientifica', build: magnetometro },
    'artigli': { role: 'rimorchiatore', build: artigli }, 'argano': { role: 'rimorchiatore', build: argano }, 'motore di spinta': { role: 'rimorchiatore', build: motoreSpinta }, 'paraurti': { role: 'rimorchiatore', build: paraurti },
    'modulo medico': { role: 'soccorso', build: moduloMedico }, 'faro': { role: 'soccorso', build: faro }, 'capsula di salvataggio': { role: 'soccorso', build: capsulaSalvataggio }, 'segnalatore': { role: 'soccorso', build: segnalatore },
    'gru di bordo': { role: 'costruzione', build: reuse('gru') }, 'telaio': { role: 'costruzione', build: telaioNave }, 'portaparti': { role: 'costruzione', build: portaparti }, 'braccio saldatore': { role: 'costruzione', build: braccioSaldatore },
    'cabina': { role: 'navetta', build: cabina }, 'bagagliaio': { role: 'navetta', build: bagagliaio }, 'sensore': { role: 'navetta', build: sensore }, 'oblò': { role: 'navetta', build: oblo },
};
/** Draw ship module `key` on socket s: +y turns onto the normal and the module length runs along the hull. */
export function mountShip(k, d, key, s) {
    const [x, y, z] = s.n, b = Math.atan2(-z, x);
    k.push(s.p, [0, b, -Math.acos(Math.max(-1, Math.min(1, y)))]); k.push([0, 0, 0], [0, Math.cos(b) < -1e-6 ? Math.PI : 0, 0]);
    SHIP_MODULES[key].build(k, d, s.L, s.R, s.S);
    k.pop(); k.pop();
}

// Hull families
function affusolato({ d, st, liv, sh }) {
    const k = new Kit(st), L = d.range(7, 8.6) * sh[0], W = d.range(.6, .78) * sh[1], H = W * d.range(.78, .92);
    hull(k, d, L, [[0, .05, .05], [.12, W * .4, H * .4], [.3, W * .8, H * .8], [.55, W, H], [.8, W, H], [1, W * .85, H * .85]], liv);
    canopy(k, L * .3, L * .1, W * .5, H * .55, H * .3); engines(k, d.count('ugelli', 1, 3), -L / 2, W * .45, W * .36);
    wingPair(k, [[W * .9, -L * .14], [W * 1.9, -L * .38], [W * 1.9, -L * .44], [W * .9, -L * .42]], -H * .2, .03); fins(k, 1, -L * .32, H * 1.2, L * .25, H * .8, W);
    return { kits: [[k]], W, H, L, sockets: [socket(k, [0, H * .92, -L * .02], [0, 1, 0], 1.3, W * .8, L * .12), socket(k, [0, H * .9, -L * .26], [0, 1, 0], 1.1, W * .75, L * .09), socket(k, [0, -H * .92, -L * .08], [0, -1, 0], 1, W * .7, L * .12), ...[1, -1].map(sx => socket(k, [sx * W * .97, 0, L * .1], [sx, 0, 0], .9, H * .6, L * .1, false))] };
}
function cuneo({ d, st, liv, sh }) {
    const k = new Kit(st), L = d.range(5.6, 7) * sh[0], W = d.range(1.3, 1.65) * sh[1], H = W * d.range(.55, .65);
    hull(k, d, L, [[0, W * .25, H * .12, -H * .35], [.3, W * .65, H * .45, -H * .15], [.7, W, H * .85, 0], [1, W * .95, H * .8, 0]], liv);
    canopy(k, L * .02, -L * .2, W * .4, H * .55, H * .3); engines(k, d.count('ugelli', 2, 4), -L / 2, W * .5, W * .26); fins(k, 2, -L * .38, H * .9, L * .25, H * .6, W);
    return { kits: [[k]], W, H, L, sockets: [...[1, -1].map(sx => socket(k, [sx * W * .45, H * .8, -L * .25], [0, 1, 0], 1.2, W * .4, L * .14)), socket(k, [0, -H * .8, -L * .1], [0, -1, 0], 1, W * .6, L * .16), ...[1, -1].map(sx => socket(k, [sx * W * .96, 0, -L * .15], [sx, 0, 0], 1, H * .5, L * .12, false))] };
}
function fuso({ d, st, liv, sh }) {
    const k = new Kit(st), L = d.range(8, 9.5) * sh[0], r = .32, rings = d.count('anelli di moduli', 2, 3), per = d.choose('moduli per anello', [3, 4]);
    k.steel(); along(k, 0, 0, r, -L * .38, L * .3, 10, { bands: 6 });
    k.push([0, 0, L * .3]); hull(k, d, L * .3, [[0, .1, .1], [.3, .7, .6], [1, .8, .7]], liv); k.pop(); canopy(k, L * .44, L * .36, .4, .45, .25);
    k.hull(); slab(k, [0, 0, -L * .42], [.9, .9, .4], .5); engines(k, d.count('ugelli', 1, 4), -L * .46, .45, .3);
    const sockets = [];
    for (let i = 0; i < rings; i++) { const z = L * .2 - (i + .5) * L * .55 / rings; around(per, a => sockets.push(socket(k, [Math.cos(a) * r, Math.sin(a) * r, z], [Math.cos(a), Math.sin(a), 0], 1.3, .6, L * .55 / rings * .42)), Math.PI / 2 + i * Math.PI / per); }
    return { kits: [[k]], W: .9, H: .9, L, sockets };
}
function telaio({ d, st, liv, sh }) {
    const k = new Kit(st), L = d.range(9, 10.5) * sh[0], n = d.count('sezioni', 3, 4), z0 = L * .28, z1 = -L * .36;
    k.steel(); k.truss([0, 0, z0], [0, 0, z1], .32, 1, .045);
    k.push([0, 0, z0 + L * .1]); hull(k, d, L * .25, [[0, .2, .2], [.2, .8, .6], [.7, 1, .75], [1, .9, .7]], liv); k.pop(); canopy(k, z0 + L * .2, z0 + L * .1, .5, .55, .25);
    k.hull(); slab(k, [0, 0, z1 - .5], [1.1, 1, .5], .5); engines(k, d.count('ugelli', 2, 4), z1 - 1, .55, .35, 0, HOT);
    const pitch = (z0 - z1) / n, sockets = [];
    for (let i = 0; i < n; i++) { const z = z0 - pitch * (i + .5); sockets.push(socket(k, [0, .32, z], [0, 1, 0], 1.3, .9, pitch * .45)); if (i % 2 === 0) sockets.push(socket(k, [0, -.32, z], [0, -1, 0], 1.1, .85, pitch * .45)); else for (const sx of [1, -1]) sockets.push(socket(k, [sx * .32, 0, z], [sx, 0, 0], .8, .5, pitch * .4, false)); }
    for (const sx of [1, -1]) k.light([sx * 1.15, 0, z1 - .5], sx > 0 ? RED : GREEN, .08, .8);
    return { kits: [[k]], W: 1.1, H: 1, L, sockets };
}
function capsula({ d, st, liv, sh }) {
    const k = new Kit(st), L = d.range(4, 5) * sh[0], W = d.range(1.2, 1.45) * sh[1], H = W * d.range(.8, .95);
    hull(k, d, L, [[0, W * .55, H * .55], [.1, W * .88, H * .88], [.3, W, H], [.8, W, H], [1, W * .82, H * .82]], liv);
    canopy(k, L * .48, L * .28, W * .5, H * .7, H * .3); engines(k, d.count('ugelli', 1, 3), -L / 2, W * .45, W * .3);
    return { kits: [[k]], W, H, L, sockets: [socket(k, [0, H * .95, -L * .12], [0, 1, 0], 1.2, W * .7, L * .22), socket(k, [0, -H * .95, 0], [0, -1, 0], .9, W * .6, L * .2), ...[1, -1].map(sx => socket(k, [sx * W * .97, 0, -L * .05], [sx, 0, 0], 1, H * .55, L * .2))] };
}
function doppioScafo({ d, st, liv, sh }) {
    const k = new Kit(st), L = d.range(6, 7.4) * sh[0], w = d.range(.45, .55) * sh[1], D = d.range(1.1, 1.35) * sh[1];
    for (const sx of [1, -1]) { k.push([sx * D, 0, 0]); hull(k, d, L, [[0, .05, .05], [.15, w * .6, w * .6], [.45, w, w], [1, w * .85, w * .85]], liv); engines(k, 1, -L / 2, 0, w * .55); k.pop(); }
    k.hull(); slab(k, [0, .1, L * .05], [D, .18, L * .22], .5); canopy(k, L * .3, L * .2, .45, .3, .25);
    return { kits: [[k]], W: D + w, H: w, L, sockets: [socket(k, [0, .28, L * .14], [0, 1, 0], 1.1, D * .7, L * .08), socket(k, [0, .28, -L * .05], [0, 1, 0], 1.2, D * .7, L * .08), socket(k, [0, -.1, -L * .2], [0, -1, 0], 1, D * .5, L * .12), ...[1, -1].map(sx => socket(k, [sx * (D + w * .95), 0, 0], [sx, 0, 0], .8, w * .7, L * .1, false))] };
}
function treScafi({ d, st, liv, sh }) {
    const k = new Kit(st), L = d.range(6.6, 7.8) * sh[0], W = d.range(.6, .75) * sh[1], D = d.range(1.8, 2.2);
    hull(k, d, L, [[0, .05, .05], [.15, W * .5, W * .5], [.4, W, W * .9], [1, W * .85, W * .8]], liv); canopy(k, L * .28, L * .12, W * .5, W * .5, W * .3); engines(k, 1, -L / 2, 0, W * .5);
    for (const sx of [1, -1]) { k.push([sx * D, 0, -L * .12]); hull(k, d, L * .45, [[0, .05, .05], [.3, .3, .3], [1, .26, .26]], liv); engines(k, 1, -L * .225, 0, .2); k.pop(); k.steel(); k.beam([sx * W * .8, 0, -L * .06], [sx * D, 0, -L * .06], .06); k.beam([sx * W * .8, 0, -L * .2], [sx * D, 0, -L * .2], .06); }
    return { kits: [[k]], W: D, H: W, L, sockets: [socket(k, [0, W * .88, L * .02], [0, 1, 0], 1.2, W * .7, L * .1), socket(k, [0, W * .85, -L * .24], [0, 1, 0], 1.1, W * .65, L * .1), ...[1, -1].map(sx => socket(k, [sx * D, .28, -L * .12], [0, 1, 0], .9, .3, L * .14)), socket(k, [0, -W * .88, -L * .1], [0, -1, 0], .9, W * .6, L * .12, false)] };
}
function anello({ d, st, liv, sh }) {
    const k = new Kit(st), ring = new Kit(st), L = d.range(7, 8.2) * sh[0], W = d.range(.55, .7) * sh[1], Rr = d.range(1.8, 2.2), spokes = d.choose('raggi', [3, 4]), zr = -L * .05;
    hull(k, d, L, [[0, .05, .05], [.15, W * .5, W * .5], [.4, W, W], [1, W * .85, W * .85]], liv); canopy(k, L * .3, L * .14, W * .5, W * .55, W * .3); engines(k, d.count('ugelli', 1, 2), -L / 2, W * .45, W * .4);
    ring.push([0, 0, zr], [Math.PI / 2, 0, 0]); ring.hull(); ring.torus(Rr, .2, st.seg(40), st.facets ? 6 : 10); around(spokes, a => { ring.steel(); ring.beam([Math.cos(a) * W, 0, Math.sin(a) * W], [Math.cos(a) * Rr, 0, Math.sin(a) * Rr], .05); }); around(Math.round(Rr * 8), a => ring.pane([Math.cos(a) * (Rr + .2), 0, Math.sin(a) * (Rr + .2)], [Math.cos(a), 0, Math.sin(a)], [-Math.sin(a), 0, Math.cos(a)], .14, .07)); ring.pop();
    const sockets = []; around(spokes, a => sockets.push(socket(ring, [Math.cos(a + Math.PI / spokes) * (Rr + .15), Math.sin(a + Math.PI / spokes) * (Rr + .15), zr], [Math.cos(a + Math.PI / spokes), Math.sin(a + Math.PI / spokes), 0], .9, .45, .45)), Math.PI / 2);
    sockets.push(socket(k, [0, W * .95, L * .22], [0, 1, 0], 1.1, W * .7, L * .08), socket(k, [0, W * .92, -L * .3], [0, 1, 0], 1, W * .7, L * .07));
    return { kits: [[k], [ring, [0, 0, .25]]], W: Rr, H: Rr, L, sockets };
}
function disco({ d, st, liv, sh }) {
    const k = new Kit(st), R = d.range(2, 2.5) * sh[1], h = d.range(.3, .4), seg = st.seg(32);
    k.hull(); k.cyl(R, R, -h, h, seg, { bands: 1 }); k.cyl(R, R * .5, h, h + .35, seg); k.cyl(R * .5, R, -h - .3, -h, seg); k.dark(); k.cyl(R * 1.02, R * 1.02, -.06, .06, seg);
    k.push([0, 0, R * .9]); hull(k, d, 2.2, [[0, .1, .1], [.3, .5, .35], [1, .6, .4]], liv); k.pop(); canopy(k, R * .9 + 1.1, R * .9 + .5, .35, .35, .2);
    engines(k, d.count('ugelli', 2, 3), -R * 1.02, R * .35, .3);
    const sockets = []; around(3, a => sockets.push(socket(k, [Math.cos(a) * R * .3, h + .35, Math.sin(a) * R * .3 - .2], [0, 1, 0], 1.4, .62, .55)), Math.PI / 2);
    for (const sx of [1, -1]) sockets.push(socket(k, [sx * R, 0, -.2], [sx, 0, 0], 1.2, .32, .7)); sockets.push(socket(k, [0, -h - .3, -.3], [0, -1, 0], 1.1, .7, .7));
    return { kits: [[k]], W: R, H: h + .35, L: 2 * R + 2, sockets };
}
function modulare({ d, st, liv, sh }) {
    const k = new Kit(st), n = d.count('blocchi', 3, 4), sockets = []; let z = d.range(2.4, 3);
    k.push([0, 0, z + .6]); hull(k, d, 1.6, [[0, .3, .3], [.4, .7, .55], [1, .8, .6]], liv); k.pop(); canopy(k, z + 1.3, z + .8, .45, .45, .22);
    for (let i = 0; i < n; i++) { const w = d.range(.7, 1.05) * sh[1], h = d.range(.55, .85), len = d.range(.9, 1.4) * sh[0]; if (i % 2) k.dark(); else k.hull(); slab(k, [0, 0, z - len], [w, h, len], .55); sockets.push(socket(k, [0, h, z - len], [0, 1, 0], 1, w * .75, len * .8)); if (i % 2 === 0) for (const sx of [1, -1]) sockets.push(socket(k, [sx * w, 0, z - len], [sx, 0, 0], .8, h * .6, len * .7, false)); z -= 2 * len + .12; k.steel(); slab(k, [0, 0, z + .06], [.4, .4, .08]); }
    engines(k, d.count('ugelli', 2, 4), z, .55, .32, 0, HOT);
    return { kits: [[k]], W: 1.05, H: .85, L: 6, sockets };
}
function ala({ d, st, liv, sh }) {
    const k = new Kit(st), L = d.range(5.5, 6.8) * sh[0], W = d.range(.7, .9) * sh[1], H = W * .6;
    hull(k, d, L, [[0, .05, .05], [.2, W * .6, H * .6], [.5, W, H], [1, W * .9, H * .85]], liv); canopy(k, L * .25, L * .05, W * .5, H * .6, H * .35);
    const span = d.range(2.6, 3.2), wing = [[W * .8, L * .2], [W * span, -L * .32], [W * span, -L * .4], [W * .8, -L * .42]]; wingPair(k, wing, 0, .08);
    engines(k, d.count('ugelli', 2, 4), -L / 2, W * .5, W * .3); fins(k, 2, -L * .35, H * 1.1, L * .22, H * .5, W * span * .6);
    return { kits: [[k]], W: W * span, H, L, sockets: [...[1, -1].map(sx => socket(k, [sx * W * span * .55, .08, -L * .2], [0, 1, 0], .9, W * .55, L * .1)), socket(k, [0, H * .95, -L * .12], [0, 1, 0], 1, W * .7, L * .1), ...[1, -1].map(sx => socket(k, [sx * W * span * .45, -.08, -L * .25], [0, -1, 0], .8, W * .45, L * .08, false))] };
}
function sfere({ d, st, liv, sh }) {
    const k = new Kit(st), n = d.count('sfere', 3, 4), r = d.range(.65, .85) * sh[1], gap = r * 2.5 * sh[0] / sh[1], sockets = [], z0 = (n - 1) * gap / 2;
    for (let i = 0; i < n; i++) { const z = z0 - i * gap; if (i === 0) { k.glass(.5); k.sphere([0, 0, z], r, st.seg(16), 10); k.hull(); k.cyl(r * 1.02, r * 1.02, -.06, .06, st.seg(16), { caps: false }); } else { k.hull(); k.sphere([0, 0, z], r, st.seg(16), 10); k.push([0, 0, z]); windowRing(k, r, 0, Math.round(r * 10), .12, .06); k.pop(); } if (i) { k.steel(); along(k, 0, 0, r * .3, z + r * .8, z + gap - r * .8, 10); } if (i > 0) sockets.push(socket(k, [0, r * .95, z], [0, 1, 0], 1, r * .6, r * .7), socket(k, [i % 2 ? r * .95 : -r * .95, 0, z], [i % 2 ? 1 : -1, 0, 0], .8, r * .5, r * .6, false)); }
    k.dark(); slab(k, [0, 0, z0 - (n - 1) * gap - r * 1.1], [.5, .5, .3]); engines(k, d.count('ugelli', 1, 3), z0 - (n - 1) * gap - r * 1.4, .4, .28);
    return { kits: [[k]], W: r, H: r, L: n * gap, sockets };
}

export const HULL_BUILDERS = { affusolato, cuneo, fuso, telaio, capsula, doppioScafo, treScafi, anello, disco, modulare, ala, sfere };
/** Names of the hull families, with the agreement of the adjective, and how they change speed and hold. */
export const HULLS = {
    affusolato: { m: 'affusolato', f: 'affusolata', speed: 1.25, hold: .8, about: 'Scafo lungo e sottile con ali a freccia.' },
    cuneo: { m: 'a cuneo', f: 'a cuneo', speed: 1.1, hold: .9, about: 'Scafo a cuneo, basso a prua e largo a poppa.' },
    fuso: { m: 'a fuso', f: 'a fuso', speed: 1, hold: 1, about: 'Asse sottile con moduli a raggiera fra la prua e il blocco motori.' },
    telaio: { m: 'a telaio', f: 'a telaio', speed: .85, hold: 1.3, about: 'Trave reticolare aperta con i carichi agganciati sopra, sotto e ai lati.' },
    capsula: { m: 'a capsula', f: 'a capsula', speed: .9, hold: .9, about: 'Scafo corto e arrotondato.' },
    doppioScafo: { m: 'a doppio scafo', f: 'a doppio scafo', speed: .95, hold: 1.2, about: 'Due scafi paralleli uniti da un ponte.' },
    treScafi: { m: 'a tre scafi', f: 'a tre scafi', speed: 1, hold: 1.1, about: 'Scafo centrale con due scafi minori sui bracci.' },
    anello: { m: 'ad anello', f: 'ad anello', speed: .9, hold: 1.1, about: 'Scafo sottile con un anello rotante a metà lunghezza.' },
    disco: { m: 'a disco', f: 'a disco', speed: 1, hold: 1, about: 'Disco piatto con una prua sporgente.' },
    modulare: { m: 'modulare', f: 'modulare', speed: .8, hold: 1.35, about: 'Blocchi squadrati in fila dietro la cabina.' },
    ala: { m: 'ad ala', f: 'ad ala', speed: 1.2, hold: .85, about: 'Ala a delta larga attorno a uno scafo corto.' },
    sfere: { m: 'a sfere', f: 'a sfere', speed: .9, hold: 1.2, about: 'Fila di sfere unite da tubi, con la cabina nella prima.' },
};
export const HULL_KEYS = Object.keys(HULL_BUILDERS);
/** Roles of the ship classes: hull proportions (length and width factors), module proportions, noun and
 * gender, modules, the classic class whose trade they follow, drawn radius in system units and length.
 * Mining ships carry only raw goods from rocks and ice. */
export const SHIP_ROLES = {
    cargo: { hull: [1.15, 1.1], scale: [1.15, 1.2, 1.1], dense: true, noun: 'Cargo', gender: 'm', modules: ['fila di container', 'blocco di container', 'stiva', 'pianale'], fleet: 'cargo', drawn: .1, length: 'circa 140 m', about: 'Trasporta in container minerale, parti, cibo e celle di energia.' },
    cisterna: { hull: [1.1, 1.05], scale: [1.1, 1.15, 1.1], dense: true, noun: 'Cisterna', gender: 'f', modules: ['serbatoio lungo', 'sfere in fila', 'fascio di serbatoi', 'sfera di carico'], fleet: 'cisterna', drawn: .1, length: 'circa 130 m', about: 'Trasporta carburante nei serbatoi.' },
    passeggeri: { hull: [1.05, 1.1], scale: [1, 1.1, 1], noun: 'Nave passeggeri', gender: 'f', modules: ['ponte passeggeri', 'cupola panoramica', 'veranda', 'modulo cabine'], fleet: 'passeggeri', drawn: .1, length: 'circa 120 m', about: 'Porta passeggeri ed equipaggi fra le stazioni.' },
    corriere: { hull: [1, .8], scale: [.8, .8, .9], noun: 'Corriere', gender: 'm', modules: ['capsula postale', 'propulsore ausiliario', 'antenna veloce', 'vano dati'], fleet: 'corriere', drawn: .07, length: 'circa 70 m', about: 'Porta dati e passeggeri urgenti alla massima velocità.' },
    minerario: { hull: [.9, 1.2], scale: [1.1, 1.25, 1], dense: true, noun: 'Nave mineraria', gender: 'f', modules: ['tramoggia di bordo', 'frantoio di bordo', 'cassoni', 'braccio laser'], fleet: 'rimorchiatore', carries: ['minerale', 'silicati', 'ghiaccio', 'terre'], drawn: .09, length: 'circa 90 m', about: 'Raccoglie e porta il minerale.' },
    scientifica: { hull: [1.05, .9], scale: [1.45, .9, 1], noun: 'Nave scientifica', gender: 'f', modules: ['braccio sensore', 'parabola', 'capsula strumenti', 'magnetometro'], fleet: 'scientifica', drawn: .08, length: 'circa 80 m', about: 'Osserva i pianeti e porta i dati alle stazioni.' },
    rimorchiatore: { hull: [.8, 1.25], scale: [1, 1.3, .9], noun: 'Rimorchiatore', gender: 'm', modules: ['artigli', 'argano', 'motore di spinta', 'paraurti'], fleet: 'rimorchiatore', drawn: .07, length: 'circa 50 m', about: 'Traina carichi pesanti di minerale e parti.' },
    soccorso: { hull: [.95, 1], scale: [1, 1, 1], noun: 'Nave di soccorso', gender: 'f', modules: ['modulo medico', 'faro', 'capsula di salvataggio', 'segnalatore'], fleet: 'soccorso', drawn: .07, length: 'circa 60 m', about: 'Pattuglia le stazioni e porta energia, cibo e carburante dove mancano.' },
    costruzione: { hull: [1, 1.15], scale: [1.4, 1.2, 1], dense: true, noun: 'Nave officina', gender: 'f', modules: ['gru di bordo', 'telaio', 'portaparti', 'braccio saldatore'], fleet: 'gru', drawn: .08, length: 'circa 75 m', about: 'Lavora nei cantieri e sposta parti di nave.' },
    navetta: { hull: [.8, .9], scale: [.85, .9, .9], noun: 'Navetta', gender: 'f', modules: ['cabina', 'bagagliaio', 'sensore', 'oblò'], fleet: 'navetta', drawn: .06, length: 'circa 45 m', about: 'Porta piccoli equipaggi fra le stazioni.' },
};
export const SHIP_ROLE_KEYS = Object.keys(SHIP_ROLES);

/** The 120 classes, one for each role and hull family. */
export const SHIP_TYPES = SHIP_ROLE_KEYS.flatMap(role => HULL_KEYS.map(family => ({
    key: role + '-' + family, role, family, name: SHIP_ROLES[role].noun + ' ' + HULLS[family][SHIP_ROLES[role].gender],
    about: SHIP_ROLES[role].about + ' ' + HULLS[family].about,
})));
export const SHIP_TYPE_BY_KEY = Object.fromEntries(SHIP_TYPES.map(t => [t.key, t]));

/** Model of one class: the hull family draws hull and engines, the role mounts its main module on the major
 * sockets in turn with a second one, and a third module on most minor sockets, all in the proportions of the
 * role. */
export function buildShipType(type, d, st) {
    const role = SHIP_ROLES[type.role], liv = d.choose('livrea', LIVERIES), { kits, sockets, W, H, L } = HULL_BUILDERS[type.family]({ d, st, liv, sh: role.hull });
    const main = d.choose('modulo principale', role.modules), second = d.choose('modulo secondario', role.modules.filter(m => m !== main)), minor = d.choose('modulo minore', role.modules.filter(m => m !== main));
    // Proportions of the role; bulk carriers fill the minor sockets with the second module as well.
    const [sl, sr, ss] = role.scale; let n = 0;
    sockets.forEach((s, i) => {
        const fit = { ...s, L: s.L * sl, R: s.R * sr, S: s.S * ss };
        if (s.major) mountShip(s.k, d, n++ % 2 ? second : main, fit); else if (role.dense) mountShip(s.k, d, second, fit); else if (hash(i, s.p[0], s.p[2]) > .3) mountShip(s.k, d, minor, fit);
    });
    styleDetail(kits[0][0], d, -L * .15, W * .5, H);
    return assemble(kits);
}
/** Trade of a class for src/craft/economy.js: goods, hold, speed, docking time and idle behaviour of the
 * classic class of its role, with the speed and hold of its hull family. */
export function shipTrade(type, FLEET) {
    const role = SHIP_ROLES[type.role], base = FLEET[role.fleet], hullOf = HULLS[type.family];
    return { ...base, carries: role.carries || base.carries, capacity: Math.round(base.capacity * hullOf.hold), speed: +(base.speed * hullOf.speed).toFixed(2) };
}
/** The classes in the form of src/craft/ships.js, for the catalogue and the factory. */
export const GRAMMAR_SHIPS = Object.fromEntries(SHIP_TYPES.map(t => [t.key, { name: t.name, build: (d, st) => buildShipType(t, d, st), size: SHIP_ROLES[t.role].length, about: t.about, role: t.role, family: t.family }]));
