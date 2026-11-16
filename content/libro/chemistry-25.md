---
unit: chemistry-25
titolo: Polimeri e materiali
sottotitolo: Monomeri e polimeri, polimerizzazione per addizione e per condensazione, massa molare media, struttura e proprietà dei materiali, polimeri naturali, plastica e ambiente
volume: Volume di chimica
fonte: Testo originale; riferimento principale Petrucci et al., General Chemistry, 11ª ed., §27-8 e 26-7
---

## Prima di cominciare {#apertura}

Una bottiglia d'acqua, una corda da arrampicata, il cotone di una maglietta, la gomma di uno pneumatico e il DNA di una cellula hanno qualcosa in comune: sono fatti di molecole lunghissime, catene di migliaia o milioni di unità uguali o simili, legate l'una all'altra con legami covalenti. Queste molecole giganti si chiamano **macromolecole** o **polimeri**, dal greco *polýs*, molti, e *méros*, parte.

L'idea che esistessero davvero non fu accolta subito. Fino agli anni Venti del Novecento molti chimici pensavano che la gomma, la cellulosa e le proteine fossero aggregati di piccole molecole tenute insieme da forze deboli, come le particelle di un colloide. Il chimico tedesco Hermann Staudinger sostenne invece, dal 1920, che fossero molecole vere, con catene di atomi uniti da legami covalenti. La sua tesi, discussa per anni e confermata dalle misure di massa molare e dalla diffrazione dei raggi X, gli valse il premio Nobel per la chimica nel 1953. Nel frattempo i polimeri di sintesi, dalla bachelite al nylon al polietilene, avevano cambiato la vita quotidiana.

Questo capitolo applica la chimica organica del capitolo [Chimica organica e scheletri carboniosi](unit:chemistry-24) alle macromolecole. Descrive i due grandi meccanismi con cui si formano i polimeri, l'addizione e la condensazione, spiega perché la massa molare di un polimero è sempre una media, collega la struttura delle catene alle proprietà dei materiali, presenta i principali polimeri naturali e discute il destino della plastica nell'ambiente.

::: obiettivi
- definire monomero, polimero, unità ripetuta e grado di polimerizzazione;
- descrivere la polimerizzazione per addizione e il suo meccanismo a catena con radicali;
- descrivere la polimerizzazione per condensazione e riconoscere poliesteri e poliammidi;
- spiegare con l'equazione di Carothers perché la condensazione richiede reazioni quasi complete;
- calcolare la massa molare media numerica e ponderale e la dispersità di un campione;
- collegare ramificazione, cristallinità, reticolazione e temperatura di transizione vetrosa alle proprietà dei materiali;
- riconoscere i principali polimeri naturali e le loro unità;
- discutere i problemi ambientali legati alla plastica e le strategie di riciclo.
:::

Il capitolo usa i gruppi funzionali, l'isomeria cis-trans e la chiralità del capitolo [Chimica organica e scheletri carboniosi](unit:chemistry-24), le forze intermolecolari del capitolo [Forze intermolecolari](unit:chemistry-09) e la stechiometria del capitolo [Stechiometria e reagente limitante](unit:chemistry-14).

## Monomeri, polimeri e unità ripetute {#definizioni}

Un **polimero** è una molecola formata dall'unione di molte unità più piccole, legate in sequenza da legami covalenti. Le piccole molecole da cui si parte si chiamano **monomeri**. La porzione di catena che si ripete, in molti polimeri corrispondente a un monomero, è l'**unità ripetuta**, e il numero di unità in una catena è il **grado di polimerizzazione**.

::: figura catena
{"w":640,"h":250,"items":[{"t":"text","p":[60,60],"s":"CH₂=CH₂","c":"force2","size":13},{"t":"text","p":[140,60],"s":"CH₂=CH₂","c":"force2","size":13},{"t":"text","p":[220,60],"s":"CH₂=CH₂","c":"force2","size":13},{"t":"text","p":[300,60],"s":"CH₂=CH₂","c":"force2","size":13},{"t":"text","p":[370,60],"s":"…","c":"ax","size":16},{"t":"arrow","p":[330,84,330,124],"c":"ax","w":2,"head":9},{"t":"text","p":[342,108],"s":"polimerizzazione","c":"muted","size":11,"a":"start"},{"t":"poly","pts":[[60,170],[108,184],[156,170],[204,184],[252,170],[300,184],[348,170],[396,184],[444,170],[492,184],[540,170],[588,184]],"c":"force4","w":2.6},{"t":"text","p":[40,182],"s":"…","c":"ax","size":16,"a":"end"},{"t":"text","p":[612,182],"s":"…","c":"ax","size":16,"a":"start"},{"t":"poly","pts":[[156,206],[156,214],[252,214],[252,206]],"c":"force3","w":1.6},{"t":"text","p":[204,234],"s":"unità ripetuta  –CH₂–CH₂–","c":"force3","size":12},{"t":"text","p":[470,234],"s":"n può superare 10 000","c":"muted","size":11}]}
---
Dalla molecola di etilene alla catena di polietilene. Il doppio legame di ogni monomero si apre e diventa un legame semplice con l'unità vicina; l'unità ripetuta è $\mathrm{{-}CH_2{-}CH_2{-}}$, e una catena tipica ne contiene da alcune migliaia a centinaia di migliaia.
:::

Nel polietilene l'unità ripetuta è $\mathrm{{-}CH_2{-}CH_2{-}}$, con massa molare di $28{,}05\un{g/mol}$. Una catena con massa molare di $280\,000\un{g/mol}$, valore tipico per un polietilene da contenitori, contiene circa diecimila unità. La massa molare dei polimeri sintetici va da qualche migliaio a diversi milioni di grammi per mole; quella dei polimeri naturali può essere ancora maggiore: una molecola di DNA di un cromosoma umano supera i cento miliardi di grammi per mole.

Un polimero formato da un solo tipo di monomero è un **omopolimero**; uno formato da due o più monomeri diversi è un **copolimero**. Nei copolimeri le unità possono alternarsi in modo regolare, disporsi a caso lungo la catena, oppure formare lunghi tratti dello stesso tipo, detti blocchi. La gomma sintetica degli pneumatici, per esempio, è in gran parte un copolimero di stirene e butadiene.

## La polimerizzazione per addizione {#addizione}

Nella **polimerizzazione per addizione** i monomeri, che contengono un doppio legame carbonio-carbonio, si uniscono l'uno all'altro senza perdere alcun atomo: l'unità ripetuta ha la stessa formula del monomero. La reazione procede **a catena**, attraverso una specie molto reattiva che a ogni addizione si ricrea all'estremità della catena in crescita.

Il meccanismo più comune usa i **radicali liberi**, specie con un elettrone spaiato. Si svolge in tre fasi.

1. **Iniziazione.** Un iniziatore, di solito un perossido organico $\mathrm{R{-}O{-}O{-}R}$, si scinde per riscaldamento nel legame debole ossigeno-ossigeno, formando due radicali. Ogni radicale si addiziona a una molecola di monomero, aprendone il doppio legame: uno dei due elettroni del legame si appaia con quello del radicale, l'altro resta spaiato sul carbonio terminale.
2. **Propagazione.** Il radicale terminale si addiziona a un'altra molecola di monomero, e l'elettrone spaiato si sposta di nuovo sull'estremità. Il passaggio si ripete migliaia di volte, in una frazione di secondo.
3. **Terminazione.** Due radicali si incontrano e i loro elettroni spaiati formano un legame, unendo due catene; oppure un atomo di idrogeno passa da una catena all'altra. In entrambi i casi la crescita si ferma.

::: figura radicalica
{"w":660,"h":195,"items":[{"t":"rect","p":[20,40,190,62],"c":"body","r":6},{"t":"poly","pts":[[20,40],[210,40],[210,102],[20,102]],"close":true,"c":"force","w":1.6},{"t":"text","p":[115.0,62],"s":"iniziazione","c":"force","size":13},{"t":"text","p":[115.0,84],"s":"R–O–O–R → 2 R–O•","c":"ax","size":11},{"t":"rect","p":[235,40,190,62],"c":"body","r":6},{"t":"poly","pts":[[235,40],[425,40],[425,102],[235,102]],"close":true,"c":"force3","w":1.6},{"t":"text","p":[330.0,62],"s":"propagazione","c":"force3","size":13},{"t":"text","p":[330.0,84],"s":"R• + CH₂=CH₂ → R–CH₂–CH₂•","c":"ax","size":11},{"t":"rect","p":[450,40,190,62],"c":"body","r":6},{"t":"poly","pts":[[450,40],[640,40],[640,102],[450,102]],"close":true,"c":"force4","w":1.6},{"t":"text","p":[545.0,62],"s":"terminazione","c":"force4","size":13},{"t":"text","p":[545.0,84],"s":"R• + •R′ → R–R′","c":"ax","size":11},{"t":"arrow","p":[212,71,233,71],"c":"ax","w":1.8,"head":8},{"t":"arrow","p":[427,71,448,71],"c":"ax","w":1.8,"head":8},{"t":"poly","pts":[[330,104],[330,140],[300,140]],"c":"force3","w":1.6,"dash":true},{"t":"arrow","p":[300,140,300,106],"c":"force3","w":1.6,"head":8},{"t":"text","p":[330,162],"s":"il radicale si ricrea a ogni addizione:","c":"muted","size":11},{"t":"text","p":[330,178],"s":"migliaia di ripetizioni in una frazione di secondo","c":"muted","size":11}]}
---
Le tre fasi della polimerizzazione radicalica. La propagazione è il cuore del processo: ogni addizione di monomero ricrea il radicale all'estremità della catena, che continua a crescere finché non incontra un altro radicale.
:::

Molti polimeri di uso comune derivano da monomeri del tipo $\mathrm{CH_2{=}CHX}$, detti vinilici, che differiscono per il gruppo $\mathrm X$.

- **polietilene** (PE), da $\mathrm{CH_2{=}CH_2}$: sacchetti, flaconi, film;
- **polipropilene** (PP), da $\mathrm{CH_2{=}CHCH_3}$: contenitori, fibre, paraurti;
- **polivinilcloruro** (PVC), da $\mathrm{CH_2{=}CHCl}$: tubi, infissi, rivestimenti dei cavi;
- **polistirene** (PS), da $\mathrm{CH_2{=}CHC_6H_5}$: imballaggi, bicchieri, isolanti;
- **politetrafluoroetilene** (PTFE), da $\mathrm{CF_2{=}CF_2}$: rivestimenti antiaderenti;
- **polimetilmetacrilato** (PMMA), da $\mathrm{CH_2{=}C(CH_3)COOCH_3}$: vetri acrilici, lenti.

Il gruppo $\mathrm X$ cambia molto le proprietà. Il polietilene, con soli atomi di idrogeno, è morbido e cereo; il polistirene, con il voluminoso anello benzenico, è rigido e trasparente; nel PTFE, il Teflon, gli atomi di fluoro formano un guscio compatto intorno alla catena, e il materiale è chimicamente inerte, resiste fino a circa $260\,^\circ\mathrm C$ e ha un coefficiente di attrito bassissimo. Il PVC contiene in massa il $57\%$ di cloro, e la sua combustione libera acido cloridrico: per questo il suo smaltimento richiede impianti adatti.

## Catene ordinate: Ziegler e Natta {#natta}

La polimerizzazione radicalica dell'etilene, condotta ad alta pressione, produce catene con molte ramificazioni corte, perché il radicale terminale può strappare un idrogeno a un punto interno della propria catena e far crescere un ramo laterale. Le ramificazioni impediscono alle catene di accostarsi in modo ordinato: il materiale, il **polietilene a bassa densità**, con densità fra circa $0{,}91$ e $0{,}94\un{g/cm^3}$, è morbido e flessibile, adatto ai sacchetti e ai film.

Nel 1953 il chimico tedesco Karl Ziegler scoprì che alcuni composti di titanio e alluminio catalizzano la polimerizzazione dell'etilene a bassa pressione, producendo catene quasi prive di ramificazioni. Le catene lineari si allineano in regioni cristalline, e il **polietilene ad alta densità**, con densità fra circa $0{,}94$ e $0{,}97\un{g/cm^3}$, è più rigido e resistente: è il materiale dei flaconi dei detersivi e delle tubature.

L'anno successivo Giulio Natta, al Politecnico di Milano, usò catalizzatori simili per polimerizzare il propilene. Nel polipropilene ogni secondo atomo di carbonio porta un gruppo metile, e la sua disposizione rispetto alla catena può essere casuale oppure regolare. Il polipropilene con i metili disposti a caso, detto **atattico**, è un materiale appiccicoso e di poco valore; quello con tutti i metili dalla stessa parte, detto **isotattico**, è cristallino, fonde intorno a $160\,^\circ\mathrm C$, ed è oggi uno dei polimeri più prodotti al mondo. Il controllo della disposizione spaziale lungo la catena, la **tatticità**, è una forma di stereochimica estesa a migliaia di centri successivi. Ziegler e Natta ricevettero insieme il premio Nobel per la chimica nel 1963; Natta è stato finora l'unico italiano premiato con il Nobel per la chimica.

## La polimerizzazione per condensazione {#condensazione}

Nella **polimerizzazione per condensazione** i monomeri portano due gruppi funzionali ciascuno, e ogni legame che li unisce si forma con l'eliminazione di una piccola molecola, quasi sempre acqua. Le reazioni sono le stesse del capitolo precedente: un acido carbossilico e un alcol formano un estere, un acido carbossilico e un'ammina formano un'ammide. Se ogni monomero ha due gruppi, ogni prodotto conserva un gruppo libero a ciascuna estremità, e la catena può continuare a crescere da entrambe le parti.

Il **nylon-6,6**, il primo polimero di condensazione di successo commerciale, si ottiene dalla esametilendiammina, $\mathrm{H_2N(CH_2)_6NH_2}$, e dall'acido adipico, $\mathrm{HOOC(CH_2)_4COOH}$, entrambi con sei atomi di carbonio, da cui il nome. Ogni gruppo amminico reagisce con un gruppo carbossilico formando un legame ammidico e una molecola d'acqua:

$$n\,\mathrm{H_2N(CH_2)_6NH_2}+n\,\mathrm{HOOC(CH_2)_4COOH}\longrightarrow\big[{-}\mathrm{NH(CH_2)_6NHCO(CH_2)_4CO}{-}\big]_n+2n\,\mathrm{H_2O}.$$

L'unità ripetuta, $\mathrm{C_{12}H_{22}N_2O_2}$, ha massa molare $226{,}32\un{g/mol}$: la somma dei due monomeri, $116{,}21$ e $146{,}14\un{g/mol}$, meno due molecole d'acqua. Per ogni chilogrammo di nylon si liberano circa $159\un{g}$ di acqua, che va allontanata perché l'equilibrio si sposti verso il polimero, come insegna il capitolo [Perturbazioni dell'equilibrio](unit:chemistry-20). Le catene di poliammide sono legate fra loro da legami a idrogeno fra i gruppi $\mathrm{N{-}H}$ e $\mathrm{C{=}O}$ di catene vicine, che rendono il materiale tenace e capace di formare fibre robuste: calze, corde, paracadute, ingranaggi.

Il **polietilene tereftalato**, PET, è un poliestere formato dall'acido tereftalico, un acido benzendicarbossilico, e dal glicole etilenico, un dialcol. È il materiale delle bottiglie per bevande e, in forma di fibra, del poliestere dei tessuti. L'unità ripetuta, $\mathrm{C_{10}H_8O_4}$, ha massa molare $192{,}17\un{g/mol}$; una bottiglia da $25\un{g}$ ne contiene circa $0{,}13\un{mol}$.

Lo stesso principio regola le grandi molecole della vita: le proteine sono poliammidi formate da amminoacidi, i polisaccaridi sono catene di zuccheri unite da legami che si formano eliminando acqua, e gli acidi nucleici sono poliesteri dell'acido fosforico.

## Catene lunghe da reazioni quasi complete {#carothers}

Le due polimerizzazioni crescono in modo molto diverso. In quella per addizione ogni catena, una volta iniziata, cresce in una frazione di secondo fino a migliaia di unità; nella miscela convivono catene lunghe e monomero non ancora reagito. In quella per condensazione, detta anche **a stadi**, tutte le molecole reagiscono fra loro: due monomeri formano un dimero, due dimeri un tetramero, un dimero e un trimero un pentamero, e le catene diventano lunghe soltanto alla fine, quando quasi tutti i gruppi funzionali hanno reagito.

Il chimico statunitense Wallace Carothers espresse questo fatto con una relazione semplice. Se si parte da un numero uguale di gruppi funzionali dei due tipi, e se $p$ è la frazione di gruppi che hanno reagito, il numero medio di unità monomeriche per catena è

::: legge Equazione di Carothers
$$\bar X_n=\frac1{1-p}.$$
:::

La ragione è un conteggio. All'inizio ci sono $N_0$ molecole; ogni legame che si forma unisce due molecole in una, e ne riduce il numero di uno. Quando ha reagito la frazione $p$ dei gruppi, il numero di molecole è sceso a $N_0(1-p)$, e il numero medio di unità per molecola è $N_0/[N_0(1-p)]$.

::: figura carothers
{"w":660,"h":306,"items":[{"t":"axes","o":[80,250],"x":[530,""],"y":[215,""],"sx":5200,"sy":0.18,"xt":[[0.02,"0,92"],[0.04,"0,94"],[0.06,"0,96"],[0.08,"0,98"],[0.1,"1,00"]],"yt":[[200,"200"],[400,"400"],[600,"600"],[800,"800"],[1000,"1000"]]},{"t":"text","p":[40,28],"s":"grado di polimerizzazione medio","c":"ax","size":12,"a":"start"},{"t":"text","p":[630,292],"s":"frazione di gruppi reagiti, p","c":"ax","size":13,"a":"end"},{"t":"plot","o":[80,250],"sx":5200,"sy":0.18,"pts":[[0.0,10.0],[0.0002,10.0200401],[0.0004,10.0401606],[0.0006,10.0603622],[0.0008,10.0806452],[0.001,10.1010101],[0.0012,10.1214575],[0.0014,10.1419878],[0.0016,10.1626016],[0.0018,10.1832994],[0.002,10.2040816],[0.0022,10.2249489],[0.0024,10.2459016],[0.0026,10.2669405],[0.0028,10.2880658],[0.003,10.3092784],[0.0032,10.3305785],[0.0034,10.3519669],[0.0036,10.373444],[0.0038,10.3950104],[0.004,10.4166667],[0.0042,10.4384134],[0.0044,10.460251],[0.0046,10.4821803],[0.0048,10.5042017],[0.005,10.5263158],[0.0052,10.5485232],[0.0054,10.5708245],[0.0056,10.5932203],[0.0058,10.6157113],[0.006,10.6382979],[0.0062,10.6609808],[0.0064,10.6837607],[0.0066,10.7066381],[0.0068,10.7296137],[0.007,10.7526882],[0.0072,10.7758621],[0.0074,10.7991361],[0.0076,10.8225108],[0.0078,10.845987],[0.008,10.8695652],[0.0082,10.8932462],[0.0084,10.9170306],[0.0086,10.940919],[0.0088,10.9649123],[0.009,10.989011],[0.0092,11.0132159],[0.0094,11.0375276],[0.0096,11.0619469],[0.0098,11.0864745],[0.01,11.1111111],[0.0102,11.1358575],[0.0104,11.1607143],[0.0106,11.1856823],[0.0108,11.2107623],[0.011,11.2359551],[0.0112,11.2612613],[0.0114,11.2866817],[0.0116,11.3122172],[0.0118,11.3378685],[0.012,11.3636364],[0.0122,11.3895216],[0.0124,11.4155251],[0.0126,11.4416476],[0.0128,11.4678899],[0.013,11.4942529],[0.0132,11.5207373],[0.0134,11.5473441],[0.0136,11.5740741],[0.0138,11.6009281],[0.014,11.627907],[0.0142,11.6550117],[0.0144,11.682243],[0.0146,11.7096019],[0.0148,11.7370892],[0.015,11.7647059],[0.0152,11.7924528],[0.0154,11.820331],[0.0156,11.8483412],[0.0158,11.8764846],[0.016,11.9047619],[0.0162,11.9331742],[0.0164,11.9617225],[0.0166,11.9904077],[0.0168,12.0192308],[0.017,12.0481928],[0.0172,12.0772947],[0.0174,12.1065375],[0.0176,12.1359223],[0.0178,12.1654501],[0.018,12.195122],[0.0182,12.2249389],[0.0184,12.254902],[0.0186,12.2850123],[0.0188,12.3152709],[0.019,12.345679],[0.0192,12.3762376],[0.0194,12.4069479],[0.0196,12.4378109],[0.0198,12.4688279],[0.02,12.5],[0.0202,12.5313283],[0.0204,12.5628141],[0.0206,12.5944584],[0.0208,12.6262626],[0.021,12.6582278],[0.0212,12.6903553],[0.0214,12.7226463],[0.0216,12.755102],[0.0218,12.7877238],[0.022,12.8205128],[0.0222,12.8534704],[0.0224,12.8865979],[0.0226,12.9198966],[0.0228,12.9533679],[0.023,12.987013],[0.0232,13.0208333],[0.0234,13.0548303],[0.0236,13.0890052],[0.0238,13.1233596],[0.024,13.1578947],[0.0242,13.1926121],[0.0244,13.2275132],[0.0246,13.2625995],[0.0248,13.2978723],[0.025,13.3333333],[0.0252,13.368984],[0.0254,13.4048257],[0.0256,13.4408602],[0.0258,13.4770889],[0.026,13.5135135],[0.0262,13.5501355],[0.0264,13.5869565],[0.0266,13.6239782],[0.0268,13.6612022],[0.027,13.6986301],[0.0272,13.7362637],[0.0274,13.7741047],[0.0276,13.8121547],[0.0278,13.8504155],[0.028,13.8888889],[0.0282,13.9275766],[0.0284,13.9664804],[0.0286,14.0056022],[0.0288,14.0449438],[0.029,14.084507],[0.0292,14.1242938],[0.0294,14.1643059],[0.0296,14.2045455],[0.0298,14.2450142],[0.03,14.2857143],[0.0302,14.3266476],[0.0304,14.3678161],[0.0306,14.4092219],[0.0308,14.4508671],[0.031,14.4927536],[0.0312,14.5348837],[0.0314,14.5772595],[0.0316,14.619883],[0.0318,14.6627566],[0.032,14.7058824],[0.0322,14.7492625],[0.0324,14.7928994],[0.0326,14.8367953],[0.0328,14.8809524],[0.033,14.9253731],[0.0332,14.9700599],[0.0334,15.015015],[0.0336,15.060241],[0.0338,15.1057402],[0.034,15.1515152],[0.0342,15.1975684],[0.0344,15.2439024],[0.0346,15.2905199],[0.0348,15.3374233],[0.035,15.3846154],[0.0352,15.4320988],[0.0354,15.4798762],[0.0356,15.5279503],[0.0358,15.576324],[0.036,15.625],[0.0362,15.6739812],[0.0364,15.7232704],[0.0366,15.7728707],[0.0368,15.8227848],[0.037,15.8730159],[0.0372,15.9235669],[0.0374,15.9744409],[0.0376,16.025641],[0.0378,16.0771704],[0.038,16.1290323],[0.0382,16.1812298],[0.0384,16.2337662],[0.0386,16.286645],[0.0388,16.3398693],[0.039,16.3934426],[0.0392,16.4473684],[0.0394,16.5016502],[0.0396,16.5562914],[0.0398,16.6112957],[0.04,16.6666667],[0.0402,16.722408],[0.0404,16.7785235],[0.0406,16.8350168],[0.0408,16.8918919],[0.041,16.9491525],[0.0412,17.0068027],[0.0414,17.0648464],[0.0416,17.1232877],[0.0418,17.1821306],[0.042,17.2413793],[0.0422,17.3010381],[0.0424,17.3611111],[0.0426,17.4216028],[0.0428,17.4825175],[0.043,17.5438596],[0.0432,17.6056338],[0.0434,17.6678445],[0.0436,17.7304965],[0.0438,17.7935943],[0.044,17.8571429],[0.0442,17.921147],[0.0444,17.9856115],[0.0446,18.0505415],[0.0448,18.115942],[0.045,18.1818182],[0.0452,18.2481752],[0.0454,18.3150183],[0.0456,18.3823529],[0.0458,18.4501845],[0.046,18.5185185],[0.0462,18.5873606],[0.0464,18.6567164],[0.0466,18.7265918],[0.0468,18.7969925],[0.047,18.8679245],[0.0472,18.9393939],[0.0474,19.0114068],[0.0476,19.0839695],[0.0478,19.1570881],[0.048,19.2307692],[0.0482,19.3050193],[0.0484,19.379845],[0.0486,19.4552529],[0.0488,19.53125],[0.049,19.6078431],[0.0492,19.6850394],[0.0494,19.7628458],[0.0496,19.8412698],[0.0498,19.9203187],[0.05,20.0],[0.0502,20.0803213],[0.0504,20.1612903],[0.0506,20.242915],[0.0508,20.3252033],[0.051,20.4081633],[0.0512,20.4918033],[0.0514,20.5761317],[0.0516,20.661157],[0.0518,20.746888],[0.052,20.8333333],[0.0522,20.9205021],[0.0524,21.0084034],[0.0526,21.0970464],[0.0528,21.1864407],[0.053,21.2765957],[0.0532,21.3675214],[0.0534,21.4592275],[0.0536,21.5517241],[0.0538,21.6450216],[0.054,21.7391304],[0.0542,21.8340611],[0.0544,21.9298246],[0.0546,22.0264317],[0.0548,22.1238938],[0.055,22.2222222],[0.0552,22.3214286],[0.0554,22.4215247],[0.0556,22.5225225],[0.0558,22.6244344],[0.056,22.7272727],[0.0562,22.8310502],[0.0564,22.9357798],[0.0566,23.0414747],[0.0568,23.1481481],[0.057,23.255814],[0.0572,23.364486],[0.0574,23.4741784],[0.0576,23.5849057],[0.0578,23.6966825],[0.058,23.8095238],[0.0582,23.923445],[0.0584,24.0384615],[0.0586,24.1545894],[0.0588,24.2718447],[0.059,24.3902439],[0.0592,24.5098039],[0.0594,24.6305419],[0.0596,24.7524752],[0.0598,24.8756219],[0.06,25.0],[0.0602,25.1256281],[0.0604,25.2525253],[0.0606,25.3807107],[0.0608,25.5102041],[0.061,25.6410256],[0.0612,25.7731959],[0.0614,25.9067358],[0.0616,26.0416667],[0.0618,26.1780105],[0.062,26.3157895],[0.0622,26.4550265],[0.0624,26.5957447],[0.0626,26.7379679],[0.0628,26.8817204],[0.063,27.027027],[0.0632,27.173913],[0.0634,27.3224044],[0.0636,27.4725275],[0.0638,27.6243094],[0.064,27.7777778],[0.0642,27.9329609],[0.0644,28.0898876],[0.0646,28.2485876],[0.0648,28.4090909],[0.065,28.5714286],[0.0652,28.7356322],[0.0654,28.9017341],[0.0656,29.0697674],[0.0658,29.2397661],[0.066,29.4117647],[0.0662,29.5857988],[0.0664,29.7619048],[0.0666,29.9401198],[0.0668,30.1204819],[0.067,30.3030303],[0.0672,30.4878049],[0.0674,30.6748466],[0.0676,30.8641975],[0.0678,31.0559006],[0.068,31.25],[0.0682,31.4465409],[0.0684,31.6455696],[0.0686,31.8471338],[0.0688,32.0512821],[0.069,32.2580645],[0.0692,32.4675325],[0.0694,32.6797386],[0.0696,32.8947368],[0.0698,33.1125828],[0.07,33.3333333],[0.0702,33.557047],[0.0704,33.7837838],[0.0706,34.0136054],[0.0708,34.2465753],[0.071,34.4827586],[0.0712,34.7222222],[0.0714,34.965035],[0.0716,35.2112676],[0.0718,35.4609929],[0.072,35.7142857],[0.0722,35.971223],[0.0724,36.2318841],[0.0726,36.4963504],[0.0728,36.7647059],[0.073,37.037037],[0.0732,37.3134328],[0.0734,37.593985],[0.0736,37.8787879],[0.0738,38.1679389],[0.074,38.4615385],[0.0742,38.7596899],[0.0744,39.0625],[0.0746,39.3700787],[0.0748,39.6825397],[0.075,40.0],[0.0752,40.3225806],[0.0754,40.6504065],[0.0756,40.9836066],[0.0758,41.322314],[0.076,41.6666667],[0.0762,42.0168067],[0.0764,42.3728814],[0.0766,42.7350427],[0.0768,43.1034483],[0.077,43.4782609],[0.0772,43.8596491],[0.0774,44.2477876],[0.0776,44.6428571],[0.0778,45.045045],[0.078,45.4545455],[0.0782,45.8715596],[0.0784,46.2962963],[0.0786,46.728972],[0.0788,47.1698113],[0.079,47.6190476],[0.0792,48.0769231],[0.0794,48.5436893],[0.0796,49.0196078],[0.0798,49.5049505],[0.08,50.0],[0.0802,50.5050505],[0.0804,51.0204082],[0.0806,51.5463918],[0.0808,52.0833333],[0.081,52.6315789],[0.0812,53.1914894],[0.0814,53.7634409],[0.0816,54.3478261],[0.0818,54.9450549],[0.082,55.5555556],[0.0822,56.1797753],[0.0824,56.8181818],[0.0826,57.4712644],[0.0828,58.1395349],[0.083,58.8235294],[0.0832,59.5238095],[0.0834,60.2409639],[0.0836,60.9756098],[0.0838,61.7283951],[0.084,62.5],[0.0842,63.2911392],[0.0844,64.1025641],[0.0846,64.9350649],[0.0848,65.7894737],[0.085,66.6666667],[0.0852,67.5675676],[0.0854,68.4931507],[0.0856,69.4444444],[0.0858,70.4225352],[0.086,71.4285714],[0.0862,72.4637681],[0.0864,73.5294118],[0.0866,74.6268657],[0.0868,75.7575758],[0.087,76.9230769],[0.0872,78.125],[0.0874,79.3650794],[0.0876,80.6451613],[0.0878,81.9672131],[0.088,83.3333333],[0.0882,84.7457627],[0.0884,86.2068966],[0.0886,87.7192982],[0.0888,89.2857143],[0.089,90.9090909],[0.0892,92.5925926],[0.0894,94.3396226],[0.0896,96.1538462],[0.0898,98.0392157],[0.09,100.0],[0.0902,102.0408163],[0.0904,104.1666667],[0.0906,106.3829787],[0.0908,108.6956522],[0.091,111.1111111],[0.0912,113.6363636],[0.0914,116.2790698],[0.0916,119.047619],[0.0918,121.9512195],[0.092,125.0],[0.0922,128.2051282],[0.0924,131.5789474],[0.0926,135.1351351],[0.0928,138.8888889],[0.093,142.8571429],[0.0932,147.0588235],[0.0934,151.5151515],[0.0936,156.25],[0.0938,161.2903226],[0.094,166.6666667],[0.0942,172.4137931],[0.0944,178.5714286],[0.0946,185.1851852],[0.0948,192.3076923],[0.095,200.0],[0.0952,208.3333333],[0.0954,217.3913043],[0.0956,227.2727273],[0.0958,238.0952381],[0.096,250.0],[0.0962,263.1578947],[0.0964,277.7777778],[0.0966,294.1176471],[0.0968,312.5],[0.097,333.3333333],[0.0972,357.1428571],[0.0974,384.6153846],[0.0976,416.6666667],[0.0978,454.5454545],[0.098,500.0],[0.0982,555.5555556],[0.0984,625.0],[0.0986,714.2857143],[0.0988,833.3333333],[0.099,1000.0]],"c":"force2","w":2.6},{"t":"circle","p":[340.0,246.4,4.5],"c":"force4"},{"t":"text","p":[332.0,238.4],"s":"p = 0,95: 20","c":"ax","size":11,"a":"end"},{"t":"circle","p":[548.0,232.0,4.5],"c":"force4"},{"t":"text","p":[540.0,224.0],"s":"p = 0,99: 100","c":"ax","size":11,"a":"end"},{"t":"circle","p":[574.0,214.0,4.5],"c":"force4"},{"t":"text","p":[566.0,206.0],"s":"p = 0,995: 200","c":"ax","size":11,"a":"end"}]}
---
Grado di polimerizzazione medio in funzione della frazione di gruppi funzionali che hanno reagito, secondo l'equazione di Carothers. Con il $95\%$ dei gruppi reagiti le catene contengono in media venti unità; servono il $99\%$ per arrivare a cento e il $99{,}9\%$ per arrivare a mille.
:::

Le conseguenze pratiche sono severe. Una conversione del $95\%$, che per una reazione organica ordinaria sarebbe eccellente, dà catene di venti unità, troppo corte per un materiale utile. Per un nylon da fibre, con una massa molare media di circa $20\,000\un{g/mol}$, cioè circa $88$ unità ripetute e $177$ residui di monomero, serve una conversione superiore al $99{,}4\%$. Servono inoltre monomeri purissimi e in rapporto stechiometrico esatto: un piccolo eccesso di uno dei due lascia tutte le catene terminate dallo stesso gruppo, che non può più reagire. Per questo nell'industria del nylon si prepara prima il sale fra la diammina e l'acido, che contiene i due monomeri esattamente in rapporto uno a uno.

## La massa molare media {#massa}

Le catene di un polimero sintetico hanno lunghezze diverse, perché l'iniziazione, la propagazione e la terminazione sono eventi casuali, e lo stesso vale per gli incontri fra molecole nella condensazione. Un campione contiene catene di lunghezze diverse, e la sua massa molare si può soltanto descrivere con una distribuzione e con delle medie.

::: definizione Masse molari medie
Se un campione contiene $n_i$ moli di catene di massa molare $M_i$, la **massa molare media numerica** e la **massa molare media ponderale** sono
$$M_n=\frac{\sum_in_iM_i}{\sum_in_i},\qquad M_w=\frac{\sum_in_iM_i^2}{\sum_in_iM_i}.$$
Il rapporto $Đ=M_w/M_n$, detto **dispersità**, vale $1$ se tutte le catene hanno la stessa lunghezza ed è maggiore di $1$ negli altri casi.
:::

La media numerica dà a ogni catena lo stesso peso; è la massa totale divisa per il numero di catene, e si misura con le proprietà colligative del capitolo [Soluzioni e concentrazione](unit:chemistry-12), come la pressione osmotica, che dipendono dal numero di particelle. La media ponderale dà a ogni catena un peso proporzionale alla sua massa, e privilegia le catene lunghe; si misura con la diffusione della luce. Molte proprietà meccaniche dei materiali, come la viscosità del fuso e la tenacità, dipendono soprattutto dalle catene lunghe e quindi dalla media ponderale.

::: esempio Tre famiglie di catene
Un campione contiene una mole di catene da $10\,000\un{g/mol}$, una da $50\,000$ e una da $100\,000\un{g/mol}$.
$$M_n=\frac{10\,000+50\,000+100\,000}{3}\simeq53\,300\un{g/mol},$$
$$M_w=\frac{10\,000^2+50\,000^2+100\,000^2}{160\,000}\simeq78\,800\un{g/mol}.$$
La dispersità è $78\,800/53\,300\simeq1{,}48$. Le catene più lunghe, che contengono più della metà della massa, spostano la media ponderale verso l'alto.
:::

::: figura distribuzione
{"w":680,"h":306,"items":[{"t":"axes","o":[80,250],"x":[560,""],"y":[215,""],"sx":0.25,"sy":110000,"xt":[[400,"400"],[800,"800"],[1200,"1200"],[1600,"1600"],[2000,"2000"]],"yt":[]},{"t":"text","p":[40,28],"s":"frazione in massa","c":"ax","size":12,"a":"start"},{"t":"text","p":[630,292],"s":"unità per catena","c":"ax","size":13,"a":"end"},{"t":"plot","o":[80,250],"sx":0.25,"sy":110000,"pts":[[1,2.5e-05],[11,0.0002616],[21,0.0004749],[31,0.0006668],[41,0.0008388],[51,0.0009923],[61,0.0011289],[71,0.0012497],[81,0.001356],[91,0.001449],[101,0.0015296],[111,0.0015988],[121,0.0016577],[131,0.0017069],[141,0.0017474],[151,0.0017798],[161,0.0018049],[171,0.0018233],[181,0.0018356],[191,0.0018423],[201,0.001844],[211,0.0018411],[221,0.001834],[231,0.0018233],[241,0.0018092],[251,0.0017922],[261,0.0017725],[271,0.0017504],[281,0.0017263],[291,0.0017003],[301,0.0016727],[311,0.0016438],[321,0.0016137],[331,0.0015826],[341,0.0015508],[351,0.0015182],[361,0.0014851],[371,0.0014516],[381,0.0014179],[391,0.0013839],[401,0.0013499],[411,0.001316],[421,0.0012821],[431,0.0012484],[441,0.0012149],[451,0.0011817],[461,0.0011488],[471,0.0011164],[481,0.0010843],[491,0.0010528],[501,0.0010217],[511,0.0009911],[521,0.0009611],[531,0.0009317],[541,0.0009028],[551,0.0008746],[561,0.0008469],[571,0.0008198],[581,0.0007934],[591,0.0007676],[601,0.0007424],[611,0.0007179],[621,0.000694],[631,0.0006707],[641,0.000648],[651,0.0006259],[661,0.0006045],[671,0.0005836],[681,0.0005634],[691,0.0005437],[701,0.0005246],[711,0.0005061],[721,0.0004881],[731,0.0004707],[741,0.0004538],[751,0.0004374],[761,0.0004216],[771,0.0004062],[781,0.0003914],[791,0.000377],[801,0.0003631],[811,0.0003497],[821,0.0003367],[831,0.0003241],[841,0.000312],[851,0.0003003],[861,0.0002889],[871,0.000278],[881,0.0002674],[891,0.0002573],[901,0.0002474],[911,0.0002379],[921,0.0002288],[931,0.00022],[941,0.0002115],[951,0.0002033],[961,0.0001954],[971,0.0001877],[981,0.0001804],[991,0.0001733],[1001,0.0001665],[1011,0.00016],[1021,0.0001536],[1031,0.0001476],[1041,0.0001417],[1051,0.0001361],[1061,0.0001307],[1071,0.0001254],[1081,0.0001204],[1091,0.0001156],[1101,0.0001109],[1111,0.0001065],[1121,0.0001022],[1131,9.81e-05],[1141,9.41e-05],[1151,9.03e-05],[1161,8.66e-05],[1171,8.31e-05],[1181,7.97e-05],[1191,7.64e-05],[1201,7.33e-05],[1211,7.03e-05],[1221,6.74e-05],[1231,6.47e-05],[1241,6.2e-05],[1251,5.94e-05],[1261,5.7e-05],[1271,5.46e-05],[1281,5.24e-05],[1291,5.02e-05],[1301,4.81e-05],[1311,4.61e-05],[1321,4.42e-05],[1331,4.23e-05],[1341,4.06e-05],[1351,3.89e-05],[1361,3.73e-05],[1371,3.57e-05],[1381,3.42e-05],[1391,3.28e-05],[1401,3.14e-05],[1411,3.01e-05],[1421,2.88e-05],[1431,2.76e-05],[1441,2.64e-05],[1451,2.53e-05],[1461,2.42e-05],[1471,2.32e-05],[1481,2.22e-05],[1491,2.13e-05],[1501,2.04e-05],[1511,1.95e-05],[1521,1.87e-05],[1531,1.79e-05],[1541,1.71e-05],[1551,1.64e-05],[1561,1.57e-05],[1571,1.5e-05],[1581,1.44e-05],[1591,1.38e-05],[1601,1.32e-05],[1611,1.26e-05],[1621,1.21e-05],[1631,1.15e-05],[1641,1.1e-05],[1651,1.06e-05],[1661,1.01e-05],[1671,9.7e-06],[1681,9.3e-06],[1691,8.9e-06],[1701,8.5e-06],[1711,8.1e-06],[1721,7.8e-06],[1731,7.4e-06],[1741,7.1e-06],[1751,6.8e-06],[1761,6.5e-06],[1771,6.2e-06],[1781,5.9e-06],[1791,5.7e-06],[1801,5.4e-06],[1811,5.2e-06],[1821,5e-06],[1831,4.8e-06],[1841,4.5e-06],[1851,4.3e-06],[1861,4.2e-06],[1871,4e-06],[1881,3.8e-06],[1891,3.6e-06],[1901,3.5e-06],[1911,3.3e-06],[1921,3.2e-06],[1931,3e-06],[1941,2.9e-06],[1951,2.8e-06],[1961,2.7e-06],[1971,2.5e-06],[1981,2.4e-06],[1991,2.3e-06],[2001,2.2e-06],[2011,2.1e-06],[2021,2e-06],[2031,1.9e-06],[2041,1.8e-06],[2051,1.8e-06],[2061,1.7e-06],[2071,1.6e-06],[2081,1.5e-06],[2091,1.5e-06],[2101,1.4e-06],[2111,1.3e-06],[2121,1.3e-06],[2131,1.2e-06],[2141,1.2e-06],[2151,1.1e-06],[2161,1.1e-06],[2171,1e-06],[2181,1e-06],[2191,9e-07]],"c":"force2","w":2.6},{"t":"plot","o":[80,250],"sx":0.25,"sy":110000,"pts":[[200.0,0],[200.0,0.001844]],"c":"force4","w":1.4,"dash":true},{"t":"plot","o":[80,250],"sx":0.25,"sy":110000,"pts":[[399.0,0],[399.0,0.0013567]],"c":"force3","w":1.4,"dash":true},{"t":"text","p":[420,92],"s":"media numerica Mₙ ≈ 200 unità","c":"force4","size":12,"a":"start"},{"t":"text","p":[420,114],"s":"media ponderale Mw ≈ 400 unità","c":"force3","size":12,"a":"start"}]}
---
Distribuzione in massa delle lunghezze di catena in un polimero di condensazione con il $99{,}5\%$ dei gruppi reagiti, calcolata con la distribuzione statistica proposta da Paul Flory. La media numerica è di $200$ unità, quella ponderale di circa $400$: la dispersità tende a $2$, un valore tipico dei polimeri di condensazione.
:::

Le polimerizzazioni radicaliche danno di solito dispersità fra $1{,}5$ e $2$ o più; tecniche moderne, dette di polimerizzazione controllata o vivente, in cui le catene crescono tutte insieme senza terminare, permettono di ottenere dispersità vicine a $1$. I polimeri naturali costruiti dalla cellula secondo uno stampo, come le proteine e il DNA, hanno invece una lunghezza esattamente definita.

## Dalla struttura alle proprietà {#proprieta}

Le proprietà di un materiale polimerico dipendono dalla chimica delle unità ripetute e, almeno altrettanto, dalla forma delle catene e dal modo in cui si dispongono. Una massa di catene lunghe somiglia a un piatto di spaghetti: le catene sono aggrovigliate l'una con l'altra, e questo intreccio dà ai polimeri la loro resistenza, perché per separare una catena bisogna farla scivolare lungo tutte le altre. Catene più lunghe significano più intrecci e materiali più tenaci, fino a un limite oltre il quale il materiale diventa troppo viscoso da lavorare. Le corde per l'alpinismo e i giubbotti protettivi in polietilene a massa molare altissima usano catene di diversi milioni di grammi per mole.

::: figura struttura
{"w":660,"h":225,"items":[{"t":"poly","pts":[[30,50.0],[50,56.3],[70,57.8],[90,53.4],[110,46.5],[130,42.2],[150,43.8],[170,50.1],[190,56.3]],"c":"force2","w":2.2},{"t":"poly","pts":[[30,78.0],[50,84.3],[70,85.8],[90,81.4],[110,74.5],[130,70.2],[150,71.8],[170,78.1],[190,84.3]],"c":"force2","w":2.2},{"t":"poly","pts":[[30,106.0],[50,112.3],[70,113.8],[90,109.4],[110,102.5],[130,98.2],[150,99.8],[170,106.1],[190,112.3]],"c":"force2","w":2.2},{"t":"poly","pts":[[30,134.0],[50,140.3],[70,141.8],[90,137.4],[110,130.5],[130,126.2],[150,127.8],[170,134.1],[190,140.3]],"c":"force2","w":2.2},{"t":"text","p":[110,190],"s":"lineare","c":"ax","size":12},{"t":"text","p":[110,208],"s":"(polietilene ad alta densità)","c":"muted","size":11},{"t":"poly","pts":[[250,60.0],[270,64.7],[290,65.8],[310,62.6],[330,57.3],[350,54.1],[370,55.4],[390,60.1],[410,64.8]],"c":"force3","w":2.2},{"t":"poly","pts":[[290,65.8],[298,81.8],[310,87.8]],"c":"force3","w":2},{"t":"poly","pts":[[350,54.1],[358,70.1],[370,76.1]],"c":"force3","w":2},{"t":"poly","pts":[[250,100.0],[270,104.7],[290,105.8],[310,102.6],[330,97.3],[350,94.1],[370,95.4],[390,100.1],[410,104.8]],"c":"force3","w":2.2},{"t":"poly","pts":[[290,105.8],[298,121.8],[310,127.8]],"c":"force3","w":2},{"t":"poly","pts":[[350,94.1],[358,110.1],[370,116.1]],"c":"force3","w":2},{"t":"poly","pts":[[250,140.0],[270,144.7],[290,145.8],[310,142.6],[330,137.3],[350,134.1],[370,135.4],[390,140.1],[410,144.8]],"c":"force3","w":2.2},{"t":"poly","pts":[[290,145.8],[298,161.8],[310,167.8]],"c":"force3","w":2},{"t":"poly","pts":[[350,134.1],[358,150.1],[370,156.1]],"c":"force3","w":2},{"t":"text","p":[330,190],"s":"ramificato","c":"ax","size":12},{"t":"text","p":[330,208],"s":"(polietilene a bassa densità)","c":"muted","size":11},{"t":"poly","pts":[[470,60.0],[490,64.7],[510,65.8],[530,62.6],[550,57.3],[570,54.1],[590,55.4],[610,60.1],[630,64.8]],"c":"force","w":2.2},{"t":"poly","pts":[[470,105.0],[490,109.7],[510,110.8],[530,107.6],[550,102.3],[570,99.1],[590,100.4],[610,105.1],[630,109.8]],"c":"force","w":2.2},{"t":"poly","pts":[[470,150.0],[490,154.7],[510,155.8],[530,152.6],[550,147.3],[570,144.1],[590,145.4],[610,150.1],[630,154.8]],"c":"force","w":2.2},{"t":"line","p":[490,64.7,490,109.7],"c":"force4","w":2.2},{"t":"line","p":[490,109.7,490,154.7],"c":"force4","w":2.2},{"t":"line","p":[550,57.3,550,102.3],"c":"force4","w":2.2},{"t":"line","p":[550,102.3,550,147.3],"c":"force4","w":2.2},{"t":"line","p":[610,60.1,610,105.1],"c":"force4","w":2.2},{"t":"line","p":[610,105.1,610,150.1],"c":"force4","w":2.2},{"t":"text","p":[550,190],"s":"reticolato","c":"ax","size":12},{"t":"text","p":[550,208],"s":"(gomma vulcanizzata, resine)","c":"muted","size":11}]}
---
Tre architetture di catena. Le catene lineari si allineano e formano regioni cristalline; le ramificazioni ostacolano l'ordine e abbassano densità e rigidità; i legami covalenti fra catene diverse, nella reticolazione, formano un'unica rete tridimensionale che non fonde.
:::

**Cristallinità.** Le catene regolari, senza ramificazioni e con gruppi laterali disposti con ordine, possono allinearsi parallele in regioni cristalline, separate da regioni amorfe disordinate. Un polimero più cristallino è più denso, più rigido, più resistente ai solventi e meno trasparente: il polietilene ad alta densità è opaco, quello a bassa densità traslucido. Nelle fibre, come il nylon e il poliestere, le catene vengono allineate stirando il filo durante la produzione, e la resistenza lungo l'asse della fibra aumenta di molto.

**Transizione vetrosa.** Nelle regioni amorfe le catene, a bassa temperatura, sono bloccate: il materiale è rigido e fragile come un vetro. Sopra una temperatura caratteristica, la **temperatura di transizione vetrosa** $T_\mathrm g$, i segmenti di catena cominciano a muoversi e il materiale diventa gommoso e flessibile. Il polistirene, con $T_\mathrm g$ intorno a $100\,^\circ\mathrm C$, è rigido a temperatura ambiente; la gomma naturale, con $T_\mathrm g$ intorno a $-70\,^\circ\mathrm C$, è elastica anche d'inverno. Una bottiglia di PET, con $T_\mathrm g$ intorno a $75\,^\circ\mathrm C$, si deforma se riempita di acqua bollente.

**Termoplastici e termoindurenti.** I polimeri formati da catene separate, lineari o ramificate, rammolliscono scaldando e si possono fondere e rimodellare più volte: sono **termoplastici**, come il polietilene, il polipropilene, il PET e il PVC, e si possono riciclare per fusione. Quando le catene sono unite da legami covalenti trasversali, la **reticolazione** forma un'unica rete tridimensionale, una sola molecola grande quanto l'oggetto. Questi materiali, detti **termoindurenti**, restano solidi fino a decomporsi quando si scaldano troppo. Sono termoindurenti la bachelite, la prima plastica interamente sintetica, brevettata da Leo Baekeland nel 1909, le resine epossidiche degli adesivi bicomponenti e delle fibre di carbonio, le resine dei laminati.

**Elastomeri.** Una gomma è una rete con pochi legami trasversali, sopra la propria temperatura di transizione vetrosa. Stirandola, le catene aggrovigliate si distendono; lasciandola, tornano a una disposizione disordinata, più probabile, e il materiale riprende la forma. La forza di richiamo ha quindi un'origine entropica, come il secondo principio richiamato nel capitolo [Termochimica e calorimetria](unit:chemistry-16). La gomma naturale grezza è appiccicosa d'estate e fragile d'inverno; nel 1839 Charles Goodyear scoprì che scaldandola con lo zolfo si formano ponti di atomi di zolfo fra le catene: la **vulcanizzazione** dà la gomma elastica e resistente degli pneumatici.

**Fibre ad alte prestazioni.** Combinando catene rigide, allineamento e legami a idrogeno fra catene si ottengono fibre eccezionali. Le aramidi, poliammidi aromatiche come il Kevlar, sviluppato nel 1965 da Stephanie Kwolek, hanno catene diritte e rigide unite da legami a idrogeno regolari: a parità di massa sono diverse volte più resistenti dell'acciaio, e si usano nei giubbotti antiproiettile, nelle corde e nei rinforzi dei materiali compositi.

## I polimeri naturali {#naturali}

I viventi costruiscono polimeri con poche famiglie di monomeri, sempre per condensazione e sempre con l'aiuto di enzimi.

- **Polisaccaridi.** La cellulosa, il polimero naturale più abbondante della Terra, e l'amido sono catene di glucosio. Differiscono soltanto per la disposizione spaziale del legame fra un'unità e l'altra: nell'amido le catene si avvolgono in eliche e sono facilmente digerite dagli enzimi umani; nella cellulosa sono diritte, si affiancano unite da legami a idrogeno e formano le fibre resistenti del legno e del cotone, che l'uomo non digerisce perché non possiede l'enzima adatto. La stessa unità, collegata in due modi stereochimicamente diversi, produce un alimento e un materiale da costruzione.
- **Proteine.** Sono poliammidi formate da venti amminoacidi diversi, uniti da legami ammidici detti **legami peptidici**. Tutti gli amminoacidi delle proteine, salvo la glicina, sono chirali, e tutti hanno la stessa configurazione. La sequenza degli amminoacidi, scritta nel DNA, determina come la catena si ripiega nello spazio, e quindi la funzione della proteina: enzima, ormone, fibra muscolare, anticorpo.
- **Acidi nucleici.** Il DNA e l'RNA sono catene in cui zuccheri e gruppi fosfato si alternano, uniti da legami estere; a ogni zucchero è legata una base azotata. La sequenza delle basi codifica l'informazione genetica.
- **Gomma naturale.** Il lattice dell'albero della gomma contiene poliisoprene con tutti i doppi legami in configurazione cis: le catene sono piegate e non cristallizzano, e il materiale è elastico. La guttaperca, prodotta da altri alberi, è lo stesso polimero con i doppi legami in configurazione trans: le catene si allineano e il materiale è duro e corneo, usato in passato per isolare i cavi telegrafici sottomarini e ancora oggi in odontoiatria.

## Plastica e ambiente {#ambiente}

Secondo l'Organizzazione per la cooperazione e lo sviluppo economico, la produzione mondiale di plastica è raddoppiata fra il 2000 e il 2019, raggiungendo $460$ milioni di tonnellate all'anno, e i rifiuti di plastica sono saliti a $353$ milioni di tonnellate. Di questi, soltanto il $9\%$ è stato effettivamente riciclato, il $19\%$ incenerito e circa la metà conferito in discarica; il resto è stato gestito in modo inadeguato, bruciato all'aperto o disperso nell'ambiente.

Le stesse proprietà che rendono utile la plastica, leggerezza, inerzia chimica e resistenza ai microrganismi, la rendono persistente quando viene dispersa. I legami carbonio-carbonio del polietilene non vengono attaccati da quasi nessun enzima naturale, e un sacchetto abbandonato si degrada soprattutto per effetto della luce ultravioletta, frammentandosi lentamente in pezzi sempre più piccoli. I frammenti con dimensioni inferiori a cinque millimetri, le **microplastiche**, si trovano oggi negli oceani, nei sedimenti, nell'aria e negli organismi.

Le strategie per ridurre il problema sono di tre tipi. Il **riciclo meccanico** rifonde i termoplastici separati per tipo e li trasforma in nuovi oggetti; funziona bene per il PET e il polietilene ad alta densità, peggio per le miscele e per i materiali contaminati, e ogni ciclo accorcia un poco le catene. Il **riciclo chimico** rompe i polimeri nei loro monomeri o in altre molecole piccole: i poliesteri e le poliammidi, con legami che si possono idrolizzare, si prestano meglio dei polimeri di addizione. Infine i **polimeri biodegradabili**, come l'acido polilattico ottenuto dalla fermentazione dell'amido di mais o di canna da zucchero, si degradano in impianti di compostaggio industriale; in ambiente naturale, a bassa temperatura, la loro degradazione può essere molto lenta.

::: quotidiano Il numero nel triangolo
Sul fondo di molti oggetti di plastica si trova un piccolo triangolo di frecce con un numero, il codice che identifica il tipo di resina e facilita la raccolta differenziata: $1$ per il PET, $2$ per il polietilene ad alta densità, $3$ per il PVC, $4$ per il polietilene a bassa densità, $5$ per il polipropilene, $6$ per il polistirene, $7$ per tutti gli altri materiali e le miscele. Il simbolo, nonostante le frecce, indica soltanto di che cosa è fatto l'oggetto, senza alcuna garanzia che venga riciclato. Le bottiglie, codice $1$, e i flaconi dei detersivi, codice $2$, sono fra i materiali riciclati più facilmente, perché sono raccolti in grandi quantità e sono formati da un solo polimero.
:::

::: storia Staudinger, Carothers e Natta
Hermann Staudinger pubblicò nel 1920 l'articolo in cui sosteneva che la gomma e il polistirene fossero formati da catene lunghissime di unità unite da legami covalenti. Molti colleghi gli opposero che molecole così grandi non potevano esistere, e che le proprietà di quei materiali si spiegavano con aggregati di molecole piccole; il dibattito durò più di dieci anni. Nel frattempo, alla DuPont, Wallace Carothers progettava polimeri di condensazione partendo dalla teoria di Staudinger: nel 1935 il suo gruppo ottenne il nylon-6,6, che dal 1939 sostituì la seta nelle calze femminili e durante la seconda guerra mondiale nei paracadute. Carothers morì nel 1937, a quarantun anni, prima del successo della sua invenzione. Negli anni Cinquanta i catalizzatori di Karl Ziegler e il lavoro di Giulio Natta a Milano permisero di controllare la struttura delle catene di polietilene e polipropilene, e la plastica entrò nella vita di tutti i giorni. Staudinger ricevette il Nobel nel 1953, Ziegler e Natta nel 1963.
:::

## Errori frequenti {#errori}

::: errore Un polimero ha una massa molare precisa
I polimeri sintetici contengono catene di lunghezze diverse; la massa molare è una media, e due medie diverse, numerica e ponderale, descrivono la distribuzione. Soltanto i polimeri biologici costruiti su uno stampo, come le proteine, hanno una lunghezza esatta.
:::

::: errore Nella polimerizzazione per addizione si perde acqua
Nella polimerizzazione per addizione i monomeri si uniscono interi, e l'unità ripetuta ha la stessa formula del monomero. L'eliminazione di una piccola molecola caratterizza la condensazione.
:::

::: errore Una resa del 95 per cento basta sempre
Nelle polimerizzazioni per condensazione, una conversione del $95\%$ dei gruppi funzionali dà catene di sole venti unità. Per ottenere materiali utili servono conversioni superiori al $99\%$, monomeri purissimi e un rapporto stechiometrico esatto.
:::

::: errore Tutte le plastiche si possono rifondere
Soltanto i termoplastici fondono. I termoindurenti, come la bachelite e le resine epossidiche, e la gomma vulcanizzata sono reti covalenti che si decompongono prima di fondere, e richiedono altri metodi di recupero.
:::

::: errore Il simbolo con le frecce significa riciclabile
Il codice nel triangolo identifica il tipo di polimero. Se un oggetto venga davvero riciclato dipende dalla raccolta, dalla presenza di impianti adatti e dal mercato del materiale recuperato.
:::

## Sintesi {#sintesi}

::: sintesi Che cosa portare con sé
- Un polimero è una macromolecola formata dalla ripetizione di unità derivate dai monomeri; il grado di polimerizzazione è il numero di unità per catena.
- Nella polimerizzazione per addizione monomeri con un doppio legame si uniscono a catena, con radicali o catalizzatori, senza perdere atomi.
- Nella polimerizzazione per condensazione monomeri con due gruppi funzionali formano esteri o ammidi eliminando acqua.
- Equazione di Carothers: $\bar X_n=1/(1-p)$; le catene diventano lunghe soltanto con conversioni vicine al $100\%$.
- $M_n=\sum n_iM_i/\sum n_i$, $M_w=\sum n_iM_i^2/\sum n_iM_i$, dispersità $M_w/M_n\geq1$.
- Ramificazione, tatticità, cristallinità, reticolazione e temperatura di transizione vetrosa determinano le proprietà dei materiali.
- I termoplastici fondono e si riciclano per fusione; i termoindurenti e gli elastomeri vulcanizzati sono reti covalenti.
- Polisaccaridi, proteine e acidi nucleici sono polimeri di condensazione naturali.
- La persistenza della plastica nell'ambiente richiede riduzione, riciclo meccanico e chimico e materiali biodegradabili.
:::

## Glossario {#glossario}

- **Polimero** o **macromolecola**: molecola formata da molte unità ripetute legate covalentemente.
- **Monomero**: piccola molecola da cui si forma un polimero.
- **Unità ripetuta**: porzione della catena che si ripete.
- **Grado di polimerizzazione**: numero di unità in una catena.
- **Copolimero**: polimero formato da due o più monomeri diversi.
- **Polimerizzazione per addizione**: unione a catena di monomeri con legami multipli, senza perdita di atomi.
- **Radicale libero**: specie con un elettrone spaiato.
- **Polimerizzazione per condensazione**: unione a stadi di monomeri bifunzionali con eliminazione di una piccola molecola.
- **Poliestere** e **poliammide**: polimeri di condensazione uniti da legami estere o ammidici.
- **Tatticità**: regolarità della disposizione spaziale dei gruppi laterali lungo la catena.
- **Massa molare media numerica** e **ponderale**: medie delle masse delle catene pesate sul numero o sulla massa.
- **Dispersità**: rapporto fra massa molare media ponderale e numerica.
- **Temperatura di transizione vetrosa**: temperatura sopra la quale le regioni amorfe passano da uno stato rigido a uno gommoso.
- **Termoplastico**: polimero che rammollisce e fonde scaldando.
- **Termoindurente**: polimero reticolato che non fonde.
- **Elastomero**: polimero poco reticolato, elastico sopra la temperatura di transizione vetrosa.
- **Vulcanizzazione**: reticolazione della gomma con ponti di zolfo.
- **Microplastiche**: frammenti di plastica più piccoli di cinque millimetri.

## Esercizi {#esercizi}

Gli esercizi sono divisi in tre livelli. Per le masse molari si usino $12{,}011$ per il carbonio, $1{,}008$ per l'idrogeno, $14{,}007$ per l'azoto, $15{,}999$ per l'ossigeno e $35{,}45$ per il cloro.

::: esercizio Monomeri e unità [base]
Scrivere il monomero e l'unità ripetuta del polistirene, del polivinilcloruro e del politetrafluoroetilene, e dire con quale tipo di polimerizzazione si ottengono.
>>> soluzione
Polistirene: monomero $\mathrm{CH_2{=}CHC_6H_5}$, unità $\mathrm{{-}CH_2{-}CH(C_6H_5){-}}$. PVC: monomero $\mathrm{CH_2{=}CHCl}$, unità $\mathrm{{-}CH_2{-}CHCl{-}}$. PTFE: monomero $\mathrm{CF_2{=}CF_2}$, unità $\mathrm{{-}CF_2{-}CF_2{-}}$. Tutti e tre si ottengono per addizione, e l'unità ha la stessa formula del monomero.
:::

::: esercizio Grado di polimerizzazione [base]
Calcolare il numero medio di unità in un polietilene con massa molare media numerica di $280\,000\un{g/mol}$ e in un polistirene con $208\,000\un{g/mol}$.
>>> soluzione
L'unità del polietilene, $\mathrm{C_2H_4}$, ha massa $28{,}05\un{g/mol}$: $280\,000/28{,}05\simeq1{,}00\times10^4$ unità. Quella del polistirene, $\mathrm{C_8H_8}$, ha massa $104{,}15\un{g/mol}$: $208\,000/104{,}15\simeq2{,}00\times10^3$ unità.
:::

::: esercizio Addizione o condensazione [base]
Classificare come polimeri di addizione o di condensazione: nylon-6,6, PET, polipropilene, proteine, PVC, cellulosa.
>>> soluzione
Di addizione: polipropilene e PVC. Di condensazione: nylon-6,6 (poliammide), PET (poliestere), proteine (poliammidi naturali), cellulosa (polisaccaride, i cui legami si formano eliminando acqua).
:::

::: esercizio Fondere o no [base]
Dire quali di questi materiali si possono rifondere e rimodellare: una bottiglia di PET, un manico di bachelite, uno pneumatico, un flacone di polietilene, una colla epossidica indurita.
>>> soluzione
Si possono rifondere la bottiglia di PET e il flacone di polietilene, che sono termoplastici. La bachelite e la resina epossidica sono termoindurenti, e lo pneumatico è gomma vulcanizzata: tutti e tre sono reti covalenti che si decompongono prima di fondere.
:::

::: esercizio Il triangolo delle frecce [base]
Che materiale indicano i codici $1$, $2$ e $5$? Perché un vasetto di yogurt con il codice $6$ e un coperchio di alluminio va separato prima della raccolta?
>>> soluzione
Il codice $1$ indica il PET, il $2$ il polietilene ad alta densità, il $5$ il polipropilene. Il vasetto, in polistirene, va separato dal coperchio perché il riciclo meccanico richiede materiali omogenei: un metallo o un polimero diverso contaminerebbero il materiale fuso.
:::

::: esercizio Bilancio di massa del nylon [medio]
Calcolare le masse di esametilendiammina, $\mathrm{C_6H_{16}N_2}$, e di acido adipico, $\mathrm{C_6H_{10}O_4}$, necessarie per produrre $1{,}00\un{kg}$ di nylon-6,6, e la massa di acqua che si libera.
>>> soluzione
L'unità ripetuta ha massa $226{,}32\un{g/mol}$, e $1{,}00\un{kg}$ ne contiene $4{,}42\un{mol}$. Servono $4{,}42\times116{,}21\simeq513\un{g}$ di diammina e $4{,}42\times146{,}14\simeq646\un{g}$ di acido, in tutto $1159\un{g}$. La differenza, circa $159\un{g}$, è l'acqua eliminata, due moli per unità.
:::

::: esercizio Quanta conversione serve [medio]
Con l'equazione di Carothers, calcolare la frazione di gruppi funzionali che deve reagire per ottenere un grado di polimerizzazione medio di $50$ e di $500$.
>>> soluzione
Da $\bar X_n=1/(1-p)$ si ricava $p=1-1/\bar X_n$: per $50$ serve $p=0{,}98$, per $500$ serve $p=0{,}998$. Decuplicare la lunghezza delle catene richiede di ridurre di dieci volte la frazione di gruppi non reagiti.
:::

::: esercizio Masse uguali [medio]
Un campione contiene un grammo di catene da $10\,000\un{g/mol}$, un grammo da $50\,000$ e un grammo da $100\,000\un{g/mol}$. Calcolare $M_n$, $M_w$ e la dispersità, e confrontarli con quelli dell'esempio del testo, che aveva una mole di ciascun tipo.
>>> soluzione
Le moli sono $1{,}0\times10^{-4}$, $2{,}0\times10^{-5}$ e $1{,}0\times10^{-5}$, in totale $1{,}3\times10^{-4}$. $M_n=3/(1{,}3\times10^{-4})\simeq23\,100\un{g/mol}$. Con le frazioni in massa uguali, $M_w$ è la media semplice delle masse: $53\,300\un{g/mol}$. La dispersità è $2{,}31$. Rispetto all'esempio, dove abbondavano in massa le catene lunghe, qui le catene corte sono molto più numerose e abbassano soprattutto la media numerica.
:::

::: esercizio Bruciare il PVC [medio]
Calcolare la massa di acido cloridrico che si libera nella combustione completa di $1{,}00\un{kg}$ di PVC, supponendo che tutto il cloro si trasformi in $\mathrm{HCl}$.
>>> soluzione
L'unità $\mathrm{C_2H_3Cl}$ ha massa $62{,}50\un{g/mol}$: $1{,}00\un{kg}$ contiene $16{,}0\un{mol}$ di unità e altrettante di cloro. Si formano $16{,}0\un{mol}$ di $\mathrm{HCl}$, cioè $16{,}0\times36{,}46\simeq583\un{g}$. Per questo gli inceneritori che ricevono PVC devono neutralizzare i fumi con sostanze basiche.
:::

::: esercizio Riciclo chimico del PET [medio]
L'idrolisi completa del PET restituisce acido tereftalico, $\mathrm{C_8H_6O_4}$, e glicole etilenico, $\mathrm{C_2H_6O_2}$. Calcolare le masse dei due prodotti e dell'acqua consumata nell'idrolisi di una bottiglia da $25{,}0\un{g}$.
>>> soluzione
Ogni unità $\mathrm{C_{10}H_8O_4}$, di massa $192{,}17\un{g/mol}$, reagisce con due molecole d'acqua. Le unità sono $25{,}0/192{,}17=0{,}130\un{mol}$. Si ottengono $0{,}130\times166{,}13\simeq21{,}6\un{g}$ di acido tereftalico e $0{,}130\times62{,}07\simeq8{,}07\un{g}$ di glicole, consumando $0{,}260\un{mol}$ di acqua, $4{,}69\un{g}$. Il bilancio torna: $25{,}0+4{,}69\simeq21{,}6+8{,}07$.
:::

::: esercizio Un piccolo eccesso [avanzato]
Se i due monomeri di una poliammide sono nel rapporto $r=N_A/N_B<1$, la relazione di Carothers diventa $\bar X_n=(1+r)/(1+r-2rp)$. Calcolare il grado di polimerizzazione massimo, con reazione completa del monomero in difetto, per $r=0{,}99$, e spiegare il risultato.
>>> soluzione
Con $p=1$, $\bar X_n=(1+r)/(1-r)=1{,}99/0{,}01=199$. Un eccesso dell'$1\%$ di uno dei due monomeri limita le catene a circa duecento unità, anche con reazione perfetta: a un certo punto tutte le estremità portano il gruppo in eccesso, che non può reagire con sé stesso.
:::

::: esercizio Quante catene corte [avanzato]
Nella distribuzione di Flory la frazione numerica di catene con esattamente $x$ unità è $(1-p)\,p^{x-1}$. Per $p=0{,}99$ calcolare la frazione di molecole che sono monomeri isolati e quella di molecole con al più dieci unità.
>>> soluzione
I monomeri sono la frazione $1-p=0{,}01$, l'$1\%$ delle molecole. Sommando i termini da $x=1$ a $10$ si ottiene una serie geometrica, $1-p^{10}=1-0{,}99^{10}\simeq0{,}096$: quasi il $10\%$ delle molecole ha al più dieci unità, anche se la media numerica è di cento.
:::

::: esercizio Contare le catene con l'osmosi [avanzato]
Una soluzione con $5{,}0\un{g/L}$ di un polimero ha, a $25\,^\circ\mathrm C$, una pressione osmotica di $125\un{Pa}$. Calcolare la massa molare media numerica, supponendo valida la legge $\Pi=cRT$.
>>> soluzione
La concentrazione è $c=\Pi/(RT)$, cioè $125/(8{,}314\times298{,}15)=0{,}0504\un{mol/m^3}$, ovvero $5{,}04\times10^{-5}\un{mol/L}$. La massa molare è $5{,}0/5{,}04\times10^{-5}\simeq9{,}9\times10^4\un{g/mol}$. La pressione, pari a quella di una colonna d'acqua di poco più di un centimetro, è misurabile; per i polimeri la pressione osmotica conta le catene, e dà quindi la media numerica.
:::

::: esercizio Il destino dei rifiuti di plastica [avanzato]
Con i dati dell'OCSE per il 2019, $353$ milioni di tonnellate di rifiuti di plastica, di cui il $9\%$ riciclato, il $19\%$ incenerito e circa il $50\%$ in discarica, calcolare le quantità corrispondenti e quella che resta, gestita in modo inadeguato o dispersa.
>>> soluzione
Riciclati circa $32$ milioni di tonnellate, inceneriti circa $67$, in discarica circa $177$. La parte restante, circa il $22\%$, corrisponde a circa $78$ milioni di tonnellate all'anno, gestite in modo inadeguato o disperse nell'ambiente.
:::

::: esercizio Polietilene radicalico [avanzato]
In una polimerizzazione radicalica di etilene ogni radicale iniziatore addiziona in media $5000$ molecole di monomero prima della terminazione, che avviene per unione di due catene. Stimare il grado di polimerizzazione medio e la massa molare media numerica del polimero, trascurando i frammenti di iniziatore.
>>> soluzione
L'unione di due catene raddoppia la lunghezza: $\bar X_n\simeq10\,000$ unità, e $M_n\simeq10\,000\times28{,}05\simeq2{,}8\times10^5\un{g/mol}$, il valore tipico citato nel testo.
:::

## Fonti {#fonti}

Il testo, le figure, gli esempi e gli esercizi di questo capitolo sono originali; le composizioni dei campioni negli esempi e negli esercizi sono illustrative, e la distribuzione delle lunghezze di catena della figura è calcolata con il modello statistico di Flory. Per la scelta e l'ordine degli argomenti il riferimento principale è il manuale di R. H. Petrucci, F. G. Herring, J. D. Madura e C. Bissonnette, *General Chemistry: Principles and Modern Applications*, 11ª edizione, Pearson Canada, Toronto, 2017, paragrafi 27-8 e 26-7. I dati numerici provengono dalle fonti seguenti.

1. Masse molari: pesi atomici standard IUPAC (CIAAW). Costante dei gas: CODATA 2022.
2. Densità del polietilene a bassa e ad alta densità, temperature di transizione vetrosa, temperatura di fusione del polipropilene isotattico e temperatura massima d'uso del PTFE: J. E. Mark (a cura di), *Physical Properties of Polymers Handbook*, Springer, e schede tecniche dei produttori.
3. Produzione e destino dei rifiuti di plastica: OECD, *Global Plastics Outlook: Economic Drivers, Environmental Impacts and Policy Options*, OECD Publishing, Parigi, 2022.
4. Codici di identificazione delle resine: norma ASTM D7611. Definizione di microplastica: stessa fonte OCSE.
5. Per la storia: H. Staudinger, Ber. Dtsch. Chem. Ges. 53 (1920) 1073; W. H. Carothers, Chem. Rev. 8 (1931) 353 e Trans. Faraday Soc. 32 (1936) 39; P. J. Flory, J. Am. Chem. Soc. 58 (1936) 1877; K. Ziegler et al., Angew. Chem. 67 (1955) 541; G. Natta, J. Polym. Sci. 16 (1955) 143; C. Goodyear, brevetto statunitense 3633 (1844); L. H. Baekeland, brevetto statunitense 942699 (1909); premi Nobel per la chimica 1953 e 1963.
