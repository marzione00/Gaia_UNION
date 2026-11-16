/** Interactive activities of the hand-written units. Pure logic: no rendering, no network.
 * Each activity keeps a small, validated state and declares when it is complete.
 * 'cards' is data-driven: its rounds live in the unit file and are validated here. */
export const ACTIVITY_KINDS = Object.freeze(['vsepr', 'punnett', 'logic', 'cards', 'bisection', 'ionic']);
export const ACTIVITY_GOALS = Object.freeze({ vsepr: 4, punnett: 3, logic: 6, bisection: 4, ionic: 6 });
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

// ---------- Bisection: existence of a zero and its localisation ----------
const num = (x, d = 5) => Number(x.toFixed(d)).toLocaleString('it-IT', { maximumFractionDigits: d }).replace('-', '−');
export const BISECTION_TASKS = Object.freeze([
    { id: 'radice-due', label: 'f(x) = x² − 2', a: 1, b: 2, f: x => x * x - 2, guaranteed: true, steps: 5,
      note: 'La radice è √2 ≈ 1,41421: ogni intervallo trovato la contiene.' },
    { id: 'reciproco', label: 'f(x) = 1/x', a: -1, b: 1, f: x => 1 / x, guaranteed: false,
      why: 'f(−1) = −1 e f(1) = 1 hanno segni opposti, ma f non è definita in x = 0, che sta dentro l’intervallo. Senza continuità il teorema non si applica, e infatti 1/x non vale mai zero.' },
    { id: 'cubica', label: 'f(x) = x³ − x − 1', a: 1, b: 2, f: x => x ** 3 - x - 1, guaranteed: true, steps: 5,
      note: 'La radice è circa 1,32472. Per le equazioni di terzo grado esiste una formula risolutiva, ma la bisezione arriva prima a un valore utilizzabile.' },
    { id: 'parabola', label: 'f(x) = x² − 0,25', a: -1, b: 1, f: x => x * x - .25, guaranteed: false,
      why: 'f(−1) e f(1) valgono entrambe 0,75: senza cambio di segno il teorema non garantisce nulla. Le radici esistono (−0,5 e 0,5), ma l’ipotesi non le rivela, e la bisezione non saprebbe quale metà tenere.' },
    { id: 'coseno', label: 'f(x) = cos x − x (x in radianti)', a: 0, b: 1, f: x => Math.cos(x) - x, guaranteed: true, steps: 5,
      note: 'La radice è circa 0,73909: l’unico numero uguale al proprio coseno. Non se ne conosce un’espressione con radici o frazioni, e la si calcola per approssimazione.' }
]);
const bisectionIds = new Set(BISECTION_TASKS.map(t => t.id));
export const signWord = y => y > 0 ? 'positivo' : y < 0 ? 'negativo' : 'zero';
const bothWord = y => y > 0 ? 'positivi' : 'negativi';
export function formatNumber(x, d = 5) { return num(x, d); }
/** answer: true if the student claims the theorem guarantees a zero in [a, b]. */
export function checkGuarantee(task, answer) {
    const fa = task.f(task.a), fb = task.f(task.b);
    if (answer === task.guaranteed) return task.guaranteed
        ? { ok: true, message: `Esatto: f è continua su [${num(task.a)}; ${num(task.b)}], f(${num(task.a)}) = ${num(fa)} e f(${num(task.b)}) = ${num(fb)} hanno segni opposti. Ora dimezza l’intervallo.` }
        : { ok: true, message: 'Esatto. ' + task.why };
    return task.guaranteed
        ? { ok: false, message: 'Controlla le due ipotesi: la funzione è continua su tutto l’intervallo e ai due estremi ha segni opposti. Quando valgono entrambe, il teorema garantisce almeno uno zero.' }
        : { ok: false, message: 'Non basta guardare i segni agli estremi: servono segni opposti e continuità su tutto l’intervallo. Controlla quale ipotesi manca.' };
}
/** side: 'left' keeps [a, m], 'right' keeps [m, b]. The kept half must show a change of sign. */
export function bisectionStep(task, a, b, side) {
    if (!['left', 'right'].includes(side) || !(a < b)) throw Error('Passo non valido');
    const m = (a + b) / 2, fa = task.f(a), fm = task.f(m), right = fa * fm <= 0 ? 'left' : 'right';
    if (fm === 0) return { ok: true, a: m, b: m, exact: true, message: `f(${num(m)}) = 0: il punto medio è la radice.` };
    if (side !== right) return { ok: false, a, b, message: side === 'left'
        ? `f(${num(a)}) e f(${num(m)}) sono entrambi ${bothWord(fm)}: in [${num(a)}; ${num(m)}] non c’è cambio di segno e il teorema non garantisce nulla. Il cambio di segno è nell’altra metà.`
        : `f(${num(m)}) e f(${num(b)}) sono entrambi ${bothWord(fm)}: in [${num(m)}; ${num(b)}] non c’è cambio di segno. Tieni la metà in cui i segni agli estremi sono opposti.` };
    const next = side === 'left' ? [a, m] : [m, b];
    return { ok: true, a: next[0], b: next[1], message: `Giusto: f(${num(m)}) = ${num(fm)}, ${signWord(fm)}. Il cambio di segno è in [${num(next[0])}; ${num(next[1])}], ampio ${num(next[1] - next[0])}.` };
}

// ---------- Ionic compounds: charges from the periodic group, neutral formula ----------
const SUP = { '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹' };
export const chargeText = q => (Math.abs(q) === 1 ? '' : SUP[Math.abs(q)]) + (q > 0 ? '⁺' : '⁻');
export const signed = q => (q > 0 ? '+' : '−') + Math.abs(q);
const ELEMENTS = {
    Li: { article: 'il ', name: 'litio', group: 1, charge: 1 }, Na: { article: 'il ', name: 'sodio', group: 1, charge: 1 }, K: { article: 'il ', name: 'potassio', group: 1, charge: 1 },
    Mg: { article: 'il ', name: 'magnesio', group: 2, charge: 2 }, Ca: { article: 'il ', name: 'calcio', group: 2, charge: 2 }, Al: { article: 'l’', name: 'alluminio', group: 13, charge: 3 },
    N: { article: 'l’', name: 'azoto', group: 15, charge: -3 }, O: { article: 'l’', name: 'ossigeno', group: 16, charge: -2 }, S: { article: 'lo ', name: 'zolfo', group: 16, charge: -2 },
    F: { article: 'il ', name: 'fluoro', group: 17, charge: -1 }, Cl: { article: 'il ', name: 'cloro', group: 17, charge: -1 }
};
const POLYATOMIC = {
    NH4: { symbol: 'NH₄', name: 'ammonio', charge: 1 }, NO3: { symbol: 'NO₃', name: 'nitrato', charge: -1 },
    SO4: { symbol: 'SO₄', name: 'solfato', charge: -2 }, OH: { symbol: 'OH', name: 'idrossido', charge: -1 }
};
export function ion(key) {
    if (Object.hasOwn(ELEMENTS, key)) return { key, symbol: key, polyatomic: false, ...ELEMENTS[key] };
    if (Object.hasOwn(POLYATOMIC, key)) return { key, polyatomic: true, group: null, ...POLYATOMIC[key] };
    throw Error('Ione sconosciuto');
}
export const ionLabel = i => i.symbol + chargeText(i.charge);
export const IONIC_CHALLENGES = Object.freeze([
    { id: 'nacl', cation: 'Na', anion: 'Cl', name: 'cloruro di sodio' }, { id: 'mgcl2', cation: 'Mg', anion: 'Cl', name: 'cloruro di magnesio' },
    { id: 'k2o', cation: 'K', anion: 'O', name: 'ossido di potassio' }, { id: 'cao', cation: 'Ca', anion: 'O', name: 'ossido di calcio' },
    { id: 'al2o3', cation: 'Al', anion: 'O', name: 'ossido di alluminio' }, { id: 'caf2', cation: 'Ca', anion: 'F', name: 'fluoruro di calcio' },
    { id: 'na2s', cation: 'Na', anion: 'S', name: 'solfuro di sodio' }, { id: 'mg3n2', cation: 'Mg', anion: 'N', name: 'nitruro di magnesio' },
    { id: 'alf3', cation: 'Al', anion: 'F', name: 'fluoruro di alluminio' }, { id: 'nh4cl', cation: 'NH4', anion: 'Cl', name: 'cloruro di ammonio' },
    { id: 'cano32', cation: 'Ca', anion: 'NO3', name: 'nitrato di calcio' }, { id: 'al2so43', cation: 'Al', anion: 'SO4', name: 'solfato di alluminio' }
].map(c => Object.freeze(c)));
const ionicIds = new Set(IONIC_CHALLENGES.map(c => c.id));
const SUBS = '₀₁₂₃₄₅₆₇₈₉';
export function ionicFormula(cation, n, anion, m) {
    const part = (i, k) => (i.polyatomic && k > 1 ? '(' + i.symbol + ')' : i.symbol) + (k > 1 ? String(k).split('').map(d => SUBS[d]).join('') : '');
    return part(cation, n) + part(anion, m);
}
const gcd = (a, b) => b ? gcd(b, a % b) : a;
const GROUP_RULE = {
    1: 'ha un elettrone di valenza e lo cede: forma ioni +1', 2: 'ha due elettroni di valenza e li cede: forma ioni +2',
    13: 'ha tre elettroni di valenza e li cede: forma ioni +3', 15: 'ha cinque elettroni di valenza e ne acquista tre: forma ioni −3',
    16: 'ha sei elettroni di valenza e ne acquista due: forma ioni −2', 17: 'ha sette elettroni di valenza e ne acquista uno: forma ioni −1'
};
/** qc, qa: charges chosen for cation and anion; n, m: how many of each in the formula unit. */
export function checkIonic(challenge, qc, qa, n, m) {
    const c = ion(challenge.cation), a = ion(challenge.anion);
    if (![n, m].every(k => Number.isInteger(k) && k >= 1 && k <= 4)) throw Error('Numero di ioni non valido');
    const why = i => i.polyatomic ? `lo ione ${i.name} ${ionLabel(i)} ha carica ${signed(i.charge)}; la carica di uno ione poliatomico si impara insieme alla sua formula` : `${i.article}${i.name} (gruppo ${i.group}) ${GROUP_RULE[i.group]}`;
    if (qc !== c.charge) return { ok: false, message: `Carica del catione: ${why(c)}.` };
    if (qa !== a.charge) return { ok: false, message: `Carica dell’anione: ${why(a)}.` };
    const total = n * qc + m * qa;
    if (total !== 0) return { ok: false, message: `Carica totale: ${n} · (${signed(qc)}) + ${m} · (${signed(qa)}) = ${total > 0 ? '+' : '−'}${Math.abs(total)}. ${total > 0 ? 'Prevale la carica positiva: servono più anioni o meno cationi.' : 'Prevale la carica negativa: servono più cationi o meno anioni.'}` };
    const g = gcd(n, m);
    if (g > 1) return { ok: false, message: `Il composto è neutro, ma la formula di un composto ionico riporta il rapporto minimo fra gli ioni: dividi ${n} e ${m} per ${g}.` };
    const count = (k, i, q) => `${k === 1 ? 'uno ione' : k + ' ioni'} ${ionLabel(i)} ${k === 1 ? 'porta' : 'portano'} ${signed(k * q)}`, first = count(n, c, qc);
    return { ok: true, formula: ionicFormula(c, n, a, m), message: `Esatto: ${ionicFormula(c, n, a, m)}, ${challenge.name}. ${first[0].toUpperCase() + first.slice(1)}, ${count(m, a, qa)}: la somma è zero.` };
}

// ---------- Cards: classification and ordering rounds written in the unit file ----------
const slug = x => typeof x === 'string' && /^[a-z0-9-]{1,40}$/.test(x);
const words = (x, max) => typeof x === 'string' && x.trim().length > 0 && x.length <= max;
/** Throws when the rounds of a 'cards' activity are malformed. */
export function validateCards(a) {
    if (!plain(a) || a.kind !== 'cards' || !Array.isArray(a.rounds) || a.rounds.length < 1 || a.rounds.length > 8) throw Error('Serie di carte non valide');
    const seen = new Set();
    for (const r of a.rounds) {
        if (!plain(r) || !slug(r.id) || seen.has(r.id) || !['classify', 'order'].includes(r.type) || !words(r.title, 60) || !words(r.prompt, 400) || !words(r.explain, 700)) throw Error('Serie non valida: ' + r?.id);
        seen.add(r.id);
        if (!Array.isArray(r.items) || r.items.length < 3 || r.items.length > 10) throw Error('Carte non valide: ' + r.id);
        const itemIds = new Set();
        for (const it of r.items) { if (!plain(it) || !slug(it.id) || itemIds.has(it.id) || !words(it.text, 120) || !words(it.why, 400)) throw Error('Carta non valida: ' + r.id); itemIds.add(it.id); }
        if (r.type === 'classify') {
            if (!Array.isArray(r.categories) || r.categories.length < 2 || r.categories.length > 4) throw Error('Categorie non valide: ' + r.id);
            const cats = new Set(r.categories.map(c => c?.id));
            if (cats.size !== r.categories.length || r.categories.some(c => !slug(c.id) || !words(c.label, 24)) || r.items.some(it => !cats.has(it.category))) throw Error('Categorie non valide: ' + r.id);
            if (!Number.isInteger(r.maxErrors) || r.maxErrors < 0 || r.maxErrors > 5) throw Error('Soglia non valida: ' + r.id);
        }
    }
    if (!Number.isInteger(a.goal) || a.goal < 1 || a.goal > a.rounds.length) throw Error('Obiettivo non valido');
    return a;
}
export function checkCard(round, index, category) {
    const it = round.items[index];
    if (!it || !round.categories.some(c => c.id === category)) throw Error('Carta non valida');
    const label = round.categories.find(c => c.id === it.category).label;
    return it.category === category ? { ok: true, message: 'Giusto. ' + it.why } : { ok: false, message: `No: la carta va in «${label}». ${it.why}` };
}
/** A deterministic starting order that never coincides with the solution. */
export function scrambled(round) {
    const ids = round.items.map(it => it.id), n = ids.length, out = [];
    for (let k = 0; k < n; k++) out.push(ids[(k * 2 + 1) % n === k ? (k + 1) % n : (k * 2 + 1) % n]);
    const unique = [...new Set(out)], rest = ids.filter(id => !unique.includes(id)), order = [...unique, ...rest];
    return order.every((id, i) => id === ids[i]) ? [...ids].reverse() : order;
}
export function checkOrder(round, order) {
    const ids = round.items.map(it => it.id);
    if (!Array.isArray(order) || order.length !== ids.length || new Set(order).size !== ids.length || order.some(id => !ids.includes(id))) throw Error('Ordine non valido');
    const inPlace = order.filter((id, i) => id === ids[i]).length;
    if (inPlace === ids.length) return { ok: true, inPlace, message: 'Ordine corretto. ' + round.explain };
    // The hint explains the misplaced card, never the card that belongs in that position.
    const first = order.findIndex((id, i) => id !== ids[i]), misplaced = round.items.find(it => it.id === order[first]);
    return { ok: false, inPlace, message: `${inPlace} ${inPlace === 1 ? 'carta è' : 'carte sono'} al posto giusto su ${ids.length}. La carta in posizione ${first + 1}, «${misplaced.text}», va spostata. ${misplaced.why}` };
}

// ---------- State ----------
export function freshActivity(kind) {
    if (!ACTIVITY_KINDS.includes(kind)) throw Error('Attività sconosciuta');
    return { kind, solved: [], attempts: 0 };
}
export function cleanActivity(value, kind) {
    const s = freshActivity(kind);
    if (!plain(value) || value.kind !== kind) return s;
    const allowed = { vsepr: vseprIds, logic: statementIds, bisection: bisectionIds, ionic: ionicIds }[kind];
    s.solved = allowed ? ids(value.solved, allowed, 20)
        : kind === 'cards' ? (Array.isArray(value.solved) ? [...new Set(value.solved.filter(slug))].slice(0, 8) : [])
        : Array.isArray(value.solved) ? value.solved.filter(id => typeof id === 'string' && /^mistero-[1-9]$/.test(id)).slice(0, 9) : [];
    s.attempts = Number.isInteger(value.attempts) ? Math.max(0, Math.min(99999, value.attempts)) : 0;
    return s;
}
export function recordSolved(state, id) { state.attempts++; if (!state.solved.includes(id)) state.solved.push(id); }
/** activity: the unit's activity object, or a kind name for the activities with fixed content. */
export function activityGoal(activity) {
    const kind = typeof activity === 'string' ? activity : activity?.kind;
    return kind === 'cards' ? activity.goal : ACTIVITY_GOALS[kind];
}
export function activityProgress(activity, state) {
    const kind = typeof activity === 'string' ? activity : activity.kind, goal = activityGoal(activity);
    const known = kind === 'cards' ? new Set(activity.rounds.map(r => r.id)) : null;
    const solved = state?.kind === kind ? state.solved.filter(id => !known || known.has(id)).length : 0;
    return { solved: Math.min(solved, goal), goal, done: solved >= goal };
}
