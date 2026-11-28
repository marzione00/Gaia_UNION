/** Rare natural places of the zone of a landing site (1.74.0): rock arches, hoodoos, hot springs with rings of
 * microbial mats, travertine terraces, young impact craters, giant gypsum crystals, penitentes, the radial
 * channels that carbon dioxide carves on cold thin-aired worlds, stromatolites, polygons of salt crust,
 * granite monoliths, balancing rocks, petrified forests, lava lakes, blue ice seracs and barchan dunes.
 * Each kind appears only where the physics of the planet allows it and only in the biomes where it forms, at
 * most once per planet; a planet has up to MOST_RARE of them, at least RARE_GAP units apart, RARE_INNER units
 * from the base and clear of the sites (src/worlds/sites.js). Every place has a story for the diary with the
 * numbers of the identity card (src/worlds/planet-physics.js).
 * Craters, lava pits, the basins of the hot springs, the salt flats and the dunes shape the ground itself:
 * reliefOf gives the change of height that the surface (src/worlds/surface.js) and the streamed ground
 * (src/worlds/clipmap.js) add to the field. The models, in two levels of detail, are built in code with the
 * mesh kit (src/craft/kit.js) when the camera comes near (src/scene/world.js). */
import { Kit, sub, cross, unit } from '../craft/kit.js';
import { BIOME } from './biomes.js';
import { EDGE, METRE } from './explorer.js';
import { planetPhysics } from './planet-physics.js';
import { seededRandom } from '../scene/systems.js';
import { axesOf, bearingOf } from './compass.js';
import { clearingOf } from './sites.js';

export const RARE_GAP = 300, RARE_INNER = 380, MOST_RARE = 9;
const CORE_EDGE = 112;
const it = (x, d = 1) => x.toFixed(d).replace('.', ',').replace(/^-(?=[\d,]*[1-9])/, '−').replace(/^-/, '');
const m = (units, d = 0) => it(units / METRE, d);
const C = t => t - 273.15;
const water = (p, s) => p.pressure >= .3 && s.seaY !== null;
/** Kinds of rare place. biomes: where it forms; when: what the planet needs; r: radius of its ground (units);
 * rise: largest change of height allowed at 0.7 r; shore: at the waterline; relief: it shapes the ground. */
export const RARE_KINDS = Object.freeze({
    arco: { label: 'arco di roccia', biomes: ['mesa', 'canyon', 'yardang', 'gradoni', 'scogliera', 'hamada', 'calanchi', 'fiordi', 'altopiano', 'scarpate', 'dorsali', 'colonnato'], when: () => true, r: 34, rise: 5 },
    camini: { label: 'camini delle fate', biomes: ['canyon', 'mesa', 'calanchi', 'yardang', 'cenere', 'gradoni', 'hamada'], when: p => p.pressure >= .01, r: 28, rise: 5 },
    sorgente: { label: 'sorgente calda colorata', biomes: ['altopiano-vulcanico', 'caldera', 'fumarole', 'vulcani', 'colline', 'prateria', 'steppa', 'tundra', 'foresta-cenere', 'criovulcani', 'brughiera'], when: (p, s) => s.species.length > 0 && p.pressure >= .5 && p.pressure <= 150 && C(p.ts) < boiling(p.pressure) - 30, r: 32, rise: 1.8, relief: true },
    travertino: { label: 'terrazze di travertino', biomes: ['gradoni', 'colline', 'altopiano-vulcanico', 'caldera', 'canyon', 'scogliera', 'fiordi', 'foresta-cenere', 'brughiera'], when: p => p.pressure >= .3 && p.ts > 260 && p.ts < 360, r: 34, rise: 9, slope: 1.6 },
    cratere: { label: 'cratere giovane', biomes: ['crateri', 'regolite', 'bacino', 'reg', 'hamada', 'mare-basaltico', 'altopiano', 'dorsali', 'scarpate', 'cenere', 'steppa', 'erg', 'nevaio', 'tundra', 'prateria'], when: p => p.pressure < 3, r: 68, rise: 4, relief: true },
    cristalli: { label: 'cristalli giganti', biomes: ['canyon', 'hamada', 'salina', 'mesa', 'altopiano', 'scarpate', 'crepacci', 'fumarole', 'caldera', 'dorsali', 'calanchi'], when: () => true, r: 22, rise: 4 },
    penitenti: { label: 'campo di penitenti', biomes: ['nevaio', 'ghiacciaio', 'ghiaccio-azzurro', 'crepacci', 'criovulcani', 'morene', 'tundra'], when: p => p.ts < 275, r: 30, rise: 3 },
    ragni: { label: 'ragni di anidride carbonica', biomes: ['regolite', 'crateri', 'nevaio', 'dorsali', 'altopiano', 'reg', 'hamada', 'mare-basaltico', 'scarpate', 'bacino', 'ghiaccio-azzurro'], when: p => p.pressure > .001 && p.pressure < .2 && p.ts < 245, r: 30, rise: 2.5 },
    stromatoliti: { label: 'banco di stromatoliti', biomes: ['laguna', 'salmastra', 'atollo', 'arcipelago', 'palude', 'dune-costiere', 'prateria', 'fiordi', 'scogliera', 'colline', 'steppa', 'tundra'], when: (p, s) => s.species.length > 0 && water(p, s) && p.ts > 273 && p.ts < 330, r: 24, rise: 2.5, shore: true },
    poligoni: { label: 'crosta di sale poligonale', biomes: ['salina'], when: () => true, r: 32, rise: 1.2, relief: true },
    inselberg: { label: 'monolite di granito', biomes: ['steppa', 'prateria', 'reg', 'erg', 'hamada', 'regolite', 'tundra', 'mare-basaltico', 'cenere', 'brughiera', 'nevaio', 'crateri'], when: () => true, r: 105, rise: 12 },
    masso: { label: 'masso in bilico', biomes: ['massi', 'morene', 'reg', 'hamada', 'steppa', 'brughiera', 'nevaio', 'tundra', 'ghiacciaio', 'colline', 'prateria', 'regolite'], when: () => true, r: 16, rise: 2.5 },
    fossili: { label: 'foresta pietrificata', biomes: ['steppa', 'reg', 'calanchi', 'erg', 'mesa', 'cenere', 'canyon', 'colline', 'prateria', 'foresta-cenere', 'gradoni'], when: (p, s) => s.species.some(sp => sp.kind === 'plant'), r: 30, rise: 3 },
    lava: { label: 'lago di lava', biomes: ['vulcani', 'colate', 'caldera', 'cenere', 'fumarole', 'colonnato'], when: (p, s) => s.genome.family === 'volcanic', r: 30, rise: 4, relief: true },
    seracchi: { label: 'seracchi di ghiaccio azzurro', biomes: ['ghiacciaio', 'crepacci', 'ghiaccio-azzurro', 'morene', 'nevaio', 'banchisa'], when: p => p.ts < 273, r: 26, rise: 6 },
    barcane: { label: 'campo di barcane', biomes: ['erg', 'dune-costiere', 'reg', 'cenere', 'salina', 'regolite', 'nevaio'], when: p => p.pressure >= .005, r: 64, rise: 3, relief: true }
});
const NAMES = { arco: 'Arco di', camini: 'Camini di', sorgente: 'Sorgente', travertino: 'Terrazze di', cratere: 'Cratere', cristalli: 'Cristalli di', penitenti: 'Penitenti di', ragni: 'Ragni di', stromatoliti: 'Stromatoliti di', poligoni: 'Poligoni di', inselberg: 'Monolite', masso: 'Masso di', fossili: 'Foresta pietrificata di', lava: 'Lago di lava', seracchi: 'Seracchi di', barcane: 'Barcane di' };
const SYL = ['al', 'be', 'cor', 'da', 'fen', 'gi', 'ler', 'mi', 'nor', 'os', 'pe', 'qua', 'sil', 'ter', 'ul', 'vel', 'za', 'rin', 'sa', 'ton'];
const WIND = ['nord', 'nord-est', 'est', 'sud-est', 'sud', 'sud-ovest', 'ovest', 'nord-ovest'];
const windName = b => WIND[Math.round(((b % 360) + 360) % 360 / 45) % 8];

/** Boiling point of water (°C) at pressure p (bar), from the Clausius–Clapeyron relation with a latent heat of
 * 40.66 kJ/mol and 100 °C at 1.01325 bar. */
export function boiling(p) { return 1 / (1 / 373.15 - 8.314 / 40660 * Math.log(p / 1.01325)) - 273.15; }
/** Frost point of carbon dioxide (°C) at pressure p (bar): latent heat of sublimation 25.2 kJ/mol, −78.5 °C at
 * 1.01325 bar. */
export function frost(p) { return 1 / (1 / 194.65 - 8.314 / 25200 * Math.log(p / 1.01325)) - 273.15; }
/** Power radiated by a square metre of lava at 1400 K (W), from the Stefan–Boltzmann law. */
export const LAVA_POWER = 5.670374e-8 * 1400 ** 4;

const smooth = (a, b, x) => { const t = Math.max(0, Math.min(1, (x - a) / (b - a))); return t * t * (3 - 2 * t); };
/** Dunes of a field of barchans, in world coordinates: centre, height, downwind direction. */
function dunesOf(place) {
    const r = seededRandom(place.seed ^ 0xD0E), w = place.wind, c = [-w[1], w[0]], out = [];
    for (let t = 0; t < 200 && out.length < place.count; t++) {
        const H = place.lowest + (place.highest - place.lowest) * (out.length === 0 ? 1 : out.length === 1 ? 0 : r()), a = (r() - .5) * 1.6 * place.r, b = (r() - .5) * 1.1 * place.r;
        const x = place.x + w[0] * a + c[0] * b, z = place.z + w[1] * a + c[1] * b;
        if (Math.hypot(x - place.x, z - place.z) + 7.6 * H > place.r * .95) continue;
        if (out.some(o => Math.hypot(o.x - x, o.z - z) < (o.H + H) * 4.2)) continue;
        out.push({ x, z, H, w, c });
    }
    return out;
}
/** Height of a barchan at a point: gentle windward slope, a crest bent downwind into two horns, and a slip face
 * at the angle of repose of sand (about 33°). */
function duneAt(d, x, z) {
    const dx = x - d.x, dz = z - d.z, u = dx * d.w[0] + dz * d.w[1], v = dx * d.c[0] + dz * d.c[1], W = 6 * d.H;
    if (Math.abs(v) >= W) return 0;
    const q = v / W, crest = .9 * W * q * q, Hc = d.H * (1 - q * q), du = u - crest;
    if (du <= 0) return Hc * Math.exp(-((du / (4.5 * d.H * (1 - q * q) + 1)) ** 2) * 1.8);
    return Math.max(0, Hc - du * Math.tan(33 * Math.PI / 180));
}
/** Change of height of the ground made by the rare places of a list, as a function (x, z, y) of a point and of
 * its height on the field: bowls and rims of craters, lava pits, the basins of the hot springs, flattened salt
 * flats and dunes. Null when no place of the list shapes the ground. */
export function reliefOf(list) {
    const parts = [];
    for (const p of list) {
        if (p.kind === 'cratere') { const R = p.size; parts.push({ p, reach: R * 2.3, f: d => (d < R ? -p.depth * (1 - (d / R) ** 2) : 0) + R * .055 * Math.exp(-(((d - R) / (.25 * R)) ** 2)) }); }
        else if (p.kind === 'lava') { const R = p.size; parts.push({ p, reach: R + 9, level: d => -p.depth + 1.2 * Math.exp(-(((d - R - 2.5) / 2.2) ** 2)), f: d => 1 - smooth(R - 3, R + 1, d), rim: d => 1.2 * Math.exp(-(((d - R - 2.5) / 2.2) ** 2)) }); }
        else if (p.kind === 'sorgente') { const R = p.size; parts.push({ p, reach: R * 2.2, level: d => -1.4 * (1 - smooth(R * .75, R * 1.02, d)) + .4 * Math.exp(-(((d - R * 1.3) / (R * .45)) ** 2)), f: d => 1 - smooth(R * 1.6, R * 2.2, d) }); }
        else if (p.kind === 'poligoni') { const R = p.size; parts.push({ p, reach: R + 8, flat: true, f: d => 1 - smooth(R, R + 8, d) }); }
        else if (p.kind === 'barcane') { const D = dunesOf(p); parts.push({ p, reach: p.r + 4, dunes: D }); }
    }
    if (!parts.length) return null;
    return (x, z, y) => {
        let dy = 0;
        for (const q of parts) {
            const ax = Math.abs(x - q.p.x), az = Math.abs(z - q.p.z); if (ax > q.reach || az > q.reach) continue;
            if (q.dunes) { let h = 0; for (const d of q.dunes) h = Math.max(h, duneAt(d, x, z)); dy += h; continue; }
            const d = Math.hypot(ax, az); if (d > q.reach) continue;
            dy += q.level ? (q.p.y + q.level(d) - y) * q.f(d) + (q.rim ? q.rim(d) * (1 - q.f(d)) : 0) : q.flat ? (q.p.y - y) * q.f(d) : q.f(d);
        }
        return dy;
    };
}

const shuffle = (list, r) => { for (let i = list.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [list[i], list[j]] = [list[j], list[i]]; } return list; };
const word = r => { let w = ''; for (let k = 0; k < 2; k++) w += SYL[Math.floor(r() * SYL.length)]; return w[0].toUpperCase() + w.slice(1); };
/** Largest change of height between the point and eight points at distance d around it. */
const riseAt = (s, x, z, y, d) => Math.max(...Array.from({ length: 8 }, (_, k) => Math.abs(s.heightAt(x + Math.cos(k * Math.PI / 4) * d, z + Math.sin(k * Math.PI / 4) * d) - y)));

/** Rare places of a surface `s` with its sites, in order of placement: { id 'n0'…, kind, x, y, z, h, r, biome,
 * seed, name, story, and the sizes of its model }. */
export function rareList(s, sites = s.sites || []) {
    const F = s.field; if (!F?.biomes) return [];
    const g = s.genome, p = planetPhysics()[s.index], r = seededRandom(g.terrain.seed ^ 0x2A7E5), sea = s.seaY, clear = clearingOf(sites);
    const off = [r() * 30, r() * 30], cells = [];
    for (let z = -EDGE + 120 + off[1]; z <= EDGE - 120; z += 30) for (let x = -EDGE + 120 + off[0]; x <= EDGE - 120; x += 30) if (Math.hypot(x, z) >= RARE_INNER) cells.push({ x, z, b: F.biomeAt(x, z).id });
    const kinds = shuffle(Object.keys(RARE_KINDS).filter(k => RARE_KINDS[k].when(p, s)), r), out = [], used = new Set();
    for (const kind of kinds) {
        if (out.length >= MOST_RARE) break;
        const K = RARE_KINDS[kind], pool = shuffle(cells.filter(c => K.biomes.includes(c.b)), r);
        for (const c of pool.slice(0, 220)) {
            let x = c.x, z = c.z;
            if (Math.hypot(x, z) < RARE_INNER + K.r || out.some(o => Math.hypot(o.x - x, o.z - z) < RARE_GAP) || clear(x, z, K.r + 30)) continue;
            if ((K.relief && Math.max(Math.abs(x), Math.abs(z)) - K.r < CORE_EDGE + 10) || Math.abs(x) > EDGE - K.r - 20 || Math.abs(z) > EDGE - K.r - 20) continue;
            if (K.shore) {
                // The waterline: the point of the cell nearest to the level of the sea, with water within 12 units.
                if (sea === null) continue;
                let best = null;
                for (let a = 0; a < 48; a++) { const q = [x + Math.cos(a * 2.4) * (a % 16), z + Math.sin(a * 2.4) * (a % 16)], y = s.heightAt(q[0], q[1]); if (!best || Math.abs(y - sea - .1) < Math.abs(best[2] - sea - .1)) best = [q[0], q[1], y]; }
                if (Math.abs(best[2] - sea - .1) > .35) continue;
                if (![0, 1, 2, 3, 4, 5, 6, 7].some(k => s.heightAt(best[0] + Math.cos(k * .785) * 12, best[1] + Math.sin(k * .785) * 12) < sea - .4)) continue;
                [x, z] = best;
            }
            const y = s.heightAt(x, z);
            if (!K.shore && sea !== null && y < sea + 1.5) continue;
            const rise = riseAt(s, x, z, y, K.r * .7); if (rise > K.rise || (K.slope && rise < K.slope)) continue;
            out.push({ kind, x, z, y, b: c.b }); break;
        }
    }
    const axes = axesOf(s), plants = s.species.filter(sp => sp.kind === 'plant');
    return out.map((o, j) => {
        const rr = seededRandom((g.terrain.seed ^ 0x51DE) + j * 7919), K = RARE_KINDS[o.kind];
        let name; do name = NAMES[o.kind] + ' ' + word(rr); while (used.has(name)); used.add(name);
        const place = { id: 'n' + j, kind: o.kind, x: +o.x.toFixed(2), y: 0, z: +o.z.toFixed(2), h: +(rr() * Math.PI * 2).toFixed(4), r: K.r, biome: o.b, seed: Math.floor(rr() * 1e9), name };
        place.y = +s.heightAt(place.x, place.z).toFixed(3);
        sizes(place, rr, axes);
        place.story = storyOf(place, p, g, s, axes, plants);
        return place;
    });
}
/** Sizes of the model of a place, chosen once so that the story and the model agree. */
function sizes(o, r, axes) {
    switch (o.kind) {
        case 'arco': o.span = +(18 + r() * 16).toFixed(1); o.height = +(o.span * (.55 + r() * .25)).toFixed(1); o.thick = +(3.4 + r() * 2.4).toFixed(2); break;
        case 'camini': o.count = 8 + Math.floor(r() * 7); o.tallest = +(9 + r() * 7).toFixed(1); break;
        case 'sorgente': o.size = +(7 + r() * 5).toFixed(1); break;
        case 'travertino': o.count = 6 + Math.floor(r() * 4); break;
        case 'cratere': o.size = +(16 + r() * 13).toFixed(1); o.depth = +(o.size * .2).toFixed(2); o.r = Math.ceil(o.size * 2.3); break;
        case 'cristalli': o.longest = +(5 + r() * 4.5).toFixed(1); break;
        case 'penitenti': o.tallest = +(2 + r() * 1.5).toFixed(2); break;
        case 'ragni': o.count = 3 + Math.floor(r() * 4); o.widest = +(12 + r() * 8).toFixed(1); break;
        case 'stromatoliti': o.count = 24 + Math.floor(r() * 18); o.tallest = +(.9 + r() * .5).toFixed(2); break;
        case 'poligoni': o.size = 24; o.cell = +(1.1 + r() * .5).toFixed(2); break;
        case 'inselberg': o.long = +(42 + r() * 26).toFixed(1); o.wide = +(o.long * (.5 + r() * .18)).toFixed(1); o.height = +(22 + r() * 16).toFixed(1); o.r = Math.ceil(o.long * 1.45 + 6); break;
        case 'masso': o.boulder = [+(2 + r() * .9).toFixed(2), +(1.5 + r() * .8).toFixed(2), +(1.8 + r() * .9).toFixed(2)]; o.stand = +(1.3 + r() * .9).toFixed(2); break;
        case 'fossili': o.count = 6 + Math.floor(r() * 5); o.longest = +(9 + r() * 5).toFixed(1); break;
        case 'lava': o.size = +(13 + r() * 5).toFixed(1); o.depth = +(7 + r() * 3).toFixed(1); break;
        case 'seracchi': o.count = 6 + Math.floor(r() * 6); o.tallest = +(6 + r() * 4.5).toFixed(1); break;
        case 'barcane': {
            o.count = 4 + Math.floor(r() * 3); o.highest = +(4 + r() * 1.8).toFixed(2); o.lowest = +(1.6 + r() * .6).toFixed(2);
            o.from = Math.floor(r() * 360); const a = o.from * Math.PI / 180, f = [axes.north[0] * Math.cos(a) + axes.east[0] * Math.sin(a), axes.north[1] * Math.cos(a) + axes.east[1] * Math.sin(a)];
            o.wind = [+(-f[0]).toFixed(4), +(-f[1]).toFixed(4)]; break;
        }
    }
}
/** Story of a place: three or four sentences with the numbers of the planet. */
function storyOf(o, p, g, s, axes, plants) {
    const gr = g.gravity, P = it(p.pressure, p.pressure < .1 ? 3 : 2), T = it(C(p.ts), 0), arctic = g.family === 'arctic';
    switch (o.kind) {
        case 'arco': {
            const by = p.pressure >= .3 ? 'dall’acqua e dal vento' : p.pressure >= .01 ? 'dal vento carico di sabbia' : 'dalle escursioni di temperatura fra il giorno e la notte, che spaccano la roccia';
            return [`Arco di roccia largo ${m(o.span)} m e alto ${m(o.height)} m, scavato ${by} in uno strato tenero sotto uno più resistente.`,
                'Sotto il proprio peso la roccia dell’arco è compressa lungo la curva, come i conci di un arco di pietra, e resiste finché la forma segue la linea delle spinte.',
                Math.abs(gr - 1) < .05 ? `Lo sforzo dovuto al peso cresce con la densità della roccia, con la gravità e con le dimensioni: con ${it(gr, 2)} g un arco della stessa roccia e della stessa forma può avere quasi le dimensioni di uno terrestre.`
                    : gr < 1 ? `Lo sforzo dovuto al peso cresce con la densità della roccia, con la gravità e con le dimensioni: con ${it(gr, 2)} g un arco della stessa roccia e della stessa forma può essere ${it(1 / gr, 2)} volte più grande di uno terrestre prima di cedere.`
                    : `Lo sforzo dovuto al peso cresce con la densità della roccia, con la gravità e con le dimensioni: con ${it(gr, 2)} g un arco della stessa roccia e della stessa forma deve essere ${it(gr, 2)} volte più piccolo di uno terrestre per reggersi.`];
        }
        case 'camini': return [`${o.count} pinnacoli di roccia tenera, alti fino a ${m(o.tallest)} m, ciascuno protetto da un cappello di roccia più dura.`,
            'Dove il cappello resiste, la colonna sotto resta in piedi; dove cade, la colonna si consuma in fretta e diventa un cono di detriti.',
            p.ts > 245 && p.ts < 300 && p.pressure >= .1 ? `Con una temperatura media di ${T} °C il gelo e il disgelo dell’acqua nelle fessure allargano le fratture: l’acqua che gela aumenta di volume di circa il 9 %.`
                : 'Il vento carico di sabbia consuma soprattutto la parte bassa delle colonne, dove i granelli rimbalzano più spesso, e molti pinnacoli si assottigliano alla base.'];
        case 'sorgente': return [`Sorgente d’acqua calda larga ${m(o.size * 2)} m, al centro di una conca di depositi minerali.`,
            `Con ${P} bar l’acqua bolle a ${it(boiling(p.pressure), 0)} °C: la temperatura di ebollizione cresce con la pressione, secondo la relazione di Clausius e Clapeyron. Al centro l’acqua arriva vicina all’ebollizione e si raffredda verso il bordo, dove l’aria ha in media ${T} °C.`,
            'Gli anelli di colore sono tappeti di microrganismi diversi, ciascuno adatto a un intervallo di temperatura; sulla Terra nessun organismo fotosintetico vive sopra i 73 °C circa, e il centro resta azzurro.'];
        case 'travertino': return [`${o.count} vasche di travertino a gradini, scese una dall’altra lungo il pendio.`,
            'L’acqua sotterranea, ricca di anidride carbonica, scioglie il calcare; quando sgorga perde CO₂ e il carbonato di calcio precipita: Ca²⁺ + 2 HCO₃⁻ → CaCO₃ + CO₂ + H₂O.',
            'Il deposito cresce più in fretta sui bordi, dove l’acqua scorre veloce e perde più gas: le vasche si alzano e restano piene.'];
        case 'cratere': {
            const E = .5 * p.escape ** 2;
            return [`Cratere largo ${m(o.size * 2)} m e profondo ${m(o.depth)} m, con il bordo ancora netto, segno che è recente.`,
                `Un corpo che arriva da lontano colpisce il pianeta almeno alla velocità di fuga, ${it(p.escape, 1)} km/s: ogni chilogrammo porta un’energia cinetica di ${it(E, 0)} MJ, ${it(E / 4.184, 0)} volte quella liberata da un chilogrammo di tritolo.`,
                `L’impatto scava una cavità circa venti volte più larga del corpo, che misurava quindi intorno a ${m(o.size * 2 / 20, 1)} m; frammenti di ferro e nichel sono sparsi sul bordo.`,
                p.pressure >= .1 ? `L’atmosfera, con ${P} bar, frena e consuma i corpi più piccoli, e arrivano al suolo soltanto i più grandi.` : 'Senza un’atmosfera densa che li freni, anche i corpi piccoli arrivano al suolo.'];
        }
        case 'cristalli': return [`Cristalli di gesso lunghi fino a ${m(o.longest)} m, affiorati quando l’erosione ha aperto la cavità dove sono cresciuti.`,
            'Sono cresciuti per centinaia di migliaia di anni in acqua satura di solfato di calcio, a temperatura quasi costante: sotto i 58 °C circa il gesso, CaSO₄·2H₂O, è più stabile dell’anidrite, che si scioglie lentamente e cede il solfato ai cristalli.',
            'Le facce piane seguono i piani del reticolo degli atomi, e ogni cristallo cresce più in fretta lungo una direzione.',
            p.pressure >= .3 && p.ts > 273 ? 'All’aperto la pioggia li consuma: il gesso si scioglie in acqua, circa 2,4 g per litro.' : `All’aperto, con ${P} bar e ${T} °C, si consumano molto lentamente.`];
        case 'penitenti': {
            const e = 90 - Math.abs(axes.lat) * 180 / Math.PI, toward = axes.noon[0] * axes.north[0] + axes.noon[1] * axes.north[1] > 0 ? 'nord' : 'sud';
            return [`Lame di neve e ghiaccio alte fino a ${m(o.tallest, 1)} m, in file da est a ovest e inclinate verso la stella di mezzogiorno, alta ${it(e, 0)}° sull’orizzonte verso ${toward}.`,
                `Si formano dove l’aria è fredda e secca, qui in media ${T} °C: il ghiaccio passa direttamente a vapore, e nelle cavità fra le lame la luce riflessa si concentra e scava più in fretta che sulle creste.`,
                'Sulla Terra i penitenti crescono sulle Ande sopra i 4000 m; le immagini della sonda New Horizons fanno pensare a lame simili, alte centinaia di metri, su Plutone.'];
        }
        case 'ragni': return [`${o.count} ragnatele di canali scuri, larghe fino a ${m(o.widest)} m, che si diramano a raggiera da un punto centrale.`,
            'In primavera la luce della stella attraversa una lastra trasparente di ghiaccio di anidride carbonica e scalda il suolo sotto: il ghiaccio sublima dalla base, il gas in pressione rompe la lastra ed esce in getti che portano in superficie polvere scura.',
            `Se l’aria è fatta soprattutto di anidride carbonica, come su Marte, con ${P} bar questa gela a ${it(frost(p.pressure), 0)} °C; la temperatura media qui è di ${T} °C.`,
            'Su Marte canali di questo tipo si osservano vicino al polo sud, dove ogni inverno si deposita ghiaccio di anidride carbonica.'];
        case 'stromatoliti': return [`${o.count} cupole stratificate alte fino a ${m(o.tallest, 1)} m lungo la riva, in parte sommerse.`,
            'Le costruiscono tappeti di microrganismi fotosintetici: crescono verso la luce, intrappolano granuli di sedimento e fanno precipitare carbonato, uno strato sottile sopra l’altro.',
            'Sulla Terra le stromatoliti più antiche hanno circa 3,4 miliardi di anni e sono fra le prime tracce della vita; i cianobatteri che le costruiscono liberano ossigeno, e organismi simili hanno riempito di ossigeno l’atmosfera terrestre circa 2,4 miliardi di anni fa.'];
        case 'poligoni': return [`Crosta di sale divisa in poligoni larghi circa ${m(o.cell, 1)} m, con i bordi rialzati a cresta.`,
            'Sotto la crosta c’è acqua salata: in superficie evapora e diventa più densa, scende in lame sottili e risale altrove, in celle di convezione che depositano più sale lungo i bordi.',
            `I poligoni si formano dove l’acqua di falda resta vicina alla superficie e l’evaporazione è forte; qui il flusso della stella è ${it(p.flux, 2)} volte quello che la Terra riceve dal Sole.`];
        case 'inselberg': {
            const MPa = 2700 * 9.80665 * gr * o.height / METRE / 1e6;
            return [`Monolite di granito alto ${m(o.height)} m e lungo ${m(o.long * 2)} m, rimasto in piedi mentre l’erosione asportava le rocce intorno, più fratturate.`,
                `Alla base la roccia sostiene il peso della colonna sovrastante: con una densità di 2700 kg/m³ e una gravità di ${it(gr, 2)} g la pressione è ρgh = ${it(MPa, 1)} MPa.`,
                'Liberato dal peso delle rocce erose, il granito si espande appena e si stacca in lastre curve parallele alla superficie, come gli strati di una cipolla.'];
        }
        case 'masso': {
            const [a, b, c] = o.boulder, t = 4 / 3 * Math.PI * a * b * c / METRE ** 3 * 2.7, kN = t * 9.80665 * gr;
            const glacial = arctic || ['morene', 'ghiacciaio', 'nevaio', 'tundra'].includes(o.biome);
            return [glacial ? `Masso erratico di circa ${it(t, t >= 100 ? 0 : 1)} t, portato qui da un ghiacciaio e rimasto in bilico su una roccia più piccola quando il ghiaccio si è ritirato.`
                : p.pressure >= .01 ? `Masso di circa ${it(t, t >= 100 ? 0 : 1)} t in bilico su un piedistallo che il vento carico di sabbia ha consumato più in basso, dove i granelli rimbalzano più spesso.`
                    : `Masso di circa ${it(t, t >= 100 ? 0 : 1)} t rimasto in bilico su una roccia più stretta, dopo che l’erosione ha asportato il terreno intorno.`,
                `Resta in equilibrio finché la verticale del suo baricentro cade dentro l’appoggio. La gravità, ${it(gr, 2)} g, fissa il suo peso, ${it(kN, 0)} kN, e lascia invariata la condizione di equilibrio.`,
                'Un terremoto con accelerazioni pari a una frazione apprezzabile di g lo farebbe cadere: per questo i geologi usano le rocce in bilico per stimare quanto forte ha tremato il terreno nelle ultime migliaia di anni.'];
        }
        case 'fossili': {
            const plant = plants[o.seed % plants.length];
            return [`${o.count} tronchi pietrificati, il più lungo di ${m(o.longest)} m, spezzati in sezioni dalle fratture della pietra.`,
                `Il legno, sepolto in fretta da ${g.family === 'volcanic' || o.biome === 'cenere' || o.biome === 'foresta-cenere' ? 'cenere vulcanica' : 'fango'}, è stato attraversato da acqua ricca di silice, che ha sostituito la materia organica cellula per cellula: la forma degli anelli resta, il materiale è quarzo.`,
                'Il rosso e il giallo vengono dagli ossidi di ferro, il viola e il nero dagli ossidi di manganese.',
                `Erano forse antenati di ${plant.name}, che cresce ancora sul pianeta.`];
        }
        case 'lava': {
            const star = p.flux * 1361;
            return [`Lago di lava largo ${m(o.size * 2)} m sul fondo di un cratere a pozzo profondo ${m(o.depth)} m.`,
                'La superficie si raffredda in placche di crosta scura; la convezione della lava sottostante le spinge, le spezza e le fa sprofondare, e nelle fratture la lava resta incandescente.',
                `A circa 1130 °C un metro quadrato di lava scoperta irradia σT⁴ ≈ ${it(LAVA_POWER / 1000, 0)} kW, ${it(LAVA_POWER / star, 0)} volte la luce che la stella porta su un metro quadrato del pianeta.`,
                'Un lago di lava resta liquido per anni soltanto se il magma continua a salire e a ridiscendere nel condotto.'];
        }
        case 'seracchi': return [`${o.count} seracchi alti fino a ${m(o.tallest)} m: torri e blocchi di ghiaccio staccati dove il ghiacciaio scende su un gradino della roccia e si frattura.`,
            'Il ghiaccio compatto e senza bolle d’aria è azzurro: l’acqua assorbe un poco la luce rossa, e attraverso qualche metro di ghiaccio resta soprattutto la luce blu.',
            `Con una temperatura media di ${T} °C il ghiaccio scorre lentamente sotto il proprio peso, come un fluido molto viscoso, e i seracchi crollano e si riformano.`];
        case 'barcane': {
            const to = windName(o.from + 180);
            return [`${o.count} dune a mezzaluna, alte da ${m(o.lowest, 1)} a ${m(o.highest, 1)} m, con le corna rivolte verso ${to}: il vento dominante soffia da ${windName(o.from)}.`,
                'Le barcane si formano dove il vento soffia quasi sempre dalla stessa direzione e la sabbia è poca; il fianco esposto al vento è dolce, quello opposto ripido, vicino all’angolo di riposo della sabbia, circa 33°.',
                `Le dune piccole avanzano più in fretta: la portata di sabbia sulla cresta è simile per tutte, e per avanzare di un metro una duna alta deve spostare più sabbia. La velocità è inversamente proporzionale all’altezza, e la duna più bassa corre ${it(o.highest / o.lowest, 1)} volte più della più alta.`];
        }
    }
    return [];
}

// ─── Models ────────────────────────────────────────────────────────────────────────────────────────────────
const mix = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t, 1];
const tint = (c, k) => [Math.min(1, c[0] * k), Math.min(1, c[1] * k), Math.min(1, c[2] * k), 1];
/** Smooth noise in [-1, 1] from a seed and a point. */
const wave = (q, x, y, z) => (Math.sin(x * 1.31 + q * 7.3 + Math.sin(z * .87 + q)) * Math.sin(z * 1.17 - q * 3.1 + Math.sin(y * 1.9)) + Math.sin(y * 2.3 + x * .7 + q * 1.7) * .5) / 1.5;
/** Parametric surface P(u, v) on an nu × nv grid, with normals from the neighbouring points, turned towards
 * out(u, v, p); colours from col(u, v, p). With `wrap` the grid closes along u. */
function surf(k, nu, nv, P, col, out, wrap = false) {
    const cols = wrap ? nu : nu + 1, pts = [];
    for (let j = 0; j <= nv; j++) for (let i = 0; i < cols; i++) pts.push(P(i / nu, j / nv));
    const at = (i, j) => pts[Math.max(0, Math.min(nv, j)) * cols + (wrap ? ((i % cols) + cols) % cols : Math.max(0, Math.min(nu, i)))], ids = [];
    for (let j = 0; j <= nv; j++) for (let i = 0; i < cols; i++) {
        const p = at(i, j), du = sub(at(i + 1, j), at(i - 1, j)), dv = sub(at(i, j + 1), at(i, j - 1)), o = out(i / nu, j / nv, p);
        let n = cross(du, dv); if (Math.hypot(...n) < 1e-9) n = o;
        if (n[0] * o[0] + n[1] * o[1] + n[2] * o[2] < 0) n = n.map(v => -v);
        ids.push(k.vertex(p, unit(n), i / nu, j / nv, col(i / nu, j / nv, p)));
    }
    const id = (i, j) => ids[j * cols + (wrap ? i % cols : i)];
    for (let j = 0; j < nv; j++) for (let i = 0; i < nu; i++) { const a = id(i, j), b = id(i + 1, j), c = id(i, j + 1), d = id(i + 1, j + 1); k.i.push(a, b, d, a, d, c); }
}
/** Rock: an ellipsoid with radii rx, ry, rz at c, roughened by noise of amplitude `rough`. */
function lump(k, c, [rx, ry, rz], q, rough, col, level, turn = 0) {
    const nu = level ? 7 : 16, nv = level ? 5 : 11, cs = Math.cos(turn), sn = Math.sin(turn);
    surf(k, nu, nv, (u, v) => {
        // Two octaves of noise and sharp creases, so the rock has facets and edges.
        const a = u * Math.PI * 2, t = v * Math.PI, n = [Math.cos(a) * Math.sin(t), Math.cos(t), Math.sin(a) * Math.sin(t)];
        const f = 1 + rough * (wave(q, n[0] * 2.2, n[1] * 2.2, n[2] * 2.2) + .45 * wave(q + 5, n[0] * 5.1, n[1] * 5.1, n[2] * 5.1) - .5 * Math.abs(Math.sin(n[0] * 3.7 + n[2] * 2.9 + q)) ** 3);
        const x = n[0] * rx * f, z = n[2] * rz * f;
        return [c[0] + x * cs - z * sn, c[1] + n[1] * ry * f, c[2] + x * sn + z * cs];
    }, col, (u, v, p) => sub(p, c), true);
}
/** Mesh of rare place `o` of surface `s` at level of detail `level` (0 near, 1 far), in coordinates relative to
 * the place, with the circles (x, z, r, in zone coordinates) that stop the explorer. */
export function rareModel(s, o, level) {
    const k = new Kit({ hull: [.6, .6, .6, 1], dark: [.1, .1, .1, 1], steel: [.5, .5, .5, 1], trim: [.6, .6, .6, 1], accent: [1, .6, .2, 1], glass: [.5, .6, .7, 1], window: [1, .8, .5, 1] });
    // Rock, ice, sand and mats are lit as the ground (kind 0 of material 10: its grain, its tint and its exposure),
    // so they belong to the landscape; water, crystals and lava are lit as smooth surfaces (kind 4).
    const plain = k.paint.bind(k); k.kind = 0; k.paint = (col, metal = .55, rough = .5, glow = 0) => { plain(col, metal, rough, glow); k.pbr[3] = k.kind; return k; };
    const r = seededRandom(o.seed), blocks = [], c = Math.cos(o.h), sn = Math.sin(o.h), y0 = o.y;
    const local = (x, z) => [x * c + z * sn, -x * sn + z * c], ground = (x, z) => s.heightAt(o.x + x, o.z + z) - y0;
    const rock = s.genome.palette.rock, soil = (x, z) => { const F = s.field, e = F.E(o.x + x, o.z + z); return F.colour(o.x + x, o.z + z, e, 0).slice(0, 3); };
    const block = (x, z, rr) => blocks.push([+(o.x + x).toFixed(2), +(o.z + z).toFixed(2), +rr.toFixed(2)]);
    MODELS[o.kind](k, { s, o, r, level, local, ground, rock, soil, block });
    const mesh = k.v.length ? k.mesh() : null;
    return { mesh, blocks };
}

const MODELS = {
    arco(k, { s, o, r, level, local, ground, rock, soil, block }) {
        const L = o.span, H = o.height, T = o.thick, [ax, az] = local(-L / 2, 0), [bx, bz] = local(L / 2, 0), gA = ground(ax, az), gB = ground(bx, bz), q = o.seed % 97, dust = soil(0, 0);
        const dark = ['volcanic', 'barren'].includes(s.genome.family), base = mix(rock, dark ? [.36, .33, .31, 1] : [.7, .5, .37, 1], dark ? .3 : .5), light = mix(base, [.92, .84, .72, 1], .3), deep = tint(base, .62);
        const centre = t => { const e = Math.abs(2 * t - 1), y = e <= 1 ? H * Math.pow(Math.max(0, 1 - Math.pow(e, 2.4)), 1 / 1.6) : -(e - 1) * H * 4; const [x, z] = local((t - .5) * L, T * .25 * wave(q, t * 3, 0, 1)); return [x, gA + (gB - gA) * t + y, z]; };
        const side3 = (() => { const [lx, lz] = local(0, 1); return [lx, 0, lz]; })(), frame = t => { const p = centre(t), tg = unit(sub(centre(t + .01), centre(t - .01))); return [p, unit(cross(side3, tg))]; };
        k.paint([1, 1, 1, 1], 0, .9);
        // A fin of layered rock: a squarish section, thinner at the top of the vault and flaring into the ground,
        // with ledges where harder layers stand out.
        surf(k, level ? 8 : 18, level ? 20 : 60, (v, u) => {
            const t = -.05 + u * 1.1, e = Math.min(1.1, Math.abs(2 * t - 1)), [p, nrm] = frame(t), a = v * Math.PI * 2, ca = Math.cos(a), sa = Math.sin(a);
            const sq = (c2, k2) => Math.sign(c2) * Math.abs(c2) ** k2, w = T * (1.5 + 1.8 * e ** 3), hh = T * (.75 + 1.3 * e ** 3);
            const yw = p[1] + nrm[1] * sq(ca, .6) * hh / 2, ledge = .06 * Math.sign(Math.sin(yw * 1.4 + q)), f = 1 + .16 * wave(q, t * 7, a * 1.3, 0) + .07 * wave(q + 3, t * 19, a * 3, 1) + ledge - .06 * Math.abs(Math.sin(t * 31 + a * 2)) ** 4;
            return [p[0] + (nrm[0] * sq(ca, .6) * hh / 2 + side3[0] * sq(sa, .6) * w / 2) * f, p[1] + nrm[1] * sq(ca, .6) * hh / 2 * f, p[2] + (nrm[2] * sq(ca, .6) * hh / 2 + side3[2] * sq(sa, .6) * w / 2) * f];
        }, (u, v, p) => {
            const band = Math.sin(p[1] * 1.4 + q + .6 * wave(q, p[0] * .15, 0, p[2] * .15)), streak = Math.max(0, Math.sin(p[0] * 2.3 + p[2] * 1.7 + q)) ** 8;
            let c = band > .35 ? light : band < -.5 ? deep : base; c = mix(c, deep, streak * .4);
            return mix(c, dust, Math.max(0, 1 - (p[1] - Math.min(gA, gB)) / 3) * .5);
        }, (v, u, p) => sub(p, centre(-.05 + u * 1.1)), true);
        for (const [x, z] of [[ax, az], [bx, bz]]) block(x, z, T * 1.6);
        // Blocks fallen from the vault lie in cones of debris at the feet.
        for (let j = 0; j < 12; j++) { const t = r() < .5 ? r() * .22 : .78 + r() * .22, [x, z] = local((t - .5) * L + (r() - .5) * 6, (r() - .5) * 10), sz = .5 + r() * 1.5; if (level && j >= 5) continue; lump(k, [x, ground(x, z) + sz * .3, z], [sz * 1.4, sz * .75, sz], q + j, .3, () => mix(base, light, (j % 3) * .3), level, r() * 6); }
    },
    camini(k, { o, r, level, local, ground, rock, soil , block}) {
        const q = o.seed % 89, tuff = mix(rock, [.84, .72, .58, 1], .6), cap = mix(rock, [.36, .28, .24, 1], .5), light = mix(tuff, [.96, .9, .8, 1], .35), dark = mix(tuff, [.78, .5, .38, 1], .35), dust = soil(0, 0), spots = [];
        for (let t = 0; t < 400 && spots.length < o.count; t++) { const a = r() * Math.PI * 2, d = Math.sqrt(r()) * o.r * .78, x = Math.cos(a) * d, z = Math.sin(a) * d; if (spots.some(s => Math.hypot(s[0] - x, s[1] - z) < 4.2)) continue; spots.push([x, z]); }
        spots.forEach(([x, z], j) => {
            const H = o.tallest * (j === 0 ? 1 : .45 + r() * .5), rb = H * (.14 + r() * .05), g = ground(x, z), w = q + j * 13;
            k.paint([1, 1, 1, 1], 0, .92);
            surf(k, level ? 7 : 14, level ? 5 : 16, (u, v) => {
                const a = u * Math.PI * 2, y = -1 + v * (H + 1), f = y / H, flare = 1 + 1.1 * (1 - smooth(0, .22, f)), knob = .18 * wave(w, Math.cos(a) * 2.4, y * .7, Math.sin(a) * 2.4) + .08 * wave(w + 4, Math.cos(a) * 5, y * 1.6, Math.sin(a) * 5);
                const rr = rb * flare * (1 - .38 * f) * (1 - .32 * smooth(.76, .95, f)) * (1 + .06 * Math.sign(Math.sin(y * 1.9 + w)) + .05 * Math.sin(y * 5.3 + w) + knob - .1 * Math.abs(Math.sin(a * 4 + y * .3 + w)) ** 4);
                const wx = rb * .3 * Math.sin(y * .45 + w), wz = rb * .3 * Math.cos(y * .37 + w * 1.3);
                return [x + wx * f + Math.cos(a) * rr, g + y, z + wz * f + Math.sin(a) * rr];
            }, (u, v, p) => { const b = Math.sin(p[1] * 1.9 + w) + .4 * wave(w, p[0], p[1] * .3, p[2]); const c = b > .5 ? light : b < -.4 ? dark : tuff; return mix(c, dust, Math.max(0, 1 - (p[1] - g) / 2.5) * .55); }, (u, v, p) => [p[0] - x - rb * .3 * Math.sin((p[1] - g) * .45 + w) * Math.max(0, (p[1] - g) / H), 0, p[2] - z - rb * .3 * Math.cos((p[1] - g) * .37 + w * 1.3) * Math.max(0, (p[1] - g) / H)], true);
            const top = rb * .62 * .7;
            lump(k, [x + rb * .3 * Math.sin(H * .45 + w), g + H + top * .2, z + rb * .3 * Math.cos(H * .37 + w * 1.3)], [top * 2.3, top * .5, top * 2], w, .3, (u2, v2, p) => tint(cap, .9 + .2 * wave(w, p[0], p[1] * 3, p[2])), level, r() * 6);
            // The explorer stops at the foot of each pinnacle.
            if (rb > .8) block(x, z, rb * .9);
        });
    },
    sorgente(k, { o, r, level, ground, soil }) {
        const R = o.size, Ro = R * 2.1, q = o.seed % 61, yw = -.35;
        const fingers = a => 1 + .28 * Math.max(0, Math.sin(a * 3 + q)) ** 3 + .12 * Math.max(0, Math.sin(a * 5 - q)) ** 4;
        const bands = [[0, [.02, .14, .38]], [.5, [.04, .28, .5]], [.8, [.2, .52, .55]], [.96, [.36, .56, .34]], [1.06, [.66, .54, .12]], [1.2, [.66, .3, .06]], [1.42, [.42, .2, .08]], [1.75, [.44, .38, .32]]];
        const colourAt = (f, x, z) => { if (f >= 2.05) return [...soil(x, z), 1]; let c = bands[0][1]; for (let j = 1; j < bands.length; j++) if (f >= bands[j - 1][0]) { const [a, ca] = bands[j - 1], [b, cb] = bands[j]; c = f >= b ? cb : mix(ca, cb, (f - a) / (b - a)); } return f > 1.85 ? mix(c, [...soil(x, z), 1], (f - 1.85) / .2) : [...c.slice(0, 3), 1]; };
        const rings = level ? [.85, 1, 1.05, 1.3, 1.6, 2.1] : [.85, .92, 1, 1.03, 1.1, 1.2, 1.32, 1.45, 1.6, 1.75, 1.9, 2.1];
        // The water: flat, glossy, with the colours of depth and of the mats near the edge.
        k.kind = 4; k.paint([1, 1, 1, 1], 0, .06);
        surf(k, level ? 20 : 56, 4, (u, v) => { const a = u * Math.PI * 2, d = v * R * .99; return [Math.cos(a) * d, yw, Math.sin(a) * d]; }, (u, v) => colourAt(v * .99, 0, 0), () => [0, 1, 0], true);
        // The mats and the sinter, on the ground from the edge of the pool out to the apron, with fingers of runoff.
        k.kind = 0; k.paint([1, 1, 1, 1], 0, .72);
        surf(k, level ? 20 : 56, rings.length - 1, (u, v) => { const a = u * Math.PI * 2, j = Math.round(v * (rings.length - 1)), f = 1 + (rings[j] - 1) * (rings[j] > 1 ? fingers(a) : 1), d = f * R, x = Math.cos(a) * d, z = Math.sin(a) * d; return [x, Math.max(ground(x, z), yw) + .05, z]; },
            (u, v, p) => { const a = u * Math.PI * 2, d = Math.hypot(p[0], p[2]) / R, f = d > 1 ? 1 + (d - 1) / fingers(a) : d; return colourAt(f, p[0], p[2]); }, () => [0, 1, 0], true);
        // Low terraces of sinter on the apron.
        for (let j = 0; j < (level ? 4 : 9); j++) { const a = r() * Math.PI * 2, d = R * (1.15 + r() * .6), x = Math.cos(a) * d, z = Math.sin(a) * d; lump(k, [x, ground(x, z) - .1, z], [1 + r() * 1.5, .22, .8 + r()], q + j, .25, () => [.8, .74, .6, 1], level, a); }
    },
    travertino(k, { o, r, level, ground }) {
        const gx = ground(6, 0) - ground(-6, 0), gz = ground(0, 6) - ground(0, -6), dl = Math.hypot(gx, gz) || 1, dir = [-gx / dl, -gz / dl], side = [-dir[1], dir[0]], q = o.seed % 53;
        const cream = [.9, .86, .77, 1], ochre = [.8, .56, .34, 1], brown = [.55, .38, .26, 1], pool = [.5, .78, .8, 1];
        // The basins first, so the chain is centred on the place.
        const sizes = Array.from({ length: o.count }, () => 2.6 + r() * 1.8), total = sizes.reduce((a, b) => a + b * 1.45, 0), basins = [];
        let along = -total / 2;
        for (let j = 0; j < o.count; j++) { const b = sizes[j], lat = Math.sin(j * 1.7 + q) * 3.2, cx = dir[0] * along + side[0] * lat, cz = dir[1] * along + side[1] * lat; basins.push({ b, cx, cz, top: ground(cx, cz) + .55, w: q + j * 7 }); along += b * 1.45; }
        // An apron of travertine over the slope, mottled with the colours of the iron and of the microbial mats.
        const len = total / 2 + 6, wide = 9;
        k.paint([1, 1, 1, 1], 0, .8);
        surf(k, level ? 10 : 30, level ? 4 : 10, (u, v) => { const a = (u - .5) * 2 * len, b = (v - .5) * 2 * wide * (1 - .35 * Math.abs(u - .5) * 2), x = dir[0] * a + side[0] * b, z = dir[1] * a + side[1] * b; return [x, ground(x, z) + .04, z]; },
            (u, v, p) => { const e = Math.max(Math.abs(u - .5), Math.abs(v - .5)) * 2, m = wave(q, p[0] * .4, 0, p[2] * .4); return mix(mix(cream, ochre, .3 + .3 * m), brown, smooth(.75, 1, e) * .6); }, () => [0, 1, 0]);
        for (const B of basins) {
            const { b, cx, cz, top, w } = B, edge = a => b * (1 + .13 * Math.sin(5 * a + w) + .07 * Math.sin(9 * a + 2 * w) + .04 * Math.sin(17 * a - w));
            // The lip: under the water inside, a scalloped crest, and outside a curtain of small vertical ribs down to
            // the ground, tinted by the iron where the water runs over it.
            const prof = [[.82, -.35], [.96, .04], [1, .14], [1.05, .06], [1.1, -.25], [1.18, -9]];
            k.kind = 0; k.paint([1, 1, 1, 1], 0, .74);
            surf(k, level ? 14 : 44, prof.length - 1, (u, v) => { const a = u * Math.PI * 2, j = Math.round(v * (prof.length - 1)), [f, h] = prof[j], rib = j >= 3 ? 1 + .035 * Math.sin(a * 38 + w) : 1, d = edge(a) * f * rib, x = cx + Math.cos(a) * d, z = cz + Math.sin(a) * d; return [x, h < -5 ? Math.min(top - .3, ground(x, z) - .3) : top + h, z]; },
                (u, v, p) => { const a = u * Math.PI * 2, run = Math.max(0, Math.sin(a * 23 + w)) ** 5; return v > .55 ? mix(mix(cream, ochre, .25 + .5 * run), brown, run * .3) : mix(cream, ochre, .08 + .1 * Math.max(0, Math.sin(a * 7 + w))); },
                (u, v, p) => [p[0] - cx, v > .3 ? 0 : 1.5, p[2] - cz], true);
            k.kind = 4; k.paint([1, 1, 1, 1], 0, .05);
            surf(k, level ? 14 : 44, 3, (u, v) => { const a = u * Math.PI * 2, d = v * edge(a) * .92; return [cx + Math.cos(a) * d, top - .06, cz + Math.sin(a) * d]; }, (u, v) => mix(mix(pool, [.66, .86, .84, 1], v * .6), cream, Math.max(0, v - .85) * 3), () => [0, 1, 0], true);
        }
    },
    cratere(k, { o, r, level, ground, rock, soil , block}) {
        const R = o.size, q = o.seed % 71, bright = mix(rock, [.92, .9, .86, 1], .35), iron = [.26, .24, .22, 1];
        // Rays of bright ejecta on the ground around the rim.
        for (let j = 0; j < 11; j++) {
            const a = j / 11 * Math.PI * 2 + r() * .4, len = R * (.5 + r() * .7), w0 = 1.6 + r() * 1.6;
            if (level && j % 2) continue;
            k.paint([1, 1, 1, 1], 0, .9);
            surf(k, level ? 6 : 14, 2, (u, v) => { const d = R * 1.02 + u * len, w = w0 * (1 - u * .85) * (v - .5), b = a + .02 * Math.sin(u * 9 + q), x = Math.cos(b) * d - Math.sin(b) * w, z = Math.sin(b) * d + Math.cos(b) * w; return [x, ground(x, z) + .05, z]; },
                (u, v, p) => mix([...soil(p[0], p[2]), 1], bright, (1 - u) * .55 * (1 - Math.abs(v - .5) * 1.6)), () => [0, 1, 0]);
        }
        // Blocks thrown on the rim, and fragments of the iron body.
        const n = level ? 10 : 26;
        for (let j = 0; j < 26; j++) {
            const a = r() * Math.PI * 2, d = R * (.92 + r() * .75), x = Math.cos(a) * d, z = Math.sin(a) * d, sz = .3 + r() ** 2 * 1.5, metal = j % 5 === 0, shade = tint(bright, .85 + r() * .25);
            if (j >= n && sz < 1) continue;
            k.paint([1, 1, 1, 1], metal ? .85 : 0, metal ? .38 : .88);
            lump(k, [x, ground(x, z) + sz * .3, z], [sz * 1.2, sz * .75, sz], q + j, metal ? .35 : .22, () => metal ? iron : shade, level, a);
            if (sz > 1.2) block(x, z, sz);
        }
    },
    cristalli(k, { o, r, level, ground, rock , block}) {
        const q = o.seed % 43, clusters = 2 + Math.floor(r() * 3), body = [.9, .89, .84, 1], tip = [.97, .97, .95, 1];
        for (let cI = 0; cI < clusters; cI++) {
            const ca = r() * Math.PI * 2, cd = cI ? 5 + r() * o.r * .45 : 0, cx = Math.cos(ca) * cd, cz = Math.sin(ca) * cd, g = ground(cx, cz), n = 5 + Math.floor(r() * 7);
            for (let j = 0; j < n; j++) {
                const L = o.longest * (cI === 0 && j === 0 ? 1 : .3 + r() * .6), th = Math.max(.25, L * (.07 + r() * .04)), az = r() * Math.PI * 2, tilt = .15 + r() * .75;
                const d = [Math.sin(tilt) * Math.cos(az), Math.cos(tilt), Math.sin(tilt) * Math.sin(az)], e1 = unit(cross(d, [0, 0, 1])), e2 = cross(d, e1);
                const b0 = [cx + d[0] * -1 + (r() - .5) * 1.2, g + d[1] * -1, cz + d[2] * -1 + (r() - .5) * 1.2], ring = (t, rr) => Array.from({ length: 6 }, (_, s) => { const a = s / 6 * Math.PI * 2 + j; return [b0[0] + d[0] * t + (e1[0] * Math.cos(a) + e2[0] * Math.sin(a)) * rr, b0[1] + d[1] * t + (e1[1] * Math.cos(a) + e2[1] * Math.sin(a)) * rr, b0[2] + d[2] * t + (e1[2] * Math.cos(a) + e2[2] * Math.sin(a)) * rr]; });
                const lo = ring(0, th), hi = ring(L * .84, th), apex = [b0[0] + d[0] * L, b0[1] + d[1] * L, b0[2] + d[2] * L], shade = .92 + .08 * Math.sin(j + q);
                k.kind = 4; k.paint([1, 1, 1, 1], .05, .12, level ? 0 : .05);
                for (let s = 0; s < 6; s++) { const t = (s + 1) % 6; k.quad(lo[s], lo[t], hi[t], hi[s], tint(body, shade - .06 * (s % 2))); k.tri(hi[s], hi[t], apex, tip); }
            }
            k.kind = 0; k.paint([1, 1, 1, 1], 0, .9);
            lump(k, [cx, g - .2, cz], [3 + r(), .9, 2.6 + r()], q + cI, .3, () => tint(rock, .7), level, ca);
            block(cx, cz, 2.6);
        }
    },
    penitenti(k, { s, o, r, level, ground , block}) {
        const A = axesOf(s), E = A.east, N = A.north, tilt = Math.min(.7, Math.abs(A.lat)), lean = [A.noon[0] * Math.tan(tilt), A.noon[1] * Math.tan(tilt)], q = o.seed % 37, R = o.r * .62;
        const snow = [.94, .96, 1, 1], blue = [.66, .8, .96, 1];
        k.paint([1, 1, 1, 1], 0, .38, .02);
        for (let row = -R; row <= R; row += 2.6) for (let col = -R; col <= R; col += 2) {
            const x = E[0] * col + N[0] * row + (r() - .5) * .9, z = E[1] * col + N[1] * row + (r() - .5) * .9, d = Math.hypot(x, z); if (d > R) continue;
            const H = o.tallest * (.45 + .55 * r()) * (1 - .55 * smooth(R * .6, R, d)), g = ground(x, z), sec = [.55, .5, .4, .26, .1, .02];
            surf(k, level ? 4 : 6, level ? 2 : 5, (u, v) => {
                const a = u * Math.PI * 2, j = Math.round(v * 5), y = -.4 + v * (H + .4), w = sec[j] * (1 + .25 * Math.sin(a * 2 + q + col)), along = Math.cos(a) * w * 1.6, across = Math.sin(a) * w * .45;
                return [x + E[0] * along + N[0] * across + lean[0] * Math.max(0, y), g + y, z + E[1] * along + N[1] * across + lean[1] * Math.max(0, y)];
            }, (u, v) => mix(blue, snow, Math.min(1, v * 1.4)), (u, v, p) => [p[0] - x, 0, p[2] - z], true);
        }
        block(0, 0, R * .85);
    },
    ragni(k, { o, r, level, ground, soil }) {
        const q = o.seed % 29, dark = [.05, .045, .04, 1];
        const strip = (pts, w0, w1) => {
            k.paint([1, 1, 1, 1], 0, .95);
            surf(k, pts.length - 1, 1, (u, v) => { const j = Math.round(u * (pts.length - 1)), a = pts[Math.max(0, j - 1)], b = pts[Math.min(pts.length - 1, j + 1)], t = unit([b[0] - a[0], 0, b[1] - a[1]]), w = (w0 + (w1 - w0) * u) * (v - .5), x = pts[j][0] - t[2] * w, z = pts[j][1] + t[0] * w; return [x, ground(x, z) + .12, z]; },
                (u, v, p) => mix([...soil(p[0], p[2]), 1], dark, .92 - u * .2), () => [0, 1, 0]);
        };
        for (let n = 0; n < o.count; n++) {
            const ca = r() * Math.PI * 2, cd = n ? r() * o.r * .65 : 0, cx = Math.cos(ca) * cd, cz = Math.sin(ca) * cd, size = (n ? .45 + r() * .45 : 1) * o.widest / 2, arms = 11 + Math.floor(r() * 8);
            for (let a = 0; a < arms; a++) {
                // The same random path at both levels: the far model keeps every other point and leaves out the branches.
                let ang = a / arms * Math.PI * 2 + r() * .3, x = cx, z = cz; const len = size * (.6 + r() * .4), pts = [[x, z]], steps = 8;
                for (let t = 1; t <= steps; t++) { ang += (r() - .5) * .35; x += Math.cos(ang) * len / steps; z += Math.sin(ang) * len / steps; pts.push([x, z]); }
                strip(level ? pts.filter((_, t) => t % 2 === 0) : pts, 1.3, .2);
                for (const side of [-1, 1]) { const grow = r() < .55, from = pts[Math.floor(steps * (.45 + r() * .25))], sub2 = [[...from]]; let b = ang + side * (.5 + r() * .4), sx = from[0], sz = from[1]; for (let t = 1; t <= 4; t++) { b += (r() - .5) * .3; sx += Math.cos(b) * len * .1; sz += Math.sin(b) * len * .1; sub2.push([sx, sz]); } if (grow && !level) strip(sub2, .5, .1); }
            }
            // A fan of dark dust blown from the centre.
            const fa = r() * Math.PI * 2, fl = size * (.5 + r() * .5);
            k.paint([1, 1, 1, 1], 0, .95);
            surf(k, level ? 4 : 8, level ? 2 : 4, (u, v) => { const d = u * fl, w = Math.sin(u * Math.PI) * fl * .28 * (v - .5) * 2, x = cx + Math.cos(fa) * d - Math.sin(fa) * w, z = cz + Math.sin(fa) * d + Math.cos(fa) * w; return [x, ground(x, z) + .09, z]; },
                (u, v, p) => mix([...soil(p[0], p[2]), 1], dark, .45 * (1 - u) * (1 - Math.abs(v - .5) * 1.8)), () => [0, 1, 0]);
            lump(k, [cx, ground(cx, cz) - .05, cz], [.9, .12, .9], q + n, .2, () => dark, level);
        }
    },
    stromatoliti(k, { s, o, r, level, ground }) {
        const q = o.seed % 23, light = [.74, .7, .6, 1], dark = [.5, .45, .37, 1], mat = [.27, .31, .16, 1], spots = [];
        for (let t = 0; t < 600 && spots.length < o.count; t++) { const a = r() * Math.PI * 2, d = Math.sqrt(r()) * o.r * .8, x = Math.cos(a) * d, z = Math.sin(a) * d; if (spots.some(p => Math.hypot(p[0] - x, p[1] - z) < 2.4)) continue; spots.push([x, z]); }
        spots.forEach(([x, z], j) => {
            const rb = .5 + r() * .9, H = o.tallest * (j === 0 ? 1 : .4 + r() * .6), column = r() < .4, g = ground(x, z), w = q + j;
            k.paint([1, 1, 1, 1], 0, .8);
            surf(k, level ? 7 : 14, level ? 3 : 8, (u, v) => {
                const a = u * Math.PI * 2, y = -.4 + v * (H + .4), f = Math.max(0, y / H), rr = rb * (column ? (f < .8 ? 1 - .1 * f : Math.sqrt(Math.max(0, 1 - ((f - .8) / .2) ** 2))) * 1 : Math.sqrt(Math.max(0, 1 - f * f))) * (1 + .06 * Math.sin(a * 5 + w));
                return [x + Math.cos(a) * rr, g + y, z + Math.sin(a) * rr];
            }, (u, v, p) => { const f = (p[1] - g) / H; return f > .86 ? mat : mix(light, dark, .5 + .5 * Math.sin(p[1] * 18 + w)); }, (u, v, p) => [p[0] - x, p[1] - g, p[2] - z], true);
        });
    },
    poligoni(k, { o, r, level }) {
        const c = o.cell, R = o.size * (level ? .55 : 1), q = o.seed % 19, rows = Math.ceil(R / (c * .866)) + 1, cols = Math.ceil(R / c) + 1, jit = (i, j) => [((Math.sin(i * 12.9 + j * 78.2 + q) * 43758.5) % 1) * c * .22, ((Math.sin(i * 39.3 + j * 11.1 + q) * 24634.6) % 1) * c * .22];
        const odd = j => ((j % 2) + 2) % 2, node = (i, j) => { const [a, b] = jit(i, j); return [(i + odd(j) * .5) * c + a, j * c * .866 + b]; };
        const salt = [.95, .94, .91, 1], shade = [.83, .82, .78, 1];
        k.paint([1, 1, 1, 1], 0, .82);
        const ridge = (A, B) => {
            const t = unit([B[0] - A[0], 0, B[1] - A[1]]), w = c * .11, h = .12 + .1 * Math.abs(Math.sin(A[0] * 3.1 + B[1] * 2.3)), nx = -t[2] * w, nz = t[0] * w;
            const top = [[A[0], h, A[1]], [B[0], h, B[1]]];
            k.quad([A[0] + nx, 0, A[1] + nz], [B[0] + nx, 0, B[1] + nz], top[1], top[0], shade);
            k.quad(top[0], top[1], [B[0] - nx, 0, B[1] - nz], [A[0] - nx, 0, A[1] - nz], salt);
        };
        for (let j = -rows; j <= rows; j++) for (let i = -cols; i <= cols; i++) {
            const P = node(i, j); if (Math.hypot(P[0], P[1]) > R) continue;
            for (const [di, dj] of [[1, 0], [odd(j) ? 1 : 0, 1], [odd(j) ? 0 : -1, 1]]) { const Q = node(i + di, j + dj); if (Math.hypot(Q[0], Q[1]) <= R && ((i + j * 7 + q) % 11 !== 0)) ridge(P, Q); }
        }
    },
    inselberg(k, { s, o, r, level, local, ground, rock, soil, block }) {
        const a = o.long, b = o.wide, H = o.height, q = o.seed % 41, outline = th => 1 + .1 * Math.sin(2 * th + q) + .07 * Math.sin(3 * th + q * 1.7) + .04 * Math.sin(5 * th - q);
        const low = Math.min(...Array.from({ length: 32 }, (_, j) => { const th = j * Math.PI / 16, [x, z] = local(Math.cos(th) * a * outline(th), Math.sin(th) * b * outline(th)); return ground(x, z); })) - 1.5;
        const granite = mix(rock, [.6, .52, .47, 1], .55), varnish = mix(rock, [.16, .12, .1, 1], .7), pale = mix(granite, [.82, .78, .72, 1], .3), lichen = s.species.length ? [.55, .52, .3, 1] : pale, dust = soil(0, 0);
        // Steep sides and a rounded top (a bornhardt), cut by vertical flutes where rain runs and by the steps of the
        // curved sheets that come away from the surface.
        const shape = (th, rho) => {
            const steep = smooth(.35, .95, rho), flute = Math.max(0, Math.sin(th * 31 + 2.2 * wave(q, Math.cos(th) * 3, rho * 2, Math.sin(th) * 3))) ** 3, sheet = Math.floor(rho * 7 + .4 * wave(q + 2, Math.cos(th) * 2, 0, Math.sin(th) * 2)) / 7;
            const f = outline(th) * (1 + .03 * wave(q, Math.cos(th) * 5, rho * 7, Math.sin(th) * 5) - .11 * flute * steep + .05 * (sheet - rho) * 7 * steep);
            return { f, flute, steep };
        };
        k.paint([1, 1, 1, 1], 0, .86);
        surf(k, level ? 32 : 112, level ? 12 : 40, (u, v) => {
            const th = u * Math.PI * 2, rho = v * 1.08, { f } = shape(th, Math.min(rho, 1)), [x, z] = local(Math.cos(th) * a * Math.min(rho, 1) * f, Math.sin(th) * b * Math.min(rho, 1) * f);
            const y = rho <= 1 ? low + (H - low) * Math.pow(Math.max(0, 1 - rho ** 5.5), .3) * (1 + .05 * wave(q + 7, Math.cos(th) * 4, rho * 4, Math.sin(th) * 4)) : ground(x, z) - 2.5;
            return [x, y, z];
        }, (u, v, p) => {
            const th = u * Math.PI * 2, { flute, steep } = shape(th, Math.min(1, v * 1.08)), spot = wave(q + 11, p[0] * .25, p[1] * .25, p[2] * .25);
            let c = mix(pale, granite, smooth(.05, .45, v)); c = mix(c, varnish, Math.min(1, flute * 1.2 * steep + Math.max(0, spot) * .35 * steep));
            if (v < .5 && spot > .45) c = mix(c, lichen, .45);
            return mix(c, dust, smooth(.88, 1.02, v) * .6);
        }, (u, v, p) => [p[0], (p[1] - low) * .5, p[2]], true);
        // Slabs and boulders fallen at the foot.
        for (let j = 0; j < 14; j++) { const th = r() * Math.PI * 2, e = 1.02 + r() * .15, [x, z] = local(Math.cos(th) * a * e * outline(th), Math.sin(th) * b * e * outline(th)), sz = 1 + r() * 2.4; if (level && j >= 6) continue; lump(k, [x, ground(x, z) + sz * .25, z], [sz * 1.5, sz * .7, sz], q + j, .3, () => tint(granite, .88), level, th); }
        for (const t of [-.62, 0, .62]) { const [x, z] = local(t * a, 0); block(x, z, b * (t ? .72 : .95)); }
    },
    masso(k, { s, o, r, level, ground, rock, block }) {
        const [a, b, c] = o.boulder, hs = o.stand, g = ground(0, 0), q = o.seed % 31, glacial = s.genome.family === 'arctic' || ['morene', 'ghiacciaio', 'nevaio', 'tundra'].includes(o.biome), stranger = mix(rock, glacial ? [.62, .6, .62, 1] : [.62, .42, .32, 1], .55);
        k.paint([1, 1, 1, 1], 0, .88);
        if (glacial) {
            // A knob of bedrock, smoothed by the ice, with the erratic resting on its top.
            lump(k, [0, g + hs * .2, 0], [2.6, hs * .8, 2.2], q + 40, .22, (u, v, p) => tint(rock, .78 + .08 * Math.sin(p[1] * 4 + p[0])), level, o.h * .5);
        } else {
            // A pedestal cut lower down by the sand carried by the wind, in layers of different hardness.
            surf(k, level ? 9 : 18, level ? 5 : 14, (u, v) => { const t = u * Math.PI * 2, y = -.6 + v * (hs + .6), f = Math.max(0, y / hs), rr = (1.5 - .75 * Math.sin(Math.min(1, f) * Math.PI * .75) + .12 * Math.sin(y * 6 + q)) * (1 + .16 * wave(q, Math.cos(t) * 2.5, y * 1.4, Math.sin(t) * 2.5) - .08 * Math.abs(Math.sin(t * 3 + q)) ** 3); return [Math.cos(t) * rr * 1.15, g + y, Math.sin(t) * rr]; },
                (u, v, p) => mix(tint(rock, .8), stranger, .25 + .2 * Math.sin(p[1] * 5 + q)), (u, v, p) => [p[0], 0, p[2]], true);
        }
        lump(k, [.12, g + hs * (glacial ? .95 : 1) + b * .84, -.08], [a, b, c], q, .3, (u, v, p) => tint(stranger, .86 + .16 * wave(q + 9, p[0] * .6, p[1] * .6, p[2] * .6)), level, o.h);
        block(0, 0, Math.max(a, c) * .85);
        if (glacial) for (let j = 0; j < 6; j++) { const t = r() * Math.PI * 2, d = 7 + r() * 7, x = Math.cos(t) * d, z = Math.sin(t) * d, sz = .6 + r() * 1.2; if (level && j >= 3) continue; lump(k, [x, ground(x, z) + sz * .4, z], [sz * 1.2, sz * .8, sz], q + j + 1, .3, () => tint(stranger, .85), level, t); }
    },
    fossili(k, { o, r, level, ground , block}) {
        const q = o.seed % 17, palettes = [[.62, .25, .18], [.75, .58, .3], [.42, .28, .36], [.45, .33, .24], [.17, .14, .13]];
        const logs = [];
        for (let t = 0; t < 300 && logs.length < o.count; t++) { const a = r() * Math.PI, d = Math.sqrt(r()) * o.r * .7, cx = Math.cos(r() * 6.283) * d, cz = Math.sin(r() * 6.283) * d, L = o.longest * (logs.length ? .45 + r() * .5 : 1); if (logs.some(l => Math.hypot(l.cx - cx, l.cz - cz) < (l.L + L) * .35)) continue; logs.push({ a, cx, cz, L, rad: .45 + r() * .45 }); }
        logs.forEach((l, j) => {
            const dir = [Math.cos(l.a), Math.sin(l.a)], side = [-dir[1], dir[0]], pa = palettes[(j + q) % 5], pb = palettes[(j * 3 + q + 1) % 5], parts = 3 + Math.floor(r() * 4), gap = .18;
            for (let s2 = 0; s2 < parts; s2++) {
                const t0 = -l.L / 2 + s2 * l.L / parts + gap / 2, t1 = -l.L / 2 + (s2 + 1) * l.L / parts - gap / 2, off = (r() - .5) * .12, rad = l.rad * (1 - .25 * (s2 / parts));
                const at = t => [l.cx + dir[0] * t + side[0] * off, l.cz + dir[1] * t + side[1] * off], gy = t => { const [x, z] = at(t); return ground(x, z) + rad * .38; };
                k.paint([1, 1, 1, 1], .05, .4);
                surf(k, level ? 7 : 14, level ? 2 : 3, (u, v) => { const th = u * Math.PI * 2, t = t0 + v * (t1 - t0), [x, z] = at(t), rr = rad * (1 + .05 * Math.sin(th * 9 + t * 2 + q)); return [x + side[0] * Math.cos(th) * rr, gy(t) + Math.sin(th) * rr, z + side[1] * Math.cos(th) * rr]; },
                    (u, v, p) => { const c = mix([...pa, 1], [...pb, 1], .5 + .5 * Math.sin(u * 12 + p[0] * .7 + p[2] * .5 + q)); return tint(c, .85 + .15 * Math.sin(u * 40)); }, (u, v, p) => { const t = t0 + v * (t1 - t0), [x, z] = at(t); return [p[0] - x, p[1] - gy(t), p[2] - z]; }, true);
                // The broken ends show the rings of growth, now in coloured quartz.
                for (const t of [t0, t1]) {
                    const [x, z] = at(t), y = gy(t), n = [dir[0] * (t === t0 ? -1 : 1), 0, dir[1] * (t === t0 ? -1 : 1)];
                    surf(k, level ? 7 : 14, level ? 2 : 3, (u, v) => { const th = u * Math.PI * 2, rr = rad * v; return [x + side[0] * Math.cos(th) * rr, y + Math.sin(th) * rr, z + side[1] * Math.cos(th) * rr]; }, (u, v) => mix([...pa, 1], [...pb, 1], .5 + .5 * Math.sin(v * 22)), () => n, true);
                }
                if (s2 % 2 === 0) { const [x, z] = at((t0 + t1) / 2); block(x, z, rad * 1.2); }
            }
        });
        // Stumps still upright.
        for (let j = 0; j < 2; j++) { const a = r() * Math.PI * 2, d = o.r * (.3 + r() * .4), x = Math.cos(a) * d, z = Math.sin(a) * d, H = .6 + r() * .8, rr = .6 + r() * .4, g = ground(x, z), pa = palettes[(j + 2) % 5];
            surf(k, level ? 7 : 14, 2, (u, v) => { const th = u * Math.PI * 2, y = -.3 + v * (H + .3) - (v === 1 ? .15 * Math.sin(th * 2) : 0); return [x + Math.cos(th) * rr, g + y, z + Math.sin(th) * rr]; }, () => [...pa, 1], (u, v, p) => [p[0] - x, 0, p[2] - z], true);
            block(x, z, rr); }
    },
    lava(k, { o, r, level, ground, rock , block}) {
        const R = o.size, q = o.seed % 13, floor = -o.depth + .6, rl = R - 2.4, hot = [.82, .17, .02, 1], crust = [.08, .07, .07, 1], c = 2.3;
        k.kind = 4; k.paint([1, 1, 1, 1], 0, .5, .55);
        surf(k, level ? 20 : 48, 3, (u, v) => { const a = u * Math.PI * 2, d = v * rl; return [Math.cos(a) * d, floor, Math.sin(a) * d]; }, (u, v) => mix(hot, [1, .55, .12, 1], .25 + .25 * Math.sin(u * 31 + q) + .2 * Math.sin(v * 9 + u * 13)), () => [0, 1, 0], true);
        // Plates of crust, with glowing cracks between them.
        k.kind = 0; k.paint([1, 1, 1, 1], 0, .92);
        const rows = Math.ceil(rl / (c * .866)) + 1;
        for (let j = -rows; j <= rows; j++) for (let i = -rows; i <= rows; i++) {
            // Irregular plates: the corners of the hexagons move by an amount that depends on where they are, so
            // neighbouring plates keep matching edges, and each plate shrinks a little towards its middle,
            // leaving narrow glowing cracks.
            const odd = ((j % 2) + 2) % 2, cx = (i + odd * .5) * c, cz = j * c * .866; if (Math.hypot(cx, cz) > rl - 1 || ((i * 31 + j * 17 + q) % 9 + 9) % 9 < 1 || (level && ((i + j) % 2 + 2) % 2)) continue;
            const R3 = c / Math.sqrt(3), jit = (x, z) => { const h1 = Math.sin(x * 12.99 + z * 78.23 + q) * 43758.5, h2 = Math.sin(x * 39.35 + z * 11.13 - q) * 24634.6; return [(h1 - Math.floor(h1) - .5) * c * .32, (h2 - Math.floor(h2) - .5) * c * .32]; };
            const poly = Array.from({ length: 6 }, (_, s2) => { const a = s2 / 6 * Math.PI * 2 + Math.PI / 6, vx = Math.round((cx + Math.cos(a) * R3) * 100) / 100, vz = Math.round((cz + Math.sin(a) * R3) * 100) / 100, [jx, jz] = jit(vx, vz); return [cx + (vx + jx - cx) * .88, cz + (vz + jz - cz) * .88]; });
            const top = floor + .14 + .06 * Math.sin(i * 1.3 + j), low = floor - .05;
            for (let s2 = 1; s2 < 5; s2++) k.tri([poly[0][0], top, poly[0][1]], [poly[s2 + 1][0], top, poly[s2 + 1][1]], [poly[s2][0], top, poly[s2][1]], tint(crust, 1 + .25 * Math.sin(i + j)));
            for (let s2 = 0; s2 < 6; s2++) { const t = (s2 + 1) % 6; k.quad([poly[t][0], low, poly[t][1]], [poly[s2][0], low, poly[s2][1]], [poly[s2][0], top, poly[s2][1]], [poly[t][0], top, poly[t][1]], [.3, .1, .05, 1]); }
        }
        // Spatter and blocks of cooled lava on the rim.
        for (let j = 0; j < (level ? 8 : 20); j++) { const a = r() * Math.PI * 2, d = R + 1.5 + r() * 4, x = Math.cos(a) * d, z = Math.sin(a) * d, sz = .4 + r() * 1.1; k.paint([1, 1, 1, 1], 0, .9); lump(k, [x, ground(x, z) + sz * .3, z], [sz * 1.3, sz * .7, sz], q + j, .35, () => tint(rock, .45), level, a); }
        block(0, 0, R - 1.2);
    },
    seracchi(k, { o, r, level, ground, block }) {
        const q = o.seed % 11, ice = [.46, .7, .93, 1], deep = [.22, .44, .74, 1], snow = [.94, .96, 1, 1], spots = [];
        for (let t = 0; t < 300 && spots.length < o.count; t++) { const a = r() * Math.PI * 2, d = Math.sqrt(r()) * o.r * .7, x = Math.cos(a) * d, z = Math.sin(a) * d; if (spots.some(p => Math.hypot(p[0] - x, p[1] - z) < 5.5)) continue; spots.push([x, z]); }
        k.paint([1, 1, 1, 1], .1, .16, .1);
        spots.forEach(([x, z], j) => {
            // A tower of two or three tiers: irregular prisms with faceted sides, each a little smaller and shifted
            // over the one below, and a jagged top under a cap of snow.
            const H = o.tallest * (j === 0 ? 1 : .3 + r() * .6), w = 2.8 + r() * 2.6, n = 6 + Math.floor(r() * 3), g = ground(x, z), turn = r() * 6, tiers = H > 4 ? 3 : 2, bands = level ? 1 : 3;
            const radii = Array.from({ length: n }, () => .55 + .45 * r()), lean = [(r() - .5) * .7, (r() - .5) * .7], shifts = Array.from({ length: tiers }, (_, t) => [lean[0] * t * H / tiers + (r() - .5) * 1.2, lean[1] * t * H / tiers + (r() - .5) * 1.2]), jag = Array.from({ length: n }, () => r());
            let y0 = -1;
            for (let t = 0; t < tiers; t++) {
                const y1 = t === tiers - 1 ? H : y0 + (H + 1) / tiers * (.9 + r() * .2), k0 = 1 - t * .18, k1 = 1 - (t + 1) * .18 + .05, sx = shifts[t][0], sz = shifts[t][1];
                const P = (s2, f) => { const a = s2 / n * Math.PI * 2 + turn, rr = w * radii[s2] * (k0 + (k1 - k0) * f) * (1 + (level ? 0 : .06 * Math.sin(s2 * 3.1 + f * 7 + j))), y = y0 + (y1 - y0) * f; return [x + sx + Math.cos(a) * rr, g + y, z + sz + Math.sin(a) * rr]; };
                // Faces in the shade and fresh fractures are deep blue, the others whitened by frost and snow.
                for (let s2 = 0; s2 < n; s2++) { const u = (s2 + 1) % n, fresh = jag[s2] < .45; for (let b = 0; b < bands; b++) { const f0 = b / bands, f1 = (b + 1) / bands; k.quad(P(u, f0), P(s2, f0), P(s2, f1), P(u, f1), fresh ? mix(deep, ice, .3 + .4 * f1) : mix(ice, [.86, .92, .98, 1], .45 + .3 * f1)); } }
                if (t === tiers - 1) {
                    // The top: a ridge of two points over the last tier, covered by snow.
                    const c0 = [x + sx + Math.cos(turn) * w * .2, g + H * (1.04 + jag[0] * .06), z + sz + Math.sin(turn) * w * .2], c1 = [x + sx - Math.cos(turn) * w * .25, g + H * (.98 + jag[1] * .05), z + sz - Math.sin(turn) * w * .25];
                    for (let s2 = 0; s2 < n; s2++) { const u = (s2 + 1) % n, a = P(s2, 1), b = P(u, 1), top = (s2 < n / 2) ? c0 : c1; k.tri(b, a, top, snow); }
                    k.tri(P(0, 1), P(Math.floor(n / 2), 1), c0, snow); k.tri(P(Math.floor(n / 2), 1), P(0, 1), c1, snow);
                } else {
                    // A ledge of snow on the step between two tiers.
                    for (let s2 = 0; s2 < n; s2++) { const u = (s2 + 1) % n, a = P(s2, 1), b = P(u, 1), mid = [x + sx, g + y1 + .05, z + sz]; k.tri(b, a, mid, snow); }
                }
                y0 = y1 - .2;
            }
            block(x, z, w * .85);
        });
        // Blocks of ice fallen from the towers.
        for (let j = 0; j < 12; j++) { const a = r() * Math.PI * 2, d = Math.sqrt(r()) * o.r * .85, x = Math.cos(a) * d, z = Math.sin(a) * d, sz = .5 + r() * 1.3; if (level && j >= 5) continue; k.paint([1, 1, 1, 1], .1, .2, .06); lump(k, [x, ground(x, z) + sz * .3, z], [sz * 1.2, sz * .8, sz], q + j, .35, () => mix(ice, [.86, .92, .98, 1], .4), level, a); }
    },
    barcane(k, { s, o, level, ground, soil }) {
        // A skin over the dunes made by the relief (reliefOf): lighter on the windward slopes, with ripples across the
        // wind, darker on the slip faces, so the crescents stand out from the ground around them.
        const snow = o.biome === 'nevaio', step = level ? 2.4 : 1.2;
        for (const d of dunesOf(o)) {
            const W = 6 * d.H, back = 5 * d.H + 4, front = .9 * W + d.H * 2, nu = Math.ceil((back + front) / step), nv = Math.ceil(2 * W / step), pts = [];
            for (let j = 0; j <= nv; j++) for (let i = 0; i <= nu; i++) {
                const u = -back + i * (back + front) / nu, v = -W + j * 2 * W / nv, x = d.x - o.x + d.w[0] * u + d.c[0] * v, z = d.z - o.z + d.w[1] * u + d.c[1] * v, h = duneAt(d, o.x + x, o.z + z);
                pts.push({ x, z, h, u, v });
            }
            const at = (i, j) => pts[j * (nu + 1) + i], ids = new Map(), base = soil(d.x - o.x, d.z - o.z);
            const vertex = (i, j) => {
                const key = j * (nu + 1) + i; if (ids.has(key)) return ids.get(key);
                const p = at(i, j), gx = ground(p.x + .5, p.z) - ground(p.x - .5, p.z), gz = ground(p.x, p.z + .5) - ground(p.x, p.z - .5), n = unit([-gx, 1, -gz]);
                const lee = (gx * d.w[0] + gz * d.w[1]) < -.25, fade = Math.min(1, p.h / 1.2), ripple = lee ? 0 : .05 * Math.sin(p.u * 4.2 + Math.sin(p.v * .3) * 2), shade = 1 + ((lee ? .8 : 1.06 + ripple) - 1) * fade;
                k.paint([1, 1, 1, 1], 0, snow ? .55 : .9);
                const id = k.vertex([p.x, ground(p.x, p.z) + .06, p.z], n, 0, 0, [Math.min(1, base[0] * shade), Math.min(1, base[1] * shade), Math.min(1, base[2] * (snow && lee ? Math.max(shade, .9) : shade)), 1]); ids.set(key, id); return id;
            };
            for (let j = 0; j < nv; j++) for (let i = 0; i < nu; i++) {
                if (Math.max(at(i, j).h, at(i + 1, j).h, at(i, j + 1).h, at(i + 1, j + 1).h) < .05) continue;
                const a = vertex(i, j), b = vertex(i + 1, j), c = vertex(i, j + 1), e = vertex(i + 1, j + 1); k.i.push(a, b, e, a, e, c);
            }
        }
    }
};
