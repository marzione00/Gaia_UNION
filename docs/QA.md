# Collaudo GAIA 1.30.0

Eseguito il 18 novembre 2026 sul ramo `feat/nucleo-gaia-20261118`, costruito sopra `main` alla versione 1.29.0 (pull request #30), con Node.js 22.

| Controllo | Comando | Risultato |
|---|---|---:|
| Test Node | `node --test tests/*.test.mjs` | 432 / 432 |
| Riferimenti e risorse | `node scripts/check.mjs` | 3874 / 3874 |
| Distribuzione `dist/` servita via HTTP | `node scripts/http_smoke.mjs` | 308 controlli |
| Flussi applicativi | `node tools/qa_application_curriculum.mjs` | 274 controlli |
| Atlante in Chromium | `python3 tools/qa_atlas_browser.py --root dist` | 23 controlli, 30 sistemi, 280 pianeti, 125 esplorabili |
| Nucleo di Gaia, nave e scheda fisica in Chromium | salvataggio con tre strumenti a bordo, 13 pianeti misurati e 8 discese, a 1440 × 900, 390 × 844 e 320 × 568 | nessun errore, nessuna sovrapposizione |

Log: `TEST_NODE.log`, `CHECK.log`, `BUILD.log`, `CHECK.json`, `HTTP_SMOKE.json`.

I test di `tests/biosignatures.test.mjs` contano le cinque firme atmosferiche e gli esiti della diagnosi sui 125 pianeti, controllano i valori dei mondi di riferimento di Krissansen-Totton, Bergsman e Catling (2016), verificano che i bordi della zona abitabile calcolati dal computer di bordo risolvano la disequazione del flusso e coincidano con la zona di ogni pianeta, e controllano lo stile dei testi. I test di `tests/instruments.test.mjs` coprono ora otto strumenti, il computer di bordo che sale a bordo soltanto con il percorso guidato, la riga «Vita» rivelata dalla discesa, la registrazione delle discese nel salvataggio e l'indirizzo del Nucleo. I flussi applicativi portano a bordo l'analizzatore di biofirme, misurano un pianeta, aprono il Nucleo dalla nave e dal diario, scendono in superficie e controllano l'esito della diagnosi e la riga «Vita».

Collaudo precedente, 1.29.0 (18 novembre 2026, ramo `feat/nave-strumenti-20261118`): 427 test Node, 3870 controlli di riferimenti e risorse, 307 controlli HTTP, 271 flussi applicativi; atlante con 30 sistemi e 125 pianeti esplorabili; nave e scheda fisica in Chromium su tre formati, nessun errore.

## Integrazione continua

Il workflow `.github/workflows/pages.yml` esegue su `main` test, controllo delle risorse, build, verifiche HTTP, interazioni reali dell’atlante e pubblicazione su GitHub Pages. Il passo finale scarica dal sito pubblico `build-info.json` e il curriculum e verifica che corrispondano al commit appena pubblicato e ai corsi del curriculum, 125 dalla 1.26.0. L'ultima esecuzione su `main`, per l'unione della pull request #30 (`9cb3668`), è riuscita.

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
