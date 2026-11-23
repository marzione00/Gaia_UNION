/** Buildings of the villages of the native peoples (1.64.0); the colonies are drawn by src/worlds/architecture.js
 * since 1.66.0. A building is a spec, a few numbers drawn for one village (size, roof, posts), and a
 * mesh built from the spec with the kit of the stations (src/craft/kit.js) at two levels of detail. The walls
 * are white, so each building takes the colour of its instance; roofs, frames, glass and soil keep their own.
 * Buildings face +x, where the door is, and stand on a plinth that reaches 2.5 units under the ground, so they
 * sit level on a slope. Sizes are in the units of the surface, where a person is about 1.1 units tall. */
import { Kit, TAU, WHITE } from '../craft/kit.js';

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
    switch (s.type) {
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
