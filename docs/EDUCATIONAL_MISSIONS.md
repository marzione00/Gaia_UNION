# Missioni didattiche 3D — ECHO-08

## Ambito della consegna

Prima implementazione del percorso «Il segnale di Simbiosi», basata su GAIA 1.4.0,
commit upstream `7e311fbef37dcf912d4e5bb0db382c122eec9ada`.
Non completa le altre unità del catalogo e non aggiunge corsi alle discipline ancora pianificate.

La voce **MISSIONI** del menu, il dossier di Funzioni e il permalink
`#/mission?unit=math-c08` aprono il nuovo percorso. Su schermi stretti il menu
principale contiene la voce MISSIONI; il percorso separa LEZIONE e LAB 3D.

## Contenuti e apprendimento

Sei fasi liberamente consultabili: Scopri, Capisci, Sperimenta, Interpreta,
Verifica, Collega. Tre livelli: Base, Applica, Approfondisci. Le 54 spiegazioni
contengono 1.968 parole (conteggio mediante separazione sugli spazi), a cui si
aggiungono quattro quesiti originali con feedback per tutte le alternative.
La fonte matematica esistente e la banca di 40 quesiti restano inalterate.

La narrazione è fiction dichiarata. Sei campioni esatti derivano dalla funzione
`I(t) = 0.25 (t - 5)^2 + 1`, per `0 <= t <= 10`. Non sono dati NASA né misure
astronomiche. L'intensità ha unità arbitrarie; i secondi appartengono allo scenario.
Il laboratorio confronta le famiglie `a*t+b` e `a*(t-h)^2+b`, con parametri limitati
per finalità didattiche. Non effettua regressione automatica, inferenza causale o
stima dell'incertezza. La RMSE viene calcolata sui sei campioni.

L'utente formula una previsione sulla variazione fra t=2 e t=4 prima di registrare
un esperimento. A e B conservano copie indipendenti dei parametri e delle previsioni.
Le curve esportate sono ricalcolate dalle formule, non da risultati fissi.
Una previsione errata è registrata e spiegata: non impedisce l'indagine.

La conclusione richiede due leggi effettivamente diverse registrate in A/B, quattro
risposte attualmente corrette, una nota personale non vuota e il riconoscimento dei
limiti, seguiti da un comando esplicito. Leggere una pagina non completa il percorso.
La presenza della nota non ne valuta automaticamente la qualità; il completamento
non è una certificazione di competenza. Gli errori possono essere corretti.

## Rendering: nessuna nuova immagine

Curve, griglia, assi, campioni, cursore e cornice sono mesh tridimensionali con
vertici, normali e indici. Le curve sono tubi campionati in 81 punti e vengono
renderizzate in tempo reale dal renderer e dagli shader WebGL 2 esistenti.
La profondità rende gli oggetti distinguibili, non è un terzo asse scientifico.
L'asse verticale usa una scala adattiva condivisa fra campioni, modello corrente e A.

Non vengono aggiunti immagini IA, fondali, screenshot di scena, video, texture o
font. I testi sono composti mediante l'atlante di glifi già presente: non vengono
trasformati in nuove immagini. Restano invariati asset NASA, biomi, scene cosmiche,
materiali e shader originali. Le eventuali catture di collaudo sono output di EGL,
non risorse caricate dall'applicazione.

Le geometrie sono memorizzate in cache e sostituite quando cambia una legge;
spostare il cursore temporale non ricostruisce le mesh. Il viewport del laboratorio
è separato e ripristinato dopo il disegno. Nessuna libreria runtime è stata aggiunta.

## Organizzazione

- `content/missions/index.json` registra il percorso; `echo08-signal.json` ne contiene
  spiegazioni, domande, obiettivi, prerequisiti, fonti e dichiarazioni di provenienza.
- `src/models/signal.js` contiene formule, campionamento, estremi, RMSE e validazione.
- `src/education/mission-engine.js` gestisce stato, sanificazione, esperimenti e verifica.
- `src/education/geometry.js` costruisce i tubi; `signal-scene.js` gestisce la scena 3D.
- `src/education/mission-ui.js` compone lezioni, controlli, verifica e testo semantico.
- `src/app.js`, `routing.js` e `store.js` integrano il modulo nei percorsi esistenti.

Il registro è una base per l'estensione; questa prima UI carica esplicitamente solo
ECHO-08 e il modello `signal`. Nuovi tipi di laboratorio richiedono un modello puro,
test, renderer dedicato e un'ulteriore registrazione: aggiungere JSON non li crea.

## Diario e accessibilità

Lo schema 1 del diario è esteso con `missions`, senza cambiare la chiave storage.
I registri precedenti privi di quel campo vengono conservati. I record importati
sono filtrati e limitati; la sola importazione di un timestamp non basta a rendere
completa una missione. La nota usa `mission:echo08-signal` e non sovrascrive il diario
personale generale. Esporta/Importa del diario include anche il nuovo stato.
L'esportazione RAPPORTO contiene campioni, A/B, previsioni, curve, risposte e nota.
Il rapporto è un documento di risultati, non sostituisce il formato di importazione
del diario. Se lo storage fallisce, rimane lo stato di sessione con un avviso.

I pulsanti e i cursori usano i controlli semantici nativi già sincronizzati con la UI
WebGL. Le alternative hanno etichette complete. Il testo semantico comprende valori,
campioni, formule e feedback. Frecce della camera e CENTRA evitano la necessità di
trascinare. Page Up/Down scorrono le pagine della spiegazione. La visualizzazione
non richiede animazione continua. Non viene dichiarata una conformità WCAG certificata.

## Verifiche riproducibili

Con Node 22 o successivo, dalla root del progetto completo:

```sh
npm test
npm run check
npm run build
npm run test:http
npm start
```

Il controllo risorse include registro, schema, fonti, prerequisiti, corrispondenza
con il modello e disponibilità dei glifi. Il controllo HTTP verifica anche i sette
nuovi file runtime del modulo. La build originale copia automaticamente `src/` e
`content/`: non richiede una rigenerazione di texture o pagine del lettore.

Collaudo grafico opzionale Linux, con Python, NumPy, Pillow e Mesa/EGL:

```sh
node tools/capture_mission.mjs /tmp/gaia-mission-qa
python tools/replay_mission_egl.py /tmp/gaia-mission-qa
```

La cattura usa le funzioni effettive del modulo e la tipografia esistente, registra
mesh, matrici e UI e controlla i rettangoli dei pulsanti. Il replay compila gli shader
originali. Non comprende l'intero ambiente cosmico, bloom, eventi browser o prestazioni
su GPU fisiche e non equivale al rendering completo del sito in un browser.
Il bundle storico `app.bundle.js` non è aggiornato: il runtime normale e la build
usano i moduli originali. Gli strumenti storici che richiedono il bundle devono
rigenerarlo prima del loro uso.

## Esito e limiti di questa consegna

56 test Node superati: 37 nuovi test del modulo e 19 regressioni originali dei file
`core.test.mjs` e `routing.test.mjs`. Non è stata rieseguita l'intera suite storica di
88 test: il resto non era contenuto nell'artefatto di distribuzione recuperato.
1.513 controlli risorse superati, build riuscita, 36 verifiche HTTP superate.
Sette viste del modulo renderizzate su EGL/OpenGL ES 3.2 Mesa senza errori GL.
I controlli UI coprono 108 combinazioni di fasi, livelli, domande e layout; le sette
catture comprendono 1600×1000, 1280×720 e 390×844.

Il browser disponibile nell'ambiente di sviluppo non esponeva WebGL 2. Pertanto
restano da collaudare nel browser di destinazione avvio completo, input/touch,
rotazione, navigazione avanti/indietro, download/importazione, salvataggio dopo la
chiusura, lettura assistita, perdita del contesto e prestazioni. Finestre inferiori
alle dimensioni verificate richiedono un ulteriore controllo.

GitHub ha rifiutato la creazione del branch con HTTP 403 «Resource not accessible
by integration». Questa implementazione non è stata caricata nella repository,
non esiste una pull request per essa e il sito pubblico non è stato modificato.
