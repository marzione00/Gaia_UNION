# Mappa da scoprire

Dalla versione 1.28.0 la mappa della galassia si scopre con lo studio. Le aree tematiche restano tutte visibili e raggiungibili, dalla mappa, dalla ricerca e dai percorsi; cambiano il loro aspetto e le linee che le uniscono.

## Segnali e aree visitate

Un'area mai visitata compare come un segnale: l'esagono ha soltanto il contorno, più tenue. Diventa piena quando lo studente entra nel suo sistema, in un'orbita o su una superficie, oppure quando inizia una delle sue unità. La visita è registrata nel salvataggio del browser (`atlas.visited`); non vale come completamento e non assegna crediti.

## Passaggi

Due aree sono unite da un passaggio quando almeno un'unità della prima rimanda a un'unità della seconda. I rimandi vengono da due fonti:

- i collegamenti fra capitoli del libro, cioè i link `unit:` dei 100 capitoli scritti, ciascuno con la sezione che lo contiene;
- i collegamenti e i prerequisiti dei 125 percorsi guidati.

Il file `content/atlas/passages.json`, generato da `tools/build_passages.mjs`, contiene 147 passaggi fra le 30 aree, con 624 rimandi: 426 dai capitoli e 198 dai percorsi. I passaggi interni a un braccio sono corsie (78); quelli fra due bracci, cioè fra due discipline, sono porte di salto (69). Ogni area ha da 3 a 16 passaggi; le più collegate sono «Funzioni e variazione» e «La vita e la cellula», con 16 ciascuna, ed «Elettromagnetismo e quanti», con 15. La rete collega tutte le aree.

## Come si aprono

Un passaggio si apre quando si verifica uno dei suoi rimandi:

- la sezione del capitolo che contiene il link è stata letta fino in fondo (il lettore registra `libro:unità#sezione` quando la fine della sezione compare sullo schermo);
- il percorso guidato che elenca il collegamento è arrivato alla stazione dei collegamenti (fase 5) o è completato.

Le regole stanno in `src/navigation/passages.js`. Un passaggio aperto lascia invariato l'accesso ai contenuti e segna sulla mappa una strada che lo studente ha già percorso leggendo.

## Sulla mappa e nel diario

- I passaggi aperti sono archi fra le aree: più bassi e azzurri le corsie, più alti e dorati le porte di salto. Quelli dell'area selezionata sono più spessi e luminosi. Con un percorso di studio attivo la mappa mostra il percorso al loro posto.
- In alto a sinistra la mappa riporta le aree visitate e i passaggi aperti; la scheda dell'area indica quanti dei suoi passaggi sono aperti.
- Nel diario, alla scheda «Esplorazione», compaiono i conteggi e l'elenco dei passaggi aperti, con il capitolo o il percorso che li ha aperti.
- Il testo per i lettori di schermo della mappa elenca i passaggi aperti dell'area selezionata.

## Verifiche

`tests/passages.test.mjs` controlla che il file coincida con quello ricostruito dai capitoli e dai percorsi, che ogni rimando unisca le aree giuste e indichi una sezione esistente, che la rete colleghi tutte le aree e che i passaggi si aprano soltanto con le regole descritte. I flussi applicativi (`tools/qa_application_curriculum.mjs`) leggono una sezione e controllano che il suo passaggio si apra sulla mappa.
