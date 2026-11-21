/** The Sciame della Frontiera (1.49.0): a synthetic intelligence come from the edge of the galaxy, which
 * turns matter into substrate for computation. It is a swarm of self-replicating probes, in the sense John
 * von Neumann gave to machines that build copies of themselves from raw material: its drones grow from the
 * rock of asteroids like crystals and return to dust when their task is done. Its hunger has a physical
 * reason: erasing one bit costs at least kT ln 2 of energy (Landauer's limit), so cold matter and the
 * removal of heat are what a growing computation needs.
 *
 * This module keeps the front at the scale of the galaxy. Each discipline arm has a front line, counted in
 * systems from its last system, the farthest from the core; at most the last four systems of an arm are
 * contested. Incursions strike the system on the front line: when the system is open the battle is fought
 * in its economy (src/craft/threats.js, kind 'incursione'), otherwise the outcome comes from the defence
 * power of its fleet. A repelled incursion moves the front back, a successful one converts some stations of
 * the system for a while and moves the front forward; no system is lost for ever. The record of events is
 * the Cronaca della frontiera.
 *
 * From 1.50.0 the Sciame learns and the galaxy answers. The Sciame weighs the arms by its results and
 * strikes more often where it has won, and it changes its protocol as the defence uses a key against it.
 * The defence recovers about a sixth of the drones it destroys; the laboratories study these samples and,
 * every twelve samples, derive a key that couriers carry to the front of each arm, as soon as the last key
 * has lost strength. Drones reached by the key lose
 * their link with the Sciame and stay in the system as free drones, which help with repairs and mining. The
 * Rapporto gives a statistical forecast of the next incursion, in the spirit of a prediction that holds for
 * many events and not for one, and keeps the score of its forecasts. */
import { seededRandom, AREAS, DISCIPLINE_NAMES } from '../scene/layout.js';
import { frontierRank, systemDefence, systemDefenceShips } from './catalog.js';
import { POWER, THREAT } from './threats.js';

export const SWARM = { first: [150, 240], every: [170, 300], depth: 3, wave: [9, 14], rise: 1.4, cap: 30, convert: 300, grace: 25,
    // Learning (1.50.0): weight of an arm after a success and after a defeat, within these bounds.
    learn: { win: 1.35, loss: .8, min: .25, max: 4 },
    // Keys: a sixth of the destroyed drones are recovered; twelve samples give a key, carried to each arm in
    // 60-150 s, once the newest key has lost strength; a key frees part of a wave and loses strength each time
    // it is used.
    key: { capture: .16, samples: 12, renew: .3, strength: .5, share: .6, decay: .85, obsolete: .15, delivery: [60, 150] },
    freedCap: 40 };
const ARMS = DISCIPLINE_NAMES.map(n => 'della ' + n);
const range = (R, [a, b]) => a + (b - a) * R();
/** Defence power of a system in the model of the galaxy: the four strongest classes of its fleet, which are
 * the ships the defence sends against an incursion, and its platforms and fortresses. */
export function defencePower(system) {
    const ships = systemDefenceShips(system).map(e => POWER[e.type] || 4).sort((a, b) => b - a).slice(0, 4).reduce((a, b) => a + b, 0);
    const guns = systemDefence(system).reduce((a, e) => a + (POWER[e.type] || 0), 0);
    return { ships, guns };
}
/** Longest time an incursion takes in a system, from the growth of the drones to their return to dust. */
export const raidLength = () => THREAT.raid.growth + THREAT.raid.flight[1] + THREAT.raid.attach + 6;

export class Frontier {
    constructor(seed, time = 0) {
        this.rng = seededRandom((seed ^ 0x5C1A3E) >>> 0); this.time = time; this.next = time + range(this.rng, SWARM.first);
        this.depth = [0, 0, 0, 0]; this.raids = []; this.converted = new Map(); this.log = []; this.serial = 0; this.count = 0;
        this.stats = { raids: 0, repelled: 0, converted: 0, live: 0, advances: 0, retreats: 0, drones: 0, downed: 0, samples: 0, keys: 0, freed: 0 };
        this.weights = [1, 1, 1, 1]; this.favourite = -1; this.samples = 0; this.progress = 0; this.keys = []; this.deliveries = []; this.freed = new Map(); this.record = [];
        // The systems of each arm, from the frontier inwards.
        this.arms = [0, 1, 2, 3].map(k => AREAS.map((a, i) => i).filter(i => AREAS[i].sector === k).sort((a, b) => frontierRank(a) - frontierRank(b)));
        this.tell('Lo Sciame della Frontiera si muove ai margini della galassia: cerca materia fredda da trasformare in calcolo');
    }
    tell(text, system = null) { this.log.push({ n: ++this.serial, time: this.time, text, system }); if (this.log.length > 40) this.log.shift(); }
    /** System on the front line of arm k. */
    front(k) { return this.arms[k][this.depth[k]]; }
    /** 1 for a system with converted stations, 0.8 under an incursion, 0.4 for a contested system, else 0. */
    pressure(system) {
        if (this.converted.has(system)) return 1;
        if (this.raids.some(r => !r.settled && r.system === system)) return .8;
        const k = AREAS[system].sector; return frontierRank(system) <= this.depth[k] ? .4 : 0;
    }
    /** Systems where the Sciame is present: contested, under incursion or with converted stations. */
    contested() { return AREAS.map((a, i) => i).filter(i => this.pressure(i) > 0); }
    /** Runs the front to `time`; `open` is the system shown in the scene, whose incursion may be fought live. */
    update(time, open = null) {
        if (!(time > this.time)) return this;
        const due = r => r.due + (r.live && r.system === open ? SWARM.grace : 0);
        for (;;) {
            const pending = this.raids.filter(r => !r.settled), next = Math.min(this.next, ...pending.map(due), ...this.converted.values(), ...this.deliveries.map(d => d.at));
            if (next > time) break;
            this.time = Math.max(this.time, next);
            if (this.next <= this.time) this.launch();
            for (const r of pending) if (!r.settled && due(r) <= this.time) this.resolve(r);
            for (const [system, until] of [...this.converted]) if (until <= this.time) { this.converted.delete(system); this.tell(`Il sistema ${AREAS[system].name} torna libero dallo Sciame`, system); }
            for (const d of [...this.deliveries]) if (d.at <= this.time) { this.deliveries.splice(this.deliveries.indexOf(d), 1); d.key.arms.add(d.arm); this.tell(`Un corriere porta la chiave ${d.key.version} al fronte del braccio ${ARMS[d.arm]}`, this.front(d.arm)); }
        }
        this.time = time; this.raids = this.raids.filter(r => !r.settled || time - r.settledAt < 90);
        return this;
    }
    /** A new incursion on the front line of one arm; the waves grow with every incursion. */
    launch() {
        // The arm comes from the weights the Sciame has learned; the forecast is written down before the draw.
        const R = this.rng, total = this.weights.reduce((a, b) => a + b, 0); let u = R() * total, k = 0; while (k < 3 && u >= this.weights[k]) { u -= this.weights[k]; k++; }
        // The most likely arms, all of them when tied: `max` is the probability that one of them is struck.
        const fc = this.forecast(), forecast = fc[k], best = Math.max(...fc.map(f => f.p)), top = fc.filter(f => f.p >= best - 1e-12);
        const system = this.front(k), n = Math.min(SWARM.cap, Math.round(range(R, SWARM.wave) + SWARM.rise * this.count));
        const r = { id: ++this.count, arm: k, system, n, t0: this.time, due: this.time + raidLength() + 5, live: false, settled: false, outcome: null, killed: 0, freed: 0, forecast: { p: forecast.p, repel: forecast.repel, max: top.reduce((a, f) => a + f.p, 0), top: top.includes(forecast) } };
        this.raids.push(r); this.stats.raids++; this.stats.drones += n; this.next = this.time + range(R, SWARM.every);
        this.tell(`Lo Sciame lancia ${n} droni contro il sistema ${AREAS[system].name}`, system);
        return r;
    }
    /** The incursion is fought in the open system from now on: its end moves with the battle. */
    goLive(r, time) { r.live = true; r.due = Math.max(r.due, time + raidLength() + 5); this.stats.live++; }
    /** Key of an arm: the newest key delivered there that still works, or null. */
    keyOf(arm) { const key = this.keys.filter(x => x.arms.has(arm) && x.strength >= SWARM.key.obsolete).at(-1); return key || null; }
    /** Drones of a wave of n that the key of the arm frees before the battle. */
    freedBy(arm, n) { const key = this.keyOf(arm); return key ? Math.round(n * key.strength * SWARM.key.share) : 0; }
    /** Outcome in the model of the galaxy: the key frees part of the wave, then the defence power, with
     * chance, against three units per drone. */
    resolve(r) {
        const R = this.rng, { ships, guns } = defencePower(r.system), power = ships * (.7 + .5 * R()) + (R() < .5 ? guns : 0), freed = this.freedBy(r.arm, r.n);
        const killed = Math.min(r.n - freed, Math.floor(power / THREAT.raid.hp));
        this.settle(r, killed >= r.n - freed ? 'respinta' : 'conversione', killed, freed);
    }
    /** Records the outcome of an incursion, fought live or in the model, and moves the front. */
    settle(r, outcome, killed, freed = 0) {
        if (r.settled) return;
        Object.assign(r, { settled: true, settledAt: this.time, outcome, killed, freed }); this.stats.downed += killed;
        const name = AREAS[r.system].name, k = r.arm, d = this.depth[k];
        this.record.push({ id: r.id, system: r.system, arm: k, n: r.n, outcome, killed, freed, forecast: r.forecast }); if (this.record.length > 60) this.record.shift();
        if (outcome === 'respinta') {
            this.stats.repelled++; this.depth[k] = Math.max(0, d - 1); if (this.depth[k] < d) this.stats.retreats++;
            this.tell(`Incursione respinta nel sistema ${name}: ${killed} droni distrutti su ${r.n}` + (this.depth[k] < d ? ', il fronte arretra' : ''), r.system);
        } else {
            this.stats.converted++; this.converted.set(r.system, this.time + SWARM.convert); this.depth[k] = Math.min(SWARM.depth, d + 1); if (this.depth[k] > d) this.stats.advances++;
            this.tell(`Lo Sciame converte stazioni nel sistema ${name}` + (this.depth[k] > d ? ': il fronte avanza' : ''), r.system);
        }
        this.learn(k, outcome);
        if (freed) this.free(r, freed);
        this.study(killed);
    }
    /** The Sciame weighs the arms by its results; the chronicle notes when its favourite arm changes. */
    learn(k, outcome) {
        const L = SWARM.learn; this.weights[k] = Math.min(L.max, Math.max(L.min, this.weights[k] * (outcome === 'conversione' ? L.win : L.loss)));
        const total = this.weights.reduce((a, b) => a + b, 0), best = this.weights.indexOf(Math.max(...this.weights));
        if (best !== this.favourite && this.weights[best] / total > .35) { this.favourite = best; this.tell(`Lo Sciame impara: concentra le incursioni sul braccio ${ARMS[best]}`); }
    }
    /** Free drones stay in the system; the key used loses strength, because the Sciame changes its protocol. */
    free(r, freed) {
        const have = this.freed.get(r.system) || 0, kept = Math.min(SWARM.freedCap - have, freed); this.freed.set(r.system, have + Math.max(0, kept)); this.stats.freed += freed;
        this.tell(`${freed} droni liberati dalla chiave restano nel sistema ${AREAS[r.system].name}: aiuteranno riparazioni e miniere`, r.system);
        const key = this.keyOf(r.arm); if (!key) return;
        key.uses++; key.strength *= SWARM.key.decay;
        if (key.strength < SWARM.key.obsolete) this.tell(`Lo Sciame cambia protocollo: la chiave ${key.version} non libera più droni`);
    }
    /** The defence recovers part of the destroyed drones; the laboratories turn the samples into keys. */
    study(killed) {
        const got = Math.round(killed * SWARM.key.capture); if (!got) return;
        this.samples += got; this.stats.samples += got; this.progress += got / SWARM.key.samples;
        while (this.progress >= 1 && !(this.keys.at(-1)?.strength >= SWARM.key.renew)) {
            this.progress -= 1;
            const version = this.keys.length + 1, lab = this.arms[this.weights.indexOf(Math.max(...this.weights))].at(-1), key = { version, strength: SWARM.key.strength, uses: 0, made: this.time, lab, arms: new Set() };
            this.keys.push(key); this.stats.keys++;
            this.tell(`I laboratori del sistema ${AREAS[lab].name} ricavano la chiave ${version} dai droni catturati`, lab);
            for (let k = 0; k < 4; k++) this.deliveries.push({ key, arm: k, at: this.time + range(this.rng, SWARM.key.delivery) });
        }
        // Samples beyond one key wait for the key in use to wear out; they do not pile up.
        this.progress = Math.min(1, this.progress);
    }
    /** Forecast of the next incursion, one row per arm: the system on the front line, the probability that
     * the Sciame strikes there (its learned weights), the expected wave, the drones the key would free and the
     * probability that the defence repels it, from the model of the galaxy averaged over its chance. */
    forecast() {
        const total = this.weights.reduce((a, b) => a + b, 0), lo = Math.min(SWARM.cap, Math.round(SWARM.wave[0] + SWARM.rise * this.count)), hi = Math.min(SWARM.cap, Math.round(SWARM.wave[1] + SWARM.rise * this.count));
        return [0, 1, 2, 3].map(arm => {
            const system = this.front(arm), { ships, guns } = defencePower(system); let repel = 0, cases = 0;
            for (let n = lo; n <= hi; n++) { const left = n - this.freedBy(arm, n); for (let i = 0; i < 40; i++) for (const g of [0, guns]) { cases++; if (Math.floor((ships * (.7 + .5 * (i + .5) / 40) + g) / THREAT.raid.hp) >= left) repel++; } }
            return { arm, system, p: this.weights[arm] / total, wave: [lo, hi], freed: Math.round((this.freedBy(arm, lo) + this.freedBy(arm, hi)) / 2), repel: repel / cases, key: this.keyOf(arm) };
        });
    }
    /** Score of the forecasts: how often the most likely arm (any of them, when tied) was struck against how often it was expected,
     * and the Brier score of the forecasts of repulse (0 is perfect, 0.25 is a coin). */
    score() {
        const r = this.record.filter(x => x.forecast); if (!r.length) return { n: 0, top: 0, expected: 0, brier: null };
        return { n: r.length, top: r.filter(x => x.forecast.top).length, expected: r.reduce((a, x) => a + x.forecast.max, 0) / r.length, brier: r.reduce((a, x) => a + (x.forecast.repel - (x.outcome === 'respinta' ? 1 : 0)) ** 2, 0) / r.length };
    }
    /** Short state for the diagnostics. */
    summary() { return { depth: [...this.depth], contested: this.contested().length, converted: this.converted.size, freedHere: [...this.freed.values()].reduce((a, b) => a + b, 0), ...this.stats }; }
}

const pct = v => Math.round(v * 100) + ' %', comma = v => v.toFixed(2).replace('.', ',');
/** The Rapporto (1.50.0): what the panel of the galaxy map shows, as plain data and as one text for the
 * accessible description. */
export function rapporto(F) {
    const rows = F.forecast().sort((a, b) => b.p - a.p).map(f => ({ arm: DISCIPLINE_NAMES[f.arm], system: AREAS[f.system].name, p: pct(f.p), wave: f.wave[0] === f.wave[1] ? String(f.wave[0]) : `${f.wave[0]}-${f.wave[1]}`, freed: f.freed, repel: pct(f.repel), key: f.key ? `chiave ${f.key.version}, forza ${pct(f.key.strength)}` : 'nessuna chiave' }));
    const sc = F.score(), next = Math.max(0, Math.round(F.next - F.time)), freed = [...F.freed.values()].reduce((a, b) => a + b, 0), total = F.weights.reduce((a, b) => a + b, 0);
    const recent = F.record.slice(-5).reverse().map(x => ({ system: AREAS[x.system].name, n: x.n, outcome: x.outcome === 'respinta' ? 'respinta' : 'conversione', predicted: x.forecast ? pct(x.forecast.repel) : '', freed: x.freed }));
    const score = sc.n ? `Su ${sc.n} incursioni il braccio più probabile, o uno dei più probabili a pari merito, è stato colpito ${sc.top} volte contro ${Math.round(sc.expected * sc.n)} attese; punteggio di Brier delle previsioni di esito ${comma(sc.brier)} (0 è perfetto, 0,25 è il caso).` : 'Nessuna incursione conclusa: il punteggio delle previsioni arriva con la prima.';
    const keys = `Campioni di droni catturati: ${F.samples}; ` + (F.progress >= 1 ? 'campioni sufficienti per una nuova chiave, pronta appena la chiave in uso perde efficacia' : `prossima chiave al ${pct(F.progress)}`) + `; chiavi ricavate: ${F.keys.length}; droni liberati: ${F.stats.freed}, di cui ${freed} al lavoro nei sistemi.`;
    const learning = DISCIPLINE_NAMES.map((n, k) => ({ arm: n, share: F.weights[k] / total }));
    const text = `Rapporto sullo Sciame della Frontiera. Prossima incursione fra circa ${next} s. ` + rows.map(r => `Braccio della ${r.arm}, sistema ${r.system}: probabilità ${r.p}, ondata di ${r.wave} droni, respinta con probabilità ${r.repel}, ${r.key}.`).join(' ') + ' ' + score + ' ' + keys;
    return { next, rows, recent, score, keys, learning, text };
}
