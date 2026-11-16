> Per generazione dei sistemi, livelli di dettaglio e mappe NASA vedere [PLANET_SYSTEMS.md](PLANET_SYSTEMS.md).

> Aggiornamento 1.3.0: per scene, materiali, framebuffer e sorgenti Blender vedere [GRAPHICS.md](GRAPHICS.md). Le sezioni storiche sulla superficie prismatica descrivono la 1.0.0.

# Architettura e manutenzione

## Componenti

`src/app.js` coordina stato, rotte e schermate. `src/routing.js` normalizza URL e collegamenti storici. `src/renderer.js` gestisce programmi GLSL, buffer e texture WebGL 2. `src/scene/world.js` contiene camera, scena e picking. `src/scene/worker.js` genera i dati stellari in un worker dedicato: non si crea un oggetto JavaScript per ogni stella.

`src/ui/toolkit.js` raccoglie pannelli, pulsanti, slider, grafici e cache LRU dei documenti. La cache elimina le texture non più necessarie; le mesh sostituite rilasciano i buffer. Lo stesso file definisce il tema dell’interfaccia (dalla 1.13.0): colori di superficie e d’accento in `T` e `C`, un colore per disciplina in `DISCIPLINE`, `caseLabel` per le etichette dei pulsanti in maiuscolo solo iniziale e `fmtNum` per i numeri con virgola decimale e potenze di dieci in apice. L’interfaccia è disegnata alla densità reale dello schermo (fino a 3×), mentre la scena 3D mantiene la risoluzione interna di prima. `src/models/` è indipendente dal renderer e testabile in Node. `src/store.js` valida importazioni e gestisce memoria locale con ripiego di sola sessione.

## Documento e scena non sono la stessa cosa

Il renderer non finge di calcolare una formula riproducendo uno screenshot del laboratorio. Le curve dei laboratori derivano dal modello corrente. Le tessere del lettore sono invece una rappresentazione tipografica della fonte, elaborata a build per mantenere MathJax e figure fedeli; gli indici contengono testo, dimensioni, bounding box delle risposte e provenienza.

Il contenuto e gli hotspot sono sincronizzati: le alternative dei quiz conservano i rettangoli della composizione tipografica, così testo e area cliccabile non divergono. La versione mobile ha una composizione propria, non una riduzione indiscriminata della pagina desktop.

## Estensione dei corsi

Ogni voce in `content/catalogue.json` ha identificativo stabile, settore, pianeta, stato, fonte ed eventuale `lesson`. Gli ID della matematica sono preservati. Gli altri tre settori hanno voci `planned`: cambiare il nome non le rende corsi completi.

Per aggiungere una lezione: inserire un JSON con `id`, `sections[]` e provenienza; collegarlo tramite `lesson` nel catalogo; rigenerare i documenti con `scripts/render_reader.py`; eseguire test e check. Il caricamento delle lezioni parte dal catalogo. Il questionario distribuito è quello di Funzioni: nuove banche richiedono registrazione esplicita e test dei loro identificativi, non la duplicazione automatica dei quaranta quesiti.

Per aggiungere un laboratorio: scrivere prima il modello puro e i test, poi registrare il pannello e le grandezze in `src/app.js`. Dichiarare unità, dominio, ipotesi e sorgenti. Non scrivere risultati fissi nell’interfaccia.

## Rebuild degli asset tipografici

Non è necessario per avvio, test o build normale: tutti gli asset sono già inclusi. I comandi di sviluppo richiedono Python, Pillow, PyMuPDF, Playwright e Chromium installati. `render_pdf.py` ricrea le 769 pagine della dispensa di matematica; `render_pdf.py fis` ricrea le 726 pagine della dispensa di fisica dal PDF in `materials/`. I due documenti sono descritti in `src/documents.js`. `render_reader.py` usa il MathJax locale e produce tessere desktop/mobile. `make_atlas.py` crea glifi dai caratteri installati sul sistema: i file dei font non sono distribuiti. Ogni stile è rasterizzato a 2-3 volte la dimensione in pixel CSS, con metriche salvate in pixel CSS, e usa il proprio font per ogni carattere che contiene; DejaVu copre soltanto i caratteri mancanti. I percorsi predefiniti corrispondono all’ambiente Linux usato per questa consegna; si possono adattare nella tabella `fonts`.

`bundle.py` è un bundler minimale per il sottoinsieme ESM di questo progetto, impiegato per il collaudo in memoria. La distribuzione normale mantiene i moduli originali e il worker di tipo module. Non è un bundler universale per pacchetti npm.

## Accessibilità e limiti

Comandi semantici fuori schermo, focus visibile sul canvas, descrizioni delle due figure dei quiz, testo alternativo dei documenti e movimento riducibile sono inclusi. Non viene dichiarata conformità WCAG certificata. Il canvas non supporta selezione nativa dei paragrafi; usare Copia oppure la fonte PDF. Se la clipboard non è disponibile, viene esportato il testo.

Il layout è verificato a 1600×1000 e 390×844. Finestre molto basse/orientamento orizzontale di telefoni possono richiedere un ulteriore adattamento. Nelle viste cosmiche il milione di punti è fisso; la qualità modifica risoluzione interna ed effetti, senza implicare un frame rate garantito.

## Ambiente cosmico 1.4.0

`src/scene/cosmos.js` possiede il catalogo 3D condiviso, `cosmic-shader.js` il ray marching e l’estinzione, `minor-bodies.js` le geometrie di asteroidi e code cometarie. Vedere `COSMIC_ENVIRONMENT.md` per numeri, qualità, provenienza e limiti. Le texture NASA e le mesh dei biomi restano inalterate.
