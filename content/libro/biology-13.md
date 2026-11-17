---
unit: biology-13
titolo: Ereditarietà e selezione naturale
sottotitolo: Mendel, Hardy-Weinberg e la selezione, ovvero come cambiano le frequenze dei geni
volume: Volume di biologia
fonte: Testo originale; riferimenti principali A. M. Shaw, Astrochemistry, §1.3; J. R. Morris et al., Biology: How Life Works, 2ª ed., §16.2–16.4, 21.3–21.5
---

## Prima di cominciare {#apertura}

Il 1° luglio 1858, alla Linnean Society di Londra, furono letti due scritti di Charles Darwin e di Alfred Russel Wallace che proponevano la stessa idea: le specie cambiano nel tempo perché gli individui variano, una parte delle variazioni si trasmette ai discendenti, e gli individui con le variazioni più adatte all'ambiente lasciano in media più discendenti. È la **selezione naturale**. L'anno successivo Darwin la presentò in un libro, *L'origine delle specie*.

Alla teoria mancava un pezzo. Darwin non sapeva come si trasmettessero i caratteri, e l'idea più diffusa, che i caratteri dei genitori si mescolassero nei figli come colori in un secchio, creava un problema serio: in pochi incroci ogni variante vantaggiosa si sarebbe diluita fino a sparire. La soluzione era già stata pubblicata nel 1866, in una rivista di provincia, da un monaco agostiniano di Brno, Gregor Mendel, che incrociando piante di pisello aveva scoperto che i caratteri si trasmettono attraverso unità discrete, oggi chiamate geni, che non si mescolano. Il lavoro di Mendel fu ignorato per trentaquattro anni e riscoperto nel 1900. Fra il 1918 e il 1932 Ronald Fisher, J. B. S. Haldane e Sewall Wright unirono le leggi di Mendel e la selezione in una teoria matematica dell'evoluzione, la **genetica delle popolazioni**.

Questo capitolo segue lo stesso percorso. Presenta le leggi di Mendel e il loro significato molecolare, introduce le frequenze alleliche e l'equilibrio di Hardy-Weinberg, il modello di riferimento di una popolazione che non evolve, e ricava come la selezione cambia le frequenze generazione dopo generazione. Per l'astrobiologia la selezione naturale ha un ruolo speciale: la definizione di vita adottata da molti ricercatori della NASA, proposta da Gerald Joyce nel 1994, descrive la vita come un sistema chimico che si mantiene da sé ed è capace di evoluzione darwiniana. Qualunque forma di vita scopriremo altrove dovrebbe quindi obbedire alle stesse regole matematiche.

::: obiettivi
- enunciare le leggi della segregazione e dell'assortimento indipendente e prevedere i rapporti fra i fenotipi;
- usare un test del chi quadrato per confrontare dati di incrocio e previsioni;
- calcolare le frequenze genotipiche di Hardy-Weinberg e riconoscerne le ipotesi;
- definire fitness relativa e coefficiente di selezione;
- ricavare e usare la formula $p'=p(1+s)/(1+sp)$ e calcolare il tempo di diffusione di una variante;
- descrivere la selezione nei diploidi e il vantaggio dell'eterozigote, con l'esempio dell'anemia falciforme;
- discutere esempi di selezione osservata in natura e in laboratorio, e il ruolo dell'evoluzione darwiniana nella definizione di vita.
:::

Il capitolo usa le mutazioni del capitolo [Mutazioni e soglia d'errore](unit:biology-12) e la probabilità del capitolo [Combinatoria, probabilità e statistica](unit:math-c10). La crescita geometrica delle varianti è un'applicazione del capitolo [Esponenziali e logaritmi](unit:math-c06).

## Le leggi di Mendel {#mendel}

Mendel scelse il pisello per buone ragioni: si coltiva facilmente, produce molti semi, si autoimpollina ma può essere incrociato a mano, e possiede varietà che differiscono per caratteri netti, come semi lisci o rugosi, gialli o verdi. Per otto anni Mendel incrociò linee pure, che riprodotte fra loro davano sempre lo stesso carattere, e contò con pazienza i discendenti.

Incrociando una linea a semi lisci con una a semi rugosi ottenne nella prima generazione, F1, soltanto semi lisci. Lasciando autoimpollinare le piante F1, nella seconda generazione, F2, ricomparvero i semi rugosi: $5474$ lisci e $1850$ rugosi, un rapporto di $2{,}96$ a $1$. Per il colore del seme ottenne $6022$ gialli e $2001$ verdi, un rapporto di $3{,}01$ a $1$. Mendel interpretò questi numeri con un modello di straordinaria semplicità.

::: legge Legge della segregazione
Ogni carattere è determinato da una coppia di fattori ereditari, gli **alleli**, uno ricevuto da ciascun genitore. Gli alleli di una coppia si separano nella formazione dei gameti, così che ogni gamete ne porta uno solo, con uguale probabilità. Se un allele è **dominante** e l'altro **recessivo**, l'individuo che li porta entrambi mostra il carattere dominante.
:::

Indicando con $R$ l'allele dominante dei semi lisci e con $r$ quello recessivo dei semi rugosi, le piante F1 sono $Rr$. Ciascuna produce gameti $R$ e $r$ in parti uguali, e l'incontro casuale dei gameti dà in F2 le combinazioni $RR$, $Rr$, $rR$ e $rr$ con uguale probabilità (figura 1). Tre combinazioni su quattro contengono almeno un $R$ e danno semi lisci; una sola, $rr$, dà semi rugosi: il rapporto atteso è $3$ a $1$. L'insieme degli alleli di un individuo è il suo **genotipo**, il carattere osservato il suo **fenotipo**; un individuo con due alleli uguali è **omozigote**, uno con due alleli diversi **eterozigote**.

::: figura punnett
{"w":560,"h":310,"items":[{"t":"text","p":[310,40],"s":"gameti della pianta Rr","c":"ax","size":12},{"t":"text","p":[140,180],"s":"gameti","c":"ax","size":12,"a":"end"},{"t":"text","p":[140,196],"s":"dell’altra Rr","c":"ax","size":12,"a":"end"},{"t":"text","p":[255.0,62],"s":"R  (1/2)","c":"force2","size":13},{"t":"text","p":[188,130.0],"s":"R","c":"force2","size":13,"a":"end"},{"t":"text","p":[365.0,62],"s":"r  (1/2)","c":"force2","size":13},{"t":"text","p":[188,240.0],"s":"r","c":"force2","size":13,"a":"end"},{"t":"rect","p":[200,70,110,110],"c":"body","r":4},{"t":"poly","pts":[[200,70],[310,70],[310,180],[200,180]],"close":true,"c":"force3","w":1.6},{"t":"text","p":[255.0,122.0],"s":"RR","c":"force3","size":13},{"t":"text","p":[255.0,138.0],"s":"liscio","c":"force3","size":13},{"t":"rect","p":[310,70,110,110],"c":"body","r":4},{"t":"poly","pts":[[310,70],[420,70],[420,180],[310,180]],"close":true,"c":"force3","w":1.6},{"t":"text","p":[365.0,122.0],"s":"Rr","c":"force3","size":13},{"t":"text","p":[365.0,138.0],"s":"liscio","c":"force3","size":13},{"t":"rect","p":[200,180,110,110],"c":"body","r":4},{"t":"poly","pts":[[200,180],[310,180],[310,290],[200,290]],"close":true,"c":"force3","w":1.6},{"t":"text","p":[255.0,232.0],"s":"Rr","c":"force3","size":13},{"t":"text","p":[255.0,248.0],"s":"liscio","c":"force3","size":13},{"t":"rect","p":[310,180,110,110],"c":"body","r":4},{"t":"poly","pts":[[310,180],[420,180],[420,290],[310,290]],"close":true,"c":"force","w":1.6},{"t":"text","p":[365.0,232.0],"s":"rr","c":"force","size":13},{"t":"text","p":[365.0,248.0],"s":"rugoso","c":"force","size":13},{"t":"text","p":[450,172],"s":"3 lisci","c":"force3","size":13,"a":"start"},{"t":"text","p":[450,194],"s":"1 rugoso","c":"force","size":13,"a":"start"}]}
---
Il quadrato di Punnett dell'incrocio fra due piante eterozigoti $Rr$. Ogni pianta produce gameti $R$ e $r$ con probabilità $1/2$; le quattro combinazioni sono ugualmente probabili, e tre su quattro danno semi lisci.
:::

Incrociando piante che differivano per due caratteri, forma e colore del seme, Mendel ottenne in F2 quattro classi: $315$ semi lisci e gialli, $108$ lisci e verdi, $101$ rugosi e gialli, $32$ rugosi e verdi, su $556$ semi. Sono vicini ai rapporti $9:3:3:1$ previsti se i due caratteri si separano indipendentemente l'uno dall'altro: è la **legge dell'assortimento indipendente**. Oggi sappiamo che vale per geni che si trovano su cromosomi diversi, o lontani sullo stesso cromosoma; geni vicini tendono a essere ereditati insieme.

Quanto devono essere vicini ai valori attesi i dati per confermare il modello? La statistica risponde con il **test del chi quadrato**. Si calcola

$$\chi^2=\sum\frac{(O-A)^2}{A},$$

dove $O$ sono i conteggi osservati e $A$ quelli attesi, e si confronta il risultato con una tabella che dipende dal numero di classi indipendenti, i gradi di libertà. Per i dati di Mendel sui due caratteri i valori attesi sono $312{,}75$, $104{,}25$, $104{,}25$ e $34{,}75$, e il chi quadrato vale circa $0{,}47$ (figura 2). Con tre gradi di libertà, uno scostamento casuale supera questo valore in più del $90\%$ dei casi: i dati sono in ottimo accordo con il modello. Nel 1936 Fisher, rianalizzando tutti gli esperimenti, osservò che l'accordo era nel complesso perfino troppo buono per essere dovuto al caso, e la discussione su come Mendel abbia scelto o registrato i dati non si è mai del tutto chiusa; le sue leggi, comunque, sono state confermate da innumerevoli esperimenti successivi.

::: figura mendel
{"w":720,"h":295,"items":[{"t":"arrow","p":[90,260,90,20],"c":"ax","w":1.6,"head":9},{"t":"text","p":[98,24],"s":"numero di semi","c":"ax","size":12,"a":"start"},{"t":"line","p":[85,260.0,90,260.0],"c":"ax","w":1},{"t":"text","p":[80,264.0],"s":"0","c":"muted","size":11,"a":"end"},{"t":"line","p":[85,190.0,90,190.0],"c":"ax","w":1},{"t":"text","p":[80,194.0],"s":"100","c":"muted","size":11,"a":"end"},{"t":"line","p":[85,120.0,90,120.0],"c":"ax","w":1},{"t":"text","p":[80,124.0],"s":"200","c":"muted","size":11,"a":"end"},{"t":"line","p":[85,50.0,90,50.0],"c":"ax","w":1},{"t":"text","p":[80,54.0],"s":"300","c":"muted","size":11,"a":"end"},{"t":"line","p":[90,260,690,260],"c":"ax","w":1.4},{"t":"rect","p":[130,39.5,50,220.5],"c":"force2","r":3},{"t":"text","p":[155,31.5],"s":"315","c":"force2","size":11},{"t":"rect","p":[186,41.1,50,218.9],"c":"force3","r":3},{"t":"text","p":[211,33.1],"s":"312,75","c":"force3","size":11},{"t":"text","p":[183,280],"s":"lisci gialli","c":"ax","size":11},{"t":"rect","p":[280,184.4,50,75.6],"c":"force2","r":3},{"t":"text","p":[305,176.4],"s":"108","c":"force2","size":11},{"t":"rect","p":[336,187.0,50,73.0],"c":"force3","r":3},{"t":"text","p":[361,179.0],"s":"104,25","c":"force3","size":11},{"t":"text","p":[333,280],"s":"lisci verdi","c":"ax","size":11},{"t":"rect","p":[430,189.3,50,70.7],"c":"force2","r":3},{"t":"text","p":[455,181.3],"s":"101","c":"force2","size":11},{"t":"rect","p":[486,187.0,50,73.0],"c":"force3","r":3},{"t":"text","p":[511,179.0],"s":"104,25","c":"force3","size":11},{"t":"text","p":[483,280],"s":"rugosi gialli","c":"ax","size":11},{"t":"rect","p":[580,237.6,50,22.4],"c":"force2","r":3},{"t":"text","p":[605,229.6],"s":"32","c":"force2","size":11},{"t":"rect","p":[636,235.7,50,24.3],"c":"force3","r":3},{"t":"text","p":[661,227.7],"s":"34,75","c":"force3","size":11},{"t":"text","p":[633,280],"s":"rugosi verdi","c":"ax","size":11},{"t":"rect","p":[470,30,14,10],"c":"force2","r":2},{"t":"text","p":[490,40],"s":"osservati","c":"force2","size":11,"a":"start"},{"t":"rect","p":[570,30,14,10],"c":"force3","r":2},{"t":"text","p":[590,40],"s":"attesi 9:3:3:1","c":"force3","size":11,"a":"start"}]}
---
I conteggi di Mendel per l'incrocio fra piante che differivano per forma e colore del seme, confrontati con i valori attesi secondo il rapporto $9:3:3:1$ su $556$ semi.
:::

Le leggi di Mendel hanno una spiegazione molecolare. I geni sono tratti di DNA sui cromosomi, e la meiosi, la divisione cellulare che produce i gameti, separa i due cromosomi di ogni coppia. Nel 1990 si scoprì che l'allele $r$ dei semi rugosi è un gene per un enzima che costruisce l'amido, interrotto dall'inserzione di un trasposone di circa ottocento coppie di basi. Senza l'enzima il seme accumula zuccheri, assorbe più acqua durante la maturazione e si raggrinzisce seccando. Il carattere studiato da Mendel è una mutazione di grande scala, del tipo descritto nel capitolo precedente.

## Frequenze alleliche e l'equilibrio di Hardy-Weinberg {#hardy}

La genetica delle popolazioni guarda alle frequenze degli alleli invece che ai singoli incroci. Si consideri un gene con due alleli, $A$ e $a$, in una popolazione di organismi diploidi. La **frequenza allelica** $p$ di $A$ è la frazione degli alleli della popolazione che sono $A$, e quella di $a$ è $q=1-p$. Se in una popolazione di $1000$ individui ci sono $360$ omozigoti $AA$, $480$ eterozigoti $Aa$ e $160$ omozigoti $aa$, gli alleli $A$ sono $2\cdot360+480=1200$ su $2000$, e $p=0{,}6$.

Nel 1908 il matematico inglese Godfrey Hardy e il medico tedesco Wilhelm Weinberg mostrarono indipendentemente che cosa succede in una popolazione in cui nulla cambia le frequenze. Se gli individui si accoppiano a caso rispetto al gene considerato, ogni nuovo individuo riceve due alleli estratti a caso dall'insieme degli alleli della generazione precedente.

::: legge Equilibrio di Hardy-Weinberg
In una popolazione molto grande, con accoppiamento casuale e senza selezione, mutazione, migrazione e deriva, le frequenze genotipiche dopo una generazione sono

$$AA:\;p^2,\qquad Aa:\;2pq,\qquad aa:\;q^2,$$

e le frequenze alleliche $p$ e $q$ restano costanti da una generazione all'altra.
:::

Nell'esempio precedente $p^2=0{,}36$, $2pq=0{,}48$ e $q^2=0{,}16$: la popolazione è in equilibrio. La figura 3 mostra le tre frequenze genotipiche in funzione di $p$. Gli eterozigoti sono al massimo, la metà della popolazione, quando $p=q=1/2$.

::: figura hardy
{"w":800,"h":285,"items":[{"t":"axes","o":[80,250],"x":[680,"frequenza p dell’allele A"],"y":[240,"frequenza del genotipo"],"sx":560,"sy":220,"xt":[[0,"0"],[0.2,"0,2"],[0.4,"0,4"],[0.6,"0,6"],[0.8,"0,8"],[1.0,"1,0"]],"yt":[[0,"0"],[0.2,"0,2"],[0.4,"0,4"],[0.6,"0,6"],[0.8,"0,8"],[1.0,"1,0"]]},{"t":"plot","o":[80,250],"sx":560,"sy":220,"pts":[[0.0,0.0],[0.01,0.0001],[0.02,0.0004],[0.03,0.0009],[0.04,0.0016],[0.05,0.0025],[0.06,0.0036],[0.07,0.0049],[0.08,0.0064],[0.09,0.0081],[0.1,0.01],[0.11,0.0121],[0.12,0.0144],[0.13,0.0169],[0.14,0.0196],[0.15,0.0225],[0.16,0.0256],[0.17,0.0289],[0.18,0.0324],[0.19,0.0361],[0.2,0.04],[0.21,0.0441],[0.22,0.0484],[0.23,0.0529],[0.24,0.0576],[0.25,0.0625],[0.26,0.0676],[0.27,0.0729],[0.28,0.0784],[0.29,0.0841],[0.3,0.09],[0.31,0.0961],[0.32,0.1024],[0.33,0.1089],[0.34,0.1156],[0.35,0.1225],[0.36,0.1296],[0.37,0.1369],[0.38,0.1444],[0.39,0.1521],[0.4,0.16],[0.41,0.1681],[0.42,0.1764],[0.43,0.1849],[0.44,0.1936],[0.45,0.2025],[0.46,0.2116],[0.47,0.2209],[0.48,0.2304],[0.49,0.2401],[0.5,0.25],[0.51,0.2601],[0.52,0.2704],[0.53,0.2809],[0.54,0.2916],[0.55,0.3025],[0.56,0.3136],[0.57,0.3249],[0.58,0.3364],[0.59,0.3481],[0.6,0.36],[0.61,0.3721],[0.62,0.3844],[0.63,0.3969],[0.64,0.4096],[0.65,0.4225],[0.66,0.4356],[0.67,0.4489],[0.68,0.4624],[0.69,0.4761],[0.7,0.49],[0.71,0.5041],[0.72,0.5184],[0.73,0.5329],[0.74,0.5476],[0.75,0.5625],[0.76,0.5776],[0.77,0.5929],[0.78,0.6084],[0.79,0.6241],[0.8,0.64],[0.81,0.6561],[0.82,0.6724],[0.83,0.6889],[0.84,0.7056],[0.85,0.7225],[0.86,0.7396],[0.87,0.7569],[0.88,0.7744],[0.89,0.7921],[0.9,0.81],[0.91,0.8281],[0.92,0.8464],[0.93,0.8649],[0.94,0.8836],[0.95,0.9025],[0.96,0.9216],[0.97,0.9409],[0.98,0.9604],[0.99,0.9801],[1.0,1.0]],"c":"force2","w":2.6},{"t":"text","p":[648.0,34.0],"s":"AA: p²","c":"force2","size":12,"a":"start"},{"t":"plot","o":[80,250],"sx":560,"sy":220,"pts":[[0.0,0.0],[0.01,0.0198],[0.02,0.0392],[0.03,0.0582],[0.04,0.0768],[0.05,0.095],[0.06,0.1128],[0.07,0.1302],[0.08,0.1472],[0.09,0.1638],[0.1,0.18],[0.11,0.1958],[0.12,0.2112],[0.13,0.2262],[0.14,0.2408],[0.15,0.255],[0.16,0.2688],[0.17,0.2822],[0.18,0.2952],[0.19,0.3078],[0.2,0.32],[0.21,0.3318],[0.22,0.3432],[0.23,0.3542],[0.24,0.3648],[0.25,0.375],[0.26,0.3848],[0.27,0.3942],[0.28,0.4032],[0.29,0.4118],[0.3,0.42],[0.31,0.4278],[0.32,0.4352],[0.33,0.4422],[0.34,0.4488],[0.35,0.455],[0.36,0.4608],[0.37,0.4662],[0.38,0.4712],[0.39,0.4758],[0.4,0.48],[0.41,0.4838],[0.42,0.4872],[0.43,0.4902],[0.44,0.4928],[0.45,0.495],[0.46,0.4968],[0.47,0.4982],[0.48,0.4992],[0.49,0.4998],[0.5,0.5],[0.51,0.4998],[0.52,0.4992],[0.53,0.4982],[0.54,0.4968],[0.55,0.495],[0.56,0.4928],[0.57,0.4902],[0.58,0.4872],[0.59,0.4838],[0.6,0.48],[0.61,0.4758],[0.62,0.4712],[0.63,0.4662],[0.64,0.4608],[0.65,0.455],[0.66,0.4488],[0.67,0.4422],[0.68,0.4352],[0.69,0.4278],[0.7,0.42],[0.71,0.4118],[0.72,0.4032],[0.73,0.3942],[0.74,0.3848],[0.75,0.375],[0.76,0.3648],[0.77,0.3542],[0.78,0.3432],[0.79,0.3318],[0.8,0.32],[0.81,0.3078],[0.82,0.2952],[0.83,0.2822],[0.84,0.2688],[0.85,0.255],[0.86,0.2408],[0.87,0.2262],[0.88,0.2112],[0.89,0.1958],[0.9,0.18],[0.91,0.1638],[0.92,0.1472],[0.93,0.1302],[0.94,0.1128],[0.95,0.095],[0.96,0.0768],[0.97,0.0582],[0.98,0.0392],[0.99,0.0198],[1.0,0.0]],"c":"force4","w":2.6},{"t":"text","p":[370.0,130.0],"s":"Aa: 2pq","c":"force4","size":12,"a":"start"},{"t":"plot","o":[80,250],"sx":560,"sy":220,"pts":[[0.0,1.0],[0.01,0.9801],[0.02,0.9604],[0.03,0.9409],[0.04,0.9216],[0.05,0.9025],[0.06,0.8836],[0.07,0.8649],[0.08,0.8464],[0.09,0.8281],[0.1,0.81],[0.11,0.7921],[0.12,0.7744],[0.13,0.7569],[0.14,0.7396],[0.15,0.7225],[0.16,0.7056],[0.17,0.6889],[0.18,0.6724],[0.19,0.6561],[0.2,0.64],[0.21,0.6241],[0.22,0.6084],[0.23,0.5929],[0.24,0.5776],[0.25,0.5625],[0.26,0.5476],[0.27,0.5329],[0.28,0.5184],[0.29,0.5041],[0.3,0.49],[0.31,0.4761],[0.32,0.4624],[0.33,0.4489],[0.34,0.4356],[0.35,0.4225],[0.36,0.4096],[0.37,0.3969],[0.38,0.3844],[0.39,0.3721],[0.4,0.36],[0.41,0.3481],[0.42,0.3364],[0.43,0.3249],[0.44,0.3136],[0.45,0.3025],[0.46,0.2916],[0.47,0.2809],[0.48,0.2704],[0.49,0.2601],[0.5,0.25],[0.51,0.2401],[0.52,0.2304],[0.53,0.2209],[0.54,0.2116],[0.55,0.2025],[0.56,0.1936],[0.57,0.1849],[0.58,0.1764],[0.59,0.1681],[0.6,0.16],[0.61,0.1521],[0.62,0.1444],[0.63,0.1369],[0.64,0.1296],[0.65,0.1225],[0.66,0.1156],[0.67,0.1089],[0.68,0.1024],[0.69,0.0961],[0.7,0.09],[0.71,0.0841],[0.72,0.0784],[0.73,0.0729],[0.74,0.0676],[0.75,0.0625],[0.76,0.0576],[0.77,0.0529],[0.78,0.0484],[0.79,0.0441],[0.8,0.04],[0.81,0.0361],[0.82,0.0324],[0.83,0.0289],[0.84,0.0256],[0.85,0.0225],[0.86,0.0196],[0.87,0.0169],[0.88,0.0144],[0.89,0.0121],[0.9,0.01],[0.91,0.0081],[0.92,0.0064],[0.93,0.0049],[0.94,0.0036],[0.95,0.0025],[0.96,0.0016],[0.97,0.0009],[0.98,0.0004],[0.99,0.0001],[1.0,0.0]],"c":"force3","w":2.6},{"t":"text","p":[90.0,22.0],"s":"aa: q²","c":"force3","size":12,"a":"start"}]}
---
Frequenze dei tre genotipi in una popolazione in equilibrio di Hardy-Weinberg, in funzione della frequenza $p$ dell'allele $A$. Quando un allele è raro, si trova quasi solo negli eterozigoti.
:::

L'equilibrio ha due conseguenze importanti. La prima è che l'ereditarietà mendeliana, da sola, conserva la variabilità: un allele recessivo non scompare perché non si vede. La seconda è che un allele raro si trova quasi tutto negli eterozigoti. Se un carattere recessivo compare in un individuo su diecimila, $q^2=10^{-4}$ e $q=0{,}01$; i portatori eterozigoti sono $2pq\simeq0{,}02$, uno su cinquanta, duecento volte più numerosi degli individui che mostrano il carattere.

L'equilibrio di Hardy-Weinberg ha il ruolo che in meccanica ha il moto rettilineo uniforme: descrive che cosa succede quando nulla agisce, e gli scostamenti rivelano che qualcosa agisce. Le popolazioni reali lo rispettano spesso con buona approssimazione per i geni che non influiscono sulla scelta del partner e sulla sopravvivenza. Le forze che lo alterano sono quattro: la **mutazione**, che crea nuovi alleli; la **migrazione**, che porta alleli da altre popolazioni; la **deriva genetica**, le fluttuazioni casuali dovute al numero finito di individui, trattata nel capitolo [Deriva genetica](unit:biology-14); e la **selezione naturale**.

## Fitness e selezione {#selezione}

La **fitness** di un genotipo è il suo successo riproduttivo medio: il numero di discendenti che un individuo con quel genotipo lascia alla generazione successiva, tenendo conto della sopravvivenza e della fertilità. Ciò che conta per l'evoluzione è la **fitness relativa**, il rapporto fra la fitness di un genotipo e quella di un genotipo di riferimento. Se una variante lascia in media $1{,}2$ discendenti per ogni discendente della variante di riferimento, ha fitness relativa $1{,}2$ e **coefficiente di selezione** $s=0{,}2$.

Il caso più semplice è quello di organismi aploidi, come i batteri, o di replicatori come le molecole di RNA del capitolo [Il mondo a RNA](unit:biology-10), in cui ogni individuo porta una sola copia del gene. Si consideri una popolazione con due varianti: la variante $A$, con frequenza $p$ e fitness relativa $1+s$, e la variante di riferimento, con frequenza $1-p$ e fitness $1$.

::: legge Selezione su due varianti aploidi
Dopo una generazione la frequenza della variante $A$ diventa

$$p'=\frac{p\,(1+s)}{1+sp}.$$

Il numeratore è il contributo della variante $A$ alla generazione successiva; il denominatore, $p(1+s)+(1-p)=1+sp$, è la fitness media della popolazione.
:::

La formula si ricava contando i discendenti. Su $N$ individui, la variante $A$ ne ha $pN$, che lasciano $pN(1+s)$ discendenti; l'altra ne ha $(1-p)N$, che lasciano $(1-p)N$ discendenti. La nuova frequenza è il rapporto fra i discendenti di $A$ e il totale. Con $p=0{,}5$ e $s=0{,}2$ si ottiene $p'=0{,}6/1{,}1\simeq0{,}545$: in una sola generazione la frequenza cresce di quasi cinque punti percentuali. Con $s=0$ la frequenza resta la stessa, con $s<0$ diminuisce (figura 4).

::: figura mappa
{"w":720,"h":285,"items":[{"t":"axes","o":[80,250],"x":[600,"frequenza prima p"],"y":[240,"frequenza dopo p′"],"sx":400,"sy":220,"xt":[[0,"0"],[0.25,"0,25"],[0.5,"0,5"],[0.75,"0,75"],[1.0,"1,0"]],"yt":[[0,"0"],[0.25,"0,25"],[0.5,"0,5"],[0.75,"0,75"],[1.0,"1,0"]]},{"t":"plot","o":[80,250],"sx":400,"sy":220,"pts":[[0.0,0.0],[0.01,0.019802],[0.02,0.0392157],[0.03,0.0582524],[0.04,0.0769231],[0.05,0.0952381],[0.06,0.1132075],[0.07,0.1308411],[0.08,0.1481481],[0.09,0.1651376],[0.1,0.1818182],[0.11,0.1981982],[0.12,0.2142857],[0.13,0.2300885],[0.14,0.245614],[0.15,0.2608696],[0.16,0.2758621],[0.17,0.2905983],[0.18,0.3050847],[0.19,0.3193277],[0.2,0.3333333],[0.21,0.3471074],[0.22,0.3606557],[0.23,0.3739837],[0.24,0.3870968],[0.25,0.4],[0.26,0.4126984],[0.27,0.4251969],[0.28,0.4375],[0.29,0.4496124],[0.3,0.4615385],[0.31,0.4732824],[0.32,0.4848485],[0.33,0.4962406],[0.34,0.5074627],[0.35,0.5185185],[0.36,0.5294118],[0.37,0.540146],[0.38,0.5507246],[0.39,0.5611511],[0.4,0.5714286],[0.41,0.5815603],[0.42,0.5915493],[0.43,0.6013986],[0.44,0.6111111],[0.45,0.6206897],[0.46,0.630137],[0.47,0.6394558],[0.48,0.6486486],[0.49,0.6577181],[0.5,0.6666667],[0.51,0.6754967],[0.52,0.6842105],[0.53,0.6928105],[0.54,0.7012987],[0.55,0.7096774],[0.56,0.7179487],[0.57,0.7261146],[0.58,0.7341772],[0.59,0.7421384],[0.6,0.75],[0.61,0.757764],[0.62,0.7654321],[0.63,0.7730061],[0.64,0.7804878],[0.65,0.7878788],[0.66,0.7951807],[0.67,0.8023952],[0.68,0.8095238],[0.69,0.816568],[0.7,0.8235294],[0.71,0.8304094],[0.72,0.8372093],[0.73,0.8439306],[0.74,0.8505747],[0.75,0.8571429],[0.76,0.8636364],[0.77,0.8700565],[0.78,0.8764045],[0.79,0.8826816],[0.8,0.8888889],[0.81,0.8950276],[0.82,0.9010989],[0.83,0.9071038],[0.84,0.9130435],[0.85,0.9189189],[0.86,0.9247312],[0.87,0.9304813],[0.88,0.9361702],[0.89,0.9417989],[0.9,0.9473684],[0.91,0.9528796],[0.92,0.9583333],[0.93,0.9637306],[0.94,0.9690722],[0.95,0.974359],[0.96,0.9795918],[0.97,0.9847716],[0.98,0.989899],[0.99,0.9949749],[1.0,1.0]],"c":"force","w":2.4},{"t":"plot","o":[80,250],"sx":400,"sy":220,"pts":[[0.0,0.0],[0.01,0.011976],[0.02,0.0239044],[0.03,0.0357853],[0.04,0.047619],[0.05,0.0594059],[0.06,0.0711462],[0.07,0.0828402],[0.08,0.0944882],[0.09,0.1060904],[0.1,0.1176471],[0.11,0.1291585],[0.12,0.140625],[0.13,0.1520468],[0.14,0.1634241],[0.15,0.1747573],[0.16,0.1860465],[0.17,0.1972921],[0.18,0.2084942],[0.19,0.2196532],[0.2,0.2307692],[0.21,0.2418426],[0.22,0.2528736],[0.23,0.2638623],[0.24,0.2748092],[0.25,0.2857143],[0.26,0.2965779],[0.27,0.3074004],[0.28,0.3181818],[0.29,0.3289225],[0.3,0.3396226],[0.31,0.3502825],[0.32,0.3609023],[0.33,0.3714822],[0.34,0.3820225],[0.35,0.3925234],[0.36,0.4029851],[0.37,0.4134078],[0.38,0.4237918],[0.39,0.4341373],[0.4,0.4444444],[0.41,0.4547135],[0.42,0.4649446],[0.43,0.4751381],[0.44,0.4852941],[0.45,0.4954128],[0.46,0.5054945],[0.47,0.5155393],[0.48,0.5255474],[0.49,0.5355191],[0.5,0.5454545],[0.51,0.5553539],[0.52,0.5652174],[0.53,0.5750452],[0.54,0.5848375],[0.55,0.5945946],[0.56,0.6043165],[0.57,0.6140036],[0.58,0.6236559],[0.59,0.6332737],[0.6,0.6428571],[0.61,0.6524064],[0.62,0.6619217],[0.63,0.6714032],[0.64,0.6808511],[0.65,0.6902655],[0.66,0.6996466],[0.67,0.7089947],[0.68,0.7183099],[0.69,0.7275923],[0.7,0.7368421],[0.71,0.7460595],[0.72,0.7552448],[0.73,0.7643979],[0.74,0.7735192],[0.75,0.7826087],[0.76,0.7916667],[0.77,0.8006932],[0.78,0.8096886],[0.79,0.8186528],[0.8,0.8275862],[0.81,0.8364888],[0.82,0.8453608],[0.83,0.8542024],[0.84,0.8630137],[0.85,0.8717949],[0.86,0.8805461],[0.87,0.8892675],[0.88,0.8979592],[0.89,0.9066214],[0.9,0.9152542],[0.91,0.9238579],[0.92,0.9324324],[0.93,0.9409781],[0.94,0.9494949],[0.95,0.9579832],[0.96,0.966443],[0.97,0.9748744],[0.98,0.9832776],[0.99,0.9916528],[1.0,1.0]],"c":"force2","w":2.4},{"t":"plot","o":[80,250],"sx":400,"sy":220,"pts":[[0.0,0.0],[0.01,0.01],[0.02,0.02],[0.03,0.03],[0.04,0.04],[0.05,0.05],[0.06,0.06],[0.07,0.07],[0.08,0.08],[0.09,0.09],[0.1,0.1],[0.11,0.11],[0.12,0.12],[0.13,0.13],[0.14,0.14],[0.15,0.15],[0.16,0.16],[0.17,0.17],[0.18,0.18],[0.19,0.19],[0.2,0.2],[0.21,0.21],[0.22,0.22],[0.23,0.23],[0.24,0.24],[0.25,0.25],[0.26,0.26],[0.27,0.27],[0.28,0.28],[0.29,0.29],[0.3,0.3],[0.31,0.31],[0.32,0.32],[0.33,0.33],[0.34,0.34],[0.35,0.35],[0.36,0.36],[0.37,0.37],[0.38,0.38],[0.39,0.39],[0.4,0.4],[0.41,0.41],[0.42,0.42],[0.43,0.43],[0.44,0.44],[0.45,0.45],[0.46,0.46],[0.47,0.47],[0.48,0.48],[0.49,0.49],[0.5,0.5],[0.51,0.51],[0.52,0.52],[0.53,0.53],[0.54,0.54],[0.55,0.55],[0.56,0.56],[0.57,0.57],[0.58,0.58],[0.59,0.59],[0.6,0.6],[0.61,0.61],[0.62,0.62],[0.63,0.63],[0.64,0.64],[0.65,0.65],[0.66,0.66],[0.67,0.67],[0.68,0.68],[0.69,0.69],[0.7,0.7],[0.71,0.71],[0.72,0.72],[0.73,0.73],[0.74,0.74],[0.75,0.75],[0.76,0.76],[0.77,0.77],[0.78,0.78],[0.79,0.79],[0.8,0.8],[0.81,0.81],[0.82,0.82],[0.83,0.83],[0.84,0.84],[0.85,0.85],[0.86,0.86],[0.87,0.87],[0.88,0.88],[0.89,0.89],[0.9,0.9],[0.91,0.91],[0.92,0.92],[0.93,0.93],[0.94,0.94],[0.95,0.95],[0.96,0.96],[0.97,0.97],[0.98,0.98],[0.99,0.99],[1.0,1.0]],"c":"muted","w":1.4,"dash":true},{"t":"plot","o":[80,250],"sx":400,"sy":220,"pts":[[0.0,0.0],[0.01,0.0050251],[0.02,0.010101],[0.03,0.0152284],[0.04,0.0204082],[0.05,0.025641],[0.06,0.0309278],[0.07,0.0362694],[0.08,0.0416667],[0.09,0.0471204],[0.1,0.0526316],[0.11,0.0582011],[0.12,0.0638298],[0.13,0.0695187],[0.14,0.0752688],[0.15,0.0810811],[0.16,0.0869565],[0.17,0.0928962],[0.18,0.0989011],[0.19,0.1049724],[0.2,0.1111111],[0.21,0.1173184],[0.22,0.1235955],[0.23,0.1299435],[0.24,0.1363636],[0.25,0.1428571],[0.26,0.1494253],[0.27,0.1560694],[0.28,0.1627907],[0.29,0.1695906],[0.3,0.1764706],[0.31,0.183432],[0.32,0.1904762],[0.33,0.1976048],[0.34,0.2048193],[0.35,0.2121212],[0.36,0.2195122],[0.37,0.2269939],[0.38,0.2345679],[0.39,0.242236],[0.4,0.25],[0.41,0.2578616],[0.42,0.2658228],[0.43,0.2738854],[0.44,0.2820513],[0.45,0.2903226],[0.46,0.2987013],[0.47,0.3071895],[0.48,0.3157895],[0.49,0.3245033],[0.5,0.3333333],[0.51,0.3422819],[0.52,0.3513514],[0.53,0.3605442],[0.54,0.369863],[0.55,0.3793103],[0.56,0.3888889],[0.57,0.3986014],[0.58,0.4084507],[0.59,0.4184397],[0.6,0.4285714],[0.61,0.4388489],[0.62,0.4492754],[0.63,0.459854],[0.64,0.4705882],[0.65,0.4814815],[0.66,0.4925373],[0.67,0.5037594],[0.68,0.5151515],[0.69,0.5267176],[0.7,0.5384615],[0.71,0.5503876],[0.72,0.5625],[0.73,0.5748031],[0.74,0.5873016],[0.75,0.6],[0.76,0.6129032],[0.77,0.6260163],[0.78,0.6393443],[0.79,0.6528926],[0.8,0.6666667],[0.81,0.6806723],[0.82,0.6949153],[0.83,0.7094017],[0.84,0.7241379],[0.85,0.7391304],[0.86,0.754386],[0.87,0.7699115],[0.88,0.7857143],[0.89,0.8018018],[0.9,0.8181818],[0.91,0.8348624],[0.92,0.8518519],[0.93,0.8691589],[0.94,0.8867925],[0.95,0.9047619],[0.96,0.9230769],[0.97,0.9417476],[0.98,0.9607843],[0.99,0.980198],[1.0,1.0]],"c":"force4","w":2.4},{"t":"text","p":[170.0,154.0],"s":"s = 1","c":"force","size":11,"a":"end"},{"t":"text","p":[370.0,69.8],"s":"s = 0,2","c":"force2","size":11,"a":"end"},{"t":"text","p":[330.0,169.7],"s":"s = −0,5","c":"force4","size":11,"a":"start"},{"t":"text","p":[412.0,94.0],"s":"s = 0","c":"muted","size":11,"a":"start"}]}
---
Frequenza dopo una generazione di selezione in funzione della frequenza prima, per diversi coefficienti di selezione. La diagonale corrisponde a $s=0$; le curve sopra la diagonale indicano una variante favorita, quelle sotto una variante sfavorita. Gli estremi $p=0$ e $p=1$ restano fissi: la selezione non crea varianti nuove.
:::

Ripetendo la formula generazione dopo generazione si ottiene la traiettoria completa. C'è un modo elegante di scriverla. Il rapporto fra le frequenze delle due varianti, $p/(1-p)$, che i matematici chiamano probabilità a favore, viene moltiplicato a ogni generazione esattamente per $1+s$:

$$\frac{p'}{1-p'}=(1+s)\,\frac{p}{1-p}.$$

Dopo $t$ generazioni il rapporto è moltiplicato per $(1+s)^t$, una crescita geometrica come quella dei replicatori del capitolo sul mondo a RNA. Il tempo necessario per passare da una frequenza $p_0$ a una frequenza $p_1$ è quindi

$$t=\frac{\ln\dfrac{p_1}{1-p_1}-\ln\dfrac{p_0}{1-p_0}}{\ln(1+s)}.$$

::: esempio Da raro a comune
Una variante con $s=0{,}1$ passa dall'$1\%$ al $99\%$ della popolazione in

$$t=\frac{\ln99-\ln(1/99)}{\ln1{,}1}=\frac{2\ln99}{\ln1{,}1}\simeq96$$

generazioni. Con $s=0{,}01$, un vantaggio difficilissimo da misurare in un singolo individuo, servono circa $920$ generazioni: per un batterio che si divide ogni ora, poco più di un mese.
:::

La traiettoria ha la forma di una S (figura 5). Quando la variante è rara cresce quasi geometricamente, di un fattore $1+s$ a ogni generazione; quando è comune rallenta, perché c'è sempre meno della variante sfavorita da sostituire. È la stessa curva logistica che descrive la crescita di una popolazione con risorse limitate.

::: figura traiettorie
{"w":800,"h":285,"items":[{"t":"axes","o":[80,250],"x":[660,"generazioni"],"y":[240,"frequenza della variante"],"sx":2.6,"sy":220,"xt":[[0,"0"],[50,"50"],[100,"100"],[150,"150"],[200,"200"]],"yt":[[0,"0"],[0.25,"0,25"],[0.5,"0,5"],[0.75,"0,75"],[1.0,"1,0"]]},{"t":"plot","o":[80,250],"sx":2.6,"sy":220,"pts":[[0,0.01],[1,0.0149254],[2,0.0222222],[3,0.032967],[4,0.0486486],[5,0.0712401],[6,0.1031847],[7,0.1471835],[8,0.2056417],[9,0.2797033],[10,0.3680785],[11,0.4663003],[12,0.5672062],[13,0.6628289],[14,0.7467573],[15,0.815606],[16,0.86902],[17,0.9086936],[18,0.9372183],[19,0.9572509],[20,0.9710886],[21,0.9805382],[22,0.9869407],[23,0.9912558],[24,0.9941535],[25,0.9960947],[26,0.9973931],[27,0.9982605],[28,0.9988397],[29,0.9992262],[30,0.999484],[31,0.9996559],[32,0.9997706],[33,0.999847],[34,0.999898],[35,0.999932],[36,0.9999547],[37,0.9999698],[38,0.9999799],[39,0.9999866],[40,0.999991],[41,0.999994],[42,0.999996],[43,0.9999973],[44,0.9999982],[45,0.9999988],[46,0.9999992],[47,0.9999995],[48,0.9999997],[49,0.9999998],[50,0.9999998],[51,0.9999999],[52,0.9999999],[53,1.0],[54,1.0],[55,1.0],[56,1.0],[57,1.0],[58,1.0],[59,1.0],[60,1.0],[61,1.0],[62,1.0],[63,1.0],[64,1.0],[65,1.0],[66,1.0],[67,1.0],[68,1.0],[69,1.0],[70,1.0],[71,1.0],[72,1.0],[73,1.0],[74,1.0],[75,1.0],[76,1.0],[77,1.0],[78,1.0],[79,1.0],[80,1.0],[81,1.0],[82,1.0],[83,1.0],[84,1.0],[85,1.0],[86,1.0],[87,1.0],[88,1.0],[89,1.0],[90,1.0],[91,1.0],[92,1.0],[93,1.0],[94,1.0],[95,1.0],[96,1.0],[97,1.0],[98,1.0],[99,1.0],[100,1.0],[101,1.0],[102,1.0],[103,1.0],[104,1.0],[105,1.0],[106,1.0],[107,1.0],[108,1.0],[109,1.0],[110,1.0],[111,1.0],[112,1.0],[113,1.0],[114,1.0],[115,1.0],[116,1.0],[117,1.0],[118,1.0],[119,1.0],[120,1.0],[121,1.0],[122,1.0],[123,1.0],[124,1.0],[125,1.0],[126,1.0],[127,1.0],[128,1.0],[129,1.0],[130,1.0],[131,1.0],[132,1.0],[133,1.0],[134,1.0],[135,1.0],[136,1.0],[137,1.0],[138,1.0],[139,1.0],[140,1.0],[141,1.0],[142,1.0],[143,1.0],[144,1.0],[145,1.0],[146,1.0],[147,1.0],[148,1.0],[149,1.0],[150,1.0],[151,1.0],[152,1.0],[153,1.0],[154,1.0],[155,1.0],[156,1.0],[157,1.0],[158,1.0],[159,1.0],[160,1.0],[161,1.0],[162,1.0],[163,1.0],[164,1.0],[165,1.0],[166,1.0],[167,1.0],[168,1.0],[169,1.0],[170,1.0],[171,1.0],[172,1.0],[173,1.0],[174,1.0],[175,1.0],[176,1.0],[177,1.0],[178,1.0],[179,1.0],[180,1.0],[181,1.0],[182,1.0],[183,1.0],[184,1.0],[185,1.0],[186,1.0],[187,1.0],[188,1.0],[189,1.0],[190,1.0],[191,1.0],[192,1.0],[193,1.0],[194,1.0],[195,1.0],[196,1.0],[197,1.0],[198,1.0],[199,1.0],[200,1.0]],"c":"force","w":2.6},{"t":"text","p":[117.5,154.0],"s":"s = 0,5","c":"force","size":11,"a":"start"},{"t":"plot","o":[80,250],"sx":2.6,"sy":220,"pts":[[0,0.01],[1,0.010989],[2,0.0120746],[3,0.0132661],[4,0.0145734],[5,0.0160074],[6,0.01758],[7,0.019304],[8,0.0211935],[9,0.0232636],[10,0.0255305],[11,0.0280121],[12,0.0307272],[13,0.0336964],[14,0.0369415],[15,0.0404861],[16,0.0443552],[17,0.0485752],[18,0.0531745],[19,0.0581825],[20,0.0636306],[21,0.0695511],[22,0.0759777],[23,0.0829453],[24,0.0904893],[25,0.0986456],[26,0.1074502],[27,0.1169387],[28,0.1271457],[29,0.1381044],[30,0.1498454],[31,0.1623965],[32,0.1757815],[33,0.1900194],[34,0.2051236],[35,0.2211007],[36,0.2379497],[37,0.2556612],[38,0.2742167],[39,0.2935877],[40,0.3137355],[41,0.3346112],[42,0.3561549],[43,0.3782972],[44,0.4009587],[45,0.4240519],[46,0.4474815],[47,0.4711467],[48,0.4949424],[49,0.5187609],[50,0.5424945],[51,0.5660368],[52,0.5892848],[53,0.6121407],[54,0.6345136],[55,0.6563206],[56,0.6774877],[57,0.6979512],[58,0.7176573],[59,0.736563],[60,0.7546357],[61,0.7718525],[62,0.7882003],[63,0.8036747],[64,0.8182791],[65,0.8320242],[66,0.8449267],[67,0.8570084],[68,0.8682956],[69,0.8788178],[70,0.8886072],[71,0.8976979],[72,0.906125],[73,0.9139245],[74,0.9211324],[75,0.9277844],[76,0.9339156],[77,0.9395602],[78,0.9447512],[79,0.9495202],[80,0.9538977],[81,0.9579125],[82,0.9615916],[83,0.964961],[84,0.9680445],[85,0.9708649],[86,0.9734433],[87,0.9757991],[88,0.9779506],[89,0.9799149],[90,0.9817074],[91,0.9833427],[92,0.984834],[93,0.9861937],[94,0.987433],[95,0.9885624],[96,0.9895914],[97,0.9905287],[98,0.9913823],[99,0.9921596],[100,0.9928672],[101,0.9935115],[102,0.9940978],[103,0.9946315],[104,0.9951172],[105,0.9955591],[106,0.9959612],[107,0.996327],[108,0.9966598],[109,0.9969625],[110,0.9972379],[111,0.9974884],[112,0.9977162],[113,0.9979234],[114,0.9981118],[115,0.9982832],[116,0.998439],[117,0.9985807],[118,0.9987096],[119,0.9988267],[120,0.9989333],[121,0.9990302],[122,0.9991183],[123,0.9991983],[124,0.9992712],[125,0.9993374],[126,0.9993976],[127,0.9994523],[128,0.9995021],[129,0.9995473],[130,0.9995885],[131,0.9996259],[132,0.9996599],[133,0.9996908],[134,0.9997189],[135,0.9997444],[136,0.9997677],[137,0.9997888],[138,0.999808],[139,0.9998254],[140,0.9998413],[141,0.9998557],[142,0.9998688],[143,0.9998808],[144,0.9998916],[145,0.9999015],[146,0.9999104],[147,0.9999186],[148,0.999926],[149,0.9999327],[150,0.9999388],[151,0.9999444],[152,0.9999494],[153,0.999954],[154,0.9999582],[155,0.999962],[156,0.9999655],[157,0.9999686],[158,0.9999715],[159,0.999974],[160,0.9999764],[161,0.9999786],[162,0.9999805],[163,0.9999823],[164,0.9999839],[165,0.9999854],[166,0.9999867],[167,0.9999879],[168,0.999989],[169,0.99999],[170,0.9999909],[171,0.9999917],[172,0.9999925],[173,0.9999932],[174,0.9999938],[175,0.9999944],[176,0.9999949],[177,0.9999953],[178,0.9999958],[179,0.9999961],[180,0.9999965],[181,0.9999968],[182,0.9999971],[183,0.9999974],[184,0.9999976],[185,0.9999978],[186,0.999998],[187,0.9999982],[188,0.9999984],[189,0.9999985],[190,0.9999986],[191,0.9999988],[192,0.9999989],[193,0.999999],[194,0.9999991],[195,0.9999992],[196,0.9999992],[197,0.9999993],[198,0.9999994],[199,0.9999994],[200,0.9999995]],"c":"force2","w":2.6},{"t":"text","p":[213.4,154.0],"s":"s = 0,1","c":"force2","size":11,"a":"start"},{"t":"plot","o":[80,250],"sx":2.6,"sy":220,"pts":[[0,0.01],[1,0.010099],[2,0.010199],[3,0.0102999],[4,0.0104018],[5,0.0105047],[6,0.0106087],[7,0.0107136],[8,0.0108196],[9,0.0109266],[10,0.0110347],[11,0.0111438],[12,0.011254],[13,0.0113652],[14,0.0114776],[15,0.011591],[16,0.0117056],[17,0.0118213],[18,0.0119381],[19,0.012056],[20,0.0121751],[21,0.0122953],[22,0.0124168],[23,0.0125394],[24,0.0126632],[25,0.0127882],[26,0.0129144],[27,0.0130419],[28,0.0131706],[29,0.0133005],[30,0.0134318],[31,0.0135643],[32,0.013698],[33,0.0138331],[34,0.0139695],[35,0.0141073],[36,0.0142463],[37,0.0143867],[38,0.0145285],[39,0.0146717],[40,0.0148162],[41,0.0149622],[42,0.0151095],[43,0.0152583],[44,0.0154085],[45,0.0155602],[46,0.0157134],[47,0.015868],[48,0.0160242],[49,0.0161818],[50,0.016341],[51,0.0165017],[52,0.016664],[53,0.0168278],[54,0.0169932],[55,0.0171602],[56,0.0173289],[57,0.0174991],[58,0.017671],[59,0.0178446],[60,0.0180198],[61,0.0181967],[62,0.0183753],[63,0.0185557],[64,0.0187378],[65,0.0189216],[66,0.0191072],[67,0.0192946],[68,0.0194838],[69,0.0196748],[70,0.0198676],[71,0.0200623],[72,0.0202589],[73,0.0204573],[74,0.0206577],[75,0.0208599],[76,0.0210641],[77,0.0212703],[78,0.0214784],[79,0.0216885],[80,0.0219007],[81,0.0221148],[82,0.0223311],[83,0.0225493],[84,0.0227697],[85,0.0229922],[86,0.0232167],[87,0.0234435],[88,0.0236723],[89,0.0239034],[90,0.0241367],[91,0.0243722],[92,0.0246099],[93,0.0248499],[94,0.0250921],[95,0.0253367],[96,0.0255836],[97,0.0258328],[98,0.0260844],[99,0.0263384],[100,0.0265947],[101,0.0268536],[102,0.0271148],[103,0.0273785],[104,0.0276447],[105,0.0279135],[106,0.0281847],[107,0.0284586],[108,0.028735],[109,0.029014],[110,0.0292956],[111,0.0295799],[112,0.0298669],[113,0.0301566],[114,0.0304489],[115,0.0307441],[116,0.031042],[117,0.0313427],[118,0.0316462],[119,0.0319525],[120,0.0322617],[121,0.0325738],[122,0.0328889],[123,0.0332068],[124,0.0335278],[125,0.0338517],[126,0.0341786],[127,0.0345086],[128,0.0348417],[129,0.0351778],[130,0.0355171],[131,0.0358596],[132,0.0362052],[133,0.036554],[134,0.036906],[135,0.0372614],[136,0.03762],[137,0.0379819],[138,0.0383471],[139,0.0387157],[140,0.0390878],[141,0.0394632],[142,0.0398421],[143,0.0402245],[144,0.0406104],[145,0.0409999],[146,0.0413929],[147,0.0417895],[148,0.0421898],[149,0.0425937],[150,0.0430014],[151,0.0434127],[152,0.0438278],[153,0.0442467],[154,0.0446694],[155,0.0450959],[156,0.0455264],[157,0.0459607],[158,0.046399],[159,0.0468412],[160,0.0472875],[161,0.0477378],[162,0.0481922],[163,0.0486507],[164,0.0491133],[165,0.0495801],[166,0.050051],[167,0.0505263],[168,0.0510058],[169,0.0514895],[170,0.0519777],[171,0.0524702],[172,0.0529671],[173,0.0534684],[174,0.0539743],[175,0.0544846],[176,0.0549995],[177,0.0555189],[178,0.056043],[179,0.0565717],[180,0.0571052],[181,0.0576433],[182,0.0581862],[183,0.0587339],[184,0.0592864],[185,0.0598438],[186,0.0604061],[187,0.0609733],[188,0.0615455],[189,0.0621227],[190,0.062705],[191,0.0632924],[192,0.0638848],[193,0.0644825],[194,0.0650854],[195,0.0656935],[196,0.0663068],[197,0.0669255],[198,0.0675496],[199,0.068179],[200,0.0688139]],"c":"force3","w":2.6},{"t":"text","p":[608.0,238.9],"s":"s = 0,01","c":"force3","size":11,"a":"start"}]}
---
Frequenza di una variante favorita in funzione del numero di generazioni, partendo dall'$1\%$, per tre coefficienti di selezione. Tutte le curve hanno forma a S; il tempo di diffusione è inversamente proporzionale, con buona approssimazione, al coefficiente di selezione.
:::

## La selezione nei diploidi {#diploidi}

Negli organismi diploidi la selezione agisce sui genotipi, e il suo effetto sulle frequenze alleliche dipende dalla dominanza. Un allele vantaggioso dominante si diffonde in fretta quando è raro, perché si manifesta già negli eterozigoti, ma fatica a eliminare del tutto l'allele recessivo, che si nasconde negli eterozigoti. Un allele vantaggioso recessivo, al contrario, si diffonde lentissimamente finché è raro, perché quasi tutte le sue copie sono negli eterozigoti, dove non si vede.

Un caso istruttivo è il **vantaggio dell'eterozigote**. Il gene della catena beta dell'emoglobina ha un allele, $S$, che negli omozigoti $SS$ causa l'anemia falciforme, una malattia grave che senza cure riduce molto la sopravvivenza. Gli eterozigoti $AS$ stanno quasi sempre bene e sono più resistenti alla forma più grave di malaria, causata dal parassita *Plasmodium falciparum*, rispetto agli omozigoti $AA$. Nelle regioni in cui la malaria è diffusa la fitness dei tre genotipi si può scrivere come $1-s_1$ per $AA$, $1$ per $AS$ e $1-s_2$ per $SS$. In queste condizioni la selezione conserva entrambi gli alleli, e la frequenza di $S$ tende a un valore di equilibrio

$$q^\ast=\frac{s_1}{s_1+s_2},$$

in cui le perdite dovute alla malaria negli omozigoti $AA$ bilanciano quelle dovute all'anemia negli omozigoti $SS$ (figura 6).

::: figura falciforme
{"w":800,"h":285,"items":[{"t":"axes","o":[80,250],"x":[660,"generazioni"],"y":[240,"frequenza q dell’allele S"],"sx":5.6,"sy":440,"xt":[[0,"0"],[20,"20"],[40,"40"],[60,"60"],[80,"80"],[100,"100"]],"yt":[[0,"0"],[0.1,"0,1"],[0.2,"0,2"],[0.3,"0,3"],[0.4,"0,4"],[0.5,"0,5"]]},{"t":"line","p":[80.0,201.1,640.0,201.1],"c":"muted","w":1.2,"dash":true},{"t":"text","p":[648.0,205.1],"s":"q* ≈ 0,11","c":"muted","size":11,"a":"start"},{"t":"plot","o":[80,250],"sx":5.6,"sy":440,"pts":[[0,0.5],[1,0.3870968],[2,0.3171545],[3,0.271147],[4,0.2390945],[5,0.2157164],[6,0.1980438],[7,0.1843027],[8,0.1733758],[9,0.1645272],[10,0.1572537],[11,0.1512005],[12,0.1461102],[13,0.1417916],[14,0.1381003],[15,0.1349247],[16,0.1321776],[17,0.1297895],[18,0.1277049],[19,0.1258785],[20,0.124273],[21,0.1228579],[22,0.1216073],[23,0.1204996],[24,0.1195167],[25,0.1186429],[26,0.1178649],[27,0.1171712],[28,0.1165519],[29,0.1159985],[30,0.1155035],[31,0.1150602],[32,0.114663],[33,0.1143068],[34,0.1139872],[35,0.1137003],[36,0.1134425],[37,0.1132109],[38,0.1130027],[39,0.1128154],[40,0.1126469],[41,0.1124953],[42,0.1123588],[43,0.1122358],[44,0.1121251],[45,0.1120254],[46,0.1119356],[47,0.1118546],[48,0.1117817],[49,0.1117159],[50,0.1116566],[51,0.1116032],[52,0.111555],[53,0.1115115],[54,0.1114723],[55,0.111437],[56,0.1114051],[57,0.1113764],[58,0.1113504],[59,0.111327],[60,0.1113059],[61,0.1112869],[62,0.1112697],[63,0.1112542],[64,0.1112403],[65,0.1112276],[66,0.1112163],[67,0.111206],[68,0.1111967],[69,0.1111884],[70,0.1111808],[71,0.111174],[72,0.1111679],[73,0.1111623],[74,0.1111573],[75,0.1111528],[76,0.1111488],[77,0.1111451],[78,0.1111418],[79,0.1111388],[80,0.1111361],[81,0.1111336],[82,0.1111314],[83,0.1111295],[84,0.1111277],[85,0.1111261],[86,0.1111246],[87,0.1111233],[88,0.1111221],[89,0.111121],[90,0.1111201],[91,0.1111192],[92,0.1111184],[93,0.1111177],[94,0.111117],[95,0.1111165],[96,0.1111159],[97,0.1111155],[98,0.111115],[99,0.1111147],[100,0.1111143]],"c":"force","w":2.6},{"t":"text","p":[96.0,36.0],"s":"q₀ = 0,5","c":"force","size":11,"a":"start"},{"t":"plot","o":[80,250],"sx":5.6,"sy":440,"pts":[[0,0.01],[1,0.0109989],[2,0.0120854],[3,0.0132647],[4,0.0145418],[5,0.0159215],[6,0.0174081],[7,0.0190052],[8,0.0207158],[9,0.022542],[10,0.0244848],[11,0.0265439],[12,0.0287177],[13,0.0310032],[14,0.0333957],[15,0.0358886],[16,0.0384741],[17,0.0411423],[18,0.0438822],[19,0.046681],[20,0.0495249],[21,0.0523993],[22,0.0552889],[23,0.0581779],[24,0.0610509],[25,0.0638926],[26,0.0666884],[27,0.069425],[28,0.0720898],[29,0.0746721],[30,0.0771625],[31,0.0795532],[32,0.081838],[33,0.0840126],[34,0.0860741],[35,0.0880208],[36,0.0898527],[37,0.0915707],[38,0.093177],[39,0.0946743],[40,0.0960664],[41,0.0973572],[42,0.0985513],[43,0.0996537],[44,0.1006693],[45,0.1016032],[46,0.1024606],[47,0.1032465],[48,0.1039658],[49,0.1046233],[50,0.1052237],[51,0.1057713],[52,0.1062702],[53,0.1067244],[54,0.1071375],[55,0.107513],[56,0.107854],[57,0.1081636],[58,0.1084445],[59,0.1086991],[60,0.10893],[61,0.1091391],[62,0.1093285],[63,0.1095],[64,0.1096552],[65,0.1097956],[66,0.1099226],[67,0.1100374],[68,0.1101413],[69,0.1102352],[70,0.1103201],[71,0.1103968],[72,0.1104661],[73,0.1105287],[74,0.1105852],[75,0.1106363],[76,0.1106825],[77,0.1107242],[78,0.1107618],[79,0.1107958],[80,0.1108265],[81,0.1108542],[82,0.1108792],[83,0.1109018],[84,0.1109222],[85,0.1109406],[86,0.1109572],[87,0.1109722],[88,0.1109857],[89,0.1109979],[90,0.111009],[91,0.1110189],[92,0.1110279],[93,0.111036],[94,0.1110433],[95,0.11105],[96,0.1110559],[97,0.1110613],[98,0.1110662],[99,0.1110705],[100,0.1110745]],"c":"force2","w":2.6},{"t":"text","p":[96.0,261.6],"s":"q₀ = 0,01","c":"force2","size":11,"a":"start"}]}
---
Frequenza dell'allele $S$ nel corso delle generazioni, partendo da $0{,}5$ e da $0{,}01$, con $s_1=0{,}1$ e $s_2=0{,}8$. Da sopra e da sotto, la popolazione tende alla frequenza di equilibrio $q^\ast\simeq0{,}11$.
:::

Con $s_1=0{,}1$ e $s_2=0{,}8$ la frequenza di equilibrio è $0{,}1/0{,}9\simeq0{,}11$. In alcune popolazioni dell'Africa subsahariana la frequenza dell'allele $S$ supera il $15\%$, e la sua distribuzione geografica coincide con quella storica della malaria. Il caso mostra che la selezione naturale ottimizza la fitness media della popolazione nelle condizioni locali, e che un allele dannoso in un ambiente può essere mantenuto da un vantaggio in un altro contesto.

## La selezione osservata {#osservata}

La selezione naturale si osserva anche mentre avviene, oltre che nelle ricostruzioni del passato. L'esempio più citato è quello della falena delle betulle, *Biston betularia*. Fino alla metà dell'Ottocento quasi tutte le falene inglesi di questa specie erano chiare, con piccole macchie scure, e si mimetizzavano sui tronchi coperti di licheni. Nel 1848 a Manchester fu catturata una forma quasi nera, chiamata *carbonaria*. Con la rivoluzione industriale la fuliggine uccise i licheni e annerì i tronchi, e la forma scura si diffuse: nel 1895 costituiva circa il $98\%$ delle falene della zona di Manchester. Dopo le leggi contro l'inquinamento dell'aria degli anni Cinquanta del Novecento la tendenza si è invertita, e oggi la forma scura è di nuovo rara.

La spiegazione proposta già alla fine dell'Ottocento, la predazione da parte degli uccelli che vedono meglio le falene in contrasto con lo sfondo, fu verificata negli anni Cinquanta da Bernard Kettlewell con esperimenti di rilascio e ricattura. Alcune critiche ai suoi metodi furono superate da un grande esperimento condotto da Michael Majerus fra il 2001 e il 2007, pubblicato dopo la sua morte, che confermò una predazione maggiore sulle falene più visibili. Nel 2016 la mutazione responsabile della forma scura è stata identificata: è l'inserzione di un trasposone in un gene che regola lo sviluppo delle ali, avvenuta con ogni probabilità attorno al 1819, pochi decenni prima della prima cattura.

Altri esempi sono altrettanto chiari. Dopo la siccità del 1977 sull'isola di Daphne Major, nelle Galápagos, Peter e Rosemary Grant osservarono che i fringuelli sopravvissuti avevano in media becchi più grandi, adatti ad aprire i semi duri rimasti, e che la differenza si trasmetteva alla generazione successiva. Ogni ospedale vede ogni giorno la selezione di batteri resistenti agli antibiotici: in una popolazione di miliardi di batteri qualche mutante resistente esiste quasi sempre, come mostrava l'esperimento di Luria e Delbrück, e l'antibiotico elimina gli altri. E le popolazioni di *Escherichia coli* coltivate dal gruppo di Richard Lenski da oltre trentacinque anni hanno aumentato continuamente la loro velocità di crescita nel terreno di laboratorio, con un andamento che ancora non mostra un limite.

## La selezione in laboratorio {#laboratorio}

La selezione funziona su qualunque sistema in cui ci siano variazione, ereditarietà e differenze di successo riproduttivo, e i laboratori la usano come strumento. Il capitolo [Il mondo a RNA](unit:biology-10) ha descritto la selezione di molecole di RNA in provetta. Con lo stesso principio Frances Arnold, dagli anni Novanta, ha fatto evolvere enzimi proteici: si introducono mutazioni casuali nel gene di un enzima, si misurano le varianti ottenute e si usano le migliori come punto di partenza del ciclo successivo. In pochi cicli si ottengono enzimi capaci di lavorare in solventi organici, a temperature elevate o su reazioni che nessun enzima naturale catalizza. Arnold ha ricevuto il premio Nobel per la chimica nel 2018, insieme a George Smith e Gregory Winter, che avevano applicato la selezione agli anticorpi e ai peptidi esposti sulla superficie di virus batterici.

L'**evoluzione diretta** mostra due proprietà della selezione che valgono anche in natura. La prima è che la selezione lavora sulla variazione disponibile: non crea mutazioni, sceglie fra quelle presenti. La seconda è che procede per piccoli passi, ciascuno dei quali deve essere vantaggioso o almeno neutro; una funzione che richiede più mutazioni simultanee, ciascuna inutile da sola, è difficile da raggiungere. La comparsa della capacità di usare il citrato in una delle popolazioni di Lenski, dopo circa trentunomila generazioni, ha richiesto proprio una sequenza di mutazioni preparatorie, ed è avvenuta in una sola delle dodici popolazioni.

## La selezione come definizione della vita {#definizione}

Che cosa distingue un sistema vivo da un sistema chimico complesso? Nel capitolo [Che cos'è la vita](unit:biology-01) si è visto che nessuna definizione è pienamente soddisfacente. Quella proposta da Gerald Joyce e adottata in molti programmi di astrobiologia della NASA mette al centro l'evoluzione darwiniana: la vita è un sistema chimico che si mantiene da sé ed è capace di evoluzione darwiniana. La scelta ha una ragione profonda. Variazione, ereditarietà e selezione sono le condizioni minime perché un sistema accumuli informazione sul proprio ambiente e diventi più complesso nel tempo; un sistema che le soddisfa produrrà prima o poi adattamenti, comunque sia fatto chimicamente.

Per la ricerca di vita altrove la definizione ha due conseguenze. La prima è pratica: è difficile riconoscere l'evoluzione darwiniana in un campione raccolto da un rover, che mostra lo stato di un sistema in un istante. Le missioni cercano quindi segni indiretti, come le molecole complesse prodotte in abbondanza con una forte selettività, discusse nel capitolo [Biofirme e falsi positivi](unit:biology-33). La seconda è teorica: la matematica della selezione non dipende dalla chimica. Le formule di questo capitolo varrebbero per organismi di silicio, per molecole di un polimero diverso dal DNA o per replicatori in un oceano di metano, purché esistano copie, errori e differenze di successo.

## Un'esperienza: la caccia ai fagioli {#esperienza}

La selezione si può simulare con un gioco di predazione, che mostra la crescita della frequenza di una variante mimetica e permette di stimare il coefficiente di selezione.

::: metodo Prede mimetiche
**Materiale.** Un telo o un foglio di carta da regalo con un disegno fitto e colorato, di circa un metro per un metro; cento fagioli bianchi e cento fagioli di un colore simile a quello del disegno, per esempio borlotti; un cronometro; una tabella con le colonne «generazione», «bianchi», «colorati» e «frequenza dei colorati».

**Procedura.** Si spargono sul telo cinquanta fagioli bianchi e cinquanta colorati. Un compagno, il predatore, ha quindici secondi per raccogliere uno alla volta, con una mano sola, quanti più fagioli può. Si contano i sopravvissuti di ciascun colore; ogni sopravvissuto si riproduce, cioè si aggiunge sul telo un altro fagiolo del suo colore, e si mescola. Si ripete per cinque generazioni, cambiando predatore a ogni turno, e si registra la frequenza dei fagioli colorati.

**Analisi.** Per ogni generazione calcolare il rapporto fra i sopravvissuti colorati e quelli bianchi, e stimare la fitness relativa dei colorati dividendo questo rapporto per quello della generazione precedente. Confrontare la frequenza osservata con la previsione $p'=p(1+s)/(1+sp)$, usando la stima media di $s$. Discutere perché i risultati di un singolo gruppo sono irregolari e che cosa succederebbe su un telo bianco.
:::

Il gioco riproduce l'essenziale della selezione: una differenza ereditabile, il colore, e una differenza di sopravvivenza che dipende dall'ambiente, il telo. I risultati fluttuano perché le popolazioni sono piccole, un effetto che il prossimo capitolo descrive come deriva genetica.

## Errori frequenti {#errori}

::: errore Pensare che la selezione crei le varianti di cui c'è bisogno
La selezione sceglie fra le varianti già prodotte dalle mutazioni e dalla ricombinazione. Se una variante utile non esiste, la selezione non può farla comparire.
:::

::: errore Credere che un allele dominante debba diventare il più frequente
La dominanza riguarda il modo in cui gli alleli si manifestano nell'eterozigote, e le frequenze dipendono dalla selezione, dalla deriva e dalla storia della popolazione. Molti alleli dominanti sono rari.
:::

::: errore Considerare l'equilibrio di Hardy-Weinberg una legge che le popolazioni rispettano sempre
È un modello di riferimento valido sotto ipotesi precise: popolazione grande, accoppiamento casuale, assenza di selezione, mutazione e migrazione. Gli scostamenti dall'equilibrio sono proprio i segnali che qualcosa agisce sulla popolazione.
:::

::: errore Confondere fitness e forza fisica
La fitness è il successo riproduttivo relativo in un ambiente dato. Una falena scura ha fitness maggiore su un tronco annerito e minore su un tronco chiaro, senza essere più forte.
:::

::: errore Aspettarsi che un piccolo vantaggio abbia effetti trascurabili
Un vantaggio dell'$1\%$ porta una variante dall'$1\%$ al $99\%$ in circa novecento generazioni, un tempo brevissimo per un microrganismo e breve anche su scala geologica per un animale.
:::

## Sintesi {#sintesi}

::: sintesi In breve
- I caratteri si trasmettono attraverso coppie di alleli che si separano nei gameti; un incrocio fra eterozigoti dà fenotipi in rapporto $3:1$, e due geni indipendenti in rapporto $9:3:3:1$. Il test del chi quadrato confronta dati e previsioni.
- In una popolazione grande con accoppiamento casuale e senza forze evolutive le frequenze genotipiche sono $p^2$, $2pq$ e $q^2$ e restano costanti: è l'equilibrio di Hardy-Weinberg, il modello di riferimento.
- Mutazione, migrazione, deriva e selezione cambiano le frequenze alleliche.
- La fitness relativa misura il successo riproduttivo; con un vantaggio $s$ una variante aploide passa da $p$ a $p(1+s)/(1+sp)$, e il rapporto $p/(1-p)$ cresce di un fattore $1+s$ a ogni generazione.
- La diffusione di una variante favorita segue una curva a S; il tempo di diffusione è circa inversamente proporzionale a $s$.
- Nei diploidi l'effetto della selezione dipende dalla dominanza; il vantaggio dell'eterozigote mantiene due alleli in equilibrio, come per l'anemia falciforme nelle regioni malariche.
- La selezione si osserva in natura, dalle falene ai batteri resistenti, e si usa in laboratorio per far evolvere molecole; l'evoluzione darwiniana è al centro della definizione di vita usata in astrobiologia.
:::

## Glossario {#glossario}

- **Allele**: ciascuna delle forme alternative di un gene.
- **Coefficiente di selezione**: differenza fra la fitness relativa di una variante e quella della variante di riferimento.
- **Dominante**: allele che si manifesta anche quando è presente in una sola copia.
- **Eterozigote**: individuo con due alleli diversi di un gene.
- **Fenotipo**: insieme dei caratteri osservabili di un individuo.
- **Fitness relativa**: successo riproduttivo di un genotipo rispetto a quello di un genotipo di riferimento.
- **Frequenza allelica**: frazione degli alleli di un gene, in una popolazione, che appartengono a una data forma.
- **Genotipo**: insieme degli alleli di un individuo per uno o più geni.
- **Hardy-Weinberg**: equilibrio delle frequenze genotipiche $p^2$, $2pq$, $q^2$ in una popolazione senza forze evolutive.
- **Omozigote**: individuo con due alleli uguali di un gene.
- **Recessivo**: allele che si manifesta solo quando è presente in due copie.
- **Selezione naturale**: maggiore successo riproduttivo delle varianti ereditabili più adatte all'ambiente.
- **Vantaggio dell'eterozigote**: fitness dell'eterozigote maggiore di quella di entrambi gli omozigoti.

## Esercizi {#esercizi}

::: esercizio Un incrocio fra eterozigoti [base]
Due piante di pisello $Rr$ vengono incrociate e producono $400$ semi. Quanti semi lisci e quanti rugosi ci si aspetta? E da un incrocio $Rr\times rr$?
>>> soluzione
Dall'incrocio $Rr\times Rr$ si attendono tre quarti di semi lisci e un quarto di rugosi: $300$ e $100$. Dall'incrocio $Rr\times rr$ metà dei discendenti è $Rr$ e metà $rr$: $200$ lisci e $200$ rugosi. Il secondo incrocio, con un omozigote recessivo, rivela il genotipo di una pianta dal fenotipo dominante.
:::

::: esercizio I rapporti di Mendel [base]
Calcolare i rapporti fra semi lisci e rugosi, $5474$ e $1850$, e fra semi gialli e verdi, $6022$ e $2001$, nella seconda generazione di Mendel. Che rapporto prevede la legge della segregazione?
>>> soluzione
I rapporti sono $5474/1850\simeq2{,}96$ e $6022/2001\simeq3{,}01$, entrambi vicini al valore $3$ previsto per un carattere dominante su uno recessivo.
:::

::: esercizio Contare gli alleli [base]
In una popolazione di $1000$ individui ci sono $490$ omozigoti $AA$, $420$ eterozigoti e $90$ omozigoti $aa$. Calcolare le frequenze alleliche e verificare se la popolazione è in equilibrio di Hardy-Weinberg.
>>> soluzione
Gli alleli $A$ sono $2\cdot490+420=1400$ su $2000$: $p=0{,}7$ e $q=0{,}3$. Le frequenze attese sono $p^2=0{,}49$, $2pq=0{,}42$ e $q^2=0{,}09$, uguali a quelle osservate: la popolazione è in equilibrio.
:::

::: esercizio Portatori nascosti [base]
Un carattere recessivo compare in un neonato su $2500$. Supponendo l'equilibrio di Hardy-Weinberg, quale frazione della popolazione porta l'allele senza manifestarlo?
>>> soluzione
Si ha $q^2=1/2500$ e $q=0{,}02$; i portatori eterozigoti sono $2pq=2\cdot0{,}98\cdot0{,}02\simeq0{,}039$, circa uno su venticinque, cento volte più numerosi degli individui che mostrano il carattere.
:::

::: esercizio Una generazione di selezione [base]
Una variante aploide con $s=0{,}2$ ha frequenza $0{,}5$. Quale frequenza ha dopo una generazione? E se partisse da $0{,}25$?
>>> soluzione
Da $0{,}5$: $p'=0{,}6/1{,}1\simeq0{,}545$. Da $0{,}25$:

$$\begin{aligned}p'&=\frac{0{,}25\cdot1{,}2}{1+0{,}2\cdot0{,}25}\\&=\frac{0{,}3}{1{,}05}\simeq0{,}286.\end{aligned}$$
:::

::: esercizio Misurare un vantaggio [base]
In una coltura la frequenza di una variante passa da $0{,}4$ a $0{,}5$ in una generazione. Stimare il coefficiente di selezione.
>>> soluzione
Il rapporto $p/(1-p)$ passa da $0{,}4/0{,}6\simeq0{,}667$ a $0{,}5/0{,}5=1$, cioè aumenta di un fattore $1{,}5$. Quindi $1+s=1{,}5$ e $s=0{,}5$.
:::

::: esercizio Il chi quadrato di Mendel [medio]
Calcolare il chi quadrato per i conteggi $315$, $108$, $101$ e $32$ dell'incrocio fra due caratteri, confrontati con il rapporto $9:3:3:1$. Il valore critico al $5\%$ con tre gradi di libertà è $7{,}81$: il modello va respinto?
>>> soluzione
I valori attesi su $556$ semi sono $312{,}75$, $104{,}25$, $104{,}25$ e $34{,}75$. I contributi sono $0{,}016$, $0{,}135$, $0{,}101$ e $0{,}218$, e la somma è

$$\chi^2\simeq0{,}47,$$

molto sotto $7{,}81$: il modello non va respinto, e l'accordo è anzi ottimo.
:::

::: esercizio Tempi di diffusione [medio]
Quante generazioni servono a una variante aploide per passare dall'$1\%$ al $99\%$ con $s=0{,}5$, $s=0{,}1$ e $s=0{,}01$?
>>> soluzione
Il numeratore è $2\ln99\simeq9{,}19$. Si ottengono

$$\begin{aligned}\frac{9{,}19}{\ln1{,}5}&\simeq23,\\\frac{9{,}19}{\ln1{,}1}&\simeq96,\\\frac{9{,}19}{\ln1{,}01}&\simeq924\end{aligned}$$

generazioni.
:::

::: esercizio La falena di Manchester [medio]
Si supponga che la forma scura della falena delle betulle avesse frequenza $1\%$ nel 1848 e $98\%$ nel 1895, con una generazione all'anno, e la si tratti come una variante aploide. Quale coefficiente di selezione costante spiegherebbe il cambiamento?
>>> soluzione
Il rapporto $p/(1-p)$ passa da $1/99$ a $98/2=49$, e il logaritmo aumenta di

$$\ln49+\ln99\simeq3{,}89+4{,}60=8{,}49$$

in $47$ generazioni. Quindi $\ln(1+s)\simeq8{,}49/47\simeq0{,}181$ e $s\simeq0{,}20$. La stima dipende molto dalla frequenza iniziale, che non è nota con precisione, e il modello aploide è una semplificazione.
:::

::: esercizio Malaria e anemia [medio]
Con fitness $0{,}9$ per $AA$, $1$ per $AS$ e $0{,}2$ per $SS$, calcolare la frequenza di equilibrio dell'allele $S$ e, all'equilibrio di Hardy-Weinberg alla nascita, le frequenze degli omozigoti $SS$ e dei portatori.
>>> soluzione
Con $s_1=0{,}1$ e $s_2=0{,}8$, $q^\ast=0{,}1/0{,}9\simeq0{,}111$. Alla nascita gli omozigoti $SS$ sono $q^2\simeq0{,}012$, circa l'$1{,}2\%$, e i portatori $2pq\simeq2\cdot0{,}889\cdot0{,}111\simeq0{,}198$, circa uno su cinque.
:::

::: esercizio Dieci generazioni [medio]
Una variante aploide parte da $p_0=0{,}01$. Calcolare la sua frequenza dopo dieci generazioni con $s=0{,}1$ e con $s=0{,}5$.
>>> soluzione
Il rapporto iniziale è $0{,}01/0{,}99\simeq0{,}0101$. Con $s=0{,}1$ diventa $0{,}0101\cdot1{,}1^{10}\simeq0{,}0262$, e $p\simeq0{,}0262/1{,}0262\simeq0{,}026$. Con $s=0{,}5$ diventa $0{,}0101\cdot1{,}5^{10}\simeq0{,}582$, e $p\simeq0{,}582/1{,}582\simeq0{,}37$.
:::

::: esercizio Una variante sfavorita [medio]
Una variante con $s=-0{,}1$ parte da $p=0{,}5$. Quale frequenza ha dopo dieci generazioni?
>>> soluzione
Il rapporto $p/(1-p)$, inizialmente $1$, viene moltiplicato per $0{,}9^{10}\simeq0{,}349$. Quindi $p\simeq0{,}349/1{,}349\simeq0{,}26$.
:::

::: esercizio Quando la selezione è più rapida [avanzato]
Dalla formula $p'=p(1+s)/(1+sp)$ ricavare la variazione $\Delta p=p'-p$ in una generazione. Per quale frequenza è massima quando $s$ è piccolo? Calcolarla per $p=0{,}5$ e $s=0{,}2$.
>>> soluzione
Si ha

$$\begin{aligned}\Delta p&=\frac{p(1+s)-p(1+sp)}{1+sp}\\&=\frac{sp(1-p)}{1+sp}.\end{aligned}$$

Per $s$ piccolo il denominatore è circa $1$ e $\Delta p\simeq sp(1-p)$, massima per $p=0{,}5$. Con $s=0{,}2$ e $p=0{,}5$: $\Delta p=0{,}2\cdot0{,}25/1{,}1\simeq0{,}045$.
:::

::: esercizio Un vantaggio recessivo [avanzato]
In un organismo diploide l'omozigote $aa$ ha fitness $1+s$ e gli altri genotipi fitness $1$; per $s$ piccolo la variazione in una generazione è circa $\Delta q\simeq sq^2(1-q)$. Confrontare la velocità con quella di una variante aploide con lo stesso $s$ quando $q=0{,}01$ e $s=0{,}1$.
>>> soluzione
Nel diploide $\Delta q\simeq0{,}1\cdot10^{-4}\cdot0{,}99\simeq9{,}9\times10^{-6}$; nell'aploide $\Delta p\simeq sp(1-p)\simeq9{,}9\times10^{-4}$. L'allele recessivo raro cresce cento volte più lentamente, cioè di un fattore $q$, perché quasi tutte le sue copie sono negli eterozigoti, dove non si manifestano.
:::

::: esercizio L'equilibrio dell'eterozigote [avanzato]
Con fitness $1-s_1$, $1$ e $1-s_2$ per $AA$, $AS$ e $SS$, un allele $A$ si trova con probabilità $p$ in un $AA$ e $q$ in un $AS$; un allele $S$ con probabilità $p$ in un $AS$ e $q$ in un $SS$. Uguagliando le fitness medie dei due alleli, ricavare $q^\ast$. Calcolare la fitness media della popolazione all'equilibrio con $s_1=0{,}1$ e $s_2=0{,}8$.
>>> soluzione
La fitness media di $A$ è $p(1-s_1)+q$, quella di $S$ è $p+q(1-s_2)$. Uguagliandole si ottiene $ps_1=qs_2$, e con $p=1-q$

$$q^\ast=\frac{s_1}{s_1+s_2}.$$

La fitness media è $1-p^2s_1-q^2s_2$, che all'equilibrio vale

$$\begin{aligned}\bar w&=1-\frac{s_1s_2}{s_1+s_2}\\&=1-\frac{0{,}08}{0{,}9}\simeq0{,}911:\end{aligned}$$

circa il $9\%$ dei concepimenti va perso, per la malaria o per l'anemia.
:::

::: esercizio Il bilancio di un'evoluzione diretta [avanzato]
In un esperimento di evoluzione diretta ogni ciclo aumenta l'attività di un enzima del $30\%$, e in ogni ciclo si misurano mille varianti. Quanti cicli e quante misure servono per aumentare l'attività di cento volte?
>>> soluzione
Serve $1{,}3^n\ge100$, cioè

$$n\ge\frac{\ln100}{\ln1{,}3}\simeq17{,}6,$$

quindi $18$ cicli e circa $18\,000$ misure. Miglioramenti piccoli ma ripetuti producono cambiamenti grandi, come nella selezione naturale.
:::

## Fonti {#fonti}

Il testo, le figure, gli esempi e gli esercizi di questo capitolo sono originali. Per la scelta e l'ordine degli argomenti i riferimenti principali sono A. M. Shaw, *Astrochemistry: From Astronomy to Astrobiology*, Wiley, 2006, §1.3 (errori di copiatura, adattamento ed evoluzione), e J. R. Morris, D. L. Hartl, A. H. Knoll e collaboratori, *Biology: How Life Works*, 2ª edizione, Macmillan, 2016, §16.2 (fondamenti della genetica della trasmissione), §16.3 (la segregazione), §16.4 (l'assortimento indipendente), §21.3 (evoluzione ed equilibrio di Hardy-Weinberg), §21.4 (selezione naturale) e §21.5 (migrazione, mutazione e deriva). Dati ed esperimenti provengono dalle fonti primarie seguenti.

1. C. Darwin, A. R. Wallace, *Journal of the Proceedings of the Linnean Society, Zoology* 3, 45 (1858); C. Darwin, *On the Origin of Species*, John Murray, 1859.
2. G. Mendel, *Verhandlungen des naturforschenden Vereines in Brünn* 4, 3 (1866); R. A. Fisher, *Annals of Science* 1, 115 (1936).
3. M. K. Bhattacharyya e collaboratori, *Cell* 60, 115 (1990): il gene dei semi rugosi.
4. G. H. Hardy, *Science* 28, 49 (1908); W. Weinberg, *Jahreshefte des Vereins für vaterländische Naturkunde in Württemberg* 64, 368 (1908).
5. J. B. S. Haldane, *Transactions of the Cambridge Philosophical Society* 23, 19 (1924); R. A. Fisher, *The Genetical Theory of Natural Selection*, Clarendon Press, 1930; S. Wright, *Genetics* 16, 97 (1931).
6. A. C. Allison, *British Medical Journal* 1, 290 (1954); F. B. Piel e collaboratori, *Nature Communications* 1, 104 (2010): emoglobina falciforme e malaria.
7. L. M. Cook, B. S. Grant, I. J. Saccheri, J. Mallet, *Biology Letters* 8, 609 (2012); A. E. van't Hof e collaboratori, *Nature* 534, 102 (2016); L. M. Cook, J. R. G. Turner, *Biological Journal of the Linnean Society* 129, 765 (2020): la falena delle betulle.
8. P. T. Boag, P. R. Grant, *Science* 214, 82 (1981): i fringuelli di Daphne Major.
9. Z. D. Blount, C. Z. Borland, R. E. Lenski, *PNAS* 105, 7899 (2008); M. J. Wiser, N. Ribeck, R. E. Lenski, *Science* 342, 1364 (2013): evoluzione a lungo termine di *E. coli*.
10. F. H. Arnold, *Angewandte Chemie International Edition* 57, 4143 (2018): l'evoluzione diretta degli enzimi.
11. G. F. Joyce, prefazione a D. W. Deamer, G. R. Fleischaker (a cura di), *Origins of Life: The Central Concepts*, Jones and Bartlett, 1994: la definizione di vita.
