/**
 * Modelli matematici puri dei laboratori Mentat.
 * Le funzioni restituiscono numeri JavaScript: le approssimazioni numeriche sono
 * distinte dalle proprietà algebriche riportate nelle lezioni.
 */

function finite(value, label) {
  if (typeof value !== 'number' || !Number.isFinite(value)) {
    throw new TypeError(`${label} deve essere un numero finito.`);
  }
  return value;
}

export const BASE_FUNCTIONS = Object.freeze({
  quadratic: Object.freeze({ label: 'Parabola', formula: 'x²', evaluate: x => x * x }),
  absolute: Object.freeze({ label: 'Valore assoluto', formula: '|x|', evaluate: x => Math.abs(x) }),
  sine: Object.freeze({ label: 'Seno', formula: 'sin(x)', evaluate: x => Math.sin(x) }),
});

export function transformFunction(x, { base = 'quadratic', a = 1, b = 1, h = 0, k = 0 } = {}) {
  finite(x, 'x');
  for (const [label, value] of Object.entries({ a, b, h, k })) finite(value, label);
  if (!Object.hasOwn(BASE_FUNCTIONS, base)) throw new RangeError('Funzione di base sconosciuta.');
  return a * BASE_FUNCTIONS[base].evaluate(b * (x - h)) + k;
}

export function rectangleModel(perimeter, x) {
  finite(perimeter, 'Il perimetro');
  finite(x, 'Il lato');
  if (perimeter <= 0) throw new RangeError('Il perimetro deve essere positivo.');
  if (!(x > 0 && x < perimeter / 2)) {
    throw new RangeError('Il lato deve appartenere all’intervallo aperto (0, P/2).');
  }
  const y = perimeter / 2 - x;
  const optimalSide = perimeter / 4;
  return {
    perimeter, x, y,
    area: x * y,
    maxArea: perimeter * perimeter / 16,
    optimalSide,
    deficit: (x - optimalSide) ** 2,
  };
}

/** Restituisce null quando il radicando è fuori dal dominio reale. */
export function realNthRoot(value, index = 2) {
  finite(value, 'Il radicando');
  if (!Number.isInteger(index) || index < 2) throw new RangeError('L’indice deve essere un intero almeno pari a 2.');
  if (value < 0 && index % 2 === 0) return null;
  if (value === 0) return 0;
  return value < 0 ? -((-value) ** (1 / index)) : value ** (1 / index);
}

export function radicalValue(x, { index = 2, h = 0, mode = 'root' } = {}) {
  finite(x, 'x');
  finite(h, 'h');
  if (mode === 'square') return Math.abs(x - h);
  if (mode !== 'root') throw new RangeError('Modalità del radicale sconosciuta.');
  return realNthRoot(x - h, index);
}

/**
 * Risolve a*x + b*y = c; d*x + e*y = f.
 * I confronti usano una tolleranza relativa dichiarata, adatta ai parametri dei
 * laboratori. I risultati unique includono i residui delle due equazioni.
 */
export function solveLinearSystem(a, b, c, d, e, f, tolerance = 1e-12) {
  for (const [label, value] of Object.entries({ a, b, c, d, e, f, tolerance })) finite(value, label);
  if (tolerance < 0) throw new RangeError('La tolleranza non può essere negativa.');
  const determinant = a * e - b * d;
  const determinantScale = Math.max(Math.abs(a * e), Math.abs(b * d), Number.MIN_VALUE);
  const isZero = (value, scale = 1) => Math.abs(value) <= tolerance * Math.max(scale, Number.MIN_VALUE);
  if (!isZero(determinant, determinantScale)) {
    const x = (c * e - b * f) / determinant;
    const y = (a * f - c * d) / determinant;
    return { type: 'unique', determinant, x, y, residuals: [a * x + b * y - c, d * x + e * y - f] };
  }
  const row1Zero = a === 0 && b === 0;
  const row2Zero = d === 0 && e === 0;
  if ((row1Zero && c !== 0) || (row2Zero && f !== 0)) return { type: 'none', determinant };
  if (row1Zero || row2Zero) return { type: 'infinite', determinant };
  const cross1 = a * f - c * d;
  const cross2 = b * f - c * e;
  const consistent = isZero(cross1, Math.max(Math.abs(a * f), Math.abs(c * d)))
    && isZero(cross2, Math.max(Math.abs(b * f), Math.abs(c * e)));
  return { type: consistent ? 'infinite' : 'none', determinant };
}

export function intersectLines(m1, q1, m2, q2) {
  return solveLinearSystem(-m1, 1, q1, -m2, 1, q2);
}

export function exponentialReserve(initial, lossRate, time) {
  for (const [label, value] of Object.entries({ initial, lossRate, time })) finite(value, label);
  if (initial <= 0) throw new RangeError('La riserva iniziale deve essere positiva.');
  if (!(lossRate > 0 && lossRate < 1)) throw new RangeError('La frazione persa deve appartenere a (0, 1).');
  if (time < 0) throw new RangeError('Il tempo non può essere negativo.');
  return initial * Math.exp(time * Math.log1p(-lossRate));
}

export function halfLife(lossRate) {
  finite(lossRate, 'La frazione persa');
  if (!(lossRate > 0 && lossRate < 1)) throw new RangeError('La frazione persa deve appartenere a (0, 1).');
  return Math.log(0.5) / Math.log1p(-lossRate);
}

export function firstHalfLifePeriod(lossRate) {
  const time = halfLife(lossRate);
  // Evita di passare all’intero successivo per il solo arrotondamento di un
  // valore che, alla precisione di macchina, coincide con un intero.
  const nearest = Math.round(time);
  return Math.abs(time - nearest) <= 8 * Number.EPSILON * Math.max(1, time) ? nearest : Math.ceil(time);
}

/** Un denominatore nullo resta escluso anche dopo una cancellazione. */
export function rationalValue(x, a, b, c) {
  for (const [label, value] of Object.entries({ x, a, b, c })) finite(value, label);
  if (x === c) return null;
  return ((x - a) * (x - b)) / (x - c);
}

export function rationalSignAnalysis(a, b, c) {
  for (const [label, value] of Object.entries({ a, b, c })) finite(value, label);
  const values = [...new Set([a, b, c])].sort((x, y) => x - y);
  const boundaries = [-Infinity, ...values, Infinity];
  const intervals = boundaries.slice(0, -1).map((left, i) => {
    const right = boundaries[i + 1];
    const sample = left === -Infinity ? right - Math.max(1, Math.abs(right) * 0.1)
      : right === Infinity ? left + Math.max(1, Math.abs(left) * 0.1)
        : left + (right - left) / 2;
    return { left, right, sample, sign: Math.sign(rationalValue(sample, a, b, c)) };
  });
  const removable = c === a || c === b;
  const holeValue = removable ? (c === a ? c - b : c - a) : null;
  return {
    zeros: [...new Set([a, b])].filter(x => x !== c).sort((x, y) => x - y),
    excluded: c,
    removable,
    holeValue,
    intervals,
    points: values.map(x => ({ x, excluded: x === c, zero: x !== c && (x === a || x === b), multiplicity: Number(x === a) + Number(x === b) })),
  };
}

export function niceTicks(min, max, target = 6) {
  finite(min, 'Il minimo');
  finite(max, 'Il massimo');
  if (!(max > min)) throw new RangeError('La finestra deve avere ampiezza positiva.');
  const rough = (max - min) / Math.max(2, target);
  const power = 10 ** Math.floor(Math.log10(rough));
  const fraction = rough / power;
  const step = (fraction <= 1 ? 1 : fraction <= 2 ? 2 : fraction <= 5 ? 5 : 10) * power;
  const ticks = [];
  for (let value = Math.ceil(min / step) * step; value <= max + step * 1e-10; value += step) {
    ticks.push(Math.abs(value) < step * 1e-10 ? 0 : Number(value.toPrecision(12)));
    if (ticks.length > 100) break;
  }
  return ticks;
}
