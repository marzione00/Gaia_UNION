# Collaudo GAIA 1.1.0

Eseguito il 14 novembre 2026 sui sorgenti consegnati.

| Controllo | Risultato |
|---|---:|
| Test Node: contenuti, modelli, store, rotte e nuova grafica | 64 / 64 |
| Riferimenti e risorse | 1.452 / 1.452 |
| Buffer di geometria: SHA-256, dimensioni, indici, normali, finitezza | 26 / 26 |
| Viste renderizzate con EGL / OpenGL ES | 13 / 13, zero errori GL |
| Risorse della distribuzione servite su HTTP locale | 12 / 12 |

Il collaudo esegue l'app effettiva con un adattatore DOM in Node, acquisisce tutte le chiamate WebGL (comprese ombre, riflessi, framebuffer e UI) e le riproduce in un contesto **OpenGL ES 3.2 Mesa 25.0.7 / llvmpipe**. Gli shader GLSL ES 3.00 sono compilati senza traduzione. La galassia è acquisita con un milione di punti. Le viste includono galassia, biosfera, pianeta oceanico, primordiale, tre superfici, ricerca, Daisyworld, teoria, PDF, quiz e superficie mobile 390 × 844.

La verifica delle etichette delle quattro stazioni usa le coordinate proiettate per ogni biome; la selezione geometrica è sensibile alle occlusioni fra i complessi. Le etichette e i quattro pulsanti restano disponibili. Il collaudo dell'app controlla anche selezione planetaria, presenza dei controlli e caricamento delle pagine.

## Limiti effettivi

Non è stato eseguito un nuovo collaudo completo nel browser: l'ambiente non consente il percorso di navigazione locale richiesto. Nessuna protezione è stata aggirata. Il replay EGL verifica shader e comandi grafici ma non certifica tutte le differenze del browser, le prestazioni su GPU fisiche o la persistenza dopo la chiusura. I test dello storage usano un'implementazione conforme simulata. La prova su dispositivi reali resta da effettuare.

I vecchi risultati Chromium della 1.0.0 sono separati in `history-v1.0.0/` e non sono attribuiti a questa versione. Nessun sito è stato pubblicato.

## Ripetere

```sh
npm test
npm run check
npm run build
```

Per il replay nativo servono Node, Python, numpy, Pillow e Mesa EGL:

```sh
node tools/capture_runtime.mjs
python tools/replay_egl.py
```

Per provare il browser sul proprio dispositivo, avviare `npm start` e, in un altro terminale con Playwright e Chromium installati, eseguire `python scripts/qa_browser.py`. Il test usa HTTP normale e non modifica le protezioni del browser. `GAIA_URL` e `CHROMIUM_BIN` sono opzionali.

Log correnti: `TEST_NODE.log`, `CHECK.json`, `QA_EGL.json`, `QA_APPLICATION.json`, `HTTP_SMOKE.json`. Le catture sono in `previews/`.
