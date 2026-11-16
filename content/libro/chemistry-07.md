---
unit: chemistry-07
titolo: Legame covalente ed energia di legame
sottotitolo: Coppie condivise, legami multipli, polarità e orbitali molecolari
volume: Volume di chimica
fonte: Testo originale; riferimento principale Petrucci et al., General Chemistry, 11ª ed., §10-2–10-6, 10-8, 10-9, 11-2, 11-5
---

## Prima di cominciare {#apertura}

Nell'atmosfera del pianeta vulcanico la stazione rileva molecole di idrogeno, $\mathrm{H_2}$. Due atomi uguali non possono scambiarsi elettroni come fanno sodio e cloro, perché nessuno dei due li attira più dell'altro. Eppure restano uniti, e per separarli servono $432\un{kJ}$ per mole di molecole. Il legame che li tiene insieme è il **legame covalente**: i due atomi mettono in comune una coppia di elettroni, e ciascuno dei due nuclei è attratto dalla coppia condivisa.

Il legame covalente è il legame della chimica del carbonio, dell'aria, dell'acqua, delle molecole della vita. Questo capitolo ne descrive prima la rappresentazione più semplice e più usata, le strutture di Lewis, e le grandezze misurabili che lo caratterizzano: lunghezza, energia, polarità. Poi ne mostra l'origine quantistica, nella sovrapposizione degli orbitali atomici e negli orbitali molecolari, che spiegano anche fatti inaccessibili alle strutture di Lewis, come il magnetismo dell'ossigeno liquido.

::: obiettivi
- descrivere la curva di energia di una molecola biatomica e distinguere lunghezza di legame, energia di dissociazione ed energia di punto zero;
- scrivere strutture di Lewis di molecole e ioni, con legami multipli, cariche formali e strutture di risonanza;
- riconoscere le eccezioni alla regola dell'ottetto;
- collegare ordine di legame, lunghezza ed energia di legame;
- stimare le cariche parziali di un legame polare dal momento dipolare;
- descrivere il legame con la sovrapposizione degli orbitali e con gli orbitali molecolari, e calcolare l'ordine di legame;
- usare le energie di legame per stimare l'entalpia delle reazioni in fase gassosa.
:::

Il capitolo presuppone i simboli di Lewis e la differenza di elettronegatività del capitolo [Legame ionico e interazioni elettrostatiche](unit:chemistry-06) e gli orbitali atomici di [Livelli atomici e spettri](unit:chemistry-04). Le entalpie di legame sono state introdotte dal punto di vista termochimico in [Termochimica e calorimetria](unit:chemistry-16). La forma tridimensionale delle molecole è l'argomento del capitolo successivo, [Geometria molecolare e VSEPR](unit:chemistry-08).

## Due atomi che restano uniti {#condivisione}

Si immagini di avvicinare lentamente due atomi di idrogeno, partendo da una grande distanza. Finché sono lontani non interagiscono, e l'energia del sistema è la somma delle energie dei due atomi, che si prende come zero. Quando le loro nubi elettroniche cominciano a sovrapporsi, ciascun elettrone viene attratto anche dal nucleo dell'altro atomo, e la densità elettronica si accumula nella regione fra i due nuclei. L'energia diminuisce. A distanze ancora minori prevale la repulsione fra i due protoni, e l'energia risale bruscamente.

::: figura h2
{"w":640,"h":282,"items":[{"t":"line","p":[70,40,620,40],"c":"ax","w":1.2},{"t":"arrow","p":[70,250,70,18],"c":"ax","w":1.6,"head":9},{"t":"text","p":[78,24],"s":"energia (kJ/mol)","c":"ax","size":13,"a":"start"},{"t":"text","p":[618,62],"s":"distanza fra i nuclei (pm)","c":"ax","size":13,"a":"end"},{"t":"line","p":[235.0,36,235.0,44],"c":"ax","w":1.2},{"t":"text","p":[235.0,30],"s":"100","c":"muted","size":11},{"t":"line","p":[400.0,36,400.0,44],"c":"ax","w":1.2},{"t":"text","p":[400.0,30],"s":"200","c":"muted","size":11},{"t":"line","p":[565.0,36,565.0,44],"c":"ax","w":1.2},{"t":"text","p":[565.0,30],"s":"300","c":"muted","size":11},{"t":"line","p":[66,124.0,74,124.0],"c":"ax","w":1.2},{"t":"text","p":[62,128.0],"s":"−200","c":"muted","size":11,"a":"end"},{"t":"line","p":[66,208.0,74,208.0],"c":"ax","w":1.2},{"t":"text","p":[62,212.0],"s":"−400","c":"muted","size":11,"a":"end"},{"t":"plot","o":[70,40],"sx":1.65,"sy":0.42,"pts":[[37.5,36.2958589],[38.0,17.7003755],[38.5,-0.3639092],[39.0,-17.9088986],[39.5,-34.9462507],[40.0,-51.4873828],[40.5,-67.5434767],[41.0,-83.1254829],[41.5,-98.2441257],[42.0,-112.9099074],[42.5,-127.1331126],[43.0,-140.923813],[43.5,-154.2918713],[44.0,-167.2469453],[44.5,-179.7984923],[45.0,-191.9557728],[45.5,-203.7278547],[46.0,-215.123617],[46.5,-226.1517534],[47.0,-236.8207764],[47.5,-247.1390208],[48.0,-257.1146468],[48.5,-266.7556443],[49.0,-276.0698356],[49.5,-285.0648791],[50.0,-293.7482725],[50.5,-302.1273563],[51.0,-310.2093163],[51.5,-318.0011874],[52.0,-325.5098561],[52.5,-332.742064],[53.0,-339.7044102],[53.5,-346.4033545],[54.0,-352.8452199],[54.5,-359.0361959],[55.0,-364.9823405],[55.5,-370.6895833],[56.0,-376.163728],[56.5,-381.4104549],[57.0,-386.4353233],[57.5,-391.2437742],[58.0,-395.8411323],[58.5,-400.2326088],[59.0,-404.4233034],[59.5,-408.4182065],[60.0,-412.2222017],[60.5,-415.8400676],[61.0,-419.2764803],[61.5,-422.5360152],[62.0,-425.6231491],[62.5,-428.5422624],[63.0,-431.2976408],[63.5,-433.8934773],[64.0,-436.333874],[64.5,-438.6228442],[65.0,-440.7643141],[65.5,-442.7621243],[66.0,-444.6200319],[66.5,-446.3417122],[67.0,-447.9307601],[67.5,-449.3906917],[68.0,-450.7249464],[68.5,-451.936888],[69.0,-453.0298065],[69.5,-454.0069193],[70.0,-454.8713731],[70.5,-455.626245],[71.0,-456.2745442],[71.5,-456.8192132],[72.0,-457.2631291],[72.5,-457.6091053],[73.0,-457.8598924],[73.5,-458.0181797],[74.0,-458.0865966],[74.5,-458.0677134],[75.0,-457.9640429],[75.5,-457.7780416],[76.0,-457.5121105],[76.5,-457.1685967],[77.0,-456.7497941],[77.5,-456.2579447],[78.0,-455.6952399],[78.5,-455.063821],[79.0,-454.3657807],[79.5,-453.603164],[80.0,-452.7779691],[80.5,-451.8921485],[81.0,-450.9476096],[81.5,-449.9462163],[82.0,-448.8897892],[82.5,-447.780107],[83.0,-446.6189072],[83.5,-445.4078868],[84.0,-444.1487034],[84.5,-442.842976],[85.0,-441.4922857],[85.5,-440.0981764],[86.0,-438.6621558],[86.5,-437.1856961],[87.0,-435.6702347],[87.5,-434.1171749],[88.0,-432.5278868],[88.5,-430.9037078],[89.0,-429.2459432],[89.5,-427.5558672],[90.0,-425.8347235],[90.5,-424.0837255],[91.0,-422.3040577],[91.5,-420.4968756],[92.0,-418.6633066],[92.5,-416.8044509],[93.0,-414.9213815],[93.5,-413.0151451],[94.0,-411.0867628],[94.5,-409.1372303],[95.0,-407.1675187],[95.5,-405.178575],[96.0,-403.1713225],[96.5,-401.1466613],[97.0,-399.1054689],[97.5,-397.0486009],[98.0,-394.9768908],[98.5,-392.8911513],[99.0,-390.7921741],[99.5,-388.6807307],[100.0,-386.5575727],[100.5,-384.4234325],[101.0,-382.2790232],[101.5,-380.1250394],[102.0,-377.9621576],[102.5,-375.7910365],[103.0,-373.6123173],[103.5,-371.4266242],[104.0,-369.234565],[104.5,-367.0367309],[105.0,-364.8336973],[105.5,-362.626024],[106.0,-360.4142557],[106.5,-358.1989222],[107.0,-355.9805384],[107.5,-353.7596054],[108.0,-351.5366102],[108.5,-349.3120261],[109.0,-347.0863132],[109.5,-344.8599186],[110.0,-342.6332765],[110.5,-340.406809],[111.0,-338.1809257],[111.5,-335.9560245],[112.0,-333.7324916],[112.5,-331.5107018],[113.0,-329.2910191],[113.5,-327.0737962],[114.0,-324.8593756],[114.5,-322.6480891],[115.0,-320.4402586],[115.5,-318.2361961],[116.0,-316.0362038],[116.5,-313.8405746],[117.0,-311.6495921],[117.5,-309.4635308],[118.0,-307.2826565],[118.5,-305.1072263],[119.0,-302.9374892],[119.5,-300.7736855],[120.0,-298.6160478],[120.5,-296.4648008],[121.0,-294.3201617],[121.5,-292.1823398],[122.0,-290.0515376],[122.5,-287.9279502],[123.0,-285.8117658],[123.5,-283.7031659],[124.0,-281.6023251],[124.5,-279.5094119],[125.0,-277.4245883],[125.5,-275.34801],[126.0,-273.279827],[126.5,-271.2201832],[127.0,-269.1692168],[127.5,-267.1270605],[128.0,-265.0938414],[128.5,-263.0696814],[129.0,-261.0546973],[129.5,-259.0490005],[130.0,-257.0526978],[130.5,-255.0658911],[131.0,-253.0886774],[131.5,-251.1211495],[132.0,-249.1633953],[132.5,-247.2154988],[133.0,-245.2775393],[133.5,-243.3495923],[134.0,-241.4317291],[134.5,-239.5240171],[135.0,-237.62652],[135.5,-235.7392976],[136.0,-233.8624061],[136.5,-231.9958982],[137.0,-230.1398232],[137.5,-228.2942269],[138.0,-226.4591519],[138.5,-224.6346378],[139.0,-222.8207207],[139.5,-221.017434],[140.0,-219.224808],[140.5,-217.4428703],[141.0,-215.6716457],[141.5,-213.911156],[142.0,-212.1614208],[142.5,-210.4224568],[143.0,-208.6942783],[143.5,-206.9768974],[144.0,-205.2703235],[144.5,-203.5745639],[145.0,-201.8896237],[145.5,-200.2155058],[146.0,-198.5522109],[146.5,-196.8997379],[147.0,-195.2580834],[147.5,-193.6272424],[148.0,-192.0072077],[148.5,-190.3979707],[149.0,-188.7995206],[149.5,-187.2118453],[150.0,-185.6349307],[150.5,-184.0687614],[151.0,-182.5133202],[151.5,-180.9685884],[152.0,-179.4345461],[152.5,-177.9111718],[153.0,-176.3984425],[153.5,-174.8963342],[154.0,-173.4048213],[154.5,-171.9238771],[155.0,-170.4534738],[155.5,-168.9935823],[156.0,-167.5441723],[156.5,-166.1052127],[157.0,-164.676671],[157.5,-163.258514],[158.0,-161.8507073],[158.5,-160.4532157],[159.0,-159.066003],[159.5,-157.6890322],[160.0,-156.3222653],[160.5,-154.9656638],[161.0,-153.6191882],[161.5,-152.2827981],[162.0,-150.9564527],[162.5,-149.6401104],[163.0,-148.3337287],[163.5,-147.0372648],[164.0,-145.7506751],[164.5,-144.4739155],[165.0,-143.2069412],[165.5,-141.949707],[166.0,-140.7021672],[166.5,-139.4642754],[167.0,-138.235985],[167.5,-137.0172488],[168.0,-135.8080192],[168.5,-134.6082482],[169.0,-133.4178874],[169.5,-132.2368882],[170.0,-131.0652013],[170.5,-129.9027775],[171.0,-128.749567],[171.5,-127.6055198],[172.0,-126.4705856],[172.5,-125.3447139],[173.0,-124.227854],[173.5,-123.1199549],[174.0,-122.0209654],[174.5,-120.9308341],[175.0,-119.8495095],[175.5,-118.7769399],[176.0,-117.7130735],[176.5,-116.6578582],[177.0,-115.6112419],[177.5,-114.5731726],[178.0,-113.5435978],[178.5,-112.5224653],[179.0,-111.5097225],[179.5,-110.505317],[180.0,-109.5091962],[180.5,-108.5213076],[181.0,-107.5415986],[181.5,-106.5700165],[182.0,-105.6065088],[182.5,-104.6510229],[183.0,-103.7035061],[183.5,-102.763906],[184.0,-101.83217],[184.5,-100.9082456],[185.0,-99.9920804],[185.5,-99.0836221],[186.0,-98.1828184],[186.5,-97.289617],[187.0,-96.4039658],[187.5,-95.5258128],[188.0,-94.655106],[188.5,-93.7917936],[189.0,-92.935824],[189.5,-92.0871454],[190.0,-91.2457064],[190.5,-90.4114558],[191.0,-89.5843421],[191.5,-88.7643145],[192.0,-87.9513219],[192.5,-87.1453137],[193.0,-86.3462391],[193.5,-85.5540479],[194.0,-84.7686896],[194.5,-83.9901141],[195.0,-83.2182717],[195.5,-82.4531124],[196.0,-81.6945868],[196.5,-80.9426455],[197.0,-80.1972392],[197.5,-79.458319],[198.0,-78.7258362],[198.5,-77.9997421],[199.0,-77.2799884],[199.5,-76.5665269],[200.0,-75.8593096],[200.5,-75.1582889],[201.0,-74.4634171],[201.5,-73.774647],[202.0,-73.0919315],[202.5,-72.4152238],[203.0,-71.7444772],[203.5,-71.0796454],[204.0,-70.4206821],[204.5,-69.7675415],[205.0,-69.1201779],[205.5,-68.4785457],[206.0,-67.8425998],[206.5,-67.2122953],[207.0,-66.5875873],[207.5,-65.9684314],[208.0,-65.3547833],[208.5,-64.746599],[209.0,-64.1438348],[209.5,-63.5464472],[210.0,-62.9543929],[210.5,-62.3676289],[211.0,-61.7861125],[211.5,-61.2098011],[212.0,-60.6386524],[212.5,-60.0726246],[213.0,-59.5116758],[213.5,-58.9557645],[214.0,-58.4048496],[214.5,-57.85889],[215.0,-57.3178449],[215.5,-56.781674],[216.0,-56.250337],[216.5,-55.7237939],[217.0,-55.2020051],[217.5,-54.684931],[218.0,-54.1725325],[218.5,-53.6647706],[219.0,-53.1616067],[219.5,-52.6630023],[220.0,-52.1689193],[220.5,-51.6793197],[221.0,-51.1941658],[221.5,-50.7134203],[222.0,-50.2370461],[222.5,-49.7650061],[223.0,-49.2972637],[223.5,-48.8337826],[224.0,-48.3745266],[224.5,-47.9194598],[225.0,-47.4685466],[225.5,-47.0217516],[226.0,-46.5790396],[226.5,-46.1403758],[227.0,-45.7057254],[227.5,-45.2750542],[228.0,-44.848328],[228.5,-44.4255128],[229.0,-44.0065751],[229.5,-43.5914813],[230.0,-43.1801984],[230.5,-42.7726934],[231.0,-42.3689337],[231.5,-41.9688867],[232.0,-41.5725204],[232.5,-41.1798027],[233.0,-40.7907019],[233.5,-40.4051866],[234.0,-40.0232256],[234.5,-39.6447877],[235.0,-39.2698422],[235.5,-38.8983586],[236.0,-38.5303067],[236.5,-38.1656562],[237.0,-37.8043774],[237.5,-37.4464407],[238.0,-37.0918166],[238.5,-36.740476],[239.0,-36.3923901],[239.5,-36.04753],[240.0,-35.7058673],[240.5,-35.3673738],[241.0,-35.0320213],[241.5,-34.6997822],[242.0,-34.3706287],[242.5,-34.0445336],[243.0,-33.7214696],[243.5,-33.4014098],[244.0,-33.0843275],[244.5,-32.7701962],[245.0,-32.4589895],[245.5,-32.1506814],[246.0,-31.845246],[246.5,-31.5426576],[247.0,-31.2428908],[247.5,-30.9459202],[248.0,-30.6517209],[248.5,-30.360268],[249.0,-30.0715368],[249.5,-29.7855029],[250.0,-29.502142],[250.5,-29.2214302],[251.0,-28.9433435],[251.5,-28.6678583],[252.0,-28.3949511],[252.5,-28.1245987],[253.0,-27.856778],[253.5,-27.5914661],[254.0,-27.3286404],[254.5,-27.0682783],[255.0,-26.8103575],[255.5,-26.5548559],[256.0,-26.3017516],[256.5,-26.0510228],[257.0,-25.8026479],[257.5,-25.5566056],[258.0,-25.3128745],[258.5,-25.0714338],[259.0,-24.8322625],[259.5,-24.59534],[260.0,-24.3606457],[260.5,-24.1281593],[261.0,-23.8978608],[261.5,-23.66973],[262.0,-23.4437472],[262.5,-23.2198927],[263.0,-22.9981471],[263.5,-22.7784911],[264.0,-22.5609054],[264.5,-22.3453712],[265.0,-22.1318696],[265.5,-21.920382],[266.0,-21.7108898],[266.5,-21.5033748],[267.0,-21.2978188],[267.5,-21.0942037],[268.0,-20.8925117],[268.5,-20.6927251],[269.0,-20.4948263],[269.5,-20.2987979],[270.0,-20.1046228],[270.5,-19.9122837],[271.0,-19.7217639],[271.5,-19.5330463],[272.0,-19.3461145],[272.5,-19.1609518],[273.0,-18.977542],[273.5,-18.7958689],[274.0,-18.6159162],[274.5,-18.4376682],[275.0,-18.261109],[275.5,-18.086223],[276.0,-17.9129947],[276.5,-17.7414086],[277.0,-17.5714495],[277.5,-17.4031024],[278.0,-17.2363523],[278.5,-17.0711843],[279.0,-16.9075837],[279.5,-16.7455359],[280.0,-16.5850265],[280.5,-16.4260412],[281.0,-16.2685658],[281.5,-16.1125862],[282.0,-15.9580884],[282.5,-15.8050588],[283.0,-15.6534835],[283.5,-15.503349],[284.0,-15.3546419],[284.5,-15.2073488],[285.0,-15.0614565],[285.5,-14.916952],[286.0,-14.7738222],[286.5,-14.6320544],[287.0,-14.4916358],[287.5,-14.3525537],[288.0,-14.2147956],[288.5,-14.0783493],[289.0,-13.9432022],[289.5,-13.8093424],[290.0,-13.6767578],[290.5,-13.5454363],[291.0,-13.4153661],[291.5,-13.2865356],[292.0,-13.158933],[292.5,-13.0325468],[293.0,-12.9073657],[293.5,-12.7833783],[294.0,-12.6605734],[294.5,-12.5389398],[295.0,-12.4184666],[295.5,-12.2991429],[296.0,-12.1809578],[296.5,-12.0639007],[297.0,-11.9479609],[297.5,-11.8331278],[298.0,-11.7193912],[298.5,-11.6067406],[299.0,-11.4951658],[299.5,-11.3846567],[300.0,-11.2752032],[300.5,-11.1667954],[301.0,-11.0594235],[301.5,-10.9530776],[302.0,-10.847748],[302.5,-10.7434252],[303.0,-10.6400997],[303.5,-10.5377621],[304.0,-10.436403],[304.5,-10.3360131],[305.0,-10.2365834],[305.5,-10.1381047],[306.0,-10.0405681],[306.5,-9.9439646],[307.0,-9.8482854],[307.5,-9.7535218],[308.0,-9.6596651],[308.5,-9.5667068],[309.0,-9.4746382],[309.5,-9.3834511],[310.0,-9.293137],[310.5,-9.2036877],[311.0,-9.115095],[311.5,-9.0273507],[312.0,-8.9404469],[312.5,-8.8543755],[313.0,-8.7691286],[313.5,-8.6846986],[314.0,-8.6010775],[314.5,-8.5182577],[315.0,-8.4362316],[315.5,-8.3549918],[316.0,-8.2745306],[316.5,-8.1948408],[317.0,-8.1159149],[317.5,-8.0377458],[318.0,-7.9603262],[318.5,-7.8836491],[319.0,-7.8077073],[319.5,-7.7324939],[320.0,-7.658002],[320.5,-7.5842247],[321.0,-7.5111551],[321.5,-7.4387866],[322.0,-7.3671126],[322.5,-7.2961263],[323.0,-7.2258212],[323.5,-7.1561909],[324.0,-7.0872289],[324.5,-7.0189289],[325.0,-6.9512846],[325.5,-6.8842897],[326.0,-6.817938],[326.5,-6.7522234],[327.0,-6.6871399],[327.5,-6.6226814],[328.0,-6.5588419],[328.5,-6.4956156],[329.0,-6.4329966],[329.5,-6.3709792],[330.0,-6.3095575]],"c":"force4","w":2.4},{"t":"line","p":[162.4,221.5,238.3,221.5],"c":"force3","w":1.8},{"t":"text","p":[241.6,225.5],"s":"livello di energia più basso","c":"force3","size":11,"a":"start"},{"t":"arrow","p":[482.5,234.4,482.5,42.0],"c":"force2","w":1.6,"head":7},{"t":"text","p":[488.5,136.6],"s":"Dₑ = 458 kJ/mol","c":"force2","size":12,"a":"start"},{"t":"arrow","p":[400.0,223.5,400.0,42.0],"c":"force","w":1.6,"head":7},{"t":"text","p":[394.0,124.0],"s":"D₀ = 432","c":"force","size":12,"a":"end"},{"t":"line","p":[192.3,230.4,192.3,252.4],"c":"muted","w":1.2,"dash":true},{"t":"text","p":[192.3,264.4],"s":"74 pm","c":"muted","size":11},{"t":"line","p":[192.3,232.4,482.5,232.4],"c":"muted","w":1,"dash":true}]}
---
L'energia di due atomi di idrogeno in funzione della distanza fra i nuclei, descritta con una funzione di Morse adattata ai dati spettroscopici. Il minimo cade a $74\un{pm}$; la profondità della buca è $D_e$, l'energia necessaria per separare gli atomi dal livello più basso realmente occupato è $D_0$.
:::

La curva ha un minimo alla **lunghezza di legame**, la distanza di equilibrio fra i nuclei, che per $\mathrm{H_2}$ vale $74{,}14\un{pm}$. La profondità della buca, misurata dal minimo, vale $D_e=458\un{kJ/mol}$, pari a $4{,}75\un{eV}$ per molecola. Una molecola reale non sta però mai ferma sul fondo della buca. Anche allo zero assoluto i nuclei vibrano, per il principio di indeterminazione incontrato nel capitolo sui livelli atomici, e il livello vibrazionale più basso si trova circa $26\un{kJ/mol}$ sopra il minimo. L'energia necessaria per separare gli atomi a partire da quel livello, l'**energia di dissociazione** $D_0$, è quella che si misura: $432{,}07\un{kJ/mol}$, cioè $4{,}478\un{eV}$.

La prima spiegazione quantistica del legame nella molecola di idrogeno fu data nel 1927 da Walter Heitler e Fritz London, pochi mesi dopo la pubblicazione dell'equazione di Schrödinger. Il loro calcolo mostrava che il legame nasce dal comportamento ondulatorio degli elettroni: quando i due elettroni hanno spin opposti, la funzione d'onda della molecola concentra la densità di carica fra i nuclei, abbassando l'energia; con spin paralleli la densità fra i nuclei diminuisce, e gli atomi si respingono. La coppia di elettroni con spin opposti del legame covalente ha quindi un fondamento quantistico preciso, legato al principio di Pauli.

## Le strutture di Lewis {#lewis}

Nel 1916, nello stesso lavoro in cui proponeva la regola dell'ottetto, Gilbert N. Lewis suggerì che due atomi possano legarsi condividendo una coppia di elettroni, che conta per l'ottetto di entrambi. Nella **struttura di Lewis** di una molecola le coppie condivise, o **coppie di legame**, si rappresentano con un trattino fra i due atomi; le coppie che appartengono a un solo atomo, le **coppie solitarie** o non condivise, si rappresentano con due punti.

Nella molecola di cloro ciascun atomo, con sette elettroni di valenza, ne mette in comune uno: la coppia condivisa porta entrambi a otto elettroni, e ogni atomo ha anche tre coppie solitarie. Nell'acqua l'ossigeno, con sei elettroni di valenza, forma due legami con due atomi di idrogeno e conserva due coppie solitarie; ogni idrogeno raggiunge la configurazione dell'elio con due elettroni.

::: metodo Scrivere una struttura di Lewis
1. Contare gli elettroni di valenza di tutti gli atomi; per uno ione, aggiungere un elettrone per ogni carica negativa e toglierne uno per ogni carica positiva.
2. Scegliere l'atomo centrale, di solito il meno elettronegativo e quasi mai l'idrogeno o il fluoro, e collegarlo agli altri con legami semplici.
3. Completare l'ottetto degli atomi esterni con coppie solitarie.
4. Collocare gli elettroni rimasti sull'atomo centrale, a coppie.
5. Se l'atomo centrale ha meno di otto elettroni, trasformare coppie solitarie degli atomi vicini in coppie di legame, formando legami doppi o tripli.
6. Controllare che il numero totale di elettroni sia quello del punto 1.
:::

Per l'anidride carbonica gli elettroni di valenza sono $4+2\times6=16$. Con il carbonio al centro e due legami semplici restano dodici elettroni, che completano gli ottetti dei due ossigeni; il carbonio ne ha però soltanto quattro. Trasformando una coppia solitaria di ciascun ossigeno in una seconda coppia di legame si ottengono due **legami doppi**, $\mathrm{O{=}C{=}O}$, e tutti e tre gli atomi hanno l'ottetto. Nella molecola di azoto i dieci elettroni di valenza danno un **legame triplo**, $\mathrm{N{\equiv}N}$, con una coppia solitaria su ciascun atomo.

::: figura lewis-molecole
{"w":660,"h":230,"items":[{"t":"text","p":[80,100],"s":"O","c":"ax","size":22},{"t":"text","p":[40,138],"s":"H","c":"ax","size":20},{"t":"text","p":[120,138],"s":"H","c":"ax","size":20},{"t":"line","p":[70,104,48,124],"c":"ax","w":2},{"t":"line","p":[90,104,112,124],"c":"ax","w":2},{"t":"circle","p":[76,70,2.4],"c":"force"},{"t":"circle","p":[84,70,2.4],"c":"force"},{"t":"circle","p":[56,88,2.4],"c":"force"},{"t":"circle","p":[56,96,2.4],"c":"force"},{"t":"text","p":[80,180],"s":"H₂O","c":"muted","size":12},{"t":"text","p":[230,100],"s":"N","c":"ax","size":22},{"t":"text","p":[190,138],"s":"H","c":"ax","size":20},{"t":"text","p":[270,138],"s":"H","c":"ax","size":20},{"t":"text","p":[230,150],"s":"H","c":"ax","size":20},{"t":"line","p":[220,104,198,124],"c":"ax","w":2},{"t":"line","p":[240,104,262,124],"c":"ax","w":2},{"t":"line","p":[230,106,230,132],"c":"ax","w":2},{"t":"circle","p":[226,70,2.4],"c":"force"},{"t":"circle","p":[234,70,2.4],"c":"force"},{"t":"text","p":[230,180],"s":"NH₃","c":"muted","size":12},{"t":"text","p":[360,100],"s":"O","c":"ax","size":22},{"t":"text","p":[420,100],"s":"C","c":"ax","size":22},{"t":"text","p":[480,100],"s":"O","c":"ax","size":22},{"t":"line","p":[372,90,408,90],"c":"ax","w":2},{"t":"line","p":[372,99,408,99],"c":"ax","w":2},{"t":"line","p":[432,90,468,90],"c":"ax","w":2},{"t":"line","p":[432,99,468,99],"c":"ax","w":2},{"t":"circle","p":[356,70,2.4],"c":"force"},{"t":"circle","p":[364,70,2.4],"c":"force"},{"t":"circle","p":[476,70,2.4],"c":"force"},{"t":"circle","p":[484,70,2.4],"c":"force"},{"t":"circle","p":[356,120,2.4],"c":"force"},{"t":"circle","p":[364,120,2.4],"c":"force"},{"t":"circle","p":[476,120,2.4],"c":"force"},{"t":"circle","p":[484,120,2.4],"c":"force"},{"t":"text","p":[420,180],"s":"CO₂","c":"muted","size":12},{"t":"text","p":[550,100],"s":"N","c":"ax","size":22},{"t":"text","p":[610,100],"s":"N","c":"ax","size":22},{"t":"line","p":[562,86,598,86],"c":"ax","w":2},{"t":"line","p":[562,94,598,94],"c":"ax","w":2},{"t":"line","p":[562,102,598,102],"c":"ax","w":2},{"t":"circle","p":[530,90,2.4],"c":"force"},{"t":"circle","p":[530,98,2.4],"c":"force"},{"t":"circle","p":[630,90,2.4],"c":"force"},{"t":"circle","p":[630,98,2.4],"c":"force"},{"t":"text","p":[580,180],"s":"N₂","c":"muted","size":12},{"t":"text","p":[310,215],"s":"trattino: coppia di legame","c":"muted","size":11,"a":"end"},{"t":"text","p":[330,215],"s":"punti: coppie solitarie","c":"muted","size":11,"a":"start"}]}
---
Strutture di Lewis di acqua, ammoniaca, anidride carbonica e azoto. Ogni trattino rappresenta una coppia di elettroni condivisa, ogni coppia di punti una coppia solitaria; in tutte le molecole gli atomi diversi dall'idrogeno hanno otto elettroni attorno.
:::

## Legami multipli: ordine, lunghezza, energia {#multipli}

Il numero di coppie condivise fra due atomi si chiama **ordine di legame**: uno per un legame semplice, due per un doppio, tre per un triplo. Più coppie condivise tengono i nuclei più vicini e li legano più fortemente. I tre legami carbonio-carbonio dell'etano, dell'etilene e dell'acetilene lo mostrano con chiarezza: le lunghezze sono circa $154$, $134$ e $120\un{pm}$.

Le molecole biatomiche del secondo periodo offrono il confronto più diretto, perché per esse la lunghezza e l'energia di legame sono misurate senza ambiguità.

::: figura ordine
{"w":640,"h":235,"items":[{"t":"text","p":[170,24],"s":"lunghezza di legame (pm)","c":"ax","size":12},{"t":"text","p":[480,24],"s":"energia di legame (kJ/mol)","c":"ax","size":12},{"t":"text","p":[70,66],"s":"N₂","c":"ax","size":14,"a":"end"},{"t":"text","p":[70,82],"s":"triplo","c":"muted","size":10,"a":"end"},{"t":"rect","p":[80,52,164.7,24],"c":"force2","r":1},{"t":"text","p":[250.7,69],"s":"109,8","c":"ax","size":11,"a":"start"},{"t":"rect","p":[370,52,226.8,24],"c":"force","r":1},{"t":"text","p":[602.8,69],"s":"945","c":"ax","size":11,"a":"start"},{"t":"text","p":[70,122],"s":"O₂","c":"ax","size":14,"a":"end"},{"t":"text","p":[70,138],"s":"doppio","c":"muted","size":10,"a":"end"},{"t":"rect","p":[80,108,181.1,24],"c":"force2","r":1},{"t":"text","p":[267.1,125],"s":"120,7","c":"ax","size":11,"a":"start"},{"t":"rect","p":[370,108,119.5,24],"c":"force","r":1},{"t":"text","p":[495.5,125],"s":"498","c":"ax","size":11,"a":"start"},{"t":"text","p":[70,178],"s":"F₂","c":"ax","size":14,"a":"end"},{"t":"text","p":[70,194],"s":"semplice","c":"muted","size":10,"a":"end"},{"t":"rect","p":[80,164,211.8,24],"c":"force2","r":1},{"t":"text","p":[297.8,181],"s":"141,2","c":"ax","size":11,"a":"start"},{"t":"rect","p":[370,164,37.9,24],"c":"force","r":1},{"t":"text","p":[413.9,181],"s":"158","c":"ax","size":11,"a":"start"},{"t":"text","p":[320,222],"s":"più coppie condivise: legame più corto e più forte","c":"muted","size":12}]}
---
Lunghezze di legame ed entalpie di legame a $25\,^\circ\mathrm{C}$ di azoto, ossigeno e fluoro. Passando dal legame triplo dell'azoto al legame semplice del fluoro la distanza fra i nuclei aumenta di un terzo e l'energia necessaria per separare gli atomi diminuisce di sei volte.
:::

L'energia del legame triplo dell'azoto, $945\un{kJ/mol}$, è fra le più grandi della chimica, e spiega l'inerzia dell'azoto atmosferico: per farlo reagire, nella sintesi industriale dell'ammoniaca come nei noduli delle radici delle leguminose, servono catalizzatori e molta energia. Il legame del fluoro, all'opposto, è eccezionalmente debole, $158\un{kJ/mol}$, perché le coppie solitarie dei due atomi, molto vicine, si respingono; per questo il fluoro molecolare è l'elemento più reattivo della tavola periodica.

L'energia di un legame doppio è maggiore di quella del semplice corrispondente, ma in generale non è il doppio. Il secondo e il terzo legame sono formati da elettroni distribuiti in regioni diverse dal primo, come si vedrà parlando di legami $\sigma$ e $\pi$, e la loro forza dipende dalla coppia di atomi. Dalle entalpie di formazione si ricava, per esempio, che il legame semplice ossigeno-ossigeno del perossido di idrogeno vale circa $144\un{kJ/mol}$, mentre il legame doppio della molecola di ossigeno ne vale $498$, più del triplo.

## La carica formale {#carica-formale}

Per molte molecole si possono scrivere più strutture di Lewis che rispettano l'ottetto. Per scegliere la più rappresentativa si usa la **carica formale**, la carica che un atomo avrebbe se gli elettroni di ogni legame fossero divisi in parti uguali fra i due atomi:

$$\text{carica formale}=\text{elettroni di valenza}-\text{elettroni non condivisi}-\tfrac12\,\text{elettroni condivisi}.$$

La somma delle cariche formali è uguale alla carica della specie, zero per una molecola neutra. Fra più strutture possibili si preferisce quella con cariche formali piccole e con le eventuali cariche negative sugli atomi più elettronegativi.

::: esempio La struttura dell'anidride carbonica
Confrontare la struttura $\mathrm{O{=}C{=}O}$ con la struttura alternativa $\mathrm{{}^-O{-}C{\equiv}O^+}$, nella quale un ossigeno forma un legame semplice e tre coppie solitarie, l'altro un legame triplo e una coppia solitaria.

Nella prima struttura ogni ossigeno ha quattro elettroni solitari e quattro condivisi, e quindi carica formale $6-4-2=0$. Il carbonio ha otto elettroni condivisi: $4-0-4=0$. Nella seconda l'ossigeno con il legame semplice ha $6-6-1=-1$, quello con il legame triplo $6-2-3=+1$, il carbonio $0$. La prima struttura, senza cariche formali, è la più rappresentativa, ed è confermata dall'esperimento: i due legami carbonio-ossigeno dell'anidride carbonica sono uguali, lunghi $116\un{pm}$.
:::

## La risonanza {#risonanza}

Per alcune molecole e ioni nessuna singola struttura di Lewis è soddisfacente. Nello ione nitrato, $\mathrm{NO_3^-}$, con $24$ elettroni di valenza, l'azoto centrale raggiunge l'ottetto soltanto se forma un legame doppio con uno dei tre ossigeni. Si possono scrivere tre strutture equivalenti, che differiscono soltanto per la posizione del legame doppio. Se una sola fosse corretta, lo ione dovrebbe avere un legame più corto degli altri due; le misure mostrano invece tre legami identici, di lunghezza intermedia fra un semplice e un doppio.

La struttura reale è una media delle tre, e si dice che è un **ibrido di risonanza**. Le strutture di Lewis equivalenti si scrivono separate da una freccia a due punte, $\leftrightarrow$, che non indica un equilibrio. La molecola ha in ogni istante la stessa distribuzione di elettroni, e nessuna delle strutture di Lewis, presa da sola, riesce a rappresentarla. Nello ione nitrato ogni legame azoto-ossigeno ha ordine $1\tfrac13$, perché quattro coppie di legame sono distribuite su tre legami.

L'esempio più famoso è il benzene, $\mathrm{C_6H_6}$, un anello di sei atomi di carbonio. Le due strutture con legami semplici e doppi alternati proposte da August Kekulé nel 1865 prevederebbero legami di due lunghezze diverse; i sei legami carbonio-carbonio del benzene sono invece tutti uguali, lunghi circa $140\un{pm}$, fra i $154$ di un legame semplice e i $134$ di un doppio. Gli elettroni dei legami doppi sono **delocalizzati** su tutto l'anello, e questa delocalizzazione rende il benzene più stabile di quanto le sue strutture di Lewis lascerebbero prevedere.

## Eccezioni alla regola dell'ottetto {#eccezioni}

La regola dell'ottetto ha tre tipi di eccezioni.

- **Molecole con un numero dispari di elettroni**, dette radicali. Il monossido di azoto, $\mathrm{NO}$, ha undici elettroni di valenza, e uno dei due atomi resta necessariamente con sette elettroni. I radicali sono in genere molto reattivi; il monossido di azoto è anche una molecola segnale del sistema cardiovascolare.
- **Ottetti incompleti.** Il trifluoruro di boro, $\mathrm{BF_3}$, ha il boro con soltanto sei elettroni. Le strutture con un legame doppio boro-fluoro, che darebbero l'ottetto, mettono una carica formale positiva sul fluoro, il più elettronegativo degli elementi, e contribuiscono poco. La carenza di elettroni rende $\mathrm{BF_3}$ avido di una coppia altrui: reagisce con l'ammoniaca formando un legame in cui entrambi gli elettroni provengono dall'azoto.
- **Ottetti espansi.** Elementi del terzo periodo e successivi formano composti in cui l'atomo centrale è circondato da più di quattro coppie: il pentacloruro di fosforo, $\mathrm{PCl_5}$, con cinque legami, l'esafluoruro di zolfo, $\mathrm{SF_6}$, con sei. La descrizione tradizionale attribuiva il fenomeno agli orbitali $d$ disponibili dal terzo periodo; i calcoli moderni mostrano che il loro contributo è piccolo, e che conta soprattutto la maggiore dimensione dell'atomo centrale, che può accogliere più atomi vicini, insieme alla forte polarità dei legami con atomi molto elettronegativi.

## Legami polari e momento dipolare {#polarita}

Nella molecola di idrogeno la coppia di legame è condivisa in modo perfettamente equo. Nell'acido fluoridrico, $\mathrm{HF}$, il fluoro è molto più elettronegativo dell'idrogeno, e la densità elettronica del legame è spostata verso di lui. Il fluoro porta una piccola carica negativa, l'idrogeno una piccola carica positiva, che si indicano con $\delta-$ e $\delta+$. Il legame è un **legame covalente polare**, a metà strada fra il legame covalente puro e il legame ionico descritto nel capitolo precedente.

Una coppia di cariche $+q$ e $-q$ a distanza $d$ forma un **dipolo elettrico**, caratterizzato dal **momento dipolare** $\mu=q\,d$. Le molecole polari si orientano in un campo elettrico, e dalla misura di questo comportamento si ricava $\mu$. Nella chimica si usa ancora un'unità tradizionale, il debye, che prende il nome dal fisico Peter Debye:

$$1\un{D}=3{,}33564\times10^{-30}\un{C\,m}.$$

Un elettrone e un protone a distanza di $100\un{pm}$ formerebbero un dipolo di $4{,}80\un{D}$. Confrontando il momento dipolare misurato con quello che si avrebbe se la carica fosse un elettrone intero, si ricava la **carica parziale** degli atomi, in unità della carica elementare:

$$\delta=\frac{\mu}{e\,d}.$$

::: esempio La carica parziale nell'acido fluoridrico
Il momento dipolare di $\mathrm{HF}$ gassoso è $1{,}83\un{D}$ e la lunghezza di legame $91{,}7\un{pm}$. Calcolare la carica parziale.

In unità del sistema internazionale il momento dipolare vale $\mu\simeq6{,}09\times10^{-30}\un{C\,m}$. Un elettrone intero alla distanza di $91{,}7\un{pm}$ darebbe $e\,d\simeq1{,}47\times10^{-29}\un{C\,m}$. Il rapporto vale $\delta\simeq0{,}41$: il fluoro porta circa due quinti della carica di un elettrone, e il legame ha un carattere ionico rilevante, pur restando covalente.
:::

Nella serie degli acidi alogenidrici la differenza di elettronegatività diminuisce dal fluoro allo iodio, e con essa la carica parziale.

::: figura dipolo
{"w":640,"h":298,"items":[{"t":"axes","o":[90,245],"x":[470,""],"y":[222,"momento dipolare (D)"],"sx":1,"sy":95,"xt":[],"yt":[[0.5,"0,5"],[1.0,"1,0"],[1.5,"1,5"]]},{"t":"rect","p":[128,71.2,44,173.8],"c":"force3","r":1},{"t":"text","p":[150,63.2],"s":"1,83 D","c":"ax","size":11},{"t":"text","p":[150,266],"s":"HF","c":"ax","size":13},{"t":"text","p":[150,284],"s":"δ ≈ 0,41","c":"muted","size":11},{"t":"rect","p":[238,139.6,44,105.5],"c":"force3","r":1},{"t":"text","p":[260,131.6],"s":"1,11 D","c":"ax","size":11},{"t":"text","p":[260,266],"s":"HCl","c":"ax","size":13},{"t":"text","p":[260,284],"s":"δ ≈ 0,18","c":"muted","size":11},{"t":"rect","p":[348,166.2,44,78.8],"c":"force3","r":1},{"t":"text","p":[370,158.2],"s":"0,83 D","c":"ax","size":11},{"t":"text","p":[370,266],"s":"HBr","c":"ax","size":13},{"t":"text","p":[370,284],"s":"δ ≈ 0,12","c":"muted","size":11},{"t":"rect","p":[458,202.2,44,42.8],"c":"force3","r":1},{"t":"text","p":[480,194.2],"s":"0,45 D","c":"ax","size":11},{"t":"text","p":[480,266],"s":"HI","c":"ax","size":13},{"t":"text","p":[480,284],"s":"δ ≈ 0,06","c":"muted","size":11}]}
---
Momenti dipolari e cariche parziali degli acidi alogenidrici gassosi. Dal fluoro allo iodio la lunghezza di legame cresce da $92$ a $161\un{pm}$, eppure il momento dipolare diminuisce di quattro volte, perché la carica parziale si riduce di sette volte.
:::

La polarità di un legame non coincide con la polarità della molecola. Nell'anidride carbonica entrambi i legami carbonio-ossigeno sono polari, ma i due dipoli hanno verso opposto e si annullano, perché la molecola è lineare; nell'acqua i due dipoli dei legami ossigeno-idrogeno formano un angolo, e la molecola ha un momento dipolare di $1{,}85\un{D}$. Per decidere se una molecola è polare serve quindi la sua geometria, che è l'argomento del capitolo [Geometria molecolare e VSEPR](unit:chemistry-08).

## La forma della buca di potenziale {#morse}

La curva della figura sul legame dell'idrogeno contiene più informazione di quanta ne serva per definire lunghezza ed energia di legame. La sua curvatura nel minimo determina la frequenza con cui la molecola vibra, la sua asimmetria descrive come la vibrazione cambia quando l'energia cresce.

::: approfondimento La funzione di Morse
Nel 1929 Philip Morse propose di descrivere l'energia di una molecola biatomica con la funzione
$$V(r)=D_e\left[1-e^{-a(r-r_e)}\right]^2-D_e,$$
che vale $-D_e$ nel minimo, a $r=r_e$, e tende a zero a grande distanza. Il parametro $a$ fissa la larghezza della buca; per l'idrogeno, con $D_e=4{,}748\un{eV}$, vale $a=0{,}01944\un{pm^{-1}}$.

Vicino al minimo la funzione si comporta come l'energia di una molla. Sviluppando l'esponenziale al primo ordine si trova $V\simeq-D_e+\tfrac12k(r-r_e)^2$, con costante elastica
$$k=2D_ea^2\simeq575\un{N/m}.$$
Le masse che vibrano sono i due protoni, e nel moto relativo conta la **massa ridotta** $m_\mathrm{r}=m_1m_2/(m_1+m_2)$, metà della massa di un atomo di idrogeno. La pulsazione della vibrazione è $\omega=\sqrt{k/m_\mathrm{r}}\simeq8{,}29\times10^{14}\un{rad/s}$.

La meccanica quantistica assegna all'oscillatore armonico livelli di energia $(v+\tfrac12)\hbar\omega$, con $v=0,1,2,\dots$, e il livello più basso ha energia $\tfrac12\hbar\omega$. Per una mole di molecole questo vale circa $26{,}3\un{kJ/mol}$, vicino alla differenza misurata fra $D_e$ e $D_0$, $26{,}0\un{kJ/mol}$. Il piccolo scarto nasce dal fatto che la buca reale si allarga salendo verso l'alto più di quanto farebbe una parabola, e i livelli vibrazionali si infittiscono.

Nella molecola di deuterio, $\mathrm{D_2}$, la curva di energia è praticamente la stessa, perché dipende dagli elettroni e dalle cariche dei nuclei; la massa ridotta è però doppia, e l'energia di punto zero minore di un fattore $\sqrt2$. Per questo il legame $\mathrm{D{-}D}$ richiede qualche kilojoule in più per essere spezzato, e le reazioni che rompono legami con il deuterio sono più lente di quelle con l'idrogeno.
:::

## Energie di legame e reazioni {#energie}

L'energia di dissociazione di un legame si misura per le molecole biatomiche con la spettroscopia, oppure si ricava dalle entalpie di formazione degli atomi gassosi, come nel capitolo [Termochimica e calorimetria](unit:chemistry-16). Le due strade danno valori leggermente diversi, perché la spettroscopia dà l'energia $D_0$ allo zero assoluto e la termochimica l'entalpia a $25\,^\circ\mathrm{C}$: per l'idrogeno $432{,}1$ e $436{,}0\un{kJ/mol}$. Nei calcoli sulle reazioni si usa la seconda.

Le entalpie di legame permettono di capire da dove viene l'energia di una reazione. Nella reazione fra idrogeno e cloro gassosi,

$$\mathrm{H_2(g)}+\mathrm{Cl_2(g)}\longrightarrow2\,\mathrm{HCl(g)},$$

si rompono un legame $\mathrm{H{-}H}$, $436{,}0\un{kJ/mol}$, e un legame $\mathrm{Cl{-}Cl}$, $243{,}4\un{kJ/mol}$, e si formano due legami $\mathrm{H{-}Cl}$, $432{,}0\un{kJ/mol}$ ciascuno. Il bilancio è

$$\Delta_\mathrm{r}H=436{,}0+243{,}4-2\times432{,}0=-184{,}6\un{kJ},$$

esattamente il doppio dell'entalpia di formazione di $\mathrm{HCl}$. La reazione libera energia perché al posto del legame debole del cloro si forma un secondo legame $\mathrm{H{-}Cl}$, forte quasi quanto quello dell'idrogeno.

Per le molecole poliatomiche la situazione è più complicata, perché i legami di uno stesso tipo non sono equivalenti. Le quattro energie necessarie per staccare uno dopo l'altro gli atomi di idrogeno del metano sono tutte diverse, e variano fra circa $340$ e circa $460\un{kJ/mol}$; la loro media, $416\un{kJ/mol}$, è l'**entalpia media di legame** $\mathrm{C{-}H}$. Per la reazione

$$\mathrm{CH_4(g)}+\mathrm{Cl_2(g)}\longrightarrow\mathrm{CH_3Cl(g)}+\mathrm{HCl(g)},$$

conviene usare l'energia del legame che si rompe davvero, il primo $\mathrm{C{-}H}$ del metano, circa $439\un{kJ/mol}$, e quella del legame che si forma, $\mathrm{C{-}Cl}$ nel clorometano, circa $350\un{kJ/mol}$. La stima, $439+243-350-432\simeq-100\un{kJ}$, coincide con il valore che si ricava dalle entalpie di formazione.

Le entalpie di legame mostrano anche l'effetto della repulsione fra coppie solitarie. Dall'entalpia di formazione del perossido di idrogeno gassoso si ricava un legame $\mathrm{O{-}O}$ di circa $144\un{kJ/mol}$, uno dei più deboli fra quelli che si incontrano nelle molecole organiche e biologiche. È il motivo per cui i perossidi si decompongono facilmente e sono usati come candeggianti e come iniziatori delle reazioni di polimerizzazione.

## Il legame come sovrapposizione di orbitali {#valenza}

La teoria di Heitler e London, estesa negli anni successivi da Linus Pauling e John Slater, è nota come **teoria del legame di valenza**. Descrive il legame covalente come la **sovrapposizione** di due orbitali atomici, ciascuno occupato da un elettrone, nella regione fra i due nuclei. I due elettroni, con spin opposti, occupano insieme la regione di sovrapposizione, e la loro attrazione verso entrambi i nuclei tiene unita la molecola. Più grande è la sovrapposizione, più forte è il legame.

La sovrapposizione può avvenire in due modi diversi.

- Nel **legame $\sigma$** gli orbitali si sovrappongono lungo l'asse che unisce i nuclei, e la densità elettronica del legame ha simmetria cilindrica attorno all'asse. Sono legami $\sigma$ quello della molecola di idrogeno, fra due orbitali $1s$, quello dell'acido cloridrico, fra l'orbitale $1s$ dell'idrogeno e un orbitale $3p$ del cloro, e quello della molecola di cloro, fra due orbitali $3p$ orientati l'uno verso l'altro.
- Nel **legame $\pi$** due orbitali $p$ paralleli si sovrappongono lateralmente, sopra e sotto l'asse. La densità elettronica si concentra in due lobi, e sull'asse stesso è nulla.

::: figura sovrapposizione
{"w":640,"h":185,"items":[{"t":"poly","pts":[[100.0,80.0],[99.6,84.7],[98.5,89.3],[96.7,93.6],[94.3,97.6],[91.2,101.2],[87.6,104.3],[83.6,106.7],[79.3,108.5],[74.7,109.6],[70.0,110.0],[65.3,109.6],[60.7,108.5],[56.4,106.7],[52.4,104.3],[48.8,101.2],[45.7,97.6],[43.3,93.6],[41.5,89.3],[40.4,84.7],[40.0,80.0],[40.4,75.3],[41.5,70.7],[43.3,66.4],[45.7,62.4],[48.8,58.8],[52.4,55.7],[56.4,53.3],[60.7,51.5],[65.3,50.4],[70.0,50.0],[74.7,50.4],[79.3,51.5],[83.6,53.3],[87.6,55.7],[91.2,58.8],[94.3,62.4],[96.7,66.4],[98.5,70.7],[99.6,75.3],[100.0,80.0]],"c":"force2","w":1.8,"close":true},{"t":"poly","pts":[[145.0,80.0],[144.6,84.7],[143.5,89.3],[141.7,93.6],[139.3,97.6],[136.2,101.2],[132.6,104.3],[128.6,106.7],[124.3,108.5],[119.7,109.6],[115.0,110.0],[110.3,109.6],[105.7,108.5],[101.4,106.7],[97.4,104.3],[93.8,101.2],[90.7,97.6],[88.3,93.6],[86.5,89.3],[85.4,84.7],[85.0,80.0],[85.4,75.3],[86.5,70.7],[88.3,66.4],[90.7,62.4],[93.8,58.8],[97.4,55.7],[101.4,53.3],[105.7,51.5],[110.3,50.4],[115.0,50.0],[119.7,50.4],[124.3,51.5],[128.6,53.3],[132.6,55.7],[136.2,58.8],[139.3,62.4],[141.7,66.4],[143.5,70.7],[144.6,75.3],[145.0,80.0]],"c":"force2","w":1.8,"close":true},{"t":"circle","p":[70,80,3],"c":"ax"},{"t":"circle","p":[115,80,3],"c":"ax"},{"t":"text","p":[92,140],"s":"σ da due orbitali s","c":"muted","size":11},{"t":"poly","pts":[[251.0,80.0],[250.7,82.5],[249.7,84.9],[248.2,87.3],[246.0,89.4],[243.4,91.3],[240.3,92.9],[236.8,94.3],[233.0,95.2],[229.1,95.8],[225.0,96.0],[220.9,95.8],[217.0,95.2],[213.2,94.3],[209.7,92.9],[206.6,91.3],[204.0,89.4],[201.8,87.3],[200.3,84.9],[199.3,82.5],[199.0,80.0],[199.3,77.5],[200.3,75.1],[201.8,72.7],[204.0,70.6],[206.6,68.7],[209.7,67.1],[213.2,65.7],[217.0,64.8],[220.9,64.2],[225.0,64.0],[229.1,64.2],[233.0,64.8],[236.8,65.7],[240.3,67.1],[243.4,68.7],[246.0,70.6],[248.2,72.7],[249.7,75.1],[250.7,77.5],[251.0,80.0]],"c":"force2","w":1.8,"close":true},{"t":"poly","pts":[[303.0,80.0],[302.7,82.5],[301.7,84.9],[300.2,87.3],[298.0,89.4],[295.4,91.3],[292.3,92.9],[288.8,94.3],[285.0,95.2],[281.1,95.8],[277.0,96.0],[272.9,95.8],[269.0,95.2],[265.2,94.3],[261.7,92.9],[258.6,91.3],[256.0,89.4],[253.8,87.3],[252.3,84.9],[251.3,82.5],[251.0,80.0],[251.3,77.5],[252.3,75.1],[253.8,72.7],[256.0,70.6],[258.6,68.7],[261.7,67.1],[265.2,65.7],[269.0,64.8],[272.9,64.2],[277.0,64.0],[281.1,64.2],[285.0,64.8],[288.8,65.7],[292.3,67.1],[295.4,68.7],[298.0,70.6],[300.2,72.7],[301.7,75.1],[302.7,77.5],[303.0,80.0]],"c":"force","w":1.8,"close":true},{"t":"poly","pts":[[349.0,80.0],[348.7,82.5],[347.7,84.9],[346.2,87.3],[344.0,89.4],[341.4,91.3],[338.3,92.9],[334.8,94.3],[331.0,95.2],[327.1,95.8],[323.0,96.0],[318.9,95.8],[315.0,95.2],[311.2,94.3],[307.7,92.9],[304.6,91.3],[302.0,89.4],[299.8,87.3],[298.3,84.9],[297.3,82.5],[297.0,80.0],[297.3,77.5],[298.3,75.1],[299.8,72.7],[302.0,70.6],[304.6,68.7],[307.7,67.1],[311.2,65.7],[315.0,64.8],[318.9,64.2],[323.0,64.0],[327.1,64.2],[331.0,64.8],[334.8,65.7],[338.3,67.1],[341.4,68.7],[344.0,70.6],[346.2,72.7],[347.7,75.1],[348.7,77.5],[349.0,80.0]],"c":"force2","w":1.8,"close":true},{"t":"poly","pts":[[401.0,80.0],[400.7,82.5],[399.7,84.9],[398.2,87.3],[396.0,89.4],[393.4,91.3],[390.3,92.9],[386.8,94.3],[383.0,95.2],[379.1,95.8],[375.0,96.0],[370.9,95.8],[367.0,95.2],[363.2,94.3],[359.7,92.9],[356.6,91.3],[354.0,89.4],[351.8,87.3],[350.3,84.9],[349.3,82.5],[349.0,80.0],[349.3,77.5],[350.3,75.1],[351.8,72.7],[354.0,70.6],[356.6,68.7],[359.7,67.1],[363.2,65.7],[367.0,64.8],[370.9,64.2],[375.0,64.0],[379.1,64.2],[383.0,64.8],[386.8,65.7],[390.3,67.1],[393.4,68.7],[396.0,70.6],[398.2,72.7],[399.7,75.1],[400.7,77.5],[401.0,80.0]],"c":"force","w":1.8,"close":true},{"t":"circle","p":[251,80,3],"c":"ax"},{"t":"circle","p":[349,80,3],"c":"ax"},{"t":"text","p":[300,140],"s":"σ da due orbitali p allineati","c":"muted","size":11},{"t":"poly","pts":[[494.0,58.0],[493.8,61.4],[493.3,64.8],[492.5,68.0],[491.3,70.9],[489.9,73.6],[488.2,75.8],[486.4,77.6],[484.3,78.9],[482.2,79.7],[480.0,80.0],[477.8,79.7],[475.7,78.9],[473.6,77.6],[471.8,75.8],[470.1,73.6],[468.7,70.9],[467.5,68.0],[466.7,64.8],[466.2,61.4],[466.0,58.0],[466.2,54.6],[466.7,51.2],[467.5,48.0],[468.7,45.1],[470.1,42.4],[471.8,40.2],[473.6,38.4],[475.7,37.1],[477.8,36.3],[480.0,36.0],[482.2,36.3],[484.3,37.1],[486.4,38.4],[488.2,40.2],[489.9,42.4],[491.3,45.1],[492.5,48.0],[493.3,51.2],[493.8,54.6],[494.0,58.0]],"c":"force2","w":1.8,"close":true},{"t":"poly","pts":[[494.0,102.0],[493.8,105.4],[493.3,108.8],[492.5,112.0],[491.3,114.9],[489.9,117.6],[488.2,119.8],[486.4,121.6],[484.3,122.9],[482.2,123.7],[480.0,124.0],[477.8,123.7],[475.7,122.9],[473.6,121.6],[471.8,119.8],[470.1,117.6],[468.7,114.9],[467.5,112.0],[466.7,108.8],[466.2,105.4],[466.0,102.0],[466.2,98.6],[466.7,95.2],[467.5,92.0],[468.7,89.1],[470.1,86.4],[471.8,84.2],[473.6,82.4],[475.7,81.1],[477.8,80.3],[480.0,80.0],[482.2,80.3],[484.3,81.1],[486.4,82.4],[488.2,84.2],[489.9,86.4],[491.3,89.1],[492.5,92.0],[493.3,95.2],[493.8,98.6],[494.0,102.0]],"c":"force","w":1.8,"close":true},{"t":"poly","pts":[[574.0,58.0],[573.8,61.4],[573.3,64.8],[572.5,68.0],[571.3,70.9],[569.9,73.6],[568.2,75.8],[566.4,77.6],[564.3,78.9],[562.2,79.7],[560.0,80.0],[557.8,79.7],[555.7,78.9],[553.6,77.6],[551.8,75.8],[550.1,73.6],[548.7,70.9],[547.5,68.0],[546.7,64.8],[546.2,61.4],[546.0,58.0],[546.2,54.6],[546.7,51.2],[547.5,48.0],[548.7,45.1],[550.1,42.4],[551.8,40.2],[553.6,38.4],[555.7,37.1],[557.8,36.3],[560.0,36.0],[562.2,36.3],[564.3,37.1],[566.4,38.4],[568.2,40.2],[569.9,42.4],[571.3,45.1],[572.5,48.0],[573.3,51.2],[573.8,54.6],[574.0,58.0]],"c":"force2","w":1.8,"close":true},{"t":"poly","pts":[[574.0,102.0],[573.8,105.4],[573.3,108.8],[572.5,112.0],[571.3,114.9],[569.9,117.6],[568.2,119.8],[566.4,121.6],[564.3,122.9],[562.2,123.7],[560.0,124.0],[557.8,123.7],[555.7,122.9],[553.6,121.6],[551.8,119.8],[550.1,117.6],[548.7,114.9],[547.5,112.0],[546.7,108.8],[546.2,105.4],[546.0,102.0],[546.2,98.6],[546.7,95.2],[547.5,92.0],[548.7,89.1],[550.1,86.4],[551.8,84.2],[553.6,82.4],[555.7,81.1],[557.8,80.3],[560.0,80.0],[562.2,80.3],[564.3,81.1],[566.4,82.4],[568.2,84.2],[569.9,86.4],[571.3,89.1],[572.5,92.0],[573.3,95.2],[573.8,98.6],[574.0,102.0]],"c":"force","w":1.8,"close":true},{"t":"circle","p":[480,80,3],"c":"ax"},{"t":"circle","p":[560,80,3],"c":"ax"},{"t":"poly","pts":[[480,36],[520,30],[560,36]],"c":"force2","w":1.2,"dash":true},{"t":"poly","pts":[[480,124],[520,130],[560,124]],"c":"force","w":1.2,"dash":true},{"t":"text","p":[520,140],"s":"π da due orbitali p paralleli","c":"muted","size":11},{"t":"text","p":[320,172],"s":"i colori indicano il segno della funzione d'onda","c":"muted","size":11}]}
---
Tre modi di sovrapposizione fra orbitali atomici. Due orbitali $s$, o due orbitali $p$ diretti l'uno verso l'altro, formano un legame $\sigma$ lungo l'asse; due orbitali $p$ paralleli formano un legame $\pi$, con la densità elettronica sopra e sotto l'asse.
:::

Un legame semplice è sempre un legame $\sigma$. Nei legami multipli il primo legame è $\sigma$, e gli altri sono $\pi$: il doppio legame contiene un legame $\sigma$ e uno $\pi$, il triplo legame un $\sigma$ e due $\pi$, perpendicolari fra loro. Nella molecola di azoto ogni atomo ha tre orbitali $2p$ con un elettrone: quelli diretti lungo l'asse formano il legame $\sigma$, le due coppie di orbitali perpendicolari all'asse formano i due legami $\pi$.

La sovrapposizione laterale è meno efficace di quella frontale, e un legame $\pi$ è di solito più debole del legame $\sigma$ fra gli stessi atomi. Il legame $\pi$ ha però una conseguenza strutturale importante: per conservare la sovrapposizione laterale, gli orbitali $p$ devono restare paralleli, e la rotazione attorno a un doppio legame è bloccata. Per far ruotare di novanta gradi le due metà dell'etilene bisogna rompere il legame $\pi$, spendendo circa $270\un{kJ/mol}$; a temperatura ambiente la rotazione non avviene, e le molecole che differiscono soltanto per la disposizione dei gruppi attorno a un doppio legame sono composti diversi, con proprietà diverse.

Per spiegare con la sovrapposizione la geometria delle molecole poliatomiche, per esempio i quattro legami equivalenti del metano, Pauling introdusse nel 1931 l'idea di **orbitali ibridi**, combinazioni degli orbitali $s$ e $p$ di uno stesso atomo orientate nelle direzioni dei legami. Gli orbitali ibridi sono descritti nel capitolo [Geometria molecolare e VSEPR](unit:chemistry-08).

::: quotidiano Vedere con un doppio legame
Nella retina dell'occhio la luce è catturata da una molecola, il retinale, legata a una proteina. Il retinale contiene una catena di doppi legami carbonio-carbonio, e nello stato di riposo uno di essi ha i gruppi disposti in modo da piegare la catena. Quando assorbe un fotone di luce visibile, la molecola passa a uno stato eccitato nel quale il legame $\pi$ è indebolito, e la catena ruota attorno al doppio legame raddrizzandosi in meno di un millesimo di miliardesimo di secondo. Il cambio di forma modifica la proteina e avvia il segnale nervoso. Ogni immagine che vediamo comincia con la rotazione attorno a un legame che, al buio, resterebbe bloccato per tempi lunghissimi.
:::

## Gli orbitali molecolari {#orbitali-molecolari}

La teoria del legame di valenza conserva l'idea di Lewis di coppie localizzate fra due atomi. Una descrizione alternativa, sviluppata negli stessi anni da Friedrich Hund e Robert Mulliken, tratta la molecola come un tutto. Gli elettroni occupano **orbitali molecolari**, estesi su tutti i nuclei, che si costruiscono combinando gli orbitali atomici e si riempiono con le stesse regole degli orbitali atomici: in ordine di energia crescente, con al più due elettroni di spin opposto per orbitale, e con spin paralleli quando più orbitali hanno la stessa energia.

Due orbitali $1s$ di due atomi di idrogeno si possono combinare in due modi. Sommandoli, le onde si rafforzano nella regione fra i nuclei, e si ottiene un **orbitale di legame** $\sigma_{1s}$, di energia più bassa degli orbitali atomici. Sottraendoli, le onde si annullano a metà strada, e si ottiene un **orbitale di antilegame** $\sigma^*_{1s}$, con un piano nodale fra i nuclei e un'energia più alta. Un elettrone nell'orbitale di legame tiene uniti i nuclei, un elettrone nell'orbitale di antilegame li allontana.

::: figura mo-h2
{"w":640,"h":260,"items":[{"t":"text","p":[80,30],"s":"H","c":"ax","size":14},{"t":"text","p":[320,30],"s":"H₂","c":"ax","size":14},{"t":"text","p":[560,30],"s":"H","c":"ax","size":14},{"t":"line","p":[50,150,110,150],"c":"ax","w":2.4},{"t":"line","p":[530,150,590,150],"c":"ax","w":2.4},{"t":"text","p":[80,172],"s":"1s","c":"muted","size":12},{"t":"text","p":[560,172],"s":"1s","c":"muted","size":12},{"t":"line","p":[290,200,350,200],"c":"force2","w":2.4},{"t":"text","p":[360,205],"s":"σ legante","c":"force2","size":12,"a":"start"},{"t":"line","p":[290,105,350,105],"c":"force4","w":2.4},{"t":"text","p":[360,110],"s":"σ* antilegante","c":"force4","size":12,"a":"start"},{"t":"line","p":[110,150,290,200],"c":"muted","w":1,"dash":true},{"t":"line","p":[110,150,290,105],"c":"muted","w":1,"dash":true},{"t":"line","p":[530,150,350,200],"c":"muted","w":1,"dash":true},{"t":"line","p":[530,150,350,105],"c":"muted","w":1,"dash":true},{"t":"arrow","p":[80,162,80,138],"c":"force","w":1.8,"head":6},{"t":"arrow","p":[560,138,560,162],"c":"force2","w":1.8,"head":6},{"t":"arrow","p":[312,212,312,188],"c":"force","w":1.8,"head":6},{"t":"arrow","p":[328,188,328,212],"c":"force2","w":1.8,"head":6},{"t":"arrow","p":[30,230,30,50],"c":"muted","w":1.2,"head":7},{"t":"text","p":[36,56],"s":"E","c":"muted","size":12,"a":"start"},{"t":"text","p":[320,245],"s":"ordine di legame = (2 − 0)/2 = 1","c":"ax","size":12}]}
---
Diagramma degli orbitali molecolari della molecola di idrogeno. I due elettroni occupano l'orbitale di legame $\sigma_{1s}$ con spin opposti; l'orbitale di antilegame $\sigma^*_{1s}$ resta vuoto, e l'ordine di legame vale uno.
:::

L'**ordine di legame** si definisce come

$$\text{ordine di legame}=\tfrac12\left(n_\mathrm{l}-n_\mathrm{a}\right),$$

dove $n_\mathrm{l}$ e $n_\mathrm{a}$ sono gli elettroni negli orbitali di legame e di antilegame. Per la molecola di idrogeno vale uno, come nella struttura di Lewis. La teoria prevede però anche legami con ordine frazionario. Lo ione $\mathrm{H_2^+}$, con un solo elettrone nell'orbitale di legame, ha ordine $\tfrac12$: esiste, e la sua energia di dissociazione, $256\un{kJ/mol}$, è poco più della metà di quella di $\mathrm{H_2}$, con un legame più lungo, $106\un{pm}$. Due atomi di elio, con quattro elettroni, riempirebbero sia l'orbitale di legame sia quello di antilegame, con ordine zero: la molecola $\mathrm{He_2}$ non si forma in condizioni ordinarie, mentre lo ione $\mathrm{He_2^+}$, con ordine $\tfrac12$, è legato con circa $229\un{kJ/mol}$.

Per le molecole biatomiche del secondo periodo si combinano gli orbitali $2s$ e $2p$. I due orbitali $2s$ danno $\sigma_{2s}$ e $\sigma^*_{2s}$; i due orbitali $2p$ diretti lungo l'asse danno $\sigma_{2p}$ e $\sigma^*_{2p}$; le due coppie di orbitali $2p$ perpendicolari danno due orbitali $\pi_{2p}$ di legame e due $\pi^*_{2p}$ di antilegame, di uguale energia a due a due. Per l'ossigeno e il fluoro l'ordine di energia è $\sigma_{2s}<\sigma^*_{2s}<\sigma_{2p}<\pi_{2p}<\pi^*_{2p}<\sigma^*_{2p}$; per le molecole dal litio all'azoto l'orbitale $\sigma_{2p}$ si trova sopra i $\pi_{2p}$, per effetto della mescolanza con gli orbitali $2s$.

::: esempio L'ossigeno è magnetico
Distribuire i dodici elettroni di valenza della molecola $\mathrm{O_2}$ negli orbitali molecolari, calcolare l'ordine di legame e contare gli elettroni spaiati.

Gli elettroni occupano, in ordine, $\sigma_{2s}$ con due, $\sigma^*_{2s}$ con due, $\sigma_{2p}$ con due, i due $\pi_{2p}$ con quattro. Restano due elettroni per i due orbitali $\pi^*_{2p}$, di uguale energia: per la regola di Hund occupano orbitali diversi con spin paralleli. Gli elettroni di legame sono otto, quelli di antilegame quattro, e l'ordine di legame vale $\tfrac12(8-4)=2$, in accordo con il doppio legame della struttura di Lewis. La molecola ha però due elettroni spaiati, che la struttura di Lewis, con tutte le coppie complete, non prevede.
:::

Una sostanza con elettroni spaiati è **paramagnetica**: è attratta da un magnete, perché i momenti magnetici dei suoi elettroni si allineano al campo. L'ossigeno liquido, versato fra i poli di una calamita potente, vi resta sospeso; l'azoto liquido, con tutti gli elettroni appaiati, scorre via. Il paramagnetismo dell'ossigeno fu uno dei primi successi della teoria degli orbitali molecolari, e resta l'esempio più semplice di una proprietà che le strutture di Lewis non riescono a spiegare.

La teoria permette anche di prevedere come cambia il legame quando si aggiungono o si tolgono elettroni. Togliendo un elettrone all'ossigeno lo si toglie da un orbitale di antilegame: lo ione $\mathrm{O_2^+}$ ha ordine $2\tfrac12$ e un legame più corto, $112\un{pm}$ contro $121$. Aggiungendone si riempiono gli orbitali $\pi^*_{2p}$: lo ione superossido $\mathrm{O_2^-}$ ha ordine $1\tfrac12$, lo ione perossido $\mathrm{O_2^{2-}}$ ordine $1$, e i loro legami sono sempre più lunghi.

::: storia Lewis, Langmuir e la parola «covalente»
Gilbert Lewis immaginò già nel 1902, in appunti per le sue lezioni a Harvard, un atomo a forma di cubo, con gli elettroni di valenza ai vertici; due cubi che condividono uno spigolo mettono in comune una coppia di elettroni. Pubblicò l'idea soltanto nel 1916, nell'articolo «The Atom and the Molecule». Il chimico statunitense Irving Langmuir la riprese nel 1919, la applicò a centinaia di composti e coniò il termine **covalenza** per il numero di coppie che un atomo condivide con i vicini. Le conferenze di Langmuir resero la teoria così popolare che per qualche anno fu chiamata teoria di Lewis e Langmuir, con un certo disappunto di Lewis. Pochi anni dopo la meccanica quantistica mostrò che la coppia condivisa non era un artificio grafico, e Linus Pauling raccolse l'intera costruzione nel libro *The Nature of the Chemical Bond*, del 1939.
:::

## Errori frequenti {#errori}

::: errore Rompere un legame libera energia
Rompere un legame richiede sempre energia; l'energia si libera quando un legame si forma. Una reazione è esotermica quando i legami formati, nel complesso, sono più forti di quelli rotti. Il carburante non contiene energia nei suoi legami come una molla carica. La libera perché i legami dei prodotti, anidride carbonica e acqua, sono più forti dei legami dei reagenti.
:::

::: errore La risonanza come oscillazione
Lo ione nitrato non passa da una struttura di Lewis all'altra. Le strutture di risonanza sono descrizioni parziali di un'unica distribuzione di elettroni, intermedia fra tutte. Il mulo, incrocio fra cavallo e asino, è in ogni momento un mulo; nessuno lo descriverebbe come un animale che per metà del tempo è un cavallo e per l'altra metà un asino.
:::

::: errore Il doppio legame vale due legami semplici
L'energia di un legame doppio è maggiore di quella del semplice corrispondente, ma il rapporto varia molto da coppia a coppia. Per l'ossigeno il doppio legame vale più del triplo del semplice; per il carbonio vale meno del doppio. Il secondo legame è un legame $\pi$, diverso dal primo.
:::

::: errore La carica formale è la carica dell'atomo
La carica formale è una regola contabile, basata sull'ipotesi che gli elettroni di legame siano divisi a metà. La distribuzione reale della carica dipende dall'elettronegatività. Nello ione ammonio la carica formale positiva sta sull'azoto, eppure l'azoto, più elettronegativo dell'idrogeno, porta una carica parziale negativa, e la carica positiva dello ione è distribuita sui quattro idrogeni.
:::

::: errore Legami polari, molecola polare
Una molecola con legami polari può essere apolare, se i dipoli dei legami si compensano per simmetria. L'anidride carbonica e il tetracloruro di carbonio hanno legami polari e momento dipolare nullo.
:::

## Sintesi {#sintesi}

::: sintesi Che cosa portare con sé
- Nel legame covalente due atomi condividono una coppia di elettroni con spin opposti; l'energia della molecola ha un minimo alla lunghezza di legame.
- L'energia di dissociazione $D_0$ è minore della profondità della buca $D_e$ per l'energia di punto zero della vibrazione, circa $26\un{kJ/mol}$ per $\mathrm{H_2}$.
- Le strutture di Lewis rappresentano coppie di legame e coppie solitarie; la carica formale aiuta a scegliere fra più strutture, la risonanza descrive le molecole che nessuna struttura singola rappresenta.
- Esistono molecole con un numero dispari di elettroni, con ottetti incompleti e con più di otto elettroni attorno all'atomo centrale.
- Al crescere dell'ordine di legame la lunghezza diminuisce e l'energia aumenta.
- La differenza di elettronegatività rende polari i legami; dal momento dipolare, $\mu=\delta e\,d$, si ricavano le cariche parziali.
- Le entalpie di legame spiegano l'energia delle reazioni: l'energia liberata viene dalla formazione di legami più forti di quelli rotti.
- Nella teoria del legame di valenza i legami nascono dalla sovrapposizione di orbitali atomici; un legame multiplo contiene un legame $\sigma$ e uno o due legami $\pi$.
- Nella teoria degli orbitali molecolari l'ordine di legame è la metà della differenza fra elettroni di legame e di antilegame; la teoria spiega il paramagnetismo dell'ossigeno.
:::

## Glossario {#glossario}

- **Legame covalente**: legame formato dalla condivisione di una o più coppie di elettroni fra due atomi.
- **Lunghezza di legame**: distanza di equilibrio fra i nuclei di due atomi legati.
- **Energia di dissociazione** ($D_0$): energia necessaria per separare in atomi una mole di molecole biatomiche dal loro livello più basso.
- **Energia di punto zero**: energia di vibrazione che una molecola conserva anche allo zero assoluto.
- **Struttura di Lewis**: rappresentazione di una molecola con le coppie di legame come trattini e le coppie solitarie come punti.
- **Coppia solitaria**: coppia di elettroni di valenza che appartiene a un solo atomo.
- **Ordine di legame**: numero di coppie condivise fra due atomi; nella teoria degli orbitali molecolari, metà della differenza fra elettroni di legame e di antilegame.
- **Carica formale**: carica attribuita a un atomo dividendo a metà gli elettroni dei suoi legami.
- **Risonanza**: descrizione di una molecola come media di più strutture di Lewis che differiscono soltanto per la posizione degli elettroni.
- **Radicale**: specie con uno o più elettroni spaiati.
- **Legame covalente polare**: legame in cui la coppia di elettroni è spostata verso l'atomo più elettronegativo.
- **Momento dipolare** ($\mu$): prodotto della carica per la distanza in una coppia di cariche opposte; si misura in debye.
- **Entalpia media di legame**: media delle entalpie di dissociazione di un tipo di legame in molecole diverse.
- **Legame $\sigma$**: legame con densità elettronica concentrata lungo l'asse fra i nuclei.
- **Legame $\pi$**: legame formato dalla sovrapposizione laterale di orbitali $p$, con densità elettronica sopra e sotto l'asse.
- **Orbitale molecolare**: orbitale esteso su tutta la molecola; può essere di legame o di antilegame.
- **Paramagnetismo**: attrazione verso un campo magnetico dovuta a elettroni spaiati.

## Esercizi {#esercizi}

Dati utili: $1\un{D}=3{,}33564\times10^{-30}\un{C\,m}$; $e=1{,}602\times10^{-19}\un{C}$; $N_A=6{,}022\times10^{23}\un{mol^{-1}}$; $h=6{,}626\times10^{-34}\un{J\,s}$; $c=2{,}998\times10^8\un{m/s}$; $\hbar=1{,}0546\times10^{-34}\un{J\,s}$; $1\un{u}=1{,}6605\times10^{-27}\un{kg}$. Elettronegatività di Pauling: H $2{,}20$, C $2{,}55$, N $3{,}04$, O $3{,}44$, F $3{,}98$, Cl $3{,}16$, Br $2{,}96$, I $2{,}66$.

::: esercizio Contare le coppie [base]
Scrivere le strutture di Lewis di $\mathrm{H_2S}$, $\mathrm{PH_3}$, $\mathrm{SiH_4}$ e $\mathrm{HBr}$, e indicare per ciascuna quante coppie di legame e quante coppie solitarie ha l'atomo diverso dall'idrogeno.
>>> soluzione
Lo zolfo di $\mathrm{H_2S}$, con sei elettroni di valenza, forma due legami e ha due coppie solitarie, come l'ossigeno dell'acqua. Il fosforo di $\mathrm{PH_3}$ forma tre legami e ha una coppia solitaria, come l'azoto dell'ammoniaca. Il silicio di $\mathrm{SiH_4}$ forma quattro legami, senza coppie solitarie. Il bromo di $\mathrm{HBr}$ forma un legame e ha tre coppie solitarie.
:::

::: esercizio Legami multipli [base]
Scrivere le strutture di Lewis di $\mathrm{HCN}$, $\mathrm{C_2H_2}$ e $\mathrm{CS_2}$, dopo aver contato gli elettroni di valenza di ciascuna molecola.
>>> soluzione
$\mathrm{HCN}$ ha $1+4+5=10$ elettroni: $\mathrm{H{-}C{\equiv}N}$, con una coppia solitaria sull'azoto. $\mathrm{C_2H_2}$ ha $2\times4+2=10$ elettroni: $\mathrm{H{-}C{\equiv}C{-}H}$, senza coppie solitarie. $\mathrm{CS_2}$ ha $4+2\times6=16$ elettroni, come l'anidride carbonica: $\mathrm{S{=}C{=}S}$, con due coppie solitarie su ogni zolfo.
:::

::: esercizio Tre legami carbonio-carbonio [base]
Le lunghezze dei legami carbonio-carbonio nell'etano, nell'etilene e nell'acetilene sono, in ordine sparso, $120$, $134$ e $154\un{pm}$. Associare ogni lunghezza alla molecola e ordinare i tre legami per energia crescente.
>>> soluzione
L'etano ha un legame semplice, $154\un{pm}$; l'etilene un doppio, $134\un{pm}$; l'acetilene un triplo, $120\un{pm}$. L'energia cresce con l'ordine di legame: semplice, doppio, triplo.
:::

::: esercizio Polare o apolare [base]
Ordinare per polarità crescente i legami $\mathrm{H{-}H}$, $\mathrm{C{-}H}$, $\mathrm{H{-}Cl}$, $\mathrm{O{-}H}$ e $\mathrm{Cl{-}Cl}$, e indicare per ciascun legame polare quale atomo porta la carica parziale negativa.
>>> soluzione
Le differenze di elettronegatività valgono $0$ per $\mathrm{H{-}H}$ e $\mathrm{Cl{-}Cl}$, $0{,}35$ per $\mathrm{C{-}H}$, $0{,}96$ per $\mathrm{H{-}Cl}$ e $1{,}24$ per $\mathrm{O{-}H}$. I due legami fra atomi uguali sono apolari; seguono $\mathrm{C{-}H}$, debolmente polare con il carbonio negativo, $\mathrm{H{-}Cl}$, con il cloro negativo, e $\mathrm{O{-}H}$, con l'ossigeno negativo.
:::

::: esercizio Cariche formali [base]
Calcolare le cariche formali degli atomi nello ione ammonio, $\mathrm{NH_4^+}$, e nel monossido di carbonio scritto come $\mathrm{C{\equiv}O}$, con una coppia solitaria su ciascun atomo.
>>> soluzione
Nello ione ammonio l'azoto ha otto elettroni condivisi e nessuno solitario: $5-0-4=+1$; ogni idrogeno ha $1-0-1=0$. La somma è $+1$, la carica dello ione. Nel monossido di carbonio il carbonio ha $4-2-3=-1$, l'ossigeno $6-2-3=+1$.
:::

::: esercizio La carica parziale dell'acido cloridrico [medio]
Il momento dipolare di $\mathrm{HCl}$ è $1{,}109\un{D}$ e la lunghezza di legame $127{,}5\un{pm}$. Calcolare la carica parziale e confrontarla con quella di $\mathrm{HF}$, $0{,}41$.
>>> soluzione
Il momento dipolare vale $\mu\simeq3{,}70\times10^{-30}\un{C\,m}$; un elettrone intero a $127{,}5\un{pm}$ darebbe $e\,d\simeq2{,}04\times10^{-29}\un{C\,m}$. Il rapporto dà $\delta\simeq0{,}18$, meno della metà di quella di $\mathrm{HF}$, in accordo con la minore differenza di elettronegatività.
:::

::: esercizio Lo ione carbonato [medio]
Scrivere le strutture di Lewis dello ione carbonato, $\mathrm{CO_3^{2-}}$, calcolare le cariche formali e l'ordine di ciascun legame carbonio-ossigeno nell'ibrido di risonanza.
>>> soluzione
Gli elettroni di valenza sono $4+3\times6+2=24$. Il carbonio raggiunge l'ottetto con un legame doppio e due semplici, e la posizione del doppio può cadere su uno qualsiasi dei tre ossigeni: tre strutture equivalenti. In ciascuna l'ossigeno con il doppio legame ha carica formale $0$, gli altri due $-1$, il carbonio $0$, per un totale di $-2$. Nell'ibrido quattro coppie di legame sono divise su tre legami, e ogni legame ha ordine $1\tfrac13$.
:::

::: esercizio Idrogeno e bromo [medio]
Con le entalpie di legame $D(\mathrm{H{-}H})=436{,}0$, $D(\mathrm{Br{-}Br})=192{,}9$ e $D(\mathrm{H{-}Br})=366{,}3\un{kJ/mol}$, calcolare l'entalpia della reazione $\mathrm{H_2(g)}+\mathrm{Br_2(g)}\to2\,\mathrm{HBr(g)}$ e confrontarla con quella fra idrogeno e cloro, $-184{,}6\un{kJ}$.
>>> soluzione
I legami rotti valgono in tutto $628{,}9\un{kJ}$, i legami formati $732{,}6\un{kJ}$, e quindi $\Delta_\mathrm{r}H=-103{,}7\un{kJ}$. La reazione con il bromo libera circa metà dell'energia di quella con il cloro, perché i due legami $\mathrm{H{-}Br}$ formati valgono in tutto $131\un{kJ}$ meno dei due legami $\mathrm{H{-}Cl}$, mentre il legame $\mathrm{Br{-}Br}$ costa soltanto $51\un{kJ}$ meno di $\mathrm{Cl{-}Cl}$.
:::

::: esercizio Il legame del perossido [medio]
Stimare l'entalpia del legame $\mathrm{O{-}O}$ nel perossido di idrogeno, $\mathrm{H{-}O{-}O{-}H}$, con $\Delta_\mathrm{f}H^\circ(\mathrm{H_2O_2,g})=-136{,}3\un{kJ/mol}$, $\Delta_\mathrm{f}H^\circ(\mathrm{H,g})=218{,}0\un{kJ/mol}$, $\Delta_\mathrm{f}H^\circ(\mathrm{O,g})=249{,}2\un{kJ/mol}$ e un'entalpia media del legame $\mathrm{O{-}H}$ di $463{,}5\un{kJ/mol}$. Confrontarla con quella del doppio legame di $\mathrm{O_2}$, $498{,}4\un{kJ/mol}$.
>>> soluzione
L'atomizzazione completa richiede $1070{,}7\un{kJ/mol}$, somma di $2\times218{,}0$, $2\times249{,}2$ e $136{,}3$. Togliendo due legami $\mathrm{O{-}H}$, $927{,}0\un{kJ/mol}$, resta $D(\mathrm{O{-}O})\simeq143{,}7\un{kJ/mol}$. Il doppio legame vale circa $3{,}5$ volte il semplice: nel legame semplice le coppie solitarie dei due ossigeni, vicine, si respingono.
:::

::: esercizio L'energia di punto zero [medio]
Per la molecola di idrogeno $D_e=458{,}1\un{kJ/mol}$ e $D_0=432{,}1\un{kJ/mol}$. Calcolare l'energia di punto zero per molecola, in elettronvolt, e confrontarla con l'energia termica $RT$ a $25\,^\circ\mathrm{C}$.
>>> soluzione
L'energia di punto zero vale $26{,}0\un{kJ/mol}$, e dividendo per $N_A$ e per $1{,}602\times10^{-19}\un{J/eV}$ si ottengono circa $0{,}27\un{eV}$ per molecola. $RT$ vale $2{,}48\un{kJ/mol}$, un decimo circa: a temperatura ambiente quasi tutte le molecole di idrogeno restano nel livello vibrazionale più basso.
:::

::: esercizio Idrogeno e deuterio [avanzato]
La costante elastica del legame dell'idrogeno vale $k=575\un{N/m}$. Calcolare l'energia di punto zero armonica, $\tfrac12\hbar\sqrt{k/m_\mathrm{r}}$, per $\mathrm{H_2}$, con $m_\mathrm{r}=0{,}5039\un{u}$, e per $\mathrm{D_2}$, con $m_\mathrm{r}=1{,}0071\un{u}$. Sapendo che la profondità della buca è la stessa per le due molecole, $D_e=458{,}1\un{kJ/mol}$, stimare $D_0$ del deuterio e confrontarla con il valore misurato, $439{,}6\un{kJ/mol}$.
>>> soluzione
Per $\mathrm{H_2}$, $m_\mathrm{r}=8{,}368\times10^{-28}\un{kg}$, $\omega=\sqrt{k/m_\mathrm{r}}\simeq8{,}29\times10^{14}\un{rad/s}$, e $\tfrac12\hbar\omega\simeq4{,}37\times10^{-20}\un{J}$, cioè $26{,}3\un{kJ/mol}$. Per $\mathrm{D_2}$ la massa ridotta è circa doppia e l'energia di punto zero minore di $\sqrt2$: $18{,}6\un{kJ/mol}$. La stima $D_0\simeq458{,}1-18{,}6=439{,}5\un{kJ/mol}$ coincide con la misura entro $0{,}1\un{kJ/mol}$.
:::

::: esercizio Ordini di legame frazionari [avanzato]
Con il diagramma degli orbitali molecolari formati da due orbitali $1s$, calcolare l'ordine di legame di $\mathrm{H_2^+}$, $\mathrm{H_2}$, $\mathrm{H_2^-}$, $\mathrm{He_2^+}$ e $\mathrm{He_2}$. Quali specie dovrebbero esistere?
>>> soluzione
Gli elettroni sono uno, due, tre, tre e quattro. Gli ordini di legame valgono $\tfrac12$, $1$, $\tfrac12(2-1)=\tfrac12$, $\tfrac12$ e $0$. Tutte le specie con ordine positivo sono legate: $\mathrm{H_2^+}$ e $\mathrm{He_2^+}$ sono note e studiate per via spettroscopica, con energie di dissociazione di circa $256$ e $229\un{kJ/mol}$. $\mathrm{He_2}$, con ordine zero, non forma un legame chimico.
:::

::: esercizio La famiglia dell'ossigeno [avanzato]
Calcolare l'ordine di legame e il numero di elettroni spaiati di $\mathrm{O_2^+}$, $\mathrm{O_2}$, $\mathrm{O_2^-}$ e $\mathrm{O_2^{2-}}$. Associare alle quattro specie le lunghezze di legame, in ordine sparso, $121$, $149$, $112$ e circa $133\un{pm}$. Quali specie sono paramagnetiche?
>>> soluzione
Gli elettroni negli orbitali $\pi^*_{2p}$ sono uno, due, tre e quattro; gli ordini di legame valgono $2\tfrac12$, $2$, $1\tfrac12$ e $1$, e le lunghezze crescono nello stesso verso: $112$, $121$, circa $133$ e $149\un{pm}$. Gli elettroni spaiati sono uno, due, uno e zero: sono paramagnetiche tutte tranne lo ione perossido.
:::

::: esercizio Un fotone per spezzare l'idrogeno [avanzato]
L'energia di dissociazione della molecola di idrogeno è $D_0=4{,}478\un{eV}$. Calcolare la lunghezza d'onda di un fotone che porta esattamente questa energia. Le molecole di idrogeno si dissociano per assorbimento diretto di luce soltanto a lunghezze d'onda molto più corte; proporre una spiegazione.
>>> soluzione
L'energia vale $E=7{,}175\times10^{-19}\un{J}$, e $\lambda=hc/E\simeq2{,}769\times10^{-7}\un{m}$, cioè $276{,}9\un{nm}$, nell'ultravioletto. Un fotone non può semplicemente allontanare i nuclei. Deve portare la molecola in uno stato elettronico eccitato, e il primo stato eccitato raggiungibile per assorbimento si trova a più di $10\un{eV}$ sopra il fondamentale. Per questo l'idrogeno è trasparente alla luce visibile e all'ultravioletto vicino.
:::

::: esercizio La serie degli acidi alogenidrici [avanzato]
Con i dati della tabella, calcolare la carica parziale di ciascuna molecola e la differenza di elettronegatività dei due atomi. Che cosa si osserva?

| molecola | $\mu$ (D) | $d$ (pm) | $D$ (kJ/mol) |
|---|---|---|---|
| $\mathrm{HF}$ | $1{,}826$ | $91{,}7$ | $568$ |
| $\mathrm{HBr}$ | $0{,}827$ | $141{,}4$ | $366$ |
| $\mathrm{HI}$ | $0{,}448$ | $160{,}9$ | $298$ |
>>> soluzione
Con $\delta=\mu/(e\,d)$ si ottengono $0{,}41$, $0{,}12$ e $0{,}06$; le differenze di elettronegatività sono $1{,}78$, $0{,}76$ e $0{,}46$. La carica parziale cresce con la differenza di elettronegatività, più rapidamente che in proporzione. Nello stesso verso cresce l'energia di legame: dallo iodio al fluoro il legame si accorcia, diventa più polare e quasi raddoppia la sua energia.
:::

## Fonti {#fonti}

Il testo, le figure, gli esempi e gli esercizi di questo capitolo sono originali. Per la scelta e l'ordine degli argomenti il riferimento principale è il manuale di R. H. Petrucci, F. G. Herring, J. D. Madura e C. Bissonnette, *General Chemistry: Principles and Modern Applications*, 11ª edizione, Pearson Canada, Toronto, 2017, paragrafi 10-2–10-6, 10-8, 10-9, 11-2 e 11-5. I dati numerici provengono dalle fonti seguenti.

1. Costanti delle molecole biatomiche ($r_e$, $D_0$, $D_e$, frequenze di vibrazione) di $\mathrm{H_2}$, $\mathrm{D_2}$, $\mathrm{N_2}$, $\mathrm{O_2}$, $\mathrm{O_2^+}$, $\mathrm{F_2}$ e degli acidi alogenidrici: K. P. Huber e G. Herzberg, *Constants of Diatomic Molecules*, Van Nostrand Reinhold, 1979, nella versione del NIST Chemistry WebBook. $\mathrm{H_2^+}$ e $\mathrm{He_2^+}$: misure spettroscopiche recenti, fra cui Phys. Rev. A 112 (2025) 022815 per $\mathrm{He_2^+}$.
2. Entalpie standard di formazione di atomi e molecole gassose: tabella D.2 dell'appendice dello stesso manuale; clorometano dal NIST Chemistry WebBook. Entalpie di dissociazione di legami specifici dalle raccolte di Y.-R. Luo, *Comprehensive Handbook of Chemical Bond Energies*, CRC Press, 2007.
3. Momenti dipolari: tabelle del CRC Handbook of Chemistry and Physics. Elettronegatività: scala di Pauling nella revisione di A. L. Allred (1961). Lunghezze dei legami carbonio-carbonio e del benzene dalle determinazioni strutturali in fase gassosa.
4. Costanti fondamentali: CODATA 2022.
5. Per la storia: G. N. Lewis, J. Am. Chem. Soc. 38 (1916) 762; I. Langmuir, J. Am. Chem. Soc. 41 (1919) 868; W. Heitler e F. London, Z. Phys. 44 (1927) 455; P. M. Morse, Phys. Rev. 34 (1929) 57; L. Pauling, J. Am. Chem. Soc. 53 (1931) 1367 e *The Nature of the Chemical Bond*, Cornell University Press, 1939; F. Hund e R. S. Mulliken per gli orbitali molecolari (1927–1932).
