# WebGL, Shaders & Animation Architecture

## 1. Hero 3D WebGL Scene (`HeroThree`)
- **Canvas**: Fixed full-viewport `<canvas className="webgl">` inside `.hero-three__frame`.
- **Three.js Scene Setup**:
  - PerspectiveCamera (FOV 35, near 0.1, far 100, position `[0, 0, 6]`).
  - WebGLRenderer with toneMapping = ACESFilmicToneMapping, outputColorSpace = SRGBColorSpace.
  - Equirectangular texture: `scene-gradient.webp` used for scene background and PMREM environment reflections.
  - Lights: AmbientLight (white, intensity 1.2), DirectionalLight (position `[3, 4, 5]`, intensity 0.05).
- **3D Model**:
  - Loaded via GLTFLoader: `/home/hero/logo.glb`.
  - Duplicate mesh group:
    - Primary mesh: MeshStandardMaterial (color `#ffffff`, metalness 1, roughness 0.4, envMapIntensity 1.2).
    - Secondary overlay mesh: Custom ShaderMaterial with refraction, noise distortion, Fresnel glass edge, and ripple click wave uniforms.
- **Scroll Interaction**:
  - Pinned with GSAP ScrollTrigger for 3500px scrub distance.
  - Camera rotates around the logo in an orbit while moving along Y.
  - Frame scales down (`scaleX` and `scaleY: 0.9`) with rounded border radius as it scrolls out of view.
- **Text Planes**:
  - Texture planes placed in 3D space (`text-name.webp`, `text-art-director-justified.webp`, `text-creative-developer-justified.webp`) that fade and scale depending on scroll progress.

## 2. Home Loader (`HomeLoader`)
- WebGL canvas rendering Guillaume Zhu's monogram SVG.
- GLSL fragment shader evaluates Perlin/simplex noise to dynamically reveal the logo from bottom to top, followed by a cut-out expansion transition into the 3D hero.

## 3. Pinned ScrollTrigger Sections
- **Manifesto**: Horizontal translation of letter elements (`.letter`) with staggered elastic easing.
- **Trajectory**: Sequential pin of text lines ("First / art direction / Then / front-end development / Today / I bridge / the two"). Background canvas with interactive image distortion.
- **Toolkit**: Circular wheel layout rotating through two decks:
  1. Frontend deck: JavaScript, Three.js, GLSL, GSAP, Vue.js, React, Webflow, Shopify.
  2. Art direction deck: Figma, Photoshop, Illustrator, InDesign, After Effects, CapCut, Lightroom, and Transition card.
  - 3D perspective flip card transforming Shopify into Figma.
  - Interactive hover bounce using elastic GSAP timeline.
- **Projects**:
  - Text titles split into individual letter elements.
  - Matter.js 2D physics engine calculates velocity springs for letter displacements when user scrolls quickly.
  - Letter hover triggers preview image popup cards with rotation tilt.
- **Next Section**:
  - SVG path animation along cubic Bézier curve (`M0.398438 611.016C...`).
  - Pulsing circular gradient orb tracks along the curve in sync with scroll progress.
  - Expanding circular `clip-path: circle(r at 50% 50%)` reveals the footer card.

## 4. Page Transition System
- Fixed overlay element `.page-transition` with dynamic curved border radius:
  `--page-transition-radius-x: min(60vh, 42vw)`, `--page-transition-radius-y: 60vh`.
- Transitions slide in from right to left (`xPercent: 100` -> `0` -> `-100`), or expand from center (`mode: 'circle'`).
- Respects page color palette (`cream` vs `dark`).
