# 1.51.0: Catalogo 3D dei modelli

- Un catalogo 3D di tutti i 997 modelli della galassia, 564 stazioni e 433 navi, di cui 218 della flotta di difesa. Si apre dal pulsante «Catalogo dei modelli» di ogni sistema (su telefono «Navi») o con un clic su una stazione o una nave della scena; l'indirizzo nomina il modello e si può condividere.
- Il modello gira al centro con parti mobili, scudo e luci, si trascina e si avvicina; la fabbrica dei sistemi lo costruisce prima semplificato e poi completo.
- L'elenco filtra per gruppo (tutti, stazioni, navi, difesa) e mostra il sistema del modello o tutta la galassia; «Precedente» e «Successivo» scorrono i modelli. La scheda riporta tipo, sistema, processo e merci di una stazione, carico e velocità di una nave civile, forza contro lo Sciame di una nave di difesa, la descrizione e i triangoli del modello. Su telefono la scheda sta sotto il modello e l'elenco la sostituisce a richiesta.
- Nuovo `docs/CATALOGO.md`, generato dal codice con `node scripts/craft-catalogue.mjs`: tutti i modelli sistema per sistema, con tipo, genere, stile e lavoro. L'introduzione di `docs/STAZIONI_NAVI.md` riassume ora tutti gli aggiornamenti dalla 1.38.0.
- Nuovi `src/craft/registry.js` e `tests/catalogo.test.mjs`; il collaudo dell'applicazione apre il catalogo da un sistema, scorre i modelli, filtra, segue un indirizzo e torna al sistema.

# 1.50.0: Lo Sciame che impara e il Rapporto

- Lo Sciame impara: tiene un peso per ogni braccio della galassia e sceglie dove colpire in proporzione ai pesi; una conversione rafforza il braccio, un'incursione respinta lo indebolisce, e la cronaca annuncia il braccio preferito.
- La debolezza dello Sciame è la sua conoscenza: la difesa recupera campioni dai droni abbattuti, i laboratori ne ricavano una chiave e i corrieri la portano ai quattro fronti. La chiave libera parte di ogni ondata prima della battaglia; lo Sciame cambia protocollo a ogni uso, e dopo otto usi la chiave smette di funzionare.
- I droni liberati restano nel sistema, fino a 40 per sistema: riparano le stazioni senza attendere le parti e lavorano accanto alle miniere. Nella scena si staccano dall'ondata con un lampo verde, raggiungono il porto e volano fra le stazioni; la cronaca del sistema ne indica il numero.
- Il riquadro del fronte sulla mappa della galassia apre il Rapporto sullo Sciame della Frontiera: per ogni braccio la probabilità della prossima incursione, l'ondata attesa, i droni che la chiave libererebbe, la probabilità di respingerla e la chiave; poi i pesi imparati, i campioni, le chiavi, le ultime incursioni con previsione ed esito e due punteggi delle previsioni, fra cui quello di Brier.
- Nel modello della galassia, su otto semi e 60 minuti: 123 incursioni, 18 chiavi, la prima fra 1150 e 1480 s, 407 droni liberati; punteggio di Brier delle previsioni di esito 0,126.
- `tests/rapporto.test.mjs` controlla apprendimento, chiavi, droni liberati, previsioni, Rapporto, economia, battaglia dal vivo, scena e scheda. Descrizione in `docs/STAZIONI_NAVI.md`.

# 1.49.0: Lo Sciame della Frontiera

- Un avversario per la galassia: lo Sciame della Frontiera, un'intelligenza sintetica venuta dal margine della galassia che trasforma la materia in substrato di calcolo, con sonde autoreplicanti alla von Neumann e una fame spiegata dal limite di Landauer.
- Il fronte parte dai quattro sistemi di frontiera e può contendere fino agli ultimi quattro sistemi di ogni braccio. Le incursioni, ogni 170-300 s e sempre più grandi, colpiscono la linea del fronte: una incursione respinta fa arretrare il fronte, una riuscita converte stazioni per 300 s e lo fa avanzare; nessun sistema resta perso.
- Nel sistema aperto l'incursione si combatte dal vivo: i droni crescono come cristalli attorno a una roccia, volano verso una stazione, la flotta li intercetta con fino a sei navi e quelli che passano fermano la stazione per 40 s, ne trasformano le scorte e tornano polvere lasciando danni. Fuori dalla scena decide la forza della flotta del sistema.
- Sulla mappa della galassia un anello azzurro segna i sistemi contesi e un riquadro ne dà il conto; la Cronaca della frontiera entra nella cronaca del sistema aperto.
- Nuovo `src/craft/swarm.js`; `tests/sciame.test.mjs` controlla fronte, conversioni, battaglie e scena. Descrizione in `docs/STAZIONI_NAVI.md`.

# 1.48.0: Minacce naturali

- Tre minacce naturali scelte dal caso: sciami di 14-24 meteoroidi e asteroidi vaganti che arrivano da oltre l'anello esterno verso una stazione, e brillamenti della stella. La prima arriva fra 80 e 140 s, le altre ogni 220-400 s.
- La flotta di difesa intercetta: la stazione di sorveglianza vede la minaccia subito, partono le navi che arrivano per prime sulla rotta (fino a quattro contro uno sciame, fino a due contro un asteroide, dalla fregata in su quando ci sono), aspettano in posizione e sparano; piattaforme e fortezze vicine al bersaglio colpiscono negli ultimi secondi.
- Ciò che passa danneggia la stazione, che lavora più piano finché le navi non portano le parti per le riparazioni; un asteroide distrugge anche il 30 % delle scorte. Un brillamento dimezza per 45 s il lavoro delle stazioni scoperte; le stazioni di difesa e quelle vicine a un generatore di scudo restano intere.
- Nella scena: frammenti con scie, rocce, raggi, lampi, il fronte del brillamento, l'anello dello scudo e un triangolo che indica la minaccia, con resoconto al passaggio del puntatore; la cronaca racconta ogni fase.
- Nella simulazione di 1800 s su 30 sistemi e tre semi la flotta distrugge l'87,9 % dei frammenti e 139 asteroidi su 146; senza flotta il tempo a pieno ritmo delle stazioni scende dall'82,3 al 74,5 %, con la flotta dall'81,2 al 78,1 %.
- Nuovo `src/craft/threats.js`; `tests/minacce.test.mjs` controlla calendario, sciami, asteroidi, danni e riparazioni, brillamenti, testi e scena. Descrizione in `docs/STAZIONI_NAVI.md`.

# 1.47.1: Nuovo disegno della flotta di difesa

- Le undici classi di navi di difesa sono ridisegnate: scure, spigolose e asimmetriche. Le piastre di corazza sono sfaccettate, in grigio antracite e canna di fucile, con giunti e bordi arancio rosso nel colore della flotta. Le prue hanno punte di lunghezza diversa; lame e antenne sporgono dai fianchi, sponsoni e scafi laterali stanno su un solo lato, le guglie di comando sono fuori asse; finestre e motori sono color ambra.
- Anche le stazioni di difesa prendono i colori scuri dello stile. Una nave conta ora da 524 a 9118 triangoli, con mediana 1696; il livello semplificato ne ha il 40,1 %. Classi, catalogo, linea di difesa e pattuglie restano quelli della 1.47.0.

# 1.47.0: Flotta di difesa

- Undici classi di navi di difesa, dal caccia alla superportaerei, e cinque stazioni di difesa (base della flotta, stazione di sorveglianza, piattaforma di difesa, fortezza orbitale, generatore di scudo), in un nuovo stile della flotta: scafi sfaccettati e corazzati, torrette laser, difese ravvicinate, lanciatori di droni intercettori, emettitori di scudo, hangar e ponti di volo. Nomi di esploratori, navigatori e astronauti.
- La forza della difesa cresce verso la frontiera, l'ultimo sistema di ogni braccio: ogni sistema ha da 2 a 5 stazioni di difesa e da 3 a 8 modelli di nave, 84 stazioni e 134 navi in tutto, con le superportaerei nei quattro sistemi di frontiera. Una nave conta da 896 a 13 350 triangoli, una stazione da 1484 a 6480.
- Le stazioni di difesa formano una linea oltre la porta e l'anello esterno, senza spostare le altre stazioni. Le navi pattugliano fra base, stazioni di difesa, porta e porto; caccia e intercettori volano in formazione. Le stazioni di difesa consumano carburante, energia, cibo, parti e idrogeno e senza queste merci lavorano a metà forza.
- Nella simulazione di 1200 s su 30 sistemi e tre semi le consegne salgono da 63 502 a 66 950.
- Nuovo `src/craft/defence.js`; `tests/difesa.test.mjs` controlla catalogo, modelli, linea di difesa e pattuglie. Descrizione in `docs/STAZIONI_NAVI.md`.

# 1.46.0: Vita dei sistemi

- Le stazioni che producono crescono fino al terzo livello: dopo 300 s a pieno ritmo (600 s al secondo livello) chiedono un kit di ampliamento di parti di nave o di moduli abitativi, e ogni livello aggiunge un quarto ai ritmi e un quinto ai magazzini. Le stazioni cresciute si disegnano più grandi e il resoconto mostra il livello; la porta rifà il bilancio delle catene dopo ogni ampliamento.
- I cantieri varano navi con 30 parti ciascuna, al più una ogni 120 s, entro un limite di flotta per sistema; il modello è quello che porta le merci più richieste.
- Le importazioni della porta arrivano con convogli dai tre sistemi più vicini nella galassia, ogni 60-120 s: compaiono oltre la porta, scaricano, ripartono con le merci esportate e spariscono.
- Nuova cronaca del sistema sotto il pannello dell'unità, su schermi da computer: navi varate, stazioni che crescono, convogli, stazioni che si fermano e ripartono. Nuovo traffico minore: luci di navette fra ogni stazione e la più vicina.
- Nella simulazione di 1200 s su 30 sistemi e tre semi vengono varate 210 navi, arrivano 1218 convogli, 649 stazioni su 1440 crescono almeno di un livello e le consegne salgono da 59 453 a 63 502; il tempo a pieno ritmo delle stazioni che producono passa dall'81,8 all'83,9 %.
- `tests/vita.test.mjs` controlla crescita, vari, convogli, cronaca e traffico minore. Descrizione in `docs/STAZIONI_NAVI.md`.

# 1.45.0: Economia delle catene

- Le merci passano da 7 a 24, in cinque famiglie (grezze, lavorate, per la vita, avanzate, persone), e formano catene di lavorazione che seguono processi reali: riduzione del minerale in metalli, fusione dei silicati in vetro, crescita del silicio per i semiconduttori, fusione del ghiaccio, elettrolisi dell'acqua in ossigeno e idrogeno, sintesi dell'ammoniaca per i fertilizzanti, polimerizzazione, sintesi del propellente, fotosintesi e fotobioreattori.
- Le ricette sono 31. Fonderie, impianti chimici, arsenali, laboratori, centrali e fattorie della grammatica dei tipi lavorano su anelli diversi della catena secondo la loro famiglia. Le stazioni di trasformazione si fermano senza un ingrediente, le altre lavorano a metà ritmo; il resoconto nomina il processo («Elettrolisi dell'acqua: 120 t di ossigeno») o che cosa manca.
- La porta di ogni sistema bilancia le catene: importa le merci scarse con una riserva ed esporta quelle in eccesso. Le navi portano merci più varie, accettano carichi piccoli per gli ingredienti lenti e danno la precedenza alle stazioni che stanno per fermarsi; una merce che nessuna nave del sistema porta passa alla nave con la stiva più grande.
- Nella simulazione di 1200 s su 30 sistemi e tre semi le consegne salgono da 44 871 a 59 455, arrivano tutte le 24 merci e le stazioni classiche e aggiunte che producono lavorano il 95,2 e l'86,2 % del tempo, contro il 57,6 e il 40,1 % della 1.44.0.
- `tests/economy.test.mjs` controlla merci, ricette, bilancio delle porte, navi per ogni merce e vita dei sistemi. Descrizione in `docs/STAZIONI_NAVI.md`.

# 1.44.0: 120 classi di navi civili

- Le navi civili seguono la grammatica delle stazioni: ogni classe unisce una famiglia di scafo (affusolata, a cuneo, a fuso, a telaio, a capsula, a doppio scafo, a tre scafi, ad anello, a disco, modulare, ad ala, a sfere) e un ruolo (Cargo, Cisterna, Nave passeggeri, Corriere, Nave mineraria, Nave scientifica, Rimorchiatore, Nave di soccorso, Nave officina, Navetta). Dodici famiglie e dieci ruoli danno 120 classi, dieci volte le dodici classiche, che restano come sono.
- Nuova libreria di 40 moduli di bordo, dai container ai serbatoi sferici, dalle cupole panoramiche ai bracci laser delle navi minerarie, disegnati lungo lo scafo. Ogni classe ha il mestiere della classe classica del suo ruolo, con velocità e stiva della sua famiglia: le navi affusolate vanno più veloci e caricano meno, quelle modulari il contrario.
- Una classe conta da 792 a 9496 triangoli, con mediana 3212 su 600 modelli. Ogni sistema riceve da 4 a 8 modelli di queste classi, 179 in tutto, con tutte le 120 classi presenti e famiglie di scafo diverse in ogni sistema. Nella simulazione di 1200 s su 30 sistemi e tre semi viaggiano 1864 navi invece di 1149 e le consegne salgono da 32 734 a 44 871.
- Nuovo `src/craft/shipclasses.js`; `tests/shipclasses.test.mjs` controlla classi, nomi, moduli, mesh, mestieri, sagome, catalogo ed economia. Descrizione in `docs/STAZIONI_NAVI.md`.

# 1.43.0: Stazioni aggiunte nei sistemi

- Ogni sistema ha ora da 12 a 20 stazioni: alle sei del catalogo si aggiungono da 6 a 14 tipi della grammatica, 300 in tutto, scelti secondo la disciplina del sistema (osservatori e ripetitori per la matematica, centrali e laboratori per la fisica, impianti chimici e fonderie per la chimica, fattorie e habitat per la biologia). In un sistema nessun tipo si ripete, e in tutto il catalogo nessun tipo compare due volte nello stesso stile.
- Le sei stazioni classiche restano dove erano. Le aggiunte orbitano attorno a un pianeta solo se c'è spazio fra le orbite vicine; altrimenti viaggiano in corsie attorno alla stella fra due orbite, con raggio e velocità comuni, oppure in un anello fra la fascia e la porta; le stazioni su asteroide ruotano con la fascia. Nelle prove una stazione aggiunta resta ad almeno 1,56 volte la somma dei raggi da ogni altra stazione e ad almeno 1,23 volte da ogni pianeta che non la ospita.
- Nuove ricette per habitat (equipaggi da cibo ed energia), magazzini (ricevono e cedono cinque merci) e ripetitori (consumano energia). La porta esporta e importa in proporzione al numero di stazioni, e ogni modello di nave porta con sé da una a tre gemelle in più, secondo il numero di stazioni. In una simulazione di 1200 s su 30 sistemi e tre semi viaggiano 1149 navi invece di 581 e le consegne salgono da 12 833 a 32 734.
- `tests/added.test.mjs` controlla catalogo, collocamento, distanze ed economia delle stazioni aggiunte. Descrizione in `docs/STAZIONI_NAVI.md`.

# 1.42.0: Grammatica dei tipi di stazione

- I tipi di stazione diventano dati: ogni tipo unisce una famiglia di forme, che decide la sagoma del nucleo, e un ruolo, che decide i moduli montati sul nucleo. Dodici famiglie (a spina, a ruota, a disco, a grappolo, a traliccio, sferica, poliedrica, a torre, a croce, a piattaforma, a tamburo, su asteroide) e dieci ruoli (Habitat, Arsenale, Fonderia, Impianto chimico, Centrale, Laboratorio, Osservatorio, Fattoria, Magazzino, Ripetitore) danno 120 tipi, dieci volte i dodici tipi classici, che restano come sono.
- Nuova libreria di 60 moduli, sei per ruolo, dalle cupole abitate agli scali con navi in costruzione, dai forni con camini accesi alle colonne di distillazione, dai tori di fusione alle schiere di parabole, dalle serre alle rastrelliere di container. Ogni modulo si disegna dentro la lunghezza e il raggio che la famiglia gli assegna, quindi ogni ruolo si adatta a ogni famiglia; il ruolo dà anche le proporzioni dei moduli e il colore delle fasce del nucleo, lo stile della disciplina dà forme e materiali.
- Un tipo conta da 3248 a 28 752 triangoli, con mediana 11 102 su 600 modelli (ogni tipo nei cinque stili); il livello semplificato ne ha il 32,8 %. I nuovi tipi passano già dal motore della 1.41.0 e dal catalogo, ed entreranno nei sistemi con la 1.43.0.
- Nuovi `src/craft/modules.js`, `src/craft/families.js` e `src/craft/grammar.js`; `tests/grammar.test.mjs` controlla tipi, nomi, moduli, mesh, determinismo, livello semplificato e sagome: proiettate da tre lati su una griglia di 32 × 32 celle, due tipi della stessa famiglia si sovrappongono al massimo per lo 0,81 della loro unione, due tipi di famiglie diverse al massimo per lo 0,69. Descrizione in `docs/STAZIONI_NAVI.md`.

# 1.41.0: Motore delle flotte

- Stazioni e navi hanno due modelli: il completo, per ciò che sullo schermo supera i 40 pixel di raggio, e uno semplificato, costruito con la stessa ricetta, per tutto il resto; sotto un pixel circa restano punti luce. Sui 300 modelli del catalogo il semplificato ha il 28,9 % dei triangoli, con le stesse parti, le stesse luci e la stessa dimensione del completo. Il modello completo si costruisce soltanto quando qualcosa si avvicina, e i triangoli delle flotte di un fotogramma restano entro un bilancio che dipende dalla grafica scelta: 600 000 con dettaglio alto, 250 000 bilanciata, 120 000 leggera.
- I modelli si costruiscono in un worker del browser e arrivano pronti per la scheda grafica, quindi la costruzione, fino a 67 ms per i modelli più complessi sulla macchina di sviluppo, esce dal ciclo di disegno. Senza worker la costruzione resta sul thread principale, un modello per fotogramma.
- Le parti ferme di ogni modello formano una sola mesh; le navi di una classe si disegnano con una sola chiamata a istanze, e tutti i bagliori del sistema (luci, fiamme, scie e merci in movimento) con un'altra. Il disegno a istanze coincide con quello per singola nave entro 2 livelli su 255 per pixel. In un fotogramma della vista in orbita di «Geometria molecolare e VSEPR» le chiamate di disegno scendono da 125 a 66 e i triangoli da 301 528 a 265 162.
- Nuova pagina diagnostica: con `?diagnostica` nell'indirizzo un pannello mostra fotogrammi al secondo, durata dei fotogrammi, tempo di disegno sul processore, chiamate di disegno, triangoli, livelli di dettaglio in uso, modelli costruiti e GPU, così le prestazioni si misurano sulle schede grafiche reali. Gli stessi numeri sono in `GAIA.diagnostics().performance`.
- Nuovi `src/craft/factory.js`, `src/craft/worker.js`, `src/craft/detail.js` e `src/ui/diagnostics.js`; `tests/engine.test.mjs` controlla livelli di dettaglio, impacchettamento, coda dei lavori, worker, istanze e pannello. È il primo passo del piano che porterà stazioni e navi a dieci volte i tipi attuali, insieme alla flotta di difesa e alle minacce. Descrizione in `docs/STAZIONI_NAVI.md`.

# 1.40.0: Vita dei sistemi

- Ogni sistema aperto ha un'economia: miniere, raffinerie, serre, centrali, telescopi e laboratori producono minerale, carburante, cibo, energia e dati; il cantiere trasforma minerale ed energia in parti di nave; il porto consuma cibo, carburante ed energia; la porta importa merci dagli altri sistemi ed esporta dati e parti.
- Le navi trasportano le merci dove mancano: ogni nave libera sceglie il carico più conveniente fra quelli della sua classe, lo prenota, lo carica e lo consegna; senza nulla da trasportare osserva i pianeti, pattuglia le stazioni, cura le boe della porta o lavora al cantiere. Ogni nave del catalogo può viaggiare con una o due navi gemelle, quindi un sistema ha da 4 a 11 navi.
- Ogni avvio del sito sceglie un seme nuovo: scorte iniziali, navi gemelle, partenze e rotte cambiano a ogni visita.
- Le navi seguono archi sopra il piano delle orbite e girano al largo della stella. Nella vista del sistema sono punti colorati con una scia, e i rombi delle stazioni pulsano mentre producono; il puntatore mostra in tempo reale produzione e richieste delle stazioni, carico, destinazione e arrivo delle navi. In orbita si vedono le navi intere, i motori accesi in volo e le merci che passano fra nave e stazione durante il carico.
- Nuovi `src/craft/economy.js` e `src/craft/traffic.js`; `tests/life.test.mjs` controlla scorte, consegne, varietà fra i semi, distanza dalla stella e testi dei resoconti. Descrizione in `docs/STAZIONI_NAVI.md`.

# 1.39.0: Stazioni nei sistemi

- Le sei stazioni di ogni sistema compaiono nella vista del sistema e attorno ai pianeti visti in orbita. Ogni stazione ha un pianeta ospite adatto al suo compito: il porto e il cantiere orbitano attorno al primo pianeta di studio, la raffineria attorno a un gigante gassoso, la serra attorno a un pianeta oceanico o terrestre, il deposito criogenico attorno a un mondo ghiacciato, telescopi e radiotelescopi attorno ai pianeti più esterni; la miniera ruota con la fascia di asteroidi e la porta sta oltre la fascia, con l'anello rivolto verso la stella.
- Nella vista del sistema ogni stazione lontana è segnata da un piccolo rombo nel colore del suo stile; il puntatore mostra nome, stile e funzione, un tocco li riporta nella barra dei messaggi. In orbita le stazioni vicine si vedono intere, con parti mobili e luci di posizione.
- Il sito costruisce soltanto le sei stazioni del sistema aperto, una per fotogramma, e libera le mesh del sistema precedente al cambio di sistema.
- Nuovo `src/craft/placement.js`; `tests/stations.test.mjs` controlla ospiti, distanze, determinismo e gestione delle mesh. Descrizione in `docs/STAZIONI_NAVI.md`.

# 1.38.0: Generatore e catalogo di 300 stazioni e navi

- Nuovo generatore in `src/craft/`: costruisce dal codice, a partire da un seme, 300 modelli tridimensionali, dieci per ognuno dei 30 sistemi. Ogni sistema ha un porto nello stile della propria disciplina, una porta di passaggio nello stile civile, quattro stazioni legate ai suoi temi e quattro navi, due nello stile della disciplina e due in quello civile.
- Le stazioni sono 180, di dodici tipi: porto, porta, raffineria, radiotelescopio, telescopio, serra, miniera, cantiere, centrale, laboratorio dei campi, deposito criogenico e stazione poliedrica. Le navi sono 120, dieci per ognuna di dodici classi, dalla navetta alla nave gru. Le miniere stanno solo nei dieci sistemi con la fascia di asteroidi.
- Cinque stili di costruzione: la matematica usa scafi sfaccettati e poliedri, la fisica bobine e antenne, la chimica tubazioni, serbatoi e fasce di pericolo, la biologia forme arrotondate e vetro verde; lo stile civile è quello del traffico fra i sistemi.
- Ogni modello ha un nome unico, formato dal tipo e da uno scienziato della disciplina oppure, nello stile civile, da un vento o da una stella. Due modelli dello stesso tipo e stile differiscono in almeno due scelte strutturali; `scripts/craft-reroll.mjs` ricalcola i semi che lo garantiscono.
- Una stazione conta da 2148 a 27 690 triangoli, una nave da 920 a 8988; i dieci modelli di un sistema ne sommano da 44 260 a 92 504. In questa versione i modelli restano fuori dalla mappa; il collocamento nei sistemi e le rotte delle navi arriveranno nei due aggiornamenti successivi. Descrizione completa in `docs/STAZIONI_NAVI.md`.
- `tests/craft.test.mjs` controlla numero e distribuzione dei modelli, nomi, stili, determinismo, validità delle mesh, limiti di triangoli e varietà delle strutture.

# 1.37.0: Tre livelli distinti nei percorsi di biologia

- I 35 percorsi guidati di biologia hanno testi nuovi in tutte le tappe con testo visibile. Base spiega il concetto con un esempio semplice e con la sua storia; Applica svolge esempi numerici completi e chiude con una domanda per lo studente; Approfondisci aggiunge derivazioni, limiti dei modelli e la storia delle scoperte, compresi gli annunci poi smentiti. Prima ogni tappa aveva almeno un paragrafo in comune fra due livelli, in 106 tappe su 175 almeno due livelli coincidevano parola per parola e in 35 coincidevano tutti e tre.
- La prosa distinta di un'unità passa da una mediana di 1015 a 2418 parole, quella di tutte le 35 unità da 35 651 a 84 807; la tappa Capisci a livello Base passa da 121 a 235 parole. Il percorso letto ad Approfondisci si accorcia, da 1015 a 877 parole, perché prima conteneva anche i paragrafi di Base e di Applica. La storia va da Pasteur, Darwin e Mendel alle sonde Viking e Cassini, a JWST e ai campioni di Perseverance.
- I numeri vengono dai capitoli del libro, dagli articoli e dalle missioni citati nei capitoli e da valori di riferimento noti, oppure da calcoli riportati nel testo; le previsioni da salvare con «Salva A» e «Salva B» sono ricalcolate con le formule dei laboratori. I paragrafi già presenti restano, ciascuno in un solo livello.
- In «Titano, la chimica senza acqua» il rallentamento a 94 K di una reazione con energia di attivazione di 100 kJ/mol è ora circa 10³⁸ volte, come dà la legge di Arrhenius, invece di 10⁴⁰, nel testo e nella risposta della domanda corrispondente; in «Mutazioni e soglia d'errore» è corretto il refuso «ipercicio».
- `tests/levels.test.mjs` controlla anche la biologia, con le stesse lunghezze minime della chimica e della fisica. Numeri e regola in `docs/LIVELLI.md`.

# 1.36.0: Tre livelli distinti nei percorsi di fisica

- I 40 percorsi guidati di fisica hanno testi nuovi in tutte le tappe con testo visibile. Base spiega il concetto con un esempio semplice e con la sua storia; Applica svolge esempi numerici completi e chiude con una domanda per lo studente; Approfondisci aggiunge derivazioni, limiti dei modelli e la storia degli esperimenti. Prima ogni tappa aveva almeno un paragrafo in comune fra due livelli, e in 45 tappe su 200 almeno due livelli coincidevano parola per parola.
- Le spiegazioni sono più ampie: un percorso letto a livello Base passa da una mediana di 348,5 a 752,5 parole, la tappa Capisci a livello Base da 58 a 247, e la prosa distinta di tutte le 40 unità da 25 950 a 96 021 parole. La storia va dal metro della Rivoluzione francese e dal piano inclinato di Galileo alle onde gravitazionali e alla tensione sulla costante di Hubble.
- I numeri vengono dai capitoli del libro, dalle costanti del Sistema internazionale e da valori di riferimento noti, oppure da calcoli riportati nel testo; le previsioni da salvare con «Salva A» e «Salva B» sono ricalcolate con le formule dei laboratori. Nelle unità da 26 a 40 i paragrafi già presenti restano, ciascuno in un solo livello.
- Le unità da 1 a 25, generate da `content/curriculum/authored.json`, prendono i testi dal nuovo `content/curriculum/levels.json`, che `tools/build_curriculum.mjs` applica dopo la generazione; modelli, domande e glossario restano quelli generati. La loro nota sulla narrazione distingue lo scenario di fantasia e i dati sintetici del laboratorio dai fatti storici e dai valori reali citati nei testi.
- `tests/levels.test.mjs` controlla anche la fisica, con le stesse lunghezze minime della chimica. Numeri e regola in `docs/LIVELLI.md`.

# 1.35.0: Tre livelli distinti nei percorsi di matematica

- I 25 percorsi guidati di matematica hanno testi nuovi in tutte le tappe con testo visibile. Base spiega il concetto con un esempio semplice e con la sua storia; Applica svolge esempi numerici completi, spesso tratti da problemi storici, e chiude con una domanda per lo studente; Approfondisci aggiunge dimostrazioni, limiti dei modelli e la storia delle idee. Prima, in 42 tappe su 125, i tre livelli coincidevano parola per parola.
- Le spiegazioni sono più ampie: un percorso letto a un solo livello passa da una mediana di 743 a 963 parole a livello Base, la tappa Capisci a livello Base da 264 a 352, e la prosa distinta di un'unità da 839 a 2926 parole. La storia va dal papiro di Rhind e dalle tavolette babilonesi a Shannon, Nash e Feigenbaum.
- Esempi e risultati vengono dalla dispensa «Matematica di base» o da calcoli riportati nel testo; date e notizie storiche sono confrontate con J. Gullberg, «Mathematics: From the Birth of Numbers». I valori dei laboratori e delle serie di adattamento sono ricalcolati con le formule del programma.
- Le note sulla narrazione delle 25 unità precisano che gli esempi con persone, oggetti e luoghi generici sono illustrativi, mentre date e notizie storiche sono reali.
- `tests/levels.test.mjs` controlla anche la matematica, con lunghezze minime proprie per disciplina: 140, 330, 130, 170 e 110 parole nelle tappe Scopri, Capisci, Sperimenta, Interpreta e Collega. Numeri e regola in `docs/LIVELLI.md`.

# 1.34.0: Tre livelli distinti nei percorsi di chimica

- I 25 percorsi guidati di chimica hanno testi nuovi in tutte le tappe con testo visibile. Base spiega il concetto con un esempio semplice; Applica svolge esempi numerici completi e chiude con una domanda per lo studente; Approfondisci aggiunge derivazioni, limiti del modello e storia. Prima, in 101 tappe su 125, almeno due livelli coincidevano parola per parola.
- I numeri vengono dai capitoli del libro di chimica. La prosa distinta di un'unità, sommando i tre livelli, passa da una mediana di 674 a 2000 parole; la tappa Capisci a livello Base passa da 189 a 247 parole. Un percorso letto a un solo livello ha circa la stessa lunghezza di prima.
- Nelle unità con laboratorio ogni livello della tappa Sperimenta spiega come salvare le due configurazioni, perché lo studente legge un solo livello alla volta.
- Le note sulla narrazione di tre unità (03, 04, 09) descrivono ora gli esempi dei testi nuovi, e il commento di una domanda dell'unità 06 usa le energie reticolari del capitolo, 787 e circa 3790 kJ/mol.
- Nuovo `tests/levels.test.mjs`: per le discipline riscritte verifica lunghezze minime, assenza di paragrafi condivisi fra livelli e fra tappe, somiglianza fra livelli non oltre 0,2, stile e protocollo dei laboratori. `displayText` converte anche «ô». Regola e numeri in `docs/LIVELLI.md`.

# 1.33.1: Vista del sistema e vista in orbita sui telefoni bassi

- Sui telefoni alti meno di 700 pixel la vista del sistema nasconde il sottotitolo e la descrizione dell'unità, e la scheda dell'unità resta sopra i pulsanti in basso; prima, a 320 × 568, sottotitolo, numeri dei pianeti e scheda si sovrapponevano.
- Il pulsante «Torna alla mappa» della vista del sistema si accorcia sui telefoni stretti («Mappa» sotto i 360 pixel) e non copre più i pulsanti dello zoom.
- La riga con la famiglia del pianeta e la copertura dell'unità resta dentro la scheda.
- Nella vista in orbita, sui telefoni bassi, il sottotitolo lascia spazio alla scheda dell'unità, che termina sopra i pulsanti in basso.

# 1.33.0: Regioni dei bracci e mondi di sintesi

- Ogni braccio della galassia ha la sua nube: un ammasso aperto per la Matematica, una nube a riflessione per la Fisica, polveri interstellari per la Chimica, una regione di formazione stellare per la Biologia; una nube tenue segna la periferia in fondo al braccio della Fisica. L'ammasso della Matematica riceve la quota più alta di stelle brillanti aggiunte.
- Nuova scheda di regione (`#/region`), raggiungibile dalla mappa quando una disciplina è evidenziata e dall'avamposto: aree del braccio con avamposti, spedizioni e sezioni lette; corsie e porte di salto aperte; il cielo del braccio.
- Il Nucleo di Gaia è una destinazione al centro della mappa, con un punto e un pulsante che aprono i mondi di sintesi.
- Nuova scheda «Mondi di sintesi» nel Nucleo: Venere, Marte e la Terra dell'Archeano, con i dati delle schede NASA e delle fonti, ciò che ne dice il modello fisico del sito e la loro lettura nei termini di Lovelock. Per la Terra dell'Archeano il modello mostra il paradosso del Sole giovane e debole, con la luminosità della formula di Gough. Il diario conta i mondi visitati.
- Documentazione in `docs/REGIONI.md`; aggiornati `docs/NUCLEO_GAIA.md` e `docs/COSMIC_ENVIRONMENT.md`. `tests/regions.test.mjs` verifica bracci, passaggi, formula di Gough, dati dei mondi e visite; `tests/cosmos.test.mjs` verifica le nubi dei bracci; i flussi applicativi aprono una regione e visitano due mondi.

# 1.32.0: Gli avamposti di ricerca

- Ognuno dei 30 sistemi ha un avamposto di ricerca (`#/outpost`), raggiungibile dalla vista del sistema. Riunisce ciò che lo studente ha fatto nell'area in tre schede: unità dell'area, spedizioni, esplorazione.
- La scheda delle unità mostra per ognuna le sezioni lette del capitolo e la tappa del percorso guidato, con i pulsanti per il capitolo, il laboratorio del percorso e il pianeta in orbita. La scheda delle spedizioni riporta lo stato delle tre spedizioni di ogni pianeta e apre il loro pannello. La scheda dell'esplorazione conta pianeti misurati e visitati, specie registrate e passaggi aperti verso altre aree, con un pulsante per raggiungerle.
- L'avamposto si costruisce con la prima spedizione completata nell'area; prima di allora la stessa schermata è il suo cantiere, con il medesimo riepilogo. Il diario conta gli avamposti costruiti.
- Le sezioni dei 100 capitoli (1554) sono in `content/atlas/chapters.json`, generato da `tools/build_chapters.mjs`.
- Il Nucleo di Gaia e gli avamposti condividono ora le schede con le pagine, che si adattano all'altezza dello schermo.
- Documentazione in `docs/AVAMPOSTI.md`; `tests/outposts.test.mjs` verifica la copertura delle aree, la costruzione e il riepilogo, e i flussi applicativi entrano in un avamposto costruito e in un cantiere.

# 1.31.0: Le spedizioni

- Ogni pianeta offre tre spedizioni fatte degli esercizi risolti del suo capitolo: in orbita gli esercizi di base, in superficie gli intermedi, in profondità gli avanzati. I 100 capitoli ne contano 1928: 680 di base, 684 intermedi, 564 avanzati.
- Nel lettore ogni esercizio ha il pulsante «Segna come risolto», che si attiva dopo l'apertura della soluzione: lo studente confronta il proprio svolgimento con quello scritto e lo segna, in un'autovalutazione dichiarata. In cima agli esercizi il lettore riporta lo stato delle tre spedizioni.
- Nella vista in orbita il pulsante «Spedizioni» apre il pannello delle tre spedizioni, con gli esercizi risolti e un pulsante che apre il libro al primo esercizio ancora da risolvere. Nella vista del sistema un segno verde sotto il numero di ogni pianeta indica ogni spedizione completata; il diario conta spedizioni ed esercizi.
- Le 25 unità di matematica, senza capitolo, hanno la spedizione in orbita fatta delle 6 domande del percorso guidato, che contano quando la risposta è corretta; le altre due spedizioni attendono un capitolo.
- Le liste sono in `content/atlas/expeditions.json`, generato da `tools/build_expeditions.mjs`; il salvataggio registra gli esercizi risolti nel campo `solved`.
- Documentazione in `docs/SPEDIZIONI.md`; `tests/expeditions.test.mjs` verifica liste, completamento, domande di matematica e salvataggio, e i flussi applicativi completano due spedizioni.

# 1.30.0: Il Nucleo di Gaia

- Nuova schermata del Nucleo di Gaia (`#/gaia`), raggiungibile dalla nave e dalla scheda «Esplorazione» del diario. Applica la diagnosi di Lovelock: un pianeta abitato mantiene nella sua atmosfera gas che senza la vita reagirebbero fino all'equilibrio.
- La scheda «Mondi di riferimento» confronta l'energia libera disponibile di Terra (2326 J/mol con l'oceano, 1,5 J/mol nella sola atmosfera), Marte, Titano, Venere e Giove, con i valori e le cause di Krissansen-Totton, Bergsman e Catling (2016).
- La scheda «Firme atmosferiche» descrive le cinque firme dei pianeti, ognuna con il criterio pubblicato che la interpreta: ossigeno e metano, metano e anidride carbonica senza monossido di carbonio, ossigeno abiotico intorno alle nane rosse, gas vulcanici, assenza di atmosfera.
- La scheda «Diagnosi» elenca i pianeti misurati con l'analizzatore di biofirme e confronta il verdetto dell'atmosfera con la superficie, quando lo studente ci è sceso. Sui 125 pianeti: 83 conferme, 20 casi di vita trovata oltre una diagnosi aperta, 18 pianeti senza vita, 4 falsi negativi, nessun falso positivo.
- Nella scheda «Dati fisici» l'analizzatore di biofirme rivela ora la nuova riga «Firma atmosferica»; la riga «Vita» compare quando lo studente scende sul pianeta, e il diario registra le discese.
- Ottavo strumento della nave: il computer di bordo, che si ottiene con il percorso guidato di «Disequazioni» e calcola la nuova riga «Zona abitabile», l'intervallo delle distanze in cui il flusso della stella resta fra i due limiti della zona.
- Corretto: dalla 1.29.0, sui telefoni larghi 320 pixel, il titolo della scheda «Dati fisici» finiva sotto il pulsante «Nave»; ora la scheda mostra un titolo più breve.
- Documentazione in `docs/NUCLEO_GAIA.md`; `tests/biosignatures.test.mjs` verifica firme, esiti, valori di riferimento e zona abitabile, e i flussi applicativi seguono un pianeta dalla misura dell'atmosfera alla discesa in superficie.

# 1.29.0: La nave da esplorazione

- Nuova schermata della nave (`#/ship`), raggiungibile dalla scheda «Dati fisici» e dalla scheda «Esplorazione» del diario. La nave porta i sensori di base, che danno stella e orbita, e sette strumenti: radiometro infrarosso, spettrografo, gravimetro, magnetometro, radar di profondità, laboratorio di datazione e analizzatore di biofirme.
- Ogni strumento sale a bordo completando il percorso guidato della sua unità oppure leggendo fino in fondo tutte le sezioni del suo capitolo; la schermata indica quante sezioni restano e apre il capitolo. Le sezioni sono in `content/atlas/instruments.json`, generato da `tools/build_instruments.mjs`.
- In modalità esploratore, attiva in partenza, ogni riga della scheda fisica compare quando è a bordo lo strumento che la misura; altrimenti la riga indica quale strumento serve. Disattivando la modalità dalla nave, la scheda mostra tutto. Gli strumenti lasciano aperti capitoli, percorsi e mappa.
- Il diario registra quali strumenti hanno misurato ogni pianeta e ne tiene il conto nella scheda «Esplorazione».
- Corretto: dalla 1.25.0 il salvataggio scartava a ogni riapertura le registrazioni del diario sui pianeti con indice da 100 in su; ora accetta tutti i 125 pianeti.
- Documentazione in `docs/NAVE.md`; `tests/instruments.test.mjs` verifica strumenti, regole e salvataggio, e i flussi applicativi controllano che il radiometro, una volta a bordo, mostri luce e temperatura e registri la misura.

# 1.28.0: La mappa da scoprire

- Le aree tematiche mai visitate compaiono sulla mappa come segnali, con il solo contorno dell'esagono; diventano piene quando lo studente entra nel loro sistema o inizia una delle loro unità. Tutte restano raggiungibili dalla mappa, dalla ricerca e dai percorsi.
- Nuova rete di 147 passaggi fra le 30 aree, ricavata da 624 rimandi: 426 collegamenti fra capitoli del libro e 198 collegamenti e prerequisiti dei percorsi guidati. Le 78 corsie uniscono aree dello stesso braccio, le 69 porte di salto aree di discipline diverse. Il file `content/atlas/passages.json` è generato da `tools/build_passages.mjs`.
- Un passaggio si apre quando lo studente legge fino in fondo la sezione del capitolo che contiene il rimando, oppure quando un percorso guidato arriva alla stazione dei collegamenti. Sulla mappa i passaggi aperti sono archi, azzurri le corsie e dorati le porte di salto, più luminosi per l'area selezionata; in alto a sinistra la mappa conta aree visitate e passaggi aperti, e la scheda dell'area quelli che la toccano.
- La scheda «Esplorazione» del diario elenca i passaggi aperti con il capitolo o il percorso che li ha aperti; il testo per i lettori di schermo della mappa riporta quelli dell'area selezionata. La guida della mappa spiega segnali e passaggi.
- Regole e numeri in `docs/MAPPA_ESPLORAZIONE.md`; `tests/passages.test.mjs` verifica il file, la rete e le regole di apertura, e i flussi applicativi controllano che la lettura di una sezione apra il suo passaggio.

# 1.27.0: Il modello fisico dei sistemi e dei pianeti

- Ogni sistema ha una stella con temperatura, luminosità, raggio e massa di un sottotipo della tabella di Mamajek (nane di sequenza principale da M5V ad A0V) e una zona abitabile calcolata con i coefficienti di Kopparapu e colleghi (2014). I sei sistemi di ciascun tipo coprono i sottotipi dal più caldo al più freddo.
- Le orbite seguono la fisica. Ogni corpo ha un semiasse in unità astronomiche; ogni pianeta esplorabile sta dove la sua famiglia raggiunge il clima che il sito mostra, cioè acqua liquida dentro la zona abitabile per i pianeti terrestri e oceanici e ghiaccio per quelli glaciali, e fra due orbite vicine restano almeno dieci raggi di Hill reciproci. I corpi caldi di contorno stanno all'interno, i giganti gassosi e ghiacciati all'esterno. Nella vista del sistema l'ordine delle orbite può quindi differire dall'ordine di studio, che resta indicato dai numeri.
- La temperatura viene dalla temperatura di equilibrio e da un effetto serra grigio, tarato su Venere, Terra e Marte con i dati delle schede planetarie della NASA; la profondità ottica di ogni pianeta resta sotto quella di un'atmosfera di sola anidride carbonica alla stessa pressione.
- Nella vista in orbita il pulsante «Dati fisici» apre la scheda del pianeta in cinque parti: stella e orbita, geosfera, idrosfera, atmosfera, biosfera. Sul telefono la scheda si divide in pagine; il testo è disponibile anche ai lettori di schermo.
- Carte d'identità, specie e luoghi restano invariati. Le aree e i corpi disegnati dei sistemi passano in `src/scene/layout.js`, il modello in `src/worlds/physics.js` e `src/worlds/planet-physics.js`. Il modello, le fonti e la tabella dei 125 pianeti sono in `docs/FISICA_PIANETI.md`, generato da `tools/physics_doc.mjs`; `tests/physics.test.mjs` ricalcola ogni grandezza.
- Corretto: dalla 1.25.0, per i pianeti degli ultimi cinque sistemi («Mondi del sistema solare», «Cercare la vita nella galassia» e le tre aree di astrofisica) il pulsante «Torna all'area» portava all'area «Pianeti abitabili».

# 1.26.0: Il libro della galassia, unità di astrofisica del volume di fisica

- La fisica passa da 25 a 40 unità con quindici unità di astrofisica in tre nuovi sistemi stellari: «Luce e telescopi» (unità 26-30, stella bianco-azzurra di tipo A), «Campi e plasmi nello spazio» (unità 31-35, nana arancione di tipo K) e «Dalla relatività al Big Bang» (unità 36-40, stella bianco-gialla di tipo F). Le 25 unità esistenti restano invariate. La galassia conta ora 30 sistemi e 125 pianeti esplorabili, sei sistemi per ciascun tipo di stella.
- Ogni nuova unità ha un capitolo scritto per il sito: circa 87.000 parole, 90 figure, 240 esercizi risolti su tre livelli e oltre 4.200 formule, con un'esperienza da svolgere a casa o in classe in ogni capitolo. Il primo sistema tratta onde elettromagnetiche e pressione della luce, specchi, lenti e telescopi, interferometri, diffrazione e potere risolutivo, radiazione termica e luce delle stelle; il secondo la legge di Gauss per gusci e pianeti, le particelle cariche nei campi magnetici, le correnti e le dinamo dei pianeti, l'induzione e la radio, le equazioni di Maxwell e il magnetismo della materia; il terzo la relatività ristretta, le onde di materia e le righe spettrali, i nuclei e le datazioni, la fusione nelle stelle, le particelle elementari, l'espansione dell'universo e il Big Bang.
- Il manuale di D. Halliday, R. Resnick e J. Walker (*Fundamentals of Physics*, 12ª edizione estesa) resta soltanto un riferimento per la scelta e l'ordine degli argomenti, citato con i moduli in ogni capitolo; testi, figure, esempi ed esercizi sono originali. I dati vengono da fonti primarie aggiornate al 2026 (CODATA, NIST Atomic Spectra Database, AME2020 e NUBASE2020, Particle Data Group, parametri di Planck, risultati delle missioni spaziali). Ogni numero del testo e delle soluzioni è ricalcolato nei test (`tests/fisica.test.mjs`), che controllano anche l'elenco esatto dei quindici capitoli.
- Ogni nuova unità ha un percorso guidato scritto a mano ai tre livelli, con glossario, sei passi, sei domande commentate e un laboratorio con un modello proprio (`src/models/curriculum.js`); le fonti dei percorsi sono i volumi 2 e 3 di *University Physics* di OpenStax e le costanti del BIPM. Le prime 25 unità di fisica restano generate.
- Il catalogo dei fenomeni dei pianeti (`docs/MONDI.md`) e le carte d'identità (`docs/CARTE_IDENTITA.md`) comprendono i 125 pianeti; nelle carte il numero dei sistemi per tipo di stella si ricava ora dai dati (`tools/genome_doc.py`). Le famiglie dei nuovi pianeti mantengono a 0,175 la distanza minima fra le carte.
- La verifica della distribuzione HTTP controlla i 40 capitoli di fisica; la verifica del sito pubblicato controlla 125 corsi.

# 1.25.0: Il libro della galassia, volume di biologia e astrobiologia

- La biologia è riscritta attorno all'astrobiologia e passa da 25 a 35 unità in nove sistemi stellari. Le sette aree esistenti cambiano nome («La vita e la cellula», «Molecole dal cosmo», «Chimica prebiotica», «Informazione e replicatori», «Evoluzione e albero della vita», «Vita ai limiti», «Pianeti abitabili») e se ne aggiungono due, «Mondi del sistema solare» e «Cercare la vita nella galassia». La galassia conta ora 27 sistemi e 110 pianeti esplorabili; le stelle dei due nuovi sistemi sono una nana gialla e una nana rossa.
- Tutte le 35 unità hanno un capitolo scritto per il sito: circa 223.000 parole, 219 figure e 569 esercizi risolti su tre livelli, con un'esperienza da svolgere a casa o in classe in ogni capitolo. Gli argomenti vanno dalle definizioni della vita, dalle membrane e dalle molecole dello spazio ai meteoriti, alle comete e ai campioni di Ryugu e Bennu, alla chiralità, alla chimica prebiotica, alle sorgenti idrotermali e al mondo a RNA; poi codice genetico, soglia d'errore, selezione e deriva, LUCA, prime tracce della vita, ossigeno ed endosimbiosi, estremofili, metabolismi, fotosintesi sotto altre stelle, crescita microbica, zona abitabile, effetto serra, nane rosse e Daisyworld; infine Marte, Europa, Encelado, Titano, scoperta e atmosfere degli esopianeti, biofirme e falsi positivi, panspermia e protezione planetaria, SETI ed equazione di Drake.
- I manuali di A. M. Shaw (*Astrochemistry*, 2006) e di J. R. Morris e colleghi (*Biology: How Life Works*, 2ª edizione) restano soltanto riferimenti per la scelta e l'ordine degli argomenti, citati con i paragrafi in ogni capitolo. I dati vengono da fonti primarie aggiornate al 2026; le affermazioni di Shaw superate o errate sono corrette nel testo e segnalate nelle «Fonti». Ogni numero del testo e delle soluzioni è ricalcolato nei test (`tests/biologia.test.mjs`).
- Ogni unità di biologia ha un percorso guidato scritto a mano ai tre livelli, con glossario, sei domande commentate, un ripasso e un laboratorio; dove l'argomento è cambiato il laboratorio usa un modello nuovo. La rete di ricerca punta ora alla zona abitabile e alle biofirme, e i percorsi di studio seguono le nuove unità.
- Il catalogo dei fenomeni dei pianeti (`docs/MONDI.md`) e le carte d'identità (`docs/CARTE_IDENTITA.md`) comprendono i 110 pianeti; il foglio delle vedute dall'alto (`tools/genome_sheet.py`) dà alla biologia sette righe.
- Il numero dei sistemi e delle unità si ricava dalle aree tematiche (`SYSTEM_COUNT` e `UNIT_COUNT` in `src/scene/systems.js`): navigazione, atlante, motore dei corsi e salvataggi usano questi valori. La verifica del sito pubblicato controlla 110 corsi.

# 1.24.1: I capitoli si aprono dal catalogo e dalla mappa

- Nel catalogo «Argomenti», nella scheda dell'unità sulla mappa e nel pannello del sistema, le unità che hanno un capitolo del libro aprono il capitolo. Il pulsante si chiama «Leggi il capitolo». Fino alla 1.24.0 gli stessi pulsanti aprivano il percorso dell'unità, e i capitoli di fisica e di chimica erano raggiungibili soltanto dall'orbita del pianeta.
- Il percorso dell'unità, con i tre livelli e le domande di verifica, resta nell'orbita del pianeta («Apri l'unità») e nella scheda («Percorso 3D»).
- Il riferimento a `src/app.js` in `index.html` porta ora il numero di versione, così il browser scarica il codice nuovo dopo ogni rilascio.

# 1.24.0: Il libro della galassia, volume di chimica

- Tutte le 25 unità di chimica hanno un capitolo, scritto per il sito: circa 149.000 parole, 163 figure e 409 esercizi risolti su tre livelli. Ogni capitolo si apre con lo scenario del pianeta e rimanda ai capitoli vicini di chimica e di fisica.
- La teoria atomica è trattata per esteso: spettri e modello di Bohr, dualismo onda-particella, equazione di Schrödinger e numeri quantici dell'atomo di idrogeno, orbitali, spin, atomi a molti elettroni, carica nucleare efficace e periodicità.
- La termochimica comprende calorimetria a pressione e a volume costante, primo principio, entalpia, legge di Hess, entalpie di formazione e di legame, combustibili, entropia ed energia di Gibbs; i capitoli sugli equilibri collegano la costante di equilibrio all'energia di Gibbs e all'equazione di van 't Hoff.
- Altri argomenti: legami e geometria molecolare, forze intermolecolari, gas, stati della materia, soluzioni e solubilità, stechiometria e rese, cinetica ed equazione di Arrhenius, catalisi, equilibrio chimico e principio di Le Chatelier, acidi e basi, tamponi e titolazioni, ossidoriduzioni ed elettrochimica, chimica organica, polimeri e ambiente.
- Il manuale di Petrucci e colleghi resta soltanto un riferimento per la scelta degli argomenti, citato con i paragrafi in ogni capitolo; i dati vengono dall'appendice del manuale o da fonti primarie, e ogni numero del testo e delle soluzioni è ricalcolato nei test (`tests/chimica.test.mjs`).
- Le pagine dei capitoli non scorrono di lato a 390 pixel: formule in linea brevi, equazioni lunghe su più righe, tabelle di quattro colonne al massimo.

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
