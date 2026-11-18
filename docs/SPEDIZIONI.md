# Le spedizioni

Dalla versione 1.31.0 ogni pianeta offre tre spedizioni, fatte degli esercizi risolti del suo capitolo nel libro della galassia. La spedizione in orbita raccoglie gli esercizi di base, quella in superficie gli esercizi intermedi, quella in profondità gli esercizi avanzati. Le regole stanno in `src/navigation/expeditions.js`; le liste degli esercizi in `content/atlas/expeditions.json`, generato da `tools/build_expeditions.mjs`.

## Esercizi e domande

I 100 capitoli del libro contengono 1928 esercizi con soluzione scritta: 680 di base, 684 intermedi e 564 avanzati. Per disciplina:

| volume | capitoli | base | intermedi | avanzati |
|---|---:|---:|---:|---:|
| Fisica | 40 | 337 | 332 | 281 |
| Chimica | 25 | 132 | 140 | 137 |
| Biologia | 35 | 211 | 212 | 146 |

Ogni livello di ogni capitolo ha almeno un esercizio. Le 25 unità di matematica sono senza capitolo nel libro; la loro spedizione in orbita è fatta delle 6 domande a scelta multipla del percorso guidato, e le spedizioni in superficie e in profondità restano in attesa di un capitolo. In tutto le spedizioni disponibili sono 325, con 2078 fra esercizi e domande.

## Autovalutazione

Gli esercizi del libro sono problemi aperti con lo svolgimento scritto, e il sito non li corregge. Nel lettore ogni esercizio ha un pulsante «Segna come risolto», che si attiva dopo l'apertura della soluzione, perché lo studente confronti il proprio svolgimento con quello scritto prima di segnarlo. Un secondo clic toglie il segno. In cima agli esercizi il lettore riporta lo stato delle tre spedizioni del pianeta e ricorda che si tratta di un'autovalutazione. Le domande dei percorsi di matematica contano invece quando l'ultima risposta data è corretta, come nel percorso stesso.

Una spedizione è completata quando tutti i suoi esercizi sono segnati come risolti, o quando tutte le domande hanno la risposta corretta. Le spedizioni lasciano aperti capitoli, percorsi e mappa.

## Dove si trova

- Nella vista in orbita, il pulsante «Spedizioni», con il numero di spedizioni completate, apre il pannello delle tre spedizioni al posto della scheda dell'unità. Ogni spedizione mostra quanti esercizi sono risolti e apre il libro al primo esercizio ancora da risolvere; per le unità di matematica apre le domande del percorso guidato.
- Nella vista del sistema, sotto il numero di ogni pianeta, un segno verde per ogni spedizione completata.
- Nel diario, alla scheda «Esplorazione», il conto delle spedizioni completate e degli esercizi risolti, con una riga per ogni pianeta che ha almeno un esercizio risolto.

## Salvataggio

Gli esercizi segnati stanno nel salvataggio del browser, nel campo `solved`, come chiavi `unità#esercizio` (per esempio `physics-30#esercizio-4`). Il salvataggio accetta soltanto chiavi ben formate, senza doppioni e fino a 5000, più degli esercizi del libro; il diario esportato le conserva. Gli identificativi degli esercizi seguono l'ordine nel capitolo: se un capitolo cambia l'ordine dei suoi esercizi, `tools/build_expeditions.mjs` rigenera le liste e i test segnalano ogni esercizio fuori posto.

## Verifiche

`tests/expeditions.test.mjs` ricostruisce le liste dai capitoli, controlla che ogni esercizio stia in una sola spedizione e al suo livello, conta esercizi e domande, verifica il completamento di una spedizione e la rimozione di un segno, le domande dei percorsi di matematica, la pulizia del salvataggio e lo stile dei testi. I flussi applicativi completano la spedizione in orbita di «Radiazione termica e luce delle stelle», aprono il libro al primo esercizio della spedizione in superficie e completano la spedizione in orbita di «Disequazioni» con le domande del percorso. In Chromium il pulsante del lettore resta spento finché la soluzione è chiusa, si accende all'apertura e registra l'esercizio nel salvataggio.
