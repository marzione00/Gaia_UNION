/** Exercises on energy and information (1.54.0): the drones of the Sciame turn matter into computation, and
 * computation has a thermodynamic price. Landauer's principle sets the least energy needed to erase one bit,
 * k·T·ln 2, so the temperatures of the planets on the front (src/worlds/planet-physics.js) decide how much the
 * Sciame can compute; a fusion plant turns heat into work within the Carnot limit; and the forecasts of the
 * Rapporto carry an amount of information, in bits. For «Termodinamica e rendimento» (physics-20) and
 * «Probabilità, informazione e fenomeni collettivi» (math-p07). Every answer is computed from the numbers shown. */
import { seededRandom, DISCIPLINE_NAMES } from '../scene/layout.js';
import { AREAS, indicesForSystem } from '../scene/systems.js';
import { planetPhysics } from '../worlds/planet-physics.js';
import { CRAFT } from './registry.js';
import { dec, options } from './esercizi.js';

export const ENERGY_UNITS = Object.freeze(['physics-20', 'math-p07']);
/** Constants as the questions write them: Boltzmann's constant (J/K), ln 2, and the hot side of the plants (K). */
export const K_B = 1.381e-23, LN2 = .693, HOT = 1000;
const pct = (v, k = 1) => dec(v * 100, k) + ' %';
/** A multiple of 10⁻²¹ J, the scale of the energy of one bit at these temperatures. */
const zj = v => dec(v / 1e-21, 2) + ' × 10⁻²¹ J';
const log2 = v => Math.log(v) / Math.LN2;
/** Probabilities with three decimals that add up to exactly 1 (largest remainder). */
function shares(values) {
    const total = values.reduce((a, b) => a + b, 0), raw = values.map(v => v / total * 1000), base = raw.map(Math.floor);
    let left = 1000 - base.reduce((a, b) => a + b, 0);
    raw.map((v, i) => [v - base[i], i]).sort((a, b) => b[0] - a[0]).forEach(([, i]) => { if (left > 0) { base[i]++; left--; } });
    return base.map(v => v / 1000);
}

/** The exercises for the state of the frontier `F`; `seed` fixes the choices and the order of the options. */
export function energyExercises(F, seed = 1, planets = planetPhysics()) {
    const R = seededRandom(seed * 6151 + F.count * 37 + 11), out = [], fc = F.forecast(), p = shares(fc.map(f => f.p)), top = p.indexOf(Math.max(...p)), sys = fc[top].system, area = AREAS[sys].name;
    const worlds = indicesForSystem(sys).map(i => planets[i]).sort((a, b) => a.teq - b.teq), cold = worlds[0], hot = worlds.at(-1);
    const T = w => Math.round(w.teq), signed = v => dec(v, 3).replace(/^-/, '−');
    // 1. Landauer's limit at the temperature of a station in the orbit of a planet of the front.
    {
        const w = worlds[Math.floor(R() * worlds.length)], t = T(w), E = K_B * t * LN2;
        const o = options(R, E, [K_B * t, K_B * t / LN2, K_B * t * Math.log10(2), K_B * (t - 273) * LN2, K_B * t * 2], zj);
        if (o) out.push({ id: 'landauer', unit: 'physics-20', title: 'Limite di Landauer', ...o,
            prompt: `I droni dello Sciame trasformano la materia in calcolo, e ogni bit cancellato costa almeno k · T · ln 2, il limite di Landauer. Il prossimo bersaglio più probabile è il sistema ${area}, dove un pianeta ha una temperatura di equilibrio di circa ${t} K; supponiamo che una stazione nella sua orbita stia alla stessa temperatura. Con k = 1,381 × 10⁻²³ J/K e ln 2 = 0,693, qual è l'energia minima per cancellare un bit a quella temperatura?`,
            steps: [`E = k · T · ln 2 = 1,381 × 10⁻²³ · ${t} · 0,693.`, `Il prodotto vale ${zj(E)}.`, 'La temperatura va in kelvin; senza il fattore ln 2 si otterrebbe l\'energia termica tipica k · T, più grande del limite.'] });
    }
    // 2. Why the cold pays: at equal energy the bits erased scale as 1/T.
    if (T(hot) > T(cold)) {
        const r = T(hot) / T(cold);
        const o = options(R, r, [T(cold) / T(hot), (T(hot) - T(cold)) / T(cold), Math.sqrt(r), r ** 4, r ** 2], v => dec(v, 2));
        if (o) out.push({ id: 'freddo', unit: 'physics-20', title: 'Il freddo conviene', ...o,
            prompt: `Nel sistema ${area} il pianeta più caldo ha una temperatura di equilibrio di circa ${T(hot)} K, il più freddo di circa ${T(cold)} K; supponiamo che le stazioni nelle loro orbite stiano alle stesse temperature. Con la stessa energia, quante volte più bit può cancellare un drone nell'orbita fredda rispetto a uno nell'orbita calda, al limite di Landauer?`,
            steps: ['Con energia E si cancellano al più E / (k · T · ln 2) bit: il numero è inversamente proporzionale alla temperatura.', `Il rapporto vale ${T(hot)} / ${T(cold)} = ${dec(r, 2)}.`, 'Per questo un sistema che calcola ha interesse a stare al freddo, lontano dalla stella.'] });
    }
    // 3. Carnot's limit of a fusion plant whose radiators sit at the temperature of its orbit.
    {
        const plant = CRAFT.find(e => e.system === sys && (e.works || e.type) === 'centrale'), w = worlds[Math.floor(R() * worlds.length)], tc = T(w), eta = 1 - tc / HOT;
        const o = options(R, eta, [tc / HOT, (HOT - tc) / (HOT + tc), 1 - (tc / HOT) ** 2, (HOT - tc) / tc / 10, .5 * eta].filter(v => v > 0 && v < 1), v => pct(v));
        if (o) out.push({ id: 'carnot', unit: 'physics-20', title: 'Rendimento di Carnot', ...o,
            prompt: `${plant ? plant.name + ', la centrale a fusione del sistema ' + area + ',' : 'Una centrale a fusione del sistema ' + area} trasforma in lavoro il calore di una camera a ${HOT} K e cede il resto con radiatori alla temperatura di equilibrio della sua orbita, circa ${tc} K. Qual è il rendimento massimo possibile, quello di una macchina di Carnot fra queste due temperature?`,
            steps: [`η = 1 − T_fredda / T_calda = 1 − ${tc} / ${HOT}.`, `${tc} / ${HOT} = ${dec(tc / HOT, 3)}, quindi η = ${dec(eta, 3)}, cioè ${pct(eta)}.`, 'Nessuna macchina termica fra le stesse temperature fa meglio; radiatori più freddi alzano il limite.'] });
    }
    // 4. Entropy of the choice of the Sciame, from the forecast of the Rapporto.
    {
        const H = -p.reduce((a, v) => a + (v > 0 ? v * log2(v) : 0), 0);
        const o = options(R, H, [2, -log2(p[top]), -p.reduce((a, v) => a + (v > 0 ? v * Math.log(v) : 0), 0), p.reduce((a, v) => a + (v > 0 ? -log2(v) : 0), 0) / 4, 1 - p.reduce((a, v) => a + v * v, 0), 4, 1], v => dec(v, 2) + ' bit');
        if (o) out.push({ id: 'entropia', unit: 'math-p07', title: 'Entropia della previsione', ...o,
            prompt: `Il Rapporto dà alla prossima incursione queste probabilità per braccio: ${p.map((v, i) => `${DISCIPLINE_NAMES[i]} ${dec(v, 3)}`).join(', ')}. Quanta informazione porta in media sapere quale braccio sarà colpito, cioè l'entropia di Shannon H = −Σ p · log₂ p?`,
            steps: [p.map(v => `${dec(v, 3)} · log₂ ${dec(v, 3)} = ${signed(v > 0 ? v * log2(v) : 0)}`).join('; ') + '.', `H = ${dec(H, 2)} bit, contro i 2 bit di quattro bracci equiprobabili.`, 'Più lo Sciame si concentra su un braccio, meno informazione porta la notizia del bersaglio: l\'entropia misura l\'incertezza della previsione.'] });
    }
    // 5. Surprise of the last incursion, from the probability the Rapporto gave to the arm it struck.
    const last = F.record.filter(x => x.forecast).at(-1);
    if (last && last.forecast.p > 0 && last.forecast.p < 1) {
        const q = Math.round(last.forecast.p * 1000) / 1000, I = -log2(q);
        const o = options(R, I, [-Math.log(q), -Math.log10(q), 1 / q, 1 - q, -log2(1 - q), q * I], v => dec(v, 2) + ' bit');
        if (o) out.push({ id: 'sorpresa', unit: 'math-p07', title: 'Sorpresa di un\'incursione', ...o,
            prompt: `L'ultima incursione ha colpito il braccio della ${DISCIPLINE_NAMES[last.arm]}, a cui il Rapporto dava probabilità ${dec(q, 3)}. Quanti bit di informazione, o di sorpresa, ha portato la notizia, con I = −log₂ p?`,
            steps: [`I = −log₂ ${dec(q, 3)} = ${dec(I, 2)} bit.`, 'Un evento probabile porta poca informazione, uno improbabile molta; la media della sorpresa sui bracci possibili è l\'entropia.'] });
    }
    return out;
}
