# Collaudo GAIA 1.42.0

Eseguito il 21 novembre 2026 sul ramo `feat/grammatica-stazioni-20261121`, costruito sopra `main` alla versione 1.41.0 (pull request #43), con Node.js 22.

| Controllo | Comando | Risultato |
|---|---|---:|
| Test Node | `node --test tests/*.test.mjs` | 599 / 599 |
| Grammatica dei tipi | `node --test tests/grammar.test.mjs` | 5 / 5 |
| Riferimenti e risorse | `node scripts/check.mjs` | 3959 / 3959 |
| Distribuzione `dist/` servita via HTTP | `node scripts/http_smoke.mjs` | 314 controlli |
| Flussi applicativi | `node tools/qa_application_curriculum.mjs` | 279 controlli |
| Atlante in Chromium | `python3 tools/qa_atlas_browser.py --root dist` | 23 controlli, 30 sistemi, 280 pianeti, 125 esplorabili |
| Tipi disegnati in Chromium | i 120 tipi nello stile civile e 4 tipi nei cinque stili, con il renderer del sito | nessun errore |

Log: `TEST_NODE.log`, `CHECK.log`, `BUILD.log`, `CHECK.json`, `HTTP_SMOKE.json`.

La versione aggiunge la grammatica dei tipi di stazione (`src/craft/modules.js`, `src/craft/families.js`, `src/craft/grammar.js`) e la registra nel catalogo (`src/craft/catalog.js`); sistemi, economia, percorsi e laboratori restano quelli della 1.41.0, perché i nuovi tipi entreranno nei sistemi con la 1.43.0. Il controllo delle risorse sale a 3959 voci per i tre moduli nuovi e le loro importazioni. Su 600 modelli (120 tipi nei cinque stili) un tipo conta da 3248 a 28 752 triangoli, con mediana 11 102; nelle sagome proiettate da tre lati due tipi della stessa famiglia si sovrappongono al massimo per lo 0,81 della loro unione, due tipi di famiglie diverse al massimo per lo 0,69.

Collaudo precedente, 1.41.0 (21 novembre 2026, ramo `feat/motore-flotte-20261121`): 594 test Node, 7 test del motore, 3945 controlli di riferimenti e risorse, 314 controlli HTTP, 279 flussi applicativi, 23 controlli dell'atlante; modelli costruiti nel worker, nave a istanze uguale alla nave con la propria matrice entro 2 livelli su 255.

## Integrazione continua

Il workflow `.github/workflows/pages.yml` esegue su `main` test, controllo delle risorse, build, verifiche HTTP, interazioni reali dell’atlante e pubblicazione su GitHub Pages. Il passo finale scarica dal sito pubblico `build-info.json` e il curriculum e verifica che corrispondano al commit appena pubblicato e ai corsi del curriculum, 125 dalla 1.26.0. L'ultima esecuzione su `main`, per l'unione della pull request #43 (`c075253`), è riuscita.

## Controllo del repository

- `main` ha un solo commit radice. Dei 47 rami presenti su GitHub con quello di questo collaudo, 46 sono interamente contenuti in `main`; l'unico con commit propri è il ramo di questo collaudo. Due rami senza pull request (`feat/accessible-atlas-20261115` e `feat/atlas-accessible-navigation-20261115`) puntano allo stesso commit, l’unione della pull request #3.
- Nessuna pull request o segnalazione aperta.
- Gli autori dei commit usano indirizzi noreply, di GitHub e di Anthropic.
- Due esecuzioni fallite nella storia di `main`, entrambe superate dai commit successivi: il primo tentativo di pubblicazione (`bacea5c`, errore in `configure-pages`) e l’unione della pull request #5 (`1d6c911`, verifica del sito pubblicato con un numero di versione fisso, corretta in `b7dc1e8`).
- Avvisi dell’integrazione continua sulla 1.20.0: quattro azioni giravano ancora su Node.js 20, deprecato. Nella 1.20.1 usano versioni su Node.js 24 (`configure-pages@v6`, `deploy-pages@v5`, `upload-artifact@v7`, `upload-pages-artifact@v5`).

## Limiti

- Nessuna prova su GPU fisiche, Safari o telefoni reali. I tempi per fotogramma misurati con SwiftShader, un renderer software, non rappresentano un dispositivo reale.
- Nessuna certificazione formale di accessibilità.
- Il replay dei comandi del renderer su EGL / OpenGL ES è stato eseguito l’ultima volta sulla 1.4.0: risultati e catture sono in `history-v1.4.0/`.
