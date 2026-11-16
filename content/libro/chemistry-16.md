---
unit: chemistry-16
titolo: Termochimica e calorimetria
sottotitolo: L'energia delle reazioni, dal calorimetro alla legge di Hess
volume: Volume di chimica
fonte: Testo originale; riferimento principale Petrucci et al., General Chemistry, 11ª ed., §7-1–7-10 e 13-1–13-4
---

## Prima di cominciare {#apertura}

Nella cassetta di pronto soccorso della stazione ci sono due buste dall'aspetto simile. La prima è un impacco istantaneo per il ghiaccio: basta premerla con forza perché una membrana interna si rompa, e in pochi secondi la busta diventa fredda al tatto. Contiene nitrato di ammonio solido e una piccola sacca d'acqua; quando il sale si scioglie, la temperatura della soluzione scende di parecchi gradi. La seconda è uno scaldamani: aperta la confezione, la polvere che contiene comincia a scaldarsi da sola e resta tiepida per ore. Dentro c'è ferro finissimo, che reagisce lentamente con l'ossigeno dell'aria trasformandosi in ossido.

Due processi chimici, due comportamenti opposti. Nel primo l'energia passa dall'ambiente alle sostanze, che si raffreddano; nel secondo le sostanze cedono energia all'ambiente, che si scalda. La **termochimica** è la parte della chimica che misura e calcola queste energie. Le sue domande sono pratiche: quanta energia libera un chilogrammo di metano che brucia in una caldaia, quanta ne contiene una porzione di pasta, quanto si scalda l'acqua in cui si scioglie un sale, quanta energia serve per produrre un metallo dal suo minerale. Gli strumenti per rispondere sono sorprendentemente semplici: un termometro, un recipiente ben isolato, un po' d'acqua, e un principio generale della fisica, la conservazione dell'energia.

::: obiettivi
- distinguere sistema e ambiente, calore e lavoro, e usare le convenzioni di segno;
- calcolare quantità di calore con la capacità termica e il calore specifico;
- applicare il primo principio della termodinamica, $\Delta U=q+w$, e calcolare il lavoro di espansione;
- definire l'entalpia e collegare $\Delta H$ e $\Delta U$;
- ricavare entalpie di reazione da misure con il calorimetro a pressione costante e con la bomba calorimetrica;
- usare la legge di Hess e le entalpie standard di formazione per calcolare entalpie di reazione;
- stimare entalpie di reazione dalle entalpie di legame e confrontare i combustibili;
- spiegare perché alcuni processi endotermici avvengono spontaneamente, introducendo entropia ed energia di Gibbs.
:::

Il capitolo presuppone la stechiometria dei capitoli [Stechiometria e reagente limitante](unit:chemistry-14) e [Resa e bilanci di materia](unit:chemistry-15): ogni calcolo termochimico comincia contando le moli. Gli aspetti fisici del calore sono sviluppati nei capitoli di fisica [Calore e capacità termica](unit:physics-19) e [Termodinamica e rendimento](unit:physics-20). Le energie di reazione calcolate qui torneranno nel capitolo [Velocità di reazione](unit:chemistry-17), dove si vedrà che una reazione molto esotermica può essere lentissima.

## Sistema, ambiente ed energia {#sistema}

Per descrivere uno scambio di energia occorre prima delimitare ciò che si studia. Il **sistema** è la porzione dell'universo su cui concentriamo l'attenzione: le sostanze che reagiscono in un becher, il gas contenuto in un cilindro, l'acqua di un calorimetro. L'**ambiente** è tutto il resto, e in pratica la parte dell'universo con cui il sistema scambia energia in modo apprezzabile. La scelta del confine è libera, ma una volta fatta deve restare la stessa per tutto il ragionamento.

Secondo ciò che può attraversare il confine, i sistemi si classificano in tre tipi.

- Un **sistema aperto** scambia con l'ambiente materia ed energia: una pentola d'acqua che bolle senza coperchio.
- Un **sistema chiuso** scambia energia e trattiene la materia, come la stessa pentola con un coperchio a tenuta.
- Un **sistema isolato** non scambia né materia né energia; in buona approssimazione lo è il contenuto di un thermos ben chiuso.

L'energia di un sistema si presenta in molte forme. Le molecole si muovono, ruotano e vibrano, e possiedono quindi energia cinetica; si attraggono e si respingono, e possiedono energia potenziale; elettroni e nuclei all'interno delle molecole hanno energie legate ai legami chimici. La somma di tutte queste energie, riferita alle particelle del sistema, si chiama **energia interna** e si indica con $U$. Il suo valore assoluto non si può misurare, perché richiederebbe di conoscere ogni contributo fino a quello dei nuclei; si misurano invece senza difficoltà le sue variazioni $\Delta U=U_\mathrm{finale}-U_\mathrm{iniziale}$, ed è soltanto di queste che la termochimica ha bisogno.

L'energia interna è una **funzione di stato**: il suo valore dipende soltanto dallo stato del sistema, cioè da quantità, composizione, temperatura e pressione, e la sua variazione dipende soltanto dallo stato iniziale e da quello finale, indipendentemente dal percorso seguito. L'altitudine di un rifugio alpino è una funzione di stato: chi sale dalla strada carrozzabile e chi sale dal sentiero diretto guadagna lo stesso dislivello, anche se la distanza percorsa e la fatica sono diverse. Il calore e il lavoro, come vedremo, assomigliano invece alla distanza percorsa: dipendono dal cammino.

## Calore e capacità termica {#calore}

Il **calore** è l'energia trasferita fra due corpi a causa di una differenza di temperatura, dal più caldo al più freddo. Il termine designa un trasferimento di energia; ciò che un corpo possiede è la sua energia interna. Fino alla metà dell'Ottocento il calore era considerato un fluido indistruttibile, il calorico, e l'unità di misura tradizionale, la **caloria**, conserva il ricordo di quella concezione. Una caloria era la quantità di calore che innalza di un grado la temperatura di un grammo d'acqua; oggi si usa il **joule**, e la caloria termochimica è definita esattamente come $1\un{cal}=4{,}184\un{J}$.

::: storia Il mulinello di Joule
Fra il 1843 e il 1850 James Prescott Joule, figlio di un birraio di Manchester, dimostrò che il lavoro meccanico si trasforma in calore in una proporzione fissa. Nell'esperimento più noto un peso, scendendo, faceva girare un mulinello a pale immerso in un recipiente d'acqua isolato; l'attrito delle pale sull'acqua ne innalzava la temperatura di frazioni di grado, che Joule misurava con termometri di straordinaria sensibilità. Nella memoria presentata alla Royal Society e pubblicata nel 1850 concluse che, per innalzare di un grado Fahrenheit una libbra d'acqua, serve il lavoro compiuto da un peso di $772$ libbre che scende di un piede. Convertito nelle unità attuali, il risultato equivale a circa $4{,}15\un{J}$ per caloria, molto vicino al valore moderno. Calore e lavoro erano due modi di trasferire la stessa grandezza, l'energia.
:::

La quantità di calore necessaria per variare di un kelvin la temperatura di un corpo si chiama **capacità termica** del corpo, $C$, e si misura in $\mathrm{J/K}$. Riferita all'unità di massa diventa il **calore specifico** $c$, in $\mathrm{J/(g\,K)}$; riferita alla mole, la **capacità termica molare** $C_m$, in $\mathrm{J/(mol\,K)}$. Finché non avvengono cambiamenti di stato, il calore scambiato da un corpo di massa $m$ la cui temperatura varia di $\Delta T$ vale

$$q=m\,c\,\Delta T=C\,\Delta T.$$

Un intervallo di un kelvin coincide con un intervallo di un grado Celsius, e nelle differenze di temperatura le due scale si possono usare indifferentemente.

L'acqua ha un calore specifico molto alto, circa $4{,}18\un{J/(g\,K)}$ a temperatura ambiente. Per scaldarla serve molta energia, e per lo stesso motivo un lago o il mare cambiano temperatura lentamente e mitigano il clima delle coste. I metalli, a confronto, si scaldano con poco calore. La tabella riporta le capacità termiche molari di alcuni metalli, tratte dalle tabelle termodinamiche, e i calori specifici che se ne ricavano.

| Sostanza | $C_m$ ($\mathrm{J\,mol^{-1}\,K^{-1}}$) | $c$ ($\mathrm{J\,g^{-1}\,K^{-1}}$) |
|---|---|---|
| magnesio | $24{,}9$ | $1{,}02$ |
| alluminio | $24{,}2$ | $0{,}897$ |
| ferro | $25{,}1$ | $0{,}449$ |
| rame | $24{,}4$ | $0{,}384$ |
| argento | $25{,}4$ | $0{,}235$ |
| piombo | $26{,}4$ | $0{,}127$ |
| acqua liquida | $75{,}3$ | $4{,}18$ |

La colonna centrale mostra una regolarità notata già nel 1819 da Pierre Louis Dulong e Alexis Thérèse Petit: la capacità termica molare dei metalli solidi è quasi la stessa per tutti, vicina a $25\un{J/(mol\,K)}$. La teoria cinetica ne dà la ragione: in un solido ogni atomo oscilla attorno alla sua posizione in tre direzioni, e a ogni direzione spettano in media un'energia cinetica e un'energia potenziale pari a $\tfrac12 k_\mathrm{B}T$ ciascuna; per una mole la capacità termica vale quindi $3R\simeq24{,}9\un{J/(mol\,K)}$. Il calore specifico, che è la capacità molare divisa per la massa molare, diminuisce invece con la massa atomica: un grammo di piombo contiene molti meno atomi di un grammo di alluminio. Nel XIX secolo la legge di Dulong e Petit servì a stimare le masse atomiche dei metalli nuovi a partire dal loro calore specifico.

::: esempio Un blocco caldo nell'acqua
Un blocco di alluminio di $50{,}0\un{g}$, scaldato a $95{,}0\,^\circ\mathrm{C}$ in acqua bollente, viene immerso in $200{,}0\un{g}$ d'acqua a $20{,}0\,^\circ\mathrm{C}$ in un recipiente isolato di capacità termica trascurabile. Quale temperatura finale raggiunge il sistema?

Il recipiente è isolato, e il calore ceduto dall'alluminio è uguale a quello acquistato dall'acqua. Indicando con $T$ la temperatura finale in gradi Celsius,
$$50{,}0\times0{,}897\times(95{,}0-T)=200{,}0\times4{,}18\times(T-20{,}0).$$
Svolgendo i prodotti si ottiene $44{,}85\,(95{,}0-T)=836\,(T-20{,}0)$, da cui $T\simeq23{,}8\,^\circ\mathrm{C}$. L'acqua si scalda di meno di quattro gradi mentre l'alluminio si raffredda di oltre settanta: la capacità termica dell'acqua, $836\un{J/K}$, è quasi venti volte quella del blocco.
:::

## Il lavoro di espansione {#lavoro}

Il calore è uno dei due modi in cui un sistema scambia energia con l'ambiente. L'altro è il **lavoro**, l'energia trasferita quando una forza sposta il proprio punto di applicazione. Nelle reazioni chimiche il lavoro più comune è quello di espansione: un gas prodotto dalla reazione spinge via l'atmosfera circostante, oppure un pistone.

Si consideri un gas racchiuso in un cilindro da un pistone libero di muoversi, sul quale agisce dall'esterno una pressione costante $P_\mathrm{est}$. Se il gas si espande e il pistone di area $A$ sale di un tratto $\Delta h$, la forza esterna $P_\mathrm{est}A$ si oppone allo spostamento, e il gas compie sull'ambiente un lavoro $P_\mathrm{est}A\,\Delta h=P_\mathrm{est}\,\Delta V$. Per il sistema questo lavoro è energia ceduta, e si scrive

$$w=-P_\mathrm{est}\,\Delta V.$$

::: figura lavoro
{"w":640,"h":270,"items":[{"t":"line","p":[60,60,60,230],"c":"ax","w":2.4},{"t":"line","p":[60,230,200,230],"c":"ax","w":2.4},{"t":"line","p":[200,60,200,230],"c":"ax","w":2.4},{"t":"rect","p":[62,120,136,14],"c":"muted","r":1},{"t":"line","p":[130,120,130,70],"c":"ax","w":2},{"t":"rect","p":[62,90,136,14],"c":"muted","r":1,"dash":true},{"t":"arrow","p":[215,127,215,97],"c":"force2","w":2,"head":7},{"t":"text","p":[222,116],"s":"Δh","c":"force2","size":13,"a":"start"},{"t":"text","p":[130,185],"s":"gas","c":"ax","size":14},{"t":"arrow","p":[100,40,100,86],"c":"force4","w":2,"head":7},{"t":"text","p":[106,40],"s":"Pₑₛₜ","c":"force4","size":13,"a":"start"},{"t":"text","p":[130,255],"s":"il pistone sale contro Pₑₛₜ","c":"muted","size":11},{"t":"axes","o":[320,230],"x":[300,"V"],"y":[190,"P"],"sx":28,"sy":40},{"t":"poly","pts":[[376,230],[376,130.0],[544,130.0],[544,230]],"close":true,"fill":true,"c":"muted"},{"t":"line","p":[376,130.0,544,130.0],"c":"force4","w":2.6},{"t":"text","p":[460,185.0],"s":"|w| = Pₑₛₜ ΔV","c":"ax","size":13},{"t":"text","p":[376,248],"s":"V₁","c":"muted","size":12},{"t":"text","p":[544,248],"s":"V₂","c":"muted","size":12},{"t":"text","p":[312,134.0],"s":"Pₑₛₜ","c":"force4","size":12,"a":"end"}]}
---
Il lavoro di espansione contro una pressione esterna costante. A sinistra il gas spinge il pistone verso l'alto; a destra, nel piano pressione-volume, il lavoro ceduto all'ambiente è l'area del rettangolo di altezza $P_\mathrm{est}$ e base $\Delta V$.
:::

In un'espansione $\Delta V>0$ e $w<0$: il sistema perde energia. In una compressione l'ambiente compie lavoro sul sistema, $\Delta V<0$ e $w>0$. Se il volume non cambia, il lavoro di espansione è nullo, ed è questa la ragione per cui il calorimetro a volume costante, descritto più avanti, misura direttamente la variazione di energia interna.

Le unità richiedono un po' di attenzione. Con la pressione in pascal e il volume in metri cubi il lavoro risulta in joule; con la pressione in bar e il volume in litri si ottiene il prodotto $\mathrm{L\,bar}$, e conviene ricordare che $1\un{L\,bar}=10^{-3}\un{m^3}\times10^{5}\un{Pa}=100\un{J}$.

Quando una reazione produce gas a pressione e temperatura costanti, la variazione di volume si ricava dall'equazione di stato dei gas ideali, $P\,\Delta V=\Delta n_\mathrm{gas}\,RT$, dove $\Delta n_\mathrm{gas}$ è la variazione del numero di moli gassose. Lo zinco che si scioglie in acido cloridrico, $\mathrm{Zn(s)}+2\,\mathrm{HCl(aq)}\to\mathrm{ZnCl_2(aq)}+\mathrm{H_2(g)}$, produce una mole di idrogeno per mole di zinco. A $25\,^\circ\mathrm{C}$ l'idrogeno sviluppato spinge via l'atmosfera compiendo un lavoro
$$w=-\Delta n_\mathrm{gas}\,RT=-1\un{mol}\times8{,}314\un{J\,mol^{-1}\,K^{-1}}\times298{,}15\un{K}\simeq-2{,}48\un{kJ}.$$
Il lavoro è piccolo rispetto all'energia chimica in gioco nelle reazioni tipiche, che si misura in centinaia di kilojoule per mole, ma come vedremo non è sempre trascurabile.

## Il primo principio della termodinamica {#primo-principio}

Calore e lavoro sono i due soli modi in cui l'energia di un sistema chiuso può cambiare. Il **primo principio della termodinamica** esprime la conservazione dell'energia in questa forma:

::: legge Primo principio della termodinamica
La variazione di energia interna di un sistema chiuso è uguale alla somma del calore ricevuto e del lavoro compiuto sul sistema:
$$\Delta U=q+w.$$
In un sistema isolato $q=0$ e $w=0$, quindi $\Delta U=0$: l'energia di un sistema isolato si conserva.
:::

La convenzione di segno, raccomandata dalla IUPAC, guarda tutto dal punto di vista del sistema: ciò che entra nel sistema è positivo, ciò che esce è negativo.

::: figura sistema
{"w":640,"h":275,"items":[{"t":"rect","p":[40,30,560,230],"c":"muted","r":10},{"t":"text","p":[60,54],"s":"ambiente","c":"muted","size":13,"a":"start"},{"t":"rect","p":[230,95,180,100],"c":"body","r":8,"s":"sistema"},{"t":"arrow","p":[110,120,226,120],"c":"force3","w":2.4,"head":9},{"t":"text","p":[150,110],"s":"q > 0","c":"force3","size":13},{"t":"arrow","p":[414,120,530,120],"c":"force4","w":2.4,"head":9},{"t":"text","p":[478,110],"s":"q < 0","c":"force4","size":13},{"t":"arrow","p":[110,172,226,172],"c":"force2","w":2.4,"head":9},{"t":"text","p":[150,192],"s":"w > 0","c":"force2","size":13},{"t":"arrow","p":[414,172,530,172],"c":"force","w":2.4,"head":9},{"t":"text","p":[478,192],"s":"w < 0","c":"force","size":13},{"t":"text","p":[320,230],"s":"ΔU = q + w","c":"ax","size":15},{"t":"text","p":[120,248],"s":"energia che entra nel sistema","c":"muted","size":11},{"t":"text","p":[490,248],"s":"energia che esce dal sistema","c":"muted","size":11}]}
---
Le convenzioni di segno per calore e lavoro. Il calore ricevuto dal sistema e il lavoro compiuto su di esso aumentano la sua energia interna e sono positivi; il calore ceduto e il lavoro compiuto dal sistema sull'ambiente sono negativi.
:::

Il primo principio mette insieme due grandezze che dipendono dal cammino, $q$ e $w$, e ne ricava una che non ne dipende. Si può portare un gas dallo stesso stato iniziale allo stesso stato finale scaldandolo molto e lasciandolo espandere liberamente, oppure scaldandolo poco e comprimendolo: $q$ e $w$ cambiano da un percorso all'altro, la loro somma no. Il primo principio esclude anche la macchina del moto perpetuo di prima specie: nessun dispositivo che lavori in ciclo, tornando sempre allo stesso stato, può produrre lavoro senza assorbire una quantità equivalente di energia.

::: esempio Il bilancio di un gas
Un gas assorbe $350\un{J}$ di calore e, espandendosi, compie sull'ambiente un lavoro di $120\un{J}$. Di quanto varia la sua energia interna?

Il calore entra nel sistema, $q=+350\un{J}$; il lavoro è compiuto dal sistema, $w=-120\un{J}$. Quindi $\Delta U=350-120=+230\un{J}$. Dell'energia ricevuta come calore, una parte è uscita come lavoro e il resto è rimasto nel gas, la cui temperatura è aumentata.
:::

## L'entalpia {#entalpia}

La maggior parte delle reazioni chimiche avviene in recipienti aperti, alla pressione costante dell'atmosfera. In queste condizioni il calore scambiato non coincide con $\Delta U$, perché una parte dell'energia può essere spesa o guadagnata come lavoro di espansione. Conviene allora introdurre una nuova funzione di stato, l'**entalpia**:

$$H=U+PV.$$

Il suo significato emerge subito. Per un processo a pressione costante, con il solo lavoro di espansione, $w=-P\,\Delta V$ e il primo principio dà $q_P=\Delta U+P\,\Delta V$. Ma $\Delta H=\Delta U+\Delta(PV)=\Delta U+P\,\Delta V$ quando $P$ è costante, quindi

$$\Delta H=q_P.$$

La variazione di entalpia è il calore scambiato a pressione costante. È questa la grandezza che la termochimica tabula, perché è quella che si misura in laboratorio e nell'industria, dove quasi tutto avviene a pressione atmosferica.

La differenza fra $\Delta H$ e $\Delta U$ dipende soltanto dal termine $P\,\Delta V$. Per solidi e liquidi le variazioni di volume sono minime e $\Delta H\simeq\Delta U$. Quando nella reazione compaiono gas, trattandoli come ideali si ottiene

$$\Delta H=\Delta U+\Delta n_\mathrm{gas}\,RT,$$

dove $\Delta n_\mathrm{gas}$ è la differenza fra le moli di gas prodotte e quelle consumate. A $298\un{K}$ il prodotto $RT$ vale circa $2{,}48\un{kJ/mol}$, e la correzione è di pochi kilojoule per ogni mole di gas che compare o scompare.

::: esempio Idrogeno che brucia
La combustione dell'idrogeno con formazione di acqua liquida, $\mathrm{H_2(g)}+\tfrac12\,\mathrm{O_2(g)}\to\mathrm{H_2O(l)}$, ha $\Delta H=-285{,}8\un{kJ}$ a $25\,^\circ\mathrm{C}$. Quanto vale $\Delta U$?

Spariscono una mole e mezza di gas e nessuna se ne forma, quindi $\Delta n_\mathrm{gas}=-1{,}5\un{mol}$. Quindi
$$\Delta U=\Delta H-\Delta n_\mathrm{gas}\,RT=-285{,}8\un{kJ}+1{,}5\times2{,}479\un{kJ}\simeq-282{,}1\un{kJ}.$$
A pressione costante l'atmosfera, comprimendo il sistema che si contrae, gli cede circa $3{,}7\un{kJ}$ di lavoro; il calore liberato è quindi un poco maggiore della diminuzione di energia interna.
:::

## Reazioni esotermiche ed endotermiche {#esotermiche}

Una reazione che a pressione costante cede calore all'ambiente ha $\Delta H<0$ e si dice **esotermica**; una che ne assorbe ha $\Delta H>0$ e si dice **endotermica**. I due termini furono introdotti da Marcellin Berthelot nell'Ottocento, e la scelta dei segni segue la convenzione del sistema: in una reazione esotermica il sistema perde entalpia, che passa all'ambiente sotto forma di calore.

Le combustioni sono esotermiche, e lo è la reazione del ferro con l'ossigeno nello scaldamani. Sono endotermiche la decomposizione del carbonato di calcio nelle fornaci da calce, la fotosintesi, che immagazzina nei carboidrati l'energia della luce, e lo scioglimento in acqua del nitrato di ammonio dell'impacco freddo. Un diagramma entalpico rappresenta reagenti e prodotti come livelli su una scala verticale di entalpia, e $\Delta H$ come la distanza fra i livelli.

::: figura entalpia
{"w":640,"h":275,"items":[{"t":"text","p":[160,26],"s":"reazione esotermica","c":"force4","size":13},{"t":"arrow","p":[40,240,40,40],"c":"muted","w":1.4,"head":7},{"t":"text","p":[46,46],"s":"H","c":"muted","size":13,"a":"start"},{"t":"line","p":[70,70,250,70],"c":"ax","w":2.6},{"t":"text","p":[160.0,62],"s":"CH₄(g) + 2 O₂(g)","c":"ax","size":12},{"t":"line","p":[70,230.254,250,230.254],"c":"ax","w":2.6},{"t":"text","p":[160.0,222.254],"s":"CO₂(g) + 2 H₂O(l)","c":"ax","size":12},{"t":"arrow","p":[84,74,84,226.254],"c":"force4","w":2.4,"head":9},{"t":"text","p":[92,140],"s":"ΔH = −890 kJ","c":"force4","size":13,"a":"start"},{"t":"text","p":[470,26],"s":"processo endotermico","c":"force2","size":13},{"t":"arrow","p":[350,240,350,40],"c":"muted","w":1.4,"head":7},{"t":"text","p":[356,46],"s":"H","c":"muted","size":13,"a":"start"},{"t":"line","p":[380,225,570,225],"c":"ax","w":2.6},{"t":"text","p":[475.0,217],"s":"NH₄NO₃(s) in acqua","c":"ax","size":12},{"t":"line","p":[380,106.78000000000002,570,106.78000000000002],"c":"ax","w":2.6},{"t":"text","p":[475.0,98.78000000000002],"s":"NH₄NO₃(aq)","c":"ax","size":12},{"t":"arrow","p":[392,221,392,110.78000000000002],"c":"force2","w":2.4,"head":9},{"t":"text","p":[400,170.9],"s":"ΔH = +25,7 kJ","c":"force2","size":13,"a":"start"},{"t":"text","p":[320,262],"s":"le scale verticali dei due diagrammi sono diverse","c":"muted","size":11}]}
---
Diagrammi entalpici di una reazione esotermica, la combustione del metano, e di un processo endotermico, lo scioglimento del nitrato di ammonio in acqua. Nel primo caso i prodotti stanno più in basso dei reagenti e l'entalpia ceduta passa all'ambiente; nel secondo stanno più in alto, e l'entalpia necessaria viene sottratta all'ambiente.
:::

Una **equazione termochimica** è un'equazione chimica bilanciata accompagnata dal valore di $\Delta H$, con lo stato fisico di ogni specie:

$$\mathrm{CH_4(g)}+2\,\mathrm{O_2(g)}\longrightarrow\mathrm{CO_2(g)}+2\,\mathrm{H_2O(l)},\qquad\Delta H=-890{,}3\un{kJ}.$$

Il valore si riferisce alle quantità indicate dai coefficienti: una mole di metano che reagisce con due moli di ossigeno. Tre regole discendono dal fatto che l'entalpia è una funzione di stato ed è una grandezza estensiva.

1. **$\Delta H$ è proporzionale alle quantità.** Moltiplicando tutti i coefficienti per un fattore, anche $\Delta H$ va moltiplicato per lo stesso fattore. Bruciando $2{,}50\un{mol}$ di metano si liberano $2{,}50\times890{,}3\simeq2226\un{kJ}$.
2. **Invertendo la reazione, $\Delta H$ cambia segno.** Per trasformare anidride carbonica e acqua liquida in metano e ossigeno occorrerebbero $890{,}3\un{kJ}$ per mole.
3. **$\Delta H$ dipende dallo stato fisico.** Se l'acqua prodotta resta allo stato di vapore, la combustione libera soltanto $802{,}3\un{kJ}$: la differenza, $88{,}0\un{kJ}$, è l'entalpia che due moli d'acqua cedono condensando a $25\,^\circ\mathrm{C}$, $44{,}0\un{kJ}$ ciascuna.

Con queste regole l'entalpia di reazione entra nella stechiometria come un reagente o un prodotto qualsiasi. Il calore liberato da una quantità di combustibile si calcola convertendo la massa in moli e moltiplicando per $\Delta H$ riferito a una mole. Un metro cubo di metano a $25\,^\circ\mathrm{C}$ e $1\un{bar}$ contiene circa $40{,}3\un{mol}$, e bruciando completamente libera circa $35{,}9\un{MJ}$.

::: quotidiano Scaldamani e impacchi freddi
Nello scaldamani a polvere di ferro la reazione complessiva è l'ossidazione del metallo, $4\,\mathrm{Fe(s)}+3\,\mathrm{O_2(g)}\to2\,\mathrm{Fe_2O_3(s)}$, con $\Delta H=-1648\un{kJ}$, cioè circa $7{,}4\un{kJ}$ per grammo di ferro. La stessa reazione arrugginisce lentamente un cancello senza che nessuno se ne accorga; nello scaldamani il ferro è in polvere finissima, mescolato con sale, carbone attivo e un materiale che trattiene umidità, e l'ossidazione è abbastanza rapida da mantenere la busta tiepida per alcune ore. Nell'impacco freddo, invece, lo scioglimento del nitrato di ammonio assorbe circa $25{,}7\un{kJ}$ per mole di sale, circa $0{,}32\un{kJ}$ per grammo. Esistono anche impacchi caldi monouso a base di cloruro di calcio, il cui scioglimento in acqua libera circa $81\un{kJ/mol}$.
:::

## Il calorimetro a pressione costante {#tazza}

Un **calorimetro** è un dispositivo che misura il calore scambiato in un processo attraverso la variazione di temperatura di un corpo di capacità termica nota. La versione più semplice, usata in tutti i laboratori didattici, è il calorimetro «a tazza»: due bicchieri di polistirene espanso inseriti l'uno nell'altro, un coperchio forato per il termometro e per l'agitatore. Il polistirene è un ottimo isolante, e per qualche minuto lo scambio di calore con l'ambiente resta piccolo.

::: figura tazza
{"w":640,"h":270,"items":[{"t":"poly","pts":[[200,80],[230,250],[410,250],[440,80]],"c":"muted","w":2},{"t":"poly","pts":[[215,90],[242,238],[398,238],[425,90]],"c":"ax","w":2},{"t":"poly","pts":[[223,135],[247,225],[393,225],[417,135]],"close":true,"fill":true,"c":"body"},{"t":"rect","p":[190,64,260,18],"c":"muted","r":3},{"t":"line","p":[275,30,275,200],"c":"force4","w":3},{"t":"circle","p":[275,204,6],"c":"force4"},{"t":"line","p":[375,40,375,190],"c":"ax","w":2},{"t":"line","p":[355,190,395,190],"c":"ax","w":2.4},{"t":"text","p":[263,40],"s":"termometro","c":"force4","size":12,"a":"end"},{"t":"text","p":[383,44],"s":"agitatore","c":"ax","size":12,"a":"start"},{"t":"text","p":[460,72],"s":"coperchio","c":"muted","size":12,"a":"start"},{"t":"text","p":[460,120],"s":"due bicchieri di polistirene","c":"muted","size":12,"a":"start"},{"t":"text","p":[325,165],"s":"soluzione","c":"ax","size":13}]}
---
Il calorimetro a pressione costante. La reazione avviene in soluzione acquosa dentro due bicchieri isolanti; un termometro registra la temperatura, un agitatore la rende uniforme. Il coperchio non è a tenuta, e la pressione resta quella atmosferica.
:::

La reazione avviene nella soluzione, a pressione atmosferica, e il calore che scambia è quindi $\Delta H$. Il ragionamento si basa sulla conservazione dell'energia. Il calorimetro e il suo contenuto formano in buona approssimazione un sistema isolato; il calore $q_\mathrm{reaz}$ liberato o assorbito dalla reazione viene interamente ceduto o sottratto alla soluzione e alle pareti:

$$q_\mathrm{reaz}=-\left(m_\mathrm{sol}\,c_\mathrm{sol}+C_\mathrm{cal}\right)\Delta T.$$

Se la temperatura sale, $\Delta T>0$ e $q_\mathrm{reaz}<0$: la reazione è esotermica. Il termine $C_\mathrm{cal}$, la capacità termica del recipiente, del termometro e dell'agitatore, è piccolo per i bicchieri di polistirene e viene spesso trascurato; quando serve si determina con una prova preliminare.

::: metodo Misurare la costante del calorimetro
1. Versare nel calorimetro una massa nota di acqua fredda e registrarne la temperatura fino a che resta stabile.
2. Aggiungere rapidamente una massa nota di acqua calda, a temperatura misurata, e agitare.
3. Registrare la temperatura finale di equilibrio, estrapolata come spiegato più avanti.
4. Il calore ceduto dall'acqua calda è uguale alla somma di quello acquistato dall'acqua fredda e di quello acquistato dal calorimetro; dalla differenza si ricava $C_\mathrm{cal}$.
:::

Una misura reale non produce un salto netto di temperatura. Prima dell'aggiunta del reagente la temperatura resta costante; dopo il mescolamento cambia rapidamente, raggiunge un estremo e poi comincia a derivare lentamente verso la temperatura ambiente, perché l'isolamento non è perfetto. Per ricavare la variazione che si sarebbe osservata in un calorimetro ideale si prolunga all'indietro la retta di deriva fino all'istante del mescolamento.

::: figura termogramma
{"w":640,"h":290,"items":[{"t":"axes","o":[70,250],"x":[540,"tempo (min)"],"y":[225,"temperatura (°C)"],"sx":48,"sy":19,"xt":[[2,"2"],[4,"4"],[6,"6"],[8,"8"]],"yt":[[2,"14"],[4,"16"],[6,"18"],[8,"20"],[10,"22"]]},{"t":"plot","o":[70,250],"sx":48,"sy":19,"pts":[[0,10.0],[1,10.0],[2,10.0],[2.05,8.611],[2.1,7.474],[2.15,6.544],[2.2,5.783],[2.25,5.16],[2.3,4.651],[2.35,4.235],[2.4,3.895],[2.45,3.616],[2.5,3.389],[2.55,3.204],[2.6,3.053],[2.65,2.929],[2.7,2.829],[2.75,2.747],[2.8,2.681],[2.85,2.627],[2.9,2.584],[2.95,2.549],[3.0,2.521],[3.05,2.498],[3.1,2.48],[3.15,2.466],[3.2,2.455],[3.25,2.447],[3.3,2.44],[3.35,2.436],[3.4,2.432],[3.45,2.43],[3.5,2.429],[3.6,2.416],[4,2.44],[5,2.5],[6,2.56],[7,2.62],[8,2.68],[9,2.74],[10,2.8]],"c":"force2","w":2.4},{"t":"plot","o":[70,250],"sx":48,"sy":19,"pts":[[2,2.3200000000000003],[4,2.4399999999999995]],"c":"force4","w":1.6,"dash":true},{"t":"line","p":[166,60,166,250],"c":"muted","w":1.2,"dash":true},{"t":"arrow","p":[156,64,156,203.92],"c":"force","w":2,"head":8},{"t":"text","p":[271.6,124.6],"s":"ΔT = −7,68 °C","c":"force","size":12,"a":"start"},{"t":"text","p":[172,41.0],"s":"aggiunta del sale","c":"muted","size":11,"a":"start"},{"t":"text","p":[338.79999999999995,174.0],"s":"lenta risalita: calore dall'ambiente","c":"muted","size":11,"a":"start"},{"t":"text","p":[196,220.5],"s":"estrapolazione","c":"force4","size":11,"a":"start"}]}
---
L'andamento della temperatura durante lo scioglimento di $10{,}00\un{g}$ di nitrato di ammonio in $90{,}0\un{g}$ d'acqua. Dopo il rapido raffreddamento la soluzione si riscalda lentamente assorbendo calore dall'ambiente; la retta tratteggiata, estrapolata all'istante dell'aggiunta, fornisce la variazione di temperatura da usare nei calcoli.
:::

::: esempio L'entalpia di soluzione del nitrato di ammonio
In un calorimetro a tazza contenente $90{,}0\un{g}$ d'acqua a $22{,}00\,^\circ\mathrm{C}$ si sciolgono $10{,}00\un{g}$ di nitrato di ammonio, $\mathrm{NH_4NO_3}$. La temperatura estrapolata scende a $14{,}32\,^\circ\mathrm{C}$. Supponendo che la soluzione abbia calore specifico $4{,}18\un{J/(g\,K)}$ e che la capacità termica del calorimetro sia trascurabile, calcolare l'entalpia di soluzione per mole di sale.

La massa della soluzione è $100{,}0\un{g}$ e $\Delta T=-7{,}68\un{K}$. Il calore assorbito dal processo è
$$q_\mathrm{sol}=-m\,c\,\Delta T=-100{,}0\times4{,}18\times(-7{,}68)\un{J}\simeq+3210\un{J}.$$
Le moli di sale sono $10{,}00/80{,}04\simeq0{,}1249\un{mol}$, e quindi
$$\Delta_\mathrm{sol}H=\frac{+3{,}210\un{kJ}}{0{,}1249\un{mol}}\simeq+25{,}7\un{kJ/mol}.$$
Il valore positivo conferma che lo scioglimento è endotermico. Le approssimazioni sul calore specifico e sulla capacità del calorimetro introducono un'incertezza di qualche per cento, accettabile per una misura di laboratorio.
:::

## La bomba calorimetrica {#bomba}

Le combustioni si prestano male al calorimetro a tazza, perché richiedono ossigeno, producono gas e raggiungono temperature elevate. Per misurarle si usa la **bomba calorimetrica**, introdotta da Berthelot nel 1881 e perfezionata in seguito fino agli strumenti attuali. Il campione, pesato con precisione, viene posto in un crogiolo all'interno di un recipiente d'acciaio a pareti spesse, la bomba, riempito di ossigeno a circa $30\un{bar}$. La bomba è immersa in una massa nota d'acqua, contenuta in un recipiente isolato e agitata; un filo metallico percorso da corrente innesca la combustione, che si completa in pochi secondi.

::: figura bomba
{"w":640,"h":280,"items":[{"t":"rect","p":[150,50,340,215],"c":"muted","r":8},{"t":"rect","p":[180,80,280,170],"c":"body","r":4},{"t":"rect","p":[270,140,100,90],"c":"muted","r":12},{"t":"line","p":[300,80,300,150],"c":"ax","w":1.6},{"t":"line","p":[340,80,340,150],"c":"ax","w":1.6},{"t":"line","p":[300,180,340,180],"c":"force4","w":2},{"t":"circle","p":[320,200,7],"c":"force"},{"t":"line","p":[220,30,220,200],"c":"force4","w":3},{"t":"circle","p":[220,204,6],"c":"force4"},{"t":"line","p":[420,30,420,215],"c":"ax","w":2},{"t":"line","p":[402,215,438,215],"c":"ax","w":2.4},{"t":"text","p":[212,40],"s":"termometro","c":"force4","size":12,"a":"end"},{"t":"text","p":[428,40],"s":"agitatore","c":"ax","size":12,"a":"start"},{"t":"text","p":[320,40],"s":"fili di accensione","c":"ax","size":12},{"t":"text","p":[505,110],"s":"acqua","c":"force2","size":12,"a":"start"},{"t":"line","p":[460,106,500,106],"c":"force2","w":1.2},{"t":"text","p":[505,170],"s":"bomba d'acciaio","c":"muted","size":12,"a":"start"},{"t":"line","p":[370,166,500,166],"c":"muted","w":1.2},{"t":"text","p":[505,215],"s":"campione e O₂","c":"force","size":12,"a":"start"},{"t":"line","p":[330,206,500,210],"c":"force","w":1.2},{"t":"text","p":[505,255],"s":"camicia isolante","c":"muted","size":12,"a":"start"},{"t":"line","p":[490,250,500,252],"c":"muted","w":1.2}]}
---
Schema della bomba calorimetrica. La combustione avviene nel recipiente d'acciaio chiuso, a volume costante; il calore passa all'acqua circostante, la cui temperatura viene misurata con precisione di millesimi di grado.
:::

Poiché la bomba è chiusa e rigida, il volume non cambia, il lavoro di espansione è nullo e il calore scambiato coincide con la variazione di energia interna: $q_V=\Delta U$. La bomba e l'acqua che la circonda si trattano come un unico corpo di capacità termica $C$, che si determina bruciando una sostanza di riferimento. Il campione di calibrazione universalmente adottato è l'acido benzoico, $\mathrm{C_6H_5COOH}$, un solido stabile, non igroscopico e facile da purificare; il materiale di riferimento distribuito dal NIST, nelle condizioni standard della bomba, libera $26{,}434\un{kJ}$ per grammo.

::: esempio Calibrare la bomba e bruciare l'etanolo
Bruciando $1{,}200\un{g}$ di acido benzoico la temperatura del calorimetro sale di $3{,}095\un{K}$. In una seconda prova, con la stessa massa d'acqua, $0{,}950\un{g}$ di etanolo liquido producono un aumento di $2{,}745\un{K}$. Calcolare l'energia interna e l'entalpia di combustione dell'etanolo per mole.

La capacità termica del calorimetro è
$$C=\frac{1{,}200\times26{,}434\un{kJ}}{3{,}095\un{K}}\simeq10{,}25\un{kJ/K}.$$
Nella seconda prova il calore liberato vale $10{,}25\times2{,}745\simeq28{,}13\un{kJ}$, cioè $29{,}61\un{kJ}$ per grammo di etanolo. Con la massa molare $46{,}07\un{g/mol}$,
$$\Delta_\mathrm{c}U\simeq-29{,}61\times46{,}07\un{kJ/mol}\simeq-1364\un{kJ/mol}.$$
Nella reazione $\mathrm{C_2H_5OH(l)}+3\,\mathrm{O_2(g)}\to{}$ $2\,\mathrm{CO_2(g)}+3\,\mathrm{H_2O(l)}$ le moli gassose passano da tre a due, $\Delta n_\mathrm{gas}=-1$, e quindi
$$\Delta_\mathrm{c}H=\Delta_\mathrm{c}U+\Delta n_\mathrm{gas}RT\simeq-1364-2{,}5\simeq-1367\un{kJ/mol},$$
in accordo con il valore che si ricava dalle entalpie di formazione tabulate.
:::

::: storia Il calorimetro a ghiaccio
Il primo calorimetro quantitativo fu costruito da Antoine Lavoisier e Pierre-Simon Laplace e descritto nella loro memoria sul calore del 1783. Il corpo da studiare veniva posto in una camera circondata da ghiaccio a $0\,^\circ\mathrm{C}$; il calore liberato fondeva una parte del ghiaccio, e l'acqua raccolta, pesata, misurava il calore. Un secondo strato di ghiaccio all'esterno impediva al calore dell'ambiente di raggiungere quello interno. Con questo apparecchio Lavoisier e Laplace misurarono il calore liberato da un porcellino d'India in dieci ore e lo confrontarono con quello prodotto bruciando la quantità di carbone che genera la stessa anidride carbonica espirata dall'animale, e conclusero che la respirazione è una combustione lenta.
:::

::: quotidiano L'energia scritta sulle etichette
Le calorie indicate sulle confezioni degli alimenti sono, in origine, energie di combustione misurate con la bomba calorimetrica, corrette per la parte che l'organismo non riesce a utilizzare. Nell'Unione Europea il valore energetico da dichiarare si calcola con fattori fissati dal regolamento 1169/2011: $17\un{kJ}$ per grammo di carboidrati e di proteine, $37\un{kJ}$ per grammo di grassi, $29\un{kJ}$ per grammo di alcol etilico. L'ultimo fattore si confronta bene con il calore di combustione dell'etanolo appena calcolato, circa $29{,}7\un{kJ/g}$. Una kilocaloria alimentare corrisponde a $4{,}184\un{kJ}$.
:::

## La legge di Hess {#hess}

Molte entalpie di reazione non si possono misurare direttamente. La combustione del carbonio a monossido di carbonio, $\mathrm{C(grafite)}+\tfrac12\,\mathrm{O_2(g)}\to\mathrm{CO(g)}$, è un esempio classico: bruciando grafite con poco ossigeno si ottiene sempre una miscela di monossido e diossido di carbonio, e il calore misurato non corrisponde a nessuna delle due reazioni pure. Eppure il valore di $\Delta H$ si conosce con precisione, perché l'entalpia è una funzione di stato.

::: legge Legge di Hess
Se una reazione si può scrivere come somma di due o più reazioni, la sua variazione di entalpia è la somma delle variazioni di entalpia di quelle reazioni.
:::

Il chimico Germain Henri Hess, che lavorava a San Pietroburgo, enunciò la legge nel 1840 come risultato sperimentale, la «legge della costanza della somma dei calori». Oggi la si riconosce come conseguenza diretta del primo principio: se $\Delta H$ dipende soltanto dagli stati iniziale e finale, qualunque percorso che colleghi gli stessi stati deve dare la stessa variazione.

Per il monossido di carbonio si usano due combustioni complete, entrambe misurabili con la bomba calorimetrica:

$$\begin{aligned}
\mathrm{C(grafite)}+\mathrm{O_2(g)}&\longrightarrow\mathrm{CO_2(g)} &\Delta H_1&=-393{,}5\un{kJ}\\
\mathrm{CO(g)}+\tfrac12\,\mathrm{O_2(g)}&\longrightarrow\mathrm{CO_2(g)} &\Delta H_2&=-283{,}0\un{kJ}
\end{aligned}$$

Lasciando la prima reazione com'è e invertendo la seconda, con il segno di $\Delta H_2$ cambiato, la somma delle due equazioni dà proprio la reazione cercata: la mole di $\mathrm{CO_2}$ compare a destra nella prima e a sinistra nella seconda invertita, e si cancella, mentre mezza mole di ossigeno a sinistra si semplifica con mezza mole a destra. Quindi

$$\Delta H=\Delta H_1-\Delta H_2=-393{,}5+283{,}0=-110{,}5\un{kJ}.$$

::: figura hess
{"w":640,"h":275,"items":[{"t":"arrow","p":[40,260,40,30],"c":"muted","w":1.4,"head":7},{"t":"text","p":[46,36],"s":"H","c":"muted","size":13,"a":"start"},{"t":"line","p":[80,50,400,50],"c":"ax","w":2.6},{"t":"text","p":[408,55],"s":"C(grafite) + O₂(g)","c":"ax","size":12,"a":"start"},{"t":"line","p":[240,107.46000000000001,400,107.46000000000001],"c":"ax","w":2.6},{"t":"text","p":[408,112.46000000000001],"s":"CO(g) + ½ O₂(g)","c":"ax","size":12,"a":"start"},{"t":"line","p":[80,254.62,400,254.62],"c":"ax","w":2.6},{"t":"text","p":[408,259.62],"s":"CO₂(g)","c":"ax","size":12,"a":"start"},{"t":"arrow","p":[120,54,120,250.62],"c":"force2","w":2.6,"head":9},{"t":"text","p":[128,152.3],"s":"−393,5 kJ","c":"force2","size":13,"a":"start"},{"t":"arrow","p":[290,54,290,103.46000000000001],"c":"force4","w":2.2,"head":8},{"t":"text","p":[298,83.7],"s":"ΔH = ?","c":"force4","size":13,"a":"start"},{"t":"arrow","p":[350,111.46000000000001,350,250.62],"c":"force3","w":2.2,"head":8},{"t":"text","p":[358,186.0],"s":"−283,0 kJ","c":"force3","size":13,"a":"start"}]}
---
La legge di Hess per la formazione del monossido di carbonio. Passare dalla grafite al diossido di carbonio in un solo passaggio, a sinistra, o in due passaggi attraverso il monossido, a destra, comporta la stessa variazione complessiva di entalpia; il primo dei due passaggi si ricava per differenza.
:::

::: metodo Combinare le equazioni termochimiche
1. Scrivere la reazione cercata, bilanciata, con gli stati fisici.
2. Scegliere fra le reazioni note quelle che contengono le specie della reazione cercata.
3. Invertire le reazioni che hanno una specie dal lato sbagliato, cambiando il segno di $\Delta H$.
4. Moltiplicare le reazioni per i fattori che rendono uguali i coefficienti, moltiplicando anche $\Delta H$.
5. Sommare le equazioni, verificare che le specie intermedie si cancellino e che resti la reazione cercata, e sommare i valori di $\Delta H$.
:::

## Le entalpie standard di formazione {#formazione}

La legge di Hess permette di costruire una tabella compatta da cui ricavare l'entalpia di moltissime reazioni. Occorre prima fissare un riferimento comune, perché le entalpie dipendono da temperatura, pressione e stato fisico.

Lo **stato standard** di una sostanza è la sua forma pura alla pressione di $1\un{bar}$, che la IUPAC raccomanda dal 1982 al posto della vecchia atmosfera; per una specie in soluzione è la concentrazione di $1\un{mol/kg}$ in condizioni ideali. La temperatura va specificata, e le tabelle si riferiscono quasi sempre a $298{,}15\un{K}$. Le grandezze riferite agli stati standard si indicano con il simbolo $^\circ$.

L'**entalpia standard di formazione** $\Delta_\mathrm{f}H^\circ$ di un composto è la variazione di entalpia della reazione che forma una mole del composto, nello stato standard, a partire dagli elementi nella loro forma di riferimento, la più stabile alle condizioni standard: grafite per il carbonio, $\mathrm{O_2(g)}$ per l'ossigeno, $\mathrm{H_2(g)}$ per l'idrogeno, $\mathrm{Br_2(l)}$ per il bromo. Per l'etanolo liquido, per esempio,

$$2\,\mathrm{C(grafite)}+3\,\mathrm{H_2(g)}+\tfrac12\,\mathrm{O_2(g)}\longrightarrow\mathrm{C_2H_5OH(l)},\qquad\Delta_\mathrm{f}H^\circ=-277{,}7\un{kJ/mol}.$$

Per definizione, l'entalpia standard di formazione di un elemento nella sua forma di riferimento è zero. Il diamante, che non è la forma di riferimento del carbonio, ha $\Delta_\mathrm{f}H^\circ=+1{,}90\un{kJ/mol}$: trasformare la grafite in diamante richiede energia, e a pressione ordinaria il diamante è soltanto una forma metastabile, che si conserva perché la trasformazione inversa è lentissima.

| Sostanza | $\Delta_\mathrm{f}H^\circ$ ($\mathrm{kJ/mol}$) |
|---|---|
| $\mathrm{H_2O(l)}$ | $-285{,}8$ |
| $\mathrm{H_2O(g)}$ | $-241{,}8$ |
| $\mathrm{CO_2(g)}$ | $-393{,}5$ |
| $\mathrm{CO(g)}$ | $-110{,}5$ |
| $\mathrm{NH_3(g)}$ | $-46{,}11$ |
| $\mathrm{Fe_2O_3(s)}$ | $-824{,}2$ |
| $\mathrm{Al_2O_3(s)}$ | $-1676$ |
| $\mathrm{NH_4NO_3(s)}$ | $-365{,}6$ |
| $\mathrm{CH_4(g)}$ | $-74{,}81$ |
| $\mathrm{C_2H_2(g)}$ | $+226{,}7$ |
| $\mathrm{C_2H_4(g)}$ | $+52{,}26$ |
| $\mathrm{C_3H_8(g)}$ | $-103{,}8$ |
| $\mathrm{CH_3OH(l)}$ | $-238{,}7$ |
| $\mathrm{C_2H_5OH(l)}$ | $-277{,}7$ |
| $\mathrm{CaCO_3(s)}$ | $-1207$ |
| $\mathrm{CaO(s)}$ | $-635{,}1$ |

Con questi valori l'entalpia standard di una reazione qualsiasi si calcola con un'unica formula. Si immagini di scomporre tutti i reagenti negli elementi, cosa che richiede $-\sum\nu\,\Delta_\mathrm{f}H^\circ(\text{reagenti})$, e di ricomporre poi gli elementi nei prodotti, cosa che fornisce $\sum\nu\,\Delta_\mathrm{f}H^\circ(\text{prodotti})$. Per la legge di Hess,

$$\Delta_\mathrm{r}H^\circ=\sum\nu_\mathrm{p}\,\Delta_\mathrm{f}H^\circ(\text{prodotti})-\sum\nu_\mathrm{r}\,\Delta_\mathrm{f}H^\circ(\text{reagenti}),$$

dove i $\nu$ sono i coefficienti stechiometrici.

::: figura formazione
{"w":640,"h":290,"items":[{"t":"arrow","p":[40,270,40,25],"c":"muted","w":1.4,"head":7},{"t":"text","p":[46,30],"s":"H","c":"muted","size":13,"a":"start"},{"t":"line","p":[80,60,330,60],"c":"ax","w":2.6},{"t":"text","p":[338,65],"s":"C(grafite) + 2 H₂(g) + 2 O₂(g)   (H = 0)","c":"ax","size":12,"a":"start"},{"t":"line","p":[80,76.4582,250,76.4582],"c":"ax","w":2.6},{"t":"text","p":[258,81.4582],"s":"CH₄(g) + 2 O₂(g)","c":"ax","size":12,"a":"start"},{"t":"line","p":[80,272.322,330,272.322],"c":"ax","w":2.6},{"t":"text","p":[338,277.322],"s":"CO₂(g) + 2 H₂O(l)","c":"ax","size":12,"a":"start"},{"t":"arrow","p":[200,63,200,73.4582],"c":"force2","w":2,"head":6},{"t":"text","p":[188,72],"s":"−74,8","c":"force2","size":11,"a":"end"},{"t":"arrow","p":[300,64,300,268.322],"c":"force3","w":2.4,"head":9},{"t":"text","p":[308,206.2],"s":"−393,5 + 2(−285,8) = −965,1","c":"force3","size":12,"a":"start"},{"t":"arrow","p":[140,80.4582,140,268.322],"c":"force4","w":2.4,"head":9},{"t":"text","p":[148,174.4],"s":"ΔH° = −890,3 kJ","c":"force4","size":13,"a":"start"}]}
---
Il calcolo dell'entalpia di combustione del metano passando per gli elementi. Il livello zero è quello degli elementi nelle forme di riferimento; il metano si trova $74{,}8\un{kJ}$ più in basso, i prodotti $965{,}1\un{kJ}$ più in basso. La differenza è l'entalpia di reazione.
:::

::: esempio La combustione del metano
Calcolare $\Delta_\mathrm{r}H^\circ$ per $\mathrm{CH_4(g)}+2\,\mathrm{O_2(g)}\to\mathrm{CO_2(g)}+2\,\mathrm{H_2O(l)}$.

Prodotti: $-393{,}5+2\times(-285{,}8)=-965{,}1\un{kJ}$. Reagenti: $-74{,}81+2\times0=-74{,}81\un{kJ}$. Quindi
$$\Delta_\mathrm{r}H^\circ=-965{,}1-(-74{,}81)\simeq-890{,}3\un{kJ}.$$
L'ossigeno, elemento nella forma di riferimento, non contribuisce.
:::

La stessa relazione si usa al contrario per ricavare entalpie di formazione da entalpie di combustione misurate. Per l'ottano liquido, componente tipico della benzina, la combustione $\mathrm{C_8H_{18}(l)}+\tfrac{25}{2}\,\mathrm{O_2(g)}\to{}$ $8\,\mathrm{CO_2(g)}+9\,\mathrm{H_2O(l)}$ ha $\Delta_\mathrm{c}H^\circ=-5470\un{kJ/mol}$. Isolando l'incognita,
$$\Delta_\mathrm{f}H^\circ(\mathrm{C_8H_{18}})=8\times(-393{,}5)+9\times(-285{,}8)+5470\simeq-250\un{kJ/mol}.$$
Quasi tutte le entalpie di formazione dei composti organici sono state ottenute così.

Per gli ioni in soluzione si adotta una convenzione aggiuntiva, perché è impossibile preparare una soluzione che contenga soltanto ioni positivi. Si pone uguale a zero l'entalpia standard di formazione dello ione $\mathrm{H^+(aq)}$, e tutte le altre si misurano rispetto a questa. Con i valori tabulati per $\mathrm{Ca^{2+}(aq)}$, $-542{,}8\un{kJ/mol}$, e per $\mathrm{Cl^-(aq)}$, $-167{,}2\un{kJ/mol}$, l'entalpia di soluzione del cloruro di calcio solido, $-795{,}8\un{kJ/mol}$, risulta
$$\Delta_\mathrm{sol}H^\circ=-542{,}8+2\times(-167{,}2)-(-795{,}8)=-81{,}4\un{kJ/mol}.$$
È lo stesso sale che si sparge sulle strade ghiacciate: sciogliendosi nell'acqua del ghiaccio parzialmente fuso ne libera calore, oltre ad abbassarne il punto di congelamento.

## Entalpie di legame {#legami}

Una reazione chimica rompe alcuni legami e ne forma altri. Rompere un legame richiede sempre energia, formarlo ne libera sempre, e il bilancio fra le due quantità è l'entalpia di reazione. L'**entalpia di legame** $D$ di un legame $\mathrm{A{-}B}$ è la variazione di entalpia per la rottura di una mole di quei legami in fase gassosa, con formazione di atomi o frammenti gassosi.

Per le molecole biatomiche la definizione è univoca e si ricava dalle entalpie di formazione degli atomi gassosi. Con $\Delta_\mathrm{f}H^\circ$ di $\mathrm{H(g)}$, $\mathrm{O(g)}$ e $\mathrm{Cl(g)}$, rispettivamente $218{,}0$, $249{,}2$ e $121{,}7\un{kJ/mol}$, si ottengono $D(\mathrm{H{-}H})=436{,}0\un{kJ/mol}$, $D(\mathrm{O{=}O})=498{,}4\un{kJ/mol}$ e $D(\mathrm{Cl{-}Cl})=243{,}4\un{kJ/mol}$, e per l'acido cloridrico gassoso, con $\Delta_\mathrm{f}H^\circ=-92{,}31\un{kJ/mol}$,
$$D(\mathrm{H{-}Cl})=218{,}0+121{,}7-(-92{,}31)\simeq432{,}0\un{kJ/mol}.$$

Nelle molecole poliatomiche i legami dello stesso tipo non sono equivalenti. Strappare il primo idrogeno al metano richiede un'energia diversa dallo strappare il secondo, e un legame $\mathrm{C{-}H}$ dell'etano non è identico a uno del metano. Si usano allora **entalpie medie di legame**. Dall'atomizzazione completa del metano, $\mathrm{CH_4(g)}\to\mathrm{C(g)}+4\,\mathrm{H(g)}$, che richiede $716{,}7+4\times218{,}0+74{,}81$, cioè circa $1663{,}5\un{kJ/mol}$, si ricava un valore medio di $415{,}9\un{kJ/mol}$ per il legame $\mathrm{C{-}H}$; nello stesso modo l'acqua dà $463{,}5\un{kJ/mol}$ per il legame $\mathrm{O{-}H}$ e il diossido di carbonio $804{,}3\un{kJ/mol}$ per il legame $\mathrm{C{=}O}$.

::: figura legami
{"w":640,"h":295,"items":[{"t":"arrow","p":[40,280,40,15],"c":"muted","w":1.4,"head":7},{"t":"text","p":[46,22],"s":"H","c":"muted","size":13,"a":"start"},{"t":"line","p":[80,55.3,380,55.3],"c":"ax","w":2.6},{"t":"text","p":[388,60.3],"s":"C(g) + 4 H(g) + 4 O(g)","c":"ax","size":12,"a":"start"},{"t":"line","p":[80,220.3,220,220.3],"c":"ax","w":2.6},{"t":"text","p":[228,225.3],"s":"CH₄ + 2 O₂","c":"ax","size":12,"a":"start"},{"t":"line","p":[240,270,380,270],"c":"ax","w":2.6},{"t":"text","p":[388,275],"s":"CO₂ + 2 H₂O(g)","c":"ax","size":12,"a":"start"},{"t":"arrow","p":[120,216.3,120,59.3],"c":"force2","w":2.4,"head":9},{"t":"text","p":[112,137.8],"s":"+2660","c":"force2","size":12,"a":"end"},{"t":"text","p":[112,153.8],"s":"legami rotti","c":"muted","size":11,"a":"end"},{"t":"arrow","p":[330,59.3,330,266],"c":"force4","w":2.4,"head":9},{"t":"text","p":[338,162.7],"s":"−3463","c":"force4","size":12,"a":"start"},{"t":"text","p":[338,178.7],"s":"legami formati","c":"muted","size":11,"a":"start"},{"t":"arrow","p":[200,224.3,200,266],"c":"force3","w":2,"head":7},{"t":"text","p":[208,263.1],"s":"−802","c":"force3","size":12,"a":"start"}]}
---
La combustione del metano scomposta in due passaggi immaginari: la rottura di tutti i legami dei reagenti, fino agli atomi gassosi, e la formazione dei legami dei prodotti. I valori in kilojoule si riferiscono alla reazione con acqua allo stato di vapore.
:::

Per stimare l'entalpia di una reazione in fase gassosa si sommano le entalpie dei legami rotti e si sottraggono quelle dei legami formati:

$$\Delta_\mathrm{r}H\simeq\sum D(\text{legami rotti})-\sum D(\text{legami formati}).$$

La stima è utile soprattutto per molecole di cui mancano i dati di formazione. Conviene però misurarne l'affidabilità su un caso noto. Dall'etano si ricava, sottraendo sei legami $\mathrm{C{-}H}$ da $415{,}9\un{kJ/mol}$, un'entalpia del legame $\mathrm{C{-}C}$ di circa $330{,}8\un{kJ/mol}$. Con questi due valori, il propano gassoso, che contiene due legami $\mathrm{C{-}C}$ e otto $\mathrm{C{-}H}$, avrebbe
$$\Delta_\mathrm{f}H^\circ\simeq3\times716{,}7+8\times218{,}0-(2\times330{,}8+8\times415{,}9)\simeq-94{,}5\un{kJ/mol},$$
contro il valore misurato di $-103{,}8\un{kJ/mol}$. L'errore, circa $9\un{kJ/mol}$, è piccolo rispetto alle energie di atomizzazione in gioco, quasi $4000\un{kJ/mol}$, ma non trascurabile rispetto all'entalpia di formazione stessa. Le entalpie di legame danno stime ragionevoli, spesso entro qualche decina di kilojoule; per calcoli accurati servono le entalpie di formazione. La relazione fra energia di legame, lunghezza e forza dei legami sarà ripresa nel capitolo [Legame covalente ed energia di legame](unit:chemistry-07).

## I combustibili {#combustibili}

Gran parte dell'energia usata dall'umanità viene dalla combustione di sostanze che contengono carbonio e idrogeno. Il confronto fra combustibili diversi si fa a parità di massa, e la figura riassume i valori calcolati dalle entalpie di formazione, insieme alla massa di anidride carbonica emessa per ogni megajoule di energia prodotta.

::: figura combustibili
{"w":640,"h":300,"items":[{"t":"text","p":[170,22],"s":"energia liberata (kJ/g)","c":"ax","size":13},{"t":"text","p":[480,22],"s":"CO₂ emessa (g per MJ)","c":"ax","size":13},{"t":"text","p":[64,56],"s":"H₂","c":"ax","size":12,"a":"end"},{"t":"rect","p":[72,43,219.8,20],"c":"force","r":1},{"t":"text","p":[295.8,58],"s":"141,8","c":"ax","size":11,"a":"start"},{"t":"text","p":[404.0,58],"s":"0","c":"ax","size":11,"a":"start"},{"t":"text","p":[64,88],"s":"CH₄","c":"ax","size":12,"a":"end"},{"t":"rect","p":[72,75,86.0,20],"c":"force","r":1},{"t":"text","p":[162.0,90],"s":"55,5","c":"ax","size":11,"a":"start"},{"t":"rect","p":[400,75,79.0,20],"c":"force3","r":1},{"t":"text","p":[483.0,90],"s":"49,4","c":"ax","size":11,"a":"start"},{"t":"text","p":[64,120],"s":"C₄H₁₀","c":"ax","size":12,"a":"end"},{"t":"rect","p":[72,107,76.7,20],"c":"force","r":1},{"t":"text","p":[152.7,122],"s":"49,5","c":"ax","size":11,"a":"start"},{"t":"rect","p":[400,107,97.9,20],"c":"force3","r":1},{"t":"text","p":[501.9,122],"s":"61,2","c":"ax","size":11,"a":"start"},{"t":"text","p":[64,152],"s":"C₈H₁₈","c":"ax","size":12,"a":"end"},{"t":"rect","p":[72,139,74.2,20],"c":"force","r":1},{"t":"text","p":[150.2,154],"s":"47,9","c":"ax","size":11,"a":"start"},{"t":"rect","p":[400,139,103.0,20],"c":"force3","r":1},{"t":"text","p":[507.0,154],"s":"64,4","c":"ax","size":11,"a":"start"},{"t":"text","p":[64,184],"s":"C","c":"ax","size":12,"a":"end"},{"t":"rect","p":[72,171,50.8,20],"c":"force","r":1},{"t":"text","p":[126.8,186],"s":"32,8","c":"ax","size":11,"a":"start"},{"t":"rect","p":[400,171,178.9,20],"c":"force3","r":1},{"t":"text","p":[582.9,186],"s":"111,8","c":"ax","size":11,"a":"start"},{"t":"text","p":[64,216],"s":"C₂H₅OH","c":"ax","size":12,"a":"end"},{"t":"rect","p":[72,203,46.0,20],"c":"force","r":1},{"t":"text","p":[122.0,218],"s":"29,7","c":"ax","size":11,"a":"start"},{"t":"rect","p":[400,203,103.0,20],"c":"force3","r":1},{"t":"text","p":[507.0,218],"s":"64,4","c":"ax","size":11,"a":"start"},{"t":"text","p":[64,248],"s":"CH₃OH","c":"ax","size":12,"a":"end"},{"t":"rect","p":[72,235,35.2,20],"c":"force","r":1},{"t":"text","p":[111.2,250],"s":"22,7","c":"ax","size":11,"a":"start"},{"t":"rect","p":[400,235,97.0,20],"c":"force3","r":1},{"t":"text","p":[501.0,250],"s":"60,6","c":"ax","size":11,"a":"start"},{"t":"line","p":[72,36,72,268],"c":"ax","w":1.4},{"t":"line","p":[400,36,400,268],"c":"ax","w":1.4},{"t":"text","p":[320,288],"s":"combustione completa a 25 °C, con acqua liquida fra i prodotti","c":"muted","size":11}]}
---
Energia liberata per grammo e anidride carbonica emessa per megajoule nella combustione completa di alcuni combustibili. L'ottano rappresenta la benzina, il carbonio puro il carbone, il butano i gas di petrolio liquefatti.
:::

Tre osservazioni emergono dai numeri.

- **L'idrogeno è il combustibile più energetico per unità di massa**, $141{,}8\un{kJ/g}$, quasi tre volte il metano, e la sua combustione produce soltanto acqua. Per unità di volume, però, è svantaggiato: anche compresso a centinaia di bar o liquefatto a $-253\,^\circ\mathrm{C}$ occupa molto più spazio della benzina a parità di energia, e va prodotto a sua volta con un costo energetico.
- **Fra gli idrocarburi, più idrogeno significa più energia e meno anidride carbonica.** Il metano, con quattro atomi di idrogeno per atomo di carbonio, emette $49{,}4\un{g}$ di $\mathrm{CO_2}$ per megajoule; l'ottano $64{,}4\un{g}$; il carbone, quasi carbonio puro, $111{,}8\un{g}$, più del doppio del metano.
- **Gli alcoli liberano meno energia degli idrocarburi corrispondenti**, perché contengono già ossigeno: sono in parte ossidati. L'etanolo libera $29{,}7\un{kJ/g}$, il metanolo $22{,}7\un{kJ/g}$, meno della metà della benzina.

::: nota Potere calorifico superiore e inferiore
I valori della figura si riferiscono alla combustione con acqua liquida fra i prodotti, e corrispondono a quello che i tecnici chiamano potere calorifico superiore. Nei motori e in molte caldaie l'acqua esce dal camino come vapore, e l'energia effettivamente disponibile è il potere calorifico inferiore, calcolato con acqua gassosa. Per il metano i due valori sono $890{,}3$ e $802{,}3\un{kJ/mol}$, cioè $55{,}5$ e $50{,}0\un{kJ/g}$. Le caldaie a condensazione raffreddano i fumi fino a condensarne il vapore e recuperano una parte di quella differenza, che per il metano vale quasi il $10\%$ del totale.
:::

::: quotidiano La termite
Non tutte le reazioni fortemente esotermiche sono combustioni nell'aria. Una miscela di alluminio in polvere e ossido di ferro, la termite, reagisce secondo $2\,\mathrm{Al(s)}+\mathrm{Fe_2O_3(s)}\to\mathrm{Al_2O_3(s)}+2\,\mathrm{Fe(s)}$, liberando circa $852\un{kJ}$ per mole di ossido. Per grammo di miscela l'energia, circa $4\un{kJ/g}$, è circa dodici volte inferiore a quella della benzina; la miscela però contiene già l'ossigeno necessario, reagisce in pochi secondi in uno spazio ristretto e porta i prodotti oltre la temperatura di fusione del ferro. Per questo la reazione si usa ancora per saldare sul posto le rotaie ferroviarie. Il valore di $\Delta H$ indicato si riferisce a prodotti solidi a $25\,^\circ\mathrm{C}$; nella reazione reale una piccola parte dell'energia liberata viene spesa per fondere il ferro.
:::

## Entalpia e cambiamenti di stato {#passaggi}

Anche fusione, evaporazione e sublimazione comportano variazioni di entalpia, perché richiedono di vincere le attrazioni fra le particelle. L'**entalpia di fusione** dell'acqua a $0\,^\circ\mathrm{C}$ vale $6{,}01\un{kJ/mol}$; l'**entalpia di vaporizzazione** vale $40{,}7\un{kJ/mol}$ a $100\,^\circ\mathrm{C}$ e $44{,}0\un{kJ/mol}$ a $25\,^\circ\mathrm{C}$. Evaporare l'acqua richiede quasi sette volte più energia che fonderla: nella fusione le molecole restano a contatto e rompono soltanto una parte dei legami a idrogeno, nella vaporizzazione si separano del tutto.

Durante un cambiamento di stato a pressione costante la temperatura resta costante fino a quando l'intera sostanza ha cambiato fase, perché il calore fornito serve a cambiare lo stato. Una curva di riscaldamento lo mostra in modo diretto.

::: figura riscaldamento
{"w":640,"h":285,"items":[{"t":"axes","o":[70,250],"x":[560,"calore fornito (kJ)"],"y":[222,"temperatura (°C)"],"sx":9.0,"sy":1.4,"xt":[[10,"10"],[20,"20"],[30,"30"],[40,"40"]],"yt":[[30,"0"],[80,"50"],[130,"100"]]},{"t":"plot","o":[70,250],"sx":9.0,"sy":1.4,"pts":[[0,10],[0.757,30],[6.767,30],[14.299,130],[54.999,130],[55.72,150]],"c":"force4","w":2.6},{"t":"text","p":[80.8,198.0],"s":"fusione 6,0 kJ","c":"force2","size":11,"a":"start"},{"t":"text","p":[268.7,58.0],"s":"ebollizione 40,7 kJ","c":"force2","size":11,"a":"start"},{"t":"text","p":[178.9,142.0],"s":"liquido 7,5 kJ","c":"ax","size":11,"a":"start"},{"t":"text","p":[84,224.8],"s":"ghiaccio","c":"muted","size":11,"a":"start"},{"t":"text","p":[559.0,34.0],"s":"vapore","c":"muted","size":11,"a":"end"}]}
---
La curva di riscaldamento di una mole d'acqua, $18{,}0\un{g}$, a pressione atmosferica, da ghiaccio a $-20\,^\circ\mathrm{C}$ a vapore a $120\,^\circ\mathrm{C}$. I tratti inclinati corrispondono al riscaldamento di una singola fase, con calori specifici di circa $2{,}1$, $4{,}18$ e $2{,}0\un{J/(g\,K)}$ per ghiaccio, acqua liquida e vapore; i tratti orizzontali ai cambiamenti di stato.
:::

L'ebollizione è di gran lunga il tratto più lungo: delle circa $55{,}7\un{kJ}$ necessarie per tutto il percorso, $40{,}7$ servono a vaporizzare l'acqua a $100\,^\circ\mathrm{C}$, contro i $7{,}5$ che bastano a portarla da $0$ a $100\,^\circ\mathrm{C}$. Il nostro corpo sfrutta questa proprietà per raffreddarsi: l'evaporazione di un litro di sudore, circa $55{,}5\un{mol}$ d'acqua, sottrae alla pelle circa $2{,}4\un{MJ}$.

::: approfondimento L'entalpia di reazione a temperature diverse
I valori tabulati si riferiscono a $298{,}15\un{K}$. Per un'altra temperatura si costruisce un ciclo di Hess: si raffreddano i reagenti a $298{,}15\un{K}$, si fa avvenire la reazione, si riscaldano i prodotti alla temperatura iniziale. Se le capacità termiche si possono considerare costanti, ne risulta la legge di Kirchhoff,
$$\Delta_\mathrm{r}H(T_2)=\Delta_\mathrm{r}H(T_1)+\Delta C_P\,(T_2-T_1),\qquad\Delta C_P=\sum\nu_\mathrm{p}C_{P,m}(\text{prodotti})-\sum\nu_\mathrm{r}C_{P,m}(\text{reagenti}).$$
Per la formazione del vapore acqueo, $\mathrm{H_2(g)}+\tfrac12\,\mathrm{O_2(g)}\to\mathrm{H_2O(g)}$, con capacità termiche molari di $28{,}8$, $29{,}4$ e $33{,}6\un{J/(mol\,K)}$, si ha $\Delta C_P=33{,}6-28{,}8-14{,}7=-9{,}9\un{J/K}$. Passando da $298$ a $373\un{K}$ l'entalpia di reazione cambia di $-9{,}9\times75\un{J}\simeq-0{,}74\un{kJ}$, da $-241{,}8$ a $-242{,}5\un{kJ/mol}$. La correzione è piccola su intervalli di qualche decina di kelvin, e diventa importante soltanto per le reazioni condotte a temperature molto diverse da quella ambiente.
:::

## Perché avvengono le reazioni {#spontaneita}

Le reazioni esotermiche sono numerose fra quelle che avvengono spontaneamente, e per tutto l'Ottocento Berthelot e altri chimici pensarono che il segno di $\Delta H$ decidesse la direzione delle trasformazioni. L'impacco freddo del pronto soccorso basta a smentire l'idea: il nitrato di ammonio si scioglie in acqua da solo, senza alcun intervento esterno, eppure assorbe calore. Il ghiaccio che fonde a temperatura ambiente, l'acqua che evapora da una pozzanghera, l'idrogenocarbonato di sodio del lievito per dolci che in forno si decompone liberando anidride carbonica sono altri processi spontanei ed endotermici. Serve un secondo criterio.

Questo criterio è l'**entropia**, $S$, introdotta da Rudolf Clausius nel 1865. Ludwig Boltzmann ne diede l'interpretazione microscopica: l'entropia misura il numero $W$ di modi diversi in cui le particelle di un sistema possono disporre posizioni ed energie compatibilmente con il suo stato macroscopico,

$$S=k_\mathrm{B}\ln W,$$

la formula incisa sulla sua tomba a Vienna. Un gas ha entropia molto maggiore del liquido corrispondente, perché le sue molecole hanno a disposizione un volume enorme; un soluto disperso in una soluzione ha in genere più entropia del cristallo ordinato da cui proviene. Il **secondo principio della termodinamica** afferma che in ogni trasformazione spontanea l'entropia totale, del sistema più l'ambiente, aumenta.

Per un sistema a temperatura e pressione costanti il bilancio fra entalpia ed entropia si riassume in una sola funzione di stato, l'**energia di Gibbs**, dal nome del fisico americano Josiah Willard Gibbs che la introdusse negli anni Settanta dell'Ottocento:

$$G=H-TS,\qquad\Delta G=\Delta H-T\,\Delta S.$$

::: legge Criterio di spontaneità
A temperatura e pressione costanti una trasformazione avviene spontaneamente se $\Delta G<0$; è all'equilibrio se $\Delta G=0$; la trasformazione inversa è spontanea se $\Delta G>0$.
:::

Il termine $-T\Delta S$ spiega l'impacco freddo. Il terzo principio della termodinamica stabilisce che l'entropia di un cristallo perfetto è nulla allo zero assoluto, e permette di tabulare entropie molari standard assolute. Per il nitrato di ammonio valgono $151{,}1\un{J/(mol\,K)}$ per il solido e $259{,}8\un{J/(mol\,K)}$ per la soluzione: lo scioglimento ha $\Delta S^\circ=+108{,}7\un{J/K}$ per mole. A $298\un{K}$,
$$\Delta G^\circ=25{,}7\un{kJ}-298{,}15\un{K}\times0{,}1087\un{kJ/K}\simeq-6{,}7\un{kJ}.$$
L'aumento di entropia prevale sull'assorbimento di calore, e il sale si scioglie spontaneamente raffreddando la soluzione.

Il segno di $\Delta G$ dipende dalla combinazione dei segni di $\Delta H$ e $\Delta S$, e dalla temperatura.

| $\Delta H$ | $\Delta S$ | comportamento |
|---|---|---|
| $<0$ | $>0$ | spontanea a ogni temperatura |
| $<0$ | $<0$ | spontanea a bassa temperatura |
| $>0$ | $>0$ | spontanea ad alta temperatura |
| $>0$ | $<0$ | mai spontanea |

Nei due casi intermedi esiste una temperatura di inversione, $T=\Delta H/\Delta S$, alla quale $\Delta G$ si annulla. Supponendo che $\Delta H$ e $\Delta S$ varino poco con la temperatura, la si stima con i dati a $298\un{K}$.

::: esempio Ridurre il ferro con il carbonio
Stimare la temperatura sopra la quale diventa spontanea la reazione $\mathrm{Fe_2O_3(s)}+3\,\mathrm{C(grafite)}\to{}$ $2\,\mathrm{Fe(s)}+3\,\mathrm{CO(g)}$, con le entropie standard $87{,}40$, $5{,}74$, $27{,}28$ e $197{,}7\un{J/(mol\,K)}$ rispettivamente per $\mathrm{Fe_2O_3}$, grafite, ferro e $\mathrm{CO}$.

L'entalpia di reazione è $\Delta H^\circ=3\times(-110{,}5)-(-824{,}2)$, cioè $+492{,}7\un{kJ}$. L'entropia di reazione è
$$\Delta S^\circ=2\times27{,}28+3\times197{,}7-87{,}40-3\times5{,}74\simeq+543{,}0\un{J/K},$$
positiva soprattutto per la formazione di tre moli di gas. La temperatura di inversione è
$$T=\frac{492{,}7\times10^3\un{J}}{543{,}0\un{J/K}}\simeq907\un{K},$$
circa $634\,^\circ\mathrm{C}$. A temperatura ambiente $\Delta G^\circ\simeq+331\un{kJ}$ e il minerale resta stabile per sempre a contatto con il carbone; ad alta temperatura il termine entropico prevale. Negli altiforni, dove si superano largamente i $1000\,^\circ\mathrm{C}$, il ferro si ottiene proprio così, anche se il riducente principale è il monossido di carbonio che si forma dal coke.
:::

::: figura gibbs
{"w":640,"h":290,"items":[{"t":"line","p":[80,150,620,150],"c":"ax","w":1.4},{"t":"arrow","p":[80,280,80,15],"c":"ax","w":1.6,"head":9},{"t":"text","p":[88,22],"s":"ΔG° (kJ)","c":"ax","size":14,"a":"start"},{"t":"text","p":[618,172],"s":"T (K)","c":"ax","size":14,"a":"end"},{"t":"line","p":[206.0,146,206.0,154],"c":"ax"},{"t":"text","p":[206.0,170],"s":"300","c":"muted","size":12},{"t":"line","p":[332.0,146,332.0,154],"c":"ax"},{"t":"text","p":[332.0,170],"s":"600","c":"muted","size":12},{"t":"line","p":[458.0,146,458.0,154],"c":"ax"},{"t":"text","p":[458.0,170],"s":"900","c":"muted","size":12},{"t":"line","p":[76,234.0,80,234.0],"c":"ax"},{"t":"text","p":[72,238.0],"s":"−200","c":"muted","size":12,"a":"end"},{"t":"line","p":[76,66.0,80,66.0],"c":"ax"},{"t":"text","p":[72,70.0],"s":"200","c":"muted","size":12,"a":"end"},{"t":"plot","o":[80,150],"sx":0.42,"sy":0.42,"pts":[[420,264.6],[1250,-186.1]],"c":"force4","w":2.6},{"t":"circle","p":[461.1,150,5],"c":"force"},{"t":"text","p":[467.1,138],"s":"907 K","c":"force","size":13,"a":"start"},{"t":"text","p":[96.8,100],"s":"non spontanea","c":"muted","size":12,"a":"start"},{"t":"text","p":[500.0,220],"s":"spontanea","c":"muted","size":12,"a":"start"}]}
---
L'energia di Gibbs standard della riduzione dell'ossido di ferro(III) con il carbonio, in funzione della temperatura, nell'approssimazione di $\Delta H^\circ$ e $\Delta S^\circ$ costanti. La retta ha pendenza $-\Delta S^\circ$ e attraversa lo zero a circa $907\un{K}$.
:::

Lo stesso ragionamento si applica ai cambiamenti di stato, che a pressione standard avvengono proprio alla temperatura in cui $\Delta G^\circ=0$. Per il bromo, con i dati a $298\un{K}$, la vaporizzazione ha $\Delta H^\circ=30{,}91\un{kJ/mol}$ e $\Delta S^\circ=245{,}5-152{,}2=93{,}3\un{J/(mol\,K)}$; il rapporto dà $331\un{K}$, cioè $58\,^\circ\mathrm{C}$, a meno di un grado dalla temperatura di ebollizione misurata, $58{,}8\,^\circ\mathrm{C}$. Il legame fra $\Delta G^\circ$ e la composizione all'equilibrio sarà sviluppato nel capitolo [Equilibrio chimico](unit:chemistry-19).

## Errori frequenti {#errori}

::: errore Calore e temperatura
La temperatura misura lo stato di agitazione termica delle particelle; il calore è energia trasferita a causa di una differenza di temperatura. Un litro d'acqua e una tazzina, entrambi a $80\,^\circ\mathrm{C}$, hanno la stessa temperatura, ma il litro, raffreddandosi fino all'ambiente, cede molto più calore. Confondere le due grandezze porta a pensare che il corpo più caldo contenga sempre più «calore», cosa priva di senso.
:::

::: errore Il segno nel calorimetro
Nel calorimetro la temperatura misurata è quella della soluzione, che fa parte dell'ambiente della reazione. Se l'acqua si scalda, la reazione ha ceduto calore, e $q_\mathrm{reaz}$ è negativo. Dimenticare il segno meno in $q_\mathrm{reaz}=-C\,\Delta T$ trasforma una reazione esotermica in una endotermica.
:::

::: errore Lo stato fisico dimenticato
Le entalpie di formazione di $\mathrm{H_2O(l)}$ e $\mathrm{H_2O(g)}$ differiscono di $44\un{kJ/mol}$. In una combustione che produce quattro moli d'acqua, scegliere la tabella sbagliata sposta il risultato di $176\un{kJ}$. Ogni equazione termochimica va scritta con lo stato fisico di ciascuna specie, e i dati vanno presi per quello stato.
:::

::: errore Gli elementi a entalpia zero
L'entalpia standard di formazione è nulla soltanto per gli elementi nella loro forma di riferimento. Vale zero per $\mathrm{O_2(g)}$ e per la grafite; è diversa da zero per $\mathrm{O(g)}$, $\mathrm{O_3(g)}$, il diamante e il carbonio gassoso. Gli atomi gassosi hanno entalpie di formazione grandi e positive, ed è proprio da esse che si ricavano le entalpie di legame.
:::

::: errore Bomba e tazza
La bomba calorimetrica lavora a volume costante e misura $\Delta U$; il calorimetro a tazza lavora a pressione costante e misura $\Delta H$. Per le reazioni in cui il numero di moli gassose cambia, i due valori differiscono di $\Delta n_\mathrm{gas}RT$, circa $2{,}5\un{kJ}$ per mole di gas a temperatura ambiente. La correzione è piccola, ma nelle misure di precisione non si può omettere.
:::

::: errore Esotermico significa spontaneo
Molte reazioni spontanee sono esotermiche, e molte reazioni esotermiche sono spontanee; le due proprietà però non coincidono. Il nitrato di ammonio si scioglie spontaneamente assorbendo calore, e una miscela di idrogeno e ossigeno resta indefinitamente inalterata a temperatura ambiente, anche se la sua reazione libera molta energia. La direzione di una trasformazione dipende dal segno di $\Delta G$; la sua velocità, come si vedrà nel capitolo sulla cinetica, da una barriera energetica che le grandezze termodinamiche non descrivono.
:::

## Sintesi {#sintesi}

::: sintesi Che cosa portare con sé
- Il sistema scambia energia con l'ambiente come calore $q$ e come lavoro $w$; per entrambi è positivo ciò che entra nel sistema.
- Il calore che varia la temperatura di un corpo vale $q=mc\,\Delta T$; l'acqua ha calore specifico $4{,}18\un{J/(g\,K)}$, i metalli molto minore.
- Il lavoro di espansione contro una pressione costante è $w=-P_\mathrm{est}\Delta V$; per una reazione che produce gas, $w=-\Delta n_\mathrm{gas}RT$.
- Primo principio: $\Delta U=q+w$. L'energia interna e l'entalpia $H=U+PV$ sono funzioni di stato; a pressione costante $\Delta H=q_P$, e $\Delta H=\Delta U+\Delta n_\mathrm{gas}RT$.
- Il calorimetro a tazza misura $\Delta H$, la bomba calorimetrica misura $\Delta U$; entrambi si basano sulla conservazione dell'energia e su una capacità termica nota.
- Per la legge di Hess le entalpie di reazione si sommano come le equazioni; con le entalpie standard di formazione l'entalpia di reazione è la somma $\sum\nu\Delta_\mathrm{f}H^\circ$ dei prodotti meno quella dei reagenti.
- Le entalpie medie di legame danno stime approssimate delle entalpie di reazione in fase gassosa.
- La spontaneità dipende da $\Delta G=\Delta H-T\Delta S$: un processo endotermico può essere spontaneo se l'aumento di entropia è abbastanza grande.
:::

## Glossario {#glossario}

- **Sistema**: porzione dell'universo che si studia; può essere aperto, chiuso o isolato.
- **Ambiente**: tutto ciò che sta fuori dal sistema e scambia energia con esso.
- **Energia interna** ($U$): somma delle energie cinetiche e potenziali delle particelle del sistema.
- **Funzione di stato**: grandezza il cui valore dipende soltanto dallo stato del sistema; ne sono esempi $U$, $H$, $S$ e $G$.
- **Calore** ($q$): energia trasferita a causa di una differenza di temperatura.
- **Lavoro** ($w$): energia trasferita da una forza che sposta il suo punto di applicazione; nelle reazioni è spesso lavoro di espansione, $-P_\mathrm{est}\Delta V$.
- **Capacità termica** ($C$): calore necessario per innalzare di un kelvin la temperatura di un corpo.
- **Calore specifico** ($c$): capacità termica per unità di massa.
- **Primo principio della termodinamica**: $\Delta U=q+w$; l'energia di un sistema isolato si conserva.
- **Entalpia** ($H$): funzione di stato $U+PV$; la sua variazione è il calore scambiato a pressione costante.
- **Reazione esotermica**: reazione con $\Delta H<0$, che cede calore all'ambiente.
- **Reazione endotermica**: reazione con $\Delta H>0$, che assorbe calore dall'ambiente.
- **Equazione termochimica**: equazione bilanciata con stati fisici e valore di $\Delta H$.
- **Calorimetro**: strumento che misura il calore attraverso una variazione di temperatura.
- **Bomba calorimetrica**: calorimetro a volume costante per le combustioni, che misura $\Delta U$.
- **Legge di Hess**: l'entalpia di una reazione somma di altre reazioni è la somma delle loro entalpie.
- **Stato standard**: sostanza pura a $1\un{bar}$, o soluto a $1\un{mol/kg}$ in condizioni ideali, alla temperatura indicata.
- **Entalpia standard di formazione** ($\Delta_\mathrm{f}H^\circ$): entalpia della reazione che forma una mole di composto dagli elementi nelle forme di riferimento, negli stati standard.
- **Entalpia di legame** ($D$): entalpia necessaria per rompere una mole di un legame in fase gassosa.
- **Potere calorifico**: energia liberata dalla combustione completa dell'unità di massa di un combustibile.
- **Entropia** ($S$): grandezza di stato legata al numero di configurazioni microscopiche compatibili con lo stato del sistema.
- **Energia di Gibbs** ($G$): funzione di stato $H-TS$; a temperatura e pressione costanti un processo è spontaneo se $\Delta G<0$.

## Esercizi {#esercizi}

Dati utili: calore specifico dell'acqua $4{,}18\un{J/(g\,K)}$; $R=8{,}314\un{J\,mol^{-1}\,K^{-1}}$; $1\un{kcal}=4{,}184\un{kJ}$. Le entalpie di formazione, le entropie e le capacità termiche necessarie si trovano nel testo; per $\mathrm{C_4H_{10}(g)}$ si usi $\Delta_\mathrm{f}H^\circ=-125{,}6\un{kJ/mol}$.

::: esercizio L'acqua del tè [base]
Quanto calore serve per scaldare $250\un{g}$ d'acqua da $18{,}0$ a $95{,}0\,^\circ\mathrm{C}$?
>>> soluzione
$q=m\,c\,\Delta T=250\times4{,}18\times77{,}0\un{J}$, cioè circa $80{,}5\un{kJ}$.
:::

::: esercizio Un metallo da identificare [base]
Un campione metallico di $120{,}0\un{g}$ assorbe $2{,}16\un{kJ}$ scaldandosi da $20{,}0$ a $40{,}0\,^\circ\mathrm{C}$. Calcolarne il calore specifico, stimarne la massa molare con la legge di Dulong e Petit e proporre di quale metallo si tratti.
>>> soluzione
$c=2160/(120{,}0\times20{,}0)$, cioè $0{,}900\un{J/(g\,K)}$. Con $C_m\simeq25\un{J/(mol\,K)}$, $M\simeq25/0{,}900\simeq28\un{g/mol}$: il valore è compatibile con l'alluminio, $27{,}0\un{g/mol}$, il cui calore specifico è $0{,}897\un{J/(g\,K)}$.
:::

::: esercizio Segni di calore e lavoro [base]
Indicare il segno di $q$ e di $w$ per il sistema nei casi seguenti: (a) un gas viene compresso da un pistone e intanto si raffredda; (b) una candela brucia all'aria; (c) un cubetto di ghiaccio fonde in una bibita, considerando sistema il ghiaccio.
>>> soluzione
(a) Il lavoro è compiuto sul gas, $w>0$; il gas cede calore, $q<0$. (b) La combustione cede calore all'ambiente, $q<0$; i gas prodotti, più numerosi dell'ossigeno consumato e molto caldi, spingono l'aria, $w<0$. (c) Il ghiaccio assorbe calore dalla bibita, $q>0$; fondendo si contrae leggermente e l'atmosfera compie su di esso un lavoro piccolissimo, $w>0$, trascurabile.
:::

::: esercizio Usare un'equazione termochimica [base]
Dalla combustione del metano con $\Delta H=-890{,}3\un{kJ}$ per mole, calcolare il calore liberato da $2{,}50\un{mol}$ di metano e da $1{,}00\un{g}$, e scrivere $\Delta H$ per la reazione inversa.
>>> soluzione
$2{,}50\times(-890{,}3)\simeq-2226\un{kJ}$, cioè $2226\un{kJ}$ liberati. Un grammo corrisponde a $1/16{,}04\un{mol}$ e libera $55{,}5\un{kJ}$. Per la reazione inversa $\Delta H=+890{,}3\un{kJ}$.
:::

::: esercizio Lavoro di espansione [base]
Un gas si espande da $2{,}00$ a $7{,}00\un{L}$ contro una pressione esterna costante di $1{,}00\un{bar}$. Calcolare il lavoro in joule.
>>> soluzione
$w=-P_\mathrm{est}\Delta V=-1{,}00\un{bar}\times5{,}00\un{L}$, cioè $-5{,}00\un{L\,bar}=-500\un{J}$.
:::

::: esercizio Il primo principio [base]
Un sistema cede all'ambiente $120\un{J}$ di calore mentre l'ambiente compie su di esso un lavoro di $50\un{J}$. Calcolare $\Delta U$.
>>> soluzione
$q=-120\un{J}$, $w=+50\un{J}$, quindi $\Delta U=-70\un{J}$.
:::

::: esercizio Dall'acqua liquida al vapore [base]
Sapendo che $\mathrm{H_2(g)}+\tfrac12\,\mathrm{O_2(g)}\to\mathrm{H_2O(l)}$ ha $\Delta H^\circ=-285{,}8\un{kJ}$ e che $\mathrm{H_2O(l)}\to\mathrm{H_2O(g)}$ ha $\Delta H^\circ=+44{,}0\un{kJ}$, calcolare l'entalpia standard di formazione del vapore acqueo.
>>> soluzione
Sommando le due equazioni si ottiene $\mathrm{H_2(g)}+\tfrac12\,\mathrm{O_2(g)}\to\mathrm{H_2O(g)}$, con $\Delta H^\circ=-285{,}8+44{,}0=-241{,}8\un{kJ}$.
:::

::: esercizio Scrivere una reazione di formazione [base]
Scrivere l'equazione alla quale si riferisce l'entalpia standard di formazione del metanolo liquido, $-238{,}7\un{kJ/mol}$.
>>> soluzione
$\mathrm{C(grafite)}+2\,\mathrm{H_2(g)}+\tfrac12\,\mathrm{O_2(g)}\to{}$ $\mathrm{CH_3OH(l)}$, $\Delta_\mathrm{f}H^\circ=-238{,}7\un{kJ/mol}$. Il coefficiente frazionario dell'ossigeno è necessario perché si forma una sola mole di prodotto.
:::

::: esercizio Rame nell'acqua [medio]
Un pezzo di rame di $75{,}0\un{g}$ a $100{,}0\,^\circ\mathrm{C}$ viene immerso in $150{,}0\un{g}$ d'acqua a $22{,}0\,^\circ\mathrm{C}$, in un recipiente isolato di capacità termica trascurabile. Calcolare la temperatura finale, con $c(\mathrm{Cu})=0{,}384\un{J/(g\,K)}$.
>>> soluzione
$75{,}0\times0{,}384\times(100{,}0-T)$ $=150{,}0\times4{,}18\times(T-22{,}0)$, cioè $28{,}8\,(100{,}0-T)=627\,(T-22{,}0)$, da cui $T\simeq25{,}4\,^\circ\mathrm{C}$.
:::

::: esercizio La costante del calorimetro [medio]
In un calorimetro contenente $50{,}0\un{g}$ d'acqua a $20{,}0\,^\circ\mathrm{C}$ si versano $50{,}0\un{g}$ d'acqua a $60{,}0\,^\circ\mathrm{C}$. La temperatura finale è $39{,}2\,^\circ\mathrm{C}$. Calcolare la capacità termica del calorimetro.
>>> soluzione
L'acqua calda cede $50{,}0\times4{,}18\times20{,}8\simeq4347\un{J}$; l'acqua fredda acquista $50{,}0\times4{,}18\times19{,}2\simeq4013\un{J}$. La differenza, $334\un{J}$, è assorbita dal calorimetro, che si scalda di $19{,}2\un{K}$: $C_\mathrm{cal}\simeq334/19{,}2\simeq17{,}4\un{J/K}$.
:::

::: esercizio Un impacco caldo [medio]
Si sciolgono $5{,}00\un{g}$ di cloruro di calcio, $\Delta_\mathrm{sol}H=-81{,}4\un{kJ/mol}$, in $100{,}0\un{g}$ d'acqua a $20{,}0\,^\circ\mathrm{C}$. Stimare la temperatura finale, supponendo per la soluzione un calore specifico di $4{,}18\un{J/(g\,K)}$ e trascurando le perdite.
>>> soluzione
Le moli sono $5{,}00/110{,}98\simeq0{,}0451\un{mol}$, e il calore liberato $0{,}0451\times81{,}4\simeq3{,}67\un{kJ}$. Sulla massa di $105{,}0\un{g}$, $\Delta T\simeq3670/(105{,}0\times4{,}18)\simeq8{,}4\un{K}$: la temperatura finale è circa $28{,}4\,^\circ\mathrm{C}$.
:::

::: esercizio Metanolo, ΔH e ΔU [medio]
La combustione del metanolo liquido, $\mathrm{CH_3OH(l)}+\tfrac32\,\mathrm{O_2(g)}\to{}$ $\mathrm{CO_2(g)}+2\,\mathrm{H_2O(l)}$, ha $\Delta_\mathrm{c}H^\circ=-726{,}4\un{kJ/mol}$. Calcolare $\Delta_\mathrm{c}U^\circ$ a $298\un{K}$.
>>> soluzione
$\Delta n_\mathrm{gas}=1-1{,}5=-0{,}5$. Quindi $\Delta U=\Delta H-\Delta n_\mathrm{gas}RT$, cioè $-726{,}4+0{,}5\times2{,}479\simeq-725{,}2\un{kJ/mol}$.
:::

::: esercizio Idrogenare l'acetilene [medio]
Calcolare l'entalpia standard della reazione $\mathrm{C_2H_2(g)}+2\,\mathrm{H_2(g)}\to\mathrm{C_2H_6(g)}$, sapendo che $\Delta_\mathrm{f}H^\circ(\mathrm{C_2H_6})=-84{,}68\un{kJ/mol}$.
>>> soluzione
$\Delta_\mathrm{r}H^\circ=-84{,}68-226{,}7$, cioè circa $-311{,}4\un{kJ}$. L'acetilene, con entalpia di formazione positiva, è un composto ricco di energia, e la sua idrogenazione è fortemente esotermica.
:::

::: esercizio Lo scaldamani [medio]
Quanto calore liberano $25{,}0\un{g}$ di ferro che si ossidano completamente a $\mathrm{Fe_2O_3}$?
>>> soluzione
La reazione $4\,\mathrm{Fe}+3\,\mathrm{O_2}\to2\,\mathrm{Fe_2O_3}$ ha $\Delta H=2\times(-824{,}2)=-1648{,}4\un{kJ}$ per $4\un{mol}$ di ferro. Le moli di ferro sono $25{,}0/55{,}845\simeq0{,}448\un{mol}$, e il calore liberato è $0{,}448\times1648{,}4/4\simeq184\un{kJ}$.
:::

::: esercizio Sciogliere l'idrossido di sodio [medio]
Sciogliendo $4{,}00\un{g}$ di $\mathrm{NaOH}$ in $96{,}0\un{g}$ d'acqua, in un calorimetro a tazza, la temperatura sale di $10{,}6\un{K}$. Calcolare l'entalpia molare di soluzione, trascurando la capacità termica del calorimetro e assumendo per la soluzione $c=4{,}18\un{J/(g\,K)}$.
>>> soluzione
$q_\mathrm{sol}=-100{,}0\times4{,}18\times10{,}6\un{J}\simeq-4{,}43\un{kJ}$. Le moli sono $4{,}00/40{,}00=0{,}100\un{mol}$, quindi $\Delta_\mathrm{sol}H\simeq-44{,}3\un{kJ/mol}$, in buon accordo con il valore che si ricava dalle tabelle, $-44{,}5\un{kJ/mol}$.
:::

::: esercizio Raffreddarsi sudando [medio]
Quanta acqua deve evaporare dalla pelle, a $25\,^\circ\mathrm{C}$, per dissipare $600\un{kJ}$ di calore?
>>> soluzione
$600/44{,}0\simeq13{,}6\un{mol}$, cioè circa $13{,}6\times18{,}02\simeq246\un{g}$ d'acqua.
:::

::: esercizio La combustione del butano [medio]
Calcolare l'entalpia standard di combustione del butano gassoso, $\mathrm{C_4H_{10}(g)}+\tfrac{13}{2}\,\mathrm{O_2(g)}\to{}$ $4\,\mathrm{CO_2(g)}+5\,\mathrm{H_2O(l)}$, per mole e per grammo.
>>> soluzione
Si sommano $4\times(-393{,}5)$ per l'anidride carbonica e $5\times(-285{,}8)$ per l'acqua, e si sottrae $-125{,}6$ per il butano; il risultato è $\Delta_\mathrm{c}H^\circ=-2877{,}4\un{kJ/mol}$. Con $M=58{,}12\un{g/mol}$ si ottengono $49{,}5\un{kJ/g}$.
:::

::: esercizio La bomba e il metanolo [avanzato]
Una bomba calorimetrica si scalda di $2{,}520\un{K}$ quando vi si bruciano $1{,}000\un{g}$ di acido benzoico, che libera $26{,}434\un{kJ/g}$. Bruciando $1{,}200\un{g}$ di metanolo nello stesso calorimetro la temperatura sale di $2{,}589\un{K}$. Calcolare $\Delta_\mathrm{c}U$ e $\Delta_\mathrm{c}H$ del metanolo per mole.
>>> soluzione
$C=26{,}434/2{,}520\simeq10{,}49\un{kJ/K}$. Il metanolo libera $10{,}49\times2{,}589\simeq27{,}16\un{kJ}$, cioè $22{,}63\un{kJ/g}$, e con $M=32{,}04\un{g/mol}$, $\Delta_\mathrm{c}U\simeq-725{,}2\un{kJ/mol}$. Con $\Delta n_\mathrm{gas}=-0{,}5$, $\Delta_\mathrm{c}H\simeq-725{,}2-1{,}2\simeq-726{,}4\un{kJ/mol}$.
:::

::: esercizio Uno spuntino [avanzato]
Una barretta di $30\un{g}$ contiene $18\un{g}$ di carboidrati, $4\un{g}$ di proteine e $6\un{g}$ di grassi. Calcolare il valore energetico da dichiarare in etichetta in kilojoule e in kilocalorie con i fattori europei.
>>> soluzione
In kilojoule: $18\times17+4\times17+6\times37$, cioè $306+68+222=596\un{kJ}$. In kilocalorie, con i fattori $4$, $4$ e $9\un{kcal/g}$: $72+16+54=142\un{kcal}$, coerente con $596/4{,}184\simeq142$.
:::

::: esercizio Il limite delle entalpie di legame [avanzato]
Con le entalpie medie di legame $D(\mathrm{C{-}H})=415{,}9\un{kJ/mol}$ e $D(\mathrm{C{-}C})=330{,}8\un{kJ/mol}$, e con le entalpie di formazione degli atomi gassosi $\mathrm{C(g)}$, $716{,}7\un{kJ/mol}$, e $\mathrm{H(g)}$, $218{,}0\un{kJ/mol}$, stimare l'entalpia standard di formazione del butano gassoso e confrontarla con il valore misurato.
>>> soluzione
Il butano ha tre legami $\mathrm{C{-}C}$ e dieci $\mathrm{C{-}H}$, con un'entalpia di atomizzazione stimata di $3\times330{,}8+10\times415{,}9\simeq5151\un{kJ/mol}$. Gli atomi hanno entalpia $4\times716{,}7+10\times218{,}0=5046{,}8\un{kJ/mol}$, e quindi $\Delta_\mathrm{f}H^\circ\simeq5046{,}8-5151\simeq-104\un{kJ/mol}$, contro $-125{,}6$ misurati. L'errore, circa $21\un{kJ/mol}$, è più grande che per il propano, perché i legami $\mathrm{C{-}H}$ dei gruppi interni della catena differiscono da quelli del metano.
:::

::: esercizio Il lievito nel forno [avanzato]
L'idrogenocarbonato di sodio si decompone secondo $2\,\mathrm{NaHCO_3(s)}\to{}$ $\mathrm{Na_2CO_3(s)}+\mathrm{H_2O(g)}+\mathrm{CO_2(g)}$. Con $\Delta_\mathrm{f}H^\circ$ di $-950{,}8$, $-1131$, $-241{,}8$ e $-393{,}5\un{kJ/mol}$ ed entropie standard di $101{,}7$, $135{,}0$, $188{,}8$ e $213{,}7\un{J/(mol\,K)}$, nell'ordine, stimare la temperatura sopra la quale la reazione diventa spontanea in condizioni standard.
>>> soluzione
I prodotti hanno entalpia $-1131-241{,}8-393{,}5=-1766{,}3\un{kJ}$, i reagenti $2\times(-950{,}8)=-1901{,}6\un{kJ}$, quindi $\Delta H^\circ=+135{,}3\un{kJ}$. Le entropie dei prodotti sommano $537{,}5\un{J/K}$, quelle dei reagenti $203{,}4\un{J/K}$, e $\Delta S^\circ=+334{,}1\un{J/K}$. La temperatura di inversione è $135\,300/334{,}1\simeq405\un{K}$, circa $132\,^\circ\mathrm{C}$: la reazione diventa favorevole alle temperature di un forno da cucina, e il gas prodotto fa lievitare l'impasto.
:::

::: esercizio La temperatura di ebollizione del metanolo [avanzato]
Con le entalpie di formazione del metanolo liquido, $-238{,}7\un{kJ/mol}$, e gassoso, $-200{,}7\un{kJ/mol}$, e con le entropie standard $126{,}8$ e $239{,}8\un{J/(mol\,K)}$, stimare la temperatura di ebollizione normale del metanolo e confrontarla con il valore misurato di $64{,}7\,^\circ\mathrm{C}$.
>>> soluzione
$\Delta_\mathrm{vap}H^\circ=38{,}0\un{kJ/mol}$, $\Delta_\mathrm{vap}S^\circ=113{,}0\un{J/(mol\,K)}$; $T\simeq38\,000/113{,}0\simeq336\un{K}$, circa $63\,^\circ\mathrm{C}$. La stima è buona entro un paio di gradi, nonostante l'ipotesi di $\Delta H$ e $\Delta S$ costanti.
:::

::: esercizio L'entalpia di vaporizzazione a 100 °C [avanzato]
L'entalpia di vaporizzazione dell'acqua vale $44{,}0\un{kJ/mol}$ a $25\,^\circ\mathrm{C}$. Con le capacità termiche molari di $75{,}3\un{J/(mol\,K)}$ per il liquido e $33{,}6\un{J/(mol\,K)}$ per il vapore, stimare il suo valore a $100\,^\circ\mathrm{C}$ con la legge di Kirchhoff e confrontarlo con il valore misurato, $40{,}7\un{kJ/mol}$.
>>> soluzione
$\Delta C_P=33{,}6-75{,}3=-41{,}7\un{J/K}$. In $75\un{K}$ l'entalpia cambia di $-41{,}7\times75\un{J}\simeq-3{,}1\un{kJ}$, e la stima vale $44{,}0-3{,}1\simeq40{,}9\un{kJ/mol}$, a meno dell'$1\%$ dal valore misurato.
:::

::: esercizio La caldaia a condensazione [avanzato]
Che frazione dell'energia di combustione del metano si perde se l'acqua prodotta esce dal camino come vapore invece che liquida? Usare i valori $890{,}3$ e $802{,}3\un{kJ/mol}$.
>>> soluzione
La differenza è $88{,}0\un{kJ/mol}$, cioè $88{,}0/890{,}3\simeq9{,}9\%$ dell'energia totale. È il margine che una caldaia a condensazione può recuperare, in pratica soltanto in parte.
:::

::: esercizio Una doccia a metano [avanzato]
Una doccia consuma $40{,}0\un{L}$ d'acqua scaldata da $15$ a $40\,^\circ\mathrm{C}$. Supponendo che tutta l'energia della combustione passi all'acqua e che il vapore prodotto esca dal camino senza condensare, calcolare la massa di metano bruciata e quella di anidride carbonica emessa.
>>> soluzione
Il calore necessario è $40\,000\times4{,}18\times25\un{J}\simeq4180\un{kJ}$. Con $802{,}3\un{kJ/mol}$ servono $5{,}21\un{mol}$ di metano, cioè circa $83{,}6\un{g}$, che producono $5{,}21\un{mol}$ di $\mathrm{CO_2}$, circa $229\un{g}$. Con una caldaia a condensazione ideale, che recupera anche il calore del vapore, basterebbero circa $75\un{g}$ di metano.
:::

::: esercizio Il limite dell'impacco freddo [avanzato]
Per lo scioglimento del nitrato di ammonio $\Delta H^\circ=+25{,}7\un{kJ/mol}$ e $\Delta S^\circ=+108{,}7\un{J/(mol\,K)}$. Supponendo costanti questi valori, sotto quale temperatura lo scioglimento non sarebbe più spontaneo in condizioni standard? Perché il risultato è soltanto indicativo?
>>> soluzione
$\Delta G^\circ=0$ per $T=25\,700/108{,}7\simeq236\un{K}$, circa $-37\,^\circ\mathrm{C}$. Il risultato è indicativo perché $\Delta H$ e $\Delta S$ dipendono dalla temperatura, perché le condizioni standard si riferiscono a una soluzione ideale di concentrazione unitaria e perché a quella temperatura l'acqua pura sarebbe ghiaccio.
:::

## Fonti {#fonti}

Il testo, le figure, gli esempi e gli esercizi di questo capitolo sono originali. Per la scelta e l'ordine degli argomenti il riferimento principale è il manuale di R. H. Petrucci, F. G. Herring, J. D. Madura e C. Bissonnette, *General Chemistry: Principles and Modern Applications*, 11ª edizione, Pearson Canada, Toronto, 2017, paragrafi 7-1–7-10 per la termochimica e 13-1–13-4 per entropia ed energia di Gibbs. I dati numerici provengono dalle fonti seguenti.

1. Entalpie standard di formazione, entropie molari standard e capacità termiche molari a $298{,}15\un{K}$: tabella D.2 dell'appendice dello stesso manuale, che riprende le raccolte NBS di D. D. Wagman e collaboratori, *Journal of Physical and Chemical Reference Data* 11 (1982), supplemento 2.
2. NIST Chemistry WebBook, banca dati di riferimento standard 69: entalpia di combustione dell'ottano liquido.
3. NIST, *Certificate of Analysis, Standard Reference Material 39j, Benzoic Acid (Calorimetric Standard)*: energia di combustione certificata dell'acido benzoico.
4. Regolamento (UE) n. 1169/2011, allegato XIV: fattori di conversione per il calcolo del valore energetico degli alimenti.
5. Entalpie di fusione e di vaporizzazione dell'acqua e calori specifici di ghiaccio, acqua e vapore dalle tabelle correnti di proprietà dell'acqua; temperature di ebollizione normali di bromo e metanolo dalle stesse raccolte.
6. P. J. Mohr, D. B. Newell, B. N. Taylor, E. Tiesinga, *CODATA Recommended Values of the Fundamental Physical Constants: 2022*: costante dei gas. CIAAW, pesi atomici standard.
7. Per la storia, A. Lavoisier e P.-S. Laplace, *Mémoire sur la chaleur* (1783); P. L. Dulong e A. T. Petit (1819); G. H. Hess (1840); J. P. Joule, *On the Mechanical Equivalent of Heat*, Philosophical Transactions of the Royal Society 140 (1850) 61; R. Clausius (1865); M. Berthelot e la bomba calorimetrica (1881); L. Boltzmann (1877); J. W. Gibbs (1876–1878).
