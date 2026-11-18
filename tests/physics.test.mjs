import test from 'node:test'; import assert from 'node:assert/strict';
import * as P from '../src/worlds/physics.js';
import { planetPhysics, physicsRows, physicsText, speciesCount, EARTH_ESCAPE } from '../src/worlds/planet-physics.js';
import { systemArchitecture, systemStar, SYSTEM_COUNT, UNIT_COUNT, indicesForSystem } from '../src/scene/systems.js';
import { NavigationMemory } from '../src/scene/navigation.js';
import { planetCards, starTypes } from '../src/worlds/genome.js';

const near = (a, b, tol, msg) => assert.ok(Math.abs(a - b) <= tol, `${msg ?? ''} ${a} invece di ${b} (±${tol})`);
const planets = planetPhysics(), cards = planetCards();

test('Fisica: calibrazione su Venere, Marte e Terra (schede NASA)', () => {
    // Black-body temperatures of the NASA fact sheets, recomputed from irradiance and Bond albedo.
    near(P.equilibriumTemperature(P.CALIBRATION.venus.irradiance / P.S_EARTH, .77), 226.6, .1, 'Venere');
    near(P.equilibriumTemperature(P.CALIBRATION.mars.irradiance / P.S_EARTH, .25), 209.8, .1, 'Marte');
    near(P.equilibriumTemperature(1, .294), 255.1, .1, 'Terra');
    near(P.calibratedDepth(P.CALIBRATION.venus), 147.8, .1); near(P.calibratedDepth(P.CALIBRATION.mars), .109, .001); near(P.calibratedDepth(P.CALIBRATION.earth), .832, .001);
    // The CO2 envelope passes exactly through Mars and Venus.
    for (const b of [P.CALIBRATION.mars, P.CALIBRATION.venus]) near(P.co2Depth(b.p), P.calibratedDepth(b), 1e-9);
    near(P.CO2_ENVELOPE.n, .753, .001); near(P.CO2_ENVELOPE.c, 4.917, .001);
    // Earth, mostly N2 and O2, sits well below the curve at its own pressure.
    near(P.calibratedDepth(P.CALIBRATION.earth) / P.co2Depth(1.014), .168, .001);
    near(P.surfaceTemperature(255.1, P.opticalDepth(255.1, 288)), 288, 1e-9);
});

test('Fisica: stelle di Mamajek coerenti con Stefan-Boltzmann e zona abitabile di Kopparapu', () => {
    for (const [spt, [teff, logL, r]] of Object.entries(P.DWARFS)) near(Math.log10(r * r * (teff / P.T_SUN) ** 4), logL, .005, spt);
    assert.equal(P.habitableFlux('inner', 5780), 1.107); assert.equal(P.habitableFlux('outer', 5780), .356);
    assert.equal(P.habitableFlux('inner', 9700), P.habitableFlux('inner', 7200));
    // Thirty systems, six per star type, each type spread over its subtypes from the hottest.
    const types = starTypes(), stars = Array.from({ length: SYSTEM_COUNT }, (_, id) => systemStar(id));
    for (const t of 'MKGFA') { const mine = stars.filter((s, id) => types[id] === t); assert.equal(mine.length, 6); assert.equal(mine[0].spt, P.SUBTYPES[t][0]); assert.equal(mine.at(-1).spt, P.SUBTYPES[t].at(-1)); }
    for (const s of stars) { assert.ok(s.hz.inner > s.hz.outer); assert.equal(s.luminosity, 10 ** P.DWARFS[s.spt][1]); }
});

test('Fisica: ogni pianeta raggiunge la temperatura della sua famiglia con albedo ed effetto serra plausibili', () => {
    assert.equal(planets.length, UNIT_COUNT);
    for (const p of planets) {
        const f = P.FAMILIES[p.family], card = cards[p.index], name = 'pianeta ' + p.index + ' (' + p.family + ')';
        assert.equal(p.family, card.family);
        assert.ok(p.albedo >= f.albedo[0] - 1e-12 && p.albedo <= f.albedo[1] + 1e-12, name + ' albedo');
        near(p.flux, p.star.luminosity / p.a ** 2, 1e-12, name);
        near(p.teq, P.equilibriumTemperature(p.flux, p.albedo), 1e-9, name);
        near(p.ts, P.surfaceTemperature(p.teq, p.tau), 1e-9, name);
        assert.ok(p.ts >= f.window[0] - 1e-9 && p.ts <= f.window[1] + 1e-9, name + ' ' + p.ts.toFixed(1) + ' K fuori da ' + f.window);
        if (card.atmosphere.density < P.APPRECIABLE_DENSITY) { assert.equal(p.tau, 0); assert.equal(p.pressure, 0); }
        else { assert.ok(p.tau >= f.tauMin - 1e-9 && p.tau <= P.co2Depth(p.pressure) + 1e-9, name + ' tau'); near(p.pressure, P.pressureFromDensity(card.atmosphere.density), 1e-12); }
        if (f.zone === 'habitable') assert.equal(p.zone, 'abitabile', name);
        if (f.zone === 'below-runaway') assert.ok(p.flux <= p.star.hz.inner, name);
        if (['terrestrial', 'oceanic'].includes(p.family)) assert.ok(p.ts > 273.15 && p.ts < P.boilingPoint(p.pressure) && p.pressure > P.TRIPLE_POINT_BAR, name + ' acqua liquida');
        if (p.family === 'arctic') assert.ok(p.ts < 273.15, name + ' ghiaccio');
        near(p.period, Math.sqrt(p.a ** 3 / p.star.mass) * 365.25, 1e-9, name + ' Keplero');
        near(p.radius, card.gravity, 1e-12); near(p.mass, card.gravity ** 3, .01 * card.gravity ** 3); near(p.escape, EARTH_ESCAPE * card.gravity, 1e-12);
    }
    near(EARTH_ESCAPE, 11.18, .01);
    // Every family is present, and the climates span frozen to hot worlds.
    assert.equal(new Set(planets.map(p => p.family)).size, 6);
    assert.ok(Math.min(...planets.map(p => p.ts)) < 230 && Math.max(...planets.map(p => p.ts)) > 340);
});

test('Fisica: orbite stabili, ordinate per distanza e coerenti con la vista del sistema', () => {
    for (let id = 0; id < SYSTEM_COUNT; id++) {
        const L = systemArchitecture(id), m = L.star.mass;
        assert.ok(L.placementScore > .05, 'sistema ' + id + ' margine ' + L.placementScore);
        assert.deepEqual(L.bodies.filter(b => b.explorable).map(b => b.index).sort((x, y) => x - y), indicesForSystem(id).sort((x, y) => x - y));
        for (let k = 1; k < L.bodies.length; k++) {
            const p = L.bodies[k - 1], q = L.bodies[k];
            assert.ok(q.a > p.a && q.orbit > p.orbit);
            assert.ok(P.hillSeparation(p.a, q.a, P.bodyMass(p.type, p.radius), P.bodyMass(q.type, q.radius), m) >= P.HILL_SPACING - 1e-9, 'sistema ' + id + ' corpi ' + k);
        }
        // The innermost body stays well outside the star.
        assert.ok(L.bodies[0].a > 5 * L.star.radius * P.SOLAR_RADIUS_AU);
        // Giants and ice giants lie beyond every planet that can be visited.
        const lastVisit = Math.max(...L.bodies.filter(b => b.explorable).map(b => b.a));
        assert.ok(L.bodies.filter(b => ['gas', 'ringed', 'icegiant'].includes(b.type)).every(b => b.a > lastVisit));
    }
});

test('Fisica: la scheda del pianeta è completa e scritta nello stile del sito', () => {
    for (const p of planets) {
        const rows = physicsRows(p, speciesCount(p.index)), text = physicsText(p, speciesCount(p.index));
        assert.deepEqual(rows.map(r => r[0]), ['Stella e orbita', 'Geosfera', 'Idrosfera', 'Atmosfera', 'Biosfera']);
        assert.doesNotMatch(text, /NaN|undefined|Infinity|–|—|\.\./);
        assert.doesNotMatch(text, /\bnon\b[^.;:\n]{0,80}\bma\b|, e non /i);
        assert.equal(speciesCount(p.index) > 0, cards[p.index].family !== 'barren', 'specie e famiglia ' + p.index);
    }
    assert.match(physicsText(planets[7], 6), /0,88 UA, periodo di 333 giorni/);
});

test('Navigazione: il ritorno all’area funziona anche per i sistemi oltre il venticinquesimo', () => {
    const n = new NavigationMemory();
    for (const id of [25, 27, 29]) { const unit = indicesForSystem(id)[2], s = { scene: 'orbit', selected: unit, system: id, yaw: 0, pitch: .4, distance: 20 }; n.move(s, 'system', { system: id }); assert.equal(s.system, id); assert.equal(s.selected, unit); }
});
