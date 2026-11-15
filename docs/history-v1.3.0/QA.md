# Collaudo GAIA 1.3.0

Eseguito il 14 novembre 2026 sui sorgenti consegnati.

| Controllo | Risultato |
|---|---:|
| Test Node: contenuti, modelli, store, rotte, grafica, sistemi e camera | 81 / 81 |
| Riferimenti e risorse | 1.464 / 1.464 |
| Buffer di geometria: SHA-256, dimensioni, indici, normali, finitezza | 26 / 26 |
| Percorsi applicativi con eventi reali dell’app in DOM simulato | 11 / 11 |
| Fotogrammi riprodotti su EGL / OpenGL ES | 103 / 103, zero errori GL |
| Catture effettive incluse | 43 |
| Risorse della distribuzione servite su HTTP locale | 17 / 17 |

## Verifiche del milione e della navigazione

Il collaudo esegue l’app effettiva con un adattatore DOM in Node e acquisisce tutte le chiamate WebGL: shader, buffer, texture, ombre, riflessi, framebuffer e UI. In ogni fotogramma di galassia, sistema e orbita, comprese le transizioni, viene verificata la chiamata effettiva `drawArrays(POINTS, 0, 1000000)`. Il controllo non si basa sul testo del contatore. I test verificano anche che i 25 sistemi usino coordinate identiche a 25 stelle distinte del buffer.

Vengono inviati eventi pointerdown/move/up agli stessi gestori dell’app per controllare hover dopo 130 ms, blocco dietro i pannelli, trascinamento senza ingresso, clic singolo sul sistema, clic sul pianeta, ritorno con camera ripristinata, attivazione da tastiera e selezione/ingresso touch. Tutte le tre qualità mantengono il milione e la UI a piena risoluzione. I test della camera controllano continuità all’ingresso e all’uscita dal sistema.

I 103 fotogrammi vengono riprodotti in **OpenGL ES 3.2 Mesa 25.0.7 / llvmpipe**. Gli shader GLSL ES 3.00 sono compilati senza traduzione. Le 43 catture includono galassia, descrizioni, fasi degli zoom, sistema, orbita, ritorni, qualità ridotta, pianeti, tre superfici, ricerca, Daisyworld, teoria, PDF, quiz e viste mobile a 390 × 844. Le immagini provengono dalle chiamate effettive del renderer e non sostituiscono la scena nell’app.

`PRESERVATION.json` documenta il confronto byte per byte dei contenuti didattici, materiali, fonti, modelli scientifici e toolkit UI originali. Geometrie dei biomi e sorgenti Blender sono confrontati anche con la 1.1.0. Store e routing sono aggiornati per la nuova gerarchia, mantenendo schema e identificativi dei dati dell’utente.

## Nuovi controlli 1.3.0

- Conteggio da 5 a 12, casualità deterministica, cambiamento con un seed differente, quattro soli mondi esplorabili e quattro famiglie distinte per sistema.
- 232 corpi nel catalogo consegnato; undici famiglie, differenze di raggi, lune, anelli, inclinazioni ed eccentricità. Gli inviluppi planetari non si intersecano.
- Ogni destinazione esplorabile usa una mappa NASA di almeno 4096 pixel nativi. Dimensioni e hash di tutti i livelli PNG e dei buffer UV sono verificati.
- Limite di dimensione GPU rispettato; cache del dettaglio a due texture con rilascio delle risorse e ripiego sulla mappa NASA di base in caso di errore.
- Hover e clic sui corpi aggiuntivi, pulsante disabilitato e Invio non aprono una superficie. Le quattro destinazioni mantengono la navigazione completa.
- Replay delle mappe esterne su pianeti terrestri, desertici, glaciali, vulcanici, craterizzati, sistemi con cinque e dodici corpi e anelli.

## Limiti effettivi

Non è stato eseguito un nuovo collaudo completo nel browser: il percorso di navigazione locale richiesto non è disponibile nell’ambiente. Nessuna protezione è stata aggirata. Il replay EGL verifica shader e comandi grafici, ma non certifica differenze di comportamento del browser, prestazioni su GPU fisiche o persistenza dopo la chiusura. Storage, focus e input del collaudo applicativo usano un adattatore DOM: la prova sui dispositivi reali resta da effettuare. Non viene garantito un numero di FPS.

Le viste didattiche usano un fondale da 6.000 stelle, le superfici nessuna: il milione è mantenuto nelle viste cosmiche. La distribuzione stellare, le scale e le orbite sono illustrative, non un catalogo astronomico osservato.

I risultati delle versioni precedenti sono separati in `history-v1.0.0/`, `history-v1.1.0/` e `history-v1.2.0/` e non sono attribuiti alla nuova versione. Nessun sito è stato pubblicato.

## Ripetere

```sh
npm test
npm run check
npm run build
node scripts/http_smoke.mjs
```

Per acquisizione e replay servono Node, Python, numpy, Pillow e Mesa EGL:

```sh
node tools/capture_runtime.mjs
python tools/replay_egl.py
```

Per il test browser opzionale: avviare `npm start` e, in un altro terminale con Playwright e Chromium installati, eseguire `python scripts/qa_browser.py`. Questo script è aggiornato alla 1.3.0 e verificato sintatticamente, ma non eseguito in questa consegna. Usa HTTP normale e non modifica le protezioni del browser. `GAIA_URL` e `CHROMIUM_BIN` sono opzionali.

Log correnti: `TEST_NODE.log`, `CHECK.json`, `QA_EGL.json`, `QA_APPLICATION.json`, `HTTP_SMOKE.json`. Le catture sono in `previews/`.
