/** Life of a star system: the stations produce and consume goods, the ships carry them where they are
 * missing. Every run of the site starts from a different seed, so stocks, cargoes and routes change from one
 * visit to the next. Rates are per second of scene time; positions and distances come from the caller
 * (src/craft/placement.js and src/scene/world.js), so this module holds only the rules. */
import { seededRandom } from '../scene/layout.js';

/** Goods moved between stations, with their unit and the colour of the transfer seen near a station. */
export const RESOURCES = {
    minerale: { name: 'minerale', unit: 't', color: [.9, .62, .36, 1] },
    carburante: { name: 'carburante', unit: 't', color: [1, .72, .3, 1] },
    cibo: { name: 'cibo', unit: 't', color: [.5, .95, .55, 1] },
    energia: { name: 'energia', unit: 'celle', color: [.6, .85, 1, 1] },
    dati: { name: 'dati', unit: 'TB', color: [.82, .72, 1, 1] },
    parti: { name: 'parti di nave', unit: 'moduli', color: [.92, .92, .86, 1] },
    equipaggi: { name: 'equipaggi', unit: 'persone', color: [1, .86, .62, 1] }
};
/** What each station makes and uses per second, how much it can hold, the stock it asks for (want) and the
 * stock it keeps for itself before supplying others (keep, by default equal to want). Stations with
 * `inputs` stop producing when an input runs out. The passage gate imports food, fuel, energy cells and ore
 * from the other systems and exports data and ship parts. */
export const RECIPES = {
    miniera: { make: { minerale: 1.6 }, cap: { minerale: 240 } },
    raffineria: { make: { carburante: 1.4 }, cap: { carburante: 220 } },
    serra: { make: { cibo: 1 }, cap: { cibo: 160 } },
    centrale: { make: { energia: 1.2 }, cap: { energia: 160 } },
    telescopio: { make: { dati: .5 }, cap: { dati: 90 } },
    radiotelescopio: { make: { dati: .6 }, cap: { dati: 90 } },
    poliedrica: { make: { dati: .4 }, cap: { dati: 90 } },
    laboratorio: { make: { dati: .45 }, use: { energia: .15 }, inputs: true, cap: { dati: 90, energia: 60 }, want: { energia: 40 } },
    cantiere: { make: { parti: .25 }, use: { minerale: .9, energia: .3 }, inputs: true, cap: { parti: 40, minerale: 160, energia: 80 }, want: { minerale: 110, energia: 50 } },
    deposito: { cap: { carburante: 400 }, want: { carburante: 260 }, keep: { carburante: 110 } },
    habitat: { make: { equipaggi: .2 }, use: { cibo: .3, energia: .15 }, cap: { equipaggi: 50, cibo: 100, energia: 70 }, want: { cibo: 70, energia: 45 } },
    magazzino: { cap: { minerale: 200, cibo: 150, energia: 150, carburante: 200, parti: 60 }, want: { minerale: 110, cibo: 80, energia: 80, carburante: 110, parti: 30 }, keep: { minerale: 50, cibo: 35, energia: 35, carburante: 50, parti: 12 } },
    ripetitore: { use: { energia: .12 }, cap: { energia: 60 }, want: { energia: 40 } },
    porto: { make: { equipaggi: .25 }, use: { cibo: .3, carburante: .35, energia: .15 }, cap: { equipaggi: 60, cibo: 120, carburante: 160, energia: 80 }, want: { cibo: 80, carburante: 110, energia: 50 } },
    porta: { make: { equipaggi: .15, cibo: .25, carburante: .3, energia: .15, minerale: .3 }, use: { dati: .3, parti: .08 }, cap: { equipaggi: 40, cibo: 120, carburante: 140, energia: 80, minerale: 120, dati: 120, parti: 40 }, want: { dati: 80, parti: 25 }, keep: { cibo: 20, carburante: 40, energia: 20, minerale: 20 } }
};
/** Crews rotate on every station except the port and the gate, where they arrive. */
const CREW = { use: .06, cap: 24, want: 16 };
/** Ship classes: goods carried, capacity, cruise speed (system units per second), docking time (s) and
 * the behaviour when there is nothing to carry. */
export const FLEET = {
    navetta: { carries: ['equipaggi', 'cibo', 'energia'], capacity: 12, speed: 2.6, dock: 6, idle: 'transfer' },
    corriere: { carries: ['dati', 'equipaggi', 'energia'], capacity: 30, speed: 3.2, dock: 5, idle: 'transfer' },
    cargo: { carries: ['minerale', 'parti', 'cibo', 'energia'], capacity: 70, speed: 1.6, dock: 10, idle: 'wait' },
    cisterna: { carries: ['carburante'], capacity: 80, speed: 1.5, dock: 10, idle: 'wait' },
    rimorchiatore: { carries: ['minerale', 'parti'], capacity: 50, speed: 1.4, dock: 9, idle: 'wait' },
    scientifica: { carries: ['dati', 'energia'], capacity: 40, speed: 2, dock: 8, idle: 'survey' },
    esploratrice: { carries: ['dati'], capacity: 30, speed: 2.2, dock: 8, idle: 'survey' },
    passeggeri: { carries: ['equipaggi', 'cibo'], capacity: 40, speed: 2, dock: 9, idle: 'transfer' },
    posaboe: { carries: ['parti', 'energia'], capacity: 20, speed: 1.6, dock: 8, idle: 'buoys' },
    soccorso: { carries: ['energia', 'cibo', 'carburante'], capacity: 20, speed: 2.6, dock: 6, idle: 'patrol' },
    sonda: { carries: ['dati'], capacity: 15, speed: 2.4, dock: 4, idle: 'survey' },
    gru: { carries: ['parti', 'minerale', 'energia'], capacity: 30, speed: 1.2, dock: 12, idle: 'shipyard' }
};
const ROMAN = ['', ' II', ' III', ' IV', ' V', ' VI'];

/** Economy and traffic of one system. `stations` and `ships` are catalogue entries (src/craft/catalog.js);
 * `bodies` the slots of the planets ships may visit; `distance(a, b)` the current distance between two
 * places, where a place is { station: i } or { body: slot }. */
export class Economy {
    constructor({ stations, ships, bodies = [], seed = 1, time = 0, distance }) {
        this.rng = seededRandom(seed >>> 0); this.time = time; this.distance = distance; this.bodies = bodies;
        const R = this.rng;
        this.stations = stations.map((entry, i) => {
            const rec = RECIPES[entry.works || entry.type] || {}, crew = !rec.make?.equipaggi;
            const cap = { ...rec.cap, ...(crew ? { equipaggi: CREW.cap } : {}) }, want = { ...rec.want, ...(crew ? { equipaggi: CREW.want } : {}) }, use = { ...rec.use, ...(crew ? { equipaggi: CREW.use } : {}) };
            const stock = Object.fromEntries(Object.keys(cap).map(r => [r, Math.round(cap[r] * (.15 + .6 * R()))]));
            return { i, entry, make: rec.make || {}, use, inputs: !!rec.inputs, cap, want, keep: { ...want, ...rec.keep }, stock, reserved: {}, incoming: {}, producing: 0, missing: [] };
        });
        // With more stations than the six of the catalogue the gate exports more data and parts and imports
        // less, because the system makes more of its own goods.
        const busy = Math.max(1, this.stations.length / 6), gate = this.stations.find(s => s.entry.type === 'porta');
        if (gate) { gate.use = Object.fromEntries(Object.entries(gate.use).map(([r, v]) => [r, v * busy])); gate.make = Object.fromEntries(Object.entries(gate.make).map(([r, v]) => [r, v / busy])); }
        // Each catalogue ship sails with up to two sister ships of the same model, as chance has it; beyond the
        // six stations of the catalogue every five stations add one or two more sisters to each model.
        this.ships = []; const more = Math.max(0, (this.stations.length - 6) / 5);
        for (const entry of ships) {
            const copies = 1 + Math.floor(R() * (['cargo', 'cisterna', 'navetta', 'passeggeri'].includes(entry.type) ? 3 : 2)) + (more ? Math.round(more * (.5 + .5 * R())) : 0);
            for (let c = 0; c < copies; c++) {
                const start = { station: Math.floor(R() * this.stations.length) };
                this.ships.push({ id: this.ships.length, entry, name: entry.name + ROMAN[c], cls: FLEET[entry.type], phase: 'dock', at: start, task: 'sosta', t0: time, t1: time + 1 + R() * 12, cargo: null, job: null });
            }
        }
    }
    surplus(s, r) { return (s.stock[r] || 0) - (s.reserved[r] || 0) - (s.keep[r] || 0); }
    deficit(s, r) { return s.want[r] ? s.want[r] - (s.stock[r] || 0) - (s.incoming[r] || 0) : 0; }
    /** Advances the system to `time`, in steps of at most one second. */
    update(time) {
        let dt = time - this.time;
        if (!(dt > 0)) return this;
        // After a long absence the system jumps ahead: at most two minutes are simulated.
        if (dt > 120) { this.time = time - 120; dt = 120; }
        while (dt > 0) { const h = Math.min(1, dt); this.time += h; dt -= h; this.step(h); }
        return this;
    }
    step(h) {
        for (const s of this.stations) {
            // A station uses its inputs first; it produces only with all of them and with room in the store.
            const missing = s.inputs ? Object.keys(s.use).filter(r => r !== 'equipaggi' && (s.stock[r] || 0) < s.use[r] * h) : [];
            for (const [r, v] of Object.entries(s.use)) s.stock[r] = Math.max(0, (s.stock[r] || 0) - v * h);
            const room = Object.keys(s.make).some(r => (s.stock[r] || 0) < s.cap[r]);
            s.producing = Object.keys(s.make).length && !missing.length && room ? 1 : 0; s.missing = missing;
            if (s.producing) for (const [r, v] of Object.entries(s.make)) s.stock[r] = Math.min(s.cap[r], (s.stock[r] || 0) + v * h);
        }
        for (const ship of this.ships) if (this.time >= ship.t1) ship.phase === 'travel' ? this.arrive(ship) : this.finish(ship);
    }
    arrive(ship) {
        const job = ship.job, here = ship.to, s = here.station !== undefined ? this.stations[here.station] : null, D = ship.cls.dock * (.8 + .4 * this.rng());
        Object.assign(ship, { phase: 'dock', at: here, t0: this.time, t1: this.time + D });
        if (job && s && job.from === here.station && !ship.cargo) { s.stock[job.res] = Math.max(0, (s.stock[job.res] || 0) - job.amount); s.reserved[job.res] = Math.max(0, (s.reserved[job.res] || 0) - job.amount); ship.cargo = { res: job.res, amount: job.amount }; ship.task = 'carica'; }
        else if (ship.cargo && s && job?.to === here.station) ship.task = 'scarica';
        else if (here.body !== undefined) ship.task = 'osserva';
        else ship.task = 'sosta';
    }
    finish(ship) {
        const s = ship.at.station !== undefined ? this.stations[ship.at.station] : null;
        if (ship.task === 'scarica' && s && ship.cargo) {
            const { res, amount } = ship.cargo; s.stock[res] = Math.min(s.cap[res] ?? Infinity, (s.stock[res] || 0) + amount); s.incoming[res] = Math.max(0, (s.incoming[res] || 0) - amount);
            ship.cargo = null; ship.job = null;
        }
        // A survey brings back data from the planet it observed.
        if (ship.task === 'osserva') ship.cargo = { res: 'dati', amount: Math.round(8 + this.rng() * (ship.cls.capacity - 8)) };
        this.plan(ship);
    }
    /** Chooses the next leg of a ship and starts it. */
    plan(ship) {
        const R = this.rng, here = ship.at, cls = ship.cls;
        let to = null, job = ship.job;
        if (ship.cargo) {
            if (!job) job = ship.job = this.sinkFor(ship.cargo.res, ship.cargo.amount, here);
            if (job) to = { station: job.to };
            else { ship.cargo = null; }
        }
        if (!to && !ship.cargo) {
            const best = this.bestJob(ship);
            if (best) {
                ship.job = best; const src = this.stations[best.from], dst = this.stations[best.to];
                src.reserved[best.res] = (src.reserved[best.res] || 0) + best.amount; dst.incoming[best.res] = (dst.incoming[best.res] || 0) + best.amount;
                if (here.station === best.from) { this.toLeg(ship, here); this.arrive(ship); return; }
                to = { station: best.from };
            }
        }
        if (!to) to = this.idle(ship);
        if (!to) { Object.assign(ship, { phase: 'dock', task: 'sosta', t0: this.time, t1: this.time + 6 + R() * 10 }); return; }
        this.toLeg(ship, to);
    }
    toLeg(ship, to) {
        const d = this.distance(ship.at, to), T = d < 1e-6 ? 0 : 2 + d / ship.cls.speed;
        Object.assign(ship, { phase: T ? 'travel' : 'dock', from: ship.at, to, t0: this.time, t1: this.time + T });
    }
    /** The station that needs `res` most, for a cargo already on board. */
    sinkFor(res, amount, here) {
        let best = null, score = 0;
        for (const s of this.stations) { const need = this.deficit(s, res); if (need <= 0) continue; const v = Math.min(need, amount) / (1 + this.distance(here, { station: s.i })); if (v > score) { score = v; best = s; } }
        if (!best) best = this.stations.find(s => s.entry.type === 'porta' && (s.cap[res] ?? 0) > 0);
        if (!best) return null;
        best.incoming[res] = (best.incoming[res] || 0) + amount; return { res, amount, from: null, to: best.i };
    }
    /** Best transport job for an empty ship: amount over distance, with a little chance to vary the routes. */
    bestJob(ship) {
        const cls = ship.cls, min = Math.max(4, cls.capacity * .3); let best = null, score = 0;
        for (const res of cls.carries) for (const a of this.stations) {
            const have = this.surplus(a, res); if (have < min) continue;
            for (const b of this.stations) {
                if (b === a) continue; const need = this.deficit(b, res); if (need < min) continue;
                const amount = Math.round(Math.min(cls.capacity, have, need)), v = amount / (1 + this.distance(ship.at, { station: a.i }) + this.distance({ station: a.i }, { station: b.i })) * (.7 + .6 * this.rng());
                if (v > score) { score = v; best = { res, amount, from: a.i, to: b.i }; }
            }
        }
        return best;
    }
    /** Where a ship goes when there is nothing to carry. */
    idle(ship) {
        const R = this.rng, n = this.stations.length, here = ship.at.station, find = type => this.stations.find(s => s.entry.type === type)?.i;
        const other = () => { let k = Math.floor(R() * n); if (k === here) k = (k + 1) % n; return { station: k }; };
        switch (ship.cls.idle) {
            case 'transfer': return R() < .7 ? other() : null;
            case 'survey': return here !== undefined && this.bodies.length && R() < .75 ? { body: this.bodies[Math.floor(R() * this.bodies.length)] } : { station: find('porto') ?? 0 };
            case 'buoys': { const gate = find('porta'); return here === gate ? { station: find('porto') ?? 0 } : { station: gate ?? 0 }; }
            case 'patrol': return { station: ((here ?? -1) + 1) % n };
            case 'shipyard': { const yard = find('cantiere') ?? find('porto') ?? 0, port = find('porto') ?? 0; return here === yard ? (R() < .4 ? { station: port } : null) : { station: yard }; }
            default: return R() < .3 ? other() : null;
        }
    }
}

const fmt = v => Math.round(v).toLocaleString('it-IT');
/** Italian list: «a», «a e b», «a, b e c», with «ed» before a word starting with e. */
const list = items => items.length < 2 ? items.join('') : items.slice(0, -1).join(', ') + (/^e/i.test(items.at(-1)) ? ' ed ' : ' e ') + items.at(-1);
const departure = left => left > 0 ? `partenza fra ${left} s` : 'in partenza';
/** Two short lines on what a station is doing now. */
export function stationReport(s) {
    const kind = s.entry.works || s.entry.type, made = Object.keys(s.make).filter(r => r !== 'equipaggi' || kind === 'porto' || kind === 'habitat'), name = r => RESOURCES[r].name, unit = r => RESOURCES[r].unit;
    let first;
    if (kind === 'deposito') first = `Conserva carburante: ${fmt(s.stock.carburante)} su ${fmt(s.cap.carburante)} t`;
    else if (kind === 'porto') first = `${fmt(s.stock.equipaggi)} persone in attesa di imbarco`;
    else if (kind === 'habitat') first = `${fmt(s.stock.equipaggi)} persone pronte a imbarcarsi`;
    else if (kind === 'magazzino') first = `Smista merci: ${fmt(Object.values(s.stock).reduce((a, b) => a + b, 0) - (s.stock.equipaggi || 0))} unità in deposito`;
    else if (kind === 'ripetitore') first = (s.stock.energia || 0) > 1 ? 'Ritrasmette i segnali del sistema' : 'Ferma: manca energia';
    else if (s.entry.type === 'porta') first = 'Importa merci, esporta dati e parti';
    else if (!made.length) first = 'Nessuna produzione';
    else if (s.missing.length) first = `Ferma: ${s.missing.length > 1 ? 'mancano' : 'manca'} ${list(s.missing.map(name))}`;
    else if (!s.producing) first = `Magazzino pieno di ${name(made[0])}`;
    else first = `Produce ${name(made[0])}: ${fmt(s.stock[made[0]])} su ${fmt(s.cap[made[0]])} ${unit(made[0])}`;
    const needs = Object.keys(s.want).filter(r => (s.stock[r] || 0) < s.want[r] * .6 && r !== 'equipaggi');
    const second = needs.length ? `Chiede ${list(needs.map(name))}` : Object.keys(s.want).length ? 'Scorte sufficienti' : 'Carica le navi in arrivo';
    return [first, second];
}
/** Two short lines on what a ship is doing now; `placeName(place)` names a station or a planet. */
export function shipReport(ship, time, placeName) {
    const left = Math.max(0, Math.ceil(ship.t1 - time)), c = ship.cargo, load = c ? `${fmt(c.amount)} ${RESOURCES[c.res].unit} di ${RESOURCES[c.res].name}` : '';
    if (ship.phase === 'travel') {
        const where = placeName(ship.to);
        if (c) return [`Trasporta ${load}`, `Verso ${where}, arrivo fra ${left} s`];
        if (ship.job) return [`Va a caricare ${RESOURCES[ship.job.res].name}`, `Verso ${where}, arrivo fra ${left} s`];
        if (ship.to.body !== undefined) return ['Missione di osservazione', `Verso ${where}, arrivo fra ${left} s`];
        return ['In trasferimento', `Verso ${where}, arrivo fra ${left} s`];
    }
    const where = placeName(ship.at);
    if (ship.task === 'carica') return [`Carica ${load}`, `${where}, ${departure(left)}`];
    if (ship.task === 'scarica') return [`Scarica ${load}`, `${where}, ${departure(left)}`];
    if (ship.task === 'osserva') return [`Osserva ${where}`, left > 0 ? `Ripartenza fra ${left} s` : 'In partenza'];
    return [`In sosta: ${where}`, left > 0 ? `Partenza fra ${left} s` : 'In partenza'];
}
