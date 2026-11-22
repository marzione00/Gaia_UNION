# Guida per il docente: esercizi dai sistemi della galassia

Dalla 1.52.0 alla 1.55.0 GAIA ha trasformato alcuni sistemi della simulazione in materia di esercizio: il Rapporto sullo Sciame della Frontiera, le ricette delle stazioni, le temperature dei pianeti e la crescita dello Sciame. Questa guida descrive le quattro serie di esercizi, le unità a cui appartengono, le ipotesi su cui si reggono e gli errori che le risposte sbagliate permettono di riconoscere. Un esempio completo di ogni esercizio, con domanda, risposte e svolgimento, si trova in `docs/ESERCIZI_SISTEMI.md`.

## L'idea

Gli esercizi sono scritti con i numeri della simulazione nel momento in cui lo studente li apre: i pesi con cui lo Sciame sceglie il bersaglio, le previsioni del Rapporto, le scorte di una stazione, le temperature di equilibrio dei pianeti. Ogni numero della domanda è mostrato arrotondato e la risposta è calcolata dai numeri arrotondati, così che lo studente possa rifare ogni passaggio con la calcolatrice e ottenere esattamente la risposta corretta. Gli esercizi restano fermi mentre lo studente risponde; una nuova apertura prende i numeri del momento e rimescola le risposte. Ogni dispositivo ha una propria sessione, con il proprio fronte della galassia: in classe due studenti vicini ricevono, di norma, numeri diversi.

## Le quattro serie

| Serie | Versione | Unità | Dove si apre | Esercizi |
|---|---|---|---|---|
| Esercizi sul Rapporto | 1.52.0 | math-c10, math-p07 | Rapporto, «Esercizi di statistica»; scheda di math-c10 e math-p07 sulla mappa | probabilità dai pesi, valore atteso dell'ondata, probabilità totale, punteggio di Brier, scarto in deviazioni standard |
| Esercizi sulle stazioni | 1.53.0 | chemistry-14, chemistry-17 | catalogo 3D, «Esercizi sulla stazione»; scheda di chemistry-14 e chemistry-17 sulla mappa | merce limitante, merce in eccesso, proporzioni della ricetta, velocità media, condizioni e velocità |
| Energia e informazione | 1.54.0 | physics-20, math-p07 | Rapporto, «Energia e informazione»; scheda di physics-20 sulla mappa | limite di Landauer, vantaggio del freddo, rendimento di Carnot, entropia della previsione, sorpresa di un'incursione |
| Crescita e replicazione | 1.55.0 | biology-21 | Rapporto, «Crescita e replicazione»; scheda di biology-21 sulla mappa | tempo di replicazione, crescita lineare ed esponenziale, crescita logistica, resistenza alla chiave, crescita percentuale |

Il Rapporto si apre dal riquadro del fronte sulla mappa della galassia. Il catalogo 3D si apre dal pulsante «Catalogo dei modelli» della schermata di un sistema (su telefono «Navi») o con un clic su una stazione della scena. Dalla scheda di un'unità sulla mappa il pulsante «Esercizi nella galassia» porta alla serie dell'unità; per math-p07, che compare in due serie, porta agli esercizi di statistica, e gli esercizi di energia e informazione si raggiungono dal Rapporto.

## Quando compaiono gli esercizi

Il fronte della galassia parte all'apertura della pagina e il suo tempo scorre mentre la pagina è aperta e visibile; su dispositivi molto lenti scorre più piano del tempo reale. Ricaricare la pagina riavvia il fronte con una nuova sessione. Alcuni esercizi richiedono una storia: nel modello della galassia, su dodici sessioni, le prime tre incursioni concluse arrivano fra 11 e 15 minuti, le prime otto fra 28 e 35 minuti, la prima chiave fra 19 e 28 minuti e i primi droni liberati fra 23 e 32 minuti.

| Esercizio | Condizione |
|---|---|
| Valore atteso dell'ondata | estremi dell'ondata diversi; dopo circa quindici incursioni l'ondata arriva al massimo di 30 droni e l'esercizio scompare |
| Probabilità totale | probabilità di respingere diverse fra i bracci, altrimenti la risposta sarebbe immediata |
| Punteggio di Brier | almeno tre incursioni concluse |
| Scarto in deviazioni standard | almeno otto incursioni concluse |
| Sorpresa di un'incursione | almeno un'incursione conclusa |
| Crescita logistica | un sistema con droni liberati sotto il limite di 40 |
| Resistenza alla chiave | una chiave ancora efficace |
| Merce limitante e merce in eccesso | almeno due merci della stazione con scorta |

Gli altri esercizi sono disponibili dall'inizio. Per una lezione con tutte le serie complete conviene aprire la pagina almeno mezz'ora prima e lasciarla aperta, oppure usare gli esempi di `docs/ESERCIZI_SISTEMI.md`.

## Come lavora la scheda

Gli esercizi si presentano uno alla volta, con quattro risposte. Conta la prima risposta: dopo la scelta la scheda dice se era esatta, indica quella corretta e mostra lo svolgimento passo per passo, insieme al conto delle risposte esatte. Le frecce scorrono gli esercizi, un pulsante riporta al Rapporto o alla scheda della stazione e un altro apre l'unità dell'esercizio. Domanda, risposte e svolgimento entrano nella descrizione accessibile della pagina. Le risposte restano nella pagina e non vengono registrate nel diario.

## Esercizi sul Rapporto

Lo Sciame sceglie il braccio della prossima incursione con probabilità proporzionale a un peso per braccio, che cresce dopo una conversione e cala dopo una sconfitta. Il Rapporto mostra le probabilità, l'ondata prevista, la probabilità di respingere l'incursione in ogni braccio e due punteggi delle previsioni.

Gli esercizi chiedono la probabilità di un braccio come peso diviso per la somma dei pesi; il valore atteso di una variabile uniforme sugli interi fra due estremi; la probabilità totale di respingere un'incursione, somma dei prodotti fra probabilità del braccio e probabilità condizionata; il punteggio di Brier, media dei quadrati delle differenze fra probabilità prevista ed esito; lo scarto fra colpi osservati e attesi del braccio più probabile, diviso per la deviazione standard.

Le ipotesi da dichiarare in classe sono due. Nel valore atteso dell'ondata gli interi fra gli estremi sono supposti equiprobabili, mentre il modello estrae un numero reale e lo arrotonda, per cui nella simulazione gli estremi sono meno probabili dei valori interni. Nello scarto le incursioni sono trattate come prove indipendenti, mentre i pesi cambiano con gli esiti: l'approssimazione è ragionevole per un primo confronto con il caso.

Le risposte sbagliate corrispondono a errori riconoscibili: la probabilità uniforme di un quarto al posto di quella pesata, il rapporto fra il peso del braccio e la somma degli altri (le quote al posto della probabilità), la media semplice delle probabilità di respingere al posto della media pesata, la somma dei quadrati al posto della media, lo scarto diviso per la varianza al posto della deviazione standard.

Uno spunto per la lezione: proiettare il Rapporto, far scrivere a ciascuno studente il braccio che ritiene più probabile e la probabilità di respingere, attendere l'incursione e confrontare previsione ed esito; dopo alcune incursioni il punteggio di Brier del Rapporto misura quanto la previsione regge sulla media.

## Esercizi sulle stazioni

Una stazione che trasforma alcune merci in un prodotto lavora come una reazione a proporzioni fisse: per ogni secondo a pieno ritmo consuma quantità date di ciascuna merce e produce una quantità data di prodotto. Hanno esercizi le 178 stazioni la cui ricetta trasforma almeno due merci, con 18 processi; restano fuori porti e habitat, che producono equipaggi, e le stazioni di difesa. Quando la stazione si trova nel sistema aperto, le scorte sono quelle del momento.

Gli esercizi chiedono quale merce finisce per prima e dopo quanto tempo, cioè il minimo dei rapporti fra scorta e consumo al secondo; quanto resta della merce che dura di più; la quantità di una merce necessaria per una quantità data di prodotto, dalla proporzione fissa della ricetta; la velocità media di produzione da due letture del magazzino; la velocità con un brillamento, che dimezza il ritmo, e un danno d, che lo rallenta di 0,75 · d.

L'analogia con la chimica va dichiarata. Le merci restano quantità astratte e le ricette sono proporzioni fisse scelte per la simulazione; la logica del reagente limitante, dell'eccesso e delle proporzioni è la stessa delle reazioni. Lo svolgimento distingue le 115 stazioni che si fermano quando manca una merce dalle 63 (serre, alghe e laboratori) che lavorano a metà ritmo e continuano a consumare le merci rimaste.

Le risposte sbagliate corrispondono alla merce con la scorta più piccola al posto di quella che dura meno, alla merce con il consumo più alto, al prodotto fra scorta e consumo al posto del rapporto, alla proporzione rovesciata, ai fattori di rallentamento sommati al posto di moltiplicati.

Uno spunto per la lezione: risolvere l'esercizio sulla merce limitante per una stazione del sistema aperto e poi osservare la stazione nella scena: il suo resoconto mostra le merci che mancano e, per le stazioni che si fermano, la cronaca del sistema annuncia la sosta.

## Energia e informazione

I droni dello Sciame trasformano la materia in calcolo, e il calcolo ha un prezzo termodinamico. Per il principio di Landauer cancellare un bit richiede almeno k · T · ln 2. Gli esercizi prendono le temperature di equilibrio dal modello fisico dei pianeti, nel sistema sul fronte del braccio più probabile, e usano k = 1,381 × 10⁻²³ J/K e ln 2 = 0,693.

Gli esercizi chiedono l'energia minima per cancellare un bit alla temperatura di un pianeta; quante volte più bit si cancellano con la stessa energia nell'orbita più fredda rispetto alla più calda; il rendimento massimo di Carnot di una centrale a fusione fra una camera a 1000 K e radiatori alla temperatura della sua orbita; l'entropia di Shannon delle probabilità per braccio; l'informazione portata dall'ultima incursione, −log₂ p.

Le ipotesi da dichiarare sono due: una stazione nell'orbita di un pianeta è supposta alla temperatura di equilibrio del pianeta, che dipende anche dall'albedo del pianeta stesso; la camera calda della centrale a 1000 K è un valore scelto per l'esercizio.

Le risposte sbagliate corrispondono all'energia termica k · T al posto del limite, alla temperatura in gradi Celsius, al rapporto fra le temperature rovesciato o elevato a potenza, al rapporto fra le temperature al posto del rendimento, ai logaritmi naturali o decimali al posto di quelli in base 2, ai 2 bit di quattro bracci equiprobabili al posto dell'entropia della previsione.

Uno spunto per la lezione: confrontare l'entropia della previsione all'inizio della sessione, quando i bracci sono equiprobabili e vale 2 bit, con quella dopo mezz'ora, quando lo Sciame ha imparato a preferire alcuni bracci.

## Crescita e replicazione

Lo Sciame si comporta come una popolazione. Gli esercizi chiedono il tempo in cui l'ondata prevista nascerebbe da un solo drone che si replica ogni 12 s, come una coltura in fase esponenziale; i droni dopo dieci incursioni con una crescita del 10 % a incursione, confrontati con la crescita lineare del modello, 1,4 droni a incursione; la crescita dei droni liberati di un sistema con il modello logistico, capacità 40 e tasso 0,2 al minuto; quanti usi servono perché una chiave, che a ogni uso conserva 0,85 della forza, scenda sotto 0,15; quante conversioni portano il peso più basso al massimo di 4 con una crescita del 35 % a conversione.

L'ipotesi da dichiarare riguarda il modello: nella simulazione le ondate crescono di una quantità fissa a ogni incursione, i droni liberati arrivano soltanto con le incursioni e nessun drone si replica. Il tempo di replicazione, la crescita del 10 % e il tasso logistico sono valori scelti per l'esercizio. Il calo della chiave e la crescita dei pesi sono invece le regole della simulazione.

Le risposte sbagliate corrispondono alla crescita di un drone alla volta al posto dei raddoppi, al 10 % applicato sempre alla partenza (crescita lineare), ai logaritmi in base diversa da 2, al termine N / K al posto di 1 − N / K, alla stima lineare del numero di usi o di conversioni.

Uno spunto per la lezione: tracciare su un grafico la crescita lineare e quella esponenziale dell'ondata per venti incursioni e far individuare il momento in cui l'esponenziale supera la lineare.

## File

Gli esercizi sono in `src/craft/esercizi.js`, `src/craft/esercizi-catene.js`, `src/craft/esercizi-energia.js` e `src/craft/esercizi-crescita.js`; l'indice delle serie è in `src/craft/esercizi-indice.js`. I controlli sono in `tests/esercizi.test.mjs`, `tests/catene.test.mjs`, `tests/energia.test.mjs`, `tests/crescita.test.mjs` e, per la serie intera, in `tests/serie.test.mjs`. Gli esempi si rigenerano con `node scripts/esercizi-esempi.mjs`.
