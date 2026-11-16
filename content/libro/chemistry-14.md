---
unit: chemistry-14
titolo: Stechiometria e reagente limitante
sottotitolo: Equazioni bilanciate, rapporti molari, calcoli con masse, volumi e soluzioni
volume: Volume di chimica
fonte: Testo originale; riferimento principale Petrucci et al., General Chemistry, 11ª ed., §4-1–4-4, 4-6
---

## Prima di cominciare {#apertura}

I motori del modulo di servizio della stazione bruciano idrogeno con ossigeno. Se i serbatoi non sono caricati nel rapporto giusto, una parte di uno dei due gas resta inutilizzata e diventa soltanto peso da trasportare. Per sapere quanto caricare servono un'equazione bilanciata e un po' di aritmetica con le moli: la **stechiometria**, dal greco *stoicheion*, elemento, e *metron*, misura.

Il capitolo [Mole e quantità di sostanza](unit:chemistry-03) ha introdotto la lettura di un'equazione chimica in moli, con un esempio in cui i reagenti erano esattamente nelle proporzioni dell'equazione. Questo capitolo sviluppa il metodo per qualunque reazione: scrivere e bilanciare le equazioni, tradurle in rapporti fra quantità chimiche, passare da questi a masse, volumi di gas e volumi di soluzioni, e stabilire quale reagente si esaurisce per primo quando i reagenti non sono nelle proporzioni dell'equazione.

::: obiettivi
- enunciare la legge di conservazione della massa e interpretarla a livello atomico;
- scrivere e bilanciare equazioni chimiche, anche con il metodo algebrico;
- usare i coefficienti di un'equazione bilanciata come rapporti fra quantità chimiche;
- calcolare masse, volumi di gas e volumi di soluzioni di reagenti e prodotti;
- individuare il reagente limitante e calcolare la quantità di reagente in eccesso che resta;
- descrivere l'andamento di una reazione con l'avanzamento.
:::

Per i calcoli con i gas si usa l'equazione di stato del capitolo [Gas e stato aeriforme](unit:chemistry-10), per quelli con le soluzioni la molarità del capitolo [Soluzioni e concentrazione](unit:chemistry-12). Il capitolo successivo, [Resa e bilanci di materia](unit:chemistry-15), confronterà le quantità calcolate qui con quelle ottenute davvero.

## La conservazione della massa {#lavoisier}

Fino alla seconda metà del Settecento molti fenomeni chimici sembravano creare o distruggere materia. Un metallo scaldato all'aria aumentava di peso; il legno bruciando si riduceva a un pugno di cenere. Antoine-Laurent Lavoisier, a Parigi, eseguì le reazioni in recipienti chiusi, pesando con bilance di precisione eccezionale per l'epoca reagenti, prodotti e gas coinvolti. Trovò che la massa totale restava la stessa: il metallo calcinato aumentava di peso esattamente quanto diminuiva il peso dell'aria nel recipiente, perché si era combinato con una parte di essa, l'ossigeno. Nel *Traité élémentaire de chimie*, del 1789, enunciò il principio come fondamento di tutta la chimica: in ogni operazione la quantità di materia è la stessa prima e dopo.

Uno degli esperimenti più celebri durò dodici giorni. Lavoisier scaldò del mercurio in una storta collegata a una campana piena d'aria, chiusa sopra una vasca di mercurio. Sulla superficie del metallo si formò a poco a poco una polvere rossa, l'ossido di mercurio, e il volume dell'aria nella campana diminuì di circa un sesto; l'aria rimasta non manteneva più la combustione né la vita. Raccolta la polvere rossa e scaldata più fortemente, Lavoisier ottenne di nuovo mercurio e un volume di gas uguale a quello scomparso, nel quale una candela bruciava con una luce abbagliante. Il gas era l'ossigeno, che Lavoisier riconobbe come un elemento e come il protagonista delle combustioni. Le pesate tornavano: il metallo e il gas si combinavano e si separavano senza che nulla si creasse o si perdesse.

La **legge di conservazione della massa** ha una spiegazione semplice nella teoria atomica. In una reazione chimica gli atomi si conservano: si separano e si ricombinano in modo diverso. Il numero di atomi di ciascun elemento resta lo stesso, e con esso la massa totale.

::: figura atomi
{"w":600,"h":252,"items":[{"t":"circle","p":[73,80,9],"c":"ax"},{"t":"circle","p":[87,80,9],"c":"ax"},{"t":"circle","p":[73,130,9],"c":"ax"},{"t":"circle","p":[87,130,9],"c":"ax"},{"t":"circle","p":[189,105,14],"c":"force4"},{"t":"circle","p":[211,105,14],"c":"force4"},{"t":"text","p":[140,110],"s":"+","c":"ax","size":20},{"t":"arrow","p":[260,105,330,105],"c":"force3","w":2.4,"head":9},{"t":"circle","p":[400,85,14],"c":"force4"},{"t":"circle","p":[385,96,9],"c":"ax"},{"t":"circle","p":[415,96,9],"c":"ax"},{"t":"circle","p":[500,85,14],"c":"force4"},{"t":"circle","p":[485,96,9],"c":"ax"},{"t":"circle","p":[515,96,9],"c":"ax"},{"t":"text","p":[140,190],"s":"2 H₂ + O₂","c":"ax","size":14},{"t":"text","p":[450,190],"s":"2 H₂O","c":"ax","size":14},{"t":"text","p":[140,214],"s":"4 atomi H, 2 atomi O","c":"muted","size":11},{"t":"text","p":[450,214],"s":"4 atomi H, 2 atomi O","c":"muted","size":11},{"t":"text","p":[140,236],"s":"3 molecole · 36,03 g","c":"muted","size":11},{"t":"text","p":[450,236],"s":"2 molecole · 36,03 g","c":"muted","size":11}]}
---
La reazione fra idrogeno e ossigeno a livello delle molecole. Il numero di molecole cambia, da tre a due; il numero di atomi di ciascun elemento e la massa totale restano gli stessi.
:::

A rigore, la massa si conserva soltanto con un'approssimazione eccellente. Una reazione che libera energia perde anche una piccolissima massa, secondo la relazione di Einstein $E=mc^2$: la combustione di $2{,}016\un{g}$ di idrogeno, che libera circa $286\un{kJ}$, corrisponde a una perdita di circa $3\times10^{-12}\un{kg}$, tre miliardesimi di grammo, ben al di sotto di ciò che una bilancia può misurare. Per la chimica la conservazione della massa resta esatta in pratica; nelle reazioni nucleari, dove le energie sono milioni di volte maggiori, il difetto di massa diventa misurabile.

## Scrivere e bilanciare un'equazione {#bilanciamento}

Un'**equazione chimica** descrive una reazione con le formule dei reagenti, a sinistra della freccia, e dei prodotti, a destra. Lo stato fisico di ogni sostanza si indica fra parentesi: $\mathrm{(s)}$ solido, $\mathrm{(l)}$ liquido, $\mathrm{(g)}$ gas, $\mathrm{(aq)}$ in soluzione acquosa. I numeri davanti alle formule, i **coefficienti stechiometrici**, garantiscono che ogni elemento compaia con lo stesso numero di atomi nei due membri: l'equazione è allora **bilanciata**.

Per bilanciare si cambiano soltanto i coefficienti, mai le formule: cambiare un indice trasformerebbe una sostanza in un'altra. Scrivere $\mathrm{H_2O_2}$ al posto di $\mathrm{H_2O}$ bilancerebbe gli atomi di ossigeno della reazione fra idrogeno e ossigeno, ma descriverebbe la formazione del perossido di idrogeno, una sostanza diversa.

::: metodo Bilanciare un'equazione per tentativi
1. Scrivere le formule corrette di reagenti e prodotti.
2. Cominciare dall'elemento che compare in meno sostanze, di solito un metallo o il carbonio; lasciare per ultimi l'idrogeno e l'ossigeno, e per ultimissimi gli elementi che compaiono da soli.
3. Bilanciare un elemento alla volta, regolando i coefficienti; trattare come un'unità i gruppi di atomi, come il solfato o il nitrato, che passano inalterati da una parte all'altra.
4. Se serve, usare temporaneamente una frazione, e alla fine moltiplicare tutti i coefficienti per il denominatore.
5. Controllare il numero di atomi di ogni elemento e, per le equazioni ioniche, la carica totale nei due membri.
:::

::: esempio La combustione del butano
Bilanciare la combustione del butano, il gas degli accendini: $\mathrm{C_4H_{10}}+\mathrm{O_2}\to\mathrm{CO_2}+\mathrm{H_2O}$.

Il carbonio compare in una sola sostanza per parte: servono $4\,\mathrm{CO_2}$. L'idrogeno: dieci atomi a sinistra, cioè $5\,\mathrm{H_2O}$ a destra. L'ossigeno a destra è ora $4\times2+5=13$ atomi, che richiedono $\tfrac{13}2\,\mathrm{O_2}$. Moltiplicando tutto per due:
$$2\,\mathrm{C_4H_{10}(g)}+13\,\mathrm{O_2(g)}\longrightarrow8\,\mathrm{CO_2(g)}+10\,\mathrm{H_2O(l)}.$$
Controllo: $8$ atomi di carbonio, $20$ di idrogeno e $26$ di ossigeno da ciascuna parte.
:::

::: approfondimento Il bilanciamento come sistema di equazioni
Ogni equazione chimica si può bilanciare anche con l'algebra. Si assegna a ogni sostanza un coefficiente incognito e si scrive, per ogni elemento, che il numero di atomi a sinistra è uguale a quello a destra. Per la combustione del butano, con coefficienti $a\,\mathrm{C_4H_{10}}+b\,\mathrm{O_2}\to c\,\mathrm{CO_2}+d\,\mathrm{H_2O}$, si ottiene il sistema
$$\begin{aligned}\mathrm C:&\quad4a=c,\\ \mathrm H:&\quad10a=2d,\\ \mathrm O:&\quad2b=2c+d.\end{aligned}$$
Le equazioni sono tre e le incognite quattro: i coefficienti sono determinati a meno di un fattore comune, come deve essere, perché moltiplicando un'equazione bilanciata per qualunque numero si ottiene ancora un'equazione bilanciata. Ponendo $a=2$ si trova $c=8$, $d=10$, $b=13$. Il metodo algebrico è il più sicuro per le equazioni complicate, come quelle di molte reazioni di ossidazione e riduzione, ed è quello usato dai programmi di calcolo.
:::

## Tipi di reazione {#tipi}

Le reazioni chimiche sono innumerevoli, ma molte rientrano in pochi schemi ricorrenti, che aiutano a prevedere i prodotti e a scrivere le equazioni.

- **Sintesi**, o combinazione: due o più sostanze formano un unico prodotto, come nella formazione dell'ossido di magnesio, $2\,\mathrm{Mg}+\mathrm{O_2}\to2\,\mathrm{MgO}$, la luce bianca abbagliante dei vecchi flash fotografici.
- **Decomposizione**: una sostanza si scinde in sostanze più semplici, spesso per riscaldamento, come il carbonato di calcio, che nelle fornaci da calce perde anidride carbonica e diventa ossido di calcio, $\mathrm{CaCO_3}\to\mathrm{CaO}+\mathrm{CO_2}$.
- **Combustione**: una sostanza reagisce con l'ossigeno liberando calore e, di solito, luce; i composti di carbonio e idrogeno bruciando completamente danno anidride carbonica e acqua.
- **Scambio semplice**: un elemento prende il posto di un altro in un composto, come lo zinco che sposta il rame da una soluzione di solfato di rame, $\mathrm{Zn}+\mathrm{CuSO_4}\to\mathrm{ZnSO_4}+\mathrm{Cu}$.
- **Doppio scambio**: due composti ionici in soluzione si scambiano gli ioni, e la reazione avviene se uno dei prodotti precipita, si libera come gas o è acqua, come nella precipitazione del cloruro d'argento o nella neutralizzazione fra un acido e una base.

Molte reazioni appartengono a più categorie: la combustione del magnesio è anche una sintesi, e sia la combustione sia lo scambio semplice sono reazioni di ossidazione e riduzione, in cui alcuni elettroni passano da una sostanza a un'altra. Questa classificazione più profonda sarà l'argomento del capitolo [Ossidazione, riduzione ed elettrochimica](unit:chemistry-23).

## Rapporti fra quantità chimiche {#rapporti}

Un'equazione bilanciata è una ricetta in moli. Per la sintesi dell'ammoniaca,

$$\mathrm{N_2(g)}+3\,\mathrm{H_2(g)}\longrightarrow2\,\mathrm{NH_3(g)},$$

una mole di azoto reagisce con tre moli di idrogeno e forma due moli di ammoniaca. I coefficienti forniscono i **rapporti stechiometrici**, che si usano come fattori di conversione: per ogni mole di azoto consumata si formano due moli di ammoniaca, per ogni mole di ammoniaca formata si consumano $3/2$ moli di idrogeno. I coefficienti riguardano le moli, e le masse vanno calcolate a parte: tre grammi di idrogeno non reagiscono con un grammo di azoto, perché le masse molari delle due sostanze sono diverse.

Il calcolo stechiometrico segue quindi sempre lo stesso percorso: dalla grandezza nota del reagente o del prodotto A si passa alle sue moli; con il rapporto dei coefficienti si passa alle moli dell'altra sostanza B; dalle moli di B si torna alla grandezza richiesta.

::: figura mappa
{"w":652,"h":246,"items":[{"t":"rect","p":[14,40,120,52],"c":"body","r":6},{"t":"poly","pts":[[14,40],[134,40],[134,92],[14,92]],"close":true,"c":"force2","w":1.6},{"t":"text","p":[74.0,63.0],"s":"massa di A","c":"ax","size":12},{"t":"text","p":[74.0,80.0],"s":"g","c":"muted","size":10},{"t":"rect","p":[182,40,120,52],"c":"body","r":6},{"t":"poly","pts":[[182,40],[302,40],[302,92],[182,92]],"close":true,"c":"force3","w":1.6},{"t":"text","p":[242.0,63.0],"s":"moli di A","c":"ax","size":12},{"t":"text","p":[242.0,80.0],"s":"mol","c":"muted","size":10},{"t":"rect","p":[350,40,120,52],"c":"body","r":6},{"t":"poly","pts":[[350,40],[470,40],[470,92],[350,92]],"close":true,"c":"force3","w":1.6},{"t":"text","p":[410.0,63.0],"s":"moli di B","c":"ax","size":12},{"t":"text","p":[410.0,80.0],"s":"mol","c":"muted","size":10},{"t":"rect","p":[518,40,120,52],"c":"body","r":6},{"t":"poly","pts":[[518,40],[638,40],[638,92],[518,92]],"close":true,"c":"force2","w":1.6},{"t":"text","p":[578.0,63.0],"s":"massa di B","c":"ax","size":12},{"t":"text","p":[578.0,80.0],"s":"g","c":"muted","size":10},{"t":"arrow","p":[138,66,178,66],"c":"force","w":2.2,"head":8},{"t":"text","p":[158.0,30],"s":"/ M(A)","c":"force","size":12},{"t":"arrow","p":[306,66,346,66],"c":"force","w":2.2,"head":8},{"t":"text","p":[326.0,30],"s":"× b/a","c":"force","size":12},{"t":"arrow","p":[474,66,514,66],"c":"force","w":2.2,"head":8},{"t":"text","p":[494.0,30],"s":"× M(B)","c":"force","size":12},{"t":"rect","p":[92,150,150,52],"c":"body","r":6},{"t":"poly","pts":[[92,150],[242,150],[242,202],[92,202]],"close":true,"c":"muted","w":1.6},{"t":"text","p":[167.0,173.0],"s":"soluzione di A","c":"ax","size":12},{"t":"text","p":[167.0,190.0],"s":"volume e concentrazione","c":"muted","size":10},{"t":"rect","p":[272,150,150,52],"c":"body","r":6},{"t":"poly","pts":[[272,150],[422,150],[422,202],[272,202]],"close":true,"c":"muted","w":1.6},{"t":"text","p":[347.0,173.0],"s":"gas A","c":"ax","size":12},{"t":"text","p":[347.0,190.0],"s":"volume, T e P","c":"muted","size":10},{"t":"arrow","p":[172,148,212,96],"c":"force","w":2,"head":8},{"t":"text","p":[158,124],"s":"n = cV","c":"force","size":11,"a":"end"},{"t":"arrow","p":[342,148,278,96],"c":"force","w":2,"head":8},{"t":"text","p":[348,124],"s":"n = PV/RT","c":"force","size":11,"a":"start"},{"t":"text","p":[330,232],"s":"a e b: coefficienti di A e di B nell'equazione bilanciata","c":"muted","size":11}]}
---
Il percorso dei calcoli stechiometrici. Le masse si convertono in moli con le masse molari, i volumi di soluzioni con la molarità, i volumi di gas con l'equazione di stato; il passaggio da una sostanza all'altra avviene sempre in moli, con il rapporto dei coefficienti.
:::

::: esempio L'aria per una bombola da campeggio
Una bombola da campeggio contiene $450\un{g}$ di butano, $M=58{,}12\un{g/mol}$. Calcolare il volume di ossigeno, e di aria, necessario per bruciarlo completamente a $25\,^\circ\mathrm{C}$ e $1\un{bar}$.

Il butano è $7{,}74\un{mol}$. Dall'equazione bilanciata servono $13/2=6{,}5$ moli di ossigeno per mole di butano, cioè $50{,}3\un{mol}$, che occupano $50{,}3\times24{,}79\simeq1250\un{L}$. L'ossigeno è il $20{,}95\%$ delle molecole dell'aria, e il volume d'aria necessario è circa $5960\un{L}$, sei metri cubi. Usare un fornello a gas in una tenda chiusa consuma rapidamente l'ossigeno disponibile e, quando l'ossigeno scarseggia, produce monossido di carbonio, tossico, al posto dell'anidride carbonica.
:::

## Calcoli con le masse {#massa-massa}

::: esempio L'anidride carbonica di un litro di carburante
Calcolare la massa di anidride carbonica prodotta dalla combustione completa di un litro di ottano, $\mathrm{C_8H_{18}}$, densità $0{,}703\un{g/mL}$, secondo l'equazione $2\,\mathrm{C_8H_{18}}+25\,\mathrm{O_2}\to16\,\mathrm{CO_2}+18\,\mathrm{H_2O}$.

Un litro di ottano pesa $703\un{g}$; con $M=114{,}23\un{g/mol}$ sono $6{,}154\un{mol}$. Per ogni mole di ottano si formano $16/2=8$ moli di anidride carbonica: $49{,}23\un{mol}$, che con $M=44{,}01\un{g/mol}$ pesano circa $2{,}17\un{kg}$. Un litro di carburante, che pesa meno di tre quarti di chilo, produce più di due chili di anidride carbonica: la massa in più viene dall'ossigeno dell'aria, che si lega al carbonio.
:::

Il risultato dell'esempio, che sorprende molti, è una conseguenza diretta della conservazione della massa: i prodotti della combustione pesano quanto il carburante più l'ossigeno consumato, e l'ossigeno consumato pesa più di tre volte il carburante.

::: nota Le unità come guida
Nei calcoli stechiometrici conviene portarsi dietro le unità di misura e le formule delle sostanze, e trattarle come fattori che si semplificano. Nell'esempio dell'ottano: $703\un{g}\,\mathrm{C_8H_{18}}$ per $1\un{mol}/114{,}23\un{g}$ dà moli di ottano; per $8\un{mol}\,\mathrm{CO_2}/1\un{mol}\,\mathrm{C_8H_{18}}$ dà moli di anidride carbonica; per $44{,}01\un{g}/1\un{mol}$ dà grammi di anidride carbonica. Se un fattore è scritto alla rovescia, le unità non si semplificano, e l'errore salta all'occhio prima ancora di fare il conto.
:::

::: esempio La termite
La reazione fra ossido di ferro(III) e alluminio in polvere,
$$\mathrm{Fe_2O_3(s)}+2\,\mathrm{Al(s)}\longrightarrow\mathrm{Al_2O_3(s)}+2\,\mathrm{Fe(l)},$$
libera tanto calore da produrre ferro fuso, e si usa per saldare le rotaie dei binari. Calcolare la massa di alluminio necessaria per $100\un{g}$ di ossido di ferro e la massa di ferro prodotta.

L'ossido, $M=159{,}69\un{g/mol}$, corrisponde a $0{,}6262\un{mol}$. Servono il doppio di moli di alluminio, $1{,}252\un{mol}$, cioè $33{,}79\un{g}$, e si formano altrettante moli di ferro, $69{,}94\un{g}$. Controllo: i reagenti pesano $133{,}79\un{g}$; i prodotti $69{,}94\un{g}$ di ferro più $63{,}85\un{g}$ di ossido di alluminio, cioè ancora $133{,}79\un{g}$.
:::

## Gas e soluzioni nei calcoli {#gas-soluzioni}

Quando un reagente o un prodotto è un gas, il passaggio fra volume e moli si fa con l'equazione di stato, $n=PV/(RT)$; alla temperatura di $25\,^\circ\mathrm{C}$ e alla pressione di $1\un{bar}$, con il volume molare di $24{,}79\un{L/mol}$. Quando è in soluzione, con la molarità, $n=cV$. Il resto del calcolo non cambia.

::: esempio Neutralizzare un acido
Calcolare il volume di idrossido di sodio $0{,}100\un{M}$ necessario per neutralizzare $25{,}0\un{mL}$ di acido solforico $0{,}150\un{M}$, secondo l'equazione
$$\mathrm{H_2SO_4(aq)}+2\,\mathrm{NaOH(aq)}\longrightarrow\mathrm{Na_2SO_4(aq)}+2\,\mathrm{H_2O(l)}.$$

L'acido presente è $0{,}0250\times0{,}150=3{,}75\times10^{-3}\un{mol}$. Per l'equazione servono due moli di base per mole di acido: $7{,}50\times10^{-3}\un{mol}$, contenute in $7{,}50\times10^{-3}/0{,}100=0{,}0750\un{L}$, cioè $75{,}0\un{mL}$. Misurare con una buretta il volume di base che neutralizza un volume noto di acido, cioè eseguire una **titolazione**, è il modo più comune per determinare la concentrazione di un acido.
:::

::: esempio Un reagente impuro
Il calcare di una cava contiene il $92\%$ in massa di carbonato di calcio; il resto è argilla e sabbia, che non producono calce. Calcolare la massa massima di ossido di calcio che si ottiene da una tonnellata di calcare con la reazione $\mathrm{CaCO_3}\to\mathrm{CaO}+\mathrm{CO_2}$.

Una tonnellata di calcare contiene $920\un{kg}$ di carbonato, $M=100{,}09\un{g/mol}$, cioè $9{,}19\times10^3\un{mol}$. Si formano altrettante moli di ossido di calcio, $M=56{,}08\un{g/mol}$: circa $515\un{kg}$. Il calcolo stechiometrico va sempre fatto sulla parte pura del reagente; la massa delle impurezze passa intatta nel prodotto o negli scarti.
:::

## Equazioni ioniche {#ioniche}

Quando una reazione avviene in soluzione acquosa fra elettroliti, l'equazione scritta con le formule dei composti nasconde ciò che accade davvero. Nella precipitazione del cloruro d'argento,
$$\mathrm{AgNO_3(aq)}+\mathrm{NaCl(aq)}\longrightarrow\mathrm{AgCl(s)}+\mathrm{NaNO_3(aq)},$$
il nitrato d'argento, il cloruro di sodio e il nitrato di sodio sono in soluzione come ioni separati. Scrivendoli come tali si ottiene l'**equazione ionica completa**:
$$\mathrm{Ag^+}+\mathrm{NO_3^-}+\mathrm{Na^+}+\mathrm{Cl^-}\longrightarrow\mathrm{AgCl(s)}+\mathrm{Na^+}+\mathrm{NO_3^-}.$$
Gli ioni sodio e nitrato compaiono identici nei due membri: non partecipano alla reazione, e si chiamano **ioni spettatori**. Eliminandoli si ottiene l'**equazione ionica netta**,
$$\mathrm{Ag^+(aq)}+\mathrm{Cl^-(aq)}\longrightarrow\mathrm{AgCl(s)},$$
che descrive la reazione nella sua forma essenziale: qualunque sale solubile d'argento, mescolato con qualunque cloruro solubile, dà lo stesso precipitato. Allo stesso modo, la neutralizzazione di qualunque acido forte con qualunque base forte si riduce a $\mathrm{H^+}+\mathrm{OH^-}\to\mathrm{H_2O}$.

In un'equazione ionica bilanciata devono tornare sia gli atomi sia le cariche: la somma delle cariche a sinistra deve essere uguale a quella a destra. Nell'equazione netta della precipitazione la carica è zero da entrambe le parti.

## Il reagente limitante {#limitante}

Nella realtà i reagenti raramente sono nelle proporzioni esatte dell'equazione. Uno dei due si esaurisce prima dell'altro, e quando è finito la reazione si ferma, anche se dell'altro reagente ne resta. Il reagente che si esaurisce per primo si chiama **reagente limitante**, perché limita la quantità di prodotto che si può formare; l'altro è il **reagente in eccesso**. Una bottega che ha dieci telai di bicicletta e quindici ruote può montare soltanto sette biciclette: le ruote, che ne servono due per bicicletta, sono il «reagente» limitante, e restano tre telai inutilizzati.

::: figura limitante
{"w":640,"h":260,"items":[{"t":"circle","p":[53,60,9],"c":"ax"},{"t":"circle","p":[67,60,9],"c":"ax"},{"t":"circle","p":[113,60,9],"c":"ax"},{"t":"circle","p":[127,60,9],"c":"ax"},{"t":"circle","p":[53,110,9],"c":"ax"},{"t":"circle","p":[67,110,9],"c":"ax"},{"t":"circle","p":[113,110,9],"c":"ax"},{"t":"circle","p":[127,110,9],"c":"ax"},{"t":"circle","p":[83,160,9],"c":"ax"},{"t":"circle","p":[97,160,9],"c":"ax"},{"t":"circle","p":[209,80,14],"c":"force4"},{"t":"circle","p":[231,80,14],"c":"force4"},{"t":"circle","p":[209,140,14],"c":"force4"},{"t":"circle","p":[231,140,14],"c":"force4"},{"t":"arrow","p":[290,110,350,110],"c":"force3","w":2.4,"head":9},{"t":"circle","p":[410,70,14],"c":"force4"},{"t":"circle","p":[395,81,9],"c":"ax"},{"t":"circle","p":[425,81,9],"c":"ax"},{"t":"circle","p":[490,70,14],"c":"force4"},{"t":"circle","p":[475,81,9],"c":"ax"},{"t":"circle","p":[505,81,9],"c":"ax"},{"t":"circle","p":[410,140,14],"c":"force4"},{"t":"circle","p":[395,151,9],"c":"ax"},{"t":"circle","p":[425,151,9],"c":"ax"},{"t":"circle","p":[490,140,14],"c":"force4"},{"t":"circle","p":[475,151,9],"c":"ax"},{"t":"circle","p":[505,151,9],"c":"ax"},{"t":"circle","p":[573,110,9],"c":"ax"},{"t":"circle","p":[587,110,9],"c":"ax"},{"t":"poly","pts":[[560,90],[600,90],[600,130],[560,130]],"close":true,"c":"force","w":1.4,"dash":true},{"t":"text","p":[140,220],"s":"5 H₂ + 2 O₂","c":"ax","size":13},{"t":"text","p":[470,220],"s":"4 H₂O","c":"ax","size":13},{"t":"text","p":[580,220],"s":"1 H₂","c":"force","size":13},{"t":"text","p":[330,246],"s":"l'ossigeno finisce per primo: è il reagente limitante","c":"muted","size":11}]}
---
Cinque molecole di idrogeno e due di ossigeno. Le due molecole di ossigeno bastano per quattro molecole di idrogeno; quando sono finite si sono formate quattro molecole d'acqua, e una molecola di idrogeno resta inutilizzata.
:::

::: metodo Trovare il reagente limitante
1. Scrivere l'equazione bilanciata.
2. Calcolare la quantità chimica di ciascun reagente.
3. Dividere la quantità di ciascun reagente per il suo coefficiente nell'equazione.
4. Il reagente con il quoziente più piccolo è il limitante; il valore del quoziente è il numero di «volte» che la reazione, come scritta, può avvenire.
5. Calcolare i prodotti a partire dal reagente limitante, e la quantità di reagente in eccesso consumata e rimasta.
:::

::: esempio I serbatoi del modulo di servizio
I serbatoi del modulo sono caricati con $100\un{kg}$ di idrogeno e $600\un{kg}$ di ossigeno. Quale dei due è il reagente limitante della reazione $2\,\mathrm{H_2}+\mathrm{O_2}\to2\,\mathrm{H_2O}$? Quanta acqua si forma, e quanto reagente resta inutilizzato?

L'idrogeno è $100\,000/2{,}016\simeq49{,}6\times10^3\un{mol}$, l'ossigeno $600\,000/32{,}00\simeq18{,}75\times10^3\un{mol}$. Divisi per i coefficienti, $2$ e $1$, danno $24{,}8\times10^3$ e $18{,}75\times10^3$: il limitante è l'ossigeno. Si formano $2\times18{,}75\times10^3=37{,}5\times10^3\un{mol}$ di acqua, cioè $676\un{kg}$. L'idrogeno consumato è $37{,}5\times10^3\un{mol}$, cioè $75{,}6\un{kg}$, e ne restano $24{,}4\un{kg}$. Controllo: $100+600=700\un{kg}$ di reagenti, $676+24{,}4\simeq700\un{kg}$ di prodotti e residui.
:::

::: esempio Il limitante in soluzione
Si mescolano $50{,}0\un{mL}$ di cloruro di bario $0{,}100\un{M}$ e $40{,}0\un{mL}$ di solfato di sodio $0{,}150\un{M}$. Precipita solfato di bario, $\mathrm{Ba^{2+}}+\mathrm{SO_4^{2-}}\to\mathrm{BaSO_4(s)}$, $M=233{,}39\un{g/mol}$. Calcolare la massa del precipitato e la concentrazione dello ione in eccesso rimasto in soluzione.

Gli ioni bario sono $0{,}0500\times0{,}100=5{,}00\times10^{-3}\un{mol}$, gli ioni solfato $0{,}0400\times0{,}150=6{,}00\times10^{-3}\un{mol}$. I coefficienti sono uguali, e il limitante è il bario. Si formano $5{,}00\times10^{-3}\un{mol}$ di precipitato, cioè $1{,}17\un{g}$, e restano $1{,}00\times10^{-3}\un{mol}$ di solfato in $90{,}0\un{mL}$: una concentrazione di $0{,}0111\un{M}$.
:::

Nella pratica i chimici usano spesso di proposito un eccesso di uno dei reagenti, di solito il più economico o il più facile da eliminare alla fine, per essere sicuri che il reagente più prezioso si consumi completamente. Nelle precipitazioni analitiche l'eccesso di reagente precipitante, come si è visto nel capitolo [Solubilità ed equilibrio eterogeneo](unit:chemistry-13), serve anche a rendere trascurabile la quantità di sostanza che resta disciolta.

La figura seguente mostra la stessa idea in modo continuo: fissata la quantità di idrogeno, la massa d'acqua prodotta cresce con l'ossigeno aggiunto finché l'ossigeno è il limitante, poi resta costante, perché il limitante è diventato l'idrogeno.

::: figura rapporto
{"w":640,"h":306,"items":[{"t":"axes","o":[80,250],"x":[520,""],"y":[200,""],"sx":36,"sy":18,"xt":[[2,"2"],[4,"4"],[6,"6"],[8,"8"],[10,"10"],[12,"12"],[14,"14"]],"yt":[[2,"2"],[4,"4"],[6,"6"],[8,"8"],[10,"10"]]},{"t":"text","p":[40,30],"s":"acqua prodotta (g)","c":"ax","size":12,"a":"start"},{"t":"text","p":[610,292],"s":"ossigeno aggiunto a 1,000 g di idrogeno (g)","c":"ax","size":13,"a":"end"},{"t":"plot","o":[80,250],"sx":36,"sy":18,"pts":[[0,0],[7.93601,8.9360119],[14,8.9360119]],"c":"force2","w":2.6},{"t":"plot","o":[80,250],"sx":36,"sy":18,"pts":[[7.93601,0],[7.93601,8.9360119]],"c":"muted","w":1.2,"dash":true},{"t":"circle","p":[365.7,89.2,5],"c":"force4"},{"t":"text","p":[365.7,77.2],"s":"7,94 g di O₂: 8,94 g di acqua","c":"ax","size":11},{"t":"text","p":[214.0,195.1],"s":"limita l'ossigeno","c":"force3","size":11,"a":"start"},{"t":"text","p":[476,107.2],"s":"limita l'idrogeno","c":"force","size":11}]}
---
Massa d'acqua prodotta da $1{,}000\un{g}$ di idrogeno in funzione della massa di ossigeno aggiunta. Il punto d'angolo corrisponde al rapporto stechiometrico, $7{,}94\un{g}$ di ossigeno per grammo di idrogeno.
:::

::: quotidiano Perché i razzi bruciano troppo idrogeno
Il rapporto stechiometrico fra ossigeno e idrogeno è di circa otto a uno in massa, eppure i motori a idrogeno e ossigeno liquidi funzionano quasi tutti con un rapporto intorno a sei a uno: i motori principali dello Space Shuttle, per esempio, a circa $6{,}0$. Un quarto dell'idrogeno esce dall'ugello senza bruciare. Non si tratta di uno spreco. La spinta di un razzo dipende dalla velocità dei gas di scarico, che a parità di temperatura è tanto maggiore quanto più leggere sono le molecole: una miscela di vapore acqueo e idrogeno, più leggera del vapore puro, esce più veloce. Inoltre una fiamma meno calda risparmia le pareti della camera di combustione. È un caso in cui il reagente in eccesso è scelto di proposito.
:::

## L'avanzamento di una reazione {#avanzamento}

Per seguire una reazione mentre procede conviene una grandezza unica, l'**avanzamento** $\xi$, che si misura in moli. Quando la reazione è avanzata di $\xi$, la quantità di ogni sostanza è cambiata del suo coefficiente moltiplicato per $\xi$: diminuita per i reagenti, aumentata per i prodotti. Per la sintesi dell'ammoniaca, partendo da $n_0$ moli di ciascuna sostanza,

$$n(\mathrm{N_2})=n_0(\mathrm{N_2})-\xi,\qquad n(\mathrm{H_2})=n_0(\mathrm{H_2})-3\xi,\qquad n(\mathrm{NH_3})=n_0(\mathrm{NH_3})+2\xi.$$

La reazione può avanzare finché nessuna quantità diventa negativa; il valore massimo di $\xi$ è fissato dal reagente limitante, e coincide con il quoziente minimo del metodo precedente.

::: approfondimento Avanzamento e conversione
Nell'industria si usa spesso la **conversione** di un reagente, la frazione della quantità iniziale che ha reagito: $X=(n_0-n)/n_0$. Per un reagente con coefficiente $a$, la conversione è legata all'avanzamento da $X=a\,\xi/n_0$, e vale uno quando il reagente limitante è esaurito. Nella sintesi industriale dell'ammoniaca, a causa dell'equilibrio che si studierà più avanti, la miscela di azoto e idrogeno che attraversa il reattore si converte soltanto in parte a ogni passaggio, intorno al quindici per cento. L'ammoniaca formata viene separata per condensazione, e i gas rimasti tornano all'ingresso del reattore insieme a gas freschi. Grazie a questo riciclo la conversione complessiva delle materie prime si avvicina al cento per cento, anche se a ogni passaggio ne reagisce soltanto una piccola parte. L'avanzamento e la conversione sono gli strumenti con cui si scrivono i bilanci di materia di questi impianti, l'argomento del capitolo successivo.
:::

::: figura avanzamento
{"w":620,"h":306,"items":[{"t":"axes","o":[80,250],"x":[460,""],"y":[200,""],"sx":380,"sy":60,"xt":[[0.25,"0,25"],[0.5,"0,50"],[0.75,"0,75"],[1.0,"1,00"]],"yt":[[1,"1"],[2,"2"],[3,"3"]]},{"t":"text","p":[40,30],"s":"quantità (mol)","c":"ax","size":12,"a":"start"},{"t":"text","p":[560,292],"s":"avanzamento ξ (mol)","c":"ax","size":13,"a":"end"},{"t":"plot","o":[80,250],"sx":380,"sy":60,"pts":[[0,2],[1,1]],"c":"force2","w":2.6},{"t":"text","p":[468,194],"s":"N₂  1","c":"force2","size":12,"a":"start"},{"t":"plot","o":[80,250],"sx":380,"sy":60,"pts":[[0,3],[1,0]],"c":"force4","w":2.6},{"t":"text","p":[468,254],"s":"H₂  0","c":"force4","size":12,"a":"start"},{"t":"plot","o":[80,250],"sx":380,"sy":60,"pts":[[0,0],[1,2]],"c":"force3","w":2.6},{"t":"text","p":[468,134],"s":"NH₃  2","c":"force3","size":12,"a":"start"},{"t":"plot","o":[80,250],"sx":380,"sy":60,"pts":[[1,0],[1,3.1]],"c":"muted","w":1.2,"dash":true},{"t":"text","p":[456,58.0],"s":"H₂ esaurito","c":"muted","size":11,"a":"end"}]}
---
Quantità di azoto, idrogeno e ammoniaca in funzione dell'avanzamento, partendo da $2$ moli di azoto e $3$ di idrogeno. L'idrogeno si esaurisce per $\xi=1\un{mol}$: restano $1$ mole di azoto e si sono formate $2$ moli di ammoniaca.
:::

Il calcolo si organizza in una tabella a tre righe, quantità iniziali, variazioni e quantità finali, che sarà usata di nuovo nel capitolo [Equilibrio chimico](unit:chemistry-19). Lì si vedrà che molte reazioni si fermano prima che il reagente limitante sia esaurito, a un valore di equilibrio dell'avanzamento.

| | $\mathrm{N_2}$ | $\mathrm{H_2}$ | $\mathrm{NH_3}$ |
|---|---|---|---|
| iniziale | $2$ | $3$ | $0$ |
| variazione | $-\xi$ | $-3\xi$ | $+2\xi$ |
| finale, $\xi=1$ | $1$ | $0$ | $2$ |

## Reazioni in più passaggi {#passaggi}

Molti prodotti industriali si ottengono attraverso una sequenza di reazioni, in cui il prodotto di un passaggio è il reagente del successivo. Per calcolare quanto prodotto finale si ottiene da una certa quantità di materia prima basta combinare i rapporti stechiometrici dei singoli passaggi, senza calcolare ogni intermedio, oppure seguire un elemento che passa intatto dall'inizio alla fine.

Nel processo messo a punto da Wilhelm Ostwald all'inizio del Novecento, l'acido nitrico si produce dall'ammoniaca in tre passaggi: l'ossidazione dell'ammoniaca a monossido di azoto su una rete di platino, $4\,\mathrm{NH_3}+5\,\mathrm{O_2}\to4\,\mathrm{NO}+6\,\mathrm{H_2O}$; l'ossidazione del monossido a diossido, $2\,\mathrm{NO}+\mathrm O_2\to2\,\mathrm{NO_2}$; l'assorbimento del diossido in acqua, $3\,\mathrm{NO_2}+\mathrm{H_2O}\to2\,\mathrm{HNO_3}+\mathrm{NO}$. Il monossido prodotto nell'ultimo passaggio torna nel secondo, e se tutto viene riciclato ogni atomo di azoto dell'ammoniaca finisce nell'acido. Il bilancio complessivo è

$$\mathrm{NH_3}+2\,\mathrm O_2\longrightarrow\mathrm{HNO_3}+\mathrm{H_2O},$$

e da una tonnellata di ammoniaca si ottengono al massimo $63{,}01/17{,}03\simeq3{,}70$ tonnellate di acido nitrico. Gran parte dell'acido nitrico prodotto nel mondo serve a fabbricare i nitrati dei fertilizzanti.

::: nota La stechiometria del respiro
Le cellule del corpo ricavano energia ossidando il glucosio, con un bilancio complessivo uguale a quello della sua combustione: $\mathrm{C_6H_{12}O_6}+6\,\mathrm O_2\to6\,\mathrm{CO_2}+6\,\mathrm{H_2O}$. Cento grammi di glucosio, $0{,}555\un{mol}$, consumano $3{,}33\un{mol}$ di ossigeno e producono altrettante moli di anidride carbonica, cioè $147\un{g}$, che a $25\,^\circ\mathrm{C}$ e $1\un{bar}$ occupano circa $83\un{L}$. Una persona adulta a riposo espira in un giorno circa un chilogrammo di anidride carbonica: è il carbonio degli alimenti che torna nell'atmosfera, attraverso i polmoni, nello stesso stato da cui le piante lo avevano tolto con la fotosintesi.
:::

::: storia Richter e la misura degli elementi
La parola stechiometria fu coniata da Jeremias Benjamin Richter, un chimico tedesco che lavorava come assaggiatore nelle miniere della Slesia e poi nella manifattura di porcellane di Berlino. Fra il 1792 e il 1794 pubblicò un'opera in tre volumi in cui mostrava che gli acidi e le basi si neutralizzano sempre in proporzioni di massa fisse, e compilò le prime tabelle di «pesi equivalenti». Richter era convinto che la chimica dovesse diventare una scienza matematica, e cercò, senza riuscirci, regolarità numeriche nei suoi dati. Le sue proporzioni fisse divennero però uno dei fondamenti su cui John Dalton, dieci anni dopo, costruì la teoria atomica, che ne diede finalmente la spiegazione.
:::

## Errori frequenti {#errori}

::: errore Bilanciare cambiando le formule
Le formule sono fissate dalla natura delle sostanze; si possono cambiare soltanto i coefficienti. Aggiungere un indice per far tornare i conti trasforma un reagente o un prodotto in un'altra sostanza.
:::

::: errore Rapporti fra masse al posto di rapporti fra moli
I coefficienti stabiliscono rapporti fra quantità chimiche. Per passare alle masse bisogna moltiplicare per le masse molari: nella sintesi dell'ammoniaca un grammo di azoto reagisce con $0{,}216\un{g}$ di idrogeno, non con tre grammi.
:::

::: errore Il limitante è il reagente presente in quantità minore
Conta la quantità divisa per il coefficiente, e conta in moli. Nell'esempio dei serbatoi l'idrogeno pesa sei volte meno dell'ossigeno, eppure è in eccesso.
:::

::: errore Calcolare il prodotto dal reagente in eccesso
La quantità di prodotto si calcola dal reagente limitante. Partendo dal reagente in eccesso si otterrebbe un valore troppo grande, che la reazione non può raggiungere.
:::

::: errore Dimenticare che il volume cambia nelle reazioni fra gas
Nelle reazioni fra gas il numero di moli può cambiare, e con esso il volume a temperatura e pressione costanti. Nella sintesi dell'ammoniaca quattro volumi di reagenti diventano due volumi di prodotto.
:::

## Sintesi {#sintesi}

::: sintesi Che cosa portare con sé
- Nelle reazioni chimiche gli atomi si ricombinano senza crearsi né distruggersi, e la massa totale si conserva.
- Un'equazione è bilanciata quando ogni elemento compare con lo stesso numero di atomi nei due membri; si bilancia cambiando i coefficienti, mai le formule.
- I coefficienti danno i rapporti fra le quantità chimiche; ogni calcolo stechiometrico passa per le moli.
- Masse, volumi di soluzione e volumi di gas si convertono in moli con $n=m/M$, $n=cV$ e $n=PV/(RT)$.
- Il reagente limitante è quello con il rapporto più piccolo fra quantità chimica e coefficiente; da esso si calcolano i prodotti.
- Il reagente in eccesso consumato si calcola dal limitante; il resto rimane inutilizzato.
- Nelle equazioni ioniche nette si eliminano gli ioni spettatori; devono tornare sia gli atomi sia le cariche.
- Nelle sequenze di reazioni si combinano i rapporti stechiometrici dei singoli passaggi, oppure si segue un elemento che passa intatto dalla materia prima al prodotto.
- L'avanzamento $\xi$ descrive in un'unica grandezza le variazioni di tutte le sostanze di una reazione.
:::

## Glossario {#glossario}

- **Stechiometria**: studio dei rapporti quantitativi fra reagenti e prodotti di una reazione.
- **Legge di conservazione della massa**: in una reazione chimica la massa totale di reagenti e prodotti resta costante.
- **Equazione chimica**: rappresentazione di una reazione con le formule di reagenti e prodotti.
- **Coefficiente stechiometrico**: numero che precede una formula in un'equazione bilanciata.
- **Equazione bilanciata**: equazione in cui ogni elemento compare con lo stesso numero di atomi nei due membri.
- **Rapporto stechiometrico**: rapporto fra i coefficienti di due sostanze, usato per convertire le quantità chimiche.
- **Reagente limitante**: reagente che si esaurisce per primo e determina la quantità di prodotto.
- **Reagente in eccesso**: reagente presente in quantità maggiore di quella richiesta dal limitante.
- **Titolazione**: determinazione della concentrazione di una soluzione misurando il volume di un'altra soluzione, di concentrazione nota, che reagisce con essa.
- **Avanzamento**: grandezza, misurata in moli, che descrive di quanto è proceduta una reazione.

## Esercizi {#esercizi}

Masse molari in $\mathrm{g/mol}$: $\mathrm H_2$ $2{,}016$; $\mathrm O_2$ $32{,}00$; $\mathrm{H_2O}$ $18{,}015$; $\mathrm N_2$ $28{,}01$; $\mathrm{NH_3}$ $17{,}03$; $\mathrm{CH_4}$ $16{,}04$; $\mathrm{CO_2}$ $44{,}01$; $\mathrm{C_2H_5OH}$ $46{,}07$; $\mathrm{Mg}$ $24{,}31$; $\mathrm{Al}$ $26{,}98$; $\mathrm{Fe}$ $55{,}85$; $\mathrm{Fe_2O_3}$ $159{,}69$; $\mathrm{NaHCO_3}$ $84{,}01$; $\mathrm{S}$ $32{,}06$; $\mathrm{H_2SO_4}$ $98{,}08$.

::: esercizio Bilanciare [base]
Bilanciare le equazioni: $\mathrm{Al}+\mathrm{O_2}\to\mathrm{Al_2O_3}$; $\mathrm{C_3H_8}+\mathrm{O_2}\to\mathrm{CO_2}+\mathrm{H_2O}$; $\mathrm{Fe}+\mathrm{HCl}\to\mathrm{FeCl_2}+\mathrm{H_2}$; infine
$$\mathrm{Ca(OH)_2}+\mathrm{H_3PO_4}\longrightarrow\mathrm{Ca_3(PO_4)_2}+\mathrm{H_2O}.$$
>>> soluzione
$4\,\mathrm{Al}+3\,\mathrm{O_2}\to2\,\mathrm{Al_2O_3}$; $\mathrm{C_3H_8}+5\,\mathrm{O_2}\to3\,\mathrm{CO_2}+4\,\mathrm{H_2O}$; $\mathrm{Fe}+2\,\mathrm{HCl}\to\mathrm{FeCl_2}+\mathrm{H_2}$; e infine
$$3\,\mathrm{Ca(OH)_2}+2\,\mathrm{H_3PO_4}\longrightarrow\mathrm{Ca_3(PO_4)_2}+6\,\mathrm{H_2O}.$$
:::

::: esercizio Rapporti molari [base]
Nella sintesi dell'ammoniaca, $\mathrm{N_2}+3\,\mathrm{H_2}\to2\,\mathrm{NH_3}$, quante moli di ammoniaca si formano da $6{,}0\un{mol}$ di idrogeno, con azoto in eccesso? Quante moli di azoto servono?
>>> soluzione
Da tre moli di idrogeno se ne formano due di ammoniaca: da $6{,}0\un{mol}$ se ne formano $4{,}0\un{mol}$. Servono $2{,}0\un{mol}$ di azoto.
:::

::: esercizio L'ossigeno per il metano [base]
Calcolare la massa di ossigeno necessaria per bruciare completamente $10{,}0\un{g}$ di metano, $\mathrm{CH_4}+2\,\mathrm{O_2}\to\mathrm{CO_2}+2\,\mathrm{H_2O}$.
>>> soluzione
Il metano è $10{,}0/16{,}04\simeq0{,}623\un{mol}$; servono il doppio di moli di ossigeno, $1{,}247\un{mol}$, cioè circa $39{,}9\un{g}$, quattro volte la massa del metano.
:::

::: esercizio Contare le molecole [base]
In un recipiente ci sono $10$ molecole di idrogeno e $7$ molecole di ossigeno. Quante molecole d'acqua si possono formare? Quale reagente è limitante, e quante molecole ne restano dell'altro?
>>> soluzione
Dieci molecole di idrogeno richiedono cinque di ossigeno: l'idrogeno è il limitante. Si formano $10$ molecole d'acqua e restano $2$ molecole di ossigeno.
:::

::: esercizio Il magnesio nell'acido [base]
Calcolare il volume di acido cloridrico $0{,}200\un{M}$ necessario per far reagire completamente $0{,}500\un{g}$ di magnesio, $\mathrm{Mg}+2\,\mathrm{HCl}\to\mathrm{MgCl_2}+\mathrm{H_2}$.
>>> soluzione
Il magnesio è $0{,}500/24{,}31\simeq0{,}0206\un{mol}$; servono $0{,}0411\un{mol}$ di acido, contenute in $0{,}0411/0{,}200\simeq0{,}206\un{L}$, cioè circa $206\un{mL}$.
:::

::: esercizio L'anidride carbonica dell'etanolo [medio]
Calcolare la massa di anidride carbonica prodotta dalla combustione di un litro di etanolo, densità $0{,}789\un{g/mL}$, $\mathrm{C_2H_5OH}+3\,\mathrm{O_2}\to2\,\mathrm{CO_2}+3\,\mathrm{H_2O}$, e confrontarla con quella dell'ottano dell'esempio, $2{,}17\un{kg}$.
>>> soluzione
Un litro di etanolo pesa $789\un{g}$, cioè $17{,}13\un{mol}$, e produce $34{,}25\un{mol}$ di anidride carbonica, circa $1{,}51\un{kg}$. È meno dell'ottano: l'etanolo contiene già un atomo di ossigeno per molecola, e una parte della sua massa non è carbonio.
:::

::: esercizio Termite con un reagente in eccesso [medio]
Si mescolano $50{,}0\un{g}$ di alluminio e $100\un{g}$ di ossido di ferro(III). Individuare il reagente limitante, la massa di ferro prodotta e la massa di reagente in eccesso che resta.
>>> soluzione
L'ossido è $0{,}6262\un{mol}$ e richiederebbe $1{,}252\un{mol}$ di alluminio, cioè $33{,}8\un{g}$; l'alluminio disponibile è di più, e il limitante è l'ossido. Si formano $1{,}252\un{mol}$ di ferro, circa $69{,}9\un{g}$, e restano $50{,}0-33{,}8=16{,}2\un{g}$ di alluminio.
:::

::: esercizio Acqua da idrogeno e ossigeno [medio]
Si fanno reagire $10{,}0\un{g}$ di idrogeno e $64{,}0\un{g}$ di ossigeno. Calcolare la massa d'acqua formata e la massa di reagente in eccesso rimasta, e verificare la conservazione della massa.
>>> soluzione
L'idrogeno è $4{,}96\un{mol}$, l'ossigeno $2{,}00\un{mol}$; divisi per i coefficienti danno $2{,}48$ e $2{,}00$, e il limitante è l'ossigeno. Si formano $4{,}00\un{mol}$ d'acqua, $72{,}1\un{g}$; dell'idrogeno se ne consumano $4{,}00\un{mol}$ e restano $0{,}96\un{mol}$, cioè $1{,}9\un{g}$. Controllo: $72{,}1+1{,}9=74{,}0\un{g}$, come i reagenti.
:::

::: esercizio Una titolazione [medio]
Per neutralizzare $25{,}0\un{mL}$ di una soluzione di acido solforico servono $30{,}0\un{mL}$ di idrossido di sodio $0{,}120\un{M}$. Calcolare la concentrazione dell'acido.
>>> soluzione
La base consumata è $0{,}0300\times0{,}120=3{,}60\times10^{-3}\un{mol}$, e reagisce con la metà di moli di acido, $1{,}80\times10^{-3}\un{mol}$. La concentrazione è $1{,}80\times10^{-3}/0{,}0250=0{,}0720\un{M}$.
:::

::: esercizio Il bicarbonato in una miscela [medio]
Un campione di $2{,}00\un{g}$ di una miscela di idrogenocarbonato di sodio e cloruro di sodio viene scaldato. L'idrogenocarbonato si decompone secondo
$$2\,\mathrm{NaHCO_3(s)}\longrightarrow\mathrm{Na_2CO_3(s)}+\mathrm{H_2O(g)}+\mathrm{CO_2(g)},$$
mentre il cloruro di sodio resta inalterato. La massa diminuisce di $0{,}400\un{g}$. Calcolare la percentuale in massa di idrogenocarbonato nella miscela.
>>> soluzione
La perdita di massa è dovuta all'acqua e all'anidride carbonica: $18{,}02+44{,}01=62{,}03\un{g}$ per ogni $2$ moli, cioè $168{,}02\un{g}$, di idrogenocarbonato decomposto. L'idrogenocarbonato nel campione è quindi $0{,}400\times168{,}02/62{,}03\simeq1{,}08\un{g}$, il $54\%$ della miscela.
:::

::: esercizio Bilanciare con l'algebra [avanzato]
Bilanciare con il metodo algebrico la reazione fra permanganato di potassio e acido cloridrico:
$$\begin{aligned}&a\,\mathrm{KMnO_4}+b\,\mathrm{HCl}\longrightarrow\\&\quad c\,\mathrm{KCl}+d\,\mathrm{MnCl_2}+e\,\mathrm{Cl_2}+f\,\mathrm{H_2O}.\end{aligned}$$
>>> soluzione
Le equazioni per gli elementi sono: K, $a=c$; Mn, $a=d$; O, $4a=f$; H, $b=2f$; Cl, $b=c+2d+2e$. Ponendo $a=2$: $c=2$, $d=2$, $f=8$, $b=16$, e dal cloro $16=2+4+2e$, cioè $e=5$. L'equazione bilanciata è
$$\begin{aligned}&2\,\mathrm{KMnO_4}+16\,\mathrm{HCl}\longrightarrow\\&\quad2\,\mathrm{KCl}+2\,\mathrm{MnCl_2}+5\,\mathrm{Cl_2}+8\,\mathrm{H_2O}.\end{aligned}$$
:::

::: esercizio L'ammoniaca con l'avanzamento [avanzato]
Si mettono a reagire $28{,}0\un{g}$ di azoto e $9{,}0\un{g}$ di idrogeno. Scrivere le quantità in funzione dell'avanzamento, trovare l'avanzamento massimo e calcolare le masse finali, supponendo che la reazione sia completa.
>>> soluzione
Le quantità iniziali sono $1{,}00\un{mol}$ di azoto e $4{,}46\un{mol}$ di idrogeno: $n(\mathrm{N_2})=1{,}00-\xi$, $n(\mathrm{H_2})=4{,}46-3\xi$, $n(\mathrm{NH_3})=2\xi$. L'azoto si esaurisce per $\xi=1{,}00$, l'idrogeno per $\xi=1{,}49$: l'avanzamento massimo è $1{,}00\un{mol}$, e il limitante è l'azoto. Alla fine si hanno $2{,}00\un{mol}$ di ammoniaca, $34{,}0\un{g}$, e $1{,}47\un{mol}$ di idrogeno, $3{,}0\un{g}$: in tutto $37{,}0\un{g}$, come i reagenti.
:::

::: esercizio Quanto idrogeno esce dal razzo [avanzato]
Un motore brucia idrogeno e ossigeno con un rapporto in massa di $6{,}0$ chilogrammi di ossigeno per chilogrammo di idrogeno. Calcolare il rapporto stechiometrico in massa e la frazione dell'idrogeno che esce senza bruciare.
>>> soluzione
Il rapporto stechiometrico è $32{,}00/(2\times2{,}016)\simeq7{,}94$. Sei chilogrammi di ossigeno sono $187{,}5\un{mol}$, e bruciano $375\un{mol}$ di idrogeno, cioè $0{,}756\un{kg}$: il $24\%$ dell'idrogeno, circa un quarto, resta incombusto.
:::

::: esercizio Volumi di gas [avanzato]
In un recipiente si mescolano $2{,}0\un{L}$ di idrogeno e $2{,}0\un{L}$ di ossigeno, alla stessa temperatura e pressione, e si fa scoccare una scintilla. Dopo che il sistema è tornato alla temperatura iniziale, a cui l'acqua è liquida, quale volume di gas resta, e di che gas si tratta? Il volume dell'acqua liquida è trascurabile.
>>> soluzione
A temperatura e pressione uguali i volumi stanno come le moli. Due litri di idrogeno reagiscono con un litro di ossigeno: l'idrogeno è il limitante, e resta $1{,}0\un{L}$ di ossigeno, oltre a un poco di vapore acqueo alla sua tensione di vapore.
:::

::: esercizio Dallo zolfo all'acido solforico [avanzato]
L'acido solforico si produce dallo zolfo in tre passaggi: $\mathrm S+\mathrm O_2\to\mathrm{SO_2}$; $2\,\mathrm{SO_2}+\mathrm O_2\to2\,\mathrm{SO_3}$; $\mathrm{SO_3}+\mathrm{H_2O}\to\mathrm{H_2SO_4}$. Calcolare la massa massima di acido solforico che si ottiene da una tonnellata di zolfo, e la massa totale di ossigeno consumata.
>>> soluzione
Seguendo gli atomi di zolfo, ogni mole di zolfo diventa una mole di acido. Una tonnellata di zolfo è $31{,}2\times10^3\un{mol}$, e dà al massimo $31{,}2\times10^3\times98{,}08\un{g}\simeq3{,}06\un{t}$ di acido. Per ogni mole di zolfo servono una mole di ossigeno nel primo passaggio e mezza nel secondo: $1{,}5\times31{,}2\times10^3\un{mol}$, cioè circa $1{,}50\un{t}$ di ossigeno.
:::

## Fonti {#fonti}

Il testo, le figure, gli esempi e gli esercizi di questo capitolo sono originali. Per la scelta e l'ordine degli argomenti il riferimento principale è il manuale di R. H. Petrucci, F. G. Herring, J. D. Madura e C. Bissonnette, *General Chemistry: Principles and Modern Applications*, 11ª edizione, Pearson Canada, Toronto, 2017, paragrafi 4-1–4-4 e 4-6. I dati numerici provengono dalle fonti seguenti.

1. Masse molari: pesi atomici standard IUPAC/CIAAW. Densità dell'ottano e dell'etanolo: CRC Handbook of Chemistry and Physics. Entalpia di formazione dell'acqua: tabella D.2 dell'appendice dello stesso manuale.
2. Rapporto fra ossidante e combustibile dei motori principali dello Space Shuttle: documentazione tecnica NASA sul motore RS-25.
3. Per la storia: A.-L. Lavoisier, *Traité élémentaire de chimie*, Parigi, 1789; J. B. Richter, *Anfangsgründe der Stöchyometrie*, Breslavia e Hirschberg, 1792–1794.
