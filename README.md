# GAIA — Beyond Knowledge · 1.4.0

**Atlante scientifico integrato, con interfaccia e scene WebGL 2.** Deriva dalla preview GAIA approvata, recupera i contenuti didattici della V7 e il materiale grafico tracciato di GeoStatLab. L’ispirazione visiva è Civilization: Beyond Earth; non è un prodotto ufficiale né distribuisce asset di quel gioco.

## Archivi della consegna

Lo ZIP COMPLETO contiene l’applicazione pronta, tutte le texture di runtime 4K/8K, i sorgenti del codice, i modelli Blender, i crediti e le anteprime. Lo ZIP ORIGINALI_NASA contiene separatamente i file di provenienza ad alta risoluzione: usare la sottocartella `sources/nasa/` dell’archivio 1.3.0 già consegnato e copiarla nella cartella `sources/nasa/` di questa versione. Questo secondo archivio serve al rebuild degli asset e non è necessario per avviare l’app.

## Avvio

Estrai lo ZIP. Apri il terminale nella cartella contenente `package.json` e usa Node.js 22 o successivo:

```sh
npm start
```

Apri **http://localhost:8000**. Su Windows puoi avviare anche `AVVIA_WINDOWS.bat`. Non serve `npm install`, non serve una chiave API e il sito non richiede un backend esterno. Tutti i contenuti di runtime sono locali. Non aprire `index.html` con doppio clic: moduli e worker richiedono HTTP.

```sh
npm test
npm run check
npm run build
npm run test:http
node scripts/serve.mjs --dist
```

Il server di sviluppo ascolta soltanto su `127.0.0.1`. Per una porta differente imposta la variabile `PORT`. Nessun servizio viene pubblicato automaticamente.

## Che cosa è effettivamente incluso

| Ambito | Copertura |
|---|---|
| Galassia | 1.000.000 di punti 3D effettivi, 25 sistemi navigabili, 5–12 pianeti per sistema, quattro esplorabili |
| Matematica | 25 unità del catalogo della dispensa; fonte integrale di 769 pagine consultabile in WebGL |
| Teoria narrativa matematica | Quattro lezioni, 33 sezioni; Funzioni copre 8.1–8.11, le altre tre sono percorsi mirati |
| Gaia | Sei nuove sezioni trasversali con ipotesi, formule, protocollo e limiti |
| Verifiche | 40 quesiti interattivi originali di Funzioni, spiegazioni e alternative errate; gli altri quesiti rimangono nella fonte PDF |
| Laboratori | Daisyworld e sei laboratori matematici collegati ai motori precedenti |
| Fisica, chimica, biologia | 25 pianeti per disciplina: 75 posti riservati, senza lezioni o questionari inventati |

**“Piattaforma integrata” non significa cento corsi terminati.** Il catalogo dichiara la disponibilità reale di ogni unità. La matematica non ancora rielaborata sul web si apre nella fonte originale, non in una lezione generica sostitutiva.

## Ambienti 3D della versione 1.4.0

Nuovo ambiente cosmico: cinque regioni, quindici volumi 3D, ammassi, tre galassie lontane, otto fasce di asteroidi e tre comete. Nebulose e polveri mantengono posizione e identità da galassia a sistema e pianeta. Dettagli, provenienza e limiti in `docs/COSMIC_ENVIRONMENT.md`.

L'interfaccia conserva navigazione, pannelli, controlli e tipografia della versione dell'utente. Le scene sono interattive, renderizzate da geometrie e shader locali:

- Galassia a spirale con nucleo caldo, bracci freddi, polveri volumetriche e un milione di stelle 3D. Venticinque stelle del medesimo buffer sono sistemi esplorabili: la descrizione compare al passaggio del mouse e un clic avvia lo zoom. I pianeti compaiono nella vista del sistema: da 5 a 12 per sistema, 232 in totale, con quattro destinazioni esplorabili ciascuno. Le altre hanno una descrizione ma non aprono dossier o superfici.
- Undici famiglie ispirate a Haegemonia: terrestri, oceanici, desertici, craterizzati, glaciali, vulcanici, rocciosi, atmosfere acide e tre famiglie di giganti. Colori e dettagli delle superfici provengono da mappe NASA esterne; le cento destinazioni esplorabili hanno mappe native da 4K a 8K. Anche le nuvole usano una mappa NASA. Atmosfera e illuminazione rimangono calcoli 3D. Lune, anelli e sonda sono geometrie 3D.
- Simbiosi: architettura organica viola, flora aliena e nebbie verdi; Esodo: colonia terrazzata e ceramica chiara sul terreno ocra; Marea: distretti galleggianti, ponti e basalto.
- Le tre superfici usano le mesh valutate dei render Blender approvati: 672.891 vertici e 796.060 triangoli complessivi, divisi in 13 mesh. Si disegna soltanto il biome attivo.
- Ombre filtrate, riflessi planari delle strutture sull'acqua, increspature animate, materiali con metallo/rugosità/emissione. Antialiasing e bloom agiscono sulla scena prima dei pannelli.
- Transizioni della camera, pausa del movimento, selezione delle stazioni e collegamenti di ricerca evidenziati. La preferenza di movimento ridotto viene rispettata.

Funzioni parte da Simbiosi, Algebra da Marea, Radicali ed Equazioni da Esodo. Il bioma è illustrativo e non indica il contenuto scientifico o lo stato di completamento del corso.

Non vengono usate immagini generate da IA come ambienti o texture. Le vecchie mappe planetarie procedurali sono sostituite da mappe NASA, con originali e attribuzioni in `sources/nasa/`. I livelli di dettaglio sono riduzioni delle mappe esterne, senza pittura, ricolorazione o upscaling. I mondi immaginari usano analoghi del Sistema Solare, non osservazioni di esopianeti. Non vengono caricati screenshot dei render al posto delle scene. L'illuminazione WebGL è un'approssimazione in tempo reale: non è un render Cycles identico pixel per pixel.

## Percorso

`Atlante → Sistema stellare → Pianeta → Dossier → Teoria / fonte originale → Laboratorio / verifica → Diario`

Ogni superficie (Simbiosi, Esodo, Marea) contiene quattro stazioni con percorsi e 875 celle logiche campionate sul terreno continuo; la rete scientifica ha 16 nodi e 18 collegamenti concettuali. Non contiene indicatori fittizi di abitabilità o avanzamenti assegnati automaticamente. Le temperature e le frazioni del laboratorio vengono dal modello; il terreno è illustrativo e non viene spacciato per una simulazione spaziale di Daisyworld.

Il catalogo permette ricerca e filtro senza selezionare piccoli oggetti 3D. I link alle pagine sono riferiti al PDF integrale. La fonte originale conserva figure, impaginazione e numerazione.

## Controlli

Alla prima apertura una schermata propone tre ingressi: cerca un argomento, segui un percorso, esplora la galassia. Nella mappa ogni braccio della galassia è una disciplina (matematica, fisica, chimica, biologia) e ogni esagono è un’area tematica; dal centro verso l’esterno le aree seguono l’ordine di studio. I pulsanti in basso evidenziano un braccio. La scheda a destra elenca le unità dell’area: APRI L’UNITÀ apre la lezione, SISTEMA 3D porta ai pianeti, uno per unità, dall’orbita interna a quella esterna. GUIDA mostra cinque passi direttamente sulla mappa. Trascina per ruotare la camera; usa rotellina o +/− per lo zoom.

Tab e Invio raggiungono anche le 25 aree e i pianeti, senza dover centrare punti piccoli. Frecce e Page Up/Down scorrono il lettore; rotellina e trascinamento funzionano anche sui documenti. Ctrl/Cmd+K apre la ricerca. Spazio sospende o riprende il movimento; la pausa rende immediati gli avvicinamenti.

**Il milione di stelle è fisso in tutte le viste cosmiche e durante gli zoom.** Alta, bilanciata e ridotta modificano risoluzione interna della scena e bloom, mantenendo la UI a piena risoluzione. Le vecchie preferenze da 250.000/60.000 vengono migrate; non riducono più le stelle. Il contatore proviene dalle chiamate di disegno effettive. I punti sono procedurali e non costituiscono un catalogo astronomico osservato; il numero sottoposto alla GPU non significa che ogni punto sia distinguibile o dentro il campo visivo.

## Diario e verifiche

Appunti, sezioni dichiarate studiate, risposte controllate e scenari sono salvati localmente quando il browser lo consente. Una sezione consultata non diventa automaticamente una competenza acquisita. Le verifiche separano corrette, errate e bianche; in modalità esame la correzione è disponibile dopo la consegna.

Esporta/importa il diario JSON per trasferire il lavoro: non esiste sincronizzazione cloud. È supportata l’importazione del registro V7 `schemaVersion: 1`, anche tramite il vecchio storage sulla stessa origine. Non viene eliminata la chiave originale. Il laboratorio esporta parametri e risultati; Daisyworld aggiunge una traccia CSV. A e B rappresentano configurazioni distinte: salvare A non la ricalcola quando modifichi B.

## Rendering e leggibilità

Tutti gli elementi visibili dell’applicazione normale sono composti sul canvas WebGL 2: scene, pannelli, pulsanti, grafici, tipografia. Il testo usa triangoli con atlanti di glifi; formule, documenti lunghi e pagine originali usano tessere tipografiche precalcolate con MathJax o PyMuPDF. **Non sono fotografie delle scene 3D e non sono immagini IA.** I caratteri non sono modellati uno per uno come solidi estrusi.

Il contenuto semantico e i controlli nativi sono mantenuti fuori schermo per tastiera e lettura assistita. La copia è disponibile tramite comando, non tramite selezione nativa del testo nel canvas. Le pagine lunghe scorrono in un solo lettore WebGL. Per mancanza/perdita di WebGL viene mostrato un messaggio HTML con accesso al PDF: non viene simulata una scena alternativa 2D. I dialoghi nativi del browser (download/importazione) non sono renderizzati dal sito.

## Sorgenti e riproducibilità

- `sources/v7/`: copie immutate di catalogo, lezioni, quiz e metadati originali.
- `content/`: contenuti correnti e adattamenti narrativi GAIA; identificativi e formule matematiche conservati.
- `materials/`: PDF integrale originale.
- `assets/reader/`, `assets/pdf/`: documenti precalcolati per il display GPU; indici con testo e rimandi.
- `assets/planets/manifest.json`: provenienza NASA, risoluzioni native, livelli GPU, mapping UV e SHA-256 di tutte le mappe.
- `sources/nasa/`: file esterni originali e metadati; `tools/prepare_planet_assets.py`: estrazione e ridimensionamento riproducibili.
- `src/models/`: motori scientifici separati dalla visualizzazione.
- `src/scene/`: stelle, shader procedurali, caricamento binario, camera, picking e worker.
- `assets/scenes/`: mesh native dei tre biomi, metadati e hash SHA-256.
- `models/`: sei scene Blender modificabili e generatori delle preview approvate.
- `tools/`: esportazione delle superfici e collaudo EGL riproducibile.
- `previews/`: catture effettive del renderer della versione 1.4.0.
- `src/ui/`: componenti GPU e cache delle texture.
- `tests/` e `docs/`: controlli riproducibili, attribuzioni e limiti.

Vedi [sistemi e texture NASA](docs/PLANET_SYSTEMS.md), [architettura](docs/ARCHITECTURE.md), [modello scientifico](docs/SCIENTIFIC_MODEL.md), [collaudo](docs/QA.md) e [provenienza](docs/CONTENT_PROVENANCE.json).

## Pubblicazione

Il workflow `.github/workflows/pages.yml` esegue test, controlli delle risorse, build e verifiche HTTP della cartella `dist/`. Le pull request eseguono i controlli senza pubblicare. Ogni push su `main`, o un avvio manuale su `main`, pubblica la distribuzione e verifica via HTTPS i file essenziali del sito.

In **Settings → Pages → Build and deployment → Source** deve essere selezionato **GitHub Actions**; questa impostazione va attivata una sola volta per ogni nuovo repository. `configure-pages` viene eseguito nel job di deploy con i permessi Pages necessari. Non servono token personali o chiavi API. I deploy in corso non vengono interrotti da un nuovo push.

La build include anche `LICENSE`, `LICENSE.md`, `THIRD_PARTY_NOTICES.md`, le note dei caratteri e i metadati di provenienza delle texture.

## Licenza

Le parti originali di GAIA — Beyond Knowledge sono distribuite con **Creative Commons Attribution 4.0 International (CC BY 4.0)**. Vedi [ambito e attribuzione](LICENSE.md), [testo integrale](LICENSE) e [licenza ufficiale](https://creativecommons.org/licenses/by/4.0/).

Il PDF, le lezioni e i quesiti preesistenti, le risorse NASA e gli altri materiali di terzi conservano le condizioni delle rispettive fonti: la CC BY 4.0 del progetto non le sostituisce. I crediti sono in [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).

## Limiti da conoscere

Questa versione supera 88 test Node e il controllo delle risorse. I comandi reali del renderer sono stati acquisiti eseguendo l’app con un adattatore DOM e riprodotti su EGL / OpenGL ES 3.2 Mesa, compilando gli shader GLSL ES senza modificarli. Tutti i 305 fotogrammi verificati, inclusi gli zoom, non hanno prodotto errori GL. Nei fotogrammi di galassia, sistema e orbita si verifica la chiamata effettiva `drawArrays(POINTS, 0, 1000000)`. Sono incluse 51 catture reali del replay e un video di tre rotazioni.

Questo collaudo non sostituisce un test completo nel browser: browser, prestazioni su GPU fisiche e persistenza dopo la chiusura restano da verificare sul dispositivo destinatario. Non è stata eseguita una certificazione formale di accessibilità. Metodo, log e test browser riproducibile sono descritti in `docs/QA.md`.
