# Collaudo GAIA 1.40.0

Eseguito il 19 novembre 2026 sul ramo `feat/universo-dinamico-20261119`, costruito sopra `main` alla versione 1.39.0 (pull request #41), con Node.js 22.

| Controllo | Comando | Risultato |
|---|---|---:|
| Test Node | `node --test tests/*.test.mjs` | 587 / 587 |
| Vita dei sistemi | `node --test tests/life.test.mjs` | 5 / 5 |
| Riferimenti e risorse | `node scripts/check.mjs` | 3931 / 3931 |
| Distribuzione `dist/` servita via HTTP | `node scripts/http_smoke.mjs` | 314 controlli |
| Flussi applicativi | `node tools/qa_application_curriculum.mjs` | 279 controlli |
| Atlante in Chromium | `python3 tools/qa_atlas_browser.py --root dist` | 23 controlli, 30 sistemi, 280 pianeti, 125 esplorabili |
| Traffico nel sito in Chromium | vista del sistema «Legami e molecole» e vista in orbita di «Geometria molecolare e VSEPR» a 1440 × 900 | nessun errore; navi in viaggio con scia, carico al porto visibile |

Log: `TEST_NODE.log`, `CHECK.log`, `BUILD.log`, `CHECK.json`, `HTTP_SMOKE.json`.

La versione aggiunge l'economia dei sistemi e il traffico delle navi (`src/craft/economy.js`, `src/craft/traffic.js`, `src/scene/world.js`, `src/app.js`); percorsi e laboratori restano quelli della 1.39.0. Il controllo delle risorse sale a 3931 voci per i due moduli nuovi e per le due importazioni aggiunte a `src/scene/world.js`. Una simulazione di 1200 s per ognuno dei 30 sistemi con tre semi muove tutte le 590 navi coinvolte, che passano in viaggio dal 35 al 65 % del tempo e restano ad almeno 2,73 raggi stellari dalla stella. Con SwiftShader la vista in orbita resta lenta, come nella 1.39.0; i tempi per fotogramma restano da misurare su GPU reali.

Collaudo precedente, 1.39.0 (19 novembre 2026, ramo `feat/stazioni-sistemi-20261119`): 582 test Node, 3 test delle stazioni nei sistemi, 3924 controlli di riferimenti e risorse, 314 controlli HTTP, 279 flussi applicativi, 23 controlli dell'atlante; stazioni nella vista del sistema e in orbita senza errori.

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
