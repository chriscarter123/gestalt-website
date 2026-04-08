# Gestalt Website — Project Overview

> Marketing landing page for the Gestalt platform.
> Deployed at: **gestalt-17ce0.web.app/** (root)

---

## What It Is

A static marketing website for Gestalt Technologies, Inc. — an AI-powered art discovery platform. The site showcases the platform's visitor-facing AR experience and curator tools, with pages for company info, careers, and contact.

---

## Repos

| Repo | Purpose |
|------|---------|
| `github.com/chriscarter123/gestalt-website` | **This repo** — static marketing site |
| `github.com/chriscarter123/gestalt` | Mobile AR viewer + iOS Capacitor build |
| `github.com/chriscarter123/Gestalt-Admin` | CMS — artwork/location management |
| `github.com/chriscarter123/gestalt-museum-dashboard` | Admin dashboard for museum owners |

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Markup | Semantic HTML5 |
| Styling | CSS3 (custom design system with CSS variables, glassmorphism, animations) |
| Scripting | Vanilla JavaScript (no frameworks) |
| Fonts | Outfit (sans-serif), Playfair Display (serif) via Google Fonts |
| Hosting | Firebase Hosting (gestalt-17ce0) |

---

## Project Structure

```
gestalt-website/
├── index.html           # Landing page — hero, visitor features, curator tools, CTA
├── about.html           # Company mission, vision
├── careers.html         # Open positions (4 roles)
├── contact.html         # Contact form + company info (wired to contactForm CF)
├── how-it-works.html    # Three-step explainer page
├── for-visitors.html    # Visitor-facing features page
├── for-institutions.html# Institutional/curator features page
├── ar-engine.html       # AR Engine technical overview
├── security.html        # Security & compliance page
├── documentation.html   # Documentation hub (placeholder)
├── api-reference.html   # API Reference (placeholder)
├── case-studies.html    # Case Studies (placeholder)
├── blog.html            # Blog (placeholder)
├── privacy.html         # Privacy Policy
├── terms.html           # Terms of Use
├── style.css            # Pentagon Art Direction design system
├── script.js            # Interactions: scroll reveal, hamburger, nav-scroll, bento mouse tracking
├── images/              # SVG icons, hero/feature PNGs
├── mural.jpg            # Hero section background image
├── hero.png             # Hero visual asset
├── firebase.json        # Hosting config (public: dist/)
├── .firebaserc          # Firebase project: gestalt-17ce0
└── dist/                # Production build output
```

---

## Pages

### `index.html` — Landing Page
- **Hero**: "Bridge the gallery and the digital" — two-column layout with Gestalt Lens AR scene (mural.jpg background, glassmorphic info pane with waveform, tracking anchors, focus reticle)
- **Marquee**: Kinetic text band — Visual Recognition, GPS Proximity, QR Scanning, Audio Guides, etc.
- **Features**: 6-card bento grid — AI Visual Recognition, GPS Proximity, QR Scanning, Audio Guides, Multi-Venue, ADA Compliant
- **How It Works**: 3-step cards — Point, Discover, Listen
- **CTA**: "Ready to see what you've been walking past?" with web app + iOS download
- **Footer**: Product, Company, Legal links

### `about.html` — Company & Team
- Mission and vision cards
- Team grid: 4 members with roles and avatars

### `careers.html` — Job Listings
- 4 open positions with location, type, and description
- CTA linking to contact page

### `contact.html` — Contact Form
- Two-column layout: contact info (email, address) + form (name, email, institution, message)
- Submits via `fetch` POST to `contactForm` Cloud Function (Nodemailer → Namecheap SMTP → hello@gestalt.gallery)
- Inline loading, success, and error states — no page reload

### `how-it-works.html` — How It Works
- Three-step explainer: Point, Discover, Listen

### `for-visitors.html` — For Visitors
- Visitor-facing feature breakdown with CTA to download/web app

### `for-institutions.html` — For Institutions
- Museum/gallery-focused features: ADA compliance, curator tools, analytics, pricing

### `ar-engine.html` — AR Engine
- Technical overview of CLIP ViT-B/32, ONNX WASM, on-device recognition

### `security.html` — Security
- Security and compliance details for institutional partners

### `privacy.html` — Privacy Policy
- Full privacy policy (Gestalt Technologies, subsidiary of Omi Labs, LLC)
- Effective April 7, 2026

### `terms.html` — Terms of Use
- Full terms of use, governing law: Commonwealth of Pennsylvania
- Effective April 7, 2026

### Placeholder Pages
- `documentation.html`, `api-reference.html`, `case-studies.html`, `blog.html` — styled shells, content TBD

---

## Design System

### Colors
- Brand Green: `#14B860`
- Off-Black: `#111827`
- Accent Gold: `#D4AF37`
- Accent Amber: `#B87333`
- Page Background: `#FCFCFC`

### Typography
- Body: Outfit (sans-serif)
- Headings: Playfair Display (serif)
- Tight letter-spacing (`-0.02em` / `-0.035em`)

### Key Visual Features
- Glassmorphic navigation and cards (`backdrop-filter: blur`)
- Breathing ambient glow animations (20s cycle)
- Subtle 64px grid pattern overlay
- Spring easing (`cubic-bezier(0.16, 1, 0.3, 1)`) on all transitions
- Bento grid layout with `.card-wide` / `.card-tall` / `.card-full` variants
- Scroll reveal animations via IntersectionObserver

---

## JavaScript Features (`script.js`)
- **Scroll Reveal**: IntersectionObserver adds `.active` class to `.reveal` elements
- **Hamburger Menu**: Toggle with morphing icon, auto-close on link click
- **Smooth Scroll**: Native `scrollIntoView` for anchor links
- **Nav Enhancement**: Adds `.nav-scrolled` shadow on scroll past 80px
- **Bento Mouse Tracking**: Gold radial glow follows cursor on bento cards
- **Hero Load Animation**: `body.loaded` triggers fade-in + scale on hero visual

---

## Contact Form — Backend

The contact form POSTs to a Firebase Cloud Function:

| | |
|---|---|
| **Function** | `contactForm` (us-central1) |
| **Repo** | `museum-ar-app/functions/src/contactForm.js` |
| **Transport** | Nodemailer → Namecheap Private Email SMTP (`mail.privateemail.com:587`) |
| **Secrets** | `SMTP_USER`, `SMTP_PASSWORD` (Firebase Secret Manager) |
| **Destination** | `hello@gestalt.gallery` |

---

## Deployment

Deployed independently from `gestalt-website/` directory directly to Firebase Hosting root (`/`).

```bash
cd gestalt-website
firebase deploy --only hosting
```

Custom domain: **gestalt.gallery** (may have CDN propagation delay of a few hours after deploy).
Instant preview always available at: **gestalt-17ce0.web.app**

---

## Session Log

### Session 1 — 2026-03-25
- Created PROJECT.md
- Website deployed as part of unified Firebase Hosting setup with path-based routing (root `/`)

### Session 2 — 2026-03-31
- Updated the logo to the new 4-petal design with Playfair Display typography across all header and footer areas in all pages.

### Session 3 — 2026-03-31
- Full restyle from "Soft Structuralism" to Pentagon Art Direction per `gestalt_brand_guidelines.md`
- New hero: Gestalt Lens AR scene with glassmorphic info pane over mural.jpg (replaces static image hero)
- Color palette: `#14B860` green, `#D4AF37` gold, `#B87333` amber, `#111827` off-black, `#FCFCFC` bg
- Ambient glow backgrounds + 64px grid pattern overlay (replaces noise overlay)
- Nav restructured to `.nav-wrapper > .nav` with scroll state, glassmorphism
- Bento cards: glassmorphic with gold hover glow + mouse tracking
- Updated deploy.sh path from `Gestalt Website` to `gestalt-website`, added mural.jpg + images/ copy
- Deployed to gestalt-17ce0.web.app

### Session 4 — 2026-04-07
- Built 6 new pages: `documentation.html`, `api-reference.html`, `case-studies.html`, `blog.html`, `ar-engine.html`, `security.html`
- Built `privacy.html` (Privacy Policy) and `terms.html` (Terms of Use) for Gestalt Technologies / Omi Labs, LLC
- Updated all page footers: added Platform (AR Engine, Security), Resources (Documentation, API Reference, Case Studies, Blog), and Company (About, Careers, Contact) link columns
- Added Privacy · Terms links to footer-bottom on every page
- Standardised nav across all pages: How It Works · For Visitors · For Institutions · Schedule Demo (→ contact.html)
- Wired contact form to `contactForm` Firebase Cloud Function using Nodemailer + Namecheap Private Email SMTP
- "Get the App" / "Request Demo" CTA replaced with "Schedule Demo" (→ contact.html) site-wide
