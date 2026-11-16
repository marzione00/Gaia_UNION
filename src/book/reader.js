/** Reading layer of the GAIA book: an HTML page shown over the 3D scene for the chapter of a unit.
 * Text is selectable and searchable, formulas are typeset by MathJax (vendor/mathjax, loaded on first use),
 * figures are inline SVG. The app owns routing: it calls `show(unit, section)` and `hide()`, and receives
 * `onClose`, `onUnit(unit, anchor)` (a link to another chapter or planet) and `onRead(unit, sectionId)`. */
import { parseChapter, escapeHtml } from './markdown.js';

let mathjax = null;
/** Loads MathJax once, with the macros of the physics handout (\vect, \dd) and \un{…} for units. */
function loadMathJax(base = 'vendor/mathjax/') {
    if (mathjax) return mathjax;
    globalThis.MathJax = {
        tex: { inlineMath: [['$', '$']], displayMath: [['$$', '$$']], macros: { vect: ['\\boldsymbol{#1}', 1], vers: ['\\hat{\\boldsymbol{#1}}', 1], dd: '\\,\\mathrm{d}', un: ['\\,\\mathrm{#1}', 1], ket: ['\\lvert #1\\rangle', 1], bra: ['\\langle #1\\rvert', 1], braket: ['\\langle #1\\,\\vert\\,#2\\rangle', 2], oiint: '\\mathop{\\unicode{x222F}}\\nolimits' }, packages: { '[+]': ['boldsymbol'] } },
        loader: { load: ['[tex]/boldsymbol'], paths: { mathjax: base.replace(/\/$/, '') } },
        svg: { fontCache: 'global' }, startup: { typeset: false }
    };
    mathjax = new Promise((resolve, reject) => {
        const s = document.createElement('script'); s.src = base + 'tex-svg.js'; s.async = true;
        s.onload = () => (globalThis.MathJax.startup?.promise || Promise.resolve()).then(() => resolve(globalThis.MathJax), reject);
        s.onerror = () => { mathjax = null; reject(new Error('MathJax non disponibile')); };
        document.head.append(s);
    });
    return mathjax;
}

export class BookReader {
    constructor({ index, fetchText, onClose, onUnit, onRead, isRead = () => false, unitInfo = () => null, top = () => 82 }) {
        Object.assign(this, { index, fetchText, onClose, onUnit, onRead, isRead, unitInfo, top });
        this.cache = new Map(); this.unit = null; this.visible = false;
        // Minimal DOMs (the Node application checks) may lack head, body or window events: the reader then stays inert.
        const css = document.createElement('link'); css.rel = 'stylesheet'; css.href = 'src/book/reader.css'; (document.head || document.body)?.append?.(css);
        this.root = Object.assign(document.createElement('div'), { className: 'libro', hidden: true });
        this.root.setAttribute?.('role', 'region'); this.root.setAttribute?.('aria-label', 'Libro della galassia');
        document.body?.append?.(this.root);
        this.root.addEventListener?.('click', e => this.click(e));
        this.root.addEventListener?.('keydown', e => { if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); this.onClose?.(); } });
        globalThis.addEventListener?.('beforeprint', () => { this.printOpen = [...this.root.querySelectorAll('details:not([open])')]; this.printOpen.forEach(d => { d.open = true; }); });
        globalThis.addEventListener?.('afterprint', () => { (this.printOpen || []).forEach(d => { d.open = false; }); this.printOpen = []; });
    }
    has(unit) { return this.index.some(c => c.unit === unit); }
    entry(unit) { return this.index.find(c => c.unit === unit) || null; }
    /** Shows the chapter of `unit`, scrolling to `section` when given. Idempotent. */
    async show(unit, section = null) {
        this.root.style?.setProperty?.('--libro-top', this.top() + 'px');
        if (this.visible && this.unit === unit) { if (section && section !== this.section) this.scrollTo(section); return; }
        this.visible = true; this.unit = unit; this.section = section; this.root.hidden = false;
        const entry = this.entry(unit);
        if (!entry) { this.root.innerHTML = this.missing(unit); return; }
        this.root.innerHTML = `<div class="libro-pagina"><div class="libro-colonna"><p class="libro-dati">Caricamento del capitolo…</p></div></div>`;
        try {
            let chapter = this.cache.get(unit);
            if (!chapter) { chapter = parseChapter(await this.fetchText(entry.file)); this.cache.set(unit, chapter); }
            if (this.unit !== unit) return;
            this.render(unit, entry, chapter);
            this.figures(entry.file.replace(/[^/]*$/, ''));
            if (section) this.scrollTo(section);
            // Typesetting changes the height of the formulas: the sections up to the requested one are typeset
            // first, then the page scrolls there again and the rest is typeset in the background.
            await this.typeset(section);
            if (section && this.unit === unit && this.section === section) this.scrollTo(section);
        } catch (e) { this.root.innerHTML = `<div class="libro-pagina"><div class="libro-colonna"><h1>Capitolo non disponibile</h1><p>${escapeHtml(e.message)}</p><button data-azione="chiudi">Torna al pianeta</button></div></div>`; }
    }
    hide() { if (!this.visible) return; this.visible = false; this.unit = null; this.root.hidden = true; this.root.innerHTML = ''; this.observer?.disconnect(); this.figureObserver?.disconnect(); }
    missing(unit) {
        const info = this.unitInfo(unit);
        return `<div class="libro-pagina"><div class="libro-colonna"><p class="libro-occhiello">Il libro della galassia</p><h1>${escapeHtml(info?.title || unit)}</h1><p>Il capitolo di questa unità è in preparazione. Il percorso guidato e le stazioni in superficie restano disponibili.</p><button data-azione="chiudi">Vai al pianeta</button></div></div>`;
    }
    render(unit, entry, ch) {
        const info = this.unitInfo(unit) || {}, minutes = Math.max(1, Math.round(ch.words / 200)), sections = ch.toc.filter(t => t.level === 2);
        const toc = ch.toc.map(t => `<li><a href="#" data-anchor="${t.id}" class="${t.level === 3 ? 'sotto' : ''}${this.isRead(unit, t.id) ? ' letta' : ''}">${escapeHtml(t.title)}</a></li>`).join('');
        const prev = this.index[this.index.indexOf(entry) - 1], next = this.index[this.index.indexOf(entry) + 1];
        this.root.innerHTML = `
<nav class="libro-indice" aria-label="Indice del capitolo"><h2>Indice del capitolo</h2><ol>${toc}</ol>
 <div class="libro-avanzamento"><span data-avanzamento></span><div class="libro-barra-progresso"><span data-barra></span></div></div>
 <div class="libro-azioni"><button data-azione="chiudi">Torna al pianeta</button><button data-azione="stampa">Stampa</button></div></nav>
<main class="libro-pagina" tabindex="-1"><div class="libro-colonna">
 <div class="libro-strumenti-mobile"><button class="libro-indice-mobile" data-azione="indice">Indice</button><button class="libro-chiudi-mobile" data-azione="chiudi">Pianeta</button></div>
 <header class="libro-testata"><p class="libro-occhiello">${escapeHtml(ch.meta.volume || 'Il libro della galassia')}${info.area ? ' · ' + escapeHtml(info.area) : ''}</p><h1>${escapeHtml(ch.meta.titolo || info.title || unit)}</h1>${ch.meta.sottotitolo ? `<p class="libro-sottotitolo">${escapeHtml(ch.meta.sottotitolo)}</p>` : ''}
 <p class="libro-dati">${sections.length} sezioni · ${ch.figures.length} figure · ${ch.exercises.length} esercizi · circa ${ch.words.toLocaleString('it-IT')} parole, ${minutes} minuti di lettura${ch.meta.fonte ? ' · ' + escapeHtml(ch.meta.fonte) : ''}</p></header>
 <article class="libro-capitolo">${ch.html}</article>
 <footer class="libro-piede"><div class="libro-navigazione">${prev ? `<a href="#" data-unit="${prev.unit}">◂ ${escapeHtml(prev.titolo)}</a>` : '<span></span>'}${next ? `<a href="#" data-unit="${next.unit}">${escapeHtml(next.titolo)} ▸</a>` : '<span></span>'}</div></footer>
</div></main>`;
        this.page = this.root.querySelector('.libro-pagina'); this.updateProgress();
        // A section counts as read once its end has been on screen.
        this.observer?.disconnect();
        this.observer = new IntersectionObserver(entries => {
            for (const e of entries) {
                const id = e.target.dataset.fine; if (!e.isIntersecting || !id) continue;
                this.onRead?.(unit, id); this.root.querySelector(`.libro-indice a[data-anchor="${id}"]`)?.classList.add('letta'); this.updateProgress();
            }
        }, { root: this.page, threshold: .1 });
        for (const s of this.root.querySelectorAll('.libro-sezione')) { const end = document.createElement('div'); end.dataset.fine = s.id; s.append(end); this.observer.observe(end); }
        // Highlight the section on screen in the table of contents.
        this.page.addEventListener('scroll', () => this.highlight(), { passive: true }); this.highlight();
        this.page.focus({ preventScroll: true });
    }
    highlight() {
        const top = this.page.getBoundingClientRect().top + 80; let current = null;
        for (const h of this.root.querySelectorAll('.libro-sezione')) if (h.getBoundingClientRect().top <= top) current = h.id;
        for (const a of this.root.querySelectorAll('.libro-indice a')) a.classList.toggle('attiva', a.dataset.anchor === current);
    }
    updateProgress() {
        const all = [...this.root.querySelectorAll('.libro-sezione')], read = all.filter(s => this.isRead(this.unit, s.id)).length, label = this.root.querySelector('[data-avanzamento]'), bar = this.root.querySelector('[data-barra]');
        if (label) label.textContent = `Sezioni lette: ${read} di ${all.length}`; if (bar) bar.style.width = (all.length ? 100 * read / all.length : 0) + '%';
    }
    scrollTo(id, smooth = false) { const el = this.root.querySelector('#' + CSS.escape(id)); if (el) { el.scrollIntoView({ block: 'start', behavior: smooth ? 'smooth' : 'instant' }); this.section = id; } this.root.classList.remove('indice-aperto'); }
    async typeset(section = null) {
        const unit = this.unit;
        try {
            const MJ = await loadMathJax(), parts = [...this.root.querySelectorAll('.libro-capitolo > *')];
            const stop = section ? parts.findIndex(p => p.id === section || p.querySelector?.('#' + CSS.escape(section))) : -1;
            const first = parts.slice(0, Math.max(stop + 1, 2)), rest = parts.slice(first.length);
            if (first.length) { await MJ.typesetPromise(first); this.wideFormulas(first); }
            if (section && this.unit === unit) this.scrollTo(section);
            // Long chapters: typeset the remaining sections a few at a time, keeping the page responsive.
            for (let i = 0; i < rest.length && this.unit === unit; i += 3) { await MJ.typesetPromise(rest.slice(i, i + 3)); this.wideFormulas(rest.slice(i, i + 3)); await new Promise(r => setTimeout(r, 0)); }
            if (this.unit === unit) this.root.dataset.formule = 'pronte';
        } catch (e) { this.root.dataset.formule = 'errore'; console.warn('GAIA libro:', e.message); }
    }
    /** Inline formulas wider than the column (on phones) become a line of their own that scrolls sideways. */
    wideFormulas(parts) {
        const width = this.root.querySelector('.libro-capitolo')?.clientWidth || 0; if (!width) return;
        for (const p of parts) for (const c of p.querySelectorAll?.('mjx-container:not([display="true"])') || []) if (c.getBoundingClientRect().width > width) c.classList.add('libro-formula-lunga');
    }
    /** Loads the SVG figures of the chapter when they come near the screen (all of them before printing). */
    figures(base) {
        this.figureObserver?.disconnect();
        const load = async el => {
            if (el.dataset.stato) return; el.dataset.stato = 'carico';
            try {
                const svg = await this.fetchText(base + el.dataset.src);
                if (!/^\s*<svg[\s>]/.test(svg) || /<script|<foreignObject|\son\w+\s*=/i.test(svg)) throw new Error('figura non valida');
                el.innerHTML = svg; el.dataset.stato = 'pronta';
            } catch (e) { el.dataset.stato = 'errore'; el.textContent = 'Figura non disponibile'; }
        };
        const all = [...this.root.querySelectorAll('.libro-svg-esterno[data-src]')];
        this.loadAllFigures = () => Promise.all(all.map(load));
        if (typeof IntersectionObserver !== 'function') { this.loadAllFigures(); return; }
        this.figureObserver = new IntersectionObserver(entries => { for (const e of entries) if (e.isIntersecting) { this.figureObserver.unobserve(e.target); load(e.target); } }, { root: this.page, rootMargin: '900px 0px' });
        for (const el of all) this.figureObserver.observe(el);
    }
    click(e) {
        const a = e.target.closest('a,button,[data-azione]'); if (!a || !this.root.contains(a)) return;
        if (a.dataset.azione === 'chiudi') { e.preventDefault(); this.onClose?.(); return; }
        if (a.dataset.azione === 'stampa') { e.preventDefault(); Promise.resolve(this.loadAllFigures?.()).finally(() => print()); return; }
        if (a.dataset.azione === 'indice') { e.preventDefault(); this.root.classList.toggle('indice-aperto'); return; }
        if (a.dataset.unit) { e.preventDefault(); this.onUnit?.(a.dataset.unit, a.dataset.anchor || null); return; }
        if (a.dataset.anchor) { e.preventDefault(); this.scrollTo(a.dataset.anchor, true); }
    }
}
