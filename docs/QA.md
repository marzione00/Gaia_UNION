# Collaudo GAIA 1.31.0

Eseguito il 18 novembre 2026 sul ramo `feat/spedizioni-20261118`, costruito sopra `main` alla versione 1.30.0 (pull request #31), con Node.js 22.

| Controllo | Comando | Risultato |
|---|---|---:|
| Test Node | `node --test tests/*.test.mjs` | 437 / 437 |
| Riferimenti e risorse | `node scripts/check.mjs` | 3878 / 3878 |
| Distribuzione `dist/` servita via HTTP | `node scripts/http_smoke.mjs` | 310 controlli |
| Flussi applicativi | `node tools/qa_application_curriculum.mjs` | 275 controlli |
| Atlante in Chromium | `python3 tools/qa_atlas_browser.py --root dist` | 23 controlli, 30 sistemi, 280 pianeti, 125 esplorabili |
| Lettore e spedizioni in Chromium | pulsante «Segna come risolto» nel capitolo «Radiazione termica e luce delle stelle»; pannello delle spedizioni, vista in orbita e vista del sistema a 1440 × 900, 390 × 844 e 320 × 568 | pulsante spento a soluzione chiusa, acceso dopo l'apertura, esercizio registrato nel salvataggio; nessun errore, nessuna sovrapposizione |

Log: `TEST_NODE.log`, `CHECK.log`, `BUILD.log`, `CHECK.json`, `HTTP_SMOKE.json`.

I test di `tests/expeditions.test.mjs` ricostruiscono le liste delle spedizioni dai 100 capitoli e controllano che ognuno dei 1928 esercizi stia in una sola spedizione, al suo livello; verificano il completamento e la riapertura di una spedizione, le domande dei percorsi di matematica, la pulizia del campo `solved` del salvataggio e lo stile dei testi. I flussi applicativi completano la spedizione in orbita di un capitolo di fisica, aprono il libro al primo esercizio della spedizione in superficie e completano con le domande del percorso la spedizione in orbita di «Disequazioni».

Collaudo precedente, 1.30.0 (18 novembre 2026, ramo `feat/nucleo-gaia-20261118`): 432 test Node, 3874 controlli di riferimenti e risorse, 308 controlli HTTP, 274 flussi applicativi; atlante con 30 sistemi e 125 pianeti esplorabili; Nucleo di Gaia, nave e scheda fisica in Chromium su tre formati, nessun errore.

## Integrazione continua

Il workflow `.github/workflows/pages.yml` esegue su `main` test, controllo delle risorse, build, verifiche HTTP, interazioni reali dell’atlante e pubblicazione su GitHub Pages. Il passo finale scarica dal sito pubblico `build-info.json` e il curriculum e verifica che corrispondano al commit appena pubblicato e ai corsi del curriculum, 125 dalla 1.26.0. L'ultima esecuzione su `main`, per l'unione della pull request #31 (`0da7dfb`), è riuscita.

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
