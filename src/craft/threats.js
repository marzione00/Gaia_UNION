/** Natural threats (1.48.0): swarms of meteoroids and rogue asteroids that come from beyond the system
 * towards a station, and flares of the star. The defence fleet (src/craft/defence.js) meets swarms and
 * asteroids on their path: the surveillance station sees them as soon as they appear, without it they are
 * seen later; defensive platforms and fortresses near the target strike in the last seconds. What gets
 * through damages the station, which works more slowly until the ships bring parts for the repairs. A flare
 * halves the work of the stations for 45 s, apart from the defensive stations and the stations covered by a
 * shield generator. The threats have their own random source, so they change the economy only through
 * their effects. Positions come from `economy.position(place)`. */
import { seededRandom } from '../scene/layout.js';

export const THREAT = {
    first: [80, 140], every: [220, 400], weights: [['sciame', .5], ['asteroide', .3], ['brillamento', .2]],
    flight: { sciame: [48, 62], asteroide: [56, 72] }, fragments: [14, 24], pass: .7, window: [5, 3],
    flare: { length: 45, speed: 2.4, cover: 14 }, beyond: 12,
    damage: { fragment: .04, asteroid: .6, cap: .8, hardened: .5, loss: .3 }, slow: .75,
    // Incursions of the Sciame della Frontiera (1.49.0, src/craft/swarm.js): drones grow at a rock beyond the
    // system for `growth` seconds, fly to a station, and those that get through convert it for `attach`
    // seconds; each drone takes `hp` units of defence power to destroy.
    raid: { growth: 12, flight: [50, 62], hp: 3, attach: 40, drain: .004, harm: .06, defenders: 6 }
};
/** What one ship or station of the defence destroys in a pass: fragments of a swarm, and against a rogue
 * asteroid at least 8 is needed (from the frigate up, or a fortress near the target). */
export const POWER = { caccia: 6, intercettore: 5, pattugliatore: 4, corvetta: 6, fregata: 8, cacciatorpediniere: 10, incrociatore: 12, incrociatorePesante: 14, corazzata: 16, portaerei: 12, superportaerei: 18, piattaforma: 6, fortezza: 10 };
export const THREAT_NAMES = { sciame: 'Sciame di meteoroidi', asteroide: 'Asteroide vagante', brillamento: 'Brillamento della stella', incursione: 'Incursione dello Sciame' };
const WHAT = { sciame: 'lo sciame di meteoroidi', asteroide: 'l\'asteroide vagante', incursione: 'i droni dello Sciame' };
const range = (R, [a, b]) => a + (b - a) * R();
const lerp = (a, b, u) => a.map((v, i) => v + (b[i] - v) * u);
const dist = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);

export class Threats {
    constructor(economy, seed, time) {
        this.E = economy; this.rng = seededRandom((seed ^ 0x7A11C0DE) >>> 0); this.events = []; this.next = time + range(this.rng, THREAT.first); this.nextId = 1;
        this.log = { sciame: 0, asteroide: 0, brillamento: 0, incursione: 0, fragments: 0, killed: 0, hits: 0, destroyed: 0, impacts: 0, repairs: 0, drones: 0, downed: 0, repelled: 0, converted: 0 };
        this.onRaid = null;
    }
    /** Events still drawn: active ones and those ended in the last few seconds. */
    get active() { return this.events; }
    find(id) { return this.events.find(e => e.id === id) || null; }
    /** A flare is under way and does not cover station `s`. */
    flared(s) { return this.events.some(e => e.kind === 'brillamento' && this.E.time < e.tEnd && !e.covered.has(s.i)); }
    step() {
        const E = this.E, t = E.time;
        if (t >= this.next) { const R = this.rng; let u = R(), kind = THREAT.weights[0][0]; for (const [k, w] of THREAT.weights) { if (u < w) { kind = k; break; } u -= w; } this.spawn(kind); this.next = t + range(R, THREAT.every); }
        for (const ev of this.events) {
            if (ev.kind === 'brillamento') continue;
            if (!ev.dispatched && t >= ev.detected) this.dispatch(ev);
            if (!ev.resolved && t >= ev.tPass - THREAT.window[0]) this.resolve(ev);
            if (!ev.done && t >= ev.tImpact) this.impact(ev);
            if (ev.kind === 'incursione' && ev.done && !ev.finished && t >= ev.tImpact + THREAT.raid.attach) this.release(ev);
        }
        this.events = this.events.filter(e => t < e.tEnd + 4);
    }
    /** A new threat. `kind` is chosen by the schedule, or given by a test or a demonstration; an incursion of
     * the Sciame comes from src/craft/swarm.js with its number of drones in `opts.n` and its record in
     * `opts.raid`. */
    spawn(kind, opts = {}) {
        const E = this.E, R = this.rng, t = E.time, id = this.nextId++;
        this.log[kind]++;
        if (kind === 'brillamento') {
            // Stations within the cover of a working shield generator, and the hardened defensive stations.
            const shields = E.stations.filter(s => s.entry.works === 'difesa-scudo' && !s.missing.length).map(s => E.position({ station: s.i }));
            const covered = new Set(E.stations.filter(s => s.entry.defence || shields.some(p => dist(p, E.position({ station: s.i })) <= THREAT.flare.cover)).map(s => s.i));
            const ev = { id, kind, name: THREAT_NAMES[kind], t0: t, tEnd: t + THREAT.flare.length, covered, shields: shields.length };
            this.events.push(ev);
            E.tell(`Brillamento della stella: produzione a metà per ${THREAT.flare.length} s` + (shields.length ? ', scudo acceso' : ''));
            return ev;
        }
        const targets = E.stations.filter(s => s.entry.type !== 'porta'), target = targets[Math.floor(R() * targets.length)];
        const reach = Math.max(...E.stations.map(s => Math.hypot(...E.position({ station: s.i })))) + THREAT.beyond, a = R() * Math.PI * 2;
        const from = [Math.cos(a) * reach, (R() - .5) * 3, Math.sin(a) * reach], aim = E.position({ station: target.i }), at = lerp(from, aim, THREAT.pass);
        const raid = kind === 'incursione', flight = range(R, raid ? THREAT.raid.flight : THREAT.flight[kind]), n = raid ? opts.n : kind === 'sciame' ? Math.round(range(R, THREAT.fragments)) : 1;
        // With a working surveillance station the defence moves at once; otherwise when the threat has covered
        // a third of its way. The drones of an incursion first grow at their rock, in plain sight.
        const watch = E.stations.some(s => s.entry.works === 'difesa-sorveglianza' && !s.missing.length), go = raid ? t + THREAT.raid.growth : t;
        const ev = { id, kind, name: THREAT_NAMES[kind], t0: t, tLaunch: go, tPass: go + flight * THREAT.pass, tImpact: go + flight, tEnd: go + flight + (raid ? THREAT.raid.attach + 6 : 6), target: target.i, from, at, n, detected: raid ? (watch ? t : go) : t + (watch ? 0 : flight * .3), watch, killed: 0, kills: [], defenders: [], hits: 0, outcome: null, raid: opts.raid || null, freed: 0, frees: [] };
        // Drones reached by the key of the arm (1.50.0) break away a few seconds after the launch.
        if (raid && opts.freed) { ev.freed = Math.min(n, opts.freed); for (let k = 0; k < ev.freed; k++) ev.frees.push({ j: n - 1 - k, t: go + 5 + 6 * (k + .5) / ev.freed }); }
        this.events.push(ev);
        if (raid) { this.log.drones += n; E.tell(`Lo Sciame della Frontiera fa crescere ${n} droni oltre il sistema: obiettivo ${target.entry.name}`); }
        else E.tell(`${ev.name} in arrivo su ${target.entry.name}: impatto fra ${Math.round(flight)} s`);
        return ev;
    }
    /** Defence ships sent to the point where the threat will pass: the ones that get there first, up to four
     * against a swarm and two against an asteroid, where the heavier ships come first. */
    dispatch(ev) {
        const E = this.E, t = E.time, point = { point: ev.at, threat: ev.id }; ev.dispatched = true;
        const free = E.ships.filter(s => s.cls.idle === 'guard' && !(s.alert && this.find(s.alert) && t < this.find(s.alert).tPass));
        const eta = s => Math.max(0, (s.phase === 'travel' ? s.t1 - t : 0)) + 2 + E.distance(s.phase === 'travel' ? s.to : s.at, point) / s.cls.speed;
        const power = s => POWER[s.entry.type] || 4;
        let pool = free.map(s => ({ s, eta: eta(s) })).filter(o => t + o.eta < ev.tPass - 2);
        if (ev.kind === 'asteroide') { const heavy = pool.filter(o => power(o.s) >= 8); if (heavy.length) pool = heavy; }
        pool.sort((a, b) => a.eta - b.eta);
        for (const { s } of pool.slice(0, ev.kind === 'sciame' ? 4 : ev.kind === 'incursione' ? THREAT.raid.defenders : 2)) {
            s.alert = ev.id; s.alertKind = ev.kind; ev.defenders.push(s.id);
            if (s.phase === 'dock') s.t1 = t;
        }
        if (ev.defenders.length) E.tell(`Flotta in volo contro ${WHAT[ev.kind]}: ${ev.defenders.length} ${ev.defenders.length > 1 ? 'navi' : 'nave'}`);
    }
    /** At the start of the pass the ships in position decide the outcome; platforms and fortresses within 10
     * units of the target strike in the last seconds before the impact. Kill times are kept for the scene. */
    resolve(ev) {
        const E = this.E; ev.resolved = true;
        const present = ev.defenders.map(i => E.ships[i]).filter(s => s && s.phase === 'dock' && s.at.point && s.alert === ev.id);
        const near = E.stations.filter(s => (s.entry.type === 'piattaforma' || s.entry.type === 'fortezza') && !s.missing.length && dist(E.position({ station: s.i }), E.position({ station: ev.target })) <= 10);
        const fleet = present.reduce((n, s) => n + (POWER[s.entry.type] || 4), 0), guns = near.reduce((n, s) => n + POWER[s.entry.type], 0);
        const [before, after] = THREAT.window, start = ev.tPass - before, span = before + after, last = ev.tImpact - 6;
        if (ev.kind === 'sciame' || ev.kind === 'incursione') {
            // A fragment falls to one unit of power, a drone to three.
            const hp = ev.kind === 'incursione' ? THREAT.raid.hp : 1, left = ev.n - (ev.freed || 0), byFleet = Math.min(left, Math.floor(fleet / hp)), byGuns = Math.min(left - byFleet, Math.floor(guns / hp));
            for (let j = 0; j < byFleet; j++) ev.kills.push({ j, t: start + span * (j + .5) / byFleet, by: { ship: present[j % present.length].id } });
            for (let j = 0; j < byGuns; j++) ev.kills.push({ j: byFleet + j, t: last + 5 * (j + .5) / byGuns, by: { station: near[j % near.length].i } });
            ev.killed = byFleet + byGuns;
            if (byFleet) E.tell(ev.kind === 'incursione' ? `La flotta intercetta i droni: ${byFleet} distrutti su ${ev.n}` : `La flotta intercetta lo sciame: ${byFleet} frammenti su ${ev.n}`);
        } else {
            const best = present.reduce((m, s) => !m || (POWER[s.entry.type] || 4) > (POWER[m.entry.type] || 4) ? s : m, null), fort = near.find(s => POWER[s.entry.type] >= 8);
            if (best && fleet >= 8) ev.kills.push({ j: 0, t: ev.tPass, by: { ship: best.id } });
            else if (fort) ev.kills.push({ j: 0, t: last + 3, by: { station: fort.i } });
            ev.killed = ev.kills.length;
        }
    }
    /** End of the path: what was not destroyed hits the target. */
    impact(ev) {
        const E = this.E, s = E.stations[ev.target], D = THREAT.damage; ev.done = true;
        ev.hits = ev.n - (ev.freed || 0) - ev.killed;
        if (ev.kind === 'incursione') {
            if (ev.freed) E.helpers = (E.helpers || 0) + ev.freed;
            this.log.downed += ev.killed;
            if (!ev.hits) { this.log.repelled++; ev.outcome = 'respinta'; ev.finished = true; E.tell(`Incursione respinta: ${ev.killed} droni distrutti su ${ev.n}`); this.onRaid?.(ev); return; }
            this.log.converted++; ev.outcome = 'conversione'; s.converted = { until: ev.tImpact + THREAT.raid.attach, drones: ev.hits };
            E.tell(`${ev.hits} ${ev.hits > 1 ? 'droni' : 'drone'} su ${s.entry.name}: la materia diventa substrato di calcolo`); return;
        }
        this.log.fragments += ev.kind === 'sciame' ? ev.n : 0; this.log.killed += ev.kind === 'sciame' ? ev.killed : 0;
        if (ev.kind === 'asteroide') {
            if (ev.killed) { this.log.destroyed++; const k = ev.kills[0].by; ev.outcome = 'distrutto'; E.tell(`${ev.name} distrutto da ${k.ship !== undefined ? E.ships[k.ship].name : E.stations[k.station].entry.name}`); return; }
            this.log.impacts++; ev.outcome = 'impatto'; this.harm(s, D.asteroid);
            for (const r of Object.keys(s.stock)) s.stock[r] = Math.max(s.reserved[r] || 0, s.stock[r] * (1 - D.loss));
            E.tell(`${ev.name} su ${s.entry.name}: danni al ${Math.round(s.damage * 100)} %`); return;
        }
        this.log.hits += ev.hits;
        if (!ev.hits) { ev.outcome = 'fermato'; E.tell(`Sciame fermato: ${ev.killed} frammenti distrutti su ${ev.n}`); return; }
        ev.outcome = 'impatto'; this.harm(s, ev.hits * D.fragment);
        E.tell(`${ev.hits} ${ev.hits > 1 ? 'frammenti' : 'frammento'} su ${s.entry.name}: danni al ${Math.round(s.damage * 100)} %`);
    }
    /** End of a conversion: the drones return to dust and leave damage behind. */
    release(ev) {
        const E = this.E, s = E.stations[ev.target]; ev.finished = true; s.converted = null;
        this.harm(s, ev.hits * THREAT.raid.harm);
        E.tell(`I droni su ${s.entry.name} tornano polvere: danni al ${Math.round(s.damage * 100)} %`); this.onRaid?.(ev);
    }
    /** Damage to a station: defensive stations are hardened and take half. Repairs need parts. */
    harm(s, amount) {
        const D = THREAT.damage;
        s.damage = Math.min(D.cap, (s.damage || 0) + amount * (s.entry.defence ? D.hardened : 1));
        s.repair = { parti: Math.round(5 + s.damage * 25) }; this.E.ask(s);
    }
    /** Repairs: when the parts are in store the station is whole again. */
    mend(s) {
        if (!s.repair || (s.stock.parti || 0) < s.repair.parti) return;
        s.stock.parti -= s.repair.parti; s.damage = 0; s.repair = null; this.E.ask(s); this.log.repairs++;
        this.E.tell(`Riparazioni concluse su ${s.entry.name}`);
    }
    /** Position of fragment `j` of event `ev` at `time`, given the position of its target now: along the
     * path to the point where the defence waits, then towards the target, with the spread of the swarm. */
    static fragment(ev, j, time, target) {
        const t0 = ev.tLaunch ?? ev.t0, u = Math.max(0, Math.min(1, (time - t0) / (ev.tImpact - t0))), p = THREAT.pass;
        const c = u <= p ? lerp(ev.from, ev.at, u / p) : lerp(ev.at, target, (u - p) / (1 - p));
        if (ev.kind !== 'sciame' && ev.kind !== 'incursione') return c;
        const h = q => { const v = Math.sin(ev.id * 91.7 + j * 37.3 + q * 11.1) * 43758.5; return v - Math.floor(v) - .5; }, spread = (ev.kind === 'incursione' ? 1.1 : .7) * (1 - .6 * u);
        return [c[0] + h(1) * spread * 2, c[1] + h(2) * spread, c[2] + h(3) * spread * 2];
    }
}
export { WHAT as THREAT_TARGETS };
