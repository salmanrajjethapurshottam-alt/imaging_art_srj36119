ImagingArts — Personal 3D Model Library (Blender -> GLB)
--------------------------------------------------------
Place exported `.glb` models from Blender in this folder, e.g.:
  - camera.glb
  - cinematic_lens.glb
  - abstract_object.glb
  - imagingarts_logo.glb
  - product_model.glb
  - studio_tv.glb

Then register each model inside `src/data/models.ts` (`MODULAR_MODELS`).
Each model runs on its own isolated `THREE.AnimationMixer` and transform rules
without modifying existing 3D background animations or camera scrolling.
