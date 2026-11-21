# Catalogo delle stazioni e delle navi

Questo file elenca i 997 modelli della galassia: 564 stazioni e 433 navi di 275 tipi e classi, di cui 218 della flotta di difesa. È generato dal codice con `node scripts/craft-catalogue.mjs` (`src/craft/registry.js`), e `tests/catalogo.test.mjs` controlla che corrisponda. Nel sito gli stessi modelli si guardano nel catalogo 3D, che si apre dalla schermata di ogni sistema; la costruzione dei modelli, gli stili e l'economia sono descritti in `docs/STAZIONI_NAVI.md`.

## Provenienza

| Gruppo | Modelli |
|---|---:|
| Modelli classici | 300 |
| Stazioni della grammatica dei tipi | 300 |
| Navi civili delle 120 classi | 179 |
| Stazioni di difesa | 84 |
| Navi della flotta di difesa | 134 |

## Stili

| Stile | Modelli |
|---|---:|
| Stile della matematica | 97 |
| Stile della fisica | 156 |
| Stile della chimica | 109 |
| Stile della biologia | 168 |
| Stile civile | 249 |
| Stile della flotta | 218 |

## Sistemi

Per ogni sistema: stazioni, navi e difesa, nell'ordine del catalogo 3D. La colonna «Lavoro» riporta il processo di una stazione, il carico e il numero di merci di una nave civile e la forza contro i droni dello Sciame di una nave di difesa.

### 1. Numeri e ragionamento

Braccio della Matematica: 29 modelli, 17 stazioni e 12 navi.

| Modello | Tipo | Genere | Stile | Lavoro |
|---|---|---|---|---|
| Porto Poincaré | Porto | Stazione | matematica | imbarco |
| Porta Ruchbah | Porta | Stazione | civile | porta |
| Stazione poliedrica Kovalevskaja | Stazione poliedrica | Stazione | matematica | calcolo |
| Deposito criogenico Apollonio | Deposito criogenico | Stazione | matematica | deposito |
| Cantiere Germain | Cantiere | Stazione | matematica | montaggio di navi |
| Radiotelescopio Kolmogorov | Radiotelescopio | Stazione | matematica | ascolto radio |
| Osservatorio a torre Ipazia | Osservatorio a torre | Stazione | matematica | osservazione del cielo |
| Laboratorio poliedrico Hilbert | Laboratorio poliedrico | Stazione | matematica | costruzione di strumenti |
| Ripetitore a piattaforma Mirzam | Ripetitore a piattaforma | Stazione | civile | ritrasmissione |
| Centrale a croce Pitagora | Centrale a croce | Stazione | matematica | fusione dell'idrogeno |
| Habitat a grappolo Saiph | Habitat a grappolo | Stazione | civile | vita a bordo |
| Magazzino a traliccio Scirocco | Magazzino a traliccio | Stazione | civile | smistamento |
| Arsenale su asteroide Adhara | Arsenale su asteroide | Stazione | civile | costruzione di moduli |
| Fonderia a spina Cardano | Fonderia a spina | Stazione | matematica | riduzione del minerale |
| Impianto chimico a ruota Brahmagupta | Impianto chimico a ruota | Stazione | matematica | elettrolisi dell'acqua |
| Base della flotta Titov | Base della flotta | Stazione di difesa | flotta | rifornimento della flotta |
| Stazione di sorveglianza Garneau | Stazione di sorveglianza | Stazione di difesa | flotta | sorveglianza dei confini |
| Navetta Hilbert | Navetta | Nave | matematica | carico 12, 6 merci |
| Corriere Möbius | Corriere | Nave | matematica | carico 30, 7 merci |
| Nave cargo Wezen | Nave cargo | Nave | civile | carico 70, 19 merci |
| Cisterna Dubhe | Cisterna | Nave | civile | carico 80, 4 merci |
| Corriere a sfere Lovelace | Corriere a sfere | Nave | matematica | carico 36, 7 merci |
| Nave scientifica a cuneo Maestrale | Nave scientifica a cuneo | Nave | civile | carico 36, 5 merci |
| Navetta a tre scafi Agnesi | Navetta a tre scafi | Nave | matematica | carico 13, 6 merci |
| Cargo ad anello Sirio | Cargo ad anello | Nave | civile | carico 77, 19 merci |
| Nave passeggeri affusolata Laplace | Nave passeggeri affusolata | Nave | matematica | carico 32, 5 merci |
| Caccia Kuipers | Caccia | Nave di difesa | flotta | forza 6 |
| Pattugliatore Chrétien | Pattugliatore | Nave di difesa | flotta | forza 4 |
| Corvetta Verrazzano | Corvetta | Nave di difesa | flotta | forza 6 |

### 2. Algebra ed equazioni

Braccio della Matematica: 26 modelli, 15 stazioni e 11 navi.

| Modello | Tipo | Genere | Stile | Lavoro |
|---|---|---|---|---|
| Porto Lovelace | Porto | Stazione | matematica | imbarco |
| Porta Caph | Porta | Stazione | civile | porta |
| Stazione poliedrica Cauchy | Stazione poliedrica | Stazione | matematica | calcolo |
| Miniera Cayley | Miniera | Stazione | matematica | estrazione |
| Cantiere Cantor | Cantiere | Stazione | matematica | montaggio di navi |
| Centrale Gödel | Centrale | Stazione | matematica | fusione dell'idrogeno |
| Osservatorio a traliccio Eulero | Osservatorio a traliccio | Stazione | matematica | osservazione del cielo |
| Laboratorio su asteroide Cauchy | Laboratorio su asteroide | Stazione | matematica | esperimenti |
| Ripetitore poliedrico Tejat | Ripetitore poliedrico | Stazione | civile | ritrasmissione |
| Centrale a croce Vega | Centrale a croce | Stazione | civile | fusione dell'idrogeno |
| Habitat a torre Austro | Habitat a torre | Stazione | civile | vita a bordo |
| Magazzino a tamburo Hadar | Magazzino a tamburo | Stazione | civile | smistamento |
| Arsenale a grappolo Canopo | Arsenale a grappolo | Stazione | civile | montaggio di parti |
| Base della flotta Heyerdahl | Base della flotta | Stazione di difesa | flotta | rifornimento della flotta |
| Stazione di sorveglianza Lindbergh | Stazione di sorveglianza | Stazione di difesa | flotta | sorveglianza dei confini |
| Rimorchiatore minerario Klein | Rimorchiatore minerario | Nave | matematica | carico 50, 6 merci |
| Nave scientifica Fibonacci | Nave scientifica | Nave | matematica | carico 40, 5 merci |
| Nave da esplorazione Rigel | Nave da esplorazione | Nave | civile | carico 30, 2 merci |
| Nave passeggeri Alhena | Nave passeggeri | Nave | civile | carico 40, 5 merci |
| Corriere ad ala Boole | Corriere ad ala | Nave | matematica | carico 26, 7 merci |
| Nave scientifica a doppio scafo Gacrux | Nave scientifica a doppio scafo | Nave | civile | carico 48, 5 merci |
| Navetta a sfere Volterra | Navetta a sfere | Nave | matematica | carico 14, 6 merci |
| Cargo a capsula Bellatrix | Cargo a capsula | Nave | civile | carico 63, 19 merci |
| Intercettore Earhart | Intercettore | Nave di difesa | flotta | forza 5 |
| Pattugliatore Glenn | Pattugliatore | Nave di difesa | flotta | forza 4 |
| Corvetta Shepard | Corvetta | Nave di difesa | flotta | forza 6 |

### 3. Funzioni e variazione

Braccio della Matematica: 38 modelli, 22 stazioni e 16 navi.

| Modello | Tipo | Genere | Stile | Lavoro |
|---|---|---|---|---|
| Porto Pascal | Porto | Stazione | matematica | imbarco |
| Porta Ankaa | Porta | Stazione | civile | porta |
| Stazione poliedrica Leibniz | Stazione poliedrica | Stazione | matematica | calcolo |
| Telescopio Euclide | Telescopio | Stazione | matematica | osservazione del cielo |
| Laboratorio dei campi Eulero | Laboratorio dei campi | Stazione | matematica | esperimenti |
| Deposito criogenico Bernoulli | Deposito criogenico | Stazione | matematica | deposito |
| Osservatorio a croce Tartaglia | Osservatorio a croce | Stazione | matematica | osservazione del cielo |
| Laboratorio a piattaforma Grothendieck | Laboratorio a piattaforma | Stazione | matematica | costruzione di strumenti |
| Ripetitore a traliccio Procione | Ripetitore a traliccio | Stazione | civile | ritrasmissione |
| Centrale a tamburo Dedekind | Centrale a tamburo | Stazione | matematica | fusione dell'idrogeno |
| Habitat a torre Boole | Habitat a torre | Stazione | matematica | vita a bordo |
| Magazzino a spina Deneb | Magazzino a spina | Stazione | civile | smistamento |
| Arsenale a disco Enif | Arsenale a disco | Stazione | civile | costruzione di moduli |
| Fonderia sferica Cantor | Fonderia sferica | Stazione | matematica | fusione di leghe |
| Impianto chimico su asteroide Gödel | Impianto chimico su asteroide | Stazione | matematica | elettrolisi dell'acqua |
| Fattoria poliedrica Lovelace | Fattoria poliedrica | Stazione | matematica | fotosintesi |
| Osservatorio a grappolo Bernoulli | Osservatorio a grappolo | Stazione | matematica | osservazione del cielo |
| Laboratorio a ruota Möbius | Laboratorio a ruota | Stazione | matematica | sintesi di farmaci |
| Ripetitore a croce Avior | Ripetitore a croce | Stazione | civile | ritrasmissione |
| Centrale a piattaforma Jacobi | Centrale a piattaforma | Stazione | matematica | pannelli solari |
| Base della flotta Nobile | Base della flotta | Stazione di difesa | flotta | rifornimento della flotta |
| Stazione di sorveglianza Hudson | Stazione di sorveglianza | Stazione di difesa | flotta | sorveglianza dei confini |
| Posaboe Lagrange | Posaboe | Nave | matematica | carico 20, 3 merci |
| Nave di soccorso Turing | Nave di soccorso | Nave | matematica | carico 20, 6 merci |
| Sonda Rasalhague | Sonda | Nave | civile | carico 15, 1 merci |
| Nave gru Nunki | Nave gru | Nave | civile | carico 30, 8 merci |
| Corriere affusolato Fourier | Corriere affusolato | Nave | matematica | carico 24, 7 merci |
| Nave scientifica ad ala Megrez | Nave scientifica ad ala | Nave | civile | carico 34, 5 merci |
| Navetta modulare Riemann | Navetta modulare | Nave | matematica | carico 16, 6 merci |
| Cargo a doppio scafo Atria | Cargo a doppio scafo | Nave | civile | carico 84, 19 merci |
| Nave passeggeri a disco Ramanujan | Nave passeggeri a disco | Nave | matematica | carico 40, 5 merci |
| Nave di soccorso a tre scafi Merak | Nave di soccorso a tre scafi | Nave | civile | carico 22, 6 merci |
| Nave officina a cuneo Tartaglia | Nave officina a cuneo | Nave | matematica | carico 27, 8 merci |
| Cisterna a sfere Arturo | Cisterna a sfere | Nave | civile | carico 96, 4 merci |
| Caccia Colombo | Caccia | Nave di difesa | flotta | forza 6 |
| Pattugliatore Wang Yaping | Pattugliatore | Nave di difesa | flotta | forza 4 |
| Corvetta Guidoni | Corvetta | Nave di difesa | flotta | forza 6 |
| Fregata Nansen | Fregata | Nave di difesa | flotta | forza 8 |

### 4. Geometria e trasformazioni

Braccio della Matematica: 37 modelli, 21 stazioni e 16 navi.

| Modello | Tipo | Genere | Stile | Lavoro |
|---|---|---|---|---|
| Porto Volterra | Porto | Stazione | matematica | imbarco |
| Porta Aliseo | Porta | Stazione | civile | porta |
| Stazione poliedrica Cardano | Stazione poliedrica | Stazione | matematica | calcolo |
| Cantiere Viète | Cantiere | Stazione | matematica | montaggio di navi |
| Radiotelescopio Galois | Radiotelescopio | Stazione | matematica | ascolto radio |
| Serra Cavalieri | Serra | Stazione | matematica | fotosintesi |
| Osservatorio a spina Laplace | Osservatorio a spina | Stazione | matematica | osservazione del cielo |
| Laboratorio a croce Cayley | Laboratorio a croce | Stazione | matematica | esperimenti |
| Ripetitore a traliccio Agnesi | Ripetitore a traliccio | Stazione | matematica | ritrasmissione |
| Centrale a torre Viète | Centrale a torre | Stazione | matematica | pannelli solari |
| Habitat a piattaforma Propus | Habitat a piattaforma | Stazione | civile | vita a bordo |
| Magazzino su asteroide Garbino | Magazzino su asteroide | Stazione | civile | smistamento |
| Arsenale sferico Castore | Arsenale sferico | Stazione | civile | costruzione di moduli |
| Fonderia poliedrica Ramanujan | Fonderia poliedrica | Stazione | matematica | fusione dei silicati |
| Impianto chimico a grappolo Abel | Impianto chimico a grappolo | Stazione | matematica | polimerizzazione |
| Fattoria a disco Lagrange | Fattoria a disco | Stazione | matematica | fotosintesi |
| Osservatorio a tamburo Noether | Osservatorio a tamburo | Stazione | matematica | osservazione del cielo |
| Laboratorio a ruota Sirio | Laboratorio a ruota | Stazione | civile | sintesi di farmaci |
| Base della flotta Savitskaja | Base della flotta | Stazione di difesa | flotta | rifornimento della flotta |
| Stazione di sorveglianza Cristoforetti | Stazione di sorveglianza | Stazione di difesa | flotta | sorveglianza dei confini |
| Piattaforma di difesa Malaspina | Piattaforma di difesa | Stazione di difesa | flotta | difesa ravvicinata |
| Navetta Diofanto | Navetta | Nave | matematica | carico 12, 6 merci |
| Corriere Banach | Corriere | Nave | matematica | carico 30, 7 merci |
| Nave cargo Menkar | Nave cargo | Nave | civile | carico 70, 19 merci |
| Cisterna Vega | Cisterna | Nave | civile | carico 80, 4 merci |
| Corriere ad anello Mirzakhani | Corriere ad anello | Nave | matematica | carico 33, 7 merci |
| Nave scientifica a capsula Sadr | Nave scientifica a capsula | Nave | civile | carico 36, 5 merci |
| Navetta a disco Cayley | Navetta a disco | Nave | matematica | carico 12, 6 merci |
| Cargo a tre scafi Ponente | Cargo a tre scafi | Nave | civile | carico 77, 19 merci |
| Nave passeggeri a sfere Viète | Nave passeggeri a sfere | Nave | matematica | carico 48, 5 merci |
| Nave di soccorso ad ala Algol | Nave di soccorso ad ala | Nave | civile | carico 17, 6 merci |
| Nave officina a telaio Hardy | Nave officina a telaio | Nave | matematica | carico 39, 8 merci |
| Intercettore Malerba | Intercettore | Nave di difesa | flotta | forza 5 |
| Pattugliatore Ibn Battuta | Pattugliatore | Nave di difesa | flotta | forza 4 |
| Corvetta Yang Liwei | Corvetta | Nave di difesa | flotta | forza 6 |
| Cacciatorpediniere Speke | Cacciatorpediniere | Nave di difesa | flotta | forza 10 |
| Corazzata La Pérouse | Corazzata | Nave di difesa | flotta | forza 16 |

### 5. Probabilità e dati

Braccio della Matematica: 36 modelli, 20 stazioni e 16 navi.

| Modello | Tipo | Genere | Stile | Lavoro |
|---|---|---|---|---|
| Porto Conway | Porto | Stazione | matematica | imbarco |
| Porta Ponente | Porta | Stazione | civile | porta |
| Stazione poliedrica Mirzakhani | Stazione poliedrica | Stazione | matematica | calcolo |
| Miniera Napier | Miniera | Stazione | matematica | estrazione |
| Deposito criogenico Weierstrass | Deposito criogenico | Stazione | matematica | deposito |
| Telescopio Ramanujan | Telescopio | Stazione | matematica | osservazione del cielo |
| Osservatorio a croce Atria | Osservatorio a croce | Stazione | civile | osservazione del cielo |
| Laboratorio a traliccio Klein | Laboratorio a traliccio | Stazione | matematica | sintesi di farmaci |
| Ripetitore a grappolo Borea | Ripetitore a grappolo | Stazione | civile | ritrasmissione |
| Centrale a tamburo Megrez | Centrale a tamburo | Stazione | civile | fusione dell'idrogeno |
| Habitat a ruota Aldebaran | Habitat a ruota | Stazione | civile | vita a bordo |
| Magazzino a spina Talete | Magazzino a spina | Stazione | matematica | smistamento |
| Arsenale a disco Kovalevskaja | Arsenale a disco | Stazione | matematica | costruzione di moduli |
| Fonderia a torre Germain | Fonderia a torre | Stazione | matematica | crescita del silicio |
| Impianto chimico su asteroide Polluce | Impianto chimico su asteroide | Stazione | civile | elettrolisi dell'acqua |
| Fattoria a piattaforma Fibonacci | Fattoria a piattaforma | Stazione | matematica | fotobioreattore |
| Base della flotta Komarov | Base della flotta | Stazione di difesa | flotta | rifornimento della flotta |
| Stazione di sorveglianza Norgay | Stazione di sorveglianza | Stazione di difesa | flotta | sorveglianza dei confini |
| Piattaforma di difesa Jemison | Piattaforma di difesa | Stazione di difesa | flotta | difesa ravvicinata |
| Fortezza orbitale Peake | Fortezza orbitale | Stazione di difesa | flotta | difesa della porta |
| Rimorchiatore minerario Riemann | Rimorchiatore minerario | Nave | matematica | carico 50, 6 merci |
| Nave scientifica Gauss | Nave scientifica | Nave | matematica | carico 40, 5 merci |
| Nave da esplorazione Hadar | Nave da esplorazione | Nave | civile | carico 30, 2 merci |
| Nave passeggeri Kochab | Nave passeggeri | Nave | civile | carico 40, 5 merci |
| Corriere a telaio Jacobi | Corriere a telaio | Nave | matematica | carico 39, 7 merci |
| Nave scientifica a fuso Rasalhague | Nave scientifica a fuso | Nave | civile | carico 40, 5 merci |
| Navetta ad anello Gödel | Navetta ad anello | Nave | matematica | carico 13, 6 merci |
| Cargo ad ala Regolo | Cargo ad ala | Nave | civile | carico 60, 19 merci |
| Nave passeggeri modulare Hilbert | Nave passeggeri modulare | Nave | matematica | carico 54, 5 merci |
| Nave di soccorso affusolata Hadar | Nave di soccorso affusolata | Nave | civile | carico 16, 6 merci |
| Caccia Caboto | Caccia | Nave di difesa | flotta | forza 6 |
| Pattugliatore Vespucci | Pattugliatore | Nave di difesa | flotta | forza 4 |
| Corvetta Vittori | Corvetta | Nave di difesa | flotta | forza 6 |
| Fregata Collins | Fregata | Nave di difesa | flotta | forza 8 |
| Incrociatore Magellano | Incrociatore | Nave di difesa | flotta | forza 12 |
| Portaerei Polo | Portaerei | Nave di difesa | flotta | forza 12 |

### 6. Matematica per le scienze

Braccio della Matematica: 36 modelli, 19 stazioni e 17 navi.

| Modello | Tipo | Genere | Stile | Lavoro |
|---|---|---|---|---|
| Porto Jacobi | Porto | Stazione | matematica | imbarco |
| Porta Propus | Porta | Stazione | civile | porta |
| Stazione poliedrica Agnesi | Stazione poliedrica | Stazione | matematica | calcolo |
| Centrale Dedekind | Centrale | Stazione | matematica | fusione dell'idrogeno |
| Serra Brahmagupta | Serra | Stazione | matematica | fotosintesi |
| Laboratorio dei campi Cartesio | Laboratorio dei campi | Stazione | matematica | esperimenti |
| Osservatorio su asteroide Euclide | Osservatorio su asteroide | Stazione | matematica | osservazione del cielo |
| Laboratorio a disco Turing | Laboratorio a disco | Stazione | matematica | esperimenti |
| Ripetitore a ruota Antares | Ripetitore a ruota | Stazione | civile | ritrasmissione |
| Centrale poliedrica Archimede | Centrale poliedrica | Stazione | matematica | fusione dell'idrogeno |
| Habitat a piattaforma Weierstrass | Habitat a piattaforma | Stazione | matematica | vita a bordo |
| Magazzino a grappolo Wezen | Magazzino a grappolo | Stazione | civile | smistamento |
| Arsenale sferico Poincaré | Arsenale sferico | Stazione | matematica | costruzione di moduli |
| Fonderia a tamburo Cartesio | Fonderia a tamburo | Stazione | matematica | fusione dei silicati |
| Base della flotta Lovell | Base della flotta | Stazione di difesa | flotta | rifornimento della flotta |
| Stazione di sorveglianza Franklin | Stazione di sorveglianza | Stazione di difesa | flotta | sorveglianza dei confini |
| Piattaforma di difesa Pigafetta | Piattaforma di difesa | Stazione di difesa | flotta | difesa ravvicinata |
| Fortezza orbitale Ross | Fortezza orbitale | Stazione di difesa | flotta | difesa della porta |
| Generatore di scudo Kingsley | Generatore di scudo | Stazione di difesa | flotta | scudo della porta |
| Posaboe Noether | Posaboe | Nave | matematica | carico 20, 3 merci |
| Nave di soccorso Pitagora | Nave di soccorso | Nave | matematica | carico 20, 6 merci |
| Sonda Wasat | Sonda | Nave | civile | carico 15, 1 merci |
| Nave gru Saiph | Nave gru | Nave | civile | carico 30, 8 merci |
| Corriere a capsula Cantor | Corriere a capsula | Nave | matematica | carico 27, 7 merci |
| Nave scientifica a telaio Castore | Nave scientifica a telaio | Nave | civile | carico 52, 5 merci |
| Navetta a cuneo Brahmagupta | Navetta a cuneo | Nave | matematica | carico 11, 6 merci |
| Cargo affusolato Betelgeuse | Cargo affusolato | Nave | civile | carico 56, 19 merci |
| Nave passeggeri ad anello Apollonio | Nave passeggeri ad anello | Nave | matematica | carico 44, 5 merci |
| Caccia Cousteau | Caccia | Nave di difesa | flotta | forza 6 |
| Intercettore Mukai | Intercettore | Nave di difesa | flotta | forza 5 |
| Pattugliatore Peary | Pattugliatore | Nave di difesa | flotta | forza 4 |
| Corvetta Henson | Corvetta | Nave di difesa | flotta | forza 6 |
| Fregata Tereshkova | Fregata | Nave di difesa | flotta | forza 8 |
| Cacciatorpediniere Burton | Cacciatorpediniere | Nave di difesa | flotta | forza 10 |
| Incrociatore pesante Akiyama | Incrociatore pesante | Nave di difesa | flotta | forza 14 |
| Superportaerei Messner | Superportaerei | Nave di difesa | flotta | forza 18 |

### 7. Misura e moto

Braccio della Fisica: 25 modelli, 14 stazioni e 11 navi.

| Modello | Tipo | Genere | Stile | Lavoro |
|---|---|---|---|---|
| Porto Hooke | Porto | Stazione | fisica | imbarco |
| Porta Gacrux | Porta | Stazione | civile | porta |
| Cantiere Zwicky | Cantiere | Stazione | fisica | montaggio di navi |
| Telescopio Feynman | Telescopio | Stazione | fisica | osservazione del cielo |
| Radiotelescopio Oort | Radiotelescopio | Stazione | fisica | ascolto radio |
| Centrale Joule | Centrale | Stazione | fisica | fusione dell'idrogeno |
| Centrale poliedrica Fraunhofer | Centrale poliedrica | Stazione | fisica | fusione dell'idrogeno |
| Laboratorio a ruota Alfvén | Laboratorio a ruota | Stazione | fisica | sintesi di farmaci |
| Osservatorio a croce Carnot | Osservatorio a croce | Stazione | fisica | osservazione del cielo |
| Ripetitore a tamburo Levante | Ripetitore a tamburo | Stazione | civile | ritrasmissione |
| Fonderia a disco Mach | Fonderia a disco | Stazione | fisica | fusione dei silicati |
| Habitat a traliccio Albireo | Habitat a traliccio | Stazione | civile | vita a bordo |
| Base della flotta Leonov | Base della flotta | Stazione di difesa | flotta | rifornimento della flotta |
| Stazione di sorveglianza Piccard | Stazione di sorveglianza | Stazione di difesa | flotta | sorveglianza dei confini |
| Navetta Raman | Navetta | Nave | fisica | carico 12, 6 merci |
| Corriere Maxwell | Corriere | Nave | fisica | carico 30, 7 merci |
| Nave cargo Adhara | Nave cargo | Nave | civile | carico 70, 19 merci |
| Cisterna Borea | Cisterna | Nave | civile | carico 80, 4 merci |
| Nave scientifica affusolata Born | Nave scientifica affusolata | Nave | fisica | carico 32, 5 merci |
| Corriere a cuneo Nunki | Corriere a cuneo | Nave | civile | carico 27, 7 merci |
| Cargo a fuso Hoyle | Cargo a fuso | Nave | fisica | carico 70, 19 merci |
| Nave officina modulare Markab | Nave officina modulare | Nave | civile | carico 41, 8 merci |
| Caccia Hillary | Caccia | Nave di difesa | flotta | forza 6 |
| Pattugliatore Bird | Pattugliatore | Nave di difesa | flotta | forza 4 |
| Corvetta Scott | Corvetta | Nave di difesa | flotta | forza 6 |

### 8. Forze ed energia

Braccio della Fisica: 36 modelli, 21 stazioni e 15 navi.

| Modello | Tipo | Genere | Stile | Lavoro |
|---|---|---|---|---|
| Porto Huygens | Porto | Stazione | fisica | imbarco |
| Porta Merak | Porta | Stazione | civile | porta |
| Miniera Ampère | Miniera | Stazione | fisica | estrazione |
| Cantiere Lenz | Cantiere | Stazione | fisica | montaggio di navi |
| Centrale Newton | Centrale | Stazione | fisica | fusione dell'idrogeno |
| Deposito criogenico Clausius | Deposito criogenico | Stazione | fisica | deposito |
| Centrale a disco Volta | Centrale a disco | Stazione | fisica | fusione dell'idrogeno |
| Laboratorio sferico Rutherford | Laboratorio sferico | Stazione | fisica | esperimenti |
| Osservatorio a traliccio Burnell | Osservatorio a traliccio | Stazione | fisica | osservazione del cielo |
| Ripetitore a piattaforma Wu | Ripetitore a piattaforma | Stazione | fisica | ritrasmissione |
| Fonderia a croce Hoyle | Fonderia a croce | Stazione | fisica | riduzione del minerale |
| Habitat a spina Betelgeuse | Habitat a spina | Stazione | civile | vita a bordo |
| Magazzino a tamburo Einstein | Magazzino a tamburo | Stazione | fisica | smistamento |
| Arsenale a ruota Ankaa | Arsenale a ruota | Stazione | civile | assemblaggio di circuiti |
| Impianto chimico su asteroide Ørsted | Impianto chimico su asteroide | Stazione | fisica | elettrolisi dell'acqua |
| Fattoria poliedrica Ampère | Fattoria poliedrica | Stazione | fisica | fotosintesi |
| Centrale a torre Lorentz | Centrale a torre | Stazione | fisica | pannelli solari |
| Laboratorio a grappolo Zwicky | Laboratorio a grappolo | Stazione | fisica | costruzione di strumenti |
| Osservatorio a disco Fresnel | Osservatorio a disco | Stazione | fisica | osservazione del cielo |
| Base della flotta Baffin | Base della flotta | Stazione di difesa | flotta | rifornimento della flotta |
| Stazione di sorveglianza Gerst | Stazione di sorveglianza | Stazione di difesa | flotta | sorveglianza dei confini |
| Rimorchiatore minerario Doppler | Rimorchiatore minerario | Nave | fisica | carico 50, 6 merci |
| Nave scientifica Fresnel | Nave scientifica | Nave | fisica | carico 40, 5 merci |
| Nave da esplorazione Deneb | Nave da esplorazione | Nave | civile | carico 30, 2 merci |
| Nave passeggeri Avior | Nave passeggeri | Nave | civile | carico 40, 5 merci |
| Nave scientifica a disco Hooke | Nave scientifica a disco | Nave | fisica | carico 40, 5 merci |
| Corriere a tre scafi Albireo | Corriere a tre scafi | Nave | civile | carico 33, 7 merci |
| Cargo a cuneo Galilei | Cargo a cuneo | Nave | fisica | carico 63, 19 merci |
| Nave officina ad ala Ankaa | Nave officina ad ala | Nave | civile | carico 26, 8 merci |
| Navetta a fuso Einstein | Navetta a fuso | Nave | fisica | carico 12, 6 merci |
| Nave di soccorso a sfere Scheat | Nave di soccorso a sfere | Nave | civile | carico 24, 6 merci |
| Cisterna affusolata Majorana | Cisterna affusolata | Nave | fisica | carico 64, 4 merci |
| Nave passeggeri a capsula Alnilam | Nave passeggeri a capsula | Nave | civile | carico 36, 5 merci |
| Intercettore Zheng He | Intercettore | Nave di difesa | flotta | forza 5 |
| Pattugliatore Amundsen | Pattugliatore | Nave di difesa | flotta | forza 4 |
| Corvetta Bonatti | Corvetta | Nave di difesa | flotta | forza 6 |

### 9. Rotazioni e gravità

Braccio della Fisica: 33 modelli, 19 stazioni e 14 navi.

| Modello | Tipo | Genere | Stile | Lavoro |
|---|---|---|---|---|
| Porto Penzias | Porto | Stazione | fisica | imbarco |
| Porta Mira | Porta | Stazione | civile | porta |
| Telescopio Rayleigh | Telescopio | Stazione | fisica | osservazione del cielo |
| Radiotelescopio Bohr | Radiotelescopio | Stazione | fisica | ascolto radio |
| Laboratorio dei campi Planck | Laboratorio dei campi | Stazione | fisica | esperimenti |
| Stazione poliedrica Einstein | Stazione poliedrica | Stazione | fisica | calcolo |
| Centrale a torre Suhail | Centrale a torre | Stazione | civile | pannelli solari |
| Laboratorio a disco Joule | Laboratorio a disco | Stazione | fisica | esperimenti |
| Osservatorio a piattaforma Coulomb | Osservatorio a piattaforma | Stazione | fisica | osservazione del cielo |
| Ripetitore a spina Arturo | Ripetitore a spina | Stazione | civile | ritrasmissione |
| Fonderia a croce Nunki | Fonderia a croce | Stazione | civile | riduzione del minerale |
| Habitat a ruota Feynman | Habitat a ruota | Stazione | fisica | vita a bordo |
| Magazzino sferico Errai | Magazzino sferico | Stazione | civile | smistamento |
| Arsenale a tamburo Alkaid | Arsenale a tamburo | Stazione | civile | assemblaggio di circuiti |
| Impianto chimico a traliccio Meitner | Impianto chimico a traliccio | Stazione | fisica | sintesi del propellente |
| Fattoria poliedrica Dubhe | Fattoria poliedrica | Stazione | civile | fotosintesi |
| Centrale a grappolo Keplero | Centrale a grappolo | Stazione | fisica | pannelli solari |
| Base della flotta Armstrong | Base della flotta | Stazione di difesa | flotta | rifornimento della flotta |
| Stazione di sorveglianza Shackleton | Stazione di sorveglianza | Stazione di difesa | flotta | sorveglianza dei confini |
| Posaboe Keplero | Posaboe | Nave | fisica | carico 20, 3 merci |
| Nave di soccorso Torricelli | Nave di soccorso | Nave | fisica | carico 20, 6 merci |
| Sonda Zubenelgenubi | Sonda | Nave | civile | carico 15, 1 merci |
| Nave gru Favonio | Nave gru | Nave | civile | carico 30, 8 merci |
| Nave scientifica ad anello Wu | Nave scientifica ad anello | Nave | fisica | carico 44, 5 merci |
| Corriere modulare Procione | Corriere modulare | Nave | civile | carico 41, 7 merci |
| Cargo a telaio Doppler | Cargo a telaio | Nave | fisica | carico 91, 19 merci |
| Nave officina a capsula Polluce | Nave officina a capsula | Nave | civile | carico 27, 8 merci |
| Navetta ad ala Millikan | Navetta ad ala | Nave | fisica | carico 10, 6 merci |
| Nave di soccorso a fuso Adhara | Nave di soccorso a fuso | Nave | civile | carico 20, 6 merci |
| Cisterna a tre scafi Hawking | Cisterna a tre scafi | Nave | fisica | carico 88, 4 merci |
| Caccia Nespoli | Caccia | Nave di difesa | flotta | forza 6 |
| Pattugliatore Cook | Pattugliatore | Nave di difesa | flotta | forza 4 |
| Corvetta Bering | Corvetta | Nave di difesa | flotta | forza 6 |

### 10. Fluidi, oscillazioni e onde

Braccio della Fisica: 29 modelli, 17 stazioni e 12 navi.

| Modello | Tipo | Genere | Stile | Lavoro |
|---|---|---|---|---|
| Porto Wu | Porto | Stazione | fisica | imbarco |
| Porta Castore | Porta | Stazione | civile | porta |
| Radiotelescopio Dirac | Radiotelescopio | Stazione | fisica | ascolto radio |
| Laboratorio dei campi Galilei | Laboratorio dei campi | Stazione | fisica | esperimenti |
| Telescopio Compton | Telescopio | Stazione | fisica | osservazione del cielo |
| Serra Bose | Serra | Stazione | fisica | fotosintesi |
| Centrale sferica Heisenberg | Centrale sferica | Stazione | fisica | pannelli solari |
| Laboratorio a disco Mirfak | Laboratorio a disco | Stazione | civile | esperimenti |
| Osservatorio a torre Planck | Osservatorio a torre | Stazione | fisica | osservazione del cielo |
| Ripetitore a ruota Boltzmann | Ripetitore a ruota | Stazione | fisica | ritrasmissione |
| Fonderia a traliccio Ohm | Fonderia a traliccio | Stazione | fisica | riduzione del minerale |
| Habitat a croce Gacrux | Habitat a croce | Stazione | civile | vita a bordo |
| Magazzino poliedrico Alhena | Magazzino poliedrico | Stazione | civile | smistamento |
| Arsenale a tamburo Tesla | Arsenale a tamburo | Stazione | fisica | assemblaggio di circuiti |
| Impianto chimico a piattaforma Hubble | Impianto chimico a piattaforma | Stazione | fisica | sintesi del propellente |
| Base della flotta Gagarin | Base della flotta | Stazione di difesa | flotta | rifornimento della flotta |
| Stazione di sorveglianza Parmitano | Stazione di sorveglianza | Stazione di difesa | flotta | sorveglianza dei confini |
| Navetta Fizeau | Navetta | Nave | fisica | carico 12, 6 merci |
| Corriere Gibbs | Corriere | Nave | fisica | carico 30, 7 merci |
| Nave cargo Enif | Nave cargo | Nave | civile | carico 70, 19 merci |
| Cisterna Altair | Cisterna | Nave | civile | carico 80, 4 merci |
| Nave scientifica modulare Fraunhofer | Nave scientifica modulare | Nave | fisica | carico 54, 5 merci |
| Corriere a doppio scafo Saiph | Corriere a doppio scafo | Nave | civile | carico 36, 7 merci |
| Cargo a disco Michelson | Cargo a disco | Nave | fisica | carico 70, 19 merci |
| Nave officina affusolata Alphard | Nave officina affusolata | Nave | civile | carico 24, 8 merci |
| Navetta a telaio Herschel | Navetta a telaio | Nave | fisica | carico 16, 6 merci |
| Intercettore Aldrin | Intercettore | Nave di difesa | flotta | forza 5 |
| Pattugliatore Hadfield | Pattugliatore | Nave di difesa | flotta | forza 4 |
| Corvetta Ride | Corvetta | Nave di difesa | flotta | forza 6 |

### 11. Calore e termodinamica

Braccio della Fisica: 26 modelli, 15 stazioni e 11 navi.

| Modello | Tipo | Genere | Stile | Lavoro |
|---|---|---|---|---|
| Porto Herschel | Porto | Stazione | fisica | imbarco |
| Porta Grecale | Porta | Stazione | civile | porta |
| Centrale Faraday | Centrale | Stazione | fisica | fusione dell'idrogeno |
| Miniera Coulomb | Miniera | Stazione | fisica | estrazione |
| Raffineria Eddington | Raffineria | Stazione | fisica | distillazione dei gas |
| Deposito criogenico Schrödinger | Deposito criogenico | Stazione | fisica | deposito |
| Centrale a croce Majorana | Centrale a croce | Stazione | fisica | fusione dell'idrogeno |
| Laboratorio a spina Clausius | Laboratorio a spina | Stazione | fisica | costruzione di strumenti |
| Osservatorio a ruota Newton | Osservatorio a ruota | Stazione | fisica | osservazione del cielo |
| Ripetitore a torre Bellatrix | Ripetitore a torre | Stazione | civile | ritrasmissione |
| Fonderia a piattaforma Schrödinger | Fonderia a piattaforma | Stazione | fisica | fusione di leghe |
| Habitat a grappolo Lemaître | Habitat a grappolo | Stazione | fisica | vita a bordo |
| Magazzino poliedrico Maxwell | Magazzino poliedrico | Stazione | fisica | smistamento |
| Base della flotta Pesquet | Base della flotta | Stazione di difesa | flotta | rifornimento della flotta |
| Stazione di sorveglianza Bougainville | Stazione di sorveglianza | Stazione di difesa | flotta | sorveglianza dei confini |
| Rimorchiatore minerario Alfvén | Rimorchiatore minerario | Nave | fisica | carico 50, 6 merci |
| Nave scientifica Yukawa | Nave scientifica | Nave | fisica | carico 40, 5 merci |
| Nave da esplorazione Tramontana | Nave da esplorazione | Nave | civile | carico 30, 2 merci |
| Nave passeggeri Alphard | Nave passeggeri | Nave | civile | carico 40, 5 merci |
| Nave scientifica a sfere Penzias | Nave scientifica a sfere | Nave | fisica | carico 48, 5 merci |
| Corriere a disco Mizar | Corriere a disco | Nave | civile | carico 30, 7 merci |
| Cargo modulare Foucault | Cargo modulare | Nave | fisica | carico 95, 19 merci |
| Nave officina a doppio scafo Kochab | Nave officina a doppio scafo | Nave | civile | carico 36, 8 merci |
| Caccia Tasman | Caccia | Nave di difesa | flotta | forza 6 |
| Pattugliatore Livingstone | Pattugliatore | Nave di difesa | flotta | forza 4 |
| Corvetta Chawla | Corvetta | Nave di difesa | flotta | forza 6 |

### 12. Elettromagnetismo e quanti

Braccio della Fisica: 38 modelli, 22 stazioni e 16 navi.

| Modello | Tipo | Genere | Stile | Lavoro |
|---|---|---|---|---|
| Porto Mach | Porto | Stazione | fisica | imbarco |
| Porta Atria | Porta | Stazione | civile | porta |
| Laboratorio dei campi Stokes | Laboratorio dei campi | Stazione | fisica | esperimenti |
| Centrale Laue | Centrale | Stazione | fisica | fusione dell'idrogeno |
| Radiotelescopio Heisenberg | Radiotelescopio | Stazione | fisica | ascolto radio |
| Cantiere Pauli | Cantiere | Stazione | fisica | montaggio di navi |
| Centrale poliedrica Menkent | Centrale poliedrica | Stazione | civile | fusione dell'idrogeno |
| Laboratorio a croce Oort | Laboratorio a croce | Stazione | fisica | esperimenti |
| Osservatorio a traliccio Alphard | Osservatorio a traliccio | Stazione | civile | osservazione del cielo |
| Ripetitore a disco Sabik | Ripetitore a disco | Stazione | civile | ritrasmissione |
| Fonderia a grappolo Yukawa | Fonderia a grappolo | Stazione | fisica | crescita del silicio |
| Habitat a tamburo Libeccio | Habitat a tamburo | Stazione | civile | vita a bordo |
| Magazzino a ruota Sadr | Magazzino a ruota | Stazione | civile | smistamento |
| Arsenale su asteroide Kelvin | Arsenale su asteroide | Stazione | fisica | costruzione di moduli |
| Impianto chimico sferico Schiaparelli | Impianto chimico sferico | Stazione | fisica | fusione del ghiaccio |
| Fattoria a torre Laue | Fattoria a torre | Stazione | fisica | fotobioreattore |
| Centrale a piattaforma Doppler | Centrale a piattaforma | Stazione | fisica | pannelli solari |
| Laboratorio a spina Grecale | Laboratorio a spina | Stazione | civile | costruzione di strumenti |
| Osservatorio poliedrico Gibbs | Osservatorio poliedrico | Stazione | fisica | osservazione del cielo |
| Ripetitore a croce Millikan | Ripetitore a croce | Stazione | fisica | ritrasmissione |
| Base della flotta Garneau | Base della flotta | Stazione di difesa | flotta | rifornimento della flotta |
| Stazione di sorveglianza Kuipers | Stazione di sorveglianza | Stazione di difesa | flotta | sorveglianza dei confini |
| Posaboe Bragg | Posaboe | Nave | fisica | carico 20, 3 merci |
| Nave di soccorso Born | Nave di soccorso | Nave | fisica | carico 20, 6 merci |
| Sonda Megrez | Sonda | Nave | civile | carico 15, 1 merci |
| Nave gru Garbino | Nave gru | Nave | civile | carico 30, 8 merci |
| Nave scientifica a tre scafi Raman | Nave scientifica a tre scafi | Nave | fisica | carico 44, 5 merci |
| Corriere a fuso Ostro | Corriere a fuso | Nave | civile | carico 30, 7 merci |
| Cargo a sfere Kirchhoff | Cargo a sfere | Nave | fisica | carico 84, 19 merci |
| Nave officina ad anello Thuban | Nave officina ad anello | Nave | civile | carico 33, 8 merci |
| Navetta affusolata Torricelli | Navetta affusolata | Nave | fisica | carico 10, 6 merci |
| Nave di soccorso a disco Rigel | Nave di soccorso a disco | Nave | civile | carico 20, 6 merci |
| Cisterna ad ala Dirac | Cisterna ad ala | Nave | fisica | carico 68, 4 merci |
| Nave passeggeri a doppio scafo Denebola | Nave passeggeri a doppio scafo | Nave | civile | carico 48, 5 merci |
| Intercettore Chrétien | Intercettore | Nave di difesa | flotta | forza 5 |
| Pattugliatore Verrazzano | Pattugliatore | Nave di difesa | flotta | forza 4 |
| Corvetta Heyerdahl | Corvetta | Nave di difesa | flotta | forza 6 |
| Fregata Lindbergh | Fregata | Nave di difesa | flotta | forza 8 |

### 13. Materia e atomi

Braccio della Chimica: 34 modelli, 20 stazioni e 14 navi.

| Modello | Tipo | Genere | Stile | Lavoro |
|---|---|---|---|---|
| Porto Werner | Porto | Stazione | chimica | imbarco |
| Porta Schedar | Porta | Stazione | civile | porta |
| Raffineria Curie | Raffineria | Stazione | chimica | distillazione dei gas |
| Laboratorio dei campi Priestley | Laboratorio dei campi | Stazione | chimica | esperimenti |
| Deposito criogenico Langmuir | Deposito criogenico | Stazione | chimica | deposito |
| Stazione poliedrica Hodgkin | Stazione poliedrica | Stazione | chimica | calcolo |
| Impianto chimico a ruota Langmuir | Impianto chimico a ruota | Stazione | chimica | elettrolisi dell'acqua |
| Fonderia sferica Pauling | Fonderia sferica | Stazione | chimica | fusione di leghe |
| Magazzino poliedrico Gay-Lussac | Magazzino poliedrico | Stazione | chimica | smistamento |
| Centrale su asteroide Boyle | Centrale su asteroide | Stazione | chimica | pannelli solari |
| Laboratorio a croce Sabatier | Laboratorio a croce | Stazione | chimica | esperimenti |
| Arsenale a piattaforma Algol | Arsenale a piattaforma | Stazione | civile | montaggio di parti |
| Habitat a traliccio Mendeleev | Habitat a traliccio | Stazione | chimica | vita a bordo |
| Ripetitore a torre Avogadro | Ripetitore a torre | Stazione | chimica | ritrasmissione |
| Osservatorio a disco Cavendish | Osservatorio a disco | Stazione | chimica | osservazione del cielo |
| Fattoria a spina Proust | Fattoria a spina | Stazione | chimica | fotosintesi |
| Impianto chimico a grappolo Berthollet | Impianto chimico a grappolo | Stazione | chimica | polimerizzazione |
| Fonderia a tamburo Dewar | Fonderia a tamburo | Stazione | chimica | fusione dei silicati |
| Base della flotta Earhart | Base della flotta | Stazione di difesa | flotta | rifornimento della flotta |
| Stazione di sorveglianza Glenn | Stazione di sorveglianza | Stazione di difesa | flotta | sorveglianza dei confini |
| Navetta Lewis | Navetta | Nave | chimica | carico 12, 6 merci |
| Corriere Berthollet | Corriere | Nave | chimica | carico 30, 7 merci |
| Nave cargo Aldebaran | Nave cargo | Nave | civile | carico 70, 19 merci |
| Cisterna Elnath | Cisterna | Nave | civile | carico 80, 4 merci |
| Cisterna a doppio scafo Dewar | Cisterna a doppio scafo | Nave | chimica | carico 96, 4 merci |
| Nave mineraria a telaio Libeccio | Nave mineraria a telaio | Nave | civile | carico 65, 4 merci |
| Rimorchiatore a disco Cannizzaro | Rimorchiatore a disco | Nave | chimica | carico 50, 6 merci |
| Nave officina a tre scafi Favonio | Nave officina a tre scafi | Nave | civile | carico 33, 8 merci |
| Nave di soccorso a capsula Sabatier | Nave di soccorso a capsula | Nave | chimica | carico 18, 6 merci |
| Navetta a cuneo Borea | Navetta a cuneo | Nave | civile | carico 11, 6 merci |
| Nave passeggeri a fuso Proust | Nave passeggeri a fuso | Nave | chimica | carico 40, 5 merci |
| Caccia Shepard | Caccia | Nave di difesa | flotta | forza 6 |
| Pattugliatore Nobile | Pattugliatore | Nave di difesa | flotta | forza 4 |
| Corvetta Hudson | Corvetta | Nave di difesa | flotta | forza 6 |

### 14. Legami e molecole

Braccio della Chimica: 31 modelli, 18 stazioni e 13 navi.

| Modello | Tipo | Genere | Stile | Lavoro |
|---|---|---|---|---|
| Porto Sanger | Porto | Stazione | chimica | imbarco |
| Porta Denebola | Porta | Stazione | civile | porta |
| Raffineria Cannizzaro | Raffineria | Stazione | chimica | distillazione dei gas |
| Miniera Rowland | Miniera | Stazione | chimica | estrazione |
| Cantiere Lehn | Cantiere | Stazione | chimica | montaggio di navi |
| Deposito criogenico Gay-Lussac | Deposito criogenico | Stazione | chimica | deposito |
| Impianto chimico a piattaforma Davy | Impianto chimico a piattaforma | Stazione | chimica | sintesi del propellente |
| Fonderia a tamburo Wasat | Fonderia a tamburo | Stazione | civile | fusione dei silicati |
| Magazzino a traliccio Raoult | Magazzino a traliccio | Stazione | chimica | smistamento |
| Centrale su asteroide Mimosa | Centrale su asteroide | Stazione | civile | pannelli solari |
| Laboratorio a disco Wöhler | Laboratorio a disco | Stazione | chimica | esperimenti |
| Arsenale a ruota Le Chatelier | Arsenale a ruota | Stazione | chimica | assemblaggio di circuiti |
| Habitat a torre Hess | Habitat a torre | Stazione | chimica | vita a bordo |
| Ripetitore a grappolo Seaborg | Ripetitore a grappolo | Stazione | chimica | ritrasmissione |
| Osservatorio a spina Lewis | Osservatorio a spina | Stazione | chimica | osservazione del cielo |
| Fattoria sferica Ziegler | Fattoria sferica | Stazione | chimica | fotobioreattore |
| Base della flotta Colombo | Base della flotta | Stazione di difesa | flotta | rifornimento della flotta |
| Stazione di sorveglianza Wang Yaping | Stazione di sorveglianza | Stazione di difesa | flotta | sorveglianza dei confini |
| Rimorchiatore minerario Seaborg | Rimorchiatore minerario | Nave | chimica | carico 50, 6 merci |
| Nave scientifica Dalton | Nave scientifica | Nave | chimica | carico 40, 5 merci |
| Nave da esplorazione Bellatrix | Nave da esplorazione | Nave | civile | carico 30, 2 merci |
| Nave passeggeri Sirio | Nave passeggeri | Nave | civile | carico 40, 5 merci |
| Cisterna a capsula Nernst | Cisterna a capsula | Nave | chimica | carico 72, 4 merci |
| Nave mineraria a tre scafi Wezen | Nave mineraria a tre scafi | Nave | civile | carico 55, 4 merci |
| Rimorchiatore a sfere Priestley | Rimorchiatore a sfere | Nave | chimica | carico 60, 6 merci |
| Nave officina a disco Austro | Nave officina a disco | Nave | civile | carico 30, 8 merci |
| Nave di soccorso a doppio scafo Lavoisier | Nave di soccorso a doppio scafo | Nave | chimica | carico 24, 6 merci |
| Navetta affusolata Suhail | Navetta affusolata | Nave | civile | carico 10, 6 merci |
| Intercettore Guidoni | Intercettore | Nave di difesa | flotta | forza 5 |
| Pattugliatore Nansen | Pattugliatore | Nave di difesa | flotta | forza 4 |
| Corvetta Savitskaja | Corvetta | Nave di difesa | flotta | forza 6 |

### 15. Stati e soluzioni

Braccio della Chimica: 29 modelli, 16 stazioni e 13 navi.

| Modello | Tipo | Genere | Stile | Lavoro |
|---|---|---|---|---|
| Porto Ostwald | Porto | Stazione | chimica | imbarco |
| Porta Mintaka | Porta | Stazione | civile | porta |
| Deposito criogenico Sabatier | Deposito criogenico | Stazione | chimica | deposito |
| Raffineria Davy | Raffineria | Stazione | chimica | distillazione dei gas |
| Centrale Moseley | Centrale | Stazione | chimica | fusione dell'idrogeno |
| Serra Arrhenius | Serra | Stazione | chimica | fotosintesi |
| Impianto chimico a piattaforma Capella | Impianto chimico a piattaforma | Stazione | civile | sintesi del propellente |
| Fonderia su asteroide Berzelius | Fonderia su asteroide | Stazione | chimica | crescita del silicio |
| Magazzino a ruota Priestley | Magazzino a ruota | Stazione | chimica | smistamento |
| Centrale a traliccio Moseley | Centrale a traliccio | Stazione | chimica | fusione dell'idrogeno |
| Laboratorio a torre Haber | Laboratorio a torre | Stazione | chimica | sintesi di farmaci |
| Arsenale a disco Bosch | Arsenale a disco | Stazione | chimica | costruzione di moduli |
| Habitat a croce Curie | Habitat a croce | Stazione | chimica | vita a bordo |
| Ripetitore poliedrico Crutzen | Ripetitore poliedrico | Stazione | chimica | ritrasmissione |
| Base della flotta Cristoforetti | Base della flotta | Stazione di difesa | flotta | rifornimento della flotta |
| Stazione di sorveglianza Malaspina | Stazione di sorveglianza | Stazione di difesa | flotta | sorveglianza dei confini |
| Posaboe Nobel | Posaboe | Nave | chimica | carico 20, 3 merci |
| Nave di soccorso Scheele | Nave di soccorso | Nave | chimica | carico 20, 6 merci |
| Sonda Markab | Sonda | Nave | civile | carico 15, 1 merci |
| Nave gru Zefiro | Nave gru | Nave | civile | carico 30, 8 merci |
| Cisterna a disco Scheele | Cisterna a disco | Nave | chimica | carico 80, 4 merci |
| Nave mineraria a doppio scafo Antares | Nave mineraria a doppio scafo | Nave | civile | carico 60, 4 merci |
| Rimorchiatore a cuneo Pauling | Rimorchiatore a cuneo | Nave | chimica | carico 45, 6 merci |
| Nave officina a fuso Garbino | Nave officina a fuso | Nave | civile | carico 30, 8 merci |
| Nave di soccorso a telaio Grignard | Nave di soccorso a telaio | Nave | chimica | carico 26, 6 merci |
| Caccia Malerba | Caccia | Nave di difesa | flotta | forza 6 |
| Pattugliatore Yang Liwei | Pattugliatore | Nave di difesa | flotta | forza 4 |
| Corvetta Speke | Corvetta | Nave di difesa | flotta | forza 6 |
| Fregata La Pérouse | Fregata | Nave di difesa | flotta | forza 8 |

### 16. Reazioni e quantità

Braccio della Chimica: 28 modelli, 15 stazioni e 13 navi.

| Modello | Tipo | Genere | Stile | Lavoro |
|---|---|---|---|---|
| Porto Bosch | Porto | Stazione | chimica | imbarco |
| Porta Alkaid | Porta | Stazione | civile | porta |
| Raffineria Ziegler | Raffineria | Stazione | chimica | distillazione dei gas |
| Cantiere Dewar | Cantiere | Stazione | chimica | montaggio di navi |
| Centrale Bunsen | Centrale | Stazione | chimica | fusione dell'idrogeno |
| Laboratorio dei campi Pauling | Laboratorio dei campi | Stazione | chimica | esperimenti |
| Impianto chimico sferico Lavoisier | Impianto chimico sferico | Stazione | chimica | fusione del ghiaccio |
| Fonderia a spina Kekulé | Fonderia a spina | Stazione | chimica | riduzione del minerale |
| Magazzino a piattaforma Mira | Magazzino a piattaforma | Stazione | civile | smistamento |
| Centrale a ruota Rowland | Centrale a ruota | Stazione | chimica | pannelli solari |
| Laboratorio a croce Kochab | Laboratorio a croce | Stazione | civile | esperimenti |
| Arsenale a grappolo Werner | Arsenale a grappolo | Stazione | chimica | montaggio di parti |
| Base della flotta Norgay | Base della flotta | Stazione di difesa | flotta | rifornimento della flotta |
| Stazione di sorveglianza Jemison | Stazione di sorveglianza | Stazione di difesa | flotta | sorveglianza dei confini |
| Piattaforma di difesa Peake | Piattaforma di difesa | Stazione di difesa | flotta | difesa ravvicinata |
| Navetta Lavoisier | Navetta | Nave | chimica | carico 12, 6 merci |
| Corriere Berzelius | Corriere | Nave | chimica | carico 30, 7 merci |
| Nave cargo Antares | Nave cargo | Nave | civile | carico 70, 19 merci |
| Cisterna Alcor | Cisterna | Nave | civile | carico 80, 4 merci |
| Cisterna a cuneo Levi | Cisterna a cuneo | Nave | chimica | carico 72, 4 merci |
| Nave mineraria ad ala Tejat | Nave mineraria ad ala | Nave | civile | carico 43, 4 merci |
| Rimorchiatore affusolato Liebig | Rimorchiatore affusolato | Nave | chimica | carico 40, 6 merci |
| Nave officina a sfere Levante | Nave officina a sfere | Nave | civile | carico 36, 8 merci |
| Intercettore Caboto | Intercettore | Nave di difesa | flotta | forza 5 |
| Pattugliatore Vittori | Pattugliatore | Nave di difesa | flotta | forza 4 |
| Corvetta Collins | Corvetta | Nave di difesa | flotta | forza 6 |
| Cacciatorpediniere Magellano | Cacciatorpediniere | Nave di difesa | flotta | forza 10 |
| Corazzata Polo | Corazzata | Nave di difesa | flotta | forza 16 |

### 17. Velocità ed equilibrio

Braccio della Chimica: 41 modelli, 23 stazioni e 18 navi.

| Modello | Tipo | Genere | Stile | Lavoro |
|---|---|---|---|---|
| Porto Avogadro | Porto | Stazione | chimica | imbarco |
| Porta Errai | Porta | Stazione | civile | porta |
| Raffineria Crutzen | Raffineria | Stazione | chimica | distillazione dei gas |
| Miniera Cavendish | Miniera | Stazione | chimica | estrazione |
| Deposito criogenico Mendeleev | Deposito criogenico | Stazione | chimica | deposito |
| Telescopio Kekulé | Telescopio | Stazione | chimica | osservazione del cielo |
| Impianto chimico a spina Liebig | Impianto chimico a spina | Stazione | chimica | fusione del ghiaccio |
| Fonderia su asteroide Achernar | Fonderia su asteroide | Stazione | civile | crescita del silicio |
| Magazzino a tamburo Sanger | Magazzino a tamburo | Stazione | chimica | smistamento |
| Centrale poliedrica Dalton | Centrale poliedrica | Stazione | chimica | fusione dell'idrogeno |
| Laboratorio a grappolo Levi | Laboratorio a grappolo | Stazione | chimica | costruzione di strumenti |
| Arsenale a piattaforma Scheele | Arsenale a piattaforma | Stazione | chimica | montaggio di parti |
| Habitat a ruota Bunsen | Habitat a ruota | Stazione | chimica | vita a bordo |
| Ripetitore a traliccio Lehn | Ripetitore a traliccio | Stazione | chimica | ritrasmissione |
| Osservatorio a disco Regolo | Osservatorio a disco | Stazione | civile | osservazione del cielo |
| Fattoria sferica Aliseo | Fattoria sferica | Stazione | civile | fotobioreattore |
| Impianto chimico a croce Ramsay | Impianto chimico a croce | Stazione | chimica | polimerizzazione |
| Fonderia a torre Natta | Fonderia a torre | Stazione | chimica | crescita del silicio |
| Magazzino a spina Hodgkin | Magazzino a spina | Stazione | chimica | smistamento |
| Base della flotta Franklin | Base della flotta | Stazione di difesa | flotta | rifornimento della flotta |
| Stazione di sorveglianza Pigafetta | Stazione di sorveglianza | Stazione di difesa | flotta | sorveglianza dei confini |
| Piattaforma di difesa Ross | Piattaforma di difesa | Stazione di difesa | flotta | difesa ravvicinata |
| Fortezza orbitale Kingsley | Fortezza orbitale | Stazione di difesa | flotta | difesa della porta |
| Rimorchiatore minerario Natta | Rimorchiatore minerario | Nave | chimica | carico 50, 6 merci |
| Nave scientifica Hess | Nave scientifica | Nave | chimica | carico 40, 5 merci |
| Nave da esplorazione Canopo | Nave da esplorazione | Nave | civile | carico 30, 2 merci |
| Nave passeggeri Mimosa | Nave passeggeri | Nave | civile | carico 40, 5 merci |
| Cisterna a fuso Sanger | Cisterna a fuso | Nave | chimica | carico 80, 4 merci |
| Nave mineraria ad anello Fomalhaut | Nave mineraria ad anello | Nave | civile | carico 55, 4 merci |
| Rimorchiatore a tre scafi Berzelius | Rimorchiatore a tre scafi | Nave | chimica | carico 55, 6 merci |
| Nave di soccorso a cuneo Monsone | Nave di soccorso a cuneo | Nave | civile | carico 18, 6 merci |
| Navetta a capsula Raoult | Navetta a capsula | Nave | chimica | carico 11, 6 merci |
| Nave passeggeri a telaio Algenib | Nave passeggeri a telaio | Nave | civile | carico 52, 5 merci |
| Cargo affusolato Crutzen | Cargo affusolato | Nave | chimica | carico 56, 19 merci |
| Nave officina modulare Ostwald | Nave officina modulare | Nave | chimica | carico 41, 8 merci |
| Caccia Mukai | Caccia | Nave di difesa | flotta | forza 6 |
| Pattugliatore Henson | Pattugliatore | Nave di difesa | flotta | forza 4 |
| Corvetta Tereshkova | Corvetta | Nave di difesa | flotta | forza 6 |
| Fregata Burton | Fregata | Nave di difesa | flotta | forza 8 |
| Incrociatore Akiyama | Incrociatore | Nave di difesa | flotta | forza 12 |
| Portaerei Messner | Portaerei | Nave di difesa | flotta | forza 12 |

### 18. Acidi, redox e carbonio

Braccio della Chimica: 41 modelli, 22 stazioni e 19 navi.

| Modello | Tipo | Genere | Stile | Lavoro |
|---|---|---|---|---|
| Porto Boyle | Porto | Stazione | chimica | imbarco |
| Porta Betelgeuse | Porta | Stazione | civile | porta |
| Raffineria Ramsay | Raffineria | Stazione | chimica | distillazione dei gas |
| Serra Nernst | Serra | Stazione | chimica | fotosintesi |
| Deposito criogenico Le Chatelier | Deposito criogenico | Stazione | chimica | deposito |
| Centrale Levi | Centrale | Stazione | chimica | fusione dell'idrogeno |
| Impianto chimico a traliccio Cannizzaro | Impianto chimico a traliccio | Stazione | chimica | sintesi del propellente |
| Fonderia a spina Tramontana | Fonderia a spina | Stazione | civile | riduzione del minerale |
| Magazzino su asteroide Arrhenius | Magazzino su asteroide | Stazione | chimica | smistamento |
| Centrale sferica Ostwald | Centrale sferica | Stazione | chimica | pannelli solari |
| Laboratorio a torre Denebola | Laboratorio a torre | Stazione | civile | sintesi di farmaci |
| Arsenale poliedrico Ponente | Arsenale poliedrico | Stazione | civile | montaggio di parti |
| Habitat a disco Alnilam | Habitat a disco | Stazione | civile | vita a bordo |
| Ripetitore a piattaforma Nernst | Ripetitore a piattaforma | Stazione | chimica | ritrasmissione |
| Osservatorio a ruota Nobel | Osservatorio a ruota | Stazione | chimica | osservazione del cielo |
| Fattoria a tamburo Woodward | Fattoria a tamburo | Stazione | chimica | fotosintesi |
| Impianto chimico a grappolo Ruchbah | Impianto chimico a grappolo | Stazione | civile | polimerizzazione |
| Base della flotta Piccard | Base della flotta | Stazione di difesa | flotta | rifornimento della flotta |
| Stazione di sorveglianza Hillary | Stazione di sorveglianza | Stazione di difesa | flotta | sorveglianza dei confini |
| Piattaforma di difesa Bird | Piattaforma di difesa | Stazione di difesa | flotta | difesa ravvicinata |
| Fortezza orbitale Scott | Fortezza orbitale | Stazione di difesa | flotta | difesa della porta |
| Generatore di scudo Baffin | Generatore di scudo | Stazione di difesa | flotta | scudo della porta |
| Posaboe Wöhler | Posaboe | Nave | chimica | carico 20, 3 merci |
| Nave di soccorso Molina | Nave di soccorso | Nave | chimica | carico 20, 6 merci |
| Sonda Menkent | Sonda | Nave | civile | carico 15, 1 merci |
| Nave gru Achernar | Nave gru | Nave | civile | carico 30, 8 merci |
| Cisterna modulare Lehn | Cisterna modulare | Nave | chimica | carico 108, 4 merci |
| Nave mineraria a fuso Mirzam | Nave mineraria a fuso | Nave | civile | carico 50, 4 merci |
| Rimorchiatore ad ala Woodward | Rimorchiatore ad ala | Nave | chimica | carico 43, 6 merci |
| Nave di soccorso ad anello Tramontana | Nave di soccorso ad anello | Nave | civile | carico 22, 6 merci |
| Navetta a doppio scafo Gay-Lussac | Navetta a doppio scafo | Nave | chimica | carico 14, 6 merci |
| Nave passeggeri a cuneo Sabik | Nave passeggeri a cuneo | Nave | civile | carico 36, 5 merci |
| Cargo a sfere Molina | Cargo a sfere | Nave | chimica | carico 84, 19 merci |
| Caccia Gerst | Caccia | Nave di difesa | flotta | forza 6 |
| Intercettore Amundsen | Intercettore | Nave di difesa | flotta | forza 5 |
| Pattugliatore Bonatti | Pattugliatore | Nave di difesa | flotta | forza 4 |
| Corvetta Armstrong | Corvetta | Nave di difesa | flotta | forza 6 |
| Fregata Shackleton | Fregata | Nave di difesa | flotta | forza 8 |
| Cacciatorpediniere Nespoli | Cacciatorpediniere | Nave di difesa | flotta | forza 10 |
| Incrociatore pesante Cook | Incrociatore pesante | Nave di difesa | flotta | forza 14 |
| Superportaerei Bering | Superportaerei | Nave di difesa | flotta | forza 18 |

### 19. La vita e la cellula

Braccio della Biologia: 29 modelli, 17 stazioni e 12 navi.

| Modello | Tipo | Genere | Stile | Lavoro |
|---|---|---|---|---|
| Porto Goodall | Porto | Stazione | biologia | imbarco |
| Porta Spica | Porta | Stazione | civile | porta |
| Serra Darwin | Serra | Stazione | biologia | fotosintesi |
| Laboratorio dei campi Fisher | Laboratorio dei campi | Stazione | biologia | esperimenti |
| Radiotelescopio Huxley | Radiotelescopio | Stazione | biologia | ascolto radio |
| Cantiere Woese | Cantiere | Stazione | biologia | montaggio di navi |
| Fattoria su asteroide McKay | Fattoria su asteroide | Stazione | biologia | fotobioreattore |
| Habitat a croce Lovelock | Habitat a croce | Stazione | biologia | vita a bordo |
| Laboratorio a grappolo Chase | Laboratorio a grappolo | Stazione | biologia | costruzione di strumenti |
| Impianto chimico a disco Wilkins | Impianto chimico a disco | Stazione | biologia | sintesi dell'ammoniaca |
| Osservatorio a piattaforma Mitchell | Osservatorio a piattaforma | Stazione | biologia | osservazione del cielo |
| Magazzino poliedrico Morgan | Magazzino poliedrico | Stazione | biologia | smistamento |
| Centrale a torre Spallanzani | Centrale a torre | Stazione | biologia | pannelli solari |
| Ripetitore a traliccio Barghoorn | Ripetitore a traliccio | Stazione | biologia | ritrasmissione |
| Arsenale a ruota Seager | Arsenale a ruota | Stazione | biologia | assemblaggio di circuiti |
| Base della flotta Parmitano | Base della flotta | Stazione di difesa | flotta | rifornimento della flotta |
| Stazione di sorveglianza Aldrin | Stazione di sorveglianza | Stazione di difesa | flotta | sorveglianza dei confini |
| Navetta Lederberg | Navetta | Nave | biologia | carico 12, 6 merci |
| Corriere Calvin | Corriere | Nave | biologia | carico 30, 7 merci |
| Nave cargo Ostro | Nave cargo | Nave | civile | carico 70, 19 merci |
| Cisterna Mizar | Cisterna | Nave | civile | carico 80, 4 merci |
| Nave passeggeri a tre scafi Jacob | Nave passeggeri a tre scafi | Nave | biologia | carico 44, 5 merci |
| Nave di soccorso modulare Mira | Nave di soccorso modulare | Nave | civile | carico 27, 6 merci |
| Cisterna a telaio Szostak | Cisterna a telaio | Nave | biologia | carico 104, 4 merci |
| Nave mineraria a cuneo Polare | Nave mineraria a cuneo | Nave | civile | carico 45, 4 merci |
| Rimorchiatore a fuso Dobzhansky | Rimorchiatore a fuso | Nave | biologia | carico 50, 6 merci |
| Caccia Hadfield | Caccia | Nave di difesa | flotta | forza 6 |
| Pattugliatore Ride | Pattugliatore | Nave di difesa | flotta | forza 4 |
| Corvetta Pesquet | Corvetta | Nave di difesa | flotta | forza 6 |

### 20. Molecole dal cosmo

Braccio della Biologia: 26 modelli, 15 stazioni e 11 navi.

| Modello | Tipo | Genere | Stile | Lavoro |
|---|---|---|---|---|
| Porto Golgi | Porto | Stazione | biologia | imbarco |
| Porta Fomalhaut | Porta | Stazione | civile | porta |
| Miniera Margulis | Miniera | Stazione | biologia | estrazione |
| Radiotelescopio Khorana | Radiotelescopio | Stazione | biologia | ascolto radio |
| Raffineria Koch | Raffineria | Stazione | biologia | distillazione dei gas |
| Telescopio Harvey | Telescopio | Stazione | biologia | osservazione del cielo |
| Fattoria a torre Pääbo | Fattoria a torre | Stazione | biologia | fotobioreattore |
| Habitat a ruota Linneo | Habitat a ruota | Stazione | biologia | vita a bordo |
| Laboratorio a disco Schwann | Laboratorio a disco | Stazione | biologia | esperimenti |
| Impianto chimico poliedrico Watson | Impianto chimico poliedrico | Stazione | biologia | elettrolisi dell'acqua |
| Osservatorio a tamburo Crick | Osservatorio a tamburo | Stazione | biologia | osservazione del cielo |
| Magazzino a grappolo Kimura | Magazzino a grappolo | Stazione | biologia | smistamento |
| Centrale a piattaforma Jacob | Centrale a piattaforma | Stazione | biologia | pannelli solari |
| Base della flotta Bougainville | Base della flotta | Stazione di difesa | flotta | rifornimento della flotta |
| Stazione di sorveglianza Tasman | Stazione di sorveglianza | Stazione di difesa | flotta | sorveglianza dei confini |
| Rimorchiatore minerario Leeuwenhoek | Rimorchiatore minerario | Nave | biologia | carico 50, 6 merci |
| Nave scientifica Sagan | Nave scientifica | Nave | biologia | carico 40, 5 merci |
| Nave da esplorazione Polluce | Nave da esplorazione | Nave | civile | carico 30, 2 merci |
| Nave passeggeri Monsone | Nave passeggeri | Nave | civile | carico 40, 5 merci |
| Nave passeggeri ad ala Wallace | Nave passeggeri ad ala | Nave | biologia | carico 34, 5 merci |
| Cisterna ad anello Dubhe | Cisterna ad anello | Nave | civile | carico 88, 4 merci |
| Nave mineraria a sfere Drake | Nave mineraria a sfere | Nave | biologia | carico 60, 4 merci |
| Rimorchiatore a capsula Enif | Rimorchiatore a capsula | Nave | civile | carico 45, 6 merci |
| Intercettore Livingstone | Intercettore | Nave di difesa | flotta | forza 5 |
| Pattugliatore Chawla | Pattugliatore | Nave di difesa | flotta | forza 4 |
| Corvetta Titov | Corvetta | Nave di difesa | flotta | forza 6 |

### 21. Chimica prebiotica

Braccio della Biologia: 37 modelli, 22 stazioni e 15 navi.

| Modello | Tipo | Genere | Stile | Lavoro |
|---|---|---|---|---|
| Porto Deamer | Porto | Stazione | biologia | imbarco |
| Porta Scheat | Porta | Stazione | civile | porta |
| Serra Szostak | Serra | Stazione | biologia | fotosintesi |
| Raffineria Franklin | Raffineria | Stazione | biologia | distillazione dei gas |
| Centrale Monod | Centrale | Stazione | biologia | fusione dell'idrogeno |
| Deposito criogenico McClintock | Deposito criogenico | Stazione | biologia | deposito |
| Fattoria a piattaforma Carson | Fattoria a piattaforma | Stazione | biologia | fotobioreattore |
| Habitat a tamburo Lederberg | Habitat a tamburo | Stazione | biologia | vita a bordo |
| Laboratorio a ruota Cuvier | Laboratorio a ruota | Stazione | biologia | sintesi di farmaci |
| Impianto chimico a spina Miller | Impianto chimico a spina | Stazione | biologia | fusione del ghiaccio |
| Osservatorio sferico Fisher | Osservatorio sferico | Stazione | biologia | osservazione del cielo |
| Magazzino a disco Fomalhaut | Magazzino a disco | Stazione | civile | smistamento |
| Centrale poliedrica Nirenberg | Centrale poliedrica | Stazione | biologia | fusione dell'idrogeno |
| Ripetitore a torre McClintock | Ripetitore a torre | Stazione | biologia | ritrasmissione |
| Arsenale a grappolo Huxley | Arsenale a grappolo | Stazione | biologia | montaggio di parti |
| Fonderia su asteroide Koch | Fonderia su asteroide | Stazione | biologia | crescita del silicio |
| Fattoria a croce Ponnamperuma | Fattoria a croce | Stazione | biologia | fotosintesi |
| Habitat a traliccio Harvey | Habitat a traliccio | Stazione | biologia | vita a bordo |
| Laboratorio a piattaforma Wächtershäuser | Laboratorio a piattaforma | Stazione | biologia | costruzione di strumenti |
| Impianto chimico a ruota Pizzarello | Impianto chimico a ruota | Stazione | biologia | elettrolisi dell'acqua |
| Base della flotta Kuipers | Base della flotta | Stazione di difesa | flotta | rifornimento della flotta |
| Stazione di sorveglianza Chrétien | Stazione di sorveglianza | Stazione di difesa | flotta | sorveglianza dei confini |
| Posaboe Mayr | Posaboe | Nave | biologia | carico 20, 3 merci |
| Nave di soccorso Schwann | Nave di soccorso | Nave | biologia | carico 20, 6 merci |
| Sonda Scirocco | Sonda | Nave | civile | carico 15, 1 merci |
| Nave gru Tejat | Nave gru | Nave | civile | carico 30, 8 merci |
| Nave mineraria affusolata Eigen | Nave mineraria affusolata | Nave | biologia | carico 40, 4 merci |
| Rimorchiatore ad anello Alhena | Rimorchiatore ad anello | Nave | civile | carico 55, 6 merci |
| Nave passeggeri ad ala Spica | Nave passeggeri ad ala | Nave | civile | carico 34, 5 merci |
| Navetta a sfere Zefiro | Navetta a sfere | Nave | civile | carico 14, 6 merci |
| Cargo a tre scafi Oparin | Cargo a tre scafi | Nave | biologia | carico 77, 19 merci |
| Nave scientifica modulare Ruchbah | Nave scientifica modulare | Nave | civile | carico 54, 5 merci |
| Nave di soccorso a doppio scafo Galvani | Nave di soccorso a doppio scafo | Nave | biologia | carico 24, 6 merci |
| Cisterna a capsula Achernar | Cisterna a capsula | Nave | civile | carico 72, 4 merci |
| Caccia Verrazzano | Caccia | Nave di difesa | flotta | forza 6 |
| Pattugliatore Heyerdahl | Pattugliatore | Nave di difesa | flotta | forza 4 |
| Corvetta Lindbergh | Corvetta | Nave di difesa | flotta | forza 6 |

### 22. Informazione e replicatori

Braccio della Biologia: 34 modelli, 20 stazioni e 14 navi.

| Modello | Tipo | Genere | Stile | Lavoro |
|---|---|---|---|---|
| Porto Schopf | Porto | Stazione | biologia | imbarco |
| Porta Austro | Porta | Stazione | civile | porta |
| Serra Cuvier | Serra | Stazione | biologia | fotosintesi |
| Cantiere Morgan | Cantiere | Stazione | biologia | montaggio di navi |
| Laboratorio dei campi Ponnamperuma | Laboratorio dei campi | Stazione | biologia | esperimenti |
| Stazione poliedrica Haeckel | Stazione poliedrica | Stazione | biologia | calcolo |
| Fattoria a spina Hershey | Fattoria a spina | Stazione | biologia | fotosintesi |
| Habitat sferico Zubenelgenubi | Habitat sferico | Stazione | civile | vita a bordo |
| Laboratorio a traliccio Pasteur | Laboratorio a traliccio | Stazione | biologia | sintesi di farmaci |
| Impianto chimico poliedrico Thuban | Impianto chimico poliedrico | Stazione | civile | elettrolisi dell'acqua |
| Osservatorio a ruota Eigen | Osservatorio a ruota | Stazione | biologia | osservazione del cielo |
| Magazzino a tamburo Darwin | Magazzino a tamburo | Stazione | biologia | smistamento |
| Centrale a croce Fleming | Centrale a croce | Stazione | biologia | fusione dell'idrogeno |
| Ripetitore a disco Tarter | Ripetitore a disco | Stazione | biologia | ritrasmissione |
| Arsenale a torre Ostro | Arsenale a torre | Stazione | civile | assemblaggio di circuiti |
| Fonderia a grappolo Mayr | Fonderia a grappolo | Stazione | biologia | crescita del silicio |
| Fattoria su asteroide Acrux | Fattoria su asteroide | Stazione | civile | fotobioreattore |
| Habitat a piattaforma Cronin | Habitat a piattaforma | Stazione | biologia | vita a bordo |
| Base della flotta Glenn | Base della flotta | Stazione di difesa | flotta | rifornimento della flotta |
| Stazione di sorveglianza Shepard | Stazione di sorveglianza | Stazione di difesa | flotta | sorveglianza dei confini |
| Navetta Watson | Navetta | Nave | biologia | carico 12, 6 merci |
| Corriere Humboldt | Corriere | Nave | biologia | carico 30, 7 merci |
| Nave cargo Capella | Nave cargo | Nave | civile | carico 70, 19 merci |
| Cisterna Suhail | Cisterna | Nave | civile | carico 80, 4 merci |
| Nave mineraria a disco Calvin | Nave mineraria a disco | Nave | biologia | carico 50, 4 merci |
| Rimorchiatore modulare Mintaka | Rimorchiatore modulare | Nave | civile | carico 68, 6 merci |
| Nave passeggeri a tre scafi Mimosa | Nave passeggeri a tre scafi | Nave | civile | carico 44, 5 merci |
| Navetta affusolata Watson | Navetta affusolata | Nave | biologia | carico 10, 6 merci |
| Cargo a doppio scafo Haldane | Cargo a doppio scafo | Nave | biologia | carico 84, 19 merci |
| Nave scientifica a capsula Orgel | Nave scientifica a capsula | Nave | biologia | carico 36, 5 merci |
| Nave di soccorso a fuso Pizzarello | Nave di soccorso a fuso | Nave | biologia | carico 20, 6 merci |
| Intercettore Nobile | Intercettore | Nave di difesa | flotta | forza 5 |
| Pattugliatore Hudson | Pattugliatore | Nave di difesa | flotta | forza 4 |
| Corvetta Colombo | Corvetta | Nave di difesa | flotta | forza 6 |

### 23. Evoluzione e albero della vita

Braccio della Biologia: 31 modelli, 18 stazioni e 13 navi.

| Modello | Tipo | Genere | Stile | Lavoro |
|---|---|---|---|---|
| Porto Carson | Porto | Stazione | biologia | imbarco |
| Porta Albireo | Porta | Stazione | civile | porta |
| Serra Eigen | Serra | Stazione | biologia | fotosintesi |
| Miniera Oparin | Miniera | Stazione | biologia | estrazione |
| Telescopio Pääbo | Telescopio | Stazione | biologia | osservazione del cielo |
| Cantiere Chyba | Cantiere | Stazione | biologia | montaggio di navi |
| Fattoria a disco Haeckel | Fattoria a disco | Stazione | biologia | fotosintesi |
| Habitat a grappolo Monod | Habitat a grappolo | Stazione | biologia | vita a bordo |
| Laboratorio a torre Drake | Laboratorio a torre | Stazione | biologia | sintesi di farmaci |
| Impianto chimico a ruota Elnath | Impianto chimico a ruota | Stazione | civile | elettrolisi dell'acqua |
| Osservatorio a piattaforma Monsone | Osservatorio a piattaforma | Stazione | civile | osservazione del cielo |
| Magazzino su asteroide Galvani | Magazzino su asteroide | Stazione | biologia | smistamento |
| Centrale a tamburo Margulis | Centrale a tamburo | Stazione | biologia | fusione dell'idrogeno |
| Ripetitore a croce Szostak | Ripetitore a croce | Stazione | biologia | ritrasmissione |
| Arsenale a traliccio Menkar | Arsenale a traliccio | Stazione | civile | assemblaggio di circuiti |
| Fonderia a spina Krebs | Fonderia a spina | Stazione | biologia | riduzione del minerale |
| Base della flotta Wang Yaping | Base della flotta | Stazione di difesa | flotta | rifornimento della flotta |
| Stazione di sorveglianza Guidoni | Stazione di sorveglianza | Stazione di difesa | flotta | sorveglianza dei confini |
| Rimorchiatore minerario Barghoorn | Rimorchiatore minerario | Nave | biologia | carico 50, 6 merci |
| Nave scientifica Pizzarello | Nave scientifica | Nave | biologia | carico 40, 5 merci |
| Nave da esplorazione Maestrale | Nave da esplorazione | Nave | civile | carico 30, 2 merci |
| Nave passeggeri Libeccio | Nave passeggeri | Nave | civile | carico 40, 5 merci |
| Nave mineraria a capsula Mayr | Nave mineraria a capsula | Nave | biologia | carico 45, 4 merci |
| Rimorchiatore a telaio Propus | Rimorchiatore a telaio | Nave | civile | carico 65, 6 merci |
| Nave passeggeri a disco Urey | Nave passeggeri a disco | Nave | biologia | carico 40, 5 merci |
| Navetta a sfere Lovelock | Navetta a sfere | Nave | biologia | carico 14, 6 merci |
| Cargo a cuneo Krebs | Cargo a cuneo | Nave | biologia | carico 63, 19 merci |
| Nave scientifica ad anello Zosma | Nave scientifica ad anello | Nave | civile | carico 44, 5 merci |
| Caccia Nansen | Caccia | Nave di difesa | flotta | forza 6 |
| Pattugliatore Savitskaja | Pattugliatore | Nave di difesa | flotta | forza 4 |
| Corvetta Cristoforetti | Corvetta | Nave di difesa | flotta | forza 6 |

### 24. Vita ai limiti

Braccio della Biologia: 29 modelli, 16 stazioni e 13 navi.

| Modello | Tipo | Genere | Stile | Lavoro |
|---|---|---|---|---|
| Porto Spallanzani | Porto | Stazione | biologia | imbarco |
| Porta Hamal | Porta | Stazione | civile | porta |
| Serra Gould | Serra | Stazione | biologia | fotosintesi |
| Centrale Drake | Centrale | Stazione | biologia | fusione dell'idrogeno |
| Deposito criogenico Seager | Deposito criogenico | Stazione | biologia | deposito |
| Raffineria Mitchell | Raffineria | Stazione | biologia | distillazione dei gas |
| Fattoria a spina Algenib | Fattoria a spina | Stazione | civile | fotosintesi |
| Habitat poliedrico Hamal | Habitat poliedrico | Stazione | civile | vita a bordo |
| Laboratorio a piattaforma Spica | Laboratorio a piattaforma | Stazione | civile | costruzione di strumenti |
| Impianto chimico a tamburo Golgi | Impianto chimico a tamburo | Stazione | biologia | fusione del ghiaccio |
| Osservatorio a ruota Rasalhague | Osservatorio a ruota | Stazione | civile | osservazione del cielo |
| Magazzino a traliccio Wallace | Magazzino a traliccio | Stazione | biologia | smistamento |
| Centrale a grappolo Brenner | Centrale a grappolo | Stazione | biologia | pannelli solari |
| Ripetitore sferico Bora | Ripetitore sferico | Stazione | civile | ritrasmissione |
| Base della flotta Malaspina | Base della flotta | Stazione di difesa | flotta | rifornimento della flotta |
| Stazione di sorveglianza Malerba | Stazione di sorveglianza | Stazione di difesa | flotta | sorveglianza dei confini |
| Posaboe Avery | Posaboe | Nave | biologia | carico 20, 3 merci |
| Nave di soccorso Jacob | Nave di soccorso | Nave | biologia | carico 20, 6 merci |
| Sonda Sadr | Sonda | Nave | civile | carico 15, 1 merci |
| Nave gru Alderamin | Nave gru | Nave | civile | carico 30, 8 merci |
| Nave mineraria modulare Carson | Nave mineraria modulare | Nave | biologia | carico 68, 4 merci |
| Rimorchiatore a doppio scafo Scirocco | Rimorchiatore a doppio scafo | Nave | civile | carico 60, 6 merci |
| Nave passeggeri a telaio McKay | Nave passeggeri a telaio | Nave | biologia | carico 52, 5 merci |
| Navetta a cuneo Fleming | Navetta a cuneo | Nave | biologia | carico 11, 6 merci |
| Cargo affusolato Lederberg | Cargo affusolato | Nave | biologia | carico 56, 19 merci |
| Intercettore Ibn Battuta | Intercettore | Nave di difesa | flotta | forza 5 |
| Pattugliatore Speke | Pattugliatore | Nave di difesa | flotta | forza 4 |
| Corvetta La Pérouse | Corvetta | Nave di difesa | flotta | forza 6 |
| Fregata Komarov | Fregata | Nave di difesa | flotta | forza 8 |

### 25. Pianeti abitabili

Braccio della Biologia: 28 modelli, 15 stazioni e 13 navi.

| Modello | Tipo | Genere | Stile | Lavoro |
|---|---|---|---|---|
| Porto Miller | Porto | Stazione | biologia | imbarco |
| Porta Arturo | Porta | Stazione | civile | porta |
| Serra Hershey | Serra | Stazione | biologia | fotosintesi |
| Telescopio Haldane | Telescopio | Stazione | biologia | osservazione del cielo |
| Radiotelescopio Wallace | Radiotelescopio | Stazione | biologia | ascolto radio |
| Centrale Virchow | Centrale | Stazione | biologia | fusione dell'idrogeno |
| Fattoria a grappolo Humboldt | Fattoria a grappolo | Stazione | biologia | fotobioreattore |
| Habitat a spina Calvin | Habitat a spina | Stazione | biologia | vita a bordo |
| Laboratorio su asteroide Virchow | Laboratorio su asteroide | Stazione | biologia | esperimenti |
| Impianto chimico a piattaforma Urey | Impianto chimico a piattaforma | Stazione | biologia | sintesi del propellente |
| Osservatorio poliedrico Mendel | Osservatorio poliedrico | Stazione | biologia | osservazione del cielo |
| Magazzino a ruota Malpighi | Magazzino a ruota | Stazione | biologia | smistamento |
| Base della flotta Jemison | Base della flotta | Stazione di difesa | flotta | rifornimento della flotta |
| Stazione di sorveglianza Peake | Stazione di sorveglianza | Stazione di difesa | flotta | sorveglianza dei confini |
| Piattaforma di difesa Caboto | Piattaforma di difesa | Stazione di difesa | flotta | difesa ravvicinata |
| Navetta Redi | Navetta | Nave | biologia | carico 12, 6 merci |
| Corriere Lovelock | Corriere | Nave | biologia | carico 30, 7 merci |
| Nave cargo Procione | Nave cargo | Nave | civile | carico 70, 19 merci |
| Cisterna Algol | Cisterna | Nave | civile | carico 80, 4 merci |
| Nave passeggeri a cuneo Avery | Nave passeggeri a cuneo | Nave | biologia | carico 36, 5 merci |
| Navetta a tre scafi Capella | Navetta a tre scafi | Nave | civile | carico 13, 6 merci |
| Cargo modulare Harvey | Cargo modulare | Nave | biologia | carico 95, 19 merci |
| Nave scientifica ad anello Chyba | Nave scientifica ad anello | Nave | biologia | carico 44, 5 merci |
| Caccia Vespucci | Caccia | Nave di difesa | flotta | forza 6 |
| Pattugliatore Collins | Pattugliatore | Nave di difesa | flotta | forza 4 |
| Corvetta Magellano | Corvetta | Nave di difesa | flotta | forza 6 |
| Cacciatorpediniere Polo | Cacciatorpediniere | Nave di difesa | flotta | forza 10 |
| Corazzata Lovell | Corazzata | Nave di difesa | flotta | forza 16 |

### 26. Mondi del sistema solare

Braccio della Biologia: 41 modelli, 23 stazioni e 18 navi.

| Modello | Tipo | Genere | Stile | Lavoro |
|---|---|---|---|---|
| Porto Wächtershäuser | Porto | Stazione | biologia | imbarco |
| Porta Levante | Porta | Stazione | civile | porta |
| Miniera Lamarck | Miniera | Stazione | biologia | estrazione |
| Radiotelescopio McKay | Radiotelescopio | Stazione | biologia | ascolto radio |
| Serra Cronin | Serra | Stazione | biologia | fotosintesi |
| Cantiere Wilkins | Cantiere | Stazione | biologia | montaggio di navi |
| Fattoria a traliccio Gould | Fattoria a traliccio | Stazione | biologia | fotosintesi |
| Habitat sferico Sagan | Habitat sferico | Stazione | biologia | vita a bordo |
| Laboratorio a spina Lamarck | Laboratorio a spina | Stazione | biologia | costruzione di strumenti |
| Impianto chimico a croce Chyba | Impianto chimico a croce | Stazione | biologia | polimerizzazione |
| Osservatorio su asteroide Schopf | Osservatorio su asteroide | Stazione | biologia | osservazione del cielo |
| Magazzino a piattaforma Khorana | Magazzino a piattaforma | Stazione | biologia | smistamento |
| Centrale a ruota Deamer | Centrale a ruota | Stazione | biologia | pannelli solari |
| Ripetitore poliedrico Goodall | Ripetitore poliedrico | Stazione | biologia | ritrasmissione |
| Arsenale a tamburo Haldane | Arsenale a tamburo | Stazione | biologia | assemblaggio di circuiti |
| Fonderia a grappolo Diphda | Fonderia a grappolo | Stazione | civile | crescita del silicio |
| Fattoria a torre Maestrale | Fattoria a torre | Stazione | civile | fotobioreattore |
| Habitat a disco Woese | Habitat a disco | Stazione | biologia | vita a bordo |
| Laboratorio a traliccio Polare | Laboratorio a traliccio | Stazione | civile | sintesi di farmaci |
| Base della flotta Pigafetta | Base della flotta | Stazione di difesa | flotta | rifornimento della flotta |
| Stazione di sorveglianza Ross | Stazione di sorveglianza | Stazione di difesa | flotta | sorveglianza dei confini |
| Piattaforma di difesa Kingsley | Piattaforma di difesa | Stazione di difesa | flotta | difesa ravvicinata |
| Fortezza orbitale Cousteau | Fortezza orbitale | Stazione di difesa | flotta | difesa della porta |
| Rimorchiatore minerario Levi-Montalcini | Rimorchiatore minerario | Nave | biologia | carico 50, 6 merci |
| Nave scientifica Krebs | Nave scientifica | Nave | biologia | carico 40, 5 merci |
| Nave da esplorazione Sabik | Nave da esplorazione | Nave | civile | carico 30, 2 merci |
| Nave passeggeri Shaula | Nave passeggeri | Nave | civile | carico 40, 5 merci |
| Nave passeggeri a fuso Leeuwenhoek | Nave passeggeri a fuso | Nave | biologia | carico 40, 5 merci |
| Navetta ad ala Aldebaran | Navetta ad ala | Nave | civile | carico 10, 6 merci |
| Cargo a disco Franklin | Cargo a disco | Nave | biologia | carico 70, 19 merci |
| Nave scientifica a tre scafi Caph | Nave scientifica a tre scafi | Nave | civile | carico 44, 5 merci |
| Nave di soccorso modulare Huxley | Nave di soccorso modulare | Nave | biologia | carico 27, 6 merci |
| Cisterna a telaio Schedar | Cisterna a telaio | Nave | civile | carico 104, 4 merci |
| Corriere a cuneo Miller | Corriere a cuneo | Nave | biologia | carico 27, 7 merci |
| Nave officina a capsula Pääbo | Nave officina a capsula | Nave | biologia | carico 27, 8 merci |
| Intercettore Peary | Intercettore | Nave di difesa | flotta | forza 5 |
| Pattugliatore Tereshkova | Pattugliatore | Nave di difesa | flotta | forza 4 |
| Corvetta Burton | Corvetta | Nave di difesa | flotta | forza 6 |
| Fregata Akiyama | Fregata | Nave di difesa | flotta | forza 8 |
| Incrociatore Messner | Incrociatore | Nave di difesa | flotta | forza 12 |
| Portaerei Leonov | Portaerei | Nave di difesa | flotta | forza 12 |

### 27. Cercare la vita nella galassia

Braccio della Biologia: 41 modelli, 22 stazioni e 19 navi.

| Modello | Tipo | Genere | Stile | Lavoro |
|---|---|---|---|---|
| Porto Brenner | Porto | Stazione | biologia | imbarco |
| Porta Alnilam | Porta | Stazione | civile | porta |
| Radiotelescopio Fleming | Radiotelescopio | Stazione | biologia | ascolto radio |
| Telescopio Kimura | Telescopio | Stazione | biologia | osservazione del cielo |
| Laboratorio dei campi Malpighi | Laboratorio dei campi | Stazione | biologia | esperimenti |
| Stazione poliedrica Nirenberg | Stazione poliedrica | Stazione | biologia | calcolo |
| Fattoria a tamburo Dobzhansky | Fattoria a tamburo | Stazione | biologia | fotosintesi |
| Habitat su asteroide Markab | Habitat su asteroide | Stazione | civile | vita a bordo |
| Laboratorio a croce Franklin | Laboratorio a croce | Stazione | biologia | esperimenti |
| Impianto chimico a traliccio Avery | Impianto chimico a traliccio | Stazione | biologia | sintesi del propellente |
| Osservatorio a spina Bernal | Osservatorio a spina | Stazione | biologia | osservazione del cielo |
| Magazzino a disco Leeuwenhoek | Magazzino a disco | Stazione | biologia | smistamento |
| Centrale a ruota Zosma | Centrale a ruota | Stazione | civile | pannelli solari |
| Ripetitore a piattaforma Oparin | Ripetitore a piattaforma | Stazione | biologia | ritrasmissione |
| Arsenale poliedrico Redi | Arsenale poliedrico | Stazione | biologia | montaggio di parti |
| Fonderia sferica Orgel | Fonderia sferica | Stazione | biologia | fusione di leghe |
| Fattoria a grappolo Zefiro | Fattoria a grappolo | Stazione | civile | fotobioreattore |
| Base della flotta Hillary | Base della flotta | Stazione di difesa | flotta | rifornimento della flotta |
| Stazione di sorveglianza Bird | Stazione di sorveglianza | Stazione di difesa | flotta | sorveglianza dei confini |
| Piattaforma di difesa Scott | Piattaforma di difesa | Stazione di difesa | flotta | difesa ravvicinata |
| Fortezza orbitale Baffin | Fortezza orbitale | Stazione di difesa | flotta | difesa della porta |
| Generatore di scudo Gerst | Generatore di scudo | Stazione di difesa | flotta | scudo della porta |
| Posaboe Urey | Posaboe | Nave | biologia | carico 20, 3 merci |
| Nave di soccorso Bernal | Nave di soccorso | Nave | biologia | carico 20, 6 merci |
| Sonda Zosma | Sonda | Nave | civile | carico 15, 1 merci |
| Nave gru Thuban | Nave gru | Nave | civile | carico 30, 8 merci |
| Nave passeggeri a doppio scafo Hershey | Nave passeggeri a doppio scafo | Nave | biologia | carico 48, 5 merci |
| Navetta a telaio Deneb | Navetta a telaio | Nave | civile | carico 16, 6 merci |
| Cargo modulare Mirfak | Cargo modulare | Nave | civile | carico 95, 19 merci |
| Nave scientifica a tre scafi Spallanzani | Nave scientifica a tre scafi | Nave | biologia | carico 44, 5 merci |
| Nave di soccorso a cuneo Margulis | Nave di soccorso a cuneo | Nave | biologia | carico 18, 6 merci |
| Cisterna a sfere Morgan | Cisterna a sfere | Nave | biologia | carico 96, 4 merci |
| Corriere a capsula Crick | Corriere a capsula | Nave | biologia | carico 27, 7 merci |
| Caccia Zheng He | Caccia | Nave di difesa | flotta | forza 6 |
| Intercettore Bonatti | Intercettore | Nave di difesa | flotta | forza 5 |
| Pattugliatore Armstrong | Pattugliatore | Nave di difesa | flotta | forza 4 |
| Corvetta Shackleton | Corvetta | Nave di difesa | flotta | forza 6 |
| Fregata Nespoli | Fregata | Nave di difesa | flotta | forza 8 |
| Cacciatorpediniere Cook | Cacciatorpediniere | Nave di difesa | flotta | forza 10 |
| Incrociatore pesante Bering | Incrociatore pesante | Nave di difesa | flotta | forza 14 |
| Superportaerei Gagarin | Superportaerei | Nave di difesa | flotta | forza 18 |

### 28. Luce e telescopi

Braccio della Fisica: 32 modelli, 18 stazioni e 14 navi.

| Modello | Tipo | Genere | Stile | Lavoro |
|---|---|---|---|---|
| Porto Ohm | Porto | Stazione | fisica | imbarco |
| Porta Regolo | Porta | Stazione | civile | porta |
| Telescopio Hawking | Telescopio | Stazione | fisica | osservazione del cielo |
| Radiotelescopio Lorentz | Radiotelescopio | Stazione | fisica | ascolto radio |
| Centrale Tesla | Centrale | Stazione | fisica | fusione dell'idrogeno |
| Stazione poliedrica Kirchhoff | Stazione poliedrica | Stazione | fisica | calcolo |
| Centrale a tamburo Stokes | Centrale a tamburo | Stazione | fisica | fusione dell'idrogeno |
| Laboratorio sferico Alioth | Laboratorio sferico | Stazione | civile | esperimenti |
| Osservatorio a spina Herschel | Osservatorio a spina | Stazione | fisica | osservazione del cielo |
| Ripetitore a torre Hertz | Ripetitore a torre | Stazione | fisica | ritrasmissione |
| Fonderia a ruota Huygens | Fonderia a ruota | Stazione | fisica | fusione di leghe |
| Habitat a croce Bohr | Habitat a croce | Stazione | fisica | vita a bordo |
| Magazzino a traliccio Fizeau | Magazzino a traliccio | Stazione | fisica | smistamento |
| Arsenale poliedrico Compton | Arsenale poliedrico | Stazione | fisica | montaggio di parti |
| Impianto chimico a grappolo Leavitt | Impianto chimico a grappolo | Stazione | fisica | polimerizzazione |
| Base della flotta Aldrin | Base della flotta | Stazione di difesa | flotta | rifornimento della flotta |
| Stazione di sorveglianza Hadfield | Stazione di sorveglianza | Stazione di difesa | flotta | sorveglianza dei confini |
| Piattaforma di difesa Ride | Piattaforma di difesa | Stazione di difesa | flotta | difesa ravvicinata |
| Navetta Rubin | Navetta | Nave | fisica | carico 12, 6 merci |
| Corriere Hubble | Corriere | Nave | fisica | carico 30, 7 merci |
| Nave cargo Bora | Nave cargo | Nave | civile | carico 70, 19 merci |
| Cisterna Alioth | Cisterna | Nave | civile | carico 80, 4 merci |
| Nave scientifica a capsula Schrödinger | Nave scientifica a capsula | Nave | fisica | carico 36, 5 merci |
| Corriere ad anello Zubenelgenubi | Corriere ad anello | Nave | civile | carico 33, 7 merci |
| Cargo affusolato Rayleigh | Cargo affusolato | Nave | fisica | carico 56, 19 merci |
| Nave officina a sfere Burnell | Nave officina a sfere | Nave | fisica | carico 36, 8 merci |
| Navetta a doppio scafo Lemaître | Navetta a doppio scafo | Nave | fisica | carico 14, 6 merci |
| Intercettore Pesquet | Intercettore | Nave di difesa | flotta | forza 5 |
| Pattugliatore Bougainville | Pattugliatore | Nave di difesa | flotta | forza 4 |
| Corvetta Tasman | Corvetta | Nave di difesa | flotta | forza 6 |
| Cacciatorpediniere Livingstone | Cacciatorpediniere | Nave di difesa | flotta | forza 10 |
| Corazzata Chawla | Corazzata | Nave di difesa | flotta | forza 16 |

### 29. Campi e plasmi nello spazio

Braccio della Fisica: 31 modelli, 17 stazioni e 14 navi.

| Modello | Tipo | Genere | Stile | Lavoro |
|---|---|---|---|---|
| Porto Kelvin | Porto | Stazione | fisica | imbarco |
| Porta Acrux | Porta | Stazione | civile | porta |
| Laboratorio dei campi Lemaître | Laboratorio dei campi | Stazione | fisica | esperimenti |
| Miniera Schiaparelli | Miniera | Stazione | fisica | estrazione |
| Centrale Meitner | Centrale | Stazione | fisica | fusione dell'idrogeno |
| Radiotelescopio Millikan | Radiotelescopio | Stazione | fisica | ascolto radio |
| Centrale a traliccio Hooke | Centrale a traliccio | Stazione | fisica | fusione dell'idrogeno |
| Laboratorio a tamburo Bose | Laboratorio a tamburo | Stazione | fisica | sintesi di farmaci |
| Osservatorio su asteroide Kirchhoff | Osservatorio su asteroide | Stazione | fisica | osservazione del cielo |
| Ripetitore a disco Gamow | Ripetitore a disco | Stazione | fisica | ritrasmissione |
| Fonderia a ruota Altair | Fonderia a ruota | Stazione | civile | fusione di leghe |
| Habitat a piattaforma Foucault | Habitat a piattaforma | Stazione | fisica | vita a bordo |
| Magazzino a croce Merak | Magazzino a croce | Stazione | civile | smistamento |
| Base della flotta Chrétien | Base della flotta | Stazione di difesa | flotta | rifornimento della flotta |
| Stazione di sorveglianza Verrazzano | Stazione di sorveglianza | Stazione di difesa | flotta | sorveglianza dei confini |
| Piattaforma di difesa Heyerdahl | Piattaforma di difesa | Stazione di difesa | flotta | difesa ravvicinata |
| Fortezza orbitale Lindbergh | Fortezza orbitale | Stazione di difesa | flotta | difesa della porta |
| Rimorchiatore minerario Hoyle | Rimorchiatore minerario | Nave | fisica | carico 50, 6 merci |
| Nave scientifica Fraunhofer | Nave scientifica | Nave | fisica | carico 40, 5 merci |
| Nave da esplorazione Diphda | Nave da esplorazione | Nave | civile | carico 30, 2 merci |
| Nave passeggeri Polare | Nave passeggeri | Nave | civile | carico 40, 5 merci |
| Nave scientifica a doppio scafo Huygens | Nave scientifica a doppio scafo | Nave | fisica | carico 48, 5 merci |
| Corriere a fuso Stokes | Corriere a fuso | Nave | fisica | carico 30, 7 merci |
| Cargo a tre scafi Oort | Cargo a tre scafi | Nave | fisica | carico 77, 19 merci |
| Nave officina a capsula Fermi | Nave officina a capsula | Nave | fisica | carico 27, 8 merci |
| Caccia Earhart | Caccia | Nave di difesa | flotta | forza 6 |
| Pattugliatore Shepard | Pattugliatore | Nave di difesa | flotta | forza 4 |
| Corvetta Nobile | Corvetta | Nave di difesa | flotta | forza 6 |
| Fregata Hudson | Fregata | Nave di difesa | flotta | forza 8 |
| Incrociatore Colombo | Incrociatore | Nave di difesa | flotta | forza 12 |
| Portaerei Wang Yaping | Portaerei | Nave di difesa | flotta | forza 12 |

### 30. Dalla relatività al Big Bang

Braccio della Fisica: 45 modelli, 25 stazioni e 20 navi.

| Modello | Tipo | Genere | Stile | Lavoro |
|---|---|---|---|---|
| Porto Fermi | Porto | Stazione | fisica | imbarco |
| Porta Mirzam | Porta | Stazione | civile | porta |
| Telescopio Gamow | Telescopio | Stazione | fisica | osservazione del cielo |
| Radiotelescopio Michelson | Radiotelescopio | Stazione | fisica | ascolto radio |
| Laboratorio dei campi Volta | Laboratorio dei campi | Stazione | fisica | esperimenti |
| Cantiere Boltzmann | Cantiere | Stazione | fisica | montaggio di navi |
| Centrale a disco Schedar | Centrale a disco | Stazione | civile | fusione dell'idrogeno |
| Laboratorio su asteroide Pauli | Laboratorio su asteroide | Stazione | fisica | esperimenti |
| Osservatorio a spina Scheat | Osservatorio a spina | Stazione | civile | osservazione del cielo |
| Ripetitore a grappolo Born | Ripetitore a grappolo | Stazione | fisica | ritrasmissione |
| Fonderia sferica Fermi | Fonderia sferica | Stazione | fisica | fusione di leghe |
| Habitat a tamburo Raman | Habitat a tamburo | Stazione | fisica | vita a bordo |
| Magazzino a ruota Penzias | Magazzino a ruota | Stazione | fisica | smistamento |
| Arsenale a croce Mintaka | Arsenale a croce | Stazione | civile | costruzione di moduli |
| Impianto chimico a torre Bragg | Impianto chimico a torre | Stazione | fisica | sintesi dell'ammoniaca |
| Fattoria a piattaforma Dirac | Fattoria a piattaforma | Stazione | fisica | fotobioreattore |
| Centrale a traliccio Mizar | Centrale a traliccio | Stazione | civile | fusione dell'idrogeno |
| Laboratorio poliedrico Friedmann | Laboratorio poliedrico | Stazione | fisica | costruzione di strumenti |
| Osservatorio su asteroide Alderamin | Osservatorio su asteroide | Stazione | civile | osservazione del cielo |
| Ripetitore a spina Rubin | Ripetitore a spina | Stazione | fisica | ritrasmissione |
| Base della flotta Guidoni | Base della flotta | Stazione di difesa | flotta | rifornimento della flotta |
| Stazione di sorveglianza Nansen | Stazione di sorveglianza | Stazione di difesa | flotta | sorveglianza dei confini |
| Piattaforma di difesa Savitskaja | Piattaforma di difesa | Stazione di difesa | flotta | difesa ravvicinata |
| Fortezza orbitale Cristoforetti | Fortezza orbitale | Stazione di difesa | flotta | difesa della porta |
| Generatore di scudo Malaspina | Generatore di scudo | Stazione di difesa | flotta | scudo della porta |
| Posaboe Carnot | Posaboe | Nave | fisica | carico 20, 3 merci |
| Nave di soccorso Burnell | Nave di soccorso | Nave | fisica | carico 20, 6 merci |
| Sonda Mirfak | Sonda | Nave | civile | carico 15, 1 merci |
| Nave gru Algenib | Nave gru | Nave | civile | carico 30, 8 merci |
| Nave scientifica a cuneo Volta | Nave scientifica a cuneo | Nave | fisica | carico 36, 5 merci |
| Corriere a sfere Acrux | Corriere a sfere | Nave | civile | carico 36, 7 merci |
| Cargo ad anello Compton | Cargo ad anello | Nave | fisica | carico 77, 19 merci |
| Nave officina modulare Friedmann | Nave officina modulare | Nave | fisica | carico 41, 8 merci |
| Navetta a fuso Diphda | Navetta a fuso | Nave | civile | carico 12, 6 merci |
| Nave di soccorso a telaio Hamal | Nave di soccorso a telaio | Nave | civile | carico 26, 6 merci |
| Cisterna affusolata Alcor | Cisterna affusolata | Nave | civile | carico 64, 4 merci |
| Nave passeggeri a doppio scafo Mach | Nave passeggeri a doppio scafo | Nave | fisica | carico 48, 5 merci |
| Caccia Ibn Battuta | Caccia | Nave di difesa | flotta | forza 6 |
| Intercettore Yang Liwei | Intercettore | Nave di difesa | flotta | forza 5 |
| Pattugliatore La Pérouse | Pattugliatore | Nave di difesa | flotta | forza 4 |
| Corvetta Komarov | Corvetta | Nave di difesa | flotta | forza 6 |
| Fregata Norgay | Fregata | Nave di difesa | flotta | forza 8 |
| Cacciatorpediniere Jemison | Cacciatorpediniere | Nave di difesa | flotta | forza 10 |
| Incrociatore pesante Peake | Incrociatore pesante | Nave di difesa | flotta | forza 14 |
| Superportaerei Caboto | Superportaerei | Nave di difesa | flotta | forza 18 |
