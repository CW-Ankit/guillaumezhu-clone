# Animations, Shaders & Physical Interactions

## 1. WebGL Shaders

### 1.1 Hero Refraction & Click Ripple Shader (`heroLogoShader`)

#### Vertex Shader
```glsl
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;
varying vec4 vScreenPosition;

uniform float uSurfaceOffset;

void main() {
    vUv = uv;
    vec3 displacedPosition = position + normal * uSurfaceOffset;
    vec4 modelPosition = modelMatrix * vec4(displacedPosition, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;
    vNormal = normalize(normal);
    vPosition = modelPosition.xyz;
    vScreenPosition = projectedPosition;
}
```

#### Fragment Shader
Key uniform parameters:
- `uSceneTexture`: Offscreen render target containing background and 3D environment.
- `uHoverProgress`: Damped hover intensity (`0.0` -> `1.0`).
- `uClickProgress`: Damped click wave impulse.
- `uClickPosition`: 3D coordinates on the mesh where the raycaster intersected.
- `uDistortionStrength`: Base refraction index offset.
- `uChromaticAberration`: Color splitting delta between RGB channels.
- `uFresnelPower`: Rim lighting falloff exponent.

---

### 1.2 Home Loader Noise Mask Shader (`homeLoaderShader`)
- Calculates a dynamic boundary using 3D simplex/Perlin noise.
- Smoothly masks the monogram logo texture from bottom to top.
- Transitions into a circular cut-out hole that reveals the underlying 3D hero canvas.

---

### 1.3 Transition Card Cream Reveal Shader (`creamRevealShader`)
- Used on the final card of the Art Direction deck in the Toolkit section.
- Expands an organic noisy cream boundary to fill the entire viewport, bridging the Toolkit section into the Projects section.

---

## 2. GSAP ScrollTrigger Configurations

| Section | Trigger Selector | Scrub Duration / Pin | Key Properties Animated |
| :--- | :--- | :--- | :--- |
| **Hero 3D** | `.hero-three` | 3500px / Pinned | Orbit angle, Camera Z, Frame scale & border radius |
| **Manifesto** | `.manifesto` | Horizontal scroll / Pinned | Letter X translate, Elastic Y & rotation |
| **Trajectory** | `.trajectory-sentences` | 1100vh / Pinned | Line reveal, split image panel translate, dark/cream interface color |
| **Toolkit** | `.toolkit` | 600vh / Pinned | Wheel rotation, card z-index, flip card rotation Y (0-180deg) |
| **Projects** | `.projects` | 360vh / Pinned | Title entrance, letter physics springs, hover popup preview cards |
| **Next / Footer** | `.next-section` | 500vh / Pinned | Bézier curve text path progress, orb coordinates, circular clip-path reveal |

---

## 3. Matter.js Spring Physics Mechanics
- **Physics World**: `Engine.create({ gravity: { x: 0, y: 0.5 } })`
- **Rigid Bodies**: Each letter in `.projects__link` is converted to a rectangle body.
- **Constraints**: Attached to anchor points `pointA: { x, y }` with `stiffness: 0.005` and `damping: 0.004`.
- **Scroll Coupling**:
  When scrolling rapidly:
  ```ts
  const velocity = scrollTrigger.getVelocity();
  bodies.forEach((b) => {
    b.anchor.pointA.y = b.initialY + velocity * 0.08 * letterWeight;
  });
  ```
- Yields a bouncy, organic physical reaction in typography that mimics elastic gel.
