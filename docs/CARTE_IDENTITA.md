# Carte d’identità dei pianeti

Ogni pianeta esplorabile ha una carta d’identità generata da `src/worlds/genome.js` a partire da ciò che il pianeta ha già: famiglia, dimensione, lune, anelli, rotazione, inclinazione e area tematica, più un tipo di stella per ogni sistema. Dalla carta dipendono terreno, mare, cielo, luce, colori di piante e rocce, gravità ed eventi rari. I valori sono illustrativi: non sono dati astronomici.

## Come si garantisce la diversità

- Ogni famiglia di pianeti ha tre stili di terreno; i pianeti di un’area, da tre a sei, hanno famiglie diverse e quindi terreni diversi (controllato dai test).
- Una distanza fra due carte, da 0 (identiche) a circa 1, pesa stile di terreno, famiglia, stella, livello del mare, rilievo, ruvidità, colore delle piante, atmosfera e gravità.
- Il generatore crea i pianeti in ordine e rigenera i parametri liberi di ciascuno (fino a 160 tentativi) finché è ad almeno 0,2 da tutti i precedenti, oppure tiene il tentativo più lontano. Sui 125 pianeti la distanza minima fra due pianeti qualsiasi è 0,175; i test richiedono almeno 0,17.

- I tipi di stella sono cinque (nana rossa M, nana arancione K, nana gialla G, bianco-gialla F, bianco-azzurra A), sei sistemi per ciascun tipo. Il colore della luce è approssimato; il pigmento delle piante cambia con la stella per contrasto, ispirato alle ipotesi di astrobiologia sulle piante sotto stelle diverse.

L’immagine con le 125 vedute dall’alto si rigenera con `node tools/render_genomes.mjs cartella` e `python3 tools/genome_sheet.py cartella foglio.png`. Le colonne «Giorno» dividono le durate in terzi (breve, medio, lungo); «Gravità» è relativa a un pianeta di raggio medio.

## Matematica

| Unità | Area | Famiglia | Terreno | Stella | Mare | Atmosfera | Gravità | Giorno | Lune, anelli | Eventi |
|---|---|---|---|---|---|---|---|---|---|---|
| Linguaggio e ragionamento matematico | Numeri e ragionamento | glaciale | Valli glaciali | K, nana arancione | 33% | media | 0,76 | breve | 1 luna | aurora, eclissi, eruzione di geyser |
| Algebra | Algebra ed equazioni | oceanico | Atolli e lagune | F, stella bianco-gialla | 57% | densa | 0,97 | lungo | 1 luna | aurora, eclissi, tempesta |
| Radicali | Algebra ed equazioni | desertico | Mese e altipiani | F, stella bianco-gialla | 11% | sottile | 0,93 | breve | 1 luna | aurora, eclissi |
| Equazioni e sistemi | Algebra ed equazioni | vulcanico | Campo vulcanico | F, stella bianco-gialla | 11% | densa | 1,29 | breve | 1 luna | eclissi, tempesta, eruzione di geyser |
| Disequazioni | Algebra ed equazioni | glaciale | Banchisa | F, stella bianco-gialla | 30% | sottile | 1,11 | lungo | 0 lune | eruzione di geyser |
| Esponenziali e logaritmi | Funzioni e variazione | desertico | Mese e altipiani | K, nana arancione | 0% | sottile | 0,99 | medio | 1 luna | eclissi |
| Geometria analitica | Geometria e trasformazioni | terrestre | Colline e fiumi | G, nana gialla | 26% | densa | 0,91 | breve | 1 luna | aurora, eclissi, tempesta |
| Funzioni | Funzioni e variazione | terrestre | Altopiani a terrazze | K, nana arancione | 28% | densa | 1,21 | breve | 0 lune | aurora, tempesta |
| Trigonometria | Geometria e trasformazioni | oceanico | Fiordi | G, nana gialla | 66% | densa | 1,25 | lungo | 1 luna | eclissi, tempesta |
| Combinatoria, probabilità e statistica | Probabilità e dati | oceanico | Arcipelago | F, stella bianco-gialla | 67% | densa | 1,10 | medio | 2 lune | aurora, eclissi, tempesta |
| Geometria elementare | Geometria e trasformazioni | craterizzato | Altopiano fratturato | G, nana gialla | 5% | sottile | 1,24 | breve | 0 lune | pioggia di meteoriti |
| Dagli zeri alla struttura di un polinomio | Algebra ed equazioni | terrestre | Pianura alluvionale | F, stella bianco-gialla | 45% | media | 1,25 | lungo | 1 luna | aurora, eclissi |
| Esistenza, unicità e approssimazione | Numeri e ragionamento | desertico | Mare di dune | K, nana arancione | 17% | sottile | 0,88 | breve | 2 lune | eclissi |
| Ragionamento, conteggio e infinito | Numeri e ragionamento | oceanico | Fiordi | K, nana arancione | 65% | densa | 1,30 | breve | 2 lune | aurora, eclissi, tempesta |
| Vettori, matrici, dati e vincoli | Geometria e trasformazioni | glaciale | Criovulcani | G, nana gialla | 46% | sottile | 1,05 | medio | 0 lune | aurora, eruzione di geyser |
| Complessi, aritmetica e polinomi | Algebra ed equazioni | craterizzato | Pianura di crateri | F, stella bianco-gialla | 4% | assente | 1,27 | medio | 1 luna | eclissi, pioggia di meteoriti |
| Limiti, variazione e accumulazione | Funzioni e variazione | vulcanico | Colate laviche | K, nana arancione | 11% | media | 0,79 | medio | 1 luna | aurora, eclissi, eruzione di geyser |
| Radici, campi e nuovi sistemi numerici | Numeri e ragionamento | terrestre | Colline e fiumi | K, nana arancione | 40% | media | 1,20 | medio | 2 lune | aurora, eclissi |
| Geometrie, trasformazioni e simmetrie | Geometria e trasformazioni | desertico | Mare di dune | G, nana gialla | 9% | media | 0,71 | medio | 2 lune | aurora, eclissi |
| Probabilità, informazione e fenomeni collettivi | Probabilità e dati | desertico | Canyon | F, stella bianco-gialla | 13% | sottile | 1,08 | medio | 0 lune | aurora |
| Iterazioni, stabilità e precisione numerica | Funzioni e variazione | oceanico | Atolli e lagune | K, nana arancione | 63% | media | 1,30 | breve | 0 lune | aurora |
| Onde, frequenze e ricostruzione | Matematica per le scienze | desertico | Mese e altipiani | G, nana gialla | 4% | media | 1,16 | lungo | 2 lune | aurora, eclissi |
| Reti, conservazione e strategie | Probabilità e dati | terrestre | Altopiani a terrazze | F, stella bianco-gialla | 46% | media | 0,79 | lungo | 2 lune | eclissi |
| Scala, energia, equilibrio e trasformazioni | Matematica per le scienze | glaciale | Valli glaciali | G, nana gialla | 48% | sottile | 0,84 | breve | 2 lune | aurora, eclissi, eruzione di geyser |
| Oscillazioni, molecole e quantizzazione | Matematica per le scienze | oceanico | Arcipelago | G, nana gialla | 61% | media | 1,06 | medio | 0 lune | aurora |

## Fisica

| Unità | Area | Famiglia | Terreno | Stella | Mare | Atmosfera | Gravità | Giorno | Lune, anelli | Eventi |
|---|---|---|---|---|---|---|---|---|---|---|
| Misure, unità e incertezza | Misura e moto | craterizzato | Altopiano fratturato | M, nana rossa | 2% | sottile | 0,84 | medio | 1 luna | eclissi, pioggia di meteoriti |
| Vettori e sistemi di riferimento | Misura e moto | desertico | Mese e altipiani | M, nana rossa | 0% | media | 1,15 | breve | 0 lune | aurora |
| Moto rettilineo uniforme | Misura e moto | glaciale | Valli glaciali | M, nana rossa | 40% | media | 0,89 | medio | 2 lune | aurora, eclissi, eruzione di geyser |
| Moto uniformemente accelerato | Misura e moto | oceanico | Atolli e lagune | M, nana rossa | 54% | media | 0,82 | medio | 1 luna | eclissi |
| Traiettorie e lanci | Misura e moto | terrestre | Pianura alluvionale | M, nana rossa | 34% | media | 0,85 | lungo | 1 luna | eclissi |
| Forze e leggi di Newton | Forze ed energia | desertico | Mare di dune | M, nana rossa | 11% | sottile | 0,93 | medio | 1 luna | aurora, eclissi |
| Attrito e vincoli | Forze ed energia | vulcanico | Colate laviche | M, nana rossa | 16% | densa | 0,92 | medio | 1 luna | eclissi, tempesta, eruzione di geyser |
| Lavoro ed energia | Forze ed energia | glaciale | Criovulcani | M, nana rossa | 22% | sottile | 0,84 | medio | 1 luna | eclissi, eruzione di geyser |
| Quantità di moto e urti | Forze ed energia | oceanico | Arcipelago | M, nana rossa | 51% | media | 1,20 | medio | 1 luna | aurora, eclissi, tempesta |
| Rotazione e momento d’inerzia | Rotazioni e gravità | desertico | Mare di dune | F, stella bianco-gialla | 18% | media | 0,97 | breve | 2 lune | aurora, eclissi |
| Momenti, leve ed equilibrio | Rotazioni e gravità | vulcanico | Caldera con lago | F, stella bianco-gialla | 9% | media | 0,78 | medio | 1 luna | aurora, eclissi, tempesta, eruzione di geyser |
| Gravitazione | Rotazioni e gravità | oceanico | Arcipelago | F, stella bianco-gialla | 55% | media | 0,76 | breve | 1 luna | eclissi |
| Orbite circolari | Rotazioni e gravità | craterizzato | Altopiano fratturato | F, stella bianco-gialla | 3% | sottile | 1,01 | lungo | 2 lune | eclissi, pioggia di meteoriti |
| Fluidi e pressione | Fluidi, oscillazioni e onde | terrestre | Pianura alluvionale | G, nana gialla | 42% | media | 0,89 | breve | 0 lune | nessuno |
| Galleggiamento e Archimede | Fluidi, oscillazioni e onde | vulcanico | Campo vulcanico | G, nana gialla | 12% | media | 1,19 | lungo | 0 lune | eruzione di geyser |
| Oscillazioni armoniche | Fluidi, oscillazioni e onde | oceanico | Atolli e lagune | G, nana gialla | 64% | media | 0,78 | medio | 2 lune | eclissi |
| Onde e sovrapposizione | Fluidi, oscillazioni e onde | glaciale | Banchisa | G, nana gialla | 30% | media | 1,27 | lungo | 1 luna | aurora, eclissi, eruzione di geyser |
| Gas ideali | Calore e termodinamica | glaciale | Banchisa | M, nana rossa | 30% | sottile | 0,72 | medio | 0 lune | aurora, eruzione di geyser |
| Calore e capacità termica | Calore e termodinamica | vulcanico | Caldera con lago | M, nana rossa | 10% | densa | 0,88 | medio | 2 lune | aurora, eclissi, tempesta, eruzione di geyser |
| Termodinamica e rendimento | Calore e termodinamica | desertico | Mare di dune | M, nana rossa | 5% | sottile | 1,22 | medio | 1 luna | aurora, eclissi |
| Cariche e campo elettrico | Elettromagnetismo e quanti | oceanico | Fiordi | F, stella bianco-gialla | 53% | media | 1,02 | breve | 0 lune | aurora |
| Potenziale ed energia elettrica | Elettromagnetismo e quanti | vulcanico | Colate laviche | F, stella bianco-gialla | 15% | densa | 1,12 | medio | 2 lune | aurora, eclissi, tempesta, eruzione di geyser |
| Circuiti e legge di Ohm | Elettromagnetismo e quanti | desertico | Mare di dune | F, stella bianco-gialla | 8% | sottile | 0,92 | lungo | 2 lune | aurora, eclissi |
| Induzione elettromagnetica | Elettromagnetismo e quanti | terrestre | Colline e fiumi | F, stella bianco-gialla | 37% | media | 1,00 | breve | 0 lune | aurora, tempesta |
| Fotoni ed energia quantizzata | Elettromagnetismo e quanti | glaciale | Criovulcani | F, stella bianco-gialla | 24% | media | 0,91 | lungo | 2 lune | eclissi, eruzione di geyser |
| Onde elettromagnetiche e pressione della luce | Luce e telescopi | terrestre | Altopiani a terrazze | A, stella bianco-azzurra | 42% | media | 0,75 | breve | 1 luna | eclissi |
| Specchi, lenti e telescopi | Luce e telescopi | oceanico | Atolli e lagune | A, stella bianco-azzurra | 55% | media | 0,92 | lungo | 1 luna | aurora, eclissi |
| Interferenza e interferometri | Luce e telescopi | desertico | Mare di dune | A, stella bianco-azzurra | 1% | sottile | 1,06 | breve | 1 luna | eclissi, pioggia di meteoriti |
| Diffrazione e potere risolutivo | Luce e telescopi | craterizzato | Altopiano fratturato | A, stella bianco-azzurra | 4% | sottile | 0,71 | breve | 2 lune | eclissi, pioggia di meteoriti |
| Radiazione termica e luce delle stelle | Luce e telescopi | glaciale | Banchisa | A, stella bianco-azzurra | 21% | sottile | 0,73 | lungo | 1 luna | eclissi, eruzione di geyser |
| Legge di Gauss: gusci, pianeti e condensatori | Campi e plasmi nello spazio | terrestre | Altopiani a terrazze | K, nana arancione | 32% | media | 0,90 | breve | 0 lune | aurora |
| Particelle cariche nei campi magnetici | Campi e plasmi nello spazio | oceanico | Atolli e lagune | K, nana arancione | 70% | densa | 0,89 | lungo | 0 lune | tempesta |
| Correnti, dipoli e dinamo dei pianeti | Campi e plasmi nello spazio | desertico | Canyon | K, nana arancione | 18% | sottile | 0,98 | lungo | 0 lune | aurora |
| Induzione, circuiti oscillanti e radio | Campi e plasmi nello spazio | craterizzato | Pianura di crateri | K, nana arancione | 4% | assente | 0,97 | breve | 0 lune | pioggia di meteoriti |
| Equazioni di Maxwell e magnetismo della materia | Campi e plasmi nello spazio | glaciale | Criovulcani | K, nana arancione | 40% | media | 0,73 | breve | 2 lune | eclissi, eruzione di geyser |
| Relatività ristretta | Dalla relatività al Big Bang | terrestre | Pianura alluvionale | F, stella bianco-gialla | 32% | densa | 0,87 | breve | 2 lune | eclissi, tempesta |
| Onde di materia, atomi e righe spettrali | Dalla relatività al Big Bang | glaciale | Banchisa | F, stella bianco-gialla | 47% | media | 0,98 | medio | 1 luna | aurora, eclissi, eruzione di geyser |
| Nuclei, decadimenti e datazioni | Dalla relatività al Big Bang | desertico | Canyon | F, stella bianco-gialla | 2% | sottile | 1,19 | medio | 0 lune | aurora |
| Energia dal nucleo: fusione nelle stelle | Dalla relatività al Big Bang | vulcanico | Caldera con lago | F, stella bianco-gialla | 7% | densa | 1,06 | lungo | 1 luna | eclissi, tempesta, eruzione di geyser |
| Particelle, espansione e Big Bang | Dalla relatività al Big Bang | oceanico | Fiordi | F, stella bianco-gialla | 60% | densa | 0,82 | breve | 1 luna | eclissi, tempesta |

## Chimica

| Unità | Area | Famiglia | Terreno | Stella | Mare | Atmosfera | Gravità | Giorno | Lune, anelli | Eventi |
|---|---|---|---|---|---|---|---|---|---|---|
| Materia, proprietà e densità | Materia e atomi | oceanico | Atolli e lagune | G, nana gialla | 57% | media | 1,03 | lungo | 2 lune | eclissi |
| Atomi, isotopi e massa media | Materia e atomi | desertico | Canyon | G, nana gialla | 5% | sottile | 1,14 | medio | 1 luna | eclissi, pioggia di meteoriti |
| Mole e quantità di sostanza | Materia e atomi | craterizzato | Dorsali e scarpate | G, nana gialla | 2% | assente | 1,17 | lungo | 1 luna | eclissi, pioggia di meteoriti |
| Livelli atomici e spettri | Materia e atomi | terrestre | Altopiani a terrazze | G, nana gialla | 41% | densa | 1,12 | lungo | 0 lune | tempesta |
| Periodicità e carica efficace | Materia e atomi | glaciale | Valli glaciali | G, nana gialla | 25% | media | 1,16 | lungo | 1 luna | aurora, eclissi, eruzione di geyser |
| Legame ionico e interazioni elettrostatiche | Legami e molecole | desertico | Canyon | M, nana rossa | 17% | sottile | 1,06 | lungo | 2 lune | aurora, eclissi |
| Legame covalente ed energia di legame | Legami e molecole | craterizzato | Dorsali e scarpate | M, nana rossa | 2% | sottile | 1,25 | lungo | 0 lune | pioggia di meteoriti |
| Geometria molecolare e VSEPR | Legami e molecole | vulcanico | Campo vulcanico | M, nana rossa | 22% | media | 1,24 | breve | 0 lune | tempesta, eruzione di geyser |
| Forze intermolecolari | Legami e molecole | oceanico | Fiordi | M, nana rossa | 66% | densa | 1,11 | breve | 1 luna | aurora, eclissi, tempesta |
| Gas e stato aeriforme | Stati e soluzioni | oceanico | Fiordi | A, stella bianco-azzurra | 65% | densa | 0,92 | breve | 1 luna | eclissi, tempesta |
| Stati della materia e transizioni | Stati e soluzioni | glaciale | Valli glaciali | A, stella bianco-azzurra | 43% | sottile | 0,74 | medio | 0 lune | aurora, eruzione di geyser |
| Soluzioni e concentrazione | Stati e soluzioni | craterizzato | Pianura di crateri | A, stella bianco-azzurra | 0% | assente | 1,21 | lungo | 0 lune | pioggia di meteoriti |
| Solubilità ed equilibrio eterogeneo | Stati e soluzioni | desertico | Mese e altipiani | A, stella bianco-azzurra | 0% | media | 1,19 | breve | 2 lune | aurora, eclissi |
| Stechiometria e reagente limitante | Reazioni e quantità | oceanico | Arcipelago | K, nana arancione | 57% | densa | 0,84 | lungo | 2 lune | eclissi, tempesta |
| Resa e bilanci di materia | Reazioni e quantità | desertico | Canyon | K, nana arancione | 8% | sottile | 1,25 | lungo | 2 lune | eclissi, pioggia di meteoriti |
| Termochimica e calorimetria | Reazioni e quantità | terrestre | Pianura alluvionale | K, nana arancione | 40% | densa | 1,07 | lungo | 0 lune | aurora, tempesta |
| Velocità di reazione | Velocità ed equilibrio | craterizzato | Dorsali e scarpate | A, stella bianco-azzurra | 3% | assente | 1,28 | lungo | 2 lune | eclissi, pioggia di meteoriti |
| Temperatura e attivazione | Velocità ed equilibrio | desertico | Canyon | A, stella bianco-azzurra | 17% | media | 1,28 | breve | 1 luna | aurora, eclissi |
| Equilibrio chimico | Velocità ed equilibrio | oceanico | Arcipelago | A, stella bianco-azzurra | 68% | media | 0,90 | breve | 0 lune | nessuno |
| Perturbazioni dell’equilibrio | Velocità ed equilibrio | vulcanico | Campo vulcanico | A, stella bianco-azzurra | 14% | densa | 1,11 | medio | 1 luna | aurora, eclissi, tempesta, eruzione di geyser |
| Acidi, basi e pH | Acidi, redox e carbonio | vulcanico | Colate laviche | A, stella bianco-azzurra | 16% | media | 0,87 | breve | 0 lune | aurora, eruzione di geyser |
| Soluzioni tampone | Acidi, redox e carbonio | craterizzato | Altopiano fratturato | A, stella bianco-azzurra | 1% | assente | 1,18 | lungo | 1 luna | eclissi, pioggia di meteoriti |
| Ossidazione, riduzione ed elettrochimica | Acidi, redox e carbonio | terrestre | Colline e fiumi | A, stella bianco-azzurra | 45% | media | 1,30 | lungo | 0 lune | aurora |
| Chimica organica e scheletri carboniosi | Acidi, redox e carbonio | glaciale | Banchisa | A, stella bianco-azzurra | 28% | sottile | 0,93 | medio | 2 lune | eclissi, eruzione di geyser |
| Polimeri e materiali | Acidi, redox e carbonio | oceanico | Atolli e lagune | A, stella bianco-azzurra | 61% | densa | 1,05 | medio | 1 luna | aurora, eclissi, tempesta |

## Biologia

| Unità | Area | Famiglia | Terreno | Stella | Mare | Atmosfera | Gravità | Giorno | Lune, anelli | Eventi |
|---|---|---|---|---|---|---|---|---|---|---|
| Che cos'è la vita | La vita e la cellula | glaciale | Banchisa | K, nana arancione | 31% | media | 0,78 | breve | 1 luna | eclissi, eruzione di geyser |
| Cellule, scala e superficie | La vita e la cellula | desertico | Mese e altipiani | K, nana arancione | 18% | media | 1,16 | medio | 1 luna | aurora, eclissi |
| Membrane e protocellule | La vita e la cellula | vulcanico | Campo vulcanico | K, nana arancione | 16% | media | 0,74 | breve | 0 lune | aurora, eruzione di geyser |
| Elementi e molecole della vita nello spazio | Molecole dal cosmo | glaciale | Banchisa | M, nana rossa | 46% | media | 1,22 | breve | 1 luna | aurora, eclissi, eruzione di geyser |
| Meteoriti, comete e campioni di asteroidi | Molecole dal cosmo | terrestre | Altopiani a terrazze | M, nana rossa | 36% | densa | 0,84 | medio | 2 lune | eclissi, tempesta |
| Chiralità e omochiralità | Molecole dal cosmo | craterizzato | Pianura di crateri | M, nana rossa | 2% | assente | 0,83 | lungo | 2 lune | eclissi, pioggia di meteoriti |
| Miller-Urey e la sintesi prebiotica | Chimica prebiotica | glaciale | Criovulcani | A, stella bianco-azzurra | 22% | media | 0,94 | medio | 1 luna | aurora, eclissi, eruzione di geyser |
| Energia, enzimi e catalisi | Chimica prebiotica | desertico | Mare di dune | A, stella bianco-azzurra | 6% | media | 0,88 | lungo | 2 lune | eclissi |
| Sorgenti idrotermali e metabolismo primordiale | Chimica prebiotica | terrestre | Pianura alluvionale | A, stella bianco-azzurra | 36% | densa | 0,89 | medio | 2 lune | aurora, eclissi, tempesta |
| Il mondo a RNA | Informazione e replicatori | desertico | Mare di dune | G, nana gialla | 12% | sottile | 1,22 | medio | 2 lune | aurora, eclissi |
| DNA, codice genetico ed espressione | Informazione e replicatori | glaciale | Criovulcani | G, nana gialla | 26% | media | 0,98 | lungo | 0 lune | aurora, eruzione di geyser |
| Mutazioni e soglia d'errore | Informazione e replicatori | craterizzato | Pianura di crateri | G, nana gialla | 3% | assente | 1,02 | lungo | 0 lune | pioggia di meteoriti |
| Ereditarietà e selezione naturale | Evoluzione e albero della vita | glaciale | Criovulcani | K, nana arancione | 36% | media | 1,28 | medio | 0 lune | eruzione di geyser |
| Deriva genetica | Evoluzione e albero della vita | desertico | Mare di dune | K, nana arancione | 4% | sottile | 1,19 | breve | 0 lune | nessuno |
| L'albero universale e LUCA | Evoluzione e albero della vita | oceanico | Fiordi | K, nana arancione | 53% | media | 1,03 | lungo | 1 luna | aurora, eclissi |
| Le prime tracce della vita e il tempo geologico | Evoluzione e albero della vita | vulcanico | Caldera con lago | K, nana arancione | 20% | media | 1,14 | breve | 0 lune | eruzione di geyser |
| Ossigeno, endosimbiosi e cellule complesse | Evoluzione e albero della vita | craterizzato | Dorsali e scarpate | K, nana arancione | 3% | assente | 1,06 | medio | 2 lune | eclissi, pioggia di meteoriti |
| Estremofili | Vita ai limiti | glaciale | Valli glaciali | F, stella bianco-gialla | 21% | sottile | 1,02 | medio | 1 luna | aurora, eclissi, eruzione di geyser |
| Respirazione, fermentazione e chemiosintesi | Vita ai limiti | desertico | Mese e altipiani | F, stella bianco-gialla | 0% | media | 1,08 | lungo | 2 lune | aurora, eclissi |
| Fotosintesi e luce di altre stelle | Vita ai limiti | vulcanico | Campo vulcanico | F, stella bianco-gialla | 8% | media | 0,81 | breve | 0 lune | eruzione di geyser |
| Crescita delle popolazioni microbiche | Vita ai limiti | craterizzato | Dorsali e scarpate | F, stella bianco-gialla | 1% | assente | 1,06 | lungo | 0 lune | pioggia di meteoriti |
| La zona abitabile | Pianeti abitabili | desertico | Canyon | A, stella bianco-azzurra | 1% | sottile | 0,83 | lungo | 2 lune | eclissi |
| Atmosfere, effetto serra e clima | Pianeti abitabili | glaciale | Banchisa | A, stella bianco-azzurra | 50% | sottile | 1,17 | lungo | 0 lune | eruzione di geyser |
| Abitabilità attorno alle nane rosse | Pianeti abitabili | craterizzato | Dorsali e scarpate | A, stella bianco-azzurra | 3% | assente | 0,96 | breve | 2 lune | eclissi, pioggia di meteoriti |
| Biosfera, albedo e Daisyworld | Pianeti abitabili | terrestre | Colline e fiumi | A, stella bianco-azzurra | 31% | densa | 0,73 | breve | 0 lune | tempesta |
| Marte: acqua e abitabilità passata | Mondi del sistema solare | desertico | Mese e altipiani | G, nana gialla | 15% | sottile | 1,17 | medio | 0 lune | pioggia di meteoriti |
| Cercare la vita su Marte | Mondi del sistema solare | craterizzato | Pianura di crateri | G, nana gialla | 0% | sottile | 1,23 | medio | 0 lune | pioggia di meteoriti |
| Europa e gli oceani sotto il ghiaccio | Mondi del sistema solare | glaciale | Banchisa | G, nana gialla | 39% | media | 1,12 | breve | 0 lune | eruzione di geyser |
| Encelado e i suoi pennacchi | Mondi del sistema solare | oceanico | Fiordi | G, nana gialla | 64% | densa | 0,79 | medio | 1 luna | eclissi, tempesta |
| Titano, la chimica senza acqua | Mondi del sistema solare | terrestre | Colline e fiumi | G, nana gialla | 29% | media | 1,26 | medio | 1 luna | aurora, eclissi |
| Scoprire gli esopianeti | Cercare la vita nella galassia | vulcanico | Campo vulcanico | M, nana rossa | 10% | densa | 1,10 | breve | 1 luna | aurora, eclissi, tempesta, eruzione di geyser |
| Atmosfere degli esopianeti e JWST | Cercare la vita nella galassia | oceanico | Atolli e lagune | M, nana rossa | 62% | media | 1,26 | breve | 1 luna | eclissi |
| Biofirme e falsi positivi | Cercare la vita nella galassia | terrestre | Colline e fiumi | M, nana rossa | 26% | media | 1,09 | lungo | 1 luna | aurora, eclissi |
| Panspermia e protezione planetaria | Cercare la vita nella galassia | desertico | Canyon | M, nana rossa | 1% | sottile | 0,89 | medio | 1 luna | eclissi |
| Tecnofirme, SETI ed equazione di Drake | Cercare la vita nella galassia | craterizzato | Altopiano fratturato | M, nana rossa | 4% | assente | 1,15 | lungo | 2 lune | eclissi, pioggia di meteoriti |
