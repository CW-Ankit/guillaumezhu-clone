# Development Conventions & Quality Protocols

## General Guidelines
1. **Clean Code & Modern Practices**:
   - Strictly TypeScript typed.
   - Use Next.js App Router conventions (`app/page.tsx`, `app/layout.tsx`).
   - Follow semantic HTML5 with accessibility considerations (`role="status"`, `aria-label`, `aria-hidden="true"` where appropriate).
2. **Animation Performance**:
   - Use `will-change: transform` only where active animation is occurring.
   - Kill GSAP timelines and ScrollTrigger instances on component unmount (`useGSAP` or cleanup functions).
   - Cancel `requestAnimationFrame` loops in Three.js and canvas scenes when offscreen or unmounted using IntersectionObserver.
3. **Responsive Design**:
   - Fluid typography with CSS `clamp()`.
   - Desktop and mobile layouts support landscape and portrait orientations.
   - Graceful fallback for touch devices (`pointer: coarse`).
4. **Git Commits**:
   - Semantic commit messages (`feat:`, `chore:`, `docs:`, `fix:`).
   - Verify build and linting before committing each major feature milestone.
