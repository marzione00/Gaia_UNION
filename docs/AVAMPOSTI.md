# Gli avamposti di ricerca

Dalla versione 1.32.0 ognuno dei 30 sistemi della mappa ha un avamposto di ricerca, che riunisce in una sola schermata ciò che lo studente ha fatto nell'area: capitoli e sezioni lette, percorsi guidati con il loro laboratorio, spedizioni (`docs/SPEDIZIONI.md`), pianeti misurati e visitati, passaggi verso altre aree (`docs/MAPPA_ESPLORAZIONE.md`). Le regole stanno in `src/navigation/outposts.js`.

## Costruzione

L'avamposto si costruisce quando lo studente completa la prima spedizione di un pianeta dell'area. Prima di allora la schermata si chiama «Cantiere dell'avamposto» e mostra lo stesso riepilogo, perché l'avamposto riunisce contenuti già aperti e non ne chiude nessuno. Il diario conta gli avamposti costruiti su 30.

## Dove si trova

- Nella vista del sistema, il pulsante «Avamposto di ricerca» (sul telefono «Avamposto»), evidenziato quando l'avamposto è costruito, oppure «Cantiere dell'avamposto» (sul telefono «Cantiere»). Sul computer sta sotto l'elenco delle unità dell'area; sul telefono accanto ai numeri dei pianeti.
- All'indirizzo `#/outpost?unit=…` (anche `#/avamposto`), con una qualsiasi unità dell'area.

## Le tre schede

- **Unità dell'area**: lo stato dell'avamposto e, per ogni unità, le sezioni lette del capitolo, la tappa del percorso guidato e tre pulsanti, che aprono il capitolo, il laboratorio del percorso (la terza delle sei tappe) e il pianeta in orbita. Le unità di matematica, senza capitolo, hanno soltanto gli ultimi due.
- **Spedizioni**: le spedizioni completate e gli esercizi risolti dell'area; per ogni unità lo stato delle tre spedizioni e un pulsante che apre il pannello delle spedizioni del pianeta.
- **Esplorazione**: i pianeti misurati con gli strumenti di bordo, quelli visitati in superficie, le specie registrate, e i passaggi aperti verso altre aree, ognuno con un pulsante che porta al sistema di arrivo; il conto dei passaggi ancora chiusi.

Le schede si dividono in pagine quando lo schermo è basso; il testo completo dell'avamposto è disponibile ai lettori di schermo.

## Numeri

Le aree hanno da 3 a 6 unità, 125 in tutto. I 100 capitoli contano 1554 sezioni, elencate in `content/atlas/chapters.json` (generato da `tools/build_chapters.mjs`); le stesse liste servono agli strumenti della nave. Le spedizioni disponibili sono 325, con 2078 fra esercizi e domande.

## Verifiche

`tests/outposts.test.mjs` ricostruisce le sezioni dai capitoli e le confronta con quelle degli strumenti, controlla che i 30 avamposti coprano 125 unità, 1554 sezioni e 325 spedizioni, che la prima spedizione completata costruisca l'avamposto della sua area e soltanto quello, e che sezioni lette, tappe dei percorsi, misure, discese e passaggi aperti entrino nel riepilogo. I flussi applicativi entrano nell'avamposto costruito dalla vista del sistema, aprono da lì le spedizioni di un pianeta e il laboratorio di un percorso, e verificano il cantiere di un'area ancora senza spedizioni.
