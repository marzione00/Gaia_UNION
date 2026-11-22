/** Writes docs/ESERCIZI_SISTEMI.md (1.56.0): one complete example of every exercise drawn from the systems of the
 * galaxy, with fixed seeds, so that a teacher can read questions, options and solutions before a lesson:
 * `node scripts/esercizi-esempi.mjs`. tests/serie.test.mjs checks that the file matches the code. */
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { Frontier } from '../src/craft/swarm.js';
import { EXERCISE_SETS, EXAMPLE_STATIONS } from '../src/craft/esercizi-indice.js';
import { AREAS } from '../src/scene/systems.js';

/** The frontier of the examples of a set: session seed 7919, at the first multiple of five minutes of the
 * model of the galaxy at which the set contains all its exercises. */
export function exampleFrontier(set) {
    const F = new Frontier(7919, 0);
    for (let t = 0; t <= 7200; t += 10) { F.update(t); if (t % 300 === 0 && t > 0 && set.ids.every(id => set.make(F, 1).some(x => x.id === id))) return { F, t }; }
    throw new Error('nessuno stato del fronte contiene tutti gli esercizi di ' + set.topic);
}
const plural = (n, one, many) => n === 1 ? `1 ${one}` : `${n} ${many}`;
const block = e => [`#### ${e.title}`, '', `Unità ${e.unit}.`, '', e.prompt, '', ...e.options.map((o, k) => `${'ABCD'[k]}. ${o}${k === e.correct ? ' (corretta)' : ''}`).flatMap(l => [l, '']), 'Svolgimento:', '', ...e.steps.map(s => `- ${s}`), ''];
export function examplesMarkdown() {
    const out = [];
    out.push('# Esempi di esercizi dai sistemi della galassia', '');
    out.push('Questo file mostra un esempio completo di ogni esercizio delle quattro serie descritte in `docs/GUIDA_DOCENTE.md`. Nel sito i numeri cambiano a ogni apertura, perché vengono dallo stato della simulazione in quel momento; qui sono fissati da un seme, per poterli leggere prima di una lezione. Il file è generato con `node scripts/esercizi-esempi.mjs` e `tests/serie.test.mjs` controlla che corrisponda al codice.', '');
    out.push(`Le serie legate al Rapporto usano il fronte della galassia con seme di sessione 7919, nel primo momento, a multipli di cinque minuti, in cui la serie contiene tutti i suoi esercizi. Gli esercizi sulle stazioni usano due stazioni del sistema «${AREAS[EXAMPLE_STATIONS[0].system].name}» con le scorte estratte come all'avvio dell'economia: la prima si ferma quando manca una merce, la seconda rallenta a metà ritmo.`, '');
    for (const set of EXERCISE_SETS) {
        out.push(`## ${set.title}`, '', `Versione ${set.version}; unità ${set.units.join(' e ')}. Si apre ${set.opens}.`, '');
        if (set.topic === 'stazioni') for (const e of EXAMPLE_STATIONS) { out.push(`### ${e.name}`, ''); for (const x of set.make(e, 1)) out.push(...block(x)); }
        else { const { F, t } = exampleFrontier(set); out.push(`Stato del fronte dopo ${t / 60} minuti: ${plural(F.count, 'incursione lanciata', 'incursioni lanciate')}, ${plural(F.record.length, 'conclusa', 'concluse')}, ${plural(F.keys.length, 'chiave ricavata', 'chiavi ricavate')}.`, ''); for (const x of set.make(F, 1)) out.push(...block(x)); }
    }
    return out.join('\n');
}
if (process.argv[1] === fileURLToPath(import.meta.url)) {
    fs.writeFileSync(new URL('../docs/ESERCIZI_SISTEMI.md', import.meta.url), examplesMarkdown());
    console.log('docs/ESERCIZI_SISTEMI.md');
}
