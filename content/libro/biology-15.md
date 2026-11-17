---
unit: biology-15
titolo: L'albero universale e LUCA
sottotitolo: Filogenesi molecolare, i tre domini della vita e l'ultimo antenato comune universale
volume: Volume di biologia
fonte: Testo originale; riferimenti principali A. M. Shaw, Astrochemistry, §9.3; J. R. Morris et al., Biology: How Life Works, 2ª ed., §23.1, 23.2, 26.1, 26.6, 27.2
---

## Prima di cominciare {#apertura}

Nel luglio del 1837, nel suo taccuino B, Charles Darwin disegnò un piccolo albero ramificato e scrisse sopra due parole: «I think», io penso. Ventidue anni dopo l'unica figura dell'*Origine delle specie* era ancora un albero, con le specie viventi alle punte dei rami e i loro antenati comuni nei punti in cui i rami si separano. Se tutte le specie discendono con modificazioni da antenati comuni, la loro storia ha la forma di un albero, e risalendo i rami si arriva a un'unica radice.

Per un secolo la radice restò inaccessibile. Gli alberi si costruivano confrontando la forma degli organismi e i fossili, e questi strumenti funzionano bene per animali e piante, male per i microrganismi, che hanno forme semplici e fossili rari, e per nulla per confrontare un batterio con un fungo. La svolta arrivò negli anni Settanta, quando Carl Woese ebbe l'idea di confrontare una molecola presente in tutti i viventi, l'RNA della subunità minore del ribosoma. Nel 1977 scoprì che alcuni microrganismi considerati batteri, i metanogeni, erano diversi dai batteri quanto lo sono gli animali: i viventi si dividono in tre grandi gruppi, i **domini** dei Batteri, degli Archei e degli Eucarioti.

Al punto in cui i rami dei tre domini si congiungono sta l'**ultimo antenato comune universale**, indicato con la sigla inglese **LUCA**, la popolazione da cui discendono tutti gli organismi oggi viventi. Questo capitolo spiega come si leggono e si costruiscono gli alberi filogenetici, perché le differenze fra sequenze molto lontane sottostimano il numero di mutazioni avvenute, come l'RNA ribosomiale ha rivelato i tre domini, come si colloca la radice dell'albero e che cosa sappiamo, o crediamo di sapere, di LUCA: dove viveva, che cosa mangiava, quando è vissuto.

::: obiettivi
- leggere un albero filogenetico, riconoscendo radice, nodi, gruppi fratelli e lunghezze dei rami;
- descrivere i passi della costruzione di un albero a partire da sequenze allineate;
- usare il modello di Jukes e Cantor per correggere le distanze fra sequenze;
- spiegare perché l'RNA ribosomiale è adatto a costruire l'albero universale e descrivere i tre domini;
- spiegare come si radica l'albero universale con i geni duplicati prima di LUCA;
- discutere il trasferimento genico orizzontale e l'ipotesi dei due domini;
- descrivere le caratteristiche attribuite a LUCA e i limiti di queste ricostruzioni.
:::

Il capitolo usa le mutazioni e l'orologio molecolare dei capitoli [Mutazioni e soglia d'errore](unit:biology-12) e [Deriva genetica](unit:biology-14), la via dell'acetil-CoA del capitolo [Sorgenti idrotermali e metabolismo primordiale](unit:biology-09) e la funzione esponenziale del capitolo [Esponenziali e logaritmi](unit:math-c06).

## Leggere un albero {#leggere}

Un **albero filogenetico** rappresenta i rapporti di parentela fra organismi, o fra geni, come una serie di ramificazioni (figura 1). Le punte dei rami sono gli organismi studiati, di solito specie viventi. Ogni **nodo** interno rappresenta l'antenato comune dei gruppi che da esso si separano. La **radice** è l'antenato comune di tutti gli organismi dell'albero. Due gruppi che discendono direttamente dallo stesso nodo sono **gruppi fratelli**: sono più strettamente imparentati fra loro che con qualunque altro gruppo dell'albero. Un gruppo formato da un antenato e da tutti i suoi discendenti si chiama **gruppo monofiletico**, o clade.

::: figura albero
{"w":680,"h":330,"items":[{"t":"text","p":[574,54],"s":"specie A","c":"ax","size":12,"a":"start"},{"t":"text","p":[574,104],"s":"specie B","c":"ax","size":12,"a":"start"},{"t":"text","p":[574,164],"s":"specie C","c":"ax","size":12,"a":"start"},{"t":"text","p":[574,224],"s":"specie D","c":"ax","size":12,"a":"start"},{"t":"text","p":[574,284],"s":"specie E","c":"ax","size":12,"a":"start"},{"t":"line","p":[420,75,420,50],"c":"force2","w":2.4},{"t":"line","p":[420,50,560,50],"c":"force2","w":2.4},{"t":"line","p":[420,75,420,100],"c":"force2","w":2.4},{"t":"line","p":[420,100,560,100],"c":"force2","w":2.4},{"t":"line","p":[320,117,320,75],"c":"force2","w":2.4},{"t":"line","p":[320,75,420,75],"c":"force2","w":2.4},{"t":"line","p":[320,117,320,160],"c":"force2","w":2.4},{"t":"line","p":[320,160,560,160],"c":"force2","w":2.4},{"t":"line","p":[380,250,380,220],"c":"force2","w":2.4},{"t":"line","p":[380,220,560,220],"c":"force2","w":2.4},{"t":"line","p":[380,250,380,280],"c":"force2","w":2.4},{"t":"line","p":[380,280,560,280],"c":"force2","w":2.4},{"t":"line","p":[140,183,140,117],"c":"force2","w":2.4},{"t":"line","p":[140,117,320,117],"c":"force2","w":2.4},{"t":"line","p":[140,183,140,250],"c":"force2","w":2.4},{"t":"line","p":[140,250,380,250],"c":"force2","w":2.4},{"t":"line","p":[100,183,140,183],"c":"force2","w":2.4},{"t":"circle","p":[420,75,5],"c":"force"},{"t":"circle","p":[320,117,5],"c":"force"},{"t":"circle","p":[380,250,5],"c":"force"},{"t":"circle","p":[140,183,6],"c":"force4"},{"t":"text","p":[130,205],"s":"radice","c":"force4","size":12,"a":"end"},{"t":"text","p":[310,142],"s":"nodo: antenato comune","c":"force","size":11,"a":"end"},{"t":"line","p":[470,45,470,105],"c":"force3","w":1.2,"dash":true},{"t":"text","p":[466,128],"s":"gruppi fratelli","c":"force3","size":11,"a":"end"},{"t":"arrow","p":[200,300,540,300],"c":"muted","w":1.2,"head":8},{"t":"text","p":[370,318],"s":"tempo, o numero di cambiamenti","c":"muted","size":11}]}
---
Le parti di un albero filogenetico radicato. Le punte sono gli organismi attuali, i nodi gli antenati comuni, la radice l'antenato di tutti; due gruppi che si separano dallo stesso nodo sono gruppi fratelli. La lunghezza dei rami può indicare il numero di cambiamenti accumulati.
:::

Leggere un albero richiede qualche attenzione. Ciò che conta è l'ordine delle ramificazioni, e l'ordine delle punte lungo il margine è arbitrario: ruotando un ramo attorno al suo nodo l'albero non cambia. Nessuna specie attuale è «più evoluta» di un'altra: tutte le punte hanno alle spalle lo stesso tempo di evoluzione dalla radice, e una specie che si separa vicino alla radice è un parente lontano delle altre, che ha continuato a evolvere per conto proprio, invece di un loro antenato. Quando la lunghezza dei rami è proporzionale al numero di sostituzioni, rami di lunghezza diversa indicano linee che hanno cambiato a velocità diverse.

## Costruire un albero {#costruire}

Gli alberi molecolari si costruiscono confrontando sequenze **omologhe**, cioè derivate da una sequenza ancestrale comune, come le copie dello stesso gene in specie diverse. Il primo passo è l'**allineamento**: si dispongono le sequenze una sotto l'altra in modo che le basi derivate dalla stessa posizione ancestrale si trovino nella stessa colonna, inserendo spazi dove una sequenza ha perso o guadagnato basi.

Dalle sequenze allineate esistono diversi metodi per ricavare un albero. I **metodi di distanza** calcolano per ogni coppia di sequenze una distanza evolutiva e raggruppano per primi gli organismi più vicini; il più semplice, chiamato UPGMA, unisce a ogni passo le due sequenze o i due gruppi più vicini e ricalcola le distanze come medie. Il metodo della **massima parsimonia** cerca l'albero che spiega le sequenze osservate con il minor numero di cambiamenti. I metodi di **massima verosimiglianza** e quelli **bayesiani**, oggi i più usati, cercano l'albero che rende più probabili le sequenze osservate secondo un modello esplicito di come le sequenze cambiano nel tempo. Proprio la necessità di un modello del cambiamento porta al problema della saturazione.

## Quando le differenze ingannano {#saturazione}

Il modo più semplice di misurare la distanza fra due sequenze è contare la frazione $p$ di siti in cui differiscono. Per sequenze vicine funziona bene. Per sequenze lontane sottostima il numero di sostituzioni realmente avvenute, perché in uno stesso sito possono essere avvenute più sostituzioni successive: una A diventata G e poi T mostra una sola differenza, e una A diventata G e poi di nuovo A non ne mostra nessuna. Con il passare del tempo le differenze osservate smettono di crescere e si avvicinano a un valore limite: le sequenze sono **sature**.

Il modello più semplice che descrive questo effetto fu proposto da Thomas Jukes e Charles Cantor nel 1969. Suppone che le quattro basi siano ugualmente frequenti e che ogni base possa sostituirsi con ciascuna delle altre tre con la stessa probabilità, in tutti i siti e in tutte le linee. In queste condizioni due sequenze completamente scorrelate coincidono per caso in un sito su quattro, e differiscono quindi al massimo nei tre quarti dei siti.

::: legge Modello di Jukes e Cantor
Se due sequenze sono separate da $d$ sostituzioni per sito, contando quelle accumulate in entrambe le linee, la frazione attesa di siti diversi è

$$p=\frac34\left(1-\mathrm e^{-4d/3}\right),$$

e in una sequenza di $L$ siti le differenze attese sono $Lp$. Invertendo la relazione si stima la distanza dalle differenze osservate:

$$d=-\frac34\ln\left(1-\frac{4p}{3}\right).$$
:::

Per $d$ piccolo l'esponenziale si approssima con $1-4d/3$ e si ottiene $p\simeq d$: quasi ogni sostituzione produce una differenza visibile. Per $d$ grande $p$ tende a $3/4$ (figura 2).

::: esempio Cento siti
In una sequenza di $100$ siti, con $d=0{,}5$ sostituzioni per sito si attendono $75(1-\mathrm e^{-2/3})\simeq36{,}5$ differenze, con $d=3$ circa $74$, quasi il massimo di $75$. Al contrario, se due sequenze differiscono nel $30\%$ dei siti la distanza stimata è $-0{,}75\ln0{,}6\simeq0{,}38$ sostituzioni per sito, poco più delle differenze osservate; se differiscono nel $70\%$ è circa $2{,}0$, quasi tre volte tanto.
:::

::: figura saturazione
{"w":820,"h":285,"items":[{"t":"axes","o":[80,250],"x":[710,"sostituzioni per sito d"],"y":[240,"frazione di siti diversi p"],"sx":180,"sy":280,"xt":[[0,"0"],[0.5,"0,5"],[1,"1"],[1.5,"1,5"],[2,"2"],[2.5,"2,5"],[3,"3"]],"yt":[[0,"0"],[0.25,"0,25"],[0.5,"0,5"],[0.75,"0,75"]]},{"t":"plot","o":[80,250],"sx":180,"sy":280,"pts":[[0.0,0.0],[0.01,0.0099336],[0.02,0.0197357],[0.03,0.0294079],[0.04,0.038952],[0.05,0.0483698],[0.06,0.0576627],[0.07,0.0668326],[0.08,0.0758811],[0.09,0.0848097],[0.1,0.09362],[0.11,0.1023137],[0.12,0.1108922],[0.13,0.119357],[0.14,0.1277098],[0.15,0.1359519],[0.16,0.1440849],[0.17,0.1521101],[0.18,0.1600291],[0.19,0.1678432],[0.2,0.1755537],[0.21,0.1831622],[0.22,0.1906699],[0.23,0.1980781],[0.24,0.2053882],[0.25,0.2126015],[0.26,0.2197193],[0.27,0.2267428],[0.28,0.2336732],[0.29,0.2405119],[0.3,0.24726],[0.31,0.2539187],[0.32,0.2604892],[0.33,0.2669727],[0.34,0.2733703],[0.35,0.2796832],[0.36,0.2859125],[0.37,0.2920592],[0.38,0.2981246],[0.39,0.3041096],[0.4,0.3100153],[0.41,0.3158429],[0.42,0.3215932],[0.43,0.3272674],[0.44,0.3328664],[0.45,0.3383913],[0.46,0.343843],[0.47,0.3492224],[0.48,0.3545307],[0.49,0.3597686],[0.5,0.3649372],[0.51,0.3700373],[0.52,0.3750698],[0.53,0.3800357],[0.54,0.3849358],[0.55,0.389771],[0.56,0.3945422],[0.57,0.3992502],[0.58,0.4038958],[0.59,0.4084799],[0.6,0.4130033],[0.61,0.4174667],[0.62,0.4218711],[0.63,0.4262171],[0.64,0.4305056],[0.65,0.4347372],[0.66,0.4389128],[0.67,0.4430331],[0.68,0.4470988],[0.69,0.4511107],[0.7,0.4550695],[0.71,0.4589758],[0.72,0.4628303],[0.73,0.4666339],[0.74,0.470387],[0.75,0.4740904],[0.76,0.4777448],[0.77,0.4813508],[0.78,0.484909],[0.79,0.4884201],[0.8,0.4918847],[0.81,0.4953034],[0.82,0.4986768],[0.83,0.5020055],[0.84,0.5052902],[0.85,0.5085313],[0.86,0.5117295],[0.87,0.5148854],[0.88,0.5179994],[0.89,0.5210722],[0.9,0.5241043],[0.91,0.5270963],[0.92,0.5300486],[0.93,0.5329618],[0.94,0.5358365],[0.95,0.538673],[0.96,0.541472],[0.97,0.5442339],[0.98,0.5469593],[0.99,0.5496485],[1.0,0.5523021],[1.01,0.5549206],[1.02,0.5575044],[1.03,0.560054],[1.04,0.5625698],[1.05,0.5650523],[1.06,0.5675019],[1.07,0.569919],[1.08,0.5723042],[1.09,0.5746577],[1.1,0.5769801],[1.11,0.5792717],[1.12,0.581533],[1.13,0.5837643],[1.14,0.5859661],[1.15,0.5881387],[1.16,0.5902825],[1.17,0.5923979],[1.18,0.5944854],[1.19,0.5965451],[1.2,0.5985776],[1.21,0.6005832],[1.22,0.6025622],[1.23,0.604515],[1.24,0.6064419],[1.25,0.6083433],[1.26,0.6102195],[1.27,0.6120709],[1.28,0.6138977],[1.29,0.6157004],[1.3,0.6174792],[1.31,0.6192344],[1.32,0.6209664],[1.33,0.6226754],[1.34,0.6243618],[1.35,0.6260258],[1.36,0.6276679],[1.37,0.6292881],[1.38,0.6308869],[1.39,0.6324646],[1.4,0.6340213],[1.41,0.6355574],[1.42,0.6370732],[1.43,0.6385689],[1.44,0.6400448],[1.45,0.6415011],[1.46,0.6429382],[1.47,0.6443562],[1.48,0.6457554],[1.49,0.6471361],[1.5,0.6484985],[1.51,0.6498429],[1.52,0.6511695],[1.53,0.6524785],[1.54,0.6537701],[1.55,0.6550447],[1.56,0.6563023],[1.57,0.6575434],[1.58,0.6587679],[1.59,0.6599763],[1.6,0.6611686],[1.61,0.6623452],[1.62,0.6635062],[1.63,0.6646518],[1.64,0.6657822],[1.65,0.6668976],[1.66,0.6679983],[1.67,0.6690844],[1.68,0.6701561],[1.69,0.6712136],[1.7,0.6722572],[1.71,0.6732868],[1.72,0.6743029],[1.73,0.6753055],[1.74,0.6762948],[1.75,0.677271],[1.76,0.6782343],[1.77,0.6791848],[1.78,0.6801228],[1.79,0.6810483],[1.8,0.6819615],[1.81,0.6828627],[1.82,0.6837519],[1.83,0.6846294],[1.84,0.6854952],[1.85,0.6863495],[1.86,0.6871926],[1.87,0.6880245],[1.88,0.6888453],[1.89,0.6896553],[1.9,0.6904546],[1.91,0.6912432],[1.92,0.6920214],[1.93,0.6927894],[1.94,0.6935471],[1.95,0.6942948],[1.96,0.6950326],[1.97,0.6957607],[1.98,0.696479],[1.99,0.6971879],[2.0,0.6978874],[2.01,0.6985776],[2.02,0.6992587],[2.03,0.6999308],[2.04,0.7005939],[2.05,0.7012483],[2.06,0.701894],[2.07,0.7025312],[2.08,0.7031599],[2.09,0.7037803],[2.1,0.7043925],[2.11,0.7049965],[2.12,0.7055926],[2.13,0.7061808],[2.14,0.7067611],[2.15,0.7073338],[2.16,0.7078989],[2.17,0.7084565],[2.18,0.7090068],[2.19,0.7095497],[2.2,0.7100855],[2.21,0.7106142],[2.22,0.7111358],[2.23,0.7116506],[2.24,0.7121585],[2.25,0.7126597],[2.26,0.7131543],[2.27,0.7136423],[2.28,0.7141238],[2.29,0.714599],[2.3,0.7150679],[2.31,0.7155306],[2.32,0.7159871],[2.33,0.7164376],[2.34,0.7168821],[2.35,0.7173208],[2.36,0.7177536],[2.37,0.7181807],[2.38,0.7186021],[2.39,0.719018],[2.4,0.7194283],[2.41,0.7198333],[2.42,0.7202328],[2.43,0.7206271],[2.44,0.7210161],[2.45,0.7214],[2.46,0.7217788],[2.47,0.7221526],[2.48,0.7225214],[2.49,0.7228854],[2.5,0.7232445],[2.51,0.7235989],[2.52,0.7239486],[2.53,0.7242936],[2.54,0.7246341],[2.55,0.72497],[2.56,0.7253016],[2.57,0.7256287],[2.58,0.7259515],[2.59,0.72627],[2.6,0.7265843],[2.61,0.7268944],[2.62,0.7272005],[2.63,0.7275024],[2.64,0.7278004],[2.65,0.7280945],[2.66,0.7283846],[2.67,0.7286709],[2.68,0.7289534],[2.69,0.7292321],[2.7,0.7295072],[2.71,0.7297786],[2.72,0.7300465],[2.73,0.7303107],[2.74,0.7305715],[2.75,0.7308289],[2.76,0.7310828],[2.77,0.7313333],[2.78,0.7315806],[2.79,0.7318245],[2.8,0.7320653],[2.81,0.7323028],[2.82,0.7325372],[2.83,0.7327685],[2.84,0.7329967],[2.85,0.7332219],[2.86,0.7334441],[2.87,0.7336634],[2.88,0.7338798],[2.89,0.7340933],[2.9,0.734304],[2.91,0.7345119],[2.92,0.734717],[2.93,0.7349194],[2.94,0.7351192],[2.95,0.7353163],[2.96,0.7355108],[2.97,0.7357027],[2.98,0.735892],[2.99,0.7360789],[3.0,0.7362633]],"c":"force2","w":2.6},{"t":"plot","o":[80,250],"sx":180,"sy":280,"pts":[[0.0,0.0],[0.01,0.01],[0.02,0.02],[0.03,0.03],[0.04,0.04],[0.05,0.05],[0.06,0.06],[0.07,0.07],[0.08,0.08],[0.09,0.09],[0.1,0.1],[0.11,0.11],[0.12,0.12],[0.13,0.13],[0.14,0.14],[0.15,0.15],[0.16,0.16],[0.17,0.17],[0.18,0.18],[0.19,0.19],[0.2,0.2],[0.21,0.21],[0.22,0.22],[0.23,0.23],[0.24,0.24],[0.25,0.25],[0.26,0.26],[0.27,0.27],[0.28,0.28],[0.29,0.29],[0.3,0.3],[0.31,0.31],[0.32,0.32],[0.33,0.33],[0.34,0.34],[0.35,0.35],[0.36,0.36],[0.37,0.37],[0.38,0.38],[0.39,0.39],[0.4,0.4],[0.41,0.41],[0.42,0.42],[0.43,0.43],[0.44,0.44],[0.45,0.45],[0.46,0.46],[0.47,0.47],[0.48,0.48],[0.49,0.49],[0.5,0.5],[0.51,0.51],[0.52,0.52],[0.53,0.53],[0.54,0.54],[0.55,0.55],[0.56,0.56],[0.57,0.57],[0.58,0.58],[0.59,0.59],[0.6,0.6],[0.61,0.61],[0.62,0.62],[0.63,0.63],[0.64,0.64],[0.65,0.65],[0.66,0.66],[0.67,0.67],[0.68,0.68],[0.69,0.69],[0.7,0.7],[0.71,0.71],[0.72,0.72],[0.73,0.73],[0.74,0.74],[0.75,0.75]],"c":"muted","w":1.2,"dash":true},{"t":"line","p":[80,40.0,620,40.0],"c":"force","w":1.2,"dash":true},{"t":"text","p":[628,44.0],"s":"limite 3/4","c":"force","size":11,"a":"start"},{"t":"text","p":[183.6,72.4],"s":"p = d","c":"muted","size":11,"a":"end"},{"t":"circle","p":[170.0,147.8,5],"c":"force4"},{"t":"circle","p":[620,43.8,5],"c":"force4"},{"t":"text","p":[180.0,161.8],"s":"d = 0,5: p ≈ 0,365","c":"force4","size":11,"a":"start"}]}
---
Frazione di siti diversi in funzione del numero di sostituzioni per sito secondo il modello di Jukes e Cantor. Per distanze piccole la frazione coincide con la distanza, linea tratteggiata; per distanze grandi si avvicina al limite di $3/4$, e le differenze osservate non distinguono più fra divergenze molto diverse.
:::

La saturazione è il problema centrale della filogenesi profonda. Vicino al limite di $3/4$ una piccola incertezza sulla frazione osservata produce un'incertezza enorme sulla distanza stimata: la derivata di $d$ rispetto a $p$ vale $1/(1-4p/3)$ e diverge per $p\to3/4$. Per questo gli alberi che risalgono a miliardi di anni fa si costruiscono con i geni che cambiano più lentamente, con le sequenze delle proteine invece che del DNA, e con modelli molto più ricchi di quello di Jukes e Cantor, che tengono conto delle diverse frequenze delle basi e delle diverse velocità di cambiamento dei siti.

## L'RNA ribosomiale e i tre domini {#domini}

Per costruire un albero di tutti i viventi serve una molecola che soddisfi condizioni severe. Deve essere presente in tutti gli organismi, con la stessa funzione, così da poter confrontare l'omologo con l'omologo. Deve cambiare abbastanza lentamente da restare lontana dalla saturazione su distanze di miliardi di anni, e avere anche regioni più variabili, utili per i rami recenti. Deve essere passata raramente da un organismo all'altro per vie diverse dalla discendenza. Woese scelse l'**RNA della subunità minore del ribosoma**, chiamato 16S nei procarioti, dal suo coefficiente di sedimentazione, e 18S negli eucarioti: una molecola di circa $1500$ nucleotidi nei batteri, essenziale per la traduzione e quindi molto conservata.

Negli anni Settanta Woese e George Fox digerivano l'RNA ribosomiale con un enzima che lo taglia dopo ogni guanina e confrontavano i cataloghi dei frammenti ottenuti. Nel 1977 i metanogeni, analizzati con questo metodo, risultarono tanto diversi dai batteri quanto dagli eucarioti. Woese chiamò il nuovo gruppo archeobatteri, e nel 1990, con Otto Kandler e Mark Wheelis, propose di dividere i viventi in tre domini: **Bacteria**, **Archaea** ed **Eucarya** (figura 3).

::: figura domini
{"w":790,"h":290,"items":[{"t":"text","p":[160,24],"s":"tre domini","c":"ax","size":12},{"t":"line","p":[20,160,50,160],"c":"force4","w":2.4},{"t":"circle","p":[50,160,5],"c":"force4"},{"t":"text","p":[46,184],"s":"LUCA","c":"force4","size":11,"a":"end"},{"t":"line","p":[50,160,50,70],"c":"force2","w":2.4},{"t":"line","p":[50,70,260,70],"c":"force2","w":2.4},{"t":"text","p":[266,74],"s":"Batteri","c":"force2","size":12,"a":"start"},{"t":"line","p":[50,160,50,220],"c":"force3","w":2.4},{"t":"line","p":[50,220,140,220],"c":"force3","w":2.4},{"t":"line","p":[140,220,140,190],"c":"force3","w":2.4},{"t":"line","p":[140,190,260,190],"c":"force3","w":2.4},{"t":"line","p":[140,220,140,250],"c":"force","w":2.4},{"t":"line","p":[140,250,260,250],"c":"force","w":2.4},{"t":"text","p":[266,194],"s":"Archei","c":"force3","size":12,"a":"start"},{"t":"text","p":[266,254],"s":"Eucarioti","c":"force","size":12,"a":"start"},{"t":"text","p":[550,24],"s":"due domini","c":"ax","size":12},{"t":"line","p":[410,160,440,160],"c":"force4","w":2.4},{"t":"circle","p":[440,160,5],"c":"force4"},{"t":"text","p":[436,184],"s":"LUCA","c":"force4","size":11,"a":"end"},{"t":"line","p":[440,160,440,70],"c":"force2","w":2.4},{"t":"line","p":[440,70,650,70],"c":"force2","w":2.4},{"t":"text","p":[656,74],"s":"Batteri","c":"force2","size":12,"a":"start"},{"t":"line","p":[440,160,440,210],"c":"force3","w":2.4},{"t":"line","p":[440,210,510,210],"c":"force3","w":2.4},{"t":"line","p":[510,210,510,160],"c":"force3","w":2.4},{"t":"line","p":[510,160,650,160],"c":"force3","w":2.4},{"t":"line","p":[510,210,510,240],"c":"force3","w":2.4},{"t":"line","p":[510,240,570,240],"c":"force3","w":2.4},{"t":"line","p":[570,240,570,220],"c":"force3","w":2.4},{"t":"line","p":[570,220,650,220],"c":"force3","w":2.4},{"t":"line","p":[570,240,570,262],"c":"force","w":2.4},{"t":"line","p":[570,262,650,262],"c":"force","w":2.4},{"t":"text","p":[656,164],"s":"altri Archei","c":"force3","size":12,"a":"start"},{"t":"text","p":[656,224],"s":"Asgard","c":"force3","size":12,"a":"start"},{"t":"text","p":[656,266],"s":"Eucarioti","c":"force","size":12,"a":"start"},{"t":"line","p":[390,40,390,280],"c":"muted","w":1,"dash":true}]}
---
Due rappresentazioni dell'albero universale. A sinistra lo schema a tre domini di Woese, Kandler e Wheelis, con la radice fra i Batteri e gli altri due domini. A destra lo schema a due domini sostenuto dalle analisi più recenti, in cui gli eucarioti nascono all'interno degli archei, vicino al gruppo di Asgard.
:::

Gli archei sono procarioti come i batteri: non hanno un nucleo delimitato da membrane e portano i geni su un cromosoma circolare. Ma le loro membrane sono fatte di lipidi diversi, con catene di isoprenoidi legate al glicerolo da legami etere invece che estere, e la loro parete cellulare non contiene il peptidoglicano dei batteri. La loro RNA polimerasi e i loro ribosomi somigliano a quelli degli eucarioti, e molti antibiotici che bloccano la sintesi delle proteine nei batteri non hanno effetto su di essi. I primi archei studiati vivevano in ambienti estremi, sorgenti calde, saline, acque acidissime; oggi sappiamo che sono comuni anche nel suolo, nei laghi e nell'oceano aperto.

## Dove sta la radice? {#radice}

Un albero costruito con le sole sequenze è privo di radice: indica quali organismi sono più vicini fra loro, senza dire quale ramo si è separato per primo. Per gli alberi di un singolo gruppo la radice si trova aggiungendo un **gruppo esterno**, un organismo sicuramente più lontano da tutti gli altri: la radice sta fra il gruppo esterno e il resto. Per l'albero universale questo metodo è impossibile, perché non esiste un organismo esterno alla vita.

Nel 1989 due gruppi, quello di Peter Gogarten e quello di Naoyuki Iwabe, risolsero il problema con un'idea ingegnosa. Alcuni geni presenti in tutti i domini esistono in due copie simili, nate dalla duplicazione di un gene ancestrale avvenuta prima di LUCA: per esempio i due fattori di allungamento della traduzione, che sono proteine imparentate, o due subunità dell'ATP sintasi. Le due copie formano due alberi paralleli, e ciascuno può servire da gruppo esterno per l'altro (figura 4). Entrambi gli studi collocarono la radice fra i Batteri da una parte e gli Archei e gli Eucarioti dall'altra: archei ed eucarioti sono gruppi fratelli.

::: figura radice
{"w":680,"h":310,"items":[{"t":"text","p":[30,160],"s":"gene ancestrale","c":"ax","size":11,"a":"start"},{"t":"line","p":[30,170,70,170],"c":"ax","w":2.4},{"t":"circle","p":[70,170,6],"c":"force4"},{"t":"text","p":[78,196],"s":"duplicazione","c":"force4","size":11,"a":"start"},{"t":"text","p":[78,210],"s":"prima di LUCA","c":"force4","size":11,"a":"start"},{"t":"line","p":[70,170,70,95],"c":"force2","w":2.4},{"t":"line","p":[70,95,150,95],"c":"force2","w":2.4},{"t":"line","p":[150,95,150,40],"c":"force2","w":2.4},{"t":"line","p":[150,40,520,40],"c":"force2","w":2.4},{"t":"line","p":[150,95,150,120],"c":"force2","w":2.4},{"t":"line","p":[150,120,300,120],"c":"force2","w":2.4},{"t":"line","p":[300,120,300,100],"c":"force2","w":2.4},{"t":"line","p":[300,100,520,100],"c":"force2","w":2.4},{"t":"line","p":[300,120,300,140],"c":"force2","w":2.4},{"t":"line","p":[300,140,520,140],"c":"force2","w":2.4},{"t":"text","p":[526,44],"s":"Batteri α","c":"force2","size":12,"a":"start"},{"t":"text","p":[526,104],"s":"Archei α","c":"force2","size":12,"a":"start"},{"t":"text","p":[526,144],"s":"Eucarioti α","c":"force2","size":12,"a":"start"},{"t":"circle","p":[150,95,5],"c":"force2"},{"t":"line","p":[70,170,70,245],"c":"force","w":2.4},{"t":"line","p":[70,245,150,245],"c":"force","w":2.4},{"t":"line","p":[150,245,150,190],"c":"force","w":2.4},{"t":"line","p":[150,190,520,190],"c":"force","w":2.4},{"t":"line","p":[150,245,150,270],"c":"force","w":2.4},{"t":"line","p":[150,270,300,270],"c":"force","w":2.4},{"t":"line","p":[300,270,300,250],"c":"force","w":2.4},{"t":"line","p":[300,250,520,250],"c":"force","w":2.4},{"t":"line","p":[300,270,300,290],"c":"force","w":2.4},{"t":"line","p":[300,290,520,290],"c":"force","w":2.4},{"t":"text","p":[526,194],"s":"Batteri β","c":"force","size":12,"a":"start"},{"t":"text","p":[526,254],"s":"Archei β","c":"force","size":12,"a":"start"},{"t":"text","p":[526,294],"s":"Eucarioti β","c":"force","size":12,"a":"start"},{"t":"circle","p":[150,245,5],"c":"force"},{"t":"text","p":[156,80],"s":"LUCA (copia α)","c":"force2","size":10,"a":"start"},{"t":"text","p":[156,230],"s":"LUCA (copia β)","c":"force","size":10,"a":"start"}]}
---
Come si radica l'albero universale con geni duplicati prima di LUCA. Un gene ancestrale si duplica nelle copie $\alpha$ e $\beta$; entrambe si trasmettono a tutti i domini. Nell'albero completo le copie $\beta$ fanno da gruppo esterno per le copie $\alpha$, e viceversa, e la radice si trova sul ramo che separa i Batteri dagli altri domini.
:::

Lo stesso metodo è stato poi applicato a molti altri geni duplicati prima di LUCA, ed è anche la base delle stime più recenti dell'età di LUCA, che datano le duplicazioni e le separazioni successive con l'orologio molecolare. La posizione della radice fra Batteri e Archei è oggi la più accettata, anche se alcuni studi la discutono.

## Un albero o una rete? {#rete}

L'immagine dell'albero suppone che i geni passino soltanto da genitori a figli. Nei procarioti non è così. Batteri e archei acquisiscono geni da altri organismi, anche lontanissimi, per **trasferimento genico orizzontale**: assorbono DNA dall'ambiente, lo ricevono da un'altra cellula attraverso un contatto diretto, o lo ricevono da un virus che lo ha prelevato da una cellula precedente. La diffusione rapida della resistenza agli antibiotici fra specie diverse di batteri patogeni è l'esempio più noto. Sequenziando interi genomi si è scoperto che una parte rilevante dei geni di molti procarioti ha una storia diversa da quella del resto del genoma.

Nel 1999 W. Ford Doolittle propose di sostituire l'albero con una rete, almeno alla base: i rami si scambiano continuamente materiale, e storie diverse dei singoli geni si sovrappongono (figura 5). Gli alberi universali si costruiscono quindi con i geni meno soggetti al trasferimento, soprattutto quelli del ribosoma e della trascrizione, che lavorano in grandi complessi in cui un pezzo estraneo funzionerebbe male. Per le ricostruzioni di LUCA il trasferimento orizzontale è un problema serio: un gene presente in batteri e archei potrebbe essere stato ereditato da LUCA, oppure essere passato da un dominio all'altro molto dopo. I metodi moderni confrontano l'albero di ogni gene con quello delle specie per distinguere i due casi.

::: figura rete
{"w":700,"h":300,"items":[{"t":"line","p":[80,60,620,60],"c":"force2","w":2.4},{"t":"text","p":[630,64],"s":"linea 1","c":"ax","size":12,"a":"start"},{"t":"line","p":[80,120,620,120],"c":"force3","w":2.4},{"t":"text","p":[630,124],"s":"linea 2","c":"ax","size":12,"a":"start"},{"t":"line","p":[80,180,620,180],"c":"force","w":2.4},{"t":"text","p":[630,184],"s":"linea 3","c":"ax","size":12,"a":"start"},{"t":"line","p":[80,240,620,240],"c":"force4","w":2.4},{"t":"text","p":[630,244],"s":"linea 4","c":"ax","size":12,"a":"start"},{"t":"line","p":[80,60,80,240],"c":"ax","w":2.4},{"t":"line","p":[40,150,80,150],"c":"ax","w":2.4},{"t":"arrow","p":[220,60,260,120],"c":"muted","w":1.4,"head":8},{"t":"poly","pts":[[220,60],[260,120]],"c":"muted","w":1.4,"dash":true},{"t":"arrow","p":[330,180,370,60],"c":"muted","w":1.4,"head":8},{"t":"poly","pts":[[330,180],[370,60]],"c":"muted","w":1.4,"dash":true},{"t":"arrow","p":[450,240,490,120],"c":"muted","w":1.4,"head":8},{"t":"poly","pts":[[450,240],[490,120]],"c":"muted","w":1.4,"dash":true},{"t":"arrow","p":[540,120,580,240],"c":"muted","w":1.4,"head":8},{"t":"poly","pts":[[540,120],[580,240]],"c":"muted","w":1.4,"dash":true},{"t":"text","p":[350,288],"s":"frecce tratteggiate: geni trasferiti fra linee diverse","c":"muted","size":11}]}
---
Albero e rete. Le linee continue sono la discendenza verticale da genitori a figli; le frecce tratteggiate rappresentano trasferimenti orizzontali di geni fra linee diverse. Un gene trasferito ha una storia diversa da quella dell'organismo che lo porta.
:::

## Due domini o tre? {#asgard}

Lo schema a tre domini colloca gli eucarioti come gruppo fratello degli archei. Già nel 1984 James Lake aveva proposto un'alternativa, l'ipotesi degli eociti: gli eucarioti sarebbero nati dentro gli archei, da un gruppo particolare di archei. Le analisi degli ultimi quindici anni, con molti geni e modelli più realistici, la sostengono. Nel 2015 il gruppo di Thijs Ettema identificò in sedimenti marini profondi vicini a una sorgente idrotermale fra la Groenlandia e la Norvegia, chiamata il Castello di Loki, il DNA di archei sconosciuti, i Lokiarchaeota, con geni prima ritenuti esclusivi degli eucarioti, legati al citoscheletro e al traffico di membrane. Il gruppo a cui appartengono, chiamato di **Asgard**, è risultato il parente più stretto degli eucarioti.

Nel 2020 un gruppo giapponese, dopo dodici anni di tentativi, riuscì a coltivare in laboratorio un archeo di Asgard, *Prometheoarchaeum syntrophicum*, che cresce lentissimamente in associazione con batteri e forma lunghe protrusioni. Nel 2023 un'analisi con molti genomi nuovi collocò gli eucarioti all'interno di un ramo di Asgard, gli Heimdallarchaeia. Se questo quadro è corretto, i domini primari sono due, Batteri e Archei, e gli eucarioti sono archei che hanno incorporato un batterio, il futuro mitocondrio: è il tema del capitolo [Ossigeno, endosimbiosi e cellule complesse](unit:biology-17).

## Che cosa sappiamo di LUCA {#luca}

LUCA è il nodo da cui si separano Batteri e Archei. È importante capire che cosa questa definizione implica. LUCA era preceduto da una lunga storia, forse dal mondo a RNA, e il suo genoma e il suo ribosoma erano già il prodotto di molta evoluzione. Inoltre viveva in una popolazione e in un ecosistema, con altri organismi le cui linee si sono estinte, come le contemporanee dell'Eva mitocondriale del capitolo [Deriva genetica](unit:biology-14).

Le caratteristiche comuni a tutti i viventi attuali danno un ritratto minimo di LUCA. Aveva il DNA come materiale genetico, lo trascriveva in RNA e lo traduceva in proteine con ribosomi e con il codice genetico universale. Usava i venti amminoacidi nella forma L e l'ATP come moneta energetica, e probabilmente un'ATP sintasi di membrana alimentata da un gradiente di ioni. Le ricostruzioni più dettagliate confrontano migliaia di famiglie di geni per stabilire quali risalgono a LUCA.

Nel 2016 il gruppo di William Martin, come si è visto nel capitolo [Sorgenti idrotermali e metabolismo primordiale](unit:biology-09), identificò $355$ famiglie di proteine attribuibili a LUCA con criteri severi, e ne ricavò il ritratto di un organismo anaerobico, che fissava il diossido di carbonio con la via dell'acetil-CoA, dipendeva dall'idrogeno e viveva probabilmente in un ambiente idrotermale caldo. Nel 2024 un gruppo internazionale guidato da Edmund Moody e Philip Donoghue, con metodi che tengono conto delle perdite di geni e dei trasferimenti orizzontali, stimò un genoma di almeno $2{,}5$ milioni di basi con circa $2600$ proteine, paragonabile a quello di un procariote attuale, e un metabolismo da acetogeno anaerobico. LUCA avrebbe avuto anche un sistema di difesa contro i virus simile a quello dei batteri attuali, segno che i virus esistevano già e che LUCA faceva parte di un ecosistema complesso.

La temperatura a cui viveva LUCA è discussa. La vicinanza alla radice di molti batteri e archei ipertermofili suggerì a lungo un antenato amante del calore, e Shaw ne deduce un'origine comune in sorgenti calde. Nel 2008 però Bastien Boussau e collaboratori, stimando dalle sequenze ricostruite la composizione delle proteine e dell'RNA ribosomiale ancestrali, conclusero che LUCA era probabilmente mesofilo, adatto a temperature moderate, e che i suoi primi discendenti, gli antenati dei Batteri e degli Archei, si adattarono indipendentemente al calore. Lo stesso anno Eric Gaucher e collaboratori ricostruirono in laboratorio versioni ancestrali di una proteina della traduzione e ne misurarono la resistenza al calore, trovando ambienti antichi più caldi di quelli attuali. Le due conclusioni non sono necessariamente in contrasto, e la questione resta aperta.

## Quando visse LUCA? {#quando}

Datare LUCA è difficile, perché l'orologio molecolare va calibrato con fossili, e i fossili di microrganismi più antichi sono pochi e discussi. Il limite più recente viene dalle prime tracce sicure di vita, di circa $3{,}5$ miliardi di anni fa, descritte nel capitolo [Le prime tracce della vita e il tempo geologico](unit:biology-16): LUCA deve essere più antico dei batteri e degli archei che le hanno lasciate. Il limite più antico viene dall'abitabilità della Terra: un pianeta con oceani liquidi esisteva almeno da circa $4{,}4$ miliardi di anni fa, come mostrano i cristalli di zircone più antichi.

Lo studio del 2024 usò i geni duplicati prima di LUCA per datarne la separazione con un orologio calibrato con fossili e con indizi isotopici, e stimò che LUCA visse circa $4{,}2$ miliardi di anni fa, con un intervallo fra $4{,}09$ e $4{,}33$ miliardi di anni. Se la stima è corretta, la vita era già complessa poche centinaia di milioni di anni dopo la formazione della Terra, circa $4{,}5$ miliardi di anni fa, e forse durante il periodo in cui il pianeta subiva ancora impatti frequenti di grandi asteroidi.

## LUCA e la ricerca di vita altrove {#altrove}

La ricostruzione di LUCA ha tre conseguenze per l'astrobiologia. La prima riguarda la rapidità: se la vita compare e si diversifica poco dopo che un pianeta diventa abitabile, l'origine della vita potrebbe essere un evento frequente nelle condizioni giuste, un argomento usato per stimare il numero di pianeti abitati, discusso nel capitolo [Tecnofirme, SETI ed equazione di Drake](unit:biology-35). L'argomento ha però un limite statistico: abbiamo un solo esempio, e il fatto stesso di esistere ci obbliga a osservare un pianeta in cui la vita è comparsa.

La seconda riguarda la parentela. Tutti gli organismi conosciuti stanno sullo stesso albero. Un organismo trovato su Marte o su Encelado che si collocasse dentro l'albero, magari vicino ai batteri terrestri, indicherebbe una contaminazione o uno scambio di materiale fra pianeti; un organismo impossibile da collocare, con un codice o una chimica diversi, indicherebbe una seconda origine. La terza riguarda gli ambienti: un LUCA anaerobico che usava idrogeno e diossido di carbonio vivrebbe bene, oggi, nell'oceano di Encelado, dove la sonda Cassini ha trovato proprio idrogeno e diossido di carbonio.

## Un'esperienza: un albero con carta e matita {#esperienza}

Un piccolo albero si costruisce a mano con quattro sequenze allineate di venti basi, che rappresentano un gene in quattro specie immaginarie.

::: metodo Distanze e raggruppamenti
**Materiale.** Un foglio, una matita, una calcolatrice con il logaritmo naturale, e le quattro sequenze seguenti, già allineate:

- S1: ACGTTGCAAGTCCTGAAGCT
- S2: ACGTTGCAAGTCCTGTAGCT
- S3: ACGATGCAAGTGCTGTAGCA
- S4: TCGATCCAGGTGCAGTAGCA

**Procedura.** Per ogni coppia di sequenze contare i siti diversi e dividere per $20$, ottenendo la frazione $p$. Calcolare la distanza corretta $d=-0{,}75\ln(1-4p/3)$. Costruire l'albero con il metodo UPGMA: unire le due sequenze più vicine in un gruppo, ricalcolare le distanze del gruppo dalle altre sequenze come media delle distanze dei suoi membri, e ripetere fino a unire tutte le sequenze. Disegnare l'albero con nodi all'altezza di metà della distanza fra i gruppi uniti.

**Analisi.** Confrontare le frazioni $p$ con le distanze corrette $d$. Per quali coppie la correzione è più grande, e perché? Verificare che l'albero ottenuto con le distanze corrette ha lo stesso ordine di ramificazione di quello ottenuto con le frazioni $p$. Discutere quale sequenza conviene usare come gruppo esterno per radicare l'albero.
:::

Le differenze sono $1$ fra S1 e S2, $4$ fra S1 e S3, $3$ fra S2 e S3, $8$ fra S1 e S4, $7$ fra S2 e S4 e $4$ fra S3 e S4. Il metodo unisce prima S1 e S2, poi il loro gruppo a S3, infine S4 (figura 6). La correzione di Jukes e Cantor è piccola per le coppie vicine, $0{,}05$ diventa $0{,}052$, e più grande per quelle lontane, $0{,}40$ diventa circa $0{,}57$: è la saturazione all'opera anche in un esempio minuscolo.

::: figura upgma
{"w":640,"h":340,"items":[{"t":"text","p":[570,64],"s":"S1","c":"ax","size":13,"a":"start"},{"t":"text","p":[570,114],"s":"S2","c":"ax","size":13,"a":"start"},{"t":"text","p":[570,174],"s":"S3","c":"ax","size":13,"a":"start"},{"t":"text","p":[570,244],"s":"S4","c":"ax","size":13,"a":"start"},{"t":"line","p":[525.0,85,525.0,60],"c":"force2","w":2.4},{"t":"line","p":[525.0,60,560,60],"c":"force2","w":2.4},{"t":"line","p":[525.0,85,525.0,110],"c":"force2","w":2.4},{"t":"line","p":[525.0,110,560,110],"c":"force2","w":2.4},{"t":"line","p":[437.5,127,437.5,85],"c":"force2","w":2.4},{"t":"line","p":[437.5,85,525.0,85],"c":"force2","w":2.4},{"t":"line","p":[437.5,127,437.5,170],"c":"force2","w":2.4},{"t":"line","p":[437.5,170,560,170],"c":"force2","w":2.4},{"t":"line","p":[338.3,183,338.3,127],"c":"force2","w":2.4},{"t":"line","p":[338.3,127,437.5,127],"c":"force2","w":2.4},{"t":"line","p":[338.3,183,338.3,240],"c":"force2","w":2.4},{"t":"line","p":[338.3,240,560,240],"c":"force2","w":2.4},{"t":"circle","p":[525.0,85,4],"c":"force"},{"t":"text","p":[519.0,77],"s":"0,025","c":"force","size":10,"a":"end"},{"t":"circle","p":[437.5,127,4],"c":"force"},{"t":"text","p":[431.5,119],"s":"0,087","c":"force","size":10,"a":"end"},{"t":"circle","p":[338.3,183,4],"c":"force"},{"t":"text","p":[332.3,175],"s":"0,158","c":"force","size":10,"a":"end"},{"t":"line","p":[280.0,290,560,290],"c":"ax","w":1.2},{"t":"line","p":[560,286,560,294],"c":"ax","w":1},{"t":"text","p":[560,310],"s":"0,00","c":"muted","size":10},{"t":"line","p":[490.0,286,490.0,294],"c":"ax","w":1},{"t":"text","p":[490.0,310],"s":"0,05","c":"muted","size":10},{"t":"line","p":[420.0,286,420.0,294],"c":"ax","w":1},{"t":"text","p":[420.0,310],"s":"0,10","c":"muted","size":10},{"t":"line","p":[350.0,286,350.0,294],"c":"ax","w":1},{"t":"text","p":[350.0,310],"s":"0,15","c":"muted","size":10},{"t":"line","p":[280.0,286,280.0,294],"c":"ax","w":1},{"t":"text","p":[280.0,310],"s":"0,20","c":"muted","size":10},{"t":"text","p":[420.0,328],"s":"altezza dei nodi (metà della distanza)","c":"ax","size":11}]}
---
L'albero costruito con il metodo UPGMA dalle quattro sequenze dell'esperienza, usando le frazioni di siti diversi. L'altezza di ogni nodo è metà della distanza media fra i gruppi che unisce; S4, il ramo più lontano, è il candidato naturale come gruppo esterno.
:::

## Errori frequenti {#errori}

::: errore Leggere l'albero come una scala dal semplice al complesso
Tutte le specie attuali hanno alle spalle lo stesso tempo di evoluzione dalla radice. Un gruppo che si separa vicino alla radice è un parente lontano delle altre specie, che ha evoluto per conto proprio quanto loro.
:::

::: errore Contare le differenze come se fossero le sostituzioni
Per sequenze lontane più sostituzioni nello stesso sito si sovrappongono, e la frazione di siti diversi tende a $3/4$. La distanza va corretta con un modello, come quello di Jukes e Cantor.
:::

::: errore Pensare che l'RNA ribosomiale sia una sequenza inutile
L'RNA ribosomiale è essenziale per la sintesi delle proteine, ed è utile per l'albero universale proprio perché la sua funzione lo mantiene molto conservato in tutti i viventi.
:::

::: errore Credere che LUCA sia stato il primo essere vivente
LUCA è l'antenato comune più recente degli organismi attuali. Era preceduto da una storia evolutiva lunga e viveva insieme ad altri organismi le cui linee si sono estinte.
:::

::: errore Usare la lunghezza del genoma per stabilire l'antichità di una specie
Le dimensioni dei genomi variano enormemente anche fra specie vicine, per l'accumulo di sequenze ripetute e di trasposoni, e dicono poco sull'età di una linea evolutiva: tutte le specie attuali sono ugualmente antiche rispetto a LUCA.
:::

## Sintesi {#sintesi}

::: sintesi In breve
- Un albero filogenetico rappresenta la discendenza da antenati comuni: le punte sono gli organismi, i nodi gli antenati, la radice l'antenato di tutti. Conta l'ordine delle ramificazioni, e nessuna specie attuale è più evoluta di un'altra.
- Gli alberi molecolari si costruiscono allineando sequenze omologhe e usando metodi di distanza, parsimonia, massima verosimiglianza o bayesiani.
- Per sequenze lontane le differenze osservate sottostimano le sostituzioni; secondo il modello di Jukes e Cantor $p=\tfrac34(1-\mathrm e^{-4d/3})$, con limite $3/4$, e la distanza si stima con $d=-\tfrac34\ln(1-4p/3)$.
- L'RNA della subunità minore del ribosoma, universale e conservato, ha permesso a Woese di scoprire gli Archei e di dividere i viventi in tre domini.
- I geni duplicati prima di LUCA collocano la radice fra i Batteri e gli Archei; le analisi recenti pongono gli eucarioti dentro gli archei di Asgard, in uno schema a due domini.
- Il trasferimento genico orizzontale trasforma la base dell'albero in una rete e complica la ricostruzione degli antenati.
- LUCA, l'antenato comune più recente di tutti i viventi, aveva già DNA, ribosomi, codice genetico e ATP; le ricostruzioni lo descrivono come un procariote anaerobico che usava idrogeno e diossido di carbonio, vissuto forse circa $4{,}2$ miliardi di anni fa.
:::

## Glossario {#glossario}

- **Allineamento**: disposizione di sequenze omologhe in colonne di posizioni corrispondenti.
- **Archei**: dominio di procarioti con membrane di lipidi a legami etere e apparato di trascrizione simile a quello degli eucarioti.
- **Dominio**: la categoria più ampia della classificazione dei viventi: Batteri, Archei, Eucarioti.
- **Gruppo esterno**: organismo sicuramente più lontano dagli altri, usato per collocare la radice di un albero.
- **Gruppi fratelli**: due gruppi che discendono direttamente dallo stesso nodo.
- **Gruppo monofiletico**: gruppo formato da un antenato e da tutti i suoi discendenti.
- **LUCA**: ultimo antenato comune universale, il nodo da cui si separano Batteri e Archei.
- **Modello di Jukes e Cantor**: modello di sostituzione in cui ogni base si trasforma con uguale probabilità in ciascuna delle altre tre.
- **Nodo**: punto di ramificazione di un albero, che rappresenta un antenato comune.
- **Omologhe**: sequenze o strutture derivate da un antenato comune.
- **Saturazione**: perdita di informazione dovuta a sostituzioni multiple nello stesso sito.
- **Trasferimento genico orizzontale**: passaggio di geni fra organismi per vie diverse dalla discendenza.

## Esercizi {#esercizi}

::: esercizio Leggere le parentele [base]
In un albero radicato la radice si divide in due rami: il primo porta a un nodo da cui escono A e B, il secondo a un nodo da cui escono C e D. Quali sono i gruppi fratelli? A è più vicino a B o a C? Cambia qualcosa se si scambiano di posto C e D nel disegno?
>>> soluzione
A e B sono gruppi fratelli, e così C e D; i due gruppi AB e CD sono a loro volta fratelli. A è più vicino a B, con cui condivide un antenato più recente. Scambiare C e D nel disegno è una rotazione attorno al loro nodo e non cambia l'albero.
:::

::: esercizio Differenze attese [base]
Secondo il modello di Jukes e Cantor, quale frazione di siti diversi si attende per $d=0{,}1$, $d=0{,}5$ e $d=3$ sostituzioni per sito?
>>> soluzione
Con $p=0{,}75(1-\mathrm e^{-4d/3})$ si ottiene circa $0{,}094$, $0{,}365$ e $0{,}736$. La prima è quasi uguale a $d$; l'ultima è vicina al limite $0{,}75$.
:::

::: esercizio Contare in una sequenza [base]
Quante differenze si attendono in una sequenza di $200$ siti con $d=0{,}75$ sostituzioni per sito?
>>> soluzione
La frazione è $0{,}75(1-\mathrm e^{-1})\simeq0{,}474$, e le differenze attese sono $200\cdot0{,}474\simeq95$.
:::

::: esercizio Il limite dei tre quarti [base]
Perché, secondo il modello di Jukes e Cantor, due sequenze lontanissime differiscono nei tre quarti dei siti e non in tutti?
>>> soluzione
Dopo moltissime sostituzioni la base presente in un sito è del tutto casuale in entrambe le sequenze. Con quattro basi ugualmente probabili, due basi casuali coincidono con probabilità $1/4$, e differiscono con probabilità $3/4$.
:::

::: esercizio Batteri o archei? [base]
Un microrganismo senza nucleo ha membrane di lipidi isoprenoidi legati al glicerolo con legami etere, e una parete priva di peptidoglicano. A quale dominio appartiene? Quale altra caratteristica lo avvicina agli eucarioti?
>>> soluzione
Appartiene agli Archei. La sua RNA polimerasi e i suoi ribosomi somigliano a quelli degli eucarioti più che a quelli dei batteri.
:::

::: esercizio I procarioti sono un gruppo naturale? [base]
Secondo lo schema a due domini, gli eucarioti nascono all'interno degli archei. I procarioti, cioè batteri e archei insieme, formano un gruppo monofiletico?
>>> soluzione
Formano un gruppo monofiletico solo se contengono tutti i discendenti del loro antenato comune, che è LUCA. Gli eucarioti discendono da LUCA ma sono esclusi dai procarioti: il gruppo dei procarioti è un insieme definito per l'assenza di un carattere, il nucleo, e quindi è privo dei requisiti di un clade.
:::

::: esercizio Dalla differenza alla distanza [medio]
Due sequenze differiscono nel $30\%$ dei siti, altre due nel $70\%$. Stimare le distanze evolutive con il modello di Jukes e Cantor.
>>> soluzione
Per $p=0{,}3$:

$$d=-0{,}75\ln(1-0{,}4)\simeq0{,}38.$$

Per $p=0{,}7$:

$$d=-0{,}75\ln(1-0{,}933)\simeq2{,}0.$$

La correzione è piccola nel primo caso e quasi triplica la distanza nel secondo.
:::

::: esercizio L'incertezza vicino al limite [medio]
Una frazione di siti diversi è misurata con un'incertezza di $\pm0{,}02$. Calcolare l'intervallo delle distanze stimate per $p=0{,}30$ e per $p=0{,}70$.
>>> soluzione
Per $p$ fra $0{,}28$ e $0{,}32$ la distanza va da circa $0{,}35$ a $0{,}42$. Per $p$ fra $0{,}68$ e $0{,}72$ va da circa $1{,}78$ a $2{,}41$. Vicino alla saturazione la stessa incertezza sulle differenze diventa un'incertezza dieci volte maggiore sulla distanza.
:::

::: esercizio Un UPGMA semplice [medio]
Le distanze fra quattro specie sono: A–B $0{,}10$; A–C e B–C $0{,}30$; A–D, B–D e C–D $0{,}50$. Costruire l'albero con il metodo UPGMA indicando l'altezza dei nodi.
>>> soluzione
Si uniscono prima A e B, con il nodo a $0{,}05$. La distanza del gruppo AB da C è la media $0{,}30$, e il nodo che unisce C sta a $0{,}15$. La distanza di D dal gruppo ABC è $0{,}50$, e l'ultimo nodo sta a $0{,}25$. L'albero è $(((A,B),C),D)$.
:::

::: esercizio Le sequenze dell'esperienza [medio]
Con le differenze trovate nell'esperienza, $1$, $4$, $3$, $8$, $7$ e $4$ su $20$ siti, calcolare le distanze di Jukes e Cantor per le coppie S1–S2 e S1–S4.
>>> soluzione
Per S1–S2, $p=0{,}05$ e $d\simeq0{,}052$. Per S1–S4, $p=0{,}40$ e

$$d=-0{,}75\ln(1-0{,}533)\simeq0{,}57.$$

La coppia lontana riceve una correzione del $43\%$, quella vicina del $4\%$.
:::

::: esercizio Un orologio per i batteri [medio]
Nei batteri le sequenze dell'RNA ribosomiale 16S divergono di circa l'$1\%$ ogni $50$ milioni di anni. Due batteri differiscono nel $5\%$ dei siti. Stimare quando si sono separati, con e senza la correzione di Jukes e Cantor.
>>> soluzione
Senza correzione, $5\%$ corrisponde a $5\cdot50=250$ milioni di anni. Con la correzione $d\simeq0{,}0517$, cioè $5{,}17\%$, e la stima diventa circa $260$ milioni di anni. A questa distanza la correzione è piccola.
:::

::: esercizio La finestra per l'origine [medio]
Gli zirconi più antichi indicano acqua liquida sulla Terra da circa $4{,}4$ miliardi di anni fa, e LUCA è stato datato fra $4{,}09$ e $4{,}33$ miliardi di anni fa. Quanto tempo resta, nei due casi estremi, per l'evoluzione che porta dalla chimica prebiotica a LUCA?
>>> soluzione
Fra $4{,}4$ e $4{,}33$ miliardi di anni fa passano $70$ milioni di anni; fra $4{,}4$ e $4{,}09$, circa $310$ milioni. In entrambi i casi un intervallo breve rispetto alla storia della Terra, se le datazioni sono corrette.
:::

::: esercizio L'approssimazione per distanze piccole [avanzato]
Sviluppando l'esponenziale fino al secondo ordine, mostrare che per $d$ piccolo $p\simeq d-\tfrac23d^2$. Confrontare con il valore esatto per $d=0{,}1$.
>>> soluzione
Con $\mathrm e^{-x}\simeq1-x+x^2/2$ e $x=4d/3$:

$$\begin{aligned}p&\simeq\frac34\left(\frac{4d}{3}-\frac{8d^2}{9}\right)\\&=d-\frac23d^2.\end{aligned}$$

Per $d=0{,}1$ si ottiene $0{,}0933$, contro il valore esatto $0{,}0936$. Il termine negativo rappresenta le sostituzioni nascoste da altre sostituzioni nello stesso sito.
:::

::: esercizio Quanti alberi possibili [avanzato]
Il numero di alberi radicati diversi per $n$ specie è $(2n-3)!!=1\cdot3\cdot5\cdots(2n-3)$. Calcolarlo per $4$, $10$ e $20$ specie. Che cosa implica per la ricerca dell'albero migliore?
>>> soluzione
Per $4$ specie gli alberi sono $5!!=15$; per $10$ specie $17!!\simeq3{,}4\times10^7$; per $20$ specie $37!!\simeq8{,}2\times10^{21}$. Esaminare tutti gli alberi è impossibile già per poche decine di specie: i programmi usano strategie di ricerca che esplorano solo le regioni più promettenti dello spazio degli alberi.
:::

::: esercizio Radicare con i duplicati [avanzato]
Un gene si è duplicato prima di LUCA nelle copie $\alpha$ e $\beta$. Nell'albero delle copie $\alpha$, Archei ed Eucarioti formano un gruppo; nell'albero delle copie $\beta$ lo stesso. Usando le copie $\beta$ come gruppo esterno per le $\alpha$, dove si trova la radice dell'albero delle specie? Perché il metodo funziona soltanto se la duplicazione è avvenuta prima di LUCA?
>>> soluzione
La radice sta sul ramo che separa i Batteri dal gruppo di Archei ed Eucarioti, perché quello è il primo ramo che si separa nell'albero delle copie $\alpha$ visto dalle copie $\beta$. Se la duplicazione fosse avvenuta dopo LUCA, in uno solo dei domini, le due copie mancherebbero negli altri domini e sarebbero inutilizzabili come gruppo esterno l'una per l'altra.
:::

::: esercizio Un orologio che non regge [avanzato]
In alcune regioni molto conservate dell'RNA ribosomiale Batteri e Archei differiscono nel $25\%$ dei siti. Se il tasso di sostituzione in quelle regioni fosse di $10^{-10}$ per sito per anno in ciascuna linea, quando si sarebbero separati? Il risultato è compatibile con le prime tracce di vita di $3{,}5$ miliardi di anni fa? Che cosa se ne deduce?
>>> soluzione
La distanza corretta è

$$d=-0{,}75\ln(1-0{,}333)\simeq0{,}30,$$

e con $d=2rt$ si ottiene $t=0{,}30/(2\times10^{-10})\simeq1{,}5$ miliardi di anni. Il risultato è incompatibile con tracce di vita molto più antiche: il tasso supposto è troppo alto, oppure non è rimasto costante. Sulle distanze più profonde l'orologio molecolare va calibrato con cura e i tassi variano fra linee e nel tempo.
:::

## Fonti {#fonti}

Il testo, le figure, gli esempi e gli esercizi di questo capitolo sono originali. Per la scelta e l'ordine degli argomenti i riferimenti principali sono A. M. Shaw, *Astrochemistry: From Astronomy to Astrobiology*, Wiley, 2006, §9.3 (l'albero universale della vita), e J. R. Morris, D. L. Hartl, A. H. Knoll e collaboratori, *Biology: How Life Works*, 2ª edizione, Macmillan, 2016, §23.1 (leggere un albero filogenetico), §23.2 (costruire un albero), §26.1 (i due domini procariotici), §26.6 (storia evolutiva dei procarioti) e §27.2 (origine degli eucarioti). Alcune affermazioni del §9.3 di Shaw sono state corrette: l'RNA ribosomiale è una molecola funzionale e conservata, scelta per questo come orologio; la lunghezza del genoma non indica l'antichità di una specie; i batteri hanno membrane cellulari e mancano soltanto di nucleo; l'origine dei viventi attuali in ambienti caldi è un'ipotesi discussa. Dati ed esperimenti provengono dalle fonti primarie seguenti.

1. C. Darwin, *Notebook B*, 1837; C. Darwin, *On the Origin of Species*, John Murray, 1859.
2. T. H. Jukes, C. R. Cantor, in H. N. Munro (a cura di), *Mammalian Protein Metabolism*, Academic Press, 1969: il modello di sostituzione.
3. C. R. Woese, G. E. Fox, *PNAS* 74, 5088 (1977); C. R. Woese, O. Kandler, M. L. Wheelis, *PNAS* 87, 4576 (1990): gli Archei e i tre domini.
4. J. P. Gogarten e collaboratori, *PNAS* 86, 6661 (1989); N. Iwabe e collaboratori, *PNAS* 86, 9355 (1989): la radice dell'albero universale.
5. W. F. Doolittle, *Science* 284, 2124 (1999): trasferimento orizzontale e albero della vita.
6. J. A. Lake e collaboratori, *PNAS* 81, 3786 (1984); T. A. Williams e collaboratori, *Nature* 504, 231 (2013); A. Spang e collaboratori, *Nature* 521, 173 (2015); H. Imachi e collaboratori, *Nature* 577, 519 (2020); L. Eme e collaboratori, *Nature* 618, 992 (2023): gli eucarioti e gli archei di Asgard.
7. M. C. Weiss e collaboratori, *Nature Microbiology* 1, 16116 (2016); E. R. R. Moody e collaboratori, *Nature Ecology & Evolution* 8, 1654 (2024): la ricostruzione di LUCA e la sua età.
8. B. Boussau e collaboratori, *Nature* 456, 942 (2008); E. A. Gaucher, S. Govindarajan, O. K. Ganesh, *Nature* 451, 704 (2008): la temperatura degli antenati.
9. S. A. Wilde e collaboratori, *Nature* 409, 175 (2001): gli zirconi più antichi.
10. H. Ochman, A. C. Wilson, *Journal of Molecular Evolution* 26, 74 (1987): l'orologio dell'RNA ribosomiale batterico.
