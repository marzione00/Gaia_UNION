# Regioni dei bracci e mondi di sintesi

Dalla versione 1.33.0 i quattro bracci della galassia hanno un aspetto proprio e una scheda di regione con i progressi della disciplina; al centro della galassia il Nucleo di Gaia è una destinazione della mappa, con tre mondi di sintesi da visitare. Le regole stanno in `src/navigation/regions.js`, `src/scene/cosmos.js` e `src/worlds/synthesis.js`.

## Il cielo di ogni braccio

Ogni disciplina segue un braccio a spirale, con le aree disposte dal nucleo verso l'esterno nell'ordine di studio (`src/scene/systems.js`). Le cinque nubi del cosmo (`docs/COSMIC_ENVIRONMENT.md`) sono ora ancorate ai bracci: ciascuna sta presso l'area centrale del proprio braccio, con la sua nebulosa principale e il suo filamento di polvere.

| braccio | nube | che cosa rappresenta | stelle brillanti aggiunte |
|---|---|---|---:|
| Matematica | ammasso aperto | stelle nate dalla stessa nube, con la stessa età e la stessa composizione chimica | 32% |
| Fisica | nube a riflessione | polvere che diffonde la luce delle stelle vicine, in modo più efficace per la luce azzurra | 20% |
| Chimica | polveri interstellari | polvere e gas freddo, dove sui grani di polvere si formano molecole, a cominciare dall'idrogeno molecolare | 20% |
| Biologia | formazione stellare | idrogeno ionizzato dalle stelle giovani, che ricombinandosi emette la riga rossa H-alfa a 656 nanometri | 20% |
| periferia | nube tenue in fondo al braccio della Fisica, presso l'area «Dalla relatività al Big Bang» | | 8% |

Le stelle brillanti aggiunte restano circa 12.000 su un milione, come prima; cambia la loro ripartizione fra le nubi, più fitta nell'ammasso del braccio della Matematica. Ogni sistema appartiene alla nube del proprio braccio, tranne l'area più esterna della Fisica, che appartiene alla periferia.

## La scheda di regione

La scena `#/region` (anche `#/regione`) riassume il braccio dell'unità selezionata in tre schede:

- **Aree del braccio**: aree, unità, avamposti costruiti, spedizioni completate, sezioni lette e percorsi guidati completati; per ogni area lo stato dell'avamposto, le spedizioni e le sezioni lette, con i pulsanti per il sistema e per l'avamposto (`docs/AVAMPOSTI.md`).
- **Rotte**: le corsie aperte fra le aree del braccio e le porte di salto aperte verso gli altri bracci, ognuna con un pulsante che porta al sistema di arrivo. I 147 passaggi della mappa si dividono in 78 corsie e 69 porte di salto.
- **Cielo del braccio**: la nube del braccio, che cosa rappresenta, la sua quota di stelle brillanti.

Si apre dalla mappa, con il pulsante «Regione» che compare quando una disciplina della legenda è evidenziata, e dall'avamposto, con il pulsante «Regione del braccio». Il pulsante «Torna alla mappa» riporta alla mappa con il braccio evidenziato.

## Il Nucleo di Gaia sulla mappa

Al centro della galassia la mappa segna il Nucleo di Gaia con un punto e un pulsante, che apre il Nucleo (`docs/NUCLEO_GAIA.md`) alla scheda dei mondi di sintesi. Il pulsante si sposta sopra il punto, o resta nascosto, quando coprirebbe i comandi, la legenda o il pulsante della regione: sui telefoni più bassi il Nucleo resta raggiungibile dalla nave e dal diario.

## I mondi di sintesi

La quarta scheda del Nucleo, «Mondi di sintesi», presenta tre mondi in cui il modello fisico del sito (`docs/FISICA_PIANETI.md`) e la diagnosi di Lovelock si incontrano. Un mondo conta come visitato quando viene mostrato; il salvataggio registra le visite in `atlas.core` e il diario le conta.

| mondo | dati misurati | modello del sito | lettura di Lovelock |
|---|---|---|---|
| Venere | 2601 W/m², albedo 0,77, 92 bar, 737 K, 96,5% anidride carbonica e 3,5% azoto, 0,06 J/mol | temperatura di equilibrio 227 K; profondità ottica 148, uno dei due punti di taratura | atmosfera vicina all'equilibrio, nessuna vita |
| Marte | 586 W/m², albedo 0,25, 0,00636 bar, 214 K, 95,1% anidride carbonica, 2,59% azoto, 1,94% argo, 0,16% ossigeno, 0,06% monossido di carbonio, 136 J/mol | temperatura di equilibrio 210 K; profondità ottica 0,109, l'altro punto di taratura | squilibrio fotochimico senza vita |
| Terra dell'Archeano, da 4 a 2,5 miliardi di anni fa | Sole dal 75 all'82% di oggi; ossigeno sotto un milionesimo del livello attuale; azoto simile a oggi o alcune volte più basso; anidride carbonica da circa 10 a 2500 volte e metano da 100 a 10.000 volte il livello moderno; squilibrio da 5,1 a 234 J/mol con l'oceano | con l'albedo di oggi, 237 K di equilibrio 3,8 miliardi di anni fa; con l'effetto serra di oggi (profondità ottica 0,83) la superficie starebbe a 268 K; per superare 273 K serve almeno 1,00 | biosfera senza ossigeno, firma di anidride carbonica, azoto, metano e acqua liquida |

La luminosità del Sole giovane segue la formula di Gough (1981), riportata da Feulner (2012): L(t)/L₀ = 1 / (1 + 2/5 (1 − t/t₀)), con t₀ = 4,57 miliardi di anni. Vale 0,750 a 3,8 miliardi di anni fa e 0,820 a 2,5 miliardi di anni fa, coerente con il 20-25% in meno durante l'Archeano riportato da Charnay e colleghi (2020). Il risultato del modello del sito per la Terra dell'Archeano è il paradosso del Sole giovane e debole: con l'effetto serra di oggi la Terra di 3,8 miliardi di anni fa gelerebbe. Secondo Catling e Zahnle (2020) le concentrazioni di gas serra dell'Archeano bastavano a compensare il Sole più debole, e Charnay e colleghi (2020) ritengono il problema sostanzialmente risolto da concentrazioni più alte di anidride carbonica; nella sua rassegna del 2012 Feulner lo considerava ancora aperto.

Ogni mondo rimanda ad alcuni capitoli del libro: «Atmosfere, effetto serra e clima», «Radiazione termica e luce delle stelle» e «Biofirme e falsi positivi» per Venere; «Marte: acqua e abitabilità passata», «Cercare la vita su Marte» e «Biofirme e falsi positivi» per Marte; «Le prime tracce della vita e il tempo geologico», «Ossigeno, endosimbiosi e cellule complesse» e «Atmosfere, effetto serra e clima» per la Terra dell'Archeano.

## Verifiche

`tests/regions.test.mjs` controlla aree, unità e nubi dei quattro bracci, la divisione dei passaggi in corsie e porte di salto, l'apertura di una porta di salto con una sezione letta, la formula di Gough, il risultato del modello per la Terra dell'Archeano, i dati dei mondi rispetto alle schede NASA e ai valori dello squilibrio, la registrazione delle visite e lo stile dei testi. `tests/cosmos.test.mjs` controlla che ogni sistema appartenga alla nube del suo braccio e che ogni nube sia più vicina, in media, al proprio braccio che agli altri. I flussi applicativi aprono la regione dall'avamposto, tornano alla mappa con il braccio evidenziato e visitano due mondi di sintesi.

## Fonti

- NASA, Venus Fact Sheet e Mars Fact Sheet: https://nssdc.gsfc.nasa.gov/planetary/factsheet/.
- Formula di Gough (1981), nella forma riportata da Feulner, G. (2012). The faint young Sun problem. Reviews of Geophysics, 50, RG2006.
- Charnay, B., Wolf, E. T., Marty, B., e Forget, F. (2020). Is the faint young Sun problem for Earth solved? Space Science Reviews, 216(5), 90.
- Catling, D. C., e Zahnle, K. J. (2020). The Archean atmosphere. Science Advances, 6(9), eaax1420.
- Krissansen-Totton, J., Bergsman, D. S., e Catling, D. C. (2016). Astrobiology, 16(1), 39–67.
- Krissansen-Totton, J., Olson, S., e Catling, D. C. (2018). Science Advances, 4(1), eaao5747.
