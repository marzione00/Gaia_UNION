/** Diagrams of the GAIA book, drawn as SVG from a JSON description written in the chapter (src/book/markdown.js).
 * Coordinates are in the figure's own units (viewBox `w × h`, y downwards). Colours come from classes styled
 * by the reader (src/book/reader.css), so the figures follow the dark theme and print in grey scale.
 *
 * Items: line, arrow (with label), rect, circle, poly, text, spring, ground, arc (angle with label), axes and
 * plot (data coordinates mapped with origin `o`, scales `sx`, `sy`, y upwards). Arrowheads are drawn as
 * polygons, so they take the colour of their arrow in every browser. */
const escapeHtml = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const COLOURS = ['ax', 'muted', 'force', 'force2', 'force3', 'force4', 'body', 'accent'];
const cls = (c, fallback = 'ax') => 'f-' + (COLOURS.includes(c) ? c : fallback);
const n = x => +(+x).toFixed(2);
/** Label with optional bold (vector), italic and subscript, e.g. {"s":"F","sub":"AB","v":true}. */
function label(x, y, it, anchor = 'middle') {
    const size = it.size || 15, weight = it.v || it.b ? ' font-weight="700"' : '', style = it.i !== false && (it.v || /^[A-Za-zα-ω]{1,3}$/.test(it.s || '')) ? ' font-style="italic"' : '';
    const sub = it.sub ? `<tspan dy="${n(size * .3)}" font-size="${n(size * .72)}" font-style="normal">${escapeHtml(it.sub)}</tspan>` : '';
    return `<text x="${n(x)}" y="${n(y)}" text-anchor="${anchor}" font-size="${size}" class="f-label ${cls(it.lc || it.c, 'ax')}"${weight}${style}>${escapeHtml(it.s || '')}${sub}</text>`;
}
function arrowhead(x1, y1, x2, y2, size, c) {
    const a = Math.atan2(y2 - y1, x2 - x1), s = size, p = [[x2, y2], [x2 - s * Math.cos(a - .42), y2 - s * Math.sin(a - .42)], [x2 - s * Math.cos(a + .42), y2 - s * Math.sin(a + .42)]];
    return `<polygon points="${p.map(q => q.map(n).join(',')).join(' ')}" class="${cls(c)} f-fill"/>`;
}
function item(it) {
    const c = it.c, w = it.w || (['force', 'force2', 'force3', 'force4'].includes(c) ? 3 : 1.6), dash = it.dash ? ' stroke-dasharray="6 5"' : '';
    switch (it.t) {
        case 'line': { const [x1, y1, x2, y2] = it.p; return `<line x1="${n(x1)}" y1="${n(y1)}" x2="${n(x2)}" y2="${n(y2)}" class="${cls(c)} f-stroke" stroke-width="${w}"${dash}/>`; }
        case 'arrow': {
            const [x1, y1, x2, y2] = it.p, len = Math.hypot(x2 - x1, y2 - y1) || 1, hs = it.head || Math.min(14, 6 + w * 2.2), ux = (x2 - x1) / len, uy = (y2 - y1) / len;
            let s = `<line x1="${n(x1)}" y1="${n(y1)}" x2="${n(x2 - ux * hs * .7)}" y2="${n(y2 - uy * hs * .7)}" class="${cls(c)} f-stroke" stroke-width="${w}"${dash}/>` + arrowhead(x1, y1, x2, y2, hs, c);
            if (it.s) { const at = it.at === 'mid' ? [(x1 + x2) / 2, (y1 + y2) / 2] : [x2, y2], off = it.off || [ux * 16 + (it.dx || 0), uy * 16 + 5 + (it.dy || 0)]; s += label(at[0] + off[0], at[1] + off[1], { ...it, v: it.v !== false }, it.a || 'middle'); }
            return s;
        }
        case 'rect': { const [x, y, ww, hh] = it.p; return `<rect x="${n(x)}" y="${n(y)}" width="${n(ww)}" height="${n(hh)}" rx="${it.r || 4}" class="${cls(c, 'body')} f-shape"${it.rot ? ` transform="rotate(${it.rot} ${n(it.rc ? it.rc[0] : x + ww / 2)} ${n(it.rc ? it.rc[1] : y + hh / 2)})"` : ''}/>` + (it.s ? label(x + ww / 2, y + hh / 2 + 5, { ...it, c: 'ax', i: false }) : ''); }
        case 'circle': { const [x, y, r] = it.p; return `<circle cx="${n(x)}" cy="${n(y)}" r="${n(r)}" class="${cls(c, 'body')} f-shape"/>` + (it.s ? label(x, y + 5, { ...it, c: 'ax', i: false }) : ''); }
        case 'poly': return `<polyline points="${it.pts.map(q => q.map(n).join(',')).join(' ')}${it.close ? ' ' + it.pts[0].map(n).join(',') : ''}" class="${cls(c, 'ax')} ${it.fill ? 'f-shape' : 'f-stroke f-nofill'}" stroke-width="${w}"${dash}/>`;
        case 'text': return label(it.p[0], it.p[1], { ...it, i: it.i ?? false }, it.a || 'middle');
        case 'spring': {
            const [x1, y1, x2, y2] = it.p, k = it.n || 8, amp = it.amp || 9, len = Math.hypot(x2 - x1, y2 - y1), ux = (x2 - x1) / len, uy = (y2 - y1) / len, lead = Math.min(14, len * .12), pts = [[x1, y1], [x1 + ux * lead, y1 + uy * lead]];
            for (let j = 0; j < k * 2; j++) { const t = lead + (len - 2 * lead) * (j + .5) / (k * 2), side = j % 2 ? -1 : 1; pts.push([x1 + ux * t - uy * amp * side, y1 + uy * t + ux * amp * side]); }
            pts.push([x2 - ux * lead, y2 - uy * lead], [x2, y2]);
            return `<polyline points="${pts.map(q => q.map(n).join(',')).join(' ')}" class="${cls(c, 'ax')} f-stroke f-nofill" stroke-width="${it.w || 2}"/>`;
        }
        case 'ground': { const [x1, y, x2] = it.p, ticks = []; for (let x = x1 + 6; x < x2; x += 12) ticks.push(`<line x1="${n(x)}" y1="${n(y)}" x2="${n(x - 8)}" y2="${n(y + 9)}" class="f-muted f-stroke" stroke-width="1.2"/>`); return `<line x1="${n(x1)}" y1="${n(y)}" x2="${n(x2)}" y2="${n(y)}" class="f-ax f-stroke" stroke-width="2"/>` + ticks.join(''); }
        case 'arc': {
            const [cx, cy] = it.p, r = it.r || 30, [a0, a1] = it.a.map(d => -d * Math.PI / 180), p0 = [cx + r * Math.cos(a0), cy + r * Math.sin(a0)], p1 = [cx + r * Math.cos(a1), cy + r * Math.sin(a1)], large = Math.abs(it.a[1] - it.a[0]) > 180 ? 1 : 0, mid = (a0 + a1) / 2;
            return `<path d="M${n(p0[0])},${n(p0[1])} A${r},${r} 0 ${large} ${it.a[1] > it.a[0] ? 0 : 1} ${n(p1[0])},${n(p1[1])}" class="${cls(c, 'ax')} f-stroke f-nofill" stroke-width="1.6"/>` + (it.s ? label(cx + (r + 14) * Math.cos(mid), cy + (r + 14) * Math.sin(mid) + 5, { s: it.s, c: c || 'ax', i: true }) : '');
        }
        case 'axes': {
            const [x0, y0] = it.o, [lx, ly] = [it.x[0], it.y[0]];
            let s = item({ t: 'arrow', p: [x0, y0, x0 + lx, y0], c: 'ax', w: 1.6, head: 9 }) + item({ t: 'arrow', p: [x0, y0, x0, y0 - ly], c: 'ax', w: 1.6, head: 9 });
            s += label(x0 + lx - 2, y0 + 22, { s: it.x[1], c: 'ax', i: false, size: 14 }, 'end') + label(x0 + 8, y0 - ly + 4, { s: it.y[1], c: 'ax', i: false, size: 14 }, 'start');
            for (const [v, t] of it.xt || []) s += `<line x1="${n(x0 + v * it.sx)}" y1="${n(y0)}" x2="${n(x0 + v * it.sx)}" y2="${n(y0 + 5)}" class="f-ax f-stroke"/>` + label(x0 + v * it.sx, y0 + 20, { s: t, c: 'muted', i: false, size: 12 });
            for (const [v, t] of it.yt || []) s += `<line x1="${n(x0 - 5)}" y1="${n(y0 - v * it.sy)}" x2="${n(x0)}" y2="${n(y0 - v * it.sy)}" class="f-ax f-stroke"/>` + label(x0 - 9, y0 - v * it.sy + 4, { s: t, c: 'muted', i: false, size: 12 }, 'end');
            return s;
        }
        case 'plot': { const [x0, y0] = it.o, pts = it.pts.map(([x, y]) => [x0 + x * it.sx, y0 - y * it.sy]); return item({ t: 'poly', pts, c, w: it.w || 2.4, dash: it.dash }) + (it.s ? label(pts.at(-1)[0] + (it.dx ?? 8), pts.at(-1)[1] + (it.dy ?? 4), { s: it.s, c, i: true, sub: it.sub }, it.a || 'start') : ''); }
        default: throw new Error('Elemento di figura sconosciuto: ' + it.t);
    }
}
/** SVG of a figure spec `{w, h, items}`; `title` becomes the accessible name. */
export function renderFigure(spec, title = '') {
    if (!spec || !Array.isArray(spec.items) || !(spec.w > 0) || !(spec.h > 0)) throw new Error('Figura non valida');
    return `<svg class="libro-svg" viewBox="0 0 ${spec.w} ${spec.h}" role="img" aria-label="${escapeHtml(title.replace(/\$/g, ''))}" xmlns="http://www.w3.org/2000/svg">${spec.items.map(item).join('')}</svg>`;
}
