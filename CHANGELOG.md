# 1.7.0 — Navigazione tematica

- Mappa riorganizzata: un braccio della galassia per disciplina e 25 aree tematiche in ordine di studio, dal centro verso l’esterno. Ogni sistema raccoglie da tre a sei unità della stessa area.
- Nomi delle aree e titoli delle unità al posto dei codici ECHO e F08.
- Schermata d’ingresso con tre scelte: cerca un argomento, segui un percorso, esplora la galassia; RIPRENDI quando c’è un’unità aperta.
- Scheda dell’area con l’elenco delle unità e il pulsante APRI L’UNITÀ: dalla mappa all’unità con un clic.
- Pulsanti per evidenziare il braccio di una disciplina; percorso di navigazione sempre visibile.
- Guida in cinque passi disegnata sopra gli elementi reali della mappa.
- Menu principale ridotto a cinque voci: Mappa, Argomenti, Percorsi, Laboratori, Diario.
- In superficie le quattro stazioni aprono lezione, laboratorio, verifica e collegamenti dell’unità del pianeta.
- Test di sistemi, atlante e browser aggiornati alla nuova organizzazione.

# 1.4.0 — Ambiente cosmico continuo

- Cinque regioni persistenti e quindici volumi 3D: nebulose, filamenti, resti stellari e galassie lontane.
- Ammassi ricavati da posizioni non navigabili del medesimo buffer da un milione di stelle; le 25 stelle dei sistemi restano identiche.
- Assorbimento fra camera e stelle, dettagli multiscala e continuità galassia–sistema–orbita.
- Otto fasce di asteroidi con mappe NASA, tre comete geometriche, ombre semplificate fra pianeti e lune.
- Tre preset per il costo volumetrico, framebuffer dedicato, UI invariata.
- Nuovi test del catalogo, geometrie, estinzione e conservazione del milione; video di tre rotazioni native.

# 1.3.0 — Sistemi eterogenei e mappe NASA

- Da 5 a 12 pianeti casuali per sistema, stabili grazie al seed: 232 corpi planetari complessivi, quattro esplorabili per ciascuno dei 25 sistemi.
- Quattro famiglie diverse fra le destinazioni esplorabili; undici famiglie totali ispirate a Haegemonia, con raggi, orbite, stelle, lune e anelli variabili.
- Pianeti aggiuntivi descritti al passaggio del mouse/tocco, con accesso alla superficie disabilitato.
- Sostituite tutte le mappe planetarie procedurali con fonti NASA; niente continenti, crateri o nuvole inventati dagli shader. Mappe 4K/8K per le cento destinazioni, originali e attribuzioni inclusi.
- Dettaglio caricato su richiesta con limite GPU e cache a due texture; geometria UV NASA preservata quando la mappa usa un atlante.
- Camera orbitale iniziale orientata verso il lato illuminato; stelle, pianeti e lune restano nella stessa scena 3D.
- Milione di punti stellari, UI, contenuti didattici e tre biomi conservati. Sei test aggiuntivi portano il totale a 81.

# 1.2.0 — Galassia, sistemi e pianeti

- Un milione di punti XYZ effettivamente inviati alla GPU in galassia, sistema, orbita e transizioni; qualità ridotta senza ridurre le stelle.
- 25 stelle del medesimo buffer sono sistemi navigabili, con quattro pianeti ciascuno. I pianeti compaiono nella vista del sistema.
- Descrizione al passaggio del mouse; clic singolo, zoom multiscala, ritorno con camera ripristinata, tastiera e touch.
- Stelle emissive, corona, orbite inclinate e illuminazione dei pianeti relativa alla stella.
- UI originale conservata nello stile e nei pannelli; comandi adattati alla nuova gerarchia.
- Preferenze grafiche migrate mantenendo appunti, progressi e schema dello store.
- 11 test aggiuntivi; acquisizione di 86 fotogrammi e replay EGL, con 35 catture incluse. Test browser opzionale aggiornato, non eseguito nell’ambiente di consegna.
- Tutte le geometrie dei tre biomi, i sorgenti Blender e i contenuti didattici della 1.1.0 restano inclusi.

# 1.1.0 — Implementazione degli ambienti 3D

- UI della 1.0.0 conservata; contenuti, identificativi, quiz, modelli e store invariati.
- Galassia volumetrica e stellare; quattro famiglie di pianeti procedurali con atmosfera stratificata.
- Geometrie native Simbiosi, Esodo e Marea; quattro stazioni per mondo.
- Ombre, riflessi dell'acqua, nebbia, materiali e compositing separato dalla UI.
- Camera animata con pausa e movimento ridotto; evidenziazione delle connessioni di ricerca.
- Sorgenti Blender, esportatore, sette test grafici aggiuntivi e replay EGL inclusi.
- Avvio e build completamente locali, senza installare pacchetti npm.

La fonte didattica di 769 pagine e i contenuti pianificati mantengono la copertura della 1.0.0.
