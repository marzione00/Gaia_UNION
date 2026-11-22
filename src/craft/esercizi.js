/** Exercises on the Rapporto (1.52.0): questions of probability and statistics written with the numbers of the
 * Sciame della Frontiera at the moment they are asked, for the units «Combinatoria, probabilità e statistica»
 * (math-c10) and «Probabilità, informazione e fenomeni collettivi» (math-p07). Every number in a question is
 * shown rounded and every answer is computed from the rounded numbers, so the student can redo each step.
 * The wrong options come from common mistakes. */
import { seededRandom, DISCIPLINE_NAMES } from '../scene/layout.js';

export const EXERCISE_UNITS = Object.freeze(['math-c10', 'math-p07']);
const dec = (v, k = 2) => v.toFixed(k).replace('.', ',').replace(/^-(0,0*)$/, '$1');
const pct = (v, k = 1) => dec(v * 100, k) + ' %';
const round = (v, k) => Math.round(v * 10 ** k) / 10 ** k;
const arm = k => 'della ' + DISCIPLINE_NAMES[k];
/** Percentages with one decimal that add up to exactly 100 (largest remainder). */
function shares(values) {
    const total = values.reduce((a, b) => a + b, 0), raw = values.map(v => v / total * 1000), base = raw.map(Math.floor);
    let left = 1000 - base.reduce((a, b) => a + b, 0);
    raw.map((v, i) => [v - base[i], i]).sort((a, b) => b[0] - a[0]).forEach(([, i]) => { if (left > 0) { base[i]++; left--; } });
    return base.map(v => v / 1000);
}
/** Four options: the answer and three mistakes, distinct once written, in an order fixed by the random source. */
function options(R, answer, mistakes, write) {
    const seen = new Set([write(answer)]), wrong = [];
    for (const m of mistakes) { if (wrong.length === 3 || !Number.isFinite(m)) continue; const t = write(m); if (!seen.has(t)) { seen.add(t); wrong.push(t); } }
    if (wrong.length < 3) return null;
    const list = [write(answer), ...wrong].map((t, i) => [t, i, R()]).sort((a, b) => a[2] - b[2]);
    return { options: list.map(x => x[0]), correct: list.findIndex(x => x[1] === 0) };
}

/** The exercises for the state of the frontier `F`; `seed` fixes which arm is asked and the order of the options. */
export function exercises(F, seed = 1) {
    const R = seededRandom(seed * 7919 + F.count * 31 + 5), out = [], fc = F.forecast(), w = F.weights.map(v => round(v, 2)), S = round(w.reduce((a, b) => a + b, 0), 2);
    // 1. Probability from the weights.
    {
        const k = Math.floor(R() * 4), p = w[k] / S, o = options(R, p, [.25, w[k] / (S - w[k]), w[k] / 4, (S - w[k]) / S, w[k] / Math.max(...w), .5].filter(v => v <= 1), v => pct(v));
        if (o) out.push({ id: 'probabilita', unit: 'math-c10', title: 'Probabilità dai pesi', ...o,
            prompt: `Lo Sciame sceglie il braccio della prossima incursione con probabilità proporzionale al peso di ciascun braccio. I pesi sono ${w.map((v, i) => DISCIPLINE_NAMES[i] + ' ' + dec(v)).join(', ')}. Con quale probabilità la prossima incursione colpisce il braccio ${arm(k)}?`,
            steps: [`Somma dei pesi: ${w.map(v => dec(v)).join(' + ')} = ${dec(S)}.`, `Probabilità del braccio ${arm(k)}: ${dec(w[k])} / ${dec(S)} = ${dec(p, 4)}, cioè ${pct(p)}.`, 'Le quattro probabilità sommano a 1, perché i pesi sono stati divisi per la loro somma.'] });
    }
    // 2. Expected size of the wave, for a uniform distribution on consecutive integers.
    const [lo, hi] = fc[0].wave;
    if (hi > lo) {
        const m = (lo + hi) / 2, o = options(R, m, [hi - lo + 1, lo + hi, hi - lo, hi, lo], v => dec(v, 1));
        if (o) out.push({ id: 'onda', unit: 'math-c10', title: 'Valore atteso dell’ondata', ...o,
            prompt: `Il Rapporto prevede per la prossima incursione un'ondata fra ${lo} e ${hi} droni. Se tutti i numeri interi fra ${lo} e ${hi} fossero ugualmente probabili, quale sarebbe il numero atteso di droni?`,
            steps: [`I valori possibili sono ${hi} − ${lo} + 1 = ${hi - lo + 1}, ciascuno con probabilità 1/${hi - lo + 1}.`, `Il valore atteso è la somma dei valori per le loro probabilità; per interi consecutivi equiprobabili coincide con la media degli estremi: (${lo} + ${hi}) / 2 = ${dec(m, 1)}.`] });
    }
    // 3. Total probability of a repulse, whatever arm is struck.
    {
        const p = shares(fc.map(f => f.p)), r = fc.map(f => Math.round(f.repel * 100) / 100), total = p.reduce((a, v, i) => a + v * r[i], 0), top = p.indexOf(Math.max(...p));
        const o = options(R, total, [r.reduce((a, b) => a + b, 0) / 4, r[top], Math.max(...r), p[top] * r[top], 1 - total], v => pct(v));
        if (o && new Set(r).size > 1) out.push({ id: 'totale', unit: 'math-p07', title: 'Probabilità totale', ...o,
            prompt: `Per ogni braccio il Rapporto dà la probabilità di essere colpito e la probabilità che l'incursione sia respinta: ${fc.map((f, i) => `${DISCIPLINE_NAMES[i]} ${pct(p[i])} e ${pct(r[i], 0)}`).join('; ')}. Qual è la probabilità che la prossima incursione sia respinta, qualunque braccio colpisca?`,
            steps: ['Per il teorema della probabilità totale, P(respinta) è la somma su tutti i bracci di P(braccio) · P(respinta | braccio).', `${p.map((v, i) => dec(v, 3) + ' · ' + dec(r[i])).join(' + ')} = ${dec(total, 4)}, cioè ${pct(total)}.`, 'La semplice media delle quattro probabilità di respingere tratterebbe i bracci come ugualmente probabili.'] });
    }
    const past = F.record.filter(x => x.forecast);
    // 4. Brier score of the last forecasts of repulse.
    if (past.length >= 3) {
        const last = past.slice(-5), p = last.map(x => Math.round(x.forecast.repel * 100) / 100), o1 = last.map(x => x.outcome === 'respinta' ? 1 : 0), sq = p.map((v, i) => round((v - o1[i]) ** 2, 4));
        const brier = sq.reduce((a, b) => a + b, 0) / last.length, mae = p.reduce((a, v, i) => a + Math.abs(v - o1[i]), 0) / last.length, mean = (a) => a.reduce((x, y) => x + y, 0) / a.length;
        const o = options(R, brier, [mae, sq.reduce((a, b) => a + b, 0), (mean(p) - mean(o1)) ** 2, p.reduce((a, v, i) => a + (v - (1 - o1[i])) ** 2, 0) / last.length], v => dec(v, 3));
        if (o) out.push({ id: 'brier', unit: 'math-c10', title: 'Punteggio di Brier', ...o,
            prompt: `Le ultime ${last.length} incursioni avevano queste probabilità previste di essere respinte, seguite dall'esito: ${last.map((x, i) => `${pct(p[i], 0)}, ${x.outcome === 'respinta' ? 'respinta' : 'conversione'}`).join('; ')}. Calcola il punteggio di Brier, la media dei quadrati delle differenze fra probabilità prevista ed esito, con esito 1 per un'incursione respinta e 0 per una conversione.`,
            steps: [p.map((v, i) => `(${dec(v)} − ${o1[i]})² = ${dec(sq[i], 4)}`).join('; ') + '.', `Media: ${dec(sq.reduce((a, b) => a + b, 0), 4)} / ${last.length} = ${dec(brier, 3)}.`, 'Il punteggio vale 0 per previsioni perfette e 0,25 per chi prevede sempre il 50 %; più è basso, meglio le previsioni descrivono gli esiti.'] });
    }
    // 5. How far the hits of the most likely arm are from their expectation, in standard deviations.
    if (past.length >= 8) {
        const last = past.slice(-20), T = last.filter(x => x.forecast.top).length, mu = round(last.reduce((a, x) => a + x.forecast.max, 0), 2), V = round(last.reduce((a, x) => a + x.forecast.max * (1 - x.forecast.max), 0), 2);
        if (V > 0) {
            const sd = Math.sqrt(V), z = (T - mu) / sd, o = options(R, z, [(T - mu) / V, T - mu, (T - mu) / last.length, (T - mu) / Math.sqrt(last.length), -z], v => dec(v));
            if (o) out.push({ id: 'scarto', unit: 'math-p07', title: 'Scarto dalla previsione', ...o,
                prompt: `In ${last.length} incursioni il braccio più probabile, o uno dei più probabili a pari merito, è stato colpito ${T} volte. Le probabilità che lo fosse, sommate sulle ${last.length} incursioni, danno ${dec(mu)}; la somma dei prodotti p · (1 − p) dà ${dec(V)}. Di quante deviazioni standard il numero osservato si scosta da quello atteso?`,
                steps: [`Trattando le incursioni come prove indipendenti, ciascuna con la sua probabilità, il numero di volte ha valore atteso ${dec(mu)} e varianza ${dec(V)}.`, `Deviazione standard: √${dec(V)} = ${dec(sd, 3)}.`, `Scarto: (${T} − ${dec(mu)}) / ${dec(sd, 3)} = ${dec(z)}.`, 'Uno scarto entro circa 2 deviazioni standard, in valore assoluto, è compatibile con il caso: la previsione regge.'] });
        }
    }
    return out;
}
