---
unit: biology-22
titolo: La zona abitabile
sottotitolo: Dal flusso di una stella alla temperatura di un pianeta, dai limiti della zona abitabile del Sole a quelli delle nane rosse e della Galassia
volume: Volume di biologia
fonte: Testo originale; riferimenti principali A. M. Shaw, Astrochemistry, §7.1, §7.6-7.7
---

## Prima di cominciare {#apertura}

Tutta la vita che conosciamo ha bisogno di acqua liquida. L'acqua scioglie i sali e le molecole organiche, porta i reagenti a contatto, partecipa a moltissime reazioni e dà forma alle membrane e alle proteine, come si è visto nei primi capitoli di questo volume. Per questo la prima domanda che gli astrobiologi pongono a un pianeta è semplice: la sua superficie può ospitare acqua liquida?

La risposta dipende in primo luogo dalla distanza dalla stella. Troppo vicino, l'acqua evapora e si perde nello spazio; troppo lontano, gela. Fra i due estremi c'è una fascia di orbite in cui un pianeta simile alla Terra, con un'atmosfera adatta, può mantenere oceani alla superficie. Questa fascia si chiama **zona abitabile**. Il concetto fu discusso già negli anni Cinquanta e Sessanta, fra gli altri da Hubertus Strughold e da Su-Shu Huang, e fu definito nella forma oggi usata da James Kasting, Daniel Whitmire e Ray Reynolds nel 1993.

La zona abitabile è uno strumento potente e facile da fraintendere. Dice dove l'acqua liquida è *possibile* alla superficie di un pianeta roccioso con un'atmosfera di anidride carbonica, acqua e azoto; non dice che c'è, né che c'è vita. Venere e Marte si trovano ai bordi della zona abitabile del Sole e sono oggi inospitali; Europa ed Encelado ne sono lontanissimi e nascondono oceani sotto il ghiaccio. Questo capitolo costruisce la zona abitabile passo per passo: il flusso di una stella, la temperatura di equilibrio di un pianeta, l'effetto serra, i limiti interno ed esterno, la dipendenza dal tipo di stella e dal tempo, e infine l'idea di una zona abitabile su scala galattica.

::: obiettivi
- calcolare il flusso di una stella a una data distanza con la legge dell'inverso del quadrato;
- ricavare la temperatura di equilibrio di un pianeta dal bilancio fra energia assorbita ed emessa;
- spiegare l'effetto serra con un modello a uno strato e stimarne l'entità sulla Terra;
- descrivere i limiti interno ed esterno della zona abitabile e le loro incertezze;
- calcolare la posizione della zona abitabile per stelle di luminosità diversa;
- discutere l'evoluzione della zona abitabile nel tempo, la zona abitabile galattica e i limiti del concetto.
:::

Il capitolo usa l'energia della radiazione del capitolo [Fotoni ed energia quantizzata](unit:physics-25), le orbite del capitolo [Orbite circolari](unit:physics-13) e il calore del capitolo [Calore e capacità termica](unit:physics-19).

## Il flusso di una stella {#flusso}

Una stella emette energia in tutte le direzioni. La potenza totale emessa si chiama **luminosità** e si indica con $L$; per il Sole vale $L_\odot\approx3{,}83\cdot10^{26}$ watt. A una distanza $d$ questa potenza attraversa una sfera di area $4\pi d^2$, e la potenza che arriva su ogni metro quadrato perpendicolare ai raggi, il **flusso**, vale

$$S=\frac{L}{4\pi d^2}.$$

Raddoppiando la distanza il flusso si riduce a un quarto: è la **legge dell'inverso del quadrato**. Alla distanza della Terra, un'unità astronomica, cioè $1{,}496\cdot10^{11}$ m, il flusso del Sole vale circa $1361$ watt per metro quadrato, un valore misurato con precisione dai satelliti e chiamato a volte costante solare, anche se varia di circa un millesimo con il ciclo delle macchie solari.

Per confrontare pianeti e stelle conviene misurare la luminosità in luminosità solari, la distanza in unità astronomiche e il flusso in unità del flusso terrestre $S_\oplus$. In queste unità la legge diventa semplicissima.

::: legge Flusso in unità terrestri
Un pianeta a distanza $d$, in unità astronomiche, da una stella di luminosità $L$, in luminosità solari, riceve il flusso

$$\frac{S}{S_\oplus}=\frac{L}{d^2},$$

e la distanza a cui il flusso vale $S_\text{eff}$ volte quello terrestre è $d=\sqrt{L/S_\text{eff}}$.
:::

Venere, a $0{,}723$ UA, riceve circa $1{,}91$ volte il flusso terrestre, cioè circa $2600$ watt per metro quadrato; Marte, a $1{,}524$ UA, ne riceve il $43\%$, circa $586$ watt per metro quadrato (figura 1). Una stella con un millesimo della luminosità solare fornisce il flusso terrestre a $\sqrt{0{,}001}\approx0{,}032$ UA, quasi dodici volte più vicino di Mercurio.

::: figura flusso
{"w":760,"h":285,"items":[{"t":"poly","pts":[[152.5,50],[489.1,50],[489.1,250],[152.5,250]],"close":true,"c":"muted","w":1.2,"dash":true},{"t":"rect","p":[231.7,50,234.3,200],"c":"muted","r":0},{"t":"axes","o":[70,250],"x":[660,"distanza dal Sole, UA"],"y":[215,"flusso, in unità terrestri"],"sx":330,"sy":50,"xt":[[0.0,"0,5"],[0.5,"1,0"],[1.0,"1,5"],[1.5,"2,0"]],"yt":[[0,"0"],[1,"1"],[2,"2"],[3,"3"],[4,"4"]]},{"t":"plot","o":[70,250],"sx":330,"sy":50,"pts":[[0.0,4.0],[0.01,3.8446751],[0.02,3.6982249],[0.03,3.5599858],[0.04,3.4293553],[0.05,3.3057851],[0.06,3.1887755],[0.07,3.0778701],[0.08,2.9726516],[0.09,2.8727377],[0.1,2.7777778],[0.11,2.6874496],[0.12,2.6014568],[0.13,2.5195263],[0.14,2.4414062],[0.15,2.3668639],[0.16,2.2956841],[0.17,2.2276676],[0.18,2.1626298],[0.19,2.1003991],[0.2,2.0408163],[0.21,1.9837334],[0.22,1.9290123],[0.23,1.8765247],[0.24,1.8261505],[0.25,1.7777778],[0.26,1.7313019],[0.27,1.6866251],[0.28,1.6436555],[0.29,1.6023073],[0.3,1.5625],[0.31,1.5241579],[0.32,1.48721],[0.33,1.4515895],[0.34,1.4172336],[0.35,1.384083],[0.36,1.3520822],[0.37,1.3211785],[0.38,1.2913223],[0.39,1.2624669],[0.4,1.2345679],[0.41,1.2075836],[0.42,1.1814745],[0.43,1.156203],[0.44,1.1317338],[0.45,1.1080332],[0.46,1.0850694],[0.47,1.0628122],[0.48,1.0412328],[0.49,1.0203041],[0.5,1.0],[0.51,0.980296],[0.52,0.9611688],[0.53,0.9425959],[0.54,0.9245562],[0.55,0.9070295],[0.56,0.8899964],[0.57,0.8734387],[0.58,0.8573388],[0.59,0.84168],[0.6,0.8264463],[0.61,0.8116224],[0.62,0.7971939],[0.63,0.7831467],[0.64,0.7694675],[0.65,0.7561437],[0.66,0.7431629],[0.67,0.7305136],[0.68,0.7181844],[0.69,0.7061648],[0.7,0.6944444],[0.71,0.6830135],[0.72,0.6718624],[0.73,0.6609822],[0.74,0.6503642],[0.75,0.64],[0.76,0.6298816],[0.77,0.6200012],[0.78,0.6103516],[0.79,0.6009254],[0.8,0.591716],[0.81,0.5827166],[0.82,0.573921],[0.83,0.5653231],[0.84,0.5569169],[0.85,0.5486968],[0.86,0.5406574],[0.87,0.5327934],[0.88,0.5250998],[0.89,0.5175716],[0.9,0.5102041],[0.91,0.5029928],[0.92,0.4959333],[0.93,0.4890215],[0.94,0.4822531],[0.95,0.4756243],[0.96,0.4691312],[0.97,0.4627701],[0.98,0.4565376],[0.99,0.4504302],[1.0,0.4444444],[1.01,0.4385773],[1.02,0.4328255],[1.03,0.4271861],[1.04,0.4216563],[1.05,0.4162331],[1.06,0.4109139],[1.07,0.405696],[1.08,0.4005768],[1.09,0.395554],[1.1,0.390625],[1.11,0.3857876],[1.12,0.3810395],[1.13,0.3763785],[1.14,0.3718025],[1.15,0.3673095],[1.16,0.3628974],[1.17,0.3585643],[1.18,0.3543084],[1.19,0.3501278],[1.2,0.3460208],[1.21,0.3419856],[1.22,0.3380206],[1.23,0.3341241],[1.24,0.3302946],[1.25,0.3265306],[1.26,0.3228306],[1.27,0.3191931],[1.28,0.3156167],[1.29,0.3121001],[1.3,0.308642],[1.31,0.305241],[1.32,0.3018959],[1.33,0.2986055],[1.34,0.2953686],[1.35,0.2921841],[1.36,0.2890508],[1.37,0.2859676],[1.38,0.2829335],[1.39,0.2799474],[1.4,0.2770083],[1.41,0.2741153],[1.42,0.2712674],[1.43,0.2684636],[1.44,0.2657031],[1.45,0.2629849],[1.46,0.2603082],[1.47,0.2576722],[1.48,0.255076],[1.49,0.2525189],[1.5,0.25]],"c":"force2","w":2.6},{"t":"circle","p":[143.6,154.3,5],"c":"force"},{"t":"text","p":[151.6,142.3],"s":"Venere","c":"force","size":11,"a":"start"},{"t":"circle","p":[235.0,200.0,5],"c":"force"},{"t":"text","p":[243.0,188.0],"s":"Terra","c":"force","size":11,"a":"start"},{"t":"circle","p":[407.9,228.5,5],"c":"force"},{"t":"text","p":[415.9,216.5],"s":"Marte","c":"force","size":11,"a":"start"},{"t":"text","p":[348.8,62.5],"s":"zona conservativa","c":"ax","size":10},{"t":"text","p":[348.8,77.5],"s":"0,99-1,70 UA","c":"ax","size":10},{"t":"text","p":[499.0,100.0],"s":"zona ottimistica","c":"muted","size":10,"a":"start"},{"t":"text","p":[499.0,115.0],"s":"0,75-1,77 UA","c":"muted","size":10,"a":"start"}]}
---
Flusso ricevuto in funzione della distanza dal Sole, in unità del flusso terrestre, con Venere, la Terra e Marte. La fascia scura indica la zona abitabile conservativa calcolata nel 2013 da Ravi Kopparapu e collaboratori, fra $0{,}99$ e $1{,}70$ UA; quella chiara la zona ottimistica, fra $0{,}75$ e $1{,}77$ UA.
:::

::: esempio Quadruplicare la luminosità
Una stella con luminosità quattro volte quella del Sole dà il flusso terrestre a $d=\sqrt{4/1}=2$ UA. La distanza cresce con la radice quadrata della luminosità: quadruplicando la luminosità raddoppia, e la zona abitabile si allontana e si allarga nello stesso rapporto.
:::

## La temperatura di equilibrio {#equilibrio}

Un pianeta assorbe una parte della luce che riceve e riflette il resto. La frazione riflessa a tutte le lunghezze d'onda si chiama **albedo di Bond** e si indica con $A$: vale circa $0{,}30$ per la Terra, con le nubi, i ghiacci e i deserti che riflettono molto e gli oceani che riflettono poco, $0{,}77$ per Venere, coperta di nubi di acido solforico, e $0{,}25$ per Marte.

Il pianeta intercetta la luce con la sua sezione, un disco di area $\pi R^2$, ma emette radiazione infrarossa da tutta la superficie, di area $4\pi R^2$ (figura 2). Se si tratta il pianeta come un corpo nero, che emette $\sigma T^4$ watt per metro quadrato secondo la legge di Stefan e Boltzmann, all'equilibrio la potenza assorbita uguaglia quella emessa:

$$\pi R^2(1-A)\,S=4\pi R^2\,\sigma T_\text{eq}^4,$$

con $\sigma=5{,}67\cdot10^{-8}\ \mathrm{W\,m^{-2}\,K^{-4}}$.

::: figura bilancio
{"w":760,"h":290,"items":[{"t":"arrow","p":[60,90,377.9,90],"c":"force","w":2,"head":8},{"t":"arrow","p":[60,120,350.8,120],"c":"force","w":2,"head":8},{"t":"arrow","p":[60,150,344.0,150],"c":"force","w":2,"head":8},{"t":"arrow","p":[60,180,350.8,180],"c":"force","w":2,"head":8},{"t":"arrow","p":[60,210,377.9,210],"c":"force","w":2,"head":8},{"t":"text","p":[60,72],"s":"luce della stella, flusso S","c":"force","size":12,"a":"start"},{"t":"circle","p":[420,150,70],"c":"body"},{"t":"line","p":[420,80,420,220],"c":"ax","w":1.4,"dash":true},{"t":"text","p":[420,242],"s":"sezione πR²","c":"ax","size":11},{"t":"arrow","p":[358,110,290,55],"c":"muted","w":1.8,"head":7},{"t":"text","p":[286,50],"s":"riflessa: frazione A","c":"muted","size":11,"a":"end"},{"t":"arrow","p":[406.8,75.2,399.9,35.8],"c":"force4","w":1.8,"head":7},{"t":"arrow","p":[458.0,84.2,478.0,49.5],"c":"force4","w":1.8,"head":7},{"t":"arrow","p":[491.4,124.0,529.0,110.3],"c":"force4","w":1.8,"head":7},{"t":"arrow","p":[491.4,176.0,529.0,189.7],"c":"force4","w":1.8,"head":7},{"t":"arrow","p":[458.0,215.8,478.0,250.5],"c":"force4","w":1.8,"head":7},{"t":"text","p":[550,70],"s":"infrarosso emesso","c":"force4","size":12,"a":"start"},{"t":"text","p":[550,86],"s":"da tutta la superficie, 4πR²","c":"force4","size":11,"a":"start"}]}
---
Bilancio energetico di un pianeta. La luce della stella è intercettata da un disco di area $\pi R^2$, e una frazione $A$ viene riflessa; la radiazione infrarossa è emessa da tutta la sfera, di area $4\pi R^2$. Il fattore quattro fra le due aree compare nella formula della temperatura di equilibrio.
:::

::: legge Temperatura di equilibrio
Un pianeta con albedo $A$ che riceve il flusso $S$ e irraggia come un corpo nero da tutta la superficie ha temperatura di equilibrio

$$T_\text{eq}=\left[\frac{(1-A)\,S}{4\sigma}\right]^{1/4}.$$
:::

Per la Terra, con $A=0{,}30$ e $S=1361$ watt per metro quadrato, si ottiene $T_\text{eq}\approx255$ K, cioè circa $-18$ °C. La temperatura media della superficie terrestre è invece di circa $288$ K, $15$ °C. La differenza, più di trenta gradi, è dovuta all'atmosfera: è l'**effetto serra** naturale, senza il quale gli oceani sarebbero in gran parte ghiacciati.

La temperatura di equilibrio dipende dalla radice quarta del flusso, e quindi dall'inverso della radice quadrata della distanza: a parità di albedo, un pianeta a distanza quadrupla è freddo la metà, in kelvin. Dipende anche dall'albedo, in modo meno intuitivo di quanto sembri. Venere riceve quasi il doppio del flusso terrestre, ma riflette tanta luce da avere una temperatura di equilibrio di soli $227$ K, più bassa di quella della Terra; la sua superficie, sotto un'atmosfera di anidride carbonica con una pressione novanta volte maggiore della nostra, è invece a circa $737$ K. Marte, con un'atmosfera sottilissima, ha una temperatura di equilibrio di circa $210$ K, quasi uguale a quella media della superficie (figura 3).

::: figura temperature
{"w":660,"h":285,"items":[{"t":"axes","o":[90,250],"x":[560,""],"y":[225,"temperatura, K"],"sx":1,"sy":0.27,"xt":[],"yt":[[0,"0"],[200,"200"],[400,"400"],[600,"600"],[800,"800"]]},{"t":"rect","p":[120,188.8,40,61.2],"c":"force2","r":2},{"t":"text","p":[140,182.8],"s":"227","c":"force2","size":11},{"t":"rect","p":[166,51.0,40,199.0],"c":"force","r":2},{"t":"text","p":[186,45.0],"s":"737","c":"force","size":11},{"t":"text","p":[163,268.0],"s":"Venere","c":"ax","size":12},{"t":"rect","p":[270,181.4,40,68.6],"c":"force2","r":2},{"t":"text","p":[290,175.4],"s":"254","c":"force2","size":11},{"t":"rect","p":[316,172.2,40,77.8],"c":"force","r":2},{"t":"text","p":[336,166.2],"s":"288","c":"force","size":11},{"t":"text","p":[313,268.0],"s":"Terra","c":"ax","size":12},{"t":"rect","p":[420,193.4,40,56.6],"c":"force2","r":2},{"t":"text","p":[440,187.4],"s":"210","c":"force2","size":11},{"t":"rect","p":[466,193.3,40,56.7],"c":"force","r":2},{"t":"text","p":[486,187.3],"s":"210","c":"force","size":11},{"t":"text","p":[463,268.0],"s":"Marte","c":"ax","size":12},{"t":"rect","p":[470,40,14,10],"c":"force2","r":2},{"t":"text","p":[490,49],"s":"equilibrio","c":"ax","size":11,"a":"start"},{"t":"rect","p":[470,60,14,10],"c":"force","r":2},{"t":"text","p":[490,69],"s":"superficie","c":"ax","size":11,"a":"start"}]}
---
Temperatura di equilibrio, calcolata con l'albedo di Bond, e temperatura media della superficie di Venere, della Terra e di Marte, secondo le schede della NASA. La differenza misura l'effetto serra: enorme su Venere, di circa $33$ K sulla Terra, quasi nullo su Marte.
:::

::: nota Temperatura di equilibrio e temperatura della superficie
La temperatura di equilibrio è la temperatura a cui il pianeta irraggia verso lo spazio, vista da fuori. Non è la temperatura della superficie, che dipende dall'atmosfera, dalla circolazione del calore fra giorno e notte e fra equatore e poli, e dalla capacità degli oceani di accumulare calore. Per questo una zona abitabile definita con la sola temperatura di equilibrio, per esempio fra $273$ e $373$ K, è sbagliata: i limiti veri si ricavano con modelli del clima.
:::

## L'effetto serra {#serra}

L'atmosfera terrestre è quasi trasparente alla luce visibile del Sole, che arriva in gran parte fino al suolo. La superficie riscaldata emette radiazione infrarossa, e qui l'atmosfera si comporta in modo diverso: il vapore acqueo, l'anidride carbonica, il metano e le nubi assorbono gran parte dell'infrarosso e lo riemettono in tutte le direzioni, anche verso il basso. La superficie riceve così, oltre alla luce del Sole, la radiazione infrarossa dell'atmosfera, e si porta a una temperatura più alta di quella di equilibrio.

Il modello più semplice tratta l'atmosfera come un unico strato, trasparente alla luce della stella, che assorbe una frazione $\varepsilon$ dell'infrarosso emesso dalla superficie e irraggia, alla propria temperatura, metà verso l'alto e metà verso il basso. Scrivendo il bilancio della superficie, dello strato e del pianeta visto dallo spazio si ottiene la temperatura della superficie.

::: legge Modello a uno strato
Con uno strato atmosferico che assorbe la frazione $\varepsilon$ dell'infrarosso della superficie, la temperatura della superficie vale

$$T_s=T_\text{eq}\left(\frac{2}{2-\varepsilon}\right)^{1/4}.$$

Per $\varepsilon=0$ coincide con la temperatura di equilibrio; per $\varepsilon=1$ è $2^{1/4}\approx1{,}19$ volte più alta.
:::

Con $T_\text{eq}=255$ K, uno strato che assorbe tutto l'infrarosso porterebbe la superficie a circa $303$ K; per ottenere i $288$ K osservati serve $\varepsilon\approx0{,}77$ (figura 4). Il modello è rozzo, perché l'atmosfera reale ha una temperatura che diminuisce con la quota e assorbe in modo diverso alle diverse lunghezze d'onda, ma coglie il punto essenziale: la temperatura della superficie dipende dalla capacità dell'atmosfera di trattenere l'infrarosso, e può essere molto più alta della temperatura di equilibrio.

::: figura serra
{"w":740,"h":285,"items":[{"t":"axes","o":[80,250],"x":[640,"frazione assorbita ε"],"y":[225,"temperatura della superficie, K"],"sx":480,"sy":3.6,"xt":[[0,"0"],[0.2,"0,2"],[0.4,"0,4"],[0.6,"0,6"],[0.8,"0,8"],[1.0,"1"]],"yt":[[0,"250"],[10,"260"],[20,"270"],[30,"280"],[40,"290"],[50,"300"],[60,"310"]]},{"t":"line","p":[80,167.2,560,167.2],"c":"muted","w":1.2,"dash":true},{"t":"text","p":[89.6,161.2],"s":"0 °C","c":"muted","size":10,"a":"start"},{"t":"plot","o":[80,250],"sx":480,"sy":3.6,"pts":[[0.0,4.5781448],[0.01,4.8973657],[0.02,5.218598],[0.03,5.5418648],[0.04,5.8671893],[0.05,6.1945952],[0.06,6.5241066],[0.07,6.855748],[0.08,7.1895444],[0.09,7.525521],[0.1,7.8637036],[0.11,8.2041185],[0.12,8.5467923],[0.13,8.8917521],[0.14,9.2390255],[0.15,9.5886406],[0.16,9.940626],[0.17,10.2950108],[0.18,10.6518245],[0.19,11.0110974],[0.2,11.37286],[0.21,11.7371436],[0.22,12.10398],[0.23,12.4734016],[0.24,12.8454414],[0.25,13.2201329],[0.26,13.5975104],[0.27,13.9776087],[0.28,14.3604634],[0.29,14.7461106],[0.3,15.1345873],[0.31,15.5259309],[0.32,15.9201798],[0.33,16.3173732],[0.34,16.7175507],[0.35,17.1207529],[0.36,17.5270214],[0.37,17.9363983],[0.38,18.3489267],[0.39,18.7646505],[0.4,19.1836146],[0.41,19.6058647],[0.42,20.0314475],[0.43,20.4604107],[0.44,20.8928028],[0.45,21.3286736],[0.46,21.7680737],[0.47,22.2110549],[0.48,22.6576701],[0.49,23.1079733],[0.5,23.5620197],[0.51,24.0198657],[0.52,24.4815689],[0.53,24.9471882],[0.54,25.4167837],[0.55,25.8904171],[0.56,26.3681512],[0.57,26.8500504],[0.58,27.3361805],[0.59,27.8266089],[0.6,28.3214045],[0.61,28.8206377],[0.62,29.3243808],[0.63,29.8327075],[0.64,30.3456935],[0.65,30.8634163],[0.66,31.3859552],[0.67,31.9133913],[0.68,32.445808],[0.69,32.9832906],[0.7,33.5259264],[0.71,34.0738052],[0.72,34.6270187],[0.73,35.1856613],[0.74,35.7498295],[0.75,36.3196226],[0.76,36.8951424],[0.77,37.4764932],[0.78,38.0637822],[0.79,38.6571196],[0.8,39.2566184],[0.81,39.8623948],[0.82,40.474568],[0.83,41.0932606],[0.84,41.7185989],[0.85,42.3507122],[0.86,42.989734],[0.87,43.6358012],[0.88,44.2890551],[0.89,44.9496408],[0.9,45.6177077],[0.91,46.2934097],[0.92,46.9769054],[0.93,47.668358],[0.94,48.3679359],[0.95,49.0758127],[0.96,49.792167],[0.97,50.5171836],[0.98,51.2510528],[0.99,51.993971],[1.0,52.7461411]],"c":"force2","w":2.6},{"t":"circle","p":[453.9,113.2,5],"c":"force"},{"t":"text","p":[443.9,105.2],"s":"Terra attuale","c":"force","size":11,"a":"end"}]}
---
Temperatura della superficie nel modello a uno strato, in funzione della frazione $\varepsilon$ di infrarosso assorbita dall'atmosfera, per una temperatura di equilibrio di $255$ K. La linea tratteggiata segna il punto di congelamento dell'acqua; il punto indica la Terra attuale, con $\varepsilon\approx0{,}77$.
:::

Nel 2010 Gavin Schmidt e collaboratori calcolarono con un modello del clima il contributo dei diversi assorbitori all'effetto serra terrestre: circa metà spetta al vapore acqueo, un quarto alle nubi, un quinto all'anidride carbonica e il resto ad altri gas. Il vapore acqueo però segue la temperatura, perché l'aria calda ne contiene di più, e amplifica le variazioni prodotte dagli altri gas; l'anidride carbonica, che non condensa alle temperature terrestri, è la manopola che regola il sistema. Su tempi di milioni di anni la sua concentrazione è controllata dal **ciclo dei carbonati e dei silicati**: le piogge sciolgono le rocce silicatiche più in fretta quando il clima è caldo, sottraendo anidride carbonica all'atmosfera, e più lentamente quando è freddo, lasciando accumulare quella emessa dai vulcani. Questo termostato geologico, proposto da James Walker, Paul Hays e James Kasting nel 1981, è alla base del calcolo moderno della zona abitabile, ed è discusso nel capitolo [Atmosfere, effetto serra e clima](unit:biology-23).

## I limiti della zona abitabile {#limiti}

Un pianeta come la Terra, spostato verso il Sole, si riscalda; gli oceani evaporano di più, e il vapore acqueo, gas serra, riscalda ancora. Oltre un certo flusso il vapore raggiunge gli strati alti dell'atmosfera, dove la radiazione ultravioletta lo spezza; l'idrogeno sfugge nello spazio e gli oceani si perdono in tempi geologici. È la **serra umida**. A flussi ancora maggiori l'atmosfera, satura di vapore, non riesce più a irraggiare tutta l'energia che riceve, e la superficie si riscalda finché gli oceani evaporano completamente: è la **serra galoppante**, che probabilmente ha privato Venere della sua acqua. Questi due processi fissano il **bordo interno** della zona abitabile.

Allontanando il pianeta dal Sole, il ciclo dei carbonati e dei silicati lascia accumulare anidride carbonica, e l'effetto serra cresce. Il compenso ha però un limite. Un'atmosfera molto densa di anidride carbonica diffonde una parte crescente della luce stellare verso lo spazio, come il cielo diffonde il blu, e a temperature molto basse l'anidride carbonica condensa in nubi e ghiaccio. Oltre un certo punto aggiungere gas raffredda invece di riscaldare: è il **massimo effetto serra**, che fissa il **bordo esterno**.

Nel 1993 Kasting, Whitmire e Reynolds calcolarono con un modello del clima a una dimensione, senza nubi, il bordo interno della zona abitabile del Sole attuale a $0{,}95$ UA e il bordo esterno, a seconda del criterio, fra $1{,}37$ UA, dove cominciano a formarsi nubi di anidride carbonica, e $1{,}67$ UA, al massimo effetto serra. Nel 2013 Ravi Kopparapu e collaboratori, con dati spettroscopici più recenti per il vapore acqueo e l'anidride carbonica, la spostarono fra $0{,}99$ e $1{,}70$ UA: la Terra si troverebbe vicinissima al bordo interno. Esistono anche limiti **ottimistici**, ricavati dalla storia dei pianeti vicini. Venere non ha acqua liquida da almeno un miliardo di anni, quando riceveva dal Sole, più debole, un flusso pari a circa $1{,}78$ volte quello terrestre attuale, cioè quello che oggi si riceve a $0{,}75$ UA. Marte aveva acqua liquida circa $3{,}8$ miliardi di anni fa, con un flusso pari a circa $0{,}32$ volte quello terrestre, che oggi si riceve a $1{,}77$ UA.

::: esempio La zona abitabile di una stella più luminosa
Per una stella di due luminosità solari, con i flussi efficaci $1{,}1$ e $0{,}36$ per i due bordi, la zona abitabile va da $\sqrt{2/1{,}1}\approx1{,}35$ UA a $\sqrt{2/0{,}36}\approx2{,}36$ UA. È larga circa $1{,}01$ UA, contro $0{,}71$ UA per il Sole con gli stessi flussi: il rapporto fra le larghezze è $\sqrt2\approx1{,}41$.
:::

I limiti dipendono dalle ipotesi dei modelli, e le incertezze più grandi vengono dalle nubi, che riflettono la luce della stella e trattengono l'infrarosso. Nel 2013 Jun Yang, Nicolas Cowan e Dorian Abbot mostrarono con modelli a tre dimensioni che un pianeta in rotazione sincrona, con una faccia sempre rivolta alla stella, forma uno spesso strato di nubi sopra il punto in cui la stella è allo zenit; le nubi riflettono molta luce e spostano molto verso l'interno il bordo interno. La massa del pianeta conta anch'essa: un pianeta più grande trattiene meglio l'atmosfera e ha una gravità che modifica il trasporto del vapore.

::: nota Il flusso efficace
I limiti della zona abitabile si esprimono con il **flusso efficace** $S_\text{eff}$, il flusso stellare in unità di quello terrestre a cui il modello del clima raggiunge la condizione limite. Per il Sole i valori di Kopparapu e collaboratori sono circa $1{,}01$ per la serra umida e $0{,}34$ per il massimo effetto serra; le distanze si ottengono da $d=\sqrt{L/S_\text{eff}}$. Per stelle più fredde i valori cambiano, perché la loro luce, più rossa, viene assorbita meglio dal vapore acqueo e diffusa meno dall'atmosfera.
:::

## Stelle diverse, zone diverse {#stelle}

Le stelle della sequenza principale bruciano idrogeno nel nucleo, e la loro luminosità cresce rapidamente con la massa: per stelle simili al Sole, approssimativamente come la quarta potenza. Una stella di due masse solari è più di dieci volte più luminosa del Sole, una nana rossa di un decimo di massa solare circa mille volte meno. La zona abitabile segue la radice quadrata della luminosità: attorno a una stella di tipo A come Sirio, venticinque volte più luminosa del Sole, si trova intorno a $5$ UA; attorno alle nane rosse più piccole a pochi centesimi di unità astronomica, molto più vicino della distanza di Mercurio dal Sole (figura 5).

::: figura stelle
{"w":840,"h":285,"items":[{"t":"poly","pts":[[90.0,250.2],[94.7,248.5],[99.5,246.7],[104.2,245.0],[109.0,243.2],[113.8,241.5],[118.5,239.7],[123.2,238.0],[128.0,236.2],[132.8,234.5],[137.5,232.7],[142.2,231.0],[147.0,229.2],[151.8,227.5],[156.5,225.7],[161.2,224.0],[166.0,222.2],[170.8,220.5],[175.5,218.7],[180.2,217.0],[185.0,215.2],[189.8,213.5],[194.5,211.7],[199.3,210.0],[204.0,208.2],[208.8,206.5],[213.5,204.7],[218.2,203.0],[223.0,201.2],[227.8,199.5],[232.5,197.7],[237.2,196.0],[242.0,194.2],[246.8,192.5],[251.5,190.7],[256.2,189.0],[261.0,187.2],[265.8,185.5],[270.5,183.7],[275.2,182.0],[280.0,180.2],[284.8,178.5],[289.5,176.7],[294.2,175.0],[299.0,173.2],[303.8,171.5],[308.5,169.7],[313.2,168.0],[318.0,166.2],[322.8,164.5],[327.5,162.7],[332.2,161.0],[337.0,159.2],[341.8,157.5],[346.5,155.7],[351.2,154.0],[356.0,152.2],[360.8,150.5],[365.5,148.7],[370.2,147.0],[375.0,145.2],[379.8,143.5],[384.5,141.7],[389.3,140.0],[394.0,138.2],[398.8,136.5],[403.5,134.7],[408.2,133.0],[413.0,131.2],[417.8,129.5],[422.5,127.7],[427.2,126.0],[432.0,124.2],[436.8,122.5],[441.5,120.7],[446.2,119.0],[451.0,117.2],[455.8,115.5],[460.5,113.7],[465.2,112.0],[470.0,110.2],[474.8,108.5],[479.5,106.7],[484.3,105.0],[489.0,103.2],[493.8,101.5],[498.5,99.7],[503.3,98.0],[508.0,96.2],[512.8,94.5],[517.5,92.7],[522.2,91.0],[527.0,89.2],[531.8,87.5],[536.5,85.7],[541.2,84.0],[546.0,82.2],[550.8,80.5],[555.5,78.7],[560.2,77.0],[565.0,75.2],[569.8,73.5],[574.5,71.7],[579.2,70.0],[584.0,68.2],[588.8,66.5],[593.5,64.7],[598.2,63.0],[603.0,61.2],[607.8,59.5],[612.5,57.7],[612.5,41.3],[607.8,43.0],[603.0,44.8],[598.2,46.5],[593.5,48.3],[588.8,50.0],[584.0,51.8],[579.2,53.5],[574.5,55.3],[569.8,57.0],[565.0,58.8],[560.2,60.5],[555.5,62.3],[550.8,64.0],[546.0,65.8],[541.2,67.5],[536.5,69.3],[531.8,71.0],[527.0,72.8],[522.2,74.5],[517.5,76.3],[512.8,78.0],[508.0,79.8],[503.3,81.5],[498.5,83.3],[493.8,85.0],[489.0,86.8],[484.3,88.5],[479.5,90.3],[474.8,92.0],[470.0,93.8],[465.2,95.5],[460.5,97.3],[455.8,99.0],[451.0,100.8],[446.2,102.5],[441.5,104.3],[436.8,106.0],[432.0,107.8],[427.2,109.5],[422.5,111.3],[417.8,113.0],[413.0,114.8],[408.2,116.5],[403.5,118.3],[398.8,120.0],[394.0,121.8],[389.3,123.5],[384.5,125.3],[379.8,127.0],[375.0,128.8],[370.2,130.5],[365.5,132.3],[360.8,134.0],[356.0,135.8],[351.2,137.5],[346.5,139.3],[341.8,141.0],[337.0,142.8],[332.2,144.5],[327.5,146.3],[322.8,148.0],[318.0,149.8],[313.2,151.5],[308.5,153.3],[303.8,155.0],[299.0,156.8],[294.2,158.5],[289.5,160.3],[284.8,162.0],[280.0,163.8],[275.2,165.5],[270.5,167.3],[265.8,169.0],[261.0,170.8],[256.2,172.5],[251.5,174.3],[246.8,176.0],[242.0,177.8],[237.2,179.5],[232.5,181.3],[227.8,183.0],[223.0,184.8],[218.2,186.5],[213.5,188.3],[208.8,190.0],[204.0,191.8],[199.3,193.5],[194.5,195.3],[189.8,197.0],[185.0,198.8],[180.2,200.5],[175.5,202.3],[170.8,204.0],[166.0,205.8],[161.2,207.5],[156.5,209.3],[151.8,211.0],[147.0,212.8],[142.2,214.5],[137.5,216.3],[132.8,218.0],[128.0,219.8],[123.2,221.5],[118.5,223.3],[113.8,225.0],[109.0,226.8],[104.2,228.5],[99.5,230.3],[94.7,232.0],[90.0,233.8]],"c":"muted","w":1,"close":true,"fill":true},{"t":"axes","o":[90,250],"x":[720,"luminosità, in luminosità solari"],"y":[215,"distanza, UA"],"sx":95,"sy":70,"xt":[[0,"0,0001"],[1,"0,001"],[2,"0,01"],[3,"0,1"],[4,"1"],[5,"10"]],"yt":[[0,"0,01"],[1,"0,1"],[2,"1"],[3,"10"]]},{"t":"line","p":[90,138.9,612.5,138.9],"c":"muted","w":1,"dash":true},{"t":"text","p":[612.5,132.9],"s":"orbita di Mercurio","c":"muted","size":10,"a":"end"},{"t":"circle","p":[470.0,110.0,5],"c":"force"},{"t":"text","p":[478.0,102.0],"s":"Terra","c":"force","size":11,"a":"start"},{"t":"circle","p":[203.1,202.0,5],"c":"force"},{"t":"text","p":[211.1,194.0],"s":"Proxima b","c":"force","size":11,"a":"start"},{"t":"circle","p":[160.6,217.4,5],"c":"force"},{"t":"text","p":[168.6,231.4],"s":"TRAPPIST-1e","c":"force","size":11,"a":"start"},{"t":"text","p":[356.0,127.4],"s":"zona abitabile","c":"ax","size":11,"a":"end"}]}
---
Distanza della zona abitabile in funzione della luminosità della stella, in scala logaritmica, calcolata con i flussi efficaci del Sole, $1{,}01$ e $0{,}34$. Sono indicati la Terra, Proxima Centauri b e TRAPPIST-1e. Per le stelle fredde i limiti reali sono un po' diversi, perché i flussi efficaci dipendono dal colore della luce.
:::

Le stelle luminose vivono poco. Il combustibile di una stella è proporzionale alla sua massa e il consumo alla sua luminosità, e il tempo trascorso sulla sequenza principale vale approssimativamente dieci miliardi di anni moltiplicati per $(M/M_\odot)/(L/L_\odot)$. Una stella di due masse solari e venticinque luminosità solari vive meno di un miliardo di anni, forse troppo poco perché la vita, se si forma, cambi l'atmosfera del suo pianeta in modo riconoscibile. Le nane rosse vivono invece da centinaia a migliaia di miliardi di anni, e sono le stelle più comuni della Galassia.

Due pianeti vicini mostrano quanto sia diversa la zona abitabile di una nana rossa. Proxima Centauri, la stella più vicina al Sole, ha una luminosità di circa $0{,}0016$ volte quella solare; il pianeta Proxima b, scoperto nel 2016 da Guillem Anglada-Escudé e collaboratori, orbita a $0{,}0485$ UA in poco più di undici giorni e riceve circa il $65\%$ del flusso terrestre. TRAPPIST-1, una nana ultrafredda con luminosità di circa $0{,}00055$ volte quella solare, ha sette pianeti di dimensioni terrestri, tutti più vicini alla stella di quanto Mercurio sia al Sole; il quarto, TRAPPIST-1e, a $0{,}0293$ UA, riceve anch'esso circa il $65\%$ del flusso terrestre. Pianeti così vicini alla stella ruotano probabilmente in modo sincrono, con un emisfero sempre illuminato, e ricevono i brillamenti di una stella attiva, come si discute nel capitolo [Abitabilità attorno alle nane rosse](unit:biology-24).

## Una zona che si sposta nel tempo {#tempo}

Le stelle cambiano luminosità durante la loro vita. Nel nucleo del Sole l'idrogeno si trasforma in elio, il numero di particelle diminuisce, il nucleo si contrae e si riscalda, e le reazioni nucleari accelerano: il Sole diventa lentamente più luminoso. Una formula approssimata, ricavata nel 1981 da Douglas Gough dai modelli dell'interno solare, dà la luminosità all'età $t$:

$$L(t)=\frac{L_\odot}{1+\frac25\left(1-t/t_\odot\right)},$$

dove $t_\odot\approx4{,}57$ miliardi di anni è l'età attuale. Alla nascita il Sole aveva circa il $71\%$ della luminosità attuale; quattro miliardi di anni fa circa il $74\%$; fra un miliardo di anni ne avrà circa il $110\%$.

La zona abitabile si sposta quindi verso l'esterno (figura 6). Un pianeta resta abitabile a lungo solo se si trova nella **zona continuamente abitabile**, la fascia che rimane abitabile per un intervallo prefissato. Per $4{,}6$ miliardi di anni, Kasting e collaboratori la stimarono nel 1993 fra $0{,}95$ e $1{,}15$ UA: una fascia stretta, che contiene la Terra. Con un flusso efficace di $1{,}1$ per il bordo interno, corrispondente ai $0{,}95$ UA ottenuti nel 2013 da Jérémy Leconte e collaboratori con un modello tridimensionale, il Sole porterà la Terra fuori dalla zona abitabile fra circa un miliardo di anni; Ken Caldeira e Kasting stimarono nel 1992 una durata residua della biosfera fra $0{,}9$ e $1{,}5$ miliardi di anni.

::: figura tempo
{"w":800,"h":285,"items":[{"t":"poly","pts":[[70.0,216.5],[74.0,216.3],[78.0,216.1],[82.0,215.9],[86.0,215.8],[90.0,215.6],[94.0,215.4],[98.0,215.2],[102.0,215.0],[106.0,214.8],[110.0,214.6],[114.0,214.4],[118.0,214.2],[122.0,214.0],[126.0,213.8],[130.0,213.6],[134.0,213.4],[138.0,213.2],[142.0,213.0],[146.0,212.8],[150.0,212.6],[154.0,212.4],[158.0,212.2],[162.0,212.0],[166.0,211.8],[170.0,211.6],[174.0,211.4],[178.0,211.2],[182.0,211.0],[186.0,210.8],[190.0,210.6],[194.0,210.4],[198.0,210.1],[202.0,209.9],[206.0,209.7],[210.0,209.5],[214.0,209.3],[218.0,209.1],[222.0,208.8],[226.0,208.6],[230.0,208.4],[234.0,208.2],[238.0,207.9],[242.0,207.7],[246.0,207.5],[250.0,207.2],[254.0,207.0],[258.0,206.8],[262.0,206.5],[266.0,206.3],[270.0,206.1],[274.0,205.8],[278.0,205.6],[282.0,205.4],[286.0,205.1],[290.0,204.9],[294.0,204.6],[298.0,204.4],[302.0,204.1],[306.0,203.9],[310.0,203.6],[314.0,203.4],[318.0,203.1],[322.0,202.9],[326.0,202.6],[330.0,202.4],[334.0,202.1],[338.0,201.8],[342.0,201.6],[346.0,201.3],[350.0,201.1],[354.0,200.8],[358.0,200.5],[362.0,200.3],[366.0,200.0],[370.0,199.7],[374.0,199.4],[378.0,199.2],[382.0,198.9],[386.0,198.6],[390.0,198.3],[394.0,198.0],[398.0,197.7],[402.0,197.5],[406.0,197.2],[410.0,196.9],[414.0,196.6],[418.0,196.3],[422.0,196.0],[426.0,195.7],[430.0,195.4],[434.0,195.1],[438.0,194.8],[442.0,194.5],[446.0,194.2],[450.0,193.9],[454.0,193.5],[458.0,193.2],[462.0,192.9],[466.0,192.6],[470.0,192.3],[474.0,192.0],[478.0,191.6],[482.0,191.3],[486.0,191.0],[490.0,190.6],[494.0,190.3],[498.0,190.0],[502.0,189.6],[506.0,189.3],[510.0,188.9],[514.0,188.6],[518.0,188.2],[522.0,187.9],[526.0,187.5],[530.0,187.2],[534.0,186.8],[538.0,186.5],[542.0,186.1],[546.0,185.7],[550.0,185.4],[550.0,78.8],[546.0,79.4],[542.0,80.1],[538.0,80.7],[534.0,81.3],[530.0,81.9],[526.0,82.5],[522.0,83.2],[518.0,83.8],[514.0,84.4],[510.0,85.0],[506.0,85.5],[502.0,86.1],[498.0,86.7],[494.0,87.3],[490.0,87.9],[486.0,88.4],[482.0,89.0],[478.0,89.6],[474.0,90.1],[470.0,90.7],[466.0,91.2],[462.0,91.8],[458.0,92.3],[454.0,92.9],[450.0,93.4],[446.0,93.9],[442.0,94.5],[438.0,95.0],[434.0,95.5],[430.0,96.0],[426.0,96.5],[422.0,97.1],[418.0,97.6],[414.0,98.1],[410.0,98.6],[406.0,99.1],[402.0,99.6],[398.0,100.1],[394.0,100.6],[390.0,101.0],[386.0,101.5],[382.0,102.0],[378.0,102.5],[374.0,103.0],[370.0,103.4],[366.0,103.9],[362.0,104.4],[358.0,104.8],[354.0,105.3],[350.0,105.8],[346.0,106.2],[342.0,106.7],[338.0,107.1],[334.0,107.6],[330.0,108.0],[326.0,108.4],[322.0,108.9],[318.0,109.3],[314.0,109.8],[310.0,110.2],[306.0,110.6],[302.0,111.0],[298.0,111.5],[294.0,111.9],[290.0,112.3],[286.0,112.7],[282.0,113.1],[278.0,113.6],[274.0,114.0],[270.0,114.4],[266.0,114.8],[262.0,115.2],[258.0,115.6],[254.0,116.0],[250.0,116.4],[246.0,116.8],[242.0,117.2],[238.0,117.6],[234.0,117.9],[230.0,118.3],[226.0,118.7],[222.0,119.1],[218.0,119.5],[214.0,119.9],[210.0,120.2],[206.0,120.6],[202.0,121.0],[198.0,121.3],[194.0,121.7],[190.0,122.1],[186.0,122.4],[182.0,122.8],[178.0,123.2],[174.0,123.5],[170.0,123.9],[166.0,124.2],[162.0,124.6],[158.0,124.9],[154.0,125.3],[150.0,125.6],[146.0,126.0],[142.0,126.3],[138.0,126.7],[134.0,127.0],[130.0,127.4],[126.0,127.7],[122.0,128.0],[118.0,128.4],[114.0,128.7],[110.0,129.0],[106.0,129.4],[102.0,129.7],[98.0,130.0],[94.0,130.3],[90.0,130.7],[86.0,131.0],[82.0,131.3],[78.0,131.6],[74.0,131.9],[70.0,132.3]],"c":"muted","w":1,"close":true,"fill":true},{"t":"axes","o":[70,250],"x":[700,"età del Sole, miliardi di anni"],"y":[215,"distanza, UA"],"sx":80,"sy":140,"xt":[[0,"0"],[1,"1"],[2,"2"],[3,"3"],[4,"4"],[5,"5"],[6,"6"]],"yt":[[0.0,"0,6"],[0.4,"1,0"],[0.8,"1,4"],[1.2,"1,8"]]},{"t":"line","p":[70,232.8,550,232.8],"c":"force","w":1.6},{"t":"text","p":[558,236.8],"s":"Venere","c":"force","size":11,"a":"start"},{"t":"line","p":[70,194.0,550,194.0],"c":"force","w":1.6},{"t":"text","p":[558,198.0],"s":"Terra","c":"force","size":11,"a":"start"},{"t":"line","p":[70,120.6,550,120.6],"c":"force","w":1.6},{"t":"text","p":[558,124.6],"s":"Marte","c":"force","size":11,"a":"start"},{"t":"line","p":[435.6,250.0,435.6,54.0],"c":"ax","w":1,"dash":true},{"t":"text","p":[435.6,50.0],"s":"oggi","c":"ax","size":10},{"t":"text","p":[150.0,166.0],"s":"zona abitabile","c":"ax","size":11}]}
---
Bordi della zona abitabile del Sole nel tempo, calcolati con la luminosità di Gough e con i flussi efficaci conservativi $1{,}01$ e $0{,}34$, e orbite di Venere, della Terra e di Marte. La zona abitabile si allontana dal Sole; la Terra è vicina al bordo interno e, con questi limiti conservativi, lo attraverserà fra circa centocinquanta milioni di anni.
:::

Lo stesso calcolo, fatto all'indietro, pone un problema. Quattro miliardi di anni fa la Terra, con l'albedo e l'atmosfera attuali, avrebbe avuto una temperatura di equilibrio di circa $236$ K e oceani gelati; le rocce sedimentarie e gli zirconi mostrano invece acqua liquida già allora. È il **paradosso del Sole giovane e debole**, formulato nel 1972 da Carl Sagan e George Mullen. La soluzione più accettata è un effetto serra più forte, con molta più anidride carbonica e forse metano prodotto dai primi microrganismi, come si discute nel capitolo [Atmosfere, effetto serra e clima](unit:biology-23). Marte, che ha avuto laghi e fiumi più di tre miliardi e mezzo di anni fa, ricevendo meno di un terzo del flusso terrestre attuale, pone lo stesso problema in forma più acuta: ne parla il capitolo [Marte: acqua e abitabilità passata](unit:biology-26).

Anche le nane rosse cambiano. Prima di stabilizzarsi sulla sequenza principale si contraggono per centinaia di milioni di anni e sono molto più luminose; un pianeta oggi nella loro zona abitabile può aver attraversato in gioventù una fase di serra galoppante e aver perso gran parte della sua acqua.

## Oltre la zona abitabile {#oltre}

La zona abitabile classica riguarda l'acqua liquida alla **superficie**, scaldata dalla luce della stella. Il sistema solare mostra che l'acqua liquida può esistere anche altrove. Europa, una luna di Giove, ed Encelado, una luna di Saturno, sono ben oltre il bordo esterno, con superfici a più di cento gradi sotto lo zero, eppure nascondono oceani sotto la crosta di ghiaccio. Il calore che li mantiene liquidi viene dalle **maree**: le orbite leggermente eccentriche fanno variare l'attrazione del pianeta, e le lune si deformano e si scaldano per attrito interno. Questi oceani, in contatto con il fondale roccioso, sono fra i luoghi più promettenti per cercare la vita, come mostrano i capitoli [Europa e gli oceani sotto il ghiaccio](unit:biology-28) ed [Encelado e i suoi pennacchi](unit:biology-29).

Altri meccanismi allargano la zona. Nel 2011 Raymond Pierrehumbert ed Eric Gaidos calcolarono che un pianeta con un'atmosfera densa di idrogeno, gas che produce un forte effetto serra quando le molecole si urtano, potrebbe mantenere acqua liquida in superficie fino a una decina di unità astronomiche da una stella come il Sole. Già nel 1999 David Stevenson aveva osservato che un pianeta espulso dal suo sistema, con un'atmosfera di idrogeno spessa, potrebbe conservare acqua liquida grazie al solo calore interno.

All'inverso, trovarsi nella zona abitabile non basta. Un pianeta troppo piccolo perde l'atmosfera, come Marte, e con essa la capacità di trattenere il calore; un pianeta senza acqua iniziale non ne avrà; un pianeta senza un ciclo geologico che ricicli l'anidride carbonica può scivolare in una glaciazione totale o in una serra eccessiva. La zona abitabile seleziona i candidati da osservare: è una condizione favorevole e insufficiente, e la verifica spetta alle osservazioni delle atmosfere, discusse nel capitolo [Atmosfere degli esopianeti e JWST](unit:biology-32).

## La zona abitabile galattica {#galattica}

Nel 2001 Guillermo Gonzalez, Donald Brownlee e Peter Ward estesero l'idea di zona abitabile alla Galassia. Per formare pianeti rocciosi servono elementi più pesanti dell'elio, che le generazioni successive di stelle hanno prodotto e disperso nel gas interstellare; la loro abbondanza, chiamata **metallicità**, è più alta verso il centro della Galassia e più bassa nelle regioni esterne. Nelle regioni centrali, però, le stelle sono fitte e le esplosioni di supernova frequenti, e la radiazione di una supernova vicina potrebbe distruggere lo strato di ozono di un pianeta.

Nel 2004 Charles Lineweaver, Yeshe Fenner e Brad Gibson costruirono un modello dell'evoluzione chimica della Via Lattea e individuarono una **zona abitabile galattica** a forma di anello, fra $7$ e $9$ kiloparsec dal centro, che si allarga con il tempo ed è composta da stelle formate fra $8$ e $4$ miliardi di anni fa; secondo il loro modello tre quarti delle stelle di questo anello sono più vecchie del Sole. Il Sole si trova a circa $8{,}2$ kiloparsec dal centro, all'interno dell'anello.

Il concetto è molto più incerto della zona abitabile di una stella. La relazione fra metallicità e formazione dei pianeti rocciosi è debole: i pianeti giganti sono molto più frequenti attorno alle stelle ricche di metalli, mentre i pianeti piccoli si trovano attorno a stelle di metallicità molto diversa. Anche l'effetto delle supernove è discusso, perché la vita microbica degli oceani e del sottosuolo sopporterebbe la perdita temporanea dello strato di ozono. Nel 2008 Nikos Prantzos concluse che, allo stato attuale delle conoscenze, quasi tutto il disco della Galassia potrebbe essere adatto alla vita.

::: approfondimento Che cosa si misura e che cosa si stima
Nella zona abitabile di una stella si combinano grandezze di qualità diversa. La luminosità di una stella vicina e la distanza di un pianeta si misurano con precisione di pochi punti percentuali. I flussi efficaci dei bordi vengono da modelli del clima, con incertezze di decine di punti percentuali dovute soprattutto alle nubi. La presenza di acqua, di un'atmosfera adatta e di un ciclo geologico sono, per gli esopianeti, ancora ipotesi. Una buona regola è dichiarare sempre quali limiti si usano: conservativi, ottimistici o derivati da modelli tridimensionali.
:::

## Un'esperienza: albedo e distanza {#esperienza}

Due grandezze decidono la temperatura di equilibrio di un pianeta: il flusso che riceve, che dipende dalla distanza dalla stella, e la frazione che assorbe, che dipende dall'albedo. Una lampada e due barattoli permettono di vedere entrambi gli effetti.

::: metodo Due barattoli sotto la lampada
**Materiale.** Due barattoli di metallo uguali, per esempio due lattine vuote, carta nera e carta bianca, nastro adesivo, due termometri da cucina o da acquario, una lampada da scrivania con una lampadina a incandescenza o alogena, un metro, un orologio.

**Procedura.** Si avvolge un barattolo nella carta nera e l'altro nella carta bianca, si riempiono con la stessa quantità d'acqua a temperatura ambiente e si inserisce un termometro in ciascuno. Si mettono i due barattoli affiancati a $30$ cm dalla lampada, alla stessa altezza, e si legge la temperatura ogni due minuti per mezz'ora. Si ripete l'esperienza con acqua fresca e i barattoli a $60$ cm. La lampada scalda: va maneggiata solo da spenta e fredda, e va sorvegliata finché resta accesa.

**Analisi.** Disegnare la temperatura in funzione del tempo per i quattro casi. Quale barattolo si scalda di più, e di quanto? Di quanto si riduce l'aumento di temperatura raddoppiando la distanza, e come si confronta con il fattore quattro previsto dalla legge dell'inverso del quadrato? Perché dopo un po' la temperatura smette di salire? Collegare la risposta al bilancio fra energia assorbita ed emessa.
:::

La temperatura finale non è una vera temperatura di equilibrio radiativo, perché i barattoli perdono calore anche per conduzione e convezione verso l'aria. Le tendenze sono però le stesse dei pianeti: il barattolo scuro, con albedo bassa, si scalda di più, e l'effetto della distanza è forte, anche se l'aumento di temperatura misurato non segue esattamente il fattore quattro, perché la lampada non è una sorgente puntiforme e le perdite crescono con la temperatura.

## Errori frequenti {#errori}

::: errore Credere che nella zona abitabile ci sia vita
La zona abitabile indica dove l'acqua liquida è possibile alla superficie di un pianeta roccioso con un'atmosfera adatta. La presenza di acqua, di un'atmosfera e di vita va verificata con le osservazioni; Venere e Marte, ai bordi della zona abitabile del Sole, sono oggi inospitali.
:::

::: errore Confondere temperatura di equilibrio e temperatura della superficie
La temperatura di equilibrio della Terra è circa $255$ K, quella della superficie $288$ K. L'atmosfera può alzare la temperatura della superficie di decine o, come su Venere, di centinaia di gradi.
:::

::: errore Definire la zona abitabile fra 273 e 373 K di temperatura di equilibrio
Con questo criterio la Terra, che ha una temperatura di equilibrio di $255$ K, sarebbe fuori dalla zona abitabile. I bordi veri si ricavano da modelli del clima che includono l'effetto serra e la sua variazione con il flusso.
:::

::: errore Pensare che la zona abitabile sia fissa
La luminosità delle stelle cresce durante la sequenza principale, e la zona abitabile si sposta verso l'esterno. Il Sole era circa il $30\%$ meno luminoso alla nascita, e la Terra è rimasta abitabile grazie a un effetto serra più forte.
:::

::: errore Credere che fuori dalla zona abitabile non ci sia acqua liquida
Il calore di marea e il calore interno mantengono oceani sotto il ghiaccio di Europa ed Encelado, molto oltre il bordo esterno. La zona abitabile classica riguarda soltanto l'acqua alla superficie.
:::

## Sintesi {#sintesi}

::: sintesi In breve
- Il flusso di una stella decresce con l'inverso del quadrato della distanza; in unità terrestri $S/S_\oplus=L/d^2$, con $L$ in luminosità solari e $d$ in unità astronomiche.
- La temperatura di equilibrio di un pianeta vale $T_\text{eq}=[(1-A)S/(4\sigma)]^{1/4}$; per la Terra circa $255$ K, contro $288$ K alla superficie.
- L'effetto serra, dovuto soprattutto a vapore acqueo, nubi e anidride carbonica, alza la temperatura della superficie; il ciclo dei carbonati e dei silicati regola l'anidride carbonica su tempi geologici.
- Il bordo interno della zona abitabile è fissato dalla serra umida e dalla serra galoppante, quello esterno dal massimo effetto serra; per il Sole i limiti conservativi sono circa $0{,}99$ e $1{,}70$ UA, quelli ottimistici $0{,}75$ e $1{,}77$ UA.
- La distanza della zona abitabile cresce con la radice quadrata della luminosità: per le nane rosse è di pochi centesimi di unità astronomica.
- Le stelle diventano più luminose con l'età, e la zona abitabile si sposta verso l'esterno; il paradosso del Sole giovane e debole si risolve con un effetto serra più forte.
- L'acqua liquida può esistere anche fuori dalla zona abitabile, sotto il ghiaccio di lune scaldate dalle maree.
- La zona abitabile galattica, un anello fra $7$ e $9$ kiloparsec dal centro secondo un modello del 2004, è un concetto molto più incerto.
:::

## Glossario {#glossario}

- **Albedo di Bond**: frazione della radiazione incidente, a tutte le lunghezze d'onda, riflessa da un pianeta.
- **Ciclo dei carbonati e dei silicati**: insieme di processi geologici che regolano l'anidride carbonica dell'atmosfera, con l'alterazione delle rocce più veloce nei climi caldi.
- **Effetto serra**: riscaldamento della superficie dovuto ai gas e alle nubi che assorbono e riemettono la radiazione infrarossa.
- **Flusso**: potenza della radiazione che attraversa un metro quadrato perpendicolare alla direzione di propagazione.
- **Flusso efficace**: flusso stellare, in unità di quello terrestre, che corrisponde a un bordo della zona abitabile.
- **Luminosità**: potenza totale emessa da una stella.
- **Metallicità**: abbondanza degli elementi più pesanti dell'elio in una stella o nel gas interstellare.
- **Serra galoppante**: condizione in cui l'atmosfera satura di vapore non riesce a irraggiare l'energia ricevuta, e gli oceani evaporano completamente.
- **Serra umida**: condizione in cui il vapore raggiunge l'alta atmosfera, dove viene scisso, e l'idrogeno sfugge nello spazio.
- **Temperatura di equilibrio**: temperatura a cui un pianeta irraggerebbe come corpo nero tutta l'energia che assorbe.
- **Zona abitabile**: fascia di distanze da una stella in cui un pianeta roccioso con un'atmosfera adatta può mantenere acqua liquida alla superficie.
- **Zona continuamente abitabile**: fascia che rimane nella zona abitabile per un intervallo di tempo prefissato.

## Esercizi {#esercizi}

::: esercizio Il flusso su Marte [base]
Marte orbita a $1{,}524$ UA dal Sole. Quale flusso riceve, in unità terrestri e in watt per metro quadrato, con $S_\oplus=1361$ W/m$^2$?
>>> soluzione
$S/S_\oplus=1/1{,}524^2\approx0{,}43$, cioè circa $1361\cdot0{,}43\approx586$ W/m$^2$.
:::

::: esercizio Una nana rossa [base]
A quale distanza una stella con luminosità $0{,}0017$ volte quella del Sole fornisce a un pianeta lo stesso flusso che la Terra riceve dal Sole?
>>> soluzione
$d=\sqrt{0{,}0017}\approx0{,}041$ UA, circa dieci volte più vicino della distanza di Mercurio dal Sole.
:::

::: esercizio La temperatura di equilibrio della Terra [base]
Calcolare la temperatura di equilibrio della Terra con $A=0{,}30$, $S=1361$ W/m$^2$ e $\sigma=5{,}67\cdot10^{-8}$ W m$^{-2}$ K$^{-4}$, e confrontarla con la temperatura media della superficie, $288$ K.
>>> soluzione
Si calcola

$$\begin{aligned}\frac{(1-A)S}{4\sigma}&=\frac{0{,}70\cdot1361}{2{,}27\cdot10^{-7}}\ \mathrm{K^4}\\&\approx4{,}2\cdot10^9\ \mathrm{K^4},\end{aligned}$$

e la radice quarta vale circa $255$ K, cioè $-18$ °C. L'effetto serra alza la temperatura della superficie di circa $33$ K.
:::

::: esercizio Quadruplicare e nonuplicare [base]
A quale distanza una stella di $4$ luminosità solari, e una di $9$, forniscono il flusso terrestre?
>>> soluzione
$d=\sqrt4=2$ UA e $d=\sqrt9=3$ UA. La distanza cresce con la radice quadrata della luminosità.
:::

::: esercizio Il paradosso di Venere [base]
Venere riceve circa $2601$ W/m$^2$ e ha albedo $0{,}77$. Calcolare la temperatura di equilibrio, e quella che avrebbe con l'albedo terrestre di $0{,}30$.
>>> soluzione
Con $A=0{,}77$ si ottiene circa $227$ K, meno della Terra; con $A=0{,}30$ circa $299$ K. Le nubi di Venere riflettono tanta luce da compensare la vicinanza al Sole. La superficie, a $737$ K, è invece rovente per l'enorme effetto serra.
:::

::: esercizio Proxima b [base]
Proxima Centauri ha luminosità $0{,}00155$ volte quella del Sole, e il pianeta Proxima b orbita a $0{,}0485$ UA. Quale flusso riceve, in unità terrestri?
>>> soluzione
$S/S_\oplus=0{,}00155/0{,}0485^2\approx0{,}66$: circa due terzi del flusso terrestre, all'interno della zona abitabile della stella.
:::

::: esercizio Una stella più luminosa [medio]
Calcolare i bordi della zona abitabile di una stella di due luminosità solari con i flussi efficaci $1{,}1$ e $0{,}36$, e confrontarne la larghezza con quella del Sole calcolata con gli stessi flussi.
>>> soluzione
I bordi sono $\sqrt{2/1{,}1}\approx1{,}35$ UA e $\sqrt{2/0{,}36}\approx2{,}36$ UA, per una larghezza di circa $1{,}01$ UA. Per il Sole $\sqrt{1/1{,}1}\approx0{,}95$ e $\sqrt{1/0{,}36}\approx1{,}67$ UA, larghezza $0{,}71$ UA. Il rapporto è $\sqrt2\approx1{,}41$, perché tutte le distanze crescono con la radice della luminosità.
:::

::: esercizio Il modello a uno strato [medio]
Con $T_\text{eq}=255$ K, quale frazione $\varepsilon$ di infrarosso deve assorbire lo strato atmosferico perché la superficie sia a $288$ K? Quale sarebbe la temperatura con $\varepsilon=1$?
>>> soluzione
Da $(T_s/T_\text{eq})^4=2/(2-\varepsilon)$ si ha $(288/255)^4\approx1{,}63$, e $\varepsilon=2-2/1{,}63\approx0{,}77$. Con $\varepsilon=1$ la temperatura è $255\cdot2^{1/4}\approx303$ K.
:::

::: esercizio TRAPPIST-1e [medio]
TRAPPIST-1 ha luminosità $0{,}000553$ volte quella del Sole e TRAPPIST-1e orbita a $0{,}02925$ UA. Calcolare il flusso ricevuto e la temperatura di equilibrio con albedo $0{,}30$.
>>> soluzione
$S/S_\oplus=0{,}000553/0{,}02925^2\approx0{,}65$. La temperatura di equilibrio è quella della Terra moltiplicata per $0{,}65^{1/4}\approx0{,}90$, cioè circa $228$ K, simile a quella di Marte.
:::

::: esercizio Il Sole giovane [medio]
Quattro miliardi di anni fa il Sole aveva circa il $74\%$ della luminosità attuale. Calcolare la temperatura di equilibrio della Terra con $A=0{,}30$ e il valore di $\varepsilon$ necessario, nel modello a uno strato, per portare la superficie a $273$ K. Che cosa succede se si chiede di arrivare a $288$ K?
>>> soluzione
Con la temperatura di equilibrio attuale, $254{,}6$ K prima dell'arrotondamento, si ha $T_\text{eq}=254{,}6\cdot0{,}74^{1/4}\approx236$ K. Per $273$ K serve $(273/236)^4\approx1{,}79=2/(2-\varepsilon)$, cioè $\varepsilon\approx0{,}88$. Per $288$ K servirebbe $(288/236)^4\approx2{,}21$, cioè $\varepsilon\approx1{,}10$, impossibile: uno strato non può assorbire più di tutto l'infrarosso. Il modello a uno strato non basta, e serve un'atmosfera spessa in cui l'infrarosso viene assorbito e riemesso molte volte, con più anidride carbonica e metano di oggi.
:::

::: esercizio Un anello nella Galassia [medio]
Considerando il disco della Galassia come un cerchio di $15$ kiloparsec di raggio, quale frazione della sua area occupa l'anello fra $7$ e $9$ kiloparsec? Perché la frazione delle stelle è diversa?
>>> soluzione
L'area dell'anello è $\pi(9^2-7^2)\approx100$ kpc$^2$, quella del disco $\pi\cdot15^2\approx707$ kpc$^2$: circa il $14\%$. La densità di stelle cresce verso il centro, quindi la frazione delle stelle nell'anello è diversa da quella dell'area.
:::

::: esercizio Quanto vive una stella [medio]
Il tempo trascorso sulla sequenza principale vale circa $10$ miliardi di anni per $M/L$, con massa e luminosità in unità solari. Stimarlo per una stella di $2$ masse e $25$ luminosità solari, e per una nana rossa di $0{,}1$ masse e $0{,}001$ luminosità solari.
>>> soluzione
Per la prima $10\cdot2/25=0{,}8$ miliardi di anni; per la nana rossa $10\cdot0{,}1/0{,}001=1000$ miliardi di anni, molto più dell'età attuale dell'universo. Le stelle luminose offrono poco tempo all'evoluzione della vita; le nane rosse, al contrario, ne offrono moltissimo.
:::

::: esercizio La temperatura e la distanza [avanzato]
Mostrare che, a parità di albedo, la temperatura di equilibrio è proporzionale a $d^{-1/2}$. Usare il risultato per stimare la temperatura di equilibrio di Marte a partire da quella della Terra, $255$ K, con la stessa albedo, e confrontarla con il valore della NASA, $210$ K, ottenuto con l'albedo marziana di $0{,}25$.
>>> soluzione
Poiché $S\propto d^{-2}$ e $T_\text{eq}\propto S^{1/4}$, si ha $T_\text{eq}\propto d^{-1/2}$. Per Marte $255/\sqrt{1{,}524}\approx206$ K. Con l'albedo di Marte, più bassa di quella terrestre, la temperatura sale leggermente, a circa $210$ K.
:::

::: esercizio Una zona abitabile ingenua [avanzato]
Supponiamo di definire la zona abitabile come la fascia in cui la temperatura di equilibrio, con $A=0{,}31$, è fra $273$ e $373$ K. Calcolare i due bordi per il Sole sapendo che a $1$ UA la temperatura di equilibrio vale $254$ K, e discutere il risultato.
>>> soluzione
Da $T_\text{eq}\propto d^{-1/2}$ si ha $d=(254/T)^2$ UA: $(254/273)^2\approx0{,}87$ UA e $(254/373)^2\approx0{,}46$ UA. Con questa definizione la Terra, a $1$ UA, sarebbe troppo fredda per avere acqua liquida, contro l'evidenza. La temperatura di equilibrio ignora l'effetto serra, e i bordi corretti si ottengono con modelli del clima.
:::

::: esercizio Quando la Terra uscirà [avanzato]
Con la formula di Gough, $L(t)=L_\odot/[1+0{,}4\,(1-t/t_\odot)]$ e $t_\odot=4{,}57$ miliardi di anni, calcolare quando il flusso sulla Terra raggiungerà $1{,}1$ volte il valore attuale.
>>> soluzione
Si impone $1+0{,}4\,(1-t/t_\odot)=1/1{,}1\approx0{,}909$, da cui $1-t/t_\odot\approx-0{,}227$ e $t\approx1{,}227\cdot4{,}57\approx5{,}61$ miliardi di anni. Mancano circa $1{,}04$ miliardi di anni, in accordo con le stime della durata residua della biosfera.
:::

::: esercizio Un pianeta a dieci unità astronomiche [avanzato]
Un pianeta con albedo $0{,}30$ orbita a $10$ UA da una stella come il Sole. Calcolare la temperatura di equilibrio e il valore di $(273/T_\text{eq})^4$. Che cosa dice il risultato sull'atmosfera necessaria per avere acqua liquida?
>>> soluzione
Il flusso è un centesimo di quello terrestre, e $T_\text{eq}=255/\sqrt{10}\approx81$ K. Si ha $(273/81)^4\approx130$, mentre il modello a uno strato arriva al massimo a $2$. Servirebbe un'atmosfera molto spessa e molto opaca all'infrarosso, come quelle di idrogeno denso studiate da Pierrehumbert e Gaidos, capaci di riscaldare la superficie di quasi duecento gradi.
:::

## Fonti {#fonti}

Il testo, le figure, gli esempi e gli esercizi di questo capitolo sono originali. Per la scelta e l'ordine degli argomenti il riferimento principale è A. M. Shaw, *Astrochemistry: From Astronomy to Astrobiology*, Wiley, 2006, §7.1 (struttura di un sistema stella-pianeta) e §7.6-7.7 (riscaldamento radiativo e zona abitabile). Shaw definisce la zona abitabile con una temperatura di equilibrio fra $273$ e $373$ K e, nell'esempio 7.2, omette un fattore quattro nel bilancio energetico, ottenendo $1{,}72$ e $0{,}92$ UA invece di circa $0{,}87$ e $0{,}46$ UA; afferma inoltre che la luminosità del Sole stia diminuendo, mentre cresce. I limiti usati in questo capitolo vengono dai modelli del clima citati qui sotto, e le grandezze planetarie dalle schede della NASA.

1. H. Strughold, *The Green and Red Planet*, University of New Mexico Press (1953); S.-S. Huang, *American Scientist* 47, 397 (1959): le prime idee di zona abitabile.
2. J. F. Kasting, D. P. Whitmire, R. T. Reynolds, *Icarus* 101, 108 (1993): la zona abitabile e la zona continuamente abitabile.
3. R. K. Kopparapu e collaboratori, *The Astrophysical Journal* 765, 131 (2013): i limiti aggiornati della zona abitabile.
4. G. Kopp, J. L. Lean, *Geophysical Research Letters* 38, L01706 (2011): il flusso solare totale.
5. D. R. Williams, *Planetary Fact Sheets*, NASA Space Science Data Coordinated Archive: albedo, temperature di equilibrio e temperature medie di Venere, della Terra e di Marte.
6. G. A. Schmidt e collaboratori, *Journal of Geophysical Research* 115, D20106 (2010): i contributi all'effetto serra terrestre.
7. J. C. G. Walker, P. B. Hays, J. F. Kasting, *Journal of Geophysical Research* 86, 9776 (1981): il termostato dei carbonati e dei silicati.
8. J. Yang, N. B. Cowan, D. S. Abbot, *The Astrophysical Journal Letters* 771, L45 (2013); J. Leconte e collaboratori, *Nature* 504, 268 (2013): nubi e bordo interno nei modelli tridimensionali.
9. G. Anglada-Escudé e collaboratori, *Nature* 536, 437 (2016): Proxima b; E. Agol e collaboratori, *The Planetary Science Journal* 2, 1 (2021): il sistema di TRAPPIST-1.
10. D. O. Gough, *Solar Physics* 74, 21 (1981): l'evoluzione della luminosità solare; C. Sagan, G. Mullen, *Science* 177, 52 (1972): il Sole giovane e debole; K. Caldeira, J. F. Kasting, *Nature* 360, 721 (1992): la durata residua della biosfera.
11. R. T. Pierrehumbert, E. Gaidos, *The Astrophysical Journal Letters* 734, L13 (2011); D. J. Stevenson, *Nature* 400, 32 (1999): pianeti con atmosfere di idrogeno.
12. G. Gonzalez, D. Brownlee, P. Ward, *Icarus* 152, 185 (2001); C. H. Lineweaver, Y. Fenner, B. K. Gibson, *Science* 303, 59 (2004); N. Prantzos, *Space Science Reviews* 135, 313 (2008): la zona abitabile galattica.
13. D. A. Fischer, J. Valenti, *The Astrophysical Journal* 622, 1102 (2005); L. A. Buchhave e collaboratori, *Nature* 486, 375 (2012): metallicità e pianeti.
