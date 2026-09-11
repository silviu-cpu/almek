"""
Converteste meke.ifc in GLB pentru scena 3D din hero.
Geometria nu se modifica: IFC -> mesh-uri Blender -> export glTF.

Rulare (din radacina proiectului, in cmd):
  set IFC_SCALE=0.1
  C:\\Users\\barbu\\.tools\\blender-5.0.1\\blender.exe -b --factory-startup ^
      --python scripts/convert-ifc.py -- meke.ifc out\\structura-raw.glb
  npx @gltf-transform/cli@4 dedup out\\structura-raw.glb out\\structura-dedup.glb
  npx @gltf-transform/cli@4 meshopt out\\structura-dedup.glb public\\models\\structura.glb

IFC_SCALE=0.1: exportul IFC din SketchUp 2015 a iesit de 10x prea mare, desi
antetul declara milimetri; cu 0.1 casa masoara ~10.5 x 10.8 x 9.9 m.
Compresia foloseste DOAR `dedup` + `meshopt`: `optimize` ar rula si join /
flatten / instance, care unesc piesele si strica animatia pe piese.

Necesita `ifcopenshell` instalat in Python-ul din Blender:
  C:\\Users\\barbu\\.tools\\blender-5.0.1\\5.0\\python\\bin\\python.exe -m pip install ifcopenshell

Exportul IFC din SketchUp grupeaza piesele in cateva zeci de elemente; animatia
din hero lucreaza pe piese, asa ca fiecare element e despartit pe corpurile lui
solide (reprezentarile IfcFacetedBrep) cand biblioteca expune `item_ids`.
Langa GLB iese si o randare de control, cu sufixul -control.png.
"""
import collections
import math
import multiprocessing
import os
import sys

import bpy
import ifcopenshell
import ifcopenshell.geom
import ifcopenshell.util.shape
import mathutils

argv = sys.argv[sys.argv.index("--") + 1 :]
SRC, DST = (os.path.normpath(os.path.abspath(p)) for p in argv[:2])

for ob in list(bpy.data.objects):
    bpy.data.objects.remove(ob, do_unlink=True)

model = ifcopenshell.open(SRC)
print("SCHEMA:", model.schema, "| produse cu geometrie:", len(model.by_type("IfcProduct")))

settings = ifcopenshell.geom.settings()
# Geometrie in coordonatele proprii ale elementului + matricea lui separat: asa
# fiecare obiect isi pastreaza originea langa piesa, nu la originea proiectului.
for key in ("use-world-coords", "USE_WORLD_COORDS"):
    try:
        settings.set(getattr(settings, key, key), False)
        break
    except Exception:
        pass

_materials = {}


def material_for(style):
    """Un material Blender pe stil IFC, cu culoarea difuza a stilului."""
    name = getattr(style, "name", None) or "ifc-style"
    if name in _materials:
        return _materials[name]
    d = getattr(style, "diffuse", None)
    if d is None:
        rgb = (0.8, 0.8, 0.8)
    elif hasattr(d, "r"):
        rgb = (d.r(), d.g(), d.b())
    else:
        rgb = tuple(d)[:3]
    # Exportul IFC din SketchUp 2015 lasa culoarea stilurilor nedefinita (NaN);
    # un NaN ajuns in GLB opreste exportatorul glTF. Lemn natur in locul ei.
    if not all(math.isfinite(c) for c in rgb):
        rgb = (0.76, 0.62, 0.43)
    alpha = 1.0 - float(getattr(style, "transparency", 0.0) or 0.0)
    if not math.isfinite(alpha):
        alpha = 1.0
    mat = bpy.data.materials.new(name)
    mat.use_nodes = True
    bsdf = mat.node_tree.nodes.get("Principled BSDF")
    if bsdf:
        bsdf.inputs["Base Color"].default_value = (*rgb, 1.0)
        bsdf.inputs["Alpha"].default_value = alpha
    mat.diffuse_color = (*rgb, alpha)
    _materials[name] = mat
    return mat


def add_piece(name, verts, faces, face_mats, styles, matrix):
    """Creeaza un obiect din triunghiurile date, cu vertecsii reindexati compact."""
    used = sorted({v for f in faces for v in f})
    remap = {old: new for new, old in enumerate(used)}
    me = bpy.data.meshes.new(name)
    me.from_pydata([verts[i] for i in used], [], [[remap[v] for v in f] for f in faces])
    slots = {}
    for mi in face_mats:
        if mi not in slots and 0 <= mi < len(styles):
            slots[mi] = len(me.materials)
            me.materials.append(material_for(styles[mi]))
    if slots:
        me.polygons.foreach_set("material_index", [slots.get(mi, 0) for mi in face_mats])
    me.update()
    ob = bpy.data.objects.new(name, me)
    ob.matrix_world = matrix
    bpy.context.scene.collection.objects.link(ob)
    return ob


iterator = ifcopenshell.geom.iterator(settings, model, multiprocessing.cpu_count())
per_type = collections.Counter()
split_products = 0
pieces = 0
if iterator.initialize():
    while True:
        shape = iterator.get()
        element = model.by_id(shape.id)
        g = shape.geometry
        verts = ifcopenshell.util.shape.get_vertices(g).tolist()
        faces = ifcopenshell.util.shape.get_faces(g).tolist()
        mat_ids = list(g.material_ids) if len(g.material_ids) == len(faces) else [0] * len(faces)
        styles = list(g.materials)
        matrix = mathutils.Matrix(ifcopenshell.util.shape.get_shape_matrix(shape).tolist())
        base = f"{element.is_a()}-{element.Name or element.GlobalId}"

        item_ids = list(getattr(g, "item_ids", []) or [])
        if len(item_ids) == len(faces) and len(set(item_ids)) > 1:
            split_products += 1
            groups = collections.defaultdict(list)
            for fi, item in enumerate(item_ids):
                groups[item].append(fi)
            for n, (item, idx) in enumerate(groups.items()):
                add_piece(
                    f"{base}-{n}",
                    verts,
                    [faces[i] for i in idx],
                    [mat_ids[i] for i in idx],
                    styles,
                    matrix,
                )
                pieces += 1
        else:
            add_piece(base, verts, faces, mat_ids, styles, matrix)
            pieces += 1
        per_type[element.is_a()] += 1
        if not iterator.next():
            break

meshes = [o for o in bpy.context.scene.objects if o.type == "MESH"]
print("ELEMENTE PE TIP:", dict(per_type))
print("PIESE CREATE:", pieces, "| elemente despartite pe corpuri:", split_products)


def world_box(objs):
    """Gabaritul in coordonatele lumii (colturile bound_box trecute prin matrice)."""
    a = mathutils.Vector((1e18, 1e18, 1e18))
    b = -a
    for o in objs:
        for c in o.bound_box:
            w = o.matrix_world @ mathutils.Vector(c)
            a = mathutils.Vector(map(min, a, w))
            b = mathutils.Vector(map(max, b, w))
    return a, b


# Terenul: meke.ifc are sub casa o placa verde de ~267 x 177 m, care umfla
# gabaritul si ar deveni cea mai mare "piesa" din animatie. E recunoscut dupa
# forma, nu dupa nume (elementele exportate din SketchUp n-au nume): acopera
# cel putin jumatate din gabaritul total pe ambele axe orizontale si e aproape plat.
full_lo, full_hi = world_box(meshes)
full = full_hi - full_lo
terrain = []
for o in meshes:
    a, b = world_box([o])
    d = b - a
    if d.x >= 0.5 * full.x and d.y >= 0.5 * full.y and d.z <= 0.05 * full.z:
        terrain.append(o)
for o in terrain:
    a, b = world_box([o])
    print("TEREN ELIMINAT:", o.name, "| dim (m):", tuple(round(v, 2) for v in (b - a)))
    bpy.data.objects.remove(o, do_unlink=True)
meshes = [o for o in bpy.context.scene.objects if o.type == "MESH"]

# Scara: exportul IFC din SketchUp 2015 a iesit la alta scara decat modelul
# .skp, desi antetul declara corect milimetri. Factorul se da explicit, dupa
# ce gabaritul casei a fost masurat — nu se ghiceste.
IFC_SCALE = float(os.environ.get("IFC_SCALE", "1"))
if IFC_SCALE != 1.0:
    scale = mathutils.Matrix.Scale(IFC_SCALE, 4)
    for o in meshes:
        o.matrix_world = scale @ o.matrix_world
    print("SCARA APLICATA:", IFC_SCALE)

lo = mathutils.Vector((1e18, 1e18, 1e18))
hi = -lo
for o in meshes:
    for c in o.bound_box:
        w = o.matrix_world @ mathutils.Vector(c)
        lo = mathutils.Vector(map(min, lo, w))
        hi = mathutils.Vector(map(max, hi, w))
size = hi - lo
print("MESH-uri:", len(meshes), "| fete:", sum(len(o.data.polygons) for o in meshes))
print("GABARIT (m):", tuple(round(v, 3) for v in size), "| de la", tuple(round(v, 3) for v in lo))
print("MATERIALE:", len(bpy.data.materials))

# --- Diagnostic: valori invalide si piese izolate departe de restul ----------
import math


def finite(values):
    return all(math.isfinite(x) for x in values)


nan_verts = [o.name for o in meshes if not all(finite(v.co) for v in o.data.vertices)]
nan_mats = [o.name for o in meshes if not finite([x for row in o.matrix_world for x in row])]
nan_colors = [m.name for m in bpy.data.materials if not finite(m.diffuse_color)]
print("NaN IN VERTECSI:", len(nan_verts), nan_verts[:5])
print("NaN IN MATRICI:", len(nan_mats), nan_mats[:5])
print("NaN IN CULORI:", len(nan_colors), nan_colors[:5])

centers = []
for o in meshes:
    c = sum((o.matrix_world @ mathutils.Vector(b) for b in o.bound_box), mathutils.Vector()) / 8
    centers.append((o, c))
median = mathutils.Vector(
    [sorted(c[i] for _, c in centers)[len(centers) // 2] for i in range(3)]
)
print("MEDIANA CENTRELOR (m):", tuple(round(v, 2) for v in median))
for o, c in sorted(centers, key=lambda oc: -(oc[1] - median).length)[:15]:
    print(
        "DEPARTE: %-50s dist=%7.1fm dim=%s vertecsi=%d"
        % (o.name[:50], (c - median).length, tuple(round(x, 2) for x in o.dimensions), len(o.data.vertices))
    )
for o, c in sorted(centers, key=lambda oc: -len(oc[0].data.polygons))[:8]:
    print("GREU:    %-50s fete=%d dim=%s" % (o.name[:50], len(o.data.polygons), tuple(round(x, 2) for x in o.dimensions)))

def control_render(path, center, extent, direction):
    """Randare Workbench cu o camera pusa pe `direction` fata de `center`."""
    scene = bpy.context.scene
    scene.render.engine = "BLENDER_WORKBENCH"
    scene.display.shading.light = "STUDIO"
    scene.display.shading.color_type = "MATERIAL"
    scene.render.resolution_x, scene.render.resolution_y = 1200, 900
    cam = bpy.data.objects.new("Control", bpy.data.cameras.new("Control"))
    cam.data.clip_end = extent * 20
    scene.collection.objects.link(cam)
    scene.camera = cam
    cam.location = center + mathutils.Vector(direction).normalized() * extent * 1.6
    cam.rotation_euler = (center - cam.location).to_track_quat("-Z", "Y").to_euler()
    scene.render.filepath = path
    bpy.ops.render.render(write_still=True)
    bpy.data.objects.remove(cam, do_unlink=True)
    print("RANDARE:", path)


# Grupul principal: piesele cu centrul intre percentilele 10 si 90 pe fiecare axa.
# Gabaritul complet e umflat de obiectele ratacite, iar casa ar iesi un punct.
def pct(values, p):
    s = sorted(values)
    return s[min(len(s) - 1, int(len(s) * p))]


box_lo = mathutils.Vector([pct([c[i] for _, c in centers], 0.10) for i in range(3)])
box_hi = mathutils.Vector([pct([c[i] for _, c in centers], 0.90) for i in range(3)])
core = [o for o, c in centers if all(box_lo[i] <= c[i] <= box_hi[i] for i in range(3))]
print("GRUP PRINCIPAL:", len(core), "piese | intre", tuple(round(v, 1) for v in box_lo), "si", tuple(round(v, 1) for v in box_hi))
base = os.path.splitext(DST)[0]
try:
    control_render(base + "-grup.png", (box_lo + box_hi) / 2, max(box_hi - box_lo), (1, -1, 0.75))
    control_render(base + "-sus.png", (lo + hi) / 2, max(size), (0, 0, 1))
    control_render(base + "-lateral.png", (lo + hi) / 2, max(size), (0, -1, 0))
except Exception as exc:
    print("RANDARE ESUATA:", exc)

if os.environ.get("IFC_DIAG_ONLY"):
    sys.exit(0)

os.makedirs(os.path.dirname(DST), exist_ok=True)

# Randare de control, ca la conversia din .skp.
try:
    scene = bpy.context.scene
    scene.render.engine = "BLENDER_WORKBENCH"
    scene.display.shading.light = "STUDIO"
    scene.display.shading.color_type = "MATERIAL"
    scene.render.resolution_x, scene.render.resolution_y = 1200, 900
    center = (lo + hi) / 2
    cam = bpy.data.objects.new("Control", bpy.data.cameras.new("Control"))
    scene.collection.objects.link(cam)
    scene.camera = cam
    d = max(size) * 1.5
    cam.location = center + mathutils.Vector((d, -d, d * 0.75))
    cam.rotation_euler = (center - cam.location).to_track_quat("-Z", "Y").to_euler()
    scene.render.filepath = os.path.splitext(DST)[0] + "-control.png"
    bpy.ops.render.render(write_still=True)
    bpy.data.objects.remove(cam, do_unlink=True)
    print("RANDARE:", scene.render.filepath)
except Exception as exc:
    print("RANDARE ESUATA:", exc)

bpy.ops.export_scene.gltf(
    filepath=DST,
    export_format="GLB",
    export_yup=True,
    export_apply=True,
    export_cameras=False,
    export_lights=False,
)
print("EXPORT:", DST, os.path.getsize(DST) // 1024, "KB")
