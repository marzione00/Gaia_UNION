---
unit: biology-16
titolo: Le prime tracce della vita e il tempo geologico
sottotitolo: Datazione radiometrica, zirconi, stromatoliti, isotopi del carbonio e i dibattiti sui fossili più antichi
volume: Volume di biologia
fonte: Testo originale; riferimenti principali A. M. Shaw, Astrochemistry, §6.4, 7.3, 7.5; J. R. Morris et al., Biology: How Life Works, 2ª ed., §23.3, 26.6
---

## Prima di cominciare {#apertura}

Nel 1862 William Thomson, il futuro Lord Kelvin, calcolò l'età della Terra supponendo che fosse nata come una sfera di roccia fusa e che da allora si fosse raffreddata per conduzione. Ottenne un valore fra venti e quattrocento milioni di anni, troppo poco per l'evoluzione lenta immaginata da Darwin, che ne fu turbato. I calcoli di Kelvin erano corretti; il suo modello trascurava una sorgente di calore che nessuno conosceva, la radioattività, scoperta da Henri Becquerel nel 1896. Pochi anni dopo la radioattività fornì anche il metodo per misurare il tempo profondo. Nel 1907 Bertram Boltwood datò alcune rocce misurando il piombo prodotto dal decadimento dell'uranio e trovò età comprese fra circa quattrocento milioni e oltre due miliardi di anni.

Oggi sappiamo che la Terra ha circa $4{,}54$ miliardi di anni e che le prime tracce di vita sicure hanno circa $3{,}5$ miliardi di anni: la vita occupa almeno i tre quarti della storia del pianeta. Ma quanto è sicura una traccia di vita così antica? Le rocce di quell'età sono rare, deformate, scaldate, attraversate da fluidi che hanno alterato la loro chimica. Strutture che sembrano fossili possono essersi formate senza la vita, e molecole che sembrano antiche possono essere contaminazioni recenti. Lo studio delle prime tracce della vita è un'indagine in cui ogni prova va esaminata con sospetto, ed è lo stesso tipo di indagine che le sonde dovranno condurre su Marte.

Questo capitolo spiega come si datano le rocce con il decadimento radioattivo, presenta la scala dei tempi geologici e i minerali più antichi, descrive le tre principali famiglie di prove della vita antica, cioè gli isotopi del carbonio, gli stromatoliti e i microfossili, e ricostruisce i dibattiti sulle prove più antiche.

::: obiettivi
- usare la legge del decadimento radioattivo e calcolare l'età di un campione dal rapporto fra isotopo figlio e isotopo padre;
- scegliere il sistema radiometrico adatto a un intervallo di tempo e discuterne le ipotesi;
- descrivere la scala dei tempi geologici e i minerali e le rocce più antichi;
- calcolare e interpretare il valore $\delta^{13}\mathrm C$ di un campione;
- descrivere gli stromatoliti e i microfossili e i criteri per riconoscerne l'origine biologica;
- discutere le prove più antiche di vita e le ragioni dei dibattiti che le accompagnano.
:::

Il capitolo usa il decadimento radioattivo del capitolo [Fotoni ed energia quantizzata](unit:physics-25), gli isotopi del capitolo [Atomi, isotopi e massa media](unit:chemistry-02) e i rapporti isotopici delle meteoriti del capitolo [Meteoriti, comete e campioni di asteroidi](unit:biology-05).

## Il decadimento radioattivo come orologio {#decadimento}

Un nucleo radioattivo si trasforma in un altro nucleo in un istante del tutto casuale, ma una popolazione di molti nuclei identici decade in modo prevedibile: in ogni intervallo di tempo una frazione fissa dei nuclei ancora presenti si trasforma. Il numero $P$ di nuclei padri segue quindi la legge esponenziale

$$P(t)=P_0\,\mathrm e^{-\lambda t},$$

dove $\lambda$ è la costante di decadimento. Il **tempo di dimezzamento** $t_{1/2}$ è il tempo in cui i nuclei si riducono alla metà, e vale $t_{1/2}=\ln2/\lambda$. Dopo un tempo di dimezzamento resta metà dei padri, dopo due un quarto, dopo tre un ottavo. Il tempo di dimezzamento è in pratica indipendente dalla temperatura, dalla pressione e dallo stato chimico dell'elemento, ed è per questo un orologio affidabile.

Ogni nucleo padre che decade diventa un nucleo **figlio**. Se un minerale si è formato senza figli e da allora non ha perso né acquistato atomi dell'uno o dell'altro, il numero di figli è $D=P_0-P$, e il rapporto fra figli e padri cresce nel tempo (figura 1).

::: figura decadimento
{"w":860,"h":290,"items":[{"t":"axes","o":[80,250],"x":[760,"tempo, in tempi di dimezzamento"],"y":[240,"frazione dei nuclei"],"sx":100,"sy":200,"xt":[[0,"0"],[1,"1"],[2,"2"],[3,"3"],[4,"4"],[5,"5"]],"yt":[[0,"0"],[0.25,"0,25"],[0.5,"0,50"],[0.75,"0,75"],[1,"1"]]},{"t":"plot","o":[80,250],"sx":100,"sy":200,"pts":[[0.0,1.0],[0.02,0.9862327],[0.04,0.9726549],[0.06,0.9592641],[0.08,0.9460576],[0.1,0.933033],[0.12,0.9201877],[0.14,0.9075192],[0.16,0.8950251],[0.18,0.882703],[0.2,0.8705506],[0.22,0.8585654],[0.24,0.8467453],[0.26,0.8350879],[0.28,0.823591],[0.3,0.8122524],[0.32,0.8010699],[0.34,0.7900413],[0.36,0.7791646],[0.38,0.7684376],[0.4,0.7578583],[0.42,0.7474246],[0.44,0.7371346],[0.46,0.7269863],[0.48,0.7169776],[0.5,0.7071068],[0.52,0.6973718],[0.54,0.6877709],[0.56,0.6783022],[0.58,0.6689638],[0.6,0.659754],[0.62,0.6506709],[0.64,0.6417129],[0.66,0.6328783],[0.68,0.6241653],[0.7,0.6155722],[0.72,0.6070974],[0.74,0.5987394],[0.76,0.5904963],[0.78,0.5823668],[0.8,0.5743492],[0.82,0.5664419],[0.84,0.5586436],[0.86,0.5509526],[0.88,0.5433674],[0.9,0.5358867],[0.92,0.528509],[0.94,0.5212329],[0.96,0.5140569],[0.98,0.5069797],[1.0,0.5],[1.02,0.4931164],[1.04,0.4863275],[1.06,0.4796321],[1.08,0.4730288],[1.1,0.4665165],[1.12,0.4600938],[1.14,0.4537596],[1.16,0.4475125],[1.18,0.4413515],[1.2,0.4352753],[1.22,0.4292827],[1.24,0.4233727],[1.26,0.417544],[1.28,0.4117955],[1.3,0.4061262],[1.32,0.4005349],[1.34,0.3950207],[1.36,0.3895823],[1.38,0.3842188],[1.4,0.3789291],[1.42,0.3737123],[1.44,0.3685673],[1.46,0.3634931],[1.48,0.3584888],[1.5,0.3535534],[1.52,0.3486859],[1.54,0.3438855],[1.56,0.3391511],[1.58,0.3344819],[1.6,0.329877],[1.62,0.3253355],[1.64,0.3208565],[1.66,0.3164391],[1.68,0.3120826],[1.7,0.3077861],[1.72,0.3035487],[1.74,0.2993697],[1.76,0.2952482],[1.78,0.2911834],[1.8,0.2871746],[1.82,0.283221],[1.84,0.2793218],[1.86,0.2754763],[1.88,0.2716837],[1.9,0.2679434],[1.92,0.2642545],[1.94,0.2606164],[1.96,0.2570285],[1.98,0.2534899],[2.0,0.25],[2.02,0.2465582],[2.04,0.2431637],[2.06,0.239816],[2.08,0.2365144],[2.1,0.2332582],[2.12,0.2300469],[2.14,0.2268798],[2.16,0.2237563],[2.18,0.2206757],[2.2,0.2176376],[2.22,0.2146414],[2.24,0.2116863],[2.26,0.208772],[2.28,0.2058978],[2.3,0.2030631],[2.32,0.2002675],[2.34,0.1975103],[2.36,0.1947911],[2.38,0.1921094],[2.4,0.1894646],[2.42,0.1868562],[2.44,0.1842837],[2.46,0.1817466],[2.48,0.1792444],[2.5,0.1767767],[2.52,0.174343],[2.54,0.1719427],[2.56,0.1695755],[2.58,0.1672409],[2.6,0.1649385],[2.62,0.1626677],[2.64,0.1604282],[2.66,0.1582196],[2.68,0.1560413],[2.7,0.1538931],[2.72,0.1517744],[2.74,0.1496848],[2.76,0.1476241],[2.78,0.1455917],[2.8,0.1435873],[2.82,0.1416105],[2.84,0.1396609],[2.86,0.1377381],[2.88,0.1358419],[2.9,0.1339717],[2.92,0.1321273],[2.94,0.1303082],[2.96,0.1285142],[2.98,0.1267449],[3.0,0.125],[3.02,0.1232791],[3.04,0.1215819],[3.06,0.119908],[3.08,0.1182572],[3.1,0.1166291],[3.12,0.1150235],[3.14,0.1134399],[3.16,0.1118781],[3.18,0.1103379],[3.2,0.1088188],[3.22,0.1073207],[3.24,0.1058432],[3.26,0.104386],[3.28,0.1029489],[3.3,0.1015315],[3.32,0.1001337],[3.34,0.0987552],[3.36,0.0973956],[3.38,0.0960547],[3.4,0.0947323],[3.42,0.0934281],[3.44,0.0921418],[3.46,0.0908733],[3.48,0.0896222],[3.5,0.0883883],[3.52,0.0871715],[3.54,0.0859714],[3.56,0.0847878],[3.58,0.0836205],[3.6,0.0824692],[3.62,0.0813339],[3.64,0.0802141],[3.66,0.0791098],[3.68,0.0780207],[3.7,0.0769465],[3.72,0.0758872],[3.74,0.0748424],[3.76,0.073812],[3.78,0.0727958],[3.8,0.0717936],[3.82,0.0708052],[3.84,0.0698304],[3.86,0.0688691],[3.88,0.0679209],[3.9,0.0669858],[3.92,0.0660636],[3.94,0.0651541],[3.96,0.0642571],[3.98,0.0633725],[4.0,0.0625],[4.02,0.0616395],[4.04,0.0607909],[4.06,0.059954],[4.08,0.0591286],[4.1,0.0583146],[4.12,0.0575117],[4.14,0.0567199],[4.16,0.0559391],[4.18,0.0551689],[4.2,0.0544094],[4.22,0.0536603],[4.24,0.0529216],[4.26,0.052193],[4.28,0.0514744],[4.3,0.0507658],[4.32,0.0500669],[4.34,0.0493776],[4.36,0.0486978],[4.38,0.0480273],[4.4,0.0473661],[4.42,0.046714],[4.44,0.0460709],[4.46,0.0454366],[4.48,0.0448111],[4.5,0.0441942],[4.52,0.0435857],[4.54,0.0429857],[4.56,0.0423939],[4.58,0.0418102],[4.6,0.0412346],[4.62,0.0406669],[4.64,0.0401071],[4.66,0.0395549],[4.68,0.0390103],[4.7,0.0384733],[4.72,0.0379436],[4.74,0.0374212],[4.76,0.036906],[4.78,0.0363979],[4.8,0.0358968],[4.82,0.0354026],[4.84,0.0349152],[4.86,0.0344345],[4.88,0.0339605],[4.9,0.0334929],[4.92,0.0330318],[4.94,0.0325771],[4.96,0.0321286],[4.98,0.0316862],[5.0,0.03125]],"c":"force2","w":2.6},{"t":"plot","o":[80,250],"sx":100,"sy":200,"pts":[[0.0,0.0],[0.02,0.0137673],[0.04,0.0273451],[0.06,0.0407359],[0.08,0.0539424],[0.1,0.066967],[0.12,0.0798123],[0.14,0.0924808],[0.16,0.1049749],[0.18,0.117297],[0.2,0.1294494],[0.22,0.1414346],[0.24,0.1532547],[0.26,0.1649121],[0.28,0.176409],[0.3,0.1877476],[0.32,0.1989301],[0.34,0.2099587],[0.36,0.2208354],[0.38,0.2315624],[0.4,0.2421417],[0.42,0.2525754],[0.44,0.2628654],[0.46,0.2730137],[0.48,0.2830224],[0.5,0.2928932],[0.52,0.3026282],[0.54,0.3122291],[0.56,0.3216978],[0.58,0.3310362],[0.6,0.340246],[0.62,0.3493291],[0.64,0.3582871],[0.66,0.3671217],[0.68,0.3758347],[0.7,0.3844278],[0.72,0.3929026],[0.74,0.4012606],[0.76,0.4095037],[0.78,0.4176332],[0.8,0.4256508],[0.82,0.4335581],[0.84,0.4413564],[0.86,0.4490474],[0.88,0.4566326],[0.9,0.4641133],[0.92,0.471491],[0.94,0.4787671],[0.96,0.4859431],[0.98,0.4930203],[1.0,0.5],[1.02,0.5068836],[1.04,0.5136725],[1.06,0.5203679],[1.08,0.5269712],[1.1,0.5334835],[1.12,0.5399062],[1.14,0.5462404],[1.16,0.5524875],[1.18,0.5586485],[1.2,0.5647247],[1.22,0.5707173],[1.24,0.5766273],[1.26,0.582456],[1.28,0.5882045],[1.3,0.5938738],[1.32,0.5994651],[1.34,0.6049793],[1.36,0.6104177],[1.38,0.6157812],[1.4,0.6210709],[1.42,0.6262877],[1.44,0.6314327],[1.46,0.6365069],[1.48,0.6415112],[1.5,0.6464466],[1.52,0.6513141],[1.54,0.6561145],[1.56,0.6608489],[1.58,0.6655181],[1.6,0.670123],[1.62,0.6746645],[1.64,0.6791435],[1.66,0.6835609],[1.68,0.6879174],[1.7,0.6922139],[1.72,0.6964513],[1.74,0.7006303],[1.76,0.7047518],[1.78,0.7088166],[1.8,0.7128254],[1.82,0.716779],[1.84,0.7206782],[1.86,0.7245237],[1.88,0.7283163],[1.9,0.7320566],[1.92,0.7357455],[1.94,0.7393836],[1.96,0.7429715],[1.98,0.7465101],[2.0,0.75],[2.02,0.7534418],[2.04,0.7568363],[2.06,0.760184],[2.08,0.7634856],[2.1,0.7667418],[2.12,0.7699531],[2.14,0.7731202],[2.16,0.7762437],[2.18,0.7793243],[2.2,0.7823624],[2.22,0.7853586],[2.24,0.7883137],[2.26,0.791228],[2.28,0.7941022],[2.3,0.7969369],[2.32,0.7997325],[2.34,0.8024897],[2.36,0.8052089],[2.38,0.8078906],[2.4,0.8105354],[2.42,0.8131438],[2.44,0.8157163],[2.46,0.8182534],[2.48,0.8207556],[2.5,0.8232233],[2.52,0.825657],[2.54,0.8280573],[2.56,0.8304245],[2.58,0.8327591],[2.6,0.8350615],[2.62,0.8373323],[2.64,0.8395718],[2.66,0.8417804],[2.68,0.8439587],[2.7,0.8461069],[2.72,0.8482256],[2.74,0.8503152],[2.76,0.8523759],[2.78,0.8544083],[2.8,0.8564127],[2.82,0.8583895],[2.84,0.8603391],[2.86,0.8622619],[2.88,0.8641581],[2.9,0.8660283],[2.92,0.8678727],[2.94,0.8696918],[2.96,0.8714858],[2.98,0.8732551],[3.0,0.875],[3.02,0.8767209],[3.04,0.8784181],[3.06,0.880092],[3.08,0.8817428],[3.1,0.8833709],[3.12,0.8849765],[3.14,0.8865601],[3.16,0.8881219],[3.18,0.8896621],[3.2,0.8911812],[3.22,0.8926793],[3.24,0.8941568],[3.26,0.895614],[3.28,0.8970511],[3.3,0.8984685],[3.32,0.8998663],[3.34,0.9012448],[3.36,0.9026044],[3.38,0.9039453],[3.4,0.9052677],[3.42,0.9065719],[3.44,0.9078582],[3.46,0.9091267],[3.48,0.9103778],[3.5,0.9116117],[3.52,0.9128285],[3.54,0.9140286],[3.56,0.9152122],[3.58,0.9163795],[3.6,0.9175308],[3.62,0.9186661],[3.64,0.9197859],[3.66,0.9208902],[3.68,0.9219793],[3.7,0.9230535],[3.72,0.9241128],[3.74,0.9251576],[3.76,0.926188],[3.78,0.9272042],[3.8,0.9282064],[3.82,0.9291948],[3.84,0.9301696],[3.86,0.9311309],[3.88,0.9320791],[3.9,0.9330142],[3.92,0.9339364],[3.94,0.9348459],[3.96,0.9357429],[3.98,0.9366275],[4.0,0.9375],[4.02,0.9383605],[4.04,0.9392091],[4.06,0.940046],[4.08,0.9408714],[4.1,0.9416854],[4.12,0.9424883],[4.14,0.9432801],[4.16,0.9440609],[4.18,0.9448311],[4.2,0.9455906],[4.22,0.9463397],[4.24,0.9470784],[4.26,0.947807],[4.28,0.9485256],[4.3,0.9492342],[4.32,0.9499331],[4.34,0.9506224],[4.36,0.9513022],[4.38,0.9519727],[4.4,0.9526339],[4.42,0.953286],[4.44,0.9539291],[4.46,0.9545634],[4.48,0.9551889],[4.5,0.9558058],[4.52,0.9564143],[4.54,0.9570143],[4.56,0.9576061],[4.58,0.9581898],[4.6,0.9587654],[4.62,0.9593331],[4.64,0.9598929],[4.66,0.9604451],[4.68,0.9609897],[4.7,0.9615267],[4.72,0.9620564],[4.74,0.9625788],[4.76,0.963094],[4.78,0.9636021],[4.8,0.9641032],[4.82,0.9645974],[4.84,0.9650848],[4.86,0.9655655],[4.88,0.9660395],[4.9,0.9665071],[4.92,0.9669682],[4.94,0.9674229],[4.96,0.9678714],[4.98,0.9683138],[5.0,0.96875]],"c":"force","w":2.6},{"t":"line","p":[180,250,180,150.0],"c":"muted","w":1,"dash":true},{"t":"line","p":[280,250,280,100.0],"c":"muted","w":1,"dash":true},{"t":"line","p":[380,250,380,75.0],"c":"muted","w":1,"dash":true},{"t":"circle","p":[180,150.0,5],"c":"force4"},{"t":"text","p":[200,154.0],"s":"padri = figli","c":"force4","size":11,"a":"start"},{"t":"circle","p":[280,200.0,4],"c":"force2"},{"t":"circle","p":[280,100.0,4],"c":"force"},{"t":"text","p":[288,192.0],"s":"1/4","c":"force2","size":11,"a":"start"},{"t":"text","p":[288,116.0],"s":"3/4","c":"force","size":11,"a":"start"},{"t":"circle","p":[380,225.0,4],"c":"force2"},{"t":"text","p":[388,217.0],"s":"1/8","c":"force2","size":11,"a":"start"},{"t":"text","p":[540.0,229.8],"s":"padri P","c":"force2","size":12},{"t":"text","p":[540.0,76.2],"s":"figli D","c":"force","size":12}]}
---
Frazione di nuclei padri e di nuclei figli in un sistema chiuso, in funzione del tempo misurato in tempi di dimezzamento. Dopo un tempo di dimezzamento padri e figli sono in numero uguale; dopo due i figli sono tre volte i padri.
:::

::: legge Età radiometrica
In un sistema chiuso, senza figli all'inizio, si ha $P_0/P=1+D/P=\mathrm e^{\lambda t}$, e l'età è

$$t=\frac{t_{1/2}}{\ln2}\,\ln\left(1+\frac DP\right).$$
:::

Se il rapporto fra figli e padri vale $1$, l'età è esattamente un tempo di dimezzamento; se vale $3$, due tempi di dimezzamento; se vale $7$, tre. La relazione è logaritmica, e la sensibilità del metodo è massima quando l'età è dell'ordine del tempo di dimezzamento (figura 2). Per questo si sceglie il sistema adatto all'intervallo di tempo da misurare. La formula vale così com'è quando ogni decadimento del padre produce il figlio misurato. Il potassio-40 fa eccezione: solo circa l'$11\%$ dei suoi decadimenti produce argon-40, mentre gli altri producono calcio-40, indistinguibile dal calcio già presente nella roccia; nel metodo potassio-argon il rapporto misurato va quindi diviso per questa frazione prima di applicare la formula.

| Sistema | Tempo di dimezzamento | Uso tipico |
|---|---|---|
| carbonio-14 → azoto-14 | $5730$ anni | resti organici fino a circa $50\,000$ anni |
| potassio-40 → argon-40 | $1{,}25$ miliardi di anni | rocce vulcaniche (con una correzione) |
| uranio-235 → piombo-207 | $0{,}704$ miliardi di anni | zirconi |
| uranio-238 → piombo-206 | $4{,}47$ miliardi di anni | zirconi, meteoriti |
| rubidio-87 → stronzio-87 | $49{,}6$ miliardi di anni | rocce antiche, isocrone |

::: figura eta
{"w":740,"h":305,"items":[{"t":"axes","o":[80,270],"x":[640,"rapporto figli/padri D/P"],"y":[250,"età, miliardi di anni"],"sx":230,"sy":30,"xt":[[0,"0"],[0.5,"0,5"],[1,"1"],[1.5,"1,5"],[2,"2"]],"yt":[[0,"0"],[1,"1"],[2,"2"],[3,"3"],[4,"4"],[5,"5"],[6,"6"],[7,"7"]]},{"t":"plot","o":[80,270],"sx":230,"sy":30,"pts":[[0.0,0.0],[0.01,0.0641394],[0.02,0.127647],[0.03,0.1905349],[0.04,0.2528152],[0.05,0.3144995],[0.06,0.3755991],[0.07,0.436125],[0.08,0.4960879],[0.09,0.5554981],[0.1,0.6143657],[0.11,0.6727006],[0.12,0.7305123],[0.13,0.7878101],[0.14,0.8446031],[0.15,0.9009001],[0.16,0.9567096],[0.17,1.0120401],[0.18,1.0668997],[0.19,1.1212963],[0.2,1.1752377],[0.21,1.2287315],[0.22,1.281785],[0.23,1.3344054],[0.24,1.3865997],[0.25,1.4383747],[0.26,1.4897372],[0.27,1.5406937],[0.28,1.5912505],[0.29,1.6414139],[0.3,1.6911899],[0.31,1.7405845],[0.32,1.7896035],[0.33,1.8382525],[0.34,1.886537],[0.35,1.9344626],[0.36,1.9820345],[0.37,2.0292579],[0.38,2.0761378],[0.39,2.1226793],[0.4,2.1688871],[0.41,2.214766],[0.42,2.2603207],[0.43,2.3055557],[0.44,2.3504755],[0.45,2.3950844],[0.46,2.4393867],[0.47,2.4833866],[0.48,2.5270882],[0.49,2.5704955],[0.5,2.6136125],[0.51,2.6564429],[0.52,2.6989907],[0.53,2.7412594],[0.54,2.7832528],[0.55,2.8249744],[0.56,2.8664277],[0.57,2.9076161],[0.58,2.9485429],[0.59,2.9892116],[0.6,3.0296253],[0.61,3.0697872],[0.62,3.1097004],[0.63,3.1493679],[0.64,3.1887929],[0.65,3.2279782],[0.66,3.2669267],[0.67,3.3056413],[0.68,3.3441248],[0.69,3.3823799],[0.7,3.4204092],[0.71,3.4582156],[0.72,3.4958015],[0.73,3.5331695],[0.74,3.5703221],[0.75,3.6072618],[0.76,3.643991],[0.77,3.6805121],[0.78,3.7168275],[0.79,3.7529394],[0.8,3.7888502],[0.81,3.824562],[0.82,3.860077],[0.83,3.8953974],[0.84,3.9305254],[0.85,3.9654629],[0.86,4.0002121],[0.87,4.034775],[0.88,4.0691535],[0.89,4.1033497],[0.9,4.1373654],[0.91,4.1712025],[0.92,4.204863],[0.93,4.2383486],[0.94,4.2716611],[0.95,4.3048024],[0.96,4.3377741],[0.97,4.3705781],[0.98,4.4032159],[0.99,4.4356893],[1.0,4.468],[1.01,4.5001495],[1.02,4.5321394],[1.03,4.5639714],[1.04,4.595647],[1.05,4.6271676],[1.06,4.6585349],[1.07,4.6897503],[1.08,4.7208152],[1.09,4.7517311],[1.1,4.7824995],[1.11,4.8131217],[1.12,4.8435991],[1.13,4.8739331],[1.14,4.904125],[1.15,4.9341762],[1.16,4.9640879],[1.17,4.9938615],[1.18,5.0234981],[1.19,5.0529991],[1.2,5.0823657],[1.21,5.1115992],[1.22,5.1407006],[1.23,5.1696713],[1.24,5.1985123],[1.25,5.2272249],[1.26,5.2558101],[1.27,5.2842692],[1.28,5.3126031],[1.29,5.3408131],[1.3,5.3689001],[1.31,5.3968653],[1.32,5.4247096],[1.33,5.4524342],[1.34,5.4800401],[1.35,5.5075283],[1.36,5.5348997],[1.37,5.5621554],[1.38,5.5892963],[1.39,5.6163234],[1.4,5.6432377],[1.41,5.6700401],[1.42,5.6967315],[1.43,5.7233128],[1.44,5.749785],[1.45,5.7761489],[1.46,5.8024054],[1.47,5.8285553],[1.48,5.8545997],[1.49,5.8805392],[1.5,5.9063747],[1.51,5.9321071],[1.52,5.9577372],[1.53,5.9832658],[1.54,6.0086937],[1.55,6.0340217],[1.56,6.0592505],[1.57,6.084381],[1.58,6.1094139],[1.59,6.13435],[1.6,6.1591899],[1.61,6.1839345],[1.62,6.2085845],[1.63,6.2331406],[1.64,6.2576035],[1.65,6.2819739],[1.66,6.3062525],[1.67,6.33044],[1.68,6.354537],[1.69,6.3785444],[1.7,6.4024626],[1.71,6.4262925],[1.72,6.4500345],[1.73,6.4736894],[1.74,6.4972579],[1.75,6.5207405],[1.76,6.5441378],[1.77,6.5674505],[1.78,6.5906793],[1.79,6.6138246],[1.8,6.6368871],[1.81,6.6598673],[1.82,6.682766],[1.83,6.7055836],[1.84,6.7283207],[1.85,6.7509779],[1.86,6.7735557],[1.87,6.7960547],[1.88,6.8184755],[1.89,6.8408185],[1.9,6.8630844],[1.91,6.8852736],[1.92,6.9073867],[1.93,6.9294242],[1.94,6.9513866],[1.95,6.9732744],[1.96,6.9950882],[1.97,7.0168284],[1.98,7.0384955],[1.99,7.06009],[2.0,7.0816125]],"c":"force2","w":2.6},{"t":"line","p":[310,136.0,80,136.0],"c":"muted","w":1,"dash":true},{"t":"circle","p":[310,136.0,5],"c":"force2"},{"t":"plot","o":[80,270],"sx":230,"sy":30,"pts":[[0.0,0.0],[0.01,0.0101061],[0.02,0.0201127],[0.03,0.0300216],[0.04,0.0398348],[0.05,0.0495541],[0.06,0.0591812],[0.07,0.068718],[0.08,0.078166],[0.09,0.087527],[0.1,0.0968025],[0.11,0.105994],[0.12,0.1151031],[0.13,0.1241312],[0.14,0.1330798],[0.15,0.1419502],[0.16,0.1507439],[0.17,0.159462],[0.18,0.1681059],[0.19,0.1766769],[0.2,0.1851762],[0.21,0.193605],[0.22,0.2019643],[0.23,0.2102555],[0.24,0.2184794],[0.25,0.2266374],[0.26,0.2347303],[0.27,0.2427593],[0.28,0.2507252],[0.29,0.2586292],[0.3,0.2664722],[0.31,0.274255],[0.32,0.2819787],[0.33,0.2896441],[0.34,0.297252],[0.35,0.3048034],[0.36,0.3122991],[0.37,0.3197398],[0.38,0.3271265],[0.39,0.3344598],[0.4,0.3417405],[0.41,0.3489694],[0.42,0.3561472],[0.43,0.3632747],[0.44,0.3703524],[0.45,0.3773812],[0.46,0.3843617],[0.47,0.3912946],[0.48,0.3981804],[0.49,0.4050199],[0.5,0.4118136],[0.51,0.4185622],[0.52,0.4252662],[0.53,0.4319263],[0.54,0.438543],[0.55,0.4451168],[0.56,0.4516484],[0.57,0.4581382],[0.58,0.4645869],[0.59,0.4709948],[0.6,0.4773626],[0.61,0.4836907],[0.62,0.4899796],[0.63,0.4962299],[0.64,0.5024419],[0.65,0.5086161],[0.66,0.514753],[0.67,0.5208531],[0.68,0.5269167],[0.69,0.5329444],[0.7,0.5389365],[0.71,0.5448934],[0.72,0.5508156],[0.73,0.5567035],[0.74,0.5625575],[0.75,0.5683779],[0.76,0.5741651],[0.77,0.5799195],[0.78,0.5856416],[0.79,0.5913315],[0.8,0.5969898],[0.81,0.6026167],[0.82,0.6082127],[0.83,0.6137779],[0.84,0.6193129],[0.85,0.6248178],[0.86,0.630293],[0.87,0.6357389],[0.88,0.6411558],[0.89,0.6465439],[0.9,0.6519036],[0.91,0.6572351],[0.92,0.6625388],[0.93,0.667815],[0.94,0.6730639],[0.95,0.6782858],[0.96,0.683481],[0.97,0.6886497],[0.98,0.6937923],[0.99,0.698909],[1.0,0.704],[1.01,0.7090656],[1.02,0.7141061],[1.03,0.7191217],[1.04,0.7241127],[1.05,0.7290792],[1.06,0.7340216],[1.07,0.7389401],[1.08,0.7438348],[1.09,0.7487061],[1.1,0.7535541],[1.11,0.7583791],[1.12,0.7631812],[1.13,0.7679608],[1.14,0.772718],[1.15,0.777453],[1.16,0.782166],[1.17,0.7868573],[1.18,0.791527],[1.19,0.7961753],[1.2,0.8008025],[1.21,0.8054086],[1.22,0.809994],[1.23,0.8145588],[1.24,0.8191031],[1.25,0.8236272],[1.26,0.8281312],[1.27,0.8326154],[1.28,0.8370798],[1.29,0.8415247],[1.3,0.8459502],[1.31,0.8503566],[1.32,0.8547439],[1.33,0.8591123],[1.34,0.863462],[1.35,0.8677932],[1.36,0.8721059],[1.37,0.8764005],[1.38,0.8806769],[1.39,0.8849355],[1.4,0.8891762],[1.41,0.8933993],[1.42,0.897605],[1.43,0.9017932],[1.44,0.9059643],[1.45,0.9101184],[1.46,0.9142555],[1.47,0.9183758],[1.48,0.9224794],[1.49,0.9265666],[1.5,0.9306374],[1.51,0.9346919],[1.52,0.9387303],[1.53,0.9427527],[1.54,0.9467593],[1.55,0.9507501],[1.56,0.9547252],[1.57,0.9586849],[1.58,0.9626292],[1.59,0.9665583],[1.6,0.9704722],[1.61,0.9743711],[1.62,0.978255],[1.63,0.9821242],[1.64,0.9859787],[1.65,0.9898186],[1.66,0.9936441],[1.67,0.9974552],[1.68,1.001252],[1.69,1.0050347],[1.7,1.0088034],[1.71,1.0125582],[1.72,1.0162991],[1.73,1.0200263],[1.74,1.0237398],[1.75,1.0274399],[1.76,1.0311265],[1.77,1.0347997],[1.78,1.0384598],[1.79,1.0421066],[1.8,1.0457405],[1.81,1.0493614],[1.82,1.0529694],[1.83,1.0565646],[1.84,1.0601472],[1.85,1.0637172],[1.86,1.0672747],[1.87,1.0708197],[1.88,1.0743524],[1.89,1.0778729],[1.9,1.0813812],[1.91,1.0848775],[1.92,1.0883617],[1.93,1.0918341],[1.94,1.0952946],[1.95,1.0987433],[1.96,1.1021804],[1.97,1.1056059],[1.98,1.1090199],[1.99,1.1124224],[2.0,1.1158136]],"c":"force","w":2.6},{"t":"line","p":[310,248.9,80,248.9],"c":"muted","w":1,"dash":true},{"t":"circle","p":[310,248.9,5],"c":"force"},{"t":"line","p":[310,270,310,136.0],"c":"muted","w":1,"dash":true},{"t":"text","p":[318,128.0],"s":"t = 4,47","c":"force2","size":11,"a":"start"},{"t":"text","p":[318,238.9],"s":"t = 0,70","c":"force","size":11,"a":"start"},{"t":"text","p":[534,45.6],"s":"uranio-238","c":"force2","size":12,"a":"end"},{"t":"text","p":[534,224.5],"s":"uranio-235","c":"force","size":12,"a":"end"}]}
---
Età di un campione in funzione del rapporto fra figli e padri, per l'uranio-235 e per l'uranio-238. A parità di rapporto, l'età è proporzionale al tempo di dimezzamento; il punto in cui il rapporto vale $1$ corrisponde a un tempo di dimezzamento.
:::

Le ipotesi del metodo sono due, e vanno verificate caso per caso. La prima è che il sistema sia rimasto chiuso: un minerale scaldato può perdere argon, che è un gas, e ringiovanire; uno attraversato da fluidi può perdere uranio o acquistare piombo. La seconda è che non ci fossero figli all'inizio, o che se ne conosca la quantità. Per affrontare entrambe i geologi usano più sistemi sullo stesso campione e il **metodo dell'isocrona**, che confronta più minerali della stessa roccia e ricava dalla loro disposizione su un grafico sia l'età sia la quantità iniziale di figli.

Il minerale preferito per le età più antiche è lo **zircone**, un silicato di zirconio molto resistente all'alterazione. Quando cristallizza accoglie l'uranio nel suo reticolo ed esclude quasi del tutto il piombo, così che il piombo misurato oggi è quasi tutto radiogenico. L'uranio ha due isotopi radioattivi, $^{238}\mathrm U$ e $^{235}\mathrm U$, che decadono in due isotopi diversi del piombo, $^{206}\mathrm{Pb}$ e $^{207}\mathrm{Pb}$, con tempi di dimezzamento diversi: un unico granello fornisce quindi due orologi indipendenti, e se le due età coincidono si ha una forte garanzia che il sistema sia rimasto chiuso.

::: storia L'età della Terra
Nel 1956 Clair Patterson misurò gli isotopi del piombo in alcune meteoriti, frammenti di asteroidi formati con la Terra e rimasti chimicamente isolati, e ricavò un'età di $4{,}55$ miliardi di anni, con un'incertezza di settanta milioni. Per ottenere misure pulite dovette eliminare il piombo che contaminava ogni superficie del laboratorio, e scoprì così che la benzina con piombo aveva contaminato l'intero pianeta; la sua battaglia contribuì al divieto di quel carburante. Oggi i più antichi solidi del Sistema solare, inclusioni di minerali ricchi di calcio e alluminio presenti in alcune meteoriti, sono datati a $4{,}5673$ miliardi di anni, e la Terra completò la sua crescita entro un centinaio di milioni di anni da quella data.
:::

## Il metodo dell'isocrona {#isocrona}

La formula dell'età presuppone che all'inizio non ci fossero figli. Per il sistema rubidio-stronzio questa ipotesi è sempre falsa: ogni roccia contiene fin dalla sua formazione un po' di stronzio-87 ereditato dal magma. Il metodo dell'isocrona elimina il problema con un'idea geometrica semplice. Si misurano più minerali della stessa roccia, che si sono separati dallo stesso magma nello stesso momento. Tutti hanno ricevuto lo stronzio con la stessa composizione isotopica, perché i processi chimici distinguono pochissimo gli isotopi di uno stesso elemento. Ciascuno ha però ricevuto una quantità diversa di rubidio, perché il rubidio e lo stronzio sono elementi diversi e si ripartiscono in modo diverso fra i minerali.

Per evitare di dover conoscere le quantità assolute, si divide tutto per lo stronzio-86, un isotopo stabile che non è prodotto da alcun decadimento. Per ogni minerale vale allora

$$\begin{aligned}\left(\frac{^{87}\mathrm{Sr}}{^{86}\mathrm{Sr}}\right)_{\!\text{oggi}}&=\left(\frac{^{87}\mathrm{Sr}}{^{86}\mathrm{Sr}}\right)_{\!0}\\&\quad+\frac{^{87}\mathrm{Rb}}{^{86}\mathrm{Sr}}\left(\mathrm e^{\lambda t}-1\right).\end{aligned}$$

È l'equazione di una retta. Riportando per ogni minerale il rapporto $^{87}\mathrm{Sr}/^{86}\mathrm{Sr}$ in funzione del rapporto $^{87}\mathrm{Rb}/^{86}\mathrm{Sr}$, i punti si allineano lungo una retta, chiamata **isocrona** perché unisce campioni della stessa età (figura 3). L'intercetta è la composizione iniziale dello stronzio; la pendenza $m$ vale $\mathrm e^{\lambda t}-1$, e l'età si ricava come

$$t=\frac{t_{1/2}}{\ln2}\,\ln(1+m).$$

::: figura isocrona
{"w":740,"h":305,"items":[{"t":"axes","o":[90,270],"x":[640,"rubidio-87 / stronzio-86"],"y":[250,"stronzio-87 / stronzio-86"],"sx":150,"sy":1100,"xt":[[0,"0"],[1,"1"],[2,"2"],[3,"3"]],"yt":[[0.02,"0,70"],[0.07,"0,75"],[0.12,"0,80"],[0.17,"0,85"]]},{"t":"plot","o":[90,270],"sx":150,"sy":1100,"pts":[[0,0.0205],[3.3,0.18583]],"c":"force2","w":2.4},{"t":"plot","o":[90,270],"sx":150,"sy":1100,"pts":[[0,0.0205],[3.3,0.0205]],"c":"muted","w":1.4,"dash":true},{"t":"circle","p":[105.0,247.5,4],"c":"muted"},{"t":"circle","p":[105.0,241.9,5],"c":"force2"},{"t":"circle","p":[240.0,247.5,4],"c":"muted"},{"t":"arrow","p":[240.0,241.5,240.0,200.3],"c":"force3","w":1.4,"head":6},{"t":"circle","p":[240.0,192.3,5],"c":"force2"},{"t":"circle","p":[540.0,247.5,4],"c":"muted"},{"t":"arrow","p":[540.0,241.5,540.0,90.1],"c":"force3","w":1.4,"head":6},{"t":"circle","p":[540.0,82.1,5],"c":"force2"},{"t":"text","p":[390.0,239.5],"s":"all'inizio","c":"muted","size":11},{"t":"text","p":[579.0,55.6],"s":"oggi","c":"force2","size":11,"a":"end"},{"t":"text","p":[378.0,123.2],"s":"pendenza = e^(λt) − 1","c":"force2","size":11,"a":"end"},{"t":"text","p":[100,264.5],"s":"intercetta: composizione iniziale","c":"force4","size":11,"a":"start"},{"t":"circle","p":[90,247.5,5],"c":"force4"}]}
---
Isocrona rubidio-stronzio di tre minerali della stessa roccia. Al momento della cristallizzazione i tre punti erano su una retta orizzontale; con il tempo ciascuno sale in proporzione al proprio rubidio, e la retta ruota attorno all'intercetta. La pendenza misura l'età.
:::

::: esempio Un'isocrona di tre minerali
Tre minerali di una roccia danno le coppie ($^{87}\mathrm{Rb}/^{86}\mathrm{Sr}$, $^{87}\mathrm{Sr}/^{86}\mathrm{Sr}$) seguenti: $(0{,}10;\ 0{,}70551)$, $(1{,}00;\ 0{,}75060)$, $(3{,}00;\ 0{,}85080)$. La pendenza fra il primo e l'ultimo punto è

$$m=\frac{0{,}85080-0{,}70551}{3{,}00-0{,}10}=0{,}05010,$$

e il punto centrale cade sulla stessa retta, segno che il sistema è rimasto chiuso. Con $t_{1/2}=49{,}6$ miliardi di anni si ottiene, in miliardi di anni,

$$t=\frac{49{,}6}{0{,}693}\,\ln(1{,}0501)\approx3{,}50.$$

L'intercetta vale $0{,}7055-0{,}0501\cdot0{,}10\approx0{,}7005$: è la composizione dello stronzio nel magma originario.
:::

L'isocrona contiene un controllo interno. Se un minerale ha perso o acquistato rubidio o stronzio dopo la formazione, il suo punto esce dalla retta, e la dispersione dei punti attorno alla retta misura la qualità della datazione. Per gli zirconi si usa un controllo analogo, il **diagramma di concordia**, che confronta le due età fornite dai due isotopi dell'uranio: i granelli rimasti chiusi cadono su una curva, quelli che hanno perso piombo se ne allontanano lungo una retta che permette ancora di ricostruirne l'età.

## La scala dei tempi geologici {#scala}

La storia della Terra si divide in quattro **eoni**, i cui confini sono fissati dalla Commissione internazionale di stratigrafia (figura 4).

- L'**Adeano**, dalla formazione dei primi solidi del Sistema solare, $4567$ milioni di anni fa, fino a $4031$ milioni di anni fa. Il suo limite superiore coincide con l'età della roccia intatta più antica conosciuta. In questo eone un impatto gigante fra la Terra in formazione e un corpo delle dimensioni di Marte produsse la Luna, circa $4{,}5$ miliardi di anni fa. Dell'Adeano restano soltanto minerali isolati.
- L'**Archeano**, da $4031$ a $2500$ milioni di anni fa. È l'eone delle prime rocce sedimentarie, delle prime tracce di vita e di un'atmosfera priva di ossigeno.
- Il **Proterozoico**, da $2500$ a $538{,}8$ milioni di anni fa. Comprende il grande aumento dell'ossigeno atmosferico, la comparsa delle cellule eucariotiche e, verso la fine, i primi organismi pluricellulari complessi.
- Il **Fanerozoico**, da $538{,}8$ milioni di anni fa a oggi, l'eone degli animali con parti dure e di quasi tutti i fossili che si vedono nei musei.

I tre eoni più antichi sono spesso riuniti sotto il nome informale di **Precambriano**, che copre circa l'$88\%$ della storia del pianeta. Le età dei confini fanerozoici sono determinate con la datazione radiometrica di strati vulcanici intercalati ai sedimenti; i confini precambriani sono stati a lungo definiti direttamente da un'età numerica, perché mancano fossili che permettano di riconoscere un confine nelle rocce.

::: figura scala
{"w":800,"h":235,"items":[{"t":"rect","p":[40.0,145,85.8,12],"c":"force4","r":0},{"t":"text","p":[82.9,182],"s":"Adeano","c":"force4","size":11},{"t":"rect","p":[125.8,145,245.0,12],"c":"force2","r":0},{"t":"text","p":[248.2,182],"s":"Archeano","c":"force2","size":11},{"t":"rect","p":[370.7,145,313.8,12],"c":"force3","r":0},{"t":"text","p":[527.6,182],"s":"Proterozoico","c":"force3","size":11},{"t":"rect","p":[684.5,145,86.2,12],"c":"force","r":0},{"t":"text","p":[727.6,182],"s":"Fanerozoico","c":"force","size":11},{"t":"line","p":[40.0,157,40.0,164],"c":"ax","w":1.2},{"t":"text","p":[40.0,200],"s":"4567","c":"muted","size":10},{"t":"line","p":[125.8,157,125.8,164],"c":"ax","w":1.2},{"t":"text","p":[125.8,200],"s":"4031","c":"muted","size":10},{"t":"line","p":[370.7,157,370.7,164],"c":"ax","w":1.2},{"t":"text","p":[370.7,200],"s":"2500","c":"muted","size":10},{"t":"line","p":[684.5,157,684.5,164],"c":"ax","w":1.2},{"t":"text","p":[684.5,200],"s":"539","c":"muted","size":10},{"t":"line","p":[770.7,157,770.7,164],"c":"ax","w":1.2},{"t":"text","p":[770.7,200],"s":"0","c":"muted","size":10},{"t":"text","p":[405.4,222],"s":"milioni di anni fa","c":"ax","size":11},{"t":"line","p":[66.1,38,66.1,143],"c":"muted","w":1,"dash":true},{"t":"circle","p":[66.1,151,3.5],"c":"body"},{"t":"text","p":[62.1,32],"s":"zirconi più antichi, 4,4 Ga","c":"ax","size":11,"a":"start"},{"t":"line","p":[178.7,64,178.7,143],"c":"muted","w":1,"dash":true},{"t":"circle","p":[178.7,151,3.5],"c":"body"},{"t":"text","p":[174.7,58],"s":"Isua, 3,7 Ga","c":"ax","size":11,"a":"start"},{"t":"line","p":[213.9,90,213.9,143],"c":"muted","w":1,"dash":true},{"t":"circle","p":[213.9,151,3.5],"c":"body"},{"t":"text","p":[209.9,84],"s":"stromatoliti di Dresser, 3,48 Ga","c":"ax","size":11,"a":"start"},{"t":"line","p":[386.7,38,386.7,143],"c":"muted","w":1,"dash":true},{"t":"circle","p":[386.7,151,3.5],"c":"body"},{"t":"text","p":[382.7,32],"s":"aumento dell'ossigeno, 2,4 Ga","c":"ax","size":11,"a":"start"},{"t":"line","p":[684.5,64,684.5,143],"c":"muted","w":1,"dash":true},{"t":"circle","p":[684.5,151,3.5],"c":"body"},{"t":"text","p":[680.5,58],"s":"animali con parti dure","c":"ax","size":11,"a":"end"}]}
---
I quattro eoni della storia della Terra su una scala lineare, con alcuni eventi discussi in questo capitolo e nei capitoli successivi. L'intera storia degli animali occupa il tratto più recente, meno di un ottavo della lunghezza totale.
:::

Le durate geologiche sfuggono all'intuizione, e un artificio utile è comprimerle in un anno solare. Se i $4567$ milioni di anni dalla formazione del Sistema solare diventano $365$ giorni, ogni giorno corrisponde a circa $12{,}5$ milioni di anni. Le prime stromatoliti ben accettate, di $3{,}48$ miliardi di anni, cadono alla fine di marzo; il grande aumento dell'ossigeno, circa $2{,}4$ miliardi di anni fa, verso il solstizio d'estate; l'inizio del Fanerozoico il 18 novembre; i primi esseri umani anatomicamente moderni, circa trecentomila anni fa, una mezz'ora prima della mezzanotte del 31 dicembre. La vita microbica ha avuto per sé, da sola, più di sette mesi di questo anno.

::: metodo Convertire un'età nel calendario geologico
Il giorno dell'anno corrispondente a un evento di età $t$, misurata in milioni di anni, è

$$g=365\cdot\frac{4567-t}{4567}.$$

Per $t=538{,}8$ si ottiene $g\approx322$, cioè il 322° giorno, il 18 novembre. Per gli intervalli brevi conviene ragionare in minuti: un milione di anni corrisponde a $365\cdot1440/4567\approx115$ minuti.
:::

## I minerali e le rocce più antichi {#zirconi}

La Terra ha cancellato quasi tutta la propria infanzia. La crosta oceanica viene riassorbita nel mantello, e quasi tutta quella oggi esistente ha meno di duecento milioni di anni; quella continentale viene erosa, sepolta, riscaldata, fusa e ricristallizzata. Le rocce più antiche sopravvissute sono rare e quasi tutte fortemente trasformate dal **metamorfismo**, l'insieme delle trasformazioni che una roccia subisce quando viene portata in profondità a temperature e pressioni elevate.

Le testimonianze più antiche sono singoli granelli. Nelle Jack Hills, nell'Australia occidentale, un conglomerato di circa tre miliardi di anni contiene zirconi erosi da rocce molto più antiche e scomparse. Nel 2001 Simon Wilde e collaboratori vi trovarono un granello di $4404\pm8$ milioni di anni, il più antico materiale terrestre conosciuto. Nel 2014 il gruppo di John Valley confermò un'età di $4{,}37$ miliardi di anni per un granello dello stesso insieme, contando gli atomi di piombo uno per uno con la tomografia a sonda atomica e verificando che il piombo non si era spostato all'interno del cristallo.

Questi zirconi contengono più di una data. Il loro rapporto fra gli isotopi $^{18}\mathrm O$ e $^{16}\mathrm O$ è leggermente più alto di quello degli zirconi cristallizzati da magmi del mantello. L'interpretazione più diffusa è che il magma da cui cristallizzarono contenesse materiale alterato in precedenza da acqua liquida a bassa temperatura, e quindi che già fra $4{,}4$ e $4{,}3$ miliardi di anni fa esistessero acqua liquida in superficie e una crosta di tipo continentale. Se è così, la Terra ebbe le condizioni per una chimica in acqua poche centinaia di milioni di anni dopo la sua formazione, molto prima delle più antiche prove di vita.

La roccia intatta più antica è lo **gneiss di Acasta**, nel Canada nordoccidentale, datato da Samuel Bowring e Ian Williams nel 1999 a $4031\pm3$ milioni di anni: è proprio questa età a definire l'inizio dell'Archeano. Le rocce della cintura di **Nuvvuagittuq**, in Québec, sono state proposte come ancora più antiche, fino a $4{,}28$ miliardi di anni, sulla base di un sistema isotopico estinto, il samario-146; altri ricercatori ritengono che quel segnale sia ereditato da materiale più antico e che le rocce abbiano circa $3{,}8$ miliardi di anni. La cintura sopracrostale di **Isua**, nella Groenlandia sudoccidentale, con un'età compresa fra $3{,}7$ e $3{,}8$ miliardi di anni, contiene le rocce sedimentarie più antiche ben conservate: torbiditi, formazioni di ferro a bande e lave a cuscino, prove di un fondale marino.

::: errore Isua e Akilia
Isua e Akilia sono due località della Groenlandia sudoccidentale che compaiono entrambe nei dibattiti sulle prime tracce di vita, e capita di confonderle. **Isua** è una cintura di rocce sopracrostali sulla terraferma, al margine della calotta glaciale, lunga una trentina di chilometri. **Akilia** è una piccola isola nella regione di Nuuk, a più di cento chilometri di distanza, dove nel 1996 fu proposta una traccia isotopica di vita oggi molto contestata. Le due località hanno storie geologiche e livelli di attendibilità diversi.
:::

La scarsità delle rocce antiche ha una conseguenza importante per l'astrobiologia. Le prove di vita più antiche conosciute non indicano necessariamente quando la vita è comparsa; indicano soltanto da quando esistono rocce capaci di conservarne una traccia. L'assenza di prove nell'Adeano può riflettere l'assenza delle rocce di quell'eone.

## Gli isotopi del carbonio {#isotopi}

Il carbonio ha due isotopi stabili, il carbonio-12, circa il $98{,}9\%$ del totale, e il carbonio-13, circa l'$1{,}1\%$. Gli organismi che fissano il carbonio inorganico in molecole organiche preferiscono leggermente l'isotopo leggero. Il motivo è cinetico. La molecola di anidride carbonica con il carbonio-12 è un poco più leggera e reagisce un poco più in fretta nel sito attivo dell'enzima RuBisCO, che catalizza la prima tappa della fissazione del carbonio nelle piante, nelle alghe e nei cianobatteri, come si vede nel capitolo [Energia, enzimi e catalisi](unit:biology-08). Il risultato è che la materia organica prodotta è impoverita di carbonio-13 di circa venti-trenta parti per mille rispetto alla sorgente inorganica.

Le differenze sono piccole, e per esprimerle si usa una notazione relativa a un campione di riferimento internazionale, chiamato VPDB.

::: definizione Il valore δ¹³C
Indicato con $R=\,^{13}\mathrm C/^{12}\mathrm C$ il rapporto isotopico, il valore $\delta^{13}\mathrm C$ di un campione è

$$\delta^{13}\mathrm C=\left(\frac{R_\text{campione}}{R_\text{VPDB}}-1\right)\cdot1000\ \text{‰}.$$

Un valore negativo indica un campione più povero di carbonio-13 del riferimento. Per il riferimento la Commissione IUPAC sulle abbondanze isotopiche raccomanda dal 2025 il valore $R_\text{VPDB}=0{,}011113$; in molti testi si trova il valore precedente, $0{,}011180$.
:::

::: esempio Dal rapporto al valore δ
Uno spettrometro di massa misura in un frammento di kerogene, la materia organica insolubile delle rocce sedimentarie, il rapporto $R=0{,}010835$. Allora

$$\begin{aligned}\delta^{13}\mathrm C&=\left(\frac{0{,}010835}{0{,}011113}-1\right)\cdot1000\\&\approx-25{,}0\ \text{‰}.\end{aligned}$$

Il campione contiene il $2{,}5\%$ di carbonio-13 in meno del riferimento, un valore tipico della materia organica prodotta da organismi fotosintetici.
:::

Nelle rocce sedimentarie il carbonio si trova in due forme principali: i **carbonati**, come il calcare, che precipitano dal carbonio inorganico disciolto nell'acqua e hanno valori vicini a $0$‰, e il **carbonio organico**, i resti degli organismi, con valori intorno a $-25$‰. Il carbonio che esce dal mantello con i vulcani ha un valore di circa $-5$‰ (figura 5). Nel 1988 Manfred Schidlowski raccolse le misure disponibili e mostrò che la differenza di circa venticinque per mille fra carbonati e materia organica si mantiene con poche variazioni almeno negli ultimi tre miliardi e mezzo di anni: un'impronta dell'attività biologica che attraversa quasi tutta la storia della Terra.

::: figura delta
{"w":820,"h":300,"items":[{"t":"text","p":[186,44],"s":"carbonati marini","c":"force3","size":12,"a":"end"},{"t":"rect","p":[632,34,36,12],"c":"force3","r":2},{"t":"text","p":[186,76],"s":"carbonio del mantello","c":"force4","size":12,"a":"end"},{"t":"rect","p":[578,66,45,12],"c":"force4","r":2},{"t":"text","p":[186,108],"s":"materia organica","c":"force2","size":12,"a":"end"},{"t":"rect","p":[335,98,180,12],"c":"force2","r":2},{"t":"line","p":[20,128,695,128],"c":"muted","w":1,"dash":true},{"t":"text","p":[186,156],"s":"grafite di Isua, 3,7 Ga","c":"ax","size":12,"a":"end"},{"t":"circle","p":[479,152,5],"c":"force"},{"t":"text","p":[186,184],"s":"zircone delle Jack Hills, 4,1 Ga","c":"ax","size":12,"a":"end"},{"t":"line","p":[389,180,479,180],"c":"force","w":1.6},{"t":"line","p":[389,175,389,185],"c":"force","w":1.6},{"t":"line","p":[479,175,479,185],"c":"force","w":1.6},{"t":"circle","p":[434,180,5],"c":"force"},{"t":"text","p":[186,212],"s":"apatite di Akilia","c":"ax","size":12,"a":"end"},{"t":"circle","p":[317,208,5],"c":"force"},{"t":"text","p":[186,240],"s":"microfossili di Strelley Pool","c":"ax","size":12,"a":"end"},{"t":"rect","p":[236,230,117,12],"c":"force","r":2},{"t":"line","p":[650,24,650,262],"c":"muted","w":1,"dash":true},{"t":"line","p":[200,264,695,264],"c":"ax","w":1.4},{"t":"line","p":[200,264,200,270],"c":"ax","w":1.2},{"t":"text","p":[200,286],"s":"−50","c":"muted","size":10},{"t":"line","p":[290,264,290,270],"c":"ax","w":1.2},{"t":"text","p":[290,286],"s":"−40","c":"muted","size":10},{"t":"line","p":[380,264,380,270],"c":"ax","w":1.2},{"t":"text","p":[380,286],"s":"−30","c":"muted","size":10},{"t":"line","p":[470,264,470,270],"c":"ax","w":1.2},{"t":"text","p":[470,286],"s":"−20","c":"muted","size":10},{"t":"line","p":[560,264,560,270],"c":"ax","w":1.2},{"t":"text","p":[560,286],"s":"−10","c":"muted","size":10},{"t":"line","p":[650,264,650,270],"c":"ax","w":1.2},{"t":"text","p":[650,286],"s":"0","c":"muted","size":10},{"t":"text","p":[705,268],"s":"δ¹³C, per mille","c":"ax","size":11,"a":"start"}]}
---
Intervalli tipici di $\delta^{13}\mathrm C$ per i principali serbatoi di carbonio e alcuni campioni antichi discussi nel testo. La materia organica di origine biologica è spostata verso valori negativi rispetto ai carbonati e al carbonio del mantello.
:::

Il confronto fornisce anche un bilancio. Il carbonio che entra nell'oceano e nell'atmosfera dal mantello, con $\delta\approx-5$‰, finisce sepolto nei sedimenti in parte come carbonato e in parte come materia organica. Se una frazione $f$ è sepolta come materia organica, la conservazione degli isotopi impone

$$\delta_\text{mantello}=f\,\delta_\text{org}+(1-f)\,\delta_\text{carb},$$

e con $\delta_\text{org}=-25$‰ e $\delta_\text{carb}=0$‰ si ottiene $f=0{,}2$. Circa un quinto del carbonio sepolto è stato organico per gran parte della storia della Terra, un'indicazione che la fissazione biologica del carbonio ha avuto un ruolo di primo piano nel ciclo del carbonio fin dall'Archeano.

## Quando gli isotopi ingannano {#abiotico}

Un valore negativo di $\delta^{13}\mathrm C$ è compatibile con la vita, e da solo resta lontano da una dimostrazione. Tre ragioni impongono cautela.

La prima è la **sintesi abiotica**. Nei sistemi idrotermali l'anidride carbonica può reagire con l'idrogeno sulla superficie di minerali catalizzatori e formare composti organici, attraverso reazioni simili alla sintesi industriale di Fischer e Tropsch. Nel 2006 Thomas McCollom e Jeffrey Seewald riprodussero queste reazioni in laboratorio, a temperature e pressioni da sorgente idrotermale, e trovarono prodotti organici impoveriti di carbonio-13 in misura paragonabile a quella attribuita di solito agli organismi.

La seconda è il **metamorfismo**. Quando una roccia viene scaldata a centinaia di gradi, la materia organica si trasforma in grafite e scambia isotopi con i carbonati vicini, così che il segnale originario si attenua. Inoltre il calore può produrre grafite senza alcuna materia organica: nel 2002 Mark van Zuilen e collaboratori mostrarono che a Isua molta della grafite si trova in vene secondarie, formate da fluidi caldi che hanno decomposto carbonati di ferro: una grafite priva di qualsiasi significato biologico.

La terza è la **contaminazione**. Le rocce sono attraversate per miliardi di anni da acque che trasportano materia organica recente, e una piccola quantità di carbonio moderno basta a falsare la misura di un campione povero di carbonio.

Le prove isotopiche più antiche mostrano bene queste difficoltà.

- Nel 1999 Minik Rosing misurò a Isua minuscoli globuli di grafite, di due a cinque micrometri, in rocce sedimentarie marine di oltre $3{,}7$ miliardi di anni, con $\delta^{13}\mathrm C\approx-19$‰. A differenza della grafite delle vene, questi globuli si trovano in sedimenti depositati in mare aperto, e studi successivi ne hanno sostenuto l'origine biologica.
- Nel 1996 Stephen Mojzsis e collaboratori riferirono inclusioni di grafite nell'apatite, un fosfato, in una roccia dell'isola di Akilia, con un valore medio di $-37$‰ e un'età superiore a $3{,}85$ miliardi di anni. Studi successivi hanno messo in dubbio l'origine sedimentaria della roccia, che potrebbe essere una roccia ignea trasformata da fluidi, e la sua età; altri gruppi non hanno ritrovato le inclusioni.
- Nel 2015 Elizabeth Bell e collaboratori trovarono due inclusioni di grafite in uno zircone delle Jack Hills di $4{,}10$ miliardi di anni, con $\delta^{13}\mathrm C=-24\pm5$‰. Lo zircone integro e privo di fratture esclude una contaminazione successiva; l'origine del carbonio, biologica o abiotica, resta aperta.

::: nota Un'età minima e un'origine incerta
La grafite di Bell è un buon esempio di due domande da tenere separate. L'età è affidabile: il carbonio è più vecchio dello zircone che lo racchiude, e lo zircone è ben datato. L'origine è incerta: un valore di $-24$‰ è tipico della vita e compatibile con la sintesi abiotica. Una datazione solida non dice nulla sull'origine di ciò che è datato.
:::

## Le stromatoliti {#stromatoliti}

Le **stromatoliti** sono strutture sedimentarie laminate, a forma di cupola, colonna o cono, costruite dall'attività di comunità microbiche. Un tappeto microbico, uno strato di batteri e cianobatteri spesso pochi millimetri, cresce sulla superficie del sedimento; le sostanze appiccicose che produce intrappolano i granelli trasportati dall'acqua, e il suo metabolismo favorisce la precipitazione di carbonati. Quando il tappeto viene sepolto, i microrganismi migrano verso l'alto e formano un nuovo strato, e la ripetizione del processo produce una pila di lamine sottili (figura 6).

::: figura stromatolite
{"w":700,"h":320,"items":[{"t":"poly","pts":[[130,300.0],[138,297.6],[146,295.4],[154,293.2],[162,291.2],[170,289.2],[178,287.3],[186,285.6],[194,283.9],[202,282.3],[210,280.8],[218,279.4],[226,278.1],[234,276.9],[242,275.8],[250,274.8],[258,273.9],[266,273.1],[274,272.4],[282,271.7],[290,271.2],[298,270.8],[306,270.4],[314,270.2],[322,270.0],[330,270.0],[338,270.0],[346,270.2],[354,270.4],[362,270.8],[370,271.2],[378,271.7],[386,272.4],[394,273.1],[402,273.9],[410,274.8],[418,275.8],[426,276.9],[434,278.1],[442,279.4],[450,280.8],[458,282.3],[466,283.9],[474,285.6],[482,287.3],[490,289.2],[498,291.2],[506,293.2],[514,295.4],[522,297.6],[530,300.0]],"c":"force4","w":1.6},{"t":"poly","pts":[[130,292.0],[138,288.6],[146,285.2],[154,282.1],[162,279.0],[170,276.2],[178,273.4],[186,270.8],[194,268.3],[202,266.0],[210,263.8],[218,261.8],[226,259.9],[234,258.1],[242,256.5],[250,255.0],[258,253.7],[266,252.5],[274,251.4],[282,250.5],[290,249.8],[298,249.1],[306,248.6],[314,248.3],[322,248.1],[330,248.0],[338,248.1],[346,248.3],[354,248.6],[362,249.1],[370,249.8],[378,250.5],[386,251.4],[394,252.5],[402,253.7],[410,255.0],[418,256.5],[426,258.1],[434,259.9],[442,261.8],[450,263.8],[458,266.0],[466,268.3],[474,270.8],[482,273.4],[490,276.2],[498,279.0],[506,282.1],[514,285.2],[522,288.6],[530,292.0]],"c":"force4","w":1.6},{"t":"poly","pts":[[130,284.0],[138,279.5],[146,275.1],[154,270.9],[162,266.9],[170,263.1],[178,259.5],[186,256.1],[194,252.8],[202,249.8],[210,246.9],[218,244.2],[226,241.7],[234,239.4],[242,237.2],[250,235.3],[258,233.5],[266,231.9],[274,230.5],[282,229.3],[290,228.3],[298,227.5],[306,226.8],[314,226.4],[322,226.1],[330,226.0],[338,226.1],[346,226.4],[354,226.8],[362,227.5],[370,228.3],[378,229.3],[386,230.5],[394,231.9],[402,233.5],[410,235.3],[418,237.2],[426,239.4],[434,241.7],[442,244.2],[450,246.9],[458,249.8],[466,252.8],[474,256.1],[482,259.5],[490,263.1],[498,266.9],[506,270.9],[514,275.1],[522,279.5],[530,284.0]],"c":"force4","w":1.6},{"t":"poly","pts":[[130,276.0],[138,270.4],[146,264.9],[154,259.8],[162,254.8],[170,250.1],[178,245.6],[186,241.3],[194,237.3],[202,233.5],[210,229.9],[218,226.6],[226,223.5],[234,220.6],[242,217.9],[250,215.5],[258,213.3],[266,211.4],[274,209.6],[282,208.1],[290,206.9],[298,205.8],[306,205.0],[314,204.5],[322,204.1],[330,204.0],[338,204.1],[346,204.5],[354,205.0],[362,205.8],[370,206.9],[378,208.1],[386,209.6],[394,211.4],[402,213.3],[410,215.5],[418,217.9],[426,220.6],[434,223.5],[442,226.6],[450,229.9],[458,233.5],[466,237.3],[474,241.3],[482,245.6],[490,250.1],[498,254.8],[506,259.8],[514,264.9],[522,270.4],[530,276.0]],"c":"force4","w":1.6},{"t":"poly","pts":[[130,268.0],[138,261.3],[146,254.8],[154,248.6],[162,242.7],[170,237.0],[178,231.7],[186,226.6],[194,221.8],[202,217.2],[210,213.0],[218,209.0],[226,205.3],[234,201.8],[242,198.6],[250,195.8],[258,193.1],[266,190.8],[274,188.7],[282,187.0],[290,185.4],[298,184.2],[306,183.2],[314,182.6],[322,182.1],[330,182.0],[338,182.1],[346,182.6],[354,183.2],[362,184.2],[370,185.4],[378,187.0],[386,188.7],[394,190.8],[402,193.1],[410,195.8],[418,198.6],[426,201.8],[434,205.3],[442,209.0],[450,213.0],[458,217.2],[466,221.8],[474,226.6],[482,231.7],[490,237.0],[498,242.7],[506,248.6],[514,254.8],[522,261.3],[530,268.0]],"c":"force4","w":1.6},{"t":"poly","pts":[[130,260.0],[138,252.2],[146,244.6],[154,237.4],[162,230.6],[170,224.0],[178,217.8],[186,211.8],[194,206.2],[202,201.0],[210,196.0],[218,191.4],[226,187.0],[234,183.0],[242,179.4],[250,176.0],[258,173.0],[266,170.2],[274,167.8],[282,165.8],[290,164.0],[298,162.6],[306,161.4],[314,160.6],[322,160.2],[330,160.0],[338,160.2],[346,160.6],[354,161.4],[362,162.6],[370,164.0],[378,165.8],[386,167.8],[394,170.2],[402,173.0],[410,176.0],[418,179.4],[426,183.0],[434,187.0],[442,191.4],[450,196.0],[458,201.0],[466,206.2],[474,211.8],[482,217.8],[490,224.0],[498,230.6],[506,237.4],[514,244.6],[522,252.2],[530,260.0]],"c":"force4","w":1.6},{"t":"poly","pts":[[130,252.0],[138,243.1],[146,234.5],[154,226.3],[162,218.4],[170,211.0],[178,203.8],[186,197.1],[194,190.7],[202,184.7],[210,179.0],[218,173.8],[226,168.8],[234,164.3],[242,160.1],[250,156.2],[258,152.8],[266,149.7],[274,146.9],[282,144.6],[290,142.6],[298,140.9],[306,139.6],[314,138.7],[322,138.2],[330,138.0],[338,138.2],[346,138.7],[354,139.6],[362,140.9],[370,142.6],[378,144.6],[386,146.9],[394,149.7],[402,152.8],[410,156.2],[418,160.1],[426,164.3],[434,168.8],[442,173.8],[450,179.0],[458,184.7],[466,190.7],[474,197.1],[482,203.8],[490,211.0],[498,218.4],[506,226.3],[514,234.5],[522,243.1],[530,252.0]],"c":"force4","w":1.6},{"t":"poly","pts":[[130,244.0],[138,234.0],[146,224.3],[154,215.1],[162,206.3],[170,197.9],[178,189.9],[186,182.4],[194,175.2],[202,168.4],[210,162.1],[218,156.1],[226,150.6],[234,145.5],[242,140.8],[250,136.5],[258,132.6],[266,129.1],[274,126.0],[282,123.4],[290,121.1],[298,119.3],[306,117.8],[314,116.8],[322,116.2],[330,116.0],[338,116.2],[346,116.8],[354,117.8],[362,119.3],[370,121.1],[378,123.4],[386,126.0],[394,129.1],[402,132.6],[410,136.5],[418,140.8],[426,145.5],[434,150.6],[442,156.1],[450,162.1],[458,168.4],[466,175.2],[474,182.4],[482,189.9],[490,197.9],[498,206.3],[506,215.1],[514,224.3],[522,234.0],[530,244.0]],"c":"force3","w":4},{"t":"line","p":[100,300,560,300],"c":"muted","w":1.4},{"t":"circle","p":[235.0,267.4,2.2],"c":"muted"},{"t":"circle","p":[409.6,205.5,2.2],"c":"muted"},{"t":"circle","p":[205.8,273.3,2.2],"c":"muted"},{"t":"circle","p":[157.1,240.5,2.2],"c":"muted"},{"t":"circle","p":[480.5,279.9,2.2],"c":"muted"},{"t":"circle","p":[229.9,194.3,2.2],"c":"muted"},{"t":"circle","p":[279.7,240.2,2.2],"c":"muted"},{"t":"circle","p":[447.7,237.5,2.2],"c":"muted"},{"t":"circle","p":[227.2,268.8,2.2],"c":"muted"},{"t":"circle","p":[448.4,237.8,2.2],"c":"muted"},{"t":"circle","p":[438.2,251.9,2.2],"c":"muted"},{"t":"circle","p":[209.3,238.7,2.2],"c":"muted"},{"t":"circle","p":[375.7,154.6,2.2],"c":"muted"},{"t":"circle","p":[495.9,259.7,2.2],"c":"muted"},{"t":"circle","p":[181.2,222.5,2.2],"c":"muted"},{"t":"circle","p":[271.5,199.8,2.2],"c":"muted"},{"t":"circle","p":[332.1,237.0,2.2],"c":"muted"},{"t":"circle","p":[239.0,228.4,2.2],"c":"muted"},{"t":"circle","p":[182.2,221.8,2.2],"c":"muted"},{"t":"circle","p":[452.6,272.9,2.2],"c":"muted"},{"t":"circle","p":[477.2,221.4,2.2],"c":"muted"},{"t":"circle","p":[403.8,223.8,2.2],"c":"muted"},{"t":"circle","p":[220,148.7,2.6],"c":"muted"},{"t":"circle","p":[262,124.8,2.6],"c":"muted"},{"t":"circle","p":[300,112.9,2.6],"c":"muted"},{"t":"circle","p":[350,111.3,2.6],"c":"muted"},{"t":"circle","p":[392,122.3,2.6],"c":"muted"},{"t":"circle","p":[436,146.0,2.6],"c":"muted"},{"t":"arrow","p":[70,96,210,142.7],"c":"muted","w":1.4,"head":7},{"t":"text","p":[66,90],"s":"granelli portati dall'acqua","c":"muted","size":11,"a":"start"},{"t":"arrow","p":[560,112,420,137.9],"c":"force3","w":1.4,"head":7},{"t":"text","p":[564,108],"s":"tappeto microbico","c":"force3","size":11,"a":"start"},{"t":"arrow","p":[560,262,494,277.6],"c":"force4","w":1.4,"head":7},{"t":"text","p":[564,266],"s":"lamine più antiche","c":"force4","size":11,"a":"start"},{"t":"line","p":[330,116.0,330,270.0],"c":"ax","w":1,"dash":true},{"t":"arrow","p":[556,186,336,196],"c":"ax","w":1.2,"head":6},{"t":"text","p":[564,182],"s":"lamine più spesse","c":"ax","size":11,"a":"start"},{"t":"text","p":[564,198],"s":"sulla sommità","c":"ax","size":11,"a":"start"}]}
---
Schema della crescita di una stromatolite. Il tappeto microbico in superficie intrappola i granelli di sedimento e induce la precipitazione di carbonato; sepolto, si sposta verso l'alto, e ogni ciclo aggiunge una lamina. Le lamine seguono la forma della cupola e si ispessiscono sulla sommità, dove la crescita è più rapida.
:::

Oggi le stromatoliti sono rare. Le più famose crescono a Hamelin Pool, nella baia di Shark Bay in Australia occidentale, una laguna molto salata in cui pochi animali sopravvivono a brucare i tappeti microbici. Nel Proterozoico, prima della comparsa degli animali, erano invece diffuse in tutti i mari poco profondi, e il loro declino nel Fanerozoico è attribuito in parte proprio agli animali che se ne nutrono.

Le stromatoliti più antiche ben accettate si trovano nel cratone di Pilbara, in Australia occidentale.

- Nella formazione di **Dresser**, di $3{,}48$ miliardi di anni, Tara Djokic e collaboratori descrissero nel 2017 stromatoliti e tessuti microbici in depositi di sorgenti calde emerse, riconoscibili dalla geyserite, un deposito di silice che si forma solo attorno a sorgenti quasi bollenti esposte all'aria. Se l'interpretazione è corretta, la vita colonizzava già allora ambienti emersi, e il dato pesa nel confronto fra le ipotesi sull'origine della vita discusse nel capitolo [Sorgenti idrotermali e metabolismo primordiale](unit:biology-09).
- Nel **Strelley Pool Chert**, di $3{,}43$ miliardi di anni, Abigail Allwood e collaboratori studiarono nel 2006 un affioramento lungo una decina di chilometri e vi riconobbero sette tipi diversi di stromatoliti, distribuiti in modo ordinato fra gli ambienti di una piattaforma carbonatica costiera, come avviene nelle scogliere microbiche più recenti.

Il secondo caso mostra l'argomento più forte a favore dell'origine biologica: un'associazione fra forma e ambiente. Strutture simili alle stromatoliti possono formarsi senza vita, per precipitazione chimica su superfici irregolari; nel 1996 John Grotzinger e Daniel Rothman mostrarono con un modello matematico che una superficie che cresce per deposizione e si smussa per diffusione produce forme molto simili a quelle delle stromatoliti. Un processo puramente fisico difficilmente produce però sette morfologie diverse disposte secondo la profondità dell'acqua e il tipo di sedimento, come farebbe una comunità di organismi con esigenze diverse.

::: storia I coni di Isua
Nel 2016 Allen Nutman e collaboratori annunciarono la scoperta di stromatoliti a forma di cono, alte da uno a quattro centimetri, in rocce di Isua di $3{,}7$ miliardi di anni, appena esposte dalla fusione della neve. La scoperta avrebbe anticipato di oltre duecento milioni di anni le prime stromatoliti conosciute. Nel 2018 un gruppo guidato dalla stessa Allwood e da Rosing esaminò l'affioramento in tre dimensioni e concluse che i coni erano stati prodotti dalla deformazione tettonica di rocce stratificate: le strutture mancavano di lamine interne e, osservate da un'altra angolazione, si rivelavano creste allungate. Il gruppo di Nutman ha difeso la propria interpretazione, e la questione resta aperta.
:::

## I microfossili e i loro imitatori {#microfossili}

La prova più diretta della vita antica sarebbero le cellule stesse, conservate come **microfossili**. Nelle selci, rocce di silice microcristallina che si formano quando la silice precipita rapidamente attorno ai resti organici, le cellule possono conservarsi come filamenti e sfere di materia carboniosa di pochi micrometri. Riconoscerle è però molto difficile, perché le forme semplici di una cellula batterica, una sfera o un filamento, si possono produrre anche senza vita.

La storia della selce di **Apex**, in Australia occidentale, di circa $3465$ milioni di anni, è il caso esemplare. Nel 1993 William Schopf vi descrisse undici specie di microfossili filamentosi, simili a cianobatteri attuali, che per un decennio furono considerati i fossili più antichi della Terra. Nel 2002 Martin Brasier e collaboratori riesaminarono il giacimento e conclusero che la roccia era una vena idrotermale, e che i presunti filamenti erano artefatti formati da carbonio amorfo attorno ai bordi di cristalli e a frammenti di vetro vulcanico. Nel 2003 Juan Manuel García-Ruiz e collaboratori produssero in laboratorio, senza alcun organismo, filamenti di silice e carbonato con forme curve ed elicoidali molto simili a quelle di Apex, sui quali si depositavano facilmente idrocarburi semplici. Nel 2018 Schopf e John Valley misurarono il $\delta^{13}\mathrm C$ di undici esemplari di cinque tipi diversi con una microsonda ionica e trovarono valori diversi per i diversi tipi, correlati alla forma, come ci si aspetta da organismi con metabolismi diversi. Il dibattito non è chiuso, e le due parti continuano a interpretare in modo opposto le stesse rocce.

Altri casi hanno ricevuto un consenso più ampio. Nel 2011 David Wacey e collaboratori descrissero nelle arenarie di base del Strelley Pool, di circa $3{,}4$ miliardi di anni, cellule sferoidali ed ellissoidali e guaine tubolari associate a minuscoli cristalli di pirite, il solfuro di ferro. Le strutture avevano cavità interne, pareti carboniose arricchite di azoto, segni di degradazione, disposizioni in catene e gruppi e valori di $\delta^{13}\mathrm C$ fra $-33$ e $-46$‰. La pirite associata suggerisce un metabolismo basato sullo zolfo, uno di quelli descritti nel capitolo [Respirazione, fermentazione e chemiosintesi](unit:biology-19).

All'estremo opposto si collocano i tubi e i filamenti di ematite, un ossido di ferro, che Matthew Dodd e collaboratori descrissero nel 2017 in depositi di sorgenti idrotermali sottomarine della cintura di Nuvvuagittuq, di almeno $3{,}77$ miliardi di anni e forse di $4{,}28$. Gli autori li interpretano come resti di batteri che ricavavano energia dall'ossidazione del ferro. Nel 2019 Sean McMahon mostrò però che i **giardini chimici**, strutture tubolari che crescono spontaneamente quando sali metallici reagiscono con soluzioni alcaline, producono filamenti di ossido di ferro con forme e composizione molto simili. Le strutture di Nuvvuagittuq restano candidate, lontane dal consenso.

::: approfondimento Selci, rocce ideali per i fossili microscopici
La selce è una roccia formata quasi solo da quarzo in cristalli di pochi micrometri. Quando la silice disciolta in un'acqua calda o sovrassatura precipita rapidamente, impregna le cellule prima che si decompongano e le racchiude in una matrice impermeabile, che le protegge dall'ossigeno e dai fluidi. Per questo quasi tutti i microfossili precambriani meglio conservati si trovano in selci, e per lo stesso motivo i depositi di silice attorno alle antiche sorgenti calde di Marte sono fra i bersagli preferiti nella ricerca di tracce di vita.
:::

## I biomarcatori molecolari e la contaminazione {#biomarcatori}

Una terza famiglia di prove sono i **biomarcatori**, molecole organiche fossili che conservano lo scheletro di carbonio di molecole biologiche specifiche. Gli steroli delle membrane degli eucarioti si trasformano nel tempo in **sterani**, e alcuni lipidi dei batteri in **opani**; certe varianti di queste molecole sono caratteristiche di gruppi precisi. Un biomarcatore è una prova più specifica di un rapporto isotopico, perché indica una via biosintetica, e talvolta il gruppo di organismi che la possiede.

Nel 1999 Jochen Brocks e collaboratori riferirono sterani e metilopani in scisti di $2{,}7$ miliardi di anni del cratone di Pilbara. Se fossero stati coevi alla roccia, avrebbero indicato l'esistenza degli eucarioti e della fotosintesi ossigenica mezzo miliardo di anni o più prima di quanto indicavano gli altri dati. Nei quindici anni successivi crebbero i dubbi: le concentrazioni erano minuscole, e le rocce erano state scaldate abbastanza da distruggere molecole così delicate.

Per risolvere la questione un gruppo di laboratori, di cui faceva parte lo stesso Brocks, perforò nuovi carotaggi nelle stesse formazioni con protocolli di pulizia senza precedenti, per evitare qualsiasi contatto con oli, lubrificanti e plastiche. Nel 2015 Katherine French e collaboratori pubblicarono il risultato. All'interno dei nuovi campioni sterani e opani erano al limite di rilevabilità, mentre sulla superficie esterna delle carote tradizionali le loro concentrazioni superavano quelle dei bianchi di laboratorio di oltre un ordine di grandezza: le molecole erano contaminazioni recenti. La conclusione fu che i biomarcatori lipidici disponibili non possono sostenere la presenza di eucarioti e di fotosintesi ossigenica $2{,}7$ miliardi di anni fa.

La vicenda è istruttiva per due ragioni. Mostra quanto sia facile contaminare un campione povero di materia organica, e mostra la scienza che corregge sé stessa: un autore della scoperta partecipò alla sua smentita. Le stesse precauzioni sono oggi alla base dei protocolli per i campioni di Marte e degli asteroidi, descritti nel capitolo [Meteoriti, comete e campioni di asteroidi](unit:biology-05).

## Come si giudica una traccia di vita {#criteri}

Le tre famiglie di prove, isotopi, strutture e molecole, hanno ciascuna i propri imitatori abiotici e i propri rischi di contaminazione. Per questo i paleobiologi hanno sviluppato un insieme di criteri che una traccia deve soddisfare prima di essere accettata come **biogenica**, prodotta cioè da organismi.

::: metodo I criteri di biogenicità
1. **Contesto geologico.** La roccia deve essere datata con sicurezza, e la traccia deve essere **singenetica**, cioè formata insieme alla roccia, senza ingressi successivi. L'ambiente ricostruito deve essere compatibile con la vita.
2. **Morfologia.** Le strutture devono avere dimensioni e forme da cellule, comparire in popolazioni con una variabilità ragionevole, e mostrare caratteri difficili da imitare, come cavità interne, pareti, divisioni cellulari.
3. **Composizione.** La materia organica, gli isotopi e gli elementi associati devono essere coerenti con un metabolismo noto.
4. **Associazione con l'ambiente.** Forme e composizioni diverse devono distribuirsi secondo gli ambienti, come farebbero organismi con esigenze diverse.
5. **Esclusione dei processi abiotici.** Ogni spiegazione senza vita plausibile per quel contesto deve essere stata considerata e scartata.
:::

L'ultimo criterio è il più importante e il più difficile. Brasier propose di trattare l'origine abiotica come **ipotesi nulla**, da respingere solo quando le prove lo impongono, come si fa in statistica. Nessuna prova isolata basta; ciò che convince è la convergenza di più prove indipendenti nello stesso luogo, come nelle stromatoliti del Strelley Pool, dove morfologia, distribuzione nell'ambiente, materia organica e microfossili raccontano la stessa storia. Il quadro attuale si può riassumere così.

| Età | Località | Prova | Stato |
|---|---|---|---|
| $4{,}10$ Ga | Jack Hills | grafite in zircone | origine incerta |
| $3{,}77$ Ga o più | Nuvvuagittuq | filamenti di ematite | molto discussa |
| $>3{,}7$ Ga | Isua | grafite, coni | grafite plausibile, coni contestati |
| $3{,}48$ Ga | Dresser | stromatoliti in sorgenti calde | ampiamente accettata |
| $3{,}43$ Ga | Strelley Pool | stromatoliti, microfossili | ampiamente accettata |

Gli stessi criteri guidano la ricerca della vita su Marte, discussa nel capitolo [Cercare la vita su Marte](unit:biology-27), e il dibattito sui falsi positivi del capitolo [Biofirme e falsi positivi](unit:biology-33). Le rocce più antiche della Terra sono il laboratorio in cui la comunità scientifica ha imparato, con errori e correzioni, quanto debba essere esigente.

## La vita è comparsa presto: che cosa significa? {#presto}

Mettendo insieme i dati, l'acqua liquida esisteva probabilmente fra $4{,}4$ e $4{,}3$ miliardi di anni fa, la vita è attestata in modo convincente da $3{,}48$ miliardi di anni fa, e le stime basate sull'orologio molecolare collocano LUCA, l'ultimo antenato comune dei viventi discusso nel capitolo [L'albero universale e LUCA](unit:biology-15), intorno a $4{,}2$ miliardi di anni fa. La vita sembra quindi comparsa entro poche centinaia di milioni di anni dal momento in cui la Terra divenne abitabile, e forse molto prima.

Che cosa implica questo per la vita altrove? L'argomento intuitivo è semplice: se la vita fosse un evento improbabile, ci si aspetterebbe che impiegasse molto tempo a comparire, e la sua rapidità suggerisce che, date condizioni simili a quelle della Terra primitiva, la vita compaia facilmente. Nel 2002 Charles Lineweaver e Tamara Davis tradussero l'argomento in un modello statistico e conclusero che la probabilità di origine della vita su un pianeta abitabile simile alla Terra supera il $13\%$ con una confidenza del $95\%$.

Nel 2012 David Spiegel ed Edwin Turner mostrarono però che con un solo esempio la conclusione dipende in modo determinante dalle ipotesi iniziali dell'analisi bayesiana. Pesa inoltre un **effetto di selezione**: esseri capaci di porsi la domanda hanno avuto bisogno di miliardi di anni di evoluzione, e potrebbero esistere soltanto su pianeti dove la vita è comparsa presto, anche se in generale la vita compare di rado. Nel 2020 David Kipping, tenendo conto di questo effetto con ipotesi iniziali scelte in modo neutrale, concluse che i dati favoriscono un'origine rapida con un rapporto di probabilità di almeno $2{,}8$ a uno: un'indicazione, lontana da una certezza.

::: nota Un solo esempio
Ogni stima della frequenza della vita nell'universo poggia oggi su un unico caso, la Terra. La scoperta di una seconda origine indipendente, anche microbica e anche fossile, su Marte o su una luna ghiacciata, cambierebbe radicalmente queste stime: è uno dei motivi per cui la ricerca di tracce di vita nel Sistema solare ha un valore che va oltre la singola scoperta.
:::

## Un'esperienza: decadimento con i dadi {#esperienza}

Il decadimento radioattivo è un processo statistico, e si può simulare con oggetti che hanno una probabilità fissa di cambiare stato.

::: metodo Un orologio di dadi
**Materiale.** Cento dadi, o cento monete, un vassoio e un foglio a quadretti.

**Procedura.** Lanciare tutti i dadi. Togliere quelli che mostrano il sei, che rappresentano i nuclei decaduti, e annotare quanti ne restano. Rilanciare i dadi rimasti e ripetere per una decina di lanci. Riportare sul grafico il numero di dadi rimasti in funzione del numero di lanci. Ripetere l'esperimento due o tre volte, o unire i dati di più gruppi.

**Analisi.** Ogni dado sopravvive a un lancio con probabilità $5/6$, quindi dopo $k$ lanci ne restano in media $100\,(5/6)^k$. Calcolare il tempo di dimezzamento in lanci, $n_{1/2}=\ln2/\ln(6/5)$, e confrontarlo con il grafico. Infine un compagno, senza dire quanti lanci ha fatto, consegna i dadi rimasti e il numero di quelli tolti: stimare il numero di lanci con la formula dell'età radiometrica.
:::

Il tempo di dimezzamento vale circa $3{,}8$ lanci. I valori medi attesi sono circa $83$ dadi dopo un lancio, $58$ dopo tre, $40$ dopo cinque, $16$ dopo dieci; i dati reali oscillano attorno a questi valori, e le oscillazioni sono relativamente più grandi quando restano pochi dadi, come accade per i campioni con pochi atomi. Se il compagno consegna $60$ dadi e ne ha tolti $40$, la stima è

$$k=\frac{\ln(1+40/60)}{\ln(6/5)}\approx2{,}8\ \text{lanci},$$

compatibile con tre lanci. Con le monete, togliendo le teste, il tempo di dimezzamento è esattamente di un lancio.

## Errori frequenti {#errori}

::: errore Pensare che dopo due tempi di dimezzamento il padre sia scomparso
Dopo un tempo di dimezzamento ne resta metà, dopo due un quarto, dopo tre un ottavo: la quantità si riduce sempre della stessa frazione e tende a zero senza raggiungerlo in un tempo finito.
:::

::: errore Datare con il carbonio-14 una roccia di milioni di anni
Con un tempo di dimezzamento di $5730$ anni, dopo cinquantamila anni resta meno dello $0{,}3\%$ del carbonio-14 iniziale, e oltre questo limite la misura non è più affidabile. Le rocce antiche si datano con sistemi a vita lunga, come l'uranio-piombo.
:::

::: errore Considerare un valore δ¹³C negativo una prova di vita
La sintesi abiotica idrotermale e la decomposizione dei carbonati per riscaldamento producono anch'esse carbonio impoverito di carbonio-13. Un valore negativo è compatibile con la vita, e diventa una prova solo insieme al contesto geologico e ad altre prove indipendenti.
:::

::: errore Confondere l'età della prova più antica con l'età della vita
Le rocce più antiche capaci di conservare tracce di vita sono rare e trasformate. La prova più antica fissa un limite minimo: la vita può essere comparsa molto prima.
:::

::: errore Credere che ogni stromatolite sia un fossile
Strutture laminate a cupola possono formarsi per precipitazione chimica o per deformazione delle rocce. L'origine biologica si sostiene con la microstruttura delle lamine, la materia organica e la distribuzione delle forme negli ambienti.
:::

## Sintesi {#sintesi}

::: sintesi In breve
- In un sistema chiuso i nuclei padri decadono con legge esponenziale, e l'età si ricava dal rapporto fra figli e padri: $t=(t_{1/2}/\ln2)\ln(1+D/P)$.
- Si sceglie un sistema con tempo di dimezzamento adatto all'età: il carbonio-14 per decine di migliaia di anni, l'uranio-piombo per miliardi; il metodo dell'isocrona elimina l'incognita dei figli iniziali e controlla che il sistema sia rimasto chiuso.
- La Terra ha circa $4{,}54$ miliardi di anni; i più antichi zirconi terrestri ne hanno $4{,}4$ e suggeriscono acqua liquida molto precoce; la roccia intatta più antica, lo gneiss di Acasta, ha $4{,}03$ miliardi di anni e segna l'inizio dell'Archeano.
- La materia organica è impoverita di carbonio-13 di circa $25$‰ rispetto ai carbonati, per effetto degli enzimi che fissano il carbonio; il segnale si mantiene da oltre tre miliardi e mezzo di anni, ma può essere imitato da processi abiotici e alterato dal metamorfismo.
- Le stromatoliti di Dresser, di $3{,}48$ miliardi di anni, e di Strelley Pool, di $3{,}43$, sono le prove di vita più antiche ampiamente accettate; le prove più antiche di Isua, Akilia, Nuvvuagittuq e Jack Hills sono discusse.
- I microfossili e i biomarcatori hanno imitatori abiotici e sono esposti alla contaminazione; una traccia si accetta come biogenica solo quando più prove indipendenti convergono e le spiegazioni abiotiche sono escluse.
- La vita sembra comparsa presto nella storia della Terra, un'indicazione debole, per effetto del singolo esempio e della selezione, che possa comparire facilmente su pianeti simili.
:::

## Glossario {#glossario}

- **Biogenico**: prodotto da organismi viventi.
- **Biomarcatore**: molecola organica fossile che conserva la struttura di una molecola biologica specifica.
- **Costante di decadimento**: frazione dei nuclei che decade per unità di tempo, legata al tempo di dimezzamento da $\lambda=\ln2/t_{1/2}$.
- **δ¹³C**: scostamento in parti per mille del rapporto fra carbonio-13 e carbonio-12 di un campione rispetto al riferimento VPDB.
- **Eone**: la più ampia suddivisione della scala dei tempi geologici: Adeano, Archeano, Proterozoico, Fanerozoico.
- **Isocrona**: retta che unisce in un grafico isotopico minerali della stessa età; la sua pendenza misura l'età.
- **Metamorfismo**: trasformazione di una roccia per effetto di temperature e pressioni elevate.
- **Microfossile**: resto fossile di un organismo microscopico.
- **Selce**: roccia di silice microcristallina, adatta alla conservazione dei microfossili.
- **Singenetico**: formato insieme alla roccia che lo contiene.
- **Stromatolite**: struttura sedimentaria laminata costruita da comunità microbiche.
- **Tempo di dimezzamento**: tempo in cui il numero di nuclei radioattivi si riduce alla metà.
- **Zircone**: silicato di zirconio molto resistente, che accoglie uranio ed esclude piombo; è il principale cronometro delle età antiche.

## Esercizi {#esercizi}

::: esercizio Tre tempi di dimezzamento [base]
Quale frazione dei nuclei padri resta dopo tre tempi di dimezzamento? Quanto vale allora il rapporto fra figli e padri, se all'inizio non c'erano figli?
>>> soluzione
Resta $(1/2)^3=1/8$ dei padri, e i figli sono i restanti $7/8$. Il rapporto $D/P$ vale $7$.
:::

::: esercizio Un rapporto uguale a uno [base]
In uno zircone il numero di atomi di piombo-206 radiogenico è uguale a quello di uranio-238. Quanti anni ha lo zircone? Quale sarebbe l'età se lo stesso rapporto valesse per il piombo-207 e l'uranio-235?
>>> soluzione
Con $D/P=1$ l'età è un tempo di dimezzamento: $4{,}47$ miliardi di anni per l'uranio-238. Per l'uranio-235 sarebbe $0{,}704$ miliardi di anni; nello stesso zircone i due rapporti sono quindi molto diversi.
:::

::: esercizio Scegliere l'orologio [base]
Quale sistema radiometrico conviene usare per datare: un osso di ventimila anni; una colata di lava di cento milioni di anni; uno zircone di quattro miliardi di anni?
>>> soluzione
Per l'osso il carbonio-14, con tempo di dimezzamento di $5730$ anni, adatto fino a circa cinquantamila anni. Per la lava il potassio-argon, con tempo di dimezzamento di $1{,}25$ miliardi di anni, perché il potassio è abbondante nelle rocce vulcaniche. Per lo zircone l'uranio-piombo, con i due orologi indipendenti dei due isotopi dell'uranio.
:::

::: esercizio Un valore δ [base]
Un globulo di grafite ha un rapporto $^{13}\mathrm C/^{12}\mathrm C=0{,}010891$. Calcolare il suo $\delta^{13}\mathrm C$ con $R_\text{VPDB}=0{,}011113$.
>>> soluzione
$$\begin{aligned}\delta^{13}\mathrm C&=\left(\frac{0{,}010891}{0{,}011113}-1\right)\cdot1000\\&\approx-20{,}0\ \text{‰},\end{aligned}$$

un valore vicino a quello misurato da Rosing nei sedimenti di Isua.
:::

::: esercizio L'Archeano nel calendario [base]
Nel calendario in cui la storia del Sistema solare dura un anno, in quale giorno comincia l'Archeano, $4031$ milioni di anni fa?
>>> soluzione
$g=365\cdot(4567-4031)/4567\approx42{,}8$, cioè fra il 42° e il 43° giorno: l'11 o il 12 febbraio. L'Adeano occupa quindi circa sei settimane del calendario.
:::

::: esercizio Che cosa rende biologica una stromatolite [base]
Fra le osservazioni seguenti, quali sostengono l'origine biologica di una struttura laminata e quali no: la forma a cupola; la presenza di materia organica nelle lamine; più tipi di forme distribuiti secondo la profondità dell'acqua; lamine che si ispessiscono e si assottigliano in modo irregolare?
>>> soluzione
La forma a cupola da sola è debole, perché si ottiene anche per precipitazione o deformazione. La materia organica nelle lamine e la distribuzione delle forme secondo l'ambiente sono argomenti forti. Le irregolarità delle lamine sono compatibili con un tappeto microbico, che cresce in modo discontinuo, e sono un argomento di supporto.
:::

::: esercizio Un'isocrona di due punti [medio]
Due minerali di una roccia hanno ($^{87}\mathrm{Rb}/^{86}\mathrm{Sr}$, $^{87}\mathrm{Sr}/^{86}\mathrm{Sr}$) uguali a $(0{,}50;\ 0{,}71020)$ e $(2{,}50;\ 0{,}75050)$. Calcolare l'età della roccia e la composizione iniziale dello stronzio, con $t_{1/2}=49{,}6$ miliardi di anni. Perché due punti sono un controllo debole?
>>> soluzione
La pendenza è $m=0{,}0403/2{,}00=0{,}02015$, e l'età $t=(49{,}6/0{,}693)\ln(1{,}02015)\approx1{,}43$ miliardi di anni. L'intercetta è $0{,}71020-0{,}02015\cdot0{,}50\approx0{,}70013$. Per due punti passa sempre una retta: serve almeno un terzo punto per verificare che il sistema sia rimasto chiuso.
:::

::: esercizio La correzione del potassio [medio]
In un minerale il rapporto fra argon-40 radiogenico e potassio-40 vale $0{,}050$. Sapendo che il $10{,}7\%$ dei decadimenti del potassio-40 produce argon e che il tempo di dimezzamento è $1{,}248$ miliardi di anni, calcolare l'età. Quale età si otterrebbe dimenticando la correzione?
>>> soluzione
Il rapporto fra tutti i figli e il padre è $0{,}050/0{,}107\approx0{,}467$, e l'età $t=(1{,}248/0{,}693)\ln(1{,}467)\approx0{,}69$ miliardi di anni. Senza correzione si otterrebbe $(1{,}248/0{,}693)\ln(1{,}050)\approx0{,}088$ miliardi di anni, un'età quasi otto volte troppo giovane.
:::

::: esercizio Più carbonio organico sepolto [medio]
Il carbonio entra nel sistema superficiale con $\delta=-5$‰ e la materia organica sepolta ha $\delta=-25$‰. Se la frazione di carbonio sepolto come materia organica salisse da $0{,}20$ a $0{,}25$, quale valore di $\delta^{13}\mathrm C$ dovrebbero avere i carbonati?
>>> soluzione
Dal bilancio $-5=0{,}25\cdot(-25)+0{,}75\,\delta_\text{carb}$ si ricava $\delta_\text{carb}=(-5+6{,}25)/0{,}75\approx+1{,}7$‰. Un aumento della sepoltura organica sposta verso valori positivi i carbonati: per questo le variazioni di $\delta^{13}\mathrm C$ dei carbonati nel tempo servono a ricostruire la storia della biosfera.
:::

::: esercizio Il limite del radiocarbonio [medio]
Quale frazione del carbonio-14 iniziale resta in un campione di ventimila anni? E in uno di cinquantamila anni? Usare $t_{1/2}=5730$ anni.
>>> soluzione
Dopo ventimila anni resta $(1/2)^{20000/5730}\approx0{,}089$, circa il $9\%$. Dopo cinquantamila anni resta circa $0{,}0024$, lo $0{,}24\%$: quantità così piccole sono facilmente falsate da una minima contaminazione con carbonio moderno.
:::

::: esercizio Dadi e dimezzamento [medio]
Nell'esperienza con cento dadi, si tolgono a ogni lancio i dadi che mostrano il sei. Calcolare il tempo di dimezzamento in lanci e il numero medio di dadi rimasti dopo cinque lanci. Se si usassero dadi a dodici facce, togliendo il dodici, il tempo di dimezzamento sarebbe più lungo o più breve?
>>> soluzione
$n_{1/2}=\ln2/\ln(6/5)\approx3{,}80$ lanci; dopo cinque lanci restano in media $100\,(5/6)^5\approx40$ dadi. Con dodici facce la probabilità di decadere a ogni lancio è $1/12$, la metà, e il tempo di dimezzamento diventa $\ln2/\ln(12/11)\approx8{,}0$ lanci, più lungo.
:::

::: esercizio Contaminare un isotopo e una molecola [medio]
Un campione di kerogene di $3{,}5$ miliardi di anni con $\delta^{13}\mathrm C=-30$‰ viene contaminato da carbonio organico moderno con $\delta^{13}\mathrm C=-25$‰, pari al $10\%$ del carbonio totale. Quale valore si misura? Perché la stessa contaminazione sarebbe molto più grave per lo studio dei biomarcatori?
>>> soluzione
Il valore misurato è la media pesata, $0{,}9\cdot(-30)+0{,}1\cdot(-25)=-29{,}5$‰, quasi uguale all'originale. Per i biomarcatori conta invece la presenza o l'assenza di molecole specifiche: se le molecole originali sono state distrutte dal calore, anche una quantità minima di contaminante può essere l'unica fonte delle molecole misurate.
:::

::: esercizio La sensibilità dell'orologio [avanzato]
Dalla formula $t=\tau\ln(1+x)$, con $\tau=t_{1/2}/\ln2$ e $x=D/P$, mostrare che un errore relativo $\varepsilon$ su $x$ produce un errore relativo sull'età pari a $\varepsilon\,x/[(1+x)\ln(1+x)]$. Calcolare il fattore per $x=0{,}01$, $x=1$ e $x=100$ e discutere quale sistema conviene usare per un campione molto giovane e per uno molto vecchio.
>>> soluzione
Derivando, $\mathrm dt=\tau\,\mathrm dx/(1+x)$, e quindi $\mathrm dt/t=[x/((1+x)\ln(1+x))]\,\mathrm dx/x$. Il fattore vale circa $0{,}995$ per $x=0{,}01$, $0{,}72$ per $x=1$, $0{,}21$ per $x=100$. In termini relativi l'età sembra migliorare per rapporti grandi, ma con $x=100$ resta un padre su cento, difficile da misurare con precisione, e con $x=0{,}01$ i figli sono pochissimi. Conviene un sistema in cui $x$ sia dell'ordine dell'unità, cioè con tempo di dimezzamento paragonabile all'età.
:::

::: esercizio Uno zircone che perde piombo [avanzato]
Uno zircone di $4{,}00$ miliardi di anni perde di recente il $20\%$ del suo piombo radiogenico. Calcolare le età apparenti fornite dai sistemi $^{238}\mathrm U\to\,^{206}\mathrm{Pb}$ e $^{235}\mathrm U\to\,^{207}\mathrm{Pb}$, con tempi di dimezzamento di $4{,}468$ e $0{,}704$ miliardi di anni. Mostrare che il rapporto $^{207}\mathrm{Pb}/^{206}\mathrm{Pb}$ non cambia e spiegare perché è utile.
>>> soluzione
I rapporti veri sono $2^{4{,}00/4{,}468}-1\approx0{,}860$ e $2^{4{,}00/0{,}704}-1\approx50{,}3$. Dopo la perdita diventano $0{,}688$ e $40{,}3$, che danno età apparenti di circa $3{,}37$ e $3{,}78$ miliardi di anni: discordanti ed entrambe troppo giovani. Il rapporto fra i due rapporti, $40{,}3/0{,}688\approx50{,}3/0{,}860\approx58{,}5$, resta lo stesso, perché la perdita colpisce allo stesso modo i due isotopi del piombo; poiché il rapporto fra uranio-235 e uranio-238 è noto e uguale per tutti gli zirconi, anche il rapporto $^{207}\mathrm{Pb}/^{206}\mathrm{Pb}$ resta invariato. L'età calcolata da questo rapporto, chiamata età piombo-piombo, resta corretta anche per uno zircone che ha perso piombo di recente.
:::

::: esercizio Una probabilità per unità di tempo [avanzato]
Si modelli l'origine della vita come un evento casuale con probabilità costante $\lambda$ per unità di tempo, come un decadimento. Calcolare la probabilità che la vita compaia entro $0{,}5$ miliardi di anni dall'inizio dell'abitabilità per $\lambda=1$, $0{,}1$ e $0{,}01$ per miliardo di anni. Perché l'osservazione che sulla Terra la vita è comparsa presto non basta a stabilire che $\lambda$ è grande?
>>> soluzione
La probabilità è $1-\mathrm e^{-\lambda\cdot0{,}5}$: circa $0{,}39$, $0{,}049$ e $0{,}005$. Una comparsa precoce è più probabile se $\lambda$ è grande, e questo spinge la stima verso valori alti. Però abbiamo un solo esempio, la conclusione dipende dalle ipotesi iniziali sulla distribuzione di $\lambda$, e c'è un effetto di selezione: osservatori come noi potrebbero esistere solo dove la vita è comparsa presto, lasciando il tempo necessario all'evoluzione.
:::

::: esercizio Un punto fuori dalla retta [avanzato]
Quattro minerali di una roccia danno ($^{87}\mathrm{Rb}/^{86}\mathrm{Sr}$, $^{87}\mathrm{Sr}/^{86}\mathrm{Sr}$): $(0{,}20;\ 0{,}71002)$, $(1{,}00;\ 0{,}75010)$, $(1{,}60;\ 0{,}80020)$, $(4{,}00;\ 0{,}90040)$. Individuare il minerale che non è rimasto chiuso, calcolare l'età con gli altri tre e proporre una spiegazione per l'anomalia.
>>> soluzione
La retta per il primo e l'ultimo punto ha pendenza $(0{,}90040-0{,}71002)/3{,}80\approx0{,}0501$ e intercetta circa $0{,}7000$; il secondo punto vi cade sopra, mentre il terzo dovrebbe avere $0{,}7000+0{,}0501\cdot1{,}60\approx0{,}7802$ e ha invece $0{,}8002$. L'età con i tre punti allineati è $(49{,}6/0{,}693)\ln(1{,}0501)\approx3{,}50$ miliardi di anni. Il terzo minerale ha troppo stronzio-87 per il rubidio che contiene: ha probabilmente perso rubidio dopo la formazione, per esempio durante un episodio di alterazione; con il rubidio originale, $2{,}0$, sarebbe sulla retta.
:::

## Fonti {#fonti}

Il testo, le figure, gli esempi e gli esercizi di questo capitolo sono originali. Per la scelta e l'ordine degli argomenti i riferimenti principali sono A. M. Shaw, *Astrochemistry: From Astronomy to Astrobiology*, Wiley, 2006, §6.4 (il tempo geologico), §7.3 (la formazione della Terra) e §7.5 (i periodi geologici), e J. R. Morris, D. L. Hartl, A. H. Knoll e collaboratori, *Biology: How Life Works*, 2ª edizione, Macmillan, 2016, §23.3 (la documentazione fossile e la datazione) e §26.6 (storia evolutiva dei procarioti). Alcune affermazioni di Shaw sono state corrette: la datazione piombo-piombo usa gli isotopi piombo-206 e piombo-207, prodotti dai due isotopi dell'uranio; Isua è una cintura di rocce sulla terraferma groenlandese, distinta dall'isola di Akilia; gli zirconi terrestri più antichi hanno circa $4{,}4$ miliardi di anni; la Luna si formò in seguito a un impatto gigante, mentre l'ipotesi della cattura è stata abbandonata; il tempo di dimezzamento convenzionale del carbonio-14 è $5730$ anni, e la misura più recente dà $5700\pm30$ anni. Dati ed esperimenti provengono dalle fonti primarie seguenti.

1. W. Thomson, *Transactions of the Royal Society of Edinburgh* 23, 157 (1864): il raffreddamento della Terra; B. B. Boltwood, *American Journal of Science* 23, 77 (1907): le prime età uranio-piombo.
2. C. Patterson, *Geochimica et Cosmochimica Acta* 10, 230 (1956): l'età della Terra; J. N. Connelly e collaboratori, *Science* 338, 651 (2012): l'età delle inclusioni ricche di calcio e alluminio.
3. I. M. Villa e collaboratori, *Pure and Applied Chemistry* 94, 1085 (2022): i tempi di dimezzamento di rubidio-87 e uranio-238; CIAAW, *Chemistry International* (2025): il rapporto isotopico del VPDB.
4. K. M. Cohen e collaboratori, *Episodes* 48, 105 (2025): la scala cronostratigrafica internazionale.
5. S. A. Wilde e collaboratori, *Nature* 409, 175 (2001); J. W. Valley e collaboratori, *Nature Geoscience* 7, 219 (2014): gli zirconi delle Jack Hills.
6. S. A. Bowring, I. S. Williams, *Contributions to Mineralogy and Petrology* 134, 3 (1999): lo gneiss di Acasta.
7. M. Schidlowski, *Nature* 333, 313 (1988): la documentazione isotopica del carbonio; T. M. McCollom, J. S. Seewald, *Earth and Planetary Science Letters* 243, 74 (2006): la sintesi abiotica idrotermale.
8. M. T. Rosing, *Science* 283, 674 (1999); M. A. van Zuilen, A. Lepland, G. Arrhenius, *Nature* 418, 627 (2002): la grafite di Isua.
9. S. J. Mojzsis e collaboratori, *Nature* 384, 55 (1996); C. M. Fedo, M. J. Whitehouse, *Science* 296, 1448 (2002): il caso di Akilia.
10. E. A. Bell e collaboratori, *PNAS* 112, 14518 (2015): la grafite in uno zircone di $4{,}1$ miliardi di anni.
11. A. C. Allwood e collaboratori, *Nature* 441, 714 (2006); T. Djokic e collaboratori, *Nature Communications* 8, 15263 (2017): le stromatoliti di Strelley Pool e Dresser.
12. J. P. Grotzinger, D. H. Rothman, *Nature* 383, 423 (1996): un modello abiotico per la forma delle stromatoliti.
13. A. P. Nutman e collaboratori, *Nature* 537, 535 (2016); A. C. Allwood e collaboratori, *Nature* 563, 241 (2018): i coni di Isua.
14. J. W. Schopf, *Science* 260, 640 (1993); M. D. Brasier e collaboratori, *Nature* 416, 76 (2002); J. M. García-Ruiz e collaboratori, *Science* 302, 1194 (2003); J. W. Schopf e collaboratori, *PNAS* 115, 53 (2018): il caso della selce di Apex.
15. D. Wacey e collaboratori, *Nature Geoscience* 4, 698 (2011): i microfossili di Strelley Pool.
16. M. S. Dodd e collaboratori, *Nature* 543, 60 (2017); S. McMahon, *Proceedings of the Royal Society B* 286, 20192410 (2019): le strutture di Nuvvuagittuq e i giardini chimici.
17. J. J. Brocks e collaboratori, *Science* 285, 1033 (1999); K. L. French e collaboratori, *PNAS* 112, 5915 (2015): i biomarcatori archeani e la contaminazione.
18. C. H. Lineweaver, T. M. Davis, *Astrobiology* 2, 293 (2002); D. S. Spiegel, E. L. Turner, *PNAS* 109, 395 (2012); D. Kipping, *PNAS* 117, 11995 (2020): che cosa implica la comparsa precoce della vita.
