# Guillaume Zhu Portfolio — System Architecture & Re-Engineering

## 1. Executive Summary
`guillaumezhu.com` is an award-winning creative development portfolio designed and built by Guillaume Zhu. It merges cutting-edge 3D WebGL scenes, shader programming, fluid typography, smooth scrolling physics, and interactive design systems into an extraordinary storytelling experience.

This documentation serves as a comprehensive reverse-engineering dissection of every component, shader, interaction, and route built within the portfolio.

---

## 2. Technology Stack & Modernization

### Core Technologies
| Area | Original Implementation | Clone Stack (Modernized) | Version |
| :--- | :--- | :--- | :--- |
| **Runtime & PM** | Vite / Static Build | Bun | `1.4.2+` (local `1.3.14`) |
| **Framework** | Vanilla HTML/ES Modules | Next.js App Router | `15.2.1` / `16.x` |
| **Language** | Modern JavaScript | TypeScript | `5.8.2` (Strict) |
| **Styles** | Custom CSS Variables + Scoped CSS | Tailwind CSS + Custom CSS Variables | `3.4.17` |
| **Smooth Scroll** | Studio Freight Lenis | Lenis | `1.3.26` |
| **Animation** | GSAP + ScrollTrigger + CustomEase | GSAP + ScrollTrigger + CustomEase | `3.15.0` |
| **3D Graphics** | Three.js | Three.js + GLTFLoader | `0.174.0` / `0.186.0` |
| **2D Physics** | Matter.js | Matter.js | `0.20.0` |

---

## 3. Route Architecture

The site consists of 10 distinct views:

1. `/` — **Homepage**
   - Interactive home loader with WebGL simplex noise cut-out
   - Hero 3D section with interactive glass refraction/ripple logo
   - Manifesto with horizontal character spring scrub
   - Trajectory narrative sequence with dual image panels and distortion
   - Toolkit 3D rotating wheel decks with flip card
   - Projects list with Matter.js letter velocity springs and image popups
   - Next section with SVG Bézier text path, orb follower, and circular footer reveal
2. `/projects/memories-of-ghibli/` — **Memories of Ghibli Case Study**
   - Horizontal pinned track with intro dual videos, context tags, cliff ellipse visual, interactive gallery slides, and up-next preview
3. `/projects/memories-of-ghibli/credits/` — **Credits & Licenses**
   - Categorized directory for 3D models (Sketchfab CC), audio, typography, and TMDB attributions
4. `/projects/mirage/` — **Mirage Fashion Art Direction**
   - Minimalist aesthetic, layered carousel previews, dreamlike mood visuals
5. `/projects/pulse-festival/` — **Pulse Festival**
   - Dark theme branding, poster grids, motion design, digital fluid compositions
6. `/projects/ornate/` — **Ornate Architecture Visual Identity**
   - Rose-gold grid accents, 3D classical sculptures, liquid typography
7. `/projects/mae-webflow/` — **Maë Webflow Case Study**
   - Vibrant gradients, glass-effect cards, Webflow interaction system
8. `/playground/` — **Playground (Creative Explorations)**
   - 3D spherical carousel with 24 interactive experiment cards (videos + webp images)
   - Live synchronization of active exploration metadata (title, year, tags)
9. `/contact/` — **Contact Page**
   - Minimal typography, availability badges, reactive 3D canvas backdrop
10. `/mentions-legales/` — **Legal Notice**
    - Multi-section publication, hosting (Vercel/OVH), intellectual property, and cookie information

---

## 4. Design System & CSS Variables

```css
:root {
  --color-cream: #f5e7df;
  --color-dark: #1f1d1d;
  --border-radius-block: 40px;
  --border-radius-card: 15px;
  --padding-min: 1rem;
  --letter-spacing-display: -0.025em;
  --page-transition-radius-x: min(60vh, 42vw);
  --page-transition-radius-y: 60vh;
}
```

### Font System
- **Cabinet Grotesk**: Variable font (`CabinetGrotesk-Variable.woff2`) for bold titles and large numerals.
- **Satoshi**: Variable font (`Satoshi-Variable.ttf`, `Satoshi-VariableItalic.ttf`) for body copy, navigational elements, and links.
