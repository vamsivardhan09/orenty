# Reference Site Analysis: persist.org

This document analyzes the technical architecture, visual techniques, and libraries observed on https://persist.org/ (and the captured reference screenshots) to inform the original implementation of Orenty (orenty.in). All techniques studied here are technical patterns only; all assets, text, copy, code, and shaders for Orenty are 100% original.

---

## 1. Hero Light-Beam & Starfield Architecture

### Observed Technique:
- **WebGL Rendering Engine:** Persist employs a custom lightweight WebGL canvas (OGL / low-overhead WebGL quad renderer) drawing full-screen procedural shader effects.
- **Shader Pipeline:**
  - **Vertex Shader:** Screen-aligned full-screen quad (`attribute vec2 position`, `attribute vec2 uv`, passing `vUv`).
  - **Fragment Shader:** Procedural volumetric ray marching / multi-layered ray casting with 2D hash noise (`Hash21`), periodic triangle functions, and HSV-to-RGB color transformation.
  - **Light Beam & Star Flare:**
    - Procedural flare rays: `smoothstep(0.0, 1.0, 1.0 - abs(uv.x * uv.y * 1000.0))` generating cross-shaped anamorphic flares.
    - Volumetric glow column: Inverse distance falloff `(0.05 * uGlowIntensity) / max(d, 0.001)` combined with vertical compression along the Y-axis to form a coherent vertical light beam.
    - Particle starfield: Multi-layer twinkling star points modulated by `uTime`, `uDensity`, and mouse repulsion coordinates (`uMouse`, `uMouseRepulsion`, `uMouseActiveFactor`).
  - **Color Grading:** Deep space palette dominated by near-black navy (`#07050f`), deep indigo/violet ambient glows, and high-intensity cyan/white core light.

### Orenty Technical Implementation Plan:
- Implement via **Three.js / React Three Fiber (`@react-three/fiber`)** with custom GLSL shaders.
- Create a layered system:
  1. **Background Starfield & Volumetric Nebula:** Custom shader plane with procedural stars (max 5,000 instanced particles or procedural GLSL), soft violet/indigo volumetric fog.
  2. **Central Light Beam:** GLSL cylinder / vertical plane with additive blending, volumetric soft edges, and cursor-reactive tilt and ease.
  3. **3D Extruded Orenty Logo Mark:** A real 3D extruded geometry derived from the SVG mark with glass/glow material, floating near the beam, tilting with mouse position, and catching the light.
  4. **Postprocessing:** Bloom and subtle vignette via `@react-three/postprocessing` (capped at DPR 1.5, gracefully paused when off-screen or tab hidden).

---

## 2. Scroll Behavior & Smooth Motion

### Observed Technique:
- **Libraries:** GSAP (`gsap`) + `ScrollTrigger`.
- **Motion Patterns:**
  - Pinned viewport stages during narrative transitions.
  - Parallax depth on background light layers vs. foreground content.
  - Smooth camera interpolation and element translation linked directly to scroll progress.

### Orenty Technical Implementation Plan:
- Use **Lenis (`lenis`)** for buttery smooth inertia scrolling across desktop browsers.
- Integrate **GSAP ScrollTrigger** synchronized with Lenis ticker.
- Implement scroll-linked scene progression:
  - Hero: Camera smoothly tilts and pulls back as user scrolls down.
  - Section reveals: Cards and HUD elements rise with staggered spring ease.
  - Reduced motion check: When `prefers-reduced-motion: reduce` is detected, animations and smooth-scroll snaps are replaced with standard instantaneous transitions.

---

## 3. Glass Cards & Surface Treatments

### Observed Technique:
- **Visual Style:**
  - Frosted glass cards with high background blur (`backdrop-filter: blur(16px)` to `blur(24px)`).
  - Semi-transparent dark surfaces (`rgba(8, 10, 22, 0.6)` to `rgba(15, 18, 35, 0.7)`).
  - Razor-sharp 1px outer borders with gradient strokes: light top/left edge (`rgba(255, 255, 255, 0.15)`), fading to dark bottom/right edge (`rgba(255, 255, 255, 0.03)`).
  - Interactive spotlight: Mouse move listener dynamically updates CSS custom properties (`--mouse-x`, `--mouse-y`) to render a soft radial gradient highlight on hover.

### Orenty Technical Implementation Plan:
- Build reusable `GlassCard` and `GlassSurface` components in Tailwind CSS.
- Add dynamic cursor-following spotlight (`radial-gradient(circle 300px at var(--mouse-x) var(--mouse-y), rgba(139, 92, 246, 0.15), transparent 70%)`).
- Gentle 3D perspective tilt on hover using CSS `transform: perspective(1000px) rotateX(...) rotateY(...)`.

---

## 4. Text Reveals & Typography

### Observed Technique:
- **Display Typography:** High-contrast geometric headings, generous letter-spacing on subheadings, compact body text.
- **Reveal Mechanics:**
  - Words or lines wrapped inside `overflow: hidden` mask containers.
  - GSAP `fromTo` translating lines from `translateY(110%)` with opacity fade to `translateY(0%)`.
  - Subtle stagger (0.04s - 0.08s between lines).

### Orenty Technical Implementation Plan:
- Implement a reusable `<TextReveal>` component leveraging GSAP / Framer Motion.
- Display Font: Wide geometric sans (matching the Orenty wordmark) paired with a clean, readable modern body font (Plus Jakarta Sans / Inter).
- Uppercase tracked labels (`tracking-widest text-xs uppercase text-violet-300/70`) for category metadata and division tags.

---

## 5. HUD Stat Boxes & Futuristic Accents

### Observed Technique:
- **HUD Detailing:**
  - Micro corner brackets (`┌ ┐ └ ┘`) positioned at top-left, top-right, bottom-left, bottom-right of statistic and feature modules.
  - Monospace or high-tech micro labels: e.g., coordinate tags, status indicators (`[STATUS: ACTIVE]`), glowing pulse dots.
  - High-precision data layout: Bold numerical metrics centered within bordered grid modules.

### Orenty Technical Implementation Plan:
- Create `<HudBox>` component with SVG or CSS-rendered micro corner brackets that glow when hovered or active.
- Incorporate live status badges (e.g. `[STATUS: BUILDING]`, `[DIVISION // 01]`) to maintain cinematic tech aesthetic while strictly adhering to honesty guidelines (no fake statistics).
