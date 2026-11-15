# Ambiente cosmico 3D — GAIA 1.4.0

L'intervento riguarda galassia, sistemi e dossier orbitali. Interfaccia, contenuti, texture planetarie NASA e superfici dei tre biomi restano quelli della 1.3.0.

## Oggetti consegnati

- Un milione di vertici stellari: nessuna riduzione nei preset grafici. Circa 12.000 posizioni non navigabili formano cinque ammassi; una piccola frazione delle stelle ha maggiore luminosità. Le 25 stelle navigabili sono escluse dalla modifica, conservando coordinate, colore e identificativo.
- Cinque regioni deterministiche: formazione stellare, nube a riflessione, polveri, ammasso aperto, periferia. Le regioni vengono assegnate ai 25 sistemi per posizione.
- Quindici volumi: cinque nebulose principali, cinque filamenti di polvere, un resto di supernova, una nebulosa planetaria con nucleo e tre galassie lontane. Tutti hanno centro, estensione e seed nello stesso spazio galattico.
- Otto fasce con 280–459 asteroidi ciascuna: geometrie aggregate, superficie NASA lunare, illuminate dalla stella centrale. Si trovano oltre l'orbita esterna dei pianeti.
- Tre comete con nucleo, coda ionica azzurra e coda di polvere curva. Sono geometrie 3D illustrative in posizioni persistenti; non viene simulata la dinamica orbitale della cometa.
- Ombre geometriche semplificate delle lune sui pianeti e del pianeta sulle lune; considerate anche su nuvole e atmosfera. Le ombre degli anelli non sono simulate.

## Continuità delle viste

`createCosmos` costruisce una sola descrizione del cosmo dopo la selezione delle stelle navigabili. `World.galacticCamera` trasforma la camera del sistema e dell'orbita nelle medesime coordinate usate dall'atlante. Lo sfondo non viene rigenerato quando cambia la scena. Lo spostamento orbitale, minuscolo rispetto alle distanze interstellari, mantiene correttamente quasi immobile la nebulosa lontana; la rotazione della camera ne cambia l'inquadratura. Nessun oggetto segue la camera.

## Rendering

I raggi attraversano ellissoidi tridimensionali limitati. La densità combina rumore matematico multiscala, cavità, creste e filamenti; emissione e assorbimento vengono integrati lungo il raggio. I volumi sono ordinati per profondità. È una visualizzazione artistica, con approssimazione della sovrapposizione dei volumi, non una simulazione astrofisica o una ricostruzione osservativa certificata.

L'estinzione stellare usa un'approssimazione geometrica più economica fra camera e posizione della singola stella: le stelle davanti al volume non vengono oscurate. Le geometrie di pianeti e lune occludono lo sfondo. Le guide delle orbite sono disegnate solo nella vista del sistema: in avvicinamento al pianeta sono escluse per evitare poligoni allargati dal piano vicino della camera. Le atmosfere mantengono il passaggio volumetrico esistente.

| Preset | Campioni massimi per volume | Risoluzione volumi rispetto alla scena | Stelle |
|---|---:|---:|---:|
| Leggero | 28 | 40% per asse | 1.000.000 |
| Bilanciato | 48 | 55% per asse | 1.000.000 |
| Alto | 72 | 70% per asse | 1.000.000 |

I volumi vengono ricomposti nella scena prima delle geometrie e della UI. Il dettaglio è controllato dai tre preset esistenti; non viene promesso un frame rate e non si usa un controller automatico di qualità. La UI conserva la risoluzione del canvas. I framebuffer vengono ricreati al cambio di dimensione o qualità e quelli vecchi vengono liberati.

## Provenienza e limiti

Nessuna immagine IA, skybox fotografica o texture dipinta viene introdotta. Gas, polveri e oggetti lontani sono forme calcolate e renderizzate; le superfici planetarie continuano a usare gli asset NASA già documentati in `assets/planets/manifest.json`. I modelli cosmici non sono dati NASA e non devono essere presentati come tali.

Riferimenti visivi e metodologici consultati:

- Haegemonia: Legions of Iron, Digital Reality / Microids: https://store.steampowered.com/app/294770/ — ispirazione visiva, nessun asset del gioco estratto.
- NASA / ESA / STScI, Journey Through the Orion Nebula: https://science.nasa.gov/missions/hubble/nasa-space-telescopes-provide-a-3d-journey-through-the-orion-nebula/ — riferimento per cavità, filamenti e distinzione fra osservazione e interpretazione 3D. Nessun video o fotogramma NASA usato come fondale.

Scala, densità, dimensione apparente e luminosità sono accentuate per la navigazione didattica. I colori non pretendono di riprodurre la visione umana a occhio nudo. Le nebulose non ribollono in pochi secondi e le stelle nello spazio non hanno scintillio atmosferico artificiale.

## Riproduzione delle verifiche e del video

Con Node, Python, NumPy, Pillow e Mesa EGL disponibili:

```sh
npm test
node tools/capture_runtime.mjs ../runtime-qa-v140
python tools/replay_egl.py ../runtime-qa-v140
```

Per aggiungere 180 fotogrammi di rotazione (tre sequenze di 60): impostare `GAIA_VIDEO=1` nell'ambiente durante la cattura. Il replay usa i comandi reali dell'app e gli shader GLSL ES originali; il DOM è simulato. Non equivale a un test browser o a un benchmark di una GPU fisica. Il video di consegna è codificato a 20 fotogrammi al secondo, non è una misura del frame rate dell'app.
