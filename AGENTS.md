# AI Agents Operational Guide

Welcome to the Guillaume Zhu Portfolio clone codebase. This project utilizes an AI Agent coordination framework designed for high-fidelity creative development, 3D WebGL scenes, shader programming, and smooth scroll physics.

## Agent Context & Knowledge Base
All domain architecture, design system specifications, WebGL shader breakdowns, and development protocols are maintained within the [`.agents/context`](./.agents/context/) directory:

- **[System Architecture & Tech Stack](./.agents/context/architecture.md)**: Details on Next.js, Bun, libraries, and directory hierarchy.
- **[WebGL & Animation Architecture](./.agents/context/webgl-animations.md)**: Deep dive into Three.js 3D hero scene, shaders, GSAP ScrollTrigger pins, and Matter.js letter physics.
- **[Coding Conventions & Commit Protocol](./.agents/context/conventions.md)**: Code standards, performance best practices, and verification checklist.

## Agent Roles & Delegation
When sub-agents are spawned for specialized tasks:
1. **WebGL / 3D Engineer**: Implements Three.js canvas scenes, custom GLSL vertex/fragment shaders, and model loaders.
2. **Interactive Motion Developer**: Builds GSAP ScrollTrigger timelines, horizontal scroll pins, and Matter.js letter physics.
3. **UI / Component Engineer**: Crafts responsive navigation pills, project cards, playground sphere carousel, and dialogs.
4. **Documentation & QA Specialist**: Validates builds, cross-checks asset integrity, and maintains `docs/`.

Consult [`.agents/context/`](./.agents/context/) before implementing major architectural changes or altering core animations.
