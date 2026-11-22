# Esempi di esercizi dai sistemi della galassia

Questo file mostra un esempio completo di ogni esercizio delle quattro serie descritte in `docs/GUIDA_DOCENTE.md`. Nel sito i numeri cambiano a ogni apertura, perché vengono dallo stato della simulazione in quel momento; qui sono fissati da un seme, per poterli leggere prima di una lezione. Il file è generato con `node scripts/esercizi-esempi.mjs` e `tests/serie.test.mjs` controlla che corrisponda al codice.

Le serie legate al Rapporto usano il fronte della galassia con seme di sessione 7919, nel primo momento, a multipli di cinque minuti, in cui la serie contiene tutti i suoi esercizi. Gli esercizi sulle stazioni usano due stazioni del sistema «Acidi, redox e carbonio» con le scorte estratte come all'avvio dell'economia: la prima si ferma quando manca una merce, la seconda rallenta a metà ritmo.

## Esercizi sul Rapporto

Versione 1.52.0; unità math-c10 e math-p07. Si apre nel Rapporto sullo Sciame della Frontiera, pulsante «Esercizi di statistica».

Stato del fronte dopo 40 minuti: 11 incursioni lanciate, 10 concluse, 2 chiavi ricavate.

#### Probabilità dai pesi

Unità math-c10.

Lo Sciame sceglie il braccio della prossima incursione con probabilità proporzionale al peso di ciascun braccio. I pesi sono Matematica 0,51, Fisica 1,08, Chimica 0,51, Biologia 0,64. Con quale probabilità la prossima incursione colpisce il braccio della Fisica?

A. 65,1 %

B. 27,0 %

C. 25,0 %

D. 39,4 % (corretta)

Svolgimento:

- Somma dei pesi: 0,51 + 1,08 + 0,51 + 0,64 = 2,74.
- Probabilità del braccio della Fisica: 1,08 / 2,74 = 0,3942, cioè 39,4 %.
- Le quattro probabilità sommano a 1, perché i pesi sono stati divisi per la loro somma.

#### Valore atteso dell’ondata

Unità math-c10.

Il Rapporto prevede per la prossima incursione un'ondata fra 24 e 29 droni. Se tutti i numeri interi fra 24 e 29 fossero ugualmente probabili, quale sarebbe il numero atteso di droni?

A. 26,5 (corretta)

B. 5,0

C. 53,0

D. 6,0

Svolgimento:

- I valori possibili sono 29 − 24 + 1 = 6, ciascuno con probabilità 1/6.
- Il valore atteso è la somma dei valori per le loro probabilità; per interi consecutivi equiprobabili coincide con la media degli estremi: (24 + 29) / 2 = 26,5.

#### Probabilità totale

Unità math-p07.

Per ogni braccio il Rapporto dà la probabilità di essere colpito e la probabilità che l'incursione sia respinta: Matematica 18,7 % e 50 %; Fisica 39,3 % e 16 %; Chimica 18,7 % e 50 %; Biologia 23,3 % e 50 %. Qual è la probabilità che la prossima incursione sia respinta, qualunque braccio colpisca?

A. 41,5 %

B. 50,0 %

C. 36,6 % (corretta)

D. 16,0 %

Svolgimento:

- Per il teorema della probabilità totale, P(respinta) è la somma su tutti i bracci di P(braccio) · P(respinta | braccio).
- 0,187 · 0,50 + 0,393 · 0,16 + 0,187 · 0,50 + 0,233 · 0,50 = 0,3664, cioè 36,6 %.
- La semplice media delle quattro probabilità di respingere tratterebbe i bracci come ugualmente probabili.

#### Punteggio di Brier

Unità math-c10.

Le ultime 5 incursioni avevano queste probabilità previste di essere respinte, seguite dall'esito: 91 %, respinta; 83 %, respinta; 66 %, respinta; 51 %, respinta; 30 %, conversione. Calcola il punteggio di Brier, la media dei quadrati delle differenze fra probabilità prevista ed esito, con esito 1 per un'incursione respinta e 0 per una conversione.

A. 0,097 (corretta)

B. 0,483

C. 0,025

D. 0,278

Svolgimento:

- (0,91 − 1)² = 0,0081; (0,83 − 1)² = 0,0289; (0,66 − 1)² = 0,1156; (0,51 − 1)² = 0,2401; (0,30 − 0)² = 0,0900.
- Media: 0,4827 / 5 = 0,097.
- Il punteggio vale 0 per previsioni perfette e 0,25 per chi prevede sempre il 50 %; più è basso, meglio le previsioni descrivono gli esiti.

#### Scarto dalla previsione

Unità math-p07.

In 10 incursioni il braccio più probabile, o uno dei più probabili a pari merito, è stato colpito 7 volte. Le probabilità che lo fosse, sommate sulle 10 incursioni, danno 6,10; la somma dei prodotti p · (1 − p) dà 1,98. Di quante deviazioni standard il numero osservato si scosta da quello atteso?

A. 0,90

B. 0,45

C. 0,09

D. 0,64 (corretta)

Svolgimento:

- Trattando le incursioni come prove indipendenti, ciascuna con la sua probabilità, il numero di volte ha valore atteso 6,10 e varianza 1,98.
- Deviazione standard: √1,98 = 1,407.
- Scarto: (7 − 6,10) / 1,407 = 0,64.
- Uno scarto entro circa 2 deviazioni standard, in valore assoluto, è compatibile con il caso: la previsione regge.

## Esercizi sulle stazioni

Versione 1.53.0; unità chemistry-14 e chemistry-17. Si apre nel catalogo 3D, pulsante «Esercizi sulla stazione» di una stazione che trasforma almeno due merci.

### Fonderia a spina Tramontana

#### Merce limitante

Unità chemistry-14.

Fonderia a spina Tramontana lavora con il processo «Riduzione del minerale». A pieno ritmo consuma ogni secondo minerale 1,00, energia 0,30. Il magazzino contiene minerale 237, energia 81. Senza nuove consegne, quale merce finisce per prima, e dopo quanti secondi?

A. energia, 81 s

B. minerale, 182 s

C. minerale, 237 s (corretta)

D. energia, 270 s

Svolgimento:

- Per ogni merce si divide la scorta per il consumo al secondo: minerale 237 / 1,00 = 237,0 s; energia 81 / 0,30 = 270,0 s.
- Il tempo più breve decide: la merce minerale finisce dopo circa 237 s. È la merce limitante, come il reagente limitante di una reazione; le altre restano in eccesso.
- La merce con la scorta più piccola può durare di più, se il suo consumo è più lento.

#### Merce in eccesso

Unità chemistry-14.

Fonderia a spina Tramontana consuma ogni secondo minerale 1,00, energia 0,30. Il magazzino contiene minerale 237, energia 81, e la merce minerale finisce per prima dopo circa 237 s. In quel momento quale quantità di energia resta in magazzino?

A. 45,5

B. 9,9 (corretta)

C. 81,0

D. 71,1

Svolgimento:

- In 237 s Fonderia a spina Tramontana consuma 0,30 · 237 = 71,1 di energia.
- Resta 81 − 71,1 = 9,9.
- La merce energia è in eccesso: la produzione si ferma per mancanza di minerale, e il resto aspetta in magazzino.

#### Proporzioni della ricetta

Unità chemistry-14.

Fonderia a spina Tramontana produce 0,60 di metalli al secondo consumando, fra l'altro, 1,00 di minerale al secondo. Quale quantità di minerale serve per produrre 400 di metalli?

A. -160,0

B. 666,7 (corretta)

C. 240,0

D. 400,0

Svolgimento:

- Il rapporto fra minerale e metalli resta fisso: 1,00 / 0,60 = 1,6667.
- Per 400 di metalli: 400 · 1,6667 = 666,7 di minerale.
- È la stessa proporzione dei coefficienti di un'equazione bilanciata: raddoppiando il prodotto raddoppiano i reagenti.

#### Velocità media

Unità chemistry-17.

Durante 60 s di lavoro a pieno ritmo il magazzino di metalli di Fonderia a spina Tramontana passa da 54 a 90,0. Qual è la velocità media di produzione, in unità al secondo?

A. 1,50

B. 0,90

C. 0,60 (corretta)

D. 2160,00

Svolgimento:

- La velocità media è la variazione divisa per l'intervallo di tempo: (90,0 − 54) / 60.
- 36,0 / 60 = 0,60 unità al secondo.
- Con le concentrazioni al posto delle scorte è la definizione di velocità di reazione.

#### Condizioni e velocità

Unità chemistry-17.

Fonderia a spina Tramontana produce 0,60 di metalli al secondo. Un brillamento della stella dimezza il ritmo, e un danno del 40 % lo rallenta di 0,75 · 0,4, cioè del 30 %. Con entrambi, a quale velocità produce?

A. 0,12

B. 0,18

C. 0,30

D. 0,21 (corretta)

Svolgimento:

- Il danno lascia 0,70 del ritmo: 1 − 0,30 = 0,70.
- I fattori si moltiplicano: 0,60 · 0,5 · 0,70 = 0,21 unità al secondo.
- Come temperatura e catalizzatori in una reazione, le condizioni cambiano la velocità senza cambiare la ricetta.

### Serra Nernst

#### Merce limitante

Unità chemistry-14.

Serra Nernst lavora con il processo «Fotosintesi». A pieno ritmo consuma ogni secondo acqua 0,30, fertilizzanti 0,08, energia 0,08. Il magazzino contiene acqua 66, fertilizzanti 7, energia 15. Senza nuove consegne, quale merce finisce per prima, e dopo quanti secondi?

A. acqua, 220 s

B. fertilizzanti, 88 s (corretta)

C. energia, 188 s

D. fertilizzanti, 15 s

Svolgimento:

- Per ogni merce si divide la scorta per il consumo al secondo: fertilizzanti 7 / 0,08 = 87,5 s; energia 15 / 0,08 = 187,5 s; acqua 66 / 0,30 = 220,0 s.
- Il tempo più breve decide: la merce fertilizzanti finisce dopo circa 88 s. È la merce limitante, come il reagente limitante di una reazione; le altre restano in eccesso.
- La merce con la scorta più piccola può durare di più, se il suo consumo è più lento.

#### Merce in eccesso

Unità chemistry-14.

Serra Nernst consuma ogni secondo acqua 0,30, fertilizzanti 0,08, energia 0,08. Il magazzino contiene acqua 66, fertilizzanti 7, energia 15, e la merce fertilizzanti finisce per prima dopo circa 88 s. In quel momento quale quantità di acqua resta in magazzino?

A. 26,4

B. 39,6 (corretta)

C. 66,0

D. 59,0

Svolgimento:

- In 88 s Serra Nernst consuma 0,30 · 88 = 26,4 di acqua.
- Resta 66 − 26,4 = 39,6.
- La merce acqua è in eccesso. Senza fertilizzanti questa stazione lavora a metà ritmo e continua a consumare le altre merci.

#### Proporzioni della ricetta

Unità chemistry-14.

Serra Nernst produce 0,80 di cibo al secondo consumando, fra l'altro, 0,08 di energia al secondo. Quale quantità di energia serve per produrre 50 di cibo?

A. 625,0

B. 500,0

C. 4,0

D. 5,0 (corretta)

Svolgimento:

- Il rapporto fra energia e cibo resta fisso: 0,08 / 0,80 = 0,1000.
- Per 50 di cibo: 50 · 0,1000 = 5,0 di energia.
- È la stessa proporzione dei coefficienti di un'equazione bilanciata: raddoppiando il prodotto raddoppiano i reagenti.

#### Velocità media

Unità chemistry-17.

Durante 60 s di lavoro a pieno ritmo il magazzino di cibo di Serra Nernst passa da 79 a 127,0. Qual è la velocità media di produzione, in unità al secondo?

A. 1,317

B. 2880,00

C. 2,117

D. 0,80 (corretta)

Svolgimento:

- La velocità media è la variazione divisa per l'intervallo di tempo: (127,0 − 79) / 60.
- 48,0 / 60 = 0,80 unità al secondo.
- Con le concentrazioni al posto delle scorte è la definizione di velocità di reazione.

#### Condizioni e velocità

Unità chemistry-17.

Serra Nernst produce 0,80 di cibo al secondo. Un brillamento della stella dimezza il ritmo, e un danno del 60 % lo rallenta di 0,75 · 0,6, cioè del 45 %. Con entrambi, a quale velocità produce?

A. 0,16

B. 0,40

C. 0,04

D. 0,22 (corretta)

Svolgimento:

- Il danno lascia 0,55 del ritmo: 1 − 0,45 = 0,55.
- I fattori si moltiplicano: 0,80 · 0,5 · 0,55 = 0,22 unità al secondo.
- Come temperatura e catalizzatori in una reazione, le condizioni cambiano la velocità senza cambiare la ricetta.

## Energia e informazione

Versione 1.54.0; unità physics-20 e math-p07. Si apre nel Rapporto sullo Sciame della Frontiera, pulsante «Energia e informazione».

Stato del fronte dopo 5 minuti: 1 incursione lanciata, 1 conclusa, 0 chiavi ricavate.

#### Limite di Landauer

Unità physics-20.

I droni dello Sciame trasformano la materia in calcolo, e ogni bit cancellato costa almeno k · T · ln 2, il limite di Landauer. Il prossimo bersaglio più probabile è il sistema Matematica per le scienze, dove un pianeta ha una temperatura di equilibrio di circa 218 K; supponiamo che una stazione nella sua orbita stia alla stessa temperatura. Con k = 1,381 × 10⁻²³ J/K e ln 2 = 0,693, qual è l'energia minima per cancellare un bit a quella temperatura?

A. 2,09 × 10⁻²¹ J (corretta)

B. 4,34 × 10⁻²¹ J

C. 3,01 × 10⁻²¹ J

D. 0,91 × 10⁻²¹ J

Svolgimento:

- E = k · T · ln 2 = 1,381 × 10⁻²³ · 218 · 0,693.
- Il prodotto vale 2,09 × 10⁻²¹ J.
- La temperatura va in kelvin; senza il fattore ln 2 si otterrebbe l'energia termica tipica k · T, più grande del limite.

#### Il freddo conviene

Unità physics-20.

Nel sistema Matematica per le scienze il pianeta più caldo ha una temperatura di equilibrio di circa 323 K, il più freddo di circa 218 K; supponiamo che le stazioni nelle loro orbite stiano alle stesse temperature. Con la stessa energia, quante volte più bit può cancellare un drone nell'orbita fredda rispetto a uno nell'orbita calda, al limite di Landauer?

A. 1,48 (corretta)

B. 0,48

C. 0,67

D. 1,22

Svolgimento:

- Con energia E si cancellano al più E / (k · T · ln 2) bit: il numero è inversamente proporzionale alla temperatura.
- Il rapporto vale 323 / 218 = 1,48.
- Per questo un sistema che calcola ha interesse a stare al freddo, lontano dalla stella.

#### Rendimento di Carnot

Unità physics-20.

Centrale Dedekind, la centrale a fusione del sistema Matematica per le scienze, trasforma in lavoro il calore di una camera a 1000 K e cede il resto con radiatori alla temperatura di equilibrio della sua orbita, circa 323 K. Qual è il rendimento massimo possibile, quello di una macchina di Carnot fra queste due temperature?

A. 89,6 %

B. 67,7 % (corretta)

C. 32,3 %

D. 51,2 %

Svolgimento:

- η = 1 − T_fredda / T_calda = 1 − 323 / 1000.
- 323 / 1000 = 0,323, quindi η = 0,677, cioè 67,7 %.
- Nessuna macchina termica fra le stesse temperature fa meglio; radiatori più freddi alzano il limite.

#### Entropia della previsione

Unità math-p07.

Il Rapporto dà alla prossima incursione queste probabilità per braccio: Matematica 0,263, Fisica 0,263, Chimica 0,211, Biologia 0,263. Quanta informazione porta in media sapere quale braccio sarà colpito, cioè l'entropia di Shannon H = −Σ p · log₂ p?

A. 1,99 bit (corretta)

B. 2,00 bit

C. 1,38 bit

D. 1,93 bit

Svolgimento:

- 0,263 · log₂ 0,263 = −0,507; 0,263 · log₂ 0,263 = −0,507; 0,211 · log₂ 0,211 = −0,474; 0,263 · log₂ 0,263 = −0,507.
- H = 1,99 bit, contro i 2 bit di quattro bracci equiprobabili.
- Più lo Sciame si concentra su un braccio, meno informazione porta la notizia del bersaglio: l'entropia misura l'incertezza della previsione.

#### Sorpresa di un'incursione

Unità math-p07.

L'ultima incursione ha colpito il braccio della Chimica, a cui il Rapporto dava probabilità 0,250. Quanti bit di informazione, o di sorpresa, ha portato la notizia, con I = −log₂ p?

A. 1,39 bit

B. 0,60 bit

C. 2,00 bit (corretta)

D. 4,00 bit

Svolgimento:

- I = −log₂ 0,250 = 2,00 bit.
- Un evento probabile porta poca informazione, uno improbabile molta; la media della sorpresa sui bracci possibili è l'entropia.

## Crescita e replicazione

Versione 1.55.0; unità biology-21. Si apre nel Rapporto sullo Sciame della Frontiera, pulsante «Crescita e replicazione».

Stato del fronte dopo 25 minuti: 7 incursioni lanciate, 6 concluse, 1 chiave ricavata.

#### Tempo di replicazione

Unità biology-21.

I droni dello Sciame sono sonde che si replicano con la materia degli asteroidi. Supponiamo che l'ondata nasca da un solo drone e che ogni drone costruisca una copia di sé ogni 12 s, come una coltura di batteri in fase esponenziale. Dopo quanto tempo i droni sono 24, l'ondata massima prevista dal Rapporto?

A. 144,0 s

B. 38,1 s

C. 288,0 s

D. 55,0 s (corretta)

Svolgimento:

- In fase esponenziale N = 2^(t / g), con g = 12 s il tempo di generazione.
- Servono log₂ 24 = 4,585 generazioni.
- t = 12 · 4,585 = 55,0 s.
- Una crescita per raddoppi arriva in fretta a numeri grandi: con un drone nuovo ogni 12 s, uno alla volta, servirebbero 276 s.

#### Lineare o esponenziale

Unità biology-21.

L'ondata media prevista dal Rapporto è di 21,5 droni, e nel modello cresce di 1,4 droni a ogni incursione, una crescita lineare. Se invece crescesse del 10 % a ogni incursione, come una popolazione in fase esponenziale, quanti droni avrebbe dopo 10 incursioni?

A. 35,5

B. 55,8 (corretta)

C. 43,0

D. 236,5

Svolgimento:

- Crescita esponenziale: N = N₀ · (1 + r)^k = 21,5 · 1,1^10.
- 1,1^10 = 2,5937, quindi N = 55,8.
- Con la crescita lineare del modello sarebbero 21,5 + 1,4 · 10 = 35,5: all'inizio le due crescite si somigliano, poi l'esponenziale prende il largo.

#### Crescita logistica

Unità biology-21.

Nel sistema Matematica per le scienze ci sono 6 droni liberati, e un sistema ne ospita al più 40. Supponiamo che crescano secondo il modello logistico dN/dt = r · N · (1 − N / K), con r = 0,2 al minuto e K = 40, come una popolazione che si avvicina alla capacità del suo ambiente. Quanti droni al minuto si aggiungono in questo momento?

A. 6,80

B. 0,18

C. 1,02 (corretta)

D. 1,20

Svolgimento:

- dN/dt = 0,2 · 6 · (1 − 6 / 40).
- 1 − 6 / 40 = 0,850, quindi dN/dt = 1,02 droni al minuto.
- La crescita è più veloce a metà della capacità, N = 20, e rallenta fino a fermarsi vicino a K: è la fase stazionaria di una coltura.

#### Resistenza alla chiave

Unità biology-21.

La chiave 1 ha forza 0,43. A ogni uso lo Sciame cambia protocollo e la forza diventa 0,85 volte quella di prima, come un antibiotico che perde effetto quando i batteri diventano resistenti; sotto 0,15 la chiave smette di funzionare. Dopo quanti usi smette di funzionare?

A. 5 usi

B. 8 usi

C. 7 usi (corretta)

D. 6 usi

Svolgimento:

- Dopo n usi la forza vale 0,43 · 0,85ⁿ: serve 0,85ⁿ < 0,15 / 0,43 = 0,349.
- n > ln 0,349 / ln 0,85 = 6,48, quindi n = 7.
- Il calo è esponenziale: ogni uso toglie il 15 % di quel che resta, e la forza perde sempre meno in valore assoluto.

#### Crescita percentuale

Unità biology-21.

Il braccio della Matematica ha per lo Sciame il peso 0,64. A ogni conversione riuscita su quel braccio il peso cresce del 35 %, fino al massimo di 4. Quante conversioni consecutive servono per raggiungere il massimo?

A. 8 conversioni

B. 7 conversioni (corretta)

C. 6 conversioni

D. 15 conversioni

Svolgimento:

- Dopo n conversioni il peso vale 0,64 · 1,35ⁿ: serve 1,35ⁿ ≥ 4 / 0,64 = 6,250.
- n ≥ ln 6,250 / ln 1,35 = 6,11, quindi n = 7.
- Una crescita percentuale costante è esponenziale: come una coltura che cresce di una frazione fissa a ogni generazione.
