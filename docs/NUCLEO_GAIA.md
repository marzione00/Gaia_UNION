# Il Nucleo di Gaia

Dalla versione 1.30.0 la nave ha un Nucleo di Gaia, una schermata che applica la diagnosi proposta da James Lovelock nel 1965: un pianeta abitato mantiene nella sua atmosfera gas che senza la vita reagirebbero fino all'equilibrio, e lo squilibrio chimico si può misurare da lontano. Il Nucleo mette accanto i mondi del Sistema solare che tarano la diagnosi, le firme atmosferiche dei pianeti della galassia e il confronto fra il verdetto dell'atmosfera e ciò che lo studente trova scendendo in superficie. Le regole stanno in `src/worlds/biosignatures.js`.

## Dove si trova

- Nella schermata della nave, il pulsante «Nucleo di Gaia».
- Nel diario, alla scheda «Esplorazione», il pulsante «Nucleo di Gaia».
- All'indirizzo `#/gaia` (anche `#/nucleo`).

La schermata ha tre schede: «Mondi di riferimento», «Firme atmosferiche» e «Diagnosi». Dalla 1.33.0 se ne aggiunge una quarta, «Mondi di sintesi», con Venere, Marte e la Terra dell'Archeano (`docs/REGIONI.md`), e il Nucleo è anche una destinazione al centro della mappa. Il testo è diviso in pagine quando lo schermo è basso, ed è disponibile per intero ai lettori di schermo.

## Mondi di riferimento

Krissansen-Totton, Bergsman e Catling (2016) misurano lo squilibrio di un'atmosfera come energia libera di Gibbs disponibile, cioè l'energia che si libererebbe per mole di atmosfera se tutti i gas reagissero fino all'equilibrio. I valori della schermata sono quelli dell'articolo, disegnati su una scala logaritmica da 0,0001 a 10.000 J/mol.

| mondo | energia libera disponibile (J/mol) | specie che la producono |
|---|---:|---|
| Terra, atmosfera e oceano | 2326 | azoto, ossigeno e acqua liquida, che all'equilibrio formerebbero nitrati disciolti nell'oceano |
| Marte | 136 | monossido di carbonio e ossigeno prodotti dalla luce ultravioletta |
| Terra, sola atmosfera | 1,5 | soprattutto ossigeno e metano, che ne danno 1,3 J/mol |
| Titano | 1,2 | etano e acetilene con idrogeno |
| Venere | 0,06 | zolfo elementare con anidride carbonica |
| Giove | 0,001 | acido cianidrico e monossido di carbonio con idrogeno, al livello di 1 bar |

Con l'oceano la Terra supera Marte di circa 17 volte (2326 / 136). La sua sola atmosfera resta invece sotto Marte, il cui squilibrio è fotochimico: per riconoscere la vita conta quali gas coesistono, oltre a quanto vale lo squilibrio. Saturno e Nettuno sono esclusi dall'articolo per la somiglianza con Giove e Urano; per Urano il valore nominale è zero, e la schermata lo omette.

## Firme atmosferiche

L'analizzatore di biofirme (`docs/NAVE.md`) legge la firma atmosferica di ogni pianeta, scelta dalla sua scheda fisica secondo quattro regole, nell'ordine:

1. un pianeta senza atmosfera apprezzabile (densità della carta d'identità sotto 0,1) non ha firma;
2. un pianeta vulcanico ha i gas dei vulcani;
3. un pianeta desertico intorno a una nana rossa (tipo M) ha ossigeno senza metano;
4. gli altri pianeti desertici hanno metano e anidride carbonica; i pianeti terrestri, oceanici e glaciali hanno ossigeno e metano.

| firma | gas | verdetto dell'atmosfera | criterio | pianeti |
|---|---|---|---|---:|
| ossigeno e metano | ossigeno e metano insieme, con azoto e acqua liquida | vita probabile | Lovelock (1965); Hitchcock e Lovelock (1967); Krissansen-Totton, Bergsman e Catling (2016) | 65 |
| metano e anidride carbonica | metano e anidride carbonica abbondanti, poco monossido di carbonio | vita probabile | Krissansen-Totton, Olson e Catling (2018) | 18 |
| ossigeno senza metano | ossigeno abbondante senza metano, su un pianeta povero d'acqua intorno a una nana rossa | diagnosi aperta | Luger e Barnes (2015) | 5 |
| gas vulcanici | anidride carbonica e monossido di carbonio abbondanti, poco metano | diagnosi aperta | Wogan, Krissansen-Totton e Catling (2020) | 15 |
| nessuna atmosfera | nessuna atmosfera apprezzabile da analizzare | nessun segno nell'atmosfera | Hitchcock e Lovelock (1967) | 22 |

Le ragioni dei verdetti seguono le fonti. Ossigeno e metano reagiscono fra loro, e restano insieme solo se qualcosa li produce di continuo. Nell'Archeano la coesistenza di azoto, metano, anidride carbonica e acqua liquida era uno squilibrio di origine biologica; la scarsità di monossido di carbonio rafforza la diagnosi, perché il monossido di carbonio è una fonte di energia che la vita consuma. Intorno a una nana rossa, la lunga fase luminosa che precede la sequenza principale può far perdere l'acqua a un pianeta della zona abitabile e lasciargli ossigeno abiotico: senza metano accanto, l'ossigeno da solo lascia aperte entrambe le storie. I gas dei vulcani portano molto più monossido di carbonio che metano, e il flusso vulcanico copre la firma di un'eventuale biosfera. Senza atmosfera la diagnosi resta muta.

## Diagnosi

Ogni pianeta misurato con l'analizzatore di biofirme entra nella scheda «Diagnosi» con il verdetto della sua atmosfera. Il verdetto si confronta con la superficie quando lo studente scende sul pianeta: la discesa viene registrata nel diario e rivela la riga «Vita» della scheda fisica. Gli esiti sono sei: diagnosi confermata, vita trovata oltre la diagnosi aperta, falso negativo, falso positivo, nessuna vita, da verificare.

Sui 125 pianeti, a superficie nota, la diagnosi dà 83 conferme, 20 casi di vita trovata oltre la diagnosi aperta, 18 pianeti senza vita, tutti senza atmosfera, e 4 falsi negativi: quattro pianeti desertici senza atmosfera apprezzabile che ospitano comunque specie in superficie. Nessun pianeta dà un falso positivo. Con la modalità esploratore disattivata la diagnosi riguarda subito tutti i pianeti e il confronto con la superficie è già noto.

## Il computer di bordo

Con il Nucleo di Gaia la nave riceve un ottavo strumento, il computer di bordo, che si ottiene completando il percorso guidato dell'unità di matematica «Disequazioni» (`math-c05`), unità senza capitolo nel libro. Il computer calcola la riga «Zona abitabile» della scheda fisica, separata dalla riga «Luce»: la zona abitabile conservativa è l'insieme delle distanze d per cui il flusso L/d² resta fra il limite esterno e quello interno di Kopparapu e colleghi (2014), cioè l'intervallo da √(L/S_interno) a √(L/S_esterno) unità astronomiche.

## Verifiche

`tests/biosignatures.test.mjs` conta le firme e gli esiti sui 125 pianeti, controlla i valori dei mondi di riferimento e il rapporto fra Terra e Marte, verifica che l'intervallo del computer di bordo risolva la disequazione del flusso e che la posizione di ogni pianeta coincida con la zona della scheda, e controlla lo stile dei testi. `tests/instruments.test.mjs` verifica il computer di bordo, la riga «Vita» rivelata dalla discesa e l'indirizzo del Nucleo. I flussi applicativi portano a bordo l'analizzatore di biofirme, misurano un pianeta, verificano che la diagnosi resti da verificare, scendono in superficie e controllano l'esito nel Nucleo e la riga «Vita» nella scheda.

## Fonti

- Lovelock, J. E. (1965). A physical basis for life detection experiments. Nature, 207, 568–570.
- Hitchcock, D. R., e Lovelock, J. E. (1967). Life detection by atmospheric analysis. Icarus, 7, 149–159.
- Krissansen-Totton, J., Bergsman, D. S., e Catling, D. C. (2016). On detecting biospheres from chemical thermodynamic disequilibrium in planetary atmospheres. Astrobiology, 16(1), 39–67.
- Krissansen-Totton, J., Olson, S., e Catling, D. C. (2018). Disequilibrium biosignatures over Earth history and implications for detecting exoplanet life. Science Advances, 4(1), eaao5747.
- Luger, R., e Barnes, R. (2015). Extreme water loss and abiotic O2 buildup on planets throughout the habitable zones of M dwarfs. Astrobiology, 15(2), 119–143.
- Wogan, N., Krissansen-Totton, J., e Catling, D. C. (2020). Abundant atmospheric methane from volcanism on terrestrial planets is unlikely and strengthens the case for methane as a biosignature. The Planetary Science Journal, 1(3), 58.
- Kopparapu, R. K., e colleghi (2014). Habitable zones around main-sequence stars: dependence on planetary mass. The Astrophysical Journal Letters, 787, L29.
