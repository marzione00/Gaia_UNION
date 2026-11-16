---
unit: chemistry-11
titolo: Stati della materia e transizioni
sottotitolo: Solidi, liquidi e gas, tensione di vapore, calore latente e diagrammi di stato
volume: Volume di chimica
fonte: Testo originale; riferimento principale Petrucci et al., General Chemistry, 11ª ed., §12-2–12-5
---

## Prima di cominciare {#apertura}

Una pentola d'acqua sul fuoco si scalda fino a circa $100\,^\circ\mathrm{C}$ e lì si ferma, anche se la fiamma continua a darle energia. Un cubetto di ghiaccio in un bicchiere resta a $0\,^\circ\mathrm{C}$ finché non si è sciolto del tutto. Dove va il calore, se la temperatura non sale? E perché sulla vetta di una montagna l'acqua bolle a una temperatura più bassa, mentre in una pentola a pressione bolle a una temperatura più alta?

La risposta sta nelle interazioni fra le molecole, studiate nel capitolo [Forze intermolecolari](unit:chemistry-09). Nei solidi le particelle occupano posizioni fisse e vibrano attorno a esse; nei liquidi restano vicine e scorrono le une sulle altre; nei gas sono lontane e libere. Il passaggio da uno stato all'altro richiede di vincere, o permette di recuperare, le attrazioni fra le particelle, e l'energia scambiata va in questo lavoro invece che nell'aumento di temperatura. Questo capitolo descrive le transizioni di fase, l'equilibrio fra un liquido e il suo vapore, e i diagrammi che riassumono, per ogni sostanza, in quale stato si trova a ogni temperatura e pressione.

::: obiettivi
- descrivere i tre stati della materia con il grado di ordine e la libertà di movimento delle particelle;
- classificare i solidi in molecolari, ionici, covalenti e metallici, e collegare la classe alle proprietà;
- spiegare la tensione di vapore come equilibrio dinamico e la sua dipendenza dalla temperatura;
- usare l'equazione di Clausius e Clapeyron per legare tensione di vapore, temperatura ed entalpia di vaporizzazione;
- interpretare l'ebollizione e calcolare la temperatura di ebollizione a pressioni diverse;
- calcolare il calore scambiato lungo una curva di riscaldamento, con le capacità termiche e i calori latenti;
- leggere un diagramma di stato e riconoscere punto triplo, punto critico e fluido supercritico.
:::

L'equazione di stato dei gas e la temperatura critica sono state introdotte nel capitolo [Gas e stato aeriforme](unit:chemistry-10). Capacità termica e calore latente sono trattati dal punto di vista fisico nel capitolo [Calore e capacità termica](unit:physics-19) del volume di fisica.

## Tre stati, tre gradi di ordine {#stati}

Le proprietà macroscopiche dei tre stati riflettono la disposizione delle particelle. Un **solido** ha forma e volume propri: le particelle sono vicine e occupano posizioni fisse, attorno alle quali vibrano; nei solidi cristallini queste posizioni si ripetono con regolarità in tutte le direzioni. Un **liquido** ha volume proprio ma assume la forma del recipiente: le particelle sono vicine quasi quanto nel solido, la densità è simile, ma possono scorrere le une sulle altre, e l'ordine si conserva soltanto fra vicine immediate. Un **gas** è privo di forma e di volume propri; le particelle sono lontane, si muovono liberamente e occupano tutto lo spazio disponibile.

La differenza fra liquido e gas si vede nei volumi. A $100\,^\circ\mathrm{C}$ e $1\un{atm}$ un grammo di acqua liquida occupa circa $1{,}04\un{cm^3}$; un grammo di vapore occupa circa $1700\un{cm^3}$, più di millecinquecento volte tanto. La differenza fra solido e liquido è molto minore: per la maggior parte delle sostanze il solido è qualche per cento più denso del liquido, e per l'acqua è il contrario, come si è visto nel capitolo precedente.

Le **transizioni di fase** hanno nomi propri. Il passaggio da solido a liquido è la **fusione**, il contrario la **solidificazione**; da liquido a gas la **vaporizzazione**, che si chiama **evaporazione** quando avviene dalla superficie a temperature inferiori a quella di ebollizione; da gas a liquido la **condensazione**; da solido a gas la **sublimazione**, e il contrario il **brinamento**. Le transizioni che portano a uno stato meno ordinato, fusione, vaporizzazione e sublimazione, assorbono energia; quelle inverse la cedono.

## I solidi {#solidi}

I solidi si distinguono anzitutto per l'ordine. Nei **solidi cristallini** le particelle formano un reticolo regolare, e il cristallo ha facce piane, angoli definiti e una temperatura di fusione netta. Nei **solidi amorfi**, come il vetro, la gomma e molte materie plastiche, le particelle sono disposte in modo disordinato, come in un liquido congelato; scaldati, si ammorbidiscono gradualmente, senza una temperatura di fusione precisa.

I solidi cristallini si classificano poi secondo il tipo di forze che tengono unite le particelle.

| tipo | particelle e forze | esempi |
|---|---|---|
| molecolare | molecole, forze intermolecolari | ghiaccio, iodio, zucchero |
| ionico | ioni, attrazioni elettrostatiche | $\mathrm{NaCl}$, $\mathrm{MgO}$ |
| covalente | atomi, legami covalenti in tutto il cristallo | diamante, quarzo |
| metallico | ioni positivi in un mare di elettroni | rame, ferro, tungsteno |

Nei **solidi molecolari** le molecole sono tenute insieme dalle sole forze intermolecolari: sono teneri, fondono a temperature basse o moderate e sono cattivi conduttori. Nei **solidi ionici** gli ioni, studiati nel capitolo [Legame ionico e interazioni elettrostatiche](unit:chemistry-06), sono legati da attrazioni elettrostatiche intense: sono duri e fragili, e fondono ad alta temperatura. Nei **solidi covalenti**, o reticolari, ogni atomo è legato ai vicini da legami covalenti, e il cristallo è un'unica molecola gigante: il diamante, in cui ogni carbonio è legato tetraedricamente ad altri quattro, è la sostanza naturale più dura; il quarzo, $\mathrm{SiO_2}$, è una rete di tetraedri di silicio e ossigeno. Nei **solidi metallici** gli elettroni di valenza sono condivisi da tutto il cristallo, e possono muoversi liberamente: i metalli conducono la corrente e il calore, e si deformano senza rompersi.

::: figura solidi
{"w":660,"h":262,"items":[{"t":"text","p":[380,22],"s":"temperatura di fusione (°C)","c":"ax","size":12},{"t":"line","p":[230,34,230,250],"c":"muted","w":1.2},{"t":"text","p":[150,55],"s":"mercurio","c":"ax","size":12,"a":"end"},{"t":"text","p":[158,55],"s":"metallico","c":"muted","size":10,"a":"start"},{"t":"rect","p":[225.9,42,4.1,22],"c":"force3","r":1},{"t":"text","p":[236,58],"s":"−38,8","c":"ax","size":11,"a":"start"},{"t":"text","p":[150,90],"s":"iodio","c":"ax","size":12,"a":"end"},{"t":"text","p":[158,90],"s":"molecolare","c":"muted","size":10,"a":"start"},{"t":"rect","p":[230,77,11.9,22],"c":"force2","r":1},{"t":"text","p":[247.9,93],"s":"113,7","c":"ax","size":11,"a":"start"},{"t":"text","p":[150,125],"s":"cloruro di sodio","c":"ax","size":12,"a":"end"},{"t":"text","p":[158,125],"s":"ionico","c":"muted","size":10,"a":"start"},{"t":"rect","p":[230,112,84.1,22],"c":"force4","r":1},{"t":"text","p":[320.1,128],"s":"801","c":"ax","size":11,"a":"start"},{"t":"text","p":[150,160],"s":"rame","c":"ax","size":12,"a":"end"},{"t":"text","p":[158,160],"s":"metallico","c":"muted","size":10,"a":"start"},{"t":"rect","p":[230,147,113.9,22],"c":"force3","r":1},{"t":"text","p":[349.9,163],"s":"1084,6","c":"ax","size":11,"a":"start"},{"t":"text","p":[150,195],"s":"quarzo, SiO₂","c":"ax","size":12,"a":"end"},{"t":"text","p":[158,195],"s":"covalente","c":"muted","size":10,"a":"start"},{"t":"rect","p":[230,182,179.9,22],"c":"force","r":1},{"t":"text","p":[415.9,198],"s":"1713","c":"ax","size":11,"a":"start"},{"t":"text","p":[150,230],"s":"tungsteno","c":"ax","size":12,"a":"end"},{"t":"text","p":[158,230],"s":"metallico","c":"muted","size":10,"a":"start"},{"t":"rect","p":[230,217,359.3,22],"c":"force3","r":1},{"t":"text","p":[595.3,233],"s":"3422","c":"ax","size":11,"a":"start"}]}
---
Temperature di fusione di solidi di tipo diverso. I metalli coprono un intervallo enorme, dal mercurio, liquido a temperatura ambiente, al tungsteno; i solidi molecolari fondono a temperature basse, quelli ionici e covalenti a temperature alte.
:::

## Evaporazione e tensione di vapore {#tensione-vapore}

In un liquido le molecole hanno energie cinetiche distribuite attorno a un valore medio. Quelle vicine alla superficie e con un'energia abbastanza grande possono vincere le attrazioni delle vicine e passare nel vapore. Per questo un liquido evapora anche a temperature lontane da quella di ebollizione, e si raffredda evaporando, perché perde le sue molecole più energetiche: è il principio con cui il sudore raffredda il corpo.

In un recipiente chiuso le molecole di vapore, urtando la superficie del liquido, possono esservi ricatturate. All'inizio prevale l'evaporazione; man mano che il vapore si accumula, la velocità di condensazione cresce, finché le due velocità si uguagliano. Si raggiunge un **equilibrio dinamico**: molecole continuano a passare da una fase all'altra, ma la quantità di vapore resta costante. La pressione del vapore in equilibrio con il suo liquido si chiama **tensione di vapore**.

La tensione di vapore dipende soltanto dalla sostanza e dalla temperatura; non dipende dalla quantità di liquido né dal volume del recipiente. Cresce rapidamente con la temperatura, perché cresce la frazione di molecole con energia sufficiente per sfuggire al liquido. Per l'acqua vale $0{,}61\un{kPa}$ a $0\,^\circ\mathrm{C}$, $3{,}17\un{kPa}$ a $25\,^\circ\mathrm{C}$, $12{,}3\un{kPa}$ a $50\,^\circ\mathrm{C}$ e $101{,}4\un{kPa}$ a $100\,^\circ\mathrm{C}$. A parità di temperatura è più alta per i liquidi con forze intermolecolari deboli, che si dicono **volatili**.

::: figura tensione
{"w":640,"h":306,"items":[{"t":"axes","o":[80,250],"x":[530,""],"y":[205,""],"sx":5.0,"sy":1.6,"xt":[[0,"0"],[20,"20"],[40,"40"],[60,"60"],[80,"80"],[100,"100"]],"yt":[[25,"25"],[50,"50"],[75,"75"],[100,"100"],[125,"125"]]},{"t":"text","p":[40,30],"s":"tensione di vapore (kPa)","c":"ax","size":12,"a":"start"},{"t":"text","p":[610,292],"s":"temperatura (°C)","c":"ax","size":13,"a":"end"},{"t":"plot","o":[80,250],"sx":5.0,"sy":1.6,"pts":[[0,101.325],[104,101.325]],"c":"muted","w":1.2,"dash":true},{"t":"text","p":[86.0,79.9],"s":"1 atm","c":"muted","size":11,"a":"start"},{"t":"plot","o":[80,250],"sx":5.0,"sy":1.6,"pts":[[0.0,26.6671526],[0.50625,27.2601451],[1.0125,27.8640606],[1.51875,28.4790546],[2.025,29.1052843],[2.53125,29.7429082],[3.0375,30.3920861],[3.54375,31.0529797],[4.05,31.7257518],[4.55625,32.4105668],[5.0625,33.1075906],[5.56875,33.8169906],[6.075,34.5389357],[6.58125,35.2735962],[7.0875,36.0211439],[7.59375,36.7817524],[8.1,37.5555963],[8.60625,38.342852],[9.1125,39.1436975],[9.61875,39.9583121],[10.125,40.7868767],[10.63125,41.6295737],[11.1375,42.486587],[11.64375,43.3581021],[12.15,44.244306],[12.65625,45.145387],[13.1625,46.0615353],[13.66875,46.9929424],[14.175,47.9398014],[14.68125,48.9023068],[15.1875,49.8806549],[15.69375,50.8750433],[16.2,51.8856711],[16.70625,52.9127393],[17.2125,53.95645],[17.71875,55.017007],[18.225,56.0946159],[18.73125,57.1894834],[19.2375,58.301818],[19.74375,59.4318298],[20.25,60.5797303],[20.75625,61.7457326],[21.2625,62.9300513],[21.76875,64.1329027],[22.275,65.3545044],[22.78125,66.5950758],[23.2875,67.8548377],[23.79375,69.1340125],[24.3,70.4328241],[24.80625,71.751498],[25.3125,73.0902612],[25.81875,74.4493423],[26.325,75.8289714],[26.83125,77.2293803],[27.3375,78.6508021],[27.84375,80.0934716],[28.35,81.557625],[28.85625,83.0435004],[29.3625,84.551337],[29.86875,86.0813758],[30.375,87.6338593],[30.88125,89.2090315],[31.3875,90.8071381],[31.89375,92.428426],[32.4,94.0731439],[32.90625,95.7415421],[33.4125,97.4338722],[33.91875,99.1503875],[34.425,100.8913427],[34.93125,102.6569942],[35.4375,104.4475998],[35.94375,106.2634188],[36.45,108.1047121],[36.95625,109.9717422],[37.4625,111.864773],[37.96875,113.7840698],[38.475,115.7298996],[38.98125,117.702531],[39.4875,119.7022338],[39.99375,121.7292795],[40.5,123.7839412]],"c":"force4","w":2.4},{"t":"text","p":[288.5,55.9],"s":"etere dietilico","c":"force4","size":12,"a":"start"},{"t":"plot","o":[80,250],"sx":5.0,"sy":1.6,"pts":[[0.0,1.649112],[1.075,1.7731066],[2.15,1.9053452],[3.225,2.0463008],[4.3,2.1964691],[5.375,2.356369],[6.45,2.5265438],[7.525,2.7075618],[8.6,2.9000175],[9.675,3.1045321],[10.75,3.3217547],[11.825,3.5523633],[12.9,3.7970655],[13.975,4.0565998],[15.05,4.3317366],[16.125,4.6232788],[17.2,4.9320636],[18.275,5.2589628],[19.35,5.6048844],[20.425,5.9707736],[21.5,6.3576139],[22.575,6.7664283],[23.65,7.1982804],[24.725,7.6542757],[25.8,8.1355626],[26.875,8.6433341],[27.95,9.1788287],[29.025,9.7433315],[30.1,10.338176],[31.175,10.9647452],[32.25,11.6244727],[33.325,12.3188444],[34.4,13.0493997],[35.475,13.8177329],[36.55,14.6254948],[37.625,15.4743937],[38.7,16.3661974],[39.775,17.3027342],[40.85,18.2858947],[41.925,19.317633],[43.0,20.3999685],[44.075,21.5349874],[45.15,22.724844],[46.225,23.9717626],[47.3,25.2780387],[48.375,26.6460411],[49.45,28.0782129],[50.525,29.5770738],[51.6,31.1452211],[52.675,32.7853318],[53.75,34.5001641],[54.825,36.292559],[55.9,38.1654422],[56.975,40.1218257],[58.05,42.1648092],[59.125,44.2975826],[60.2,46.523427],[61.275,48.8457168],[62.35,51.2679212],[63.425,53.7936064],[64.5,56.426437],[65.575,59.170178],[66.65,62.0286964],[67.725,65.0059631],[68.8,68.1060548],[69.875,71.3331557],[70.95,74.6915595],[72.025,78.1856708],[73.1,81.8200074],[74.175,85.599202],[75.25,89.5280039],[76.325,93.6112809],[77.4,97.8540214],[78.475,102.2613359],[79.55,106.8384591],[80.625,111.5907514],[81.7,116.5237015],[82.775,121.6429273],[83.85,126.9541784]],"c":"force","w":2.4},{"t":"text","p":[505.2,50.9],"s":"etanolo","c":"force","size":12,"a":"start"},{"t":"plot","o":[80,250],"sx":5.0,"sy":1.6,"pts":[[0.0,0.6112128],[1.3,0.6714204],[2.6,0.7368255],[3.9,0.8078098],[5.2,0.8847778],[6.5,0.9681572],[7.8,1.0584009],[9.1,1.155987],[10.4,1.2614205],[11.7,1.3752343],[13.0,1.4979898],[14.3,1.6302788],[15.6,1.7727238],[16.9,1.9259798],[18.2,2.0907349],[19.5,2.2677119],[20.8,2.4576694],[22.1,2.6614027],[23.4,2.8797455],[24.7,3.1135706],[26.0,3.3637915],[27.3,3.6313637],[28.6,3.9172856],[29.9,4.2226],[31.2,4.5483956],[32.5,4.8958078],[33.8,5.2660203],[35.1,5.6602662],[36.4,6.0798296],[37.7,6.5260467],[39.0,7.000307],[40.3,7.5040548],[41.6,8.0387906],[42.9,8.6060719],[44.2,9.2075152],[45.5,9.8447966],[46.8,10.5196537],[48.1,11.2338865],[49.4,11.9893588],[50.7,12.7879995],[52.0,13.6318039],[53.3,14.5228348],[54.6,15.463224],[55.9,16.4551731],[57.2,17.5009555],[58.5,18.6029166],[59.8,19.763476],[61.1,20.9851278],[62.4,22.2704426],[63.7,23.6220678],[65.0,25.0427295],[66.3,26.5352333],[67.6,28.1024652],[68.9,29.7473929],[70.2,31.4730671],[71.5,33.282622],[72.8,35.1792768],[74.1,37.1663363],[75.4,39.2471923],[76.7,41.4253243],[78.0,43.7043004],[79.3,46.0877783],[80.6,48.5795063],[81.9,51.1833239],[83.2,53.903163],[84.5,56.7430481],[85.8,59.7070978],[87.1,62.7995252],[88.4,66.0246387],[89.7,69.3868426],[91.0,72.8906379],[92.3,76.5406231],[93.6,80.3414944],[94.9,84.2980469],[96.2,88.4151748],[97.5,92.6978719],[98.8,97.1512323],[100.1,101.780451],[101.4,106.5908241],[102.7,111.5877495],[104.0,116.7767273]],"c":"force2","w":2.4},{"t":"text","p":[592.0,67.2],"s":"acqua","c":"force2","size":12,"a":"end"},{"t":"circle","p":[253.0,87.9,4],"c":"force4"},{"t":"circle","p":[471.5,87.9,4],"c":"force"},{"t":"circle","p":[580.0,87.9,4],"c":"force2"}]}
---
Tensioni di vapore di etere dietilico, etanolo e acqua. La curva dell'acqua è calcolata con la formulazione di riferimento dell'IAPWS; quelle di etere ed etanolo sono stimate con l'equazione di Clausius e Clapeyron. Dove ogni curva incontra la retta di $1\un{atm}$ cade la temperatura di ebollizione normale.
:::

## L'equazione di Clausius e Clapeyron {#clausius}

La dipendenza della tensione di vapore dalla temperatura ha una forma semplice. Riportando il logaritmo della tensione di vapore in funzione dell'inverso della temperatura assoluta si ottiene, con buona approssimazione, una retta.

::: figura clapeyron
{"w":640,"h":306,"items":[{"t":"axes","o":[80,250],"x":[520,""],"y":[205,""],"sx":420,"sy":34,"xt":[[0.1,"2,7"],[0.4,"3,0"],[0.7,"3,3"],[1.0,"3,6"]],"yt":[[1,"0"],[2,"1"],[3,"2"],[4,"3"],[5,"4"]]},{"t":"text","p":[40,30],"s":"ln(P/kPa)","c":"ax","size":12,"a":"start"},{"t":"text","p":[610,292],"s":"1000/T (1/K)","c":"ax","size":13,"a":"end"},{"t":"plot","o":[80,250],"sx":420,"sy":34,"pts":[[0.02,5.9312644],[1.1,0.3044588]],"c":"force3","w":1.6,"dash":true},{"t":"circle","p":[525.6,232.7,5],"c":"force2"},{"t":"text","p":[533.6,226.7],"s":"0 °C","c":"ax","size":11,"a":"start"},{"t":"circle","p":[420.7,187.1,5],"c":"force2"},{"t":"text","p":[428.7,181.1],"s":"20 °C","c":"ax","size":11,"a":"start"},{"t":"circle","p":[329.2,148.0,5],"c":"force2"},{"t":"text","p":[337.2,142.0],"s":"40 °C","c":"ax","size":11,"a":"start"},{"t":"circle","p":[248.7,114.2,5],"c":"force2"},{"t":"text","p":[256.7,108.2],"s":"60 °C","c":"ax","size":11,"a":"start"},{"t":"circle","p":[177.3,84.8,5],"c":"force2"},{"t":"text","p":[185.3,78.8],"s":"80 °C","c":"ax","size":11,"a":"start"},{"t":"circle","p":[113.6,58.9,5],"c":"force2"},{"t":"text","p":[121.6,52.9],"s":"100 °C","c":"ax","size":11,"a":"start"},{"t":"text","p":[430,80],"s":"pendenza: −ΔH di vaporizzazione / R","c":"force3","size":12}]}
---
Logaritmo naturale della tensione di vapore dell'acqua in funzione di $1000/T$, fra $0$ e $100\,^\circ\mathrm{C}$. I punti stanno quasi su una retta, la cui pendenza è legata all'entalpia di vaporizzazione.
:::

La relazione fu ricavata dalla termodinamica da Émile Clapeyron nel 1834 e da Rudolf Clausius nel 1850. Nella forma che si usa in chimica, valida quando il vapore si comporta come un gas ideale e l'entalpia di vaporizzazione si può considerare costante, l'**equazione di Clausius e Clapeyron** è

$$\ln\frac{P_2}{P_1}=-\frac{\Delta_\mathrm{vap}H}{R}\left(\frac1{T_2}-\frac1{T_1}\right).$$

Note la tensione di vapore a una temperatura e l'entalpia di vaporizzazione, l'equazione dà la tensione di vapore a ogni altra temperatura; viceversa, due misure di tensione di vapore danno l'entalpia di vaporizzazione. Dalle tensioni di vapore dell'acqua a $20$ e a $80\,^\circ\mathrm{C}$, $2{,}34$ e $47{,}4\un{kPa}$, si ricava un'entalpia di vaporizzazione media di $43{,}2\un{kJ/mol}$, fra i valori a $25\,^\circ\mathrm{C}$, $44{,}0\un{kJ/mol}$, e a $100\,^\circ\mathrm{C}$, $40{,}7\un{kJ/mol}$: l'entalpia di vaporizzazione diminuisce un poco al crescere della temperatura, e la retta della figura è in realtà leggermente curva.

::: esempio La pentola a pressione
In una pentola a pressione la valvola mantiene una pressione assoluta di circa $2{,}0\un{bar}$. Stimare la temperatura di ebollizione dell'acqua con l'equazione di Clausius e Clapeyron, sapendo che l'acqua bolle a $373{,}15\un{K}$ alla pressione di $1{,}013\un{bar}$ e che $\Delta_\mathrm{vap}H=40{,}7\un{kJ/mol}$.

Si risolve l'equazione rispetto a $1/T_2$:
$$\frac1{T_2}=\frac1{T_1}-\frac{R}{\Delta_\mathrm{vap}H}\ln\frac{P_2}{P_1}.$$
Con $\ln(2{,}0/1{,}013)\simeq0{,}680$ il secondo termine vale $1{,}39\times10^{-4}\un{K^{-1}}$, e $1/T_2\simeq2{,}541\times10^{-3}\un{K^{-1}}$, cioè $T_2\simeq394\un{K}$, circa $120\,^\circ\mathrm{C}$. I tempi di cottura si riducono molto, perché la velocità delle reazioni chimiche della cottura cresce rapidamente con la temperatura.
:::

## L'ebollizione {#ebollizione}

Scaldando un liquido in un recipiente aperto, la tensione di vapore cresce fino a uguagliare la pressione esterna. A quel punto il vapore può formarsi anche all'interno del liquido, in bolle che salgono alla superficie: il liquido **bolle**. La temperatura di ebollizione è quindi la temperatura alla quale la tensione di vapore è uguale alla pressione esterna, e cambia con essa. La **temperatura di ebollizione normale** è quella alla pressione di $1\un{atm}$: per l'acqua è $99{,}97\,^\circ\mathrm{C}$, un valore che si arrotonda quasi sempre a $100\,^\circ\mathrm{C}$.

Durante l'ebollizione la temperatura resta costante, perché tutta l'energia fornita serve a trasformare il liquido in vapore. Una fiamma più intensa fa bollire l'acqua più vigorosamente, senza scaldarla di più: la pasta cuoce nello stesso tempo con il fuoco alto o basso, purché l'acqua continui a bollire.

In montagna la pressione atmosferica è minore, e l'acqua bolle a temperature più basse: a $3000\un{m}$ di quota, dove la pressione è circa $70\un{kPa}$, bolle a circa $90\,^\circ\mathrm{C}$; sulla vetta dell'Everest, a $33{,}7\un{kPa}$, a circa $72\,^\circ\mathrm{C}$, una temperatura alla quale un uovo non si rassoda in tempi ragionevoli. Nella pentola a pressione accade il contrario. In laboratorio si sfrutta lo stesso principio per distillare a pressione ridotta le sostanze che si decomporrebbero alla loro temperatura di ebollizione normale.

::: nota Umidità e punto di rugiada
La quantità di vapore acqueo nell'aria si esprime spesso con l'**umidità relativa**, il rapporto percentuale fra la pressione parziale del vapore e la tensione di vapore dell'acqua alla stessa temperatura. Aria a $25\,^\circ\mathrm{C}$ con umidità relativa del $60\%$ contiene vapore alla pressione parziale di $0{,}60\times3{,}17\simeq1{,}90\un{kPa}$. Se l'aria si raffredda senza cambiare composizione, la tensione di vapore diminuisce, e a circa $16{,}7\,^\circ\mathrm{C}$ diventa uguale alla pressione parziale del vapore presente: è il **punto di rugiada**, sotto il quale il vapore comincia a condensare sulle superfici fredde, come sui vetri delle finestre nelle mattine d'autunno o sulla superficie di una bottiglia appena tolta dal frigorifero.
:::

## Calore latente e curve di riscaldamento {#riscaldamento}

L'energia necessaria per far fondere o vaporizzare una sostanza a temperatura costante si chiama **calore latente**, perché non si manifesta con un aumento di temperatura. In chimica si esprime per mole, come **entalpia di fusione**, $\Delta_\mathrm{fus}H$, e **entalpia di vaporizzazione**, $\Delta_\mathrm{vap}H$. Per l'acqua valgono $6{,}01\un{kJ/mol}$ a $0\,^\circ\mathrm{C}$ e $40{,}7\un{kJ/mol}$ a $100\,^\circ\mathrm{C}$, cioè $334$ e $2257\un{J}$ per grammo. Vaporizzare l'acqua costa quasi sette volte più che fonderla: nella fusione la struttura del ghiaccio si rompe solo in parte, e le molecole restano vicine; nella vaporizzazione devono essere separate del tutto.

Fornendo calore a velocità costante a un campione di ghiaccio, inizialmente sotto lo zero, la temperatura segue una **curva di riscaldamento** fatta di tratti in salita e di tratti orizzontali. Nei tratti in salita il calore aumenta la temperatura della fase presente, in quantità $q=mc\,\Delta T$, dove $c$ è la capacità termica specifica della fase; nei tratti orizzontali il calore serve alla transizione di fase.

::: figura riscaldamento
{"w":660,"h":296,"items":[{"t":"axes","o":[80,240],"x":[540,""],"y":[205,""],"sx":1.62,"sy":1.3,"xt":[[50,"50"],[100,"100"],[150,"150"],[200,"200"],[250,"250"],[300,"300"]],"yt":[[30,"0"],[80,"50"],[130,"100"]]},{"t":"text","p":[40,30],"s":"temperatura (°C)","c":"ax","size":12,"a":"start"},{"t":"text","p":[620,282],"s":"calore fornito (kJ)","c":"ax","size":13,"a":"end"},{"t":"text","p":[71.0,231.0],"s":"−20","c":"muted","size":11,"a":"end"},{"t":"plot","o":[80,240],"sx":1.62,"sy":1.3,"pts":[[0,10],[4.18,30],[37.54,30],[79.34,130],[305.04,130],[309.04,150]],"c":"force2","w":2.6},{"t":"text","p":[123.9,191.0],"s":"fusione 33 kJ","c":"force4","size":11},{"t":"text","p":[323.0,61.0],"s":"ebollizione 226 kJ","c":"force4","size":11},{"t":"text","p":[188.6,140.0],"s":"acqua liquida","c":"muted","size":11,"a":"start"},{"t":"text","p":[97.7,231.0],"s":"ghiaccio","c":"muted","size":11,"a":"start"},{"t":"text","p":[576.6,35.0],"s":"vapore","c":"muted","size":11,"a":"end"}]}
---
Curva di riscaldamento di $100\un{g}$ di ghiaccio, da $-20$ a $120\,^\circ\mathrm{C}$, alla pressione di $1\un{atm}$. Il tratto orizzontale dell'ebollizione è quasi sette volte più lungo di quello della fusione, e richiede più calore di tutti gli altri tratti messi insieme.
:::

::: esempio Dal ghiaccio al vapore
Calcolare il calore necessario per trasformare $100\un{g}$ di ghiaccio a $-20\,^\circ\mathrm{C}$ in vapore a $120\,^\circ\mathrm{C}$, con capacità termiche specifiche di $2{,}09$, $4{,}18$ e $2{,}0\un{J/(g\,K)}$ per ghiaccio, acqua e vapore, e con i calori latenti dell'acqua.

I cinque tratti richiedono: riscaldamento del ghiaccio, $100\times2{,}09\times20\simeq4{,}2\un{kJ}$; fusione, $100\times334\un{J}\simeq33{,}4\un{kJ}$; riscaldamento dell'acqua, $100\times4{,}18\times100\simeq41{,}8\un{kJ}$; vaporizzazione, $100\times2257\un{J}\simeq225{,}7\un{kJ}$; riscaldamento del vapore, $100\times2{,}0\times20=4{,}0\un{kJ}$. Il totale è circa $309\un{kJ}$, dei quali i tre quarti servono per la sola vaporizzazione.
:::

Il calore latente spiega perché una scottatura da vapore è più grave di una da acqua bollente alla stessa temperatura: il vapore che condensa sulla pelle cede tutto il suo calore di vaporizzazione, prima ancora di raffreddarsi. Spiega anche il clima delle regioni costiere: l'acqua dei mari e dei laghi assorbe grandi quantità di calore in estate, evaporando, e lo restituisce quando il vapore condensa.

## Fusione e sottoraffreddamento {#fusione}

La temperatura di fusione di un solido cristallino è la temperatura alla quale solido e liquido sono in equilibrio. Coincide con la temperatura di solidificazione del liquido, e dipende pochissimo dalla pressione. Durante la fusione, come durante l'ebollizione, la temperatura resta costante.

Un liquido raffreddato con cura, senza scosse e senza impurezze, può però scendere sotto la temperatura di solidificazione senza solidificare: si dice **sottoraffreddato**. Per formare un cristallo serve un primo nucleo ordinato di molecole, e la sua formazione spontanea è un evento raro, che richiede un certo sottoraffreddamento. Goccioline d'acqua molto pure possono restare liquide fino a quasi $-40\,^\circ\mathrm{C}$, e le nubi alle alte quote contengono spesso goccioline sottoraffreddate, che gelano istantaneamente sulle ali degli aerei. Un granello di polvere, un cristallo già formato o un urto bastano a far partire la cristallizzazione, che allora procede rapidamente; il calore liberato riscalda il sistema fino alla temperatura di solidificazione.

::: quotidiano Lo scaldamani che si accende con un clic
Alcuni scaldamani tascabili contengono una soluzione molto concentrata di acetato di sodio e una piccola lamina metallica. Il sale, l'acetato di sodio triidrato, fonde a $58\,^\circ\mathrm{C}$, e una volta fuso resta liquido anche a temperatura ambiente, sottoraffreddato di quasi quaranta gradi. Piegando la lamina si liberano minuscoli cristalli che fanno da nuclei: la cristallizzazione si propaga in pochi secondi in tutto il sacchetto, e il calore di solidificazione porta la temperatura verso $58\,^\circ\mathrm{C}$. Per riutilizzare lo scaldamani basta immergerlo in acqua bollente fino a fondere di nuovo il sale, e lasciarlo raffreddare senza disturbarlo.
:::

## Sublimazione {#sublimazione}

Alcuni solidi passano direttamente allo stato di vapore senza fondere. Il ghiaccio secco, anidride carbonica solida, sublima a $-78{,}5\,^\circ\mathrm{C}$ alla pressione atmosferica; lo iodio, scaldato con delicatezza, produce vapori viola che si depositano in cristalli sulle superfici fredde; la naftalina scompare lentamente dagli armadi. Anche il ghiaccio sublima: la neve si assottiglia nelle giornate fredde e secche, senza mai fondere.

L'entalpia di sublimazione si ricava dalla legge di Hess, perché la sublimazione equivale a una fusione seguita da una vaporizzazione alla stessa temperatura:
$$\Delta_\mathrm{sub}H=\Delta_\mathrm{fus}H+\Delta_\mathrm{vap}H.$$
Per il ghiaccio a $0\,^\circ\mathrm{C}$, con un'entalpia di vaporizzazione a quella temperatura di $45{,}05\un{kJ/mol}$, si ottiene $51{,}06\un{kJ/mol}$, il valore usato nel capitolo precedente per stimare l'energia dei legami a idrogeno.

La sublimazione dell'acqua è alla base della **liofilizzazione**. Un alimento o un farmaco viene congelato e posto sotto vuoto; il ghiaccio sublima senza passare per il liquido, e il prodotto si secca conservando la sua struttura. Il caffè solubile, molti antibiotici e i pasti degli astronauti sono preparati così.

## Il diagramma di stato dell'acqua {#diagramma}

Lo stato di una sostanza pura dipende dalla temperatura e dalla pressione. Il **diagramma di stato**, o diagramma di fase, riassume questa dipendenza in un piano che ha la temperatura in ascissa e la pressione in ordinata. È diviso in regioni, in ciascuna delle quali è stabile un solo stato, separate da curve lungo le quali due stati coesistono in equilibrio.

::: figura diagramma-acqua
{"w":660,"h":312,"items":[{"t":"arrow","p":[80,280,80,20],"c":"ax","w":1.6,"head":9},{"t":"arrow","p":[80,280,620,280],"c":"ax","w":1.6,"head":9},{"t":"text","p":[88,28],"s":"pressione","c":"ax","size":12,"a":"start"},{"t":"text","p":[616,300],"s":"temperatura","c":"ax","size":13,"a":"end"},{"t":"poly","pts":[[100.0,278.0],[105.0,277.9],[110.0,277.7],[115.0,277.3],[120.0,276.7],[125.0,275.8],[130.0,274.7],[135.0,273.4],[140.0,271.9],[145.0,270.1],[150.0,268.0],[155.0,265.7],[160.0,263.0],[165.0,260.2],[170.0,257.0],[175.0,253.6],[180.0,249.8],[185.0,245.8],[190.0,241.5],[195.0,236.9],[200.0,232.0]],"c":"force2","w":2.4},{"t":"poly","pts":[[200.0,232.0],[216.0,228.7],[232.0,223.9],[248.0,218.2],[264.0,212.0],[280.0,205.3],[296.0,198.1],[312.0,190.6],[328.0,182.8],[344.0,174.6],[360.0,166.2],[376.0,157.5],[392.0,148.6],[408.0,139.5],[424.0,130.1],[440.0,120.5],[456.0,110.8],[472.0,100.9],[488.0,90.7],[504.0,80.5],[520.0,70.0]],"c":"force2","w":2.4},{"t":"poly","pts":[[200,232],[187.9,30]],"c":"force2","w":2.4},{"t":"circle","p":[200,232,5],"c":"force"},{"t":"circle","p":[520,70,5],"c":"force4"},{"t":"line","p":[80,150,600,150],"c":"muted","w":1.2,"dash":true},{"t":"text","p":[606,146],"s":"1 atm","c":"muted","size":11,"a":"end"},{"t":"circle","p":[195.1,150,4],"c":"ax"},{"t":"text","p":[187.1,142],"s":"0 °C","c":"ax","size":11,"a":"end"},{"t":"circle","p":[389.5,150,4],"c":"ax"},{"t":"text","p":[399.5,168],"s":"100 °C","c":"ax","size":11,"a":"start"},{"t":"text","p":[130,110],"s":"solido","c":"ax","size":12},{"t":"text","p":[330,110],"s":"liquido","c":"ax","size":12},{"t":"text","p":[420,250],"s":"vapore","c":"ax","size":12},{"t":"text","p":[214,250],"s":"punto triplo","c":"force","size":12,"a":"start"},{"t":"text","p":[214,266],"s":"0,01 °C · 0,61 kPa","c":"muted","size":12,"a":"start"},{"t":"text","p":[528,66],"s":"punto critico","c":"force4","size":12,"a":"start"},{"t":"text","p":[528,82],"s":"374 °C · 221 bar","c":"muted","size":12,"a":"start"}]}
---
Diagramma di stato dell'acqua, non in scala. Le tre curve separano solido, liquido e vapore e si incontrano nel punto triplo; la curva di vaporizzazione termina nel punto critico. La curva di fusione è inclinata all'indietro, perché il ghiaccio è meno denso dell'acqua.
:::

La curva fra liquido e vapore è la curva della tensione di vapore: lungo di essa liquido e vapore coesistono, e la sua intersezione con la retta di $1\un{atm}$ dà la temperatura di ebollizione normale. La curva fra solido e vapore è la curva di sublimazione, quella fra solido e liquido la curva di fusione. Le tre curve si incontrano nel **punto triplo**, l'unica combinazione di temperatura e pressione alla quale le tre fasi coesistono in equilibrio: per l'acqua, $0{,}01\,^\circ\mathrm{C}$ e $611{,}657\un{Pa}$. Fino al 2019 la temperatura del punto triplo dell'acqua, $273{,}16\un{K}$ esatti, definiva il kelvin.

La curva di vaporizzazione termina nel **punto critico**, per l'acqua a $374\,^\circ\mathrm{C}$ e $221\un{bar}$. Avvicinandosi al punto critico lungo la curva, la densità del vapore cresce e quella del liquido diminuisce, finché diventano uguali e la superficie di separazione fra le due fasi scompare. Oltre il punto critico non esiste più distinzione fra liquido e gas.

La curva di fusione dell'acqua ha una particolarità. Per quasi tutte le sostanze il solido è più denso del liquido, e un aumento di pressione favorisce il solido: la curva di fusione si inclina verso destra, e la temperatura di fusione sale con la pressione. Il ghiaccio, invece, è meno denso dell'acqua, e un aumento di pressione favorisce il liquido: la curva si inclina verso sinistra, e la temperatura di fusione scende, anche se di pochissimo.

::: approfondimento Quanto scende la temperatura di fusione del ghiaccio
L'equazione di Clapeyron, nella sua forma generale, dà la pendenza di una curva di equilibrio fra due fasi:
$$\frac{\mathrm dT}{\mathrm dP}=\frac{T\,\Delta V}{\Delta H},$$
dove $\Delta V$ e $\Delta H$ sono le variazioni di volume e di entalpia della transizione. Per la fusione del ghiaccio a $273{,}15\un{K}$, il volume molare passa da $19{,}65$ a $18{,}02\un{cm^3/mol}$, con $\Delta V=-1{,}63\times10^{-6}\un{m^3/mol}$, e $\Delta H=6010\un{J/mol}$. La pendenza vale circa $-7{,}4\times10^{-8}\un{K/Pa}$, cioè $-0{,}0074\un{K/bar}$: per abbassare di un grado la temperatura di fusione servono circa $135\un{bar}$. Si capisce così perché la curva di fusione nel diagramma è quasi verticale.
:::

## L'anidride carbonica e i fluidi supercritici {#supercritico}

Il diagramma di stato dell'anidride carbonica ha la forma più comune, con la curva di fusione inclinata verso destra. Il suo punto triplo, però, si trova a $5{,}18\un{bar}$, cinque volte la pressione atmosferica. Alla pressione di $1\un{atm}$ la retta orizzontale del diagramma passa sotto il punto triplo, e incontra soltanto la curva di sublimazione: l'anidride carbonica solida, scaldata all'aria, passa direttamente a vapore a $-78{,}5\,^\circ\mathrm{C}$. L'anidride carbonica liquida esiste soltanto sopra $5{,}18\un{bar}$; nelle bombole a temperatura ambiente si trova in equilibrio con il suo vapore alla pressione di circa $64\un{bar}$.

::: figura diagramma-co2
{"w":660,"h":312,"items":[{"t":"arrow","p":[80,280,80,20],"c":"ax","w":1.6,"head":9},{"t":"arrow","p":[80,280,620,280],"c":"ax","w":1.6,"head":9},{"t":"text","p":[88,28],"s":"pressione","c":"ax","size":12,"a":"start"},{"t":"text","p":[616,300],"s":"temperatura","c":"ax","size":13,"a":"end"},{"t":"poly","pts":[[100.0,278.0],[107.5,277.8],[115.0,277.0],[122.5,275.5],[130.0,273.4],[137.5,270.4],[145.0,266.7],[152.5,262.1],[160.0,256.7],[167.5,250.4],[175.0,243.2],[182.5,235.1],[190.0,226.0],[197.5,216.0],[205.0,205.0],[212.5,193.0],[220.0,180.1],[227.5,166.1],[235.0,151.1],[242.5,135.1],[250.0,118.0]],"c":"force2","w":2.4},{"t":"poly","pts":[[250.0,118.0],[257.5,116.9],[265.0,115.2],[272.5,113.2],[280.0,111.1],[287.5,108.8],[295.0,106.3],[302.5,103.7],[310.0,101.0],[317.5,98.2],[325.0,95.3],[332.5,92.3],[340.0,89.2],[347.5,86.0],[355.0,82.8],[362.5,79.5],[370.0,76.1],[377.5,72.7],[385.0,69.2],[392.5,65.6],[400.0,62.0]],"c":"force2","w":2.4},{"t":"poly","pts":[[250,118],[260.6,30]],"c":"force2","w":2.4},{"t":"circle","p":[250,118,5],"c":"force"},{"t":"circle","p":[400,62,5],"c":"force4"},{"t":"line","p":[80,214,600,214],"c":"muted","w":1.2,"dash":true},{"t":"text","p":[606,210],"s":"1 atm","c":"muted","size":11,"a":"end"},{"t":"circle","p":[198.9,214,4],"c":"ax"},{"t":"text","p":[206.9,234],"s":"−78,5 °C: sublimazione","c":"ax","size":11,"a":"start"},{"t":"text","p":[150,90],"s":"solido","c":"ax","size":12},{"t":"text","p":[335,60],"s":"liquido","c":"ax","size":12},{"t":"text","p":[440,200],"s":"vapore","c":"ax","size":12},{"t":"text","p":[234,98],"s":"punto triplo","c":"force","size":12,"a":"end"},{"t":"text","p":[234,114],"s":"−56,6 °C · 5,18 bar","c":"muted","size":12,"a":"end"},{"t":"text","p":[408,40],"s":"punto critico","c":"force4","size":12,"a":"start"},{"t":"text","p":[408,56],"s":"31,0 °C · 73,8 bar","c":"muted","size":12,"a":"start"},{"t":"text","p":[540,110],"s":"fluido supercritico","c":"force3","size":12}]}
---
Diagramma di stato dell'anidride carbonica, non in scala. Il punto triplo si trova sopra la pressione atmosferica, e alla pressione di $1\un{atm}$ il solido sublima. Oltre il punto critico la sostanza è un fluido supercritico.
:::

Il punto critico dell'anidride carbonica, a $31{,}0\,^\circ\mathrm{C}$ e $73{,}8\un{bar}$, è facile da raggiungere. Oltre di esso la sostanza è un **fluido supercritico**, con una densità vicina a quella di un liquido e una viscosità e una capacità di diffondere vicine a quelle di un gas. L'anidride carbonica supercritica è un ottimo solvente per molte sostanze apolari, si elimina semplicemente riportando la pressione a quella atmosferica e non lascia residui tossici. È usata per decaffeinare il caffè, un processo messo a punto negli anni Settanta in Germania, per estrarre aromi e oli essenziali e, nel lavaggio a secco, al posto dei solventi clorurati.

::: storia Andrews e la continuità fra liquido e gas
Nel 1869 Thomas Andrews, professore a Belfast, presentò alla Royal Society le sue misure sull'anidride carbonica compressa in un sottile tubo di vetro, a temperature diverse. Sotto i $31\,^\circ\mathrm{C}$, comprimendo il gas, vedeva comparire a una certa pressione un menisco, la superficie di un liquido, che cresceva finché tutto il gas era condensato. Sopra i $31\,^\circ\mathrm{C}$ il menisco restava assente a ogni pressione, e la sostanza si comprimeva con continuità, da gas rarefatto a fluido denso, senza mai separarsi in due fasi. Andrews chiamò questa temperatura **punto critico**, e mostrò che liquido e gas sono due forme di un unico stato fluido. Quattro anni dopo van der Waals ne diede la prima spiegazione teorica, con la sua equazione di stato; la sua tesi aveva per titolo, appunto, *Sulla continuità dello stato gassoso e liquido*.
:::

## Errori frequenti {#errori}

::: errore L'acqua bolle sempre a 100 gradi
La temperatura di ebollizione dipende dalla pressione esterna. A $1\un{atm}$ l'acqua bolle a $99{,}97\,^\circ\mathrm{C}$; in montagna a temperature più basse, in una pentola a pressione a temperature più alte.
:::

::: errore Le bolle contengono aria
Le bolle che si formano nell'acqua che bolle sono fatte di vapore acqueo. Le piccole bolle che compaiono sul fondo della pentola molto prima dell'ebollizione contengono invece l'aria disciolta, che diventa meno solubile al crescere della temperatura.
:::

::: errore La tensione di vapore dipende dalla quantità di liquido
Un bicchiere e una piscina d'acqua alla stessa temperatura hanno la stessa tensione di vapore. Dalla superficie dipende la velocità con cui si raggiunge l'equilibrio, e la tensione di vapore resta una proprietà della sostanza e della temperatura.
:::

::: errore Il pattinatore scivola sull'acqua fusa dalla pressione
Una pressione di qualche decina di bar, quella di un pattinatore sulle lame, abbassa la temperatura di fusione del ghiaccio di qualche decimo di grado; si pattina benissimo a $-10\,^\circ\mathrm{C}$. Lo strato liquido che lubrifica le lame si deve all'attrito e a un sottile strato di molecole poco ordinate, presente sulla superficie del ghiaccio anche sotto lo zero.
:::

::: errore Il calore latente scompare
Durante una transizione di fase il calore fornito resta nel sistema, sotto forma di energia potenziale delle molecole, che si allontanano vincendo le attrazioni. Lo stesso calore viene restituito quando la transizione si inverte.
:::

## Sintesi {#sintesi}

::: sintesi Che cosa portare con sé
- Solidi, liquidi e gas differiscono per l'ordine e la libertà di movimento delle particelle; liquidi e solidi hanno densità simili, i gas densità migliaia di volte minori.
- I solidi cristallini si classificano in molecolari, ionici, covalenti e metallici; i solidi amorfi non hanno una temperatura di fusione netta.
- La tensione di vapore è la pressione del vapore in equilibrio dinamico con il suo liquido; dipende soltanto dalla sostanza e dalla temperatura.
- L'equazione di Clausius e Clapeyron lega il logaritmo della tensione di vapore all'inverso della temperatura, con pendenza $-\Delta_\mathrm{vap}H/R$.
- Un liquido bolle quando la sua tensione di vapore uguaglia la pressione esterna; la temperatura di ebollizione cambia con la pressione.
- Durante fusione ed ebollizione la temperatura resta costante; il calore scambiato è il calore latente. Per l'acqua $\Delta_\mathrm{fus}H=6{,}01\un{kJ/mol}$ e $\Delta_\mathrm{vap}H=40{,}7\un{kJ/mol}$.
- Un liquido può essere sottoraffreddato sotto la temperatura di solidificazione, finché un nucleo non avvia la cristallizzazione.
- L'entalpia di sublimazione è la somma delle entalpie di fusione e di vaporizzazione alla stessa temperatura.
- Il diagramma di stato mostra le regioni di stabilità delle fasi; il punto triplo è l'unico in cui le tre fasi coesistono, il punto critico chiude la curva di vaporizzazione.
- La curva di fusione dell'acqua è inclinata all'indietro perché il ghiaccio è meno denso del liquido; il punto triplo dell'anidride carbonica è sopra $1\un{atm}$, e il ghiaccio secco sublima.
:::

## Glossario {#glossario}

- **Transizione di fase**: passaggio di una sostanza da uno stato di aggregazione a un altro.
- **Solido cristallino**: solido con le particelle disposte in un reticolo regolare.
- **Solido amorfo**: solido con le particelle disposte in modo disordinato.
- **Solido covalente**: solido in cui tutti gli atomi sono legati da legami covalenti in un'unica rete.
- **Evaporazione**: passaggio allo stato di vapore delle molecole della superficie di un liquido.
- **Tensione di vapore**: pressione del vapore in equilibrio con il suo liquido, o con il suo solido, a una data temperatura.
- **Liquido volatile**: liquido con tensione di vapore alta a temperatura ambiente.
- **Equazione di Clausius e Clapeyron**: relazione fra tensione di vapore, temperatura ed entalpia di vaporizzazione.
- **Temperatura di ebollizione normale**: temperatura alla quale la tensione di vapore è uguale a $1\un{atm}$.
- **Calore latente**: calore scambiato in una transizione di fase a temperatura costante.
- **Curva di riscaldamento**: grafico della temperatura in funzione del calore fornito.
- **Sottoraffreddamento**: permanenza di un liquido allo stato liquido sotto la temperatura di solidificazione.
- **Sublimazione**: passaggio diretto da solido a vapore; il processo inverso è il brinamento.
- **Punto di rugiada**: temperatura alla quale il vapore presente nell'aria comincia a condensare.
- **Diagramma di stato**: grafico che indica la fase stabile di una sostanza in funzione di temperatura e pressione.
- **Punto triplo**: temperatura e pressione alle quali coesistono in equilibrio solido, liquido e vapore.
- **Punto critico**: estremo della curva di vaporizzazione, oltre il quale liquido e gas non si distinguono.
- **Fluido supercritico**: stato di una sostanza oltre il suo punto critico.

## Esercizi {#esercizi}

Dati utili: $R=8{,}314\un{J/(mol\,K)}$. Acqua: $\Delta_\mathrm{fus}H=6{,}01\un{kJ/mol}$, cioè $334\un{J/g}$; $\Delta_\mathrm{vap}H=40{,}7\un{kJ/mol}$ a $100\,^\circ\mathrm{C}$, cioè $2257\un{J/g}$; capacità termiche specifiche $2{,}09$, $4{,}18$ e $2{,}0\un{J/(g\,K)}$ per ghiaccio, acqua e vapore. Tensioni di vapore dell'acqua: $2{,}34\un{kPa}$ a $20\,^\circ\mathrm{C}$, $3{,}17\un{kPa}$ a $25\,^\circ\mathrm{C}$, $47{,}4\un{kPa}$ a $80\,^\circ\mathrm{C}$.

::: esercizio Classificare i solidi [base]
Classificare come molecolari, ionici, covalenti o metallici i solidi $\mathrm{KBr}$, $\mathrm{CO_2}$ solida, diamante, alluminio, saccarosio e quarzo, e indicare quale dei sei conduce la corrente allo stato solido.
>>> soluzione
$\mathrm{KBr}$ è ionico; l'anidride carbonica solida e il saccarosio sono molecolari; il diamante e il quarzo sono covalenti; l'alluminio è metallico, ed è l'unico che conduce la corrente allo stato solido.
:::

::: esercizio Fondere il ghiaccio [base]
Calcolare il calore necessario per fondere $50{,}0\un{g}$ di ghiaccio a $0\,^\circ\mathrm{C}$ e per portare poi l'acqua ottenuta a $20\,^\circ\mathrm{C}$.
>>> soluzione
La fusione richiede $50{,}0\times334\simeq16{,}7\un{kJ}$; il riscaldamento $50{,}0\times4{,}18\times20\simeq4{,}2\un{kJ}$. In tutto circa $20{,}9\un{kJ}$, quattro quinti dei quali per la fusione.
:::

::: esercizio Leggere il diagramma [base]
Con il diagramma di stato dell'acqua, indicare la fase stabile a $1\un{atm}$ e $-10\,^\circ\mathrm{C}$, a $1\un{atm}$ e $50\,^\circ\mathrm{C}$, a $0{,}3\un{kPa}$ e $-5\,^\circ\mathrm{C}$, a $300\un{bar}$ e $400\,^\circ\mathrm{C}$.
>>> soluzione
A $1\un{atm}$: solido a $-10\,^\circ\mathrm{C}$, liquido a $50\,^\circ\mathrm{C}$. A $0{,}3\un{kPa}$, sotto la pressione del punto triplo, il ghiaccio a $-5\,^\circ\mathrm{C}$ è stabile soltanto se la pressione supera la sua tensione di vapore, circa $0{,}4\un{kPa}$; a $0{,}3\un{kPa}$ la fase stabile è il vapore, e il ghiaccio sublima. A $300\un{bar}$ e $400\,^\circ\mathrm{C}$, oltre il punto critico, l'acqua è un fluido supercritico.
:::

::: esercizio Cucinare in montagna [base]
Spiegare perché in alta montagna la pasta cuoce più lentamente, anche con la fiamma al massimo.
>>> soluzione
In quota la pressione atmosferica è minore, e l'acqua bolle quando la sua tensione di vapore raggiunge quel valore minore, cioè a temperatura più bassa. Aumentare la fiamma fa bollire l'acqua più vigorosamente senza alzarne la temperatura; le reazioni della cottura, più lente a temperatura minore, richiedono più tempo.
:::

::: esercizio Tre liquidi a confronto [base]
A $20\,^\circ\mathrm{C}$ le tensioni di vapore di acqua, etanolo ed etere dietilico sono circa $2{,}3$, $5{,}9$ e $59\un{kPa}$. Ordinare i tre liquidi per volatilità e per intensità delle forze intermolecolari, e prevedere l'ordine delle temperature di ebollizione.
>>> soluzione
L'etere è il più volatile, l'acqua il meno. Le forze intermolecolari seguono l'ordine inverso: l'acqua forma una rete estesa di legami a idrogeno, l'etanolo ne forma meno, l'etere, privo di idrogeni legati all'ossigeno, nessuno fra le proprie molecole. Le temperature di ebollizione crescono dall'etere, $34{,}6\,^\circ\mathrm{C}$, all'etanolo, $78{,}3\,^\circ\mathrm{C}$, all'acqua.
:::

::: esercizio Il ghiaccio diventa vapore [medio]
Calcolare il calore necessario per trasformare $25{,}0\un{g}$ di ghiaccio a $-10\,^\circ\mathrm{C}$ in vapore a $100\,^\circ\mathrm{C}$. Quale frazione serve per la sola vaporizzazione?
>>> soluzione
Riscaldamento del ghiaccio: $25{,}0\times2{,}09\times10\simeq0{,}52\un{kJ}$; fusione: $25{,}0\times334\simeq8{,}35\un{kJ}$; riscaldamento dell'acqua: $25{,}0\times4{,}18\times100\simeq10{,}45\un{kJ}$; vaporizzazione: $25{,}0\times2257\simeq56{,}4\un{kJ}$. Il totale è circa $75{,}7\un{kJ}$, il $75\%$ del quale per la vaporizzazione.
:::

::: esercizio La tensione di vapore dell'etanolo [medio]
L'etanolo bolle a $78{,}3\,^\circ\mathrm{C}$ a $1\un{atm}$, e la sua entalpia di vaporizzazione vale circa $42{,}3\un{kJ/mol}$ a $25\,^\circ\mathrm{C}$. Stimare la tensione di vapore a $25\,^\circ\mathrm{C}$ e confrontarla con il valore misurato, $7{,}87\un{kPa}$.
>>> soluzione
Il rapporto $\Delta_\mathrm{vap}H/R$ vale $5088\un{K}$ e la differenza $1/298{,}15-1/351{,}45$ vale $5{,}09\times10^{-4}\un{K^{-1}}$, quindi $\ln(P/101{,}3\un{kPa})\simeq-2{,}59$ e $P\simeq101{,}3\times0{,}075\simeq7{,}6\un{kPa}$, il $3\%$ in meno del valore misurato. L'errore nasce dall'aver considerato costante l'entalpia di vaporizzazione, che a $78\,^\circ\mathrm{C}$ è minore.
:::

::: esercizio Il punto di rugiada [medio]
In una stanza a $25\,^\circ\mathrm{C}$ l'umidità relativa è del $50\%$. Calcolare la pressione parziale del vapore acqueo. Sapendo che la tensione di vapore dell'acqua è $1{,}60\un{kPa}$ a $14\,^\circ\mathrm{C}$ e $1{,}71\un{kPa}$ a $15\,^\circ\mathrm{C}$, stimare il punto di rugiada.
>>> soluzione
La pressione parziale è $0{,}50\times3{,}17\simeq1{,}59\un{kPa}$. È appena sotto la tensione di vapore a $14\,^\circ\mathrm{C}$, e il punto di rugiada è circa $13{,}9\,^\circ\mathrm{C}$: una superficie più fredda di così si appanna.
:::

::: esercizio Vapore e acqua bollente sulla pelle [medio]
Confrontare il calore ceduto alla pelle, a $37\,^\circ\mathrm{C}$, da $10{,}0\un{g}$ di vapore a $100\,^\circ\mathrm{C}$ che condensano e si raffreddano fino a $37\,^\circ\mathrm{C}$, e da $10{,}0\un{g}$ di acqua a $100\,^\circ\mathrm{C}$ che si raffreddano fino a $37\,^\circ\mathrm{C}$.
>>> soluzione
L'acqua cede $10{,}0\times4{,}18\times63\simeq2{,}6\un{kJ}$. Il vapore cede in più il calore di condensazione, $10{,}0\times2257\simeq22{,}6\un{kJ}$, per un totale di circa $25{,}2\un{kJ}$, quasi dieci volte tanto.
:::

::: esercizio Il ghiaccio secco [medio]
Spiegare, con i dati del punto triplo, perché il ghiaccio secco sublima all'aria mentre il ghiaccio d'acqua fonde. Che cosa si dovrebbe fare per ottenere anidride carbonica liquida?
>>> soluzione
Il punto triplo dell'anidride carbonica si trova a $5{,}18\un{bar}$: a pressioni inferiori, compresa quella atmosferica, il liquido non è stabile a nessuna temperatura, e il solido passa direttamente al vapore. Il punto triplo dell'acqua si trova a $0{,}006\un{bar}$, molto sotto la pressione atmosferica, e a $1\un{atm}$ il ghiaccio fonde. Per avere anidride carbonica liquida bisogna portarla sopra $5{,}18\un{bar}$ e fra $-56{,}6$ e $31{,}0\,^\circ\mathrm{C}$; a $25\,^\circ\mathrm{C}$ condensa a circa $64\un{bar}$.
:::

::: esercizio L'entalpia di vaporizzazione da due misure [avanzato]
Con le tensioni di vapore dell'acqua a $20$ e a $80\,^\circ\mathrm{C}$ calcolare l'entalpia di vaporizzazione media nell'intervallo, e spiegare perché il risultato è compreso fra i valori a $25$ e a $100\,^\circ\mathrm{C}$, $44{,}0$ e $40{,}7\un{kJ/mol}$.
>>> soluzione
$\Delta_\mathrm{vap}H=R\ln(P_2/P_1)/(1/T_1-1/T_2)$, con $\ln(47{,}4/2{,}34)\simeq3{,}009$ e $1/293{,}15-1/353{,}15\simeq5{,}796\times10^{-4}\un{K^{-1}}$. Si ottiene circa $43{,}2\un{kJ/mol}$. L'entalpia di vaporizzazione diminuisce al crescere della temperatura, e la misura su un intervallo dà un valore medio relativo alla zona centrale.
:::

::: esercizio La pressione del pattinatore [avanzato]
Un pattinatore di $70\un{kg}$ appoggia il suo peso su una lama con un'area di contatto di $2{,}0\un{cm^2}$. Calcolare la pressione esercitata e l'abbassamento della temperatura di fusione del ghiaccio, con la pendenza $-0{,}0074\un{K/bar}$. Che cosa se ne conclude?
>>> soluzione
La pressione vale $70\times9{,}81/2{,}0\times10^{-4}\simeq3{,}4\times10^6\un{Pa}$, cioè $34\un{bar}$. La temperatura di fusione scende di circa $34\times0{,}0074\simeq0{,}25\un{K}$. A $-10\,^\circ\mathrm{C}$ il ghiaccio resterebbe ben lontano dalla fusione: la pressione delle lame spiega una parte trascurabile della facilità con cui si pattina.
:::

::: esercizio Acqua sottoraffreddata che gela [avanzato]
Un recipiente isolato contiene $100\un{g}$ di acqua sottoraffreddata a $-10\,^\circ\mathrm{C}$. Una scossa avvia la cristallizzazione. Quale frazione dell'acqua gela prima che il sistema raggiunga $0\,^\circ\mathrm{C}$? Usare per l'acqua sottoraffreddata una capacità termica specifica di $4{,}2\un{J/(g\,K)}$.
>>> soluzione
Il calore liberato dalla solidificazione di una massa $m$, $334\,m$, riscalda tutto il sistema da $-10$ a $0\,^\circ\mathrm{C}$: circa $100\times4{,}2\times10=4{,}2\un{kJ}$. Quindi $m\simeq4200/334\simeq12{,}6\un{g}$: gela circa un ottavo dell'acqua, e il resto rimane liquido a $0\,^\circ\mathrm{C}$, in equilibrio con il ghiaccio formato.
:::

::: esercizio La sublimazione con la legge di Hess [avanzato]
L'entalpia di vaporizzazione dell'acqua vale $45{,}05\un{kJ/mol}$ a $0\,^\circ\mathrm{C}$. Calcolare l'entalpia di sublimazione del ghiaccio e il calore necessario per liofilizzare un alimento che contiene $200\un{g}$ di ghiaccio.
>>> soluzione
$\Delta_\mathrm{sub}H=6{,}01+45{,}05=51{,}06\un{kJ/mol}$. Duecento grammi di ghiaccio sono $200/18{,}015\simeq11{,}1\un{mol}$, e la sublimazione richiede circa $567\un{kJ}$, più di quanto servirebbe a fondere il ghiaccio e scaldare l'acqua fino all'ebollizione.
:::

::: esercizio Bollire sull'Everest [avanzato]
Sulla vetta dell'Everest la pressione è circa $33{,}7\un{kPa}$. Stimare la temperatura di ebollizione dell'acqua con l'equazione di Clausius e Clapeyron, con $\Delta_\mathrm{vap}H=40{,}7\un{kJ/mol}$ e il punto di ebollizione normale $373{,}15\un{K}$ a $101{,}3\un{kPa}$. Il valore esatto è circa $72\,^\circ\mathrm{C}$: perché la stima è un poco più bassa?
>>> soluzione
Con $\ln(33{,}7/101{,}3)\simeq-1{,}100$ e $R/\Delta_\mathrm{vap}H\simeq2{,}04\times10^{-4}\un{K^{-1}}$ il termine correttivo vale $+2{,}25\times10^{-4}\un{K^{-1}}$; quindi $1/T_2\simeq2{,}905\times10^{-3}\un{K^{-1}}$ e $T_2\simeq344{,}3\un{K}$, circa $71\,^\circ\mathrm{C}$. Fra $72$ e $100\,^\circ\mathrm{C}$ l'entalpia di vaporizzazione è maggiore del valore usato, quello a $100\,^\circ\mathrm{C}$; con un valore medio di circa $41{,}9\un{kJ/mol}$ la stessa equazione dà $71{,}9\,^\circ\mathrm{C}$, in accordo con il valore esatto.
:::

## Fonti {#fonti}

Il testo, le figure, gli esempi e gli esercizi di questo capitolo sono originali. Per la scelta e l'ordine degli argomenti il riferimento principale è il manuale di R. H. Petrucci, F. G. Herring, J. D. Madura e C. Bissonnette, *General Chemistry: Principles and Modern Applications*, 11ª edizione, Pearson Canada, Toronto, 2017, paragrafi 12-2–12-5. I dati numerici provengono dalle fonti seguenti.

1. Tensione di vapore dell'acqua: W. Wagner e A. Pruss, J. Phys. Chem. Ref. Data 22 (1993) 783, equazione di riferimento adottata dall'IAPWS; punto triplo e punto critico dell'acqua: IAPWS. Entalpie di fusione, vaporizzazione e sublimazione dell'acqua: IAPWS e tabelle correnti.
2. Punto triplo, punto critico e tensione di vapore dell'anidride carbonica: R. Span e W. Wagner, J. Phys. Chem. Ref. Data 25 (1996) 1509, nella versione del NIST Chemistry WebBook.
3. Temperature di fusione e di ebollizione, tensioni di vapore ed entalpie di vaporizzazione dell'etanolo e dell'etere dietilico, capacità termiche: CRC Handbook of Chemistry and Physics.
4. Pressione sulla vetta dell'Everest: J. B. West e altri, J. Appl. Physiol. 55 (1983) 678. Temperatura di fusione dell'acetato di sodio triidrato e sottoraffreddamento dell'acqua: tabelle correnti e letteratura sulla nucleazione omogenea.
5. Per la storia: É. Clapeyron (1834); R. Clausius (1850); T. Andrews, Phil. Trans. R. Soc. 159 (1869) 575; J. D. van der Waals (1873).
