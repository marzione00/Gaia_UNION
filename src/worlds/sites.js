/** Structures of the zone of a landing site (1.73.0): inhabited outposts, mines, weather stations, greenhouses
 * and camps of the native peoples; abandoned outposts, mines and greenhouses; wrecks of ships and probes; ruins
 * of native villages, landing beacons, the observatory and the camp of the first expedition. Each has a story
 * for the diary written from the identity card and the physics of the planet. Fourteen to nineteen sites lie
 * in the zone, at least 280 units (445 m) apart and at least 330 units from the base, on dry and fairly level
 * ground; every planet has at least one site of each state (inhabited, abandoned, wreck, ruin), and the share
 * of inhabited sites grows with the hospitality of the planet.
 * The models are built when the camera comes within reach (src/scene/world.js): the buildings of the colony
 * (src/worlds/architecture.js) and of the villages (src/worlds/buildings.js), aged where they are abandoned
 * (tilted, sunk, dusty, dark windows, part of a roof gone); a ship of the star system broken in two,
 * scorched, half sunk, with debris behind it (and a probe before its parachute where the air is thick enough);
 * stone circles and walls for the ruins of the native peoples. */
import { colonyParams, colonySpec, villageParams, villageSpec } from './settlements.js';
import { archMesh, archPalette, roverMesh } from './architecture.js';
import { buildingMesh } from './buildings.js';
import { CATALOG, build as buildCraft, LOW_DETAIL } from '../craft/catalog.js';
import { Kit } from '../craft/kit.js';
import { BIOME, hash3 } from './biomes.js';
import { EDGE, METRE } from './explorer.js';
import { planetPhysics } from './planet-physics.js';
import { seededRandom } from '../scene/systems.js';
import { AREAS } from '../scene/layout.js';

/** Kinds of site, by state, with the Italian names used on the cards. */
export const SITE_KINDS = Object.freeze({
    avamposto: { state: 'abitato', label: 'avamposto di ricerca' },
    miniera: { state: 'abitato', label: 'miniera' },
    stazione: { state: 'abitato', label: 'stazione meteorologica' },
    serre: { state: 'abitato', label: 'serre' },
    campo: { state: 'abitato', label: 'campo stagionale dei nativi' },
    abbandonato: { state: 'abbandonato', label: 'avamposto abbandonato' },
    'miniera-abbandonata': { state: 'abbandonato', label: 'miniera abbandonata' },
    'serre-abbandonate': { state: 'abbandonato', label: 'serre abbandonate' },
    relitto: { state: 'relitto', label: 'relitto di una nave' },
    sonda: { state: 'relitto', label: 'sonda precipitata' },
    rovine: { state: 'rovina', label: 'rovine di un villaggio antico' },
    faro: { state: 'rovina', label: 'faro di atterraggio crollato' },
    osservatorio: { state: 'rovina', label: 'osservatorio della prima spedizione' },
    spedizione: { state: 'rovina', label: 'campo della prima spedizione' }
});
export const STATES = Object.freeze({ abitato: 'Struttura abitata', abbandonato: 'Struttura abbandonata', relitto: 'Relitto', rovina: 'Rovina' });
/** Least distance between two sites and from the base, and the number of sites (MOST_SITES at most). */
export const SITE_GAP = 280, SITE_INNER = 330, FEWEST_SITES = 14, MOST_SITES = 19;
const HOSPITALITY = { terrestrial: 1, oceanic: .85, volcanic: .45, desert: .35, arctic: .35, barren: .15 };
/** Buildings of each kind of site in each kind of colony: the first one stands in the middle. */
const BUILT = {
    sigillato: { avamposto: ['modulo', 'cupola', 'antenna', 'solare', 'piattaforma'], miniera: ['estrattore', 'schermato', 'radiatori', 'reattore', 'solare'], stazione: ['antenna', 'solare', 'radiatori'], serre: ['serra', 'serra', 'modulo', 'solare'] },
    simbiotico: { avamposto: ['baccello', 'gemelli', 'regolatore', 'foglia'], miniera: ['bioreattore', 'gemelli', 'ramo', 'baccello'], stazione: ['regolatore', 'baccello', 'foglia'], serre: ['membrana', 'membrana', 'foglia', 'bioreattore'] },
    adattato: { avamposto: ['piloni', 'antenna', 'energia', 'piattaforma'], miniera: ['container', 'sfere', 'hangar', 'processore'], stazione: ['antenna', 'energia', 'sfere'], serre: ['capannone', 'capannone', 'sfere', 'energia'] }
};
/** The camp of the first expedition, in sealed modules; native camps are made of huts, a fire, a granary and a
 * totem. */
const EXPEDITION = ['modulo', 'cupola', 'modulo', 'antenna', 'solare'], CAMP = ['focolare', 'capanna', 'capanna', 'capanna', 'granaio', 'totem'];
/** Article of a native people before its name: «degli Urqe», «dei Kamo». */
const of = people => (/^[AEIOU]/.test(people) ? 'degli ' : 'dei ') + people, the = people => (/^[AEIOU]/.test(people) ? 'Gli ' : 'I ') + people;
/** What the research outposts study in each biome. */
const TOPIC = {
    prateria: 'il carbonio immagazzinato nei suoli della prateria', colline: 'l’erosione dei versanti e il trasporto dei sedimenti', gradoni: 'la successione degli strati di roccia dei gradoni',
    foresta: 'la produzione primaria della foresta e l’anidride carbonica che assorbe', brughiera: 'i suoli acidi e poveri della brughiera', palude: 'la decomposizione senza ossigeno e il metano della palude',
    calanchi: 'l’erosione delle argille', steppa: 'la siccità e la resistenza delle piante della steppa', massi: 'la frantumazione delle rocce per gelo e calore', mesa: 'l’età degli strati delle mesa',
    arcipelago: 'l’isolamento delle popolazioni sulle isole', atollo: 'la crescita degli atolli e il livello del mare', fiordi: 'i ghiacciai del passato che hanno scavato i fiordi', laguna: 'la salinità della laguna e le maree',
    scogliera: 'l’erosione delle coste', salmastra: 'gli organismi che tollerano il sale', 'dune-costiere': 'il trasporto della sabbia da parte del vento', 'altopiano-vulcanico': 'l’età delle lave dell’altopiano',
    erg: 'lo spostamento delle dune', reg: 'il vento che asporta la sabbia fine', canyon: 'gli strati di roccia esposti nelle pareti del canyon', salina: 'la crosta di sali e l’evaporazione',
    yardang: 'l’erosione del vento', hamada: 'l’alterazione delle rocce nude', crateri: 'gli impatti e l’età della superficie', altopiano: 'le fratture della crosta', dorsali: 'la contrazione della crosta',
    'mare-basaltico': 'le antiche colate di basalto', scarpate: 'le faglie della crosta', regolite: 'la regolite e il vento stellare', bacino: 'il grande impatto che ha scavato il bacino',
    ghiacciaio: 'il flusso del ghiacciaio', banchisa: 'lo spessore del ghiaccio marino', criovulcani: 'i liquidi che risalgono dai criovulcani', crepacci: 'le tensioni nel ghiaccio',
    nevaio: 'l’albedo della neve e il bilancio dell’energia', tundra: 'il suolo gelato e il suo disgelo', morene: 'le tracce dei ghiacciai del passato', 'ghiaccio-azzurro': 'le meteoriti che il vento scopre sul ghiaccio azzurro',
    vulcani: 'l’attività dei coni vulcanici', colate: 'il raffreddamento delle colate di lava', caldera: 'la camera magmatica sotto la caldera', cenere: 'la cenere delle eruzioni e il clima',
    fumarole: 'i gas delle fumarole e la chemiosintesi', colonnato: 'il raffreddamento lento delle lave colonnari', 'foresta-cenere': 'la ricolonizzazione dei suoli vulcanici'
};
/** What the mines take from the ground, by family. */
const ORE = { terrestrial: 'minerale di rame e di ferro', oceanic: 'minerale dei fondali costieri', desert: 'silicati per il vetro e i semiconduttori', barren: 'minerale e terre rare', arctic: 'ghiaccio d’acqua', volcanic: 'minerale ricco di zolfo' };
/** Ships that may lie in a wreck, with their article: the twelve civil and scientific types. */
const ARTICLE = { navetta: 'una navetta', corriere: 'un corriere', cargo: 'una nave cargo', cisterna: 'una cisterna', rimorchiatore: 'un rimorchiatore minerario', scientifica: 'una nave scientifica', esploratrice: 'una nave da esplorazione', passeggeri: 'una nave passeggeri', posaboe: 'un posaboe', soccorso: 'una nave di soccorso', sonda: 'una sonda', gru: 'una nave gru' };
const feminine = type => ARTICLE[type].startsWith('una ');
const SYL = ['ra', 'ne', 'to', 'li', 'va', 'mo', 'se', 'ca', 'du', 'ri', 'pa', 'lo', 'ten', 'mar', 'sol', 'ver', 'ar', 'el', 'ora', 'is'], NATIVE_SYL = ['ka', 'ru', 'ti', 'mo', 'en', 'sha', 'lu', 'ok', 'ya', 'zi', 'ha', 'no', 'ur', 'qe', 'ma', 'tal'];
const ROMAN = ['', 'I', 'II', 'III', 'IV', 'V', 'VI'];
const word = (r, list, n) => { let w = ''; for (let k = 0; k < n; k++) w += list[Math.floor(r() * list.length)]; return w[0].toUpperCase() + w.slice(1); };
const it = (x, d = 1) => x.toFixed(d).replace('.', ',').replace(/^-(?=[\d,]*[1-9])/, '−').replace(/^-/, '');
const km = u => it(u / METRE / 1000, 1);

/** The ship of the star system of surface s that a wreck reproduces: one of the ships of its fleet up to
 * 100 m long, or else the smallest of the galaxy's fleet. */
function wreckShip(system, r, type = null) {
    const ships = CATALOG.filter(e => e.kind === 'nave' && ARTICLE[e.type] && (!type || e.type === type)), size = e => parseFloat(e.size.replace(/[^\d.]/g, '')) || 60;
    const own = ships.filter(e => e.system === system && size(e) <= 100);
    return own.length ? own[Math.floor(r() * own.length)] : type ? ships[Math.floor(r() * ships.length)] : ships.reduce((a, b) => size(b) < size(a) ? b : a);
}
/** A cause of abandonment fitting planet g and its physics p. */
function causeOf(g, p, r) {
    const out = [];
    if (!p.magnetosphere && (g.star.type === 'M' || g.star.type === 'K')) out.push(`Un brillamento della stella, una nana ${p.star.spt}, ha investito il suolo con particelle che una magnetosfera avrebbe deviato, e il personale è stato richiamato alla colonia.`);
    if (p.pressure < .3) out.push('Uno sciame di meteoroidi ha forato due moduli: l’aria rada li frena poco, e la riparazione costava più di un avamposto nuovo.');
    if (g.family === 'desert' && p.pressure >= .05) out.push('Le tempeste di polvere hanno coperto per mesi i pannelli solari, fino a spegnere gli impianti.');
    if (g.family === 'volcanic') out.push('Una colata ha tagliato la strada verso la colonia e le scosse hanno incrinato le fondamenta.');
    if (g.family === 'arctic') out.push('L’avanzata del ghiaccio ha schiacciato i moduli più esposti.');
    if (g.family === 'oceanic') out.push('Una mareggiata ha allagato i piani bassi e la salsedine ha corroso gli impianti.');
    if (g.family === 'barren' || g.family === 'desert') out.push('Il ghiaccio sotto il suolo, l’unica riserva d’acqua del sito, si è esaurito, e l’acqua doveva arrivare dalla colonia.');
    if (g.family === 'terrestrial') out.push('Una frana ha coperto la strada e i moduli più bassi dopo una stagione di piogge intense.');
    return out[Math.floor(r() * out.length)] || 'Il finanziamento è passato a un sito più vicino alla colonia.';
}

/** Sites of surface s (src/worlds/surface.js): place, kind, name, state and story of each, with the choices its
 * model needs. Deterministic: the same planet always has the same sites. */
export function siteList(s) {
    const g = s.genome, r = seededRandom(g.terrain.seed ^ 0x517E5), p = planetPhysics()[s.index], sea = s.seaY;
    const colony = s.settlements?.find(t => t.kind === 'colonia'), village = s.settlements?.find(t => t.kind === 'villaggio');
    const P = colonyParams(g, s.species?.length || 0), want = FEWEST_SITES + Math.floor(r() * (MOST_SITES - FEWEST_SITES + 1)), spots = [];
    // Places: dry, fairly level, far enough from the base and from one another.
    for (let t = 0; t < 2400 && spots.length < want; t++) {
        const x = (r() * 2 - 1) * (EDGE - 80), z = (r() * 2 - 1) * (EDGE - 80);
        if (Math.hypot(x, z) < SITE_INNER || spots.some(o => Math.hypot(o.x - x, o.z - z) < SITE_GAP)) continue;
        const y = s.heightAt(x, z); if (sea !== null && y < sea + 1.5) continue;
        const rise = Math.max(...[[12, 0], [-12, 0], [0, 12], [0, -12], [9, 9], [-9, -9], [9, -9], [-9, 9]].map(([a, b]) => Math.abs(s.heightAt(x + a, z + b) - y)));
        if (rise > 2.6) continue;
        spots.push({ x, z, y });
    }
    // States in proportion to shares that follow the hospitality of the planet, at least one of each, in a
    // shuffled order; the kinds of each state come in turn, so a planet shows as many of them as it can, and
    // the camp of the first expedition is always the first ruin, and the only one of its kind.
    const H = HOSPITALITY[g.family], share = { abitato: .25 + .3 * H, abbandonato: .27, relitto: .18, rovina: .3 - .05 * H }, total = Object.values(share).reduce((a, b) => a + b, 0);
    const counts = Object.fromEntries(Object.entries(share).map(([k, v]) => [k, Math.max(1, Math.floor(spots.length * v / total))]));
    const order = Object.keys(share).sort((a, b) => (spots.length * share[b] / total) % 1 - (spots.length * share[a] / total) % 1);
    for (let q = 0; Object.values(counts).reduce((a, b) => a + b, 0) < spots.length; q++) counts[order[q % order.length]]++;
    while (Object.values(counts).reduce((a, b) => a + b, 0) > spots.length) { const k = Object.keys(counts).reduce((a, b) => counts[b] > counts[a] ? b : a); counts[k]--; }
    const states = Object.entries(counts).flatMap(([k, n]) => Array(n).fill(k));
    for (let i = states.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [states[i], states[j]] = [states[j], states[i]]; }
    const turns = {}, kindOf = state => {
        if (!turns[state]) { turns[state] = Object.entries(SITE_KINDS).filter(([k, v]) => v.state === state && (k !== 'campo' || village) && (k !== 'rovine' || village)).map(([k]) => k); for (let i = turns[state].length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [turns[state][i], turns[state][j]] = [turns[state][j], turns[state][i]]; } if (state === 'rovina') turns[state].sort((a, b) => (b === 'spedizione') - (a === 'spedizione')); turns[state].n = 0; }
        const list = turns[state], kind = list[list.n++ % list.length];
        if (kind === 'spedizione') { list.splice(list.indexOf('spedizione'), 1); list.n--; }
        return kind;
    };
    const used = new Set(), lists = s.species || [], plants = lists.filter(sp => sp.kind === 'plant'), endemics = s.endemics || [], system = p.system, base = colony?.name || 'la colonia';
    return spots.map((o, j) => {
        const state = states[j], kind = kindOf(state), biome = s.field?.biomeAt ? s.field.biomeAt(o.x, o.z) : null, b = biome?.id;
        const near = Math.hypot(o.x, o.z), years = 4 + Math.floor(r() * 30), crew = 3 + Math.floor(r() * 10), Name = word(r, SYL, 2), endemic = endemics.find(sp => sp.biome === b);
        const X = +o.x.toFixed(2), Z = +o.z.toFixed(2), site = { id: 'r' + j, kind, state, x: X, y: +s.heightAt(X, Z).toFixed(3), z: Z, h: +(r() * 6.283).toFixed(3), biome: b || null, seed: Math.floor(r() * 1e9) };
        const story = [];
        if (kind === 'avamposto') {
            site.name = 'Avamposto ' + Name;
            story.push(`Avamposto di ricerca della colonia ${base}, a ${km(near)} km dalla base, dove lavorano ${crew} ricercatori.`, `Studia ${TOPIC[b] || 'il suolo e il clima del sito'}${endemic ? `, e la specie endemica ${endemic.name}` : ''}.`, 'I dati arrivano alla colonia per ponte radio, attraverso l’antenna dell’avamposto.');
        } else if (kind === 'miniera') {
            site.name = 'Miniera ' + Name;
            story.push(`Miniera della colonia ${base}: ${crew} persone estraggono ${ORE[g.family]}.`, `Con una gravità di ${it(g.gravity, 2)} g, 10 t di minerale pesano quanto ${it(10 * g.gravity, 1)} t sulla Terra: la massa è la stessa, il peso cambia con la gravità.`, `Un rover porta il carico alla colonia, a ${km(near)} km.`);
        } else if (kind === 'stazione') {
            site.name = 'Stazione meteorologica ' + Name;
            story.push('Stazione meteorologica automatica, visitata dai tecnici della colonia una volta al mese.', `Registra una temperatura media al suolo di ${it(p.ts - 273.15, 0)} °C e una pressione di ${it(p.pressure, p.pressure < .1 ? 3 : 2)} bar.`, p.greenhouse > 1 ? `L’effetto serra dell’atmosfera alza la temperatura di ${it(p.greenhouse, 0)} °C rispetto a quella di equilibrio radiativo, ${it(p.teq - 273.15, 0)} °C.` : `L’atmosfera è così rada che la temperatura al suolo resta vicina a quella di equilibrio radiativo, ${it(p.teq - 273.15, 0)} °C.`);
        } else if (kind === 'serre') {
            site.name = 'Serre di ' + Name;
            story.push(`Serre della colonia ${base}, dove ${crew} coltivatori producono cibo.`, `La stella, di tipo ${p.star.spt}, dà a questa distanza un flusso di energia pari a ${it(p.flux, 2)} volte quello che la Terra riceve dal Sole${p.flux < .6 ? ', e lampade alla luce rossa e blu integrano quella che manca' : ''}.`, `Un anno del pianeta dura ${Math.round(p.period)} giorni terrestri: le serre seguono stagioni proprie.`);
        } else if (kind === 'campo') {
            const people = village.people, food = plants[Math.floor(r() * Math.max(1, plants.length))];
            site.name = `Campo ${word(r, NATIVE_SYL, 2)} ${of(people)}`;
            story.push(`Campo stagionale del popolo ${people}, a ${km(Math.hypot(o.x - village.position[0], o.z - village.position[2]))} km dal loro villaggio.`, food ? `Alcune famiglie vi restano durante la raccolta di ${food.name}, poi tornano al villaggio.` : 'Alcune famiglie vi restano durante la stagione della caccia, poi tornano al villaggio.', 'Il fuoco resta acceso giorno e notte, e il fumo segnala il campo da lontano.');
        } else if (kind === 'abbandonato') {
            site.name = 'Avamposto ' + Name;
            story.push(`Avamposto di ricerca abbandonato ${years} anni fa.`, causeOf(g, p, r), `Gli strumenti sono ancora al loro posto, coperti dalla polvere del ${biome ? biome.name.toLowerCase() : 'suolo'}.`);
        } else if (kind === 'miniera-abbandonata') {
            site.name = 'Miniera ' + Name;
            story.push(`Miniera abbandonata ${years} anni fa, quando il filone di ${ORE[g.family]} si è esaurito.`, `Portare il minerale in orbita richiedeva di raggiungere la velocità di fuga del pianeta, ${it(p.escape, 1)} km/s, e il costo superava ormai il valore del carico.`, 'Restano i serbatoi, i container e le macchine ferme.');
        } else if (kind === 'relitto') {
            const ship = wreckShip(system, r);
            site.ship = ship.id; site.name = 'Relitto ' + Name;
            const f = feminine(ship.type);
            story.push(`Relitto di ${ARTICLE[ship.type]} della stessa classe ${f ? 'della' : 'del'} ${ship.name}, che serve il sistema «${AREAS[system]?.name || 'della colonia'}».`, `È ${f ? 'precipitata' : 'precipitato'} ${years} anni fa durante la discesa verso la colonia, per un guasto ai motori di frenata.`, p.pressure < .1 ? `Con ${it(p.pressure, 3)} bar l’aria frena pochissimo: la discesa dipendeva tutta dai motori, e allo schianto lo scafo si è spezzato in due.` : `Con ${it(p.pressure, 2)} bar l’aria ha frenato la discesa, e lo scafo è arrivato al suolo spezzato in due ma riconoscibile.`, `Recuperarlo richiederebbe di riportarlo oltre la velocità di fuga del pianeta, ${it(p.escape, 1)} km/s.`);
        } else if (kind === 'rovine') {
            const people = village.people;
            site.name = 'Rovine di ' + word(r, NATIVE_SYL, 3);
            story.push(`Rovine di un villaggio degli antenati del popolo ${people}, più antico di ${100 + Math.floor(r() * 900)} anni secondo i loro racconti.`, 'Le pietre del cerchio centrale segnano i punti dell’orizzonte in cui sorge e tramonta la stella nei giorni più lunghi e più brevi dell’anno.', `${the(people)} raccontano che il villaggio fu lasciato quando la sorgente vicina si seccò.`);
        } else if (kind === 'serre-abbandonate') {
            site.name = 'Serre di ' + Name;
            story.push(`Serre abbandonate ${years} anni fa, dopo che un fungo parassita aveva distrutto tre raccolti di fila.`, `Il flusso della stella, ${it(p.flux, 2)} volte quello che la Terra riceve dal Sole, ${p.flux < .6 ? 'obbligava a illuminare le colture con lampade, e l’energia costava più del raccolto' : 'bastava alle colture, ma l’acqua per irrigarle arrivava dalla colonia'}.`, 'Fra i telai rotti crescono ancora alcune delle piante coltivate, tornate selvatiche.');
        } else if (kind === 'sonda') {
            const ship = wreckShip(system, r, 'sonda');
            site.ship = ship.id; site.name = 'Sonda ' + Name;
            const air = p.pressure >= .001;
            story.push(`Sonda automatica della stessa classe della ${ship.name}, lanciata dalla colonia ${base} per studiare ${air ? 'l’atmosfera' : 'il suolo e il vento stellare'}.`, `Ha perso il contatto ${years} anni fa ed è scesa ${p.pressure >= .1 ? 'con il paracadute' : air ? 'con i soli retrorazzi, perché l’aria era troppo rada per un paracadute' : 'con i soli retrorazzi, perché il pianeta non ha un’atmosfera che la frenasse'}.`, air ? `Durante la discesa ha misurato pressione e temperatura fino al suolo, dove ha registrato ${it(p.pressure, p.pressure < .1 ? 3 : 2)} bar e ${it(p.ts - 273.15, 0)} °C.` : `Al suolo ha misurato ${it(p.ts - 273.15, 0)} °C di temperatura media e il flusso della stella, ${it(p.flux, 2)} volte quello che la Terra riceve dal Sole.`);
        } else if (kind === 'osservatorio') {
            site.name = 'Osservatorio ' + Name;
            story.push(`Osservatorio della prima spedizione, lasciato quando la colonia ${base} ha costruito il proprio.`, `Da qui si misurarono l’anno del pianeta, ${Math.round(p.period)} giorni terrestri, e la distanza dalla stella, ${it(p.a, 2)} UA, che la terza legge di Keplero lega fra loro.`, 'La cupola è crollata; il telescopio è alla colonia.');
        } else if (kind === 'faro') {
            site.name = 'Faro ' + Name;
            story.push(`Faro radio che guidava le navi della prima spedizione verso il sito della colonia ${base}.`, `È crollato ${years} anni fa, quando la colonia ha acceso il proprio faro e nessuno lo ha più riparato.`, `Le onde radio viaggiano alla velocità della luce: dal faro alla base, a ${km(near)} km, impiegano ${it(near / METRE / 299.792458, 1)} µs.`);
        } else {
            site.name = 'Campo della prima spedizione';
            story.push(`Campo della prima spedizione, arrivata ${years + 10} anni fa per preparare la fondazione della colonia ${base}.`, `${crew} persone vissero qui alcuni mesi per scegliere il sito della colonia: misurarono il suolo, l’acqua e la radiazione.`, 'Dei moduli restano gli scafi, piegati e coperti di polvere.');
        }
        // Two sites of a planet never share a name: a second one takes a number, as stations do.
        if (used.has(site.name)) { let k = 2; while (used.has(`${site.name} ${ROMAN[k]}`)) k++; site.name += ' ' + ROMAN[k]; }
        used.add(site.name); site.story = story; site.typology = P.typology;
        return site;
    });
}

// ---------- Models ----------
const rot = (h, ax = 0, az = 0) => { const [c, s, ca, sa, cz, sz] = [Math.cos(h), Math.sin(h), Math.cos(ax), Math.sin(ax), Math.cos(az), Math.sin(az)]; return p => { let [x, y, z] = p; [y, z] = [y * ca - z * sa, y * sa + z * ca]; [x, y] = [x * cz - y * sz, x * sz + y * cz]; return [x * c + z * s, y, -x * s + z * c]; }; };
/** Copy of mesh m moved: scaled by k, turned by tilts ax and az (radians) and then by the heading h, and moved by t. */
function placed(m, { t = [0, 0, 0], h = 0, ax = 0, az = 0, k = 1 } = {}) {
    const R = rot(h, ax, az), v = new Float32Array(m.v);
    for (let i = 0; i < v.length; i += 16) {
        const p = R([v[i] * k, v[i + 1] * k, v[i + 2] * k]), n = R([v[i + 3], v[i + 4], v[i + 5]]);
        v[i] = p[0] + t[0]; v[i + 1] = p[1] + t[1]; v[i + 2] = p[2] + t[2]; v[i + 3] = n[0]; v[i + 4] = n[1]; v[i + 5] = n[2];
    }
    return { v, i: m.i, stride: 16 };
}
/** One mesh from several, in order. */
export function merged(list) {
    const v = new Float32Array(list.reduce((n, m) => n + m.v.length, 0)), i = new Uint32Array(list.reduce((n, m) => n + m.i.length, 0));
    let ov = 0, oi = 0;
    for (const m of list) { v.set(m.v, ov); const base = ov / 16; for (let k = 0; k < m.i.length; k++) i[oi + k] = m.i[k] + base; ov += m.v.length; oi += m.i.length; }
    return { v, i, stride: 16 };
}
/** The triangles of m whose centre is below `cut` (a building that lost the top of its roof). */
function cutAbove(m, cut) {
    const keep = [], v = m.v;
    for (let t = 0; t < m.i.length; t += 3) { const a = m.i[t], b = m.i[t + 1], c = m.i[t + 2]; if ((v[a * 16 + 1] + v[b * 16 + 1] + v[c * 16 + 1]) / 3 < cut) keep.push(a, b, c); }
    return { v, i: new Uint32Array(keep), stride: 16 };
}
/** Years of abandonment on mesh m (height `top`): colours turn to the soil, darker towards the ground, the lights
 * and windows go out, metal turns matt. `burn` blackens in patches, as on a scorched hull. */
function aged(m, soil, top, { dust = .55, dark = .72, burn = 0, seed = 1 } = {}) {
    const v = m.v;
    for (let i = 0; i < v.length; i += 16) {
        const y = Math.max(0, v[i + 1]), t = Math.min(1, dust * (.45 + .55 * (1 - Math.min(1, y / Math.max(1, top)))));
        let f = dark; if (burn) f *= 1 - burn * Math.max(0, Math.sin(v[i] * 1.7 + seed) * Math.sin(v[i + 2] * 1.3 + v[i + 1] * .9));
        for (let q = 0; q < 3; q++) v[i + 8 + q] = (v[i + 8 + q] + (soil[q] - v[i + 8 + q]) * t) * f;
        v[i + 12] = Math.min(v[i + 12], .25); v[i + 13] = Math.max(v[i + 13], .82); v[i + 14] = 0;
    }
    return m;
}
/** Specs of the buildings, kept per planet and kind of colony: archSpec measures the detailed model, so a spec
 * costs as much as a building. */
const specs = new Map();
const specOf = (g, P, type) => { const key = g.terrain.seed + ':' + P.typology + ':' + type; if (!specs.has(key)) { if (specs.size > 400) specs.clear(); specs.set(key, colonySpec(g, P, type)); } return specs.get(key); };
const heightOf = m => { let top = 0; for (let i = 0; i < m.v.length; i += 16) top = Math.max(top, m.v[i + 1]); return top; };

/** Model of site `site` on surface s at level 0 (detailed) or 1 (light): one mesh around the centre of the site,
 * whose ground is at y = 0, and the circles (x, z, radius, in the coordinates of the zone) that the explorer
 * cannot cross. */
export function siteModel(s, site, level = 0) {
    const g = s.genome, r = seededRandom(site.seed), y0 = site.y, parts = [], blocks = [], soil = g.palette.rock.map(v => v * .55);
    // Offsets from the centre of the site, in the axes of the zone; site.h turns the layout and the wreck.
    const ground = (x, z) => s.heightAt(site.x + x, site.z + z) - y0;
    const local = (x, z) => { const c = Math.cos(site.h), sn = Math.sin(site.h); return [x * c + z * sn, -x * sn + z * c]; };
    const block = (x, z, radius) => blocks.push([+(site.x + x).toFixed(2), +(site.z + z).toFixed(2), +radius.toFixed(2)]);
    // Buildings around the first one, facing it, each standing on the ground where it is.
    // The radii come from the specs, the same at both levels of detail, so the buildings keep their places.
    const ring = (meshes, opts = {}) => {
        const n = meshes.length, R0 = meshes[0].radius;
        meshes.forEach((m, k) => {
            const radius = m.radius; let x = 0, z = 0;
            if (k) { const a = site.h + (k - 1) * 6.283 / Math.max(1, n - 1) + (r() - .5) * .5, d = R0 + radius + 3 + r() * 3; x = Math.cos(a) * d; z = Math.sin(a) * d; }
            const yy = ground(x, z), tilt = opts.tilt ? [(r() - .5) * opts.tilt, (r() - .5) * opts.tilt] : [0, 0];
            let piece = placed(m, { t: [x, yy - (opts.sink || 0), z], h: k ? Math.atan2(z, -x) : site.h, ax: tilt[0], az: tilt[1] });
            if (opts.cut && (k === 0 || r() < .4)) piece = cutAbove(piece, yy + heightOf(m) * (opts.cut + r() * .2));
            parts.push(piece); block(x, z, radius * .85);
        });
        return R0;
    };
    if (site.kind === 'relitto' || site.kind === 'sonda') {
        wreck(parts, blocks, s, site, r, level, local);
    } else if (site.kind === 'rovine') {
        ruins(parts, blocks, g, r, level, ground, block);
    } else if (site.kind !== 'campo') {
        // The first expedition, its beacons and its observatory came in sealed modules, whatever the colony became.
        const expedition = ['spedizione', 'faro', 'osservatorio'].includes(site.kind), P = colonyParams(g, s.species?.length || 0), Q = expedition ? { ...P, typology: 'sigillato', colors: archPalette(g, 'sigillato') } : P;
        const kind = { abbandonato: 'avamposto', 'miniera-abbandonata': 'miniera', 'serre-abbandonate': 'serre' }[site.kind] || site.kind;
        const types = site.kind === 'faro' ? ['antenna', 'solare', 'radiatori'] : site.kind === 'osservatorio' ? ['cupola', 'antenna', 'modulo'] : expedition ? EXPEDITION : BUILT[Q.typology][kind], meshes = types.map(type => { const spec = specOf(g, Q, type); return Object.assign(archMesh(spec, level), { radius: spec.radius }); });
        if (SITE_KINDS[site.kind].state === 'abitato') {
            const R0 = ring(meshes);
            // A rover parked by the outposts and mines, in the style of the colony, opposite the other buildings.
            if (kind !== 'serre') { const a = site.h + Math.PI + (r() - .5) * .6, d = R0 + 4.5, x = Math.cos(a) * d, z = Math.sin(a) * d; parts.push(placed(roverMesh(Q.colors, Q.typology, level), { t: [x, ground(x, z), z], h: r() * 6.283 })); block(x, z, 1.8); }
        } else {
            ring(meshes.map(m => Object.assign(aged(m, soil, heightOf(m), expedition ? { dust: .8, dark: .55 } : { dust: .6, dark: .7 }), { radius: m.radius })), { tilt: expedition ? .18 : .1, sink: expedition ? .9 : .45, cut: expedition ? .35 : .55 });
            debris(parts, r, 14, 18, (x, z) => ground(x, z), expedition ? [.42, .41, .4, 1] : Q.colors.hull, soil, level);
        }
    } else {
        const V = villageParams(g), meshes = CAMP.map(type => { const spec = villageSpec(g, V, type); return Object.assign(buildingMesh(spec, level), { radius: spec.radius }); });
        ring(meshes);
    }
    return { mesh: merged(parts), blocks };
}

/** Ground cleared of rocks, plants and animals around the sites (src/worlds/biomes.js, src/worlds/zone-life.js):
 * a circle round the buildings, stones and huts, and for a wreck or a probe a band along its fall, from the bow to
 * the end of the debris, as wide as the ship and its debris. Returns a test (x, z, margin) => inside. */
export function clearingOf(sites) {
    const parts = sites.map(site => {
        if (site.ship) {
            const e = CATALOG.find(c => c.id === site.ship), len = Math.min(60, (parseFloat(e.size.replace(/[^\d.]/g, '')) || 60) * METRE), c = Math.cos(site.h), sn = Math.sin(site.h);
            const at = z => [site.x + z * sn, site.z + z * c];
            return { a: at(len * .7), b: at(-len * 1.9), w: site.kind === 'sonda' ? 3 + len * .9 : 5 + len * .4 };
        }
        // Rare places (src/worlds/wonders.js) carry the radius of their ground.
        const w = site.r ?? (site.kind === 'campo' ? 15 : site.kind === 'rovine' ? 29 : 30);
        return { a: [site.x, site.z], b: [site.x, site.z], w };
    });
    return (x, z, margin = 0) => parts.some(({ a, b, w }) => {
        const dx = b[0] - a[0], dz = b[1] - a[1], L = dx * dx + dz * dz, t = L ? Math.max(0, Math.min(1, ((x - a[0]) * dx + (z - a[1]) * dz) / L)) : 0;
        return Math.hypot(x - a[0] - t * dx, z - a[1] - t * dz) < w + margin;
    });
}

/** Pieces scattered around a site: small broken panels and beams, sunk in the ground. */
function debris(parts, r, n, spread, ground, hull, soil, level) {
    const k = new Kit({ hull, dark: [.12, .12, .13, 1], steel: [.4, .4, .42, 1], trim: [.5, .5, .5, 1], accent: hull, glass: [.2, .25, .3, 1], window: [.3, .3, .3, 1], detail: level ? .35 : 1 });
    for (let q = 0; q < (level ? Math.ceil(n / 2) : n); q++) {
        const a = r() * 6.283, d = 6 + r() * spread, x = Math.cos(a) * d, z = Math.sin(a) * d, y = ground(x, z), w = .3 + r() * 1.1;
        k.push([x, y + .05, z], [(r() - .5) * .8, r() * 6.283, (r() - .5) * .8]);
        k.paint((r() < .6 ? hull : [.32, .32, .34, 1]).map((v, i) => i < 3 ? v * .6 + soil[i] * .25 : 1), .3, .85); k.box([0, 0, 0], [w, .06 + r() * .12, .2 + r() * .6]);
        k.pop();
    }
    parts.push(k.mesh());
}

/** The wreck: the ship of the site in its size, broken across its length into a front and a rear part, the
 * front pitched into the ground, the rear turned aside, scorched; a trail of debris behind. */
function wreck(parts, blocks, s, site, r, level, local) {
    const entry = CATALOG.find(e => e.id === site.ship), model = buildCraft(entry, entry.seed, level ? { detail: LOW_DETAIL } : {});
    const hull = merged(model.parts.map(p => p.mesh)), lo = [Infinity, Infinity, Infinity], hi = [-Infinity, -Infinity, -Infinity];
    for (let i = 0; i < hull.v.length; i += 16) for (let a = 0; a < 3; a++) { lo[a] = Math.min(lo[a], hull.v[i + a]); hi[a] = Math.max(hi[a], hull.v[i + a]); }
    const metres = parseFloat(entry.size.replace(/[^\d.]/g, '')) || 60, k = Math.min(60, metres * METRE) / (hi[2] - lo[2]), cut = lo[2] + (hi[2] - lo[2]) * (.4 + r() * .2);
    const front = { v: hull.v, i: [] }, rear = { v: hull.v, i: [] };
    for (let t = 0; t < hull.i.length; t += 3) { const a = hull.i[t], b = hull.i[t + 1], c = hull.i[t + 2]; ((hull.v[a * 16 + 2] + hull.v[b * 16 + 2] + hull.v[c * 16 + 2]) / 3 > cut ? front : rear).i.push(a, b, c); }
    const g = s.genome, soil = g.palette.rock.map(v => v * .5), y0 = site.y, half = (hi[1] - lo[1]) * k / 2;
    const scorch = m => aged({ v: new Float32Array(m.v), i: new Uint32Array(m.i), stride: 16 }, soil, (hi[1] - lo[1]) * k, { dust: .3, dark: .62, burn: .55, seed: site.seed % 97 });
    // Each part is centred on the cut, so it turns around the break; then laid on the ground where it lies.
    const shift = m => placed(m, { t: [-(lo[0] + hi[0]) / 2 * k, -(lo[1] + hi[1]) / 2 * k, -cut * k], k });
    // Positions along the hull (x across, z along) turn with the heading of the site, as the parts do.
    const lay = (m, x, z, opts) => { const [wx, wz] = local(x, z), y = s.heightAt(site.x + wx, site.z + wz) - y0; return placed(m, { t: [wx, y + half * .35, wz], ...opts, h: site.h + (opts.h || 0) }); };
    const len = (hi[2] - lo[2]) * k, gap = 2 + r() * 4, yaw = (r() < .5 ? -1 : 1) * (.35 + r() * .5);
    parts.push(lay(scorch(shift(front)), 0, gap, { h: 0, ax: .12 + r() * .14, az: (r() - .5) * .5 }));
    parts.push(lay(scorch(shift(rear)), Math.sin(yaw) * gap, -gap, { h: yaw, ax: -.05, az: (r() - .5) * .7 }));
    for (const [z, w] of [[len * .3, .32], [len * .05, .3], [-len * .3, .3]]) { const [a, b] = local(0, z); blocks.push([+(site.x + a).toFixed(2), +(site.z + b).toFixed(2), +Math.max(2, (hi[0] - lo[0]) * k * w * 1.6).toFixed(2)]); }
    // The parachute of a probe that came down through enough air: drawn before the debris, whose count depends
    // on the level of detail, so it lies in the same place at both levels.
    const chute = site.kind === 'sonda' && planetPhysics()[s.index].pressure >= .1 ? { bend: r() - .5, tint: .24 + r() * .12, pocket: .7 + r() * .2 } : null;
    // Debris along the path of the fall, behind the rear part, smaller for the smaller craft.
    const small = Math.min(1, .3 + len / 50), k2 = new Kit({ hull: [.4, .4, .42, 1], dark: [.1, .1, .1, 1], steel: [.35, .35, .38, 1], trim: [.45, .45, .45, 1], accent: [.4, .4, .4, 1], glass: [.2, .2, .2, 1], window: [.2, .2, .2, 1], detail: level ? .35 : 1 });
    for (let q = 0; q < (level ? 10 : 26); q++) {
        const z = -len * .5 - r() * len * 1.4, x = (r() - .5) * (6 * small + Math.abs(z) * .15), [wx, wz] = local(x, z), y = s.heightAt(site.x + wx, site.z + wz) - y0, w = (.25 + r() * r() * 1.6) * small;
        k2.push([wx, y + .05, wz], [(r() - .5), r() * 6.283, (r() - .5)]); k2.paint([.28 + r() * .2, .27 + r() * .2, .27 + r() * .2, 1], .4, .8); k2.box([0, 0, 0], [w, .08 + r() * .15, w * (.4 + r())]); k2.pop();
    }
    // The probe lies before its parachute, which the wind has stretched out behind it: a canopy of orange and
    // white gores, narrow at the skirt, wider in the middle, with lengthwise folds and a pocket of air near the
    // apex, following the ground; the shroud lines run from the hull to the skirt.
    if (chute) {
        const R = len * .55, z0 = -len * .5 - R * .8, Lc = R * 1.9, nu = level ? 7 : 16, nv = level ? 8 : 16;
        const at = (u, v) => {
            const z = z0 - u * Lc, wide = R * (.3 + .5 * Math.sin(Math.PI * (.12 + .88 * u))), x = chute.bend * R * .7 * u * u + v * wide / 2, [wx, wz] = local(x, z);
            const lift = R * (.025 + .15 * Math.exp(-(((u - chute.pocket) / .16) ** 2))) * Math.sqrt(Math.max(0, 1 - v * v)) * (.72 + .28 * Math.abs(Math.cos(v * Math.PI * 2.5)));
            return [wx, s.heightAt(site.x + wx, site.z + wz) - y0 + .04 + lift, wz];
        };
        for (let a = 0; a < nu; a++) for (let b = 0; b < nv; b++) {
            const u0 = a / nu, u1 = (a + 1) / nu, v0 = b / nv * 2 - 1, v1 = (b + 1) / nv * 2 - 1;
            k2.paint(Math.floor(b * 8 / nv) % 2 ? [.92, .9, .85, 1] : [.9, chute.tint, .07, 1], 0, .88);
            k2.quad(at(u0, v0), at(u0, v1), at(u1, v1), at(u1, v0));
        }
        const [ax, az] = local(0, -len * .45), ay = s.heightAt(site.x + ax, site.z + az) - y0 + half * .5, n = level ? 4 : 8;
        k2.paint([.8, .78, .72, 1], 0, .9);
        for (let q = 0; q < n; q++) k2.beam([ax, ay, az], at(0, q / (n - 1) * 1.8 - .9), .03);
    }
    parts.push(k2.mesh());
}

/** Ruins of a native village: a circle of standing stones, some fallen, round a hearth; low broken walls of two
 * or three houses; moss on the tops where plants grow. */
function ruins(parts, blocks, g, r, level, ground, block) {
    const stone = g.palette.rock.map(v => Math.min(1, v * .75 + .18)), moss = g.palette.pigment, green = Math.min(1, g.atmosphere.density * 1.6) * (g.family === 'terrestrial' || g.family === 'oceanic' ? .55 : .25);
    const k = new Kit({ hull: [...stone, 1], dark: [.1, .1, .1, 1], steel: [.4, .4, .4, 1], trim: [.5, .5, .5, 1], accent: [...stone, 1], glass: [.2, .2, .2, 1], window: [.2, .2, .2, 1], detail: level ? .35 : 1 });
    const paint = top => k.paint([...stone.map((v, i) => (v + (moss[i] - v) * (top ? green : 0)) * (.82 + r() * .3)), 1], 0, .92);
    // Stones of the circle.
    const n = 9 + Math.floor(r() * 5), R = 6.5 + r() * 3;
    for (let q = 0; q < n; q++) {
        const a = q / n * 6.283 + (r() - .5) * .2, x = Math.cos(a) * R, z = Math.sin(a) * R, y = ground(x, z), h = 1.2 + r() * 2.2, w = .45 + r() * .35, fallen = r() < .25;
        k.push([x, y - .3, z], fallen ? [Math.PI / 2 - .1, a, (r() - .5) * .3] : [(r() - .5) * .16, a, (r() - .5) * .16]);
        paint(false); k.box([0, h / 2, 0], [w, h / 2, .32 + r() * .12]); paint(true); k.box([0, h + .04, 0], [w * .92, .05, .3]); k.pop();
        if (!fallen) block(x, z, w + .3);
    }
    // The hearth in the middle.
    { const y = ground(0, 0); k.push([0, y - .1, 0]); paint(false); k.cyl(1.4, 1.2, 0, .35, level ? 10 : 20, { caps: true }); k.paint([.08, .07, .06, 1], 0, .95); k.cyl(1, 1, .35, .36, level ? 10 : 20, { caps: true }); k.pop(); }
    // Broken walls of houses outside the circle, with a gap for the door.
    const houses = 2 + Math.floor(r() * 2);
    for (let q = 0; q < houses; q++) {
        const a = r() * 6.283, d = R + 6 + r() * 6, cx = Math.cos(a) * d, cz = Math.sin(a) * d, L = 3.5 + r() * 2.5, W = 2.5 + r() * 1.5;
        k.push([cx, ground(cx, cz) - .3, cz], [0, a + r() * .4, 0]);
        for (const [sx, sz, len, along] of [[0, -W, L, true], [0, W, L, true], [-L, 0, W, false], [L, 0, W, false]]) {
            const pieces = 4;
            for (let p = 0; p < pieces; p++) {
                if (sz < 0 && p === 1) continue;
                const t = (p + .5) / pieces * 2 - 1, h = .5 + r() * 1.7, x = along ? sx + t * len : sx, z = along ? sz : sz + t * len, half = len / pieces;
                paint(false); k.box([x, h / 2, z], along ? [half, h / 2, .3] : [.3, h / 2, half]); paint(true); k.box([x, h + .03, z], along ? [half * .96, .04, .28] : [.28, .04, half * .96]);
            }
        }
        k.pop(); block(cx, cz, Math.max(L, W) + .4);
    }
    parts.push(k.mesh());
}
