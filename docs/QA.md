# Collaudo GAIA 1.35.0

Eseguito il 18 novembre 2026 sul ramo `feat/livelli-matematica-20261118`, costruito sopra `main` alla versione 1.34.0 (pull request #36), con Node.js 22.

| Controllo | Comando | Risultato |
|---|---|---:|
| Test Node | `node --test tests/*.test.mjs` | 497 / 497 |
| Livelli dei percorsi di chimica e di matematica | `node --test tests/levels.test.mjs` | 51 / 51 |
| Riferimenti e risorse | `node scripts/check.mjs` | 3896 / 3896 |
| Distribuzione `dist/` servita via HTTP | `node scripts/http_smoke.mjs` | 314 controlli |
| Flussi applicativi | `node tools/qa_application_curriculum.mjs` | 279 controlli |
| Atlante in Chromium | `python3 tools/qa_atlas_browser.py --root dist` | 23 controlli, 30 sistemi, 280 pianeti, 125 esplorabili |
| Lezione di matematica in Chromium | unità C04, tappa Capisci, livelli Base, Applica e Approfondisci a 1440 × 900 e a 390 × 844 | nessun errore; tre testi diversi, impaginati su più pagine |

Log: `TEST_NODE.log`, `CHECK.log`, `BUILD.log`, `CHECK.json`, `HTTP_SMOKE.json`.

La versione riscrive i testi dei 25 percorsi guidati di matematica; codice, modelli, attività e domande restano quelli della 1.34.0, salvo le note sulla narrazione delle 25 unità e le lunghezze minime per disciplina in `tests/levels.test.mjs`. Esempi e risultati vengono dalla dispensa o da calcoli riportati nel testo, date e notizie storiche sono confrontate con Gullberg; la regola dei tre livelli e i controlli sono in `docs/LIVELLI.md`.

Collaudo precedente, 1.34.0 (18 novembre 2026, ramo `feat/livelli-chimica-20261118`): 472 test Node, 26 test dei livelli, 3896 controlli di riferimenti e risorse, 314 controlli HTTP, 279 flussi applicativi; lezione di chimica in Chromium a 1440 × 900 e a 390 × 844, nessun errore.

## Integrazione continua

Il workflow `.github/workflows/pages.yml` esegue su `main` test, controllo delle risorse, build, verifiche HTTP, interazioni reali dell’atlante e pubblicazione su GitHub Pages. Il passo finale scarica dal sito pubblico `build-info.json` e il curriculum e verifica che corrispondano al commit appena pubblicato e ai corsi del curriculum, 125 dalla 1.26.0. L'ultima esecuzione su `main`, per l'unione della pull request #36 (`34518d8`), è riuscita.

## Controllo del repository

- `main` ha un solo commit radice. Dei 40 rami presenti su GitHub, 39 sono interamente contenuti in `main`; l'unico con commit propri è il ramo di questo collaudo. Due rami senza pull request (`feat/accessible-atlas-20261115` e `feat/atlas-accessible-navigation-20261115`) puntano allo stesso commit, l’unione della pull request #3.
- Nessuna pull request o segnalazione aperta.
- Gli autori dei commit usano indirizzi noreply, di GitHub e di Anthropic.
- Due esecuzioni fallite nella storia di `main`, entrambe superate dai commit successivi: il primo tentativo di pubblicazione (`bacea5c`, errore in `configure-pages`) e l’unione della pull request #5 (`1d6c911`, verifica del sito pubblicato con un numero di versione fisso, corretta in `b7dc1e8`).
- Avvisi dell’integrazione continua sulla 1.20.0: quattro azioni giravano ancora su Node.js 20, deprecato. Nella 1.20.1 usano versioni su Node.js 24 (`configure-pages@v6`, `deploy-pages@v5`, `upload-artifact@v7`, `upload-pages-artifact@v5`).

## Limiti

- Nessuna prova su GPU fisiche, Safari o telefoni reali. I tempi per fotogramma misurati con SwiftShader, un renderer software, non rappresentano un dispositivo reale.
- Nessuna certificazione formale di accessibilità.
- Il replay dei comandi del renderer su EGL / OpenGL ES è stato eseguito l’ultima volta sulla 1.4.0: risultati e catture sono in `history-v1.4.0/`.
