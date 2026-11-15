"""Export GAIA's approved native Blender scenes as indexed runtime geometry.

Usage (Blender 4.3+):
  blender -b -t 8 --python tools/export_surfaces.py -- \
    --source-dir /path/to/approved/render --output-dir assets/scenes

Every surface is evaluated, including bevel/solidify modifiers and curve tubes.
No screenshot, rendered background, neural image or external texture is baked.
Output coordinates are WebGL right-handed XYZ: Blender (x,y,z) -> (x,z,-y).
"""
import argparse
import hashlib
import json
import math
import sys
from collections import defaultdict
from pathlib import Path

import bpy
import numpy as np
from mathutils import Vector
from mathutils.bvhtree import BVHTree

ROOT = Path(__file__).resolve().parents[1]
argv = sys.argv[sys.argv.index('--') + 1:] if '--' in sys.argv else []
parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--source-dir', type=Path, required=True)
parser.add_argument('--output-dir', type=Path, default=ROOT / 'assets/scenes')
parser.add_argument('--biomes', nargs='+', default=['simbiosi', 'esodo', 'marea'])
args = parser.parse_args(argv)
OUT = args.output_dir.resolve()
OUT.mkdir(parents=True, exist_ok=True)
MAX_VERTICES = 900000
KIND_NAMES = {1: 'terrain', 2: 'water', 3: 'flora', 4: 'architecture', 5: 'emissive'}


def webgl(p):
    return [round(float(p[0]), 6), round(float(p[2]), 6), round(float(-p[1]), 6)]


def transformed(array, matrix, normals=False):
    result = np.asarray(array, dtype=np.float64) @ np.asarray(matrix, dtype=np.float64).T
    if normals:
        result /= np.maximum(np.linalg.norm(result, axis=1, keepdims=True), 1e-12)
    result = result[:, [0, 2, 1]]
    result[:, 2] *= -1
    return result.astype('<f4')


def output_node(material):
    if material and material.use_nodes:
        outputs = [n for n in material.node_tree.nodes if n.type == 'OUTPUT_MATERIAL']
        return next((n for n in outputs if n.is_active_output), outputs[0] if outputs else None)
    return None


def volume_only(material):
    out = output_node(material)
    return bool(out and out.inputs['Volume'].is_linked and not out.inputs['Surface'].is_linked)


def classify(obj, material, emission):
    name, mat = obj.name.lower(), material.name.lower() if material else ''
    if emission > 0:
        return 5
    if 'superficie oceanica' in name or 'oceano con' in mat:
        return 2
    if any(s in name for s in ['flora a ventaglio', 'stelo', 'spora', 'coltura protetta', 'organismo costiero']):
        return 3
    if any(s in name for s in ['continente continuo', 'affioramento', 'ago di basalto']):
        return 1
    return 4


def material_values(obj, material):
    if not material:
        return [0.5, 0.5, 0.5, 1, 0, 0.8, 0, 4]
    color = tuple(material.diffuse_color)
    metal, rough, emission = 0.0, 0.7, 0.0
    p = next((n for n in material.node_tree.nodes if n.type == 'BSDF_PRINCIPLED'), None) if material.use_nodes else None
    if p:
        if not p.inputs['Base Color'].is_linked:
            color = tuple(p.inputs['Base Color'].default_value)
        metal = float(p.inputs['Metallic'].default_value)
        rough = float(p.inputs['Roughness'].default_value)
        emission = float(p.inputs['Emission Strength'].default_value)
        if emission > 0:
            color = tuple(p.inputs['Emission Color'].default_value)
    # Alpha remains opaque because these source surfaces use opaque BSDFs.
    return [float(color[0]), float(color[1]), float(color[2]), 1.0,
            metal, rough, emission, float(classify(obj, material, emission))]


def included(obj):
    if obj.type not in {'MESH', 'CURVE', 'SURFACE', 'FONT'} or obj.hide_render:
        return False
    # Scene prototypes are intentionally parked below the entire terrain.
    corners = [obj.matrix_world @ Vector(c) for c in obj.bound_box]
    if corners and max(p.z for p in corners) < -25:
        return False
    mats = [m for m in obj.data.materials if m]
    return not mats or not all(volume_only(m) for m in mats)


def geometry_parts(obj, depsgraph):
    evaluated = obj.evaluated_get(depsgraph)
    mesh = evaluated.to_mesh(preserve_all_data_layers=True, depsgraph=depsgraph)
    if not mesh:
        return []
    try:
        mesh.calc_loop_triangles()
        if not len(mesh.loop_triangles):
            return []
        count, loops = len(mesh.vertices), len(mesh.loops)
        xyz = np.empty(count * 3, np.float32)
        mesh.vertices.foreach_get('co', xyz)
        xyz = xyz.reshape(-1, 3)
        world = np.asarray(obj.matrix_world, dtype=np.float64)
        world_xyz = xyz @ world[:3, :3].T + world[:3, 3]
        position = world_xyz[:, [0, 2, 1]].astype('<f4')
        position[:, 2] *= -1
        loop_vertices = np.empty(loops, np.int32)
        mesh.loops.foreach_get('vertex_index', loop_vertices)
        corner_normals = np.empty(loops * 3, np.float32)
        mesh.corner_normals.foreach_get('vector', corner_normals)
        normal_matrix = np.linalg.inv(world[:3, :3]).T
        normals = transformed(corner_normals.reshape(-1, 3), normal_matrix, True)
        uv = np.zeros((loops, 2), dtype='<f4')
        if mesh.uv_layers.active:
            mesh.uv_layers.active.data.foreach_get('uv', uv.reshape(-1))
        loop_counts = np.empty(len(mesh.polygons), np.int32)
        mat_indices = np.empty(len(mesh.polygons), np.int32)
        mesh.polygons.foreach_get('loop_total', loop_counts)
        mesh.polygons.foreach_get('material_index', mat_indices)
        corner_material = np.repeat(mat_indices, loop_counts)
        values = np.asarray([material_values(obj, m) for m in mesh.materials] or [material_values(obj, None)], dtype='<f4')
        corner_material = np.minimum(corner_material, len(values) - 1)
        vertices = np.concatenate([position[loop_vertices], normals, uv, values[corner_material]], axis=1).astype('<f4')
        triangle_loops = np.empty(len(mesh.loop_triangles) * 3, np.int32)
        mesh.loop_triangles.foreach_get('loops', triangle_loops)
        triangle_loops = triangle_loops.reshape(-1, 3)
        triangle_material = np.empty(len(mesh.loop_triangles), np.int32)
        mesh.loop_triangles.foreach_get('material_index', triangle_material)
        parts = []
        for index in np.unique(triangle_material):
            mat = mesh.materials[index] if index < len(mesh.materials) else None
            if volume_only(mat):
                continue
            selected = triangle_loops[triangle_material == index]
            # Deduplication preserves all split normals, UV seams and material parameters.
            source = vertices[selected.reshape(-1)]
            unique, inverse = np.unique(source, axis=0, return_inverse=True)
            indices = inverse.reshape(-1, 3).astype('<u4')
            if np.linalg.det(world[:3, :3]) < 0:
                indices[:, [1, 2]] = indices[:, [2, 1]]
            kind = int(unique[0, 15])
            parts.append((kind, unique, indices.reshape(-1), mat.name if mat else 'default'))
        return parts
    finally:
        evaluated.to_mesh_clear()


def terrain_sampler(depsgraph):
    ground = bpy.data.objects.get('Continente continuo')
    assert ground is not None, 'Native terrain missing'
    evaluated = ground.evaluated_get(depsgraph)
    data = evaluated.to_mesh()
    try:
        vertices = [ground.matrix_world @ v.co for v in data.vertices]
        tree = BVHTree.FromPolygons(vertices, [list(p.vertices) for p in data.polygons])
    finally:
        evaluated.to_mesh_clear()
    def height(x, y):
        hit = tree.ray_cast(Vector((x, y, 100)), Vector((0, 0, -1)), 200)[0]
        assert hit is not None, f'Native terrain does not contain grid point {x},{y}'
        return float(hit.z)
    return height


def station_metadata(biome, height):
    if biome == 'marea':
        positions = [(-3, 1, .58), (3, -3, .58), (-9, -2, .58), (4, 5, .58)]
        label_heights = [8.3, 2.3, 2.3, 2.3]
        radii = [3.3, 2.4, 2.1, 2.6]
    elif biome == 'esodo':
        positions = [(-3, 1, .79), (9, -1, height(9, -1)), (-11, -4, height(-11, -4))]
        # Choose one native laboratory on the west/upper side of the city.
        platforms = [o for o in bpy.context.scene.objects if o.name.startswith('Basamento esagonale')]
        platform = min(platforms, key=lambda o: (o.location.x + 9) ** 2 + (o.location.y - 5) ** 2)
        positions.insert(2, tuple(platform.location))
        label_heights = [7.0, positions[1][2] + 4.6, positions[2][2] + 1.8, positions[3][2] + 1.0]
        radii = [5.2, 1.8, 1.8, 3.4]
    else:
        platforms = [o for o in bpy.context.scene.objects if o.name.startswith('Basamento esagonale')]
        desired = [(3, 1), (-3, -5), (-9, 1)]
        positions = [(-3, 1, .4)]
        for x, y in desired:
            platform = min(platforms, key=lambda o: (o.location.x - x) ** 2 + (o.location.y - y) ** 2)
            positions.append(tuple(platform.location))
        label_heights = [8.0] + [p[2] + 1.7 for p in positions[1:]]
        radii = [4.3, 1.8, 1.8, 1.8]
    return [{'index': i, 'position': webgl(p), 'labelPosition': webgl((p[0], p[1], label_heights[i])),
             'radius': radii[i]} for i, p in enumerate(positions)]


def biome_metadata(biome, depsgraph):
    height = terrain_sampler(depsgraph)
    plants = [o for o in bpy.context.scene.objects if included(o) and any(o.name.startswith(p) for p in ['Flora a ventaglio', 'Coltura protetta', 'Organismo costiero'])]
    plant_xy = [(float(o.location.x), float(o.location.y)) for o in plants]
    cells = []
    radius = 1.4
    water_level = -.12 if biome == 'marea' else None
    for row in range(25):
        for col in range(35):
            x = -3 + (col - 17 + .5 * (row % 2)) * math.sqrt(3) * radius
            y = 1 + (row - 12) * 1.5 * radius
            ground = height(x, y)
            wet = water_level is not None and ground < water_level
            visible = water_level if wet else ground
            vegetation = min(1.0, sum((px - x) ** 2 + (py - y) ** 2 < radius ** 2 for px, py in plant_xy) / 3)
            cells.append({'col': col, 'row': row, 'x': round(x, 6), 'y': round(visible, 6), 'z': round(-y, 6),
                          'groundY': round(ground, 6), 'wet': bool(wet), 'veg': vegetation})
    light = bpy.data.objects.get('Sole remoto')
    toward = light.matrix_world.to_3x3() @ Vector((0, 0, 1))
    fog = {'color': [.33, .40, .37] if biome != 'esodo' else [.57, .37, .20], 'density': .006, 'volumes': []}
    for obj in bpy.context.scene.objects:
        if obj.name.startswith('Banca di miasma'):
            fog['volumes'].append({'center': webgl(obj.location), 'scale': [float(obj.scale.x), float(obj.scale.z), float(obj.scale.y)],
                                  'color': [.24, .43, .23], 'density': .055, 'anisotropy': .25})
    return {'stations': station_metadata(biome, height),
            'grid': {'cols': 35, 'rows': 25, 'radius': radius, 'cells': cells},
            'vegetationCount': len(plants), 'vegetationInstances': {'plants': len(plants), 'parts': sum(1 for o in bpy.context.scene.objects if included(o) and any(o.name.startswith(p) for p in ['Flora a ventaglio', 'Stelo', 'Spora luminosa', 'Coltura protetta', 'Organismo costiero']))},
            'waterCount': sum(c['wet'] for c in cells), 'waterLevel': water_level,
            'light': {'direction': webgl(toward), 'color': list(light.data.color), 'intensity': float(light.data.energy)},
            'fog': fog, 'camera': {'eye': [26, 28, 38], 'target': [0, 1.8, -2], 'orthoScale': 49}}


def write_chunk(biome, kind, part_index, parts):
    vertices = np.concatenate([p[0] for p in parts]).astype('<f4')
    indices, offset = [], 0
    for vertex, index in parts:
        indices.append(index + offset)
        offset += len(vertex)
    indices = np.concatenate(indices).astype('<u4')
    assert len(vertices) < 1000000
    assert vertices.shape[1] == 16 and np.isfinite(vertices).all()
    assert indices.size % 3 == 0 and indices.max() < len(vertices)
    lengths = np.linalg.norm(vertices[:, 3:6], axis=1)
    assert np.max(np.abs(lengths - 1)) < .001, 'Invalid normals'
    name = f'{KIND_NAMES[kind]}-{part_index}'
    vpath, ipath = OUT / biome / f'{name}.f32', OUT / biome / f'{name}.u32'
    vpath.write_bytes(vertices.tobytes()); ipath.write_bytes(indices.tobytes())
    def relative(path):
        try:
            return str(path.relative_to(ROOT))
        except ValueError:
            return 'assets/scenes/' + str(path.relative_to(OUT))
    return {'id': biome + '-' + name, 'vertices': relative(vpath), 'indices': relative(ipath),
            'vertexCount': len(vertices), 'indexCount': len(indices), 'stride': 16, 'kind': kind,
            'bounds': {'min': vertices[:, :3].min(axis=0).tolist(), 'max': vertices[:, :3].max(axis=0).tolist()},
            'bytes': int(vertices.nbytes + indices.nbytes),
            'sha256': {'vertices': hashlib.sha256(vpath.read_bytes()).hexdigest(), 'indices': hashlib.sha256(ipath.read_bytes()).hexdigest()}}


def export_biome(biome):
    path = args.source_dir.resolve() / (biome + '.blend')
    assert path.is_file(), str(path)
    bpy.ops.wm.open_mainfile(filepath=str(path))
    depsgraph = bpy.context.evaluated_depsgraph_get()
    folder = OUT / biome
    folder.mkdir(exist_ok=True)
    for old in list(folder.glob('*.f32')) + list(folder.glob('*.u32')):
        old.unlink()
    groups = defaultdict(list)
    materials = {}
    object_count = 0
    for obj in bpy.context.scene.objects:
        if not included(obj):
            continue
        object_count += 1
        for kind, vertices, indices, material in geometry_parts(obj, depsgraph):
            groups[kind].append((vertices, indices))
            materials[material] = material_values(obj, bpy.data.materials.get(material))
    result = biome_metadata(biome, depsgraph)
    result['meshes'] = []
    for kind, parts in sorted(groups.items()):
        current, count, part_index = [], 0, 0
        for vertex, index in parts:
            if current and count + len(vertex) > MAX_VERTICES:
                result['meshes'].append(write_chunk(biome, kind, part_index, current))
                current, count, part_index = [], 0, part_index + 1
            assert len(vertex) <= MAX_VERTICES, 'Single object needs further split'
            current.append((vertex, index)); count += len(vertex)
        if current:
            result['meshes'].append(write_chunk(biome, kind, part_index, current))
    result['objectCount'] = object_count
    result['triangleCount'] = sum(m['indexCount'] // 3 for m in result['meshes'])
    result['vertexCount'] = sum(m['vertexCount'] for m in result['meshes'])
    result['bytes'] = sum(m['bytes'] for m in result['meshes'])
    result['materials'] = materials
    result['source'] = path.name
    result['sourceSHA256'] = hashlib.sha256(path.read_bytes()).hexdigest()
    assert len(result['grid']['cells']) == 875 and len(result['stations']) == 4
    (folder / 'manifest.json').write_text(json.dumps(result, ensure_ascii=False, separators=(',', ':')))
    print(json.dumps({'biome': biome, 'objects': object_count, 'meshes': len(result['meshes']), 'vertices': result['vertexCount'], 'triangles': result['triangleCount'], 'bytes': result['bytes'], 'plants': result['vegetationCount'], 'waterCells': result['waterCount']}), flush=True)
    return result


manifest_path = OUT / 'manifest.json'
manifest = json.loads(manifest_path.read_text()) if manifest_path.exists() else {
    'version': 1,
    'format': {'vertices': 'little-endian float32', 'indices': 'little-endian uint32', 'stride': 16,
               'layout': ['x', 'y', 'z', 'nx', 'ny', 'nz', 'u', 'v', 'r', 'g', 'b', 'a', 'metallic', 'roughness', 'emission', 'kind'],
               'colorSpace': 'linear', 'coordinates': 'world-space WebGL XYZ; Blender (x,y,z) -> (x,z,-y)'},
    'biomes': {}}
for biome in args.biomes:
    manifest['biomes'][biome] = export_biome(biome)
manifest_path.write_text(json.dumps(manifest, ensure_ascii=False, separators=(',', ':')))
print('GAIA_SURFACE_EXPORT_COMPLETE', str(manifest_path), flush=True)
