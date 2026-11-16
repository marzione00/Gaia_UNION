# Motore grafico 1.3.0

## Pipeline

`world.js` conserva le 100 unità planetarie, organizzate in 25 sistemi da 5–12 pianeti, quattro esplorabili ciascuno, e la rete di 16 nodi / 18 archi. `assets.js` associa i pianeti ai tre biomi e carica buffer locali, verificandone le dimensioni. Le superfici vengono caricate una mesh per volta per limitare la memoria temporanea.

Le mesh native usano Float32 a 16 componenti (posizione, normale, UV, colore lineare, metallo, rugosità, emissione, tipo) e indici Uint32. Le tre superfici contengono complessivamente 672.891 vertici / 796.060 triangoli e occupano 52.617.744 byte di buffer. Tutte restano in GPU per un cambio immediato di biome; si disegna soltanto la superficie corrente, in 4 o 5 draw call principali. I contatori vegetali provengono dall'export. Le 875 celle sono campioni logici del terreno, non colonne prismatiche.

`renderer.js` esegue la mappa di ombre 2048² alla variazione del biome, con filtro PCF. Marea aggiunge un passaggio a mezza risoluzione con camera riflessa e taglio del terreno sommerso. La mesh d'acqua nativa viene estesa nel vertex shader. Il passaggio della scena usa un framebuffer colore/profondità ridimensionabile. Antialiasing e bloom vengono risolti una sola volta prima della UI: glifi, pulsanti e documenti mantengono la grafica originale.

`shaders.js` legge le mappe esterne NASA per le superfici e le nuvole, e implementa illuminazione giorno/notte e una sottile atmosfera integrata lungo il raggio. La generazione procedurale dei continenti è rimossa. La galassia combina una distribuzione stellare tridimensionale con un'integrazione del volume a 28 campioni. I materiali usano una risposta speculare GGX approssimata. Questi ambienti sono illustrativi, non dati astronomici o una simulazione meteorologica validata.

La camera interpola posizione, mira e campo visivo durante i cambi di scena. La selezione usa la camera corrente; la pausa rende immediata la transizione e blocca tempo, rotazioni, acqua e nuvole. I cambi dei biomi non alterano dati scientifici o chiavi dello store.

## Galassia, sistemi e camera multiscala

Il worker genera una sola distribuzione deterministica da **1.000.000 di punti XYZ**. Il buffer interlacciato contiene sette Float32 per punto (XYZ, RGB, grandezza), 28.000.000 byte. Non vengono creati un milione di oggetti JavaScript né un milione di mesh: ogni fotogramma cosmico invia un unico `drawArrays(POINTS, 0, 1000000)`. I controlli di qualità non cambiano tale numero. I punti fuori dal frustum vengono normalmente scartati dalla GPU.

`systems.js` sceglie 25 indici distinti nello stesso buffer; le coordinate dei sistemi coincidono esattamente con quelle delle stelle. L’identificativo resta stabile per lo stesso seed. Si modifica soltanto la grandezza di queste stelle per renderle individuabili. Non esiste un secondo insieme di marcatori stellari staccato dalla galassia. Le 100 unità sono associate in quattro gruppi disciplinari: il sistema i contiene i, i+25, i+50, i+75. I 75 corsi pianificati rimangono dichiarati tali.

La galassia disegna stelle e volume; le geometrie dei pianeti vengono disegnate solo entrando nel sistema o nell’orbita. Il sistema contiene una stella emissiva con corona e da 5 a 12 pianeti, con orbite ellittiche inclinate, lune e anelli. Quattro pianeti sono esplorabili; gli altri hanno descrizioni senza ingresso. Il sistema è costruito in coordinate locali e collocato sulla sua vera posizione galattica con scala 0,0025. Questa scala rende possibile la navigazione illustrativa; non rappresenta distanze astronomiche misurate.

La transizione galassia/sistema dura circa 1,75 secondi a cadenza regolare: interpolazione logaritmica della distanza e ricentraggio anticipato sul sistema, poi passaggio al riferimento locale. Sistema/pianeta usa circa 0,95 secondi. La pausa e il movimento ridotto rendono immediata la transizione. Il delta è limitato a 80 ms per evitare salti dopo una sospensione: su un dispositivo molto lento la durata può aumentare. `navigation.js` ricorda camera e zoom per ciascuna vista e il filtro dell’atlante.

Il picking controlla solo 25 stelle o fino a 12 pianeti proiettati, esclude punti dietro la camera e pianeti coperti dalla stella. I pannelli intercettano l’input. Il ritardo di 130 ms stabilizza il tooltip; trascinamento, uscita e transizione lo cancellano. I pulsanti semantici espongono tutti i sistemi alla tastiera. Il touch distingue selezione e ingresso con due tocchi, più il pulsante del pannello.

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

## Riprodurre l'export

Richiede Blender 4.3 e il suo Python con numpy:

```sh
blender -b -t 8 --python tools/export_surfaces.py -- --source-dir models/surfaces/render --output-dir assets/scenes
```

I generatori delle scene approvate sono conservati accanto ai file Blender. Il runtime usa le mesh esportate delle superfici e shader propri per i pianeti e la galassia; non tenta di eseguire i nodi Cycles nel browser. Il risultato può differire dal render Cycles, specialmente per luce indiretta, trasmissione e dettagli subpixel. Nessun fondale IA o screenshot delle preview è usato per sostituire il 3D.

La generazione e la provenienza delle mappe sono documentate in [PLANET_SYSTEMS.md](PLANET_SYSTEMS.md).

## Ambiente cosmico 1.4.0

`src/scene/cosmos.js` possiede il catalogo 3D condiviso, `cosmic-shader.js` il ray marching e l’estinzione, `minor-bodies.js` le geometrie di asteroidi e code cometarie. Vedere `COSMIC_ENVIRONMENT.md` per numeri, qualità, provenienza e limiti. Le texture NASA e le mesh dei biomi restano inalterate.
