/** Physical card of each explorable planet: its star, orbit and the four spheres (geosphere,
 * hydrosphere, atmosphere, biosphere), from the identity card (src/worlds/genome.js), the physical
 * layout of its system (src/scene/systems.js) and the model of src/worlds/physics.js. */
import { systemArchitecture, systemForPlanet, AREAS, UNIT_COUNT, seededRandom } from '../scene/systems.js';
import { planetCards } from './genome.js';
import { planetSpecies } from './surface.js';
import { surfaceState, zoneOf, periodDays, boilingPoint, TRIPLE_POINT_BAR, APPRECIABLE_DENSITY, bodyMass } from './physics.js';

/** Earth's escape velocity (km/s) from the IAU 2015 nominal GM and equatorial radius. */
export const EARTH_ESCAPE = Math.sqrt(2 * 3.986004e14 / 6.3781e6) / 1000;

function waterOf(family, s) {
    if (family === 'barren' || s.pressure === 0) return 'Assente in superficie: senza atmosfera il ghiaccio sublima e il vapore si disperde nello spazio.';
    const liquid = s.ts > 273.15 && s.pressure > TRIPLE_POINT_BAR && s.ts < boilingPoint(s.pressure);
    if (family === 'oceanic') return 'Un oceano liquido copre quasi tutta la superficie.';
    if (family === 'terrestrial') return 'Mari, laghi e fiumi di acqua liquida.';
    if (family === 'arctic') return 'Mari coperti di ghiaccio: la superficie resta sotto il punto di congelamento.';
    if (family === 'volcanic') return liquid ? 'Laghi caldi e sorgenti alimentate dal calore interno.' : 'Vapore e sorgenti calde.';
    return liquid ? 'Poca acqua: laghi salati e falde sotto la superficie.' : 'Ghiaccio nel suolo e salamoie che restano liquide sotto zero.';
}
const VOLCANISM = { volcanic: 'intenso', barren: 'spento' };

/** Physical card of planet `index`. */
export function physicsOf(index, cards = planetCards()) {
    const card = cards[index], system = systemForPlanet(index), layout = systemArchitecture(system), star = layout.star;
    const body = layout.bodies.find(b => b.index === index), flux = star.luminosity / body.a ** 2;
    const r = seededRandom(card.terrain.seed ^ 0x50485953), s = surfaceState(card.family, card.atmosphere.density, flux, r(), .25 + .5 * r());
    return {
        index, system, area: AREAS[system].name, family: card.family, star, a: body.a, period: periodDays(body.a, star.mass), flux, zone: zoneOf(flux, star), ...s,
        exosphere: card.atmosphere.density < APPRECIABLE_DENSITY,
        radius: card.gravity, mass: bodyMass(card.family, body.radius), gravity: card.gravity, escape: EARTH_ESCAPE * card.gravity,
        magnetosphere: card.magnetosphere, volcanism: VOLCANISM[card.family] || (card.terrain.style === 'criovulcani' ? 'criovulcanismo' : 'moderato'),
        water: waterOf(card.family, s)
    };
}
let cache = null;
/** Physical cards of all explorable planets, in planet order (computed once). */
export const planetPhysics = () => cache ||= Array.from({ length: UNIT_COUNT }, (_, i) => physicsOf(i));

/** Italian number with `digits` significant figures (decimal comma). */
export function it(x, digits = 2) {
    if (!Number.isFinite(x)) return '–';
    const v = Number(x.toPrecision(digits));
    return v.toLocaleString('it-IT', { maximumSignificantDigits: Math.max(digits, String(Math.round(Math.abs(v))).length) });
}
const ZONES = { interna: 'più vicino del bordo interno della zona abitabile', abitabile: 'dentro la zona abitabile', esterna: 'oltre il bordo esterno della zona abitabile' };
const times = x => it(x, 2) + (it(x, 2) === '1' ? ' volta' : ' volte');
const celsius = t => { const c = Math.round(t - 273.15); return (c < 0 ? '−' + -c : String(c)) + ' °C'; };
const year = d => d < 2 ? it(d * 24, 2) + ' ore' : d < 730 ? it(d, 3) + ' giorni' : it(d / 365.25, 2) + ' anni terrestri';
const plain = s => s.replace(/\.$/, ''), lower = s => s[0].toLowerCase() + s.slice(1);
/** Rows of the card, grouped by sphere: [heading, [[label, value], ...]]. `species` is the number of species. */
export function physicsRows(p, species) {
    return [
        ['Stella e orbita', [
            ['Stella', `${p.star.spt}, ${it(p.star.teff, 4)} K, ${times(p.star.luminosity)} la luminosità del Sole`],
            ['Orbita', `${it(p.a, 2)} UA, periodo di ${year(p.period)}`],
            ['Luce', `${times(p.flux)} quella che riceve la Terra, ${ZONES[p.zone]}`]]],
        ['Geosfera', [
            ['Raggio e massa', `${it(p.radius, 2)} e ${it(p.mass, 2)} volte la Terra`],
            ['Gravità', `${it(p.gravity, 2)} g, velocità di fuga ${it(p.escape, 2)} km/s`],
            ['Magnetosfera', p.magnetosphere ? 'campo magnetico globale' : 'nessun campo magnetico globale'],
            ['Vulcanismo', p.volcanism]]],
        ['Idrosfera', [['Acqua', lower(plain(p.water))]]],
        ['Atmosfera', p.exosphere ? [['Pressione', 'esosfera, meno di un centesimo di bar'], ['Temperatura', `${Math.round(p.ts)} K (${celsius(p.ts)}), senza effetto serra, albedo ${it(p.albedo, 2)}`]] : [
            ['Pressione', `${it(p.pressure, 2)} bar`],
            ['Effetto serra', `profondità ottica ${it(p.tau, 2)}, ${Math.round(p.greenhouse)} K sopra l'equilibrio`],
            ['Temperatura', `${Math.round(p.ts)} K (${celsius(p.ts)}); equilibrio ${Math.round(p.teq)} K con albedo ${it(p.albedo, 2)}`]]],
        ['Biosfera', [['Vita', species > 0 ? `${species} specie in superficie` : 'nessuna specie in superficie']]]
    ];
}
/** Plain text of the card, for screen readers and the documentation. */
export function physicsText(p, species) {
    return physicsRows(p, species).map(([h, rows]) => h + '. ' + rows.map(([k, v]) => k + ': ' + v + '.').join(' ')).join(' ');
}
export const speciesCount = index => planetSpecies()[index].length;
