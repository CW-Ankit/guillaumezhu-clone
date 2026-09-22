# System Architecture & Tech Stack

## Overview
This project is an exact, high-fidelity study clone of `https://guillaumezhu.com/`, the portfolio of Guillaume Zhu (Creative Front-End Developer & Art Director).

## Core Technologies & Validated Versions
- **Runtime & Package Manager**: Bun (`bun v1.3.14+` / `v1.4.2` latest)
- **Framework**: Next.js 15+ / 16+ (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS + Custom CSS Variables
- **Smooth Scrolling**: Lenis (`v1.3.26`)
- **Animation Orchestration**: GSAP (`v3.15.0`) + ScrollTrigger + CustomEase
- **3D & WebGL Shaders**: Three.js (`v0.186.0`) with GLTFLoader and custom GLSL vertex/fragment shaders
- **Physics**: Matter.js (`v0.20.0`) for letter spring physics on project titles

## Design Tokens & Color Palette
```css
:root {
  --color-cream: #f5e7df;
  --color-dark: #1f1d1d;
  --border-radius-block: 40px;
  --border-radius-card: 15px;
  --padding-min: 1rem;
  --letter-spacing-display: -0.025em;
}
```

## Typography
- **Cabinet Grotesk**: Variable font for large display headings, manifesto, and project titles
- **Satoshi**: Variable font for body text, navigation pill, and metadata

## Directory Structure
```
├── .agents/
│   ├── context/          # Persistent domain context for AI subagents
│   └── skills/           # Reusable workflow scripts and skills
├── docs/                 # Extensive reverse-engineering documentation
├── public/
│   ├── brand/            # SVGs and logos
│   ├── fonts/            # Satoshi and Cabinet Grotesk font binaries
│   ├── home/             # Hero 3D model, textures, toolkit icons, trajectory bg
│   ├── projects/         # Project media, videos, previews, gallery images
│   ├── playground/       # 24 exploration videos, posters, webp images
│   └── shared/           # Common backgrounds and footer assets
├── src/
│   ├── app/              # Next.js App Router pages
│   ├── components/       # Layout, Home, WebGL, 3D Canvas, Project components
│   ├── hooks/            # Custom React hooks (useLenis, useGSAP, useMediaQuery)
│   ├── lib/              # Utilities, shader materials, physics engine helpers
│   └── types/            # TypeScript interfaces and data definitions
└── AGENTS.md             # Agents guide linking to .agents/context/
```
