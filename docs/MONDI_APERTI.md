# La serie «Mondi aperti»

La serie, dalla 1.70.0 alla 1.78.0, apre attorno a ogni sito di atterraggio una zona di circa 4 × 4 km da esplorare liberamente, come nei giochi di esplorazione spaziale in cui si scende in un punto e si percorre la terra attorno. Fino alla 1.69.0 l'esploratore restava entro 100 unità dal centro, in un quadrato di circa 320 m di lato, e oltre il quadrato delle stazioni c'erano soltanto anelli di terreno sempre più radi. La richiesta di partenza chiedeva la massima varietà di terreni, strutture abitate e abbandonate, flora e fauna, con qualcosa di nuovo ogni 300-500 m e nessun pianeta uguale a un altro; `docs/VARIETA_MONDI.md` misura quanto la serie ci arriva.

| Versione | Contenuto | Documentazione | Test |
|---|---|---|---|
| 1.70.0 | Terreno in streaming: sei griglie annidate che seguono la camera fino a 2 km, esploratore libero in tutta la zona | `docs/GRAPHICS.md`, «Terreno in streaming (1.70.0)» | `tests/terreno.test.mjs` |
| 1.71.0 | Biomi della zona: da 5 a 8 biomi per pianeta, fra 46 tipi, con forme, colori e rocce propri | `docs/GRAPHICS.md`, «Biomi della zona (1.71.0)», e `docs/BIOMI.md` | `tests/biomi.test.mjs` |
| 1.72.0 | Flora e fauna dei biomi: 562 specie endemiche, piante e animali in tutta la zona | `docs/GRAPHICS.md`, «Flora e fauna dei biomi (1.72.0)» | `tests/vita-biomi.test.mjs` |
| 1.73.0 | Strutture abitate e abbandonate, relitti e rovine: 2043 siti di 14 tipi, con le loro storie | `docs/GRAPHICS.md`, «Strutture, relitti e rovine (1.73.0)», e `docs/SITI.md` | `tests/siti.test.mjs` |
| 1.74.0 | Luoghi naturali rari, bussola e scanner a distanza: 835 luoghi di 16 tipi | `docs/GRAPHICS.md`, «Luoghi rari, bussola e scanner a distanza (1.74.0)», e `docs/LUOGHI_RARI.md` | `tests/rari.test.mjs` |
| 1.75.0 | Atterraggio libero: la nave dell'esploratore, la piazzola della base, discesa e decollo con la fisica del pianeta, mappa della zona | `docs/GRAPHICS.md`, «Atterraggio libero e nave che scende e decolla (1.75.0)» | `tests/nave.test.mjs` |
| 1.76.0 | Zaino a reazione e viaggio rapido fra i luoghi scoperti | `docs/GRAPHICS.md`, «Zaino a reazione e viaggio rapido fra i luoghi scoperti (1.76.0)» | `tests/zaino.test.mjs` |
| 1.77.0 | Prestazioni sui telefoni, misure di varietà, questa pagina e il collaudo della serie | `docs/VARIETA_MONDI.md`, `docs/PRESTAZIONI_MONDI.md` | `tests/collaudo-mondi.test.mjs` |
| 1.78.0 | Luoghi minori nelle zone vuote: 3770 luoghi di 7 tipi | `docs/GRAPHICS.md`, «Luoghi minori nelle zone vuote (1.78.0)», e `docs/LUOGHI_MINORI.md` | `tests/minori.test.mjs` |

## Che cosa contiene una zona

La zona di un pianeta misura 2500 × 2500 unità, circa 4 × 4 km, attorno alla base con le quattro stazioni. Il terreno è quello della mappa vista dall'orbita, con gli stessi mari e le stesse coste, diviso in un mosaico di 5-8 biomi scelti fra 46 tipi secondo la quota, la pendenza, il mare e la fisica del pianeta. Ogni bioma ha le proprie forme del rilievo, i propri colori e le proprie rocce, e sui pianeti con vita ogni bioma diverso da quello della base ha una specie endemica: sono 562, che si aggiungono alle 1388 specie dei pianeti, per 1950 specie in tutto.

Nella zona stanno da 14 a 19 siti costruiti, 2043 sui 125 pianeti, fra strutture abitate, strutture abbandonate, relitti di navi del sistema e rovine di villaggi antichi, e da 3 a 9 luoghi naturali rari, 835 in tutto: archi di roccia, sorgenti calde, crateri, cristalli giganti, laghi di lava, campi di dune e altri ancora, ciascuno soltanto dove il bioma e la fisica del pianeta lo permettono. Dalla 1.78.0 le parti della zona più lontane da tutto il resto ospitano da 6 a 40 luoghi minori, 3770 in tutto: vene di minerale, ingressi di grotte, meteoriti di ferro, fari di navigazione della colonia, trivelle abbandonate, cippi della prima spedizione e, sui pianeti con animali dotati di ossa, scheletri di grandi animali. Siti, luoghi rari e luoghi minori hanno una storia o una descrizione con i numeri della scheda «Fisica» del pianeta, che lo scanner registra nel diario. Appena fuori dal quadrato delle stazioni c'è la piazzola della base, un disco di terreno spianato con le luci, su tutti i 125 pianeti.

## Esplorare

Ogni volta che si scende dallo spazio la nave dell'esploratore, la Navetta Raman del catalogo 3D lunga 50 m, atterra sulla piazzola con una frenata uniforme e apre la rampa. L'esploratore cammina, corre, salta con la gravità del pianeta, guida il rover e, tenendo premuto il salto, accende lo zaino a reazione, che lo porta da 5,4 a 18,1 m di quota secondo la gravità. La bussola segna i punti cardinali, la base, la nave e i siti, i luoghi rari e i luoghi minori noti; l'impulso dello scanner rileva i siti e i luoghi rari entro 1,3 km e i luoghi minori entro 500 m.

La mappa della zona mostra il rilievo, le zone dove la nave può atterrare e i luoghi scoperti. Toccando un punto la nave cerca entro 300 m un posto dove le sue gambe reggono, e con ATTERRA QUI decolla, vola e scende lì; toccando un luogo scoperto la mappa dà il tempo della strada a piedi, di corsa e in rover, e VIAGGIO RAPIDO porta l'esploratore lì. Accanto alla nave il pulsante della nave fa decollare per l'orbita.

## Mappa dei concetti

I numeri delle schede e delle descrizioni vengono dalla carta d'identità del pianeta. La tabella collega ogni situazione all'unità del catalogo che ne spiega la fisica.

| Dove | Situazione | Unità | Relazione |
|---|---|---|---|
| Scheda della nave | La nave in orbita bassa prima della discesa | physics-13, «Orbite circolari» | Velocità in orbita bassa, pari alla velocità di fuga divisa per √2 |
| Scheda della nave | Ultima fase della discesa, frenata uniforme | physics-04, «Moto uniformemente accelerato» | Decelerazione a = v² / (2h), da 134 m/s in 670 m |
| Scheda della nave | Spinta della frenata e del decollo | physics-06, «Forze e leggi di Newton» | Spinta (a + g)/g volte il peso; con una spinta doppia del peso la forza netta è uguale al peso e l'accelerazione vale g |
| Scheda «Fisica» del salto | Zaino a reazione acceso dal salto | physics-06, «Forze e leggi di Newton» | Accelerazione netta = spinta − g, con una spinta di 14 m/s² per 1,2 s |
| Scheda «Fisica» del salto | Salita dopo la fine della spinta | physics-04, «Moto uniformemente accelerato» | Salita per inerzia v² / (2g) |
| Mappa della zona | Tempo della strada fino a un luogo scoperto | physics-03, «Moto rettilineo uniforme» | t = d / v a piedi (1,4 m/s), di corsa (3,6 m/s) e in rover (10 m/s) |
| Sorgente calda | L'acqua bolle a una temperatura che dipende dalla pressione | physics-19, «Calore e capacità termica» | Relazione di Clausius e Clapeyron con il calore latente dell'acqua |
| Lago di lava | La lava scoperta irradia | physics-19, «Calore e capacità termica» | Legge di Stefan e Boltzmann, σT⁴ a 1400 K |
| Cratere giovane | Un corpo colpisce il pianeta | physics-08, «Lavoro ed energia» | Energia per chilogrammo alla velocità di fuga, confrontata con il tritolo |
| Monolite di granito | La roccia regge la colonna sopra di sé | physics-14, «Fluidi e pressione» | Pressione alla base ρgh |
| Vena di minerale | Un metro cubo di minerale ha la stessa massa su ogni pianeta | physics-06, «Forze e leggi di Newton» | Peso ρ · g · V, confrontato con quello sulla Terra |
| Cippo della prima spedizione | L'equipaggio misura la gravità con un pendolo | physics-16, «Oscillazioni armoniche» | T = 2π√(L/g), e g = 4π²L/T² |
| Meteorite ferroso | Un corpo arriva almeno alla velocità di fuga | physics-08, «Lavoro ed energia» | Energia cinetica ½ m v², in tonnellate di tritolo |
| Trivella abbandonata | La luce della stella cala con la distanza | physics-30, «Radiazione termica e luce delle stelle» | 1361 W/m² per il flusso relativo del pianeta, potenza di un pannello di 2 m² |
| Ingresso di grotta | La roccia smorza le escursioni fra il giorno e la notte | physics-19, «Calore e capacità termica» | Temperatura della grotta vicina alla media della superficie |
| Faro di navigazione | La luce si vede fino all'orizzonte | math-c11, «Geometria elementare» | Teorema di Pitagora: distanza dell'orizzonte √(2Rh) |
| Scheletro di un grande animale | Le ossa reggono il peso del corpo | math-p11, «Scala, energia, equilibrio e trasformazioni» | Il peso cresce come il cubo della lunghezza, la sezione delle ossa come il quadrato |

## Varietà

`docs/VARIETA_MONDI.md`, generato da `node scripts/varieta.mjs`, copre ogni zona con punti a 50 m l'uno dall'altro e misura da ogni punto di terraferma la distanza dalla novità più vicina. Senza i luoghi minori un luogo da vedere (base, insediamento, luogo della carta, sito o luogo raro) era in mediana a 295 m, e l'81% dei punti ne aveva uno entro 500 m. Dalla 1.78.0, con i luoghi minori, il luogo da vedere più vicino è in mediana a 194 m e il 99,6% dei punti ne ha uno entro 500 m. Contando anche il passaggio a un altro bioma, il 99,6% dei punti ha una novità entro 300 m. Le descrizioni delle 125 zone, fatte di famiglia, stile del terreno, colonia, biomi, tipi di sito e tipi di luogo raro, sono tutte diverse; la coppia più simile ne condivide il 97%, e differisce comunque nel rilievo, nei colori, nelle specie e nella posizione di ogni sito.

## Prestazioni sui telefoni

Dalla 1.77.0 una superficie si apre prima: ogni griglia del terreno calcola soltanto i punti che i suoi triangoli usano, e le tre griglie esterne, oltre 256 unità dal centro della vista, si costruiscono nei fotogrammi seguenti, 10 ms per fotogramma, dall'interno verso l'esterno. Le maglie dei modelli di una superficie, che dalla 1.78.0 comprendono la scelta dei luoghi minori, richiedono in mediana 379 ms invece dei 570 ms misurati prima della modifica, e il terreno lontano arriva in mediana in 26 fotogrammi. Su un telefono, finché non si sceglie una grafica nelle impostazioni, il sito parte con la grafica bilanciata, e su ogni dispositivo scende di un livello quando per 3 s i fotogrammi restano sopra i 34 ms, cioè sotto circa 30 al secondo; un messaggio lo dice. Le misure dei 125 pianeti sono in `docs/PRESTAZIONI_MONDI.md`.

## Collaudo della serie

I file di test della serie sono otto, con 41 test, più le prove del terreno in streaming in `tests/terreno.test.mjs`. `tests/collaudo-mondi.test.mjs` controlla le griglie del terreno costruite nei fotogrammi seguenti, uguali a quelle costruite subito, la grafica che si adatta al dispositivo, `docs/VARIETA_MONDI.md` e questa pagina.

## Limiti

- I tempi sono misurati con Node e con un contatore al posto della scheda grafica; le immagini in Chromium usano SwiftShader, un renderer software. Nessuna prova su GPU fisiche, Safari o telefoni reali.
- In una zona, quella di «Membrane e protocellule» (pianeta 78), il 90° percentile della distanza dal luogo da vedere più vicino supera ancora gli 800 m: le parti lontane da tutto sono bassure e secche al livello del mare, dove nessun luogo minore trova un posto asciutto, e lì la novità è il cambio di bioma. Senza i luoghi minori le zone così erano dieci.
- La discesa, il volo della nave e lo zaino seguono la fisica con il tempo compresso per lo schermo; l'atmosfera frena la nave soltanto nel racconto della scheda.
- Siti, luoghi rari, luoghi minori, specie ed edifici sono modelli procedurali illustrativi ricavati dalle carte d'identità; nessuno ricostruisce un luogo o un organismo reale.
