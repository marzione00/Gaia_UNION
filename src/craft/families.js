/** The twelve shape families of the type grammar (src/craft/grammar.js). A family draws the core of a
 * station, which fixes its outline, and returns the sockets where the role places its modules: each
 * socket has a point, an outward normal, a length L and a radius R for the module, the kit it belongs to
 * (a turning ring carries its own modules) and whether it is a major socket. The role paints the bands of
 * the core through `band(k)`. Families: spindle, wheel, disc, cluster, truss, sphere, polyhedron, tower,
 * cross, platform, drum and asteroid. */
import { Kit, TAU, hash, add, scale, unit, WHITE, RED, GREEN, AMBER } from './kit.js';
import { windowRing, polyhedron, polyFrame, solid, coil, pipe, tube, hazardBand } from './parts.js';

const around = (n, f, offset = 0) => { for (let s = 0; s < n; s++) f(offset + s / n * TAU, s); };
const socket = (k, p, n, L, R, major = true, twist = 0) => ({ k, p, n: unit(n), L, R, major, twist });
const ROCK = [.12, .11, .1, 1];

/** Style touches on a vertical drum of radius r from y0 to y1: coils, pipes and stripes, pods. */
function touches(k, r, y0, y1, seg) {
    const st = k.style;
    if (st.coils) coil(k, r * 1.1, y0 + (y1 - y0) * .2, y0 + (y1 - y0) * .55, 2, .06);
    if (st.pipes) { around(3, a => pipe(k, [[Math.cos(a) * r * 1.08, y0 + .1, Math.sin(a) * r * 1.08], [Math.cos(a) * r * 1.08, y1 - .1, Math.sin(a) * r * 1.08]], .07), .5); hazardBand(k, r * 1.02, y0 + .05, y0 + .3, seg); }
}
/** Connector between two points: a tube in biology, a thick beam in mathematics, a truss elsewhere. */
function link(k, a, b, w = .3) {
    const st = k.style;
    if (st.smooth) { k.hull(); tube(k, [a, b], w * .8, 12); }
    else if (st.facets) { k.steel(); k.beam(a, b, w * .6); }
    else { k.steel(); k.truss(a, b, w, .8, .04); }
}

function spina({ d, st, band }) {
    const k = new Kit(st), seg = st.seg(24), sockets = [];
    const n = d.count('sezioni', 3, 5), H = d.range(8, 10), lens = Array.from({ length: n }, () => d.range(.7, 1.6)), sum = lens.reduce((a, b) => a + b, 0), secs = [];
    let y = -H / 2;
    for (const L of lens) { const h = L / sum * H; secs.push([y, y + h, d.range(.95, 1.45)]); y += h; }
    secs.forEach(([a, b, r], i) => { if (i % 2) k.dark(); else k.hull(); k.cyl(r, r, a, b, seg, { bands: Math.max(1, Math.round((b - a) / .6)) }); if (b - a > .8) windowRing(k, r, (a + b) / 2, Math.round(r * 9), .13, .08, seg); });
    for (let i = 0; i + 1 < n; i++) { const r = Math.min(secs[i][2], secs[i + 1][2]) * 1.07; k.steel(); k.cyl(r, r, secs[i][1] - .07, secs[i][1] + .07, seg, { caps: false }); }
    const big = secs.reduce((m, s) => s[2] > m[2] ? s : m); band(k); k.cyl(big[2] * 1.03, big[2] * 1.03, big[0] + .1, big[0] + .26, seg, { caps: false });
    touches(k, big[2], big[0], big[1], seg);
    const levels = d.choose('livelli di moduli', [1, 2]), per = d.count('moduli per livello', 3, 5), at = levels === 1 ? [Math.floor(n / 2)] : [1, n - 2], off = d.range(0, TAU);
    at.forEach((i, l) => { const [a, b, r] = secs[i]; around(per, q => sockets.push(socket(k, [Math.cos(q) * r, (a + b) / 2, Math.sin(q) * r], [Math.cos(q), 0, Math.sin(q)], d.range(3, 3.8), 1.2)), off + l * Math.PI / per); });
    secs.forEach(([a, b, r], i) => { if (!at.includes(i)) around(2, q => sockets.push(socket(k, [Math.cos(q) * r, (a + b) / 2, Math.sin(q) * r], [Math.cos(q), 0, Math.sin(q)], 1.5, .55, false)), off + i); });
    const top = secs[n - 1], bot = secs[0];
    sockets.push(socket(k, [0, top[1], 0], [0, 1, 0], 3.2, Math.min(1.4, top[2])), socket(k, [0, bot[0], 0], [0, -1, 0], 2.6, Math.min(1.3, bot[2])));
    k.light([big[2] * 1.05, big[0], 0], GREEN, .1, .8); k.light([-big[2] * 1.05, big[0], 0], RED, .1, .8);
    return { kits: [[k]], sockets };
}
function ruota({ d, st, band }) {
    const k = new Kit(st), ring = new Kit(st), R = d.range(5.2, 6.3), r = d.range(.55, .78), spokes = d.choose('raggi', [3, 4, 6]), seg = st.seg(64), sides = st.smooth ? 14 : st.facets ? 6 : 12, sockets = [];
    k.hull(); k.cyl(1.3, 1.3, -1.5, 1.5, st.seg(20), { bands: 3 }); windowRing(k, 1.3, .6, 10, .13, .08, st.seg(20)); windowRing(k, 1.3, -.6, 10, .13, .08, st.seg(20));
    band(k); k.cyl(1.36, 1.36, -.12, .12, st.seg(20), { caps: false }); touches(k, 1.3, -1.5, 1.5, st.seg(20));
    ring.hull(); ring.torus(R, r, seg, sides); ring.dark(); ring.torus(R, r * 1.05, seg, 4);
    ring.push([0, r * .92, 0]); band(ring); ring.torus(R, .07, seg, 5); ring.pop();
    around(spokes, a => { ring.steel(); ring.push([0, 0, 0], [0, -a, 0]); ring.push([0, 0, 0], [0, 0, -Math.PI / 2]); ring.cyl(.18, .18, 1.35, R - r * .8, 10, { caps: false }); ring.pop(); ring.pop(); });
    around(Math.round(R * 9), a => ring.pane([Math.cos(a) * (R + r), 0, Math.sin(a) * (R + r)], [Math.cos(a), 0, Math.sin(a)], [-Math.sin(a), 0, Math.cos(a)], .18, .1));
    const m = d.count('moduli sull\'anello', 3, 6), off = d.range(0, TAU);
    around(m, a => sockets.push(socket(ring, [Math.cos(a) * (R + r * .85), 0, Math.sin(a) * (R + r * .85)], [Math.cos(a), 0, Math.sin(a)], 2.8, 1.05)), off);
    around(m, a => sockets.push(socket(ring, [Math.cos(a) * R, r * .9, Math.sin(a) * R], [0, 1, 0], 1.2, .45, false)), off + Math.PI / m);
    sockets.push(socket(k, [0, 1.5, 0], [0, 1, 0], 3, 1.25), socket(k, [0, -1.5, 0], [0, -1, 0], 2.8, 1.25));
    around(4, (a, s) => ring.light([Math.cos(a) * R, r + .1, Math.sin(a) * R], s % 2 ? RED : WHITE, .1, 1.1 + s * .2), off + .3);
    return { kits: [[k], [ring, [0, .1, 0]]], sockets };
}
function disco({ d, st, band }) {
    const k = new Kit(st), R = d.range(5, 6), h = d.range(.35, .5), seg = st.seg(48), sockets = [], top = h + .6;
    k.hull(); k.cyl(R, R, -h, h, seg, { bands: 1 }); k.cyl(R, R * .55, h, top, seg, { caps: false }); k.cyl(R * .55, R, -top, -h, seg, { caps: false });
    k.cyl(R * .55, R * .55, top - .05, top, seg); k.cyl(R * .55, R * .55, -top, -top + .05, seg);
    k.dark(); k.cyl(R * 1.02, R * 1.02, -.08, .08, seg); windowRing(k, R, h * .5, Math.round(R * 10), .14, .08, seg); windowRing(k, R, -h * .5, Math.round(R * 10), .14, .08, seg);
    band(k); k.cyl(R * .56, R * .56, top - .12, top + .02, seg, { caps: false });
    const m = d.count('moduli sul ponte', 3, 5), off = d.range(0, TAU);
    around(m, a => sockets.push(socket(k, [Math.cos(a) * R * .45, top, Math.sin(a) * R * .45], [0, 1, 0], 3.2, 1)), off);
    sockets.push(socket(k, [0, top, 0], [0, 1, 0], 3.6, .85), socket(k, [0, -top, 0], [0, -1, 0], 3, 1.2));
    around(d.count('moduli sul bordo', 3, 6), a => sockets.push(socket(k, [Math.cos(a) * R, 0, Math.sin(a) * R], [Math.cos(a), 0, Math.sin(a)], 1.5, .55, false)), off + .4);
    around(6, (a, s) => k.light([Math.cos(a) * R * 1.02, 0, Math.sin(a) * R * 1.02], s % 2 ? RED : WHITE, .09, 1 + s * .2));
    return { kits: [[k]], sockets };
}
const CLUSTERS = { ottaedro: [[1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1]], tetraedro: [[0, 1, 0], [.943, -.333, 0], [-.471, -.333, .816], [-.471, -.333, -.816]], cubo: [[1, 1, 1], [1, 1, -1], [1, -1, 1], [1, -1, -1], [-1, 1, 1], [-1, 1, -1], [-1, -1, 1], [-1, -1, -1]] };
function grappolo({ d, st, band }) {
    const k = new Kit(st), r = d.range(1.5, 1.9), seg = st.seg(20), sockets = [], shape = d.cycle('disposizione', ['ottaedro', 'tetraedro', 'cubo']);
    k.hull(); if (st.facets) polyhedron(k, 'icosaedro', [0, 0, 0], r * 1.1, null, .06); else k.sphere([0, 0, 0], r, seg, Math.round(seg / 2));
    band(k); k.cyl(r * 1.03, r * 1.03, -.1, .1, seg, { caps: false }); windowRing(k, r * .98, .35, 10, .12, .07);
    const arm = d.range(1.4, 2.2), turn = d.range(0, TAU);
    for (const v of CLUSTERS[shape]) {
        const u = unit([v[0] * Math.cos(turn) - v[2] * Math.sin(turn), v[1], v[0] * Math.sin(turn) + v[2] * Math.cos(turn)]), a = scale(u, r * .9), b = scale(u, r + arm);
        link(k, a, b, .3); k.dark(); k.sphere(b, .42, 10, 6); k.light(add(b, [0, .5, 0]), WHITE, .07, 1.3);
        sockets.push(socket(k, scale(u, r + arm + .3), u, shape === 'cubo' ? 2.6 : 3.2, shape === 'cubo' ? 1 : 1.25));
    }
    return { kits: [[k]], sockets };
}
function traliccio({ d, st, band }) {
    const k = new Kit(st), X = d.range(7, 8.5), sockets = [], nodes = d.count('nodi', 3, 4);
    k.steel(); k.truss([-X, 0, 0], [X, 0, 0], .45, 1, .06);
    for (let i = 0; i < nodes; i++) {
        const x = -X + 2 * X * (i + .5) / nodes;
        k.hull(); if (st.smooth) k.sphere([x, 0, 0], .9, st.seg(14), 8); else k.box([x, 0, 0], [.75, .75, .75], .4, 3);
        band(k); k.box([x, 0, 0], [.78, .12, .78]);
        sockets.push(socket(k, [x, .75, 0], [0, 1, 0], 3.2, 1.15), socket(k, [x, -.75, 0], [0, -1, 0], 2.6, 1.1));
        for (const sz of [1, -1]) sockets.push(socket(k, [x, 0, sz * .75], [0, 0, sz], 1.3, .5, false));
    }
    k.dark(); for (const sx of [1, -1]) k.box([sx * X, 0, 0], [.4, .6, .6]);
    sockets.push(socket(k, [X + .4, 0, 0], [1, 0, 0], 3, 1.1), socket(k, [-X - .4, 0, 0], [-1, 0, 0], 3, 1.1));
    k.light([X + .5, .7, 0], GREEN, .1, .8); k.light([-X - .5, .7, 0], RED, .1, .8);
    return { kits: [[k]], sockets };
}
function sfera({ d, st, band }) {
    const k = new Kit(st), r = d.range(3, 3.7), seg = st.seg(32), sockets = [];
    k.hull(); k.sphere([0, 0, 0], r, seg, Math.round(seg / 2));
    for (const lat of [.5, -.5]) windowRing(k, r * Math.cos(lat), r * Math.sin(lat), Math.round(r * 8), .14, .08);
    k.dark(); k.cyl(r * 1.05, r * 1.05, -.35, .35, seg, { bands: 1 }); band(k); k.cyl(r * 1.07, r * 1.07, -.08, .08, seg, { caps: false });
    k.trim(); k.cyl(r * .35, r * .35, r * .9, r * 1.02, seg); k.cyl(r * .35, r * .35, -r * 1.02, -r * .9, seg);
    const m = d.count('moduli sulla cintura', 4, 6), off = d.range(0, TAU);
    around(m, a => sockets.push(socket(k, [Math.cos(a) * r * 1.05, 0, Math.sin(a) * r * 1.05], [Math.cos(a), 0, Math.sin(a)], 2.8, 1.1)), off);
    sockets.push(socket(k, [0, r * 1.02, 0], [0, 1, 0], 2.6, 1.2), socket(k, [0, -r * 1.02, 0], [0, -1, 0], 2.4, 1.2));
    around(3, a => { const n = [Math.cos(a) * .7, .7, Math.sin(a) * .7]; sockets.push(socket(k, scale(unit(n), r), n, 1.3, .5, false)); }, off + .5);
    around(4, (a, s) => k.light([Math.cos(a) * r * 1.08, .38, Math.sin(a) * r * 1.08], s % 2 ? RED : GREEN, .09, .9));
    return { kits: [[k]], sockets };
}
function poliedro({ d, st, band }) {
    const k = new Kit(st), name = d.cycle('solido', ['icosaedro', 'dodecaedro', 'ottaedro', 'cubottaedro']), r = d.range(2.5, 2.9), sockets = [], { V, faces } = solid(name);
    k.hull(); polyhedron(k, name, [0, 0, 0], r, null, .12); band(k); polyFrame(k, name, [0, 0, 0], r * 1.01, .07, true);
    const dirs = name === 'dodecaedro' ? faces.map(f => unit(f.reduce((s, i) => add(s, V[i]), [0, 0, 0]))) : V;
    const near = u => name === 'dodecaedro' ? r * .8 : r;
    dirs.forEach((u, i) => sockets.push(i % 2 || dirs.length <= 6 ? socket(k, scale(u, near(u)), u, 3.3, 1.15) : socket(k, scale(u, near(u)), u, 1.6, .6, false)));
    V.forEach((p, i) => { if (i % 3 === 0) k.light(scale(p, r * 1.05), i % 2 ? RED : WHITE, .08, 1 + i * .05); });
    return { kits: [[k]], sockets };
}
function torre({ d, st, band }) {
    const k = new Kit(st), decks = d.count('ponti', 4, 6), H = d.range(11, 12.5), base = d.range(3.6, 4.2), seg = st.seg(24), sockets = [], y0 = -H / 2, spire = 1.6, dh = (H - .6 - spire) / decks;
    k.dark(); k.cyl(base, base, y0, y0 + .6, seg, { bands: 1 }); band(k); k.cyl(base * 1.02, base * 1.02, y0 + .45, y0 + .6, seg, { caps: false });
    const rad = i => base * .45 * (1 - i / decks * .6);
    for (let i = 0; i < decks; i++) {
        const a = y0 + .6 + i * dh, r0 = rad(i), r1 = rad(i + 1);
        if (i % 2) k.dark(); else k.hull(); k.cyl(r0, r1 * 1.02, a, a + dh, seg, { bands: 1 }); windowRing(k, (r0 + r1) / 2, a + dh * .5, Math.round(r0 * 9), .13, .08, seg);
        k.steel(); k.cyl(r0 * 1.08, r0 * 1.08, a - .05, a + .08, seg);
    }
    touches(k, rad(0), y0 + .6, y0 + .6 + dh * 2, seg);
    const yTop = y0 + .6 + decks * dh; k.steel(); k.cyl(rad(decks), .05, yTop, yTop + spire, st.seg(10)); k.light([0, yTop + spire + .1, 0], WHITE, .14, .7);
    const m = d.count('moduli alla base', 3, 5), off = d.range(0, TAU);
    around(m, a => sockets.push(socket(k, [Math.cos(a) * base * .78, y0 + .6, Math.sin(a) * base * .78], [0, 1, 0], 2.6, .7)), off);
    sockets.push(socket(k, [0, y0, 0], [0, -1, 0], 3, 1.3));
    for (const i of [1, Math.min(decks - 2, 3)]) around(3, a => { const yy = y0 + .6 + (i + .5) * dh, r = (rad(i) + rad(i + 1)) / 2, low = i === 1; sockets.push(socket(k, [Math.cos(a) * r, yy, Math.sin(a) * r], [Math.cos(a), low ? 0 : .25, Math.sin(a)], low ? 3 : 2.4, low ? 1 : .8)); }, off + i);
    around(4, (a, s) => k.light([Math.cos(a) * base, y0 + .62, Math.sin(a) * base], s % 2 ? RED : GREEN, .09, .9));
    return { kits: [[k]], sockets };
}
function croce({ d, st, band }) {
    const k = new Kit(st), arm = d.range(5.5, 6.8), r = d.range(.6, .8), seg = st.seg(16), sockets = [];
    k.hull(); k.cyl(1.5, 1.5, -1, 1, st.seg(24), { bands: 2 }); windowRing(k, 1.5, 0, 12, .13, .08, st.seg(24)); band(k); k.cyl(1.55, 1.55, .7, .82, st.seg(24), { caps: false });
    around(4, a => {
        const u = [Math.cos(a), 0, -Math.sin(a)];
        k.push([0, 0, 0], [0, a, 0]); k.push([0, 0, 0], [0, 0, -Math.PI / 2]); if (st.facets) k.steel(); else k.hull(); k.cyl(r, r, 1.4, arm, seg, { bands: 4, caps: false }); k.dark(); k.cyl(r * 1.15, r * 1.15, arm - .3, arm, seg); k.pop();
        if (!st.facets) { k.push([0, 0, 0], [0, 0, -Math.PI / 2]); windowRing(k, r, arm * .55, 8, .13, .08); k.pop(); } k.pop();
        sockets.push(socket(k, scale(u, arm), u, 3, 1.15));
        for (const sy of [1, -1]) sockets.push(socket(k, add(scale(u, arm * .6), [0, sy * r, 0]), [0, sy, 0], 1.4, .5, false));
        k.light(add(scale(u, arm), [0, r * 1.2, 0]), u[0] > .5 ? GREEN : u[0] < -.5 ? RED : WHITE, .09, .8);
    }, d.range(0, TAU));
    sockets.push(socket(k, [0, 1, 0], [0, 1, 0], 3.2, 1.3), socket(k, [0, -1, 0], [0, -1, 0], 2.8, 1.3));
    return { kits: [[k]], sockets };
}
function piattaforma({ d, st, band }) {
    const k = new Kit(st), W = d.range(5, 5.8), D = d.range(3.4, 4), T = .35, sockets = [], grid = d.choose('griglia', ['2x2', '3x2']), [nx, nz] = grid.split('x').map(Number);
    k.hull(); k.box([0, 0, 0], [W, T, D], .9, 3); k.dark(); k.box([0, -T - .05, 0], [W * .96, .06, D * .96]);
    band(k); for (const sz of [1, -1]) k.box([0, T + .02, sz * (D + .02)], [W, .05, .05]);
    k.steel(); for (const sz of [1, -1]) { k.truss([-W * .9, -1.1, sz * D * .55], [W * .9, -1.1, sz * D * .55], .25, .8, .035); for (const sx of [-.8, 0, .8]) k.beam([sx * W, -T, sz * D * .55], [sx * W, -1.1, sz * D * .55], .05); }
    const dx = 2 * W / nx, dz = 2 * D / nz;
    for (let i = 0; i < nx; i++) for (let j = 0; j < nz; j++) sockets.push(socket(k, [-W + dx * (i + .5), T, -D + dz * (j + .5)], [0, 1, 0], 3, Math.min(1.2, Math.min(dx, dz) * .42)));
    for (const sx of [1, -1]) sockets.push(socket(k, [sx * W * .5, -1.3, 0], [0, -1, 0], 2.2, .9));
    for (const sx of [1, -1]) sockets.push(socket(k, [sx * W, 0, 0], [sx, 0, 0], 1.4, .5, false));
    for (const [sx, sz] of [[1, 1], [1, -1], [-1, 1], [-1, -1]]) k.light([sx * W, T + .1, sz * D], sx > 0 ? GREEN : RED, .09, .9);
    return { kits: [[k]], sockets };
}
function tamburo({ d, st, band }) {
    const k = new Kit(st), drum = new Kit(st), Z = d.range(5.5, 6.8), r = d.range(1.9, 2.4), seg = st.seg(28), sockets = [];
    drum.push([0, 0, 0], [Math.PI / 2, 0, 0]); drum.hull(); drum.cyl(r, r, -Z, Z, seg, { bands: 6, caps: false });
    around(3, a => { drum.push([0, 0, 0], [0, a, 0]); drum.glass(.8); drum.box([r + .01, 0, 0], [.02, Z * .92, r * .28]); drum.pop(); });
    for (const f of [-.6, -.2, .2, .6]) windowRing(drum, r, Z * f, Math.round(r * 9), .13, .08);
    band(drum); drum.cyl(r * 1.03, r * 1.03, -.1, .1, seg, { caps: false }); drum.pop();
    k.push([0, 0, 0], [Math.PI / 2, 0, 0]); k.dark(); k.cyl(r * 1.05, r * .5, Z, Z + .8, seg); k.cyl(r * .5, r * 1.05, -Z - .8, -Z, seg); k.pop();
    if (d.flag('specchi', .6)) around(3, a => { k.push([Math.cos(a) * r * 1.1, Math.sin(a) * r * 1.1, Z], [0, 0, a]); k.push([0, 0, 0], [-.35, 0, 0]); k.paint([.86, .88, .92, 1], .95, .1); k.box([.06, 0, -Z * .9], [.02, r * .55, Z * .9]); k.pop(); k.pop(); }, Math.PI / 6);
    sockets.push(socket(k, [0, 0, Z + .8], [0, 0, 1], 3.4, 1.4), socket(k, [0, 0, -Z - .8], [0, 0, -1], 3.4, 1.4));
    // Static collars at the ends of the drum carry a crown of modules each.
    const crown = d.count('moduli per estremità', 2, 3), tilt = d.range(0, TAU);
    for (const sz of [1, -1]) { k.push([0, 0, sz * (Z + .35)], [Math.PI / 2, 0, 0]); k.steel(); k.cyl(r * 1.25, r * 1.25, -.2, .2, seg, { bands: 1 }); k.pop(); around(crown, a => sockets.push(socket(k, [Math.cos(a) * r * 1.25, Math.sin(a) * r * 1.25, sz * (Z + .35)], [Math.cos(a), Math.sin(a), sz * .35], 2.6, .95)), tilt + (sz > 0 ? 0 : Math.PI / crown)); }
    around(4, a => sockets.push(socket(drum, [Math.cos(a) * r, Math.sin(a) * r, 0], [Math.cos(a), Math.sin(a), 0], 1.2, .5, false)), Math.PI / 4);
    for (const sz of [1, -1]) { k.light([r * 1.05, 0, sz * Z], sz > 0 ? GREEN : RED, .1, .8); k.light([-r * 1.05, 0, sz * Z], WHITE, .1, .8); }
    return { kits: [[k], [drum, [0, 0, .12]]], sockets };
}
function asteroide({ d, st, band }) {
    const k = new Kit(st), r = d.range(3, 3.6), q = d.range(0, 50), sockets = [];
    const bump = n => 1 + .17 * Math.sin(3.1 * n[0] + q) * Math.cos(2.3 * n[1] - q * .7) + .1 * Math.sin(5.3 * n[2] + 1.7 * n[0] + q * 1.3) + .06 * Math.sin(9 * n[1] + q) * Math.sin(7 * n[2] - q);
    k.paint(ROCK, .1, .92); k.sphere([0, 0, 0], r, 30, 20, 0, Math.PI, n => bump(n));
    k.push([0, 0, 0], [d.range(-.4, .4), 0, d.range(-.4, .4)]); band(k); k.torus(r * 1.2, .09, st.seg(48), 4); k.steel(); around(6, a => k.beam([Math.cos(a) * r * .9, 0, Math.sin(a) * r * .9], [Math.cos(a) * r * 1.2, 0, Math.sin(a) * r * 1.2], .06)); k.pop();
    const m = d.count('moduli sulla roccia', 4, 6), golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < m + 2; i++) {
        const y = 1 - 2 * (i + .5) / (m + 2), w = Math.sqrt(1 - y * y), a = i * golden + q, n = [Math.cos(a) * w, y, Math.sin(a) * w];
        sockets.push(socket(k, scale(n, r * bump(n) * .92), n, i < m ? 2.9 : 1.3, i < m ? 1.1 : .5, i < m));
    }
    around(3, a => { k.glow([1, .5, .2, 1], 1.4); k.box([Math.cos(a) * r * .98, .3, Math.sin(a) * r * .98], [.12, .08, .12]); }, q);
    return { kits: [[k]], sockets };
}

export const FAMILY_BUILDERS = { spina, ruota, disco, grappolo, traliccio, sfera, poliedro, torre, croce, piattaforma, tamburo, asteroide };
/** Names and descriptions of the families; the adjective agrees with the gender of the role noun. */
export const FAMILIES = {
    spina: { m: 'a spina', f: 'a spina', about: 'Asse di sezioni impilate con moduli a raggiera.' },
    ruota: { m: 'a ruota', f: 'a ruota', about: 'Anello che ruota attorno a un mozzo, con i moduli sul bordo.' },
    disco: { m: 'a disco', f: 'a disco', about: 'Disco largo e basso con i moduli sul ponte superiore.' },
    grappolo: { m: 'a grappolo', f: 'a grappolo', about: 'Nodo centrale da cui partono bracci con un modulo ciascuno.' },
    traliccio: { m: 'a traliccio', f: 'a traliccio', about: 'Lunga trave reticolare con nodi e moduli sopra e sotto.' },
    sfera: { m: 'sferico', f: 'sferica', about: 'Grande sfera con una cintura di moduli e due poli attrezzati.' },
    poliedro: { m: 'poliedrico', f: 'poliedrica', about: 'Nucleo a forma di solido regolare con moduli sui vertici.' },
    torre: { m: 'a torre', f: 'a torre', about: 'Torre di ponti che si restringono su una base larga.' },
    croce: { m: 'a croce', f: 'a croce', about: 'Quattro bracci in croce attorno a un mozzo.' },
    piattaforma: { m: 'a piattaforma', f: 'a piattaforma', about: 'Piattaforma piatta con i moduli in griglia sul ponte.' },
    tamburo: { m: 'a tamburo', f: 'a tamburo', about: 'Lungo cilindro che ruota sul proprio asse, con specchi e moduli alle estremità.' },
    asteroide: { m: 'su asteroide', f: 'su asteroide', about: 'Asteroide scavato, cinto da un anello di ormeggio, con moduli sulla roccia.' },
};
export const FAMILY_KEYS = Object.keys(FAMILY_BUILDERS);
