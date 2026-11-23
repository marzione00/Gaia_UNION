/** Buildings of the settlements (1.64.0): the colony of every planet and the villages of the native peoples.
 * A building is a spec, a few numbers drawn for one colony or village (size, floors, roof, windows), and a
 * mesh built from the spec with the kit of the stations (src/craft/kit.js) at two levels of detail. The walls
 * are white, so each building takes the colour of its instance; roofs, frames, glass and soil keep their own.
 * Buildings face +x, where the door is, and stand on a plinth that reaches 2.5 units under the ground, so they
 * sit level on a slope. Sizes are in the units of the surface, where a person is about 1.1 units tall. */
import { Kit, TAU, WHITE } from '../craft/kit.js';

/** Types of the colonies and of the villages, with the Italian name used in the diary. */
export const COLONY_TYPES = Object.freeze({ casa: 'case', palafitta: 'case su palafitte', blocco: 'palazzi', torre: 'torri', cupola: 'cupole abitate', serra: 'serre', serbatoio: 'serbatoi', hangar: 'hangar', antenna: 'antenne', energia: 'impianti di energia', magazzino: 'magazzini', piattaforma: 'piattaforme di atterraggio', piazza: 'piazze' });
export const VILLAGE_TYPES = Object.freeze({ capanna: 'capanne', casalunga: 'case lunghe', granaio: 'granai', focolare: 'focolari', totem: 'totem' });
const FLOOR = 1.5, PLINTH = 2.5;
const round = x => Math.round(x * 100) / 100;

/** Spec of a building of type `type` for a settlement with parameters P (src/worlds/settlements.js), drawn
 * with the dice `d`. `radius` is the half diagonal of the footprint, `height` the top above the ground. */
export function buildingSpec(type, d, P) {
    const floors = n => Math.max(1, Math.min(P.floorsMax, n)), s = { type };
    switch (type) {
        case 'casa': case 'palafitta': Object.assign(s, { w: d.range(2.4, 3.4), dz: d.range(2.2, 3.1), floors: floors(d.int(1, P.low ? 1 : 2)), roof: P.roof, porch: d.chance(.5), chimney: !P.sealed && d.chance(.4) }); break;
        case 'blocco': Object.assign(s, { w: d.range(3.6, 5.4), dz: d.range(3.4, 5), floors: floors(d.int(3, 6)), roof: P.roof === 'falde' ? 'piano' : P.roof, balconies: !P.sealed && d.chance(.6) }); break;
        case 'torre': Object.assign(s, { r: d.range(1.4, 2.1), floors: floors(d.int(6, 12)), round: d.chance(.6), crown: d.pick(['antenna', 'anello', 'cupola']) }); break;
        case 'cupola': Object.assign(s, { r: d.range(2.6, 4.2), band: d.chance(.7), lock: d.range(1, 1.6) }); break;
        case 'serra': Object.assign(s, { len: d.range(5, 8.5), r: d.range(1.3, 1.9), ribs: d.int(4, 7) }); break;
        case 'serbatoio': Object.assign(s, { n: d.int(1, 3), r: d.range(.9, 1.5), h: d.range(2.2, 3.8) / Math.sqrt(P.gravity) }); break;
        case 'hangar': Object.assign(s, { len: d.range(7, 10), r: d.range(2.8, 3.8) }); break;
        case 'antenna': Object.assign(s, { h: d.range(8, 13) / Math.sqrt(P.gravity), dish: d.range(1.4, 2.4) }); break;
        case 'energia': Object.assign(s, { kind: P.power, n: P.power === 'sole' ? d.int(3, 5) : P.power === 'vento' ? 1 : d.int(1, 2), h: P.power === 'vento' ? d.range(11, 16) / Math.sqrt(P.gravity) : d.range(4, 6) }); break;
        case 'magazzino': Object.assign(s, { w: d.range(4.5, 6.5), dz: d.range(3.5, 4.8), h: d.range(2.2, 3) }); break;
        case 'piattaforma': Object.assign(s, { r: d.range(3.2, 4.4) }); break;
        case 'piazza': Object.assign(s, { r: d.range(3, 4), monument: d.pick(['obelisco', 'fontana', 'globo']) }); break;
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
        case 'casa': case 'palafitta': return [Math.hypot(s.w, s.dz) / 2 + (s.porch ? .5 : .2), s.floors * FLOOR + 1.2];
        case 'blocco': return [Math.hypot(s.w, s.dz) / 2 + .3, s.floors * 1.3 + .6];
        case 'torre': return [s.r + .3, s.floors * 1.3 + 2];
        case 'cupola': return [s.r + s.lock * .8, s.r + .4];
        case 'serra': return [Math.hypot(s.len, 2 * s.r) / 2 + .2, s.r];
        case 'serbatoio': return [s.n === 1 ? s.r + .3 : s.r * s.n * 1.15 + .3, s.h + s.r];
        case 'hangar': return [Math.hypot(s.len, 2 * s.r) / 2 + .2, s.r];
        case 'antenna': return [1.6, s.h + s.dish * .5];
        case 'energia': return s.kind === 'sole' ? [Math.hypot(s.n * 1.9, 3.2) / 2, 1.8] : s.kind === 'vento' ? [2.2, s.h + 3.2] : [3.4, s.h + 1];
        case 'magazzino': return [Math.hypot(s.w, s.dz) / 2 + .2, s.h + .3];
        case 'piattaforma': return [s.r + .3, .5];
        case 'piazza': return [s.r + .2, 3];
        case 'capanna': return [s.r + .25, s.wall + s.roof];
        case 'casalunga': return [Math.hypot(s.len, s.w) / 2 + .3, s.wall + s.w * .6];
        case 'granaio': return [s.r + .3, s.legs + s.r * 2.2];
        case 'focolare': return [s.r + .3, .4];
        case 'totem': return [.6, s.h];
    }
}
/** Kit style of a settlement: walls white for the instance colour, the rest from the colours of the spec. */
const styleOf = (c, level) => ({ hull: WHITE, dark: c.dark, steel: c.steel, trim: c.trim, accent: c.accent, glass: c.glass, window: c.window, panel: c.dark, seg: n => n, detail: level ? .35 : 1 });

/** Mesh of a building spec at level 0 (detailed) or 1 (light). */
export function buildingMesh(s, level = 0) {
    const c = s.colors, k = new Kit(styleOf(c, level)), wall = () => k.paint(WHITE, .05, .8);
    const plinth = (w, d) => { k.paint(c.soil, 0, .95); k.box([0, -PLINTH / 2, 0], [w / 2 + .15, PLINTH / 2, d / 2 + .15]); };
    const roofOf = (w, d, y, kind) => {
        k.paint(c.roof, .1, .75);
        if (kind === 'falde') { const r = Math.min(w, d) * .38, o = .2, A = [-w / 2 - o, y, -d / 2 - o], B = [w / 2 + o, y, -d / 2 - o], C = [w / 2 + o, y, d / 2 + o], D = [-w / 2 - o, y, d / 2 + o], E = [-w / 2 - o, y + r, 0], F = [w / 2 + o, y + r, 0]; k.quad(A, E, F, B); k.quad(C, F, E, D); wall(); k.tri(B, F, C); k.tri(D, E, A); }
        else if (kind === 'volta') { k.push([0, y, 0], [0, 0, Math.PI / 2]); k.cyl(d / 2, d / 2, -w / 2 - .1, w / 2 + .1, 16, { caps: true }); k.pop(); }
        else if (kind === 'cupola') { k.sphere([0, y, 0], Math.min(w, d) * .55, 16, 6, 0, Math.PI / 2); }
        else { k.box([0, y + .08, 0], [w / 2 + .05, .08, d / 2 + .05]); k.paint(c.trim, .3, .6); for (const z of [-1, 1]) k.box([0, y + .3, z * d / 2], [w / 2, .14, .06]); for (const x of [-1, 1]) k.box([x * w / 2, y + .3, 0], [.06, .14, d / 2]); }
    };
    const windows = (w, d, floors, h0 = 0) => { for (let f = 0; f < floors; f++) { const y = h0 + f * FLOOR + .85, n = Math.max(1, Math.round(w / 1.1)); for (let i = 0; i < n; i++) { const z = -d / 2 + (i + .5) * d / n; for (const x of [-1, 1]) k.pane([x * (w / 2), y, z], [x, 0, 0], [0, 0, 1], .5, .55, c.window, .7); } const m = Math.max(1, Math.round(d / 1.4)); for (let i = 0; i < m; i++) { const x = -w / 2 + (i + .5) * w / m; for (const z of [-1, 1]) k.pane([x, y, z * (d / 2)], [0, 0, z], [1, 0, 0], .5, .55, c.window, .7); } } };
    switch (s.type) {
        case 'casa': case 'palafitta': {
            const h = s.floors * FLOOR, stilts = s.type === 'palafitta';
            if (stilts) { k.paint(c.trim, .05, .85); k.box([0, -.08, 0], [s.w / 2 + .6, .08, s.dz / 2 + .4]); for (const x of [-1, 0, 1]) for (const z of [-1, 1]) { k.push([x * (s.w / 2 + .3), 0, z * (s.dz / 2 + .2)]); k.paint(c.dark, .1, .8); k.cyl(.12, .12, -5, 0, 6, { caps: false }); k.pop(); } }
            else plinth(s.w, s.dz);
            wall(); k.box([0, h / 2, 0], [s.w / 2, h / 2, s.dz / 2]);
            roofOf(s.w, s.dz, h, s.roof);
            k.paint(c.dark, .1, .7); k.box([s.w / 2 + .02, .55, 0], [.04, .55, .35]);
            windows(s.w, s.dz, s.floors);
            if (s.porch) { k.paint(c.trim, .1, .8); k.box([s.w / 2 + .45, .06, 0], [.45, .06, s.dz * .35]); k.box([s.w / 2 + .85, .7, s.dz * .3], [.05, .7, .05]); k.box([s.w / 2 + .85, .7, -s.dz * .3], [.05, .7, .05]); k.box([s.w / 2 + .45, 1.42, 0], [.5, .05, s.dz * .38]); }
            if (s.chimney) { k.paint(c.dark, .1, .8); k.box([-s.w * .25, h + .9, s.dz * .2], [.18, .55, .18]); }
            break;
        }
        case 'blocco': {
            const h = s.floors * 1.3; plinth(s.w, s.dz); wall(); k.box([0, h / 2, 0], [s.w / 2, h / 2, s.dz / 2]);
            for (let f = 0; f < s.floors; f++) { const y = f * 1.3 + .75, n = Math.max(2, Math.round(s.dz / 1)), m = Math.max(2, Math.round(s.w / 1)); for (let i = 0; i < n; i++) for (const x of [-1, 1]) k.pane([x * s.w / 2, y, -s.dz / 2 + (i + .5) * s.dz / n], [x, 0, 0], [0, 0, 1], .42, .6, c.window, .7); for (let i = 0; i < m; i++) for (const z of [-1, 1]) k.pane([-s.w / 2 + (i + .5) * s.w / m, y, z * s.dz / 2], [0, 0, z], [1, 0, 0], .42, .6, c.window, .7); if (s.balconies && f > 0 && !k.low) { k.paint(c.trim, .2, .6); k.box([s.w / 2 + .25, f * 1.3 + .05, 0], [.25, .05, s.dz * .4]); wall(); } }
            k.paint(c.dark, .1, .7); k.box([s.w / 2 + .02, .6, 0], [.04, .6, .5]);
            roofOf(s.w, s.dz, h, s.roof); break;
        }
        case 'torre': {
            const h = s.floors * 1.3; k.paint(c.soil, 0, .95); k.cyl(s.r + .3, s.r + .3, -PLINTH, .2, 16); wall();
            if (s.round) k.cyl(s.r, s.r * .92, .2, h, 20, { caps: true }); else k.box([0, h / 2 + .1, 0], [s.r * .85, h / 2 - .1, s.r * .85]);
            for (let f = 1; f < s.floors; f++) { k.paint(c.glass, .8, .15, .25); if (s.round) k.cyl(s.r + .03, s.r + .03, f * 1.3 + .45, f * 1.3 + .95, 20, { caps: false }); else for (const [x, z] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) k.box([x * s.r * .86, f * 1.3 + .7, z * s.r * .86], [x ? .02 : s.r * .7, .25, z ? .02 : s.r * .7]); }
            k.paint(c.trim, .5, .4);
            if (s.crown === 'antenna') { k.beam([0, h, 0], [0, h + 2, 0], .07); k.light([0, h + 2, 0], [1, .3, .25, 1], .2); }
            else if (s.crown === 'anello') { k.push([0, h - .2, 0]); k.torus(s.r * 1.15, .18, 20, 6); k.pop(); }
            else k.sphere([0, h, 0], s.r * .8, 14, 6, 0, Math.PI / 2);
            k.paint(c.dark, .1, .7); k.box([s.r * .9, .6, 0], [.06, .6, .45]); break;
        }
        case 'cupola': {
            k.paint(c.soil, 0, .95); k.cyl(s.r + .25, s.r + .25, -PLINTH, .15, 24); wall(); k.sphere([0, .15, 0], s.r, 24, 10, 0, Math.PI / 2);
            if (s.band) { k.paint(c.glass, .85, .1, .3); k.sphere([0, .15, 0], s.r + .02, 24, 3, Math.PI * .28, Math.PI * .4); }
            k.paint(c.steel, .6, .4); k.push([s.r - .2, .7, 0], [0, 0, Math.PI / 2]); k.cyl(.65, .65, 0, s.lock + .4, 12); k.pop();
            k.paint(c.dark, .1, .7); k.box([s.r + s.lock + .22, .65, 0], [.04, .5, .4]); break;
        }
        case 'serra': {
            k.paint(c.soil, 0, .95); k.box([0, -PLINTH / 2, 0], [s.len / 2 + .1, PLINTH / 2, s.r + .1]);
            k.paint(c.glass, .85, .08, .25); k.push([0, 0, 0], [0, 0, Math.PI / 2]); k.cyl(s.r, s.r, -s.len / 2, s.len / 2, 18, { caps: true }); k.pop();
            k.paint(c.steel, .7, .4); for (let i = 0; i <= s.ribs; i++) { const x = -s.len / 2 + i * s.len / s.ribs; k.push([x, 0, 0], [0, 0, Math.PI / 2]); k.cyl(s.r + .04, s.r + .04, -.05, .05, 18, { caps: false }); k.pop(); }
            k.paint(c.accent, .1, .8); k.box([0, .25, 0], [s.len / 2 - .3, .25, s.r * .6]); break;
        }
        case 'serbatoio': {
            plinth(s.n * s.r * 2.3, s.r * 2.3);
            for (let i = 0; i < s.n; i++) { const x = (i - (s.n - 1) / 2) * s.r * 2.3; k.push([x, 0, 0]); wall(); k.cyl(s.r, s.r, 0, s.h, 18, { caps: false }); k.sphere([0, s.h, 0], s.r, 18, 6, 0, Math.PI / 2); k.paint(c.trim, .5, .4); k.cyl(s.r + .04, s.r + .04, s.h * .3, s.h * .3 + .12, 18, { caps: false }); k.pop(); }
            k.paint(c.steel, .7, .4); if (s.n > 1) k.beam([-(s.n - 1) / 2 * s.r * 2.3, s.h * .6, 0], [(s.n - 1) / 2 * s.r * 2.3, s.h * .6, 0], .1); k.beam([0, .3, s.r], [0, .3, s.r + 1.2], .1); break;
        }
        case 'hangar': {
            k.paint(c.soil, 0, .95); k.box([0, -PLINTH / 2, 0], [s.len / 2 + .2, PLINTH / 2, s.r + .2]); wall();
            k.push([0, 0, 0], [0, 0, Math.PI / 2]); k.cyl(s.r, s.r, -s.len / 2, s.len / 2, 20, { caps: true }); k.pop();
            k.paint(c.dark, .2, .7); k.box([s.len / 2 + .02, s.r * .4, 0], [.04, s.r * .4, s.r * .65]);
            k.paint(c.accent, .2, .5, .2); k.box([s.len / 2 + .05, s.r * .85, 0], [.04, .08, s.r * .7]); break;
        }
        case 'antenna': {
            k.paint(c.soil, 0, .95); k.box([0, -PLINTH / 2 + .1, 0], [1.2, PLINTH / 2, 1.2]); k.paint(c.steel, .7, .4); k.truss([0, 0, 0], [0, s.h, 0], .35, 1.4, .05);
            k.push([0, s.h, 0], [0, 0, -.6]); wall(); k.dish(s.dish, s.dish * .3, 24, 6); k.pop(); k.light([0, s.h + .3, 0], [1, .3, .25, 1], .2, 1); break;
        }
        case 'energia': {
            if (s.kind === 'sole') { k.paint(c.soil, 0, .95); k.box([0, -PLINTH / 2, 0], [s.n * .95 + .2, PLINTH / 2, 1.7]); for (let i = 0; i < s.n; i++) { const x = (i - (s.n - 1) / 2) * 1.9; k.paint(c.steel, .6, .4); k.box([x, .45, 0], [.06, .45, .06]); k.push([x, 1, 0], [.5, 0, 0]); k.paint([.08, .14, .3, 1], .7, .2, .05); k.box([0, 0, 0], [.85, .04, 1.4]); k.pop(); } }
            else if (s.kind === 'vento') { k.paint(c.soil, 0, .95); k.cyl(1.2, 1.2, -PLINTH, .2, 12); wall(); k.cyl(.45, .22, 0, s.h, 12, { caps: true }); k.box([.3, s.h + .2, 0], [.8, .35, .35]); k.paint(WHITE, .1, .6); for (let i = 0; i < 3; i++) { const a = i * TAU / 3; k.beam([1.15, s.h + .2, 0], [1.15, s.h + .2 + Math.cos(a) * 3, Math.sin(a) * 3], .09); } }
            else { plinth(5, 4); wall(); k.box([-.8, 1.2, 0], [1.6, 1.2, 1.5]); k.push([1.7, 0, 0]); k.cyl(1.5, 1, 0, s.h * .6, 16, { caps: false }); k.cyl(1, 1.25, s.h * .6, s.h, 16, { caps: false }); k.pop(); k.paint(c.steel, .7, .4); k.beam([-.8, 2.4, .6], [-.8, s.h + .6, .6], .12); k.beam([-.8, 2.4, -.6], [-.8, s.h + .6, -.6], .12); }
            break;
        }
        case 'magazzino': {
            plinth(s.w, s.dz); wall(); k.box([0, s.h / 2, 0], [s.w / 2, s.h / 2, s.dz / 2]); k.paint(c.roof, .3, .6); k.box([0, s.h + .1, 0], [s.w / 2 + .15, .1, s.dz / 2 + .15]);
            k.paint(c.dark, .3, .6); for (const z of [-1, 1]) k.box([s.w / 2 + .02, s.h * .38, z * s.dz * .25], [.04, s.h * .38, s.dz * .17]); break;
        }
        case 'piattaforma': {
            k.paint(c.soil, 0, .95); k.cyl(s.r + .2, s.r + .2, -PLINTH, .1, 6); k.paint(c.steel, .5, .5); k.cyl(s.r, s.r, .1, .32, 6, { caps: true });
            k.paint(c.accent, .1, .5, .5); k.cyl(s.r * .55, s.r * .55, .32, .34, 6, { caps: true }); k.paint(c.steel, .5, .5); k.cyl(s.r * .45, s.r * .45, .34, .36, 6, { caps: true });
            for (let i = 0; i < 6; i++) { const a = i * TAU / 6; k.light([Math.cos(a) * s.r * .92, .4, Math.sin(a) * s.r * .92], [1, .75, .3, 1], .16, -i); } break;
        }
        case 'piazza': {
            k.paint(c.trim, .05, .85); k.cyl(s.r, s.r, -PLINTH, .12, 24, { caps: true }); k.paint(c.soil, 0, .9); k.cyl(s.r * .5, s.r * .5, .12, .3, 16, { caps: true });
            k.paint(c.accent, .4, .4);
            if (s.monument === 'obelisco') k.cyl(.35, .08, .3, 3, 4, { caps: true });
            else if (s.monument === 'fontana') { k.cyl(1.2, 1.2, .3, .7, 18, { caps: false }); k.paint(c.glass, .9, .05, .4); k.cyl(1.1, 1.1, .6, .62, 18, { caps: true }); k.paint(c.accent, .4, .4); k.cyl(.15, .15, .3, 1.6, 8); }
            else { k.cyl(.2, .2, .3, 1.8, 8); k.sphere([0, 2.4, 0], .6, 14, 10); }
            break;
        }
        case 'capanna': {
            k.paint(c.soil, 0, .95); k.cyl(s.r + .1, s.r + .1, -PLINTH, .05, 12); wall();
            if (s.shape === 'cupola') { k.sphere([0, .05, 0], s.r, 16, 8, 0, Math.PI / 2); k.paint(c.roof, 0, .95); k.sphere([0, s.r * .55, 0], s.r * .5, 12, 4, 0, Math.PI / 2); }
            else { k.cyl(s.r, s.r, .05, s.wall, 14, { caps: false }); k.paint(c.roof, 0, .95); k.cyl(s.r + .35, .08, s.wall - .05, s.wall + s.roof, 14, { caps: true }); }
            k.paint(c.dark, 0, .9); k.box([s.r + .01, .5, 0], [.04, .45, .3]); break;
        }
        case 'casalunga': {
            k.paint(c.soil, 0, .95); k.box([0, -PLINTH / 2, 0], [s.len / 2 + .1, PLINTH / 2, s.w / 2 + .1]); wall(); k.box([0, s.wall / 2, 0], [s.len / 2, s.wall / 2, s.w / 2]);
            k.paint(c.roof, 0, .95); k.push([0, s.wall, 0], [0, 0, Math.PI / 2]); k.cyl(s.w * .62, s.w * .62, -s.len / 2 - .25, s.len / 2 + .25, 12, { caps: true }); k.pop();
            k.paint(c.dark, 0, .9); k.box([s.len / 2 + .01, .5, 0], [.04, .48, .35]); break;
        }
        case 'granaio': {
            k.paint(c.dark, 0, .9); for (const [x, z] of [[1, 1], [1, -1], [-1, 1], [-1, -1]]) k.beam([x * s.r * .6, 0, z * s.r * .6], [x * s.r * .6, s.legs, z * s.r * .6], .07);
            k.box([0, s.legs, 0], [s.r * .9, .06, s.r * .9]); wall(); k.cyl(s.r * .85, s.r * .85, s.legs, s.legs + s.r * 1.1, 12, { caps: false });
            k.paint(c.roof, 0, .95); k.cyl(s.r * 1.15, .06, s.legs + s.r * 1.05, s.legs + s.r * 2.2, 12, { caps: true }); break;
        }
        case 'focolare': {
            k.paint(c.dark, 0, .9); for (let i = 0; i < s.stones; i++) { const a = i * TAU / s.stones; k.sphere([Math.cos(a) * s.r, .1, Math.sin(a) * s.r], .22, 6, 4); }
            k.paint([1, .55, .2, 1], 0, .5, 2.4); k.cyl(.45, .05, .05, .7, 6, { caps: false }); k.paint(c.soil, 0, .95); k.cyl(s.r * .8, s.r * .8, -.3, .04, 12, { caps: true }); break;
        }
        case 'totem': {
            k.paint(c.soil, 0, .95); k.cyl(.45, .45, -PLINTH, .05, 8);
            for (let i = 0; i < s.parts; i++) { const y0 = i * s.h / s.parts, y1 = (i + 1) * s.h / s.parts; k.paint(i % 2 ? c.accent : c.roof, 0, .8); if (i % 3 === 2) k.box([0, (y0 + y1) / 2, 0], [.3, (y1 - y0) / 2, .3]); else k.cyl(.3, .24, y0, y1, 8, { caps: true }); }
            k.paint(c.accent, 0, .7); k.box([0, s.h * .7, 0], [.08, .08, .7]); break;
        }
    }
    return k.mesh();
}
