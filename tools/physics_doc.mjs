/** Writes docs/FISICA_PIANETI.md from the physical model (src/worlds/physics.js and planet-physics.js). */
import fs from 'node:fs';
import * as P from '../src/worlds/physics.js';
import { planetPhysics, it, speciesCount } from '../src/worlds/planet-physics.js';
import { systemArchitecture, AREAS, SYSTEM_COUNT, LOG_SCALE } from '../src/scene/systems.js';

const root = new URL('../', import.meta.url), catalogue = JSON.parse(fs.readFileSync(new URL('content/catalogue.json', root), 'utf8')).modules;
const planets = planetPhysics(), NAMES = { terrestrial: 'terrestre', oceanic: 'oceanico', desert: 'desertico', barren: 'roccioso senza aria', arctic: 'glaciale', volcanic: 'vulcanico' };
const ZONE = { interna: 'interna', abitabile: 'abitabile', esterna: 'esterna' };
const f = P.FAMILIES, w = k => `${f[k].window[0]}-${f[k].window[1]} K`, a = k => `${it(f[k].albedo[0], 2)}-${it(f[k].albedo[1], 2)}`;
const out = [];
out.push(`# Fisica dei pianeti

Dalla versione 1.27.0 ogni sistema stellare e ogni pianeta esplorabile hanno un modello fisico. La stella ha un sottotipo spettrale con temperatura, luminosità, raggio e massa; ogni corpo del sistema ha un semiasse maggiore in unità astronomiche e un periodo orbitale; ogni pianeta esplorabile ha un albedo, una temperatura di equilibrio, un effetto serra e una temperatura superficiale, che insieme spiegano quello che il sito già disegna: i mari liquidi dei pianeti terrestri e oceanici, i ghiacci dei pianeti glaciali, i laghi caldi dei pianeti vulcanici. La carta d'identità di ogni pianeta (\`docs/CARTE_IDENTITA.md\`) resta invariata. Il modello sta in \`src/worlds/physics.js\` e \`src/worlds/planet-physics.js\`; questo documento è generato da \`tools/physics_doc.mjs\`, e i test di \`tests/physics.test.mjs\` ricalcolano ogni grandezza.

Nella vista in orbita il pulsante «Dati fisici» apre la scheda del pianeta, divisa in stella e orbita, geosfera, idrosfera, atmosfera e biosfera.

## Stelle

Le stelle sono nane di sequenza principale della tabella di E. Mamajek, «A Modern Mean Dwarf Stellar Color and Effective Temperature Sequence», versione del 16 aprile 2022, ripresa in Pecaut e Mamajek (2013). I sei sistemi di ciascun tipo prendono i sottotipi in ordine, dal più caldo al più freddo. Per tutti i sottotipi usati la luminosità tabulata coincide entro l'1,1 per cento con quella di un corpo nero di pari raggio e temperatura.

| tipo | sottotipi | temperatura (K) | luminosità (Sole = 1) | massa (Sole = 1) |
|---|---|---:|---:|---:|`);
for (const [t, list] of Object.entries(P.SUBTYPES)) {
    const d = list.map(s => P.DWARFS[s]);
    out.push(`| ${t} | ${list.join(', ')} | ${d.at(-1)[0]}-${d[0][0]} | ${it(10 ** d.at(-1)[1], 2)}-${it(10 ** d[0][1], 2)} | ${it(d.at(-1)[3], 3)}-${it(d[0][3], 3)} |`);
}
out.push(`
## Zona abitabile

I bordi della zona abitabile seguono Kopparapu e colleghi (2014): il bordo interno è il limite dell'effetto serra galoppante, quello esterno il limite di massimo effetto serra dell'anidride carbonica, entrambi espressi come flusso efficace in unità del flusso ricevuto dalla Terra e calcolati con i coefficienti del loro programma \`hzcalc.py\`. Per il Sole i due bordi valgono 1,107 e 0,356. La formula vale per temperature efficaci fra 2600 e 7200 K; per le stelle più calde, cioè i sottotipi A e il sottotipo F0V, il modello usa il valore a 7200 K.

## Distanze delle orbite

Ogni famiglia di pianeti esplorabili richiede un intervallo di temperatura superficiale e un intervallo di albedo, riportati nella tabella seguente. Per ogni pianeta il modello calcola l'intervallo di flusso stellare nel quale la temperatura richiesta è raggiungibile con l'albedo della famiglia e con l'effetto serra consentito dalla sua atmosfera; i pianeti terrestri e oceanici devono inoltre stare dentro la zona abitabile, quelli glaciali non oltre il suo bordo interno.

| famiglia | temperatura superficiale | albedo di Bond | profondità ottica minima | analoghi |
|---|---|---|---:|---|
| terrestre | ${w('terrestrial')} | ${a('terrestrial')} | ${it(f.terrestrial.tauMin, 1)} | Terra, albedo 0,294 |
| oceanico | ${w('oceanic')} | ${a('oceanic')} | ${it(f.oceanic.tauMin, 1)} | Terra con più oceano; l'acqua aperta riflette circa il 6 per cento, le nubi alzano l'albedo |
| desertico | ${w('desert')} | ${a('desert')} | 0 | Marte, albedo 0,25 |
| roccioso senza aria | ${w('barren')} | ${a('barren')} | 0 | Luna, albedo 0,11 |
| glaciale | ${w('arctic')} | ${a('arctic')} | 0 | ghiaccio marino giovane, dal 50 al 70 per cento di luce riflessa, con rocce e nubi |
| vulcanico | ${w('volcanic')} | ${a('volcanic')} | ${it(f.volcanic.tauMin, 1)} | dalla Terra a Venere, albedo 0,77 |

Le temperature massime dei pianeti vulcanici e desertici restano compatibili con le specie che li abitano; quelle minime dei pianeti glaciali con le loro piante antigelo.

I pianeti esplorabili vengono disposti nell'ordine che li lascia tutti il più possibile dentro il proprio intervallo; fra gli ordini quasi altrettanto robusti si preferisce quello che va dal più caldo, all'interno, al più freddo, all'esterno. Fra due orbite vicine resta sempre una distanza di almeno ${P.HILL_SPACING} raggi di Hill reciproci, soglia oltre la quale sistemi di più pianeti di massa terrestre restano stabili per tempi lunghi (Chambers, Wetherill e Boss 1996). I corpi che non si visitano vanno all'interno se sono caldi (mondi rocciosi nudi, desertici, vulcanici e simili a Venere) e all'esterno se sono freddi (giganti gassosi oltre la linea della neve, giganti ghiacciati, mondi gelati). Le masse sono stimate dal raggio disegnato: i pianeti rocciosi hanno la densità della Terra, quindi raggio e gravità in unità terrestri coincidono e la massa ne è il cubo; i giganti gassosi vanno da Saturno (95,16 masse terrestri) a Giove (317,83), quelli ghiacciati da Urano (14,54) a Nettuno (17,15).

Nella vista del sistema il raggio disegnato di un'orbita cresce con il logaritmo naturale del semiasse, di ${it(LOG_SCALE, 2)} unità della scena ogni volta che la distanza si moltiplica per il numero di Nepero, senza scendere sotto la spaziatura minima fra due pianeti. I numeri dei pianeti indicano l'ordine di studio dell'area.

## Temperatura

La temperatura di equilibrio di un pianeta che riceve il flusso S, in unità del flusso terrestre di 1361 W/m², con albedo di Bond A è

T_eq = [S · 1361 W/m² · (1 − A) / (4σ)]^(1/4),

con σ la costante di Stefan-Boltzmann. L'effetto serra è quello di un'atmosfera grigia in equilibrio radiativo, nell'approssimazione di Eddington:

T_s = T_eq · (1 + 3τ/4)^(1/4),

dove τ è la profondità ottica infrarossa dell'atmosfera. Il modello è tarato sui tre pianeti rocciosi con atmosfera del sistema solare, con i valori delle schede planetarie della NASA:

| pianeta | irradianza (W/m²) | albedo di Bond | T_eq (K) | temperatura media (K) | pressione (bar) | profondità ottica |
|---|---:|---:|---:|---:|---:|---:|`);
for (const [name, b] of [['Venere', P.CALIBRATION.venus], ['Terra', P.CALIBRATION.earth], ['Marte', P.CALIBRATION.mars]]) {
    out.push(`| ${name} | ${it(b.irradiance, 5)} | ${it(b.albedo, 3)} | ${it(P.equilibriumTemperature(b.irradiance / P.S_EARTH, b.albedo), 4)} | ${b.ts} | ${it(b.p, 3)} | ${it(P.calibratedDepth(b), 3)} |`);
}
out.push(`
Venere e Marte hanno atmosfere quasi di sola anidride carbonica (96,5 e 95,1 per cento in volume). La legge di potenza che passa per i due punti, τ = ${it(P.CO2_ENVELOPE.c, 3)} · p^${it(P.CO2_ENVELOPE.n, 3)} con p in bar, dà la profondità ottica di un'atmosfera di sola anidride carbonica alla pressione p; un'atmosfera reale sta fra zero e questa curva. La Terra, fatta per lo più di azoto e ossigeno, ha il ${it(100 * P.calibratedDepth(P.CALIBRATION.earth) / P.co2Depth(P.CALIBRATION.earth.p), 2)} per cento dell'opacità che avrebbe con sola anidride carbonica alla stessa pressione. Nel modello la profondità ottica di ogni pianeta resta sotto la curva, sopra il minimo della sua famiglia, e ne determina la temperatura superficiale.

La pressione al suolo viene dalla densità dell'atmosfera della carta d'identità, d fra 0 e 1, con la scala logaritmica p = 10^(4,5 d − 2,5) bar: d = 0,05 dà la pressione di Marte, d = 0,55 circa un bar, d = 0,95 circa sessanta bar. Sotto d = ${it(P.APPRECIABLE_DENSITY, 1)} il pianeta ha soltanto un'esosfera, senza effetto serra.

## Limiti

Il modello è a dimensione zero: una sola temperatura per pianeta, senza stagioni, senza circolazione e senza il legame fra nubi, albedo e temperatura. Le orbite sono circolari nel calcolo dei flussi, la rotazione sincrona dei pianeti vicini alle nane rosse non è trattata, e le masse dei corpi vengono da una regola sul raggio. Albedo, profondità ottica e posizione di ogni pianeta sono scelti dentro gli intervalli della sua famiglia, così che il pianeta mostri il clima che il sito disegna; sono quindi valori plausibili e coerenti con le leggi fisiche del modello, scelti per il sito in assenza di misure. Per le stelle di tipo A la zona abitabile è un'estrapolazione.

## Pianeti

Per ogni sistema: sottotipo della stella, e per ogni pianeta esplorabile la distanza dalla stella in unità astronomiche, il periodo, il flusso ricevuto rispetto alla Terra, la posizione rispetto alla zona abitabile, la temperatura superficiale, la pressione e la profondità ottica.
`);
for (let id = 0; id < SYSTEM_COUNT; id++) {
    const L = systemArchitecture(id), s = L.star, lo = Math.sqrt(s.luminosity / s.hz.inner), hi = Math.sqrt(s.luminosity / s.hz.outer);
    out.push(`### ${id + 1}. ${AREAS[id].name}

Stella ${s.spt}, ${s.teff} K, luminosità ${it(s.luminosity, 2)} volte quella del Sole, massa ${it(s.mass, 3)}; zona abitabile fra ${it(lo, 2)} e ${it(hi, 2)} UA. Corpi del sistema: ${L.bodies.length}.

| unità | famiglia | distanza (UA) | periodo (giorni) | flusso | zona | temperatura (K) | pressione (bar) | τ |
|---|---|---:|---:|---:|---|---:|---:|---:|`);
    for (const b of L.bodies.filter(b => b.explorable)) {
        const p = planets[b.index];
        out.push(`| ${catalogue[b.index].title} | ${NAMES[p.family]} | ${it(p.a, 3)} | ${it(p.period, 3)} | ${it(p.flux, 2)} | ${ZONE[p.zone]} | ${Math.round(p.ts)} | ${p.pressure ? it(p.pressure, 2) : 'esosfera'} | ${it(p.tau, 2)} |`);
    }
    out.push('');
}
out.push(`## Fonti

- E. Mamajek, «A Modern Mean Dwarf Stellar Color and Effective Temperature Sequence», versione 2022.04.16: https://www.pas.rochester.edu/~emamajek/EEM_dwarf_UBVIJHK_colors_Teff.txt; M. J. Pecaut, E. E. Mamajek, ApJS 208, 9 (2013).
- R. K. Kopparapu e colleghi, ApJL 787, L29 (2014); coefficienti in \`hzcalc.py\`: https://personal.ems.psu.edu/~jfk4/ruk15/planets/hzcalc.py.
- NASA, schede planetarie di Venere, Terra, Marte e Luna: https://nssdc.gsfc.nasa.gov/planetary/factsheet/.
- J. E. Chambers, G. W. Wetherill, A. P. Boss, «The Stability of Multi-Planet Systems», Icarus 119, 261 (1996).
- Unione Astronomica Internazionale, risoluzione B3 del 2015: irradianza solare totale nominale di 1361 W/m², temperatura efficace nominale del Sole di 5772 K.
- CODATA 2018 per la costante di Stefan-Boltzmann.
- Canadian Cryospheric Information Network, «Sea Ice Energy Flux», sull'albedo dell'acqua aperta e del ghiaccio marino.
`);
fs.writeFileSync(new URL('docs/FISICA_PIANETI.md', root), out.join('\n'));
console.log('docs/FISICA_PIANETI.md:', planets.length, 'pianeti');
