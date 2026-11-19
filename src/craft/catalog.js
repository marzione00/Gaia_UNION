/** Catalogue of the 300 stations and ships: ten models in each of the thirty star systems. Every system has
 * a port in the style of its discipline, a passage gate in the civil style and four stations chosen for its
 * themes, then four ships: two in the style of the discipline and two of the civil traffic. Models are
 * built on demand from their seed; `build(entry)` returns the meshes, the lights and the recipe. */
import { AREAS, seededRandom } from '../scene/layout.js';
import { dice } from './kit.js';
import { style, DISCIPLINE_STYLES } from './styles.js';
import { STATIONS } from './stations.js';
import { SHIPS } from './ships.js';

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
            out.push({ id: `s${String(system).padStart(2, '0')}-${slot}`, system, slot, nth, kind, type, typeName: spec.name, style: styleKey, sector: area.sector, name: name(spec.name, styleKey), size: spec.size, seed: seedOf(system, slot) });
        });
    });
    return Object.freeze(out.map(Object.freeze));
})();

/** Meshes, lights and recipe of one entry; `seed` replaces the entry's own seed (used to choose REROLL). */
export function build(entry, seed = entry.seed) {
    const spec = entry.kind === 'stazione' ? STATIONS[entry.type] : SHIPS[entry.type], d = dice(seed, entry.nth);
    const model = spec.build(d, style(entry.style, entry.type === 'porta' ? FIELD[entry.sector] : null));
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
