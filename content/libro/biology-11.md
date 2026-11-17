---
unit: biology-11
titolo: DNA, codice genetico ed espressione
sottotitolo: Struttura e replicazione del DNA, trascrizione, traduzione, il codice genetico e la sua origine
volume: Volume di biologia
fonte: Testo originale; riferimenti principali A. M. Shaw, Astrochemistry, §1.3, 9.2; J. R. Morris et al., Biology: How Life Works, 2ª ed., §3.1–3.4, 4.1, 4.2, 12.1, 19.2, 19.3
---

## Prima di cominciare {#apertura}

Una cellula di *Escherichia coli*, il batterio dell'intestino più studiato dai biologi, è lunga circa due micrometri. Al suo interno sta ripiegata una molecola di DNA lunga più di un millimetro e mezzo, con quattro milioni e mezzo di coppie di basi. In circa quaranta minuti la cellula copia questa molecola commettendo in media meno di un errore, legge migliaia di geni, produce le proteine che le servono nelle quantità giuste e, quando l'ambiente cambia, ne accende o ne spegne alcune nel giro di pochi minuti.

Tutti gli organismi della Terra fanno le stesse operazioni con gli stessi strumenti. Conservano l'informazione nel DNA, la trascrivono in RNA e la traducono in proteine con un ribosoma, usando lo stesso **codice genetico**, la tabella che associa a ogni tripletta di basi un amminoacido. Questa unità chimica è la prova più forte che tutta la vita terrestre discende da un antenato comune. È anche la ragione per cui gli astrobiologi considerano il codice genetico una firma: un organismo nato in modo indipendente, su Marte o in un oceano sotto il ghiaccio, userebbe quasi certamente un codice diverso, e forse molecole diverse.

Il capitolo descrive la struttura del DNA e la sua replicazione, la trascrizione e la traduzione, e il codice genetico con le sue eccezioni. Introduce un modello semplice per il numero di molecole di RNA messaggero in una cellula, che dipende dall'equilibrio fra produzione e degradazione e spiega quanto in fretta una cellula risponde a un segnale. Discute infine le ipotesi sull'origine del codice e il suo significato per la ricerca di vita altrove.

::: obiettivi
- descrivere la struttura a doppia elica del DNA e le regole di appaiamento delle basi;
- spiegare la replicazione semiconservativa, il ruolo delle polimerasi e la precisione della copiatura;
- descrivere la trascrizione, la maturazione dell'RNA e la traduzione;
- usare la tabella del codice genetico e spiegare perché i codoni sono triplette;
- usare il modello $m(t)=(\alpha/\delta)(1-\mathrm e^{-\delta t})$ per il livello di un RNA messaggero e il suo tempo di risposta;
- descrivere la regolazione di un gene batterico con l'esempio dell'operone del lattosio;
- discutere le varianti del codice e le ipotesi sulla sua origine, e il loro significato astrobiologico.
:::

Il capitolo riprende l'RNA e i ribozimi del capitolo [Il mondo a RNA](unit:biology-10) e usa la funzione esponenziale del capitolo [Esponenziali e logaritmi](unit:math-c06). Le cinetiche del primo ordine sono quelle del capitolo [Velocità di reazione](unit:chemistry-17).

## La doppia elica {#elica}

Il DNA è un polimero di nucleotidi formati dallo zucchero desossiribosio, da un gruppo fosfato e da una di quattro basi: adenina (A), timina (T), guanina (G) e citosina (C). Nel 1950 Erwin Chargaff notò che nel DNA di qualunque organismo la quantità di adenina è uguale a quella di timina, e quella di guanina a quella di citosina, mentre il rapporto fra le due coppie cambia da una specie all'altra. Nel 1953 James Watson e Francis Crick, a Cambridge, usarono queste regole e le immagini di diffrazione dei raggi X ottenute da Rosalind Franklin e Raymond Gosling, al King's College di Londra, per proporre la struttura a **doppia elica**.

Nel modello due catene si avvolgono attorno a un asse comune, con le basi all'interno e gli scheletri di zucchero e fosfato all'esterno. Le catene sono **antiparallele**: una corre dall'estremità $5'$ alla $3'$, l'altra in verso opposto. Ogni base di una catena è legata con legami a idrogeno a una base dell'altra, l'adenina sempre alla timina, con due legami, e la guanina sempre alla citosina, con tre: le regole di Chargaff diventano una conseguenza geometrica, perché solo queste coppie hanno la stessa larghezza e si inseriscono in un'elica regolare. Nella forma più comune, la forma B, l'elica ha un diametro di circa $2\un{nm}$, le coppie di basi distano $0{,}34\un{nm}$ l'una dall'altra e ogni giro completo ne contiene circa dieci (figura 1). L'avvolgimento lascia sulla superficie due solchi di larghezza diversa, il solco maggiore e il solco minore, attraverso i quali le proteine leggono la sequenza senza aprire l'elica.

::: figura elica
{"w":700,"h":230,"items":[{"t":"line","p":[74,144.2,74,150.9],"c":"force2","w":1.6},{"t":"line","p":[102,167.2,102,122.8],"c":"force2","w":1.6},{"t":"line","p":[130,176.0,130,97.5],"c":"force","w":2.2},{"t":"line","p":[158,167.2,158,84.6],"c":"force","w":2.2},{"t":"line","p":[186,144.2,186,89.0],"c":"force","w":2.2},{"t":"line","p":[214,115.8,214,109.1],"c":"force","w":2.2},{"t":"line","p":[242,92.8,242,137.2],"c":"force2","w":1.6},{"t":"line","p":[270,84.0,270,162.5],"c":"force2","w":1.6},{"t":"line","p":[298,92.8,298,175.4],"c":"force","w":2.2},{"t":"line","p":[326,115.8,326,171.0],"c":"force","w":2.2},{"t":"line","p":[354,144.2,354,150.9],"c":"force2","w":1.6},{"t":"line","p":[382,167.2,382,122.8],"c":"force2","w":1.6},{"t":"line","p":[410,176.0,410,97.5],"c":"force","w":2.2},{"t":"line","p":[438,167.2,438,84.6],"c":"force","w":2.2},{"t":"line","p":[466,144.2,466,89.0],"c":"force","w":2.2},{"t":"line","p":[494,115.8,494,109.1],"c":"force","w":2.2},{"t":"line","p":[522,92.8,522,137.2],"c":"force2","w":1.6},{"t":"line","p":[550,84.0,550,162.5],"c":"force2","w":1.6},{"t":"line","p":[578,92.8,578,175.4],"c":"force2","w":1.6},{"t":"line","p":[606,115.8,606,171.0],"c":"force2","w":1.6},{"t":"poly","pts":[[60,130.0],[64,134.1],[68,138.2],[72,142.2],[76,146.2],[80,150.0],[84,153.6],[88,157.0],[92,160.3],[96,163.2],[100,166.0],[104,168.4],[108,170.5],[112,172.3],[116,173.7],[120,174.8],[124,175.6],[128,176.0],[132,176.0],[136,175.6],[140,174.8],[144,173.7],[148,172.3],[152,170.5],[156,168.4],[160,166.0],[164,163.2],[168,160.3],[172,157.0],[176,153.6],[180,150.0],[184,146.2],[188,142.2],[192,138.2],[196,134.1],[200,130.0],[204,125.9],[208,121.8],[212,117.8],[216,113.8],[220,110.0],[224,106.4],[228,103.0],[232,99.7],[236,96.8],[240,94.0],[244,91.6],[248,89.5],[252,87.7],[256,86.3],[260,85.2],[264,84.4],[268,84.0],[272,84.0],[276,84.4],[280,85.2],[284,86.3],[288,87.7],[292,89.5],[296,91.6],[300,94.0],[304,96.8],[308,99.7],[312,103.0],[316,106.4],[320,110.0],[324,113.8],[328,117.8],[332,121.8],[336,125.9],[340,130.0],[344,134.1],[348,138.2],[352,142.2],[356,146.2],[360,150.0],[364,153.6],[368,157.0],[372,160.3],[376,163.2],[380,166.0],[384,168.4],[388,170.5],[392,172.3],[396,173.7],[400,174.8],[404,175.6],[408,176.0],[412,176.0],[416,175.6],[420,174.8],[424,173.7],[428,172.3],[432,170.5],[436,168.4],[440,166.0],[444,163.2],[448,160.3],[452,157.0],[456,153.6],[460,150.0],[464,146.2],[468,142.2],[472,138.2],[476,134.1],[480,130.0],[484,125.9],[488,121.8],[492,117.8],[496,113.8],[500,110.0],[504,106.4],[508,103.0],[512,99.7],[516,96.8],[520,94.0],[524,91.6],[528,89.5],[532,87.7],[536,86.3],[540,85.2],[544,84.4],[548,84.0],[552,84.0],[556,84.4],[560,85.2],[564,86.3],[568,87.7],[572,89.5],[576,91.6],[580,94.0],[584,96.8],[588,99.7],[592,103.0],[596,106.4],[600,110.0],[604,113.8],[608,117.8],[612,121.8],[616,125.9],[620,130.0]],"c":"force3","w":3},{"t":"poly","pts":[[60,162.5],[64,159.5],[68,156.2],[72,152.7],[76,149.0],[80,145.2],[84,141.2],[88,137.2],[92,133.1],[96,129.0],[100,124.8],[104,120.8],[108,116.8],[112,112.9],[116,109.1],[120,105.5],[124,102.1],[128,99.0],[132,96.0],[136,93.4],[140,91.1],[144,89.0],[148,87.3],[152,85.9],[156,84.9],[160,84.3],[164,84.0],[168,84.1],[172,84.6],[176,85.4],[180,86.6],[184,88.1],[188,90.0],[192,92.2],[196,94.7],[200,97.5],[204,100.5],[208,103.8],[212,107.3],[216,111.0],[220,114.8],[224,118.8],[228,122.8],[232,126.9],[236,131.0],[240,135.2],[244,139.2],[248,143.2],[252,147.1],[256,150.9],[260,154.5],[264,157.9],[268,161.0],[272,164.0],[276,166.6],[280,168.9],[284,171.0],[288,172.7],[292,174.1],[296,175.1],[300,175.7],[304,176.0],[308,175.9],[312,175.4],[316,174.6],[320,173.4],[324,171.9],[328,170.0],[332,167.8],[336,165.3],[340,162.5],[344,159.5],[348,156.2],[352,152.7],[356,149.0],[360,145.2],[364,141.2],[368,137.2],[372,133.1],[376,129.0],[380,124.8],[384,120.8],[388,116.8],[392,112.9],[396,109.1],[400,105.5],[404,102.1],[408,99.0],[412,96.0],[416,93.4],[420,91.1],[424,89.0],[428,87.3],[432,85.9],[436,84.9],[440,84.3],[444,84.0],[448,84.1],[452,84.6],[456,85.4],[460,86.6],[464,88.1],[468,90.0],[472,92.2],[476,94.7],[480,97.5],[484,100.5],[488,103.8],[492,107.3],[496,111.0],[500,114.8],[504,118.8],[508,122.8],[512,126.9],[516,131.0],[520,135.2],[524,139.2],[528,143.2],[532,147.1],[536,150.9],[540,154.5],[544,157.9],[548,161.0],[552,164.0],[556,166.6],[560,168.9],[564,171.0],[568,172.7],[572,174.1],[576,175.1],[580,175.7],[584,176.0],[588,175.9],[592,175.4],[596,174.6],[600,173.4],[604,171.9],[608,170.0],[612,167.8],[616,165.3],[620,162.5]],"c":"force4","w":3},{"t":"line","p":[60,198,340,198],"c":"muted","w":1},{"t":"line","p":[60,192,60,204],"c":"muted","w":1},{"t":"line","p":[340,192,340,204],"c":"muted","w":1},{"t":"text","p":[200,218],"s":"un giro: circa 10 coppie, 3,4 nm","c":"ax","size":11},{"t":"line","p":[638,84,638,176],"c":"muted","w":1},{"t":"line","p":[632,84,644,84],"c":"muted","w":1},{"t":"line","p":[632,176,644,176],"c":"muted","w":1},{"t":"text","p":[650,134],"s":"2 nm","c":"ax","size":11,"a":"start"},{"t":"text","p":[480,218],"s":"0,34 nm fra due coppie","c":"ax","size":11},{"t":"line","p":[40,24,70,24],"c":"force","w":2.2},{"t":"text","p":[76,28],"s":"G–C","c":"force","size":11,"a":"start"},{"t":"line","p":[120,24,150,24],"c":"force2","w":1.6},{"t":"text","p":[156,28],"s":"A–T","c":"force2","size":11,"a":"start"},{"t":"text","p":[54,134],"s":"5′","c":"force3","size":11,"a":"end"}]}
---
Schema della doppia elica del DNA nella forma B. Due scheletri di zucchero e fosfato si avvolgono in versi opposti; le coppie di basi, A–T e G–C, li collegano come i pioli di una scala a chiocciola. Le misure sono quelle medie della forma B.
:::

Watson e Crick chiusero il loro articolo con una frase rimasta famosa: l'appaiamento specifico delle basi suggerisce immediatamente un possibile meccanismo di copiatura del materiale genetico. Se le due catene si separano, ciascuna contiene l'informazione per ricostruire l'altra.

La lunghezza del DNA impressiona. Il genoma di *E. coli* conta circa $4{,}64$ milioni di coppie di basi, e la sua molecola circolare è lunga $4{,}64\times10^6\cdot0{,}34\un{nm}\simeq1{,}6\un{mm}$, quasi mille volte la cellula. Il genoma umano conta circa $3{,}1$ miliardi di coppie di basi in ogni corredo, e una cellula ne ha due: il DNA di una cellula umana, disteso, misura circa due metri. Nei batteri il DNA è compattato da proteine e da un avvolgimento ulteriore dell'elica su se stessa; negli eucarioti è avvolto attorno a proteine chiamate istoni, come un filo attorno a rocchetti, e i rocchetti sono a loro volta impaccati nei cromosomi.

## La replicazione {#replicazione}

Nel 1958 Matthew Meselson e Franklin Stahl verificarono l'ipotesi di Watson e Crick con un esperimento celebre. Fecero crescere batteri in un terreno con azoto pesante, $^{15}\mathrm N$, e poi li trasferirono in un terreno con azoto normale, $^{14}\mathrm N$. Separando il DNA per densità con una centrifuga, trovarono dopo una generazione soltanto DNA di densità intermedia, e dopo due generazioni metà DNA intermedio e metà leggero. È il risultato previsto se ogni doppia elica figlia contiene una catena vecchia e una nuova: la replicazione è **semiconservativa**.

La replicazione comincia in punti precisi, le origini; *E. coli* ne ha una sola. Da ogni origine partono due **forcelle di replicazione**, che si allontanano in versi opposti aprendo l'elica (figura 2). Gli enzimi che costruiscono le nuove catene, le **DNA polimerasi**, aggiungono nucleotidi soltanto all'estremità $3'$ di una catena già esistente e sono incapaci di cominciarne una da zero; per questo un altro enzima, la primasi, sintetizza un breve innesco di RNA da cui la polimerasi parte. Poiché le due catene stampo sono antiparallele, una delle nuove catene, la catena guida, cresce in modo continuo nella direzione in cui la forcella avanza; l'altra, la catena ritardata, è costruita a tratti di qualche centinaio o migliaio di nucleotidi, i frammenti di Okazaki, ciascuno con il suo innesco, che poi vengono uniti.

::: figura forcella
{"w":700,"h":225,"items":[{"t":"line","p":[30,120,250,120],"c":"force2","w":3},{"t":"line","p":[30,132,250,132],"c":"force4","w":3},{"t":"text","p":[130,108],"s":"DNA parentale","c":"ax","size":11},{"t":"poly","pts":[[250,120],[320,90],[660,90]],"c":"force2","w":3},{"t":"poly","pts":[[250,132],[320,162],[660,162]],"c":"force4","w":3},{"t":"arrow","p":[640,104,330,104],"c":"force3","w":2.4,"head":9},{"t":"text","p":[490,82],"s":"catena guida, continua","c":"force3","size":11},{"t":"rect","p":[340,146,14,8],"c":"force","r":1},{"t":"arrow","p":[354,150,432,150],"c":"force3","w":2.2,"head":8},{"t":"rect","p":[450,146,14,8],"c":"force","r":1},{"t":"arrow","p":[464,150,542,150],"c":"force3","w":2.2,"head":8},{"t":"rect","p":[560,146,14,8],"c":"force","r":1},{"t":"arrow","p":[574,150,652,150],"c":"force3","w":2.2,"head":8},{"t":"text","p":[490,194],"s":"catena ritardata: frammenti di Okazaki","c":"force3","size":11},{"t":"rect","p":[40,200,14,8],"c":"force","r":1},{"t":"text","p":[60,208],"s":"innesco di RNA","c":"force","size":11,"a":"start"},{"t":"arrow","p":[300,60,240,60],"c":"ax","w":1.6,"head":8},{"t":"text","p":[310,64],"s":"la forcella avanza","c":"muted","size":11,"a":"start"},{"t":"text","p":[668,94],"s":"3′","c":"muted","size":10,"a":"start"},{"t":"text","p":[668,166],"s":"5′","c":"muted","size":10,"a":"start"}]}
---
Una forcella di replicazione. L'elica parentale si apre; sulla catena guida la polimerasi procede senza interruzioni, sulla catena ritardata costruisce frammenti brevi, ognuno a partire da un innesco di RNA, che vengono poi uniti dalla ligasi.
:::

In *E. coli* ogni forcella avanza di circa mille nucleotidi al secondo. Con due forcelle che partono dall'unica origine e si incontrano dalla parte opposta del cromosoma circolare, la copiatura richiede circa

$$\frac{4{,}64\times10^6}{2\cdot1000}\un{s}\simeq2300\un{s},$$

poco meno di quaranta minuti. La precisione è straordinaria e viene da tre controlli successivi. La polimerasi inserisce il nucleotide sbagliato circa una volta ogni centomila; una sua parte, che funziona come una correttrice di bozze, rimuove gran parte degli errori appena commessi; e un sistema di riparazione degli appaiamenti scorretti controlla la nuova catena dopo il passaggio della forcella. Le misure dirette, ottenute sequenziando i genomi di linee di *E. coli* coltivate per migliaia di generazioni, danno circa $2\times10^{-10}$ mutazioni per nucleotide per generazione: in media una mutazione ogni mille divisioni, per l'intero genoma.

## La trascrizione {#trascrizione}

L'informazione del DNA viene usata attraverso copie di RNA. La **trascrizione** è la sintesi di una molecola di RNA complementare a un tratto di DNA, compiuta da un enzima, l'**RNA polimerasi**. La polimerasi riconosce sul DNA una sequenza di partenza, il **promotore**, apre localmente l'elica e usa una delle due catene, la catena stampo, per costruire un RNA che cresce in direzione $5'\to3'$, aggiungendo nucleotidi trifosfati all'estremità $3'$. L'RNA ha quindi la stessa sequenza dell'altra catena del DNA, detta catena codificante, con l'uracile al posto della timina. Quando incontra una sequenza di arresto, il terminatore, la polimerasi si stacca e libera l'RNA. Nei batteri la polimerasi aggiunge alcune decine di nucleotidi al secondo.

Gli RNA prodotti sono di diversi tipi. Gli **RNA messaggeri**, o mRNA, portano le istruzioni per costruire una proteina; gli RNA ribosomiali formano il ribosoma; gli RNA di trasporto, o tRNA, portano gli amminoacidi; e molti altri RNA brevi regolano l'espressione dei geni. Negli eucarioti il trascritto primario di un mRNA viene modificato prima di uscire dal nucleo: riceve un «cappuccio» chimico all'estremità $5'$ e una coda di adenine all'estremità $3'$, e perde gli **introni**, tratti che non contengono istruzioni per la proteina, con un processo di taglio e ricucitura chiamato splicing. I tratti che restano, gli esoni, possono essere ricomposti in modi diversi, così che un solo gene può produrre più proteine.

Lo splicing è catalizzato da un grande complesso di RNA e proteine, lo spliceosoma, il cui centro catalitico è formato da RNA, come quello del ribosoma: un'altra traccia, accanto agli introni autocatalitici di *Tetrahymena*, del ruolo antico dell'RNA come catalizzatore.

::: figura dogma
{"w":720,"h":175,"items":[{"t":"rect","p":[40,90,150,50],"c":"body","r":4},{"t":"poly","pts":[[40,90],[190,90],[190,140],[40,140]],"close":true,"c":"force2","w":1.6},{"t":"text","p":[115.0,119.0],"s":"DNA","c":"force2","size":14},{"t":"rect","p":[285,90,150,50],"c":"body","r":4},{"t":"poly","pts":[[285,90],[435,90],[435,140],[285,140]],"close":true,"c":"force3","w":1.6},{"t":"text","p":[360.0,119.0],"s":"RNA","c":"force3","size":14},{"t":"rect","p":[530,90,150,50],"c":"body","r":4},{"t":"poly","pts":[[530,90],[680,90],[680,140],[530,140]],"close":true,"c":"force","w":1.6},{"t":"text","p":[605.0,119.0],"s":"proteina","c":"force","size":14},{"t":"arrow","p":[192,108,283,108],"c":"ax","w":2,"head":9},{"t":"text","p":[237,98],"s":"trascrizione","c":"ax","size":11},{"t":"arrow","p":[437,115,528,115],"c":"ax","w":2,"head":9},{"t":"text","p":[482,105],"s":"traduzione","c":"ax","size":11},{"t":"arrow","p":[283,128,192,128],"c":"force4","w":1.4,"head":8},{"t":"poly","pts":[[283,128],[192,128]],"c":"force4","w":1.4,"dash":true},{"t":"text","p":[237,150],"s":"trascrizione inversa","c":"force4","size":10},{"t":"poly","pts":[[85,88],[85,50],[145,50],[145,84]],"c":"ax","w":1.6},{"t":"arrow","p":[145,70,145,88],"c":"ax","w":1.6,"head":8},{"t":"text","p":[115,42],"s":"replicazione","c":"ax","size":11},{"t":"poly","pts":[[330,88],[330,50],[390,50],[390,84]],"c":"force4","w":1.4,"dash":true},{"t":"arrow","p":[390,70,390,88],"c":"force4","w":1.4,"head":8},{"t":"text","p":[360,42],"s":"copiatura di RNA","c":"force4","size":10}]}
---
Il flusso dell'informazione genetica. Il DNA si replica e viene trascritto in RNA; l'RNA messaggero viene tradotto in proteine. Le frecce tratteggiate indicano i passaggi compiuti da alcuni virus: la trascrizione inversa da RNA a DNA e la copiatura di RNA su stampo di RNA.
:::

Crick chiamò **dogma centrale** il principio secondo cui l'informazione passa dagli acidi nucleici alle proteine e mai in senso inverso (figura 3). Il passaggio da RNA a DNA, la **trascrizione inversa**, è stato scoperto nel 1970 nei retrovirus e non contraddice il principio, che riguarda l'impossibilità di ricostruire una sequenza di acido nucleico a partire da una proteina.

## Il codice genetico {#codice}

Le proteine sono catene di venti tipi di amminoacidi, e le istruzioni per costruirle sono scritte con le quattro basi dell'mRNA. Un codice che associasse un amminoacido a ogni base ne indicherebbe solo quattro, uno con coppie di basi $4^2=16$; servono almeno triplette, che offrono $4^3=64$ combinazioni. Nel 1961 Francis Crick, Sydney Brenner e collaboratori mostrarono con mutazioni del batteriofago T4 che il codice è letto a gruppi di tre basi, i **codoni**, a partire da un punto fisso e senza interruzioni: inserire o togliere una base sposta la **cornice di lettura** e altera tutti i codoni successivi, mentre tre inserzioni vicine la ristabiliscono. Nello stesso anno Marshall Nirenberg e Heinrich Matthaei misero in un estratto di cellule un RNA artificiale fatto di soli uracili e ottennero una catena di sola fenilalanina: UUU fu il primo codone decifrato. In pochi anni, con il lavoro di Nirenberg, di Har Gobind Khorana e di altri, l'intera tabella fu completata.

| Amminoacido | Sigla | Codoni |
|---|---|---|
| fenilalanina | Phe | UUU, UUC |
| leucina | Leu | UUA, UUG, CUU, CUC, CUA, CUG |
| isoleucina | Ile | AUU, AUC, AUA |
| metionina, inizio | Met | AUG |
| valina | Val | GUU, GUC, GUA, GUG |
| serina | Ser | UCU, UCC, UCA, UCG, AGU, AGC |
| prolina | Pro | CCU, CCC, CCA, CCG |
| treonina | Thr | ACU, ACC, ACA, ACG |
| alanina | Ala | GCU, GCC, GCA, GCG |
| tirosina | Tyr | UAU, UAC |
| istidina | His | CAU, CAC |
| glutammina | Gln | CAA, CAG |
| asparagina | Asn | AAU, AAC |
| lisina | Lys | AAA, AAG |
| acido aspartico | Asp | GAU, GAC |
| acido glutammico | Glu | GAA, GAG |
| cisteina | Cys | UGU, UGC |
| triptofano | Trp | UGG |
| arginina | Arg | CGU, CGC, CGA, CGG, AGA, AGG |
| glicina | Gly | GGU, GGC, GGA, GGG |
| arresto | Stop | UAA, UAG, UGA |

Sessantuno codoni indicano amminoacidi e tre indicano la fine della proteina. Il codone AUG ha due ruoli: indica la metionina e, all'inizio di un gene, il punto da cui comincia la lettura. Il codice è **degenerato**, o ridondante: quasi tutti gli amminoacidi hanno più codoni, da uno a sei (figura 4). La ridondanza è ordinata. I codoni dello stesso amminoacido differiscono quasi sempre nella terza base, e molti cambiamenti della terza base non cambiano l'amminoacido; i codoni con una pirimidina, U o C, in seconda posizione indicano in gran parte amminoacidi idrofobici. Un errore di lettura o una mutazione puntiforme tende quindi a lasciare la proteina invariata o a sostituire un amminoacido con uno simile.

::: figura ridondanza
{"w":560,"h":385,"items":[{"t":"text","p":[70,30],"s":"Leu","c":"ax","size":11,"a":"end"},{"t":"rect","p":[80,20,420,11],"c":"force2","r":2},{"t":"text","p":[506,30],"s":"6","c":"muted","size":10,"a":"start"},{"t":"text","p":[70,45],"s":"Ser","c":"ax","size":11,"a":"end"},{"t":"rect","p":[80,35,420,11],"c":"force2","r":2},{"t":"text","p":[506,45],"s":"6","c":"muted","size":10,"a":"start"},{"t":"text","p":[70,60],"s":"Arg","c":"ax","size":11,"a":"end"},{"t":"rect","p":[80,50,420,11],"c":"force2","r":2},{"t":"text","p":[506,60],"s":"6","c":"muted","size":10,"a":"start"},{"t":"text","p":[70,75],"s":"Val","c":"ax","size":11,"a":"end"},{"t":"rect","p":[80,65,280,11],"c":"force2","r":2},{"t":"text","p":[366,75],"s":"4","c":"muted","size":10,"a":"start"},{"t":"text","p":[70,90],"s":"Pro","c":"ax","size":11,"a":"end"},{"t":"rect","p":[80,80,280,11],"c":"force2","r":2},{"t":"text","p":[366,90],"s":"4","c":"muted","size":10,"a":"start"},{"t":"text","p":[70,105],"s":"Thr","c":"ax","size":11,"a":"end"},{"t":"rect","p":[80,95,280,11],"c":"force2","r":2},{"t":"text","p":[366,105],"s":"4","c":"muted","size":10,"a":"start"},{"t":"text","p":[70,120],"s":"Ala","c":"ax","size":11,"a":"end"},{"t":"rect","p":[80,110,280,11],"c":"force2","r":2},{"t":"text","p":[366,120],"s":"4","c":"muted","size":10,"a":"start"},{"t":"text","p":[70,135],"s":"Gly","c":"ax","size":11,"a":"end"},{"t":"rect","p":[80,125,280,11],"c":"force2","r":2},{"t":"text","p":[366,135],"s":"4","c":"muted","size":10,"a":"start"},{"t":"text","p":[70,150],"s":"Ile","c":"ax","size":11,"a":"end"},{"t":"rect","p":[80,140,210,11],"c":"force2","r":2},{"t":"text","p":[296,150],"s":"3","c":"muted","size":10,"a":"start"},{"t":"text","p":[70,165],"s":"Stop","c":"ax","size":11,"a":"end"},{"t":"rect","p":[80,155,210,11],"c":"force4","r":2},{"t":"text","p":[296,165],"s":"3","c":"muted","size":10,"a":"start"},{"t":"text","p":[70,180],"s":"Phe","c":"ax","size":11,"a":"end"},{"t":"rect","p":[80,170,140,11],"c":"force2","r":2},{"t":"text","p":[226,180],"s":"2","c":"muted","size":10,"a":"start"},{"t":"text","p":[70,195],"s":"Tyr","c":"ax","size":11,"a":"end"},{"t":"rect","p":[80,185,140,11],"c":"force2","r":2},{"t":"text","p":[226,195],"s":"2","c":"muted","size":10,"a":"start"},{"t":"text","p":[70,210],"s":"His","c":"ax","size":11,"a":"end"},{"t":"rect","p":[80,200,140,11],"c":"force2","r":2},{"t":"text","p":[226,210],"s":"2","c":"muted","size":10,"a":"start"},{"t":"text","p":[70,225],"s":"Gln","c":"ax","size":11,"a":"end"},{"t":"rect","p":[80,215,140,11],"c":"force2","r":2},{"t":"text","p":[226,225],"s":"2","c":"muted","size":10,"a":"start"},{"t":"text","p":[70,240],"s":"Asn","c":"ax","size":11,"a":"end"},{"t":"rect","p":[80,230,140,11],"c":"force2","r":2},{"t":"text","p":[226,240],"s":"2","c":"muted","size":10,"a":"start"},{"t":"text","p":[70,255],"s":"Lys","c":"ax","size":11,"a":"end"},{"t":"rect","p":[80,245,140,11],"c":"force2","r":2},{"t":"text","p":[226,255],"s":"2","c":"muted","size":10,"a":"start"},{"t":"text","p":[70,270],"s":"Asp","c":"ax","size":11,"a":"end"},{"t":"rect","p":[80,260,140,11],"c":"force2","r":2},{"t":"text","p":[226,270],"s":"2","c":"muted","size":10,"a":"start"},{"t":"text","p":[70,285],"s":"Glu","c":"ax","size":11,"a":"end"},{"t":"rect","p":[80,275,140,11],"c":"force2","r":2},{"t":"text","p":[226,285],"s":"2","c":"muted","size":10,"a":"start"},{"t":"text","p":[70,300],"s":"Cys","c":"ax","size":11,"a":"end"},{"t":"rect","p":[80,290,140,11],"c":"force2","r":2},{"t":"text","p":[226,300],"s":"2","c":"muted","size":10,"a":"start"},{"t":"text","p":[70,315],"s":"Met","c":"ax","size":11,"a":"end"},{"t":"rect","p":[80,305,70,11],"c":"force2","r":2},{"t":"text","p":[156,315],"s":"1","c":"muted","size":10,"a":"start"},{"t":"text","p":[70,330],"s":"Trp","c":"ax","size":11,"a":"end"},{"t":"rect","p":[80,320,70,11],"c":"force2","r":2},{"t":"text","p":[156,330],"s":"1","c":"muted","size":10,"a":"start"},{"t":"line","p":[80,338,80,343],"c":"ax","w":1},{"t":"text","p":[80,356],"s":"0","c":"muted","size":10},{"t":"line","p":[150,338,150,343],"c":"ax","w":1},{"t":"text","p":[150,356],"s":"1","c":"muted","size":10},{"t":"line","p":[220,338,220,343],"c":"ax","w":1},{"t":"text","p":[220,356],"s":"2","c":"muted","size":10},{"t":"line","p":[290,338,290,343],"c":"ax","w":1},{"t":"text","p":[290,356],"s":"3","c":"muted","size":10},{"t":"line","p":[360,338,360,343],"c":"ax","w":1},{"t":"text","p":[360,356],"s":"4","c":"muted","size":10},{"t":"line","p":[430,338,430,343],"c":"ax","w":1},{"t":"text","p":[430,356],"s":"5","c":"muted","size":10},{"t":"line","p":[500,338,500,343],"c":"ax","w":1},{"t":"text","p":[500,356],"s":"6","c":"muted","size":10},{"t":"line","p":[80,338,530,338],"c":"ax","w":1.2},{"t":"text","p":[530,374],"s":"numero di codoni","c":"ax","size":11,"a":"end"}]}
---
Numero di codoni per ciascun amminoacido e per il segnale di arresto nel codice genetico standard. Leucina, serina e arginina hanno sei codoni; metionina e triptofano uno solo.
:::

## La traduzione {#traduzione}

La **traduzione** trasforma la sequenza di codoni di un mRNA nella sequenza di amminoacidi di una proteina. La compiono i ribosomi, con l'aiuto dei tRNA. Ogni tRNA è una molecola di circa settantacinque nucleotidi ripiegata a forma di L; a un'estremità porta un amminoacido, all'altra una tripletta di basi, l'**anticodone**, che si appaia a un codone dell'mRNA. La vera traduzione avviene prima che il tRNA arrivi al ribosoma: gli enzimi chiamati amminoacil-tRNA sintetasi, di solito venti, uno per amminoacido, riconoscono ciascuno i propri tRNA e vi legano l'amminoacido giusto. Sono questi enzimi a stabilire, molecola per molecola, la corrispondenza del codice.

Il ribosoma si lega all'mRNA vicino al codone di inizio, accoglie il primo tRNA con la metionina e poi, un codone alla volta, i tRNA i cui anticodoni si appaiano ai codoni successivi (figura 5). A ogni passo il centro della peptidil transferasi, fatto di RNA, unisce la catena in crescita al nuovo amminoacido, e il ribosoma avanza di tre nucleotidi. Quando arriva a un codone di arresto, al quale non corrisponde alcun tRNA, una proteina di rilascio libera la catena. Un ribosoma batterico aggiunge circa quindici-venti amminoacidi al secondo, e sbaglia un amminoacido ogni mille-diecimila. La catena di amminoacidi si ripiega poi nella sua forma tridimensionale, spesso con l'aiuto di proteine accompagnatrici, e la forma ne determina la funzione.

::: figura traduzione
{"w":700,"h":215,"items":[{"t":"rect","p":[40,40,90,30],"c":"body","r":4},{"t":"poly","pts":[[40,40],[130,40],[130,70],[40,70]],"close":true,"c":"force2","w":1.6},{"t":"text","p":[85.0,59.0],"s":"AUG","c":"force2","size":13},{"t":"text","p":[85,92],"s":"Met","c":"force3","size":12},{"t":"rect","p":[140,40,90,30],"c":"body","r":4},{"t":"poly","pts":[[140,40],[230,40],[230,70],[140,70]],"close":true,"c":"force2","w":1.6},{"t":"text","p":[185.0,59.0],"s":"GCU","c":"force2","size":13},{"t":"text","p":[185,92],"s":"Ala","c":"force3","size":12},{"t":"rect","p":[240,40,90,30],"c":"body","r":4},{"t":"poly","pts":[[240,40],[330,40],[330,70],[240,70]],"close":true,"c":"force2","w":1.6},{"t":"text","p":[285.0,59.0],"s":"UUC","c":"force2","size":13},{"t":"text","p":[285,92],"s":"Phe","c":"force3","size":12},{"t":"rect","p":[340,40,90,30],"c":"body","r":4},{"t":"poly","pts":[[340,40],[430,40],[430,70],[340,70]],"close":true,"c":"force2","w":1.6},{"t":"text","p":[385.0,59.0],"s":"AAA","c":"force2","size":13},{"t":"text","p":[385,92],"s":"Lys","c":"force3","size":12},{"t":"rect","p":[440,40,90,30],"c":"body","r":4},{"t":"poly","pts":[[440,40],[530,40],[530,70],[440,70]],"close":true,"c":"force2","w":1.6},{"t":"text","p":[485.0,59.0],"s":"UGG","c":"force2","size":13},{"t":"text","p":[485,92],"s":"Trp","c":"force3","size":12},{"t":"rect","p":[540,40,90,30],"c":"body","r":4},{"t":"poly","pts":[[540,40],[630,40],[630,70],[540,70]],"close":true,"c":"force2","w":1.6},{"t":"text","p":[585.0,59.0],"s":"UAA","c":"force2","size":13},{"t":"text","p":[585,92],"s":"Stop","c":"force4","size":12},{"t":"text","p":[370,128],"s":"la stessa sequenza letta a partire dalla seconda base","c":"muted","size":11},{"t":"rect","p":[73,144,90,30],"c":"body","r":4},{"t":"poly","pts":[[73,144],[163,144],[163,174],[73,174]],"close":true,"c":"force","w":1.6},{"t":"text","p":[118.0,163.0],"s":"UGG","c":"force","size":13},{"t":"text","p":[118,196],"s":"Trp","c":"force","size":12},{"t":"rect","p":[173,144,90,30],"c":"body","r":4},{"t":"poly","pts":[[173,144],[263,144],[263,174],[173,174]],"close":true,"c":"force","w":1.6},{"t":"text","p":[218.0,163.0],"s":"CUU","c":"force","size":13},{"t":"text","p":[218,196],"s":"Leu","c":"force","size":12},{"t":"rect","p":[273,144,90,30],"c":"body","r":4},{"t":"poly","pts":[[273,144],[363,144],[363,174],[273,174]],"close":true,"c":"force","w":1.6},{"t":"text","p":[318.0,163.0],"s":"UCA","c":"force","size":13},{"t":"text","p":[318,196],"s":"Ser","c":"force","size":12},{"t":"rect","p":[373,144,90,30],"c":"body","r":4},{"t":"poly","pts":[[373,144],[463,144],[463,174],[373,174]],"close":true,"c":"force","w":1.6},{"t":"text","p":[418.0,163.0],"s":"AAU","c":"force","size":13},{"t":"text","p":[418,196],"s":"Asn","c":"force","size":12},{"t":"rect","p":[473,144,90,30],"c":"body","r":4},{"t":"poly","pts":[[473,144],[563,144],[563,174],[473,174]],"close":true,"c":"force","w":1.6},{"t":"text","p":[518.0,163.0],"s":"GGU","c":"force","size":13},{"t":"text","p":[518,196],"s":"Gly","c":"force","size":12},{"t":"text","p":[30,60],"s":"5′","c":"muted","size":11,"a":"end"},{"t":"text","p":[645,60],"s":"3′","c":"muted","size":11,"a":"start"}]}
---
Lettura di un mRNA a triplette. Nella cornice corretta, che comincia dal codone AUG, la sequenza dà metionina, alanina, fenilalanina, lisina, triptofano e il segnale di arresto. Spostando l'inizio di una base la stessa sequenza dà una serie di amminoacidi completamente diversa: l'inserzione o la perdita di una base in un gene altera tutto ciò che segue.
:::

Un tRNA può riconoscere più di un codone, perché l'appaiamento fra la terza base del codone e la prima dell'anticodone è meno rigido degli altri: Crick chiamò questa tolleranza **vacillamento**. Per leggere i sessantuno codoni di senso bastano quindi meno di sessantuno tipi di tRNA.

## Quanto RNA messaggero? {#modello}

Una cellula non produce tutte le proteine di cui è capace nello stesso momento e nella stessa quantità: ne regola continuamente la produzione. Il primo livello di regolazione è il numero di molecole di mRNA di ciascun gene presenti nella cellula. Questo numero dipende da due processi opposti: la trascrizione, che produce nuove molecole, e la degradazione, con cui enzimi chiamati ribonucleasi le distruggono.

Il modello più semplice suppone che le nuove molecole siano prodotte a velocità costante $\alpha$, in molecole al minuto, e che ogni molecola presente abbia la stessa probabilità di essere degradata in ogni intervallo di tempo, cioè che la degradazione sia del primo ordine con costante $\delta$, in $\mathrm{min^{-1}}$. È lo stesso schema della produzione e decomposizione delle molecole prebiotiche del capitolo [Miller-Urey e la sintesi prebiotica](unit:biology-07).

::: legge Produzione e degradazione dell'mRNA
Il numero medio $m$ di molecole di mRNA segue l'equazione

$$\frac{\mathrm dm}{\mathrm dt}=\alpha-\delta m.$$

Se il gene viene acceso all'istante $t=0$, con $m(0)=0$,

$$m(t)=\frac{\alpha}{\delta}\left(1-\mathrm e^{-\delta t}\right).$$

Il numero tende al valore stazionario $m_\infty=\alpha/\delta$, con tempo caratteristico $1/\delta$; il tempo di dimezzamento di una molecola è $t_{1/2}=\ln2/\delta$.
:::

La soluzione si verifica derivando: $\mathrm dm/\mathrm dt=\alpha\,\mathrm e^{-\delta t}$, e $\alpha-\delta m=\alpha-\alpha(1-\mathrm e^{-\delta t})$ dà lo stesso risultato. Il valore stazionario si ottiene anche senza risolvere l'equazione, imponendo $\mathrm dm/\mathrm dt=0$: produzione e degradazione si bilanciano quando $\alpha=\delta m$.

::: esempio Un gene acceso
Con $\alpha=5$ molecole al minuto e $\delta=0{,}2\un{min^{-1}}$ il valore stazionario è $25$ molecole e il tempo di dimezzamento di un mRNA è $\ln2/0{,}2\simeq3{,}5\un{min}$. Dopo cinque minuti dall'accensione le molecole sono

$$m(5)=25\,(1-\mathrm e^{-1})\simeq15{,}8,$$

dopo dieci minuti circa $21{,}6$. Il $90\%$ del valore stazionario si raggiunge quando $\mathrm e^{-\delta t}=0{,}1$, cioè dopo $\ln10/\delta\simeq11{,}5\un{min}$.
:::

Il modello contiene un'osservazione importante: il tempo necessario per raggiungere il nuovo livello dipende soltanto dalla degradazione. Due geni con lo stesso valore stazionario, uno con $\alpha=5$ e $\delta=0{,}2$, l'altro con $\alpha=10$ e $\delta=0{,}4$, arrivano allo stesso numero di molecole, ma il secondo ci arriva in metà tempo (figura 6). Un mRNA instabile permette risposte rapide, al prezzo di produrre e distruggere il doppio delle molecole. Lo stesso vale quando il gene viene spento: le molecole presenti diminuiscono come $m_\infty\mathrm e^{-\delta t}$, e scompaiono tanto più in fretta quanto più $\delta$ è grande.

::: figura mrna
{"w":780,"h":285,"items":[{"t":"axes","o":[80,250],"x":[660,"tempo (min)"],"y":[240,"molecole di mRNA"],"sx":28,"sy":8,"xt":[[0,"0"],[5,"5"],[10,"10"],[15,"15"],[20,"20"]],"yt":[[0,"0"],[5,"5"],[10,"10"],[15,"15"],[20,"20"],[25,"25"]]},{"t":"line","p":[80,50,640,50],"c":"muted","w":1.2,"dash":true},{"t":"plot","o":[80,250],"sx":28,"sy":8,"pts":[[0.0,0.0],[0.1,0.4950332],[0.2,0.980264],[0.3,1.4558867],[0.4,1.9220913],[0.5,2.3790645],[0.6,2.8269891],[0.7,3.2660441],[0.8,3.6964053],[0.9,4.1182447],[1.0,4.5317312],[1.1,4.9370301],[1.2,5.3343035],[1.3,5.7237104],[1.4,6.1054065],[1.5,6.4795445],[1.6,6.8462741],[1.7,7.2057419],[1.8,7.5580918],[1.9,7.9034648],[2.0,8.2419988],[2.1,8.5738295],[2.2,8.8990895],[2.3,9.2179089],[2.4,9.5304152],[2.5,9.8367335],[2.6,10.1369863],[2.7,10.4312937],[2.8,10.7197734],[2.9,11.0025408],[3.0,11.2797091],[3.1,11.5513891],[3.2,11.8176894],[3.3,12.0787166],[3.4,12.3345752],[3.5,12.5853674],[3.6,12.8311936],[3.7,13.0721521],[3.8,13.3083393],[3.9,13.5398497],[4.0,13.7667759],[4.1,13.9892086],[4.2,14.2072369],[4.3,14.4209479],[4.4,14.6304272],[4.5,14.8357585],[4.6,15.037024],[4.7,15.2343041],[4.8,15.4276779],[4.9,15.6172225],[5.0,15.803014],[5.1,15.9851265],[5.2,16.163633],[5.3,16.3386047],[5.4,16.5101119],[5.5,16.6782229],[5.6,16.8430051],[5.7,17.0045245],[5.8,17.1628455],[5.9,17.3180315],[6.0,17.4701447],[6.1,17.6192458],[6.2,17.7653946],[6.3,17.9086493],[6.4,18.0490675],[6.5,18.1867052],[6.6,18.3216175],[6.7,18.4538583],[6.8,18.5834806],[6.9,18.7105362],[7.0,18.8350759],[7.1,18.9571496],[7.2,19.076806],[7.3,19.1940931],[7.4,19.3090578],[7.5,19.421746],[7.6,19.5322028],[7.7,19.6404725],[7.8,19.7465982],[7.9,19.8506225],[8.0,19.9525871],[8.1,20.0525325],[8.2,20.1504989],[8.3,20.2465255],[8.4,20.3406506],[8.5,20.4329119],[8.6,20.5233463],[8.7,20.61199],[8.8,20.6988784],[8.9,20.7840463],[9.0,20.8675278],[9.1,20.9493562],[9.2,21.0295643],[9.3,21.1081842],[9.4,21.1852474],[9.5,21.2607845],[9.6,21.3348259],[9.7,21.4074013],[9.8,21.4785395],[9.9,21.5482691],[10.0,21.6166179],[10.1,21.6836134],[10.2,21.7492822],[10.3,21.8136508],[10.4,21.8767447],[10.5,21.9385893],[10.6,21.9992093],[10.7,22.0586289],[10.8,22.116872],[10.9,22.1739617],[11.0,22.229921],[11.1,22.2847723],[11.2,22.3385374],[11.3,22.3912379],[11.4,22.4428948],[11.5,22.4935289],[11.6,22.5431604],[11.7,22.591809],[11.8,22.6394944],[11.9,22.6862356],[12.0,22.7320512],[12.1,22.7769596],[12.2,22.8209787],[12.3,22.8641262],[12.4,22.9064194],[12.5,22.947875],[12.6,22.9885098],[12.7,23.02834],[12.8,23.0673815],[12.9,23.1056499],[13.0,23.1431605],[13.1,23.1799284],[13.2,23.2159683],[13.3,23.2512945],[13.4,23.2859211],[13.5,23.3198622],[13.6,23.3531311],[13.7,23.3857413],[13.8,23.4177058],[13.9,23.4490373],[14.0,23.4797484],[14.1,23.5098514],[14.2,23.5393584],[14.3,23.568281],[14.4,23.5966309],[14.5,23.6244195],[14.6,23.6516578],[14.7,23.6783568],[14.8,23.7045271],[14.9,23.7301792],[15.0,23.7553233],[15.1,23.7799695],[15.2,23.8041278],[15.3,23.8278076],[15.4,23.8510186],[15.5,23.8737699],[15.6,23.8960708],[15.7,23.9179301],[15.8,23.9393565],[15.9,23.9603586],[16.0,23.9809449],[16.1,24.0011235],[16.2,24.0209026],[16.3,24.04029],[16.4,24.0592936],[16.5,24.0779208],[16.6,24.0961792],[16.7,24.1140761],[16.8,24.1316185],[16.9,24.1488136],[17.0,24.1656683],[17.1,24.1821891],[17.2,24.1983829],[17.3,24.2142559],[17.4,24.2298147],[17.5,24.2450654],[17.6,24.2600141],[17.7,24.2746668],[17.8,24.2890294],[17.9,24.3031075],[18.0,24.3169069],[18.1,24.3304331],[18.2,24.3436914],[18.3,24.3566872],[18.4,24.3694256],[18.5,24.3819118],[18.6,24.3941508],[18.7,24.4061474],[18.8,24.4179065],[18.9,24.4294327],[19.0,24.4407307],[19.1,24.451805],[19.2,24.46266],[19.3,24.4733],[19.4,24.4837294],[19.5,24.4939522],[19.6,24.5039726],[19.7,24.5137946],[19.8,24.5234221],[19.9,24.532859],[20.0,24.542109]],"c":"force2","w":2.6},{"t":"circle","p":[402.4,70.0,5],"c":"force2"},{"t":"text","p":[648,67.7],"s":"α = 5, δ = 0,2","c":"force2","size":11,"a":"start"},{"t":"plot","o":[80,250],"sx":28,"sy":8,"pts":[[0.0,0.0],[0.1,0.980264],[0.2,1.9220913],[0.3,2.8269891],[0.4,3.6964053],[0.5,4.5317312],[0.6,5.3343035],[0.7,6.1054065],[0.8,6.8462741],[0.9,7.5580918],[1.0,8.2419988],[1.1,8.8990895],[1.2,9.5304152],[1.3,10.1369863],[1.4,10.7197734],[1.5,11.2797091],[1.6,11.8176894],[1.7,12.3345752],[1.8,12.8311936],[1.9,13.3083393],[2.0,13.7667759],[2.1,14.2072369],[2.2,14.6304272],[2.3,15.037024],[2.4,15.4276779],[2.5,15.803014],[2.6,16.163633],[2.7,16.5101119],[2.8,16.8430051],[2.9,17.1628455],[3.0,17.4701447],[3.1,17.7653946],[3.2,18.0490675],[3.3,18.3216175],[3.4,18.5834806],[3.5,18.8350759],[3.6,19.076806],[3.7,19.3090578],[3.8,19.5322028],[3.9,19.7465982],[4.0,19.9525871],[4.1,20.1504989],[4.2,20.3406506],[4.3,20.5233463],[4.4,20.6988784],[4.5,20.8675278],[4.6,21.0295643],[4.7,21.1852474],[4.8,21.3348259],[4.9,21.4785395],[5.0,21.6166179],[5.1,21.7492822],[5.2,21.8767447],[5.3,21.9992093],[5.4,22.116872],[5.5,22.229921],[5.6,22.3385374],[5.7,22.4428948],[5.8,22.5431604],[5.9,22.6394944],[6.0,22.7320512],[6.1,22.8209787],[6.2,22.9064194],[6.3,22.9885098],[6.4,23.0673815],[6.5,23.1431605],[6.6,23.2159683],[6.7,23.2859211],[6.8,23.3531311],[6.9,23.4177058],[7.0,23.4797484],[7.1,23.5393584],[7.2,23.5966309],[7.3,23.6516578],[7.4,23.7045271],[7.5,23.7553233],[7.6,23.8041278],[7.7,23.8510186],[7.8,23.8960708],[7.9,23.9393565],[8.0,23.9809449],[8.1,24.0209026],[8.2,24.0592936],[8.3,24.0961792],[8.4,24.1316185],[8.5,24.1656683],[8.6,24.1983829],[8.7,24.2298147],[8.8,24.2600141],[8.9,24.2890294],[9.0,24.3169069],[9.1,24.3436914],[9.2,24.3694256],[9.3,24.3941508],[9.4,24.4179065],[9.5,24.4407307],[9.6,24.46266],[9.7,24.4837294],[9.8,24.5039726],[9.9,24.5234221],[10.0,24.542109],[10.1,24.5600632],[10.2,24.5773134],[10.3,24.5938871],[10.4,24.6098111],[10.5,24.6251106],[10.6,24.6398102],[10.7,24.6539334],[10.8,24.6675029],[10.9,24.6805403],[11.0,24.6930665],[11.1,24.7051015],[11.2,24.7166647],[11.3,24.7277744],[11.4,24.7384485],[11.5,24.7487041],[11.6,24.7585576],[11.7,24.7680247],[11.8,24.7771205],[11.9,24.7858598],[12.0,24.7942563],[12.1,24.8023236],[12.2,24.8100746],[12.3,24.8175217],[12.4,24.8246768],[12.5,24.8315513],[12.6,24.8381563],[12.7,24.8445023],[12.8,24.8505994],[12.9,24.8564575],[13.0,24.8620859],[13.1,24.8674936],[13.2,24.8726892],[13.3,24.8776812],[13.4,24.8824773],[13.5,24.8870855],[13.6,24.8915129],[13.7,24.8957668],[13.8,24.8998538],[13.9,24.9037806],[14.0,24.9075534],[14.1,24.9111783],[14.2,24.914661],[14.3,24.9180072],[14.4,24.9212222],[14.5,24.9243111],[14.6,24.9272789],[14.7,24.9301304],[14.8,24.93287],[14.9,24.9355022],[15.0,24.9380312],[15.1,24.940461],[15.2,24.9427956],[15.3,24.9450386],[15.4,24.9471937],[15.5,24.9492642],[15.6,24.9512536],[15.7,24.953165],[15.8,24.9550014],[15.9,24.9567658],[16.0,24.9584611],[16.1,24.9600898],[16.2,24.9616547],[16.3,24.9631583],[16.4,24.9646029],[16.5,24.9659908],[16.6,24.9673243],[16.7,24.9686056],[16.8,24.9698365],[16.9,24.9710193],[17.0,24.9721556],[17.1,24.9732474],[17.2,24.9742964],[17.3,24.9753043],[17.4,24.9762726],[17.5,24.977203],[17.6,24.9780968],[17.7,24.9789557],[17.8,24.9797808],[17.9,24.9805736],[18.0,24.9813354],[18.1,24.9820672],[18.2,24.9827704],[18.3,24.9834459],[18.4,24.984095],[18.5,24.9847187],[18.6,24.9853179],[18.7,24.9858936],[18.8,24.9864467],[18.9,24.9869781],[19.0,24.9874887],[19.1,24.9879793],[19.2,24.9884506],[19.3,24.9889035],[19.4,24.9893386],[19.5,24.9897566],[19.6,24.9901583],[19.7,24.9905442],[19.8,24.9909149],[19.9,24.9912712],[20.0,24.9916134]],"c":"force","w":2.6},{"t":"circle","p":[241.2,70.0,5],"c":"force"},{"t":"text","p":[648,44.1],"s":"α = 10, δ = 0,4","c":"force","size":11,"a":"start"}]}
---
Numero di molecole di mRNA dopo l'accensione di un gene, per due geni con lo stesso valore stazionario di $25$ molecole e costanti di degradazione diverse. La linea tratteggiata è il valore stazionario; i punti indicano il raggiungimento del $90\%$, dopo circa $11{,}5$ e $5{,}8$ minuti.
:::

Le misure confermano questa logica. Nei batteri la maggior parte degli mRNA ha tempi di dimezzamento di pochi minuti, fra tre e otto in *E. coli*, adatti a un organismo che deve rispondere in fretta a un ambiente che cambia. Nelle cellule di mammifero coltivate in laboratorio il tempo di dimezzamento mediano degli mRNA è di circa nove ore, e quello delle proteine di circa due giorni. Il modello trascura il fatto che le molecole sono poche e che vengono prodotte a raffiche: in una singola cellula il numero di mRNA fluttua molto attorno al valore medio, e cellule geneticamente identiche nello stesso ambiente possono avere quantità diverse di una stessa proteina.

## Accendere e spegnere i geni {#regolazione}

Nel 1961 François Jacob e Jacques Monod, all'Istituto Pasteur di Parigi, descrissero il primo meccanismo di regolazione di un gene, studiando come *E. coli* usa il lattosio. Tre geni, due dei quali servono a importare il lattosio e a scinderlo, sono vicini sul cromosoma e vengono trascritti insieme, in un unico mRNA, a partire da un solo promotore: formano un **operone**. Accanto al promotore c'è una sequenza, l'operatore, a cui si lega una proteina, il **repressore**, che impedisce alla RNA polimerasi di procedere. Quando nella cellula entra lattosio, una sua forma modificata si lega al repressore, ne cambia la forma e lo stacca dal DNA: i geni vengono trascritti e la cellula produce gli enzimi per usare lo zucchero. Quando il lattosio finisce, il repressore torna sull'operatore e la produzione si ferma.

Un secondo controllo dà la precedenza al glucosio, lo zucchero preferito: quando il glucosio scarseggia, una proteina attivatrice si lega vicino al promotore e aumenta molto la trascrizione dell'operone. La cellula usa quindi il lattosio solo quando il lattosio c'è e il glucosio manca. Nel modello della sezione precedente, il repressore e l'attivatore cambiano la velocità di produzione $\alpha$; la degradazione rapida degli mRNA batterici fa sì che il livello si adegui al nuovo $\alpha$ in pochi minuti. Negli eucarioti la regolazione è più articolata e coinvolge la struttura della cromatina, molti fattori di trascrizione che agiscono insieme, la maturazione e la degradazione dell'RNA e piccoli RNA regolatori.

## Un codice quasi universale {#varianti}

Il codice genetico della tabella è usato dai batteri, dagli archei, dalle piante, dai funghi e dagli animali. Non è però perfettamente universale. Nei mitocondri dei vertebrati UGA indica triptofano anziché arresto, AUA indica metionina, e AGA e AGG sono codoni di arresto. Nei micoplasmi, batteri con genomi molto piccoli, UGA indica triptofano; in alcuni ciliati, come *Tetrahymena*, UAA e UAG indicano glutammina. In molti organismi, compreso l'uomo, il codone UGA, in un contesto particolare dell'mRNA segnalato da una struttura a forcina, inserisce un ventunesimo amminoacido, la selenocisteina, che contiene selenio. In alcuni archei metanogeni, parenti di quelli che popolano i camini di Lost City descritti nel capitolo [Sorgenti idrotermali e metabolismo primordiale](unit:biology-09), il codone UAG inserisce un ventiduesimo amminoacido, la pirrolisina, negli enzimi che consumano le metilammine.

Le varianti sono rare, recenti e derivate: si trovano in rami isolati dell'albero della vita, e quasi sempre riguardano codoni poco usati o genomi piccoli, in cui un cambiamento colpisce pochi geni. Mostrano che il codice può cambiare, ma con difficoltà, perché ogni cambiamento altera simultaneamente tutte le proteine in cui il codone compare. La sostanziale identità del codice in tutti i viventi è quindi la traccia di un'origine comune: tutti gli organismi attuali lo hanno ereditato da un antenato che già lo usava, l'ultimo antenato comune universale.

## L'origine del codice {#origine-codice}

Perché il codice è proprio questo? Nel 1968 Crick propose che fosse un **incidente congelato**: una corrispondenza in larga parte casuale, fissata all'inizio e poi impossibile da cambiare senza danni. Altre ipotesi cercano invece una ragione nella chimica o nella storia.

L'**ipotesi stereochimica** suppone un'affinità diretta fra alcuni amminoacidi e le triplette che li indicano. Michael Yarus e collaboratori hanno selezionato in provetta aptameri di RNA che legano amminoacidi come l'arginina, e hanno trovato nei siti di legame i codoni o gli anticodoni di quegli amminoacidi più spesso di quanto il caso spiegherebbe. L'**ipotesi della coevoluzione**, proposta da Tze-Fei Wong nel 1975, nota che gli amminoacidi prodotti dalle cellule a partire da un altro amminoacido hanno spesso codoni simili a quelli del loro precursore: il codice si sarebbe espanso insieme alle vie di sintesi, cedendo ai nuovi amminoacidi parte dei codoni dei vecchi. In accordo con questa idea, gli amminoacidi più semplici, quelli prodotti negli esperimenti di Miller e trovati nelle meteoriti, come glicina, alanina, acido aspartico e valina, hanno codoni che cominciano con G e sono considerati fra i primi entrati nel codice.

Infine il codice sembra ottimizzato contro gli errori. Nel 1998 Stephen Freeland e Laurence Hurst confrontarono il codice reale con un milione di codici alternativi generati a caso, con la stessa struttura a blocchi, misurando quanto una mutazione puntiforme o un errore di lettura cambiasse in media le proprietà chimiche dell'amminoacido. Solo circa un codice casuale su un milione risultò migliore di quello reale. La selezione naturale potrebbe aver favorito, in una fase in cui il codice era ancora variabile, le assegnazioni che riducevano il danno degli errori. Le tre ipotesi possono essere vere in parte tutte insieme, e il manuale di Morris ricorda la proposta, già discussa nel capitolo [Il mondo a RNA](unit:biology-10), che gli amminoacidi siano entrati nel mondo a RNA come cofattori portati da molecole simili ai tRNA.

## Il codice come firma {#firma}

Per l'astrobiologia queste conclusioni hanno una conseguenza pratica. Se un giorno si trovassero organismi su Marte o in un oceano di Encelado, il loro materiale genetico direbbe molto sulla loro origine. Organismi con il DNA, con le stesse quattro basi, con proteine di venti amminoacidi della forma L e con il codice terrestre sarebbero quasi certamente imparentati con la vita della Terra: frutto di una contaminazione portata dalle sonde, oppure di uno scambio di materiale fra i pianeti attraverso le meteoriti, un tema del capitolo [Panspermia e protezione planetaria](unit:biology-34). Una seconda origine indipendente userebbe con ogni probabilità un codice diverso, e forse molecole diverse.

La chimica terrestre non è infatti l'unica possibile. I laboratori hanno costruito polimeri genetici con zuccheri diversi dal ribosio e dal desossiribosio, chiamati complessivamente XNA, capaci di conservare informazione, di essere copiati da polimerasi modificate e di evolvere in provetta; nel 2019 è stato costruito un DNA a otto lettere, con quattro basi artificiali che si appaiano fra loro, in grado di formare una doppia elica regolare e di essere trascritto in RNA. Il codice e i mattoni della vita terrestre sono una soluzione fra molte, e la scelta di una soluzione diversa sarebbe la firma di una storia diversa.

## Un'esperienza: il DNA delle fragole {#esperienza}

Il DNA si può estrarre in cucina, e la fragola è un materiale ideale: le fragole coltivate sono ottoploidi, cioè hanno otto copie di ogni cromosoma, e le loro cellule ne contengono molto.

::: metodo Fili bianchi di DNA
**Materiale.** Due o tre fragole, un sacchetto di plastica con chiusura a pressione, $100\un{mL}$ d'acqua, due cucchiaini di detersivo liquido per i piatti, un cucchiaino raso di sale da cucina, un filtro da caffè o una garza, un bicchiere trasparente stretto, alcol isopropilico o alcol etilico ad alta gradazione tenuto in freezer per almeno un'ora, uno stuzzicadenti di legno, occhiali protettivi.

**Procedura.** Sciogliere il detersivo e il sale nell'acqua: è il liquido di estrazione. Togliere le foglie alle fragole, metterle nel sacchetto con tre cucchiai di liquido, chiudere e schiacciare con le mani per due minuti, fino a ottenere una purea senza pezzi. Filtrare la purea nel bicchiere fino ad avere circa due centimetri di liquido limpido. Inclinare il bicchiere e versare lentamente lungo la parete un volume uguale di alcol freddo, in modo che formi uno strato sopra il liquido senza mescolarsi. Aspettare qualche minuto e osservare la zona di separazione fra i due strati; raccogliere con lo stuzzicadenti, ruotandolo, la sostanza che vi si forma.

**Analisi.** Descrivere l'aspetto della sostanza raccolta. Spiegare il ruolo di ciascun ingrediente: il detersivo scioglie le membrane di lipidi della cellula e del nucleo; il sale neutralizza le cariche negative dei gruppi fosfato e permette alle molecole di DNA di aggregarsi; l'alcol, in cui il DNA è insolubile, lo fa precipitare. Una doppia elica è larga $2\un{nm}$: stimare quante molecole affiancate servono per formare un filo visibile di un decimo di millimetro, e discutere che cosa contiene, oltre al DNA, la sostanza raccolta.

**Sicurezza.** L'alcol è infiammabile: lavorare lontano da fiamme e fornelli accesi; l'alcol è tossico se ingerito. Usare gli occhiali e lavare le mani alla fine.
:::

I fili bianchi sono matasse di milioni di molecole di DNA, insieme a RNA, proteine e zuccheri della parete cellulare. Un filo largo un decimo di millimetro corrisponde a decine di migliaia di doppie eliche affiancate, se fossero perfettamente allineate; in realtà le molecole sono aggrovigliate, e la massa è molto più grande.

## Errori frequenti {#errori}

::: errore Confondere la doppia elica del DNA con l'alfa elica delle proteine
L'alfa elica è un avvolgimento di una singola catena di amminoacidi, tenuto da legami a idrogeno fra amminoacidi vicini. La doppia elica del DNA è formata da due catene antiparallele di nucleotidi, unite dai legami a idrogeno fra le basi appaiate.
:::

::: errore Confondere il promotore con il codone di inizio
Il promotore è una sequenza del DNA a cui si lega la RNA polimerasi per cominciare la trascrizione; in molti geni eucariotici contiene una sequenza ricca di T e A, la scatola TATA. Il codone di inizio, AUG, appartiene all'mRNA e indica dove comincia la traduzione.
:::

::: errore Credere che il livello di un mRNA dipenda solo dalla produzione
Il valore stazionario è $\alpha/\delta$: dimezzare la degradazione raddoppia il livello quanto raddoppiare la produzione. E il tempo di risposta, $1/\delta$, dipende soltanto dalla degradazione.
:::

::: errore Pensare che il codice genetico sia identico in tutti i viventi
Il codice standard è quasi universale, con varianti nei mitocondri, nei micoplasmi, in alcuni ciliati, e con due amminoacidi aggiuntivi, la selenocisteina e la pirrolisina, inseriti da codoni di arresto in contesti particolari.
:::

::: errore Ritenere che a ogni gene corrisponda una sola proteina
Lo splicing alternativo permette a un gene eucariotico di produrre più proteine diverse, e molti geni producono RNA che svolgono la loro funzione senza essere tradotti.
:::

## Sintesi {#sintesi}

::: sintesi In breve
- Il DNA è una doppia elica di due catene antiparallele, con le basi appaiate A–T e G–C; nella forma B ha diametro di circa $2\un{nm}$ e $0{,}34\un{nm}$ fra coppie successive.
- La replicazione è semiconservativa; le DNA polimerasi allungano le catene in direzione $5'\to3'$ a partire da inneschi di RNA, e grazie a correzione e riparazione sbagliano circa una volta ogni $10^{10}$ nucleotidi.
- La trascrizione produce RNA a partire da un promotore; negli eucarioti gli mRNA vengono maturati e gli introni rimossi.
- Il codice genetico usa $64$ triplette: $61$ indicano amminoacidi e $3$ l'arresto; è degenerato e ordinato in modo da ridurre l'effetto degli errori.
- I ribosomi traducono l'mRNA con l'aiuto dei tRNA; la corrispondenza del codice è stabilita dalle amminoacil-tRNA sintetasi.
- Con produzione costante $\alpha$ e degradazione $\delta$ il numero di mRNA è $m(t)=(\alpha/\delta)(1-\mathrm e^{-\delta t})$: il livello stazionario è $\alpha/\delta$ e il tempo di risposta $1/\delta$.
- I geni sono regolati da repressori e attivatori, come nell'operone del lattosio.
- Il codice è quasi universale, segno di un antenato comune; la sua origine combina forse caso, chimica e selezione contro gli errori. Una vita nata altrove userebbe probabilmente un codice diverso.
:::

## Glossario {#glossario}

- **Anticodone**: tripletta di basi di un tRNA che si appaia a un codone dell'mRNA.
- **Codone**: tripletta di basi dell'mRNA che indica un amminoacido o la fine della traduzione.
- **Cornice di lettura**: suddivisione di una sequenza in triplette consecutive a partire da un punto di inizio.
- **Degradazione**: distruzione delle molecole di RNA da parte di enzimi, che ne limita la durata.
- **Doppia elica**: struttura del DNA formata da due catene antiparallele avvolte, unite dalle basi appaiate.
- **Introne**: tratto di un gene trascritto in RNA e poi rimosso prima della traduzione.
- **Operone**: gruppo di geni batterici trascritti insieme da un solo promotore e regolati insieme.
- **Promotore**: sequenza di DNA a cui si lega la RNA polimerasi per cominciare la trascrizione.
- **Replicazione semiconservativa**: copiatura del DNA in cui ogni doppia elica figlia contiene una catena parentale e una nuova.
- **Repressore**: proteina che si lega al DNA e impedisce la trascrizione di un gene.
- **RNA messaggero**: RNA che porta la sequenza di una proteina dal DNA al ribosoma.
- **Traduzione**: sintesi di una proteina secondo la sequenza di codoni di un mRNA.
- **Trascrizione**: sintesi di un RNA complementare a un tratto di DNA.
- **Vacillamento**: appaiamento meno rigido fra la terza base del codone e la prima dell'anticodone.

## Esercizi {#esercizi}

::: esercizio Dal gene all'mRNA [base]
La catena codificante di un tratto di gene è $5'$-ATGGCTTTC-$3'$. Scrivere la catena stampo, nel verso da $5'$ a $3'$, l'mRNA trascritto e gli amminoacidi corrispondenti.
>>> soluzione
La catena stampo, complementare e antiparallela, è $5'$-GAAAGCCAT-$3'$. L'mRNA ha la sequenza della catena codificante con U al posto di T: $5'$-AUGGCUUUC-$3'$. I codoni AUG, GCU e UUC danno metionina, alanina e fenilalanina.
:::

::: esercizio Le regole di Chargaff [base]
In un campione di DNA a doppio filamento il $30\%$ delle basi è adenina. Quali sono le percentuali delle altre basi?
>>> soluzione
La timina è uguale all'adenina, $30\%$. Restano $40\%$ di guanina e citosina, che sono uguali fra loro: $20\%$ ciascuna.
:::

::: esercizio Tradurre una sequenza [base]
Tradurre l'mRNA $5'$-AUGGCUUUCAAAUGGUAA-$3'$ a partire dal primo nucleotide. Che cosa succede se si comincia dal secondo?
>>> soluzione
I codoni AUG, GCU, UUC, AAA, UGG e UAA danno metionina, alanina, fenilalanina, lisina, triptofano e arresto. Cominciando dal secondo nucleotide i codoni sono UGG, CUU, UCA, AAU e GGU: triptofano, leucina, serina, asparagina, glicina, una proteina del tutto diversa e senza un arresto nella sequenza data.
:::

::: esercizio Perché triplette [base]
Quante combinazioni diverse si ottengono con parole di una, due e tre basi? Perché la natura usa triplette?
>>> soluzione
Con quattro basi si hanno $4$, $4^2=16$ e $4^3=64$ combinazioni. Servono almeno venti significati per gli amminoacidi e uno per l'arresto: le coppie non bastano, le triplette sì, con un'abbondanza che permette la ridondanza del codice.
:::

::: esercizio Due metri di DNA [base]
Il genoma umano conta circa $3{,}1\times10^9$ coppie di basi per corredo, e una cellula ne ha due corredi. Quanto è lungo il DNA di una cellula, se le coppie distano $0{,}34\un{nm}$?
>>> soluzione
La lunghezza è

$$2\cdot3{,}1\times10^9\cdot0{,}34\times10^{-9}\un{m}\simeq2{,}1\un{m}.$$

Nel nucleo, di diametro dell'ordine di dieci micrometri, il DNA deve essere compattato di centinaia di migliaia di volte.
:::

::: esercizio Il livello stazionario [base]
Un gene produce $5$ molecole di mRNA al minuto, e la costante di degradazione è $0{,}2\un{min^{-1}}$. Calcolare il numero stazionario di molecole e il tempo di dimezzamento di un mRNA. Che cosa succede al livello stazionario se la produzione raddoppia?
>>> soluzione
Il valore stazionario è $5/0{,}2=25$ molecole; il tempo di dimezzamento è $\ln2/0{,}2\simeq3{,}5\un{min}$. Raddoppiando la produzione il livello stazionario raddoppia, a $50$ molecole, e il tempo per raggiungerlo resta lo stesso.
:::

::: esercizio Quaranta minuti [medio]
Il cromosoma circolare di *E. coli* conta $4{,}64\times10^6$ coppie di basi e viene copiato da due forcelle che partono da un'unica origine e avanzano di circa mille nucleotidi al secondo. Quanto dura la replicazione?
>>> soluzione
Ogni forcella copia metà del cromosoma, $2{,}32\times10^6$ coppie di basi, in $2320\un{s}$, cioè circa $39\un{min}$.
:::

::: esercizio Mutazioni in una coltura [medio]
Con $2{,}2\times10^{-10}$ mutazioni per nucleotide per generazione, quante mutazioni compaiono in media in un genoma di *E. coli* a ogni divisione? E in una coltura di un miliardo di cellule, in una generazione?
>>> soluzione
Per genoma

$$4{,}64\times10^6\cdot2{,}2\times10^{-10}\simeq1{,}0\times10^{-3},$$

circa una mutazione ogni mille divisioni. In un miliardo di cellule compaiono circa un milione di mutazioni nuove a ogni generazione: ogni possibile mutazione puntiforme del genoma è presente da qualche parte nella coltura.
:::

::: esercizio Dal gene alla proteina [medio]
Il tratto codificante di un gene batterico è lungo $900$ nucleotidi, compreso il codone di arresto. Quanti amminoacidi ha la proteina? Stimarne la massa, con $110\un{Da}$ per amminoacido, e il tempo di traduzione a $15$ amminoacidi al secondo.
>>> soluzione
I codoni sono $300$, di cui uno di arresto: la proteina ha $299$ amminoacidi e una massa di circa $299\cdot110\simeq33\,000\un{Da}$, cioè $33\un{kDa}$. La traduzione richiede circa $299/15\simeq20\un{s}$.
:::

::: esercizio Accensione di un gene [medio]
Con $\alpha=5$ molecole al minuto e $\delta=0{,}2\un{min^{-1}}$, calcolare il numero di mRNA $5$ e $10$ minuti dopo l'accensione e il tempo per raggiungere il $90\%$ del valore stazionario.
>>> soluzione
Si ha $m(5)=25(1-\mathrm e^{-1})\simeq15{,}8$ e $m(10)=25(1-\mathrm e^{-2})\simeq21{,}6$. Il $90\%$ si raggiunge per $\mathrm e^{-0{,}2t}=0{,}1$, cioè $t=\ln10/0{,}2\simeq11{,}5\un{min}$.
:::

::: esercizio Due geni, una sola risposta [medio]
Due geni hanno lo stesso livello stazionario di $25$ molecole: il primo con $\alpha=5$ e $\delta=0{,}2$, il secondo con $\alpha=10$ e $\delta=0{,}4$, nelle unità consuete. Quante molecole ha ciascuno $2{,}5$ minuti dopo l'accensione? Quale risponde più in fretta, e a quale costo?
>>> soluzione
Il primo ha

$$25(1-\mathrm e^{-0{,}5})\simeq9{,}8$$

molecole, il secondo $25(1-\mathrm e^{-1})\simeq15{,}8$. Il secondo raggiunge il $90\%$ in $\ln10/0{,}4\simeq5{,}8\un{min}$, il primo in circa $11{,}5$. La rapidità costa il doppio di trascrizione e di degradazione per mantenere lo stesso livello.
:::

::: esercizio Spegnere un gene [medio]
Un gene con $25$ molecole di mRNA e $\delta=0{,}2\un{min^{-1}}$ viene spento. Quante molecole restano dopo $10$ minuti? Dopo quanto tempo il numero medio scende sotto una molecola?
>>> soluzione
Restano $25\,\mathrm e^{-2}\simeq3{,}4$ molecole. Il numero medio scende sotto $1$ quando $25\,\mathrm e^{-0{,}2t}<1$, cioè per $t>\ln25/0{,}2\simeq16\un{min}$.
:::

::: esercizio Proteine senza errori [avanzato]
Un ribosoma sbaglia un amminoacido con probabilità compresa fra $10^{-4}$ e $10^{-3}$ per codone. Qual è la probabilità che una proteina di $300$ amminoacidi sia priva di errori nei due casi? Confrontare con la probabilità di copiare senza errori l'intero genoma di *E. coli*, con $2{,}2\times10^{-10}$ errori per nucleotide.
>>> soluzione
Con $10^{-4}$ la probabilità è $0{,}9999^{300}\simeq0{,}97$; con $10^{-3}$ è $0{,}999^{300}\simeq0{,}74$. Per il genoma

$$\mathrm e^{-4{,}64\times10^6\cdot2{,}2\times10^{-10}}\simeq0{,}999.$$

La cellula tollera molti errori nelle proteine, che vengono sostituite, e pochissimi nel DNA, che viene trasmesso.
:::

::: esercizio Un arresto per caso [avanzato]
Dopo l'inserzione di una base, un ribosoma legge una cornice sbagliata. Supponendo che i codoni della nuova cornice siano casuali, qual è la probabilità che un codone sia di arresto, e dopo quanti codoni in media il ribosoma si ferma?
>>> soluzione
I codoni di arresto sono $3$ su $64$: la probabilità è $3/64\simeq0{,}047$. Il numero medio di codoni letti fino al primo arresto è il reciproco, $64/3\simeq21$. La proteina sbagliata termina presto, il che limita i danni di uno spostamento della cornice.
:::

::: esercizio L'informazione di un codone [avanzato]
Quanti bit di informazione porta una tripletta di basi? Quanti ne servirebbero per distinguere $21$ significati, cioè venti amminoacidi e l'arresto? Quanta informazione contiene il genoma di *E. coli*, a due bit per coppia di basi?
>>> soluzione
Una tripletta porta $\log_264=6$ bit; per $21$ significati ne bastano $\log_221\simeq4{,}39$. Circa il $27\%$ della capacità del codice è quindi ridondanza, usata per la tolleranza agli errori. Il genoma di *E. coli* contiene circa $4{,}64\times10^6\cdot2\simeq9{,}3\times10^6$ bit, cioè circa $1{,}2$ milioni di byte.
:::

::: esercizio Dall'mRNA alle proteine [avanzato]
Ogni mRNA dell'esempio con $25$ molecole stazionarie viene tradotto in una proteina al minuto, e le proteine hanno un tempo di dimezzamento di $30$ minuti, dovuto soprattutto alla diluizione per crescita della cellula. Applicando alle proteine lo stesso modello di produzione e degradazione, stimare il numero stazionario di proteine.
>>> soluzione
La produzione di proteine è $25$ al minuto e la costante di degradazione $\ln2/30\simeq0{,}0231\un{min^{-1}}$. Il numero stazionario è

$$\frac{25}{0{,}0231}\simeq1080$$

proteine. Il tempo di risposta delle proteine, circa $43\un{min}$, è molto più lungo di quello degli mRNA, e domina la risposta della cellula.
:::

## Fonti {#fonti}

Il testo, le figure, gli esempi e gli esercizi di questo capitolo sono originali. Per la scelta e l'ordine degli argomenti i riferimenti principali sono A. M. Shaw, *Astrochemistry: From Astronomy to Astrobiology*, Wiley, 2006, §1.3 (origini della vita, informazione genetica e codice) e §9.2 (protocellule e insieme minimo di geni), e J. R. Morris, D. L. Hartl, A. H. Knoll e collaboratori, *Biology: How Life Works*, 2ª edizione, Macmillan, 2016, §3.1–3.4 (DNA, trascrizione e maturazione dell'RNA), §4.1 (struttura delle proteine), §4.2 (traduzione e codice genetico, con la scheda sull'origine del codice), §12.1 (replicazione del DNA), §19.2 (dall'mRNA al fenotipo) e §19.3 (regolazione della trascrizione nei procarioti). Tre affermazioni del §1.3 di Shaw sono state corrette: la struttura del DNA è una doppia elica, distinta dall'alfa elica delle proteine; UGU indica la cisteina; la traduzione comincia dal codone AUG, mentre la sequenza TATA appartiene ai promotori di molti geni eucariotici. Dati ed esperimenti provengono dalle fonti primarie seguenti.

1. E. Chargaff, *Experientia* 6, 201 (1950): composizione in basi del DNA.
2. J. D. Watson, F. H. C. Crick, *Nature* 171, 737 (1953); R. E. Franklin, R. G. Gosling, *Nature* 171, 740 (1953): la doppia elica.
3. M. Meselson, F. W. Stahl, *PNAS* 44, 671 (1958): replicazione semiconservativa.
4. F. R. Blattner e collaboratori, *Science* 277, 1453 (1997): il genoma di *E. coli*; H. Lee, E. Popodi, H. Tang, P. L. Foster, *PNAS* 109, E2774 (2012): tasso di mutazione di *E. coli*.
5. F. H. C. Crick, L. Barnett, S. Brenner, R. J. Watts-Tobin, *Nature* 192, 1227 (1961); M. W. Nirenberg, J. H. Matthaei, *PNAS* 47, 1588 (1961): natura del codice e primo codone.
6. F. H. C. Crick, *Journal of Molecular Biology* 19, 548 (1966): il vacillamento; *Journal of Molecular Biology* 38, 367 (1968): l'incidente congelato; *Nature* 227, 561 (1970): il dogma centrale.
7. H. M. Temin, S. Mizutani, *Nature* 226, 1211 (1970); D. Baltimore, *Nature* 226, 1209 (1970): la trascrittasi inversa.
8. F. Jacob, J. Monod, *Journal of Molecular Biology* 3, 318 (1961): l'operone del lattosio.
9. J. A. Bernstein e collaboratori, *PNAS* 99, 9697 (2002); B. Schwanhäusser e collaboratori, *Nature* 473, 337 (2011): durata degli mRNA e delle proteine.
10. A. Böck e collaboratori, *Molecular Microbiology* 5, 515 (1991): la selenocisteina; G. Srinivasan, C. M. James, J. A. Krzycki, *Science* 296, 1459 (2002): la pirrolisina; tabelle dei codici genetici del National Center for Biotechnology Information.
11. M. Yarus, J. J. Widmann, R. Knight, *Journal of Molecular Evolution* 69, 406 (2009); J. T.-F. Wong, *PNAS* 72, 1909 (1975); S. J. Freeland, L. D. Hurst, *Journal of Molecular Evolution* 47, 238 (1998): origine del codice.
12. V. B. Pinheiro e collaboratori, *Science* 336, 341 (2012); S. Hoshika e collaboratori, *Science* 363, 884 (2019): polimeri genetici sintetici.
13. Velocità di replicazione, trascrizione e traduzione: R. Milo, R. Phillips, *Cell Biology by the Numbers*, Garland Science, 2016.
