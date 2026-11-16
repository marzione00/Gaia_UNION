---
unit: chemistry-20
titolo: Perturbazioni dell'equilibrio
sottotitolo: Principio di Le Chatelier, effetti di concentrazione, pressione e temperatura, equazione di van 't Hoff, sintesi dell'ammoniaca
volume: Volume di chimica
fonte: Testo originale; riferimento principale Petrucci et al., General Chemistry, 11ª ed., §15-6, 13-6 e 13-7
---

## Prima di cominciare {#apertura}

All'inizio del Novecento i fertilizzanti azotati e gli esplosivi dipendevano quasi interamente dal nitrato di sodio estratto nei deserti del Cile settentrionale, una fonte lontana, contesa e destinata a esaurirsi. L'azoto è abbondantissimo: costituisce quasi quattro quinti dell'aria. Manca un modo per trasformarlo in composti utilizzabili, perché la molecola di azoto, con il suo legame triplo, è fra le più inerti della chimica. Fra il 1909 e il 1913 il chimico Fritz Haber e l'ingegnere Carl Bosch riuscirono a produrre ammoniaca dall'azoto dell'aria e dall'idrogeno, su scala industriale. La difficoltà principale era convincere un equilibrio sfavorevole, alle temperature necessarie perché la reazione fosse abbastanza veloce, a spostarsi verso il prodotto. Oggi i fertilizzanti prodotti con quel processo sostengono la produzione di cibo per circa metà della popolazione mondiale.

Il capitolo [Equilibrio chimico](unit:chemistry-19) ha descritto lo stato di equilibrio e la costante che lo caratterizza. Questo capitolo studia che cosa accade quando l'equilibrio viene disturbato: aggiungendo o togliendo una sostanza, comprimendo o espandendo una miscela di gas, scaldando o raffreddando. La guida qualitativa è il principio formulato nel 1884 da Henry Le Chatelier; la guida quantitativa è il confronto fra quoziente di reazione e costante, insieme all'equazione di van 't Hoff, che descrive come la costante cambia con la temperatura.

::: obiettivi
- enunciare il principio di Le Chatelier e usarlo per prevedere la risposta di un equilibrio a una perturbazione;
- giustificare le previsioni con il confronto fra $Q$ e $K$, e calcolare la nuova composizione di equilibrio;
- distinguere le perturbazioni che modificano la costante da quelle che la lasciano invariata;
- prevedere l'effetto della pressione e del volume in base alla variazione del numero di moli di gas;
- usare l'equazione di van 't Hoff per calcolare la costante a un'altra temperatura o l'entalpia di reazione;
- spiegare le scelte di temperatura, pressione e catalizzatore nella sintesi industriale dell'ammoniaca.
:::

Il capitolo usa la costante di equilibrio, il quoziente di reazione e la relazione $\Delta G^\circ=-RT\ln K$ del capitolo [Equilibrio chimico](unit:chemistry-19), l'entalpia e l'entropia di reazione del capitolo [Termochimica e calorimetria](unit:chemistry-16) e il ruolo dei catalizzatori discusso nel capitolo [Temperatura e attivazione](unit:chemistry-18).

## Il principio di Le Chatelier {#principio}

Un sistema all'equilibrio resta tale finché nessuno lo disturba. Se si cambia una delle condizioni, la composizione si modifica fino a raggiungere un nuovo equilibrio. Le Chatelier riassunse il verso di questa risposta in un enunciato generale.

::: legge Principio di Le Chatelier
Quando un sistema all'equilibrio subisce una perturbazione, come una variazione di concentrazione, di pressione o di temperatura, la reazione procede nel verso che si oppone in parte alla perturbazione, fino a stabilire un nuovo equilibrio.
:::

Il principio dice da che parte si sposta l'equilibrio. Se si aggiunge un reagente, la reazione ne consuma una parte; se si toglie un prodotto, la reazione ne forma dell'altro; se si comprime una miscela di gas, la reazione riduce il numero di molecole; se si scalda, la reazione assorbe calore. In ogni caso la compensazione è parziale: il nuovo equilibrio conserva una traccia della perturbazione.

Il principio è una regola qualitativa, utile per prevedere rapidamente il verso della risposta. La giustificazione rigorosa, e i calcoli, vengono dal confronto fra il quoziente di reazione $Q$ e la costante $K$. Una perturbazione può agire in due modi distinti:

- cambia $Q$ lasciando invariata $K$: è il caso delle aggiunte e sottrazioni di sostanze e delle variazioni di volume a temperatura costante;
- cambia $K$: è il caso, e il solo, delle variazioni di temperatura.

In entrambi i casi, subito dopo la perturbazione $Q$ e $K$ sono diversi, e la reazione procede finché tornano uguali.

## Aggiungere o togliere una sostanza {#concentrazione}

Si consideri l'equilibrio fra tetrossido e diossido di azoto del capitolo precedente, in un recipiente da $1{,}00\un{L}$ a $25\,^\circ\mathrm C$, con $[\mathrm{N_2O_4}]=0{,}0330\un{M}$ e $[\mathrm{NO_2}]=0{,}0140\un{M}$, e con $K_c=5{,}99\times10^{-3}$. Si aggiungono rapidamente $0{,}0100\un{mol}$ di diossido di azoto. Subito dopo l'aggiunta il quoziente vale

$$Q=\frac{0{,}0240^2}{0{,}0330}=1{,}75\times10^{-2},$$

quasi tre volte la costante. Poiché $Q>K$, la reazione procede verso sinistra: il diossido si dimerizza. Se $y$ è la concentrazione di tetrossido che si forma, all'equilibrio

$$\frac{(0{,}0240-2y)^2}{0{,}0330+y}=5{,}99\times10^{-3},$$

con soluzione $y\simeq4{,}5\times10^{-3}\un{M}$. Le nuove concentrazioni sono $[\mathrm{N_2O_4}]\simeq0{,}0375\un{M}$ e $[\mathrm{NO_2}]\simeq0{,}0150\un{M}$.

::: figura disturbo
{"w":660,"h":306,"items":[{"t":"axes","o":[80,250],"x":[540,""],"y":[215,""],"sx":100,"sy":5000,"xt":[],"yt":[[0.01,"0,01"],[0.02,"0,02"],[0.03,"0,03"],[0.04,"0,04"]]},{"t":"text","p":[40,28],"s":"concentrazione (mol/L)","c":"ax","size":12,"a":"start"},{"t":"text","p":[630,292],"s":"tempo","c":"ax","size":13,"a":"end"},{"t":"plot","o":[80,250],"sx":100,"sy":5000,"pts":[[0.0,0.033],[0.02,0.033],[0.04,0.033],[0.06,0.033],[0.08,0.033],[0.1,0.033],[0.12,0.033],[0.14,0.033],[0.16,0.033],[0.18,0.033],[0.2,0.033],[0.22,0.033],[0.24,0.033],[0.26,0.033],[0.28,0.033],[0.3,0.033],[0.32,0.033],[0.34,0.033],[0.36,0.033],[0.38,0.033],[0.4,0.033],[0.42,0.033],[0.44,0.033],[0.46,0.033],[0.48,0.033],[0.5,0.033],[0.52,0.033],[0.54,0.033],[0.56,0.033],[0.58,0.033],[0.6,0.033],[0.62,0.033],[0.64,0.033],[0.66,0.033],[0.68,0.033],[0.7,0.033],[0.72,0.033],[0.74,0.033],[0.76,0.033],[0.78,0.033],[0.8,0.033],[0.82,0.033],[0.84,0.033],[0.86,0.033],[0.88,0.033],[0.9,0.033],[0.92,0.033],[0.94,0.033],[0.96,0.033],[0.98,0.033],[1.0,0.033],[1.02,0.0332499],[1.04,0.033486],[1.06,0.0337089],[1.08,0.0339195],[1.1,0.0341184],[1.12,0.0343062],[1.14,0.0344836],[1.16,0.0346511],[1.18,0.0348093],[1.2,0.0349588],[1.22,0.0350999],[1.24,0.0352332],[1.26,0.0353591],[1.28,0.035478],[1.3,0.0355903],[1.32,0.0356964],[1.34,0.0357966],[1.36,0.0358912],[1.38,0.0359805],[1.4,0.0360649],[1.42,0.0361446],[1.44,0.0362199],[1.46,0.036291],[1.48,0.0363582],[1.5,0.0364216],[1.52,0.0364815],[1.54,0.036538],[1.56,0.0365915],[1.58,0.0366419],[1.6,0.0366896],[1.62,0.0367346],[1.64,0.0367771],[1.66,0.0368173],[1.68,0.0368552],[1.7,0.036891],[1.72,0.0369248],[1.74,0.0369568],[1.76,0.0369869],[1.78,0.0370154],[1.8,0.0370423],[1.82,0.0370678],[1.84,0.0370918],[1.86,0.0371144],[1.88,0.0371359],[1.9,0.0371561],[1.92,0.0371752],[1.94,0.0371932],[1.96,0.0372103],[1.98,0.0372264],[2.0,0.0372416],[2.02,0.0372559],[2.04,0.0372695],[2.06,0.0372823],[2.08,0.0372944],[2.1,0.0373058],[2.12,0.0373166],[2.14,0.0373268],[2.16,0.0373364],[2.18,0.0373455],[2.2,0.0373541],[2.22,0.0373622],[2.24,0.0373698],[2.26,0.037377],[2.28,0.0373839],[2.3,0.0373903],[2.32,0.0373964],[2.34,0.0374022],[2.36,0.0374076],[2.38,0.0374127],[2.4,0.0374176],[2.42,0.0374222],[2.44,0.0374265],[2.46,0.0374306],[2.48,0.0374344],[2.5,0.0374381],[2.52,0.0374415],[2.54,0.0374448],[2.56,0.0374478],[2.58,0.0374507],[2.6,0.0374535],[2.62,0.037456],[2.64,0.0374585],[2.66,0.0374608],[2.68,0.037463],[2.7,0.037465],[2.72,0.037467],[2.74,0.0374688],[2.76,0.0374705],[2.78,0.0374722],[2.8,0.0374737],[2.82,0.0374752],[2.84,0.0374766],[2.86,0.0374779],[2.88,0.0374791],[2.9,0.0374802],[2.92,0.0374813],[2.94,0.0374824],[2.96,0.0374834],[2.98,0.0374843],[3.0,0.0374852],[3.02,0.037486],[3.04,0.0374868],[3.06,0.0374875],[3.08,0.0374882],[3.1,0.0374888],[3.12,0.0374895],[3.14,0.0374901],[3.16,0.0374906],[3.18,0.0374911],[3.2,0.0374916],[3.22,0.0374921],[3.24,0.0374925],[3.26,0.0374929],[3.28,0.0374933],[3.3,0.0374937],[3.32,0.0374941],[3.34,0.0374944],[3.36,0.0374947],[3.38,0.037495],[3.4,0.0374953],[3.42,0.0374955],[3.44,0.0374958],[3.46,0.037496],[3.48,0.0374962],[3.5,0.0374964],[3.52,0.0374966],[3.54,0.0374968],[3.56,0.037497],[3.58,0.0374972],[3.6,0.0374973],[3.62,0.0374975],[3.64,0.0374976],[3.66,0.0374977],[3.68,0.0374979],[3.7,0.037498],[3.72,0.0374981],[3.74,0.0374982],[3.76,0.0374983],[3.78,0.0374984],[3.8,0.0374985],[3.82,0.0374986],[3.84,0.0374987],[3.86,0.0374987],[3.88,0.0374988],[3.9,0.0374989],[3.92,0.0374989],[3.94,0.037499],[3.96,0.037499],[3.98,0.0374991],[4.0,0.0374991],[4.02,0.0374992],[4.04,0.0374992],[4.06,0.0374993],[4.08,0.0374993],[4.1,0.0374994],[4.12,0.0374994],[4.14,0.0374994],[4.16,0.0374995],[4.18,0.0374995],[4.2,0.0374995],[4.22,0.0374995],[4.24,0.0374996],[4.26,0.0374996],[4.28,0.0374996],[4.3,0.0374996],[4.32,0.0374997],[4.34,0.0374997],[4.36,0.0374997],[4.38,0.0374997],[4.4,0.0374997],[4.42,0.0374997],[4.44,0.0374998],[4.46,0.0374998],[4.48,0.0374998],[4.5,0.0374998],[4.52,0.0374998],[4.54,0.0374998],[4.56,0.0374998],[4.58,0.0374998],[4.6,0.0374998],[4.62,0.0374999],[4.64,0.0374999],[4.66,0.0374999],[4.68,0.0374999],[4.7,0.0374999],[4.72,0.0374999],[4.74,0.0374999],[4.76,0.0374999],[4.78,0.0374999],[4.8,0.0374999],[4.82,0.0374999],[4.84,0.0374999],[4.86,0.0374999],[4.88,0.0374999],[4.9,0.0374999],[4.92,0.0374999],[4.94,0.0374999],[4.96,0.0374999],[4.98,0.0374999],[5.0,0.0375],[5.02,0.0375],[5.04,0.0375],[5.06,0.0375],[5.08,0.0375],[5.1,0.0375],[5.12,0.0375],[5.14,0.0375],[5.16,0.0375],[5.18,0.0375],[5.2,0.0375],[5.22,0.0375],[5.24,0.0375],[5.26,0.0375],[5.28,0.0375],[5.3,0.0375],[5.32,0.0375],[5.34,0.0375],[5.36,0.0375],[5.38,0.0375],[5.4,0.0375]],"c":"force4","w":2.4},{"t":"plot","o":[80,250],"sx":100,"sy":5000,"pts":[[0.0,0.014],[0.02,0.014],[0.04,0.014],[0.06,0.014],[0.08,0.014],[0.1,0.014],[0.12,0.014],[0.14,0.014],[0.16,0.014],[0.18,0.014],[0.2,0.014],[0.22,0.014],[0.24,0.014],[0.26,0.014],[0.28,0.014],[0.3,0.014],[0.32,0.014],[0.34,0.014],[0.36,0.014],[0.38,0.014],[0.4,0.014],[0.42,0.014],[0.44,0.014],[0.46,0.014],[0.48,0.014],[0.5,0.014],[0.52,0.014],[0.54,0.014],[0.56,0.014],[0.58,0.014],[0.6,0.014],[0.62,0.014],[0.64,0.014],[0.66,0.014],[0.68,0.014],[0.7,0.014],[0.72,0.014],[0.74,0.014],[0.76,0.014],[0.78,0.014],[0.8,0.014],[0.82,0.014],[0.84,0.014],[0.86,0.014],[0.88,0.014],[0.9,0.014],[0.92,0.014],[0.94,0.014],[0.96,0.014],[0.98,0.014],[1,0.014]],"c":"force2","w":2.4},{"t":"plot","o":[80,250],"sx":100,"sy":5000,"pts":[[1,0.014],[1,0.024]],"c":"force2","w":1.4,"dash":true},{"t":"plot","o":[80,250],"sx":100,"sy":5000,"pts":[[1.0,0.024],[1.02,0.0235001],[1.04,0.023028],[1.06,0.0225821],[1.08,0.022161],[1.1,0.0217633],[1.12,0.0213877],[1.14,0.0210329],[1.16,0.0206978],[1.18,0.0203813],[1.2,0.0200825],[1.22,0.0198002],[1.24,0.0195336],[1.26,0.0192818],[1.28,0.019044],[1.3,0.0188194],[1.32,0.0186072],[1.34,0.0184069],[1.36,0.0182177],[1.38,0.0180389],[1.4,0.0178702],[1.42,0.0177107],[1.44,0.0175602],[1.46,0.017418],[1.48,0.0172837],[1.5,0.0171569],[1.52,0.0170371],[1.54,0.0169239],[1.56,0.0168171],[1.58,0.0167161],[1.6,0.0166208],[1.62,0.0165308],[1.64,0.0164458],[1.66,0.0163655],[1.68,0.0162896],[1.7,0.016218],[1.72,0.0161504],[1.74,0.0160865],[1.76,0.0160261],[1.78,0.0159691],[1.8,0.0159153],[1.82,0.0158645],[1.84,0.0158165],[1.86,0.0157711],[1.88,0.0157283],[1.9,0.0156878],[1.92,0.0156496],[1.94,0.0156136],[1.96,0.0155795],[1.98,0.0155473],[2.0,0.0155169],[2.02,0.0154882],[2.04,0.0154611],[2.06,0.0154355],[2.08,0.0154113],[2.1,0.0153884],[2.12,0.0153669],[2.14,0.0153465],[2.16,0.0153272],[2.18,0.0153091],[2.2,0.0152919],[2.22,0.0152757],[2.24,0.0152604],[2.26,0.0152459],[2.28,0.0152323],[2.3,0.0152194],[2.32,0.0152072],[2.34,0.0151957],[2.36,0.0151848],[2.38,0.0151745],[2.4,0.0151648],[2.42,0.0151557],[2.44,0.015147],[2.46,0.0151389],[2.48,0.0151312],[2.5,0.0151239],[2.52,0.015117],[2.54,0.0151105],[2.56,0.0151044],[2.58,0.0150986],[2.6,0.0150931],[2.62,0.0150879],[2.64,0.015083],[2.66,0.0150784],[2.68,0.0150741],[2.7,0.01507],[2.72,0.0150661],[2.74,0.0150624],[2.76,0.0150589],[2.78,0.0150557],[2.8,0.0150526],[2.82,0.0150496],[2.84,0.0150469],[2.86,0.0150443],[2.88,0.0150418],[2.9,0.0150395],[2.92,0.0150373],[2.94,0.0150352],[2.96,0.0150333],[2.98,0.0150314],[3.0,0.0150297],[3.02,0.015028],[3.04,0.0150265],[3.06,0.015025],[3.08,0.0150236],[3.1,0.0150223],[3.12,0.0150211],[3.14,0.0150199],[3.16,0.0150188],[3.18,0.0150178],[3.2,0.0150168],[3.22,0.0150158],[3.24,0.015015],[3.26,0.0150141],[3.28,0.0150133],[3.3,0.0150126],[3.32,0.0150119],[3.34,0.0150112],[3.36,0.0150106],[3.38,0.01501],[3.4,0.0150095],[3.42,0.0150089],[3.44,0.0150084],[3.46,0.015008],[3.48,0.0150075],[3.5,0.0150071],[3.52,0.0150067],[3.54,0.0150063],[3.56,0.015006],[3.58,0.0150057],[3.6,0.0150053],[3.62,0.015005],[3.64,0.0150048],[3.66,0.0150045],[3.68,0.0150043],[3.7,0.015004],[3.72,0.0150038],[3.74,0.0150036],[3.76,0.0150034],[3.78,0.0150032],[3.8,0.015003],[3.82,0.0150029],[3.84,0.0150027],[3.86,0.0150025],[3.88,0.0150024],[3.9,0.0150023],[3.92,0.0150021],[3.94,0.015002],[3.96,0.0150019],[3.98,0.0150018],[4.0,0.0150017],[4.02,0.0150016],[4.04,0.0150015],[4.06,0.0150014],[4.08,0.0150014],[4.1,0.0150013],[4.12,0.0150012],[4.14,0.0150011],[4.16,0.0150011],[4.18,0.015001],[4.2,0.015001],[4.22,0.0150009],[4.24,0.0150009],[4.26,0.0150008],[4.28,0.0150008],[4.3,0.0150007],[4.32,0.0150007],[4.34,0.0150006],[4.36,0.0150006],[4.38,0.0150006],[4.4,0.0150005],[4.42,0.0150005],[4.44,0.0150005],[4.46,0.0150005],[4.48,0.0150004],[4.5,0.0150004],[4.52,0.0150004],[4.54,0.0150004],[4.56,0.0150003],[4.58,0.0150003],[4.6,0.0150003],[4.62,0.0150003],[4.64,0.0150003],[4.66,0.0150003],[4.68,0.0150002],[4.7,0.0150002],[4.72,0.0150002],[4.74,0.0150002],[4.76,0.0150002],[4.78,0.0150002],[4.8,0.0150002],[4.82,0.0150002],[4.84,0.0150002],[4.86,0.0150001],[4.88,0.0150001],[4.9,0.0150001],[4.92,0.0150001],[4.94,0.0150001],[4.96,0.0150001],[4.98,0.0150001],[5.0,0.0150001],[5.02,0.0150001],[5.04,0.0150001],[5.06,0.0150001],[5.08,0.0150001],[5.1,0.0150001],[5.12,0.0150001],[5.14,0.0150001],[5.16,0.0150001],[5.18,0.0150001],[5.2,0.0150001],[5.22,0.0150001],[5.24,0.015],[5.26,0.015],[5.28,0.015],[5.3,0.015],[5.32,0.015],[5.34,0.015],[5.36,0.015],[5.38,0.015],[5.4,0.015]],"c":"force2","w":2.4},{"t":"text","p":[90.0,77.0],"s":"N₂O₄","c":"force4","size":12,"a":"start"},{"t":"text","p":[90.0,172.0],"s":"NO₂","c":"force2","size":12,"a":"start"},{"t":"text","p":[188,130.0],"s":"si aggiunge NO₂","c":"ax","size":11,"a":"start"},{"t":"text","p":[624.0,54.5],"s":"0,0375","c":"force4","size":11,"a":"end"},{"t":"text","p":[624.0,167.0],"s":"0,0150","c":"force2","size":11,"a":"end"},{"t":"text","p":[400.0,137.5],"s":"nuovo equilibrio","c":"force3","size":12}]}
---
Risposta dell'equilibrio $\mathrm{N_2O_4}\rightleftharpoons2\,\mathrm{NO_2}$ all'aggiunta di diossido di azoto, a $25\,^\circ\mathrm C$. Il diossido aggiunto si trasforma in parte in tetrossido; al nuovo equilibrio entrambe le concentrazioni sono più alte di prima, e il rapporto $[\mathrm{NO_2}]^2/[\mathrm{N_2O_4}]$ è tornato uguale alla costante.
:::

Il risultato illustra bene il significato del principio. Dei $0{,}0100\un{mol/L}$ di diossido aggiunti, circa $0{,}009$ si sono dimerizzati; ne resta un eccesso di $0{,}0010\un{mol/L}$ rispetto all'equilibrio precedente. La reazione si è opposta all'aggiunta senza annullarla.

Togliere una sostanza ha l'effetto opposto, ed è uno strumento molto usato nella pratica. Se un prodotto viene allontanato continuamente, il quoziente resta sempre minore della costante e la reazione continua a procedere, fino a consumare i reagenti. È il principio con cui si spinge a completamento l'esterificazione del capitolo precedente, distillando l'estere o sottraendo l'acqua man mano che si forma; con cui le fornaci da calce allontanano l'anidride carbonica dal calcare in decomposizione; con cui gli impianti per l'ammoniaca condensano il prodotto. In soluzione lo stesso effetto si ottiene quando un prodotto precipita o si sviluppa come gas, come nelle reazioni di precipitazione del capitolo [Solubilità ed equilibrio eterogeneo](unit:chemistry-13).

L'aggiunta di un solido o di un liquido puro che partecipa all'equilibrio non lo sposta, perché queste sostanze non compaiono nell'espressione di $Q$. Aggiungere ossido di calcio a un recipiente in cui il calcare è in equilibrio con il proprio prodotto gassoso lascia invariata la pressione dell'anidride carbonica.

## Comprimere ed espandere {#pressione}

Per un equilibrio fra gas, una variazione di volume a temperatura costante cambia tutte le pressioni parziali nella stessa proporzione. Se il volume si dimezza, ogni pressione parziale raddoppia. Il quoziente scritto con le pressioni contiene un fattore $p$ per ogni molecola di prodotto al numeratore e per ogni molecola di reagente al denominatore; raddoppiando tutte le pressioni, $Q$ viene moltiplicato per $2^{\Delta n}$, dove $\Delta n$ è la variazione del numero di moli di gas nella reazione.

- Se $\Delta n<0$, come nella sintesi dell'ammoniaca, $\mathrm{N_2}+3\,\mathrm{H_2}\rightleftharpoons2\,\mathrm{NH_3}$, con $\Delta n=-2$, la compressione rende $Q$ minore di $K$, e la reazione procede verso i prodotti, che occupano meno moli di gas.
- Se $\Delta n>0$, come nella dissociazione del tetrossido di diazoto, la compressione rende $Q$ maggiore di $K$, e la reazione procede verso i reagenti.
- Se $\Delta n=0$, come in $\mathrm{N_2}+\mathrm{O_2}\rightleftharpoons2\,\mathrm{NO}$, la compressione lascia $Q$ invariato, e l'equilibrio non si sposta.

In ogni caso la compressione favorisce il lato con meno molecole di gas, in accordo con il principio di Le Chatelier: riducendo il numero di molecole, il sistema attenua l'aumento di pressione. Per il tetrossido di diazoto, il capitolo precedente ha mostrato che a $25\,^\circ\mathrm C$ la frazione dissociata vale $\alpha=\sqrt{K_p/(K_p+4P)}$: è $0{,}189$ a $1\un{bar}$ di pressione totale e $0{,}520$ a $0{,}10\un{bar}$.

Un caso che trae spesso in inganno è l'aggiunta di un gas inerte, che non partecipa alla reazione, come l'argon. Se lo si aggiunge a volume costante, la pressione totale aumenta e le pressioni parziali dei gas che reagiscono restano le stesse: $Q$ non cambia, e l'equilibrio resta dov'era. Se lo si aggiunge mantenendo costante la pressione totale, il volume aumenta e le pressioni parziali dei gas che reagiscono diminuiscono: l'effetto è quello di un'espansione, che favorisce il lato con più molecole di gas.

## Cambiare la temperatura {#temperatura}

Le perturbazioni viste finora lasciano invariata la costante. La temperatura è diversa: modifica la costante stessa. Il verso si prevede considerando il calore come se fosse un reagente o un prodotto. In una reazione esotermica il calore è un prodotto; scaldare equivale ad aggiungere un prodotto, e l'equilibrio si sposta verso i reagenti. In una reazione endotermica il calore è un reagente, e scaldare sposta l'equilibrio verso i prodotti.

::: legge Temperatura e costante di equilibrio
Per una reazione endotermica ($\Delta H^\circ>0$) la costante di equilibrio aumenta con la temperatura; per una reazione esotermica ($\Delta H^\circ<0$) diminuisce.
:::

La dissociazione del tetrossido di diazoto è endotermica, con $\Delta H^\circ=+57{,}2\un{kJ}$: rompere il legame fra i due gruppi $\mathrm{NO_2}$ richiede energia. Il diossido di azoto è un gas bruno-rossastro, il tetrossido è incolore; un'ampolla sigillata che contiene la miscela è quasi incolore in un bagno di ghiaccio e diventa bruno intenso in acqua bollente. È una delle dimostrazioni più classiche del principio di Le Chatelier.

::: figura dissociazione
{"w":660,"h":306,"items":[{"t":"axes","o":[80,250],"x":[560,""],"y":[225,""],"sx":5.2,"sy":215,"xt":[[20,"20"],[40,"40"],[60,"60"],[80,"80"],[100,"100"]],"yt":[[0.25,"0,25"],[0.5,"0,50"],[0.75,"0,75"],[1.0,"1,00"]]},{"t":"text","p":[96,28],"s":"frazione dissociata di N₂O₄ a 1 bar","c":"ax","size":12,"a":"start"},{"t":"text","p":[630,292],"s":"temperatura (°C)","c":"ax","size":13,"a":"end"},{"t":"plot","o":[80,250],"sx":5.2,"sy":215,"pts":[[0,0.066847],[2,0.0732219],[4,0.0800922],[6,0.0874859],[8,0.0954308],[10,0.1039553],[12,0.1130878],[14,0.1228563],[16,0.1332883],[18,0.1444103],[20,0.1562475],[22,0.1688234],[24,0.1821589],[26,0.1962721],[28,0.2111773],[30,0.2268844],[32,0.2433982],[34,0.2607174],[36,0.2788339],[38,0.2977318],[40,0.3173868],[42,0.3377655],[44,0.3588245],[46,0.3805106],[48,0.4027601],[50,0.4254991],[52,0.4486441],[54,0.4721027],[56,0.4957748],[58,0.5195539],[60,0.5433293],[62,0.566988],[64,0.5904171],[66,0.6135059],[68,0.6361485],[70,0.6582462],[72,0.679709],[74,0.7004572],[76,0.720423],[78,0.7395512],[80,0.7577991],[82,0.775137],[84,0.791547],[86,0.8070229],[88,0.8215689],[90,0.8351981],[92,0.8479316],[94,0.8597969],[96,0.8708268],[98,0.8810579],[100,0.8905298]],"c":"force4","w":2.6},{"t":"circle","p":[80.0,235.6,4.5],"c":"force2"},{"t":"text","p":[88.0,227.6],"s":"0,07","c":"ax","size":11,"a":"start"},{"t":"circle","p":[210.0,209.3,4.5],"c":"force2"},{"t":"text","p":[218.0,221.3],"s":"0,19","c":"ax","size":11,"a":"start"},{"t":"circle","p":[340.0,158.5,4.5],"c":"force2"},{"t":"text","p":[348.0,170.5],"s":"0,43","c":"ax","size":11,"a":"start"},{"t":"circle","p":[600.0,58.5,4.5],"c":"force2"},{"t":"text","p":[608.0,70.5],"s":"0,89","c":"ax","size":11,"a":"start"},{"t":"text","p":[366.0,67.2],"s":"più NO₂: gas più bruno","c":"force4","size":12,"a":"end"}]}
---
Frazione di tetrossido di diazoto dissociata in diossido di azoto, alla pressione totale di $1\un{bar}$, in funzione della temperatura. I valori sono stimati dalla costante a $25\,^\circ\mathrm C$ con l'equazione di van 't Hoff, supponendo $\Delta H^\circ$ costante. Il colore bruno della miscela si intensifica a temperatura più alta.
:::

La sintesi dell'ammoniaca è invece esotermica, con $\Delta H^\circ=-92{,}2\un{kJ}$ a $25\,^\circ\mathrm C$, e la sua costante diminuisce rapidamente scaldando. Con le pressioni in atmosfere, la costante $K_p$ della reazione $\mathrm{N_2}+3\,\mathrm{H_2}\rightleftharpoons2\,\mathrm{NH_3}$ misurata ad alta temperatura vale:

- $4{,}34\times10^{-3}$ a $300\,^\circ\mathrm C$;
- $1{,}64\times10^{-4}$ a $400\,^\circ\mathrm C$;
- $4{,}51\times10^{-5}$ a $450\,^\circ\mathrm C$;
- $1{,}45\times10^{-5}$ a $500\,^\circ\mathrm C$;
- $5{,}38\times10^{-6}$ a $550\,^\circ\mathrm C$;
- $2{,}25\times10^{-6}$ a $600\,^\circ\mathrm C$.

In trecento gradi la costante diminuisce di più di mille volte.

## L'equazione di van 't Hoff {#van-t-hoff}

La dipendenza della costante dalla temperatura segue dalla relazione fra energia di Gibbs standard e costante. Combinando $\Delta G^\circ=-RT\ln K$ con $\Delta G^\circ=\Delta H^\circ-T\Delta S^\circ$ si ottiene

$$\ln K=-\frac{\Delta H^\circ}{R}\cdot\frac1T+\frac{\Delta S^\circ}{R}.$$

Se $\Delta H^\circ$ e $\Delta S^\circ$ variano poco nell'intervallo di temperatura considerato, il grafico di $\ln K$ in funzione di $1/T$ è una retta con pendenza $-\Delta H^\circ/R$ e intercetta $\Delta S^\circ/R$. Scrivendo l'equazione a due temperature e sottraendo, l'entropia si elimina.

::: legge Equazione di van 't Hoff
Se $K_1$ e $K_2$ sono le costanti di equilibrio alle temperature $T_1$ e $T_2$,
$$\ln\frac{K_2}{K_1}=-\frac{\Delta H^\circ}{R}\left(\frac1{T_2}-\frac1{T_1}\right).$$
:::

La forma è identica a quella dell'equazione di Arrhenius del capitolo [Temperatura e attivazione](unit:chemistry-18), con l'entalpia di reazione al posto dell'energia di attivazione. La somiglianza ha una ragione: la costante di equilibrio è il rapporto fra le costanti di velocità delle reazioni diretta e inversa, e la differenza fra le due energie di attivazione è proprio l'entalpia di reazione.

::: esempio Il tetrossido di diazoto a 50 °C
A $25\,^\circ\mathrm C$ la dissociazione del tetrossido ha $K_p=0{,}148$ e $\Delta H^\circ=+57{,}2\un{kJ}$. Stimare la costante a $50\,^\circ\mathrm C$ e la frazione dissociata a $1\un{bar}$.

$$\ln\frac{K_2}{0{,}148}=-\frac{57\,200}{8{,}314}\left(\frac1{323{,}15}-\frac1{298{,}15}\right)=1{,}785,$$

quindi $K_2=0{,}148\times e^{1{,}785}\simeq0{,}88$. Venticinque gradi in più moltiplicano la costante per circa sei. La frazione dissociata sale da $0{,}19$ a $\sqrt{0{,}88/4{,}88}\simeq0{,}43$.
:::

::: figura vanthoff
{"w":640,"h":306,"items":[{"t":"axes","o":[80,250],"x":[340,""],"y":[215,""],"sx":420,"sy":15.5,"xt":[[0.2,"1,2"],[0.4,"1,4"],[0.6,"1,6"]],"yt":[[0.5,"−14"],[2.5,"−12"],[4.5,"−10"],[6.5,"−8"],[8.5,"−6"]]},{"t":"text","p":[40,28],"s":"ln Kₚ","c":"ax","size":12,"a":"start"},{"t":"text","p":[420,292],"s":"1000/T (1/K)","c":"ax","size":13,"a":"end"},{"t":"plot","o":[80,250],"sx":420,"sy":15.5,"pts":[[0.12,1.1725231],[0.77,9.3776111]],"c":"force3","w":1.6,"dash":true},{"t":"circle","p":[392.8,109.6,5],"c":"force2"},{"t":"text","p":[400.8,125.6],"s":"300 °C","c":"ax","size":11,"a":"start"},{"t":"circle","p":[283.9,160.3,5],"c":"force2"},{"t":"text","p":[291.9,176.3],"s":"400 °C","c":"ax","size":11,"a":"start"},{"t":"circle","p":[240.8,180.4,5],"c":"force2"},{"t":"text","p":[248.8,196.4],"s":"450 °C","c":"ax","size":11,"a":"start"},{"t":"circle","p":[203.2,197.9,5],"c":"force2"},{"t":"text","p":[211.2,213.9],"s":"500 °C","c":"ax","size":11,"a":"start"},{"t":"circle","p":[170.2,213.3,5],"c":"force2"},{"t":"text","p":[178.2,229.3],"s":"550 °C","c":"ax","size":11,"a":"start"},{"t":"circle","p":[141.0,226.8,5],"c":"force2"},{"t":"text","p":[149.0,242.8],"s":"600 °C","c":"ax","size":11,"a":"start"},{"t":"text","p":[440,200],"s":"pendenza = −ΔH°/R","c":"force3","size":12,"a":"start"},{"t":"text","p":[440,222],"s":"ΔH° ≈ −105 kJ","c":"force3","size":12,"a":"start"}]}
---
Grafico di van 't Hoff per la sintesi dell'ammoniaca, con le costanti misurate fra $300$ e $600\,^\circ\mathrm C$ (pressioni in atmosfere). I punti stanno quasi su una retta di pendenza positiva, come si attende per una reazione esotermica; la pendenza corrisponde a $\Delta H^\circ\simeq-105\un{kJ}$.
:::

Il valore ricavato dal grafico, circa $-105\un{kJ}$, è più negativo del valore a $25\,^\circ\mathrm C$, $-92{,}2\un{kJ}$. La differenza è reale: l'entalpia di reazione cambia con la temperatura, perché le capacità termiche dei reagenti e dei prodotti sono diverse. Le tabelle termodinamiche danno, a $700\un{K}$, un'entalpia di formazione dell'ammoniaca di $-52{,}6\un{kJ/mol}$, cioè $-105{,}2\un{kJ}$ per la reazione scritta con due moli, in ottimo accordo con il grafico. L'approssimazione di $\Delta H^\circ$ costante funziona bene su intervalli di qualche decina di gradi; su intervalli di centinaia di gradi conviene usare i dati misurati alla temperatura che interessa.

## Che cosa lascia l'equilibrio dov'è {#invarianti}

Alcune modifiche, a prima vista importanti, non spostano l'equilibrio.

- **Un catalizzatore.** Abbassa nella stessa misura le barriere della reazione diretta e di quella inversa; il sistema raggiunge prima l'equilibrio, nella stessa posizione.
- **Un gas inerte aggiunto a volume costante.** Le pressioni parziali dei gas che reagiscono restano le stesse.
- **Una quantità in più di un solido o di un liquido puro** che partecipa all'equilibrio, purché ne resti un po'.
- **Una variazione di volume quando $\Delta n=0$.**

La costante, a sua volta, dipende soltanto dalla temperatura. Le concentrazioni all'equilibrio cambiano ogni volta che cambiano le quantità o il volume; la costante resta la stessa finché resta la stessa la temperatura.

::: approfondimento Quando il principio inganna
Il principio di Le Chatelier è una regola qualitativa, e in qualche caso particolare sbaglia. L'esempio più noto riguarda proprio la sintesi dell'ammoniaca. Si consideri a $450\,^\circ\mathrm C$ e $200\un{atm}$ una miscela all'equilibrio molto ricca di azoto: $6{,}88\un{mol}$ di azoto, $0{,}646\un{mol}$ di idrogeno e $0{,}236\un{mol}$ di ammoniaca, cioè l'$88{,}6\%$ di azoto. Si aggiungono $0{,}50\un{mol}$ di azoto mantenendo costante la pressione totale. Il principio suggerirebbe che si formi altra ammoniaca. Il calcolo del quoziente dice il contrario: l'aggiunta fa crescere il numero totale di moli e diminuire le frazioni molari dell'idrogeno e dell'ammoniaca, e il quoziente passa da $4{,}51\times10^{-5}$ a $4{,}76\times10^{-5}$, oltre la costante. Una piccola parte dell'ammoniaca si decompone. Si dimostra che, per questa reazione a pressione costante, l'aggiunta di azoto sposta l'equilibrio verso i reagenti ogni volta che la frazione molare dell'azoto supera $1/2$. Il confronto fra $Q$ e $K$ dà sempre la risposta giusta; il principio la dà quasi sempre.
:::

## La sintesi dell'ammoniaca {#haber}

La reazione

$$\mathrm{N_2(g)}+3\,\mathrm{H_2(g)}\rightleftharpoons2\,\mathrm{NH_3(g)},\qquad\Delta H^\circ=-92{,}2\un{kJ},\quad\Delta S^\circ=-198{,}7\un{J/K},$$

è un esempio quasi perfetto dei compromessi fra equilibrio e velocità. A $25\,^\circ\mathrm C$ la sua energia di Gibbs standard vale $-32{,}9\un{kJ}$ e la costante circa $6\times10^5$: l'equilibrio è nettamente spostato verso l'ammoniaca. A quella temperatura però la reazione è troppo lenta per essere osservata, anche con un catalizzatore, perché il legame triplo dell'azoto, con un'energia di $945\un{kJ/mol}$, deve essere spezzato e la barriera è altissima. Per avere velocità utili bisogna scaldare, e scaldando la costante crolla. Con l'entalpia e l'entropia a $25\,^\circ\mathrm C$ la costante vale $1$ intorno a $190\,^\circ\mathrm C$; a $450\,^\circ\mathrm C$ è già scesa a $4{,}5\times10^{-5}$.

Le scelte industriali seguono da questa tensione.

- **Temperatura.** Si lavora fra circa $400$ e $500\,^\circ\mathrm C$, la temperatura più bassa alla quale il catalizzatore rende la reazione abbastanza rapida. Una temperatura più alta darebbe velocità maggiori e un'ammoniaca all'equilibrio troppo scarsa; una più bassa, il contrario.
- **Pressione.** Poiché la reazione riduce da quattro a due il numero di moli di gas, la compressione sposta l'equilibrio verso l'ammoniaca. Gli impianti lavorano tipicamente fra $150$ e $300\un{atm}$; pressioni maggiori aumenterebbero la resa, con costi crescenti per i compressori e per i recipienti in acciaio.
- **Catalizzatore.** Un catalizzatore a base di ferro, con piccole aggiunte di ossidi di alluminio, di potassio e di calcio che ne migliorano l'attività e la durata, abbassa la barriera. Lascia invariata la costante e rende possibile lavorare a temperature dove la costante è ancora accettabile.
- **Rimozione del prodotto.** Il gas che esce dal reattore viene raffreddato: l'ammoniaca, che liquefa molto più facilmente dell'azoto e dell'idrogeno, condensa e si separa. I gas non reagiti tornano al reattore.

::: figura resa
{"w":680,"h":306,"items":[{"t":"axes","o":[80,250],"x":[560,""],"y":[215,""],"sx":1.35,"sy":4.2,"xt":[[100,"100"],[200,"200"],[300,"300"],[400,"400"]],"yt":[[10,"10"],[20,"20"],[30,"30"],[40,"40"]]},{"t":"text","p":[40,28],"s":"ammoniaca all'equilibrio (%)","c":"ax","size":12,"a":"start"},{"t":"text","p":[630,292],"s":"pressione (atm)","c":"ax","size":13,"a":"end"},{"t":"plot","o":[80,250],"sx":1.35,"sy":4.2,"pts":[[1,0.4124713],[10,3.845256],[20,7.1681607],[30,10.086773],[40,12.6834398],[50,15.0178882],[60,17.1348112],[70,19.0685153],[80,20.8458997],[90,22.4884386],[100,24.0135421],[110,25.4355156],[120,26.7662531],[130,28.015746],[140,29.1924666],[150,30.3036579],[160,31.3555591],[170,32.3535814],[180,33.3024464],[190,34.2062979],[200,35.0687912],[210,35.8931664],[220,36.6823081],[230,37.4387953],[240,38.1649421],[250,38.8628329],[260,39.5343508],[270,40.1812031],[280,40.8049416],[290,41.4069812],[300,41.9886149],[310,42.5510274],[320,43.0953067],[330,43.6224542],[340,44.1333936],[350,44.6289782],[360,45.1099984],[370,45.5771871],[380,46.0312253],[390,46.4727469],[400,46.9023427]],"c":"force2","w":2.4},{"t":"text","p":[626.0,57.0],"s":"400 °C","c":"force2","size":12,"a":"start"},{"t":"plot","o":[80,250],"sx":1.35,"sy":4.2,"pts":[[1,0.2171511],[10,2.0907293],[20,4.0184254],[30,5.8052963],[40,7.4693289],[50,9.0252964],[60,10.4854815],[70,11.8602069],[80,13.1582304],[90,14.3870463],[100,15.5531165],[110,16.6620513],[120,17.7187528],[130,18.7275282],[140,19.6921825],[150,20.6160931],[160,21.5022712],[170,22.3534127],[180,23.1719405],[190,23.9600397],[200,24.7196881],[210,25.4526806],[220,26.1606518],[230,26.8450937],[240,27.507372],[250,28.1487399],[260,28.7703498],[270,29.3732639],[280,29.9584633],[290,30.5268559],[300,31.0792833],[310,31.6165274],[320,32.1393154],[330,32.6483253],[340,33.1441895],[350,33.6274994],[360,34.0988085],[370,34.5586355],[380,35.0074672],[390,35.4457612],[400,35.8739477]],"c":"force3","w":2.4},{"t":"text","p":[626.0,103.3],"s":"450 °C","c":"force3","size":12,"a":"start"},{"t":"plot","o":[80,250],"sx":1.35,"sy":4.2,"pts":[[1,0.1233598],[10,1.2069755],[20,2.3580281],[30,3.4578124],[40,4.5104283],[50,5.5195061],[60,6.4882755],[70,7.4196229],[80,8.316138],[90,9.1801534],[100,10.0137776],[110,10.8189226],[120,11.5973278],[130,12.3505798],[140,13.0801303],[150,13.7873103],[160,14.4733436],[170,15.1393577],[180,15.7863939],[190,16.4154154],[200,17.0273154],[210,17.6229232],[220,18.2030105],[230,18.7682966],[240,19.3194525],[250,19.8571059],[260,20.3818442],[270,20.894218],[280,21.3947443],[290,21.8839091],[300,22.3621696],[310,22.8299565],[320,23.2876763],[330,23.7357126],[340,24.174428],[350,24.6041658],[360,25.025251],[370,25.4379916],[380,25.84268],[390,26.2395938],[400,26.6289968]],"c":"force4","w":2.4},{"t":"text","p":[626.0,142.2],"s":"500 °C","c":"force4","size":12,"a":"start"},{"t":"plot","o":[80,250],"sx":1.35,"sy":4.2,"pts":[[200,0],[200,24.7196881]],"c":"muted","w":1,"dash":true},{"t":"circle","p":[350.0,146.2,5],"c":"force"},{"t":"text","p":[342.0,136.2],"s":"condizioni tipiche","c":"ax","size":11,"a":"end"}]}
---
Percentuale di ammoniaca all'equilibrio per una miscela di azoto e idrogeno in rapporto $1:3$, in funzione della pressione, a tre temperature. Le curve sono calcolate con le costanti misurate e il modello del gas ideale; alle pressioni più alte i valori reali sono di qualche punto percentuale superiori. Il punto indica condizioni tipiche di un impianto, $450\,^\circ\mathrm C$ e $200\un{atm}$, con circa il $25\%$ di ammoniaca all'equilibrio.
:::

In un singolo passaggio nel reattore la miscela non raggiunge nemmeno l'equilibrio, e si converte in ammoniaca soltanto una frazione intorno al $15\%$ dei gas. Il problema si risolve riciclando i gas rimasti inalterati. Ripassando molte volte sul catalizzatore, quasi tutto l'azoto e l'idrogeno immessi finiscono per trasformarsi, e la conversione complessiva supera il $95\%$. Una piccola parte del gas di ricircolo viene scaricata a ogni giro, per evitare l'accumulo dell'argon e del metano presenti come impurezze.

::: figura ciclo
{"w":660,"h":260,"items":[{"t":"rect","p":[30,90,120,64],"c":"body","r":6},{"t":"poly","pts":[[30,90],[150,90],[150,154],[30,154]],"close":true,"c":"force2","w":1.6},{"t":"text","p":[90.0,118.0],"s":"compressore","c":"ax","size":13},{"t":"text","p":[90.0,136.0],"s":"fino a ~200 atm","c":"muted","size":11},{"t":"rect","p":[220,90,150,64],"c":"body","r":6},{"t":"poly","pts":[[220,90],[370,90],[370,154],[220,154]],"close":true,"c":"force","w":1.6},{"t":"text","p":[295.0,118.0],"s":"reattore","c":"ax","size":13},{"t":"text","p":[295.0,136.0],"s":"ferro, 400–500 °C","c":"muted","size":11},{"t":"rect","p":[440,90,150,64],"c":"body","r":6},{"t":"poly","pts":[[440,90],[590,90],[590,154],[440,154]],"close":true,"c":"force2","w":1.6},{"t":"text","p":[515.0,118.0],"s":"condensatore","c":"ax","size":13},{"t":"text","p":[515.0,136.0],"s":"raffreddamento","c":"muted","size":11},{"t":"text","p":[24,62],"s":"N₂ + 3 H₂","c":"force3","size":13,"a":"start"},{"t":"arrow","p":[52,68,60,88],"c":"force3","w":2,"head":8},{"t":"arrow","p":[152,122,218,122],"c":"ax","w":2,"head":9},{"t":"arrow","p":[372,122,438,122],"c":"ax","w":2,"head":9},{"t":"text","p":[405,112],"s":"~15% NH₃","c":"muted","size":11},{"t":"arrow","p":[515,156,515,214],"c":"force4","w":2.2,"head":9},{"t":"text","p":[525,236],"s":"ammoniaca liquida","c":"force4","size":13,"a":"start"},{"t":"poly","pts":[[590,122],[630,122],[630,40],[120,40],[120,60]],"c":"force3","w":1.8,"dash":true},{"t":"arrow","p":[120,58,120,88],"c":"force3","w":1.8,"head":8},{"t":"text","p":[360,32],"s":"gas non reagiti riciclati","c":"force3","size":12}]}
---
Schema del ciclo di sintesi dell'ammoniaca. La miscela di azoto e idrogeno viene compressa, attraversa il reattore con il catalizzatore, si raffredda nel condensatore, dove l'ammoniaca si separa allo stato liquido; i gas non reagiti tornano al compressore insieme alla miscela fresca.
:::

L'idrogeno oggi si ricava quasi tutto dal metano, per reazione con il vapore acqueo; l'azoto dall'aria. Secondo l'Agenzia internazionale dell'energia, la produzione di ammoniaca assorbe circa il $2\%$ del consumo finale di energia del mondo. Nel 2024, secondo il servizio geologico degli Stati Uniti, la produzione mondiale ha raggiunto circa $150$ milioni di tonnellate di azoto, cioè circa $180$ milioni di tonnellate di ammoniaca, per la maggior parte destinate ai fertilizzanti. Le ricerche sull'ammoniaca «verde», con idrogeno prodotto dall'elettrolisi dell'acqua con energia rinnovabile, cercano di ridurre le emissioni di anidride carbonica legate al processo.

## Il triossido di zolfo e l'acido solforico {#contatto}

L'acido solforico è il composto chimico prodotto in maggiore quantità al mondo, e quasi tutto si ottiene con il **processo di contatto**. Lo zolfo, bruciato in aria, dà anidride solforosa; questa viene ossidata a triossido di zolfo,

$$2\,\mathrm{SO_2(g)}+\mathrm{O_2(g)}\rightleftharpoons2\,\mathrm{SO_3(g)},\qquad\Delta H^\circ=-197{,}8\un{kJ},$$

e il triossido, assorbito in acido solforico concentrato, si trasforma in acido. Anche questa reazione è esotermica e riduce il numero di moli di gas, come la sintesi dell'ammoniaca; le scelte industriali sono però diverse, perché la costante è molto più grande. Con l'entalpia e l'entropia standard, $\Delta S^\circ=-187{,}9\un{J/K}$, supposte costanti, a $450\,^\circ\mathrm C$ si stima $\Delta G^\circ\simeq-62\un{kJ}$ e $K_p\simeq3\times10^4$. Una miscela con il $10\%$ di anidride solforosa e l'$11\%$ di ossigeno, il resto azoto, a $1\un{bar}$ si converte all'equilibrio per circa il $98\%$. La compressione è superflua, e gli impianti lavorano a pressioni appena superiori a quella atmosferica, fra $400$ e $600\,^\circ\mathrm C$, con un catalizzatore a base di pentossido di vanadio che rende la reazione abbastanza veloce.

Per superare il $99{,}5\%$ di conversione, come richiedono i limiti alle emissioni di anidride solforosa, si usa ancora il principio di Le Chatelier. Il gas attraversa alcuni strati di catalizzatore, raffreddandosi fra uno strato e l'altro perché la reazione esotermica lo scalda e sposterebbe l'equilibrio verso i reagenti; poi il triossido già formato viene assorbito, e il gas residuo, privato del prodotto, torna sul catalizzatore. In questo secondo passaggio il quoziente di reazione è di nuovo molto minore della costante, e quasi tutta l'anidride solforosa rimasta si trasforma. La tecnica, detta del doppio assorbimento, è oggi lo standard degli impianti.

::: quotidiano In alta quota
L'emoglobina dei globuli rossi trasporta l'ossigeno legandolo in modo reversibile, secondo un equilibrio che si può schematizzare come $\mathrm{Hb}+\mathrm{O_2}\rightleftharpoons\mathrm{HbO_2}$. Nei polmoni la pressione dell'ossigeno è alta e l'equilibrio si sposta verso l'emoglobina ossigenata; nei tessuti, dove l'ossigeno viene consumato, l'equilibrio si sposta verso sinistra e l'ossigeno si libera. In alta montagna la pressione dell'aria diminuisce, e con essa la pressione parziale dell'ossigeno: a circa $5500\un{m}$ è la metà che al livello del mare. Meno ossigeno nei polmoni significa meno emoglobina ossigenata, e il fiato corto degli alpinisti. Nelle settimane di permanenza in quota l'organismo risponde producendo più globuli rossi: aumenta la quantità di emoglobina, e con essa la quantità di ossigeno legato, come vorrebbe il principio di Le Chatelier. Il monossido di carbonio è pericoloso per la ragione opposta: si lega all'emoglobina molto più fortemente dell'ossigeno, circa duecento volte di più, e la sottrae al trasporto. La terapia consiste nel far respirare ossigeno puro, talvolta in camera iperbarica, per spostare l'equilibrio verso l'emoglobina ossigenata e liberare il monossido.
:::

::: storia Le Chatelier, Haber e Bosch
Henry Louis Le Chatelier, chimico e ingegnere minerario francese, enunciò il suo principio nel 1884, in una nota all'Accademia delle scienze; il fisico tedesco Karl Ferdinand Braun ne diede una formulazione analoga nel 1887, e il principio è talvolta chiamato di Le Chatelier e Braun. Nello stesso periodo van 't Hoff ricavava dalla termodinamica la dipendenza delle costanti dalla temperatura. All'inizio del Novecento il nitrato di sodio del Cile era una risorsa strategica, tanto che il possesso dei giacimenti era stato una delle cause della guerra del Pacifico fra Cile, Perù e Bolivia (1879–1884). Nel 1909 Fritz Haber, con il collaboratore Robert Le Rossignol, dimostrò a Karlsruhe un apparecchio da laboratorio che produceva ammoniaca dall'azoto e dall'idrogeno, al ritmo di circa un bicchiere all'ora, usando un catalizzatore di osmio ad alta pressione. La ditta BASF affidò a Carl Bosch il compito di trasformarlo in un impianto industriale: servivano reattori in acciaio capaci di resistere a idrogeno caldo ad alta pressione, e un catalizzatore economico, che Alwin Mittasch trovò nel ferro con piccole aggiunte di altri ossidi dopo migliaia di prove. Il primo impianto entrò in funzione a Oppau nel 1913. Haber ricevette il premio Nobel per la chimica nel 1918, Bosch nel 1931. La figura di Haber resta controversa: durante la prima guerra mondiale diresse il programma tedesco delle armi chimiche e organizzò il primo attacco con il cloro, a Ypres nel 1915.
:::

## Errori frequenti {#errori}

::: errore Aggiungere un reagente cambia la costante
L'aggiunta di un reagente cambia il quoziente di reazione; la costante resta la stessa. Il sistema evolve finché il quoziente torna uguale alla costante, con concentrazioni di equilibrio diverse da quelle iniziali.
:::

::: errore L'equilibrio annulla completamente la perturbazione
La compensazione è sempre parziale. Aggiungendo diossido di azoto all'equilibrio con il tetrossido, una parte del diossido si dimerizza, e al nuovo equilibrio la sua concentrazione resta più alta di prima.
:::

::: errore La pressione sposta sempre l'equilibrio
La compressione sposta l'equilibrio soltanto se la reazione cambia il numero di moli di gas. Se $\Delta n=0$, o se l'aumento di pressione è dovuto a un gas inerte aggiunto a volume costante, l'equilibrio resta dov'era.
:::

::: errore Scaldare favorisce sempre i prodotti
Scaldare favorisce le reazioni endotermiche. Per una reazione esotermica, come la sintesi dell'ammoniaca, la temperatura alta riduce la costante e la resa all'equilibrio; la si usa per aumentare la velocità, accettando una resa minore.
:::

::: errore Il catalizzatore aumenta la resa
Il catalizzatore accorcia il tempo necessario per raggiungere l'equilibrio e lascia invariata la sua composizione. Nella sintesi dell'ammoniaca permette di lavorare a una temperatura più bassa, ed è per questa via indiretta che migliora la resa.
:::

## Sintesi {#sintesi}

::: sintesi Che cosa portare con sé
- Un sistema all'equilibrio perturbato reagisce in modo da opporsi in parte alla perturbazione (principio di Le Chatelier).
- Aggiungere o togliere sostanze e cambiare il volume modifica $Q$ e lascia invariata $K$; la reazione procede finché $Q=K$.
- Allontanare un prodotto spinge la reazione verso il completamento.
- Comprimere una miscela di gas favorisce il lato con meno moli di gas; con $\Delta n=0$ la pressione non ha effetto; un gas inerte a volume costante non ha effetto.
- La temperatura cambia $K$: la aumenta per le reazioni endotermiche e la diminuisce per quelle esotermiche.
- Equazione di van 't Hoff: $\ln(K_2/K_1)=-(\Delta H^\circ/R)(1/T_2-1/T_1)$.
- I catalizzatori fanno raggiungere prima l'equilibrio senza spostarlo.
- Nella sintesi dell'ammoniaca temperatura, pressione, catalizzatore, rimozione del prodotto e riciclo sono un compromesso fra resa all'equilibrio e velocità.
:::

## Glossario {#glossario}

- **Perturbazione**: variazione di una condizione di un sistema all'equilibrio, come una concentrazione, il volume o la temperatura.
- **Principio di Le Chatelier**: un sistema all'equilibrio perturbato evolve nel verso che si oppone in parte alla perturbazione.
- **Spostamento dell'equilibrio**: variazione della composizione di equilibrio in seguito a una perturbazione; si dice verso destra se si formano prodotti, verso sinistra se si formano reagenti.
- **Variazione del numero di moli di gas** ($\Delta n$): differenza fra la somma dei coefficienti dei prodotti gassosi e quella dei reagenti gassosi.
- **Gas inerte**: gas presente nella miscela che non partecipa alla reazione.
- **Equazione di van 't Hoff**: relazione fra le costanti di equilibrio a due temperature e l'entalpia standard di reazione.
- **Grafico di van 't Hoff**: grafico di $\ln K$ in funzione di $1/T$, con pendenza $-\Delta H^\circ/R$.
- **Processo Haber-Bosch**: sintesi industriale dell'ammoniaca dall'azoto e dall'idrogeno su catalizzatore di ferro, ad alta temperatura e alta pressione.
- **Riciclo**: ritorno al reattore dei reagenti che non hanno reagito in un passaggio.
- **Spurgo**: scarico di una piccola parte del gas di ricircolo, per evitare l'accumulo di impurezze inerti.

## Esercizi {#esercizi}

Gli esercizi sono divisi in tre livelli. Dove serve si usino $R=8{,}314\un{J/(mol\,K)}$ e i dati del testo; per la sintesi dell'ammoniaca le pressioni sono in atmosfere.

::: esercizio Previsioni qualitative [base]
Per l'equilibrio $2\,\mathrm{SO_2(g)}+\mathrm{O_2(g)}\rightleftharpoons2\,\mathrm{SO_3(g)}$, con $\Delta H^\circ=-197{,}8\un{kJ}$, prevedere l'effetto sulla quantità di triossido di zolfo all'equilibrio di: (a) aggiunta di ossigeno; (b) rimozione di triossido; (c) compressione della miscela; (d) aumento della temperatura; (e) aggiunta di un catalizzatore; (f) aggiunta di argon a volume costante.
>>> soluzione
(a) aumenta; (b) la reazione forma altro triossido, anche se la quantità presente resta minore di prima della rimozione; (c) aumenta, perché la reazione passa da tre a due moli di gas; (d) diminuisce, perché la reazione è esotermica; (e) nessun effetto sull'equilibrio; (f) nessun effetto, perché le pressioni parziali restano le stesse.
:::

::: esercizio Quali equilibri sentono la pressione [base]
Indicare per ciascun equilibrio l'effetto di una compressione: $\mathrm{N_2}+\mathrm{O_2}\rightleftharpoons2\,\mathrm{NO}$; $\mathrm{CaCO_3(s)}\rightleftharpoons\mathrm{CaO(s)}+\mathrm{CO_2(g)}$; $\mathrm{C(s)}+\mathrm{H_2O(g)}\rightleftharpoons\mathrm{CO(g)}+\mathrm{H_2(g)}$; $\mathrm{N_2}+3\,\mathrm{H_2}\rightleftharpoons2\,\mathrm{NH_3}$.
>>> soluzione
Per il monossido di azoto $\Delta n=0$: nessun effetto. Per la decomposizione del calcare $\Delta n=+1$ (contano soltanto i gas): la compressione favorisce il carbonato. Per la reazione del carbone con il vapore $\Delta n=+1$: favorisce i reagenti. Per l'ammoniaca $\Delta n=-2$: favorisce l'ammoniaca.
:::

::: esercizio Endotermica o esotermica [base]
La costante di una reazione vale $0{,}148$ a $25\,^\circ\mathrm C$ e $0{,}88$ a $50\,^\circ\mathrm C$. La reazione è endotermica o esotermica? Come cambierà la costante a $0\,^\circ\mathrm C$?
>>> soluzione
La costante aumenta con la temperatura: la reazione è endotermica. A $0\,^\circ\mathrm C$ la costante sarà minore di $0{,}148$.
:::

::: esercizio Il solido in più [base]
In un recipiente chiuso il carbonato di calcio è in equilibrio con l'ossido di calcio e l'anidride carbonica. Che cosa succede alla pressione del gas se (a) si aggiunge altro ossido di calcio; (b) si aspira una parte del gas; (c) si dimezza il volume del recipiente a temperatura costante?
>>> soluzione
(a) Nulla: il solido non compare nella costante. (b) Altro carbonato si decompone finché la pressione torna al valore di equilibrio. (c) Subito dopo la compressione la pressione raddoppia; poi una parte del gas si ricombina con l'ossido, finché la pressione torna al valore di equilibrio. In tutti i casi, finché restano entrambi i solidi, la pressione finale è $K_p$.
:::

::: esercizio Il quoziente dopo una compressione [base]
A $25\,^\circ\mathrm C$ e $1\un{bar}$ una miscela all'equilibrio contiene diossido di azoto a $0{,}318\un{bar}$ e tetrossido a $0{,}682\un{bar}$ ($K_p=0{,}148$). Si dimezza il volume. Calcolare il quoziente subito dopo la compressione e dire in quale verso evolve la miscela.
>>> soluzione
Le pressioni parziali raddoppiano, a $0{,}636$ e $1{,}364\un{bar}$, e $Q=0{,}636^2/1{,}364\simeq0{,}297$, il doppio di $K_p$. Poiché $Q>K_p$, una parte del diossido si dimerizza, riducendo il numero di molecole di gas.
:::

::: esercizio Aggiungere tetrossido [medio]
All'equilibrio di $25\,^\circ\mathrm C$ con $[\mathrm{N_2O_4}]=0{,}0330\un{M}$ e $[\mathrm{NO_2}]=0{,}0140\un{M}$ ($K_c=5{,}99\times10^{-3}$) si aggiungono $0{,}0100\un{mol/L}$ di tetrossido. Calcolare la nuova composizione di equilibrio.
>>> soluzione
Subito dopo l'aggiunta $Q=0{,}0140^2/0{,}0430=4{,}6\times10^{-3}$, minore di $K_c$: si dissocia altro tetrossido. Con $y$ moli per litro dissociate,
$$\frac{(0{,}0140+2y)^2}{0{,}0430-y}=5{,}99\times10^{-3},$$
con soluzione $y\simeq9{,}3\times10^{-4}\un{M}$. All'equilibrio $[\mathrm{N_2O_4}]\simeq0{,}0421\un{M}$ e $[\mathrm{NO_2}]\simeq0{,}0159\un{M}$.
:::

::: esercizio Il tetrossido nel ghiaccio [medio]
Con l'equazione di van 't Hoff, $K_p=0{,}148$ a $25\,^\circ\mathrm C$ e $\Delta H^\circ=+57{,}2\un{kJ}$, stimare la costante di dissociazione del tetrossido di diazoto a $0\,^\circ\mathrm C$ e la frazione dissociata a $1\un{bar}$.
>>> soluzione
$$\ln\frac{K_2}{0{,}148}=-\frac{57\,200}{8{,}314}\left(\frac1{273{,}15}-\frac1{298{,}15}\right)=-2{,}11,$$
quindi $K_2\simeq0{,}148\times e^{-2{,}11}\simeq0{,}018$. La frazione dissociata è $\sqrt{0{,}018/4{,}018}\simeq0{,}067$: meno del $7\%$, e il gas appare quasi incolore.
:::

::: esercizio Entalpia da due costanti [medio]
Con le costanti della sintesi dell'ammoniaca a $400$ e $500\,^\circ\mathrm C$, $1{,}64\times10^{-4}$ e $1{,}45\times10^{-5}$, calcolare l'entalpia di reazione in quell'intervallo di temperatura.
>>> soluzione
$$\Delta H^\circ=-\frac{R\ln(K_2/K_1)}{1/T_2-1/T_1}=-\frac{8{,}314\times\ln(1{,}45\times10^{-5}/1{,}64\times10^{-4})}{1/773{,}15-1/673{,}15}.$$
Il numeratore vale $8{,}314\times(-2{,}426)=-20{,}17\un{J/(mol\,K)}$, il denominatore $-1{,}921\times10^{-4}\un{K^{-1}}$, e $\Delta H^\circ\simeq-1{,}05\times10^5\un{J}=-105\un{kJ}$.
:::

::: esercizio Dissociazione a 2 bar [medio]
Calcolare la frazione dissociata del tetrossido di diazoto a $25\,^\circ\mathrm C$ e alla pressione totale di $2{,}0\un{bar}$, con $K_p=0{,}148$ e $\alpha=\sqrt{K_p/(K_p+4P)}$. Confrontarla con il valore a $1\un{bar}$.
>>> soluzione
$\alpha=\sqrt{0{,}148/8{,}148}\simeq0{,}135$, contro $0{,}189$ a $1\un{bar}$. Raddoppiando la pressione la dissociazione diminuisce, perché la compressione favorisce il lato con meno molecole di gas.
:::

::: esercizio Verificare una resa [medio]
A $450\,^\circ\mathrm C$ e $200\un{atm}$ una miscela di azoto e idrogeno in rapporto $1:3$ raggiunge, nel modello del gas ideale, il $24{,}7\%$ di ammoniaca. Verificare che il valore è compatibile con $K_p=4{,}51\times10^{-5}$.
>>> soluzione
Il resto della miscela, $75{,}3\%$, è diviso fra azoto e idrogeno in rapporto $1:3$: le frazioni molari sono $0{,}188$ e $0{,}565$. Le pressioni parziali sono queste frazioni moltiplicate per $200\un{atm}$, e
$$K_p=\frac{0{,}247^2}{0{,}188\times0{,}565^3\times200^2}\simeq4{,}5\times10^{-5}.$$
Il valore coincide con la costante.
:::

::: esercizio Dove la costante vale uno [avanzato]
Con $\Delta H^\circ=-92{,}2\un{kJ}$ e $\Delta S^\circ=-198{,}7\un{J/K}$, supposti costanti, stimare la temperatura alla quale la costante della sintesi dell'ammoniaca vale $1$. Perché gli impianti lavorano a temperature molto più alte?
>>> soluzione
La costante vale $1$ quando $\Delta G^\circ=0$, cioè a $T=\Delta H^\circ/\Delta S^\circ$. Il rapporto vale $92\,200/198{,}7\simeq464\un{K}$, circa $190\,^\circ\mathrm C$. Sotto questa temperatura l'equilibrio favorisce l'ammoniaca, ma la reazione è troppo lenta anche con il catalizzatore; gli impianti scelgono la temperatura più bassa compatibile con una velocità utile, e compensano la costante sfavorevole con la pressione e il riciclo.
:::

::: esercizio Il principio alla prova [avanzato]
Verificare i numeri dell'approfondimento sui limiti del principio: una miscela a $450\,^\circ\mathrm C$ e $200\un{atm}$ contiene $6{,}88\un{mol}$ di azoto, $0{,}646$ di idrogeno e $0{,}236$ di ammoniaca. Calcolare il quoziente prima e dopo l'aggiunta di $0{,}50\un{mol}$ di azoto a pressione costante.
>>> soluzione
Prima: le moli totali sono $7{,}762$, le frazioni molari $0{,}886$, $0{,}0832$ e $0{,}0304$, e
$$Q=\frac{0{,}0304^2}{0{,}886\times0{,}0832^3\times200^2}\simeq4{,}5\times10^{-5},$$
uguale alla costante. Dopo: le moli totali sono $8{,}262$, le frazioni molari $0{,}893$, $0{,}0782$ e $0{,}0286$, e $Q\simeq4{,}8\times10^{-5}$, maggiore della costante: una parte dell'ammoniaca si decompone. L'aggiunta di azoto ha diluito idrogeno e ammoniaca più di quanto abbia aumentato la frazione dell'azoto stesso, che era già vicina a uno.
:::

::: esercizio La dissociazione a metà [avanzato]
A quale temperatura il tetrossido di diazoto è dissociato per metà alla pressione totale di $1\un{bar}$? Usare $K_p=0{,}148$ a $25\,^\circ\mathrm C$ e $\Delta H^\circ=+57{,}2\un{kJ}$.
>>> soluzione
Con $\alpha=0{,}5$, $K_p=4\alpha^2P/(1-\alpha^2)=1/0{,}75\simeq1{,}33$. Dall'equazione di van 't Hoff,
$$\frac1{T_2}=\frac1{298{,}15}-\frac{8{,}314\ln(1{,}33/0{,}148)}{57\,200},$$
da cui $T_2\simeq330\un{K}$, circa $56\,^\circ\mathrm C$.
:::

::: esercizio Il riciclo [avanzato]
In un ciclo di sintesi dell'ammoniaca ogni passaggio nel reattore converte il $15\%$ del gas che vi entra. Il gas non reagito torna al reattore, salvo lo $0{,}5\%$ che viene scaricato a ogni giro. Calcolare, a regime, il rapporto fra il gas che entra nel reattore e la miscela fresca, e la conversione complessiva. Ripetere con uno scarico del $2\%$.
>>> soluzione
Sia $F$ la portata fresca e $E$ quella che entra nel reattore. Il gas riciclato è $0{,}995\times0{,}85\,E=0{,}846\,E$, e $E=F+0{,}846\,E$, quindi $E=F/0{,}154\simeq6{,}5\,F$. La quantità convertita è $0{,}15\,E\simeq0{,}97\,F$: la conversione complessiva è circa il $97\%$. Con uno scarico del $2\%$ il riciclo vale $0{,}833\,E$, $E\simeq6{,}0\,F$ e la conversione scende a circa il $90\%$.
:::

::: esercizio Costanti calcolate e misurate [avanzato]
Stimare la costante della sintesi dell'ammoniaca a $450\,^\circ\mathrm C$ con $\Delta H^\circ=-92{,}2\un{kJ}$ e $\Delta S^\circ=-198{,}7\un{J/K}$, supposti costanti, e confrontarla con il valore misurato, $4{,}51\times10^{-5}$. Da che cosa nasce la differenza?
>>> soluzione
A $723{,}15\un{K}$ l'energia di Gibbs standard vale $-92{,}2+723{,}15\times0{,}1987$, cioè circa $51{,}5\un{kJ}$, e
$$K=\exp\!\left(-\frac{51\,500}{8{,}314\times723{,}15}\right)\simeq1{,}9\times10^{-4},$$
circa quattro volte il valore misurato. La differenza nasce dalla variazione di $\Delta H^\circ$ e $\Delta S^\circ$ con la temperatura: a $450\,^\circ\mathrm C$ la reazione è più esotermica che a $25\,^\circ\mathrm C$, come mostra il grafico di van 't Hoff. La differenza fra la pressione standard di $1\un{bar}$ e l'unità di $1\un{atm}$ conta molto meno, pochi punti percentuali.
:::

## Fonti {#fonti}

Il testo, le figure, gli esempi e gli esercizi di questo capitolo sono originali; l'andamento nel tempo della figura sulla perturbazione è schematico, le composizioni delle miscele negli esercizi sono illustrative, e le rese di ammoniaca della figura sono calcolate con il modello del gas ideale. Per la scelta e l'ordine degli argomenti il riferimento principale è il manuale di R. H. Petrucci, F. G. Herring, J. D. Madura e C. Bissonnette, *General Chemistry: Principles and Modern Applications*, 11ª edizione, Pearson Canada, Toronto, 2017, paragrafi 15-6, 13-6 e 13-7. I dati numerici provengono dalle fonti seguenti.

1. Costante dei gas: valore raccomandato CODATA 2022.
2. Entalpie, energie di Gibbs di formazione ed entropie standard di $\mathrm{NO_2}$, $\mathrm{N_2O_4}$, $\mathrm{NH_3}$, $\mathrm{N_2}$, $\mathrm{H_2}$, $\mathrm{SO_2}$ e $\mathrm{SO_3}$: tabelle dell'appendice D del manuale di Petrucci et al., coerenti con le tabelle NBS (D. D. Wagman et al., J. Phys. Chem. Ref. Data 11, 1982, supplemento 2). Energia del legame dell'azoto: valore usato nel capitolo [Legame covalente ed energia di legame](unit:chemistry-07).
3. Costanti di equilibrio della sintesi dell'ammoniaca fra $300$ e $600\,^\circ\mathrm C$, con le pressioni in atmosfere: valori classici della letteratura tecnica, riportati fra l'altro nella voce «Haber process» dell'enciclopedia Wikipedia in lingua inglese insieme alla conversione per passaggio e a quella complessiva degli impianti. I valori sono coerenti, entro circa il $10\%$, con quelli calcolati dalle tabelle NIST-JANAF (M. W. Chase, J. Phys. Chem. Ref. Data, Monograph 9, 1998), da cui proviene anche l'entalpia di formazione dell'ammoniaca a $700\un{K}$.
4. Produzione mondiale di ammoniaca: U.S. Geological Survey, Mineral Commodity Summaries 2025, Nitrogen (fixed), ammonia. Consumo di energia: International Energy Agency, *Ammonia Technology Roadmap*, Parigi, 2021. Quota della popolazione mondiale nutrita grazie ai fertilizzanti sintetici: J. W. Erisman et al., Nature Geoscience 1 (2008) 636.
5. Pressione atmosferica in quota: atmosfera standard internazionale ISO 2533. Affinità del monossido di carbonio per l'emoglobina: letteratura di fisiologia e tossicologia clinica.
6. Per la storia: H. Le Chatelier, C. R. Acad. Sci. 99 (1884) 786; F. Braun, Z. Phys. Chem. 1 (1887) 259; F. Haber, conferenza Nobel (1920); C. Bosch, conferenza Nobel (1932); V. Smil, *Enriching the Earth*, MIT Press, 2001.
