# Collaudo GAIA 1.45.0

Eseguito il 21 novembre 2026 sul ramo `feat/economia-20261121`, costruito sopra `main` alla versione 1.44.0 (pull request #46), con Node.js 22.

| Controllo | Comando | Risultato |
|---|---|---:|
| Test Node | `node --test tests/*.test.mjs` | 611 / 611 |
| Economia delle catene | `node --test tests/economy.test.mjs` | 3 / 3 |
| Riferimenti e risorse | `node scripts/check.mjs` | 3968 / 3968 |
| Distribuzione `dist/` servita via HTTP | `node scripts/http_smoke.mjs` | 314 controlli |
| Flussi applicativi | `node tools/qa_application_curriculum.mjs` | 279 controlli |
| Atlante in Chromium | `python3 tools/qa_atlas_browser.py --root dist` | 23 controlli, 30 sistemi, 280 pianeti, 125 esplorabili |
| Sistema in Chromium | `?diagnostica`, vista del sistema «Legami e molecole» a 1440 × 900 | nessun errore WebGL o di pagina; 16 stazioni e 18 navi, 0 modelli falliti |

Log: `TEST_NODE.log`, `CHECK.log`, `BUILD.log`, `CHECK.json`, `HTTP_SMOKE.json`.

La versione rinnova l'economia (`src/craft/economy.js`) e assegna le varianti delle ricette ai tipi della grammatica (`src/craft/grammar.js`, `src/craft/catalog.js`); modelli, collocamento, percorsi e laboratori restano quelli della 1.44.0. Le merci passano da 7 a 24 e le ricette da 15 a 31. La simulazione di 1200 s su 30 sistemi e tre semi muove 1897 navi, tutte in viaggio, e le consegne salgono da 44 871 a 59 455; le stazioni classiche e aggiunte che producono lavorano il 95,2 e l'86,2 % del tempo, contro il 57,6 e il 40,1 % della 1.44.0, e tutte le 24 merci arrivano a destinazione.

Collaudo precedente, 1.44.0 (21 novembre 2026, ramo `feat/navi-civili-20261121`): 608 test Node, 6 test delle classi di navi, 3968 controlli di riferimenti e risorse, 314 controlli HTTP, 279 flussi applicativi, 23 controlli dell'atlante; 120 classi disegnate in Chromium senza errori.

## Integrazione continua

Il workflow `.github/workflows/pages.yml` esegue su `main` test, controllo delle risorse, build, verifiche HTTP, interazioni reali dell’atlante e pubblicazione su GitHub Pages. Il passo finale scarica dal sito pubblico `build-info.json` e il curriculum e verifica che corrispondano al commit appena pubblicato e ai corsi del curriculum, 125 dalla 1.26.0. L'ultima esecuzione su `main`, per l'unione della pull request #46 (`ddd7c91`), è riuscita.

## Controllo del repository

- `main` ha un solo commit radice. Dei 50 rami presenti su GitHub con quello di questo collaudo, 49 sono interamente contenuti in `main`; l'unico con commit propri è il ramo di questo collaudo. Due rami senza pull request (`feat/accessible-atlas-20261115` e `feat/atlas-accessible-navigation-20261115`) puntano allo stesso commit, l’unione della pull request #3.
- Nessuna pull request o segnalazione aperta.
- Gli autori dei commit usano indirizzi noreply, di GitHub e di Anthropic.
- Due esecuzioni fallite nella storia di `main`, entrambe superate dai commit successivi: il primo tentativo di pubblicazione (`bacea5c`, errore in `configure-pages`) e l’unione della pull request #5 (`1d6c911`, verifica del sito pubblicato con un numero di versione fisso, corretta in `b7dc1e8`).
- Avvisi dell’integrazione continua sulla 1.20.0: quattro azioni giravano ancora su Node.js 20, deprecato. Nella 1.20.1 usano versioni su Node.js 24 (`configure-pages@v6`, `deploy-pages@v5`, `upload-artifact@v7`, `upload-pages-artifact@v5`).

## Limiti

- Nessuna prova su GPU fisiche, Safari o telefoni reali. I tempi per fotogramma misurati con SwiftShader, un renderer software, non rappresentano un dispositivo reale.
- Nessuna certificazione formale di accessibilità.
- Il replay dei comandi del renderer su EGL / OpenGL ES è stato eseguito l’ultima volta sulla 1.4.0: risultati e catture sono in `history-v1.4.0/`.
