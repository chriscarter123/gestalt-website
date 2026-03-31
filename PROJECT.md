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
├── about.html           # Company mission, vision, team bios
├── careers.html         # Open positions (4 roles)
├── contact.html         # Contact form + company info
├── style.css            # Pentagon Art Direction design system
├── script.js            # Interactions: scroll reveal, hamburger, nav-scroll, bento mouse tracking
├── images/              # SVG icons, hero/feature PNGs
├── mural.jpg            # Hero section background image
├── hero.png             # Hero visual asset
├── firebase.json        # Hosting config (public: dist/)
├── .firebaserc          # Firebase project: gestalt-17ce0
└── dist/website/        # Production build output
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
- Client-side submission handler

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

## Deployment

Part of the unified Firebase Hosting setup at `gestalt-17ce0.web.app`. The website serves at the root (`/`). See `gestalt/Property_Structure.md` for the full routing map.

To deploy (from the `museum-ar-app` repo):
```bash
bash deploy.sh && firebase deploy --only hosting
```

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
