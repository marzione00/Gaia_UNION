# GAIA 1.6 — Orientamento e accessibilità dell’atlante

L’aggiornamento mantiene il milione di stelle, i 25 sistemi, i 100 nuclei guidati e i materiali scientifici esistenti. Non aggiunge immagini IA, texture o immagini usate al posto delle scene. Gli esagoni, la bussola e i collegamenti sono mesh 3D; testo e pannelli usano l’atlante tipografico GPU esistente.

## Nuovi controlli

- **Esagoni ECHO:** segnalatori persistenti sulle coordinate esistenti; contorno doppio per il sistema selezionato. Le etichette vengono disposte senza sovrapporsi e possono essere disattivate. La loro omissione non sposta o elimina la stella.
- **ELENCO / Ctrl o Cmd + K:** ricerca tra i 100 moduli, nomi, descrizioni, tag, discipline e identificativi ECHO. Selezionare un risultato centra la camera e non apre automaticamente una lezione. L’elenco rimane l’alternativa quando marcatori vicini si sovrappongono.
- **Scheda del sistema:** le quattro discipline sono indicate con testo. DETTAGLI offre tre livelli di spiegazione, tratti dai contenuti esistenti, e accesso diretto alla lezione. Su touch il primo tocco seleziona; ENTRA o un secondo tocco apre il sistema.
- **Bussola:** assi geometrici XYZ e indicatore direzionale per il sistema selezionato fuori campo. CENTRA lo riporta nell’area utile della mappa. La galassia è illustrativa, non un catalogo astrometrico.
- **ROTTE:** sette percorsi del curriculum; tubi tridimensionali connettono le tappe, senza alterare le coordinate. Le linee rappresentano relazioni didattiche, non orbite. NESSUNA ROTTA ripristina l’esplorazione libera.
- **RIPRENDI:** ultime dodici unità aperte e stato effettivo del diario: da esplorare, sistema visitato, percorso iniziato, esperimento registrato, percorso completato. Una semplice visita non assegna risposte corrette né certifica competenze.
- **GUIDA:** cinque passaggi opzionali, chiudibili con Escape e riapribili. Nessuna riproduzione obbligatoria o animazione lampeggiante.
- **ACCESSO / Alt+A:** testo al 100%, 120% o 140% nelle schede e nella lettura dei 100 nuclei; contrasto alto; movimento ridotto; etichette; rotazione verticale senza trascinamento. I controlli sotto la mappa consentono rotazione orizzontale e zoom. Home ripristina la vista.

## Persistenza e semantica

Preferenze e cronologia sono contenute nel diario JSON esistente, validato durante importazione e riapertura. Non c’è sincronizzazione cloud. Se lo storage è negato, la sessione resta utilizzabile e l’interfaccia invita a esportare il diario.

Le azioni hanno controlli nativi non visibili sincronizzati col canvas. Le descrizioni semantiche seguono la selezione, non ogni fotogramma. I pannelli modali rimuovono le azioni sottostanti dall’elenco attivabile; Escape li chiude. Il campo di ricerca nativo usa la tastiera del dispositivo, mentre il testo visibile è renderizzato in WebGL.

## Collaudo riproducibile

```sh
npm test
npm run check
npm run build
npm run test:http
node tools/qa_application_curriculum.mjs
xvfb-run -a python tools/qa_atlas_browser.py --root dist
```

L’ultimo comando richiede Playwright 1.57.0 con Chromium e un display virtuale; è eseguito anche nel workflow GitHub Actions. Non è una dipendenza di runtime e non richiede `npm install` per utilizzare GAIA.

I nuovi test Node includono ricerca, conservazione degli stati, camera, geometria, prevenzione delle sovrapposizioni e 168 combinazioni di layout (otto finestre, tre scale di testo e sette viste). `tools/capture_atlas.mjs` consente inoltre un replay EGL isolato dei nuovi elementi: non rappresenta una cattura browser dell’intera scena cosmica.

La pubblicazione richiede build, test e smoke browser riusciti. Il controllo HTTPS verifica i nuovi moduli, il curriculum e `build-info.json`, con versione e commit corrispondenti alla distribuzione.

## Limiti espliciti

I bersagli dei nuovi pannelli puntano a 44 CSS px; i marcatori hanno un’area di selezione di 48 CSS px. In zone stellari dense resta possibile la sovrapposizione dei marcatori: l’elenco permette una selezione precisa senza trascinamento. Non tutti i controlli storici dell’applicazione sono stati ridisegnati.

Il browser test usa Chromium e un’emulazione della viewport/touch; non sostituisce verifiche su iPhone/Safari, GPU fisiche e lettori di schermo reali. Nessuna dichiarazione di conformità WCAG viene rilasciata. I contenuti didattici conservano il precedente stato editoriale.

Riferimenti progettuali: W3C, Understanding SC 2.5.7 (Dragging Movements), SC 2.5.8 (Target Size Minimum), SC 2.5.5 (Target Size Enhanced); Playwright, Continuous Integration. Questi riferimenti orientano il progetto, non certificano l’applicazione.
