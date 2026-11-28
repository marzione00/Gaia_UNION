# Collaudo GAIA 1.79.0

Eseguito il 28 novembre 2026 sul ramo `feat/meteo-20261128`, costruito sopra `main` alla versione 1.78.0 (pull request #84), con Node.js 22.

| Controllo | Comando | Risultato |
|---|---|---:|
| Test Node | `node --test tests/*.test.mjs` | 777 / 777 |
| Meteo: documento, tipi per pianeta, episodi, fisica, mondo e diario | `node --test tests/meteo.test.mjs` | 5 / 5 |
| Riferimenti e risorse | `node scripts/check.mjs` | 4211 / 4211 |
| Distribuzione `dist/` servita via HTTP | `node scripts/http_smoke.mjs` | 314 controlli |
| Flussi applicativi | `node tools/qa_application_curriculum.mjs` | 283 controlli |
| Atlante in Chromium | `python3 tools/qa_atlas_browser.py --root dist` | 23 controlli, 125 pianeti esplorabili, nessun errore WebGL |
| Meteo in Chromium | sei tipi di meteo forzati e un episodio naturale dalla distribuzione a 1280 × 800; neve e pannello METEO a 390 × 844 come telefono | pioggia, neve, polvere e cenere disegnate attorno alla camera, nebbia e cielo coperto, messaggi e pannello; nessun errore di pagina né WebGL |
| Meteo | `node scripts/meteo.mjs` | 7 tipi; 103 pianeti con atmosfera, da 2 a 5 tipi ciascuno; 22 pianeti senza atmosfera sempre sereni; gocce da 1,0 a 10,1 m/s (6,5 sulla Terra) |
| Prestazioni | `node scripts/prestazioni-mondi.mjs` | 1125 misure su 125 pianeti con il cielo sereno dell'arrivo; al più 113 chiamate di disegno, 1,20 milioni di triangoli e 4287 istanze per fotogramma; maglie dei modelli in mediana 317 ms, al più 621 ms; terreno lontano in 16-45 fotogrammi; la superficie più lunga in 1000 ms in tutto |

Log: `TEST_NODE.log`, `CHECK.log`, `BUILD.log`, `CHECK.json`, `HTTP_SMOKE.json`; misure in `PRESTAZIONI_MONDI.md` e `VARIETA_MONDI.md`, la serie in `MONDI_APERTI.md`, il meteo dei pianeti in `METEO.md`, luoghi minori in `LUOGHI_MINORI.md`, luoghi rari in `LUOGHI_RARI.md`, siti e storie in `SITI.md`, biomi e loro vita in `BIOMI.md`, modelli dei mondi in `CATALOGO_MONDI.md`.

La versione aggiunge alla serie «Mondi aperti» il meteo della zona; è descritta nella sezione «Meteo della zona (1.79.0)» di `docs/GRAPHICS.md` e, per la classe, in `docs/MONDI_APERTI.md`. Con il meteo più pesante sul pianeta più ricco un fotogramma ha una chiamata di disegno e 1500 istanze in più, entro i limiti (`tests/meteo.test.mjs`). Nelle misure delle prestazioni la camera delle stazioni con il dettaglio alto registra un fotogramma isolato di 110,3 ms: in una misura ripetuta con `node --trace-gc` il fotogramma più lungo della stessa vista, 45 ms, coincide con una raccolta completa della memoria di Node (Mark-Compact) di 42 ms, quindi il picco viene dal processo di misura più che dal disegno.

Collaudo precedente, 1.78.0 (28 novembre 2026, ramo `feat/luoghi-minori-20261128`): 772 test Node, 4203 controlli di riferimenti e risorse, 314 controlli HTTP, 283 flussi applicativi, 23 controlli dell’atlante; luoghi minori in Chromium senza errori.

## Integrazione continua

Il workflow `.github/workflows/pages.yml` esegue su `main` test, controllo delle risorse, build, verifiche HTTP, interazioni reali dell’atlante e pubblicazione su GitHub Pages. Dal 22 novembre 2026, dopo la pull request #66, le pull request non avviano più il workflow, per ridurre il consumo di GitHub Actions. Ogni versione è collaudata in locale con gli stessi comandi prima di aprire la pull request, e l'esecuzione su `main` dopo l'unione resta la condizione per pubblicare. Il passo finale scarica dal sito pubblico `build-info.json` e il curriculum e verifica che corrispondano al commit appena pubblicato e ai corsi del curriculum, 125 dalla 1.26.0. L'ultima esecuzione su `main`, per l'unione della pull request #79 (`8b7b5ff`), è riuscita, con la verifica del sito pubblicato.

## Controllo del repository

- `main` ha un solo commit radice. Degli 88 rami presenti su GitHub con quello di questo collaudo, 87 sono interamente contenuti in `main`; l'unico con commit propri è il ramo di questo collaudo. Due rami senza pull request (`feat/accessible-atlas-20261115` e `feat/atlas-accessible-navigation-20261115`) puntano allo stesso commit, l’unione della pull request #3.
- Nessuna pull request o segnalazione aperta.
- Gli autori dei commit usano indirizzi noreply, di GitHub e di Anthropic.
- Due esecuzioni fallite nella storia di `main`, entrambe superate dai commit successivi: il primo tentativo di pubblicazione (`bacea5c`, errore in `configure-pages`) e l’unione della pull request #5 (`1d6c911`, verifica del sito pubblicato con un numero di versione fisso, corretta in `b7dc1e8`).
- Avvisi dell’integrazione continua sulla 1.20.0: quattro azioni giravano ancora su Node.js 20, deprecato. Nella 1.20.1 usano versioni su Node.js 24 (`configure-pages@v6`, `deploy-pages@v5`, `upload-artifact@v7`, `upload-pages-artifact@v5`).

## Limiti

- Nessuna prova su GPU fisiche, Safari o telefoni reali. I tempi per fotogramma misurati con SwiftShader, un renderer software, non rappresentano un dispositivo reale; la grafica che si adatta alleggerisce le immagini dove i fotogrammi restano lenti.
- Nessuna certificazione formale di accessibilità.
- Il replay dei comandi del renderer su EGL / OpenGL ES è stato eseguito l’ultima volta sulla 1.4.0: risultati e catture sono in `history-v1.4.0/`.
