// Visual families inspired by Haegemonia; source maps are external NASA products.
// These are fictional worlds using Solar System analogues, not surveyed exoplanets.
export const PLANET_TYPES = Object.freeze({
    terrestrial:{name:'Terrestre',texture:'earth',biome:'simbiosi',kind:1,atmosphere:[.11,.36,.81],clouds:true,ocean:true,solid:true},
    oceanic:{name:'Oceanico',texture:'earth-winter',biome:'marea',kind:2,atmosphere:[.10,.36,.78],clouds:true,ocean:true,solid:true},
    desert:{name:'Desertico',texture:'mars',biome:'esodo',kind:3,atmosphere:[.42,.24,.11],solid:true},
    rocky:{name:'Roccioso',texture:'mercury',biome:'esodo',kind:3,solid:true},
    barren:{name:'Craterizzato',texture:'moon',biome:'esodo',kind:3,solid:true},
    arctic:{name:'Glaciale',texture:'europa',biome:'marea',kind:2,solid:true},
    volcanic:{name:'Vulcanico',texture:'io',biome:'esodo',kind:4,solid:true},
    acid:{name:'Atmosfera acida',texture:'venus',biome:'esodo',kind:3,atmosphere:[.65,.40,.15],solid:true},
    gas:{name:'Gigante gassoso',texture:'jupiter',biome:null,kind:0,atmosphere:[.35,.28,.20],solid:false},
    ringed:{name:'Gigante con anelli',texture:'saturn',biome:null,kind:0,atmosphere:[.45,.37,.22],solid:false},
    icegiant:{name:'Gigante ghiacciato',texture:'neptune',biome:null,kind:0,atmosphere:[.08,.20,.68],solid:false}
});
