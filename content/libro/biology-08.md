---
unit: biology-08
titolo: Energia, enzimi e catalisi
sottotitolo: Termodinamica dei viventi, accoppiamento, enzimi e primi catalizzatori minerali
volume: Volume di biologia
fonte: Testo originale; riferimenti principali A. M. Shaw, Astrochemistry, §8.2, 8.3; J. R. Morris et al., Biology: How Life Works, 2ª ed., §6.1–6.5
---

## Prima di cominciare {#apertura}

In ogni cellula che produce i nucleotidi dell'RNA, un enzima chiamato orotidina monofosfato decarbossilasi stacca una molecola di diossido di carbonio da un precursore dell'uracile. In acqua, a temperatura ambiente e senza catalizzatori, la stessa reazione è così lenta che metà delle molecole reagirebbe in circa settantotto milioni di anni. Con l'enzima, ogni sua molecola trasforma una quarantina di molecole di precursore al secondo. Il rapporto fra le due velocità è di circa cento milioni di miliardi, $10^{17}$: in un secondo di lavoro l'enzima compie ciò che l'acqua da sola farebbe in più di quattro miliardi di anni.

Questo numero riassume uno dei problemi centrali dell'origine della vita. La vita è chimica, e la chimica che le serve è spesso possibile dal punto di vista energetico ma lentissima. Le cellule moderne risolvono il problema con gli enzimi, catalizzatori fatti di proteine e talvolta di RNA, prodotti da geni che l'evoluzione ha selezionato per miliardi di anni. Prima dei geni e delle proteine, che cosa poteva accelerare le reazioni prebiotiche?

Questo capitolo distingue con cura due domande che spesso si confondono: se una reazione può avvenire, che è una domanda di termodinamica, e quanto velocemente avviene, che è una domanda di cinetica. Mostra come le cellule usano l'energia di una reazione per spingerne un'altra, come gli enzimi accelerano le reazioni senza cambiarne il bilancio energetico, e quali catalizzatori, fra i minerali e gli ioni metallici, potevano svolgere il loro ruolo sulla Terra primitiva.

::: obiettivi
- classificare gli organismi secondo le loro sorgenti di energia e di carbonio e descrivere il metabolismo;
- applicare il primo e il secondo principio della termodinamica ai sistemi viventi;
- calcolare la variazione di energia di Gibbs di una reazione in condizioni non standard e la sua costante di equilibrio;
- spiegare l'accoppiamento di una reazione sfavorevole con l'idrolisi dell'ATP;
- descrivere come un catalizzatore abbassa l'energia di attivazione e calcolare il fattore di accelerazione;
- usare il modello di Michaelis-Menten e discutere l'effetto della temperatura, del pH e degli inibitori;
- discutere il ruolo dei metalli e dei minerali come primi catalizzatori.
:::

Il capitolo usa l'energia di Gibbs del capitolo [Termochimica e calorimetria](unit:chemistry-16), l'equilibrio chimico del capitolo [Equilibrio chimico](unit:chemistry-19) e la legge di Arrhenius del capitolo [Temperatura e attivazione](unit:chemistry-18). Le reazioni prebiotiche lente di cui si parla sono quelle del capitolo [Miller-Urey e la sintesi prebiotica](unit:biology-07).

## Metabolismo ed energia {#metabolismo}

L'insieme delle reazioni chimiche di una cellula si chiama **metabolismo**. Una parte delle reazioni demolisce molecole complesse e ne ricava energia, il **catabolismo**; un'altra parte costruisce molecole complesse consumando energia, l'**anabolismo**. Le due parti sono collegate da poche molecole che trasportano energia, come l'ATP, ed elettroni, come il NADH.

Gli organismi si classificano secondo la loro sorgente di energia e di carbonio. I **fototrofi** ricavano energia dalla luce, i **chemiotrofi** da reazioni chimiche. Gli **autotrofi** costruiscono le proprie molecole a partire dal diossido di carbonio, gli **eterotrofi** usano molecole organiche già fatte. Le piante sono fotoautotrofe, gli animali chemioeterotrofi. Fra i microrganismi esistono tutte le combinazioni, e i chemioautotrofi, che ricavano energia da reazioni fra sostanze inorganiche come l'idrogeno e il diossido di carbonio, sono i candidati più citati come primi organismi, come si vede nel capitolo [Sorgenti idrotermali e metabolismo primordiale](unit:biology-09).

Per un astrobiologo la classificazione ha un significato pratico. Su un pianeta senza luce, come l'oceano sotto il ghiaccio di Europa, solo i chemiotrofi potrebbero vivere, e la quantità di vita possibile sarebbe limitata dalle sorgenti di energia chimica disponibili. La domanda «quanta energia è disponibile?» diventa una delle prime domande da porre per ogni ambiente abitabile.

## I principi della termodinamica nei viventi {#termodinamica}

Il **primo principio** afferma che l'energia si conserva: si trasforma da una forma all'altra, ma la sua quantità totale non cambia. Una cellula è incapace di creare energia, e la prende dall'ambiente, sotto forma di luce o di molecole ricche di energia, e la trasforma in lavoro chimico, meccanico ed elettrico, cedendo calore.

Il **secondo principio** afferma che in ogni trasformazione spontanea l'**entropia** totale dell'universo aumenta. L'entropia misura il numero di modi microscopici in cui un sistema può realizzare lo stesso stato macroscopico: un gas sparso in una stanza ha più entropia dello stesso gas chiuso in un angolo. Un organismo è un sistema molto ordinato, e la sua crescita sembra contraddire il secondo principio. La contraddizione scompare considerando l'ambiente: un organismo è un sistema aperto, che diminuisce la propria entropia aumentando di più quella dell'ambiente, a cui cede calore e molecole semplici. Erwin Schrödinger, nel 1944, descrisse i viventi come sistemi che si nutrono di ordine, un'idea già incontrata nel capitolo [Che cos'è la vita](unit:biology-01).

::: esempio Il calore di una persona
Un adulto a riposo consuma circa $8\,400\un{kJ}$ al giorno di energia chimica dal cibo. Divisa per i $86\,400$ secondi di una giornata, è una potenza di circa $97\un{W}$, quella di una lampadina a incandescenza. Quasi tutta quell'energia finisce come calore ceduto all'ambiente, e con essa l'entropia che l'organismo produce mantenendo il proprio ordine.
:::

## L'energia di Gibbs {#gibbs}

Per sapere se una reazione può avvenire spontaneamente a temperatura e pressione costanti, i chimici usano l'**energia di Gibbs**, $G=H-TS$, che combina l'entalpia $H$ e l'entropia $S$. Una reazione è spontanea se la sua energia di Gibbs diminuisce:

$$\Delta G=\Delta H-T\,\Delta S<0.$$

Una reazione con $\Delta G<0$ si dice **esoergonica** e può fornire lavoro; una con $\Delta G>0$ si dice **endoergonica** e richiede lavoro. All'equilibrio $\Delta G=0$.

La variazione di energia di Gibbs dipende dalle concentrazioni dei reagenti e dei prodotti. Se $\Delta G^\circ$ è il valore in condizioni standard, con tutte le specie alla concentrazione di $1\un{mol/L}$, in condizioni qualsiasi vale

::: legge Energia di Gibbs in condizioni non standard
$$\Delta G=\Delta G^\circ+RT\ln Q$$
dove $Q$ è il quoziente di reazione, il rapporto fra il prodotto delle concentrazioni dei prodotti e quello dei reagenti, ciascuna elevata al suo coefficiente. All'equilibrio $Q=K$ e $\Delta G=0$, quindi $K=\mathrm e^{-\Delta G^\circ/(RT)}$.
:::

In biochimica si usa una convenzione diversa per lo stato standard, con pH 7 invece di una concentrazione di ioni idrogeno di $1\un{mol/L}$, e il valore corrispondente si indica con $\Delta G^{\circ\prime}$. L'idrolisi dell'ATP in ADP e fosfato ha $\Delta G^{\circ\prime}=-30{,}5\un{kJ/mol}$. Nelle cellule le concentrazioni sono molto lontane da quelle standard: con circa $5\un{mmol/L}$ di ATP e di fosfato e $0{,}5\un{mmol/L}$ di ADP, a $37\,^\circ\mathrm C$, la variazione effettiva è

$$\begin{aligned}Q&=\frac{0{,}5\times10^{-3}\cdot5\times10^{-3}}{5\times10^{-3}}\\&=5\times10^{-4},\\\Delta G&=-30{,}5\un{kJ/mol}+RT\ln Q\\&\simeq-50\un{kJ/mol}.\end{aligned}$$

La cellula mantiene il rapporto fra ATP e ADP lontanissimo dall'equilibrio, e proprio questa distanza dall'equilibrio è la riserva di energia che usa per lavorare.

::: nota La vita lontano dall'equilibrio
Un sistema all'equilibrio non può fornire lavoro. Una cellula viva mantiene molte reazioni lontano dall'equilibrio: rapporti di concentrazione fra ATP e ADP, gradienti di ioni attraverso le membrane, potenziali elettrici. Quando la cellula muore, questi disequilibri si dissipano. Per un astrobiologo la presenza di un disequilibrio chimico duraturo in un ambiente, come quello fra l'ossigeno e il metano nell'atmosfera terrestre, può essere un indizio di vita, come si vede nel capitolo [Biofirme e falsi positivi](unit:biology-33).
:::

## Accoppiare le reazioni {#accoppiamento}

Molte reazioni utili alla cellula sono endoergoniche. La sintesi dell'amminoacido glutammina dall'acido glutammico e dall'ammonio, per esempio, ha $\Delta G^{\circ\prime}=+14{,}2\un{kJ/mol}$: all'equilibrio, a $25\,^\circ\mathrm C$, il rapporto fra prodotti e reagenti sarebbe circa $\mathrm e^{-14\,200/(RT)}\simeq3\times10^{-3}$, e la glutammina resterebbe rarissima. La cellula la produce **accoppiando** la reazione all'idrolisi dell'ATP: l'enzima glutammina sintetasi trasferisce prima un gruppo fosfato dall'ATP all'acido glutammico, formando un intermedio attivato, poi lo sostituisce con l'ammonio. Il risultato netto è la somma delle due reazioni (figura 1):

$$\Delta G^{\circ\prime}_\mathrm{tot}=+14{,}2-30{,}5=-16{,}3\un{kJ/mol}.$$

La reazione accoppiata è esoergonica, con una costante di equilibrio di circa $700$: quasi tutto l'acido glutammico può diventare glutammina.

::: figura accoppiamento
{"w":660,"h":320,"items":[{"t":"line","p":[70,130,620,130],"c":"muted","w":1.2},{"t":"text","p":[70,124],"s":"0","c":"muted","size":11,"a":"end"},{"t":"rect","p":[140,81.7,70,48.3],"c":"force3","r":3},{"t":"text","p":[175,73.7],"s":"+14,2 kJ/mol","c":"force3","size":12},{"t":"text","p":[175,300],"s":"glutammato + NH₄⁺ → glutammina","c":"ax","size":11},{"t":"rect","p":[310,130.0,70,103.7],"c":"force2","r":3},{"t":"text","p":[345,251.7],"s":"−30,5 kJ/mol","c":"force2","size":12},{"t":"text","p":[345,300],"s":"ATP → ADP + Pᵢ","c":"ax","size":11},{"t":"rect","p":[480,130.0,70,55.4],"c":"force","r":3},{"t":"text","p":[515,203.4],"s":"−16,3 kJ/mol","c":"force","size":12},{"t":"text","p":[515,300],"s":"reazione accoppiata","c":"ax","size":11},{"t":"text","p":[345,24],"s":"ΔG°′ a pH 7","c":"ax","size":13}]}
---
Accoppiamento energetico. La sintesi della glutammina, da sola, richiede energia; l'idrolisi dell'ATP ne libera di più. Un enzima che lega le due reazioni attraverso un intermedio comune rende la somma esoergonica.
:::

L'accoppiamento va oltre una somma algebrica fatta sulla carta, perché richiede un meccanismo chimico che leghi davvero le due reazioni, di solito un intermedio comune, come il gruppo fosfato trasferito. Un enzima che idrolizzasse l'ATP e, separatamente, unisse l'ammonio all'acido glutammico, sprecherebbe l'energia in calore. È uno dei problemi della chimica prebiotica: per formare legami che in acqua sono sfavoriti, come quelli fra gli amminoacidi nei peptidi e fra i nucleotidi negli acidi nucleici, servono molecole «attivate», che portano con sé l'energia necessaria e la cedono nella reazione stessa. Le forme attivate dei nucleotidi, con un gruppo imidazolico legato al fosfato, sono quelle che si usano negli esperimenti di copiatura dell'RNA senza enzimi, descritti nel capitolo [Il mondo a RNA](unit:biology-10).

## Velocità ed energia di attivazione {#velocita}

Che una reazione sia spontanea non dice nulla sulla sua velocità. Il glucosio e l'ossigeno reagiscono liberando circa $2870\un{kJ}$ per mole, ma lo zucchero nella zuccheriera dura anni senza bruciare. Fra i reagenti e i prodotti c'è una barriera, l'**energia di attivazione** $E_a$: per reagire, le molecole devono passare per una configurazione intermedia ad alta energia, lo **stato di transizione**, in cui i legami vecchi si stanno rompendo e quelli nuovi si stanno formando (figura 2).

::: figura profilo
{"w":640,"h":310,"items":[{"t":"poly","pts":[[80.0,140.0],[84.8,140.0],[89.6,140.0],[94.4,140.0],[99.2,140.0],[104.0,140.0],[108.8,140.0],[113.6,140.0],[118.4,140.0],[123.2,140.0],[128.0,140.0],[132.8,140.0],[137.6,140.0],[142.4,140.0],[147.2,140.0],[152.0,140.0],[156.8,139.9],[161.6,139.9],[166.4,139.8],[171.2,139.7],[176.0,139.6],[180.8,139.3],[185.6,139.1],[190.4,138.7],[195.2,138.2],[200.0,137.5],[204.8,136.6],[209.6,135.5],[214.4,134.1],[219.2,132.3],[224.0,130.2],[228.8,127.6],[233.6,124.5],[238.4,120.9],[243.2,116.7],[248.0,112.0],[252.8,106.8],[257.6,101.1],[262.4,94.9],[267.2,88.4],[272.0,81.6],[276.8,74.8],[281.6,68.1],[286.4,61.7],[291.2,55.8],[296.0,50.7],[300.8,46.4],[305.6,43.3],[310.4,41.4],[315.2,40.9],[320.0,41.9],[324.8,44.4],[329.6,48.5],[334.4,53.9],[339.2,60.8],[344.0,68.9],[348.8,78.0],[353.6,88.0],[358.4,98.6],[363.2,109.6],[368.0,120.9],[372.8,132.1],[377.6,143.1],[382.4,153.7],[387.2,163.8],[392.0,173.2],[396.8,181.9],[401.6,189.8],[406.4,196.9],[411.2,203.3],[416.0,208.8],[420.8,213.7],[425.6,217.8],[430.4,221.4],[435.2,224.4],[440.0,227.0],[444.8,229.1],[449.6,230.9],[454.4,232.4],[459.2,233.7],[464.0,234.7],[468.8,235.6],[473.6,236.3],[478.4,236.9],[483.2,237.4],[488.0,237.8],[492.8,238.1],[497.6,238.4],[502.4,238.7],[507.2,238.9],[512.0,239.1],[516.8,239.2],[521.6,239.3],[526.4,239.4],[531.2,239.5],[536.0,239.6],[540.8,239.7],[545.6,239.7],[550.4,239.8],[555.2,239.8],[560.0,239.8]],"c":"force2","w":2.6},{"t":"poly","pts":[[80.0,140.0],[84.8,140.0],[89.6,140.0],[94.4,140.0],[99.2,140.0],[104.0,140.0],[108.8,140.0],[113.6,140.0],[118.4,140.0],[123.2,140.0],[128.0,140.0],[132.8,140.0],[137.6,140.0],[142.4,140.0],[147.2,140.0],[152.0,140.0],[156.8,140.0],[161.6,140.0],[166.4,140.0],[171.2,139.9],[176.0,139.9],[180.8,139.8],[185.6,139.7],[190.4,139.5],[195.2,139.4],[200.0,139.1],[204.8,138.8],[209.6,138.3],[214.4,137.8],[219.2,137.1],[224.0,136.3],[228.8,135.3],[233.6,134.1],[238.4,132.7],[243.2,131.0],[248.0,129.2],[252.8,127.2],[257.6,125.0],[262.4,122.6],[267.2,120.1],[272.0,117.6],[276.8,115.1],[281.6,112.6],[286.4,110.4],[291.2,108.4],[296.0,106.7],[300.8,105.6],[305.6,104.9],[310.4,104.9],[315.2,105.5],[320.0,106.9],[324.8,109.0],[329.6,111.9],[334.4,115.6],[339.2,119.9],[344.0,124.9],[348.8,130.5],[353.6,136.6],[358.4,143.1],[363.2,149.9],[368.0,156.8],[372.8,163.9],[377.6,170.8],[382.4,177.6],[387.2,184.1],[392.0,190.4],[396.8,196.2],[401.6,201.6],[406.4,206.5],[411.2,210.9],[416.0,214.9],[420.8,218.4],[425.6,221.5],[430.4,224.2],[435.2,226.6],[440.0,228.6],[444.8,230.3],[449.6,231.8],[454.4,233.1],[459.2,234.1],[464.0,235.0],[468.8,235.8],[473.6,236.5],[478.4,237.0],[483.2,237.5],[488.0,237.9],[492.8,238.2],[497.6,238.5],[502.4,238.7],[507.2,238.9],[512.0,239.1],[516.8,239.2],[521.6,239.3],[526.4,239.4],[531.2,239.5],[536.0,239.6],[540.8,239.7],[545.6,239.7],[550.4,239.8],[555.2,239.8],[560.0,239.8]],"c":"force","w":2.6,"dash":true},{"t":"line","p":[60,140,140,140],"c":"muted","w":1,"dash":true},{"t":"text","p":[60,132],"s":"reagenti","c":"ax","size":11,"a":"start"},{"t":"line","p":[500,240,600,240],"c":"muted","w":1,"dash":true},{"t":"text","p":[600,232],"s":"prodotti","c":"ax","size":11,"a":"end"},{"t":"arrow","p":[323.2,140,323.2,42.9],"c":"force2","w":1.6,"head":8},{"t":"text","p":[331.2,70.9],"s":"Eₐ senza catalizzatore","c":"force2","size":11,"a":"start"},{"t":"arrow","p":[300.4,140,300.4,106.9],"c":"force","w":1.6,"head":8},{"t":"text","p":[296.4,160],"s":"Eₐ con","c":"force","size":11,"a":"end"},{"t":"text","p":[296.4,174],"s":"catalizzatore","c":"force","size":11,"a":"end"},{"t":"arrow","p":[540,140,540,240],"c":"ax","w":1.6,"head":8},{"t":"text","p":[548,196],"s":"ΔG","c":"ax","size":12,"a":"start"},{"t":"line","p":[80,140,560,140],"c":"muted","w":0.6,"dash":true},{"t":"arrow","p":[80,280,580,280],"c":"ax","w":1.4,"head":8},{"t":"text","p":[580,298],"s":"coordinata di reazione","c":"ax","size":11,"a":"end"},{"t":"arrow","p":[50,280,50,20],"c":"ax","w":1.4,"head":8},{"t":"text","p":[58,24],"s":"energia di Gibbs","c":"ax","size":11,"a":"start"}]}
---
Profilo energetico di una reazione esoergonica, con e senza catalizzatore. Il catalizzatore offre una via con uno stato di transizione più basso; l'energia di Gibbs dei reagenti e dei prodotti, e quindi $\Delta G$, resta la stessa.
:::

La legge di Arrhenius, già usata nel capitolo [Elementi e molecole della vita nello spazio](unit:biology-04), lega la costante di velocità all'energia di attivazione, $k=A\,\mathrm e^{-E_a/(RT)}$. Due conseguenze sono importanti. La velocità cresce in fretta con la temperatura: con $E_a=50\un{kJ/mol}$, passare da $25$ a $35\,^\circ\mathrm C$ quasi la raddoppia. E una piccola riduzione della barriera produce un'accelerazione enorme: abbassare l'energia di attivazione di $\Delta E_a$ moltiplica la velocità per

$$\frac{k_\mathrm{cat}}{k}=\mathrm e^{\Delta E_a/(RT)}.$$

A $25\,^\circ\mathrm C$ una riduzione di $10\un{kJ/mol}$ accelera la reazione di circa $56$ volte, una di $50\un{kJ/mol}$ di quasi seicento milioni di volte. L'accelerazione di $10^{17}$ della decarbossilasi descritta all'inizio del capitolo corrisponde a una riduzione della barriera di circa $98\un{kJ/mol}$ (figura 3).

::: figura accelerazione
{"w":720,"h":300,"items":[{"t":"axes","o":[90,270],"x":[600,"riduzione di Eₐ (kJ/mol)"],"y":[240,"fattore di accelerazione"],"sx":4.6,"sy":13,"xt":[[0,"0"],[20,"20"],[40,"40"],[60,"60"],[80,"80"],[100,"100"]],"yt":[[0,"10⁰"],[3,"10³"],[6,"10⁶"],[9,"10⁹"],[12,"10¹²"],[15,"10¹⁵"],[18,"10¹⁸"]]},{"t":"plot","o":[90,270],"sx":4.6,"sy":13,"pts":[[0,0.0],[2,0.3503848],[4,0.7007697],[6,1.0511545],[8,1.4015394],[10,1.7519242],[12,2.102309],[14,2.4526939],[16,2.8030787],[18,3.1534636],[20,3.5038484],[22,3.8542332],[24,4.2046181],[26,4.5550029],[28,4.9053878],[30,5.2557726],[32,5.6061575],[34,5.9565423],[36,6.3069271],[38,6.657312],[40,7.0076968],[42,7.3580817],[44,7.7084665],[46,8.0588513],[48,8.4092362],[50,8.759621],[52,9.1100059],[54,9.4603907],[56,9.8107755],[58,10.1611604],[60,10.5115452],[62,10.8619301],[64,11.2123149],[66,11.5626997],[68,11.9130846],[70,12.2634694],[72,12.6138543],[74,12.9642391],[76,13.3146239],[78,13.6650088],[80,14.0153936],[82,14.3657785],[84,14.7161633],[86,15.0665481],[88,15.416933],[90,15.7673178],[92,16.1177027],[94,16.4680875],[96,16.8184724],[98,17.1688572],[100,17.519242],[102,17.8696269],[104,18.2200117]],"c":"force2","w":2.4},{"t":"circle","p":[136.0,247.2,5],"c":"force"},{"t":"text","p":[128.0,239.2],"s":"56","c":"force","size":11,"a":"end"},{"t":"circle","p":[320.0,156.1,5],"c":"force"},{"t":"text","p":[312.0,148.1],"s":"5,7 · 10⁸","c":"force","size":11,"a":"end"},{"t":"circle","p":[540.8,46.8,5],"c":"force"},{"t":"text","p":[532.8,38.8],"s":"1,4 · 10¹⁷","c":"force","size":11,"a":"end"}]}
---
Fattore di accelerazione $\mathrm e^{\Delta E_a/(RT)}$ in funzione della riduzione dell'energia di attivazione, a $25\,^\circ\mathrm C$, con l'asse verticale in scala logaritmica. Ogni $5{,}7\un{kJ/mol}$ in meno moltiplicano la velocità per dieci.
:::

## I catalizzatori {#catalizzatori}

Un **catalizzatore** è una sostanza che accelera una reazione senza essere consumata. Lo fa offrendo un percorso diverso, con uno stato di transizione più basso: lega i reagenti in una posizione favorevole, stabilizza le cariche che si formano durante la reazione, cede e riprende protoni o elettroni. Alla fine della reazione il catalizzatore torna come era e può ricominciare.

Un catalizzatore cambia la velocità, ma non il punto di arrivo. Poiché abbassa la barriera allo stesso modo nei due versi, accelera allo stesso modo la reazione diretta e quella inversa, e lascia invariata la costante di equilibrio. Un catalizzatore non può rendere spontanea una reazione endoergonica; può soltanto far raggiungere più in fretta l'equilibrio che la reazione raggiungerebbe comunque. Per spostare l'equilibrio serve energia, fornita per esempio con l'accoppiamento.

I catalizzatori si dividono in **omogenei**, disciolti nella stessa fase dei reagenti, come gli ioni metallici in soluzione e gli enzimi, ed **eterogenei**, in una fase diversa, come le superfici dei metalli e dei minerali su cui le molecole di un gas o di una soluzione si adsorbono e reagiscono. Il convertitore catalitico delle automobili e il ferro usato nella sintesi industriale dell'ammoniaca sono catalizzatori eterogenei; sulla Terra primitiva, le superfici dei minerali possono aver avuto un ruolo simile.

## Gli enzimi {#enzimi}

Gli **enzimi** sono i catalizzatori della vita. Quasi tutti sono proteine; alcuni, i **ribozimi**, sono molecole di RNA, fra cui il cuore catalitico del ribosoma. Un enzima è molto più grande delle molecole su cui agisce, i **substrati**, e le lega in una piccola tasca della sua superficie, il **sito attivo**, dove le catene laterali di alcuni amminoacidi e talvolta uno ione metallico o una piccola molecola, il **cofattore**, partecipano alla reazione (figura 4).

::: figura enzima
{"w":730,"h":245,"items":[{"t":"poly","pts":[[114.0,161.6],[119.2,158.1],[123.9,153.9],[128.1,149.2],[131.6,144.0],[134.3,138.4],[136.4,132.4],[137.6,126.3],[138.0,120.0],[137.6,113.7],[136.4,107.6],[134.3,101.6],[131.6,96.0],[128.1,90.8],[123.9,86.1],[119.2,81.9],[114.0,78.4],[108.4,75.7],[102.4,73.6],[96.3,72.4],[90.0,72.0],[83.7,72.4],[77.6,73.6],[71.6,75.7],[66.0,78.4],[60.8,81.9],[56.1,86.1],[51.9,90.8],[48.4,96.0],[45.7,101.6],[43.6,107.6],[42.4,113.7],[42.0,120.0],[42.4,126.3],[43.6,132.4],[45.7,138.4],[48.4,144.0],[51.9,149.2],[56.1,153.9],[60.8,158.1],[66.0,161.6],[106,92],[106,148]],"c":"force2","w":2.2,"close":true},{"t":"poly","pts":[[160,106],[178,120],[160,134]],"c":"force3","w":2,"close":true},{"t":"text","p":[100,190],"s":"enzima + substrato","c":"ax","size":11},{"t":"arrow","p":[185,120,225,120],"c":"ax","w":1.6,"head":8},{"t":"poly","pts":[[314.0,161.6],[319.2,158.1],[323.9,153.9],[328.1,149.2],[331.6,144.0],[334.3,138.4],[336.4,132.4],[337.6,126.3],[338.0,120.0],[337.6,113.7],[336.4,107.6],[334.3,101.6],[331.6,96.0],[328.1,90.8],[323.9,86.1],[319.2,81.9],[314.0,78.4],[308.4,75.7],[302.4,73.6],[296.3,72.4],[290.0,72.0],[283.7,72.4],[277.6,73.6],[271.6,75.7],[266.0,78.4],[260.8,81.9],[256.1,86.1],[251.9,90.8],[248.4,96.0],[245.7,101.6],[243.6,107.6],[242.4,113.7],[242.0,120.0],[242.4,126.3],[243.6,132.4],[245.7,138.4],[248.4,144.0],[251.9,149.2],[256.1,153.9],[260.8,158.1],[266.0,161.6],[306,92],[306,148]],"c":"force2","w":2.2,"close":true},{"t":"poly","pts":[[306,106],[324,120],[306,134]],"c":"force3","w":2,"close":true},{"t":"text","p":[290,190],"s":"complesso ES","c":"ax","size":11},{"t":"arrow","p":[355,120,395,120],"c":"ax","w":1.6,"head":8},{"t":"poly","pts":[[484.0,161.6],[489.2,158.1],[493.9,153.9],[498.1,149.2],[501.6,144.0],[504.3,138.4],[506.4,132.4],[507.6,126.3],[508.0,120.0],[507.6,113.7],[506.4,107.6],[504.3,101.6],[501.6,96.0],[498.1,90.8],[493.9,86.1],[489.2,81.9],[484.0,78.4],[478.4,75.7],[472.4,73.6],[466.3,72.4],[460.0,72.0],[453.7,72.4],[447.6,73.6],[441.6,75.7],[436.0,78.4],[430.8,81.9],[426.1,86.1],[421.9,90.8],[418.4,96.0],[415.7,101.6],[413.6,107.6],[412.4,113.7],[412.0,120.0],[412.4,126.3],[413.6,132.4],[415.7,138.4],[418.4,144.0],[421.9,149.2],[426.1,153.9],[430.8,158.1],[436.0,161.6],[476,92],[476,148]],"c":"force","w":2.2,"close":true},{"t":"poly","pts":[[476,106],[494,114],[476,134]],"c":"force","w":2,"close":true},{"t":"text","p":[460,190],"s":"stato di transizione","c":"force","size":11},{"t":"arrow","p":[525,120,565,120],"c":"ax","w":1.6,"head":8},{"t":"poly","pts":[[654.0,161.6],[659.2,158.1],[663.9,153.9],[668.1,149.2],[671.6,144.0],[674.3,138.4],[676.4,132.4],[677.6,126.3],[678.0,120.0],[677.6,113.7],[676.4,107.6],[674.3,101.6],[671.6,96.0],[668.1,90.8],[663.9,86.1],[659.2,81.9],[654.0,78.4],[648.4,75.7],[642.4,73.6],[636.3,72.4],[630.0,72.0],[623.7,72.4],[617.6,73.6],[611.6,75.7],[606.0,78.4],[600.8,81.9],[596.1,86.1],[591.9,90.8],[588.4,96.0],[585.7,101.6],[583.6,107.6],[582.4,113.7],[582.0,120.0],[582.4,126.3],[583.6,132.4],[585.7,138.4],[588.4,144.0],[591.9,149.2],[596.1,153.9],[600.8,158.1],[606.0,161.6],[646,92],[646,148]],"c":"force2","w":2.2,"close":true},{"t":"circle","p":[690,108,8],"c":"force4"},{"t":"circle","p":[690,134,8],"c":"force4"},{"t":"text","p":[650,190],"s":"enzima + prodotti","c":"ax","size":11},{"t":"arrow","p":[630,210,90,210],"c":"muted","w":1.4,"head":8},{"t":"text","p":[360,228],"s":"l’enzima torna libero e ricomincia","c":"muted","size":11},{"t":"text","p":[290,48],"s":"sito attivo","c":"force2","size":11},{"t":"line","p":[290,54,300,96],"c":"muted","w":0.8}]}
---
Ciclo di un enzima. Il substrato si lega al sito attivo, il complesso enzima-substrato si trasforma nello stato di transizione e poi nel complesso con il prodotto, il prodotto si stacca e l'enzima è pronto per un nuovo ciclo.
:::

Gli enzimi hanno tre proprietà notevoli. Sono **efficienti**: accelerano le reazioni di fattori che vanno da milioni a cento milioni di miliardi di volte, e i più veloci, come la catalasi, che decompone il perossido di idrogeno, o l'anidrasi carbonica, che trasforma il diossido di carbonio in bicarbonato, compiono da un milione a decine di milioni di reazioni al secondo. Sono **specifici**: riconoscono la forma e le cariche del loro substrato, compresa la sua chiralità, e distinguono fra molecole quasi identiche. Sono **regolabili**: la loro attività cambia con la concentrazione di altre molecole che si legano in altri punti della proteina, e la cellula può accenderli e spegnerli secondo le necessità.

Il sito attivo non è una serratura rigida in cui il substrato entra come una chiave, l'immagine proposta da Emil Fischer nel 1894. Molti enzimi cambiano forma quando legano il substrato, avvolgendolo in un **adattamento indotto**, e legano più fortemente lo stato di transizione che il substrato stesso: è proprio questa preferenza per lo stato di transizione, sottolineata da Linus Pauling nel 1946, che abbassa la barriera.

## La cinetica di Michaelis e Menten {#michaelis}

Nel 1913 la biochimica canadese Maud Menten e il chimico tedesco Leonor Michaelis, a Berlino, misurarono la velocità con cui l'enzima invertasi scinde il saccarosio, a diverse concentrazioni del substrato. A concentrazioni basse la velocità cresceva quasi in proporzione alla concentrazione; a concentrazioni alte cresceva sempre meno, fino a raggiungere un valore massimo. Spiegarono il comportamento con un modello semplice: l'enzima E lega il substrato S formando un complesso ES, che può staccarsi di nuovo oppure trasformarsi nel prodotto P liberando l'enzima,

$$\mathrm{E+S}\rightleftharpoons\mathrm{ES}\longrightarrow\mathrm{E+P}.$$

Quando tutti gli enzimi sono occupati, aggiungere altro substrato diventa inutile, perché l'enzima è **saturato**, e la velocità raggiunge il valore massimo $V_\mathrm{max}$. Supponendo che la concentrazione del complesso resti costante durante la misura, si ottiene la relazione

::: legge Equazione di Michaelis-Menten
$$v=\frac{V_\mathrm{max}\,[\mathrm S]}{K_m+[\mathrm S]}$$
dove $v$ è la velocità iniziale, $[\mathrm S]$ la concentrazione del substrato, $V_\mathrm{max}$ la velocità massima e $K_m$ la **costante di Michaelis**. Per $[\mathrm S]=K_m$ la velocità vale $V_\mathrm{max}/2$.
:::

La costante di Michaelis ha le dimensioni di una concentrazione ed è la concentrazione di substrato alla quale l'enzima lavora a metà della velocità massima: un valore piccolo indica un enzima che si satura già a concentrazioni basse. La velocità massima è proporzionale alla quantità di enzima, $V_\mathrm{max}=k_\mathrm{cat}[\mathrm E]_\mathrm{tot}$, dove $k_\mathrm{cat}$, il **numero di turnover**, è il numero di molecole di substrato che ogni molecola di enzima trasforma in un secondo quando è saturata.

Il modello interattivo di questa unità disegna la curva di Michaelis-Menten per concentrazioni di substrato da $0$ a $10\un{mmol/L}$, con la velocità massima regolabile da $5$ a $30\un{\mu mol/min}$ e la costante di Michaelis da $0{,}5$ a $5\un{mmol/L}$ (figura 5).

::: figura michaelis
{"w":720,"h":290,"items":[{"t":"axes","o":[80,260],"x":[610,"[S] (mmol/L)"],"y":[225,"v (μmol/min)"],"sx":48,"sy":20,"xt":[[0,"0"],[2,"2"],[4,"4"],[6,"6"],[8,"8"],[10,"10"]],"yt":[[0,"0"],[2,"2"],[4,"4"],[6,"6"],[8,"8"],[10,"10"]]},{"t":"plot","o":[80,260],"sx":48,"sy":20,"pts":[[0.0,0.0],[0.1,0.4761905],[0.2,0.9090909],[0.3,1.3043478],[0.4,1.6666667],[0.5,2.0],[0.6,2.3076923],[0.7,2.5925926],[0.8,2.8571429],[0.9,3.1034483],[1.0,3.3333333],[1.1,3.5483871],[1.2,3.75],[1.3,3.9393939],[1.4,4.1176471],[1.5,4.2857143],[1.6,4.4444444],[1.7,4.5945946],[1.8,4.7368421],[1.9,4.8717949],[2.0,5.0],[2.1,5.1219512],[2.2,5.2380952],[2.3,5.3488372],[2.4,5.4545455],[2.5,5.5555556],[2.6,5.6521739],[2.7,5.7446809],[2.8,5.8333333],[2.9,5.9183673],[3.0,6.0],[3.1,6.0784314],[3.2,6.1538462],[3.3,6.2264151],[3.4,6.2962963],[3.5,6.3636364],[3.6,6.4285714],[3.7,6.4912281],[3.8,6.5517241],[3.9,6.6101695],[4.0,6.6666667],[4.1,6.7213115],[4.2,6.7741935],[4.3,6.8253968],[4.4,6.875],[4.5,6.9230769],[4.6,6.969697],[4.7,7.0149254],[4.8,7.0588235],[4.9,7.1014493],[5.0,7.1428571],[5.1,7.1830986],[5.2,7.2222222],[5.3,7.260274],[5.4,7.2972973],[5.5,7.3333333],[5.6,7.3684211],[5.7,7.4025974],[5.8,7.4358974],[5.9,7.4683544],[6.0,7.5],[6.1,7.5308642],[6.2,7.5609756],[6.3,7.5903614],[6.4,7.6190476],[6.5,7.6470588],[6.6,7.6744186],[6.7,7.7011494],[6.8,7.7272727],[6.9,7.752809],[7.0,7.7777778],[7.1,7.8021978],[7.2,7.826087],[7.3,7.8494624],[7.4,7.8723404],[7.5,7.8947368],[7.6,7.9166667],[7.7,7.9381443],[7.8,7.9591837],[7.9,7.979798],[8.0,8.0],[8.1,8.019802],[8.2,8.0392157],[8.3,8.0582524],[8.4,8.0769231],[8.5,8.0952381],[8.6,8.1132075],[8.7,8.1308411],[8.8,8.1481481],[8.9,8.1651376],[9.0,8.1818182],[9.1,8.1981982],[9.2,8.2142857],[9.3,8.2300885],[9.4,8.245614],[9.5,8.2608696],[9.6,8.2758621],[9.7,8.2905983],[9.8,8.3050847],[9.9,8.3193277],[10.0,8.3333333]],"c":"force2","w":2.6},{"t":"line","p":[80,60,560,60],"c":"muted","w":1.2,"dash":true},{"t":"text","p":[566,64],"s":"Vmax","c":"muted","size":11,"a":"start"},{"t":"line","p":[80,160,176,160],"c":"force","w":1.2,"dash":true},{"t":"line","p":[176,260,176,160],"c":"force","w":1.2,"dash":true},{"t":"circle","p":[176,160,5],"c":"force"},{"t":"text","p":[184,176],"s":"Km: v = Vmax/2","c":"force","size":11,"a":"start"}]}
---
Curva di Michaelis-Menten con $V_\mathrm{max}=10\un{\mu mol/min}$ e $K_m=2\un{mmol/L}$. La velocità cresce quasi linearmente a basse concentrazioni e tende a $V_\mathrm{max}$ a concentrazioni alte; per $[\mathrm S]=K_m$ vale metà del massimo.
:::

::: esempio Un enzima a metà e quasi pieno
Con $V_\mathrm{max}=10\un{\mu mol/min}$ e $K_m=2\un{mmol/L}$: per $[\mathrm S]=2\un{mmol/L}$ la velocità è $10\cdot2/4=5\un{\mu mol/min}$; per $[\mathrm S]=10\un{mmol/L}$ è $10\cdot10/12\simeq8{,}3\un{\mu mol/min}$. Per arrivare al $90\%$ di $V_\mathrm{max}$ serve $[\mathrm S]=9K_m=18\un{mmol/L}$: l'avvicinamento alla saturazione è lento.
:::

Per concentrazioni molto minori di $K_m$ l'equazione diventa $v\simeq(V_\mathrm{max}/K_m)[\mathrm S]$, e la reazione si comporta come una reazione del primo ordine nel substrato. Il rapporto $k_\mathrm{cat}/K_m$, l'**efficienza catalitica**, misura quanto rapidamente l'enzima trasforma il substrato quando questo è scarso. Per alcuni enzimi, come la trioso fosfato isomerasi, arriva a $10^8$–$10^9\un{L/(mol\,s)}$, il limite imposto dalla velocità con cui il substrato arriva per diffusione al sito attivo: enzimi di questo tipo sono «perfetti», nel senso che quasi ogni incontro con il substrato produce una reazione.

## Temperatura, pH e inibitori {#fattori}

L'attività di un enzima dipende dalle condizioni. Al crescere della temperatura la velocità aumenta, come previsto dalla legge di Arrhenius, finché l'agitazione termica comincia a rompere i legami deboli che tengono ripiegata la proteina: l'enzima si **denatura** e perde l'attività. La temperatura ottimale degli enzimi umani è vicina a $37\,^\circ\mathrm C$; quella degli enzimi dei microrganismi delle sorgenti calde supera gli $80$ o i $100\,^\circ\mathrm C$, come si vede nel capitolo [Estremofili](unit:biology-18). Allo stesso modo l'attività dipende dal pH, che cambia la carica delle catene laterali del sito attivo: la pepsina dello stomaco lavora meglio a pH vicino a $2$, la tripsina dell'intestino a pH vicino a $8$.

Le molecole che riducono l'attività di un enzima si chiamano **inibitori** (figura 6). Un **inibitore competitivo** somiglia al substrato e occupa il sito attivo: la velocità massima resta la stessa, perché a concentrazioni alte il substrato vince la competizione, ma serve più substrato per raggiungerla, e la costante di Michaelis apparente aumenta. Un **inibitore non competitivo** si lega altrove e riduce la frazione di enzimi attivi; la velocità massima diminuisce, mentre la costante di Michaelis resta la stessa. Molti farmaci, antibiotici e veleni sono inibitori di enzimi.

::: figura inibitori
{"w":720,"h":290,"items":[{"t":"axes","o":[80,260],"x":[610,"[S] (mmol/L)"],"y":[225,"v (μmol/min)"],"sx":48,"sy":20,"xt":[[0,"0"],[2,"2"],[4,"4"],[6,"6"],[8,"8"],[10,"10"]],"yt":[[0,"0"],[2,"2"],[4,"4"],[6,"6"],[8,"8"],[10,"10"]]},{"t":"plot","o":[80,260],"sx":48,"sy":20,"pts":[[0.0,0.0],[0.1,0.4761905],[0.2,0.9090909],[0.3,1.3043478],[0.4,1.6666667],[0.5,2.0],[0.6,2.3076923],[0.7,2.5925926],[0.8,2.8571429],[0.9,3.1034483],[1.0,3.3333333],[1.1,3.5483871],[1.2,3.75],[1.3,3.9393939],[1.4,4.1176471],[1.5,4.2857143],[1.6,4.4444444],[1.7,4.5945946],[1.8,4.7368421],[1.9,4.8717949],[2.0,5.0],[2.1,5.1219512],[2.2,5.2380952],[2.3,5.3488372],[2.4,5.4545455],[2.5,5.5555556],[2.6,5.6521739],[2.7,5.7446809],[2.8,5.8333333],[2.9,5.9183673],[3.0,6.0],[3.1,6.0784314],[3.2,6.1538462],[3.3,6.2264151],[3.4,6.2962963],[3.5,6.3636364],[3.6,6.4285714],[3.7,6.4912281],[3.8,6.5517241],[3.9,6.6101695],[4.0,6.6666667],[4.1,6.7213115],[4.2,6.7741935],[4.3,6.8253968],[4.4,6.875],[4.5,6.9230769],[4.6,6.969697],[4.7,7.0149254],[4.8,7.0588235],[4.9,7.1014493],[5.0,7.1428571],[5.1,7.1830986],[5.2,7.2222222],[5.3,7.260274],[5.4,7.2972973],[5.5,7.3333333],[5.6,7.3684211],[5.7,7.4025974],[5.8,7.4358974],[5.9,7.4683544],[6.0,7.5],[6.1,7.5308642],[6.2,7.5609756],[6.3,7.5903614],[6.4,7.6190476],[6.5,7.6470588],[6.6,7.6744186],[6.7,7.7011494],[6.8,7.7272727],[6.9,7.752809],[7.0,7.7777778],[7.1,7.8021978],[7.2,7.826087],[7.3,7.8494624],[7.4,7.8723404],[7.5,7.8947368],[7.6,7.9166667],[7.7,7.9381443],[7.8,7.9591837],[7.9,7.979798],[8.0,8.0],[8.1,8.019802],[8.2,8.0392157],[8.3,8.0582524],[8.4,8.0769231],[8.5,8.0952381],[8.6,8.1132075],[8.7,8.1308411],[8.8,8.1481481],[8.9,8.1651376],[9.0,8.1818182],[9.1,8.1981982],[9.2,8.2142857],[9.3,8.2300885],[9.4,8.245614],[9.5,8.2608696],[9.6,8.2758621],[9.7,8.2905983],[9.8,8.3050847],[9.9,8.3193277],[10.0,8.3333333]],"c":"force2","w":2.4},{"t":"text","p":[566,97.3],"s":"senza inibitore","c":"force2","size":11,"a":"start"},{"t":"plot","o":[80,260],"sx":48,"sy":20,"pts":[[0.0,0.0],[0.1,0.1639344],[0.2,0.3225806],[0.3,0.4761905],[0.4,0.625],[0.5,0.7692308],[0.6,0.9090909],[0.7,1.0447761],[0.8,1.1764706],[0.9,1.3043478],[1.0,1.4285714],[1.1,1.5492958],[1.2,1.6666667],[1.3,1.7808219],[1.4,1.8918919],[1.5,2.0],[1.6,2.1052632],[1.7,2.2077922],[1.8,2.3076923],[1.9,2.4050633],[2.0,2.5],[2.1,2.5925926],[2.2,2.6829268],[2.3,2.7710843],[2.4,2.8571429],[2.5,2.9411765],[2.6,3.0232558],[2.7,3.1034483],[2.8,3.1818182],[2.9,3.258427],[3.0,3.3333333],[3.1,3.4065934],[3.2,3.4782609],[3.3,3.5483871],[3.4,3.6170213],[3.5,3.6842105],[3.6,3.75],[3.7,3.814433],[3.8,3.877551],[3.9,3.9393939],[4.0,4.0],[4.1,4.0594059],[4.2,4.1176471],[4.3,4.1747573],[4.4,4.2307692],[4.5,4.2857143],[4.6,4.3396226],[4.7,4.3925234],[4.8,4.4444444],[4.9,4.4954128],[5.0,4.5454545],[5.1,4.5945946],[5.2,4.6428571],[5.3,4.6902655],[5.4,4.7368421],[5.5,4.7826087],[5.6,4.8275862],[5.7,4.8717949],[5.8,4.9152542],[5.9,4.9579832],[6.0,5.0],[6.1,5.0413223],[6.2,5.0819672],[6.3,5.1219512],[6.4,5.1612903],[6.5,5.2],[6.6,5.2380952],[6.7,5.2755906],[6.8,5.3125],[6.9,5.3488372],[7.0,5.3846154],[7.1,5.4198473],[7.2,5.4545455],[7.3,5.4887218],[7.4,5.5223881],[7.5,5.5555556],[7.6,5.5882353],[7.7,5.620438],[7.8,5.6521739],[7.9,5.6834532],[8.0,5.7142857],[8.1,5.7446809],[8.2,5.7746479],[8.3,5.8041958],[8.4,5.8333333],[8.5,5.862069],[8.6,5.890411],[8.7,5.9183673],[8.8,5.9459459],[8.9,5.9731544],[9.0,6.0],[9.1,6.0264901],[9.2,6.0526316],[9.3,6.0784314],[9.4,6.1038961],[9.5,6.1290323],[9.6,6.1538462],[9.7,6.1783439],[9.8,6.2025316],[9.9,6.2264151],[10.0,6.25]],"c":"force3","w":2.4},{"t":"text","p":[566,139.0],"s":"competitivo","c":"force3","size":11,"a":"start"},{"t":"plot","o":[80,260],"sx":48,"sy":20,"pts":[[0.0,0.0],[0.1,0.2380952],[0.2,0.4545455],[0.3,0.6521739],[0.4,0.8333333],[0.5,1.0],[0.6,1.1538462],[0.7,1.2962963],[0.8,1.4285714],[0.9,1.5517241],[1.0,1.6666667],[1.1,1.7741935],[1.2,1.875],[1.3,1.969697],[1.4,2.0588235],[1.5,2.1428571],[1.6,2.2222222],[1.7,2.2972973],[1.8,2.3684211],[1.9,2.4358974],[2.0,2.5],[2.1,2.5609756],[2.2,2.6190476],[2.3,2.6744186],[2.4,2.7272727],[2.5,2.7777778],[2.6,2.826087],[2.7,2.8723404],[2.8,2.9166667],[2.9,2.9591837],[3.0,3.0],[3.1,3.0392157],[3.2,3.0769231],[3.3,3.1132075],[3.4,3.1481481],[3.5,3.1818182],[3.6,3.2142857],[3.7,3.245614],[3.8,3.2758621],[3.9,3.3050847],[4.0,3.3333333],[4.1,3.3606557],[4.2,3.3870968],[4.3,3.4126984],[4.4,3.4375],[4.5,3.4615385],[4.6,3.4848485],[4.7,3.5074627],[4.8,3.5294118],[4.9,3.5507246],[5.0,3.5714286],[5.1,3.5915493],[5.2,3.6111111],[5.3,3.630137],[5.4,3.6486486],[5.5,3.6666667],[5.6,3.6842105],[5.7,3.7012987],[5.8,3.7179487],[5.9,3.7341772],[6.0,3.75],[6.1,3.7654321],[6.2,3.7804878],[6.3,3.7951807],[6.4,3.8095238],[6.5,3.8235294],[6.6,3.8372093],[6.7,3.8505747],[6.8,3.8636364],[6.9,3.8764045],[7.0,3.8888889],[7.1,3.9010989],[7.2,3.9130435],[7.3,3.9247312],[7.4,3.9361702],[7.5,3.9473684],[7.6,3.9583333],[7.7,3.9690722],[7.8,3.9795918],[7.9,3.989899],[8.0,4.0],[8.1,4.009901],[8.2,4.0196078],[8.3,4.0291262],[8.4,4.0384615],[8.5,4.047619],[8.6,4.0566038],[8.7,4.0654206],[8.8,4.0740741],[8.9,4.0825688],[9.0,4.0909091],[9.1,4.0990991],[9.2,4.1071429],[9.3,4.1150442],[9.4,4.122807],[9.5,4.1304348],[9.6,4.137931],[9.7,4.1452991],[9.8,4.1525424],[9.9,4.1596639],[10.0,4.1666667]],"c":"force","w":2.4},{"t":"text","p":[566,180.7],"s":"non competitivo","c":"force","size":11,"a":"start"}]}
---
Effetto degli inibitori sulla curva di Michaelis-Menten. Un inibitore competitivo, qui con costante di Michaelis apparente tripla, sposta la curva verso destra senza cambiare la velocità massima; un inibitore non competitivo, qui con velocità massima dimezzata, abbassa la curva.
:::

## I primi catalizzatori {#primi}

Gli enzimi sono prodotti da geni, e i geni sono copiati da enzimi: chi è venuto prima? Prima delle proteine codificate dai geni, le reazioni della chimica prebiotica dovevano essere accelerate da catalizzatori più semplici. Quattro candidati sono i più discussi.

Gli **ioni metallici**. Quasi metà degli enzimi conosciuti contiene uno ione metallico, o ne ha bisogno, e spesso il metallo è proprio la parte che fa il lavoro chimico: il magnesio nelle reazioni dei fosfati e degli acidi nucleici, lo zinco nell'anidrasi carbonica, il ferro e il nichel negli enzimi che trasferiscono elettroni e che usano l'idrogeno, il molibdeno negli enzimi che fissano l'azoto. Molti di questi ioni, da soli in soluzione, catalizzano già le stesse reazioni, anche se molto più lentamente. Il ruolo centrale dei metalli negli enzimi più antichi suggerisce che la catalisi biologica sia cominciata con i metalli, e che le proteine li abbiano poi avvolti e perfezionati.

Le **superfici dei minerali**. I solfuri di ferro e nichel delle sorgenti idrotermali assomigliano ai gruppi ferro-zolfo che si trovano nel cuore di molti enzimi antichi, come le ferredossine. Nel 2020 un gruppo di Düsseldorf ha mostrato che leghe naturali di nichel e ferro e alcuni ossidi e solfuri di ferro, in presenza di idrogeno e diossido di carbonio a $100\,^\circ\mathrm C$, producono formiato, acetato e piruvato, le stesse molecole della via metabolica con cui alcuni microrganismi fissano il carbonio. Le argille come la montmorillonite, come si è visto, favoriscono la formazione di catene di RNA.

I **cofattori**. Molti enzimi lavorano con piccole molecole organiche, i cofattori, come il NAD, il FAD e il coenzima A, che portano elettroni o gruppi chimici. Nel 1976 Harold White osservò che molti di questi cofattori contengono un nucleotide, spesso senza che il nucleotide abbia un ruolo chimico nella reazione. Propose che fossero fossili molecolari di un'epoca in cui i catalizzatori erano fatti di RNA, e i nucleotidi servivano ad attaccarli alle molecole di RNA.

I **ribozimi**. La scoperta, negli anni Ottanta, che molecole di RNA possono catalizzare reazioni, e che il ribosoma stesso è un ribozima, ha suggerito che nelle prime forme di vita l'RNA abbia svolto insieme il ruolo dei geni e quello degli enzimi. È l'ipotesi del mondo a RNA, il tema del capitolo [Il mondo a RNA](unit:biology-10).

## Un'esperienza: la catalasi della patata {#esperienza}

La catalasi è un enzima presente in quasi tutti gli organismi che respirano ossigeno; decompone il perossido di idrogeno, un sottoprodotto tossico del metabolismo, in acqua e ossigeno. Si trova in abbondanza nella patata cruda.

::: metodo Bolle di ossigeno
**Materiale.** Una patata cruda, acqua ossigenata al $3\%$ della farmacia, quattro bicchieri trasparenti stretti, un righello, una grattugia, un cucchiaino, un pentolino d'acqua bollente, ghiaccio, occhiali protettivi.

**Procedura.** Grattugiare la patata e preparare quattro porzioni uguali di un cucchiaino ciascuna: una a temperatura ambiente, una tenuta un quarto d'ora nel ghiaccio, una tiepida a circa $40\,^\circ\mathrm C$, una bollita per cinque minuti e poi raffreddata. Mettere ogni porzione in un bicchiere, versare in ciascuno la stessa quantità di acqua ossigenata, circa due dita, e misurare dopo un minuto l'altezza della schiuma. Ripetere con mezza porzione e con una porzione doppia di patata a temperatura ambiente.

**Analisi.** La schiuma è fatta di bolle di ossigeno, e la sua altezza dopo un minuto è proporzionale, in prima approssimazione, alla velocità della reazione. Confrontare le quattro temperature e spiegare il risultato della patata bollita con la denaturazione dell'enzima. Verificare che raddoppiare la quantità di patata, cioè di enzima, raddoppia la velocità, come previsto da $V_\mathrm{max}=k_\mathrm{cat}[\mathrm E]_\mathrm{tot}$.

**Sicurezza.** L'acqua ossigenata al $3\%$ irrita gli occhi: usare gli occhiali e lavare subito con acqua in caso di schizzi. Attenzione all'acqua bollente.
:::

La reazione catalizzata è $2\,\mathrm{H_2O_2}\longrightarrow2\,\mathrm{H_2O}+\mathrm{O_2}$, con una variazione di energia di Gibbs di circa $-100\un{kJ}$ per mole di perossido in soluzione. Senza enzima l'acqua ossigenata della farmacia si conserva per mesi, perché la barriera è alta; con la catalasi la stessa reazione è quasi istantanea. È la differenza fra termodinamica e cinetica, visibile in un bicchiere.

## Errori frequenti {#errori}

::: errore Pensare che un catalizzatore sposti l'equilibrio
Un catalizzatore accelera allo stesso modo la reazione diretta e quella inversa. La costante di equilibrio, e quindi la composizione finale, resta la stessa; cambia solo il tempo necessario per raggiungerla.
:::

::: errore Confondere spontaneità e velocità
$\Delta G<0$ dice che una reazione può avvenire, non quanto in fretta. Il glucosio e l'ossigeno reagiscono con un $\Delta G$ molto negativo, ma senza catalizzatori o senza una fiamma la reazione è lentissima.
:::

::: errore Credere che gli enzimi forniscano energia alle reazioni
Un enzima abbassa la barriera di attivazione, senza aggiungere energia al sistema. Per far avvenire una reazione endoergonica serve un accoppiamento con una reazione esoergonica, come l'idrolisi dell'ATP.
:::

::: errore Leggere $K_m$ come la concentrazione di saturazione
$K_m$ è la concentrazione alla quale la velocità è la metà di quella massima. Per arrivare al $90\%$ di $V_\mathrm{max}$ serve una concentrazione nove volte maggiore.
:::

::: errore Usare $\Delta G^\circ$ invece di $\Delta G$
La variazione standard vale per concentrazioni di $1\un{mol/L}$. Nelle cellule le concentrazioni sono diverse, e la variazione effettiva, $\Delta G^\circ+RT\ln Q$, può differire di decine di kilojoule per mole.
:::

## Sintesi {#sintesi}

::: sintesi In breve
- Il metabolismo comprende catabolismo e anabolismo; gli organismi si classificano in fototrofi o chemiotrofi e in autotrofi o eterotrofi secondo le sorgenti di energia e di carbonio.
- I viventi rispettano il primo e il secondo principio: sono sistemi aperti che mantengono il proprio ordine aumentando l'entropia dell'ambiente.
- Una reazione è spontanea se $\Delta G=\Delta H-T\Delta S<0$; in condizioni qualsiasi $\Delta G=\Delta G^\circ+RT\ln Q$, e la costante di equilibrio è $K=\mathrm e^{-\Delta G^\circ/(RT)}$.
- L'idrolisi dell'ATP ha $\Delta G^{\circ\prime}=-30{,}5\un{kJ/mol}$ e circa $-50\un{kJ/mol}$ nelle cellule. Accoppiata a una reazione endoergonica attraverso un intermedio comune, la rende possibile.
- La velocità dipende dall'energia di attivazione; un catalizzatore la abbassa e accelera la reazione di $\mathrm e^{\Delta E_a/(RT)}$, senza cambiare $\Delta G$ né la costante di equilibrio.
- Gli enzimi sono catalizzatori efficienti, specifici e regolabili; legano lo stato di transizione più del substrato.
- La velocità iniziale segue $v=V_\mathrm{max}[\mathrm S]/(K_m+[\mathrm S])$; $K_m$ è la concentrazione a cui $v=V_\mathrm{max}/2$. Temperatura, pH e inibitori cambiano l'attività.
- I primi catalizzatori furono probabilmente ioni metallici, superfici di minerali, cofattori e molecole di RNA.
:::

## Glossario {#glossario}

- **Accoppiamento energetico**: unione di una reazione endoergonica con una esoergonica attraverso un intermedio comune.
- **Anabolismo**: insieme delle reazioni che costruiscono molecole complesse consumando energia.
- **Autotrofo**: organismo che costruisce le proprie molecole a partire dal diossido di carbonio.
- **Catabolismo**: insieme delle reazioni che demoliscono molecole complesse liberando energia.
- **Catalizzatore**: sostanza che accelera una reazione senza essere consumata e senza cambiarne l'equilibrio.
- **Cofattore**: ione metallico o piccola molecola organica necessari all'attività di un enzima.
- **Costante di Michaelis**: concentrazione di substrato alla quale un enzima lavora a metà della velocità massima.
- **Energia di Gibbs**: funzione $G=H-TS$ la cui diminuzione indica una trasformazione spontanea a temperatura e pressione costanti.
- **Enzima**: catalizzatore biologico, di solito una proteina, talvolta una molecola di RNA.
- **Esoergonica**: reazione con $\Delta G<0$, che può fornire lavoro.
- **Inibitore competitivo**: molecola che occupa il sito attivo e aumenta la costante di Michaelis apparente.
- **Numero di turnover**: numero di molecole di substrato trasformate al secondo da una molecola di enzima saturato.
- **Sito attivo**: regione dell'enzima in cui il substrato si lega e reagisce.
- **Stato di transizione**: configurazione di massima energia lungo il percorso di una reazione.

## Esercizi {#esercizi}

::: esercizio Chi mangia che cosa [base]
Classificare secondo la sorgente di energia e di carbonio: una quercia, un fungo che decompone il legno, un batterio che ricava energia ossidando l'idrogeno con il diossido di carbonio e costruisce le proprie molecole a partire da quest'ultimo, un cianobatterio.
>>> soluzione
La quercia e il cianobatterio sono fotoautotrofi: energia dalla luce, carbonio dal diossido di carbonio. Il fungo è chemioeterotrofo: energia e carbonio dalle molecole organiche del legno. Il batterio è chemioautotrofo: energia da una reazione chimica fra sostanze inorganiche, carbonio dal diossido di carbonio.
:::

::: esercizio Due punti sulla curva [base]
Un enzima ha $V_\mathrm{max}=10\un{\mu mol/min}$ e $K_m=2\un{mmol/L}$. Calcolare la velocità iniziale per $[\mathrm S]=2$ e per $[\mathrm S]=10\un{mmol/L}$.
>>> soluzione
Per $[\mathrm S]=2\un{mmol/L}$: $v=10\cdot2/(2+2)=5\un{\mu mol/min}$, metà del massimo. Per $[\mathrm S]=10\un{mmol/L}$: $v=10\cdot10/12\simeq8{,}3\un{\mu mol/min}$.
:::

::: esercizio Una reazione sfavorevole [base]
La sintesi della glutammina ha $\Delta G^{\circ\prime}=+14{,}2\un{kJ/mol}$. Calcolare la costante di equilibrio a $25\,^\circ\mathrm C$.
>>> soluzione

$$\begin{aligned}K&=\mathrm e^{-14\,200/(8{,}314\cdot298{,}15)}\\&=\mathrm e^{-5{,}73}\\&\simeq3{,}3\times10^{-3}.\end{aligned}$$

All'equilibrio i prodotti sono circa trecento volte meno abbondanti dei reagenti.
:::

::: esercizio La potenza di una persona [base]
Un adulto a riposo consuma circa $8\,400\un{kJ}$ al giorno. A quale potenza media corrisponde?
>>> soluzione
$P=8\,400\,000\un{J}/86\,400\un{s}\simeq97\un{W}$, circa quella di una lampadina a incandescenza da cento watt.
:::

::: esercizio La somma di due reazioni [base]
Calcolare la variazione standard di energia di Gibbs della sintesi della glutammina accoppiata all'idrolisi dell'ATP, con $\Delta G^{\circ\prime}=+14{,}2$ e $-30{,}5\un{kJ/mol}$, e la costante di equilibrio della reazione accoppiata a $25\,^\circ\mathrm C$.
>>> soluzione

$$\begin{aligned}\Delta G^{\circ\prime}_\mathrm{tot}&=+14{,}2-30{,}5\\&=-16{,}3\un{kJ/mol}.\end{aligned}$$

La costante è $\mathrm e^{16\,300/(8{,}314\cdot298{,}15)}\simeq720$: la reazione accoppiata procede quasi completamente verso la glutammina.
:::

::: esercizio Un catalizzatore e l'equilibrio [base]
Una reazione ha costante di equilibrio $K=10^{-3}$. Si aggiunge un catalizzatore che la accelera di mille volte. Quanto vale la costante di equilibrio con il catalizzatore? Che cosa cambia?
>>> soluzione
La costante resta $10^{-3}$, perché il catalizzatore accelera allo stesso modo la reazione diretta e quella inversa. Cambia soltanto il tempo necessario per raggiungere l'equilibrio, mille volte più breve.
:::

::: esercizio L'ATP nella cellula [medio]
In una cellula a $37\,^\circ\mathrm C$ le concentrazioni sono $[\mathrm{ATP}]=5\un{mmol/L}$, $[\mathrm{ADP}]=0{,}5\un{mmol/L}$ e $[\mathrm P_i]=5\un{mmol/L}$. Con $\Delta G^{\circ\prime}=-30{,}5\un{kJ/mol}$, calcolare la variazione effettiva di energia di Gibbs dell'idrolisi.
>>> soluzione
Il quoziente di reazione è

$$\begin{aligned}Q&=\frac{0{,}5\times10^{-3}\cdot5\times10^{-3}}{5\times10^{-3}}\\&=5\times10^{-4}.\end{aligned}$$

Con $RT\simeq2{,}58\un{kJ/mol}$ a $310\un{K}$:

$$\begin{aligned}\Delta G&\simeq-30{,}5+2{,}58\ln(5\times10^{-4})\\&\simeq-30{,}5-19{,}6\\&\simeq-50\un{kJ/mol}.\end{aligned}$$
:::

::: esercizio Venti kilojoule in meno [medio]
Un catalizzatore abbassa l'energia di attivazione di $20\un{kJ/mol}$. Di quanto accelera la reazione a $25\,^\circ\mathrm C$? Quale riduzione servirebbe per un'accelerazione di un milione di volte?
>>> soluzione
Il fattore di accelerazione è

$$\begin{aligned}\mathrm e^{20\,000/(8{,}314\cdot298{,}15)}&=\mathrm e^{8{,}07}\\&\simeq3{,}2\times10^3.\end{aligned}$$

Per un fattore $10^6$ serve

$$\begin{aligned}\Delta E_a&=RT\ln10^6\\&\simeq2{,}48\cdot13{,}8\\&\simeq34\un{kJ/mol}.\end{aligned}$$
:::

::: esercizio Avvicinarsi alla saturazione [medio]
Quale concentrazione di substrato, in multipli di $K_m$, serve perché un enzima lavori al $90\%$ e al $99\%$ della velocità massima?
>>> soluzione
Da $v/V_\mathrm{max}=[\mathrm S]/(K_m+[\mathrm S])$ si ricava $[\mathrm S]=K_m\,f/(1-f)$, con $f$ la frazione cercata. Per $f=0{,}9$: $[\mathrm S]=9K_m$. Per $f=0{,}99$: $[\mathrm S]=99K_m$.
:::

::: esercizio Dieci gradi in più [medio]
Una reazione ha energia di attivazione $50\un{kJ/mol}$. Di quanto cresce la sua velocità passando da $25$ a $35\,^\circ\mathrm C$?
>>> soluzione
Il rapporto è

$$\begin{aligned}\mathrm e^{(E_a/R)(1/298{,}15-1/308{,}15)}&=\mathrm e^{6014\cdot1{,}088\times10^{-4}}\\&\simeq\mathrm e^{0{,}65}\\&\simeq1{,}9.\end{aligned}$$

La velocità quasi raddoppia.
:::

::: esercizio Un inibitore competitivo [medio]
Un inibitore competitivo triplica la costante di Michaelis apparente di un enzima con $V_\mathrm{max}=10\un{\mu mol/min}$ e $K_m=2\un{mmol/L}$. Calcolare la velocità per $[\mathrm S]=2\un{mmol/L}$ con e senza inibitore, e il valore a cui tende la velocità a concentrazioni altissime.
>>> soluzione
Senza inibitore $v=5\un{\mu mol/min}$. Con l'inibitore $K_m'=6\un{mmol/L}$ e $v=10\cdot2/8=2{,}5\un{\mu mol/min}$, la metà. A concentrazioni altissime la velocità tende ancora a $10\un{\mu mol/min}$, perché il substrato vince la competizione.
:::

::: esercizio Il numero di turnover [medio]
Una soluzione contiene $1\un{nmol}$ di enzima, e la velocità massima misurata è $10\un{\mu mol/min}$. Quanto vale il numero di turnover $k_\mathrm{cat}$?
>>> soluzione

$$\begin{aligned}V_\mathrm{max}&=10\times10^{-6}\un{mol}/60\un{s}\\&\simeq1{,}67\times10^{-7}\un{mol/s}.\end{aligned}$$

Diviso per $10^{-9}\un{mol}$ di enzima: $k_\mathrm{cat}\simeq167\un{s^{-1}}$, cioè ogni molecola trasforma circa centosettanta molecole di substrato al secondo.
:::

::: esercizio Settantotto milioni di anni [avanzato]
Senza enzima la decarbossilazione dell'orotidina monofosfato ha costante di velocità $2{,}8\times10^{-16}\un{s^{-1}}$; con l'enzima, $k_\mathrm{cat}=39\un{s^{-1}}$. Calcolare il tempo di dimezzamento senza enzima, il fattore di accelerazione e la riduzione dell'energia di attivazione a $25\,^\circ\mathrm C$.
>>> soluzione
Il tempo di dimezzamento è

$$\begin{aligned}\ln2/k&=0{,}693/2{,}8\times10^{-16}\un{s}\\&\simeq2{,}5\times10^{15}\un{s}.\end{aligned}$$

Sono circa $78$ milioni di anni. Il fattore di accelerazione è $39/2{,}8\times10^{-16}\simeq1{,}4\times10^{17}$, e corrisponde a una riduzione della barriera di

$$\begin{aligned}RT\ln(1{,}4\times10^{17})&\simeq2{,}48\cdot39{,}5\\&\simeq98\un{kJ/mol}.\end{aligned}$$
:::

::: esercizio Quanto ATP in un giorno [avanzato]
Si supponga che il $40\%$ degli $8\,400\un{kJ}$ consumati in un giorno sia conservato nell'ATP, a circa $50\un{kJ/mol}$, e che la massa molare dell'ATP sia $507\un{g/mol}$. Quante moli e quanti kilogrammi di ATP si producono e si consumano in un giorno? Perché il corpo ne contiene in ogni momento solo poche decine di grammi?
>>> soluzione
Si conservano $0{,}4\cdot8\,400=3\,360\un{kJ}$, cioè $3\,360/50\simeq67\un{mol}$ di ATP, circa $34\un{kg}$. Il corpo ne contiene pochissimo perché ogni molecola di ATP viene rigenerata dall'ADP migliaia di volte al giorno: l'ATP è una moneta che circola, non un deposito.
:::

::: esercizio Il grafico dei reciproci [avanzato]
Dall'equazione di Michaelis-Menten si ottiene $1/v=(K_m/V_\mathrm{max})(1/[\mathrm S])+1/V_\mathrm{max}$. Due misure danno $v=3{,}33\un{\mu mol/min}$ per $[\mathrm S]=1\un{mmol/L}$ e $v=6{,}67\un{\mu mol/min}$ per $[\mathrm S]=4\un{mmol/L}$. Ricavare $V_\mathrm{max}$ e $K_m$.
>>> soluzione
I reciproci sono $1/v=0{,}30$ e $0{,}15\un{min/\mu mol}$ per $1/[\mathrm S]=1$ e $0{,}25\un{L/mmol}$. La pendenza è $(0{,}30-0{,}15)/(1-0{,}25)=0{,}20$, e l'intercetta $0{,}30-0{,}20=0{,}10$. Quindi $V_\mathrm{max}=1/0{,}10=10\un{\mu mol/min}$ e $K_m=0{,}20\cdot10=2\un{mmol/L}$.
:::

::: esercizio Il vantaggio delle sorgenti calde [avanzato]
Una reazione prebiotica catalizzata da un minerale ha energia di attivazione $80\un{kJ/mol}$. Di quanto è più veloce a $100\,^\circ\mathrm C$ che a $25\,^\circ\mathrm C$? Quale svantaggio delle alte temperature va considerato insieme?
>>> soluzione
Il rapporto è

$$\begin{aligned}\mathrm e^{(80\,000/8{,}314)(1/298{,}15-1/373{,}15)}&=\mathrm e^{6{,}49}\\&\simeq660.\end{aligned}$$

Lo svantaggio è che anche le reazioni di decomposizione dei prodotti accelerano, spesso di più: il ribosio, per esempio, a $100\,^\circ\mathrm C$ dimezza in poco più di un'ora.
:::

## Fonti {#fonti}

Il testo, le figure, gli esempi e gli esercizi di questo capitolo sono originali. Per la scelta e l'ordine degli argomenti i riferimenti principali sono A. M. Shaw, *Astrochemistry: From Astronomy to Astrobiology*, Wiley, 2006, §8.2 (reazioni spontanee ed energia di Gibbs) e §8.3 (velocità delle reazioni), e J. R. Morris, D. L. Hartl, A. H. Knoll e collaboratori, *Biology: How Life Works*, 2ª edizione, Macmillan, 2016, §6.1 (visione d'insieme del metabolismo), §6.2 (energia cinetica e potenziale, ATP), §6.3 (principi della termodinamica), §6.4 (reazioni chimiche, idrolisi dell'ATP e accoppiamento) e §6.5 (enzimi e velocità delle reazioni). Dati ed esperimenti provengono dalle fonti primarie seguenti.

1. A. Radzicka, R. Wolfenden, *Science* 267, 90 (1995): velocità della decarbossilazione dell'orotidina monofosfato senza enzima e fattore di accelerazione.
2. L. Michaelis, M. L. Menten, *Biochemische Zeitschrift* 49, 333 (1913): cinetica dell'invertasi.
3. E. Fischer, *Berichte der deutschen chemischen Gesellschaft* 27, 2985 (1894): il modello della chiave e della serratura; D. E. Koshland, *PNAS* 44, 98 (1958): adattamento indotto; L. Pauling, *Chemical and Engineering News* 24, 1375 (1946): legame preferenziale dello stato di transizione.
4. W. J. Albery, J. R. Knowles, *Biochemistry* 15, 5631 (1976): efficienza catalitica della trioso fosfato isomerasi.
5. K. J. Waldron, J. C. Rutherford, D. Ford, N. J. Robinson, *Nature* 460, 823 (2009): diffusione degli ioni metallici negli enzimi.
6. M. Preiner e collaboratori, *Nature Ecology & Evolution* 4, 534 (2020): riduzione del diossido di carbonio a formiato, acetato e piruvato su minerali di nichel e ferro.
7. H. B. White, *Journal of Molecular Evolution* 7, 101 (1976): i cofattori come fossili di un metabolismo a RNA.
8. E. Schrödinger, *What Is Life?*, Cambridge University Press, 1944.
9. Energie di Gibbs standard dell'idrolisi dell'ATP e della sintesi della glutammina: D. L. Nelson, M. M. Cox, *Lehninger Principles of Biochemistry*, 8ª edizione, Macmillan, 2021.
10. Costanti: R dal valore CODATA 2022.
