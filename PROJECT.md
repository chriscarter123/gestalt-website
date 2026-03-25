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
├── style.css            # Global design system (945 lines)
├── script.js            # Interactions: scroll reveal, hamburger, parallax
├── mural.jpg            # Hero section background image
├── hero.png             # Hero visual asset
├── firebase.json        # Hosting config (public: dist/)
├── .firebaserc          # Firebase project: gestalt-17ce0
└── dist/website/        # Production build output
```

---

## Pages

### `index.html` — Landing Page
- **Hero**: "Bridge the gallery and the digital" with interactive AR lens mockup (animated crosshairs, focus reticle, glass info pane)
- **Visitor Experience**: 5-card bento grid — instant recognition, no app required, AR overlays, audio guides, proximity accessibility
- **Curator Tools**: 4-card bento grid — dashboard, AI description generation, neural TTS, cloud infrastructure
- **CTA**: "Transform your institution" demo request
- **Footer**: Platform, resources, company links

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
- **Parallax**: Hero mesh element translates at 0.15x scroll speed

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
