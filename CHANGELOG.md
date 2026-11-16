# 1.23.0: Il libro della galassia, capitolo pilota di chimica

- Nuovo capitolo «Mole e quantità di sostanza» (`chemistry-03`), il primo del volume di chimica: circa 7.000 parole con 8 figure, 10 esempi svolti, un'attività sperimentale e 20 esercizi risolti su tre livelli. Tratta la storia della mole, unità di massa atomica e pesi atomici standard, definizione del 2019 e costante di Avogadro, massa molare, conversioni fra massa, moli e particelle, composizione percentuale, formula minima e molecolare, analisi per combustione, idrati, volume molare e realizzazione pratica della mole.
- Il testo, le figure e gli esercizi sono originali. Il manuale di Petrucci e colleghi (*General Chemistry*, 11ª edizione) è usato come riferimento per la scelta degli argomenti; costanti e pesi atomici vengono da CODATA 2022 e dalla CIAAW, e ogni numero del capitolo è ricalcolato nei test.
- «Leggi il capitolo» compare anche nell'orbita del pianeta di chimica corrispondente.

# 1.22.0: Il libro della galassia, volume di fisica

- Tutte le 25 unità di fisica hanno un capitolo. Oltre al pilota «Forze e leggi di Newton», 24 capitoli riprendono dalla dispensa di fisica del corso testo, formule, diagrammi ed esercizi risolti. Il volume conta circa 112.000 parole, 575 figure, 710 esercizi e oltre 8.200 formule.
- Ogni capitolo si apre con il problema del pianeta dell'unità e rimanda ai capitoli vicini. I rimandi «Capitolo N» della dispensa portano al capitolo della galassia che contiene quel materiale.
- Sezioni scritte per il sito dove la dispensa dedica all'argomento poche pagine: pressione, legge di Stevino, manometri e barometri, macchine idrauliche, applicazioni di Bernoulli; origine della spinta, galleggiamento, misure di densità, aerostati, stabilità; momento come prodotto vettoriale, equilibrio del corpo rigido, leve, baricentro; momenti d'inerzia notevoli, assi paralleli, rotolamento; lavoro del campo, gradiente del potenziale, elettronvolt, energia del condensatore; resistività, serie e parallelo, leggi di Kirchhoff, effetto Joule. Con figure, esempi ed esercizi.
- I diagrammi della dispensa sono compilati da TikZ in SVG, ricolorati per il tema scuro e caricati quando si avvicinano allo schermo; in stampa riprendono i colori chiari.
- Lettura più fluida dei capitoli lunghi: le formule vengono composte prima fino alla sezione richiesta, poi a gruppi in sottofondo. Sul telefono le formule in linea troppo larghe scorrono di lato invece di allargare la pagina.
- Corretto: nelle figure disegnate nel capitolo le linee aperte con più punti non vengono più riempite.
- Nuovi strumenti: `tools/libro/tex2libro.py` per la conversione, `tools/qa_libro_browser.py` per la prova di tutti i capitoli nel browser.
- Nuovi test sui capitoli generati, sulle figure e sui numeri delle sezioni aggiunte.

# 1.21.0: Il libro della galassia, capitolo pilota

- Nuovo livello di lettura in HTML sopra la scena 3D: indice del capitolo, testo selezionabile, formule con MathJax caricato alla prima apertura, figure SVG, esempi svolti, esercizi con soluzione da aprire, approfondimenti a richiesta, stampa con le soluzioni aperte, impaginazione per telefono. La galassia resta visibile in trasparenza e la barra superiore resta attiva.
- Primo capitolo, pilota: «Forze e leggi di Newton», sulle sezioni 2.1-2.6 della dispensa di fisica. 16 sezioni, 9 figure, 20 esercizi su tre livelli, circa 8.000 parole: storia dell'idea di forza, sistema e interazioni, forze come vettori, i tre principi, diagramma di corpo libero, peso, normale, tensione, forza elastica, strategia di soluzione, limiti del modello, errori tipici.
- In orbita, per le unità con un capitolo, il pulsante principale diventa «Leggi il capitolo». I rimandi fra capitoli portano al capitolo collegato, o al suo pianeta se il capitolo non è ancora scritto.
- Le sezioni lette si registrano nel salvataggio locale e compaiono nell'indice con un segno di spunta.
- Nuovo indirizzo: `#/libro?unit=…&sezione=…`.
- Formato dei capitoli e regole editoriali in `docs/LIBRO.md`.
- Nuovi test: formato e sicurezza del testo, figure, indice dei capitoli, completezza del capitolo pilota, formule bilanciate, stile, risultati numerici ricalcolati.

# 1.20.1: Controllo del repository e correzioni

- All’avvio il sito non scarica più le geometrie delle tre scene Blender (52,6 MB): dalla 1.18.0 le superfici sono generate e di quelle scene servono solo i metadati. I file restano nel repository come riferimento dell’esportazione.
- Integrazione continua: le azioni di pubblicazione e di caricamento degli artefatti passano a versioni su Node.js 24 (`configure-pages@v6`, `deploy-pages@v5`, `upload-artifact@v7`, `upload-pages-artifact@v5`), al posto di quelle su Node.js 20 deprecate.
- Documentazione allineata alla versione corrente: mappe d’orbita generate per le destinazioni esplorabili, superfici generate con 2601 celle, stato delle scene Blender, guida di avvio aggiornata.
- Nuovo `docs/QA.md` con i risultati della 1.20.1 e il controllo del repository; il collaudo della 1.4.0, i suoi log e la nota di consegna sono archiviati in `docs/history-v1.4.0/`.
- Nuovo test: all’avvio si leggono solo i metadati delle scene, senza richieste di rete per le geometrie.

# 1.20.0: Mappe d’orbita dalle carte d’identità

- In orbita e nella vista del sistema i 100 pianeti esplorabili mostrano una mappa generata dalla loro carta d’identità: lo stesso stile di terreno, lo stesso livello del mare e gli stessi colori della superficie di atterraggio. Il pianeta visto dall’alto ora corrisponde a quello su cui si atterra.
- Le mappe sono calcolate con rumore 3D sulla sfera, senza cuciture né deformazioni ai poli. Crateri, atolli, vulcani e caldere sono distribuiti su tutto il pianeta; le dune seguono le fasce di vento delle basse latitudini.
- Il mare riflette la luce della stella: la mappa segna l’acqua nel canale alfa.
- Nuvole e atmosfera seguono la carta: niente guscio atmosferico sui pianeti quasi senza aria, nuvole più dense dove la copertura è maggiore, colore dell’atmosfera dal cielo della carta.
- Le mappe si costruiscono senza bloccare la pagina: una versione piccola subito, poi quelle più dettagliate qualche riga per fotogramma.
- I corpi di contorno mantengono le mappe NASA.
- Nuovi test: corrispondenza con le coordinate della sfera, frazione di mare uguale a quella della carta, assenza di cuciture, generazione a passi identica a quella in un colpo.

# 1.19.0: Specie, luoghi d’interesse ed esplorazione

- Ogni pianeta ospita da 0 a 6 specie generate dalla sua carta d’identità: 310 in tutto, 180 piante e 130 animali, con generi unici in tutta la galassia. Forme: erba a ciuffi, felce a rosetta, albero a ombrello, pianta a colonna, pianta a cuscino, organismo a calice, crosta biologica, pascolatore, esapode, volatore, medusa galleggiante.
- La carta decide forme, colori e proporzioni: famiglia, densità dell’atmosfera (si vola solo con un’atmosfera densa) e mare scelgono le forme; il tipo di stella colora le foglie; la gravità rende le forme più alte e slanciate o più basse e robuste. I 14 pianeti quasi senza atmosfera non hanno specie in superficie, e il diario spiega perché.
- Ogni pianeta ha da 2 a 5 luoghi d’interesse: il punto più alto, la forma del paesaggio tipica del suo terreno, la costa e fino a due eventi rari (aurora, geyser, tempesta, campo di impatti, eclissi). 402 luoghi in tutto, ciascuno con una spiegazione.
- Nuovo pulsante «Esplora il pianeta»: la camera si avvicina e passa da una specie o da un luogo all’altro; clic sul terreno o sui segnali per spostarsi, W A S D per muoversi. Ogni specie e ogni luogo si registra nel diario.
- Nuova scheda «Esplorazione» nel diario: pianeti con registrazioni, specie e luoghi registrati sul totale, elenco per pianeta. Le registrazioni sono nel salvataggio locale e nell’esportazione JSON.
- Aurora visibile nel cielo dei pianeti che la hanno nella carta; pennacchio di vapore sopra i geyser; volatori in volo con il battito delle ali.
- L’evento «pioggia di meteore» delle carte diventa «pioggia di meteoriti»: compare solo con un’atmosfera quasi assente, dove i frammenti non bruciano e arrivano al suolo.
- Collegamento diretto all’esplorazione: `#/surface?unit=…&mode=esplora`.
- Nuovi test: specie coerenti con la carta e con nomi unici, luoghi distanti fra loro e dalle stazioni, individui nel proprio habitat, diario di esplorazione nel salvataggio, camera e clic in esplorazione.

# 1.18.0: Superfici generate dalle carte d’identità

- Ogni pianeta esplorabile atterra su una superficie propria, generata dalla sua carta d’identità: terreno con uno dei 18 stili (colline, atolli, fiordi, dune, canyon, crateri, criovulcani, caldere e altri), mare con il colore della carta, luce del colore della stella, cielo da azzurro a nero con le stelle quando l’atmosfera è sottile, lune sopra l’orizzonte a destra della veduta, lontano dal titolo, piante tinte con il pigmento della carta e rocce sparse.
- Le quattro stazioni sono compatte e stanno in fila nel primo piano a sinistra, su piazzole spianate o su piattaforme dove il suolo è sotto il mare; il centro della veduta resta al paesaggio e al fenomeno.
- Camera più bassa con l’orizzonte in vista e campo visivo più ampio, sempre sopra il terreno; sul telefono inquadra il fenomeno nei quattro prototipi.
- Su schermi larghi un’ombra sfumata dietro il titolo lo mantiene leggibile anche sotto i cieli chiari.
- Nessuno dei 100 pianeti esplorabili ha anelli: il cielo delle superfici mostra quindi solo lune e stelle.
- Nella vista del sistema la stella ha il colore del suo tipo (nana rossa, arancione, gialla, bianco-gialla, bianco-azzurra).
- I quattro prototipi (Daisyworld, laghi del cobalto, maree, branco dell’isola) funzionano sulle nuove superfici.
- La superficie si genera all’atterraggio (circa 0,15 s in Node) e resta in memoria per gli ultimi tre pianeti visitati. Le tre scene Blender restano caricate per le altre viste.
- Nuovo test: superfici di tutti i 100 pianeti valide e diverse fra loro, stazioni selezionabili, camera sopra il terreno.

# 1.17.0: Carte d’identità dei 100 pianeti

- `src/worlds/genome.js` genera una carta d’identità per ogni pianeta esplorabile da famiglia, dimensione, lune, anelli, rotazione, inclinazione e area: stile di terreno (18 stili, tre per famiglia), livello del mare, rilievo, ruvidità, tipo di stella (cinque tipi, cinque sistemi ciascuno), colore della luce e del cielo, densità dell’atmosfera e nubi, gravità relativa, durata del giorno e inclinazione, lune e anelli, colori di piante, rocce e acqua, eventi rari (aurora, eclissi, tempesta, pioggia di meteore, eruzione di geyser). Valori illustrativi.
- Diversità controllata: i quattro pianeti di un’area hanno terreni diversi; una distanza fra carte pesa stile, famiglia, stella, mare, rilievo, ruvidità, colore delle piante, atmosfera e gravità; il generatore rigenera i parametri liberi finché ogni pianeta è lontano dai precedenti. Distanza minima fra due pianeti qualsiasi: 0,175; i test richiedono almeno 0,17.
- `src/worlds/terrain.js` calcola il terreno di ogni pianeta dalla sua carta, con il colore del suolo; servirà anche per le superfici di atterraggio.
- `content/worlds/genomes.json` e `docs/CARTE_IDENTITA.md` riportano le 100 carte; `tools/render_genomes.mjs` e `tools/genome_sheet.py` producono l’immagine con le 100 vedute dall’alto.
- Il sito non cambia ancora aspetto: le carte sono da approvare prima di applicarle a superfici, cielo e stelle dei sistemi.

# 1.16.0: Un fenomeno per pianeta, quattro prototipi in 3D

- Catalogo dei 100 fenomeni, uno per pianeta, legati al modello della rispettiva unità (`content/worlds/catalogue.json`, tabella leggibile in `docs/MONDI.md`): che cosa si vede, quale grandezza del modello lo comanda, kit 3D, superficie proposta e, dove c'è, il ruolo nella cornice di Gaia. Gli altri 96 sono proposte da approvare.
- Quattro mondi prototipo in superficie, comandati dal modello dell'unità:
  - Daisyworld («Biosfera, albedo e sistemi accoppiati»): margherite chiare e scure a chiazze; l'albedo A fissa le coperture con gli albedo del laboratorio Daisyworld (0,75, 0,25 e 0,5 per il suolo), la temperatura radiativa è quella del modello. Dall'orbita il pianeta schiarisce o scurisce con A.
  - Laghi del cobalto («Perturbazioni dell'equilibrio»): nove laghi geotermici fra 15 e 95 °C, rosa dove la forma rosa prevale e blu dove prevale quella blu, con K(T) del modello; vapore sui laghi caldi e etichette con temperatura e frazione blu.
  - Maree di una luna vicina («Gravitazione»): mare con due alte maree per ogni passaggio della luna, ampiezza proporzionale a μ/r³ e luna più grande quando è più vicina.
  - Il branco dell'isola («Iterazioni, stabilità e precisione numerica»): il numero di animali di ogni stagione segue la mappa logistica; l'erba ricresce dove la stagione precedente ha brucato meno; il pannello indica il regime (estinzione, valore stabile, oscillazione, caos).
- Pannello «Fenomeno del pianeta» in superficie con i numeri del modello e i comandi − e +: parte dai parametri del laboratorio dell'unità e le modifiche restano sul pianeta, senza cambiare il laboratorio. La scheda in orbita indica il fenomeno di ogni pianeta.
- Motore: disegno a istanze, particelle e animali animati nel vertex shader, acqua dei mondi con marea e onde; sul telefono la camera inquadra il fenomeno.
- Famiglie fissate per i quattro pianeti, per avere la superficie giusta: di conseguenza due pianeti delle stesse aree («Limiti, variazione e accumulazione» e «Momenti, leve ed equilibrio») passano da oceanico a vulcanico.
- Test sui mondi: catalogo completo, superfici dei prototipi, coperture di Daisyworld, monotonia della frazione blu con il segno di ΔH, proporzionalità delle maree, stati e regimi della mappa logistica.

# 1.15.0: Dispensa di fisica

- Aggiunta la dispensa «Fisica generale e moderna» (bozza revisionata, revisione 1 del 25 ottobre 2026), compilata dai sorgenti LaTeX nella variante digitale a pagina singola: `materials/fisica-generale-e-moderna.pdf`, 726 pagine.
- Pagine renderizzate per il lettore WebGL in `assets/pdf-fisica/` (726 immagini WebP a 1200 px, circa 65 MB), con indice, testo estratto e numero di pagina stampato. L'indice della fisica si carica solo alla prima apertura.
- Il lettore delle dispense gestisce due documenti: `#/pdf?doc=fis&page=N` apre la fisica, i collegamenti esistenti restano sulla matematica. Pagine, limiti e pagina stampata dipendono dal documento.
- Ogni unità di fisica rimanda alle sezioni corrispondenti della dispensa (campo `source` del catalogo e `originalSource` del corso): per esempio «Forze e leggi di Newton» alle sezioni 2.1-2.5, pagine stampate 214-222. Il pulsante «Dispensa PDF» delle unità e della scheda apre la prima pagina; la vista «Fonti» indica sezioni e pagine.
- Pagina «Fonti»: pulsanti separati per la dispensa di matematica e per quella di fisica.
- Controlli: `npm run check` verifica file, numero di pagine e intervalli di entrambe le dispense; nuovi test di rotta per la fisica.

# 1.14.0: Galassia, sistemi e pianeti più leggibili

- Colori delle discipline unificati in tutto il sito: ambra la matematica, azzurro la fisica, viola la chimica, verde la biologia. Gli stessi colori segnano i bracci della galassia, le aree, le orbite delle unità, la legenda e gli accenti delle schermate delle unità.
- Galassia:
  - aree come esagoni nel colore della disciplina, con riempimento traslucido più marcato per le aree già visitate o iniziate e un arco che conta le unità completate;
  - stelle dei bracci leggermente tinte con il colore della disciplina, senza spostare nessuna stella;
  - nomi delle aree un braccio alla volta (la disciplina filtrata, oppure quella dell'area selezionata), con l'area sotto il puntatore sempre nominata;
  - una sola riga di comandi in alto (percorso, «Cerca un argomento», «Percorsi», «Riprendi», «Guida», «Accessibilità»; sul telefono «Aa»);
  - rotazione, zoom e «Centra» raccolti in un gruppo compatto dentro la mappa, al posto della barra a tutta larghezza;
  - rimossa la bussola a tre assi in alto a sinistra, che non si leggeva come direzione; attenuato il guscio azzurro di nebulosa nella parte bassa.
- Sistema:
  - pianeti delle unità disegnati più grandi (1,55 volte il raggio calcolato), con un numero da 1 a 4 come nell'elenco; anello e nome sul pianeta selezionato o sotto il puntatore, anche passando sull'elenco;
  - orbite delle unità nel colore della disciplina, quella selezionata più marcata; orbite di contorno tenui;
  - alone della stella nel suo colore e nebulose di fondo più scure dentro il sistema.
- Pianeta: la camera guarda il pianeta di lato rispetto alla stella, con il confine fra giorno e notte visibile. Sul telefono il pianeta sta nella metà superiore e la scheda sotto, senza sovrapporsi; una sfumatura scura rende leggibile il titolo. Le due mappe terrestri sono specchiate e ruotate di tinta: i pianeti terrestri e oceanici non mostrano più i continenti della Terra.
- Superficie: stazioni con numero e nome (Lezione, Laboratorio, Verifica, Collegamenti) e segno di spunta quando l'unità ha superato la loro fase; pulsanti in basso con lo stesso nome.
- Guida della mappa aggiornata ai nuovi colori, all'arco delle unità completate e alle nuove etichette.

# 1.13.0: Interfaccia «Osservatorio notturno»

- Testo nitido: il canvas usa la densità reale dello schermo fino a 3×, invece del limite di 1,4×. I glifi sono rasterizzati a 2-3 volte la dimensione in pixel CSS, con mipmap; la scena 3D conserva la risoluzione interna precedente, quindi il costo grafico resta simile.
- Tema scuro coerente: superfici blu notte, accento azzurro, un colore per disciplina (matematica, fisica, chimica, biologia), pulsanti pieni senza bordo e pulsante attivo con testo scuro su accento. Le etichette dei pulsanti passano dal maiuscolo al maiuscolo solo iniziale; sigle come DNA, ATP o JSON restano invariate.
- Scala tipografica più grande: etichette a 14 px, didascalie a 13 px, testo di lettura a 17 px con interlinea 25 px.
- Schermata dell’unità riorganizzata: percorso della disciplina, titolo, sei fasi, livelli e viste su righe separate; su schermi larghi i controlli del laboratorio stanno accanto al grafico, che usa tutta l’altezza della colonna. Sotto il grafico e i pannelli un velo scuro copre il pianeta, che resta visibile solo nelle schermate di esplorazione.
- Domande dell’autoverifica come schede di risposta con lettera, segno di giusto o sbagliato dopo la risposta e spiegazione in una vista dedicata.
- Grafici dei laboratori con tacche su valori tondi (1, 2, 2,5 o 5 per una potenza di dieci), asse verticale che parte da zero quando i dati non sono negativi, etichette dell’asse allineate a destra e fattore comune «× 10ⁿ» per valori molto piccoli o molto grandi.
- Numeri con virgola decimale e potenze di dieci in apice (per esempio 10⁻⁹ m²/s) nei parametri, nei grafici e nelle attività. I parametri del laboratorio mostrano nome, valore e unità su una riga; nei pannelli stretti il nome va su una riga propria.
- Attività: gruppi di elementi che restano sulla stessa pagina (grafico, parametri e verifica dell’adattamento ai dati), riscontro e pulsante «Avanti» sopra le opzioni nei problemi guidati.
- Schermata di benvenuto in una colonna centrata di 680 px; pulsanti dell’atlante con etichette in maiuscolo solo iniziale e testo scuro sul pulsante attivo. Titoli delle schermate in maiuscolo solo iniziale.
- Daisyworld: i due grafici e le legende restano dentro il pannello, sopra i pulsanti in basso; su telefono il pulsante «Altri» sta nella riga dei laboratori e non copre più il sottotitolo. Missione pilota: sfondo pieno dietro il grafico e legende in maiuscolo solo iniziale.
- Testi delle unità allineati alle nuove etichette: i riferimenti ai pulsanti compaiono tra virgolette basse, per esempio «Regola», «Salva A», «Verifica».
- Atlante dei glifi rigenerato: apici, frecce e segno meno vengono da Inter invece che dal carattere di ripiego.

# 1.12.0: Tutte le unità di biologia scritte per intero

- Le 25 unità di biologia hanno ora testi scritti a mano ai tre livelli, sei domande commentate, un riepilogo finale e un ripasso guidato con un mini esercizio. Le 22 unità nuove coprono le aree «La cellula», «Energia della vita», «Geni e mutazioni», «Evoluzione», «Popolazioni e comunità» ed «Ecosistemi e regolazione».
- Attività delle 22 unità nuove, distribuite in modo che ogni area ne alterni almeno tre tipi:
  - carte da classificare o ordinare (6 unità): scala e organelli della cellula, DNA e PCR, forze evolutive e deriva, barriere riproduttive e speciazione, interazioni e competizione, cicli del carbonio e dell’azoto;
  - problemi guidati (6 unità): osmosi e pressione osmotica, bilancio energetico della respirazione, probabilità di mutazione e cornice di lettura, Hardy-Weinberg, indici di Shannon e Simpson, energia lungo le catene alimentari;
  - adattamento del modello ai dati (4 unità): cinetica di Michaelis-Menten, produzione e degradazione dell’mRNA, crescita logistica, ritorno all’equilibrio dopo una perturbazione;
  - laboratorio del modello con confronto A/B (6 unità): legge di Fick, curva di risposta alla luce, selezione naturale, correzione di Jukes e Cantor, risposta funzionale di tipo II, temperatura di Daisyworld.
- La riga «Fissati» delle attività di adattamento non ripete il punto quando l’unità di misura finisce con un punto.
- Dati controllati con calcolo e su fonti: popolazione degli elefanti marini nel 1892 e oggi, tasso di mutazione umano per generazione, serbatoi di carbonio ed emissioni del decennio 2010-2019 secondo l’IPCC, valori dei modelli nei punti del protocollo.
- Atlante dei glifi esteso con ᵢ, ç, Ç.

# 1.11.0: Tutte le unità di chimica scritte per intero

- Le 25 unità di chimica hanno ora testi scritti a mano ai tre livelli, sei domande commentate, un riepilogo finale e un ripasso guidato con un mini esercizio. Le 21 unità nuove coprono le aree «Materia e atomi», «Stati e soluzioni», «Reazioni e quantità», «Velocità ed equilibrio» e «Acidi, redox e carbonio».
- Attività delle 21 unità nuove, distribuite in modo che ogni area ne alterni almeno tre tipi:
  - carte da classificare o ordinare (6 unità): classificazione della materia, andamenti periodici, transizioni di fase, cause di una resa bassa, perturbazioni dell’equilibrio e colore del complesso di cobalto, gruppi funzionali e isomeri;
  - problemi guidati (6 unità): mole e formula minima, preparazione di soluzioni e diluizioni, stechiometria e reagente limitante, equazione di Arrhenius, tamponi con Henderson-Hasselbalch, masse molari dei polimeri;
  - adattamento del modello ai dati (2 unità): legge dei gas ideali V = nRT/p e cinetica del primo ordine;
  - laboratorio del modello con confronto A/B (7 unità): massa atomica media, transizioni dell’idrogeno, prodotto di solubilità con ione comune, calorimetria, equilibrio A ⇌ B, pH con il prodotto ionico dell’acqua, equazione di Nernst.
- I pulsanti delle categorie nelle serie di carte si allargano sull’etichetta più lunga e vanno a capo su schermi stretti, invece di troncarla.
- Valori numerici controllati con calcolo: masse isotopiche e media del cloro, energie delle serie di Lyman e Balmer, costante di Avogadro, volume molare, calori latenti dell’acqua, K_sp di AgCl, entalpia di neutralizzazione, fattori di Arrhenius, potenziali standard della pila di Daniell, temperature di ebollizione degli alcani, unità ripetitiva del nylon-6,6.
- Atlante dei glifi esteso con ν, ₀, ₁, ≪, ≫, ø, Ø.

# 1.10.0: Tutte le unità di matematica scritte per intero

- Le 25 unità di matematica hanno ora testi scritti a mano ai tre livelli, sei domande commentate, un riepilogo finale e un ripasso guidato con un mini esercizio. Le 21 unità nuove coprono le aree «Algebra ed equazioni», «Funzioni e variazione», «Geometria e trasformazioni», «Probabilità e dati» e «Matematica per le scienze».
- Due nuovi tipi di attività, scritti nel file dell’unità e controllati al caricamento:
  - «Adatta il modello ai dati» (`fit`): punti misurati con piccoli scarti fissati, parametri da regolare con − e +, scarto quadratico medio, suggerimento sulla direzione dopo due tentativi. Usato in «Funzioni» (parabola), «Trigonometria» (ampiezza e fase) e «Scala, energia, equilibrio e trasformazioni» (legge di raffreddamento di Newton). Un test verifica che i parametri nascosti siano l’unico minimo dello scarto sulla griglia dei parametri.
  - «Problema guidato» (`steps`): un calcolo svolto un passaggio alla volta, con il risultato di ogni passaggio che resta scritto e un commento per ogni scelta. Usato in «Equazioni e sistemi», «Complessi», «Esponenziali e logaritmi», «Geometria elementare», «Combinatoria, probabilità e statistica» e «Oscillazioni, molecole e quantizzazione».
- In ogni area si alternano laboratorio con confronto A/B, carte da classificare o ordinare, problemi guidati e adattamento ai dati.
- Quando un problema guidato passa al passaggio successivo, l’attività apre la pagina che lo contiene.
- Atlante dei glifi esteso con ħ, ö, ü, ä.

# 1.9.0: Spiegazioni estese e attività diverse in tre aree

- Undici unità scritte per intero, nelle aree «Numeri e ragionamento», «Legami e molecole» e «Divisione ed ereditarietà». Ogni fase ha spiegazioni complete ai tre livelli, con esempi svolti passo per passo, errori frequenti, limiti del modello e un ripasso guidato prima della verifica; ogni unità ha sei domande con quattro alternative commentate.
- Tre nuovi tipi di attività:
  - «Esistenza, unicità e approssimazione»: banco della bisezione su cinque funzioni, con la domanda di esistenza prima del calcolo (due funzioni sono trappole: discontinua, oppure senza cambio di segno).
  - «Legame ionico»: costruzione di dodici composti, dalla carica degli ioni secondo il gruppo al rapporto minimo, con ioni poliatomici e parentesi.
  - Serie di carte da classificare o da ordinare, scritte nel file dell’unità e controllate al caricamento: insiemi numerici ed equazioni («Radici, campi e nuovi sistemi numerici»), forze intermolecolari, temperature di ebollizione e solubilità («Forze intermolecolari»), fasi ed eventi del ciclo cellulare («Ciclo cellulare e proliferazione»).
- Tre unità scritte per intero mantengono il laboratorio del modello con il confronto A/B: «Ragionamento, conteggio e infinito», «Legame covalente ed energia di legame», «Meiosi e assortimento». Il protocollo di ogni laboratorio indica parametri, previsione da fare e che cosa osservare.
- Nelle tre aree si alternano ora attività di tipo diverso: proposizioni e controesempi, laboratorio, bisezione e carte in matematica; costruzione di composti, laboratorio, modello VSEPR e carte in chimica; carte, laboratorio e serra di Mendel in biologia.
- Dati numerici controllati su OpenStax Chemistry 2e e Biology 2e: energie di legame, energie reticolari, temperature di ebollizione, durate delle fasi del ciclo cellulare.
- Atlante dei glifi esteso senza spostare i glifi esistenti (`scripts/make_atlas.py --append`): esponenti da ⁰ a ⁹ con ⁺ e ⁻, pedici ₘ ₙ ₖ, ℕ ℤ ℚ ℝ ℂ, ≡, ±, σ, χ. Cariche come Al³⁺ e SO₄²⁻ si leggono senza la forma ^( ).
- Il suggerimento dopo un ordinamento sbagliato spiega la carta fuori posto, senza rivelare quella giusta.

# 1.8.0 — Tre pianeti prototipo

- Tre unità riscritte a mano, ciascuna con un’attività diversa al posto del grafico di una formula:
  - Matematica, «Linguaggio e ragionamento matematico»: banco di prova per proposizioni con quantificatori, verdetto e controesempio (otto proposizioni, sei da risolvere).
  - Chimica, «Geometria molecolare e VSEPR»: costruzione della molecola con domini e coppie solitarie, modello che ruota, sfida su dieci molecole (quattro da risolvere).
  - Biologia, «Ereditarietà mendeliana»: quadrato di Punnett, semine da 20, 100 e 1000 semi con chi quadro, reincroci su piante misteriose (tre da risolvere).
- Sei domande per unità con quattro alternative; ogni risposta sbagliata spiega l’errore che rappresenta. Viene registrato anche il numero di risposte giuste al primo tentativo.
- Pianeti a tema: mondo glaciale per la logica, vulcanico per le molecole, terrestre per la serra di Mendel.
- Il completamento delle unità prototipo richiede l’attività risolta al posto dei due esperimenti A e B.
- Gli esponenti da ⁰ a ⁵ restano scritti come esponenti (n², (3/4)⁴); gli altri usano ancora la forma ^( ).
- Contenuti in `content/curriculum/prototypes.json`, integrati da `npm run build:curriculum`; logica in `src/education/activities.js`, interfaccia in `src/education/activity-ui.js`.

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
