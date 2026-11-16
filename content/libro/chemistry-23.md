---
unit: chemistry-23
titolo: Ossidazione, riduzione ed elettrochimica
sottotitolo: Reazioni redox, numeri di ossidazione, bilanciamento, celle galvaniche, potenziali standard, energia di Gibbs, equazione di Nernst, pile, corrosione ed elettrolisi
volume: Volume di chimica
fonte: Testo originale; riferimento principale Petrucci et al., General Chemistry, 11ª ed., §5-4–5-6 e 19-1–19-8
---

## Prima di cominciare {#apertura}

Una lamina di zinco immersa in una soluzione azzurra di solfato di rame si ricopre in pochi minuti di uno strato rossiccio di rame metallico, mentre la soluzione perde lentamente il suo colore. Lo zinco si scioglie, gli ioni rame si depositano: fra i due avviene uno scambio di elettroni. Se invece lo zinco e il rame stanno in due recipienti separati, ciascuno nella soluzione del proprio ione, collegati da un filo metallico e da un tubo pieno di una soluzione salina, lungo il filo scorre una corrente elettrica. È la pila che il chimico inglese John Frederic Daniell costruì nel 1836: la stessa reazione, trasformata in energia elettrica.

Le reazioni in cui si trasferiscono elettroni, dette di **ossidoriduzione** o **redox**, sono fra le più importanti della chimica. Comprendono la combustione e la respirazione, la ruggine e la fotosintesi, l'estrazione dei metalli dai minerali e il funzionamento di ogni batteria. Questo capitolo introduce i numeri di ossidazione e il metodo per bilanciare le equazioni redox, descrive le celle galvaniche e i potenziali standard di riduzione, collega la tensione di una pila all'energia di Gibbs e alla costante di equilibrio, e mostra con l'equazione di Nernst come la tensione dipende dalle concentrazioni. Le ultime parti trattano le pile e gli accumulatori, la corrosione e l'elettrolisi, il processo inverso in cui la corrente elettrica costringe una reazione non spontanea ad avvenire.

::: obiettivi
- riconoscere ossidazione e riduzione, ossidante e riducente in una reazione;
- assegnare i numeri di ossidazione;
- bilanciare le equazioni redox con il metodo delle semireazioni, in ambiente acido e basico;
- descrivere una cella galvanica e scriverne la notazione;
- usare i potenziali standard per calcolare la tensione di una pila e prevedere le reazioni spontanee;
- collegare tensione standard, energia di Gibbs e costante di equilibrio;
- calcolare la tensione in condizioni non standard con l'equazione di Nernst;
- descrivere pile, accumulatori, celle a combustibile e corrosione;
- calcolare le quantità prodotte in un'elettrolisi con le leggi di Faraday.
:::

Il capitolo usa le reazioni in soluzione del capitolo [Soluzioni e concentrazione](unit:chemistry-12), la stechiometria del capitolo [Stechiometria e reagente limitante](unit:chemistry-14), l'energia di Gibbs e la costante di equilibrio dei capitoli [Termochimica e calorimetria](unit:chemistry-16) ed [Equilibrio chimico](unit:chemistry-19). Le grandezze elettriche, carica, differenza di potenziale ed energia, sono quelle dei capitoli di fisica [Potenziale ed energia elettrica](unit:physics-22) e [Circuiti e legge di Ohm](unit:physics-23). La costante di Faraday, la carica di una mole di elettroni, vale $F=96\,485\un{C/mol}$.

## Ossidazione e riduzione {#redox}

Nella reazione fra lo zinco e gli ioni rame,

$$\mathrm{Zn(s)}+\mathrm{Cu^{2+}(aq)}\longrightarrow\mathrm{Zn^{2+}(aq)}+\mathrm{Cu(s)},$$

ogni atomo di zinco perde due elettroni e diventa ione, ogni ione rame ne acquista due e diventa atomo. La reazione si separa in due **semireazioni**, che descrivono separatamente la perdita e l'acquisto:

$$\mathrm{Zn}\longrightarrow\mathrm{Zn^{2+}}+2\,\mathrm e^-,\qquad\mathrm{Cu^{2+}}+2\,\mathrm e^-\longrightarrow\mathrm{Cu}.$$

::: definizione Ossidazione e riduzione
L'**ossidazione** è la perdita di elettroni da parte di una specie; la **riduzione** è l'acquisto di elettroni. Le due avvengono sempre insieme, perché gli elettroni ceduti da una specie devono essere accettati da un'altra. La specie che si riduce, sottraendo elettroni all'altra, è l'**ossidante**; la specie che si ossida, cedendo elettroni, è il **riducente**.
:::

Nella reazione dell'esempio lo zinco è il riducente e si ossida; lo ione rame è l'ossidante e si riduce. I nomi hanno un'origine storica: «ossidazione» indicava in origine la combinazione con l'ossigeno, come nella formazione della ruggine o nella combustione, e «riduzione» l'estrazione del metallo dal suo ossido, che riduceva la massa del minerale. Le due parole si sono poi estese a tutte le reazioni con trasferimento di elettroni, con o senza ossigeno.

## I numeri di ossidazione {#numeri}

Nelle reazioni fra ioni il trasferimento di elettroni è evidente. In molte reazioni fra molecole, come la combustione del metano, gli elettroni non passano interamente da un atomo all'altro, e per seguirli si usa una contabilità convenzionale, i **numeri di ossidazione**. Il numero di ossidazione di un atomo è la carica che avrebbe se tutti i suoi legami fossero ionici, cioè se gli elettroni di ogni legame appartenessero interamente all'atomo più elettronegativo.

::: metodo Assegnare i numeri di ossidazione
1. Gli atomi negli elementi hanno numero di ossidazione $0$: $\mathrm{Na}$, $\mathrm{O_2}$, $\mathrm{S_8}$.
2. In uno ione monoatomico il numero di ossidazione è la carica dello ione: $+2$ in $\mathrm{Zn^{2+}}$, $-1$ in $\mathrm{Cl^-}$.
3. Il fluoro ha sempre $-1$. I metalli alcalini hanno $+1$, gli alcalino-terrosi $+2$, l'alluminio $+3$.
4. L'idrogeno ha di solito $+1$, e $-1$ negli idruri dei metalli, come $\mathrm{NaH}$.
5. L'ossigeno ha di solito $-2$; ha $-1$ nei perossidi, come $\mathrm{H_2O_2}$, e valori positivi nei composti con il fluoro.
6. La somma dei numeri di ossidazione è uguale alla carica della specie: zero per una molecola, la carica per uno ione poliatomico.
:::

Con queste regole il cromo nello ione dicromato $\mathrm{Cr_2O_7^{2-}}$ ha numero di ossidazione $+6$, perché $2x+7(-2)=-2$; il manganese nello ione permanganato $\mathrm{MnO_4^-}$ ha $+7$; lo zolfo ha $-2$ in $\mathrm{H_2S}$, $+4$ in $\mathrm{SO_2}$ e $+6$ in $\mathrm{H_2SO_4}$. Il carbonio va da $-4$ nel metano a $+4$ nell'anidride carbonica, passando per $-2$ nel metanolo, $0$ nella formaldeide e $+2$ nell'acido formico: la combustione e il metabolismo ossidano il carbonio lungo questa scala. Il numero di ossidazione può anche essere frazionario, come nella magnetite $\mathrm{Fe_3O_4}$, dove il ferro ha in media $+8/3$: un valore medio fra due atomi con $+3$ e uno con $+2$.

Una reazione è redox se qualche numero di ossidazione cambia. Un aumento indica un'ossidazione, una diminuzione una riduzione. Nella combustione del metano, $\mathrm{CH_4}+2\,\mathrm{O_2}\to\mathrm{CO_2}+2\,\mathrm{H_2O}$, il carbonio passa da $-4$ a $+4$ e si ossida; l'ossigeno passa da $0$ a $-2$ e si riduce. Le reazioni acido-base e di precipitazione dei capitoli precedenti, invece, non cambiano alcun numero di ossidazione.

## Bilanciare le reazioni redox {#bilanciamento}

Molte reazioni redox in soluzione hanno equazioni difficili da bilanciare per tentativi, perché coinvolgono anche l'acqua e gli ioni ossonio o idrossido. Il **metodo delle semireazioni** separa il problema in parti semplici: bilancia la massa e la carica di ciascuna semireazione, poi le combina in modo che gli elettroni ceduti siano uguali a quelli acquistati.

::: metodo Metodo delle semireazioni in ambiente acido
1. Scrivere le due semireazioni, di ossidazione e di riduzione, con le specie principali.
2. In ciascuna, bilanciare gli atomi diversi da ossigeno e idrogeno.
3. Bilanciare l'ossigeno aggiungendo molecole d'acqua, poi l'idrogeno aggiungendo ioni $\mathrm{H^+}$.
4. Bilanciare la carica aggiungendo elettroni dalla parte più positiva.
5. Moltiplicare le semireazioni per i fattori che rendono uguale il numero di elettroni, sommarle e semplificare.
6. Controllare il bilancio di ogni elemento e della carica.
:::

::: esempio Il dicromato e l'alcol
Il vecchio etilometro chimico faceva passare l'aria espirata in una soluzione acida di dicromato di potassio, arancione, che l'alcol trasforma in ioni cromo(III), verdi. Bilanciare la reazione fra $\mathrm{Cr_2O_7^{2-}}$ ed etanolo, che si ossida ad acido acetico.

La semireazione di riduzione, bilanciati cromo, ossigeno, idrogeno e carica, è
$$\mathrm{Cr_2O_7^{2-}}+14\,\mathrm{H^+}+6\,\mathrm e^-\longrightarrow2\,\mathrm{Cr^{3+}}+7\,\mathrm{H_2O}.$$
Quella di ossidazione è
$$\mathrm{C_2H_5OH}+\mathrm{H_2O}\longrightarrow\mathrm{CH_3COOH}+4\,\mathrm{H^+}+4\,\mathrm e^-.$$
Per scambiare dodici elettroni si moltiplica la prima per $2$ e la seconda per $3$. Sommando e semplificando acqua e ioni idrogeno presenti dalle due parti si ottiene
$$2\,\mathrm{Cr_2O_7^{2-}}+3\,\mathrm{C_2H_5OH}+16\,\mathrm{H^+}\longrightarrow4\,\mathrm{Cr^{3+}}+3\,\mathrm{CH_3COOH}+11\,\mathrm{H_2O}.$$
Il controllo: diciassette atomi di ossigeno, trentaquattro di idrogeno e carica $+12$ da ciascuna parte.
:::

In ambiente basico si procede allo stesso modo, e alla fine si neutralizzano gli ioni $\mathrm{H^+}$ aggiungendo a entrambi i membri altrettanti ioni $\mathrm{OH^-}$, che con gli $\mathrm{H^+}$ formano acqua. Per lo ione permanganato che ossida lo ione solfito in soluzione basica, riducendosi a diossido di manganese, si ottiene
$$2\,\mathrm{MnO_4^-}+3\,\mathrm{SO_3^{2-}}+\mathrm{H_2O}\longrightarrow2\,\mathrm{MnO_2}+3\,\mathrm{SO_4^{2-}}+2\,\mathrm{OH^-}.$$

## Ossidanti, riducenti e titolazioni redox {#agenti}

Gli ossidanti comuni sono elementi molto elettronegativi, come l'ossigeno e gli alogeni, e ioni con un atomo in un numero di ossidazione alto, come il permanganato, il dicromato e il nitrato in ambiente acido, o il perossido di idrogeno. I riducenti comuni sono i metalli, specialmente quelli alcalini e alcalino-terrosi, l'idrogeno, il carbonio e il monossido di carbonio, usati nella metallurgia per estrarre i metalli dai loro ossidi. Una stessa specie può ossidarsi e ridursi insieme, in una **disproporzione**: il perossido di idrogeno, in cui l'ossigeno ha numero di ossidazione $-1$, si decompone in acqua, con ossigeno a $-2$, e ossigeno molecolare, a $0$; il cloro in soluzione basica si trasforma in cloruro e ipoclorito, il principio attivo della candeggina.

Come le reazioni acido-base, anche le reazioni redox rapide e complete si usano nelle **titolazioni**. Il permanganato di potassio è un titolante classico, perché in ambiente acido si riduce a ione manganese(II), quasi incolore, e la prima goccia in eccesso colora la soluzione di rosa: fa da indicatore di sé stesso. Con il ferro(II) la reazione è
$$\mathrm{MnO_4^-}+5\,\mathrm{Fe^{2+}}+8\,\mathrm{H^+}\longrightarrow\mathrm{Mn^{2+}}+5\,\mathrm{Fe^{3+}}+4\,\mathrm{H_2O}.$$
Se $20{,}00\un{mL}$ di una soluzione di ferro(II) richiedono $18{,}40\un{mL}$ di permanganato $0{,}0200\un{M}$, le moli di permanganato sono $3{,}68\times10^{-4}$, quelle di ferro cinque volte tanto, $1{,}84\times10^{-3}$, e la concentrazione del ferro(II) è $0{,}0920\un{M}$.

## Le celle galvaniche {#pile}

Quando lo zinco è immerso direttamente nella soluzione di ioni rame, gli elettroni passano da un atomo all'altro nel punto di contatto, e l'energia della reazione si disperde come calore. Separando le due semireazioni in due recipienti, gli elettroni sono costretti a percorrere un filo esterno, dove possono compiere lavoro elettrico. Un dispositivo di questo tipo, che trasforma l'energia di una reazione redox spontanea in energia elettrica, si chiama **cella galvanica** o **pila**.

::: figura daniell
{"w":660,"h":330,"items":[{"t":"poly","pts":[[40,110],[40,270],[220,270],[220,110]],"c":"ax","w":1.8},{"t":"poly","pts":[[42,150],[218,150]],"c":"force4","w":1.2,"dash":true},{"t":"text","p":[130,250],"s":"Zn²⁺, SO₄²⁻","c":"muted","size":12},{"t":"rect","p":[110,60,40,150],"c":"body","r":3},{"t":"poly","pts":[[110,60],[150,60],[150,210],[110,210]],"close":true,"c":"force4","w":1.6},{"t":"text","p":[130,140],"s":"Zn","c":"force4","size":15},{"t":"poly","pts":[[420,110],[420,270],[600,270],[600,110]],"c":"ax","w":1.8},{"t":"poly","pts":[[422,150],[598,150]],"c":"force2","w":1.2,"dash":true},{"t":"text","p":[510,250],"s":"Cu²⁺, SO₄²⁻","c":"muted","size":12},{"t":"rect","p":[490,60,40,150],"c":"body","r":3},{"t":"poly","pts":[[490,60],[530,60],[530,210],[490,210]],"close":true,"c":"force2","w":1.6},{"t":"text","p":[510,140],"s":"Cu","c":"force2","size":15},{"t":"poly","pts":[[130,60],[130,30],[290,30]],"c":"ax","w":1.6},{"t":"poly","pts":[[370,30],[510,30],[510,60]],"c":"ax","w":1.6},{"t":"circle","p":[330,30,22],"c":"body"},{"t":"text","p":[330,36],"s":"V","c":"ax","size":15},{"t":"arrow","p":[170,18,260,18],"c":"accent","w":1.8,"head":8},{"t":"text","p":[215,12],"s":"e⁻","c":"accent","size":12},{"t":"poly","pts":[[190,200],[190,170],[470,170],[470,200]],"c":"force3","w":10},{"t":"poly","pts":[[190,200],[190,170],[470,170],[470,200]],"c":"body","w":6},{"t":"text","p":[330,162],"s":"ponte salino (KNO₃)","c":"force3","size":12},{"t":"arrow","p":[300,186,230,186],"c":"muted","w":1.4,"head":7},{"t":"text","p":[250,202],"s":"NO₃⁻","c":"muted","size":11},{"t":"arrow","p":[360,186,430,186],"c":"muted","w":1.4,"head":7},{"t":"text","p":[410,202],"s":"K⁺","c":"muted","size":11},{"t":"text","p":[130,296],"s":"anodo (−): ossidazione","c":"force4","size":12},{"t":"text","p":[130,314],"s":"Zn → Zn²⁺ + 2 e⁻","c":"ax","size":12},{"t":"text","p":[510,296],"s":"catodo (+): riduzione","c":"force2","size":12},{"t":"text","p":[510,314],"s":"Cu²⁺ + 2 e⁻ → Cu","c":"ax","size":12}]}
---
La pila di Daniell. All'anodo di zinco avviene l'ossidazione; gli elettroni percorrono il circuito esterno fino al catodo di rame, dove gli ioni rame si riducono. Il ponte salino chiude il circuito: gli anioni migrano verso l'anodo, i cationi verso il catodo, mantenendo neutre le due soluzioni.
:::

Ogni cella ha due **elettrodi**, conduttori in contatto con la soluzione. L'elettrodo dove avviene l'ossidazione si chiama **anodo**, quello dove avviene la riduzione **catodo**. In una pila l'anodo è il polo negativo, perché vi si accumulano gli elettroni ceduti dallo zinco, e il catodo è il polo positivo. Il **ponte salino**, un tubo pieno di una soluzione concentrata di un sale come il nitrato di potassio, impedisce alle due soluzioni di mescolarsi e permette il passaggio degli ioni: senza di esso la soluzione di zinco si caricherebbe positivamente e quella di rame negativamente, e la corrente si fermerebbe subito.

Una cella si descrive con una notazione compatta, che scrive l'anodo a sinistra e il catodo a destra; una barra verticale separa due fasi, una doppia barra indica il ponte salino:

$$\mathrm{Zn(s)}\,|\,\mathrm{Zn^{2+}(aq)}\,\|\,\mathrm{Cu^{2+}(aq)}\,|\,\mathrm{Cu(s)}.$$

La **tensione della cella**, o forza elettromotrice, $E_\text{cella}$, è la differenza di potenziale fra i due elettrodi quando la cella non eroga corrente. Misura la tendenza degli elettroni a passare dall'anodo al catodo. Per la pila di Daniell, con soluzioni $1\un{M}$ a $25\,^\circ\mathrm C$, vale $1{,}10\un{V}$.

## I potenziali standard di riduzione {#potenziali}

Non si può misurare il potenziale di un solo elettrodo; si misura sempre la differenza fra due. Per costruire una tabella si sceglie quindi un elettrodo di riferimento e gli si assegna, per convenzione, potenziale zero. L'**elettrodo standard a idrogeno** è una lamina di platino ricoperta di platino finemente diviso, immersa in una soluzione con attività degli ioni idrogeno unitaria, circa $1\un{M}$, e lambita da idrogeno gassoso a $1\un{bar}$:

$$2\,\mathrm{H^+(aq)}+2\,\mathrm e^-\rightleftharpoons\mathrm{H_2(g)},\qquad E^\circ=0\un{V}.$$

Il **potenziale standard di riduzione** $E^\circ$ di una semireazione è la tensione di una cella in cui quella semireazione, in condizioni standard, funziona da catodo e l'elettrodo a idrogeno da anodo. Le tabelle elencano le semireazioni scritte sempre come riduzioni. Un potenziale positivo indica che la specie ossidata della coppia si riduce più facilmente degli ioni idrogeno; un potenziale negativo, che si riduce meno facilmente.

::: figura potenziali
{"w":700,"h":370,"items":[{"t":"arrow","p":[330,354.0,330,23.8],"c":"ax","w":1.6,"head":9},{"t":"text","p":[338,27.8],"s":"E° (V)","c":"ax","size":12,"a":"start"},{"t":"line","p":[326,341,334,341],"c":"ax","w":1.2},{"t":"text","p":[320,345],"s":"−3","c":"muted","size":11,"a":"end"},{"t":"line","p":[326,289,334,289],"c":"ax","w":1.2},{"t":"text","p":[320,293],"s":"−2","c":"muted","size":11,"a":"end"},{"t":"line","p":[326,237,334,237],"c":"ax","w":1.2},{"t":"text","p":[320,241],"s":"−1","c":"muted","size":11,"a":"end"},{"t":"line","p":[326,185,334,185],"c":"ax","w":1.2},{"t":"text","p":[320,189],"s":"0","c":"muted","size":11,"a":"end"},{"t":"line","p":[326,133,334,133],"c":"ax","w":1.2},{"t":"text","p":[320,137],"s":"1","c":"muted","size":11,"a":"end"},{"t":"line","p":[326,81,334,81],"c":"ax","w":1.2},{"t":"text","p":[320,85],"s":"2","c":"muted","size":11,"a":"end"},{"t":"line","p":[326,29,334,29],"c":"ax","w":1.2},{"t":"text","p":[320,33],"s":"3","c":"muted","size":11,"a":"end"},{"t":"circle","p":[330,36.0,4],"c":"force3"},{"t":"line","p":[334,36.0,372,36.0],"c":"muted","w":1},{"t":"text","p":[378,40.0],"s":"F₂/F⁻  2,87","c":"ax","size":11,"a":"start"},{"t":"circle","p":[330,106.5,4],"c":"force3"},{"t":"line","p":[288,106.5,326,106.5],"c":"muted","w":1},{"t":"text","p":[282,110.5],"s":"1,51  MnO₄⁻/Mn²⁺","c":"ax","size":11,"a":"end"},{"t":"circle","p":[330,114.3,4],"c":"force3"},{"t":"line","p":[334,114.3,372,114.3],"c":"muted","w":1},{"t":"text","p":[378,118.3],"s":"Cl₂/Cl⁻  1,36","c":"ax","size":11,"a":"start"},{"t":"circle","p":[330,143.4,4],"c":"force3"},{"t":"line","p":[334,143.4,372,143.4],"c":"muted","w":1},{"t":"text","p":[378,147.4],"s":"Ag⁺/Ag  0,80","c":"ax","size":11,"a":"start"},{"t":"circle","p":[330,167.3,4],"c":"force3"},{"t":"line","p":[288,167.3,326,167.3],"c":"muted","w":1},{"t":"text","p":[282,171.3],"s":"0,34  Cu²⁺/Cu","c":"ax","size":11,"a":"end"},{"t":"circle","p":[330,185.0,4],"c":"force3"},{"t":"line","p":[334,185.0,372,185.0],"c":"muted","w":1},{"t":"text","p":[378,189.0],"s":"H⁺/H₂  0,00","c":"ax","size":11,"a":"start"},{"t":"circle","p":[330,207.9,4],"c":"force3"},{"t":"line","p":[288,207.9,326,207.9],"c":"muted","w":1},{"t":"text","p":[282,211.9],"s":"−0,44  Fe²⁺/Fe","c":"ax","size":11,"a":"end"},{"t":"circle","p":[330,224.7,4],"c":"force3"},{"t":"line","p":[334,224.7,372,224.7],"c":"muted","w":1},{"t":"text","p":[378,228.7],"s":"Zn²⁺/Zn  −0,76","c":"ax","size":11,"a":"start"},{"t":"circle","p":[330,271.4,4],"c":"force3"},{"t":"line","p":[288,271.4,326,271.4],"c":"muted","w":1},{"t":"text","p":[282,275.4],"s":"−1,66  Al³⁺/Al","c":"ax","size":11,"a":"end"},{"t":"circle","p":[330,308.3,4],"c":"force3"},{"t":"line","p":[334,308.3,372,308.3],"c":"muted","w":1},{"t":"text","p":[378,312.3],"s":"Mg²⁺/Mg  −2,37","c":"ax","size":11,"a":"start"},{"t":"circle","p":[330,343.6,4],"c":"force3"},{"t":"line","p":[288,343.6,326,343.6],"c":"muted","w":1},{"t":"text","p":[282,347.6],"s":"−3,05  Li⁺/Li","c":"ax","size":11,"a":"end"},{"t":"arrow","p":[600,315.0,600,55.0],"c":"force2","w":2,"head":9},{"t":"text","p":[612,179],"s":"ossidanti","c":"force2","size":12,"a":"start"},{"t":"text","p":[612,197],"s":"più forti ↑","c":"force2","size":12,"a":"start"},{"t":"arrow","p":[60,55.0,60,315.0],"c":"force4","w":2,"head":9},{"t":"text","p":[72,179],"s":"riducenti","c":"force4","size":12,"a":"start"},{"t":"text","p":[72,197],"s":"più forti ↓","c":"force4","size":12,"a":"start"}]}
---
Potenziali standard di riduzione di alcune coppie a $25\,^\circ\mathrm C$. In alto stanno gli ossidanti più forti, come il fluoro; in basso i riducenti più forti, come il litio. Ogni ossidante può ossidare spontaneamente, in condizioni standard, i riducenti delle coppie che stanno più in basso.
:::

La tensione standard di una cella si calcola dai potenziali delle due semireazioni.

::: legge Tensione standard di una cella
$$E^\circ_\text{cella}=E^\circ_\text{catodo}-E^\circ_\text{anodo},$$
dove entrambi i potenziali sono potenziali standard di riduzione. La reazione è spontanea in condizioni standard se $E^\circ_\text{cella}>0$.
:::

Per la pila di Daniell, con $E^\circ(\mathrm{Cu^{2+}/Cu})=+0{,}340\un{V}$ e $E^\circ(\mathrm{Zn^{2+}/Zn})=-0{,}763\un{V}$, la tensione standard è $0{,}340-(-0{,}763)=1{,}103\un{V}$. Una pila zinco-argento, con $E^\circ(\mathrm{Ag^+/Ag})=+0{,}800\un{V}$, darebbe $1{,}563\un{V}$. Il potenziale è una proprietà intensiva: moltiplicando una semireazione per due, per pareggiare gli elettroni, il suo potenziale non cambia, perché raddoppiano insieme l'energia e la carica trasferita.

## Prevedere le reazioni {#serie}

La tabella dei potenziali ordina gli ossidanti e i riducenti per forza. Una specie ossidata di una coppia ossida spontaneamente la specie ridotta di ogni coppia con potenziale più basso. Ne seguono alcune regole pratiche.

- **Metalli e acidi.** I metalli con potenziale standard negativo, come zinco, ferro, magnesio e alluminio, sono ossidati dagli ioni idrogeno di un acido $1\un{M}$ e sviluppano idrogeno. Rame, argento e oro, con potenziali positivi, non reagiscono con l'acido cloridrico. Il rame si scioglie invece nell'acido nitrico, perché lo ione nitrato in ambiente acido, con $E^\circ=+0{,}956\un{V}$ per la riduzione a monossido di azoto, è un ossidante più forte degli ioni idrogeno.
- **Spostamento dei metalli.** Un metallo riduce gli ioni dei metalli con potenziale più alto: lo zinco deposita il rame, il rame deposita l'argento da una soluzione di nitrato d'argento, in lunghi cristalli ramificati.
- **Alogeni.** Il cloro, con $E^\circ=+1{,}36\un{V}$, ossida gli ioni bromuro, $+1{,}065\un{V}$, e ioduro, $+0{,}535\un{V}$; il bromo ossida lo ioduro, non il cloruro.

I potenziali indicano se una reazione può avvenire, e tacciono sulla sua velocità. L'alluminio, con un potenziale molto negativo, è in pratica stabile all'aria e all'acqua perché si ricopre di uno strato sottilissimo e compatto di ossido che lo protegge.

## Tensione, energia di Gibbs e costante di equilibrio {#gibbs}

Il lavoro elettrico massimo che una cella può compiere è il prodotto della carica che fa circolare per la differenza di potenziale. Per $n$ moli di elettroni trasferite nella reazione scritta, la carica è $nF$, e il lavoro massimo coincide con la diminuzione dell'energia di Gibbs.

::: legge Energia di Gibbs e tensione
$$\Delta G=-nFE_\text{cella},\qquad\Delta G^\circ=-nFE^\circ_\text{cella}.$$
Una tensione positiva corrisponde a un'energia di Gibbs negativa, cioè a una reazione spontanea.
:::

Per la pila di Daniell, con $n=2$,

$$\Delta G^\circ=-2\times96\,485\un{C/mol}\times1{,}103\un{V}=-2{,}13\times10^5\un{J/mol}=-213\un{kJ/mol}.$$

Combinando con $\Delta G^\circ=-RT\ln K$ del capitolo [Equilibrio chimico](unit:chemistry-19), si collega la tensione standard alla costante di equilibrio:

$$E^\circ_\text{cella}=\frac{RT}{nF}\ln K=\frac{0{,}05916\un{V}}{n}\log K\quad\text{a }25\,^\circ\mathrm C.$$

Per la reazione della pila di Daniell, $\log K=2\times1{,}103/0{,}05916=37{,}3$, e $K\simeq2\times10^{37}$: all'equilibrio non resta praticamente alcuno ione rame in soluzione. Le misure di tensione sono uno dei metodi più precisi per determinare costanti di equilibrio molto grandi o molto piccole, come i prodotti di solubilità. La cella formata dall'elettrodo argento-cloruro d'argento, $E^\circ=+0{,}2223\un{V}$, e dall'elettrodo d'argento, $+0{,}800\un{V}$, corrisponde alla reazione $\mathrm{AgCl(s)}\rightleftharpoons\mathrm{Ag^+}+\mathrm{Cl^-}$, con $\log K_\mathrm{sp}=(0{,}2223-0{,}800)/0{,}05916$, cioè $K_\mathrm{sp}\simeq1{,}7\times10^{-10}$, in accordo con il valore del capitolo [Solubilità ed equilibrio eterogeneo](unit:chemistry-13).

## L'equazione di Nernst {#nernst}

La tensione di una cella cambia con le concentrazioni, come l'energia di Gibbs. Dividendo per $-nF$ la relazione $\Delta G=\Delta G^\circ+RT\ln Q$ si ottiene l'equazione proposta nel 1889 da Walther Nernst.

::: legge Equazione di Nernst
$$E_\text{cella}=E^\circ_\text{cella}-\frac{RT}{nF}\ln Q=E^\circ_\text{cella}-\frac{0{,}05916\un{V}}{n}\log Q\quad\text{a }25\,^\circ\mathrm C,$$
dove $Q$ è il quoziente di reazione della reazione della cella.
:::

Per la pila di Daniell il quoziente è $Q=[\mathrm{Zn^{2+}}]/[\mathrm{Cu^{2+}}]$, perché i metalli solidi non compaiono. Con $[\mathrm{Zn^{2+}}]=1{,}0\un{M}$ e $[\mathrm{Cu^{2+}}]=0{,}010\un{M}$, $\log Q=2$ e

$$E=1{,}103-\frac{0{,}05916}{2}\times2=1{,}044\un{V}.$$

::: figura nernst
{"w":660,"h":290,"items":[{"t":"line","p":[80,250,620,250],"c":"ax","w":1.4},{"t":"arrow","p":[330,282,330,22],"c":"ax","w":1.6,"head":9},{"t":"text","p":[338,30],"s":"E (V)","c":"ax","size":12,"a":"start"},{"t":"text","p":[618,236],"s":"log Q","c":"ax","size":12,"a":"end"},{"t":"line","p":[90,246,90,254],"c":"ax","w":1.2},{"t":"text","p":[90,270],"s":"−6","c":"muted","size":11},{"t":"line","p":[170,246,170,254],"c":"ax","w":1.2},{"t":"text","p":[170,270],"s":"−4","c":"muted","size":11},{"t":"line","p":[250,246,250,254],"c":"ax","w":1.2},{"t":"text","p":[250,270],"s":"−2","c":"muted","size":11},{"t":"line","p":[410,246,410,254],"c":"ax","w":1.2},{"t":"text","p":[410,270],"s":"2","c":"muted","size":11},{"t":"line","p":[490,246,490,254],"c":"ax","w":1.2},{"t":"text","p":[490,270],"s":"4","c":"muted","size":11},{"t":"line","p":[570,246,570,254],"c":"ax","w":1.2},{"t":"text","p":[570,270],"s":"6","c":"muted","size":11},{"t":"line","p":[326,194.0,334,194.0],"c":"ax","w":1.2},{"t":"text","p":[320,198.0],"s":"1,0","c":"muted","size":11,"a":"end"},{"t":"line","p":[326,138.0,334,138.0],"c":"ax","w":1.2},{"t":"text","p":[320,142.0],"s":"1,1","c":"muted","size":11,"a":"end"},{"t":"line","p":[326,82.0,334,82.0],"c":"ax","w":1.2},{"t":"text","p":[320,86.0],"s":"1,2","c":"muted","size":11,"a":"end"},{"t":"plot","o":[330,250],"sx":40,"sy":560,"pts":[[-6,0.380478],[6,0.025522]],"c":"force2","w":2.6},{"t":"circle","p":[330,136.3,5],"c":"force4"},{"t":"text","p":[342,130.3],"s":"Q = 1: E = E° = 1,103 V","c":"force4","size":12,"a":"start"},{"t":"circle","p":[410,169.4,5],"c":"force3"},{"t":"text","p":[420,157.4],"s":"[Cu²⁺] = 0,010 M: 1,044 V","c":"force3","size":12,"a":"start"},{"t":"text","p":[98.0,177.2],"s":"pendenza: −0,0296 V per unità di log Q","c":"muted","size":11,"a":"start"}]}
---
Tensione della pila di Daniell a $25\,^\circ\mathrm C$ in funzione del logaritmo del quoziente di reazione. Ogni fattore dieci in $Q$ abbassa la tensione di $0{,}0296\un{V}$. Mentre la pila funziona gli ioni rame si consumano e gli ioni zinco si accumulano, $Q$ cresce e la tensione diminuisce; si annullerebbe all'equilibrio, con $\log Q=37{,}3$.
:::

L'equazione spiega perché una pila si scarica: man mano che la reazione procede, il quoziente cresce verso la costante e la tensione diminuisce, finché all'equilibrio si annulla. Spiega anche le **pile a concentrazione**, formate da due elettrodi uguali immersi in soluzioni dello stesso ione a concentrazioni diverse. Due elettrodi di rame in soluzioni di ioni rame $1{,}0\un{M}$ e $0{,}0010\un{M}$ danno una tensione di $(0{,}05916/2)\times3=0{,}089\un{V}$: gli elettroni passano dall'elettrodo nella soluzione diluita, dove il rame si scioglie, a quello nella soluzione concentrata, dove si deposita, finché le due concentrazioni diventano uguali.

::: approfondimento Come funziona il pH-metro
Il pH-metro, presentato nel capitolo [Acidi, basi e pH](unit:chemistry-21), è una pila a concentrazione per gli ioni idrogeno. L'elettrodo di vetro è un bulbo di vetro speciale, molto sottile, che contiene una soluzione a pH fisso e un elettrodo di riferimento interno. Gli ioni idrogeno scambiano posto con gli ioni sodio negli strati superficiali del vetro, e fra le due facce del bulbo si stabilisce una differenza di potenziale che dipende dal rapporto fra le concentrazioni degli ioni idrogeno all'interno e all'esterno. Per l'equazione di Nernst, a $25\,^\circ\mathrm C$ la tensione misurata rispetto a un secondo elettrodo di riferimento cambia di $59{,}16\un{mV}$ per ogni unità di pH. Lo strumento si tara con due o più tamponi di pH noto e converte la tensione in pH. L'elettrodo di vetro fu proposto nel 1909 da Fritz Haber e Zygmunt Klemensiewicz; il primo pH-metro commerciale, di Arnold Beckman, risale al 1934.
:::

## Pile, accumulatori e celle a combustibile {#batterie}

Le pile pratiche sostituiscono le soluzioni e il ponte salino della cella di Daniell con paste e separatori porosi, per essere compatte, robuste e trasportabili. Si distinguono le **pile primarie**, che si gettano quando la reazione si è esaurita, e gli **accumulatori** o pile secondarie, che si ricaricano facendo avvenire la reazione inversa con una corrente esterna.

- **Pila alcalina.** È la pila primaria più diffusa, da $1{,}5\un{V}$. L'anodo è zinco in polvere, il catodo diossido di manganese, l'elettrolita una pasta di idrossido di potassio. Lo zinco si ossida, il manganese passa dal numero di ossidazione $+4$ a $+3$.
- **Accumulatore al piombo.** È la batteria delle automobili. Ogni cella ha un anodo di piombo e un catodo di diossido di piombo, immersi in acido solforico. Durante la scarica entrambi gli elettrodi si trasformano in solfato di piombo:
$$\mathrm{Pb}+\mathrm{PbO_2}+2\,\mathrm{H_2SO_4}\longrightarrow2\,\mathrm{PbSO_4}+2\,\mathrm{H_2O}.$$
La tensione standard è $1{,}69-(-0{,}356)=2{,}05\un{V}$; sei celle in serie danno i $12\un{V}$ della batteria. Durante la carica la reazione si inverte. La densità dell'acido diminuisce durante la scarica, perché l'acido solforico si consuma e si forma acqua, e la sua misura indica lo stato di carica.
- **Accumulatore agli ioni di litio.** Nei telefoni, nei computer portatili e nelle auto elettriche, gli ioni litio si spostano attraverso un elettrolita organico fra un anodo di grafite, nei cui strati si inseriscono, e un catodo di un ossido metallico, come l'ossido di cobalto e litio. La tensione di una cella è intorno a $3{,}6$–$3{,}7\un{V}$, e il litio, leggerissimo e con il potenziale più negativo della tabella, permette di immagazzinare molta energia in poca massa. John Goodenough, Stanley Whittingham e Akira Yoshino ricevettero per questa invenzione il premio Nobel per la chimica nel 2019.
- **Cella a combustibile.** Una cella a combustibile riceve continuamente i reagenti dall'esterno, invece di contenerli. In quella a idrogeno, l'idrogeno si ossida all'anodo e l'ossigeno dell'aria si riduce al catodo, producendo soltanto acqua. La tensione standard è $1{,}229\un{V}$, e l'energia di Gibbs della reazione, $-237{,}1\un{kJ}$ per mole di acqua liquida, è l'$83\%$ della sua entalpia: è il rendimento massimo teorico, molto superiore a quello di un motore termico. Le celle a combustibile fornirono l'energia elettrica alle capsule spaziali Gemini e Apollo; nelle missioni Apollo l'acqua prodotta serviva anche da bere.

::: quotidiano La pila al limone
Un limone con una vite zincata e una moneta o un filo di rame infilati nella polpa è una pila: lo zinco si ossida, e al rame si riducono gli ioni idrogeno dell'acido citrico. Un voltmetro misura circa un volt. Eppure la pila al limone accende a fatica un diodo luminoso: la sua resistenza interna è grande, la superficie degli elettrodi piccola, e la corrente che può erogare è di pochi decimi di milliampere. La tensione dice quanta energia porta ogni elettrone; la corrente, quanti elettroni passano ogni secondo. Una batteria utile deve offrire entrambe.
:::

## La corrosione {#corrosione}

La **corrosione** è l'ossidazione indesiderata di un metallo da parte dell'ambiente. La più importante è la formazione della ruggine sul ferro, che distrugge ogni anno una frazione considerevole dell'acciaio prodotto. Il ferro arrugginisce in presenza di acqua e di ossigeno insieme; il ferro secco o immerso in acqua priva di ossigeno resiste a lungo.

Il meccanismo è quello di una pila in miniatura. Sotto una goccia d'acqua, il ferro si ossida nella zona centrale, dove l'ossigeno arriva con difficoltà, che funziona da anodo; gli elettroni attraversano il metallo e riducono l'ossigeno al bordo della goccia, dove l'aria è vicina, che funziona da catodo:

$$\mathrm{Fe}\longrightarrow\mathrm{Fe^{2+}}+2\,\mathrm e^-,\qquad\mathrm{O_2}+2\,\mathrm{H_2O}+4\,\mathrm e^-\longrightarrow4\,\mathrm{OH^-}.$$

Gli ioni ferro(II) e idrossido si incontrano nell'acqua; l'ossigeno ossida ulteriormente il ferro, e precipita un ossido idrato di ferro(III), la ruggine, porosa e friabile, che non protegge il metallo sottostante. I sali disciolti, come il cloruro di sodio sparso sulle strade d'inverno o presente nell'aria di mare, accelerano il processo perché rendono l'acqua più conduttrice.

::: figura corrosione
{"w":660,"h":260,"items":[{"t":"rect","p":[40,200,580,50],"c":"muted","r":2},{"t":"text","p":[330,232],"s":"ferro","c":"ax","size":13},{"t":"poly","pts":[[110,200],[550.0,200.0],[549.3,191.4],[547.3,182.8],[543.9,174.3],[539.2,166.0],[533.3,157.9],[526.0,150.1],[517.6,142.5],[508.0,135.3],[497.3,128.6],[485.6,122.2],[472.9,116.4],[459.3,111.0],[444.9,106.2],[429.9,102.0],[414.2,98.4],[398.0,95.4],[381.4,93.0],[364.4,91.4],[347.3,90.3],[330.0,90.0],[312.7,90.3],[295.6,91.4],[278.6,93.0],[262.0,95.4],[245.8,98.4],[230.1,102.0],[215.1,106.2],[200.7,111.0],[187.1,116.4],[174.4,122.2],[162.7,128.6],[152.0,135.3],[142.4,142.5],[134.0,150.1],[126.7,157.9],[120.8,166.0],[116.1,174.3],[112.7,182.8],[110.7,191.4],[110.0,200.0]],"c":"force2","w":2},{"t":"text","p":[330,84],"s":"goccia d'acqua","c":"force2","size":12},{"t":"text","p":[330,140],"s":"zona anodica (poco O₂)","c":"force4","size":12},{"t":"text","p":[330,158],"s":"Fe → Fe²⁺ + 2 e⁻","c":"ax","size":12},{"t":"arrow","p":[330,190,330,176],"c":"force4","w":1.6,"head":7},{"t":"text","p":[20,30],"s":"zona catodica, al bordo (molto O₂)","c":"force3","size":11,"a":"start"},{"t":"text","p":[20,48],"s":"O₂ + 2 H₂O + 4 e⁻ → 4 OH⁻","c":"ax","size":11,"a":"start"},{"t":"arrow","p":[70,56,124,180],"c":"force3","w":1.4,"head":7},{"t":"arrow","p":[300,205,175,205],"c":"accent","w":1.6,"head":7},{"t":"text","p":[240,222],"s":"e⁻ nel metallo","c":"accent","size":11},{"t":"arrow","p":[360,205,485,205],"c":"accent","w":1.6,"head":7},{"t":"circle","p":[160,196,5],"c":"force"},{"t":"circle","p":[500,196,5],"c":"force"},{"t":"text","p":[520,186],"s":"ruggine","c":"force","size":11,"a":"start"}]}
---
La corrosione del ferro sotto una goccia d'acqua. Al centro, dove l'ossigeno scarseggia, il ferro si ossida; al bordo, dove l'ossigeno è abbondante, l'ossigeno si riduce. Gli elettroni passano attraverso il metallo; la ruggine si deposita fra le due zone.
:::

La protezione segue dal meccanismo. La **verniciatura** isola il ferro da acqua e ossigeno. La **zincatura**, il rivestimento con uno strato di zinco, protegge anche dove lo strato si graffia: lo zinco, con potenziale più negativo del ferro, si ossida al suo posto e lo mantiene ridotto. Per le navi, gli oleodotti e i serbatoi interrati si usa la **protezione catodica**: blocchi di magnesio o di zinco collegati alla struttura si consumano lentamente come anodi sacrificali, e vanno sostituiti di tanto in tanto. L'unione di due metalli diversi in un ambiente umido, al contrario, accelera la corrosione di quello con potenziale più basso: la Statua della Libertà, con la pelle di rame sostenuta da un'armatura di ferro, dovette essere restaurata a metà degli anni Ottanta proprio per la corrosione dell'armatura nei punti di contatto.

## L'elettrolisi {#elettrolisi}

Una pila sfrutta una reazione spontanea per produrre corrente. Il processo inverso, l'**elettrolisi**, usa una corrente fornita dall'esterno per far avvenire una reazione non spontanea. In una **cella elettrolitica** il generatore spinge elettroni in un elettrodo, che diventa il catodo, dove avviene la riduzione, e li sottrae all'altro, che diventa l'anodo, dove avviene l'ossidazione. In una cella elettrolitica il catodo è il polo negativo, al contrario di una pila; le definizioni di anodo e catodo, legate al tipo di reazione, restano le stesse.

::: figura elettrolisi
{"w":660,"h":330,"items":[{"t":"poly","pts":[[150,110],[150,270],[510,270],[510,110]],"c":"ax","w":1.8},{"t":"text","p":[330,252],"s":"NaCl fuso","c":"muted","size":12},{"t":"rect","p":[200,80,30,140],"c":"body","r":3},{"t":"poly","pts":[[200,80],[230,80],[230,220],[200,220]],"close":true,"c":"force4","w":1.6},{"t":"rect","p":[430,80,30,140],"c":"body","r":3},{"t":"poly","pts":[[430,80],[460,80],[460,220],[430,220]],"close":true,"c":"force2","w":1.6},{"t":"poly","pts":[[215,80],[215,40],[300,40]],"c":"ax","w":1.6},{"t":"poly","pts":[[360,40],[445,40],[445,80]],"c":"ax","w":1.6},{"t":"line","p":[300,32,300,48],"c":"ax","w":2.4},{"t":"line","p":[312,26,312,54],"c":"ax","w":2.4},{"t":"line","p":[324,32,324,48],"c":"ax","w":2.4},{"t":"line","p":[336,26,336,54],"c":"ax","w":2.4},{"t":"line","p":[336,40,360,40],"c":"ax","w":1.6},{"t":"text","p":[330,18],"s":"generatore","c":"muted","size":11},{"t":"arrow","p":[260,52,220,52],"c":"accent","w":1.6,"head":7},{"t":"arrow","p":[440,52,400,52],"c":"accent","w":1.6,"head":7},{"t":"text","p":[410,66],"s":"e⁻","c":"accent","size":11},{"t":"text","p":[245,66],"s":"e⁻","c":"accent","size":11},{"t":"text","p":[215,296],"s":"catodo (−): riduzione","c":"force4","size":12},{"t":"text","p":[215,314],"s":"Na⁺ + e⁻ → Na","c":"ax","size":12},{"t":"text","p":[445,296],"s":"anodo (+): ossidazione","c":"force2","size":12},{"t":"text","p":[445,314],"s":"2 Cl⁻ → Cl₂ + 2 e⁻","c":"ax","size":12},{"t":"text","p":[260,170],"s":"Na⁺ →","c":"force","size":12},{"t":"text","p":[400,170],"s":"← Cl⁻","c":"force3","size":12}]}
---
Elettrolisi del cloruro di sodio fuso. Il generatore spinge gli elettroni verso il catodo, dove gli ioni sodio si riducono a sodio metallico, e li sottrae all'anodo, dove gli ioni cloruro si ossidano a cloro gassoso.
:::

Nel cloruro di sodio fuso gli ioni sodio migrano verso il catodo e si riducono a sodio liquido, gli ioni cloruro migrano verso l'anodo e si ossidano a cloro gassoso. È il processo con cui si producono industrialmente il sodio e altri metalli molto reattivi. Per far avvenire la reazione serve una tensione almeno uguale alla tensione della pila che funzionerebbe in senso opposto; in pratica ne serve di più, perché le reazioni agli elettrodi hanno energie di attivazione e la soluzione ha una resistenza. Questo eccesso di tensione si chiama **sovratensione**. Nell'elettrolisi dell'acqua, che ha una tensione minima di $1{,}229\un{V}$, le sovratensioni degli elettrodi portano la tensione di lavoro a circa $1{,}8$–$2\un{V}$.

In soluzione acquosa l'elettrolisi è complicata dalla possibile ossidazione o riduzione dell'acqua stessa. Nell'elettrolisi di una soluzione concentrata di cloruro di sodio, il processo **cloro-soda**, al catodo si riduce l'acqua, formando idrogeno e ioni idrossido, e all'anodo si ossida lo ione cloruro, per effetto delle sovratensioni che rendono più lenta l'ossidazione dell'acqua. Il processo produce insieme cloro, idrogeno e idrossido di sodio, tre delle sostanze più usate dall'industria chimica.

## Le leggi di Faraday {#faraday}

Michael Faraday scoprì nel 1834 che la quantità di sostanza trasformata a un elettrodo è proporzionale alla carica che attraversa la cella. In termini moderni, ogni mole di elettroni trasporta la carica di una costante di Faraday, $96\,485\un{C}$, e la stechiometria della semireazione dice quante moli di prodotto corrispondono a ogni mole di elettroni.

::: metodo Calcoli di elettrolisi
1. Calcolare la carica: $Q=It$, con la corrente in ampere e il tempo in secondi.
2. Calcolare le moli di elettroni: $n_{\mathrm e}=Q/F$.
3. Con la semireazione, passare alle moli di prodotto: per $\mathrm{Cu^{2+}}+2\,\mathrm e^-\to\mathrm{Cu}$, una mole di rame ogni due moli di elettroni.
4. Passare alla massa con la massa molare.
:::

::: esempio Ramatura elettrolitica
Una corrente di $2{,}00\un{A}$ attraversa per un'ora una soluzione di solfato di rame. Quanto rame si deposita al catodo?

La carica è $Q=2{,}00\un{A}\times3600\un{s}=7200\un{C}$; le moli di elettroni sono $7200/96\,485=0{,}0746$, quelle di rame la metà, $0{,}0373$; la massa è $0{,}0373\times63{,}55\un{g/mol}=2{,}37\un{g}$.
:::

L'elettrolisi ha applicazioni industriali enormi. L'alluminio si produce dal 1886 con il processo inventato indipendentemente da Charles Martin Hall negli Stati Uniti e da Paul Héroult in Francia: l'ossido di alluminio, sciolto in criolite fusa a circa $950\,^\circ\mathrm C$, viene elettrolizzato fra elettrodi di carbonio. Ogni chilogrammo di alluminio richiede tre moli di elettroni per ogni mole di metallo, cioè circa $1{,}07\times10^7\un{C}$; con una tensione di lavoro intorno a $4{,}5\un{V}$ servono circa $13\un{kWh}$, ed è per questo che riciclare l'alluminio, che richiede soltanto una piccola frazione di quell'energia, è così conveniente. La **galvanostegia** deposita strati sottili di metalli preziosi o resistenti, come oro, argento, nichel e cromo, su oggetti di metallo meno pregiato; la raffinazione elettrolitica porta il rame alla purezza del $99{,}99\%$ richiesta dai conduttori elettrici.

::: storia Da Galvani a Nernst
Negli anni Ottanta del Settecento il medico bolognese Luigi Galvani osservò che le zampe di una rana sezionata si contraevano quando i nervi e i muscoli venivano collegati da due metalli diversi, e attribuì il fenomeno a un'«elettricità animale». Alessandro Volta, a Pavia, sostenne che l'elettricità nasceva dal contatto fra i metalli diversi, e nel 1800 descrisse in una lettera alla Royal Society la sua pila, una colonna di dischi alternati di zinco e rame separati da cartoni imbevuti di acqua salata: il primo generatore di corrente continua. In pochi mesi la pila fu usata per decomporre l'acqua, e pochi anni dopo Humphry Davy isolò per elettrolisi il sodio e il potassio. Nel 1834 Michael Faraday enunciò le leggi dell'elettrolisi e, con il filosofo William Whewell, coniò i termini elettrodo, anodo, catodo, ione ed elettrolita. Daniell costruì la sua pila a due liquidi nel 1836, abbastanza stabile da alimentare le prime linee telegrafiche. Nel 1889 Walther Nernst collegò la tensione delle pile alle concentrazioni con l'equazione che porta il suo nome; ricevette il premio Nobel per la chimica nel 1920, per i suoi lavori di termochimica.
:::

## Errori frequenti {#errori}

::: errore L'anodo è sempre il polo positivo
L'anodo è definito dalla reazione che vi avviene, l'ossidazione. In una pila è il polo negativo; in una cella elettrolitica è il polo positivo, collegato al morsetto positivo del generatore.
:::

::: errore Moltiplicando una semireazione si moltiplica il suo potenziale
Il potenziale è una grandezza intensiva, l'energia per unità di carica. Raddoppiando i coefficienti raddoppiano l'energia e la carica, e il potenziale resta lo stesso. Si moltiplicano invece $\Delta G^\circ$ e il numero di elettroni.
:::

::: errore Per la tensione della cella si sommano i potenziali di riduzione
Con i potenziali di riduzione tabulati, la tensione è la differenza $E^\circ_\text{catodo}-E^\circ_\text{anodo}$. Sommarli sarebbe corretto soltanto cambiando prima il segno del potenziale dell'anodo, per trasformarlo in potenziale di ossidazione.
:::

::: errore Un potenziale positivo garantisce una reazione rapida
Il potenziale riguarda l'energia di Gibbs, e quindi la spontaneità. La velocità dipende dalle barriere di attivazione agli elettrodi, che possono essere alte, come mostrano le sovratensioni e la stabilità apparente dell'alluminio.
:::

::: errore La tensione di una pila resta costante finché non è scarica
Per l'equazione di Nernst la tensione diminuisce man mano che i reagenti si consumano e i prodotti si accumulano. Nelle pile commerciali la diminuzione è contenuta perché molti reagenti e prodotti sono solidi, con attività costante, fino a quando un reagente si esaurisce.
:::

## Sintesi {#sintesi}

::: sintesi Che cosa portare con sé
- Ossidazione è perdita di elettroni, riduzione acquisto; l'ossidante si riduce, il riducente si ossida.
- I numeri di ossidazione seguono la contabilità degli elettroni; una reazione è redox se qualcuno di essi cambia.
- Le equazioni redox si bilanciano con il metodo delle semireazioni, con $\mathrm{H_2O}$ e $\mathrm{H^+}$ in ambiente acido, e poi $\mathrm{OH^-}$ in ambiente basico.
- In una cella galvanica l'ossidazione avviene all'anodo, polo negativo, e la riduzione al catodo, polo positivo; il ponte salino chiude il circuito.
- $E^\circ_\text{cella}=E^\circ_\text{catodo}-E^\circ_\text{anodo}$; la reazione è spontanea se è positiva.
- $\Delta G^\circ=-nFE^\circ$ e, a $25\,^\circ\mathrm C$, $E^\circ=(0{,}05916\un{V}/n)\log K$.
- Equazione di Nernst: $E=E^\circ-(0{,}05916\un{V}/n)\log Q$.
- La corrosione del ferro è una pila in miniatura; si previene con vernici, zincatura e anodi sacrificali.
- Nell'elettrolisi la corrente esterna fa avvenire reazioni non spontanee; le moli trasformate sono legate alla carica da $n_{\mathrm e}=It/F$.
:::

## Glossario {#glossario}

- **Ossidazione** e **riduzione**: perdita e acquisto di elettroni.
- **Ossidante** e **riducente**: specie che si riducono o si ossidano, provocando l'ossidazione o la riduzione dell'altra.
- **Numero di ossidazione**: carica che un atomo avrebbe se tutti i suoi legami fossero ionici.
- **Semireazione**: parte di una reazione redox che descrive soltanto l'ossidazione o soltanto la riduzione.
- **Disproporzione**: reazione in cui una stessa specie si ossida e si riduce.
- **Cella galvanica**: dispositivo che produce energia elettrica da una reazione redox spontanea.
- **Anodo** e **catodo**: elettrodi dove avvengono rispettivamente l'ossidazione e la riduzione.
- **Ponte salino**: collegamento ionico fra le due semicelle.
- **Potenziale standard di riduzione**: tensione di una semicella standard misurata rispetto all'elettrodo standard a idrogeno.
- **Costante di Faraday**: carica di una mole di elettroni, $96\,485\un{C/mol}$.
- **Equazione di Nernst**: relazione fra la tensione di una cella e il quoziente di reazione.
- **Pila a concentrazione**: cella con due elettrodi uguali in soluzioni a concentrazioni diverse.
- **Accumulatore**: pila ricaricabile.
- **Cella a combustibile**: cella galvanica alimentata continuamente con i reagenti.
- **Corrosione**: ossidazione indesiderata di un metallo da parte dell'ambiente.
- **Anodo sacrificale**: metallo più facilmente ossidabile collegato a una struttura per proteggerla.
- **Elettrolisi**: reazione non spontanea provocata da una corrente elettrica.
- **Sovratensione**: tensione in eccesso rispetto a quella termodinamica, necessaria per una reazione agli elettrodi.

## Esercizi {#esercizi}

Gli esercizi sono divisi in tre livelli. Dove non è indicato diversamente, la temperatura è $25\,^\circ\mathrm C$ e i potenziali standard sono quelli del testo; inoltre $E^\circ(\mathrm{Ni^{2+}/Ni})=-0{,}257\un{V}$ e $E^\circ(\mathrm{Mg^{2+}/Mg})=-2{,}372\un{V}$.

::: esercizio Numeri di ossidazione [base]
Assegnare il numero di ossidazione all'azoto in $\mathrm{NH_3}$, $\mathrm{NO_2}$, $\mathrm{HNO_3}$ e $\mathrm{NO_2^-}$; allo zolfo in $\mathrm{S_2O_3^{2-}}$ e $\mathrm{SO_3^{2-}}$; al cloro in $\mathrm{ClO_4^-}$ e $\mathrm{ClO^-}$.
>>> soluzione
Azoto: $-3$, $+4$, $+5$, $+3$. Zolfo: $+2$ nel tiosolfato, come valore medio, e $+4$ nel solfito. Cloro: $+7$ nel perclorato, $+1$ nell'ipoclorito.
:::

::: esercizio Chi ossida e chi riduce [base]
Indicare l'ossidante e il riducente nelle reazioni $2\,\mathrm{Al}+3\,\mathrm{Cl_2}\to2\,\mathrm{AlCl_3}$ e $\mathrm{Fe_2O_3}+3\,\mathrm{CO}\to2\,\mathrm{Fe}+3\,\mathrm{CO_2}$. Che cosa ha di particolare la reazione $2\,\mathrm{H_2O_2}\to2\,\mathrm{H_2O}+\mathrm{O_2}$?
>>> soluzione
Nella prima l'alluminio, da $0$ a $+3$, è il riducente; il cloro, da $0$ a $-1$, è l'ossidante. Nella seconda il monossido di carbonio, con il carbonio da $+2$ a $+4$, è il riducente; l'ossido di ferro, con il ferro da $+3$ a $0$, è l'ossidante. Nella terza l'ossigeno, a $-1$ nel perossido, passa in parte a $-2$ e in parte a $0$: è una disproporzione, e il perossido è insieme ossidante e riducente.
:::

::: esercizio Tensioni standard [base]
Calcolare la tensione standard delle pile magnesio-argento e ferro-rame, indicando l'anodo di ciascuna.
>>> soluzione
Magnesio-argento: anodo di magnesio, $E^\circ=0{,}800-(-2{,}372)=3{,}172\un{V}$. Ferro-rame: anodo di ferro, $E^\circ=0{,}340-(-0{,}440)=0{,}780\un{V}$.
:::

::: esercizio Avviene o no [base]
Prevedere se avviene una reazione spontanea in condizioni standard: (a) un chiodo di ferro in una soluzione di solfato di rame; (b) un filo d'argento in acido cloridrico $1\un{M}$; (c) cloro gassoso in una soluzione di ioduro di potassio; (d) una lamina di rame in una soluzione di solfato di zinco.
>>> soluzione
(a) Sì: il ferro, con potenziale più basso, si ossida e il rame si deposita. (b) No: l'argento ha potenziale più alto dell'idrogeno. (c) Sì: il cloro ossida lo ioduro a iodio. (d) No: il rame non riduce gli ioni zinco, la reazione spontanea è l'inversa.
:::

::: esercizio Notazione di una pila [base]
Per la pila $\mathrm{Ni(s)}\,|\,\mathrm{Ni^{2+}}\,\|\,\mathrm{Ag^+}\,|\,\mathrm{Ag(s)}$ indicare anodo e catodo, scrivere la reazione complessiva bilanciata e calcolare la tensione standard.
>>> soluzione
Anodo di nichel, catodo d'argento; gli elettroni vanno dal nichel all'argento. La reazione è $\mathrm{Ni}+2\,\mathrm{Ag^+}\to\mathrm{Ni^{2+}}+2\,\mathrm{Ag}$, e $E^\circ=0{,}800-(-0{,}257)=1{,}057\un{V}$.
:::

::: esercizio Permanganato e acqua ossigenata [medio]
Bilanciare in ambiente acido la reazione fra ione permanganato e perossido di idrogeno, che forma ione manganese(II) e ossigeno.
>>> soluzione
Riduzione: $\mathrm{MnO_4^-}+8\,\mathrm{H^+}+5\,\mathrm e^-\to\mathrm{Mn^{2+}}+4\,\mathrm{H_2O}$. Ossidazione: $\mathrm{H_2O_2}\to\mathrm{O_2}+2\,\mathrm{H^+}+2\,\mathrm e^-$. Moltiplicando per $2$ e per $5$ e semplificando:
$$2\,\mathrm{MnO_4^-}+5\,\mathrm{H_2O_2}+6\,\mathrm{H^+}\longrightarrow2\,\mathrm{Mn^{2+}}+5\,\mathrm{O_2}+8\,\mathrm{H_2O}.$$
Diciotto atomi di ossigeno, sedici di idrogeno e carica $+4$ da ciascuna parte.
:::

::: esercizio Un bilanciamento in ambiente basico [medio]
Bilanciare in ambiente basico la reazione fra idrossido di cromo(III) e ione clorato, che forma ione cromato e ione cloruro.
>>> soluzione
Le due semireazioni sono
$$\begin{aligned}
\mathrm{Cr(OH)_3}+5\,\mathrm{OH^-}&\to\mathrm{CrO_4^{2-}}+4\,\mathrm{H_2O}+3\,\mathrm e^-,\\
\mathrm{ClO_3^-}+3\,\mathrm{H_2O}+6\,\mathrm e^-&\to\mathrm{Cl^-}+6\,\mathrm{OH^-}.
\end{aligned}$$
Moltiplicando la prima per $2$ e sommando:
$$2\,\mathrm{Cr(OH)_3}+\mathrm{ClO_3^-}+4\,\mathrm{OH^-}\longrightarrow2\,\mathrm{CrO_4^{2-}}+\mathrm{Cl^-}+5\,\mathrm{H_2O}.$$
:::

::: esercizio Energia e costante [medio]
Calcolare $\Delta G^\circ$ e la costante di equilibrio della reazione $\mathrm{Zn}+2\,\mathrm{Ag^+}\to\mathrm{Zn^{2+}}+2\,\mathrm{Ag}$.
>>> soluzione
$E^\circ=0{,}800-(-0{,}763)=1{,}563\un{V}$ e $n=2$. $\Delta G^\circ=-2\times96\,485\times1{,}563\un{J}\simeq-302\un{kJ}$. $\log K=2\times1{,}563/0{,}05916=52{,}8$, e $K\simeq7\times10^{52}$.
:::

::: esercizio Una pila fuori dallo standard [medio]
Calcolare la tensione della pila $\mathrm{Zn}\,|\,\mathrm{Zn^{2+}}(0{,}10\un{M})\,\|\,\mathrm{Cu^{2+}}(0{,}50\un{M})\,|\,\mathrm{Cu}$.
>>> soluzione
$Q=0{,}10/0{,}50=0{,}20$ e $\log Q=-0{,}70$, quindi
$$E=1{,}103-\frac{0{,}05916}{2}\times(-0{,}70)=1{,}103+0{,}021=1{,}124\un{V}.$$
Con più ossidante e meno prodotto la tensione supera quella standard.
:::

::: esercizio Argentatura [medio]
Quanto tempo serve per depositare $1{,}00\un{g}$ di argento su un oggetto con una corrente di $0{,}500\un{A}$, da una soluzione di ioni $\mathrm{Ag^+}$?
>>> soluzione
Le moli di argento, e di elettroni, sono $1{,}00/107{,}87=9{,}27\times10^{-3}$. La carica è $9{,}27\times10^{-3}\times96\,485=894\un{C}$, e il tempo $894/0{,}500=1789\un{s}$, circa $30$ minuti.
:::

::: esercizio Il rame(I) in acqua [avanzato]
Con $E^\circ(\mathrm{Cu^+/Cu})=+0{,}520\un{V}$ e $E^\circ(\mathrm{Cu^{2+}/Cu^+})=+0{,}159\un{V}$, mostrare che lo ione rame(I) disproporziona in acqua secondo $2\,\mathrm{Cu^+}\to\mathrm{Cu}+\mathrm{Cu^{2+}}$, e calcolare la costante.
>>> soluzione
Nella disproporzione lo ione rame(I) si riduce a rame, catodo con $+0{,}520\un{V}$, e si ossida a rame(II), anodo con $+0{,}159\un{V}$. $E^\circ=0{,}520-0{,}159=0{,}361\un{V}$, positiva: la reazione è spontanea. Con $n=1$, $\log K=0{,}361/0{,}05916=6{,}10$, e $K\simeq1{,}3\times10^6$. Per questo i sali di rame(I) solubili non sono stabili in soluzione acquosa.
:::

::: esercizio Misurare il pH con l'idrogeno [avanzato]
Una cella è formata da un elettrodo standard a idrogeno, come catodo, e da un elettrodo a idrogeno, con idrogeno a $1\un{bar}$, immerso in una soluzione di pH incognito, come anodo. La tensione misurata è $0{,}236\un{V}$. Calcolare il pH.
>>> soluzione
La reazione della cella trasferisce ioni idrogeno dalla soluzione standard a quella incognita, ed è una pila a concentrazione con $E^\circ=0$ e $n=1$. Il quoziente è $[\mathrm{H^+}]_x/1$, e quindi $E=-0{,}05916\log[\mathrm{H^+}]_x$, cioè $E=0{,}05916\,\mathrm{pH}_x$. Quindi $\mathrm{pH}=0{,}236/0{,}05916=3{,}99$.
:::

::: esercizio La batteria dell'automobile [avanzato]
Una batteria al piombo da $12\un{V}$ ha una capacità di $60\un{Ah}$. Calcolare l'energia immagazzinata, $\Delta G^\circ$ per mole di piombo consumato in una cella, e la massa di piombo che si trasforma in solfato in ciascuna cella durante una scarica completa.
>>> soluzione
L'energia è $12\un{V}\times60\un{Ah}=720\un{Wh}$, circa $2{,}6\un{MJ}$. Con $E^\circ=2{,}05\un{V}$ e $n=2$, $\Delta G^\circ=-2\times96\,485\times2{,}05\un{J}\simeq-396\un{kJ}$ per mole di piombo. La carica è $60\times3600=2{,}16\times10^5\un{C}$, cioè $2{,}24\un{mol}$ di elettroni, che in ciascuna cella ossidano $1{,}12\un{mol}$ di piombo, circa $232\un{g}$; nelle sei celle si consumano circa $1{,}4\un{kg}$ di piombo all'anodo, oltre al diossido di piombo al catodo.
:::

::: esercizio L'energia dell'alluminio [avanzato]
Calcolare la carica necessaria per produrre $1{,}00\un{kg}$ di alluminio per elettrolisi e l'energia elettrica richiesta con una tensione di lavoro di $4{,}5\un{V}$, in kilowattora.
>>> soluzione
Le moli di alluminio sono $1000/26{,}98=37{,}1$, quelle di elettroni il triplo, $111{,}2$. La carica è $111{,}2\times96\,485=1{,}07\times10^7\un{C}$, e l'energia $1{,}07\times10^7\times4{,}5\un{J}=4{,}8\times10^7\un{J}$, cioè circa $13\un{kWh}$.
:::

::: esercizio Il rendimento della cella a idrogeno [avanzato]
Con $\Delta G^\circ=-237{,}1\un{kJ}$ e $\Delta H^\circ=-285{,}8\un{kJ}$ per mole di acqua liquida, calcolare la tensione standard della cella a combustibile a idrogeno e il suo rendimento massimo teorico, inteso come rapporto fra lavoro elettrico ed entalpia di combustione.
>>> soluzione
Ogni mole di acqua richiede due moli di elettroni: $E^\circ=237\,100/(2\times96\,485)=1{,}229\un{V}$. Il rendimento massimo è $237{,}1/285{,}8\simeq0{,}83$. La differenza, $T\Delta S^\circ$, è il calore che la cella cede inevitabilmente all'ambiente anche quando funziona in modo ideale.
:::

## Fonti {#fonti}

Il testo, le figure, gli esempi e gli esercizi di questo capitolo sono originali; i dati della titolazione con il permanganato e della batteria sono illustrativi. Per la scelta e l'ordine degli argomenti il riferimento principale è il manuale di R. H. Petrucci, F. G. Herring, J. D. Madura e C. Bissonnette, *General Chemistry: Principles and Modern Applications*, 11ª edizione, Pearson Canada, Toronto, 2017, paragrafi 5-4–5-6 e 19-1–19-8. I dati numerici provengono dalle fonti seguenti.

1. Costante di Faraday e costante dei gas: valori raccomandati CODATA 2022.
2. Potenziali standard di riduzione a $25\,^\circ\mathrm C$: tabella D.4 dell'appendice D del manuale di Petrucci et al., in accordo con A. J. Bard, R. Parsons e J. Jordan, *Standard Potentials in Aqueous Solution*, IUPAC, Marcel Dekker, New York, 1985.
3. Energia di Gibbs ed entalpia di formazione dell'acqua liquida: tabelle NBS (D. D. Wagman et al., J. Phys. Chem. Ref. Data 11, 1982, supplemento 2). Prodotto di solubilità del cloruro d'argento: capitolo [Solubilità ed equilibrio eterogeneo](unit:chemistry-13). Masse molari: pesi atomici standard IUPAC (CIAAW).
4. Tensioni delle pile commerciali, condizioni del processo Hall-Héroult e consumo energetico dell'alluminio: letteratura tecnica di elettrochimica industriale. Premio Nobel per la chimica 2019 e 1920: Fondazione Nobel.
5. Per la storia: L. Galvani, *De viribus electricitatis in motu musculari commentarius*, Bologna, 1791; A. Volta, Phil. Trans. R. Soc. 90 (1800) 403; M. Faraday, Phil. Trans. R. Soc. 124 (1834) 77; J. F. Daniell, Phil. Trans. R. Soc. 126 (1836) 107; W. Nernst, Z. Phys. Chem. 4 (1889) 129; F. Haber e Z. Klemensiewicz, Z. Phys. Chem. 67 (1909) 385.
