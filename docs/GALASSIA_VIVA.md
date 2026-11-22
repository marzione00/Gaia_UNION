# La serie «Galassia viva»

La serie, dalla 1.57.0 alla 1.61.0, rende più popolati i sistemi della galassia e permette di avvicinarsi a ogni oggetto per leggerne i numeri. Nasce da quattro osservazioni sull'aspetto dei sistemi: navi e stazioni troppo rade, pianeti privi di un'atmosfera visibile, assenza di comete, sciami e cinture, e nessun modo di ingrandire un oggetto per capire che cosa gli accade. Ogni versione ha affrontato una di queste richieste; l'ultima raccoglie la documentazione, il collaudo complessivo e la misura delle prestazioni.

| Versione | Contenuto | Documentazione |
|---|---|---|
| 1.57.0 | Traffico di servizio: navette, chiatte, rimorchiatori con i container, minatori, cisterne, caccia di scorta e moduli di manutenzione, ciascuno con un compito leggibile | `docs/STAZIONI_NAVI.md`, «Traffico di servizio» |
| 1.58.0 | Camera che segue un oggetto e pannello «Che cosa succede» con i numeri del momento e un concetto di un'unità di studio | `docs/STAZIONI_NAVI.md`, «Che cosa succede» |
| 1.59.0 | Atmosfere visibili: guscio diffuso, colore del cielo e crepuscolo dei pianeti con aria | `docs/GRAPHICS.md`, «Atmosfere visibili (1.59.0)» |
| 1.60.0 | Comete sulle loro ellissi, scie di meteoroidi, sciami sui pianeti che le attraversano, cinture di roccia e di ghiaccio | `docs/STAZIONI_NAVI.md` e `docs/GRAPHICS.md`, «Comete, sciami e cinture» |
| 1.61.0 | Questo documento, il collaudo della serie e le prestazioni misurate | `docs/PRESTAZIONI.md` |

## Che cosa contiene un sistema

Ognuno dei 30 sistemi ha una cintura di ghiaccio oltre l'ultimo pianeta, e 16 hanno anche una cintura di roccia vicino alla linea del ghiaccio, dove lo spazio fra due pianeti lo consente. Le comete sono 40: 10 sistemi ne hanno due, e 12 comete girano in senso opposto ai pianeti. Le loro scie incrociano l'orbita di 24 pianeti, con 26 sciami in tutto; 13 di questi pianeti sono pianeti di studio e 9 hanno aria abbastanza densa da mostrare stelle cadenti sulla superficie. I meteoroidi colpiscono l'atmosfera a velocità comprese fra 6,3 e 98,8 km/s.

Dei 125 pianeti di studio, tutti hanno la pagina dell'atmosfera nel pannello; 103 hanno aria abbastanza densa da avere anche la pagina del cielo, mentre gli altri 22 conservano soltanto un'esosfera. Il traffico di servizio conta da 110 a 171 mezzi con il dettaglio alto, che diventano da 74 a 114 con la grafica bilanciata e da 44 a 66 con quella leggera.

## Seguire un oggetto

Nella vista di un sistema la stella, le comete, le cinture, le stazioni, le navi, i mezzi di servizio e i pianeti di contorno mostrano, al passaggio del puntatore, una scheda con la scritta «CLIC PER SEGUIRLO DA VICINO» (o «SEGUIRLA»). Il clic porta la camera vicino all'oggetto e la tiene su di lui mentre si muove. Il clic su un pianeta di studio apre invece la scheda della sua unità, dove il pulsante «SEGUI» fa seguire il pianeta. La distanza iniziale si misura in raggi dell'oggetto: 3,6 per la stella, 5 per un pianeta, 6 per una stazione, 7 per una cometa, 8 per una nave, 9 per un mezzo di servizio e 3,2 semilarghezze per una cintura. La rotellina, i pulsanti + e − e gli stessi tasti la cambiano fra 2,2 e 40 raggi. Il pulsante «CHIUDI» del pannello, il tasto Esc e il pulsante «CENTRA» riportano alla vista del sistema.

Il pannello «Che cosa succede» sta a destra dell'oggetto sugli schermi larghi e sotto di esso sui telefoni. Riporta i numeri del momento, aggiornati a ogni fotogramma, e sotto di essi il concetto, scritto con quei numeri, con il titolo dell'unità da cui viene. Pianeti e comete hanno più pagine, scelte con le schede sotto il titolo; sui telefoni e nelle finestre basse numeri e concetto si alternano con il pulsante «CONCETTO» o «NUMERI». In fondo al pannello «APRI L’UNITÀ», o «LEGGI IL CAPITOLO» quando l'unità ha un capitolo nel libro, porta all'unità del concetto; accanto compaiono, secondo l'oggetto, «ESERCIZI» sulla ricetta di una stazione, «CATALOGO» per il modello 3D di una nave o di una stazione e «PIANETA 3D» per il pianeta di un'unità.

## Mappa dei concetti

Ogni situazione porta al concetto di una delle unità del catalogo. La tabella elenca, per ogni oggetto e situazione, l'unità e la relazione che il pannello calcola con i numeri del momento.

| Oggetto | Situazione o pagina | Unità | Relazione |
|---|---|---|---|
| Nave | in viaggio | physics-03 Moto rettilineo uniforme | velocità media v = L/T sul percorso |
| Nave | attraccata con un carico | chemistry-15 Resa e bilanci di materia | la merce cambia posto e la somma resta la stessa |
| Nave | in sosta | physics-02 Vettori e sistemi di riferimento | ferma rispetto alla stazione, in moto rispetto alla stella |
| Stazione | porta del sistema | chemistry-15 Resa e bilanci di materia | importazioni ed esportazioni in equilibrio |
| Stazione | con una ricetta | chemistry-14 Stechiometria e reagente limitante | consumi e prodotti al secondo, reagente che manca |
| Stazione | che produce senza consumare | chemistry-17 Velocità di reazione | quantità prodotta nell'unità di tempo |
| Stazione | senza produzione | physics-02 Vettori e sistemi di riferimento | moto attorno all'ospite e attorno alla stella |
| Navetta | spola fra due stazioni | physics-03 Moto rettilineo uniforme | v = d/T |
| Rimorchiatore | traino di un container | physics-04 Moto uniformemente accelerato | partenza da fermo, picco di velocità a metà viaggio |
| Chiatta, minatore di una miniera, modulo di manutenzione | giro attorno a una stazione | physics-13 Orbite circolari | v = 2πR/T = ωR |
| Minatore | nella cintura | physics-13 Orbite circolari | terza legge di Keplero, T² = a³/M |
| Cisterna | rifornimento | chemistry-15 Resa e bilanci di materia | la massa che lascia la cisterna entra nella nave |
| Caccia di scorta | accanto al convoglio | physics-02 Vettori e sistemi di riferimento | velocità rispetto alla stella e rispetto al convoglio |
| Pianeta | orbita | physics-13 Orbite circolari | v = √(GM/a) |
| Pianeta | atmosfera | biology-23 Atmosfere, effetto serra e clima | temperatura di equilibrio e riscaldamento per effetto serra |
| Pianeta | cielo | physics-26 Onde elettromagnetiche e pressione della luce | diffusione proporzionale a 1/λ⁴ |
| Pianeta | meteore | physics-08 Lavoro ed energia | energia cinetica ½mv² di un meteoroide |
| Cometa | orbita | physics-12 Gravitazione | seconda legge di Keplero, v = √(GM(2/r − 1/a)) |
| Cometa | coda | chemistry-11 Stati della materia e transizioni | sublimazione del ghiaccio vicino alla stella |
| Cintura | tutta la cintura | physics-13 Orbite circolari | terza legge di Keplero fra il bordo interno e quello esterno |
| Stella | tutta la stella | physics-30 Radiazione termica e luce delle stelle | λ = b/T e L = R²(T/5772)⁴ |

## Suggerimenti per la classe

I numeri seguenti vengono dal sistema 13, «Legami e molecole», e sono quelli che il pannello mostra.

La stella è una nana rossa di tipo M3V a 3430 K. Il pannello calcola il picco di emissione con la legge di Wien, 2,898·10⁶ nm·K / 3430 K = 845 nm, nel vicino infrarosso, e la luminosità con L = R²(T/5772)⁴ = 0,361² × (3430/5772)⁴ = 0,0163 volte il Sole. Si può chiedere alla classe perché una stella con il picco fuori dal visibile appaia rossa, e confrontare il risultato con il valore di 0,0162 della tabella delle nane.

La cometa Westphal ha il perielio a 0,179 UA e l'afelio a 4,93 UA. Il pannello riporta 59,6 km/s al perielio e 2,16 km/s all'afelio. Agli estremi dell'orbita la velocità è perpendicolare al raggio, e il prodotto r · v vale circa 10,6 UA·km/s in entrambi i punti: è la seconda legge di Keplero letta come conservazione del momento angolare. Il periodo di 6,7 anni si ricava da T² = a³/M con a = (q + Q)/2 = 2,56 UA e M = 0,37 masse solari.

La cintura ghiacciata va da 54,5 a 103,0 UA. Al bordo interno un giro dura 661,3 anni, al bordo esterno 1717,6 anni, e il rapporto 2,60 coincide con (103,0/54,5)^1,5. Lo stesso calcolo vale per la cintura di roccia, da 0,30 a 0,37 UA, dove però l'arrotondamento delle distanze a due decimali rende il confronto meno preciso: è un buon esempio di come la precisione dei dati limiti quella della verifica.

Sulla pagina «METEORE» di un pianeta che attraversa una scia, l'energia di un meteoroide di un grammo a 40 km/s è ½ · 0,001 kg · (40 000 m/s)² = 800 kJ, pari a 191 g di tritolo. Seguire il pianeta durante lo sciame e poi scendere sulla superficie mostra come quell'energia diventi la luce di una stella cadente.

## Prestazioni

`docs/PRESTAZIONI.md` riporta il costo misurato della serie: chiamate di disegno, triangoli e istanze di un fotogramma per ognuno dei 30 sistemi alle tre impostazioni della grafica, il tempo che il processore impiega a preparare la scena, il costo dell'oggetto seguito con il suo pannello e quello di cinture, comete e sciami. Il documento si rigenera con `node scripts/prestazioni.mjs`.

La misura ha individuato un'attesa evitabile: il calcolo degli sciami di un sistema, eseguito la prima volta che si segue un suo pianeta o si scende su un pianeta con aria, richiedeva fra 30 e 110 ms secondo il sistema. Dalla 1.61.0 i punti delle orbite si calcolano una volta e si confrontano per distanza al quadrato: il calcolo per i 30 sistemi passa da circa 1,7 s a meno di 0,1 s e trova gli stessi incroci, con le stesse velocità.

## Controlli

`tests/servizio.test.mjs`, `tests/succede.test.mjs`, `tests/atmosfere.test.mjs` e `tests/comete.test.mjs` controllano le singole versioni. `tests/galassia.test.mjs` controlla la serie nel suo insieme: i limiti strutturali di un fotogramma in più sistemi e alle tre impostazioni, con e senza oggetto seguito; il numero di cinture tenute in memoria; l'uguaglianza fra il calcolo veloce degli sciami e quello completo; la corrispondenza fra questo documento, `docs/PRESTAZIONI.md` e il codice, compresi i numeri citati qui sopra.
