import { color, clamp } from '../renderer.js';
// Direction A, "osservatorio notturno": deep navy surfaces, one interactive accent, one colour per discipline.
export const C = { pale: color('#eef2f8'), cyan: color('#8ab8ff'), lime: color('#9fe0bf'), amber: color('#f0c27a'), purple: color('#b9a6ff'), muted: color('#aeb9cb'), dim: color('#8592a8'), red: color('#ff9c8a') };
export const T = { bg: '#070c18', surface: '#0e1728', raised: '#18243a', hover: '#213050', line: '#273754', ink: '#08111f', scrim: '#060a14' };
// Matematica, fisica, chimica, biologia: the same four colours mark the arms of the galaxy,
// the area markers, the orbits of the units and the accents of the unit screens.
export const DISCIPLINE_HEX = ['#f2b766', '#7fb2ff', '#b49cff', '#6fd3a0'];
export const DISCIPLINE = DISCIPLINE_HEX.map(h => color(h));
const KEEP = new Set(['A', 'B', 'Q', 'A/B', 'JSON', 'CSV', 'PDF', 'GAIA', 'DNA', 'RNA', 'ATP', 'PCR', 'UV', 'SI', 'PH', 'OK']);
/** Labels written in capitals in the source are shown in sentence case; acronyms, single letters
 * and words with digits keep their form. Mixed-case text is left untouched. */
export function caseLabel(t) {
    const s = String(t);
    if (!/[A-ZÀ-Ý]{2}/.test(s)) return s;
    let out = s.replace(/[A-Za-zÀ-ÿ’'0-9]+/g, w => (w === w.toUpperCase() && w.length > 1 && !/\d/.test(w) && !KEEP.has(w)) ? w.toLowerCase() : w);
    return out.replace(/[A-Za-zÀ-ÿ]/, c => c.toUpperCase());
}
export const SUP = { '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹', '-': '⁻' };
/** Readable numbers: Italian decimal comma, at most `sig` significant digits, powers of ten as 1,2 · 10⁻⁹. */
export function fmtNum(x, sig = 4) {
    if (x === null || !Number.isFinite(x)) return 'non definito';
    if (x === 0) return '0';
    const a = Math.abs(x);
    if (a >= 1e5 || a < 1e-3) {
        const [m, e] = x.toExponential(Math.max(0, sig - 1)).split('e');
        const mant = String(Number(m)).replace('.', ',').replace('-', '−');
        return (mant === '1' ? '' : mant === '−1' ? '−' : mant + ' · ') + '10' + String(Number(e)).split('').map(c => SUP[c]).join('');
    }
    return Number(x.toPrecision(sig)).toLocaleString('it-IT', { maximumSignificantDigits: sig }).replace('-', '−');
}
export class UI {
    constructor(R) { this.R = R; this.buttons = []; this.focus = null; this.hover = null; }
    begin() { this.buttons = []; }
    text(t, x, y, s = 'body', c = C.pale, o = {}) { this.R.text(t, x, y, s, c, o); }
    tag(t, x, y, c = C.cyan) { this.text(String(t).toUpperCase(), x, y, 'micro', c, { track: .7 }); }
    wrap(t, x, y, w, c = C.muted, line = 25, max = 99, style = 'body') { return this.R.multiline(t, x, y, w, style, c, line, max); }
    panel(x, y, w, h, c = C.cyan, alpha = .66) {
        const R = this.R;
        R.roundRect(x, y, w, h, 14, color(T.surface, R.highContrast ? 1 : Math.max(.94, alpha)), color(T.line, .9));
        R.line([x + 16, y + .5], [x + Math.min(w * .3, 120), y + .5], [...c.slice(0, 3), .9], 2);
    }
    button(id, label, x, y, w, h, action, { active = false, disabled = false, small = false } = {}) {
        const R = this.R, hover = this.hover === id && !disabled, focus = this.focus === id;
        const fill = active ? C.cyan : color(disabled ? '#111a2c' : hover ? T.hover : T.raised, 1);
        R.roundRect(x, y, w, h, Math.min(10, h / 2), fill);
        if (focus) R.roundRect(x - 3, y - 3, w + 6, h + 6, Math.min(12, h / 2 + 3), color('#000000', 0), color('#ffffff', .85), 0);
        const text = caseLabel(label), ink = active ? color(T.ink) : disabled ? C.dim : C.pale;
        // 14 px labels; 13 px when the button is too narrow; an ellipsis only as a last resort.
        const style = R.textWidth(text, 'mini') <= w - 12 ? 'mini' : 'micro', size = style === 'mini' ? 14 : 13;
        let shown = text;
        while (shown.length > 1 && R.textWidth(shown, style) > w - 8) shown = shown.slice(0, -1);
        if (shown !== text && shown.length > 1) shown = shown.slice(0, -1) + '…';
        this.text(shown, x + w / 2, y + (h - size) / 2 - 1, style, ink, { align: 'center' });
        this.buttons.push({ id, label, x, y, w, h, action, disabled });
    }
    slider(id, label, x, y, w, value, min, max, step, onChange, format = String) { this.tag(label, x, y); this.text(format(value), x + w, y, 'mini', C.lime, { align: 'right' }); let t = clamp((value - min) / (max - min), 0, 1); this.R.roundRect(x, y + 29, w, 6, 3, color(T.raised, 1)); this.R.roundRect(x, y + 29, w * t, 6, 3, C.cyan); this.R.roundRect(x + w * t - 9, y + 23, 18, 18, 9, C.pale); this.buttons.push({ id, label, x, y: y + 19, w, h: 28, slider: true, min, max, step, value, action: onChange }); }
    metric(label, value, x, y, c = C.lime) { this.tag(label, x, y, C.muted); this.text(value, x, y + 23, 'number', c); }
    hit(x, y) { return [...this.buttons].reverse().find(b => x >= b.x && x <= b.x + b.w && y >= b.y && y <= b.y + b.h && !b.disabled); }
    activate(b, x) {
        if (!b || b.disabled)
            return;
        if (b.slider) {
            const v = clamp(b.min + clamp((x - b.x) / b.w, 0, 1) * (b.max - b.min), b.min, b.max);
            const stepped = b.min + Math.round((v - b.min) / b.step) * b.step;
            b.action(Number(clamp(stepped, b.min, b.max).toPrecision(12)));
        }
        else
            b.action?.();
    }
    graph(x, y, w, h, series, { xmin = 0, xmax = 1, ymin = 0, ymax = 1, xLabel = '', yLabel = '', ticks = 4 } = {}) {
        const R = this.R;
        for (let i = 0; i <= ticks; i++) {
            const yy = y + h * (i / ticks), xx = x + w * (i / ticks);
            R.line([x, yy], [x + w, yy], color(T.line, .7), 1);
            R.line([xx, y], [xx, y + h], color(T.line, .45), 1);
            this.text(fmtNum(ymax - (ymax - ymin) * i / ticks, 3), x - 9, yy - 7, 'micro', C.muted, { align: 'right' });
            this.text(fmtNum(xmin + (xmax - xmin) * i / ticks, 3), xx, y + h + 10, 'micro', C.muted, { align: 'center' });
        }
        R.line([x, y], [x, y + h], C.muted);
        R.line([x, y + h], [x + w, y + h], C.muted);
        this.text(xLabel, x + w, y + h + 30, 'micro', C.muted, { align: 'right' });
        this.text(yLabel, x, y - 23, 'micro', C.muted);
        for (const s of series) {
            let pts = [];
            const flush = () => {
                if (pts.length > 1)
                    R.polyline(pts, s.color || C.cyan, 2.1, 3);
                pts = [];
            };
            for (const [a, b] of s.points) {
                if (!Number.isFinite(a) || !Number.isFinite(b) || b < ymin || b > ymax || a < xmin || a > xmax) {
                    flush();
                    continue;
                }
                pts.push([x + (a - xmin) / (xmax - xmin) * w, y + h - (b - ymin) / (ymax - ymin) * h]);
            }
            flush();
        }
    }
}
export class ImageCache {
    constructor(R, resolve = p => p) { this.R = R; this.resolve = resolve; this.items = new Map(); this.errors = []; this.counter = 0; }
    get(path) {
        const o = this.items.get(path);
        if (o) {
            o.used = ++this.counter;
            return o;
        }
        const n = { loading: true, used: ++this.counter };
        this.items.set(path, n);
        const image = new Image();
        image.onload = () => {
            try {
                n.texture = this.R.uploadTexture(image);
                n.width = image.width;
                n.height = image.height;
                n.loading = false;
                this.trim();
            }
            catch (e) {
                n.error = e.message;
                n.loading = false;
                this.errors.push(path);
            }
        };
        image.onerror = () => { n.error = 'Risorsa non caricata'; n.loading = false; this.errors.push(path); };
        image.src = this.resolve(path);
        return n;
    }
    trim() {
        if (this.items.size <= 18)
            return;
        const entries = [...this.items.entries()].filter(([k, v]) => !v.loading && v.texture).sort((a, b) => a[1].used - b[1].used);
        for (const [k, v] of entries.slice(0, Math.max(0, this.items.size - 18))) {
            this.R.gl.deleteTexture(v.texture);
            this.items.delete(k);
        }
    }
    draw(path, x, y, w, h, uv = [0, 0, 1, 1], invert = false) {
        const item = this.get(path);
        if (item.texture)
            this.R.drawImage(item.texture, x, y, w, h, uv, invert);
        return item;
    }
}
