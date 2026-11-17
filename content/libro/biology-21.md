---
unit: biology-21
titolo: Crescita delle popolazioni microbiche
sottotitolo: Dalla crescita esponenziale al modello logistico, dalle colture di laboratorio ai batteri del permafrost e alle prove in condizioni marziane simulate
volume: Volume di biologia
fonte: Testo originale; riferimenti principali A. M. Shaw, Astrochemistry, §9.4-9.5; J. R. Morris et al., Biology: How Life Works, 2ª ed., §46.1-46.2
---

## Prima di cominciare {#apertura}

In un brodo nutriente a $37$ °C una cellula di *Escherichia coli* si divide in due circa ogni venti minuti. Dopo un'ora le cellule sono otto, dopo dieci ore circa un miliardo. Se la divisione continuasse allo stesso ritmo per un giorno intero, le generazioni sarebbero $72$ e le cellule $2^{72}\approx4{,}7\cdot10^{21}$: con una massa di circa un picogrammo ciascuna, quasi cinquemila tonnellate di batteri. In due giorni la massa supererebbe di migliaia di volte quella della Terra.

Nessuna coltura fa nulla del genere. Il nutrimento finisce, i prodotti di rifiuto si accumulano, lo spazio si esaurisce, e la crescita rallenta fino a fermarsi. Il conto mostra però una proprietà fondamentale della vita: una popolazione che si riproduce cresce in proporzione a se stessa, e quindi in modo esponenziale, finché l'ambiente lo permette. Capire come una popolazione cresce, e che cosa la ferma, è uno strumento della biologia di tutti i giorni, dalla conservazione degli alimenti alla medicina.

Per l'astrobiologia la crescita è il criterio decisivo. Un organismo che sopravvive in un ambiente estremo, ma senza riprodursi, finisce per scomparire; un organismo che si moltiplica, anche lentissimamente, può colonizzarlo. Per questo le regole internazionali di protezione planetaria definiscono le regioni da proteggere su Marte in base alle condizioni in cui gli organismi terrestri potrebbero **replicarsi**. Questo capitolo descrive la crescita esponenziale e quella logistica, il modo di misurarle, il loro legame con il nutrimento e la temperatura, la vita lentissima del sottosuolo profondo e gli esperimenti che cercano di capire se un batterio terrestre potrebbe crescere su Marte.

::: obiettivi
- descrivere la crescita esponenziale e calcolare tempo di raddoppio e tasso di crescita;
- riconoscere le fasi di una coltura batterica e leggere un grafico semilogaritmico;
- usare il modello logistico, la capacità portante e il punto di massima crescita;
- collegare il tasso di crescita alla concentrazione di nutrimento con l'equazione di Monod;
- stimare l'effetto della temperatura sulla crescita, fino ai batteri che si dividono sotto lo zero;
- distinguere sopravvivenza e crescita, e discutere gli esperimenti in condizioni marziane simulate.
:::

Il capitolo usa gli esponenziali e i logaritmi del capitolo [Esponenziali e logaritmi](unit:math-c06), l'equazione di Michaelis e Menten del capitolo [Energia, enzimi e catalisi](unit:biology-08) e i limiti fisici della vita del capitolo [Estremofili](unit:biology-18).

## La crescita esponenziale {#esponenziale}

Batteri e archei si riproducono per **scissione binaria**: la cellula cresce, copia il cromosoma e si divide in due cellule figlie. Se ogni cellula si divide dopo lo stesso intervallo $g$, il **tempo di generazione** o **tempo di raddoppio**, dopo $n$ generazioni una singola cellula è diventata $2^n$ cellule. Partendo da $N_0$ cellule, dopo un tempo $t$ le generazioni sono $t/g$ e la popolazione vale

$$N(t)=N_0\,2^{t/g}.$$

Nelle colture reali le divisioni avvengono in momenti diversi per cellule diverse, e la popolazione cresce in modo continuo. Conviene allora scrivere la stessa legge con la funzione esponenziale.

::: legge Crescita esponenziale
Una popolazione che cresce con tasso specifico $r$ costante, cioè con velocità di crescita proporzionale alla sua dimensione, segue

$$\frac{\mathrm dN}{\mathrm dt}=rN,\qquad N(t)=N_0\,\mathrm e^{rt}.$$

Il tasso $r$ e il tempo di raddoppio $g$ sono legati da $r=\ln2/g\approx0{,}693/g$.
:::

Il tasso specifico $r$ si misura in inverso di un tempo: con $g=20$ minuti si ha $r=0{,}693/20\approx0{,}035$ al minuto, cioè circa $2{,}1$ all'ora. In ecologia lo stesso numero si chiama **tasso intrinseco di crescita**, il tasso con cui una popolazione crescerebbe se nessun fattore ambientale la limitasse.

La crescita esponenziale ha una proprietà che la distingue da qualunque crescita lineare: in intervalli di tempo uguali la popolazione si moltiplica per lo stesso fattore. Gli individui aggiunti in un'ora sono tanti più quanto più grande è la popolazione all'inizio dell'ora, perché anche i nuovi nati si riproducono. Una vecchia leggenda racconta di un chicco di grano sulla prima casella di una scacchiera, due sulla seconda, quattro sulla terza, e così via raddoppiando. Sulle $64$ caselle i chicchi sono in tutto $2^{64}-1\approx1{,}8\cdot10^{19}$, fra cinquanta e duecento milioni di volte il numero di stelle della Via Lattea, che si stima fra cento e quattrocento miliardi.

Per seguire una crescita esponenziale si usa un grafico con l'asse verticale **logaritmico**, in cui ogni tacca corrisponde a un fattore dieci. Prendendo il logaritmo decimale della legge di crescita si ottiene

$$\log_{10}N=\log_{10}N_0+\frac{\log_{10}2}{g}\,t,$$

una retta con pendenza $0{,}301/g$: una crescita esponenziale appare come una retta, e la sua pendenza dà il tempo di raddoppio (figura 1). Su un grafico lineare la stessa curva sembra piatta all'inizio ed esplosiva alla fine, e i primi istanti, quando la popolazione è piccola, diventano illeggibili.

::: figura esponenziale
{"w":830,"h":275,"items":[{"t":"axes","o":[60,240],"x":[330,"tempo, min"],"y":[220,"cellule"],"sx":1.1,"sy":0.19047619047619047,"xt":[[0,"0"],[50,"50"],[100,"100"],[150,"150"],[200,"200"]],"yt":[[0,"0"],[250,"250"],[500,"500"],[750,"750"],[1000,"1000"]]},{"t":"plot","o":[60,240],"sx":1.1,"sy":0.19047619047619047,"pts":[[0,1.0],[2,1.0717735],[4,1.1486984],[6,1.2311444],[8,1.3195079],[10,1.4142136],[12,1.5157166],[14,1.6245048],[16,1.7411011],[18,1.866066],[20,2.0],[22,2.1435469],[24,2.2973967],[26,2.4622888],[28,2.6390158],[30,2.8284271],[32,3.0314331],[34,3.2490096],[36,3.4822023],[38,3.732132],[40,4.0],[42,4.2870939],[44,4.5947934],[46,4.9245777],[48,5.2780316],[50,5.6568542],[52,6.0628663],[54,6.4980192],[56,6.9644045],[58,7.4642639],[60,8.0],[62,8.5741877],[64,9.1895868],[66,9.8491553],[68,10.5560633],[70,11.3137085],[72,12.1257325],[74,12.9960383],[76,13.928809],[78,14.9285279],[80,16.0],[82,17.1483754],[84,18.3791737],[86,19.6983106],[88,21.1121266],[90,22.627417],[92,24.2514651],[94,25.9920767],[96,27.857618],[98,29.8570557],[100,32.0],[102,34.2967508],[104,36.7583474],[106,39.3966212],[108,42.2242531],[110,45.254834],[112,48.5029301],[114,51.9841534],[116,55.7152361],[118,59.7141115],[120,64.0],[122,68.5935016],[124,73.5166947],[126,78.7932425],[128,84.4485063],[130,90.509668],[132,97.0058603],[134,103.9683067],[136,111.4304721],[138,119.4282229],[140,128.0],[142,137.1870032],[144,147.0333894],[146,157.5864849],[148,168.8970126],[150,181.019336],[152,194.0117205],[154,207.9366135],[156,222.8609442],[158,238.8564458],[160,256.0],[162,274.3740064],[164,294.0667789],[166,315.1729698],[168,337.7940252],[170,362.038672],[172,388.023441],[174,415.8732269],[176,445.7218884],[178,477.7128917],[180,512.0],[182,548.7480128],[184,588.1335578],[186,630.3459396],[188,675.5880503],[190,724.0773439],[192,776.0468821],[194,831.7464539],[196,891.4437768],[198,955.4257833],[200,1024.0]],"c":"force2","w":2.6},{"t":"text","p":[170.0,125.7],"s":"scala lineare","c":"muted","size":11},{"t":"axes","o":[480,240],"x":[330,"tempo, min"],"y":[220,"cellule, scala logaritmica"],"sx":1.1,"sy":64.51612903225806,"xt":[[0,"0"],[50,"50"],[100,"100"],[150,"150"],[200,"200"]],"yt":[[0,"1"],[1,"10"],[2,"100"],[3,"1000"]]},{"t":"plot","o":[480,240],"sx":1.1,"sy":64.51612903225806,"pts":[[0,0.0],[2,0.030103],[4,0.060206],[6,0.090309],[8,0.120412],[10,0.150515],[12,0.180618],[14,0.210721],[16,0.240824],[18,0.270927],[20,0.30103],[22,0.331133],[24,0.361236],[26,0.391339],[28,0.421442],[30,0.451545],[32,0.481648],[34,0.511751],[36,0.541854],[38,0.571957],[40,0.60206],[42,0.632163],[44,0.662266],[46,0.692369],[48,0.722472],[50,0.752575],[52,0.782678],[54,0.812781],[56,0.842884],[58,0.872987],[60,0.90309],[62,0.933193],[64,0.963296],[66,0.993399],[68,1.023502],[70,1.053605],[72,1.083708],[74,1.113811],[76,1.143914],[78,1.174017],[80,1.20412],[82,1.234223],[84,1.264326],[86,1.294429],[88,1.324532],[90,1.354635],[92,1.384738],[94,1.414841],[96,1.444944],[98,1.475047],[100,1.50515],[102,1.535253],[104,1.565356],[106,1.595459],[108,1.625562],[110,1.655665],[112,1.685768],[114,1.715871],[116,1.745974],[118,1.776077],[120,1.80618],[122,1.836283],[124,1.866386],[126,1.896489],[128,1.926592],[130,1.956695],[132,1.986798],[134,2.016901],[136,2.047004],[138,2.077107],[140,2.10721],[142,2.137313],[144,2.167416],[146,2.197519],[148,2.227622],[150,2.257725],[152,2.287828],[154,2.317931],[156,2.348034],[158,2.378137],[160,2.40824],[162,2.438343],[164,2.468446],[166,2.498549],[168,2.528652],[170,2.558755],[172,2.588858],[174,2.618961],[176,2.649064],[178,2.679167],[180,2.70927],[182,2.739373],[184,2.769476],[186,2.799579],[188,2.829682],[190,2.859785],[192,2.889888],[194,2.919991],[196,2.950094],[198,2.980197],[200,3.0103]],"c":"force2","w":2.6},{"t":"text","p":[612.0,72.3],"s":"scala logaritmica","c":"muted","size":11},{"t":"text","p":[644.0,118.1],"s":"pendenza 0,301/g","c":"force2","size":11,"a":"start"}]}
---
Una popolazione che raddoppia ogni $20$ minuti, partendo da una cellula, in scala lineare (a sinistra) e in scala logaritmica (a destra). Nella scala logaritmica la crescita esponenziale è una retta, con pendenza pari a $0{,}301$ diviso il tempo di raddoppio.
:::

::: esempio Dal grafico al tempo di raddoppio
In una coltura la densità passa da $10^3$ a $10^6$ cellule per millilitro in $5$ ore. Il fattore di crescita è $1000$, e il numero di raddoppi è $\log_2 1000=3/\log_{10}2\approx9{,}97$. Il tempo di raddoppio è

$$g=\frac{300\ \text{min}}{9{,}97}\approx30\ \text{min},$$

e il tasso specifico $r=0{,}693/0{,}50\ \text{h}\approx1{,}4$ all'ora.
:::

I tempi di raddoppio variano enormemente. In condizioni ottimali il batterio marino *Vibrio natriegens* si divide in meno di dieci minuti, *Escherichia coli* in circa venti, il lievito di birra in circa un'ora e mezza, il bacillo della tubercolosi in quasi un giorno. In natura i ritmi sono di solito molto più lenti, perché il nutrimento scarseggia: le stime per i microrganismi del suolo e degli oceani vanno da giorni a settimane, quelle per i sedimenti profondi da secoli a millenni, come si vedrà più avanti.

## Le fasi di una coltura {#fasi}

Se si inoculano poche cellule in un volume fisso di terreno nutritivo e si contano a intervalli regolari, senza aggiungere nulla e senza togliere nulla, si ottiene una **coltura discontinua**. Il suo andamento, rappresentato in scala logaritmica, mostra quasi sempre quattro fasi, descritte in modo sistematico da Jacques Monod nel 1949 (figura 2).

Nella **fase di latenza** il numero di cellule resta quasi costante. Le cellule, trasferite da un ambiente diverso, si adattano: sintetizzano gli enzimi necessari per il nuovo nutrimento, riparano i danni, accumulano le molecole che serviranno alla divisione. La durata della latenza dipende dalla storia delle cellule: è breve se provengono da una coltura in crescita nello stesso terreno, lunga se erano a digiuno, al freddo o danneggiate.

Nella **fase esponenziale** le cellule si dividono al ritmo massimo permesso da quel terreno e da quella temperatura, e il grafico semilogaritmico è una retta. È la fase in cui le cellule sono più uniformi e in cui si misurano tempo di raddoppio e tasso di crescita.

Nella **fase stazionaria** il numero di cellule smette di crescere. Il nutrimento limitante si è esaurito, oppure i prodotti del metabolismo, come gli acidi della fermentazione, hanno reso l'ambiente sfavorevole. Molti batteri entrano in uno stato di attesa: rallentano il metabolismo, rinforzano la parete, producono proteine di protezione; alcuni formano spore.

Nella **fase di morte** il numero di cellule vive diminuisce, spesso anch'esso in modo esponenziale, cioè lungo una retta discendente nel grafico logaritmico. La diminuzione è di solito più lenta della crescita, e una piccola frazione di cellule può sopravvivere per mesi o anni nutrendosi dei resti delle altre.

::: figura fasi
{"w":780,"h":285,"items":[{"t":"axes","o":[70,250],"x":[680,"tempo, ore"],"y":[225,"log₁₀ cellule vive per mL"],"sx":24,"sy":45,"xt":[[0,"0"],[4,"4"],[8,"8"],[12,"12"],[16,"16"],[20,"20"],[24,"24"]],"yt":[[0,"5"],[1,"6"],[2,"7"],[3,"8"],[4,"9"]]},{"t":"plot","o":[70,250],"sx":24,"sy":45,"pts":[[0.0,1.0],[0.1,1.0],[0.2,1.0],[0.3,1.0],[0.4,1.0],[0.5,1.0],[0.6,1.0],[0.7,1.0],[0.8,1.0],[0.9,1.0],[1.0,1.0],[1.1,1.0],[1.2,1.0],[1.3,1.0026471],[1.4,1.0079412],[1.5,1.0158824],[1.6,1.0264706],[1.7,1.0397059],[1.8,1.0555882],[1.9,1.0741176],[2.0,1.0952941],[2.1,1.1191176],[2.2,1.1455882],[2.3,1.1747059],[2.4,1.2064706],[2.5,1.2408824],[2.6,1.2779412],[2.7,1.3176471],[2.8,1.36],[2.9,1.405],[3.0,1.45],[3.1,1.495],[3.2,1.54],[3.3,1.585],[3.4,1.63],[3.5,1.675],[3.6,1.72],[3.7,1.765],[3.8,1.81],[3.9,1.855],[4.0,1.9],[4.1,1.945],[4.2,1.99],[4.3,2.035],[4.4,2.08],[4.5,2.125],[4.6,2.17],[4.7,2.215],[4.8,2.26],[4.9,2.305],[5.0,2.35],[5.1,2.395],[5.2,2.44],[5.3,2.485],[5.4,2.53],[5.5,2.575],[5.6,2.62],[5.7,2.665],[5.8,2.71],[5.9,2.755],[6.0,2.8],[6.1,2.845],[6.2,2.89],[6.3,2.935],[6.4,2.98],[6.5,3.025],[6.6,3.07],[6.7,3.115],[6.8,3.16],[6.9,3.205],[7.0,3.25],[7.1,3.295],[7.2,3.34],[7.3,3.3840323],[7.4,3.426937],[7.5,3.4685697],[7.6,3.5087993],[7.7,3.5475076],[7.8,3.5845874],[7.9,3.6199418],[8.0,3.653483],[8.1,3.6851318],[8.2,3.7148163],[8.3,3.7424715],[8.4,3.7680386],[8.5,3.7914645],[8.6,3.8127011],[8.7,3.8317047],[8.8,3.8484359],[8.9,3.8628591],[9.0,3.8759098],[9.1,3.8877185],[9.2,3.8984035],[9.3,3.9080717],[9.4,3.9168199],[9.5,3.9247355],[9.6,3.9318979],[9.7,3.9383786],[9.8,3.9442427],[9.9,3.9495487],[10.0,3.9543498],[10.1,3.958694],[10.2,3.9626248],[10.3,3.9661815],[10.4,3.9693997],[10.5,3.9723117],[10.6,3.9749466],[10.7,3.9773308],[10.8,3.979488],[10.9,3.98144],[11.0,3.9832062],[11.1,3.9848044],[11.2,3.9862504],[11.3,3.9875589],[11.4,3.9887428],[11.5,3.9898141],[11.6,3.9907834],[11.7,3.9916605],[11.8,3.9924541],[11.9,3.9931722],[12.0,3.9938219],[12.1,3.9944098],[12.2,3.9949418],[12.3,3.9954232],[12.4,3.9958587],[12.5,3.9962528],[12.6,3.9966094],[12.7,3.9969321],[12.8,3.997224],[12.9,3.9974882],[13.0,3.9977272],[13.1,3.9979435],[13.2,3.9981392],[13.3,3.9976062],[13.4,3.9963468],[13.5,3.9943628],[13.6,3.991656],[13.7,3.9882281],[13.8,3.9840804],[13.9,3.9792144],[14.0,3.9736312],[14.1,3.9673319],[14.2,3.9603174],[14.3,3.9525887],[14.4,3.9441464],[14.5,3.9349915],[14.6,3.9251244],[14.7,3.9145459],[14.8,3.9032564],[14.9,3.8912564],[15.0,3.8792564],[15.1,3.8672564],[15.2,3.8552564],[15.3,3.8432564],[15.4,3.8312564],[15.5,3.8192564],[15.6,3.8072564],[15.7,3.7952564],[15.8,3.7832564],[15.9,3.7712564],[16.0,3.7592564],[16.1,3.7472564],[16.2,3.7352564],[16.3,3.7232564],[16.4,3.7112564],[16.5,3.6992564],[16.6,3.6872564],[16.7,3.6752564],[16.8,3.6632564],[16.9,3.6512564],[17.0,3.6392564],[17.1,3.6272564],[17.2,3.6152564],[17.3,3.6032564],[17.4,3.5912564],[17.5,3.5792564],[17.6,3.5672564],[17.7,3.5552564],[17.8,3.5432564],[17.9,3.5312564],[18.0,3.5192564],[18.1,3.5072564],[18.2,3.4952564],[18.3,3.4832564],[18.4,3.4712564],[18.5,3.4592564],[18.6,3.4472564],[18.7,3.4352564],[18.8,3.4232564],[18.9,3.4112564],[19.0,3.3992564],[19.1,3.3872564],[19.2,3.3752564],[19.3,3.3632564],[19.4,3.3512564],[19.5,3.3392564],[19.6,3.3272564],[19.7,3.3152564],[19.8,3.3032564],[19.9,3.2912564],[20.0,3.2792564],[20.1,3.2672564],[20.2,3.2552564],[20.3,3.2432564],[20.4,3.2312564],[20.5,3.2192564],[20.6,3.2072564],[20.7,3.1952564],[20.8,3.1832564],[20.9,3.1712564],[21.0,3.1592564],[21.1,3.1472564],[21.2,3.1352564],[21.3,3.1232564],[21.4,3.1112564],[21.5,3.0992564],[21.6,3.0872564],[21.7,3.0752564],[21.8,3.0632564],[21.9,3.0512564],[22.0,3.0392564],[22.1,3.0272564],[22.2,3.0152564],[22.3,3.0032564],[22.4,2.9912564],[22.5,2.9792564],[22.6,2.9672564],[22.7,2.9552564],[22.8,2.9432564],[22.9,2.9312564],[23.0,2.9192564],[23.1,2.9072564],[23.2,2.8952564],[23.3,2.8839623],[23.4,2.873374],[23.5,2.8634917],[23.6,2.8543152],[23.7,2.8458446],[23.8,2.8380799],[23.9,2.8310211],[24.0,2.8246681]],"c":"force2","w":2.8},{"t":"line","p":[118,250,118,47.5],"c":"muted","w":1,"dash":true},{"t":"line","p":[262,250,262,47.5],"c":"muted","w":1,"dash":true},{"t":"line","p":[406,250,406,47.5],"c":"muted","w":1,"dash":true},{"t":"text","p":[94,238.8],"s":"latenza","c":"ax","size":11},{"t":"text","p":[190,238.8],"s":"esponenziale","c":"ax","size":11},{"t":"text","p":[334,238.8],"s":"stazionaria","c":"ax","size":11},{"t":"text","p":[526,238.8],"s":"morte","c":"ax","size":11}]}
---
Le quattro fasi di una coltura discontinua, con il logaritmo del numero di cellule vive per millilitro in funzione del tempo: latenza, crescita esponenziale, fase stazionaria e fase di morte. La pendenza della fase esponenziale dà il tempo di raddoppio.
:::

La forma della curva dipende dal terreno. Monod osservò che *E. coli*, coltivato con due zuccheri insieme, glucosio e lattosio, cresce in due tappe: prima consuma soltanto il glucosio, poi si ferma per un breve periodo, e infine riprende a crescere consumando il lattosio. Questa **diauxia** rivelava che le cellule producono gli enzimi per il lattosio solo quando servono; il suo studio portò Monod, François Jacob e André Lwoff a scoprire la regolazione dei geni, con il premio Nobel del 1965.

::: nota Cellule vive e cellule contate
Il grafico delle fasi rappresenta le cellule **vive**, capaci di dividersi. Una cellula morta può restare intatta a lungo e continuare a intorbidire il terreno, e un metodo di misura che conta tutte le cellule, vive e morte, mostra una fase di morte molto più lenta o assente. Per questo ogni curva di crescita va letta sapendo come è stata misurata.
:::

## Contare l'invisibile {#misure}

Una goccia di coltura densa contiene centinaia di milioni di cellule, e una goccia d'acqua di mare circa un milione. Per contarle i microbiologi usano metodi diversi, ciascuno con un proprio significato.

Il metodo più antico è il **conteggio su piastra**. Si diluisce il campione in passaggi successivi, di solito di dieci volte ciascuno, e si stende un volume noto di ciascuna diluizione su un terreno solido. Ogni cellula capace di dividersi forma in uno o due giorni una colonia visibile a occhio nudo. Contando le colonie su una piastra con qualche decina o centinaio di colonie, e moltiplicando per il fattore di diluizione, si risale alla concentrazione nel campione originale, espressa in **unità formanti colonia** per millilitro. Il nome ricorda che una colonia può nascere anche da un gruppetto di cellule unite.

::: esempio Una serie di diluizioni
Un campione viene diluito sei volte di seguito di un fattore dieci, fino a $10^{-6}$. Stendendo $0{,}1$ mL dell'ultima diluizione su una piastra crescono $150$ colonie. La concentrazione nel campione è

$$\frac{150}{0{,}1\ \text{mL}}\cdot10^6=1{,}5\cdot10^9\ \text{UFC/mL}.$$
:::

Il **conteggio al microscopio**, in una camera di volume noto o su un filtro dopo colorazione con un colorante fluorescente che si lega al DNA, conta invece tutte le cellule, vive o morte. La **torbidità**, misurata con uno spettrofotometro come assorbanza della luce a $600$ nm, è proporzionale alla biomassa finché la coltura è poco densa, ed è il metodo più rapido per seguire una curva di crescita. La **citometria a flusso** fa passare le cellule una alla volta davanti a un laser e le conta a migliaia al secondo.

Confrontare i metodi riserva una sorpresa. Nei campioni naturali di suolo, di acqua dolce o di mare, le cellule viste al microscopio sono di solito da cento a diecimila volte più numerose delle colonie che crescono sulle piastre. James Staley e Allan Konopka chiamarono questa differenza, nel 1985, la **grande anomalia del conteggio su piastra**. Molte cellule sono vive ma crescono troppo lentamente, oppure richiedono nutrienti, compagni o condizioni che il terreno di laboratorio non offre. Per questo la maggior parte delle specie microbiche è nota solo attraverso il suo DNA, come si è visto nel capitolo [L'albero universale e LUCA](unit:biology-15).

La lezione vale anche per l'esplorazione spaziale. Uno strumento che cerca la vita su un altro pianeta con un terreno di coltura, come gli esperimenti biologici delle sonde Viking del 1976, vede solo gli organismi che crescono in quel terreno e in quelle condizioni. L'assenza di colonie, da sola, dice poco sull'assenza di vita.

## Risorse limitate: il modello logistico {#logistica}

Nel 1798 Thomas Malthus osservò che una popolazione capace di crescere in modo esponenziale supera presto le risorse che la sostengono; Charles Darwin vide in questa sproporzione il motore della competizione e della selezione naturale. Il modo più semplice di descrivere una crescita che rallenta fu proposto nel 1838 dal matematico belga Pierre-François Verhulst. Il tasso di crescita per individuo diminuisce linearmente con la popolazione e si annulla quando questa raggiunge la **capacità portante** $K$, il numero massimo di individui che l'ambiente può sostenere.

::: legge Crescita logistica
Con tasso intrinseco $r$ e capacità portante $K$ la popolazione segue

$$\frac{\mathrm dN}{\mathrm dt}=rN\left(1-\frac NK\right),$$

e partendo da $N_0$ individui

$$N(t)=\frac{K}{1+(K/N_0-1)\,\mathrm e^{-rt}}.$$
:::

Il fattore $1-N/K$ è la frazione della capacità ancora disponibile. Quando la popolazione è piccola vale quasi uno, e la crescita è esponenziale con tasso $r$; quando la popolazione si avvicina a $K$ tende a zero, e la crescita si arresta. La curva risultante ha la forma di una S (figura 3).

La velocità di crescita $rN(1-N/K)$, come funzione di $N$, è una parabola che si annulla per $N=0$ e per $N=K$ e ha il massimo a metà, per $N=K/2$, dove vale $rK/4$. Il **punto di flesso** della curva a S cade quindi quando la popolazione ha raggiunto metà della capacità, all'istante

$$t^*=\frac{\ln(K/N_0-1)}{r}.$$

::: figura logistica
{"w":740,"h":285,"items":[{"t":"axes","o":[70,250],"x":[640,"tempo"],"y":[225,"popolazione N"],"sx":18,"sy":2.1,"xt":[[0,"0"],[5,"5"],[10,"10"],[15,"15"],[20,"20"],[25,"25"],[30,"30"]],"yt":[[0,"0"],[25,"25"],[50,"50"],[75,"75"],[100,"100"]]},{"t":"line","p":[70,40.0,610,40.0],"c":"muted","w":1.2,"dash":true},{"t":"text","p":[610,32.0],"s":"capacità portante K = 100","c":"muted","size":10,"a":"end"},{"t":"plot","o":[70,250],"sx":18,"sy":2.1,"pts":[[0.0,10.0],[0.2,10.1814455],[0.4,10.3658041],[0.6,10.5531087],[0.8,10.7433921],[1.0,10.936687],[1.2,11.1330259],[1.4,11.3324411],[1.6,11.5349645],[1.8,11.7406281],[2.0,11.9494632],[2.2,12.1615011],[2.4,12.3767726],[2.6,12.5953083],[2.8,12.8171382],[3.0,13.042292],[3.2,13.270799],[3.4,13.5026878],[3.6,13.7379868],[3.8,13.9767235],[4.0,14.2189251],[4.2,14.4646181],[4.4,14.7138283],[4.6,14.9665808],[4.8,15.2229001],[5.0,15.4828099],[5.2,15.746333],[5.4,16.0134916],[5.6,16.2843069],[5.8,16.5587991],[6.0,16.8369876],[6.2,17.1188909],[6.4,17.4045263],[6.6,17.6939102],[6.8,17.9870578],[7.0,18.2839833],[7.2,18.5846997],[7.4,18.8892186],[7.6,19.1975507],[7.8,19.5097051],[8.0,19.8256899],[8.2,20.1455115],[8.4,20.4691751],[8.6,20.7966846],[8.8,21.1280422],[9.0,21.4632487],[9.2,21.8023032],[9.4,22.1452036],[9.6,22.4919458],[9.8,22.8425242],[10.0,23.1969317],[10.2,23.5551592],[10.4,23.917196],[10.6,24.2830296],[10.8,24.6526459],[11.0,25.0260286],[11.2,25.4031599],[11.4,25.7840199],[11.6,26.1685868],[11.8,26.5568372],[12.0,26.9487452],[12.2,27.3442835],[12.4,27.7434225],[12.6,28.1461306],[12.8,28.5523743],[13.0,28.9621181],[13.2,29.3753245],[13.4,29.7919537],[13.6,30.2119642],[13.8,30.6353122],[14.0,31.0619522],[14.2,31.4918361],[14.4,31.9249144],[14.6,32.361135],[14.8,32.8004442],[15.0,33.2427862],[15.2,33.6881029],[15.4,34.1363347],[15.6,34.5874197],[15.8,35.0412941],[16.0,35.4978923],[16.2,35.9571468],[16.4,36.4189882],[16.6,36.8833452],[16.8,37.3501449],[17.0,37.8193125],[17.2,38.2907715],[17.4,38.7644437],[17.6,39.2402495],[17.8,39.7181075],[18.0,40.1979347],[18.2,40.6796469],[18.4,41.1631583],[18.6,41.6483818],[18.8,42.1352288],[19.0,42.6236098],[19.2,43.1134339],[19.4,43.6046091],[19.6,44.0970423],[19.8,44.5906396],[20.0,45.085306],[20.2,45.5809459],[20.4,46.0774625],[20.6,46.5747588],[20.8,47.0727369],[21.0,47.5712984],[21.2,48.0703445],[21.4,48.5697758],[21.6,49.069493],[21.8,49.5693962],[22.0,50.0693855],[22.2,50.569361],[22.4,51.0692225],[22.6,51.5688704],[22.8,52.0682048],[23.0,52.5671263],[23.2,53.0655358],[23.4,53.5633345],[23.6,54.0604242],[23.8,54.5567072],[24.0,55.0520865],[24.2,55.5464658],[24.4,56.0397495],[24.6,56.5318429],[24.8,57.0226524],[25.0,57.5120851],[25.2,58.0000495],[25.4,58.4864548],[25.6,58.9712119],[25.8,59.4542326],[26.0,59.9354302],[26.2,60.4147193],[26.4,60.8920159],[26.6,61.3672377],[26.8,61.8403036],[27.0,62.3111344],[27.2,62.7796524],[27.4,63.2457815],[27.6,63.7094476],[27.8,64.1705781],[28.0,64.6291022],[28.2,65.0849512],[28.4,65.5380579],[28.6,65.9883573],[28.8,66.4357861],[29.0,66.8802832],[29.2,67.3217891],[29.4,67.7602466],[29.6,68.1956005],[29.8,68.6277973],[30.0,69.0567858]],"c":"force","w":2.6},{"t":"plot","o":[70,250],"sx":18,"sy":2.1,"pts":[[0.0,10.0],[0.2,10.5531087],[0.4,11.1330259],[0.6,11.7406281],[0.8,12.3767726],[1.0,13.042292],[1.2,13.7379868],[1.4,14.4646181],[1.6,15.2229001],[1.8,16.0134916],[2.0,16.8369876],[2.2,17.6939102],[2.4,18.5846997],[2.6,19.5097051],[2.8,20.4691751],[3.0,21.4632487],[3.2,22.4919458],[3.4,23.5551592],[3.6,24.6526459],[3.8,25.7840199],[4.0,26.9487452],[4.2,28.1461306],[4.4,29.3753245],[4.6,30.6353122],[4.8,31.9249144],[5.0,33.2427862],[5.2,34.5874197],[5.4,35.9571468],[5.6,37.3501449],[5.8,38.7644437],[6.0,40.1979347],[6.2,41.6483818],[6.4,43.1134339],[6.6,44.5906396],[6.8,46.0774625],[7.0,47.5712984],[7.2,49.069493],[7.4,50.569361],[7.6,52.0682048],[7.8,53.5633345],[8.0,55.0520865],[8.2,56.5318429],[8.4,58.0000495],[8.6,59.4542326],[8.8,60.8920159],[9.0,62.3111344],[9.2,63.7094476],[9.4,65.0849512],[9.6,66.4357861],[9.8,67.7602466],[10.0,69.0567858],[10.2,70.3240193],[10.4,71.560728],[10.6,72.7658574],[10.8,73.9385171],[11.0,75.0779775],[11.2,76.1836658],[11.4,77.2551603],[11.6,78.2921844],[11.8,79.2945988],[12.0,80.2623937],[12.2,81.1956801],[12.4,82.0946812],[12.6,82.9597226],[12.8,83.7912236],[13.0,84.5896874],[13.2,85.3556922],[13.4,86.0898823],[13.6,86.7929592],[13.8,87.4656736],[14.0,88.1088172],[14.2,88.7232153],[14.4,89.3097201],[14.6,89.8692039],[14.8,90.4025533],[15.0,90.9106638],[15.2,91.3944344],[15.4,91.8547637],[15.6,92.2925457],[15.8,92.7086659],[16.0,93.1039988],[16.2,93.4794044],[16.4,93.8357268],[16.6,94.1737912],[16.8,94.4944031],[17.0,94.7983466],[17.2,95.0863829],[17.4,95.3592503],[17.6,95.617663],[17.8,95.8623108],[18.0,96.0938588],[18.2,96.3129476],[18.4,96.520193],[18.6,96.7161866],[18.8,96.9014956],[19.0,97.0766635],[19.2,97.2422105],[19.4,97.3986338],[19.6,97.5464086],[19.8,97.6859882],[20.0,97.8178051],[20.2,97.9422713],[20.4,98.059779],[20.6,98.1707018],[20.8,98.2753946],[21.0,98.374195],[21.2,98.4674234],[21.4,98.5553844],[21.6,98.6383668],[21.8,98.7166445],[22.0,98.7904773],[22.2,98.8601115],[22.4,98.9257804],[22.6,98.9877048],[22.8,99.0460939],[23.0,99.1011458],[23.2,99.1530476],[23.4,99.2019767],[23.6,99.2481005],[23.8,99.2915775],[24.0,99.3325575],[24.2,99.3711819],[24.4,99.4075845],[24.6,99.4418915],[24.8,99.4742224],[25.0,99.5046896],[25.2,99.5333996],[25.4,99.5604529],[25.6,99.5859441],[25.8,99.6099628],[26.0,99.6325934],[26.2,99.6539154],[26.4,99.6740041],[26.6,99.6929303],[26.8,99.710761],[27.0,99.727559],[27.2,99.7433841],[27.4,99.7582921],[27.6,99.772336],[27.8,99.7855657],[28.0,99.7980282],[28.2,99.8097677],[28.4,99.8208261],[28.6,99.8312428],[28.8,99.8410548],[29.0,99.8502972],[29.2,99.8590029],[29.4,99.8672031],[29.6,99.8749269],[29.8,99.882202],[30.0,99.8890544]],"c":"force2","w":2.6},{"t":"plot","o":[70,250],"sx":18,"sy":2.1,"pts":[[0.0,10.0],[0.2,11.1330259],[0.4,12.3767726],[0.6,13.7379868],[0.8,15.2229001],[1.0,16.8369876],[1.2,18.5846997],[1.4,20.4691751],[1.6,22.4919458],[1.8,24.6526459],[2.0,26.9487452],[2.2,29.3753245],[2.4,31.9249144],[2.6,34.5874197],[2.8,37.3501449],[3.0,40.1979347],[3.2,43.1134339],[3.4,46.0774625],[3.6,49.069493],[3.8,52.0682048],[4.0,55.0520865],[4.2,58.0000495],[4.4,60.8920159],[4.6,63.7094476],[4.8,66.4357861],[5.0,69.0567858],[5.2,71.560728],[5.4,73.9385171],[5.6,76.1836658],[5.8,78.2921844],[6.0,80.2623937],[6.2,82.0946812],[6.4,83.7912236],[6.6,85.3556922],[6.8,86.7929592],[7.0,88.1088172],[7.2,89.3097201],[7.4,90.4025533],[7.6,91.3944344],[7.8,92.2925457],[8.0,93.1039988],[8.2,93.8357268],[8.4,94.4944031],[8.6,95.0863829],[8.8,95.617663],[9.0,96.0938588],[9.2,96.520193],[9.4,96.9014956],[9.6,97.2422105],[9.8,97.5464086],[10.0,97.8178051],[10.2,98.059779],[10.4,98.2753946],[10.6,98.4674234],[10.8,98.6383668],[11.0,98.7904773],[11.2,98.9257804],[11.4,99.0460939],[11.6,99.1530476],[11.8,99.2481005],[12.0,99.3325575],[12.2,99.4075845],[12.4,99.4742224],[12.6,99.5333996],[12.8,99.5859441],[13.0,99.6325934],[13.2,99.6740041],[13.4,99.710761],[13.6,99.7433841],[13.8,99.772336],[14.0,99.7980282],[14.2,99.8208261],[14.4,99.8410548],[14.6,99.8590029],[14.8,99.8749269],[15.0,99.8890544],[15.2,99.9015877],[15.4,99.9127064],[15.6,99.9225699],[15.8,99.9313197],[16.0,99.9390813],[16.2,99.9459662],[16.4,99.9520734],[16.6,99.9574906],[16.8,99.9622957],[17.0,99.9665579],[17.2,99.9703384],[17.4,99.9736916],[17.6,99.9766659],[17.8,99.9793039],[18.0,99.9816438],[18.2,99.9837192],[18.4,99.9855599],[18.6,99.9871926],[18.8,99.9886407],[19.0,99.9899251],[19.2,99.9910642],[19.4,99.9920746],[19.6,99.9929708],[19.8,99.9937656],[20.0,99.9944705],[20.2,99.9950958],[20.4,99.9956503],[20.6,99.9961421],[20.8,99.9965784],[21.0,99.9969653],[21.2,99.9973084],[21.4,99.9976128],[21.6,99.9978827],[21.8,99.9981221],[22.0,99.9983345],[22.2,99.9985228],[22.4,99.9986899],[22.6,99.998838],[22.8,99.9989694],[23.0,99.9990859],[23.2,99.9991893],[23.4,99.999281],[23.6,99.9993623],[23.8,99.9994344],[24.0,99.9994984],[24.2,99.9995551],[24.4,99.9996054],[24.6,99.99965],[24.8,99.9996896],[25.0,99.9997247],[25.2,99.9997558],[25.4,99.9997834],[25.6,99.9998079],[25.8,99.9998296],[26.0,99.9998489],[26.2,99.999866],[26.4,99.9998811],[26.6,99.9998946],[26.8,99.9999065],[27.0,99.9999171],[27.2,99.9999265],[27.4,99.9999348],[27.6,99.9999421],[27.8,99.9999487],[28.0,99.9999545],[28.2,99.9999596],[28.4,99.9999642],[28.6,99.9999682],[28.8,99.9999718],[29.0,99.999975],[29.2,99.9999778],[29.4,99.9999804],[29.6,99.9999826],[29.8,99.9999845],[30.0,99.9999863]],"c":"force3","w":2.6},{"t":"text","p":[137.6,128.2],"s":"r = 0,6","c":"force3","size":11,"a":"end"},{"t":"text","p":[294,97.4],"s":"r = 0,3","c":"force2","size":11,"a":"start"},{"t":"text","p":[528,145.2],"s":"r = 0,1","c":"force","size":11,"a":"start"},{"t":"circle","p":[201.8,145.0,5],"c":"force2"},{"t":"text","p":[211.8,149.0],"s":"flesso, N = K/2","c":"ax","size":10,"a":"start"}]}
---
Crescita logistica con capacità portante $K=100$ e popolazione iniziale $N_0=10$, per tre valori del tasso intrinseco $r$, in unità di tempo arbitrarie. Il punto segna il flesso della curva con $r=0{,}3$, a metà della capacità, dove la crescita è più veloce.
:::

::: esempio Metà della capacità
Con $K=100$, $N_0=10$ e $r=0{,}3$ per unità di tempo, la popolazione raggiunge $50$ individui dopo $t^*=\ln9/0{,}3\approx7{,}3$ unità di tempo. In quel momento cresce di $0{,}3\cdot100/4=7{,}5$ individui per unità di tempo, la velocità massima. Dopo $15$ unità di tempo la popolazione è circa $91$.
:::

Il modello logistico descrive bene molte popolazioni di laboratorio. Negli anni Trenta il biologo russo Georgii Gause coltivò parameci e lieviti in volumi fissi di terreno e ottenne curve a S molto vicine a quella di Verhulst. Nelle colture batteriche discontinue la fase esponenziale seguita dalla fase stazionaria ha un andamento simile, anche se il meccanismo è diverso: la crescita si ferma perché il nutrimento finisce, e la capacità portante dipende dalla quantità iniziale di nutrimento.

Il modello ha però limiti evidenti. Suppone che ogni individuo risenta subito della densità, mentre spesso l'effetto arriva con ritardo; ignora l'età e le differenze fra individui; tratta $K$ come una costante, mentre l'ambiente cambia. Una versione a tempi discreti, in cui la popolazione di una generazione determina quella della successiva, mostra comportamenti sorprendenti: per tassi di crescita grandi la popolazione oscilla fra due, quattro, otto valori e infine in modo caotico, come mostrò Robert May nel 1976. Le iterazioni e la loro stabilità sono discusse nel capitolo [Iterazioni, stabilità e precisione numerica](unit:math-p08).

## Quanto nutrimento serve: l'equazione di Monod {#monod}

La capacità portante dice dove la crescita si ferma, e lascia aperta una domanda: quanto velocemente si dividono le cellule quando il nutrimento è scarso? Monod misurò il tasso di crescita di *E. coli* in terreni con concentrazioni diverse di uno zucchero, e trovò che cresce con la concentrazione fino a un valore massimo, con la stessa forma della curva di Michaelis e Menten per gli enzimi.

::: legge Equazione di Monod
Il tasso specifico di crescita $\mu$ dipende dalla concentrazione $S$ del nutrimento limitante secondo

$$\mu=\mu_\text{max}\,\frac{S}{K_s+S},$$

dove $\mu_\text{max}$ è il tasso massimo e $K_s$ la concentrazione a cui il tasso è metà del massimo.
:::

La somiglianza con la cinetica enzimatica del capitolo [Energia, enzimi e catalisi](unit:biology-08) ha una ragione precisa: spesso la crescita è limitata dalla velocità con cui un trasportatore di membrana o un enzima cattura il nutrimento. Un organismo con $K_s$ piccolo cresce bene anche in acque poverissime; gli **oligotrofi** dell'oceano aperto hanno affinità altissime per i nutrienti, e tassi massimi modesti. Insieme alla velocità conta il **rendimento** $Y$, la biomassa prodotta per unità di nutrimento consumato: in una coltura discontinua la biomassa finale vale circa $Y$ per la concentrazione iniziale del nutrimento, e fissa la capacità portante (figura 4).

::: figura monod
{"w":760,"h":280,"items":[{"t":"axes","o":[70,250],"x":[660,"nutrimento S, mg/L"],"y":[215,"tasso di crescita μ, 1/h"],"sx":16,"sy":250,"xt":[[0,"0"],[5,"5"],[10,"10"],[15,"15"],[20,"20"],[25,"25"],[30,"30"]],"yt":[[0,"0"],[0.2,"0,2"],[0.4,"0,4"],[0.6,"0,6"],[0.8,"0,8"]]},{"t":"line","p":[70,50.0,550,50.0],"c":"muted","w":1.2,"dash":true},{"t":"text","p":[550,42.0],"s":"μ massimo = 0,8","c":"muted","size":10,"a":"end"},{"t":"plot","o":[70,250],"sx":16,"sy":250,"pts":[[0.0,0.0],[0.1,0.0380952],[0.2,0.0727273],[0.3,0.1043478],[0.4,0.1333333],[0.5,0.16],[0.6,0.1846154],[0.7,0.2074074],[0.8,0.2285714],[0.9,0.2482759],[1.0,0.2666667],[1.1,0.283871],[1.2,0.3],[1.3,0.3151515],[1.4,0.3294118],[1.5,0.3428571],[1.6,0.3555556],[1.7,0.3675676],[1.8,0.3789474],[1.9,0.3897436],[2.0,0.4],[2.1,0.4097561],[2.2,0.4190476],[2.3,0.427907],[2.4,0.4363636],[2.5,0.4444444],[2.6,0.4521739],[2.7,0.4595745],[2.8,0.4666667],[2.9,0.4734694],[3.0,0.48],[3.1,0.4862745],[3.2,0.4923077],[3.3,0.4981132],[3.4,0.5037037],[3.5,0.5090909],[3.6,0.5142857],[3.7,0.5192982],[3.8,0.5241379],[3.9,0.5288136],[4.0,0.5333333],[4.1,0.5377049],[4.2,0.5419355],[4.3,0.5460317],[4.4,0.55],[4.5,0.5538462],[4.6,0.5575758],[4.7,0.561194],[4.8,0.5647059],[4.9,0.5681159],[5.0,0.5714286],[5.1,0.5746479],[5.2,0.5777778],[5.3,0.5808219],[5.4,0.5837838],[5.5,0.5866667],[5.6,0.5894737],[5.7,0.5922078],[5.8,0.5948718],[5.9,0.5974684],[6.0,0.6],[6.1,0.6024691],[6.2,0.604878],[6.3,0.6072289],[6.4,0.6095238],[6.5,0.6117647],[6.6,0.6139535],[6.7,0.616092],[6.8,0.6181818],[6.9,0.6202247],[7.0,0.6222222],[7.1,0.6241758],[7.2,0.626087],[7.3,0.627957],[7.4,0.6297872],[7.5,0.6315789],[7.6,0.6333333],[7.7,0.6350515],[7.8,0.6367347],[7.9,0.6383838],[8.0,0.64],[8.1,0.6415842],[8.2,0.6431373],[8.3,0.6446602],[8.4,0.6461538],[8.5,0.647619],[8.6,0.6490566],[8.7,0.6504673],[8.8,0.6518519],[8.9,0.653211],[9.0,0.6545455],[9.1,0.6558559],[9.2,0.6571429],[9.3,0.6584071],[9.4,0.6596491],[9.5,0.6608696],[9.6,0.662069],[9.7,0.6632479],[9.8,0.6644068],[9.9,0.6655462],[10.0,0.6666667],[10.1,0.6677686],[10.2,0.6688525],[10.3,0.6699187],[10.4,0.6709677],[10.5,0.672],[10.6,0.6730159],[10.7,0.6740157],[10.8,0.675],[10.9,0.675969],[11.0,0.6769231],[11.1,0.6778626],[11.2,0.6787879],[11.3,0.6796992],[11.4,0.680597],[11.5,0.6814815],[11.6,0.6823529],[11.7,0.6832117],[11.8,0.684058],[11.9,0.6848921],[12.0,0.6857143],[12.1,0.6865248],[12.2,0.6873239],[12.3,0.6881119],[12.4,0.6888889],[12.5,0.6896552],[12.6,0.690411],[12.7,0.6911565],[12.8,0.6918919],[12.9,0.6926174],[13.0,0.6933333],[13.1,0.6940397],[13.2,0.6947368],[13.3,0.6954248],[13.4,0.6961039],[13.5,0.6967742],[13.6,0.6974359],[13.7,0.6980892],[13.8,0.6987342],[13.9,0.6993711],[14.0,0.7],[14.1,0.7006211],[14.2,0.7012346],[14.3,0.7018405],[14.4,0.702439],[14.5,0.7030303],[14.6,0.7036145],[14.7,0.7041916],[14.8,0.7047619],[14.9,0.7053254],[15.0,0.7058824],[15.1,0.7064327],[15.2,0.7069767],[15.3,0.7075145],[15.4,0.708046],[15.5,0.7085714],[15.6,0.7090909],[15.7,0.7096045],[15.8,0.7101124],[15.9,0.7106145],[16.0,0.7111111],[16.1,0.7116022],[16.2,0.7120879],[16.3,0.7125683],[16.4,0.7130435],[16.5,0.7135135],[16.6,0.7139785],[16.7,0.7144385],[16.8,0.7148936],[16.9,0.7153439],[17.0,0.7157895],[17.1,0.7162304],[17.2,0.7166667],[17.3,0.7170984],[17.4,0.7175258],[17.5,0.7179487],[17.6,0.7183673],[17.7,0.7187817],[17.8,0.7191919],[17.9,0.719598],[18.0,0.72],[18.1,0.720398],[18.2,0.7207921],[18.3,0.7211823],[18.4,0.7215686],[18.5,0.7219512],[18.6,0.7223301],[18.7,0.7227053],[18.8,0.7230769],[18.9,0.723445],[19.0,0.7238095],[19.1,0.7241706],[19.2,0.7245283],[19.3,0.7248826],[19.4,0.7252336],[19.5,0.7255814],[19.6,0.7259259],[19.7,0.7262673],[19.8,0.7266055],[19.9,0.7269406],[20.0,0.7272727],[20.1,0.7276018],[20.2,0.7279279],[20.3,0.7282511],[20.4,0.7285714],[20.5,0.7288889],[20.6,0.7292035],[20.7,0.7295154],[20.8,0.7298246],[20.9,0.730131],[21.0,0.7304348],[21.1,0.7307359],[21.2,0.7310345],[21.3,0.7313305],[21.4,0.7316239],[21.5,0.7319149],[21.6,0.7322034],[21.7,0.7324895],[21.8,0.7327731],[21.9,0.7330544],[22.0,0.7333333],[22.1,0.73361],[22.2,0.7338843],[22.3,0.7341564],[22.4,0.7344262],[22.5,0.7346939],[22.6,0.7349593],[22.7,0.7352227],[22.8,0.7354839],[22.9,0.735743],[23.0,0.736],[23.1,0.736255],[23.2,0.7365079],[23.3,0.7367589],[23.4,0.7370079],[23.5,0.7372549],[23.6,0.7375],[23.7,0.7377432],[23.8,0.7379845],[23.9,0.7382239],[24.0,0.7384615],[24.1,0.7386973],[24.2,0.7389313],[24.3,0.7391635],[24.4,0.7393939],[24.5,0.7396226],[24.6,0.7398496],[24.7,0.7400749],[24.8,0.7402985],[24.9,0.7405204],[25.0,0.7407407],[25.1,0.7409594],[25.2,0.7411765],[25.3,0.7413919],[25.4,0.7416058],[25.5,0.7418182],[25.6,0.742029],[25.7,0.7422383],[25.8,0.742446],[25.9,0.7426523],[26.0,0.7428571],[26.1,0.7430605],[26.2,0.7432624],[26.3,0.7434629],[26.4,0.743662],[26.5,0.7438596],[26.6,0.7440559],[26.7,0.7442509],[26.8,0.7444444],[26.9,0.7446367],[27.0,0.7448276],[27.1,0.7450172],[27.2,0.7452055],[27.3,0.7453925],[27.4,0.7455782],[27.5,0.7457627],[27.6,0.7459459],[27.7,0.7461279],[27.8,0.7463087],[27.9,0.7464883],[28.0,0.7466667],[28.1,0.7468439],[28.2,0.7470199],[28.3,0.7471947],[28.4,0.7473684],[28.5,0.747541],[28.6,0.7477124],[28.7,0.7478827],[28.8,0.7480519],[28.9,0.7482201],[29.0,0.7483871],[29.1,0.7485531],[29.2,0.7487179],[29.3,0.7488818],[29.4,0.7490446],[29.5,0.7492063],[29.6,0.7493671],[29.7,0.7495268],[29.8,0.7496855],[29.9,0.7498433],[30.0,0.75]],"c":"force2","w":2.8},{"t":"line","p":[102,250,102,150.0],"c":"ax","w":1,"dash":true},{"t":"line","p":[70,150.0,102,150.0],"c":"ax","w":1,"dash":true},{"t":"circle","p":[102,150.0,5],"c":"force2"},{"t":"text","p":[112,168.0],"s":"S = Ks: metà del massimo","c":"ax","size":11,"a":"start"}]}
---
Equazione di Monod con $\mu_\text{max}=0{,}8$ all'ora e $K_s=2$ mg/L. A basse concentrazioni il tasso cresce quasi in proporzione al nutrimento; ad alte concentrazioni si avvicina al massimo. Per $S=K_s$ il tasso è metà del massimo.
:::

Nel 1950 Monod, e indipendentemente Aaron Novick e Leo Szilard, inventarono un apparecchio che mantiene una popolazione in crescita indefinitamente: il **chemostato**. Un recipiente di volume $V$ riceve terreno fresco con concentrazione $S_0$ di nutrimento a portata costante $F$, e la stessa portata esce trascinando cellule e terreno usato. Il rapporto $D=F/V$ si chiama **tasso di diluizione**. All'equilibrio le cellule devono nascere con la stessa velocità con cui vengono portate via, quindi $\mu=D$; dall'equazione di Monod la concentrazione di nutrimento nel recipiente si porta al valore

$$S^*=\frac{K_s\,D}{\mu_\text{max}-D},$$

e la biomassa a $X^*=Y\,(S_0-S^*)$. Regolando la portata si sceglie il tasso di crescita. Se però $D$ supera il tasso che le cellule raggiungono con il nutrimento in entrata, $\mu_\text{max}S_0/(K_s+S_0)$, le cellule vengono portate via più in fretta di quanto si dividano, e la coltura si svuota.

::: esempio Un chemostato
Con $\mu_\text{max}=0{,}8$ all'ora, $K_s=2$ mg/L, rendimento $Y=0{,}5$, nutrimento in entrata $S_0=100$ mg/L e tasso di diluizione $D=0{,}4$ all'ora, all'equilibrio

$$\begin{aligned}S^*&=\frac{2\cdot0{,}4}{0{,}8-0{,}4}=2\ \text{mg/L},\\X^*&=0{,}5\cdot98=49\ \text{mg/L}.\end{aligned}$$

Le cellule si dividono con tasso $0{,}4$ all'ora, cioè con tempo di raddoppio $0{,}693/0{,}4\approx1{,}7$ ore. La coltura si svuota se $D$ supera $0{,}8\cdot100/102\approx0{,}78$ all'ora.
:::

Il chemostato è un piccolo modello di molti ambienti naturali, in cui il nutrimento arriva lentamente e con continuità: un lago alimentato da un fiume, l'intestino, un sedimento in cui la materia organica cade dall'alto. In questi ambienti le cellule crescono al ritmo imposto dal rifornimento, molto più lentamente del loro massimo, e la concentrazione del nutrimento resta bassissima, vicina a $K_s$.

## Crescere al freddo {#temperatura}

Ogni microrganismo cresce entro un intervallo di temperatura delimitato da tre **temperature cardinali**: una minima, sotto la quale non si divide più, una ottimale, a cui cresce più in fretta, e una massima. La curva del tasso di crescita è asimmetrica. Sopra l'ottimo cala bruscamente, perché le proteine e le membrane si danneggiano; sotto l'ottimo diminuisce più gradualmente, perché tutte le reazioni rallentano, le membrane si irrigidiscono e gli enzimi lavorano peggio.

In base all'intervallo di crescita si distinguono gli **psicrofili**, con temperatura ottimale non superiore a $15$ °C e massima intorno a $20$ °C secondo la definizione proposta da Richard Morita nel 1975, gli **psicrotolleranti**, che crescono a $0$ °C ma preferiscono temperature più miti, i **mesofili**, come i batteri del nostro intestino, e i termofili e gli ipertermofili del capitolo [Estremofili](unit:biology-18). Gran parte della biosfera terrestre è fredda: gli oceani profondi, sotto i mille metri, sono quasi ovunque fra $0$ e $4$ °C, e un quarto delle terre emerse dell'emisfero nord poggia sul **permafrost**, suolo che resta gelato per anni.

Sotto lo zero l'acqua di un suolo o di un ghiaccio non gela completamente. I sali e le altre sostanze disciolte vengono espulsi dai cristalli di ghiaccio e si concentrano in sottili **vene di salamoia** fra i grani, che restano liquide molto sotto lo zero. In queste vene, larghe pochi micrometri, alcuni batteri continuano a lavorare e a dividersi.

Nel 2000 Elizaveta Rivkina e collaboratori incubarono campioni di permafrost siberiano fra $5$ e $-20$ °C, seguendo l'incorporazione di acetato marcato con carbonio-14 nei lipidi delle membrane, una misura della sintesi di nuove cellule. Le curve ottenute avevano la forma a S della crescita, e i tempi di raddoppio minimi erano di circa un giorno a $5$ °C, venti giorni a $-10$ °C e centossessanta giorni a $-20$ °C. Nel 2013 Nadia Mykytczuk e collaboratori descrissero *Planococcus halocryophilus*, un batterio isolato dal permafrost dell'isola di Ellesmere, nell'Artico canadese: cresce fino a $37$ °C e sopporta il $19\%$ di cloruro di sodio, si divide circa ogni ora a $25$ °C, ogni quaranta giorni a $-10$ °C e ogni cinquanta giorni a $-15$ °C, e mantiene un'attività respiratoria misurabile fino a $-25$ °C (figura 5). Esiste probabilmente un limite fisico. Nel 2013 Andrew Clarke e collaboratori mostrarono che una cellula circondata da ghiaccio perde acqua verso i cristalli, e che il suo citoplasma, sempre più concentrato, passa allo stato vetroso fra $-10$ e $-26$ °C; in quello stato la diffusione delle molecole quasi si arresta, e con essa il metabolismo.

::: figura temperatura
{"w":720,"h":290,"items":[{"t":"axes","o":[80,255],"x":[600,"temperatura, °C"],"y":[230,"tempo di raddoppio, giorni"],"sx":8,"sy":45,"xt":[[0,"−25"],[5,"−20"],[10,"−15"],[15,"−10"],[20,"−5"],[25,"0"],[30,"5"],[35,"10"],[40,"15"],[45,"20"],[50,"25"],[55,"30"]],"yt":[[0,"0,01"],[1,"0,1"],[2,"1"],[3,"10"],[4,"100"],[5,"1000"]]},{"t":"plot","o":[80,255],"sx":8,"sy":45,"pts":[[2.0,4.49822],[2.5,4.4487144],[3.0,4.399406],[3.5,4.3502935],[4.0,4.3013757],[4.5,4.2526516],[5.0,4.20412],[5.5,4.1557797],[6.0,4.1076296],[6.5,4.0596685],[7.0,4.0118955],[7.5,3.9643093],[8.0,3.9169089],[8.5,3.8696932],[9.0,3.8226611],[9.5,3.7758115],[10.0,3.7291434],[10.5,3.6826558],[11.0,3.6363475],[11.5,3.5902176],[12.0,3.544265],[12.5,3.4984887],[13.0,3.4528877],[13.5,3.407461],[14.0,3.3622075],[14.5,3.3171264],[15.0,3.2722165],[15.5,3.2274771],[16.0,3.1829069],[16.5,3.1385052],[17.0,3.094271],[17.5,3.0502032],[18.0,3.0063011],[18.5,2.9625635],[19.0,2.9189897],[19.5,2.8755787],[20.0,2.8323296],[20.5,2.7892415],[21.0,2.7463135],[21.5,2.7035446],[22.0,2.6609341],[22.5,2.618481],[23.0,2.5761845],[23.5,2.5340437],[24.0,2.4920577],[24.5,2.4502258],[25.0,2.4085469],[25.5,2.3670204],[26.0,2.3256454],[26.5,2.284421],[27.0,2.2433464],[27.5,2.2024208],[28.0,2.1616434],[28.5,2.1210135],[29.0,2.0805301],[29.5,2.0401925],[30.0,2.0],[30.5,1.9599517],[31.0,1.9200469],[31.5,1.8802847],[32.0,1.8406645],[32.5,1.8011855],[33.0,1.7618469]],"c":"force2","w":2.2,"dash":true},{"t":"circle","p":[320,165.0,5],"c":"force2"},{"t":"circle","p":[200,106.5,5],"c":"force2"},{"t":"circle","p":[120,65.8,5],"c":"force2"},{"t":"rect","p":[475,222.1,10,10],"c":"force","r":1},{"t":"rect","p":[195,87.9,10,10],"c":"force","r":1},{"t":"rect","p":[155,83.5,10,10],"c":"force","r":1},{"t":"text","p":[264,99.8],"s":"permafrost siberiano","c":"force2","size":11,"a":"start"},{"t":"text","p":[160,76.5],"s":"Planococcus halocryophilus","c":"force","size":11,"a":"start"},{"t":"text","p":[480,247.1],"s":"1 ora a 25 °C","c":"force","size":10}]}
---
Tempo di raddoppio in funzione della temperatura, in scala logaritmica. Cerchi: comunità batterica del permafrost siberiano (Rivkina e collaboratori, 2000), con la retta di Arrhenius che li unisce. Quadrati: *Planococcus halocryophilus* (Mykytczuk e collaboratori, 2013). Fra $5$ e $-20$ °C il tempo di raddoppio cresce di un fattore $160$.
:::

La dipendenza dalla temperatura segue con buona approssimazione la legge di Arrhenius delle reazioni chimiche, discussa nel capitolo [Temperatura e attivazione](unit:chemistry-18): il tasso di crescita è proporzionale a $\mathrm e^{-E_a/RT}$, dove $E_a$ è un'energia di attivazione apparente, e il tempo di raddoppio all'inverso.

::: esempio L'energia di attivazione del permafrost
Fra $5$ °C, cioè $278{,}15$ K, e $-20$ °C, cioè $253{,}15$ K, il tempo di raddoppio passa da $1$ a $160$ giorni. Dalla legge di Arrhenius

$$\ln\frac{g_2}{g_1}=\frac{E_a}{R}\left(\frac1{T_2}-\frac1{T_1}\right),$$

con $\ln160\approx5{,}08$ e $1/T_2-1/T_1\approx3{,}55\cdot10^{-4}$ K$^{-1}$, si ottiene $E_a\approx8{,}314\cdot5{,}08/3{,}55\cdot10^{-4}\approx119$ kJ/mol. Con questo valore il tempo di raddoppio previsto a $-10$ °C è circa $19$ giorni, vicino ai $20$ misurati.
:::

L'effetto della temperatura si esprime spesso con il **coefficiente** $Q_{10}$, il fattore di cui cresce il tasso per un aumento di dieci gradi. Per molti processi biologici vicino alla temperatura ambiente vale fra $2$ e $3$. Con un'energia di attivazione di $119$ kJ/mol, fra $-5$ e $5$ °C vale quasi $7$: vicino allo zero, pochi gradi decidono fra crescita apprezzabile e stasi. Lo stesso numero mostra perché il frigorifero conserva gli alimenti. A $4$ °C molti batteri che a $37$ °C si dividono in mezz'ora impiegano giorni, o si fermano del tutto.

Nel 2004 Buford Price e Todd Sowers raccolsero i tassi metabolici misurati in ambienti freddi e distinsero tre regimi, separati da vari ordini di grandezza: la **crescita**, in cui le cellule si dividono; il **mantenimento**, in cui riparano i danni e conservano i gradienti delle membrane senza dividersi; la **sopravvivenza**, in cui il metabolismo basta appena a riparare i danni più gravi alle macromolecole. Per la protezione planetaria la distinzione è decisiva: sopravvivere al freddo e dividersi al freddo sono capacità molto diverse.

## La vita al rallentatore {#profonda}

Sotto il fondo degli oceani, nei sedimenti accumulati per milioni di anni, vive una parte importante dei microrganismi della Terra. Le cellule sono numerose, centinaia di milioni per centimetro cubo vicino al fondale e ancora milioni a centinaia di metri di profondità, ma il nutrimento che le sostiene è materia organica depositata dalla superficie in tempi geologici e ormai difficile da digerire.

Misurare la crescita di queste comunità è difficilissimo, e si ricorre a metodi indiretti. Nel 2012 Bente Lomstein e collaboratori usarono la lenta trasformazione degli amminoacidi delle proteine dalla forma L alla forma D, una sorta di orologio chimico, e stimarono che la biomassa microbica dei sedimenti profondi si rinnova in tempi di **centinaia o migliaia di anni**; trovarono anche che le endospore sono abbondanti quanto le cellule attive. Nel 2023 Tori Hoehler e collaboratori stimarono la potenza metabolica per unità di massa delle diverse parti della biosfera. In media la biosfera usa circa $0{,}005$ watt per grammo di carbonio; i produttori primari marini arrivano a $2{,}3$; i sedimenti marini profondi scendono a circa $0{,}00002$, centomila volte meno, con tempi di rinnovo della biomassa dell'ordine del secolo.

::: storia Microbi di cento milioni di anni
Nel 2010 la nave da perforazione *JOIDES Resolution* raccolse sedimenti sotto il fondale del Pacifico meridionale, nel centro del grande vortice oceanico dove la produttività è la più bassa del pianeta. I sedimenti, deposti fra $13$ e $101{,}5$ milioni di anni fa, contengono poche cellule e ancora ossigeno. Nel 2020 Yuki Morono e collaboratori incubarono campioni di questi sedimenti con substrati marcati con isotopi rari per un periodo fino a $557$ giorni, e osservarono che molte delle cellule aerobiche presenti incorporavano carbonio e azoto e si dividevano, anche nei campioni più antichi. Non è possibile sapere se quelle cellule siano rimaste ferme per cento milioni di anni o si siano rinnovate lentissimamente: in entrambi i casi la vita ha attraversato tempi geologici in un ambiente quasi privo di energia.
:::

Questi risultati cambiano il modo di pensare l'abitabilità. Anche un ambiente con pochissima energia può ospitare popolazioni che crescono con tempi di raddoppio di secoli, che consumano a malapena quanto basta per riparare i danni e che possono riprendere a dividersi quando arriva nutrimento. Nel sottosuolo di Marte, negli oceani di Europa e di Encelado, la vita, se c'è, potrebbe vivere in questo modo, come si discute nei capitoli [Cercare la vita su Marte](unit:biology-27) ed [Europa e gli oceani sotto il ghiaccio](unit:biology-28).

## Crescere su Marte? {#marte}

La superficie di Marte è uno degli ambienti più ostili del sistema solare. La pressione media è di circa $6$-$7$ millibar, meno dell'$1\%$ di quella terrestre; l'atmosfera è quasi tutta anidride carbonica, senza ossigeno; la temperatura media è di circa $-60$ °C; la radiazione ultravioletta del Sole arriva al suolo senza filtro. Nel 2008 il lander Phoenix trovò nel suolo il $0{,}4$-$0{,}6\%$ in massa di **perclorati**, sali ossidanti che abbassano il punto di congelamento dell'acqua e che, sotto la luce ultravioletta, diventano fortemente battericidi, come mostrarono Jennifer Wadsworth e Charles Cockell nel 2017.

Un batterio portato su Marte da una sonda sopravvivrebbe? E potrebbe crescere? Le due domande sono distinte. Molte spore sopravvivono a lungo nel vuoto e al freddo, come si è visto nel capitolo [Estremofili](unit:biology-18), mentre la crescita richiede che tutte le condizioni siano favorevoli nello stesso momento.

Per rispondere Andrew Schuerger, Wayne Nicholson e collaboratori coltivarono batteri in camere che riproducono alcune condizioni marziane. Nel 2013 provarono $26$ ceppi di $22$ specie, tra cui molti batteri comuni sulle sonde spaziali, su terreni ricchi a $7$ millibar, $0$ °C e in atmosfera di anidride carbonica senza ossigeno. Ciascun fattore, da solo, riduceva la crescita, e insieme la impedivano quasi a tutti: cresceva solo *Serratia liquefaciens*, un batterio generalista delle piante e dei pesci, mentre il celebre resistente *Deinococcus radiodurans* falliva. Nello stesso anno Nicholson e collaboratori isolarono dal permafrost siberiano sei ceppi di *Carnobacterium* capaci di crescere nelle stesse condizioni, e mostrarono che ci riuscivano anche nove specie note dello stesso genere. Nel 2020, però, la stessa *Serratia* non riuscì a crescere quando il terreno ricco fu sostituito da quattro diversi simulanti del suolo marziano.

Restano altri ostacoli. A $0$ °C l'acqua pura evapora rapidamente nell'aria secchissima di Marte, e alle temperature reali gela. Le **salamoie** di perclorati possono formarsi assorbendo vapore dall'atmosfera, ma nel 2020 Edgard Rivera-Valentín e collaboratori calcolarono che le salamoie stabili, possibili su circa il $40\%$ della superficie, esistono solo per il $2\%$ dell'anno e a temperature non superiori a $-48$ °C, più fredde di qualunque limite noto di crescita.

Per regolare l'esplorazione, il Comitato per la ricerca spaziale (COSPAR) definisce **regioni speciali** le zone di Marte in cui un organismo terrestre potrebbe replicarsi. Un colloquio internazionale del 2007, i cui risultati furono pubblicati nel 2010, fissò come soglie una temperatura superiore a $-25$ °C, raggiunta almeno per qualche ora all'anno, e un'**attività dell'acqua** superiore a $0{,}5$; un gruppo di lavoro internazionale coordinato dalla NASA ha riesaminato i valori nel 2014. Le soglie sono volutamente più larghe dei limiti osservati, con un margine di prudenza: la divisione cellulare più fredda documentata per un batterio avviene a $-15$ °C, quella più secca intorno a un'attività dell'acqua di $0{,}6$, raggiunta da alcuni funghi in soluzioni zuccherine e, secondo le estrapolazioni, da alcuni procarioti alofili (figura 6).

::: figura limiti
{"w":800,"h":285,"items":[{"t":"rect","p":[317.5,40.0,292.5,150.0],"c":"muted","r":0},{"t":"poly","pts":[[362.5,40.0],[610.0,40.0],[610.0,158.5],[362.5,158.5]],"close":true,"c":"force3","w":2},{"t":"axes","o":[70,250],"x":[680,"temperatura, °C"],"y":[225,"attività dell'acqua"],"sx":4.5,"sy":300,"xt":[[0,"−80"],[20,"−60"],[40,"−40"],[60,"−20"],[80,"0"],[100,"20"],[120,"40"]],"yt":[[0.0,"0,3"],[0.2,"0,5"],[0.4,"0,7"],[0.6,"0,9"],[0.7,"1,0"]]},{"t":"line","p":[214.0,250.0,214.0,40.0],"c":"force","w":2,"dash":true},{"t":"text","p":[205.0,49.0],"s":"salamoie stabili","c":"force","size":11,"a":"end"},{"t":"text","p":[205.0,64.0],"s":"su Marte: ≤ −48 °C","c":"force","size":11,"a":"end"},{"t":"text","p":[326.5,177.0],"s":"regioni speciali COSPAR","c":"muted","size":11,"a":"start"},{"t":"text","p":[371.5,100.0],"s":"riproduzione documentata","c":"force3","size":11,"a":"start"},{"t":"text","p":[371.5,115.0],"s":"fino a −15 °C e 0,6","c":"force3","size":10,"a":"start"}]}
---
Temperatura e attività dell'acqua. Il riquadro interno indica dove è documentata la riproduzione di organismi terrestri; quello esterno le soglie delle regioni speciali del COSPAR, con margine di prudenza. Le salamoie stabili sulla superficie di Marte restano a sinistra della linea di $-48$ °C, fuori da entrambi.
:::

Le regioni speciali candidate sono quindi nel sottosuolo, nei ghiacci che potrebbero fondere localmente, nelle eventuali grotte o nelle zone riscaldate da un lander. Sono anche i luoghi più interessanti per cercare la vita marziana, come si discute nel capitolo [Panspermia e protezione planetaria](unit:biology-34).

## Un'esperienza: il lievito e la temperatura {#esperienza}

Il lievito di birra, *Saccharomyces cerevisiae*, è un fungo unicellulare che fermenta gli zuccheri producendo anidride carbonica ed etanolo, come si è visto nel capitolo [Respirazione, fermentazione e chemiosintesi](unit:biology-19). Le bolle di gas fanno crescere un impasto, e la velocità con cui l'impasto cresce misura l'attività delle cellule. L'esperienza confronta questa attività a tre temperature.

::: metodo Tre impasti, tre temperature
**Materiale.** Farina, acqua, un cucchiaino di zucchero, una bustina di lievito di birra secco, tre bicchieri trasparenti uguali e alti, un pennarello, un righello, un termometro da cucina, un frigorifero.

**Procedura.** Si sciolgono il lievito e lo zucchero in $150$ mL di acqua tiepida, si aggiungono circa $200$ g di farina e si impasta fino a ottenere una pastella densa e omogenea. Si divide l'impasto in tre parti uguali, versandole nei tre bicchieri fino alla stessa altezza, e si segna il livello iniziale con il pennarello. Un bicchiere va in frigorifero, uno resta a temperatura ambiente e uno si mette in un luogo tiepido, per esempio vicino a un termosifone o nel forno spento con la sola luce accesa; si misura la temperatura di ciascun luogo. Ogni quindici minuti, per due ore, si misura l'altezza dell'impasto in ciascun bicchiere.

**Analisi.** Disegnare l'altezza in funzione del tempo per le tre temperature. In quale bicchiere l'impasto cresce prima? Stimare dalla parte iniziale delle curve la velocità di crescita, in millimetri al minuto, e, dalle velocità $v_1$ e $v_2$ alle due temperature più alte, separate da $\Delta T$ gradi, stimare $Q_{10}=(v_2/v_1)^{10/\Delta T}$. L'impasto misura il gas prodotto, e quindi l'attività delle cellule, più che il loro numero: come si potrebbe misurare la crescita della popolazione di lieviti?
:::

Una variante usa una bottiglia di plastica con acqua tiepida, zucchero e lievito, chiusa con un palloncino che si gonfia. In entrambi i casi l'esperienza mostra che la temperatura controlla la velocità della vita, e che il freddo del frigorifero la rallenta senza uccidere le cellule: riportato a temperatura ambiente, l'impasto conservato al freddo riprende a crescere.

## Errori frequenti {#errori}

::: errore Confondere tasso di crescita e tempo di raddoppio
Il tasso specifico $r$ si misura in inverso di un tempo, e il tempo di raddoppio è $g=\ln2/r$. Un tasso doppio dimezza il tempo di raddoppio. Scambiare le due grandezze porta a errori di ordini di grandezza nelle previsioni.
:::

::: errore Credere che la crescita esponenziale possa durare
Ogni crescita esponenziale reale si ferma, perché le risorse sono finite. Il calcolo per *E. coli*, che in due giorni supererebbe la massa della Terra, mostra soltanto il potenziale di crescita; le popolazioni reali passano presto alla fase stazionaria.
:::

::: errore Prendere le colonie per tutte le cellule
Il conteggio su piastra rileva solo le cellule capaci di formare colonie in quel terreno e in quelle condizioni. Nei campioni naturali le cellule al microscopio sono da cento a diecimila volte più numerose.
:::

::: errore Pensare che il freddo fermi la vita
Molti batteri si dividono sotto lo zero, nelle vene di salamoia del ghiaccio e del permafrost, con tempi di raddoppio di settimane o mesi. Il freddo rallenta la vita; il limite inferiore per le cellule singole, fra $-10$ e $-26$ °C, sembra dovuto alla vetrificazione del citoplasma.
:::

::: errore Confondere sopravvivenza e crescita
Una spora può sopravvivere per anni nel vuoto, al freddo e alla radiazione senza dividersi mai. Per colonizzare un ambiente serve la crescita, che richiede acqua liquida, temperatura, energia e nutrienti nello stesso momento. Gli esperimenti in condizioni marziane simulate distinguono con cura i due casi.
:::

## Sintesi {#sintesi}

::: sintesi In breve
- Una popolazione con tasso specifico costante cresce in modo esponenziale, $N=N_0\,\mathrm e^{rt}$; il tempo di raddoppio è $g=\ln2/r$, e in scala logaritmica la crescita è una retta.
- Una coltura discontinua attraversa fase di latenza, fase esponenziale, fase stazionaria e fase di morte.
- I conteggi su piastra rilevano le cellule coltivabili, spesso una piccola frazione di quelle presenti in natura.
- Il modello logistico, $\mathrm dN/\mathrm dt=rN(1-N/K)$, descrive una crescita che rallenta fino alla capacità portante $K$; la velocità massima, $rK/4$, si ha a metà della capacità.
- L'equazione di Monod lega il tasso di crescita alla concentrazione del nutrimento; nel chemostato il tasso di crescita è fissato dal tasso di diluizione.
- Al freddo la crescita rallenta secondo la legge di Arrhenius; batteri del permafrost si dividono fino a $-15$ °C con tempi di raddoppio di settimane o mesi.
- Nei sedimenti profondi la biomassa si rinnova in secoli o millenni, con una potenza per grammo centomila volte minore di quella dei produttori marini.
- Su Marte la combinazione di bassa pressione, freddo, assenza di ossigeno, perclorati e radiazione impedisce la crescita di quasi tutti i batteri terrestri; le regioni speciali sono le zone in cui la replicazione sarebbe possibile.
:::

## Glossario {#glossario}

- **Attività dell'acqua**: rapporto fra la pressione di vapore dell'acqua di una soluzione e quella dell'acqua pura alla stessa temperatura; misura quanta acqua è disponibile per la vita.
- **Capacità portante**: numero massimo di individui che un ambiente può sostenere.
- **Chemostato**: apparecchio per colture continue in cui il terreno fresco entra e la coltura esce alla stessa portata.
- **Crescita esponenziale**: crescita con velocità proporzionale alla dimensione della popolazione.
- **Crescita logistica**: crescita che rallenta in proporzione alla frazione di capacità portante già occupata.
- **Fase di latenza**: fase iniziale di una coltura in cui le cellule si adattano al nuovo ambiente senza dividersi.
- **Fase stazionaria**: fase in cui il numero di cellule resta costante perché il nutrimento si è esaurito o l'ambiente è diventato sfavorevole.
- **Psicrofilo**: microrganismo con temperatura ottimale di crescita non superiore a $15$ °C.
- **Regione speciale**: zona di Marte in cui un organismo terrestre potrebbe replicarsi, secondo le soglie del COSPAR.
- **Tasso specifico di crescita**: aumento della popolazione per unità di tempo e per individuo.
- **Tempo di raddoppio**: tempo in cui una popolazione in crescita esponenziale raddoppia.
- **Unità formante colonia**: cellula o gruppo di cellule che dà origine a una colonia su un terreno solido.

## Esercizi {#esercizi}

::: esercizio Un giorno di raddoppi [base]
Una cellula di *E. coli* si divide ogni $20$ minuti. Quante generazioni si succedono in $24$ ore, quante cellule si otterrebbero e quale sarebbe la loro massa, con un picogrammo, cioè $10^{-12}$ g, per cellula?
>>> soluzione
Le generazioni sono $24\cdot3=72$, le cellule $2^{72}\approx4{,}7\cdot10^{21}$ e la massa $4{,}7\cdot10^{9}$ g, circa $4700$ tonnellate. Il risultato mostra il potenziale della crescita esponenziale; nella realtà il nutrimento finisce molto prima.
:::

::: esercizio Dal tempo di raddoppio al tasso [base]
Calcolare il tasso specifico di crescita di una coltura con tempo di raddoppio di $30$ minuti e di una comunità del permafrost con tempo di raddoppio di $160$ giorni.
>>> soluzione
Con $r=\ln2/g$ si ottiene $0{,}693/0{,}5\ \text{h}\approx1{,}39$ all'ora nel primo caso e $0{,}693/160\approx0{,}0043$ al giorno nel secondo. Espressi nella stessa unità, i due tassi differiscono di un fattore $160\cdot48\approx7700$.
:::

::: esercizio Una piastra di colonie [base]
Un campione di acqua viene diluito fino a $10^{-6}$; stendendo $0{,}1$ mL dell'ultima diluizione crescono $150$ colonie. Qual è la concentrazione di unità formanti colonia nel campione?
>>> soluzione
$150/0{,}1=1500$ colonie per millilitro della diluizione, e quindi $1500\cdot10^6=1{,}5\cdot10^9$ UFC per millilitro di campione.
:::

::: esercizio Leggere un grafico semilogaritmico [base]
In una coltura la densità passa da $10^3$ a $10^6$ cellule per millilitro in $5$ ore lungo una retta del grafico logaritmico. Quanti raddoppi sono avvenuti e qual è il tempo di raddoppio?
>>> soluzione
Il fattore $1000$ corrisponde a $\log_2 1000\approx9{,}97$ raddoppi, quasi dieci, perché $2^{10}=1024$. Il tempo di raddoppio è $300/9{,}97\approx30$ minuti.
:::

::: esercizio La velocità a metà capacità [base]
Una popolazione segue il modello logistico con $r=0{,}3$ per unità di tempo e $K=100$. Calcolare la velocità di crescita per $N=10$, $N=50$ e $N=90$.
>>> soluzione
Con $rN(1-N/K)$ si ottiene $0{,}3\cdot10\cdot0{,}9=2{,}7$, $0{,}3\cdot50\cdot0{,}5=7{,}5$ e $0{,}3\cdot90\cdot0{,}1=2{,}7$ individui per unità di tempo. La velocità è massima a metà della capacità ed è uguale in punti simmetrici rispetto a $K/2$.
:::

::: esercizio Un anno nel permafrost [base]
A $-20$ °C una comunità del permafrost raddoppia in circa $160$ giorni. Di quanto cresce in un anno, se le condizioni restano costanti?
>>> soluzione
In $365$ giorni avvengono $365/160\approx2{,}3$ raddoppi, e la popolazione si moltiplica per $2^{2{,}28}\approx4{,}9$. Nello stesso anno una coltura di *E. coli* in condizioni ottimali compirebbe più di ventimila raddoppi.
:::

::: esercizio Quando si arriva a metà [medio]
Con $K=100$ e $N_0=10$, calcolare il tempo per raggiungere metà della capacità per $r=0{,}1$, $0{,}3$ e $0{,}6$ per unità di tempo. Che relazione c'è fra i tre tempi?
>>> soluzione
Con $t^*=\ln(K/N_0-1)/r=\ln9/r$ si ottengono $22{,}0$, $7{,}3$ e $3{,}7$ unità di tempo. Il tempo è inversamente proporzionale a $r$: con un tasso sei volte più grande la popolazione arriva a metà sei volte prima.
:::

::: esercizio L'equazione di Monod [medio]
Un batterio ha $\mu_\text{max}=0{,}8$ all'ora e $K_s=2$ mg/L. Calcolare il tasso di crescita con $0{,}5$, $2$ e $20$ mg/L di nutrimento, e i corrispondenti tempi di raddoppio.
>>> soluzione
Il tasso vale $0{,}8\cdot0{,}5/2{,}5=0{,}16$, $0{,}8\cdot2/4=0{,}40$ e $0{,}8\cdot20/22\approx0{,}73$ all'ora; i tempi di raddoppio sono circa $4{,}3$, $1{,}7$ e $0{,}95$ ore. Aumentare il nutrimento da $2$ a $20$ mg/L, dieci volte, non arriva a raddoppiare il tasso, perché ci si avvicina alla saturazione.
:::

::: esercizio Un chemostato [medio]
Un chemostato con lo stesso batterio dell'esercizio precedente riceve terreno con $S_0=100$ mg/L di nutrimento; il rendimento è $Y=0{,}5$. Trovare la concentrazione di nutrimento e la biomassa all'equilibrio per $D=0{,}4$ all'ora, e il tasso di diluizione oltre il quale la coltura si svuota.
>>> soluzione
$S^*=K_sD/(\mu_\text{max}-D)$, cioè $2\cdot0{,}4/0{,}4=2$ mg/L, e $X^*=0{,}5\cdot(100-2)=49$ mg/L. La coltura si svuota per $D>0{,}8\cdot100/102\approx0{,}78$ all'ora.
:::

::: esercizio Coltivabili e no [medio]
In un grammo di suolo il conteggio al microscopio dà $2\cdot10^6$ cellule e il conteggio su piastra $4\cdot10^3$ UFC. Quale frazione delle cellule è coltivabile? Che cosa si può concludere sulle altre?
>>> soluzione
La frazione è $4\cdot10^3/2\cdot10^6=0{,}002$, cioè lo $0{,}2\%$. Le altre cellule possono essere morte, dormienti, troppo lente per formare colonie visibili nel tempo dell'esperimento, oppure bisognose di condizioni che il terreno non offre; il conteggio su piastra, da solo, non permette di distinguere questi casi.
:::

::: esercizio Una spora sola [medio]
Una sola cellula trova un ambiente in cui può dividersi con tempo di raddoppio di $160$ giorni. Quanto tempo serve per arrivare a un miliardo di cellule? E con un tempo di raddoppio di $20$ minuti?
>>> soluzione
Servono $\log_2 10^9\approx29{,}9$ raddoppi, cioè $29{,}9\cdot160\approx4800$ giorni, circa $13$ anni. Con $20$ minuti bastano $29{,}9\cdot20\approx600$ minuti, cioè $10$ ore. Anche una crescita lentissima produce popolazioni grandi su tempi umani: per questo la protezione planetaria si preoccupa di ogni ambiente in cui la crescita sia possibile.
:::

::: esercizio Mantenere la fase esponenziale [medio]
Per studiare cellule in fase esponenziale, una coltura con tempo di raddoppio di $30$ minuti viene diluita ogni tre ore, riportandola alla densità iniziale. Di quale fattore va diluita ogni volta?
>>> soluzione
In tre ore avvengono $180/30=6$ raddoppi, e la coltura cresce di $2^6=64$ volte. Va quindi diluita di un fattore $64$, per esempio un millilitro di coltura in $63$ di terreno fresco.
:::

::: esercizio Il massimo della crescita logistica [avanzato]
Dimostrare che la velocità di crescita logistica $rN(1-N/K)$ è massima per $N=K/2$ e vale $rK/4$. Ricavare poi, dalla soluzione $N(t)$, l'istante $t^*$ in cui $N=K/2$.
>>> soluzione
La velocità è $f(N)=rN-rN^2/K$, con derivata $f'(N)=r-2rN/K$, nulla per $N=K/2$; la derivata seconda $-2r/K$ è negativa, quindi è un massimo, e $f(K/2)=rK/4$. Ponendo $N=K/2$ nella soluzione si ha $1+(K/N_0-1)\,\mathrm e^{-rt^*}=2$, cioè $\mathrm e^{-rt^*}=1/(K/N_0-1)$ e $t^*=\ln(K/N_0-1)/r$.
:::

::: esercizio Stimare il tasso da tre misure [avanzato]
Una popolazione con capacità portante nota $K=100$ vale $10$, $33{,}2$ e $69{,}1$ agli istanti $0$, $5$ e $10$. Usando la grandezza $y=\ln[(K-N)/N]$, che nel modello logistico diminuisce linearmente nel tempo con pendenza $-r$, stimare $r$.
>>> soluzione
Dalla soluzione logistica $(K-N)/N=(K/N_0-1)\,\mathrm e^{-rt}$, quindi $y=\ln(K/N_0-1)-rt$. I tre valori di $y$ sono $\ln9\approx2{,}197$, $\ln(66{,}8/33{,}2)\approx0{,}699$ e $\ln(30{,}9/69{,}1)\approx-0{,}805$. Le pendenze fra i punti successivi sono $-0{,}300$ e $-0{,}301$, e quindi $r\approx0{,}30$ per unità di tempo. I tre punti allineati confermano che il modello descrive bene i dati.
:::

::: esercizio Arrhenius nel permafrost [avanzato]
Una comunità del permafrost raddoppia in $1$ giorno a $5$ °C e in $160$ giorni a $-20$ °C. Calcolare l'energia di attivazione apparente, prevedere il tempo di raddoppio a $-10$ °C e calcolare il $Q_{10}$ fra $-5$ e $5$ °C.
>>> soluzione
Con $\ln160\approx5{,}075$ e $1/253{,}15-1/278{,}15\approx3{,}55\cdot10^{-4}$ K$^{-1}$ si trova

$$E_a=\frac{8{,}314\cdot5{,}075}{3{,}55\cdot10^{-4}}\ \frac{\mathrm J}{\mathrm{mol}}\approx119\ \frac{\mathrm{kJ}}{\mathrm{mol}}.$$

A $-10$ °C, cioè $263{,}15$ K, la differenza degli inversi delle temperature è $\Delta=1/263{,}15-1/278{,}15$, circa $2{,}05\cdot10^{-4}$ K$^{-1}$, e il tempo di raddoppio previsto è $g=\mathrm e^{E_a\Delta/R}$ giorni, circa $18{,}7$, vicino ai $20$ misurati. Fra $268{,}15$ e $278{,}15$ K la differenza degli inversi è circa $1{,}34\cdot10^{-4}$ K$^{-1}$, e $Q_{10}=\mathrm e^{E_a\Delta/R}\approx6{,}8$, più del doppio dei valori tipici vicino alla temperatura ambiente.
:::

::: esercizio Salamoie marziane [avanzato]
Supponiamo che un batterio possa dividersi su Marte solo quando una salamoia è liquida, per il $2\%$ di un anno marziano di $687$ giorni terrestri, con tempo di raddoppio di $20$ giorni. Quanti anni terrestri servirebbero per passare da una cellula a un milione? Confrontare l'ipotesi con le temperature calcolate per le salamoie marziane.
>>> soluzione
Ogni anno marziano offre $0{,}02\cdot687\approx13{,}7$ giorni di crescita, cioè $13{,}7/20\approx0{,}69$ raddoppi. Per un milione di cellule servono $\log_2 10^6\approx19{,}9$ raddoppi, cioè circa $29$ anni marziani, quasi $55$ anni terrestri. L'ipotesi è però molto ottimistica: le salamoie stabili calcolate non superano $-48$ °C, una temperatura a cui nessun organismo noto si divide, e il tempo di raddoppio sarebbe infinito.
:::

## Fonti {#fonti}

Il testo, le figure, gli esempi e gli esercizi di questo capitolo sono originali. Per la scelta e l'ordine degli argomenti i riferimenti principali sono A. M. Shaw, *Astrochemistry: From Astronomy to Astrobiology*, Wiley, 2006, §9.4-9.5 (classificazione degli estremofili e psicrofili in relazione a Marte), e J. R. Morris, D. L. Hartl, A. H. Knoll e collaboratori, *Biology: How Life Works*, 2ª edizione, Macmillan, 2016, §46.1-46.2 (proprietà delle popolazioni, crescita esponenziale e logistica). Shaw attribuisce a psicrofili antartici una crescita a $-20$ °C con tempo di raddoppio di $180$ giorni: le misure a cui il dato sembra riferirsi riguardano il permafrost siberiano e danno circa $160$ giorni, ottenuti dall'incorporazione di acetato nei lipidi. Morris paragona i chicchi della scacchiera a circa un milione di volte le stelle della Via Lattea: con cento-quattrocento miliardi di stelle il rapporto è fra cinquanta e duecento milioni. Dati ed esperimenti provengono dalle fonti primarie seguenti.

1. J. Monod, *Annual Review of Microbiology* 3, 371 (1949): le fasi della crescita batterica; J. Monod, *Annales de l'Institut Pasteur* 79, 390 (1950), e A. Novick, L. Szilard, *Science* 112, 715 (1950): il chemostato.
2. R. G. Eagon, *Journal of Bacteriology* 83, 736 (1962): un batterio marino con tempo di generazione inferiore a dieci minuti.
3. J. T. Staley, A. Konopka, *Annual Review of Microbiology* 39, 321 (1985): la grande anomalia del conteggio su piastra.
4. P.-F. Verhulst, *Correspondance mathématique et physique* 10, 113 (1838): il modello logistico; G. F. Gause, *The Struggle for Existence*, Williams & Wilkins (1934); R. M. May, *Nature* 261, 459 (1976): dinamiche complesse in modelli semplici.
5. R. Y. Morita, *Bacteriological Reviews* 39, 144 (1975): i batteri psicrofili.
6. E. M. Rivkina e collaboratori, *Applied and Environmental Microbiology* 66, 3230 (2000): l'attività dei batteri del permafrost sotto lo zero.
7. N. C. S. Mykytczuk e collaboratori, *The ISME Journal* 7, 1211 (2013): *Planococcus halocryophilus* e la crescita a $-15$ °C.
8. A. Clarke e collaboratori, *PLoS ONE* 8, e66207 (2013): la vetrificazione cellulare e il limite inferiore di temperatura.
9. P. B. Price, T. Sowers, *PNAS* 101, 4631 (2004): crescita, mantenimento e sopravvivenza in funzione della temperatura.
10. B. A. Lomstein e collaboratori, *Nature* 484, 101 (2012): i tempi di rinnovo nei sedimenti profondi; T. M. Hoehler, B. B. Jørgensen, *Nature Reviews Microbiology* 11, 83 (2013): la vita con energia minima; T. M. Hoehler e collaboratori, *PNAS* 120, e2303764120 (2023): la potenza metabolica della biosfera.
11. Y. Morono e collaboratori, *Nature Communications* 11, 3626 (2020): microrganismi aerobi in sedimenti di $101{,}5$ milioni di anni.
12. M. H. Hecht e collaboratori, *Science* 325, 64 (2009): i perclorati nel suolo di Phoenix; J. Wadsworth, C. S. Cockell, *Scientific Reports* 7, 4662 (2017): perclorati e luce ultravioletta.
13. A. C. Schuerger e collaboratori, *Astrobiology* 13, 115 (2013), e *Life* 10, 77 (2020); W. L. Nicholson e collaboratori, *PNAS* 110, 666 (2013): la crescita batterica in condizioni marziane simulate.
14. E. G. Rivera-Valentín e collaboratori, *Nature Astronomy* 4, 756 (2020): le salamoie stabili su Marte.
15. G. Kminek e collaboratori, *Advances in Space Research* 46, 811 (2010): il colloquio COSPAR sulle regioni speciali; J. D. Rummel e collaboratori, *Astrobiology* 14, 887 (2014): la revisione delle regioni speciali; A. Stevenson e collaboratori, *The ISME Journal* 9, 1333 (2015): il limite di attività dell'acqua per i tre domini.
