# Collaudo GAIA 1.46.0

Eseguito il 21 novembre 2026 sul ramo `feat/vita-dei-sistemi-20261121`, costruito sopra `main` alla versione 1.45.0 (pull request #47), con Node.js 22.

| Controllo | Comando | Risultato |
|---|---|---:|
| Test Node | `node --test tests/*.test.mjs` | 616 / 616 |
| Vita dei sistemi | `node --test tests/vita.test.mjs` | 5 / 5 |
| Riferimenti e risorse | `node scripts/check.mjs` | 3968 / 3968 |
| Distribuzione `dist/` servita via HTTP | `node scripts/http_smoke.mjs` | 314 controlli |
| Flussi applicativi | `node tools/qa_application_curriculum.mjs` | 279 controlli |
| Atlante in Chromium | `python3 tools/qa_atlas_browser.py --root dist` | 23 controlli, 30 sistemi, 280 pianeti, 125 esplorabili |
| Sistema in Chromium | vista del sistema «Legami e molecole» a 1600 × 1000, orologio avanzato di 900 s | nessun errore WebGL o di pagina; 16 stazioni (6 al secondo livello), 26 navi, 31 luci di traffico minore, cronaca con quattro notizie |

Log: `TEST_NODE.log`, `CHECK.log`, `BUILD.log`, `CHECK.json`, `HTTP_SMOKE.json`.

La versione estende l'economia (`src/craft/economy.js`) con crescita delle stazioni, vari dei cantieri, convogli e cronaca, e la scena (`src/scene/world.js`, `src/app.js`) con convogli, stazioni cresciute, traffico minore e cronaca; modelli, collocamento, percorsi e laboratori restano quelli della 1.45.0. Nella simulazione di 1200 s su 30 sistemi e tre semi vengono varate 210 navi, arrivano 1218 convogli, 649 stazioni su 1440 crescono almeno di un livello e le consegne salgono da 59 453 a 63 502.

Collaudo precedente, 1.45.0 (21 novembre 2026, ramo `feat/economia-20261121`): 611 test Node, 3 test dell'economia, 3968 controlli di riferimenti e risorse, 314 controlli HTTP, 279 flussi applicativi, 23 controlli dell'atlante; vista del sistema in Chromium senza errori.

## Integrazione continua

Il workflow `.github/workflows/pages.yml` esegue su `main` test, controllo delle risorse, build, verifiche HTTP, interazioni reali dell’atlante e pubblicazione su GitHub Pages. Il passo finale scarica dal sito pubblico `build-info.json` e il curriculum e verifica che corrispondano al commit appena pubblicato e ai corsi del curriculum, 125 dalla 1.26.0. L'ultima esecuzione su `main`, per l'unione della pull request #47 (`7f3e116`), è riuscita.

## Controllo del repository

- `main` ha un solo commit radice. Dei 51 rami presenti su GitHub con quello di questo collaudo, 50 sono interamente contenuti in `main`; l'unico con commit propri è il ramo di questo collaudo. Due rami senza pull request (`feat/accessible-atlas-20261115` e `feat/atlas-accessible-navigation-20261115`) puntano allo stesso commit, l’unione della pull request #3.
- Nessuna pull request o segnalazione aperta.
- Gli autori dei commit usano indirizzi noreply, di GitHub e di Anthropic.
- Due esecuzioni fallite nella storia di `main`, entrambe superate dai commit successivi: il primo tentativo di pubblicazione (`bacea5c`, errore in `configure-pages`) e l’unione della pull request #5 (`1d6c911`, verifica del sito pubblicato con un numero di versione fisso, corretta in `b7dc1e8`).
- Avvisi dell’integrazione continua sulla 1.20.0: quattro azioni giravano ancora su Node.js 20, deprecato. Nella 1.20.1 usano versioni su Node.js 24 (`configure-pages@v6`, `deploy-pages@v5`, `upload-artifact@v7`, `upload-pages-artifact@v5`).

## Limiti

- Nessuna prova su GPU fisiche, Safari o telefoni reali. I tempi per fotogramma misurati con SwiftShader, un renderer software, non rappresentano un dispositivo reale.
- Nessuna certificazione formale di accessibilità.
- Il replay dei comandi del renderer su EGL / OpenGL ES è stato eseguito l’ultima volta sulla 1.4.0: risultati e catture sono in `history-v1.4.0/`.
