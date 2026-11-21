# Collaudo GAIA 1.47.1

Eseguito il 21 novembre 2026 sul ramo `feat/scafi-difesa-20261121`, costruito sopra `main` alla versione 1.47.0 (pull request #49), con Node.js 22.

| Controllo | Comando | Risultato |
|---|---|---:|
| Test Node | `node --test tests/*.test.mjs` | 620 / 620 |
| Flotta di difesa | `node --test tests/difesa.test.mjs` | 4 / 4 |
| Riferimenti e risorse | `node scripts/check.mjs` | 3974 / 3974 |
| Distribuzione `dist/` servita via HTTP | `node scripts/http_smoke.mjs` | 314 controlli |
| Flussi applicativi | `node tools/qa_application_curriculum.mjs` | 279 controlli |
| Atlante in Chromium | `python3 tools/qa_atlas_browser.py --root dist` | 23 controlli, 30 sistemi, 280 pianeti, 125 esplorabili |
| Modelli in Chromium | tavole delle 11 classi di navi e delle 5 stazioni di difesa | tutte costruite e disegnate |
| Sistema in Chromium | sistema di frontiera «Acidi, redox e carbonio» a 1600 × 1000 | nessun errore WebGL o di pagina; 22 stazioni di cui 5 di difesa, 34 navi di cui 9 di difesa |

Log: `TEST_NODE.log`, `CHECK.log`, `BUILD.log`, `CHECK.json`, `HTTP_SMOKE.json`.

La versione ridisegna le navi di difesa, scure, spigolose e asimmetriche (`src/craft/defence.js`), e scurisce lo stile della flotta (`src/craft/styles.js`); stazioni, catalogo, linea di difesa, pattuglie ed economia restano quelli della 1.47.0. Una nave di difesa conta ora da 524 a 9118 triangoli, con mediana 1696.

Collaudo precedente, 1.47.0 (21 novembre 2026, ramo `feat/flotta-di-difesa-20261121`): 620 test Node, 4 test della flotta di difesa, 3974 controlli di riferimenti e risorse, 314 controlli HTTP, 279 flussi applicativi, 23 controlli dell'atlante; modelli e sistema di frontiera in Chromium senza errori.

## Integrazione continua

Il workflow `.github/workflows/pages.yml` esegue su `main` test, controllo delle risorse, build, verifiche HTTP, interazioni reali dell’atlante e pubblicazione su GitHub Pages. Il passo finale scarica dal sito pubblico `build-info.json` e il curriculum e verifica che corrispondano al commit appena pubblicato e ai corsi del curriculum, 125 dalla 1.26.0. L'ultima esecuzione su `main`, per l'unione della pull request #49 (`d6b582c`), è riuscita.

## Controllo del repository

- `main` ha un solo commit radice. Dei 53 rami presenti su GitHub con quello di questo collaudo, 52 sono interamente contenuti in `main`; l'unico con commit propri è il ramo di questo collaudo. Due rami senza pull request (`feat/accessible-atlas-20261115` e `feat/atlas-accessible-navigation-20261115`) puntano allo stesso commit, l’unione della pull request #3.
- Nessuna pull request o segnalazione aperta.
- Gli autori dei commit usano indirizzi noreply, di GitHub e di Anthropic.
- Due esecuzioni fallite nella storia di `main`, entrambe superate dai commit successivi: il primo tentativo di pubblicazione (`bacea5c`, errore in `configure-pages`) e l’unione della pull request #5 (`1d6c911`, verifica del sito pubblicato con un numero di versione fisso, corretta in `b7dc1e8`).
- Avvisi dell’integrazione continua sulla 1.20.0: quattro azioni giravano ancora su Node.js 20, deprecato. Nella 1.20.1 usano versioni su Node.js 24 (`configure-pages@v6`, `deploy-pages@v5`, `upload-artifact@v7`, `upload-pages-artifact@v5`).

## Limiti

- Nessuna prova su GPU fisiche, Safari o telefoni reali. I tempi per fotogramma misurati con SwiftShader, un renderer software, non rappresentano un dispositivo reale.
- Nessuna certificazione formale di accessibilità.
- Il replay dei comandi del renderer su EGL / OpenGL ES è stato eseguito l’ultima volta sulla 1.4.0: risultati e catture sono in `history-v1.4.0/`.
