/** Points of interest of each explorable planet: the highest point, a landform typical of the terrain
 * style, the coast and up to two rare events of the identity card. The list depends only on the card;
 * positions are found on the generated surface (src/worlds/surface.js). Texts are qualitative, or use
 * standard relations (scale height, tides, lift); planet values come from the card. */

const comma = (x, d = 2) => x.toFixed(d).replace('.', ',');
/** Landform of each terrain style: name, where to look for it on the surface, explanation. */
export const STYLE_PLACES = Object.freeze({
    colline: { name: 'Valle del fiume', at: 'valley', text: 'L’acqua scorre verso il basso, scava il terreno e trasporta i sedimenti verso il mare: le valli si approfondiscono dove la corrente è più forte.' },
    terrazze: { name: 'Terrazze di roccia', at: 'open', text: 'Strati di roccia di durezza diversa si erodono a velocità diverse: gli strati duri restano come gradini, quelli teneri arretrano.' },
    pianura: { name: 'Piana alluvionale', at: 'valley', text: 'Durante le piene il fiume esce dall’alveo e deposita strati sottili di limo: per questo le piane alluvionali sono piatte e fertili.' },
    arcipelago: { name: 'Stretto fra le isole', at: 'shore', text: 'La portata d’acqua è il prodotto di sezione e velocità: dove il passaggio fra le isole si restringe, la corrente di marea accelera.' },
    atollo: { name: 'Laguna dell’atollo', at: 'shore', text: 'Un anello di scogliera chiude una laguna. Secondo l’ipotesi di Darwin la scogliera cresce intorno a un’isola vulcanica che sprofonda lentamente, finché resta solo l’anello.' },
    fiordi: { name: 'Fiordo', at: 'shore', text: 'Un ghiacciaio ha scavato una valle con sezione a U; quando il ghiaccio si è ritirato, il mare l’ha invasa.' },
    dune: { name: 'Cresta di duna', at: 'crest', text: 'Il vento spinge la sabbia su per il lato sopravvento, poco inclinato; sulla cresta la sabbia scivola giù dal lato sottovento, più ripido, e la duna avanza.' },
    canyon: { name: 'Fondo del canyon', at: 'minLand', text: 'Un fiume incide la roccia mentre il terreno si solleva. Le pareti mostrano gli strati: i più bassi sono i più antichi.' },
    mesa: { name: 'Mesa', at: 'max', text: 'Un tavolato protetto da uno strato di roccia dura in cima: intorno l’erosione ha asportato le rocce più tenere.' },
    crateri: { name: 'Cratere da impatto', at: 'min', text: 'Un corpo che arriva dallo spazio porta un’energia cinetica ½mv² enorme: all’impatto scava una cavità molto più larga del corpo stesso, con un bordo rialzato.' },
    altopiano: { name: 'Frattura dell’altopiano', at: 'minLand', text: 'Dove la crosta viene stirata si apre in fratture; i blocchi fra due faglie sprofondano e formano lunghe fosse.' },
    dorsali: { name: 'Scarpata', at: 'open', text: 'Quando l’interno del pianeta si raffredda e si contrae, la crosta si accorcia e i blocchi si sovrappongono lungo faglie: ne nascono lunghe scarpate.' },
    ghiacciai: { name: 'Fronte del ghiacciaio', at: 'shore', text: 'Il ghiaccio scorre lentamente verso valle sotto il proprio peso; dove raggiunge il mare si spezza in iceberg.' },
    banchisa: { name: 'Crepaccio nella banchisa', at: 'open', text: 'Il ghiaccio galleggia perché è meno denso dell’acqua liquida. Venti e correnti spingono le placche, che si separano e si richiudono.' },
    criovulcani: { name: 'Criovulcano', at: 'max', text: 'Invece della lava erutta acqua mescolata ad ammoniaca o metano, che gela subito in superficie, come si ipotizza su alcune lune ghiacciate del Sistema solare.' },
    vulcani: { name: 'Bocca del vulcano', at: 'max', text: 'Il magma risale perché è meno denso della roccia che lo circonda; i gas disciolti si liberano quando la pressione diminuisce.' },
    colate: { name: 'Colata lavica', at: 'lava', text: 'La superficie della colata si raffredda e forma una crosta scura che isola la lava sottostante, che continua a scorrere.' },
    caldera: { name: 'Lago della caldera', at: 'min', text: 'Dopo una grande eruzione la camera magmatica si svuota e il tetto crolla: la conca che resta si riempie d’acqua.' }
});
/** Rare events of the card that become places, in order of preference (at most two per planet). */
const EVENT_ORDER = ['aurora', 'eruzione di geyser', 'tempesta', 'pioggia di meteoriti', 'eclissi'];
function eventPlace(event, g) {
    switch (event) {
        case 'aurora': return { name: 'Aurora', at: 'max', text: 'Particelle cariche del vento stellare, guidate dal campo magnetico del pianeta, urtano i gas dell’alta atmosfera, che emettono luce. Il colore dipende dal gas: sulla Terra l’ossigeno dà il verde e il rosso.' };
        case 'eruzione di geyser': return g.family === 'arctic'
            ? { name: 'Geyser freddo', at: 'open', text: 'Sotto la crosta di ghiaccio l’acqua resta liquida e risale in getti che gelano nell’aria, come i pennacchi osservati su Encelado.' }
            : { name: 'Geyser', at: 'lava', text: 'L’acqua sotterranea, scaldata dalla roccia calda, raggiunge l’ebollizione in profondità e risale in getti intermittenti.' };
        case 'tempesta': return { name: 'Fronte di tempesta', at: 'open', text: 'L’aria calda e umida sale, si raffredda e il vapore condensa: il calore liberato dalla condensazione alimenta la tempesta.' };
        case 'pioggia di meteoriti': return { name: 'Campo di impatti', at: 'open', text: 'L’atmosfera è troppo sottile per frenare e consumare i frammenti che arrivano dallo spazio: raggiungono il suolo e scavano piccoli crateri.' };
        case 'eclissi': return { name: 'Osservatorio delle eclissi', at: 'max', text: 'Quando una luna passa davanti alla stella, la sua ombra corre sul paesaggio. L’eclissi è totale se il disco della luna appare più grande di quello della stella.' };
        default: return null;
    }
}
/** Places of a genome, without positions. */
export function placeList(g) {
    const list = [], density = g.atmosphere.density;
    list.push({ kind: 'vetta', name: 'Punto più alto', at: 'max', text: density >= .1
        ? `Salendo, la pressione dell’aria cala: a ogni altezza di scala H = RT/(Mg) si riduce di circa 2,7 volte (il fattore e). Con una gravità di ${comma(g.gravity)} g l’altezza di scala è ${comma(1 / g.gravity)} volte quella di un pianeta a 1 g con la stessa atmosfera.`
        : 'Senza un’atmosfera apprezzabile il cielo resta nero anche di giorno: non c’è aria che diffonda la luce della stella.' });
    const style = STYLE_PLACES[g.terrain.style];
    list.push({ kind: 'forma', ...style });
    if (g.terrain.seaLevel >= .15 && g.family !== 'barren' && style.at !== 'shore')
        list.push({ kind: 'costa', name: 'Linea di costa', at: 'shore', text: g.satellites.moons > 0
            ? 'Il mare sale e scende con le maree. La marea nasce dalla differenza fra l’attrazione della luna sui due lati del pianeta, che cala come 1/d³ con la distanza d.'
            : 'Il pianeta non ha lune: le sole maree sono quelle della stella, dovute alla differenza della sua attrazione sui due lati del pianeta.' });
    for (const e of EVENT_ORDER.filter(e => g.events.includes(e)).slice(0, 2)) list.push({ kind: 'evento', event: e, ...eventPlace(e, g) });
    return list.map((p, k) => ({ id: 'l' + k, ...p }));
}
/** Positions of the places on a surface: each in its kind of spot, inside the explorable area, at least
 * 18 units from the others and 12 from the stations. Returned in list order. */
export function locatePlaces(s, list) {
    const sea = s.seaY, cells = [];
    for (let z = -72; z <= 72; z += 2) for (let x = -72; x <= 72; x += 2) {
        if (s.stations.some(st => Math.hypot(st.position[0] - x, st.position[2] - z) < 12)) continue;
        const y = s.heightAt(x, z);
        cells.push({ x, z, y, land: sea === null || y > sea + .3, lava: s.lavaAt ? s.lavaAt(x, z) : 0 });
    }
    const shoreOf = c => c.land && sea !== null && c.y < sea + 1.2 && [[5, 0], [-5, 0], [0, 5], [0, -5]].some(([dx, dz]) => s.heightAt(c.x + dx, c.z + dz) < sea - .3);
    const heights = cells.filter(c => c.land).map(c => c.y).sort((a, b) => a - b), mid = heights[Math.floor(heights.length * .6)] ?? 0;
    const score = {
        max: c => c.land ? c.y : -Infinity,
        min: c => -c.y,
        minLand: c => c.land ? -c.y : -Infinity,
        valley: c => c.land && Math.hypot(c.x, c.z) < 55 ? -c.y : -Infinity,
        crest: c => c.land && Math.hypot(c.x, c.z) < 45 ? c.y : -Infinity,
        lava: c => c.land ? c.lava * 100 + c.y * .01 : -Infinity,
        shore: c => shoreOf(c) ? -Math.hypot(c.x + 10, c.z - 10) : -Infinity,
        open: c => c.land ? -Math.abs(c.y - mid) - Math.hypot(c.x + 25, c.z + 15) * .02 : -Infinity
    };
    // The landform is placed first, so a volcano or a mesa takes the top of the relief and the summit
    // the next highest point; then the coast and the events.
    const placed = [], rank = { forma: 0, vetta: 1, costa: 2, evento: 3 }, out = new Array(list.length);
    [...list.keys()].sort((a, b) => rank[list[a].kind] - rank[list[b].kind] || a - b).forEach(k => { out[k] = locate(list[k]); });
    return out;
    function locate(p) {
        const free = cells.filter(c => placed.every(q => Math.hypot(q[0] - c.x, q[2] - c.z) >= 18));
        let best = null, bestScore = -Infinity;
        for (const c of free) { const v = score[p.at](c); if (v > bestScore) { bestScore = v; best = c; } }
        if (!best || bestScore === -Infinity) for (const c of free) { const v = score.open(c); if (v > bestScore) { bestScore = v; best = c; } }
        best ||= cells[0];
        const position = [best.x, sea === null ? best.y : Math.max(best.y, sea), best.z];
        placed.push(position);
        return { ...p, position };
    }
}
