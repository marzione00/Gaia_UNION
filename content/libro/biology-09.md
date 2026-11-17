---
unit: biology-09
titolo: Sorgenti idrotermali e metabolismo primordiale
sottotitolo: Fumarole nere, camini alcalini, idrogeno e le prime reazioni capaci di fornire energia
volume: Volume di biologia
fonte: Testo originale; riferimenti principali A. M. Shaw, Astrochemistry, §8.7, 8.8, 9.4; J. R. Morris et al., Biology: How Life Works, 2ª ed., Caso 1, §6.5, 7.4–7.6, 26.2, 26.5
---

## Prima di cominciare {#apertura}

Nel febbraio del 1977 il sommergibile Alvin scese a circa duemilacinquecento metri di profondità lungo la dorsale delle Galápagos, nel Pacifico orientale. I geologi a bordo cercavano sorgenti calde, previste dalla teoria della tettonica delle placche: dove la crosta oceanica si forma, l'acqua di mare doveva penetrare nelle rocce ancora calde e risalire riscaldata. Trovarono le sorgenti, con acqua tiepida che usciva dal fondale, e trovarono qualcosa che nessuno aveva previsto: colonie dense di vermi tubicoli, vongole grandi come un piatto, granchi e pesci, in un luogo dove la luce del Sole non arriva da milioni di anni.

Quegli animali vivono di chimica. Alla base della loro catena alimentare ci sono microrganismi che ricavano energia da reazioni fra le sostanze disciolte nell'acqua calda, come l'acido solfidrico e l'idrogeno, e le sostanze dell'acqua di mare, come l'ossigeno e il diossido di carbonio. La scoperta ha cambiato due idee. Ha mostrato che un ecosistema intero può fare a meno della fotosintesi, e ha suggerito che la vita sulla Terra possa essere nata in un ambiente simile, al buio, sul fondo dell'oceano, alimentata dall'energia chimica che le rocce cedono all'acqua.

Questo capitolo segue quell'ipotesi. Descrive i due grandi tipi di sorgenti idrotermali, le fumarole nere, calde e acide, e i camini alcalini, tiepidi e ricchi di idrogeno; calcola con l'energia di Gibbs quanta energia può ricavare un microrganismo che produce metano dall'idrogeno, e come questa energia dipende dalle concentrazioni e dalla temperatura; presenta le teorie che collocano l'origine del metabolismo sulle superfici dei minerali di ferro e zolfo e nei gradienti naturali di protoni dei camini; e discute i limiti di queste teorie e il loro significato per la ricerca della vita su Encelado e su Europa.

::: obiettivi
- descrivere le fumarole nere e i camini alcalini, con le rispettive temperature, composizioni e minerali;
- scrivere le reazioni della serpentinizzazione e spiegare perché producono idrogeno e fluidi alcalini;
- distinguere chemioautotrofi, fotoautotrofi ed eterotrofi e riconoscere donatori e accettori di elettroni;
- calcolare l'energia di Gibbs della metanogenesi in condizioni non standard e la pressione minima di idrogeno che la rende utile;
- stimare l'effetto della temperatura sul favore termodinamico di una reazione a partire da entalpia ed entropia;
- descrivere l'ipotesi del mondo a ferro e zolfo, l'ipotesi dei camini alcalini e la via dell'acetil-CoA;
- calcolare l'energia associata a un gradiente di pH e confrontarla con quella dell'ATP;
- discutere i punti deboli dell'origine idrotermale e le alternative proposte.
:::

Il capitolo usa l'energia di Gibbs fuori dalle condizioni standard e la catalisi del capitolo [Energia, enzimi e catalisi](unit:biology-08), le reazioni di ossidoriduzione del capitolo [Ossidazione, riduzione ed elettrochimica](unit:chemistry-23) e il pH del capitolo [Acidi, basi e pH](unit:chemistry-21). La pressione nei fluidi è trattata nel capitolo [Fluidi e pressione](unit:physics-14).

## La scoperta dei camini {#scoperta}

Le dorsali oceaniche sono catene montuose sottomarine lunghe complessivamente decine di migliaia di chilometri, lungo le quali le placche si allontanano e il magma risale a formare nuova crosta. Già nei primi anni Settanta i geofisici avevano notato che il calore emesso dalla crosta giovane era minore di quello previsto dai modelli di raffreddamento per conduzione: una parte del calore doveva essere portata via dall'acqua che circola nelle fratture delle rocce. La spedizione del 1977 alle Galápagos, guidata da John Corliss e Robert Ballard, confermò l'ipotesi. Le sorgenti trovate erano tiepide, con temperature fino a circa una ventina di gradi, perché il fluido caldo si mescolava sotto il fondale con l'acqua fredda.

Due anni dopo, nell'aprile del 1979, Alvin esplorò la dorsale del Pacifico orientale a $21^\circ$ di latitudine nord, a circa $2600\un{m}$ di profondità. Qui il fluido usciva da camini di minerali alti alcuni metri, nero come fumo, a una temperatura di $380\pm30\,^\circ\mathrm C$: era così caldo che fuse la sonda di plastica con cui si tentò di misurarlo. Erano le prime **fumarole nere** osservate. Attorno alle sorgenti più fredde della stessa zona vivevano gli stessi animali delle Galápagos, e fu chiaro che le comunità idrotermali sono un fenomeno diffuso lungo tutte le dorsali.

L'animale più vistoso di queste comunità è il verme tubicolo *Riftia pachyptila*, che vive in tubi bianchi lunghi fino a circa due metri, con un pennacchio rosso di branchie ricche di emoglobina. L'adulto non ha bocca né intestino. Nel 1981 Colleen Cavanaugh, allora studentessa, propose che la sua nutrizione dipendesse dai batteri che riempiono un organo interno, il trofosoma, e che questi batteri fossero chemioautotrofi: ossidano l'acido solfidrico con l'ossigeno e usano l'energia per fissare il diossido di carbonio. Il verme porta ai batteri le materie prime, che la sua emoglobina trasporta legate, e riceve in cambio le molecole organiche prodotte dai batteri. È una simbiosi che ricorda quella fra un'alga e un fungo in un lichene, trasferita al buio.

::: storia Un ecosistema senza Sole, quasi
Le comunità idrotermali moderne dipendono dalla fotosintesi più di quanto sembri. L'ossigeno con cui i batteri del trofosoma ossidano l'acido solfidrico è prodotto dalle piante e dalle alghe della superficie, e arriva in profondità con la circolazione oceanica. Senza la fotosintesi i chemioautotrofi aerobici di oggi resterebbero senza accettore di elettroni. Sulla Terra primitiva, priva di ossigeno, le reazioni utili dovevano essere diverse, e la più studiata è la riduzione del diossido di carbonio con l'idrogeno, che non richiede ossigeno.
:::

## Come funziona una fumarola nera {#fumarole}

L'acqua di mare penetra nella crosta oceanica attraverso le fratture, scende per qualche chilometro e si avvicina alla camera magmatica, dove le rocce superano i mille gradi (figura 1). Riscaldandosi, l'acqua reagisce con il basalto. Perde il magnesio e il solfato, che restano nelle rocce sotto forma di nuovi minerali, e diventa acida; scioglie ferro, manganese, rame e zinco, e si arricchisce di acido solfidrico, di idrogeno, di diossido di carbonio e di metano. Il fluido caldo è meno denso dell'acqua fredda circostante e risale rapidamente verso il fondale.

::: figura camini
{"w":720,"h":345,"items":[{"t":"line","p":[20,170,710,170],"c":"ax","w":2},{"t":"text","p":[30,40],"s":"oceano","c":"muted","size":11,"a":"start"},{"t":"poly","pts":[[208,170],[254,170],[244,96],[218,96]],"c":"ax","w":1.6,"close":true,"fill":true},{"t":"circle","p":[231,86,9],"c":"muted"},{"t":"circle","p":[237,70,12],"c":"muted"},{"t":"circle","p":[227,52,15],"c":"muted"},{"t":"circle","p":[239,32,18],"c":"muted"},{"t":"text","p":[100,198],"s":"fumarola nera","c":"force","size":12},{"t":"text","p":[100,216],"s":"350–400 °C, pH ≈ 3","c":"ax","size":11},{"t":"text","p":[100,232],"s":"solfuri di metalli, H₂S","c":"ax","size":11},{"t":"poly","pts":[[170,330],[345,330],[325,290],[190,290]],"c":"force","w":1.6,"close":true},{"t":"text","p":[258,318],"s":"magma","c":"force","size":11},{"t":"arrow","p":[190,180,206,280],"c":"force2","w":1.6,"head":8},{"t":"arrow","p":[300,280,248,180],"c":"force","w":1.6,"head":8},{"t":"poly","pts":[[580,170],[640,170],[628,70],[620,52],[604,58],[592,70]],"c":"force3","w":1.6,"close":true},{"t":"poly","pts":[[640,170],[670,170],[664,120],[652,116]],"c":"force3","w":1.6,"close":true},{"t":"circle","p":[612,40,3],"c":"force3"},{"t":"circle","p":[618,24,3],"c":"force3"},{"t":"circle","p":[609,10,3],"c":"force3"},{"t":"text","p":[470,198],"s":"camino alcalino","c":"force3","size":12},{"t":"text","p":[470,216],"s":"40–90 °C, pH 9–11","c":"ax","size":11},{"t":"text","p":[470,232],"s":"carbonati, H₂, CH₄","c":"ax","size":11},{"t":"poly","pts":[[540,336],[705,336],[705,276],[540,276]],"c":"force4","w":1.4,"close":true,"dash":true},{"t":"text","p":[622,300],"s":"peridotite","c":"force4","size":11},{"t":"text","p":[622,316],"s":"serpentinizzazione","c":"force4","size":11},{"t":"arrow","p":[560,180,572,268],"c":"force2","w":1.6,"head":8},{"t":"arrow","p":[690,268,648,180],"c":"force3","w":1.6,"head":8}]}
---
Due tipi di sorgenti idrotermali, in sezione schematica. A sinistra una fumarola nera: l'acqua di mare scende nelle fratture, si scalda vicino al magma, reagisce con il basalto e risale acida e ricca di metalli. A destra un camino alcalino: l'acqua reagisce a temperature più basse con la peridotite del mantello, che la serpentinizzazione trasforma liberando idrogeno.
:::

Il fluido resta liquido anche a temperature di centinaia di gradi perché è compresso dall'acqua sovrastante. A $2000\un{m}$ di profondità la pressione idrostatica vale

$$\begin{aligned}p=\rho g h&\simeq1025\cdot9{,}81\cdot2000\un{Pa}\\&\simeq2{,}0\times10^7\un{Pa},\end{aligned}$$

cioè circa $200\un{bar}$, e a questa pressione l'acqua pura bolle a circa $366\,^\circ\mathrm C$; il punto critico dell'acqua di mare è attorno a $407\,^\circ\mathrm C$ e $298\un{bar}$. Quando il fluido a $350$–$400\,^\circ\mathrm C$ incontra l'acqua del fondale, a circa $2\,^\circ\mathrm C$, si raffredda in pochi centimetri e i metalli disciolti precipitano come solfuri finissimi: pirite e pirrotite di ferro, calcopirite di rame e ferro, sfalerite di zinco. La nube nera che dà il nome alle fumarole è fatta di queste particelle. Le pareti dei camini, fatte di solfuri e di solfato di calcio, possono crescere di decine di centimetri in un solo giorno, e un camino può arrivare a decine di metri prima di crollare.

Le fumarole nere sono ambienti estremi anche per i microrganismi più resistenti. Il record di temperatura per la crescita di un organismo appartiene a un archeo metanogeno, un ceppo di *Methanopyrus kandleri* isolato da una fumarola della dorsale indiana centrale: si moltiplica fino a $116\,^\circ\mathrm C$ a pressione quasi ordinaria e fino a $122\,^\circ\mathrm C$ alla pressione di $20\un{MPa}$, simile a quella del fondale da cui proviene. Il fluido che esce da una fumarola nera è molto più caldo, e la vita si trova nelle pareti dei camini e nelle zone di mescolamento, dove la temperatura scende sotto questo limite. Per l'origine della vita le fumarole nere presentano due difetti: la temperatura del fluido distrugge in pochi secondi le molecole organiche fragili, e la forte acidità e la rapidità del mescolamento lasciano poco tempo e poco spazio per una chimica ordinata. Per questo l'attenzione si è spostata su un secondo tipo di sorgente.

## Camini alcalini e serpentinizzazione {#serpentinizzazione}

Nel dicembre del 2000 una spedizione sulla dorsale medio-atlantica, a circa $30^\circ$ di latitudine nord, scoprì per caso un campo idrotermale diverso da tutti quelli noti. Si trova sul massiccio Atlantis, a più di quindici chilometri dall'asse della dorsale, lontano dal magma, e fu chiamato **Lost City**, la città perduta. I suoi camini sono torri bianche di carbonato di calcio e di idrossido di magnesio alte fino a sessanta metri; il più alto fu chiamato Poseidone. I fluidi escono a temperature fra meno di $40$ e circa $90\,^\circ\mathrm C$, sono fortemente basici, con pH fra $9$ e $11$, sono poveri di metalli e di diossido di carbonio, e contengono idrogeno, da $1$ a $15\un{mmol/kg}$, e metano, da $1$ a $2\un{mmol/kg}$. Il campo è attivo da più di trentamila anni.

La sorgente di energia di Lost City è chimica. Sotto il massiccio affiorano rocce del mantello, le **peridotiti**, fatte soprattutto di olivina, un silicato di magnesio e ferro di formula $(\mathrm{Mg,Fe})_2\mathrm{SiO_4}$. A contatto con l'acqua, a temperature fino a circa $200\,^\circ\mathrm C$ nel sottosuolo, l'olivina si trasforma in serpentino, un silicato idrato di magnesio dall'aspetto verde e lucido come la pelle di un serpente. È la **serpentinizzazione** (figura 2). La parte di magnesio della reazione, scritta per la forsterite, l'olivina di solo magnesio, produce serpentino e brucite:

$$\begin{aligned}&2\,\mathrm{Mg_2SiO_4}+3\,\mathrm{H_2O}\\&\longrightarrow\mathrm{Mg_3Si_2O_5(OH)_4}+\mathrm{Mg(OH)_2}.\end{aligned}$$

La brucite, l'idrossido di magnesio, rende basico il fluido. La parte di ferro, scritta per la fayalite, l'olivina di solo ferro, è un'ossidoriduzione:

$$\begin{aligned}&3\,\mathrm{Fe_2SiO_4}+2\,\mathrm{H_2O}\\&\longrightarrow2\,\mathrm{Fe_3O_4}+3\,\mathrm{SiO_2}+2\,\mathrm{H_2}.\end{aligned}$$

Il ferro passa in parte dallo stato di ossidazione $+2$ a $+3$ nella magnetite, $\mathrm{Fe_3O_4}$, e gli elettroni ceduti riducono l'idrogeno dell'acqua a idrogeno molecolare. È la stessa coppia di processi che sulla Terra produce idrogeno ovunque l'acqua incontri rocce del mantello, e che le missioni spaziali cercano sugli altri mondi.

::: figura serpentinizzazione
{"w":720,"h":250,"items":[{"t":"rect","p":[20,30,150,46],"c":"body","r":4},{"t":"poly","pts":[[20,30],[170,30],[170,76],[20,76]],"close":true,"c":"force2","w":1.6},{"t":"text","p":[95.0,50.0],"s":"acqua di mare","c":"force2","size":11},{"t":"text","p":[95.0,64.0],"s":"pH ≈ 8, carbonati","c":"force2","size":11},{"t":"rect","p":[220,30,180,46],"c":"body","r":4},{"t":"poly","pts":[[220,30],[400,30],[400,76],[220,76]],"close":true,"c":"force4","w":1.6},{"t":"text","p":[310.0,50.0],"s":"peridotite","c":"force4","size":11},{"t":"text","p":[310.0,64.0],"s":"olivina (Mg,Fe)₂SiO₄","c":"force4","size":11},{"t":"rect","p":[450,30,240,46],"c":"body","r":4},{"t":"poly","pts":[[450,30],[690,30],[690,76],[450,76]],"close":true,"c":"force4","w":1.6},{"t":"text","p":[570.0,50.0],"s":"serpentino, brucite,","c":"force4","size":11},{"t":"text","p":[570.0,64.0],"s":"magnetite Fe₃O₄ + H₂","c":"force4","size":11},{"t":"arrow","p":[172,53,218,53],"c":"ax","w":1.6,"head":8},{"t":"arrow","p":[402,53,448,53],"c":"ax","w":1.6,"head":8},{"t":"text","p":[310,100],"s":"fino a circa 200 °C nel sottosuolo","c":"muted","size":11},{"t":"rect","p":[450,140,240,46],"c":"body","r":4},{"t":"poly","pts":[[450,140],[690,140],[690,186],[450,186]],"close":true,"c":"force3","w":1.6},{"t":"text","p":[570.0,160.0],"s":"fluido alcalino, pH 9–11","c":"force3","size":11},{"t":"text","p":[570.0,174.0],"s":"H₂ 1–15 mmol/kg, CH₄","c":"force3","size":11},{"t":"arrow","p":[570,78,570,138],"c":"ax","w":1.6,"head":8},{"t":"rect","p":[220,140,180,46],"c":"body","r":4},{"t":"poly","pts":[[220,140],[400,140],[400,186],[220,186]],"close":true,"c":"force2","w":1.6},{"t":"text","p":[310.0,160.0],"s":"mescolamento","c":"force2","size":11},{"t":"text","p":[310.0,174.0],"s":"con l’acqua di mare","c":"force2","size":11},{"t":"arrow","p":[448,163,402,163],"c":"ax","w":1.6,"head":8},{"t":"rect","p":[20,140,150,46],"c":"body","r":4},{"t":"poly","pts":[[20,140],[170,140],[170,186],[20,186]],"close":true,"c":"force3","w":1.6},{"t":"text","p":[95.0,160.0],"s":"camino di","c":"force3","size":11},{"t":"text","p":[95.0,174.0],"s":"carbonato di calcio","c":"force3","size":11},{"t":"arrow","p":[218,163,172,163],"c":"ax","w":1.6,"head":8},{"t":"text","p":[355,232],"s":"3 Fe₂SiO₄ + 2 H₂O → 2 Fe₃O₄ + 3 SiO₂ + 2 H₂","c":"force4","size":12}]}
---
La catena di processi di un camino alcalino come Lost City. L'acqua di mare reagisce con l'olivina della peridotite; la serpentinizzazione produce serpentino, brucite, magnetite e idrogeno; il fluido alcalino che risale si mescola con l'acqua di mare e deposita carbonato di calcio, che costruisce i camini.
:::

Quando il fluido alcalino, ricco di ioni calcio, incontra l'acqua di mare, che contiene ioni carbonato e bicarbonato, precipita carbonato di calcio, $\mathrm{Ca^{2+}}+\mathrm{CO_3^{2-}}\longrightarrow\mathrm{CaCO_3}$. Le pareti dei camini sono porose, attraversate da una rete di cavità e canali di dimensioni che vanno dai micrometri ai millimetri, dove fluido caldo e acqua di mare si incontrano attraverso sottili pareti minerali. Nelle cavità di Lost City vivono comunità di microrganismi poco diversificate: nelle pareti più calde dei camini attivi dominano biofilm di archei del gruppo dei Methanosarcinales, che producono o consumano metano, accompagnati da batteri che ossidano l'idrogeno, lo zolfo e il metano.

::: definizione Due tipi di sorgenti idrotermali
**Fumarole nere**: alimentate dal magma, sull'asse delle dorsali; fluidi a $350$–$400\,^\circ\mathrm C$, acidi, con pH attorno a $3$, ricchi di metalli, di acido solfidrico e di diossido di carbonio; camini di solfuri metallici.

**Camini alcalini**: alimentati dalla serpentinizzazione delle rocce del mantello, spesso lontano dall'asse; fluidi a $40$–$90\,^\circ\mathrm C$, basici, con pH fra $9$ e $11$, ricchi di idrogeno e di metano, poveri di metalli; camini di carbonato e di idrossidi.
:::

Sulla Terra primitiva i camini alcalini dovevano essere molto più diffusi di oggi. La crosta oceanica dell'Adeano e dell'Archeano era più ricca di rocce simili al mantello, perché il mantello era più caldo e fondeva in proporzione maggiore, e l'oceano era più acido dell'attuale, perché l'atmosfera conteneva molto più diossido di carbonio: i modelli del ciclo geologico del carbonio stimano per l'oceano di quattro miliardi di anni fa un pH di circa $6{,}6$. Fra un fluido a pH $10$ e un oceano a pH $6{,}6$ c'è una differenza di oltre tre unità di pH, cioè un rapporto di più di mille fra le concentrazioni di ioni idrogeno sui due lati di una parete minerale. Su questo gradiente si fonda una delle ipotesi più discusse sull'origine del metabolismo.

## Energia chimica nel buio {#chemiosintesi}

Gli organismi si classificano secondo due criteri: da dove prendono l'energia e da dove prendono il carbonio con cui costruiscono le proprie molecole. Le piante e i cianobatteri sono **fotoautotrofi**: energia dalla luce, carbonio dal diossido di carbonio. Gli animali e i funghi sono **chemioeterotrofi**: ricavano energia e carbonio dalle molecole organiche prodotte da altri. I microrganismi delle sorgenti idrotermali sono in gran parte **chemioautotrofi**: ricavano energia da reazioni fra sostanze inorganiche e fissano il diossido di carbonio. Il loro metabolismo si chiama anche **chemiosintesi**, per analogia con la fotosintesi.

Ogni reazione che fornisce energia a un chemioautotrofo è un'ossidoriduzione. Una sostanza, il **donatore di elettroni**, si ossida cedendo elettroni; un'altra, l'**accettore di elettroni**, si riduce accettandoli. La differenza fra i potenziali di riduzione delle due coppie stabilisce quanta energia la reazione può fornire. Se $n$ moli di elettroni passano da una coppia con potenziale $E_\mathrm{donatore}$ a una con potenziale $E_\mathrm{accettore}$, l'energia di Gibbs della reazione è

$$\Delta G=-nF\,(E_\mathrm{accettore}-E_\mathrm{donatore}),$$

dove $F\simeq96\,485\un{C/mol}$ è la costante di Faraday. Più l'accettore è in alto nella scala dei potenziali e il donatore in basso, più energia si libera.

| Metabolismo | Donatore | Accettore |
|---|---|---|
| ossidazione dell'idrogeno | $\mathrm{H_2}$ | $\mathrm{O_2}$ |
| ossidazione dei solfuri | $\mathrm{H_2S}$ | $\mathrm{O_2}$, $\mathrm{NO_3^-}$ |
| ossidazione del ferro | $\mathrm{Fe^{2+}}$ | $\mathrm{O_2}$ |
| riduzione del solfato | $\mathrm{H_2}$ | $\mathrm{SO_4^{2-}}$ |
| metanogenesi | $\mathrm{H_2}$ | $\mathrm{CO_2}$ |
| acetogenesi | $\mathrm{H_2}$ | $\mathrm{CO_2}$ |

Nelle sorgenti idrotermali di oggi l'accettore più usato è l'ossigeno, che l'acqua di mare porta disciolto e che le piante e le alghe della superficie producono con la fotosintesi. Sulla Terra primitiva l'ossigeno libero mancava, e i metabolismi possibili erano quelli delle ultime righe della tabella, in cui l'accettore è il diossido di carbonio o il solfato. Fra questi, la **metanogenesi** e l'**acetogenesi** hanno un interesse particolare: usano gli stessi due gas che la geologia fornisce in abbondanza, l'idrogeno della serpentinizzazione e il diossido di carbonio dei vulcani, e producono molecole organiche, il metano e l'acido acetico, insieme all'energia.

::: esempio Idrogeno con l'ossigeno o con il diossido di carbonio
A pH $7$ i potenziali di riduzione standard delle coppie coinvolte sono circa $-0{,}41\un{V}$ per $\mathrm{H^+/H_2}$, $-0{,}24\un{V}$ per $\mathrm{CO_2/CH_4}$ e $+0{,}82\un{V}$ per $\mathrm{O_2/H_2O}$. La metanogenesi trasferisce otto elettroni per ogni molecola di metano:

$$\begin{aligned}\Delta G&\simeq-8\cdot96\,485\cdot0{,}17\un{J/mol}\\&\simeq-131\un{kJ/mol}.\end{aligned}$$

Le stesse quattro molecole di idrogeno ossidate dall'ossigeno trasferiscono anch'esse otto elettroni, con una differenza di potenziale di $1{,}23\un{V}$: circa $-950\un{kJ}$, più di sette volte tanto. La respirazione aerobica dell'idrogeno rende molto di più, e i metanogeni sopravvivono soltanto dove l'ossigeno manca.
:::

I chemioautotrofi aerobici di oggi sono quindi una conseguenza della fotosintesi, che ha cominciato a riempire l'atmosfera e l'oceano di ossigeno circa $2{,}4$ miliardi di anni fa. I metanogeni e gli acetogeni, invece, possono vivere in un mondo senza luce e senza ossigeno, con il solo apporto di idrogeno e di diossido di carbonio dalle rocce. Questa indipendenza è il motivo per cui sono considerati i candidati migliori per somigliare ai primi organismi, e per cui la metanogenesi è la reazione di riferimento quando si stima l'energia disponibile negli oceani di Encelado o di Europa.

## La metanogenesi fuori dallo standard {#metanogenesi}

La reazione dei metanogeni idrogenotrofi è

$$\mathrm{CO_2}+4\,\mathrm{H_2}\longrightarrow\mathrm{CH_4}+2\,\mathrm{H_2O}.$$

Con le energie di Gibbs standard di formazione, $-394{,}36\un{kJ/mol}$ per il diossido di carbonio gassoso, $-50{,}72\un{kJ/mol}$ per il metano e $-237{,}13\un{kJ/mol}$ per l'acqua liquida, si ottiene a $25\,^\circ\mathrm C$

$$\begin{aligned}\Delta G^\circ&=-50{,}72-2\cdot237{,}13+394{,}36\\&\simeq-130{,}6\un{kJ/mol}.\end{aligned}$$

Il valore standard si riferisce a gas alla pressione di $1\un{bar}$, condizione lontana da quella di qualsiasi ambiente naturale. Nelle sorgenti idrotermali e nei sedimenti l'idrogeno è scarso, e l'energia di Gibbs effettiva si calcola con l'equazione già vista nel capitolo [Energia, enzimi e catalisi](unit:biology-08), $\Delta G=\Delta G^\circ+RT\ln Q$. Per i gas il quoziente di reazione si scrive con le pressioni parziali in bar, e l'attività dell'acqua liquida vale $1$:

$$Q=\frac{p_\mathrm{CH_4}}{p_\mathrm{CO_2}\,p_\mathrm{H_2}^4}.$$

Per un gas disciolto in acqua la pressione parziale da usare è quella del gas con cui la soluzione sarebbe in equilibrio, legata alla concentrazione dalla legge di Henry: a $25\,^\circ\mathrm C$ un litro d'acqua in equilibrio con idrogeno a $1\un{bar}$ ne contiene circa $0{,}78\un{mmol}$.

::: legge Energia di Gibbs della metanogenesi
Passando ai logaritmi decimali, con $\ln x=\ln10\cdot\log_{10}x$,

$$\begin{aligned}\Delta G={}&\Delta G^\circ+RT\ln10\,\log_{10}\frac{p_\mathrm{CH_4}}{p_\mathrm{CO_2}}\\&-4RT\ln10\,\log_{10}p_\mathrm{H_2}.\end{aligned}$$

A $25\,^\circ\mathrm C$ il fattore $RT\ln10$ vale $5{,}71\un{kJ/mol}$, e ogni riduzione di un fattore dieci della pressione di idrogeno rende $\Delta G$ meno negativo di $4\cdot5{,}71\simeq22{,}8\un{kJ/mol}$.
:::

La dipendenza dall'idrogeno è forte perché ne servono quattro molecole: l'idrogeno compare alla quarta potenza nel quoziente di reazione. Con metano e diossido di carbonio alla stessa pressione e $p_\mathrm{H_2}=10^{-4}\un{bar}$, l'energia disponibile scende a

$$\begin{aligned}\Delta G&\simeq-130{,}6+4\cdot5{,}71\cdot4\\&\simeq-39\un{kJ/mol},\end{aligned}$$

e con $10^{-5}\un{bar}$ a circa $-16\un{kJ/mol}$. Sotto circa $2\times10^{-6}\un{bar}$ la reazione si inverte, e il metano tende a reagire con l'acqua producendo idrogeno e diossido di carbonio (figura 3).

::: figura metanogenesi
{"w":760,"h":330,"items":[{"t":"axes","o":[90,300],"x":[620,"log₁₀ p(H₂/bar)"],"y":[275,"ΔG (kJ/mol)"],"sx":60,"sy":1.0,"xt":[[0,"-8"],[1,"-7"],[2,"-6"],[3,"-5"],[4,"-4"],[5,"-3"],[6,"-2"],[7,"-1"],[8,"0"]],"yt":[[0,"−180"],[40,"−140"],[80,"−100"],[120,"−60"],[160,"−20"],[200,"20"],[240,"60"]]},{"t":"line","p":[90,120.0,570,120.0],"c":"muted","w":1.2},{"t":"text","p":[576,124.0],"s":"0","c":"muted","size":11,"a":"start"},{"t":"line","p":[90,140.0,570,140.0],"c":"force","w":1.2,"dash":true},{"t":"text","p":[414.0,134.0],"s":"minimo per una cellula","c":"force","size":11,"a":"start"},{"t":"plot","o":[90,300],"sx":60,"sy":1.0,"pts":[[0.2,238.8859155],[0.3,236.6027117],[0.4,234.3195079],[0.5,232.0363041],[0.6,229.7531003],[0.7,227.4698965],[0.8,225.1866927],[0.9,222.9034889],[1.0,220.6202851],[1.1,218.3370813],[1.2,216.0538775],[1.3,213.7706737],[1.4,211.4874699],[1.5,209.2042661],[1.6,206.9210623],[1.7,204.6378585],[1.8,202.3546547],[1.9,200.0714509],[2.0,197.7882471],[2.1,195.5050433],[2.2,193.2218395],[2.3,190.9386357],[2.4,188.6554319],[2.5,186.3722281],[2.6,184.0890243],[2.7,181.8058205],[2.8,179.5226167],[2.9,177.2394129],[3.0,174.9562091],[3.1,172.6730053],[3.2,170.3898015],[3.3,168.1065977],[3.4,165.8233938],[3.5,163.54019],[3.6,161.2569862],[3.7,158.9737824],[3.8,156.6905786],[3.9,154.4073748],[4.0,152.124171],[4.1,149.8409672],[4.2,147.5577634],[4.3,145.2745596],[4.4,142.9913558],[4.5,140.708152],[4.6,138.4249482],[4.7,136.1417444],[4.8,133.8585406],[4.9,131.5753368],[5.0,129.292133],[5.1,127.0089292],[5.2,124.7257254],[5.3,122.4425216],[5.4,120.1593178],[5.5,117.876114],[5.6,115.5929102],[5.7,113.3097064],[5.8,111.0265026],[5.9,108.7432988],[6.0,106.460095],[6.1,104.1768912],[6.2,101.8936874],[6.3,99.6104836],[6.4,97.3272798],[6.5,95.044076],[6.6,92.7608722],[6.7,90.4776684],[6.8,88.1944646],[6.9,85.9112608],[7.0,83.628057],[7.1,81.3448532],[7.2,79.0616494],[7.3,76.7784456],[7.4,74.4952418],[7.5,72.212038],[7.6,69.9288342],[7.7,67.6456304],[7.8,65.3624266],[7.9,63.0792228],[8.0,60.796019]],"c":"force3","w":2.4},{"t":"text","p":[576.0,243.2],"s":"CH₄/CO₂ = 100","c":"force3","size":11,"a":"start"},{"t":"plot","o":[90,300],"sx":60,"sy":1.0,"pts":[[0.0,232.0363041],[0.1,229.7531003],[0.2,227.4698965],[0.3,225.1866927],[0.4,222.9034889],[0.5,220.6202851],[0.6,218.3370813],[0.7,216.0538775],[0.8,213.7706737],[0.9,211.4874699],[1.0,209.2042661],[1.1,206.9210623],[1.2,204.6378585],[1.3,202.3546547],[1.4,200.0714509],[1.5,197.7882471],[1.6,195.5050433],[1.7,193.2218395],[1.8,190.9386357],[1.9,188.6554319],[2.0,186.3722281],[2.1,184.0890243],[2.2,181.8058205],[2.3,179.5226167],[2.4,177.2394129],[2.5,174.9562091],[2.6,172.6730053],[2.7,170.3898015],[2.8,168.1065977],[2.9,165.8233938],[3.0,163.54019],[3.1,161.2569862],[3.2,158.9737824],[3.3,156.6905786],[3.4,154.4073748],[3.5,152.124171],[3.6,149.8409672],[3.7,147.5577634],[3.8,145.2745596],[3.9,142.9913558],[4.0,140.708152],[4.1,138.4249482],[4.2,136.1417444],[4.3,133.8585406],[4.4,131.5753368],[4.5,129.292133],[4.6,127.0089292],[4.7,124.7257254],[4.8,122.4425216],[4.9,120.1593178],[5.0,117.876114],[5.1,115.5929102],[5.2,113.3097064],[5.3,111.0265026],[5.4,108.7432988],[5.5,106.460095],[5.6,104.1768912],[5.7,101.8936874],[5.8,99.6104836],[5.9,97.3272798],[6.0,95.044076],[6.1,92.7608722],[6.2,90.4776684],[6.3,88.1944646],[6.4,85.9112608],[6.5,83.628057],[6.6,81.3448532],[6.7,79.0616494],[6.8,76.7784456],[6.9,74.4952418],[7.0,72.212038],[7.1,69.9288342],[7.2,67.6456304],[7.3,65.3624266],[7.4,63.0792228],[7.5,60.796019],[7.6,58.5128152],[7.7,56.2296114],[7.8,53.9464076],[7.9,51.6632038],[8.0,49.38]],"c":"force2","w":2.4},{"t":"text","p":[576.0,254.6],"s":"CH₄/CO₂ = 1","c":"force2","size":11,"a":"start"},{"t":"plot","o":[90,300],"sx":60,"sy":1.0,"pts":[[0.0,220.6202851],[0.1,218.3370813],[0.2,216.0538775],[0.3,213.7706737],[0.4,211.4874699],[0.5,209.2042661],[0.6,206.9210623],[0.7,204.6378585],[0.8,202.3546547],[0.9,200.0714509],[1.0,197.7882471],[1.1,195.5050433],[1.2,193.2218395],[1.3,190.9386357],[1.4,188.6554319],[1.5,186.3722281],[1.6,184.0890243],[1.7,181.8058205],[1.8,179.5226167],[1.9,177.2394129],[2.0,174.9562091],[2.1,172.6730053],[2.2,170.3898015],[2.3,168.1065977],[2.4,165.8233938],[2.5,163.54019],[2.6,161.2569862],[2.7,158.9737824],[2.8,156.6905786],[2.9,154.4073748],[3.0,152.124171],[3.1,149.8409672],[3.2,147.5577634],[3.3,145.2745596],[3.4,142.9913558],[3.5,140.708152],[3.6,138.4249482],[3.7,136.1417444],[3.8,133.8585406],[3.9,131.5753368],[4.0,129.292133],[4.1,127.0089292],[4.2,124.7257254],[4.3,122.4425216],[4.4,120.1593178],[4.5,117.876114],[4.6,115.5929102],[4.7,113.3097064],[4.8,111.0265026],[4.9,108.7432988],[5.0,106.460095],[5.1,104.1768912],[5.2,101.8936874],[5.3,99.6104836],[5.4,97.3272798],[5.5,95.044076],[5.6,92.7608722],[5.7,90.4776684],[5.8,88.1944646],[5.9,85.9112608],[6.0,83.628057],[6.1,81.3448532],[6.2,79.0616494],[6.3,76.7784456],[6.4,74.4952418],[6.5,72.212038],[6.6,69.9288342],[6.7,67.6456304],[6.8,65.3624266],[6.9,63.0792228],[7.0,60.796019],[7.1,58.5128152],[7.2,56.2296114],[7.3,53.9464076],[7.4,51.6632038],[7.5,49.38],[7.6,47.0967962],[7.7,44.8135924],[7.8,42.5303886],[7.9,40.2471848],[8.0,37.963981]],"c":"force4","w":2.4},{"t":"text","p":[576.0,266.0],"s":"CH₄/CO₂ = 0,01","c":"force4","size":11,"a":"start"},{"t":"circle","p":[330,159.3,5],"c":"force2"}]}
---
Energia di Gibbs della metanogenesi a $25\,^\circ\mathrm C$ in funzione della pressione di idrogeno, per tre rapporti fra le pressioni di metano e di diossido di carbonio. Ogni diminuzione di dieci volte dell'idrogeno alza la retta di circa $22{,}8\un{kJ/mol}$. La linea tratteggiata indica l'energia minima che, secondo le stime classiche, una cellula riesce a usare; il punto corrisponde a $10^{-4}\un{bar}$ di idrogeno, dove $\Delta G\simeq-39\un{kJ/mol}$.
:::

Una reazione esoergonica è utile a una cellula solo se libera abbastanza energia da essere accoppiata alla sintesi dell'ATP. Nelle cellule la sintesi dell'ATP richiede circa $50$–$70\un{kJ/mol}$, e l'ATP sintasi, l'enzima di membrana che la compie, usa il passaggio di tre o quattro protoni attraverso la membrana. L'energia minima utilizzabile corrisponde quindi a un protone, circa un terzo dell'energia di sintesi di un ATP: Bernhard Schink, nel 1997, la stimò in circa $-20\un{kJ/mol}$, e da allora in alcuni sedimenti sono stati osservati organismi attivi con valori ancora minori, attorno a $-10\un{kJ/mol}$. Con metano e diossido di carbonio alla stessa pressione, il limite di $-20\un{kJ/mol}$ si raggiunge per

$$\begin{aligned}\log_{10}p_\mathrm{H_2}&=\frac{-130{,}6+20}{22{,}83}\\&\simeq-4{,}84,\end{aligned}$$

cioè $p_\mathrm{H_2}\simeq1{,}4\times10^{-5}\un{bar}$, una concentrazione disciolta di circa $11\un{nmol/L}$. Nei sedimenti in cui prevale la metanogenesi l'idrogeno disciolto si mantiene proprio attorno a una decina di nanomoli per litro. Dove c'è solfato, invece, i batteri che lo riducono ricavano più energia da ogni molecola di idrogeno e lo abbassano a uno o due nanomoli per litro, sotto la soglia dei metanogeni, che per questo prosperano soprattutto dove il solfato è esaurito. La competizione per l'idrogeno è una competizione termodinamica.

::: nota Il quoziente lavora per la cellula
Il metano prodotto si allontana dalla cellula e il diossido di carbonio è spesso abbondante: entrambi rendono il quoziente di reazione piccolo e aiutano la reazione. Lo stesso principio permette ai metanogeni di aiutare altri microrganismi. Un batterio che fermenta gli acidi grassi e libera idrogeno ricava energia solo se l'idrogeno resta scarsissimo; un metanogeno vicino, che lo consuma, rende possibile la sua reazione e ne ricava a sua volta il proprio nutrimento. Queste collaborazioni metaboliche, in cui un organismo rende possibile la reazione di un altro abbassando la concentrazione di un prodotto, si chiamano **sintrofie**.
:::

## Temperatura e favore termodinamico {#temperatura}

La metanogenesi trasforma cinque molecole di gas in una molecola di gas e due di liquido, e diminuisce molto l'entropia del sistema. Con le entalpie e le entropie standard si trova $\Delta H^\circ\simeq-253{,}0\un{kJ/mol}$ e $\Delta S^\circ\simeq-410{,}4\un{J/(mol\,K)}$. Il termine $-T\Delta S^\circ$ è positivo e cresce con la temperatura: scaldare il sistema rende la reazione meno favorevole. Trascurando la variazione di $\Delta H^\circ$ e $\Delta S^\circ$ con la temperatura, a $100\,^\circ\mathrm C$

$$\begin{aligned}\Delta G^\circ&\simeq-253{,}0+373{,}15\cdot0{,}4104\\&\simeq-100\un{kJ/mol},\end{aligned}$$

e $\Delta G^\circ$ si annulla attorno a $T=\Delta H^\circ/\Delta S^\circ\simeq616\un{K}$, cioè circa $343\,^\circ\mathrm C$. Sopra questa temperatura, con gas a $1\un{bar}$, il metano tende a reagire con l'acqua formando diossido di carbonio e idrogeno. È per questo che nei fluidi idrotermali più caldi il carbonio si trova soprattutto come diossido di carbonio, e nei fluidi più freddi una parte crescente del carbonio può trovarsi come metano.

Quando la pressione di idrogeno è bassa, l'effetto della temperatura si somma a quello delle concentrazioni, perché anche il termine $RT\ln Q$ cresce con $T$. Con metano e diossido di carbonio alla stessa pressione e $p_\mathrm{H_2}=10^{-4}\un{bar}$,

$$\Delta G(T)\simeq\Delta H^\circ-T\Delta S^\circ+16RT\ln10,$$

che si annulla già attorno a $80\,^\circ\mathrm C$ (figura 4). Un metanogeno ipertermofilo che vive a $100\,^\circ\mathrm C$ ha bisogno di molto più idrogeno di un metanogeno dei sedimenti freddi, e lo trova soltanto vicino a fluidi idrotermali ricchi di gas.

::: figura temperatura
{"w":800,"h":300,"items":[{"t":"axes","o":[90,270],"x":[660,"temperatura (°C)"],"y":[250,"ΔG (kJ/mol)"],"sx":1.5,"sy":1.2,"xt":[[0,"0"],[50,"50"],[100,"100"],[150,"150"],[200,"200"],[250,"250"],[300,"300"],[350,"350"]],"yt":[[0,"−160"],[40,"−120"],[80,"−80"],[120,"−40"],[160,"0"],[200,"40"]]},{"t":"line","p":[90.0,78.0,615.0,78.0],"c":"muted","w":1.2},{"t":"plot","o":[90,270],"sx":1.5,"sy":1.2,"pts":[[0,19.1380285],[5,21.1899785],[10,23.2419285],[15,25.2938785],[20,27.3458285],[25,29.3977785],[30,31.4497285],[35,33.5016785],[40,35.5536285],[45,37.6055785],[50,39.6575285],[55,41.7094785],[60,43.7614285],[65,45.8133785],[70,47.8653285],[75,49.9172785],[80,51.9692285],[85,54.0211785],[90,56.0731285],[95,58.1250785],[100,60.1770285],[105,62.2289785],[110,64.2809285],[115,66.3328785],[120,68.3848285],[125,70.4367785],[130,72.4887285],[135,74.5406785],[140,76.5926285],[145,78.6445785],[150,80.6965285],[155,82.7484785],[160,84.8004285],[165,86.8523785],[170,88.9043285],[175,90.9562785],[180,93.0082285],[185,95.0601785],[190,97.1121285],[195,99.1640785],[200,101.2160285],[205,103.2679785],[210,105.3199285],[215,107.3718785],[220,109.4238285],[225,111.4757785],[230,113.5277285],[235,115.5796785],[240,117.6316285],[245,119.6835785],[250,121.7355285],[255,123.7874785],[260,125.8394285],[265,127.8913785],[270,129.9433285],[275,131.9952785],[280,134.0472285],[285,136.0991785],[290,138.1511285],[295,140.2030785],[300,142.2550285],[305,144.3069785],[310,146.3589285],[315,148.4108785],[320,150.4628285],[325,152.5147785],[330,154.5667285],[335,156.6186785],[340,158.6706285],[345,160.7225785],[350,162.7745285]],"c":"force3","w":2.4},{"t":"circle","p":[604.9,78.0,4],"c":"force3"},{"t":"text","p":[621.0,78.7],"s":"p(H₂) = 1 bar","c":"force3","size":11,"a":"start"},{"t":"plot","o":[90,270],"sx":1.5,"sy":1.2,"pts":[[0,60.973153],[5,63.7908933],[10,66.6086336],[15,69.4263739],[20,72.2441142],[25,75.0618545],[30,77.8795948],[35,80.6973351],[40,83.5150754],[45,86.3328157],[50,89.1505561],[55,91.9682964],[60,94.7860367],[65,97.603777],[70,100.4215173],[75,103.2392576],[80,106.0569979],[85,108.8747382],[90,111.6924785],[95,114.5102188],[100,117.3279591],[105,120.1456994],[110,122.9634397],[115,125.78118],[120,128.5989204],[125,131.4166607],[130,134.234401],[135,137.0521413],[140,139.8698816],[145,142.6876219],[150,145.5053622],[155,148.3231025],[160,151.1408428],[165,153.9585831],[170,156.7763234],[175,159.5940637],[180,162.411804],[185,165.2295444],[190,168.0472847],[195,170.865025],[200,173.6827653],[205,176.5005056],[210,179.3182459],[215,182.1359862],[220,184.9537265],[225,187.7714668],[230,190.5892071],[235,193.4069474],[240,196.2246877],[245,199.042428]],"c":"force2","w":2.4},{"t":"circle","p":[353.6,78.0,4],"c":"force2"},{"t":"text","p":[463.5,35.1],"s":"p(H₂) = 10⁻² bar","c":"force2","size":11,"a":"start"},{"t":"plot","o":[90,270],"sx":1.5,"sy":1.2,"pts":[[0,102.8082775],[5,106.3918081],[10,109.9753387],[15,113.5588693],[20,117.1423999],[25,120.7259305],[30,124.3094612],[35,127.8929918],[40,131.4765224],[45,135.060053],[50,138.6435836],[55,142.2271142],[60,145.8106448],[65,149.3941755],[70,152.9777061],[75,156.5612367],[80,160.1447673],[85,163.7282979],[90,167.3118285],[95,170.8953591],[100,174.4788898],[105,178.0624204],[110,181.645951],[115,185.2294816],[120,188.8130122],[125,192.3965428],[130,195.9800734],[135,199.5636041]],"c":"force","w":2.4},{"t":"circle","p":[209.7,78.0,4],"c":"force"},{"t":"text","p":[298.5,34.5],"s":"p(H₂) = 10⁻⁴ bar","c":"force","size":11,"a":"start"}]}
---
Energia di Gibbs della metanogenesi in funzione della temperatura, con metano e diossido di carbonio alla stessa pressione e tre pressioni di idrogeno, nell'approssimazione di entalpia ed entropia costanti. I punti indicano le temperature oltre le quali la reazione smette di fornire energia: circa $343$, $176$ e $80\,^\circ\mathrm C$.
:::

Termodinamica e cinetica tirano in direzioni opposte. Alle alte temperature le reazioni sono veloci, come insegna la legge di Arrhenius, ma molte sintesi diventano sfavorevoli e le molecole organiche si decompongono; alle basse temperature le sintesi sono favorite, ma lentissime senza catalizzatori. Le zone in cui un fluido caldo e ridotto si mescola con acqua fredda e ossidata offrono un compromesso. I calcoli di Thomas McCollom e Everett Shock, del 1997, hanno mostrato che in queste zone di mescolamento l'energia chimica disponibile per i chemioautotrofi cambia con la temperatura: nelle miscele più fredde, ricche di acqua di mare, prevalgono le reazioni con l'ossigeno, in quelle più calde, ricche di fluido idrotermale, la metanogenesi e la riduzione del solfato. Le pareti porose di un camino, attraversate da gradienti di temperatura e di composizione su distanze di centimetri, contengono tutta questa varietà di ambienti in uno spazio piccolo.

## Il mondo a ferro e zolfo {#ferrozolfo}

Alla fine degli anni Ottanta un chimico tedesco che lavorava come consulente in brevetti a Monaco, Günter Wächtershäuser, propose un'ipotesi radicale. La vita sarebbe cominciata con il metabolismo, prima dei geni, sotto forma di reazioni autocatalitiche che fissavano il carbonio sulla superficie di minerali di ferro e zolfo, in sorgenti vulcaniche sottomarine. La fonte di energia sarebbe stata la formazione della pirite dal solfuro di ferro e dall'acido solfidrico:

$$\mathrm{FeS}+\mathrm{H_2S}\longrightarrow\mathrm{FeS_2}+\mathrm{H_2}.$$

Con le energie di Gibbs di formazione, $-100{,}4\un{kJ/mol}$ per il solfuro di ferro, $-166{,}9\un{kJ/mol}$ per la pirite e $-27{,}8\un{kJ/mol}$ per l'acido solfidrico in soluzione, la reazione ha $\Delta G^\circ\simeq-38{,}7\un{kJ/mol}$: è esoergonica e produce idrogeno, un riducente capace di trasformare il diossido di carbonio. Nel 1990 il gruppo di Karl Stetter, con Wächtershäuser, mostrò che la reazione avviene davvero in assenza di ossigeno a $100\,^\circ\mathrm C$, producendo pirite e idrogeno.

Il secondo elemento dell'ipotesi riguarda la superficie del minerale. La pirite ha una superficie carica positivamente, che attira e trattiene molecole con gruppi carichi negativamente, come i carbossilati e i fosfati. Le molecole legate alla superficie si muovono in due dimensioni anziché in tre, si incontrano più spesso e sfuggono alla diluizione nell'oceano. Già negli anni Sessanta e Settanta Graham Cairns-Smith aveva proposto un ruolo analogo per i cristalli delle argille, capaci di ripetere la propria struttura e di ospitare reazioni organiche. Le superfici minerali, in queste ipotesi, svolgono il compito che nelle cellule spetta alle membrane e agli enzimi.

Nel 1997 Claudia Huber e Wächtershäuser fecero reagire monossido di carbonio e metantiolo, $\mathrm{CH_3SH}$, su un precipitato di solfuri di ferro e di nichel a $100\,^\circ\mathrm C$, e ottennero acido acetico e il suo tioestere, una forma «attivata» dell'acido acetico, chimicamente simile all'acetil-coenzima A, la molecola che in tutte le cellule distribuisce i gruppi acetile. Il risultato è suggestivo perché i centri attivi di molti enzimi antichi contengono gruppi di atomi di ferro e zolfo, i **cluster ferro-zolfo**, con una struttura simile a quella di alcuni solfuri minerali. Le ferredossine, piccole proteine che trasportano elettroni in quasi tutti gli organismi, ne sono l'esempio più semplice.

L'ipotesi ha anche punti deboli. Il monossido di carbonio è scarso nei fluidi idrotermali, le rese delle reazioni sono basse, e un tentativo di ridurre il diossido di carbonio ad amminoacidi e basi azotate con il sistema solfuro di ferro e acido solfidrico, compiuto nel 1995 dal gruppo di Stanley Miller, diede risultato negativo. Il ciclo autocatalitico immaginato da Wächtershäuser, un ciclo di Krebs percorso al contrario che fissa il carbonio anziché liberarlo, richiede passaggi che senza enzimi non sono mai stati osservati tutti insieme. L'idea che i minerali di ferro e zolfo abbiano catalizzato le prime reazioni del metabolismo è rimasta, ed è passata a un'ipotesi che sfrutta un'altra risorsa dei camini.

## Gradienti naturali di protoni {#gradienti}

Nel 1961 il biochimico inglese Peter Mitchell propose la **teoria chemiosmotica**, che gli valse il premio Nobel nel 1978. La catena di trasporto degli elettroni dei mitocondri e dei batteri usa l'energia delle ossidoriduzioni per pompare protoni attraverso una membrana, e il ritorno dei protoni attraverso un enzima, l'ATP sintasi, produce l'ATP. L'energia passa quindi per uno stadio intermedio, un gradiente di concentrazione e di carica attraverso la membrana. Il meccanismo è universale: lo usano i batteri, gli archei e gli eucarioti, e l'ATP sintasi è una delle proteine più conservate di tutta la biologia. È quindi probabile che l'ultimo antenato comune di tutti i viventi la possedesse già.

Questa universalità pone un problema. Le pompe che generano il gradiente sono macchine molecolari complesse, prodotte da molti geni. Come poteva un organismo primitivo, privo di quelle macchine, sfruttare un gradiente di protoni? Michael Russell e collaboratori, a partire dalla fine degli anni Ottanta, e poi William Martin e Nick Lane hanno proposto una risposta: i primi gradienti erano naturali, già pronti nei camini alcalini. Le sottili pareti minerali dei pori separano il fluido del camino, con pH attorno a $10$, dall'oceano primitivo, con pH attorno a $6{,}5$ (figura 5). La differenza ha lo stesso verso di quella delle cellule moderne, che sono più acide all'esterno che all'interno.

::: figura gradiente
{"w":730,"h":265,"items":[{"t":"text","p":[170,22],"s":"parete di un camino alcalino","c":"ax","size":12},{"t":"rect","p":[160,40,22,190],"c":"force4","r":2},{"t":"poly","pts":[[160,40],[182,40],[182,230],[160,230]],"close":true,"c":"force4","w":1.4},{"t":"text","p":[171,248],"s":"FeS, NiS","c":"force4","size":11},{"t":"text","p":[80,66],"s":"fluido del camino","c":"force3","size":11},{"t":"text","p":[80,82],"s":"pH ≈ 10","c":"force3","size":11},{"t":"text","p":[262,66],"s":"oceano primitivo","c":"force2","size":11},{"t":"text","p":[262,82],"s":"pH ≈ 6,5","c":"force2","size":11},{"t":"text","p":[80,130],"s":"H₂ → 2H⁺ + 2e⁻","c":"force3","size":11},{"t":"text","p":[262,130],"s":"CO₂ + 2H⁺ + 2e⁻","c":"force2","size":11},{"t":"text","p":[262,146],"s":"→ HCOOH","c":"force2","size":11},{"t":"arrow","p":[120,170,226,170],"c":"force","w":2,"head":9},{"t":"text","p":[132,162],"s":"e⁻","c":"force","size":11},{"t":"arrow","p":[226,206,120,206],"c":"force2","w":2,"head":9},{"t":"text","p":[244,210],"s":"H⁺","c":"force2","size":11,"a":"start"},{"t":"line","p":[360,20,360,250],"c":"muted","w":1,"dash":true},{"t":"text","p":[545,22],"s":"membrana di una cellula","c":"ax","size":12},{"t":"rect","p":[530,40,30,190],"c":"force4","r":2},{"t":"poly","pts":[[530,40],[560,40],[560,230],[530,230]],"close":true,"c":"force4","w":1.4},{"t":"text","p":[545,248],"s":"membrana","c":"force4","size":11},{"t":"text","p":[445,66],"s":"esterno","c":"force2","size":11},{"t":"text","p":[445,82],"s":"molti H⁺","c":"force2","size":11},{"t":"text","p":[645,66],"s":"citoplasma","c":"force3","size":11},{"t":"text","p":[645,82],"s":"pochi H⁺","c":"force3","size":11},{"t":"rect","p":[530,150,30,40],"c":"body","r":4},{"t":"poly","pts":[[530,150],[560,150],[560,190],[530,190]],"close":true,"c":"force","w":1.6},{"t":"arrow","p":[470,170,612,170],"c":"force2","w":2,"head":9},{"t":"text","p":[450,174],"s":"H⁺","c":"force2","size":11,"a":"end"},{"t":"text","p":[570,144],"s":"ATP sintasi","c":"force","size":11,"a":"start"},{"t":"text","p":[645,206],"s":"ADP + Pᵢ → ATP","c":"force","size":11},{"t":"arrow","p":[612,110,470,110],"c":"force4","w":1.4,"head":8},{"t":"text","p":[450,114],"s":"pompe","c":"force4","size":11,"a":"end"}]}
---
A sinistra, la parete di un poro di un camino alcalino: separa il fluido basico e ricco di idrogeno dall'oceano acido e ricco di diossido di carbonio. Gli elettroni dell'idrogeno potrebbero attraversare la parete di solfuri, buoni conduttori, e ridurre il diossido di carbonio dall'altra parte. A destra, la membrana di una cellula moderna: le pompe portano protoni all'esterno e il loro ritorno attraverso l'ATP sintasi produce ATP.
:::

L'energia di un gradiente di protoni si calcola come quella di qualsiasi differenza di concentrazione. Una mole di protoni che passa da una soluzione a $\mathrm{pH}_1$ a una a $\mathrm{pH}_2$ più alto, senza differenza di potenziale elettrico, libera

$$\Delta G=-RT\ln10\,(\mathrm{pH}_2-\mathrm{pH}_1),$$

cioè $5{,}71\un{kJ/mol}$ per ogni unità di pH a $25\,^\circ\mathrm C$. Fra pH $6{,}5$ e pH $10$ si ottengono circa $20\un{kJ/mol}$, proprio l'ordine di grandezza dell'energia minima che una cellula riesce a usare. In elettrochimica si preferisce esprimere il gradiente come una tensione, la **forza protonmotrice**: ogni unità di pH equivale a circa $59\un{mV}$ a $25\,^\circ\mathrm C$, e le membrane delle cellule moderne mantengono forze protonmotrici di circa $150$–$200\un{mV}$, sommando un gradiente di pH e una differenza di potenziale elettrico.

Il gradiente dei camini avrebbe avuto un secondo effetto, più sottile. Il potenziale di riduzione della coppia $\mathrm{H^+/H_2}$ scende di circa $59\un{mV}$ per ogni unità di pH: a pH alto l'idrogeno è un riducente più forte. A pH $7$ il potenziale della coppia fra diossido di carbonio e formiato è circa $-0{,}43\un{V}$, quasi uguale a quello dell'idrogeno, $-0{,}41\un{V}$, e per questo a pH neutro l'idrogeno riduce a fatica il diossido di carbonio. Nel fluido a pH $10$ il potenziale dell'idrogeno scende a circa $-0{,}59\un{V}$. Se gli elettroni dell'idrogeno potessero attraversare una parete conduttrice, come quelle di solfuri di ferro e di nichel, e ridurre il diossido di carbonio dalla parte acida, la reazione diventerebbe favorevole. Nel 2020 il gruppo di Nick Lane ha costruito un piccolo reattore a microcanali in cui due fluidi a pH diverso scorrono separati da un sottile precipitato di solfuri di ferro, e ha osservato la riduzione del diossido di carbonio a formiato, che non avveniva in assenza del gradiente.

## La via dell'acetil-CoA e l'ultimo antenato comune {#acetilcoa}

Si conoscono almeno sei vie biologiche per fissare il diossido di carbonio. La più nota, il ciclo di Calvin delle piante, consuma molto ATP. Una sola, la **via dell'acetil-CoA**, detta anche di Wood e Ljungdahl dai biochimici che la descrissero, è nel complesso esoergonica quando usa l'idrogeno come riducente: fissa il carbonio e insieme fornisce energia. È lineare e breve; i suoi enzimi contengono ferro, nichel, cobalto e molibdeno o tungsteno; e la usano sia batteri, gli acetogeni, sia archei, i metanogeni. Per tutte queste ragioni molti biochimici la considerano la via più antica.

La via ha due rami (figura 6). Nel ramo del metile una molecola di diossido di carbonio viene ridotta, passo dopo passo, a formiato e poi a un gruppo metile legato a un cofattore. Nel ramo del carbonile un'altra molecola viene ridotta a monossido di carbonio da un enzima con nichel e ferro. Un secondo enzima con nichel unisce metile, monossido di carbonio e coenzima A nell'acetil-CoA, da cui la cellula ricava acetato e ATP, nel caso degli acetogeni, o piruvato, il punto di partenza per costruire zuccheri e amminoacidi. La reazione complessiva degli acetogeni,

$$\begin{aligned}&4\,\mathrm{H_2}+2\,\mathrm{CO_2}\\&\longrightarrow\mathrm{CH_3COO^-}+\mathrm{H^+}+2\,\mathrm{H_2O},\end{aligned}$$

ha $\Delta G^{\circ\prime}\simeq-95\un{kJ/mol}$, meno della metanogenesi. Gli acetogeni hanno quindi bisogno di più idrogeno dei metanogeni, e dove i due gruppi competono vincono di solito i metanogeni.

::: figura acetilcoa
{"w":730,"h":265,"items":[{"t":"rect","p":[20,30,120,40],"c":"body","r":4},{"t":"poly","pts":[[20,30],[140,30],[140,70],[20,70]],"close":true,"c":"force2","w":1.6},{"t":"text","p":[80.0,54.0],"s":"CO₂","c":"force2","size":11},{"t":"rect","p":[20,150,120,40],"c":"body","r":4},{"t":"poly","pts":[[20,150],[140,150],[140,190],[20,190]],"close":true,"c":"force2","w":1.6},{"t":"text","p":[80.0,174.0],"s":"CO₂","c":"force2","size":11},{"t":"rect","p":[200,30,160,40],"c":"body","r":4},{"t":"poly","pts":[[200,30],[360,30],[360,70],[200,70]],"close":true,"c":"force3","w":1.6},{"t":"text","p":[280.0,54.0],"s":"formiato → metile","c":"force3","size":11},{"t":"rect","p":[200,150,160,40],"c":"body","r":4},{"t":"poly","pts":[[200,150],[360,150],[360,190],[200,190]],"close":true,"c":"force3","w":1.6},{"t":"text","p":[280.0,174.0],"s":"monossido di carbonio","c":"force3","size":11},{"t":"arrow","p":[142,50,198,50],"c":"ax","w":1.6,"head":8},{"t":"arrow","p":[142,170,198,170],"c":"ax","w":1.6,"head":8},{"t":"text","p":[280,22],"s":"ramo del metile","c":"muted","size":11},{"t":"text","p":[280,208],"s":"ramo del carbonile","c":"muted","size":11},{"t":"rect","p":[420,90,150,40],"c":"body","r":4},{"t":"poly","pts":[[420,90],[570,90],[570,130],[420,130]],"close":true,"c":"force","w":1.6},{"t":"text","p":[495.0,114.0],"s":"acetil-CoA","c":"force","size":11},{"t":"arrow","p":[362,56,430,92],"c":"ax","w":1.6,"head":8},{"t":"arrow","p":[362,164,430,128],"c":"ax","w":1.6,"head":8},{"t":"rect","p":[600,30,110,40],"c":"body","r":4},{"t":"poly","pts":[[600,30],[710,30],[710,70],[600,70]],"close":true,"c":"force4","w":1.6},{"t":"text","p":[655.0,54.0],"s":"acetato + ATP","c":"force4","size":11},{"t":"rect","p":[600,150,110,40],"c":"body","r":4},{"t":"poly","pts":[[600,150],[710,150],[710,190],[600,190]],"close":true,"c":"force4","w":1.6},{"t":"text","p":[655.0,174.0],"s":"piruvato","c":"force4","size":11},{"t":"arrow","p":[572,100,598,60],"c":"ax","w":1.6,"head":8},{"t":"arrow","p":[572,120,598,160],"c":"ax","w":1.6,"head":8},{"t":"text","p":[655,212],"s":"verso zuccheri","c":"muted","size":10},{"t":"text","p":[655,224],"s":"e amminoacidi","c":"muted","size":10},{"t":"text","p":[365,252],"s":"elettroni da H₂; catalizzatori con Fe, Ni, Co, Mo o W","c":"force","size":11}]}
---
La via dell'acetil-CoA, semplificata. Due molecole di diossido di carbonio seguono due rami, uno che le riduce a un gruppo metile e uno a monossido di carbonio; gli elettroni vengono dall'idrogeno, e i catalizzatori contengono metalli di transizione. L'acetil-CoA che ne risulta fornisce acetato e ATP oppure piruvato, da cui partono le altre vie di sintesi.
:::

Nel 2016 il gruppo di William Martin a Düsseldorf ha cercato nei genomi di batteri e archei le famiglie di proteine che, per la forma dei loro alberi genealogici, risalgono probabilmente all'ultimo antenato comune universale, chiamato **LUCA**. Fra circa $286\,000$ famiglie ne ha trovate $355$. Le loro funzioni descrivono un organismo anaerobico, che fissava il diossido di carbonio con la via dell'acetil-CoA, dipendeva dall'idrogeno, usava molti enzimi con ferro, zolfo e nichel, e viveva probabilmente ad alta temperatura: un abitante plausibile di un camino idrotermale. Il metodo e le conclusioni sono discussi, e il capitolo [L'albero universale e LUCA](unit:biology-15) presenta le stime più recenti.

Gli esperimenti sui minerali hanno avvicinato chimica e biologia. Nel 2018 il gruppo di Joseph Moran a Strasburgo ha mostrato che ferro, nichel e cobalto metallici riducono il diossido di carbonio ad acetato e piruvato in acqua, a concentrazioni vicine al millimolare, e nel 2020 Martina Preiner e collaboratori hanno ottenuto formiato, acetato e piruvato da idrogeno e diossido di carbonio in una notte a $100\,^\circ\mathrm C$, con tre minerali presenti nei camini alcalini: la greigite $\mathrm{Fe_3S_4}$, la magnetite $\mathrm{Fe_3O_4}$ e l'awaruite $\mathrm{Ni_3Fe}$. Senza alcun enzima, i minerali riproducono i prodotti principali della via dell'acetil-CoA. Lo stesso gruppo di Strasburgo, nel 2019, ha mostrato che gli ioni di ferro favoriscono una rete di reazioni fra acido gliossilico e acido piruvico che produce molti degli intermedi del ciclo di Krebs, il ciclo centrale del metabolismo delle cellule che respirano.

## Zuppa o camino? {#confronto}

L'origine idrotermale della vita ha sostenitori convinti e critici altrettanto convinti, e il confronto con la zuppa prebiotica del capitolo [Miller-Urey e la sintesi prebiotica](unit:biology-07) mette in luce i punti deboli di entrambe le ipotesi.

Il problema principale dei camini è l'acqua. I legami che uniscono gli amminoacidi nelle proteine e i nucleotidi negli acidi nucleici si formano con la perdita di una molecola d'acqua, e in acqua tendono a idrolizzarsi; alle temperature dei fluidi idrotermali l'idrolisi è più rapida, e l'RNA in particolare si degrada in fretta. Nei fondali mancano i cicli di asciutto e bagnato che concentrano i monomeri e favoriscono la loro unione, e manca la luce ultravioletta che alimenta la chimica cianosolfidica. I sostenitori rispondono che i pori dei camini concentrano le molecole: un gradiente di temperatura attraverso una fessura sottile spinge le molecole cariche verso la parte fredda, per un effetto chiamato termoforesi, e nel 2007 un gruppo di Monaco ha mostrato in laboratorio che pori con gradienti termici accumulano i nucleotidi e i piccoli acidi nucleici di molti ordini di grandezza.

Il problema principale della zuppa è l'energia. Un oceano o una pozza che ricevono molecole già fatte non offrono una sorgente continua di energia chimica per farle reagire, e la vita, come mostra la teoria chemiosmotica, sembra costruita attorno a gradienti e a ossidoriduzioni più che attorno al consumo di molecole organiche preesistenti. Un'ipotesi intermedia, sostenuta da Bruce Damer e David Deamer, colloca l'origine della vita nelle sorgenti idrotermali sulla terraferma, pozze calde vulcaniche simili a quelle di Yellowstone o dell'Islanda, dove i cicli di asciutto e bagnato e l'energia geotermica coesistono, e dove le membrane di lipidi si formano facilmente.

Le ipotesi non si escludono del tutto. Le diverse tappe dell'origine della vita, la sintesi dei mattoni, il loro accumulo, la formazione di polimeri e di membrane, la nascita di un metabolismo e di un sistema genetico, potrebbero essere avvenute in ambienti diversi, collegati dalla circolazione dell'acqua e dalla geologia di un pianeta attivo. Le membrane e le protocellule sono il tema del capitolo [Membrane e protocellule](unit:biology-03); i polimeri capaci di copiarsi, del capitolo [Il mondo a RNA](unit:biology-10).

## Camini su altri mondi {#altri-mondi}

L'interesse astrobiologico per le sorgenti idrotermali nasce da una considerazione semplice. Dovunque un oceano liquido sia a contatto con rocce ricche di olivina, la serpentinizzazione produce idrogeno e alcalinità, e il diossido di carbonio può diventare cibo per metanogeni. Non servono né la luce di una stella né un'atmosfera.

Nell'ottobre del 2015 la sonda Cassini attraversò a bassa quota i pennacchi di vapore e ghiaccio che escono dalle fratture del polo sud di Encelado, il piccolo satellite di Saturno che nasconde un oceano sotto la crosta di ghiaccio. Lo spettrometro di massa misurò nel gas dei pennacchi idrogeno molecolare, fra lo $0{,}4$ e l'$1{,}4\%$ in volume, insieme a diossido di carbonio, fra lo $0{,}3$ e lo $0{,}8\%$. Hunter Waite e collaboratori conclusero nel 2017 che l'idrogeno viene probabilmente da reazioni fra l'acqua e le rocce del nucleo, e che nell'oceano la metanogenesi libererebbe fra $50$ e $120\un{kJ}$ per mole di metano, per pH dell'oceano compresi fra $9$ e $11$: da due volte e mezza a sei volte l'energia minima che un metanogeno terrestre riesce a usare. Due anni prima l'analisi di minuscoli granuli di silice raccolti da Cassini nell'anello E di Saturno, alimentato dai pennacchi, aveva indicato reazioni fra acqua e roccia a temperature di almeno $90\,^\circ\mathrm C$. I dettagli sono nel capitolo [Encelado e i suoi pennacchi](unit:biology-29).

Anche sotto il ghiaccio di Europa, il satellite di Giove, si trova un oceano a contatto con un fondale roccioso, e i modelli prevedono che la serpentinizzazione vi produca idrogeno. La sonda Europa Clipper, partita nell'ottobre del 2024, studierà la crosta e l'oceano di Europa a partire dal 2030; il capitolo [Europa e gli oceani sotto il ghiaccio](unit:biology-28) ne descrive gli obiettivi. Energia chimica disponibile e abitabilità sono cose diverse dalla presenza di vita: un oceano può offrire tutto ciò che serve a un metanogeno e restare sterile, se la vita non vi è mai cominciata. Per questo le misure della chimica di questi oceani vanno lette come stime di abitabilità, e la ricerca di tracce di vita richiede indicatori diversi, discussi nel capitolo [Biofirme e falsi positivi](unit:biology-33).

## Un'esperienza: il giardino chimico {#esperienza}

Un esperimento classico della chimica scolastica riproduce in un barattolo la crescita dei camini e la formazione di pareti minerali che separano due soluzioni di pH diverso. I cristalli di un sale metallico immersi in una soluzione di silicato di sodio si ricoprono di una membrana di silicato e di idrossido del metallo; l'acqua entra per osmosi, la membrana si rompe, e il getto di soluzione acida che ne esce precipita a contatto con il silicato, costruendo un tubo che cresce verso l'alto. È il cosiddetto **giardino chimico**, studiato da oltre tre secoli e oggi usato come modello di laboratorio dei camini idrotermali.

::: metodo Tubi di minerale in un barattolo
**Materiale.** Silicato di sodio in soluzione, detto anche vetro solubile, reperibile in ferramenta o nei negozi di prodotti chimici; acqua del rubinetto; alcuni cristalli di cloruro di calcio, venduto come sale assorbiumidità, e di solfato di ferro, venduto come concime per prati; un barattolo di vetro trasparente; pinzette di plastica; cartine indicatrici del pH; guanti e occhiali protettivi.

**Procedura.** Nel barattolo diluire una parte di silicato di sodio con tre parti d'acqua, mescolare e lasciar riposare finché la soluzione è limpida. Con le pinzette far cadere sul fondo alcuni cristalli di ciascun sale, distanziati fra loro, poi lasciare il barattolo fermo. Osservare per un'ora, fotografando ogni dieci minuti, e poi di nuovo dopo un giorno.

**Analisi.** Descrivere la forma, il colore e la velocità di crescita dei tubi dei due sali. Con una cannuccia prelevare con cautela una goccia della soluzione vicino a un tubo e una goccia lontano, e misurarne il pH con le cartine. Spiegare perché la soluzione esterna è fortemente basica e perché il liquido dentro i tubi, che contiene il sale metallico, è più acido. Confrontare con un camino alcalino, in cui il fluido basico è all'interno e l'acqua di mare all'esterno.

**Sicurezza.** Il silicato di sodio è fortemente basico e irrita la pelle e gli occhi: usare guanti e occhiali, e lavare subito con molta acqua in caso di contatto. Il solfato di ferro è nocivo se ingerito. Svolgere l'esperienza con la supervisione di un insegnante o di un adulto, e smaltire le soluzioni secondo le indicazioni delle etichette.
:::

I tubi di un giardino chimico sono fatti di silicati e idrossidi di metalli, e le loro pareti sono porose e cariche. Nel 2015 Laura Barge e un gruppo internazionale hanno raccolto in una rassegna i risultati di questi sistemi, che chiamano chemiobrionica: nelle versioni con solfuri e idrossidi di ferro le pareti mantengono differenze di pH e di potenziale elettrico fra le due soluzioni e possono generare piccole correnti elettriche. Sono sistemi utili per verificare in laboratorio le ipotesi sui camini alcalini.

## Errori frequenti {#errori}

::: errore Pensare che tutte le sorgenti idrotermali siano calde come le fumarole nere
Le fumarole nere superano i $350\,^\circ\mathrm C$, ma i camini alcalini come Lost City emettono fluidi fra meno di $40$ e circa $90\,^\circ\mathrm C$. Sono questi ultimi, tiepidi, basici e ricchi di idrogeno, i principali candidati come ambienti dell'origine della vita.
:::

::: errore Giudicare una reazione dal solo valore standard
La metanogenesi ha $\Delta G^\circ\simeq-131\un{kJ/mol}$, eppure, con metano e diossido di carbonio alla stessa pressione e $2\times10^{-6}\un{bar}$ di idrogeno, smette di fornire energia. Conta $\Delta G=\Delta G^\circ+RT\ln Q$, che dipende dalla quarta potenza della pressione di idrogeno.
:::

::: errore Credere che più calore significhi sempre più energia per la vita
Il calore accelera le reazioni; per le sintesi che diminuiscono l'entropia, come la metanogenesi, rende però meno negativo $\Delta G$ e decompone le molecole organiche. Nelle stesse condizioni, a $100\,^\circ\mathrm C$ e con $10^{-4}\un{bar}$ di idrogeno, la metanogenesi è già sfavorevole.
:::

::: errore Considerare la chemiosintesi moderna indipendente dal Sole
I batteri dei vermi tubicoli ossidano l'acido solfidrico con l'ossigeno, prodotto dalla fotosintesi in superficie. Solo i metabolismi senza ossigeno, come la metanogenesi e l'acetogenesi, possono funzionare in un mondo privo di luce.
:::

::: errore Pensare che un gradiente di pH fornisca energia da solo
Un gradiente si disperde in calore se i protoni attraversano la parete senza un meccanismo che li accoppi a una reazione. Nelle cellule l'accoppiamento è l'ATP sintasi; nei camini si ipotizza una parete conduttrice che trasferisce elettroni fra due ambienti a pH diverso.
:::

## Sintesi {#sintesi}

::: sintesi In breve
- Le sorgenti idrotermali sottomarine, scoperte nel 1977, ospitano ecosistemi basati sulla chemiosintesi. Le fumarole nere emettono fluidi acidi a $350$–$400\,^\circ\mathrm C$ ricchi di metalli e di solfuri; i camini alcalini come Lost City fluidi a $40$–$90\,^\circ\mathrm C$, con pH fra $9$ e $11$, ricchi di idrogeno e di metano.
- La serpentinizzazione dell'olivina produce serpentino, brucite, magnetite e idrogeno; nella reazione della fayalite tre moli di silicato di ferro producono due moli di idrogeno.
- I chemioautotrofi ricavano energia da ossidoriduzioni fra sostanze inorganiche; senza ossigeno l'accettore può essere il diossido di carbonio, come nella metanogenesi e nell'acetogenesi.
- La metanogenesi ha $\Delta G^\circ\simeq-130{,}6\un{kJ/mol}$ a $25\,^\circ\mathrm C$; con $Q=p_\mathrm{CH_4}/(p_\mathrm{CO_2}p_\mathrm{H_2}^4)$ ogni fattore dieci in meno di idrogeno aumenta $\Delta G$ di circa $22{,}8\un{kJ/mol}$. Una cellula usa reazioni che liberano almeno $10$–$20\un{kJ/mol}$.
- La metanogenesi diminuisce l'entropia, e la temperatura la rende meno favorevole: con poco idrogeno smette di fornire energia già sotto i $100\,^\circ\mathrm C$.
- L'ipotesi del mondo a ferro e zolfo colloca i primi metabolismi sulle superfici dei solfuri; l'ipotesi dei camini alcalini sfrutta i gradienti naturali di pH, che valgono $5{,}71\un{kJ/mol}$ per unità di pH a $25\,^\circ\mathrm C$, come quelli che le cellule usano per produrre l'ATP.
- La via dell'acetil-CoA fissa il diossido di carbonio con l'idrogeno liberando energia; minerali di ferro e nichel ne riproducono i prodotti senza enzimi, e le proteine attribuite a LUCA suggeriscono un antenato anaerobico che dipendeva dall'idrogeno.
- L'idrolisi e la diluizione restano i problemi principali dell'origine idrotermale; l'idrogeno nei pennacchi di Encelado mostra che oceani simili esistono anche altrove.
:::

## Glossario {#glossario}

- **Accettore di elettroni**: sostanza che si riduce in una reazione che fornisce energia, come l'ossigeno o il diossido di carbonio.
- **Acetogenesi**: produzione di acido acetico da idrogeno e diossido di carbonio da parte di alcuni batteri.
- **Camino alcalino**: sorgente idrotermale alimentata dalla serpentinizzazione, con fluidi tiepidi, basici e ricchi di idrogeno.
- **Chemioautotrofo**: organismo che ricava energia da reazioni fra sostanze inorganiche e carbonio dal diossido di carbonio.
- **Cluster ferro-zolfo**: gruppo di atomi di ferro e di zolfo legato a una proteina, che trasferisce elettroni o catalizza reazioni.
- **Donatore di elettroni**: sostanza che si ossida in una reazione che fornisce energia, come l'idrogeno o l'acido solfidrico.
- **Forza protonmotrice**: energia di un gradiente di protoni attraverso una membrana, espressa come tensione.
- **Fumarola nera**: sorgente idrotermale alimentata dal magma, con fluidi acidi a centinaia di gradi che depositano solfuri metallici.
- **LUCA**: ultimo antenato comune universale di tutti i viventi attuali.
- **Metanogenesi**: produzione di metano da parte di alcuni archei, per esempio dalla riduzione del diossido di carbonio con l'idrogeno.
- **Peridotite**: roccia del mantello terrestre composta soprattutto di olivina.
- **Serpentinizzazione**: trasformazione dell'olivina in serpentino a contatto con l'acqua, che libera idrogeno e rende il fluido basico.
- **Sintrofia**: collaborazione metabolica in cui un organismo rende possibile la reazione di un altro consumandone un prodotto.
- **Teoria chemiosmotica**: spiegazione della sintesi dell'ATP mediante un gradiente di protoni attraverso una membrana.
- **Termoforesi**: movimento delle molecole disciolte causato da un gradiente di temperatura.
- **Via dell'acetil-CoA**: via di fissazione del carbonio che produce acetil-coenzima A da diossido di carbonio e idrogeno.

## Esercizi {#esercizi}

::: esercizio Due sorgenti a confronto [base]
Una sorgente emette un fluido a $70\,^\circ\mathrm C$ con pH $10$, ricco di idrogeno e povero di metalli, e costruisce camini bianchi; un'altra emette un fluido a $360\,^\circ\mathrm C$ con pH $3$ che diventa nero a contatto con l'acqua. Classificare le due sorgenti e indicare per ciascuna la sorgente di calore e la reazione che ne determina la chimica.
>>> soluzione
La prima è un camino alcalino: il calore viene in buona parte dalle reazioni stesse e dalle rocce del mantello, e la chimica è dominata dalla serpentinizzazione dell'olivina, che produce idrogeno e alcalinità; i camini sono di carbonato di calcio. La seconda è una fumarola nera: il calore viene dal magma, il fluido acido ha sciolto metalli dal basalto, e il nero è dovuto ai solfuri metallici che precipitano quando il fluido si raffredda.
:::

::: esercizio La pressione sul fondale [base]
Calcolare la pressione a $2000\un{m}$ di profondità in acqua di mare di densità $1025\un{kg/m^3}$, aggiungendo la pressione atmosferica. Sapendo che a $200\un{bar}$ l'acqua pura bolle a circa $366\,^\circ\mathrm C$, dire se un fluido a $350\,^\circ\mathrm C$ bolle uscendo dal fondale.
>>> soluzione
La pressione idrostatica è

$$\begin{aligned}\rho gh&=1025\cdot9{,}81\cdot2000\un{Pa}\\&\simeq2{,}01\times10^7\un{Pa};\end{aligned}$$

aggiungendo $1{,}0\times10^5\un{Pa}$ si ottengono circa $2{,}02\times10^7\un{Pa}$, cioè circa $202\un{bar}$. Il fluido a $350\,^\circ\mathrm C$ è sotto la temperatura di ebollizione a quella pressione, e resta liquido.
:::

::: esercizio Gli elettroni della serpentinizzazione [base]
Verificare che la reazione

$$\begin{aligned}&3\,\mathrm{Fe_2SiO_4}+2\,\mathrm{H_2O}\\&\longrightarrow2\,\mathrm{Fe_3O_4}+3\,\mathrm{SiO_2}+2\,\mathrm{H_2}\end{aligned}$$

è bilanciata negli atomi e negli elettroni. Nella magnetite due atomi di ferro su tre hanno numero di ossidazione $+3$.
>>> soluzione
Atomi: ferro $6=6$, silicio $3=3$, ossigeno $12+2=8+6$, idrogeno $4=4$. Elettroni: nella fayalite i sei atomi di ferro sono $\mathrm{Fe^{2+}}$; nelle due unità di magnetite quattro diventano $\mathrm{Fe^{3+}}$ e due restano $\mathrm{Fe^{2+}}$. Il ferro cede quindi quattro elettroni, che riducono quattro ioni idrogeno dell'acqua a due molecole di $\mathrm{H_2}$.
:::

::: esercizio Chi dà e chi riceve [base]
Indicare il donatore e l'accettore di elettroni nelle reazioni seguenti:

$$\begin{aligned}&\mathrm{H_2S}+2\,\mathrm{O_2}\longrightarrow\mathrm{SO_4^{2-}}+2\,\mathrm{H^+},\\&\mathrm{CO_2}+4\,\mathrm{H_2}\longrightarrow\mathrm{CH_4}+2\,\mathrm{H_2O},\\&4\,\mathrm{Fe^{2+}}+\mathrm{O_2}+4\,\mathrm{H^+}\\&\quad\longrightarrow4\,\mathrm{Fe^{3+}}+2\,\mathrm{H_2O}.\end{aligned}$$

Quale delle tre può avvenire in un mondo senza ossigeno?
>>> soluzione
Nella prima il donatore è l'acido solfidrico, il cui zolfo passa da $-2$ a $+6$, e l'accettore è l'ossigeno. Nella seconda il donatore è l'idrogeno e l'accettore il diossido di carbonio, il cui carbonio passa da $+4$ a $-4$. Nella terza il donatore è il ferro ferroso e l'accettore l'ossigeno. Solo la seconda, la metanogenesi, può avvenire senza ossigeno.
:::

::: esercizio Un fattore dieci di idrogeno [base]
Calcolare $RT\ln10$ a $25\,^\circ\mathrm C$ e di quanto cambia l'energia di Gibbs della metanogenesi se la pressione di idrogeno diminuisce di dieci volte, a parità delle altre pressioni.
>>> soluzione
Il fattore vale

$$\begin{aligned}RT\ln10&=8{,}314\cdot298{,}15\cdot2{,}303\un{J/mol}\\&\simeq5{,}71\un{kJ/mol}.\end{aligned}$$

L'idrogeno compare alla quarta potenza al denominatore di $Q$, e $\Delta G$ aumenta di $4\cdot5{,}71\simeq22{,}8\un{kJ/mol}$, diventando meno negativo.
:::

::: esercizio L'energia di un gradiente [base]
Fra due soluzioni c'è una differenza di tre unità di pH, senza differenza di potenziale elettrico. Quanta energia libera una mole di protoni che passa dal lato acido a quello basico a $25\,^\circ\mathrm C$? A quale tensione corrisponde?
>>> soluzione
Si liberano $3\cdot5{,}71\simeq17{,}1\un{kJ/mol}$. Divisa per la costante di Faraday, l'energia corrisponde a circa $0{,}18\un{V}$, cioè $59\un{mV}$ per unità di pH.
:::

::: esercizio Dalle entalpie e dalle entropie [medio]
Per la metanogenesi $\mathrm{CO_2}+4\,\mathrm{H_2}\longrightarrow\mathrm{CH_4}+2\,\mathrm{H_2O(l)}$ si usino i dati standard: $\Delta_fH^\circ$ in kJ/mol, $-393{,}5$ per $\mathrm{CO_2}$, $-74{,}8$ per $\mathrm{CH_4}$, $-285{,}8$ per l'acqua; $S^\circ$ in J/(mol·K), $213{,}7$ per $\mathrm{CO_2}$, $130{,}7$ per $\mathrm{H_2}$, $186{,}3$ per $\mathrm{CH_4}$, $69{,}9$ per l'acqua. Calcolare $\Delta H^\circ$, $\Delta S^\circ$ e $\Delta G^\circ$ a $25\,^\circ\mathrm C$.
>>> soluzione
L'entalpia di reazione è

$$\begin{aligned}\Delta H^\circ&=-74{,}8-571{,}6+393{,}5\\&=-252{,}9\un{kJ/mol},\end{aligned}$$

e l'entropia diminuisce:

$$\begin{aligned}\Delta S^\circ&=186{,}3+139{,}8-213{,}7-522{,}8\\&=-410{,}4\un{J/(mol\,K)}.\end{aligned}$$

Quindi

$$\begin{aligned}\Delta G^\circ&=-252{,}9+298{,}15\cdot0{,}4104\\&\simeq-130{,}5\un{kJ/mol},\end{aligned}$$

in accordo, entro gli arrotondamenti dei dati, con il valore $-130{,}6\un{kJ/mol}$ ottenuto dalle energie di Gibbs di formazione.
:::

::: esercizio La soglia dell'idrogeno [medio]
A $25\,^\circ\mathrm C$, per quale pressione di idrogeno la metanogenesi libera esattamente $20\un{kJ/mol}$, se metano e diossido di carbonio hanno la stessa pressione? E se il metano ha una pressione cento volte minore di quella del diossido di carbonio?
>>> soluzione
Nel primo caso

$$\begin{aligned}\log_{10}p_\mathrm{H_2}&=\frac{-130{,}6+20}{22{,}83}\\&\simeq-4{,}84,\end{aligned}$$

cioè circa $1{,}4\times10^{-5}\un{bar}$. Nel secondo il termine del rapporto vale $5{,}71\cdot(-2)=-11{,}4\un{kJ/mol}$, e

$$\begin{aligned}\log_{10}p_\mathrm{H_2}&=\frac{-130{,}6-11{,}4+20}{22{,}83}\\&\simeq-5{,}34,\end{aligned}$$

cioè circa $4{,}5\times10^{-6}\un{bar}$: togliere il prodotto abbassa la soglia.
:::

::: esercizio Idrogeno disciolto [medio]
Un fluido contiene $1{,}5\un{mmol}$ di idrogeno per litro. Usando la legge di Henry con $0{,}78\un{mmol/(L\,bar)}$, trovare la pressione di idrogeno equivalente e l'energia di Gibbs della metanogenesi a $25\,^\circ\mathrm C$, con metano e diossido di carbonio alla stessa pressione.
>>> soluzione
La pressione equivalente è $1{,}5/0{,}78\simeq1{,}9\un{bar}$, con $\log_{10}1{,}92\simeq0{,}28$. Allora

$$\begin{aligned}\Delta G&\simeq-130{,}6-22{,}83\cdot0{,}28\\&\simeq-137\un{kJ/mol}.\end{aligned}$$

Un fluido come quelli di Lost City offre ai metanogeni più energia delle condizioni standard. Il calcolo trascura la temperatura e la pressione reali del fluido, che cambiano sia la solubilità sia $\Delta G^\circ$.
:::

::: esercizio La pirite come sorgente di energia [medio]
Calcolare $\Delta G^\circ$ della reazione $\mathrm{FeS}+\mathrm{H_2S}\longrightarrow\mathrm{FeS_2}+\mathrm{H_2}$ con le energie di Gibbs di formazione $-100{,}4$, $-27{,}8$ e $-166{,}9\un{kJ/mol}$ per solfuro di ferro, acido solfidrico disciolto e pirite. Quanti grammi di idrogeno può produrre $1\un{kg}$ di solfuro di ferro?
>>> soluzione
L'energia di Gibbs di reazione è

$$\begin{aligned}\Delta G^\circ&=-166{,}9-(-100{,}4-27{,}8)\\&=-38{,}7\un{kJ/mol}.\end{aligned}$$

La massa molare del solfuro di ferro è $55{,}85+32{,}06=87{,}91\un{g/mol}$: un kilogrammo ne contiene $11{,}4\un{mol}$, che producono altrettante moli di idrogeno, cioè

$$11{,}4\cdot2{,}016\un{g}\simeq22{,}9\un{g}.$$
:::

::: esercizio Idrogeno da un sasso [medio]
Quanto idrogeno produce, secondo la reazione della fayalite, la serpentinizzazione completa di $1\un{kg}$ di fayalite, $\mathrm{Fe_2SiO_4}$? Esprimere il risultato in moli, in grammi e in litri a $0\,^\circ\mathrm C$ e $1\un{bar}$, dove una mole di gas occupa $22{,}7\un{L}$.
>>> soluzione
La massa molare della fayalite è

$$\begin{aligned}M&=2\cdot55{,}85+28{,}09+4\cdot16{,}00\\&\simeq203{,}8\un{g/mol},\end{aligned}$$

e un kilogrammo ne contiene $4{,}91\un{mol}$. Ogni tre moli di fayalite si formano due moli di idrogeno: $4{,}91\cdot2/3\simeq3{,}27\un{mol}$, cioè circa $6{,}6\un{g}$ e $3{,}27\cdot22{,}7\simeq74\un{L}$.
:::

::: esercizio Protoni per un ATP [medio]
Un gradiente fra pH $6{,}5$ e pH $10$ e, in alternativa, una forza protonmotrice di $180\un{mV}$: quanta energia fornisce una mole di protoni in ciascun caso, a $25\,^\circ\mathrm C$? Quanti protoni servono come minimo per sintetizzare una mole di ATP, se la sintesi richiede $50\un{kJ/mol}$?
>>> soluzione
Nel primo caso $3{,}5\cdot5{,}71\simeq20{,}0\un{kJ/mol}$; nel secondo $96\,485\cdot0{,}180\un{J/mol}\simeq17{,}4\un{kJ/mol}$. Servono rispettivamente $50/20{,}0=2{,}5$ e $50/17{,}4\simeq2{,}9$ moli di protoni, quindi almeno tre protoni per ogni ATP, in accordo con il funzionamento dell'ATP sintasi.
:::

::: esercizio La temperatura di inversione [avanzato]
Con $\Delta H^\circ=-253{,}0\un{kJ/mol}$ e $\Delta S^\circ=-410{,}4\un{J/(mol\,K)}$, supposti costanti, trovare la temperatura alla quale la metanogenesi smette di fornire energia con tutti i gas a $1\un{bar}$, e quella con $p_\mathrm{H_2}=10^{-2}\un{bar}$ e metano e diossido di carbonio alla stessa pressione.
>>> soluzione
Con i gas a $1\un{bar}$

$$T=\frac{\Delta H^\circ}{\Delta S^\circ}=\frac{253\,000}{410{,}4}\simeq616\un{K},$$

circa $343\,^\circ\mathrm C$. Con $p_\mathrm{H_2}=10^{-2}\un{bar}$ si aggiunge il termine $8RT\ln10$:

$$\begin{aligned}0&=\Delta H^\circ-T\,(\Delta S^\circ-8R\ln10),\\T&=\frac{253\,000}{410{,}4+153{,}2}\simeq449\un{K},\end{aligned}$$

circa $176\,^\circ\mathrm C$.
:::

::: esercizio Un metanogeno a cento gradi [avanzato]
A $100\,^\circ\mathrm C$, con i dati dell'esercizio precedente e metano e diossido di carbonio alla stessa pressione, calcolare $\Delta G$ della metanogenesi per $p_\mathrm{H_2}=10^{-4}\un{bar}$ e la pressione di idrogeno necessaria per ottenere $-20\un{kJ/mol}$. Confrontare con il valore a $25\,^\circ\mathrm C$, circa $1{,}4\times10^{-5}\un{bar}$.
>>> soluzione
A $373{,}15\un{K}$ si ha $\Delta G^\circ\simeq-99{,}9\un{kJ/mol}$ e $RT\ln10\simeq7{,}14\un{kJ/mol}$. Con $10^{-4}\un{bar}$:

$$\begin{aligned}\Delta G&\simeq-99{,}9+16\cdot7{,}14\\&\simeq+14{,}4\un{kJ/mol},\end{aligned}$$

e la reazione è sfavorevole. Per $-20\un{kJ/mol}$ serve

$$\begin{aligned}\log_{10}p_\mathrm{H_2}&=\frac{-99{,}9+20}{4\cdot7{,}14}\\&\simeq-2{,}79,\end{aligned}$$

cioè circa $1{,}6\times10^{-3}\un{bar}$, più di cento volte la soglia a $25\,^\circ\mathrm C$.
:::

::: esercizio Acetogeni contro metanogeni [avanzato]
L'acetogenesi

$$\begin{aligned}&4\,\mathrm{H_2}+2\,\mathrm{CO_2}\\&\longrightarrow\mathrm{CH_3COO^-}+\mathrm{H^+}+2\,\mathrm{H_2O}\end{aligned}$$

ha $\Delta G^{\circ\prime}\simeq-95\un{kJ/mol}$ a $25\,^\circ\mathrm C$. Tenendo le altre sostanze nello stato standard, calcolare $\Delta G$ per $p_\mathrm{H_2}=10^{-4}\un{bar}$ e la pressione di idrogeno alla quale l'acetogenesi libera $20\un{kJ/mol}$. Chi vince la competizione per l'idrogeno?
>>> soluzione
Anche qui l'idrogeno compare alla quarta potenza: $\Delta G\simeq-95+16\cdot5{,}71\simeq-3{,}7\un{kJ/mol}$, quasi nulla. La soglia è

$$\begin{aligned}\log_{10}p_\mathrm{H_2}&=\frac{-95+20}{22{,}83}\\&\simeq-3{,}28,\end{aligned}$$

cioè circa $5\times10^{-4}\un{bar}$, circa trentasei volte la soglia dei metanogeni. I metanogeni possono abbassare l'idrogeno sotto il livello utile agli acetogeni, e vincono la competizione.
:::

::: esercizio Il quoziente lavora per un altro [avanzato]
La fermentazione

$$\begin{aligned}&\mathrm{C_2H_5OH}+\mathrm{H_2O}\\&\longrightarrow\mathrm{CH_3COO^-}+\mathrm{H^+}+2\,\mathrm{H_2}\end{aligned}$$

ha $\Delta G^{\circ\prime}\simeq+9{,}6\un{kJ/mol}$. Calcolare $\Delta G$ a $25\,^\circ\mathrm C$ quando un metanogeno vicino mantiene $p_\mathrm{H_2}=10^{-4}\un{bar}$, con le altre sostanze nello stato standard, e spiegare il significato del risultato.
>>> soluzione
L'idrogeno è un prodotto e compare al quadrato al numeratore di $Q$:

$$\begin{aligned}\Delta G&\simeq9{,}6+2\cdot5{,}71\cdot(-4)\\&\simeq-36\un{kJ/mol}.\end{aligned}$$

Da sola la fermentazione è sfavorevole; con il metanogeno che consuma l'idrogeno libera abbastanza energia per sostenere il batterio che la compie. È una sintrofia: ciascuno dei due organismi vive grazie all'altro.
:::

## Fonti {#fonti}

Il testo, le figure, gli esempi e gli esercizi di questo capitolo sono originali. Per la scelta e l'ordine degli argomenti i riferimenti principali sono A. M. Shaw, *Astrochemistry: From Astronomy to Astrobiology*, Wiley, 2006, §8.7 (metabolismo di superficie), §8.8 (sorgenti geotermiche) e §9.4 (sorgenti di energia degli autotrofi), e J. R. Morris, D. L. Hartl, A. H. Knoll e collaboratori, *Biology: How Life Works*, 2ª edizione, Macmillan, 2016, Caso 1 (la prima cellula), §6.5 (metalli e catalisi prebiotica), §7.4–7.6 (ciclo di Krebs, catena di trasporto e gradiente di protoni, metabolismo anaerobico e prime cellule), §26.2 (chemioautotrofia e sorgenti idrotermali) e §26.5 (archei metanogeni e ipertermofili). Alcuni dati dei due manuali sono stati corretti con le fonti primarie: le prime sorgenti furono scoperte nel 1977, la magnetite ha formula $\mathrm{Fe_3O_4}$, e il ceppo di *Methanopyrus kandleri* cresciuto a $122\,^\circ\mathrm C$ proviene dalla dorsale indiana centrale.

1. J. B. Corliss e collaboratori, *Science* 203, 1073 (1979): le sorgenti delle Galápagos; F. N. Spiess e collaboratori, *Science* 207, 1421 (1980): le fumarole nere a $21^\circ$ nord.
2. C. M. Cavanaugh e collaboratori, *Science* 213, 340 (1981): i simbionti chemioautotrofi di *Riftia pachyptila*.
3. D. S. Kelley e collaboratori, *Nature* 412, 145 (2001) e *Science* 307, 1428 (2005): il campo idrotermale di Lost City.
4. K. Takai e collaboratori, *PNAS* 105, 10949 (2008): crescita a $122\,^\circ\mathrm C$ di *Methanopyrus kandleri*.
5. J. L. Bischoff, R. J. Rosenbauer, *Geochimica et Cosmochimica Acta* 52, 2121 (1988): punto critico dell'acqua di mare; temperatura di ebollizione dell'acqua dalle tabelle IAPWS-IF97.
6. J. Krissansen-Totton, G. N. Arney, D. C. Catling, *PNAS* 115, 4105 (2018): pH dell'oceano primitivo.
7. D. D. Wagman e collaboratori, *Journal of Physical and Chemical Reference Data* 11, suppl. 2 (1982): grandezze termodinamiche standard; R. Sander, *Atmospheric Chemistry and Physics* 15, 4399 (2015): costanti di Henry.
8. R. K. Thauer, K. Jungermann, K. Decker, *Bacteriological Reviews* 41, 100 (1977): energetica dei chemioautotrofi anaerobi, potenziali di riduzione, metanogenesi, acetogenesi e fermentazione dell'etanolo.
9. B. Schink, *Microbiology and Molecular Biology Reviews* 61, 262 (1997): energia minima e sintrofie; T. M. Hoehler e collaboratori, *FEMS Microbiology Ecology* 38, 33 (2001): energie minime osservate nei sedimenti.
10. D. R. Lovley, S. Goodwin, *Geochimica et Cosmochimica Acta* 52, 2993 (1988): concentrazioni di idrogeno nei sedimenti.
11. T. M. McCollom, E. L. Shock, *Geochimica et Cosmochimica Acta* 61, 4375 (1997): energia per i chemioautotrofi nelle zone di mescolamento.
12. G. Wächtershäuser, *Systematic and Applied Microbiology* 10, 207 (1988); E. Drobner e collaboratori, *Nature* 346, 742 (1990); C. Huber, G. Wächtershäuser, *Science* 276, 245 (1997): il mondo a ferro e zolfo.
13. A. G. Cairns-Smith, *Genetic Takeover and the Mineral Origins of Life*, Cambridge University Press, 1982.
14. A. D. Keefe, S. L. Miller, G. McDonald, J. Bada, *PNAS* 92, 11904 (1995): prova negativa della riduzione del diossido di carbonio con solfuro di ferro.
15. P. Mitchell, *Nature* 191, 144 (1961): la teoria chemiosmotica.
16. M. J. Russell, A. J. Hall, *Journal of the Geological Society* 154, 377 (1997); W. Martin, M. J. Russell, *Philosophical Transactions of the Royal Society B* 362, 1887 (2007); N. Lane, W. F. Martin, *Cell* 151, 1406 (2012): l'ipotesi dei camini alcalini e dei gradienti naturali.
17. R. Hudson e collaboratori, *PNAS* 117, 22873 (2020): riduzione del diossido di carbonio guidata da un gradiente di pH.
18. M. C. Weiss e collaboratori, *Nature Microbiology* 1, 16116 (2016): fisiologia e ambiente di LUCA.
19. S. J. Varma e collaboratori, *Nature Ecology & Evolution* 2, 1019 (2018); M. Preiner e collaboratori, *Nature Ecology & Evolution* 4, 534 (2020); K. B. Muchowska e collaboratori, *Nature* 569, 104 (2019): fissazione del carbonio e reti metaboliche su metalli e minerali.
20. P. Baaske e collaboratori, *PNAS* 104, 9346 (2007): accumulo di nucleotidi per termoforesi in pori.
21. B. Damer, D. Deamer, *Astrobiology* 20, 429 (2020): l'ipotesi delle sorgenti calde terrestri.
22. J. H. Waite e collaboratori, *Science* 356, 155 (2017): idrogeno nei pennacchi di Encelado; H.-W. Hsu e collaboratori, *Nature* 519, 207 (2015): attività idrotermale nel nucleo di Encelado.
23. L. M. Barge e collaboratori, *Chemical Reviews* 115, 8652 (2015): giardini chimici e chemiobrionica.
24. Costanti: $R$ e $F$ dai valori CODATA 2022.
