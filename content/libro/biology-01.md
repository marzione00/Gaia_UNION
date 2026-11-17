---
unit: biology-01
titolo: Che cos'è la vita
sottotitolo: Definizioni, casi limite, carbonio e acqua liquida
volume: Volume di biologia
fonte: Testo originale; riferimenti principali A. M. Shaw, Astrochemistry, §1.3, 1.5, 8.1; J. R. Morris et al., Biology: How Life Works, 2ª ed., §1.2, 1.3, 2.3, 2.4
---

## Prima di cominciare {#apertura}

Nel 1976 due lander Viking scesero su Marte con un piccolo laboratorio di biologia a bordo. Raccolsero il suolo con un braccio meccanico, lo bagnarono con una soluzione di nutrienti marcati con carbonio radioattivo e misurarono i gas che uscivano. In uno degli esperimenti il gas radioattivo comparve subito, come se nel suolo ci fossero microrganismi che si nutrivano, e mancava quando il campione era stato prima scaldato a $160\,^\circ\mathrm C$, come ci si aspetta se il calore uccide gli organismi. Gli altri esperimenti diedero segnali deboli o difficili da interpretare, e lo strumento che cercava molecole organiche non ne trovò. Il dibattito su come interpretare quei risultati dura ancora oggi. Il motivo profondo è semplice da enunciare: per decidere se un esperimento ha trovato la vita bisogna sapere che cosa si sta cercando.

Questo capitolo affronta la domanda da cui parte tutta l'astrobiologia. Che cosa distingue un essere vivente da un sistema chimico complicato? Quali proprietà sono essenziali e quali sono soltanto abitudini della vita terrestre? Perché tutti gli organismi conosciuti sono costruiti con il carbonio e funzionano in acqua liquida? E in quali condizioni di temperatura e di pressione l'acqua resta liquida, su un altro pianeta?

::: obiettivi
- elencare le proprietà che di solito si attribuiscono ai viventi e riconoscere i casi che sfuggono a ciascuna;
- confrontare la definizione operativa della NASA con le definizioni basate sul metabolismo, sulla termodinamica e sull'organizzazione;
- discutere perché virus, viroidi, spore e fiamme sono casi limite;
- spiegare con dati quantitativi perché il carbonio e l'acqua sono adatti alla vita, e quali alternative si discutono;
- usare il diagramma di fase dell'acqua e la relazione di Clausius-Clapeyron per stabilire dove l'acqua può restare liquida;
- elencare i requisiti di un ambiente abitabile.
:::

Il capitolo usa le idee di legame e di energia di legame del capitolo [Legame covalente ed energia di legame](unit:chemistry-07), le forze intermolecolari del capitolo [Forze intermolecolari](unit:chemistry-09) e i passaggi di stato del capitolo [Stati della materia e transizioni](unit:chemistry-11). Le dimensioni delle cellule sono il tema di [Cellule, scala e superficie](unit:biology-02); il confine che separa un organismo dall'ambiente è trattato in [Membrane e protocellule](unit:biology-03).

## Una domanda difficile e necessaria {#domanda}

Nella vita quotidiana distinguere un essere vivente da un oggetto inanimato sembra facile. Un gatto è vivo, un sasso no; un albero è vivo, un tavolo di legno no. Le difficoltà cominciano quando si cerca di dire con precisione su che cosa si basa il giudizio. Il gatto si muove, ma si muove anche un fiume. L'albero cresce, ma cresce anche un cristallo di sale in una soluzione che evapora. Il gatto mangia e respira, ma anche una fiamma consuma combustibile e ossigeno e rilascia prodotti di scarto.

Per la biologia terrestre questa difficoltà ha poche conseguenze pratiche, perché tutti gli organismi conosciuti condividono la stessa chimica e discendono da un antenato comune: basta riconoscere le cellule, il DNA, le proteine. Per l'astrobiologia, che cerca la vita fuori dalla Terra, la questione è centrale. Un organismo nato su un altro pianeta potrebbe usare molecole diverse dalle nostre, e un criterio troppo legato alla vita terrestre rischierebbe di non riconoscerlo. Un criterio troppo largo, all'opposto, rischierebbe di scambiare per vita un processo puramente chimico, come forse accadde con uno degli esperimenti Viking.

Le strategie usate per uscire da questa difficoltà sono tre. La prima consiste nell'elencare proprietà condivise da tutti i viventi conosciuti. La seconda consiste nel cercare una definizione breve e generale, che catturi l'essenziale. La terza, più recente, rinuncia a una definizione e cerca piuttosto una teoria generale dei sistemi viventi, allo stesso modo in cui la chimica ha smesso di definire l'acqua con le sue proprietà quando ha capito che è fatta di molecole $\mathrm{H_2O}$.

## Le proprietà dei viventi {#proprieta}

I manuali di biologia descrivono gli esseri viventi attraverso un insieme di proprietà. Sono organizzati in **cellule**, delimitate da membrane. Hanno un **metabolismo**, cioè una rete di reazioni chimiche con cui trasformano l'energia e la materia presa dall'ambiente. Mantengono costanti alcune condizioni interne, una capacità chiamata **omeostasi**. **Crescono** e si **riproducono**, trasmettendo ai discendenti un'**informazione** scritta negli acidi nucleici. **Rispondono** agli stimoli dell'ambiente. Infine, nel corso delle generazioni, le popolazioni **evolvono**: le varianti più adatte si diffondono, e nascono forme nuove.

Ciascuna proprietà, presa da sola, lascia fuori qualcosa o fa entrare qualcosa di troppo (figura 1). Una fiamma ha una specie di metabolismo e cresce, e quando una scintilla accende un nuovo fuoco sembra riprodursi. Un cristallo cresce e, se si spezza, ciascun frammento continua a crescere. Un mulo è certamente vivo, ma è sterile: non si riproduce. Una spora batterica può restare per anni senza alcun metabolismo misurabile e poi tornare attiva. Un virus si riproduce ed evolve, ma solo dentro una cellula ospite.

::: figura proprieta
{"w":600,"h":305,"items":[{"t":"text","p":[250,34],"s":"metabolismo","c":"ax","size":12},{"t":"text","p":[340,34],"s":"crescita","c":"ax","size":12},{"t":"text","p":[430,34],"s":"riproduzione","c":"ax","size":12},{"t":"text","p":[520,34],"s":"evoluzione","c":"ax","size":12},{"t":"text","p":[60,76],"s":"batterio","c":"ax","size":13,"a":"start"},{"t":"line","p":[50,89,570,89],"c":"muted","w":0.6},{"t":"circle","p":[250,72,8],"c":"force2"},{"t":"circle","p":[340,72,8],"c":"force2"},{"t":"circle","p":[430,72,8],"c":"force2"},{"t":"circle","p":[520,72,8],"c":"force2"},{"t":"text","p":[60,110],"s":"fiamma","c":"ax","size":13,"a":"start"},{"t":"line","p":[50,123,570,123],"c":"muted","w":0.6},{"t":"poly","pts":[[258.0,106.0],[257.8,107.6],[257.4,109.1],[256.7,110.4],[255.7,111.7],[254.4,112.7],[253.1,113.4],[251.6,113.8],[250.0,114.0],[248.4,113.8],[246.9,113.4],[245.6,112.7],[244.3,111.7],[243.3,110.4],[242.6,109.1],[242.2,107.6],[242.0,106.0],[242.2,104.4],[242.6,102.9],[243.3,101.6],[244.3,100.3],[245.6,99.3],[246.9,98.6],[248.4,98.2],[250.0,98.0],[251.6,98.2],[253.1,98.6],[254.4,99.3],[255.7,100.3],[256.7,101.6],[257.4,102.9],[257.8,104.4]],"c":"force2","w":2,"close":true},{"t":"circle","p":[340,106,8],"c":"force2"},{"t":"poly","pts":[[438.0,106.0],[437.8,107.6],[437.4,109.1],[436.7,110.4],[435.7,111.7],[434.4,112.7],[433.1,113.4],[431.6,113.8],[430.0,114.0],[428.4,113.8],[426.9,113.4],[425.6,112.7],[424.3,111.7],[423.3,110.4],[422.6,109.1],[422.2,107.6],[422.0,106.0],[422.2,104.4],[422.6,102.9],[423.3,101.6],[424.3,100.3],[425.6,99.3],[426.9,98.6],[428.4,98.2],[430.0,98.0],[431.6,98.2],[433.1,98.6],[434.4,99.3],[435.7,100.3],[436.7,101.6],[437.4,102.9],[437.8,104.4]],"c":"force2","w":2,"close":true},{"t":"line","p":[513,106,527,106],"c":"muted","w":2},{"t":"text","p":[60,144],"s":"cristallo","c":"ax","size":13,"a":"start"},{"t":"line","p":[50,157,570,157],"c":"muted","w":0.6},{"t":"line","p":[243,140,257,140],"c":"muted","w":2},{"t":"circle","p":[340,140,8],"c":"force2"},{"t":"poly","pts":[[438.0,140.0],[437.8,141.6],[437.4,143.1],[436.7,144.4],[435.7,145.7],[434.4,146.7],[433.1,147.4],[431.6,147.8],[430.0,148.0],[428.4,147.8],[426.9,147.4],[425.6,146.7],[424.3,145.7],[423.3,144.4],[422.6,143.1],[422.2,141.6],[422.0,140.0],[422.2,138.4],[422.6,136.9],[423.3,135.6],[424.3,134.3],[425.6,133.3],[426.9,132.6],[428.4,132.2],[430.0,132.0],[431.6,132.2],[433.1,132.6],[434.4,133.3],[435.7,134.3],[436.7,135.6],[437.4,136.9],[437.8,138.4]],"c":"force2","w":2,"close":true},{"t":"line","p":[513,140,527,140],"c":"muted","w":2},{"t":"text","p":[60,178],"s":"virus","c":"ax","size":13,"a":"start"},{"t":"line","p":[50,191,570,191],"c":"muted","w":0.6},{"t":"line","p":[243,174,257,174],"c":"muted","w":2},{"t":"line","p":[333,174,347,174],"c":"muted","w":2},{"t":"poly","pts":[[438.0,174.0],[437.8,175.6],[437.4,177.1],[436.7,178.4],[435.7,179.7],[434.4,180.7],[433.1,181.4],[431.6,181.8],[430.0,182.0],[428.4,181.8],[426.9,181.4],[425.6,180.7],[424.3,179.7],[423.3,178.4],[422.6,177.1],[422.2,175.6],[422.0,174.0],[422.2,172.4],[422.6,170.9],[423.3,169.6],[424.3,168.3],[425.6,167.3],[426.9,166.6],[428.4,166.2],[430.0,166.0],[431.6,166.2],[433.1,166.6],[434.4,167.3],[435.7,168.3],[436.7,169.6],[437.4,170.9],[437.8,172.4]],"c":"force2","w":2,"close":true},{"t":"circle","p":[520,174,8],"c":"force2"},{"t":"text","p":[60,212],"s":"mulo","c":"ax","size":13,"a":"start"},{"t":"line","p":[50,225,570,225],"c":"muted","w":0.6},{"t":"circle","p":[250,208,8],"c":"force2"},{"t":"circle","p":[340,208,8],"c":"force2"},{"t":"line","p":[423,208,437,208],"c":"muted","w":2},{"t":"line","p":[513,208,527,208],"c":"muted","w":2},{"t":"text","p":[60,246],"s":"spora","c":"ax","size":13,"a":"start"},{"t":"line","p":[50,259,570,259],"c":"muted","w":0.6},{"t":"line","p":[243,242,257,242],"c":"muted","w":2},{"t":"line","p":[333,242,347,242],"c":"muted","w":2},{"t":"poly","pts":[[438.0,242.0],[437.8,243.6],[437.4,245.1],[436.7,246.4],[435.7,247.7],[434.4,248.7],[433.1,249.4],[431.6,249.8],[430.0,250.0],[428.4,249.8],[426.9,249.4],[425.6,248.7],[424.3,247.7],[423.3,246.4],[422.6,245.1],[422.2,243.6],[422.0,242.0],[422.2,240.4],[422.6,238.9],[423.3,237.6],[424.3,236.3],[425.6,235.3],[426.9,234.6],[428.4,234.2],[430.0,234.0],[431.6,234.2],[433.1,234.6],[434.4,235.3],[435.7,236.3],[436.7,237.6],[437.4,238.9],[437.8,240.4]],"c":"force2","w":2,"close":true},{"t":"poly","pts":[[528.0,242.0],[527.8,243.6],[527.4,245.1],[526.7,246.4],[525.7,247.7],[524.4,248.7],[523.1,249.4],[521.6,249.8],[520.0,250.0],[518.4,249.8],[516.9,249.4],[515.6,248.7],[514.3,247.7],[513.3,246.4],[512.6,245.1],[512.2,243.6],[512.0,242.0],[512.2,240.4],[512.6,238.9],[513.3,237.6],[514.3,236.3],[515.6,235.3],[516.9,234.6],[518.4,234.2],[520.0,234.0],[521.6,234.2],[523.1,234.6],[524.4,235.3],[525.7,236.3],[526.7,237.6],[527.4,238.9],[527.8,240.4]],"c":"force2","w":2,"close":true},{"t":"circle","p":[120,288,6],"c":"force2"},{"t":"text","p":[132,292],"s":"sì","c":"ax","size":11,"a":"start"},{"t":"poly","pts":[[196.0,288.0],[195.9,289.2],[195.5,290.3],[195.0,291.3],[194.2,292.2],[193.3,293.0],[192.3,293.5],[191.2,293.9],[190.0,294.0],[188.8,293.9],[187.7,293.5],[186.7,293.0],[185.8,292.2],[185.0,291.3],[184.5,290.3],[184.1,289.2],[184.0,288.0],[184.1,286.8],[184.5,285.7],[185.0,284.7],[185.8,283.8],[186.7,283.0],[187.7,282.5],[188.8,282.1],[190.0,282.0],[191.2,282.1],[192.3,282.5],[193.3,283.0],[194.2,283.8],[195.0,284.7],[195.5,285.7],[195.9,286.8]],"c":"force2","w":2,"close":true},{"t":"text","p":[202,292],"s":"solo in certe condizioni o in senso lato","c":"ax","size":11,"a":"start"},{"t":"line","p":[450,288,462,288],"c":"muted","w":2},{"t":"text","p":[470,292],"s":"no","c":"ax","size":11,"a":"start"}]}
---
Alcune proprietà dei viventi applicate a sei casi. Il batterio le possiede tutte; ogni altro caso ne possiede solo una parte. Nessuna proprietà da sola separa con certezza ciò che è vivo da ciò che non lo è.
:::

Il problema non è soltanto filosofico. Shaw, nel suo testo di astrochimica, discute proprio il caso della fiamma di una candela, che a bordo di un veicolo spaziale in assenza di peso cambia forma e diventa sferica, perché senza gravità il gas caldo non sale e l'ossigeno arriva solo per diffusione. La fiamma si adatta all'ambiente. Nessuno però la considera viva: le manca qualcosa che il batterio ha, e che le proprietà dell'elenco descrivono solo indirettamente.

## Definizioni a confronto {#definizioni}

### La definizione operativa della NASA {#nasa}

All'inizio degli anni Novanta un gruppo di lavoro di esobiologia della NASA discusse quale criterio usare per riconoscere la vita nelle missioni future. La formula che ne uscì, citata da Gerald Joyce nella prefazione di un libro sulle origini della vita del 1994, è diventata la più nota del campo.

::: definizione Definizione operativa della NASA
La vita è un sistema chimico autosufficiente capace di evoluzione darwiniana.
:::

Ogni parola ha un peso. *Sistema chimico* esclude i programmi di un calcolatore e qualunque entità non materiale. *Autosufficiente* significa che il sistema mantiene da sé il proprio funzionamento, prendendo energia e materia dall'ambiente senza dipendere da un altro sistema vivente che lo faccia funzionare. *Capace di evoluzione darwiniana* significa che il sistema conserva un'informazione ereditaria, la copia con piccoli errori e la trasmette, in modo che la selezione naturale possa agire sulle varianti. Joyce ha riassunto l'idea in una frase: la biologia è chimica con una storia.

La definizione ha due pregi. È breve, e mette al centro l'evoluzione, la proprietà che spiega tutte le altre: cellule, metabolismo e omeostasi sono soluzioni che l'evoluzione ha trovato. Ha anche limiti evidenti. Un singolo individuo, un mulo o un batterio isolato, resta lo stesso per tutta la vita; a evolvere sono le popolazioni. Inoltre la definizione è difficile da applicare a un campione: per verificare che un sistema sia capace di evoluzione bisognerebbe osservarlo per molte generazioni, cosa impossibile con un lander su un altro pianeta.

### Altre definizioni {#altre}

Nel 1944 il fisico Erwin Schrödinger, in un libro intitolato *Che cos'è la vita?*, propose di guardare ai viventi dal punto di vista della termodinamica. Un organismo mantiene un alto grado di ordine interno in un universo in cui l'entropia tende ad aumentare; può farlo perché è un sistema aperto, che importa energia di alta qualità, per esempio la luce o le molecole del cibo, ed esporta calore ed entropia. La descrizione è corretta, ma vale anche per un uragano o per una fiamma.

Nel 1971 il chimico ungherese Tibor Gánti descrisse il **chemotone**, un modello astratto di sistema vivente minimo formato da tre sottosistemi chimici accoppiati: un metabolismo autocatalitico, che produce le proprie molecole; un sistema di stampi, che porta l'informazione e la copia; una membrana, che racchiude il tutto e cresce con esso. Il modello anticipa molto da vicino le protocellule studiate oggi in laboratorio.

Nel 1973 i biologi cileni Humberto Maturana e Francisco Varela proposero la nozione di **autopoiesi**: un sistema vivente è una rete di processi che produce continuamente i propri componenti, compreso il confine che la separa dall'ambiente. La definizione mette in primo piano l'organizzazione e il metabolismo, e lascia l'evoluzione in secondo piano.

Le definizioni disponibili sono molte. Nel suo libro *Genesis* il mineralogista Robert Hazen ricorda un testo sulle origini della vita che ne raccoglieva in appendice quarantotto, di altrettanti studiosi, tutte diverse. La filosofa Carol Cleland e l'astrobiologo Christopher Chyba hanno sostenuto nel 2002 che questa abbondanza è un sintomo. Prima della teoria atomica, osservano, l'acqua era definita dalle sue proprietà: liquida, trasparente, capace di sciogliere molte sostanze. Nessun elenco di proprietà poteva dire che cosa fosse davvero; fu la teoria molecolare a stabilire che l'acqua è $\mathrm{H_2O}$. Allo stesso modo, una definizione della vita basata su un solo esempio, la vita terrestre, sarebbe comunque provvisoria. Servirebbe una teoria generale dei sistemi viventi, e per costruirla servirebbe un secondo esempio di vita, indipendente dal nostro.

::: storia Le tappe di una domanda antica
Le definizioni moderne della vita hanno meno di un secolo, ma si appoggiano a scoperte più antiche: la teoria cellulare dell'Ottocento, la scoperta dei virus alla fine dello stesso secolo, la struttura del DNA del 1953. La figura 2 riassume le tappe principali del dibattito, fino ai virus giganti e alla cellula sintetica minima.
:::

::: figura definizioni
{"w":660,"h":200,"items":[{"t":"line","p":[30,120,630,120],"c":"ax","w":2},{"t":"line","p":[70,113,70,127],"c":"ax","w":2},{"t":"text","p":[70,100],"s":"1839","c":"force","size":12},{"t":"text","p":[70,82],"s":"Schwann","c":"ax","size":11},{"t":"text","p":[70,66],"s":"teoria cellulare","c":"muted","size":10},{"t":"line","p":[122,113,122,127],"c":"ax","w":2},{"t":"text","p":[122,146],"s":"1898","c":"force","size":12},{"t":"text","p":[122,164],"s":"Beijerinck","c":"ax","size":11},{"t":"text","p":[122,180],"s":"virus","c":"muted","size":10},{"t":"line","p":[174,113,174,127],"c":"ax","w":2},{"t":"text","p":[174,100],"s":"1944","c":"force","size":12},{"t":"text","p":[174,82],"s":"Schrödinger","c":"ax","size":11},{"t":"text","p":[174,66],"s":"entropia","c":"muted","size":10},{"t":"line","p":[226,113,226,127],"c":"ax","w":2},{"t":"text","p":[226,146],"s":"1953","c":"force","size":12},{"t":"text","p":[226,164],"s":"Watson e Crick","c":"ax","size":11},{"t":"text","p":[226,180],"s":"DNA","c":"muted","size":10},{"t":"line","p":[278,113,278,127],"c":"ax","w":2},{"t":"text","p":[278,100],"s":"1971","c":"force","size":12},{"t":"text","p":[278,82],"s":"Gánti","c":"ax","size":11},{"t":"text","p":[278,66],"s":"chemotone","c":"muted","size":10},{"t":"line","p":[330,113,330,127],"c":"ax","w":2},{"t":"text","p":[330,146],"s":"1973","c":"force","size":12},{"t":"text","p":[330,164],"s":"Maturana e Varela","c":"ax","size":11},{"t":"text","p":[330,180],"s":"autopoiesi","c":"muted","size":10},{"t":"line","p":[382,113,382,127],"c":"ax","w":2},{"t":"text","p":[382,100],"s":"1976","c":"force","size":12},{"t":"text","p":[382,82],"s":"Viking","c":"ax","size":11},{"t":"text","p":[382,66],"s":"test su Marte","c":"muted","size":10},{"t":"line","p":[434,113,434,127],"c":"ax","w":2},{"t":"text","p":[434,146],"s":"1994","c":"force","size":12},{"t":"text","p":[434,164],"s":"Joyce","c":"ax","size":11},{"t":"text","p":[434,180],"s":"definizione NASA","c":"muted","size":10},{"t":"line","p":[486,113,486,127],"c":"ax","w":2},{"t":"text","p":[486,100],"s":"2002","c":"force","size":12},{"t":"text","p":[486,82],"s":"Cleland e Chyba","c":"ax","size":11},{"t":"text","p":[486,66],"s":"teoria della vita","c":"muted","size":10},{"t":"line","p":[538,113,538,127],"c":"ax","w":2},{"t":"text","p":[538,146],"s":"2003","c":"force","size":12},{"t":"text","p":[538,164],"s":"La Scola","c":"ax","size":11},{"t":"text","p":[538,180],"s":"mimivirus","c":"muted","size":10},{"t":"line","p":[590,113,590,127],"c":"ax","w":2},{"t":"text","p":[590,100],"s":"2016","c":"force","size":12},{"t":"text","p":[590,82],"s":"JCVI-syn3.0","c":"ax","size":11},{"t":"text","p":[590,66],"s":"cellula minima","c":"muted","size":10}]}
---
Alcune tappe nella ricerca di una definizione della vita. Le date sono distribuite in ordine, senza rispettare la scala dei tempi.
:::

## Casi limite {#limiti}

I casi limite sono preziosi perché mettono alla prova le definizioni. Quattro sono discussi più spesso.

I **virus** sono formati da un acido nucleico, DNA o RNA, racchiuso in un involucro di proteine e talvolta in una membrana. Fuori da una cellula sono privi di metabolismo; non producono energia e non costruiscono molecole. Dentro una cellula ospite ne usano i ribosomi e gli enzimi per fabbricare migliaia di copie di se stessi, con errori che permettono l'evoluzione. Per la definizione della NASA un virus non è autosufficiente, e quindi non è vivo; per altre definizioni, centrate sull'informazione e sull'evoluzione, lo è. La scoperta dei **virus giganti** ha reso il confine ancora più sfumato. Il mimivirus, descritto nel 2003 in un'ameba, ha particelle grandi quasi quanto un piccolo batterio e un genoma di $1\,181\,404$ coppie di basi, più del doppio di quello della cellula sintetica minima JCVI-syn3.0, con geni per alcuni componenti della traduzione delle proteine. Non ha però ribosomi, e senza una cellula ospite resta inerte.

I **viroidi** sono ancora più semplici: piccoli anelli di RNA di poche centinaia di nucleotidi, senza alcun involucro e senza geni per proteine, che infettano le piante e si fanno copiare dagli enzimi della cellula. I **prioni** sono proteine ripiegate in modo anomalo che inducono altre copie della stessa proteina ad assumere la forma sbagliata: propagano una forma, senza un acido nucleico.

Le **spore** e gli organismi in **criptobiosi** sono il caso opposto: certamente vivi, ma per lunghi periodi privi di qualunque attività misurabile. Le spore di molti batteri sopravvivono anni al disseccamento, al calore e persino al vuoto dello spazio; i tardigradi, piccoli animali lunghi di solito meno di un millimetro, si disidratano quasi completamente e riprendono vita quando tornano in acqua. In questi stati la vita è una possibilità conservata nella struttura, più che un processo in corso.

::: nota Vivo, morto, mai vissuto
Un organismo morto e un oggetto che non è mai stato vivo sono cose diverse. Un batterio appena ucciso dal calore ha ancora la membrana, il DNA e le proteine, ma ha perso l'organizzazione dinamica che li teneva in funzione. Per un astrobiologo la distinzione è importante: tracce di vita passata, come fossili o molecole prodotte solo dagli organismi, possono testimoniare la vita anche in un luogo dove oggi non vive più nulla.
:::

## Gli elementi della vita {#elementi}

Delle novanta e più specie di atomi presenti in natura, la vita ne usa con regolarità poco più di una ventina. Sei sono i costituenti principali delle molecole biologiche: carbonio, idrogeno, ossigeno, azoto, fosforo e zolfo, spesso ricordati con la sigla CHNOPS. Il carbonio forma lo scheletro delle molecole organiche; idrogeno e ossigeno si trovano ovunque, anche nell'acqua che riempie le cellule; l'azoto è negli amminoacidi e nelle basi degli acidi nucleici; il fosforo nei nucleotidi, nell'ATP e nei fosfolipidi delle membrane; lo zolfo in due amminoacidi e in molti cofattori. Altri elementi servono in quantità minori: sodio, potassio, calcio, magnesio e cloro come ioni disciolti; ferro, rame, zinco, manganese, molibdeno e pochi altri al centro di molti enzimi.

Morris e collaboratori sottolineano che, se si toglie l'acqua da una cellula umana, quattro elementi soli, carbonio, ossigeno, idrogeno e azoto, ne costituiscono il $94\%$ della massa, e il più abbondante è il carbonio. Con l'acqua inclusa, il corpo umano contiene in massa circa il $65\%$ di ossigeno, il $18{,}5\%$ di carbonio, il $9{,}5\%$ di idrogeno, il $3{,}2\%$ di azoto, l'$1{,}5\%$ di calcio e l'$1{,}0\%$ di fosforo.

Il confronto con la crosta terrestre è istruttivo (figura 3). Le rocce su cui viviamo sono fatte soprattutto di ossigeno ($46{,}1\%$ in massa) e silicio ($28{,}2\%$), seguiti da alluminio, ferro, calcio, sodio, magnesio e potassio. Il carbonio è appena lo $0{,}02\%$ della crosta, l'azoto lo $0{,}0019\%$. Nel corpo umano il carbonio è dunque concentrato circa

$$\frac{18{,}5\%}{0{,}02\%}\simeq925$$

volte rispetto alle rocce, e l'azoto quasi duemila volte. Il silicio, il secondo elemento della crosta, compare negli organismi solo in tracce, con eccezioni come i gusci di silice delle diatomee o gli aghi di alcune spugne, dove ha un ruolo minerale.

::: figura elementi
{"w":600,"h":295,"items":[{"t":"axes","o":[90,260],"x":[500,""],"y":[225,"log₁₀(% in massa)"],"sx":66,"sy":44,"xt":[],"yt":[[0,"−3"],[1,"−2"],[2,"−1"],[3,"0"],[4,"1"],[5,"2"]]},{"t":"rect","p":[108.5,54.8,19.8,205.2],"c":"muted","r":2},{"t":"rect","p":[130.9,48.2,19.8,211.8],"c":"force2","r":2},{"t":"text","p":[129.6,280],"s":"O","c":"ax","size":13},{"t":"rect","p":[174.5,64.2,19.8,195.8],"c":"muted","r":2},{"t":"text","p":[206.8,252],"s":"tracce","c":"force2","size":10},{"t":"text","p":[195.6,280],"s":"Si","c":"ax","size":13},{"t":"rect","p":[240.5,202.8,19.8,57.2],"c":"muted","r":2},{"t":"rect","p":[262.9,72.2,19.8,187.8],"c":"force2","r":2},{"t":"text","p":[261.6,280],"s":"C","c":"ax","size":13},{"t":"rect","p":[306.5,165.6,19.8,94.4],"c":"muted","r":2},{"t":"rect","p":[328.9,85.0,19.8,175.0],"c":"force2","r":2},{"t":"text","p":[327.6,280],"s":"H","c":"ax","size":13},{"t":"rect","p":[372.5,247.7,19.8,12.3],"c":"muted","r":2},{"t":"rect","p":[394.9,105.8,19.8,154.2],"c":"force2","r":2},{"t":"text","p":[393.6,280],"s":"N","c":"ax","size":13},{"t":"rect","p":[438.5,100.8,19.8,159.2],"c":"muted","r":2},{"t":"rect","p":[460.9,120.3,19.8,139.7],"c":"force2","r":2},{"t":"text","p":[459.6,280],"s":"Ca","c":"ax","size":13},{"t":"rect","p":[504.5,171.1,19.8,88.9],"c":"muted","r":2},{"t":"rect","p":[526.9,128.0,19.8,132.0],"c":"force2","r":2},{"t":"text","p":[525.6,280],"s":"P","c":"ax","size":13},{"t":"rect","p":[380,24,14,12],"c":"muted","r":2},{"t":"text","p":[400,34],"s":"crosta terrestre","c":"ax","size":11,"a":"start"},{"t":"rect","p":[380,44,14,12],"c":"force2","r":2},{"t":"text","p":[400,54],"s":"corpo umano","c":"ax","size":11,"a":"start"}]}
---
Abbondanza in massa di alcuni elementi nella crosta terrestre e nel corpo umano, in scala logaritmica. Il carbonio e l'azoto, rari nelle rocce, sono fra i costituenti principali dei viventi; il silicio, abbondantissimo nella crosta, nei viventi è presente solo in tracce.
:::

La vita, quindi, non è un campione qualunque della materia del pianeta. Le sue proporzioni assomigliano di più a quelle del cosmo. Nel Sole, e nell'universo in generale, dopo l'idrogeno e l'elio gli elementi più abbondanti sono l'ossigeno, il carbonio, il neon e l'azoto; per numero di atomi il carbonio è circa otto volte più comune del silicio. Il carbonio e l'azoto scarseggiano nelle rocce della Terra perché, nella nebulosa da cui si sono formati i pianeti interni, si trovavano soprattutto in molecole volatili come il monossido di carbonio, il metano, l'azoto molecolare e l'ammoniaca, che non si sono condensate nei solidi vicini al Sole. Da dove vengano questi elementi e come si siano formate nello spazio le prime molecole organiche è il tema del capitolo [Elementi e molecole della vita nello spazio](unit:biology-04).

## Perché il carbonio {#carbonio}

Il carbonio ha quattro elettroni di valenza e forma quattro legami covalenti, disposti nello spazio ai vertici di un tetraedro con angoli di circa $109{,}5^\circ$. Può legarsi a se stesso formando catene lunghe, ramificate o chiuse ad anello, e può formare legami doppi e tripli. Si lega con forza paragonabile all'idrogeno, all'ossigeno, all'azoto e allo zolfo. Da queste proprietà nasce una varietà di composti senza confronti nella chimica degli altri elementi. La grande maggioranza delle sostanze conosciute contiene carbonio, e con gli stessi atomi si possono costruire molecole diverse, gli isomeri, che differiscono per la disposizione degli atomi. Un tipo particolare di isomeria, quella delle molecole che sono una l'immagine speculare dell'altra, ha conseguenze profonde per la vita ed è trattato nel capitolo [Chiralità e omochiralità](unit:biology-06).

Le energie di legame aiutano a capire perché il carbonio si presta così bene (figura 4). Il legame carbonio-carbonio, circa $348\un{kJ/mol}$, è forte quasi quanto il legame carbonio-ossigeno, circa $358\un{kJ/mol}$, e quanto il legame carbonio-idrogeno, circa $413\un{kJ/mol}$. Una catena di atomi di carbonio, perciò, non ha una spinta enorme a trasformarsi in legami con l'ossigeno o con l'acqua; le reazioni che spezzano o formano legami del carbonio sono lente in assenza di catalizzatori e possono essere controllate dagli enzimi. In presenza di ossigeno le molecole organiche sono comunque instabili dal punto di vista termodinamico, e bruciando liberano energia: il fatto che si conservino dipende dalla lentezza delle reazioni, ed è proprio questa lentezza che la vita sfrutta.

::: figura legami
{"w":600,"h":285,"items":[{"t":"axes","o":[90,250],"x":[470,""],"y":[225,"energia (kJ/mol)"],"sx":1,"sy":0.42,"xt":[],"yt":[[0,"0"],[100,"100"],[200,"200"],[300,"300"],[400,"400"],[500,"500"]]},{"t":"rect","p":[132,103.8,44,146.2],"c":"force2","r":2},{"t":"text","p":[154,95.8],"s":"348","c":"force2","size":12},{"t":"rect","p":[184,155.1,44,94.9],"c":"force4","r":2},{"t":"text","p":[206,147.1],"s":"226","c":"force4","size":12},{"t":"text","p":[180,270.0],"s":"X–X","c":"ax","size":13},{"t":"rect","p":[282,76.5,44,173.5],"c":"force2","r":2},{"t":"text","p":[304,68.5],"s":"413","c":"force2","size":12},{"t":"rect","p":[334,114.3,44,135.7],"c":"force4","r":2},{"t":"text","p":[356,106.3],"s":"323","c":"force4","size":12},{"t":"text","p":[330,270.0],"s":"X–H","c":"ax","size":13},{"t":"rect","p":[432,99.6,44,150.4],"c":"force2","r":2},{"t":"text","p":[454,91.6],"s":"358","c":"force2","size":12},{"t":"rect","p":[484,95.4,44,154.6],"c":"force4","r":2},{"t":"text","p":[506,87.4],"s":"368","c":"force4","size":12},{"t":"text","p":[480,270.0],"s":"X–O","c":"ax","size":13},{"t":"rect","p":[420,24,14,12],"c":"force2","r":2},{"t":"text","p":[440,34],"s":"X = carbonio","c":"ax","size":11,"a":"start"},{"t":"rect","p":[420,44,14,12],"c":"force4","r":2},{"t":"text","p":[440,54],"s":"X = silicio","c":"ax","size":11,"a":"start"}]}
---
Energie medie di legame per il carbonio e per il silicio, in kJ/mol. Per il carbonio i legami con se stesso, con l'idrogeno e con l'ossigeno hanno forze simili; per il silicio il legame con l'ossigeno è molto più forte del legame con se stesso.
:::

C'è poi una differenza decisiva nei prodotti dell'ossidazione. Il carbonio completamente ossidato è il diossido di carbonio, un gas che si scioglie in acqua, entra nelle cellule e può essere ridotto di nuovo dalla fotosintesi: il carbonio circola fra l'atmosfera, gli oceani e i viventi. Il silicio completamente ossidato è la silice, $\mathrm{SiO_2}$, un solido in cui ogni atomo di silicio è legato a quattro atomi di ossigeno in un reticolo tridimensionale: la silice fonde a più di $1700\,^\circ\mathrm C$. Il silicio ossidato esce dal ciclo e resta chiuso nelle rocce.

### Il silicio, un'alternativa? {#silicio}

Il silicio sta sotto il carbonio nella tavola periodica, ha anch'esso quattro elettroni di valenza e forma quattro legami. Per questo è il candidato più citato per una biochimica alternativa. I dati però lo sfavoriscono. Il legame silicio-silicio, circa $226\un{kJ/mol}$, è molto più debole del legame silicio-ossigeno, che nelle tabelle varia da circa $370$ a circa $450\un{kJ/mol}$ secondo il composto. Le catene di silicio e idrogeno, i silani, reagiscono con l'acqua e con l'ossigeno: il più semplice, $\mathrm{SiH_4}$, si accende spontaneamente all'aria. Il silicio forma con difficoltà legami doppi: il primo composto stabile con un doppio legame silicio-silicio fu preparato solo nel 1981, e richiede gruppi ingombranti che proteggono il legame. Infine l'atomo di silicio, più grande, lega a sé fino a sei atomi, e i suoi composti tendono a formare reticoli solidi più che molecole discrete.

Le catene in cui silicio e ossigeno si alternano, i siliconi, sono stabili e versatili, ma sono materiali di sintesi industriale; in natura il silicio legato all'ossigeno forma minerali. Un'analisi sistematica pubblicata nel 2020 da Petkowski, Bains e Seager conclude che in nessun ambiente una vita basata soprattutto sulla chimica del silicio è un'ipotesi plausibile: in presenza di acqua il silicio finisce quasi sempre in silice, e solo in solventi molto freddi e privi di acqua potrebbe avere, al più, un ruolo accanto al carbonio. La vita terrestre, del resto, ha avuto a disposizione per quattro miliardi di anni una crosta ricchissima di silicio e non lo ha mai usato per costruire molecole; nessun organismo naturale noto forma legami fra carbonio e silicio, anche se nel 2016 un enzima modificato in laboratorio con l'evoluzione diretta ha imparato a formarli.

::: nota Carbonio e informazione
Una proprietà meno evidente del carbonio è la capacità di formare polimeri lunghi e stabili in cui l'ordine delle unità porta informazione, come negli acidi nucleici e nelle proteine. La definizione della NASA chiede un sistema capace di evoluzione darwiniana, e un'evoluzione illimitata richiede un modo di scrivere e copiare un numero enorme di varianti. Con il carbonio questo è possibile; nessun altro elemento noto offre la stessa combinazione di varietà e stabilità.
:::

## L'acqua, il solvente della vita {#acqua}

Una cellula batterica è fatta per circa il $70\%$ d'acqua. Tutti gli organismi conosciuti hanno bisogno di acqua liquida per essere attivi, e la ricerca della vita nel sistema solare è guidata, prima di tutto, dalla ricerca dell'acqua liquida. Che cosa la rende così adatta?

La molecola d'acqua è piegata, con un angolo di circa $104{,}5^\circ$ fra i due legami O–H, e l'ossigeno attira gli elettroni più dell'idrogeno. La molecola è quindi **polare**: ha una parziale carica negativa sull'ossigeno e parziali cariche positive sugli idrogeni. Fra molecole vicine si formano **legami a idrogeno**, attrazioni fra l'idrogeno di una molecola e l'ossigeno di un'altra, abbastanza forti da tenere unito il liquido e abbastanza deboli da rompersi e riformarsi continuamente.

Da qui derivano le proprietà che contano per la vita.

- L'acqua scioglie bene gli ioni e le molecole polari. La sua costante dielettrica, circa $78$ a $25\,^\circ\mathrm C$, riduce di quasi ottanta volte l'attrazione fra cariche opposte, e i sali si separano in ioni circondati da molecole d'acqua.
- Le sostanze apolari, al contrario, sono escluse dall'acqua e tendono a raccogliersi insieme. Questo **effetto idrofobico** fa ripiegare le proteine e fa assemblare spontaneamente le membrane, come si vede nel capitolo [Membrane e protocellule](unit:biology-03).
- L'acqua ha un calore specifico elevato, $4{,}18\un{J/(g\,K)}$: per scaldare di un kelvin un grammo d'acqua serve più energia che per quasi ogni altro liquido comune. Oceani, laghi e cellule cambiano temperatura lentamente.
- L'entalpia di vaporizzazione è grande: $40{,}7\un{kJ/mol}$ a $100\,^\circ\mathrm C$ e $44{,}0\un{kJ/mol}$ a $25\,^\circ\mathrm C$, cioè circa $2{,}44\un{kJ}$ per grammo a temperatura ambiente. L'evaporazione del sudore o della traspirazione delle foglie sottrae molto calore con poca acqua.
- Alla pressione atmosferica terrestre l'acqua è liquida in un intervallo di cento kelvin, da $0$ a $100\,^\circ\mathrm C$, un intervallo largo e situato proprio dove la Terra si trova grazie alla sua distanza dal Sole.
- L'acqua partecipa alle reazioni della vita. Molti polimeri biologici si formano per condensazione, cioè liberando una molecola d'acqua, e si spezzano per idrolisi, cioè consumandone una.

L'ultima proprietà ha anche un rovescio. In acqua le reazioni di idrolisi sono favorite, e un polimero come l'RNA tende a spezzarsi. Per la chimica delle origini questo è un problema serio, a volte chiamato paradosso dell'acqua: la vita ha bisogno dell'acqua, ma l'acqua ostacola la formazione dei polimeri da cui la vita dipende. Molte ipotesi sulle origini, discusse nei capitoli [Miller-Urey e la sintesi prebiotica](unit:biology-07) e [Il mondo a RNA](unit:biology-10), propongono ambienti in cui l'acqua va e viene, come pozze che si asciugano e si riempiono.

### Il ghiaccio galleggia {#ghiaccio}

Quasi tutte le sostanze sono più dense allo stato solido che allo stato liquido. L'acqua è un'eccezione. Nel ghiaccio ogni molecola forma quattro legami a idrogeno disposti a tetraedro, in un reticolo aperto e pieno di spazi vuoti; la densità del ghiaccio a $0\,^\circ\mathrm C$ è $0{,}9167\un{g/cm^3}$, circa l'$8\%$ in meno di quella dell'acqua liquida, e l'acqua che gela aumenta di volume di circa il $9\%$. Anche il liquido ha un comportamento insolito: raffreddato sotto i $4\,^\circ\mathrm C$ circa, si espande invece di contrarsi (figura 5).

::: figura densita
{"w":640,"h":300,"items":[{"t":"axes","o":[100,260],"x":[520,"temperatura (°C)"],"y":[230,"densità (g/cm³)"],"sx":18,"sy":100000,"xt":[[0,"0"],[4,"4"],[8,"8"],[12,"12"],[16,"16"],[20,"20"]],"yt":[[0.0,"0,9980"],[0.0005,"0,9985"],[0.001,"0,9990"],[0.0015,"0,9995"],[0.002,"1,0000"]]},{"t":"plot","o":[100,260],"sx":18,"sy":100000,"pts":[[0.0,0.0018395],[0.1,0.0018462],[0.2,0.0018528],[0.3,0.0018591],[0.4,0.0018653],[0.5,0.0018713],[0.6,0.0018771],[0.7,0.0018827],[0.8,0.0018882],[0.9,0.0018934],[1.0,0.0018985],[1.1,0.0019034],[1.2,0.0019082],[1.3,0.0019128],[1.4,0.0019172],[1.5,0.0019214],[1.6,0.0019254],[1.7,0.0019293],[1.8,0.001933],[1.9,0.0019365],[2.0,0.0019399],[2.1,0.0019431],[2.2,0.0019461],[2.3,0.0019489],[2.4,0.0019516],[2.5,0.0019541],[2.6,0.0019565],[2.7,0.0019587],[2.8,0.0019607],[2.9,0.0019625],[3.0,0.0019642],[3.1,0.0019657],[3.2,0.0019671],[3.3,0.0019682],[3.4,0.0019693],[3.5,0.0019701],[3.6,0.0019708],[3.7,0.0019714],[3.8,0.0019717],[3.9,0.0019719],[4.0,0.001972],[4.1,0.0019719],[4.2,0.0019716],[4.3,0.0019712],[4.4,0.0019706],[4.5,0.0019699],[4.6,0.001969],[4.7,0.0019679],[4.8,0.0019667],[4.9,0.0019653],[5.0,0.0019638],[5.1,0.0019621],[5.2,0.0019603],[5.3,0.0019583],[5.4,0.0019562],[5.5,0.0019539],[5.6,0.0019515],[5.7,0.0019489],[5.8,0.0019461],[5.9,0.0019432],[6.0,0.0019402],[6.1,0.001937],[6.2,0.0019336],[6.3,0.0019301],[6.4,0.0019265],[6.5,0.0019227],[6.6,0.0019187],[6.7,0.0019146],[6.8,0.0019104],[6.9,0.001906],[7.0,0.0019015],[7.1,0.0018968],[7.2,0.001892],[7.3,0.001887],[7.4,0.0018819],[7.5,0.0018767],[7.6,0.0018713],[7.7,0.0018657],[7.8,0.00186],[7.9,0.0018542],[8.0,0.0018482],[8.1,0.0018421],[8.2,0.0018359],[8.3,0.0018295],[8.4,0.0018229],[8.5,0.0018163],[8.6,0.0018095],[8.7,0.0018025],[8.8,0.0017954],[8.9,0.0017882],[9.0,0.0017808],[9.1,0.0017733],[9.2,0.0017657],[9.3,0.0017579],[9.4,0.00175],[9.5,0.0017419],[9.6,0.0017337],[9.7,0.0017254],[9.8,0.001717],[9.9,0.0017084],[10.0,0.0016996],[10.1,0.0016908],[10.2,0.0016818],[10.3,0.0016727],[10.4,0.0016634],[10.5,0.001654],[10.6,0.0016445],[10.7,0.0016348],[10.8,0.001625],[10.9,0.0016151],[11.0,0.0016051],[11.1,0.0015949],[11.2,0.0015846],[11.3,0.0015741],[11.4,0.0015636],[11.5,0.0015529],[11.6,0.001542],[11.7,0.0015311],[11.8,0.00152],[11.9,0.0015088],[12.0,0.0014974],[12.1,0.001486],[12.2,0.0014744],[12.3,0.0014627],[12.4,0.0014508],[12.5,0.0014388],[12.6,0.0014267],[12.7,0.0014145],[12.8,0.0014022],[12.9,0.0013897],[13.0,0.0013771],[13.1,0.0013644],[13.2,0.0013515],[13.3,0.0013386],[13.4,0.0013255],[13.5,0.0013123],[13.6,0.0012989],[13.7,0.0012855],[13.8,0.0012719],[13.9,0.0012582],[14.0,0.0012444],[14.1,0.0012305],[14.2,0.0012164],[14.3,0.0012022],[14.4,0.0011879],[14.5,0.0011735],[14.6,0.001159],[14.7,0.0011443],[14.8,0.0011295],[14.9,0.0011146],[15.0,0.0010996],[15.1,0.0010845],[15.2,0.0010692],[15.3,0.0010539],[15.4,0.0010384],[15.5,0.0010228],[15.6,0.0010071],[15.7,0.0009912],[15.8,0.0009753],[15.9,0.0009592],[16.0,0.000943],[16.1,0.0009267],[16.2,0.0009103],[16.3,0.0008938],[16.4,0.0008772],[16.5,0.0008604],[16.6,0.0008435],[16.7,0.0008266],[16.8,0.0008095],[16.9,0.0007923],[17.0,0.0007749],[17.1,0.0007575],[17.2,0.00074],[17.3,0.0007223],[17.4,0.0007045],[17.5,0.0006866],[17.6,0.0006687],[17.7,0.0006506],[17.8,0.0006323],[17.9,0.000614],[18.0,0.0005956],[18.1,0.000577],[18.2,0.0005584],[18.3,0.0005396],[18.4,0.0005208],[18.5,0.0005018],[18.6,0.0004827],[18.7,0.0004635],[18.8,0.0004442],[18.9,0.0004248],[19.0,0.0004052],[19.1,0.0003856],[19.2,0.0003659],[19.3,0.000346],[19.4,0.0003261],[19.5,0.000306],[19.6,0.0002859],[19.7,0.0002656],[19.8,0.0002452],[19.9,0.0002247],[20.0,0.0002041]],"c":"force2","w":2.6},{"t":"circle","p":[171.6,62.8,5],"c":"force"},{"t":"text","p":[181.6,54.8],"s":"massimo a 4 °C","c":"force","size":12,"a":"start"}]}
---
Densità dell'acqua liquida fra $0$ e $20\,^\circ\mathrm C$ alla pressione atmosferica. Il massimo, a circa $4\,^\circ\mathrm C$, vale $0{,}99997\un{g/cm^3}$. Il ghiaccio, con $0{,}9167\un{g/cm^3}$, sarebbe molto più in basso, fuori dalla scala del grafico.
:::

Le conseguenze per la vita sono grandi. In inverno l'acqua di un lago si raffredda in superficie e scende finché tutto il lago è a circa $4\,^\circ\mathrm C$; poi l'acqua più fredda resta in alto e gela, e lo strato di ghiaccio isola l'acqua sottostante, che resta liquida. Se il ghiaccio affondasse, i laghi e i mari delle zone fredde gelerebbero dal fondo e potrebbero diventare blocchi di ghiaccio. Lo stesso principio permette, sulle lune ghiacciate di Giove e Saturno, l'esistenza di oceani liquidi sotto una crosta di ghiaccio, come si vede in [Europa e gli oceani sotto il ghiaccio](unit:biology-28) e in [Encelado e i suoi pennacchi](unit:biology-29).

Per il principio di Archimede la frazione di un blocco di ghiaccio che resta immersa è uguale al rapporto fra la densità del ghiaccio e quella del liquido. In acqua di mare, con densità $1{,}025\un{g/cm^3}$,

$$\frac{0{,}9167}{1{,}025}\simeq0{,}894,$$

cioè circa il $89\%$ di un iceberg sta sotto la superficie.

## Altri solventi possibili {#solventi}

Shaw osserva che il solvente della vita deve essere probabilmente un liquido, perché in un liquido le molecole si incontrano, reagiscono e si spostano con una rapidità impossibile nei solidi e con concentrazioni impossibili nei gas, ma non deve essere per forza acqua. Quali altri liquidi potrebbe trovare la vita su altri mondi?

L'**ammoniaca**, $\mathrm{NH_3}$, è polare e forma legami a idrogeno, scioglie molti sali ed è abbondante nei pianeti esterni. Alla pressione di un'atmosfera è liquida fra $-77{,}7$ e $-33{,}3\,^\circ\mathrm C$, un intervallo di $44{,}4\un{K}$; a pressioni più alte l'intervallo si allarga. Il ghiaccio di ammoniaca però affonda nel liquido, e in ammoniaca l'effetto solvofobico che in acqua fa assemblare le membrane è molto più debole.

Il **metano** e l'**etano** sono apolari e non sciolgono ioni né molecole polari; in compenso sciolgono bene altre molecole apolari. Alla pressione di un'atmosfera il metano è liquido in un intervallo di soli $21\un{K}$, fra $90{,}7$ e $111{,}7\un{K}$, l'etano in un intervallo di $94{,}2\un{K}$, fra $90{,}4$ e $184{,}6\un{K}$. Sulla superficie di Titano, la grande luna di Saturno, la temperatura è di circa $94\un{K}$ e la pressione di circa $147\un{kPa}$: metano ed etano formano laghi e mari, piove metano e i fiumi scavano valli nel ghiaccio d'acqua, duro come la roccia a quella temperatura. Se una vita è possibile in un solvente come questo è la domanda del capitolo [Titano, la chimica senza acqua](unit:biology-30).

Altri candidati discussi sono il **metanolo** e altri alcoli, liquidi in intervalli molto larghi, l'**acido solforico** concentrato, che forma le nubi di Venere, l'**azoto liquido**, a temperature ancora più basse, e la **formammide**, che molti studiosi di chimica prebiotica considerano un solvente in cui si formano facilmente le basi degli acidi nucleici. La figura 6 confronta gli intervalli in cui alcuni di questi liquidi esistono alla pressione di un'atmosfera.

::: figura solventi
{"w":600,"h":305,"items":[{"t":"arrow","p":[110,250,560,250],"c":"ax","w":1.6,"head":9},{"t":"text","p":[335,294],"s":"temperatura (K)","c":"ax","size":14},{"t":"line","p":[110.0,250,110.0,255],"c":"ax","w":1.6},{"t":"text","p":[110.0,270],"s":"50","c":"muted","size":12},{"t":"line","p":[170.0,250,170.0,255],"c":"ax","w":1.6},{"t":"text","p":[170.0,270],"s":"100","c":"muted","size":12},{"t":"line","p":[230.0,250,230.0,255],"c":"ax","w":1.6},{"t":"text","p":[230.0,270],"s":"150","c":"muted","size":12},{"t":"line","p":[290.0,250,290.0,255],"c":"ax","w":1.6},{"t":"text","p":[290.0,270],"s":"200","c":"muted","size":12},{"t":"line","p":[350.0,250,350.0,255],"c":"ax","w":1.6},{"t":"text","p":[350.0,270],"s":"250","c":"muted","size":12},{"t":"line","p":[410.0,250,410.0,255],"c":"ax","w":1.6},{"t":"text","p":[410.0,270],"s":"300","c":"muted","size":12},{"t":"line","p":[470.0,250,470.0,255],"c":"ax","w":1.6},{"t":"text","p":[470.0,270],"s":"350","c":"muted","size":12},{"t":"line","p":[530.0,250,530.0,255],"c":"ax","w":1.6},{"t":"text","p":[530.0,270],"s":"400","c":"muted","size":12},{"t":"rect","p":[125.8,37,17.1,18],"c":"force3","r":3},{"t":"text","p":[102,50],"s":"azoto","c":"ax","size":12,"a":"end"},{"t":"text","p":[168.8,50],"s":"14,2 K","c":"muted","size":11,"a":"start"},{"t":"rect","p":[158.8,71,25.2,18],"c":"force3","r":3},{"t":"text","p":[102,84],"s":"metano","c":"ax","size":12,"a":"end"},{"t":"text","p":[190.0,84],"s":"21,0 K","c":"muted","size":11,"a":"start"},{"t":"rect","p":[158.4,105,113.0,18],"c":"force3","r":3},{"t":"text","p":[102,118],"s":"etano","c":"ax","size":12,"a":"end"},{"t":"text","p":[277.5,118],"s":"94,2 K","c":"muted","size":11,"a":"start"},{"t":"rect","p":[284.5,139,53.3,18],"c":"force3","r":3},{"t":"text","p":[102,152],"s":"ammoniaca","c":"ax","size":12,"a":"end"},{"t":"text","p":[343.8,152],"s":"44,4 K","c":"muted","size":11,"a":"start"},{"t":"rect","p":[260.7,173,194.8,18],"c":"force3","r":3},{"t":"text","p":[102,186],"s":"metanolo","c":"ax","size":12,"a":"end"},{"t":"text","p":[461.4,186],"s":"162,3 K","c":"muted","size":11,"a":"start"},{"t":"rect","p":[377.8,207,120.0,18],"c":"force2","r":3},{"t":"text","p":[102,220],"s":"acqua","c":"ax","size":12,"a":"end"},{"t":"text","p":[503.8,220],"s":"100,0 K","c":"muted","size":11,"a":"start"},{"t":"line","p":[162.8,30,162.8,250],"c":"accent","w":1.2,"dash":true},{"t":"text","p":[162.8,24],"s":"Titano","c":"accent","size":11},{"t":"line","p":[395.6,30,395.6,250],"c":"accent","w":1.2,"dash":true},{"t":"text","p":[395.6,24],"s":"Terra","c":"accent","size":11}]}
---
Intervallo di temperatura in cui alcuni solventi sono liquidi alla pressione di $101{,}3\un{kPa}$. Le linee tratteggiate indicano la temperatura media della superficie di Titano e quella della Terra.
:::

Un criterio importante per valutare un solvente è la temperatura stessa. A $94\un{K}$ le reazioni chimiche sono molto più lente che a $300\un{K}$, perché pochissime molecole hanno l'energia per superare le barriere di attivazione. Per una reazione con energia di attivazione di $50\un{kJ/mol}$, la legge di Arrhenius dà un rallentamento di un fattore di circa $10^{19}$ passando da $300$ a $94\un{K}$. Una biochimica nel freddo dovrebbe usare reazioni con barriere molto più basse, o accontentarsi di tempi lunghissimi.

## Quando l'acqua è liquida: il diagramma di fase {#fasi}

Che l'acqua sia liquida dipende dalla temperatura e dalla pressione insieme. Il **diagramma di fase** riassume questa dipendenza (figura 7): ogni punto del piano rappresenta una coppia di valori di temperatura e pressione, e le linee separano le regioni in cui è stabile il ghiaccio, il liquido o il vapore. Il diagramma dell'acqua ha tre punti di riferimento.

- Il **punto triplo**, a $273{,}16\un{K}$ ($0{,}01\,^\circ\mathrm C$) e $611{,}657\un{Pa}$, è l'unica condizione in cui ghiaccio, liquido e vapore coesistono in equilibrio. Sotto questa pressione l'acqua liquida è instabile a qualunque temperatura, e il ghiaccio scaldato passa direttamente a vapore, cioè sublima.
- Il **punto critico**, a $647{,}096\un{K}$ ($373{,}946\,^\circ\mathrm C$) e $22{,}064\un{MPa}$, è il termine della linea che separa liquido e vapore. Oltre questo punto le due fasi non si distinguono più e si parla di fluido supercritico.
- La **linea di ebollizione**, che va dal punto triplo al punto critico, dà per ogni temperatura la pressione di vapore del liquido, cioè la pressione del vapore in equilibrio con l'acqua liquida. L'acqua bolle quando la sua pressione di vapore eguaglia la pressione esterna.

::: figura fasi
{"w":680,"h":330,"items":[{"t":"axes","o":[90,290],"x":[560,"temperatura (K)"],"y":[265,"log₁₀(p / Pa)"],"sx":0.72,"sy":28,"xt":[[50,"200"],[150,"300"],[250,"400"],[350,"500"],[450,"600"],[550,"700"]],"yt":[[0,"−1"],[1,"0"],[3,"2"],[5,"4"],[7,"6"],[9,"8"]]},{"t":"plot","o":[90,290],"sx":0.72,"sy":28,"pts":[[47.0,0.0081707],[48.26933,0.0947875],[49.53867,0.1803135],[50.808,0.264769],[52.07733,0.3481739],[53.34667,0.4305473],[54.616,0.5119081],[55.88533,0.5922748],[57.15467,0.6716651],[58.424,0.7500967],[59.69333,0.8275865],[60.96267,0.9041512],[62.232,0.9798072],[63.50133,1.0545702],[64.77067,1.1284558],[66.04,1.2014791],[67.30933,1.273655],[68.57867,1.3449979],[69.848,1.4155219],[71.11733,1.4852409],[72.38667,1.5541683],[73.656,1.6223174],[74.92533,1.689701],[76.19467,1.7563318],[77.464,1.8222221],[78.73333,1.887384],[80.00267,1.9518292],[81.272,2.0155694],[82.54133,2.0786157],[83.81067,2.1409794],[85.08,2.2026711],[86.34933,2.2637015],[87.61867,2.3240809],[88.888,2.3838196],[90.15733,2.4429273],[91.42667,2.501414],[92.696,2.559289],[93.96533,2.6165617],[95.23467,2.6732413],[96.504,2.7293368],[97.77333,2.7848568],[99.04267,2.83981],[100.312,2.8942048],[101.58133,2.9480495],[102.85067,3.0013522],[104.12,3.0541208],[105.38933,3.1063631],[106.65867,3.1580867],[107.928,3.209299],[109.19733,3.2600075],[110.46667,3.3102193],[111.736,3.3599415],[113.00533,3.409181],[114.27467,3.4579446],[115.544,3.5062389],[116.81333,3.5540704],[118.08267,3.6014457],[119.352,3.648371],[120.62133,3.6948524],[121.89067,3.7408961],[123.16,3.786508]],"c":"force3","w":2.4},{"t":"plot","o":[90,290],"sx":0.72,"sy":28,"pts":[[123.16,3.786508],[126.27613,3.8835984],[129.39227,3.9782488],[132.5084,4.0705447],[135.62453,4.1605682],[138.74067,4.2483971],[141.8568,4.3341062],[144.97293,4.4177667],[148.08907,4.4994467],[151.2052,4.5792115],[154.32133,4.6571235],[157.43747,4.7332425],[160.5536,4.8076257],[163.66973,4.8803282],[166.78587,4.9514027],[169.902,5.0208999],[173.01813,5.0888684],[176.13427,5.155355],[179.2504,5.2204048],[182.36653,5.2840611],[185.48267,5.3463656],[188.5988,5.4073585],[191.71493,5.4670785],[194.83107,5.5255629],[197.9472,5.5828477],[201.06333,5.6389678],[204.17947,5.6939565],[207.2956,5.7478463],[210.41173,5.8006685],[213.52787,5.8524532],[216.644,5.9032295],[219.76013,5.9530257],[222.87627,6.001869],[225.9924,6.0497858],[229.10853,6.0968014],[232.22467,6.1429406],[235.3408,6.1882272],[238.45693,6.2326841],[241.57307,6.2763338],[244.6892,6.3191978],[247.80533,6.3612971],[250.92147,6.4026517],[254.0376,6.4432814],[257.15373,6.483205],[260.26987,6.522441],[263.386,6.5610072],[266.50213,6.5989208],[269.61827,6.6361984],[272.7344,6.6728563],[275.85053,6.7089103],[278.96667,6.7443753],[282.0828,6.7792663],[285.19893,6.8135976],[288.31507,6.8473829],[291.4312,6.8806358],[294.54733,6.9133692],[297.66347,6.9455959],[300.7796,6.9773282],[303.89573,7.0085779],[307.01187,7.0393566],[310.128,7.0696756],[313.24413,7.0995458],[316.36027,7.1289778],[319.4764,7.1579819],[322.59253,7.1865681],[325.70867,7.2147461],[328.8248,7.2425255],[331.94093,7.2699153],[335.05707,7.2969246],[338.1732,7.323562],[341.28933,7.3498361],[344.40547,7.375755],[347.5216,7.4013268],[350.63773,7.4265593],[353.75387,7.4514601],[356.87,7.4760368],[359.98613,7.5002964],[363.10227,7.524246],[366.2184,7.5478927],[369.33453,7.571243],[372.45067,7.5943035],[375.5668,7.6170808],[378.68293,7.639581],[381.79907,7.6618102],[384.9152,7.6837746],[388.03133,7.7054799],[391.14747,7.726932],[394.2636,7.7481365],[397.37973,7.769099],[400.49587,7.7898249],[403.612,7.8103196],[406.72813,7.8305884],[409.84427,7.8506364],[412.9604,7.8704689],[416.07653,7.890091],[419.19267,7.9095075],[422.3088,7.9287236],[425.42493,7.9477442],[428.54107,7.9665742],[431.6572,7.9852186],[434.77333,8.0036822],[437.88947,8.0219699],[441.0056,8.0400868],[444.12173,8.0580379],[447.23787,8.0758281],[450.354,8.0934626],[453.47013,8.1109467],[456.58627,8.1282857],[459.7024,8.1454851],[462.81853,8.1625506],[465.93467,8.1794882],[469.0508,8.1963041],[472.16693,8.2130049],[475.28307,8.2295978],[478.3992,8.2460902],[481.51533,8.2624908],[484.63147,8.2788091],[487.7476,8.2950572],[490.86373,8.3112515],[493.97987,8.3274228],[497.096,8.3436842]],"c":"force2","w":2.4},{"t":"plot","o":[90,290],"sx":0.72,"sy":28,"pts":[[123.16,3.786508],[123.01,7.3035928],[122.86,7.6027277],[122.71,7.7769934],[122.56,7.9001424],[122.41,7.9952913],[122.26,8.0727372],[122.11,8.1379728],[121.96,8.1942766],[121.81,8.2437632],[121.66,8.2878761],[121.51,8.327645],[121.36,8.3638299],[121.21,8.397008],[121.06,8.4276276],[120.91,8.4560443],[120.76,8.4825445],[120.61,8.5073624],[120.46,8.530692],[120.31,8.5526958],[120.16,8.5735111],[120.01,8.5932552],[119.86,8.6120287],[119.71,8.6299189],[119.56,8.6470022],[119.41,8.663345],[119.26,8.6790065],[119.11,8.6940386],[118.96,8.7084879],[118.81,8.7223959],[118.66,8.7357999],[118.51,8.7487335],[118.36,8.7612271],[118.21,8.7733083],[118.06,8.7850021],[117.91,8.7963314],[117.76,8.8073172],[117.61,8.8179786],[117.46,8.8283334],[117.31,8.8383977],[117.16,8.8481866],[117.01,8.857714],[116.86,8.8669929],[116.71,8.8760351],[116.56,8.8848518],[116.41,8.8934533],[116.26,8.9018495],[116.11,8.9100492],[115.96,8.9180611],[115.81,8.925893],[115.66,8.9335525],[115.51,8.9410465],[115.36,8.9483816],[115.21,8.9555641],[115.06,8.9625998],[114.91,8.9694943],[114.76,8.9762528],[114.61,8.9828803],[114.46,8.9893814],[114.31,8.9957606]],"c":"force4","w":2.4},{"t":"circle","p":[178.7,184.0,5],"c":"force"},{"t":"text","p":[170.7,176.0],"s":"punto triplo","c":"force","size":11,"a":"end"},{"t":"circle","p":[447.9,56.4,5],"c":"force"},{"t":"text","p":[441.9,78.4],"s":"punto critico","c":"force","size":11,"a":"end"},{"t":"circle","p":[189.4,121.8,5],"c":"accent"},{"t":"text","p":[197.4,125.8],"s":"Terra","c":"accent","size":11,"a":"start"},{"t":"circle","p":[512.6,67.0,5],"c":"accent"},{"t":"text","p":[520.6,71.0],"s":"Venere","c":"accent","size":11,"a":"start"},{"t":"circle","p":[430.6,54.9,5],"c":"accent"},{"t":"text","p":[422.6,44.9],"s":"sorgente idrotermale","c":"accent","size":11,"a":"end"},{"t":"line","p":[90.0,184.2,241.2,184.2],"c":"accent","w":1.4,"dash":true},{"t":"text","p":[247.2,188.2],"s":"Marte","c":"accent","size":11,"a":"start"},{"t":"text","p":[126.0,108.0],"s":"ghiaccio","c":"ax","size":13},{"t":"text","p":[255.6,77.2],"s":"liquido","c":"ax","size":13},{"t":"text","p":[356.4,206],"s":"vapore","c":"ax","size":13}]}
---
Diagramma di fase dell'acqua, con la pressione in scala logaritmica. Sono indicate le condizioni medie della superficie della Terra, di Venere e di una sorgente idrotermale profonda; la linea tratteggiata corrisponde alla pressione media della superficie di Marte, poco sotto quella del punto triplo.
:::

La linea fra ghiaccio e liquido è quasi verticale e leggermente inclinata verso sinistra: aumentando la pressione il ghiaccio fonde a temperature un poco più basse, conseguenza del fatto che il ghiaccio è meno denso del liquido. Per abbassare di un kelvin la temperatura di fusione servono però circa $13{,}5\un{MPa}$, più di cento atmosfere. Per la vita conta molto di più la linea di ebollizione, che si sposta di decine di gradi con variazioni modeste della pressione.

Il diagramma spiega subito alcune differenze fra i pianeti. Sulla Terra, a circa $101\un{kPa}$ e con una temperatura media di circa $15\,^\circ\mathrm C$, l'acqua è liquida e i mari coprono più dei due terzi della superficie. Su Venere la temperatura della superficie, circa $737\un{K}$, è più alta di quella del punto critico, e l'acqua può esistere solo come vapore. Su Marte la pressione media è di circa $0{,}6\un{kPa}$, poco sotto quella del punto triplo: il ghiaccio, quando si scalda, tende a sublimare. In fondo agli oceani terrestri, infine, la pressione di decine di megapascal mantiene liquida l'acqua delle sorgenti idrotermali anche a $350\,^\circ\mathrm C$.

## La relazione di Clausius-Clapeyron {#clausius}

Per calcolare la temperatura di ebollizione a una pressione qualsiasi serve una relazione fra pressione di vapore e temperatura. La termodinamica la fornisce in modo esatto con l'equazione di Clapeyron, che lega la pendenza della linea di ebollizione al calore assorbito e alla variazione di volume nel passaggio di stato:

$$\frac{\mathrm dp}{\mathrm dT}=\frac{\Delta H_\mathrm{vap}}{T\,\Delta V}.$$

Due approssimazioni rendono la relazione facile da usare. Il volume del liquido è trascurabile rispetto a quello del vapore, quindi $\Delta V$ è circa il volume di una mole di vapore; il vapore si comporta come un gas ideale, quindi questo volume vale $RT/p$. Sostituendo si ottiene

$$\frac{1}{p}\frac{\mathrm dp}{\mathrm dT}=\frac{\Delta H_\mathrm{vap}}{RT^2}.$$

Se infine si considera costante l'entalpia di vaporizzazione, l'equazione si integra fra un punto di riferimento $(T_0,p_0)$ e un punto qualsiasi $(T,p)$ della linea:

::: legge Relazione di Clausius-Clapeyron
$$\ln\frac{p}{p_0}=-\frac{\Delta H_\mathrm{vap}}{R}\left(\frac1T-\frac1{T_0}\right)$$
Vale fra il punto triplo e il punto critico, per un vapore che si comporta come un gas ideale e un'entalpia di vaporizzazione che varia poco nell'intervallo considerato.
:::

Ricavando $T$ si ottiene la temperatura di ebollizione alla pressione $p$:

$$\frac1{T_\mathrm{eb}}=\frac1{T_0}-\frac{R}{\Delta H_\mathrm{vap}}\ln\frac{p}{p_0}.$$

Come riferimento si usa di solito il punto di ebollizione normale, $T_0=373{,}15\un{K}$ a $p_0=101{,}325\un{kPa}$, con $\Delta H_\mathrm{vap}=40{,}7\un{kJ/mol}$. È il modello interattivo di questa unità: il grafico mostra la temperatura di ebollizione in funzione della pressione, e un cursore permette di cambiare l'entalpia di vaporizzazione.

::: esempio L'acqua bolle in cima all'Everest
Sulla cima dell'Everest la pressione atmosferica è di circa $33{,}7\un{kPa}$. A che temperatura bolle l'acqua?

Il logaritmo del rapporto delle pressioni vale $\ln(33{,}7/101{,}325)\simeq-1{,}101$, e $R/\Delta H_\mathrm{vap}=8{,}314/40\,700$, cioè circa $2{,}043\times10^{-4}\un{K^{-1}}$. Quindi

$$\begin{aligned}\frac1{T_\mathrm{eb}}&=\frac1{373{,}15\un{K}}+2{,}249\times10^{-4}\un{K^{-1}}\\&\simeq2{,}905\times10^{-3}\un{K^{-1}},\end{aligned}$$

da cui $T_\mathrm{eb}\simeq344{,}3\un{K}$, cioè circa $71{,}1\,^\circ\mathrm C$. Le tavole del vapore danno $71{,}8\,^\circ\mathrm C$: il modello sbaglia di meno di un grado. Una pasta cotta a $71\,^\circ\mathrm C$ resta cruda per molto tempo, e gli alpinisti lo sanno bene.
:::

::: quotidiano La pentola a pressione
Una pentola a pressione chiude il vapore con una guarnizione e una valvola tarata, che lascia uscire il vapore quando la pressione interna raggiunge circa due volte quella atmosferica. Con $p=200\un{kPa}$ la relazione di Clausius-Clapeyron dà una temperatura di ebollizione di circa $120{,}4\,^\circ\mathrm C$, contro i $120{,}2\,^\circ\mathrm C$ delle tavole. Venti gradi in più bastano a dimezzare, o più, i tempi di cottura. Le autoclavi dei laboratori di microbiologia funzionano allo stesso modo: a $121\,^\circ\mathrm C$ per quindici o venti minuti uccidono le spore batteriche usate come riferimento per la sterilizzazione. Trattamenti con calore secco, prolungati per molte ore, servono a ridurre i microrganismi sulle sonde destinate a cercare la vita su altri pianeti, come si vede nel capitolo [Panspermia e protezione planetaria](unit:biology-34).
:::

La figura 8 confronta il modello con i valori misurati, su un intervallo di pressioni che va da meno di un kilopascal a più di venti megapascal.

::: figura ebollizione
{"w":670,"h":320,"items":[{"t":"axes","o":[90,280],"x":[560,"pressione (kPa)"],"y":[262,"temperatura (°C)"],"sx":88,"sy":0.6,"xt":[[0.5,"1"],[1.5,"10"],[2.5,"100"],[3.5,"1000"],[4.5,"10⁴"]],"yt":[[40,"0"],[140,"100"],[240,"200"],[340,"300"],[420,"380"]]},{"t":"plot","o":[90,280],"sx":88,"sy":0.6,"pts":[[0.28651,35.3947094],[0.33208,36.9495712],[0.37765,38.522543],[0.42322,40.1139431],[0.4688,41.7240972],[0.51437,43.3533388],[0.55994,45.0020093],[0.60551,46.6704584],[0.65108,48.3590441],[0.69665,50.0681332],[0.74223,51.7981014],[0.7878,53.5493337],[0.83337,55.3222244],[0.87894,57.117178],[0.92451,58.9346089],[0.97008,60.7749419],[1.01566,62.6386126],[1.06123,64.5260679],[1.1068,66.4377659],[1.15237,68.3741767],[1.19794,70.3357828],[1.24351,72.3230789],[1.28909,74.3365731],[1.33466,76.376787],[1.38023,78.4442559],[1.4258,80.5395295],[1.47137,82.6631728],[1.51695,84.8157657],[1.56252,86.9979042],[1.60809,89.2102009],[1.65366,91.4532854],[1.69923,93.7278047],[1.7448,96.0344245],[1.79038,98.373829],[1.83595,100.7467222],[1.88152,103.1538285],[1.92709,105.5958931],[1.97266,108.0736831],[2.01823,110.5879883],[2.06381,113.1396218],[2.10938,115.7294212],[2.15495,118.3582492],[2.20052,121.0269947],[2.24609,123.7365739],[2.29167,126.4879312],[2.33724,129.2820404],[2.38281,132.1199057],[2.42838,135.002563],[2.47395,137.9310812],[2.51952,140.9065636],[2.5651,143.9301491],[2.61067,147.0030135],[2.65624,150.1263716],[2.70181,153.3014782],[2.74738,156.5296302],[2.79295,159.812168],[2.83853,163.1504778],[2.8841,166.545993],[2.92967,170.0001969],[2.97524,173.5146242],[3.02081,177.0908638],[3.06639,180.7305609],[3.11196,184.4354196],[3.15753,188.2072056],[3.2031,192.047749],[3.24867,195.9589472],[3.29424,199.942768],[3.33982,204.0012531],[3.38539,208.1365213],[3.43096,212.3507725],[3.47653,216.6462913],[3.5221,221.0254514],[3.56767,225.4907197],[3.61325,230.0446612],[3.65882,234.6899438],[3.70439,239.4293434],[3.74996,244.2657496],[3.79553,249.2021716],[3.84111,254.2417441],[3.88668,259.3877345],[3.93225,264.6435495],[3.97782,270.0127428],[4.02339,275.499023],[4.06896,281.1062624],[4.11454,286.8385058],[4.16011,292.6999806],[4.20568,298.6951067],[4.25125,304.8285081],[4.29682,311.1050245],[4.34239,317.5297241],[4.38797,324.1079174],[4.43354,330.8451715],[4.47911,337.7473262],[4.52468,344.8205107],[4.57025,352.0711616],[4.61583,359.5060428],[4.6614,367.1322662],[4.70697,374.9573147],[4.75254,382.9890663],[4.79811,391.2358209],[4.84368,399.7063288]],"c":"force2","w":2.4},{"t":"circle","p":[115.2,256.0,4],"c":"force"},{"t":"circle","p":[141.0,250.2,4],"c":"force"},{"t":"circle","p":[178.1,241.0,4],"c":"force"},{"t":"circle","p":[222.0,228.5,4],"c":"force"},{"t":"circle","p":[268.4,212.9,4],"c":"force"},{"t":"circle","p":[310.5,196.0,4],"c":"force"},{"t":"circle","p":[336.5,183.9,4],"c":"force"},{"t":"circle","p":[398.0,148.1,4],"c":"force"},{"t":"circle","p":[451.0,105.8,4],"c":"force"},{"t":"circle","p":[505.2,46.0,4],"c":"force"},{"t":"circle","p":[516.2,31.6,4],"c":"force"},{"t":"text","p":[123.2,272.0],"s":"punto triplo","c":"force","size":11,"a":"start"},{"t":"text","p":[508.2,23.6],"s":"punto critico","c":"force","size":11,"a":"end"},{"t":"text","p":[260.4,204.9],"s":"Everest","c":"muted","size":11,"a":"end"},{"t":"text","p":[130,48],"s":"curva: Clausius-Clapeyron, 40,7 kJ/mol","c":"force2","size":11,"a":"start"},{"t":"text","p":[130,66],"s":"punti: tavole del vapore","c":"force","size":11,"a":"start"}]}
---
Temperatura di ebollizione dell'acqua in funzione della pressione, in scala logaritmica. La curva continua è il modello di Clausius-Clapeyron con $\Delta H_\mathrm{vap}=40{,}7\un{kJ/mol}$; i punti sono i valori delle tavole del vapore. L'accordo è ottimo vicino a $100\,^\circ\mathrm C$ e peggiora alle due estremità.
:::

### I limiti del modello {#limiti-modello}

L'accordo è eccellente fra qualche decina di kilopascal e qualche megapascal, cioè fra circa $70$ e $200\,^\circ\mathrm C$, e si deteriora agli estremi. Alla pressione del punto triplo il modello prevede che l'acqua bolla a $-4{,}6\,^\circ\mathrm C$, cinque gradi sotto il valore vero; a $16{,}5\un{MPa}$ prevede $337\,^\circ\mathrm C$ invece di $350\,^\circ\mathrm C$. La causa principale è l'ipotesi di entalpia costante. Il calore necessario per vaporizzare una mole d'acqua diminuisce al crescere della temperatura: vale $45{,}1\un{kJ/mol}$ al punto triplo, $44{,}0\un{kJ/mol}$ a $25\,^\circ\mathrm C$, $40{,}7\un{kJ/mol}$ a $100\,^\circ\mathrm C$, circa $25{,}3\un{kJ/mol}$ a $300\,^\circ\mathrm C$, e si annulla al punto critico, dove liquido e vapore diventano indistinguibili. Ad alta pressione, inoltre, il vapore è lontano dal comportamento ideale e il volume del liquido non è più trascurabile.

Un rimedio semplice consiste nello scegliere il punto di riferimento vicino alla regione che interessa e nell'usare l'entalpia di vaporizzazione di quella regione. Per studiare l'acqua liquida su Marte, a pressioni di poco superiori a quella del punto triplo, conviene usare come riferimento il punto triplo stesso e un'entalpia di circa $45\un{kJ/mol}$: gli errori scendono a pochi centesimi di grado.

::: approfondimento Perché la pressione di vapore cresce così in fretta
La relazione di Clausius-Clapeyron si può leggere come una conseguenza della distribuzione di Boltzmann. Per passare nel vapore una molecola deve rompere i legami a idrogeno che la trattengono nel liquido, e l'energia necessaria per mole è circa $\Delta H_\mathrm{vap}$. La frazione di molecole con energia sufficiente è proporzionale a $\mathrm e^{-\Delta H_\mathrm{vap}/RT}$, e lo stesso fattore compare nella pressione di vapore. Con $\Delta H_\mathrm{vap}=44\un{kJ/mol}$, nell'intorno della temperatura ambiente la pressione di vapore dell'acqua raddoppia circa ogni dodici kelvin; per questo l'aria calda può contenere molto più vapore dell'aria fredda, e l'effetto serra del vapore acqueo cresce rapidamente con la temperatura, come si vede nel capitolo [Atmosfere, effetto serra e clima](unit:biology-23).
:::

## Acqua liquida in profondità {#profondita}

La pressione cresce con la profondità, e con essa la temperatura a cui l'acqua bolle. In un liquido di densità $\rho$ la pressione a profondità $h$ è $p=p_\mathrm{atm}+\rho gh$; nell'oceano, con $\rho\simeq1025\un{kg/m^3}$, cresce di circa $1\un{MPa}$ ogni cento metri. Le sorgenti idrotermali delle dorsali oceaniche si trovano di solito fra due e quattro chilometri di profondità, a pressioni di $20$–$40\un{MPa}$, ed emettono fluidi a $350$–$400\,^\circ\mathrm C$ che restano liquidi o diventano supercritici senza mai bollire. Per mantenere liquida l'acqua a $350\,^\circ\mathrm C$ la pressione deve superare $16{,}53\un{MPa}$, quella che si trova a circa $1{,}6\un{km}$ di profondità.

Le profondità sono anche un rifugio per la vita. L'archeo *Methanopyrus kandleri* ceppo 116, isolato da una sorgente idrotermale nell'oceano Indiano, è stato coltivato nel 2008 a $122\,^\circ\mathrm C$ sotto una pressione di $20\un{MPa}$, la temperatura più alta finora osservata per la crescita di un organismo. A pressione atmosferica, a quella temperatura, l'acqua sarebbe vapore. Gli organismi che vivono in queste condizioni sono il tema del capitolo [Estremofili](unit:biology-18), e il ruolo delle sorgenti idrotermali nelle origini della vita è discusso in [Sorgenti idrotermali e metabolismo primordiale](unit:biology-09).

Lo stesso ragionamento vale per gli oceani sotto il ghiaccio delle lune dei pianeti giganti. Sotto una crosta di ghiaccio spessa decine di chilometri la pressione è di molti megapascal; la temperatura di fusione del ghiaccio si abbassa leggermente, e la presenza di sali o di ammoniaca disciolta la abbassa ancora di più, mentre la temperatura di ebollizione sale di molto. Per l'acqua di questi oceani il pericolo è il gelo, e il problema è mantenerla abbastanza calda; su Europa e su Encelado lo fa il calore prodotto dalle maree.

## Acqua liquida su altri mondi {#mondi}

Il caso di Marte mostra quanto contino i dettagli. La pressione media della superficie, circa $0{,}6\un{kPa}$, è vicinissima a quella del punto triplo, e varia con la quota e con le stagioni. Nelle regioni più basse, come il fondo del bacino di Hellas, la pressione arriva a circa $1{,}2\un{kPa}$, e l'acqua pura potrebbe essere liquida fra $0$ e circa $10\,^\circ\mathrm C$, una finestra stretta che si apre solo nelle ore più calde delle giornate estive. Anche in quella finestra l'acqua evaporerebbe rapidamente nell'atmosfera secca. I sali allargano la finestra: la sonda Phoenix ha trovato nel 2008 perclorati nel suolo artico marziano, e le loro soluzioni concentrate gelano a temperature di decine di gradi sotto lo zero. Le prove che Marte ebbe in passato fiumi e laghi sono discusse in [Marte: acqua e abitabilità passata](unit:biology-26).

Nel sistema solare di oggi l'acqua liquida stabile si trova soprattutto sotto il ghiaccio. Europa, la luna di Giove, ha con ogni probabilità un oceano salato profondo un centinaio di chilometri; Encelado, una piccola luna di Saturno, ne emette campioni in pennacchi di vapore e ghiaccio che la sonda Cassini ha attraversato; Titano e Ganimede hanno probabilmente oceani interni sotto spessi strati di ghiaccio. Shaw, nel 2006, poteva ancora indicare Europa come forse l'unico altro luogo del sistema solare con acqua liquida: le scoperte dei due decenni successivi hanno moltiplicato i candidati.

Per i pianeti di altre stelle la domanda diventa quale distanza dalla stella permetta di avere acqua liquida in superficie, ed è affrontata nel capitolo [La zona abitabile](unit:biology-22). La risposta dipende dalla luminosità della stella, ma anche dalla pressione e dalla composizione dell'atmosfera, che, come si è visto, fissano la temperatura di ebollizione.

## Che cosa rende abitabile un ambiente {#abitabilita}

Dalle proprietà della vita terrestre si ricava un elenco di requisiti per un ambiente **abitabile**, cioè adatto a ospitare organismi simili a quelli che conosciamo. Ne fanno parte quattro condizioni.

1. **Un solvente liquido**, l'acqua per la vita che conosciamo, presente con continuità per tempi lunghi.
2. **Una sorgente di energia** utilizzabile: la luce di una stella, oppure un disequilibrio chimico, per esempio fra sostanze ossidanti e riducenti, come l'idrogeno che esce dalle rocce e il diossido di carbonio disciolto in un oceano.
3. **Gli elementi della vita**, carbonio, idrogeno, azoto, ossigeno, fosforo e zolfo, insieme ai metalli che servono agli enzimi, in forme chimiche accessibili.
4. **Condizioni compatibili con le molecole della vita**: temperature, acidità, salinità e radiazioni che non distruggano le molecole più in fretta di quanto gli organismi possano ripararle o sostituirle.

Abitabile non significa abitato. Un ambiente può avere tutti i requisiti e restare sterile, perché la vita non vi è mai nata o non vi è mai arrivata; viceversa, alcuni organismi terrestri vivono in condizioni che solo pochi decenni fa sarebbero state giudicate impossibili. L'elenco, inoltre, descrive la vita che conosciamo. Una vita in un solvente diverso dall'acqua, come quella ipotizzata per i laghi di metano di Titano, avrebbe requisiti diversi. Per questo le missioni spaziali cercano prima gli ambienti abitabili, poi le tracce chimiche o fisiche della vita, le **biofirme**, discusse nel capitolo [Biofirme e falsi positivi](unit:biology-33), e infine, se possibile, gli organismi stessi.

::: sintesi I quattro requisiti di un ambiente abitabile
Solvente liquido, sorgente di energia, elementi della vita in forma accessibile, condizioni che permettano alle molecole di durare. Il primo requisito è quello che si può verificare più facilmente a distanza, ed è per questo che per decenni la strategia della NASA nel sistema solare è stata riassunta nel motto «segui l'acqua».
:::

## Un'esperienza: far bollire l'acqua tiepida {#esperienza}

Una siringa basta per vedere che l'ebollizione dipende dalla pressione.

::: metodo L'acqua che bolle in una siringa
**Materiale.** Una siringa di plastica da $50$ o $60\un{mL}$ senza ago, con un tappo per il beccuccio o un dito pulito; acqua calda del rubinetto o scaldata, intorno a $45$–$50\,^\circ\mathrm C$; un termometro da cucina.

**Procedura.** Misurare la temperatura dell'acqua. Aspirare circa $10\un{mL}$ d'acqua, puntare la siringa verso l'alto ed espellere tutta l'aria. Chiudere il beccuccio con il tappo e tirare lo stantuffo con forza, tenendolo fermo per qualche secondo. Osservare le bolle che si formano, poi lasciare tornare lo stantuffo. Ripetere con acqua a temperature diverse, fino a quella del rubinetto freddo.

**Analisi.** Tirando lo stantuffo la pressione all'interno scende. Alla prima prova le bolle sono in parte aria che era disciolta nell'acqua: quando lo stantuffo torna indietro queste bolle restano. Le bolle di vapore, invece, scompaiono subito, perché il vapore ricondensa appena la pressione risale. Usando la relazione di Clausius-Clapeyron, stimare la pressione che si deve raggiungere nella siringa perché l'acqua bolla alla temperatura misurata: a $45\,^\circ\mathrm C$ il modello dà circa $10{,}5\un{kPa}$, le tavole $9{,}6\un{kPa}$. Spiegare perché con l'acqua fredda è difficile ottenere l'ebollizione.

**Sicurezza.** Non usare acqua bollente né siringhe con l'ago. Tenere il beccuccio rivolto lontano dal viso e dalle altre persone, perché il tappo può staccarsi.
:::

La siringa riproduce in piccolo ciò che accadrebbe a un astronauta esposto al vuoto senza tuta. A circa $6{,}3\un{kPa}$, la pressione che si trova a circa diciannove chilometri di quota, l'acqua bolle a $37\,^\circ\mathrm C$, la temperatura del corpo umano; sopra quella quota la saliva e le lacrime cominciano a bollire. È il cosiddetto limite di Armstrong, che rende obbligatorie le tute pressurizzate per i voli ad alta quota.

## Errori frequenti {#errori}

::: errore Credere che esista una definizione della vita accettata da tutti
La definizione operativa della NASA è la più citata, ma è una convenzione di lavoro. Le definizioni proposte sono decine, ciascuna con i suoi casi limite, e molti studiosi ritengono che una definizione soddisfacente richieda una teoria generale dei sistemi viventi.
:::

::: errore Trattare i virus come batteri molto piccoli
Un batterio ha ribosomi, metabolismo e membrana propri e si divide da sé. Un virus è un acido nucleico in un involucro, senza metabolismo, che si moltiplica solo dentro una cellula ospite. Che lo si consideri vivo o no dipende dalla definizione adottata.
:::

::: errore Pensare che l'acqua bolla sempre a cento gradi
Cento gradi è la temperatura di ebollizione alla pressione di $101{,}325\un{kPa}$. A pressione più bassa l'acqua bolle a temperature più basse, a pressione più alta a temperature più alte.
:::

::: errore Confondere ebollizione e temperatura elevata
L'acqua bolle quando la sua pressione di vapore eguaglia la pressione esterna, a qualunque temperatura compresa fra il punto triplo e il punto critico. In una siringa si può far bollire acqua tiepida.
:::

::: errore Considerare il silicio un sostituto naturale del carbonio
Il silicio ha la stessa valenza, ma forma legami deboli con se stesso, legami molto forti con l'ossigeno e un ossido solido. In un ambiente con acqua le sue catene si trasformano in silice.
:::

::: errore Confondere abitabile e abitato
Un ambiente abitabile soddisfa i requisiti per la vita come la conosciamo. Se la vita ci sia davvero è una domanda distinta, a cui rispondono soltanto le osservazioni.
:::

::: errore Dimenticare le ipotesi della relazione di Clausius-Clapeyron
La forma integrata vale per un vapore ideale e un'entalpia costante. Su intervalli larghi di temperatura conviene scegliere un punto di riferimento vicino alla regione di interesse.
:::

## Sintesi {#sintesi}

::: sintesi In breve
- Non esiste una definizione della vita accettata da tutti. Gli elenchi di proprietà (cellule, metabolismo, omeostasi, crescita, riproduzione, eredità, risposta agli stimoli, evoluzione) descrivono bene la vita terrestre, ma ogni proprietà presa da sola lascia fuori qualche vivente o include qualche sistema non vivente.
- La definizione operativa della NASA descrive la vita come un sistema chimico autosufficiente capace di evoluzione darwiniana. Altre definizioni mettono al centro la termodinamica dei sistemi aperti, il metabolismo autocatalitico con stampi e membrana del chemotone, o l'autoproduzione dei componenti dell'autopoiesi.
- Virus, viroidi e prioni si propagano solo grazie alle cellule; spore e organismi in criptobiosi sono vivi senza attività misurabile. Una teoria generale della vita richiederebbe probabilmente un secondo esempio, indipendente da quello terrestre.
- La vita usa soprattutto carbonio, idrogeno, ossigeno, azoto, fosforo e zolfo. Le sue proporzioni sono lontane da quelle delle rocce e più vicine a quelle cosmiche.
- Il carbonio forma quattro legami, catene, anelli e legami multipli, con energie simili verso se stesso, l'idrogeno e l'ossigeno; il suo ossido è un gas solubile che circola. Il silicio forma legami deboli con se stesso e fortissimi con l'ossigeno, e in acqua finisce in silice.
- L'acqua è polare, forma legami a idrogeno, scioglie ioni e molecole polari, esclude le sostanze apolari, ha calore specifico ed entalpia di vaporizzazione elevati, e il suo ghiaccio galleggia.
- L'acqua è liquida fra il punto triplo ($273{,}16\un{K}$, $611{,}657\un{Pa}$) e il punto critico ($647{,}096\un{K}$, $22{,}064\un{MPa}$). La temperatura di ebollizione dipende dalla pressione secondo la relazione di Clausius-Clapeyron, per cui $\ln p$ varia linearmente con $1/T$ con pendenza $-\Delta H_\mathrm{vap}/R$.
- Un ambiente abitabile ha un solvente liquido, una sorgente di energia, gli elementi della vita in forma accessibile e condizioni che permettono alle molecole di durare.
:::

## Glossario {#glossario}

- **Abitabilità**: insieme delle condizioni che rendono un ambiente adatto a ospitare la vita come la conosciamo.
- **Autopoiesi**: organizzazione di un sistema che produce continuamente i propri componenti, compreso il confine che lo separa dall'ambiente.
- **Biofirma**: traccia chimica o fisica che si può attribuire con buona sicurezza all'attività di organismi viventi.
- **Chemotone**: modello di sistema vivente minimo formato da un metabolismo autocatalitico, un sistema di stampi e una membrana.
- **Criptobiosi**: stato in cui un organismo sospende ogni attività metabolica misurabile e può riprenderla quando le condizioni migliorano.
- **Diagramma di fase**: rappresentazione delle fasi stabili di una sostanza in funzione di temperatura e pressione.
- **Effetto idrofobico**: tendenza delle sostanze apolari a raccogliersi lontano dall'acqua.
- **Entalpia di vaporizzazione**: calore necessario per vaporizzare una mole di liquido a pressione costante.
- **Legame a idrogeno**: attrazione fra un atomo di idrogeno legato a un atomo molto elettronegativo e un altro atomo elettronegativo vicino.
- **Metabolismo**: insieme delle reazioni chimiche con cui un organismo trasforma energia e materia.
- **Omeostasi**: capacità di mantenere costanti alcune condizioni interne al variare dell'ambiente.
- **Pressione di vapore**: pressione del vapore in equilibrio con il suo liquido a una data temperatura.
- **Prione**: proteina ripiegata in modo anomalo che induce lo stesso ripiegamento in altre copie della proteina.
- **Punto critico**: condizione oltre la quale liquido e vapore non si distinguono più.
- **Punto triplo**: unica condizione in cui solido, liquido e vapore coesistono in equilibrio.
- **Viroide**: piccolo anello di RNA senza involucro e senza geni per proteine, che si replica nelle cellule delle piante.
- **Virus**: acido nucleico racchiuso in un involucro proteico che si moltiplica solo all'interno di una cellula ospite.

## Esercizi {#esercizi}

::: esercizio Un cristallo che cresce [base]
Un cristallo di sale cresce in una soluzione che evapora, e se si spezza ciascun frammento continua a crescere. Quali proprietà dei viventi possiede? Quali gli mancano rispetto alla definizione della NASA?
>>> soluzione
Il cristallo cresce e, in un senso molto largo, si moltiplica per frammentazione. Gli manca un metabolismo: cresce perché la soluzione è sovrasatura, senza trasformare energia per costruire i propri componenti. Gli manca soprattutto un'informazione ereditaria che varia e viene selezionata: i frammenti hanno la stessa struttura del cristallo di partenza, e le loro eventuali imperfezioni non vengono copiate in modo affidabile. Il cristallo non è quindi capace di evoluzione darwiniana.
:::

::: esercizio Il genoma di un virus gigante [base]
Il genoma del mimivirus contiene $1\,181\,404$ coppie di basi, quello della cellula sintetica minima JCVI-syn3.0 ne contiene $531\,560$. Quante volte è più lungo il genoma del virus? Perché il virus, nonostante questo, non è autosufficiente?
>>> soluzione
Il rapporto è $1\,181\,404/531\,560\simeq2{,}22$: il genoma del virus è più del doppio di quello della cellula minima. La lunghezza del genoma è irrilevante per l'autosufficienza. Il mimivirus non ha ribosomi, non produce energia e non costruisce da sé le proprie molecole. Si moltiplica solo dentro un'ameba, usandone il metabolismo e la macchina della traduzione.
:::

::: esercizio Elementi concentrati [base]
Nel corpo umano il carbonio è il $18{,}5\%$ della massa, l'azoto il $3{,}2\%$ e l'idrogeno il $9{,}5\%$; nella crosta terrestre gli stessi elementi sono lo $0{,}02\%$, lo $0{,}0019\%$ e lo $0{,}14\%$. Calcolare per ciascuno il fattore di arricchimento nel corpo rispetto alla crosta.
>>> soluzione
Carbonio: $18{,}5/0{,}02\simeq925$. Azoto: $3{,}2/0{,}0019\simeq1{,}7\times10^3$. Idrogeno: $9{,}5/0{,}14\simeq68$. L'idrogeno è meno arricchito perché nella crosta è presente nell'acqua legata ai minerali, mentre carbonio e azoto sono rari nelle rocce.
:::

::: esercizio Scaldare e far evaporare [base]
Quanta energia serve per scaldare un kilogrammo d'acqua da $20$ a $100\,^\circ\mathrm C$? Quanta per vaporizzarlo a $100\,^\circ\mathrm C$? Usare $c=4{,}18\un{J/(g\,K)}$, $\Delta H_\mathrm{vap}=40{,}7\un{kJ/mol}$ e $M=18{,}015\un{g/mol}$.
>>> soluzione
Per scaldare: $Q_1=4{,}18\cdot1000\cdot80\un{J}\simeq334\un{kJ}$. Un kilogrammo d'acqua contiene $1000/18{,}015\simeq55{,}5\un{mol}$, quindi per vaporizzarlo servono

$$Q_2=55{,}5\cdot40{,}7\un{kJ}\simeq2{,}26\times10^3\un{kJ},$$

circa $6{,}8$ volte più che per scaldarlo da $20$ a $100\,^\circ\mathrm C$. Per questo una pentola d'acqua impiega molto più tempo a evaporare del tutto che a raggiungere l'ebollizione.
:::

::: esercizio Un iceberg in un lago [base]
La densità del ghiaccio è $0{,}9167\un{g/cm^3}$, quella dell'acqua dolce a $0\,^\circ\mathrm C$ è $0{,}99984\un{g/cm^3}$ e quella dell'acqua di mare $1{,}025\un{g/cm^3}$. Quale frazione di un blocco di ghiaccio galleggiante resta immersa nei due casi?
>>> soluzione
La frazione immersa è il rapporto delle densità. In acqua dolce $0{,}9167/0{,}99984\simeq0{,}917$, cioè circa il $92\%$; in acqua di mare $0{,}9167/1{,}025\simeq0{,}894$, circa l'$89\%$. In mare il ghiaccio galleggia un poco di più perché l'acqua salata è più densa.
:::

::: esercizio Liquidi su Titano [base]
Alla pressione di un'atmosfera l'ammoniaca è liquida fra $195{,}4$ e $239{,}8\un{K}$, il metano fra $90{,}7$ e $111{,}7\un{K}$, l'etano fra $90{,}4$ e $184{,}6\un{K}$. Calcolare l'ampiezza dei tre intervalli e dire quali sostanze possono essere liquide sulla superficie di Titano, a circa $94\un{K}$.
>>> soluzione
Gli intervalli sono $239{,}8-195{,}4=44{,}4\un{K}$ per l'ammoniaca, $111{,}7-90{,}7=21{,}0\un{K}$ per il metano e $184{,}6-90{,}4=94{,}2\un{K}$ per l'etano. A $94\un{K}$ metano ed etano sono liquidi, perché la temperatura è sopra il loro punto di fusione e sotto quello di ebollizione; l'ammoniaca è solida. La pressione di Titano, un poco superiore a un'atmosfera, alza leggermente i punti di ebollizione e non cambia la conclusione.
:::

::: esercizio Bollire in alta montagna [medio]
Su una montagna di circa $5500\un{m}$ la pressione atmosferica è di circa $50\un{kPa}$. Con la relazione di Clausius-Clapeyron e $\Delta H_\mathrm{vap}=40{,}7\un{kJ/mol}$, a che temperatura bolle l'acqua?
>>> soluzione
$$\begin{aligned}\frac1{T_\mathrm{eb}}&=\frac1{373{,}15}-\frac{8{,}314}{40\,700}\ln\frac{50}{101{,}325}\\&\simeq2{,}680\times10^{-3}+1{,}443\times10^{-4}\\&\simeq2{,}824\times10^{-3}\un{K^{-1}}.\end{aligned}$$

Quindi $T_\mathrm{eb}\simeq354{,}1\un{K}$, circa $80{,}9\,^\circ\mathrm C$. Le tavole del vapore danno $81{,}3\,^\circ\mathrm C$.
:::

::: esercizio La pentola a pressione [medio]
In una pentola a pressione la pressione assoluta raggiunge $200\un{kPa}$. Calcolare la temperatura di ebollizione con la relazione di Clausius-Clapeyron e confrontarla con il valore delle tavole, $120{,}2\,^\circ\mathrm C$.
>>> soluzione
Con $\ln(200/101{,}325)\simeq0{,}680$:

$$\begin{aligned}\frac1{T_\mathrm{eb}}&\simeq2{,}680\times10^{-3}-1{,}389\times10^{-4}\\&\simeq2{,}541\times10^{-3}\un{K^{-1}},\end{aligned}$$

da cui $T_\mathrm{eb}\simeq393{,}5\un{K}$, circa $120{,}4\,^\circ\mathrm C$. La differenza dal valore delle tavole è di due decimi di grado.
:::

::: esercizio Quanto sudore [medio]
Durante una corsa in una giornata calda il corpo deve disperdere $1000\un{kJ}$ di calore soltanto per evaporazione. Quanta acqua deve evaporare, se l'entalpia di vaporizzazione a temperatura ambiente è circa $2{,}44\un{kJ/g}$?
>>> soluzione
$1000/2{,}44\simeq410\un{g}$: poco meno di mezzo litro di sudore evaporato. L'acqua che gocciola senza evaporare non raffredda il corpo.
:::

::: esercizio La profondità di una sorgente calda [medio]
A $350\,^\circ\mathrm C$ la pressione di vapore dell'acqua è $16{,}53\un{MPa}$. A quale profondità minima, nell'oceano, l'acqua di una sorgente idrotermale a questa temperatura non bolle? Usare $\rho=1025\un{kg/m^3}$, $g=9{,}81\un{m/s^2}$ e una pressione atmosferica di $101{,}3\un{kPa}$.
>>> soluzione
Serve $p_\mathrm{atm}+\rho gh\ge16{,}53\un{MPa}$, cioè $\rho gh\ge16{,}43\un{MPa}$. Con $\rho g\simeq1{,}006\times10^4\un{Pa/m}$:

$$h\ge\frac{1{,}643\times10^7}{1{,}006\times10^4}\un{m}\simeq1{,}63\un{km}.$$

Le sorgenti delle dorsali oceaniche, fra due e quattro chilometri di profondità, sono abbondantemente sotto questo limite.
:::

::: esercizio La pressione di vapore a temperatura ambiente [medio]
Usare la relazione di Clausius-Clapeyron, con riferimento al punto di ebollizione normale, per stimare la pressione di vapore dell'acqua a $25\,^\circ\mathrm C$, prima con $\Delta H_\mathrm{vap}=40{,}7\un{kJ/mol}$, poi con $44{,}0\un{kJ/mol}$. Il valore misurato è $3{,}17\un{kPa}$. Commentare.
>>> soluzione
La differenza fra gli inversi delle due temperature vale $6{,}741\times10^{-4}\un{K^{-1}}$, quindi

$$p=101{,}325\un{kPa}\cdot\mathrm e^{-\Delta H_\mathrm{vap}\cdot6{,}741\times10^{-4}/R}.$$

Con $40{,}7\un{kJ/mol}$ l'esponente vale $-3{,}300$ e $p\simeq3{,}74\un{kPa}$, il $18\%$ in più del valore misurato. Con $44{,}0\un{kJ/mol}$ l'esponente vale $-3{,}567$ e $p\simeq2{,}86\un{kPa}$, il $10\%$ in meno. Il primo valore di entalpia vale a $100\,^\circ\mathrm C$, il secondo a $25\,^\circ\mathrm C$: sull'intervallo fra le due temperature l'entalpia varia, e un valore intermedio darebbe un risultato migliore di entrambi.
:::

::: esercizio Reazioni nel freddo [medio]
Una reazione ha energia di attivazione $E_a=50\un{kJ/mol}$. Di quanto si rallenta passando da $300\un{K}$ a $94\un{K}$, la temperatura di Titano, secondo la legge di Arrhenius? E se $E_a=20\un{kJ/mol}$?
>>> soluzione
Il rapporto delle costanti di velocità è $\mathrm e^{(E_a/R)(1/94-1/300)}$, con $1/94-1/300\simeq7{,}305\times10^{-3}\un{K^{-1}}$. Per $E_a=50\un{kJ/mol}$ l'esponente vale circa $43{,}9$ e il rallentamento è di circa $1{,}2\times10^{19}$ volte; per $E_a=20\un{kJ/mol}$ l'esponente vale circa $17{,}6$ e il rallentamento è di circa $4\times10^{7}$ volte. Una biochimica a basse temperature dovrebbe usare reazioni con barriere molto basse.
:::

::: esercizio L'entalpia da due misure [avanzato]
A $80\,^\circ\mathrm C$ la pressione di vapore dell'acqua è $47{,}41\un{kPa}$, a $100\,^\circ\mathrm C$ è $101{,}42\un{kPa}$. Ricavare l'entalpia di vaporizzazione media in questo intervallo e confrontarla con il valore tabulato a $90\,^\circ\mathrm C$, circa $41{,}1\un{kJ/mol}$.
>>> soluzione
Dalla relazione di Clausius-Clapeyron

$$\Delta H_\mathrm{vap}=\frac{R\ln(p_2/p_1)}{1/T_1-1/T_2}.$$

Con $\ln(101{,}42/47{,}41)\simeq0{,}760$ e con la differenza fra gli inversi delle temperature, $1{,}518\times10^{-4}\un{K^{-1}}$, si ottiene $\Delta H_\mathrm{vap}\simeq41{,}7\un{kJ/mol}$. Il valore è circa l'$1\%$ più alto di quello tabulato: il vapore a queste pressioni si discosta un poco dal gas ideale, e il calcolo assorbe questa differenza nell'entalpia efficace.
:::

::: esercizio Il punto triplo previsto [avanzato]
Calcolare con la relazione di Clausius-Clapeyron, con riferimento a $100\,^\circ\mathrm C$ e $101{,}325\un{kPa}$, la temperatura di ebollizione alla pressione del punto triplo, $0{,}611657\un{kPa}$, usando prima $\Delta H_\mathrm{vap}=40{,}7\un{kJ/mol}$, poi $45{,}05\un{kJ/mol}$, il valore al punto triplo. Il risultato esatto è $0{,}01\,^\circ\mathrm C$. Perché nessuno dei due valori di entalpia dà il risultato giusto?
>>> soluzione
Con $\ln(0{,}611657/101{,}325)\simeq-5{,}110$ si ottiene $T\simeq268{,}5\un{K}$, cioè $-4{,}6\,^\circ\mathrm C$, con il primo valore, e $T\simeq276{,}0\un{K}$, cioè $2{,}9\,^\circ\mathrm C$, con il secondo. Il primo sbaglia per difetto, il secondo per eccesso: l'entalpia di vaporizzazione varia da $40{,}7$ a $45{,}05\un{kJ/mol}$ lungo l'intervallo, e solo un valore intermedio, circa $43{,}3\un{kJ/mol}$, darebbe il risultato corretto. La relazione integrata con entalpia costante non può riprodurre un intervallo così largo con il valore di uno solo dei due estremi.
:::

::: esercizio Acqua sul fondo di Hellas [avanzato]
Sul fondo del bacino marziano di Hellas la pressione arriva a circa $1{,}2\un{kPa}$. Usando come riferimento il punto triplo ($273{,}16\un{K}$, $0{,}611657\un{kPa}$) e $\Delta H_\mathrm{vap}=45{,}0\un{kJ/mol}$, stimare la temperatura di ebollizione dell'acqua pura. In quale intervallo di temperatura l'acqua pura può essere liquida? Che cosa accade alla pressione media di Marte, circa $0{,}6\un{kPa}$?
>>> soluzione
Con $\ln(1{,}2/0{,}611657)\simeq0{,}674$ e $R/\Delta H_\mathrm{vap}\simeq1{,}848\times10^{-4}\un{K^{-1}}$:

$$\begin{aligned}\frac1{T_\mathrm{eb}}&\simeq3{,}6609\times10^{-3}-1{,}245\times10^{-4}\\&\simeq3{,}536\times10^{-3}\un{K^{-1}},\end{aligned}$$

da cui $T_\mathrm{eb}\simeq282{,}8\un{K}$, circa $9{,}6\,^\circ\mathrm C$; le tavole danno $9{,}65\,^\circ\mathrm C$. L'acqua pura può essere liquida fra $0$ e circa $10\,^\circ\mathrm C$. A $0{,}6\un{kPa}$, sotto la pressione del punto triplo, l'acqua liquida pura è instabile a qualunque temperatura, e il ghiaccio sublima.
:::

::: esercizio Metano che bolle su Titano [avanzato]
Il metano ha un punto di ebollizione normale di $111{,}67\un{K}$ e un'entalpia di vaporizzazione di $8{,}19\un{kJ/mol}$. Stimare la sua temperatura di ebollizione alla pressione della superficie di Titano, $146{,}7\un{kPa}$. In quale intervallo di temperatura il metano puro è liquido su Titano, se fonde a $90{,}7\un{K}$?
>>> soluzione
Con $\ln(146{,}7/101{,}325)\simeq0{,}370$:

$$\begin{aligned}\frac1{T_\mathrm{eb}}&=\frac1{111{,}67}-\frac{8{,}314\cdot0{,}370}{8190}\\&\simeq8{,}955\times10^{-3}-3{,}76\times10^{-4},\end{aligned}$$

cioè $1/T_\mathrm{eb}\simeq8{,}579\times10^{-3}\un{K^{-1}}$ e $T_\mathrm{eb}\simeq116{,}6\un{K}$. Il metano puro è liquido fra $90{,}7$ e circa $116{,}6\un{K}$; a $94\un{K}$ si trova poco sopra il punto di fusione. Nei laghi di Titano il metano è mescolato con l'etano e con azoto disciolto, che ne abbassano la temperatura di fusione.
:::

::: esercizio Una molecola che si copia in provetta [avanzato]
Negli anni Sessanta Sol Spiegelman mise in provetta l'RNA di un virus insieme all'enzima che lo copia e ai nucleotidi. Trasferendo ripetutamente una piccola parte della miscela in provette nuove, ottenne molecole sempre più corte e più veloci a farsi copiare. Il sistema evolveva? Era vivo, secondo la definizione della NASA?
>>> soluzione
Il sistema evolveva in senso darwiniano: le molecole si copiavano con errori, le varianti più rapide si moltiplicavano di più e prendevano il sopravvento a ogni trasferimento. Mancava però l'autosufficienza, perché l'enzima e i nucleotidi erano forniti dallo sperimentatore e l'RNA non li produceva. Secondo la definizione della NASA, quindi, il sistema non era vivo. L'esperimento mostra che l'evoluzione può agire su molecole semplici, e che l'autosufficienza è la parte più difficile da costruire.
:::

::: esercizio Il limite di Armstrong [avanzato]
A quale pressione l'acqua bolle a $37\,^\circ\mathrm C$? Calcolarla con la relazione di Clausius-Clapeyron e $\Delta H_\mathrm{vap}=40{,}7\un{kJ/mol}$, poi confrontarla con il valore delle tavole, $6{,}28\un{kPa}$. Perché sopra circa diciannove chilometri di quota un pilota deve indossare una tuta pressurizzata?
>>> soluzione
La differenza fra gli inversi delle temperature vale $5{,}444\times10^{-4}\un{K^{-1}}$; moltiplicata per $\Delta H_\mathrm{vap}/R$ dà un esponente di $-2{,}665$, e

$$p\simeq101{,}325\un{kPa}\cdot\mathrm e^{-2{,}665}\simeq7{,}05\un{kPa},$$

il $12\%$ in più del valore delle tavole. Sopra circa diciannove chilometri la pressione atmosferica scende sotto $6{,}3\un{kPa}$, e i liquidi del corpo esposti all'aria, come la saliva e le lacrime, cominciano a bollire alla temperatura corporea. Una tuta pressurizzata mantiene attorno al corpo una pressione sufficiente.
:::

## Fonti {#fonti}

Il testo, le figure, gli esempi e gli esercizi di questo capitolo sono originali. Per la scelta e l'ordine degli argomenti i riferimenti principali sono A. M. Shaw, *Astrochemistry: From Astronomy to Astrobiology*, Wiley, 2006, §1.3 (origini della vita, proprietà dei viventi e caso della fiamma), §1.5 (teorie sull'origine della vita) e §8.1 (vita basata sul carbonio e sull'acqua, proprietà dei solventi), e J. R. Morris, D. L. Hartl, A. H. Knoll e collaboratori, *Biology: How Life Works*, 2ª edizione, Macmillan, 2016, §1.2 (che cos'è la vita), §1.3 (la cellula e i virus), §2.3 (l'acqua) e §2.4 (il carbonio e la composizione elementare delle cellule). Dati ed esperimenti provengono dalle fonti primarie seguenti.

1. G. V. Levin, P. A. Straat, *Science* 194, 1322 (1976); K. Biemann e collaboratori, *Journal of Geophysical Research* 82, 4641 (1977): esperimenti biologici e analisi delle molecole organiche dei lander Viking.
2. G. F. Joyce, prefazione a D. W. Deamer, G. R. Fleischaker (a cura di), *Origins of Life: The Central Concepts*, Jones and Bartlett, 1994: definizione operativa della NASA.
3. E. Schrödinger, *What Is Life?*, Cambridge University Press, 1944; T. Gánti, *The Principles of Life*, Oxford University Press, 2003 (prima edizione ungherese 1971); H. R. Maturana, F. J. Varela, *Autopoiesis and Cognition*, Reidel, 1980 (prima edizione 1973).
4. C. E. Cleland, C. F. Chyba, *Origins of Life and Evolution of the Biosphere* 32, 387 (2002): definizioni della vita e analogia con l'acqua; R. M. Hazen, *Genesis: The Scientific Quest for Life's Origin*, Joseph Henry Press, 2005, capitolo 2: quarantotto definizioni a confronto.
5. B. La Scola e collaboratori, *Science* 299, 2033 (2003); D. Raoult e collaboratori, *Science* 306, 1344 (2004): scoperta e genoma del mimivirus; C. A. Hutchison III e collaboratori, *Science* 351, aad6253 (2016): genoma di JCVI-syn3.0.
6. D. R. Mills, R. L. Peterson, S. Spiegelman, *PNAS* 58, 217 (1967): evoluzione di un RNA replicato in provetta.
7. W. M. Haynes (a cura di), *CRC Handbook of Chemistry and Physics*, 97ª edizione, CRC Press, 2016: abbondanza degli elementi nella crosta, punti di fusione e di ebollizione dei solventi; OpenStax, *Anatomy and Physiology*, 2ª edizione, 2022, tabella 2.1: composizione elementare del corpo umano.
8. M. Asplund, N. Grevesse, A. J. Sauval, P. Scott, *Annual Review of Astronomy and Astrophysics* 47, 481 (2009): abbondanze solari degli elementi.
9. Energie medie di legame: LibreTexts Chemistry, tabella delle energie di legame; R. West, M. J. Fink, J. Michl, *Science* 214, 1343 (1981): primo disilene stabile.
10. J. J. Petkowski, W. Bains, S. Seager, *Life* 10, 84 (2020): il silicio come elemento strutturale della vita; S. B. J. Kan, R. D. Lewis, K. Chen, F. H. Arnold, *Science* 354, 1048 (2016): formazione enzimatica di legami carbonio-silicio.
11. W. Wagner, A. Pruß, *Journal of Physical and Chemical Reference Data* 31, 387 (2002); IAPWS, *Revised Release on the IAPWS Industrial Formulation 1997*, 2007: punto triplo, punto critico, pressioni di vapore ed entalpie di vaporizzazione dell'acqua; IAPWS, *Revised Release on the Pressure along the Melting and Sublimation Curves of Ordinary Water Substance*, 2011.
12. G. S. Kell, *Journal of Chemical and Engineering Data* 20, 97 (1975): densità dell'acqua liquida fra $0$ e $150\,^\circ\mathrm C$.
13. K. Takai e collaboratori, *PNAS* 105, 10949 (2008): crescita di *Methanopyrus kandleri* ceppo 116 a $122\,^\circ\mathrm C$ e $20\un{MPa}$.
14. M. H. Hecht e collaboratori, *Science* 325, 64 (2009): perclorati nel suolo del sito di Phoenix.
15. M. Fulchignoni e collaboratori, *Nature* 438, 785 (2005): temperatura e pressione alla superficie di Titano misurate dalla sonda Huygens; NASA, *Planetary Fact Sheet*: temperatura e pressione medie della superficie di Venere e di Marte.
16. R. Saladino, C. Crestini, S. Pino, G. Costanzo, E. Di Mauro, *Physics of Life Reviews* 9, 84 (2012): la formammide come solvente prebiotico.
17. Costanti: R dal valore CODATA 2022.
