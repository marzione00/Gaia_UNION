/** «Che cosa succede» (1.58.0): the side panel of the object followed by the camera in a system. Each kind
 * of object gets live numbers and a concept of a unit, with its formula worked out on those numbers. The
 * subjects come from the scene (src/scene/world.js, followSubject); this module only writes the panel, so
 * it can be tested on numbers chosen by hand. Distances on the map are in units of the map (u) and times in
 * seconds of the model (s); planets and stars use their physical values. */
import { dec } from './esercizi.js';

/** Units of the curriculum quoted by the panel, with their titles (checked against the catalogue). */
export const CONCEPT_UNITS = Object.freeze({
    'physics-02': 'Vettori e sistemi di riferimento',
    'physics-03': 'Moto rettilineo uniforme',
    'physics-04': 'Moto uniformemente accelerato',
    'physics-10': 'Rotazione e momento d’inerzia',
    'physics-13': 'Orbite circolari',
    'physics-30': 'Radiazione termica e luce delle stelle',
    'chemistry-14': 'Stechiometria e reagente limitante',
    'chemistry-15': 'Resa e bilanci di materia',
    'chemistry-17': 'Velocità di reazione',
});
/** Wien's constant in nm·K, the Sun's effective temperature in K and Earth's orbital speed in km/s. */
export const WIEN = 2.898e6, T_SUN = 5772, V_EARTH = 29.78;
const YEAR = 365.25, TAU = Math.PI * 2;
const secs = t => Math.max(0, Math.ceil(t)) + ' s';
const qty = (v, unit, name) => `${dec(v, v >= 10 ? 1 : 2)} ${unit} di ${name}`;
const concept = (unit, text) => ({ unit, title: CONCEPT_UNITS[unit], text });

/** Physical orbit of a planet: period in days, speed in km/s and light received relative to Earth, from the
 * distance `a` in au, the mass `M` and the luminosity `L` of the star in solar units. */
export function orbitOf(a, M, L) {
    const years = Math.sqrt(a ** 3 / M);
    return { years, days: years * YEAR, speed: V_EARTH * Math.sqrt(M / a), flux: L / a ** 2, kepler: 1 / M };
}
/** Peak wavelength in nm and luminosity from radius and temperature, in solar units. */
export function starOf(teff, R) { return { peak: WIEN / teff, L: R ** 2 * (teff / T_SUN) ** 4 }; }

/** The panel of a subject: tag, title, rows of [label, value], the concept with its unit, and the buttons
 * the object allows (catalogue, exercises). */
export function whatHappens(x) {
    if (x.kind === 'ship') return ship(x);
    if (x.kind === 'station') return station(x);
    if (x.kind === 'service') return service(x);
    if (x.kind === 'planet') return planet(x);
    if (x.kind === 'star') return star(x);
    throw new Error('oggetto sconosciuto: ' + x.kind);
}
function ship(x) {
    const load = x.cargo ? qty(x.cargo.amount, x.cargo.unit, x.cargo.name) : 'Nessuno';
    if (x.travel) {
        const v = x.L / Math.max(1e-6, x.T), guess = x.rem / Math.max(1e-6, v), left = Math.max(0, x.left);
        const end = guess > left + .5 ? `la nave ha ancora da accelerare e arriva prima, fra ${dec(left, 1)} s` : guess < left - .5 ? `la nave frena per attraccare e arriva più tardi, fra ${dec(left, 1)} s` : `e la nave arriva proprio fra ${dec(left, 1)} s`;
        return {
            tag: x.visitor ? 'CONVOGLIO IN VIAGGIO' : 'NAVE IN VIAGGIO', title: x.name, subtitle: x.typeName, style: x.style,
            rows: [['Destinazione', x.to], ['Da percorrere', dec(x.rem, 1) + ' u'], ['Velocità media', dec(v, 2) + ' u/s'], ['Arrivo fra', secs(left)], ['Carico', load]],
            concept: concept('physics-03', `La velocità media è la strada percorsa divisa per il tempo impiegato: ${dec(x.L, 1)} u in ${dec(x.T, 1)} s danno ${dec(v, 2)} u/s. Restano ${dec(x.rem, 1)} u, che a velocità costante richiederebbero ${dec(guess, 1)} s; ${end}.`),
            catalog: x.catalog || null,
        };
    }
    const rows = [['Dove', x.where], ['Attività', x.task], ['Carico', load]];
    if (x.capacity && x.cargo) {
        const share = x.cargo.amount / x.capacity;
        rows.push(['Stiva', `${dec(share * 100, 0)} % di ${dec(x.capacity, 0)} ${x.cargo.unit}`], ['Riparte fra', secs(x.left)]);
        return { tag: x.visitor ? 'CONVOGLIO ATTRACCATO' : 'NAVE ATTRACCATA', title: x.name, subtitle: x.typeName, style: x.style, rows,
            concept: concept('chemistry-15', `Nel carico e nello scarico la merce cambia soltanto posto: quello che lascia il magazzino della stazione entra nella stiva, e la somma delle due quantità resta uguale. Nella stiva ci sono ${qty(x.cargo.amount, x.cargo.unit, x.cargo.name)} su ${dec(x.capacity, 0)} ${x.cargo.unit}, cioè il ${dec(share * 100, 0)} %.`), catalog: x.catalog || null };
    }
    rows.push(['Riparte fra', secs(x.left)]);
    return { tag: x.visitor ? 'CONVOGLIO ATTRACCATO' : 'NAVE IN SOSTA', title: x.name, subtitle: x.typeName, style: x.style, rows,
        concept: concept('physics-02', `Accanto alla stazione la nave è ferma rispetto a lei, eppure si muove con lei: rispetto alla stella la stazione viaggia a ${dec(x.frameSpeed, 2)} u/s, e la nave alla stessa velocità. Velocità e quiete dipendono dal sistema di riferimento scelto.`), catalog: x.catalog || null };
}
function station(x) {
    const rows = [['Processo', x.process || 'Nessuno'], ['Livello', String(x.level)]];
    const out = x.make[0], state = x.gate ? 'Scambi in corso' : x.missing.length ? `Ferma: manca ${x.missing[0]}` : x.producing >= 1 ? 'In produzione' : x.producing > 0 ? 'A metà ritmo' : out ? `Magazzino pieno di ${out.name}` : 'Nessuna produzione';
    if (out) rows.push(['Produce', `${dec(out.rate, 2)} ${out.unit}/s di ${out.name}`]);
    rows.push(['Stato', state]);
    const base = { tag: 'STAZIONE', title: x.name, subtitle: x.typeName, style: x.style, catalog: x.catalog || null, drill: !!x.chain };
    if (x.gate) return { ...base, rows, concept: concept('chemistry-15', `La porta tiene in equilibrio il sistema: importa ${x.gate.imports} merci che mancano ed esporta ${x.gate.exports} merci in eccesso. In ogni bilancio di materia quello che entra meno quello che esce è quello che si accumula nei magazzini.`) };
    if (x.use.length && out) {
        // The limiting input is the one whose stock runs out first at the rate of the recipe.
        const last = x.use.map(u => ({ ...u, time: u.stock / u.rate })).sort((a, b) => a.time - b.time), lim = last[0];
        rows.push(['Finisce prima', `${lim.name}, in ${secs(lim.time)}`]);
        const inputs = x.use.slice(0, 2).map(u => qty(u.rate, u.unit, u.name)).join(' e ') + (x.use.length > 2 ? ` e altre ${x.use.length - 2} merci` : '');
        const why = x.missing.length ? `Ora manca ${x.missing[0]}: senza di essa la ricetta si ferma, anche se le altre scorte abbondano.` : `Il reagente limitante è la scorta che finisce per prima: ${lim.name}, ${dec(lim.stock, 1)} ${lim.unit} a ${dec(lim.rate, 2)} ${lim.unit}/s, basta per ${dec(lim.time, 0)} s.`;
        return { ...base, rows, concept: concept('chemistry-14', `Ogni secondo la ricetta consuma ${inputs} e produce ${qty(out.rate, out.unit, out.name)}. ${why}`) };
    }
    if (out) {
        const fill = (out.cap - out.stock) / Math.max(1e-9, out.rate);
        rows.push(['Magazzino', `${dec(out.stock, 1)} su ${dec(out.cap, 0)} ${out.unit}`]);
        return { ...base, rows, concept: concept('chemistry-17', `La velocità di produzione è la quantità prodotta nell'unità di tempo: ${dec(out.rate, 2)} ${out.unit}/s di ${out.name}, cioè ${dec(out.rate * 60, 1)} ${out.unit} al minuto. Il magazzino ha ancora ${dec(out.cap - out.stock, 1)} ${out.unit} liberi e a questo ritmo si riempie in ${dec(fill, 0)} s.`) };
    }
    rows.push(['Velocità', dec(x.frameSpeed, 2) + ' u/s']);
    return { ...base, rows, concept: concept('physics-02', `La stazione gira attorno al suo ospite, e con lui attorno alla stella: rispetto alla stella viaggia a ${dec(x.frameSpeed, 2)} u/s. Chi è a bordo, rispetto alla stazione, è fermo; la velocità dipende dal sistema di riferimento.`) };
}
function service(x) {
    const f = x.facts, base = { tag: 'SERVIZIO', title: x.name, subtitle: x.typeName, style: x.serviceKind === 'scorta' ? 'difesa' : 'civile' };
    if (x.role === 'spola' || x.role === 'traino') {
        const v = f.d / Math.max(1e-6, f.T), peak = 1.5 * v, acc = 6 * f.d / f.T ** 2;
        const rows = [[f.moving ? 'Verso' : 'Ferma a', f.moving ? f.to : f.from], ['Viaggio', `${dec(f.d, 2)} u in ${dec(f.T, 1)} s`], ['Velocità media', dec(v, 2) + ' u/s'], [f.moving ? 'Arrivo fra' : 'Riparte fra', secs(f.left)]];
        if (x.role === 'spola') return { ...base, rows, concept: concept('physics-03', `La velocità media è la distanza divisa per il tempo: d = ${dec(f.d, 2)} u percorsi in T = ${dec(f.T, 1)} s danno v = d/T = ${dec(v, 2)} u/s. La navetta parte e attracca con dolcezza, e a metà strada tocca ${dec(peak, 2)} u/s, una volta e mezza la media.`) };
        rows.push(['Rimorchio', f.out ? 'Con un container' : 'Vuoto']);
        return { ...base, rows, concept: concept('physics-04', `Il rimorchiatore parte da fermo e si ferma all'arrivo: la velocità cresce da zero a ${dec(peak, 2)} u/s a metà viaggio e torna a zero. L'accelerazione più forte, alla partenza e all'arrivo, vale 6d/T² = ${dec(acc, 3)} u/s²; con il container agganciato la massa da accelerare è più grande, e serve una spinta maggiore.`) };
    }
    if (x.role === 'attesa' || x.role === 'miniera' || x.role === 'ronda') {
        const omega = x.role === 'ronda' ? TAU / f.lap : f.omega, period = TAU / omega, v = omega * f.R;
        const rows = [['Attorno a', f.station], ['Raggio', dec(f.R, 2) + ' u'], ['Un giro in', dec(period, 1) + ' s'], ['Velocità', dec(v, 3) + ' u/s']];
        if (x.role === 'attesa') rows.push(['Turno', f.wait ? `fra ${secs(f.wait)}` : 'All\'attracco']);
        if (x.role === 'ronda') rows.push(['Controllo', f.check ? 'In corso' : `fra ${secs(f.next)}`]);
        const what = x.role === 'attesa' ? `La chiatta gira in coda attorno alla stazione e attracca ogni ${f.cycle} s, nel suo turno di ${f.turn} s.` : x.role === 'miniera' ? 'Il minatore porta il minerale girando attorno alla miniera.' : 'Il modulo controlla lo scafo da un\'orbita inclinata.';
        return { ...base, rows, concept: concept('physics-13', `${what} Nel moto circolare uniforme la velocità è v = 2πR/T = ωR: con R = ${dec(f.R, 2)} u e un giro in ${dec(period, 1)} s risulta ${dec(v, 3)} u/s, sempre tangente alla circonferenza.`) };
    }
    if (x.role === 'fascia') {
        const v = f.omega * f.r, period = TAU / f.omega;
        return { ...base, rows: [['Distanza dalla stella', dec(f.r, 2) + ' u'], ['Velocità angolare', dec(f.omega, 4) + ' rad/s'], ['Velocità', dec(v, 4) + ' u/s'], ['Stiva', `piena al ${dec(f.fill * 100, 0)} %`]],
            concept: concept('physics-10', `Il minatore si muove con la fascia, che ruota come un corpo rigido: ogni roccia compie un giro in ${dec(period, 0)} s, con la stessa velocità angolare ω = ${dec(f.omega, 4)} rad/s. La velocità lineare cresce con la distanza dal centro, v = ωr = ${dec(v, 4)} u/s a ${dec(f.r, 2)} u.`) };
    }
    if (x.role === 'rifornimento') {
        const rows = [['Base', f.park], ['Nave', f.ship || 'Nessuna, in attesa']];
        if (f.left !== null) rows.push(['Travaso', `ancora ${secs(f.left)}`]);
        return { ...base, rows, concept: concept('chemistry-15', f.ship ? `Il propellente passa dalla cisterna alla nave attraverso il tubo: la massa che lascia la cisterna è la stessa che entra nei serbatoi della nave, e la somma delle due resta costante per tutto il travaso${f.transfer ? `, che dura ${dec(f.transfer, 0)} s` : ''}.` : 'La cisterna aspetta la prossima nave alla sua stazione. Quando travasa, la massa che lascia i suoi serbatoi è la stessa che entra in quelli della nave: nel bilancio di materia la somma resta costante.') };
    }
    if (x.role === 'scorta') {
        return { ...base, rows: [['Convoglio', f.convoy], ['Velocità rispetto alla stella', dec(x.speed, 2) + ' u/s'], ['Velocità rispetto al convoglio', '0 u/s']],
            concept: concept('physics-02', `Il caccia vola in formazione accanto al convoglio: rispetto alla stella entrambi viaggiano a ${dec(x.speed, 2)} u/s, nella stessa direzione. La velocità relativa è la differenza dei due vettori, e qui vale zero: visto dal convoglio, il caccia sta fermo.`) };
    }
    throw new Error('ruolo sconosciuto: ' + x.role);
}
function planet(x) {
    const o = orbitOf(x.a, x.M, x.L), period = o.days < 730 ? dec(o.days, o.days < 10 ? 2 : 1) + ' giorni' : dec(o.years, 2) + ' anni';
    const rows = [['Distanza dalla stella', dec(x.a, x.a < .1 ? 4 : 3) + ' UA'], ['Periodo orbitale', period], ['Velocità orbitale', dec(o.speed, 1) + ' km/s'], ['Luce ricevuta', `${dec(o.flux, o.flux < 10 ? 2 : 0)} volte la Terra`]];
    if (x.teq) rows.push(['Temperatura di equilibrio', dec(x.teq, 0) + ' K']);
    return { tag: x.unit ? 'PIANETA DI STUDIO' : 'PIANETA DI CONTORNO', title: x.name, subtitle: x.unit ? x.unit.title : 'Pianeta senza unità di studio', style: null, open: x.unit ? x.unit.id : null, rows,
        concept: concept('physics-13', `Sull'orbita la gravità della stella fa da forza centripeta, quindi v = √(GM/a): con M = ${dec(x.M, 2)} masse solari e a = ${dec(x.a, 3)} UA la velocità è ${dec(o.speed, 1)} km/s. Il periodo segue la terza legge di Keplero, T² = a³/M in anni: T = ${dec(o.years, 3)} anni. Sulla mappa le distanze crescono con il logaritmo e il moto è accelerato.`) };
}
function star(x) {
    const s = starOf(x.teff, x.R);
    return { tag: 'STELLA', title: x.name, subtitle: 'Nana di tipo ' + x.spt, style: null,
        rows: [['Temperatura', dec(x.teff, 0) + ' K'], ['Raggio', dec(x.R, 3) + ' volte il Sole'], ['Massa', dec(x.M, 2) + ' volte il Sole'], ['Luminosità', dec(x.L, x.L < .1 ? 4 : 3) + ' volte il Sole'], ['Picco di emissione', dec(s.peak, 0) + ' nm']],
        concept: concept('physics-30', `La stella emette come un corpo nero: il picco cade a λ = b/T = 2,898·10⁶ nm·K / ${dec(x.teff, 0)} K = ${dec(s.peak, 0)} nm. La potenza cresce con la superficie e con la quarta potenza della temperatura: in unità solari L = R²(T/5772)⁴ = ${dec(x.R, 3)}² × (${dec(x.teff, 0)}/5772)⁴ = ${dec(s.L, 4)}, vicino al valore della tabella delle nane, ${dec(x.L, 4)}.`) };
}
