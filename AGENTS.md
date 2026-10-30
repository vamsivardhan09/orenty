# MASTER BUILD BRIEF: ORENTY (orenty.in)

Role: product engineer + senior front-end engineer + UI/UX and motion
designer + 3D/shader artist. Build the complete Orenty website in this empty,
already-cloned repo. Work autonomously through every phase. Do not ask me
questions; use the defaults and placeholders in this brief. Self-review with
screenshots after each phase.

## 0. SETUP AND INPUTS
ATTACHMENTS IN THIS MESSAGE:
(a) The Orenty logo image: one picture containing two versions side by side
    (black-on-white left, white-on-black right).
(b) Screenshots of the reference website https://persist.org/.
Do this first:
- Save the screenshots to /reference/persist/. They are visual reference only.
- Split the logo image into its two versions. Remove backgrounds so each is a
  transparent file. Trace to clean SVG if possible (vectorizer tool, then
  svgo), and verify edges at 4x zoom. Save to /public/brand/ as:
  orenty-logo-white.svg (full logo, for dark backgrounds),
  orenty-logo-black.svg, orenty-mark-white.svg (the icon alone, without text).
  Never redraw or alter the logo's shapes.
- Generate favicon, apple-touch-icon and Open Graph image from the mark.
- Save this entire brief to /AGENTS.md. Work on a git branch and commit after
  each phase.

SKILLS AND TOOLS TO USE (install or enable whatever is available; if
something isn't available, continue without it):
- Frontend design skill (distinctive, non-template UI)
- Three.js / React Three Fiber skill; GSAP / ScrollTrigger skill
- A documentation tool (e.g. Context7) so you use CURRENT library APIs
- Browser tool: to inspect the reference site, screenshot your own pages at
  desktop and mobile sizes, and verify visually
- Playwright for end-to-end checks; Lighthouse CLI for benchmarks
- An SVG tracing/optimizing tool (potrace, svgo) for the logo

REFERENCE SITE ANALYSIS: open https://persist.org/ in the browser. Inspect
its page, scripts and network calls, and compare against the screenshots.
Write /docs/reference-notes.md listing exactly which techniques and libraries
produce: the hero light-beam/starfield, the scroll behavior, the glass cards,
the text reveals, the HUD stat boxes. Study TECHNIQUES ONLY. Never copy their
text, logos, names, images, code or assets. Everything on our site is original.

## 1. ABOUT ORENTY
Orenty builds software and AI for businesses, builds its own products, and
runs a Startup Lab where people solve startup-idea challenges; the best
contributors form a team and can earn ownership in the product they help
build. Tagline (placeholder): "Build what's next."
Three divisions:
1. Orenty Software Solutions: software development, web development, AI
   automation, growth strategy (for client businesses)
2. Products: SyncedIn, Fanbase, Job Pilot, Pujari.ai
3. Startup Lab
The single call to action across the site is "Apply". English only.
There is NO investors page or section anywhere.

## 2. STACK
Next.js (App Router) + TypeScript, Tailwind CSS, three, @react-three/fiber,
@react-three/drei, @react-three/postprocessing, gsap + ScrollTrigger, lenis,
framer-motion. Deploy target: Vercel.

## 3. CONTENT RULES (STRICT)
All copy and data live in /content/site.ts as typed objects. Components only
read from it. Adding a product or service must mean editing only that file.

Products (draft pitches, editable, all status "building"):
- SyncedIn: "An AI-powered network that connects people to the right people." accent violet
- Fanbase: "A home for creators and their communities." accent pink
- Job Pilot: "AI that tailors your resume and prepares you for interviews." accent cyan
- Pujari.ai: "Your AI guide for puja, panchangam and mantras." accent amber
Shape: { slug, name, tagline, description, features[], accentColor,
status: "live" | "building" | "idea", ctaLabel, ctaUrl }. Show honest status badges.

Services: Software Development, Web Development, AI Automation, Growth
Strategy (title, 1-line description, 3 bullets each).

HONESTY RULE: never invent users, revenue, clients, logos, testimonials,
awards or statistics. Use visibly marked placeholders or omit the element.

## 4. DESIGN DIRECTION
- Dark cinematic: near-black navy, violet/indigo glow, one accent color per
  product. Premium, minimal, generous space.
- Typography: one wide geometric display font matching the wordmark's
  letterforms (free font via next/font) + one clean body font. Huge
  headlines, small muted body text.
- Logo: white version on dark backgrounds. The mark is a rounded square with
  two diagonal cuts forming an upward arrow; the wordmark is wide geometric
  uppercase.
- Hero: full-screen WebGL light beam over a starfield with volumetric glow,
  bloom and subtle fog (custom GLSL + postprocessing). Beam and particles
  ease toward the cursor. Max 5,000 particles.
- Hero signature moment: extrude the logo mark into a light 3D object (glass
  or glowing material, simple extruded SVG geometry) floating near the beam,
  tilting with the cursor.
- Loading screen: the mark draws itself (stroke/mask), then reveals the hero.
- Glass cards (blur, 1px light border), cursor-following spotlight on hover,
  gentle 3D tilt. HUD info boxes with corner brackets.
- Custom cursor (dot + ring that grows on interactive elements), magnetic
  buttons, line-by-line text reveals (GSAP), Lenis smooth scroll,
  scroll-linked camera/scene shifts on the home page.
- Product pages apply that product's accent color to the 3D scene and glows.
- Lab challenge board: tile grid with slow ambient drift + pause control.
- Decorative 3D icons: pre-rendered images or very light geometry only.

## 5. ROUTES
Navbar: Orenty logo (SVG), links Software, Products, Lab, Apply. Shared footer.
/  : hero > "What we are" (3 division cards) > Products (4 cards) > Lab teaser
     (drifting tiles) > final Apply CTA
/software : services, process (Discover > Design > Build > Grow), client contact form
/products and /products/[slug] : pitch, features, status badge, CTA/waitlist
/lab : how it works (idea > challenge > submissions > team > ownership),
       challenge board (clearly marked placeholder challenges), ownership text
/apply : name, email, portfolio/GitHub link, which challenge or idea,
         solution link or description, why you. Validation + success state.
Ownership wording: "The best contributors can earn ownership in the product
they help build. Terms are set per challenge." Never promise specific equity.

## 6. FORMS AND BACKEND
Forms post to Next.js API routes. Store in Supabase if env vars exist
(create /supabase/schema.sql); otherwise log server-side and return success.
Provide /.env.example. No secrets in git. Honeypot field + rate limiting.

## 7. BENCHMARKS (measure on a production build; fix until met)
- Lighthouse mobile: Performance >= 85, Accessibility >= 95, Best Practices
  >= 95, SEO >= 95
- LCP < 2.5s, CLS < 0.1, TBT < 200ms
- Initial JS per route < 200 KB gzipped excluding the lazy 3D chunk;
  3D chunk < 600 KB gzipped
- Hero scene: >= 55 fps desktop, >= 30 fps mobile profile; < 100 draw calls;
  < 200k triangles; textures <= 2048px
- Must run smoothly on an 8GB RAM laptop with basic integrated graphics
- Canvas lazy-loaded, paused when off-screen or tab hidden; dpr capped at
  1.5; geometries/materials disposed on unmount
- prefers-reduced-motion respected; mobile and low-power devices get a static
  gradient hero and reduced particles
- Keyboard focus visible, semantic HTML, alt text, AA contrast
- Metadata, Open Graph, sitemap.xml, robots.txt for orenty.in
- next build and lint: zero errors. Test every route and both forms.
If a benchmark can't be met, report the real number honestly.

## 8. PHASES (do all; screenshot desktop + mobile and self-review between each)
1 inputs: save assets, process logo, reference analysis notes
2 scaffold, content file, navbar/footer, Lenis, cursor, loading screen
3 hero shader + 3D logo + cursor reaction; fix visual/perf issues before moving on
4 rest of home page + scroll animations
5 /software, /products, /products/[slug]
6 /lab, /apply, API routes, Supabase SQL
7 polish, responsive pass, accessibility, SEO
8 run benchmarks, write README (run locally, edit content, add a product, set
  env vars, deploy to Vercel on orenty.in)

## 9. FINAL REPORT
What was built; a benchmark table (measured vs target); how to run locally;
placeholders I must replace (contact email, product links, pitches,
statuses); known issues.
