# CYDONIS LABS - Grumpy Bunny Viewer

An interactive three.js viewer of a grumpy, floppy-eared plush rabbit. The model is generated entirely in code: there is no mesh file.

## Running it

Open `index.html` in a modern browser. Everything it needs is in this folder, so it works offline straight from disk. The Google Fonts faces load when you are online; without a connection it falls back to system fonts.

WebGL 2 is required (any current Chrome, Edge, Firefox or Safari).

## Controls

| Input | Action |
| --- | --- |
| Drag | Orbit |
| Scroll / pinch | Zoom |
| Right-drag / two-finger drag | Pan |
| Click / tap the model | Poke it |
| `1` `2` `3` `4` | Front, side, back, three-quarter |
| `A` | Auto-rotate |
| `W` | Wireframe |
| `F` | Fur on or off |
| `R` | Reset view |

The panel adjusts grumpiness, pile length, fibre density, render layers, lighting preset and exploded view. Clicking a part in the Construction list frames the camera on it.

## How it is built

- **Geometry**: each part starts as a subdivided icosphere with seams welded, then is deformed by a shaping function. The ears are swept along a Catmull-Rom spline with a hand-built frame, so they fold over the head and hang to the feet.
- **Fur**: every furry part has an instanced shell mesh (8 to 24 layers) sharing the base geometry's buffers. The fragment shader hashes strands in 3D object space, so there is no pole pinching, and tapers them with height. Tips droop under gravity, and low-frequency noise adds clumping. Alpha-to-coverage softens the edges under MSAA.
- **Face, belly and soles**: drawn on 2D canvases in model units and projected along each part's local +z axis. A second canvas per decal acts as a pile-length mask, so the embroidery, nose and soles stay clear of fur and the muzzle reads as sheared shorter.
- **Lighting**: a custom wrap-diffuse, hemisphere ambient and fresnel sheen model, with ACES tone mapping. The four presets cross-fade.
- **Scale**: 3.0 model units = 32 cm sitting height. The dimension readout is measured from the transformed vertices, so it tracks the exploded view.

## Files

```
index.html                     the whole app (HTML, CSS, GLSL and JS)
vendor/three.min.js            three.js r147 (MIT)
vendor/OrbitControls.js        three.js r147 OrbitControls (MIT)
vendor/fontawesome.all.min.js  Font Awesome Free 6.5.1, JS/SVG build
vendor/LICENSE-three.txt
vendor/LICENSE-fontawesome.txt
```

r147 is the last three.js release that ships the non-module `examples/js` OrbitControls, which keeps the page loadable from `file://` without a build step or import maps.
