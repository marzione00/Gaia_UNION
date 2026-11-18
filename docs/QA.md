# Collaudo GAIA 1.27.0

Eseguito il 18 novembre 2026 sul ramo `feat/fisica-pianeti-20261118`, costruito sopra `main` alla versione 1.26.0 (pull request #27), con Node.js 22.

| Controllo | Comando | Risultato |
|---|---|---:|
| Test Node | `node --test tests/*.test.mjs` | 417 / 417 |
| Riferimenti e risorse | `node scripts/check.mjs` | 3859 / 3859 |
| Distribuzione `dist/` servita via HTTP | `node scripts/http_smoke.mjs` | 300 controlli |
| Flussi applicativi | `node tools/qa_application_curriculum.mjs` | 269 controlli |
| Atlante in Chromium | `python3 tools/qa_atlas_browser.py --root dist` | 23 controlli, 30 sistemi, 280 pianeti, 125 esplorabili |
| Scheda «Dati fisici» in Chromium | apertura dalla vista in orbita a 1440 × 900, 390 × 844 e 320 × 568 | nessun errore, testo leggibile su ogni formato |

Log: `TEST_NODE.log`, `CHECK.log`, `BUILD.log`, `CHECK.json`, `HTTP_SMOKE.json`.

I test di `tests/physics.test.mjs` ricalcolano le temperature di equilibrio di Venere, Terra e Marte dalle schede della NASA, la curva dell'anidride carbonica che passa per Marte e Venere, la coerenza delle stelle di Mamajek con la legge di Stefan-Boltzmann e i bordi della zona abitabile di Kopparapu; per ognuno dei 125 pianeti verificano albedo, temperatura di equilibrio, temperatura superficiale nella finestra della famiglia, profondità ottica, acqua liquida o ghiaccio, terza legge di Keplero, raggio, massa e velocità di fuga; per ognuno dei 30 sistemi verificano orbite in ordine di distanza e almeno dieci raggi di Hill reciproci fra corpi vicini. I flussi applicativi aprono e chiudono la scheda di tutti i 125 pianeti e verificano il testo per i lettori di schermo. Le carte d'identità restano identiche all'istantanea di `content/worlds/genomes.json`, quindi specie, luoghi, catalogo dei fenomeni e foglio delle vedute dall'alto non cambiano.

Collaudo precedente, 1.26.0 (18 novembre 2026, ramo `feat/libro-fisica-astro-20261117`): 411 test Node, 3844 controlli di riferimenti e risorse, 300 controlli HTTP, 143 flussi applicativi; atlante con 30 sistemi e 125 pianeti esplorabili; 15 capitoli di astrofisica in Chromium con 4228 formule e 90 figure, nessun errore.

## Integrazione continua

Il workflow `.github/workflows/pages.yml` esegue su `main` test, controllo delle risorse, build, verifiche HTTP, interazioni reali dell’atlante e pubblicazione su GitHub Pages. Il passo finale scarica dal sito pubblico `build-info.json` e il curriculum e verifica che corrispondano al commit appena pubblicato e ai corsi del curriculum, 125 dalla 1.26.0. L'ultima esecuzione su `main`, per l'unione della pull request #27 (`2908ec7`), è riuscita.

## Controllo del repository

- `main` ha un solo commit radice. Dei 31 rami presenti su GitHub, 30 sono interamente contenuti in `main`; l'unico con commit propri è il ramo di questo collaudo. Due rami senza pull request (`feat/accessible-atlas-20261115` e `feat/atlas-accessible-navigation-20261115`) puntano allo stesso commit, l’unione della pull request #3.
- Nessuna pull request o segnalazione aperta.
- Gli autori dei commit usano indirizzi noreply, di GitHub e di Anthropic.
- Due esecuzioni fallite nella storia di `main`, entrambe superate dai commit successivi: il primo tentativo di pubblicazione (`bacea5c`, errore in `configure-pages`) e l’unione della pull request #5 (`1d6c911`, verifica del sito pubblicato con un numero di versione fisso, corretta in `b7dc1e8`).
- Avvisi dell’integrazione continua sulla 1.20.0: quattro azioni giravano ancora su Node.js 20, deprecato. Nella 1.20.1 usano versioni su Node.js 24 (`configure-pages@v6`, `deploy-pages@v5`, `upload-artifact@v7`, `upload-pages-artifact@v5`).

## Limiti

- Nessuna prova su GPU fisiche, Safari o telefoni reali. I tempi per fotogramma misurati con SwiftShader, un renderer software, non rappresentano un dispositivo reale.
- Nessuna certificazione formale di accessibilità.
- Il replay dei comandi del renderer su EGL / OpenGL ES è stato eseguito l’ultima volta sulla 1.4.0: risultati e catture sono in `history-v1.4.0/`.
