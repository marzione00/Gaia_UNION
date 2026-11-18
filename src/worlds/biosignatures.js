/** Lovelock's diagnosis: whether the atmosphere of a planet betrays a biosphere. A planet's signature is
 * the set of gases the analyser of biosignatures reads (src/navigation/instruments.js), chosen from the
 * family, the star and the atmosphere of its physical card (src/worlds/planet-physics.js). The verdict
 * comes from the atmosphere alone; the surface (its species) is the truth it is compared with in the
 * Nucleo di Gaia. Every reading follows a published criterion, cited in `source`. */

/** Atmospheric signatures: short name, gases read, verdict of the atmosphere alone, reading, source. */
export const SIGNATURES = Object.freeze({
    'ossigeno-metano': {
        name: 'Ossigeno e metano',
        gases: 'ossigeno e metano insieme, con azoto e acqua liquida', verdict: 'probabile',
        reading: 'Ossigeno e metano reagiscono fra loro: se restano insieme, qualcosa li produce di continuo. Con l’azoto e l’acqua liquida formano lo squilibrio chimico della Terra, il più grande del Sistema solare.',
        source: 'Lovelock 1965; Hitchcock e Lovelock 1967; Krissansen-Totton, Bergsman e Catling 2016'
    },
    'metano-anidride': {
        name: 'Metano e anidride carbonica',
        gases: 'metano e anidride carbonica abbondanti, poco monossido di carbonio', verdict: 'probabile',
        reading: 'È la firma della Terra dell’Archeano: metano, anidride carbonica, azoto e acqua liquida restano in squilibrio solo con un rifornimento biologico di metano. La scarsità di monossido di carbonio rafforza la diagnosi, perché la vita lo consuma facilmente.',
        source: 'Krissansen-Totton, Olson e Catling 2018'
    },
    'ossigeno-abiotico': {
        name: 'Ossigeno senza metano',
        gases: 'ossigeno abbondante senza metano, su un pianeta povero d’acqua intorno a una nana rossa', verdict: 'incerta',
        reading: 'Prima della sequenza principale una nana rossa resta molto luminosa per un tempo lungo: un pianeta della sua zona abitabile può perdere l’acqua e accumulare ossigeno senza alcuna vita. Senza metano accanto, l’ossigeno da solo lascia aperte entrambe le storie.',
        source: 'Luger e Barnes 2015'
    },
    vulcanica: {
        name: 'Gas vulcanici',
        gases: 'anidride carbonica e monossido di carbonio abbondanti, poco metano', verdict: 'incerta',
        reading: 'I gas dei vulcani portano molto più monossido di carbonio che metano. Una biosfera può esistere anche qui, coperta dal flusso vulcanico: il metano scarso e il monossido di carbonio rimasto nell’aria lasciano aperta la diagnosi.',
        source: 'Wogan, Krissansen-Totton e Catling 2020'
    },
    esosfera: {
        name: 'Nessuna atmosfera',
        gases: 'nessuna atmosfera apprezzabile da analizzare', verdict: 'assente',
        reading: 'Senza atmosfera la diagnosi di Lovelock resta muta. Una biosfera nascosta nel suolo può esistere lo stesso, e solo la discesa in superficie lo rivela.',
        source: 'Hitchcock e Lovelock 1967'
    }
});
/** Verdicts of the atmosphere alone. */
export const VERDICTS = Object.freeze({ probabile: 'vita probabile', incerta: 'diagnosi aperta', assente: 'nessun segno nell’atmosfera' });

/** Signature id of a physical card `p`: no atmosphere, volcanic outgassing, a dry planet of a red dwarf,
 * another dry planet, or a wet planet with an ocean or seas. */
export function signatureOf(p) {
    if (p.exosphere) return 'esosfera';
    if (p.family === 'volcanic') return 'vulcanica';
    if (p.family === 'desert') return p.star.spt[0] === 'M' ? 'ossigeno-abiotico' : 'metano-anidride';
    return 'ossigeno-metano';
}
/** Text of the card row «Firma atmosferica». */
export function signatureText(p) {
    const s = SIGNATURES[signatureOf(p)];
    return s.gases + '; ' + VERDICTS[s.verdict];
}

/** Outcomes of the comparison with the surface. */
export const OUTCOMES = Object.freeze({
    confermata: 'diagnosi confermata in superficie',
    superficie: 'vita trovata in superficie, oltre ciò che l’atmosfera poteva dire',
    'falso-negativo': 'falso negativo: vita trovata in superficie',
    'falso-positivo': 'falso positivo: nessuna specie in superficie',
    'nessuna-vita': 'nessuna vita, confermato in superficie',
    'da-verificare': 'da verificare scendendo in superficie'
});
/** Lovelock's diagnosis of planet `p` with `species` species, compared with the surface once `landed`. */
export function diagnosis(p, species, landed) {
    const id = signatureOf(p), { verdict } = SIGNATURES[id], life = species > 0;
    let outcome = 'da-verificare';
    if (landed) outcome = verdict === 'probabile' ? (life ? 'confermata' : 'falso-positivo') : verdict === 'incerta' ? (life ? 'superficie' : 'nessuna-vita') : life ? 'falso-negativo' : 'nessuna-vita';
    return { signature: id, verdict, outcome };
}

/** Reference worlds of the Solar System: available Gibbs energy of the atmosphere (J per mole of
 * atmosphere) from Krissansen-Totton, Bergsman and Catling (2016), and the species that cause it. */
export const REFERENCE_WORLDS = Object.freeze([
    { name: 'Terra, atmosfera e oceano', phi: 2326, cause: 'azoto, ossigeno e acqua liquida, che all’equilibrio formerebbero nitrati disciolti nell’oceano', life: true },
    { name: 'Marte', phi: 136, cause: 'monossido di carbonio e ossigeno prodotti dalla luce ultravioletta, che all’equilibrio formerebbero anidride carbonica', life: false },
    { name: 'Terra, sola atmosfera', phi: 1.5, cause: 'soprattutto ossigeno e metano, che ne danno 1,3 J/mol', life: true },
    { name: 'Titano', phi: 1.2, cause: 'etano e acetilene con idrogeno, che all’equilibrio formerebbero metano', life: false },
    { name: 'Venere', phi: 0.06, cause: 'zolfo elementare con anidride carbonica', life: false },
    { name: 'Giove', phi: 0.001, cause: 'acido cianidrico e monossido di carbonio con idrogeno, al livello di 1 bar', life: false }
]);

/** Sources of the diagnosis. */
export const SOURCES = Object.freeze([
    'Lovelock, J. E. (1965). A physical basis for life detection experiments. Nature, 207, 568–570.',
    'Hitchcock, D. R., e Lovelock, J. E. (1967). Life detection by atmospheric analysis. Icarus, 7, 149–159.',
    'Krissansen-Totton, J., Bergsman, D. S., e Catling, D. C. (2016). On detecting biospheres from chemical thermodynamic disequilibrium in planetary atmospheres. Astrobiology, 16(1), 39–67.',
    'Krissansen-Totton, J., Olson, S., e Catling, D. C. (2018). Disequilibrium biosignatures over Earth history and implications for detecting exoplanet life. Science Advances, 4(1), eaao5747.',
    'Luger, R., e Barnes, R. (2015). Extreme water loss and abiotic O2 buildup on planets throughout the habitable zones of M dwarfs. Astrobiology, 15(2), 119–143.',
    'Wogan, N., Krissansen-Totton, J., e Catling, D. C. (2020). Abundant atmospheric methane from volcanism on terrestrial planets is unlikely and strengthens the case for methane as a biosignature. The Planetary Science Journal, 1(3), 58.'
]);
