# In-Depth Reverse Engineering Breakdown

## 1. Hero 3D WebGL Shader Mechanics

The Hero section renders a 3D scene driven by Three.js and custom GLSL vertex and fragment shaders.

### Shaders:
1. **Vertex Shader (`Rt`)**:
   - Calculates vertex displacement: `vec3 displacedPosition = position + normal * uSurfaceOffset;`
   - Normalizes vertex normals and passes `vNormal`, `vPosition`, and `vScreenPosition` to fragment stage.
2. **Fragment Shader (`zt`)**:
   - **Fresnel Calculation**:
     ```glsl
     float facing = abs(dot(normal, viewDirection));
     float fresnel = pow(1.0 - clamp(facing, 0.0, 1.0), uFresnelPower);
     ```
   - **Simplex/Perlin Noise Reveal**:
     Uses a 3D hash-based pseudo-random noise function to create an organic reveal front.
   - **Click Wave & Ripple Distortion**:
     Calculates distance from click point `distanceToClick = distance(vPosition, uClickPosition)`.
     Propagates a sine-based wave damped over time:
     ```glsl
     float clickRipple = sin((warpedDistance * uClickWaveFrequency) - (clickElapsedTime * uClickWaveSpeed));
     ```
   - **Chromatic Aberration & Refraction**:
     Sample the offscreen scene render target `uSceneTexture` at displaced UVs with color separation:
     ```glsl
     float red = texture2D(uSceneTexture, distortedScreenUv + chromaticOffset).r;
     float green = texture2D(uSceneTexture, distortedScreenUv).g;
     float blue = texture2D(uSceneTexture, distortedScreenUv - chromaticOffset).b;
     ```

---

## 2. Pinned Scroll Choreography (GSAP ScrollTrigger)

### Hero Scroll Orbit
- Pinned from `top top` for 3500px scroll duration.
- On scrub:
  - Updates `uTime` and interactive hover uniforms.
  - Camera rotates around the logo in a 90-degree quadrant (`angle = -progress * PI / 2`).
  - Scales the surrounding `.hero-three__frame` into a rounded card container (`scaleX: clamp, scaleY: 0.9, borderRadius: 18px`).

### Manifesto Section
- Container pinned `top top`.
- Text is split into individual letters.
- As the user scrolls, letters fly out horizontally with randomized spring rotations (`rotation: (random - 0.5) * 60`).
- Container scales down and changes background color from cream to dark as it meets the Trajectory section.

### Toolkit Wheel & 3D Card Flip
- Pin duration: 600vh.
- Two overlapping wheel disks (`.toolkit__wheel--frontend` and `.toolkit__wheel--art-direction`).
- Each tool card is positioned around a circular perimeter (`transform-origin: 50%`, `rotation: slotIndex * 3.5deg`).
- Progress 0.0 -> 0.35: Frontend cards fan in sequentially with elastic bounce.
- Progress 0.35 -> 0.45: Transition card (Shopify / Figma) flips 180 degrees in 3D perspective.
- Progress 0.45 -> 0.8: Art direction wheel takes over and fans in its tools.
- Progress 0.8 -> 1.0: Transition card expands smoothly with a cream reveal shader to fill the viewport.

### Projects Letter Spring Physics (Matter.js)
- Project titles ("memories of ghibli", "mirage", "pulse festival", "ornate", "maë webflow") are segmented into `<span class="project-letter">`.
- Matter.js creates rigid body rectangles for each letter, connected to their initial positions via damped elastic constraints (`stiffness: 0.005`, `damping: 0.004`).
- When the user scrolls rapidly, the scroll velocity is fed into the Matter.js physics engine, causing the letters to oscillate and wobble like jelly.
- On hover, letters part with a spring ease, and a floating preview image of the project pops into view with a tilt effect.

---

## 3. Next Section & Curvilinear Text Path

- Pinned for 500vh.
- An SVG contains a complex cubic Bézier curve (`#nextPath`).
- Text path `<textPath href="#nextPath">` renders:
  "If our visions align, let’s shape what’s next together"
- Text characters are progressively typed along the curve in direct proportion to scroll progress.
- An animated gradient orb (`#nextOrb`) follows the curve coordinates (`getPointAtLength`).
- At the climax, the orb docks in the center and expands into an animated circular clip-path (`clip-path: circle(r at 50% 50%)`) revealing the full-bleed footer.
