/** Construction styles of the stations and ships. Each discipline has its own colours and its own way of
 * building: mathematics uses faceted hulls and polyhedra, physics coils and antennas, chemistry pipes,
 * tanks and hazard stripes, biology smooth pods and green glass. The civil style is the one of the
 * traffic between systems (gates, freighters, passenger ships). */
export const hex = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16) / 255).concat(1);
const STYLES = {
    matematica: {
        key: 'matematica', name: 'Matematica', accent: hex('#f2b766'),
        hull: [.55, .54, .52, 1], dark: [.14, .13, .12, 1], steel: [.36, .35, .34, 1], trim: [.72, .55, .26, 1],
        glass: [.12, .1, .06, 1], window: [1, .8, .5, 1], panel: [.07, .08, .15, 1], seg: n => n <= 8 ? 6 : n <= 20 ? 8 : 12, facets: 1
    },
    fisica: {
        key: 'fisica', name: 'Fisica', accent: hex('#7fb2ff'),
        hull: [.5, .53, .57, 1], dark: [.12, .14, .17, 1], steel: [.32, .35, .4, 1], trim: [.62, .45, .22, 1],
        glass: [.05, .12, .18, 1], window: [.6, .85, 1, 1], panel: [.04, .08, .22, 1], seg: n => n, coils: 1
    },
    chimica: {
        key: 'chimica', name: 'Chimica', accent: hex('#b49cff'),
        hull: [.52, .5, .54, 1], dark: [.13, .12, .15, 1], steel: [.34, .33, .37, 1], trim: [.85, .7, .15, 1],
        glass: [.1, .06, .16, 1], window: [1, .76, .52, 1], panel: [.06, .07, .18, 1], seg: n => n, pipes: 1
    },
    biologia: {
        key: 'biologia', name: 'Biologia', accent: hex('#6fd3a0'),
        hull: [.56, .57, .53, 1], dark: [.11, .14, .12, 1], steel: [.34, .37, .35, 1], trim: [.6, .5, .3, 1],
        glass: [.16, .42, .26, 1], window: [.8, 1, .7, 1], panel: [.05, .1, .12, 1], seg: n => Math.round(n * 1.4), smooth: 1
    },
    civile: {
        key: 'civile', name: 'Traffico civile', accent: hex('#ff9466'),
        hull: [.52, .52, .52, 1], dark: [.14, .14, .14, 1], steel: [.35, .35, .37, 1], trim: [.9, .75, .2, 1],
        glass: [.06, .1, .14, 1], window: [1, .82, .55, 1], panel: [.05, .09, .2, 1], seg: n => n, civil: 1
    },
    // Defence fleet (1.47.0): blue-grey armour, dark keels, red trim and shields in pale blue.
    difesa: {
        key: 'difesa', name: 'Flotta di difesa', accent: hex('#e8665a'),
        hull: [.4, .43, .47, 1], dark: [.1, .11, .13, 1], steel: [.29, .31, .34, 1], trim: [.78, .24, .2, 1],
        glass: [.05, .08, .12, 1], window: [1, .62, .45, 1], panel: [.04, .07, .14, 1], seg: n => n, armour: 1
    }
};
export const DISCIPLINE_STYLES = ['matematica', 'fisica', 'chimica', 'biologia'];
/** Style by key; `field` is the colour of the gate field, which takes the discipline of its system. */
export function style(key, field = null) { const s = STYLES[key]; return field ? { ...s, field } : s; }
/** The styles of the stations and ships of the catalogue; the defence style is used only by the fleet. */
export const STYLE_KEYS = ['matematica', 'fisica', 'chimica', 'biologia', 'civile'];
export const DEFENCE_STYLE = 'difesa';
