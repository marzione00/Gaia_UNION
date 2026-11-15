import { color, clamp } from '../renderer.js';
export const C = { pale: color('#e5f0ec'), cyan: color('#74d8d4'), lime: color('#b5d6a3'), amber: color('#e4c18b'), purple: color('#b1a2df'), muted: color('#9fb4b9'), dim: color('#6b8e98'), red: color('#eaa08f') };
export class UI {
    constructor(R) { this.R = R; this.buttons = []; this.focus = null; this.hover = null; }
    begin() { this.buttons = []; }
    text(t, x, y, s = 'body', c = C.pale, o = {}) { this.R.text(t, x, y, s, c, o); }
    tag(t, x, y, c = C.cyan) { this.text(t.toUpperCase(), x, y, 'mini', c, { track: 1.4 }); }
    wrap(t, x, y, w, c = C.muted, line = 25, max = 99, style = 'body') { return this.R.multiline(t, x, y, w, style, c, line, max); }
    panel(x, y, w, h, c = C.cyan, alpha = .66) { this.R.roundRect(x, y, w, h, 16, color('#061b28', alpha), [...c.slice(0, 3), .48], 4); this.R.line([x + 17, y + 1], [x + Math.min(w * .35, 145), y + 1], [...c.slice(0, 3), .80], 1.8, 4); }
    button(id, label, x, y, w, h, action, { active = false, disabled = false, small = false } = {}) {
        const c = active ? C.lime : C.cyan, hover = this.hover === id, focus = this.focus === id;
        this.R.roundRect(x, y, w, h, 8, color(active ? '#1f4145' : '#0a2934', hover ? .88 : .65), [...c.slice(0, 3), focus ? 1 : active ? .8 : .4], focus ? 7 : 2);
        this.text(label, x + w / 2, y + (h - (small ? 12 : 14)) / 2 - 2, small ? 'micro' : 'mini', disabled ? C.dim : C.pale, { align: 'center', track: small ? .1 : .4 });
        if (focus)
            this.R.line([x + 10, y + h - 3], [x + w - 10, y + h - 3], C.lime, 2);
        this.buttons.push({ id, label, x, y, w, h, action, disabled });
    }
    slider(id, label, x, y, w, value, min, max, step, onChange, format = String) { this.tag(label, x, y); this.text(format(value), x + w, y, 'mini', C.lime, { align: 'right' }); let t = clamp((value - min) / (max - min), 0, 1); this.R.roundRect(x, y + 29, w, 5, 3, color('#294b54', .8)); this.R.roundRect(x, y + 29, w * t, 5, 3, C.cyan); this.R.hexagon(x + w * t, y + 31, 7, C.pale, C.cyan); this.buttons.push({ id, label, x, y: y + 19, w, h: 28, slider: true, min, max, step, value, action: onChange }); }
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
            R.line([x, yy], [x + w, yy], color('#588289', .25), 1);
            R.line([xx, y], [xx, y + h], color('#588289', .15), 1);
            this.text((ymax - (ymax - ymin) * i / ticks).toFixed(Math.abs(ymax - ymin) > 10 ? 0 : 1), x - 9, yy - 6, 'micro', C.muted, { align: 'right' });
            this.text((xmin + (xmax - xmin) * i / ticks).toFixed(Math.abs(xmax - xmin) > 10 ? 0 : 1), xx, y + h + 10, 'micro', C.muted, { align: 'center' });
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
