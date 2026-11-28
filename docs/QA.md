# Collaudo GAIA 1.76.0

Eseguito il 28 novembre 2026 sul ramo `feat/zaino-20261128`, costruito sopra `main` alla versione 1.75.0 (pull request #81), con Node.js 22.

| Controllo | Comando | Risultato |
|---|---|---:|
| Test Node | `node --test tests/*.test.mjs` | 762 / 762 |
| Zaino a reazione e viaggio rapido | `node --test tests/zaino.test.mjs` | 5 / 5 |
| Riferimenti e risorse | `node scripts/check.mjs` | 4188 / 4188 |
| Distribuzione `dist/` servita via HTTP | `node scripts/http_smoke.mjs` | 314 controlli |
| Flussi applicativi | `node tools/qa_application_curriculum.mjs` | 283 controlli |
| Atlante in Chromium | `python3 tools/qa_atlas_browser.py --root dist` | 23 controlli, 125 pianeti esplorabili, nessun errore WebGL |
| Zaino e viaggio rapido in Chromium | pianeta 8 a 1280 × 720, pianeta 39 a 390 × 844: volo con lo zaino tenendo premuto SALTA, scheda «Fisica» del salto, mappa con i luoghi scoperti, scelta di un luogo raro a 2 km, viaggio rapido con la dissolvenza | voli di 14,6 m e 32,0 m con la carica ricaricata a metà volo per la schermata; arrivo a 20 unità dal luogo, scelto come voce; nessun errore di pagina né WebGL |
| Prestazioni | `node scripts/prestazioni-mondi.mjs` | 1125 misure su 125 pianeti; al più 113 chiamate di disegno, 1,19 milioni di triangoli e 4287 istanze per fotogramma; le due fasi della costruzione restano entro 1500 ms (al più 665 e 993 ms), la superficie più lunga richiede 1585 ms in tutto |

Log: `TEST_NODE.log`, `CHECK.log`, `BUILD.log`, `CHECK.json`, `HTTP_SMOKE.json`; misure in `PRESTAZIONI_MONDI.md`, luoghi rari e descrizioni in `LUOGHI_RARI.md`, siti e storie in `SITI.md`, biomi e loro vita in `BIOMI.md`, modelli dei mondi in `CATALOGO_MONDI.md`.

La versione è la settima della serie «Mondi aperti»: lo zaino a reazione, che solleva l’esploratore da 5,4 a 18,1 m secondo la gravità del pianeta, e il viaggio rapido fra i luoghi scoperti dalla mappa della zona; è descritta nella sezione «Zaino a reazione e viaggio rapido fra i luoghi scoperti» di `docs/GRAPHICS.md`. In questa misura la costruzione più lunga, 1585 ms in tutto, supera di poco i 1434 ms della 1.75.0: i tempi di costruzione dello stesso pianeta variano di alcune centinaia di millisecondi fra una prova e l’altra, e la versione 1.77.0, dedicata alle prestazioni sui telefoni, li riduce.

Collaudo precedente, 1.75.0 (28 novembre 2026, ramo `feat/atterraggio-20261128`): 757 test Node, 4184 controlli di riferimenti e risorse, 314 controlli HTTP, 283 flussi applicativi, 23 controlli dell’atlante; percorso completo della nave in Chromium senza errori.

## Integrazione continua

Il workflow `.github/workflows/pages.yml` esegue su `main` test, controllo delle risorse, build, verifiche HTTP, interazioni reali dell’atlante e pubblicazione su GitHub Pages. Dal 22 novembre 2026, dopo la pull request #66, le pull request non avviano più il workflow, per ridurre il consumo di GitHub Actions. Ogni versione è collaudata in locale con gli stessi comandi prima di aprire la pull request, e l'esecuzione su `main` dopo l'unione resta la condizione per pubblicare. Il passo finale scarica dal sito pubblico `build-info.json` e il curriculum e verifica che corrispondano al commit appena pubblicato e ai corsi del curriculum, 125 dalla 1.26.0. L'ultima esecuzione su `main`, per l'unione della pull request #79 (`8b7b5ff`), è riuscita, con la verifica del sito pubblicato.

## Controllo del repository

- `main` ha un solo commit radice. Degli 85 rami presenti su GitHub con quello di questo collaudo, 84 sono interamente contenuti in `main`; l'unico con commit propri è il ramo di questo collaudo. Due rami senza pull request (`feat/accessible-atlas-20261115` e `feat/atlas-accessible-navigation-20261115`) puntano allo stesso commit, l’unione della pull request #3.
- Nessuna pull request o segnalazione aperta.
- Gli autori dei commit usano indirizzi noreply, di GitHub e di Anthropic.
- Due esecuzioni fallite nella storia di `main`, entrambe superate dai commit successivi: il primo tentativo di pubblicazione (`bacea5c`, errore in `configure-pages`) e l’unione della pull request #5 (`1d6c911`, verifica del sito pubblicato con un numero di versione fisso, corretta in `b7dc1e8`).
- Avvisi dell’integrazione continua sulla 1.20.0: quattro azioni giravano ancora su Node.js 20, deprecato. Nella 1.20.1 usano versioni su Node.js 24 (`configure-pages@v6`, `deploy-pages@v5`, `upload-artifact@v7`, `upload-pages-artifact@v5`).

## Limiti

- Nessuna prova su GPU fisiche, Safari o telefoni reali. I tempi per fotogramma misurati con SwiftShader, un renderer software, non rappresentano un dispositivo reale.
- Nessuna certificazione formale di accessibilità.
- Il replay dei comandi del renderer su EGL / OpenGL ES è stato eseguito l’ultima volta sulla 1.4.0: risultati e catture sono in `history-v1.4.0/`.
