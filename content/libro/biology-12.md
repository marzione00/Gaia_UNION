---
unit: biology-12
titolo: Mutazioni e soglia d'errore
sottotitolo: Errori di copiatura, danni e riparazione del DNA, e la lunghezza massima di un genoma primitivo
volume: Volume di biologia
fonte: Testo originale; riferimenti principali A. M. Shaw, Astrochemistry, §1.3, 8.9; J. R. Morris et al., Biology: How Life Works, 2ª ed., §12.1, 14.1–14.4, 21.1
---

## Prima di cominciare {#apertura}

Ogni volta che una cellula copia il proprio DNA commette qualche errore, e ogni giorno il DNA di ciascuna cellula subisce migliaia di danni chimici. La maggior parte viene corretta; una piccola parte resta e diventa una **mutazione**, un cambiamento ereditabile della sequenza. Le mutazioni sono all'origine di molte malattie, ma senza di esse l'evoluzione sarebbe impossibile: ogni variazione su cui agisce la selezione naturale è cominciata come un errore.

La vita deve quindi trovare un compromesso. Copiare troppo male significa perdere l'informazione accumulata; copiare in modo perfetto significa rinunciare alla capacità di cambiare, e sarebbe comunque impossibile, perché ogni meccanismo di correzione ha un costo e un limite. Per i primi replicatori il compromesso era particolarmente difficile. Un ribozima polimerasi del mondo a RNA, come quelli descritti nel capitolo [Il mondo a RNA](unit:biology-10), sbaglia circa un nucleotide su cento. Con questa precisione, quanto lungo può essere un genoma? La risposta, formulata da Manfred Eigen nel 1971, si chiama **soglia d'errore**, e pone uno dei problemi più profondi dell'origine della vita.

Questo capitolo descrive i tipi di mutazione, le loro cause chimiche e fisiche e i sistemi che le cellule usano per ripararle. Introduce un modello di probabilità per il numero di errori in una copia, lo usa per ricavare la soglia d'errore, e confronta il risultato con i tassi di mutazione misurati nei virus, nei batteri e negli organismi pluricellulari. Discute infine il paradosso che la soglia pone ai primi replicatori, le soluzioni proposte e il ruolo delle mutazioni come sorgente di novità.

::: obiettivi
- classificare le mutazioni puntiformi, le inserzioni e le delezioni, e prevederne l'effetto su una proteina;
- descrivere le principali cause di danno al DNA e i sistemi di riparazione;
- calcolare la probabilità di almeno un errore in una copia con il modello $1-(1-\mu)^n$ e con l'approssimazione esponenziale;
- ricavare la soglia d'errore di Eigen e stimare la lunghezza massima di un genoma per una data precisione;
- confrontare i tassi di mutazione di virus, batteri e animali e spiegare la regola di Drake;
- discutere il paradosso di Eigen e le soluzioni proposte;
- descrivere l'esperimento di Luria e Delbrück e il ruolo delle mutazioni nell'evoluzione.
:::

Il capitolo usa la replicazione del DNA e il codice genetico del capitolo [DNA, codice genetico ed espressione](unit:biology-11), la crescita dei replicatori del capitolo [Il mondo a RNA](unit:biology-10) e la probabilità del capitolo [Combinatoria, probabilità e statistica](unit:math-c10).

## Che cosa cambia in una mutazione {#tipi}

La mutazione più semplice è la **sostituzione** di una base con un'altra. Si chiama **transizione** se una purina viene sostituita da un'altra purina, o una pirimidina da un'altra pirimidina, per esempio A al posto di G; **trasversione** se una purina viene sostituita da una pirimidina o viceversa. Le transizioni sono più frequenti, perché le basi coinvolte hanno forme simili e gli errori di appaiamento che le producono sono più facili.

L'effetto di una sostituzione dipende da dove cade e da come la legge il codice genetico (figura 1). Se cade in un codone e lo trasforma in un altro codone dello stesso amminoacido, la mutazione è **sinonima**, o silente, e la proteina resta identica; grazie alla ridondanza del codice accade spesso quando la sostituzione riguarda la terza base. Se cambia l'amminoacido, è una mutazione **di senso alterato**, e l'effetto va da nullo a grave secondo il ruolo dell'amminoacido nella proteina. Se trasforma un codone di un amminoacido in un codone di arresto, è una mutazione **nonsenso**, e la proteina risulta troncata.

::: figura tipi
{"w":760,"h":320,"items":[{"t":"text","p":[150,46],"s":"originale","c":"force2","size":12,"a":"end"},{"t":"rect","p":[170,26,80,28],"c":"body","r":4},{"t":"poly","pts":[[170,26],[250,26],[250,54],[170,54]],"close":true,"c":"force2","w":1.6},{"t":"text","p":[210.0,44.0],"s":"AUG","c":"force2","size":13},{"t":"text","p":[210,70],"s":"Met","c":"force2","size":11},{"t":"rect","p":[280,26,80,28],"c":"body","r":4},{"t":"poly","pts":[[280,26],[360,26],[360,54],[280,54]],"close":true,"c":"force2","w":1.6},{"t":"text","p":[320.0,44.0],"s":"GAG","c":"force2","size":13},{"t":"text","p":[320,70],"s":"Glu","c":"force2","size":11},{"t":"rect","p":[390,26,80,28],"c":"body","r":4},{"t":"poly","pts":[[390,26],[470,26],[470,54],[390,54]],"close":true,"c":"force2","w":1.6},{"t":"text","p":[430.0,44.0],"s":"AAA","c":"force2","size":13},{"t":"text","p":[430,70],"s":"Lys","c":"force2","size":11},{"t":"rect","p":[500,26,80,28],"c":"body","r":4},{"t":"poly","pts":[[500,26],[580,26],[580,54],[500,54]],"close":true,"c":"force2","w":1.6},{"t":"text","p":[540.0,44.0],"s":"UGG","c":"force2","size":13},{"t":"text","p":[540,70],"s":"Trp","c":"force2","size":11},{"t":"text","p":[150,104],"s":"sinonima","c":"force3","size":12,"a":"end"},{"t":"rect","p":[170,84,80,28],"c":"body","r":4},{"t":"poly","pts":[[170,84],[250,84],[250,112],[170,112]],"close":true,"c":"force2","w":1.6},{"t":"text","p":[210.0,102.0],"s":"AUG","c":"force2","size":13},{"t":"text","p":[210,128],"s":"Met","c":"force2","size":11},{"t":"rect","p":[280,84,80,28],"c":"body","r":4},{"t":"poly","pts":[[280,84],[360,84],[360,112],[280,112]],"close":true,"c":"force3","w":1.6},{"t":"text","p":[320.0,102.0],"s":"GAA","c":"force3","size":13},{"t":"text","p":[320,128],"s":"Glu","c":"force3","size":11},{"t":"rect","p":[390,84,80,28],"c":"body","r":4},{"t":"poly","pts":[[390,84],[470,84],[470,112],[390,112]],"close":true,"c":"force2","w":1.6},{"t":"text","p":[430.0,102.0],"s":"AAA","c":"force2","size":13},{"t":"text","p":[430,128],"s":"Lys","c":"force2","size":11},{"t":"rect","p":[500,84,80,28],"c":"body","r":4},{"t":"poly","pts":[[500,84],[580,84],[580,112],[500,112]],"close":true,"c":"force2","w":1.6},{"t":"text","p":[540.0,102.0],"s":"UGG","c":"force2","size":13},{"t":"text","p":[540,128],"s":"Trp","c":"force2","size":11},{"t":"text","p":[150,162],"s":"senso alterato","c":"force4","size":12,"a":"end"},{"t":"rect","p":[170,142,80,28],"c":"body","r":4},{"t":"poly","pts":[[170,142],[250,142],[250,170],[170,170]],"close":true,"c":"force2","w":1.6},{"t":"text","p":[210.0,160.0],"s":"AUG","c":"force2","size":13},{"t":"text","p":[210,186],"s":"Met","c":"force2","size":11},{"t":"rect","p":[280,142,80,28],"c":"body","r":4},{"t":"poly","pts":[[280,142],[360,142],[360,170],[280,170]],"close":true,"c":"force4","w":1.6},{"t":"text","p":[320.0,160.0],"s":"GUG","c":"force4","size":13},{"t":"text","p":[320,186],"s":"Val","c":"force4","size":11},{"t":"rect","p":[390,142,80,28],"c":"body","r":4},{"t":"poly","pts":[[390,142],[470,142],[470,170],[390,170]],"close":true,"c":"force2","w":1.6},{"t":"text","p":[430.0,160.0],"s":"AAA","c":"force2","size":13},{"t":"text","p":[430,186],"s":"Lys","c":"force2","size":11},{"t":"rect","p":[500,142,80,28],"c":"body","r":4},{"t":"poly","pts":[[500,142],[580,142],[580,170],[500,170]],"close":true,"c":"force2","w":1.6},{"t":"text","p":[540.0,160.0],"s":"UGG","c":"force2","size":13},{"t":"text","p":[540,186],"s":"Trp","c":"force2","size":11},{"t":"text","p":[150,220],"s":"nonsenso","c":"force","size":12,"a":"end"},{"t":"rect","p":[170,200,80,28],"c":"body","r":4},{"t":"poly","pts":[[170,200],[250,200],[250,228],[170,228]],"close":true,"c":"force2","w":1.6},{"t":"text","p":[210.0,218.0],"s":"AUG","c":"force2","size":13},{"t":"text","p":[210,244],"s":"Met","c":"force2","size":11},{"t":"rect","p":[280,200,80,28],"c":"body","r":4},{"t":"poly","pts":[[280,200],[360,200],[360,228],[280,228]],"close":true,"c":"force","w":1.6},{"t":"text","p":[320.0,218.0],"s":"UAG","c":"force","size":13},{"t":"text","p":[320,244],"s":"Stop","c":"force","size":11},{"t":"text","p":[150,278],"s":"inserzione","c":"force","size":12,"a":"end"},{"t":"rect","p":[170,258,80,28],"c":"body","r":4},{"t":"poly","pts":[[170,258],[250,258],[250,286],[170,286]],"close":true,"c":"force2","w":1.6},{"t":"text","p":[210.0,276.0],"s":"AUG","c":"force2","size":13},{"t":"text","p":[210,302],"s":"Met","c":"force2","size":11},{"t":"rect","p":[280,258,80,28],"c":"body","r":4},{"t":"poly","pts":[[280,258],[360,258],[360,286],[280,286]],"close":true,"c":"force","w":1.6},{"t":"text","p":[320.0,276.0],"s":"CGA","c":"force","size":13},{"t":"text","p":[320,302],"s":"Arg","c":"force","size":11},{"t":"rect","p":[390,258,80,28],"c":"body","r":4},{"t":"poly","pts":[[390,258],[470,258],[470,286],[390,286]],"close":true,"c":"force","w":1.6},{"t":"text","p":[430.0,276.0],"s":"GAA","c":"force","size":13},{"t":"text","p":[430,302],"s":"Glu","c":"force","size":11},{"t":"rect","p":[500,258,80,28],"c":"body","r":4},{"t":"poly","pts":[[500,258],[580,258],[580,286],[500,286]],"close":true,"c":"force","w":1.6},{"t":"text","p":[540.0,276.0],"s":"AUG","c":"force","size":13},{"t":"text","p":[540,302],"s":"Met","c":"force","size":11},{"t":"text","p":[610,278],"s":"… la cornice è spostata","c":"muted","size":11,"a":"start"}]}
---
Effetti di una mutazione su un breve tratto di gene. Una sostituzione nella terza base può lasciare invariato l'amminoacido; una sostituzione in un'altra posizione può cambiarlo o creare un codone di arresto; l'inserzione di una base sposta la cornice di lettura e cambia tutti i codoni successivi.
:::

Un esempio celebre di mutazione di senso alterato è quella dell'anemia falciforme: nel gene della catena beta dell'emoglobina il sesto codone, GAG, diventa GTG, e l'acido glutammico, carico e idrofilo, viene sostituito dalla valina, idrofobica. Le molecole di emoglobina mutata tendono ad aggregarsi in fibre quando cedono l'ossigeno, e i globuli rossi assumono la forma di falce. Una sola base su circa tre miliardi basta a causare la malattia.

Le **inserzioni** e le **delezioni** aggiungono o tolgono una o più basi. Se il numero di basi non è un multiplo di tre, spostano la cornice di lettura e alterano tutti i codoni successivi, come si è visto nel capitolo precedente; di solito la proteina risultante è inutile. Esistono infine mutazioni su grande scala: duplicazioni di interi geni, inversioni, traslocazioni di tratti di cromosoma, inserzioni di **trasposoni**, sequenze capaci di spostarsi da un punto all'altro del genoma. Le duplicazioni hanno un ruolo speciale nell'evoluzione. Una copia del gene continua a svolgere la funzione originale, mentre l'altra è libera di accumulare mutazioni e, talvolta, di acquistare una funzione nuova.

## Le cause delle mutazioni {#cause}

Una prima sorgente di mutazioni sono gli errori della replicazione: una polimerasi inserisce un nucleotide sbagliato, oppure scivola su una sequenza ripetuta e aggiunge o salta qualche base. Una seconda sorgente, altrettanto importante, sono i danni chimici spontanei. Il DNA è una molecola stabile solo in confronto all'RNA. In acqua, a temperatura corporea, il legame fra la base e lo zucchero si spezza di tanto in tanto e la catena perde una purina; la citosina perde il suo gruppo amminico e diventa uracile; le basi reagiscono con le forme reattive dell'ossigeno prodotte dalla respirazione, e la guanina diventa 8-ossoguanina, che si appaia per errore con l'adenina. Nel 1993 Tomas Lindahl stimò che in una cellula umana si perdono ogni giorno alcune migliaia di purine e che alcune centinaia di citosine si trasformano in uracile.

Agenti esterni aumentano il danno. La luce ultravioletta del Sole, nella banda fra circa $260$ e $320\un{nm}$, unisce due timine adiacenti della stessa catena in un **dimero**, che deforma l'elica e blocca le polimerasi. Le radiazioni ionizzanti, i raggi X, i raggi gamma e le particelle dei raggi cosmici, spezzano le catene, talvolta entrambe nello stesso punto, producendo rotture del doppio filamento, il danno più difficile da riparare. Molte sostanze chimiche, come alcuni componenti del fumo di tabacco, si legano alle basi e ne alterano l'appaiamento.

Per l'astrobiologia questi danni hanno un peso particolare. La superficie di Marte, priva di uno strato di ozono e di un campo magnetico globale, riceve sia l'ultravioletto solare sia i raggi cosmici. Il rivelatore di radiazione del rover Curiosity ha misurato sulla superficie una dose assorbita di circa $0{,}21\un{mGy}$ al giorno: in un milione di anni, per un organismo dormiente che non ripara il proprio DNA, la dose accumulata sarebbe di decine di migliaia di gray, molto oltre la resistenza dei microrganismi terrestri più robusti. Il tema ritorna nei capitoli [Marte: acqua e abitabilità passata](unit:biology-26) e [Estremofili](unit:biology-18).

## La riparazione del DNA {#riparazione}

Le cellule dispongono di molti sistemi di riparazione, e il loro studio è valso il premio Nobel per la chimica del 2015 a Tomas Lindahl, Paul Modrich e Aziz Sancar. Durante la replicazione la precisione è affidata a tre controlli in serie (figura 2). La polimerasi sceglie il nucleotide giusto con una frequenza di errore compresa fra $10^{-4}$ e $10^{-5}$; la sua attività di correttrice di bozze rimuove circa il $99\%$ degli errori appena commessi; il sistema di **riparazione degli appaiamenti scorretti**, che nei batteri comincia con una proteina chiamata MutS, riconosce le basi appaiate male dopo il passaggio della forcella, taglia il tratto della catena nuova che le contiene e lo fa ricostruire. Il risultato finale è un errore ogni $10^9$–$10^{10}$ nucleotidi.

::: figura correzione
{"w":720,"h":290,"items":[{"t":"rect","p":[120,151.0,90,99.0],"c":"force4","r":3},{"t":"text","p":[165,141.0],"s":"10⁻⁴–10⁻⁵","c":"force4","size":12},{"t":"text","p":[165,272],"s":"selezione del nucleotide","c":"ax","size":11},{"t":"rect","p":[310,107.0,90,143.0],"c":"force2","r":3},{"t":"text","p":[355,97.0],"s":"10⁻⁶–10⁻⁷","c":"force2","size":12},{"t":"text","p":[355,272],"s":"correzione di bozze","c":"ax","size":11},{"t":"rect","p":[500,41.0,90,209.0],"c":"force3","r":3},{"t":"text","p":[545,31.0],"s":"10⁻⁹–10⁻¹⁰","c":"force3","size":12},{"t":"text","p":[545,272],"s":"riparazione degli appaiamenti","c":"ax","size":11},{"t":"arrow","p":[80,250,80,20],"c":"ax","w":1.6,"head":9},{"t":"text","p":[88,24],"s":"errori per nucleotide (più in alto, meno errori)","c":"ax","size":11,"a":"start"},{"t":"line","p":[75,250,80,250],"c":"ax","w":1},{"t":"text","p":[70,254],"s":"1","c":"muted","size":10,"a":"end"},{"t":"line","p":[75,206,80,206],"c":"ax","w":1},{"t":"text","p":[70,210],"s":"10⁻²","c":"muted","size":10,"a":"end"},{"t":"line","p":[75,162,80,162],"c":"ax","w":1},{"t":"text","p":[70,166],"s":"10⁻⁴","c":"muted","size":10,"a":"end"},{"t":"line","p":[75,118,80,118],"c":"ax","w":1},{"t":"text","p":[70,122],"s":"10⁻⁶","c":"muted","size":10,"a":"end"},{"t":"line","p":[75,74,80,74],"c":"ax","w":1},{"t":"text","p":[70,78],"s":"10⁻⁸","c":"muted","size":10,"a":"end"},{"t":"line","p":[75,30,80,30],"c":"ax","w":1},{"t":"text","p":[70,34],"s":"10⁻¹⁰","c":"muted","size":10,"a":"end"},{"t":"line","p":[80,250,700,250],"c":"ax","w":1.2}]}
---
I tre controlli della precisione della replicazione, con la frequenza di errore per nucleotide dopo ciascun passaggio, in scala logaritmica. I valori sono ordini di grandezza tipici per i batteri e per le cellule eucariotiche.
:::

Altri sistemi riparano i danni che avvengono fuori dalla replicazione. La **riparazione per escissione di base** riconosce una base danneggiata o fuori posto, come un uracile nel DNA o un'8-ossoguanina, la stacca dallo zucchero e fa sostituire il nucleotide. La **riparazione per escissione di nucleotidi** riconosce le deformazioni dell'elica, come i dimeri di timina, e sostituisce un intero tratto di una dozzina di nucleotidi o più; nell'uomo il suo difetto causa lo xeroderma pigmentoso, una malattia rara in cui l'esposizione al Sole provoca tumori della pelle. Molti batteri, piante e animali possiedono anche un enzima, la fotoliasi, che usa l'energia della luce blu per rompere direttamente il legame fra le timine di un dimero. Le rotture del doppio filamento vengono riparate unendo le estremità, con il rischio di perdere qualche base, oppure copiando la sequenza mancante da una copia intatta del cromosoma, con la ricombinazione omologa.

L'importanza di questi sistemi si vede quando mancano. Difetti ereditari nei geni umani corrispondenti a MutS e alle proteine che collaborano con essa predispongono ad alcuni tumori del colon, perché gli errori di replicazione non corretti si accumulano. All'estremo opposto il batterio *Deinococcus radiodurans* sopravvive a dosi di radiazioni ionizzanti migliaia di volte superiori a quelle letali per l'uomo, ricostruendo in poche ore un genoma frammentato in centinaia di pezzi.

## Quanto si sbaglia {#tassi}

Il **tasso di mutazione** si misura come numero di mutazioni per nucleotide per replicazione, oppure per generazione. Varia di quasi otto ordini di grandezza fra i diversi gruppi di organismi.

| Gruppo | Genoma | Mutazioni per nucleotide |
|---|---|---|
| virus a RNA | $10^4$ nucleotidi | $10^{-6}$–$10^{-4}$ per replicazione |
| *E. coli* | $4{,}6\times10^6$ coppie | $2\times10^{-10}$ per generazione |
| uomo | $3{,}1\times10^9$ coppie per corredo | $1{,}2\times10^{-8}$ per generazione |

I virus a RNA hanno i tassi più alti, perché le loro polimerasi non hanno attività di correzione. Gli organismi cellulari copiano molto meglio. Nell'uomo una generazione comprende molte divisioni cellulari nella linea germinale, soprattutto in quella maschile, e il tasso per generazione corrisponde a circa sessanta-settanta mutazioni nuove in ogni figlio, il cui numero cresce con l'età del padre di circa due mutazioni all'anno.

Nel 1991 John Drake notò una regolarità sorprendente. Moltiplicando il tasso di mutazione per nucleotide per la lunghezza del genoma, si ottiene il numero di mutazioni per genoma per replicazione, e per i microrganismi a DNA, dai batteriofagi ai batteri e ai lieviti, questo numero è quasi costante, attorno a $0{,}003$, mentre la lunghezza dei genomi varia di migliaia di volte. Per i virus a RNA il numero per genoma è molto più alto, dell'ordine di $0{,}1$–$1$. Organismi con genomi più lunghi copiano quindi con maggiore precisione, come se la selezione mantenesse il numero di errori per copia entro un limite. Il modello che segue spiega da dove viene questo limite.

## La probabilità di un errore {#probabilita}

Si supponga che ogni sito di un genoma di $n$ siti venga copiato in modo sbagliato con la stessa probabilità $\mu$, indipendentemente dagli altri. La probabilità che un sito sia copiato correttamente è $1-\mu$, e quella che tutti gli $n$ siti siano corretti è il prodotto delle singole probabilità.

::: legge Probabilità di almeno un errore
La probabilità che una copia di $n$ siti sia perfetta è $(1-\mu)^n$, e quella che contenga almeno un errore è

$$P=1-(1-\mu)^n.$$

Per $\mu$ piccolo, $(1-\mu)^n\simeq\mathrm e^{-n\mu}$, e

$$P\simeq1-\mathrm e^{-n\mu}.$$

Il numero medio di errori per copia è $n\mu$, e il numero di errori segue con buona approssimazione una distribuzione di Poisson con questa media.
:::

L'approssimazione viene dal limite notevole $(1-\mu)^{1/\mu}\to\mathrm e^{-1}$ per $\mu\to0$, ed è eccellente quando $\mu$ è piccolo, anche se $n\mu$ non lo è. Il prodotto $n\mu$ decide tutto. Se è molto minore di $1$, quasi tutte le copie sono perfette; se vale $1$, una copia su $\mathrm e$, cioè circa il $37\%$, è perfetta; se è molto maggiore di $1$, quasi nessuna lo è (figura 3).

::: esempio Mille e diecimila siti
Con $\mu=10^{-4}$ e $n=1000$ il numero medio di errori è $0{,}1$, e la probabilità di almeno un errore è $1-\mathrm e^{-0{,}1}\simeq9{,}5\%$. Con $n=10\,000$ il numero medio è $1$, e la probabilità sale a $1-\mathrm e^{-1}\simeq63\%$. Per avere almeno un errore in metà delle copie servono $n=\ln2/\mu\simeq6900$ siti.
:::

::: figura probabilita
{"w":800,"h":285,"items":[{"t":"axes","o":[80,250],"x":[690,"siti copiati n"],"y":[240,"probabilità di almeno un errore"],"sx":0.052,"sy":220,"xt":[[0,"0"],[2000,"2.000"],[4000,"4.000"],[6000,"6.000"],[8000,"8.000"],[10000,"10.000"]],"yt":[[0,"0"],[0.2,"0,2"],[0.4,"0,4"],[0.6,"0,6"],[0.8,"0,8"],[1.0,"1,0"]]},{"t":"line","p":[80.0,110.9,600.0,110.9],"c":"muted","w":1,"dash":true},{"t":"text","p":[86.0,104.9],"s":"63%","c":"muted","size":10,"a":"start"},{"t":"plot","o":[80,250],"sx":0.052,"sy":220,"pts":[[0,0.0],[100,0.0952079],[200,0.1813512],[300,0.259293],[400,0.3298141],[500,0.3936211],[600,0.4513531],[700,0.5035886],[800,0.5508509],[900,0.5936134],[1000,0.6323046],[1100,0.6673121],[1200,0.6989866],[1300,0.7276454],[1400,0.7535757],[1500,0.7770372],[1600,0.798265],[1700,0.8174718],[1800,0.8348499],[1900,0.8505735],[2000,0.8648001],[2100,0.8776722],[2200,0.8893187],[2300,0.8998565],[2400,0.9093909],[2500,0.9180176],[2600,0.925823],[2700,0.9328852],[2800,0.9392751],[2900,0.9450566],[3000,0.9502876],[3100,0.9550206],[3200,0.959303],[3300,0.9631777],[3400,0.9666835],[3500,0.9698555],[3600,0.9727254],[3700,0.9753222],[3800,0.9776717],[3900,0.9797975],[4000,0.981721],[4100,0.9834613],[4200,0.9850359],[4300,0.9864606],[4400,0.9877497],[4500,0.988916],[4600,0.9899713],[4700,0.9909261],[4800,0.99179],[4900,0.9925717],[5000,0.9932789],[5100,0.9939188],[5200,0.9944978],[5300,0.9950216],[5400,0.9954956],[5500,0.9959245],[5600,0.9963125],[5700,0.9966636],[5800,0.9969812],[5900,0.9972686],[6000,0.9975287],[6100,0.997764],[6200,0.9979769],[6300,0.9981695],[6400,0.9983438],[6500,0.9985014],[6600,0.9986441],[6700,0.9987732],[6800,0.99889],[6900,0.9989957],[7000,0.9990913],[7100,0.9991778],[7200,0.9992561],[7300,0.9993269],[7400,0.999391],[7500,0.999449],[7600,0.9995014],[7700,0.9995489],[7800,0.9995919],[7900,0.9996307],[8000,0.9996659],[8100,0.9996977],[8200,0.9997265],[8300,0.9997525],[8400,0.9997761],[8500,0.9997974],[8600,0.9998167],[8700,0.9998341],[8800,0.9998499],[8900,0.9998642],[9000,0.9998771],[9100,0.9998888],[9200,0.9998994],[9300,0.999909],[9400,0.9999177],[9500,0.9999255],[9600,0.9999326],[9700,0.999939],[9800,0.9999448],[9900,0.9999501],[10000,0.9999548]],"c":"force","w":2.6},{"t":"text","p":[606.0,22.0],"s":"μ = 10⁻³","c":"force","size":11,"a":"start"},{"t":"plot","o":[80,250],"sx":0.052,"sy":220,"pts":[[0,0.0],[100,0.0099507],[200,0.0198023],[300,0.0295559],[400,0.0392125],[500,0.048773],[600,0.0582383],[700,0.0676094],[800,0.0768873],[900,0.0860729],[1000,0.0951671],[1100,0.1041708],[1200,0.1130849],[1300,0.1219103],[1400,0.1306479],[1500,0.1392985],[1600,0.147863],[1700,0.1563424],[1800,0.1647373],[1900,0.1730487],[2000,0.1812774],[2100,0.1894243],[2200,0.19749],[2300,0.2054755],[2400,0.2133816],[2500,0.221209],[2600,0.2289584],[2700,0.2366308],[2800,0.2442268],[2900,0.2517473],[3000,0.2591929],[3100,0.2665644],[3200,0.2738626],[3300,0.2810881],[3400,0.2882418],[3500,0.2953242],[3600,0.3023362],[3700,0.3092784],[3800,0.3161516],[3900,0.3229563],[4000,0.3296934],[4100,0.3363634],[4200,0.342967],[4300,0.3495049],[4400,0.3559777],[4500,0.3623862],[4600,0.3687309],[4700,0.3750124],[4800,0.3812315],[4900,0.3873886],[5000,0.3934845],[5100,0.3995197],[5200,0.4054949],[5300,0.4114106],[5400,0.4172675],[5500,0.4230661],[5600,0.4288069],[5700,0.4344907],[5800,0.4401179],[5900,0.4456891],[6000,0.4512048],[6100,0.4566657],[6200,0.4620722],[6300,0.467425],[6400,0.4727245],[6500,0.4779712],[6600,0.4831657],[6700,0.4883086],[6800,0.4934002],[6900,0.4984412],[7000,0.5034321],[7100,0.5083733],[7200,0.5132653],[7300,0.5181086],[7400,0.5229037],[7500,0.5276512],[7600,0.5323513],[7700,0.5370048],[7800,0.5416119],[7900,0.5461731],[8000,0.550689],[8100,0.55516],[8200,0.5595864],[8300,0.5639688],[8400,0.5683076],[8500,0.5726032],[8600,0.5768561],[8700,0.5810667],[8800,0.5852353],[8900,0.5893625],[9000,0.5934486],[9100,0.5974941],[9200,0.6014993],[9300,0.6054646],[9400,0.6093905],[9500,0.6132773],[9600,0.6171255],[9700,0.6209353],[9800,0.6247073],[9900,0.6284417],[10000,0.632139]],"c":"force2","w":2.6},{"t":"text","p":[606.0,114.9],"s":"μ = 10⁻⁴","c":"force2","size":11,"a":"start"},{"t":"plot","o":[80,250],"sx":0.052,"sy":220,"pts":[[0,0.0],[100,0.0009995],[200,0.001998],[300,0.0029955],[400,0.003992],[500,0.0049875],[600,0.0059821],[700,0.0069756],[800,0.0079681],[900,0.0089597],[1000,0.0099502],[1100,0.0109398],[1200,0.0119283],[1300,0.0129159],[1400,0.0139025],[1500,0.0148881],[1600,0.0158728],[1700,0.0168564],[1800,0.0178391],[1900,0.0188207],[2000,0.0198014],[2100,0.0207811],[2200,0.0217599],[2300,0.0227376],[2400,0.0237144],[2500,0.0246902],[2600,0.025665],[2700,0.0266389],[2800,0.0276118],[2900,0.0285837],[3000,0.0295546],[3100,0.0305246],[3200,0.0314936],[3300,0.0324616],[3400,0.0334287],[3500,0.0343948],[3600,0.0353599],[3700,0.036324],[3800,0.0372872],[3900,0.0382495],[4000,0.0392108],[4100,0.0401711],[4200,0.0411304],[4300,0.0420888],[4400,0.0430463],[4500,0.0440027],[4600,0.0449583],[4700,0.0459128],[4800,0.0468664],[4900,0.0478191],[5000,0.0487708],[5100,0.0497216],[5200,0.0506714],[5300,0.0516202],[5400,0.0525681],[5500,0.0535151],[5600,0.0544611],[5700,0.0554062],[5800,0.0563503],[5900,0.0572935],[6000,0.0582357],[6100,0.059177],[6200,0.0601174],[6300,0.0610568],[6400,0.0619953],[6500,0.0629328],[6600,0.0638694],[6700,0.0648051],[6800,0.0657398],[6900,0.0666736],[7000,0.0676065],[7100,0.0685384],[7200,0.0694694],[7300,0.0703995],[7400,0.0713286],[7500,0.0722569],[7600,0.0731841],[7700,0.0741105],[7800,0.0750359],[7900,0.0759604],[8000,0.076884],[8100,0.0778067],[8200,0.0787284],[8300,0.0796492],[8400,0.0805691],[8500,0.0814881],[8600,0.0824062],[8700,0.0833233],[8800,0.0842395],[8900,0.0851548],[9000,0.0860692],[9100,0.0869827],[9200,0.0878953],[9300,0.0888069],[9400,0.0897177],[9500,0.0906275],[9600,0.0915364],[9700,0.0924444],[9800,0.0933515],[9900,0.0942577],[10000,0.095163]],"c":"force3","w":2.6},{"t":"text","p":[606.0,233.1],"s":"μ = 10⁻⁵","c":"force3","size":11,"a":"start"}]}
---
Probabilità che una copia contenga almeno un errore in funzione del numero di siti copiati, per tre valori della probabilità di errore per sito. Ogni curva supera il $63\%$ quando $n\mu=1$, cioè per $n=1/\mu$.
:::

## La soglia d'errore {#soglia}

Il modello diventa uno strumento evolutivo quando si aggiunge la selezione. Si consideri una popolazione di replicatori in cui una sequenza, la **sequenza maestra**, si moltiplica più in fretta delle altre, per esempio perché è un ribozima funzionale: ogni sua copia ne produce in media $\sigma$ volte più delle varianti difettose, con $\sigma>1$. Una copia della sequenza maestra è anch'essa una sequenza maestra solo se è perfetta, cosa che accade con probabilità $Q=(1-\mu)^L\simeq\mathrm e^{-\mu L}$, dove $L$ è la lunghezza della sequenza. Le copie con errori diventano varianti difettose, e le varianti difettose difficilmente tornano per caso alla sequenza maestra.

La sequenza maestra si mantiene nella popolazione se il vantaggio compensa le perdite per errore, cioè se $\sigma Q>1$. Prendendo i logaritmi si ottiene la condizione di Eigen.

::: legge Soglia d'errore di Eigen
Una sequenza di lunghezza $L$, copiata con probabilità di errore $\mu$ per sito e con vantaggio selettivo $\sigma$, si conserva se

$$\mu L<\ln\sigma,\qquad\text{cioè}\qquad L<\frac{\ln\sigma}{\mu}.$$

Oltre questa lunghezza la sequenza maestra si perde e la popolazione diventa una nube di varianti casuali: è la **catastrofe d'errore**.
:::

Nel modello più semplice, che trascura le mutazioni all'indietro, la frazione di sequenze maestre all'equilibrio vale

$$x=\frac{\sigma Q-1}{\sigma-1},$$

e si annulla proprio quando $\sigma Q=1$ (figura 4). Eigen chiamò **quasispecie** la popolazione in equilibrio fra mutazione e selezione: una sequenza maestra circondata da una nube di varianti vicine, che la selezione tiene insieme finché il numero di errori per copia resta sotto la soglia.

::: figura quasispecie
{"w":800,"h":285,"items":[{"t":"axes","o":[80,250],"x":[690,"errori medi per copia μL"],"y":[240,"frazione di sequenze maestre"],"sx":160,"sy":220,"xt":[[0,"0"],[0.5,"0,5"],[1,"1"],[1.5,"1,5"],[2,"2"],[2.5,"2,5"],[3,"3"]],"yt":[[0,"0"],[0.2,"0,2"],[0.4,"0,4"],[0.6,"0,6"],[0.8,"0,8"],[1.0,"1,0"]]},{"t":"plot","o":[80,250],"sx":160,"sy":220,"pts":[[0.0,1.0],[0.01,0.9889443],[0.02,0.9779985],[0.03,0.9671617],[0.04,0.9564327],[0.05,0.9458105],[0.06,0.9352939],[0.07,0.924882],[0.08,0.9145737],[0.09,0.904368],[0.1,0.8942638],[0.11,0.8842602],[0.12,0.874356],[0.13,0.8645505],[0.14,0.8548425],[0.15,0.8452311],[0.16,0.8357153],[0.17,0.8262942],[0.18,0.8169669],[0.19,0.8077324],[0.2,0.7985897],[0.21,0.7895381],[0.22,0.7805764],[0.23,0.771704],[0.24,0.7629198],[0.25,0.7542231],[0.26,0.7456129],[0.27,0.7370883],[0.28,0.7286486],[0.29,0.7202929],[0.3,0.7120202],[0.31,0.70383],[0.32,0.6957212],[0.33,0.687693],[0.34,0.6797448],[0.35,0.6718757],[0.36,0.6640848],[0.37,0.6563715],[0.38,0.6487349],[0.39,0.6411743],[0.4,0.6336889],[0.41,0.6262781],[0.42,0.6189409],[0.43,0.6116768],[0.44,0.6044849],[0.45,0.5973646],[0.46,0.5903152],[0.47,0.5833359],[0.48,0.576426],[0.49,0.5695849],[0.5,0.5628118],[0.51,0.5561062],[0.52,0.5494673],[0.53,0.5428944],[0.54,0.5363869],[0.55,0.5299442],[0.56,0.5235656],[0.57,0.5172505],[0.58,0.5109982],[0.59,0.5048081],[0.6,0.4986796],[0.61,0.4926121],[0.62,0.4866049],[0.63,0.4806576],[0.64,0.4747694],[0.65,0.4689398],[0.66,0.4631681],[0.67,0.457454],[0.68,0.4517967],[0.69,0.4461956],[0.7,0.4406503],[0.71,0.4351602],[0.72,0.4297247],[0.73,0.4243433],[0.74,0.4190155],[0.75,0.4137406],[0.76,0.4085183],[0.77,0.4033479],[0.78,0.3982289],[0.79,0.3931609],[0.8,0.3881433],[0.81,0.3831756],[0.82,0.3782574],[0.83,0.3733881],[0.84,0.3685672],[0.85,0.3637944],[0.86,0.359069],[0.87,0.3543906],[0.88,0.3497588],[0.89,0.3451731],[0.9,0.340633],[0.91,0.336138],[0.92,0.3316878],[0.93,0.3272819],[0.94,0.3229198],[0.95,0.3186011],[0.96,0.3143254],[0.97,0.3100923],[0.98,0.3059012],[0.99,0.3017519],[1.0,0.2976438],[1.01,0.2935766],[1.02,0.2895499],[1.03,0.2855633],[1.04,0.2816163],[1.05,0.2777086],[1.06,0.2738398],[1.07,0.2700095],[1.08,0.2662173],[1.09,0.2624628],[1.1,0.2587456],[1.11,0.2550655],[1.12,0.251422],[1.13,0.2478147],[1.14,0.2442434],[1.15,0.2407075],[1.16,0.2372069],[1.17,0.233741],[1.18,0.2303097],[1.19,0.2269125],[1.2,0.2235491],[1.21,0.2202192],[1.22,0.2169224],[1.23,0.2136584],[1.24,0.2104269],[1.25,0.2072276],[1.26,0.20406],[1.27,0.200924],[1.28,0.1978192],[1.29,0.1947453],[1.3,0.191702],[1.31,0.188689],[1.32,0.1857059],[1.33,0.1827525],[1.34,0.1798285],[1.35,0.1769336],[1.36,0.1740675],[1.37,0.17123],[1.38,0.1684206],[1.39,0.1656392],[1.4,0.1628855],[1.41,0.1601592],[1.42,0.15746],[1.43,0.1547877],[1.44,0.152142],[1.45,0.1495225],[1.46,0.1469292],[1.47,0.1443617],[1.48,0.1418197],[1.49,0.139303],[1.5,0.1368113],[1.51,0.1343444],[1.52,0.1319021],[1.53,0.1294841],[1.54,0.1270901],[1.55,0.12472],[1.56,0.1223734],[1.57,0.1200502],[1.58,0.1177501],[1.59,0.1154729],[1.6,0.1132184],[1.61,0.1109862],[1.62,0.1087763],[1.63,0.1065884],[1.64,0.1044223],[1.65,0.1022777],[1.66,0.1001544],[1.67,0.0980523],[1.68,0.0959711],[1.69,0.0939106],[1.7,0.0918706],[1.71,0.0898509],[1.72,0.0878513],[1.73,0.0858716],[1.74,0.0839116],[1.75,0.081971],[1.76,0.0800498],[1.77,0.0781478],[1.78,0.0762646],[1.79,0.0744002],[1.8,0.0725543],[1.81,0.0707268],[1.82,0.0689175],[1.83,0.0671262],[1.84,0.0653527],[1.85,0.0635969],[1.86,0.0618585],[1.87,0.0601374],[1.88,0.0584335],[1.89,0.0567465],[1.9,0.0550762],[1.91,0.0534227],[1.92,0.0517855],[1.93,0.0501647],[1.94,0.0485599],[1.95,0.0469712],[1.96,0.0453982],[1.97,0.043841],[1.98,0.0422992],[1.99,0.0407727],[2.0,0.0392614],[2.01,0.0377652],[2.02,0.0362839],[2.03,0.0348172],[2.04,0.0333652],[2.05,0.0319277],[2.06,0.0305044],[2.07,0.0290953],[2.08,0.0277002],[2.09,0.026319],[2.1,0.0249516],[2.11,0.0235977],[2.12,0.0222574],[2.13,0.0209303],[2.14,0.0196165],[2.15,0.0183157],[2.16,0.0170279],[2.17,0.0157529],[2.18,0.0144906],[2.19,0.0132408],[2.2,0.0120035],[2.21,0.0107785],[2.22,0.0095657],[2.23,0.0083649],[2.24,0.0071761],[2.25,0.0059991],[2.26,0.0048339],[2.27,0.0036802],[2.28,0.002538],[2.29,0.0014072],[2.3,0.0002876],[2.31,0],[2.32,0],[2.33,0],[2.34,0],[2.35,0],[2.36,0],[2.37,0],[2.38,0],[2.39,0],[2.4,0],[2.41,0],[2.42,0],[2.43,0],[2.44,0],[2.45,0],[2.46,0],[2.47,0],[2.48,0],[2.49,0],[2.5,0],[2.51,0],[2.52,0],[2.53,0],[2.54,0],[2.55,0],[2.56,0],[2.57,0],[2.58,0],[2.59,0],[2.6,0],[2.61,0],[2.62,0],[2.63,0],[2.64,0],[2.65,0],[2.66,0],[2.67,0],[2.68,0],[2.69,0],[2.7,0],[2.71,0],[2.72,0],[2.73,0],[2.74,0],[2.75,0],[2.76,0],[2.77,0],[2.78,0],[2.79,0],[2.8,0],[2.81,0],[2.82,0],[2.83,0],[2.84,0],[2.85,0],[2.86,0],[2.87,0],[2.88,0],[2.89,0],[2.9,0],[2.91,0],[2.92,0],[2.93,0],[2.94,0],[2.95,0],[2.96,0],[2.97,0],[2.98,0],[2.99,0],[3.0,0]],"c":"force2","w":2.6},{"t":"circle","p":[448.4,250,5],"c":"force2"},{"t":"text","p":[454.4,240],"s":"σ = 10","c":"force2","size":11,"a":"start"},{"t":"plot","o":[80,250],"sx":160,"sy":220,"pts":[[0.0,1.0],[0.01,0.9850748],[0.02,0.970298],[0.03,0.9556683],[0.04,0.9411842],[0.05,0.9268441],[0.06,0.9126468],[0.07,0.8985907],[0.08,0.8846745],[0.09,0.8708968],[0.1,0.8572561],[0.11,0.8437512],[0.12,0.8303807],[0.13,0.8171431],[0.14,0.8040374],[0.15,0.791062],[0.16,0.7782157],[0.17,0.7654972],[0.18,0.7529053],[0.19,0.7404387],[0.2,0.7280961],[0.21,0.7158764],[0.22,0.7037782],[0.23,0.6918004],[0.24,0.6799418],[0.25,0.6682012],[0.26,0.6565774],[0.27,0.6450692],[0.28,0.6336756],[0.29,0.6223954],[0.3,0.6112273],[0.31,0.6001704],[0.32,0.5892236],[0.33,0.5783856],[0.34,0.5676555],[0.35,0.5570321],[0.36,0.5465145],[0.37,0.5361015],[0.38,0.5257921],[0.39,0.5155853],[0.4,0.5054801],[0.41,0.4954754],[0.42,0.4855702],[0.43,0.4757636],[0.44,0.4660546],[0.45,0.4564422],[0.46,0.4469255],[0.47,0.4375034],[0.48,0.4281751],[0.49,0.4189396],[0.5,0.409796],[0.51,0.4007434],[0.52,0.3917808],[0.53,0.3829075],[0.54,0.3741224],[0.55,0.3654247],[0.56,0.3568136],[0.57,0.3482882],[0.58,0.3398475],[0.59,0.3314909],[0.6,0.3232175],[0.61,0.3150263],[0.62,0.3069167],[0.63,0.2988877],[0.64,0.2909386],[0.65,0.2830687],[0.66,0.275277],[0.67,0.2675629],[0.68,0.2599255],[0.69,0.2523641],[0.7,0.244878],[0.71,0.2374663],[0.72,0.2301284],[0.73,0.2228635],[0.74,0.2156709],[0.75,0.2085498],[0.76,0.2014996],[0.77,0.1945196],[0.78,0.187609],[0.79,0.1807672],[0.8,0.1739934],[0.81,0.1672871],[0.82,0.1606475],[0.83,0.1540739],[0.84,0.1475658],[0.85,0.1411224],[0.86,0.1347431],[0.87,0.1284273],[0.88,0.1221744],[0.89,0.1159836],[0.9,0.1098545],[0.91,0.1037863],[0.92,0.0977786],[0.93,0.0918306],[0.94,0.0859418],[0.95,0.0801115],[0.96,0.0743393],[0.97,0.0686246],[0.98,0.0629666],[0.99,0.057365],[1.0,0.0518192],[1.01,0.0463285],[1.02,0.0408924],[1.03,0.0355104],[1.04,0.030182],[1.05,0.0249066],[1.06,0.0196837],[1.07,0.0145128],[1.08,0.0093933],[1.09,0.0043247],[1.1,0],[1.11,0],[1.12,0],[1.13,0],[1.14,0],[1.15,0],[1.16,0],[1.17,0],[1.18,0],[1.19,0],[1.2,0],[1.21,0],[1.22,0],[1.23,0],[1.24,0],[1.25,0],[1.26,0],[1.27,0],[1.28,0],[1.29,0],[1.3,0],[1.31,0],[1.32,0],[1.33,0],[1.34,0],[1.35,0],[1.36,0],[1.37,0],[1.38,0],[1.39,0],[1.4,0],[1.41,0],[1.42,0],[1.43,0],[1.44,0],[1.45,0],[1.46,0],[1.47,0],[1.48,0],[1.49,0],[1.5,0],[1.51,0],[1.52,0],[1.53,0],[1.54,0],[1.55,0],[1.56,0],[1.57,0],[1.58,0],[1.59,0],[1.6,0],[1.61,0],[1.62,0],[1.63,0],[1.64,0],[1.65,0],[1.66,0],[1.67,0],[1.68,0],[1.69,0],[1.7,0],[1.71,0],[1.72,0],[1.73,0],[1.74,0],[1.75,0],[1.76,0],[1.77,0],[1.78,0],[1.79,0],[1.8,0],[1.81,0],[1.82,0],[1.83,0],[1.84,0],[1.85,0],[1.86,0],[1.87,0],[1.88,0],[1.89,0],[1.9,0],[1.91,0],[1.92,0],[1.93,0],[1.94,0],[1.95,0],[1.96,0],[1.97,0],[1.98,0],[1.99,0],[2.0,0],[2.01,0],[2.02,0],[2.03,0],[2.04,0],[2.05,0],[2.06,0],[2.07,0],[2.08,0],[2.09,0],[2.1,0],[2.11,0],[2.12,0],[2.13,0],[2.14,0],[2.15,0],[2.16,0],[2.17,0],[2.18,0],[2.19,0],[2.2,0],[2.21,0],[2.22,0],[2.23,0],[2.24,0],[2.25,0],[2.26,0],[2.27,0],[2.28,0],[2.29,0],[2.3,0],[2.31,0],[2.32,0],[2.33,0],[2.34,0],[2.35,0],[2.36,0],[2.37,0],[2.38,0],[2.39,0],[2.4,0],[2.41,0],[2.42,0],[2.43,0],[2.44,0],[2.45,0],[2.46,0],[2.47,0],[2.48,0],[2.49,0],[2.5,0],[2.51,0],[2.52,0],[2.53,0],[2.54,0],[2.55,0],[2.56,0],[2.57,0],[2.58,0],[2.59,0],[2.6,0],[2.61,0],[2.62,0],[2.63,0],[2.64,0],[2.65,0],[2.66,0],[2.67,0],[2.68,0],[2.69,0],[2.7,0],[2.71,0],[2.72,0],[2.73,0],[2.74,0],[2.75,0],[2.76,0],[2.77,0],[2.78,0],[2.79,0],[2.8,0],[2.81,0],[2.82,0],[2.83,0],[2.84,0],[2.85,0],[2.86,0],[2.87,0],[2.88,0],[2.89,0],[2.9,0],[2.91,0],[2.92,0],[2.93,0],[2.94,0],[2.95,0],[2.96,0],[2.97,0],[2.98,0],[2.99,0],[3.0,0]],"c":"force","w":2.6},{"t":"circle","p":[255.8,250,5],"c":"force"},{"t":"text","p":[261.8,240],"s":"σ = 3","c":"force","size":11,"a":"start"}]}
---
Frazione di sequenze maestre in una quasispecie all'equilibrio, in funzione del numero medio di errori per copia, per due valori del vantaggio selettivo. La frazione cala al crescere degli errori e si annulla alla soglia $\mu L=\ln\sigma$: per $\sigma=10$ a $2{,}3$ errori per copia, per $\sigma=3$ a $1{,}1$.
:::

La soglia dipende dal vantaggio solo attraverso un logaritmo: anche un vantaggio enorme sposta poco il limite. Con $\sigma=10$ il numero massimo di errori per copia è $\ln10\simeq2{,}3$; con $\sigma=1000$ è $\ln1000\simeq6{,}9$. In pratica una popolazione può conservare un genoma solo se il numero di errori per copia è dell'ordine dell'unità o minore. Ne seguono le lunghezze massime della figura 5.

::: figura soglia
{"w":800,"h":295,"items":[{"t":"axes","o":[90,260],"x":[660,"errori per sito μ"],"y":[245,"lunghezza massima (nucleotidi)"],"sx":58,"sy":24,"xt":[[1,"10⁻¹⁰"],[3,"10⁻⁸"],[5,"10⁻⁶"],[7,"10⁻⁴"],[9,"10⁻²"]],"yt":[[1,"10²"],[3,"10⁴"],[5,"10⁶"],[7,"10⁸"],[9,"10¹⁰"]]},{"t":"plot","o":[90,260],"sx":58,"sy":24,"pts":[[1.4,8.9622157],[1.5,8.8622157],[1.6,8.7622157],[1.7,8.6622157],[1.8,8.5622157],[1.9,8.4622157],[2.0,8.3622157],[2.1,8.2622157],[2.2,8.1622157],[2.3,8.0622157],[2.4,7.9622157],[2.5,7.8622157],[2.6,7.7622157],[2.7,7.6622157],[2.8,7.5622157],[2.9,7.4622157],[3.0,7.3622157],[3.1,7.2622157],[3.2,7.1622157],[3.3,7.0622157],[3.4,6.9622157],[3.5,6.8622157],[3.6,6.7622157],[3.7,6.6622157],[3.8,6.5622157],[3.9,6.4622157],[4.0,6.3622157],[4.1,6.2622157],[4.2,6.1622157],[4.3,6.0622157],[4.4,5.9622157],[4.5,5.8622157],[4.6,5.7622157],[4.7,5.6622157],[4.8,5.5622157],[4.9,5.4622157],[5.0,5.3622157],[5.1,5.2622157],[5.2,5.1622157],[5.3,5.0622157],[5.4,4.9622157],[5.5,4.8622157],[5.6,4.7622157],[5.7,4.6622157],[5.8,4.5622157],[5.9,4.4622157],[6.0,4.3622157],[6.1,4.2622157],[6.2,4.1622157],[6.3,4.0622157],[6.4,3.9622157],[6.5,3.8622157],[6.6,3.7622157],[6.7,3.6622157],[6.8,3.5622157],[6.9,3.4622157],[7.0,3.3622157],[7.1,3.2622157],[7.2,3.1622157],[7.3,3.0622157],[7.4,2.9622157],[7.5,2.8622157],[7.6,2.7622157],[7.7,2.6622157],[7.8,2.5622157],[7.9,2.4622157],[8.0,2.3622157],[8.1,2.2622157],[8.2,2.1622157],[8.3,2.0622157],[8.4,1.9622157],[8.5,1.8622157],[8.6,1.7622157],[8.7,1.6622157],[8.8,1.5622157],[8.9,1.4622157],[9.0,1.3622157],[9.1,1.2622157],[9.2,1.1622157],[9.3,1.0622157],[9.4,0.9622157],[9.5,0.8622157]],"c":"force2","w":2.4},{"t":"text","p":[274.0,77.3],"s":"L = ln σ / μ, σ = 10","c":"force2","size":11,"a":"start"},{"t":"circle","p":[577.1,221.6,5],"c":"force"},{"t":"text","p":[585.1,225.6],"s":"viroide","c":"force","size":11,"a":"start"},{"t":"circle","p":[496.0,188.0,5],"c":"force4"},{"t":"text","p":[504.0,192.0],"s":"virus a RNA","c":"force4","size":11,"a":"start"},{"t":"circle","p":[167.9,124.1,5],"c":"force3"},{"t":"text","p":[175.9,128.1],"s":"E. coli","c":"force3","size":11,"a":"start"}]}
---
Lunghezza massima di un genoma in funzione della probabilità di errore per sito, secondo la soglia di Eigen con $\sigma=10$, in scala logaritmica su entrambi gli assi. I punti indicano un viroide, un virus a RNA tipico e il batterio *E. coli*: i primi due vivono vicino alla soglia, il batterio molto al di sotto.
:::

I dati confermano la previsione. Il viroide della maculatura clorotica del crisantemo, un RNA di circa quattrocento nucleotidi copiato dagli enzimi della pianta senza correzione, ha la più alta frequenza di mutazione misurata in un sistema biologico, circa una ogni quattrocento nucleotidi: un errore per copia, proprio al limite. I virus a RNA, con tassi fra $10^{-6}$ e $10^{-4}$, hanno genomi fra qualche migliaio e qualche decina di migliaia di nucleotidi. I più lunghi, i coronavirus, con circa trentamila nucleotidi, possiedono un enzima di correzione delle bozze che manca agli altri virus a RNA, e che abbassa il loro tasso di errore.

## La catastrofe d'errore come terapia {#mutagenesi}

Se i virus a RNA vivono vicino alla soglia, basta una piccola spinta per superarla. È l'idea della **mutagenesi letale**: un farmaco che aumenta il tasso di errore della polimerasi virale può far precipitare la popolazione nella catastrofe d'errore. Nel 2001 Shane Crotty, Craig Cameron e Raul Andino mostrarono che la ribavirina, un analogo dei nucleosidi usato da anni contro alcuni virus, agisce sul poliovirus soprattutto in questo modo: viene incorporata nell'RNA virale e si appaia indifferentemente con due basi diverse, e un aumento di circa dieci volte del tasso di mutazione bastava a ridurre di oltre il $99\%$ l'infettività della progenie. Il molnupiravir, approvato nel 2021 contro il coronavirus della COVID-19, sfrutta lo stesso principio. La soglia d'errore, nata come teoria dell'origine della vita, è diventata una strategia farmacologica.

## Il paradosso di Eigen {#paradosso}

Applicata all'origine della vita, la soglia d'errore produce un paradosso. Un ribozima polimerasi senza correzione sbaglia circa un nucleotide su cento; con $\mu=10^{-2}$ e $\sigma=10$ la lunghezza massima è di circa $230$ nucleotidi. I ribozimi polimerasi ottenuti in laboratorio sono lunghi circa duecento nucleotidi, e un sistema genetico minimo dovrebbe contenere almeno la polimerasi e qualche altra funzione. Ma per copiare con maggiore precisione servirebbe una polimerasi più grande e più complessa, che a sua volta richiederebbe un genoma più lungo. Senza un genoma lungo non c'è una polimerasi precisa, e senza una polimerasi precisa non c'è un genoma lungo.

Sono state proposte diverse vie d'uscita, che possono agire insieme.

- **Molti replicatori brevi.** L'informazione può essere divisa fra molecole corte, ciascuna sotto la soglia. Eigen e Peter Schuster proposero nel 1977 l'**ipercicio**, un ciclo di replicatori in cui ciascuno favorisce la copiatura del successivo, così che l'insieme cooperi senza che nessuno debba essere lungo.
- **Compartimenti.** Un ipercicio libero in soluzione è vulnerabile ai parassiti, molecole che si fanno copiare senza aiutare nessuno. Racchiusi in vescicole, i replicatori di una cellula primitiva condividono il destino: le vescicole con più parassiti crescono meno, e la selezione agisce sulle vescicole. Eörs Szathmáry e László Demeter chiamarono questo meccanismo, nel 1987, correttore stocastico.
- **Errori meno dannosi.** Molte mutazioni sono neutre: una sostituzione in un'ansa di un ribozima spesso non ne cambia la funzione. Se una frazione $\nu$ dei siti tollera qualsiasi base, conta solo l'errore sugli altri, e la soglia si sposta da $\ln\sigma/\mu$ a circa $\ln\sigma/[(1-\nu)\mu]$.
- **Copiatura più precisa a basso costo.** Le condizioni ambientali, come il freddo e la concentrazione nel ghiaccio, e le modifiche chimiche dei nucleotidi possono aumentare la precisione della copiatura senza enzimi più grandi.

L'esperimento del 2024 di Nikolaos Papastavrou, David Horning e Gerald Joyce, descritto nel capitolo [Il mondo a RNA](unit:biology-10), ha mostrato la soglia in azione: copiato da una polimerasi a RNA poco precisa, un piccolo ribozima perdeva la sua funzione in pochi cicli; copiato da una polimerasi più precisa, la conservava e migliorava.

## Mutazioni utili {#utili}

Le mutazioni sono casuali rispetto ai bisogni dell'organismo? Nel 1943 Salvador Luria e Max Delbrück risposero con un esperimento elegante. Fecero crescere molte colture indipendenti di *E. coli*, ciascuna da poche cellule, e poi le esposero a un batteriofago che uccide i batteri sensibili, contando le colonie resistenti sopravvissute. Se la resistenza fosse comparsa in risposta al virus, ogni cellula avrebbe avuto la stessa piccola probabilità di diventare resistente, e il numero di colonie resistenti sarebbe stato simile in tutte le colture. Se invece le mutazioni compaiono a caso durante la crescita, prima del contatto con il virus, una mutazione avvenuta presto in una coltura produce un'intera discendenza di cellule resistenti, e il numero di resistenti varia moltissimo da coltura a coltura (figura 6).

::: figura luria
{"w":720,"h":298,"items":[{"t":"text","p":[170,22],"s":"mutazione precoce","c":"ax","size":12},{"t":"line","p":[170,50,100.0,100],"c":"force","w":2},{"t":"line","p":[170,50,240.0,100],"c":"muted","w":1.2},{"t":"line","p":[100.0,100,65.0,150],"c":"force","w":2},{"t":"line","p":[100.0,100,135.0,150],"c":"force","w":2},{"t":"line","p":[240.0,100,205.0,150],"c":"muted","w":1.2},{"t":"line","p":[240.0,100,275.0,150],"c":"muted","w":1.2},{"t":"line","p":[65.0,150,47.5,200],"c":"force","w":2},{"t":"line","p":[65.0,150,82.5,200],"c":"force","w":2},{"t":"line","p":[135.0,150,117.5,200],"c":"force","w":2},{"t":"line","p":[135.0,150,152.5,200],"c":"force","w":2},{"t":"line","p":[205.0,150,187.5,200],"c":"muted","w":1.2},{"t":"line","p":[205.0,150,222.5,200],"c":"muted","w":1.2},{"t":"line","p":[275.0,150,257.5,200],"c":"muted","w":1.2},{"t":"line","p":[275.0,150,292.5,200],"c":"muted","w":1.2},{"t":"line","p":[47.5,200,38.8,250],"c":"force","w":2},{"t":"line","p":[47.5,200,56.2,250],"c":"force","w":2},{"t":"line","p":[82.5,200,73.8,250],"c":"force","w":2},{"t":"line","p":[82.5,200,91.2,250],"c":"force","w":2},{"t":"line","p":[117.5,200,108.8,250],"c":"force","w":2},{"t":"line","p":[117.5,200,126.2,250],"c":"force","w":2},{"t":"line","p":[152.5,200,143.8,250],"c":"force","w":2},{"t":"line","p":[152.5,200,161.2,250],"c":"force","w":2},{"t":"line","p":[187.5,200,178.8,250],"c":"muted","w":1.2},{"t":"line","p":[187.5,200,196.2,250],"c":"muted","w":1.2},{"t":"line","p":[222.5,200,213.8,250],"c":"muted","w":1.2},{"t":"line","p":[222.5,200,231.2,250],"c":"muted","w":1.2},{"t":"line","p":[257.5,200,248.8,250],"c":"muted","w":1.2},{"t":"line","p":[257.5,200,266.2,250],"c":"muted","w":1.2},{"t":"line","p":[292.5,200,283.8,250],"c":"muted","w":1.2},{"t":"line","p":[292.5,200,301.2,250],"c":"muted","w":1.2},{"t":"circle","p":[170,50,6],"c":"force2"},{"t":"circle","p":[100.0,100,6],"c":"force"},{"t":"circle","p":[240.0,100,6],"c":"force2"},{"t":"circle","p":[65.0,150,6],"c":"force"},{"t":"circle","p":[135.0,150,6],"c":"force"},{"t":"circle","p":[205.0,150,6],"c":"force2"},{"t":"circle","p":[275.0,150,6],"c":"force2"},{"t":"circle","p":[47.5,200,6],"c":"force"},{"t":"circle","p":[82.5,200,6],"c":"force"},{"t":"circle","p":[117.5,200,6],"c":"force"},{"t":"circle","p":[152.5,200,6],"c":"force"},{"t":"circle","p":[187.5,200,6],"c":"force2"},{"t":"circle","p":[222.5,200,6],"c":"force2"},{"t":"circle","p":[257.5,200,6],"c":"force2"},{"t":"circle","p":[292.5,200,6],"c":"force2"},{"t":"circle","p":[38.8,250,6],"c":"force"},{"t":"circle","p":[56.2,250,6],"c":"force"},{"t":"circle","p":[73.8,250,6],"c":"force"},{"t":"circle","p":[91.2,250,6],"c":"force"},{"t":"circle","p":[108.8,250,6],"c":"force"},{"t":"circle","p":[126.2,250,6],"c":"force"},{"t":"circle","p":[143.8,250,6],"c":"force"},{"t":"circle","p":[161.2,250,6],"c":"force"},{"t":"circle","p":[178.8,250,6],"c":"force2"},{"t":"circle","p":[196.2,250,6],"c":"force2"},{"t":"circle","p":[213.8,250,6],"c":"force2"},{"t":"circle","p":[231.2,250,6],"c":"force2"},{"t":"circle","p":[248.8,250,6],"c":"force2"},{"t":"circle","p":[266.2,250,6],"c":"force2"},{"t":"circle","p":[283.8,250,6],"c":"force2"},{"t":"circle","p":[301.2,250,6],"c":"force2"},{"t":"text","p":[550,22],"s":"mutazione tardiva","c":"ax","size":12},{"t":"line","p":[550,50,480.0,100],"c":"muted","w":1.2},{"t":"line","p":[550,50,620.0,100],"c":"muted","w":1.2},{"t":"line","p":[480.0,100,445.0,150],"c":"muted","w":1.2},{"t":"line","p":[480.0,100,515.0,150],"c":"muted","w":1.2},{"t":"line","p":[620.0,100,585.0,150],"c":"muted","w":1.2},{"t":"line","p":[620.0,100,655.0,150],"c":"muted","w":1.2},{"t":"line","p":[445.0,150,427.5,200],"c":"muted","w":1.2},{"t":"line","p":[445.0,150,462.5,200],"c":"muted","w":1.2},{"t":"line","p":[515.0,150,497.5,200],"c":"muted","w":1.2},{"t":"line","p":[515.0,150,532.5,200],"c":"muted","w":1.2},{"t":"line","p":[585.0,150,567.5,200],"c":"muted","w":1.2},{"t":"line","p":[585.0,150,602.5,200],"c":"muted","w":1.2},{"t":"line","p":[655.0,150,637.5,200],"c":"muted","w":1.2},{"t":"line","p":[655.0,150,672.5,200],"c":"muted","w":1.2},{"t":"line","p":[427.5,200,418.8,250],"c":"force","w":2},{"t":"line","p":[427.5,200,436.2,250],"c":"muted","w":1.2},{"t":"line","p":[462.5,200,453.8,250],"c":"muted","w":1.2},{"t":"line","p":[462.5,200,471.2,250],"c":"muted","w":1.2},{"t":"line","p":[497.5,200,488.8,250],"c":"muted","w":1.2},{"t":"line","p":[497.5,200,506.2,250],"c":"muted","w":1.2},{"t":"line","p":[532.5,200,523.8,250],"c":"muted","w":1.2},{"t":"line","p":[532.5,200,541.2,250],"c":"muted","w":1.2},{"t":"line","p":[567.5,200,558.8,250],"c":"muted","w":1.2},{"t":"line","p":[567.5,200,576.2,250],"c":"muted","w":1.2},{"t":"line","p":[602.5,200,593.8,250],"c":"muted","w":1.2},{"t":"line","p":[602.5,200,611.2,250],"c":"muted","w":1.2},{"t":"line","p":[637.5,200,628.8,250],"c":"muted","w":1.2},{"t":"line","p":[637.5,200,646.2,250],"c":"muted","w":1.2},{"t":"line","p":[672.5,200,663.8,250],"c":"muted","w":1.2},{"t":"line","p":[672.5,200,681.2,250],"c":"muted","w":1.2},{"t":"circle","p":[550,50,6],"c":"force2"},{"t":"circle","p":[480.0,100,6],"c":"force2"},{"t":"circle","p":[620.0,100,6],"c":"force2"},{"t":"circle","p":[445.0,150,6],"c":"force2"},{"t":"circle","p":[515.0,150,6],"c":"force2"},{"t":"circle","p":[585.0,150,6],"c":"force2"},{"t":"circle","p":[655.0,150,6],"c":"force2"},{"t":"circle","p":[427.5,200,6],"c":"force2"},{"t":"circle","p":[462.5,200,6],"c":"force2"},{"t":"circle","p":[497.5,200,6],"c":"force2"},{"t":"circle","p":[532.5,200,6],"c":"force2"},{"t":"circle","p":[567.5,200,6],"c":"force2"},{"t":"circle","p":[602.5,200,6],"c":"force2"},{"t":"circle","p":[637.5,200,6],"c":"force2"},{"t":"circle","p":[672.5,200,6],"c":"force2"},{"t":"circle","p":[418.8,250,6],"c":"force"},{"t":"circle","p":[436.2,250,6],"c":"force2"},{"t":"circle","p":[453.8,250,6],"c":"force2"},{"t":"circle","p":[471.2,250,6],"c":"force2"},{"t":"circle","p":[488.8,250,6],"c":"force2"},{"t":"circle","p":[506.2,250,6],"c":"force2"},{"t":"circle","p":[523.8,250,6],"c":"force2"},{"t":"circle","p":[541.2,250,6],"c":"force2"},{"t":"circle","p":[558.8,250,6],"c":"force2"},{"t":"circle","p":[576.2,250,6],"c":"force2"},{"t":"circle","p":[593.8,250,6],"c":"force2"},{"t":"circle","p":[611.2,250,6],"c":"force2"},{"t":"circle","p":[628.8,250,6],"c":"force2"},{"t":"circle","p":[646.2,250,6],"c":"force2"},{"t":"circle","p":[663.8,250,6],"c":"force2"},{"t":"circle","p":[681.2,250,6],"c":"force2"},{"t":"text","p":[170,282],"s":"8 resistenti su 16","c":"force","size":12},{"t":"text","p":[550,282],"s":"1 resistente su 16","c":"force","size":12}]}
---
L'idea dell'esperimento di Luria e Delbrück. Se una mutazione compare presto nella crescita di una coltura, tutta la discendenza della cellula mutata è resistente; se compare tardi, i resistenti sono pochi. Le mutazioni casuali producono quindi colture con numeri di resistenti molto diversi, alcune con un numero eccezionalmente alto.
:::

Luria e Delbrück osservarono proprio questa grande variabilità, con alcune colture molto ricche di resistenti: le mutazioni avvengono indipendentemente dalla loro utilità, e la selezione si limita a far prevalere quelle che servono. Il risultato, insieme agli studi sui batteriofagi, valse loro il premio Nobel nel 1969, condiviso con Alfred Hershey.

La maggior parte delle mutazioni che non sono dannose è neutra, e si diffonde o scompare per caso, come mostrò Motoo Kimura negli anni Sessanta; lo si vedrà nel capitolo [Deriva genetica](unit:biology-14). Una piccola parte è vantaggiosa. Dal 1988 il gruppo di Richard Lenski fa crescere dodici popolazioni di *E. coli* nelle stesse condizioni, trasferendole ogni giorno in un terreno fresco, e ne conserva campioni congelati; le popolazioni hanno superato le settantacinquemila generazioni. In tutte la velocità di crescita è aumentata, e in una popolazione, dopo circa trentunomila generazioni, è comparsa la capacità di usare il citrato del terreno in presenza di ossigeno, una novità che ha richiesto una serie di mutazioni successive. La resistenza agli antibiotici dei batteri patogeni è la versione meno benvenuta dello stesso processo.

## Un'esperienza: il messaggio copiato {#esperienza}

Il modello degli errori si può verificare con un messaggio scritto e due dadi, simulando la copiatura ripetuta di un genoma.

::: metodo Copie di copie
**Materiale.** Un foglio quadrettato, due dadi, una matita. Si scrive in una riga una sequenza di $60$ lettere scelte fra A, C, G e T, il «genoma» originale.

**Procedura.** Si copia la sequenza nella riga successiva una lettera alla volta. Per ogni lettera si lanciano i due dadi: se escono due sei, la copia di quella lettera è sbagliata, e si sostituisce la lettera con un'altra delle tre, scelta lanciando un dado. La probabilità di errore per lettera è quindi $\mu=1/36$. Si ripete la copiatura per dieci generazioni, copiando ogni volta l'ultima riga, e si conta dopo ogni generazione il numero di lettere diverse dall'originale.

**Analisi.** Calcolare il numero medio atteso di errori per copia, $n\mu=60/36\simeq1{,}7$, e la probabilità che una copia sia perfetta, $\mathrm e^{-1{,}7}\simeq0{,}19$. Confrontare con i risultati di tutta la classe. Discutere perché, dopo molte generazioni, il numero di differenze dall'originale cresce più lentamente del numero di errori commessi, e che cosa servirebbe per conservare il messaggio, ricordando che in questo gioco manca la selezione.
:::

Dopo dieci generazioni sono stati commessi in media circa diciassette errori, ma le differenze dall'originale sono un po' meno, perché qualche errore cade su una lettera già cambiata e qualche volta la riporta al valore originale. Senza selezione il messaggio degrada lentamente e irreversibilmente: è la catastrofe d'errore in miniatura. Una regola di selezione, per esempio conservare a ogni generazione la migliore di più copie, permette di mantenerlo, purché il numero di errori per copia resti piccolo.

## Errori frequenti {#errori}

::: errore Pensare che tutte le mutazioni siano dannose
Molte mutazioni sono neutre, come le sostituzioni sinonime, e alcune sono vantaggiose. Senza mutazioni non ci sarebbe variabilità su cui la selezione possa agire.
:::

::: errore Credere che le mutazioni compaiano quando servono
L'esperimento di Luria e Delbrück mostra che le mutazioni compaiono a caso, prima della comparsa della pressione selettiva; la selezione fa prevalere quelle utili.
:::

::: errore Sommare le probabilità di errore invece di moltiplicare quelle di successo
La probabilità di almeno un errore in $n$ siti è $1-(1-\mu)^n$. La somma $n\mu$ è il numero medio di errori e coincide con la probabilità solo quando è molto minore di $1$.
:::

::: errore Pensare che la soglia d'errore dipenda molto dal vantaggio selettivo
La lunghezza massima è $\ln\sigma/\mu$: un vantaggio cento volte maggiore aumenta il limite di poche volte. È la precisione $\mu$ a fissare l'ordine di grandezza.
:::

::: errore Confondere il tasso per replicazione con il tasso per generazione
In un batterio una generazione è una replicazione; nell'uomo una generazione comprende decine o centinaia di divisioni nella linea germinale, e il tasso per generazione è molto più alto di quello per divisione.
:::

## Sintesi {#sintesi}

::: sintesi In breve
- Le mutazioni sono cambiamenti ereditabili della sequenza: sostituzioni, sinonime, di senso alterato o nonsenso, inserzioni e delezioni che possono spostare la cornice di lettura, e riarrangiamenti su grande scala.
- Le cause sono gli errori di replicazione, i danni chimici spontanei, come la perdita di purine e la deamminazione della citosina, la luce ultravioletta e le radiazioni ionizzanti.
- Selezione del nucleotide, correzione di bozze e riparazione degli appaiamenti scorretti portano la frequenza di errore da $10^{-4}$–$10^{-5}$ a $10^{-9}$–$10^{-10}$ per nucleotide; altri sistemi riparano basi danneggiate, dimeri e rotture.
- I tassi di mutazione vanno da $10^{-4}$ per nucleotide nei virus a RNA a circa $10^{-10}$ nei batteri; nei microrganismi a DNA il numero di mutazioni per genoma per replicazione è quasi costante, circa $0{,}003$.
- La probabilità di almeno un errore in una copia di $n$ siti è $1-(1-\mu)^n\simeq1-\mathrm e^{-n\mu}$; il numero medio di errori è $n\mu$.
- Una sequenza con vantaggio $\sigma$ si conserva solo se $\mu L<\ln\sigma$: è la soglia d'errore di Eigen, oltre la quale avviene la catastrofe d'errore. Viroidi e virus a RNA vivono vicino alla soglia, e la mutagenesi letale la sfrutta come terapia.
- Il paradosso di Eigen, nessun genoma lungo senza una polimerasi precisa e viceversa, si attenua con replicatori brevi cooperanti, compartimenti, siti neutri e condizioni che migliorano la copiatura.
- Le mutazioni compaiono a caso rispetto alla loro utilità, come mostrarono Luria e Delbrück, e forniscono la variabilità su cui agisce la selezione.
:::

## Glossario {#glossario}

- **Catastrofe d'errore**: perdita dell'informazione genetica di una popolazione quando il numero di errori per copia supera la soglia.
- **Delezione**: perdita di una o più basi da una sequenza.
- **Inserzione**: aggiunta di una o più basi a una sequenza.
- **Mutagenesi letale**: strategia antivirale che aumenta il tasso di mutazione di un virus fino alla catastrofe d'errore.
- **Mutazione di senso alterato**: sostituzione che cambia un amminoacido della proteina.
- **Mutazione nonsenso**: sostituzione che trasforma un codone di un amminoacido in un codone di arresto.
- **Mutazione sinonima**: sostituzione che cambia un codone senza cambiare l'amminoacido.
- **Quasispecie**: popolazione di replicatori formata da una sequenza maestra e da una nube di varianti, in equilibrio fra mutazione e selezione.
- **Soglia d'errore**: lunghezza massima di una sequenza che una popolazione può conservare con una data probabilità di errore per sito.
- **Tasso di mutazione**: numero di mutazioni per nucleotide per replicazione o per generazione.
- **Transizione**: sostituzione di una purina con un'altra purina o di una pirimidina con un'altra pirimidina.
- **Trasposone**: sequenza di DNA capace di spostarsi da un punto all'altro del genoma.
- **Trasversione**: sostituzione di una purina con una pirimidina o viceversa.

## Esercizi {#esercizi}

::: esercizio Tre mutazioni di un codone [base]
Il codone GAG dell'mRNA indica l'acido glutammico. Classificare le mutazioni che lo trasformano in GAA, in GUG e in UAG.
>>> soluzione
GAA indica ancora l'acido glutammico: la mutazione è sinonima. GUG indica la valina: è una mutazione di senso alterato, la stessa dell'anemia falciforme. UAG è un codone di arresto: è una mutazione nonsenso, che tronca la proteina.
:::

::: esercizio Transizioni e trasversioni [base]
Classificare le sostituzioni A→G, C→A, T→C e G→T.
>>> soluzione
A e G sono purine, T e C pirimidine. A→G e T→C sono transizioni; C→A e G→T sono trasversioni.
:::

::: esercizio Almeno un errore [base]
Con probabilità di errore $10^{-4}$ per sito, calcolare la probabilità che una copia di $1000$ siti e una di $10\,000$ siti contengano almeno un errore.
>>> soluzione
Con $1000$ siti

$$\begin{aligned}P&=1-0{,}9999^{1000}\\&\simeq1-\mathrm e^{-0{,}1}\simeq0{,}095;\end{aligned}$$

con $10\,000$ siti $P\simeq1-\mathrm e^{-1}\simeq0{,}63$.
:::

::: esercizio Un errore per copia [base]
Con probabilità di errore $10^{-3}$ per sito, quanto è lungo un genoma che riceve in media un errore per copia? Quale frazione delle copie è perfetta?
>>> soluzione
Il numero medio di errori è $n\mu=1$ per $n=1000$ siti. La frazione di copie perfette è circa $\mathrm e^{-1}\simeq0{,}37$.
:::

::: esercizio Le mutazioni di un figlio [base]
Con un tasso di $1{,}2\times10^{-8}$ mutazioni per nucleotide per generazione e due corredi di $3{,}1\times10^9$ coppie di basi, quante mutazioni nuove porta in media un figlio?
>>> soluzione
In media

$$1{,}2\times10^{-8}\cdot2\cdot3{,}1\times10^9\simeq74,$$

circa settanta mutazioni nuove, quasi tutte in regioni del genoma in cui non hanno effetti visibili.
:::

::: esercizio La regola di Drake [base]
Il genoma di *E. coli* ha $4{,}6\times10^6$ coppie di basi e un tasso di $2{,}2\times10^{-10}$ per nucleotide. Quante mutazioni compaiono per genoma a ogni replicazione? Quale tasso per nucleotide darebbe $0{,}003$ mutazioni per genoma a un batteriofago di $1{,}7\times10^5$ coppie di basi?
>>> soluzione
Per *E. coli* $4{,}6\times10^6\cdot2{,}2\times10^{-10}\simeq0{,}001$ mutazioni per genoma. Per il batteriofago servirebbe $0{,}003/1{,}7\times10^5\simeq1{,}8\times10^{-8}$ per nucleotide, un tasso quasi cento volte più alto.
:::

::: esercizio Zero, uno, due errori [medio]
Con $\mu=10^{-4}$ e $n=5000$, usare la distribuzione di Poisson per calcolare la probabilità che una copia abbia zero errori, uno solo, due o più.
>>> soluzione
La media è $n\mu=0{,}5$. Zero errori: $\mathrm e^{-0{,}5}\simeq0{,}607$; un errore: $0{,}5\,\mathrm e^{-0{,}5}\simeq0{,}303$; due o più: $1-0{,}607-0{,}303\simeq0{,}090$.
:::

::: esercizio Lunghezze massime [medio]
Con un vantaggio selettivo $\sigma=10$, calcolare la lunghezza massima di un genoma copiato con $\mu=10^{-2}$, come da un ribozima polimerasi primitivo, e con $\mu=10^{-4}$, come da una polimerasi virale senza correzione.
>>> soluzione
La soglia è $L<\ln10/\mu$: circa $230$ nucleotidi con $\mu=10^{-2}$ e circa $23\,000$ con $\mu=10^{-4}$. Il secondo valore è vicino alla lunghezza dei genomi più grandi fra i virus a RNA privi di correzione, che arrivano a circa ventimila nucleotidi.
:::

::: esercizio Il viroide al limite [medio]
Un viroide di $399$ nucleotidi viene copiato con un errore ogni $400$ nucleotidi. Qual è la frazione di copie perfette? Quale vantaggio selettivo minimo serve perché la sequenza maestra si conservi?
>>> soluzione
La frazione di copie perfette è

$$Q\simeq\mathrm e^{-399/400}\simeq0{,}37.$$

La sequenza maestra si conserva se $\sigma Q>1$, cioè se $\sigma>1/0{,}37\simeq2{,}7$: ogni copia corretta deve produrre quasi tre volte più discendenti di una variante difettosa.
:::

::: esercizio Una quasispecie [medio]
In una quasispecie con $\sigma=10$ il numero medio di errori per copia è $\mu L=1$. Quale frazione della popolazione è formata dalla sequenza maestra? E se $\mu L=2$?
>>> soluzione
Con $\mu L=1$, $Q=\mathrm e^{-1}\simeq0{,}368$ e

$$x=\frac{10\cdot0{,}368-1}{9}\simeq0{,}30.$$

Con $\mu L=2$, $Q=\mathrm e^{-2}\simeq0{,}135$ e $x=(1{,}35-1)/9\simeq0{,}04$: la popolazione è ormai vicina alla soglia, $\mu L=\ln10\simeq2{,}3$.
:::

::: esercizio Radiazione su Marte [medio]
Sulla superficie di Marte la dose assorbita è di circa $0{,}21\un{mGy}$ al giorno. In quanti anni un organismo dormiente accumula $5000\un{Gy}$, una dose a cui sopravvive *Deinococcus radiodurans*?
>>> soluzione
In un anno la dose è $0{,}21\times10^{-3}\cdot365{,}25\simeq0{,}077\un{Gy}$. Per $5000\un{Gy}$ servono

$$\frac{5000}{0{,}077}\simeq6{,}5\times10^4$$

anni: un tempo breve rispetto alle centinaia di milioni di anni trascorsi da quando Marte è diventato arido, per un organismo che resti in superficie senza riparare il proprio DNA.
:::

::: esercizio Quanto precisa? [medio]
Un organismo con un genoma di un milione di nucleotidi deve ricevere in media al massimo $0{,}1$ mutazioni per copia. Quale tasso di errore per nucleotide serve? Di quanto deve migliorare una polimerasi che sbaglia una volta ogni $10^4$ nucleotidi?
>>> soluzione
Serve $\mu\le0{,}1/10^6=10^{-7}$. Rispetto a $10^{-4}$ la precisione deve migliorare di mille volte, il risultato combinato della correzione di bozze e della riparazione degli appaiamenti scorretti.
:::

::: esercizio Siti neutri [avanzato]
In un ribozima di $200$ nucleotidi il $40\%$ dei siti tollera qualsiasi base senza perdere la funzione. Con $\sigma=10$ e $\mu=10^{-2}$, il ribozima è sotto o sopra la soglia? E se tutti i siti fossero essenziali?
>>> soluzione
Contano solo gli errori nei siti essenziali, il $60\%$: la lunghezza massima diventa

$$L<\frac{\ln10}{0{,}6\cdot10^{-2}}\simeq384,$$

e il ribozima di $200$ nucleotidi è sotto la soglia. Con tutti i siti essenziali il limite sarebbe circa $230$, e il ribozima sarebbe vicino alla soglia, con $\mu L=2$ contro $\ln10\simeq2{,}3$.
:::

::: esercizio Il peso del vantaggio [avanzato]
Di quanto aumenta la lunghezza massima di un genoma se il vantaggio selettivo passa da $\sigma=10$ a $\sigma=1000$, a parità di $\mu$? E se invece $\mu$ si riduce di dieci volte?
>>> soluzione
La lunghezza massima è proporzionale a $\ln\sigma$: passa da $\ln10$ a $\ln1000=3\ln10$, cioè triplica. Riducendo $\mu$ di dieci volte la lunghezza massima si moltiplica per dieci. La precisione conta molto più del vantaggio.
:::

::: esercizio Colture fortunate [avanzato]
Una coltura cresce da una cellula a $2^{20}\simeq10^6$ cellule in venti generazioni. La probabilità di mutazione verso la resistenza è $10^{-7}$ per divisione. Quanti eventi di mutazione si attendono in media in una coltura? Quante cellule resistenti produce una mutazione avvenuta alla quinta generazione, e una avvenuta alla diciannovesima?
>>> soluzione
Le divisioni sono circa $10^6$, e gli eventi attesi $10^6\cdot10^{-7}=0{,}1$: circa una coltura su dieci ne contiene uno, perché $1-\mathrm e^{-0{,}1}\simeq0{,}095$. Una cellula mutata alla quinta generazione si divide altre quindici volte e produce $2^{15}=32\,768$ cellule resistenti; una mutata alla diciannovesima ne produce $2$. Questa enorme variabilità è la firma delle mutazioni casuali osservata da Luria e Delbrück.
:::

::: esercizio Spingere un virus oltre la soglia [avanzato]
Un virus a RNA di $10^4$ nucleotidi ha $\mu=10^{-4}$, e un coronavirus di $3\times10^4$ nucleotidi, grazie alla correzione, $\mu=10^{-6}$. Con $\sigma=10$, di quale fattore deve aumentare il tasso di mutazione per portare ciascuno alla soglia?
>>> soluzione
La soglia è $\mu L=\ln10\simeq2{,}3$. Per il primo virus $\mu L=1$, e basta un aumento di circa $2{,}3$ volte. Per il coronavirus $\mu L=0{,}03$, e serve un aumento di circa

$$\frac{2{,}3}{0{,}03}\simeq77$$

volte. La correzione di bozze protegge i coronavirus, e un farmaco mutageno deve sfuggirle o saturarla.
:::

## Fonti {#fonti}

Il testo, le figure, gli esempi e gli esercizi di questo capitolo sono originali. Per la scelta e l'ordine degli argomenti i riferimenti principali sono A. M. Shaw, *Astrochemistry: From Astronomy to Astrobiology*, Wiley, 2006, §1.3 (errori di copiatura ed evoluzione) e §8.9 (propagazione dell'informazione nel mondo a RNA), e J. R. Morris, D. L. Hartl, A. H. Knoll e collaboratori, *Biology: How Life Works*, 2ª edizione, Macmillan, 2016, §12.1 (correzione di bozze), §14.1 (tasso e natura delle mutazioni), §14.2 (mutazioni puntiformi), §14.3 (mutazioni cromosomiche), §14.4 (danni e riparazione del DNA) e §21.1 (variabilità genetica). Dati ed esperimenti provengono dalle fonti primarie seguenti.

1. M. Eigen, *Die Naturwissenschaften* 58, 465 (1971); M. Eigen, P. Schuster, *Die Naturwissenschaften* 64, 541 (1977): soglia d'errore, quasispecie, ipercicio.
2. T. Lindahl, *Nature* 362, 709 (1993): instabilità chimica del DNA.
3. T. A. Kunkel, *Journal of Biological Chemistry* 279, 16895 (2004): precisione della replicazione.
4. V. M. Ingram, *Nature* 180, 326 (1957): la sostituzione dell'emoglobina falciforme.
5. D. M. Hassler e collaboratori, *Science* 343, 1244797 (2014): radiazione sulla superficie di Marte.
6. K. Zahradka e collaboratori, *Nature* 443, 569 (2006): riparazione del genoma di *Deinococcus radiodurans*.
7. J. W. Drake, *PNAS* 88, 7160 (1991); J. W. Drake, B. Charlesworth, D. Charlesworth, J. F. Crow, *Genetics* 148, 1667 (1998): tassi di mutazione e regola di Drake.
8. R. Sanjuán e collaboratori, *Journal of Virology* 84, 9733 (2010): tassi di mutazione dei virus.
9. H. Lee, E. Popodi, H. Tang, P. L. Foster, *PNAS* 109, E2774 (2012); A. Kong e collaboratori, *Nature* 488, 471 (2012): tassi di mutazione di *E. coli* e dell'uomo.
10. S. Gago e collaboratori, *Science* 323, 1308 (2009): frequenza di mutazione di un viroide.
11. L. D. Eckerle e collaboratori, *PLoS Pathogens* 6, e1000896 (2010): la correzione di bozze dei coronavirus.
12. S. Crotty, C. E. Cameron, R. Andino, *PNAS* 98, 6895 (2001); F. Kabinger e collaboratori, *Nature Structural & Molecular Biology* 28, 740 (2021): mutagenesi letale con ribavirina e molnupiravir.
13. E. Szathmáry, L. Demeter, *Journal of Theoretical Biology* 128, 463 (1987): il correttore stocastico.
14. N. Papastavrou, D. P. Horning, G. F. Joyce, *PNAS* 121, e2321592121 (2024): la soglia d'errore in un sistema a RNA.
15. S. E. Luria, M. Delbrück, *Genetics* 28, 491 (1943): mutazioni casuali.
16. M. Kimura, *Nature* 217, 624 (1968): la teoria neutrale.
17. R. E. Lenski e collaboratori, *American Naturalist* 138, 1315 (1991); Z. D. Blount, C. Z. Borland, R. E. Lenski, *PNAS* 105, 7899 (2008): evoluzione a lungo termine di *E. coli*.
