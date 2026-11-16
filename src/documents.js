/** The two original handouts shown page by page in the reader. Keys are used in URLs (?doc=fis). */
export const DOCUMENTS = Object.freeze({
    mat: Object.freeze({ key: 'mat', id: 'math-2026', title: 'Matematica di base', file: 'materials/matematica-di-base.pdf', index: 'assets/pdf/index.json', pages: 769, defaultPage: 245, offset: 12 }),
    fis: Object.freeze({ key: 'fis', id: 'physics-2026', title: 'Fisica generale e moderna', file: 'materials/fisica-generale-e-moderna.pdf', index: 'assets/pdf-fisica/index.json', pages: 726, defaultPage: 14, offset: null })
});
/** Document key of a catalogue source or course `originalSource`; the mathematics handout by default. */
export const docOf = source => source?.doc === 'fis' ? 'fis' : 'mat';
export const docKey = value => value === 'fis' ? 'fis' : 'mat';
/** Printed page label: an offset for mathematics, the label stored in the page index for physics. */
export function printedLabel(key, page, entry) {
    const d = DOCUMENTS[docKey(key)];
    if (d.offset !== null) return page > d.offset ? String(page - d.offset) : null;
    return entry?.label ?? null;
}
