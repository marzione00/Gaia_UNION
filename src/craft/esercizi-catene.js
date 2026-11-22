/** Exercises on the chains of production (1.53.0): a station that turns its inputs into a product works like a
 * reaction with fixed proportions, so its recipe (src/craft/economy.js) becomes a question of stoichiometry
 * for «Stechiometria e reagente limitante» (chemistry-14) and of rates for «Velocità di reazione»
 * (chemistry-17). The stores are those of the open system when the station is there, otherwise stores drawn
 * as the economy draws them at the start. As on the Rapporto, every answer is computed from the numbers shown. */
import { seededRandom } from '../scene/layout.js';
import { RECIPES, RESOURCES } from './economy.js';
import { THREAT } from './threats.js';
import { CRAFT } from './registry.js';
import { dec, options } from './esercizi.js';

export const CHAIN_UNITS = Object.freeze(['chemistry-14', 'chemistry-17']);
const name = r => RESOURCES[r]?.name || r;
/** A rate as written in the questions: two decimals, three when the recipe needs them. */
const rate = v => dec(v, Math.abs(v * 100 - Math.round(v * 100)) > 1e-9 ? 3 : 2);
const inputsOf = use => Object.keys(use).filter(r => r !== 'equipaggi');
/** Stations whose recipe turns at least two inputs into goods (crews excluded): 178 of the 564. */
export function chainable(e) {
    if (e?.kind !== 'stazione') return false;
    const r = RECIPES[e.works || e.type];
    return !!r && Object.keys(r.make || {}).length > 0 && !('equipaggi' in (r.make || {})) && inputsOf(r.use || {}).length >= 2;
}
export const CHAIN_STATIONS = Object.freeze(CRAFT.filter(chainable));
/** The station as the exercises see it: the live station `live` of the economy when given, otherwise the
 * recipe at the first level with stores drawn between 15 % and 75 % of the capacity, as at the start. */
export function chainStation(e, live = null, seed = 1) {
    const r = RECIPES[e.works || e.type];
    // Rates of a grown station are rounded to three decimals, the precision the questions show.
    const r3 = v => Math.round(v * 1000) / 1000;
    if (live) return { entry: e, process: r.process, make: Object.fromEntries(Object.entries(live.make).map(([k, v]) => [k, r3(v)])), use: Object.fromEntries(inputsOf(live.use).map(k => [k, r3(live.use[k])])), stock: Object.fromEntries(Object.keys(live.cap).map(k => [k, Math.round(live.stock[k] || 0)])), cap: { ...live.cap }, level: live.level || 1, strict: !!r.inputs, live: true };
    const R = seededRandom(seed * 104729 + e.system * 1009 + e.slot), cap = { ...r.cap };
    return { entry: e, process: r.process, make: { ...r.make }, use: Object.fromEntries(inputsOf(r.use).map(k => [k, r.use[k]])), stock: Object.fromEntries(Object.keys(cap).map(k => [k, Math.round(cap[k] * (.15 + .6 * R()))])), cap, level: 1, strict: !!r.inputs, live: false };
}

/** The exercises for the station `st` (from chainStation); `seed` fixes the choices and the order of the options. */
export function chainExercises(st, seed = 1) {
    const R = seededRandom(seed * 7919 + st.entry.slot * 31 + st.entry.system * 17 + 3), out = [], who = st.entry.name;
    const ins = Object.keys(st.use), product = Object.keys(st.make)[0], mk = st.make[product];
    // Inputs with something in store; time each one lasts at full rate.
    const stocked = ins.filter(r => st.stock[r] > 0), last = stocked.map(r => [r, st.stock[r] / st.use[r]]).sort((a, b) => a[1] - b[1]);
    const listUse = ins.map(r => `${name(r)} ${rate(st.use[r])}`).join(', '), listStock = stocked.map(r => `${name(r)} ${st.stock[r]}`).join(', ');
    const where = st.live ? 'In questo momento il magazzino contiene' : 'Il magazzino contiene';
    // 1. Limiting input: the one that runs out first.
    if (last.length >= 2) {
        const [lim, t] = last[0], T = Math.round(t), opt = (r, v) => `${name(r)}, ${Math.round(v)} s`;
        const least = stocked.reduce((a, r) => st.stock[r] < st.stock[a] ? r : a), most = ins.reduce((a, r) => st.use[r] > st.use[a] ? r : a), total = ins.reduce((a, r) => a + st.use[r], 0);
        const wrong = [opt(last[1][0], last[1][1]), opt(least, st.stock[least] / st.use[least]), opt(most, st.stock[most] / st.use[most]), opt(lim, st.stock[lim] / total), opt(last.at(-1)[0], last.at(-1)[1]), opt(lim, st.stock[lim] * st.use[lim]), opt(last[1][0], st.stock[last[1][0]]), opt(lim, st.stock[lim] / st.use[last[1][0]]), opt(lim, t + last[1][1]), opt(last[1][0], st.stock[last[1][0]] / st.use[lim])];
        const o = options(R, 0, wrong.map((_, i) => i + 1), v => v ? wrong[v - 1] : opt(lim, t));
        if (o) out.push({ id: 'limitante', unit: 'chemistry-14', title: 'Merce limitante', ...o,
            prompt: `${who} lavora con il processo «${st.process}». A pieno ritmo consuma ogni secondo ${listUse}. ${where} ${listStock}. Senza nuove consegne, quale merce finisce per prima, e dopo quanti secondi?`,
            steps: [`Per ogni merce si divide la scorta per il consumo al secondo: ${last.map(([r, v]) => `${name(r)} ${st.stock[r]} / ${rate(st.use[r])} = ${dec(v, 1)} s`).join('; ')}.`, `Il tempo più breve decide: la merce ${name(lim)} finisce dopo circa ${T} s. È la merce limitante, come il reagente limitante di una reazione; le altre restano in eccesso.`, 'La merce con la scorta più piccola può durare di più, se il suo consumo è più lento.'] });
        // 2. Excess: what is left of the input that lasts longest when the limiting one runs out.
        const [ex] = last.at(-1), left = st.stock[ex] - st.use[ex] * T;
        const o2 = options(R, left, [st.use[ex] * T, st.stock[ex] - st.use[lim] * T, st.stock[ex], st.stock[ex] - st.stock[lim], st.stock[ex] - st.use[ex] * T / 2].filter(v => v >= 0), v => dec(v, 1));
        if (o2 && last.at(-1)[1] > T + 1) out.push({ id: 'eccesso', unit: 'chemistry-14', title: 'Merce in eccesso', ...o2,
            prompt: `${who} consuma ogni secondo ${listUse}. ${where} ${listStock}, e la merce ${name(lim)} finisce per prima dopo circa ${T} s. In quel momento quale quantità di ${name(ex)} resta in magazzino?`,
            steps: [`In ${T} s ${who} consuma ${rate(st.use[ex])} · ${T} = ${dec(st.use[ex] * T, 1)} di ${name(ex)}.`, `Resta ${st.stock[ex]} − ${dec(st.use[ex] * T, 1)} = ${dec(left, 1)}.`, st.strict ? `La merce ${name(ex)} è in eccesso: la produzione si ferma per mancanza di ${name(lim)}, e il resto aspetta in magazzino.` : `La merce ${name(ex)} è in eccesso. Senza ${name(lim)} questa stazione lavora a metà ritmo e continua a consumare le altre merci.`] });
    }
    // 3. Proportion between an input and the product, as between the amounts of a balanced equation.
    {
        const r = ins[Math.floor(R() * ins.length)], Q = [50, 100, 200, 400][Math.floor(R() * 4)], need = Q * st.use[r] / mk;
        const o = options(R, need, [Q * mk / st.use[r], Q * st.use[r], Q / st.use[r], Q * (mk - st.use[r]), Q * st.use[r] / (mk + st.use[r])], v => dec(v, 1));
        if (o) out.push({ id: 'proporzione', unit: 'chemistry-14', title: 'Proporzioni della ricetta', ...o,
            prompt: `${who} produce ${rate(mk)} di ${name(product)} al secondo consumando, fra l'altro, ${rate(st.use[r])} di ${name(r)} al secondo. Quale quantità di ${name(r)} serve per produrre ${Q} di ${name(product)}?`,
            steps: [`Il rapporto fra ${name(r)} e ${name(product)} resta fisso: ${rate(st.use[r])} / ${rate(mk)} = ${dec(st.use[r] / mk, 4)}.`, `Per ${Q} di ${name(product)}: ${Q} · ${dec(st.use[r] / mk, 4)} = ${dec(need, 1)} di ${name(r)}.`, 'È la stessa proporzione dei coefficienti di un\'equazione bilanciata: raddoppiando il prodotto raddoppiano i reagenti.'] });
    }
    // 4. Average rate from two readings of the store.
    {
        const a = st.stock[product] || 0, room = (st.cap[product] || a + 100) - a, T = [20, 30, 40, 60].filter(T => mk * T <= room).at(-1) || 10, b = Math.round((a + mk * T) * 10) / 10, v = (b - a) / T;
        const o = options(R, v, [b / T, (b - a) * T, a / T, (a + b) / 2 / T, T / (b - a)], x => rate(x));
        if (o && b > a) out.push({ id: 'velocita', unit: 'chemistry-17', title: 'Velocità media', ...o,
            prompt: `Durante ${T} s di lavoro a pieno ritmo il magazzino di ${name(product)} di ${who} passa da ${a} a ${dec(b, 1)}. Qual è la velocità media di produzione, in unità al secondo?`,
            steps: [`La velocità media è la variazione divisa per l'intervallo di tempo: (${dec(b, 1)} − ${a}) / ${T}.`, `${dec(b - a, 1)} / ${T} = ${rate(v)} unità al secondo.`, 'Con le concentrazioni al posto delle scorte è la definizione di velocità di reazione.'] });
    }
    // 5. Conditions that slow the work: a flare halves it, damage d slows it by 0.75 · d; the factors multiply.
    {
        const d = [.2, .4, .6][Math.floor(R() * 3)], f = 1 - THREAT.slow * d, v = mk * .5 * f;
        const o = options(R, v, [mk * (.5 - THREAT.slow * d), mk * .5, mk * .5 * (1 - d), mk * f, mk * (1 - THREAT.slow * d - .5 * d)], x => rate(x));
        if (o) out.push({ id: 'condizioni', unit: 'chemistry-17', title: 'Condizioni e velocità', ...o,
            prompt: `${who} produce ${rate(mk)} di ${name(product)} al secondo. Un brillamento della stella dimezza il ritmo, e un danno del ${Math.round(d * 100)} % lo rallenta di ${dec(THREAT.slow, 2)} · ${dec(d, 1)}, cioè del ${Math.round(THREAT.slow * d * 100)} %. Con entrambi, a quale velocità produce?`,
            steps: [`Il danno lascia ${dec(f, 2)} del ritmo: 1 − ${dec(THREAT.slow * d, 2)} = ${dec(f, 2)}.`, `I fattori si moltiplicano: ${rate(mk)} · 0,5 · ${dec(f, 2)} = ${rate(v)} unità al secondo.`, 'Come temperatura e catalizzatori in una reazione, le condizioni cambiano la velocità senza cambiare la ricetta.'] });
    }
    return out;
}
