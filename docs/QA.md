# Collaudo GAIA 1.38.0

Eseguito il 19 novembre 2026 sul ramo `feat/stazioni-navi-20261119`, costruito sopra `main` alla versione 1.37.0 (pull request #39), con Node.js 22.

| Controllo | Comando | Risultato |
|---|---|---:|
| Test Node | `node --test tests/*.test.mjs` | 579 / 579 |
| Stazioni e navi | `node --test tests/craft.test.mjs` | 7 / 7 |
| Riferimenti e risorse | `node scripts/check.mjs` | 3919 / 3919 |
| Distribuzione `dist/` servita via HTTP | `node scripts/http_smoke.mjs` | 314 controlli |
| Flussi applicativi | `node tools/qa_application_curriculum.mjs` | 279 controlli |
| Atlante in Chromium | `python3 tools/qa_atlas_browser.py --root dist` | 23 controlli, 30 sistemi, 280 pianeti, 125 esplorabili |
| Catalogo in Chromium | 300 modelli costruiti e disegnati con il renderer del sito; vista 3D a 1280 × 800 e a 390 × 844 | nessun errore |

Log: `TEST_NODE.log`, `CHECK.log`, `BUILD.log`, `CHECK.json`, `HTTP_SMOKE.json`.

La versione aggiunge il generatore di stazioni e navi in `src/craft/`, il suo test e la descrizione in `docs/STAZIONI_NAVI.md`. Nessun modulo del sito importa ancora `src/craft/`, quindi mappa, percorsi e laboratori restano quelli della 1.37.0; il controllo delle risorse sale a 3919 voci perché esamina anche i sei moduli nuovi, con le loro 11 importazioni e l'assenza di `eval` e di Canvas 2D in ciascuno. Il catalogo è stato verificato disegnando i 300 modelli con `src/renderer.js` in Chromium con SwiftShader.

Collaudo precedente, 1.37.0 (18 novembre 2026, ramo `feat/livelli-biologia-20261118`): 572 test Node, 126 test dei livelli, 3896 controlli di riferimenti e risorse, 314 controlli HTTP, 279 flussi applicativi; lezione di biologia in Chromium a 1440 × 900 e a 390 × 844, nessun errore.

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
