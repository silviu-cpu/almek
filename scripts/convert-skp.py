"""
Converteste structurainen4.skp in GLB pentru scena 3D din hero.
Geometria nu se modifica: doar import SketchUp -> export glTF.

Rulare (din radacina proiectului):
  C:\\Users\\barbu\\.tools\\blender-5.0.1\\blender.exe -b --factory-startup ^
      --python scripts/convert-skp.py -- structurainen4.skp out\\structura-raw.glb
  npx @gltf-transform/cli@4 dedup out\\structura-raw.glb out\\structura-dedup.glb
  npx @gltf-transform/cli@4 meshopt out\\structura-dedup.glb public\\models\\structura.glb

Compresia foloseste DOAR `dedup` + `meshopt`: `optimize` ar rula si join /
flatten / instance, care unesc piesele si strica animatia pe piese.

Necesita Blender 5.0.x portabil (pe o cale SCURTA — vezi mai jos) cu add-on-ul
SketchUp Importer 0.27 (RedHaloStudio/Sketchup_Importer) in portable/scripts/addons.
Langa GLB iese si o randare de control, cu sufixul -control.png.
"""
import os
import sys

import addon_utils
import bpy
import mathutils

argv = sys.argv[sys.argv.index("--") + 1 :]
# Cai Windows native (cu `\`): add-on-ul isi deduce folderul temporar pentru
# texturi taind calea dupa `\`, iar cu `/` lipea toata calea sub %TEMP%.
SRC, DST = (os.path.normpath(os.path.abspath(p)) for p in argv[:2])

# Add-on-ul isi citeste setarile din preferintele Blender, deci trebuie activat
# prin sistemul de add-on-uri, nu doar importat ca modul Python.
addon_utils.enable("sketchup_importer", default_set=True, persistent=True)
assert hasattr(bpy.ops.import_scene, "skp"), "importerul SketchUp nu s-a incarcat"

# Scena goala: fara cubul, camera si lumina implicite.
for ob in list(bpy.data.objects):
    bpy.data.objects.remove(ob, do_unlink=True)


def stats(tag):
    kinds = {}
    for o in bpy.data.objects:
        kinds[o.type] = kinds.get(o.type, 0) + 1
    inst = sum(1 for o in bpy.data.objects if o.instance_type == "COLLECTION" and o.instance_collection)
    in_scene = len(bpy.context.scene.objects)
    print(f"{tag}: obiecte={len(bpy.data.objects)} in_scena={in_scene} tipuri={kinds} instante={inst}")


# Prag de instantiere urias: fiecare componenta devine obiect real, nu referinta —
# animatia din hero muta fiecare piesa separat.
res = bpy.ops.import_scene.skp(
    filepath=SRC,
    scenes_as_camera=False,
    import_camera=False,
    max_instance=10**9,
)
print("IMPORT:", res)
stats("DUPA IMPORT")

insts = [o for o in bpy.context.scene.objects if o.instance_type == "COLLECTION" and o.instance_collection]
if insts:
    for o in bpy.context.scene.objects:
        o.select_set(False)
    for o in insts:
        o.select_set(True)
    bpy.context.view_layer.objects.active = insts[0]
    bpy.ops.object.duplicates_make_real(use_base_parent=True, use_hierarchy=True)
    stats("DUPA REALIZAREA INSTANTELOR")

meshes = [o for o in bpy.context.scene.objects if o.type == "MESH"]
lo = mathutils.Vector((1e18, 1e18, 1e18))
hi = -lo
for o in meshes:
    for c in o.bound_box:
        w = o.matrix_world @ mathutils.Vector(c)
        lo = mathutils.Vector(map(min, lo, w))
        hi = mathutils.Vector(map(max, hi, w))
size = hi - lo
print("MESH-uri in scena:", len(meshes), "| fete:", sum(len(o.data.polygons) for o in meshes))
print("GABARIT (m):", tuple(round(v, 3) for v in size), "| de la", tuple(round(v, 3) for v in lo))
print("MATERIALE:", [m.name for m in bpy.data.materials][:30])

os.makedirs(os.path.dirname(DST), exist_ok=True)

# Randare de control: modelul importat vazut din colt, ca verificare vizuala a
# conversiei. Camera e scoasa inainte de export.
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
except Exception as exc:  # randarea e doar pentru verificare; exportul conteaza
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
