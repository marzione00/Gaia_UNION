/** Author and licence of GAIA (1.61.1), the same as in LICENSE, LICENSE.md, package.json and index.html:
 * tests/licenza.test.mjs keeps them in step. */
export const AUTHOR = 'Marzio De Corato';
export const LICENCE = Object.freeze({
    name: 'Creative Commons Attribuzione-NonCommerciale 4.0 Internazionale',
    short: 'CC BY-NC 4.0',
    spdx: 'CC-BY-NC-4.0',
    url: 'https://creativecommons.org/licenses/by-nc/4.0/deed.it',
});
/** The line in the bottom bar of every screen: the long form where it fits, the short one on phones. */
export const CREDIT = Object.freeze({ long: `${AUTHOR} · Licenza ${LICENCE.short}`, short: `${AUTHOR} · ${LICENCE.short}` });
/** First entry of the page «FONTI». */
export const LICENCE_ROW = Object.freeze(['AUTORE E LICENZA',
    `GAIA è un progetto di ${AUTHOR}. Codice, documentazione e contenuti originali sono distribuiti con licenza ${LICENCE.name} (${LICENCE.short}): si possono condividere e adattare per fini non commerciali, citando l’autore e la licenza e indicando le modifiche. I materiali di terzi conservano le loro condizioni.`]);
