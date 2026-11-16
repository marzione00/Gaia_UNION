---
unit: chemistry-15
titolo: Resa e bilanci di materia
sottotitolo: Resa teorica ed effettiva, sintesi a più passaggi, bilanci, economia atomica
volume: Volume di chimica
fonte: Testo originale; riferimento principale Petrucci et al., General Chemistry, 11ª ed., §4-5
---

## Prima di cominciare {#apertura}

Nel laboratorio della stazione si sintetizza un farmaco. I calcoli stechiometrici promettono $40\un{g}$ di prodotto; dopo la reazione, la filtrazione, il lavaggio e l'essiccazione la bilancia ne segna $30$. Dove sono finiti gli altri dieci grammi? E come si progetta un processo che ne perda il meno possibile, e che produca meno scarti?

Le domande non riguardano soltanto il laboratorio. Ogni grammo perso è materia prima pagata e non trasformata, ogni sottoprodotto è uno scarto da smaltire, e su un impianto industriale che lavora migliaia di tonnellate all'anno anche un punto percentuale di resa vale moltissimo, in denaro e in impatto ambientale.

Il capitolo precedente ha mostrato come calcolare, dall'equazione bilanciata e dal reagente limitante, la quantità massima di prodotto che una reazione può dare. Nessuna reazione reale raggiunge quel massimo. Questo capitolo misura la distanza fra il calcolo e la realtà con la **resa**, ne esamina le cause, mostra come le rese si combinano nelle sintesi a più passaggi e come si fa il conto di tutta la materia che entra ed esce da un processo. Introduce infine due indicatori della chimica sostenibile, l'**economia atomica** e il **fattore E**, che misurano quanta parte dei reagenti finisce davvero nel prodotto.

::: obiettivi
- calcolare la resa teorica, la resa effettiva e la resa percentuale di una reazione;
- riconoscere le cause delle perdite di prodotto e interpretare rese superiori al cento per cento;
- calcolare la resa complessiva di una sintesi a più passaggi e confrontare sintesi lineari e convergenti;
- scrivere un bilancio di materia per un processo continuo, anche con riciclo;
- calcolare l'economia atomica di una reazione e il fattore E di un processo.
:::

Il capitolo usa i calcoli stechiometrici e il reagente limitante del capitolo [Stechiometria e reagente limitante](unit:chemistry-14). L'energia scambiata nelle reazioni, che entra nei bilanci accanto alla materia, sarà l'argomento del capitolo [Termochimica e calorimetria](unit:chemistry-16).

## Resa teorica, effettiva e percentuale {#resa}

La **resa teorica** è la quantità di prodotto prevista dalla stechiometria, calcolata a partire dal reagente limitante come se la reazione fosse completa e senza perdite. La **resa effettiva** è la quantità di prodotto ottenuta davvero, pesata alla fine del procedimento. La **resa percentuale** è il loro rapporto:

::: definizione Resa percentuale
$$\text{resa}=\frac{m_\text{effettiva}}{m_\text{teorica}}\times100\%.$$
Il rapporto si può calcolare con le masse o con le quantità chimiche, purché siano dello stesso prodotto.
:::

Nel laboratorio della stazione la resa del farmaco è $30/40=75\%$. Per una sintesi organica in laboratorio rese fra il $60$ e il $90\%$ sono considerate buone; nell'industria, dove ogni punto percentuale vale tonnellate di materia prima, si cercano rese più alte possibile.

::: esempio La sintesi dell'aspirina
L'acido acetilsalicilico, l'aspirina, $\mathrm{C_9H_8O_4}$, $M=180{,}16\un{g/mol}$, si prepara facendo reagire l'acido salicilico, $\mathrm{C_7H_6O_3}$, $M=138{,}12\un{g/mol}$, con l'anidride acetica, $\mathrm{C_4H_6O_3}$, $M=102{,}09\un{g/mol}$, densità $1{,}082\un{g/mL}$:
$$\mathrm{C_7H_6O_3}+\mathrm{C_4H_6O_3}\longrightarrow\mathrm{C_9H_8O_4}+\mathrm{CH_3COOH}.$$
Si usano $5{,}00\un{g}$ di acido salicilico e $7{,}0\un{mL}$ di anidride acetica, e si ottengono $5{,}20\un{g}$ di aspirina purificata. Calcolare la resa percentuale.

L'acido salicilico è $5{,}00/138{,}12=0{,}0362\un{mol}$; l'anidride, $7{,}0\times1{,}082=7{,}57\un{g}$, è $0{,}0742\un{mol}$. I coefficienti sono uguali, e il limitante è l'acido salicilico: la resa teorica è $0{,}0362\un{mol}$ di aspirina, cioè $6{,}52\un{g}$. La resa percentuale è $5{,}20/6{,}52\simeq80\%$. L'eccesso di anidride acetica, economica e facile da eliminare alla fine con l'acqua, serve ad assicurare che tutto l'acido salicilico reagisca.
:::

Un calcolo utile in pratica è quello inverso: quanto reagente serve per ottenere una data quantità di prodotto, nota la resa che il procedimento raggiunge di solito. Per avere $100\un{g}$ di aspirina con una resa dell'$80\%$ bisogna puntare a una resa teorica di $100/0{,}80=125\un{g}$, e quindi partire da $125/180{,}16\times138{,}12\simeq95{,}8\un{g}$ di acido salicilico.

## Dove si perde il prodotto {#perdite}

Le cause per cui la resa effettiva è minore di quella teorica si raggruppano in tre famiglie.

- **La reazione non è completa.** Molte reazioni si fermano prima che il reagente limitante sia esaurito, perché raggiungono un equilibrio, come si vedrà nel capitolo [Equilibrio chimico](unit:chemistry-19), oppure sono così lente che non conviene aspettarne la fine.
- **Reazioni secondarie.** Gli stessi reagenti possono dare anche altri prodotti, indesiderati, che consumano una parte del reagente limitante. Nella combustione di un idrocarburo con poco ossigeno, una parte del carbonio diventa monossido di carbonio invece di anidride carbonica.
- **Perdite nella separazione e nella purificazione.** Una parte del prodotto resta sciolta nelle acque di lavaggio o nel solvente da cui è cristallizzato, aderisce alle pareti dei recipienti e ai filtri, si perde nei travasi. La purificazione per ricristallizzazione, indispensabile per avere un prodotto puro, sacrifica sempre una frazione del prodotto, quella che resta sciolta nel solvente freddo.

::: figura perdite
{"w":660,"h":266,"items":[{"t":"text","p":[330,22],"s":"massa di prodotto (g)","c":"ax","size":12},{"t":"text","p":[220,52],"s":"resa teorica","c":"ax","size":12,"a":"end"},{"t":"rect","p":[230,39,360.0,22],"c":"force2","r":1},{"t":"text","p":[596.0,55],"s":"40,0","c":"ax","size":11,"a":"start"},{"t":"text","p":[220,86],"s":"reazione incompleta","c":"ax","size":12,"a":"end"},{"t":"rect","p":[558.5,73,31.5,22],"c":"force4","r":1},{"t":"text","p":[596.0,89],"s":"−3,5","c":"force4","size":11,"a":"start"},{"t":"text","p":[220,120],"s":"reazioni secondarie","c":"ax","size":12,"a":"end"},{"t":"rect","p":[536.0,107,22.5,22],"c":"force4","r":1},{"t":"text","p":[564.5,123],"s":"−2,5","c":"force4","size":11,"a":"start"},{"t":"text","p":[220,154],"s":"perdite nella filtrazione","c":"ax","size":12,"a":"end"},{"t":"rect","p":[522.5,141,13.5,22],"c":"force4","r":1},{"t":"text","p":[542.0,157],"s":"−1,5","c":"force4","size":11,"a":"start"},{"t":"text","p":[220,188],"s":"ricristallizzazione","c":"ax","size":12,"a":"end"},{"t":"rect","p":[500.0,175,22.5,22],"c":"force4","r":1},{"t":"text","p":[528.5,191],"s":"−2,5","c":"force4","size":11,"a":"start"},{"t":"text","p":[220,222],"s":"resa effettiva","c":"ax","size":12,"a":"end"},{"t":"rect","p":[230,209,270.0,22],"c":"force2","r":1},{"t":"text","p":[506.0,225],"s":"30,0","c":"ax","size":11,"a":"start"},{"t":"text","p":[330,252],"s":"esempio illustrativo: resa percentuale 30/40 = 75%","c":"muted","size":11}]}
---
Un esempio di come la resa teorica si riduce alla resa effettiva. I valori delle singole perdite sono illustrativi; in una sintesi reale si stimano analizzando le acque madri, i sottoprodotti e i residui di ogni operazione.
:::

Una parte del prodotto perso nella purificazione si può recuperare. Le **acque madri**, la soluzione che resta dopo aver filtrato i cristalli, contengono ancora prodotto disciolto: concentrandole per evaporazione e raffreddandole di nuovo si ottiene un secondo raccolto di cristalli, di solito meno puro del primo, che si purifica a parte o si unisce al grezzo della sintesi successiva. Nell'industria le acque madri vengono spesso riciclate nel processo, e il prodotto che contengono non va perduto.

Una resa superiore al cento per cento è sempre il segnale di un errore. Di solito il prodotto non è ancora asciutto, e la bilancia pesa anche il solvente, oppure contiene impurezze, come reagenti non trasformati o sottoprodotti. Per questo la resa si calcola sul prodotto purificato ed essiccato fino a massa costante, e se ne controlla la purezza, per esempio misurandone la temperatura di fusione: un solido impuro fonde a una temperatura più bassa e in un intervallo più ampio del composto puro.

## Conversione, selettività e resa {#selettivita}

Nei processi industriali la resa si scompone spesso in due fattori. La **conversione**, introdotta nel capitolo precedente, è la frazione del reagente limitante che ha reagito; la **selettività** è la frazione del reagente convertito che è diventata il prodotto desiderato, invece di sottoprodotti. La resa è il loro prodotto:

$$\text{resa}=\text{conversione}\times\text{selettività}.$$

Una reazione che converte il $90\%$ del reagente con una selettività dell'$85\%$ dà una resa del $76{,}5\%$. Le due grandezze rispondono a problemi diversi. Una conversione bassa si corregge con il riciclo, come si vedrà più avanti; una selettività bassa significa che una parte del reagente è persa per sempre, trasformata in sottoprodotti, e si corregge soltanto cambiando le condizioni o il catalizzatore.

L'ossido di etilene, materia prima di antigelo, detergenti e materie plastiche, si produce facendo reagire etilene e ossigeno su un catalizzatore d'argento. La reazione desiderata compete con la combustione completa dell'etilene ad anidride carbonica e acqua, molto più favorita dal punto di vista energetico. I catalizzatori moderni, con piccole aggiunte di altri elementi, raggiungono selettività fra l'$85$ e il $90\%$; ogni punto percentuale di selettività guadagnato, in impianti che producono milioni di tonnellate all'anno, vale decine di migliaia di tonnellate di etilene risparmiato e di anidride carbonica non emessa.

## La purezza {#purezza}

I calcoli stechiometrici presuppongono sostanze pure. I reagenti del commercio hanno purezze dichiarate: un prodotto «per analisi» supera di solito il $99\%$, un prodotto tecnico può contenere qualche per cento di impurezze. Quando un reagente è impuro, la quantità utile è soltanto quella della sostanza pura, come si è visto nel capitolo precedente per il calcare.

Anche la resa va riferita al prodotto puro. Se l'aspirina dell'esempio, $5{,}20\un{g}$, contenesse il $5\%$ in massa di impurezze, la massa di aspirina vera sarebbe $4{,}94\un{g}$, e la resa scenderebbe dall'$80$ al $76\%$. Per questo la purezza si controlla con metodi indipendenti: la temperatura di fusione, la cromatografia, che separa e rivela le impurezze anche in tracce, la spettroscopia, che riconosce la struttura delle molecole. Nell'industria farmaceutica le impurezze ammesse in un principio attivo sono fissate dalle farmacopee, spesso a livelli di decimi o centesimi di punto percentuale, e la purezza conta quanto la resa.

## Sintesi a più passaggi {#passaggi}

I farmaci, i coloranti, i materiali avanzati si ottengono raramente con una sola reazione. Più spesso si parte da sostanze semplici e si costruisce la molecola desiderata attraverso una sequenza di passaggi, ciascuno con la sua resa. Poiché il prodotto di ogni passaggio è il reagente del successivo, le rese si moltiplicano: la **resa complessiva** è il prodotto delle rese dei singoli passaggi.

$$\text{resa complessiva}=r_1\times r_2\times\cdots\times r_n.$$

Tre passaggi con rese del $90$, dell'$85$ e dell'$80\%$ danno una resa complessiva del $61\%$. Dieci passaggi al $90\%$ ciascuno danno il $35\%$; venti passaggi all'$80\%$ poco più dell'$1\%$. Le sintesi delle molecole naturali più complesse, con decine di passaggi, partono da centinaia di grammi di materiali per ottenere pochi milligrammi di prodotto finale.

::: esempio Quanto materiale di partenza
Una sintesi di dieci passaggi ha rese dell'$85\%$ ciascuno. Supponendo, per semplicità, che ogni intermedio abbia la stessa massa molare del materiale di partenza e del prodotto, quanta materia prima serve per ottenere un grammo di prodotto finale?

La resa complessiva è $0{,}85^{10}\simeq0{,}197$: per un grammo di prodotto servono circa $5{,}1\un{g}$ di materiale di partenza, più tutti i reagenti, i solventi e i materiali di purificazione di dieci passaggi. Nella realtà le masse molari degli intermedi crescono lungo la sintesi, perché la molecola si arricchisce di gruppi, e il rapporto in massa va calcolato passando per le moli.
:::

::: figura passaggi
{"w":660,"h":306,"items":[{"t":"axes","o":[80,250],"x":[520,""],"y":[210,""],"sx":44,"sy":2.0,"xt":[[2,"2"],[4,"4"],[6,"6"],[8,"8"],[10,"10"]],"yt":[[20,"20"],[40,"40"],[60,"60"],[80,"80"],[100,"100"]]},{"t":"text","p":[40,30],"s":"resa complessiva (%)","c":"ax","size":12,"a":"start"},{"t":"text","p":[610,292],"s":"numero di passaggi","c":"ax","size":13,"a":"end"},{"t":"plot","o":[80,250],"sx":44,"sy":2.0,"pts":[[0,100.0],[1,95.0],[2,90.25],[3,85.7375],[4,81.450625],[5,77.3780937],[6,73.5091891],[7,69.8337296],[8,66.3420431],[9,63.024941],[10,59.8736939]],"c":"force3","w":2.4},{"t":"circle","p":[124,60.0,3],"c":"force3"},{"t":"circle","p":[168,69.5,3],"c":"force3"},{"t":"circle","p":[212,78.5,3],"c":"force3"},{"t":"circle","p":[256,87.1,3],"c":"force3"},{"t":"circle","p":[300,95.2,3],"c":"force3"},{"t":"circle","p":[344,103.0,3],"c":"force3"},{"t":"circle","p":[388,110.3,3],"c":"force3"},{"t":"circle","p":[432,117.3,3],"c":"force3"},{"t":"circle","p":[476,124.0,3],"c":"force3"},{"t":"circle","p":[520,130.3,3],"c":"force3"},{"t":"text","p":[528,134.3],"s":"95% per passaggio","c":"force3","size":11,"a":"start"},{"t":"plot","o":[80,250],"sx":44,"sy":2.0,"pts":[[0,100.0],[1,90.0],[2,81.0],[3,72.9],[4,65.61],[5,59.049],[6,53.1441],[7,47.82969],[8,43.046721],[9,38.7420489],[10,34.867844]],"c":"force2","w":2.4},{"t":"circle","p":[124,70.0,3],"c":"force2"},{"t":"circle","p":[168,88.0,3],"c":"force2"},{"t":"circle","p":[212,104.2,3],"c":"force2"},{"t":"circle","p":[256,118.8,3],"c":"force2"},{"t":"circle","p":[300,131.9,3],"c":"force2"},{"t":"circle","p":[344,143.7,3],"c":"force2"},{"t":"circle","p":[388,154.3,3],"c":"force2"},{"t":"circle","p":[432,163.9,3],"c":"force2"},{"t":"circle","p":[476,172.5,3],"c":"force2"},{"t":"circle","p":[520,180.3,3],"c":"force2"},{"t":"text","p":[528,184.3],"s":"90% per passaggio","c":"force2","size":11,"a":"start"},{"t":"plot","o":[80,250],"sx":44,"sy":2.0,"pts":[[0,100.0],[1,80.0],[2,64.0],[3,51.2],[4,40.96],[5,32.768],[6,26.2144],[7,20.97152],[8,16.777216],[9,13.4217728],[10,10.7374182]],"c":"force","w":2.4},{"t":"circle","p":[124,90.0,3],"c":"force"},{"t":"circle","p":[168,122.0,3],"c":"force"},{"t":"circle","p":[212,147.6,3],"c":"force"},{"t":"circle","p":[256,168.1,3],"c":"force"},{"t":"circle","p":[300,184.5,3],"c":"force"},{"t":"circle","p":[344,197.6,3],"c":"force"},{"t":"circle","p":[388,208.1,3],"c":"force"},{"t":"circle","p":[432,216.4,3],"c":"force"},{"t":"circle","p":[476,223.2,3],"c":"force"},{"t":"circle","p":[520,228.5,3],"c":"force"},{"t":"text","p":[528,224.5],"s":"80% per passaggio","c":"force","size":11,"a":"start"},{"t":"plot","o":[80,250],"sx":44,"sy":2.0,"pts":[[0,100.0],[1,70.0],[2,49.0],[3,34.3],[4,24.01],[5,16.807],[6,11.7649],[7,8.23543],[8,5.764801],[9,4.0353607],[10,2.8247525]],"c":"force4","w":2.4},{"t":"circle","p":[124,110.0,3],"c":"force4"},{"t":"circle","p":[168,152.0,3],"c":"force4"},{"t":"circle","p":[212,181.4,3],"c":"force4"},{"t":"circle","p":[256,202.0,3],"c":"force4"},{"t":"circle","p":[300,216.4,3],"c":"force4"},{"t":"circle","p":[344,226.5,3],"c":"force4"},{"t":"circle","p":[388,233.5,3],"c":"force4"},{"t":"circle","p":[432,238.5,3],"c":"force4"},{"t":"circle","p":[476,241.9,3],"c":"force4"},{"t":"circle","p":[520,244.4,3],"c":"force4"},{"t":"text","p":[252,222.0],"s":"70% per passaggio","c":"force4","size":11,"a":"end"}]}
---
Resa complessiva in funzione del numero di passaggi, per rese costanti dei singoli passaggi. Anche rese elevate, quando si moltiplicano molte volte, portano a una resa complessiva bassa.
:::

Per limitare il danno si progettano **sintesi convergenti**. Invece di costruire la molecola un pezzo alla volta in una lunga catena, si preparano separatamente due o più frammenti, ciascuno in pochi passaggi, e li si unisce alla fine. La resa complessiva è determinata dal ramo più lungo, indipendentemente dal numero totale di passaggi.

::: figura convergente
{"w":660,"h":258,"items":[{"t":"circle","p":[60,60,14],"c":"body"},{"t":"text","p":[60,64.5],"s":"A","c":"ax","size":11},{"t":"circle","p":[126,60,14],"c":"body"},{"t":"text","p":[126,64.5],"s":"B","c":"ax","size":11},{"t":"arrow","p":[74,60,110,60],"c":"force2","w":2,"head":7},{"t":"circle","p":[192,60,14],"c":"body"},{"t":"text","p":[192,64.5],"s":"C","c":"ax","size":11},{"t":"arrow","p":[140,60,176,60],"c":"force2","w":2,"head":7},{"t":"circle","p":[258,60,14],"c":"body"},{"t":"text","p":[258,64.5],"s":"D","c":"ax","size":11},{"t":"arrow","p":[206,60,242,60],"c":"force2","w":2,"head":7},{"t":"circle","p":[324,60,14],"c":"body"},{"t":"text","p":[324,64.5],"s":"E","c":"ax","size":11},{"t":"arrow","p":[272,60,308,60],"c":"force2","w":2,"head":7},{"t":"circle","p":[390,60,14],"c":"body"},{"t":"text","p":[390,64.5],"s":"F","c":"ax","size":11},{"t":"arrow","p":[338,60,374,60],"c":"force2","w":2,"head":7},{"t":"circle","p":[456,60,14],"c":"body"},{"t":"text","p":[456,64.5],"s":"G","c":"ax","size":11},{"t":"arrow","p":[404,60,440,60],"c":"force2","w":2,"head":7},{"t":"circle","p":[522,60,14],"c":"body"},{"t":"text","p":[522,64.5],"s":"H","c":"ax","size":11},{"t":"arrow","p":[470,60,506,60],"c":"force2","w":2,"head":7},{"t":"circle","p":[588,60,14],"c":"body"},{"t":"text","p":[588,64.5],"s":"P","c":"force3","size":12},{"t":"arrow","p":[536,60,572,60],"c":"force2","w":2,"head":7},{"t":"text","p":[330,100],"s":"sintesi lineare: 8 passaggi, resa 0,8⁸ ≈ 17%","c":"muted","size":11},{"t":"circle","p":[60,150,14],"c":"body"},{"t":"text","p":[60,154.5],"s":"A","c":"ax","size":11},{"t":"circle","p":[126,150,14],"c":"body"},{"t":"text","p":[126,154.5],"s":"B","c":"ax","size":11},{"t":"arrow","p":[74,150,110,150],"c":"force2","w":2,"head":7},{"t":"circle","p":[192,150,14],"c":"body"},{"t":"text","p":[192,154.5],"s":"C","c":"ax","size":11},{"t":"arrow","p":[140,150,176,150],"c":"force2","w":2,"head":7},{"t":"circle","p":[258,150,14],"c":"body"},{"t":"text","p":[258,154.5],"s":"D","c":"ax","size":11},{"t":"arrow","p":[206,150,242,150],"c":"force2","w":2,"head":7},{"t":"circle","p":[60,230,14],"c":"body"},{"t":"text","p":[60,234.5],"s":"E","c":"ax","size":11},{"t":"circle","p":[126,230,14],"c":"body"},{"t":"text","p":[126,234.5],"s":"F","c":"ax","size":11},{"t":"arrow","p":[74,230,110,230],"c":"force2","w":2,"head":7},{"t":"circle","p":[192,230,14],"c":"body"},{"t":"text","p":[192,234.5],"s":"G","c":"ax","size":11},{"t":"arrow","p":[140,230,176,230],"c":"force2","w":2,"head":7},{"t":"circle","p":[258,230,14],"c":"body"},{"t":"text","p":[258,234.5],"s":"H","c":"ax","size":11},{"t":"arrow","p":[206,230,242,230],"c":"force2","w":2,"head":7},{"t":"arrow","p":[274,154,342,184],"c":"force2","w":2,"head":7},{"t":"arrow","p":[274,226,342,196],"c":"force2","w":2,"head":7},{"t":"circle","p":[358,190,14],"c":"body"},{"t":"text","p":[358,194.5],"s":"I","c":"ax","size":11},{"t":"arrow","p":[374,190,410,190],"c":"force2","w":2,"head":7},{"t":"circle","p":[426,190,14],"c":"body"},{"t":"text","p":[426,194.5],"s":"P","c":"force3","size":12},{"t":"text","p":[560,186],"s":"sintesi convergente:","c":"muted","size":11},{"t":"text","p":[560,202],"s":"ramo più lungo di 5 passaggi","c":"muted","size":11},{"t":"text","p":[560,218],"s":"resa 0,8⁵ ≈ 33%","c":"muted","size":11}]}
---
Una sintesi lineare in otto passaggi e una sintesi convergente con lo stesso numero di trasformazioni, organizzate in due rami di tre passaggi, un passaggio di unione e un passaggio finale. Con rese dell'$80\%$ per passaggio, la seconda dà circa il doppio di prodotto, perché il prodotto attraversa al più cinque passaggi.
:::

::: approfondimento Perché la convergenza conviene
Si supponga che ogni passaggio abbia resa $r$. In una sintesi lineare di $n$ passaggi la resa complessiva è $r^n$. In una sintesi convergente ogni molecola di prodotto finale contiene un frammento di ciascun ramo, e la quantità finale è limitata dal ramo con meno prodotto, cioè dal più lungo; se i rami sono bilanciati e il percorso più lungo, dal materiale di partenza al prodotto, conta $m$ passaggi, la resa riferita a quel ramo è $r^m$, con $m$ minore di $n$. Con otto trasformazioni all'$80\%$, la sintesi lineare dà $0{,}8^8\simeq17\%$; la convergente della figura, con un percorso massimo di cinque passaggi, $0{,}8^5\simeq33\%$. Il vantaggio cresce con la lunghezza della sintesi: con trenta passaggi organizzati in modo che il percorso più lungo ne conti dieci, si passa da $0{,}8^{30}$, circa un millesimo, a $0{,}8^{10}$, circa un decimo.
:::

## I bilanci di materia {#bilanci}

Nell'industria chimica le reazioni avvengono spesso in impianti continui, nei quali i reagenti entrano e i prodotti escono senza interruzione. Per progettarli e controllarli si scrivono i **bilanci di materia**, che applicano la conservazione della massa a una parte dell'impianto, delimitata da un confine immaginario. Per ogni sostanza, in un intervallo di tempo,

$$\text{entrata}+\text{produzione}=\text{uscita}+\text{consumo}+\text{accumulo}.$$

In un impianto che funziona in **regime stazionario**, con portate e composizioni costanti nel tempo, l'accumulo è nullo. Per gli elementi chimici, che le reazioni non creano né distruggono, produzione e consumo sono nulli, e il bilancio si riduce a entrata uguale a uscita: è il modo più semplice e più sicuro di impostare i conti.

::: metodo Impostare un bilancio di materia
1. Disegnare uno schema del processo, con un riquadro per ogni apparecchiatura e una freccia per ogni corrente in ingresso e in uscita.
2. Scegliere una base di calcolo comoda: una mole di combustibile, cento chilogrammi di alimentazione, un'ora di funzionamento.
3. Scrivere sulle frecce tutte le quantità note e indicare con un simbolo quelle incognite.
4. Scrivere un bilancio per ogni elemento, o per ogni componente che non partecipa alle reazioni, e uno per la massa totale; contare che le equazioni indipendenti siano tante quante le incognite.
5. Risolvere e controllare che la massa totale in uscita sia uguale a quella in ingresso.
:::

::: esempio La caldaia a metano
Una caldaia brucia metano con il $20\%$ di aria in eccesso rispetto alla quantità stechiometrica. Considerando l'aria come una miscela di $20{,}95\%$ di ossigeno e $79{,}05\%$ di azoto in moli, e una combustione completa, calcolare la composizione dei fumi per ogni mole di metano.

La reazione è $\mathrm{CH_4}+2\,\mathrm O_2\to\mathrm{CO_2}+2\,\mathrm{H_2O}$. L'ossigeno stechiometrico è $2{,}00\un{mol}$; con il $20\%$ di eccesso se ne alimentano $2{,}40\un{mol}$, accompagnate da $2{,}40\times79{,}05/20{,}95\simeq9{,}06\un{mol}$ di azoto. Il bilancio del carbonio dà $1{,}00\un{mol}$ di anidride carbonica, quello dell'idrogeno $2{,}00\un{mol}$ di acqua; l'ossigeno non consumato è $0{,}40\un{mol}$, l'azoto passa invariato. I fumi contengono $12{,}46\un{mol}$ di gas; esclusa l'acqua, che si condensa prima dell'analisi, l'anidride carbonica è il $9{,}6\%$ e l'ossigeno il $3{,}8\%$.
:::

::: esempio L'essiccatore
Un prodotto umido contiene il $25\%$ in massa di acqua e viene essiccato fino al $2\%$. Calcolare la massa di acqua da evaporare per ogni chilogrammo di prodotto umido.

Il solido secco passa invariato attraverso l'essiccatore: $0{,}75\un{kg}$ per ogni chilogrammo in ingresso. All'uscita costituisce il $98\%$ del prodotto, che pesa quindi $0{,}75/0{,}98\simeq0{,}765\un{kg}$. L'acqua evaporata è la differenza, $1-0{,}765\simeq0{,}235\un{kg}$. Il bilancio su un componente che non cambia, qui il solido secco, è la chiave di molti calcoli di questo tipo.
:::

::: esempio Il bilancio del carbonio di un'automobile
Un'automobile a benzina consuma $5{,}0$ litri ogni cento chilometri. Considerando la benzina come ottano, che produce $2{,}17\un{kg}$ di anidride carbonica per litro, come calcolato nel capitolo precedente, stimare l'anidride carbonica emessa per chilometro.

Tutto il carbonio che entra nel motore con il carburante esce con i gas di scarico, quasi tutto come anidride carbonica. In cento chilometri il motore emette $5{,}0\times2{,}17\simeq10{,}8\un{kg}$ di anidride carbonica, cioè circa $108\un{g}$ per chilometro. È lo stesso ordine di grandezza dei valori dichiarati per le automobili di piccola cilindrata: un bilancio del carbonio permette di passare dal consumo alle emissioni senza misurarle.
:::

::: figura bilancio
{"w":680,"h":198,"items":[{"t":"rect","p":[250,30,160,110],"c":"body","r":8},{"t":"poly","pts":[[250,30],[410,30],[410,140],[250,140]],"close":true,"c":"force2","w":2},{"t":"text","p":[330,82],"s":"caldaia","c":"ax","size":14},{"t":"text","p":[330,102],"s":"CH₄ + 2 O₂ → CO₂ + 2 H₂O","c":"muted","size":10},{"t":"arrow","p":[110,55,246,55],"c":"force","w":2.4,"head":9},{"t":"text","p":[100,59],"s":"CH₄  1,00 mol","c":"ax","size":12,"a":"end"},{"t":"arrow","p":[110,115,246,115],"c":"force","w":2.4,"head":9},{"t":"text","p":[100,105],"s":"aria:","c":"ax","size":12,"a":"end"},{"t":"text","p":[100,121],"s":"O₂  2,40 mol","c":"ax","size":12,"a":"end"},{"t":"text","p":[100,137],"s":"N₂  9,06 mol","c":"ax","size":12,"a":"end"},{"t":"arrow","p":[414,85,540,85],"c":"force4","w":2.4,"head":9},{"t":"text","p":[552,55],"s":"fumi:","c":"ax","size":12,"a":"start"},{"t":"text","p":[552,71],"s":"CO₂  1,00 mol","c":"ax","size":12,"a":"start"},{"t":"text","p":[552,87],"s":"H₂O  2,00 mol","c":"ax","size":12,"a":"start"},{"t":"text","p":[552,103],"s":"O₂  0,40 mol","c":"ax","size":12,"a":"start"},{"t":"text","p":[552,119],"s":"N₂  9,06 mol","c":"ax","size":12,"a":"start"},{"t":"text","p":[330,182],"s":"carbonio, idrogeno, ossigeno e azoto entrano ed escono in quantità uguali","c":"muted","size":11}]}
---
Il bilancio di materia di una caldaia a metano, per ogni mole di combustibile, con il $20\%$ di aria in eccesso. L'analisi dell'ossigeno nei fumi permette ai tecnici di regolare l'eccesso d'aria.
:::

Il bilancio funziona anche al contrario. Misurando la percentuale di ossigeno nei fumi, i tecnici ricavano l'eccesso d'aria con cui lavora la caldaia: troppo poca aria lascia combustibile incombusto e monossido di carbonio, troppa aria raffredda la fiamma e porta via calore con i fumi.

## Il riciclo {#riciclo}

Quando una reazione converte a ogni passaggio soltanto una parte dei reagenti, come la sintesi dell'ammoniaca ricordata nel capitolo precedente, conviene separare il prodotto e rimandare i reagenti non trasformati all'ingresso del reattore. Il bilancio del sistema complessivo, che comprende reattore, separatore e riciclo, è semplice: in regime stazionario, con una separazione perfetta, tutto ciò che entra come alimentazione fresca esce come prodotto. Il bilancio del solo reattore mostra invece quanto materiale lo attraversa.

::: figura riciclo
{"w":640,"h":186,"items":[{"t":"rect","p":[170,30,110,56],"c":"body","r":6},{"t":"poly","pts":[[170,30],[280,30],[280,86],[170,86]],"close":true,"c":"force2","w":1.8},{"t":"text","p":[225.0,56.0],"s":"reattore","c":"ax","size":12},{"t":"text","p":[225.0,72.0],"s":"15% per passaggio","c":"muted","size":10},{"t":"rect","p":[360,30,110,56],"c":"body","r":6},{"t":"poly","pts":[[360,30],[470,30],[470,86],[360,86]],"close":true,"c":"force2","w":1.8},{"t":"text","p":[415.0,63.0],"s":"separatore","c":"ax","size":12},{"t":"arrow","p":[40,58,166,58],"c":"force","w":2.4,"head":9},{"t":"text","p":[48,48],"s":"alimentazione fresca","c":"ax","size":11,"a":"start"},{"t":"text","p":[48,76],"s":"100 mol","c":"muted","size":11,"a":"start"},{"t":"arrow","p":[284,58,356,58],"c":"force2","w":2.4,"head":9},{"t":"text","p":[320,48],"s":"667 mol","c":"muted","size":10},{"t":"arrow","p":[474,58,600,58],"c":"force3","w":2.4,"head":9},{"t":"text","p":[536,48],"s":"prodotto","c":"force3","size":11},{"t":"text","p":[536,76],"s":"100 mol","c":"muted","size":11},{"t":"poly","pts":[[415,90],[415,150],[225,150],[225,94]],"c":"force4","w":2.2},{"t":"arrow","p":[225,120,225,90],"c":"force4","w":2.2,"head":8},{"t":"text","p":[320,170],"s":"riciclo dei reagenti non trasformati: 567 mol","c":"force4","size":11}]}
---
Un reattore con riciclo. Con una conversione del $15\%$ per passaggio, per trasformare $100$ moli di alimentazione fresca il reattore deve essere attraversato da circa $667$ moli, delle quali $567$ tornano indietro con il riciclo.
:::

Se a ogni passaggio reagisce una frazione $X$ della corrente che entra nel reattore, e il prodotto formato deve uguagliare l'alimentazione fresca $F$, la portata nel reattore vale $F/X$ e quella del riciclo $F(1-X)/X$. Con $X=0{,}15$ il riciclo è più di cinque volte l'alimentazione fresca: compressori, pompe e scambiatori di calore vanno dimensionati per questa portata, e il costo dell'energia necessaria per farla circolare entra nel conto economico del processo. Nella pratica una piccola parte del riciclo va anche spurgata, per evitare che si accumulino le impurezze e i gas inerti entrati con l'alimentazione.

## Dal laboratorio all'impianto {#scala}

Una sintesi che funziona bene in un pallone da cento millilitri non funziona necessariamente allo stesso modo in un reattore da diecimila litri. Il volume cresce con il cubo delle dimensioni, la superficie delle pareti soltanto con il quadrato: una reazione che libera calore, facile da raffreddare in laboratorio, può surriscaldarsi in un grande reattore, favorendo le reazioni secondarie e abbassando la selettività, o diventare pericolosa. Il mescolamento, istantaneo in un piccolo pallone, richiede in un grande reattore agitatori potenti e tempi non trascurabili, durante i quali le concentrazioni non sono uniformi.

Il passaggio di scala si fa per gradi, con impianti pilota di dimensioni intermedie, nei quali si misurano rese, selettività e bilanci di materia e di energia nelle condizioni reali. Molti processi, nati come procedimenti a lotti, nei quali il reattore viene caricato, fatto reagire e svuotato, diventano alla fine processi continui, più facili da controllare e più efficienti, nei quali i bilanci in regime stazionario descritti in questo capitolo diventano lo strumento quotidiano dei tecnici.

## L'economia atomica {#economia}

La resa percentuale misura quanto prodotto si ottiene rispetto al massimo previsto dalla reazione scelta. Non dice nulla, però, su quanta parte degli atomi dei reagenti finisce nel prodotto desiderato e quanta nei sottoprodotti, che diventano scarti. Una reazione con resa del cento per cento può produrre più scarti che prodotto.

Nel 1991 il chimico statunitense Barry Trost propose di misurare questo aspetto con l'**economia atomica**:

::: definizione Economia atomica
$$\text{economia atomica}=\frac{M(\text{prodotto desiderato})}{\sum M(\text{reagenti})}\times100\%,$$
dove le masse molari sono moltiplicate per i coefficienti dell'equazione bilanciata.
:::

Le reazioni di addizione, in cui tutti gli atomi dei reagenti si ritrovano nel prodotto, hanno un'economia atomica del cento per cento: l'idrogenazione dell'etilene, $\mathrm{C_2H_4}+\mathrm H_2\to\mathrm{C_2H_6}$, e la sintesi dell'ammoniaca ne sono esempi. Nella sintesi dell'aspirina si forma anche acido acetico, e l'economia atomica scende a $180{,}16/(138{,}12+102{,}09)\simeq75\%$: un quarto della massa dei reagenti diventa sottoprodotto, anche con resa perfetta.

Un esempio storico mostra quanto conti l'economia atomica anche nei processi più riusciti. Il carbonato di sodio, la soda per il vetro e i detersivi, si produce da più di un secolo e mezzo con il processo messo a punto da Ernest Solvay, che parte da sale e calcare. Il processo è un capolavoro di riciclo interno, nel quale l'ammoniaca usata come intermediario viene recuperata quasi completamente; il suo bilancio complessivo, però, è $\mathrm{CaCO_3}+2\,\mathrm{NaCl}\to\mathrm{Na_2CO_3}+\mathrm{CaCl_2}$, con un'economia atomica di $105{,}99/(100{,}09+2\times58{,}44)\simeq49\%$. Per ogni tonnellata di soda si forma circa una tonnellata di cloruro di calcio, che soltanto in parte trova impieghi, per esempio come sale antigelo per le strade.

::: figura economia
{"w":660,"h":224,"items":[{"t":"text","p":[380,22],"s":"economia atomica (%)","c":"ax","size":12},{"t":"text","p":[240,54],"s":"idrogenazione dell'etilene","c":"ax","size":12,"a":"end"},{"t":"rect","p":[250,41,340.0,22],"c":"force3","r":1},{"t":"text","p":[596.0,57],"s":"100","c":"ax","size":11,"a":"start"},{"t":"text","p":[240,90],"s":"sintesi dell'ammoniaca","c":"ax","size":12,"a":"end"},{"t":"rect","p":[250,77,340.0,22],"c":"force3","r":1},{"t":"text","p":[596.0,93],"s":"100","c":"ax","size":11,"a":"start"},{"t":"text","p":[240,126],"s":"ibuprofene, processo BHC","c":"ax","size":12,"a":"end"},{"t":"rect","p":[250,113,261.8,22],"c":"force3","r":1},{"t":"text","p":[517.8,129],"s":"77","c":"ax","size":11,"a":"start"},{"t":"text","p":[240,162],"s":"aspirina","c":"ax","size":12,"a":"end"},{"t":"rect","p":[250,149,255.0,22],"c":"force3","r":1},{"t":"text","p":[511.0,165],"s":"75","c":"ax","size":11,"a":"start"},{"t":"text","p":[240,198],"s":"ibuprofene, processo Boots","c":"ax","size":12,"a":"end"},{"t":"rect","p":[250,185,136.0,22],"c":"force4","r":1},{"t":"text","p":[392.0,201],"s":"40","c":"ax","size":11,"a":"start"}]}
---
Economia atomica di alcune reazioni e processi. Le reazioni di addizione utilizzano tutti gli atomi dei reagenti; i processi che producono sottoprodotti ne sprecano una parte, che va recuperata o smaltita.
:::

Un indicatore complementare, proposto nel 1992 dal chimico olandese Roger Sheldon, è il **fattore E**, il rapporto fra la massa degli scarti e la massa del prodotto. Tiene conto di tutto ciò che il processo consuma: reagenti in eccesso, sottoprodotti, solventi, sali formati nelle neutralizzazioni, perdite nella purificazione. Secondo le stime di Sheldon il fattore E è inferiore a $0{,}1$ nella raffinazione del petrolio, fra $1$ e $5$ nella grande industria chimica, fra $5$ e $50$ nella chimica fine, e fra $25$ e oltre $100$ nell'industria farmaceutica, dove le molecole sono complesse, i passaggi molti e i solventi abbondanti.

::: quotidiano La pastiglia di ibuprofene
L'ibuprofene, un antinfiammatorio fra i più usati al mondo, fu prodotto per anni con un processo in sei passaggi, messo a punto negli anni Sessanta dalla ditta britannica Boots, con un'economia atomica di circa il $40\%$: per ogni chilogrammo di farmaco si formava più di un chilogrammo di sottoprodotti. Nei primi anni Novanta entrò in produzione un processo in tre soli passaggi, che usa catalizzatori riutilizzabili e ha un'economia atomica di circa il $77\%$, quasi il $100\%$ se si recupera l'acido acetico che si forma come unico sottoprodotto. Il nuovo processo, che produce una parte rilevante dell'ibuprofene mondiale, ricevette nel 1997 uno dei premi statunitensi per la chimica sostenibile. La stessa molecola, la stessa pastiglia; scarti molto diversi.
:::

::: storia I dodici principi della chimica sostenibile
Negli anni Novanta, mentre crescevano i costi e i rischi dello smaltimento dei rifiuti chimici, Paul Anastas, chimico dell'agenzia statunitense per la protezione dell'ambiente, e John Warner, chimico industriale, raccolsero in dodici principi le idee della cosiddetta chimica verde. Il libro in cui li pubblicarono, nel 1998, si apre con un principio semplice: è meglio non produrre uno scarto che doverlo trattare dopo averlo prodotto. Gli altri principi chiedono, fra l'altro, di massimizzare l'economia atomica, di preferire reazioni catalitiche a quelle che consumano reagenti in quantità stechiometrica, di ridurre i solventi, di lavorare a temperature e pressioni vicine a quelle ambientali e di progettare prodotti che si degradino senza lasciare residui pericolosi. I calcoli di questo capitolo, resa, economia atomica e fattore E, sono gli strumenti con cui si verifica se un processo rispetta quei principi.
:::

## Errori frequenti {#errori}

::: errore La resa dal reagente in eccesso
La resa teorica si calcola dal reagente limitante. Calcolandola dal reagente in eccesso si ottiene una resa teorica troppo alta, e una resa percentuale troppo bassa.
:::

::: errore Rese oltre il cento per cento
Una resa superiore al cento per cento indica un errore: il prodotto è umido o impuro, oppure il limitante è stato scelto male. Non è mai un risultato da riportare così com'è.
:::

::: errore Sommare le rese dei passaggi
Le rese di una sintesi a più passaggi si moltiplicano. Tre passaggi al $90\%$ danno il $73\%$ complessivo, non una media del $90\%$ né una somma.
:::

::: errore Resa alta, processo pulito
Resa ed economia atomica misurano cose diverse. Una reazione con resa del cento per cento può trasformare metà della massa dei reagenti in sottoprodotti; per giudicare un processo servono entrambe, insieme al fattore E.
:::

::: errore Bilanci sulle sostanze che reagiscono
Nei sistemi in cui avvengono reazioni, il bilancio entrata uguale uscita vale per gli elementi e per la massa totale; le singole sostanze possono invece essere prodotte o consumate. Per le sostanze bisogna aggiungere i termini di produzione e consumo.
:::

::: errore Conversione e resa
Una conversione del $100\%$ significa che tutto il reagente limitante ha reagito, e la resa può comunque essere bassa, se la selettività è bassa. La resa misura il prodotto desiderato; la conversione misura il reagente scomparso, qualunque cosa sia diventato.
:::

## Sintesi {#sintesi}

::: sintesi Che cosa portare con sé
- La resa teorica si calcola dal reagente limitante; la resa percentuale è il rapporto fra resa effettiva e resa teorica.
- Nei processi industriali la resa è il prodotto della conversione per la selettività; la resa va sempre riferita al prodotto puro.
- Le perdite nascono da reazioni incomplete, reazioni secondarie e operazioni di separazione e purificazione; rese oltre il cento per cento indicano un prodotto umido o impuro.
- Le perdite nella purificazione si riducono usando il minimo di solvente e recuperando le acque madri, da cui si ottiene un secondo raccolto di cristalli.
- Nelle sintesi a più passaggi le rese si moltiplicano; le sintesi convergenti riducono il numero di passaggi che il prodotto deve attraversare.
- Un bilancio di materia uguaglia entrate più produzione a uscite più consumo più accumulo; per gli elementi, in regime stazionario, entrata e uscita sono uguali.
- Con il riciclo si ottiene una conversione complessiva alta anche quando a ogni passaggio reagisce una piccola frazione; la portata nel reattore vale $F/X$.
- L'economia atomica è il rapporto fra la massa molare del prodotto e la somma di quelle dei reagenti; il fattore E è il rapporto fra la massa degli scarti e quella del prodotto.
:::

## Glossario {#glossario}

- **Resa teorica**: quantità massima di prodotto prevista dalla stechiometria a partire dal reagente limitante.
- **Resa effettiva**: quantità di prodotto ottenuta davvero.
- **Resa percentuale**: rapporto percentuale fra resa effettiva e resa teorica.
- **Reazione secondaria**: reazione che consuma una parte dei reagenti formando prodotti indesiderati.
- **Ricristallizzazione**: purificazione di un solido sciogliendolo a caldo in un solvente e lasciandolo cristallizzare a freddo.
- **Resa complessiva**: prodotto delle rese dei passaggi di una sintesi.
- **Conversione**: frazione del reagente limitante che ha reagito.
- **Selettività**: frazione del reagente convertito che è diventata il prodotto desiderato.
- **Acque madri**: soluzione che resta dopo la separazione dei cristalli, e che contiene ancora prodotto disciolto.
- **Sintesi convergente**: sintesi in cui frammenti preparati separatamente vengono uniti verso la fine.
- **Bilancio di materia**: applicazione della conservazione della massa a un sistema o a una parte di un impianto.
- **Regime stazionario**: funzionamento di un impianto con portate e composizioni costanti nel tempo.
- **Riciclo**: ritorno all'ingresso del reattore dei reagenti non trasformati.
- **Economia atomica**: frazione della massa dei reagenti che si ritrova nel prodotto desiderato.
- **Fattore E**: rapporto fra la massa degli scarti e la massa del prodotto di un processo.

## Esercizi {#esercizi}

Masse molari in $\mathrm{g/mol}$: acido salicilico $138{,}12$; anidride acetica $102{,}09$; aspirina $180{,}16$; $\mathrm{CaCO_3}$ $100{,}09$; $\mathrm{CaO}$ $56{,}08$; $\mathrm{C_2H_4}$ $28{,}05$; $\mathrm H_2$ $2{,}016$; isobutilbenzene $\mathrm{C_{10}H_{14}}$ $134{,}22$; $\mathrm{CO}$ $28{,}01$; ibuprofene $\mathrm{C_{13}H_{18}O_2}$ $206{,}28$. Densità dell'anidride acetica $1{,}082\un{g/mL}$.

::: esercizio La resa del farmaco [base]
La resa teorica di una sintesi è $40{,}0\un{g}$ e se ne ottengono $30{,}0\un{g}$. Calcolare la resa percentuale. Quale massa si otterrebbe con una resa del $90\%$?
>>> soluzione
La resa è $30{,}0/40{,}0=75\%$. Con una resa del $90\%$ si otterrebbero $36{,}0\un{g}$.
:::

::: esercizio La calce [base]
Scaldando $10{,}0\un{g}$ di carbonato di calcio puro si ottengono $5{,}12\un{g}$ di ossido di calcio. Calcolare la resa teorica e la resa percentuale della reazione $\mathrm{CaCO_3}\to\mathrm{CaO}+\mathrm{CO_2}$.
>>> soluzione
Il carbonato è $0{,}0999\un{mol}$, e la resa teorica è altrettante moli di ossido, $5{,}60\un{g}$. La resa percentuale è $5{,}12/5{,}60\simeq91{,}4\%$.
:::

::: esercizio Un'addizione [base]
Calcolare l'economia atomica dell'idrogenazione dell'etilene, $\mathrm{C_2H_4}+\mathrm H_2\to\mathrm{C_2H_6}$.
>>> soluzione
Tutti gli atomi dei reagenti finiscono nel prodotto: $M(\mathrm{C_2H_6})=28{,}05+2{,}016=30{,}07\un{g/mol}$, uguale alla somma delle masse molari dei reagenti. L'economia atomica è del $100\%$.
:::

::: esercizio Tre passaggi [base]
Una sintesi comprende tre passaggi con rese del $90$, dell'$85$ e dell'$80\%$. Calcolare la resa complessiva.
>>> soluzione
$0{,}90\times0{,}85\times0{,}80=0{,}612$, cioè il $61\%$.
:::

::: esercizio Una resa del 105 per cento [base]
Uno studente calcola per la sua aspirina una resa del $105\%$. Indicare due possibili cause e come verificarle.
>>> soluzione
Il prodotto può essere ancora umido: lo si essicca e lo si ripesa fino a massa costante. Può contenere impurezze, come acido salicilico rimasto o acido acetico; lo si controlla misurando la temperatura di fusione, che per un prodotto impuro è più bassa e meno netta, o con un test specifico per l'acido salicilico.
:::

::: esercizio Aspirina con altri quantitativi [medio]
Si fanno reagire $2{,}00\un{g}$ di acido salicilico con $5{,}0\un{mL}$ di anidride acetica e si ottengono $2{,}10\un{g}$ di aspirina. Individuare il reagente limitante e calcolare la resa percentuale.
>>> soluzione
L'acido salicilico è $0{,}0145\un{mol}$; l'anidride, $5{,}41\un{g}$, è $0{,}0530\un{mol}$. Il limitante è l'acido salicilico, la resa teorica è $0{,}0145\un{mol}$ di aspirina, cioè $2{,}61\un{g}$, e la resa percentuale è $2{,}10/2{,}61\simeq80\%$.
:::

::: esercizio Quanto reagente serve [medio]
Un procedimento per l'aspirina ha una resa tipica del $75\%$. Quanta acido salicilico serve per ottenere $50{,}0\un{g}$ di aspirina?
>>> soluzione
Bisogna puntare a una resa teorica di $50{,}0/0{,}75\simeq66{,}7\un{g}$, cioè $0{,}370\un{mol}$ di aspirina, e servono altrettante moli di acido salicilico: circa $51{,}1\un{g}$.
:::

::: esercizio L'economia atomica dell'aspirina [medio]
Calcolare l'economia atomica della sintesi dell'aspirina e la massa di acido acetico, $M=60{,}05\un{g/mol}$, che si forma per ogni chilogrammo di aspirina prodotta con resa completa.
>>> soluzione
L'economia atomica è $180{,}16/(138{,}12+102{,}09)\simeq75\%$. Per ogni mole di aspirina si forma una mole di acido acetico: un chilogrammo di aspirina, $5{,}55\un{mol}$, si accompagna a $5{,}55\times60{,}05\simeq333\un{g}$ di acido acetico.
:::

::: esercizio I fumi con il 10 per cento di eccesso [medio]
Ripetere il calcolo della caldaia a metano con il $10\%$ di aria in eccesso: calcolare le moli di ossigeno e azoto alimentate per mole di metano e la composizione dei fumi secchi.
>>> soluzione
L'ossigeno alimentato è $2{,}20\un{mol}$, con $2{,}20\times79{,}05/20{,}95\simeq8{,}30\un{mol}$ di azoto. I fumi secchi contengono $1{,}00\un{mol}$ di anidride carbonica, $0{,}20\un{mol}$ di ossigeno e $8{,}30\un{mol}$ di azoto, in tutto $9{,}50\un{mol}$: il $10{,}5\%$ di anidride carbonica, il $2{,}1\%$ di ossigeno e l'$87{,}4\%$ di azoto.
:::

::: esercizio Quante volte nel reattore [medio]
In un processo con riciclo reagisce a ogni passaggio il $15\%$ dei reagenti che entrano nel reattore. Quante volte, in media, una molecola di reagente attraversa il reattore prima di reagire? Qual è il rapporto fra la portata di riciclo e quella di alimentazione fresca?
>>> soluzione
A ogni passaggio reagisce una frazione $0{,}15$: in media servono $1/0{,}15\simeq6{,}7$ passaggi. Il riciclo vale $(1-0{,}15)/0{,}15\simeq5{,}7$ volte l'alimentazione fresca.
:::

::: esercizio Lineare o convergente [avanzato]
Una molecola si può preparare con una sintesi lineare di dodici passaggi, oppure con una convergente in cui due frammenti si preparano ciascuno in cinque passaggi e poi si uniscono con un passaggio di accoppiamento seguito da un passaggio finale. Con rese dell'$85\%$ per passaggio, confrontare le rese complessive.
>>> soluzione
Sintesi lineare: $0{,}85^{12}\simeq14\%$. Sintesi convergente: il percorso più lungo conta $5+1+1=7$ passaggi, e la resa è $0{,}85^7\simeq32\%$, più del doppio, con lo stesso numero totale di trasformazioni.
:::

::: esercizio Il fattore E di un lotto [avanzato]
Per produrre $1{,}0\un{kg}$ di un principio attivo si impiegano $4{,}0\un{kg}$ di reagenti e $40\un{kg}$ di solventi, dei quali il $90\%$ viene recuperato e riutilizzato. Calcolare il fattore E con e senza recupero dei solventi.
>>> soluzione
Senza recupero gli scarti sono $4{,}0+40-1{,}0=43\un{kg}$, e il fattore E vale $43$. Con il recupero si perdono soltanto $4\un{kg}$ di solvente, e gli scarti diventano $4{,}0+4{,}0-1{,}0=7{,}0\un{kg}$: il fattore E scende a $7$. Nell'industria farmaceutica i solventi sono di solito la voce più grande del fattore E.
:::

::: esercizio L'ibuprofene del processo BHC [avanzato]
Il bilancio complessivo del processo in tre passaggi per l'ibuprofene si può scrivere
$$\begin{aligned}&\mathrm{C_{10}H_{14}}+\mathrm{C_4H_6O_3}+\mathrm H_2+\mathrm{CO}\longrightarrow\\&\quad\mathrm{C_{13}H_{18}O_2}+\mathrm{CH_3COOH}.\end{aligned}$$ Verificare che l'equazione è bilanciata e calcolare l'economia atomica.
>>> soluzione
Carbonio: $10+4+1=15$ a sinistra, $13+2$ a destra; idrogeno: $14+6+2=22$ e $18+4$; ossigeno: $3+1=4$ e $2+2$. I reagenti hanno in tutto una massa molare di $266{,}34\un{g/mol}$, e l'economia atomica è $206{,}28/266{,}34\simeq77\%$. Il resto della massa è l'acido acetico, che si può recuperare e vendere.
:::

::: esercizio La perdita nella ricristallizzazione [avanzato]
Un composto X si scioglie in un solvente per $2{,}5\un{g}$ ogni $100\un{mL}$ a $0\,^\circ\mathrm{C}$. Si purificano $10{,}0\un{g}$ di X grezzo, che contiene $0{,}5\un{g}$ di impurezze molto solubili, sciogliendoli a caldo in $60\un{mL}$ di solvente e raffreddando a $0\,^\circ\mathrm{C}$. Calcolare la massa massima di X puro recuperabile e la resa di recupero.
>>> soluzione
A $0\,^\circ\mathrm{C}$ restano sciolti $2{,}5\times0{,}60=1{,}5\un{g}$ di X. Dei $9{,}5\un{g}$ di X presenti ne cristallizzano al massimo $8{,}0\un{g}$, una resa di recupero dell'$84\%$. Usare il minimo volume di solvente necessario per sciogliere il grezzo a caldo riduce la perdita.
:::

::: esercizio Il sale dal mare [avanzato]
L'acqua di mare contiene il $3{,}5\%$ in massa di sali, e nelle saline viene concentrata per evaporazione fino a una salamoia al $25\%$. Scrivere il bilancio dei sali per una tonnellata di acqua di mare e calcolare la massa di salamoia e la massa di acqua evaporata. Quante tonnellate di acqua di mare servono, al minimo, per ogni tonnellata di sali?
>>> soluzione
I sali entrano e restano tutti nella salamoia: $35\un{kg}=0{,}25\,m_\text{salamoia}$, da cui $m_\text{salamoia}=140\un{kg}$. L'acqua evaporata è $1000-140=860\un{kg}$. Per una tonnellata di sali servono almeno $1000/0{,}035\simeq28{,}6\un{t}$ di acqua di mare.
:::

## Fonti {#fonti}

Il testo, le figure, gli esempi e gli esercizi di questo capitolo sono originali. Per la scelta e l'ordine degli argomenti il riferimento principale è il manuale di R. H. Petrucci, F. G. Herring, J. D. Madura e C. Bissonnette, *General Chemistry: Principles and Modern Applications*, 11ª edizione, Pearson Canada, Toronto, 2017, paragrafo 4-5. I dati numerici provengono dalle fonti seguenti.

1. Masse molari: pesi atomici standard IUPAC/CIAAW. Densità dell'anidride acetica: CRC Handbook of Chemistry and Physics. Composizione dell'aria secca: US Standard Atmosphere.
2. Economia atomica: B. M. Trost, Science 254 (1991) 1471. Fattore E e intervalli tipici per settore: R. A. Sheldon, Chem. Ind. (1992) 903, e Green Chem. 19 (2017) 18.
3. Processi per l'ibuprofene: documentazione del Presidential Green Chemistry Challenge Award 1997, US Environmental Protection Agency.
4. Per la storia: P. T. Anastas e J. C. Warner, *Green Chemistry: Theory and Practice*, Oxford University Press, 1998.
