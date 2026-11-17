---
unit: biology-10
titolo: Il mondo a RNA
sottotitolo: Una molecola che porta informazione e catalizza reazioni, dai ribozimi ai replicatori in provetta
volume: Volume di biologia
fonte: Testo originale; riferimenti principali A. M. Shaw, Astrochemistry, §8.9; J. R. Morris et al., Biology: How Life Works, 2ª ed., Caso 1, §3.3, 4.2, 4.3
---

## Prima di cominciare {#apertura}

Nelle cellule di oggi le informazioni ereditarie stanno nel DNA, e il lavoro chimico lo fanno le proteine. Le due classi di molecole dipendono l'una dall'altra. Per copiare il DNA e per trascriverlo servono enzimi, che sono proteine; per costruire le proteine servono le istruzioni scritte nel DNA. Chi è venuto prima? La domanda ricorda quella dell'uovo e della gallina, e per decenni è sembrata altrettanto senza risposta.

Una via d'uscita è emersa da una terza molecola, l'RNA. L'RNA è un acido nucleico come il DNA, e porta informazione nella sequenza delle sue basi. Ma una singola catena di RNA può ripiegarsi su se stessa e assumere forme tridimensionali complesse, come una proteina, e alcune di queste forme catalizzano reazioni chimiche. Una molecola capace di fare entrambe le cose potrebbe aver dato inizio a un'evoluzione darwiniana prima che esistessero il DNA e le proteine. È l'**ipotesi del mondo a RNA**: in una fase antica della storia della vita, l'RNA sarebbe stato insieme il gene e l'enzima.

Questo capitolo presenta le prove a favore dell'ipotesi, dalle molecole di RNA che catalizzano reazioni nelle cellule attuali al ribosoma, la fabbrica delle proteine, il cui cuore catalitico è fatto di RNA. Descrive gli esperimenti di laboratorio che cercano di ricostruire un mondo a RNA: la copiatura dell'RNA senza enzimi, l'evoluzione di molecole nuove in provetta, i ribozimi che copiano altri RNA. Usa un modello semplice di crescita per capire come una popolazione di molecole che si copiano si moltiplica, e perché gli errori di copiatura e la scarsità di risorse ne limitano la crescita. Discute infine i problemi aperti, a cominciare dall'origine dell'RNA stesso.

::: obiettivi
- descrivere la struttura dell'RNA e le differenze rispetto al DNA, e spiegare come una catena di RNA si ripiega;
- elencare le prove a favore dell'ipotesi del mondo a RNA, dai ribozimi naturali al ribosoma;
- descrivere la copiatura di un RNA su stampo senza enzimi e i suoi limiti;
- usare il modello di crescita geometrica $N_n=N_0(1+f)^n$ e confrontarlo con la crescita parabolica;
- spiegare l'evoluzione in provetta e i risultati ottenuti con i ribozimi polimerasi;
- stimare l'effetto degli errori di copiatura sulla lunghezza massima di un replicatore;
- discutere i problemi irrisolti dell'ipotesi e il passaggio dall'RNA alle proteine e al DNA.
:::

Il capitolo usa la struttura dei nucleotidi e la sintesi prebiotica del capitolo [Miller-Urey e la sintesi prebiotica](unit:biology-07), l'omochiralità del capitolo [Chiralità e omochiralità](unit:biology-06) e la catalisi del capitolo [Energia, enzimi e catalisi](unit:biology-08). La crescita geometrica è una progressione con ragione costante, studiata nel capitolo [Esponenziali e logaritmi](unit:math-c06).

## L'RNA, una molecola con due mestieri {#struttura}

L'RNA, acido ribonucleico, è un polimero di **nucleotidi**. Ogni nucleotide è formato da uno zucchero a cinque atomi di carbonio, il ribosio, da un gruppo fosfato e da una base azotata. Le basi dell'RNA sono quattro: le purine adenina (A) e guanina (G), e le pirimidine citosina (C) e uracile (U). I nucleotidi si uniscono con **legami fosfodiesterici** fra il fosfato attaccato al carbonio $5'$ di uno zucchero e l'ossidrile del carbonio $3'$ dello zucchero successivo. La catena ha quindi una direzione, dall'estremità $5'$ all'estremità $3'$, e la sequenza delle basi lungo la catena è l'informazione che la molecola porta.

Il DNA differisce dall'RNA in due dettagli chimici con grandi conseguenze. Il suo zucchero, il desossiribosio, non ha il gruppo ossidrile in posizione $2'$; e al posto dell'uracile ha la timina, che porta un gruppo metile in più. L'ossidrile $2'$ rende l'RNA più reattivo e meno stabile: può attaccare il fosfato vicino e spezzare la catena, una reazione accelerata dalle basi e da alcuni ioni metallici. Il DNA, privo di quell'ossidrile, si conserva molto più a lungo, e per questo è la molecola adatta a un archivio permanente. Nelle cellule il DNA è quasi sempre a doppio filamento, l'RNA quasi sempre a filamento singolo.

Le basi di due catene possono appaiarsi con legami a idrogeno: la guanina con la citosina, con tre legami, e l'adenina con l'uracile, con due. Nell'RNA è frequente anche la coppia fra guanina e uracile, meno regolare. Due catene con sequenze **complementari**, in cui ogni base di una ha di fronte la sua compagna nell'altra, disposte in direzioni opposte, formano una doppia elica. Una catena singola di RNA può appaiare tratti diversi di se stessa. Se due segmenti vicini sono complementari, la catena si ripiega e forma una **forcina**, con un tratto a doppia elica, lo stelo, e un'ansa di basi non appaiate in cima (figura 1). Più forcine, anse e interazioni fra regioni lontane danno strutture tridimensionali compatte, con tasche e superfici capaci di legare altre molecole.

::: figura forcina
{"w":520,"h":320,"items":[{"t":"line","p":[220,290,220,140],"c":"muted","w":1.6},{"t":"line","p":[300,140,300,290],"c":"muted","w":1.6},{"t":"poly","pts":[[220.1,139.9],[216.0,135.0],[212.5,129.6],[209.6,123.9],[207.4,117.9],[205.9,111.7],[205.1,105.3],[205.1,98.9],[205.8,92.6],[207.3,86.3],[209.5,80.3],[212.3,74.6],[215.8,69.2],[219.9,64.3],[224.6,59.9],[229.7,56.1],[235.3,52.9],[241.2,50.3],[247.3,48.5],[253.6,47.4],[260.0,47.0],[266.4,47.4],[272.7,48.5],[278.8,50.3],[284.7,52.9],[290.3,56.1],[295.4,59.9],[300.1,64.3],[304.2,69.2],[307.7,74.6],[310.5,80.3],[312.7,86.3],[314.2,92.6],[314.9,98.9],[314.9,105.3],[314.1,111.7],[312.6,117.9],[310.4,123.9],[307.5,129.6],[304.0,135.0],[299.9,139.9]],"c":"muted","w":1.6},{"t":"circle","p":[220,290,12],"c":"body"},{"t":"poly","pts":[[232.0,290.0],[230.4,296.0],[226.0,300.4],[220.0,302.0],[214.0,300.4],[209.6,296.0],[208.0,290.0],[209.6,284.0],[214.0,279.6],[220.0,278.0],[226.0,279.6],[230.4,284.0],[232.0,290.0]],"c":"ax","w":1.4},{"t":"text","p":[220,294],"s":"G","c":"ax","size":11},{"t":"circle","p":[220,260,12],"c":"body"},{"t":"poly","pts":[[232.0,260.0],[230.4,266.0],[226.0,270.4],[220.0,272.0],[214.0,270.4],[209.6,266.0],[208.0,260.0],[209.6,254.0],[214.0,249.6],[220.0,248.0],[226.0,249.6],[230.4,254.0],[232.0,260.0]],"c":"ax","w":1.4},{"t":"text","p":[220,264],"s":"G","c":"ax","size":11},{"t":"circle","p":[220,230,12],"c":"body"},{"t":"poly","pts":[[232.0,230.0],[230.4,236.0],[226.0,240.4],[220.0,242.0],[214.0,240.4],[209.6,236.0],[208.0,230.0],[209.6,224.0],[214.0,219.6],[220.0,218.0],[226.0,219.6],[230.4,224.0],[232.0,230.0]],"c":"ax","w":1.4},{"t":"text","p":[220,234],"s":"A","c":"ax","size":11},{"t":"circle","p":[220,200,12],"c":"body"},{"t":"poly","pts":[[232.0,200.0],[230.4,206.0],[226.0,210.4],[220.0,212.0],[214.0,210.4],[209.6,206.0],[208.0,200.0],[209.6,194.0],[214.0,189.6],[220.0,188.0],[226.0,189.6],[230.4,194.0],[232.0,200.0]],"c":"ax","w":1.4},{"t":"text","p":[220,204],"s":"C","c":"ax","size":11},{"t":"circle","p":[220,170,12],"c":"body"},{"t":"poly","pts":[[232.0,170.0],[230.4,176.0],[226.0,180.4],[220.0,182.0],[214.0,180.4],[209.6,176.0],[208.0,170.0],[209.6,164.0],[214.0,159.6],[220.0,158.0],[226.0,159.6],[230.4,164.0],[232.0,170.0]],"c":"ax","w":1.4},{"t":"text","p":[220,174],"s":"U","c":"ax","size":11},{"t":"circle","p":[220,140,12],"c":"body"},{"t":"poly","pts":[[232.0,140.0],[230.4,146.0],[226.0,150.4],[220.0,152.0],[214.0,150.4],[209.6,146.0],[208.0,140.0],[209.6,134.0],[214.0,129.6],[220.0,128.0],[226.0,129.6],[230.4,134.0],[232.0,140.0]],"c":"ax","w":1.4},{"t":"text","p":[220,144],"s":"C","c":"ax","size":11},{"t":"circle","p":[300,140,12],"c":"body"},{"t":"poly","pts":[[312.0,140.0],[310.4,146.0],[306.0,150.4],[300.0,152.0],[294.0,150.4],[289.6,146.0],[288.0,140.0],[289.6,134.0],[294.0,129.6],[300.0,128.0],[306.0,129.6],[310.4,134.0],[312.0,140.0]],"c":"ax","w":1.4},{"t":"text","p":[300,144],"s":"G","c":"ax","size":11},{"t":"circle","p":[300,170,12],"c":"body"},{"t":"poly","pts":[[312.0,170.0],[310.4,176.0],[306.0,180.4],[300.0,182.0],[294.0,180.4],[289.6,176.0],[288.0,170.0],[289.6,164.0],[294.0,159.6],[300.0,158.0],[306.0,159.6],[310.4,164.0],[312.0,170.0]],"c":"ax","w":1.4},{"t":"text","p":[300,174],"s":"A","c":"ax","size":11},{"t":"circle","p":[300,200,12],"c":"body"},{"t":"poly","pts":[[312.0,200.0],[310.4,206.0],[306.0,210.4],[300.0,212.0],[294.0,210.4],[289.6,206.0],[288.0,200.0],[289.6,194.0],[294.0,189.6],[300.0,188.0],[306.0,189.6],[310.4,194.0],[312.0,200.0]],"c":"ax","w":1.4},{"t":"text","p":[300,204],"s":"G","c":"ax","size":11},{"t":"circle","p":[300,230,12],"c":"body"},{"t":"poly","pts":[[312.0,230.0],[310.4,236.0],[306.0,240.4],[300.0,242.0],[294.0,240.4],[289.6,236.0],[288.0,230.0],[289.6,224.0],[294.0,219.6],[300.0,218.0],[306.0,219.6],[310.4,224.0],[312.0,230.0]],"c":"ax","w":1.4},{"t":"text","p":[300,234],"s":"U","c":"ax","size":11},{"t":"circle","p":[300,260,12],"c":"body"},{"t":"poly","pts":[[312.0,260.0],[310.4,266.0],[306.0,270.4],[300.0,272.0],[294.0,270.4],[289.6,266.0],[288.0,260.0],[289.6,254.0],[294.0,249.6],[300.0,248.0],[306.0,249.6],[310.4,254.0],[312.0,260.0]],"c":"ax","w":1.4},{"t":"text","p":[300,264],"s":"C","c":"ax","size":11},{"t":"circle","p":[300,290,12],"c":"body"},{"t":"poly","pts":[[312.0,290.0],[310.4,296.0],[306.0,300.4],[300.0,302.0],[294.0,300.4],[289.6,296.0],[288.0,290.0],[289.6,284.0],[294.0,279.6],[300.0,278.0],[306.0,279.6],[310.4,284.0],[312.0,290.0]],"c":"ax","w":1.4},{"t":"text","p":[300,294],"s":"C","c":"ax","size":11},{"t":"line","p":[233,290,287,290],"c":"force","w":2.4},{"t":"line","p":[233,260,287,260],"c":"force","w":2.4},{"t":"line","p":[233,230,287,230],"c":"force2","w":1.6},{"t":"line","p":[233,200,287,200],"c":"force","w":2.4},{"t":"line","p":[233,170,287,170],"c":"force2","w":1.6},{"t":"line","p":[233,140,287,140],"c":"force","w":2.4},{"t":"circle","p":[205.2,107.2,12],"c":"body"},{"t":"poly","pts":[[217.2,107.2],[215.6,113.2],[211.2,117.5],[205.2,119.2],[199.2,117.5],[194.8,113.2],[193.2,107.2],[194.8,101.2],[199.2,96.8],[205.2,95.2],[211.2,96.8],[215.6,101.2],[217.2,107.2]],"c":"force3","w":1.4},{"t":"text","p":[205.2,111.2],"s":"A","c":"force3","size":11},{"t":"circle","p":[213.8,72.2,12],"c":"body"},{"t":"poly","pts":[[225.8,72.2],[224.1,78.2],[219.8,82.6],[213.8,84.2],[207.8,82.6],[203.4,78.2],[201.8,72.2],[203.4,66.2],[207.8,61.8],[213.8,60.2],[219.8,61.8],[224.1,66.2],[225.8,72.2]],"c":"force3","w":1.4},{"t":"text","p":[213.8,76.2],"s":"U","c":"force3","size":11},{"t":"circle","p":[242.0,50.0,12],"c":"body"},{"t":"poly","pts":[[254.0,50.0],[252.4,56.0],[248.0,60.4],[242.0,62.0],[236.0,60.4],[231.6,56.0],[230.0,50.0],[231.6,44.0],[236.0,39.6],[242.0,38.0],[248.0,39.6],[252.4,44.0],[254.0,50.0]],"c":"force3","w":1.4},{"t":"text","p":[242.0,54.0],"s":"U","c":"force3","size":11},{"t":"circle","p":[278.0,50.0,12],"c":"body"},{"t":"poly","pts":[[290.0,50.0],[288.4,56.0],[284.0,60.4],[278.0,62.0],[272.0,60.4],[267.6,56.0],[266.0,50.0],[267.6,44.0],[272.0,39.6],[278.0,38.0],[284.0,39.6],[288.4,44.0],[290.0,50.0]],"c":"force3","w":1.4},{"t":"text","p":[278.0,54.0],"s":"G","c":"force3","size":11},{"t":"circle","p":[306.2,72.2,12],"c":"body"},{"t":"poly","pts":[[318.2,72.2],[316.6,78.2],[312.2,82.6],[306.2,84.2],[300.2,82.6],[295.9,78.2],[294.2,72.2],[295.9,66.2],[300.2,61.8],[306.2,60.2],[312.2,61.8],[316.6,66.2],[318.2,72.2]],"c":"force3","w":1.4},{"t":"text","p":[306.2,76.2],"s":"C","c":"force3","size":11},{"t":"circle","p":[314.8,107.2,12],"c":"body"},{"t":"poly","pts":[[326.8,107.2],[325.2,113.2],[320.8,117.5],[314.8,119.2],[308.8,117.5],[304.4,113.2],[302.8,107.2],[304.4,101.2],[308.8,96.8],[314.8,95.2],[320.8,96.8],[325.2,101.2],[326.8,107.2]],"c":"force3","w":1.4},{"t":"text","p":[314.8,111.2],"s":"A","c":"force3","size":11},{"t":"text","p":[190,300],"s":"5′","c":"muted","size":12,"a":"end"},{"t":"text","p":[330,300],"s":"3′","c":"muted","size":12,"a":"start"},{"t":"text","p":[400,220],"s":"stelo","c":"ax","size":12,"a":"start"},{"t":"line","p":[396,216,316,216],"c":"muted","w":0.8},{"t":"text","p":[400,60],"s":"ansa","c":"force3","size":12,"a":"start"},{"t":"line","p":[396,56,322,74],"c":"muted","w":0.8},{"t":"line","p":[40,40,70,40],"c":"force","w":2.4},{"t":"text","p":[76,44],"s":"G–C: 3 legami","c":"force","size":11,"a":"start"},{"t":"line","p":[40,62,70,62],"c":"force2","w":1.6},{"t":"text","p":[76,66],"s":"A–U: 2 legami","c":"force2","size":11,"a":"start"}]}
---
Una catena di RNA che si ripiega su se stessa. I due tratti complementari dello stelo formano una breve doppia elica, con coppie G–C, a tre legami a idrogeno, e A–U, a due; le basi dell'ansa restano libere e possono legare altre molecole. Strutture come questa sono i mattoni della forma tridimensionale degli RNA catalitici.
:::

L'RNA ha quindi due mestieri. Come il DNA, porta informazione in una sequenza che può essere copiata per complementarità. Come una proteina, si ripiega in forme che dipendono dalla sequenza e che possono legare e trasformare altre molecole. Le proteine sono catalizzatori più versatili, perché i loro venti amminoacidi offrono una varietà chimica che le quattro basi dell'RNA non hanno; il DNA è un archivio più stabile. Ma nessuna delle due molecole sa fare il lavoro dell'altra, e l'RNA sa fare, in modo meno efficiente, entrambi.

## La scoperta dei ribozimi {#ribozimi}

L'idea che l'RNA potesse essere venuto prima del DNA e delle proteine fu avanzata alla fine degli anni Sessanta, quasi contemporaneamente, da Carl Woese, Francis Crick e Leslie Orgel. Mancava però una prova che l'RNA potesse catalizzare reazioni, e per oltre un decennio l'idea rimase una speculazione.

La prova arrivò per caso. All'inizio degli anni Ottanta Thomas Cech, all'Università del Colorado, studiava come il protozoo *Tetrahymena thermophila* rimuove un tratto non codificante, un introne, da un suo RNA ribosomiale. Si aspettava di trovare la proteina responsabile del taglio e della ricucitura. Scoprì invece, nel 1982, che l'RNA si taglia e si ricuce da solo, anche in provetta e in assenza di qualsiasi proteina: l'introne è un catalizzatore. Un anno dopo Sidney Altman, a Yale, mostrò che la ribonucleasi P, un complesso di RNA e proteina che matura i precursori degli RNA di trasporto nei batteri, deve la sua attività catalitica alla parte di RNA. Le molecole di RNA con attività catalitica furono chiamate **ribozimi**, e Cech e Altman ricevettero il premio Nobel per la chimica nel 1989.

Da allora i ribozimi naturali scoperti sono molti. Il più piccolo e studiato è il ribozima a **testa di martello**, una struttura di una trentina di nucleotidi a forma di tre forcine unite, presente in alcuni RNA infettivi delle piante, che taglia la propria catena in un punto preciso. Ribozimi simili si trovano nei genomi di batteri, di animali e dell'uomo. Nel 1986 Walter Gilbert, commentando la scoperta dei ribozimi, coniò l'espressione «mondo a RNA», con cui l'ipotesi è nota da allora.

::: storia Una molecola che si taglia da sola
Nei primi esperimenti di Cech l'RNA con l'introne veniva estratto insieme alle proteine del nucleo, e la reazione di taglio poteva essere attribuita a una proteina contaminante. Per escludere questa possibilità il gruppo produsse l'RNA in provetta, con un enzima batterico, a partire da un DNA clonato: un RNA che non era mai stato a contatto con le proteine di *Tetrahymena*. Anche così l'introne si staccava. Un controllo ben progettato trasformò un'osservazione curiosa in una scoperta.
:::

## Il ribosoma è un ribozima {#ribosoma}

La prova più forte a favore del mondo a RNA viene dalla macchina che costruisce tutte le proteine di tutti i viventi, il **ribosoma**. Il ribosoma è fatto di due subunità che contengono in tutto tre o quattro molecole di RNA ribosomiale, lunghe fino a qualche migliaio di nucleotidi, e qualche decina di proteine. L'RNA costituisce circa due terzi della massa del ribosoma batterico. Per decenni si è pensato che le proteine del ribosoma facessero il lavoro chimico e che l'RNA servisse da impalcatura.

Nel 2000 il gruppo di Thomas Steitz e Peter Moore, a Yale, determinò la struttura atomica della subunità maggiore del ribosoma di un archeo e vi localizzò il **centro della peptidil transferasi**, il sito in cui si forma il legame fra un amminoacido e il successivo nella catena proteica. Il sito è circondato soltanto da RNA: nessuna proteina si avvicina a meno di circa $1{,}8\un{nm}$ dal punto in cui avviene la reazione. Il legame peptidico, la reazione da cui dipendono tutte le proteine, è catalizzato da RNA. Il ribosoma è un ribozima. Il premio Nobel per la chimica del 2009 è andato a Venkatraman Ramakrishnan, Thomas Steitz e Ada Yonath per gli studi sulla struttura del ribosoma.

Il risultato pesa per l'ipotesi del mondo a RNA perché il ribosoma è antico quanto la vita cellulare: è presente in tutti i batteri, gli archei e gli eucarioti, e il suo nucleo catalitico è fra le strutture più conservate della biologia. È naturale interpretarlo come un'eredità di un'epoca in cui le proteine non esistevano ancora e l'RNA fece da sé il primo passo verso di esse. Anche gli RNA di trasporto, che portano gli amminoacidi al ribosoma e leggono il codice genetico, sono molecole di RNA; il codice genetico è il tema del capitolo [DNA, codice genetico ed espressione](unit:biology-11).

## Fossili molecolari {#fossili}

Altre tracce di un mondo a RNA si trovano nel metabolismo delle cellule attuali, e sono chiamate fossili molecolari: caratteristiche che si spiegano male con le esigenze di oggi e bene come residui del passato.

La prima riguarda i cofattori. Come si è visto nel capitolo [Energia, enzimi e catalisi](unit:biology-08), molti cofattori degli enzimi, come il NAD, il FAD e il coenzima A, contengono un nucleotide che spesso non partecipa alla reazione. La moneta energetica della cellula, l'ATP, è un ribonucleotide, e così il GTP, che fornisce energia alla sintesi delle proteine. Sono ciò che ci si aspetta se le prime vie metaboliche erano catalizzate da RNA e i cofattori erano parti di ribozimi.

La seconda riguarda la sintesi del DNA. Le cellule ottengono i desossiribonucleotidi dai ribonucleotidi, con un enzima, la ribonucleotide reduttasi, che toglie l'ossigeno in posizione $2'$. La timina del DNA, a sua volta, è prodotta aggiungendo un gruppo metile all'uracile, la base dell'RNA. E la replicazione del DNA comincia sempre da un breve tratto di RNA, l'**innesco**, perché le DNA polimerasi sanno allungare una catena ma non cominciarla. In tutti questi casi il DNA appare come un derivato dell'RNA, aggiunto in un secondo tempo.

La terza riguarda i più piccoli replicatori naturali. I **viroidi**, scoperti nel 1971 da Theodor Diener, sono RNA circolari di poche centinaia di nucleotidi che infettano le piante; non codificano alcuna proteina e si fanno copiare dagli enzimi della cellula ospite, e alcuni contengono ribozimi a testa di martello che tagliano le copie alla lunghezza giusta. Diener stesso li ha proposti come relitti di un'epoca precellulare.

::: sintesi Le prove a favore del mondo a RNA
- L'RNA porta informazione e, ripiegandosi, catalizza reazioni.
- Esistono ribozimi naturali, come gli introni autocatalitici e la ribonucleasi P.
- Il legame peptidico è catalizzato dall'RNA del ribosoma.
- Molti cofattori e la moneta energetica della cellula sono nucleotidi.
- I desossiribonucleotidi e la timina sono prodotti a partire dall'RNA, e la replicazione del DNA comincia con un innesco di RNA.
- Molecole di RNA possono evolvere in provetta acquistando nuove funzioni catalitiche.
:::

## Copiare senza enzimi {#stampo}

Se l'RNA è stato il primo materiale genetico, all'inizio doveva essere copiato senza l'aiuto di enzimi proteici. L'idea più semplice sfrutta la complementarità delle basi. Una catena di RNA già esistente fa da **stampo**: i nucleotidi liberi in soluzione si appaiano alle basi dello stampo, la guanina di fronte alla citosina e l'adenina di fronte all'uracile, e se i nucleotidi vicini si uniscono fra loro si forma una catena complementare. Copiando a sua volta la copia si riottiene la sequenza originale (figura 2).

::: figura stampo
{"w":700,"h":240,"items":[{"t":"line","p":[30,60,184,60],"c":"force2","w":2},{"t":"rect","p":[20,60,20,20],"c":"body","r":3},{"t":"poly","pts":[[20,60],[40,60],[40,80],[20,80]],"close":true,"c":"force2","w":1.3},{"t":"text","p":[30,75],"s":"A","c":"force2","size":11},{"t":"rect","p":[42,60,20,20],"c":"body","r":3},{"t":"poly","pts":[[42,60],[62,60],[62,80],[42,80]],"close":true,"c":"force2","w":1.3},{"t":"text","p":[52,75],"s":"U","c":"force2","size":11},{"t":"rect","p":[64,60,20,20],"c":"body","r":3},{"t":"poly","pts":[[64,60],[84,60],[84,80],[64,80]],"close":true,"c":"force2","w":1.3},{"t":"text","p":[74,75],"s":"G","c":"force2","size":11},{"t":"rect","p":[86,60,20,20],"c":"body","r":3},{"t":"poly","pts":[[86,60],[106,60],[106,80],[86,80]],"close":true,"c":"force2","w":1.3},{"t":"text","p":[96,75],"s":"C","c":"force2","size":11},{"t":"rect","p":[108,60,20,20],"c":"body","r":3},{"t":"poly","pts":[[108,60],[128,60],[128,80],[108,80]],"close":true,"c":"force2","w":1.3},{"t":"text","p":[118,75],"s":"G","c":"force2","size":11},{"t":"rect","p":[130,60,20,20],"c":"body","r":3},{"t":"poly","pts":[[130,60],[150,60],[150,80],[130,80]],"close":true,"c":"force2","w":1.3},{"t":"text","p":[140,75],"s":"C","c":"force2","size":11},{"t":"rect","p":[152,60,20,20],"c":"body","r":3},{"t":"poly","pts":[[152,60],[172,60],[172,80],[152,80]],"close":true,"c":"force2","w":1.3},{"t":"text","p":[162,75],"s":"A","c":"force2","size":11},{"t":"rect","p":[174,60,20,20],"c":"body","r":3},{"t":"poly","pts":[[174,60],[194,60],[194,80],[174,80]],"close":true,"c":"force2","w":1.3},{"t":"text","p":[184,75],"s":"U","c":"force2","size":11},{"t":"rect","p":[20,112,20,20],"c":"body","r":3},{"t":"poly","pts":[[20,112],[40,112],[40,132],[20,132]],"close":true,"c":"force3","w":1.3},{"t":"text","p":[30,127],"s":"U","c":"force3","size":11},{"t":"rect","p":[64,112,20,20],"c":"body","r":3},{"t":"poly","pts":[[64,112],[84,112],[84,132],[64,132]],"close":true,"c":"force3","w":1.3},{"t":"text","p":[74,127],"s":"C","c":"force3","size":11},{"t":"rect","p":[86,112,20,20],"c":"body","r":3},{"t":"poly","pts":[[86,112],[106,112],[106,132],[86,132]],"close":true,"c":"force3","w":1.3},{"t":"text","p":[96,127],"s":"G","c":"force3","size":11},{"t":"rect","p":[130,112,20,20],"c":"body","r":3},{"t":"poly","pts":[[130,112],[150,112],[150,132],[130,132]],"close":true,"c":"force3","w":1.3},{"t":"text","p":[140,127],"s":"G","c":"force3","size":11},{"t":"rect","p":[152,112,20,20],"c":"body","r":3},{"t":"poly","pts":[[152,112],[172,112],[172,132],[152,132]],"close":true,"c":"force3","w":1.3},{"t":"text","p":[162,127],"s":"U","c":"force3","size":11},{"t":"rect","p":[42,150,20,20],"c":"body","r":3},{"t":"poly","pts":[[42,150],[62,150],[62,170],[42,170]],"close":true,"c":"force3","w":1.3},{"t":"text","p":[52,165],"s":"A","c":"force3","size":11},{"t":"rect","p":[108,150,20,20],"c":"body","r":3},{"t":"poly","pts":[[108,150],[128,150],[128,170],[108,170]],"close":true,"c":"force3","w":1.3},{"t":"text","p":[118,165],"s":"C","c":"force3","size":11},{"t":"rect","p":[174,150,20,20],"c":"body","r":3},{"t":"poly","pts":[[174,150],[194,150],[194,170],[174,170]],"close":true,"c":"force3","w":1.3},{"t":"text","p":[184,165],"s":"A","c":"force3","size":11},{"t":"text","p":[108,210],"s":"monomeri attivati","c":"force3","size":11},{"t":"text","p":[108,226],"s":"si appaiano","c":"force3","size":11},{"t":"line","p":[272,60,426,60],"c":"force2","w":2},{"t":"rect","p":[262,60,20,20],"c":"body","r":3},{"t":"poly","pts":[[262,60],[282,60],[282,80],[262,80]],"close":true,"c":"force2","w":1.3},{"t":"text","p":[272,75],"s":"A","c":"force2","size":11},{"t":"rect","p":[284,60,20,20],"c":"body","r":3},{"t":"poly","pts":[[284,60],[304,60],[304,80],[284,80]],"close":true,"c":"force2","w":1.3},{"t":"text","p":[294,75],"s":"U","c":"force2","size":11},{"t":"rect","p":[306,60,20,20],"c":"body","r":3},{"t":"poly","pts":[[306,60],[326,60],[326,80],[306,80]],"close":true,"c":"force2","w":1.3},{"t":"text","p":[316,75],"s":"G","c":"force2","size":11},{"t":"rect","p":[328,60,20,20],"c":"body","r":3},{"t":"poly","pts":[[328,60],[348,60],[348,80],[328,80]],"close":true,"c":"force2","w":1.3},{"t":"text","p":[338,75],"s":"C","c":"force2","size":11},{"t":"rect","p":[350,60,20,20],"c":"body","r":3},{"t":"poly","pts":[[350,60],[370,60],[370,80],[350,80]],"close":true,"c":"force2","w":1.3},{"t":"text","p":[360,75],"s":"G","c":"force2","size":11},{"t":"rect","p":[372,60,20,20],"c":"body","r":3},{"t":"poly","pts":[[372,60],[392,60],[392,80],[372,80]],"close":true,"c":"force2","w":1.3},{"t":"text","p":[382,75],"s":"C","c":"force2","size":11},{"t":"rect","p":[394,60,20,20],"c":"body","r":3},{"t":"poly","pts":[[394,60],[414,60],[414,80],[394,80]],"close":true,"c":"force2","w":1.3},{"t":"text","p":[404,75],"s":"A","c":"force2","size":11},{"t":"rect","p":[416,60,20,20],"c":"body","r":3},{"t":"poly","pts":[[416,60],[436,60],[436,80],[416,80]],"close":true,"c":"force2","w":1.3},{"t":"text","p":[426,75],"s":"U","c":"force2","size":11},{"t":"line","p":[272,132,426,132],"c":"force3","w":2},{"t":"rect","p":[262,112,20,20],"c":"body","r":3},{"t":"poly","pts":[[262,112],[282,112],[282,132],[262,132]],"close":true,"c":"force3","w":1.3},{"t":"text","p":[272,127],"s":"U","c":"force3","size":11},{"t":"rect","p":[284,112,20,20],"c":"body","r":3},{"t":"poly","pts":[[284,112],[304,112],[304,132],[284,132]],"close":true,"c":"force3","w":1.3},{"t":"text","p":[294,127],"s":"A","c":"force3","size":11},{"t":"rect","p":[306,112,20,20],"c":"body","r":3},{"t":"poly","pts":[[306,112],[326,112],[326,132],[306,132]],"close":true,"c":"force3","w":1.3},{"t":"text","p":[316,127],"s":"C","c":"force3","size":11},{"t":"rect","p":[328,112,20,20],"c":"body","r":3},{"t":"poly","pts":[[328,112],[348,112],[348,132],[328,132]],"close":true,"c":"force3","w":1.3},{"t":"text","p":[338,127],"s":"G","c":"force3","size":11},{"t":"rect","p":[350,112,20,20],"c":"body","r":3},{"t":"poly","pts":[[350,112],[370,112],[370,132],[350,132]],"close":true,"c":"force3","w":1.3},{"t":"text","p":[360,127],"s":"C","c":"force3","size":11},{"t":"rect","p":[372,112,20,20],"c":"body","r":3},{"t":"poly","pts":[[372,112],[392,112],[392,132],[372,132]],"close":true,"c":"force3","w":1.3},{"t":"text","p":[382,127],"s":"G","c":"force3","size":11},{"t":"rect","p":[394,112,20,20],"c":"body","r":3},{"t":"poly","pts":[[394,112],[414,112],[414,132],[394,132]],"close":true,"c":"force3","w":1.3},{"t":"text","p":[404,127],"s":"U","c":"force3","size":11},{"t":"rect","p":[416,112,20,20],"c":"body","r":3},{"t":"poly","pts":[[416,112],[436,112],[436,132],[416,132]],"close":true,"c":"force3","w":1.3},{"t":"text","p":[426,127],"s":"A","c":"force3","size":11},{"t":"line","p":[272,82,272,110],"c":"muted","w":0.8},{"t":"line","p":[294,82,294,110],"c":"muted","w":0.8},{"t":"line","p":[316,82,316,110],"c":"muted","w":0.8},{"t":"line","p":[338,82,338,110],"c":"muted","w":0.8},{"t":"line","p":[360,82,360,110],"c":"muted","w":0.8},{"t":"line","p":[382,82,382,110],"c":"muted","w":0.8},{"t":"line","p":[404,82,404,110],"c":"muted","w":0.8},{"t":"line","p":[426,82,426,110],"c":"muted","w":0.8},{"t":"text","p":[350,210],"s":"i monomeri si uniscono:","c":"ax","size":11},{"t":"text","p":[350,226],"s":"doppia elica","c":"ax","size":11},{"t":"line","p":[514,40,668,40],"c":"force2","w":2},{"t":"rect","p":[504,40,20,20],"c":"body","r":3},{"t":"poly","pts":[[504,40],[524,40],[524,60],[504,60]],"close":true,"c":"force2","w":1.3},{"t":"text","p":[514,55],"s":"A","c":"force2","size":11},{"t":"rect","p":[526,40,20,20],"c":"body","r":3},{"t":"poly","pts":[[526,40],[546,40],[546,60],[526,60]],"close":true,"c":"force2","w":1.3},{"t":"text","p":[536,55],"s":"U","c":"force2","size":11},{"t":"rect","p":[548,40,20,20],"c":"body","r":3},{"t":"poly","pts":[[548,40],[568,40],[568,60],[548,60]],"close":true,"c":"force2","w":1.3},{"t":"text","p":[558,55],"s":"G","c":"force2","size":11},{"t":"rect","p":[570,40,20,20],"c":"body","r":3},{"t":"poly","pts":[[570,40],[590,40],[590,60],[570,60]],"close":true,"c":"force2","w":1.3},{"t":"text","p":[580,55],"s":"C","c":"force2","size":11},{"t":"rect","p":[592,40,20,20],"c":"body","r":3},{"t":"poly","pts":[[592,40],[612,40],[612,60],[592,60]],"close":true,"c":"force2","w":1.3},{"t":"text","p":[602,55],"s":"G","c":"force2","size":11},{"t":"rect","p":[614,40,20,20],"c":"body","r":3},{"t":"poly","pts":[[614,40],[634,40],[634,60],[614,60]],"close":true,"c":"force2","w":1.3},{"t":"text","p":[624,55],"s":"C","c":"force2","size":11},{"t":"rect","p":[636,40,20,20],"c":"body","r":3},{"t":"poly","pts":[[636,40],[656,40],[656,60],[636,60]],"close":true,"c":"force2","w":1.3},{"t":"text","p":[646,55],"s":"A","c":"force2","size":11},{"t":"rect","p":[658,40,20,20],"c":"body","r":3},{"t":"poly","pts":[[658,40],[678,40],[678,60],[658,60]],"close":true,"c":"force2","w":1.3},{"t":"text","p":[668,55],"s":"U","c":"force2","size":11},{"t":"line","p":[514,152,668,152],"c":"force3","w":2},{"t":"rect","p":[504,132,20,20],"c":"body","r":3},{"t":"poly","pts":[[504,132],[524,132],[524,152],[504,152]],"close":true,"c":"force3","w":1.3},{"t":"text","p":[514,147],"s":"A","c":"force3","size":11},{"t":"rect","p":[526,132,20,20],"c":"body","r":3},{"t":"poly","pts":[[526,132],[546,132],[546,152],[526,152]],"close":true,"c":"force3","w":1.3},{"t":"text","p":[536,147],"s":"U","c":"force3","size":11},{"t":"rect","p":[548,132,20,20],"c":"body","r":3},{"t":"poly","pts":[[548,132],[568,132],[568,152],[548,152]],"close":true,"c":"force3","w":1.3},{"t":"text","p":[558,147],"s":"G","c":"force3","size":11},{"t":"rect","p":[570,132,20,20],"c":"body","r":3},{"t":"poly","pts":[[570,132],[590,132],[590,152],[570,152]],"close":true,"c":"force3","w":1.3},{"t":"text","p":[580,147],"s":"C","c":"force3","size":11},{"t":"rect","p":[592,132,20,20],"c":"body","r":3},{"t":"poly","pts":[[592,132],[612,132],[612,152],[592,152]],"close":true,"c":"force3","w":1.3},{"t":"text","p":[602,147],"s":"G","c":"force3","size":11},{"t":"rect","p":[614,132,20,20],"c":"body","r":3},{"t":"poly","pts":[[614,132],[634,132],[634,152],[614,152]],"close":true,"c":"force3","w":1.3},{"t":"text","p":[624,147],"s":"C","c":"force3","size":11},{"t":"rect","p":[636,132,20,20],"c":"body","r":3},{"t":"poly","pts":[[636,132],[656,132],[656,152],[636,152]],"close":true,"c":"force3","w":1.3},{"t":"text","p":[646,147],"s":"A","c":"force3","size":11},{"t":"rect","p":[658,132,20,20],"c":"body","r":3},{"t":"poly","pts":[[658,132],[678,132],[678,152],[658,152]],"close":true,"c":"force3","w":1.3},{"t":"text","p":[668,147],"s":"U","c":"force3","size":11},{"t":"text","p":[592,210],"s":"separazione: due stampi","c":"ax","size":11},{"t":"text","p":[592,226],"s":"con la stessa sequenza","c":"ax","size":11},{"t":"arrow","p":[204,100,250,100],"c":"ax","w":1.6,"head":8},{"t":"arrow","p":[446,100,492,100],"c":"ax","w":1.6,"head":8},{"t":"text","p":[16,74],"s":"5′","c":"muted","size":10,"a":"end"},{"t":"text","p":[200,74],"s":"3′","c":"muted","size":10,"a":"start"},{"t":"text","p":[258,74],"s":"5′","c":"muted","size":10,"a":"end"},{"t":"text","p":[442,74],"s":"3′","c":"muted","size":10,"a":"start"},{"t":"text","p":[16,126],"s":"3′","c":"muted","size":10,"a":"end"},{"t":"text","p":[200,126],"s":"5′","c":"muted","size":10,"a":"start"},{"t":"text","p":[258,126],"s":"3′","c":"muted","size":10,"a":"end"},{"t":"text","p":[442,126],"s":"5′","c":"muted","size":10,"a":"start"},{"t":"text","p":[500,54],"s":"5′","c":"muted","size":10,"a":"end"},{"t":"text","p":[684,54],"s":"3′","c":"muted","size":10,"a":"start"},{"t":"text","p":[500,146],"s":"5′","c":"muted","size":10,"a":"end"},{"t":"text","p":[684,146],"s":"3′","c":"muted","size":10,"a":"start"}]}
---
Copiatura su stampo senza enzimi. I nucleotidi attivati si appaiano alle basi dello stampo e si uniscono in una catena complementare; la doppia elica deve poi separarsi perché le due catene possano servire di nuovo da stampo. Se lo stampo è autocomplementare, come nella sequenza mostrata, la copia è identica all'originale.
:::

Il primo ostacolo è energetico. In acqua l'unione di due nucleotidi con un legame fosfodiesterico è sfavorevole, perché libera una molecola d'acqua; le cellule usano nucleotidi trifosfati, che portano con sé l'energia necessaria. Dalla fine degli anni Sessanta Leslie Orgel e il suo gruppo, al Salk Institute, studiarono nucleotidi **attivati** con un gruppo imidazolico legato al fosfato, che reagiscono spontaneamente con l'ossidrile di un nucleotide vicino. Su uno stampo fatto di sole citosine, guanosine attivate con il 2-metilimidazolo si allineano e si uniscono in catene di guanine lunghe alcune decine di nucleotidi, in prevalenza con i legami corretti fra le posizioni $3'$ e $5'$.

Gli ostacoli successivi si sono rivelati più difficili. Le sequenze ricche di citosina e guanina si copiano bene, quelle ricche di adenina e uracile male, perché le coppie A–U, con due soli legami a idrogeno, tengono meno i monomeri sullo stampo. Gli errori sono frequenti. Una volta formata, la doppia elica tende a restare unita: scaldandola le catene si separano, ma raffreddandola si riappaiano molto più in fretta di quanto un nuovo filamento si copi. E in una miscela con le due forme speculari dei nucleotidi, i monomeri della forma sbagliata interrompono la crescita della catena, come si è visto nel capitolo [Chiralità e omochiralità](unit:biology-06). Negli ultimi anni il gruppo di Jack Szostak ha individuato intermedi più reattivi, coppie di nucleotidi unite da un ponte di imidazolio, che migliorano velocità e precisione della copiatura, e ha mostrato che la copiatura può avvenire anche dentro vescicole di acidi grassi, modelli delle prime cellule descritti nel capitolo [Membrane e protocellule](unit:biology-03).

La versione più semplice di un sistema che si copia è quella del modello in tre passi presentato da Shaw. Uno stampo $T$ lega due frammenti complementari $A$ e $B$; i frammenti, vicini e orientati, si uniscono; il doppio filamento che ne risulta si separa in due stampi $T$, ciascuno pronto a ricominciare:

$$T+A+B\rightleftharpoons M\longrightarrow D\rightleftharpoons2\,T.$$

Nel 1986 Günter von Kiedrowski realizzò questo schema con un esanucleotide di DNA autocomplementare, ottenuto dall'unione chimica di due trinucleotidi. Fu il primo replicatore chimico senza enzimi. La sua crescita però era lenta e di un tipo particolare, che conviene esaminare con un modello.

## Crescita geometrica {#crescita}

Si immagini una popolazione di molecole che si copiano a cicli: in ogni ciclo, per esempio una variazione di temperatura che separa le doppie eliche e permette una nuova copiatura, una frazione $f$ delle molecole presenti produce una copia. Se all'inizio di un ciclo ci sono $N$ molecole, alla fine ce ne sono $N+fN=N(1+f)$.

::: legge Crescita geometrica di un replicatore
Partendo da $N_0$ molecole, dopo $n$ cicli

$$N_n=N_0\,(1+f)^n,$$

dove $f$, fra $0$ e $1$, è la frazione di molecole copiate a ogni ciclo. Il numero di cicli necessari per raddoppiare la popolazione è

$$n_2=\frac{\ln2}{\ln(1+f)}.$$
:::

Con $f=1$ ogni molecola si copia a ogni ciclo e la popolazione raddoppia: $1$, $2$, $4$, $8$, e dopo dieci cicli $1024$ molecole. Con $f=0{,}5$ dopo dieci cicli le molecole sono $1{,}5^{10}\simeq58$, e il raddoppio richiede $\ln2/\ln1{,}5\simeq1{,}7$ cicli. Con $f=0{,}3$ servono circa $2{,}6$ cicli per raddoppiare e $27$ cicli per superare le mille molecole (figura 3). Il modello descrive bene le prime fasi di una reazione a catena della polimerasi, la tecnica di laboratorio che moltiplica il DNA con un enzima proteico, in cui $f$ è vicino a $1$; e descrive anche la crescita di un replicatore a RNA finché non si esauriscono i nucleotidi.

::: figura crescita
{"w":800,"h":285,"items":[{"t":"axes","o":[80,250],"x":[700,"cicli di copiatura n"],"y":[230,"numero di molecole"],"sx":40,"sy":52,"xt":[[0,"0"],[2,"2"],[4,"4"],[6,"6"],[8,"8"],[10,"10"],[12,"12"]],"yt":[[0,"1"],[1,"10"],[2,"100"],[3,"1000"],[4,"10⁴"]]},{"t":"plot","o":[80,250],"sx":40,"sy":52,"pts":[[0,0.0],[1,0.30103],[2,0.60206],[3,0.90309],[4,1.20412],[5,1.50515],[6,1.80618],[7,2.10721],[8,2.40824],[9,2.70927],[10,3.0103],[11,3.31133],[12,3.6123599]],"c":"force","w":1.2,"dash":true},{"t":"circle","p":[80,250.0,3.5],"c":"force"},{"t":"circle","p":[120,234.3,3.5],"c":"force"},{"t":"circle","p":[160,218.7,3.5],"c":"force"},{"t":"circle","p":[200,203.0,3.5],"c":"force"},{"t":"circle","p":[240,187.4,3.5],"c":"force"},{"t":"circle","p":[280,171.7,3.5],"c":"force"},{"t":"circle","p":[320,156.1,3.5],"c":"force"},{"t":"circle","p":[360,140.4,3.5],"c":"force"},{"t":"circle","p":[400,124.8,3.5],"c":"force"},{"t":"circle","p":[440,109.1,3.5],"c":"force"},{"t":"circle","p":[480,93.5,3.5],"c":"force"},{"t":"circle","p":[520,77.8,3.5],"c":"force"},{"t":"circle","p":[560,62.2,3.5],"c":"force"},{"t":"text","p":[570,66.2],"s":"f = 1","c":"force","size":12,"a":"start"},{"t":"plot","o":[80,250],"sx":40,"sy":52,"pts":[[0,0.0],[1,0.1760913],[2,0.3521825],[3,0.5282738],[4,0.704365],[5,0.8804563],[6,1.0565476],[7,1.2326388],[8,1.4087301],[9,1.5848213],[10,1.7609126],[11,1.9370038],[12,2.1130951]],"c":"force2","w":1.2,"dash":true},{"t":"circle","p":[80,250.0,3.5],"c":"force2"},{"t":"circle","p":[120,240.8,3.5],"c":"force2"},{"t":"circle","p":[160,231.7,3.5],"c":"force2"},{"t":"circle","p":[200,222.5,3.5],"c":"force2"},{"t":"circle","p":[240,213.4,3.5],"c":"force2"},{"t":"circle","p":[280,204.2,3.5],"c":"force2"},{"t":"circle","p":[320,195.1,3.5],"c":"force2"},{"t":"circle","p":[360,185.9,3.5],"c":"force2"},{"t":"circle","p":[400,176.7,3.5],"c":"force2"},{"t":"circle","p":[440,167.6,3.5],"c":"force2"},{"t":"circle","p":[480,158.4,3.5],"c":"force2"},{"t":"circle","p":[520,149.3,3.5],"c":"force2"},{"t":"circle","p":[560,140.1,3.5],"c":"force2"},{"t":"text","p":[570,144.1],"s":"f = 0,5","c":"force2","size":12,"a":"start"},{"t":"plot","o":[80,250],"sx":40,"sy":52,"pts":[[0,0.0],[1,0.1139434],[2,0.2278867],[3,0.3418301],[4,0.4557734],[5,0.5697168],[6,0.6836601],[7,0.7976035],[8,0.9115468],[9,1.0254902],[10,1.1394335],[11,1.2533769],[12,1.3673202]],"c":"force3","w":1.2,"dash":true},{"t":"circle","p":[80,250.0,3.5],"c":"force3"},{"t":"circle","p":[120,244.1,3.5],"c":"force3"},{"t":"circle","p":[160,238.1,3.5],"c":"force3"},{"t":"circle","p":[200,232.2,3.5],"c":"force3"},{"t":"circle","p":[240,226.3,3.5],"c":"force3"},{"t":"circle","p":[280,220.4,3.5],"c":"force3"},{"t":"circle","p":[320,214.4,3.5],"c":"force3"},{"t":"circle","p":[360,208.5,3.5],"c":"force3"},{"t":"circle","p":[400,202.6,3.5],"c":"force3"},{"t":"circle","p":[440,196.7,3.5],"c":"force3"},{"t":"circle","p":[480,190.7,3.5],"c":"force3"},{"t":"circle","p":[520,184.8,3.5],"c":"force3"},{"t":"circle","p":[560,178.9,3.5],"c":"force3"},{"t":"text","p":[570,182.9],"s":"f = 0,3","c":"force3","size":12,"a":"start"}]}
---
Numero di molecole in funzione del numero di cicli di copiatura, partendo da una molecola, per tre valori della frazione copiata. La scala verticale è logaritmica: la crescita geometrica vi appare come una successione di punti allineati, con pendenza proporzionale a $\log_{10}(1+f)$.
:::

Il modello trascura due fatti. Il primo è che le risorse finiscono: quando i nucleotidi attivati si esauriscono, la crescita rallenta e si ferma, e il numero di molecole tende a un massimo fissato dalla quantità di materiale disponibile. Il secondo è che le copie contengono errori. Se ogni nucleotide viene copiato correttamente con probabilità $q$, una molecola di $L$ nucleotidi viene copiata senza errori con probabilità

$$Q=q^L.$$

Le copie esatte crescono allora come $N_0(1+fQ)^n$, più lentamente della popolazione totale, e per molecole lunghe $Q$ può diventare piccolissimo. È il problema della soglia d'errore, che si incontra di nuovo più avanti.

::: esempio Copie corrette e copie sbagliate
Un replicatore di $34$ nucleotidi, la lunghezza di un piccolo ribozima a testa di martello, è copiato con precisione $q=0{,}99$ per nucleotide. La probabilità di una copia senza errori è $0{,}99^{34}\simeq0{,}71$. Con $f=1$ e una molecola iniziale, dopo dieci cicli le molecole sono $1024$, ma quelle identiche all'originale sono circa $1{,}71^{10}\simeq214$. Per un RNA di $200$ nucleotidi, $Q=0{,}99^{200}\simeq0{,}134$, e le copie esatte dopo dieci cicli sono solo circa $1{,}134^{10}\simeq3{,}5$.
:::

## Crescita esponenziale e crescita parabolica {#parabolica}

Nel tempo continuo la crescita geometrica diventa esponenziale. Se la velocità di produzione di nuove molecole è proporzionale al numero di molecole presenti, $\mathrm dN/\mathrm dt=kN$, la soluzione è $N=N_0\,\mathrm e^{kt}$. Il replicatore di von Kiedrowski si comportava in modo diverso. Il prodotto della copiatura è una doppia elica stabile, che si separa con difficoltà: gran parte degli stampi resta impegnata in coppie inattive, e soltanto la piccola frazione di stampi liberi in equilibrio con le coppie, proporzionale alla radice quadrata della concentrazione totale, partecipa alla reazione. La velocità di crescita diventa

$$\frac{\mathrm dN}{\mathrm dt}=k\sqrt N,$$

e la soluzione, che si verifica derivando, è

$$N(t)=\left(\sqrt{N_0}+\frac{kt}{2}\right)^2.$$

È una **crescita parabolica**: il numero di molecole cresce come il quadrato del tempo, molto più lentamente di un'esponenziale (figura 4).

::: figura parabolica
{"w":780,"h":285,"items":[{"t":"axes","o":[80,250],"x":[660,"tempo"],"y":[230,"numero di molecole"],"sx":55,"sy":90,"xt":[[0,"0"],[2,"2"],[4,"4"],[6,"6"],[8,"8"],[10,"10"]],"yt":[[0,"1"],[1,"10"],[2,"100"]]},{"t":"plot","o":[80,250],"sx":55,"sy":90,"pts":[[0.0,0.0],[0.1,0.0217147],[0.2,0.0434294],[0.3,0.0651442],[0.4,0.0868589],[0.5,0.1085736],[0.6,0.1302883],[0.7,0.1520031],[0.8,0.1737178],[0.9,0.1954325],[1.0,0.2171472],[1.1,0.238862],[1.2,0.2605767],[1.3,0.2822914],[1.4,0.3040061],[1.5,0.3257209],[1.6,0.3474356],[1.7,0.3691503],[1.8,0.390865],[1.9,0.4125798],[2.0,0.4342945],[2.1,0.4560092],[2.2,0.4777239],[2.3,0.4994387],[2.4,0.5211534],[2.5,0.5428681],[2.6,0.5645828],[2.7,0.5862976],[2.8,0.6080123],[2.9,0.629727],[3.0,0.6514417],[3.1,0.6731564],[3.2,0.6948712],[3.3,0.7165859],[3.4,0.7383006],[3.5,0.7600153],[3.6,0.7817301],[3.7,0.8034448],[3.8,0.8251595],[3.9,0.8468742],[4.0,0.868589],[4.1,0.8903037],[4.2,0.9120184],[4.3,0.9337331],[4.4,0.9554479],[4.5,0.9771626],[4.6,0.9988773],[4.7,1.020592],[4.8,1.0423068],[4.9,1.0640215],[5.0,1.0857362],[5.1,1.1074509],[5.2,1.1291657],[5.3,1.1508804],[5.4,1.1725951],[5.5,1.1943098],[5.6,1.2160245],[5.7,1.2377393],[5.8,1.259454],[5.9,1.2811687],[6.0,1.3028834],[6.1,1.3245982],[6.2,1.3463129],[6.3,1.3680276],[6.4,1.3897423],[6.5,1.4114571],[6.6,1.4331718],[6.7,1.4548865],[6.8,1.4766012],[6.9,1.498316],[7.0,1.5200307],[7.1,1.5417454],[7.2,1.5634601],[7.3,1.5851749],[7.4,1.6068896],[7.5,1.6286043],[7.6,1.650319],[7.7,1.6720338],[7.8,1.6937485],[7.9,1.7154632],[8.0,1.7371779],[8.1,1.7588927],[8.2,1.7806074],[8.3,1.8023221],[8.4,1.8240368],[8.5,1.8457515],[8.6,1.8674663],[8.7,1.889181],[8.8,1.9108957],[8.9,1.9326104],[9.0,1.9543252],[9.1,1.9760399],[9.2,1.9977546],[9.3,2.0194693],[9.4,2.0411841],[9.5,2.0628988],[9.6,2.0846135],[9.7,2.1063282],[9.8,2.128043],[9.9,2.1497577],[10.0,2.1714724]],"c":"force","w":2.4},{"t":"plot","o":[80,250],"sx":55,"sy":90,"pts":[[0.0,0.0],[0.1,0.0214477],[0.2,0.0423786],[0.3,0.0628169],[0.4,0.0827854],[0.5,0.102305],[0.6,0.1213957],[0.7,0.1400757],[0.8,0.1583625],[0.9,0.1762722],[1.0,0.19382],[1.1,0.2110204],[1.2,0.2278867],[1.3,0.2444318],[1.4,0.2606675],[1.5,0.2766054],[1.6,0.2922561],[1.7,0.3076297],[1.8,0.322736],[1.9,0.337584],[2.0,0.3521825],[2.1,0.3665397],[2.2,0.3806634],[2.3,0.3945611],[2.4,0.40824],[2.5,0.4217067],[2.6,0.4349679],[2.7,0.4480296],[2.8,0.4608978],[2.9,0.4735782],[3.0,0.4860761],[3.1,0.4983967],[3.2,0.510545],[3.3,0.5225257],[3.4,0.5343435],[3.5,0.5460025],[3.6,0.5575072],[3.7,0.5688615],[3.8,0.5800692],[3.9,0.5911342],[4.0,0.60206],[4.1,0.6128501],[4.2,0.6235077],[4.3,0.6340362],[4.4,0.6444386],[4.5,0.6547179],[4.6,0.6648769],[4.7,0.6749185],[4.8,0.6848454],[4.9,0.69466],[5.0,0.704365],[5.1,0.7139628],[5.2,0.7234557],[5.3,0.7328459],[5.4,0.7421357],[5.5,0.7513272],[5.6,0.7604225],[5.7,0.7694235],[5.8,0.7783322],[5.9,0.7871504],[6.0,0.79588],[6.1,0.8045228],[6.2,0.8130804],[6.3,0.8215545],[6.4,0.8299467],[6.5,0.8382586],[6.6,0.8464917],[6.7,0.8546476],[6.8,0.8627275],[6.9,0.870733],[7.0,0.8786654],[7.1,0.886526],[7.2,0.8943161],[7.3,0.9020369],[7.4,0.9096897],[7.5,0.9172757],[7.6,0.924796],[7.7,0.9322517],[7.8,0.939644],[7.9,0.9469739],[8.0,0.9542425],[8.1,0.9614508],[8.2,0.9685997],[8.3,0.9756902],[8.4,0.9827234],[8.5,0.9897],[8.6,0.9966211],[8.7,1.0034875],[8.8,1.0103],[8.9,1.0170594],[9.0,1.0237667],[9.1,1.0304226],[9.2,1.0370279],[9.3,1.0435833],[9.4,1.0500896],[9.5,1.0565476],[9.6,1.0629578],[9.7,1.0693212],[9.8,1.0756382],[9.9,1.0819096],[10.0,1.0881361]],"c":"force2","w":2.4},{"t":"text","p":[640,58.6],"s":"esponenziale","c":"force","size":12,"a":"start"},{"t":"text","p":[640,156.1],"s":"parabolica","c":"force2","size":12,"a":"start"}]}
---
Crescita esponenziale e crescita parabolica a confronto, con la stessa velocità iniziale e scala verticale logaritmica. La crescita esponenziale raddoppia la popolazione a ogni unità di tempo; quella parabolica, tipica dei replicatori i cui prodotti restano appaiati, rallenta continuamente in termini relativi.
:::

La differenza ha conseguenze evolutive importanti. Quando due replicatori con crescita esponenziale competono per le stesse risorse, quello leggermente più veloce finisce per eliminare l'altro, perché il rapporto fra le due popolazioni cresce esponenzialmente nel tempo: è la selezione naturale nella sua forma più semplice. Eörs Szathmáry e Irina Gladkih mostrarono nel 1989 che con una crescita parabolica, invece, replicatori diversi tendono a coesistere, e la selezione non sceglie. Un sistema chimico che si copia senza liberare i propri prodotti non può quindi evolvere in modo darwiniano. Per l'evoluzione servono replicatori che si separino dalle copie e crescano in modo esponenziale, come quelli ottenuti nel 2009 da Tracey Lincoln e Gerald Joyce: due ribozimi di circa settanta nucleotidi che si costruiscono a vicenda unendo frammenti, con un tempo di raddoppio di circa un'ora, e che continuano a moltiplicarsi indefinitamente se si forniscono nuovi frammenti. Messe a competere, varianti diverse di questi ribozimi danno luogo a forme ricombinate che prendono il sopravvento sulla popolazione.

## L'evoluzione in provetta {#selezione}

Se l'RNA ha dominato una fase della storia della vita, deve essere stato capace di evolvere: di produrre per errore varianti, e di veder prevalere quelle che funzionavano meglio. La prima dimostrazione che l'evoluzione darwiniana può avvenire in provetta, con molecole di RNA, risale al 1967. Sol Spiegelman, all'Università dell'Illinois, mise l'RNA del batteriofago Q$\beta$, lungo più di quattromila nucleotidi, in una soluzione con l'enzima che lo copia, la replicasi del virus, e i nucleotidi. Dopo un breve intervallo trasferiva una goccia della soluzione in una provetta fresca, e così via. In queste condizioni conta soltanto la velocità di copiatura: al settantaquattresimo trasferimento la molecola dominante aveva perso circa l'$83\%$ della sequenza originale, conservava le parti riconosciute dall'enzima e produceva nuove copie circa quindici volte più in fretta dell'RNA completo. In esperimenti successivi le molecole selezionate si ridussero a poco più di duecento nucleotidi. Il «mostro di Spiegelman» mostrò che la selezione agisce sulle molecole come sugli organismi, e che seleziona ciò che l'ambiente premia, anche a costo di perdere informazione.

Negli anni Novanta l'idea è diventata una tecnica di laboratorio, l'**evoluzione in provetta** o selezione in vitro (figura 5). Si parte da una miscela enorme di molecole di RNA con sequenze casuali, prodotta con la sintesi chimica del DNA e la trascrizione. Si sottopone la miscela a una prova, per esempio la capacità di legarsi a una molecola bersaglio fissata su una colonna o di unirsi chimicamente a un'altra catena, e si conservano le poche molecole che la superano. Si moltiplicano queste molecole, introducendo di proposito qualche errore di copiatura, e si ripete la prova. Dopo alcune decine di cicli la miscela è dominata da molecole efficienti nella funzione richiesta. Nel 1990 i gruppi di Larry Gold e di Jack Szostak ottennero così i primi **aptameri**, RNA che legano in modo specifico piccole molecole o proteine.

::: figura selezione
{"w":680,"h":240,"items":[{"t":"rect","p":[30,30,220,46],"c":"body","r":4},{"t":"poly","pts":[[30,30],[250,30],[250,76],[30,76]],"close":true,"c":"force2","w":1.6},{"t":"text","p":[140.0,50.0],"s":"miscela di 10¹⁵","c":"force2","size":11},{"t":"text","p":[140.0,64.0],"s":"sequenze casuali","c":"force2","size":11},{"t":"rect","p":[430,30,220,46],"c":"body","r":4},{"t":"poly","pts":[[430,30],[650,30],[650,76],[430,76]],"close":true,"c":"force","w":1.6},{"t":"text","p":[540.0,50.0],"s":"prova funzionale:","c":"force","size":11},{"t":"text","p":[540.0,64.0],"s":"legame o reazione","c":"force","size":11},{"t":"rect","p":[430,170,220,46],"c":"body","r":4},{"t":"poly","pts":[[430,170],[650,170],[650,216],[430,216]],"close":true,"c":"force4","w":1.6},{"t":"text","p":[540.0,190.0],"s":"si conservano","c":"force4","size":11},{"t":"text","p":[540.0,204.0],"s":"le molecole riuscite","c":"force4","size":11},{"t":"rect","p":[30,170,220,46],"c":"body","r":4},{"t":"poly","pts":[[30,170],[250,170],[250,216],[30,216]],"close":true,"c":"force3","w":1.6},{"t":"text","p":[140.0,190.0],"s":"moltiplicazione","c":"force3","size":11},{"t":"text","p":[140.0,204.0],"s":"con qualche errore","c":"force3","size":11},{"t":"arrow","p":[252,53,428,53],"c":"ax","w":1.8,"head":9},{"t":"arrow","p":[540,78,540,168],"c":"ax","w":1.8,"head":9},{"t":"arrow","p":[428,193,252,193],"c":"ax","w":1.8,"head":9},{"t":"arrow","p":[140,168,140,78],"c":"ax","w":1.8,"head":9},{"t":"text","p":[340,118],"s":"si ripete per","c":"muted","size":11},{"t":"text","p":[340,134],"s":"una decina di cicli","c":"muted","size":11}]}
---
Il ciclo dell'evoluzione in provetta. Una miscela di sequenze casuali viene sottoposta a una prova funzionale; le molecole che la superano vengono moltiplicate con qualche errore, che introduce nuove varianti, e la miscela arricchita viene messa di nuovo alla prova. Variazione, selezione ed ereditarietà sono gli stessi ingredienti dell'evoluzione naturale.
:::

Nel 1993 David Bartel e Jack Szostak cercarono in una miscela di circa $10^{15}$ molecole diverse, ciascuna con $220$ nucleotidi casuali, RNA capaci di unire due catene di RNA con un legame fosfodiesterico, la reazione fondamentale della copiatura. Ne trovarono diverse famiglie. La più attiva, la ligasi di classe I, accelera la reazione di milioni di volte rispetto alla reazione su stampo senza catalizzatore, e il suo nucleo catalitico conta circa novanta nucleotidi: una struttura complessa, emersa da sequenze casuali in una decina di cicli di selezione. Il numero di sequenze possibili di $220$ nucleotidi è $4^{220}\simeq3\times10^{132}$, e la miscela iniziale ne conteneva una frazione insignificante: le molecole con una data funzione devono quindi essere relativamente frequenti nello spazio delle sequenze.

## Ribozimi che copiano l'RNA {#polimerasi}

Il cuore dell'ipotesi del mondo a RNA è una molecola mai trovata in natura, un ribozima capace di copiare qualsiasi RNA, compreso se stesso: una **RNA polimerasi a RNA**. Dalla ligasi di classe I sono derivati quasi tutti i tentativi di costruirla.

Nel 2001 il gruppo di David Bartel aggiunse alla ligasi un dominio ottenuto per selezione e ottenne un ribozima che allunga un innesco appaiato a uno stampo di RNA aggiungendo uno dopo l'altro fino a $14$ nucleotidi trifosfati, scelti secondo la complementarità. La precisione era alta: dei $1100$ nucleotidi aggiunti e sequenziati in un esperimento, $1088$ corrispondevano allo stampo. Il ribozima però era lungo circa duecento nucleotidi, e ne copiava quattordici. Da allora i progressi sono stati continui. Nel 2011 il gruppo di Philipp Holliger, a Cambridge, ottenne una polimerasi capace di sintetizzare catene fino a $95$ nucleotidi e di produrre un ribozima a testa di martello attivo; nel 2013 lo stesso gruppo, facendo evolvere la polimerasi nel ghiaccio, arrivò a catene di $206$ nucleotidi. Nel ghiaccio l'acqua che congela concentra i soluti nelle sottili vene di liquido fra i cristalli, e questo favorisce le reazioni fra molecole diverse.

Nel 2016 Gerald Joyce e David Horning ottennero una polimerasi che amplifica un RNA copiandone alternativamente i due filamenti, come una reazione a catena della polimerasi fatta interamente di RNA, e nel 2024, con Nikolaos Papastavrou, mostrarono un passaggio decisivo. Una polimerasi a RNA con precisione migliorata copiò ripetutamente un ribozima a testa di martello e il suo complementare; le copie furono selezionate per la capacità di tagliare un RNA bersaglio, e in otto cicli di evoluzione catalizzata soltanto da RNA comparvero varianti più facili da copiare e ancora attive. Con una polimerasi meno precisa, nello stesso esperimento, le sequenze accumulavano errori e perdevano la funzione. Nessun ribozima noto, finora, copia per intero una molecola lunga quanto se stesso: il mondo a RNA resta un'ipotesi ben sostenuta, e la sua ricostruzione in laboratorio è un lavoro in corso. Le tappe principali di questa ricerca sono riassunte nella figura 6.

::: figura tappe
{"w":760,"h":340,"items":[{"t":"arrow","p":[40,170,735,170],"c":"ax","w":1.6,"head":8},{"t":"line","p":[112.0,166,112.0,174],"c":"muted","w":1.2},{"t":"line","p":[216.0,166,216.0,174],"c":"muted","w":1.2},{"t":"line","p":[320.0,166,320.0,174],"c":"muted","w":1.2},{"t":"line","p":[424.0,166,424.0,174],"c":"muted","w":1.2},{"t":"line","p":[528.0,166,528.0,174],"c":"muted","w":1.2},{"t":"line","p":[632.0,166,632.0,174],"c":"muted","w":1.2},{"t":"line","p":[80.8,170,80.8,130],"c":"force2","w":1.2},{"t":"circle","p":[80.8,170,4],"c":"force2"},{"t":"text","p":[80.8,94],"s":"1967","c":"force2","size":11},{"t":"text","p":[80.8,108],"s":"Spiegelman:","c":"ax","size":10},{"t":"text","p":[80.8,122],"s":"evoluzione in provetta","c":"ax","size":10},{"t":"line","p":[91.2,170,91.2,210],"c":"force2","w":1.2},{"t":"circle","p":[91.2,170,4],"c":"force2"},{"t":"text","p":[91.2,226],"s":"1968","c":"force2","size":11},{"t":"text","p":[91.2,240],"s":"Crick e Orgel:","c":"ax","size":10},{"t":"text","p":[91.2,254],"s":"prima l’RNA","c":"ax","size":10},{"t":"line","p":[236.8,170,236.8,130],"c":"force","w":1.2},{"t":"circle","p":[236.8,170,4],"c":"force"},{"t":"text","p":[236.8,94],"s":"1982","c":"force","size":11},{"t":"text","p":[236.8,108],"s":"Cech e Altman:","c":"ax","size":10},{"t":"text","p":[236.8,122],"s":"i ribozimi","c":"ax","size":10},{"t":"line","p":[278.4,170,278.4,210],"c":"force","w":1.2},{"t":"circle","p":[278.4,170,4],"c":"force"},{"t":"text","p":[278.4,226],"s":"1986","c":"force","size":11},{"t":"text","p":[278.4,240],"s":"Gilbert: «mondo","c":"ax","size":10},{"t":"text","p":[278.4,254],"s":"a RNA»","c":"ax","size":10},{"t":"line","p":[351.2,170,351.2,78],"c":"force2","w":1.2},{"t":"circle","p":[351.2,170,4],"c":"force2"},{"t":"text","p":[351.2,42],"s":"1993","c":"force2","size":11},{"t":"text","p":[351.2,56],"s":"ligasi da sequenze","c":"ax","size":10},{"t":"text","p":[351.2,70],"s":"casuali","c":"ax","size":10},{"t":"line","p":[424.0,170,424.0,262],"c":"force","w":1.2},{"t":"circle","p":[424.0,170,4],"c":"force"},{"t":"text","p":[424.0,278],"s":"2000","c":"force","size":11},{"t":"text","p":[424.0,292],"s":"il ribosoma","c":"ax","size":10},{"t":"text","p":[424.0,306],"s":"è un ribozima","c":"ax","size":10},{"t":"line","p":[434.4,170,434.4,130],"c":"force3","w":1.2},{"t":"circle","p":[434.4,170,4],"c":"force3"},{"t":"text","p":[434.4,94],"s":"2001","c":"force3","size":11},{"t":"text","p":[434.4,108],"s":"polimerasi:","c":"ax","size":10},{"t":"text","p":[434.4,122],"s":"14 nucleotidi","c":"ax","size":10},{"t":"line","p":[517.6,170,517.6,210],"c":"force4","w":1.2},{"t":"circle","p":[517.6,170,4],"c":"force4"},{"t":"text","p":[517.6,226],"s":"2009","c":"force4","size":11},{"t":"text","p":[517.6,240],"s":"replicazione","c":"ax","size":10},{"t":"text","p":[517.6,254],"s":"autosostenuta","c":"ax","size":10},{"t":"line","p":[559.2,170,559.2,78],"c":"force3","w":1.2},{"t":"circle","p":[559.2,170,4],"c":"force3"},{"t":"text","p":[559.2,42],"s":"2013","c":"force3","size":11},{"t":"text","p":[559.2,56],"s":"nel ghiaccio:","c":"ax","size":10},{"t":"text","p":[559.2,70],"s":"206 nucleotidi","c":"ax","size":10},{"t":"line","p":[673.6,170,673.6,262],"c":"force4","w":1.2},{"t":"circle","p":[673.6,170,4],"c":"force4"},{"t":"text","p":[673.6,278],"s":"2024","c":"force4","size":11},{"t":"text","p":[673.6,292],"s":"evoluzione","c":"ax","size":10},{"t":"text","p":[673.6,306],"s":"catalizzata da RNA","c":"ax","size":10}]}
---
Alcune tappe della ricerca sul mondo a RNA, dalla prima evoluzione in provetta del 1967 all'evoluzione di un ribozima catalizzata soltanto da RNA, nel 2024. Le date si riferiscono alla pubblicazione dei risultati.
:::

::: approfondimento La soglia d'errore
Perché la precisione è così importante? Si supponga che le copie corrette di un ribozima funzionale siano favorite: ogni sua copia esatta ha un vantaggio $s$ nella moltiplicazione rispetto alle varianti difettose. La sequenza funzionale si mantiene nella popolazione se il vantaggio compensa le perdite per errore, cioè se $sQ>1$, con $Q=q^L$. Prendendo i logaritmi si ottiene una lunghezza massima,

$$L<\frac{\ln s}{-\ln q}\simeq\frac{\ln s}{1-q},$$

valida per $q$ vicino a $1$. Con $s=10$ e una precisione di $0{,}99$ per nucleotide, la lunghezza massima è di circa $230$ nucleotidi. Manfred Eigen formulò nel 1971 questa **soglia d'errore**, che lega la precisione della copiatura alla quantità di informazione che un replicatore può conservare. Il tema è sviluppato nel capitolo [Mutazioni e soglia d'errore](unit:biology-12).
:::

## Da dove viene l'RNA? {#origine}

L'ipotesi del mondo a RNA sposta il problema dell'origine della vita più indietro, senza risolverlo: come si è formato il primo RNA? Le difficoltà sono state descritte nei capitoli precedenti. Il ribosio si forma nella reazione del formosio insieme a decine di altri zuccheri e si decompone in fretta; i nucleotidi richiedono che base, zucchero e fosfato si uniscano nel modo giusto, cosa che la chimica prebiotica classica non riusciva a ottenere; servono nucleotidi tutti della stessa forma speculare; e i polimeri devono essere abbastanza lunghi da ripiegarsi in forme catalitiche, alcune decine di nucleotidi almeno. Gerald Joyce e Leslie Orgel definirono il ribozima polimerasi primordiale «il sogno del biologo molecolare», per sottolineare quanto fosse improbabile che emergesse da una miscela prebiotica.

Negli ultimi quindici anni alcune di queste difficoltà si sono attenuate. Nel 2009 il gruppo di John Sutherland ha ottenuto nucleotidi pirimidinici attivati da precursori semplici senza passare dal ribosio libero, e ha poi inserito questa sintesi in una rete di reazioni plausibili su un pianeta giovane, come si è visto nel capitolo [Miller-Urey e la sintesi prebiotica](unit:biology-07). Le superfici delle argille come la montmorillonite favoriscono l'unione di nucleotidi attivati in catene di alcune decine di unità, e i cicli di asciutto e bagnato e il congelamento concentrano i monomeri.

Un'altra possibilità è che l'RNA sia stato preceduto da un polimero più semplice, capace di appaiarsi con l'RNA e di trasmettergli l'informazione. Sono stati sintetizzati diversi candidati: il **TNA**, in cui il ribosio è sostituito da un treosio, uno zucchero a quattro atomi di carbonio, più facile da formare; il **PNA**, in cui lo scheletro di zuccheri e fosfati è sostituito da una catena simile a quella delle proteine. Entrambi formano doppie eliche con l'RNA, e il TNA può evolvere aptameri in provetta. Nessuna traccia di questi polimeri sopravvive nelle cellule, e la loro esistenza nel passato resta un'ipotesi.

## Dall'RNA alle proteine e al DNA {#transizione}

Se il mondo a RNA è esistito, è stato superato. Le proteine hanno preso il posto dei ribozimi in quasi tutte le reazioni e il DNA quello dell'RNA come archivio. Il passaggio avrebbe lasciato due tracce: il ribosoma, ancora fatto in gran parte di RNA, e il codice genetico, che usa RNA di trasporto per associare triplette di basi ad amminoacidi.

Una proposta, ripresa nel manuale di Morris, è che gli amminoacidi siano entrati nel mondo a RNA come cofattori. Molecole simili agli RNA di trasporto, cariche di un amminoacido, avrebbero aiutato i ribozimi a copiare l'RNA, e due amminoacidi tenuti vicini su uno stampo avrebbero potuto unirsi con un legame peptidico. Brevi peptidi capaci di stabilizzare i ribozimi o di accelerarne le reazioni sarebbero stati favoriti dalla selezione; col tempo le catene di amminoacidi, chimicamente più versatili, avrebbero sostituito l'RNA come catalizzatore. Esperimenti di selezione in provetta hanno prodotto ribozimi che legano amminoacidi a RNA, o che formano legami peptidici, compatibili con questo scenario.

Il passaggio al DNA ha vantaggi evidenti. Senza l'ossidrile $2'$ la catena è molto più stabile, e lunghi genomi diventano possibili. La timina al posto dell'uracile permette di riparare un danno frequente: la citosina perde spontaneamente un gruppo amminico e si trasforma in uracile, e in un genoma a DNA ogni uracile è quindi riconoscibile come un errore da correggere, cosa impossibile in un genoma a RNA. Gli enzimi che producono DNA a partire da RNA, come la trascrittasi inversa dei retrovirus, mostrano che il passaggio è chimicamente possibile, e la sintesi dei desossiribonucleotidi dai ribonucleotidi ne è probabilmente il ricordo.

## Un'esperienza: copie con monete e dadi {#esperienza}

La crescita di una popolazione di replicatori e l'effetto degli errori si possono simulare con oggetti semplici, e confrontare con il modello $N_n=N_0(1+f)^n$.

::: metodo Replicatori di carta
**Materiale.** Un centinaio di gettoni o di quadratini di carta, una moneta, un dado, una tabella con le colonne «ciclo», «molecole totali» e «molecole corrette».

**Procedura.** Si parte con quattro gettoni, che rappresentano molecole di RNA corrette. A ogni ciclo, per ogni gettone presente, si lancia la moneta: con testa il gettone viene copiato, e si aggiunge un nuovo gettone; la frazione copiata è quindi $f=0{,}5$. Per ogni copia si lancia anche il dado: se esce $1$ la copia contiene un errore e il nuovo gettone viene segnato con una croce. Una copia di un gettone segnato è anch'essa segnata. Si ripete per sei cicli, registrando dopo ogni ciclo il numero totale di gettoni e quello dei gettoni senza croce.

**Analisi.** Confrontare il totale con $4\cdot1{,}5^n$ e i gettoni corretti con $4\cdot(1+0{,}5\cdot5/6)^n$. Riunire i risultati di più gruppi per ridurre le fluttuazioni, e spiegare perché i risultati di un singolo gruppo si discostano dal modello più di quelli medi. Ripetere con una regola diversa per gli errori, per esempio $1$ o $2$ sul dado, e discutere che cosa succede alla frazione di gettoni corretti.
:::

Dopo sei cicli il modello prevede circa $45{,}6$ gettoni in totale e circa $32{,}3$ gettoni corretti: la frazione corretta scende a circa il $71\%$. Con errori più frequenti la frazione scende più in fretta, e con molti cicli i gettoni corretti diventano una minoranza. In questo gioco, a differenza di una popolazione reale, i gettoni corretti non hanno alcun vantaggio, ed è proprio il vantaggio selettivo $s$ dell'approfondimento sulla soglia d'errore a permettere a una sequenza funzionale di resistere agli errori.

## Errori frequenti {#errori}

::: errore Credere che il mondo a RNA sia stato riprodotto in laboratorio
Nessun ribozima noto copia in modo efficiente un RNA lungo quanto se stesso. I ribozimi polimerasi attuali sintetizzano catene di qualche centinaio di nucleotidi su stampi favorevoli e hanno fatto evolvere piccoli ribozimi, ma la replicazione autonoma di un intero sistema a RNA resta un obiettivo.
:::

::: errore Pensare che i ribozimi siano curiosità di laboratorio
Ribozimi naturali tagliano e ricuciono RNA nelle cellule di oggi, e il legame peptidico di tutte le proteine è catalizzato dall'RNA del ribosoma.
:::

::: errore Confondere crescita esponenziale e crescita parabolica
Una popolazione che cresce del $50\%$ a ogni ciclo cresce in modo esponenziale; un replicatore i cui prodotti restano appaiati cresce come il quadrato del tempo. Solo la prima porta alla selezione di una variante sulle altre.
:::

::: errore Dimenticare gli errori di copiatura
La probabilità di copiare senza errori una molecola di $L$ nucleotidi è $q^L$, che diminuisce rapidamente con la lunghezza: con $q=0{,}99$ vale circa $0{,}37$ per $100$ nucleotidi e $0{,}13$ per $200$. La precisione limita la lunghezza dei geni che una popolazione può conservare.
:::

::: errore Considerare il mondo a RNA come l'inizio assoluto della vita
L'ipotesi descrive una fase in cui l'RNA era insieme gene ed enzima. L'origine dei nucleotidi, la loro omochiralità e la formazione delle prime catene restano problemi distinti, e potrebbe essere esistito un polimero genetico precedente.
:::

## Sintesi {#sintesi}

::: sintesi In breve
- L'RNA porta informazione nella sequenza delle basi e si ripiega in strutture capaci di catalizzare reazioni; l'ipotesi del mondo a RNA propone che sia stato insieme gene ed enzima prima del DNA e delle proteine.
- L'ossidrile $2'$ del ribosio rende l'RNA meno stabile del DNA; le basi si appaiano G–C, A–U e talvolta G–U.
- I ribozimi naturali, scoperti da Cech e Altman, e il ribosoma, il cui sito catalitico è fatto di RNA, sono le prove principali dell'ipotesi; cofattori nucleotidici, sintesi del DNA a partire dall'RNA e viroidi sono considerati fossili molecolari.
- La copiatura su stampo senza enzimi funziona con nucleotidi attivati, ma è lenta, imprecisa e ostacolata dalla stabilità delle doppie eliche.
- Una popolazione che copia a ogni ciclo una frazione $f$ delle molecole cresce come $N_n=N_0(1+f)^n$; un replicatore i cui prodotti restano appaiati cresce in modo parabolico, e in quel caso la selezione non sceglie.
- L'evoluzione in provetta ha prodotto aptameri, ligasi e ribozimi polimerasi che sintetizzano catene di centinaia di nucleotidi e, nel 2024, hanno fatto evolvere un piccolo ribozima.
- La probabilità di una copia esatta è $q^L$: la precisione della copiatura limita la lunghezza dell'informazione conservabile.
- L'origine dell'RNA resta un problema aperto, e un polimero genetico più semplice potrebbe averlo preceduto; il ribosoma e il codice genetico sono le tracce del passaggio alle proteine.
:::

## Glossario {#glossario}

- **Aptamero**: molecola di acido nucleico ottenuta per selezione in provetta, capace di legare in modo specifico una molecola bersaglio.
- **Crescita parabolica**: crescita in cui la velocità è proporzionale alla radice quadrata del numero di molecole, tipica dei replicatori i cui prodotti restano appaiati.
- **Evoluzione in provetta**: cicli ripetuti di selezione, moltiplicazione e mutazione di molecole, condotti in laboratorio.
- **Forcina**: struttura in cui una catena di RNA si ripiega appaiando due suoi tratti complementari, con un'ansa di basi libere in cima.
- **Innesco**: breve tratto di acido nucleico appaiato allo stampo, da cui una polimerasi comincia ad allungare la catena.
- **Ligasi**: catalizzatore che unisce due catene di acido nucleico con un legame fosfodiesterico.
- **Mondo a RNA**: fase ipotetica della storia della vita in cui l'RNA era insieme materiale genetico e catalizzatore.
- **Nucleotide attivato**: nucleotide con un gruppo uscente legato al fosfato, capace di unirsi spontaneamente a un altro nucleotide.
- **Ribosoma**: complesso di RNA e proteine che sintetizza le proteine; il suo sito catalitico è fatto di RNA.
- **Ribozima**: molecola di RNA con attività catalitica.
- **Soglia d'errore**: lunghezza massima di una sequenza che una popolazione di replicatori può conservare con una data precisione di copiatura.
- **Stampo**: catena di acido nucleico la cui sequenza guida, per complementarità, la sintesi di una catena nuova.
- **Viroide**: RNA circolare di poche centinaia di nucleotidi che infetta le piante senza codificare proteine.

## Esercizi {#esercizi}

::: esercizio RNA e DNA [base]
Indicare tre differenze fra RNA e DNA e, per ciascuna, una conseguenza per il ruolo delle due molecole nelle cellule.
>>> soluzione
Lo zucchero dell'RNA ha un ossidrile in posizione $2'$, che rende la catena più facile da spezzare: l'RNA è adatto a messaggi temporanei e a funzioni catalitiche, il DNA a un archivio stabile. L'RNA contiene uracile al posto della timina: nel DNA un uracile, prodotto dalla perdita di un gruppo amminico della citosina, è riconoscibile come un danno da riparare. L'RNA è di solito a filamento singolo e si ripiega in forme tridimensionali, che gli permettono di legare molecole e catalizzare reazioni; il DNA è una doppia elica regolare, adatta a conservare e copiare l'informazione.
:::

::: esercizio Sequenze complementari [base]
Scrivere, nel verso da $5'$ a $3'$, la sequenza complementare di $5'$-GGACU-$3'$ e di $5'$-AUGCGCAU-$3'$. Quale delle due sequenze è autocomplementare, e che cosa significa per la sua copiatura?
>>> soluzione
La complementare di GGACU è AGUCC; quella di AUGCGCAU è di nuovo AUGCGCAU. La seconda è autocomplementare: la sua copia coincide con l'originale, e la molecola può fare da stampo per se stessa senza passare per una forma complementare diversa.
:::

::: esercizio Raddoppi successivi [base]
Una molecola si copia a ogni ciclo con $f=1$. Quante molecole ci sono dopo $4$, $10$ e $20$ cicli, in assenza di limiti?
>>> soluzione
Dopo $4$ cicli $2^4=16$, dopo $10$ cicli $2^{10}=1024$, dopo $20$ cicli $2^{20}=1\,048\,576$, più di un milione.
:::

::: esercizio Metà delle molecole a ogni ciclo [base]
Con $f=0{,}5$ e una molecola iniziale, quante molecole ci sono dopo $10$ cicli? Quanti cicli servono per raddoppiare la popolazione?
>>> soluzione
$N_{10}=1{,}5^{10}\simeq57{,}7$, cioè circa $58$ molecole. Il tempo di raddoppio è $n_2=\ln2/\ln1{,}5\simeq1{,}71$ cicli.
:::

::: esercizio Quante sequenze? [base]
Quante sequenze diverse di RNA lunghe $20$ nucleotidi esistono? E lunghe $220$? Confrontare con le $10^{15}$ molecole della miscela di Bartel e Szostak.
>>> soluzione
Con quattro basi per posizione, $4^{20}\simeq1{,}1\times10^{12}$ sequenze di $20$ nucleotidi: una miscela di $10^{15}$ molecole le contiene tutte, in media un migliaio di volte ciascuna. Le sequenze di $220$ nucleotidi sono $4^{220}=10^{220\log_{10}4}\simeq3\times10^{132}$: la miscela ne contiene una frazione di circa $10^{-118}$.
:::

::: esercizio Lo stelo di una forcina [base]
Lo stelo di una forcina contiene quattro coppie G–C e due coppie A–U. Quanti legami a idrogeno tengono unito lo stelo? Perché gli stampi ricchi di G e C si copiano meglio di quelli ricchi di A e U nella copiatura senza enzimi?
>>> soluzione
I legami sono $4\cdot3+2\cdot2=16$. I monomeri che si appaiano con tre legami restano più a lungo sullo stampo, e hanno più tempo per unirsi ai vicini; quelli che si appaiano con due legami si staccano più spesso prima di reagire.
:::

::: esercizio Mille copie [medio]
Quanti cicli servono, partendo da una molecola, per superare le mille molecole con $f=1$ e con $f=0{,}3$?
>>> soluzione
Serve $(1+f)^n>1000$, cioè $n>\ln1000/\ln(1+f)$. Con $f=1$: $n>9{,}97$, quindi $10$ cicli. Con $f=0{,}3$: $n>26{,}3$, quindi $27$ cicli.
:::

::: esercizio La precisione di una polimerasi [medio]
Nell'esperimento del 2001, $1088$ dei $1100$ nucleotidi aggiunti da un ribozima polimerasi corrispondevano allo stampo. Stimare la precisione per nucleotide e la probabilità di copiare senza errori RNA di $34$, $95$ e $200$ nucleotidi.
>>> soluzione
La precisione è $q=1088/1100\simeq0{,}989$, con un errore ogni novanta nucleotidi circa. Le probabilità di una copia esatta sono

$$\begin{aligned}q^{34}&\simeq0{,}69,\\q^{95}&\simeq0{,}35,\\q^{200}&\simeq0{,}11.\end{aligned}$$

Copiare senza errori una molecola lunga quanto il ribozima stesso, circa duecento nucleotidi, riesce in un caso su nove.
:::

::: esercizio Un giorno di replicazione [medio]
I ribozimi di Lincoln e Joyce raddoppiano in circa un'ora. Di quanto si moltiplicano in un giorno, se i frammenti da unire non si esauriscono?
>>> soluzione
In $24$ ore avvengono $24$ raddoppi, e la popolazione si moltiplica per $2^{24}\simeq1{,}7\times10^7$, quasi diciassette milioni di volte.
:::

::: esercizio La massa di una miscela [medio]
Una miscela contiene $10^{15}$ molecole di RNA lunghe $250$ nucleotidi, con una massa molare media di $330\un{g/mol}$ per nucleotide. Qual è la sua massa?
>>> soluzione
Le moli sono $10^{15}/(6{,}02\times10^{23})\simeq1{,}66\times10^{-9}\un{mol}$, e la massa molare di una molecola è $250\cdot330=82\,500\un{g/mol}$. La massa è

$$1{,}66\times10^{-9}\cdot82\,500\un{g}\simeq1{,}4\times10^{-4}\un{g},$$

circa un decimo di milligrammo: una miscela di un milione di miliardi di sequenze diverse sta in una goccia.
:::

::: esercizio Parabola contro esponenziale [medio]
Un replicatore parabolico parte da $N_0=1$ con $k=0{,}5$ per unità di tempo. Calcolare $N$ dopo $10$ unità di tempo e confrontarlo con un replicatore esponenziale con la stessa velocità iniziale.
>>> soluzione
Nel caso parabolico

$$N=\left(1+\frac{0{,}5\cdot10}{2}\right)^2=3{,}5^2=12{,}25.$$

La velocità iniziale è $k\sqrt{N_0}=0{,}5$, e un replicatore esponenziale con la stessa velocità iniziale cresce come $\mathrm e^{0{,}5t}$: dopo $10$ unità di tempo $\mathrm e^5\simeq148$, dodici volte di più.
:::

::: esercizio Copie esatte in una popolazione [medio]
Un ribozima di $34$ nucleotidi è copiato con $f=1$ e probabilità di copia esatta $Q=0{,}69$. Partendo da una molecola, quante molecole in tutto e quante copie esatte ci sono dopo $10$ cicli?
>>> soluzione
In tutto $2^{10}=1024$ molecole. Le copie esatte crescono come $(1+fQ)^n=1{,}69^{10}\simeq190$: meno di una molecola su cinque è identica all'originale.
:::

::: esercizio La soglia d'errore di una polimerasi [avanzato]
Con la precisione $q=0{,}989$ dell'esercizio sulla polimerasi e un vantaggio selettivo $s=10$ delle copie esatte, stimare la lunghezza massima di un ribozima che la popolazione può conservare. Quale precisione servirebbe per conservare un ribozima di $200$ nucleotidi?
>>> soluzione
La lunghezza massima è

$$L<\frac{\ln10}{-\ln0{,}989}\simeq\frac{2{,}303}{0{,}01106}\simeq208$$

nucleotidi, appena sopra la lunghezza del ribozima. Per $L=200$ serve $-\ln q<\ln10/200\simeq0{,}0115$, cioè $q>0{,}9886$: una polimerasi di questo tipo è al limite, e ogni miglioramento della precisione allarga molto la quantità di informazione conservabile.
:::

::: esercizio Il vantaggio del ghiaccio [avanzato]
Quando il $95\%$ dell'acqua di una soluzione congela, i soluti si concentrano nel liquido residuo. Di quanto aumenta la concentrazione? Se una reazione fra due molecole ha velocità proporzionale al prodotto delle loro concentrazioni, di quanto aumenta la velocità per unità di volume del liquido, e di quanto la quantità di prodotto formato per unità di tempo nell'intero campione?
>>> soluzione
Il liquido residuo è il $5\%$ del volume, e le concentrazioni aumentano di $1/0{,}05=20$ volte. La velocità per unità di volume aumenta di $20^2=400$ volte. Il liquido però occupa solo un ventesimo del volume, e la produzione complessiva aumenta di $400\cdot0{,}05=20$ volte, sempre un vantaggio notevole, al quale si aggiunge la maggiore stabilità dell'RNA al freddo.
:::

::: esercizio Crescita con risorse limitate [avanzato]
Quando i nucleotidi scarseggiano, un modello più realistico è $N_{n+1}=N_n+fN_n(1-N_n/K)$, dove $K$ è il numero massimo di molecole che le risorse permettono. Con $f=1$, $K=1000$ e $N_8\simeq226$, calcolare $N_9$, $N_{10}$ e $N_{11}$ e confrontarli con la crescita geometrica. Per quale valore di $N$ l'aumento in un ciclo è massimo?
>>> soluzione
Si ha

$$\begin{aligned}N_9&\simeq226+226\cdot0{,}774\simeq401,\\N_{10}&\simeq401+401\cdot0{,}599\simeq641,\\N_{11}&\simeq641+641\cdot0{,}359\simeq871.\end{aligned}$$

La crescita geometrica darebbe $512$, $1024$ e $2048$. L'aumento in un ciclo, $fN(1-N/K)$, è una parabola in $N$ con il massimo per $N=K/2=500$, dove vale $fK/4=250$ molecole.
:::

::: esercizio La selezione della velocità [avanzato]
Nell'esperimento di Spiegelman una variante corta produceva nuove copie circa quindici volte più in fretta dell'RNA completo. Si supponga che a ogni trasferimento il rapporto fra varianti e molecole complete aumenti di quindici volte. Partendo da una variante ogni milione di molecole, dopo quanti trasferimenti la variante diventa maggioritaria?
>>> soluzione
Serve $10^{-6}\cdot15^n>1$, cioè

$$n>\frac{6}{\log_{10}15}\simeq5{,}1,$$

quindi sei trasferimenti. La selezione per la velocità è rapidissima, e in poche decine di trasferimenti può sostituire più volte la variante dominante.
:::

## Fonti {#fonti}

Il testo, le figure, gli esempi e gli esercizi di questo capitolo sono originali. Per la scelta e l'ordine degli argomenti i riferimenti principali sono A. M. Shaw, *Astrochemistry: From Astronomy to Astrobiology*, Wiley, 2006, §8.9 (ipotesi del mondo a RNA, modello di autoreplicazione in tre passi, legatura chimica), e J. R. Morris, D. L. Hartl, A. H. Knoll e collaboratori, *Biology: How Life Works*, 2ª edizione, Macmillan, 2016, Caso 1 (la prima cellula), §3.3 (RNA e trascrizione; il primo acido nucleico), §4.2 (traduzione e origine del codice genetico) e §4.3 (struttura delle proteine). Dati ed esperimenti provengono dalle fonti primarie seguenti.

1. C. R. Woese, *The Genetic Code*, Harper & Row, 1967; F. H. C. Crick, *Journal of Molecular Biology* 38, 367 (1968); L. E. Orgel, *Journal of Molecular Biology* 38, 381 (1968).
2. K. Kruger e collaboratori, *Cell* 31, 147 (1982); C. Guerrier-Takada e collaboratori, *Cell* 35, 849 (1983): i primi ribozimi.
3. W. Gilbert, *Nature* 319, 618 (1986): l'espressione «mondo a RNA».
4. N. Ban e collaboratori, *Science* 289, 905 (2000); P. Nissen e collaboratori, *Science* 289, 920 (2000): il ribosoma come ribozima.
5. T. O. Diener, *Virology* 45, 411 (1971); T. O. Diener, *PNAS* 86, 9370 (1989): i viroidi.
6. T. Inoue, L. E. Orgel, *Science* 219, 859 (1983): copiatura su stampo con nucleotidi attivati; G. F. Joyce e collaboratori, *Nature* 310, 602 (1984): inibizione da parte dei monomeri della forma speculare opposta.
7. G. von Kiedrowski, *Angewandte Chemie International Edition* 25, 932 (1986): il primo replicatore chimico.
8. E. Szathmáry, I. Gladkih, *Journal of Theoretical Biology* 138, 55 (1989): crescita parabolica e coesistenza.
9. T. A. Lincoln, G. F. Joyce, *Science* 323, 1229 (2009): replicazione autosostenuta di ribozimi.
10. D. R. Mills, R. L. Peterson, S. Spiegelman, *PNAS* 58, 217 (1967): evoluzione darwiniana in provetta.
11. C. Tuerk, L. Gold, *Science* 249, 505 (1990); A. D. Ellington, J. W. Szostak, *Nature* 346, 818 (1990): selezione in vitro e aptameri.
12. D. P. Bartel, J. W. Szostak, *Science* 261, 1411 (1993): ribozimi ligasi da sequenze casuali.
13. W. K. Johnston e collaboratori, *Science* 292, 1319 (2001); A. Wochner e collaboratori, *Science* 332, 209 (2011); J. Attwater e collaboratori, *Nature Chemistry* 5, 1011 (2013): ribozimi polimerasi.
14. D. P. Horning, G. F. Joyce, *PNAS* 113, 9786 (2016); N. Papastavrou, D. P. Horning, G. F. Joyce, *PNAS* 121, e2321592121 (2024): amplificazione ed evoluzione catalizzate da RNA.
15. M. Eigen, *Die Naturwissenschaften* 58, 465 (1971): la soglia d'errore.
16. G. F. Joyce, L. E. Orgel, in R. F. Gesteland, J. F. Atkins (a cura di), *The RNA World*, Cold Spring Harbor Laboratory Press, 1993.
17. M. W. Powner, B. Gerland, J. D. Sutherland, *Nature* 459, 239 (2009); J. P. Ferris e collaboratori, *Nature* 381, 59 (1996): nucleotidi prebiotici e catene su argille.
18. K. Schöning e collaboratori, *Science* 290, 1347 (2000); P. E. Nielsen e collaboratori, *Science* 254, 1497 (1991): TNA e PNA.
19. K. Adamala, J. W. Szostak, *Science* 342, 1098 (2013); T. Walton, J. W. Szostak, *Journal of the American Chemical Society* 138, 11996 (2016): copiatura in protocellule e intermedi con ponte di imidazolio.
20. M. Illangasekare e collaboratori, *Science* 267, 643 (1995); B. Zhang, T. R. Cech, *Nature* 390, 96 (1997): ribozimi che caricano amminoacidi e formano legami peptidici.
21. Costanti: numero di Avogadro dal valore CODATA 2022.
