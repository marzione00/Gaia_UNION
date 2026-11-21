# Collaudo GAIA 1.43.0

Eseguito il 21 novembre 2026 sul ramo `feat/stazioni-nei-sistemi-20261121`, costruito sopra `main` alla versione 1.42.0 (pull request #44), con Node.js 22.

| Controllo | Comando | Risultato |
|---|---|---:|
| Test Node | `node --test tests/*.test.mjs` | 602 / 602 |
| Stazioni aggiunte | `node --test tests/added.test.mjs` | 3 / 3 |
| Riferimenti e risorse | `node scripts/check.mjs` | 3960 / 3960 |
| Distribuzione `dist/` servita via HTTP | `node scripts/http_smoke.mjs` | 314 controlli |
| Flussi applicativi | `node tools/qa_application_curriculum.mjs` | 279 controlli |
| Atlante in Chromium | `python3 tools/qa_atlas_browser.py --root dist` | 23 controlli, 30 sistemi, 280 pianeti, 125 esplorabili |
| Sistema con 20 stazioni in Chromium | `?diagnostica`, vista del sistema «Chimica prebiotica» e vista in orbita di «Miller-Urey e la sintesi prebiotica» a 1440 × 900 | nessun errore WebGL o di pagina; 20 stazioni e 13-14 navi, 24-28 modelli costruiti nel worker, 0 falliti |

Log: `TEST_NODE.log`, `CHECK.log`, `BUILD.log`, `CHECK.json`, `HTTP_SMOKE.json`.

La versione porta nei sistemi 300 stazioni della grammatica dei tipi (`src/craft/catalog.js`, `src/craft/placement.js`, `src/craft/economy.js`, `src/craft/factory.js`, `src/scene/world.js`); percorsi e laboratori restano quelli della 1.42.0. Il controllo delle risorse sale a 3960 voci per la nuova importazione in `src/craft/catalog.js`. Le sei stazioni classiche di ogni sistema restano dove erano. Una simulazione di 1200 s per ognuno dei 30 sistemi con tre semi muove tutte le 1149 navi coinvolte, contro 581 con le sole stazioni classiche, e le consegne salgono da 12 833 a 32 734. Con SwiftShader la vista del sistema con 20 stazioni disegna 59 chiamate e 85 164 triangoli di stazioni e navi, con 15,5-20,8 ms di disegno sul processore per fotogramma nelle due prove.

Collaudo precedente, 1.42.0 (21 novembre 2026, ramo `feat/grammatica-stazioni-20261121`): 599 test Node, 5 test della grammatica dei tipi, 3959 controlli di riferimenti e risorse, 314 controlli HTTP, 279 flussi applicativi, 23 controlli dell'atlante; 120 tipi disegnati in Chromium senza errori.

## Integrazione continua

Il workflow `.github/workflows/pages.yml` esegue su `main` test, controllo delle risorse, build, verifiche HTTP, interazioni reali dell’atlante e pubblicazione su GitHub Pages. Il passo finale scarica dal sito pubblico `build-info.json` e il curriculum e verifica che corrispondano al commit appena pubblicato e ai corsi del curriculum, 125 dalla 1.26.0. L'ultima esecuzione su `main`, per l'unione della pull request #44 (`b825afa`), è riuscita.

## Controllo del repository

- `main` ha un solo commit radice. Dei 48 rami presenti su GitHub con quello di questo collaudo, 47 sono interamente contenuti in `main`; l'unico con commit propri è il ramo di questo collaudo. Due rami senza pull request (`feat/accessible-atlas-20261115` e `feat/atlas-accessible-navigation-20261115`) puntano allo stesso commit, l’unione della pull request #3.
- Nessuna pull request o segnalazione aperta.
- Gli autori dei commit usano indirizzi noreply, di GitHub e di Anthropic.
- Due esecuzioni fallite nella storia di `main`, entrambe superate dai commit successivi: il primo tentativo di pubblicazione (`bacea5c`, errore in `configure-pages`) e l’unione della pull request #5 (`1d6c911`, verifica del sito pubblicato con un numero di versione fisso, corretta in `b7dc1e8`).
- Avvisi dell’integrazione continua sulla 1.20.0: quattro azioni giravano ancora su Node.js 20, deprecato. Nella 1.20.1 usano versioni su Node.js 24 (`configure-pages@v6`, `deploy-pages@v5`, `upload-artifact@v7`, `upload-pages-artifact@v5`).

## Limiti

- Nessuna prova su GPU fisiche, Safari o telefoni reali. I tempi per fotogramma misurati con SwiftShader, un renderer software, non rappresentano un dispositivo reale.
- Nessuna certificazione formale di accessibilità.
- Il replay dei comandi del renderer su EGL / OpenGL ES è stato eseguito l’ultima volta sulla 1.4.0: risultati e catture sono in `history-v1.4.0/`.
