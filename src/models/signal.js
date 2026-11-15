/** Synthetic teaching signal. No astronomical observations or physical sensor model. */
export const DOMAIN = Object.freeze([0, 10]);
export const PARAMETER_LIMITS = Object.freeze({a: [0, 2], b: [0, 5], h: [0, 10]});
export const SIGNAL_DEFAULTS = Object.freeze({model: 'linear', a: 1, b: 1, h: 5});
export const REFERENCE_SIGNAL = Object.freeze({model: 'quadratic', a: 0.25, b: 1, h: 5});

export function validParameters(p) {
    return !!p && ['linear', 'quadratic'].includes(p.model) &&
        Object.entries(PARAMETER_LIMITS).every(([key, [min, max]]) =>
            typeof p[key] === 'number' && Number.isFinite(p[key]) && p[key] >= min && p[key] <= max);
}
export function signalValue(p, t) {
    if (!validParameters(p) || !Number.isFinite(t) || t < DOMAIN[0] || t > DOMAIN[1])
        throw new RangeError('Parametri o tempo fuori dal dominio del laboratorio.');
    return p.model === 'linear' ? p.a * t + p.b : p.a * (t - p.h) ** 2 + p.b;
}
export function parameterKey(p) {
    if (!validParameters(p)) throw new TypeError('Parametri non validi');
    // h is irrelevant to a line; a=0 describes the same constant in both families.
    return p.a === 0 ? `constant:${p.b}` : `${p.model}:${p.a}:${p.b}:${p.model === 'quadratic' ? p.h : ''}`;
}
export function sampleSignal(p, count = 81) {
    if (!Number.isInteger(count) || count < 2 || count > 1001) throw new RangeError('Campionamento non valido');
    return Array.from({length: count}, (_, i) => {
        const t = DOMAIN[0] + (DOMAIN[1] - DOMAIN[0]) * i / (count - 1);
        return {t, value: signalValue(p, t)};
    });
}
export const OBSERVATIONS = Object.freeze([0, 2, 4, 6, 8, 10].map(t =>
    Object.freeze({t, value: signalValue(REFERENCE_SIGNAL, t)})));
export function signalError(p) {
    return Math.sqrt(OBSERVATIONS.reduce((sum, point) => sum + (signalValue(p, point.t) - point.value) ** 2, 0) / OBSERVATIONS.length);
}
export function signalTrend(p) {
    const difference = signalValue(p, 4) - signalValue(p, 2);
    return Math.abs(difference) < 1e-10 ? 'constant' : difference > 0 ? 'increases' : 'decreases';
}
export function signalRange(p) {
    const values = [signalValue(p, 0), signalValue(p, 10)];
    if (p.model === 'quadratic') values.push(signalValue(p, p.h));
    return [Math.min(...values), Math.max(...values)];
}
export function signalFormula(p) {
    const n = x => Number(x.toFixed(3)).toLocaleString('it-IT');
    return p.model === 'linear' ? `I(t) = ${n(p.a)} t + ${n(p.b)}` : `I(t) = ${n(p.a)} (t − ${n(p.h)})² + ${n(p.b)}`;
}
