import test from 'node:test';
import assert from 'node:assert/strict';
import {
  transformFunction, rectangleModel, realNthRoot, radicalValue,
  solveLinearSystem, intersectLines, exponentialReserve, halfLife,
  firstHalfLifePeriod, rationalValue, rationalSignAnalysis, niceTicks,
} from '../src/models/math.js';

const close = (actual, expected, tolerance = 1e-10) => assert.ok(Math.abs(actual - expected) <= tolerance * Math.max(1, Math.abs(expected)), `${actual} ≠ ${expected}`);

test('Trasformazioni: un punto (u,g(u)) va in (h+u/b,a*g(u)+k)', () => {
  const state = { base: 'quadratic', a: -2, b: -0.5, h: 3, k: 4 };
  for (const u of [-3, -1, 0, 1, 4]) close(transformFunction(state.h + u / state.b, state), state.a * u ** 2 + state.k);
});

test('Trasformazioni degeneri e periodicità', () => {
  close(transformFunction(100, { base: 'sine', a: 2, b: 0, h: -4, k: 3 }), 3);
  close(transformFunction(2, { base: 'absolute', a: 0, b: 1, h: 0, k: 7 }), 7);
  close(transformFunction(0.3 + 2 * Math.PI / 3, { base: 'sine', b: 3 }), transformFunction(0.3, { base: 'sine', b: 3 }));
  assert.throws(() => transformFunction(1, { base: 'constructor' }), RangeError);
});

test('Rettangolo: perimetro, simmetria, deficit e massimo analitico', () => {
  for (const perimeter of [20, 80, 160]) {
    const optimum = rectangleModel(perimeter, perimeter / 4);
    close(optimum.maxArea, perimeter ** 2 / 16);
    close(optimum.area, optimum.maxArea);
    for (const fraction of [0.01, 0.1, 0.3, 0.8, 0.99]) {
      const model = rectangleModel(perimeter, (perimeter / 2) * fraction);
      close(2 * (model.x + model.y), perimeter);
      close(model.area + model.deficit, model.maxArea);
      close(rectangleModel(perimeter, model.y).area, model.area);
    }
  }
  assert.throws(() => rectangleModel(80, 0), RangeError);
  assert.throws(() => rectangleModel(80, 40), RangeError);
  assert.throws(() => rectangleModel(-1, 1), RangeError);
});

test('Radicali reali: indice pari, indice dispari e valore assoluto', () => {
  assert.equal(realNthRoot(-16, 2), null);
  close(realNthRoot(-27, 3), -3);
  close(realNthRoot(-32, 5), -2);
  close(realNthRoot(81, 4), 3);
  assert.equal(realNthRoot(0, 2), 0);
  assert.equal(radicalValue(-3, { h: 1, mode: 'square' }), 4);
  assert.equal(radicalValue(-3, { h: 1, index: 2, mode: 'root' }), null);
  assert.throws(() => realNthRoot(2, 2.5), RangeError);
});

test('Sistemi: soluzione unica, parallele, coincidenti e righe nulle', () => {
  const unique = solveLinearSystem(1, 1, 5, 1, -1, 1);
  assert.equal(unique.type, 'unique');
  close(unique.x, 3); close(unique.y, 2);
  unique.residuals.forEach(value => close(value, 0));
  assert.equal(intersectLines(1, 1, 1, 3).type, 'none');
  assert.equal(intersectLines(1, 1, 1, 1).type, 'infinite');
  assert.equal(solveLinearSystem(0, 0, 0, 0, 0, 0).type, 'infinite');
  assert.equal(solveLinearSystem(0, 0, 2, 1, 1, 3).type, 'none');
  assert.equal(solveLinearSystem(0, 0, 0, 1, 1, 3).type, 'infinite');
});

test('Sistemi: piccola differenza tra pendenze conserva una soluzione distante', () => {
  const result = intersectLines(1, 0, 1.0001, 1);
  assert.equal(result.type, 'unique');
  close(result.x, -10000, 1e-10);
  close(result.y, -10000, 1e-10);
  assert.equal(solveLinearSystem(1e-10, 0, 2e-10, 0, 1e-10, 3e-10).type, 'unique');
});

test('Riserva esponenziale: ricorrenza, semivita e primo periodo discreto', () => {
  for (const r of [0.01, 0.08, 0.2, 0.5, 0.99]) {
    close(exponentialReserve(1000, r, 0), 1000);
    close(exponentialReserve(1000, r, 4) / exponentialReserve(1000, r, 3), 1 - r);
    close(exponentialReserve(1000, r, halfLife(r)), 500);
    const n = firstHalfLifePeriod(r);
    assert.ok(exponentialReserve(1000, r, n) <= 500 + 1e-9);
    if (n > 0) assert.ok(exponentialReserve(1000, r, n - 1) > 500 - 1e-9);
  }
  assert.equal(firstHalfLifePeriod(0.5), 1);
  assert.throws(() => exponentialReserve(100, 0, 1), RangeError);
  assert.throws(() => exponentialReserve(100, 1, 1), RangeError);
  assert.throws(() => exponentialReserve(100, 0.1, -1), RangeError);
});

test('Tabella dei segni: intervalli, zeri e polo distinti', () => {
  const result = rationalSignAnalysis(-2, 2, 0);
  assert.deepEqual(result.zeros, [-2, 2]);
  assert.equal(result.removable, false);
  assert.deepEqual(result.intervals.map(x => x.sign), [-1, 1, -1, 1]);
  assert.equal(rationalValue(0, -2, 2, 0), null);
});

test('Cancellazione: il punto escluso non rientra nel dominio', () => {
  const single = rationalSignAnalysis(1, -2, 1);
  assert.equal(single.removable, true);
  assert.equal(single.holeValue, 3);
  assert.deepEqual(single.zeros, [-2]);
  assert.equal(rationalValue(1, 1, -2, 1), null);
  close(rationalValue(1 + 1e-6, 1, -2, 1), 3 + 1e-6);
  const double = rationalSignAnalysis(2, 2, 2);
  assert.equal(double.holeValue, 0);
  assert.deepEqual(double.zeros, []);
  assert.deepEqual(double.intervals.map(x => x.sign), [-1, 1]);
  const squared = rationalSignAnalysis(1, 1, -2);
  assert.deepEqual(squared.intervals.map(x => x.sign), [-1, 1, 1]);
});

test('Validazione ingressi e tacche della finestra grafica', () => {
  assert.throws(() => rectangleModel(Infinity, 2), TypeError);
  assert.throws(() => radicalValue(NaN), TypeError);
  assert.throws(() => intersectLines(1, 2, NaN, 3), TypeError);
  assert.throws(() => niceTicks(1, 1), RangeError);
  assert.deepEqual(niceTicks(-6, 6), [-6, -4, -2, 0, 2, 4, 6]);
});
