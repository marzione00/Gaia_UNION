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
 * the Cronaca della frontiera. */
import { seededRandom, AREAS } from '../scene/layout.js';
import { frontierRank, systemDefence, systemDefenceShips } from './catalog.js';
import { POWER, THREAT } from './threats.js';

export const SWARM = { first: [150, 240], every: [170, 300], depth: 3, wave: [9, 14], rise: 1.4, cap: 30, convert: 300, grace: 25 };
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
        this.stats = { raids: 0, repelled: 0, converted: 0, live: 0, advances: 0, retreats: 0, drones: 0, downed: 0 };
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
            const pending = this.raids.filter(r => !r.settled), next = Math.min(this.next, ...pending.map(due), ...this.converted.values());
            if (next > time) break;
            this.time = Math.max(this.time, next);
            if (this.next <= this.time) this.launch();
            for (const r of pending) if (!r.settled && due(r) <= this.time) this.resolve(r);
            for (const [system, until] of [...this.converted]) if (until <= this.time) { this.converted.delete(system); this.tell(`Il sistema ${AREAS[system].name} torna libero dallo Sciame`, system); }
        }
        this.time = time; this.raids = this.raids.filter(r => !r.settled || time - r.settledAt < 90);
        return this;
    }
    /** A new incursion on the front line of one arm; the waves grow with every incursion. */
    launch() {
        const R = this.rng, k = Math.floor(R() * 4), system = this.front(k), n = Math.min(SWARM.cap, Math.round(range(R, SWARM.wave) + SWARM.rise * this.count));
        const r = { id: ++this.count, arm: k, system, n, t0: this.time, due: this.time + raidLength() + 5, live: false, settled: false, outcome: null, killed: 0 };
        this.raids.push(r); this.stats.raids++; this.stats.drones += n; this.next = this.time + range(R, SWARM.every);
        this.tell(`Lo Sciame lancia ${n} droni contro il sistema ${AREAS[system].name}`, system);
        return r;
    }
    /** The incursion is fought in the open system from now on: its end moves with the battle. */
    goLive(r, time) { r.live = true; r.due = Math.max(r.due, time + raidLength() + 5); this.stats.live++; }
    /** Outcome in the model of the galaxy: the defence power, with chance, against three units per drone. */
    resolve(r) {
        const R = this.rng, { ships, guns } = defencePower(r.system), power = ships * (.7 + .5 * R()) + (R() < .5 ? guns : 0);
        const killed = Math.min(r.n, Math.floor(power / THREAT.raid.hp));
        this.settle(r, killed >= r.n ? 'respinta' : 'conversione', killed);
    }
    /** Records the outcome of an incursion, fought live or in the model, and moves the front. */
    settle(r, outcome, killed) {
        if (r.settled) return;
        Object.assign(r, { settled: true, settledAt: this.time, outcome, killed }); this.stats.downed += killed;
        const name = AREAS[r.system].name, k = r.arm, d = this.depth[k];
        if (outcome === 'respinta') {
            this.stats.repelled++; this.depth[k] = Math.max(0, d - 1); if (this.depth[k] < d) this.stats.retreats++;
            this.tell(`Incursione respinta nel sistema ${name}: ${killed} droni distrutti su ${r.n}` + (this.depth[k] < d ? ', il fronte arretra' : ''), r.system);
        } else {
            this.stats.converted++; this.converted.set(r.system, this.time + SWARM.convert); this.depth[k] = Math.min(SWARM.depth, d + 1); if (this.depth[k] > d) this.stats.advances++;
            this.tell(`Lo Sciame converte stazioni nel sistema ${name}` + (this.depth[k] > d ? ': il fronte avanza' : ''), r.system);
        }
    }
    /** Short state for the diagnostics. */
    summary() { return { depth: [...this.depth], contested: this.contested().length, converted: this.converted.size, ...this.stats }; }
}
