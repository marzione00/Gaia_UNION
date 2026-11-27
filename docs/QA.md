# Collaudo GAIA 1.73.0

Eseguito il 27 novembre 2026 sul ramo `feat/strutture-20261127`, costruito sopra `main` alla versione 1.72.0 (pull request #78), con Node.js 22.

| Controllo | Comando | Risultato |
|---|---|---:|
| Test Node | `node --test tests/*.test.mjs` | 745 / 745 |
| Strutture, relitti e rovine | `node --test tests/siti.test.mjs` | 5 / 5 |
| Riferimenti e risorse | `node scripts/check.mjs` | 4155 / 4155 |
| Distribuzione `dist/` servita via HTTP | `node scripts/http_smoke.mjs` | 314 controlli |
| Flussi applicativi | `node tools/qa_application_curriculum.mjs` | 283 controlli |
| Atlante in Chromium | `python3 tools/qa_atlas_browser.py --root dist` | 23 controlli, 125 pianeti esplorabili, nessun errore WebGL |
| Siti in Chromium | pianeti 2, 6, 70 e 100 a 1280 × 800, pianeta 100 a 390 × 844: esploratore a 67 m da 13 siti di 10 tipi, camera da 31 a 63 unità | modelli dettagliati costruiti, schede con stato, tipo, distanza e storia, pagine della storia sugli schermi larghi; nessun errore di pagina né WebGL |
| Prestazioni | `node scripts/prestazioni-mondi.mjs` | 1125 misure su 125 pianeti; al più 114 chiamate di disegno, 1,18 milioni di triangoli e 4275 istanze per fotogramma; una superficie si costruisce al più in 1017 ms |

Log: `TEST_NODE.log`, `CHECK.log`, `BUILD.log`, `CHECK.json`, `HTTP_SMOKE.json`; misure in `PRESTAZIONI_MONDI.md`, siti e storie in `SITI.md`, biomi e loro vita in `BIOMI.md`, modelli dei mondi in `CATALOGO_MONDI.md`.

La versione è la quarta della serie «Mondi aperti»: 2043 siti costruiti nelle zone di atterraggio, fra strutture abitate e abbandonate, relitti e rovine, ciascuno con una storia nel diario; è descritta nella sezione «Strutture, relitti e rovine» di `docs/GRAPHICS.md`.

Collaudo precedente, 1.72.0 (27 novembre 2026, ramo `feat/flora-fauna-20261127`): 740 test Node, 4141 controlli di riferimenti e risorse, 314 controlli HTTP, 283 flussi applicativi, 23 controlli dell'atlante; flora e fauna in 7 posizioni di 6 biomi in Chromium senza errori.

## Integrazione continua

Il workflow `.github/workflows/pages.yml` esegue su `main` test, controllo delle risorse, build, verifiche HTTP, interazioni reali dell’atlante e pubblicazione su GitHub Pages. Dal 22 novembre 2026, dopo la pull request #66, le pull request non avviano più il workflow, per ridurre il consumo di GitHub Actions. Ogni versione è collaudata in locale con gli stessi comandi prima di aprire la pull request, e l'esecuzione su `main` dopo l'unione resta la condizione per pubblicare. Il passo finale scarica dal sito pubblico `build-info.json` e il curriculum e verifica che corrispondano al commit appena pubblicato e ai corsi del curriculum, 125 dalla 1.26.0. L'ultima esecuzione su `main`, per l'unione della pull request #78 (`50b9c5b`), è riuscita, con la verifica del sito pubblicato.

## Controllo del repository

- `main` ha un solo commit radice. Degli 82 rami presenti su GitHub con quello di questo collaudo, 81 sono interamente contenuti in `main`; l'unico con commit propri è il ramo di questo collaudo. Due rami senza pull request (`feat/accessible-atlas-20261115` e `feat/atlas-accessible-navigation-20261115`) puntano allo stesso commit, l’unione della pull request #3.
- Nessuna pull request o segnalazione aperta.
- Gli autori dei commit usano indirizzi noreply, di GitHub e di Anthropic.
- Due esecuzioni fallite nella storia di `main`, entrambe superate dai commit successivi: il primo tentativo di pubblicazione (`bacea5c`, errore in `configure-pages`) e l’unione della pull request #5 (`1d6c911`, verifica del sito pubblicato con un numero di versione fisso, corretta in `b7dc1e8`).
- Avvisi dell’integrazione continua sulla 1.20.0: quattro azioni giravano ancora su Node.js 20, deprecato. Nella 1.20.1 usano versioni su Node.js 24 (`configure-pages@v6`, `deploy-pages@v5`, `upload-artifact@v7`, `upload-pages-artifact@v5`).

## Limiti

- Nessuna prova su GPU fisiche, Safari o telefoni reali. I tempi per fotogramma misurati con SwiftShader, un renderer software, non rappresentano un dispositivo reale.
- Nessuna certificazione formale di accessibilità.
- Il replay dei comandi del renderer su EGL / OpenGL ES è stato eseguito l’ultima volta sulla 1.4.0: risultati e catture sono in `history-v1.4.0/`.
