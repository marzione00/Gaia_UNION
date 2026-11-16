# Carte d’identità dei pianeti

Ogni pianeta esplorabile ha una carta d’identità generata da `src/worlds/genome.js` a partire da ciò che il pianeta ha già: famiglia, dimensione, lune, anelli, rotazione, inclinazione e area tematica, più un tipo di stella per ogni sistema. Dalla carta dipendono terreno, mare, cielo, luce, colori di piante e rocce, gravità ed eventi rari. I valori sono illustrativi: non sono dati astronomici.

## Come si garantisce la diversità

- Ogni famiglia di pianeti ha tre stili di terreno; i quattro pianeti di un’area hanno famiglie diverse e quindi terreni diversi (controllato dai test).
- Una distanza fra due carte, da 0 (identiche) a circa 1, pesa stile di terreno, famiglia, stella, livello del mare, rilievo, ruvidità, colore delle piante, atmosfera e gravità.
- Il generatore crea i pianeti in ordine e rigenera i parametri liberi di ciascuno (fino a 160 tentativi) finché è ad almeno 0,2 da tutti i precedenti, oppure tiene il tentativo più lontano. Sui 100 pianeti la distanza minima fra due pianeti qualsiasi è 0,175; i test richiedono almeno 0,17.

- I tipi di stella sono cinque (nana rossa M, nana arancione K, nana gialla G, bianco-gialla F, bianco-azzurra A), cinque sistemi per tipo. Il colore della luce è approssimato; il pigmento delle piante cambia con la stella per contrasto, ispirato alle ipotesi di astrobiologia sulle piante sotto stelle diverse.

L’immagine con le 100 vedute dall’alto si rigenera con `node tools/render_genomes.mjs cartella` e `python3 tools/genome_sheet.py cartella foglio.png`. Le colonne «Giorno» dividono le durate in terzi (breve, medio, lungo); «Gravità» è relativa a un pianeta di raggio medio.

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
| Geometria elementare | Geometria e trasformazioni | craterizzato | Altopiano fratturato | G, nana gialla | 5% | sottile | 1,24 | breve | 0 lune | pioggia di meteore |
| Dagli zeri alla struttura di un polinomio | Algebra ed equazioni | terrestre | Pianura alluvionale | F, stella bianco-gialla | 45% | media | 1,25 | lungo | 1 luna | aurora, eclissi |
| Esistenza, unicità e approssimazione | Numeri e ragionamento | desertico | Mare di dune | K, nana arancione | 17% | sottile | 0,88 | breve | 2 lune | eclissi |
| Ragionamento, conteggio e infinito | Numeri e ragionamento | oceanico | Fiordi | K, nana arancione | 65% | densa | 1,30 | breve | 2 lune | aurora, eclissi, tempesta |
| Vettori, matrici, dati e vincoli | Geometria e trasformazioni | glaciale | Criovulcani | G, nana gialla | 46% | sottile | 1,05 | breve | 0 lune | aurora, eruzione di geyser |
| Complessi, aritmetica e polinomi | Algebra ed equazioni | craterizzato | Pianura di crateri | F, stella bianco-gialla | 4% | assente | 1,27 | medio | 1 luna | eclissi, pioggia di meteore |
| Limiti, variazione e accumulazione | Funzioni e variazione | vulcanico | Colate laviche | K, nana arancione | 11% | media | 0,79 | breve | 1 luna | aurora, eclissi, eruzione di geyser |
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
| Misure, unità e incertezza | Misura e moto | craterizzato | Altopiano fratturato | M, nana rossa | 2% | sottile | 0,84 | medio | 1 luna | eclissi, pioggia di meteore |
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
| Orbite circolari | Rotazioni e gravità | craterizzato | Altopiano fratturato | F, stella bianco-gialla | 3% | sottile | 1,01 | lungo | 2 lune | eclissi, pioggia di meteore |
| Fluidi e pressione | Fluidi, oscillazioni e onde | terrestre | Pianura alluvionale | G, nana gialla | 42% | media | 0,89 | breve | 0 lune | nessuno |
| Galleggiamento e Archimede | Fluidi, oscillazioni e onde | vulcanico | Campo vulcanico | G, nana gialla | 12% | media | 1,19 | lungo | 0 lune | eruzione di geyser |
| Oscillazioni armoniche | Fluidi, oscillazioni e onde | oceanico | Atolli e lagune | G, nana gialla | 64% | media | 0,78 | medio | 2 lune | eclissi |
| Onde e sovrapposizione | Fluidi, oscillazioni e onde | glaciale | Banchisa | G, nana gialla | 30% | media | 1,27 | lungo | 1 luna | aurora, eclissi, eruzione di geyser |
| Gas ideali | Calore e termodinamica | glaciale | Banchisa | M, nana rossa | 30% | sottile | 0,72 | medio | 0 lune | aurora, eruzione di geyser |
| Calore e capacità termica | Calore e termodinamica | vulcanico | Caldera con lago | M, nana rossa | 10% | densa | 0,88 | medio | 2 lune | aurora, eclissi, tempesta, eruzione di geyser |
| Termodinamica e rendimento | Calore e termodinamica | desertico | Mare di dune | M, nana rossa | 5% | sottile | 1,22 | medio | 1 luna | aurora, eclissi |
| Cariche e campo elettrico | Elettromagnetismo e quanti | oceanico | Fiordi | F, stella bianco-gialla | 53% | media | 1,02 | breve | 0 lune | aurora |
| Potenziale ed energia elettrica | Elettromagnetismo e quanti | vulcanico | Colate laviche | F, stella bianco-gialla | 15% | densa | 1,12 | medio | 2 lune | aurora, eclissi, tempesta, eruzione di geyser |
| Circuiti e legge di Ohm | Elettromagnetismo e quanti | desertico | Mare di dune | F, stella bianco-gialla | 8% | sottile | 0,92 | medio | 2 lune | aurora, eclissi |
| Induzione elettromagnetica | Elettromagnetismo e quanti | terrestre | Colline e fiumi | F, stella bianco-gialla | 37% | media | 1,00 | breve | 0 lune | aurora, tempesta |
| Fotoni ed energia quantizzata | Elettromagnetismo e quanti | glaciale | Criovulcani | F, stella bianco-gialla | 24% | media | 0,91 | lungo | 2 lune | eclissi, eruzione di geyser |

## Chimica

| Unità | Area | Famiglia | Terreno | Stella | Mare | Atmosfera | Gravità | Giorno | Lune, anelli | Eventi |
|---|---|---|---|---|---|---|---|---|---|---|
| Materia, proprietà e densità | Materia e atomi | oceanico | Atolli e lagune | G, nana gialla | 57% | media | 1,03 | lungo | 2 lune | eclissi |
| Atomi, isotopi e massa media | Materia e atomi | desertico | Canyon | G, nana gialla | 5% | sottile | 1,14 | medio | 1 luna | eclissi, pioggia di meteore |
| Mole e quantità di sostanza | Materia e atomi | craterizzato | Dorsali e scarpate | G, nana gialla | 2% | assente | 1,17 | lungo | 1 luna | eclissi, pioggia di meteore |
| Livelli atomici e spettri | Materia e atomi | terrestre | Altopiani a terrazze | G, nana gialla | 41% | densa | 1,12 | lungo | 0 lune | tempesta |
| Periodicità e carica efficace | Materia e atomi | glaciale | Valli glaciali | G, nana gialla | 25% | media | 1,16 | lungo | 1 luna | aurora, eclissi, eruzione di geyser |
| Legame ionico e interazioni elettrostatiche | Legami e molecole | desertico | Canyon | M, nana rossa | 17% | sottile | 1,06 | lungo | 2 lune | aurora, eclissi |
| Legame covalente ed energia di legame | Legami e molecole | craterizzato | Dorsali e scarpate | M, nana rossa | 2% | sottile | 1,25 | lungo | 0 lune | pioggia di meteore |
| Geometria molecolare e VSEPR | Legami e molecole | vulcanico | Campo vulcanico | M, nana rossa | 22% | media | 1,24 | breve | 0 lune | tempesta, eruzione di geyser |
| Forze intermolecolari | Legami e molecole | oceanico | Fiordi | M, nana rossa | 66% | densa | 1,11 | breve | 1 luna | aurora, eclissi, tempesta |
| Gas e stato aeriforme | Stati e soluzioni | oceanico | Fiordi | A, stella bianco-azzurra | 65% | densa | 0,92 | breve | 1 luna | eclissi, tempesta |
| Stati della materia e transizioni | Stati e soluzioni | glaciale | Valli glaciali | A, stella bianco-azzurra | 43% | sottile | 0,74 | medio | 0 lune | aurora, eruzione di geyser |
| Soluzioni e concentrazione | Stati e soluzioni | craterizzato | Pianura di crateri | A, stella bianco-azzurra | 0% | assente | 1,21 | lungo | 0 lune | pioggia di meteore |
| Solubilità ed equilibrio eterogeneo | Stati e soluzioni | desertico | Mese e altipiani | A, stella bianco-azzurra | 0% | media | 1,19 | breve | 2 lune | aurora, eclissi |
| Stechiometria e reagente limitante | Reazioni e quantità | oceanico | Arcipelago | K, nana arancione | 57% | densa | 0,84 | lungo | 2 lune | eclissi, tempesta |
| Resa e bilanci di materia | Reazioni e quantità | desertico | Canyon | K, nana arancione | 8% | sottile | 1,25 | lungo | 2 lune | eclissi, pioggia di meteore |
| Termochimica e calorimetria | Reazioni e quantità | terrestre | Pianura alluvionale | K, nana arancione | 40% | densa | 1,07 | lungo | 0 lune | aurora, tempesta |
| Velocità di reazione | Velocità ed equilibrio | craterizzato | Dorsali e scarpate | A, stella bianco-azzurra | 3% | assente | 1,28 | lungo | 2 lune | eclissi, pioggia di meteore |
| Temperatura e attivazione | Velocità ed equilibrio | desertico | Canyon | A, stella bianco-azzurra | 17% | media | 1,28 | breve | 1 luna | aurora, eclissi |
| Equilibrio chimico | Velocità ed equilibrio | oceanico | Arcipelago | A, stella bianco-azzurra | 68% | media | 0,90 | breve | 0 lune | nessuno |
| Perturbazioni dell’equilibrio | Velocità ed equilibrio | vulcanico | Campo vulcanico | A, stella bianco-azzurra | 14% | densa | 1,11 | breve | 1 luna | aurora, eclissi, tempesta, eruzione di geyser |
| Acidi, basi e pH | Acidi, redox e carbonio | vulcanico | Colate laviche | A, stella bianco-azzurra | 16% | media | 0,87 | breve | 0 lune | aurora, eruzione di geyser |
| Soluzioni tampone | Acidi, redox e carbonio | craterizzato | Altopiano fratturato | A, stella bianco-azzurra | 1% | assente | 1,18 | lungo | 1 luna | eclissi, pioggia di meteore |
| Ossidazione, riduzione ed elettrochimica | Acidi, redox e carbonio | terrestre | Colline e fiumi | A, stella bianco-azzurra | 45% | media | 1,30 | lungo | 0 lune | aurora |
| Chimica organica e scheletri carboniosi | Acidi, redox e carbonio | glaciale | Banchisa | A, stella bianco-azzurra | 28% | sottile | 0,93 | medio | 2 lune | eclissi, eruzione di geyser |
| Polimeri e materiali | Acidi, redox e carbonio | oceanico | Atolli e lagune | A, stella bianco-azzurra | 61% | densa | 1,05 | medio | 1 luna | aurora, eclissi, tempesta |

## Biologia

| Unità | Area | Famiglia | Terreno | Stella | Mare | Atmosfera | Gravità | Giorno | Lune, anelli | Eventi |
|---|---|---|---|---|---|---|---|---|---|---|
| Cellule, scala e superficie | La cellula | glaciale | Banchisa | K, nana arancione | 31% | media | 0,78 | breve | 1 luna | eclissi, eruzione di geyser |
| Membrane e diffusione | La cellula | desertico | Mese e altipiani | K, nana arancione | 18% | media | 1,16 | medio | 1 luna | aurora, eclissi |
| Osmosi e bilancio dell’acqua | La cellula | vulcanico | Campo vulcanico | K, nana arancione | 16% | media | 0,74 | breve | 0 lune | aurora, eruzione di geyser |
| Enzimi e saturazione | Energia della vita | glaciale | Banchisa | M, nana rossa | 46% | media | 1,22 | breve | 1 luna | aurora, eclissi, eruzione di geyser |
| Metabolismo e bilanci energetici | Energia della vita | terrestre | Altopiani a terrazze | M, nana rossa | 36% | densa | 0,84 | medio | 2 lune | eclissi, tempesta |
| Fotosintesi e luce | Energia della vita | craterizzato | Pianura di crateri | M, nana rossa | 2% | assente | 0,83 | lungo | 2 lune | eclissi, pioggia di meteore |
| Ciclo cellulare e proliferazione | Divisione ed ereditarietà | glaciale | Criovulcani | A, stella bianco-azzurra | 22% | media | 0,94 | medio | 1 luna | aurora, eclissi, eruzione di geyser |
| Meiosi e assortimento | Divisione ed ereditarietà | desertico | Mare di dune | A, stella bianco-azzurra | 6% | media | 0,88 | lungo | 2 lune | eclissi |
| Ereditarietà mendeliana | Divisione ed ereditarietà | terrestre | Pianura alluvionale | A, stella bianco-azzurra | 36% | densa | 0,89 | medio | 2 lune | aurora, eclissi, tempesta |
| DNA e replicazione | Geni e mutazioni | desertico | Mare di dune | G, nana gialla | 12% | sottile | 1,22 | medio | 2 lune | aurora, eclissi |
| Espressione genica | Geni e mutazioni | glaciale | Criovulcani | G, nana gialla | 26% | media | 0,98 | lungo | 0 lune | aurora, eruzione di geyser |
| Mutazioni e probabilità | Geni e mutazioni | craterizzato | Pianura di crateri | G, nana gialla | 3% | assente | 1,02 | lungo | 0 lune | pioggia di meteore |
| Selezione naturale | Evoluzione | glaciale | Criovulcani | K, nana arancione | 36% | media | 1,28 | medio | 0 lune | eruzione di geyser |
| Deriva genetica | Evoluzione | desertico | Mare di dune | K, nana arancione | 4% | sottile | 1,19 | breve | 0 lune | nessuno |
| Equilibrio di Hardy-Weinberg | Evoluzione | oceanico | Fiordi | K, nana arancione | 53% | media | 1,03 | medio | 1 luna | aurora, eclissi |
| Speciazione e barriere riproduttive | Evoluzione | vulcanico | Caldera con lago | K, nana arancione | 20% | media | 1,14 | breve | 0 lune | eruzione di geyser |
| Filogenesi e cambiamenti molecolari | Evoluzione | craterizzato | Dorsali e scarpate | K, nana arancione | 3% | assente | 1,06 | medio | 2 lune | eclissi, pioggia di meteore |
| Biodiversità e misura delle comunità | Popolazioni e comunità | glaciale | Valli glaciali | F, stella bianco-gialla | 21% | sottile | 1,02 | medio | 1 luna | aurora, eclissi, eruzione di geyser |
| Crescita delle popolazioni | Popolazioni e comunità | desertico | Mese e altipiani | F, stella bianco-gialla | 0% | media | 1,08 | lungo | 2 lune | aurora, eclissi |
| Competizione ecologica | Popolazioni e comunità | vulcanico | Campo vulcanico | F, stella bianco-gialla | 8% | media | 0,81 | breve | 0 lune | eruzione di geyser |
| Predazione e risposta funzionale | Popolazioni e comunità | craterizzato | Dorsali e scarpate | F, stella bianco-gialla | 1% | assente | 1,06 | lungo | 0 lune | pioggia di meteore |
| Reti trofiche ed energia | Ecosistemi e regolazione | desertico | Canyon | A, stella bianco-azzurra | 1% | sottile | 0,83 | lungo | 2 lune | eclissi |
| Cicli biogeochimici e serbatoi | Ecosistemi e regolazione | glaciale | Banchisa | A, stella bianco-azzurra | 50% | sottile | 1,17 | lungo | 0 lune | eruzione di geyser |
| Omeostasi e retroazioni | Ecosistemi e regolazione | craterizzato | Dorsali e scarpate | A, stella bianco-azzurra | 3% | assente | 0,96 | breve | 2 lune | eclissi, pioggia di meteore |
| Biosfera, albedo e sistemi accoppiati | Ecosistemi e regolazione | terrestre | Colline e fiumi | A, stella bianco-azzurra | 31% | densa | 0,73 | breve | 0 lune | tempesta |
