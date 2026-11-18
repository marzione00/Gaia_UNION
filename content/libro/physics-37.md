---
unit: physics-37
titolo: Onde di materia, atomi e righe spettrali
sottotitolo: Come le onde di materia fissano i livelli degli atomi, perché ogni elemento ha le sue righe, come si legge la composizione delle stelle e delle nebulose e come la natura costruisce laser e maser fra i pianeti e attorno ai buchi neri
volume: Volume di fisica
fonte: Testo originale; riferimento principale D. Halliday, R. Resnick, J. Walker, Fundamentals of Physics, 12ª ed., moduli 38.5-38.7, 39.1-39.5, 40.1-40.7
---

## Prima di cominciare {#apertura}

Il 18 agosto 1868 un'eclissi totale di Sole oscurò l'India per quasi sette minuti. A Guntur l'astronomo francese Jules Janssen puntò uno spettroscopio sulle protuberanze, le fiamme di gas che sporgono dal bordo del Sole, e vide la riga rossa e la riga azzurra dell'idrogeno insieme a una riga gialla brillante, molto vicina alle due righe del sodio. In ottobre l'inglese Norman Lockyer osservò la stessa riga, la chiamò $D_3$ e concluse che apparteneva a un elemento sconosciuto sulla Terra, che battezzò **elio**, dal nome greco del Sole. Sulla Terra l'elio fu isolato soltanto nel 1895, quando William Ramsay lo estrasse da un minerale di uranio, la cleveite, e trovò nella luce del gas una riga gialla a $587{,}49$ milionesimi di millimetro, coincidente con quella solare.

Un elemento scoperto prima in una stella e poi in laboratorio è la prova più netta di un fatto su cui si regge l'astrofisica: la luce di un gas porta scritta la sua composizione. Ogni elemento emette e assorbe soltanto alcune lunghezze d'onda precise, le sue **righe spettrali**, e le righe si possono riconoscere anche nella luce di una galassia lontana miliardi di anni luce.

Il motivo sta nella natura ondulatoria della materia. Un elettrone legato a un nucleo si comporta come un'onda confinata, e un'onda confinata può esistere soltanto in alcune configurazioni, come la corda di una chitarra vibra soltanto con certe frequenze. Le energie permesse sono quindi discrete, e il salto fra due di esse produce un fotone di energia ben definita. Questo capitolo segue il filo che va dalle onde di materia all'atomo di idrogeno, dal principio di esclusione alla tavola periodica, dai raggi X ai laser, e arriva alle righe delle stelle, alle nebulose colorate e ai maser che orbitano attorno a un buco nero. La trattazione formale della meccanica quantistica si trova nel capitolo [Fotoni ed energia quantizzata](unit:physics-25); qui l'attenzione va soprattutto a ciò che gli atomi raccontano del cielo.

::: obiettivi
- calcolare la lunghezza d'onda di de Broglie di elettroni, neutroni e molecole;
- usare il principio di indeterminazione per stimare dimensioni ed energie atomiche e la larghezza naturale delle righe;
- calcolare i livelli di un elettrone confinato in una buca di potenziale;
- descrivere i livelli e i numeri quantici dell'atomo di idrogeno;
- calcolare le lunghezze d'onda delle serie di Lyman, Balmer e Paschen;
- spiegare la struttura della tavola periodica con il principio di esclusione;
- applicare l'effetto Zeeman alla misura dei campi magnetici stellari;
- spiegare l'origine dei raggi X caratteristici e la legge di Moseley;
- descrivere l'emissione stimolata, il laser e i maser astrofisici;
- spiegare perché le righe di Balmer sono più intense nelle stelle di tipo A e come si interpretano le righe delle nebulose.
:::

## Onde di materia {#onde}

Nel 1924 Louis de Broglie propose che a ogni particella materiale sia associata un'onda, con la stessa relazione fra quantità di moto e lunghezza d'onda che vale per i fotoni.

::: legge Lunghezza d'onda di de Broglie
$$\lambda=\frac{h}{p}$$
Per una particella non relativistica di massa $m$ ed energia cinetica $K$ la quantità di moto vale $p=\sqrt{2mK}$.
:::

Per un elettrone conviene una forma pratica: inserendo le costanti si ottiene $\lambda\approx1{,}226\ \mathrm{nm}/\sqrt{K/\mathrm{eV}}$. Un elettrone accelerato da una differenza di potenziale di $54$ V ha quindi una lunghezza d'onda di circa $0{,}167$ nm, paragonabile alla distanza fra gli atomi di un cristallo. Un cristallo è un reticolo di diffrazione naturale, e un fascio di elettroni che lo colpisce deve produrre massimi di intensità in direzioni precise, come fanno i raggi X.

Nel 1927, ai Bell Telephone Laboratories, Clinton Davisson e Lester Germer osservarono proprio questo effetto. Inviando elettroni di $54$ eV su un cristallo di nichel trovarono un massimo di elettroni diffusi a $50°$ dalla direzione del fascio, nella posizione prevista per un'onda di circa $0{,}165$ nm. Nello stesso anno George Paget Thomson ottenne figure di diffrazione facendo passare elettroni attraverso sottili lamine metalliche. Davisson e Thomson ricevettero il premio Nobel nel 1937. È curioso che George Thomson fosse figlio di J. J. Thomson, che aveva dimostrato trent'anni prima che l'elettrone è una particella: padre e figlio furono premiati per aver mostrato due facce della stessa entità.

La lunghezza d'onda di de Broglie spiega perché la natura ondulatoria della materia sfugge all'esperienza quotidiana. Una palla da baseball di $145$ g lanciata a $40$ m/s ha $\lambda\approx1{,}1\cdot10^{-34}$ m, venti ordini di grandezza più piccola di un nucleo atomico; nessuna fenditura può diffrangerla. Per le particelle leggere i valori diventano invece utili:

- un neutrone con energia di $0{,}025$ eV, tipica di un gas a temperatura ambiente, ha $\lambda\approx0{,}18$ nm, e la diffrazione di neutroni serve a studiare la struttura dei cristalli e dei materiali magnetici;
- gli elettroni di un microscopio elettronico accelerati a $200$ kV hanno, tenendo conto della relatività, $\lambda\approx2{,}5$ pm, e permettono di distinguere le singole colonne di atomi di un cristallo;
- le molecole si diffrangono anch'esse: nel 1999 il gruppo di Markus Arndt a Vienna fece interferire il fullerene $\mathrm{C}_{60}$, e nel 2019 lo stesso gruppo ottenne frange di interferenza con molecole di più di $25\,000$ unità di massa atomica, formate da quasi duemila atomi, con lunghezze d'onda di appena $53$ fm.

L'onda di una particella è descritta da una **funzione d'onda** $\psi(x,t)$, che obbedisce all'equazione di Schrödinger. Il suo significato fisico è probabilistico: la quantità $|\psi|^2\,dx$ dà la probabilità di trovare la particella fra $x$ e $x+dx$. Le frange di Davisson e Germer, o quelle delle molecole di Vienna, si formano un elettrone o una molecola alla volta: ogni particella arriva in un punto preciso del rivelatore, e soltanto la distribuzione di molti arrivi riproduce la figura di interferenza prevista da $|\psi|^2$.

## Il principio di indeterminazione {#indeterminazione}

Un'onda con una lunghezza d'onda perfettamente definita si estende all'infinito; un pacchetto d'onda localizzato in una regione piccola si ottiene sommando onde di molte lunghezze d'onda diverse. Per una particella questo significa che posizione e quantità di moto non possono essere definite entrambe con precisione arbitraria. Werner Heisenberg diede alla relazione la sua forma quantitativa nel 1927.

::: legge Principio di indeterminazione
$$\Delta x\,\Delta p_x\ge\frac{\hbar}{2},\qquad \hbar=\frac{h}{2\pi}$$
:::

La relazione riguarda le proprietà delle onde, e vale qualunque sia la qualità degli strumenti. Per un elettrone localizzato entro $\Delta x=0{,}1$ nm, la dimensione di un atomo, si ricava $\Delta p\ge5{,}3\cdot10^{-25}$ kg·m/s, cioè un'indeterminazione sulla velocità di almeno $5{,}8\cdot10^5$ m/s. Per un granello di polvere di un microgrammo localizzato entro un micrometro l'indeterminazione sulla velocità scende a circa $5\cdot10^{-20}$ m/s, del tutto trascurabile.

Il principio di indeterminazione spiega perché un atomo ha le dimensioni che ha. Se l'elettrone dell'idrogeno fosse confinato entro una distanza $r$ dal protone, la sua quantità di moto sarebbe dell'ordine di $\hbar/r$ e la sua energia cinetica di $\hbar^2/(2m_er^2)$. L'energia totale si può stimare come
$$E(r)\approx\frac{\hbar^2}{2m_er^2}-\frac{e^2}{4\pi\varepsilon_0 r}.$$
Avvicinandosi al protone l'energia potenziale diminuisce, ma l'energia cinetica cresce più rapidamente. Il minimo di $E(r)$ cade a
$$r=\frac{4\pi\varepsilon_0\hbar^2}{m_ee^2}\approx52{,}9\ \mathrm{pm},$$
e vale circa $-13{,}6$ eV. La stima riproduce il raggio di Bohr $a_0$ e l'energia dello stato fondamentale. L'elettrone resta lontano dal nucleo perché comprimerlo costerebbe troppa energia cinetica, e l'atomo trova il suo equilibrio fra le due tendenze.

Una relazione analoga lega l'energia e il tempo: uno stato che vive in media un tempo $\tau$ ha un'energia definita soltanto entro circa $\hbar/\tau$. Ogni riga spettrale ha quindi una **larghezza naturale**. Lo stato $2p$ dell'idrogeno decade in media in $1{,}6$ ns emettendo la riga Lyman α a $121{,}6$ nm; la sua energia è indeterminata di circa $4\cdot10^{-7}$ eV, e la riga ha una larghezza in frequenza $\Delta\nu=1/(2\pi\tau)$ di circa $100$ MHz, quattro parti su cento milioni della sua frequenza. Nell'atmosfera di una stella a $10\,000$ K gli atomi di idrogeno si muovono con velocità termiche di circa $13$ km/s, e l'effetto Doppler allarga la stessa riga di circa mille volte di più. Le righe stellari sono in gran parte larghe per i moti termici, per le collisioni e per la rotazione della stella, e la loro forma diventa così una misura di temperatura, di pressione e di velocità.

## Un elettrone in trappola {#trappola}

Il modello più semplice di un elettrone legato è una particella chiusa in una buca di potenziale di larghezza $L$ con pareti impenetrabili. La funzione d'onda deve annullarsi sulle pareti, come una corda fissata agli estremi, e nella buca possono stare soltanto onde stazionarie con un numero intero di mezze lunghezze d'onda: $L=n\lambda/2$, con $n=1,2,3,\dots$ La quantità di moto vale $p=h/\lambda=nh/(2L)$ e l'energia $p^2/(2m)$.

::: legge Livelli di una particella in una buca infinita
$$E_n=\frac{h^2}{8mL^2}\,n^2,\qquad n=1,2,3,\dots$$
Le funzioni d'onda sono $\psi_n(x)=\sqrt{2/L}\,\sin(n\pi x/L)$.
:::

::: figura pozzo
{"w":760,"h":290,"items":[{"t":"line","p":[260,262,260,34],"c":"ax","w":3},{"t":"line","p":[500,262,500,34],"c":"ax","w":3},{"t":"line","p":[260,262,500,262],"c":"ax","w":2},{"t":"arrow","p":[200,262,200,40],"c":"ax","w":1.6,"head":8},{"t":"text","p":[192,36],"s":"energia","c":"ax","size":11,"a":"end"},{"t":"line","p":[260,240,500,240],"c":"muted","w":1.2,"dash":true},{"t":"poly","pts":[[260.0,240.0],[263.0,239.3],[266.0,238.6],[269.0,237.9],[272.0,237.2],[275.0,236.5],[278.0,235.8],[281.0,235.1],[284.0,234.4],[287.0,233.8],[290.0,233.1],[293.0,232.5],[296.0,231.8],[299.0,231.2],[302.0,230.6],[305.0,230.0],[308.0,229.4],[311.0,228.9],[314.0,228.3],[317.0,227.8],[320.0,227.3],[323.0,226.8],[326.0,226.3],[329.0,225.9],[332.0,225.4],[335.0,225.0],[338.0,224.7],[341.0,224.3],[344.0,224.0],[347.0,223.7],[350.0,223.4],[353.0,223.1],[356.0,222.9],[359.0,222.7],[362.0,222.5],[365.0,222.3],[368.0,222.2],[371.0,222.1],[374.0,222.1],[377.0,222.0],[380.0,222.0],[383.0,222.0],[386.0,222.1],[389.0,222.1],[392.0,222.2],[395.0,222.3],[398.0,222.5],[401.0,222.7],[404.0,222.9],[407.0,223.1],[410.0,223.4],[413.0,223.7],[416.0,224.0],[419.0,224.3],[422.0,224.7],[425.0,225.0],[428.0,225.4],[431.0,225.9],[434.0,226.3],[437.0,226.8],[440.0,227.3],[443.0,227.8],[446.0,228.3],[449.0,228.9],[452.0,229.4],[455.0,230.0],[458.0,230.6],[461.0,231.2],[464.0,231.8],[467.0,232.5],[470.0,233.1],[473.0,233.8],[476.0,234.4],[479.0,235.1],[482.0,235.8],[485.0,236.5],[488.0,237.2],[491.0,237.9],[494.0,238.6],[497.0,239.3],[500.0,240.0]],"c":"force2","w":2.2},{"t":"text","p":[515,244],"s":"n = 1, energia E₁","c":"force2","size":11,"a":"start"},{"t":"line","p":[260,174,500,174],"c":"muted","w":1.2,"dash":true},{"t":"poly","pts":[[260.0,174.0],[263.0,172.6],[266.0,171.2],[269.0,169.8],[272.0,168.4],[275.0,167.1],[278.0,165.8],[281.0,164.6],[284.0,163.4],[287.0,162.3],[290.0,161.3],[293.0,160.3],[296.0,159.4],[299.0,158.7],[302.0,158.0],[305.0,157.4],[308.0,156.9],[311.0,156.5],[314.0,156.2],[317.0,156.1],[320.0,156.0],[323.0,156.1],[326.0,156.2],[329.0,156.5],[332.0,156.9],[335.0,157.4],[338.0,158.0],[341.0,158.7],[344.0,159.4],[347.0,160.3],[350.0,161.3],[353.0,162.3],[356.0,163.4],[359.0,164.6],[362.0,165.8],[365.0,167.1],[368.0,168.4],[371.0,169.8],[374.0,171.2],[377.0,172.6],[380.0,174.0],[383.0,175.4],[386.0,176.8],[389.0,178.2],[392.0,179.6],[395.0,180.9],[398.0,182.2],[401.0,183.4],[404.0,184.6],[407.0,185.7],[410.0,186.7],[413.0,187.7],[416.0,188.6],[419.0,189.3],[422.0,190.0],[425.0,190.6],[428.0,191.1],[431.0,191.5],[434.0,191.8],[437.0,191.9],[440.0,192.0],[443.0,191.9],[446.0,191.8],[449.0,191.5],[452.0,191.1],[455.0,190.6],[458.0,190.0],[461.0,189.3],[464.0,188.6],[467.0,187.7],[470.0,186.7],[473.0,185.7],[476.0,184.6],[479.0,183.4],[482.0,182.2],[485.0,180.9],[488.0,179.6],[491.0,178.2],[494.0,176.8],[497.0,175.4],[500.0,174.0]],"c":"force","w":2.2},{"t":"text","p":[515,178],"s":"n = 2, energia 4E₁","c":"force","size":11,"a":"start"},{"t":"line","p":[260,64,500,64],"c":"muted","w":1.2,"dash":true},{"t":"poly","pts":[[260.0,64.0],[263.0,61.9],[266.0,59.8],[269.0,57.8],[272.0,55.8],[275.0,54.0],[278.0,52.3],[281.0,50.8],[284.0,49.4],[287.0,48.3],[290.0,47.4],[293.0,46.7],[296.0,46.2],[299.0,46.0],[302.0,46.1],[305.0,46.3],[308.0,46.9],[311.0,47.7],[314.0,48.7],[317.0,49.9],[320.0,51.3],[323.0,52.9],[326.0,54.6],[329.0,56.5],[332.0,58.4],[335.0,60.5],[338.0,62.6],[341.0,64.7],[344.0,66.8],[347.0,68.9],[350.0,70.9],[353.0,72.8],[356.0,74.6],[359.0,76.2],[362.0,77.7],[365.0,79.0],[368.0,80.0],[371.0,80.9],[374.0,81.5],[377.0,81.9],[380.0,82.0],[383.0,81.9],[386.0,81.5],[389.0,80.9],[392.0,80.0],[395.0,79.0],[398.0,77.7],[401.0,76.2],[404.0,74.6],[407.0,72.8],[410.0,70.9],[413.0,68.9],[416.0,66.8],[419.0,64.7],[422.0,62.6],[425.0,60.5],[428.0,58.4],[431.0,56.5],[434.0,54.6],[437.0,52.9],[440.0,51.3],[443.0,49.9],[446.0,48.7],[449.0,47.7],[452.0,46.9],[455.0,46.3],[458.0,46.1],[461.0,46.0],[464.0,46.2],[467.0,46.7],[470.0,47.4],[473.0,48.3],[476.0,49.4],[479.0,50.8],[482.0,52.3],[485.0,54.0],[488.0,55.8],[491.0,57.8],[494.0,59.8],[497.0,61.9],[500.0,64.0]],"c":"force4","w":2.2},{"t":"text","p":[515,68],"s":"n = 3, energia 9E₁","c":"force4","size":11,"a":"start"},{"t":"arrow","p":[380,280,264,280],"c":"muted","w":1.2,"head":6},{"t":"arrow","p":[380,280,496,280],"c":"muted","w":1.2,"head":6},{"t":"text","p":[380,274],"s":"L","c":"ax","size":11},{"t":"text","p":[130,150],"s":"pareti","c":"muted","size":10},{"t":"text","p":[130,164],"s":"impenetrabili","c":"muted","size":10}]}
---
Un elettrone in una buca di potenziale con pareti impenetrabili. Le energie permesse crescono come $n^2$: il secondo livello vale quattro volte il primo e il terzo nove volte. Su ogni livello è disegnata la funzione d'onda, un'onda stazionaria con $n$ mezze lunghezze d'onda e $n-1$ nodi interni.
:::

Le energie crescono come il quadrato del numero quantico, come mostra la figura 1. Il livello più basso, l'**energia di punto zero**, è diverso da zero: una particella confinata non può stare ferma, in accordo con il principio di indeterminazione. L'ordine di grandezza dipende fortemente da $L$. Per un elettrone in una buca larga $0{,}1$ nm si ha $E_1\approx37{,}6$ eV, l'energia tipica dei legami atomici più forti; per $L=1$ nm si scende a $0{,}376$ eV e per $L=10$ nm a meno di $4$ meV. Un fotone emesso nel salto da un livello a un altro porta l'energia $E_{n_2}-E_{n_1}$, e restringendo la buca il colore della luce emessa si sposta verso il blu.

Questo è il principio dei **punti quantici**, nanocristalli di semiconduttore larghi pochi nanometri. Gli elettroni al loro interno sono confinati in tutte e tre le direzioni, e il colore della luce che emettono dipende dalla dimensione del cristallo: i più piccoli brillano in blu, i più grandi in rosso. Moungi Bawendi, Louis Brus e Aleksej Ekimov ricevettero per la loro scoperta e sintesi il premio Nobel per la chimica nel 2023, e i punti quantici si trovano oggi negli schermi televisivi e nei marcatori luminosi usati in biologia.

Una buca reale ha pareti di altezza finita. La funzione d'onda penetra allora nelle pareti con una coda che decresce esponenzialmente, l'elettrone dispone di uno spazio un po' più ampio e i livelli si abbassano; il numero di stati legati diventa finito, e sopra il bordo della buca l'elettrone è libero. Se la parete è sottile, la coda può raggiungere l'altro lato: è l'effetto tunnel, da cui dipendono la fusione nucleare nel Sole e il decadimento alfa, che si incontreranno nei capitoli dedicati ai nuclei.

In due o tre dimensioni i livelli si ottengono sommando i contributi delle diverse direzioni. In una scatola quadrata di lato $L$ si ha $E=\dfrac{h^2}{8mL^2}(n_x^2+n_y^2)$, e stati diversi, come $(1,2)$ e $(2,1)$, possono avere la stessa energia: si dicono **degeneri**. Nel 1993 Michael Crommie, Christopher Lutz e Donald Eigler, all'IBM, costruirono con la punta di un microscopio a effetto tunnel, a $4$ K, un recinto circolare di $48$ atomi di ferro su una superficie di rame, con un raggio di $7{,}13$ nm. Gli elettroni della superficie rimasti intrappolati all'interno disegnavano anelli concentrici di densità, le onde stazionarie di una particella in una scatola circolare: un'immagine diretta di una funzione d'onda confinata.

## L'atomo di idrogeno {#idrogeno}

L'idrogeno è l'atomo più semplice e il più abbondante dell'universo: un protone e un elettrone legati dall'attrazione elettrica, con energia potenziale $U(r)=-e^2/(4\pi\varepsilon_0r)$. Risolvendo l'equazione di Schrödinger per questa buca, che si allarga verso l'alto come un imbuto, si ottengono energie permesse che dipendono soltanto da un numero intero $n$, il **numero quantico principale**.

::: legge Livelli dell'atomo di idrogeno
$$E_n=-\frac{m_ee^4}{8\varepsilon_0^2h^2}\frac{1}{n^2}=-\frac{13{,}6\ \mathrm{eV}}{n^2}$$
:::

Lo stato fondamentale, $n=1$, ha energia $-13{,}6$ eV: per strappare l'elettrone, cioè per **ionizzare** l'atomo, serve un'energia di $13{,}6$ eV, quella di un fotone ultravioletto di $91{,}2$ nm. I livelli eccitati si addensano verso lo zero, che corrisponde all'elettrone libero e fermo lontano dal protone. Niels Bohr aveva ottenuto la stessa formula nel 1913 con un modello di orbite circolari; la meccanica quantistica conferma le energie di Bohr e sostituisce le orbite con funzioni d'onda tridimensionali.

Ogni stato è identificato da quattro numeri quantici:

- il numero principale $n=1,2,3,\dots$, che fissa l'energia;
- il numero orbitale $\ell=0,1,\dots,n-1$, che fissa il modulo del momento angolare, $\sqrt{\ell(\ell+1)}\,\hbar$; gli stati con $\ell=0,1,2,3$ si indicano con le lettere $s,p,d,f$;
- il numero magnetico $m_\ell=-\ell,\dots,+\ell$, che fissa la componente del momento angolare lungo un asse;
- il numero di spin $m_s=\pm\tfrac12$, che descrive l'orientazione del momento angolare intrinseco dell'elettrone.

Per un dato $n$ ci sono $n$ valori di $\ell$, ciascuno con $2\ell+1$ valori di $m_\ell$ e due valori di $m_s$: in tutto $2n^2$ stati con la stessa energia. Nello stato fondamentale la densità di probabilità di trovare l'elettrone a distanza $r$ dal protone è massima per $r=a_0=52{,}9$ pm; la nuvola si estende con una coda esponenziale, e nessuna orbita ha un raggio definito.

::: figura livelli
{"w":760,"h":290,"items":[{"t":"line","p":[150,250.9,690,250.9],"c":"ax","w":1.6},{"t":"line","p":[150,92.7,690,92.7],"c":"ax","w":1.6},{"t":"line","p":[150,63.4,690,63.4],"c":"ax","w":1.6},{"t":"line","p":[150,53.2,690,53.2],"c":"muted","w":1.1},{"t":"line","p":[150,48.4,690,48.4],"c":"muted","w":1.1},{"t":"line","p":[150,45.9,690,45.9],"c":"muted","w":1.1},{"t":"line","p":[150,40.0,690,40.0],"c":"muted","w":1.1,"dash":true},{"t":"text","p":[142,254.9],"s":"n = 1   −13,6 eV","c":"ax","size":10,"a":"end"},{"t":"text","p":[142,96.7],"s":"n = 2   −3,4 eV","c":"ax","size":10,"a":"end"},{"t":"text","p":[142,67.4],"s":"n = 3   −1,5 eV","c":"ax","size":10,"a":"end"},{"t":"text","p":[142,42.0],"s":"n = ∞   0","c":"ax","size":10,"a":"end"},{"t":"arrow","p":[200,92.7,200,248.9],"c":"force4","w":2,"head":7},{"t":"arrow","p":[230,63.4,230,248.9],"c":"force4","w":2,"head":7},{"t":"arrow","p":[260,53.2,260,248.9],"c":"force4","w":2,"head":7},{"t":"text","p":[230,272],"s":"Lyman, ultravioletto","c":"force4","size":10},{"t":"arrow","p":[340,63.4,340,90.7],"c":"force","w":2,"head":7},{"t":"arrow","p":[370,53.2,370,90.7],"c":"force","w":2,"head":7},{"t":"arrow","p":[400,48.4,400,90.7],"c":"force","w":2,"head":7},{"t":"arrow","p":[430,45.9,430,90.7],"c":"force","w":2,"head":7},{"t":"text","p":[385,116],"s":"Balmer, visibile","c":"force","size":10},{"t":"text","p":[332,80],"s":"Hα","c":"force","size":10,"a":"end"},{"t":"arrow","p":[560,53.2,560,61.4],"c":"force2","w":2,"head":7},{"t":"arrow","p":[590,48.4,590,61.4],"c":"force2","w":2,"head":7},{"t":"arrow","p":[620,45.9,620,61.4],"c":"force2","w":2,"head":7},{"t":"text","p":[590,86],"s":"Paschen, infrarosso","c":"force2","size":10}]}
---
I livelli di energia dell'atomo di idrogeno e le prime tre serie di transizioni. I salti verso $n=1$ formano la serie di Lyman, nell'ultravioletto; quelli verso $n=2$ la serie di Balmer, in gran parte visibile; quelli verso $n=3$ la serie di Paschen, nell'infrarosso.
:::

Le dimensioni degli stati eccitati crescono come $n^2a_0$. In un gas denso come l'aria un atomo con $n=100$ verrebbe ionizzato al primo urto. Nelle nubi di gas ionizzato attorno alle stelle giovani, dove le densità sono milioni di miliardi di volte inferiori a quella dell'aria, gli elettroni catturati dai protoni scendono lentamente lungo la scala dei livelli. Nel 1965 Bertil Höglund e Peter Mezger, con il radiotelescopio di $43$ m di Green Bank, osservarono in M17, nella nebulosa di Orione e in altre nove nubi la riga emessa nel salto da $n=110$ a $n=109$, alla frequenza di $5009$ MHz. Un atomo di idrogeno con $n=110$ ha un raggio di circa $0{,}64$ μm, più di diecimila volte quello dell'atomo nello stato fondamentale. Queste **righe di ricombinazione radio** permettono di misurare la temperatura e il moto del gas ionizzato in tutta la Galassia, perché le onde radio attraversano la polvere che oscura la luce visibile.

## Le serie spettrali {#serie}

Quando l'elettrone salta da un livello $n_2$ a un livello inferiore $n_1$, l'atomo emette un fotone di energia $hf=E_{n_2}-E_{n_1}$; un fotone con la stessa energia, assorbito, produce il salto inverso. Dividendo per $hc$ si ottiene la formula che Johannes Rydberg aveva trovato empiricamente nel 1888, generalizzando la formula di Johann Balmer del 1885 per le quattro righe visibili.

::: legge Formula di Rydberg per l'idrogeno
$$\frac{1}{\lambda}=R_H\left(\frac{1}{n_1^2}-\frac{1}{n_2^2}\right),\qquad n_2>n_1$$
con $R_H=1{,}096\,776\cdot10^{7}\ \mathrm{m^{-1}}$.
:::

La costante $R_H$ differisce di cinque parti su diecimila dal valore $R_\infty=1{,}097\,373\cdot10^7$ m⁻¹ che si avrebbe con un nucleo infinitamente pesante, perché elettrone e protone ruotano attorno al centro di massa comune; nel calcolo entra la massa ridotta $m_em_p/(m_e+m_p)$. Ogni valore di $n_1$ dà una **serie** di righe, che si addensano verso un limite per $n_2\to\infty$:

- la **serie di Lyman** ($n_1=1$) va da $121{,}6$ nm, la riga Lyman α, al limite di $91{,}2$ nm, nell'ultravioletto lontano assorbito dall'atmosfera terrestre;
- la **serie di Balmer** ($n_1=2$) va da $656{,}5$ nm, la riga rossa Hα, al limite di $364{,}7$ nm, e comprende le righe Hβ a $486{,}3$ nm, Hγ a $434{,}2$ nm e Hδ a $410{,}3$ nm;
- la **serie di Paschen** ($n_1=3$) va da $1875{,}6$ nm al limite di $820{,}6$ nm, nell'infrarosso vicino.

I valori indicati sono lunghezze d'onda nel vuoto. Nei cataloghi di righe visibili si usano spesso le lunghezze d'onda misurate nell'aria, più corte di circa tre parti su diecimila per l'indice di rifrazione dell'aria: Hα diventa $656{,}28$ nm, Hβ $486{,}13$ nm. Confrontare un valore nell'aria con uno nel vuoto produce un errore apparente di quasi due decimi di nanometro, pari a uno spostamento Doppler di oltre $80$ km/s.

::: figura balmer
{"w":760,"h":285,"items":[{"t":"axes","o":[90,250],"x":[660,"livello n₂"],"y":[225,"lunghezza d'onda, nm"],"sx":72,"sy":0.6,"xt":[[0,"2"],[2,"4"],[4,"6"],[6,"8"]],"yt":[[50,"400"],[150,"500"],[250,"600"],[350,"700"]]},{"t":"plot","o":[90,250],"sx":72,"sy":0.6,"pts":[[0,14.7],[8.6,14.7]],"c":"muted","w":1.4,"dash":true},{"t":"text","p":[97.2,233.2],"s":"limite della serie, 364,7 nm","c":"muted","size":10,"a":"start"},{"t":"circle","p":[162,66.1,4.5],"c":"force"},{"t":"circle","p":[234,168.2,4.5],"c":"force"},{"t":"circle","p":[306,199.5,4.5],"c":"force"},{"t":"circle","p":[378,213.8,4.5],"c":"force"},{"t":"circle","p":[450,221.7,4.5],"c":"force"},{"t":"circle","p":[522,226.6,4.5],"c":"force"},{"t":"circle","p":[594,229.8,4.5],"c":"force"},{"t":"circle","p":[666,232.1,4.5],"c":"force"},{"t":"text","p":[172,70.1],"s":"Hα, 656,5 nm","c":"force","size":10,"a":"start"},{"t":"text","p":[244,172.2],"s":"Hβ, 486,3 nm","c":"force","size":10,"a":"start"},{"t":"text","p":[316,193.5],"s":"Hγ, 434,2 nm","c":"force","size":10,"a":"start"},{"t":"text","p":[388,203.8],"s":"Hδ, 410,3 nm","c":"force","size":10,"a":"start"}]}
---
La lunghezza d'onda delle righe di Balmer in funzione del livello superiore $n_2$, calcolata con la formula di Rydberg. Le righe si addensano verso il limite della serie a $364{,}7$ nm, oltre il quale l'atomo assorbe con continuità perché il fotone basta a ionizzarlo.
:::

La figura 3 mostra come le righe di Balmer si avvicinino al limite della serie. Oltre il limite l'assorbimento diventa continuo: ogni fotone con $\lambda<364{,}7$ nm può strappare un elettrone dal livello $n=2$. Negli spettri delle stelle calde questo produce un brusco calo della luce sotto i $365$ nm, il **salto di Balmer**, la cui ampiezza dipende dalla temperatura e dalla densità dell'atmosfera stellare. Allo stesso modo l'idrogeno neutro assorbe tutti i fotoni con $\lambda<91{,}2$ nm, il limite della serie di Lyman: la luce ultravioletta estrema delle stelle lontane è in gran parte nascosta dal gas interstellare.

La massa ridotta ha permesso una scoperta. Nel deuterio, l'isotopo dell'idrogeno con un neutrone nel nucleo, il nucleo pesa il doppio, la costante di Rydberg cresce leggermente e tutte le righe si spostano verso il blu: per Hα lo spostamento vale circa $0{,}18$ nm, l'equivalente Doppler di circa $82$ km/s. Alla fine del 1931 Harold Urey, Ferdinand Brickwedde e George Murphy distillarono idrogeno liquido per concentrare l'isotopo pesante e trovarono accanto alle righe di Balmer deboli compagne, nelle posizioni previste. Urey ricevette il premio Nobel per la chimica nel 1934. Lo stesso spostamento permette oggi di misurare il rapporto fra deuterio e idrogeno nel gas interstellare e nelle nubi lontane che assorbono la luce dei quasar; il deuterio si è formato quasi tutto nei primi minuti dopo il Big Bang, e la sua abbondanza è una misura della densità della materia ordinaria nell'universo. Nella cometa 67P la sonda Rosetta misurò invece il rapporto fra deuterio e idrogeno con uno spettrometro di massa, come si è visto nel capitolo [Particelle cariche nei campi magnetici](unit:physics-32).

## Spin, principio di esclusione e tavola periodica {#esclusione}

L'elettrone possiede un momento angolare intrinseco, lo **spin**, con componente $\pm\hbar/2$ lungo qualunque asse, e un momento magnetico associato, che l'esperimento di Stern e Gerlach separa in due fasci, come si è visto nel capitolo [Equazioni di Maxwell e magnetismo della materia](unit:physics-35). Negli atomi con più elettroni interviene una regola enunciata da Wolfgang Pauli nel 1925.

::: legge Principio di esclusione di Pauli
Due elettroni dello stesso atomo, o più in generale due fermioni identici nello stesso sistema, non possono occupare lo stesso stato quantico, cioè avere gli stessi quattro numeri quantici.
:::

Senza il principio di esclusione tutti gli elettroni di un atomo cadrebbero nello stato $n=1$ e la chimica sarebbe uniforme. Il principio costringe invece gli elettroni a riempire **gusci** successivi: il guscio $n=1$ accoglie $2$ elettroni, il guscio $n=2$ ne accoglie $8$, il guscio $n=3$ ne accoglie $18$. Dentro ogni guscio gli elettroni con $\ell$ minore, che penetrano di più verso il nucleo, sono più legati, e i sottogusci si riempiono in un ordine preciso: $1s$, $2s$, $2p$, $3s$, $3p$, $4s$, $3d$ e così via.

Questa struttura si legge nell'**energia di prima ionizzazione**, l'energia necessaria per strappare l'elettrone più esterno. L'elio, con il guscio $n=1$ completo, è l'atomo più difficile da ionizzare, $24{,}6$ eV. Il litio ha un solo elettrone nel guscio $n=2$, lontano dal nucleo e schermato dai due elettroni interni, e si ionizza con appena $5{,}4$ eV. Lungo il secondo periodo l'energia cresce fino ai $21{,}6$ eV del neon, che chiude il guscio, poi crolla ai $5{,}1$ eV del sodio e risale fino ai $15{,}8$ eV dell'argon. I gas nobili, con i gusci completi, sono inerti; i metalli alcalini, con un elettrone solitario, sono i più reattivi. La periodicità chimica di Mendeleev, scoperta nel 1869 senza conoscere gli elettroni, riflette la struttura a gusci imposta dal principio di esclusione. Il tema è sviluppato in chimica nei capitoli [Livelli atomici e spettri](unit:chemistry-04) e [Periodicità e carica efficace](unit:chemistry-05).

::: figura ionizzazione
{"w":760,"h":285,"items":[{"t":"axes","o":[70,250],"x":[670,"numero atomico Z"],"y":[225,"energia di ionizzazione, eV"],"sx":29,"sy":8,"xt":[[1,"1"],[5,"5"],[10,"10"],[15,"15"]],"yt":[[0,"0"],[5,"5"],[10,"10"],[15,"15"],[20,"20"],[25,"25"]]},{"t":"plot","o":[70,250],"sx":29,"sy":8,"pts":[[1,13.598],[2,24.587],[3,5.392],[4,9.323],[5,8.298],[6,11.26],[7,14.534],[8,13.618],[9,17.423],[10,21.565],[11,5.139],[12,7.646],[13,5.986],[14,8.152],[15,10.487],[16,10.36],[17,12.968],[18,15.76],[19,4.341],[20,6.113]],"c":"force2","w":1.8},{"t":"circle","p":[99,141.2,3.5],"c":"force2"},{"t":"circle","p":[128,53.3,3.5],"c":"force2"},{"t":"circle","p":[157,206.9,3.5],"c":"force2"},{"t":"circle","p":[186,175.4,3.5],"c":"force2"},{"t":"circle","p":[215,183.6,3.5],"c":"force2"},{"t":"circle","p":[244,159.9,3.5],"c":"force2"},{"t":"circle","p":[273,133.7,3.5],"c":"force2"},{"t":"circle","p":[302,141.1,3.5],"c":"force2"},{"t":"circle","p":[331,110.6,3.5],"c":"force2"},{"t":"circle","p":[360,77.5,3.5],"c":"force2"},{"t":"circle","p":[389,208.9,3.5],"c":"force2"},{"t":"circle","p":[418,188.8,3.5],"c":"force2"},{"t":"circle","p":[447,202.1,3.5],"c":"force2"},{"t":"circle","p":[476,184.8,3.5],"c":"force2"},{"t":"circle","p":[505,166.1,3.5],"c":"force2"},{"t":"circle","p":[534,167.1,3.5],"c":"force2"},{"t":"circle","p":[563,146.3,3.5],"c":"force2"},{"t":"circle","p":[592,123.9,3.5],"c":"force2"},{"t":"circle","p":[621,215.3,3.5],"c":"force2"},{"t":"circle","p":[650,201.1,3.5],"c":"force2"},{"t":"text","p":[137,57.3],"s":"He","c":"force","size":11,"a":"start"},{"t":"text","p":[360,67.5],"s":"Ne","c":"force","size":11},{"t":"text","p":[592,113.9],"s":"Ar","c":"force","size":11},{"t":"text","p":[157,222.9],"s":"Li","c":"force4","size":11},{"t":"text","p":[389,224.9],"s":"Na","c":"force4","size":11},{"t":"text","p":[621,231.3],"s":"K","c":"force4","size":11},{"t":"text","p":[505,58],"s":"gas nobili in alto, metalli alcalini in basso","c":"ax","size":10}]}
---
L'energia di prima ionizzazione degli elementi dall'idrogeno al calcio, secondo i dati del NIST. I massimi cadono sui gas nobili, con i gusci completi, e i minimi sui metalli alcalini, con un solo elettrone esterno debolmente legato.
:::

La figura 4 ha un'eco diretta negli spettri stellari. Gli elementi con energia di ionizzazione bassa, come il sodio e il calcio, hanno righe di risonanza, cioè transizioni che partono dallo stato fondamentale dell'atomo o dello ione, nel visibile e nel vicino ultravioletto. Nelle stelle fredde come il Sole queste righe risultano molto evidenti anche per elementi poco abbondanti. Le righe più intense dello spettro visibile del Sole sono le righe H e K del calcio ionizzato, a $396{,}8$ e $393{,}4$ nm, e la coppia gialla del sodio, a $589{,}0$ e $589{,}6$ nm, le stesse che Janssen vide accanto alla riga dell'elio.

Il principio di esclusione sostiene anche intere stelle. Nel nucleo di una nana bianca, come Sirio B, la materia è così compressa che gli elettroni occupano tutti gli stati di bassa energia disponibili; comprimerla ancora significherebbe portare elettroni in stati di quantità di moto sempre più alta. Ne nasce una pressione, la **pressione di degenerazione**, che esiste anche a temperatura zero e impedisce alla stella di collassare sotto il proprio peso.

## Righe in un campo magnetico: l'effetto Zeeman {#zeeman}

Un elettrone in un atomo ha un momento magnetico orbitale e uno di spin. In un campo magnetico $B$ l'energia di un livello si sposta di una quantità proporzionale a $B$ e alla componente del momento angolare lungo il campo, e un livello si divide in più sottolivelli. Una riga spettrale si separa allora in più componenti, come scoprì Pieter Zeeman nel 1896. Per una riga semplice la separazione fra le componenti estreme e la riga originaria vale, in lunghezza d'onda,
$$\Delta\lambda=g\,\frac{e\lambda^2B}{4\pi m_ec},$$
dove $g$ è un fattore numerico, il fattore di Landé, che dipende dai livelli coinvolti.

Nel giugno del 1908, all'osservatorio di Mount Wilson, George Ellery Hale osservò che le righe dello spettro delle macchie solari si dividevano in componenti polarizzate in modo opposto. Era la prima misura di un campo magnetico fuori dalla Terra: circa $3000$ gauss, cioè $0{,}3$ T, migliaia di volte il campo terrestre. Per la riga del ferro a $630{,}25$ nm, con $g=2{,}5$, un campo di $0{,}3$ T separa le componenti di circa $14$ pm, pochi centesimi di nanometro: abbastanza per uno spettrografo di grandi dimensioni come quello di Hale, lungo nove metri. Oggi i telescopi solari mappano il campo magnetico di tutta la superficie del Sole misurando la polarizzazione delle righe sensibili, e l'effetto Zeeman rivela campi di migliaia di gauss in molte stelle e di milioni di gauss in alcune nane bianche.

Lo stesso principio, applicato ai nuclei, è alla base della **risonanza magnetica**. Il protone ha anch'esso uno spin e un momento magnetico: in un campo $B$ i due stati di spin differiscono di un'energia proporzionale a $B$, e un'onda radio di frequenza $f=42{,}58$ MHz per tesla induce il passaggio fra i due stati. In un tomografo a $1{,}5$ T la frequenza vale circa $64$ MHz; dall'intensità e dal tempo di rilassamento dei segnali si ricostruiscono le immagini dei tessuti. Nell'atomo di idrogeno lo spin dell'elettrone e quello del protone possono essere paralleli o antiparalleli, e il salto fra le due configurazioni produce la riga a $21$ cm descritta nel capitolo [Induzione, circuiti oscillanti e radio](unit:physics-34). Misurando la separazione Zeeman di questa riga si trovano nelle nubi interstellari campi di pochi microgauss, cioè di qualche decimo di nanotesla.

## Raggi X e numero atomico {#raggix}

In un tubo a raggi X gli elettroni, accelerati da una differenza di potenziale $V$ di decine di kilovolt, colpiscono un bersaglio metallico. Lo spettro emesso ha due componenti. La prima è continua: gli elettroni frenati dai nuclei irradiano fotoni di ogni energia fino a un massimo $eV$, quando un elettrone cede tutta la sua energia cinetica in un solo fotone. Lo spettro continuo si interrompe quindi a una lunghezza d'onda minima
$$\lambda_{\min}=\frac{hc}{eV},$$
che vale circa $35$ pm per un tubo a $35$ kV e dipende soltanto dalla tensione, qualunque sia il metallo del bersaglio.

La seconda componente è formata da righe intense, caratteristiche dell'elemento. Un elettrone del fascio può strappare un elettrone dal guscio più interno, il guscio K con $n=1$; un elettrone del guscio L, con $n=2$, scende allora a occupare la lacuna ed emette un fotone, la riga $K_\alpha$. Gli elettroni interni sentono quasi tutta la carica del nucleo, schermata soltanto dall'altro elettrone del guscio K, e l'energia della riga vale con buona approssimazione
$$E_{K\alpha}\approx\frac34\cdot13{,}6\ \mathrm{eV}\cdot(Z-1)^2.$$

Nel 1913 e nel 1914 Henry Moseley misurò le righe $K_\alpha$ di decine di elementi e trovò che la radice quadrata della frequenza cresce linearmente con il numero d'ordine dell'elemento. Fino ad allora la tavola periodica era ordinata per massa atomica, con alcune inversioni inspiegate; Moseley mostrò che il numero giusto è la carica del nucleo, il **numero atomico** $Z$, e individuò i posti vuoti degli elementi ancora da scoprire, come quelli con $Z=43$, $61$, $72$ e $75$. Moseley morì nel 1915, a ventisette anni, nella battaglia di Gallipoli.

Per il ferro, con $Z=26$, la formula di Moseley dà circa $6{,}4$ keV, cioè una lunghezza d'onda di $0{,}19$ nm. La riga del ferro a $6{,}4$ keV è una delle più importanti dell'astronomia X. Il ferro è abbondante, perché è il punto di arrivo delle reazioni nucleari nelle stelle massicce e nelle esplosioni di supernova, e la riga nasce quando il gas freddo viene illuminato da raggi X intensi. Nel 1995 Yasuo Tanaka e collaboratori, con il satellite giapponese ASCA, osservarono per oltre quattro giorni la galassia attiva MCG-6-30-15. La riga del ferro appariva larghissima, con velocità di circa un terzo della velocità della luce, e asimmetrica, con una lunga coda verso le basse energie: la forma attesa per le regioni più interne di un disco di gas che ruota attorno a un buco nero, dove si sommano l'effetto Doppler relativistico e lo spostamento verso il rosso gravitazionale.

## Laser: luce coerente per emissione stimolata {#laser}

Nel 1917 Albert Einstein, studiando l'equilibrio fra la materia e la radiazione di corpo nero, mostrò che un atomo può scambiare un fotone con il campo di radiazione in tre modi:

1. **assorbimento**: un fotone di energia $hf=E_2-E_1$ porta l'atomo dal livello $E_1$ al livello $E_2$;
2. **emissione spontanea**: l'atomo eccitato torna al livello $E_1$ emettendo un fotone in una direzione e in un istante casuali;
3. **emissione stimolata**: un fotone di energia $hf$ che passa vicino all'atomo eccitato lo induce a scendere, e il nuovo fotone ha la stessa frequenza, la stessa fase, la stessa direzione e la stessa polarizzazione del primo.

::: figura laser
{"w":760,"h":280,"items":[{"t":"line","p":[60,80,220,80],"c":"ax","w":2},{"t":"line","p":[60,190,220,190],"c":"ax","w":2},{"t":"text","p":[54,84],"s":"E₂","c":"ax","size":11,"a":"end"},{"t":"text","p":[54,194],"s":"E₁","c":"ax","size":11,"a":"end"},{"t":"poly","pts":[[60.0,135.0],[61.1,137.5],[62.3,139.3],[63.4,140.0],[64.5,139.3],[65.7,137.5],[66.8,135.0],[67.9,132.5],[69.1,130.7],[70.2,130.0],[71.3,130.7],[72.5,132.5],[73.6,135.0],[74.7,137.5],[75.9,139.3],[77.0,140.0],[78.1,139.3],[79.3,137.5],[80.4,135.0],[81.5,132.5],[82.7,130.7],[83.8,130.0],[84.9,130.7],[86.1,132.5],[87.2,135.0],[88.3,137.5],[89.5,139.3],[90.6,140.0],[91.7,139.3],[92.9,137.5],[94.0,135.0],[95.1,132.5],[96.3,130.7],[97.4,130.0],[98.5,130.7],[99.7,132.5],[100.8,135.0],[101.9,137.5],[103.1,139.3],[104.2,140.0],[105.3,139.3],[106.5,137.5],[107.6,135.0],[108.7,132.5],[109.9,130.7],[111.0,130.0],[112.1,130.7],[113.3,132.5],[114.4,135.0],[115.5,137.5],[116.7,139.3],[117.8,140.0],[118.9,139.3],[120.1,137.5],[121.2,135.0],[122.3,132.5],[123.5,130.7],[124.6,130.0],[125.7,130.7],[126.9,132.5],[128.0,135.0]],"c":"accent","w":1.8},{"t":"arrow","p":[126.0,135.0,138,135],"c":"accent","w":1.8,"head":7},{"t":"arrow","p":[150,186,150,86],"c":"force","w":2.2,"head":8},{"t":"circle","p":[150,80,6],"c":"force"},{"t":"text","p":[140,236],"s":"assorbimento","c":"ax","size":11},{"t":"line","p":[310,80,470,80],"c":"ax","w":2},{"t":"line","p":[310,190,470,190],"c":"ax","w":2},{"t":"text","p":[304,84],"s":"E₂","c":"ax","size":11,"a":"end"},{"t":"text","p":[304,194],"s":"E₁","c":"ax","size":11,"a":"end"},{"t":"arrow","p":[400,84,400,184],"c":"force","w":2.2,"head":8},{"t":"circle","p":[400,190,6],"c":"force"},{"t":"poly","pts":[[410.0,128.0],[412.2,129.7],[414.1,130.8],[415.5,130.9],[416.3,129.8],[416.6,127.6],[416.6,124.8],[416.6,122.1],[416.9,119.9],[417.7,118.7],[419.1,118.8],[421.0,119.9],[423.2,121.7],[425.4,123.4],[427.3,124.5],[428.7,124.6],[429.5,123.5],[429.8,121.3],[429.8,118.5],[429.8,115.7],[430.1,113.5],[430.9,112.4],[432.3,112.5],[434.2,113.6],[436.4,115.3],[438.6,117.1],[440.5,118.2],[441.9,118.3],[442.7,117.1],[443.0,114.9],[443.0,112.2],[443.0,109.4],[443.3,107.2],[444.1,106.1],[445.5,106.1],[447.4,107.3],[449.6,109.0],[451.8,110.7],[453.7,111.8],[455.1,111.9],[455.9,110.8],[456.2,108.6],[456.2,105.8],[456.2,103.0],[456.5,100.9],[457.3,99.7],[458.7,99.8],[460.6,100.9],[462.8,102.7],[465.0,104.4],[466.9,105.5],[468.3,105.6],[469.1,104.5],[469.4,102.3],[469.4,99.5],[469.4,96.7],[469.7,94.5],[470.5,93.4],[471.9,93.5],[473.8,94.6],[476.0,96.3]],"c":"accent","w":1.8},{"t":"arrow","p":[474.2,97.2,485,92],"c":"accent","w":1.8,"head":7},{"t":"text","p":[390,236],"s":"emissione spontanea","c":"ax","size":11},{"t":"line","p":[560,80,720,80],"c":"ax","w":2},{"t":"line","p":[560,190,720,190],"c":"ax","w":2},{"t":"text","p":[554,84],"s":"E₂","c":"ax","size":11,"a":"end"},{"t":"text","p":[554,194],"s":"E₁","c":"ax","size":11,"a":"end"},{"t":"poly","pts":[[550.0,135.0],[551.3,137.5],[552.6,139.3],[553.9,140.0],[555.2,139.3],[556.5,137.5],[557.8,135.0],[559.1,132.5],[560.4,130.7],[561.7,130.0],[563.0,130.7],[564.3,132.5],[565.6,135.0],[566.9,137.5],[568.2,139.3],[569.5,140.0],[570.8,139.3],[572.1,137.5],[573.4,135.0],[574.7,132.5],[576.0,130.7],[577.3,130.0],[578.6,130.7],[579.9,132.5],[581.2,135.0],[582.5,137.5],[583.8,139.3],[585.1,140.0],[586.4,139.3],[587.7,137.5],[589.0,135.0],[590.3,132.5],[591.6,130.7],[592.9,130.0],[594.2,130.7],[595.5,132.5],[596.8,135.0],[598.1,137.5],[599.4,139.3],[600.7,140.0],[602.0,139.3],[603.3,137.5],[604.6,135.0],[605.9,132.5],[607.2,130.7],[608.5,130.0],[609.8,130.7],[611.1,132.5],[612.4,135.0],[613.7,137.5],[615.0,139.3],[616.3,140.0],[617.6,139.3],[618.9,137.5],[620.2,135.0],[621.5,132.5],[622.8,130.7],[624.1,130.0],[625.4,130.7],[626.7,132.5],[628.0,135.0]],"c":"accent","w":1.8},{"t":"arrow","p":[626.0,135.0,638,135],"c":"accent","w":1.8,"head":7},{"t":"arrow","p":[650,84,650,184],"c":"force","w":2.2,"head":8},{"t":"circle","p":[650,190,6],"c":"force"},{"t":"poly","pts":[[662.0,124.0],[663.2,126.5],[664.3,128.3],[665.5,129.0],[666.7,128.3],[667.8,126.5],[669.0,124.0],[670.2,121.5],[671.3,119.7],[672.5,119.0],[673.7,119.7],[674.8,121.5],[676.0,124.0],[677.2,126.5],[678.3,128.3],[679.5,129.0],[680.7,128.3],[681.8,126.5],[683.0,124.0],[684.2,121.5],[685.3,119.7],[686.5,119.0],[687.7,119.7],[688.8,121.5],[690.0,124.0],[691.2,126.5],[692.3,128.3],[693.5,129.0],[694.7,128.3],[695.8,126.5],[697.0,124.0],[698.2,121.5],[699.3,119.7],[700.5,119.0],[701.7,119.7],[702.8,121.5],[704.0,124.0],[705.2,126.5],[706.3,128.3],[707.5,129.0],[708.7,128.3],[709.8,126.5],[711.0,124.0],[712.2,121.5],[713.3,119.7],[714.5,119.0],[715.7,119.7],[716.8,121.5],[718.0,124.0],[719.2,126.5],[720.3,128.3],[721.5,129.0],[722.7,128.3],[723.8,126.5],[725.0,124.0],[726.2,121.5],[727.3,119.7],[728.5,119.0],[729.7,119.7],[730.8,121.5],[732.0,124.0]],"c":"accent","w":1.8},{"t":"arrow","p":[730.0,124.0,742,124],"c":"accent","w":1.8,"head":7},{"t":"poly","pts":[[662.0,146.0],[663.2,148.5],[664.3,150.3],[665.5,151.0],[666.7,150.3],[667.8,148.5],[669.0,146.0],[670.2,143.5],[671.3,141.7],[672.5,141.0],[673.7,141.7],[674.8,143.5],[676.0,146.0],[677.2,148.5],[678.3,150.3],[679.5,151.0],[680.7,150.3],[681.8,148.5],[683.0,146.0],[684.2,143.5],[685.3,141.7],[686.5,141.0],[687.7,141.7],[688.8,143.5],[690.0,146.0],[691.2,148.5],[692.3,150.3],[693.5,151.0],[694.7,150.3],[695.8,148.5],[697.0,146.0],[698.2,143.5],[699.3,141.7],[700.5,141.0],[701.7,141.7],[702.8,143.5],[704.0,146.0],[705.2,148.5],[706.3,150.3],[707.5,151.0],[708.7,150.3],[709.8,148.5],[711.0,146.0],[712.2,143.5],[713.3,141.7],[714.5,141.0],[715.7,141.7],[716.8,143.5],[718.0,146.0],[719.2,148.5],[720.3,150.3],[721.5,151.0],[722.7,150.3],[723.8,148.5],[725.0,146.0],[726.2,143.5],[727.3,141.7],[728.5,141.0],[729.7,141.7],[730.8,143.5],[732.0,146.0]],"c":"accent","w":1.8},{"t":"arrow","p":[730.0,146.0,742,146],"c":"accent","w":1.8,"head":7},{"t":"text","p":[640,236],"s":"emissione stimolata","c":"ax","size":11},{"t":"text","p":[380,264],"s":"fotoni disegnati come onde; il punto indica il livello occupato dopo il processo","c":"muted","size":10}]}
---
I tre processi di Einstein per un atomo a due livelli. Nell'assorbimento un fotone scompare e l'atomo sale; nell'emissione spontanea l'atomo scende ed emette un fotone in una direzione qualunque; nell'emissione stimolata un fotone in arrivo provoca la discesa, ed escono due fotoni identici.
:::

L'emissione stimolata, illustrata nella figura 5, è un'amplificazione: un fotone ne diventa due, due diventano quattro. Perché l'amplificazione prevalga sull'assorbimento servono però più atomi nel livello superiore che in quello inferiore, una **inversione di popolazione**. All'equilibrio termico accade il contrario: il rapporto fra le popolazioni di due livelli con lo stesso numero di stati vale $N_2/N_1=e^{-(E_2-E_1)/kT}$, e per una separazione di $2$ eV a temperatura ambiente è circa $10^{-34}$. Anche a temperatura infinita le due popolazioni diventerebbero al massimo uguali. L'inversione si ottiene soltanto fuori dall'equilibrio, «pompando» energia nel sistema con lampi di luce, scariche elettriche o reazioni chimiche, e sfruttando un livello superiore **metastabile**, che vive abbastanza a lungo da accumulare atomi.

Il primo dispositivo a funzionare lavorava con le microonde. Nel 1954 James Gordon, Herbert Zeiger e Charles Townes, alla Columbia University, separarono le molecole di ammoniaca nello stato superiore di una transizione a $23{,}87$ GHz e le inviarono in una cavità risonante: era il **maser**, acronimo inglese di amplificazione di microonde per emissione stimolata di radiazione. Il 16 maggio 1960, ai laboratori Hughes, Theodore Maiman fece funzionare il primo **laser**, con un cristallo di rubino pompato da una lampada flash, che emetteva luce rossa a $694{,}3$ nm. Gli specchi alle estremità del cristallo, uno dei quali parzialmente trasparente, rimandavano i fotoni avanti e indietro, e soltanto quelli diretti lungo l'asse venivano amplificati a lungo: per questo un fascio laser è così stretto, monocromatico e coerente.

L'astronomia usa i laser in molti modi. I grandi telescopi proiettano nel cielo un fascio a $589$ nm, accordato sulla riga gialla del sodio, che eccita uno strato di atomi di sodio a circa $90$ km di quota, residuo delle meteore che bruciano nell'alta atmosfera. Il punto luminoso che si forma, una **stella guida laser**, permette all'ottica adattiva di misurare in ogni istante la deformazione prodotta dalla turbolenza e di correggerla con uno specchio deformabile, in qualunque direzione del cielo. Sulla Luna, poi, gli astronauti dell'Apollo 11 lasciarono nel 1969 un pannello di cento riflettori a spigolo di cubo, che rimandano la luce esattamente nella direzione da cui arriva. Gli impulsi laser inviati dalla Terra impiegano circa $2{,}56$ s per il viaggio di andata e ritorno, e misurandone il tempo si conosce la distanza della Luna con una precisione di pochi millimetri: la Luna si allontana dalla Terra di $3{,}8$ cm all'anno, per effetto delle maree.

## Maser e laser naturali {#maser}

Nello spazio le condizioni per un'inversione di popolazione si realizzano spontaneamente. Nelle nubi molecolari le densità sono così basse che le collisioni, che tenderebbero a ristabilire l'equilibrio termico, sono rare; la radiazione infrarossa di una stella che si sta formando, o gli urti in un'onda d'urto, possono allora popolare un livello superiore più di quello inferiore. Lungo cammini che possono superare la distanza fra la Terra e il Sole, il gas amplifica la radiazione di quella frequenza come un maser di laboratorio.

Nel 1965 il gruppo di Harold Weaver, a Berkeley, osservò verso la nebulosa di Orione e verso altre nubi una riga a $1665$ MHz troppo intensa, troppo stretta e troppo polarizzata per essere emissione termica; la chiamarono per scherzo «mysterium», finché si capì che proveniva dal radicale ossidrile, OH, in condizioni di maser. Nel 1969 il gruppo di Townes scoprì l'emissione dell'acqua a $22{,}235$ GHz, una lunghezza d'onda di $1{,}35$ cm, in Orione e in altre regioni di formazione stellare; alcune sorgenti mostravano temperature di brillanza di almeno un miliardo di kelvin, impossibili per un gas in equilibrio. I maser astrofisici sono così compatti e brillanti che le reti di radiotelescopi distribuite su continenti diversi ne misurano le posizioni con precisioni di milionesimi di secondo d'arco.

Il caso più celebre è la galassia NGC 4258. Attorno al suo nucleo un disco di gas visto quasi di taglio contiene nubi di vapore acqueo che emettono come maser, e le loro velocità, di centinaia di chilometri al secondo, diminuiscono con la distanza dal centro come prevede la terza legge di Keplero. La rotazione richiede al centro un buco nero di circa $4\cdot10^7$ masse solari. Seguendo per anni le posizioni, le velocità e le accelerazioni delle singole nubi, si confronta il moto in chilometri al secondo con il moto angolare in microsecondi d'arco all'anno, e si ricava la distanza della galassia in modo puramente geometrico. Nel 2019 Mark Reid, Dominic Pesce e Adam Riess ottennero $7{,}576$ milioni di parsec, con un'incertezza complessiva di circa l'$1{,}5$ per cento. Questa distanza è uno dei gradini su cui si regge la scala delle distanze cosmiche e la misura della costante di Hubble.

Anche i pianeti hanno laser naturali. Nel 1981 Michael Mumma e collaboratori, misurando con uno spettrometro infrarosso ad altissima risoluzione le righe dell'anidride carbonica dell'atmosfera di Marte a $10{,}4$ μm, trovarono che il gas amplificava la radiazione invece di assorbirla. Nell'alta atmosfera di Marte, a una settantina di chilometri di quota, la luce solare pompa le molecole di $\mathrm{CO_2}$ e la bassa densità impedisce alle collisioni di riportarle all'equilibrio. Poco dopo lo stesso fenomeno fu osservato su Venere. È lo stesso meccanismo dei laser industriali ad anidride carbonica, che tagliano lamiere d'acciaio con le stesse bande infrarosse attorno a $10$ μm.

## Le righe delle stelle {#stelle}

Nel 1814 Joseph von Fraunhofer, scomponendo la luce del Sole con un prisma di grande qualità, contò oltre $570$ righe scure e indicò le principali con le lettere da A a K: la riga C è Hα, la riga D la coppia del sodio, la riga F è Hβ, le righe H e K quelle del calcio ionizzato. Nel 1859 Gustav Kirchhoff e Robert Bunsen mostrarono che ogni elemento, scaldato in una fiamma, emette righe chiare nelle stesse posizioni in cui assorbe: le righe scure del Sole nascono nei gas più freddi dell'atmosfera solare, che assorbono la luce continua proveniente dagli strati sottostanti più caldi.

Le stelle si classificano secondo le righe che mostrano nelle classi O, B, A, F, G, K, M, introdotte a Harvard e descritte nel capitolo [Radiazione termica e luce delle stelle](unit:physics-30). Le righe di Balmer, debolissime nel Sole, raggiungono la massima intensità nelle stelle di tipo A, come Vega e Sirio A, a circa $10\,000$ K, e si indeboliscono di nuovo nelle stelle più calde. La spiegazione richiede due leggi della fisica statistica. Una riga di Balmer in assorbimento parte dal livello $n=2$, e la frazione di atomi di idrogeno in quel livello è data dalla legge di Boltzmann:
$$\frac{N_2}{N_1}=\frac{g_2}{g_1}\,e^{-(E_2-E_1)/kT}=4\,e^{-10{,}2\ \mathrm{eV}/kT}.$$
Il fattore $4$ è il rapporto fra il numero di stati, $2n^2$, dei due livelli. Nella fotosfera del Sole, a $5772$ K, $N_2/N_1$ vale circa $5\cdot10^{-9}$; a $10\,000$ K sale a circa $3\cdot10^{-5}$, seimila volte di più. Salendo ancora di temperatura, però, gli atomi perdono l'elettrone: la frazione di idrogeno ionizzato è data dall'equazione che Meghnad Saha pubblicò nel 1920, e cresce rapidamente oltre i $9000$ K.

::: figura saha
{"w":760,"h":285,"items":[{"t":"axes","o":[90,250],"x":[650,"temperatura, K"],"y":[225,"frazione in n = 2, milionesimi"],"sx":28,"sy":20,"xt":[[0,"5000"],[5,"10 000"],[10,"15 000"],[15,"20 000"]],"yt":[[0,"0"],[2,"2"],[4,"4"],[6,"6"],[8,"8"],[10,"10"]]},{"t":"plot","o":[90,250],"sx":28,"sy":20,"pts":[[0.0,0.0002094],[0.05,0.0002647],[0.1,0.000333],[0.15,0.0004172],[0.2,0.0005204],[0.25,0.0006464],[0.3,0.0007996],[0.35,0.0009852],[0.4,0.0012091],[0.45,0.0014785],[0.5,0.0018012],[0.55,0.0021866],[0.6,0.0026452],[0.65,0.0031893],[0.7,0.0038327],[0.75,0.0045912],[0.8,0.0054828],[0.85,0.0065276],[0.9,0.0077485],[0.95,0.0091714],[1.0,0.010825],[1.05,0.0127419],[1.1,0.0149581],[1.15,0.0175141],[1.2,0.0204547],[1.25,0.0238297],[1.3,0.0276942],[1.35,0.0321093],[1.4,0.0371421],[1.45,0.0428668],[1.5,0.0493645],[1.55,0.0567243],[1.6,0.0650438],[1.65,0.0744294],[1.7,0.0849972],[1.75,0.0968734],[1.8,0.1101951],[1.85,0.1251107],[1.9,0.1417811],[1.95,0.1603796],[2.0,0.1810932],[2.05,0.2041228],[2.1,0.2296841],[2.15,0.2580078],[2.2,0.2893407],[2.25,0.3239455],[2.3,0.3621016],[2.35,0.4041053],[2.4,0.4502695],[2.45,0.5009241],[2.5,0.5564155],[2.55,0.6171058],[2.6,0.6833723],[2.65,0.7556059],[2.7,0.8342096],[2.75,0.919596],[2.8,1.0121848],[2.85,1.1123989],[2.9,1.2206604],[2.95,1.3373854],[3.0,1.4629778],[3.05,1.5978224],[3.1,1.7422763],[3.15,1.8966602],[3.2,2.0612471],[3.25,2.2362516],[3.3,2.4218166],[3.35,2.618],[3.4,2.8247605],[3.45,3.041943],[3.5,3.2692644],[3.55,3.5062992],[3.6,3.7524673],[3.65,4.0070228],[3.7,4.2690465],[3.75,4.5374409],[3.8,4.8109305],[3.85,5.0880665],[3.9,5.3672378],[3.95,5.6466877],[4.0,5.9245373],[4.05,6.1988146],[4.1,6.4674896],[4.15,6.728513],[4.2,6.9798592],[4.25,7.2195702],[4.3,7.4457992],[4.35,7.6568518],[4.4,7.8512239],[4.45,8.0276324],[4.5,8.1850402],[4.55,8.3226716],[4.6,8.4400207],[4.65,8.5368501],[4.7,8.6131819],[4.75,8.6692826],[4.8,8.7056406],[4.85,8.7229407],[4.9,8.7220349],[4.95,8.7039119],[5.0,8.6696662],[5.05,8.6204687],[5.1,8.5575386],[5.15,8.4821177],[5.2,8.3954487],[5.25,8.2987553],[5.3,8.1932265],[5.35,8.0800039],[5.4,7.9601721],[5.45,7.8347514],[5.5,7.7046933],[5.55,7.570878],[5.6,7.4341137],[5.65,7.2951371],[5.7,7.1546154],[5.75,7.0131486],[5.8,6.8712732],[5.85,6.7294655],[5.9,6.5881459],[5.95,6.447683],[6.0,6.3083973],[6.05,6.170566],[6.1,6.0344262],[6.15,5.9001791],[6.2,5.7679936],[6.25,5.6380093],[6.3,5.5103399],[6.35,5.3850761],[6.4,5.2622878],[6.45,5.1420271],[6.5,5.0243301],[6.55,4.9092189],[6.6,4.7967036],[6.65,4.6867837],[6.7,4.5794494],[6.75,4.4746835],[6.8,4.3724618],[6.85,4.2727544],[6.9,4.175527],[6.95,4.080741],[7.0,3.9883546],[7.05,3.8983235],[7.1,3.8106011],[7.15,3.7251394],[7.2,3.641889],[7.25,3.5607997],[7.3,3.4818209],[7.35,3.4049015],[7.4,3.3299906],[7.45,3.2570373],[7.5,3.185991],[7.55,3.1168019],[7.6,3.0494204],[7.65,2.9837978],[7.7,2.9198863],[7.75,2.8576387],[7.8,2.797009],[7.85,2.737952],[7.9,2.6804234],[7.95,2.6243801],[8.0,2.56978],[8.05,2.5165821],[8.1,2.4647462],[8.15,2.4142334],[8.2,2.3650058],[8.25,2.3170265],[8.3,2.2702597],[8.35,2.2246704],[8.4,2.1802248],[8.45,2.1368902],[8.5,2.0946344],[8.55,2.0534268],[8.6,2.0132371],[8.65,1.9740362],[8.7,1.9357959],[8.75,1.8984889],[8.8,1.8620884],[8.85,1.8265688],[8.9,1.7919052],[8.95,1.7580732],[9.0,1.7250495],[9.05,1.6928114],[9.1,1.6613367],[9.15,1.6306043],[9.2,1.6005933],[9.25,1.5712837],[9.3,1.5426561],[9.35,1.5146917],[9.4,1.4873723],[9.45,1.4606801],[9.5,1.4345979],[9.55,1.4091093],[9.6,1.3841981],[9.65,1.3598486],[9.7,1.3360458],[9.75,1.312775],[9.8,1.2900219],[9.85,1.2677728],[9.9,1.2460143],[9.95,1.2247334],[10.0,1.2039175],[10.05,1.1835545],[10.1,1.1636325],[10.15,1.1441401],[10.2,1.1250661],[10.25,1.1063996],[10.3,1.0881303],[10.35,1.0702479],[10.4,1.0527426],[10.45,1.0356047],[10.5,1.0188251],[10.55,1.0023945],[10.6,0.9863044],[10.65,0.9705461],[10.7,0.9551115],[10.75,0.9399924],[10.8,0.925181],[10.85,0.9106699],[10.9,0.8964515],[10.95,0.8825189],[11.0,0.868865],[11.05,0.855483],[11.1,0.8423665],[11.15,0.829509],[11.2,0.8169044],[11.25,0.8045465],[11.3,0.7924296],[11.35,0.780548],[11.4,0.768896],[11.45,0.7574684],[11.5,0.7462598],[11.55,0.7352652],[11.6,0.7244796],[11.65,0.7138982],[11.7,0.7035163],[11.75,0.6933292],[11.8,0.6833327],[11.85,0.6735222],[11.9,0.6638937],[11.95,0.654443],[12.0,0.6451661],[12.05,0.6360591],[12.1,0.6271182],[12.15,0.6183398],[12.2,0.6097202],[12.25,0.601256],[12.3,0.5929437],[12.35,0.58478],[12.4,0.5767616],[12.45,0.5688855],[12.5,0.5611485],[12.55,0.5535476],[12.6,0.54608],[12.65,0.5387427],[12.7,0.531533],[12.75,0.5244482],[12.8,0.5174856],[12.85,0.5106427],[12.9,0.5039169],[12.95,0.4973059],[13.0,0.4908071],[13.05,0.4844183],[13.1,0.4781373],[13.15,0.4719617],[13.2,0.4658894],[13.25,0.4599183],[13.3,0.4540464],[13.35,0.4482716],[13.4,0.442592],[13.45,0.4370056],[13.5,0.4315106],[13.55,0.4261051],[13.6,0.4207874],[13.65,0.4155557],[13.7,0.4104083],[13.75,0.4053436],[13.8,0.4003598],[13.85,0.3954555],[13.9,0.3906291],[13.95,0.3858791],[14.0,0.3812039],[14.05,0.3766022],[14.1,0.3720725],[14.15,0.3676134],[14.2,0.3632237],[14.25,0.3589019],[14.3,0.3546468],[14.35,0.3504571],[14.4,0.3463316],[14.45,0.3422691],[14.5,0.3382684],[14.55,0.3343283],[14.6,0.3304478],[14.65,0.3266256],[14.7,0.3228608],[14.75,0.3191523],[14.8,0.315499],[14.85,0.3119],[14.9,0.3083542],[14.95,0.3048607],[15.0,0.3014185],[15.05,0.2980268],[15.1,0.2946845],[15.15,0.2913909],[15.2,0.288145],[15.25,0.284946],[15.3,0.281793],[15.35,0.2786853],[15.4,0.2756221],[15.45,0.2726025],[15.5,0.2696258],[15.55,0.2666913],[15.6,0.2637982],[15.65,0.2609457],[15.7,0.2581333],[15.75,0.2553602],[15.8,0.2526257],[15.85,0.2499292],[15.9,0.24727],[15.95,0.2446475],[16.0,0.2420611],[16.05,0.2395101],[16.1,0.236994],[16.15,0.2345121],[16.2,0.2320639],[16.25,0.2296489],[16.3,0.2272664],[16.35,0.224916],[16.4,0.2225971],[16.45,0.2203091],[16.5,0.2180517],[16.55,0.2158242],[16.6,0.2136262],[16.65,0.2114572],[16.7,0.2093168],[16.75,0.2072044],[16.8,0.2051197],[16.85,0.2030621],[16.9,0.2010313],[16.95,0.1990267],[17.0,0.1970481],[17.05,0.1950949],[17.1,0.1931669],[17.15,0.1912635],[17.2,0.1893843],[17.25,0.1875291],[17.3,0.1856975],[17.35,0.1838889],[17.4,0.1821032],[17.45,0.18034],[17.5,0.1785988],[17.55,0.1768794],[17.6,0.1751815],[17.65,0.1735046],[17.7,0.1718485],[17.75,0.1702129],[17.8,0.1685974],[17.85,0.1670017],[17.9,0.1654256],[17.95,0.1638687],[18.0,0.1623308],[18.05,0.1608115],[18.1,0.1593106],[18.15,0.1578279],[18.2,0.156363],[18.25,0.1549157],[18.3,0.1534857],[18.35,0.1520727],[18.4,0.1506766],[18.45,0.149297],[18.5,0.1479338],[18.55,0.1465867],[18.6,0.1452554],[18.65,0.1439397],[18.7,0.1426394],[18.75,0.1413543],[18.8,0.1400842],[18.85,0.1388288],[18.9,0.1375879],[18.95,0.1363614],[19.0,0.1351489],[19.05,0.1339504],[19.1,0.1327657],[19.15,0.1315944],[19.2,0.1304365],[19.25,0.1292917],[19.3,0.1281599],[19.35,0.1270409],[19.4,0.1259345],[19.45,0.1248405],[19.5,0.1237588],[19.55,0.1226892],[19.6,0.1216315],[19.65,0.1205855],[19.7,0.1195512],[19.75,0.1185283],[19.8,0.1175166],[19.85,0.1165161],[19.9,0.1155266],[19.95,0.1145479],[20.0,0.11358]],"c":"force2","w":2.4},{"t":"plot","o":[90,250],"sx":28,"sy":20,"pts":[[4.87,0],[4.87,8.7247105]],"c":"muted","w":1.2,"dash":true},{"t":"text","p":[236.4,69.5],"s":"massimo vicino a 9900 K, stelle A","c":"ax","size":10,"a":"start"},{"t":"circle","p":[111.6,249.9,4],"c":"force"},{"t":"text","p":[117.6,239.9],"s":"Sole","c":"force","size":10,"a":"start"},{"t":"circle","p":[218.8,81.2,4],"c":"force"},{"t":"text","p":[210.8,85.2],"s":"Vega","c":"force","size":10,"a":"end"},{"t":"circle","p":[510.0,244.0,4],"c":"force"},{"t":"text","p":[510.0,232.0],"s":"stella B","c":"force","size":10},{"t":"text","p":[622,150],"s":"pressione elettronica 20 Pa","c":"muted","size":10,"a":"end"}]}
---
La frazione degli atomi di idrogeno che si trovano nel livello $n=2$, da cui partono le righe di Balmer in assorbimento, in funzione della temperatura dell'atmosfera stellare, calcolata con le equazioni di Boltzmann e di Saha per una pressione elettronica di $20$ Pa. La curva ha un massimo vicino a $9900$ K, la temperatura delle stelle di tipo A.
:::

Combinando le due leggi si ottiene la curva della figura 6: la frazione di idrogeno pronta ad assorbire nella serie di Balmer cresce, raggiunge un massimo vicino a $9900$ K e poi crolla. Anche nel punto più favorevole meno di un atomo su centomila si trova nel livello giusto. L'intensità di una riga dipende quindi soprattutto dalla temperatura, e soltanto in secondo luogo dall'abbondanza dell'elemento.

Nel 1925 Cecilia Payne, a Harvard, applicò per prima in modo sistematico la teoria di Saha agli spettri stellari. Nella sua tesi di dottorato ricavò la scala delle temperature delle classi spettrali e le abbondanze degli elementi, e trovò che gli elementi più pesanti avevano abbondanze simili a quelle terrestri, mentre l'idrogeno risultava circa un milione di volte più abbondante degli elementi pesanti. Henry Norris Russell, l'astronomo più autorevole del tempo, giudicò il risultato impossibile, e Payne scrisse nella tesi che l'abbondanza dell'idrogeno era quasi certamente irreale. Pochi anni dopo lo stesso Russell, con un metodo diverso, arrivò alla stessa conclusione. Oggi sappiamo che il Sole è formato in massa per circa tre quarti da idrogeno e per un quarto da elio, con meno del due per cento di tutti gli altri elementi.

Le righe dicono molto altro. Il loro spostamento Doppler misura la velocità radiale della stella, fino a meno di un metro al secondo negli spettrografi più stabili che cercano i pianeti extrasolari. La loro larghezza rivela la rotazione della stella e la pressione dell'atmosfera, che distingue le giganti rarefatte dalle nane dense con la stessa temperatura. La separazione Zeeman misura il campo magnetico, e le intensità relative di righe dello stesso elemento in diversi stati di ionizzazione danno la temperatura con grande precisione.

## Nebulose e righe proibite {#nebulose}

Una stella calda di tipo O o B emette in abbondanza fotoni ultravioletti con $\lambda<91{,}2$ nm, capaci di ionizzare l'idrogeno. Attorno a essa il gas interstellare diventa una **regione H II**, una nube di protoni ed elettroni liberi. Quando un elettrone viene catturato da un protone, l'atomo nasce di solito in un livello eccitato e scende verso lo stato fondamentale emettendo una cascata di fotoni: le righe di Lyman, di Balmer, di Paschen e, per i livelli più alti, le righe di ricombinazione radio. Fra le righe visibili domina Hα, ed è per questo che nelle fotografie la nebulosa di Orione, la Laguna e le altre nubi di formazione stellare appaiono rosse o rosate.

Nel 1864 William Huggins osservò con lo spettroscopio la nebulosa planetaria dell'Occhio di Gatto e vide, invece dello spettro continuo di un ammasso di stelle, poche righe brillanti, la più intensa delle quali verde, a $500{,}7$ nm, insieme a una compagna a $495{,}9$ nm. Nessun elemento noto le produceva, e sull'esempio dell'elio si pensò a un nuovo elemento, il «nebulio». Quando la legge di Moseley riempì le caselle della tavola periodica, per il nebulio non restò posto. Nel 1927 Ira Bowen mostrò che le righe sono emesse dall'ossigeno due volte ionizzato, $\mathrm{O^{2+}}$, in transizioni **proibite**, che le regole di selezione della meccanica quantistica rendono estremamente improbabili. Le righe proibite si indicano tra parentesi quadre: $[\mathrm{O\,III}]$.

Il livello da cui partono le righe del nebulio vive in media decine di secondi, miliardi di volte più a lungo dei livelli che emettono le righe permesse. In laboratorio, o in qualunque gas denso, un atomo in quel livello subisce un urto molto prima di avere il tempo di emettere, e l'energia si disperde in moto termico. Nelle nebulose le densità sono di qualche migliaio di particelle per centimetro cubo, contro i $2{,}5\cdot10^{19}$ dell'aria: un atomo può attendere indisturbato per minuti, e alla fine emette il suo fotone. Le righe proibite sono quindi un indicatore di densità, e il rapporto fra righe proibite dello stesso ione, sensibili in modo diverso agli urti, dà la densità e la temperatura degli elettroni della nebulosa. Una storia simile riguarda il «coronio», l'elemento ipotetico della riga verde della corona solare a $530{,}3$ nm: fra il 1939 e il 1942 Walter Grotrian e Bengt Edlén mostrarono che le righe della corona sono emesse da ferro ionizzato tredici volte, che può esistere soltanto in un gas a più di un milione di kelvin.

## Un'esperienza: uno spettroscopio da tavolo {#esperienza}

Le righe spettrali si possono vedere e misurare con un reticolo di diffrazione in foglio, quello descritto nel capitolo [Diffrazione e potere risolutivo](unit:physics-29), oppure con il riflesso iridescente di un vecchio CD.

::: metodo Misurare le righe di una lampada fluorescente
1. Procurarsi un reticolo in foglio da $500$ linee per millimetro, cioè con passo $d=2$ μm, un metro a nastro e una lampada fluorescente compatta o un tubo fluorescente, che contengono vapori di mercurio.
2. In una stanza buia, coprire la lampada con un cartoncino in cui è ritagliata una fessura verticale larga un paio di millimetri. Mettersi a un metro dalla fessura e guardarla attraverso il reticolo tenuto davanti a un occhio.
3. Ai lati della fessura compaiono righe colorate nette: violetta a $404{,}7$ nm, blu a $435{,}8$ nm, verde a $546{,}1$ nm e una coppia gialla a $577{,}0$ e $579{,}1$ nm, tutte del mercurio. Fra di esse si vedono bande più larghe, rosse, arancioni e verdi, emesse dalle polveri fluorescenti che rivestono il tubo.
4. Un compagno sposta una matita lungo un righello fissato accanto alla fessura finché l'osservatore la vede sovrapposta alla riga verde. Dalla distanza $x$ fra matita e fessura e dalla distanza $D$ fra fessura e reticolo si ricava $\tan\theta=x/D$ e poi $\lambda=d\sin\theta$. Con questo reticolo la riga verde cade a circa $15{,}8°$, cioè a circa $28$ cm dalla fessura per $D=1$ m.
5. Ripetere con un lampione al sodio, con le righe gialle a $589{,}0$ e $589{,}6$ nm, quasi impossibili da separare con questo reticolo, e con un LED bianco, che mostra invece uno spettro continuo con un picco nel blu.
:::

Lo stesso reticolo, puntato su un foglio bianco illuminato dal Sole o su una nuvola luminosa, mostra con un po' di attenzione alcune righe scure di Fraunhofer, in particolare le righe del sodio e Hα. Non si deve mai guardare il Sole direttamente, né a occhio nudo né attraverso il reticolo. Il confronto fra le righe chiare della lampada e quelle scure del Sole ripete in piccolo la scoperta di Kirchhoff e Bunsen: gli stessi atomi emettono e assorbono alle stesse lunghezze d'onda.

## Errori frequenti {#errori}

::: errore Pensare che l'elettrone percorra un'orbita come un pianeta
Il modello di Bohr dà le energie giuste dell'idrogeno, ma lo stato di un elettrone è un'onda stazionaria tridimensionale. Si può parlare della probabilità di trovarlo a una certa distanza dal nucleo, mentre una traiettoria definita è priva di significato.
:::

::: errore Credere che righe di emissione e righe di assorbimento appartengano a livelli diversi
Le due righe corrispondono allo stesso salto fra due livelli, percorso nei due versi. Righe chiare compaiono in un gas caldo osservato contro uno sfondo scuro, righe scure in un gas più freddo davanti a una sorgente più calda.
:::

::: errore Dedurre l'abbondanza di un elemento dalla sola intensità delle sue righe
Le righe di Balmer sono più intense nelle stelle di tipo A che nel Sole, eppure la proporzione di idrogeno è quasi la stessa. L'intensità dipende soprattutto dalla temperatura, che decide quanti atomi si trovano nel livello di partenza e quanti sono ionizzati; per ricavare le abbondanze servono le equazioni di Boltzmann e di Saha.
:::

::: errore Confrontare lunghezze d'onda nell'aria e nel vuoto
Nell'aria le lunghezze d'onda visibili sono più corte di circa tre parti su diecimila. Mescolare i due sistemi produce spostamenti apparenti di decine di chilometri al secondo, che possono essere scambiati per moti reali.
:::

::: errore Credere che basti scaldare un gas per ottenere un laser
All'equilibrio termico il livello superiore è sempre meno popolato di quello inferiore, a qualunque temperatura. Un laser richiede un'inversione di popolazione, che si mantiene soltanto pompando energia nel sistema fuori dall'equilibrio.
:::

::: errore Pensare che le righe proibite violino le leggi della fisica
Le transizioni proibite avvengono, con una probabilità molto bassa: il livello di partenza vive secondi o minuti invece di miliardesimi di secondo. Diventano visibili soltanto nei gas così rarefatti che gli urti non interrompono l'attesa.
:::

## Sintesi {#sintesi}

::: sintesi In breve
- A ogni particella è associata un'onda di lunghezza $\lambda=h/p$: elettroni, neutroni e perfino grandi molecole producono figure di diffrazione e di interferenza.
- Il principio di indeterminazione, $\Delta x\,\Delta p\ge\hbar/2$, fissa le dimensioni degli atomi e dà a ogni riga una larghezza naturale.
- Una particella confinata ha energie discrete; in una buca infinita $E_n=n^2h^2/(8mL^2)$, e i punti quantici cambiano colore con la dimensione.
- I livelli dell'idrogeno valgono $-13{,}6\ \mathrm{eV}/n^2$; ogni livello ha $2n^2$ stati, descritti dai numeri quantici $n$, $\ell$, $m_\ell$, $m_s$.
- Le righe dell'idrogeno seguono la formula di Rydberg e formano le serie di Lyman, Balmer e Paschen; lo spostamento isotopico ha rivelato il deuterio.
- Il principio di esclusione di Pauli organizza gli elettroni in gusci e spiega la tavola periodica e la pressione delle nane bianche.
- L'effetto Zeeman separa le righe in un campo magnetico e misura i campi delle macchie solari e delle stelle.
- Le righe X caratteristiche seguono la legge di Moseley e ordinano gli elementi per numero atomico; la riga del ferro a $6{,}4$ keV sonda i dischi attorno ai buchi neri.
- L'emissione stimolata con inversione di popolazione produce laser e maser; in natura ne esistono nelle nubi molecolari, attorno al buco nero di NGC 4258 e nelle atmosfere di Marte e di Venere.
- Le righe stellari dipendono dalla temperatura attraverso le equazioni di Boltzmann e di Saha; le righe di Balmer sono massime vicino a $10\,000$ K.
- Le righe proibite, come quelle di $[\mathrm{O\,III}]$, misurano densità e temperatura delle nebulose.
:::

## Glossario {#glossario}

- **Lunghezza d'onda di de Broglie**: lunghezza d'onda $h/p$ associata a una particella di quantità di moto $p$.
- **Funzione d'onda**: funzione $\psi$ il cui modulo quadrato dà la densità di probabilità di trovare la particella.
- **Principio di indeterminazione**: limite $\Delta x\,\Delta p_x\ge\hbar/2$ alla precisione con cui posizione e quantità di moto possono essere definite insieme.
- **Larghezza naturale**: larghezza minima di una riga spettrale, dovuta alla vita media finita del livello eccitato.
- **Energia di punto zero**: energia minima, diversa da zero, di una particella confinata.
- **Numeri quantici**: interi o semi-interi $n$, $\ell$, $m_\ell$, $m_s$ che identificano lo stato di un elettrone in un atomo.
- **Serie spettrale**: insieme delle righe dovute ai salti verso uno stesso livello inferiore.
- **Costante di Rydberg**: costante $R_H\approx1{,}0968\cdot10^7$ m⁻¹ della formula delle righe dell'idrogeno.
- **Spin**: momento angolare intrinseco dell'elettrone, con componenti $\pm\hbar/2$.
- **Principio di esclusione**: due elettroni dello stesso sistema non possono occupare lo stesso stato quantico.
- **Effetto Zeeman**: separazione delle righe spettrali in un campo magnetico.
- **Legge di Moseley**: proporzionalità fra la radice quadrata della frequenza delle righe X caratteristiche e il numero atomico diminuito di uno.
- **Emissione stimolata**: emissione di un fotone identico a quello che la provoca.
- **Inversione di popolazione**: condizione in cui un livello superiore è più popolato di uno inferiore, necessaria per un laser o un maser.
- **Equazione di Saha**: relazione che dà la frazione di atomi ionizzati in un gas in funzione della temperatura e della densità degli elettroni.
- **Riga proibita**: riga dovuta a una transizione molto improbabile, osservabile soltanto in gas molto rarefatti.

## Esercizi {#esercizi}

::: esercizio Elettroni come onde [base]
Calcolare la lunghezza d'onda di de Broglie di un elettrone di $54$ eV e di uno di $150$ eV, usando $\lambda\approx1{,}226\ \mathrm{nm}/\sqrt{K/\mathrm{eV}}$.
>>> soluzione
Per $54$ eV si ha $1{,}226/\sqrt{54}$ nm, circa $0{,}167$ nm; per $150$ eV si ha $1{,}226/12{,}25$ nm, circa $0{,}100$ nm. Entrambe le lunghezze d'onda sono paragonabili alle distanze fra gli atomi di un cristallo.
:::

::: esercizio Il fotone della riga rossa [base]
Usando $E_n=-13{,}6\ \mathrm{eV}/n^2$, calcolare l'energia del fotone emesso nel salto da $n=3$ a $n=2$ e la sua lunghezza d'onda, con $hc=1239{,}8$ eV·nm.
>>> soluzione
Si ha $E=13{,}6\,(1/4-1/9)$ eV, cioè $13{,}6\cdot5/36$ eV, circa $1{,}89$ eV. La lunghezza d'onda vale $1239{,}8/1{,}889$ nm, circa $656$ nm: è la riga Hα.
:::

::: esercizio Un elettrone in una buca di un nanometro [base]
Un elettrone è confinato in una buca infinita larga $1$ nm, con $h^2/(8m_eL^2)=0{,}376$ eV. Calcolare i primi tre livelli e la lunghezza d'onda del fotone emesso nel salto da $n=2$ a $n=1$.
>>> soluzione
I livelli valgono $0{,}376$, $1{,}50$ e $3{,}38$ eV. Il salto da $2$ a $1$ libera $3\cdot0{,}376$ eV, circa $1{,}13$ eV, e il fotone ha $\lambda=1239{,}8/1{,}128$ nm, circa $1100$ nm, nell'infrarosso vicino.
:::

::: esercizio La riga Lyman α [base]
Calcolare la lunghezza d'onda della riga Lyman α, da $n=2$ a $n=1$, con $R_H=1{,}0968\cdot10^7$ m⁻¹, e spiegare perché si osserva soltanto dallo spazio.
>>> soluzione
Si ha $1/\lambda=R_H(1-1/4)$, cioè $\lambda=4/(3R_H)$, circa $121{,}6$ nm. È luce ultravioletta lontana, assorbita completamente dall'ozono e dall'ossigeno dell'atmosfera terrestre.
:::

::: esercizio La lunghezza d'onda minima dei raggi X [base]
Calcolare la lunghezza d'onda minima dei raggi X prodotti da un tubo a $30$ kV. Che cosa accade raddoppiando la tensione?
>>> soluzione
Si ha $\lambda_{\min}=hc/(eV)=1239{,}8/30\,000$ nm, circa $41{,}3$ pm. Raddoppiando la tensione la lunghezza d'onda minima si dimezza, a circa $20{,}7$ pm.
:::

::: esercizio Gli stati del terzo livello [base]
Elencare i valori di $\ell$ e di $m_\ell$ permessi per $n=3$ e contare gli stati dell'elettrone con questa energia.
>>> soluzione
Si ha $\ell=0,1,2$, con rispettivamente $1$, $3$ e $5$ valori di $m_\ell$, cioè $9$ stati orbitali. Con i due valori dello spin gli stati sono $18$, pari a $2n^2$.
:::

::: esercizio Un elettrone dentro un nucleo? [medio]
Un elettrone confinato in un nucleo avrebbe $\Delta x\approx5$ fm. Calcolare il minimo di $\Delta p\,c$, con $\hbar c=197{,}3$ MeV·fm, e confrontarlo con l'energia di riposo dell'elettrone, $0{,}511$ MeV.
>>> soluzione
Si ha $\Delta p\,c\ge\hbar c/(2\Delta x)=197{,}3/10$ MeV, circa $19{,}7$ MeV, quasi quaranta volte l'energia di riposo. Un elettrone confinato nel nucleo avrebbe energie di decine di MeV, molto più grandi di quelle degli elettroni emessi nei decadimenti beta: gli elettroni dei decadimenti vengono creati nel momento del decadimento.
:::

::: esercizio Il limite della serie di Balmer [medio]
Calcolare il limite della serie di Balmer, per $n_2\to\infty$, e l'energia del fotone corrispondente. Che relazione c'è con il livello $n=2$?
>>> soluzione
Si ha $\lambda_\infty=4/R_H$, circa $364{,}7$ nm, e $E=1239{,}8/364{,}7$ eV, circa $3{,}40$ eV. È proprio l'energia necessaria per ionizzare un atomo dal livello $n=2$, $13{,}6/4$ eV: oltre questo limite l'assorbimento diventa continuo.
:::

::: esercizio La riga del deuterio [medio]
Il rapporto fra le costanti di Rydberg del deuterio e dell'idrogeno vale $1{,}000\,272$. Calcolare lo spostamento della riga Hα, a $656{,}47$ nm, e la velocità Doppler che produrrebbe lo stesso spostamento.
>>> soluzione
Le lunghezze d'onda scalano come $1/R$, e lo spostamento vale $656{,}47\cdot2{,}72\cdot10^{-4}$ nm, circa $0{,}179$ nm verso il blu. La stessa variazione relativa corrisponde a una velocità di $2{,}72\cdot10^{-4}\cdot3\cdot10^5$ km/s, circa $82$ km/s.
:::

::: esercizio Il campo di una macchia solare [medio]
Calcolare la separazione Zeeman $\Delta\lambda=g\,e\lambda^2B/(4\pi m_ec)$ della riga del ferro a $630{,}25$ nm, con $g=2{,}5$, per $B=0{,}3$ T e per $B=0{,}1$ T.
>>> soluzione
Il fattore $e/(4\pi m_ec)$ vale circa $46{,}7$ m⁻¹T⁻¹ e $\lambda^2\approx3{,}97\cdot10^{-13}$ m². Per $0{,}3$ T si ha quindi $\Delta\lambda=2{,}5\cdot46{,}7\cdot\lambda^2\cdot0{,}3$, circa $13{,}9$ pm. Lo spostamento è proporzionale al campo, e per $0{,}1$ T vale circa $4{,}6$ pm.
:::

::: esercizio Le righe X del ferro e del rame [medio]
Con la formula $E_{K\alpha}\approx10{,}2\ \mathrm{eV}\cdot(Z-1)^2$ stimare l'energia e la lunghezza d'onda della riga $K_\alpha$ del ferro, $Z=26$, e del rame, $Z=29$. I valori misurati sono $6{,}40$ e $8{,}05$ keV.
>>> soluzione
Per il ferro si ha $10{,}2\cdot625$ eV, circa $6{,}38$ keV e $0{,}194$ nm; per il rame $10{,}2\cdot784$ eV, circa $8{,}00$ keV e $0{,}155$ nm. La formula sbaglia di meno dell'uno per cento.
:::

::: esercizio Un atomo gigante nella nebulosa di Orione [medio]
Calcolare la frequenza della riga di ricombinazione da $n=110$ a $n=109$, con $R_Hc=3{,}288\cdot10^{15}$ Hz, e il raggio $n^2a_0$ dell'atomo con $n=110$.
>>> soluzione
Si ha $\nu=3{,}288\cdot10^{15}\,(1/109^2-1/110^2)$ Hz, cioè $3{,}288\cdot10^{15}\cdot1{,}523\cdot10^{-6}$ Hz, circa $5009$ MHz. Il raggio vale $12\,100\cdot52{,}9$ pm, circa $0{,}64$ μm.
:::

::: esercizio Idrogeno pronto ad assorbire [avanzato]
Con $N_2/N_1=4\,e^{-10{,}2\ \mathrm{eV}/kT}$ e $k=8{,}617\cdot10^{-5}$ eV/K, calcolare la frazione di atomi neutri nel livello $n=2$ a $5772$ K e a $10\,000$ K. Perché a $20\,000$ K le righe di Balmer sono di nuovo deboli?
>>> soluzione
A $5772$ K si ha $kT\approx0{,}497$ eV e $N_2/N_1=4\,e^{-20{,}5}$, circa $5\cdot10^{-9}$; a $10\,000$ K si ha $kT\approx0{,}862$ eV e $N_2/N_1=4\,e^{-11{,}84}$, circa $2{,}9\cdot10^{-5}$, quasi seimila volte di più. A $20\,000$ K il rapporto cresce ancora, ma quasi tutto l'idrogeno è ionizzato, secondo l'equazione di Saha, e restano pochissimi atomi capaci di assorbire.
:::

::: esercizio Il disco di maser di NGC 4258 [avanzato]
Calcolare la velocità orbitale kepleriana $v=\sqrt{GM/r}$ a $0{,}2$ pc da un buco nero di $4\cdot10^7$ masse solari e il periodo dell'orbita. Che angolo sottende quella distanza a $7{,}58$ Mpc?
>>> soluzione
La massa vale $4\cdot10^7\cdot1{,}989\cdot10^{30}$ kg, circa $7{,}96\cdot10^{37}$ kg, e quindi $GM\approx5{,}31\cdot10^{27}$ m³/s²; la distanza vale $r=6{,}17\cdot10^{15}$ m, e la velocità vale circa $930$ km/s. Il periodo è $2\pi r/v$, circa $4{,}2\cdot10^{10}$ s, cioè circa $1300$ anni. L'angolo vale $0{,}2/7{,}58\cdot10^6$ rad, circa $2{,}6\cdot10^{-8}$ rad, cioè circa $5{,}4$ millesimi di secondo d'arco.
:::

::: esercizio Perché il rubino ha bisogno della lampada [avanzato]
La riga del laser a rubino ha $\lambda=694{,}3$ nm. Calcolare l'energia del fotone, il rapporto $N_2/N_1=e^{-\Delta E/kT}$ a $300$ K e la temperatura alla quale il rapporto varrebbe $1/2$.
>>> soluzione
Si ha $\Delta E=1239{,}8/694{,}3$ eV, circa $1{,}79$ eV. A $300$ K, con $kT\approx0{,}0259$ eV, il rapporto vale $e^{-69}$, circa $10^{-30}$. Per $N_2/N_1=1/2$ serve $T=\Delta E/(k\ln2)$, circa $30\,000$ K, e nemmeno a temperatura infinita si supererebbe il valore $1$: l'inversione richiede il pompaggio ottico della lampada.
:::

::: esercizio Larghezza naturale e larghezza Doppler [avanzato]
Lo stato $2p$ dell'idrogeno vive $1{,}6$ ns. Calcolare la larghezza naturale $\Delta\nu=1/(2\pi\tau)$ della riga Lyman α, la sua larghezza relativa $\Delta\nu/\nu$, con $\nu=2{,}466\cdot10^{15}$ Hz, e confrontarla con la larghezza Doppler relativa $v/c$, dove $v=\sqrt{2kT/m_p}$ a $10\,000$ K.
>>> soluzione
Si ha $\Delta\nu=1/(2\pi\cdot1{,}6\cdot10^{-9})$ Hz, circa $100$ MHz, e $\Delta\nu/\nu\approx4\cdot10^{-8}$. La velocità termica vale $\sqrt{2\cdot1{,}381\cdot10^{-23}\cdot10^4/1{,}673\cdot10^{-27}}$ m/s, circa $12{,}8$ km/s, e $v/c\approx4{,}3\cdot10^{-5}$: la larghezza Doppler è circa mille volte quella naturale.
:::

## Fonti {#fonti}

Il testo, le figure, gli esempi e gli esercizi di questo capitolo sono originali. Per la scelta e l'ordine degli argomenti il riferimento principale è D. Halliday, R. Resnick, J. Walker, *Fundamentals of Physics*, 12ª edizione estesa, Wiley, 2022, moduli 38.5 (elettroni e onde di materia), 38.6 (equazione di Schrödinger), 38.7 (principio di indeterminazione), 39.1 e 39.2 (energie e funzioni d'onda di un elettrone in trappola), 39.3 (buca finita), 39.4 (trappole in due e tre dimensioni), 39.5 (atomo di idrogeno), 40.1 (proprietà degli atomi), 40.2 (esperimento di Stern e Gerlach), 40.3 (risonanza magnetica), 40.4 e 40.5 (principio di esclusione e tavola periodica), 40.6 (raggi X e ordinamento degli elementi) e 40.7 (laser); l'orientamento astrofisico e i dati provengono dalle fonti primarie seguenti.

1. C. Davisson, L. H. Germer, *Nature* 119, 558 (1927): la diffusione di elettroni da un cristallo di nichel; M. Arndt e collaboratori, *Nature* 401, 680 (1999): l'interferenza del fullerene; Y. Y. Fein e collaboratori, *Nature Physics* 15, 1242 (2019): la sovrapposizione quantistica di molecole oltre $25$ kDa.
2. W. Heisenberg, *Zeitschrift für Physik* 43, 172 (1927): il principio di indeterminazione; M. F. Crommie, C. P. Lutz, D. M. Eigler, *Science* 262, 218 (1993): il recinto quantistico di atomi di ferro.
3. N. Bohr, *Philosophical Magazine* 26, 1 (1913): la costituzione degli atomi; W. Pauli, *Zeitschrift für Physik* 31, 765 (1925): il principio di esclusione; H. C. Urey, F. G. Brickwedde, G. M. Murphy, *Physical Review* 39, 164 (1932): l'isotopo dell'idrogeno di massa $2$.
4. NIST Atomic Spectra Database e CODATA 2018: livelli e lunghezze d'onda dell'idrogeno, costante di Rydberg, probabilità di transizione, energie di ionizzazione degli elementi.
5. W. Ramsay, *Nature* 52, 7 (1895): l'elio estratto dalla cleveite e la coincidenza con la riga $D_3$; B. Höglund, P. G. Mezger, *Science* 150, 339 (1965): la riga di ricombinazione da $n=110$ a $n=109$.
6. G. E. Hale, *Astrophysical Journal* 28, 315 (1908): il campo magnetico delle macchie solari; H. G. J. Moseley, *Philosophical Magazine* 26, 1024 (1913) e 27, 703 (1914): gli spettri X degli elementi; Y. Tanaka e collaboratori, *Nature* 375, 659 (1995): la riga del ferro deformata dalla gravità in MCG-6-30-15.
7. A. Einstein, *Physikalische Zeitschrift* 18, 121 (1917): la teoria quantistica della radiazione; J. P. Gordon, H. J. Zeiger, C. H. Townes, *Physical Review* 95, 282 (1954): il maser ad ammoniaca; T. H. Maiman, *Nature* 187, 493 (1960): il laser a rubino.
8. T. Pfrommer, P. Hickson, *Astronomy & Astrophysics* 565, A102 (2014): lo strato di sodio mesosferico per le stelle guida laser; J. O. Dickey e collaboratori, *Science* 265, 482 (1994): la misura laser della distanza della Luna.
9. H. Weaver e collaboratori, *Nature* 208, 29 (1965): l'emissione anomala dell'ossidrile; A. C. Cheung e collaboratori, *Nature* 221, 626 (1969): la scoperta del vapore acqueo interstellare; M. J. Reid, D. W. Pesce, A. G. Riess, *Astrophysical Journal Letters* 886, L27 (2019): la distanza di NGC 4258; M. J. Mumma e collaboratori, *Science* 212, 45 (1981): il laser naturale di Marte.
10. M. N. Saha, *Philosophical Magazine* 40, 472 (1920): la ionizzazione nella cromosfera solare; C. H. Payne, *Stellar Atmospheres*, Harvard Observatory Monographs 1 (1925); M. Asplund e collaboratori, *Annual Review of Astronomy and Astrophysics* 47, 481 (2009): la composizione chimica del Sole; I. S. Bowen, *Nature* 120, 473 (1927): l'origine dello spettro del nebulio.
