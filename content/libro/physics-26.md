---
unit: physics-26
titolo: Onde elettromagnetiche e pressione della luce
sottotitolo: La luce come onda di campi elettrici e magnetici, l'energia che trasporta, la legge dell'inverso del quadrato, la spinta che esercita sulla polvere, sulle comete e sulle vele solari, e la polarizzazione
volume: Volume di fisica
fonte: Testo originale; riferimento principale D. Halliday, R. Resnick, J. Walker, Fundamentals of Physics, 12ª ed., moduli 33.1-33.4
---

## Prima di cominciare {#apertura}

Nel 1619 Giovanni Keplero osservò che le code delle comete puntano sempre in direzione opposta al Sole e propose una spiegazione audace per l'epoca: la luce del Sole spinge la materia della cometa. Mancava ogni teoria della luce capace di giustificare l'idea, e per due secoli e mezzo la proposta restò un'intuizione. La giustificazione arrivò nel 1865, quando James Clerk Maxwell mostrò che le equazioni dell'elettricità e del magnetismo ammettono onde di campi elettrici e magnetici che si propagano nel vuoto alla velocità della luce. Un'onda di questo tipo trasporta energia e anche quantità di moto, e una superficie che la assorbe o la riflette riceve una spinta.

Questo capitolo apre la parte del volume dedicata all'astrofisica. Il tema è la luce come onda elettromagnetica: come è fatta, quanta energia trasporta, come questa energia si distribuisce con la distanza dalla sorgente e quale pressione esercita. Sono i fondamenti di tutto ciò che si sa delle stelle e delle galassie, perché quasi ogni informazione sul cosmo arriva sotto forma di radiazione elettromagnetica. Le stesse leggi spiegano perché la polvere più fine viene espulsa dal sistema solare, perché le comete hanno due code e come una vela di plastica sottile qualche micrometro può spingere una sonda senza consumare propellente.

Il capitolo [Induzione elettromagnetica](unit:physics-24) ha introdotto le equazioni di Maxwell e le onde elettromagnetiche in forma generale; qui si riprendono i risultati essenziali e si sviluppano le loro conseguenze quantitative. L'aspetto corpuscolare della luce, i fotoni, è trattato in [Fotoni ed energia quantizzata](unit:physics-25) e torna nei capitoli successivi su telescopi, spettri e stelle.

::: obiettivi
- descrivere un'onda elettromagnetica piana e il legame fra campo elettrico, campo magnetico e direzione di propagazione;
- collocare nello spettro le principali bande e spiegare quali raggiungono il suolo e quali richiedono telescopi spaziali;
- calcolare l'intensità di un'onda dal valore massimo del campo elettrico e viceversa;
- applicare la legge dell'inverso del quadrato per ricavare la luminosità del Sole dalla costante solare;
- calcolare la pressione di radiazione su superfici che assorbono o riflettono e confrontarla con la gravità;
- usare il rapporto fra spinta della luce e gravità per spiegare il comportamento della polvere e delle code delle comete;
- stimare l'accelerazione di una vela solare e confrontarla con i dati di IKAROS, LightSail 2 e ACS3;
- applicare la legge di Malus e descrivere la polarizzazione della luce del cielo e della luce delle stelle.
:::

## Campi che si propagano {#onde}

Le equazioni di Maxwell collegano i campi elettrici e magnetici alle cariche e alle correnti, e contengono due legami fra i campi stessi: un campo magnetico che varia nel tempo genera un campo elettrico, secondo la legge di Faraday, e un campo elettrico che varia nel tempo genera un campo magnetico, secondo il termine che Maxwell aggiunse alla legge di Ampère. Questi due legami permettono ai campi di sostenersi a vicenda anche in assenza di cariche: una perturbazione del campo elettrico produce una variazione del campo magnetico, che a sua volta produce un campo elettrico più avanti, e così via. Il risultato è un'onda.

Nel vuoto, lontano dalla sorgente, l'onda più semplice è l'**onda piana**: i campi dipendono soltanto dalla distanza lungo una direzione e dal tempo. Se l'onda si propaga lungo l'asse $x$, il campo elettrico può oscillare lungo $y$ e il campo magnetico lungo $z$,

$$\begin{aligned}E_y&=E_m\sin(kx-\omega t),\\B_z&=B_m\sin(kx-\omega t),\end{aligned}$$

con numero d'onda $k=2\pi/\lambda$ e pulsazione $\omega=2\pi f$. I due campi oscillano in fase, sono perpendicolari fra loro e perpendicolari alla direzione di propagazione: l'onda elettromagnetica è **trasversale**. La direzione di propagazione è quella del prodotto vettoriale $\vec E\times\vec B$, come mostra la figura 1.

::: figura onda
{"w":760,"h":295,"items":[{"t":"arrow","p":[70,150,730,150],"c":"ax","w":1.8,"head":8},{"t":"text","p":[734,168],"s":"x","c":"ax","size":13,"a":"start"},{"t":"poly","pts":[[70,150.0],[74,142.4],[78,134.8],[82,127.4],[86,120.1],[90,113.1],[94,106.4],[98,100.0],[102,94.1],[106,88.6],[110,83.5],[114,79.1],[118,75.1],[122,71.8],[126,69.2],[130,67.1],[134,65.8],[138,65.1],[142,65.1],[146,65.8],[150,67.1],[154,69.2],[158,71.8],[162,75.1],[166,79.1],[170,83.5],[174,88.6],[178,94.1],[182,100.0],[186,106.4],[190,113.1],[194,120.1],[198,127.4],[202,134.8],[206,142.4],[210,150.0],[214,157.6],[218,165.2],[222,172.6],[226,179.9],[230,186.9],[234,193.6],[238,200.0],[242,205.9],[246,211.4],[250,216.5],[254,220.9],[258,224.9],[262,228.2],[266,230.8],[270,232.9],[274,234.2],[278,234.9],[282,234.9],[286,234.2],[290,232.9],[294,230.8],[298,228.2],[302,224.9],[306,220.9],[310,216.5],[314,211.4],[318,205.9],[322,200.0],[326,193.6],[330,186.9],[334,179.9],[338,172.6],[342,165.2],[346,157.6],[350,150.0],[354,142.4],[358,134.8],[362,127.4],[366,120.1],[370,113.1],[374,106.4],[378,100.0],[382,94.1],[386,88.6],[390,83.5],[394,79.1],[398,75.1],[402,71.8],[406,69.2],[410,67.1],[414,65.8],[418,65.1],[422,65.1],[426,65.8],[430,67.1],[434,69.2],[438,71.8],[442,75.1],[446,79.1],[450,83.5],[454,88.6],[458,94.1],[462,100.0],[466,106.4],[470,113.1],[474,120.1],[478,127.4],[482,134.8],[486,142.4],[490,150.0],[494,157.6],[498,165.2],[502,172.6],[506,179.9],[510,186.9],[514,193.6],[518,200.0],[522,205.9],[526,211.4],[530,216.5],[534,220.9],[538,224.9],[542,228.2],[546,230.8],[550,232.9],[554,234.2],[558,234.9],[562,234.9],[566,234.2],[570,232.9],[574,230.8],[578,228.2],[582,224.9],[586,220.9],[590,216.5],[594,211.4],[598,205.9],[602,200.0],[606,193.6],[610,186.9],[614,179.9],[618,172.6],[622,165.2],[626,157.6],[630,150.0],[634,142.4],[638,134.8],[642,127.4],[646,120.1],[650,113.1],[654,106.4],[658,100.0],[662,94.1],[666,88.6],[670,83.5],[674,79.1],[678,75.1],[682,71.8],[686,69.2],[690,67.1],[694,65.8],[698,65.1]],"c":"force","w":2.4},{"t":"poly","pts":[[70.0,150.0],[71.0,152.4],[72.1,154.8],[73.2,157.2],[74.4,159.5],[75.7,161.7],[77.1,163.8],[78.6,165.9],[80.3,167.8],[82.1,169.5],[84.2,171.1],[86.5,172.5],[88.9,173.8],[91.7,174.8],[94.6,175.7],[97.8,176.3],[101.3,176.8],[105.0,177.0],[109.0,177.0],[113.3,176.8],[117.8,176.3],[122.6,175.7],[127.7,174.8],[132.9,173.8],[138.5,172.5],[144.2,171.1],[150.1,169.5],[156.3,167.8],[162.6,165.9],[169.1,163.8],[175.7,161.7],[182.4,159.5],[189.2,157.2],[196.1,154.8],[203.0,152.4],[210.0,150.0],[217.0,147.6],[223.9,145.2],[230.8,142.8],[237.6,140.5],[244.3,138.3],[250.9,136.2],[257.4,134.1],[263.7,132.2],[269.9,130.5],[275.8,128.9],[281.5,127.5],[287.1,126.2],[292.3,125.2],[297.4,124.3],[302.2,123.7],[306.7,123.2],[311.0,123.0],[315.0,123.0],[318.7,123.2],[322.2,123.7],[325.4,124.3],[328.3,125.2],[331.1,126.2],[333.5,127.5],[335.8,128.9],[337.9,130.5],[339.7,132.2],[341.4,134.1],[342.9,136.2],[344.3,138.3],[345.6,140.5],[346.8,142.8],[347.9,145.2],[349.0,147.6],[350.0,150.0],[351.0,152.4],[352.1,154.8],[353.2,157.2],[354.4,159.5],[355.7,161.7],[357.1,163.8],[358.6,165.9],[360.3,167.8],[362.1,169.5],[364.2,171.1],[366.5,172.5],[368.9,173.8],[371.7,174.8],[374.6,175.7],[377.8,176.3],[381.3,176.8],[385.0,177.0],[389.0,177.0],[393.3,176.8],[397.8,176.3],[402.6,175.7],[407.7,174.8],[412.9,173.8],[418.5,172.5],[424.2,171.1],[430.1,169.5],[436.3,167.8],[442.6,165.9],[449.1,163.8],[455.7,161.7],[462.4,159.5],[469.2,157.2],[476.1,154.8],[483.0,152.4],[490.0,150.0],[497.0,147.6],[503.9,145.2],[510.8,142.8],[517.6,140.5],[524.3,138.3],[530.9,136.2],[537.4,134.1],[543.7,132.2],[549.9,130.5],[555.8,128.9],[561.5,127.5],[567.1,126.2],[572.3,125.2],[577.4,124.3],[582.2,123.7],[586.7,123.2],[591.0,123.0],[595.0,123.0],[598.7,123.2],[602.2,123.7],[605.4,124.3],[608.3,125.2],[611.1,126.2],[613.5,127.5],[615.8,128.9],[617.9,130.5],[619.7,132.2],[621.4,134.1],[622.9,136.2],[624.3,138.3],[625.6,140.5],[626.8,142.8],[627.9,145.2],[629.0,147.6],[630.0,150.0],[631.0,152.4],[632.1,154.8],[633.2,157.2],[634.4,159.5],[635.7,161.7],[637.1,163.8],[638.6,165.9],[640.3,167.8],[642.1,169.5],[644.2,171.1],[646.5,172.5],[648.9,173.8],[651.7,174.8],[654.6,175.7],[657.8,176.3],[661.3,176.8],[665.0,177.0]],"c":"force2","w":2.4},{"t":"arrow","p":[105,150,105,89.9],"c":"force","w":1.3,"head":6},{"t":"arrow","p":[105,150,81.7,169.1],"c":"force2","w":1.3,"head":6},{"t":"arrow","p":[140,150,140,65.0],"c":"force","w":1.3,"head":6},{"t":"arrow","p":[140,150,107.0,177.0],"c":"force2","w":1.3,"head":6},{"t":"arrow","p":[175,150,175,89.9],"c":"force","w":1.3,"head":6},{"t":"arrow","p":[175,150,151.7,169.1],"c":"force2","w":1.3,"head":6},{"t":"arrow","p":[245,150,245,210.1],"c":"force","w":1.3,"head":6},{"t":"arrow","p":[245,150,268.3,130.9],"c":"force2","w":1.3,"head":6},{"t":"arrow","p":[280,150,280,235.0],"c":"force","w":1.3,"head":6},{"t":"arrow","p":[280,150,313.0,123.0],"c":"force2","w":1.3,"head":6},{"t":"arrow","p":[315,150,315,210.1],"c":"force","w":1.3,"head":6},{"t":"arrow","p":[315,150,338.3,130.9],"c":"force2","w":1.3,"head":6},{"t":"arrow","p":[385,150,385,89.9],"c":"force","w":1.3,"head":6},{"t":"arrow","p":[385,150,361.7,169.1],"c":"force2","w":1.3,"head":6},{"t":"arrow","p":[420,150,420,65.0],"c":"force","w":1.3,"head":6},{"t":"arrow","p":[420,150,387.0,177.0],"c":"force2","w":1.3,"head":6},{"t":"arrow","p":[455,150,455,89.9],"c":"force","w":1.3,"head":6},{"t":"arrow","p":[455,150,431.7,169.1],"c":"force2","w":1.3,"head":6},{"t":"arrow","p":[525,150,525,210.1],"c":"force","w":1.3,"head":6},{"t":"arrow","p":[525,150,548.3,130.9],"c":"force2","w":1.3,"head":6},{"t":"arrow","p":[560,150,560,235.0],"c":"force","w":1.3,"head":6},{"t":"arrow","p":[560,150,593.0,123.0],"c":"force2","w":1.3,"head":6},{"t":"arrow","p":[595,150,595,210.1],"c":"force","w":1.3,"head":6},{"t":"arrow","p":[595,150,618.3,130.9],"c":"force2","w":1.3,"head":6},{"t":"arrow","p":[665,150,665,89.9],"c":"force","w":1.3,"head":6},{"t":"arrow","p":[665,150,641.7,169.1],"c":"force2","w":1.3,"head":6},{"t":"text","p":[140,55],"s":"E","c":"force","size":15},{"t":"text","p":[108,198],"s":"B","c":"force2","size":15},{"t":"line","p":[280,50,560,50],"c":"muted","w":1.2},{"t":"line","p":[280,44,280,56],"c":"muted","w":1.2},{"t":"line","p":[560,44,560,56],"c":"muted","w":1.2},{"t":"text","p":[420,40],"s":"λ","c":"muted","size":13},{"t":"arrow","p":[560,262,660,262],"c":"accent","w":2.2,"head":8},{"t":"text","p":[610,282],"s":"propagazione a velocità c","c":"accent","size":11},{"t":"text","p":[150,262],"s":"E ⊥ B ⊥ direzione di propagazione,  E/B = c","c":"ax","size":11,"a":"start"}]}
---
Un'onda elettromagnetica piana che si propaga lungo $x$. Il campo elettrico oscilla nel piano verticale, il campo magnetico nel piano orizzontale; i due campi sono in fase e i loro valori stanno nel rapporto $E/B=c$. Le ampiezze relative sono scelte per la leggibilità.
:::

Sostituendo queste espressioni nelle equazioni di Maxwell si ottengono due condizioni. La prima fissa la velocità di propagazione, uguale per tutte le frequenze nel vuoto:

::: legge Velocità delle onde elettromagnetiche
$$c=\frac{1}{\sqrt{\mu_0\varepsilon_0}}=\frac{\omega}{k}=\lambda f$$

La seconda lega le ampiezze dei due campi:

$$\frac{E_m}{B_m}=c$$

Dal 1983 la velocità della luce nel vuoto è fissata per definizione a $c=299\,792\,458$ m/s, e il metro è definito a partire da essa.
:::

Nel 1865 Maxwell calcolò $1/\sqrt{\mu_0\varepsilon_0}$ con i valori delle costanti elettriche e magnetiche misurati in laboratorio, ottenne un valore molto vicino alla velocità della luce misurata da Fizeau e Foucault e ne concluse che la luce è un'onda elettromagnetica. Fra il 1886 e il 1888 Heinrich Hertz produsse e rivelò onde di questo tipo con circuiti oscillanti, misurandone la lunghezza d'onda e la riflessione; oggi le stesse onde trasportano le comunicazioni con le sonde nel sistema solare.

Il rapporto $E/B=c$ ha una conseguenza pratica. In unità del Sistema Internazionale il campo magnetico di un'onda è molto piccolo rispetto al campo elettrico espresso in volt al metro: un campo elettrico di $1000$ V/m si accompagna a un campo magnetico di circa $3{,}3$ μT, un decimo del campo magnetico terrestre al suolo. Per questo gli effetti delle onde sulle cariche ferme sono dominati dal campo elettrico, e un'antenna a dipolo risponde al campo elettrico dell'onda.

Un'onda reale si discosta dall'onda piana in due modi. Vicino alla sorgente i fronti d'onda sono curvi; una stella, vista da molto lontano, produce però fronti praticamente piani, e su un telescopio le onde arrivano parallele. Inoltre la luce reale è una sovrapposizione di molte frequenze e di molte direzioni del campo elettrico; l'onda piana monocromatica è il mattone con cui si costruisce ogni radiazione reale, come le note pure con cui si costruisce un suono.

## Lo spettro elettromagnetico e le finestre del cielo {#spettro}

Le equazioni di Maxwell non pongono limiti alla frequenza delle onde. Le onde elettromagnetiche conosciute vanno da lunghezze d'onda di migliaia di chilometri, come quelle delle tempeste radio della magnetosfera terrestre, a meno di un millesimo del diametro di un nucleo atomico, come i raggi gamma prodotti dai raggi cosmici. L'insieme di queste onde forma lo **spettro elettromagnetico**, diviso per convenzione in bande: onde radio, microonde, infrarosso, visibile, ultravioletto, raggi X e raggi gamma. I confini fra le bande sono convenzionali e dipendono più dalle tecniche di rivelazione che dalla fisica: tutte sono la stessa onda con lunghezze d'onda diverse.

L'occhio umano risponde a una banda stretta, fra circa $380$ e $750$ nm, dove cade il massimo dell'emissione del Sole e dove l'atmosfera terrestre è trasparente. Le due coincidenze hanno una spiegazione evolutiva: gli occhi si sono adattati alla luce disponibile. Ogni lunghezza d'onda porta però informazioni diverse. Le onde radio rivelano il gas freddo e gli elettroni veloci nei campi magnetici; l'infrarosso attraversa la polvere e mostra le stelle in formazione e i pianeti freddi; i raggi X vengono dal gas a milioni di gradi degli ammassi di galassie e dai dischi attorno ai buchi neri.

Il problema degli astronomi è che l'atmosfera assorbe gran parte dello spettro. Lo strato di ozono blocca l'ultravioletto sotto circa $300$ nm; l'ossigeno e l'azoto assorbono i raggi X e i raggi gamma ad alta quota; il vapore acqueo e l'anidride carbonica assorbono bande estese dell'infrarosso; la ionosfera riflette le onde radio più lunghe di una decina di metri. Restano due grandi **finestre**, quella ottica e quella radio, più alcune finestre strette nell'infrarosso vicino e medio, sfruttate dagli osservatori di alta quota come quelli delle Ande cilene e del Mauna Kea. La figura 2 riassume la situazione.

::: figura spettro
{"w":800,"h":285,"items":[{"t":"axes","o":[90,250],"x":[680,"λ, m"],"y":[175,"quota, km"],"sx":44,"sy":1.3,"xt":[[0,"10⁻¹²"],[2,"10⁻¹⁰"],[4,"10⁻⁸"],[6,"10⁻⁶"],[8,"10⁻⁴"],[10,"10⁻²"],[12,"10⁰"],[14,"10²"]],"yt":[[0,"0"],[50,"50"],[100,"100"]]},{"t":"poly","pts":[[90,217.5],[134,211.0],[178,191.5],[222,126.5],[266,81.0],[288.0,68.0],[310,113.5],[323.2,191.5],[329.8,213.6],[332.9,250.0],[349.6,250.0],[356.2,244.8],[360.6,250.0],[371.6,242.2],[380.4,247.4],[389.2,234.4],[395.8,246.1],[402.4,244.8],[411.2,231.8],[420.0,208.4],[433.2,211.0],[455.2,226.6],[472.8,237.0],[486.0,242.2],[499.2,246.1],[516.8,249.3],[530,250.0],[662,250.0],[670.8,198.0],[679.6,107.0],[728.0,107.0],[728.0,250.0],[90,250.0]],"c":"muted","w":1.2,"close":true,"fill":true},{"t":"poly","pts":[[90,217.5],[134,211.0],[178,191.5],[222,126.5],[266,81.0],[288.0,68.0],[310,113.5],[323.2,191.5],[329.8,213.6],[332.9,250.0],[349.6,250.0],[356.2,244.8],[360.6,250.0],[371.6,242.2],[380.4,247.4],[389.2,234.4],[395.8,246.1],[402.4,244.8],[411.2,231.8],[420.0,208.4],[433.2,211.0],[455.2,226.6],[472.8,237.0],[486.0,242.2],[499.2,246.1],[516.8,249.3],[530,250.0],[662,250.0],[670.8,198.0],[679.6,107.0],[728.0,107.0]],"c":"force2","w":2.2},{"t":"line","p":[90,55.0,90,68.0],"c":"ax","w":1.2},{"t":"text","p":[112.0,57.0],"s":"γ","c":"ax","size":11},{"t":"line","p":[134,55.0,134,68.0],"c":"ax","w":1.2},{"t":"text","p":[200.0,57.0],"s":"raggi X","c":"ax","size":11},{"t":"line","p":[266,55.0,266,68.0],"c":"ax","w":1.2},{"t":"text","p":[301.2,57.0],"s":"UV","c":"ax","size":11},{"t":"line","p":[336.4,55.0,336.4,68.0],"c":"ax","w":1.2},{"t":"line","p":[349.6,55.0,349.6,68.0],"c":"ax","w":1.2},{"t":"text","p":[411.2,57.0],"s":"infrarosso","c":"ax","size":11},{"t":"line","p":[472.8,55.0,472.8,68.0],"c":"ax","w":1.2},{"t":"text","p":[508.0,57.0],"s":"micro","c":"ax","size":11},{"t":"line","p":[543.2,55.0,543.2,68.0],"c":"ax","w":1.2},{"t":"text","p":[635.6,57.0],"s":"radio","c":"ax","size":11},{"t":"line","p":[728.0,55.0,728.0,68.0],"c":"ax","w":1.2},{"t":"rect","p":[336.4,53.0,13.2,12],"c":"force4","r":1},{"t":"text","p":[343.0,81.0],"s":"visibile","c":"force4","size":10},{"t":"text","p":[343.0,240.0],"s":"finestra ottica","c":"force4","size":10},{"t":"text","p":[596.0,240.0],"s":"finestra radio","c":"force4","size":10},{"t":"text","p":[701.6,97.0],"s":"ionosfera","c":"muted","size":10},{"t":"text","p":[200.0,159.0],"s":"assorbimento","c":"muted","size":10}]}
---
Lo spettro elettromagnetico su scala logaritmica, dalle onde radio ai raggi gamma, con la quota approssimativa alla quale l'atmosfera assorbe metà della radiazione proveniente dallo spazio. Solo le finestre ottica e radio arrivano al livello del mare; per le altre bande servono palloni, aerei o satelliti.
:::

Per questo l'astronomia della seconda metà del Novecento è diventata un'impresa spaziale. Il satellite Uhuru aprì nel 1970 il cielo dei raggi X; IRAS nel 1983 mappò il cielo infrarosso; il telescopio spaziale Hubble lavora dal 1990 nell'ultravioletto, nel visibile e nel vicino infrarosso; il James Webb Space Telescope osserva dal 2022 nell'infrarosso da una posizione lontana un milione e mezzo di chilometri dalla Terra. Da terra si continua a osservare nelle finestre, con radiotelescopi e telescopi ottici sempre più grandi.

Il legame fra lunghezza d'onda e frequenza, $\lambda f=c$, permette di passare da una descrizione all'altra. I radioastronomi parlano di frequenze, $1420$ MHz per la riga dell'idrogeno neutro; gli astronomi ottici di lunghezze d'onda, $656$ nm per la riga rossa dell'idrogeno; gli astronomi dei raggi X di energie dei fotoni, in kiloelettronvolt. Le tre grandezze sono legate dalle relazioni $\lambda f=c$ ed $E=hf$, e la scelta dipende dalle abitudini di ciascun campo.

## L'energia trasportata e l'intensità {#intensita}

Un campo elettrico e un campo magnetico contengono energia: per unità di volume, $u_E=\varepsilon_0E^2/2$ e $u_B=B^2/(2\mu_0)$. In un'onda elettromagnetica le due densità sono uguali in ogni punto, perché $B=E/c$ e $c^2=1/(\mu_0\varepsilon_0)$, e l'energia si sposta con l'onda alla velocità $c$. La potenza che attraversa una superficie unitaria perpendicolare alla propagazione è descritta dal **vettore di Poynting**, introdotto da John Henry Poynting nel 1884:

$$\vec S=\frac{1}{\mu_0}\,\vec E\times\vec B .$$

In un'onda piana $\vec S$ punta nella direzione di propagazione e il suo modulo vale $EB/\mu_0=E^2/(c\mu_0)$. Il valore istantaneo oscilla a frequenza doppia di quella dell'onda, ed è troppo rapido per qualunque rivelatore nel visibile; ciò che si misura è la media nel tempo, chiamata **intensità**.

::: legge Intensità di un'onda elettromagnetica
La media nel tempo del modulo del vettore di Poynting vale

$$I=\frac{E_m^2}{2c\mu_0}=\frac{c\,\varepsilon_0E_m^2}{2}=\frac{E_{\rm rms}^2}{c\mu_0},$$

dove $E_m$ è l'ampiezza del campo elettrico ed $E_{\rm rms}=E_m/\sqrt2$ il suo valore efficace. L'intensità si misura in watt al metro quadrato.
:::

La formula permette di passare dal campo all'intensità e viceversa. Alla distanza media della Terra dal Sole, fuori dall'atmosfera, l'intensità della luce solare vale circa $1361$ W/m². Invertendo la legge si ottiene l'ampiezza del campo elettrico,

$$E_m=\sqrt{\frac{2I}{c\,\varepsilon_0}}\approx1{,}01\cdot10^{3}\ {\rm V/m},$$

e il campo magnetico corrispondente, $B_m=E_m/c\approx3{,}4$ μT. Sono valori modesti: un campo elettrico di mille volt al metro è comune vicino a un monitor o sotto una nube temporalesca. La luce del Sole è intensa per l'enorme superficie su cui arriva e per la sua continuità, più che per l'ampiezza dei suoi campi. Un laser concentra invece la potenza in un fascio sottile: un puntatore da $1$ mW su un diametro di $1$ mm produce circa $1300$ W/m², quanto il Sole, e un laser da laboratorio focalizzato su pochi micrometri raggiunge campi miliardi di volte più intensi.

## L'inverso del quadrato e la costante solare {#quadrato}

Una stella irraggia in tutte le direzioni. Se lo spazio intorno è vuoto, l'energia emessa ogni secondo attraversa senza perdite qualunque sfera centrata sulla stella; l'area di una sfera di raggio $d$ è $4\pi d^2$, quindi l'intensità diminuisce con il quadrato della distanza.

::: legge Legge dell'inverso del quadrato
Una sorgente che emette la potenza $L$ in modo uguale in tutte le direzioni produce, alla distanza $d$, l'intensità

$$I=\frac{L}{4\pi d^2}.$$

La potenza totale $L$ di una stella si chiama **luminosità**; l'intensità ricevuta si chiama anche **flusso**.
:::

La legge ha due usi opposti. Se si conosce la distanza, l'intensità misurata dà la luminosità; se si conosce la luminosità, l'intensità misurata dà la distanza. Il secondo uso è alla base delle «candele standard» con cui si misurano le distanze delle galassie, dalle cefeidi alle supernove di tipo Ia, che tornano nel capitolo [Particelle, espansione e Big Bang](unit:physics-40).

Per il Sole la grandezza misurata è l'**irradianza solare totale**, l'intensità ricevuta a una unità astronomica, $1\ {\rm UA}=1{,}496\cdot10^{11}$ m, fuori dall'atmosfera. Il valore storico di circa $1366$ W/m² è stato corretto nel 2011, quando Greg Kopp e Judith Lean hanno mostrato che gli strumenti più antichi sovrastimavano la radiazione per la luce diffusa all'interno dei radiometri: il valore attuale, misurato dallo strumento TIM del satellite SORCE e confermato dalle missioni successive, è $1360{,}8\pm0{,}5$ W/m² al minimo del ciclo solare. Nel 2015 l'Unione Astronomica Internazionale ha adottato il valore nominale $S_0=1361$ W/m². Durante il ciclo undecennale l'irradianza varia di circa un millesimo.

Dalla costante solare e dalla distanza segue la luminosità del Sole:

$$\begin{aligned}L_\odot&=4\pi d^2S_0=4\pi(1{,}496\cdot10^{11}\ {\rm m})^2\\&\quad\cdot1361\ {\rm W/m^2}\approx3{,}83\cdot10^{26}\ {\rm W},\end{aligned}$$

in accordo con il valore nominale adottato dall'Unione Astronomica Internazionale, $3{,}828\cdot10^{26}$ W. Ogni secondo il Sole emette un'energia pari a quella che l'umanità consuma in più di mezzo milione di anni.

La figura 3 mostra l'intensità solare alla distanza dei pianeti. Mercurio, a $0{,}39$ UA, riceve circa $9100$ W/m², più di sei volte la Terra; Giove, a $5{,}2$ UA, circa $50$ W/m²; Nettuno, a $30$ UA, circa $1{,}5$ W/m², novecento volte meno della Terra. Questi numeri fissano la temperatura dei pianeti, la potenza disponibile per i pannelli solari delle sonde e la difficoltà di osservare i corpi lontani, che riflettono una luce già debole.

::: figura quadrato
{"w":760,"h":300,"items":[{"t":"axes","o":[90,262],"x":[640,"distanza dal Sole, UA"],"y":[240,"intensità, W/m²"],"sx":180,"sy":36,"xt":[[0,"0,1"],[1,"1"],[2,"10"]],"yt":[[0,"10⁻¹"],[1,"10⁰"],[2,"10¹"],[3,"10²"],[4,"10³"],[5,"10⁴"],[6,"10⁵"]]},{"t":"plot","o":[90,262],"sx":180,"sy":36,"pts":[[0.0,6.1338581],[0.05,6.0338581],[0.1,5.9338581],[0.15,5.8338581],[0.2,5.7338581],[0.25,5.6338581],[0.3,5.5338581],[0.35,5.4338581],[0.4,5.3338581],[0.45,5.2338581],[0.5,5.1338581],[0.55,5.0338581],[0.6,4.9338581],[0.65,4.8338581],[0.7,4.7338581],[0.75,4.6338581],[0.8,4.5338581],[0.85,4.4338581],[0.9,4.3338581],[0.95,4.2338581],[1.0,4.1338581],[1.05,4.0338581],[1.1,3.9338581],[1.15,3.8338581],[1.2,3.7338581],[1.25,3.6338581],[1.3,3.5338581],[1.35,3.4338581],[1.4,3.3338581],[1.45,3.2338581],[1.5,3.1338581],[1.55,3.0338581],[1.6,2.9338581],[1.65,2.8338581],[1.7,2.7338581],[1.75,2.6338581],[1.8,2.5338581],[1.85,2.4338581],[1.9,2.3338581],[1.95,2.2338581],[2.0,2.1338581],[2.05,2.0338581],[2.1,1.9338581],[2.15,1.8338581],[2.2,1.7338581],[2.25,1.6338581],[2.3,1.5338581],[2.35,1.4338581],[2.4,1.3338581],[2.45,1.2338581],[2.5,1.1338581],[2.55,1.0338581],[2.6,0.9338581],[2.65,0.8338581],[2.7,0.7338581],[2.75,0.6338581],[2.8,0.5338581],[2.85,0.4338581],[2.9,0.3338581],[2.95,0.2338581],[3.0,0.1338581]],"c":"force2","w":2.2},{"t":"circle","p":[195.8,83.5,4],"c":"force"},{"t":"text","p":[203.8,75.5],"s":"Mercurio","c":"ax","size":10,"a":"start"},{"t":"circle","p":[244.6,103.0,4],"c":"force"},{"t":"text","p":[236.6,119.0],"s":"Venere","c":"ax","size":10,"a":"end"},{"t":"circle","p":[270.0,113.2,4],"c":"force"},{"t":"text","p":[278.0,105.2],"s":"Terra","c":"ax","size":10,"a":"start"},{"t":"circle","p":[302.9,126.4,4],"c":"force"},{"t":"text","p":[310.9,118.4],"s":"Marte","c":"ax","size":10,"a":"start"},{"t":"circle","p":[398.9,164.8,4],"c":"force"},{"t":"text","p":[406.9,156.8],"s":"Giove","c":"ax","size":10,"a":"start"},{"t":"circle","p":[446.3,183.7,4],"c":"force"},{"t":"text","p":[454.3,199.7],"s":"Saturno","c":"ax","size":10,"a":"start"},{"t":"circle","p":[501.0,205.6,4],"c":"force"},{"t":"text","p":[509.0,197.6],"s":"Urano","c":"ax","size":10,"a":"start"},{"t":"circle","p":[536.1,219.6,4],"c":"force"},{"t":"text","p":[544.1,211.6],"s":"Nettuno","c":"ax","size":10,"a":"start"},{"t":"line","p":[558.4,228.5,575.8,235.5],"c":"force3","w":6},{"t":"text","p":[553.6,258.2],"s":"fascia di Kuiper","c":"force3","size":10,"a":"end"},{"t":"text","p":[126.0,215.2],"s":"pendenza −2","c":"muted","size":11,"a":"start"}]}
---
Intensità della luce solare in funzione della distanza dal Sole, su scale logaritmiche, con i pianeti e la fascia di Kuiper. La retta di pendenza $-2$ è la legge dell'inverso del quadrato: ogni fattore dieci nella distanza riduce l'intensità di un fattore cento.
:::

La conseguenza tecnica è immediata. La sonda Juno, in orbita attorno a Giove dal 2016, è la prima missione alimentata da pannelli solari a operare attorno a Giove: porta tre ali con una superficie complessiva di più di $60$ m², che alla distanza della Terra fornirebbero circa $14$ kW e a Giove circa $500$ W. Le sonde dirette più lontano, come New Horizons verso Plutone, usano invece generatori a radioisotopi, perché a $30$ UA un pannello dovrebbe essere novecento volte più grande per dare la stessa potenza.

## La luce spinge: pressione di radiazione {#pressione}

Un'onda elettromagnetica che incide su una superficie trasporta anche quantità di moto. Lo si può capire con un argomento semplice: il campo elettrico dell'onda mette in moto le cariche del materiale lungo la direzione del campo, e il campo magnetico agisce su queste cariche in moto con una forza $q\vec v\times\vec B$ diretta lungo la propagazione. Il calcolo completo dà un risultato generale: un'onda che trasporta l'energia $U$ trasporta anche la quantità di moto $U/c$.

::: legge Pressione di radiazione
Una superficie perpendicolare a un fascio di intensità $I$ riceve la pressione

$$\begin{aligned}p&=\frac{I}{c}&&\text{se assorbe tutta la luce},\\p&=\frac{2I}{c}&&\text{se la riflette tutta}.\end{aligned}$$

Nella riflessione la quantità di moto della luce si inverte, e la variazione è doppia. Per una superficie di area $A$ la forza vale $F=pA$.
:::

La pressione della luce è minuscola. A una unità astronomica dal Sole vale $1361/c\approx4{,}5$ μPa per una superficie nera e $9{,}1$ μPa per uno specchio perfetto: circa venti miliardi di volte meno della pressione atmosferica al livello del mare. Per questo fu misurata soltanto all'inizio del Novecento, da Pëtr Lebedev a Mosca e da Ernest Nichols e Gordon Hull negli Stati Uniti, con bilance di torsione nel vuoto in cui l'effetto andava separato con cura dalle forze dovute al gas residuo riscaldato.

Sulla Terra intera la luce del Sole esercita una forza

$$F=\frac{I}{c}\,\pi R_\oplus^2\approx5{,}8\cdot10^{8}\ {\rm N},$$

pari al peso di circa sessantamila tonnellate. L'attrazione gravitazionale del Sole sulla Terra è circa $3{,}5\cdot10^{22}$ N, circa sessantamila miliardi di volte maggiore. Per un pianeta la pressione della luce è irrilevante; per un granello di polvere di un micrometro le due forze diventano paragonabili, e questo cambia il destino della polvere nel sistema solare.

## Polvere, comete e il rapporto fra luce e gravità {#polvere}

Per un granello sferico di raggio $s$ e densità $\rho$ a distanza $r$ dal Sole, la forza dovuta alla luce è la pressione $I/c$ moltiplicata per la sezione $\pi s^2$, con un fattore di efficienza $Q_{\rm pr}$ che vale circa $1$ per granelli più grandi della lunghezza d'onda e diminuisce per granelli molto più piccoli. La gravità vale $GMm/r^2$, con $m=\tfrac43\pi s^3\rho$. Le due forze diminuiscono entrambe come $1/r^2$, e il loro rapporto dipende soltanto dal granello:

::: legge Rapporto fra pressione di radiazione e gravità
$$\beta=\frac{F_{\rm rad}}{F_{\rm grav}}=\frac{3L_\odot Q_{\rm pr}}{16\pi GM_\odot c\,\rho\,s}$$

Con $\rho$ in grammi al centimetro cubo e $s$ in micrometri vale circa $\beta\approx0{,}57\,Q_{\rm pr}/(\rho s)$. Il rapporto non dipende dalla distanza dal Sole.
:::

Un granello con $\beta>0$ si muove come se il Sole avesse una massa ridotta del fattore $1-\beta$. Se $\beta>1$ la luce vince e il granello viene espulso dal sistema solare. Anche valori minori bastano, se il granello nasce da un corpo in moto: un granello liberato da un corpo in orbita circolare conserva la velocità del corpo, ma sente una gravità ridotta, e diventa slegato quando $\beta>1/2$. Per un granello di silicato con $\rho\approx2{,}5$ g/cm³ e $Q_{\rm pr}\approx1$ la soglia cade a un raggio di circa mezzo micrometro: la polvere più fine prodotta dalle collisioni fra asteroidi e dalle comete lascia il sistema solare in qualche decennio, e le sonde che misurano la polvere la rivelano come un flusso diretto verso l'esterno.

La figura 4 mostra l'andamento di $\beta$ con il raggio del granello. Per i granelli molto più piccoli della lunghezza d'onda della luce solare, attorno a $0{,}5$ μm, l'efficienza $Q_{\rm pr}$ crolla perché la luce aggira il granello senza esserne assorbita; il rapporto raggiunge così un massimo per raggi di qualche decimo di micrometro e poi diminuisce. La forma esatta della curva dipende dal materiale: il carbonio, che assorbe bene, raggiunge valori di $\beta$ maggiori dei silicati.

::: figura beta
{"w":760,"h":285,"items":[{"t":"axes","o":[90,250],"x":[640,"raggio del granello, μm"],"y":[220,"β"],"sx":150,"sy":100,"xt":[[0,"0,01"],[1,"0,1"],[2,"1"],[3,"10"]],"yt":[[0,"0"],[0.5,"0,5"],[1,"1"],[1.5,"1,5"],[2,"2"]]},{"t":"plot","o":[90,250],"sx":150,"sy":100,"pts":[[1.08,1.8964214],[1.12,1.7295569],[1.16,1.5773746],[1.2,1.4385827],[1.24,1.3120031],[1.28,1.196561],[1.32,1.0912766],[1.36,0.9952561],[1.4,0.9076843],[1.44,0.827818],[1.48,0.754979],[1.52,0.688549],[1.56,0.6279641],[1.6,0.5727101],[1.64,0.5223178],[1.68,0.4763595],[1.72,0.434445],[1.76,0.3962186],[1.8,0.3613556],[1.84,0.3295603],[1.88,0.3005625],[1.92,0.2741163],[1.96,0.249997],[2.0,0.228],[2.04,0.2079385],[2.08,0.1896421],[2.12,0.1729557],[2.16,0.1577375],[2.2,0.1438583],[2.24,0.1312003],[2.28,0.1196561],[2.32,0.1091277],[2.36,0.0995256],[2.4,0.0907684],[2.44,0.0827818],[2.48,0.0754979],[2.52,0.0688549],[2.56,0.0627964],[2.6,0.057271],[2.64,0.0522318],[2.68,0.047636],[2.72,0.0434445],[2.76,0.0396219],[2.8,0.0361356],[2.84,0.032956],[2.88,0.0300563],[2.92,0.0274116],[2.96,0.0249997],[3.0,0.0228],[3.04,0.0207938],[3.08,0.0189642],[3.12,0.0172956],[3.16,0.0157737],[3.2,0.0143858],[3.24,0.01312],[3.28,0.0119656],[3.32,0.0109128],[3.36,0.0099526],[3.4,0.0090768],[3.44,0.0082782],[3.48,0.0075498],[3.52,0.0068855],[3.56,0.0062796],[3.6,0.0057271],[3.64,0.0052232],[3.68,0.0047636],[3.72,0.0043445],[3.76,0.0039622],[3.8,0.0036136],[3.84,0.0032956],[3.88,0.0030056],[3.92,0.0027412],[3.96,0.0025],[4.0,0.00228]],"c":"muted","w":2,"dash":true},{"t":"plot","o":[90,250],"sx":150,"sy":100,"pts":[[0.0,0.0568579],[0.04,0.062312],[0.08,0.0682823],[0.12,0.0748156],[0.16,0.081962],[0.2,0.0897751],[0.24,0.0983124],[0.28,0.1076343],[0.32,0.1178043],[0.36,0.1288884],[0.4,0.1409541],[0.44,0.1540692],[0.48,0.1683],[0.52,0.1837089],[0.56,0.2003516],[0.6,0.2182726],[0.64,0.2375003],[0.68,0.2580407],[0.72,0.2798696],[0.76,0.3029239],[0.8,0.3270913],[0.84,0.3522002],[0.88,0.3780089],[0.92,0.4041964],[0.96,0.4303573],[1.0,0.456],[1.04,0.4805543],[1.08,0.5033869],[1.12,0.5238288],[1.16,0.5412124],[1.2,0.554917],[1.24,0.5644178],[1.28,0.5693324],[1.32,0.5694567],[1.36,0.5647855],[1.4,0.5555129],[1.44,0.542013],[1.48,0.5248043],[1.52,0.5045038],[1.56,0.4817778],[1.6,0.4572963],[1.64,0.4316951],[1.68,0.4055482],[1.72,0.3793514],[1.76,0.3535147],[1.8,0.3283632],[1.84,0.3041425],[1.88,0.2810277],[1.92,0.2591338],[1.96,0.2385262],[2.0,0.2192308],[2.04,0.201243],[2.08,0.1845354],[2.12,0.1690642],[2.16,0.1547743],[2.2,0.1416033],[2.24,0.1294852],[2.28,0.1183522],[2.32,0.1081368],[2.36,0.0987728],[2.4,0.0901966],[2.44,0.0823476],[2.48,0.0751682],[2.52,0.0686046],[2.56,0.0626064],[2.6,0.0571268],[2.64,0.0521224],[2.68,0.0475529],[2.72,0.0433815],[2.76,0.0395741],[2.8,0.0360993],[2.84,0.0329285],[2.88,0.0300354],[2.92,0.0273958],[2.96,0.0249877],[3.0,0.0227909],[3.04,0.0207869],[3.08,0.018959],[3.12,0.0172916],[3.16,0.0157707],[3.2,0.0143835],[3.24,0.0131183],[3.28,0.0119643],[3.32,0.0109118],[3.36,0.0099518],[3.4,0.0090763],[3.44,0.0082777],[3.48,0.0075495],[3.52,0.0068852],[3.56,0.0062795],[3.6,0.005727],[3.64,0.0052231],[3.68,0.0047635],[3.72,0.0043444],[3.76,0.0039621],[3.8,0.0036135],[3.84,0.0032956],[3.88,0.0030056],[3.92,0.0027411],[3.96,0.0025],[4.0,0.00228]],"c":"force2","w":2.4},{"t":"line","p":[90,200.0,690,200.0],"c":"force3","w":1.3,"dash":true},{"t":"text","p":[682.5,194.0],"s":"β = 1/2","c":"force3","size":10,"a":"end"},{"t":"line","p":[90,150,690,150],"c":"force3","w":1.3,"dash":true},{"t":"text","p":[682.5,144],"s":"β = 1","c":"force3","size":10,"a":"end"},{"t":"text","p":[297.0,65.0],"s":"Q = 1","c":"muted","size":10,"a":"start"},{"t":"text","p":[180.0,238.0],"s":"efficienza ridotta","c":"force2","size":10,"a":"start"},{"t":"text","p":[412.5,175.0],"s":"sopra β = 1/2: espulsi se liberati da un'orbita circolare","c":"ax","size":10,"a":"start"}]}
---
Rapporto $\beta$ fra pressione della luce solare e gravità per granelli sferici di silicato ($\rho=2{,}5$ g/cm³), nella forma semplice con $Q_{\rm pr}=1$ e con una riduzione schematica dell'efficienza per i granelli più piccoli di $0{,}2$ μm. Sopra la linea $\beta=1/2$ un granello liberato da un corpo in orbita circolare lascia il sistema solare.
:::

Le comete rendono visibile questo effetto. Quando una cometa si avvicina al Sole il ghiaccio sublima e libera gas e polvere. Il gas viene ionizzato dalla radiazione ultravioletta e trascinato dal vento solare, il flusso di particelle cariche che il Sole emette di continuo: forma una **coda di ioni** diritta, bluastra per l'emissione degli ioni del monossido di carbonio, che punta in direzione opposta al Sole. Fu proprio lo studio di queste code a portare Ludwig Biermann a proporre nel 1951 l'esistenza di un vento continuo di particelle dal Sole, confermata dalle prime sonde dieci anni dopo. La polvere sente invece la pressione della luce: ogni granello percorre un'orbita propria con gravità ridotta, e i granelli si dispongono in una **coda di polvere** larga e incurvata, gialla perché diffonde la luce del Sole. L'intuizione di Keplero era corretta per questa seconda coda.

La luce produce anche un effetto più sottile. Un granello in orbita assorbe la luce che arriva dal Sole e la riemette in tutte le direzioni nel proprio sistema di riferimento; per l'aberrazione dovuta al moto orbitale, la luce assorbita ha una piccola componente contraria alla velocità. Il granello perde così momento angolare e spiraleggia lentamente verso il Sole: è l'**effetto Poynting-Robertson**. Il tempo di caduta da un'orbita circolare di raggio $r$ vale circa

$$t\approx\frac{400\ {\rm anni}}{\beta}\left(\frac{r}{1\ {\rm UA}}\right)^2,$$

quindi un granello con $\beta=0{,}1$ partito dall'orbita terrestre raggiunge il Sole in circa quattromila anni. La polvere interplanetaria, che si osserva di notte come luce zodiacale, deve dunque essere rifornita di continuo da comete e asteroidi.

## Le vele solari {#vele}

Una vela solare è una membrana sottile e riflettente che usa la pressione della luce come propulsione. La spinta è piccola ma continua e non richiede propellente; su tempi lunghi accumula variazioni di velocità che nessun motore chimico potrebbe dare con la stessa massa. Per una vela perfettamente riflettente perpendicolare al Sole, la forza vale $2IA/c$ e l'accelerazione dipende dal rapporto fra la massa totale e l'area della vela, la **densità superficiale** $\sigma$:

$$a=\frac{2S_0}{c\,\sigma}\left(\frac{1\ {\rm UA}}{r}\right)^2.$$

Il valore a una unità astronomica si chiama **accelerazione caratteristica** della vela. La figura 5 mostra come varia con la distanza per tre densità superficiali: avvicinarsi al Sole aumenta molto la spinta, e ogni grammo per metro quadrato risparmiato conta.

::: figura vela
{"w":760,"h":300,"items":[{"t":"axes","o":[90,262],"x":[640,"distanza dal Sole, UA"],"y":[240,"accelerazione, mm/s²"],"sx":110,"sy":46,"xt":[[0,"0"],[1,"1"],[2,"2"],[3,"3"],[4,"4"]],"yt":[[0,"10⁻³"],[1,"10⁻²"],[2,"10⁻¹"],[3,"10⁰"],[4,"10¹"]]},{"t":"plot","o":[90,262],"sx":110,"sy":46,"pts":[[0.3,4.3048549],[0.35,4.1709613],[0.4,4.0549774],[0.45,3.9526724],[0.5,3.8611574],[0.55,3.778372],[0.6,3.7027949],[0.65,3.6332707],[0.7,3.5689013],[0.75,3.5089749],[0.8,3.4529174],[0.85,3.4002596],[0.9,3.3506124],[0.95,3.3036502],[1.0,3.2590974],[1.05,3.2167188],[1.1,3.176312],[1.15,3.1377017],[1.2,3.1007349],[1.25,3.0652774],[1.3,3.0312107],[1.35,2.9984299],[1.4,2.9668413],[1.45,2.9363614],[1.5,2.9069149],[1.55,2.878434],[1.6,2.8508574],[1.65,2.8241295],[1.7,2.7981996],[1.75,2.7730213],[1.8,2.7485524],[1.85,2.724754],[1.9,2.7015902],[1.95,2.6790282],[2.0,2.6570374],[2.05,2.6355897],[2.1,2.6146588],[2.15,2.5942205],[2.2,2.5742521],[2.25,2.5547324],[2.3,2.5356417],[2.35,2.5169617],[2.4,2.4986749],[2.45,2.4807652],[2.5,2.4632174],[2.55,2.4460171],[2.6,2.4291507],[2.65,2.4126057],[2.7,2.3963699],[2.75,2.380432],[2.8,2.3647814],[2.85,2.3494077],[2.9,2.3343014],[2.95,2.3194534],[3.0,2.3048549],[3.05,2.2904977],[3.1,2.276374],[3.15,2.2624763],[3.2,2.2487975],[3.25,2.2353307],[3.3,2.2220695],[3.35,2.2090078],[3.4,2.1961396],[3.45,2.1834592],[3.5,2.1709613],[3.55,2.1586407],[3.6,2.1464924],[3.65,2.1345117],[3.7,2.122694],[3.75,2.1110349],[3.8,2.0995302],[3.85,2.088176],[3.9,2.0769682],[3.95,2.0659032],[4.0,2.0549774],[4.05,2.0441874],[4.1,2.0335297],[4.15,2.0230012],[4.2,2.0125988],[4.25,2.0023196],[4.3,1.9921605],[4.35,1.9821189],[4.4,1.9721921],[4.45,1.9623774],[4.5,1.9526724],[4.55,1.9430746],[4.6,1.9335818],[4.65,1.9241915],[4.7,1.9149017],[4.75,1.9057102],[4.8,1.8966149],[4.85,1.8876139],[4.9,1.8787053],[4.95,1.869887],[5.0,1.8611574]],"c":"force","w":2.2},{"t":"text","p":[637.8,168.2],"s":"σ = 5 g/m²","c":"force","size":10,"a":"end"},{"t":"plot","o":[90,262],"sx":110,"sy":46,"pts":[[0.3,4.0038249],[0.35,3.8699313],[0.4,3.7539474],[0.45,3.6516424],[0.5,3.5601274],[0.55,3.477342],[0.6,3.4017649],[0.65,3.3322407],[0.7,3.2678713],[0.75,3.2079449],[0.8,3.1518874],[0.85,3.0992296],[0.9,3.0495824],[0.95,3.0026202],[1.0,2.9580674],[1.05,2.9156888],[1.1,2.875282],[1.15,2.8366717],[1.2,2.7997049],[1.25,2.7642474],[1.3,2.7301807],[1.35,2.6973999],[1.4,2.6658113],[1.45,2.6353314],[1.5,2.6058849],[1.55,2.577404],[1.6,2.5498275],[1.65,2.5230995],[1.7,2.4971696],[1.75,2.4719913],[1.8,2.4475224],[1.85,2.423724],[1.9,2.4005602],[1.95,2.3779982],[2.0,2.3560074],[2.05,2.3345597],[2.1,2.3136288],[2.15,2.2931905],[2.2,2.2732221],[2.25,2.2537024],[2.3,2.2346117],[2.35,2.2159317],[2.4,2.1976449],[2.45,2.1797352],[2.5,2.1621874],[2.55,2.1449871],[2.6,2.1281207],[2.65,2.1115757],[2.7,2.0953399],[2.75,2.079402],[2.8,2.0637514],[2.85,2.0483777],[2.9,2.0332714],[2.95,2.0184234],[3.0,2.0038249],[3.05,1.9894677],[3.1,1.975344],[3.15,1.9614463],[3.2,1.9477675],[3.25,1.9343007],[3.3,1.9210395],[3.35,1.9079778],[3.4,1.8951096],[3.45,1.8824292],[3.5,1.8699313],[3.55,1.8576107],[3.6,1.8454624],[3.65,1.8334817],[3.7,1.821664],[3.75,1.8100049],[3.8,1.7985002],[3.85,1.787146],[3.9,1.7759382],[3.95,1.7648732],[4.0,1.7539474],[4.05,1.7431574],[4.1,1.7324997],[4.15,1.7219712],[4.2,1.7115688],[4.25,1.7012896],[4.3,1.6911305],[4.35,1.6810889],[4.4,1.6711621],[4.45,1.6613474],[4.5,1.6516424],[4.55,1.6420446],[4.6,1.6325518],[4.65,1.6231615],[4.7,1.6138717],[4.75,1.6046802],[4.8,1.5955849],[4.85,1.5865839],[4.9,1.5776753],[4.95,1.568857],[5.0,1.5601274]],"c":"force2","w":2.2},{"t":"text","p":[486.0,193.1],"s":"σ = 10 g/m²","c":"force2","size":10},{"t":"plot","o":[90,262],"sx":110,"sy":46,"pts":[[0.3,3.3048549],[0.35,3.1709613],[0.4,3.0549774],[0.45,2.9526724],[0.5,2.8611574],[0.55,2.778372],[0.6,2.7027949],[0.65,2.6332707],[0.7,2.5689013],[0.75,2.5089749],[0.8,2.4529174],[0.85,2.4002596],[0.9,2.3506124],[0.95,2.3036502],[1.0,2.2590974],[1.05,2.2167188],[1.1,2.176312],[1.15,2.1377017],[1.2,2.1007349],[1.25,2.0652774],[1.3,2.0312107],[1.35,1.9984299],[1.4,1.9668413],[1.45,1.9363614],[1.5,1.9069149],[1.55,1.878434],[1.6,1.8508574],[1.65,1.8241295],[1.7,1.7981996],[1.75,1.7730213],[1.8,1.7485524],[1.85,1.724754],[1.9,1.7015902],[1.95,1.6790282],[2.0,1.6570374],[2.05,1.6355897],[2.1,1.6146588],[2.15,1.5942205],[2.2,1.5742521],[2.25,1.5547324],[2.3,1.5356417],[2.35,1.5169617],[2.4,1.4986749],[2.45,1.4807652],[2.5,1.4632174],[2.55,1.4460171],[2.6,1.4291507],[2.65,1.4126057],[2.7,1.3963699],[2.75,1.380432],[2.8,1.3647814],[2.85,1.3494077],[2.9,1.3343014],[2.95,1.3194534],[3.0,1.3048549],[3.05,1.2904977],[3.1,1.276374],[3.15,1.2624763],[3.2,1.2487975],[3.25,1.2353307],[3.3,1.2220695],[3.35,1.2090078],[3.4,1.1961396],[3.45,1.1834592],[3.5,1.1709613],[3.55,1.1586407],[3.6,1.1464924],[3.65,1.1345117],[3.7,1.122694],[3.75,1.1110349],[3.8,1.0995302],[3.85,1.088176],[3.9,1.0769682],[3.95,1.0659032],[4.0,1.0549774],[4.05,1.0441874],[4.1,1.0335297],[4.15,1.0230012],[4.2,1.0125988],[4.25,1.0023196],[4.3,0.9921605],[4.35,0.9821189],[4.4,0.9721921],[4.45,0.9623774],[4.5,0.9526724],[4.55,0.9430746],[4.6,0.9335818],[4.65,0.9241915],[4.7,0.9149017],[4.75,0.9057102],[4.8,0.8966149],[4.85,0.8876139],[4.9,0.8787053],[4.95,0.869887],[5.0,0.8611574]],"c":"force4","w":2.2},{"t":"text","p":[637.8,214.2],"s":"σ = 50 g/m²","c":"force4","size":10,"a":"end"},{"t":"circle","p":[200,236.7,5],"c":"accent"},{"t":"text","p":[210,240.7],"s":"IKAROS, spinta misurata","c":"accent","size":10,"a":"start"}]}
---
Accelerazione di una vela ideale, perfettamente riflettente e perpendicolare alla luce, in funzione della distanza dal Sole per densità superficiali di $5$, $10$ e $50$ g/m². La scala è logaritmica. Il modello del laboratorio dell'unità calcola la stessa curva.
:::

Con $\sigma=10$ g/m², che comprende la vela e il carico, l'accelerazione caratteristica è circa $0{,}91$ mm/s². Sembra poco, ma in un giorno la velocità aumenta di circa $78$ m/s e in un anno di quasi $29$ km/s, se la vela restasse a una unità astronomica. Le vele reali sono più pesanti, perché portano strutture, elettronica e strumenti, e raggiungono accelerazioni minori.

La prima vela solare in volo interplanetario è stata IKAROS dell'agenzia spaziale giapponese JAXA, lanciata il 21 maggio 2010 verso Venere. La sua vela quadrata di $14$ m di lato, con un'area di $196$ m², ruotava su se stessa per restare tesa e portava celle solari a film sottile. Il 9 luglio 2010 JAXA annunciò di aver misurato, con il tracciamento Doppler della sonda, una spinta di $1{,}12$ mN, pari al valore atteso. Per una sonda di circa $315$ kg l'accelerazione è circa $3{,}6\cdot10^{-6}$ m/s²: la densità superficiale complessiva è alta, circa $1{,}6$ kg/m², perché il corpo della sonda pesa molto più della vela. La spinta misurata è circa il $63$ per cento di quella di una vela ideale della stessa area a una unità astronomica, una differenza che si spiega con la riflessione imperfetta della membrana e con la sua inclinazione rispetto ai raggi del Sole.

Nel 2019 la Planetary Society ha lanciato LightSail 2, un piccolo satellite di circa $5$ kg con una vela di Mylar di $32$ m² spessa $4{,}5$ μm. Dopo l'apertura della vela, il 23 luglio 2019, il satellite ha alzato il punto più alto della propria orbita di circa $1{,}7$ km in quattro giorni, orientando la vela verso il Sole in una metà dell'orbita e di taglio nell'altra. È stata la prima dimostrazione di volo a vela in orbita terrestre; il satellite è rientrato nell'atmosfera il 17 novembre 2022, dopo tre anni e mezzo. Nell'aprile 2024 la NASA ha lanciato ACS3, un piccolo satellite che nell'agosto dello stesso anno ha aperto una vela di circa $80$ m² sostenuta da quattro bracci di materiale composito lunghi $7$ m, più leggeri e più stabili dei bracci metallici delle vele precedenti.

## La polarizzazione {#polarizzazione}

In un'onda piana il campo elettrico oscilla lungo una direzione fissa: l'onda è **polarizzata linearmente**, e il piano che contiene il campo elettrico e la direzione di propagazione si chiama piano di polarizzazione. La luce di una lampadina o del Sole è invece la somma di moltissime onde emesse da atomi indipendenti, con direzioni del campo che cambiano a caso in tempi brevissimi: è **non polarizzata**.

Un **polarizzatore** è un materiale che trasmette soltanto la componente del campo elettrico parallela a una direzione, il suo asse. La luce non polarizzata che lo attraversa perde metà dell'intensità e ne esce polarizzata lungo l'asse. Se invece la luce è già polarizzata e il suo campo forma un angolo $\theta$ con l'asse, passa la componente $E\cos\theta$, e l'intensità, proporzionale al quadrato del campo, diventa

$$I=I_0\cos^2\theta .$$

È la **legge di Malus**, dal nome del fisico francese che la formulò nel 1809. Due polarizzatori con gli assi perpendicolari spengono la luce; inserendone un terzo inclinato di $45°$ fra i due, una parte della luce torna a passare, perché ogni polarizzatore proietta il campo sulla propria direzione. La figura 6 mostra l'andamento.

::: figura malus
{"w":760,"h":285,"items":[{"t":"axes","o":[90,250],"x":[660,"angolo θ, gradi"],"y":[220,"I/I₀"],"sx":3.4,"sy":200,"xt":[[0,"0"],[45,"45"],[90,"90"],[135,"135"]],"yt":[[0,"0"],[0.5,"0,5"],[1,"1"]]},{"t":"plot","o":[90,250],"sx":3.4,"sy":200,"pts":[[0,1.0],[2,0.998782],[4,0.995134],[6,0.9890738],[8,0.9806308],[10,0.9698463],[12,0.9567727],[14,0.9414738],[16,0.924024],[18,0.9045085],[20,0.8830222],[22,0.8596699],[24,0.8345653],[26,0.8078307],[28,0.7795965],[30,0.75],[32,0.7191856],[34,0.6873033],[36,0.6545085],[38,0.6209609],[40,0.5868241],[42,0.5522642],[44,0.5174497],[46,0.4825503],[48,0.4477358],[50,0.4131759],[52,0.3790391],[54,0.3454915],[56,0.3126967],[58,0.2808144],[60,0.25],[62,0.2204035],[64,0.1921693],[66,0.1654347],[68,0.1403301],[70,0.1169778],[72,0.0954915],[74,0.075976],[76,0.0585262],[78,0.0432273],[80,0.0301537],[82,0.0193692],[84,0.0109262],[86,0.004866],[88,0.001218],[90,0.0],[92,0.001218],[94,0.004866],[96,0.0109262],[98,0.0193692],[100,0.0301537],[102,0.0432273],[104,0.0585262],[106,0.075976],[108,0.0954915],[110,0.1169778],[112,0.1403301],[114,0.1654347],[116,0.1921693],[118,0.2204035],[120,0.25],[122,0.2808144],[124,0.3126967],[126,0.3454915],[128,0.3790391],[130,0.4131759],[132,0.4477358],[134,0.4825503],[136,0.5174497],[138,0.5522642],[140,0.5868241],[142,0.6209609],[144,0.6545085],[146,0.6873033],[148,0.7191856],[150,0.75],[152,0.7795965],[154,0.8078307],[156,0.8345653],[158,0.8596699],[160,0.8830222],[162,0.9045085],[164,0.924024],[166,0.9414738],[168,0.9567727],[170,0.9698463],[172,0.9806308],[174,0.9890738],[176,0.995134],[178,0.998782],[180,1.0]],"c":"force2","w":2.4},{"t":"plot","o":[90,250],"sx":3.4,"sy":200,"pts":[[0,0.5],[180,0.5]],"c":"muted","w":1.8,"dash":true},{"t":"circle","p":[243.0,150.0,4],"c":"force"},{"t":"circle","p":[396.0,250,4],"c":"force"},{"t":"text","p":[251.0,140.0],"s":"45°: metà","c":"force","size":10,"a":"start"},{"t":"text","p":[396.0,142.0],"s":"luce non polarizzata","c":"muted","size":10},{"t":"text","p":[430.0,228.0],"s":"polarizzatori incrociati","c":"force","size":10,"a":"start"}]}
---
Legge di Malus: frazione della luce polarizzata trasmessa da un polarizzatore in funzione dell'angolo fra il piano di polarizzazione e l'asse. A $45°$ passa metà dell'intensità, a $90°$ nulla. Per luce non polarizzata la frazione trasmessa è $1/2$ a ogni angolo.
:::

La luce del cielo è parzialmente polarizzata. Le molecole dell'aria diffondono la luce del Sole, più quella blu che quella rossa, e la luce diffusa ad angolo retto rispetto ai raggi solari è polarizzata perché gli elettroni delle molecole oscillano perpendicolarmente alla direzione di arrivo e non irraggiano lungo la propria direzione di oscillazione. Per questo, con occhiali polarizzati, il cielo appare più scuro in una fascia a $90°$ dal Sole. Molti insetti, fra cui le api, percepiscono questa polarizzazione e la usano per orientarsi anche quando il Sole è nascosto.

In astronomia la polarizzazione è un'informazione preziosa. Nel 1949 William Hiltner e John Hall scoprirono indipendentemente che la luce di stelle lontane è polarizzata di qualche per cento, e che la direzione di polarizzazione è simile per stelle vicine nel cielo: i granelli allungati della polvere interstellare si allineano con il campo magnetico della Galassia e assorbono meglio la luce con il campo elettrico parallelo al loro asse lungo. La polarizzazione della luce stellare e dell'emissione infrarossa della polvere, mappata dal satellite Planck, serve oggi a ricostruire il campo magnetico galattico. Anche la radiazione cosmica di fondo è debolmente polarizzata, e la misura di questa polarizzazione, ottenuta per la prima volta nel 2002, è uno degli strumenti principali della cosmologia.

## Un'esperienza: la legge di Malus con lo schermo del telefono {#esperienza}

Gli schermi a cristalli liquidi di molti computer portatili, monitor e telefoni emettono luce polarizzata linearmente, perché il loro funzionamento si basa su due polarizzatori incrociati con uno strato di cristalli liquidi in mezzo. Con un paio di occhiali da sole polarizzati, o con una lente polarizzata di una macchina fotografica, si può verificare la legge di Malus senza strumenti di laboratorio.

::: metodo La legge di Malus con uno schermo
1. Mostrare sullo schermo un'immagine bianca uniforme e abbassare la luce della stanza.
2. Guardare lo schermo attraverso una lente degli occhiali e ruotare gli occhiali davanti agli occhi: in una posizione lo schermo appare luminoso, ruotando di $90°$ diventa quasi nero. Se lo schermo resta luminoso a ogni angolo, il produttore ha aggiunto uno strato che rende circolare la polarizzazione, una scelta adottata in alcuni telefoni proprio perché lo schermo resti leggibile con gli occhiali da sole; in quel caso conviene usare un altro dispositivo, per esempio il monitor di un computer.
3. Con un secondo telefono come misuratore di luce, usando un'applicazione che legge il sensore di luminosità, appoggiare la lente sul sensore e puntarlo verso lo schermo a distanza fissa.
4. Ruotare la lente a passi di $15°$, da $0°$ a $90°$, segnando l'angolo con un goniometro di carta, e registrare la lettura del sensore. Ripetere la misura senza la lente per avere l'intensità di riferimento, e con lo schermo spento per il fondo.
5. Sottrarre il fondo, dividere ogni lettura per il massimo e confrontare i valori con $\cos^2\theta$. Le misure dovrebbero seguire la legge entro qualche per cento, salvo vicino a $90°$, dove la polarizzazione imperfetta lascia passare un poco di luce.
6. Inclinare infine la lente di circa $45°$ e guardare il cielo azzurro lontano dal Sole, senza mai guardare il Sole: ruotando la lente, la luminosità del cielo cambia, segno che anche la luce diffusa dall'aria è polarizzata.
:::

L'esperienza mostra due fatti: lo schermo emette luce polarizzata, e un polarizzatore trasmette la componente del campo lungo il proprio asse. Il rapporto fra la luce trasmessa nella posizione migliore e la luce senza lente dovrebbe essere vicino a uno per la luce dello schermo e vicino a un mezzo per una lampada a incandescenza, che emette luce non polarizzata.

## Errori frequenti {#errori}

::: errore Pensare che il campo magnetico dell'onda sia trascurabile
Il campo magnetico di un'onda luminosa, misurato in tesla, sembra minuscolo rispetto al campo elettrico in volt al metro, ma le due densità di energia sono uguali e il campo magnetico è indispensabile per la propagazione e per la pressione di radiazione. Il confronto fra numeri con unità diverse è privo di significato.
:::

::: errore Applicare la legge dell'inverso del quadrato a un fascio collimato
La legge $I=L/(4\pi d^2)$ vale per una sorgente che irraggia in tutte le direzioni. Un fascio laser ben collimato si allarga molto meno, e la sua intensità diminuisce lentamente finché la diffrazione non lo apre; anche un faro o un'antenna direzionale concentrano la potenza in un angolo solido piccolo.
:::

::: errore Dimenticare il fattore due della riflessione
Una superficie che riflette la luce riceve una pressione doppia di quella che la assorbe, perché la quantità di moto della luce si inverte. Per una vela solare questo fattore conta: una vela nera avrebbe metà della spinta e si scalderebbe molto di più.
:::

::: errore Credere che la pressione della luce spinga le code delle comete in modo uniforme
La coda di ioni è spinta dal vento solare e segue la sua direzione, quasi radiale; la coda di polvere risponde alla pressione della luce e all'orbita di ciascun granello, e si incurva. Una cometa luminosa mostra spesso le due code separate.
:::

::: errore Pensare che un polarizzatore aggiunga qualcosa alla luce
Un polarizzatore toglie le componenti del campo perpendicolari al proprio asse: l'intensità trasmessa è sempre minore o uguale a quella incidente. Il terzo polarizzatore inclinato fra due incrociati sembra creare luce, ma in realtà cambia la direzione del campo che arriva al secondo, e ciascun filtro continua a togliere luce.
:::

## Sintesi {#sintesi}

::: sintesi In breve
- La luce è un'onda elettromagnetica trasversale: campo elettrico e campo magnetico oscillano in fase, perpendicolari fra loro e alla direzione di propagazione, con $E/B=c$ e $c=1/\sqrt{\mu_0\varepsilon_0}$.
- Lo spettro va dalle onde radio ai raggi gamma; l'atmosfera lascia passare le finestre ottica e radio, e le altre bande si osservano dallo spazio.
- L'energia viaggia con il vettore di Poynting; l'intensità di un'onda è $I=E_m^2/(2c\mu_0)$.
- Una sorgente isotropa produce $I=L/(4\pi d^2)$: dalla costante solare, $1361$ W/m², si ottiene la luminosità del Sole, $3{,}83\cdot10^{26}$ W.
- La luce trasporta quantità di moto: la pressione vale $I/c$ su una superficie che assorbe e $2I/c$ su una che riflette.
- Per la polvere il rapporto $\beta$ fra spinta della luce e gravità non dipende dalla distanza; i granelli sotto il mezzo micrometro lasciano il sistema solare, e le comete mostrano una coda di polvere distinta da quella di ioni.
- Una vela solare ideale ha accelerazione $2S_0/(c\sigma)$ a una unità astronomica; IKAROS, LightSail 2 e ACS3 hanno dimostrato il volo a vela.
- Un polarizzatore trasmette $I_0\cos^2\theta$ della luce polarizzata e metà della luce non polarizzata; la polarizzazione della luce del cielo, delle stelle e del fondo cosmico porta informazioni su diffusione, polvere e campi magnetici.
:::

## Glossario {#glossario}

- **Onda elettromagnetica**: perturbazione dei campi elettrico e magnetico che si propaga nel vuoto alla velocità $c$.
- **Spettro elettromagnetico**: insieme delle onde elettromagnetiche ordinate per lunghezza d'onda o frequenza.
- **Finestra atmosferica**: intervallo di lunghezze d'onda per cui l'atmosfera è trasparente.
- **Vettore di Poynting**: vettore $\vec E\times\vec B/\mu_0$ che descrive il flusso di energia di un'onda.
- **Intensità**: potenza media trasportata per unità di superficie perpendicolare alla propagazione.
- **Luminosità**: potenza totale emessa da una stella.
- **Costante solare**: intensità della luce solare a una unità astronomica, fuori dall'atmosfera.
- **Pressione di radiazione**: pressione esercitata dalla luce su una superficie che la assorbe o la riflette.
- **Rapporto β**: rapporto fra la spinta della luce e la gravità per un granello di polvere.
- **Effetto Poynting-Robertson**: perdita di momento angolare di un granello che assorbe e riemette luce, che lo porta a spiraleggiare verso il Sole.
- **Vela solare**: membrana riflettente che usa la pressione della luce come propulsione.
- **Accelerazione caratteristica**: accelerazione di una vela perpendicolare al Sole a una unità astronomica.
- **Polarizzazione**: direzione di oscillazione del campo elettrico di un'onda.
- **Legge di Malus**: legge $I=I_0\cos^2\theta$ per la luce polarizzata che attraversa un polarizzatore.

## Esercizi {#esercizi}

::: esercizio La luce del Sole su Marte [base]
Marte orbita in media a $1{,}52$ UA dal Sole. Calcolare l'intensità della luce solare alla sua distanza e l'ampiezza del campo elettrico dell'onda.
>>> soluzione
Si applica la legge dell'inverso del quadrato:

$$I=\frac{1361}{1{,}52^2}\ {\rm W/m^2}\approx589\ {\rm W/m^2}.$$

L'ampiezza del campo vale $E_m=\sqrt{2I/(c\varepsilon_0)}\approx666$ V/m, circa due terzi di quella a una unità astronomica.
:::

::: esercizio Frequenze e lunghezze d'onda [base]
La riga dell'idrogeno neutro ha frequenza $1420{,}4$ MHz; la luce verde ha lunghezza d'onda $550$ nm. Calcolare la lunghezza d'onda della prima e la frequenza della seconda.
>>> soluzione
Da $\lambda f=c$ si ottiene $\lambda=c/f\approx0{,}211$ m, cioè circa $21$ cm, per la riga dell'idrogeno, e $f=c/\lambda\approx5{,}45\cdot10^{14}$ Hz per la luce verde. Le due onde differiscono di un fattore circa quattrocentomila in frequenza.
:::

::: esercizio La luminosità di una stella [base]
Una stella a $10$ pc, cioè $3{,}086\cdot10^{17}$ m, produce fuori dall'atmosfera un flusso di $1{,}0\cdot10^{-9}$ W/m². Calcolarne la luminosità in watt e in luminosità solari.
>>> soluzione
Si moltiplica il flusso per l'area della sfera di raggio $d$:

$$L=4\pi d^2F\approx1{,}2\cdot10^{27}\ {\rm W},$$

cioè circa $3{,}1$ volte la luminosità del Sole, $3{,}83\cdot10^{26}$ W.
:::

::: esercizio La spinta su un pannello solare [base]
Un pannello solare di $10$ m² assorbe tutta la luce del Sole a una unità astronomica, perpendicolare ai raggi. Calcolare la forza dovuta alla pressione della luce.
>>> soluzione
La pressione vale $I/c=1361/(2{,}998\cdot10^8)\approx4{,}54\cdot10^{-6}$ Pa; moltiplicata per l'area dà $F\approx4{,}5\cdot10^{-5}$ N, il peso a terra di circa cinque milligrammi.
:::

::: esercizio Due polarizzatori [base]
Luce non polarizzata di intensità $I_0$ attraversa due polarizzatori i cui assi formano un angolo di $60°$. Quale frazione dell'intensità esce?
>>> soluzione
Il primo polarizzatore trasmette metà della luce, che esce polarizzata lungo il suo asse. Il secondo trasmette, per la legge di Malus, la frazione $\cos^260°=1/4$. In tutto passa $I_0/8$, il $12{,}5$ per cento.
:::

::: esercizio Il ritardo della luce [base]
Calcolare quanto tempo impiega la luce a percorrere una unità astronomica e la distanza media di Nettuno dal Sole, $30{,}07$ UA.
>>> soluzione
Si divide la distanza per $c$: $1{,}496\cdot10^{11}/2{,}998\cdot10^8\approx499$ s, poco più di otto minuti. Per Nettuno il tempo è $30{,}07$ volte maggiore, circa $1{,}50\cdot10^4$ s, quasi quattro ore e dieci minuti.
:::

::: esercizio La Luna spinta dalla luce [medio]
La Luna ha raggio $1737$ km e massa $7{,}35\cdot10^{22}$ kg. Calcolare la forza della luce solare sulla Luna, considerata come un disco che assorbe tutto, e confrontarla con l'attrazione gravitazionale del Sole, a una unità astronomica.
>>> soluzione
Si moltiplica la pressione per la sezione del disco:

$$\begin{aligned}F_{\rm rad}&=\frac{1361}{c}\,\pi(1{,}737\cdot10^6)^2\\&\approx4{,}3\cdot10^{7}\ {\rm N}.\end{aligned}$$

La gravità vale $GM_\odot m/r^2\approx4{,}4\cdot10^{20}$ N: il rapporto è circa $10^{-13}$, e la pressione della luce non ha alcun effetto apprezzabile sull'orbita della Luna.
:::

::: esercizio Quali granelli escono [medio]
Con $\beta\approx0{,}57/(\rho s)$, $\rho$ in g/cm³ e $s$ in μm, calcolare $\beta$ per granelli di silicato con $\rho=2{,}5$ g/cm³ di raggio $1$ μm e $0{,}3$ μm. Quale dei due lascia il sistema solare se viene liberato da un asteroide in orbita circolare?
>>> soluzione
Si ottiene $\beta\approx0{,}23$ per il granello di $1$ μm e $\beta\approx0{,}76$ per quello di $0{,}3$ μm. La soglia per un corpo liberato da un'orbita circolare è $\beta=1/2$: lascia il sistema solare soltanto il granello più piccolo.
:::

::: esercizio La polvere della fascia degli asteroidi [medio]
Un granello con $\beta=0{,}05$ si trova su un'orbita circolare a $2{,}5$ UA, nella fascia degli asteroidi. Stimare il tempo di caduta sul Sole per effetto Poynting-Robertson.
>>> soluzione
Si usa la stima del testo:

$$t\approx\frac{400\ {\rm anni}}{0{,}05}\cdot2{,}5^2=5{,}0\cdot10^{4}\ {\rm anni}.$$

Il tempo è breve rispetto all'età del sistema solare: la polvere zodiacale deve essere prodotta di continuo.
:::

::: esercizio Cento giorni di IKAROS [medio]
IKAROS, di massa $315$ kg, riceveva dalla luce una spinta di $1{,}12$ mN. Calcolare l'accelerazione e la variazione di velocità in cento giorni, supponendo la spinta costante.
>>> soluzione
L'accelerazione vale $a=F/m\approx3{,}56\cdot10^{-6}$ m/s². In cento giorni, $8{,}64\cdot10^6$ s, la velocità cambia di circa $31$ m/s. È poco per una sonda interplanetaria, ma ottenuto senza consumare propellente.
:::

::: esercizio Una vela che annulla il Sole [medio]
Per quale densità superficiale $\sigma$ una vela ideale perpendicolare al Sole riceve una spinta uguale all'attrazione gravitazionale? Usare $L_\odot=3{,}828\cdot10^{26}$ W e $GM_\odot=1{,}327\cdot10^{20}$ m³/s².
>>> soluzione
La spinta per unità di area è $2L_\odot/(4\pi r^2c)$, la gravità per unità di area $\sigma GM_\odot/r^2$. Uguagliandole la distanza si semplifica:

$$\sigma=\frac{L_\odot}{2\pi c\,GM_\odot}\approx1{,}53\cdot10^{-3}\ {\rm kg/m^2},$$

circa $1{,}5$ grammi per metro quadrato, poco più di una pellicola di Mylar spessa un micrometro, che pesa circa $1{,}4$ g/m².
:::

::: esercizio Un puntatore più intenso del Sole [medio]
Un puntatore laser da $5$ mW produce un fascio di $2$ mm di diametro. Calcolare l'intensità e l'ampiezza del campo elettrico, e confrontarle con la luce solare a una unità astronomica.
>>> soluzione
L'intensità è la potenza divisa per l'area del fascio:

$$\begin{aligned}I&=\frac{5\cdot10^{-3}}{\pi(10^{-3})^2}\ {\rm W/m^2}\\&\approx1{,}6\cdot10^{3}\ {\rm W/m^2},\end{aligned}$$

poco più della luce solare. Il campo vale $E_m=\sqrt{2I/(c\varepsilon_0)}\approx1{,}1\cdot10^3$ V/m. Il fascio concentra però tutta questa intensità in un'unica direzione, e per questo non va mai guardato.
:::

::: esercizio La massa che il Sole perde in luce [avanzato]
Calcolare la massa che il Sole converte ogni secondo in radiazione, con $L_\odot=3{,}828\cdot10^{26}$ W, e la frazione della sua massa, $1{,}989\cdot10^{30}$ kg, persa in questo modo in $4{,}6$ miliardi di anni.
>>> soluzione
Dalla relazione fra energia e massa:

$$\frac{\Delta m}{\Delta t}=\frac{L_\odot}{c^2}\approx4{,}26\cdot10^{9}\ {\rm kg/s}.$$

In $4{,}6\cdot10^9$ anni, cioè $1{,}45\cdot10^{17}$ s, la massa persa è circa $6{,}2\cdot10^{26}$ kg, il $3\cdot10^{-4}$ della massa del Sole.
:::

::: esercizio I pannelli di Juno [avanzato]
I pannelli di Juno fornirebbero circa $14$ kW alla distanza della Terra. Stimare la potenza a $5{,}20$ UA e a $5{,}46$ UA, la distanza massima di Giove dal Sole, supponendo che il rendimento delle celle non cambi.
>>> soluzione
La potenza è proporzionale all'intensità, cioè all'inverso del quadrato della distanza: $14\,000/5{,}20^2\approx518$ W e $14\,000/5{,}46^2\approx470$ W. Il rendimento reale delle celle aumenta un poco al freddo e diminuisce con i danni da radiazione, e la potenza effettiva è di circa $500$ W.
:::

::: esercizio Molti polarizzatori [avanzato]
Luce non polarizzata attraversa un primo polarizzatore con l'asse a $0°$ e poi altri $N$ polarizzatori, ciascuno ruotato di $90°/N$ rispetto al precedente, così che l'ultimo è a $90°$ dal primo. Calcolare la frazione trasmessa per $N=1$ e $N=6$ e il limite per $N$ molto grande.
>>> soluzione
Dopo il primo polarizzatore resta $I_0/2$; ciascuno degli $N$ successivi trasmette $\cos^2(90°/N)$. Per $N=1$, con un solo passo di $90°$, la frazione è nulla: due polarizzatori incrociati spengono la luce. Per $N=6$ ci sono sei passi di $15°$ e

$$\frac{I}{I_0}=\frac12\cos^{12}15°\approx0{,}330.$$

Per $N$ grande ogni passo toglie una frazione dell'ordine di $(\pi/2N)^2$, la perdita totale, circa $\pi^2/(4N)$, tende a zero e la frazione tende a $1/2$: la polarizzazione viene ruotata quasi senza perdite.
:::

::: esercizio Una vela vicino al Sole [avanzato]
Una vela ideale con $\sigma=10$ g/m² si trova a $0{,}3$ UA dal Sole. Calcolare l'accelerazione dovuta alla luce, l'accelerazione di gravità del Sole a quella distanza e il loro rapporto.
>>> soluzione
L'accelerazione della luce cresce come $1/r^2$:

$$a=\frac{0{,}908\ {\rm mm/s^2}}{0{,}3^2}\approx10{,}1\ {\rm mm/s^2}.$$

La gravità vale $GM_\odot/r^2\approx6{,}6\cdot10^{-2}$ m/s². Il rapporto è circa $0{,}15$, lo stesso a ogni distanza e uguale a $1{,}53/10$, il rapporto fra la densità critica dell'esercizio precedente e quella della vela: la vela si comporta come se il Sole avesse il $15$ per cento di massa in meno.
:::

## Fonti {#fonti}

Il testo, le figure, gli esempi e gli esercizi di questo capitolo sono originali. Per la scelta e l'ordine degli argomenti il riferimento principale è D. Halliday, R. Resnick, J. Walker, *Fundamentals of Physics*, 12ª edizione estesa, Wiley, 2022, moduli 33.1 (onde elettromagnetiche), 33.2 (trasporto di energia e vettore di Poynting), 33.3 (pressione di radiazione) e 33.4 (polarizzazione); l'orientamento astrofisico e i dati provengono dalle fonti primarie seguenti.

1. J. C. Maxwell, *Philosophical Transactions of the Royal Society* 155, 459 (1865): la teoria dinamica del campo elettromagnetico; J. H. Poynting, *Philosophical Transactions of the Royal Society* 175, 343 (1884): il flusso di energia.
2. G. Kopp, J. L. Lean, *Geophysical Research Letters* 38, L01706 (2011): il nuovo valore dell'irradianza solare totale; A. Prša e collaboratori, *Astronomical Journal* 152, 41 (2016): i valori nominali della risoluzione B3 dell'Unione Astronomica Internazionale.
3. P. Lebedev, *Annalen der Physik* 6, 433 (1901), ed E. F. Nichols, G. F. Hull, *Physical Review* 13, 307 (1901): le prime misure della pressione di radiazione.
4. J. A. Burns, P. L. Lamy, S. Soter, *Icarus* 40, 1 (1979): il rapporto $\beta$ e l'effetto Poynting-Robertson; L. Biermann, *Zeitschrift für Astrophysik* 29, 274 (1951): le code di ioni e il vento solare.
5. JAXA, comunicato del 9 luglio 2010: la spinta misurata su IKAROS; D. A. Spencer e collaboratori, *Advances in Space Research* 67, 2878 (2021): la missione LightSail 2; NASA, comunicato del 29 agosto 2024: l'apertura della vela di ACS3.
6. NASA e Jet Propulsion Laboratory, cartella stampa di Juno (2016): superficie e potenza dei pannelli solari.
7. W. A. Hiltner, *Science* 109, 165 (1949), e J. S. Hall, *Science* 109, 166 (1949): la polarizzazione interstellare; Planck Collaboration, *Astronomy & Astrophysics* 576, A104 (2015): la polarizzazione dell'emissione della polvere; J. M. Kovac e collaboratori, *Nature* 420, 772 (2002): la prima rivelazione della polarizzazione del fondo cosmico.
