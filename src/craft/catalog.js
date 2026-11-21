/** Catalogue of the 300 stations and ships: ten models in each of the thirty star systems. Every system has
 * a port in the style of its discipline, a passage gate in the civil style and four stations chosen for its
 * themes, then four ships: two in the style of the discipline and two of the civil traffic. Models are
 * built on demand from their seed; `build(entry)` returns the meshes, the lights and the recipe. */
import { AREAS, seededRandom } from '../scene/layout.js';
import { dice } from './kit.js';
import { style, DISCIPLINE_STYLES } from './styles.js';
import { STATIONS } from './stations.js';
import { GRAMMAR_STATIONS, TYPE_BY_KEY, ROLES } from './grammar.js';
import { FAMILY_KEYS } from './families.js';
import { SHIPS } from './ships.js';
import { GRAMMAR_SHIPS, SHIP_TYPE_BY_KEY, SHIP_ROLES, HULL_KEYS, shipTrade } from './shipclasses.js';
import { FLEET } from './economy.js';

const CODE = { Y: 'poliedrica', Dp: 'deposito', C: 'cantiere', D: 'radiotelescopio', M: 'miniera', E: 'centrale', T: 'telescopio', L: 'laboratorio', S: 'serra', R: 'raffineria' };
/** Four thematic stations per system, in system order. Mines only in the systems with an asteroid belt. */
const THEMES = ['Y Dp C D', 'Y M C E', 'Y T L Dp', 'Y C D S', 'Y M Dp T', 'Y E S L', 'C T D E', 'M C E Dp', 'T D L Y', 'D L T S', 'E M R Dp', 'L E D C', 'R L Dp Y', 'R M C Dp', 'Dp R E S', 'R C E L', 'R M Dp T', 'R S Dp E', 'S L D C', 'M D R T', 'S R E Dp', 'S C L Y', 'S M T C', 'S E Dp R', 'S T D E', 'M D S C', 'D T L Y', 'T D E Y', 'L M E D', 'T D L C'].map(row => row.split(' ').map(c => CODE[c]));
export const SHIP_ORDER = ['navetta', 'corriere', 'cargo', 'cisterna', 'rimorchiatore', 'scientifica', 'esploratrice', 'passeggeri', 'posaboe', 'soccorso', 'sonda', 'gru'];
export const DISCIPLINE_COLORS = ['#f2b766', '#7fb2ff', '#b49cff', '#6fd3a0'];
const FIELD = DISCIPLINE_COLORS.map(h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16) / 255).concat(1));

/** Names: scientists of each discipline, winds and stars for the civil traffic. Only letters in the
 * site's glyph atlas are used. */
const NAMES = {
    matematica: ['Euclide', 'Archimede', 'Ipazia', 'Fibonacci', 'Cardano', 'Tartaglia', 'Cavalieri', 'Fermat', 'Pascal', 'Cartesio', 'Leibniz', 'Eulero', 'Lagrange', 'Laplace', 'Gauss', 'Cauchy', 'Galois', 'Abel', 'Riemann', 'Dedekind', 'Cantor', 'Hilbert', 'Noether', 'Poincaré', 'Peano', 'Volterra', 'Ramanujan', 'Kovalevskaja', 'Agnesi', 'Germain', 'Lovelace', 'Turing', 'Gödel', 'Banach', 'Kolmogorov', 'Hardy', 'Mirzakhani', 'Grothendieck', 'Weierstrass', 'Jacobi', 'Fourier', 'Bernoulli', 'Viète', 'Napier', 'Brahmagupta', 'Pitagora', 'Talete', 'Diofanto', 'Apollonio', 'Klein', 'Möbius', 'Cayley', 'Boole', 'Conway'],
    fisica: ['Galilei', 'Newton', 'Huygens', 'Hooke', 'Keplero', 'Faraday', 'Maxwell', 'Ampère', 'Volta', 'Ohm', 'Joule', 'Kelvin', 'Carnot', 'Clausius', 'Boltzmann', 'Gibbs', 'Hertz', 'Lorentz', 'Planck', 'Einstein', 'Bohr', 'Heisenberg', 'Schrödinger', 'Dirac', 'Pauli', 'Fermi', 'Majorana', 'Born', 'Rutherford', 'Meitner', 'Chandrasekhar', 'Hubble', 'Lemaître', 'Friedmann', 'Gamow', 'Penzias', 'Feynman', 'Yukawa', 'Wu', 'Rubin', 'Burnell', 'Leavitt', 'Hawking', 'Bose', 'Raman', 'Compton', 'Millikan', 'Michelson', 'Doppler', 'Fresnel', 'Fraunhofer', 'Kirchhoff', 'Coulomb', 'Ørsted', 'Tesla', 'Lenz', 'Laue', 'Bragg', 'Mach', 'Rayleigh', 'Stokes', 'Torricelli', 'Fizeau', 'Foucault', 'Herschel', 'Schiaparelli', 'Alfvén', 'Zwicky', 'Oort', 'Eddington', 'Hoyle'],
    chimica: ['Lavoisier', 'Dalton', 'Avogadro', 'Mendeleev', 'Berzelius', 'Cannizzaro', 'Arrhenius', 'Le Chatelier', 'Pauling', 'Lewis', 'Haber', 'Bosch', 'Nobel', 'Curie', 'Hodgkin', 'Kekulé', 'Wöhler', 'Liebig', 'Bunsen', 'Davy', 'Priestley', 'Scheele', 'Boyle', 'Gay-Lussac', 'Proust', 'Natta', 'Ziegler', 'Levi', 'Sabatier', 'Grignard', 'Werner', 'Nernst', 'Ostwald', 'Moseley', 'Hess', 'Raoult', 'Langmuir', 'Seaborg', 'Sanger', 'Woodward', 'Crutzen', 'Molina', 'Rowland', 'Lehn', 'Dewar', 'Cavendish', 'Ramsay', 'Berthollet'],
    biologia: ['Darwin', 'Wallace', 'Mendel', 'Pasteur', 'Koch', 'Lamarck', 'Linneo', 'Cuvier', 'Humboldt', 'Haeckel', 'Spallanzani', 'Redi', 'Malpighi', 'Golgi', 'Morgan', 'McClintock', 'Watson', 'Crick', 'Franklin', 'Avery', 'Hershey', 'Chase', 'Monod', 'Jacob', 'Margulis', 'Woese', 'Oparin', 'Haldane', 'Miller', 'Urey', 'Orgel', 'Eigen', 'Szostak', 'Sagan', 'Drake', 'Tarter', 'Seager', 'Mayr', 'Dobzhansky', 'Fisher', 'Levi-Montalcini', 'Carson', 'Goodall', 'Lovelock', 'Leeuwenhoek', 'Schwann', 'Virchow', 'Harvey', 'Galvani', 'Fleming', 'Calvin', 'Krebs', 'Mitchell', 'Lederberg', 'Gould', 'Kimura', 'Deamer', 'Wächtershäuser', 'Cronin', 'Pizzarello', 'Chyba', 'McKay', 'Brenner', 'Nirenberg', 'Khorana', 'Barghoorn', 'Schopf', 'Bernal', 'Ponnamperuma', 'Huxley', 'Wilkins', 'Pääbo'],
    civile: ['Maestrale', 'Libeccio', 'Scirocco', 'Grecale', 'Tramontana', 'Levante', 'Ponente', 'Ostro', 'Bora', 'Favonio', 'Garbino', 'Aliseo', 'Monsone', 'Zefiro', 'Borea', 'Austro', 'Vega', 'Altair', 'Deneb', 'Rigel', 'Antares', 'Aldebaran', 'Arturo', 'Sirio', 'Canopo', 'Polare', 'Betelgeuse', 'Capella', 'Spica', 'Regolo', 'Fomalhaut', 'Achernar', 'Mira', 'Alcor', 'Mizar', 'Castore', 'Polluce', 'Procione', 'Bellatrix', 'Algol', 'Alnilam', 'Mintaka', 'Saiph', 'Shaula', 'Nunki', 'Alioth', 'Dubhe', 'Merak', 'Megrez', 'Alkaid', 'Thuban', 'Kochab', 'Mirfak', 'Hamal', 'Menkar', 'Sadr', 'Albireo', 'Alphard', 'Denebola', 'Zosma', 'Markab', 'Scheat', 'Enif', 'Rasalhague', 'Sabik', 'Atria', 'Hadar', 'Acrux', 'Gacrux', 'Mimosa', 'Avior', 'Suhail', 'Wezen', 'Adhara', 'Mirzam', 'Alhena', 'Elnath', 'Tejat', 'Wasat', 'Propus', 'Ankaa', 'Diphda', 'Menkent', 'Zubenelgenubi', 'Alderamin', 'Errai', 'Caph', 'Schedar', 'Ruchbah', 'Algenib']
};
/** Seed of one model, from its system and slot; `REROLL` moves a few seeds on, so that no two models of the
 * same type and style share their structural recipe (tests/craft.test.mjs checks it). */
export const REROLL = {113: 2, 118: 2, 129: 3, 141: 1, 148: 1, 149: 2, 174: 1, 178: 1, 189: 2, 209: 1, 219: 1, 231: 1, 232: 1, 238: 1, 239: 3, 242: 1, 247: 1, 249: 2, 254: 1, 258: 1, 261: 1, 269: 3, 271: 1, 279: 2, 281: 1, 285: 6, 291: 1, 293: 1, 295: 1, 297: 3, 298: 1, 299: 1};
export const seedFor = (system, slot, attempt = 0) => (Math.imul(system + 1, 0x9E3779B1) ^ Math.imul(slot + 1, 0x85EBCA77) ^ 0x5EED) + 7919 * attempt >>> 0;
const seedOf = (system, slot) => seedFor(system, slot, REROLL[system * 10 + slot] || 0);

function shuffled(list, seed) { const rng = seededRandom(seed), a = [...list]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rng() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }

/** The 300 entries in system order: ten per system, stations first. */
export const CATALOG = (() => {
    const out = [], pools = Object.fromEntries(Object.entries(NAMES).map(([k, v], i) => [k, shuffled(v, 0xC0FFEE + i)])), next = Object.fromEntries(Object.keys(NAMES).map(k => [k, 0])), taken = new Set();
    const name = (typeName, styleKey) => {
        const pool = pools[styleKey];
        for (let tries = 0; tries < pool.length * 2; tries++) { const n = typeName + ' ' + pool[next[styleKey]++ % pool.length]; if (!taken.has(n)) { taken.add(n); return n; } }
        throw new Error('nomi esauriti: ' + styleKey);
    };
    AREAS.forEach((area, system) => {
        const disc = DISCIPLINE_STYLES[area.sector];
        const stations = [['porto', disc], ['porta', 'civile'], ...THEMES[system].map(t => [t, disc])];
        const ships = [0, 1, 2, 3].map(j => [SHIP_ORDER[(system * 4 + j) % 12], j < 2 ? disc : 'civile']);
        [...stations.map(([t, s]) => ['stazione', t, s]), ...ships.map(([t, s]) => ['nave', t, s])].forEach(([kind, type, styleKey], slot) => {
            const spec = kind === 'stazione' ? STATIONS[type] : SHIPS[type];
            const nth = out.filter(e => e.type === type).length;
            out.push({ id: `s${String(system).padStart(2, '0')}-${slot}`, system, slot, nth, kind, type, typeName: spec.name, style: styleKey, sector: area.sector, name: name(spec.name, styleKey), size: spec.size, about: spec.about || '', seed: seedOf(system, slot) });
        });
    });
    return Object.freeze(out.map(Object.freeze));
})();

/** Meshes, lights and recipe of one entry; `seed` replaces the entry's own seed (used to choose REROLL) and
 * `detail` below 1 builds the low level of detail of the same model (src/craft/kit.js). */
export const LOW_DETAIL = .35;
export function build(entry, seed = entry.seed, { detail = 1 } = {}) {
    const spec = entry.kind === 'stazione' ? STATIONS[entry.type] || GRAMMAR_STATIONS[entry.type] : SHIPS[entry.type] || GRAMMAR_SHIPS[entry.type], d = dice(seed, entry.nth);
    const model = spec.build(d, { ...style(entry.style, entry.type === 'porta' ? FIELD[entry.sector] : null), detail });
    model.recipe = d.notes.slice();
    return model;
}
/** Number of structural choices in which two recipes differ (a choice missing from one counts as different). */
export function recipeDistance(a, b) {
    const A = new Map(a.map(n => n.split(': '))), B = new Map(b.map(n => n.split(': ')));
    let diff = 0; for (const key of new Set([...A.keys(), ...B.keys()])) if (A.get(key) !== B.get(key)) diff++;
    return diff;
}
/** Entries of one system: six stations and four ships. */
export const systemCraft = system => CATALOG.filter(e => e.system === system);

/** Number of stations of a system from 1.43.0: the six of the catalogue and 6 to 14 types of the grammar
 * (src/craft/grammar.js), from 12 to 20 in all, each value appearing in three or four systems. */
export const stationCount = system => 12 + (system * 7 + 3) % 9;
/** Roles of the added stations by discipline, most frequent first; past ten the list starts again. */
const ROLE_ORDER = [
    ['osservazione', 'ricerca', 'comunicazioni', 'energia', 'abitazione', 'deposito', 'cantiere', 'fonderia', 'chimica', 'agricoltura'],
    ['energia', 'ricerca', 'osservazione', 'comunicazioni', 'fonderia', 'abitazione', 'deposito', 'cantiere', 'chimica', 'agricoltura'],
    ['chimica', 'fonderia', 'deposito', 'energia', 'ricerca', 'cantiere', 'abitazione', 'comunicazioni', 'osservazione', 'agricoltura'],
    ['agricoltura', 'abitazione', 'ricerca', 'chimica', 'osservazione', 'deposito', 'energia', 'comunicazioni', 'cantiere', 'fonderia']
];
/** Roles built in the civil style first; the others take the style of the discipline first. */
const CIVIL_ROLES = new Set(['abitazione', 'deposito', 'comunicazioni', 'cantiere']);
/** The stations added in 1.43.0, in system order after the ten entries of each system (slots from 10 on).
 * In a system no two have the same type and a family repeats only when all twelve are taken; in the whole
 * catalogue no type appears twice in the same style, so every added model has its own type and style. */
export const EXTRAS = (() => {
    const out = [], pairs = new Set(), taken = new Set(CATALOG.map(e => e.name));
    const pools = Object.fromEntries(Object.entries(NAMES).map(([k, v], i) => [k, shuffled(v, 0xBEEF + i)])), next = Object.fromEntries(Object.keys(NAMES).map(k => [k, 0]));
    const name = (typeName, styleKey) => {
        const pool = pools[styleKey];
        for (let tries = 0; tries < pool.length * 2; tries++) { const n = typeName + ' ' + pool[next[styleKey]++ % pool.length]; if (!taken.has(n)) { taken.add(n); return n; } }
        throw new Error('nomi esauriti: ' + styleKey);
    };
    AREAS.forEach((area, system) => {
        const disc = DISCIPLINE_STYLES[area.sector], order = ROLE_ORDER[area.sector], families = shuffled(FAMILY_KEYS, 0xFA11 + system), here = new Set(), uses = {};
        for (let k = 0; k < stationCount(system) - 6; k++) {
            const role = order[k % order.length], styles = CIVIL_ROLES.has(role) ? ['civile', disc] : [disc, 'civile'];
            let pick = null;
            for (let most = 1; !pick && most <= 3; most++) for (const family of families) {
                const type = role + '-' + family, styleKey = styles.find(s => !pairs.has(type + '/' + s));
                if ((uses[family] || 0) < most && !here.has(type) && styleKey) { pick = { type, family, styleKey }; break; }
            }
            if (!pick) throw new Error('tipi esauriti nel sistema ' + system);
            here.add(pick.type); pairs.add(pick.type + '/' + pick.styleKey); uses[pick.family] = (uses[pick.family] || 0) + 1;
            const t = TYPE_BY_KEY[pick.type], slot = 10 + k;
            out.push(Object.freeze({ id: `s${String(system).padStart(2, '0')}-${slot}`, system, slot, nth: out.filter(e => e.type === pick.type).length, kind: 'stazione', type: pick.type, typeName: t.name, style: pick.styleKey, sector: area.sector, name: name(t.name, pick.styleKey), size: 1, about: t.about, seed: seedFor(system, slot), role: t.role, family: t.family, works: ROLES[t.role].recipe }));
        }
    });
    return Object.freeze(out);
})();
/** Stations added to one system in 1.43.0. */
export const systemExtras = system => EXTRAS.filter(e => e.system === system);

/** Number of ship models added to a system in 1.44.0: from 4 to 8, three for every five added stations. */
export const shipCount = system => Math.round((stationCount(system) - 6) * .6);
/** Roles of the added ships by discipline, most frequent first. */
const SHIP_ROLE_ORDER = [
    ['corriere', 'scientifica', 'navetta', 'cargo', 'passeggeri', 'soccorso', 'costruzione', 'cisterna', 'minerario', 'rimorchiatore'],
    ['scientifica', 'corriere', 'cargo', 'costruzione', 'navetta', 'soccorso', 'cisterna', 'passeggeri', 'rimorchiatore', 'minerario'],
    ['cisterna', 'minerario', 'cargo', 'rimorchiatore', 'costruzione', 'soccorso', 'navetta', 'corriere', 'scientifica', 'passeggeri'],
    ['passeggeri', 'navetta', 'cargo', 'scientifica', 'soccorso', 'cisterna', 'corriere', 'costruzione', 'minerario', 'rimorchiatore']
];
/** The ship models added in 1.44.0, in system order, with slots from 30 on. A slot takes the first role of
 * the discipline, among the first three still to place, that has classes not yet in the catalogue (or any
 * such role), so all 120 classes appear; in a system the hull families differ as long as possible, no class
 * repeats and no class appears twice in the same style in the whole catalogue. Each entry
 * carries its trade (goods, hold, speed) for src/craft/economy.js and its drawn radius. */
export const SHIP_EXTRAS = (() => {
    const out = [], pairs = new Set(), seen = new Set(), taken = new Set([...CATALOG, ...EXTRAS].map(e => e.name));
    const pools = Object.fromEntries(Object.entries(NAMES).map(([k, v], i) => [k, shuffled(v, 0x5A11 + i)])), next = Object.fromEntries(Object.keys(NAMES).map(k => [k, 0]));
    const name = (typeName, styleKey) => {
        const pool = pools[styleKey];
        for (let tries = 0; tries < pool.length * 2; tries++) { const n = typeName + ' ' + pool[next[styleKey]++ % pool.length]; if (!taken.has(n)) { taken.add(n); return n; } }
        throw new Error('nomi esauriti: ' + styleKey);
    };
    AREAS.forEach((area, system) => {
        const disc = DISCIPLINE_STYLES[area.sector], order = [...SHIP_ROLE_ORDER[area.sector]], families = shuffled(HULL_KEYS, 0x5F1E + system), here = new Set(), uses = {};
        const missing = r => families.some(f => !seen.has(r + '-' + f));
        for (let k = 0; k < shipCount(system); k++) {
            const role = order.slice(0, 3).find(missing) || order.find(missing) || order[0];
            order.splice(order.indexOf(role), 1);
            // Families not used yet in this system come first, then the classes still missing from the catalogue.
            const rank = f => (uses[f] || 0) * 2 + (seen.has(role + '-' + f) ? 1 : 0), pool = families.filter(f => !here.has(role + '-' + f)).sort((a, b) => rank(a) - rank(b));
            let pick = null;
            for (const family of pool) { const type = role + '-' + family, styleKey = [k % 2 ? 'civile' : disc, k % 2 ? disc : 'civile'].find(s => !pairs.has(type + '/' + s)); if (styleKey) { pick = { type, family, styleKey }; break; } }
            if (!pick) throw new Error('classi esaurite nel sistema ' + system);
            here.add(pick.type); seen.add(pick.type); pairs.add(pick.type + '/' + pick.styleKey); uses[pick.family] = (uses[pick.family] || 0) + 1;
            const t = SHIP_TYPE_BY_KEY[pick.type], slot = 30 + k, role0 = SHIP_ROLES[t.role];
            out.push(Object.freeze({ id: `s${String(system).padStart(2, '0')}-${slot}`, system, slot, nth: out.filter(e => e.type === pick.type).length, kind: 'nave', type: pick.type, typeName: t.name, style: pick.styleKey, sector: area.sector, name: name(t.name, pick.styleKey), size: role0.length, about: t.about, seed: seedFor(system, slot), role: t.role, family: t.family, drawn: role0.drawn, fleet: Object.freeze(shipTrade(t, FLEET)) }));
        }
    });
    return Object.freeze(out);
})();
/** Ship models added to one system in 1.44.0. */
export const systemShipExtras = system => SHIP_EXTRAS.filter(e => e.system === system);
