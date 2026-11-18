ImagingArts — Modular Video Library
-------------------------------------
Place web-optimized videos in this folder, e.g.:
  - showreel.mp4 (H.264 baseline/high profile for universal Android + browser playback)
  - branding.mp4
  - product-ad.mp4
  - behind-scenes.mp4

Guidelines for Android & Mobile Compatibility:
  1. Prefer MP4 (H.264 + AAC) or WebM (VP9). Convert .mov files before adding.
  2. Compress videos appropriately and keep `autoplay` paired with `muted: true`.
  3. Register each video clip in `src/data/videos.ts` (`MODULAR_VIDEOS`).
