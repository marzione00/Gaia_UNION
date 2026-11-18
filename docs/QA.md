# Collaudo GAIA 1.32.0

Eseguito il 18 novembre 2026 sul ramo `feat/avamposti-20261118`, costruito sopra `main` alla versione 1.31.0 (pull request #32), con Node.js 22.

| Controllo | Comando | Risultato |
|---|---|---:|
| Test Node | `node --test tests/*.test.mjs` | 441 / 441 |
| Riferimenti e risorse | `node scripts/check.mjs` | 3884 / 3884 |
| Distribuzione `dist/` servita via HTTP | `node scripts/http_smoke.mjs` | 312 controlli |
| Flussi applicativi | `node tools/qa_application_curriculum.mjs` | 276 controlli |
| Atlante in Chromium | `python3 tools/qa_atlas_browser.py --root dist` | 23 controlli, 30 sistemi, 280 pianeti, 125 esplorabili |
| Avamposti in Chromium | le tre schede di un avamposto costruito e la vista del sistema con il pulsante dell'avamposto o del cantiere, a 1440 × 900, 390 × 844 e 320 × 568 | nessun errore, nessuna sovrapposizione nei nuovi elementi |

Log: `TEST_NODE.log`, `CHECK.log`, `BUILD.log`, `CHECK.json`, `HTTP_SMOKE.json`.

I test di `tests/outposts.test.mjs` ricostruiscono le 1554 sezioni dei capitoli e le confrontano con quelle degli strumenti, controllano che i 30 avamposti coprano 125 unità e 325 spedizioni, che la prima spedizione completata costruisca l'avamposto della sua area e soltanto quello, e che sezioni lette, tappe dei percorsi, misure, discese e passaggi aperti entrino nel riepilogo. I flussi applicativi entrano nell'avamposto dalla vista del sistema, aprono da lì le spedizioni di un pianeta e il laboratorio di un percorso, e verificano il cantiere di un'area senza spedizioni. Sul telefono di 320 × 568 la vista del sistema mostra sovrapposizioni preesistenti fra sottotitolo, numeri dei pianeti e scheda dell'unità, presenti anche nella 1.31.0.

Collaudo precedente, 1.31.0 (18 novembre 2026, ramo `feat/spedizioni-20261118`): 437 test Node, 3878 controlli di riferimenti e risorse, 310 controlli HTTP, 275 flussi applicativi; atlante con 30 sistemi e 125 pianeti esplorabili; lettore e spedizioni in Chromium su tre formati, nessun errore.

## Integrazione continua

Il workflow `.github/workflows/pages.yml` esegue su `main` test, controllo delle risorse, build, verifiche HTTP, interazioni reali dell’atlante e pubblicazione su GitHub Pages. Il passo finale scarica dal sito pubblico `build-info.json` e il curriculum e verifica che corrispondano al commit appena pubblicato e ai corsi del curriculum, 125 dalla 1.26.0. L'ultima esecuzione su `main`, per l'unione della pull request #32 (`f949203`), è riuscita.

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
