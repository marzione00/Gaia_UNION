# Collaudo GAIA 1.33.0

Eseguito il 18 novembre 2026 sul ramo `feat/regioni-20261118`, costruito sopra `main` alla versione 1.32.0 (pull request #33), con Node.js 22.

| Controllo | Comando | Risultato |
|---|---|---:|
| Test Node | `node --test tests/*.test.mjs` | 446 / 446 |
| Riferimenti e risorse | `node scripts/check.mjs` | 3896 / 3896 |
| Distribuzione `dist/` servita via HTTP | `node scripts/http_smoke.mjs` | 314 controlli |
| Flussi applicativi | `node tools/qa_application_curriculum.mjs` | 279 controlli |
| Atlante in Chromium | `python3 tools/qa_atlas_browser.py --root dist` | 23 controlli, 30 sistemi, 280 pianeti, 125 esplorabili |
| Regioni, mappa e mondi di sintesi in Chromium | mappa con il pulsante della regione e il Nucleo al centro, le tre schede di una regione, i mondi di sintesi e l'avamposto, a 1440 × 900, 390 × 844 e 320 × 568 | nessun errore; il pulsante del Nucleo resta nascosto a 320 × 568, dove coprirebbe quello della regione |

Log: `TEST_NODE.log`, `CHECK.log`, `BUILD.log`, `CHECK.json`, `HTTP_SMOKE.json`.

I test di `tests/regions.test.mjs` controllano aree, unità e nubi dei quattro bracci, la divisione dei 147 passaggi in 78 corsie e 69 porte di salto, l'apertura di una porta con una sezione letta, la formula di Gough per il Sole giovane, il risultato del modello per la Terra dell'Archeano, i dati di Venere e Marte rispetto alle schede NASA e ai valori dello squilibrio, la registrazione delle visite e lo stile dei testi. `tests/cosmos.test.mjs` controlla ora che ogni sistema appartenga alla nube del suo braccio. I flussi applicativi aprono la regione dall'avamposto, tornano alla mappa con il braccio evidenziato e visitano due mondi di sintesi. Resta da correggere la sovrapposizione preesistente della vista del sistema a 320 × 568, segnalata nel collaudo della 1.32.0.

Collaudo precedente, 1.32.0 (18 novembre 2026, ramo `feat/avamposti-20261118`): 441 test Node, 3884 controlli di riferimenti e risorse, 312 controlli HTTP, 276 flussi applicativi; atlante con 30 sistemi e 125 pianeti esplorabili; avamposti e vista del sistema in Chromium su tre formati, nessun errore nei nuovi elementi.

## Integrazione continua

Il workflow `.github/workflows/pages.yml` esegue su `main` test, controllo delle risorse, build, verifiche HTTP, interazioni reali dell’atlante e pubblicazione su GitHub Pages. Il passo finale scarica dal sito pubblico `build-info.json` e il curriculum e verifica che corrispondano al commit appena pubblicato e ai corsi del curriculum, 125 dalla 1.26.0. L'ultima esecuzione su `main`, per l'unione della pull request #33 (`3d656b1`), è riuscita.

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
