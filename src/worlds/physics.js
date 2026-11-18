/** Physical model of the star systems and of the explorable planets. Pure functions and data, with no
 * dependency on the scene: star parameters by spectral subtype, habitable zone, equilibrium and surface
 * temperature with a grey greenhouse, the requirements of each planet family, and the placement of the
 * bodies of a system at physical distances that respect those requirements and the Hill stability of
 * neighbouring orbits. src/scene/systems.js draws the orbits from these distances; src/worlds/
 * planet-physics.js adds the identity cards and builds the physical card of each planet.
 * Sources and limits are listed in docs/FISICA_PIANETI.md. */

/** Stefan-Boltzmann constant (CODATA 2018), W m^-2 K^-4. */
export const SIGMA = 5.670374419e-8;
/** IAU 2015 nominal total solar irradiance at 1 au (W m^-2) and nominal solar effective temperature (K). */
export const S_EARTH = 1361, T_SUN = 5772;
export const YEAR_DAYS = 365.25;
/** Earth mass in solar masses, Jupiter mass in Earth masses (IAU 2015 nominal GM ratios), solar radius in au. */
export const EARTH_MASS = 3.0034896e-6, JUPITER_MASS_EARTHS = 317.83, SOLAR_RADIUS_AU = 6.957e8 / 1.495978707e11;

/** Main-sequence dwarfs from E. Mamajek, "A Modern Mean Dwarf Stellar Color and Effective Temperature
 * Sequence", version 2022.04.16 (Pecaut & Mamajek 2013, ApJS 208, 9): Teff in K, log10 L/Lsun,
 * radius in Rsun, mass in Msun. */
export const DWARFS = Object.freeze({
    A0V: [9700, 1.58, 2.193, 2.18], A2V: [8800, 1.38, 2.117, 1.98], A5V: [8100, 1.09, 1.785, 1.88], A7V: [7760, 1.00, 1.750, 1.77],
    F0V: [7220, 0.86, 1.728, 1.61], F2V: [6820, 0.71, 1.622, 1.46], F5V: [6550, 0.56, 1.473, 1.33], F8V: [6180, 0.29, 1.221, 1.18],
    G0V: [5930, 0.13, 1.100, 1.06], G2V: [5770, 0.01, 1.012, 1.00], G5V: [5660, -0.05, 0.977, 0.98], G8V: [5480, -0.17, 0.914, 0.94],
    K0V: [5270, -0.34, 0.813, 0.88], K2V: [5100, -0.43, 0.783, 0.82], K3V: [4830, -0.55, 0.755, 0.78], K5V: [4440, -0.76, 0.701, 0.70], K7V: [4100, -1.00, 0.630, 0.64],
    M0V: [3850, -1.16, 0.588, 0.57], M1V: [3660, -1.39, 0.501, 0.50], M2V: [3560, -1.54, 0.446, 0.44], M3V: [3430, -1.79, 0.361, 0.37], M4V: [3210, -2.14, 0.274, 0.23], M5V: [3060, -2.52, 0.196, 0.162]
});
/** Subtypes given to the systems of each star type, from the hottest to the coolest. */
export const SUBTYPES = Object.freeze({
    A: ['A0V', 'A2V', 'A5V', 'A7V'], F: ['F0V', 'F2V', 'F5V', 'F8V'], G: ['G0V', 'G2V', 'G5V', 'G8V'],
    K: ['K0V', 'K2V', 'K3V', 'K5V', 'K7V'], M: ['M0V', 'M1V', 'M2V', 'M3V', 'M4V', 'M5V']
});

/** Habitable-zone fluxes (Earth units) of Kopparapu et al. (2014, ApJL 787, L29), coefficients of their
 * hzcalc.py: runaway greenhouse (inner edge) and maximum greenhouse (outer edge). The fit holds for
 * 2600 K <= Teff <= 7200 K; hotter stars take the value at 7200 K. */
const HZ = Object.freeze({
    inner: [1.107, 1.332e-4, 1.580e-8, -8.308e-12, -1.931e-15],
    outer: [0.356, 6.171e-5, 1.698e-9, -3.198e-12, -5.575e-16]
});
export const HZ_TEFF = Object.freeze([2600, 7200]);
export function habitableFlux(edge, teff) {
    const [s, a, b, c, d] = HZ[edge], t = Math.min(HZ_TEFF[1], Math.max(HZ_TEFF[0], teff)) - 5780;
    return s + a * t + b * t ** 2 + c * t ** 3 + d * t ** 4;
}
/** Star of spectral subtype `spt`. */
export function dwarf(spt) {
    const [teff, logL, radius, mass] = DWARFS[spt];
    return { spt, teff, luminosity: 10 ** logL, radius, mass, hz: { inner: habitableFlux('inner', teff), outer: habitableFlux('outer', teff) } };
}
/** Subtype of the `rank`-th of `count` systems sharing star type `type`. */
export const subtypeOf = (type, rank, count) => { const list = SUBTYPES[type]; return list[Math.round(rank * (list.length - 1) / Math.max(1, count - 1))]; };

/** Equilibrium temperature (K) of a planet receiving `flux` times the Earth's insolation. */
export const equilibriumTemperature = (flux, albedo) => (flux * S_EARTH * (1 - albedo) / (4 * SIGMA)) ** .25;
/** Surface temperature under a grey atmosphere in radiative equilibrium (Eddington approximation). */
export const surfaceTemperature = (teq, tau) => teq * (1 + .75 * tau) ** .25;
/** Infrared optical depth that turns `teq` into `ts`. */
export const opticalDepth = (teq, ts) => ((ts / teq) ** 4 - 1) / .75;

/** Calibration bodies (NASA planetary fact sheets): irradiance at the planet (W m^-2), Bond albedo,
 * mean surface temperature (K), surface pressure (bar). */
export const CALIBRATION = Object.freeze({
    earth: { irradiance: 1361.0, albedo: .294, ts: 288, p: 1.014 },
    mars: { irradiance: 586.2, albedo: .25, ts: 214, p: .00636 },
    venus: { irradiance: 2601.3, albedo: .77, ts: 737, p: 92 }
});
export const calibratedDepth = body => opticalDepth(equilibriumTemperature(body.irradiance / S_EARTH, body.albedo), body.ts);
/** Grey optical depth of an atmosphere of CO2 alone at pressure p (bar): the power law through Mars and
 * Venus, both almost pure CO2. A real atmosphere lies between 0 (transparent) and this curve. */
export const CO2_ENVELOPE = (() => {
    const m = CALIBRATION.mars, v = CALIBRATION.venus, tm = calibratedDepth(m), tv = calibratedDepth(v), n = Math.log(tv / tm) / Math.log(v.p / m.p);
    return Object.freeze({ n, c: tv / v.p ** n });
})();
export const co2Depth = p => p > 0 ? CO2_ENVELOPE.c * p ** CO2_ENVELOPE.n : 0;

/** Surface pressure (bar) from the atmosphere density of the identity card, from 0 (none) to 1 (dense):
 * a logarithmic scale on which 0.05 gives a Martian pressure, 0.55 about one bar and 0.95 sixty bar.
 * Below 0.1 the card has no appreciable atmosphere: an exosphere only, with no greenhouse. */
export const pressureFromDensity = d => d < .01 ? 0 : 10 ** (4.5 * d - 2.5);
export const APPRECIABLE_DENSITY = .1;

/** What each family of explorable planet needs. `density` is the range of the identity card;
 * `albedo` a Bond albedo range from solar-system analogues; `window` the surface temperature (K)
 * compatible with what the planet shows and with its species; `tauMin` the least greenhouse;
 * `zone` where it may orbit with respect to the conservative habitable zone. */
export const FAMILIES = Object.freeze({
    terrestrial: { density: [.4, .75], albedo: [.25, .35], window: [275, 305], tauMin: .3, zone: 'habitable' },
    oceanic: { density: [.45, .85], albedo: [.2, .35], window: [275, 315], tauMin: .3, zone: 'habitable' },
    desert: { density: [.05, .4], albedo: [.2, .3], window: [235, 330], tauMin: 0, zone: 'any' },
    barren: { density: [0, .06], albedo: [.08, .14], window: [80, 420], tauMin: 0, zone: 'any' },
    arctic: { density: [.15, .5], albedo: [.45, .65], window: [225, 268], tauMin: 0, zone: 'below-runaway' },
    volcanic: { density: [.5, .95], albedo: [.3, .77], window: [280, 360], tauMin: .3, zone: 'any' }
});
/** Optical-depth range of a family at atmosphere density `density`: an exosphere has none. */
export function tauRange(family, density) {
    if (density < APPRECIABLE_DENSITY) return [0, 0];
    const t = FAMILIES[family].tauMin; return [t, Math.max(t, co2Depth(pressureFromDensity(density)))];
}
/** Surface temperatures inside the family window reachable at `flux` with atmosphere `density`, or null. */
export function reachable(family, flux, density) {
    const f = FAMILIES[family], [t0, t1] = tauRange(family, density);
    if (density >= APPRECIABLE_DENSITY && co2Depth(pressureFromDensity(density)) < f.tauMin) return null;
    const lo = Math.max(f.window[0], surfaceTemperature(equilibriumTemperature(flux, f.albedo[1]), t0)), hi = Math.min(f.window[1], surfaceTemperature(equilibriumTemperature(flux, f.albedo[0]), t1));
    return lo <= hi ? [lo, hi] : null;
}
/** Flux interval (Earth units) where a planet of `family` with atmosphere `density` meets its window
 * and its zone, scanned on a logarithmic grid. Without a density, both ends of the family range must. */
export function familyFluxes(family, star, density) {
    const f = FAMILIES[family], meets = s => density === undefined ? reachable(family, s, f.density[0]) && reachable(family, s, f.density[1]) : reachable(family, s, density);
    const ok = s => meets(s) && (f.zone !== 'habitable' || (s <= star.hz.inner && s >= star.hz.outer)) && (f.zone !== 'below-runaway' || s <= star.hz.inner);
    let lo = Infinity, hi = 0;
    for (let k = 0; k <= 2400; k++) { const s = 10 ** (-3 + k * 5 / 2400); if (ok(s)) { lo = Math.min(lo, s); hi = Math.max(hi, s); } }
    return hi > 0 ? [lo, hi] : null;
}

/** Mass in Earth masses of a body of the system layout, from its drawn radius: rocky bodies have the
 * Earth's density (so surface gravity and radius in Earth units coincide), giants span Saturn to
 * Jupiter, ice giants Uranus to Neptune. */
export function bodyMass(type, radius) {
    if (type === 'gas' || type === 'ringed') return 95.16 + (radius - .62) / .29 * (JUPITER_MASS_EARTHS - 95.16);
    if (type === 'icegiant') return 14.54 + (radius - .62) / .29 * (17.15 - 14.54);
    return (radius / .42) ** 3;
}
/** Least spacing between neighbouring orbits, in mutual Hill radii (after Chambers et al. 1996). */
export const HILL_SPACING = 10;
const mutualHill = (m1, m2, mass) => ((m1 + m2) * EARTH_MASS / (3 * mass)) ** (1 / 3);
/** Smallest ratio of semi-major axes for neighbours of masses m1, m2 (Earth masses) around a star of `mass` (Msun). */
export function hillRatio(m1, m2, mass, spacing = HILL_SPACING) { const h = mutualHill(m1, m2, mass) * spacing / 2; return (1 + h) / (1 - h); }
/** Separation of two neighbours at a1 < a2, in mutual Hill radii. */
export const hillSeparation = (a1, a2, m1, m2, mass) => (a2 - a1) / (mutualHill(m1, m2, mass) * (a1 + a2) / 2);

/** Preferred fluxes of the bodies that cannot be visited, as multiples of a habitable-zone edge:
 * hot rocky and Venus-like worlds inside, giants and icy worlds beyond the snow line. */
const AMBIENT = Object.freeze({
    acid: ['inner', 1, 3], rocky: ['inner', 1.5, 8], volcanic: ['inner', 1, 5], desert: ['inner', 1, 3],
    arctic: ['outer', .1, .8], gas: ['outer', .01, .3], ringed: ['outer', .005, .1], icegiant: ['outer', .002, .03]
});
/** Mean of each family's temperature window: the order in which the families would sit by warmth alone. */
const WARMTH = Object.freeze(Object.fromEntries(Object.entries(FAMILIES).map(([k, f]) => [k, (f.window[0] + f.window[1]) / 2])));
/** How much robustness (natural log of distance) a placement may give up to follow that order. */
const ROBUSTNESS_SLACK = .08;
function* permutations(list) {
    if (list.length <= 1) { yield list; return; }
    for (let i = 0; i < list.length; i++) for (const rest of permutations([...list.slice(0, i), ...list.slice(i + 1)])) yield [list[i], ...rest];
}
/** Semi-major axes (au) of the bodies of a system. `bodies` are {type, explorable, radius, density}; the result
 * holds one distance per body, in the same order, and the worst margin (natural log) by which a
 * visitable planet sits inside its flux interval. Visitable planets are packed in the order that leaves
 * all of them deepest inside their intervals, with Hill-stable gaps; hot bodies that cannot be visited
 * go inside them, the others outside. */
export function placeBodies(star, bodies) {
    const items = bodies.map((b, i) => {
        const m = bodyMass(b.type, b.radius);
        if (b.explorable) { const f = familyFluxes(b.type, star, b.density); return { i, m, explorable: true, aLo: Math.sqrt(star.luminosity / f[1]), aHi: Math.sqrt(star.luminosity / f[0]) }; }
        const [edge, x, y] = AMBIENT[b.type], s = star.hz[edge];
        return { i, m, explorable: false, inner: edge === 'inner', pref: Math.sqrt(star.luminosity / (s * Math.sqrt(x * y))) };
    });
    const mass = star.mass, options = [];
    for (const order of permutations(items.filter(o => o.explorable))) {
        const a = [];
        for (const [k, o] of order.entries()) a.push(k ? Math.max(o.aLo, a[k - 1] * hillRatio(order[k - 1].m, o.m, mass)) : o.aLo);
        const up = Math.min(...order.map((o, k) => o.aHi / a[k])), down = Math.min(...order.map((o, k) => a[k] / o.aLo)), score = Math.log(up * down) / 2;
        // Inversions with respect to the warm-to-cold order of the families' windows.
        let inversions = 0;
        for (let i = 0; i < order.length; i++) for (let j = i + 1; j < order.length; j++) if (WARMTH[bodies[order[i].i].type] < WARMTH[bodies[order[j].i].type]) inversions++;
        options.push({ order, a: a.map(v => v * Math.sqrt(up / down)), score, inversions });
    }
    // Among the orders almost as robust as the best, the one closest to warm inside and cold outside.
    const top = Math.max(...options.map(o => o.score)), floor = top - Math.min(ROBUSTNESS_SLACK, top / 2);
    const best = options.filter(o => o.score >= floor).sort((x, y) => x.inversions - y.inversions || y.score - x.score)[0];
    const out = new Array(bodies.length);
    best.order.forEach((o, k) => { out[o.i] = best.a[k]; });
    // Bodies that cannot be visited: hot ones inwards from the innermost planet, cold ones outwards.
    const inner = items.filter(o => !o.explorable && o.inner).sort((p, q) => q.pref - p.pref), outer = items.filter(o => !o.explorable && !o.inner).sort((p, q) => p.pref - q.pref);
    let edge = best.order[0], at = out[edge.i];
    for (const o of inner) { at = Math.min(o.pref, at / hillRatio(o.m, edge.m, mass)); out[o.i] = at; edge = o; }
    edge = best.order.at(-1); at = out[edge.i];
    for (const o of outer) { at = Math.max(o.pref, at * hillRatio(edge.m, o.m, mass)); out[o.i] = at; edge = o; }
    return { a: out, score: best.score };
}

/** Boiling point of water (K) at pressure p (bar), Clausius-Clapeyron with L = 40.65 kJ/mol. */
export const boilingPoint = p => 1 / (1 / 373.15 - 8.314462618 * Math.log(p / 1.01325) / 40650);
/** Triple point of water, 611.657 Pa, in bar. */
export const TRIPLE_POINT_BAR = 611.657e-5;
/** Where a flux falls with respect to the conservative habitable zone. */
export const zoneOf = (flux, star) => flux > star.hz.inner ? 'interna' : flux < star.hz.outer ? 'esterna' : 'abitabile';
/** Orbital period in days, the planet's mass neglected. */
export const periodDays = (a, mass) => Math.sqrt(a ** 3 / mass) * YEAR_DAYS;

/** Surface state of a planet of `family` with atmosphere `density` at `flux`. `uA` and `uT` (0-1) pick
 * the albedo inside its range and the temperature inside what that albedo can reach. */
export function surfaceState(family, density, flux, uA, uT) {
    const f = FAMILIES[family], [t0, t1] = tauRange(family, density);
    const reach = A => { const teq = equilibriumTemperature(flux, A); return [Math.max(f.window[0], surfaceTemperature(teq, t0)), Math.min(f.window[1], surfaceTemperature(teq, t1))]; };
    const span = A => { const [lo, hi] = reach(A); return hi - lo; };
    // The drawn albedo is kept when it reaches the window; otherwise the nearest albedo that does.
    let albedo = f.albedo[0] + (f.albedo[1] - f.albedo[0]) * uA;
    if (span(albedo) < 0) {
        const samples = Array.from({ length: 81 }, (_, i) => f.albedo[0] + (f.albedo[1] - f.albedo[0]) * i / 80).filter(A => span(A) >= 0);
        if (samples.length) albedo = samples.reduce((x, y) => Math.abs(y - albedo) < Math.abs(x - albedo) ? y : x);
    }
    const [lo, hi] = reach(albedo), teq = equilibriumTemperature(flux, albedo), target = lo + Math.max(0, hi - lo) * uT;
    const tau = t1 > 0 ? Math.min(t1, Math.max(t0, opticalDepth(teq, target))) : 0, ts = surfaceTemperature(teq, tau), p = density < APPRECIABLE_DENSITY ? 0 : pressureFromDensity(density);
    return { albedo, teq, tau, ts, pressure: p, greenhouse: ts - teq, co2Share: p > 0 ? tau / co2Depth(p) : 0 };
}
