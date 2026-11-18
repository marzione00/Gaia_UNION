# Collaudo GAIA 1.29.0

Eseguito il 18 novembre 2026 sul ramo `feat/nave-strumenti-20261118`, costruito sopra `main` alla versione 1.28.0 (pull request #29), con Node.js 22.

| Controllo | Comando | Risultato |
|---|---|---:|
| Test Node | `node --test tests/*.test.mjs` | 427 / 427 |
| Riferimenti e risorse | `node scripts/check.mjs` | 3870 / 3870 |
| Distribuzione `dist/` servita via HTTP | `node scripts/http_smoke.mjs` | 307 controlli |
| Flussi applicativi | `node tools/qa_application_curriculum.mjs` | 271 controlli |
| Atlante in Chromium | `python3 tools/qa_atlas_browser.py --root dist` | 23 controlli, 30 sistemi, 280 pianeti, 125 esplorabili |
| Nave e scheda fisica in Chromium | salvataggio con due strumenti a bordo, a 1440 × 900, 390 × 844 e 320 × 568 | nessun errore, nessuna sovrapposizione |

Log: `TEST_NODE.log`, `CHECK.log`, `BUILD.log`, `CHECK.json`, `HTTP_SMOKE.json`.

I test di `tests/instruments.test.mjs` ricostruiscono le sezioni dei sette capitoli da `content/atlas/instruments.json`, controllano che ogni riga della scheda fisica, salvo stella e orbita, abbia un solo strumento, che uno strumento salga a bordo soltanto con il percorso completato o con tutte le sezioni lette, che la modalità esploratore si conservi nel salvataggio e che il diario accetti i pianeti da 0 a 124. Il test del diario di esplorazione è aggiornato: fino alla 1.28.0 imponeva di scartare il pianeta 101, che esiste dalla 1.25.0. I flussi applicativi leggono il capitolo del radiometro e verificano che la scheda mostri luce e temperatura, che il diario registri la misura e che la nave conti uno strumento a bordo.

Collaudo precedente, 1.28.0 (18 novembre 2026, ramo `feat/mappa-scoperte-20261118`): 422 test Node, 3864 controlli di riferimenti e risorse, 305 controlli HTTP, 270 flussi applicativi; atlante con 30 sistemi e 125 pianeti esplorabili; mappa e diario in Chromium su tre formati, nessun errore.

## Integrazione continua

Il workflow `.github/workflows/pages.yml` esegue su `main` test, controllo delle risorse, build, verifiche HTTP, interazioni reali dell’atlante e pubblicazione su GitHub Pages. Il passo finale scarica dal sito pubblico `build-info.json` e il curriculum e verifica che corrispondano al commit appena pubblicato e ai corsi del curriculum, 125 dalla 1.26.0. L'ultima esecuzione su `main`, per l'unione della pull request #29 (`47b8633`), è riuscita.

## Controllo del repository

- `main` ha un solo commit radice. Dei 33 rami presenti su GitHub, 32 sono interamente contenuti in `main`; l'unico con commit propri è il ramo di questo collaudo. Due rami senza pull request (`feat/accessible-atlas-20261115` e `feat/atlas-accessible-navigation-20261115`) puntano allo stesso commit, l’unione della pull request #3.
- Nessuna pull request o segnalazione aperta.
- Gli autori dei commit usano indirizzi noreply, di GitHub e di Anthropic.
- Due esecuzioni fallite nella storia di `main`, entrambe superate dai commit successivi: il primo tentativo di pubblicazione (`bacea5c`, errore in `configure-pages`) e l’unione della pull request #5 (`1d6c911`, verifica del sito pubblicato con un numero di versione fisso, corretta in `b7dc1e8`).
- Avvisi dell’integrazione continua sulla 1.20.0: quattro azioni giravano ancora su Node.js 20, deprecato. Nella 1.20.1 usano versioni su Node.js 24 (`configure-pages@v6`, `deploy-pages@v5`, `upload-artifact@v7`, `upload-pages-artifact@v5`).

## Limiti

- Nessuna prova su GPU fisiche, Safari o telefoni reali. I tempi per fotogramma misurati con SwiftShader, un renderer software, non rappresentano un dispositivo reale.
- Nessuna certificazione formale di accessibilità.
- Il replay dei comandi del renderer su EGL / OpenGL ES è stato eseguito l’ultima volta sulla 1.4.0: risultati e catture sono in `history-v1.4.0/`.
