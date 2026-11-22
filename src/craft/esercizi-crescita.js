/** Exercises on growth and replication (1.55.0): the Sciame is a population. Its drones could multiply like a
 * microbial culture in exponential phase; its waves grow by a fixed amount per incursion; the free drones of a
 * system stop at a capacity, as a population at the carrying capacity of its medium; the keys lose strength at
 * each use, as an antibiotic loses effect when bacteria become resistant; and the weights of the arms grow by a
 * fixed percentage. For «Crescita delle popolazioni microbiche» (biology-21), with the numbers of the frontier at
 * the moment the exercises are opened; every answer is computed from the numbers shown. */
import { seededRandom, DISCIPLINE_NAMES } from '../scene/layout.js';
import { AREAS } from '../scene/systems.js';
import { SWARM } from './swarm.js';
import { dec, options } from './esercizi.js';

export const GROWTH_UNITS = Object.freeze(['biology-21']);
/** Doubling time of the drones in the first exercise (s), growth per incursion of the exponential comparison,
 * intrinsic rate of the logistic model (per minute). */
export const DOUBLING = 12, PER_RAID = .1, RATE = .2;
const log2 = v => Math.log(v) / Math.LN2;
const uses = n => n === 1 ? '1 uso' : `${n} usi`, times = n => n === 1 ? '1 conversione' : `${n} conversioni`;

/** The exercises for the state of the frontier `F`; `seed` fixes the choices and the order of the options. */
export function growthExercises(F, seed = 1) {
    const R = seededRandom(seed * 5021 + F.count * 41 + 7), out = [], fc = F.forecast(), [lo, hi] = fc[0].wave, N = hi;
    // 1. Replication: from one drone to the wave, doubling every DOUBLING seconds.
    if (N >= 4) {
        const g = log2(N), t = DOUBLING * g;
        const o = options(R, t, [DOUBLING * N, DOUBLING * N / 2, DOUBLING * Math.log(N), DOUBLING * Math.log10(N), DOUBLING * (N - 1) / 2], v => dec(v, 1) + ' s');
        if (o) out.push({ id: 'raddoppio', unit: 'biology-21', title: 'Tempo di replicazione', ...o,
            prompt: `I droni dello Sciame sono sonde che si replicano con la materia degli asteroidi. Supponiamo che l'ondata nasca da un solo drone e che ogni drone costruisca una copia di sé ogni ${DOUBLING} s, come una coltura di batteri in fase esponenziale. Dopo quanto tempo i droni sono ${N}, l'ondata massima prevista dal Rapporto?`,
            steps: [`In fase esponenziale N = 2^(t / g), con g = ${DOUBLING} s il tempo di generazione.`, `Servono log₂ ${N} = ${dec(g, 3)} generazioni.`, `t = ${DOUBLING} · ${dec(g, 3)} = ${dec(t, 1)} s.`, `Una crescita per raddoppi arriva in fretta a numeri grandi: con un drone nuovo ogni ${DOUBLING} s, uno alla volta, servirebbero ${dec(DOUBLING * (N - 1), 0)} s.`] });
    }
    // 2. Linear and exponential growth of the wave, from the mean wave of the Rapporto.
    {
        const N0 = (lo + hi) / 2, k = 10, exp = N0 * (1 + PER_RAID) ** k, lin = N0 + SWARM.rise * k;
        const o = options(R, exp, [N0 * (1 + PER_RAID * k), N0 * (1 + PER_RAID) * k, lin, N0 * (1 + PER_RAID / 10) ** k, N0 * 2 ** (PER_RAID * k)], v => dec(v, 1));
        if (o) out.push({ id: 'esponenziale', unit: 'biology-21', title: 'Lineare o esponenziale', ...o,
            prompt: `L'ondata media prevista dal Rapporto è di ${dec(N0, 1)} droni, e nel modello cresce di ${dec(SWARM.rise, 1)} droni a ogni incursione, una crescita lineare. Se invece crescesse del ${Math.round(PER_RAID * 100)} % a ogni incursione, come una popolazione in fase esponenziale, quanti droni avrebbe dopo ${k} incursioni?`,
            steps: [`Crescita esponenziale: N = N₀ · (1 + r)^k = ${dec(N0, 1)} · ${dec(1 + PER_RAID, 1)}^${k}.`, `${dec(1 + PER_RAID, 1)}^${k} = ${dec((1 + PER_RAID) ** k, 4)}, quindi N = ${dec(exp, 1)}.`, `Con la crescita lineare del modello sarebbero ${dec(N0, 1)} + ${dec(SWARM.rise, 1)} · ${k} = ${dec(lin, 1)}: all'inizio le due crescite si somigliano, poi l'esponenziale prende il largo.`] });
    }
    // 3. Logistic growth of the free drones of a system, with the capacity of 40 per system.
    const free = [...F.freed.entries()].filter(([, n]) => n > 0 && n < SWARM.freedCap).sort((a, b) => b[1] - a[1])[0];
    if (free) {
        const [sys, n] = free, K = SWARM.freedCap, v = RATE * n * (1 - n / K);
        const o = options(R, v, [RATE * n, RATE * n * (n / K), RATE * (K - n), RATE * n * (1 - K / n), RATE * K / 4].filter(x => x > 0), x => dec(x, 2));
        if (o) out.push({ id: 'logistica', unit: 'biology-21', title: 'Crescita logistica', ...o,
            prompt: `Nel sistema ${AREAS[sys].name} ci sono ${n} droni liberati, e un sistema ne ospita al più ${K}. Supponiamo che crescano secondo il modello logistico dN/dt = r · N · (1 − N / K), con r = ${dec(RATE, 1)} al minuto e K = ${K}, come una popolazione che si avvicina alla capacità del suo ambiente. Quanti droni al minuto si aggiungono in questo momento?`,
            steps: [`dN/dt = ${dec(RATE, 1)} · ${n} · (1 − ${n} / ${K}).`, `1 − ${n} / ${K} = ${dec(1 - n / K, 3)}, quindi dN/dt = ${dec(v, 2)} droni al minuto.`, `La crescita è più veloce a metà della capacità, N = ${K / 2}, e rallenta fino a fermarsi vicino a K: è la fase stazionaria di una coltura.`] });
    }
    // 4. Resistance: the key loses 15 % of its strength at each use and stops working below 0.15.
    const key = F.keys.at(-1);
    if (key && key.strength >= SWARM.key.obsolete) {
        const s = Math.round(key.strength * 100) / 100, f = SWARM.key.decay, exact = Math.log(SWARM.key.obsolete / s) / Math.log(f), n = Math.max(1, Math.floor(exact) + 1);
        const lin = Math.max(1, Math.ceil((s - SWARM.key.obsolete) / (s * (1 - f))));
        const pool = [n - 1, n + 1, lin, Math.round(exact), n + 2, Math.ceil(s / (1 - f))].filter(x => x >= 1 && x !== n);
        const o = options(R, n, pool, uses);
        if (o) out.push({ id: 'resistenza', unit: 'biology-21', title: 'Resistenza alla chiave', ...o,
            prompt: `La chiave ${key.version} ha forza ${dec(s, 2)}. A ogni uso lo Sciame cambia protocollo e la forza diventa ${dec(f, 2)} volte quella di prima, come un antibiotico che perde effetto quando i batteri diventano resistenti; sotto ${dec(SWARM.key.obsolete, 2)} la chiave smette di funzionare. Dopo quanti usi smette di funzionare?`,
            steps: [`Dopo n usi la forza vale ${dec(s, 2)} · ${dec(f, 2)}ⁿ: serve ${dec(f, 2)}ⁿ < ${dec(SWARM.key.obsolete, 2)} / ${dec(s, 2)} = ${dec(SWARM.key.obsolete / s, 3)}.`, `n > ln ${dec(SWARM.key.obsolete / s, 3)} / ln ${dec(f, 2)} = ${dec(exact, 2)}, quindi n = ${n}.`, 'Il calo è esponenziale: ogni uso toglie il 15 % di quel che resta, e la forza perde sempre meno in valore assoluto.'] });
    }
    // 5. Discrete growth of a weight: +35 % per conversion, up to the maximum of 4.
    {
        const k = F.weights.indexOf(Math.min(...F.weights)), w = Math.round(F.weights[k] * 100) / 100, g = SWARM.learn.win, M = SWARM.learn.max;
        if (w > 0 && w < M / g) {
            const exact = Math.log(M / w) / Math.log(g), n = Math.ceil(exact - 1e-9), lin = Math.ceil((M - w) / (w * (g - 1)));
            const pool = [n - 1, n + 1, lin, Math.round(M / w), Math.ceil((M - w) / (g - 1)), n + 2].filter(x => x >= 1 && x !== n);
            const o = options(R, n, pool, times);
            if (o) out.push({ id: 'peso', unit: 'biology-21', title: 'Crescita percentuale', ...o,
                prompt: `Il braccio della ${DISCIPLINE_NAMES[k]} ha per lo Sciame il peso ${dec(w, 2)}. A ogni conversione riuscita su quel braccio il peso cresce del ${Math.round((g - 1) * 100)} %, fino al massimo di ${M}. Quante conversioni consecutive servono per raggiungere il massimo?`,
                steps: [`Dopo n conversioni il peso vale ${dec(w, 2)} · ${dec(g, 2)}ⁿ: serve ${dec(g, 2)}ⁿ ≥ ${M} / ${dec(w, 2)} = ${dec(M / w, 3)}.`, `n ≥ ln ${dec(M / w, 3)} / ln ${dec(g, 2)} = ${dec(exact, 2)}, quindi n = ${n}.`, 'Una crescita percentuale costante è esponenziale: come una coltura che cresce di una frazione fissa a ogni generazione.'] });
        }
    }
    return out;
}
