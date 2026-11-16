# Componenti e attribuzioni

Le parti originali del progetto sono distribuite con CC BY 4.0; per ambito ed esclusioni vedere [LICENSE.md](LICENSE.md). I materiali elencati di seguito conservano le condizioni delle rispettive fonti.

## Contenuti didattici

*Matematica di base — Forme e connessioni*, Marzio De Corato e Danilo Liuzzi, bozza di 769 pagine fornita dall’utente. PDF preservato; le rielaborazioni narrative precedenti rimangono in `sources/v7/`. L’adattamento GAIA cambia la cornice narrativa e non le formule testate.

## Texture planetarie 1.3.0

Le superfici planetarie usano esclusivamente mappe esterne NASA. Non sono usate le mappe procedurali GeoStatLab né continenti/nuvole sintetizzati dagli shader.

- Terra (luglio e gennaio 2004): **NASA Earth Observatory / Reto Stöckli**, Blue Marble Next Generation. Fonte 21600 × 10800; livelli 8192, 4096 e 2048. https://science.nasa.gov/earth/earth-observatory/blue-marble-next-generation/base-map/
- Marte: **NASA/JPL-Caltech/USGS**, Viking MDIM 2.1 Colorized Global Mosaic, distribuito da NASA Trek. Mosaico 8192 × 4096 composto da 512 tessere originali alla griglia dichiarata. Nessun pixel dipinto o inventato. https://trek.nasa.gov/tiles/apidoc/trekAPI.html?body=mars
- Luna: **NASA/GSFC/Scientific Visualization Studio, Ernie Wright**, dati LRO; mappa CGI Moon Kit 2019 a 8192 × 4096. https://svs.gsfc.nasa.gov/4720/
- Giove: **NASA, ESA, A. Simon (GSFC), M. Wong e G. Orton (JPL-Caltech)**, mappa Hubble 2015 a 3600 × 1800. https://svs.gsfc.nasa.gov/12021/
- Io, Europa, Saturno e anelli, Mercurio, Venere, Nettuno: mappe incorporate nei modelli **NASA Visualization Technology Applications and Development (VTAD)**. Risoluzioni native e URL di ogni modello sono in `assets/planets/manifest.json`. Per gli atlanti UV di Mercurio e Saturno è conservata la mappatura della geometria NASA.
- Nuvole terrestri: **NASA Earth Observatory / Reto Stöckli**, Blue Marble, mappa originale 2048 × 1024. https://science.nasa.gov/earth/earth-observatory/the-blue-marble-true-color-global-imagery-at-1km-resolution/

I metadati di provenienza sono in `sources/nasa/`; gli originali ad alta risoluzione sono nell'archivio opzionale indicato in `sources/nasa/LEGGIMI.md`. Sono applicati soltanto estrazione dai GLB, decodifica, ridimensionamento verso il basso e codifica PNG senza perdita. Non si applicano ricolorazione, upscaling o generazione di dettagli. Le sole forme, le disposizioni orbitali e gli effetti di illuminazione sono calcolati dal progetto.

Uso e crediti seguono le [NASA Images and Media Usage Guidelines](https://www.nasa.gov/nasa-brand-center/images-and-media/). GAIA è un progetto didattico indipendente: non è approvato, sponsorizzato o certificato da NASA, ESA, JPL o USGS. Le mappe rappresentano analoghi del Sistema Solare applicati a mondi immaginari; non sono osservazioni di quegli esopianeti.

## Matematica tipografica

MathJax, `vendor/mathjax`, licenza Apache 2.0 inclusa; usato nel rebuild delle tessere tipografiche e, dalla 1.21.0, dal sito per le formule dei capitoli del libro. Le figure SVG dei quesiti sono quelle già presenti nella V7, ricostruzioni dichiarate della dispensa, non nuove osservazioni.

I diagrammi dei capitoli del libro (`content/libro/fig`) sono compilati dalla dispensa di fisica del corso e contengono, come tracciati SVG, i contorni dei glifi dei caratteri della dispensa (URW Palladio L, AMS Euler, Computer Modern), nello stesso modo in cui li incorpora il PDF della dispensa già distribuito in `materials/`. Le licenze di questi caratteri ne consentono l'incorporamento nei documenti.

## Caratteri

L’atlante raster dei glifi deriva dai caratteri Inter, Noto Serif e DejaVu installati nell’ambiente di build. Sono inclusi soltanto i glifi raster necessari, le metriche e le note di licenza testuali, **non file TTF/OTF/WOFF**. La prosa delle lezioni usa i caratteri di lettura disponibili nel browser di build. Per ricomporre i documenti su un altro sistema è possibile scegliere famiglie locali con licenze adeguate.

## Riferimenti scientifici

Watson & Lovelock (1983) e Weber (2001): link e distinzioni nell’approfondimento `docs/SCIENTIFIC_MODEL.md`. Le loro pagine web non sono ripubblicate nel pacchetto.

## Riferimento visivo

Civilization: Beyond Earth è un riferimento estetico e organizzativo. Haegemonia: Legions of Iron (Digital Reality / Microids) ispira le famiglie planetarie; non sono distribuite texture, modelli, manuali o altri asset estratti dal gioco. GAIA è un progetto didattico autonomo, non affiliato a Firaxis/2K; non usa schermate del gioco come interfaccia.

## Geometrie aggiunte in 1.1.0

Le colonie Simbiosi, Esodo e Marea e i modelli del cosmo sono costruzioni procedurali originali del progetto, non estrazioni da Civilization. I file Blender e i generatori sono in `models/`; le superfici esportate e i loro hash sono in `assets/scenes/`. L'applicazione riusa la topologia approvata e implementa i materiali in GLSL per il tempo reale. Non sono impiegati ImageGen, texture IA, denoising IA o fondali prerenderizzati per le scene.
