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
    'physics-08': 'Lavoro ed energia',
    'physics-12': 'Gravitazione',
    'physics-13': 'Orbite circolari',
    'physics-26': 'Onde elettromagnetiche e pressione della luce',
    'biology-23': 'Atmosfere, effetto serra e clima',
    'physics-30': 'Radiazione termica e luce delle stelle',
    'chemistry-11': 'Stati della materia e transizioni',
    'chemistry-14': 'Stechiometria e reagente limitante',
    'chemistry-15': 'Resa e bilanci di materia',
    'chemistry-17': 'Velocità di reazione',
});
/** Units quoted only by the panel on the ground (1.65.0), besides physics-02, physics-03 and, for the jump of
 * the explorer (1.68.0), physics-04. */
export const GROUND_UNITS = Object.freeze({
    'biology-20': 'Fotosintesi e luce di altre stelle',
    'math-c10': 'Combinatoria, probabilità e statistica',
    'math-p07': 'Probabilità, informazione e fenomeni collettivi',
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
/** Colour of the light at dusk under a sky of colour `sky` (1.59.0): the light that crosses a long path of air
 * loses the colours the sky scatters, so the dusk takes the colours the sky lacks. The same formula tints
 * the twilight band of the planets (src/scene/shaders.js, materials 5, 6 and 12). */
export function twilightOf(sky) { const m = Math.max(...sky, .01), c = sky.map(v => Math.min(1, Math.max(.05, 1.05 - v / m * .9))), top = Math.max(...c); return c.map(v => v / top); }
/** Italian name of a colour, masculine or feminine; muted colours are pale, colours without a hue white when
 * bright and grey otherwise. */
export function colourName(rgb, feminine = false) {
    const [r, g, b] = rgb, hi = Math.max(r, g, b), lo = Math.min(r, g, b), sat = hi > 0 ? (hi - lo) / hi : 0;
    if (sat < .08) return hi > .95 ? (feminine ? 'bianca' : 'bianco') : feminine ? 'grigia' : 'grigio';
    const d = hi - lo, h = (hi === r ? ((g - b) / d + 6) % 6 : hi === g ? (b - r) / d + 2 : (r - g) / d + 4) * 60;
    const names = [[15, 'rosso', 'rossa'], [40, 'arancione', 'arancione'], [70, 'giallo', 'gialla'], [160, 'verde', 'verde'], [225, 'azzurro', 'azzurra'], [262, 'blu', 'blu'], [300, 'viola', 'viola'], [345, 'rosa', 'rosa'], [361, 'rosso', 'rossa']];
    const [, m, f] = names.find(([edge]) => h < edge);
    return (feminine ? f : m) + (sat < .25 ? (feminine ? ' pallida' : ' pallido') : '');
}
/** Peak wavelength in nm and luminosity from radius and temperature, in solar units. */
export function starOf(teff, R) { return { peak: WIEN / teff, L: R ** 2 * (teff / T_SUN) ** 4 }; }

/** The panel of a subject: tag, title, rows of [label, value], the concept with its unit, and the buttons
 * the object allows (catalogue, exercises). */
export function whatHappens(x) {
    if (x.ground) return ground(x);
    if (x.kind === 'ship') return ship(x);
    if (x.kind === 'station') return station(x);
    if (x.kind === 'service') return service(x);
    if (x.kind === 'planet') return planet(x);
    if (x.kind === 'star') return star(x);
    if (x.kind === 'comet') return comet(x);
    if (x.kind === 'belt') return belt(x);
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
        // A belt turns in rings (1.60.0): each rock orbits on its own, with the period of Kepler's third law.
        const v = f.omega * f.r, lap = TAU / f.omega, rows = [['Distanza dalla stella', f.au ? dec(f.au, f.au < 10 ? 2 : 1) + ' UA' : dec(f.r, 2) + ' u'], ['Un giro sulla mappa', dec(lap, 0) + ' s'], ['Velocità sulla mappa', dec(v, 3) + ' u/s'], ['Stiva', `piena al ${dec(f.fill * 100, 0)} %`]];
        if (f.au && f.mass) {
            const T = Math.sqrt(f.au ** 3 / f.mass); rows.splice(1, 0, ['Periodo orbitale', dec(T, T < 10 ? 2 : 1) + ' anni']);
            return { ...base, rows, concept: concept('physics-13', `Il minatore segue le rocce del suo anello: in una cintura ogni roccia orbita per conto suo, e per la terza legge di Keplero, T² = a³/M, il periodo cresce con la distanza. A ${dec(f.au, 2)} UA da una stella di ${dec(f.mass, 2)} masse solari un giro dura ${dec(T, 2)} anni; sulla mappa, accelerata, ${dec(lap, 0)} s, più degli anelli interni.`) };
        }
        return { ...base, rows, concept: concept('physics-13', `Il minatore si muove con la fascia: con una velocità angolare ω = ${dec(f.omega, 4)} rad/s compie un giro in ${dec(lap, 0)} s, e a ${dec(f.r, 2)} u dal centro la sua velocità è v = ωr = ${dec(v, 4)} u/s.`) };
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
    // Rows measured by an instrument of the ship stay hidden until it is on board (src/navigation/instruments.js).
    const shown = label => x.hidden?.[label] || null, value = (label, v) => shown(label) || v;
    const o = orbitOf(x.a, x.M, x.L), period = o.days < 730 ? dec(o.days, o.days < 10 ? 2 : 1) + ' giorni' : dec(o.years, 2) + ' anni';
    const orbit = { key: 'orbita', label: 'ORBITA', rows: [['Distanza dalla stella', dec(x.a, x.a < .1 ? 4 : 3) + ' UA'], ['Periodo orbitale', period], ['Velocità orbitale', dec(o.speed, 1) + ' km/s'], ['Luce ricevuta', value('Luce', `${dec(o.flux, o.flux < 10 ? 2 : 0)} volte la Terra`)]],
        concept: concept('physics-13', `Sull'orbita la gravità della stella fa da forza centripeta, quindi v = √(GM/a): con M = ${dec(x.M, 2)} masse solari e a = ${dec(x.a, 3)} UA la velocità è ${dec(o.speed, 1)} km/s. Il periodo segue la terza legge di Keplero, T² = a³/M in anni: T = ${dec(o.years, 3)} anni. Sulla mappa le distanze crescono con il logaritmo e il moto è accelerato.`) };
    const pages = [orbit], A = x.atm;
    if (A) {
        // Greenhouse effect of a grey atmosphere (src/worlds/physics.js): Ts = Teq (1 + 0.75 τ)^(1/4).
        const known = !shown('Pressione') && !shown('Effetto serra') && !shown('Temperatura');
        const rows = A.exosphere ? [['Pressione al suolo', value('Pressione', 'esosfera, meno di un centesimo di bar')], ['Temperatura al suolo', value('Temperatura', dec(A.ts, 0) + ' K')]]
            : [['Pressione al suolo', value('Pressione', dec(A.pressure, A.pressure < 10 ? 2 : 0) + ' bar')], ['Profondità ottica', value('Effetto serra', dec(A.tau, 2))], ['Temperatura di equilibrio', value('Temperatura', dec(A.teq, 0) + ' K')], ['Temperatura al suolo', value('Temperatura', dec(A.ts, 0) + ' K')], ['Effetto serra', value('Effetto serra', `${dec(A.greenhouse, 0)} K`)]];
        const text = A.exosphere ? (known ? `Senza un'atmosfera apprezzabile manca l'effetto serra: la superficie resta alla temperatura di equilibrio, ${dec(A.ts, 0)} K, quella di un corpo che riflette il ${dec(A.albedo * 100, 0)} % della luce e irraggia il resto.` : 'Senza un\'atmosfera apprezzabile manca l\'effetto serra, e la superficie resta alla temperatura di equilibrio. Il radiometro infrarosso di bordo la misura.')
            : known ? `La luce della stella, con un'albedo del ${dec(A.albedo * 100, 0)} %, porta il pianeta alla temperatura di equilibrio Teq = ${dec(A.teq, 0)} K. L'atmosfera trattiene parte della radiazione infrarossa: con uno strato grigio di profondità ottica τ, Ts = Teq · ⁴√(1 + 0,75τ) = ${dec(A.teq, 0)} × ⁴√(1 + 0,75 × ${dec(A.tau, 2)}) = ${dec(A.ts, 0)} K, cioè ${dec(A.greenhouse, 0)} K di effetto serra.`
            : 'Con lo spettrografo di bordo si misurano pressione e profondità ottica τ, con il radiometro infrarosso le temperature. Nel modello a strato grigio la temperatura al suolo è Ts = Teq · ⁴√(1 + 0,75τ): più l\'atmosfera è opaca all\'infrarosso, più la superficie è calda.';
        pages.push({ key: 'atmosfera', label: 'ATMOSFERA', rows, concept: concept('biology-23', text) });
        if (!A.exosphere) {
            const dusk = twilightOf(A.sky), peak = WIEN / x.teff, ratio = (700 / 450) ** 4, sky = colourName(A.sky), late = colourName(dusk, true);
            // A blue sky comes from the molecules; a grey one from droplets; a warm one from dust that absorbs blue.
            const why = /^(azzurro|blu)/.test(sky) ? `Qui il cielo è ${sky}, come prevede la diffusione dalle molecole; al crepuscolo la luce attraversa molta più aria, perde il blu e arriva ${late}.`
                : /^grigio/.test(sky) ? `Qui il cielo è grigio: con una foschia del ${dec(A.haze * 100, 0)} % le goccioline, più grandi delle molecole, diffondono tutti i colori quasi allo stesso modo; al crepuscolo la luce arriva ${late}.`
                : `Qui il cielo è ${sky}: diffondono soprattutto le polveri, che assorbono parte del blu; al crepuscolo la luce arriva ${late}${/^(azzurr|blu)/.test(late) ? ', come nei tramonti di Marte' : ''}.`;
            pages.push({ key: 'cielo', label: 'CIELO', rows: [['Colore del cielo', sky], ['Luce al crepuscolo', late], ['Foschia', dec(A.haze * 100, 0) + ' %'], ['Nubi', `coprono il ${dec(A.clouds * 100, 0)} % del cielo`], ['Picco della stella', dec(peak, 0) + ' nm']],
                concept: concept('physics-26', `Le molecole dell'aria diffondono la luce con un'intensità proporzionale a 1/λ⁴: il blu a 450 nm è diffuso (700/450)⁴ = ${dec(ratio, 1)} volte più del rosso a 700 nm. ${why}`) });
        }
    }
    if (x.showers?.length) {
        // Meteor showers (1.60.0): the dust of a comet hits the planet at the relative speed of the two orbits.
        const sh = x.showers[0], v = sh.speed, E = .5 * v * v, tnt = E / 4.184;
        const rows = [['Sciame', `della ${sh.name.replace(/^Cometa/, 'cometa')}`], ['Stato', sh.active ? 'In corso' : `fra ${secs(sh.next)}`], ['Velocità d\'impatto', dec(v, 1) + ' km/s'], ['Energia di 1 g', dec(E, E < 10 ? 1 : 0) + ' kJ']];
        if (x.showers.length > 1) rows.push(['Altro sciame', `della ${x.showers[1].name.replace(/^Cometa/, 'cometa')}`]);
        const end = x.air ? 'Nell\'aria il granello si ferma in pochi secondi, la scalda e la fa brillare: è una stella cadente.' : 'Senza un\'atmosfera che lo fermi, il granello arriva al suolo e scava un piccolo cratere.';
        pages.push({ key: 'meteore', label: 'METEORE', rows, concept: concept('physics-08', `Una volta per giro il pianeta attraversa la scia di polvere della ${sh.name.replace(/^Cometa/, 'cometa')}, che lo colpisce a ${dec(v, 1)} km/s. Un granello di 1 g porta l'energia cinetica ½mv² = ½ × 0,001 kg × (${dec(v * 1000, 0)} m/s)² = ${dec(E, 0)} kJ, quanto ${tnt < 1000 ? dec(tnt, 0) + ' g' : dec(tnt / 1000, 1) + ' kg'} di tritolo. ${end}`) });
    }
    if (pages.length > 3) pages.forEach(p => { if (p.key === 'atmosfera') p.label = 'ARIA'; });
    return { tag: x.unit ? 'PIANETA DI STUDIO' : 'PIANETA DI CONTORNO', title: x.name, subtitle: x.unit ? x.unit.title : 'Pianeta senza unità di studio', style: null, open: x.unit ? x.unit.id : null, rows: orbit.rows, concept: orbit.concept, pages: pages.length > 1 ? pages : null };
}
function comet(x) {
    // Kepler's laws and the vis-viva equation on the ellipse; sublimation of the ices near the star.
    const T = x.years, period = T < 2 ? dec(T * 365.25, 0) + ' giorni' : dec(T, T < 100 ? 1 : 0) + ' anni';
    const orbit = { key: 'orbita', label: 'ORBITA', rows: [['Distanza dalla stella', dec(x.r, x.r < 10 ? 2 : 1) + ' UA'], ['Perielio e afelio', `${dec(x.q, x.q < 1 ? 3 : 2)} e ${dec(x.Q, x.Q < 10 ? 2 : 1)} UA`], ['Eccentricità', dec(x.e, 3)], ['Periodo', period], ['Velocità', dec(x.v, 1) + ' km/s']],
        concept: concept('physics-12', `La cometa percorre un'ellisse con la stella in un fuoco, e il raggio che la unisce alla stella spazza aree uguali in tempi uguali: corre al perielio e si attarda all'afelio. La velocità segue v = √(GM(2/r − 1/a)): ${dec(x.vq, 1)} km/s al perielio, ${dec(x.vQ, 2)} km/s all'afelio, ora ${dec(x.v, 1)} km/s a ${dec(x.r, 2)} UA.${x.retro ? ' Gira in senso opposto ai pianeti, come la cometa di Halley.' : ''}`) };
    const active = x.activity > 0;
    const tail = { key: 'coda', label: 'CODA', rows: [['Luce ricevuta', `${dec(x.flux, x.flux < 10 ? 3 : 0)} volte la Terra`], ['Sublimazione', `entro ${dec(x.ract, 2)} UA`], ['Attività', dec(x.activity * 100, 0) + ' %'], ['Coda di ioni', active ? dec(x.ion, 1) + ' u' : 'Assente'], ['Coda di polveri', active ? dec(x.dust, 1) + ' u' : 'Assente']],
        concept: concept('chemistry-11', `Il nucleo è ghiaccio e polvere. Vicino alla stella il ghiaccio sublima, cioè passa da solido a gas senza fondere: nel vuoto manca la pressione che serve al liquido. Per il Sole accade entro circa 3 UA, qui entro ${dec(x.ract, 2)} UA. ${active ? 'Il gas ionizzato, spinto dal vento stellare, forma la coda azzurra diritta; la polvere, spinta dalla pressione della luce, la coda curva.' : 'Ora la cometa è troppo lontana, e il nucleo resta spento.'}`) };
    return { tag: 'COMETA', title: x.name, subtitle: x.retro ? 'Orbita retrograda' : 'Orbita diretta', style: null, rows: orbit.rows, concept: orbit.concept, pages: [orbit, tail] };
}
function belt(x) {
    const tIn = Math.sqrt(x.aIn ** 3 / x.M), tOut = Math.sqrt(x.aOut ** 3 / x.M), y = t => dec(t, t < 10 ? 2 : 1) + ' anni';
    return { tag: 'CINTURA', title: x.name, subtitle: x.icy ? 'Ghiaccio e roccia oltre i pianeti' : 'Roccia e metalli fra i pianeti', style: null,
        rows: [['Distanza dalla stella', `da ${dec(x.aIn, x.aIn < 10 ? 2 : 1)} a ${dec(x.aOut, x.aOut < 10 ? 2 : 1)} UA`], ['Periodo al bordo interno', y(tIn)], ['Periodo al bordo esterno', y(tOut)], ['Giro sulla mappa', `da ${dec(Math.min(...x.laps), 0)} a ${dec(Math.max(...x.laps), 0)} s`], ['Rocce disegnate', String(x.count)]],
        concept: concept('physics-13', `Una cintura è fatta di corpi che orbitano ciascuno per conto proprio, senza girare come un disco rigido. Per la terza legge di Keplero, T² = a³/M, al bordo interno un giro dura ${y(tIn)}, al bordo esterno ${y(tOut)}: ${dec(tOut / tIn, 2)} volte di più. Sulla mappa la cintura gira in anelli, ciascuno più lento di quello che lo precede.`) };
}
function star(x) {
    const s = starOf(x.teff, x.R);
    return { tag: 'STELLA', title: x.name, subtitle: 'Nana di tipo ' + x.spt, style: null,
        rows: [['Temperatura', dec(x.teff, 0) + ' K'], ['Raggio', dec(x.R, 3) + ' volte il Sole'], ['Massa', dec(x.M, 2) + ' volte il Sole'], ['Luminosità', dec(x.L, x.L < .1 ? 4 : 3) + ' volte il Sole'], ['Picco di emissione', dec(s.peak, 0) + ' nm']],
        concept: concept('physics-30', `La stella emette come un corpo nero: il picco cade a λ = b/T = 2,898·10⁶ nm·K / ${dec(x.teff, 0)} K = ${dec(s.peak, 0)} nm. La potenza cresce con la superficie e con la quarta potenza della temperatura: in unità solari L = R²(T/5772)⁴ = ${dec(x.R, 3)}² × (${dec(x.teff, 0)}/5772)⁴ = ${dec(s.L, 4)}, vicino al valore della tabella delle nane, ${dec(x.L, 4)}.`) };
}

/** «Che cosa succede» on the ground (1.65.0): a herd, a predator, a flock, a drifting colony or the sun of the
 * landing site (src/worlds/ecosystem.js). Speeds are in units of the surface per second of the scene. */
const STATES = { pascolo: 'pascola', cammino: 'cammina verso un altro pascolo', fuga: 'fugge', riposo: 'riposa', pattuglia: 'perlustra il territorio', agguato: 'si avvicina di soppiatto', scatto: 'scatta verso la preda', pasto: 'si nutre', sosta: 'riprende fiato dopo la caccia', volo: 'in volo', deriva: 'va alla deriva' };
const clock = h => { const m = Math.floor(Math.max(0, h) * 60); return String(Math.floor(m / 60)).padStart(2, '0') + ':' + String(m % 60).padStart(2, '0'); };
const times = (n, one, many) => `${n} ${n === 1 ? one : many}`;
const signed = v => v < 0 ? `(${dec(v, 2)})` : dec(v, 2);
const speed = v => dec(v, 1) + ' u/s';
function ground(x) {
    const head = (tag, rows, c) => ({ tag, title: x.name, subtitle: x.label, style: null, rows, concept: c }), concept = (unit, text) => ({ unit, title: CONCEPT_UNITS[unit] || GROUND_UNITS[unit], text });
    if (x.kind === 'mandria') {
        const p = x.vigilance, none = (1 - p) ** x.n, rows = [['Individui', String(x.n)], ['Che cosa fa', STATES[x.state] || x.state], ['Velocità', speed(x.speed)], ['Predatore più vicino', x.threat ? `${x.threat.name}, a ${dec(x.threat.distance, 0)} u` : 'nessuno in vista']];
        return head('MANDRIA', rows, concept('math-c10', `Se ogni animale tiene la testa alta per il ${dec(p * 100, 0)} % del tempo, la probabilità che nessuno dei ${x.n} guardi è ${dec(1 - p, 1)}^${x.n} = ${dec(none, 2)}: almeno uno vigila con probabilità ${dec(1 - none, 2)}. Da solo un animale vigila con probabilità ${dec(p, 1)}, e in un attacco la probabilità che il bersaglio sia proprio lui scende a 1/${x.n}.`));
    }
    if (x.kind === 'branco') {
        const rows = [['Individui', String(x.n)], ['Che cosa fa', STATES[x.state] || x.state], ['Velocità', speed(x.speed)], ['Preda', x.prey ? `${x.prey.name}, a ${dec(x.prey.distance, 0)} u` : 'nessuna in vista'], ['Cacce', `${times(x.hunts, 'tentata', 'tentate')}, ${times(x.catches, 'riuscita', 'riuscite')}`], ['Attività', x.nocturnal ? 'notturna' : 'diurna']];
        const d = x.prey ? x.prey.distance : x.sprintFrom, gap = x.sprint - x.flee, t = d / gap;
        return head('PREDATORE', rows, concept('physics-03', `Nello scatto il predatore corre a ${speed(x.sprint)} e la preda fugge a ${speed(x.flee)}: la distanza cala di ${dec(gap, 1)} u ogni secondo. Da ${dec(d, 0)} u servono ${dec(d, 0)}/${dec(gap, 1)} = ${dec(t, 1)} s, e lo scatto dura ${dec(x.sprintTime, 0)} s: ${t <= x.sprintTime ? 'la raggiunge' : 'la preda resta fuori portata'}. Per questo il predatore si avvicina di soppiatto fino a ${dec(x.sprintFrom, 0)} u.`));
    }
    if (x.kind === 'stormo') {
        const rows = [['Individui', String(x.n)], ['Che cosa fa', STATES[x.state] || x.state], ['Velocità media', speed(x.speed)], ['Allineamento', dec(x.order, 2)], ['Quota media', dec(x.height, 1) + ' u sul suolo']];
        return head('STORMO', rows, concept('math-p07', `Ogni uccello segue tre regole sui vicini: si avvicina al centro del gruppo, si allinea alla loro velocità e si scosta da chi è troppo vicino (Reynolds, 1987). L'allineamento è la lunghezza della media dei versori delle velocità: qui vale ${dec(x.order, 2)}. Vicino a 1 lo stormo vola compatto nella stessa direzione, vicino a 0 ogni uccello va per conto suo.`));
    }
    if (x.kind === 'deriva') {
        const v = Math.hypot(x.wind[0], x.wind[1]), rows = [['Individui', String(x.n)], ['Che cosa fa', STATES.deriva], ['Vento, componente est', speed(x.wind[0])], ['Vento, componente nord', speed(x.wind[1])], ['Velocità', speed(v)]];
        return head('COLONIA GALLEGGIANTE', rows, concept('physics-02', `La vela riceve la spinta del vento e la colonia si muove con la sua velocità, un vettore con componenti ${dec(x.wind[0], 2)} e ${dec(x.wind[1], 2)} u/s. Il modulo è la radice della somma dei quadrati: √(${signed(x.wind[0])}² + ${signed(x.wind[1])}²) = ${dec(v, 2)} u/s. Quando la colonia arriva alla riva il vento gira e la riporta al largo.`));
    }
    if (x.kind === 'salto') {
        // The jump of the explorer (1.68.0): the same push gives a height inversely proportional to the gravity.
        const a = x.gravity * x.g0, h = x.speed * x.speed / (2 * a), t = 2 * x.speed / a, ratio = x.earth / h;
        const rows = [['Gravità', `${dec(x.gravity, 2)} g, ${dec(a, 2)} m/s²`], ['Velocità di stacco', dec(x.speed, 1) + ' m/s'], ['Altezza del salto', dec(h * 100, 0) + ' cm'], ['Sulla Terra', dec(x.earth * 100, 0) + ' cm'], ['Tempo di volo', dec(t, 2) + ' s'], ['Ultimo salto misurato', x.last > 0 ? dec(x.last * 100, 0) + ' cm' : 'nessuno, premi SALTA'], ['Salti fatti qui', String(x.jumps)]];
        const compare = Math.abs(1 / ratio - 1) < .02 ? 'uguale a quella terrestre' : `${dec(1 / ratio, 2)} volte quella terrestre`;
        // The jetpack (1.76.0): thrust less weight gives the net acceleration of the burn, then the body coasts up.
        const P = x.pack, pack = P ? ` Con lo zaino a reazione acceso la spinta dà ${dec(P.thrust, 0)} m/s² verso l'alto e la gravità ne toglie ${dec(a, 2)}: l'accelerazione netta è ${dec(P.net, 2)} m/s². Dopo ${dec(P.burn, 1)} s di spinta la velocità è ${dec(P.speed, 1)} m/s e il corpo sale ancora di v²/(2a) = ${dec(P.speed * P.speed / (2 * a), 1)} m; in tutto ${dec(P.height, 1)} m sopra il punto di stacco, ${dec(P.earth, 1)} m sulla Terra.` : '';
        if (P) { rows.splice(5, 0, ['Zaino a reazione', `${dec(P.thrust, 0)} m/s² per ${dec(P.burn, 1)} s`], ['Salita con lo zaino', `${dec(P.height, 1)} m, sulla Terra ${dec(P.earth, 1)} m`]); if (P.last > 0) rows[7][1] += ` · zaino ${dec(P.last, 1)} m`; }
        return head('SALTO', rows, concept('physics-04', `L'esploratore lascia il suolo a ${dec(x.speed, 1)} m/s e la gravità del pianeta gli toglie ${dec(a, 2)} m/s di velocità ogni secondo. Sale per v/a = ${dec(x.speed / a, 2)} s fino a h = v²/(2a) = ${dec(x.speed, 1)}²/(2 · ${dec(a, 2)}) = ${dec(h, 2)} m, poi ricade nello stesso tempo. Con la stessa spinta l'altezza va come 1/g: qui è ${compare}.` + pack));
    }
    // The sun of the landing site.
    const h = Math.max(0, x.height), share = Math.sin(h * Math.PI / 180), rows = [['Ora locale', clock(x.hour)], ['Durata del giorno', dec(x.hours, 1) + ' ore'], ['Altezza del sole', dec(x.height, 0) + '°'], ['Latitudine del sito', dec(Math.abs(x.lat), 0) + '° ' + (x.lat >= 0 ? 'nord' : 'sud')], ['Luce sul suolo', x.height > 0 ? dec(share * 100, 0) + ' % del sole allo zenit' : 'notte']];
    return head('SOLE E GIORNO', rows, concept('biology-20', x.height > 0 ? `Un raggio di luce che arriva con un'altezza di ${dec(x.height, 0)}° si distribuisce su una superficie di suolo più ampia: ogni metro quadrato riceve sin ${dec(x.height, 0)}° = ${dec(share, 2)} della luce che riceverebbe con il sole allo zenit. Il modello tiene il sole sull'equatore celeste, come agli equinozi: il giorno dura metà della rotazione a ogni latitudine.` : `Il sole è ${dec(-x.height, 0)}° sotto l'orizzonte: senza luce la fotosintesi si ferma e le piante consumano con la respirazione una parte degli zuccheri prodotti di giorno. Il modello tiene il sole sull'equatore celeste, come agli equinozi: la notte dura metà della rotazione a ogni latitudine.`));
}
