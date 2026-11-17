---
unit: biology-06
titolo: Chiralità e omochiralità
sottotitolo: Molecole destre e sinistre, eccessi nei meteoriti e amplificazione
volume: Volume di biologia
fonte: Testo originale; riferimenti principali A. M. Shaw, Astrochemistry, §1.3, 8.6; J. R. Morris et al., Biology: How Life Works, 2ª ed., §2.5, 4.1
---

## Prima di cominciare {#apertura}

Nel 1848 Louis Pasteur, che aveva venticinque anni, studiava al microscopio i cristalli di un sale dell'acido tartarico, una sostanza che si deposita nelle botti di vino. Una forma di quel sale, ottenuta dalle botti, ruotava il piano della luce polarizzata; un'altra forma, con la stessa composizione chimica, chiamata acido racemico, non la ruotava. Pasteur notò che i cristalli della forma inattiva erano di due tipi, con piccole facce inclinate in versi opposti, come una mano destra e una mano sinistra. Con una pinzetta li separò uno per uno in due mucchietti, sciolse ciascun mucchietto in acqua e scoprì che le due soluzioni ruotavano la luce di angoli uguali e opposti. Mescolate in parti uguali, tornavano inattive.

Pasteur aveva scoperto che una molecola può esistere in due forme che sono l'una l'immagine speculare dell'altra, e che una miscela in parti uguali delle due forme si comporta in modo diverso da ciascuna. Si convinse anche che questa asimmetria fosse una firma della vita: le sostanze prodotte dagli organismi erano spesso di una sola forma, quelle sintetizzate in laboratorio erano quasi sempre miscele.

Più di un secolo e mezzo dopo, la sua intuizione è diventata una delle domande centrali dell'astrobiologia. Tutte le proteine della vita terrestre sono costruite con amminoacidi di una sola forma, e tutti gli acidi nucleici con zuccheri di una sola forma. Come è nata questa preferenza, in un mondo prebiotico in cui la chimica produceva le due forme in quantità uguali? E una preferenza simile, trovata in un campione di un altro pianeta, sarebbe una traccia di vita?

::: obiettivi
- riconoscere le molecole chirali e i loro centri stereogenici, e usare le notazioni L, D, R e S;
- descrivere le proprietà degli enantiomeri e il funzionamento di un polarimetro, e calcolare la rotazione specifica;
- calcolare l'eccesso enantiomerico di una miscela e interpretarne il significato;
- spiegare perché la vita richiede molecole di una sola forma e che cosa sia l'inibizione incrociata;
- confrontare le ipotesi sull'origine della prima asimmetria e i dati sugli eccessi enantiomerici nei meteoriti;
- usare un modello di amplificazione per discutere come un piccolo eccesso possa diventare una preferenza quasi totale.
:::

Il capitolo usa la geometria tetraedrica del carbonio del capitolo [Geometria molecolare e VSEPR](unit:chemistry-08) e gli amminoacidi e gli zuccheri introdotti nel capitolo [Elementi e molecole della vita nello spazio](unit:biology-04). Gli amminoacidi dei meteoriti sono descritti nel capitolo [Meteoriti, comete e campioni di asteroidi](unit:biology-05); le funzioni esponenziali del modello di amplificazione sono trattate nel capitolo di matematica [Esponenziali e logaritmi](unit:math-c06).

## Mani, specchi e molecole {#chiralita}

Una mano destra e una mano sinistra sono l'una l'immagine speculare dell'altra e restano impossibili da sovrapporre: un guanto destro non entra in una mano sinistra, comunque lo si giri. Un oggetto con questa proprietà si dice **chirale**, dalla parola greca che indica la mano. Una sfera, un cubo o una tazza da tè sono invece **achirali**: coincidono con la propria immagine speculare.

Molte molecole organiche sono chirali. Il caso più comune è quello di un atomo di carbonio legato a quattro gruppi tutti diversi. I quattro legami del carbonio puntano verso i vertici di un tetraedro, e i quattro gruppi si possono disporre in due modi che sono l'uno l'immagine speculare dell'altro. Un atomo di questo tipo si chiama **centro stereogenico**, e le due forme della molecola si chiamano **enantiomeri** (figura 1).

::: figura enantiomeri
{"w":640,"h":265,"items":[{"t":"line","p":[170,130,170,60],"c":"ax","w":2.4},{"t":"circle","p":[170,60,20],"c":"body"},{"t":"poly","pts":[[190.0,60.0],[189.5,64.5],[188.0,68.7],[185.6,72.5],[182.5,75.6],[178.7,78.0],[174.5,79.5],[170.0,80.0],[165.5,79.5],[161.3,78.0],[157.5,75.6],[154.4,72.5],[152.0,68.7],[150.5,64.5],[150.0,60.0],[150.5,55.5],[152.0,51.3],[154.4,47.5],[157.5,44.4],[161.3,42.0],[165.5,40.5],[170.0,40.0],[174.5,40.5],[178.7,42.0],[182.5,44.4],[185.6,47.5],[188.0,51.3],[189.5,55.5]],"c":"force3","w":2,"close":true},{"t":"text","p":[170,64],"s":"COOH","c":"force3","size":11},{"t":"line","p":[170,130,232,160],"c":"ax","w":2.4},{"t":"circle","p":[232,160,20],"c":"body"},{"t":"poly","pts":[[252.0,160.0],[251.5,164.5],[250.0,168.7],[247.6,172.5],[244.5,175.6],[240.7,178.0],[236.5,179.5],[232.0,180.0],[227.5,179.5],[223.3,178.0],[219.5,175.6],[216.4,172.5],[214.0,168.7],[212.5,164.5],[212.0,160.0],[212.5,155.5],[214.0,151.3],[216.4,147.5],[219.5,144.4],[223.3,142.0],[227.5,140.5],[232.0,140.0],[236.5,140.5],[240.7,142.0],[244.5,144.4],[247.6,147.5],[250.0,151.3],[251.5,155.5]],"c":"force2","w":2,"close":true},{"t":"text","p":[232,164],"s":"NH₂","c":"force2","size":11},{"t":"poly","pts":[[170,130],[111,172],[119,184]],"c":"ax","w":1.4,"close":true,"fill":true},{"t":"circle","p":[115,178,20],"c":"body"},{"t":"poly","pts":[[135.0,178.0],[134.5,182.5],[133.0,186.7],[130.6,190.5],[127.5,193.6],[123.7,196.0],[119.5,197.5],[115.0,198.0],[110.5,197.5],[106.3,196.0],[102.5,193.6],[99.4,190.5],[97.0,186.7],[95.5,182.5],[95.0,178.0],[95.5,173.5],[97.0,169.3],[99.4,165.5],[102.5,162.4],[106.3,160.0],[110.5,158.5],[115.0,158.0],[119.5,158.5],[123.7,160.0],[127.5,162.4],[130.6,165.5],[133.0,169.3],[134.5,173.5]],"c":"force4","w":2,"close":true},{"t":"text","p":[115,182],"s":"CH₃","c":"force4","size":11},{"t":"line","p":[170,130,144,112],"c":"ax","w":1.4,"dash":true},{"t":"circle","p":[144,112,12],"c":"body"},{"t":"poly","pts":[[156.0,112.0],[155.7,114.7],[154.8,117.2],[153.4,119.5],[151.5,121.4],[149.2,122.8],[146.7,123.7],[144.0,124.0],[141.3,123.7],[138.8,122.8],[136.5,121.4],[134.6,119.5],[133.2,117.2],[132.3,114.7],[132.0,112.0],[132.3,109.3],[133.2,106.8],[134.6,104.5],[136.5,102.6],[138.8,101.2],[141.3,100.3],[144.0,100.0],[146.7,100.3],[149.2,101.2],[151.5,102.6],[153.4,104.5],[154.8,106.8],[155.7,109.3]],"c":"muted","w":2,"close":true},{"t":"text","p":[144,116],"s":"H","c":"muted","size":11},{"t":"circle","p":[170,130,14],"c":"body"},{"t":"poly","pts":[[184.0,130.0],[183.5,133.6],[182.1,137.0],[179.9,139.9],[177.0,142.1],[173.6,143.5],[170.0,144.0],[166.4,143.5],[163.0,142.1],[160.1,139.9],[157.9,137.0],[156.5,133.6],[156.0,130.0],[156.5,126.4],[157.9,123.0],[160.1,120.1],[163.0,117.9],[166.4,116.5],[170.0,116.0],[173.6,116.5],[177.0,117.9],[179.9,120.1],[182.1,123.0],[183.5,126.4]],"c":"ax","w":1.6,"close":true},{"t":"text","p":[170,135],"s":"C","c":"ax","size":13},{"t":"line","p":[470,130,470,60],"c":"ax","w":2.4},{"t":"circle","p":[470,60,20],"c":"body"},{"t":"poly","pts":[[490.0,60.0],[489.5,64.5],[488.0,68.7],[485.6,72.5],[482.5,75.6],[478.7,78.0],[474.5,79.5],[470.0,80.0],[465.5,79.5],[461.3,78.0],[457.5,75.6],[454.4,72.5],[452.0,68.7],[450.5,64.5],[450.0,60.0],[450.5,55.5],[452.0,51.3],[454.4,47.5],[457.5,44.4],[461.3,42.0],[465.5,40.5],[470.0,40.0],[474.5,40.5],[478.7,42.0],[482.5,44.4],[485.6,47.5],[488.0,51.3],[489.5,55.5]],"c":"force3","w":2,"close":true},{"t":"text","p":[470,64],"s":"COOH","c":"force3","size":11},{"t":"line","p":[470,130,408,160],"c":"ax","w":2.4},{"t":"circle","p":[408,160,20],"c":"body"},{"t":"poly","pts":[[428.0,160.0],[427.5,164.5],[426.0,168.7],[423.6,172.5],[420.5,175.6],[416.7,178.0],[412.5,179.5],[408.0,180.0],[403.5,179.5],[399.3,178.0],[395.5,175.6],[392.4,172.5],[390.0,168.7],[388.5,164.5],[388.0,160.0],[388.5,155.5],[390.0,151.3],[392.4,147.5],[395.5,144.4],[399.3,142.0],[403.5,140.5],[408.0,140.0],[412.5,140.5],[416.7,142.0],[420.5,144.4],[423.6,147.5],[426.0,151.3],[427.5,155.5]],"c":"force2","w":2,"close":true},{"t":"text","p":[408,164],"s":"NH₂","c":"force2","size":11},{"t":"poly","pts":[[470,130],[521,172],[529,184]],"c":"ax","w":1.4,"close":true,"fill":true},{"t":"circle","p":[525,178,20],"c":"body"},{"t":"poly","pts":[[545.0,178.0],[544.5,182.5],[543.0,186.7],[540.6,190.5],[537.5,193.6],[533.7,196.0],[529.5,197.5],[525.0,198.0],[520.5,197.5],[516.3,196.0],[512.5,193.6],[509.4,190.5],[507.0,186.7],[505.5,182.5],[505.0,178.0],[505.5,173.5],[507.0,169.3],[509.4,165.5],[512.5,162.4],[516.3,160.0],[520.5,158.5],[525.0,158.0],[529.5,158.5],[533.7,160.0],[537.5,162.4],[540.6,165.5],[543.0,169.3],[544.5,173.5]],"c":"force4","w":2,"close":true},{"t":"text","p":[525,182],"s":"CH₃","c":"force4","size":11},{"t":"line","p":[470,130,496,112],"c":"ax","w":1.4,"dash":true},{"t":"circle","p":[496,112,12],"c":"body"},{"t":"poly","pts":[[508.0,112.0],[507.7,114.7],[506.8,117.2],[505.4,119.5],[503.5,121.4],[501.2,122.8],[498.7,123.7],[496.0,124.0],[493.3,123.7],[490.8,122.8],[488.5,121.4],[486.6,119.5],[485.2,117.2],[484.3,114.7],[484.0,112.0],[484.3,109.3],[485.2,106.8],[486.6,104.5],[488.5,102.6],[490.8,101.2],[493.3,100.3],[496.0,100.0],[498.7,100.3],[501.2,101.2],[503.5,102.6],[505.4,104.5],[506.8,106.8],[507.7,109.3]],"c":"muted","w":2,"close":true},{"t":"text","p":[496,116],"s":"H","c":"muted","size":11},{"t":"circle","p":[470,130,14],"c":"body"},{"t":"poly","pts":[[484.0,130.0],[483.5,133.6],[482.1,137.0],[479.9,139.9],[477.0,142.1],[473.6,143.5],[470.0,144.0],[466.4,143.5],[463.0,142.1],[460.1,139.9],[457.9,137.0],[456.5,133.6],[456.0,130.0],[456.5,126.4],[457.9,123.0],[460.1,120.1],[463.0,117.9],[466.4,116.5],[470.0,116.0],[473.6,116.5],[477.0,117.9],[479.9,120.1],[482.1,123.0],[483.5,126.4]],"c":"ax","w":1.6,"close":true},{"t":"text","p":[470,135],"s":"C","c":"ax","size":13},{"t":"line","p":[320,30,320,230],"c":"muted","w":1.4,"dash":true},{"t":"text","p":[320,250],"s":"specchio","c":"muted","size":11},{"t":"text","p":[170,250],"s":"L-alanina","c":"force2","size":13},{"t":"text","p":[470,250],"s":"D-alanina","c":"force2","size":13}]}
---
Le due forme dell'alanina, l'una immagine speculare dell'altra rispetto al piano tratteggiato. Il carbonio centrale porta quattro gruppi diversi: amminico, carbossilico, metilico e un idrogeno. Il legame tratteggiato dell'idrogeno punta dietro il piano del disegno, quello del gruppo metilico verso chi guarda. Nessuna rotazione trasforma una forma nell'altra.
:::

L'amminoacido alanina ha un carbonio legato a un gruppo amminico, $\mathrm{{-}NH_2}$, a un gruppo carbossilico, $\mathrm{{-}COOH}$, a un gruppo metilico, $\mathrm{{-}CH_3}$, e a un atomo di idrogeno: quattro gruppi diversi, e quindi due enantiomeri. La glicina, l'amminoacido più semplice, ha al posto del gruppo metilico un secondo atomo di idrogeno, e i due idrogeni uguali rendono la molecola achirale. Dei venti amminoacidi delle proteine, diciannove sono chirali, e due di essi, l'isoleucina e la treonina, hanno due centri stereogenici. Gli zuccheri ne hanno parecchi: il ribosio dell'RNA, nella sua forma ad anello, ne ha quattro.

### Nomi per le due forme {#nomi}

Per distinguere i due enantiomeri si usano due sistemi. Il più antico, introdotto da Emil Fischer alla fine dell'Ottocento, confronta la molecola con la gliceraldeide, lo zucchero più semplice, e chiama **D** e **L** le forme che le corrispondono, dalle parole latine *dexter* e *laevus*. È ancora il sistema usato per gli amminoacidi e gli zuccheri: le proteine della vita terrestre sono costruite con **L-amminoacidi**, e gli acidi nucleici con **D-zuccheri**, il D-ribosio nell'RNA e il D-desossiribosio nel DNA.

Il sistema più generale, proposto da Cahn, Ingold e Prelog, ordina i quattro gruppi secondo una regola di priorità basata sui numeri atomici, guarda la molecola con il gruppo di priorità più bassa rivolto lontano dall'osservatore e chiama **R** la forma in cui gli altri tre gruppi si susseguono in senso orario e **S** quella in senso antiorario. Le due notazioni rispondono a domande diverse e la corrispondenza fra le due è irregolare: quasi tutti gli L-amminoacidi sono S, ma la L-cisteina, per una questione di priorità dovuta all'atomo di zolfo, è R.

## Proprietà degli enantiomeri {#proprieta}

Due enantiomeri hanno la stessa formula, gli stessi legami, le stesse distanze e gli stessi angoli fra gli atomi. Hanno quindi la stessa temperatura di fusione e di ebollizione, la stessa solubilità in acqua, la stessa energia di legame, lo stesso spettro infrarosso. Si distinguono soltanto quando interagiscono con qualcosa che è a sua volta chirale.

Le mani sono un buon esempio: una mano destra e una sinistra sono uguali per ogni misura fatta con un righello, e diverse solo quando devono entrare in un guanto o stringere un'altra mano. Le molecole biologiche sono guanti chirali: enzimi, recettori e canali sono fatti di L-amminoacidi e riconoscono un solo enantiomero di molte molecole. Il carvone ne è un esempio quotidiano. Una sua forma, l'R-carvone, ha l'odore della menta verde; la forma speculare, l'S-carvone, ha l'odore dei semi di cumino dei prati. I recettori del naso distinguono due molecole che nessuna misura di laboratorio achirale separerebbe.

La stessa cosa accade con i farmaci. Spesso uno solo dei due enantiomeri ha l'effetto desiderato, e l'altro è inattivo o ha effetti diversi. Per questo molti farmaci moderni si producono e si vendono in una sola forma, e l'industria chimica ha sviluppato catalizzatori chirali capaci di produrre selettivamente un enantiomero, un risultato premiato con il Nobel per la chimica nel 2001 e nel 2021.

## L'attività ottica {#attivita}

L'unica proprietà fisica semplice che distingue due enantiomeri è il loro effetto sulla luce polarizzata. La luce ordinaria vibra in tutte le direzioni perpendicolari al raggio; un filtro polarizzatore lascia passare solo la componente che vibra in un piano. Quando questa luce attraversa una soluzione di una sostanza chirale, il piano di vibrazione ruota di un angolo $\alpha$. Gli enantiomeri ruotano il piano di angoli uguali e opposti: verso destra, in senso orario per chi guarda verso la sorgente, la forma **destrogira**, indicata con $(+)$; verso sinistra la forma **levogira**, indicata con $(-)$. Il fenomeno, scoperto da Jean-Baptiste Biot nel 1815, si chiama **attività ottica**.

Lo strumento che misura la rotazione è il **polarimetro** (figura 2). La luce di una lampada attraversa un polarizzatore, poi un tubo pieno di soluzione, poi un secondo filtro, l'analizzatore, che si ruota fino a ottenere il massimo o il minimo della luce trasmessa. L'angolo di cui bisogna ruotarlo rispetto alla posizione senza campione è la rotazione $\alpha$.

::: figura polarimetro
{"w":640,"h":210,"items":[{"t":"circle","p":[50,120,22],"c":"accent"},{"t":"text","p":[50,162],"s":"lampada","c":"accent","size":11},{"t":"arrow","p":[75,120,600,120],"c":"ax","w":1.2,"head":8},{"t":"rect","p":[134,72,12,96],"c":"body","r":3},{"t":"poly","pts":[[134,72],[146,72],[146,168],[134,168]],"close":true,"c":"force2","w":1.6},{"t":"line","p":[140.0,90.0,140.0,150.0],"c":"force2","w":2.4},{"t":"text","p":[140,186],"s":"polarizzatore","c":"force2","size":11},{"t":"rect","p":[220,94,200,52],"c":"body","r":6},{"t":"poly","pts":[[220,94],[420,94],[420,146],[220,146]],"close":true,"c":"force3","w":1.6},{"t":"text","p":[320,124],"s":"soluzione chirale","c":"force3","size":12},{"t":"text","p":[320,186],"s":"lunghezza l, concentrazione c","c":"muted","size":11},{"t":"rect","p":[494,72,12,96],"c":"body","r":3},{"t":"poly","pts":[[494,72],[506,72],[506,168],[494,168]],"close":true,"c":"force2","w":1.6},{"t":"line","p":[487.3,92.8,512.7,147.2],"c":"force2","w":2.4},{"t":"text","p":[500,186],"s":"analizzatore","c":"force2","size":11},{"t":"line","p":[500,64,500,44],"c":"muted","w":1},{"t":"line","p":[500,120,516.9,83.7],"c":"force","w":1.6,"dash":true},{"t":"text","p":[530,60],"s":"α","c":"force","size":14},{"t":"text","p":[600,106],"s":"occhio","c":"ax","size":11,"a":"end"}]}
---
Schema di un polarimetro. Il polarizzatore seleziona un piano di vibrazione; la soluzione chirale lo ruota di un angolo $\alpha$; l'analizzatore, ruotato dello stesso angolo, lascia passare di nuovo la luce.
:::

La rotazione è proporzionale alla concentrazione $c$ della sostanza e alla lunghezza $l$ del percorso nella soluzione. Il coefficiente di proporzionalità è la **rotazione specifica**:

::: legge Rotazione specifica
$$[\alpha]=\frac{\alpha}{l\,c}$$
con $\alpha$ in gradi, $l$ in decimetri e $c$ in grammi per millilitro. Il valore dipende dalla lunghezza d'onda e dalla temperatura, e di solito si riferisce alla riga gialla del sodio a $20\,^\circ\mathrm C$.
:::

Il saccarosio, lo zucchero da tavola, ha $[\alpha]=+66{,}5^\circ$. Una soluzione con trenta grammi di zucchero in cento millilitri, $c=0{,}30\un{g/mL}$, in un tubo lungo un decimetro, ruota quindi il piano della luce di circa $20^\circ$. Il segno della rotazione è indipendente dalle lettere D e L: il D-glucosio è destrogiro, il D-fruttosio è levogiro, anche se entrambi appartengono alla serie D.

Una miscela in parti uguali dei due enantiomeri, chiamata **racemo** o miscela racemica, non ruota la luce, perché i contributi delle due forme si annullano. È la miscela che si ottiene di solito quando una molecola chirale si forma da reagenti achirali senza alcun catalizzatore chirale: le due forme hanno la stessa energia e si formano con la stessa probabilità.

## L'eccesso enantiomerico {#eccesso}

Per misurare quanto una miscela si allontana dal racemo si usa l'**eccesso enantiomerico**.

::: definizione Eccesso enantiomerico
$$ee=\frac{L-D}{L+D}$$
dove $L$ e $D$ sono le quantità dei due enantiomeri. Vale $0$ per un racemo, $1$, cioè il $100\%$, per una sostanza pura di forma L, $-1$ per una sostanza pura di forma D. Spesso si indica il valore assoluto e si specifica quale forma prevale.
:::

Una miscela con il $75\%$ di forma L e il $25\%$ di forma D ha $ee=(75-25)/100=50\%$. Si può pensarla come metà racemo e metà forma L pura: le molecole in eccesso sono quelle che non hanno un compagno speculare. La relazione inversa è altrettanto semplice: la frazione di forma L vale $(1+ee)/2$, quindi un eccesso del $30\%$ corrisponde al $65\%$ di forma L (figura 3).

::: figura eccesso
{"w":640,"h":290,"items":[{"t":"axes","o":[90,250],"x":[520,"frazione di forma L (%)"],"y":[230,"ee (%)"],"sx":3.6,"sy":1.1,"xt":[[0,"0"],[25,"25"],[50,"50"],[75,"75"],[100,"100"]],"yt":[[0,"−100"],[50,"−50"],[100,"0"],[150,"50"],[200,"100"]]},{"t":"plot","o":[90,250],"sx":3.6,"sy":1.1,"pts":[[0,0],[100,200]],"c":"force2","w":2.4},{"t":"line","p":[90.0,140.0,450.0,140.0],"c":"muted","w":0.8,"dash":true},{"t":"circle","p":[270.0,140.0,5],"c":"muted"},{"t":"text","p":[278.0,156.0],"s":"racemo","c":"muted","size":11,"a":"start"},{"t":"circle","p":[360.0,85.0,5],"c":"force"},{"t":"text","p":[350.0,79.0],"s":"75 % L: ee = 50 %","c":"force","size":11,"a":"end"},{"t":"circle","p":[450.0,30.0,5],"c":"force"},{"t":"text","p":[440.0,34.0],"s":"L pura","c":"force","size":11,"a":"end"},{"t":"circle","p":[90.0,250.0,5],"c":"force"},{"t":"text","p":[100.0,254.0],"s":"D pura","c":"force","size":11,"a":"start"}]}
---
Eccesso enantiomerico in funzione della frazione di forma L nella miscela. Il racemo, con il $50\%$ di ciascuna forma, ha eccesso nullo; la sostanza pura ha eccesso del $100\%$.
:::

Poiché la rotazione ottica è proporzionale all'eccesso, il rapporto fra la rotazione specifica di una miscela e quella dell'enantiomero puro dà l'eccesso enantiomerico, una quantità che i chimici chiamano anche purezza ottica. Una miscela di saccarosio con rotazione specifica $+13{,}3^\circ$ avrebbe un eccesso del $20\%$. Per piccoli eccessi, come quelli dei meteoriti, la polarimetria è troppo poco sensibile, e si separano gli enantiomeri con la cromatografia su fasi stazionarie chirali e si misurano con lo spettrometro di massa.

## L'omochiralità della vita {#omochiralita}

Le proteine di tutti gli organismi terrestri sono fatte di L-amminoacidi, e gli acidi nucleici di D-zuccheri. Questa scelta di una sola forma si chiama **omochiralità**. Esistono D-amminoacidi in natura, nelle pareti di alcuni batteri, in alcuni antibiotici e in certi veleni, ma sono prodotti da enzimi speciali e non entrano mai nelle proteine fabbricate dai ribosomi.

Perché la vita ha bisogno di una sola forma? Le ragioni sono strutturali. Una catena di L-amminoacidi si avvolge nell'elica alfa destrorsa, uno degli elementi costitutivi delle proteine; un D-amminoacido inserito nella catena introduce un difetto che la destabilizza, come un gradino rovesciato in una scala a chiocciola. La doppia elica del DNA si forma perché gli zuccheri di entrambi i filamenti hanno la stessa forma: un nucleotide L inserito in un filamento D non si appaia correttamente con il filamento complementare.

Il problema è ancora più serio per la copiatura dell'informazione. Nel 1984 Gerald Joyce e collaboratori studiarono la copiatura di un filamento di RNA fatto di D-nucleotidi, a partire da una miscela di nucleotidi attivati. In presenza dei soli D-nucleotidi la copiatura procedeva; aggiungendo gli L-nucleotidi in quantità uguale, si fermava quasi subito, perché un L-nucleotide incorporato all'estremità della catena in crescita impediva l'aggiunta di altri nucleotidi. Questo fenomeno, l'**inibizione incrociata degli enantiomeri**, significa che un sistema di replicazione basato sugli acidi nucleici difficilmente può nascere in una miscela racemica (figura 4). L'omochiralità sembra quindi una condizione necessaria per un mondo a RNA, il tema del capitolo [Il mondo a RNA](unit:biology-10).

::: figura inibizione
{"w":620,"h":230,"items":[{"t":"rect","p":[40,156,40,28],"c":"body","r":5},{"t":"poly","pts":[[40,156],[80,156],[80,184],[40,184]],"close":true,"c":"force2","w":1.6},{"t":"text","p":[60,175],"s":"D","c":"force2","size":12},{"t":"rect","p":[96,156,40,28],"c":"body","r":5},{"t":"poly","pts":[[96,156],[136,156],[136,184],[96,184]],"close":true,"c":"force2","w":1.6},{"t":"text","p":[116,175],"s":"D","c":"force2","size":12},{"t":"rect","p":[152,156,40,28],"c":"body","r":5},{"t":"poly","pts":[[152,156],[192,156],[192,184],[152,184]],"close":true,"c":"force2","w":1.6},{"t":"text","p":[172,175],"s":"D","c":"force2","size":12},{"t":"rect","p":[208,156,40,28],"c":"body","r":5},{"t":"poly","pts":[[208,156],[248,156],[248,184],[208,184]],"close":true,"c":"force2","w":1.6},{"t":"text","p":[228,175],"s":"D","c":"force2","size":12},{"t":"rect","p":[264,156,40,28],"c":"body","r":5},{"t":"poly","pts":[[264,156],[304,156],[304,184],[264,184]],"close":true,"c":"force2","w":1.6},{"t":"text","p":[284,175],"s":"D","c":"force2","size":12},{"t":"rect","p":[320,156,40,28],"c":"body","r":5},{"t":"poly","pts":[[320,156],[360,156],[360,184],[320,184]],"close":true,"c":"force2","w":1.6},{"t":"text","p":[340,175],"s":"D","c":"force2","size":12},{"t":"rect","p":[376,156,40,28],"c":"body","r":5},{"t":"poly","pts":[[376,156],[416,156],[416,184],[376,184]],"close":true,"c":"force2","w":1.6},{"t":"text","p":[396,175],"s":"D","c":"force2","size":12},{"t":"rect","p":[432,156,40,28],"c":"body","r":5},{"t":"poly","pts":[[432,156],[472,156],[472,184],[432,184]],"close":true,"c":"force2","w":1.6},{"t":"text","p":[452,175],"s":"D","c":"force2","size":12},{"t":"rect","p":[488,156,40,28],"c":"body","r":5},{"t":"poly","pts":[[488,156],[528,156],[528,184],[488,184]],"close":true,"c":"force2","w":1.6},{"t":"text","p":[508,175],"s":"D","c":"force2","size":12},{"t":"rect","p":[40,96,40,28],"c":"body","r":5},{"t":"poly","pts":[[40,96],[80,96],[80,124],[40,124]],"close":true,"c":"force3","w":1.6},{"t":"text","p":[60,115],"s":"D","c":"force3","size":12},{"t":"line","p":[60,124,60,156],"c":"muted","w":1,"dash":true},{"t":"rect","p":[96,96,40,28],"c":"body","r":5},{"t":"poly","pts":[[96,96],[136,96],[136,124],[96,124]],"close":true,"c":"force3","w":1.6},{"t":"text","p":[116,115],"s":"D","c":"force3","size":12},{"t":"line","p":[80,110,96,110],"c":"ax","w":2},{"t":"line","p":[116,124,116,156],"c":"muted","w":1,"dash":true},{"t":"rect","p":[152,96,40,28],"c":"body","r":5},{"t":"poly","pts":[[152,96],[192,96],[192,124],[152,124]],"close":true,"c":"force3","w":1.6},{"t":"text","p":[172,115],"s":"D","c":"force3","size":12},{"t":"line","p":[136,110,152,110],"c":"ax","w":2},{"t":"line","p":[172,124,172,156],"c":"muted","w":1,"dash":true},{"t":"rect","p":[208,96,40,28],"c":"body","r":5},{"t":"poly","pts":[[208,96],[248,96],[248,124],[208,124]],"close":true,"c":"force3","w":1.6},{"t":"text","p":[228,115],"s":"D","c":"force3","size":12},{"t":"line","p":[192,110,208,110],"c":"ax","w":2},{"t":"line","p":[228,124,228,156],"c":"muted","w":1,"dash":true},{"t":"rect","p":[264,96,40,28],"c":"body","r":5},{"t":"poly","pts":[[264,96],[304,96],[304,124],[264,124]],"close":true,"c":"force3","w":1.6},{"t":"text","p":[284,115],"s":"D","c":"force3","size":12},{"t":"line","p":[248,110,264,110],"c":"ax","w":2},{"t":"line","p":[284,124,284,156],"c":"muted","w":1,"dash":true},{"t":"rect","p":[320,96,40,28],"c":"body","r":5},{"t":"poly","pts":[[320,96],[360,96],[360,124],[320,124]],"close":true,"c":"force","w":1.6},{"t":"text","p":[340,115],"s":"L","c":"force","size":12},{"t":"line","p":[304,110,320,110],"c":"ax","w":2},{"t":"rect","p":[376,60,40,28],"c":"body","r":5},{"t":"poly","pts":[[376,60],[416,60],[416,88],[376,88]],"close":true,"c":"force3","w":1.6},{"t":"text","p":[396,79],"s":"D","c":"force3","size":12},{"t":"line","p":[378,56,414,100],"c":"force","w":2.4},{"t":"line","p":[414,56,378,100],"c":"force","w":2.4},{"t":"text","p":[172,74],"s":"catena nuova","c":"force3","size":11},{"t":"text","p":[284,210],"s":"stampo di D-nucleotidi","c":"force2","size":11},{"t":"text","p":[316,86],"s":"L incorporato","c":"force","size":11,"a":"end"},{"t":"text","p":[426,46],"s":"nessuna aggiunta","c":"force","size":11,"a":"start"}]}
---
Inibizione incrociata nella copiatura di un filamento di RNA. Sullo stampo di D-nucleotidi la catena nuova cresce aggiungendo D-nucleotidi; quando si aggiunge un L-nucleotide, la sua geometria impedisce l'aggiunta del nucleotide successivo e la copiatura si interrompe.
:::

### Una vita allo specchio {#specchio}

La scelta fra L e D sembra arbitraria. Una cellula fatta interamente di D-amminoacidi e di L-zuccheri sarebbe l'immagine speculare di una cellula terrestre, e per la simmetria delle leggi della chimica funzionerebbe esattamente nello stesso modo. Nel 1992 il gruppo di Stephen Kent sintetizzò chimicamente la proteasi del virus HIV fatta interamente di D-amminoacidi: l'enzima speculare era attivo e tagliava soltanto proteine speculari. Da allora sono stati costruiti enzimi speculari capaci di copiare il DNA speculare.

L'esistenza possibile di una vita speculare ha due conseguenze per l'astrobiologia. La prima è che, se la vita nascesse indipendentemente su un altro pianeta, potrebbe aver scelto le forme opposte alle nostre con la stessa probabilità. La seconda è che l'omochiralità, in un campione extraterrestre, sarebbe una biofirma potente, qualunque delle due forme prevalga, perché la chimica senza vita tende a produrre miscele racemiche o con eccessi piccoli.

::: nota Un avvertimento sui batteri speculari
Nel dicembre 2024 un gruppo di trentotto scienziati, fra cui biologi sintetici, immunologi ed ecologi, ha pubblicato un appello a non costruire batteri speculari. Organismi di questo tipo potrebbero sfuggire alle difese immunitarie di animali e piante, che riconoscono le molecole dei microbi attraverso la loro forma, e ai predatori naturali dei batteri. La tecnologia per costruirli manca ancora; gli autori hanno chiesto di discuterne i rischi prima che diventi possibile.
:::

## Da dove viene la prima asimmetria {#origine}

Se la chimica senza vita produce racemi, la vita deve aver trovato da qualche parte una prima asimmetria e averla amplificata. Le ipotesi sulla prima asimmetria si possono raggruppare in quattro famiglie (figura 5).

::: figura origini
{"w":680,"h":275,"items":[{"t":"rect","p":[20,18.0,190,44],"c":"body","r":6},{"t":"poly","pts":[[20,18.0],[210,18.0],[210,62.0],[20,62.0]],"close":true,"c":"force2","w":1.6},{"t":"text","p":[115.0,37],"s":"caso","c":"force2","size":12},{"t":"text","p":[115.0,53],"s":"fluttuazioni statistiche","c":"muted","size":9},{"t":"arrow","p":[210,40,300,150],"c":"ax","w":1.6,"head":8},{"t":"rect","p":[20,76.0,190,44],"c":"body","r":6},{"t":"poly","pts":[[20,76.0],[210,76.0],[210,120.0],[20,120.0]],"close":true,"c":"force2","w":1.6},{"t":"text","p":[115.0,95],"s":"luce circolare","c":"force2","size":12},{"t":"text","p":[115.0,111],"s":"nubi di formazione stellare","c":"muted","size":9},{"t":"arrow","p":[210,98,300,150],"c":"ax","w":1.6,"head":8},{"t":"rect","p":[20,134.0,190,44],"c":"body","r":6},{"t":"poly","pts":[[20,134.0],[210,134.0],[210,178.0],[20,178.0]],"close":true,"c":"force2","w":1.6},{"t":"text","p":[115.0,153],"s":"minerali","c":"force2","size":12},{"t":"text","p":[115.0,169],"s":"quarzo, calcite, magnetite","c":"muted","size":9},{"t":"arrow","p":[210,156,300,150],"c":"ax","w":1.6,"head":8},{"t":"rect","p":[20,192.0,190,44],"c":"body","r":6},{"t":"poly","pts":[[20,192.0],[210,192.0],[210,236.0],[20,236.0]],"close":true,"c":"force2","w":1.6},{"t":"text","p":[115.0,211],"s":"forza debole","c":"force2","size":12},{"t":"text","p":[115.0,227],"s":"effetto minimo","c":"muted","size":9},{"t":"arrow","p":[210,214,300,150],"c":"ax","w":1.6,"head":8},{"t":"rect","p":[300,128.0,150,44],"c":"body","r":6},{"t":"poly","pts":[[300,128.0],[450,128.0],[450,172.0],[300,172.0]],"close":true,"c":"force3","w":1.6},{"t":"text","p":[375.0,147],"s":"piccolo eccesso","c":"force3","size":12},{"t":"text","p":[375.0,163],"s":"da 10⁻¹⁷ a qualche %","c":"muted","size":9},{"t":"arrow","p":[450,150,490,150],"c":"ax","w":2,"head":9},{"t":"rect","p":[490,128.0,150,44],"c":"body","r":6},{"t":"poly","pts":[[490,128.0],[640,128.0],[640,172.0],[490,172.0]],"close":true,"c":"force","w":1.6},{"t":"text","p":[565.0,147],"s":"amplificazione","c":"force","size":12},{"t":"text","p":[565.0,163],"s":"autocatalisi, cristalli","c":"muted","size":9},{"t":"arrow","p":[565,172,565,222],"c":"ax","w":2,"head":9},{"t":"rect","p":[470,218.0,190,44],"c":"body","r":6},{"t":"poly","pts":[[470,218.0],[660,218.0],[660,262.0],[470,262.0]],"close":true,"c":"force4","w":1.6},{"t":"text","p":[565.0,237],"s":"omochiralità","c":"force4","size":12},{"t":"text","p":[565.0,253],"s":"conservata dalla copiatura","c":"muted","size":9}]}
---
Le principali ipotesi sull'origine dell'omochiralità. Una sorgente di asimmetria, casuale o fisica, produce un piccolo eccesso; un meccanismo di amplificazione lo trasforma in una preferenza quasi totale, che la vita conserva copiando se stessa.
:::

La prima è il **caso**. In un campione piccolo le due forme sono sempre presenti in quantità un poco diverse: se si lanciano $N$ monete, lo scarto tipico fra teste e croci è dell'ordine di $\sqrt N$. In una miscela di un milione di molecole lo scarto casuale tipico è dunque di circa mille molecole, un eccesso dello $0{,}1\%$. Un meccanismo di amplificazione abbastanza potente può trasformare una fluttuazione di questo tipo in una preferenza totale, e in questo caso la scelta fra L e D sarebbe stata un incidente storico, come quella fra guidare a destra o a sinistra.

La seconda è la **luce polarizzata circolarmente**. Nella luce polarizzata circolarmente il campo elettrico ruota mentre l'onda avanza, in senso orario o antiorario, ed è quindi chirale. Una luce di questo tipo distrugge un enantiomero un poco più in fretta dell'altro, e in laboratorio, irraggiando miscele racemiche di amminoacidi o ghiacci interstellari simulati, produce eccessi di qualche per cento al massimo. Nel 1998 osservazioni nell'infrarosso della nebulosa di Orione hanno misurato una polarizzazione circolare fino al $17\%$, prodotta dalla diffusione della luce stellare sui grani di polvere allineati dal campo magnetico. Se il sistema solare si è formato in una regione simile, la sua materia organica potrebbe aver ricevuto un piccolo eccesso prima ancora della formazione dei pianeti.

La terza sono le **superfici chirali dei minerali**. Alcuni cristalli hanno facce chirali: il quarzo esiste in forme destrorse e sinistrorse, e certe facce della calcite adsorbono un enantiomero dell'acido aspartico più dell'altro. In una regione abbastanza piccola, dove prevale un solo tipo di cristallo o di faccia, una superficie minerale potrebbe selezionare una forma. Nel 2023 un gruppo di Harvard ha mostrato che la magnetite, un ossido di ferro magnetico comune nei sedimenti, può far cristallizzare in forma pura un precursore dei nucleotidi grazie all'interazione fra la chiralità delle molecole e lo spin degli elettroni della superficie magnetizzata.

La quarta è la **forza nucleare debole**, l'unica interazione fondamentale che distingue la destra dalla sinistra. Essa introduce una differenza di energia fra due enantiomeri, ma piccolissima: a temperatura ambiente l'eccesso all'equilibrio sarebbe dell'ordine di una parte su $10^{17}$. Un effetto così piccolo potrebbe contare solo con un'amplificazione straordinaria, e molti ricercatori lo considerano trascurabile.

## Gli eccessi nei meteoriti {#meteoriti}

Nel 1997 John Cronin e Sandra Pizzarello misurarono negli amminoacidi del meteorite di Murchison eccessi della forma L di qualche per cento. Lo fecero scegliendo con cura le molecole da analizzare: gli **α-metil amminoacidi**, come l'isovalina, che hanno un gruppo metilico al posto dell'idrogeno sul carbonio centrale. Queste molecole non sono usate dalla vita terrestre, e quindi non possono venire da una contaminazione; inoltre non si racemizzano facilmente in acqua, perché manca l'idrogeno che dovrebbe staccarsi per invertire la forma.

Nel 2009 Daniel Glavin e Jason Dworkin misurarono per l'isovalina eccessi L del $18{,}5\%$ in Murchison e del $15{,}2\%$ in Orgueil, una condrite di un'altra classe, mentre nelle condriti più primitive, quelle meno alterate dall'acqua, non trovarono alcun eccesso. Ne conclusero che l'eccesso era cresciuto durante la lunga fase in cui l'acqua liquida circolava nei corpi di origine dei meteoriti, a partire da una piccola asimmetria iniziale. Eccessi L sono stati trovati anche in amminoacidi delle proteine, come l'acido aspartico, nel meteorite del lago Tagish, con composizioni isotopiche che escludono la contaminazione. Altri studi hanno trovato eccessi della forma D negli acidi derivati dagli zuccheri: la stessa preferenza della vita terrestre, L per gli amminoacidi e D per gli zuccheri.

I campioni dell'asteroide Bennu, analizzati nel 2025, hanno complicato il quadro: i loro amminoacidi chirali non legati ad altre molecole sono racemici o quasi, entro le incertezze delle misure. Gli autori ne hanno dedotto che la preferenza della vita terrestre potrebbe non dipendere da un'asimmetria portata dagli asteroidi. I dati, nel loro insieme, mostrano che piccoli eccessi si formano nel sistema solare senza la vita e possono crescere in acqua, ma non dicono ancora se siano stati loro a decidere la scelta della vita.

::: errore Un eccesso non è una biofirma
Un eccesso di qualche decina per cento in un singolo amminoacido non biologico, come l'isovalina dei meteoriti, si forma senza la vita. Una biofirma chirale convincente richiederebbe un eccesso vicino al cento per cento in molte molecole diverse, coerente fra le classi di molecole, come nella materia organica prodotta dagli organismi.
:::

## Amplificare un piccolo eccesso {#amplificazione}

Qualunque sia la sua origine, un eccesso iniziale di qualche per cento, o di una frazione di per cento, deve diventare quasi il cento per cento. Nel 1953 il fisico Frederick Charles Frank propose il primo modello di **amplificazione**: una molecola chirale che catalizza la propria formazione, l'**autocatalisi**, e che inoltre inibisce la formazione dell'enantiomero opposto. In un sistema di questo tipo la forma che parte in leggero vantaggio cresce più in fretta, consuma i reagenti e frena la forma rivale, fino a dominare.

Per più di quarant'anni il modello di Frank rimase un esercizio teorico. Nel 1995 il chimico giapponese Kenso Soai scoprì una reazione che lo realizza: un alcol chirale con un anello pirimidinico catalizza l'aggiunta di un gruppo isopropilico a un'aldeide, formando altre molecole di se stesso con la stessa chiralità, mentre gli enantiomeri opposti si legano fra loro in coppie inattive. Ripetendo la reazione in cicli successivi, una variante sviluppata negli anni seguenti porta un eccesso iniziale dello $0{,}6\%$ a più del $99{,}5\%$. La reazione di Soai usa reagenti a base di zinco incompatibili con l'acqua, e per questo è estranea alla chimica prebiotica; dimostra però che l'amplificazione di Frank è chimicamente possibile.

Altri meccanismi usano i cristalli. Nel 2005 Cristobal Viedma mostrò che macinando continuamente una sospensione di cristalli di clorato di sodio, che esistono in forme destrorse e sinistrorse, la miscela diventa tutta di una forma: i cristalli piccoli si sciolgono e il materiale si ridepone sui cristalli grandi, e una forma vince. Effetti simili si ottengono con amminoacidi che si racemizzano in soluzione. Per alcuni amminoacidi, come la serina, la soluzione in equilibrio con i cristalli può avere un eccesso molto più alto della miscela di partenza, perché il racemo cristallizza più facilmente dei singoli enantiomeri.

### Il modello del laboratorio {#modello}

Il modello interattivo di questa unità rappresenta l'amplificazione in modo schematico. Si supponga che, a ogni ciclo di reazione, la grandezza $ee/\sqrt{1-ee^2}$, che per piccoli eccessi coincide quasi con l'eccesso stesso, venga moltiplicata per un **guadagno** costante $g$. Dopo $n$ cicli l'eccesso vale

::: legge Amplificazione a guadagno costante
$$ee_n=\frac{ee_0\,g^n}{\sqrt{1+ee_0^2\,(g^{2n}-1)}}$$
Finché l'eccesso è piccolo cresce come $ee_0\,g^n$, cioè in modo esponenziale; quando si avvicina al $100\%$ la crescita rallenta, e l'eccesso tende a $100\%$ senza superarlo.
:::

Nel laboratorio si sceglie l'eccesso iniziale $ee_0$, da $0{,}1$ al $10\%$, e il guadagno $g$, da $1$ a $5$; il grafico mostra l'eccesso dopo ciascuno dei primi dieci cicli (figura 6).

::: figura amplificazione
{"w":600,"h":290,"items":[{"t":"axes","o":[80,260],"x":[500,"ciclo n"],"y":[230,"ee (%)"],"sx":1,"sy":2.2,"xt":[],"yt":[[0,"0"],[25,"25"],[50,"50"],[75,"75"],[100,"100"]]},{"t":"rect","p":[100,257.8,32,2.2],"c":"force2","r":3},{"t":"text","p":[116,251.8],"s":"1,0","c":"force2","size":10},{"t":"text","p":[116,278.0],"s":"0","c":"muted","size":11},{"t":"rect","p":[150,253.4,32,6.6],"c":"force2","r":3},{"t":"text","p":[166,247.4],"s":"3,0","c":"force2","size":10},{"t":"text","p":[166,278.0],"s":"1","c":"muted","size":11},{"t":"rect","p":[200,240.3,32,19.7],"c":"force2","r":3},{"t":"text","p":[216,234.3],"s":"9,0","c":"force2","size":10},{"t":"text","p":[216,278.0],"s":"2","c":"muted","size":11},{"t":"rect","p":[250,202.7,32,57.3],"c":"force2","r":3},{"t":"text","p":[266,196.7],"s":"26,1","c":"force2","size":10},{"t":"text","p":[266,278.0],"s":"3","c":"muted","size":11},{"t":"rect","p":[300,121.5,32,138.5],"c":"force2","r":3},{"t":"text","p":[316,115.5],"s":"62,9","c":"force2","size":10},{"t":"text","p":[316,278.0],"s":"4","c":"muted","size":11},{"t":"rect","p":[350,56.6,32,203.4],"c":"force2","r":3},{"t":"text","p":[366,50.6],"s":"92,5","c":"force2","size":10},{"t":"text","p":[366,278.0],"s":"5","c":"muted","size":11},{"t":"rect","p":[400,42.0,32,218.0],"c":"force2","r":3},{"t":"text","p":[416,36.0],"s":"99,1","c":"force2","size":10},{"t":"text","p":[416,278.0],"s":"6","c":"muted","size":11},{"t":"rect","p":[450,40.2,32,219.8],"c":"force2","r":3},{"t":"text","p":[466,34.2],"s":"99,9","c":"force2","size":10},{"t":"text","p":[466,278.0],"s":"7","c":"muted","size":11},{"t":"rect","p":[500,40.0,32,220.0],"c":"force2","r":3},{"t":"text","p":[516,34.0],"s":"100,0","c":"force2","size":10},{"t":"text","p":[516,278.0],"s":"8","c":"muted","size":11}]}
---
Eccesso enantiomerico dopo ciascun ciclo secondo il modello a guadagno costante, con eccesso iniziale dell'$1\%$ e guadagno $g=3$. Nei primi cicli l'eccesso triplica a ogni passo; dopo cinque cicli supera il $90\%$.
:::

::: esempio Dall'1 al 99 per cento
Con $ee_0=1\%$ e $g=3$, dopo tre cicli $ee_0g^3=0{,}27$ e

$$ee_3=\frac{0{,}27}{\sqrt{1+10^{-4}\cdot728}}\simeq0{,}261,$$

cioè circa il $26\%$. Dopo cinque cicli l'eccesso vale circa il $92\%$, dopo sei circa il $99\%$. Con un guadagno più basso, $g=2$, dopo cinque cicli si arriva soltanto al $30\%$ circa, e servono otto cicli per superare il $90\%$.
:::

Il modello è schematico e privo di riferimento a una reazione specifica: il guadagno costante è un'idealizzazione, e nelle reazioni reali l'amplificazione dipende dalle concentrazioni, dalla temperatura e dalla velocità con cui i prodotti si racemizzano. Mostra però la logica comune a tutti i meccanismi di amplificazione: una retroazione positiva, in cui la forma in vantaggio aumenta il proprio vantaggio, trasforma differenze piccole in differenze grandi in pochi passaggi.

## Un'esperienza: un polarimetro casalingo {#esperienza}

Due filtri polarizzatori e una soluzione di zucchero bastano per vedere l'attività ottica.

::: metodo Lo zucchero che ruota la luce
**Materiale.** Due filtri polarizzatori, per esempio le lenti di un paio di occhiali per il cinema in tre dimensioni con lenti a polarizzazione lineare, oppure fogli di pellicola polarizzante; una torcia; un cilindro graduato o un tubo trasparente lungo circa $20\un{cm}$ con il fondo trasparente; zucchero da tavola; acqua; un goniometro; carta e nastro adesivo.

**Procedura.** Fissare un filtro sulla torcia e tenere il secondo davanti all'occhio; ruotare il secondo finché la luce si spegne quasi del tutto, e segnare sul goniometro questa posizione. Riempire il tubo d'acqua, interporlo e verificare che la posizione di buio non cambi. Sostituire l'acqua con una soluzione di trenta grammi di zucchero in cento millilitri d'acqua e ruotare di nuovo il secondo filtro fino al buio. Misurare l'angolo di cui lo si è dovuto ruotare e ripetere con una soluzione più diluita e con un tubo più corto.

**Analisi.** Calcolare la rotazione specifica dello zucchero con $[\alpha]=\alpha/(l\,c)$, con $l$ in decimetri e $c$ in grammi per millilitro, e confrontarla con il valore tabulato, $+66{,}5^\circ$. Verificare che l'angolo raddoppia raddoppiando la lunghezza del tubo o la concentrazione. Con la luce bianca della torcia il buio non è mai perfetto e compaiono colori, perché la rotazione dipende dalla lunghezza d'onda: spiegare perché un polarimetro di laboratorio usa la luce gialla del sodio.

**Sicurezza.** Esperienza senza rischi particolari. Non guardare mai il Sole attraverso i filtri.
:::

## Errori frequenti {#errori}

::: errore Confondere D e L con destrogiro e levogiro
Le lettere D e L indicano la relazione di una molecola con la gliceraldeide; i segni $(+)$ e $(-)$ indicano il verso in cui ruota la luce. Il D-fruttosio è levogiro.
:::

::: errore Pensare che due enantiomeri abbiano proprietà chimiche diverse
In un ambiente achirale due enantiomeri hanno le stesse proprietà fisiche e chimiche. Si comportano in modo diverso solo con la luce polarizzata e con altre molecole chirali, come gli enzimi e i recettori.
:::

::: errore Considerare chirali tutti gli amminoacidi
La glicina ha due atomi di idrogeno sul carbonio centrale ed è achirale. Gli altri diciannove amminoacidi delle proteine sono chirali.
:::

::: errore Leggere l'eccesso enantiomerico come la frazione della forma prevalente
Un eccesso del $50\%$ corrisponde al $75\%$ di una forma e al $25\%$ dell'altra. La frazione della forma prevalente è $(1+ee)/2$.
:::

::: errore Credere che l'omochiralità terrestre sia necessaria per ragioni chimiche
Una biochimica interamente speculare funzionerebbe allo stesso modo. Necessaria è l'omochiralità; la scelta fra L e D potrebbe essere stata casuale o legata a un'asimmetria fisica dell'ambiente.
:::

## Sintesi {#sintesi}

::: sintesi In breve
- Una molecola è chirale se non coincide con la propria immagine speculare. Il caso più comune è un carbonio legato a quattro gruppi diversi, detto centro stereogenico; le due forme speculari si chiamano enantiomeri.
- Gli enantiomeri hanno le stesse proprietà in un ambiente achirale e si distinguono con la luce polarizzata e con altre molecole chirali, come gli enzimi e i recettori.
- L'attività ottica si misura con il polarimetro; la rotazione specifica è $[\alpha]=\alpha/(l\,c)$. Un racemo, miscela in parti uguali dei due enantiomeri, non ruota la luce.
- L'eccesso enantiomerico è $ee=(L-D)/(L+D)$; la frazione della forma prevalente è $(1+ee)/2$.
- La vita terrestre è omochirale: L-amminoacidi nelle proteine, D-zuccheri negli acidi nucleici. L'omochiralità è necessaria per la struttura delle eliche e per la copiatura dell'informazione, che in una miscela racemica è bloccata dall'inibizione incrociata.
- La prima asimmetria potrebbe venire dal caso, dalla luce polarizzata circolarmente, dalle superfici dei minerali o, con un effetto minimo, dalla forza debole.
- Nei meteoriti si trovano eccessi L fino al $18{,}5\%$ nell'isovalina, cresciuti durante l'alterazione in acqua; i campioni di Bennu sono invece quasi racemici.
- Autocatalisi e inibizione dell'enantiomero opposto, come nel modello di Frank e nella reazione di Soai, o la cristallizzazione con racemizzazione, amplificano piccoli eccessi fino a quasi il $100\%$.
:::

## Glossario {#glossario}

- **Achirale**: oggetto o molecola che coincide con la propria immagine speculare.
- **Attività ottica**: rotazione del piano di polarizzazione della luce da parte di una sostanza chirale.
- **Autocatalisi**: processo in cui il prodotto di una reazione ne catalizza la formazione.
- **Centro stereogenico**: atomo, di solito un carbonio, legato a quattro gruppi diversi.
- **Chirale**: oggetto o molecola che non coincide con la propria immagine speculare.
- **Eccesso enantiomerico**: differenza fra le quantità dei due enantiomeri divisa per la loro somma.
- **Enantiomeri**: due molecole che sono l'una l'immagine speculare dell'altra.
- **Inibizione incrociata**: blocco della copiatura di un polimero chirale causato dall'inserimento di un monomero di forma opposta.
- **Luce polarizzata circolarmente**: luce in cui il campo elettrico ruota attorno alla direzione di propagazione, in senso orario o antiorario.
- **Omochiralità**: uso di una sola delle due forme speculari per ogni classe di molecole.
- **Polarimetro**: strumento che misura la rotazione del piano della luce polarizzata.
- **Racemo**: miscela in parti uguali dei due enantiomeri, otticamente inattiva.
- **Rotazione specifica**: rotazione prodotta da una soluzione di concentrazione unitaria in un tubo di lunghezza unitaria.

## Esercizi {#esercizi}

::: esercizio Chirale o no [base]
Quali di queste molecole sono chirali: glicina, $\mathrm{H_2N{-}CH_2{-}COOH}$; alanina, $\mathrm{H_2N{-}CH(CH_3){-}COOH}$; etanolo, $\mathrm{CH_3{-}CH_2{-}OH}$; 2-butanolo, $\mathrm{CH_3{-}CH(OH){-}CH_2{-}CH_3}$?
>>> soluzione
Sono chirali l'alanina e il 2-butanolo, che hanno un carbonio legato a quattro gruppi diversi. La glicina e l'etanolo sono privi di centri stereogenici, perché in entrambe ogni carbonio porta almeno due atomi di idrogeno.
:::

::: esercizio Un eccesso dalla composizione [base]
Una miscela contiene l'$80\%$ di L-alanina e il $20\%$ di D-alanina. Qual è l'eccesso enantiomerico?
>>> soluzione
$ee=(80-20)/100=0{,}60$, cioè il $60\%$ a favore della forma L.
:::

::: esercizio La composizione da un eccesso [base]
Un amminoacido ha un eccesso enantiomerico del $30\%$ a favore della forma L. Quale frazione delle molecole è L?
>>> soluzione
La frazione L è $(1+ee)/2=(1+0{,}30)/2=0{,}65$, cioè il $65\%$; il restante $35\%$ è D.
:::

::: esercizio Zucchero nel tubo [base]
Il saccarosio ha rotazione specifica $+66{,}5^\circ$. Di quanto ruota il piano della luce una soluzione di $30\un{g}$ di saccarosio in $100\un{mL}$, in un tubo lungo $10\un{cm}$?
>>> soluzione
Con $c=0{,}30\un{g/mL}$ e $l=1\un{dm}$: $\alpha=[\alpha]\,l\,c=66{,}5\cdot1\cdot0{,}30\simeq20^\circ$, in senso orario.
:::

::: esercizio Misurare una rotazione specifica [base]
Una soluzione di $0{,}05\un{g/mL}$ di una sostanza, in un tubo di $20\un{cm}$, ruota la luce di $-4{,}6^\circ$. Qual è la rotazione specifica? La sostanza è destrogira o levogira?
>>> soluzione
$[\alpha]=\alpha/(l\,c)=-4{,}6/(2\cdot0{,}05)=-46^\circ$. Il segno negativo indica una sostanza levogira.
:::

::: esercizio Lettere e segni [base]
Il D-glucosio ha rotazione specifica positiva e il D-fruttosio negativa. Che cosa indicano la lettera D e il segno della rotazione? Perché i due zuccheri, entrambi D, ruotano la luce in versi opposti?
>>> soluzione
La lettera D indica la relazione della struttura con quella della D-gliceraldeide; il segno indica il verso in cui ruota la luce polarizzata. Le due informazioni sono indipendenti: il verso della rotazione dipende da tutta la struttura della molecola e non si deduce dalla configurazione di un singolo centro.
:::

::: esercizio Purezza ottica [medio]
Un campione di saccarosio parzialmente sostituito dal suo enantiomero ha rotazione specifica $+13{,}3^\circ$. Qual è il suo eccesso enantiomerico? Quali sono le frazioni delle due forme?
>>> soluzione
L'eccesso è il rapporto fra la rotazione misurata e quella della forma pura: $13{,}3/66{,}5=0{,}20$. Le frazioni sono $(1+0{,}20)/2=60\%$ per la forma naturale e $40\%$ per la speculare.
:::

::: esercizio Lo zucchero invertito [medio]
L'idrolisi del saccarosio produce quantità uguali di glucosio e fruttosio. Con rotazioni specifiche $+52{,}7^\circ$ per il glucosio e $-92{,}4^\circ$ per il fruttosio, all'equilibrio, quale rotazione specifica ha la miscela, riferita alla massa totale dei due zuccheri? Perché la miscela si chiama zucchero invertito?
>>> soluzione
Con masse uguali dei due zuccheri la rotazione specifica è la media, $(52{,}7-92{,}4)/2\simeq-19{,}9^\circ$. Il saccarosio iniziale è destrogiro, la miscela finale levogira: l'idrolisi inverte il segno della rotazione.
:::

::: esercizio Eccessi per caso [medio]
In una miscela di $N$ molecole formate a caso, lo scarto tipico fra il numero di molecole L e D è circa $\sqrt N$. Stimare l'eccesso enantiomerico tipico per $N=10^4$ e per $N=10^{12}$.
>>> soluzione
L'eccesso è circa $\sqrt N/N=1/\sqrt N$. Per $N=10^4$ vale $10^{-2}$, cioè l'$1\%$; per $N=10^{12}$ vale $10^{-6}$, un decimillesimo di per cento. Le fluttuazioni casuali contano solo in sistemi molto piccoli, come una gocciolina o una protocellula.
:::

::: esercizio Quattro cicli di amplificazione [medio]
Con il modello del laboratorio, $ee_0=1\%$ e $g=3$, calcolare l'eccesso dopo quattro cicli.
>>> soluzione
$ee_0g^4=0{,}01\cdot81=0{,}81$ e $ee_0^2(g^8-1)=10^{-4}\cdot6560=0{,}656$. Quindi $ee_4=0{,}81/\sqrt{1{,}656}\simeq0{,}629$, circa il $63\%$.
:::

::: esercizio Un guadagno più basso [medio]
Ripetere il calcolo con $g=2$: quanto vale l'eccesso dopo cinque cicli? Dopo quanti cicli supera il $90\%$?
>>> soluzione
Dopo cinque cicli $ee_0g^5=0{,}32$ e $ee_5=0{,}32/\sqrt{1+10^{-4}\cdot1023}\simeq0{,}305$, circa il $30\%$. Dopo sette cicli l'eccesso vale circa il $79\%$, dopo otto circa il $93\%$: servono otto cicli.
:::

::: esercizio La luce di Orione [medio]
Un esperimento di laboratorio con luce polarizzata circolarmente produce nell'alanina un eccesso dell'$1{,}3\%$. Quali sono le frazioni delle due forme? Perché un eccesso così piccolo non basta da solo a spiegare l'omochiralità?
>>> soluzione
Le frazioni sono $(1\pm0{,}013)/2$, cioè $50{,}65\%$ e $49{,}35\%$. Una miscela così è quasi racemica: un polimero di cento unità costruito a caso conterrebbe in media circa quarantanove unità della forma minoritaria, e la copiatura sarebbe bloccata dall'inibizione incrociata. Serve un meccanismo di amplificazione.
:::

::: esercizio Quanti cicli servono [avanzato]
Nel modello la grandezza $y=ee/\sqrt{1-ee^2}$ viene moltiplicata per $g$ a ogni ciclo. Partendo da $ee_0=0{,}1\%$, quanti cicli servono per superare il $90\%$ con $g=2$ e con $g=4$?
>>> soluzione
Il valore finale richiesto è $y=0{,}9/\sqrt{1-0{,}81}\simeq2{,}065$; quello iniziale è $y_0\simeq0{,}001$. Serve $g^n\ge2065$, cioè $n\ge\ln2065/\ln g$. Con $g=2$: $n\ge11{,}01$, quindi dodici cicli. Con $g=4$: $n\ge5{,}5$, quindi sei cicli.
:::

::: esercizio Il significato della grandezza amplificata [avanzato]
Dimostrare che $ee/\sqrt{1-ee^2}=(L-D)/(2\sqrt{LD})$, e interpretare il risultato.
>>> soluzione
Con $ee=(L-D)/(L+D)$ si ha

$$\begin{aligned}1-ee^2&=\frac{(L+D)^2-(L-D)^2}{(L+D)^2}\\&=\frac{4LD}{(L+D)^2}.\end{aligned}$$

Quindi $\sqrt{1-ee^2}=2\sqrt{LD}/(L+D)$ e il rapporto vale $(L-D)/(2\sqrt{LD})$. La grandezza moltiplicata a ogni ciclo è la differenza fra le due forme misurata rispetto alla loro media geometrica: per piccoli eccessi coincide con l'eccesso, e diventa infinita quando la forma minoritaria scompare.
:::

::: esercizio Una proteina da una miscela [avanzato]
Una catena di cento amminoacidi si forma scegliendo a caso le unità da una miscela. Qual è la probabilità che siano tutte di forma L se la miscela è racemica, se ha un eccesso del $50\%$ e se ha un eccesso del $99\%$?
>>> soluzione
La probabilità che un'unità sia L è $(1+ee)/2$. Per una miscela racemica: $0{,}5^{100}\simeq7{,}9\times10^{-31}$. Con eccesso del $50\%$: $0{,}75^{100}\simeq3{,}2\times10^{-13}$. Con eccesso del $99\%$: $0{,}995^{100}\simeq0{,}61$. Solo con eccessi vicinissimi al cento per cento le catene omochirali diventano comuni.
:::

::: esercizio L'isovalina di Murchison [avanzato]
Nel meteorite di Murchison l'isovalina ha un eccesso L del $18{,}5\pm2{,}6\%$. Quale intervallo di frazioni della forma L corrisponde a questa misura? Perché si usano proprio gli α-metil amminoacidi per misurare gli eccessi nei meteoriti?
>>> soluzione
Le frazioni vanno da $(1+0{,}159)/2\simeq58\%$ a $(1+0{,}211)/2\simeq61\%$, con un valore centrale del $59\%$ circa. Gli α-metil amminoacidi non sono usati dagli organismi terrestri, quindi non possono provenire da una contaminazione; inoltre sono privi dell'idrogeno sul carbonio centrale, quindi si racemizzano con grande difficoltà e conservano l'eccesso formato miliardi di anni fa.
:::

## Fonti {#fonti}

Il testo, le figure, gli esempi e gli esercizi di questo capitolo sono originali. Per la scelta e l'ordine degli argomenti i riferimenti principali sono A. M. Shaw, *Astrochemistry: From Astronomy to Astrobiology*, Wiley, 2006, §1.3 (omochiralità come proprietà dei viventi) e §8.6 (omochiralità e sue possibili origini), e J. R. Morris, D. L. Hartl, A. H. Knoll e collaboratori, *Biology: How Life Works*, 2ª edizione, Macmillan, 2016, §2.5 (le molecole organiche e i loro isomeri) e §4.1 (gli amminoacidi e la struttura delle proteine). Dati ed esperimenti provengono dalle fonti primarie seguenti.

1. L. Pasteur, *Annales de chimie et de physique* 24, 442 (1848): separazione dei cristalli del tartrato.
2. G. F. Joyce e collaboratori, *Nature* 310, 602 (1984): inibizione incrociata nella copiatura di oligonucleotidi.
3. R. C. Milton, S. C. Milton, S. B. H. Kent, *Science* 256, 1445 (1992): sintesi della proteasi di HIV speculare; K. P. Adamala e collaboratori, *Science* 386, 1351 (2024): i rischi della vita speculare.
4. J. Bailey e collaboratori, *Science* 281, 672 (1998): polarizzazione circolare nella nebulosa di Orione; P. de Marcellus e collaboratori, *Astrophysical Journal Letters* 727, L27 (2011): eccessi enantiomerici dall'irraggiamento di ghiacci con luce polarizzata circolarmente.
5. R. M. Hazen, T. R. Filley, G. A. Goodfriend, *PNAS* 98, 5487 (2001): adsorbimento selettivo dell'acido aspartico sulle facce della calcite; S. F. Ozturk, Z. Liu, J. D. Sutherland, D. D. Sasselov, *Science Advances* 9, eadg8274 (2023): cristallizzazione omochirale di un precursore dell'RNA su magnetite.
6. D. K. Kondepudi, G. W. Nelson, *Nature* 314, 438 (1985): violazione della parità e omochiralità.
7. J. R. Cronin, S. Pizzarello, *Science* 275, 951 (1997): eccessi enantiomerici negli amminoacidi di Murchison; D. P. Glavin, J. P. Dworkin, *PNAS* 106, 5487 (2009): isovalina in Murchison e Orgueil; D. P. Glavin e collaboratori, *Meteoritics & Planetary Science* 47, 1347 (2012): eccessi L nel meteorite del lago Tagish; G. Cooper, A. C. Rios, *PNAS* 113, E3322 (2016): eccessi D negli acidi derivati dagli zuccheri.
8. D. P. Glavin e collaboratori, *Nature Astronomy* 9, 199 (2025): amminoacidi quasi racemici nei campioni di Bennu.
9. F. C. Frank, *Biochimica et Biophysica Acta* 11, 459 (1953): modello di amplificazione per autocatalisi; K. Soai, T. Shibata, H. Morioka, K. Choji, *Nature* 378, 767 (1995): autocatalisi asimmetrica con amplificazione; K. Soai, I. Sato, T. Shibata, *Chemical Record* 1, 321 (2001): amplificazione da $0{,}6\%$ a più del $99{,}5\%$.
10. C. Viedma, *Physical Review Letters* 94, 065504 (2005): deracemizzazione per macinazione di cristalli; M. Klussmann e collaboratori, *Nature* 441, 621 (2006): amplificazione termodinamica negli equilibri di solubilità degli amminoacidi.
11. Rotazioni specifiche di saccarosio, glucosio e fruttosio: W. M. Haynes (a cura di), *CRC Handbook of Chemistry and Physics*, 97ª edizione, CRC Press, 2016.
