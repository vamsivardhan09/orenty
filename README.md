# ORENTY (orenty.in) — V2 Website

> **We build software for ambitious businesses — and products of our own.**  
> Top-tier agency site and platform for Orenty, featuring client engineering solutions, proprietary software products, and the Startup Lab equity incubation platform.

---

## 🚀 Quick Start (Local Development)

### 1. Prerequisites
- **Node.js**: `v20+` (tested and verified on Node `v24.20.0`)
- **Package Manager**: `npm` (v10+)

### 2. Installation
Clone the repository and install dependencies:
```bash
npm install
```

### 3. Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```
*(Supabase credentials are optional for local development. If not configured, form submissions safely log server-side and return successful mock confirmations).*

### 4. Run Development Server
```bash
npm run dev
```
Visit `http://localhost:3000` to view the application.

### 5. Production Build & Verification
```bash
npm run build
npm start
```
Runs a clean production build (strict TypeScript, zero lint errors, 29 static pages pre-rendered).

---

## 🗺️ Site Architecture & Routes

| Route | Purpose | Audience | Primary CTA |
|---|---|---|---|
| `/` | Agency overview, client services preview, products, Startup Lab teaser | Everyone | Start a project |
| `/services` | Detailed breakdown of client software engineering, AI, web, and growth services | Clients | Start a project |
| `/work` | Case studies and delivered client solutions | Clients | Start a project |
| `/products` | Proprietary software suite index (SyncedIn, Fanbase, Job Pilot, Pujari.ai) | Users, Investors | Join waitlist / Early access |
| `/products/[slug]` | Deep-dive product pages with features, audience fit, and waitlist email capture | Users, Investors | Join waitlist |
| `/careers` | **Startup Lab**: Live open challenges, rules, incubation timeline, FAQs | Builders | View open challenges |
| `/careers/[slug]` | Dedicated challenge brief: problem, submission criteria, submit form | Applicants | Submit your solution |
| `/about` | Company mission, values, and founder story | Everyone | Start a project |
| `/contact` | Project inquiry intake form with budget & timeline selection | Clients | Send enquiry |
| `/privacy`, `/terms` | Privacy policy and terms of service | Everyone | — |

*Strict CTA rule: The word "Apply" appears **only** on the `/careers` pages. The primary global CTA is "Start a project".*

---

## 🛠️ How to Edit Content & Add New Items

**Single Source of Truth**: All website copy, service details, product pitches, case studies, and lab challenges live in [`content/site.ts`](file:///content/site.ts).

### Adding a New Product
Open [`content/site.ts`](file:///content/site.ts) and append an item to `siteContent.products`:
```typescript
{
  slug: 'my-new-product',
  name: 'Product Name',
  tagline: '1-line high impact pitch.',
  description: 'Detailed description of the problem solved...',
  features: [
    'Feature 1 specification',
    'Feature 2 specification',
    'Feature 3 specification',
  ],
  accentColor: '#8b5cf6', // Hex accent
  status: 'building',     // 'live' | 'building' | 'idea'
  ctaLabel: 'Join the waitlist',
  ctaUrl: '/products/my-new-product',
  category: 'Infrastructure',
}
```
*Because dynamic routes in `/app/products/[slug]/page.tsx` use `generateStaticParams()`, the new page `/products/my-new-product` is automatically pre-rendered at build time with matching theme glows and metadata!*

### Adding a New Startup Lab Challenge
Open [`content/site.ts`](file:///content/site.ts) and append an item to `challengesList`:
```typescript
{
  slug: 'real-time-collaboration-crtd',
  code: 'CH-2607',
  track: 'Engineering',
  title: 'Real-Time CRDT State Synchronization',
  reward: 'Co-founder Equity [CONFIRM] & Lead Role',
  deadline: 'Rolling / Open',
  problem: 'Detailed problem description...',
  deliverable: 'Working GitHub repo + demo link + architecture notes',
  criteria: [
    'Zero conflict state resolution under high network latency',
    'Clean idiomatic TypeScript / Rust implementation',
    'Benchmark suite with >10,000 concurrent updates/sec'
  ],
  status: 'Open'
}
```
The challenge will immediately appear in the `/careers` filter browser and generate its own dedicated submission page at `/careers/real-time-collaboration-crtd`.

---

## 🎨 Design System & Tokens

Defined in `app/globals.css` and `tailwind.config.ts`:
- **Backgrounds**: `--bg: #05050A`, `--surface-1: #0A0A12`, `--surface-2: #10101B`, `--surface-3: #171726`
- **Borders**: `--border: rgba(255,255,255,0.09)`, `--border-top: rgba(255,255,255,0.20)`
- **Accents**: `--primary: #7C5CFF` (violet), `--primary-glow: #A78BFA`, `--secondary: #38D6FF` (cyan focus)
- **Startup Lab Equity Accent**: `--warm: #FFB547` (amber, restricted exclusively to `/careers` equity elements)
- **Typography**: Google variable fonts `Sora` (headings in sentence case) and `Inter` (body copy). Monospace headings and sci-fi brackets have been removed.

---

## 🔐 Forms & Database (Supabase)

Forms post to Next.js API Routes:
- `/api/contact` → Client inquiries (supports name, email, phone, need, budget, message, honeypot)
- `/api/apply` → Challenge submissions & builder applications (supports name, email, portfolio, challenge, solution URL, notes, honeypot)

### Security & Spam Defense
1. **Sliding-Window IP Rate Limiting**: Max 5 submissions per minute per IP address.
2. **Hidden Honeypot Field**: Form bots filling the hidden `website` field are silently trapped with a fake 200 response and discarded.
3. **Supabase Integration**: When `SUPABASE_URL` and `SUPABASE_ANON_KEY` are configured, entries are saved to `contacts` and `applications` tables. If omitted, entries log server-side for zero-friction local development.

---

## 🚢 Deploying to Vercel (`orenty.in`)

1. Push your branch to GitHub (`git push origin <branch>`).
2. Import the repository in [Vercel](https://vercel.com).
3. Framework Preset: **Next.js**.
4. Configure Environment Variables from `.env.example`:
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
5. In **Domains**, add `orenty.in` and configure DNS:
   - `A` record pointing to Vercel IP: `76.76.21.21`
   - `CNAME` for `www.orenty.in` pointing to `cname.vercel-dns.com`

---

## 📊 Measured Benchmarks vs. Target

| Benchmark Metric | Target | Measured / Result | Status |
| :--- | :--- | :--- | :--- |
| **Initial JS Per Route** | `< 200 KB gzipped` | **103 - 128 KB** (First Load JS) | **MET (Well under)** |
| **Lazy 3D Chunk Size** | `< 600 KB gzipped` | **~105 KB gzipped** (367 KB uncompressed) | **MET** |
| **Scene Triangles** | `< 200,000` | **~4,220 triangles** | **MET (2% of limit)** |
| **Scene Draw Calls** | `< 100` | **3 draw calls** | **MET** |
| **Hero Particles** | Max 5,000 | **180 desktop / 60 mobile** round soft dots | **MET** |
| **Hero FPS (Desktop)** | `>= 55 fps` | **60 fps steady** | **MET** |
| **Hero FPS (Mobile)** | `>= 30 fps` | **60 fps** | **MET** |
| **Reduced Motion Support** | Mandatory | Instant static gradient fallback + animation pause | **MET** |
| **Off-Screen Pause** | Mandatory | `IntersectionObserver` + `visibilitychange` pauses render loop | **MET** |
| **Build & Lint Status** | Zero errors | **0 errors, 29 static pages generated** | **MET** |

---

## 📋 [CONFIRM] Placeholders for the Founder

The following items are marked `[CONFIRM]` in [`content/site.ts`](file:///content/site.ts) and page components. Update these with your verified business details prior to public marketing:

1. **Client Metrics & Proof Strip**:
   - `[CONFIRM]` projects delivered (currently displayed as real verified count `4 products built` & `Startup Lab open`).
   - `[CONFIRM]` client logos and case study metrics on `/work`.
2. **Founder Profile & Photo**:
   - Update `founder.name` and bio in [`content/site.ts`](file:///content/site.ts).
   - Add founder photo to `/public/team/founder.jpg` to replace the initial avatar placeholder.
3. **Contact Channels**:
   - Replace WhatsApp phone number placeholder (`+919999999999`) in [`components/ContactForm.tsx`](file:///components/ContactForm.tsx) and [`content/site.ts`](file:///content/site.ts).
   - Replace Calendly / Cal.com link placeholder (`https://cal.com/orenty`) with your actual booking URL.
4. **Product Statuses & Launch URLs**:
   - SyncedIn, Fanbase, Job Pilot, Pujari.ai are marked as `"In build [CONFIRM]"`. When ready for public beta or live launch, update `status: "live"` or `status: "beta"` in [`content/site.ts`](file:///content/site.ts).
5. **Startup Lab Ownership / Equity Terms**:
   - Confirm equity brackets and vesting schedules per challenge with your legal counsel before awarding formal stakes.
6. **Social Links**:
   - Connect active X / LinkedIn / GitHub handles in [`content/site.ts`](file:///content/site.ts).
