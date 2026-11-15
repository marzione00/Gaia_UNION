/** Interactive activities for the prototype units. Pure logic: no rendering, no network.
 * Each activity keeps a small, validated state and declares when it is complete. */
export const ACTIVITY_KINDS = Object.freeze(['vsepr', 'punnett', 'logic']);
export const ACTIVITY_GOALS = Object.freeze({ vsepr: 4, punnett: 3, logic: 6 });
const plain = x => !!x && typeof x === 'object' && !Array.isArray(x);
const ids = (list, allowed, max) => Array.isArray(list) ? [...new Set(list.filter(id => typeof id === 'string' && allowed.has(id)))].slice(0, max) : [];

// ---------- VSEPR: domains around one central atom ----------
const SHAPES = {
    '2,0': { electron: 'lineare', shape: 'lineare', angle: '180°', examples: 'CO₂, BeCl₂' },
    '3,0': { electron: 'trigonale planare', shape: 'trigonale planare', angle: '120°', examples: 'BF₃, SO₃' },
    '2,1': { electron: 'trigonale planare', shape: 'angolata', angle: 'meno di 120° (SO₂: circa 119°)', examples: 'SO₂, O₃' },
    '4,0': { electron: 'tetraedrica', shape: 'tetraedrica', angle: '109,5°', examples: 'CH₄, CCl₄' },
    '3,1': { electron: 'tetraedrica', shape: 'piramidale trigonale', angle: 'meno di 109,5° (NH₃: circa 107°)', examples: 'NH₃, PCl₃' },
    '2,2': { electron: 'tetraedrica', shape: 'angolata', angle: 'meno di 109,5° (H₂O: circa 104,5°)', examples: 'H₂O, H₂S' },
    '5,0': { electron: 'bipiramidale trigonale', shape: 'bipiramidale trigonale', angle: '90° e 120°', examples: 'PCl₅' },
    '4,1': { electron: 'bipiramidale trigonale', shape: 'ad altalena', angle: 'meno di 90° e meno di 120°', examples: 'SF₄' },
    '3,2': { electron: 'bipiramidale trigonale', shape: 'a T', angle: 'meno di 90°', examples: 'ClF₃' },
    '2,3': { electron: 'bipiramidale trigonale', shape: 'lineare', angle: '180°', examples: 'XeF₂' },
    '6,0': { electron: 'ottaedrica', shape: 'ottaedrica', angle: '90°', examples: 'SF₆' },
    '5,1': { electron: 'ottaedrica', shape: 'piramidale quadrata', angle: 'meno di 90°', examples: 'BrF₅' },
    '4,2': { electron: 'ottaedrica', shape: 'planare quadrata', angle: '90°', examples: 'XeF₄' }
};
export const VSEPR_SHAPES = Object.freeze(Object.fromEntries(Object.entries(SHAPES).map(([k, v]) => [k, Object.freeze(v)])));
export const SHAPE_NAMES = Object.freeze([...new Set(Object.values(SHAPES).map(s => s.shape))]);
export function vseprValid(x, e) { return Number.isInteger(x) && Number.isInteger(e) && Object.hasOwn(SHAPES, x + ',' + e); }
export function vseprInfo(x, e) {
    if (!vseprValid(x, e)) return null;
    return { x, e, domains: x + e, notation: 'AX' + sub(x) + (e ? 'E' + (e > 1 ? sub(e) : '') : ''), ...SHAPES[x + ',' + e] };
}
const SUBSCRIPTS = '₀₁₂₃₄₅₆₇₈₉';
function sub(n) { return n === 1 ? '' : String(n).split('').map(d => SUBSCRIPTS[d]).join(''); }
export const VSEPR_CHALLENGES = Object.freeze([
    { id: 'co2', formula: 'CO₂', hint: 'Carbonio centrale: due doppi legami con l’ossigeno, nessuna coppia solitaria.', x: 2, e: 0, multiple: 2 },
    { id: 'h2o', formula: 'H₂O', hint: 'Ossigeno centrale: due legami semplici con l’idrogeno e due coppie solitarie.', x: 2, e: 2, multiple: 0 },
    { id: 'nh3', formula: 'NH₃', hint: 'Azoto centrale: tre legami semplici con l’idrogeno e una coppia solitaria.', x: 3, e: 1, multiple: 0 },
    { id: 'ch4', formula: 'CH₄', hint: 'Carbonio centrale: quattro legami semplici, nessuna coppia solitaria.', x: 4, e: 0, multiple: 0 },
    { id: 'bf3', formula: 'BF₃', hint: 'Boro centrale: tre legami semplici, nessuna coppia solitaria. Il boro ha solo sei elettroni attorno a sé.', x: 3, e: 0, multiple: 0 },
    { id: 'so2', formula: 'SO₂', hint: 'Zolfo centrale: un legame doppio e uno semplice con l’ossigeno, in risonanza, e una coppia solitaria.', x: 2, e: 1, multiple: 1 },
    { id: 'sf4', formula: 'SF₄', hint: 'Zolfo centrale: quattro legami semplici con il fluoro e una coppia solitaria.', x: 4, e: 1, multiple: 0 },
    { id: 'clf3', formula: 'ClF₃', hint: 'Cloro centrale: tre legami semplici con il fluoro e due coppie solitarie.', x: 3, e: 2, multiple: 0 },
    { id: 'xef4', formula: 'XeF₄', hint: 'Xeno centrale: quattro legami semplici con il fluoro e due coppie solitarie.', x: 4, e: 2, multiple: 0 },
    { id: 'sf6', formula: 'SF₆', hint: 'Zolfo centrale: sei legami semplici con il fluoro, nessuna coppia solitaria.', x: 6, e: 0, multiple: 0 }
]);
const vseprIds = new Set(VSEPR_CHALLENGES.map(c => c.id));
/** Four shape names for a challenge: the right one and three that correspond to typical errors. */
export function shapeOptions(challenge) {
    const right = SHAPES[challenge.x + ',' + challenge.e].shape, electron = SHAPES[challenge.x + ',' + challenge.e].electron;
    const ignoreLonePairs = SHAPES[challenge.x + ',0']?.shape;
    const pool = [right, electron, ignoreLonePairs, ...SHAPE_NAMES].filter((s, i, a) => s && a.indexOf(s) === i);
    const chosen = pool.slice(0, 4), shift = challenge.id.length % chosen.length;
    return [...chosen.slice(shift), ...chosen.slice(0, shift)];
}
export function checkVsepr(challenge, x, e, shape) {
    const info = vseprInfo(challenge.x, challenge.e);
    if (x === challenge.x && e === challenge.e && shape === info.shape)
        return { ok: true, message: `Esatto: ${challenge.formula} è ${info.notation}, geometria elettronica ${info.electron}, molecola ${info.shape}. Angolo: ${info.angle}.` };
    if (x === challenge.x && e === challenge.e)
        return { ok: false, message: shape === info.electron && info.electron !== info.shape
            ? `I domini sono giusti, ma «${shape}» è la disposizione di tutti i domini. La forma della molecola considera solo gli atomi: le coppie solitarie non si vedono.`
            : challenge.e === 0
                ? `I domini sono giusti (${info.notation}). Senza coppie solitarie la forma coincide con la geometria elettronica: quale disposizione tiene ${challenge.x} domini il più lontano possibile?`
                : `I domini sono giusti (${info.notation}). Ricontrolla il nome della forma: con ${challenge.e} ${challenge.e === 1 ? 'coppia solitaria' : 'coppie solitarie'} gli atomi non occupano tutte le posizioni della geometria ${info.electron}.` };
    if (challenge.multiple && x === challenge.x + challenge.multiple)
        return { ok: false, message: 'Hai contato un legame multiplo come due domini. Un doppio o un triplo legame occupa una sola direzione: conta come un dominio.' };
    if (x === challenge.x)
        return { ok: false, message: 'Gli atomi legati sono giusti. Ricontrolla le coppie solitarie dell’atomo centrale nella descrizione della struttura di Lewis.' };
    if (e === challenge.e)
        return { ok: false, message: 'Le coppie solitarie sono giuste. Conta gli atomi legati all’atomo centrale, non gli elettroni dei legami.' };
    return { ok: false, message: 'Riparti dalla struttura di Lewis: un dominio per ogni atomo legato e uno per ogni coppia solitaria dell’atomo centrale.' };
}
/** Unit vectors of the electron domains; lone pairs take the positions with fewer 90° neighbours. */
export function vseprPositions(x, e) {
    if (!vseprValid(x, e)) return null;
    const n = x + e, s = Math.sqrt(3);
    const base = {
        2: [[1, 0, 0], [-1, 0, 0]],
        3: [[0, 1, 0], [-0.8660254, -0.5, 0], [0.8660254, -0.5, 0]],
        4: [[1 / s, 1 / s, 1 / s], [1 / s, -1 / s, -1 / s], [-1 / s, 1 / s, -1 / s], [-1 / s, -1 / s, 1 / s]],
        5: [[0, 1, 0], [0, -1, 0], [1, 0, 0], [-0.5, 0, 0.8660254], [-0.5, 0, -0.8660254]],
        6: [[0, 1, 0], [0, -1, 0], [1, 0, 0], [-1, 0, 0], [0, 0, 1], [0, 0, -1]]
    }[n];
    const lone = n === 5 ? [2, 3, 4].slice(0, e) : n === 6 ? [0, 1].slice(0, e) : Array.from({ length: e }, (_, i) => i);
    return { atoms: base.filter((_, i) => !lone.includes(i)), lonePairs: lone.map(i => base[i]) };
}

// ---------- Mendelian crosses: one gene, two alleles, complete dominance ----------
export const GENOTYPES = Object.freeze(['AA', 'Aa', 'aa']);
const sorted = g => g.includes('A') ? (g === 'aA' ? 'Aa' : g) : g;
export function gametes(genotype) { if (!GENOTYPES.includes(genotype)) throw Error('Genotipo non valido'); return [genotype[0], genotype[1]]; }
export function punnett(p1, p2) {
    const rows = gametes(p1), cols = gametes(p2), cells = rows.map(a => cols.map(b => sorted(a + b)));
    const counts = { AA: 0, Aa: 0, aa: 0 };
    for (const row of cells) for (const g of row) counts[g]++;
    const genotype = Object.fromEntries(GENOTYPES.map(g => [g, counts[g] / 4]));
    return { rows, cols, cells, genotype, phenotype: { viola: genotype.AA + genotype.Aa, bianco: genotype.aa } };
}
export function offspring(p1, p2, rng = Math.random) {
    const a = gametes(p1)[rng() < .5 ? 0 : 1], b = gametes(p2)[rng() < .5 ? 0 : 1];
    return sorted(a + b);
}
export function sow(p1, p2, n, rng = Math.random) {
    if (!Number.isInteger(n) || n < 1 || n > 10000) throw Error('Numero di semi non valido');
    const counts = { AA: 0, Aa: 0, aa: 0 };
    for (let i = 0; i < n; i++) counts[offspring(p1, p2, rng)]++;
    return { n, counts, viola: counts.AA + counts.Aa, bianco: counts.aa };
}
/** Pearson statistic on the two phenotypes; null when a class is not expected at all. */
export function chiSquare(observed, expected) {
    let total = 0;
    for (const k of Object.keys(expected)) { if (expected[k] <= 0) return null; total += (observed[k] - expected[k]) ** 2 / expected[k]; }
    return total;
}
export function newMystery(rng = Math.random) { return { hidden: rng() < .5 ? 'AA' : 'Aa', viola: 0, bianco: 0 }; }
export function testcross(mystery, n, rng = Math.random) {
    const result = sow(mystery.hidden, 'aa', n, rng);
    mystery.viola += result.viola; mystery.bianco += result.bianco;
    return result;
}
export const EVIDENCE_SEEDS = 7;
export function judgeMystery(mystery, answer) {
    const total = mystery.viola + mystery.bianco, risk = (0.5 ** total).toLocaleString('it-IT', { maximumSignificantDigits: 2 });
    if (!['AA', 'Aa'].includes(answer)) throw Error('Risposta non valida');
    if (total === 0) return { ok: false, message: 'Prima incrocia la pianta con una bianca aa e osserva i figli.' };
    if (answer === 'Aa' && mystery.bianco > 0) return { ok: true, message: `Esatto: ${mystery.bianco} ${mystery.bianco === 1 ? 'figlio bianco basta' : 'figli bianchi bastano'}. Un figlio aa riceve a da entrambi i genitori, quindi la pianta viola porta l’allele a.` };
    if (answer === 'Aa') return { ok: false, message: `Senza figli bianchi non c’è prova che la pianta porti a. Se fosse Aa, ${total} figli tutti viola avrebbero probabilità ${risk}: semina ancora.` };
    if (mystery.bianco > 0) return { ok: false, message: 'Una pianta AA incrociata con aa dà solo figli Aa, cioè viola. Un figlio bianco esclude AA.' };
    if (total < EVIDENCE_SEEDS) return { ok: false, message: `Con ${total} figli tutti viola, una pianta Aa avrebbe dato lo stesso risultato con probabilità ${risk}. Semina almeno ${EVIDENCE_SEEDS} figli prima di decidere.` };
    return mystery.hidden === 'AA'
        ? { ok: true, message: `Esatto. Se la pianta fosse Aa, ${total} figli tutti viola avrebbero probabilità ${risk}: abbastanza piccola per decidere, mai zero.` }
        : { ok: false, message: 'Raro ma possibile: la pianta era Aa e tutti i figli sono usciti viola. Anche una decisione ben fondata può sbagliare.' };
}

// ---------- Statements with quantifiers ----------
const isPrime = n => { if (!Number.isInteger(n) || n < 2) return false; for (let d = 2; d * d <= n; d++) if (n % d === 0) return false; return true; };
const fmt = v => String(v).replace('.', ',').replace('-', '−');
export const STATEMENTS = Object.freeze([
    { id: 'sq-ge', text: 'Per ogni numero naturale n, n² ≥ n.', kind: 'all', truth: true, values: [0, 1, 2, 3, 5, 10],
      holds: n => n * n >= n, show: n => `${fmt(n)}² = ${fmt(n * n)}`,
      reason: 'Vale per ogni naturale: n² − n = n(n − 1), prodotto di due naturali, non è mai negativo. Gli esempi provati non bastavano: serve questo argomento.' },
    { id: 'sq-gt', text: 'Per ogni numero intero n, n² > n.', kind: 'all', truth: false, values: [-3, -1, 0, 1, 2, 5],
      holds: n => n * n > n, show: n => `${fmt(n)}² = ${fmt(n * n)}`,
      reason: 'Per n = 0 e per n = 1 si ottiene un’uguaglianza, e l’enunciato chiede una disuguaglianza stretta.' },
    { id: 'even-square', text: 'Per ogni intero n, se n è pari allora n² è pari.', kind: 'all', truth: true, values: [-4, -1, 0, 2, 3, 6],
      holds: n => n % 2 !== 0 || (n * n) % 2 === 0, show: n => `n² = ${fmt(n * n)}`,
      reason: 'Se n è pari si scrive n = 2k e n² = 4k² = 2(2k²), che è pari. I valori dispari non contano: l’ipotesi non è soddisfatta.' },
    { id: 'even-four', text: 'Per ogni intero n, se n è pari allora n è divisibile per 4.', kind: 'all', truth: false, values: [-4, 0, 2, 4, 6, 8],
      holds: n => n % 2 !== 0 || n % 4 === 0, show: n => `${fmt(n)} : 4 = ${fmt(n / 4)}`,
      reason: 'È l’inversa di una proposizione vera («se n è divisibile per 4 allora è pari»). L’inversa va controllata a parte: n = 2 la smentisce.' },
    { id: 'euler', text: 'Per ogni numero naturale n, n² + n + 41 è un numero primo.', kind: 'all', truth: false, values: [0, 1, 2, 10, 39, 40],
      holds: n => isPrime(n * n + n + 41), show: n => `n² + n + 41 = ${fmt(n * n + n + 41)}`,
      reason: 'Vale da n = 0 a n = 39, ma per n = 40 si ottiene 1681 = 41 · 41. Quaranta casi favorevoli non dimostravano nulla.' },
    { id: 'square-sum', text: 'Per ogni numero reale x, (x + 1)² = x² + 1.', kind: 'all', truth: false, values: [-1, 0, 0.5, 1, 2, 3],
      holds: x => (x + 1) ** 2 === x * x + 1, show: x => `(x + 1)² = ${fmt((x + 1) ** 2)}, x² + 1 = ${fmt(x * x + 1)}`,
      reason: 'Manca il doppio prodotto: (x + 1)² = x² + 2x + 1. L’uguaglianza vale solo per x = 0.' },
    { id: 'even-prime', text: 'Esiste un numero primo pari.', kind: 'exists', truth: true, values: [2, 3, 4, 5, 6, 9],
      holds: n => isPrime(n) && n % 2 === 0, show: n => `${fmt(n)}: ${isPrime(n) ? 'primo' : 'non primo'}, ${n % 2 === 0 ? 'pari' : 'dispari'}`,
      reason: 'Basta un testimone: 2 è primo ed è pari. Per una proposizione esistenziale un solo esempio è una dimostrazione.' },
    { id: 'odd-even', text: 'Esiste un numero naturale n tale che 2n + 1 è pari.', kind: 'exists', truth: false, values: [0, 1, 2, 3, 7, 10],
      holds: n => (2 * n + 1) % 2 === 0, show: n => `2n + 1 = ${fmt(2 * n + 1)}`,
      reason: 'Nessun valore funziona: 2n + 1 lascia sempre resto 1 nella divisione per 2. Per negare un’esistenziale serve un argomento valido per tutti i casi.' }
]);
const statementIds = new Set(STATEMENTS.map(s => s.id));
export function testValue(statement, v) { return { value: v, holds: statement.holds(v), text: statement.show(v) }; }
/** verdict: 'vera' | 'falsa'; counter: a value chosen to refute a universal statement. */
export function checkStatement(statement, verdict, counter = null) {
    if (!['vera', 'falsa'].includes(verdict)) throw Error('Verdetto non valido');
    if (verdict === 'vera' && statement.truth) return { ok: true, message: 'Esatto. ' + statement.reason };
    if (verdict === 'vera') return { ok: false, message: statement.kind === 'all' ? 'C’è almeno un caso in cui l’enunciato non vale. Prova altri valori, anche lo zero e i numeri negativi.' : 'Nessuno dei valori possibili rende vero l’enunciato. Cerca il motivo.' };
    if (statement.truth) return { ok: false, message: statement.kind === 'all' ? 'Nessun valore smentisce l’enunciato. Riesci a spiegare perché vale sempre?' : 'Prova i valori del banco: uno di essi è un testimone.' };
    if (statement.kind === 'exists') return { ok: true, message: 'Esatto. ' + statement.reason };
    if (counter === null) return { ok: false, message: 'Per dire che un’affermazione «per ogni» è falsa scegli un controesempio tra i valori provati.' };
    if (!statement.values.includes(counter)) throw Error('Valore non previsto');
    return statement.holds(counter)
        ? { ok: false, message: `Con ${fmt(counter)} l’enunciato vale: un controesempio deve renderlo falso.` }
        : { ok: true, message: `Esatto: ${fmt(counter)} è un controesempio. ${statement.reason}` };
}

// ---------- State ----------
export function freshActivity(kind) {
    if (!ACTIVITY_KINDS.includes(kind)) throw Error('Attività sconosciuta');
    return { kind, solved: [], attempts: 0 };
}
export function cleanActivity(value, kind) {
    const s = freshActivity(kind);
    if (!plain(value) || value.kind !== kind) return s;
    const allowed = kind === 'vsepr' ? vseprIds : kind === 'logic' ? statementIds : null;
    s.solved = allowed ? ids(value.solved, allowed, 20) : Array.isArray(value.solved) ? value.solved.filter(id => typeof id === 'string' && /^mistero-[1-9]$/.test(id)).slice(0, 9) : [];
    s.attempts = Number.isInteger(value.attempts) ? Math.max(0, Math.min(99999, value.attempts)) : 0;
    return s;
}
export function recordSolved(state, id) { state.attempts++; if (!state.solved.includes(id)) state.solved.push(id); }
export function activityProgress(kind, state) {
    const goal = ACTIVITY_GOALS[kind], solved = state?.kind === kind ? state.solved.length : 0;
    return { solved: Math.min(solved, goal), goal, done: solved >= goal };
}
