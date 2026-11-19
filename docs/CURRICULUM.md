# GAIA 1.5 — Curriculum guidato per tutte le unità

## Stato della consegna

L'estensione implementa un nucleo didattico funzionante per ognuno dei 100 identificativi esistenti: 25 di matematica, 25 di fisica, 25 di chimica e 25 di biologia. Dalla versione 1.25 le unità sono 110: la biologia è riscritta attorno all'astrobiologia e conta 35 unità, con due nuovi sistemi stellari, «Mondi del sistema solare» e «Cercare la vita nella galassia». Dalla versione 1.26 sono 125: la fisica aggiunge quindici unità di astrofisica e conta 40 unità, con tre nuovi sistemi stellari, «Luce e telescopi», «Campi e plasmi nello spazio» e «Dalla relatività al Big Bang». Non equivale a cento manuali integrali, a una revisione scientifica umana o a una certificazione di competenze. La matrice `CURRICULUM_COVERAGE.md` e il CSV corrispondente dichiarano precisamente il contenuto di ogni nucleo. I nuovi testi sono originali e hanno stato editoriale `original-draft`.

Il progetto è basato sul commit `7e311fbef37dcf912d4e5bb0db382c122eec9ada` e comprende la precedente estensione ECHO-08. L'integrazione GitHub ha negato la creazione del branch con HTTP 403. Nessun commit remoto, pull request, merge o deploy è stato eseguito per questa consegna.

## Fruizione

Dal catalogo, selezionare una unità e aprire il percorso guidato. La voce MISSIONI apre l'unità selezionata. Le stazioni della superficie collegano i quattro settori del sistema. PERCORSI nel catalogo offre quattro sequenze disciplinari e tre itinerari interdisciplinari: clima, materia e popolazioni. La navigazione è libera; i prerequisiti sono consigliati, non blocchi.

Ogni unità presenta sei fasi: Scopri, Capisci, Sperimenta, Interpreta, Verifica, Collega. Le tre profondità sono Base, Applica, Approfondisci. Dalla 1.34.0 in chimica, dalla 1.35.0 in matematica, dalla 1.36.0 in fisica e dalla 1.37.0 in biologia i tre livelli sono testi distinti, senza paragrafi in comune fra livelli o fra tappe. Regola di scrittura e controlli in `docs/LIVELLI.md`.

Su telefono, LEZIONE, LAB 3D, ESPERIMENTO (PROVE sui display molto stretti) e FONTI separano i pannelli. ESPANDI aumenta l'area di lettura, mantenendo la navigazione tra pagine. Le alternative complete del quiz possono proseguire nella pagina successiva. Le etichette semantiche contengono il testo integrale. Touch, screen reader e tastiera devono comunque essere collaudati su dispositivi reali prima di dichiarare conformità.

Permalink: `#/mission?unit=physics-01`, `#/mission?unit=chemistry-08`, `#/mission?unit=biology-19`, `#/paths`. Il pilota ECHO-08 rimane raggiungibile da FONTI della nuova unità Funzioni e da `#/pilot?unit=math-c08`. La verifica originale delle Funzioni conserva i suoi 40 quesiti; le altre unità rimandano alla propria nuova autoverifica.

## Contenuto e modelli

Ciascun nucleo comprende una situazione narrativa distinta, spiegazione concettuale, derivazione, esempio numerico svolto, errore comune, ipotesi e limiti, approfondimento e quattro quesiti specifici con feedback per ogni alternativa. I quattro quesiti coprono concetto, calcolo, trasferimento a parametri diversi e ambito del modello.

I modelli puri, uno per unità, risiedono in `src/models/curriculum.js`: ogni modello dichiara variabile indipendente, risultato, unità, dominio, parametri ammessi, relazione e caso numerico di riferimento. I risultati sono calcolati, non codificati come animazioni prefabbricate. I campioni fuori dominio o non finiti non vengono congiunti da segmenti; le sequenze discrete hanno punti/barre e non finte curve continue. I grafici sono campionamenti finiti e non sostituiscono dimostrazioni analitiche.

Le scale sono adattive, condivise quando si confrontano corrente e scenario A. La profondità dei grafici non è una variabile scientifica. Gli schemi tridimensionali aggiuntivi — per esempio molecola, DNA, vettore, cellula, popolazione o pianeta — sono illustrativi e normalizzati. Una elica non è un modello atomistico della replicazione, i marcatori di popolazione non sono individui simulati, una sfera ad albedo fissata non è un modello climatico completo. La lezione Biology-25 integra il bilancio radiativo di riferimento; il laboratorio Daisyworld preesistente rimane distinto e conserva le sue equazioni di retroazione.

Tutti gli oggetti aggiunti sono mesh WebGL 2, con shader del progetto. Nessuna immagine IA, nessuna nuova texture, nessun fondale, nessun Canvas 2D e nessuna chiamata a un servizio generativo. Il testo usa l'atlante di glifi già distribuito. I caratteri matematici non presenti nell'atlante vengono trasformati in notazione esplicita, non in immagini. Le immagini di collaudo nel pacchetto sono render EGL effettivi e non sono caricate dall'app.

## Esperimenti, diario e avanzamento

Prima di salvare A o B occorre scegliere una previsione della variazione del risultato fra due punti dichiarati. Il cursore di esplorazione è indipendente da questi due punti di confronto. Cambiare un parametro invalida la previsione corrente, senza modificare i vecchi scenari. A e B conservano parametri e previsione del momento; i risultati vengono ricalcolati dal modello anche dopo l'importazione.

Per registrare il completamento servono due configurazioni distinte, quattro risposte corrette, una nota di almeno 60 caratteri e riconoscimento dei limiti. La lunghezza della nota non è una valutazione della qualità del ragionamento. Il sistema non attribuisce voti automatici alla riflessione e non rilascia certificazioni. Il controllo di coerenza del completamento non è una firma crittografica né un sistema antifrode.

Lo stato è salvato separatamente in `courses[unitId]`; il diario usa `notes['course:'+unitId]`. I vecchi campi del diario, le missioni pilota, quiz, scenari e note sono conservati. L'importazione convalida identificativi, parametri, alternative, numeri finiti e lunghezze. Non esiste sincronizzazione cloud. Quando lo storage non è disponibile si conserva solo la sessione: esportare il diario prima di chiudere. JSON esporta il rapporto e CSV esporta i campioni correnti, con unità nelle intestazioni.

## Fonti e licenze

Le schede FONTI collegano le dispense matematiche originali, manuali OpenStax pertinenti, BIPM per le costanti SI e il lavoro originale su Daisyworld. Sono riferimenti per verifica e approfondimento, non contenuti ripubblicati. Non sono stati copiati testi o immagini di questi manuali. Le rispettive condizioni di licenza non vengono sostituite dalla CC BY 4.0 del codice e dei contenuti originali GAIA. Restano validi `LICENSE.md` e `THIRD_PARTY_NOTICES.md`.

I 25 titoli, identificativi e rimandi alla fonte della matematica sono preservati; le quattro lezioni web, i 40 quesiti originali, i documenti del lettore, il PDF integrale, gli asset NASA, le mesh dei biomi e il cosmo non sono stati riscritti. Le 75 voci scientifiche prima riservate assumono titoli e stato `guided`, non `full-course`.

## Manutenzione e comandi

Il contenuto editoriale canonico è `content/curriculum/authored.json`. Le definizioni generate, l'indice, il bundle e i percorsi sono rigenerabili con `npm run build:curriculum`; il processo non scarica risorse. Un controllo di idempotenza verifica che rigenerare senza modificare le fonti produca gli stessi byte. I testi sono renderizzati attraverso componenti riutilizzabili: non serve generare centinaia di tessere immagini.

`npm run test:curriculum` esegue i test specifici; `npm test` sulla repository completa esegue anche tutte le sue regressioni. `npm run check` controlla modelli e riferimenti. `npm run build` genera `dist`, poi `npm run test:http` verifica via HTTP le risorse, incluse tutte le schede delle unità. `npm run test:integration` importa l'applicazione con un adattatore DOM/WebGL e attraversa i percorsi, ma non è un test browser.

Per ripetere il rendering di collaudo: `node tools/capture_curriculum.mjs qa-all/render`, poi `python tools/replay_curriculum_egl.py qa-all/render`. Il replay richiede Python, NumPy, Pillow e Mesa/EGL. Per l'applicazione servono Node.js 22+ per il server locale e un browser con WebGL 2; non occorre `npm install`. Aprire via HTTP, non con doppio clic su index.html.

## Validazione e limiti

Il rapporto `CURRICULUM_QA.json` separa test numerici, layout, applicazione con DOM simulato, HTTP, conservazione degli asset e rendering EGL. Le prove grafiche usano gli shader originali su Mesa llvmpipe. Non misurano FPS di una GPU fisica. Il Chromium disponibile nell'ambiente non esponeva WebGL 2: il collaudo browser completo non è stato eseguito.

L'ambiente locale proviene dall'artefatto GitHub Pages, che non comprende `sources/v7`. Tre vecchi confronti contro questi file non sono eseguibili qui e sono esclusi dal comando locale documentato nel rapporto, non eliminati dai test della repository. La conservazione dei materiali distribuiti è verificata separatamente contro l'artefatto originale. Non si dichiara eseguita tutta la suite storica di 88 test: il rapporto elenca soltanto i test effettivamente disponibili ed eseguiti.

Prima del merge: eseguire l'intera suite nella repository completa; verificare Firefox/Chromium/Safari su desktop e mobile, tastiera, focus, touch, clipboard, esportazione/importazione e persistenza dopo riavvio; revisionare scientificamente le spiegazioni e i quesiti; provare le attività con studenti. L'estensione fornisce copertura funzionale di tutti i moduli, non sostituisce questi collaudi editoriali e di dispositivo.

## Unità scritte per intero (1.9)

Le unità scritte a mano hanno testi, glossario e domande in `content/curriculum/prototypes.json`: dalla versione 1.10 tutte le 25 unità di matematica, dalla versione 1.11 tutte le 25 unità di chimica, dalla versione 1.12 tutte le 25 unità di biologia, riscritte nella versione 1.25 insieme alle dieci nuove unità di astrobiologia, e dalla versione 1.26 le quindici unità di astrofisica, da `physics-26` a `physics-40`. Le prime 25 unità di fisica restano generate; dalla 1.36.0 i loro testi, con tre livelli distinti, vengono da `content/curriculum/levels.json`, applicato da `npm run build:curriculum` dopo la generazione. `npm run build:curriculum` sostituisce con questi i testi generati; il campo `editorialStatus` vale `hand-written-draft`.

Le unità con il campo `activity` sostituiscono il laboratorio del modello con un’attività: `logic`, `bisection`, `ionic`, `vsepr`, `punnett` hanno contenuti in `src/education/activities.js`; `cards`, `fit` e `steps` leggono i contenuti dal file dell’unità. Ogni serie di `cards` è `classify` (carte, da due a quattro categorie, numero massimo di errori) oppure `order` (carte nell’ordine corretto). Ogni serie di `fit` indica il modello, le ascisse, gli scarti fissati delle misure, i parametri nascosti e quelli da regolare. Ogni problema di `steps` ha da due a sei passaggi con opzioni, indice della risposta corretta e risultato del passaggio. `validateCards`, `validateFit` e `validateSteps` rifiutano contenuti malformati al caricamento del registro. Le unità senza `activity` mantengono il laboratorio e il confronto A/B.

