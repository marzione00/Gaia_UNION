---
unit: biology-24
titolo: Abitabilità attorno alle nane rosse
sottotitolo: Le stelle più comuni della Galassia e i loro pianeti: anni di pochi giorni, rotazione sincrona, brillamenti, atmosfere a rischio e le prime osservazioni di JWST
volume: Volume di biologia
fonte: Testo originale; riferimenti principali A. M. Shaw, Astrochemistry, §4.1-4.3, §7.7-7.8
---

## Prima di cominciare {#apertura}

Se si contano le stelle vicine al Sole, circa tre su quattro sono **nane rosse**: stelle piccole, fredde e poco luminose, nessuna delle quali visibile a occhio nudo. La più vicina di tutte, Proxima Centauri, a $4{,}2$ anni luce, ha un pianeta di massa simile a quella terrestre nella sua zona abitabile. Attorno a TRAPPIST-1, a una quarantina di anni luce, orbitano sette pianeti di dimensioni terrestri, tre dei quali nella zona abitabile. Se la vita fosse frequente attorno alle nane rosse, la maggior parte dei mondi abitati della Galassia girerebbe attorno a stelle di questo tipo.

I pianeti delle nane rosse sono anche i più facili da studiare. Orbitano vicinissimi alla stella, e quindi transitano spesso davanti a essa e la fanno oscillare in modo misurabile; le stelle sono piccole, e un pianeta terrestre ne oscura una frazione grande. Il telescopio spaziale James Webb, in orbita dal 2021, sta osservando proprio questi pianeti per cercarne le atmosfere.

Le stesse caratteristiche che li rendono accessibili pongono problemi seri all'abitabilità. Un pianeta così vicino alla stella ruota probabilmente in modo sincrono, con una faccia sempre illuminata e l'altra sempre al buio. Le nane rosse sono stelle attive, con brillamenti frequenti e intensa emissione di raggi X e ultravioletti, e da giovani sono molto più luminose che da adulte. Questo capitolo esamina uno per uno questi aspetti, con i dati di Proxima Centauri e di TRAPPIST-1.

::: obiettivi
- descrivere le proprietà delle nane rosse e confrontarle con il Sole;
- usare la terza legge di Keplero per calcolare il periodo dei pianeti nella zona abitabile;
- spiegare la rotazione sincrona e i climi dei pianeti con una faccia sempre illuminata;
- valutare l'effetto dei brillamenti e della radiazione di alta energia sulle atmosfere;
- discutere la perdita d'acqua nella giovinezza della stella e la linea che separa i corpi con e senza atmosfera;
- interpretare le prime misure di JWST sui pianeti di TRAPPIST-1.
:::

Il capitolo usa la zona abitabile del capitolo [La zona abitabile](unit:biology-22), le atmosfere del capitolo [Atmosfere, effetto serra e clima](unit:biology-23) e le orbite del capitolo [Orbite circolari](unit:physics-13).

## Che cosa sono le nane rosse {#nane}

Le nane rosse sono le stelle di sequenza principale di tipo spettrale M, con masse fra circa $0{,}08$ e $0{,}6$ masse solari. Sotto $0{,}08$ masse solari la pressione e la temperatura nel nucleo non bastano ad accendere stabilmente la fusione dell'idrogeno, e l'oggetto è una nana bruna. Le nane rosse hanno temperature superficiali fra circa $2300$ e $3900$ K e luminosità da un decimillesimo a qualche centesimo di quella solare; la loro luce è soprattutto rossa e infrarossa, come si è visto nel capitolo [Fotosintesi e luce di altre stelle](unit:biology-20).

Le due stelle di questo capitolo sono esempi tipici. **Proxima Centauri** ha circa $0{,}12$ masse solari, una temperatura superficiale di circa $3000$ K e una luminosità di circa $0{,}0016$ volte quella del Sole. **TRAPPIST-1** è ancora più piccola: $0{,}090$ masse solari, un raggio di $0{,}119$ raggi solari, poco più di quello di Giove, una temperatura di $2566$ K e una luminosità di $0{,}00055$ volte quella solare.

Le nane rosse più piccole di circa $0{,}35$ masse solari sono **completamente convettive**: il gas dell'interno è continuamente rimescolato, dal nucleo alla superficie. Possono così bruciare quasi tutto il loro idrogeno, e con una luminosità così bassa durano moltissimo: i modelli di evoluzione stellare danno, per una stella di un decimo di massa solare, una vita sulla sequenza principale di migliaia di miliardi di anni, centinaia di volte l'età attuale dell'universo. Nessuna nana rossa si è ancora evoluta oltre la sequenza principale. Per la vita è un vantaggio evidente: una nana rossa fornisce energia stabile per tempi enormemente più lunghi del Sole, che uscirà dalla sequenza principale fra circa cinque miliardi di anni.

La convezione e la rotazione producono però campi magnetici intensi, e con essi un'**attività** forte: macchie, brillamenti, emissione di raggi X e di ultravioletto lontano, vento stellare. Nelle nane rosse più piccole l'attività dura miliardi di anni, molto più a lungo che nelle stelle simili al Sole.

## Anni di pochi giorni {#keplero}

La zona abitabile di una nana rossa è vicinissima alla stella. Per Proxima Centauri, con i flussi efficaci del capitolo [La zona abitabile](unit:biology-22), va da circa $0{,}04$ a $0{,}07$ unità astronomiche; per TRAPPIST-1 da circa $0{,}023$ a $0{,}040$. A queste distanze i periodi orbitali sono di pochi giorni, come mostra la terza legge di Keplero.

::: legge Terza legge di Keplero
Per un pianeta di massa trascurabile su un'orbita di semiasse maggiore $a$, in unità astronomiche, attorno a una stella di massa $M$, in masse solari, il periodo in anni soddisfa $P^2=a^3/M$. In giorni

$$P=365{,}25\sqrt{\frac{a^3}{M}}\ \text{giorni}.$$
:::

Per Proxima b, a $0{,}0485$ UA da una stella di $0{,}122$ masse solari, si ottiene $P\approx11{,}2$ giorni, in accordo con il periodo misurato. Per TRAPPIST-1e, a $0{,}0293$ UA da una stella di $0{,}090$ masse solari, $P\approx6{,}1$ giorni. I sette pianeti di TRAPPIST-1 hanno periodi da $1{,}5$ a $18{,}8$ giorni, e tutto il sistema starebbe comodamente all'interno dell'orbita di Mercurio (figura 1).

::: figura keplero
{"w":760,"h":290,"items":[{"t":"axes","o":[80,255],"x":[660,"semiasse maggiore, UA"],"y":[230,"periodo, giorni"],"sx":210,"sy":75,"xt":[[0.1,"0,01"],[1.1,"0,1"],[2.1,"1"]],"yt":[[0,"1"],[1,"10"],[2,"100"],[3,"1000"]]},{"t":"plot","o":[80,255],"sx":210,"sy":75,"pts":[[0.0,-0.5874098],[0.02,-0.5574098],[0.04,-0.5274098],[0.06,-0.4974098],[0.08,-0.4674098],[0.1,-0.4374098],[0.12,-0.4074098],[0.14,-0.3774098],[0.16,-0.3474098],[0.18,-0.3174098],[0.2,-0.2874098],[0.22,-0.2574098],[0.24,-0.2274098],[0.26,-0.1974098],[0.28,-0.1674098],[0.3,-0.1374098],[0.32,-0.1074098],[0.34,-0.0774098],[0.36,-0.0474098],[0.38,-0.0174098],[0.4,0.0125902],[0.42,0.0425902],[0.44,0.0725902],[0.46,0.1025902],[0.48,0.1325902],[0.5,0.1625902],[0.52,0.1925902],[0.54,0.2225902],[0.56,0.2525902],[0.58,0.2825902],[0.6,0.3125902],[0.62,0.3425902],[0.64,0.3725902],[0.66,0.4025902],[0.68,0.4325902],[0.7,0.4625902],[0.72,0.4925902],[0.74,0.5225902],[0.76,0.5525902],[0.78,0.5825902],[0.8,0.6125902],[0.82,0.6425902],[0.84,0.6725902],[0.86,0.7025902],[0.88,0.7325902],[0.9,0.7625902],[0.92,0.7925902],[0.94,0.8225902],[0.96,0.8525902],[0.98,0.8825902],[1.0,0.9125902],[1.02,0.9425902],[1.04,0.9725902],[1.06,1.0025902],[1.08,1.0325902],[1.1,1.0625902],[1.12,1.0925902],[1.14,1.1225902],[1.16,1.1525902],[1.18,1.1825902],[1.2,1.2125902],[1.22,1.2425902],[1.24,1.2725902],[1.26,1.3025902],[1.28,1.3325902],[1.3,1.3625902],[1.32,1.3925902],[1.34,1.4225902],[1.36,1.4525902],[1.38,1.4825902],[1.4,1.5125902],[1.42,1.5425902],[1.44,1.5725902],[1.46,1.6025902],[1.48,1.6325902],[1.5,1.6625902],[1.52,1.6925902],[1.54,1.7225902],[1.56,1.7525902],[1.58,1.7825902],[1.6,1.8125902],[1.62,1.8425902],[1.64,1.8725902],[1.66,1.9025902],[1.68,1.9325902],[1.7,1.9625902],[1.72,1.9925902],[1.74,2.0225902],[1.76,2.0525902],[1.78,2.0825902],[1.8,2.1125902],[1.82,2.1425902],[1.84,2.1725902],[1.86,2.2025902],[1.88,2.2325902],[1.9,2.2625902],[1.92,2.2925902],[1.94,2.3225902],[1.96,2.3525902],[1.98,2.3825902],[2.0,2.4125902],[2.02,2.4425902],[2.04,2.4725902],[2.06,2.5025902],[2.08,2.5325902],[2.1,2.5625902],[2.12,2.5925902],[2.14,2.6225902],[2.16,2.6525902],[2.18,2.6825902],[2.2,2.7125902]],"c":"force2","w":1.6,"dash":true},{"t":"plot","o":[80,255],"sx":210,"sy":75,"pts":[[0.0,-0.1270004],[0.02,-0.0970004],[0.04,-0.0670004],[0.06,-0.0370004],[0.08,-0.0070004],[0.1,0.0229996],[0.12,0.0529996],[0.14,0.0829996],[0.16,0.1129996],[0.18,0.1429996],[0.2,0.1729996],[0.22,0.2029996],[0.24,0.2329996],[0.26,0.2629996],[0.28,0.2929996],[0.3,0.3229996],[0.32,0.3529996],[0.34,0.3829996],[0.36,0.4129996],[0.38,0.4429996],[0.4,0.4729996],[0.42,0.5029996],[0.44,0.5329996],[0.46,0.5629996],[0.48,0.5929996],[0.5,0.6229996],[0.52,0.6529996],[0.54,0.6829996],[0.56,0.7129996],[0.58,0.7429996],[0.6,0.7729996],[0.62,0.8029996],[0.64,0.8329996],[0.66,0.8629996],[0.68,0.8929996],[0.7,0.9229996],[0.72,0.9529996],[0.74,0.9829996],[0.76,1.0129996],[0.78,1.0429996],[0.8,1.0729996],[0.82,1.1029996],[0.84,1.1329996],[0.86,1.1629996],[0.88,1.1929996],[0.9,1.2229996],[0.92,1.2529996],[0.94,1.2829996],[0.96,1.3129996],[0.98,1.3429996],[1.0,1.3729996],[1.02,1.4029996],[1.04,1.4329996],[1.06,1.4629996],[1.08,1.4929996],[1.1,1.5229996],[1.12,1.5529996],[1.14,1.5829996],[1.16,1.6129996],[1.18,1.6429996],[1.2,1.6729996],[1.22,1.7029996],[1.24,1.7329996],[1.26,1.7629996],[1.28,1.7929996],[1.3,1.8229996],[1.32,1.8529996],[1.34,1.8829996],[1.36,1.9129996],[1.38,1.9429996],[1.4,1.9729996],[1.42,2.0029996],[1.44,2.0329996],[1.46,2.0629996],[1.48,2.0929996],[1.5,2.1229996],[1.52,2.1529996],[1.54,2.1829996],[1.56,2.2129996],[1.58,2.2429996],[1.6,2.2729996],[1.62,2.3029996],[1.64,2.3329996],[1.66,2.3629996],[1.68,2.3929996],[1.7,2.4229996],[1.72,2.4529996],[1.74,2.4829996],[1.76,2.5129996],[1.78,2.5429996],[1.8,2.5729996],[1.82,2.6029996],[1.84,2.6329996],[1.86,2.6629996],[1.88,2.6929996],[1.9,2.7229996],[1.92,2.7529996],[1.94,2.7829996],[1.96,2.8129996],[1.98,2.8429996],[2.0,2.8729996],[2.02,2.9029996],[2.04,2.9329996],[2.06,2.9629996],[2.08,2.9929996],[2.1,3.0229996]],"c":"force","w":1.6,"dash":true},{"t":"plot","o":[80,255],"sx":210,"sy":75,"pts":[[0.0,-0.064531],[0.02,-0.034531],[0.04,-0.004531],[0.06,0.025469],[0.08,0.055469],[0.1,0.085469],[0.12,0.115469],[0.14,0.145469],[0.16,0.175469],[0.18,0.205469],[0.2,0.235469],[0.22,0.265469],[0.24,0.295469],[0.26,0.325469],[0.28,0.355469],[0.3,0.385469],[0.32,0.415469],[0.34,0.445469],[0.36,0.475469],[0.38,0.505469],[0.4,0.535469],[0.42,0.565469],[0.44,0.595469],[0.46,0.625469],[0.48,0.655469],[0.5,0.685469],[0.52,0.715469],[0.54,0.745469],[0.56,0.775469],[0.58,0.805469],[0.6,0.835469],[0.62,0.865469],[0.64,0.895469],[0.66,0.925469],[0.68,0.955469],[0.7,0.985469],[0.72,1.015469],[0.74,1.045469],[0.76,1.075469],[0.78,1.105469],[0.8,1.135469],[0.82,1.165469],[0.84,1.195469],[0.86,1.225469],[0.88,1.255469],[0.9,1.285469],[0.92,1.315469],[0.94,1.345469],[0.96,1.375469],[0.98,1.405469],[1.0,1.435469],[1.02,1.465469],[1.04,1.495469],[1.06,1.525469],[1.08,1.555469],[1.1,1.585469],[1.12,1.615469],[1.14,1.645469],[1.16,1.675469],[1.18,1.705469],[1.2,1.735469],[1.22,1.765469],[1.24,1.795469],[1.26,1.825469],[1.28,1.855469],[1.3,1.885469],[1.32,1.915469],[1.34,1.945469],[1.36,1.975469],[1.38,2.005469],[1.4,2.035469],[1.42,2.065469],[1.44,2.095469],[1.46,2.125469],[1.48,2.155469],[1.5,2.185469],[1.52,2.215469],[1.54,2.245469],[1.56,2.275469],[1.58,2.305469],[1.6,2.335469],[1.62,2.365469],[1.64,2.395469],[1.66,2.425469],[1.68,2.455469],[1.7,2.485469],[1.72,2.515469],[1.74,2.545469],[1.76,2.575469],[1.78,2.605469],[1.8,2.635469],[1.82,2.665469],[1.84,2.695469],[1.86,2.725469],[1.88,2.755469],[1.9,2.785469],[1.92,2.815469],[1.94,2.845469],[1.96,2.875469],[1.98,2.905469],[2.0,2.935469],[2.02,2.965469],[2.04,2.995469],[2.06,3.025469]],"c":"force3","w":1.6,"dash":true},{"t":"text","p":[548.0,51.6],"s":"1 massa solare","c":"force2","size":10,"a":"start"},{"t":"text","p":[216.5,75.0],"s":"0,12 e 0,09 masse solari","c":"force","size":10,"a":"start"},{"t":"circle","p":[521.0,62.8,5],"c":"force2"},{"t":"text","p":[513.0,56.8],"s":"Terra","c":"force2","size":11,"a":"end"},{"t":"circle","p":[434.4,109.2,5],"c":"force2"},{"t":"text","p":[442.4,125.2],"s":"Mercurio","c":"force2","size":11,"a":"start"},{"t":"circle","p":[245.0,176.3,5],"c":"force"},{"t":"text","p":[253.0,190.3],"s":"Proxima b","c":"force","size":11,"a":"start"},{"t":"circle","p":[114.1,241.6,4],"c":"force3"},{"t":"circle","p":[142.7,226.2,4],"c":"force3"},{"t":"circle","p":[174.0,209.4,4],"c":"force3"},{"t":"circle","p":[198.9,196.1,4],"c":"force3"},{"t":"circle","p":[223.9,182.7,4],"c":"force3"},{"t":"circle","p":[241.8,173.1,4],"c":"force3"},{"t":"circle","p":[267.2,159.5,4],"c":"force3"},{"t":"text","p":[194.6,221.8],"s":"TRAPPIST-1 b-h","c":"force3","size":11,"a":"start"}]}
---
Periodo orbitale in funzione del semiasse maggiore, in scala logaritmica, per stelle di $1$, $0{,}12$ e $0{,}09$ masse solari, con la Terra e Mercurio, Proxima b e i sette pianeti di TRAPPIST-1. Ogni retta ha pendenza $3/2$, come prevede la terza legge di Keplero.
:::

::: esempio Quadruplicare la distanza
Se il semiasse maggiore quadruplica a massa fissata, il periodo cresce di $4^{3/2}=8$ volte. Un pianeta di Proxima Centauri a $0{,}194$ UA, quattro volte la distanza di Proxima b, impiegherebbe circa $89$ giorni a compiere un'orbita, e riceverebbe un sedicesimo del flusso, troppo poco per avere acqua liquida in superficie.
:::

La vicinanza rende questi pianeti facili da scoprire. Un pianeta transita davanti alla stella, vista dalla Terra, con probabilità circa uguale al rapporto fra il raggio della stella e la distanza del pianeta: per la Terra vista da lontano è circa lo $0{,}5\%$, per TRAPPIST-1e quasi il $2\%$. La frazione di luce oscurata durante il transito è il rapporto fra le aree dei dischi: un pianeta grande come la Terra davanti al Sole oscura lo $0{,}008\%$ della luce, davanti a TRAPPIST-1 circa lo $0{,}6\%$, settanta volte di più. Anche il metodo delle velocità radiali è favorito, perché un pianeta vicino a una stella leggera la fa oscillare più velocemente e più ampiamente. Nel 2015 Courtney Dressing e David Charbonneau stimarono dai dati del telescopio Kepler che una nana rossa ospita in media circa $2{,}5$ pianeti con raggio fra $1$ e $4$ raggi terrestri e periodo inferiore a $200$ giorni, e circa $0{,}18$ pianeti di dimensioni terrestri nella zona abitabile conservativa.

## Una faccia sempre al Sole {#marea}

La Luna mostra alla Terra sempre la stessa faccia: compie una rotazione su se stessa per ogni giro attorno alla Terra. Questa **rotazione sincrona** è il risultato delle **maree**. La gravità della Terra deforma leggermente la Luna, allungandola nella direzione della Terra; se la Luna ruotasse più in fretta, il rigonfiamento verrebbe trascinato avanti, la Terra lo tirerebbe indietro, e l'attrito interno dissiperebbe energia di rotazione. Il processo continua finché il rigonfiamento resta fermo rispetto alla Terra, cioè finché la rotazione diventa sincrona.

Lo stesso accade ai pianeti vicini a una stella. Il tempo necessario per raggiungere la rotazione sincrona dipende da molti parametri del pianeta, come la rigidità dell'interno e la rotazione iniziale, ma soprattutto dalla distanza e dalla massa della stella: secondo le stime classiche, come quella di Brett Gladman e collaboratori del 1996, è proporzionale a $a^6/M^2$. La sesta potenza della distanza rende enorme la differenza fra la Terra e i pianeti delle nane rosse (figura 2).

::: figura marea
{"w":860,"h":300,"items":[{"t":"line","p":[250,40,250,250],"c":"ax","w":1.4},{"t":"text","p":[238,60],"s":"Terra, 1 UA dal Sole","c":"ax","size":11,"a":"end"},{"t":"text","p":[258.0,60],"s":"1","c":"force2","size":11,"a":"start"},{"t":"text","p":[238,100],"s":"Mercurio, 0,387 UA","c":"ax","size":11,"a":"end"},{"t":"rect","p":[250,87,123.7,16],"c":"force2","r":2},{"t":"text","p":[381.7,100],"s":"3·10⁻³","c":"force2","size":11,"a":"start"},{"t":"text","p":[238,140],"s":"Proxima b","c":"ax","size":11,"a":"end"},{"t":"rect","p":[250,127,302.9,16],"c":"force2","r":2},{"t":"text","p":[560.9,140],"s":"9·10⁻⁷","c":"force2","size":11,"a":"start"},{"t":"text","p":[238,180],"s":"TRAPPIST-1e","c":"ax","size":11,"a":"end"},{"t":"rect","p":[250,167,355.5,16],"c":"force2","r":2},{"t":"text","p":[613.5,180],"s":"8·10⁻⁸","c":"force2","size":11,"a":"start"},{"t":"text","p":[238,220],"s":"TRAPPIST-1b","c":"ax","size":11,"a":"end"},{"t":"rect","p":[250,207,476.7,16],"c":"force2","r":2},{"t":"text","p":[734.7,220],"s":"3·10⁻¹⁰","c":"force2","size":11,"a":"start"},{"t":"line","p":[250,250,250,255],"c":"muted","w":1},{"t":"text","p":[250,270],"s":"1","c":"muted","size":10},{"t":"line","p":[350,250,350,255],"c":"muted","w":1},{"t":"text","p":[350,270],"s":"10⁻²","c":"muted","size":10},{"t":"line","p":[450,250,450,255],"c":"muted","w":1},{"t":"text","p":[450,270],"s":"10⁻⁴","c":"muted","size":10},{"t":"line","p":[550,250,550,255],"c":"muted","w":1},{"t":"text","p":[550,270],"s":"10⁻⁶","c":"muted","size":10},{"t":"line","p":[650,250,650,255],"c":"muted","w":1},{"t":"text","p":[650,270],"s":"10⁻⁸","c":"muted","size":10},{"t":"line","p":[750,250,750,255],"c":"muted","w":1},{"t":"text","p":[750,270],"s":"10⁻¹⁰","c":"muted","size":10},{"t":"text","p":[500,290],"s":"tempo di sincronizzazione relativo alla Terra","c":"muted","size":10}]}
---
Tempo necessario per raggiungere la rotazione sincrona, relativo a quello di un pianeta uguale alla Terra a $1$ UA dal Sole, calcolato con la proporzionalità ad $a^6/M^2$ a parità di proprietà del pianeta. Per Proxima b e TRAPPIST-1e il tempo è da un milione a dieci milioni di volte più breve.
:::

::: esempio Proxima b e la Terra
Per Proxima b il rapporto con la Terra vale $0{,}0485^6/0{,}122^2\approx8{,}7\cdot10^{-7}$: a parità di proprietà del pianeta, la rotazione diventa sincrona circa un milione di volte più in fretta. La Terra, dopo $4{,}5$ miliardi di anni, ruota ancora rapidamente; un pianeta come Proxima b raggiunge la sincronizzazione in tempi brevi rispetto all'età della stella.
:::

La rotazione sincrona esatta è il risultato più probabile per orbite circolari, ma esistono alternative. Mercurio, su un'orbita eccentrica, compie tre rotazioni ogni due orbite, una **risonanza** $3:2$. Nel 2016 Ignasi Ribas e collaboratori conclusero che Proxima b ruota probabilmente in modo sincrono oppure nella risonanza $3:2$, a seconda dell'eccentricità dell'orbita e della forma del pianeta.

Su un pianeta in rotazione sincrona il punto in cui la stella è allo zenit, il **punto substellare**, resta fermo, e la stella non si muove nel cielo. L'emisfero illuminato riceve luce continua, quello notturno nessuna. Si temeva che l'atmosfera, raffreddata sull'emisfero notturno, vi condensasse fino a congelare completamente. Nel 1997 Manoj Joshi, Robert Haberle e Ray Reynolds mostrarono con un modello della circolazione atmosferica che un'atmosfera anche moderatamente densa trasporta abbastanza calore dall'emisfero diurno a quello notturno da evitare questo collasso. I modelli più recenti mostrano climi molto diversi a seconda della quantità d'acqua: un oceano liquido attorno al punto substellare circondato da ghiaccio, un aspetto che Raymond Pierrehumbert ha chiamato a **occhio**; oppure, con poca acqua, un pianeta secco in cui il ghiaccio si accumula sull'emisfero notturno (figura 3).

::: figura sincrona
{"w":640,"h":300,"items":[{"t":"circle","p":[400,150,95],"c":"body"},{"t":"poly","pts":[[400,55],[400.0,55.0],[409.9,55.5],[419.8,57.1],[429.4,59.6],[438.6,63.2],[447.5,67.7],[455.8,73.1],[463.6,79.4],[470.6,86.4],[476.9,94.2],[482.3,102.5],[486.8,111.4],[490.4,120.6],[492.9,130.2],[494.5,140.1],[495.0,150.0],[494.5,159.9],[492.9,169.8],[490.4,179.4],[486.8,188.6],[482.3,197.5],[476.9,205.8],[470.6,213.6],[463.6,220.6],[455.8,226.9],[447.5,232.3],[438.6,236.8],[429.4,240.4],[419.8,242.9],[409.9,244.5],[400.0,245.0]],"c":"muted","w":1,"close":true,"fill":true},{"t":"line","p":[400,55,400,245],"c":"ax","w":1.4,"dash":true},{"t":"poly","pts":[[377.8,150.0],[377.3,155.2],[375.9,160.3],[373.7,165.0],[370.7,169.3],[367.0,173.0],[362.8,176.0],[358.0,178.2],[353.0,179.5],[347.8,180.0],[342.5,179.5],[337.5,178.2],[332.8,176.0],[328.5,173.0],[324.8,169.3],[321.8,165.0],[319.6,160.3],[318.2,155.2],[317.8,150.0],[318.2,144.8],[319.6,139.7],[321.8,135.0],[324.8,130.7],[328.5,127.0],[332.8,124.0],[337.5,121.8],[342.5,120.5],[347.8,120.0],[353.0,120.5],[358.0,121.8],[362.8,124.0],[367.0,127.0],[370.7,130.7],[373.7,135.0],[375.9,139.7],[377.3,144.8]],"c":"force2","w":2,"close":true},{"t":"text","p":[347.8,154],"s":"oceano","c":"force2","size":11},{"t":"arrow","p":[80,90,318.3,90],"c":"force","w":2,"head":8},{"t":"arrow","p":[80,120,301.9,120],"c":"force","w":2,"head":8},{"t":"arrow","p":[80,150,297.0,150],"c":"force","w":2,"head":8},{"t":"arrow","p":[80,180,301.9,180],"c":"force","w":2,"head":8},{"t":"arrow","p":[80,210,318.3,210],"c":"force","w":2,"head":8},{"t":"circle","p":[42,150,24],"c":"force"},{"t":"text","p":[42,196],"s":"stella","c":"force","size":11},{"t":"text","p":[352.5,269],"s":"giorno perenne","c":"ax","size":11},{"t":"text","p":[447.5,154],"s":"notte perenne","c":"ax","size":11},{"t":"text","p":[400,43],"s":"terminatore","c":"muted","size":10},{"t":"arrow","p":[365,77,435,77],"c":"force4","w":1.8,"head":7},{"t":"text","p":[511,81],"s":"venti verso la notte","c":"force4","size":10,"a":"start"}]}
---
Schema di un pianeta in rotazione sincrona. La stella illumina sempre lo stesso emisfero; attorno al punto substellare può esistere un oceano liquido, sormontato da nubi spesse, mentre l'emisfero notturno è freddo. I venti trasportano calore dall'emisfero diurno a quello notturno.
:::

Le nubi aiutano. Come si è visto nel capitolo [La zona abitabile](unit:biology-22), su un pianeta in rotazione sincrona si forma sopra il punto substellare uno spesso strato di nubi che riflette molta luce e permette al pianeta di restare temperato anche con un flusso stellare più alto di quello terrestre. Per la vita, un emisfero in luce perenne e una fascia crepuscolare permanente lungo il confine fra giorno e notte, il **terminatore**, sarebbero ambienti senza equivalenti sulla Terra.

## Brillamenti e radiazione di alta energia {#attivita}

Le nane rosse sono stelle attive. I loro campi magnetici, intrecciati dalla convezione, accumulano energia e la liberano all'improvviso nei **brillamenti**: in pochi minuti la luminosità della stella cresce, soprattutto nell'ultravioletto e nei raggi X, e poi torna lentamente al valore normale (figura 4). I brillamenti più grandi sono accompagnati da particelle cariche accelerate e da espulsioni di massa coronale, nubi di plasma lanciate nello spazio.

::: figura brillamento
{"w":760,"h":285,"items":[{"t":"axes","o":[80,250],"x":[640,"tempo, minuti"],"y":[220,"luminosità, rispetto alla quiete"],"sx":5,"sy":2.2,"xt":[[0,"0"],[20,"20"],[40,"40"],[60,"60"],[80,"80"],[100,"100"]],"yt":[[1,"1"],[25,"25"],[50,"50"],[75,"75"],[100,"100"]]},{"t":"plot","o":[80,250],"sx":5,"sy":2.2,"pts":[[0.0,1],[0.5,1],[1.0,1],[1.5,1],[2.0,1],[2.5,1],[3.0,1],[3.5,1],[4.0,1],[4.5,1],[5.0,1],[5.5,1],[6.0,1],[6.5,1],[7.0,1],[7.5,1],[8.0,1],[8.5,1],[9.0,1],[9.5,1],[10.0,1],[10.5,1],[11.0,1],[11.5,1],[12.0,1],[12.5,1],[13.0,1],[13.5,1],[14.0,1],[14.5,1],[15.0,1],[15.5,1],[16.0,1],[16.5,1],[17.0,1],[17.5,1],[18.0,1],[18.5,1],[19.0,1],[19.5,1],[20.0,1.0],[20.5,12.25],[21.0,23.5],[21.5,34.75],[22.0,46.0],[22.5,57.25],[23.0,68.5],[23.5,79.75],[24.0,91.0],[24.5,86.6106482],[25.0,82.4353676],[25.5,78.4637179],[26.0,74.6857678],[26.5,71.0920705],[27.0,67.6736399],[27.5,64.4219281],[28.0,61.3288041],[28.5,58.3865336],[29.0,55.5877594],[29.5,52.9254829],[30.0,50.3930472],[30.5,47.9841199],[31.0,45.6926773],[31.5,43.5129897],[32.0,41.4396068],[32.5,39.4673439],[33.0,37.5912694],[33.5,35.8066921],[34.0,34.1091497],[34.5,32.4943974],[35.0,30.9583975],[35.5,29.4973092],[36.0,28.1074791],[36.5,26.7854317],[37.0,25.5278614],[37.5,24.3316235],[38.0,23.1937268],[38.5,22.1113259],[39.0,21.0817144],[39.5,20.1023176],[40.0,19.1706866],[40.5,18.2844918],[41.0,17.4415172],[41.5,16.6396549],[42.0,15.8768999],[42.5,15.151345],[43.0,14.4611757],[43.5,13.8046664],[44.0,13.1801755],[44.5,12.5861413],[45.0,12.0210785],[45.5,11.4835742],[46.0,10.9722843],[46.5,10.4859302],[47.0,10.0232959],[47.5,9.5832246],[48.0,9.1646158],[48.5,8.7664228],[49.0,8.3876499],[49.5,8.0273499],[50.0,7.684622],[50.5,7.3586092],[51.0,7.0484961],[51.5,6.7535075],[52.0,6.4729056],[52.5,6.2059889],[53.0,5.9520898],[53.5,5.7105735],[54.0,5.4808362],[54.5,5.2623032],[55.0,5.0544282],[55.5,4.8566914],[56.0,4.6685984],[56.5,4.4896787],[57.0,4.3194851],[57.5,4.1575919],[58.0,4.0035943],[58.5,3.8571073],[59.0,3.7177645],[59.5,3.5852176],[60.0,3.459135],[60.5,3.3392016],[61.0,3.2251174],[61.5,3.1165971],[62.0,3.0133695],[62.5,2.9151763],[63.0,2.821772],[63.5,2.7329232],[64.0,2.6484075],[64.5,2.5680137],[65.0,2.4915408],[65.5,2.4187975],[66.0,2.3496019],[66.5,2.2837811],[67.0,2.2211703],[67.5,2.1616131],[68.0,2.1049606],[68.5,2.051071],[69.0,1.9998097],[69.5,1.9510484],[70.0,1.9046652],[70.5,1.8605442],[71.0,1.8185749],[71.5,1.7786526],[72.0,1.7406772],[72.5,1.704554],[73.0,1.6701925],[73.5,1.6375068],[74.0,1.6064152],[74.5,1.57684],[75.0,1.5487072],[75.5,1.5219464],[76.0,1.4964908],[76.5,1.4722767],[77.0,1.4492435],[77.5,1.4273336],[78.0,1.4064923],[78.5,1.3866674],[79.0,1.3678094],[79.5,1.3498712],[80.0,1.3328077],[80.5,1.3165765],[81.0,1.3011369],[81.5,1.2864503],[82.0,1.2724799],[82.5,1.2591909],[83.0,1.24655],[83.5,1.2345256],[84.0,1.2230877],[84.5,1.2122076],[85.0,1.2018581],[85.5,1.1920134],[86.0,1.1826488],[86.5,1.1737409],[87.0,1.1652674],[87.5,1.1572072],[88.0,1.1495402],[88.5,1.142247],[89.0,1.1353095],[89.5,1.1287104],[90.0,1.1224331],[90.5,1.116462],[91.0,1.1107821],[91.5,1.1053792],[92.0,1.1002398],[92.5,1.095351],[93.0,1.0907007],[93.5,1.0862772],[94.0,1.0820694],[94.5,1.0780668],[95.0,1.0742594],[95.5,1.0706378],[96.0,1.0671927],[96.5,1.0639157],[97.0,1.0607985],[97.5,1.0578333],[98.0,1.0550127],[98.5,1.0523297],[99.0,1.0497776],[99.5,1.0473499],[100.0,1.0450406],[100.5,1.042844],[101.0,1.0407544],[101.5,1.0387668],[102.0,1.0368761],[102.5,1.0350777],[103.0,1.0333669],[103.5,1.0317396],[104.0,1.0301916],[104.5,1.0287192],[105.0,1.0273185],[105.5,1.0259862],[106.0,1.0247188],[106.5,1.0235133],[107.0,1.0223665],[107.5,1.0212757],[108.0,1.0202381],[108.5,1.019251],[109.0,1.0183122],[109.5,1.0174191],[110.0,1.0165695]],"c":"force4","w":2.4},{"t":"plot","o":[80,250],"sx":5,"sy":2.2,"pts":[[0.0,1],[0.5,1],[1.0,1],[1.5,1],[2.0,1],[2.5,1],[3.0,1],[3.5,1],[4.0,1],[4.5,1],[5.0,1],[5.5,1],[6.0,1],[6.5,1],[7.0,1],[7.5,1],[8.0,1],[8.5,1],[9.0,1],[9.5,1],[10.0,1],[10.5,1],[11.0,1],[11.5,1],[12.0,1],[12.5,1],[13.0,1],[13.5,1],[14.0,1],[14.5,1],[15.0,1],[15.5,1],[16.0,1],[16.5,1],[17.0,1],[17.5,1],[18.0,1],[18.5,1],[19.0,1],[19.5,1],[20.0,1.0],[20.5,2.0],[21.0,3.0],[21.5,4.0],[22.0,5.0],[22.5,6.0],[23.0,7.0],[23.5,8.0],[24.0,9.0],[24.5,8.7193276],[25.0,8.4485022],[25.5,8.1871786],[26.0,7.9350232],[26.5,7.6917145],[27.0,7.456942],[27.5,7.2304063],[28.0,7.0118183],[28.5,6.8008994],[29.0,6.5973803],[29.5,6.4010015],[30.0,6.2115125],[30.5,6.0286715],[31.0,5.8522453],[31.5,5.6820088],[32.0,5.517745],[32.5,5.3592442],[33.0,5.2063042],[33.5,5.05873],[34.0,4.9163333],[34.5,4.7789324],[35.0,4.6463521],[35.5,4.5184233],[36.0,4.3949828],[36.5,4.275873],[37.0,4.1609421],[37.5,4.0500434],[38.0,3.9430355],[38.5,3.8397819],[39.0,3.7401508],[39.5,3.6440152],[40.0,3.5512525],[40.5,3.4617442],[41.0,3.3753762],[41.5,3.2920384],[42.0,3.2116244],[42.5,3.1340316],[43.0,3.0591611],[43.5,2.9869174],[44.0,2.9172083],[44.5,2.8499448],[45.0,2.7850413],[45.5,2.7224148],[46.0,2.6619855],[46.5,2.6036763],[47.0,2.5474128],[47.5,2.4931233],[48.0,2.4407385],[48.5,2.3901915],[49.0,2.341418],[49.5,2.2943556],[50.0,2.2489444],[50.5,2.2051263],[51.0,2.1628456],[51.5,2.1220483],[52.0,2.0826823],[52.5,2.0446974],[53.0,2.0080452],[53.5,1.9726788],[54.0,1.9385533],[54.5,1.9056251],[55.0,1.8738521],[55.5,1.8431938],[56.0,1.8136111],[56.5,1.7850664],[57.0,1.757523],[57.5,1.7309461],[58.0,1.7053015],[58.5,1.6805567],[59.0,1.65668],[59.5,1.633641],[60.0,1.6114103],[60.5,1.5899595],[61.0,1.5692614],[61.5,1.5492894],[62.0,1.5300181],[62.5,1.5114229],[63.0,1.4934801],[63.5,1.4761668],[64.0,1.459461],[64.5,1.4433412],[65.0,1.427787],[65.5,1.4127785],[66.0,1.3982965],[66.5,1.3843227],[67.0,1.3708391],[67.5,1.3578286],[68.0,1.3452745],[68.5,1.3331608],[69.0,1.3214722],[69.5,1.3101937],[70.0,1.2993108],[70.5,1.2888098],[71.0,1.2786772],[71.5,1.2689],[72.0,1.2594659],[72.5,1.2503628],[73.0,1.2415791],[73.5,1.2331035],[74.0,1.2249253],[74.5,1.217034],[75.0,1.2094196],[75.5,1.2020723],[76.0,1.1949828],[76.5,1.188142],[77.0,1.1815412],[77.5,1.175172],[78.0,1.1690262],[78.5,1.1630961],[79.0,1.157374],[79.5,1.1518527],[80.0,1.1465251],[80.5,1.1413844],[81.0,1.1364241],[81.5,1.1316378],[82.0,1.1270194],[82.5,1.122563],[83.0,1.118263],[83.5,1.1141139],[84.0,1.1101103],[84.5,1.1062472],[85.0,1.1025196],[85.5,1.0989228],[86.0,1.0954522],[86.5,1.0921033],[87.0,1.088872],[87.5,1.085754],[88.0,1.0827454],[88.5,1.0798423],[89.0,1.0770411],[89.5,1.0743382],[90.0,1.0717301],[90.5,1.0692136],[91.0,1.0667853],[91.5,1.0644422],[92.0,1.0621813],[92.5,1.0599997],[93.0,1.0578947],[93.5,1.0558635],[94.0,1.0539036],[94.5,1.0520124],[95.0,1.0501876],[95.5,1.0484268],[96.0,1.0467278],[96.5,1.0450884],[97.0,1.0435065],[97.5,1.0419801],[98.0,1.0405073],[98.5,1.0390862],[99.0,1.0377149],[99.5,1.0363917],[100.0,1.0351149],[100.5,1.0338829],[101.0,1.0326942],[101.5,1.0315471],[102.0,1.0304403],[102.5,1.0293724],[103.0,1.0283419],[103.5,1.0273475],[104.0,1.026388],[104.5,1.0254622],[105.0,1.0245689],[105.5,1.0237069],[106.0,1.0228752],[106.5,1.0220727],[107.0,1.0212983],[107.5,1.020551],[108.0,1.01983],[108.5,1.0191343],[109.0,1.018463],[109.5,1.0178152],[110.0,1.0171902]],"c":"force","w":2.4},{"t":"text","p":[218,52.0],"s":"ultravioletto","c":"force4","size":11,"a":"start"},{"t":"text","p":[380,223.6],"s":"luce visibile","c":"force","size":11,"a":"start"}]}
---
Andamento schematico di un brillamento: la luminosità cresce in pochi minuti e decresce in decine di minuti o in ore. L'aumento è molto più forte nell'ultravioletto e nei raggi X che nella luce visibile.
:::

Per un pianeta nella zona abitabile di una nana rossa il problema è la vicinanza. Il flusso totale è simile a quello terrestre, ma la stella emette una frazione molto più grande della sua energia in raggi X e ultravioletto lontano, e il pianeta è decine di volte più vicino. Nel 2016 Ribas e collaboratori stimarono che Proxima b riceve circa $30$ volte più ultravioletto estremo della Terra e circa $250$ volte più raggi X. Nel marzo 2016 il telescopio Evryscope osservò su Proxima Centauri un **superbrillamento** che rese la stella, per pochi minuti, circa $68$ volte più luminosa nel visibile, al limite della visibilità a occhio nudo, con un'energia totale di circa $3\cdot10^{26}$ joule. Ward Howard e collaboratori stimarono nel 2018 che eventi simili avvengono almeno cinque volte all'anno, e che le particelle cariche di brillamenti così frequenti potrebbero ridurre del $90\%$ in pochi anni lo strato di ozono di un'atmosfera simile a quella terrestre.

::: approfondimento Che cosa fa la radiazione di alta energia a un'atmosfera
I raggi X e l'ultravioletto estremo vengono assorbiti negli strati più alti dell'atmosfera, li riscaldano fino a migliaia di gradi e li ionizzano. Il gas riscaldato si espande e, se è leggero, sfugge nello spazio; gli ioni possono essere trascinati via dal vento stellare. Questa **fuga guidata dalla radiazione** può erodere un'atmosfera primordiale di idrogeno in poche centinaia di milioni di anni e, nei casi più estremi, anche le atmosfere secondarie di anidride carbonica e di azoto. L'ultravioletto che arriva al suolo danneggia il DNA, come si è visto nel capitolo [Estremofili](unit:biology-18); uno strato di ozono, o un oceano di qualche metro, offre protezione.
:::

L'attività non è necessariamente un ostacolo insuperabile. Gli organismi potrebbero vivere sotto la superficie o nell'acqua; un'atmosfera densa e un forte campo magnetico del pianeta riducono le perdite; e l'ultravioletto, in dosi moderate, potrebbe aver favorito alcune reazioni prebiotiche, come quelle discusse nel capitolo [Miller-Urey e la sintesi prebiotica](unit:biology-07). Le osservazioni mostreranno quali pianeti hanno conservato un'atmosfera.

## Una giovinezza troppo luminosa {#giovinezza}

Una stella appena formata si contrae lentamente prima di accendere stabilmente la fusione dell'idrogeno. Per il Sole questa fase **di presequenza principale** durò alcune decine di milioni di anni; per una nana rossa piccola dura centinaia di milioni di anni, durante i quali la stella è molto più luminosa che in seguito. Un pianeta che oggi si trova nella zona abitabile di una nana rossa si è trovato quindi, in gioventù, molto più vicino del bordo interno: per decine o centinaia di milioni di anni ha ricevuto un flusso abbastanza alto da innescare la serra galoppante del capitolo [La zona abitabile](unit:biology-22).

In quella fase il vapore acqueo raggiunge l'alta atmosfera, la radiazione ultravioletta lo scinde e l'idrogeno sfugge; un pianeta può perdere una parte consistente dei suoi oceani. Nel 2015 Rodrigo Luger e Rory Barnes calcolarono che i pianeti della zona abitabile delle nane rosse possono perdere in questo modo grandi quantità d'acqua, e che l'ossigeno lasciato indietro dall'idrogeno può accumularsi nell'atmosfera fino a pressioni elevate. Un'atmosfera ricca di ossigeno prodotta senza vita sarebbe un **falso positivo** per una delle biofirme più cercate, come si discute nel capitolo [Biofirme e falsi positivi](unit:biology-33).

L'esito dipende dalla quantità d'acqua iniziale, che i modelli di formazione dei pianeti non fissano bene. Per Proxima b, Ribas e collaboratori stimarono nel 2016 che il pianeta potrebbe aver perso meno di un oceano terrestre di idrogeno prima di entrare nella zona abitabile, fra $100$ e $200$ milioni di anni dopo la sua formazione: se ne aveva di più, potrebbe averne conservato. Pianeti formati più lontano e migrati verso l'interno, o ricchi d'acqua fin dall'origine, potrebbero aver superato la giovinezza della stella con oceani profondi.

## Con o senza atmosfera {#atmosfere}

Nel sistema solare alcuni corpi hanno un'atmosfera e altri no, e la divisione non dipende soltanto dalla dimensione. Titano, una luna con meno della metà della massa di Mercurio, ha un'atmosfera di azoto più densa di quella terrestre; Mercurio e la Luna ne sono quasi privi; Marte ne ha una sottile. Nel 2017 Kevin Zahnle e David Catling mostrarono che, in un grafico con la velocità di fuga del corpo su un asse e il flusso ricevuto dalla stella sull'altro, i corpi con atmosfera e quelli senza sono separati da una linea, la **costa cosmica**: lungo questa linea il flusso cresce circa come la quarta potenza della velocità di fuga. I corpi con gravità forte e poca energia ricevuta conservano l'atmosfera, quelli con gravità debole e molta energia la perdono (figura 5).

::: figura costa
{"w":700,"h":285,"items":[{"t":"axes","o":[80,250],"x":[560,"velocità di fuga, km/s"],"y":[225,"flusso, in unità terrestri"],"sx":300,"sy":55,"xt":[[0.10103,"2"],[0.49897,"5"],[0.8,"10"],[1.10103,"20"]],"yt":[[0.2,"0,01"],[1.2,"0,1"],[2.2,"1"],[3.2,"10"]]},{"t":"circle","p":[324.6,113.5,5],"c":"force2"},{"t":"text","p":[316.6,105.5],"s":"Venere","c":"ax","size":10,"a":"end"},{"t":"circle","p":[334.6,129.0,5],"c":"force2"},{"t":"text","p":[342.6,143.0],"s":"Terra","c":"ax","size":10,"a":"start"},{"t":"circle","p":[230.5,149.2,5],"c":"force2"},{"t":"text","p":[238.5,141.2],"s":"Marte","c":"ax","size":10,"a":"start"},{"t":"circle","p":[146.5,236.7,5],"c":"force2"},{"t":"text","p":[156.5,240.7],"s":"Titano","c":"ax","size":10,"a":"start"},{"t":"poly","pts":[[213.5,83.6],[212.6,86.6],[210.1,88.4],[207.0,88.4],[204.5,86.6],[203.5,83.6],[204.5,80.7],[207.0,78.9],[210.1,78.9],[212.6,80.7]],"c":"force2","w":1.6,"close":true},{"t":"text","p":[216.5,75.6],"s":"Mercurio","c":"ax","size":10,"a":"start"},{"t":"poly","pts":[[138.0,129.0],[137.0,131.9],[134.5,133.8],[131.4,133.8],[128.9,131.9],[128.0,129.0],[128.9,126.1],[131.4,124.2],[134.5,124.2],[137.0,126.1]],"c":"force2","w":1.6,"close":true},{"t":"text","p":[141.0,121.0],"s":"Luna","c":"ax","size":10,"a":"start"},{"t":"poly","pts":[[156.3,207.7],[155.4,210.7],[152.9,212.5],[149.8,212.5],[147.3,210.7],[146.3,207.7],[147.3,204.8],[149.8,203.0],[152.9,203.0],[155.4,204.8]],"c":"force2","w":1.6,"close":true},{"t":"text","p":[159.3,199.7],"s":"Ganimede","c":"ax","size":10,"a":"start"},{"t":"poly","pts":[[141.2,207.7],[140.3,210.7],[137.8,212.5],[134.7,212.5],[132.2,210.7],[131.2,207.7],[132.2,204.8],[134.7,203.0],[137.8,203.0],[140.3,204.8]],"c":"force2","w":1.6,"close":true},{"t":"text","p":[128.2,199.7],"s":"Callisto","c":"ax","size":10,"a":"end"},{"t":"rect","p":[344.2,91.0,8,8],"c":"force3","r":1},{"t":"rect","p":[342.1,106.0,8,8],"c":"force3","r":1},{"t":"rect","p":[284.5,122.4,8,8],"c":"force3","r":1},{"t":"rect","p":[312.1,135.4,8,8],"c":"force3","r":1},{"t":"rect","p":[330.3,148.5,8,8],"c":"force3","r":1},{"t":"rect","p":[340.9,157.9,8,8],"c":"force3","r":1},{"t":"rect","p":[275.9,171.2,8,8],"c":"force3","r":1},{"t":"text","p":[356.0,89.0],"s":"TRAPPIST-1b","c":"force3","size":10,"a":"start"},{"t":"text","p":[271.9,179.3],"s":"TRAPPIST-1h","c":"force3","size":10,"a":"end"}]}
---
Velocità di fuga e flusso ricevuto, in unità del flusso terrestre, per alcuni corpi del sistema solare e per i pianeti di TRAPPIST-1, in scala logaritmica. I cerchi pieni indicano i corpi con un'atmosfera, quelli vuoti i corpi senza atmosfera; i quadrati i pianeti di TRAPPIST-1, per i quali la risposta si sta cercando.
:::

Per i pianeti delle nane rosse il flusso da considerare è quello di alta energia, che per un dato flusso totale è molto più grande che attorno al Sole; la linea si sposta quindi a sfavore dei pianeti delle nane rosse. La domanda decisiva è osservativa: questi pianeti hanno un'atmosfera?

Il telescopio James Webb ha cominciato a rispondere misurando la radiazione infrarossa emessa dall'emisfero diurno dei pianeti, durante l'eclisse secondaria, quando il pianeta passa dietro la stella. Un pianeta senza atmosfera e scuro irraggia dal suo emisfero illuminato tutta l'energia che assorbe, e il suo emisfero diurno è caldissimo. Un'atmosfera trasporta calore verso l'emisfero notturno e, se contiene anidride carbonica, assorbe a $15$ micrometri: in entrambi i casi l'emisfero diurno appare più freddo.

Nel 2023 Thomas Greene e collaboratori misurarono per TRAPPIST-1b, il pianeta più interno, una temperatura di brillanza dell'emisfero diurno di $503\pm27$ K a $15$ micrometri, praticamente uguale ai circa $508$ K attesi per una roccia nuda e scura. Nello stesso anno Sebastian Zieba e collaboratori misurarono per TRAPPIST-1c $380\pm31$ K, un valore che esclude un'atmosfera densa di anidride carbonica come quella di Venere (figura 6). Già nel 2019 Laura Kreidberg e collaboratori avevano trovato con il telescopio Spitzer che il pianeta roccioso caldo LHS 3844b, attorno a un'altra nana rossa, è con ogni probabilità privo di atmosfera. Per TRAPPIST-1e, nella zona abitabile, le prime osservazioni di JWST pubblicate nel 2025 da Néstor Espinoza, Ana Glidden e collaboratori hanno escluso un'atmosfera primordiale dominata dall'idrogeno, lasciando aperta la possibilità di un'atmosfera secondaria; l'analisi è complicata dai brillamenti e dalle macchie della stella, che alterano lo spettro.

::: figura jwst
{"w":640,"h":285,"items":[{"t":"axes","o":[90,250],"x":[520,""],"y":[225,"temperatura dell'emisfero diurno, K"],"sx":1,"sy":0.4,"xt":[],"yt":[[100,"300"],[200,"400"],[300,"500"],[400,"600"]]},{"t":"line","p":[150,126.8,300,126.8],"c":"force4","w":2,"dash":true},{"t":"line","p":[150,170.8,300,170.8],"c":"force2","w":2,"dash":true},{"t":"line","p":[225,139.6,225,118.0],"c":"force","w":2},{"t":"circle","p":[225,128.8,6],"c":"force"},{"t":"text","p":[225,268.0],"s":"TRAPPIST-1b","c":"ax","size":12},{"t":"line","p":[370,156.4,520,156.4],"c":"force4","w":2,"dash":true},{"t":"line","p":[370,194.0,520,194.0],"c":"force2","w":2,"dash":true},{"t":"line","p":[445,190.4,445,165.6],"c":"force","w":2},{"t":"circle","p":[445,178.0,6],"c":"force"},{"t":"text","p":[445,268.0],"s":"TRAPPIST-1c","c":"ax","size":12},{"t":"line","p":[470,40,494,40],"c":"force4","w":2,"dash":true},{"t":"text","p":[500,44],"s":"roccia nuda e scura","c":"ax","size":10,"a":"start"},{"t":"line","p":[470,58,494,58],"c":"force2","w":2,"dash":true},{"t":"text","p":[500,62],"s":"calore ridistribuito","c":"ax","size":10,"a":"start"},{"t":"circle","p":[482,76,5],"c":"force"},{"t":"text","p":[500,80],"s":"misura JWST","c":"ax","size":10,"a":"start"}]}
---
Temperatura dell'emisfero diurno di TRAPPIST-1b e TRAPPIST-1c misurata da JWST a $15$ micrometri, con le barre d'errore, confrontata con due casi limite calcolati: roccia nuda e scura che irraggia solo dall'emisfero illuminato, e pianeta che ridistribuisce il calore su tutta la superficie.
:::

## Vantaggi e svantaggi {#bilancio}

Il bilancio sull'abitabilità attorno alle nane rosse è ancora aperto. Fra i vantaggi ci sono il numero, perché sono le stelle più comuni; la durata, perché vivono migliaia di miliardi di anni; la frequenza dei pianeti piccoli, in media più di due per stella; e la facilità di osservazione. Fra gli svantaggi ci sono la rotazione sincrona, l'attività intensa e prolungata, la giovinezza troppo luminosa e la luce povera di fotoni utili alla fotosintesi ossigenica, discussa nel capitolo [Fotosintesi e luce di altre stelle](unit:biology-20).

Le nane rosse non formano una classe uniforme. Quelle di massa intermedia, intorno a metà della massa solare, sono meno attive, con zone abitabili più lontane e pianeti meno esposti; le più piccole, come TRAPPIST-1, sono le più attive e le più longeve. È possibile che la risposta sia diversa per le une e per le altre, e che dipenda dalla storia di ciascun pianeta. Le osservazioni dei prossimi anni, con JWST e con i grandi telescopi terrestri in costruzione, come l'ELT europeo di $39$ metri in Cile, diranno se almeno alcuni pianeti delle nane rosse hanno atmosfere e, forse, se in quelle atmosfere ci sono tracce di vita.

## Un'esperienza: la sedia e la Luna {#esperienza}

La rotazione sincrona è più facile da capire con il corpo che con le formule. Bastano una sedia, una stanza con un oggetto riconoscibile su una parete e un compagno che osservi.

::: metodo Girare attorno a una sedia
**Materiale.** Una sedia al centro della stanza, un foglio con una freccia disegnata, del nastro adesivo.

**Procedura.** Si attacca il foglio sul petto, con la freccia rivolta in avanti. Prima prova: si cammina in cerchio attorno alla sedia tenendo il viso sempre rivolto verso di essa, come la Luna con la Terra o un pianeta sincrono con la sua stella, e si conta quante volte, durante un giro completo, la freccia punta verso la parete con l'oggetto riconoscibile. Seconda prova: si cammina in cerchio tenendo il viso sempre rivolto verso la stessa parete, come farebbe un pianeta che non ruota affatto rispetto alle stelle lontane. Il compagno, seduto sulla sedia, annota quali parti del corpo vede durante ciascun giro.

**Analisi.** Nella prima prova la freccia ha puntato verso la parete una volta: chi cammina ha compiuto una rotazione completa rispetto alla stanza, ma la sedia ha visto sempre lo stesso lato. Nella seconda prova la rotazione rispetto alla stanza è nulla, e la sedia ha visto tutti i lati. Che cosa vedrebbe un abitante di ciascuno dei due pianeti, guardando la stella nel cielo? Quante volte sorgerebbe la stella in un'orbita?
:::

L'esperienza chiarisce un punto che confonde spesso: un pianeta sincrono ruota su se stesso, una volta per orbita. È la sua stella a restare ferma nel suo cielo, perché la rotazione e la rivoluzione si compensano esattamente.

## Errori frequenti {#errori}

::: errore Dire che un pianeta in rotazione sincrona non ruota
Il pianeta ruota su se stesso una volta per orbita, come la Luna. Per questo mostra alla stella sempre la stessa faccia, e la stella resta ferma nel suo cielo.
:::

::: errore Credere che le nane rosse siano stelle vecchie o morenti
Il colore rosso dipende dalla bassa temperatura superficiale, fissata dalla piccola massa. Le nane rosse sono stelle di sequenza principale che bruciano idrogeno come il Sole, e vivono molto più a lungo; nessuna ha ancora finito il suo idrogeno.
:::

::: errore Pensare che nella zona abitabile di una nana rossa le condizioni siano come sulla Terra
Il flusso totale può essere simile, ma la luce è più rossa, la radiazione di alta energia molto più intensa, i brillamenti frequenti, e la rotazione probabilmente sincrona. Un pianeta in quella posizione è un mondo molto diverso dal nostro.
:::

::: errore Considerare abitabile ogni pianeta di massa terrestre nella zona abitabile
Senza atmosfera non c'è acqua liquida in superficie. Le misure di JWST su TRAPPIST-1b e TRAPPIST-1c indicano che questi pianeti, più vicini alla stella della zona abitabile, sono rocce nude o hanno al più atmosfere sottili.
:::

::: errore Credere che la scoperta di molti pianeti attorno alle nane rosse dimostri che sono più comuni che altrove
Una parte dell'effetto dipende dalla facilità di scoperta: transiti più profondi e frequenti e oscillazioni più ampie. Le stime di frequenza correggono per questi effetti di selezione con simulazioni della sensibilità degli strumenti.
:::

## Sintesi {#sintesi}

::: sintesi In breve
- Le nane rosse sono stelle di sequenza principale fra circa $0{,}08$ e $0{,}6$ masse solari, fredde, poco luminose e molto longeve; sono circa tre stelle su quattro vicino al Sole.
- La loro zona abitabile è a pochi centesimi di unità astronomica, e i pianeti che vi orbitano hanno periodi di pochi giorni: $P=365{,}25\sqrt{a^3/M}$ giorni.
- I pianeti vicini alla stella transitano più spesso e oscurano una frazione maggiore della luce, e producono oscillazioni più ampie: sono più facili da scoprire e da studiare.
- Il tempo per raggiungere la rotazione sincrona cresce come $a^6/M^2$; i pianeti nella zona abitabile delle nane rosse sono probabilmente sincroni o in risonanza.
- Un'atmosfera moderatamente densa trasporta calore verso l'emisfero notturno; le nubi sopra il punto substellare riflettono la luce e allargano la zona abitabile.
- Brillamenti, raggi X e ultravioletto estremo sono molto più intensi che attorno al Sole e possono erodere le atmosfere e distruggere lo strato di ozono.
- La giovinezza luminosa delle nane rosse può aver fatto perdere acqua ai pianeti e accumulare ossigeno senza vita.
- JWST ha misurato emisferi diurni caldi su TRAPPIST-1b e TRAPPIST-1c, compatibili con rocce nude o atmosfere sottili, e ha escluso un'atmosfera di idrogeno su TRAPPIST-1e.
:::

## Glossario {#glossario}

- **Brillamento**: rilascio improvviso di energia magnetica nell'atmosfera di una stella, con forte aumento di ultravioletto e raggi X.
- **Costa cosmica**: linea che separa, in un grafico di velocità di fuga e flusso ricevuto, i corpi con atmosfera da quelli senza.
- **Eclisse secondaria**: passaggio del pianeta dietro la stella, che permette di misurarne l'emissione per differenza.
- **Nana rossa**: stella di sequenza principale di tipo spettrale M, con massa fra circa $0{,}08$ e $0{,}6$ masse solari.
- **Presequenza principale**: fase in cui una stella giovane si contrae prima di accendere stabilmente la fusione dell'idrogeno.
- **Punto substellare**: punto della superficie di un pianeta in cui la stella è allo zenit.
- **Risonanza spin-orbita**: rapporto semplice fra il periodo di rotazione e quello orbitale, come il $3:2$ di Mercurio.
- **Rotazione sincrona**: rotazione con periodo uguale a quello orbitale, che mantiene la stessa faccia rivolta alla stella.
- **Superbrillamento**: brillamento di energia eccezionalmente grande.
- **Temperatura di brillanza**: temperatura di un corpo nero che emetterebbe la stessa radiazione osservata a una data lunghezza d'onda.
- **Terminatore**: linea che separa l'emisfero illuminato da quello al buio.
- **Transito**: passaggio del pianeta davanti alla stella, che ne oscura una piccola frazione della luce.

## Esercizi {#esercizi}

::: esercizio Il periodo di Proxima b [base]
Calcolare con la terza legge di Keplero il periodo di Proxima b, a $0{,}0485$ UA da una stella di $0{,}122$ masse solari.
>>> soluzione
$P=365{,}25\sqrt{0{,}0485^3/0{,}122}$ giorni, circa $11{,}2$ giorni, in accordo con il periodo misurato.
:::

::: esercizio Quadruplicare il semiasse [base]
Se il semiasse maggiore di un'orbita quadruplica a massa della stella fissata, come cambia il periodo? E il flusso ricevuto?
>>> soluzione
Il periodo cresce di $4^{3/2}=8$ volte; il flusso si riduce di $4^2=16$ volte.
:::

::: esercizio La zona abitabile di Proxima Centauri [base]
Proxima Centauri ha luminosità $0{,}00155$ volte quella del Sole. Calcolare i bordi della zona abitabile con i flussi efficaci $1{,}01$ e $0{,}344$ del Sole, e verificare che Proxima b, a $0{,}0485$ UA, vi si trova.
>>> soluzione
$\sqrt{0{,}00155/1{,}01}\approx0{,}039$ UA e $\sqrt{0{,}00155/0{,}344}\approx0{,}067$ UA. Proxima b è fra i due bordi.
:::

::: esercizio La probabilità di transito [base]
La probabilità che un pianeta transiti è circa il rapporto fra il raggio della stella e il semiasse maggiore. Calcolarla per la Terra, con il raggio solare di $0{,}00465$ UA, e per TRAPPIST-1e, con raggio della stella $0{,}119$ raggi solari e semiasse $0{,}0293$ UA.
>>> soluzione
Per la Terra $0{,}00465/1$, cioè lo $0{,}465\%$; per TRAPPIST-1e $0{,}119\cdot0{,}00465/0{,}0293\approx1{,}9\%$, quattro volte di più.
:::

::: esercizio La profondità del transito [base]
La frazione di luce oscurata in un transito è $(R_p/R_\star)^2$. Calcolarla per un pianeta grande come la Terra, di $6371$ km di raggio, davanti al Sole, di $695\,700$ km, e davanti a TRAPPIST-1, di $0{,}119$ raggi solari.
>>> soluzione
Davanti al Sole $(6371/695\,700)^2\approx8{,}4\cdot10^{-5}$, cioè lo $0{,}008\%$; davanti a TRAPPIST-1 circa $(6371/82\,800)^2\approx0{,}6\%$, settanta volte di più. Un pianeta di $0{,}92$ raggi terrestri, come TRAPPIST-1e, oscura circa lo $0{,}5\%$.
:::

::: esercizio L'energia di un superbrillamento [base]
Il superbrillamento di Proxima Centauri del 2016 liberò circa $3\cdot10^{26}$ J. La luminosità della stella è $0{,}00155$ volte quella solare, $3{,}83\cdot10^{26}$ W. Per quanto tempo la stella dovrebbe brillare normalmente per emettere la stessa energia?
>>> soluzione
La luminosità è circa $5{,}9\cdot10^{23}$ W, e $3\cdot10^{26}/5{,}9\cdot10^{23}\approx510$ s, circa otto minuti e mezzo. In pochi minuti il brillamento ha liberato l'energia di più di otto minuti di luce dell'intera stella, concentrata nell'ultravioletto e nei raggi X.
:::

::: esercizio I periodi di TRAPPIST-1 [medio]
TRAPPIST-1 ha $0{,}0898$ masse solari. Calcolare i periodi di TRAPPIST-1e, a $0{,}02925$ UA, e di TRAPPIST-1h, a $0{,}06189$ UA, e il loro rapporto.
>>> soluzione
$P_e\approx6{,}10$ giorni e $P_h\approx18{,}8$ giorni; il rapporto è $(0{,}06189/0{,}02925)^{3/2}\approx3{,}08$. I periodi misurati sono $6{,}10$ e $18{,}77$ giorni.
:::

::: esercizio Tempi di sincronizzazione [medio]
Con la proporzionalità del tempo di sincronizzazione ad $a^6/M^2$, calcolare il rapporto fra i tempi di Proxima b e di TRAPPIST-1e e quello di un pianeta uguale alla Terra a $1$ UA dal Sole.
>>> soluzione
Per Proxima b $0{,}0485^6/0{,}122^2\approx8{,}7\cdot10^{-7}$; per TRAPPIST-1e $0{,}02925^6/0{,}0898^2\approx7{,}8\cdot10^{-8}$. I tempi sono uno e dieci milioni di volte più brevi.
:::

::: esercizio Velocità radiale [medio]
La semiampiezza della velocità radiale prodotta da un pianeta su orbita circolare vale circa $0{,}0894$ m/s moltiplicato per $(M_p/M_\oplus)(M/M_\odot)^{-2/3}(P/\text{1 anno})^{-1/3}$. Calcolarla per la Terra attorno al Sole e per un pianeta di massa terrestre con il periodo di Proxima b attorno a Proxima Centauri.
>>> soluzione
Per la Terra $0{,}089$ m/s. Per il pianeta di Proxima

$$\begin{aligned}K&\approx0{,}0894\cdot0{,}122^{-2/3}\\&\quad\cdot\left(\frac{11{,}2}{365{,}25}\right)^{-1/3}\ \mathrm{m/s}\\&\approx0{,}0894\cdot4{,}07\cdot3{,}19\ \mathrm{m/s}\\&\approx1{,}16\ \mathrm{m/s},\end{aligned}$$

circa tredici volte di più. Proxima b, con una massa minima di poco più di una massa terrestre, produce un segnale di poco più di un metro al secondo, misurabile con gli spettrografi moderni.
:::

::: esercizio Rocce nude e calde [medio]
La temperatura dell'emisfero diurno di una roccia nuda e scura che irraggia solo dall'emisfero illuminato vale $T_\star\sqrt{R_\star/a}\,(2/3)^{1/4}$. Calcolarla per TRAPPIST-1b, con $T_\star=2566$ K, $R_\star=0{,}119$ raggi solari, cioè $8{,}29\cdot10^7$ m, e $a=0{,}01154$ UA, cioè $1{,}73\cdot10^9$ m, e confrontarla con la misura di JWST, $503\pm27$ K.
>>> soluzione
$\sqrt{R_\star/a}\approx0{,}219$, quindi $2566\cdot0{,}219\cdot0{,}904\approx508$ K, in ottimo accordo con la misura. Un'atmosfera che trasporta calore sull'emisfero notturno ridurrebbe la temperatura dell'emisfero diurno, fino a circa $398$ K se il calore fosse ridistribuito uniformemente.
:::

::: esercizio La frazione di alta energia [medio]
Proxima b riceve in totale circa $0{,}66$ volte il flusso terrestre, cioè circa $900$ W/m$^2$, e circa $0{,}29$ W/m$^2$ in raggi X e ultravioletto estremo, quasi sessanta volte la Terra. Calcolare per i due pianeti la frazione del flusso totale che arriva come radiazione di alta energia.
>>> soluzione
Per Proxima b $0{,}29/900\approx3\cdot10^{-4}$. La Terra riceve circa $0{,}29/60\approx0{,}005$ W/m$^2$ su $1361$, cioè circa $4\cdot10^{-6}$. La frazione è quasi cento volte più grande attorno a Proxima Centauri.
:::

::: esercizio Una stella che non muore [medio]
Con la stima $t\approx10\ \text{miliardi di anni}\cdot(M/L)$, in unità solari, calcolare la vita di Proxima Centauri sulla sequenza principale. Perché la stima reale è ancora più lunga?
>>> soluzione
$10\cdot0{,}122/0{,}00155\approx790$ miliardi di anni, quasi sessanta volte l'età dell'universo. La stima reale è più lunga perché una nana rossa completamente convettiva brucia quasi tutto il suo idrogeno, mentre il Sole ne consuma solo la parte nel nucleo.
:::

::: esercizio Ridistribuire il calore [avanzato]
L'emisfero diurno di un pianeta senza atmosfera ha temperatura proporzionale a $(2/3)^{1/4}$, un pianeta che ridistribuisce il calore uniformemente a $(1/4)^{1/4}$. Calcolare il rapporto fra le due temperature e verificarlo con i valori di TRAPPIST-1b, $508$ e $398$ K, e di TRAPPIST-1c, $434$ e $340$ K. Che cosa indica la misura di TRAPPIST-1c, $380\pm31$ K?
>>> soluzione
Il rapporto è $(8/3)^{1/4}\approx1{,}28$, e infatti $508/398\approx434/340\approx1{,}28$. La misura di TRAPPIST-1c cade fra i due casi: esclude un'atmosfera densa che porterebbe la temperatura ai valori più bassi, mentre è compatibile con una roccia nuda o con un'atmosfera sottile.
:::

::: esercizio La costa cosmica [avanzato]
Calcolare la velocità di fuga di TRAPPIST-1b, con $1{,}374$ masse e $1{,}116$ raggi terrestri, e di TRAPPIST-1e, con $0{,}692$ masse e $0{,}920$ raggi, usando $v=11{,}2\sqrt{M/R}$ km/s in unità terrestri. Se lungo la costa cosmica il flusso tollerabile cresce come la quarta potenza della velocità di fuga, di quante volte un corpo con velocità di fuga doppia può ricevere più flusso restando dalla parte dei corpi con atmosfera?
>>> soluzione
Si ottiene circa $12{,}4$ km/s per TRAPPIST-1b e $9{,}7$ km/s per TRAPPIST-1e. Con flusso proporzionale a $v^4$, una velocità di fuga doppia tollera un flusso $2^4=16$ volte più grande. Per le nane rosse il flusso da usare è quello di alta energia, molto più alto in proporzione, e la posizione della linea è incerta.
:::

::: esercizio Quanta acqua perde Proxima b [avanzato]
Nella fuga limitata dall'energia la perdita di massa vale circa $\dot M=\varepsilon\pi F_\text{XUV}R^3/(GM)$, dove $\varepsilon$ è l'efficienza. Calcolarla per un pianeta di massa e raggio terrestri con $F_\text{XUV}=0{,}29$ W/m$^2$ ed $\varepsilon=0{,}1$, e stimare la massa persa in un miliardo di anni, confrontandola con la massa degli oceani terrestri, $1{,}4\cdot10^{21}$ kg.
>>> soluzione
Con i valori dati

$$\begin{aligned}\dot M&\approx\frac{0{,}1\cdot\pi\cdot0{,}29\cdot(6{,}37\cdot10^6)^3}{6{,}67\cdot10^{-11}\cdot5{,}97\cdot10^{24}}\ \mathrm{kg/s}\\&\approx6\cdot10^4\ \mathrm{kg/s}.\end{aligned}$$

In un miliardo di anni, $3{,}16\cdot10^{16}$ s, la massa persa è circa $1{,}9\cdot10^{21}$ kg, più di un oceano terrestre. Nella giovinezza della stella la radiazione era più intensa, e la perdita maggiore; la stima dipende molto dall'efficienza e dalla composizione dell'atmosfera.
:::

::: esercizio Il giorno su un pianeta in risonanza [avanzato]
Un pianeta in risonanza $3:2$ ruota con periodo $2P/3$, dove $P$ è il periodo orbitale. Mostrare che il giorno solare, l'intervallo fra due mezzogiorni, dura $2P$, e calcolarlo per un pianeta con il periodo di Proxima b. Quanto dura il giorno solare di un pianeta sincrono?
>>> soluzione
Il giorno solare è $T=P_\text{rot}P/(P-P_\text{rot})$; con $P_\text{rot}=2P/3$ si ottiene $T=(2P^2/3)/(P/3)=2P$. Per $P=11{,}2$ giorni, il giorno solare dura circa $22{,}4$ giorni, con undici giorni di luce e undici di buio. Per un pianeta sincrono $P_\text{rot}=P$ e il denominatore si annulla: il giorno solare è infinito, e la stella non tramonta mai.
:::

## Fonti {#fonti}

Il testo, le figure, gli esempi e gli esercizi di questo capitolo sono originali. Per la scelta e l'ordine degli argomenti i riferimenti principali sono A. M. Shaw, *Astrochemistry: From Astronomy to Astrobiology*, Wiley, 2006, §4.1-4.3 (classi di stelle, diagramma di Hertzsprung e Russell, evoluzione stellare) e §7.7-7.8 (zona abitabile ed esopianeti); il libro precede la scoperta dei pianeti terrestri attorno alle nane rosse, e i dati osservativi provengono dalle fonti primarie seguenti. Shaw descrive le stelle di classe M come stelle più vecchie e la sequenza delle classi spettrali come una sequenza evolutiva, mentre la classe spettrale dipende dalla temperatura fissata dalla massa; colloca inoltre nel XIX secolo il diagramma di Hertzsprung e Russell, costruito fra il 1911 e il 1913.

1. G. Laughlin, P. Bodenheimer, F. C. Adams, *The Astrophysical Journal* 482, 420 (1997): la vita delle nane rosse sulla sequenza principale.
2. G. Anglada-Escudé e collaboratori, *Nature* 536, 437 (2016): la scoperta di Proxima b.
3. M. Gillon e collaboratori, *Nature* 542, 456 (2017); E. Agol e collaboratori, *The Planetary Science Journal* 2, 1 (2021): il sistema di TRAPPIST-1.
4. C. D. Dressing, D. Charbonneau, *The Astrophysical Journal* 807, 45 (2015): la frequenza dei pianeti attorno alle nane rosse.
5. B. Gladman e collaboratori, *Icarus* 122, 166 (1996): i tempi di sincronizzazione mareale.
6. M. M. Joshi, R. M. Haberle, R. T. Reynolds, *Icarus* 129, 450 (1997): le atmosfere dei pianeti in rotazione sincrona; R. T. Pierrehumbert, *The Astrophysical Journal Letters* 726, L8 (2011): i climi a occhio.
7. I. Ribas e collaboratori, *Astronomy & Astrophysics* 596, A111 (2016): irraggiamento, rotazione e acqua di Proxima b; I. Ribas e collaboratori, *Astronomy & Astrophysics* 603, A58 (2017): lo spettro completo di Proxima Centauri.
8. W. S. Howard e collaboratori, *The Astrophysical Journal Letters* 860, L30 (2018): il superbrillamento di Proxima Centauri.
9. R. Luger, R. Barnes, *Astrobiology* 15, 119 (2015): perdita d'acqua e ossigeno abiotico nella presequenza principale.
10. K. J. Zahnle, D. C. Catling, *The Astrophysical Journal* 843, 122 (2017): la costa cosmica.
11. L. Kreidberg e collaboratori, *Nature* 573, 87 (2019): LHS 3844b senza atmosfera.
12. T. P. Greene e collaboratori, *Nature* 618, 39 (2023): l'emissione termica di TRAPPIST-1b; S. Zieba e collaboratori, *Nature* 620, 746 (2023): TRAPPIST-1c senza un'atmosfera densa di anidride carbonica.
13. N. Espinoza e collaboratori, A. Glidden e collaboratori, *The Astrophysical Journal Letters* (2025): lo spettro di trasmissione di TRAPPIST-1e.
