---
unit: physics-06
titolo: Forze e leggi di Newton
sottotitolo: Dalla descrizione del moto alle sue cause
volume: Volume di fisica
fonte: Dispensa di fisica, sezioni 2.1-2.6
---

## Prima di cominciare {#apertura}

Su questo pianeta il vento soffia per settimane sulle piane di sale, e gli esploratori si spostano con carri a vela: telai leggeri su tre ruote, con una vela rigida. Chi guida un carro impara presto alcune regole pratiche. Quando una raffica arriva, il carro scatta in avanti; quando il vento resta costante, il carro accelera sempre meno e infine procede a velocità quasi costante; un carro carico di strumenti risponde alla stessa raffica con più lentezza di uno vuoto. Per frenare serve spingere contro il suolo, e una frenata brusca proietta in avanti chi non è legato al sedile.

Queste osservazioni sono il materiale della dinamica. Nei capitoli di cinematica il moto veniva descritto: posizione, velocità e accelerazione come funzioni del tempo. Qui ci chiediamo perché la velocità cambia, e rispondiamo con tre principi formulati da Isaac Newton nel 1687, che ancora oggi permettono di progettare ponti, satelliti e carri a vela.

::: obiettivi
- riconoscere una forza come un'interazione fra due corpi e nominarne sempre l'agente;
- enunciare i tre principi della dinamica e il loro dominio di validità;
- usare la seconda legge in forma vettoriale e per componenti;
- distinguere massa e peso, e riconoscere peso, reazione normale, tensione e forza elastica;
- costruire un diagramma di corpo libero corretto e tradurlo in equazioni;
- risolvere problemi con corpi collegati, carrucole e ascensori;
- riconoscere gli errori concettuali più frequenti sulla forza e sul moto.
:::

Il capitolo presuppone il calcolo con i vettori e le loro componenti ([capitolo sui vettori](unit:physics-02)) e la descrizione del moto con accelerazione costante ([moto uniformemente accelerato](unit:physics-04)). L'attrito, i vincoli e i piani inclinati sono trattati nel capitolo successivo, [Attrito e vincoli](unit:physics-07); la quantità di moto e gli urti nel capitolo [Quantità di moto e urti](unit:physics-09).

## Dalla descrizione alla causa {#causa}

In cinematica un'accelerazione era un dato: un numero, o un vettore, che dice come cambia la velocità. In dinamica l'accelerazione diventa un indizio. Se la velocità di un corpo cambia, in modulo o in direzione, qualcosa nell'ambiente sta agendo su di esso: la strada, l'aria, una fune, una molla, la Terra, un altro corpo. La parola **forza** è il linguaggio con cui descriviamo queste azioni in modo quantitativo.

Questo punto di vista corregge un'idea molto diffusa, che gli storici chiamano *concezione dell'impeto*: la forza sarebbe qualcosa che un corpo riceve, porta con sé e consuma durante il moto, come il carburante in un serbatoio. Secondo questa idea un pallone calciato si muove perché contiene ancora un po' della forza del piede, e si ferma quando l'ha esaurita. L'idea è intuitiva, perché nell'esperienza quotidiana gli oggetti si fermano davvero quando smettiamo di spingerli. La meccanica di Newton la sostituisce con un'affermazione più precisa: la forza è necessaria per **cambiare** la velocità; per **mantenerla** costante non serve alcuna forza risultante. Il pallone si ferma perché agiscono l'attrito con l'erba e la resistenza dell'aria, che sono forze vere, esercitate da corpi precisi.

::: quotidiano Perché in automobile ci si inclina in avanti durante una frenata
Quando l'automobile rallenta, il sedile e la cintura esercitano forze sul corpo del passeggero e ne riducono la velocità. Il corpo tende a conservare il moto che aveva; senza cintura continuerebbe in avanti rispetto all'abitacolo. La sensazione di essere spinti in avanti è un effetto dell'inerzia del corpo e del vincolo che lo frena; nessun corpo esercita sul passeggero una forza diretta in avanti.
:::

La dinamica newtoniana poggia su tre principi. Il primo dice che cosa accade quando la somma delle forze è nulla; il secondo collega la somma delle forze all'accelerazione; il terzo afferma che le forze nascono sempre a coppie, perché sono interazioni fra due corpi. Prima di enunciarli conviene ripercorrere brevemente come si è arrivati a questa formulazione, perché parole oggi familiari come forza, massa e inerzia hanno acquistato un significato preciso soltanto dopo secoli di discussioni.

## Come è cambiata l'idea di forza {#storia}

::: storia Dal moto naturale all'impeto
Nella fisica di Aristotele (IV secolo a.C.) i moti terrestri erano di due tipi. Il moto naturale portava ogni corpo verso il suo luogo proprio: i gravi verso il basso, il fuoco verso l'alto. Il moto violento, come quello di un sasso lanciato, richiedeva invece un agente che lo mantenesse. Il sistema era coerente con le osservazioni disponibili, ma lasciava aperta una difficoltà: che cosa spinge il sasso dopo che ha lasciato la mano? Nel VI secolo Giovanni Filopono propose che il lanciatore trasmettesse al corpo una forza motrice incorporea; nel XIV secolo Giovanni Buridano sviluppò l'idea di *impeto*, una qualità acquisita dal corpo e proporzionale alla quantità di materia e alla velocità. L'impeto era un passo verso il concetto di quantità di moto, ma restava legato all'idea che il moto abbia bisogno di una causa che lo accompagni.
:::

::: figura linea-tempo
{"w":720,"h":175,"items":[
{"t":"line","p":[30,92,695,92],"c":"muted","w":2},
{"t":"line","p":[65,84,65,100],"c":"ax","w":2},{"t":"text","p":[65,74],"s":"IV sec. a.C.","c":"muted","size":12},{"t":"text","p":[65,120],"s":"Aristotele","size":14},{"t":"text","p":[65,140],"s":"moti naturali","c":"muted","size":12},
{"t":"line","p":[185,84,185,100],"c":"ax","w":2},{"t":"text","p":[185,74],"s":"VI sec.","c":"muted","size":12},{"t":"text","p":[185,120],"s":"Filopono","size":14},{"t":"text","p":[185,140],"s":"forza impressa","c":"muted","size":12},
{"t":"line","p":[305,84,305,100],"c":"ax","w":2},{"t":"text","p":[305,74],"s":"XIV sec.","c":"muted","size":12},{"t":"text","p":[305,120],"s":"Buridano","size":14},{"t":"text","p":[305,140],"s":"impeto","c":"muted","size":12},
{"t":"line","p":[430,84,430,100],"c":"force2","w":2},{"t":"text","p":[430,74],"s":"1638","c":"muted","size":12},{"t":"text","p":[430,120],"s":"Galileo","size":14},{"t":"text","p":[430,140],"s":"inerzia","c":"muted","size":12},
{"t":"line","p":[550,84,550,100],"c":"force2","w":2},{"t":"text","p":[550,74],"s":"1678","c":"muted","size":12},{"t":"text","p":[550,120],"s":"Hooke","size":14},{"t":"text","p":[550,140],"s":"forza elastica","c":"muted","size":12},
{"t":"line","p":[665,84,665,100],"c":"force","w":3},{"t":"text","p":[665,74],"s":"1687","c":"muted","size":12},{"t":"text","p":[665,120],"s":"Newton","size":14},{"t":"text","p":[665,140],"s":"tre leggi","c":"muted","size":12}
]}
---
Alcune tappe della storia dell'idea di forza. Le distanze sulla linea sono indicative: le prime tre tappe coprono quasi due millenni, le ultime tre mezzo secolo.
:::

::: storia Galileo e Newton
Galileo Galilei, nei *Discorsi e dimostrazioni matematiche intorno a due nuove scienze* (1638), studiò il moto lungo piani inclinati e arrivò a una conclusione decisiva: se si eliminano gli impedimenti, un corpo che si muove su un piano orizzontale conserva il proprio moto. Newton raccolse questi risultati nei *Philosophiae Naturalis Principia Mathematica* (1687), dove enunciò tre *leges motus*, leggi del moto, valide per i corpi sulla Terra e per i pianeti nel cielo. La prima legge, in latino, recita: *Corpus omne perseverare in statu suo quiescendi vel movendi uniformiter in directum, nisi quatenus a viribus impressis cogitur statum illum mutare*, cioè ogni corpo persevera nel suo stato di quiete o di moto rettilineo uniforme, a meno che sia costretto a cambiarlo da forze impresse.
:::

La formulazione dei *Principia* differisce dalla notazione $\sum\vect F=m\vect a$ dei manuali moderni. Newton enunciò la seconda legge come una proporzionalità fra il *cambiamento del moto* e la forza motrice impressa, e la usò dentro una trattazione geometrica: *Mutationem motus proportionalem esse vi motrici impressae, et fieri secundum lineam rectam qua vis illa imprimitur*. La forma vettoriale che useremo è una riformulazione successiva, resa possibile dallo sviluppo del calcolo differenziale e del linguaggio delle componenti nel Settecento. Distinguere il testo storico dalla presentazione moderna evita di attribuire a Newton formule nel significato che hanno oggi.

Anche la nozione di massa si è precisata lentamente. Nella pratica sperimentale si imparò a distinguere la massa, che misura la resistenza di un corpo a cambiare velocità, dal peso, che è la forza con cui la Terra lo attrae. In questo capitolo useremo l'equivalenza fra massa inerziale e massa gravitazionale come un fatto sperimentale; la sua interpretazione profonda appartiene alla relatività generale, che qui non affrontiamo.

## Sistema, ambiente e interazioni {#sistema}

Prima di scrivere un'equazione bisogna decidere **che cosa** si studia. L'oggetto o l'insieme di oggetti scelto si chiama **sistema**; tutto ciò che resta fuori è l'**ambiente**. Una forza esterna rappresenta un'interazione fra sistema e ambiente; una forza interna, un'interazione fra due parti del sistema.

La scelta del sistema non cambia la fisica, cambia quali forze compaiono nelle equazioni. Consideriamo un carro a vela che traina un rimorchio con una barra. Se il sistema è il solo rimorchio, la forza della barra è esterna e compare nell'equazione del moto del rimorchio. Se il sistema è l'insieme carro più rimorchio, la stessa forza diventa interna: la barra tira il rimorchio in avanti e il carro all'indietro, e nella somma delle forze sull'insieme le due azioni si cancellano. Restano esterne la spinta del vento sulla vela, il peso, le forze del suolo sulle ruote.

::: definizione Forza
Una **forza** è una grandezza vettoriale che descrive l'azione di un corpo su un altro. Ha un modulo, misurato in newton (N), una direzione, un verso e un punto di applicazione. Ogni forza ha un **agente**, il corpo che la esercita, e un **paziente**, il corpo che la subisce.
:::

::: metodo Ogni forza deve avere un agente
Si può sempre nominare una forza reale dicendo chi agisce su chi: forza della Terra sul libro, forza del tavolo sul libro, forza della fune sul blocco. Espressioni come «forza del movimento», «forza dell'inerzia» o «forza che porta avanti il pallone» non indicano alcun agente e di solito nascondono un errore. Chiedersi quale oggetto esercita una forza è il controllo di coerenza più efficace della dinamica.
:::

### Forze di contatto e forze a distanza {#contatto-distanza}

Alcune forze richiedono il contatto fra i corpi: la spinta di una mano, la tensione di una fune, l'attrito, la reazione di un tavolo, la resistenza dell'aria. Altre agiscono a distanza: il peso, la forza fra due magneti, la forza fra due cariche elettriche. La distinzione è utile nella pratica, ma la fisica moderna mostra che tutte le forze conosciute derivano da quattro **interazioni fondamentali**: gravitazionale, elettromagnetica, nucleare forte e nucleare debole.

Le forze di contatto della vita quotidiana sono, a livello microscopico, interazioni elettromagnetiche fra gli elettroni e i nuclei degli atomi delle due superfici. Quando un libro poggia su un tavolo, gli atomi del tavolo si deformano di una quantità minuscola e respingono quelli del libro. Il modello macroscopico ignora questi dettagli e sostituisce l'insieme delle interazioni con una sola forza, la reazione normale. È un esempio di ciò che la fisica fa continuamente: scegliere il livello di descrizione adatto alla domanda.

| Interazione | Agisce su | Esempi nel capitolo |
|---|---|---|
| gravitazionale | tutti i corpi dotati di massa | peso, attrazione Terra-mela |
| elettromagnetica | cariche elettriche e correnti | normale, tensione, attrito, forza elastica |
| nucleare forte | nuclei e particelle che li compongono | nessuno: agisce a scale di $10^{-15}\un{m}$ |
| nucleare debole | particelle elementari | nessuno: responsabile di alcuni decadimenti radioattivi |

## La forza come vettore {#vettore}

Una forza si misura con un **dinamometro**: una molla tarata che si allunga in proporzione alla forza applicata, come vedremo con la [legge di Hooke](#elastica). Esperienze con due o più dinamometri mostrano che le forze si combinano come vettori: l'effetto di più forze applicate allo stesso corpo è uguale all'effetto di una sola forza, la **risultante**, ottenuta con la regola del parallelogramma.

$$
\vect F_{\mathrm{ris}}=\sum_i \vect F_i=\vect F_1+\vect F_2+\dots+\vect F_n
$$

Questa proprietà si chiama **principio di sovrapposizione** delle forze. Si tratta di un fatto sperimentale, verificato con grande precisione per le forze della meccanica; la definizione di forza da sola non lo implica. In un piano cartesiano la somma si esegue componente per componente:

$$
F_{\mathrm{ris},x}=\sum_i F_{i,x},\qquad F_{\mathrm{ris},y}=\sum_i F_{i,y},\qquad F_{\mathrm{ris}}=\sqrt{F_{\mathrm{ris},x}^{2}+F_{\mathrm{ris},y}^{2}}.
$$

::: figura somma-forze
{"w":560,"h":300,"items":[
{"t":"arrow","p":[100,235,500,235],"c":"muted","w":1.4,"head":9},{"t":"text","p":[505,252],"s":"x","c":"muted","size":13},
{"t":"arrow","p":[120,255,120,40],"c":"muted","w":1.4,"head":9},{"t":"text","p":[132,48],"s":"y","c":"muted","size":13},
{"t":"line","p":[320,235,395,105.1],"c":"muted","dash":true},{"t":"line","p":[195,105.1,395,105.1],"c":"muted","dash":true},
{"t":"line","p":[395,105.1,395,235],"c":"force3","dash":true,"w":1.6},
{"t":"text","p":[412,175],"s":"R","sub":"y","c":"force3","v":true},
{"t":"text","p":[365,256],"s":"R","sub":"x","c":"force3","v":true},
{"t":"arrow","p":[120,235,320,235],"c":"force2","s":"F","sub":"1","off":[-40,22]},
{"t":"arrow","p":[120,235,195,105.1],"c":"force2","s":"F","sub":"2","off":[-26,-2]},
{"t":"arrow","p":[120,235,395,105.1],"c":"force","s":"R","off":[16,-6]},
{"t":"arc","p":[120,235],"r":34,"a":[0,60],"s":"60°","c":"muted"}
]}
---
Due forze applicate allo stesso punto, $F_1=20\un{N}$ lungo $x$ e $F_2=15\un{N}$ inclinata di $60^\circ$, e la loro risultante $\vect R$ costruita con la regola del parallelogramma. Le linee verdi mostrano le componenti di $\vect R$.
:::

::: esempio Risultante di due forze oblique
Su un carrello di massa $m=5{,}0\un{kg}$, appoggiato su un piano orizzontale senza attrito, agiscono due forze orizzontali: $F_1=20\un{N}$ lungo l'asse $x$ e $F_2=15\un{N}$ a $60^\circ$ dall'asse $x$ (figura precedente). Calcoliamo la risultante.

Le componenti sono $F_{1x}=20\un{N}$, $F_{1y}=0$, $F_{2x}=15\cos 60^\circ=7{,}5\un{N}$, $F_{2y}=15\sin 60^\circ\approx 12{,}99\un{N}$. Sommando:

$$
R_x=27{,}5\un{N},\qquad R_y\approx 12{,}99\un{N},\qquad R=\sqrt{27{,}5^2+12{,}99^2}\approx 30{,}4\un{N}.
$$

La risultante forma con l'asse $x$ l'angolo $\theta=\arctan(12{,}99/27{,}5)\approx 25{,}3^\circ$. Con la seconda legge, che vedremo fra poco, l'accelerazione del carrello ha la stessa direzione e modulo $a=R/m\approx 6{,}08\un{m/s^2}$.
:::

::: errore Sommare i moduli
Due forze di $20\un{N}$ e $15\un{N}$ non danno in generale una risultante di $35\un{N}$. Il valore $35\un{N}$ si ottiene solo se le forze sono parallele e concordi; se sono opposte la risultante vale $5\un{N}$; in tutti gli altri casi è compresa fra questi due valori e si calcola con le componenti.
:::

## Primo principio: l'inerzia {#primo-principio}

::: legge Primo principio della dinamica (principio di inerzia)
In un sistema di riferimento inerziale, un corpo sul quale la risultante delle forze è nulla resta in quiete o si muove di moto rettilineo uniforme.
$$
\sum\vect F=\vect 0\quad\Longleftrightarrow\quad \vect v=\text{costante}.
$$
:::

L'enunciato comprende due situazioni che l'intuizione tende a separare: la quiete e il moto rettilineo uniforme. Per la dinamica sono lo stesso stato, perché in entrambi la velocità è costante. Un carro a vela fermo e un carro che scivola a velocità costante su una piana perfettamente liscia, senza vento, si trovano nella stessa condizione: nessuna forza risultante agisce su di essi.

### L'esperimento mentale di Galileo {#galileo}

Galileo arrivò a questa conclusione con un ragionamento sui piani inclinati. Una sfera lasciata rotolare lungo un piano risale su un secondo piano fino quasi alla quota di partenza; la piccola differenza dipende dagli attriti. Se si diminuisce l'inclinazione del secondo piano, la sfera percorre un tratto più lungo per raggiungere la stessa quota. Se il secondo piano diventa orizzontale, la sfera non può mai raggiungere la quota iniziale e, in assenza di attriti, dovrebbe proseguire indefinitamente.

::: figura galileo
{"w":720,"h":260,"items":[
{"t":"line","p":[30,62,700,62],"c":"muted","dash":true,"w":1.2},{"t":"text","p":[690,52],"s":"quota di partenza","c":"muted","size":12,"a":"end"},
{"t":"poly","pts":[[40,62],[240,212]],"c":"ax","w":2.4},
{"t":"poly","pts":[[240,212],[330,62]],"c":"force2","w":2},
{"t":"poly","pts":[[240,212],[430,62]],"c":"force2","w":2},
{"t":"poly","pts":[[240,212],[620,62]],"c":"force2","w":2},
{"t":"arrow","p":[240,212,700,212],"c":"force","w":2.4},{"t":"text","p":[600,236],"s":"piano orizzontale: il moto prosegue","c":"force","size":13},
{"t":"circle","p":[52,56,10],"c":"accent"},
{"t":"circle","p":[330,56,7],"c":"muted"},{"t":"circle","p":[430,56,7],"c":"muted"},{"t":"circle","p":[620,56,7],"c":"muted"},
{"t":"text","p":[110,170],"s":"discesa","c":"muted","size":12}
]}
---
L'esperimento mentale di Galileo. Su piani sempre meno inclinati la sfera percorre tratti sempre più lunghi per tornare alla quota di partenza; su un piano orizzontale, senza attriti, non avrebbe motivo di fermarsi.
:::

Il ragionamento di Galileo è un **esperimento mentale**: nessun piano reale è privo di attrito. Il suo valore sta nell'estrapolazione da una serie di esperienze reali verso una situazione limite. Oggi possiamo avvicinarci a quella situazione con una rotaia a cuscino d'aria, nella quale un carrello galleggia su un sottile strato d'aria e percorre l'intera rotaia rallentando pochissimo.

### Sistemi di riferimento inerziali {#inerziali}

Il primo principio fa anche un'altra cosa, spesso trascurata: **definisce** i sistemi di riferimento nei quali valgono le leggi della dinamica. Un sistema di riferimento è **inerziale** se in esso un corpo isolato, lontano da ogni altro corpo, non accelera. Ogni sistema che si muove di moto rettilineo uniforme rispetto a un sistema inerziale è a sua volta inerziale; un sistema che accelera rispetto a esso non lo è.

Su un autobus che frena, una bottiglia appoggiata sul pavimento scivola in avanti senza che alcun corpo la spinga. Per un osservatore a terra la spiegazione è semplice: la bottiglia conserva la sua velocità mentre l'autobus rallenta sotto di lei. Per un passeggero seduto, che usa l'autobus come riferimento, la bottiglia accelera senza alcuna forza: l'autobus che frena è un riferimento non inerziale, e lì il primo principio non vale nella forma enunciata.

::: approfondimento Quanto è inerziale la Terra?
La Terra ruota su se stessa, quindi un riferimento solidale con il suolo è in senso stretto non inerziale. Possiamo stimare quanto. Un punto dell'equatore descrive una circonferenza di raggio $R\approx 6{,}378\times10^{6}\un{m}$ con velocità angolare $\omega\approx 7{,}292\times10^{-5}\un{rad/s}$, quindi ha un'accelerazione centripeta
$$
a_c=\omega^{2}R\approx\left(7{,}292\times10^{-5}\right)^{2}\cdot 6{,}378\times10^{6}\approx 0{,}034\un{m/s^2},
$$
circa lo $0{,}35\%$ dell'accelerazione di gravità. Per un esperimento di laboratorio che dura pochi secondi l'effetto è trascurabile, e trattiamo il suolo come un riferimento inerziale. Diventa invece visibile nei moti che durano ore o si estendono su grandi distanze: la rotazione del piano di oscillazione del pendolo di Foucault, la deviazione delle grandi correnti d'aria e marine, la traiettoria dei proiettili a lunga gittata.
:::

::: esempio Un disco da hockey sul ghiaccio
Un disco da hockey scivola sul ghiaccio a $12\un{m/s}$. Durante il tratto in cui l'attrito e la resistenza dell'aria sono trascurabili, quali forze agiscono sul disco e che cosa succede alla sua velocità?

Sul disco agiscono il peso, verso il basso, e la reazione normale del ghiaccio, verso l'alto. Il disco non accelera in verticale, quindi le due forze hanno lo stesso modulo e la risultante è nulla. Per il primo principio la velocità resta costante: $12\un{m/s}$, nella stessa direzione. Non serve alcuna forza in avanti per mantenere il moto. Nella realtà il disco rallenta lentamente, e il rallentamento misura proprio l'attrito con il ghiaccio.
:::

::: errore Serve una forza per mantenere il moto
È l'errore più antico e più resistente della meccanica. Il corpo che si muove a velocità costante non ha bisogno di una forza in avanti; se lo spingiamo con una forza costante e la velocità resta costante, vuol dire che un'altra forza, di solito l'attrito, bilancia la nostra spinta. La risultante è nulla in entrambi i casi.
:::

## Secondo principio: forza, massa e accelerazione {#secondo-principio}

Il primo principio dice che cosa succede quando la risultante è nulla. Il secondo dice che cosa succede quando non lo è.

::: legge Secondo principio della dinamica
In un sistema di riferimento inerziale, l'accelerazione di un corpo di massa costante $m$ è proporzionale alla risultante delle forze che agiscono su di esso, ha la sua stessa direzione e lo stesso verso:
$$
\sum\vect F=m\,\vect a.
$$
:::

Tre osservazioni sono essenziali per usare bene questa equazione.

1. A sinistra compare la **risultante** di tutte le forze esterne, e mai una sola forza. Una forza molto intensa può produrre accelerazione nulla, se altre forze la bilanciano.
2. L'equazione è **vettoriale**: l'accelerazione ha la direzione e il verso della risultante, che possono essere diversi da quelli della velocità. Un corpo che si muove verso destra e frena ha una risultante verso sinistra.
3. La massa $m$ è una proprietà del corpo e misura la sua **inerzia**, cioè la resistenza a cambiare velocità: a parità di risultante, un corpo di massa doppia acquista un'accelerazione dimezzata.

### Il newton {#newton}

Nel Sistema Internazionale l'unità di forza si ricava dal secondo principio. Un **newton** è la forza che imprime a un corpo di massa $1\un{kg}$ un'accelerazione di $1\un{m/s^2}$:

$$
1\un{N}=1\un{kg}\cdot 1\un{m/s^2}=1\un{kg\,m\,s^{-2}}.
$$

Per farsi un'idea: sulla superficie terrestre una mela di circa $100\un{g}$ pesa circa $1\un{N}$, e una persona di $70\un{kg}$ pesa circa $690\un{N}$.

::: figura grafico-a-f
{"w":560,"h":330,"items":[
{"t":"axes","o":[70,280],"x":[420,"F (N)"],"y":[250,"a (m/s²)"],"sx":30,"sy":18,"xt":[[4,"4"],[8,"8"],[12,"12"]],"yt":[[4,"4"],[8,"8"],[12,"12"]]},
{"t":"plot","o":[70,280],"sx":30,"sy":18,"pts":[[0,0],[12,12]],"c":"force","s":"m = 1 kg"},
{"t":"plot","o":[70,280],"sx":30,"sy":18,"pts":[[0,0],[12,6]],"c":"force2","s":"m = 2 kg"},
{"t":"plot","o":[70,280],"sx":30,"sy":18,"pts":[[0,0],[12,3]],"c":"force3","s":"m = 4 kg"}
]}
---
Accelerazione in funzione della risultante per tre masse diverse. Ogni retta passa per l'origine e ha pendenza $1/m$: raddoppiare la massa dimezza l'accelerazione prodotta dalla stessa forza.
:::

### Componenti e direzioni indipendenti {#componenti}

In un piano l'equazione vettoriale equivale a due equazioni scalari, una per ogni asse:

$$
\sum F_x=m\,a_x,\qquad \sum F_y=m\,a_y.
$$

Le due direzioni si trattano separatamente. Questo permette di avere, nello stesso problema, equilibrio lungo un asse e accelerazione lungo l'altro: un carro a vela che accelera sulla piana ha $a_y=0$ in verticale, dove peso e reazioni del suolo si bilanciano, e $a_x\neq0$ in orizzontale, dove la spinta del vento supera la resistenza.

::: esempio La frenata di un'automobile
Un'automobile di massa $m=1200\un{kg}$ viaggia a $25\un{m/s}$ (cioè $90\un{km/h}$) e si ferma con accelerazione costante in $5{,}0\un{s}$. Calcoliamo la forza risultante e lo spazio di frenata.

Scegliamo l'asse $x$ nel verso del moto. L'accelerazione è
$$
a=\frac{\Delta v}{\Delta t}=\frac{0-25}{5{,}0}=-5{,}0\un{m/s^2}.
$$
Per il secondo principio la risultante orizzontale è
$$
F_x=m\,a=1200\cdot(-5{,}0)=-6{,}0\times10^{3}\un{N},
$$
cioè $6000\un{N}$ diretti all'indietro: è la forza d'attrito che la strada esercita sui pneumatici frenati. Lo spazio di frenata, con le formule del moto uniformemente accelerato, vale
$$
d=\frac{v_0^{2}}{2|a|}=\frac{25^{2}}{2\cdot5{,}0}=62{,}5\un{m}.
$$
Il segno negativo di $a$ e di $F_x$ indica soltanto che la forza è diretta nel verso opposto a quello scelto come positivo.
:::

### Massa e quantità di moto {#quantita-di-moto}

Per una particella si definisce la **quantità di moto** $\vect p=m\vect v$. Se la massa è costante, la derivata di $\vect p$ rispetto al tempo vale $m\vect a$, e il secondo principio si può scrivere

$$
\sum\vect F=\frac{\dd\vect p}{\dd t}.
$$

Questa è la forma più vicina all'enunciato di Newton, che parlava di cambiamento del moto. Su un intervallo finito $\Delta t$ diventa

$$
\sum\vect F_{\mathrm{media}}=\frac{\Delta\vect p}{\Delta t},
$$

che è la forma usata quando i dati provengono da sensori campionati a intervalli regolari, per esempio dall'accelerometro di uno smartphone. La quantità $\sum\vect F\,\Delta t$ si chiama **impulso** e sarà il punto di partenza del capitolo sulla [quantità di moto](unit:physics-09).

::: nota Massa variabile
La forma $\sum\vect F=\dd\vect p/\dd t$ vale per un sistema di cui si seguono sempre le stesse particelle. Per un razzo, che perde massa espellendo gas, bisogna tenere conto anche della quantità di moto portata via dai gas, oltre a quella del veicolo. Il problema del razzo si tratta nel capitolo sulla quantità di moto.
:::

::: quotidiano Pesare un astronauta in orbita
Sulla Stazione Spaziale Internazionale una bilancia comune è inutile: astronauti e oggetti sono in caduta libera insieme alla stazione e non premono su alcun piatto. Per misurare la massa corporea si usa un dispositivo chiamato SLAMMD (*Space Linear Acceleration Mass Measurement Device*): due molle applicano all'astronauta una forza nota, il dispositivo misura l'accelerazione risultante e calcola la massa con il secondo principio, $m=F/a$. È un'applicazione diretta della definizione di massa come misura dell'inerzia.
:::

::: approfondimento Massa inerziale e massa gravitazionale
La massa compare in due leggi diverse. Nel secondo principio misura quanto un corpo resiste a cambiare velocità: è la **massa inerziale**. Nella legge di gravitazione, e quindi nel peso, misura quanto intensamente il corpo è attratto dalla Terra: è la **massa gravitazionale**. Non c'è alcuna ragione logica perché le due coincidano; il fatto che siano proporzionali, con la stessa costante per tutti i materiali, è un risultato sperimentale. Ne discende che tutti i corpi, in assenza di aria, cadono con la stessa accelerazione $g$: se raddoppia la massa gravitazionale raddoppia il peso, ma raddoppia anche la massa inerziale che si oppone all'accelerazione. Le verifiche sperimentali di questa equivalenza sono state ripetute con precisione crescente dal Seicento a oggi, ed Einstein ne fece il punto di partenza della relatività generale.
:::

::: approfondimento Una definizione circolare?
Il secondo principio sembra definire la forza attraverso la massa e la massa attraverso la forza. Il circolo si rompe con una procedura operativa, proposta da Ernst Mach nell'Ottocento: si fanno interagire due corpi isolati e si misurano le loro accelerazioni. Il rapporto delle masse è definito come il rapporto inverso dei moduli delle accelerazioni, $m_1/m_2=a_2/a_1$; scelto un corpo campione di massa $1\un{kg}$, ogni altra massa è determinata. A quel punto la forza è definita da $\vect F=m\vect a$, e il contenuto fisico del secondo principio sta nel fatto che, per le interazioni note, la forza dipende dalla situazione (distanza, deformazione di una molla, velocità relativa nell'aria) in modo semplice e riproducibile.
:::

::: errore La forza ha la direzione della velocità
Il secondo principio collega la forza all'accelerazione, e non alla velocità. Un sasso lanciato verso l'alto, nel punto più alto della traiettoria, ha velocità nulla e tuttavia è soggetto al suo peso, diretto verso il basso; un'automobile che percorre una curva a velocità costante in modulo ha una risultante diretta verso il centro della curva, perpendicolare alla velocità.
:::

## Terzo principio: le interazioni sono reciproche {#terzo-principio}

::: legge Terzo principio della dinamica (principio di azione e reazione)
Se un corpo $A$ esercita una forza su un corpo $B$, allora $B$ esercita su $A$ una forza con lo stesso modulo, la stessa direzione e verso opposto:
$$
\vect F_{A\to B}=-\,\vect F_{B\to A}.
$$
:::

Il terzo principio afferma che ogni forza è il risultato di un'**interazione** fra due corpi, e che ogni interazione si manifesta con una coppia di forze. Nel linguaggio di Newton: *actioni contrariam semper et aequalem esse reactionem*, a ogni azione corrisponde sempre una reazione uguale e contraria.

Le due forze della coppia hanno tre caratteristiche che conviene ricordare insieme:

- agiscono su **corpi diversi**, una su $A$ e una su $B$;
- sono della **stessa natura**: se una è gravitazionale lo è anche l'altra, se una è una forza di contatto lo è anche l'altra;
- esistono **contemporaneamente**: nessuna delle due viene prima e causa l'altra.

Poiché agiscono su corpi diversi, le due forze di una coppia **non si annullano** nel diagramma di un singolo corpo. Si cancellano soltanto quando entrambi i corpi fanno parte del sistema studiato e si sommano le loro equazioni.

::: figura terra-mela
{"w":560,"h":290,"items":[
{"t":"circle","p":[280,560,330],"c":"muted"},
{"t":"text","p":[280,268],"s":"Terra","size":15},
{"t":"circle","p":[280,70,15],"c":"force4"},
{"t":"text","p":[316,62],"s":"mela","size":14,"a":"start"},
{"t":"arrow","p":[280,86,280,170],"c":"force","s":"F","sub":"Terra→mela","off":[14,-30],"a":"start"},
{"t":"arrow","p":[280,230,280,180],"c":"force2","s":"F","sub":"mela→Terra","off":[14,40],"a":"start"},
{"t":"text","p":[60,150],"s":"stesso modulo","c":"muted","size":13,"a":"start"},
{"t":"text","p":[60,170],"s":"verso opposto","c":"muted","size":13,"a":"start"},
{"t":"text","p":[60,190],"s":"corpi diversi","c":"muted","size":13,"a":"start"}
]}
---
La Terra attrae la mela e la mela attrae la Terra con una forza dello stesso modulo. Le due forze agiscono su corpi diversi; gli effetti sono molto diversi perché le masse sono molto diverse.
:::

::: esempio Perché la Terra non cade verso la mela
Una mela di $0{,}20\un{kg}$ cade da un albero. La Terra la attrae con una forza $F=mg=0{,}20\cdot 9{,}81\approx1{,}96\un{N}$; per il terzo principio la mela attrae la Terra con una forza di $1{,}96\un{N}$ diretta verso l'alto. L'accelerazione della Terra, di massa $M\approx5{,}97\times10^{24}\un{kg}$, è
$$
a_{T}=\frac{F}{M}\approx\frac{1{,}96}{5{,}97\times10^{24}}\approx 3{,}3\times10^{-25}\un{m/s^2},
$$
un valore che nessuno strumento può misurare. Le forze sono uguali; le accelerazioni no, perché la stessa forza agisce su masse enormemente diverse.
:::

::: quotidiano Camminare, nuotare, decollare
Per camminare spingiamo il suolo all'indietro con il piede; il suolo esercita sul piede una forza d'attrito diretta in avanti, ed è questa forza esterna ad accelerarci. Su un ghiaccio molto liscio la forza d'attrito disponibile è piccola e diventa difficile partire o cambiare direzione. Allo stesso modo un nuotatore spinge l'acqua all'indietro e l'acqua spinge lui in avanti; un'elica spinge l'aria e l'aria spinge l'aereo; un razzo spinge i gas di scarico verso il basso e i gas spingono il razzo verso l'alto, anche nel vuoto, dove non c'è aria su cui appoggiarsi.
:::

::: errore Peso e normale sono una coppia di azione e reazione
Un libro fermo su un tavolo subisce il peso, verso il basso, e la reazione normale del tavolo, verso l'alto, con lo stesso modulo. Queste due forze **non** sono una coppia del terzo principio: agiscono sullo stesso corpo, hanno natura diversa (gravitazionale e di contatto) e sono uguali in modulo solo perché il libro è in equilibrio; in un ascensore che accelera sarebbero diverse. La reazione al peso del libro è la forza gravitazionale con cui il libro attrae la Terra; la reazione alla normale è la forza con cui il libro preme sul tavolo.
:::

::: approfondimento Il paradosso del cavallo e del carro
Un ragionamento classico sembra dimostrare che un cavallo non può trainare un carro: se il cavallo tira il carro in avanti, il carro tira il cavallo all'indietro con la stessa forza, e le due forze si annullano. L'errore sta nel sommare forze che agiscono su corpi diversi. Per capire se il carro accelera si guardano solo le forze **sul carro**: la trazione del cavallo in avanti e l'attrito delle ruote all'indietro. Per capire se il cavallo accelera si guardano le forze **sul cavallo**: la forza del carro all'indietro e la forza d'attrito del suolo sugli zoccoli, in avanti, che nasce perché il cavallo spinge il terreno all'indietro. Se la forza del suolo sul cavallo supera la forza del carro, il cavallo accelera; e se la trazione del cavallo supera gli attriti sul carro, accelera anche il carro.
:::

## Il diagramma di corpo libero {#corpo-libero}

Il **diagramma di corpo libero** isola il sistema scelto e rappresenta tutte le forze esterne che agiscono su di esso, e soltanto quelle. È il passaggio più importante nella soluzione di un problema di dinamica, perché traduce una situazione concreta, con fili, superfici e persone, in un modello vettoriale a cui applicare il secondo principio.

::: metodo Costruire un diagramma di corpo libero
1. Scegliere il corpo o il sistema e disegnarlo separato dall'ambiente, come un punto o una figura semplice.
2. Elencare i corpi dell'ambiente che toccano il sistema: ognuno esercita al più una forza di contatto (eventualmente da scomporre in normale e attrito).
3. Aggiungere le forze a distanza, di solito il solo peso.
4. Disegnare ogni forza come una freccia applicata al corpo, con il verso corretto, e nominarla dicendo chi la esercita.
5. Scegliere gli assi: uno lungo la direzione dell'accelerazione, se è nota, l'altro perpendicolare.
6. Solo a questo punto scrivere $\sum F_x=m\,a_x$ e $\sum F_y=m\,a_y$.
:::

Il diagramma contiene **forze**. Velocità, accelerazioni e traiettorie non vanno disegnate come frecce nel diagramma, perché verrebbero confuse con forze; se servono, si indicano a parte.

::: figura corpo-libero
{"w":560,"h":330,"items":[
{"t":"rect","p":[200,150,120,70],"c":"body","s":"blocco"},
{"t":"arrow","p":[260,150,260,70],"c":"force2","s":"N","off":[16,6]},
{"t":"arrow","p":[260,220,260,305],"c":"force4","s":"P","off":[18,-6]},
{"t":"arrow","p":[320,185,423.9,125],"c":"force","s":"T","off":[12,-4]},
{"t":"line","p":[320,185,423.9,185],"c":"force","dash":true,"w":1.4},{"t":"line","p":[423.9,185,423.9,125],"c":"force","dash":true,"w":1.4},
{"t":"text","p":[380,204],"s":"T","sub":"x","c":"force","v":true,"size":14},{"t":"text","p":[440,160],"s":"T","sub":"y","c":"force","v":true,"size":14},
{"t":"arc","p":[320,185],"r":42,"a":[0,30],"s":"θ","c":"muted"},
{"t":"arrow","p":[60,300,120,300],"c":"muted","w":1.4,"head":8},{"t":"text","p":[128,305],"s":"x","c":"muted","size":13,"a":"start"},
{"t":"arrow","p":[60,300,60,240],"c":"muted","w":1.4,"head":8},{"t":"text","p":[60,230],"s":"y","c":"muted","size":13}
]}
---
Diagramma di corpo libero di un blocco tirato da una fune inclinata di un angolo $\theta$ su un pavimento liscio: peso $\vect P$, reazione normale $\vect N$ e tensione $\vect T$, scomposta nelle componenti $T_x=T\cos\theta$ e $T_y=T\sin\theta$.
:::

::: esempio Un blocco tirato da una fune inclinata
Un blocco di massa $m=6{,}0\un{kg}$ appoggia su un pavimento liscio ed è tirato da una fune inclinata di $\theta=30^\circ$ sull'orizzontale, con tensione $T=20\un{N}$ (figura precedente). Calcoliamo l'accelerazione e la reazione normale.

Lungo $x$ agisce solo la componente orizzontale della tensione:
$$
T\cos\theta=m\,a\quad\Rightarrow\quad a=\frac{20\cos30^\circ}{6{,}0}\approx\frac{17{,}3}{6{,}0}\approx2{,}89\un{m/s^2}.
$$
Lungo $y$ il blocco non accelera:
$$
N+T\sin\theta-mg=0\quad\Rightarrow\quad N=mg-T\sin\theta=6{,}0\cdot9{,}81-20\cdot0{,}5\approx48{,}9\un{N}.
$$
La normale è minore del peso ($58{,}9\un{N}$) perché la fune solleva in parte il blocco. Se l'angolo fosse tale da rendere $T\sin\theta>mg$, il blocco si staccherebbe dal pavimento e l'equazione lungo $y$ andrebbe riscritta con $N=0$ e $a_y\neq0$.
:::

## Le forze che incontrerai più spesso {#forze-comuni}

### Peso e campo gravitazionale {#peso}

Il **peso** di un corpo è la forza con cui la Terra lo attrae. Vicino alla superficie terrestre, entro distanze piccole rispetto al raggio della Terra, è costante e vale

$$
\vect P=m\,\vect g,
$$

dove $\vect g$ è l'accelerazione di gravità, diretta verso il centro della Terra, con modulo vicino a $9{,}81\un{m/s^2}$. Il vettore $\vect g$ si chiama anche **campo gravitazionale**: in ogni punto dice quale forza agirebbe su ogni chilogrammo di massa posto lì, ed è misurato in $\un{N/kg}$, unità equivalente a $\un{m/s^2}$.

Massa e peso sono grandezze diverse. La massa si misura in chilogrammi ed è una proprietà del corpo; il peso si misura in newton e dipende anche dal luogo. Un astronauta di $70\un{kg}$ ha la stessa massa sulla Terra e sulla Luna; il suo peso vale circa $687\un{N}$ sulla Terra e circa $113\un{N}$ sulla Luna.

| Luogo | $g$ in $\un{m/s^2}$ | Peso di una massa di $70\un{kg}$ |
|---|---|---|
| Terra, equatore (livello del mare) | $9{,}780$ | $685\un{N}$ |
| Terra, valore convenzionale | $9{,}80665$ | $686\un{N}$ |
| Terra, poli | $9{,}832$ | $688\un{N}$ |
| Marte | $3{,}71$ | $260\un{N}$ |
| Luna | $1{,}62$ | $113\un{N}$ |

I valori terrestri all'equatore e ai poli sono quelli della gravità normale del modello geodetico di riferimento: la differenza dipende in parte dalla forma schiacciata della Terra e in parte dalla sua rotazione. Il valore $9{,}80665\un{m/s^2}$ è un valore convenzionale, fissato nel 1901 per le unità di misura. Nei calcoli di questo libro useremo $g=9{,}81\un{m/s^2}$.

::: errore «Peso 60 chili»
Nel linguaggio comune si dice «peso 60 chili» intendendo la massa. In fisica la frase corretta è «ho una massa di $60\un{kg}$», e il peso corrispondente sulla Terra è circa $589\un{N}$. La confusione è innocua al mercato, dove si confrontano masse nello stesso luogo; diventa un errore grave quando si cambia luogo, o quando si usano peso e massa nella stessa equazione.
:::

### Reazione normale {#normale}

La **reazione normale** $\vect N$ è la componente, perpendicolare alla superficie di contatto, della forza che una superficie esercita su un corpo appoggiato. È una **forza vincolare**: non ha un valore fissato in anticipo, assume il valore necessario per impedire al corpo di compenetrare la superficie. Per questo la normale può differire dal peso: dipende dalle altre forze e dall'accelerazione, come si è visto nell'esempio della fune inclinata.

::: figura ascensore
{"w":520,"h":330,"items":[
{"t":"rect","p":[140,30,240,280],"c":"muted","r":6},
{"t":"rect","p":[200,255,120,14],"c":"ax","s":""},{"t":"text","p":[260,292],"s":"bilancia","c":"muted","size":12},
{"t":"rect","p":[225,150,70,105],"c":"body","s":"m"},
{"t":"arrow","p":[245,150,245,80],"c":"force2","s":"N","off":[-18,6]},
{"t":"arrow","p":[280,200,280,282],"c":"force4","s":"P","off":[18,-14]},
{"t":"arrow","p":[440,230,440,140],"c":"force3","s":"a","off":[16,10]},
{"t":"text","p":[440,260],"s":"accelerazione","c":"muted","size":12},
{"t":"text","p":[440,276],"s":"della cabina","c":"muted","size":12}
]}
---
Una persona su una bilancia in un ascensore che accelera verso l'alto. Sulla persona agiscono il peso $\vect P$ e la reazione normale $\vect N$ della bilancia; la bilancia indica il modulo di $\vect N$.
:::

::: esempio Il peso apparente in ascensore
Una persona di massa $m=60\un{kg}$ sta su una bilancia pesapersone in un ascensore che accelera verso l'alto con $a=1{,}5\un{m/s^2}$. Che cosa indica la bilancia?

La bilancia misura la forza normale che esercita sulla persona e la converte in chilogrammi dividendo per $g$. Asse $y$ verso l'alto; sulla persona agiscono $N$ verso l'alto e $mg$ verso il basso:
$$
N-mg=m\,a\quad\Rightarrow\quad N=m\,(g+a)=60\cdot(9{,}81+1{,}5)\approx679\un{N}.
$$
La bilancia indica $N/g\approx69{,}2\un{kg}$. Se l'ascensore accelerasse verso il basso con la stessa accelerazione, si avrebbe $N=m(g-a)\approx499\un{N}$ e la lettura sarebbe circa $50{,}8\un{kg}$. Se il cavo si spezzasse, la cabina e la persona cadrebbero con accelerazione $g$, si avrebbe $N=0$ e la bilancia segnerebbe zero: è la condizione di **assenza di peso apparente**, la stessa degli astronauti in orbita.
:::

### Tensione {#tensione}

Una fune, un cavo o una catena esercitano sui corpi a cui sono attaccati una forza diretta lungo la fune stessa, chiamata **tensione**. Una fune può solo tirare, mai spingere. Nel modello della **fune ideale** la fune è inestensibile e ha massa trascurabile; ne segue che la tensione ha lo stesso modulo in ogni punto della fune, e che due corpi collegati da una fune tesa hanno accelerazioni dello stesso modulo. In una **carrucola ideale**, priva di massa e di attrito, la tensione ha lo stesso modulo sui due rami: la carrucola cambia la direzione della forza senza cambiarne il modulo.

::: esempio Una lampada sospesa a due cavi
Una lampada di massa $m=4{,}0\un{kg}$ è appesa al centro di un cavo i cui due tratti formano ciascuno un angolo $\alpha=30^\circ$ con l'orizzontale. Calcoliamo la tensione.

Per simmetria le due tensioni hanno lo stesso modulo $T$. Le componenti orizzontali si annullano; in verticale l'equilibrio richiede
$$
2\,T\sin\alpha=mg\quad\Rightarrow\quad T=\frac{mg}{2\sin\alpha}=\frac{4{,}0\cdot9{,}81}{2\cdot0{,}5}\approx39{,}2\un{N}.
$$
La formula contiene un risultato importante: se il cavo viene teso quasi orizzontale, $\sin\alpha$ diventa piccolo e la tensione cresce molto. Con $\alpha=5^\circ$ la stessa lampada produrrebbe una tensione di circa $225\un{N}$, più di cinque volte il suo peso. Per questo un cavo da bucato teso troppo si spezza facilmente, e le linee elettriche sono montate con una certa freccia.
:::

### Forza elastica e legge di Hooke {#elastica}

Una molla deformata esercita una forza che tende a riportarla alla lunghezza naturale, quella che ha quando non è sollecitata. Per deformazioni piccole la forza è proporzionale alla deformazione.

::: legge Legge di Hooke
Per una molla ideale, con deformazione $\vect x$ misurata a partire dalla lunghezza naturale,
$$
\vect F_e=-\,k\,\vect x,
$$
dove $k>0$ è la **costante elastica** della molla, misurata in $\un{N/m}$. Il segno meno indica che la forza si oppone sempre alla deformazione: richiama la molla allungata, respinge la molla compressa.
:::

La costante $k$ misura la rigidità: una molla con $k$ grande richiede una forza grande per deformarsi poco. La legge di Hooke è un'**approssimazione lineare**, valida entro un intervallo di deformazioni che dipende dalla molla e dal materiale; oltre il **limite elastico** la relazione smette di essere lineare e possono comparire deformazioni permanenti.

::: figura molla
{"w":720,"h":310,"items":[
{"t":"line","p":[60,30,180,30],"c":"ax","w":3},
{"t":"spring","p":[120,30,120,160],"n":9,"amp":11,"c":"force2"},
{"t":"rect","p":[90,160,60,50],"c":"body","s":"m"},
{"t":"line","p":[70,110,175,110],"c":"muted","dash":true,"w":1.2},{"t":"text","p":[182,114],"s":"lunghezza naturale","c":"muted","size":12,"a":"start"},
{"t":"arrow","p":[200,110,200,160],"c":"force3","w":2,"head":9},{"t":"text","p":[210,142],"s":"x","c":"force3","a":"start","size":15},
{"t":"arrow","p":[60,185,60,125],"c":"force","s":"F","sub":"e","off":[-16,10]},
{"t":"axes","o":[350,270],"x":[340,"x (cm)"],"y":[230,"F (N)"],"sx":30,"sy":10,"xt":[[2,"2"],[4,"4"],[6,"6"],[8,"8"]],"yt":[[5,"5"],[10,"10"],[15,"15"]]},
{"t":"plot","o":[350,270],"sx":30,"sy":10,"pts":[[0,0],[8,16]],"c":"force"},
{"t":"plot","o":[350,270],"sx":30,"sy":10,"pts":[[8,16],[9,17.2],[10,17.9],[10.6,18.2]],"c":"force4","dash":true,"s":"oltre il limite elastico","dx":-20,"dy":-14,"a":"end"},
{"t":"text","p":[470,150],"s":"pendenza k","c":"force","size":13}
]}
---
A sinistra una molla allungata di $x$ rispetto alla lunghezza naturale da una massa appesa; la forza elastica $\vect F_e$ è diretta verso l'alto. A destra il modulo della forza in funzione dell'allungamento: una retta di pendenza $k$ finché vale la legge di Hooke, poi una curva quando si supera il limite elastico.
:::

Il dinamometro sfrutta proprio la legge di Hooke: l'allungamento della molla, letto su una scala, è proporzionale alla forza applicata. Lo stesso principio è alla base di molte bilance e di numerosi sensori di forza.

::: esempio Un dinamometro
Un dinamometro contiene una molla con $k=250\un{N/m}$. Quando si appende un oggetto all'estremità, la molla si allunga di $6{,}0\un{cm}$ e l'oggetto resta fermo. Qual è il peso dell'oggetto, e quale la sua massa?

All'equilibrio la forza elastica bilancia il peso: $kx=mg$. Quindi
$$
P=kx=250\cdot0{,}060=15\un{N},\qquad m=\frac{P}{g}=\frac{15}{9{,}81}\approx1{,}53\un{kg}.
$$
Si noti la conversione dei centimetri in metri: con $x$ espresso in centimetri il risultato sarebbe cento volte troppo grande.
:::

::: storia Ut tensio, sic vis
Robert Hooke annunciò la sua legge nel 1676, alla fine del libro *A Description of Helioscopes*, sotto forma di anagramma: una sequenza di lettere che soltanto lui sapeva ricomporre. Nel 1678, nelle *Lectures de Potentia Restitutiva*, ne rivelò il significato: *ut tensio, sic vis*, cioè «come l'allungamento, così la forza». L'anagramma era un modo diffuso nel Seicento per stabilire una priorità senza rivelare subito una scoperta. Hooke presentò la proporzionalità come una regolarità osservata entro certi limiti, una cautela metodologica che vale ancora: una relazione lineare verificata in un intervallo non autorizza a estrapolarla molto lontano dai dati.
:::

::: approfondimento Molle in serie e in parallelo
Due molle di costanti $k_1$ e $k_2$ possono essere collegate in due modi. **In parallelo**, una accanto all'altra e attaccate allo stesso corpo, subiscono la stessa deformazione $x$ e le forze si sommano: $F=k_1x+k_2x$, quindi la costante equivalente è
$$
k_{\parallel}=k_1+k_2.
$$
**In serie**, una dopo l'altra, sono attraversate dalla stessa forza $F$ e si sommano le deformazioni: $x=F/k_1+F/k_2$, quindi
$$
\frac{1}{k_{\mathrm{s}}}=\frac{1}{k_1}+\frac{1}{k_2}.
$$
Con $k_1=200\un{N/m}$ e $k_2=300\un{N/m}$ si ottiene $k_{\parallel}=500\un{N/m}$ e $k_{\mathrm{s}}=120\un{N/m}$: il collegamento in serie produce una molla più cedevole di ciascuna delle due, quello in parallelo una molla più rigida.
:::

### Uno sguardo all'attrito {#attrito}

Quando due superfici sono a contatto, la forza che l'una esercita sull'altra ha in generale anche una componente parallela alla superficie: l'**attrito**. L'attrito statico impedisce lo scivolamento fino a un valore massimo; l'attrito dinamico agisce durante lo scivolamento e si oppone al moto relativo delle superfici. È l'attrito del suolo a permetterci di camminare e a frenare l'automobile dell'esempio precedente. I modelli dell'attrito, i coefficienti e i problemi con piani inclinati sono l'argomento del capitolo [Attrito e vincoli](unit:physics-07).

## Risolvere un problema di dinamica {#strategia}

I problemi di dinamica si risolvono quasi sempre con la stessa sequenza di passi. Seguirla in modo esplicito evita la maggior parte degli errori.

::: metodo Strategia generale
1. **Leggere e disegnare** la situazione, annotando i dati con le unità.
2. **Scegliere il sistema**: un corpo alla volta, oppure un insieme di corpi che si muovono insieme.
3. **Disegnare il diagramma di corpo libero** di ogni corpo scelto.
4. **Scegliere gli assi** per ogni corpo, preferibilmente lungo l'accelerazione.
5. **Scrivere le equazioni** $\sum F_x=m a_x$ e $\sum F_y=m a_y$, più le relazioni dei vincoli (stessa accelerazione per corpi legati da una fune tesa, $a=0$ dove il corpo non si muove).
6. **Risolvere** in forma simbolica e solo alla fine sostituire i numeri.
7. **Controllare** unità, segni e casi limite: che cosa succede se una massa tende a zero, se un angolo vale $0^\circ$ o $90^\circ$?
:::

::: esempio Due blocchi a contatto
Due blocchi di massa $m_1=4{,}0\un{kg}$ e $m_2=2{,}0\un{kg}$ sono appoggiati uno accanto all'altro su un piano liscio. Una forza orizzontale $F=24\un{N}$ spinge il primo blocco, che a sua volta spinge il secondo. Calcoliamo l'accelerazione e la forza di contatto fra i blocchi.

Il sistema formato dai due blocchi si muove insieme con accelerazione $a$. Sull'insieme l'unica forza orizzontale esterna è $F$: la forza di contatto fra i blocchi è interna e non compare.
$$
F=(m_1+m_2)\,a\quad\Rightarrow\quad a=\frac{24}{6{,}0}=4{,}0\un{m/s^2}.
$$
Per trovare la forza di contatto scegliamo come sistema il solo secondo blocco. Su di esso l'unica forza orizzontale è la spinta $F_{12}$ del primo blocco:
$$
F_{12}=m_2\,a=2{,}0\cdot4{,}0=8{,}0\un{N}.
$$
Per il terzo principio il secondo blocco spinge il primo con $8{,}0\un{N}$ all'indietro; infatti sul primo blocco la risultante vale $24-8{,}0=16\un{N}=m_1a$. Si noti che la forza di contatto è minore di $F$: la forza esterna deve accelerare entrambi i blocchi, quella di contatto solo il secondo.
:::

::: figura atwood
{"w":420,"h":380,"items":[
{"t":"line","p":[140,12,280,12],"c":"ax","w":3},{"t":"line","p":[210,12,210,40],"c":"ax","w":2},
{"t":"circle","p":[210,62,26],"c":"muted"},{"t":"circle","p":[210,62,4],"c":"ax"},
{"t":"line","p":[184,62,184,240],"c":"ax","w":1.6},{"t":"line","p":[236,62,236,180],"c":"ax","w":1.6},
{"t":"rect","p":[159,240,50,50],"c":"body","s":"m₁"},
{"t":"rect","p":[206,180,60,60],"c":"body","s":"m₂"},
{"t":"arrow","p":[196,240,196,196],"c":"force2","s":"T","off":[-2,-6],"a":"start"},
{"t":"arrow","p":[184,290,184,345],"c":"force4","s":"m₁g","v":false,"off":[2,22]},
{"t":"arrow","p":[252,180,252,136],"c":"force2","s":"T","off":[10,4],"a":"start"},
{"t":"arrow","p":[236,240,236,310],"c":"force4","s":"m₂g","v":false,"off":[4,22]},
{"t":"arrow","p":[110,290,110,245],"c":"force3","s":"a","off":[-14,10]},
{"t":"arrow","p":[315,195,315,240],"c":"force3","s":"a","off":[14,0]}
]}
---
Macchina di Atwood: due masse appese ai capi di una fune ideale che passa su una carrucola ideale. La tensione è la stessa sui due rami; la massa maggiore scende e la minore sale con accelerazioni dello stesso modulo.
:::

::: esempio La macchina di Atwood
George Atwood, nel 1784, costruì questo dispositivo per studiare il moto accelerato con accelerazioni più piccole di $g$, e quindi più facili da misurare. Due masse $m_1=3{,}0\un{kg}$ e $m_2=5{,}0\un{kg}$ sono appese ai capi di una fune ideale che passa su una carrucola ideale. Calcoliamo accelerazione e tensione.

Per ciascuna massa scegliamo l'asse positivo nel verso del suo moto: verso l'alto per $m_1$, verso il basso per $m_2$. Le equazioni sono
$$
T-m_1g=m_1a,\qquad m_2g-T=m_2a.
$$
Sommando membro a membro la tensione si elimina:
$$
a=\frac{m_2-m_1}{m_1+m_2}\,g=\frac{2{,}0}{8{,}0}\cdot9{,}81\approx2{,}45\un{m/s^2},
$$
e sostituendo nella prima equazione
$$
T=m_1(g+a)=\frac{2\,m_1m_2}{m_1+m_2}\,g=\frac{2\cdot3{,}0\cdot5{,}0}{8{,}0}\cdot9{,}81\approx36{,}8\un{N}.
$$
Controllo dei casi limite: se $m_1=m_2$ l'accelerazione è nulla e $T=mg$, come deve essere; se $m_1\to0$ si ottiene $a\to g$ e $T\to0$, cioè la caduta libera di $m_2$. La tensione è compresa fra i due pesi, $29{,}4\un{N}<T<49{,}1\un{N}$: maggiore del peso della massa che sale, minore di quello della massa che scende.
:::

## Fin dove vale il modello newtoniano {#limiti}

I tre principi descrivono con grande precisione un'enorme varietà di fenomeni, dal moto di una palla al moto dei pianeti. Come ogni modello fisico, però, hanno un dominio di validità, ed è parte della loro comprensione sapere dove finisce.

- **Riferimenti non inerziali.** In un riferimento che accelera i principi non valgono nella forma enunciata. Si possono recuperare aggiungendo forze apparenti, come la forza centrifuga, che non hanno un agente; questo tema è ripreso nel capitolo sul moto circolare e nei riferimenti accelerati.
- **Velocità prossime a quella della luce.** La relazione $\vect F=m\vect a$ va sostituita con la dinamica della relatività ristretta. La correzione dipende dal fattore $\gamma=1/\sqrt{1-v^{2}/c^{2}}$: per $v=0{,}1\,c$ vale circa $1{,}005$, cioè mezzo punto percentuale; per le velocità di un'automobile o di un aereo è del tutto trascurabile.
- **Scala atomica.** Per elettroni negli atomi e nelle molecole il concetto di traiettoria perde significato e la meccanica newtoniana va sostituita dalla meccanica quantistica, introdotta nel capitolo sui [fotoni](unit:physics-25).
- **Gravità molto intensa.** Vicino a stelle di neutroni o buchi neri, e nelle misure di altissima precisione come quelle dei satelliti di navigazione, la gravitazione newtoniana va sostituita dalla relatività generale.

Nessuna di queste estensioni rende «sbagliata» la meccanica di Newton nel suo dominio: le teorie più generali la contengono come caso limite e danno gli stessi risultati quando le velocità sono piccole, le masse non sono enormi e le dimensioni non sono atomiche.

## Errori tipici da riconoscere {#errori}

La ricerca in didattica della fisica ha mostrato che alcune idee sbagliate sulla forza sono molto diffuse e resistono anche dopo un corso di fisica. Riconoscerle in modo esplicito è il modo più efficace per superarle.

| Idea errata | Che cosa dice la dinamica |
|---|---|
| Un corpo in moto contiene una forza che si esaurisce | Il moto si conserva senza forze; il rallentamento è dovuto a forze esterne come l'attrito |
| Se un corpo si muove, la risultante ha la direzione del moto | La risultante ha la direzione dell'accelerazione, che può essere opposta o perpendicolare alla velocità |
| I corpi più pesanti cadono più in fretta | Senza aria tutti i corpi cadono con la stessa accelerazione $g$ |
| Azione e reazione si annullano | Agiscono su corpi diversi e non si sommano nello stesso diagramma |
| La normale è sempre uguale al peso | La normale si adatta: dipende dalle altre forze e dall'accelerazione |
| Massa e peso sono la stessa cosa | La massa è in kg ed è propria del corpo; il peso è una forza in N e dipende dal luogo |
| Un corpo fermo non subisce forze | Un corpo fermo può subire molte forze, purché la risultante sia nulla |

## Sintesi {#sintesi}

::: sintesi
- Una forza descrive un'interazione fra due corpi; si misura in newton e si somma come un vettore.
- Primo principio: in un riferimento inerziale, se $\sum\vect F=\vect 0$ la velocità resta costante. Il principio definisce anche i riferimenti inerziali.
- Secondo principio: $\sum\vect F=m\vect a$, ovvero $\sum\vect F=\dd\vect p/\dd t$; la massa misura l'inerzia, e $1\un{N}=1\un{kg\,m/s^2}$.
- Terzo principio: $\vect F_{A\to B}=-\vect F_{B\to A}$; le due forze agiscono su corpi diversi e non si annullano.
- Peso $\vect P=m\vect g$ con $g\approx9{,}81\un{m/s^2}$ sulla Terra; normale e tensione sono forze vincolari; forza elastica $\vect F_e=-k\vect x$ entro il limite elastico.
- Ogni problema si risolve scegliendo il sistema, disegnando il diagramma di corpo libero, scrivendo le equazioni per componenti e controllando unità e casi limite.
:::

## Esercizi {#esercizi}

Gli esercizi sono ordinati per difficoltà. Dove non è indicato diversamente si usa $g=9{,}81\un{m/s^2}$ e si trascurano attrito e resistenza dell'aria.

::: esercizio Forze allineate [base]
Su un corpo di massa $5{,}0\un{kg}$ agiscono una forza di $22\un{N}$ verso destra e una di $7{,}0\un{N}$ verso sinistra. Calcola l'accelerazione.
>>> soluzione
Con l'asse positivo verso destra la risultante vale $22-7{,}0=15\un{N}$. Quindi $a=F/m=15/5{,}0=3{,}0\un{m/s^2}$, verso destra.
:::

::: esercizio Massa dalla risposta dinamica [base]
Una risultante di $42\un{N}$ produce su un corpo un'accelerazione di $3{,}5\un{m/s^2}$. Qual è la massa del corpo?
>>> soluzione
Dal secondo principio $m=F/a=42/3{,}5=12\un{kg}$. Controllo delle unità: $\un{N}/(\un{m/s^2})=\un{kg}$.
:::

::: esercizio Peso su Marte [base]
Un esploratore con la sua tuta ha una massa di $80\un{kg}$. Calcola il suo peso sulla Terra e su Marte, dove $g=3{,}71\un{m/s^2}$. Quale grandezza cambia passando da un pianeta all'altro?
>>> soluzione
Sulla Terra $P=80\cdot9{,}81\approx785\un{N}$; su Marte $P=80\cdot3{,}71\approx297\un{N}$. Cambia il peso, perché cambia il campo gravitazionale; la massa resta $80\un{kg}$.
:::

::: esercizio Le coppie del libro sul tavolo [base]
Un libro è fermo su un tavolo. Elenca le forze che agiscono sul libro e, per ciascuna, indica la forza che forma con essa una coppia di azione e reazione.
>>> soluzione
Sul libro agiscono il peso (forza della Terra sul libro) e la normale (forza del tavolo sul libro). La reazione al peso è la forza gravitazionale del libro sulla Terra, applicata alla Terra e diretta verso l'alto. La reazione alla normale è la forza con cui il libro preme sul tavolo, applicata al tavolo e diretta verso il basso. Peso e normale agiscono sullo stesso corpo e non formano una coppia.
:::

::: esercizio Il paracadutista [base]
Un paracadutista scende a velocità costante di $5\un{m/s}$ con il paracadute aperto. Qual è la risultante delle forze su di lui? Che relazione c'è fra il suo peso e la forza dell'aria?
>>> soluzione
La velocità è costante, quindi l'accelerazione è nulla e per il primo principio la risultante è nulla. La forza dell'aria sul paracadutista, verso l'alto, ha lo stesso modulo del peso del paracadutista con il suo equipaggiamento.
:::

::: esercizio Un dinamometro [base]
Una molla ha costante elastica $k=400\un{N/m}$. Di quanto si allunga se la si tira con una forza di $10\un{N}$?
>>> soluzione
Dalla legge di Hooke $x=F/k=10/400=0{,}025\un{m}=2{,}5\un{cm}$.
:::

::: esercizio Forze perpendicolari [medio]
Su un corpo di massa $4{,}0\un{kg}$ agiscono una forza di $12\un{N}$ lungo l'asse $x$ e una di $16\un{N}$ lungo l'asse $y$. Calcola modulo e direzione dell'accelerazione.
>>> soluzione
La risultante ha componenti $(12,16)\un{N}$ e modulo $\sqrt{12^2+16^2}=20\un{N}$. L'accelerazione vale $a=20/4{,}0=5{,}0\un{m/s^2}$ e forma con l'asse $x$ l'angolo $\arctan(16/12)\approx53{,}1^\circ$, lo stesso della risultante.
:::

::: esercizio La frenata del ciclista [medio]
Un ciclista e la sua bicicletta hanno una massa complessiva di $80\un{kg}$. Frenando, il ciclista passa da $8{,}0\un{m/s}$ a fermo in $2{,}5\un{s}$ con decelerazione costante. Calcola l'accelerazione e la forza frenante.
>>> soluzione
$a=(0-8{,}0)/2{,}5=-3{,}2\un{m/s^2}$. La forza risultante vale $F=ma=80\cdot(-3{,}2)=-256\un{N}$: circa $260\un{N}$ diretti all'indietro, esercitati dal suolo sui pneumatici.
:::

::: esercizio La bilancia in ascensore [medio]
Una persona di massa $50\un{kg}$ sale su una bilancia in un ascensore e legge $56\un{kg}$. Calcola l'accelerazione dell'ascensore e descrivi due moti compatibili con la lettura.
>>> soluzione
La bilancia indica $N/g$, quindi $N=56\cdot9{,}81\approx549\un{N}$. Dal secondo principio, con asse verso l'alto, $N-mg=ma$, cioè $a=N/m-g\approx10{,}99-9{,}81\approx1{,}18\un{m/s^2}$ verso l'alto. L'ascensore può salire accelerando oppure scendere rallentando: in entrambi i casi l'accelerazione è diretta verso l'alto.
:::

::: esercizio Il blocco e la fune inclinata [medio]
Un blocco di $6{,}0\un{kg}$ su un pavimento liscio è tirato da una fune inclinata di $30^\circ$ sull'orizzontale con tensione $20\un{N}$. Calcola l'accelerazione del blocco e la reazione normale del pavimento.
>>> soluzione
In orizzontale $a=T\cos30^\circ/m=17{,}3/6{,}0\approx2{,}89\un{m/s^2}$. In verticale $N=mg-T\sin30^\circ=58{,}9-10\approx48{,}9\un{N}$. È l'esempio svolto nella sezione sul diagramma di corpo libero: conviene rifarlo senza guardare la soluzione.
:::

::: esercizio La lampada [medio]
Una lampada di $2{,}5\un{kg}$ è appesa al centro di un cavo i cui due tratti formano un angolo di $20^\circ$ con l'orizzontale. Calcola la tensione nel cavo.
>>> soluzione
All'equilibrio verticale $2T\sin20^\circ=mg$, quindi $T=\dfrac{2{,}5\cdot9{,}81}{2\cdot0{,}342}\approx35{,}9\un{N}$, più del peso della lampada ($24{,}5\un{N}$).
:::

::: esercizio Due blocchi legati [medio]
Due blocchi di massa $m_1=2{,}0\un{kg}$ e $m_2=3{,}0\un{kg}$, su un piano liscio, sono collegati da una fune ideale orizzontale. Una forza di $30\un{N}$ tira il blocco $m_2$, che a sua volta tira $m_1$ tramite la fune. Calcola l'accelerazione e la tensione della fune.
>>> soluzione
Per l'insieme $a=F/(m_1+m_2)=30/5{,}0=6{,}0\un{m/s^2}$. Per il solo $m_1$, sul quale agisce in orizzontale soltanto la tensione, $T=m_1a=2{,}0\cdot6{,}0=12\un{N}$.
:::

::: esercizio Molle in serie [medio]
Due molle di costanti $300\un{N/m}$ e $600\un{N/m}$ sono collegate in serie e sostengono una massa di $1{,}5\un{kg}$. Calcola la costante equivalente e l'allungamento totale.
>>> soluzione
$1/k_s=1/300+1/600=3/600$, quindi $k_s=200\un{N/m}$. All'equilibrio $k_sx=mg$, cioè $x=1{,}5\cdot9{,}81/200\approx0{,}074\un{m}=7{,}4\un{cm}$.
:::

::: esercizio Il cavallo e il carro [medio]
Spiega, con due diagrammi di corpo libero, perché il terzo principio non impedisce a un cavallo di trainare un carro.
>>> soluzione
Sul carro agiscono in orizzontale la trazione del cavallo, in avanti, e l'attrito delle ruote, all'indietro: se la trazione prevale il carro accelera. Sul cavallo agiscono la forza del carro, all'indietro, e la forza d'attrito del suolo sugli zoccoli, in avanti: se questa prevale il cavallo accelera. La coppia azione e reazione fra cavallo e carro compare in due diagrammi diversi e non si annulla in nessuno dei due.
:::

::: esercizio Una macchina di Atwood [avanzato]
Due masse di $2{,}0\un{kg}$ e $2{,}5\un{kg}$ sono appese ai capi di una fune ideale su una carrucola ideale e partono da ferme. Calcola l'accelerazione, la tensione e il tempo che serve alla massa maggiore per scendere di $1{,}0\un{m}$.
>>> soluzione
$a=\dfrac{m_2-m_1}{m_1+m_2}g=\dfrac{0{,}5}{4{,}5}\cdot9{,}81\approx1{,}09\un{m/s^2}$; $T=\dfrac{2m_1m_2}{m_1+m_2}g=\dfrac{2\cdot2{,}0\cdot2{,}5}{4{,}5}\cdot9{,}81\approx21{,}8\un{N}$. Partendo da ferma, $d=\tfrac12at^2$, quindi $t=\sqrt{2d/a}=\sqrt{2/1{,}09}\approx1{,}35\un{s}$.
:::

::: esercizio Il treno di vagoni [avanzato]
Una locomotiva traina tre vagoni identici, ciascuno di massa $2{,}0\times10^{4}\un{kg}$, con accelerazione $0{,}40\un{m/s^2}$. Trascurando gli attriti, calcola la forza in ciascuno dei tre agganci.
>>> soluzione
L'aggancio fra locomotiva e primo vagone accelera tre vagoni: $F_1=3\cdot2{,}0\times10^{4}\cdot0{,}40=2{,}4\times10^{4}\un{N}$. Quello fra primo e secondo vagone ne accelera due: $F_2=1{,}6\times10^{4}\un{N}$. L'ultimo ne accelera uno: $F_3=8{,}0\times10^{3}\un{N}$. Gli agganci più vicini alla locomotiva sono i più sollecitati.
:::

::: esercizio Una forza che cresce nel tempo [avanzato]
Su un corpo di massa $2{,}0\un{kg}$, inizialmente fermo, agisce una forza nella direzione $x$ che cresce nel tempo secondo $F(t)=6{,}0\,t$ (con $F$ in newton e $t$ in secondi). Calcola la velocità all'istante $t=3{,}0\un{s}$.
>>> soluzione
Usiamo $F=\dd p/\dd t$: la variazione di quantità di moto è l'area sotto il grafico di $F(t)$, $\Delta p=\int_0^{3}6{,}0\,t\,\dd t=3{,}0\,t^{2}\big|_0^{3}=27\un{N\,s}$. Quindi $v=\Delta p/m=27/2{,}0=13{,}5\un{m/s}$. Senza il calcolo integrale si arriva allo stesso risultato osservando che l'area sotto la retta è un triangolo di base $3{,}0\un{s}$ e altezza $18\un{N}$.
:::

::: esercizio Scendere lungo una fune [avanzato]
Un alpinista di $70\un{kg}$ deve calarsi lungo una fune che si spezza se la tensione supera $600\un{N}$. Con quale accelerazione minima deve scendere?
>>> soluzione
Con asse verso il basso, $mg-T=ma$. La condizione $T\le600\un{N}$ dà $a\ge g-600/70\approx9{,}81-8{,}57\approx1{,}24\un{m/s^2}$. Scendendo con un'accelerazione verso il basso di almeno $1{,}24\un{m/s^2}$ la fune regge; da fermo, appeso, la tensione varrebbe $687\un{N}$ e la fune si spezzerebbe.
:::

::: esercizio Il cavo dell'ascensore [avanzato]
La cabina di un ascensore, con il suo carico, ha una massa di $900\un{kg}$. Calcola la tensione del cavo quando la cabina accelera verso il basso con $2{,}0\un{m/s^2}$ e quando accelera verso l'alto con la stessa accelerazione.
>>> soluzione
Con asse verso l'alto, $T-mg=ma_y$. Verso il basso, $a_y=-2{,}0\un{m/s^2}$: $T=m(g-2{,}0)=900\cdot7{,}81\approx7{,}03\times10^{3}\un{N}$. Verso l'alto, $a_y=+2{,}0\un{m/s^2}$: $T=m(g+2{,}0)=900\cdot11{,}81\approx1{,}06\times10^{4}\un{N}$.
:::

::: esercizio Un salto e la Terra [avanzato]
Una persona di $60\un{kg}$ salta: durante la spinta il suo centro di massa accelera verso l'alto con circa $20\un{m/s^2}$. Stima la forza che la persona esercita sul suolo e l'accelerazione che ne riceve la Terra, di massa $5{,}97\times10^{24}\un{kg}$.
>>> soluzione
Sulla persona, $N-mg=ma$, quindi $N=m(g+a)\approx60\cdot29{,}8\approx1{,}79\times10^{3}\un{N}$. Per il terzo principio la persona spinge il suolo verso il basso con la stessa forza; l'accelerazione della Terra vale circa $1{,}79\times10^{3}/5{,}97\times10^{24}\approx3\times10^{-22}\un{m/s^2}$, del tutto impercettibile.
:::

## Glossario e fonti {#fonti}

- **Forza**: grandezza vettoriale che descrive l'azione di un corpo su un altro; unità newton.
- **Risultante**: somma vettoriale di tutte le forze esterne che agiscono su un sistema.
- **Inerzia**: tendenza di un corpo a conservare la propria velocità; la massa ne è la misura.
- **Riferimento inerziale**: sistema di riferimento in cui un corpo libero non accelera.
- **Massa**: misura dell'inerzia di un corpo; unità chilogrammo.
- **Peso**: forza gravitazionale esercitata da un pianeta su un corpo; $\vect P=m\vect g$.
- **Reazione normale**: componente perpendicolare della forza di contatto fra un corpo e una superficie.
- **Tensione**: forza esercitata da una fune o da un cavo, diretta lungo di esso.
- **Costante elastica**: rapporto fra forza e deformazione di una molla; unità N/m.
- **Diagramma di corpo libero**: rappresentazione del sistema isolato con tutte le forze esterne che agiscono su di esso.

Il capitolo segue le sezioni 2.1-2.6 della dispensa di fisica del corso, consultabile nel lettore della galassia. Per approfondire:

- I. Newton, *The Principia: Mathematical Principles of Natural Philosophy*, traduzione di I. B. Cohen e A. Whitman, University of California Press, 1999; edizione originale latina, Londra, 1687.
- G. Galilei, *Discorsi e dimostrazioni matematiche intorno a due nuove scienze*, Leida, 1638.
- R. Hooke, *Lectures de Potentia Restitutiva, or of Spring Explaining the Power of Springing Bodies*, Londra, 1678.
- M. Jammer, *Concepts of Force: A Study in the Foundations of Dynamics*, Harvard University Press, 1957.
- M. Clagett, *The Science of Mechanics in the Middle Ages*, University of Wisconsin Press, 1959.
- D. Halliday, R. Resnick, J. Walker, *Fundamentals of Physics*, 12a edizione, Wiley, 2022.
- NASA, *Moon Fact Sheet* e ESA, *Facts about Mars*, per i valori di $g$ sulla Luna e su Marte; il valore convenzionale $g_n=9{,}80665\un{m/s^2}$ e la gravità normale terrestre dai modelli geodetici di riferimento.
- NASA, descrizione del dispositivo SLAMMD della Stazione Spaziale Internazionale.
