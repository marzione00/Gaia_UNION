# Native Blender surface geometry

These assets contain the evaluated meshes from the approved Simbiosi, Esodo and
Marea scenes. Curves, bevels, linked mesh copies and modifiers are resolved into
indexed triangles. No rendered image or external texture is used.

Regenerate with Blender 4.3 or newer from the release root:

```sh
blender -b -t 8 --python tools/export_surfaces.py -- --source-dir /path/to/gaia-direzioni-3d/render
```

Optional arguments: `--biomes simbiosi esodo marea` and `--output-dir assets/scenes`.
The three source files must be named `simbiosi.blend`, `esodo.blend` and
`marea.blend`. The exporter records their SHA-256 hashes in the manifest.

## Binary layout

`manifest.json` contains a `biomes` mapping. Each biome contains `meshes`, the
native camera and sun, fog metadata, four station anchors and a 35 × 25 logical
grid. A biome-local `manifest.json` duplicates that biome's metadata.

Each mesh is a little-endian Float32 vertex buffer and a little-endian Uint32
index buffer. One vertex occupies 16 floats / 64 bytes:

| Float offset | Components | Meaning |
| --- | --- | --- |
| 0 | 3 | World position |
| 3 | 3 | Unit split normal |
| 6 | 2 | Source UV, or zero when absent |
| 8 | 4 | Linear RGB and opaque alpha |
| 12 | 1 | Metallic |
| 13 | 1 | Roughness |
| 14 | 1 | Emission strength |
| 15 | 1 | Material kind |

Kinds: 1 terrain/rocks, 2 water, 3 vegetation, 4 architecture/metal/glass,
5 emissive. An emissive material stores its emission RGB in the color slot.
Unlinked Principled Base Color inputs are preserved; procedural color inputs
use the source material's mean diffuse color. Procedural surface modulation can
be applied by the runtime shader. Glass in these scenes uses an opaque metallic
BSDF and remains opaque here.

All coordinates already use the right-handed WebGL basis:
`(Blender X, Blender Z, -Blender Y)`. Render with an identity model transform.
Normals include the original object's inverse-transpose transform. Source
polygon winding is preserved, correcting reflected object transforms if needed.

Each chunk specifies buffer paths relative to the project root, vertex and index
counts, `stride: 16`, kind, bounds, total bytes and buffer SHA-256 hashes. Every
chunk has fewer than one million vertices.

## Scene metadata

- `stations`: `{index, position, labelPosition, radius}`. All positions use the
  runtime world basis and correspond to visible complexes.
- `grid`: `{cols: 35, rows: 25, radius: 1.4, cells: [...]}`. Cells contain
  `{col, row, x, y, z, groundY, wet, veg}`. `groundY` comes from ray-casting the
  evaluated native terrain. `y` is that height or the ocean surface for wet
  cells. `veg` is normalized local vegetation coverage, not an instance count.
- `vegetationCount` and `vegetationInstances.plants` count native plants or
  coastal organisms. `vegetationInstances.parts` also counts stems and spores.
- `waterCount` counts wet logical cells; `waterLevel` is null for dry scenes.
- `light.direction` points from the surface toward the native sun. Color and
  intensity use the original light's values.
- `fog` contains global color/density and ellipsoid miasma volumes. Volume-only
  objects are omitted from triangle buffers and should be rendered separately.
- `camera` stores the approved orthographic view in runtime coordinates.

Parked prototypes below the terrain, cameras, lights, hidden render objects and
volume-only surfaces are omitted from opaque geometry.

## Export totals

| Scene | Vertices | Triangles | Draw chunks | Native plants | Binary bytes |
| --- | ---: | ---: | ---: | ---: | ---: |
| Simbiosi | 263,555 | 389,980 | 4 | 206 | 21,547,280 |
| Esodo | 257,884 | 252,824 | 4 | 40 | 19,538,464 |
| Marea | 151,452 | 153,256 | 5 | 13 | 11,532,000 |
| Total | 672,891 | 796,060 | 13 | 259 | 52,617,744 |

All exports have 875 grid cells and four station anchors. Marea has 837 wet cells.
The exporter checks numeric finiteness, index ranges, normalized normals and
chunk bounds. The delivered buffers were also re-read independently to verify
counts, hashes, bounds, material kinds and grid completeness.
