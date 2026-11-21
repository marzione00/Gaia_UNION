# Collaudo GAIA 1.41.0

Eseguito il 21 novembre 2026 sul ramo `feat/motore-flotte-20261121`, costruito sopra `main` alla versione 1.40.0 (pull request #42), con Node.js 22.

| Controllo | Comando | Risultato |
|---|---|---:|
| Test Node | `node --test tests/*.test.mjs` | 594 / 594 |
| Motore delle flotte | `node --test tests/engine.test.mjs` | 7 / 7 |
| Riferimenti e risorse | `node scripts/check.mjs` | 3945 / 3945 |
| Distribuzione `dist/` servita via HTTP | `node scripts/http_smoke.mjs` | 314 controlli |
| Flussi applicativi | `node tools/qa_application_curriculum.mjs` | 279 controlli |
| Atlante in Chromium | `python3 tools/qa_atlas_browser.py --root dist` | 23 controlli, 30 sistemi, 280 pianeti, 125 esplorabili |
| Motore nel sito in Chromium | `?diagnostica`, vista del sistema «Legami e molecole» e vista in orbita di «Geometria molecolare e VSEPR» a 1440 × 900 | nessun errore WebGL o di pagina; modelli costruiti nel worker, 0 falliti; pannello diagnostico aggiornato |
| Istanze contro matrice singola | stessa nave vicina disegnata nei due modi | differenza massima di 2 livelli su 255 per pixel |

Log: `TEST_NODE.log`, `CHECK.log`, `BUILD.log`, `CHECK.json`, `HTTP_SMOKE.json`.

La versione cambia il modo di disegnare stazioni e navi (`src/craft/kit.js`, `src/craft/parts.js`, `src/craft/catalog.js`, `src/scene/world.js`, `src/scene/shaders.js`, `src/renderer.js`) e aggiunge la pagina diagnostica (`src/ui/diagnostics.js`, `src/app.js`); percorsi, laboratori ed economia restano quelli della 1.40.0. Il controllo delle risorse sale a 3945 voci per i quattro moduli nuovi e le loro importazioni. Sul catalogo il modello semplificato ha il 28,9 % dei triangoli del completo. Un fotogramma della vista in orbita passa da 125 a 66 chiamate di disegno e da 301 528 a 265 162 triangoli, quello della vista del sistema da 83 a 76 chiamate e da 234 008 a 165 642 triangoli; le navi presenti cambiano a ogni avvio, quindi i confronti sono indicativi. Con SwiftShader la vista del sistema procede a circa 0,2 fotogrammi al secondo con 14 ms di disegno sul processore per fotogramma; la pagina diagnostica serve a misurare le GPU reali.

Collaudo precedente, 1.40.0 (19 novembre 2026, ramo `feat/universo-dinamico-20261119`): 587 test Node, 5 test della vita dei sistemi, 3931 controlli di riferimenti e risorse, 314 controlli HTTP, 279 flussi applicativi, 23 controlli dell'atlante; 590 navi in movimento nella simulazione di 1200 s su 30 sistemi e tre semi.

## Integrazione continua

Il workflow `.github/workflows/pages.yml` esegue su `main` test, controllo delle risorse, build, verifiche HTTP, interazioni reali dell’atlante e pubblicazione su GitHub Pages. Il passo finale scarica dal sito pubblico `build-info.json` e il curriculum e verifica che corrispondano al commit appena pubblicato e ai corsi del curriculum, 125 dalla 1.26.0. L'ultima esecuzione su `main`, per l'unione della pull request #42 (`8af8a47`), è riuscita.

## Controllo del repository

- `main` ha un solo commit radice. Dei 46 rami presenti su GitHub con quello di questo collaudo, 45 sono interamente contenuti in `main`; l'unico con commit propri è il ramo di questo collaudo. Due rami senza pull request (`feat/accessible-atlas-20261115` e `feat/atlas-accessible-navigation-20261115`) puntano allo stesso commit, l’unione della pull request #3.
- Nessuna pull request o segnalazione aperta.
- Gli autori dei commit usano indirizzi noreply, di GitHub e di Anthropic.
- Due esecuzioni fallite nella storia di `main`, entrambe superate dai commit successivi: il primo tentativo di pubblicazione (`bacea5c`, errore in `configure-pages`) e l’unione della pull request #5 (`1d6c911`, verifica del sito pubblicato con un numero di versione fisso, corretta in `b7dc1e8`).
- Avvisi dell’integrazione continua sulla 1.20.0: quattro azioni giravano ancora su Node.js 20, deprecato. Nella 1.20.1 usano versioni su Node.js 24 (`configure-pages@v6`, `deploy-pages@v5`, `upload-artifact@v7`, `upload-pages-artifact@v5`).

## Limiti

- Nessuna prova su GPU fisiche, Safari o telefoni reali. I tempi per fotogramma misurati con SwiftShader, un renderer software, non rappresentano un dispositivo reale.
- Nessuna certificazione formale di accessibilità.
- Il replay dei comandi del renderer su EGL / OpenGL ES è stato eseguito l’ultima volta sulla 1.4.0: risultati e catture sono in `history-v1.4.0/`.
