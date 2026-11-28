/** Writes docs/METEO.md, the weather of the zones of the landing sites (1.79.0), from the code of
 * src/worlds/weather.js and the physical cards of the 125 planets: `node scripts/meteo.mjs`. tests/meteo.test.mjs
 * checks that the file matches the code. */
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { allClimates, EARTH, WEATHER_KINDS, CLEAR_START, EPISODE, RAMP, DROP, FLAKE, DUST, ASH, BODY } from '../src/worlds/weather.js';
import { PLANET_TYPES } from '../src/scene/planet-types.js';

const dec = (v, d = 1) => v.toFixed(d).replace('.', ','), median = l => { const s = [...l].sort((a, b) => a - b); return s.length % 2 ? s[(s.length - 1) / 2] : (s[s.length / 2 - 1] + s[s.length / 2]) / 2; };
const speed = v => dec(v, v < 1 ? 2 : 1), density = v => dec(v, v < .1 ? 3 : 2);
/** What each kind needs, in words. */
const NEEDS = {
    sereno: 'ogni pianeta', nuvoloso: 'pressione di almeno 0,01 bar', pioggia: 'acqua liquida in superficie (pianeti terrestri, oceanici e vulcanici), pressione oltre 0,2 bar',
    neve: 'pianeti glaciali con almeno 0,01 bar, pianeti terrestri sotto 10 °C', nebbia: 'acqua in superficie e pressione di almeno 0,2 bar', polvere: 'pianeti desertici con almeno 0,004 bar', cenere: 'pianeti vulcanici'
};
/** The row of planet i in the list of the file. */
export function climateRow(C, title) {
    const has = k => k in C.kinds, kinds = Object.keys(C.kinds).map(k => WEATHER_KINDS[k].label).join(', ');
    if (!(C.air.rho > 0)) return `| ${C.index + 1}. ${title} | ${PLANET_TYPES[C.family].name} | 0 | sereno, senza atmosfera | – | – | – | – |`;
    return `| ${C.index + 1}. ${title} | ${PLANET_TYPES[C.family].name} | ${density(C.air.rho)} | ${kinds} | ${has('pioggia') ? speed(C.rain.v) : '–'} | ${has('neve') ? speed(C.snow.v) : '–'} | ${has('polvere') ? dec(C.dust.wind, 0) : '–'} | ${has('cenere') ? speed(C.ash.v) : '–'} |`;
}
export function weatherMarkdown(data = allClimates(), titles = JSON.parse(fs.readFileSync(new URL('../content/catalogue.json', import.meta.url), 'utf8')).modules.map(m => m.title)) {
    const out = [], count = k => data.filter(C => k in C.kinds).length, airless = data.filter(C => !(C.air.rho > 0)).length, withAir = data.filter(C => C.air.rho > 0);
    const range = (list, f, d) => { const v = list.map(f); return [Math.min(...v), Math.max(...v)].map(x => dec(x, d)); }, name = C => `«${titles[C.index]}» (pianeta ${C.index + 1})`;
    const rainy = data.filter(C => 'pioggia' in C.kinds), snowy = data.filter(C => 'neve' in C.kinds), dusty = data.filter(C => 'polvere' in C.kinds), ashy = data.filter(C => 'cenere' in C.kinds), foggy = data.filter(C => 'nebbia' in C.kinds);
    const slow = rainy.reduce((a, C) => C.rain.v < a.rain.v ? C : a), fast = rainy.reduce((a, C) => C.rain.v > a.rain.v ? C : a);
    out.push('# Meteo delle zone di atterraggio', '');
    out.push('Questo file è generato da `node scripts/meteo.mjs` a partire da `src/worlds/weather.js`; `tests/meteo.test.mjs` controlla che corrisponda al codice.', '');
    out.push(`Dalla versione 1.79.0 ogni zona di atterraggio ha il proprio meteo, ricavato dalla carta d'identità del pianeta: la pressione, la temperatura media, la quota di anidride carbonica e la famiglia dicono quali fenomeni l'aria, l'acqua e il calore permettono. I tipi sono ${Object.keys(WEATHER_KINDS).length}: cielo sereno, cielo coperto, pioggia, neve, nebbia, tempesta di polvere e pioggia di cenere. I ${airless} pianeti senza atmosfera restano sempre sereni e senza vento.`, '');
    out.push(`Dopo ogni atterraggio il cielo resta sereno per ${CLEAR_START} s; poi il meteo segue episodi da ${EPISODE[0]} a ${EPISODE[1]} s, ciascuno di un tipo estratto con i pesi del pianeta e mai uguale al precedente, che cresce e cala in ${RAMP} s, con il proprio vento. La sequenza viene dal seme del pianeta, quindi lo stesso pianeta ripete lo stesso meteo dopo ogni atterraggio. La scena abbassa la luce della stella e del cielo, porta la nebbia al colore del fenomeno e alla sua visibilità e disegna attorno alla camera fino a 1500 gocce, fiocchi o granelli, 1000 con la grafica bilanciata e 600 con quella leggera, che cadono alla velocità calcolata per il pianeta e vanno con il vento.`, '');
    out.push('## Tipi di meteo', '', '| Tipo | Dove | Luce a piena intensità | Visibilità a piena intensità | Vento | Pianeti |', '|---|---|---:|---:|---|---:|');
    for (const [k, K] of Object.entries(WEATHER_KINDS)) out.push(`| ${K.name} | ${NEEDS[k]} | ${Math.round((1 - K.dim) * 100)}% | ${K.sight === Infinity ? 'invariata' : K.sight + ' m'} | ${K.wind ? `da ${K.wind[0]} a ${K.wind[1]} m/s` : 'da 1,2 a 2 volte la soglia della polvere'} | ${count(k)} |`);
    out.push('');
    out.push('## La fisica', '');
    out.push(`L'aria al suolo ha la densità dei gas ideali, ρ = pM/(RT), con la massa molare che va da 29 g/mol per un'aria di azoto e ossigeno a 44 g/mol per un'aria di sola anidride carbonica: sui ${withAir.length} pianeti con atmosfera va da ${range(withAir, C => C.air.rho, 3)[0]} a ${range(withAir, C => C.air.rho, 1)[1]} kg/m³, contro ${density(EARTH.air.rho)} kg/m³ sulla Terra. Il pannello METEO, nella vista dell'esploratore, mostra i numeri del pianeta e il calcolo del fenomeno in corso.`, '');
    out.push(`- Pioggia: una goccia di ${Math.round(DROP.r * 2000)} mm cade alla velocità limite v = √(8 r ρ_acqua g / (3 C ρ)), con C = ${dec(DROP.cd, 1)}, quando l'attrito dell'aria pareggia il peso: ${speed(EARTH.rain)} m/s sulla Terra, da ${speed(slow.rain.v)} m/s su ${name(slow)} a ${speed(fast.rain.v)} m/s su ${name(fast)}.`);
    out.push(`- Neve: un fiocco di ${Math.round(FLAKE.r * 2000)} mm, con una densità di ${FLAKE.rho} kg/m³ e C = ${dec(FLAKE.cd, 1)}, cade a ${speed(EARTH.snow)} m/s sulla Terra e da ${range(snowy, C => C.snow.v, 1).join(' a ')} m/s sui ${snowy.length} pianeti con la neve: nell'aria rarefatta dei pianeti glaciali scende più in fretta.`);
    out.push(`- Nebbia: l'aria satura contiene al più ρ_v = e_s/(R_v T) di vapore, con la pressione di saturazione e_s dalla relazione di Clausius e Clapeyron: ${dec(EARTH.fog.density, 1)} g/m³ sulla Terra a 15 °C, da ${range(foggy, C => C.fog.density, 2)[0]} a ${range(foggy, C => C.fog.density, 0)[1]} g/m³ sui ${foggy.length} pianeti con la nebbia.`);
    out.push(`- Tempesta di polvere: il vento solleva granelli di ${dec(DUST.d * 1000, 1)} mm quando la velocità d'attrito supera u* = ${dec(DUST.a, 1)} √((ρ_g − ρ) g d / ρ) (Bagnold), cioè con un vento a 2 m dal suolo di u*/0,4 · ln(2/0,01): circa ${dec(EARTH.dust.wind, 0)} m/s sulla Terra, da ${range(dusty, C => C.dust.wind, 0).join(' a ')} m/s sui ${dusty.length} pianeti desertici con aria. Le tempeste soffiano da 1,2 a 2 volte quella soglia.`);
    out.push(`- Cenere: un granello di ${Math.round(ASH.r * 2e6)} μm cade secondo la legge di Stokes, v = 2(ρ_g − ρ) g r² / (9η), che dipende dalla viscosità η dell'aria: ${speed(EARTH.ash)} m/s sulla Terra, da ${range(ashy, C => C.ash.v, 2).join(' a ')} m/s sui ${ashy.length} pianeti vulcanici.`);
    out.push(`- Vento: spinge l'esploratore con F = ½ ρ v² C A, con C = ${BODY.cd} e A = ${dec(BODY.area, 1)} m², contro il peso di ${BODY.mass} kg con la tuta.`, '');
    out.push('## Pianeti', '', 'Densità dell\'aria al suolo in kg/m³; velocità di caduta di gocce, fiocchi e cenere in m/s; vento che solleva la polvere in m/s a 2 m dal suolo. Un trattino indica un fenomeno assente sul pianeta.', '', '| Pianeta | Famiglia | Aria | Meteo possibile | Goccia | Fiocco | Polvere | Cenere |', '|---|---|---:|---|---:|---:|---:|---:|');
    for (const C of data) out.push(climateRow(C, titles[C.index]));
    out.push('');
    return out.join('\n');
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
    fs.writeFileSync(new URL('../docs/METEO.md', import.meta.url), weatherMarkdown());
    console.log('docs/METEO.md scritto.');
}
