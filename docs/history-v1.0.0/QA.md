# Collaudo GAIA — Beyond Knowledge 1.0.0

Eseguito il 14 novembre 2026 sui sorgenti consegnati. Non è una certificazione di sicurezza, accessibilità o prestazioni hardware.

## Risultati effettivi

| Gruppo | Superati | Che cosa misura |
|---|---:|---|
| Test automatici Node | 57/57 | Modelli matematici, Daisyworld, geometria, contenuti, storage e rotte |
| Controlli interattivi Chromium | 75/75 | Scene, comandi canvas, lettura, grafici, quiz, diario, errori e viste strette |
| Controlli di riferimenti e risorse | 1445/1445 | Integrità strutturale: non sono altrettanti test funzionali |
| Richieste HTTP locali indipendenti | 16/16 | Disponibilità e MIME delle risorse del server |

Nessuna eccezione JavaScript non gestita, nessun errore console, nessuna texture mancante e `gl.getError() = 0` al termine del percorso principale. La perdita del contesto viene provocata soltanto dopo questi controlli per verificare il messaggio d'errore.

## Rendering realmente verificato

`WebGL 2.0 (OpenGL ES 3.0 Chromium)`

`ANGLE (Google, Vulkan 1.3.0 (SwiftShader Device (Subzero) (0x0000C0DE)), SwiftShader driver)`

Il primo screenshot e il primo controllo hanno **1.000.000 di punti disegnati**. In seguito il test seleziona esplicitamente 60.000 punti per ridurre il carico del dispositivo software. Le catture successive non documentano prestazioni con un milione di punti. La geometria contiene 100 pianeti-unità, la superficie 875 esagoni.

È stato intercettato `HTMLCanvasElement.getContext`: a runtime sono richiesti soltanto contesti `webgl2`, mai `2d`. I documenti, le formule e i glifi usano texture tipografiche precalcolate e triangoli WebGL. Non sono immagini generate con IA; le lettere non sono solidi estrusi. Il messaggio di errore per WebGL assente/perso è HTML dichiarato, non un renderer sostitutivo.

## Percorso interattivo

Selezione dei settori; trascinamento e zoom; picking dei pianeti tramite coordinate proiettate; orbita, superficie e ricerca; cronologia Indietro; ricerca globale; vecchio collegamento V7 a Funzioni 8.9; scorrimento, pagina originale, passaggio all'ultima pagina; sette laboratori; variazione dei parametri; scenari A/B; JSON; tre basi delle trasformazioni e fattore orizzontale; radice di un quadrato; quiz con figura, allenamento e correzione, verifica senza soluzioni anticipate; diario, esportazione e importazioni valide/non valide; livello semantico e perdita del contesto.

A 390 × 844 sono state controllate sei scene principali e tutti i sei laboratori matematici: nessun comando censito oltre i bordi del viewport. Questa verifica geometrica non equivale a una prova su tutti i telefoni, sulle tastiere software o su tutti gli zoom del sistema.

## Ambiente e limiti

- **GPU software SwiftShader**, non GPU fisica. Non si garantiscono FPS, memoria o compatibilità su hardware non provato.
- La navigazione HTTP del browser è bloccata nell'ambiente di lavoro. I test grafici usano una **fixture in memoria** con gli stessi moduli compilati e asset del pacchetto, più worker Blob. Il server locale viene provato separatamente tramite richieste Python: non si afferma di avere collaudato end-to-end il browser su HTTP.
- Lo storage persistente non è disponibile nell'origine della fixture. La persistenza e la migrazione sono provate con storage conforme simulato nei test Node; la memoria di sessione/import-export sono provate nel browser. La persistenza dopo la chiusura del browser richiede un'origine HTTP reale sul dispositivo destinatario.
- Il livello semantico, il focus e la tastiera sono presenti, ma **non c'è una certificazione formale di accessibilità** né un collaudo con tutti gli screen reader. Per il testo il canvas offre il comando Copia/Esporta, non la selezione nativa per trascinamento.
- Il modello Daisyworld usa ipotesi e parametri dichiarati, con controlli numerici: non è un modello climatico validato della Terra. La superficie è illustrativa e non è una simulazione spaziale del modello.
- La dispensa è integralmente inclusa; le lezioni narrative web sono quattro (33 sezioni) e i quesiti interattivi 40. Altri contenuti matematici si consultano nella fonte originale. Le 75 unità non matematiche sono dichiarate in preparazione.
- Nessun agente indipendente è stato avviato: verifiche per aree distinte e test automatizzati, non revisioni multiagente simulate.
- Nessun sito è stato pubblicato e nessun workflow GitHub remoto è stato eseguito.

## Come ripetere i controlli

```sh
npm test
npm run check
npm run build
npm start
```

Il test grafico opzionale richiede Python, Playwright e Chromium:

```sh
python scripts/qa_browser.py
```

`CHROMIUM_BIN` può indicare l'eseguibile Chromium. Nell'ambiente utilizzato è stato necessario un display virtuale Xvfb, esposto con `DISPLAY=:99`, perché ANGLE inizializza il display anche nel percorso headless. Non disabilitare protezioni del browser per forzare WebGL: quando non è disponibile, verificare le impostazioni grafiche del proprio ambiente o usare la fonte PDF.

Log: `TEST_NODE.log`, `TEST_BROWSER.log`, `QA_BROWSER.json`, `CHECK.json`, `HTTP_SMOKE.json`. L'integrità delle dieci copie di fonte è registrata in `CONTENT_PROVENANCE.json`.
