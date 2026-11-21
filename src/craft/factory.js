/** Builds the craft models away from the drawing loop. In a browser the models are made by a module worker
 * (src/craft/worker.js) and arrive with their buffers transferred, two jobs at a time so that a new request
 * never waits behind a long queue. Without workers (Node tests, a browser that refuses module workers, or
 * after a worker error) one job is built on the main thread at each call of `pump()`, that is once per frame.
 * Jobs for the low level of detail go before the full models. */
import { CATALOG, EXTRAS, build } from './catalog.js';
import { pack } from './kit.js';

const BY_ID = new Map([...CATALOG, ...EXTRAS].map(e => [e.id, e]));
const clock = () => globalThis.performance?.now() ?? Date.now();

/** Model of one job ({id, detail}), packed for the GPU. */
export function make(job) {
    const entry = BY_ID.get(job.id);
    if (!entry) throw Error('Voce del catalogo sconosciuta: ' + job.id);
    return pack(build(entry, entry.seed, { detail: job.detail }));
}
/** The array buffers of a packed model, to be transferred instead of copied. */
export function buffers(model) {
    const meshes = [model.body, model.field, ...model.spinning.map(p => p.mesh)].filter(Boolean);
    return meshes.flatMap(m => [m.v.buffer, m.i.buffer]);
}

export class CraftFactory {
    constructor({ worker = typeof Worker === 'function' } = {}) {
        this.queue = []; this.done = new Map(); this.busy = new Map(); this.failed = new Set(); this.generation = 0; this.worker = null;
        this.stats = { built: 0, worker: false, ms: 0, worst: 0, failed: 0 };
        if (worker) this.start();
    }
    start() {
        try {
            const w = new Worker(new URL('./worker.js', import.meta.url), { type: 'module' });
            w.onmessage = ({ data }) => this.receive(data);
            w.onerror = e => { e.preventDefault?.(); this.stop(); };
            this.worker = w; this.stats.worker = true;
        } catch { this.worker = null; }
    }
    /** Back to the main thread: the jobs that were at the worker go to the front of the queue. */
    stop() {
        this.worker?.terminate(); this.worker = null; this.stats.worker = false;
        this.queue.unshift(...this.busy.values()); this.busy.clear();
    }
    key(entry, detail) { return entry.id + '@' + detail; }
    /** Ask for the model of `entry` at `detail`; asking again for a model already queued, built or failed does nothing. */
    want(entry, detail) {
        const key = this.key(entry, detail);
        if (this.done.has(key) || this.busy.has(key) || this.failed.has(key) || this.queue.some(j => j.key === key)) return;
        const job = { key, id: entry.id, detail, generation: this.generation }, full = this.queue.findIndex(j => j.detail >= 1);
        if (detail < 1 && full >= 0) this.queue.splice(full, 0, job); else this.queue.push(job);
    }
    /** The built model, handed over once; null while it is still being built. */
    take(entry, detail) {
        const key = this.key(entry, detail), model = this.done.get(key);
        if (!model) return null;
        this.done.delete(key); return model;
    }
    pending() { return this.queue.length + this.busy.size; }
    pump() {
        if (this.worker) {
            while (this.busy.size < 2 && this.queue.length) { const job = this.queue.shift(); this.busy.set(job.key, job); this.worker.postMessage(job); }
            return;
        }
        const job = this.queue.shift();
        if (!job) return;
        const t = clock();
        try { this.done.set(job.key, make(job)); this.note(clock() - t); }
        catch { this.failed.add(job.key); this.stats.failed++; }
    }
    receive(data) {
        const job = this.busy.get(data.key);
        if (!job) return;
        this.busy.delete(data.key);
        if (data.error) { this.failed.add(data.key); this.stats.failed++; return; }
        if (job.generation === this.generation) this.done.set(data.key, data.model);
        this.note(data.ms);
    }
    note(ms) { const s = this.stats; s.built++; s.ms += ms; s.worst = Math.max(s.worst, ms); }
    /** Forget the requests of the previous system; models still at the worker are discarded when they arrive. */
    clear() { this.generation++; this.queue.length = 0; this.done.clear(); }
}
