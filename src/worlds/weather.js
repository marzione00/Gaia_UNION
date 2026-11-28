/** Weather of the zone of a landing site (1.79.0). Each planet has a climate made from its physical card
 * (src/worlds/planet-physics.js): the kinds of weather its air, water and temperature allow, and the numbers of
 * their physics, from the density of the air. The weather of the zone is a sequence of episodes that follows
 * from the seed of the planet and the time since the landing: clear sky for the first minute, then one kind at a
 * time for one to three minutes, coming and going in about twenty seconds, each with its wind. The scene
 * (src/scene/world.js) dims the light, thickens the fog and draws rain, snow, dust or ash around the camera; the
 * panel «Che cosa succede» (src/craft/succede.js) explains the physics with the numbers of the planet. */
import { planetPhysics } from './planet-physics.js';
import { planetCards } from './genome.js';
import { boiling } from './wonders.js';
import { seededRandom } from '../scene/systems.js';

const G0 = 9.80665, R_GAS = 8.314, RV = 461.5;
/** Kinds of weather: name, how much they dim the light and cover the sky at full strength, visibility at full
 * strength (metres), colour of the haze and range of the wind (metres a second; the dust storm takes its own from the threshold). */
export const WEATHER_KINDS = Object.freeze({
    sereno: { label: 'sereno', name: 'Cielo sereno', dim: 0, cover: 0, sight: Infinity, haze: null, wind: [1, 5] },
    nuvoloso: { label: 'nuvoloso', name: 'Cielo coperto', dim: .45, cover: .85, sight: 6000, haze: [.62, .64, .67], wind: [3, 9] },
    pioggia: { label: 'pioggia', name: 'Pioggia', dim: .55, cover: .9, sight: 700, haze: [.52, .55, .6], wind: [3, 10] },
    neve: { label: 'neve', name: 'Neve', dim: .4, cover: .9, sight: 350, haze: [.8, .82, .86], wind: [2, 8] },
    nebbia: { label: 'nebbia', name: 'Nebbia', dim: .35, cover: .95, sight: 80, haze: [.7, .72, .74], wind: [0, 2] },
    polvere: { label: 'tempesta di polvere', name: 'Tempesta di polvere', dim: .6, cover: .95, sight: 160, haze: null, wind: null },
    cenere: { label: 'pioggia di cenere', name: 'Pioggia di cenere', dim: .5, cover: .9, sight: 450, haze: [.36, .34, .33], wind: [1, 5] }
});
/** Lengths of the episodes (seconds of the scene): the clear start, the shortest and longest episode, the ramp. */
export const CLEAR_START = 60, EPISODE = [80, 200], RAMP = 20;
/** Sizes used by the physics: raindrop radius and density, snowflake radius, effective density and drag,
 * dust grain diameter and density, ash grain radius and density, the explorer's frontal area, drag and mass. */
export const DROP = { r: 1e-3, rho: 1000, cd: .5 }, FLAKE = { r: 2.5e-3, rho: 50, cd: 1.2 }, DUST = { d: 1e-4, rho: 2650, a: .1 }, ASH = { r: 25e-6, rho: 2400 }, BODY = { area: .7, cd: 1, mass: 100 };

/** The air at the surface of a planet: molar mass (kg/mol) from the share of carbon dioxide, the rest taken as
 * nitrogen and oxygen; density from the ideal gas law ρ = pM/(RT); viscosity from Sutherland's law. */
export function airOf(p) {
    const T = p.ts, M = p.co2Share * .04401 + (1 - p.co2Share) * .02897, rho = p.pressure * 1e5 * M / (R_GAS * T);
    const mu = p.co2Share * 1.37e-5 * (T / 273.15) ** 1.5 * (273.15 + 222) / (T + 222) + (1 - p.co2Share) * 1.716e-5 * (T / 273.15) ** 1.5 * (273.15 + 110.4) / (T + 110.4);
    return { T, M, rho, mu, g: p.gravity * G0 };
}
/** Speed of a falling body when drag balances weight: v = √(8 r ρ_body g / (3 C_d ρ_air)), for a sphere of radius r. */
export const terminal = (r, rhoBody, cd, air) => Math.sqrt(8 * r * rhoBody * air.g / (3 * cd * air.rho));
/** Stokes' law for small grains: v = 2/9 (ρ_grain − ρ_air) g r² / μ; it does not depend on the density of the air. */
export const stokes = (r, rhoGrain, air) => 2 / 9 * (rhoGrain - air.rho) * air.g * r * r / air.mu;
/** Threshold of the wind for lifting dust (Bagnold): friction speed u* = A √((ρ_grain − ρ_air) g d / ρ_air), and the
 * wind at 2 m above ground with a roughness of 1 cm, u = u* / 0.4 · ln(2/0.01). */
export function dustThreshold(air) { const u = DUST.a * Math.sqrt((DUST.rho - air.rho) * air.g * DUST.d / air.rho); return { friction: u, wind: u / .4 * Math.log(2 / .01) }; }
/** Water vapour that saturates the air at temperature T (Clausius–Clapeyron with 2,5 MJ/kg): pressure in pascal
 * and density in grams per cubic metre. */
export function vapourOf(T) { const e = 611.2 * Math.exp(2.5e6 / RV * (1 / 273.15 - 1 / T)); return { pressure: e, density: e / (RV * T) * 1000 }; }
/** Push of the wind of v metres a second on the explorer, F = ½ ρ v² C_d A, and its share of the weight. */
export function windPush(v, air) { const F = .5 * air.rho * v * v * BODY.cd * BODY.area; return { force: F, share: F / (BODY.mass * air.g) }; }

/** The Earth with the same model, for comparison: 1,013 bar, 15 °C, nitrogen and oxygen with 0,04 % of carbon
 * dioxide, g = 9,81 m/s². */
export const EARTH = (() => { const air = airOf({ ts: 288.15, pressure: 1.01325, co2Share: .0004, gravity: 1 }); return { air, rain: terminal(DROP.r, DROP.rho, DROP.cd, air), snow: terminal(FLAKE.r, FLAKE.rho, FLAKE.cd, air), dust: dustThreshold(air), ash: stokes(ASH.r, ASH.rho, air), fog: vapourOf(288.15) }; })();
/** Climate of planet i: the kinds of weather with their weights and the numbers of their physics. */
export function climateOf(i, p = planetPhysics()[i], family = p.family) {
    const air = airOf(p), wet = ['terrestrial', 'oceanic', 'volcanic', 'arctic'].includes(family), liquid = p.pressure > .2 && p.ts > 273.15 && p.ts < boiling(p.pressure) + 273.15 - 5;
    const kinds = { sereno: family === 'desert' ? 4 : 3 };
    if (p.pressure >= .01) kinds.nuvoloso = 2;
    if (liquid && ['terrestrial', 'oceanic', 'volcanic'].includes(family)) kinds.pioggia = family === 'oceanic' ? 3 : 2.5;
    if ((family === 'arctic' && p.pressure >= .01) || (family === 'terrestrial' && p.ts < 283.15)) kinds.neve = family === 'arctic' ? 2.5 : 1;
    if (wet && p.pressure >= .2) kinds.nebbia = 1;
    if (family === 'desert' && p.pressure >= .004) kinds.polvere = 2;
    if (family === 'volcanic') kinds.cenere = 1.5;
    const out = { index: i, family, seed: (planetCards()[i].terrain.seed ^ 0x3E7E0) >>> 0, air, kinds, pressure: p.pressure, ts: p.ts };
    if (air.rho > 0) {
        out.rain = { v: terminal(DROP.r, DROP.rho, DROP.cd, air) };
        out.snow = { v: terminal(FLAKE.r, FLAKE.rho, FLAKE.cd, air) };
        // The fine dust a storm keeps in the air, grains of 10 µm, settles at the speed of Stokes' law.
        out.dust = { ...dustThreshold(air), fall: stokes(5e-6, DUST.rho, air) };
        out.ash = { v: stokes(ASH.r, ASH.rho, air) };
        out.fog = vapourOf(p.ts);
    }
    return out;
}
let climates = null;
/** Climates of all the planets, in planet order (computed once). */
export const allClimates = () => climates ||= planetPhysics().map((p, i) => climateOf(i, p));

/** Episodes of climate C up to time t (seconds since the landing): { kind, start, end, peak, wind, from }. The first
 * is a clear sky of CLEAR_START seconds; then a kind drawn by weight, never the same twice in a row. */
export function episodesOf(C, t) {
    const list = C.episodes ||= [], r = C.random ||= seededRandom(C.seed), names = Object.keys(C.kinds), total = names.reduce((a, k) => a + C.kinds[k], 0);
    // Without air there is no wind.
    const windOf = kind => { const W = WEATHER_KINDS[kind].wind || [1.2 * C.dust.wind, 2 * C.dust.wind], x = r(); return C.air.rho > 0 ? W[0] + (W[1] - W[0]) * x : 0; };
    if (!list.length) list.push({ kind: 'sereno', start: 0, end: CLEAR_START, peak: 0, wind: windOf('sereno'), from: Math.floor(r() * 360) });
    while (list.at(-1).end <= t) {
        const last = list.at(-1); let kind = 'sereno';
        if (names.length > 1) { do { let x = r() * total; kind = names.find(k => (x -= C.kinds[k]) < 0) || names.at(-1); } while (kind === last.kind); }
        const length = EPISODE[0] + (EPISODE[1] - EPISODE[0]) * r(), peak = kind === 'sereno' ? 0 : kind === 'nuvoloso' ? .5 + .4 * r() : .55 + .45 * r();
        list.push({ kind, start: last.end, end: last.end + length, peak: +peak.toFixed(3), wind: +windOf(kind).toFixed(2), from: Math.floor(r() * 360) });
    }
    return list;
}
/** The weather at time t: the kind of the episode, its strength now (0 to 1, rising and falling over RAMP seconds),
 * the wind (metres a second, and the bearing it blows from), the visibility (metres) and the seconds left. */
export function weatherAt(C, t) {
    t = Math.max(0, t); const E = episodesOf(C, t), e = E.find(x => t >= x.start && t < x.end), K = WEATHER_KINDS[e.kind];
    const ramp = Math.min(1, (t - e.start) / RAMP, (e.end - t) / RAMP), strength = +(e.peak * ramp * ramp * (3 - 2 * ramp)).toFixed(4);
    // The wind of an episode blends into the next over the ramp, so it never jumps.
    const prev = E[E.indexOf(e) - 1], k = prev ? Math.min(1, (t - e.start) / RAMP) : 1, wind = prev ? prev.wind + (e.wind - prev.wind) * k : e.wind;
    const sight = K.sight === Infinity || strength <= 0 ? Infinity : K.sight / Math.max(.05, strength);
    return { kind: e.kind, strength, peak: e.peak, wind: +wind.toFixed(2), from: e.from, sight, left: e.end - t, episode: E.indexOf(e) };
}
/** Words for a strength: light, moderate or heavy. */
export const strengthWord = (kind, s) => kind === 'sereno' || kind === 'nuvoloso' ? '' : s < .4 ? 'debole' : s < .75 ? 'moderata' : 'forte';
