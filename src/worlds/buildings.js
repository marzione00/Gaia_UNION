/** Buildings of the villages of the native peoples (1.64.0); the colonies are drawn by src/worlds/architecture.js
 * since 1.66.0. A building is a spec, a few numbers drawn for one village (size, roof, posts), and a
 * mesh built from the spec with the kit of the stations (src/craft/kit.js) at two levels of detail. The walls
 * are white, so each building takes the colour of its instance; roofs, frames, glass and soil keep their own.
 * Buildings face +x, where the door is, and stand on a plinth that reaches 2.5 units under the ground, so they
 * sit level on a slope. Sizes are in the units of the surface, where a person is about 1.1 units tall. */
import { Kit, TAU, WHITE } from '../craft/kit.js';
import { smooth } from './architecture.js';

/** Types of the villages, with the Italian name used in the diary. */
export const VILLAGE_TYPES = Object.freeze({ capanna: 'capanne', casalunga: 'case lunghe', granaio: 'granai', focolare: 'focolari', totem: 'totem' });
const PLINTH = 2.5;
const round = x => Math.round(x * 100) / 100;

/** Spec of a building of type `type` for a settlement with parameters P (src/worlds/settlements.js), drawn
 * with the dice `d`. `radius` is the half diagonal of the footprint, `height` the top above the ground. */
export function buildingSpec(type, d, P) {
    const s = { type };
    switch (type) {
        case 'capanna': Object.assign(s, { r: d.range(1.2, 1.8), wall: d.range(.9, 1.3), roof: d.range(1.1, 1.7), shape: P.hutShape }); break;
        case 'casalunga': Object.assign(s, { len: d.range(5, 7), w: d.range(2, 2.6), wall: d.range(1, 1.3) }); break;
        case 'granaio': Object.assign(s, { r: d.range(.8, 1.1), legs: d.range(1, 1.4) }); break;
        case 'focolare': Object.assign(s, { r: d.range(1, 1.4), stones: d.int(7, 10) }); break;
        case 'totem': Object.assign(s, { h: d.range(2.5, 4) / Math.sqrt(P.gravity), parts: d.int(3, 5) }); break;
        default: throw new Error('Tipo di edificio sconosciuto: ' + type);
    }
    for (const k of Object.keys(s)) if (typeof s[k] === 'number') s[k] = round(s[k]);
    const [radius, height] = measure(s);
    return { ...s, radius: round(radius), height: round(height), colors: P.colors };
}
function measure(s) {
    switch (s.type) {
        case 'capanna': return [s.r + (s.shape === 'cupola' ? 1.2 : .72), s.wall + s.roof + .35];
        case 'casalunga': return [Math.hypot(s.len + .9, s.w + .7) / 2, s.wall + s.w * .62 + .45];
        case 'granaio': return [s.r * 1.9 + .1, s.legs + s.r * 2.2];
        case 'focolare': return [s.r + .3, .95];
        case 'totem': return [.95, s.h];
    }
}
/** Kit style of a settlement: walls white for the instance colour, the rest from the colours of the spec. */
const styleOf = (c, level) => ({ hull: WHITE, dark: c.dark, steel: c.steel, trim: c.trim, accent: c.accent, glass: c.glass, window: c.window, panel: c.dark, seg: n => n, detail: level ? .35 : 1 });

/** Mesh of a building spec at level 0 (detailed) or 1 (light). Since 1.67.0 huts have walls of posts and
 * wattle under layered thatch, long houses an arched thatch roof with crossed gable poles, granaries stand on
 * posts with guards against climbing animals, the fire burns in a ring of stones and the totem is carved in
 * bulging segments with two boards spread as wings. */
export function buildingMesh(s, level = 0) {
    const c = s.colors, k = new Kit(styleOf(c, level)), low = level > 0, wall = () => k.paint(WHITE, .05, .8), wood = () => k.paint(c.trim, 0, .85), straw = (f = 1) => k.paint([c.roof[0] * f, c.roof[1] * f, c.roof[2] * f, 1], 0, .95);
    const soil = r => { k.paint(c.soil, 0, .95); k.pbr = [0, .95, 0, 1]; k.cyl(r, r, -PLINTH, .04, low ? 10 : 18, { caps: true }); };
    const M = low ? 10 : 20;
    // Thatch: stacked layers, each a sloping ring whose lower edge is ragged.
    const thatch = (r0, y0, r1, y1, layers, cx = 0) => { for (let q = 0; q < layers; q++) { const a = q / layers, b = (q + 1.25) / layers, ra = r0 + (r1 - r0) * a, rb = r0 + (r1 - r0) * Math.min(1, b), ya = y0 + (y1 - y0) * a, yb = y0 + (y1 - y0) * Math.min(1, b); straw(.88 + .14 * (q % 2)); smooth(k, [Array.from({ length: M }, (_, j) => { const t = j / M * TAU, rr = (ra + .08) * (1 + (low ? 0 : .05 * Math.sin(t * 7 + q) + .04 * (j % 2))); return [cx + Math.cos(t) * rr, ya - .06 * (j % 2), Math.sin(t) * rr]; }), Array.from({ length: M }, (_, j) => { const t = j / M * TAU; return [cx + Math.cos(t) * rb, yb, Math.sin(t) * rb]; })]); } };
    const posts = (r, h, n) => { wood(); for (let i = 0; i < n; i++) { const a = i * TAU / n + .1; k.push([Math.cos(a) * r, 0, Math.sin(a) * r]); k.cyl(.055, .05, 0, h, 5, { caps: true }); k.pop(); } };
    const door = (x, w, h) => { k.paint(c.dark, 0, .9); k.box([x + .02, h / 2 + .04, 0], [.05, h / 2, w / 2]); wood(); for (const z of [-1, 1]) k.box([x + .05, h / 2 + .06, z * (w / 2 + .05)], [.05, h / 2 + .06, .05]); k.box([x + .05, h + .1, 0], [.06, .06, w / 2 + .12]); };
    switch (s.type) {
        case 'capanna': {
            soil(s.r + .25);
            if (s.shape === 'cupola') {
                // A dome of thatch in ridged layers, with a low tunnel at the door.
                const R = low ? 5 : 10, rows = []; for (let i = 0; i <= R; i++) { const t = i / R, th = t * Math.PI / 2 * .96, ridge = low ? 1 : 1 + .035 * Math.sin(t * Math.PI * 9); rows.push(Array.from({ length: M }, (_, j) => { const a = j / M * TAU; return [Math.cos(a) * s.r * Math.cos(th) * ridge, .04 + (s.wall + s.roof) * .82 * Math.sin(th), Math.sin(a) * s.r * Math.cos(th) * ridge]; })); }
                straw(); smooth(k, rows, { capEnd: true });
                straw(.85); k.push([s.r * .7, 0, 0], [0, Math.PI / 2, 0]); const tun = []; for (let i = 0; i <= 3; i++) tun.push(Array.from({ length: 9 }, (_, j) => { const a = j / 8 * Math.PI; return [Math.cos(a) * .55, .04 + Math.sin(a) * 1.05, i * .3]; })); smooth(k, tun, { closed: false }); k.pop();
                k.paint(c.dark, 0, .9); k.box([s.r * .7 + .92, .5, 0], [.03, .46, .36]);
                wood(); k.cyl(.05, .03, (s.wall + s.roof) * .8, (s.wall + s.roof) * .95, 5, { caps: true });
            } else {
                // Walls of posts and wattle, a cone of thatch in three layers and a bound finial.
                posts(s.r, s.wall + .1, low ? 6 : 12); wall(); k.cyl(s.r - .03, s.r - .03, .04, s.wall, M, { caps: false });
                if (!low) { wood(); for (let y = .25; y < s.wall; y += .22) { k.push([0, y, 0]); k.torus(s.r, .025, M, 3); k.pop(); } }
                thatch(s.r + .42, s.wall - .08, .05, s.wall + s.roof, low ? 2 : 3);
                straw(.7); k.cyl(.1, .02, s.wall + s.roof - .05, s.wall + s.roof + .35, 6, { caps: true }); wood(); k.cyl(.11, .11, s.wall + s.roof - .1, s.wall + s.roof - .02, 6, { caps: true });
                door(s.r - .04, .62, .95);
            }
            break;
        }
        case 'casalunga': {
            k.paint(c.soil, 0, .95); k.pbr = [0, .95, 0, 1]; k.box([0, -PLINTH / 2, 0], [s.len / 2 + .35, PLINTH / 2 + .02, s.w / 2 + .35]);
            wall(); k.box([0, s.wall / 2 + .02, 0], [s.len / 2, s.wall / 2, s.w / 2]);
            wood(); for (let x = -s.len / 2; x <= s.len / 2 + 1e-6; x += s.len / (low ? 3 : 6)) for (const z of [-1, 1]) k.box([x, s.wall / 2 + .05, z * (s.w / 2 + .04)], [.06, s.wall / 2 + .05, .06]);
            // Arched thatch over the walls, in ridged layers, with a ridge pole and crossed poles at each gable.
            const R = low ? 4 : 9, rows = []; for (let i = 0; i <= R; i++) { const x = (i / R - .5) * (s.len + .6); rows.push(Array.from({ length: low ? 7 : 13 }, (_, j, arr) => { const a = j / ((low ? 7 : 13) - 1) * Math.PI, rr = s.w * .66 * (low ? 1 : 1 + .03 * Math.sin(a * 12)); return [x, s.wall - .1 + Math.sin(a) * s.w * .62, Math.cos(a) * rr]; })); }
            straw(); smooth(k, rows, { closed: false });
            for (const e of [-1, 1]) { const x = e * (s.len / 2 + .3), pts = Array.from({ length: low ? 7 : 13 }, (_, j) => { const a = j / ((low ? 7 : 13) - 1) * Math.PI; return [x, s.wall - .1 + Math.sin(a) * s.w * .62, Math.cos(a) * s.w * .66]; }); straw(.82); for (let j = 0; j + 1 < pts.length; j++) k.tri([x, s.wall - .1, 0], pts[j], pts[j + 1]); wood(); for (const z of [-1, 1]) k.beam([x, s.wall - .2, z * s.w * .5], [x, s.wall + s.w * .62 + .45, -z * .35], .05); }
            wood(); k.beam([-s.len / 2 - .4, s.wall - .08 + s.w * .62, 0], [s.len / 2 + .4, s.wall - .08 + s.w * .62, 0], .07);
            door(s.len / 2, .7, 1.05);
            break;
        }
        case 'granaio': {
            soil(s.r + .25); wood();
            for (const [x, z] of [[1, 1], [1, -1], [-1, 1], [-1, -1]]) { k.push([x * s.r * .6, 0, z * s.r * .6]); k.cyl(.07, .06, 0, s.legs, 6, { caps: true }); k.paint(c.dark, .2, .7); k.cyl(.2, .2, s.legs - .14, s.legs - .1, 10, { caps: true }); wood(); k.pop(); }
            k.box([0, s.legs + .02, 0], [s.r * .9, .06, s.r * .9]);
            wall(); k.cyl(s.r * .82, s.r * .88, s.legs + .08, s.legs + s.r * 1.1, M, { caps: false });
            if (!low) { wood(); for (let y = s.legs + .3; y < s.legs + s.r * 1.1; y += .24) { k.push([0, y, 0]); k.torus(s.r * .86, .02, M, 3); k.pop(); } }
            thatch(s.r * 1.22, s.legs + s.r * 1.02, .04, s.legs + s.r * 2.2, 2);
            wood(); k.beam([s.r * .9, s.legs - .02, 0], [s.r * 1.9, 0, 0], .06); k.beam([s.r * .9, s.legs - .02, .3], [s.r * 1.9, 0, .3], .06); if (!low) for (let q = 1; q < 5; q++) { const t = q / 5; k.beam([s.r * .9 + s.r * t, s.legs * (1 - t), 0], [s.r * .9 + s.r * t, s.legs * (1 - t), .3], .03); }
            break;
        }
        case 'focolare': {
            soil(s.r * .85);
            k.paint(c.dark, 0, .9); for (let i = 0; i < s.stones; i++) { const a = i * TAU / s.stones; k.push([Math.cos(a) * s.r, .06, Math.sin(a) * s.r], [0, a, 0]); k.sphere([0, 0, 0], 1, low ? 6 : 9, low ? 3 : 5, 0, Math.PI, nn => { const e = 1 / Math.hypot(nn[0] / .26, nn[1] / .17, nn[2] / .2); return e * (1 + .12 * Math.sin(nn[0] * 7 + i) * Math.sin(nn[2] * 5)); }); k.pop(); }
            wood(); for (let i = 0; i < 4; i++) { const a = i * TAU / 4 + .4; k.beam([Math.cos(a) * s.r * .55, .06, Math.sin(a) * s.r * .55], [Math.cos(a) * .05, .4, Math.sin(a) * .05], .06); }
            k.paint([1, .42, .12, 1], 0, .5, 2.6); k.sphere([0, .08, 0], .32, 8, 3, 0, Math.PI / 2);
            k.paint([.95, .45, .12, 1], 0, .5, 1.5); for (const [dx, dz, hh] of low ? [[0, 0, .7]] : [[0, 0, .75], [.1, .06, .5], [-.08, -.07, .55]]) { const fl = []; for (let i = 0; i <= (low ? 3 : 6); i++) { const t = i / (low ? 3 : 6); fl.push(Array.from({ length: 6 }, (_, j) => { const a = j / 6 * TAU + t * 2.5, r = .17 * (1 - t) ** .9 * (1 + .3 * Math.sin(a * 3)); return [dx + Math.cos(a) * r + Math.sin(t * 5) * .03, .1 + t * hh, dz + Math.sin(a) * r]; })); } smooth(k, fl); }
            break;
        }
        case 'totem': {
            soil(.5);
            const R = low ? 2 * s.parts : 5 * s.parts, rows = [];
            for (let i = 0; i <= R; i++) { const t = i / R, part = Math.min(s.parts - 1, Math.floor(t * s.parts)), f = t * s.parts - part, bulge = .21 + .05 * Math.sin(f * Math.PI) ** .7 + (part % 3 === 2 ? .03 : 0); rows.push(Array.from({ length: low ? 6 : 12 }, (_, j, a = j / (low ? 6 : 12) * TAU) => [Math.cos(a) * bulge * (1 + (part % 2 ? .1 : 0) * Math.cos(a * 2)), t * s.h, Math.sin(a) * bulge])); }
            const segColor = (i, j) => { const part = Math.min(s.parts - 1, Math.floor(i / R * s.parts)); return part % 2 ? c.accent : c.roof; };
            k.paint(c.roof, 0, .8); for (let p0 = 0; p0 < s.parts; p0++) { const a = Math.round(p0 * R / s.parts), b = Math.round((p0 + 1) * R / s.parts); k.paint(segColor(a), 0, .8); smooth(k, rows.slice(a, b + 1), { capEnd: p0 === s.parts - 1 }); }
            if (!low) { k.paint(c.dark, 0, .9); for (let p0 = 1; p0 < s.parts; p0++) { k.push([0, p0 * s.h / s.parts, 0]); k.torus(.235, .03, 14, 3); k.pop(); } }
            k.paint(c.accent, 0, .7); for (const z of [-1, 1]) { const y = s.h * .72; k.quad([0, y - .05, z * .2], [0, y - .05, z * .9], [0, y + .35, z * .75], [0, y + .25, z * .2]); }
            break;
        }
    }
    return k.mesh();
}
