/** Diagnostics page: with `?diagnostica` in the address (for example index.html?diagnostica#/system?unit=…)
 * a panel over the scene shows what each frame costs on this machine, so the frame rate can be measured on
 * the graphics card of the school or of the student. GAIA.diagnostics() returns the same numbers. */
const decimal = (v, n = 1) => Number.isFinite(v) ? v.toFixed(n).replace('.', ',') : '–';
const whole = v => Number.isFinite(v) ? Math.round(v).toLocaleString('it-IT') : '–';
const QUALITY = { high: 'dettaglio alto', balanced: 'bilanciato', low: 'leggero' };

/** Rate and duration of the frames from their intervals in milliseconds. */
export function frameSummary(times) {
    const list = times.filter(t => t > 0);
    if (!list.length) return { fps: 0, average: 0, worst: 0, p95: 0, frames: 0 };
    const sorted = [...list].sort((a, b) => a - b), average = list.reduce((n, t) => n + t, 0) / list.length;
    return { fps: 1000 / average, average, worst: sorted.at(-1), p95: sorted[Math.min(sorted.length - 1, Math.floor(sorted.length * .95))], frames: list.length };
}
/** The last `size` frames: interval between frames and time spent drawing on the main thread. */
export class FrameMeter {
    constructor(size = 120) { this.size = size; this.times = []; this.cpu = []; }
    add(interval, cpu) {
        if (!(interval > 0)) return;
        this.times.push(interval); this.cpu.push(cpu);
        if (this.times.length > this.size) { this.times.shift(); this.cpu.shift(); }
    }
    summary() { return { ...frameSummary(this.times), cpu: this.cpu.length ? this.cpu.reduce((n, t) => n + t, 0) / this.cpu.length : 0 }; }
}
/** Lines of the panel, in Italian. */
export function diagnosticLines(d) {
    const f = d.frame, lines = [
        'GAIA ' + d.version + ' · diagnostica',
        decimal(f.fps) + ' fotogrammi al secondo · ' + decimal(f.average) + ' ms in media, ' + decimal(f.worst) + ' ms il più lento',
        'disegno sul processore: ' + decimal(f.cpu) + ' ms per fotogramma',
        whole(d.meshDrawCalls) + ' chiamate di disegno · ' + whole(d.meshTriangles) + ' triangoli',
    ];
    if (d.craft) lines.push('navi e stazioni: ' + d.craft.full + ' complete, ' + d.craft.low + ' semplificate, ' + d.craft.light + ' punti luce · ' + whole(d.craft.triangles) + ' triangoli');
    if (d.craftFactory?.built) lines.push('modelli costruiti: ' + d.craftFactory.built + (d.craftFactory.worker ? ' in un worker' : ' sul thread principale') + ', ' + decimal(d.craftFactory.ms / d.craftFactory.built) + ' ms ciascuno in media' + (d.craft?.pending ? ', ' + d.craft.pending + ' in coda' : ''));
    lines.push('grafica: ' + (QUALITY[d.quality] || d.quality) + ' · tela ' + d.canvas.join('×') + ' · scena ' + d.sceneSize.join('×') + ' · densità ' + decimal(d.pixelRatio, 2));
    lines.push('GPU: ' + d.gpu);
    return lines;
}
/** The panel element, fixed in the lower right corner over the canvas; it ignores the pointer, so the scene
 * stays usable under it. */
export function mountDiagnostics(doc) {
    const panel = doc.createElement('pre');
    panel.id = 'diagnostica'; panel.setAttribute('aria-label', 'Diagnostica delle prestazioni');
    Object.assign(panel.style, { position: 'fixed', right: '8px', bottom: '44px', zIndex: 60, margin: 0, padding: '7px 9px', font: '11px/1.35 ui-monospace,Menlo,Consolas,monospace', color: '#dfe8f2', background: 'rgba(8,12,20,.72)', borderRadius: '6px', pointerEvents: 'none', whiteSpace: 'pre-wrap', maxWidth: '62ch' });
    doc.body.appendChild(panel);
    return panel;
}
