# Collaudo GAIA 1.47.0

Eseguito il 21 novembre 2026 sul ramo `feat/flotta-di-difesa-20261121`, costruito sopra `main` alla versione 1.46.0 (pull request #48), con Node.js 22.

| Controllo | Comando | Risultato |
|---|---|---:|
| Test Node | `node --test tests/*.test.mjs` | 620 / 620 |
| Flotta di difesa | `node --test tests/difesa.test.mjs` | 4 / 4 |
| Riferimenti e risorse | `node scripts/check.mjs` | 3974 / 3974 |
| Distribuzione `dist/` servita via HTTP | `node scripts/http_smoke.mjs` | 314 controlli |
| Flussi applicativi | `node tools/qa_application_curriculum.mjs` | 279 controlli |
| Atlante in Chromium | `python3 tools/qa_atlas_browser.py --root dist` | 23 controlli, 30 sistemi, 280 pianeti, 125 esplorabili |
| Modelli in Chromium | tavole delle 11 classi e delle 5 stazioni di difesa | tutti costruiti e disegnati |
| Sistema in Chromium | sistema di frontiera «Acidi, redox e carbonio» a 1600 × 1000 | nessun errore WebGL o di pagina; 22 stazioni di cui 5 di difesa, 40 navi di cui 11 di difesa |

Log: `TEST_NODE.log`, `CHECK.log`, `BUILD.log`, `CHECK.json`, `HTTP_SMOKE.json`.

La versione aggiunge la flotta di difesa (`src/craft/defence.js`), il suo stile (`src/craft/styles.js`), le voci del catalogo (`src/craft/catalog.js`), la linea di difesa (`src/craft/placement.js`), ricette e pattuglie (`src/craft/economy.js`) e le formazioni nella scena (`src/scene/world.js`); le altre stazioni restano dove erano. Le stazioni di difesa sono 84 e i modelli di nave 134; nella simulazione di 1200 s su 30 sistemi e tre semi le consegne salgono da 63 502 a 66 950.

Collaudo precedente, 1.46.0 (21 novembre 2026, ramo `feat/vita-dei-sistemi-20261121`): 616 test Node, 5 test della vita dei sistemi, 3968 controlli di riferimenti e risorse, 314 controlli HTTP, 279 flussi applicativi, 23 controlli dell'atlante; vista del sistema in Chromium senza errori.

## Integrazione continua

Il workflow `.github/workflows/pages.yml` esegue su `main` test, controllo delle risorse, build, verifiche HTTP, interazioni reali dell’atlante e pubblicazione su GitHub Pages. Il passo finale scarica dal sito pubblico `build-info.json` e il curriculum e verifica che corrispondano al commit appena pubblicato e ai corsi del curriculum, 125 dalla 1.26.0. L'ultima esecuzione su `main`, per l'unione della pull request #48 (`1cf2885`), è riuscita.

## Controllo del repository

- `main` ha un solo commit radice. Dei 52 rami presenti su GitHub con quello di questo collaudo, 51 sono interamente contenuti in `main`; l'unico con commit propri è il ramo di questo collaudo. Due rami senza pull request (`feat/accessible-atlas-20261115` e `feat/atlas-accessible-navigation-20261115`) puntano allo stesso commit, l’unione della pull request #3.
- Nessuna pull request o segnalazione aperta.
- Gli autori dei commit usano indirizzi noreply, di GitHub e di Anthropic.
- Due esecuzioni fallite nella storia di `main`, entrambe superate dai commit successivi: il primo tentativo di pubblicazione (`bacea5c`, errore in `configure-pages`) e l’unione della pull request #5 (`1d6c911`, verifica del sito pubblicato con un numero di versione fisso, corretta in `b7dc1e8`).
- Avvisi dell’integrazione continua sulla 1.20.0: quattro azioni giravano ancora su Node.js 20, deprecato. Nella 1.20.1 usano versioni su Node.js 24 (`configure-pages@v6`, `deploy-pages@v5`, `upload-artifact@v7`, `upload-pages-artifact@v5`).

## Limiti

- Nessuna prova su GPU fisiche, Safari o telefoni reali. I tempi per fotogramma misurati con SwiftShader, un renderer software, non rappresentano un dispositivo reale.
- Nessuna certificazione formale di accessibilità.
- Il replay dei comandi del renderer su EGL / OpenGL ES è stato eseguito l’ultima volta sulla 1.4.0: risultati e catture sono in `history-v1.4.0/`.
