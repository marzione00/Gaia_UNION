# Luoghi minori delle zone di atterraggio

Questo file è generato da `node scripts/minori.mjs` a partire da `src/worlds/finds.js`; `tests/minori.test.mjs` controlla che corrisponda al codice.

Dalla versione 1.78.0 la zona di atterraggio di ogni pianeta ospita da 6 a 40 luoghi minori, in mediana 31: in tutto 3770 sui 125 pianeti, di 7 tipi. Sono vene di minerale, ingressi di grotte, meteoriti, fari di navigazione della colonia, trivelle abbandonate, cippi della prima spedizione e scheletri di grandi animali, questi soltanto sui pianeti con animali dotati di ossa, cioè con forme diverse dalle meduse galleggianti.

I luoghi minori riempiono le parti della zona più lontane da tutto il resto. La zona è coperta da punti a 50 m l’uno dall’altro; per ogni punto di terraferma si calcola la distanza dal luogo da vedere più vicino (la base, gli insediamenti, i luoghi della carta, i siti e i luoghi rari), e il luogo minore successivo va sul punto più lontano, oppure sul posto adatto più vicino a quel punto entro 191 m: asciutto, quasi in piano, fuori dal quadrato delle stazioni e lontano dai siti, dai luoghi rari, dalla piazzola, dagli edifici e dagli altri luoghi minori, almeno 143 m. Il calcolo si ferma quando nessun punto di terraferma è più lontano di 400 m da un luogo da vedere o quando i luoghi minori sono 40; 42 pianeti arrivano a 40.

Senza i luoghi minori il 49% dei punti di terraferma ha un luogo da vedere entro 300 m e l’81% entro 500 m; con i luoghi minori le quote diventano il 90% e il 99,6%. Le zone in cui il 90% dei punti ha il luogo da vedere più vicino oltre 800 m passano da 10 a 1: i punti rimasti lontani sono soprattutto bassure e secche al livello del mare, che la misura conta come terraferma fino a mezza unità sotto l’acqua e dove nessun luogo minore trova un posto asciutto.

Un luogo minore raggiunto a piedi conta come scoperto, come uno rilevato dall’impulso dello scanner, che arriva a 500 m per i luoghi minori e a 1,3 km per i siti e i luoghi rari; la bussola e la mappa della zona mostrano quelli scoperti, e la mappa offre il viaggio rapido fino a loro. Lo scanner ne registra la descrizione nel diario. Sulla scena un luogo minore ha un indicatore soltanto quando è la voce scelta, e il suo nome compare entro 414 m dalla camera.

## Tipi di luogo minore

| Tipo | Modello | Calcolo della descrizione | Pianeti | Luoghi |
|---|---|---|---:|---:|
| Vena di minerale | vena di un minerale fra due blocchi di roccia, con cristalli o croste | peso di 1 m³ del minerale, ρ · g · V, contro il peso sulla Terra | 125 | 576 |
| Ingresso di grotta | ingresso ad arco in un dosso di roccia, con l’interno buio | temperatura all’interno vicina alla media della superficie | 124 | 567 |
| Meteorite ferroso | blocco di ferro e nichel mezzo sepolto in un anello di terra smossa | massa (densità 7800 kg/m³) ed energia cinetica ½ m v² alla velocità di fuga, in tonnellate di tritolo | 125 | 573 |
| Faro di navigazione | traliccio con la lanterna, l’antenna, un pannello solare e tre tiranti | distanza dell’orizzonte √(2Rh) dalla lanterna | 125 | 565 |
| Trivella abbandonata | trivella su treppiede con l’argano, le casse dei campioni, i tubi e un pannello caduto | luce della stella sul pianeta, 1361 W/m² per il flusso relativo, e potenza di un pannello di 2 m² | 125 | 567 |
| Cippo della prima spedizione | cumulo di pietre a secco con la targa del primo equipaggio | periodo di un pendolo lungo 1 m, 2π√(L/g), e la gravità che se ne ricava | 125 | 566 |
| Scheletro di un grande animale | spina dorsale, costole, cranio e ossa delle zampe di un grande animale | legge del quadrato e del cubo e peso che le ossa reggono con la gravità del pianeta | 91 | 356 |

Le vene sono di minerali diversi secondo la famiglia del pianeta: quarzo (2650 kg/m³), gesso (2320 kg/m³), pirite (5010 kg/m³), magnetite (5170 kg/m³), ematite (5260 kg/m³), malachite (3900 kg/m³), zolfo (2070 kg/m³), olivina (3300 kg/m³). Quarzo e gesso formano cristalli prismatici lunghi da 25 a 60 cm, pirite e magnetite cristalli cubici larghi da 6 a 15 cm, gli altri croste e noduli. Le rocce, le vene, i meteoriti e le ossa sono illuminati come il terreno, con la sua grana; i fari, le trivelle e le targhe come gli scafi.

## Esempio: i luoghi minori del primo pianeta

- **Scheletro di Ulda** (scheletro di un grande animale). Lo scheletro di un grande animale estinto, lungo 11 m, parente lontano della specie Ophicatia glacialis. Un animale lungo il doppio pesa otto volte tanto, mentre la sezione delle sue ossa cresce soltanto di quattro volte: per questo i grandi animali hanno ossa più tozze. Qui la gravità vale 0,76 g: le ossa di un animale reggono un peso 0,76 volte quello che la stessa massa avrebbe sulla Terra.
- **Grotta di Quaal** (ingresso di grotta). L’ingresso di una grotta, largo 9,3 m e alto 6,3 m, si apre in un dosso di roccia. Pochi metri dentro, la temperatura resta vicina alla media della superficie, −46 °C, perché la roccia attorno smorza le escursioni fra il giorno e la notte. Le grotte sono rifugi naturali per gli esploratori e, sui pianeti con vita, per molte specie.
- **Vena di Giler** (vena di minerale). Una vena di quarzo attraversa un affioramento di roccia nel bioma morene, con cristalli prismatici lunghi fino a 33 cm; più dura della roccia attorno, resta in rilievo quando questa si consuma. Un metro cubo di quarzo ha una massa di 2650 kg; qui pesa ρ · g · V = 19,6 kN, contro 26,0 kN sulla Terra. La massa resta la stessa su ogni pianeta; il peso cambia con la gravità.
- **Trivella di Bepe** (trivella abbandonata). Una trivella abbandonata dalla prima spedizione, con le casse dei campioni e un pannello solare caduto. Alla distanza del pianeta la stella manda 729 W/m², 0,54 volte la luce che arriva alla Terra; un pannello di 2 m² con un rendimento del 20% ne raccoglierebbe al massimo 292 W, con la luce perpendicolare e senza perdite nell’aria. La luce si spande su sfere sempre più grandi, quindi diminuisce con il quadrato della distanza dalla stella.
- **Faro di Gipe** (faro di navigazione). Un faro di navigazione della colonia, alto 17 m, guida i rover con una luce e un segnale radio. Chi sta a terra vede la sua luce fino a √(2Rh) = 12,8 km, con il raggio del pianeta R di 4810 km. Su un pianeta più grande lo stesso faro si vedrebbe più lontano: la distanza cresce come la radice del raggio.
- **Cippo di Daul** (cippo della prima spedizione). Un cippo di pietre a secco, alto 2,4 m, con la targa del primo equipaggio sceso sul pianeta. Qui l’equipaggio misurò la gravità con un pendolo lungo 1 m: periodo T = 2π√(L/g) = 2,31 s, contro 2,01 s sulla Terra. Dal periodo si ricava g = 4π²L/T² = 7,40 m/s².
- **Meteorite di Osza** (meteorite ferroso). Un blocco di ferro e nichel di circa 59 t, largo 2,4 m, giace mezzo sepolto in un basso anello di terra smossa. L’atmosfera, con 0,11 bar, lo ha frenato e ne ha fuso la superficie, rimasta segnata da piccole cavità; senza attrito sarebbe arrivato ad almeno 8,4 km/s, la velocità di fuga del pianeta. A quella velocità un corpo della stessa massa porta un’energia cinetica, ½ m v², pari a 501 tonnellate di tritolo.
- **Scheletro di Corsa** (scheletro di un grande animale). Lo scheletro di un grande animale estinto, lungo 13 m, parente lontano della specie Ophicatia glacialis. Un animale lungo il doppio pesa otto volte tanto, mentre la sezione delle sue ossa cresce soltanto di quattro volte: per questo i grandi animali hanno ossa più tozze. Qui la gravità vale 0,76 g: le ossa di un animale reggono un peso 0,76 volte quello che la stessa massa avrebbe sulla Terra.
- **Grotta di Zacor** (ingresso di grotta). L’ingresso di una grotta, largo 9,4 m e alto 6,8 m, si apre in un dosso di roccia. Pochi metri dentro, la temperatura resta vicina alla media della superficie, −46 °C, perché la roccia attorno smorza le escursioni fra il giorno e la notte. Le grotte sono rifugi naturali per gli esploratori e, sui pianeti con vita, per molte specie.
- **Vena di Ulos** (vena di minerale). Una vena di quarzo attraversa un affioramento di roccia nel bioma criovulcani, con cristalli prismatici lunghi fino a 46 cm; più dura della roccia attorno, resta in rilievo quando questa si consuma. Un metro cubo di quarzo ha una massa di 2650 kg; qui pesa ρ · g · V = 19,6 kN, contro 26,0 kN sulla Terra. La massa resta la stessa su ogni pianeta; il peso cambia con la gravità.
- **Trivella di Zagi** (trivella abbandonata). Una trivella abbandonata dalla prima spedizione, con le casse dei campioni e un pannello solare caduto. Alla distanza del pianeta la stella manda 729 W/m², 0,54 volte la luce che arriva alla Terra; un pannello di 2 m² con un rendimento del 20% ne raccoglierebbe al massimo 292 W, con la luce perpendicolare e senza perdite nell’aria. La luce si spande su sfere sempre più grandi, quindi diminuisce con il quadrato della distanza dalla stella.
- **Faro di Fenfen** (faro di navigazione). Un faro di navigazione della colonia, alto 13 m, guida i rover con una luce e un segnale radio. Chi sta a terra vede la sua luce fino a √(2Rh) = 11,3 km, con il raggio del pianeta R di 4810 km. Su un pianeta più grande lo stesso faro si vedrebbe più lontano: la distanza cresce come la radice del raggio.
- **Cippo di Silgi** (cippo della prima spedizione). Un cippo di pietre a secco, alto 2,4 m, con la targa del primo equipaggio sceso sul pianeta. Qui l’equipaggio misurò la gravità con un pendolo lungo 1 m: periodo T = 2π√(L/g) = 2,31 s, contro 2,01 s sulla Terra. Dal periodo si ricava g = 4π²L/T² = 7,40 m/s².
- **Meteorite di Daton** (meteorite ferroso). Un blocco di ferro e nichel di circa 25 t, largo 1,8 m, giace mezzo sepolto in un basso anello di terra smossa. L’atmosfera, con 0,11 bar, lo ha frenato e ne ha fuso la superficie, rimasta segnata da piccole cavità; senza attrito sarebbe arrivato ad almeno 8,4 km/s, la velocità di fuga del pianeta. A quella velocità un corpo della stessa massa porta un’energia cinetica, ½ m v², pari a 213 tonnellate di tritolo.
- **Scheletro di Saler** (scheletro di un grande animale). Lo scheletro di un grande animale estinto, lungo 10 m, parente lontano della specie Ophicatia glacialis. Un animale lungo il doppio pesa otto volte tanto, mentre la sezione delle sue ossa cresce soltanto di quattro volte: per questo i grandi animali hanno ossa più tozze. Qui la gravità vale 0,76 g: le ossa di un animale reggono un peso 0,76 volte quello che la stessa massa avrebbe sulla Terra.
- **Grotta di Teral** (ingresso di grotta). L’ingresso di una grotta, largo 8,4 m e alto 6,5 m, si apre in un dosso di roccia. Pochi metri dentro, la temperatura resta vicina alla media della superficie, −46 °C, perché la roccia attorno smorza le escursioni fra il giorno e la notte. Le grotte sono rifugi naturali per gli esploratori e, sui pianeti con vita, per molte specie.
- **Vena di Zaul** (vena di minerale). Una vena di quarzo attraversa un affioramento di roccia nel bioma campo di neve, con cristalli prismatici lunghi fino a 27 cm; più dura della roccia attorno, resta in rilievo quando questa si consuma. Un metro cubo di quarzo ha una massa di 2650 kg; qui pesa ρ · g · V = 19,6 kN, contro 26,0 kN sulla Terra. La massa resta la stessa su ogni pianeta; il peso cambia con la gravità.

## Luoghi minori dei pianeti

- **Linguaggio e ragionamento matematico** (pianeta 1, glaciale): 17 luoghi minori, 3 vene (quarzo), 3 grotte, 2 meteoriti, 2 fari, 2 trivelle, 2 cippi, 3 scheletri.
- **Algebra** (pianeta 2, oceanico): 24 luoghi minori, 3 vene (malachite, quarzo), 3 grotte, 3 meteoriti, 4 fari, 4 trivelle, 4 cippi, 3 scheletri.
- **Radicali** (pianeta 3, desertico): 40 luoghi minori, 7 vene (ematite, quarzo, gesso), 6 grotte, 7 meteoriti, 6 fari, 7 trivelle, 7 cippi.
- **Equazioni e sistemi** (pianeta 4, vulcanico): 23 luoghi minori, 4 vene (zolfo), 4 grotte, 3 meteoriti, 3 fari, 3 trivelle, 3 cippi, 3 scheletri.
- **Disequazioni** (pianeta 5, glaciale): 27 luoghi minori, 4 vene (pirite, gesso), 3 grotte, 4 meteoriti, 4 fari, 4 trivelle, 4 cippi, 4 scheletri.
- **Esponenziali e logaritmi** (pianeta 6, desertico): 40 luoghi minori, 7 vene (ematite, quarzo, gesso), 6 grotte, 7 meteoriti, 7 fari, 7 trivelle, 6 cippi.
- **Geometria analitica** (pianeta 7, terrestre): 18 luoghi minori, 3 vene (pirite, malachite, quarzo), 3 grotte, 2 meteoriti, 3 fari, 2 trivelle, 2 cippi, 3 scheletri.
- **Funzioni** (pianeta 8, terrestre): 27 luoghi minori, 4 vene (pirite, malachite), 4 grotte, 4 meteoriti, 3 fari, 4 trivelle, 4 cippi, 4 scheletri.
- **Trigonometria** (pianeta 9, oceanico): 37 luoghi minori, 6 vene (malachite, quarzo, pirite), 5 grotte, 6 meteoriti, 5 fari, 5 trivelle, 5 cippi, 5 scheletri.
- **Combinatoria, probabilità e statistica** (pianeta 10, oceanico): 28 luoghi minori, 4 vene (malachite, pirite), 4 grotte, 4 meteoriti, 4 fari, 4 trivelle, 4 cippi, 4 scheletri.
- **Geometria elementare** (pianeta 11, craterizzato): 40 luoghi minori, 7 vene (quarzo, ematite, magnetite), 7 grotte, 6 meteoriti, 7 fari, 7 trivelle, 6 cippi.
- **Dagli zeri alla struttura di un polinomio** (pianeta 12, terrestre): 28 luoghi minori, 4 vene (quarzo, malachite, pirite), 4 grotte, 4 meteoriti, 4 fari, 4 trivelle, 4 cippi, 4 scheletri.
- **Esistenza, unicità e approssimazione** (pianeta 13, desertico): 37 luoghi minori, 6 vene (ematite, quarzo), 6 grotte, 5 meteoriti, 5 fari, 5 trivelle, 5 cippi, 5 scheletri.
- **Ragionamento, conteggio e infinito** (pianeta 14, oceanico): 28 luoghi minori, 4 vene (quarzo, malachite), 4 grotte, 4 meteoriti, 4 fari, 4 trivelle, 4 cippi, 4 scheletri.
- **Vettori, matrici, dati e vincoli** (pianeta 15, glaciale): 15 luoghi minori, 3 vene (pirite, gesso, quarzo), 3 grotte, 2 meteoriti, 2 fari, 2 trivelle, 3 cippi.
- **Complessi, aritmetica e polinomi** (pianeta 16, craterizzato): 39 luoghi minori, 6 vene (quarzo, magnetite, ematite), 6 grotte, 7 meteoriti, 7 fari, 7 trivelle, 6 cippi.
- **Limiti, variazione e accumulazione** (pianeta 17, vulcanico): 24 luoghi minori, 3 vene (magnetite, zolfo), 3 grotte, 3 meteoriti, 3 fari, 4 trivelle, 4 cippi, 4 scheletri.
- **Radici, campi e nuovi sistemi numerici** (pianeta 18, terrestre): 21 luoghi minori, 3 vene (malachite, quarzo, pirite), 3 grotte, 3 meteoriti, 3 fari, 3 trivelle, 3 cippi, 3 scheletri.
- **Geometrie, trasformazioni e simmetrie** (pianeta 19, desertico): 40 luoghi minori, 6 vene (gesso, ematite, quarzo), 6 grotte, 5 meteoriti, 6 fari, 5 trivelle, 6 cippi, 6 scheletri.
- **Probabilità, informazione e fenomeni collettivi** (pianeta 20, desertico): 35 luoghi minori, 6 vene (ematite, gesso, quarzo), 6 grotte, 6 meteoriti, 5 fari, 6 trivelle, 6 cippi.
- **Iterazioni, stabilità e precisione numerica** (pianeta 21, oceanico): 19 luoghi minori, 2 vene (quarzo), 3 grotte, 3 meteoriti, 3 fari, 3 trivelle, 2 cippi, 3 scheletri.
- **Onde, frequenze e ricostruzione** (pianeta 22, desertico): 40 luoghi minori, 6 vene (ematite, gesso, quarzo), 5 grotte, 6 meteoriti, 6 fari, 5 trivelle, 6 cippi, 6 scheletri.
- **Reti, conservazione e strategie** (pianeta 23, terrestre): 25 luoghi minori, 4 vene (malachite, pirite), 3 grotte, 3 meteoriti, 4 fari, 3 trivelle, 4 cippi, 4 scheletri.
- **Scala, energia, equilibrio e trasformazioni** (pianeta 24, glaciale): 20 luoghi minori, 3 vene (quarzo, pirite), 2 grotte, 3 meteoriti, 3 fari, 3 trivelle, 3 cippi, 3 scheletri.
- **Oscillazioni, molecole e quantizzazione** (pianeta 25, oceanico): 39 luoghi minori, 5 vene (pirite, quarzo, malachite), 6 grotte, 6 meteoriti, 5 fari, 6 trivelle, 6 cippi, 5 scheletri.
- **Misure, unità e incertezza** (pianeta 26, craterizzato): 40 luoghi minori, 7 vene (ematite, quarzo), 7 grotte, 7 meteoriti, 6 fari, 7 trivelle, 6 cippi.
- **Vettori e sistemi di riferimento** (pianeta 27, desertico): 40 luoghi minori, 6 vene (gesso, quarzo, ematite), 6 grotte, 6 meteoriti, 5 fari, 5 trivelle, 6 cippi, 6 scheletri.
- **Moto rettilineo uniforme** (pianeta 28, glaciale): 30 luoghi minori, 4 vene (gesso, pirite), 5 grotte, 5 meteoriti, 4 fari, 4 trivelle, 4 cippi, 4 scheletri.
- **Moto uniformemente accelerato** (pianeta 29, oceanico): 12 luoghi minori, 1 vena (malachite), 2 grotte, 1 meteorite, 2 fari, 2 trivelle, 2 cippi, 2 scheletri.
- **Traiettorie e lanci** (pianeta 30, terrestre): 27 luoghi minori, 4 vene (pirite, quarzo), 4 grotte, 4 meteoriti, 3 fari, 4 trivelle, 4 cippi, 4 scheletri.
- **Forze e leggi di Newton** (pianeta 31, desertico): 40 luoghi minori, 6 vene (quarzo, ematite, gesso), 6 grotte, 6 meteoriti, 6 fari, 6 trivelle, 5 cippi, 5 scheletri.
- **Attrito e vincoli** (pianeta 32, vulcanico): 30 luoghi minori, 5 vene (zolfo, magnetite, olivina), 4 grotte, 5 meteoriti, 4 fari, 4 trivelle, 4 cippi, 4 scheletri.
- **Lavoro ed energia** (pianeta 33, glaciale): 16 luoghi minori, 2 vene (pirite, quarzo), 2 grotte, 2 meteoriti, 3 fari, 2 trivelle, 3 cippi, 2 scheletri.
- **Quantità di moto e urti** (pianeta 34, oceanico): 30 luoghi minori, 4 vene (malachite, quarzo, pirite), 4 grotte, 5 meteoriti, 4 fari, 4 trivelle, 5 cippi, 4 scheletri.
- **Rotazione e momento d’inerzia** (pianeta 35, desertico): 40 luoghi minori, 6 vene (ematite, quarzo), 6 grotte, 6 meteoriti, 5 fari, 6 trivelle, 6 cippi, 5 scheletri.
- **Momenti, leve ed equilibrio** (pianeta 36, vulcanico): 24 luoghi minori, 4 vene (zolfo, olivina, magnetite), 4 grotte, 4 meteoriti, 3 fari, 3 trivelle, 3 cippi, 3 scheletri.
- **Gravitazione** (pianeta 37, oceanico): 23 luoghi minori, 4 vene (pirite, quarzo), 3 grotte, 3 meteoriti, 4 fari, 3 trivelle, 3 cippi, 3 scheletri.
- **Orbite circolari** (pianeta 38, craterizzato): 40 luoghi minori, 6 vene (quarzo, ematite, magnetite), 7 grotte, 6 meteoriti, 7 fari, 7 trivelle, 7 cippi.
- **Fluidi e pressione** (pianeta 39, terrestre): 26 luoghi minori, 4 vene (quarzo, malachite), 4 grotte, 4 meteoriti, 3 fari, 4 trivelle, 4 cippi, 3 scheletri.
- **Galleggiamento e Archimede** (pianeta 40, vulcanico): 15 luoghi minori, 3 vene (zolfo, olivina), 2 grotte, 2 meteoriti, 2 fari, 2 trivelle, 2 cippi, 2 scheletri.
- **Oscillazioni armoniche** (pianeta 41, oceanico): 31 luoghi minori, 4 vene (pirite, malachite), 4 grotte, 4 meteoriti, 5 fari, 4 trivelle, 5 cippi, 5 scheletri.
- **Onde e sovrapposizione** (pianeta 42, glaciale): 36 luoghi minori, 5 vene (gesso, pirite, quarzo), 5 grotte, 5 meteoriti, 5 fari, 5 trivelle, 5 cippi, 6 scheletri.
- **Gas ideali** (pianeta 43, glaciale): 35 luoghi minori, 5 vene (pirite, gesso, quarzo), 5 grotte, 5 meteoriti, 5 fari, 5 trivelle, 5 cippi, 5 scheletri.
- **Calore e capacità termica** (pianeta 44, vulcanico): 24 luoghi minori, 3 vene (olivina, zolfo), 3 grotte, 4 meteoriti, 4 fari, 3 trivelle, 3 cippi, 4 scheletri.
- **Termodinamica e rendimento** (pianeta 45, desertico): 40 luoghi minori, 6 vene (quarzo), 6 grotte, 6 meteoriti, 6 fari, 5 trivelle, 5 cippi, 6 scheletri.
- **Cariche e campo elettrico** (pianeta 46, oceanico): 17 luoghi minori, 2 vene (pirite), 3 grotte, 2 meteoriti, 2 fari, 3 trivelle, 3 cippi, 2 scheletri.
- **Potenziale ed energia elettrica** (pianeta 47, vulcanico): 11 luoghi minori, 1 vena (zolfo), 2 grotte, 2 meteoriti, 1 faro, 2 trivelle, 1 cippo, 2 scheletri.
- **Circuiti e legge di Ohm** (pianeta 48, desertico): 40 luoghi minori, 7 vene (gesso, ematite, quarzo), 6 grotte, 7 meteoriti, 7 fari, 6 trivelle, 7 cippi.
- **Induzione elettromagnetica** (pianeta 49, terrestre): 18 luoghi minori, 2 vene (malachite, pirite), 3 grotte, 3 meteoriti, 3 fari, 2 trivelle, 3 cippi, 2 scheletri.
- **Fotoni ed energia quantizzata** (pianeta 50, glaciale): 23 luoghi minori, 3 vene (quarzo, pirite), 3 grotte, 3 meteoriti, 3 fari, 3 trivelle, 4 cippi, 4 scheletri.
- **Materia, proprietà e densità** (pianeta 51, oceanico): 14 luoghi minori, 2 vene (pirite), 2 grotte, 2 meteoriti, 2 fari, 2 trivelle, 2 cippi, 2 scheletri.
- **Atomi, isotopi e massa media** (pianeta 52, desertico): 40 luoghi minori, 7 vene (gesso, quarzo, ematite), 6 grotte, 7 meteoriti, 7 fari, 6 trivelle, 7 cippi.
- **Mole e quantità di sostanza** (pianeta 53, craterizzato): 40 luoghi minori, 7 vene (magnetite, quarzo, ematite), 6 grotte, 7 meteoriti, 7 fari, 7 trivelle, 6 cippi.
- **Livelli atomici e spettri** (pianeta 54, terrestre): 23 luoghi minori, 3 vene (pirite, quarzo, malachite), 3 grotte, 4 meteoriti, 3 fari, 3 trivelle, 4 cippi, 3 scheletri.
- **Periodicità e carica efficace** (pianeta 55, glaciale): 26 luoghi minori, 4 vene (pirite, gesso, quarzo), 4 grotte, 3 meteoriti, 4 fari, 4 trivelle, 4 cippi, 3 scheletri.
- **Legame ionico e interazioni elettrostatiche** (pianeta 56, desertico): 30 luoghi minori, 5 vene (ematite, gesso, quarzo), 4 grotte, 4 meteoriti, 5 fari, 4 trivelle, 4 cippi, 4 scheletri.
- **Legame covalente ed energia di legame** (pianeta 57, craterizzato): 40 luoghi minori, 7 vene (quarzo, ematite, magnetite), 6 grotte, 6 meteoriti, 7 fari, 7 trivelle, 7 cippi.
- **Geometria molecolare e VSEPR** (pianeta 58, vulcanico): 24 luoghi minori, 3 vene (zolfo, olivina), 4 grotte, 3 meteoriti, 4 fari, 4 trivelle, 3 cippi, 3 scheletri.
- **Forze intermolecolari** (pianeta 59, oceanico): 23 luoghi minori, 3 vene (pirite), 4 grotte, 3 meteoriti, 4 fari, 3 trivelle, 3 cippi, 3 scheletri.
- **Gas e stato aeriforme** (pianeta 60, oceanico): 29 luoghi minori, 4 vene (malachite, pirite), 4 grotte, 4 meteoriti, 4 fari, 5 trivelle, 4 cippi, 4 scheletri.
- **Stati della materia e transizioni** (pianeta 61, glaciale): 14 luoghi minori, 2 vene (gesso), 3 grotte, 3 meteoriti, 2 fari, 2 trivelle, 2 cippi.
- **Soluzioni e concentrazione** (pianeta 62, craterizzato): 40 luoghi minori, 7 vene (quarzo, ematite, magnetite), 7 grotte, 7 meteoriti, 6 fari, 7 trivelle, 6 cippi.
- **Solubilità ed equilibrio eterogeneo** (pianeta 63, desertico): 40 luoghi minori, 6 vene (gesso, ematite, quarzo), 6 grotte, 6 meteoriti, 5 fari, 6 trivelle, 6 cippi, 5 scheletri.
- **Stechiometria e reagente limitante** (pianeta 64, oceanico): 27 luoghi minori, 4 vene (quarzo, pirite, malachite), 4 grotte, 4 meteoriti, 3 fari, 4 trivelle, 4 cippi, 4 scheletri.
- **Resa e bilanci di materia** (pianeta 65, desertico): 40 luoghi minori, 6 vene (gesso, ematite), 7 grotte, 7 meteoriti, 6 fari, 7 trivelle, 7 cippi.
- **Termochimica e calorimetria** (pianeta 66, terrestre): 24 luoghi minori, 4 vene (quarzo, pirite), 3 grotte, 3 meteoriti, 4 fari, 3 trivelle, 3 cippi, 4 scheletri.
- **Velocità di reazione** (pianeta 67, craterizzato): 40 luoghi minori, 7 vene (ematite, magnetite, quarzo), 7 grotte, 6 meteoriti, 7 fari, 7 trivelle, 6 cippi.
- **Temperatura e attivazione** (pianeta 68, desertico): 32 luoghi minori, 4 vene (quarzo, gesso), 5 grotte, 5 meteoriti, 5 fari, 4 trivelle, 4 cippi, 5 scheletri.
- **Equilibrio chimico** (pianeta 69, oceanico): 20 luoghi minori, 3 vene (pirite, quarzo, malachite), 3 grotte, 3 meteoriti, 3 fari, 3 trivelle, 3 cippi, 2 scheletri.
- **Perturbazioni dell’equilibrio** (pianeta 70, vulcanico): 18 luoghi minori, 2 vene (magnetite, zolfo), 2 grotte, 3 meteoriti, 3 fari, 3 trivelle, 2 cippi, 3 scheletri.
- **Acidi, basi e pH** (pianeta 71, vulcanico): 18 luoghi minori, 2 vene (olivina, zolfo), 3 grotte, 2 meteoriti, 2 fari, 3 trivelle, 3 cippi, 3 scheletri.
- **Soluzioni tampone** (pianeta 72, craterizzato): 40 luoghi minori, 6 vene (magnetite, quarzo), 7 grotte, 7 meteoriti, 7 fari, 6 trivelle, 7 cippi.
- **Ossidazione, riduzione ed elettrochimica** (pianeta 73, terrestre): 26 luoghi minori, 4 vene (malachite, quarzo, pirite), 4 grotte, 3 meteoriti, 4 fari, 3 trivelle, 4 cippi, 4 scheletri.
- **Chimica organica e scheletri carboniosi** (pianeta 74, glaciale): 40 luoghi minori, 6 vene (gesso, pirite, quarzo), 6 grotte, 6 meteoriti, 6 fari, 6 trivelle, 5 cippi, 5 scheletri.
- **Polimeri e materiali** (pianeta 75, oceanico): 6 luoghi minori, 1 vena (pirite), 1 meteorite, 1 faro, 1 trivella, 1 cippo, 1 scheletro.
- **Che cos'è la vita** (pianeta 76, glaciale): 36 luoghi minori, 5 vene (pirite, gesso, quarzo), 5 grotte, 6 meteoriti, 5 fari, 5 trivelle, 5 cippi, 5 scheletri.
- **Cellule, scala e superficie** (pianeta 77, desertico): 40 luoghi minori, 6 vene (gesso, quarzo, ematite), 6 grotte, 6 meteoriti, 5 fari, 6 trivelle, 6 cippi, 5 scheletri.
- **Membrane e protocellule** (pianeta 78, vulcanico): 14 luoghi minori, 2 vene (olivina), 2 grotte, 2 meteoriti, 2 fari, 2 trivelle, 2 cippi, 2 scheletri.
- **Elementi e molecole della vita nello spazio** (pianeta 79, glaciale): 36 luoghi minori, 5 vene (gesso, pirite, quarzo), 6 grotte, 5 meteoriti, 5 fari, 5 trivelle, 5 cippi, 5 scheletri.
- **Meteoriti, comete e campioni di asteroidi** (pianeta 80, terrestre): 21 luoghi minori, 3 vene (pirite, quarzo), 3 grotte, 3 meteoriti, 3 fari, 3 trivelle, 3 cippi, 3 scheletri.
- **Chiralità e omochiralità** (pianeta 81, craterizzato): 40 luoghi minori, 7 vene (magnetite, quarzo, ematite), 6 grotte, 7 meteoriti, 7 fari, 6 trivelle, 7 cippi.
- **Miller-Urey e la sintesi prebiotica** (pianeta 82, glaciale): 16 luoghi minori, 2 vene (pirite), 2 grotte, 2 meteoriti, 3 fari, 2 trivelle, 2 cippi, 3 scheletri.
- **Energia, enzimi e catalisi** (pianeta 83, desertico): 32 luoghi minori, 5 vene (gesso, ematite, quarzo), 5 grotte, 5 meteoriti, 4 fari, 4 trivelle, 5 cippi, 4 scheletri.
- **Sorgenti idrotermali e metabolismo primordiale** (pianeta 84, terrestre): 28 luoghi minori, 4 vene (quarzo, pirite, malachite), 4 grotte, 4 meteoriti, 4 fari, 4 trivelle, 4 cippi, 4 scheletri.
- **Il mondo a RNA** (pianeta 85, desertico): 40 luoghi minori, 7 vene (ematite, quarzo, gesso), 6 grotte, 7 meteoriti, 7 fari, 7 trivelle, 6 cippi.
- **DNA, codice genetico ed espressione** (pianeta 86, glaciale): 31 luoghi minori, 5 vene (gesso, pirite, quarzo), 4 grotte, 5 meteoriti, 4 fari, 5 trivelle, 4 cippi, 4 scheletri.
- **Mutazioni e soglia d'errore** (pianeta 87, craterizzato): 40 luoghi minori, 7 vene (ematite, magnetite), 7 grotte, 7 meteoriti, 7 fari, 6 trivelle, 6 cippi.
- **Ereditarietà e selezione naturale** (pianeta 88, glaciale): 20 luoghi minori, 2 vene (pirite, quarzo), 3 grotte, 3 meteoriti, 3 fari, 3 trivelle, 3 cippi, 3 scheletri.
- **Deriva genetica** (pianeta 89, desertico): 35 luoghi minori, 6 vene (quarzo, ematite, gesso), 6 grotte, 5 meteoriti, 6 fari, 6 trivelle, 6 cippi.
- **L'albero universale e LUCA** (pianeta 90, oceanico): 33 luoghi minori, 5 vene (malachite, pirite, quarzo), 4 grotte, 5 meteoriti, 4 fari, 5 trivelle, 5 cippi, 5 scheletri.
- **Le prime tracce della vita e il tempo geologico** (pianeta 91, vulcanico): 25 luoghi minori, 4 vene (olivina, magnetite, zolfo), 4 grotte, 3 meteoriti, 3 fari, 4 trivelle, 4 cippi, 3 scheletri.
- **Ossigeno, endosimbiosi e cellule complesse** (pianeta 92, craterizzato): 40 luoghi minori, 7 vene (ematite, quarzo), 7 grotte, 6 meteoriti, 7 fari, 6 trivelle, 7 cippi.
- **Estremofili** (pianeta 93, glaciale): 40 luoghi minori, 6 vene (quarzo, pirite, gesso), 6 grotte, 6 meteoriti, 5 fari, 6 trivelle, 5 cippi, 6 scheletri.
- **Respirazione, fermentazione e chemiosintesi** (pianeta 94, desertico): 40 luoghi minori, 6 vene (ematite, gesso, quarzo), 6 grotte, 6 meteoriti, 5 fari, 6 trivelle, 5 cippi, 6 scheletri.
- **Fotosintesi e luce di altre stelle** (pianeta 95, vulcanico): 28 luoghi minori, 4 vene (olivina, magnetite, zolfo), 4 grotte, 4 meteoriti, 4 fari, 4 trivelle, 4 cippi, 4 scheletri.
- **Crescita delle popolazioni microbiche** (pianeta 96, craterizzato): 40 luoghi minori, 7 vene (quarzo, magnetite, ematite), 6 grotte, 7 meteoriti, 7 fari, 6 trivelle, 7 cippi.
- **La zona abitabile** (pianeta 97, desertico): 40 luoghi minori, 6 vene (quarzo, ematite, gesso), 7 grotte, 7 meteoriti, 7 fari, 6 trivelle, 7 cippi.
- **Atmosfere, effetto serra e clima** (pianeta 98, glaciale): 36 luoghi minori, 6 vene (pirite, gesso), 6 grotte, 6 meteoriti, 6 fari, 6 trivelle, 6 cippi.
- **Abitabilità attorno alle nane rosse** (pianeta 99, craterizzato): 40 luoghi minori, 7 vene (ematite, magnetite, quarzo), 6 grotte, 7 meteoriti, 7 fari, 6 trivelle, 7 cippi.
- **Biosfera, albedo e Daisyworld** (pianeta 100, terrestre): 32 luoghi minori, 4 vene (quarzo, pirite, malachite), 4 grotte, 5 meteoriti, 4 fari, 5 trivelle, 5 cippi, 5 scheletri.
- **Marte: acqua e abitabilità passata** (pianeta 101, desertico): 40 luoghi minori, 7 vene (gesso, ematite, quarzo), 7 grotte, 6 meteoriti, 7 fari, 7 trivelle, 6 cippi.
- **Cercare la vita su Marte** (pianeta 102, craterizzato): 40 luoghi minori, 6 vene (quarzo, magnetite), 6 grotte, 7 meteoriti, 7 fari, 7 trivelle, 7 cippi.
- **Europa e gli oceani sotto il ghiaccio** (pianeta 103, glaciale): 30 luoghi minori, 4 vene (gesso, quarzo, pirite), 4 grotte, 4 meteoriti, 5 fari, 5 trivelle, 4 cippi, 4 scheletri.
- **Encelado e i suoi pennacchi** (pianeta 104, oceanico): 13 luoghi minori, 2 vene (quarzo, pirite), 2 grotte, 2 meteoriti, 2 fari, 1 trivella, 2 cippi, 2 scheletri.
- **Titano, la chimica senza acqua** (pianeta 105, terrestre): 33 luoghi minori, 5 vene (pirite, quarzo, malachite), 4 grotte, 5 meteoriti, 4 fari, 5 trivelle, 5 cippi, 5 scheletri.
- **Scoprire gli esopianeti** (pianeta 106, vulcanico): 23 luoghi minori, 4 vene (olivina, magnetite, zolfo), 3 grotte, 3 meteoriti, 3 fari, 4 trivelle, 3 cippi, 3 scheletri.
- **Atmosfere degli esopianeti e JWST** (pianeta 107, oceanico): 15 luoghi minori, 2 vene (pirite), 2 grotte, 2 meteoriti, 2 fari, 2 trivelle, 2 cippi, 3 scheletri.
- **Biofirme e falsi positivi** (pianeta 108, terrestre): 31 luoghi minori, 4 vene (malachite, pirite), 4 grotte, 5 meteoriti, 5 fari, 4 trivelle, 4 cippi, 5 scheletri.
- **Panspermia e protezione planetaria** (pianeta 109, desertico): 40 luoghi minori, 6 vene (ematite, quarzo, gesso), 7 grotte, 7 meteoriti, 6 fari, 7 trivelle, 7 cippi.
- **Tecnofirme, SETI ed equazione di Drake** (pianeta 110, craterizzato): 40 luoghi minori, 7 vene (quarzo, ematite), 7 grotte, 6 meteoriti, 6 fari, 7 trivelle, 7 cippi.
- **Onde elettromagnetiche e pressione della luce** (pianeta 111, terrestre): 40 luoghi minori, 6 vene (quarzo, malachite, pirite), 6 grotte, 5 meteoriti, 6 fari, 5 trivelle, 6 cippi, 6 scheletri.
- **Specchi, lenti e telescopi** (pianeta 112, oceanico): 18 luoghi minori, 3 vene (malachite, quarzo, pirite), 2 grotte, 3 meteoriti, 2 fari, 3 trivelle, 2 cippi, 3 scheletri.
- **Interferenza e interferometri** (pianeta 113, desertico): 40 luoghi minori, 7 vene (gesso, quarzo, ematite), 6 grotte, 7 meteoriti, 7 fari, 7 trivelle, 6 cippi.
- **Diffrazione e potere risolutivo** (pianeta 114, craterizzato): 40 luoghi minori, 7 vene (magnetite, quarzo, ematite), 6 grotte, 6 meteoriti, 7 fari, 7 trivelle, 7 cippi.
- **Radiazione termica e luce delle stelle** (pianeta 115, glaciale): 40 luoghi minori, 7 vene (quarzo, gesso, pirite), 7 grotte, 6 meteoriti, 7 fari, 7 trivelle, 6 cippi.
- **Legge di Gauss: gusci, pianeti e condensatori** (pianeta 116, terrestre): 40 luoghi minori, 5 vene (pirite, quarzo), 5 grotte, 6 meteoriti, 6 fari, 6 trivelle, 6 cippi, 6 scheletri.
- **Particelle cariche nei campi magnetici** (pianeta 117, oceanico): 28 luoghi minori, 4 vene (quarzo, malachite, pirite), 4 grotte, 4 meteoriti, 4 fari, 4 trivelle, 4 cippi, 4 scheletri.
- **Correnti, dipoli e dinamo dei pianeti** (pianeta 118, desertico): 39 luoghi minori, 6 vene (quarzo, ematite), 6 grotte, 5 meteoriti, 5 fari, 6 trivelle, 5 cippi, 6 scheletri.
- **Induzione, circuiti oscillanti e radio** (pianeta 119, craterizzato): 40 luoghi minori, 7 vene (magnetite, ematite, quarzo), 7 grotte, 7 meteoriti, 6 fari, 6 trivelle, 7 cippi.
- **Equazioni di Maxwell e magnetismo della materia** (pianeta 120, glaciale): 21 luoghi minori, 3 vene (gesso, pirite, quarzo), 3 grotte, 3 meteoriti, 3 fari, 3 trivelle, 3 cippi, 3 scheletri.
- **Relatività ristretta** (pianeta 121, terrestre): 25 luoghi minori, 4 vene (malachite, pirite), 4 grotte, 3 meteoriti, 3 fari, 3 trivelle, 4 cippi, 4 scheletri.
- **Onde di materia, atomi e righe spettrali** (pianeta 122, glaciale): 20 luoghi minori, 3 vene (quarzo), 3 grotte, 3 meteoriti, 3 fari, 3 trivelle, 2 cippi, 3 scheletri.
- **Nuclei, decadimenti e datazioni** (pianeta 123, desertico): 40 luoghi minori, 6 vene (ematite, gesso, quarzo), 5 grotte, 6 meteoriti, 5 fari, 6 trivelle, 6 cippi, 6 scheletri.
- **Energia dal nucleo: fusione nelle stelle** (pianeta 124, vulcanico): 24 luoghi minori, 3 vene (magnetite), 3 grotte, 4 meteoriti, 4 fari, 3 trivelle, 3 cippi, 4 scheletri.
- **Particelle, espansione e Big Bang** (pianeta 125, oceanico): 34 luoghi minori, 4 vene (quarzo, malachite), 5 grotte, 5 meteoriti, 5 fari, 5 trivelle, 5 cippi, 5 scheletri.
