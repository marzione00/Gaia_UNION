---
unit: chemistry-06
titolo: Legame ionico e interazioni elettrostatiche
sottotitolo: Ioni, cristalli ed energia reticolare
volume: Volume di chimica
fonte: Testo originale; riferimento principale Petrucci et al., General Chemistry, 11ª ed., §3-1, 3-5, 9-2, 10-1, 12-6, 12-7
---

## Prima di cominciare {#apertura}

Sulle rive di un lago salato del pianeta vulcanico la stazione raccoglie cristalli bianchi a forma di piccoli cubi. Allo stato solido non conducono la corrente elettrica; sciolti in acqua danno una soluzione che la conduce bene; fondono soltanto a temperature di diverse centinaia di gradi, e colpiti con un martello si spezzano lungo superfici piane. Sono le proprietà tipiche dei **composti ionici**, e il cloruro di sodio, il comune sale da cucina, che fonde a $801\,^\circ\mathrm{C}$, ne è l'esempio più noto.

Il capitolo [Periodicità e carica efficace](unit:chemistry-05) ha mostrato che strappare un elettrone a un atomo di sodio richiede energia, e che un atomo di cloro ne libera catturandolo, ma meno di quanta ne serve per il sodio. Eppure sodio e cloro reagiscono con violenza, e il prodotto è uno dei solidi più stabili che si conoscano. La chiave sta nell'attrazione fra ioni di carica opposta, che una volta formati si dispongono in un cristallo ordinato e liberano molta più energia di quella spesa per formarli. Questo capitolo segue il bilancio energetico dall'atomo isolato al cristallo, e mostra come la carica e le dimensioni degli ioni ne determinano le proprietà.

::: obiettivi
- individuare gli elettroni di valenza e scrivere i simboli di Lewis degli elementi rappresentativi;
- prevedere la carica degli ioni dei gruppi principali e scrivere formule e nomi dei composti ionici;
- calcolare con la legge di Coulomb l'energia di una coppia di ioni;
- descrivere il reticolo del cloruro di sodio e calcolare la densità di un cristallo dalla sua cella;
- costruire un ciclo di Born e Haber e ricavarne l'energia reticolare;
- spiegare come carica e raggio degli ioni influiscono su energia reticolare e temperatura di fusione;
- collocare un legame fra ionico e covalente in base alla differenza di elettronegatività.
:::

Il capitolo usa energie di ionizzazione, affinità elettroniche e raggi ionici del capitolo precedente, e le entalpie di formazione di [Termochimica e calorimetria](unit:chemistry-16). Il legame in cui gli elettroni vengono condivisi invece che trasferiti è l'argomento di [Legame covalente ed energia di legame](unit:chemistry-07).

## Elettroni di valenza e simboli di Lewis {#valenza}

La chimica di un elemento dipende soprattutto dagli elettroni del guscio più esterno, gli **elettroni di valenza**. Per gli elementi dei gruppi principali il loro numero si legge dalla tavola periodica: uno per i metalli alcalini, due per gli alcalino-terrosi, e nei gruppi da $13$ a $18$ il numero del gruppo meno dieci. Gli elettroni interni, che formano il nocciolo con la configurazione del gas nobile precedente, non partecipano ai legami ordinari.

Nel 1916, indipendentemente, il chimico americano Gilbert Newton Lewis e il fisico tedesco Walther Kossel osservarono che gli atomi tendono a perdere, acquistare o condividere elettroni fino a raggiungere la configurazione di un gas nobile, cioè otto elettroni nel guscio esterno per quasi tutti gli elementi, due per l'idrogeno e per il litio. È la **regola dell'ottetto**, una regola empirica con numerose eccezioni ma utilissima per gli elementi del secondo e del terzo periodo.

Lewis introdusse una notazione compatta: il **simbolo di Lewis** di un elemento è il suo simbolo chimico circondato da tanti punti quanti sono i suoi elettroni di valenza. I punti si dispongono sui quattro lati del simbolo, uno per lato finché è possibile, e poi a coppie.

::: figura lewis
{"w":640,"h":250,"items":[{"t":"text","p":[70,67],"s":"Li","c":"ax","size":20},{"t":"circle","p":[70.0,40,2.6],"c":"force"},{"t":"text","p":[142,67],"s":"Be","c":"ax","size":20},{"t":"circle","p":[142.0,40,2.6],"c":"force"},{"t":"circle","p":[162,60.0,2.6],"c":"force"},{"t":"text","p":[214,67],"s":"B","c":"ax","size":20},{"t":"circle","p":[214.0,40,2.6],"c":"force"},{"t":"circle","p":[234,60.0,2.6],"c":"force"},{"t":"circle","p":[214.0,80,2.6],"c":"force"},{"t":"text","p":[286,67],"s":"C","c":"ax","size":20},{"t":"circle","p":[286.0,40,2.6],"c":"force"},{"t":"circle","p":[306,60.0,2.6],"c":"force"},{"t":"circle","p":[286.0,80,2.6],"c":"force"},{"t":"circle","p":[266,60.0,2.6],"c":"force"},{"t":"text","p":[358,67],"s":"N","c":"ax","size":20},{"t":"circle","p":[354.0,40,2.6],"c":"force"},{"t":"circle","p":[362.0,40,2.6],"c":"force"},{"t":"circle","p":[378,60.0,2.6],"c":"force"},{"t":"circle","p":[358.0,80,2.6],"c":"force"},{"t":"circle","p":[338,60.0,2.6],"c":"force"},{"t":"text","p":[430,67],"s":"O","c":"ax","size":20},{"t":"circle","p":[426.0,40,2.6],"c":"force"},{"t":"circle","p":[434.0,40,2.6],"c":"force"},{"t":"circle","p":[450,56.0,2.6],"c":"force"},{"t":"circle","p":[450,64.0,2.6],"c":"force"},{"t":"circle","p":[430.0,80,2.6],"c":"force"},{"t":"circle","p":[410,60.0,2.6],"c":"force"},{"t":"text","p":[502,67],"s":"F","c":"ax","size":20},{"t":"circle","p":[498.0,40,2.6],"c":"force"},{"t":"circle","p":[506.0,40,2.6],"c":"force"},{"t":"circle","p":[522,56.0,2.6],"c":"force"},{"t":"circle","p":[522,64.0,2.6],"c":"force"},{"t":"circle","p":[498.0,80,2.6],"c":"force"},{"t":"circle","p":[506.0,80,2.6],"c":"force"},{"t":"circle","p":[482,60.0,2.6],"c":"force"},{"t":"text","p":[574,67],"s":"Ne","c":"ax","size":20},{"t":"circle","p":[570.0,40,2.6],"c":"force"},{"t":"circle","p":[578.0,40,2.6],"c":"force"},{"t":"circle","p":[594,56.0,2.6],"c":"force"},{"t":"circle","p":[594,64.0,2.6],"c":"force"},{"t":"circle","p":[570.0,80,2.6],"c":"force"},{"t":"circle","p":[578.0,80,2.6],"c":"force"},{"t":"circle","p":[554,56.0,2.6],"c":"force"},{"t":"circle","p":[554,64.0,2.6],"c":"force"},{"t":"text","p":[70,157],"s":"Na","c":"ax","size":20},{"t":"circle","p":[70.0,130,2.6],"c":"force"},{"t":"text","p":[142,157],"s":"Mg","c":"ax","size":20},{"t":"circle","p":[142.0,130,2.6],"c":"force"},{"t":"circle","p":[162,150.0,2.6],"c":"force"},{"t":"text","p":[214,157],"s":"Al","c":"ax","size":20},{"t":"circle","p":[214.0,130,2.6],"c":"force"},{"t":"circle","p":[234,150.0,2.6],"c":"force"},{"t":"circle","p":[214.0,170,2.6],"c":"force"},{"t":"text","p":[286,157],"s":"Si","c":"ax","size":20},{"t":"circle","p":[286.0,130,2.6],"c":"force"},{"t":"circle","p":[306,150.0,2.6],"c":"force"},{"t":"circle","p":[286.0,170,2.6],"c":"force"},{"t":"circle","p":[266,150.0,2.6],"c":"force"},{"t":"text","p":[358,157],"s":"P","c":"ax","size":20},{"t":"circle","p":[354.0,130,2.6],"c":"force"},{"t":"circle","p":[362.0,130,2.6],"c":"force"},{"t":"circle","p":[378,150.0,2.6],"c":"force"},{"t":"circle","p":[358.0,170,2.6],"c":"force"},{"t":"circle","p":[338,150.0,2.6],"c":"force"},{"t":"text","p":[430,157],"s":"S","c":"ax","size":20},{"t":"circle","p":[426.0,130,2.6],"c":"force"},{"t":"circle","p":[434.0,130,2.6],"c":"force"},{"t":"circle","p":[450,146.0,2.6],"c":"force"},{"t":"circle","p":[450,154.0,2.6],"c":"force"},{"t":"circle","p":[430.0,170,2.6],"c":"force"},{"t":"circle","p":[410,150.0,2.6],"c":"force"},{"t":"text","p":[502,157],"s":"Cl","c":"ax","size":20},{"t":"circle","p":[498.0,130,2.6],"c":"force"},{"t":"circle","p":[506.0,130,2.6],"c":"force"},{"t":"circle","p":[522,146.0,2.6],"c":"force"},{"t":"circle","p":[522,154.0,2.6],"c":"force"},{"t":"circle","p":[498.0,170,2.6],"c":"force"},{"t":"circle","p":[506.0,170,2.6],"c":"force"},{"t":"circle","p":[482,150.0,2.6],"c":"force"},{"t":"text","p":[574,157],"s":"Ar","c":"ax","size":20},{"t":"circle","p":[570.0,130,2.6],"c":"force"},{"t":"circle","p":[578.0,130,2.6],"c":"force"},{"t":"circle","p":[594,146.0,2.6],"c":"force"},{"t":"circle","p":[594,154.0,2.6],"c":"force"},{"t":"circle","p":[570.0,170,2.6],"c":"force"},{"t":"circle","p":[578.0,170,2.6],"c":"force"},{"t":"circle","p":[554,146.0,2.6],"c":"force"},{"t":"circle","p":[554,154.0,2.6],"c":"force"},{"t":"text","p":[20,64],"s":"2","c":"muted","size":12},{"t":"text","p":[20,154],"s":"3","c":"muted","size":12},{"t":"text","p":[70,212],"s":"1","c":"muted","size":11},{"t":"text","p":[142,212],"s":"2","c":"muted","size":11},{"t":"text","p":[214,212],"s":"13","c":"muted","size":11},{"t":"text","p":[286,212],"s":"14","c":"muted","size":11},{"t":"text","p":[358,212],"s":"15","c":"muted","size":11},{"t":"text","p":[430,212],"s":"16","c":"muted","size":11},{"t":"text","p":[502,212],"s":"17","c":"muted","size":11},{"t":"text","p":[574,212],"s":"18","c":"muted","size":11},{"t":"text","p":[320,236],"s":"gruppo","c":"muted","size":11}]}
---
I simboli di Lewis degli elementi del secondo e del terzo periodo. Gli elementi dello stesso gruppo hanno lo stesso numero di elettroni di valenza e lo stesso simbolo, a parte la lettera; i gas nobili hanno l'ottetto completo.
:::

## Gli ioni degli elementi rappresentativi {#ioni}

Un metallo con pochi elettroni di valenza e bassa energia di ionizzazione li cede facilmente, e diventa un catione con la configurazione del gas nobile precedente. Un non metallo con molti elettroni di valenza e affinità elettronica elevata ne acquista fino a completare l'ottetto, e diventa un anione con la configurazione del gas nobile successivo. Le cariche degli ioni monoatomici più comuni si leggono quindi dalla posizione nella tavola.

| Gruppo | elettroni di valenza | ione tipico | esempi |
|---|---|---|---|
| $1$ | $1$ | $\mathrm{M^+}$ | $\mathrm{Li^+}$, $\mathrm{Na^+}$, $\mathrm{K^+}$ |
| $2$ | $2$ | $\mathrm{M^{2+}}$ | $\mathrm{Mg^{2+}}$, $\mathrm{Ca^{2+}}$, $\mathrm{Ba^{2+}}$ |
| $13$ | $3$ | $\mathrm{M^{3+}}$ | $\mathrm{Al^{3+}}$ |
| $15$ | $5$ | $\mathrm{X^{3-}}$ | $\mathrm{N^{3-}}$ |
| $16$ | $6$ | $\mathrm{X^{2-}}$ | $\mathrm{O^{2-}}$, $\mathrm{S^{2-}}$ |
| $17$ | $7$ | $\mathrm{X^-}$ | $\mathrm{F^-}$, $\mathrm{Cl^-}$, $\mathrm{Br^-}$ |

Il limite superiore della carica di un catione è fissato dalle energie di ionizzazione successive, che il capitolo precedente ha mostrato saltare bruscamente quando si arriva al nocciolo. Il magnesio si ferma a $\mathrm{Mg^{2+}}$, perché il terzo elettrone apparterrebbe al guscio $2p$ completo. Per gli anioni il limite è opposto: aggiungere elettroni a uno ione già negativo costa energia, e soltanto la presenza dei cationi nel cristallo rende possibili ioni come $\mathrm{O^{2-}}$ e $\mathrm{N^{3-}}$.

I metalli di transizione formano spesso ioni di carica diversa, perché perdono prima gli elettroni $ns$ e poi un numero variabile di elettroni $(n-1)d$: il ferro forma $\mathrm{Fe^{2+}}$ e $\mathrm{Fe^{3+}}$, il rame $\mathrm{Cu^+}$ e $\mathrm{Cu^{2+}}$. Questi ioni in generale non hanno la configurazione di un gas nobile, e la regola dell'ottetto non si applica.

Molti composti ionici contengono **ioni poliatomici**, gruppi di atomi legati covalentemente fra loro che portano complessivamente una carica. I più comuni sono lo ione ammonio $\mathrm{NH_4^+}$, l'idrossido $\mathrm{OH^-}$, il nitrato $\mathrm{NO_3^-}$, il carbonato $\mathrm{CO_3^{2-}}$, il solfato $\mathrm{SO_4^{2-}}$ e il fosfato $\mathrm{PO_4^{3-}}$. Nel solido e in soluzione si comportano come un'unica entità.

::: figura trasferimento
{"w":640,"h":175,"items":[{"t":"text","p":[70,90],"s":"Na","c":"ax","size":24},{"t":"circle","p":[96,82,3],"c":"force"},{"t":"text","p":[150,90],"s":"+","c":"muted","size":22},{"t":"text","p":[230,90],"s":"Cl","c":"ax","size":24},{"t":"circle","p":[234,58,3],"c":"force2"},{"t":"circle","p":[242,58,3],"c":"force2"},{"t":"circle","p":[260,76,3],"c":"force2"},{"t":"circle","p":[260,88,3],"c":"force2"},{"t":"circle","p":[234,104,3],"c":"force2"},{"t":"circle","p":[242,104,3],"c":"force2"},{"t":"circle","p":[210,80,3],"c":"force2"},{"t":"poly","pts":[[98,76],[140,40],[195,52],[204,76]],"c":"force","w":1.4},{"t":"arrow","p":[200,70,205,78],"c":"force","w":1.4,"head":6},{"t":"arrow","p":[290,82,350,82],"c":"ax","w":2,"head":9},{"t":"text","p":[400,90],"s":"Na⁺","c":"ax","size":24},{"t":"text","p":[470,90],"s":"[","c":"ax","size":30},{"t":"text","p":[510,90],"s":"Cl","c":"ax","size":24},{"t":"text","p":[560,90],"s":"]⁻","c":"ax","size":30},{"t":"circle","p":[510,58,3],"c":"force2"},{"t":"circle","p":[518,58,3],"c":"force2"},{"t":"circle","p":[538,78,3],"c":"force2"},{"t":"circle","p":[538,86,3],"c":"force2"},{"t":"circle","p":[510,104,3],"c":"force2"},{"t":"circle","p":[518,104,3],"c":"force2"},{"t":"circle","p":[490,78,3],"c":"force2"},{"t":"circle","p":[490,86,3],"c":"force"},{"t":"text","p":[70,150],"s":"[Ne] 3s¹","c":"muted","size":12},{"t":"text","p":[230,150],"s":"[Ne] 3s² 3p⁵","c":"muted","size":12},{"t":"text","p":[400,150],"s":"[Ne]","c":"muted","size":12},{"t":"text","p":[515,150],"s":"[Ar]","c":"muted","size":12}]}
---
La formazione del cloruro di sodio descritta con i simboli di Lewis. Il sodio cede il suo elettrone di valenza al cloro; entrambi gli ioni raggiungono la configurazione di un gas nobile, il neon per il sodio e l'argon per il cloro.
:::

## Formule e nomi dei composti ionici {#formule}

Un composto ionico è elettricamente neutro: la somma delle cariche positive è uguale alla somma delle cariche negative. La **formula** di un composto ionico indica quindi il rapporto più semplice fra i numeri di cationi e di anioni che garantisce la neutralità. Il calcio forma $\mathrm{Ca^{2+}}$, il cloro $\mathrm{Cl^-}$: servono due ioni cloruro per ogni ione calcio, e la formula è $\mathrm{CaCl_2}$. Alluminio e ossigeno formano $\mathrm{Al^{3+}}$ e $\mathrm{O^{2-}}$; il minimo comune multiplo delle cariche è $6$, e la formula è $\mathrm{Al_2O_3}$. Un ione poliatomico ripetuto si racchiude fra parentesi: il solfato di ammonio è $(\mathrm{NH_4})_2\mathrm{SO_4}$.

La formula di un composto ionico non descrive una molecola. Nel cristallo di cloruro di sodio mancano coppie isolate $\mathrm{Na{-}Cl}$, perché ogni ione è circondato da molti ioni di carica opposta, e la formula indica soltanto il rapporto uno a uno. Per questo, parlando dei composti ionici, si preferisce il termine **unità formula** a quello di molecola.

I nomi seguono regole semplici. Il nome dell'anione precede quello del catione: per gli anioni monoatomici si usa la radice dell'elemento con il suffisso «-uro», tranne che per l'ossigeno, il cui anione è l'ossido: cloruro di sodio, fluoruro di calcio, solfuro di potassio, nitruro di magnesio, ossido di alluminio. Per i metalli che formano più cationi la carica si indica con un numero romano fra parentesi, secondo la notazione proposta da Alfred Stock: cloruro di ferro(II), $\mathrm{FeCl_2}$, e cloruro di ferro(III), $\mathrm{FeCl_3}$. I nomi tradizionali, ancora diffusi, distinguono le due cariche con i suffissi «-oso» e «-ico»: cloruro ferroso e cloruro ferrico.

::: esempio Formule dalle cariche
Scrivere la formula e il nome dei composti formati da magnesio e azoto, da potassio e zolfo, e da sodio e ione fosfato.

Il magnesio forma $\mathrm{Mg^{2+}}$, l'azoto $\mathrm{N^{3-}}$: per la neutralità servono tre ioni magnesio, carica $+6$, e due ioni nitruro, carica $-6$. La formula è $\mathrm{Mg_3N_2}$, nitruro di magnesio. Il potassio forma $\mathrm{K^+}$, lo zolfo $\mathrm{S^{2-}}$: $\mathrm{K_2S}$, solfuro di potassio. Lo ione fosfato ha carica $-3$: $\mathrm{Na_3PO_4}$, fosfato di sodio.
:::

## L'attrazione fra ioni {#coulomb}

Due cariche elettriche $q_1$ e $q_2$ a distanza $r$ si attraggono o si respingono con un'energia potenziale data dalla **legge di Coulomb**:

$$E=\frac{1}{4\pi\varepsilon_0}\,\frac{q_1q_2}{r},\qquad\frac{1}{4\pi\varepsilon_0}=8{,}988\times10^{9}\un{N\,m^2/C^2}.$$

Per cariche opposte $E$ è negativa e diventa più negativa quando la distanza diminuisce: le cariche si attraggono. Il valore assoluto cresce con il prodotto delle cariche e diminuisce con la distanza, come $1/r$.

Per una coppia isolata di ioni $\mathrm{Na^+}$ e $\mathrm{Cl^-}$ in fase gassosa la distanza di equilibrio fra i nuclei è di circa $236\un{pm}$. A quella distanza l'energia di Coulomb vale
$$E=-\frac{8{,}988\times10^9\times(1{,}602\times10^{-19})^2}{2{,}36\times10^{-10}}\un{J}\simeq-9{,}78\times10^{-19}\un{J},$$
cioè $-6{,}10\un{eV}$ per coppia e circa $-589\un{kJ}$ per mole di coppie. Il capitolo precedente ha calcolato che trasformare una mole di atomi gassosi di sodio e di cloro in ioni gassosi lontani costa $147\un{kJ}$; l'avvicinamento degli ioni ne restituisce quattro volte tanto, e la coppia di ioni è nettamente più stabile degli atomi separati.

Gli ioni però non possono avvicinarsi indefinitamente. Quando le nubi elettroniche cominciano a sovrapporsi, il principio di Pauli e la repulsione fra i nuclei producono una forza repulsiva che cresce molto rapidamente al diminuire della distanza. La distanza di equilibrio è quella alla quale attrazione e repulsione si bilanciano, e l'energia è minima.

::: figura coulomb
{"w":640,"h":265,"items":[{"t":"line","p":[80,60,600,60],"c":"ax","w":1.2},{"t":"arrow","p":[80,250,80,20],"c":"ax","w":1.6,"head":9},{"t":"text","p":[88,26],"s":"energia (kJ/mol)","c":"ax","size":13,"a":"start"},{"t":"text","p":[598,82],"s":"distanza (pm)","c":"ax","size":13,"a":"end"},{"t":"line","p":[125.0,56,125.0,64],"c":"ax","w":1.2},{"t":"text","p":[125.0,48],"s":"200","c":"muted","size":11},{"t":"line","p":[215.0,56,215.0,64],"c":"ax","w":1.2},{"t":"text","p":[215.0,48],"s":"300","c":"muted","size":11},{"t":"line","p":[305.0,56,305.0,64],"c":"ax","w":1.2},{"t":"text","p":[305.0,48],"s":"400","c":"muted","size":11},{"t":"line","p":[395.0,56,395.0,64],"c":"ax","w":1.2},{"t":"text","p":[395.0,48],"s":"500","c":"muted","size":11},{"t":"line","p":[76,126.0,84,126.0],"c":"ax","w":1.2},{"t":"text","p":[72,130.0],"s":"−200","c":"muted","size":11,"a":"end"},{"t":"line","p":[76,192.0,84,192.0],"c":"ax","w":1.2},{"t":"text","p":[72,196.0],"s":"−400","c":"muted","size":11,"a":"end"},{"t":"line","p":[76,258.0,84,258.0],"c":"ax","w":1.2},{"t":"text","p":[72,262.0],"s":"−600","c":"muted","size":11,"a":"end"},{"t":"plot","o":[80,60],"sx":0.9,"sy":0.33,"pts":[[75,-617.4909227],[80,-604.067207],[85,-591.2147132],[90,-578.89774],[95,-567.0835004],[100,-555.7418304],[105,-544.8449318],[110,-534.3671446],[115,-524.2847457],[120,-514.5757689],[125,-505.2198458],[130,-496.1980629],[135,-487.4928337],[140,-479.0877848],[145,-470.9676529],[150,-463.118192],[155,-455.5260905],[160,-448.1788955],[165,-441.0649448],[170,-434.173305],[175,-427.4937157],[180,-421.0165382],[185,-414.7327093],[190,-408.6336988],[195,-402.7114713],[200,-396.9584503],[205,-391.3674862],[210,-385.9318267],[215,-380.6450893],[220,-375.5012368],[225,-370.4945536],[230,-365.6196253],[235,-360.8713184],[240,-356.2447631],[245,-351.7353357],[250,-347.338644],[255,-343.0505126],[260,-338.8669698],[265,-334.7842352],[270,-330.7987086],[275,-326.9069591],[280,-323.1057153],[285,-319.3918566],[290,-315.7624036],[295,-312.2145115],[300,-308.7454613],[305,-305.3526541],[310,-302.0336035],[315,-298.7859303],[320,-295.6073566],[325,-292.4957002],[330,-289.44887],[335,-286.464861],[340,-283.5417502],[345,-280.6776921],[350,-277.8709152],[355,-275.119718],[360,-272.4224659],[365,-269.7775876],[370,-267.1835723],[375,-264.6389669],[380,-262.1423728],[385,-259.6924441],[390,-257.2878844],[395,-254.9274451],[400,-252.6099229],[405,-250.3341578],[410,-248.0990314],[415,-245.9034648],[420,-243.7464168],[425,-241.6268828],[430,-239.5438924],[435,-237.4965087],[440,-235.4838264],[445,-233.5049708],[450,-231.559096],[455,-229.6453845],[460,-227.7630452],[465,-225.9113132],[470,-224.0894477],[475,-222.2967322],[480,-220.5324724],[485,-218.7959962],[490,-217.0866525],[495,-215.4038102],[500,-213.7468578],[505,-212.1152024],[510,-210.5082691],[515,-208.9255002],[520,-207.3663546],[525,-205.8303076],[530,-204.3168494],[535,-202.8254855],[540,-201.3557357],[545,-199.9071332],[550,-198.4792251],[555,-197.0715711],[560,-195.6837431],[565,-194.3153253],[570,-192.9659133]],"c":"force2","w":1.6,"dash":true},{"t":"plot","o":[80,60],"sx":0.9,"sy":0.33,"pts":[[55,-445.4164742],[58,-464.1155585],[61,-479.2674517],[64,-491.418156],[67,-501.0267889],[70,-508.4802288],[73,-514.1051431],[76,-518.1778932],[79,-520.9327129],[82,-522.5684783],[85,-523.2543252],[88,-523.1343215],[91,-522.3313632],[94,-520.950429],[97,-519.0813069],[100,-516.8008813],[103,-514.1750577],[106,-511.2603831],[109,-508.1054155],[112,-504.7518815],[115,-501.2356577],[118,-497.5876039],[121,-493.8342714],[124,-489.9985075],[127,-486.0999696],[130,-482.1555662],[133,-478.1798337],[136,-474.1852593],[139,-470.1825585],[142,-466.1809138],[145,-462.1881795],[148,-458.2110595],[151,-454.2552592],[154,-450.3256183],[157,-446.4262243],[160,-442.5605122],[163,-438.7313494],[166,-434.9411108],[169,-431.1917435],[172,-427.4848224],[175,-423.8216],[178,-420.2030481],[181,-416.6298961],[184,-413.1026622],[187,-409.6216827],[190,-406.1871361],[193,-402.799065],[196,-399.4573948],[199,-396.1619503],[202,-392.9124703],[205,-389.7086197],[208,-386.5500013],[211,-383.4361648],[214,-380.3666158],[217,-377.3408228],[220,-374.358224],[223,-371.4182325],[226,-368.5202419],[229,-365.6636302],[232,-362.8477635],[235,-360.0719996],[238,-357.3356905],[241,-354.6381853],[244,-351.9788319],[247,-349.3569792],[250,-346.7719786],[253,-344.2231853],[256,-341.7099594],[259,-339.2316675],[262,-336.7876826],[265,-334.3773857],[268,-332.0001659],[271,-329.6554209],[274,-327.3425577],[277,-325.0609927],[280,-322.810152],[283,-320.5894718],[286,-318.3983979],[289,-316.2363867],[292,-314.1029046],[295,-311.9974281],[298,-309.9194441],[301,-307.8684494],[304,-305.8439511],[307,-303.8454663],[310,-301.8725218],[313,-299.9246543],[316,-298.0014102],[319,-296.1023453],[322,-294.2270249],[325,-292.3750233],[328,-290.5459241],[331,-288.7393196],[334,-286.9548108],[337,-285.1920075],[340,-283.4505277],[343,-281.7299976],[346,-280.0300514],[349,-278.3503314],[352,-276.6904873],[355,-275.0501765],[358,-273.4290637],[361,-271.8268209],[364,-270.243127],[367,-268.6776679],[370,-267.130136],[373,-265.6002304],[376,-264.0876567],[379,-262.5921266],[382,-261.1133579],[385,-259.6510744],[388,-258.2050057],[391,-256.7748872],[394,-255.3604596],[397,-253.9614692],[400,-252.5776675],[403,-251.2088112],[406,-249.854662],[409,-248.5149865],[412,-247.189556],[415,-245.8781467],[418,-244.5805392],[421,-243.2965185],[424,-242.0258742],[427,-240.7683998],[430,-239.5238931],[433,-238.2921561],[436,-237.0729945],[439,-235.866218],[442,-234.6716399],[445,-233.4890775],[448,-232.3183512],[451,-231.1592853],[454,-230.0117074],[457,-228.8754484],[460,-227.7503425],[463,-226.636227],[466,-225.5329424],[469,-224.4403322],[472,-223.358243],[475,-222.286524],[478,-221.2250276],[481,-220.1736086],[484,-219.1321247],[487,-218.1004364],[490,-217.0784064],[493,-216.0659003],[496,-215.062786],[499,-214.0689337],[502,-213.0842161],[505,-212.1085083],[508,-211.1416874],[511,-210.183633],[514,-209.2342265],[517,-208.2933518],[520,-207.3608946],[523,-206.4367427],[526,-205.5207858],[529,-204.6129157],[532,-203.713026],[535,-202.821012],[538,-201.9367711],[541,-201.0602022],[544,-200.1912062],[547,-199.3296854],[550,-198.475544],[553,-197.6286877],[556,-196.7890239],[559,-195.9564614],[562,-195.1309107],[565,-194.3122836],[568,-193.5004937]],"c":"force4","w":2.4},{"t":"circle","p":[157.4,232.7,4.5],"c":"force"},{"t":"text","p":[167.4,250.7],"s":"minimo a 236 pm","c":"force","size":12,"a":"start"},{"t":"text","p":[449.0,165.9],"s":"solo attrazione di Coulomb","c":"force2","size":11},{"t":"text","p":[315.0,200.4],"s":"attrazione + repulsione","c":"force4","size":11,"a":"start"}]}
---
L'energia di una coppia di ioni $\mathrm{Na^+}$ e $\mathrm{Cl^-}$ in funzione della distanza fra i nuclei, in un modello semplice. La curva tratteggiata è la sola attrazione di Coulomb; la curva piena aggiunge una repulsione a corto raggio, e ha il minimo alla distanza di equilibrio di $236\un{pm}$.
:::

## Il cristallo ionico {#reticolo}

In un campione macroscopico gli ioni non formano coppie isolate. Ogni catione attira tutti gli anioni che lo circondano e respinge gli altri cationi, e la disposizione più stabile è un **reticolo cristallino** tridimensionale in cui ogni ione è circondato da ioni di carica opposta e tenuto lontano da quelli della stessa carica.

Nel 1913 William Lawrence Bragg, appena ventitreenne, determinò con la diffrazione dei raggi X la struttura del cloruro di sodio, la prima struttura cristallina risolta. Gli ioni $\mathrm{Na^+}$ e $\mathrm{Cl^-}$ si alternano lungo tre direzioni perpendicolari, come le caselle bianche e nere di una scacchiera tridimensionale. Ogni ione ha sei vicini di carica opposta, disposti ai vertici di un ottaedro: si dice che ha **numero di coordinazione** $6$. La **cella elementare**, il più piccolo blocco che ripetuto nelle tre direzioni riproduce il cristallo, è un cubo di lato $a=564{,}0\un{pm}$, e la distanza fra un catione e l'anione più vicino è la metà, $282\un{pm}$.

::: figura reticolo
{"w":640,"h":290,"items":[{"t":"circle","p":[120,30,11],"c":"force2"},{"t":"circle","p":[120,76,18],"c":"body"},{"t":"circle","p":[120,122,11],"c":"force2"},{"t":"circle","p":[120,168,18],"c":"body"},{"t":"circle","p":[120,214,11],"c":"force2"},{"t":"circle","p":[166,30,18],"c":"body"},{"t":"circle","p":[166,76,11],"c":"force2"},{"t":"circle","p":[166,122,18],"c":"body"},{"t":"circle","p":[166,168,11],"c":"force2"},{"t":"circle","p":[166,214,18],"c":"body"},{"t":"circle","p":[212,30,11],"c":"force2"},{"t":"circle","p":[212,76,18],"c":"body"},{"t":"circle","p":[212,122,11],"c":"force2"},{"t":"circle","p":[212,168,18],"c":"body"},{"t":"circle","p":[212,214,11],"c":"force2"},{"t":"circle","p":[258,30,18],"c":"body"},{"t":"circle","p":[258,76,11],"c":"force2"},{"t":"circle","p":[258,122,18],"c":"body"},{"t":"circle","p":[258,168,11],"c":"force2"},{"t":"circle","p":[258,214,18],"c":"body"},{"t":"circle","p":[304,30,11],"c":"force2"},{"t":"circle","p":[304,76,18],"c":"body"},{"t":"circle","p":[304,122,11],"c":"force2"},{"t":"circle","p":[304,168,18],"c":"body"},{"t":"circle","p":[304,214,11],"c":"force2"},{"t":"circle","p":[350,30,18],"c":"body"},{"t":"circle","p":[350,76,11],"c":"force2"},{"t":"circle","p":[350,122,18],"c":"body"},{"t":"circle","p":[350,168,11],"c":"force2"},{"t":"circle","p":[350,214,18],"c":"body"},{"t":"poly","pts":[[120,30],[212,30],[212,122],[120,122]],"close":true,"c":"force","w":1.8,"dash":true},{"t":"line","p":[120,244,212,244],"c":"force","w":1.6},{"t":"text","p":[166,262],"s":"a = 564 pm","c":"force","size":12},{"t":"line","p":[380,30,380,76],"c":"force3","w":1.6},{"t":"text","p":[386,57.0],"s":"282 pm","c":"force3","size":12,"a":"start"},{"t":"circle","p":[500,70,11],"c":"force2"},{"t":"text","p":[518,75],"s":"Na⁺","c":"ax","size":12,"a":"start"},{"t":"circle","p":[500,110,18],"c":"body"},{"t":"text","p":[526,115],"s":"Cl⁻","c":"ax","size":12,"a":"start"},{"t":"text","p":[470,170],"s":"ogni ione ha sei vicini","c":"muted","size":11,"a":"start"},{"t":"text","p":[470,186],"s":"di carica opposta","c":"muted","size":11,"a":"start"}]}
---
Uno strato del cristallo di cloruro di sodio. Ioni sodio, piccoli, e ioni cloruro, grandi, si alternano; il quadrato tratteggiato è una faccia della cella elementare cubica, di lato $564\un{pm}$. Nel cristallo tridimensionale ogni ione ha sei vicini di carica opposta, quattro nello strato e due negli strati sopra e sotto.
:::

La distanza fra ioni vicini nel cristallo, $282\un{pm}$, è maggiore di quella nella coppia isolata, $236\un{pm}$: nel cristallo ogni ione è attratto da sei vicini invece che da uno, e la repulsione fra le nubi elettroniche di tutti i vicini lo tiene un po' più lontano da ciascuno.

Altri composti adottano strutture diverse, secondo il rapporto fra i raggi del catione e dell'anione. Nel cloruro di cesio lo ione $\mathrm{Cs^+}$, molto grande, è circondato da otto ioni cloruro ai vertici di un cubo. Nel fluoruro di calcio, $\mathrm{CaF_2}$, ogni $\mathrm{Ca^{2+}}$ ha otto ioni fluoruro attorno e ogni fluoruro quattro ioni calcio, come richiede il rapporto due a uno della formula.

::: esempio La densità del sale dalla sua cella
La cella elementare del cloruro di sodio contiene l'equivalente di quattro unità formula $\mathrm{NaCl}$, di massa molare $58{,}44\un{g/mol}$, e ha lato $564{,}0\un{pm}$. Calcolare la densità del cristallo.

La massa della cella è $4\times58{,}44\un{g/mol}$ divisa per $N_A$, cioè $3{,}882\times10^{-22}\un{g}$. Il volume è $(5{,}640\times10^{-8}\un{cm})^3$, circa $1{,}794\times10^{-22}\un{cm^3}$. La densità vale
$$\rho=\frac{3{,}882\times10^{-22}\un{g}}{1{,}794\times10^{-22}\un{cm^3}}\simeq2{,}16\un{g/cm^3},$$
in accordo con il valore misurato su cristalli di salgemma, $2{,}165\un{g/cm^3}$. Il calcolo inverso, dalla densità e dal lato della cella alla costante di Avogadro, è uno dei metodi con cui quella costante è stata misurata.
:::

## Energia reticolare e ciclo di Born e Haber {#energia-reticolare}

La stabilità di un cristallo ionico si misura con l'**energia reticolare** $U$, l'energia necessaria per separare una mole del solido nei suoi ioni gassosi, portati a distanza infinita:

$$\mathrm{NaCl(s)}\longrightarrow\mathrm{Na^+(g)}+\mathrm{Cl^-(g)},\qquad\Delta H=U.$$

L'energia reticolare non si può misurare direttamente, perché nessun esperimento trasforma un cristallo in ioni gassosi isolati. Nel 1919 Max Born e Fritz Haber mostrarono come ricavarla dalla legge di Hess, con un ciclo di trasformazioni tutte misurabili che portano dagli elementi al cristallo per due strade diverse. Per il cloruro di sodio:

1. si sublima il sodio solido, $\mathrm{Na(s)}\to\mathrm{Na(g)}$, con $\Delta H=+107{,}3\un{kJ/mol}$;
2. si dissocia mezza mole di cloro, $\tfrac12\mathrm{Cl_2(g)}\to\mathrm{Cl(g)}$, con $\Delta H=+121{,}7\un{kJ/mol}$;
3. si ionizza il sodio, $\mathrm{Na(g)}\to\mathrm{Na^+(g)}+e^-$, con l'energia di ionizzazione $+495{,}8\un{kJ/mol}$;
4. il cloro cattura l'elettrone, $\mathrm{Cl(g)}+e^-\to\mathrm{Cl^-(g)}$, liberando l'affinità elettronica, $\Delta H\simeq-348{,}6\un{kJ/mol}$;
5. gli ioni gassosi formano il cristallo, con $\Delta H=-U$.

La somma dei cinque passaggi porta da $\mathrm{Na(s)}+\tfrac12\mathrm{Cl_2(g)}$ a $\mathrm{NaCl(s)}$, e deve quindi essere uguale all'entalpia di formazione del cloruro di sodio, $-411{,}2\un{kJ/mol}$:

$$107{,}3+121{,}7+495{,}8-348{,}6-U=-411{,}2\quad\Longrightarrow\quad U\simeq787\un{kJ/mol}.$$

::: figura born-haber
{"w":680,"h":285,"items":[{"t":"arrow","p":[40,270,40,20],"c":"muted","w":1.4,"head":7},{"t":"text","p":[46,26],"s":"H","c":"muted","size":13,"a":"start"},{"t":"line","p":[70,262.0,190,262.0],"c":"ax","w":2.4},{"t":"text","p":[196,266.0],"s":"NaCl(s)","c":"ax","size":11,"a":"start"},{"t":"line","p":[70,179.8,190,179.8],"c":"ax","w":2.4},{"t":"text","p":[196,183.8],"s":"Na(s) + ½ Cl₂(g)","c":"ax","size":11,"a":"start"},{"t":"line","p":[150,158.3,270,158.3],"c":"ax","w":2.4},{"t":"text","p":[276,162.3],"s":"Na(g) + ½ Cl₂(g)","c":"ax","size":11,"a":"start"},{"t":"line","p":[230,134.0,350,134.0],"c":"ax","w":2.4},{"t":"text","p":[356,138.0],"s":"Na(g) + Cl(g)","c":"ax","size":11,"a":"start"},{"t":"line","p":[310,34.8,450,34.8],"c":"ax","w":2.4},{"t":"text","p":[456,38.8],"s":"Na⁺(g) + e⁻ + Cl(g)","c":"ax","size":11,"a":"start"},{"t":"line","p":[390,104.5,510,104.5],"c":"ax","w":2.4},{"t":"text","p":[516,108.5],"s":"Na⁺(g) + Cl⁻(g)","c":"ax","size":11,"a":"start"},{"t":"arrow","p":[80,182.8,80,259.0],"c":"force4","w":2,"head":7},{"t":"text","p":[85,224.9],"s":"−411","c":"force4","size":11,"a":"start"},{"t":"arrow","p":[160,176.8,160,161.3],"c":"force3","w":2,"head":7},{"t":"text","p":[165,173.0],"s":"+107","c":"force3","size":11,"a":"start"},{"t":"arrow","p":[240,155.3,240,137.0],"c":"force3","w":2,"head":7},{"t":"text","p":[245,150.1],"s":"+122","c":"force3","size":11,"a":"start"},{"t":"arrow","p":[320,131.0,320,37.8],"c":"force3","w":2,"head":7},{"t":"text","p":[325,88.4],"s":"+496","c":"force3","size":11,"a":"start"},{"t":"arrow","p":[470,37.8,470,101.5],"c":"force4","w":2,"head":7},{"t":"text","p":[475,73.7],"s":"−349","c":"force4","size":11,"a":"start"},{"t":"arrow","p":[600,107.5,600,259.0],"c":"force2","w":2,"head":7},{"t":"text","p":[605,187.3],"s":"−787","c":"force2","size":11,"a":"start"}]}
---
Il ciclo di Born e Haber per il cloruro di sodio, con i valori in kilojoule per mole. Le frecce verso l'alto richiedono energia, quelle verso il basso la liberano; la freccia a destra, la formazione del reticolo dagli ioni gassosi, vale $-U$.
:::

Il ciclo rende evidente il ruolo di ciascun passaggio. I primi tre richiedono complessivamente $725\un{kJ}$; la cattura dell'elettrone ne restituisce meno della metà, e gli ioni gassosi stanno $376\un{kJ}$ più in alto degli elementi di partenza. È la formazione del reticolo, con i suoi $787\un{kJ}$, a rendere il processo complessivo fortemente esotermico. Il legame ionico è, in sostanza, un'attrazione elettrostatica che ripaga con ampio margine il costo della formazione degli ioni.

Lo stesso ciclo applicato all'ossido di magnesio, $\mathrm{MgO}$, richiede di formare $\mathrm{Mg^{2+}}$, con una spesa di $738+1451=2189\un{kJ/mol}$ per le prime due ionizzazioni, e $\mathrm{O^{2-}}$, per il quale la prima affinità elettronica libera $141\un{kJ/mol}$ ma la seconda ne costa circa $744$. Con l'entalpia di formazione di $\mathrm{Mg(g)}$, $147{,}1\un{kJ/mol}$, quella di $\mathrm{O(g)}$, $249{,}2\un{kJ/mol}$, e quella di $\mathrm{MgO(s)}$, $-601{,}7\un{kJ/mol}$, il ciclo dà un'energia reticolare di circa $3790\un{kJ/mol}$, quasi cinque volte quella del cloruro di sodio. In realtà la seconda affinità dell'ossigeno sfugge alla misura diretta, perché lo ione $\mathrm{O^{2-}}$ isolato è instabile, e il suo valore si ricava proprio confrontando i cicli di Born e Haber di molti ossidi con energie reticolari calcolate.

## Carica e dimensioni degli ioni {#tendenze}

La legge di Coulomb suggerisce come l'energia reticolare dipenda dalle proprietà degli ioni: deve crescere con il prodotto delle cariche e diminuire con la distanza fra i centri degli ioni, cioè con la somma dei raggi del catione e dell'anione. In forma approssimata,

$$U\propto\frac{|z_+z_-|}{r_++r_-},$$

dove $z_+$ e $z_-$ sono le cariche degli ioni in unità di $e$. La figura confronta le energie reticolari ricavate dai cicli di Born e Haber per alcuni alogenuri alcalini.

::: figura tendenze
{"w":640,"h":275,"items":[{"t":"text","p":[320,22],"s":"energia reticolare dal ciclo di Born e Haber (kJ/mol)","c":"ax","size":12},{"t":"text","p":[70,58],"s":"NaF","c":"ax","size":12,"a":"end"},{"t":"rect","p":[78,44,389.6,22],"c":"force2","r":1},{"t":"text","p":[473.6,60],"s":"928","c":"ax","size":11,"a":"start"},{"t":"text","p":[620,60],"s":"fonde a 993 °C","c":"muted","size":11,"a":"end"},{"t":"text","p":[70,92],"s":"NaCl","c":"ax","size":12,"a":"end"},{"t":"rect","p":[78,78,330.7,22],"c":"force2","r":1},{"t":"text","p":[414.7,94],"s":"787","c":"ax","size":11,"a":"start"},{"t":"text","p":[620,94],"s":"fonde a 801 °C","c":"muted","size":11,"a":"end"},{"t":"text","p":[70,126],"s":"NaBr","c":"ax","size":12,"a":"end"},{"t":"rect","p":[78,112,315.7,22],"c":"force2","r":1},{"t":"text","p":[399.7,128],"s":"752","c":"ax","size":11,"a":"start"},{"t":"text","p":[620,128],"s":"fonde a 747 °C","c":"muted","size":11,"a":"end"},{"t":"text","p":[70,160],"s":"NaI","c":"ax","size":12,"a":"end"},{"t":"rect","p":[78,146,295.1,22],"c":"force2","r":1},{"t":"text","p":[379.1,162],"s":"703","c":"ax","size":11,"a":"start"},{"t":"text","p":[620,162],"s":"fonde a 661 °C","c":"muted","size":11,"a":"end"},{"t":"text","p":[70,194],"s":"KCl","c":"ax","size":12,"a":"end"},{"t":"rect","p":[78,180,301.5,22],"c":"force2","r":1},{"t":"text","p":[385.5,196],"s":"718","c":"ax","size":11,"a":"start"},{"t":"text","p":[70,228],"s":"LiCl","c":"ax","size":12,"a":"end"},{"t":"rect","p":[78,214,361.7,22],"c":"force2","r":1},{"t":"text","p":[445.7,230],"s":"861","c":"ax","size":11,"a":"start"},{"t":"text","p":[320,262],"s":"MgO, con ioni di carica doppia: circa 3790 kJ/mol","c":"force4","size":12}]}
---
Energie reticolari di alcuni alogenuri alcalini, calcolate con i cicli di Born e Haber, e temperature di fusione degli alogenuri di sodio. Scendendo dal fluoruro allo ioduro l'anione si ingrandisce e l'energia reticolare diminuisce; lo stesso accade per i cationi dal litio al potassio.
:::

Gli alogenuri di sodio mostrano l'effetto della dimensione dell'anione: dal fluoruro, con lo ione $\mathrm{F^-}$ di $133\un{pm}$, allo ioduro, con $\mathrm{I^-}$ di $220\un{pm}$, l'energia reticolare scende da $928$ a $703\un{kJ/mol}$, e la temperatura di fusione da $993$ a $661\,^\circ\mathrm{C}$. I cloruri di litio, sodio e potassio mostrano l'effetto del catione: $861$, $787$ e $718\un{kJ/mol}$. L'effetto della carica è ancora più forte: passando da ioni di carica unitaria a ioni di carica doppia il numeratore quadruplica, e l'ossido di magnesio, con un'energia reticolare di circa $3790\un{kJ/mol}$, fonde a circa $2800\,^\circ\mathrm{C}$. Per questa proprietà è usato come materiale refrattario nei rivestimenti dei forni industriali.

::: approfondimento L'energia reticolare calcolata
Nel cristallo ogni ione interagisce con tutti gli altri: i sei vicini di carica opposta lo attirano, i dodici ioni della stessa carica alla distanza successiva lo respingono, e così via. Sommando tutti i contributi per la struttura del cloruro di sodio si ottiene l'energia di Coulomb di una coppia di ioni moltiplicata per un fattore geometrico, la **costante di Madelung**, che per questa struttura vale $M=1{,}7476$. Aggiungendo una repulsione a corto raggio proporzionale a $1/r^n$, Max Born e Alfred Landé ottennero l'espressione
$$U=\frac{N_AM|z_+z_-|e^2}{4\pi\varepsilon_0r_0}\left(1-\frac1n\right),$$
dove $r_0$ è la distanza fra ioni vicini e $n$, l'esponente di Born, vale circa $8$ per il cloruro di sodio. Con $r_0=282\un{pm}$, e con il prodotto delle costanti $N_Ae^2/(4\pi\varepsilon_0)$ che vale $1{,}389\times10^{5}\un{kJ\,pm/mol}$, si ottiene
$$U\simeq\frac{1{,}389\times10^5\times1{,}7476}{282}\times\frac78\simeq753\un{kJ/mol}.$$
Il valore del ciclo di Born e Haber, $787\un{kJ/mol}$, è più alto del $4\%$ circa. La differenza viene da contributi trascurati dal modello, come le attrazioni di dispersione fra le nubi elettroniche e un piccolo carattere covalente del legame; l'accordo conferma comunque che il legame nel cloruro di sodio è essenzialmente elettrostatico.
:::

## Perché il magnesio forma MgCl₂ {#stechiometria}

Il ciclo di Born e Haber spiega anche perché ogni metallo forma ioni di una carica precisa. Il magnesio potrebbe in linea di principio cedere un solo elettrone e formare $\mathrm{MgCl}$, con ioni $\mathrm{Mg^+}$ e $\mathrm{Cl^-}$ in un reticolo simile a quello del cloruro di sodio. Il confronto fra i due composti, uno reale e uno ipotetico, mostra perché in natura si trova soltanto il primo.

Per il cloruro di magnesio reale, $\mathrm{MgCl_2}$, con entalpia di formazione $-641{,}3\un{kJ/mol}$, il ciclo richiede $147{,}1\un{kJ/mol}$ per vaporizzare il magnesio, $2\times121{,}7\un{kJ/mol}$ per due atomi di cloro e $2188{,}4\un{kJ/mol}$ per le due ionizzazioni, e restituisce $2\times348{,}6\un{kJ/mol}$ con la cattura dei due elettroni. Ne risulta un'energia reticolare di circa $2523\un{kJ/mol}$: lo ione $\mathrm{Mg^{2+}}$, piccolo e con carica doppia, lega gli ioni cloruro molto più fortemente di uno ione a carica singola, e ripaga ampiamente il costo della seconda ionizzazione.

Per l'ipotetico $\mathrm{MgCl}$ si può stimare un'energia reticolare simile a quella del cloruro di sodio, circa $760\un{kJ/mol}$, perché le dimensioni dello ione $\mathrm{Mg^+}$ sarebbero vicine a quelle di $\mathrm{Na^+}$. Con una sola ionizzazione, di $737{,}7\un{kJ/mol}$, l'entalpia di formazione risulterebbe circa $-102\un{kJ/mol}$. Il composto sarebbe quindi stabile rispetto agli elementi, ma instabile rispetto alla trasformazione $2\,\mathrm{MgCl}\to\mathrm{Mg}+\mathrm{MgCl_2}$, che libererebbe circa $437\un{kJ}$. Il magnesio monovalente si trasformerebbe spontaneamente in magnesio metallico e cloruro di magnesio, ed è per questo che i suoi composti ordinari contengono sempre lo ione $\mathrm{Mg^{2+}}$.

Lo stesso tipo di bilancio spiega perché l'alluminio forma $\mathrm{Al^{3+}}$ e perché nessun metallo alcalino forma ioni di carica doppia: la carica preferita è la più alta che si possa raggiungere senza intaccare il nocciolo, perché fino a quel punto l'aumento dell'energia reticolare supera il costo delle ionizzazioni aggiuntive.

## Le proprietà dei composti ionici {#proprieta}

Le proprietà macroscopiche dei composti ionici discendono dalla struttura del reticolo.

- **Temperature di fusione elevate.** Per fondere il cristallo bisogna rompere l'ordine del reticolo vincendo attrazioni elettrostatiche intense fra molti ioni. Gli alogenuri di sodio fondono fra $661$ e $993\,^\circ\mathrm{C}$, l'ossido di magnesio a circa $2800\,^\circ\mathrm{C}$.
- **Durezza e fragilità.** I cristalli ionici sono duri, perché resistono alle deformazioni, ma fragili. Un colpo che fa scorrere uno strato di ioni sull'altro anche di mezzo passo porta ioni della stessa carica uno di fronte all'altro: la repulsione spacca il cristallo lungo un piano, e i frammenti hanno facce lisce.
- **Conducibilità elettrica.** Nel solido gli ioni sono fissi nel reticolo e non trasportano carica. Nel composto fuso e nelle soluzioni acquose gli ioni diventano mobili, e il liquido conduce la corrente: per questo le soluzioni di sali si chiamano **elettroliti**.
- **Solubilità in acqua.** Molti composti ionici si sciolgono in acqua, perché le molecole d'acqua, polari, circondano gli ioni e ne compensano l'attrazione reciproca. Altri, con energie reticolari molto elevate, come l'ossido di magnesio o il fosfato di calcio, sono poco solubili. Il bilancio fra energia reticolare e interazione con l'acqua sarà ripreso nel capitolo [Solubilità ed equilibrio eterogeneo](unit:chemistry-13).

::: storia Davy e i metalli nascosti nei sali
All'inizio dell'Ottocento la soda e la potassa caustiche, gli idrossidi di sodio e di potassio, erano considerate elementi, perché nessun reagente chimico riusciva a scomporle. Nel 1807 Humphry Davy, alla Royal Institution di Londra, fece passare la corrente di una grande pila di Volta attraverso la potassa caustica fusa, e vide formarsi al catodo goccioline metalliche lucenti che prendevano fuoco a contatto con l'aria. Aveva isolato il potassio; pochi giorni dopo ottenne il sodio dalla soda caustica. L'elettrolisi dei composti fusi, possibile proprio perché gli ioni diventano mobili nel liquido, è ancora oggi il metodo con cui si producono industrialmente sodio, magnesio e alluminio.
:::

::: quotidiano Ossa, denti e fluoro
Lo smalto dei denti è quasi interamente un cristallo ionico, l'idrossiapatite, $\mathrm{Ca_5(PO_4)_3OH}$, formata da ioni calcio, fosfato e idrossido. Gli acidi prodotti dai batteri della placca reagiscono con gli ioni idrossido e fosfato e sciolgono lentamente il cristallo. Gli ioni fluoruro dei dentifrici possono sostituire nel reticolo gli ioni idrossido, di dimensioni simili, formando fluoroapatite, $\mathrm{Ca_5(PO_4)_3F}$, che resiste meglio agli acidi. È un esempio di come la sostituzione di un singolo tipo di ione cambi le proprietà di un materiale.
:::

## Fra legame ionico e legame covalente {#polarita}

Il trasferimento completo di elettroni è un caso limite. Quando un atomo con elettronegatività bassa si lega a uno con elettronegatività alta, la coppia di elettroni del legame è spostata quasi interamente verso il secondo, e il legame è descritto bene come ionico. Quando i due atomi hanno elettronegatività simili, gli elettroni sono condivisi in modo quasi equo, e il legame è covalente. Fra i due estremi esiste una gamma continua di **legami covalenti polari**, nei quali gli elettroni sono condivisi in modo diseguale.

Pauling propose di stimare il **carattere ionico** di un legame dalla differenza di elettronegatività $\Delta\chi$ dei due atomi, con l'espressione empirica
$$\text{carattere ionico}\simeq1-e^{-(\Delta\chi)^2/4}.$$
Per il cloruro di sodio, con $\Delta\chi=3{,}16-0{,}93=2{,}23$, si ottiene circa il $71\%$; per il fluoruro di potassio, $\Delta\chi=3{,}16$, circa il $92\%$; per l'acido cloridrico gassoso, $\Delta\chi=0{,}96$, circa il $21\%$. Come regola pratica, i legami con $\Delta\chi$ superiore a circa $1{,}7$ sono considerati prevalentemente ionici. Le soglie sono convenzionali, e conviene guardare soprattutto alle proprietà: un composto che fonde ad alta temperatura e conduce allo stato fuso si comporta da composto ionico, qualunque sia il numero che lo descrive.

## Errori frequenti {#errori}

::: errore La molecola di cloruro di sodio
La formula $\mathrm{NaCl}$ non indica una molecola. Nel cristallo ogni ione sodio è circondato da sei ioni cloruro, e nessuno di essi è legato al sodio più degli altri. La formula esprime soltanto il rapporto fra gli ioni.
:::

::: errore Gli atomi vogliono l'ottetto
Si legge spesso che il sodio «vuole» cedere un elettrone per raggiungere l'ottetto. Un atomo di sodio isolato trattiene il suo elettrone, e per strapparglielo servono $496\un{kJ/mol}$. Il composto ionico si forma perché l'attrazione fra gli ioni nel cristallo libera più energia di quanta ne costi la loro formazione. La regola dell'ottetto descrive il risultato e non la sua causa.
:::

::: errore Le cariche nella formula
Per scrivere la formula si usano le cariche per ottenere la neutralità, e poi si riducono i coefficienti ai numeri interi più piccoli: l'ossido di calcio si scrive $\mathrm{CaO}$, con i coefficienti ridotti, anche se le cariche sono $+2$ e $-2$. Le cariche degli ioni non compaiono nella formula del composto neutro.
:::

::: errore Energia reticolare e segno
Alcuni testi definiscono l'energia reticolare come l'energia liberata dalla formazione del cristallo, con segno negativo, altri come l'energia necessaria per separarlo, con segno positivo. Il valore assoluto è lo stesso; prima di inserirlo in un ciclo di Born e Haber bisogna stabilire in quale verso si percorre il passaggio.
:::

::: errore Il cristallo che conduce
Un cristallo di sale è un isolante. Conduce la corrente soltanto quando gli ioni possono muoversi, cioè allo stato fuso o in soluzione. La presenza di ioni è necessaria e la loro mobilità è altrettanto indispensabile.
:::

## Sintesi {#sintesi}

::: sintesi Che cosa portare con sé
- Gli elettroni di valenza determinano la chimica degli elementi rappresentativi; i simboli di Lewis li rappresentano come punti attorno al simbolo.
- I metalli dei gruppi $1$, $2$ e $13$ formano cationi con carica uguale al numero di elettroni di valenza; i non metalli dei gruppi da $15$ a $17$ formano anioni con carica uguale a quanti elettroni mancano all'ottetto.
- La formula di un composto ionico garantisce la neutralità con i numeri interi più piccoli; il nome mette l'anione prima del catione.
- L'energia di una coppia di ioni segue la legge di Coulomb, $E\propto q_1q_2/r$; una repulsione a corto raggio fissa la distanza di equilibrio.
- Nel cristallo di cloruro di sodio ogni ione ha sei vicini di carica opposta; la cella elementare è un cubo di lato $564\un{pm}$.
- L'energia reticolare si ricava dal ciclo di Born e Haber; per il cloruro di sodio vale circa $787\un{kJ/mol}$, e cresce con la carica degli ioni e al diminuire delle loro dimensioni.
- I composti ionici fondono ad alta temperatura, sono fragili e conducono la corrente soltanto fusi o disciolti.
- Il carattere ionico di un legame cresce con la differenza di elettronegatività degli atomi.
:::

## Glossario {#glossario}

- **Elettroni di valenza**: elettroni del guscio più esterno di un atomo, che partecipano ai legami.
- **Simbolo di Lewis**: simbolo dell'elemento circondato da tanti punti quanti sono i suoi elettroni di valenza.
- **Regola dell'ottetto**: tendenza degli atomi a raggiungere otto elettroni nel guscio esterno perdendo, acquistando o condividendo elettroni.
- **Catione**: ione positivo.
- **Anione**: ione negativo.
- **Ione poliatomico**: gruppo di atomi legati covalentemente che porta una carica complessiva.
- **Composto ionico**: composto formato da cationi e anioni tenuti insieme da attrazioni elettrostatiche.
- **Unità formula**: insieme di ioni indicato dalla formula di un composto ionico.
- **Legge di Coulomb**: l'energia di due cariche è proporzionale al loro prodotto e inversamente proporzionale alla loro distanza.
- **Reticolo cristallino**: disposizione regolare e periodica di ioni, atomi o molecole in un solido.
- **Numero di coordinazione**: numero di vicini più prossimi di uno ione nel reticolo.
- **Cella elementare**: la più piccola unità che, ripetuta nelle tre direzioni, riproduce il cristallo.
- **Energia reticolare** ($U$): energia necessaria per separare una mole di un solido ionico negli ioni gassosi.
- **Ciclo di Born e Haber**: ciclo termochimico che ricava l'energia reticolare dalla legge di Hess.
- **Costante di Madelung**: fattore geometrico che somma le interazioni di Coulomb di uno ione con tutti gli altri ioni del cristallo.
- **Elettrolita**: sostanza che, fusa o disciolta, conduce la corrente perché contiene ioni mobili.
- **Legame covalente polare**: legame in cui la coppia di elettroni è condivisa in modo diseguale.

## Esercizi {#esercizi}

Dati utili: $1/(4\pi\varepsilon_0)=8{,}988\times10^9\un{N\,m^2/C^2}$; $e=1{,}602\times10^{-19}\un{C}$; $N_A=6{,}022\times10^{23}\un{mol^{-1}}$; $N_Ae^2/(4\pi\varepsilon_0)=1{,}389\times10^{5}\un{kJ\,pm/mol}$. Energie di ionizzazione, affinità elettroniche, raggi ionici ed elettronegatività si trovano nel capitolo [Periodicità e carica efficace](unit:chemistry-05).

::: esercizio Simboli di Lewis [base]
Scrivere i simboli di Lewis di azoto, magnesio, cloro, argon e calcio, indicando il numero di elettroni di valenza.
>>> soluzione
Azoto, cinque elettroni: un punto su un lato e coppie o punti singoli fino a cinque, con tre spaiati. Magnesio e calcio, due punti. Cloro, sette punti, tre coppie e un punto singolo. Argon, otto punti, quattro coppie.
:::

::: esercizio Prevedere gli ioni [base]
Indicare lo ione più comune formato da litio, calcio, alluminio, azoto, ossigeno, fluoro e zolfo, e il gas nobile con la cui configurazione ciascuno è isoelettronico.
>>> soluzione
$\mathrm{Li^+}$, come l'elio; $\mathrm{Ca^{2+}}$, come l'argon; $\mathrm{Al^{3+}}$, come il neon; $\mathrm{N^{3-}}$, $\mathrm{O^{2-}}$ e $\mathrm{F^-}$, come il neon; $\mathrm{S^{2-}}$, come l'argon.
:::

::: esercizio Scrivere le formule [base]
Scrivere la formula dei composti formati da calcio e cloro, alluminio e ossigeno, magnesio e azoto, potassio e zolfo, sodio e ione solfato.
>>> soluzione
$\mathrm{CaCl_2}$, $\mathrm{Al_2O_3}$, $\mathrm{Mg_3N_2}$, $\mathrm{K_2S}$, $\mathrm{Na_2SO_4}$.
:::

::: esercizio Dare il nome [base]
Dare il nome a $\mathrm{MgO}$, $\mathrm{CaF_2}$, $\mathrm{FeCl_3}$, $\mathrm{CuSO_4}$, $\mathrm{NH_4NO_3}$ e $\mathrm{Li_2O}$.
>>> soluzione
Ossido di magnesio, fluoruro di calcio, cloruro di ferro(III), solfato di rame(II), nitrato di ammonio, ossido di litio.
:::

::: esercizio Chi conduce [base]
Quali dei seguenti campioni conducono la corrente elettrica, e perché: cloruro di sodio solido, cloruro di sodio fuso, una soluzione acquosa di cloruro di sodio, una soluzione acquosa di zucchero?
>>> soluzione
Conducono il sale fuso e la soluzione salina, nei quali gli ioni sono mobili. Il sale solido ha ioni fissi nel reticolo; la soluzione di zucchero contiene molecole neutre e quasi nessuno ione.
:::

::: esercizio Energia di una coppia di ioni [medio]
Calcolare in $\mathrm{kJ/mol}$ l'energia di Coulomb di una coppia $\mathrm{Na^+}$, $\mathrm{Cl^-}$ alla distanza di $282\un{pm}$, quella del cristallo, e confrontarla con il valore a $236\un{pm}$.
>>> soluzione
$E=-1{,}389\times10^5/282\simeq-493\un{kJ/mol}$, contro circa $-589\un{kJ/mol}$ a $236\un{pm}$. A distanza maggiore l'attrazione di una singola coppia è minore; nel cristallo la compensano i molti vicini.
:::

::: esercizio Il ciclo per il cloruro di potassio [medio]
Calcolare l'energia reticolare del cloruro di potassio con i dati: $\Delta_\mathrm{f}H^\circ(\mathrm{K,g})=89{,}2\un{kJ/mol}$, $\Delta_\mathrm{f}H^\circ(\mathrm{Cl,g})=121{,}7\un{kJ/mol}$, energia di ionizzazione del potassio $418{,}8\un{kJ/mol}$, affinità elettronica del cloro $348{,}6\un{kJ/mol}$, $\Delta_\mathrm{f}H^\circ(\mathrm{KCl,s})=-436{,}7\un{kJ/mol}$.
>>> soluzione
Sommando $89{,}2+121{,}7+418{,}8-348{,}6+436{,}7$ si ottiene $U\simeq718\un{kJ/mol}$, minore di quella del cloruro di sodio perché lo ione potassio è più grande.
:::

::: esercizio Ordinare le energie reticolari [medio]
Ordinare per energia reticolare crescente $\mathrm{KI}$, $\mathrm{NaCl}$, $\mathrm{MgO}$ e $\mathrm{NaF}$, e prevedere l'ordine delle temperature di fusione.
>>> soluzione
$\mathrm{KI}<\mathrm{NaCl}<\mathrm{NaF}<\mathrm{MgO}$. Lo ioduro di potassio ha gli ioni più grandi, l'ossido di magnesio cariche doppie. Le temperature di fusione seguono lo stesso ordine.
:::

::: esercizio La densità dal reticolo [medio]
Ricalcolare la densità del cloruro di sodio con il lato della cella $564{,}0\un{pm}$ e quattro unità formula per cella, e stimare quante unità formula contiene un cubetto di sale di un millimetro di lato.
>>> soluzione
La densità è circa $2{,}16\un{g/cm^3}$. Un millimetro cubo ha massa $2{,}16\times10^{-3}\un{g}$, cioè $3{,}70\times10^{-5}\un{mol}$, e contiene circa $2{,}2\times10^{19}$ unità formula.
:::

::: esercizio Carattere ionico [medio]
Con l'espressione di Pauling stimare il carattere ionico dei legami in $\mathrm{NaCl}$, $\mathrm{KF}$, $\mathrm{MgO}$ e $\mathrm{HCl}$, con le elettronegatività $\mathrm{Na}$ $0{,}93$, $\mathrm{K}$ $0{,}82$, $\mathrm{Mg}$ $1{,}31$, $\mathrm{H}$ $2{,}20$, $\mathrm{O}$ $3{,}44$, $\mathrm{Cl}$ $3{,}16$, $\mathrm{F}$ $3{,}98$.
>>> soluzione
$\mathrm{NaCl}$: $\Delta\chi=2{,}23$, circa $71\%$. $\mathrm{KF}$: $3{,}16$, circa $92\%$. $\mathrm{MgO}$: $2{,}13$, circa $68\%$. $\mathrm{HCl}$: $0{,}96$, circa $21\%$, un legame covalente polare.
:::

::: esercizio Il ciclo per l'ossido di magnesio [avanzato]
Ricavare l'energia reticolare dell'ossido di magnesio con: $\Delta_\mathrm{f}H^\circ(\mathrm{Mg,g})=147{,}1\un{kJ/mol}$; $\Delta_\mathrm{f}H^\circ(\mathrm{O,g})=249{,}2\un{kJ/mol}$; prima e seconda energia di ionizzazione del magnesio $737{,}7$ e $1450{,}7\un{kJ/mol}$; prima affinità elettronica dell'ossigeno $141{,}0\un{kJ/mol}$, energia della seconda cattura $+744\un{kJ/mol}$; $\Delta_\mathrm{f}H^\circ(\mathrm{MgO,s})=-601{,}7\un{kJ/mol}$. Perché il risultato dipende da un valore che non si misura direttamente?
>>> soluzione
Gli ioni gassosi stanno $3187{,}7\un{kJ/mol}$ sopra gli elementi, somma di $147{,}1$, $249{,}2$, $737{,}7$, $1450{,}7$, $-141{,}0$ e $744$. Aggiungendo i $601{,}7\un{kJ/mol}$ che separano gli elementi dal solido si ottiene $U\simeq3789\un{kJ/mol}$. Lo ione $\mathrm{O^{2-}}$ isolato non è stabile, e l'energia della seconda cattura si ricava a sua volta da cicli di questo tipo.
:::

::: esercizio L'energia di Born e Landé [avanzato]
Calcolare l'energia reticolare del cloruro di sodio con l'espressione di Born e Landé, $M=1{,}7476$, $r_0=282\un{pm}$, $n=8$, e confrontarla con il valore del ciclo, $787\un{kJ/mol}$.
>>> soluzione
Il prodotto $1{,}389\times10^5\times1{,}7476/282$ vale circa $861\un{kJ/mol}$, e moltiplicato per $1-1/8$ dà $U\simeq753\un{kJ/mol}$, il $4\%$ in meno del ciclo. Il modello trascura le attrazioni di dispersione e il piccolo carattere covalente del legame.
:::

::: esercizio Perché non esiste NaCl₂ [avanzato]
Per formare un ipotetico $\mathrm{NaCl_2}$ servirebbe lo ione $\mathrm{Na^{2+}}$. Calcolare l'energia necessaria per formarlo dall'atomo gassoso, con energie di ionizzazione $495{,}8$ e $4562\un{kJ/mol}$, e confrontarla con l'energia reticolare di un composto con ioni di carica $2+$ e $1-$, che si può stimare dell'ordine di $2500\un{kJ/mol}$. Che cosa se ne conclude?
>>> soluzione
Servono $495{,}8+4562\simeq5058\un{kJ/mol}$, il doppio circa dell'energia reticolare che il cristallo potrebbe restituire. Il composto sarebbe enormemente instabile rispetto a $\mathrm{NaCl}$ più cloro: la seconda ionizzazione intacca il nocciolo del sodio, e nessuna attrazione fra ioni basta a compensarla.
:::

::: esercizio L'ossido di calcio [avanzato]
Calcolare l'energia reticolare dell'ossido di calcio con $\Delta_\mathrm{f}H^\circ(\mathrm{Ca,g})=177{,}8\un{kJ/mol}$, energie di ionizzazione del calcio $589{,}8$ e $1145{,}4\un{kJ/mol}$, $\Delta_\mathrm{f}H^\circ(\mathrm{CaO,s})=-635{,}1\un{kJ/mol}$ e gli stessi dati dell'ossigeno dell'esercizio sull'ossido di magnesio. Spiegare perché il risultato è minore di quello dell'ossido di magnesio.
>>> soluzione
Gli ioni gassosi stanno $2765{,}2\un{kJ/mol}$ sopra gli elementi, somma di $177{,}8$, $249{,}2$, $589{,}8$, $1145{,}4$, $-141{,}0$ e $744$; con i $635{,}1\un{kJ/mol}$ del solido, $U\simeq3400\un{kJ/mol}$. Lo ione $\mathrm{Ca^{2+}}$, $100\un{pm}$, è più grande di $\mathrm{Mg^{2+}}$, $72\un{pm}$, e la distanza fra gli ioni nel cristallo è maggiore.
:::

::: esercizio Energia e distanza [avanzato]
Le energie reticolari di $\mathrm{LiCl}$, $\mathrm{NaCl}$ e $\mathrm{KCl}$ valgono $861$, $787$ e $718\un{kJ/mol}$; i raggi di $\mathrm{Li^+}$, $\mathrm{Na^+}$ e $\mathrm{K^+}$ sono $76$, $102$ e $138\un{pm}$, quello di $\mathrm{Cl^-}$ $181\un{pm}$. Verificare se il prodotto $U(r_++r_-)$ è approssimativamente costante, come suggerisce la legge di Coulomb.
>>> soluzione
I prodotti valgono circa $861\times257\simeq2{,}21\times10^5$, $787\times283\simeq2{,}23\times10^5$ e $718\times319\simeq2{,}29\times10^5\un{kJ\,pm/mol}$: costanti entro il $4\%$. La dipendenza $U\propto1/(r_++r_-)$ descrive bene l'andamento.
:::

## Fonti {#fonti}

Il testo, le figure, gli esempi e gli esercizi di questo capitolo sono originali. Per la scelta e l'ordine degli argomenti il riferimento principale è il manuale di R. H. Petrucci, F. G. Herring, J. D. Madura e C. Bissonnette, *General Chemistry: Principles and Modern Applications*, 11ª edizione, Pearson Canada, Toronto, 2017, paragrafi 3-1, 3-5, 9-2, 10-1, 12-6 e 12-7. I dati numerici provengono dalle fonti seguenti.

1. Entalpie standard di formazione di atomi gassosi e di solidi ionici: tabella D.2 dell'appendice dello stesso manuale; per $\mathrm{Mg(g)}$ e $\mathrm{Ca(g)}$, J. D. Cox, D. D. Wagman, V. A. Medvedev, *CODATA Key Values for Thermodynamics*, Hemisphere, 1989.
2. Energie di ionizzazione: NIST Atomic Spectra Database. Affinità elettroniche: misure di fotodistacco laser, come nel capitolo precedente; energia della seconda cattura da parte dell'ossigeno dalle raccolte di dati correnti.
3. Raggi ionici: R. D. Shannon, Acta Crystallographica A32 (1976) 751. Elettronegatività: scala di Pauling nella revisione di A. L. Allred (1961).
4. Lato della cella del cloruro di sodio, distanza internucleare della molecola $\mathrm{NaCl}$ gassosa, costante di Madelung e temperature di fusione dalle tabelle correnti di chimica inorganica; costanti fondamentali da CODATA 2022.
5. Per la storia: H. Davy (1807); G. N. Lewis e W. Kossel (1916); W. L. Bragg (1913); M. Born e F. Haber (1919); M. Born e A. Landé (1918); A. Stock, nomenclatura dei composti dei metalli con più stati di ossidazione.
