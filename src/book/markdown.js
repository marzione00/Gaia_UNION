/** Chapter format of the GAIA book ("il libro della galassia"): a small, strict Markdown dialect that turns
 * one text file per unit into HTML for the reading layer (src/book/reader.js). No dependencies.
 *
 *   ---                                   front matter, one `key: value` per line
 *   unit: physics-06
 *   titolo: Forze e leggi di Newton
 *   ---
 *   ## Titolo della sezione {#id}         section (table of contents); ### for a subsection
 *   paragraph text with $x^2$ math, **bold**, *italic*, [link](unit:physics-07#id) or [link](#id)
 *   $$ ... $$                              display formula (one or more lines)
 *   - item / 1. item                       lists;  | a | b |  tables (second row |---|)
 *   ::: tipo Titolo                        block: definizione, legge, esempio, errore, storia, metodo,
 *   ...                                    quotidiano, nota, approfondimento (collapsible), sintesi,
 *   :::                                    obiettivi, esercizio (with a `>>> soluzione` line), figura
 *   ::: figura id                          figure: JSON spec (src/book/figures.js), a `---` line, caption
 *   ![didascalia](fig/nome.svg "320x180")  figure from an SVG file next to the chapter (also inside blocks)
 *
 * Math is left to MathJax: it is only HTML-escaped. Everything else is escaped before formatting, so a
 * chapter cannot inject markup. */
import { renderFigure } from './figures.js';

const BLOCKS = {
    definizione: 'Definizione', legge: 'Legge', esempio: 'Esempio svolto', errore: 'Errore tipico', storia: 'Storia',
    metodo: 'Metodo', quotidiano: 'Nella vita quotidiana', nota: 'Nota', approfondimento: 'Approfondimento',
    sintesi: 'Sintesi', obiettivi: 'Obiettivi', esercizio: 'Esercizio', figura: 'Figura'
};
export const BLOCK_TYPES = Object.freeze(Object.keys(BLOCKS));
const LEVELS = { base: 'Base', medio: 'Intermedio', avanzato: 'Avanzato' };
export const escapeHtml = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
export const slug = s => String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60);

/** Inline formatting outside math: bold, italic, code, links. Math segments ($…$) are only escaped. */
export function inline(text, links = []) {
    const parts = String(text).split(/(\$[^$]+\$)/g);
    return parts.map(p => {
        if (/^\$[^$]+\$$/.test(p)) return escapeHtml(p);
        let s = escapeHtml(p);
        s = s.replace(/`([^`]+)`/g, '<code>$1</code>');
        s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
        s = s.replace(/(^|[^*\w])\*([^*\s][^*]*?)\*(?!\w)/g, '$1<em>$2</em>');
        s = s.replace(/\[([^\]]+)\]\(((?:[^()\s]|\([^()\s]*\))+)\)/g, (_, label, target) => {
            links.push(target);
            if (/^unit:/.test(target)) { const [unit, anchor = ''] = target.slice(5).split('#'); return `<a class="libro-rimando" data-unit="${unit}" data-anchor="${anchor}" href="#/libro?unit=${unit}${anchor ? '&sezione=' + anchor : ''}">${label}</a>`; }
            if (target.startsWith('#')) return `<a href="${target}" data-anchor="${target.slice(1)}">${label}</a>`;
            if (/^https:\/\//.test(target)) return `<a href="${target}" target="_blank" rel="noopener">${label}</a>`;
            return label;
        });
        return s;
    }).join('');
}
// Figure line: caption, path of an SVG in the chapter folder, optional natural size.
const IMAGE = /^!\[(.*)\]\((fig\/[\w-]+\.svg)(?: "(\d{1,4})x(\d{1,4})")?\)\s*$/;
const wordsOf = s => (String(s).replace(/\$\$[\s\S]*?\$\$|\$[^$]+\$/g, ' ').match(/[\p{L}\p{N}]+/gu) || []).length;

/** Parses a chapter. Returns metadata, the HTML, the table of contents and counters used by the tests. */
export function parseChapter(source) {
    const lines = String(source).replace(/\r\n?/g, '\n').split('\n'), meta = {}, toc = [], out = [], links = [], figures = [], exercises = [], images = [];
    let i = 0, words = 0, open = false;
    if (lines[0] === '---') { i = 1; while (i < lines.length && lines[i] !== '---') { const m = lines[i].match(/^([\w-]+):\s*(.*)$/); if (m) meta[m[1]] = m[2].trim(); i++; } i++; }
    const used = new Set(), unique = id => { let k = id || 'sezione', n = 2; while (used.has(k)) k = `${id}-${n++}`; used.add(k); return k; };
    // Body lines (paragraphs, lists, tables, formulas) until a blank line or a structural line.
    const body = (L, ctx) => {
        const html = []; let k = 0;
        const structural = l => /^(#{2,3} |::: |:::$|\$\$|- |\d+\. |\||>>> |!\[)/.test(l);
        while (k < L.length) {
            const l = L[k];
            if (!l.trim()) { k++; continue; }
            if (l.trim().startsWith('$$')) {
                const block = [l.trim()]; if (!(l.trim().length > 2 && l.trim().endsWith('$$'))) { k++; while (k < L.length && !L[k].trim().endsWith('$$')) block.push(L[k++]); if (k < L.length) block.push(L[k]); }
                k++; html.push(`<div class="libro-formula">${escapeHtml(block.join('\n'))}</div>`); continue;
            }
            if (/^- /.test(l) || /^\d+\. /.test(l)) {
                const ordered = /^\d+\. /.test(l), items = [];
                while (k < L.length && (ordered ? /^\d+\. /.test(L[k]) : /^- /.test(L[k]))) { let item = L[k].replace(/^(- |\d+\. )/, ''); k++; while (k < L.length && /^ {2,}\S/.test(L[k])) item += ' ' + L[k++].trim(); words += wordsOf(item); items.push(`<li>${inline(item, links)}</li>`); }
                html.push(`<${ordered ? 'ol' : 'ul'}>${items.join('')}</${ordered ? 'ol' : 'ul'}>`); continue;
            }
            const img = l.match(IMAGE);
            if (img) {
                const [, caption, src, w = '480', h = '320'] = img, id = unique('figura-' + (figures.length + 1)); figures.push(id); images.push(src); words += wordsOf(caption); k++;
                html.push(`<figure class="libro-figura" id="${id}"><div class="libro-svg-esterno" data-src="${escapeHtml(src)}" role="img" aria-label="${escapeHtml(caption.replace(/\$/g, '') || 'Figura ' + figures.length)}" style="--w:${w}px;aspect-ratio:${w}/${h}"></div><figcaption><span class="libro-etichetta">Figura ${figures.length}.</span>${caption ? ' ' + inline(caption, links) : ''}</figcaption></figure>`);
                continue;
            }
            if (l.startsWith('|')) {
                const rows = []; while (k < L.length && L[k].startsWith('|')) rows.push(L[k++]);
                const cells = r => r.replace(/^\||\|$/g, '').split('|').map(c => c.trim());
                const head = cells(rows[0]), rest = rows.slice(rows[1] && /^\|[\s:-]+\|/.test(rows[1]) ? 2 : 1).map(cells);
                [head, ...rest].flat().forEach(c => { words += wordsOf(c); });
                html.push(`<div class="libro-tabella"><table><thead><tr>${head.map(c => `<th>${inline(c, links)}</th>`).join('')}</tr></thead><tbody>${rest.map(r => `<tr>${r.map(c => `<td>${inline(c, links)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`); continue;
            }
            const para = [l]; k++;
            while (k < L.length && L[k].trim() && !structural(L[k])) para.push(L[k++]);
            const text = para.join(' ').trim(); words += wordsOf(text);
            html.push(`<p>${inline(text, links)}</p>`);
        }
        return html.join('\n');
    };
    // Collect lines up to the next block or heading, then render them as body text.
    let buffer = [];
    const flush = () => { if (buffer.length) out.push(body(buffer)); buffer = []; };
    for (; i < lines.length; i++) {
        const l = lines[i], h = l.match(/^(#{2,3}) (.+?)(?:\s*\{#([\w-]+)\})?\s*$/);
        if (h) {
            flush(); const level = h[1].length, title = h[2], id = unique(h[3] || slug(title)); words += wordsOf(title);
            if (level === 2) { if (open) out.push('</section>'); out.push(`<section class="libro-sezione" id="${id}" aria-labelledby="${id}-titolo"><h2 id="${id}-titolo">${inline(title, links)}</h2>`); open = true; }
            else out.push(`<h3 id="${id}">${inline(title, links)}</h3>`);
            toc.push({ id, title, level }); continue;
        }
        const b = l.match(/^::: (\w+)(?:\s+(.*))?$/);
        if (b) {
            flush(); const type = b[1], arg = (b[2] || '').trim(), inner = [];
            if (!BLOCKS[type]) throw new Error(`Riga ${i + 1}: blocco sconosciuto «${type}»`);
            i++; while (i < lines.length && lines[i].trim() !== ':::') inner.push(lines[i++]);
            if (i >= lines.length) throw new Error(`Blocco «${type}» non chiuso`);
            if (type === 'figura') {
                const sep = inner.findIndex(x => x.trim() === '---'), spec = JSON.parse(inner.slice(0, sep < 0 ? inner.length : sep).join('\n')), caption = sep < 0 ? '' : inner.slice(sep + 1).join(' ').trim();
                const id = unique('figura-' + (arg || figures.length + 1)); figures.push(id); words += wordsOf(caption);
                out.push(`<figure class="libro-figura" id="${id}">${renderFigure(spec, caption)}<figcaption><span class="libro-etichetta">Figura ${figures.length}.</span> ${inline(caption, links)}</figcaption></figure>`);
                continue;
            }
            if (type === 'esercizio') {
                const lv = arg.match(/\[(base|medio|avanzato)\]\s*$/), title = arg.replace(/\s*\[(base|medio|avanzato)\]\s*$/, ''), sep = inner.findIndex(x => /^>>> soluzione\s*$/.test(x.trim()));
                const id = unique('esercizio-' + (exercises.length + 1)); exercises.push({ id, title, level: lv ? lv[1] : 'base', solution: sep >= 0 && inner.slice(sep + 1).some(x => x.trim()) }); words += wordsOf(title);
                const n = exercises.length, task = body(sep < 0 ? inner : inner.slice(0, sep)), sol = sep < 0 ? '' : body(inner.slice(sep + 1));
                out.push(`<div class="libro-blocco libro-esercizio" id="${id}"><div class="libro-intestazione"><span class="libro-etichetta">Esercizio ${n}</span>${title ? ` <span class="libro-titolo-blocco">${inline(title, links)}</span>` : ''}<span class="libro-livello libro-livello-${lv ? lv[1] : 'base'}">${LEVELS[lv ? lv[1] : 'base']}</span></div>${task}${sol ? `<details class="libro-soluzione"><summary>Soluzione</summary>${sol}</details>` : ''}</div>`);
                continue;
            }
            const content = body(inner); words += wordsOf(arg);
            const head = `<span class="libro-etichetta">${BLOCKS[type]}</span>${arg ? ` <span class="libro-titolo-blocco">${inline(arg, links)}</span>` : ''}`;
            if (type === 'approfondimento') out.push(`<details class="libro-blocco libro-approfondimento"><summary>${head}</summary>${content}</details>`);
            else out.push(`<div class="libro-blocco libro-${type}"><div class="libro-intestazione">${head}</div>${content}</div>`);
            continue;
        }
        if (l.trim() === ':::') throw new Error(`Riga ${i + 1}: chiusura di blocco senza apertura`);
        buffer.push(l);
    }
    flush(); if (open) out.push('</section>');
    return { meta, toc, html: out.join('\n'), words, links, figures, exercises, images };
}
