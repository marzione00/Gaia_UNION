# Collaudo GAIA 1.39.0

Eseguito il 19 novembre 2026 sul ramo `feat/stazioni-sistemi-20261119`, costruito sopra `main` alla versione 1.38.0 (pull request #40), con Node.js 22.

| Controllo | Comando | Risultato |
|---|---|---:|
| Test Node | `node --test tests/*.test.mjs` | 582 / 582 |
| Stazioni nei sistemi | `node --test tests/stations.test.mjs` | 3 / 3 |
| Riferimenti e risorse | `node scripts/check.mjs` | 3924 / 3924 |
| Distribuzione `dist/` servita via HTTP | `node scripts/http_smoke.mjs` | 314 controlli |
| Flussi applicativi | `node tools/qa_application_curriculum.mjs` | 279 controlli |
| Atlante in Chromium | `python3 tools/qa_atlas_browser.py --root dist` | 23 controlli, 30 sistemi, 280 pianeti, 125 esplorabili |
| Stazioni nel sito in Chromium | vista del sistema a 1440 × 900 e a 390 × 844, vista in orbita di tre pianeti a 1440 × 900 | nessun errore; stazioni costruite e segnate |

Log: `TEST_NODE.log`, `CHECK.log`, `BUILD.log`, `CHECK.json`, `HTTP_SMOKE.json`.

La versione colloca le sei stazioni di ogni sistema nella vista del sistema e in orbita (`src/craft/placement.js`, `src/scene/world.js`, `src/app.js`); percorsi e laboratori restano quelli della 1.38.0. Il controllo delle risorse sale a 3924 voci per il modulo nuovo e per le due importazioni aggiunte a `src/scene/world.js`. Con SwiftShader, un renderer software, la vista in orbita disegna fra 0,13 e 0,2 fotogrammi al secondo con le stazioni e 0,2 senza, la vista di un sistema a 390 × 844 ne disegna 0,73 con le stazioni e 0,8 senza; questi tempi descrivono il renderer software e restano da misurare su GPU reali.

Collaudo precedente, 1.38.0 (19 novembre 2026, ramo `feat/stazioni-navi-20261119`): 579 test Node, 7 test di stazioni e navi, 3919 controlli di riferimenti e risorse, 314 controlli HTTP, 279 flussi applicativi, 23 controlli dell'atlante; i 300 modelli disegnati in Chromium senza errori.

## Integrazione continua

Il workflow `.github/workflows/pages.yml` esegue su `main` test, controllo delle risorse, build, verifiche HTTP, interazioni reali dell’atlante e pubblicazione su GitHub Pages. Il passo finale scarica dal sito pubblico `build-info.json` e il curriculum e verifica che corrispondano al commit appena pubblicato e ai corsi del curriculum, 125 dalla 1.26.0. L'ultima esecuzione su `main`, per l'unione della pull request #38 (`1e09dee`), è riuscita.

## Controllo del repository

- `main` ha un solo commit radice. Dei 42 rami presenti su GitHub, 41 sono interamente contenuti in `main`; l'unico con commit propri è il ramo di questo collaudo. Due rami senza pull request (`feat/accessible-atlas-20261115` e `feat/atlas-accessible-navigation-20261115`) puntano allo stesso commit, l’unione della pull request #3.
- Nessuna pull request o segnalazione aperta.
- Gli autori dei commit usano indirizzi noreply, di GitHub e di Anthropic.
- Due esecuzioni fallite nella storia di `main`, entrambe superate dai commit successivi: il primo tentativo di pubblicazione (`bacea5c`, errore in `configure-pages`) e l’unione della pull request #5 (`1d6c911`, verifica del sito pubblicato con un numero di versione fisso, corretta in `b7dc1e8`).
- Avvisi dell’integrazione continua sulla 1.20.0: quattro azioni giravano ancora su Node.js 20, deprecato. Nella 1.20.1 usano versioni su Node.js 24 (`configure-pages@v6`, `deploy-pages@v5`, `upload-artifact@v7`, `upload-pages-artifact@v5`).

## Limiti

- Nessuna prova su GPU fisiche, Safari o telefoni reali. I tempi per fotogramma misurati con SwiftShader, un renderer software, non rappresentano un dispositivo reale.
- Nessuna certificazione formale di accessibilità.
- Il replay dei comandi del renderer su EGL / OpenGL ES è stato eseguito l’ultima volta sulla 1.4.0: risultati e catture sono in `history-v1.4.0/`.
