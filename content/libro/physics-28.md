---
unit: physics-28
titolo: Interferenza e interferometri
sottotitolo: La luce come onda che si sovrappone a se stessa, dall'esperimento di Young ai film sottili, dall'interferometro di Michelson ai rivelatori di onde gravitazionali e ai radiotelescopi grandi come la Terra
volume: Volume di fisica
fonte: Testo originale; riferimento principale D. Halliday, R. Resnick, J. Walker, Fundamentals of Physics, 12ª ed., moduli 35.1-35.5
---

## Prima di cominciare {#apertura}

Il 14 settembre 2015, alle 9:50:45 del tempo universale, i due rivelatori dell'osservatorio LIGO, a Hanford nello stato di Washington e a Livingston in Louisiana, registrarono a sette millesimi di secondo l'uno dall'altro lo stesso segnale: un'oscillazione che in due decimi di secondo saliva di frequenza da $35$ a $250$ Hz e poi si spegneva. Era il passaggio di un'onda gravitazionale prodotta, a più di un miliardo di anni luce, dalla fusione di due buchi neri di circa $36$ e $29$ masse solari. L'onda aveva allungato e accorciato i bracci di quattro chilometri dei rivelatori di qualche millesimo del diametro di un protone.

Lo strumento che ha reso possibile una misura così piccola è un'idea dell'Ottocento: l'**interferometro**, che divide un fascio di luce in due, lo manda lungo due percorsi e poi lo ricompone. Se i percorsi cambiano di una frazione di lunghezza d'onda, la luce che esce cambia. L'interferometro trasforma una differenza di lunghezza in una differenza di intensità, e la lunghezza d'onda della luce diventa il righello.

Questo capitolo tratta l'**interferenza**, il fenomeno per cui due onde coerenti che si sovrappongono si rinforzano o si annullano a seconda della loro differenza di fase. Si parte dall'esperimento con cui Thomas Young dimostrò all'inizio dell'Ottocento la natura ondulatoria della luce, si passa ai colori dei film sottili e ai trattamenti antiriflesso delle ottiche dei telescopi, all'interferometro di Michelson e ai rivelatori di onde gravitazionali, e si arriva agli interferometri astronomici, che combinano la luce di telescopi lontani migliaia di chilometri. Il capitolo [Onde e sovrapposizione](unit:physics-17) ha introdotto la sovrapposizione delle onde meccaniche; [Onde elettromagnetiche e pressione della luce](unit:physics-26) ha mostrato che la luce è un'onda elettromagnetica.

::: obiettivi
- calcolare la differenza di fase prodotta da una differenza di cammino e da un mezzo di indice $n$;
- spiegare perché l'interferenza richiede sorgenti coerenti e stimare la lunghezza di coerenza;
- applicare le condizioni dei massimi e dei minimi nell'esperimento di Young e calcolare la distanza fra le frange;
- calcolare l'intensità delle frange con la legge $I=4I_0\cos^2(\phi/2)$;
- usare le condizioni di interferenza nei film sottili e progettare un trattamento antiriflesso;
- descrivere l'interferometro di Michelson e calcolare lo spostamento delle frange;
- stimare la variazione di lunghezza prodotta da un'onda gravitazionale nei bracci di LIGO e Virgo;
- calcolare la risoluzione di un interferometro astronomico e applicarla all'Event Horizon Telescope.
:::

## Fase, cammino e coerenza {#fase}

Nel Seicento Christiaan Huygens propose di descrivere la propagazione della luce con un principio geometrico: ogni punto di un fronte d'onda si comporta come una sorgente di onde sferiche secondarie, e il nuovo fronte d'onda è l'inviluppo di queste onde. Il principio spiega la riflessione e la rifrazione; applicato a un mezzo in cui la luce è più lenta, porta alla legge di Snell se la velocità nel mezzo è $c/n$. In un mezzo di indice $n$ la frequenza della luce resta la stessa e la lunghezza d'onda si accorcia a $\lambda/n$.

Due onde della stessa frequenza che arrivano in un punto dopo aver percorso cammini diversi hanno una **differenza di fase** proporzionale alla differenza di cammino $\Delta L$:

$$\phi=2\pi\,\frac{\Delta L}{\lambda}.$$

Se $\Delta L$ è un multiplo intero di $\lambda$, le onde arrivano in fase e si rinforzano: **interferenza costruttiva**. Se è un multiplo dispari di $\lambda/2$, arrivano in opposizione e si annullano: **interferenza distruttiva**. Se le onde attraversano mezzi diversi conta il **cammino ottico**, il prodotto $nL$ dello spessore per l'indice di rifrazione, perché un tratto di vetro contiene $n$ volte più lunghezze d'onda dello stesso tratto di vuoto.

L'interferenza si osserva soltanto se la differenza di fase fra le due onde resta costante nel tempo. Due lampadine distinte producono onde che si sovrappongono senza frange stabili: ogni atomo emette treni d'onda brevi, con fasi casuali, e le frange si spostano miliardi di volte al secondo, sparendo nella media. Le onde capaci di interferire si dicono **coerenti**, e in pratica si ottengono dividendo in due la luce della stessa sorgente. Anche così l'interferenza ha un limite: un treno d'onda ha una lunghezza finita, la **lunghezza di coerenza**, approssimativamente $\lambda^2/\Delta\lambda$ per una sorgente di larghezza spettrale $\Delta\lambda$. Per la luce bianca, con $\Delta\lambda\approx300$ nm attorno a $550$ nm, vale circa un micrometro; per la riga rossa di una lampada al neon qualche centimetro; per un laser stabilizzato può superare i chilometri. Le due metà del fascio devono percorrere cammini che differiscono meno della lunghezza di coerenza.

## L'esperimento di Young {#young}

Fra il 1801 e il 1803 Thomas Young illuminò due piccole fenditure vicine con la luce del Sole passata attraverso un forellino, e osservò su uno schermo una serie di bande chiare e scure. Le due fenditure si comportano come due sorgenti coerenti, perché ricevono la luce dallo stesso fronte d'onda; in ogni punto dello schermo arrivano due onde che hanno percorso cammini diversi.

Se le fenditure distano $d$ e lo schermo si trova a una distanza $D$ molto maggiore, i raggi che raggiungono un punto dello schermo all'angolo $\theta$ sono quasi paralleli, e la differenza di cammino vale $d\sin\theta$, come mostra la figura 1.

::: figura young
{"w":760,"h":290,"items":[{"t":"line","p":[150,40,150,110],"c":"ax","w":4},{"t":"line","p":[150,130,150,170],"c":"ax","w":4},{"t":"line","p":[150,190,150,260],"c":"ax","w":4},{"t":"line","p":[680,40,680,260],"c":"ax","w":2.4},{"t":"line","p":[150,120,680,80],"c":"force","w":1.6},{"t":"line","p":[150,180,680,80],"c":"force2","w":1.6},{"t":"line","p":[150,150,680,150],"c":"muted","w":1.2,"dash":true},{"t":"line","p":[150,150,680,80],"c":"muted","w":1.2,"dash":true},{"t":"line","p":[150,120,160.9,177.9],"c":"force4","w":1.4},{"t":"line","p":[150,180,160.9,177.9],"c":"force4","w":3.0},{"t":"text","p":[174.9,199.9],"s":"d sin θ","c":"force4","size":12,"a":"start"},{"t":"text","p":[138,154],"s":"d","c":"ax","size":13,"a":"end"},{"t":"text","p":[688,84],"s":"P","c":"ax","size":13,"a":"start"},{"t":"text","p":[415.0,272],"s":"D","c":"ax","size":13},{"t":"line","p":[150,262,680,262],"c":"muted","w":1},{"t":"text","p":[270,140],"s":"θ","c":"muted","size":13},{"t":"text","p":[688,154],"s":"centro","c":"muted","size":11,"a":"start"},{"t":"text","p":[60,150],"s":"onda piana","c":"force3","size":11},{"t":"line","p":[70,60,70,240],"c":"force3","w":1.2},{"t":"line","p":[90,60,90,240],"c":"force3","w":1.2},{"t":"line","p":[110,60,110,240],"c":"force3","w":1.2}]}
---
Geometria dell'esperimento di Young. Per uno schermo lontano i raggi che partono dalle due fenditure verso lo stesso punto sono quasi paralleli, e la differenza di cammino è $d\sin\theta$. Sullo schermo si alternano frange chiare, dove la differenza è un multiplo intero della lunghezza d'onda, e frange scure.
:::

::: legge Frange di Young
I massimi di intensità si trovano agli angoli per cui

$$d\sin\theta=m\lambda,\qquad m=0,\pm1,\pm2,\dots$$

e i minimi dove $d\sin\theta=(m+\tfrac12)\lambda$. Per angoli piccoli le frange chiare sullo schermo sono equidistanti, con distanza

$$\Delta y=\frac{\lambda D}{d}.$$
:::

Con luce rossa di $633$ nm, fenditure distanti $0{,}25$ mm e uno schermo a $1$ m, le frange distano circa $2{,}5$ mm: abbastanza da vederle a occhio. Misurando $\Delta y$, $D$ e $d$, Young ottenne la prima misura della lunghezza d'onda della luce visibile, e trovò valori di circa mezzo micrometro, troppo piccoli per essere sospettati prima. Con luce bianca la frangia centrale è bianca, perché per $m=0$ tutti i colori sono in fase, e le frange laterali si colorano e si confondono rapidamente.

Per un secolo la teoria ondulatoria dovette competere con la teoria corpuscolare di Newton. L'esperimento di Young, poi la teoria della diffrazione di Augustin Fresnel e la misura di Léon Foucault, che nel 1850 mostrò che la luce è più lenta nell'acqua che nell'aria come prevedeva la teoria ondulatoria, chiusero la questione per tutto l'Ottocento. Il Novecento l'avrebbe riaperta con i fotoni: oggi l'esperimento di Young si esegue anche inviando un fotone alla volta, e le frange compaiono lentamente, punto dopo punto, come una distribuzione di probabilità.

## L'intensità delle frange {#intensita}

Le frange di Young sfumano con continuità: l'intensità varia con continuità fra massimi e minimi. Se ciascuna fenditura da sola produce sullo schermo l'intensità $I_0$, le due onde hanno campi di uguale ampiezza $E_0$ sfasati di $\phi=2\pi d\sin\theta/\lambda$. Il campo risultante è la somma di due sinusoidi sfasate, che ha ampiezza $2E_0\cos(\phi/2)$; l'intensità, proporzionale al quadrato dell'ampiezza, vale quindi:

::: legge Intensità nell'interferenza di due onde
$$I=4I_0\cos^2\frac{\phi}{2},\qquad \phi=\frac{2\pi d}{\lambda}\sin\theta .$$

Nei massimi l'intensità è quattro volte quella di una sola onda, nei minimi è nulla, e la media su molte frange vale $2I_0$.
:::

Il fattore quattro sembra creare energia dal nulla, e la media risolve il paradosso: l'energia che manca nelle frange scure si trova nelle frange chiare, e in media lo schermo riceve $2I_0$, la somma delle due onde. L'interferenza non crea né distrugge energia; la ridistribuisce nello spazio. La figura 2 mostra l'andamento.

::: figura frange
{"w":760,"h":285,"items":[{"t":"axes","o":[80,250],"x":[640,"distanza dal centro, frange"],"y":[225,"I/I₀"],"sx":70,"sy":50,"xt":[[0,"−3"],[1,"−2"],[2,"−1"],[3,"0"],[4,"1"],[5,"2"],[6,"3"]],"yt":[[0,"0"],[1,"1"],[2,"2"],[3,"3"],[4,"4"]]},{"t":"plot","o":[80,250],"sx":70,"sy":50,"pts":[[0.0,4.0],[0.02,3.9842294],[0.04,3.9371663],[0.06,3.859553],[0.08,3.7526134],[0.1,3.618034],[0.12,3.4579373],[0.14,3.274848],[0.16,3.0716536],[0.18,2.8515586],[0.2,2.618034],[0.22,2.3747626],[0.24,2.125581],[0.26,1.874419],[0.28,1.6252374],[0.3,1.381966],[0.32,1.1484414],[0.34,0.9283464],[0.36,0.725152],[0.38,0.5420627],[0.4,0.381966],[0.42,0.2473866],[0.44,0.140447],[0.46,0.0628337],[0.48,0.0157706],[0.5,0.0],[0.52,0.0157706],[0.54,0.0628337],[0.56,0.140447],[0.58,0.2473866],[0.6,0.381966],[0.62,0.5420627],[0.64,0.725152],[0.66,0.9283464],[0.68,1.1484414],[0.7,1.381966],[0.72,1.6252374],[0.74,1.874419],[0.76,2.125581],[0.78,2.3747626],[0.8,2.618034],[0.82,2.8515586],[0.84,3.0716536],[0.86,3.274848],[0.88,3.4579373],[0.9,3.618034],[0.92,3.7526134],[0.94,3.859553],[0.96,3.9371663],[0.98,3.9842294],[1.0,4.0],[1.02,3.9842294],[1.04,3.9371663],[1.06,3.859553],[1.08,3.7526134],[1.1,3.618034],[1.12,3.4579373],[1.14,3.274848],[1.16,3.0716536],[1.18,2.8515586],[1.2,2.618034],[1.22,2.3747626],[1.24,2.125581],[1.26,1.874419],[1.28,1.6252374],[1.3,1.381966],[1.32,1.1484414],[1.34,0.9283464],[1.36,0.725152],[1.38,0.5420627],[1.4,0.381966],[1.42,0.2473866],[1.44,0.140447],[1.46,0.0628337],[1.48,0.0157706],[1.5,0.0],[1.52,0.0157706],[1.54,0.0628337],[1.56,0.140447],[1.58,0.2473866],[1.6,0.381966],[1.62,0.5420627],[1.64,0.725152],[1.66,0.9283464],[1.68,1.1484414],[1.7,1.381966],[1.72,1.6252374],[1.74,1.874419],[1.76,2.125581],[1.78,2.3747626],[1.8,2.618034],[1.82,2.8515586],[1.84,3.0716536],[1.86,3.274848],[1.88,3.4579373],[1.9,3.618034],[1.92,3.7526134],[1.94,3.859553],[1.96,3.9371663],[1.98,3.9842294],[2.0,4.0],[2.02,3.9842294],[2.04,3.9371663],[2.06,3.859553],[2.08,3.7526134],[2.1,3.618034],[2.12,3.4579373],[2.14,3.274848],[2.16,3.0716536],[2.18,2.8515586],[2.2,2.618034],[2.22,2.3747626],[2.24,2.125581],[2.26,1.874419],[2.28,1.6252374],[2.3,1.381966],[2.32,1.1484414],[2.34,0.9283464],[2.36,0.725152],[2.38,0.5420627],[2.4,0.381966],[2.42,0.2473866],[2.44,0.140447],[2.46,0.0628337],[2.48,0.0157706],[2.5,0.0],[2.52,0.0157706],[2.54,0.0628337],[2.56,0.140447],[2.58,0.2473866],[2.6,0.381966],[2.62,0.5420627],[2.64,0.725152],[2.66,0.9283464],[2.68,1.1484414],[2.7,1.381966],[2.72,1.6252374],[2.74,1.874419],[2.76,2.125581],[2.78,2.3747626],[2.8,2.618034],[2.82,2.8515586],[2.84,3.0716536],[2.86,3.274848],[2.88,3.4579373],[2.9,3.618034],[2.92,3.7526134],[2.94,3.859553],[2.96,3.9371663],[2.98,3.9842294],[3.0,4.0],[3.02,3.9842294],[3.04,3.9371663],[3.06,3.859553],[3.08,3.7526134],[3.1,3.618034],[3.12,3.4579373],[3.14,3.274848],[3.16,3.0716536],[3.18,2.8515586],[3.2,2.618034],[3.22,2.3747626],[3.24,2.125581],[3.26,1.874419],[3.28,1.6252374],[3.3,1.381966],[3.32,1.1484414],[3.34,0.9283464],[3.36,0.725152],[3.38,0.5420627],[3.4,0.381966],[3.42,0.2473866],[3.44,0.140447],[3.46,0.0628337],[3.48,0.0157706],[3.5,0.0],[3.52,0.0157706],[3.54,0.0628337],[3.56,0.140447],[3.58,0.2473866],[3.6,0.381966],[3.62,0.5420627],[3.64,0.725152],[3.66,0.9283464],[3.68,1.1484414],[3.7,1.381966],[3.72,1.6252374],[3.74,1.874419],[3.76,2.125581],[3.78,2.3747626],[3.8,2.618034],[3.82,2.8515586],[3.84,3.0716536],[3.86,3.274848],[3.88,3.4579373],[3.9,3.618034],[3.92,3.7526134],[3.94,3.859553],[3.96,3.9371663],[3.98,3.9842294],[4.0,4.0],[4.02,3.9842294],[4.04,3.9371663],[4.06,3.859553],[4.08,3.7526134],[4.1,3.618034],[4.12,3.4579373],[4.14,3.274848],[4.16,3.0716536],[4.18,2.8515586],[4.2,2.618034],[4.22,2.3747626],[4.24,2.125581],[4.26,1.874419],[4.28,1.6252374],[4.3,1.381966],[4.32,1.1484414],[4.34,0.9283464],[4.36,0.725152],[4.38,0.5420627],[4.4,0.381966],[4.42,0.2473866],[4.44,0.140447],[4.46,0.0628337],[4.48,0.0157706],[4.5,0.0],[4.52,0.0157706],[4.54,0.0628337],[4.56,0.140447],[4.58,0.2473866],[4.6,0.381966],[4.62,0.5420627],[4.64,0.725152],[4.66,0.9283464],[4.68,1.1484414],[4.7,1.381966],[4.72,1.6252374],[4.74,1.874419],[4.76,2.125581],[4.78,2.3747626],[4.8,2.618034],[4.82,2.8515586],[4.84,3.0716536],[4.86,3.274848],[4.88,3.4579373],[4.9,3.618034],[4.92,3.7526134],[4.94,3.859553],[4.96,3.9371663],[4.98,3.9842294],[5.0,4.0],[5.02,3.9842294],[5.04,3.9371663],[5.06,3.859553],[5.08,3.7526134],[5.1,3.618034],[5.12,3.4579373],[5.14,3.274848],[5.16,3.0716536],[5.18,2.8515586],[5.2,2.618034],[5.22,2.3747626],[5.24,2.125581],[5.26,1.874419],[5.28,1.6252374],[5.3,1.381966],[5.32,1.1484414],[5.34,0.9283464],[5.36,0.725152],[5.38,0.5420627],[5.4,0.381966],[5.42,0.2473866],[5.44,0.140447],[5.46,0.0628337],[5.48,0.0157706],[5.5,0.0],[5.52,0.0157706],[5.54,0.0628337],[5.56,0.140447],[5.58,0.2473866],[5.6,0.381966],[5.62,0.5420627],[5.64,0.725152],[5.66,0.9283464],[5.68,1.1484414],[5.7,1.381966],[5.72,1.6252374],[5.74,1.874419],[5.76,2.125581],[5.78,2.3747626],[5.8,2.618034],[5.82,2.8515586],[5.84,3.0716536],[5.86,3.274848],[5.88,3.4579373],[5.9,3.618034],[5.92,3.7526134],[5.94,3.859553],[5.96,3.9371663],[5.98,3.9842294],[6.0,4.0]],"c":"force2","w":2.4},{"t":"plot","o":[80,250],"sx":70,"sy":50,"pts":[[0,2],[6,2]],"c":"muted","w":1.6,"dash":true},{"t":"text","p":[525.0,150],"s":"media 2I₀","c":"muted","size":10,"a":"start"},{"t":"text","p":[300,54],"s":"4I₀","c":"force2","size":10,"a":"start"}]}
---
Intensità sullo schermo nell'esperimento di Young, in unità dell'intensità $I_0$ di una sola fenditura, in funzione della distanza dal centro misurata in frange. I massimi valgono $4I_0$, i minimi zero; la linea tratteggiata è la media, $2I_0$, uguale alla somma delle due onde senza interferenza.
:::

Se le due onde hanno ampiezze diverse, i minimi non sono più nulli e il contrasto delle frange diminuisce. Il contrasto, o **visibilità**, $V=(I_{\max}-I_{\min})/(I_{\max}+I_{\min})$, vale $1$ per onde uguali e perfettamente coerenti e diminuisce se le onde sono diverse o poco coerenti. In astronomia la visibilità delle frange prodotte dalla luce di una stella in due telescopi è proprio la grandezza che si misura, perché dipende dalla forma e dalla dimensione della stella.

## Film sottili {#film}

Le bolle di sapone, le macchie d'olio sull'asfalto bagnato e le ali di alcuni insetti mostrano colori che cambiano con l'angolo di osservazione. Sono colori di interferenza: la luce si riflette in parte sulla superficie superiore di uno strato sottile e in parte su quella inferiore, e le due onde riflesse si sovrappongono.

Per calcolare la differenza di fase occorrono due ingredienti. Il primo è il cammino: in incidenza quasi perpendicolare l'onda riflessa dalla superficie inferiore percorre in più lo spessore $L$ due volte, nel mezzo di indice $n$, quindi il cammino ottico aggiuntivo è $2nL$. Il secondo è la riflessione: un'onda che si riflette su un mezzo con indice maggiore di quello da cui proviene subisce un salto di fase di mezzo ciclo, come una corda fissata a un estremo; riflettendosi su un mezzo di indice minore non lo subisce.

::: legge Interferenza in un film sottile
In incidenza perpendicolare, se una sola delle due riflessioni comporta il salto di mezzo ciclo, come in una bolla di sapone in aria, la luce riflessa ha massimi per

$$2nL=\left(m+\tfrac12\right)\lambda$$

e minimi per $2nL=m\lambda$. Se le riflessioni con salto sono due, o nessuna, le condizioni si scambiano.
:::

Un film di sapone con indice $1{,}33$ e spessore di $100$ nm rinforza per riflessione la luce di lunghezza d'onda $4nL/(2m+1)$, cioè circa $532$ nm per $m=0$: appare verde. Dove il film si assottiglia, in alto nella bolla che sta per scoppiare, diventa nero, perché con $L$ molto minore della lunghezza d'onda la differenza di cammino è trascurabile e resta soltanto il salto di fase, che rende distruttiva l'interferenza per ogni colore.

La stessa fisica serve a eliminare i riflessi. Ogni superficie di vetro non trattata riflette circa il $4$ per cento della luce; un telescopio o una fotocamera con dieci superfici perderebbe un terzo della luce e produrrebbe immagini fantasma. Un **trattamento antiriflesso** è uno strato trasparente di indice intermedio fra aria e vetro, come il fluoruro di magnesio con $n=1{,}38$, spesso un quarto di lunghezza d'onda nel materiale: $L=\lambda/(4n)$. Entrambe le riflessioni avvengono su un mezzo più rifrangente e subiscono lo stesso salto di fase; la differenza di cammino $2nL=\lambda/2$ le mette in opposizione, e la luce riflessa si annulla, quasi del tutto per la lunghezza d'onda di progetto. Per $550$ nm lo spessore è circa $100$ nm. La luce sottratta alla riflessione passa nel vetro, e il trattamento aumenta la trasmissione. La figura 3 mostra i due casi.

::: figura film
{"w":760,"h":245,"items":[{"t":"text","p":[190.0,20],"s":"lamina di sapone in aria","c":"ax","size":12},{"t":"rect","p":[40,80,300,40],"c":"muted","r":0},{"t":"poly","pts":[[40,120],[340,120],[340,180],[40,180]],"close":true,"c":"ax","w":1},{"t":"line","p":[40,80,340,80],"c":"ax","w":1.2},{"t":"line","p":[40,120,340,120],"c":"ax","w":1.2},{"t":"arrow","p":[80,45,115,80],"c":"force","w":2,"head":8},{"t":"arrow","p":[115,80,150,45],"c":"force3","w":2,"head":8},{"t":"line","p":[115,80,150,120],"c":"force","w":1.6},{"t":"line","p":[150,120,185,80],"c":"force","w":1.6},{"t":"arrow","p":[185,80,220,45],"c":"force2","w":2,"head":8},{"t":"text","p":[158,42],"s":"1","c":"force3","size":12},{"t":"text","p":[228,42],"s":"2","c":"force2","size":12},{"t":"text","p":[332,105],"s":"sapone, n = 1,33","c":"force2","size":11,"a":"end"},{"t":"text","p":[332,155],"s":"aria","c":"ax","size":11,"a":"end"},{"t":"text","p":[190.0,205],"s":"salto di fase soltanto nell'onda 1","c":"muted","size":11},{"t":"text","p":[190.0,225],"s":"spessore L, cammino aggiuntivo 2nL","c":"muted","size":10},{"t":"text","p":[570.0,20],"s":"antiriflesso su vetro","c":"ax","size":12},{"t":"rect","p":[420,80,300,40],"c":"muted","r":0},{"t":"poly","pts":[[420,120],[720,120],[720,180],[420,180]],"close":true,"c":"ax","w":1},{"t":"line","p":[420,80,720,80],"c":"ax","w":1.2},{"t":"line","p":[420,120,720,120],"c":"ax","w":1.2},{"t":"arrow","p":[460,45,495,80],"c":"force","w":2,"head":8},{"t":"arrow","p":[495,80,530,45],"c":"force3","w":2,"head":8},{"t":"line","p":[495,80,530,120],"c":"force","w":1.6},{"t":"line","p":[530,120,565,80],"c":"force","w":1.6},{"t":"arrow","p":[565,80,600,45],"c":"force2","w":2,"head":8},{"t":"text","p":[538,42],"s":"1","c":"force3","size":12},{"t":"text","p":[608,42],"s":"2","c":"force2","size":12},{"t":"text","p":[712,105],"s":"MgF₂, n = 1,38","c":"force4","size":11,"a":"end"},{"t":"text","p":[712,155],"s":"vetro, n = 1,5","c":"ax","size":11,"a":"end"},{"t":"text","p":[570.0,205],"s":"salto di fase in entrambe le onde","c":"muted","size":11},{"t":"text","p":[570.0,225],"s":"spessore L, cammino aggiuntivo 2nL","c":"muted","size":10}]}
---
Riflessioni su uno strato sottile. A sinistra una lamina di sapone in aria: una sola riflessione inverte la fase. A destra un trattamento antiriflesso su vetro: entrambe le riflessioni invertono la fase, e uno spessore di un quarto di lunghezza d'onda nel materiale mette in opposizione le due onde riflesse.
:::

Le ottiche dei telescopi e degli strumenti astronomici usano trattamenti a molti strati, progettati per ridurre i riflessi su intervalli di lunghezza d'onda ampi, e filtri interferenziali, pile di decine di strati che trasmettono soltanto una banda stretta attorno a una riga spettrale, come la riga rossa dell'idrogeno a $656$ nm. Con questi filtri si fotografano le nebulose di idrogeno ionizzato e le protuberanze del Sole.

## L'interferometro di Michelson {#michelson}

Nel 1881 Albert Michelson costruì uno strumento destinato a diventare uno dei più importanti della fisica. Un fascio di luce incide su una lamina semiriflettente, il divisore di fascio, inclinata di $45°$: metà della luce prosegue verso uno specchio, metà viene riflessa verso un secondo specchio posto lungo un braccio perpendicolare. I due fasci tornano indietro, si ricombinano sul divisore e raggiungono un rivelatore. La figura 4 mostra lo schema.

::: figura michelson
{"w":760,"h":320,"items":[{"t":"rect","p":[40,155,70,30],"c":"force","r":4},{"t":"text","p":[75,205],"s":"laser","c":"force","size":11},{"t":"line","p":[308,192,352,148],"c":"ax","w":3.2},{"t":"text","p":[360,204],"s":"divisore","c":"ax","size":11,"a":"start"},{"t":"line","p":[650,140,650,200],"c":"body","w":5},{"t":"text","p":[650,215],"s":"specchio 1","c":"body","size":11},{"t":"line","p":[300,40,360,40],"c":"body","w":5},{"t":"text","p":[372,44],"s":"specchio 2","c":"body","size":11,"a":"start"},{"t":"rect","p":[310,290,40,18],"c":"force3","r":3},{"t":"text","p":[372,304],"s":"rivelatore","c":"force3","size":11,"a":"start"},{"t":"line","p":[110,170,330,170],"c":"force","w":2},{"t":"line","p":[330,170,650,170],"c":"force","w":2},{"t":"line","p":[330,170,330,40],"c":"force2","w":2},{"t":"line","p":[330,170,330,290],"c":"force3","w":2.2},{"t":"text","p":[490,160],"s":"braccio L₁","c":"force","size":11},{"t":"text","p":[300,100],"s":"braccio L₂","c":"force2","size":11,"a":"end"},{"t":"arrow","p":[660,170,700,170],"c":"muted","w":1.4,"head":8},{"t":"text","p":[700,190],"s":"λ/4","c":"muted","size":11}]}
---
Schema dell'interferometro di Michelson. Il divisore di fascio separa la luce del laser lungo due bracci perpendicolari; gli specchi la rimandano indietro e i due fasci si ricombinano sul rivelatore. Se un braccio si allunga di $\lambda/4$, la differenza di cammino cambia di $\lambda/2$ e una frangia chiara diventa scura.
:::

Se i due bracci hanno lunghezze $L_1$ e $L_2$, la differenza di cammino è $\Delta=2(L_1-L_2)$, perché ogni braccio è percorso due volte. Con bracci ideali e fasci di uguale intensità, l'intensità al rivelatore vale:

::: legge Uscita di un interferometro di Michelson
$$I=I_0\cos^2\frac{\pi\Delta}{\lambda},\qquad \Delta=2(L_1-L_2).$$

Spostando uno specchio di $\lambda/2$ la differenza di cammino cambia di una lunghezza d'onda e al rivelatore passa una frangia intera. Contando $N$ frange si misura uno spostamento $N\lambda/2$.
:::

Con un laser di $1064$ nm, la lunghezza d'onda dei laser dei rivelatori di onde gravitazionali, una differenza di cammino di $266$ nm, un quarto di lunghezza d'onda, dimezza l'intensità; $532$ nm la annullano. È il modello del laboratorio di questa unità.

Nel 1887 Michelson ed Edward Morley usarono un interferometro montato su una lastra di pietra galleggiante nel mercurio, con un cammino allungato da riflessioni multiple a circa $11$ m, per cercare la differenza di velocità della luce nei due bracci dovuta al moto della Terra nell'etere, il mezzo ipotetico delle onde luminose. Si attendevano uno spostamento di circa $0{,}4$ frange ruotando lo strumento; misurarono meno di un ventesimo di quel valore. Il risultato nullo fu uno degli indizi da cui nacque la relatività ristretta, tema del capitolo [Relatività ristretta](unit:physics-36). Michelson usò poi l'interferometro per confrontare il metro campione con la lunghezza d'onda della riga rossa del cadmio, aprendo la strada alla definizione del metro basata sulla luce.

## Onde gravitazionali: LIGO e Virgo {#ligo}

La relatività generale prevede che masse accelerate producano **onde gravitazionali**, perturbazioni dello spazio-tempo che viaggiano alla velocità della luce. Un'onda che attraversa un interferometro perpendicolarmente al piano dei bracci allunga un braccio e accorcia l'altro, poi inverte l'effetto mezzo periodo dopo. L'ampiezza dell'onda si esprime con la **deformazione** $h$, la variazione relativa di lunghezza: un braccio di lunghezza $L$ cambia di circa $hL/2$, e la differenza fra i due bracci di circa $hL$.

Le onde che arrivano sulla Terra dalle sorgenti più intense, le fusioni di buchi neri e di stelle di neutroni, hanno $h\approx10^{-21}$. Con bracci di $4$ km la differenza di lunghezza è di qualche $10^{-18}$ m. Per misurarla, gli interferometri di LIGO sono interferometri di Michelson con tre accorgimenti decisivi. Ogni braccio contiene una cavità ottica in cui la luce rimbalza fra due specchi alcune centinaia di volte prima di tornare al divisore, moltiplicando l'effetto. La potenza del laser viene accumulata da uno specchio che rimanda nell'interferometro la luce che esce dalla parte del laser, e nelle cavità circolano centinaia di kilowatt. Gli specchi, cilindri di silice fusa di $40$ kg, sono sospesi a pendoli multipli che li isolano dalle vibrazioni del suolo, in tubi a vuoto spinto lunghi chilometri. L'interferometro lavora vicino a una frangia scura, dove un piccolo cambiamento di cammino produce una variazione di luce misurabile.

Dopo il primo segnale del settembre 2015, chiamato GW150914, le osservazioni si sono moltiplicate. Nel 2017 è entrato in rete l'interferometro europeo Virgo, a Cascina vicino a Pisa, con bracci di $3$ km, e la terna di rivelatori ha permesso di localizzare le sorgenti nel cielo. Il 17 agosto 2017 i rivelatori hanno registrato la fusione di due stelle di neutroni, GW170817; $1{,}7$ secondi dopo il satellite Fermi ha osservato un lampo di raggi gamma, e nelle ore successive i telescopi hanno trovato la luce dell'esplosione in una galassia a circa $40$ megaparsec. La differenza di tempo fra i due segnali, dopo un viaggio di più di cento milioni di anni, ha mostrato che le onde gravitazionali viaggiano alla velocità della luce entro una parte su $10^{15}$. Nel catalogo pubblicato nell'agosto 2025 dalle collaborazioni LIGO, Virgo e KAGRA, che comprende la prima parte del quarto periodo di osservazione, i candidati sono $218$. La figura 5 confronta le scale in gioco.

::: figura ligo
{"w":760,"h":235,"items":[{"t":"line","p":[50,170,717,170],"c":"ax","w":1.6},{"t":"line","p":[79,170,79,176],"c":"ax","w":1.2},{"t":"text","p":[79,194],"s":"10⁻¹⁸ m","c":"ax","size":10},{"t":"line","p":[137,170,137,176],"c":"ax","w":1.2},{"t":"text","p":[137,194],"s":"10⁻¹⁶ m","c":"ax","size":10},{"t":"line","p":[195,170,195,176],"c":"ax","w":1.2},{"t":"text","p":[195,194],"s":"10⁻¹⁴ m","c":"ax","size":10},{"t":"line","p":[253,170,253,176],"c":"ax","w":1.2},{"t":"text","p":[253,194],"s":"10⁻¹² m","c":"ax","size":10},{"t":"line","p":[311,170,311,176],"c":"ax","w":1.2},{"t":"text","p":[311,194],"s":"10⁻¹⁰ m","c":"ax","size":10},{"t":"line","p":[369,170,369,176],"c":"ax","w":1.2},{"t":"text","p":[369,194],"s":"10⁻⁸ m","c":"ax","size":10},{"t":"line","p":[427,170,427,176],"c":"ax","w":1.2},{"t":"text","p":[427,194],"s":"10⁻⁶ m","c":"ax","size":10},{"t":"line","p":[485,170,485,176],"c":"ax","w":1.2},{"t":"text","p":[485,194],"s":"10⁻⁴ m","c":"ax","size":10},{"t":"line","p":[543,170,543,176],"c":"ax","w":1.2},{"t":"text","p":[543,194],"s":"10⁻² m","c":"ax","size":10},{"t":"line","p":[601,170,601,176],"c":"ax","w":1.2},{"t":"text","p":[601,194],"s":"10⁰ m","c":"ax","size":10},{"t":"line","p":[659,170,659,176],"c":"ax","w":1.2},{"t":"text","p":[659,194],"s":"10² m","c":"ax","size":10},{"t":"line","p":[717,170,717,176],"c":"ax","w":1.2},{"t":"text","p":[717,194],"s":"10⁴ m","c":"ax","size":10},{"t":"line","p":[705.5,170,705.5,108],"c":"force2","w":1.6},{"t":"circle","p":[705.5,170,4.5],"c":"force2"},{"t":"text","p":[713.5,100],"s":"braccio di LIGO, 4 km","c":"force2","size":11,"a":"end"},{"t":"line","p":[427.8,170,427.8,138],"c":"force","w":1.6},{"t":"circle","p":[427.8,170,4.5],"c":"force"},{"t":"text","p":[427.8,130],"s":"laser, 1064 nm","c":"force","size":11},{"t":"line","p":[311.0,170,311.0,108],"c":"muted","w":1.6},{"t":"circle","p":[311.0,170,4.5],"c":"muted"},{"t":"text","p":[311.0,100],"s":"atomo, 10⁻¹⁰ m","c":"muted","size":11},{"t":"line","p":[172.7,170,172.7,138],"c":"muted","w":1.6},{"t":"circle","p":[172.7,170,4.5],"c":"muted"},{"t":"text","p":[172.7,130],"s":"protone, 1,7·10⁻¹⁵ m","c":"muted","size":11},{"t":"line","p":[96.5,170,96.5,108],"c":"force4","w":1.6},{"t":"circle","p":[96.5,170,4.5],"c":"force4"},{"t":"text","p":[96.5,100],"s":"variazione hL, 4·10⁻¹⁸ m","c":"force4","size":11,"a":"start"},{"t":"text","p":[717,220],"s":"lunghezza","c":"ax","size":11,"a":"end"}]}
---
Lunghezze coinvolte nella rivelazione di un'onda gravitazionale, su scala logaritmica: il braccio di LIGO, la lunghezza d'onda del laser, il diametro di un atomo e di un protone, e la variazione di lunghezza prodotta da un'onda con $h=10^{-21}$, qualche millesimo del diametro di un protone.
:::

Dai rivelatori a terra non si possono osservare onde di frequenza inferiore a qualche hertz, perché le vibrazioni del suolo e le variazioni della gravità locale le mascherano. Per le onde a bassa frequenza, prodotte da buchi neri di milioni di masse solari al centro delle galassie, l'Agenzia Spaziale Europea ha approvato nel gennaio 2024 la missione LISA: tre satelliti in orbita attorno al Sole, a $2{,}5$ milioni di chilometri l'uno dall'altro, scambiati fra loro fasci laser, con lancio previsto intorno al 2035.

## Interferometri astronomici {#stelle}

Un telescopio di diametro $D$ non distingue dettagli più piccoli di un angolo dell'ordine di $\lambda/D$, per la diffrazione trattata nel capitolo [Diffrazione e potere risolutivo](unit:physics-29). Combinando la luce di due telescopi distanti $B$ si ottengono frange la cui visibilità dipende dalla struttura della sorgente su scale angolari dell'ordine di $\lambda/B$. Un interferometro con base $B$ ha quindi una risoluzione paragonabile a quella di un telescopio di diametro $B$.

::: legge Risoluzione di un interferometro
Un interferometro con base $B$ distingue strutture con scala angolare

$$\theta\approx\frac{\lambda}{B}\quad\text{in radianti}.$$

Moltiplicando per $206\,265$ si ottengono secondi d'arco.
:::

Nel dicembre 1920 Michelson e Francis Pease montarono sul telescopio di $2{,}5$ m di Monte Wilson una trave di acciaio lunga $6$ m con due coppie di specchi mobili, e misurarono la distanza fra gli specchi alla quale le frange prodotte dalla luce di Betelgeuse sparivano. Ne ricavarono un diametro angolare di circa $0{,}047''$: per la prima volta si misurava la dimensione di una stella diversa dal Sole. Oggi l'interferometro del Very Large Telescope dell'ESO, in Cile, combina la luce di telescopi distanti fino a più di cento metri e misura la forma delle stelle e le orbite delle stelle attorno al buco nero al centro della Galassia.

Nel radio l'interferometria è la regola, perché la lunghezza d'onda è grande e un singolo radiotelescopio vede pochi dettagli. Un'antenna di $100$ m a $21$ cm risolve circa $9'$; il Very Large Array, nel Nuovo Messico, combina $27$ antenne su basi fino a $36$ km; ALMA, a $5000$ m di quota nel deserto di Atacama, combina $66$ antenne per le onde millimetriche su basi fino a $16$ km. Con la tecnica VLBI, in cui i segnali di radiotelescopi lontani vengono registrati con orologi atomici e combinati in seguito, la base diventa grande quanto la Terra.

L'Event Horizon Telescope è una rete VLBI di radiotelescopi distribuiti su più continenti, dalle Hawaii all'Antartide che osserva a $1{,}3$ mm. Con basi di quasi $11\,000$ km raggiunge una risoluzione di circa $25$ milionesimi di secondo d'arco, sufficiente a leggere un giornale a New York da Parigi. Il 10 aprile 2019 la collaborazione ha presentato la prima immagine dell'ombra di un buco nero, quello di circa sei miliardi e mezzo di masse solari al centro della galassia M87: un anello di circa $42$ microsecondi d'arco. Nel maggio 2022 ha presentato l'immagine di Sagittarius A*, il buco nero di quattro milioni di masse solari al centro della Via Lattea, con un anello di circa $52$ microsecondi d'arco. La figura 6 mostra la risoluzione in funzione della base, il modello di questo paragrafo.

::: figura risoluzione
{"w":760,"h":290,"items":[{"t":"axes","o":[90,255],"x":[660,"base B, m"],"y":[240,"risoluzione, secondi d'arco"],"sx":80,"sy":17,"xt":[[0,"10¹"],[1,"10²"],[2,"10³"],[3,"10⁴"],[4,"10⁵"],[5,"10⁶"],[6,"10⁷"]],"yt":[[0,"10⁻⁶"],[2,"10⁻⁴"],[4,"10⁻²"],[6,"10⁰"],[8,"10²"]]},{"t":"plot","o":[90,255],"sx":80,"sy":17,"pts":[[0.0,9.6366448],[0.2,9.4366448],[0.4,9.2366448],[0.6,9.0366448],[0.8,8.8366448],[1.0,8.6366448],[1.2,8.4366448],[1.4,8.2366448],[1.6,8.0366448],[1.8,7.8366448],[2.0,7.6366448],[2.2,7.4366448],[2.4,7.2366448],[2.6,7.0366448],[2.8,6.8366448],[3.0,6.6366448],[3.2,6.4366448],[3.4,6.2366448],[3.6,6.0366448],[3.8,5.8366448],[4.0,5.6366448],[4.2,5.4366448],[4.4,5.2366448],[4.6,5.0366448],[4.8,4.8366448],[5.0,4.6366448],[5.2,4.4366448],[5.4,4.2366448],[5.6,4.0366448],[5.8,3.8366448],[6.0,3.6366448],[6.2,3.4366448],[6.4,3.2366448]],"c":"force4","w":2.2},{"t":"text","p":[96.0,83.2],"s":"21 cm","c":"force4","size":10,"a":"start"},{"t":"plot","o":[90,255],"sx":80,"sy":17,"pts":[[0.0,7.4283689],[0.2,7.2283689],[0.4,7.0283689],[0.6,6.8283689],[0.8,6.6283689],[1.0,6.4283689],[1.2,6.2283689],[1.4,6.0283689],[1.6,5.8283689],[1.8,5.6283689],[2.0,5.4283689],[2.2,5.2283689],[2.4,5.0283689],[2.6,4.8283689],[2.8,4.6283689],[3.0,4.4283689],[3.2,4.2283689],[3.4,4.0283689],[3.6,3.8283689],[3.8,3.6283689],[4.0,3.4283689],[4.2,3.2283689],[4.4,3.0283689],[4.6,2.8283689],[4.8,2.6283689],[5.0,2.4283689],[5.2,2.2283689],[5.4,2.0283689],[5.6,1.8283689],[5.8,1.6283689],[6.0,1.4283689],[6.2,1.2283689],[6.4,1.0283689]],"c":"force2","w":2.2},{"t":"text","p":[96.0,120.7],"s":"1,3 mm","c":"force2","size":10,"a":"start"},{"t":"plot","o":[90,255],"sx":80,"sy":17,"pts":[[0.0,4.6568482],[0.2,4.4568482],[0.4,4.2568482],[0.6,4.0568482],[0.8,3.8568482],[1.0,3.6568482],[1.2,3.4568482],[1.4,3.2568482],[1.6,3.0568482],[1.8,2.8568482],[2.0,2.6568482],[2.2,2.4568482],[2.4,2.2568482],[2.6,2.0568482],[2.8,1.8568482],[3.0,1.6568482],[3.2,1.4568482],[3.4,1.2568482],[3.6,1.0568482],[3.8,0.8568482],[4.0,0.6568482],[4.2,0.4568482],[4.4,0.2568482],[4.6,0.0568482]],"c":"force","w":2.2},{"t":"text","p":[96.0,167.8],"s":"2,2 μm","c":"force","size":10,"a":"start"},{"t":"circle","p":[374.5,151.6,5],"c":"accent"},{"t":"text","p":[366.5,167.6],"s":"VLA","c":"accent","size":10,"a":"end"},{"t":"circle","p":[346.3,183.2,5],"c":"accent"},{"t":"text","p":[338.3,199.2],"s":"ALMA","c":"accent","size":10,"a":"end"},{"t":"circle","p":[572.4,231.2,5],"c":"accent"},{"t":"text","p":[564.4,247.2],"s":"EHT","c":"accent","size":10,"a":"end"},{"t":"circle","p":[179.1,194.8,5],"c":"accent"},{"t":"text","p":[171.1,210.8],"s":"VLTI","c":"accent","size":10,"a":"end"}]}
---
Risoluzione $\lambda/B$ di un interferometro in funzione della base, su scale logaritmiche, per tre lunghezze d'onda: $21$ cm, l'idrogeno neutro; $1{,}3$ mm, l'Event Horizon Telescope; $2{,}2$ μm, l'infrarosso dei grandi interferometri ottici. I punti indicano alcuni strumenti reali.
:::

## Un'esperienza: le frange di due fenditure {#esperienza}

Le frange di Young si producono in casa con un puntatore laser e due fenditure tagliate a mano. Il laser va usato con prudenza: un puntatore di classe 2, con potenza non superiore a $1$ mW, non va mai puntato verso gli occhi, né direttamente né dopo una riflessione su una superficie lucida.

::: metodo Due fenditure e un puntatore laser
1. Annerire un vetrino da microscopio con la fiamma di una candela, oppure usare un foglio di alluminio da cucina teso su un telaio di cartone.
2. Tenendo affiancate due lamette con un foglio di carta in mezzo come distanziatore, incidere con un solo movimento due righe parallele nel nerofumo o nell'alluminio. La distanza fra le righe è circa lo spessore del foglio, $0{,}1$ mm, o qualche decimo di millimetro con più fogli.
3. In una stanza buia, illuminare le fenditure con il puntatore e osservare la figura su una parete a $2$-$3$ m di distanza: una serie di punti luminosi equidistanti dentro una macchia più larga, l'inviluppo della diffrazione di ciascuna fenditura.
4. Misurare la distanza $D$ fra fenditure e parete e la distanza fra dieci frange consecutive, e ricavare $\Delta y$.
5. Misurare $d$ con una lente d'ingrandimento e un righello millimetrato, oppure fotografando le fenditure accanto al righello con un telefono e ingrandendo l'immagine.
6. Calcolare la lunghezza d'onda con $\lambda=d\,\Delta y/D$ e confrontarla con quella indicata sul puntatore, di solito $650$ nm per i laser rossi e $532$ nm per quelli verdi.
:::

Con $d=0{,}2$ mm, $D=2{,}5$ m e $\lambda=650$ nm le frange distano circa $8$ mm. L'esperienza riproduce con strumenti di uso comune la prima misura della lunghezza d'onda della luce.

## Errori frequenti {#errori}

::: errore Pensare che l'interferenza distruttiva distrugga energia
Nelle frange scure l'energia manca perché si trova nelle frange chiare: la media sullo schermo è la somma delle intensità delle due onde. In un interferometro di Michelson la luce che manca a un'uscita esce dall'altra, verso il laser.
:::

::: errore Aspettarsi interferenza fra due sorgenti indipendenti
Due lampadine o due stelle distinte producono onde con fasi che cambiano a caso, e le frange si mediano a zero. Per osservare l'interferenza occorre dividere in due la luce della stessa sorgente, entro la lunghezza di coerenza.
:::

::: errore Dimenticare il salto di fase nella riflessione
Nei film sottili il risultato dipende da quante riflessioni avvengono su un mezzo più rifrangente. Una bolla di sapone e un trattamento antiriflesso hanno condizioni opposte per lo stesso spessore ottico.
:::

::: errore Usare lo spessore geometrico al posto del cammino ottico
Dentro un mezzo di indice $n$ la lunghezza d'onda è $\lambda/n$: la differenza di fase dipende dal prodotto $nL$, e uno strato di vetro conta più di uno strato d'aria dello stesso spessore.
:::

::: errore Credere che un interferometro astronomico raccolga la luce di un telescopio grande quanto la base
L'interferometro raggiunge la risoluzione di un telescopio di diametro pari alla base, ma raccoglie soltanto la luce delle sue antenne o dei suoi specchi. Per questo osserva sorgenti brillanti e ricostruisce le immagini combinando misure fatte con molte basi diverse.
:::

## Sintesi {#sintesi}

::: sintesi In breve
- Due onde coerenti con differenza di cammino $\Delta L$ hanno differenza di fase $2\pi\Delta L/\lambda$; nei mezzi conta il cammino ottico $nL$.
- La coerenza richiede onde ricavate dalla stessa sorgente; la lunghezza di coerenza vale circa $\lambda^2/\Delta\lambda$.
- Nell'esperimento di Young i massimi cadono dove $d\sin\theta=m\lambda$; le frange distano $\lambda D/d$ e l'intensità segue $4I_0\cos^2(\phi/2)$.
- Nei film sottili il cammino aggiuntivo $2nL$ e i salti di fase nelle riflessioni fissano i colori; uno strato di un quarto di lunghezza d'onda di fluoruro di magnesio riduce i riflessi.
- L'interferometro di Michelson trasforma una differenza di cammino in intensità, $I_0\cos^2(\pi\Delta/\lambda)$; l'esperimento di Michelson e Morley non trovò l'etere.
- LIGO e Virgo misurano variazioni di lunghezza di qualche $10^{-18}$ m: dal 2015 hanno registrato centinaia di fusioni di buchi neri e stelle di neutroni.
- Un interferometro con base $B$ ha risoluzione circa $\lambda/B$; l'Event Horizon Telescope ha fotografato le ombre dei buchi neri di M87 e della Via Lattea.
:::

## Glossario {#glossario}

- **Interferenza**: sovrapposizione di onde coerenti che si rinforzano o si annullano secondo la differenza di fase.
- **Coerenza**: relazione di fase costante nel tempo fra due onde.
- **Lunghezza di coerenza**: differenza di cammino massima entro cui due parti dello stesso fascio interferiscono.
- **Cammino ottico**: prodotto dello spessore attraversato per l'indice di rifrazione.
- **Frange**: bande chiare e scure prodotte dall'interferenza.
- **Visibilità**: contrasto delle frange, $(I_{\max}-I_{\min})/(I_{\max}+I_{\min})$.
- **Film sottile**: strato trasparente di spessore paragonabile alla lunghezza d'onda.
- **Trattamento antiriflesso**: strato sottile che annulla per interferenza la luce riflessa da una superficie ottica.
- **Interferometro di Michelson**: strumento che divide un fascio lungo due bracci perpendicolari e lo ricombina.
- **Onda gravitazionale**: perturbazione dello spazio-tempo che si propaga alla velocità della luce.
- **Deformazione**: variazione relativa di lunghezza prodotta da un'onda gravitazionale.
- **Base**: distanza fra due telescopi di un interferometro astronomico.
- **VLBI**: interferometria a base molto lunga, con registrazione dei segnali e orologi atomici.

## Esercizi {#esercizi}

::: esercizio Frange verdi [base]
Un laser verde di $532$ nm illumina due fenditure distanti $0{,}30$ mm; lo schermo è a $2{,}0$ m. Calcolare la distanza fra le frange chiare.
>>> soluzione
Si usa $\Delta y=\lambda D/d$:

$$\Delta y=\frac{532\cdot10^{-9}\cdot2{,}0}{0{,}30\cdot10^{-3}}\ {\rm m}\approx3{,}5\ {\rm mm}.$$
:::

::: esercizio Misurare una lunghezza d'onda [base]
Con fenditure distanti $0{,}15$ mm e schermo a $1{,}0$ m le frange chiare distano $4{,}0$ mm. Calcolare la lunghezza d'onda.
>>> soluzione
Da $\Delta y=\lambda D/d$ si ricava $\lambda=d\,\Delta y/D$:

$$\begin{aligned}\lambda&=\frac{0{,}15\cdot10^{-3}\cdot4{,}0\cdot10^{-3}}{1{,}0}\ {\rm m}\\&=6{,}0\cdot10^{-7}\ {\rm m},\end{aligned}$$

cioè $600$ nm: luce arancione.
:::

::: esercizio Costruttiva o distruttiva [base]
Due onde coerenti di $500$ nm arrivano in un punto con una differenza di cammino di $1{,}5$ μm. Calcolare la differenza di fase e dire che tipo di interferenza si osserva.
>>> soluzione
La differenza di cammino vale tre lunghezze d'onda, quindi $\phi=2\pi\cdot3=6\pi$: le onde arrivano in fase e l'interferenza è costruttiva.
:::

::: esercizio La luce nel vetro [base]
Luce di $600$ nm nel vuoto entra in un vetro con $n=1{,}5$. Calcolare la frequenza e la lunghezza d'onda nel vetro.
>>> soluzione
La frequenza resta la stessa, $f=c/\lambda=5{,}0\cdot10^{14}$ Hz. La lunghezza d'onda nel vetro è $\lambda/n=400$ nm.
:::

::: esercizio Uno strato antiriflesso [base]
Calcolare lo spessore minimo di uno strato di fluoruro di magnesio, $n=1{,}38$, che annulla i riflessi a $550$ nm su una lente di vetro.
>>> soluzione
Lo spessore è un quarto della lunghezza d'onda nel materiale: $L=\lambda/(4n)=550/(4\cdot1{,}38)$ nm, circa $100$ nm.
:::

::: esercizio Contare le frange [base]
Nell'interferometro di Michelson con un laser di $633$ nm uno specchio viene spostato di $0{,}10$ mm. Quante frange passano sul rivelatore?
>>> soluzione
Ogni frangia corrisponde a uno spostamento di $\lambda/2$, quindi $N=2\cdot0{,}10\cdot10^{-3}/(633\cdot10^{-9})\approx316$ frange.
:::

::: esercizio A un quarto di frangia [medio]
Nell'esperimento di Young, quanto vale l'intensità in un punto dello schermo a un quarto della distanza fra due frange chiare dal centro, in unità dell'intensità $I_0$ di una fenditura?
>>> soluzione
A un quarto di frangia la differenza di fase vale $\phi=\pi/2$, quindi $I=4I_0\cos^2(\pi/4)=2I_0$: esattamente la media, come se le onde non interferissero.
:::

::: esercizio Lo spessore di una bolla [medio]
Una bolla di sapone, $n=1{,}33$, riflette in modo intenso la luce di $600$ nm in incidenza perpendicolare. Calcolare i due spessori più piccoli compatibili con questa osservazione.
>>> soluzione
Con un solo salto di fase i massimi richiedono $2nL=(m+\tfrac12)\lambda$, cioè $L=(2m+1)\lambda/(4n)$. Per $m=0$ si ottiene circa $113$ nm, per $m=1$ circa $338$ nm.
:::

::: esercizio La coerenza di un LED [medio]
Un LED rosso emette attorno a $630$ nm con una larghezza spettrale di $20$ nm. Stimare la lunghezza di coerenza e dire se si possono osservare frange con un interferometro i cui bracci differiscono di $1$ mm.
>>> soluzione
La lunghezza di coerenza vale circa $\lambda^2/\Delta\lambda=630^2/20$ nm, circa $20$ μm. Una differenza di bracci di $1$ mm dà una differenza di cammino di $2$ mm, cento volte maggiore: le frange spariscono, e con un LED i bracci vanno uguagliati entro pochi micrometri.
:::

::: esercizio Il braccio di LIGO [medio]
Un'onda gravitazionale con $h=1{,}0\cdot10^{-21}$ cambia di circa $hL$ la differenza di lunghezza fra due bracci di $4{,}0$ km. Calcolare questa variazione e confrontarla con la lunghezza d'onda del laser, $1064$ nm, e con il diametro di un protone, circa $1{,}7\cdot10^{-15}$ m.
>>> soluzione
La variazione vale $hL=4{,}0\cdot10^{-18}$ m, circa $4\cdot10^{-12}$ volte la lunghezza d'onda e circa $2{,}4\cdot10^{-3}$ volte il diametro del protone.
:::

::: esercizio ALMA e VLA [medio]
Calcolare la risoluzione $\lambda/B$ di ALMA a $1{,}3$ mm con la base di $16$ km e del Very Large Array a $21$ cm con la base di $36$ km, in secondi d'arco.
>>> soluzione
Per ALMA $\lambda/B=8{,}1\cdot10^{-8}$ rad, circa $0{,}017''$; per il VLA $5{,}8\cdot10^{-6}$ rad, circa $1{,}2''$. A parità di base, le lunghezze d'onda corte danno immagini più dettagliate.
:::

::: esercizio Luce e gravità in gara [medio]
Le onde gravitazionali di GW170817 e il lampo gamma osservato $1{,}7$ s dopo hanno viaggiato per circa $130$ milioni di anni. Stimare il massimo scarto relativo fra le due velocità compatibile con il ritardo.
>>> soluzione
Il tempo di viaggio vale circa $1{,}3\cdot10^8\cdot3{,}156\cdot10^7\approx4{,}1\cdot10^{15}$ s, e lo scarto relativo è al massimo

$$\frac{1{,}7\ {\rm s}}{4{,}1\cdot10^{15}\ {\rm s}}\approx4\cdot10^{-16}.$$

Il ritardo si spiega con la fisica dell'esplosione, e il limite mostra che le due velocità coincidono a meno di una parte su $10^{15}$.
:::

::: esercizio L'ombra di M87 [avanzato]
Il diametro angolare dell'ombra di un buco nero vale circa $2\sqrt{27}\,GM/(c^2d)$. Calcolarlo per M87, con $M=6{,}5\cdot10^9$ masse solari e $d=16{,}8$ Mpc, e confrontarlo con la risoluzione dell'Event Horizon Telescope a $1{,}3$ mm con una base di $10\,700$ km.
>>> soluzione
Con $GM_\odot/c^2\approx1477$ m si ottiene $GM/c^2\approx9{,}6\cdot10^{12}$ m e un diametro dell'ombra di circa $1{,}0\cdot10^{14}$ m. Diviso per $d=5{,}18\cdot10^{23}$ m dà

$$\theta\approx1{,}9\cdot10^{-10}\ {\rm rad}\approx40\ \mu{\rm as},$$

vicino all'anello misurato, $42$ μas. La risoluzione vale $\lambda/B\approx1{,}2\cdot10^{-10}$ rad, circa $25$ μas: appena sufficiente.
:::

::: esercizio Lo spostamento atteso da Michelson e Morley [avanzato]
Ruotando l'interferometro di $90°$, la teoria dell'etere prevedeva uno spostamento di $N\approx2Lv^2/(\lambda c^2)$ frange. Calcolarlo con un cammino $L=11$ m, $v=30$ km/s, la velocità orbitale della Terra, e $\lambda=500$ nm.
>>> soluzione
Si ottiene

$$N\approx\frac{2\cdot11\cdot(3\cdot10^4)^2}{5\cdot10^{-7}\cdot(3\cdot10^8)^2}\approx0{,}44,$$

uno spostamento facile da vedere. Michelson e Morley ne osservarono meno di un ventesimo.
:::

::: esercizio Dieci superfici [avanzato]
Una superficie di vetro con $n=1{,}5$ non trattata riflette la frazione $((n-1)/(n+1))^2$ della luce; con uno strato ideale di fluoruro di magnesio la frazione diventa $((n-n_f^2)/(n+n_f^2))^2$ con $n_f=1{,}38$. Calcolare la luce trasmessa da un sistema di dieci superfici nei due casi, trascurando l'assorbimento.
>>> soluzione
Senza trattamento ogni superficie riflette il $4{,}0$ per cento e il sistema trasmette $0{,}96^{10}\approx0{,}66$. Con il trattamento la riflessione scende a circa l'$1{,}4$ per cento e la trasmissione sale a $0{,}986^{10}\approx0{,}87$.
:::

::: esercizio Il diametro di Betelgeuse [avanzato]
Le frange di un disco uniforme spariscono quando la base vale $1{,}22\lambda/\theta$. Michelson e Pease misurarono per Betelgeuse $\theta=0{,}047''$ con luce di circa $575$ nm. Calcolare la base corrispondente e il diametro della stella a una distanza di circa $170$ pc, in diametri solari, $1{,}39\cdot10^9$ m.
>>> soluzione
L'angolo vale $0{,}047/206\,265\approx2{,}28\cdot10^{-7}$ rad, e la base è $1{,}22\cdot575\cdot10^{-9}/2{,}28\cdot10^{-7}$ m, circa $3{,}1$ m, entro la trave di $6$ m. A $170$ pc, $5{,}25\cdot10^{18}$ m, il diametro vale circa $1{,}2\cdot10^{12}$ m, circa $860$ diametri solari.
:::

## Fonti {#fonti}

Il testo, le figure, gli esempi e gli esercizi di questo capitolo sono originali. Per la scelta e l'ordine degli argomenti il riferimento principale è D. Halliday, R. Resnick, J. Walker, *Fundamentals of Physics*, 12ª edizione estesa, Wiley, 2022, moduli 35.1 (la luce come onda), 35.2 (esperimento di Young), 35.3 (intensità delle frange), 35.4 (film sottili) e 35.5 (interferometro di Michelson); l'orientamento astrofisico e i dati provengono dalle fonti primarie seguenti.

1. T. Young, *Philosophical Transactions of the Royal Society* 94, 1 (1804): gli esperimenti di interferenza; A. A. Michelson, E. W. Morley, *American Journal of Science* 34, 333 (1887): il moto relativo della Terra e dell'etere.
2. A. A. Michelson, F. G. Pease, *Astrophysical Journal* 53, 249 (1921): il diametro di Betelgeuse; M. Joyce e collaboratori, *Astrophysical Journal* 902, 63 (2020): la distanza di Betelgeuse.
3. B. P. Abbott e collaboratori, *Physical Review Letters* 116, 061102 (2016): GW150914; B. P. Abbott e collaboratori, *Astrophysical Journal Letters* 848, L13 (2017): GW170817 e il lampo gamma.
4. LIGO, Virgo e KAGRA Collaboration, *Astrophysical Journal Letters* 1004, L22 (2026): il catalogo GWTC-4.0.
5. ESA, comunicato del 25 gennaio 2024: l'approvazione della missione LISA.
6. Event Horizon Telescope Collaboration, *Astrophysical Journal Letters* 875, L1 (2019): l'ombra del buco nero di M87; *Astrophysical Journal Letters* 930, L12 (2022): l'immagine di Sagittarius A*.
