/** Minor places of the zone of a landing site (1.78.0): veins of a mineral, cave mouths, iron meteorites,
 * navigation beacons of the colony, abandoned drilling sites, cairns of the first crew and the skeletons of large
 * animals, these only where animals with bones live. They fill the parts of the zone farthest from everything else, so that the explorer finds a place to
 * see within about FIND_TARGET metres from any point of dry land: findList covers the zone with points FIND_STEP
 * metres apart and puts each new place where the distance from every other place to see is largest, until no
 * point of dry land is farther than FIND_TARGET or MOST_FINDS places stand. Every minor place has a short story
 * with the numbers of the identity card (src/worlds/planet-physics.js) and a model in two levels of detail, built
 * in code with the mesh kit like the rare places (src/worlds/wonders.js). */
import { Kit } from '../craft/kit.js';
import { BIOME } from './biomes.js';
import { EDGE, METRE } from './explorer.js';
import { planetPhysics } from './planet-physics.js';
import { seededRandom } from '../scene/systems.js';
import { clearingOf } from './sites.js';
import { surf, lump, wave, mix, tint, word } from './wonders.js';

/** Largest distance from a place to see that findList leaves on dry land (metres), spacing of the points it
 * measures (metres), most minor places of a planet, least distance between two of them and farthest spot tried
 * around the point farthest from everything (units). */
export const FIND_TARGET = 400, FIND_STEP = 50, MOST_FINDS = 40, FIND_GAP = 90, FIND_SEARCH = 120;
/** Reach of the impulse of the scanner for the minor places (units, 500 m): src/app.js. */
export const FIND_SCAN = 500 * METRE;
const G0 = 9.80665, SOLAR = 1361;
const it = (x, d = 1) => x.toFixed(d).replace('.', ',').replace(/^-(?=[\d,]*[1-9])/, '−').replace(/^-/, '');
const big = x => Math.round(x).toLocaleString('it-IT'), m = (units, d = 1) => it(units / METRE, d);
/** Kinds of minor place: label, first word of the name, radius of its ground (units), what the planet needs. */
export const FIND_KINDS = Object.freeze({
    affioramento: { label: 'vena di minerale', name: 'Vena di', r: 6, when: () => true },
    grotta: { label: 'ingresso di grotta', name: 'Grotta di', r: 18, when: () => true },
    meteorite: { label: 'meteorite ferroso', name: 'Meteorite di', r: 6, when: () => true },
    faro: { label: 'faro di navigazione', name: 'Faro di', r: 6, when: () => true },
    attrezzatura: { label: 'trivella abbandonata', name: 'Trivella di', r: 7, when: () => true },
    cippo: { label: 'cippo della prima spedizione', name: 'Cippo di', r: 3, when: () => true },
    ossa: { label: 'scheletro di un grande animale', name: 'Scheletro di', r: 8, when: s => s.species.some(boned) }
});
/** Animals with bones: every form but the floating medusae. */
const boned = sp => sp.kind === 'animal' && sp.form !== 'medusa';
/** Minerals of the veins: density (kg/m³), colour, habit of the crystals (prism, cube or crust). */
export const MINERALS = Object.freeze({
    quarzo: { rho: 2650, col: [.86, .85, .82, 1], habit: 'prisma' }, gesso: { rho: 2320, col: [.93, .9, .84, 1], habit: 'prisma' },
    pirite: { rho: 5010, col: [.74, .63, .33, 1], habit: 'cubo' }, magnetite: { rho: 5170, col: [.16, .16, .18, 1], habit: 'cubo' },
    ematite: { rho: 5260, col: [.42, .15, .12, 1], habit: 'crosta' }, malachite: { rho: 3900, col: [.13, .5, .34, 1], habit: 'crosta' },
    zolfo: { rho: 2070, col: [.88, .78, .2, 1], habit: 'crosta' }, olivina: { rho: 3300, col: [.42, .55, .2, 1], habit: 'crosta' }
});
const VEINS = { volcanic: ['zolfo', 'olivina', 'magnetite'], barren: ['ematite', 'magnetite', 'quarzo'], arctic: ['quarzo', 'gesso', 'pirite'], desert: ['ematite', 'gesso', 'quarzo'], oceanic: ['malachite', 'pirite', 'quarzo'], terrestrial: ['quarzo', 'malachite', 'pirite'] };

/** The places to see of a surface (base, settlements, places of the card, sites, rare places) as points (x, z). */
export function marksOf(s) {
    const st = s.stations, base = [st.reduce((a, q) => a + q.position[0], 0) / st.length, st.reduce((a, q) => a + q.position[2], 0) / st.length];
    return [base, ...(s.settlements || []).map(t => [t.position[0], t.position[2]]), ...s.places.map(q => [q.position[0], q.position[2]]), ...(s.sites || []).map(x => [x.x, x.z]), ...(s.rares || []).map(x => [x.x, x.z])];
}
/** Minor places of a surface `s` whose sites, rare places and pad are known (prepareZone in
 * src/worlds/lander.js): { id 'f0'…, kind, x, y, z, h, r, biome, seed, name, story, and the sizes of its model }. */
export function findList(s) {
    const F = s.field; if (!F?.biomes) return [];
    const g = s.genome, p = planetPhysics()[s.index], r = seededRandom(g.terrain.seed ^ 0xF1D5), sea = s.seaY, step = FIND_STEP * METRE, n = Math.floor(2 * EDGE / step), at = k => -EDGE + (k + .5) * step;
    const marks = marksOf(s), clear = clearingOf([...(s.sites || []), ...(s.rares || []), ...(s.pad ? [{ x: s.pad.x, z: s.pad.z, r: 42 }] : [])]);
    // The points of dry land, as in scripts/varieta.mjs, with the square of their distance from the nearest place to see.
    const LX = [], LZ = [];
    for (let j = 0; j < n; j++) for (let k = 0; k < n; k++) { const x = at(k), z = at(j); if (sea === null || s.heightAt(x, z) >= sea - .5) { LX.push(x); LZ.push(z); } }
    const N = LX.length, D = new Float64Array(N).fill(Infinity);
    const near = (x, z) => { for (let i = 0; i < N; i++) { const dx = LX[i] - x, dz = LZ[i] - z, d = dx * dx + dz * dz; if (d < D[i]) D[i] = d; } };
    for (const [px, pz] of marks) near(px, pz);
    const kinds = Object.keys(FIND_KINDS).filter(k => FIND_KINDS[k].when(s));
    for (let i = kinds.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [kinds[i], kinds[j]] = [kinds[j], kinds[i]]; }
    const out = [], limit = (FIND_TARGET * METRE) ** 2;
    // A spot at (x, z) for a minor place of radius rr: dry and gentle, outside the square of the stations and inside
    // the zone, clear of the sites, the rare places, the pad, the settlements and the other minor places.
    const fits = (x, z, rr) => {
        if (Math.max(Math.abs(x), Math.abs(z)) < 122 + rr || Math.abs(x) > EDGE - rr - 30 || Math.abs(z) > EDGE - rr - 30) return null;
        if (clear(x, z, rr + 8) || out.some(o => Math.hypot(o.x - x, o.z - z) < FIND_GAP) || s.places.some(q => Math.hypot(q.position[0] - x, q.position[2] - z) < rr + 12)) return null;
        const y = s.heightAt(x, z); if ((sea !== null && y < sea + .35) || s.clear?.blocked(x, z)) return null;
        for (let k = 0; k < 6; k++) {
            const a = k * Math.PI / 3, qx = x + Math.cos(a) * rr, qz = z + Math.sin(a) * rr, qy = s.heightAt(qx, qz);
            if (Math.abs(qy - y) > Math.max(1.6, rr * .3) || (sea !== null && qy < sea + .15) || s.clear?.blocked(qx, qz)) return null;
        }
        return y;
    };
    for (let tries = 0; out.length < MOST_FINDS && tries < 400; tries++) {
        let w = -1; for (let i = 0; i < N; i++) if (w < 0 || D[i] > D[w]) w = i;
        if (w < 0 || D[w] <= limit) break;
        const q = { x: LX[w], z: LZ[w] };
        const kind = kinds[out.length % kinds.length], rr = FIND_KINDS[kind].r;
        // The farthest point, or the nearest spot around it that fits, on rings 15 units apart up to FIND_SEARCH (the
        // farthest points are often in the shallows); when none fits, the points within 40 units of it are left out
        // of the search.
        let spot = null;
        for (let d = 0; d <= FIND_SEARCH && !spot; d += 15) for (let a = 0; a < (d ? 8 : 1) && !spot; a++) { const x = q.x + Math.cos(a * Math.PI / 4 + d) * d, z = q.z + Math.sin(a * Math.PI / 4 + d) * d, y = fits(x, z, rr); if (y !== null) spot = [x, z]; }
        if (!spot) { for (let i = 0; i < N; i++) if ((LX[i] - q.x) ** 2 + (LZ[i] - q.z) ** 2 < 1600) D[i] = 0; continue; }
        const [x, z] = spot; out.push({ kind, x: +x.toFixed(2), z: +z.toFixed(2), b: F.biomeAt(x, z).id });
        near(x, z);
    }
    const used = new Set(), animals = s.species.filter(boned);
    return out.map((o, j) => {
        const rr = seededRandom((g.terrain.seed ^ 0xF17D) + j * 7907), K = FIND_KINDS[o.kind];
        let name; do name = K.name + ' ' + word(rr); while (used.has(name)); used.add(name);
        const place = { id: 'f' + j, kind: o.kind, x: o.x, y: +s.heightAt(o.x, o.z).toFixed(3), z: o.z, h: +(rr() * Math.PI * 2).toFixed(4), r: K.r, biome: o.b, seed: Math.floor(rr() * 1e9), name };
        findSizes(place, rr, g);
        place.story = findStory(place, p, animals);
        return place;
    });
}
/** Sizes of the model, chosen once so that the story and the model agree (units). */
function findSizes(o, r, g) {
    switch (o.kind) {
        case 'affioramento': {
            const v = VEINS[g.family] || VEINS.barren; o.mineral = v[Math.floor(r() * v.length)]; o.size = +(1.2 + r() * .7).toFixed(2); o.count = 8 + Math.floor(r() * 8);
            // The largest crystal: a prism 25 to 60 cm long or a cube 6 to 15 cm wide.
            o.crystal = +((MINERALS[o.mineral].habit === 'cubo' ? .06 + r() * .09 : .25 + r() * .35) * METRE).toFixed(3); break;
        }
        case 'grotta': o.width = +(4 + r() * 2).toFixed(2); o.height = +(3 + r() * 1.4).toFixed(2); o.mound = +(9 + r() * 3).toFixed(2); break;
        case 'meteorite': o.size = +(.45 + r() * .35).toFixed(3); break;
        case 'faro': o.height = +(8 + r() * 3).toFixed(2); break;
        case 'attrezzatura': o.height = +(4 + r() * 2).toFixed(2); o.crates = 2 + Math.floor(r() * 3); break;
        case 'cippo': o.height = +(1.2 + r() * .6).toFixed(2); o.courses = 5 + Math.floor(r() * 3); break;
        case 'ossa': o.length = +(5.5 + r() * 3.5).toFixed(2); o.ribs = 9 + Math.floor(r() * 5); break;
    }
}
/** The story of a minor place: what it is and a calculation with the numbers of the planet. */
function findStory(o, p, animals) {
    const g = p.gravity, G = g * G0, biome = (BIOME[o.biome]?.name || 'della zona').toLowerCase();
    switch (o.kind) {
        case 'affioramento': {
            const M = MINERALS[o.mineral], cm = it(o.crystal / METRE * 100, 0), grow = M.habit === 'prisma' ? `con cristalli prismatici lunghi fino a ${cm} cm` : M.habit === 'cubo' ? `con cristalli cubici larghi fino a ${cm} cm` : 'in croste e noduli lungo la frattura';
            return [`Una vena di ${o.mineral} attraversa un affioramento di roccia nel bioma ${biome}, ${grow}; più dura della roccia attorno, resta in rilievo quando questa si consuma.`, `Un metro cubo di ${o.mineral} ha una massa di ${big(M.rho)} kg; qui pesa ρ · g · V = ${it(M.rho * G / 1000, 1)} kN, contro ${it(M.rho * G0 / 1000, 1)} kN sulla Terra.`, 'La massa resta la stessa su ogni pianeta; il peso cambia con la gravità.'];
        }
        case 'grotta': return [`L’ingresso di una grotta, largo ${m(o.width)} m e alto ${m(o.height)} m, si apre in un dosso di roccia.`, `Pochi metri dentro, la temperatura resta vicina alla media della superficie, ${it(p.ts - 273.15, 0)} °C, perché la roccia attorno smorza le escursioni fra il giorno e la notte.`, 'Le grotte sono rifugi naturali per gli esploratori e, sui pianeti con vita, per molte specie.'];
        case 'meteorite': {
            const R = o.size / METRE, mass = 4 / 3 * Math.PI * R ** 3 * 7800, v = p.escape * 1000, E = .5 * mass * v * v;
            return [`Un blocco di ferro e nichel di circa ${big(mass / 1000)} t, largo ${it(2 * R, 1)} m, giace mezzo sepolto in un basso anello di terra smossa.`,
                p.pressure >= .1 ? `L’atmosfera, con ${it(p.pressure, 2)} bar, lo ha frenato e ne ha fuso la superficie, rimasta segnata da piccole cavità; senza attrito sarebbe arrivato ad almeno ${it(p.escape, 1)} km/s, la velocità di fuga del pianeta.`
                    : `Con un’atmosfera così sottile il corpo da cui proviene è arrivato quasi senza frenare, ad almeno ${it(p.escape, 1)} km/s, la velocità di fuga del pianeta, e nell’urto si è frantumato: questo è uno dei frammenti rimasti.`,
                `A quella velocità un corpo della stessa massa porta un’energia cinetica, ½ m v², pari a ${big(E / 4.184e9)} tonnellate di tritolo.`];
        }
        case 'faro': {
            const h = o.height / METRE, R = p.radius * 6371e3, d = Math.sqrt(2 * R * h) / 1000;
            return [`Un faro di navigazione della colonia, alto ${it(h, 0)} m, guida i rover con una luce e un segnale radio.`, `Chi sta a terra vede la sua luce fino a √(2Rh) = ${it(d, 1)} km, con il raggio del pianeta R di ${big(R / 1000)} km.`, 'Su un pianeta più grande lo stesso faro si vedrebbe più lontano: la distanza cresce come la radice del raggio.'];
        }
        case 'attrezzatura': {
            const F = p.flux * SOLAR, P = F * 2 * .2;
            return ['Una trivella abbandonata dalla prima spedizione, con le casse dei campioni e un pannello solare caduto.', `Alla distanza del pianeta la stella manda ${big(F)} W/m², ${it(p.flux, 2)} volte la luce che arriva alla Terra; un pannello di 2 m² con un rendimento del 20% ne raccoglierebbe al massimo ${big(P)} W, con la luce perpendicolare e senza perdite nell’aria.`, 'La luce si spande su sfere sempre più grandi, quindi diminuisce con il quadrato della distanza dalla stella.'];
        }
        case 'cippo': {
            const T = 2 * Math.PI * Math.sqrt(1 / G), T0 = 2 * Math.PI * Math.sqrt(1 / G0);
            return [`Un cippo di pietre a secco, alto ${m(o.height)} m, con la targa del primo equipaggio sceso sul pianeta.`, `Qui l’equipaggio misurò la gravità con un pendolo lungo 1 m: periodo T = 2π√(L/g) = ${it(T, 2)} s, contro ${it(T0, 2)} s sulla Terra.`, `Dal periodo si ricava g = 4π²L/T² = ${it(G, 2)} m/s².`];
        }
        case 'ossa': {
            const who = animals.length ? animals[o.seed % animals.length].name : 'un grande animale';
            return [`Lo scheletro di un grande animale estinto, lungo ${m(o.length, 0)} m, parente lontano della specie ${who}.`, 'Un animale lungo il doppio pesa otto volte tanto, mentre la sezione delle sue ossa cresce soltanto di quattro volte: per questo i grandi animali hanno ossa più tozze.', `Qui la gravità vale ${it(g, 2)} g: le ossa di un animale reggono un peso ${it(g, 2)} volte quello che la stessa massa avrebbe sulla Terra.`];
        }
    }
    return [];
}

/** Mesh of minor place `o` of surface `s` at level of detail `level` (0 near, 1 far), relative to the place,
 * with the circles (x, z, r, in zone coordinates) that stop the explorer. */
export function findModel(s, o, level) {
    const k = new Kit({ hull: [.62, .6, .56, 1], dark: [.12, .12, .13, 1], steel: [.5, .5, .52, 1], trim: [.66, .58, .4, 1], accent: [.95, .55, .15, 1], glass: [.14, .2, .3, 1], window: [1, .8, .5, 1], detail: level ? .5 : 1 });
    // Natural parts are lit as the ground (kind 0 of material 10), made things as hulls (kind 4), as for the rare places.
    const plain = k.paint.bind(k); k.kind = 0; k.paint = (col, metal = .55, rough = .5, glow = 0) => { plain(col, metal, rough, glow); k.pbr[3] = k.kind; return k; };
    const natural = () => { k.kind = 0; k.paint([1, 1, 1, 1], 0, .9); };
    const made = f => { k.kind = 4; f(); natural(); };
    natural();
    const r = seededRandom(o.seed), blocks = [], c = Math.cos(o.h), sn = Math.sin(o.h), y0 = o.y, q = o.seed % 97;
    // local turns a point of the model frame into the zone frame; lump turns its rocks by -h to match.
    const local = (x, z) => [x * c + z * sn, -x * sn + z * c], ground = (x, z) => s.heightAt(o.x + x, o.z + z) - y0;
    const rock = s.genome.palette.rock, soil = (x, z) => { const F = s.field, e = F.E(o.x + x, o.z + z); return [...F.colour(o.x + x, o.z + z, e, 0).slice(0, 3), 1]; };
    const block = (x, z, rr) => blocks.push([+(o.x + x).toFixed(2), +(o.z + z).toFixed(2), +rr.toFixed(2)]);
    FIND_MODELS[o.kind](k, { o, r, q, level, local, across: p => p[0] * c - p[2] * sn, ground, rock, soil, block, made, turn: -o.h });
    return { mesh: k.v.length ? k.mesh() : null, blocks };
}
const FIND_MODELS = {
    affioramento(k, { o, r, q, level, local, ground, rock, soil, block, made, turn }) {
        const M = MINERALS[o.mineral], base = mix(rock, [.42, .4, .38, 1], .3), dust = soil(0, 0), S = o.size, g0 = ground(0, 0);
        const weathered = (u, v, p) => mix(mix(base, tint(base, .78), Math.max(0, wave(q, p[0] * .7, p[1] * 1.6, p[2] * .7))), dust, Math.max(0, .5 - (p[1] - g0) / S) * .8);
        // Two blocks of host rock and, between them, the vein: a wall of harder mineral that stands a little higher,
        // along the local z axis, with its crystals on the crest.
        for (const side of [-1, 1]) { const [x, z] = local(side * S * .84, (r() - .5) * S * .2); lump(k, [x, ground(x, z) + S * .28, z], [S * .72, S * .82, S * 1.1], q + side, .26, weathered, level, turn); }
        const crest = z => g0 + S * .36 + S * .76 * Math.sqrt(Math.max(0, 1 - (z / (S * 1.3)) ** 2));
        made(() => {
            // The vein is massive mineral mixed with fragments of the host rock, rough and only a little shiny.
            k.paint(M.col, M.habit === 'cubo' ? .35 : .05, .7);
            lump(k, [0, g0 + S * .36, 0], [S * .26, S * .76, S * 1.3], q + 7, .34, (u, v, p) => mix(tint(M.col, .8 + .25 * (wave(q + 2, p[0] * 3, p[1] * 3, p[2] * 3) * .5 + .5)), base, Math.max(0, wave(q + 4, p[0] * 2.2, p[1] * 2.2, p[2] * 2.2)) * .45), level, turn);
            const n = level ? 3 : o.count;
            for (let j = 0; j < n; j++) {
                const zz = (j / Math.max(1, n - 1) - .5) * S * 1.6 + (r() - .5) * S * .1, [x, z] = local((r() - .5) * S * .12, zz), y = crest(zz) - .04, f = j ? .45 + .55 * r() : 1;
                if (M.habit === 'prisma') { const L = o.crystal * f, w = L * .14; k.paint(tint(M.col, .95 + r() * .15), .1, .12); k.push([x, y, z], [(r() - .5) * 1.1, r() * 6, (r() - .5) * 1.1]); k.cyl(w, w, -L * .25, L * .72, 6); k.cyl(w, 0, L * .72, L, 6, { caps: false }); k.pop(); }
                else if (M.habit === 'cubo') { const w = o.crystal * f / 2; k.paint(tint(M.col, .9 + r() * .2), .85, .25); k.push([x, y + w * .3, z], [r() * 6, r() * 6, r() * 6]); k.box([0, 0, 0], [w, w, w]); k.pop(); }
                else { const w = S * (.05 + r() * .05); lump(k, [x, y, z], [w * 1.3, w * .7, w * 1.3], q + 11 + j, .3, () => tint(M.col, .85 + r() * .3), 1, r() * 6); }
            }
        });
        block(0, 0, S * 1.5);
    },
    grotta(k, { o, q, level, local, ground, rock, soil, block, turn }) {
        const W = o.width, H = o.height, M = o.mound, base = mix(rock, [.5, .46, .4, 1], .35), dust = soil(0, 0), deep = [.04, .036, .032, 1], g0 = ground(0, 0);
        const face = (u, v, p) => mix(mix(base, tint(base, .8), Math.max(0, wave(q, p[0] * .4, p[1] * .9, p[2] * .4))), dust, Math.max(0, .45 - (p[1] - g0) / H) * .9);
        // Two shoulders of rock either side of the mouth, a lintel over it and the body of the hill behind.
        const [lx, lz] = local(-(W * .5 + M * .42), -M * .12), [rx, rz] = local(W * .5 + M * .42, -M * .12), [bx, bz] = local(0, -M), [tx, tz] = local(0, -M * .22);
        lump(k, [lx, ground(lx, lz) + H * .3, lz], [M * .45, H * 1.1, M * .55], q, .24, face, level, turn);
        lump(k, [rx, ground(rx, rz) + H * .3, rz], [M * .45, H * 1.05, M * .55], q + 1, .24, face, level, turn);
        lump(k, [bx, ground(bx, bz) + H * .55, bz], [M * .8, H * 1.4, M * .45], q + 2, .22, face, level, turn);
        lump(k, [tx, g0 + H * 1.08, tz], [W * .95 + M * .1, H * .52, M * .42], q + 3, .22, face, level, turn);
        // The dark recess: an arched half-tube into the rock and the wall at its end.
        surf(k, level ? 6 : 14, level ? 3 : 8, (u, v) => { const a = Math.PI * u, [x, z] = local(Math.cos(a) * W * .5 * (1 - v * .3), M * .15 - v * M * .65); return [x, g0 + Math.sin(a) * H * (1 - v * .35) - .15, z]; },
            (u, v) => mix(tint(base, .3), deep, Math.min(1, v * 3)), (u, v, p) => { const [x, z] = local(0, M * .15 - v * M * .65); return [x - p[0], g0 + H * .3 - p[1], z - p[2]]; });
        // Its floor, darker inwards, a little above the ground.
        surf(k, 2, level ? 2 : 6, (u, v) => { const [x, z] = local((u - .5) * W * .98 * (1 - v * .3), M * .15 - v * M * .65); return [x, ground(x, z) + .05, z]; }, (u, v) => mix(mix(dust, tint(base, .35), .6), deep, Math.min(1, v * 2.5)), () => [0, 1, 0]);
        surf(k, 1, 1, (u, v) => { const [x, z] = local((u - .5) * W * .75, -M * .48); return [x, g0 - .15 + v * H * .7, z]; }, () => deep, () => { const [x, z] = local(0, 1); return [x, 0, z]; });
        block(lx, lz, M * .45); block(rx, rz, M * .45); block(bx, bz, M * .55);
    },
    meteorite(k, { o, q, level, ground, soil, block, made, turn }) {
        const S = o.size, dust = soil(0, 0), thrown = tint(dust, .82);
        // A low ring of soil thrown out when it struck, then the iron mass half buried, dark with patches of rust.
        surf(k, level ? 12 : 32, level ? 2 : 4, (u, v) => { const a = u * Math.PI * 2, d = S * (1.4 + v * 3), x = Math.cos(a) * d, z = Math.sin(a) * d; return [x, ground(x, z) + Math.sin(v * Math.PI) * S * .45 * (1 + .3 * wave(q, Math.cos(a) * 3, 0, Math.sin(a) * 3)) - .03, z]; }, (u, v) => mix(thrown, dust, Math.abs(v - .35)), () => [0, 1, 0], true);
        made(() => { k.paint([.22, .21, .2, 1], .6, .55); lump(k, [0, ground(0, 0) + S * .4, 0], [S * 1.25, S * .85, S], q, .4, (u, v, p) => mix([.19, .18, .17, 1], [.4, .23, .13, 1], Math.max(0, wave(q + 9, p[0] * 4, p[1] * 4, p[2] * 4)) * .8), level, turn); });
        block(0, 0, S * 1.3);
    },
    faro(k, { o, level, ground, block, made }) {
        const H = o.height, g0 = ground(0, 0), low = Math.min(ground(.9, .9), ground(-.9, .9), ground(.9, -.9), ground(-.9, -.9));
        made(() => {
            // A concrete footing, a lattice mast, the lamp housing on top, an antenna, a solar panel and three guy wires.
            k.paint([.5, .5, .48, 1], .05, .9); k.box([0, (low + g0 + .4) / 2, 0], [.9, (g0 + .4 - low) / 2 + .1, .9]);
            k.paint([.68, .66, .62, 1], .7, .45); k.truss([0, g0 + .5, 0], [0, g0 + H, 0], .32, 1.1, .04);
            k.dark(); k.box([0, g0 + H + .18, 0], [.38, .2, .38]); k.glow([1, .36, .2, 1], 3.2); k.cyl(.14, .14, H + .38, H + .62, 10); k.dark(); k.cyl(.2, .02, H + .62, H + .74, 10);
            k.steel(); k.beam([0, g0 + H + .74, 0], [0, g0 + H + 2.2, 0], .015);
            k.trim(); k.box([0, g0 + 1.4, .5], [.22, .3, .1]);
            k.glass(); k.push([0, g0 + H * .4, .42], [-.7, 0, 0]); k.box([0, 0, .55], [.5, .02, .55]); k.pop();
            for (let j = 0; j < 3; j++) { const a = j * Math.PI * 2 / 3 + o.h, x = Math.cos(a) * H * .5, z = Math.sin(a) * H * .5, y = ground(x, z); k.steel(); k.beam([0, g0 + H * .8, 0], [x, y + .1, z], .012); k.paint([.45, .45, .43, 1], .1, .9); k.box([x, y + .05, z], [.16, .12, .16]); }
        });
        block(0, 0, 1.3);
    },
    attrezzatura(k, { o, r, level, local, ground, block, made }) {
        const H = o.height, g0 = ground(0, 0), rust = [.42, .25, .16, 1], paint = [.66, .52, .2, 1];
        made(() => {
            // A tripod over the borehole with the drill string and the head, a winch house, sample crates, a fallen panel and pipes.
            k.paint(mix(paint, rust, .45), .5, .7);
            for (let j = 0; j < 3; j++) { const a = j * Math.PI * 2 / 3 + o.h, x = Math.cos(a) * H * .38, z = Math.sin(a) * H * .38; k.beam([x, ground(x, z) - .1, z], [0, g0 + H, 0], .09); }
            k.steel(); k.cyl(.11, .11, g0 - .3, g0 + H - .25, 10); k.paint(mix(paint, rust, .3), .5, .6); k.box([0, g0 + H - .1, 0], [.34, .24, .34]); k.dark(); k.cyl(.3, .3, g0 - .05, g0 + .25, 12);
            k.paint(mix(paint, rust, .6), .4, .8); { const [x, z] = local(H * .55, 0); k.push([x, ground(x, z) + .5, z], [0, o.h, 0]); k.box([0, 0, 0], [.75, .5, .55], .4); k.dark(); k.cyl(.22, .22, -.2, .2, 12); k.pop(); }
            for (let j = 0; j < o.crates; j++) { const [x, z] = local(-H * .45 - j * 1.15, (r() - .5) * 2), w = .4 + r() * .2; k.paint(mix([.4, .43, .36, 1], rust, r() * .4), .2, .85); k.push([x, ground(x, z) + w * .75, z], [0, o.h + (r() - .5) * .6, 0]); k.box([0, 0, 0], [w * 1.25, w * .75, w], .3); k.pop(); }
            const [px, pz] = local(-.5, H * .6); k.glass(); k.push([px, ground(px, pz) + .3, pz], [.3, o.h + .4, -.28]); k.box([0, 0, 0], [1.1, .025, .7]); k.pop();
            k.steel(); for (let j = 0; j < (level ? 1 : 4); j++) { const [x, z] = local((r() - .5) * H, H * (.2 + r() * .3)); k.push([x, ground(x, z) + .1, z], [0, r() * 3, Math.PI / 2]); k.cyl(.08, .08, -1.1, 1.1, 8); k.pop(); }
        });
        block(0, 0, H * .42); { const [x, z] = local(H * .55, 0); block(x, z, .9); }
    },
    cippo(k, { o, r, q, level, ground, rock, block, made }) {
        const H = o.height, g0 = ground(0, 0), stone = mix(rock, [.55, .52, .48, 1], .3), n = level ? 3 : o.courses, h = H / (n + .4);
        // Dry stones in courses that narrow upwards: a ring of stones round a core in each course, fewer at each
        // step, and a flat capstone; beside it a short post with the plaque.
        let y = g0 - h * .25;
        for (let j = 0; j < n; j++) {
            const f = 1 - j / n * .7, ring = .5 * f, count = level ? 1 : Math.max(1, Math.round(5 * f) - (j === n - 1 ? 1 : 0)), turn = r() * 6;
            for (let i = 0; i < count; i++) { const a = turn + i / count * Math.PI * 2, d = count > 1 ? ring * (.75 + r() * .2) : 0, w = count > 1 ? ring * (.55 + r() * .2) : ring + .12; lump(k, [Math.cos(a) * d, y + h * .5, Math.sin(a) * d], [w, h * (.55 + r() * .12), w * (.7 + r() * .3)], q + j * 7 + i, .3, () => tint(stone, .78 + r() * .34), 1, r() * 6); }
            if (count > 2 && !level) lump(k, [0, y + h * .55, 0], [ring * .8, h * .5, ring * .8], q + j * 7 + 6, .25, () => tint(stone, .9), 1, r() * 6);
            y += h * .9;
        }
        lump(k, [(r() - .5) * .06, y + h * .2, (r() - .5) * .06], [.28, h * .3, .22], q + 99, .2, () => tint(stone, 1.05), level, r() * 6);
        made(() => { k.steel(); k.beam([.85, g0 - .1, 0], [.85, g0 + .75, 0], .035); k.trim(); k.push([.85, g0 + .8, 0], [0, 0, .5]); k.box([0, 0, 0], [.2, .02, .28]); k.pop(); });
        block(0, 0, .85);
    },
    ossa(k, { o, r, q, level, local, ground, soil, block, turn }) {
        const L = o.length, bone = [.82, .78, .68, 1], old = mix(bone, soil(0, 0), .4), nv = level ? 6 : 18;
        // A spine of vertebrae along the body, ribs that arch over it to the ground, the skull and the long bones of
        // the legs, half sunk in the soil.
        const spine = t => { const [x, z] = local((t - .5) * L, Math.sin(t * 3 + q) * L * .04); return [x, ground(x, z) + L * .09 * Math.sin(Math.PI * Math.min(1, t * 1.15)) + .12, z]; };
        for (let j = 0; j <= nv; j++) { const t = j / nv, p = spine(t), w = L * (.022 + .012 * Math.sin(Math.PI * t)); lump(k, p, [w, w * .9, w], q + j, .2, () => mix(bone, old, .3 + .4 * r()), 1, turn); }
        const ribs = level ? 4 : o.ribs, seg = level ? 3 : 6;
        for (let j = 0; j < ribs; j++) {
            const t = .22 + j / ribs * .42, p = spine(t), reach = L * (.12 + .06 * Math.sin(Math.PI * (j + .5) / ribs));
            k.paint(mix(bone, old, .35 + .3 * r()), 0, .8);
            for (const side of [-1, 1]) {
                const pts = []; for (let i = 0; i <= seg; i++) { const a = i / seg * Math.PI * .85, [dx, dz] = local(0, side * Math.sin(a) * reach), x = p[0] + dx, z = p[2] + dz; pts.push([x, Math.max(ground(x, z) - .08, p[1] - (1 - Math.cos(a)) * L * .11), z]); }
                for (let i = 0; i < seg; i++) k.beam(pts[i], pts[i + 1], L * .009);
            }
        }
        const head = spine(1.06); lump(k, head, [L * .085, L * .05, L * .055], q + 50, .22, () => mix(bone, old, .3), level, turn);
        if (!level) for (const [t, side] of [[.28, -1], [.3, 1], [.7, -1], [.72, 1]]) { k.paint(mix(bone, old, .5), 0, .85); const p = spine(t), [dx, dz] = local(L * (r() - .5) * .1, side * L * .2), x = p[0] + dx, z = p[2] + dz, [ex, ez] = local(L * .14, side * L * .06); k.beam([x, ground(x, z) + .05, z], [x + ex, ground(x + ex, z + ez) + .05, z + ez], L * .014); }
        block(0, 0, L * .4);
    }
};
