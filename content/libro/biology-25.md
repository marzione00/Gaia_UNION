---
unit: biology-25
titolo: Biosfera, albedo e Daisyworld
sottotitolo: Come la vita cambia il pianeta che la ospita: albedo, bilancio radiativo, l'ipotesi Gaia e il modello del pianeta delle margherite
volume: Volume di biologia
fonte: Testo originale; riferimenti principali A. M. Shaw, Astrochemistry, §7.6; J. R. Morris et al., Biology: How Life Works, 2ª ed., §25.1-25.3, §48.1, §48.3
---

## Prima di cominciare {#apertura}

I capitoli precedenti hanno trattato il clima di un pianeta come un dato fisico, fissato dalla stella, dalla distanza e dall'atmosfera, a cui la vita deve adattarsi. Sulla Terra le cose sono andate diversamente. La fotosintesi ha riempito l'atmosfera di ossigeno; i microrganismi producono metano, protossido di azoto e composti dello zolfo; le foreste cambiano il colore dei continenti e la quantità di vapore nell'aria; il plancton calcareo e le radici delle piante spostano il carbonio dall'aria alle rocce. La biosfera è una forza geologica, e il clima della Terra è in parte un prodotto della vita.

Negli anni Sessanta il chimico britannico James Lovelock, che lavorava per la NASA agli strumenti per cercare la vita su Marte, si chiese come si potesse riconoscere un pianeta abitato senza atterrarvi. La sua risposta fu che la vita lascia una traccia nella composizione dell'atmosfera, mantenendola lontana dall'equilibrio chimico. Da questa idea nacque, negli anni Settanta, l'**ipotesi Gaia**: la biosfera, insieme all'atmosfera, agli oceani e alle rocce, formerebbe un sistema che regola le condizioni del pianeta mantenendole favorevoli alla vita. L'ipotesi fu criticata duramente dai biologi evolutivi, che non vedevano come la selezione naturale potesse produrre una regolazione su scala planetaria. Per rispondere, nel 1983 Andrew Watson e Lovelock costruirono un modello semplicissimo, **Daisyworld**, il pianeta delle margherite.

Questo capitolo parte dall'albedo e dal bilancio radiativo, già incontrati nel capitolo [La zona abitabile](unit:biology-22), mostra come gli organismi possono modificarli, descrive l'ipotesi Gaia e le sue critiche, costruisce il modello Daisyworld e ne discute risultati e limiti. Alla fine torna all'astrobiologia: se la vita trasforma il proprio pianeta, le trasformazioni sono anche il modo di riconoscerla a distanza.

::: obiettivi
- definire l'albedo e confrontare quella di superfici naturali diverse;
- usare il bilancio radiativo per calcolare la temperatura di un pianeta ideale;
- descrivere l'ipotesi Gaia, le sue versioni e le critiche principali;
- costruire il modello Daisyworld e spiegarne il meccanismo di regolazione;
- distinguere retroazioni positive e negative fra biosfera e clima sulla Terra reale;
- collegare l'idea di disequilibrio chimico alla ricerca della vita su altri pianeti.
:::

Il capitolo usa il bilancio radiativo del capitolo [La zona abitabile](unit:biology-22), le retroazioni del capitolo [Atmosfere, effetto serra e clima](unit:biology-23) e la crescita delle popolazioni del capitolo [Crescita delle popolazioni microbiche](unit:biology-21).

## L'albedo delle superfici {#albedo}

L'**albedo** di una superficie è la frazione della radiazione incidente che viene riflessa. Dipende dal materiale, dalla struttura e dall'angolo con cui arriva la luce, e varia moltissimo fra le superfici naturali (figura 1). La neve fresca riflette la maggior parte della luce del Sole, i deserti sabbiosi circa un terzo, le praterie un quinto o un quarto, le foreste di conifere un decimo, l'oceano pochi punti percentuali quando il Sole è alto. Le nubi spesse riflettono più della metà della luce che le colpisce.

::: figura albedo
{"w":740,"h":310,"items":[{"t":"line","p":[210,30,210,254],"c":"ax","w":1.2},{"t":"text","p":[200,49],"s":"neve fresca","c":"ax","size":11,"a":"end"},{"t":"rect","p":[570.0,40,96.0,14],"c":"force2","r":3},{"t":"text","p":[200,77],"s":"nubi spesse","c":"ax","size":11,"a":"end"},{"t":"rect","p":[498.0,68,144.0,14],"c":"force2","r":3},{"t":"text","p":[200,105],"s":"ghiaccio marino","c":"ax","size":11,"a":"end"},{"t":"rect","p":[354.0,96,192.0,14],"c":"force2","r":3},{"t":"text","p":[200,133],"s":"deserto sabbioso","c":"ax","size":11,"a":"end"},{"t":"rect","p":[354.0,124,48.0,14],"c":"force2","r":3},{"t":"text","p":[200,161],"s":"prateria","c":"ax","size":11,"a":"end"},{"t":"rect","p":[286.8,152,48.0,14],"c":"force2","r":3},{"t":"text","p":[200,189],"s":"foresta di latifoglie","c":"ax","size":11,"a":"end"},{"t":"rect","p":[282.0,180,24.0,14],"c":"force2","r":3},{"t":"text","p":[200,217],"s":"foresta di conifere","c":"ax","size":11,"a":"end"},{"t":"rect","p":[248.4,208,33.6,14],"c":"force2","r":3},{"t":"text","p":[200,245],"s":"oceano, Sole alto","c":"ax","size":11,"a":"end"},{"t":"rect","p":[224.4,236,33.6,14],"c":"force2","r":3},{"t":"line","p":[354.0,30,354.0,254],"c":"force","w":1.6,"dash":true},{"t":"text","p":[360.0,26],"s":"Terra, 0,30","c":"force","size":10,"a":"start"},{"t":"text","p":[210,270],"s":"0","c":"muted","size":10},{"t":"text","p":[306.0,270],"s":"0,2","c":"muted","size":10},{"t":"text","p":[402.0,270],"s":"0,4","c":"muted","size":10},{"t":"text","p":[498.0,270],"s":"0,6","c":"muted","size":10},{"t":"text","p":[594.0,270],"s":"0,8","c":"muted","size":10},{"t":"text","p":[690.0,270],"s":"1","c":"muted","size":10},{"t":"text","p":[450.0,288],"s":"albedo","c":"muted","size":11}]}
---
Intervalli tipici di albedo per alcune superfici naturali, secondo i manuali di climatologia. L'albedo media della Terra, circa $0{,}30$, è dominata dalle nubi, che coprono circa due terzi del pianeta.
:::

L'albedo complessiva di un pianeta è la media delle albedo delle superfici, pesata per l'area e per la luce che ciascuna riceve. Per la Terra vale circa $0{,}30$: le nubi ne determinano la parte maggiore, i ghiacci e i deserti contribuiscono in proporzione alla loro estensione, gli oceani e le foreste assorbono quasi tutta la luce che li raggiunge. Piccole variazioni contano: con la formula della temperatura di equilibrio del capitolo [La zona abitabile](unit:biology-22), un aumento dell'albedo terrestre da $0{,}30$ a $0{,}31$ abbassa la temperatura di equilibrio di quasi un grado.

Gli organismi cambiano l'albedo in molti modi. Una foresta di conifere che cresce dove prima c'era tundra innevata assorbe d'inverno molta più luce: secondo l'analisi di Gordon Bonan del 2008, l'espansione delle foreste boreali tende per questo a riscaldare il clima regionale, mentre le foreste tropicali, che fanno evaporare molta acqua e favoriscono le nubi, tendono a raffreddarlo. Le alghe che crescono sulla neve e sul ghiaccio della Groenlandia ne scuriscono la superficie e ne accelerano la fusione. Nel 1987 Robert Charlson, Lovelock, Meinrat Andreae e Stephen Warren proposero che il plancton marino, producendo solfuro di dimetile, un gas che nell'aria forma i nuclei su cui condensano le gocce delle nubi, potesse regolare la copertura nuvolosa degli oceani e quindi il clima; l'ipotesi, nota con le iniziali degli autori, ha stimolato decenni di ricerche, ma studi successivi, come la rassegna di Patricia Quinn e Timothy Bates del 2011, hanno trovato che il meccanismo è troppo debole e indiretto per funzionare da termostato.

## Il bilancio radiativo di un pianeta ideale {#bilancio}

Per studiare l'effetto dell'albedo si può usare un pianeta ideale senza atmosfera, senza oceani e senza effetto serra, la cui superficie irraggia come un corpo nero. In equilibrio, la potenza assorbita per unità di area uguaglia quella emessa.

::: legge Bilancio radiativo di un pianeta ideale
Se il flusso medio sulla superficie vale $S$ per una luminosità della stella pari a $L$ volte quella di riferimento, e la superficie ha albedo $A$, la temperatura radiativa $T$, in kelvin, soddisfa

$$\sigma T^4=S\,L\,(1-A),$$

con $\sigma=5{,}67\cdot10^{-8}\ \mathrm{W\,m^{-2}\,K^{-4}}$.
:::

In Daisyworld, Watson e Lovelock usarono un flusso medio di riferimento $S=917$ W/m$^2$, più alto di quello medio della Terra, circa $340$ W/m$^2$, per avere temperature adatte alle margherite senza introdurre l'effetto serra. Il flusso medio è già diviso per quattro rispetto al flusso perpendicolare, e la formula non contiene altri fattori geometrici.

::: esempio Temperatura di un pianeta grigio
Con $L=1$ e $A=0{,}5$ il flusso assorbito è $917\cdot0{,}5=458{,}5$ W/m$^2$. La temperatura è

$$T=\left(\frac{458{,}5}{5{,}67\cdot10^{-8}}\right)^{1/4}\mathrm K\approx299{,}9\ \mathrm K,$$

circa $26{,}7$ °C. Con albedo $0{,}75$, come un pianeta coperto di margherite bianche, la temperatura scende a circa $-21$ °C; con albedo $0{,}25$, come un pianeta coperto di margherite nere, sale a circa $59$ °C.
:::

La temperatura cresce con la radice quarta della luminosità e del fattore $1-A$ (figura 2). A luminosità fissata, aumentare l'albedo riduce la temperatura; ad albedo fissata, una stella più luminosa scalda di più. Un pianeta con albedo costante resta privo di qualunque modo di compensare un cambiamento della stella; da qui parte Daisyworld.

::: figura bilancio
{"w":760,"h":285,"items":[{"t":"rect","p":[80.0,95.0,450.0,54.2],"c":"muted","r":0},{"t":"axes","o":[80,250],"x":[640,"luminosità relativa L"],"y":[225,"temperatura, °C"],"sx":450,"sy":1.55,"xt":[[0.0,"0,6"],[0.2,"0,8"],[0.4,"1,0"],[0.6,"1,2"],[0.8,"1,4"],[1.0,"1,6"]],"yt":[[0,"−60"],[20,"−40"],[40,"−20"],[60,"0"],[80,"20"],[100,"40"],[120,"60"],[140,"80"]]},{"t":"plot","o":[80,250],"sx":450,"sy":1.55,"pts":[[0.0,78.9285727],[0.01,80.1380336],[0.02,81.3327143],[0.03,82.5130294],[0.04,83.6793756],[0.05,84.8321327],[0.06,85.9716646],[0.07,87.0983198],[0.08,88.2124329],[0.09,89.3143249],[0.1,90.404304],[0.11,91.4826667],[0.12,92.5496976],[0.13,93.6056708],[0.14,94.6508501],[0.15,95.6854894],[0.16,96.7098335],[0.17,97.7241182],[0.18,98.728571],[0.19,99.7234117],[0.2,100.7088519],[0.21,101.6850965],[0.22,102.6523432],[0.23,103.6107832],[0.24,104.5606013],[0.25,105.5019764],[0.26,106.4350815],[0.27,107.3600841],[0.28,108.2771467],[0.29,109.1864263],[0.3,110.0880755],[0.31,110.9822419],[0.32,111.8690689],[0.33,112.7486956],[0.34,113.6212568],[0.35,114.4868836],[0.36,115.3457032],[0.37,116.1978393],[0.38,117.043412],[0.39,117.882538],[0.4,118.7153308],[0.41,119.5419009],[0.42,120.3623557],[0.43,121.1767998],[0.44,121.9853348],[0.45,122.7880599],[0.46,123.5850716],[0.47,124.3764638],[0.48,125.1623282],[0.49,125.942754],[0.5,126.7178282],[0.51,127.4876357],[0.52,128.2522592],[0.53,129.0117795],[0.54,129.7662753],[0.55,130.5158236],[0.56,131.2604993],[0.57,132.0003757],[0.58,132.7355245],[0.59,133.4660154],[0.6,134.1919168],[0.61,134.9132953],[0.62,135.6302163],[0.63,136.3427435],[0.64,137.0509391],[0.65,137.7548641],[0.66,138.4545782],[0.67,139.1501396],[0.68,139.8416054]],"c":"force4","w":2.4},{"t":"text","p":[392.0,33.2],"s":"A = 0,25","c":"force4","size":10,"a":"start"},{"t":"plot","o":[80,250],"sx":450,"sy":1.55,"pts":[[0.0,50.7727835],[0.01,51.8656548],[0.02,52.9451707],[0.03,54.0117057],[0.04,55.0656185],[0.05,56.1072522],[0.06,57.1369354],[0.07,58.1549833],[0.08,59.1616981],[0.09,60.15737],[0.1,61.1422773],[0.11,62.116688],[0.12,63.0808593],[0.13,64.0350388],[0.14,64.9794649],[0.15,65.914367],[0.16,66.8399663],[0.17,67.756476],[0.18,68.6641017],[0.19,69.5630416],[0.2,70.4534874],[0.21,71.335624],[0.22,72.2096301],[0.23,73.0756784],[0.24,73.9339359],[0.25,74.7845643],[0.26,75.6277199],[0.27,76.4635542],[0.28,77.2922138],[0.29,78.1138407],[0.3,78.9285727],[0.31,79.7365432],[0.32,80.5378819],[0.33,81.3327143],[0.34,82.1211624],[0.35,82.9033445],[0.36,83.6793756],[0.37,84.4493675],[0.38,85.2134286],[0.39,85.9716646],[0.4,86.7241778],[0.41,87.4710683],[0.42,88.2124329],[0.43,88.9483661],[0.44,89.67896],[0.45,90.404304],[0.46,91.1244854],[0.47,91.839589],[0.48,92.5496976],[0.49,93.2548919],[0.5,93.9552505],[0.51,94.6508501],[0.52,95.3417655],[0.53,96.0280695],[0.54,96.7098335],[0.55,97.3871267],[0.56,98.0600172],[0.57,98.728571],[0.58,99.3928529],[0.59,100.052926],[0.6,100.7088519],[0.61,101.3606911],[0.62,102.0085023],[0.63,102.6523432],[0.64,103.2922702],[0.65,103.9283383],[0.66,104.5606013],[0.67,105.189112],[0.68,105.8139219],[0.69,106.4350815],[0.7,107.0526401],[0.71,107.666646],[0.72,108.2771467],[0.73,108.8841884],[0.74,109.4878165],[0.75,110.0880755],[0.76,110.6850089],[0.77,111.2786595],[0.78,111.8690689],[0.79,112.4562783],[0.8,113.0403278],[0.81,113.6212568],[0.82,114.1991039],[0.83,114.773907],[0.84,115.3457032],[0.85,115.9145291],[0.86,116.4804203],[0.87,117.043412],[0.88,117.6035385],[0.89,118.1608337],[0.9,118.7153308],[0.91,119.2670623],[0.92,119.8160601],[0.93,120.3623557],[0.94,120.90598],[0.95,121.4469631],[0.96,121.9853348],[0.97,122.5211244],[0.98,123.0543606],[0.99,123.5850716],[1.0,124.1132851]],"c":"force2","w":2.4},{"t":"text","p":[536.0,57.6],"s":"A = 0,50","c":"force2","size":10,"a":"start"},{"t":"plot","o":[80,250],"sx":450,"sy":1.55,"pts":[[0.0,8.7817225],[0.01,9.7007141],[0.02,10.6084751],[0.03,11.5053207],[0.04,12.3915521],[0.05,13.2674581],[0.06,14.1333151],[0.07,14.9893879],[0.08,15.8359308],[0.09,16.6731877],[0.1,17.5013927],[0.11,18.3207712],[0.12,19.1315393],[0.13,19.9339055],[0.14,20.72807],[0.15,21.5142258],[0.16,22.292559],[0.17,23.0632487],[0.18,23.8264679],[0.19,24.5823833],[0.2,25.3311559],[0.21,26.0729414],[0.22,26.80789],[0.23,27.5361469],[0.24,28.2578526],[0.25,28.973143],[0.26,29.6821495],[0.27,30.3849995],[0.28,31.0818164],[0.29,31.7727195],[0.3,32.4578247],[0.31,33.1372443],[0.32,33.8110871],[0.33,34.4794588],[0.34,35.1424619],[0.35,35.8001961],[0.36,36.4527579],[0.37,37.1002413],[0.38,37.7427376],[0.39,38.3803355],[0.4,39.0131212],[0.41,39.6411786],[0.42,40.2645895],[0.43,40.8834331],[0.44,41.4977869],[0.45,42.1077261],[0.46,42.713324],[0.47,43.3146521],[0.48,43.9117799],[0.49,44.5047752],[0.5,45.0937043],[0.51,45.6786315],[0.52,46.2596197],[0.53,46.8367303],[0.54,47.4100232],[0.55,47.9795567],[0.56,48.5453879],[0.57,49.1075724],[0.58,49.6661646],[0.59,50.2212177],[0.6,50.7727835],[0.61,51.3209127],[0.62,51.8656548],[0.63,52.4070584],[0.64,52.9451707],[0.65,53.480038],[0.66,54.0117057],[0.67,54.5402181],[0.68,55.0656185],[0.69,55.5879494],[0.7,56.1072522],[0.71,56.6235676],[0.72,57.1369354],[0.73,57.6473946],[0.74,58.1549833],[0.75,58.659739],[0.76,59.1616981],[0.77,59.6608968],[0.78,60.15737],[0.79,60.6511522],[0.8,61.1422773],[0.81,61.6307784],[0.82,62.116688],[0.83,62.6000379],[0.84,63.0808593],[0.85,63.5591829],[0.86,64.0350388],[0.87,64.5084565],[0.88,64.9794649],[0.89,65.4480924],[0.9,65.914367],[0.91,66.378316],[0.92,66.8399663],[0.93,67.2993444],[0.94,67.756476],[0.95,68.2113868],[0.96,68.6641017],[0.97,69.1146452],[0.98,69.5630416],[0.99,70.0093146],[1.0,70.4534874]],"c":"force3","w":2.4},{"t":"text","p":[536.0,140.8],"s":"A = 0,75","c":"force3","size":10,"a":"start"},{"t":"text","p":[89.0,110.1],"s":"crescita delle margherite, 5-40 °C","c":"muted","size":10,"a":"start"}]}
---
Temperatura radiativa di un pianeta ideale in funzione della luminosità relativa della stella, con $S=917$ W/m$^2$, per tre valori dell'albedo. La fascia indica l'intervallo fra $5$ e $40$ °C in cui crescono le margherite del modello.
:::

::: nota Kelvin e Celsius
La legge di Stefan e Boltzmann vale per la temperatura assoluta. Nei calcoli si ottiene prima la temperatura in kelvin, con la radice quarta, e solo alla fine si sottrae $273{,}15$ per passare ai gradi Celsius. Applicare la radice quarta a una temperatura in gradi Celsius, o dividere il flusso per $\sigma$ senza estrarre la radice, porta a risultati privi di senso.
:::

## L'ipotesi Gaia {#gaia}

Lovelock partì da un'osservazione chimica. L'atmosfera terrestre contiene insieme ossigeno e metano, due gas che reagiscono fra loro: il metano viene ossidato in una decina d'anni, e la sua concentrazione resta costante solo perché i microrganismi ne producono di continuo centinaia di milioni di tonnellate all'anno. Le atmosfere di Venere e di Marte, fatte quasi solo di anidride carbonica, sono invece vicine all'equilibrio chimico. Nel 1965, in un articolo sulla rivista *Nature*, Lovelock propose di cercare la vita su altri pianeti misurando proprio questo **disequilibrio**, e nel 1967, con Dian Hitchcock, concluse che l'atmosfera di Marte non mostrava segni di vita.

Da qui Lovelock arrivò a un'idea più ambiziosa. Se la vita mantiene l'atmosfera lontana dall'equilibrio, forse ne regola anche la composizione e la temperatura. Con la microbiologa Lynn Margulis formulò nel 1974 l'**ipotesi Gaia**, dal nome della dea greca della Terra suggerito dallo scrittore William Golding: gli organismi e il loro ambiente formerebbero un sistema che si autoregola, mantenendo per miliardi di anni condizioni adatte alla vita, nonostante l'aumento della luminosità del Sole e gli sconvolgimenti geologici.

Le critiche furono immediate. Nel 1981 Ford Doolittle osservò che la selezione naturale agisce sugli individui che si riproducono, mentre una biosfera intera manca sia di riproduzione sia di concorrenti; mancherebbe quindi il modo di selezionare organismi per il bene del pianeta. Richard Dawkins ripeté l'obiezione nel 1982. Una regolazione planetaria sembrava richiedere uno scopo, una teleologia, estranea alla biologia evolutiva.

Nel 1989 James Kirchner distinse diverse versioni dell'ipotesi. Le versioni **deboli** affermano che la vita influenza l'ambiente e che esistono retroazioni fra organismi e ambiente: sono ormai parte della scienza della Terra, con il nome di scienza del sistema Terra. Le versioni **forti** affermano che queste retroazioni tendono a stabilizzare l'ambiente a favore della vita, o addirittura a ottimizzarlo: sono molto più controverse, e difficili da verificare. Il modello Daisyworld fu costruito proprio per mostrare che una regolazione può emergere senza scopo e senza selezione a livello di pianeta.

## Il pianeta delle margherite {#daisyworld}

Daisyworld è un pianeta immaginario che ruota attorno a una stella simile al Sole, la cui luminosità cresce lentamente nel tempo. Non ha nubi, non ha effetto serra, e la sua superficie fertile può essere coperta da due sole specie di margherite: margherite **scure**, con albedo $0{,}25$, e margherite **chiare**, con albedo $0{,}75$. Il suolo nudo ha albedo $0{,}5$. Le margherite ignorano il clima: crescono, si riproducono e muoiono secondo regole locali, come qualunque pianta.

::: legge Le regole di Daisyworld
Indicando con $a_s$ e $a_c$ le frazioni di superficie coperte da margherite scure e chiare, e con $x=1-a_s-a_c$ la superficie libera, le coperture evolvono come

$$\begin{aligned}\frac{\mathrm da_s}{\mathrm dt}&=a_s\,(x\,\beta_s-\gamma),\\\frac{\mathrm da_c}{\mathrm dt}&=a_c\,(x\,\beta_c-\gamma),\end{aligned}$$

dove $\gamma=0{,}3$ è il tasso di morte e $\beta$ il tasso di crescita, che dipende dalla temperatura locale $T$, in gradi Celsius:

$$\beta=1-0{,}003265\,(22{,}5-T)^2.$$
:::

Le equazioni sono una versione del modello logistico del capitolo [Crescita delle popolazioni microbiche](unit:biology-21): le margherite crescono finché trovano spazio libero e muoiono a un tasso costante. Il tasso di crescita è massimo a $22{,}5$ °C e si annulla circa a $5$ e a $40$ °C (figura 3).

::: figura crescita
{"w":780,"h":285,"items":[{"t":"axes","o":[80,250],"x":[640,"temperatura locale, °C"],"y":[220,"tasso di crescita β"],"sx":10,"sy":200,"xt":[[0,"0"],[5,"5"],[10,"10"],[15,"15"],[20,"20"],[25,"25"],[30,"30"],[35,"35"],[40,"40"]],"yt":[[0,"0"],[0.3,"0,3"],[0.5,"0,5"],[1.0,"1"]]},{"t":"plot","o":[80,250],"sx":10,"sy":200,"pts":[[0.0,0],[0.1,0],[0.2,0],[0.3,0],[0.4,0],[0.5,0],[0.6,0],[0.7,0],[0.8,0],[0.9,0],[1.0,0],[1.1,0],[1.2,0],[1.3,0],[1.4,0],[1.5,0],[1.6,0],[1.7,0],[1.8,0],[1.9,0],[2.0,0],[2.1,0],[2.2,0],[2.3,0],[2.4,0],[2.5,0],[2.6,0],[2.7,0],[2.8,0],[2.9,0],[3.0,0],[3.1,0],[3.2,0],[3.3,0],[3.4,0],[3.5,0],[3.6,0],[3.7,0],[3.8,0],[3.9,0],[4.0,0],[4.1,0],[4.2,0],[4.3,0],[4.4,0],[4.5,0],[4.6,0],[4.7,0],[4.8,0],[4.9,0],[5.0,9.38e-05],[5.1,0.0114886],[5.2,0.0228181],[5.3,0.0340824],[5.4,0.0452813],[5.5,0.056415],[5.6,0.0674834],[5.7,0.0784864],[5.8,0.0894242],[5.9,0.1002966],[6.0,0.1111037],[6.1,0.1218456],[6.2,0.1325222],[6.3,0.1431334],[6.4,0.1536793],[6.5,0.16416],[6.6,0.1745754],[6.7,0.1849254],[6.8,0.1952102],[6.9,0.2054296],[7.0,0.2155837],[7.1,0.2256726],[7.2,0.2356961],[7.3,0.2456544],[7.4,0.2555473],[7.5,0.265375],[7.6,0.2751373],[7.7,0.2848344],[7.8,0.2944662],[7.9,0.3040326],[8.0,0.3135337],[8.1,0.3229696],[8.2,0.3323401],[8.3,0.3416454],[8.4,0.3508853],[8.5,0.36006],[8.6,0.3691693],[8.7,0.3782134],[8.8,0.3871922],[8.9,0.3961056],[9.0,0.4049538],[9.1,0.4137366],[9.2,0.4224541],[9.3,0.4311064],[9.4,0.4396933],[9.5,0.448215],[9.6,0.4566714],[9.7,0.4650624],[9.8,0.4733882],[9.9,0.4816486],[10.0,0.4898438],[10.1,0.4979736],[10.2,0.5060381],[10.3,0.5140374],[10.4,0.5219714],[10.5,0.52984],[10.6,0.5376433],[10.7,0.5453814],[10.8,0.5530542],[10.9,0.5606616],[11.0,0.5682038],[11.1,0.5756806],[11.2,0.5830921],[11.3,0.5904384],[11.4,0.5977193],[11.5,0.604935],[11.6,0.6120853],[11.7,0.6191704],[11.8,0.6261902],[11.9,0.6331446],[12.0,0.6400337],[12.1,0.6468576],[12.2,0.6536161],[12.3,0.6603094],[12.4,0.6669373],[12.5,0.6735],[12.6,0.6799974],[12.7,0.6864294],[12.8,0.6927961],[12.9,0.6990976],[13.0,0.7053337],[13.1,0.7115046],[13.2,0.7176101],[13.3,0.7236504],[13.4,0.7296254],[13.5,0.735535],[13.6,0.7413793],[13.7,0.7471584],[13.8,0.7528722],[13.9,0.7585206],[14.0,0.7641037],[14.1,0.7696216],[14.2,0.7750741],[14.3,0.7804614],[14.4,0.7857833],[14.5,0.79104],[14.6,0.7962314],[14.7,0.8013574],[14.8,0.8064182],[14.9,0.8114136],[15.0,0.8163438],[15.1,0.8212086],[15.2,0.8260081],[15.3,0.8307424],[15.4,0.8354113],[15.5,0.840015],[15.6,0.8445533],[15.7,0.8490264],[15.8,0.8534342],[15.9,0.8577766],[16.0,0.8620538],[16.1,0.8662656],[16.2,0.8704121],[16.3,0.8744934],[16.4,0.8785093],[16.5,0.88246],[16.6,0.8863454],[16.7,0.8901654],[16.8,0.8939202],[16.9,0.8976096],[17.0,0.9012338],[17.1,0.9047926],[17.2,0.9082862],[17.3,0.9117144],[17.4,0.9150773],[17.5,0.918375],[17.6,0.9216074],[17.7,0.9247744],[17.8,0.9278762],[17.9,0.9309126],[18.0,0.9338838],[18.1,0.9367896],[18.2,0.9396301],[18.3,0.9424054],[18.4,0.9451153],[18.5,0.94776],[18.6,0.9503394],[18.7,0.9528534],[18.8,0.9553022],[18.9,0.9576856],[19.0,0.9600038],[19.1,0.9622566],[19.2,0.9644441],[19.3,0.9665664],[19.4,0.9686233],[19.5,0.970615],[19.6,0.9725413],[19.7,0.9744024],[19.8,0.9761981],[19.9,0.9779286],[20.0,0.9795938],[20.1,0.9811936],[20.2,0.9827282],[20.3,0.9841974],[20.4,0.9856013],[20.5,0.98694],[20.6,0.9882133],[20.7,0.9894214],[20.8,0.9905641],[20.9,0.9916416],[21.0,0.9926538],[21.1,0.9936006],[21.2,0.9944821],[21.3,0.9952984],[21.4,0.9960493],[21.5,0.996735],[21.6,0.9973553],[21.7,0.9979104],[21.8,0.9984002],[21.9,0.9988246],[22.0,0.9991838],[22.1,0.9994776],[22.2,0.9997061],[22.3,0.9998694],[22.4,0.9999674],[22.5,1.0],[22.6,0.9999674],[22.7,0.9998694],[22.8,0.9997061],[22.9,0.9994776],[23.0,0.9991838],[23.1,0.9988246],[23.2,0.9984002],[23.3,0.9979104],[23.4,0.9973553],[23.5,0.996735],[23.6,0.9960493],[23.7,0.9952984],[23.8,0.9944821],[23.9,0.9936006],[24.0,0.9926538],[24.1,0.9916416],[24.2,0.9905641],[24.3,0.9894214],[24.4,0.9882133],[24.5,0.98694],[24.6,0.9856013],[24.7,0.9841974],[24.8,0.9827282],[24.9,0.9811936],[25.0,0.9795938],[25.1,0.9779286],[25.2,0.9761981],[25.3,0.9744024],[25.4,0.9725413],[25.5,0.970615],[25.6,0.9686233],[25.7,0.9665664],[25.8,0.9644441],[25.9,0.9622566],[26.0,0.9600038],[26.1,0.9576856],[26.2,0.9553022],[26.3,0.9528534],[26.4,0.9503394],[26.5,0.94776],[26.6,0.9451153],[26.7,0.9424054],[26.8,0.9396301],[26.9,0.9367896],[27.0,0.9338838],[27.1,0.9309126],[27.2,0.9278762],[27.3,0.9247744],[27.4,0.9216074],[27.5,0.918375],[27.6,0.9150773],[27.7,0.9117144],[27.8,0.9082862],[27.9,0.9047926],[28.0,0.9012338],[28.1,0.8976096],[28.2,0.8939202],[28.3,0.8901654],[28.4,0.8863454],[28.5,0.88246],[28.6,0.8785093],[28.7,0.8744934],[28.8,0.8704121],[28.9,0.8662656],[29.0,0.8620538],[29.1,0.8577766],[29.2,0.8534342],[29.3,0.8490264],[29.4,0.8445534],[29.5,0.840015],[29.6,0.8354113],[29.7,0.8307424],[29.8,0.8260081],[29.9,0.8212086],[30.0,0.8163438],[30.1,0.8114136],[30.2,0.8064182],[30.3,0.8013574],[30.4,0.7962314],[30.5,0.79104],[30.6,0.7857833],[30.7,0.7804614],[30.8,0.7750741],[30.9,0.7696216],[31.0,0.7641037],[31.1,0.7585206],[31.2,0.7528722],[31.3,0.7471584],[31.4,0.7413794],[31.5,0.735535],[31.6,0.7296253],[31.7,0.7236504],[31.8,0.7176101],[31.9,0.7115046],[32.0,0.7053337],[32.1,0.6990976],[32.2,0.6927961],[32.3,0.6864294],[32.4,0.6799974],[32.5,0.6735],[32.6,0.6669373],[32.7,0.6603094],[32.8,0.6536162],[32.9,0.6468576],[33.0,0.6400337],[33.1,0.6331446],[33.2,0.6261901],[33.3,0.6191704],[33.4,0.6120854],[33.5,0.604935],[33.6,0.5977193],[33.7,0.5904384],[33.8,0.5830922],[33.9,0.5756806],[34.0,0.5682038],[34.1,0.5606616],[34.2,0.5530541],[34.3,0.5453814],[34.4,0.5376434],[34.5,0.52984],[34.6,0.5219713],[34.7,0.5140374],[34.8,0.5060382],[34.9,0.4979736],[35.0,0.4898438],[35.1,0.4816486],[35.2,0.4733881],[35.3,0.4650624],[35.4,0.4566714],[35.5,0.448215],[35.6,0.4396933],[35.7,0.4311064],[35.8,0.4224542],[35.9,0.4137366],[36.0,0.4049538],[36.1,0.3961056],[36.2,0.3871921],[36.3,0.3782134],[36.4,0.3691694],[36.5,0.36006],[36.6,0.3508853],[36.7,0.3416454],[36.8,0.3323402],[36.9,0.3229696],[37.0,0.3135337],[37.1,0.3040326],[37.2,0.2944661],[37.3,0.2848344],[37.4,0.2751374],[37.5,0.265375],[37.6,0.2555473],[37.7,0.2456544],[37.8,0.2356962],[37.9,0.2256726],[38.0,0.2155837],[38.1,0.2054296],[38.2,0.1952101],[38.3,0.1849254],[38.4,0.1745754],[38.5,0.16416],[38.6,0.1536793],[38.7,0.1431334],[38.8,0.1325222],[38.9,0.1218456],[39.0,0.1111037],[39.1,0.1002966],[39.2,0.0894241],[39.3,0.0784864],[39.4,0.0674834],[39.5,0.056415],[39.6,0.0452813],[39.7,0.0340824],[39.8,0.0228182],[39.9,0.0114886],[40.0,9.38e-05],[40.1,0],[40.2,0],[40.3,0],[40.4,0],[40.5,0],[40.6,0],[40.7,0],[40.8,0],[40.9,0],[41.0,0],[41.1,0],[41.2,0],[41.3,0],[41.4,0],[41.5,0],[41.6,0],[41.7,0],[41.8,0],[41.9,0],[42.0,0],[42.1,0],[42.2,0],[42.3,0],[42.4,0],[42.5,0],[42.6,0],[42.7,0],[42.8,0],[42.9,0],[43.0,0],[43.1,0],[43.2,0],[43.3,0],[43.4,0],[43.5,0],[43.6,0],[43.7,0],[43.8,0],[43.9,0],[44.0,0],[44.1,0],[44.2,0],[44.3,0],[44.4,0],[44.5,0],[44.6,0],[44.7,0],[44.8,0],[44.9,0],[45.0,0]],"c":"force3","w":2.6},{"t":"line","p":[80,190.0,530,190.0],"c":"force4","w":1.4,"dash":true},{"t":"text","p":[536,190.0],"s":"γ = 0,3","c":"force4","size":10,"a":"start"},{"t":"circle","p":[305.0,50,5],"c":"force3"},{"t":"text","p":[305.0,40],"s":"ottimo, 22,5 °C","c":"force3","size":11}]}
---
Tasso di crescita delle margherite in funzione della temperatura locale, $\beta=1-0{,}003265\,(22{,}5-T)^2$. Fuori dall'intervallo fra $5$ e $40$ °C le margherite non crescono. La linea tratteggiata indica il tasso di morte $\gamma=0{,}3$.
:::

L'albedo del pianeta è la media delle tre albedo, pesata per le coperture: $A=0{,}25\,a_s+0{,}75\,a_c+0{,}5\,x$. La temperatura media si ricava dal bilancio radiativo, $\sigma T^4=SL(1-A)$. Le margherite scure, però, assorbono più luce e sono più calde della media; quelle chiare più fresche. Watson e Lovelock descrissero questa differenza con una formula semplice, $T_i^4=T^4+q\,(A-A_i)$, dove $A_i$ è l'albedo della specie e $q\approx2\cdot10^9\ \mathrm K^4$ misura quanto calore rimane sul posto invece di diffondersi a tutto il pianeta.

Il meccanismo di regolazione nasce da questa differenza. Quando la stella è debole e il pianeta freddo, le margherite scure, più calde, crescono meglio delle chiare; coprendo il suolo, abbassano l'albedo e riscaldano il pianeta. Quando la stella diventa più luminosa e il pianeta si scalda, le margherite scure si surriscaldano e quelle chiare, più fresche, prendono il sopravvento; l'albedo cresce e il pianeta si raffredda (figura 4). Nessuna margherita agisce per il bene del pianeta: ciascuna cresce dove la temperatura locale le è favorevole, e la regolazione è un effetto collettivo.

::: figura ciclo
{"w":760,"h":280,"items":[{"t":"poly","pts":[[280,20],[480,20],[480,60],[280,60]],"close":true,"c":"force","w":1.8},{"t":"text","p":[380.0,45],"s":"luminosità della stella","c":"force","size":12},{"t":"poly","pts":[[530,120],[740,120],[740,160],[530,160]],"close":true,"c":"force4","w":1.8},{"t":"text","p":[635.0,145],"s":"temperatura del pianeta","c":"force4","size":12},{"t":"poly","pts":[[280,220],[480,220],[480,260],[280,260]],"close":true,"c":"force2","w":1.8},{"t":"text","p":[380.0,245],"s":"margherite chiare","c":"force2","size":12},{"t":"poly","pts":[[20,120],[230,120],[230,160],[20,160]],"close":true,"c":"force3","w":1.8},{"t":"text","p":[125.0,145],"s":"albedo del pianeta","c":"force3","size":12},{"t":"arrow","p":[480,40,600,118],"c":"ax","w":1.8,"head":8},{"t":"text","p":[560,70],"s":"+","c":"ax","size":16},{"t":"arrow","p":[600,162,480,238],"c":"ax","w":1.8,"head":8},{"t":"text","p":[565,215],"s":"+","c":"ax","size":16},{"t":"arrow","p":[280,240,150,162],"c":"ax","w":1.8,"head":8},{"t":"text","p":[190,215],"s":"+","c":"ax","size":16},{"t":"arrow","p":[230,140,528,140],"c":"ax","w":1.8,"head":8},{"t":"text","p":[380,132],"s":"−","c":"ax","size":18},{"t":"text","p":[380,180],"s":"ciclo con segno negativo:","c":"muted","size":11},{"t":"text","p":[380,196],"s":"retroazione stabilizzante","c":"muted","size":11}]}
---
Le retroazioni di Daisyworld. Un aumento della luminosità scalda il pianeta; le margherite chiare, più fresche, si avvantaggiano su quelle scure; l'albedo cresce e la temperatura diminuisce. Il ciclo chiuso ha segno complessivo negativo: è una retroazione stabilizzante.
:::

::: esempio Lo stato di equilibrio con luminosità uno
Risolvendo le equazioni con $L=1$ partendo da pochi semi di entrambe le specie, la simulazione si stabilizza con circa il $28\%$ di margherite scure, il $40\%$ di chiare e il $32\%$ di suolo libero. L'albedo vale circa $0{,}53$, e la temperatura media circa $22{,}0$ °C, mentre un pianeta senza margherite, con albedo $0{,}5$, sarebbe a $26{,}7$ °C. Le margherite scure sono a circa $27{,}3$ °C, le chiare a circa $17{,}7$ °C: la loro somma è $45$ °C, il doppio dell'ottimo di crescita, perché all'equilibrio le due specie devono crescere allo stesso tasso.
:::

## Regolazione e suoi limiti {#regolazione}

Il risultato più importante di Daisyworld si vede facendo variare la luminosità della stella. Un pianeta senza margherite, con albedo fissa $0{,}5$, si scalda in modo continuo: da circa $2$ °C con $L=0{,}71$ a circa $41$ °C con $L=1{,}21$. Il laboratorio Daisyworld di questo sito risolve le equazioni per ogni luminosità partendo da pochi semi di entrambe le specie. In questo intervallo di luminosità le margherite si stabiliscono, e la temperatura media resta fra circa $20$ e $26$ °C, vicino all'ottimo di crescita (figura 5). Al crescere della luminosità le margherite scure diminuiscono e le chiare aumentano, e l'albedo del pianeta cresce da circa $0{,}33$ a circa $0{,}62$ (figura 6).

::: figura temperatura
{"w":760,"h":285,"items":[{"t":"axes","o":[80,250],"x":[640,"luminosità relativa L"],"y":[225,"temperatura media, °C"],"sx":450,"sy":2.6,"xt":[[0.0,"0,6"],[0.2,"0,8"],[0.4,"1,0"],[0.6,"1,2"],[0.8,"1,4"],[1.0,"1,6"]],"yt":[[0,"−10"],[10,"0"],[20,"10"],[30,"20"],[40,"30"],[50,"40"],[60,"50"],[70,"60"]]},{"t":"line","p":[80.0,165.5,530.0,165.5],"c":"muted","w":1.2,"dash":true},{"t":"plot","o":[80,250],"sx":450,"sy":2.6,"pts":[[0.0,0.7727835],[0.01,1.8656548],[0.02,2.9451707],[0.03,4.0117057],[0.04,5.0656185],[0.05,6.1072522],[0.06,7.1369354],[0.07,8.1549833],[0.08,9.1616981],[0.09,10.15737],[0.1,11.1422773],[0.11,12.116688],[0.12,13.0808593],[0.13,14.0350388],[0.14,14.9794649],[0.15,15.914367],[0.16,16.8399663],[0.17,17.756476],[0.18,18.6641017],[0.19,19.5630416],[0.2,20.4534874],[0.21,21.335624],[0.22,22.2096301],[0.23,23.0756784],[0.24,23.9339359],[0.25,24.7845643],[0.26,25.6277199],[0.27,26.4635542],[0.28,27.2922138],[0.29,28.1138407],[0.3,28.9285727],[0.31,29.7365432],[0.32,30.5378819],[0.33,31.3327143],[0.34,32.1211624],[0.35,32.9033445],[0.36,33.6793756],[0.37,34.4493675],[0.38,35.2134286],[0.39,35.9716646],[0.4,36.7241778],[0.41,37.4710683],[0.42,38.2124329],[0.43,38.9483661],[0.44,39.67896],[0.45,40.404304],[0.46,41.1244854],[0.47,41.839589],[0.48,42.5496976],[0.49,43.2548919],[0.5,43.9552505],[0.51,44.6508501],[0.52,45.3417655],[0.53,46.0280695],[0.54,46.7098335],[0.55,47.3871267],[0.56,48.0600172],[0.57,48.728571],[0.58,49.3928529],[0.59,50.052926],[0.6,50.7088519],[0.61,51.3606911],[0.62,52.0085023],[0.63,52.6523432],[0.64,53.2922702],[0.65,53.9283383],[0.66,54.5606013],[0.67,55.189112],[0.68,55.8139219],[0.69,56.4350815],[0.7,57.0526401],[0.71,57.666646],[0.72,58.2771467],[0.73,58.8841884],[0.74,59.4878165],[0.75,60.0880755],[0.76,60.6850089],[0.77,61.2786595],[0.78,61.8690689],[0.79,62.4562783],[0.8,63.0403278],[0.81,63.6212568],[0.82,64.1991039],[0.83,64.773907],[0.84,65.3457032],[0.85,65.9145291],[0.86,66.4804203],[0.87,67.043412],[0.88,67.6035385],[0.89,68.1608337],[0.9,68.7153308],[0.91,69.2670623],[0.92,69.8160601],[0.93,70.3623557],[0.94,70.90598],[0.95,71.4469631],[0.96,71.9853348],[0.97,72.5211244],[0.98,73.0543606],[0.99,73.5850716],[1.0,74.1132851]],"c":"force4","w":2.2,"dash":true},{"t":"plot","o":[80,250],"sx":450,"sy":2.6,"pts":[[0.0,0.7727835],[0.01,1.8656548],[0.02,2.9451707],[0.03,4.0117057],[0.04,5.0656185],[0.05,6.1072522],[0.06,7.1369354],[0.07,8.1549833],[0.08,9.1616981],[0.09,10.15737],[0.1,11.1422773],[0.11,33.4100765],[0.12,34.3032352],[0.13,35.1413187],[0.14,35.8936041],[0.15,35.7065411],[0.16,35.4104725],[0.17,35.2204071],[0.18,35.0376889],[0.19,34.8601578],[0.2,34.687573],[0.21,34.5197299],[0.22,34.3564352],[0.23,34.1975063],[0.24,34.0427699],[0.25,33.8920622],[0.26,33.7452275],[0.27,33.602118],[0.28,33.4625937],[0.29,33.3265212],[0.3,33.1937738],[0.31,33.0642309],[0.32,32.9377776],[0.33,32.8143046],[0.34,32.6937076],[0.35,32.575887],[0.36,32.460748],[0.37,32.3482],[0.38,32.2381562],[0.39,32.1305341],[0.4,32.0252543],[0.41,31.9222411],[0.42,31.8214221],[0.43,31.7227277],[0.44,31.6260915],[0.45,31.5314496],[0.46,31.4387409],[0.47,31.3479067],[0.48,31.2588906],[0.49,31.1716385],[0.5,31.0860984],[0.51,31.0022205],[0.52,30.9199566],[0.53,30.8392605],[0.54,30.7600879],[0.55,30.682396],[0.56,30.6061435],[0.57,30.5312908],[0.58,30.4577996],[0.59,30.3856331],[0.6,30.3147558],[0.61,30.2451135],[0.62,52.0085023],[0.63,52.6523432],[0.64,53.2922702],[0.65,53.9283383],[0.66,54.5606013],[0.67,55.189112],[0.68,55.8139219],[0.69,56.4350815],[0.7,57.0526401],[0.71,57.666646],[0.72,58.2771467],[0.73,58.8841884],[0.74,59.4878165],[0.75,60.0880755],[0.76,60.6850089],[0.77,61.2786595],[0.78,61.8690689],[0.79,62.4562783],[0.8,63.0403278],[0.81,63.6212568],[0.82,64.1991039],[0.83,64.773907],[0.84,65.3457032],[0.85,65.9145291],[0.86,66.4804203],[0.87,67.043412],[0.88,67.6035385],[0.89,68.1608337],[0.9,68.7153308],[0.91,69.2670623],[0.92,69.8160601],[0.93,70.3623557],[0.94,70.90598],[0.95,71.4469631],[0.96,71.9853348],[0.97,72.5211244],[0.98,73.0543606],[0.99,73.5850716],[1.0,74.1132851]],"c":"force2","w":2.6},{"t":"plot","o":[80,250],"sx":450,"sy":2.6,"pts":[[0.0,0.7727835],[0.01,1.8656548],[0.02,2.9451707],[0.03,4.0117057],[0.04,5.0656185],[0.05,6.1072522],[0.06,7.1369354],[0.07,8.1549833],[0.08,9.1616981],[0.09,10.15737],[0.1,11.1422773],[0.11,33.3603928],[0.12,34.2553379],[0.13,35.0952839],[0.14,35.8620573],[0.15,35.6558064],[0.16,35.4085146],[0.17,35.2203817],[0.18,35.0376885],[0.19,34.8601578],[0.2,34.687573],[0.21,34.5197299],[0.22,34.3564352],[0.23,34.1975063],[0.24,34.0427699],[0.25,33.8920622],[0.26,33.7452275],[0.27,33.602118],[0.28,33.4625937],[0.29,33.3265212],[0.3,33.1937738],[0.31,33.0642309],[0.32,32.9377776],[0.33,32.8143046],[0.34,32.6937076],[0.35,32.575887],[0.36,32.460748],[0.37,32.3482],[0.38,32.2381562],[0.39,32.1305341],[0.4,32.0252543],[0.41,31.9222411],[0.42,31.8214221],[0.43,31.7227277],[0.44,31.6260915],[0.45,31.5314496],[0.46,31.4387409],[0.47,31.3479067],[0.48,31.2588906],[0.49,31.1716385],[0.5,31.0860984],[0.51,31.0022205],[0.52,30.9199566],[0.53,30.8392605],[0.54,30.7600879],[0.55,30.682396],[0.56,30.6061435],[0.57,30.5312908],[0.58,30.4577996],[0.59,30.3856331],[0.6,30.3147558],[0.61,30.2451335],[0.62,30.1767329],[0.63,30.1095223],[0.64,30.0434708],[0.65,29.9785487],[0.66,29.9147272],[0.67,29.8519786],[0.68,29.790276],[0.69,29.7295934],[0.7,29.6699062],[0.71,29.6111923],[0.72,29.5534463],[0.73,29.496778],[0.74,29.4420964],[0.75,29.3953093],[0.76,29.3863055],[0.77,29.514418],[0.78,29.8495835],[0.79,30.195973],[0.8,30.5540805],[0.81,30.9244947],[0.82,31.3079229],[0.83,31.705224],[0.84,32.1174518],[0.85,32.5459159],[0.86,32.9922677],[0.87,33.4586268],[0.88,33.9477726],[0.89,34.4634498],[0.9,35.0108815],[0.91,35.5976944],[0.92,36.2357521],[0.93,36.9453016],[0.94,37.7664722],[0.95,38.8057238]],"c":"force3","w":2.2},{"t":"text","p":[506.0,56.8],"s":"pianeta nudo","c":"force4","size":10,"a":"end"},{"t":"text","p":[260.0,184.8],"s":"da pochi semi","c":"force2","size":10},{"t":"text","p":[456.5,151.6],"s":"aumento lento","c":"force3","size":10,"a":"end"}]}
---
Temperatura media di Daisyworld in funzione della luminosità relativa della stella, calcolata con il modello del sito: pianeta senza margherite, pianeta con margherite partendo da pochi semi per ogni luminosità, e pianeta in cui la luminosità cresce lentamente mantenendo sempre qualche seme. La linea tratteggiata indica l'ottimo di crescita, $22{,}5$ °C.
:::

Fuori da questo intervallo la regolazione cessa. Con una stella troppo debole persino le margherite scure sono troppo fredde per crescere, e il pianeta resta nudo. Con una stella troppo luminosa i semi, sul suolo nudo a più di $40$ °C, non germogliano.

Il limite superiore dipende però dalla storia. Se la luminosità cresce lentamente e le margherite chiare sono già diffuse, il pianeta resta temperato ben oltre $L=1{,}21$: nella simulazione con aumento lento la regolazione dura fino a circa $L=1{,}55$. Superato quel punto, anche le margherite chiare si surriscaldano, la copertura crolla e la temperatura salta in un colpo da meno di $30$ °C a più di $60$ °C, il valore del pianeta nudo. Riportare la luminosità appena sotto la soglia è insufficiente per tornare indietro, perché i semi devono germogliare su un suolo nudo e caldo, e servono luminosità molto più basse. Questa dipendenza dalla storia si chiama **isteresi**.

::: figura copertura
{"w":760,"h":285,"items":[{"t":"axes","o":[80,250],"x":[640,"luminosità relativa L"],"y":[225,"frazione di superficie"],"sx":450,"sy":250,"xt":[[0.0,"0,6"],[0.2,"0,8"],[0.4,"1,0"],[0.6,"1,2"],[0.8,"1,4"],[1.0,"1,6"]],"yt":[[0,"0"],[0.2,"0,2"],[0.4,"0,4"],[0.6,"0,6"],[0.8,"0,8"]]},{"t":"plot","o":[80,250],"sx":450,"sy":250,"pts":[[0.0,0.0],[0.01,0.0],[0.02,0.0],[0.03,0.0],[0.04,0.0],[0.05,0.0],[0.06,0.0],[0.07,0.0],[0.08,0.0],[0.09,0.0],[0.1,0.0],[0.11,0.694425],[0.12,0.6891561],[0.13,0.682339],[0.14,0.673621],[0.15,0.6524657],[0.16,0.6304761],[0.17,0.6104472],[0.18,0.5910537],[0.19,0.5722426],[0.2,0.5539877],[0.21,0.5362648],[0.22,0.5190509],[0.23,0.5023245],[0.24,0.486065],[0.25,0.4702533],[0.26,0.454871],[0.27,0.4399009],[0.28,0.4253267],[0.29,0.4111328],[0.3,0.3973047],[0.31,0.3838282],[0.32,0.3706902],[0.33,0.357878],[0.34,0.3453798],[0.35,0.333184],[0.36,0.3212799],[0.37,0.3096571],[0.38,0.2983058],[0.39,0.2872165],[0.4,0.2763803],[0.41,0.2657886],[0.42,0.2554332],[0.43,0.2453064],[0.44,0.2354006],[0.45,0.2257086],[0.46,0.2162237],[0.47,0.2069392],[0.48,0.1978489],[0.49,0.1889468],[0.5,0.180227],[0.51,0.171684],[0.52,0.1633125],[0.53,0.1551073],[0.54,0.1470637],[0.55,0.1391768],[0.56,0.1314421],[0.57,0.1238552],[0.58,0.116412],[0.59,0.1091084],[0.6,0.1019404],[0.61,0.0949042],[0.62,0.0],[0.63,0.0],[0.64,0.0],[0.65,0.0],[0.66,0.0],[0.67,0.0],[0.68,0.0],[0.69,0.0],[0.7,0.0],[0.71,0.0],[0.72,0.0],[0.73,0.0],[0.74,0.0],[0.75,0.0],[0.76,0.0],[0.77,0.0],[0.78,0.0],[0.79,0.0],[0.8,0.0],[0.81,0.0],[0.82,0.0],[0.83,0.0],[0.84,0.0],[0.85,0.0],[0.86,0.0],[0.87,0.0],[0.88,0.0],[0.89,0.0],[0.9,0.0],[0.91,0.0],[0.92,0.0],[0.93,0.0],[0.94,0.0],[0.95,0.0],[0.96,0.0],[0.97,0.0],[0.98,0.0],[0.99,0.0],[1.0,0.0]],"c":"force4","w":2.6},{"t":"plot","o":[80,250],"sx":450,"sy":250,"pts":[[0.0,0.0],[0.01,0.0],[0.02,0.0],[0.03,0.0],[0.04,0.0],[0.05,0.0],[0.06,0.0],[0.07,0.0],[0.08,0.0],[0.09,0.0],[0.1,0.0],[0.11,0.0],[0.12,0.0],[0.13,2.2e-06],[0.14,0.0007372],[0.15,0.021813],[0.16,0.0447092],[0.17,0.0647545],[0.18,0.0841483],[0.19,0.1029594],[0.2,0.1212143],[0.21,0.1389372],[0.22,0.1561511],[0.23,0.1728775],[0.24,0.189137],[0.25,0.2049487],[0.26,0.220331],[0.27,0.2353011],[0.28,0.2498753],[0.29,0.2640691],[0.3,0.2778973],[0.31,0.2913738],[0.32,0.3045118],[0.33,0.317324],[0.34,0.3298222],[0.35,0.342018],[0.36,0.3539221],[0.37,0.3655449],[0.38,0.3768962],[0.39,0.3879855],[0.4,0.3988217],[0.41,0.4094134],[0.42,0.4197687],[0.43,0.4298956],[0.44,0.4398014],[0.45,0.4494933],[0.46,0.4589783],[0.47,0.4682627],[0.48,0.477353],[0.49,0.4862552],[0.5,0.494975],[0.51,0.503518],[0.52,0.5118895],[0.53,0.5200946],[0.54,0.5281383],[0.55,0.5360252],[0.56,0.5437599],[0.57,0.5513468],[0.58,0.55879],[0.59,0.5660936],[0.6,0.5732615],[0.61,0.5802976],[0.62,0.0],[0.63,0.0],[0.64,0.0],[0.65,0.0],[0.66,0.0],[0.67,0.0],[0.68,0.0],[0.69,0.0],[0.7,0.0],[0.71,0.0],[0.72,0.0],[0.73,0.0],[0.74,0.0],[0.75,0.0],[0.76,0.0],[0.77,0.0],[0.78,0.0],[0.79,0.0],[0.8,0.0],[0.81,0.0],[0.82,0.0],[0.83,0.0],[0.84,0.0],[0.85,0.0],[0.86,0.0],[0.87,0.0],[0.88,0.0],[0.89,0.0],[0.9,0.0],[0.91,0.0],[0.92,0.0],[0.93,0.0],[0.94,0.0],[0.95,0.0],[0.96,0.0],[0.97,0.0],[0.98,0.0],[0.99,0.0],[1.0,0.0]],"c":"force3","w":2.6},{"t":"text","p":[215.0,112.5],"s":"margherite scure","c":"force4","size":11,"a":"start"},{"t":"text","p":[282.5,175.0],"s":"margherite chiare","c":"force3","size":11,"a":"start"}]}
---
Frazioni di superficie coperte da margherite scure e chiare all'equilibrio, in funzione della luminosità, partendo da pochi semi per ogni luminosità. Le scure dominano con la stella debole, le chiare con la stella luminosa.
:::

Daisyworld lascia aperta la questione dell'autoregolazione della Terra, e mostra soltanto che un'autoregolazione può emergere da regole locali, senza previsione e senza selezione a livello di pianeta. I risultati dipendono dalle ipotesi. Le margherite crescono meglio alla stessa temperatura a cui il pianeta è regolato, e il loro effetto sull'albedo va proprio nella direzione che stabilizza il clima. Varianti più realistiche del modello hanno aggiunto molte specie, mutazioni, erbivori, diffusione nello spazio e interazioni con l'anidride carbonica; in molte la regolazione resiste, in altre si rompe. Nel 2008 Andrew Wood e collaboratori, in una rassegna dei molti modelli derivati, conclusero che Daisyworld è utile soprattutto come strumento per studiare le retroazioni fra organismi e ambiente.

::: approfondimento Margherite grigie
Se le margherite avessero la stessa albedo del suolo nudo, coprire il pianeta non cambierebbe l'albedo, e la temperatura seguirebbe esattamente quella del pianeta nudo. La regolazione richiede due ingredienti: che gli organismi modifichino una grandezza che controlla il clima, e che la loro crescita dipenda da quel clima in modo diverso a seconda dell'effetto che producono. In Daisyworld le margherite scure si scaldano e scaldano il pianeta, le chiare si raffreddano e lo raffreddano; questa coerenza fra effetto locale ed effetto globale fa funzionare il meccanismo.
:::

## La Terra reale {#terra}

Sulla Terra le retroazioni fra vita e clima esistono, e alcune sono stabilizzanti. Il ciclo dei carbonati e dei silicati del capitolo [Atmosfere, effetto serra e clima](unit:biology-23) è accelerato dalle piante e dai funghi del suolo, che sciolgono le rocce più in fretta; un clima più caldo e umido favorisce la vegetazione e quindi l'alterazione, che sottrae anidride carbonica. Gli oceani assorbono anidride carbonica anche grazie al plancton, che la trasforma in materia organica e in gusci di carbonato che affondano. La concentrazione di ossigeno nell'aria, intorno al $21\%$, è rimasta in un intervallo relativamente stretto per centinaia di milioni di anni, forse perché più ossigeno favorisce gli incendi, che ne consumano, e riduce il seppellimento della materia organica.

Altre retroazioni hanno destabilizzato il clima. La fotosintesi ossigenica, ossidando il metano dell'atmosfera, contribuì circa $2{,}4$ miliardi di anni fa alle glaciazioni uroniane; la diffusione delle piante terrestri nel Devoniano ridusse l'anidride carbonica e contribuì a raffreddare il clima; alcune estinzioni di massa sono state accompagnate da emissioni di metano o di idrogeno solforato prodotte da microrganismi. Nel 2009 il paleontologo Peter Ward propose, in opposizione a Gaia, l'**ipotesi Medea**: la vita tenderebbe a lungo andare a compromettere la propria abitabilità. Nel 2013 Toby Tyrrell, esaminando i dati geologici, concluse che la lunga abitabilità della Terra dipende in parte dalla fortuna, più che da una regolazione biologica efficace.

Il quadro attuale è intermedio. La vita influenza profondamente l'atmosfera, gli oceani e le rocce, e alcune retroazioni biologiche contribuiscono alla stabilità del clima su tempi lunghi. Non esiste però una garanzia che la biosfera mantenga sempre condizioni favorevoli; la stabilità della Terra è il risultato di molti processi fisici, chimici e biologici, alcuni stabilizzanti e altri no.

## Riconoscere un pianeta vivo {#astro}

Per l'astrobiologia l'idea più feconda di Lovelock è la prima: un pianeta abitato è un pianeta in disequilibrio. L'atmosfera terrestre, vista da lontano, mostra insieme ossigeno, prodotto dalla fotosintesi, e metano, prodotto dai metanogeni, oltre a ozono, protossido di azoto e vapore acqueo. Nessun processo noto senza vita mantiene a lungo queste combinazioni nelle quantità osservate. È la base della ricerca delle **biofirme atmosferiche** con i telescopi spaziali, discussa nei capitoli [Atmosfere degli esopianeti e JWST](unit:biology-32) e [Biofirme e falsi positivi](unit:biology-33).

Anche l'albedo è una biofirma potenziale. La vegetazione terrestre ha uno spettro di riflessione caratteristico, con il bordo rosso del capitolo [Fotosintesi e luce di altre stelle](unit:biology-20); la luminosità di un pianeta che ruota cambia quando passano davanti all'osservatore continenti, oceani e nubi, e questa variazione può rivelare superfici diverse. Su un pianeta come Daisyworld la copertura vegetale cambierebbe l'albedo media nel tempo in modo coordinato con l'evoluzione della stella: un segnale debole e difficile da osservare.

Il contributo di Lovelock alla ricerca della vita su Marte mostra però anche i limiti dell'approccio. Un'atmosfera vicina all'equilibrio esclude una biosfera grande e attiva in superficie, mentre lascia aperta la possibilità di una vita scarsa nel sottosuolo, con effetti troppo piccoli per alterare l'atmosfera. Le biofirme atmosferiche riveleranno, se esistono, le biosfere più rigogliose.

## Un'esperienza: Daisyworld su un foglio di calcolo {#esperienza}

Il modello Daisyworld è abbastanza semplice da poter essere risolto con un foglio di calcolo, passo dopo passo, con il metodo di Eulero: a ogni passo si calcolano le derivate con i valori attuali e si aggiornano le coperture con un piccolo incremento di tempo. Il laboratorio del sito usa un metodo più preciso, ma il risultato qualitativo è lo stesso.

::: metodo Le margherite passo per passo
**Materiale.** Un foglio di calcolo, come quelli inclusi nei pacchetti per ufficio gratuiti.

**Procedura.** Nella prima riga si scrivono i parametri: $S=917$, $\sigma=5{,}67\cdot10^{-8}$, $q=2\cdot10^9$, $\gamma=0{,}3$, la luminosità $L$ e il passo di tempo $\Delta t=0{,}1$. In ogni riga successiva si calcolano, nell'ordine: la superficie libera $x=1-a_s-a_c$; l'albedo $A=0{,}25a_s+0{,}75a_c+0{,}5x$; la quarta potenza della temperatura media $T^4=SL(1-A)/\sigma$; le temperature locali delle due specie, $(T^4+q(A-0{,}25))^{1/4}$ e $(T^4+q(A-0{,}75))^{1/4}$, convertite in gradi Celsius; i tassi di crescita $\beta$, posti a zero se negativi; infine le nuove coperture, $a_s+\Delta t\cdot a_s(x\beta_s-\gamma)$ e analogamente per $a_c$. Si parte con $a_s=a_c=0{,}01$ e si copiano le formule per qualche migliaio di righe.

**Analisi.** Disegnare le coperture e la temperatura media in funzione del tempo per $L=1$: si arriva a circa il $28\%$ di margherite scure, il $40\%$ di chiare e $22$ °C? Ripetere per $L=0{,}8$ e $L=1{,}2$, e confrontare la temperatura con quella del pianeta nudo. Che cosa succede con un passo di tempo molto più grande, per esempio $\Delta t=2$?
:::

L'ultima domanda mostra un punto importante dei modelli numerici: un passo troppo grande produce oscillazioni o valori assurdi, come coperture negative, che dipendono dal metodo di calcolo e sono estranei al modello. Le iterazioni e la loro stabilità sono discusse nel capitolo [Iterazioni, stabilità e precisione numerica](unit:math-p08).

## Errori frequenti {#errori}

::: errore Pensare che le margherite regolino il clima di proposito
Ogni margherita cresce dove la temperatura locale le è favorevole. La regolazione è un effetto collettivo che emerge dalle regole di crescita e dall'effetto delle margherite sull'albedo, senza previsione né scopo.
:::

::: errore Confondere un bilancio ad albedo fissata con l'autoregolazione
Il bilancio radiativo con albedo imposta mostra soltanto che più albedo significa più freddo. L'autoregolazione richiede che l'albedo cambi in risposta alla temperatura, come fanno le coperture di margherite in Daisyworld.
:::

::: errore Calcolare la temperatura in gradi Celsius con la legge di Stefan e Boltzmann
La legge vale per la temperatura assoluta. Si estrae la radice quarta in kelvin, e solo alla fine si converte in gradi Celsius.
:::

::: errore Credere che Daisyworld dimostri l'ipotesi Gaia
Il modello mostra che una regolazione può emergere senza scopo; non dimostra che la Terra si regoli in questo modo. Le prove sulla Terra reale indicano retroazioni sia stabilizzanti sia destabilizzanti.
:::

::: errore Pensare che più vita significhi sempre un clima più stabile
La fotosintesi ossigenica e la diffusione delle piante terrestri hanno anche contribuito a glaciazioni. L'effetto della vita sul clima dipende dai processi coinvolti e dalla loro direzione.
:::

## Sintesi {#sintesi}

::: sintesi In breve
- L'albedo è la frazione di luce riflessa; varia da pochi punti percentuali per l'oceano a più dell'$80\%$ per la neve fresca, e vale circa $0{,}30$ per la Terra nel suo complesso.
- In un pianeta ideale $\sigma T^4=SL(1-A)$: a luminosità fissata più albedo significa più freddo; la temperatura si calcola in kelvin.
- Gli organismi modificano l'albedo, la composizione dell'atmosfera e il ciclo del carbonio: foreste, alghe della neve e plancton ne sono esempi.
- L'ipotesi Gaia di Lovelock e Margulis propone che la biosfera regoli le condizioni del pianeta; le versioni deboli sono accettate, quelle forti restano controverse.
- In Daisyworld margherite scure e chiare, crescendo secondo regole locali, mantengono la temperatura vicina all'ottimo in un ampio intervallo di luminosità.
- La regolazione ha limiti, mostra isteresi e dipende dalle ipotesi del modello.
- Sulla Terra le retroazioni biologiche sono in parte stabilizzanti e in parte destabilizzanti.
- Il disequilibrio chimico dell'atmosfera, come la presenza simultanea di ossigeno e metano, è una delle biofirme più promettenti.
:::

## Glossario {#glossario}

- **Albedo**: frazione della radiazione incidente riflessa da una superficie o da un pianeta.
- **Autoregolazione**: tendenza di un sistema a mantenere una grandezza vicina a un valore, nonostante le perturbazioni esterne.
- **Bilancio radiativo**: uguaglianza fra la potenza assorbita e la potenza emessa da un pianeta in equilibrio.
- **Daisyworld**: modello di un pianeta coperto da margherite scure e chiare, proposto da Watson e Lovelock nel 1983.
- **Disequilibrio chimico**: presenza simultanea di sostanze che reagirebbero fra loro, mantenuta da processi che le rinnovano.
- **Ipotesi Gaia**: proposta secondo cui la biosfera e l'ambiente formano un sistema che si autoregola.
- **Ipotesi Medea**: proposta secondo cui la vita tende a lungo andare a compromettere la propria abitabilità.
- **Isteresi**: dipendenza dello stato di un sistema dalla sua storia, oltre che dalle condizioni attuali.
- **Retroazione negativa**: retroazione che si oppone al cambiamento che l'ha innescata.
- **Retroazione positiva**: retroazione che amplifica il cambiamento che l'ha innescata.
- **Solfuro di dimetile**: gas prodotto dal plancton marino che contribuisce alla formazione dei nuclei di condensazione delle nubi.
- **Temperatura radiativa**: temperatura a cui un corpo nero emetterebbe la potenza che il pianeta irraggia.

## Esercizi {#esercizi}

::: esercizio Un pianeta grigio [base]
Calcolare il flusso assorbito e la temperatura di un pianeta ideale con $S=917$ W/m$^2$, $L=1$ e $A=0{,}5$, in kelvin e in gradi Celsius.
>>> soluzione
Il flusso assorbito è $917\cdot0{,}5=458{,}5$ W/m$^2$; la temperatura è $(458{,}5/5{,}67\cdot10^{-8})^{1/4}\approx299{,}9$ K, circa $26{,}7$ °C.
:::

::: esercizio Bianco e nero [base]
Con $S=917$ W/m$^2$ e $L=1$, calcolare la temperatura di un pianeta interamente coperto di margherite chiare, con albedo $0{,}75$, e di uno coperto di margherite scure, con albedo $0{,}25$.
>>> soluzione
Con $A=0{,}75$ si ottiene circa $252$ K, $-21$ °C; con $A=0{,}25$ circa $332$ K, $59$ °C. Un pianeta uniforme di una sola specie sarebbe troppo freddo o troppo caldo per le margherite stesse.
:::

::: esercizio L'albedo di un pianeta misto [base]
Un pianeta è coperto per il $28\%$ da margherite scure, per il $40\%$ da chiare e per il resto da suolo nudo. Calcolarne l'albedo.
>>> soluzione
L'albedo è la media pesata

$$\begin{aligned}A&=0{,}28\cdot0{,}25+0{,}40\cdot0{,}75\\&\quad+0{,}32\cdot0{,}5\\&=0{,}07+0{,}30+0{,}16=0{,}53.\end{aligned}$$
:::

::: esercizio La curva di crescita [base]
Calcolare il tasso di crescita delle margherite, $\beta=1-0{,}003265\,(22{,}5-T)^2$, a $22{,}5$, $15$ e $40$ °C.
>>> soluzione
$\beta=1$ a $22{,}5$ °C, circa $0{,}82$ a $15$ °C e quasi zero a $40$ °C, perché $0{,}003265\cdot17{,}5^2\approx1$.
:::

::: esercizio Una stella che cresce [base]
Con $A=0{,}5$ e $S=917$ W/m$^2$, calcolare la temperatura del pianeta nudo per $L=0{,}85$ e $L=1{,}1$.
>>> soluzione
Circa $288$ K, cioè $14{,}8$ °C, e circa $307$ K, cioè $34{,}0$ °C. Senza un cambiamento dell'albedo la temperatura segue la luminosità della stella.
:::

::: esercizio L'albedo della Terra [base]
La temperatura di equilibrio della Terra con albedo $0{,}30$ è circa $254{,}6$ K. Di quanto cambia se l'albedo sale a $0{,}31$?
>>> soluzione
La temperatura è proporzionale a $(1-A)^{1/4}$, quindi diventa $254{,}6\cdot(0{,}69/0{,}70)^{1/4}\approx253{,}7$ K: circa $0{,}9$ K in meno per un punto percentuale di albedo.
:::

::: esercizio La copertura delle margherite chiare [medio]
Su un pianeta con una sola specie, le margherite chiare, che si trovano alla temperatura ottimale, con $\beta=1$, quale copertura raggiungono all'equilibrio con $\gamma=0{,}3$?
>>> soluzione
All'equilibrio $x\beta=\gamma$, quindi la superficie libera vale $x=0{,}3$ e la copertura $1-0{,}3=0{,}7$. È il valore a cui tende la copertura delle margherite chiare con una stella molto luminosa, quando le scure sono scomparse.
:::

::: esercizio L'albedo che serve [medio]
Quale albedo deve avere Daisyworld, con $S=917$ W/m$^2$, perché la temperatura media sia $22{,}5$ °C, con $L=1$ e con $L=1{,}2$?
>>> soluzione
Da $1-A=\sigma T^4/(SL)$ con $T=295{,}65$ K si ottiene $1-A\approx0{,}472/L$: $A\approx0{,}53$ per $L=1$ e $A\approx0{,}61$ per $L=1{,}2$. Le margherite chiare devono aumentare quando la stella diventa più luminosa.
:::

::: esercizio Temperature locali [medio]
Con $L=1$ la simulazione dà un'albedo di circa $0{,}531$ e una temperatura media di $295{,}2$ K. Con $T_i^4=T^4+q\,(A-A_i)$ e $q=2\cdot10^9$ K$^4$, calcolare le temperature delle margherite scure e chiare.
>>> soluzione
$T^4\approx7{,}59\cdot10^9$ K$^4$. Per le scure si aggiunge $2\cdot10^9\cdot0{,}281\approx0{,}56\cdot10^9$, e si ottiene circa $300{,}5$ K, $27{,}3$ °C; per le chiare si toglie $2\cdot10^9\cdot0{,}219\approx0{,}44\cdot10^9$, e si ottiene circa $290{,}8$ K, $17{,}7$ °C.
:::

::: esercizio Neve e foresta [medio]
Una superficie riceve in media $100$ W/m$^2$ di luce solare. Quanta ne assorbe se è coperta di neve con albedo $0{,}8$, e quanta se è coperta da una foresta di conifere con albedo $0{,}1$?
>>> soluzione
La neve assorbe $100\cdot(1-0{,}8)=20$ W/m$^2$, la foresta $90$ W/m$^2$, più di quattro volte tanto. Per questo l'espansione delle foreste boreali tende a riscaldare il clima regionale d'inverno.
:::

::: esercizio Semi e piante adulte [medio]
Con $L=1{,}3$ e $A=0{,}5$, quale temperatura ha il suolo nudo? Perché i semi non riescono a germogliare, mentre margherite chiare già diffuse sopravvivono?
>>> soluzione
$T=(917\cdot1{,}3\cdot0{,}5/\sigma)^{1/4}\approx320$ K, circa $47$ °C, oltre i $40$ °C a cui la crescita si annulla. Una copertura di margherite chiare già estesa alza l'albedo e mantiene il pianeta e le margherite stesse a temperature adatte: lo stato raggiunto dipende dalla storia, un esempio di isteresi.
:::

::: esercizio Il metano dell'atmosfera [medio]
L'atmosfera terrestre contiene circa $1{,}8\cdot10^{20}$ moli di gas e circa $1{,}9$ parti per milione di metano, che viene distrutto in circa nove anni. Quante moli di metano ci sono, e quanto metano, in tonnellate, deve essere prodotto ogni anno per mantenerne costante la concentrazione?
>>> soluzione
Le moli di metano sono $1{,}9\cdot10^{-6}\cdot1{,}8\cdot10^{20}\approx3{,}4\cdot10^{14}$; ogni anno ne viene distrutto circa un nono, $3{,}8\cdot10^{13}$ moli, cioè con $16$ g/mol circa $6\cdot10^{14}$ g, seicento milioni di tonnellate. Gran parte viene da microrganismi metanogeni: il disequilibrio fra metano e ossigeno è mantenuto dalla vita.
:::

::: esercizio La somma delle temperature [avanzato]
All'equilibrio, con entrambe le specie presenti, $x\beta_s=x\beta_c=\gamma$. Mostrare che le temperature delle due specie sono simmetriche rispetto a $22{,}5$ °C, e verificarlo con i valori dell'esercizio sulle temperature locali.
>>> soluzione
Dalle due equazioni $\beta_s=\beta_c$, e poiché $\beta$ dipende da $(22{,}5-T)^2$, si ha $22{,}5-T_s=-(22{,}5-T_c)$, cioè $T_s+T_c=45$ °C; la soluzione $T_s=T_c$ è esclusa perché le due specie hanno albedo diverse. Con i valori calcolati, $27{,}3+17{,}7=45{,}0$ °C.
:::

::: esercizio La sensibilità all'albedo [avanzato]
Derivando $T=[S(1-A)/(4\sigma)]^{1/4}$, mostrare che $\mathrm dT/\mathrm dA=-T/[4(1-A)]$ e calcolare la variazione della temperatura di equilibrio terrestre per una variazione di albedo di $0{,}01$, con $T=254{,}6$ K e $A=0{,}30$.
>>> soluzione
La derivata di $(1-A)^{1/4}$ è $-\tfrac14(1-A)^{-3/4}$, quindi $\mathrm dT/\mathrm dA=-T/[4(1-A)]$, cioè $-254{,}6/2{,}8\approx-91$ K. Per $\Delta A=0{,}01$ la variazione è circa $-0{,}9$ K, in accordo con il calcolo diretto.
:::

::: esercizio Isteresi [avanzato]
Nella simulazione con aumento lento della luminosità le margherite chiare coprono ancora il $69\%$ del pianeta con $L=1{,}4$, e la temperatura media è circa $20{,}6$ °C; partendo da pochi semi, con la stessa luminosità, il pianeta resta nudo. Calcolare la temperatura del pianeta nudo con $L=1{,}4$ e spiegare perché i due stati sono entrambi possibili.
>>> soluzione
Il pianeta nudo, con $A=0{,}5$, è a $(917\cdot1{,}4\cdot0{,}5/\sigma)^{1/4}\approx326$ K, circa $53$ °C, troppo caldo per qualunque seme. Con la copertura di margherite chiare l'albedo è circa $0{,}67$ e il pianeta resta temperato, e le margherite possono crescere. Le due soluzioni sono stati di equilibrio diversi del sistema, e quale si realizza dipende dalla storia.
:::

::: esercizio Margherite grigie [avanzato]
Supponiamo che una terza specie abbia albedo $0{,}5$, uguale al suolo. Mostrare che la sua copertura non cambia la temperatura media del pianeta, e spiegare perché un pianeta con sole margherite grigie non può regolare il clima.
>>> soluzione
L'albedo resta $0{,}5$ qualunque sia la copertura grigia, e con essa la temperatura media; anche la temperatura locale delle margherite grigie coincide con la media, perché $A-A_i=0$. La crescita delle margherite grigie dipende dalla temperatura, ma il loro effetto sull'albedo è nullo, e manca quindi il ciclo chiuso fra crescita e clima che produce la regolazione.
:::

## Fonti {#fonti}

Il testo, le figure, gli esempi e gli esercizi di questo capitolo sono originali. Per la scelta e l'ordine degli argomenti i riferimenti principali sono A. M. Shaw, *Astrochemistry: From Astronomy to Astrobiology*, Wiley, 2006, §7.6 (riscaldamento radiativo e albedo), e J. R. Morris, D. L. Hartl, A. H. Knoll e collaboratori, *Biology: How Life Works*, 2ª edizione, Macmillan, 2016, §25.1-25.3 (ciclo del carbonio, ecologia ed evoluzione), §48.1 (basi fisiche del clima) e §48.3 (cicli degli elementi). Le simulazioni di Daisyworld sono state ottenute con il modello del laboratorio di questo sito, che implementa le equazioni di Watson e Lovelock con il metodo di Runge e Kutta.

1. J. E. Lovelock, *Nature* 207, 568 (1965): una base fisica per la ricerca della vita; D. R. Hitchcock, J. E. Lovelock, *Icarus* 7, 149 (1967): la vita su Marte e l'analisi delle atmosfere.
2. J. E. Lovelock, L. Margulis, *Tellus* 26, 2 (1974): l'omeostasi dell'atmosfera e l'ipotesi Gaia.
3. W. F. Doolittle, *CoEvolution Quarterly* 29, 58 (1981); R. Dawkins, *The Extended Phenotype*, Oxford University Press (1982): le critiche evolutive.
4. A. J. Watson, J. E. Lovelock, *Tellus B* 35, 284 (1983): Daisyworld.
5. J. W. Kirchner, *Reviews of Geophysics* 27, 223 (1989): le versioni dell'ipotesi Gaia.
6. R. J. Charlson, J. E. Lovelock, M. O. Andreae, S. G. Warren, *Nature* 326, 655 (1987): plancton, zolfo e nubi; P. K. Quinn, T. S. Bates, *Nature* 480, 51 (2011): le obiezioni a quell'ipotesi.
7. G. B. Bonan, *Science* 320, 1444 (2008): foreste e clima.
8. A. J. Wood e collaboratori, *Reviews of Geophysics* 46, RG1001 (2008): rassegna dei modelli Daisyworld.
9. P. Ward, *The Medea Hypothesis*, Princeton University Press (2009); T. Tyrrell, *On Gaia*, Princeton University Press (2013).
10. D. L. Hartmann, *Global Physical Climatology*, 2ª edizione, Elsevier (2016): albedo delle superfici e bilancio radiativo.
