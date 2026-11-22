# Motore grafico 1.3.0

## Pipeline

`world.js` conserva le unità planetarie, 125 dalla 1.26.0, organizzate in 30 sistemi da 5–12 pianeti, di cui da tre a sei esplorabili, e la rete di 16 nodi / 18 archi. `assets.js` associa i pianeti ai tre biomi e carica buffer locali, verificandone le dimensioni. Le superfici vengono caricate una mesh per volta per limitare la memoria temporanea.

Le mesh native usano Float32 a 16 componenti (posizione, normale, UV, colore lineare, metallo, rugosità, emissione, tipo) e indici Uint32. Le tre superfici contengono complessivamente 672.891 vertici / 796.060 triangoli e occupano 52.617.744 byte di buffer. Fino alla 1.17.0 restavano tutte in GPU per un cambio immediato di biome. Dalla 1.18.0 le superfici sono generate e dalla 1.20.1 il sito non scarica più queste geometrie: ne usa solo i metadati (`sceneMetadata`). I contatori vegetali provengono dall'export. Le 875 celle sono campioni logici del terreno, non colonne prismatiche.

`renderer.js` esegue la mappa di ombre 2048² alla variazione del biome, con filtro PCF. Marea aggiunge un passaggio a mezza risoluzione con camera riflessa e taglio del terreno sommerso. La mesh d'acqua nativa viene estesa nel vertex shader. Il passaggio della scena usa un framebuffer colore/profondità ridimensionabile. Antialiasing e bloom vengono risolti una sola volta prima della UI: glifi, pulsanti e documenti mantengono la grafica originale.

`shaders.js` legge le mappe esterne NASA per le superfici e le nuvole, e implementa illuminazione giorno/notte e una sottile atmosfera integrata lungo il raggio. La generazione procedurale dei continenti è rimossa. La galassia combina una distribuzione stellare tridimensionale con un'integrazione del volume a 28 campioni. I materiali usano una risposta speculare GGX approssimata. Questi ambienti sono illustrativi, non dati astronomici o una simulazione meteorologica validata.

La camera interpola posizione, mira e campo visivo durante i cambi di scena. La selezione usa la camera corrente; la pausa rende immediata la transizione e blocca tempo, rotazioni, acqua e nuvole. I cambi dei biomi non alterano dati scientifici o chiavi dello store.

## Galassia, sistemi e camera multiscala

Il worker genera una sola distribuzione deterministica da **1.000.000 di punti XYZ**. Il buffer interlacciato contiene sette Float32 per punto (XYZ, RGB, grandezza), 28.000.000 byte. Non vengono creati un milione di oggetti JavaScript né un milione di mesh: ogni fotogramma cosmico invia un unico `drawArrays(POINTS, 0, 1000000)`. I controlli di qualità non cambiano tale numero. I punti fuori dal frustum vengono normalmente scartati dalla GPU.

`systems.js` sceglie un indice distinto per sistema nello stesso buffer, 30 dalla 1.26.0; le coordinate dei sistemi coincidono esattamente con quelle delle stelle. L’identificativo resta stabile per lo stesso seed. Si modifica soltanto la grandezza di queste stelle per renderle individuabili. Non esiste un secondo insieme di marcatori stellari staccato dalla galassia. Ogni sistema corrisponde a un’area tematica di `AREAS` e contiene le sue unità nell’ordine di studio; il numero dei sistemi e delle unità si ricava da `AREAS` (`SYSTEM_COUNT`, `UNIT_COUNT`).

La galassia disegna stelle e volume; le geometrie dei pianeti vengono disegnate solo entrando nel sistema o nell’orbita. Il sistema contiene una stella emissiva con corona e da 5 a 12 pianeti, con orbite ellittiche inclinate, lune e anelli. Sono esplorabili i pianeti delle unità dell’area, da tre a sei; gli altri hanno descrizioni senza ingresso. Dalla 1.27.0 l’ordine e la spaziatura delle orbite vengono dal modello fisico (`docs/FISICA_PIANETI.md`): ogni corpo ha un semiasse in unità astronomiche e il raggio disegnato cresce con il suo logaritmo naturale, di 2,2 unità della scena ogni volta che la distanza si moltiplica per il numero di Nepero, senza mai scendere sotto la spaziatura minima fra due pianeti. Il sistema è costruito in coordinate locali e collocato sulla sua vera posizione galattica con scala 0,0025. Questa scala rende possibile la navigazione illustrativa; non rappresenta distanze astronomiche misurate.

La transizione galassia/sistema dura circa 1,75 secondi a cadenza regolare: interpolazione logaritmica della distanza e ricentraggio anticipato sul sistema, poi passaggio al riferimento locale. Sistema/pianeta usa circa 0,95 secondi. La pausa e il movimento ridotto rendono immediata la transizione. Il delta è limitato a 80 ms per evitare salti dopo una sospensione: su un dispositivo molto lento la durata può aumentare. `navigation.js` ricorda camera e zoom per ciascuna vista e il filtro dell’atlante.

Il picking controlla solo le stelle dei sistemi o fino a 12 pianeti proiettati, esclude punti dietro la camera e pianeti coperti dalla stella. I pannelli intercettano l’input. Il ritardo di 130 ms stabilizza il tooltip; trascinamento, uscita e transizione lo cancellano. I pulsanti semantici espongono tutti i sistemi alla tastiera. Il touch distingue selezione e ingresso con due tocchi, più il pulsante del pannello.

La qualità alta usa la risoluzione della scena al 100%, bilanciata all’80%, ridotta al 60% con bloom disattivato. UI, testi e documenti rimangono alla risoluzione del canvas. In ogni caso il milione resta presente in galassia, sistema, orbita e loro transizioni. Le viste didattiche usano 6.000 stelle di fondo, le superfici nessuna: il requisito del milione riguarda le viste cosmiche. Il contatore viene aggiornato dopo la chiamata GL, dal conteggio realmente inviato.

## Leggibilità delle viste cosmiche (1.14.0)

- Galassia: le stelle dei quattro bracci hanno una tinta leggera nel colore della disciplina (`ARM_TINT` in `data.js`, nessuna estrazione casuale aggiunta, posizioni invariate). Le aree sono esagoni nel colore della disciplina con riempimento traslucido; un arco intorno all'esagono conta le unità completate. I nomi delle aree mostrano un braccio alla volta. La bussola a tre assi è stata rimossa; resta la freccia verso l'area selezionata quando è fuori campo.
- Materiali aggiunti in `shaders.js`: 16, colore piatto per segnaposti e orbite, indipendente dalla luce; 17, alone della stella, denso al centro del disco e trasparente al bordo.
- Sistema: raggio disegnato dei pianeti con `displayRadius`, orbite delle unità nel colore della disciplina, alone della stella nel suo colore, esposizione delle nebulose ridotta a 0,42 nel sistema e 0,55 in orbita (0,72 in galassia). Numeri e nomi dei pianeti sono disegnati dall'interfaccia sulle proiezioni dei pianeti.
- Orbita: la camera sta a circa 65° dalla direzione della stella, così il confine fra giorno e notte è visibile. Sul telefono il pianeta occupa la metà superiore e la scheda quella inferiore.

## Mondi dei pianeti (1.16.0)

- `src/worlds/pilots.js` descrive i quattro mondi prototipo: stato calcolato dal modello dell'unità, righe del pannello, costruzione delle istanze e disegno. `src/worlds/geometry.js` contiene le mesh (margherita, animale da pascolo, ciuffo d'erba, bocca geotermica, disco, piano del mare).
- `renderer.js` disegna a istanze (`makeInstances`, `updateInstances`, opzione `instances` di `drawMesh`): 8 valori per istanza (posizione, scala, colore, direzione o fase). Il colore dell'istanza sostituisce solo le parti bianche della mesh.
- Nel vertex shader `uInstanced` sceglie il moto: 1 fermo con oscillazione leggera, 2 particelle che salgono, 3 animali che camminano su piccoli cerchi. Il materiale 18 è l'acqua dei mondi (mare con marea e onde nel vertex shader, laghi colorati), il 19 il vapore.
- La superficie di atterraggio resta quella esportata da Blender; il mondo vi aggiunge i propri oggetti. Il mare delle maree sostituisce l'acqua della superficie «marea». Per i quattro pianeti la famiglia è fissata in `systems.js`, così la superficie corrisponde al fenomeno.

## Superfici generate (1.18.0)

- `src/worlds/surface.js` costruisce la superficie di un pianeta dalla sua carta d’identità: terreno di 220 × 220 unità su una griglia di 161 × 161 punti (colori del suolo, bagliore delle colate, bordo che sfuma nella foschia), mare con il colore della carta, luce con il colore della stella, cielo (zenit, orizzonte, stelle visibili con atmosfera sottile), lune sopra l’orizzonte, piante e rocce sparse, quattro stazioni compatte in fila nel primo piano a sinistra su piazzole spianate o piattaforme sull’acqua.
- `World.activatePlanet` genera la superficie solo all’atterraggio e la conserva per gli ultimi tre pianeti; le mesh vanno in GPU una volta per pianeta. La camera è più bassa (orizzonte in vista, campo visivo più ampio) e resta almeno 5 unità sopra il terreno.
- Le lune hanno azimut fra 0,10 e 0,29 rad a destra della direzione iniziale della camera, così sugli schermi larghi restano fra il titolo e il pannello delle stazioni. `Renderer.shadeRect` disegna un rettangolo con alfa interpolata sui vertici; `titleShade` lo usa dietro il titolo delle superfici sugli schermi larghi.
- Il cielo delle superfici usa `uSkyTop`, `uSunColor` e `uStars`; terreno e acqua usano `uLightColor`, il colore della stella. Nella vista del sistema la stella prende il colore del tipo indicato dalla carta.

## Specie, luoghi ed esplorazione (1.19.0)

- `src/worlds/species.js` ricava le specie di ogni pianeta dalla carta: la famiglia decide le forme possibili (sette forme di piante, quattro di animali), l’atmosfera e il mare le filtrano (volatori solo con densità almeno 0,45, colonie galleggianti solo con livello del mare almeno 0,3), il tipo di stella dà il colore delle foglie, la gravità le proporzioni (scala delle piante proporzionale a g^-0,6, degli animali a g^-0,35). I generi sono unici in tutta la galassia. Totale: 310 specie (180 piante, 130 animali); i 14 pianeti craterizzati, quasi senza atmosfera, non ne hanno.
- Ogni specie ha da una a quattro caratteristiche spiegate: forma, colore delle foglie (sulla linea delle ipotesi di Kiang e colleghi, 2007, sui pigmenti sotto altre stelle), gravità, clima. Sono ipotesi illustrative.
- `src/worlds/places.js` dà a ogni pianeta il punto più alto, la forma tipica del suo stile di terreno (18 forme), la costa quando il mare è esteso e fino a due eventi rari della carta: 402 luoghi in tutto (100 vette, 100 forme, 37 coste, 165 eventi). Le spiegazioni sono qualitative o usano relazioni standard (altezza di scala H = RT/(Mg), maree proporzionali a 1/d³, portanza proporzionale alla densità dell’aria).
- `populate` dispone gli individui a gruppi nel loro habitat (riva, pianure, alture, mare aperto, zone calde), ad almeno 7 unità dalle stazioni; `locatePlaces` mette ogni luogo nel suo punto tipico, ad almeno 18 unità dagli altri e 12 dalle stazioni.
- Nuove mesh in `src/worlds/geometry.js` (felce, albero a ombrello, colonna, cuscino, calice, crosta, esapode, volatore, colonia galleggiante, segnale, tenda dell’aurora). Il modo di istanza 4 del vertex shader fa volare i volatori su cerchi ampi con il battito delle ali. Il geyser usa particelle del modo 2; l’aurora è una tenda trasparente nel cielo, con l’alfa che sfuma verso l’alto. Con la grafica «Bilanciato» si disegna il 70% degli individui di ogni specie, con «Leggero» il 40%.
- In esplorazione la camera passa in circa un secondo dalla vista delle stazioni a una vista più vicina e più alta sul punto scelto. Un clic sul terreno cerca la specie più vicina entro 7 unità o il luogo più vicino entro 9, altrimenti sposta la camera; W A S D muovono il punto di vista. Le registrazioni stanno in `explore` del salvataggio locale.

## Mappe d’orbita dalle carte (1.20.0)

- `src/worlds/orbit-texture.js` calcola la mappa equirettangolare di un pianeta esplorabile con lo stesso stile di terreno della superficie, valutato con rumore 3D sulla sfera: nessuna cucitura sulla linea del cambio di data e nessuna deformazione ai poli. Crateri, atolli, vulcani, criovulcani e caldere diventano calotte distribuite sulla sfera; le dune si allineano lungo le fasce di vento delle basse latitudini, come su Titano.
- Il livello del mare è il quantile della carta calcolato sull’area (4000 punti distribuiti uniformemente); il colore viene da `colorAt`, la stessa funzione della superficie, con un’ombreggiatura leggera sui pendii. Il canale alfa vale 0 sul mare: il materiale 12 lo usa per il riflesso speculare dell’acqua.
- `World.orbitTexture` crea subito una mappa 128 × 64 (15-46 ms in Node su otto pianeti di prova), poi costruisce in `orbitTick` la mappa 512 × 256 (125-248 ms) e, per il pianeta in orbita, quella 1024 × 512 (517-911 ms), circa 6 ms per fotogramma. Restano in memoria le 12 mappe medie e le 3 grandi usate più di recente.
- Nuvole e guscio dell’atmosfera seguono la carta: opacità delle nuvole 1,4 volte la copertura (massimo 0,9), guscio con spessore, altezza di scala e spessore ottico ricavati dalla pressione della carta (sezione «Atmosfere visibili»), colore dal cielo della carta.

## Atmosfere visibili (1.59.0)

- Il guscio dell'atmosfera segue la pressione al suolo della carta, p = 10^(4,5d − 2,5) bar per una densità d di almeno 0,1 (`src/worlds/physics.js`). Fra 0,01 e 100 bar lo spessore del guscio cresce dall'1,8 % al 6,8 % del raggio, l'altezza di scala è un quarto dello spessore e lo spessore ottico va da 3 a 15, moltiplicato per 0,7 più 0,6 volte la foschia (`shellOf` in `src/scene/world.js`). Nei 103 pianeti delle unità con un'atmosfera la pressione va da 0,009 a 45,5 bar; i 22 con un'esosfera restano senza guscio.
- Lo shader del guscio (materiale 6) integra la luce lungo il raggio con questi parametri, rinforza la diffusione in avanti quando si guarda verso la stella e aggiunge una fascia di crepuscolo lungo il terminatore.
- Il colore del crepuscolo viene dal cielo della carta: la luce che attraversa un lungo tratto d'aria perde i colori che il cielo diffonde. La funzione `twilightOf` di `src/craft/succede.js` e la funzione `dusk` degli shader usano la stessa formula. Un cielo azzurro dà un crepuscolo arancione o giallo, un cielo caldo un crepuscolo azzurro, come su Marte; nei 103 pianeti i crepuscoli sono 38 arancioni, 37 azzurri, 22 gialli, 4 verdi e 2 bianchi.
- La stessa fascia colora il suolo lungo il terminatore (materiale 12) e le nubi (materiale 5), con un'intensità che cresce con la pressione da 0,25 a 1.

## Comete, sciami e cinture (1.60.0)

- Cinture: per ogni anello una mesh statica di rocce (sfere basse deformate con la mappa lunare NASA, tinte calde per la roccia e fredde per il ghiaccio) ruotata ogni fotogramma con la sua velocità angolare, più un anello piatto di polvere con il materiale delle code, più luminoso a metà larghezza.
- Comete: nucleo con il materiale dei pianeti, chioma con il bagliore delle stelle, due code (`unitTail` in `src/scene/minor-bodies.js`) orientate con una matrice di base (`basisMatrix` in `src/scene/world.js`): +z lontano dalla stella, la curva verso l'indietro dell'orbita. Le scie sono istanze di bagliori statiche, una per cometa.
- Stelle cadenti: la coda di ioni scalata a 4-9 unità, a 55 unità dalla camera nella parte alta della vista, per 0,9 s.
- Il modello e i numeri sono descritti in `docs/STAZIONI_NAVI.md`, sezione «Comete, sciami e cinture».

## Costo di un fotogramma (1.61.0)

- `scripts/prestazioni.mjs` disegna ogni sistema con il codice del sito e con un contatore al posto di `src/renderer.js`, che segue le sue regole: una chiamata su una mesh o su un gruppo di istanze mancante si salta, una chiamata con istanze conta i triangoli della mesh per ogni istanza. Il risultato è `docs/PRESTAZIONI.md`.
- Navi, stazioni e mezzi della stessa classe e dello stesso livello di dettaglio sono una sola chiamata con istanze, e i punti luce sono un'altra: per questo le chiamate di un fotogramma restano le stesse alle tre impostazioni, che cambiano il numero delle istanze.
- Le maglie delle cinture si costruiscono alla prima visita di un sistema e restano per gli ultimi tre sistemi disegnati; le scie delle comete sono gruppi di istanze creati all'apertura della galassia.
- `tests/galassia.test.mjs` controlla i limiti di un fotogramma: 160 chiamate di disegno, 1,2 milioni di triangoli e 2500 istanze.

## Riprodurre l'export

Richiede Blender 4.3 e il suo Python con numpy:

```sh
blender -b -t 8 --python tools/export_surfaces.py -- --source-dir models/surfaces/render --output-dir assets/scenes
```

I generatori delle scene approvate sono conservati accanto ai file Blender. Il runtime usa le mesh esportate delle superfici e shader propri per i pianeti e la galassia; non tenta di eseguire i nodi Cycles nel browser. Il risultato può differire dal render Cycles, specialmente per luce indiretta, trasmissione e dettagli subpixel. Nessun fondale IA o screenshot delle preview è usato per sostituire il 3D.

La generazione e la provenienza delle mappe sono documentate in [PLANET_SYSTEMS.md](PLANET_SYSTEMS.md).

## Ambiente cosmico 1.4.0

`src/scene/cosmos.js` possiede il catalogo 3D condiviso, `cosmic-shader.js` il ray marching e l’estinzione, `minor-bodies.js` le geometrie di asteroidi e code cometarie. Vedere `COSMIC_ENVIRONMENT.md` per numeri, qualità, provenienza e limiti. Le texture NASA e le mesh dei biomi restano inalterate.
