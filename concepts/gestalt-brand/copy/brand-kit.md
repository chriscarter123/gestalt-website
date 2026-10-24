# Gestalt — Master Brand Kit

**Version 2.0 · July 2026**
Extends the Gestalt Brand Style Guide v1. Supersedes nothing; adds the logo specification, the dark tier, UI component standards, and voice & tone.

---

## 0. How to Use This Document

The v1 style guide established *what the brand looks like*. This document establishes *how to build with it*. Three things are new:

| Addition | Why it exists |
| --- | --- |
| **Logo & Mark Specification** (§8) | The four-leaf mark had a concept but no construction rules, clear space, or misuse boundaries. Partners now need files. |
| **Dark Tier** (§6.2) | Museum White is the product's home. Dark is for cinematic marketing, AR overlays, and low-light gallery conditions. |
| **Voice, Tone & Copy** (§15) | Gestalt sells to curators, accessibility officers, grant reviewers, and blind users — four audiences, one voice, four registers. |

**One rule above all the others:** Gestalt sells accessibility. A brand standard that fails WCAG is a credibility failure, not a design preference. Every color pairing in this document has a measured contrast ratio. Do not introduce a pairing without measuring it.

---

## 1. Brand Name

**Gestalt** — *(guh-SHTAHLT)*

From the German: a whole that is perceived as more than the sum of its parts. Named for the psychological principle that perception assembles fragments into meaning — which is precisely what the product does for a visitor who cannot see the artwork in front of them.

**Usage rules:**
- Always capitalized: *Gestalt*. Never *gestalt*, never *GESTALT* outside of tracked-out display settings.
- Legal entity: *Gestalt Technologies, Inc.*
- Never possessive in product naming: *Gestalt Institution*, not *Gestalt's Institution*.
- Product tier names are always paired with the parent: **Gestalt Lite**, **Gestalt Institution**.
- On first reference in press or grant copy, add the pronunciation gloss.

---

## 2. Slogan & Taglines

**Primary:** *Bridge the gallery and the digital.*

**Approved secondary lines** (context-dependent — do not invent new ones ad hoc):

| Line | Use where |
| --- | --- |
| Every artwork has a voice. | Consumer / Gestalt Lite |
| Accessibility, structured. | Institutional / dashboard |
| The wall text, out loud. | Street art & mural contexts |
| Machine-readable culture. | Technical / investor / grant |

**Never use:** "Art for everyone," "See the unseen," "Vision for all," or any line that makes sight the metaphor for understanding. It is condescending to the primary user.

---

## 3. Brand Positioning

Gestalt is the accessibility infrastructure layer for visual culture.

The product converts artworks — museum-held or public — into structured, machine-readable, audio-described records, then delivers them to visitors through recognition and proximity rather than through a keypad and a laminated number card.

**Positioned against three alternatives:**

1. **Audio guide hardware vendors** — Gestalt is software, has no hardware logistics, and produces compliance data as a byproduct.
2. **General museum CMS platforms** — Gestalt is accessibility-native; the accessibility layer is the product, not a plugin.
3. **Generic AI description tools** — Gestalt's descriptions are institution-verified, provenance-tracked, and auditable.

**The whitespace claim:** *No competitor combines an institutional CMS with AR-based accessibility delivery.* This sentence anchors all competitive positioning and should not be softened.

---

## 4. Target Audiences

Four audiences. One brand. Four registers of voice (see §15.3).

| Audience | Who | What they need to feel |
| --- | --- | --- |
| **Primary users** | Blind and low-vision visitors; visitors with cognitive disabilities; sighted visitors who prefer audio | Independent. Not accommodated — *equipped*. |
| **Institutional buyers** | Accessibility officers, curators, directors of visitor experience, registrars | That this reduces their workload and survives an audit. |
| **Funders** | Grant reviewers (NEA, IMLS, NIDILRR, Pew, Philadelphia Cultural Fund), pre-seed investors | That impact is measured, not asserted. |
| **Community partners** | Mural Arts Philadelphia, Art-Reach, NFB Philadelphia, artists | That Gestalt amplifies their mission rather than extracting from it. |

---

## 5. Brand Personality

**Precise. Reverent. Unsentimental. Kinetic.**

- **Precise** — Numbers over adjectives. Spacing that is measured, not eyeballed. The confidence of a system that knows its own error bars.
- **Reverent** — Toward the artwork and toward the user. Gestalt never talks over either.
- **Unsentimental** — Accessibility is a civil right and an operational requirement, not a heartwarming story. No violin music.
- **Kinetic** — Everything responds instantly. Latency is the enemy of trust in AR.

**Anti-personality — what Gestalt is not:** whimsical, charitable-sounding, jargon-heavy, apologetic, or inspirational-poster.

---

## 6. Color Palette

### 6.1 — Light Tier (Primary · unchanged from v1)

Museum White remains the brand's home. This is the default for product UI, documents, decks, and the institutional dashboard.

| Token | Hex | Role |
| --- | --- | --- |
| `--gestalt-white` | `#FCFCFC` | Foundation. Gallery walls. Primary background. |
| `--gestalt-charcoal` | `#111827` | Text, borders, structural hierarchy. |
| `--gestalt-gold` | `#D4AF37` | Classical accent. Fills, rules, flourishes. |
| `--gestalt-green` | `#14B860` | Technology accent. Fills, active AR states, data. |

**New light-tier tokens** (required for accessible text — see §16):

| Token | Hex | Role | Contrast on `#FCFCFC` |
| --- | --- | --- | --- |
| `--gestalt-charcoal-60` | `#4B5563` | Secondary body text, captions, metadata | 7.37:1 ✅ |
| `--gestalt-green-deep` | `#0C7A3E` | Green **text** on white; white-text button fills | 5.29:1 ✅ |
| `--gestalt-gold-deep` | `#7A6010` | Gold **text** on white; the italic serif verb | 5.83:1 ✅ |
| `--gestalt-hairline` | `rgba(17,24,39,0.08)` | Dividers, card borders, table rules | — |

### 6.2 — Dark Tier (Secondary · NEW)

Dark is **not** a theme toggle for the whole product. It is a deliberate second register with three sanctioned uses:

1. **Cinematic marketing surfaces** — hero videos, campaign pages, launch moments.
2. **AR overlay chrome** — UI drawn over camera feed, where light chrome would blow out.
3. **Low-light gallery mode** — an in-app setting for dim exhibition spaces, where a white screen is both physically uncomfortable and disruptive to other visitors.

| Token | Hex | Role | Contrast |
| --- | --- | --- | --- |
| `--gestalt-black` | `#0B0E14` | Dark foundation. "Gallery after hours." | — |
| `--gestalt-surface` | `#151A24` | Elevated cards, sheets, modals | — |
| `--gestalt-white` | `#FCFCFC` | Primary text on dark | 18.83:1 ✅ |
| `--gestalt-slate-60` | `#9AA1AE` | Secondary text on dark | 7.44:1 ✅ |
| `--gestalt-green` | `#14B860` | Text **and** fill on dark — works as-is | 7.41:1 ✅ |
| `--gestalt-green-bright` | `#1FD873` | AR tracking dots, live data, pulse states | 10.24:1 ✅ |
| `--gestalt-gold` | `#D4AF37` | Text **and** fill on dark — works as-is | 9.19:1 ✅ |
| `--gestalt-hairline-dark` | `rgba(252,252,252,0.10)` | Dividers, card borders | — |

**The useful asymmetry:** Gold is *decorative only* on white (2.05:1 — fails as text) but *fully legible* on dark (9.19:1). The classical accent gains a voice in the dark tier that it does not have in the light tier. Lean on this — dark-tier editorial copy is where serif gold typography finally earns its keep.

### 6.3 — Usage Rules (both tiers)

- Default to the light tier. Dark requires a reason from the list in §6.2.
- Never mix Gold and Green within a single element. They are opposing halves of the brand.
- Gold is never a primary action color. Green owns interaction; Gold owns prestige.
- Never place Gold text on Museum White. Use `--gestalt-gold-deep` or set the type on a dark surface.
- No gradients between Gold and Green. Ever.
- Green fills carry **Charcoal** text (6.8:1), not white (2.54:1 — fails). If a white-on-green button is required, the fill must be `--gestalt-green-deep`.

---

## 7. Typography

### 7.1 The Two Voices (unchanged)

- **Classical (Serif)** — `Newsreader`, `Playfair Display`, Georgia. H1s, section titles, artwork names, pull quotes.
- **Technical (Sans-Serif)** — `Outfit`, `Inter`, system-ui. Body, UI, AR overlays, buttons, data.

### 7.2 Type Scale (NEW)

A 1.25 modular scale on a 16px base. Serif for display sizes, sans for everything below `h4`.

| Token | Size / Line | Font | Tracking | Use |
| --- | --- | --- | --- | --- |
| `display` | 76 / 1.05 | Classical | −0.02em | Hero statements only, one per page |
| `h1` | 61 / 1.1 | Classical | −0.015em | Page titles |
| `h2` | 39 / 1.2 | Classical | −0.01em | Section titles |
| `h3` | 25 / 1.3 | Classical | 0 | Sub-sections, artwork names |
| `h4` | 20 / 1.4 | Technical 600 | 0 | Card titles, UI headers |
| `body-lg` | 18 / 1.6 | Technical 400 | 0 | Lead paragraphs |
| `body` | 16 / 1.6 | Technical 400 | 0 | Default |
| `caption` | 14 / 1.5 | Technical 400 | 0 | Metadata, credits |
| `label` | 12 / 1.4 | Technical 500 | **0.16em, uppercase** | Section eyebrows, data labels |

**The tracked label is a brand signature.** `0 2 — C O L O R  P A L E T T E`. Use it for section eyebrows and data labels; never for anything longer than four words.

### 7.3 Type Rules

- Never set body copy in the Classical voice. Never set a page title in the Technical voice.
- Measure caps at **68 characters** for body copy.
- Minimum body size is **16px**. This is not negotiable and applies to footers, captions, and legal text.
- The *italic serif verb* is the one licensed flourish: a single verb in the Classical voice, italic, in `--gestalt-gold-deep`, inside an otherwise plain headline. One per page maximum.
- All caps only for `label`. Never for headlines.

---

## 8. Logo & Mark Specification

### 8.1 The Gestalt Mark

**Concept:** Four leaves. Duality. Growth.

Four identical leaf forms arranged in radial symmetry around a shared center point. The form reads two ways depending on attention — as a botanical growth motif and as a camera aperture / recognition reticle. This ambiguity is the entire point: it *is* a gestalt, a figure that assembles differently depending on how perception organizes it. The mark demonstrates the brand principle rather than illustrating it.

### 8.2 Construction

- Built on a **square artboard** with the mark occupying the central 80%.
- Four leaves at **90° rotational symmetry**. No reflection symmetry — each leaf is rotated, not mirrored.
- Leaf silhouette: two arcs meeting at a point at the outer tip and at the shared center. Stroke-free; solid fill only.
- The negative space at the center forms an implied four-pointed void. Do not close it.
- Optical, not mathematical, centering. The mark's visual weight sits slightly above geometric center.

### 8.3 Lockups

| Lockup | Composition | Use |
| --- | --- | --- |
| **Primary horizontal** | Mark + wordmark, left-aligned, mark height = cap height × 1.6 | Web headers, decks, documents |
| **Stacked** | Mark above wordmark, both centered | Square formats, social avatars, merchandise |
| **Mark only** | — | App icon, favicon, watermarks, spaces under 32px |
| **Wordmark only** | — | Text-constrained contexts, partner footer rows, email signatures |

**Wordmark:** *Gestalt* set in the Classical voice (Newsreader), weight 400, tracking `0.02em`. Not bold. The restraint is the statement.

**Gap between mark and wordmark:** exactly **0.5× the mark's width**.

### 8.4 Clear Space

Minimum clear space on all four sides = **the width of one leaf** (¼ of the mark's total width). No text, image edge, rule, or another logo may enter this zone.

### 8.5 Minimum Sizes

| Context | Minimum |
| --- | --- |
| Mark only, digital | 24px |
| Mark only, print | 8mm |
| Primary horizontal lockup, digital | 120px wide |
| Primary horizontal lockup, print | 32mm wide |

### 8.6 Color Applications

| Background | Mark | Wordmark |
| --- | --- | --- |
| Museum White | Charcoal `#111827` | Charcoal `#111827` |
| Gallery Black | Museum White `#FCFCFC` | Museum White `#FCFCFC` |
| Photography / mural imagery | Museum White, 100% opacity | Museum White |
| Single-color print | 100% black or 100% white | Match mark |
| Celebratory / prestige moments only | Gold `#D4AF37` on dark **only** | Match mark |

Green is **never** a logo color. Green belongs to the live AR engine, and using it in the identity dilutes its signal.

### 8.7 Misuse — Do Not

1. Rotate the mark to any angle other than 0°.
2. Mirror or reflect individual leaves.
3. Apply gradients, bevels, drop shadows, or glows.
4. Recolor individual leaves differently from one another.
5. Place the mark on a busy area of a photograph without a scrim (use a 40% Charcoal scrim if needed).
6. Stretch, condense, or otherwise alter proportions.
7. Set the wordmark in the Technical voice.
8. Add a tagline inside the clear-space zone. Taglines sit outside it, or in a separate lockup.
9. Enclose the mark in a container shape (circle, rounded square) except where a platform forces it — app icons.
10. Use Gold on any light background.

### 8.8 File Deliverables (to produce)

```
assets/images/logo/
├── gestalt-mark.svg
├── gestalt-mark-white.svg
├── gestalt-lockup-horizontal.svg
├── gestalt-lockup-horizontal-white.svg
├── gestalt-lockup-stacked.svg
├── gestalt-wordmark.svg
├── favicon.svg  ·  favicon-32.png  ·  favicon-16.png
├── app-icon-1024.png
└── social-avatar-400.png
```

---

## 9. Product Description

**Gestalt Lite** — A consumer mobile app. Point the camera at an artwork or a mural; recognition runs on-device via CLIP ViT-B/32 with 9× augmentation. The app returns the work's identity and plays a human-reviewed or AI-generated audio description. Includes My Collection for saving encountered works, and works in museums, galleries, and outdoors on public art.

**Gestalt Institution** — A React dashboard for museums and galleries. Six surfaces: ADA Accessibility Scorecard, Visitor Analytics, AI Audio Description Generator, Grant-Ready Reporting Templates, Crowdsource Moderation Queue, and Street Art / Museum Cross-Promotion. Institutions manage their accessibility data and export audit-ready compliance documentation without an IT ticket.

**The AI pipeline** — Vision-language generation of draft audio descriptions with mandatory human approval, provenance tracking (`human` / `ai` / `ai_edited`), and text-to-speech delivery. Descriptions capture composition, color, subject, mood, scale, and artist context — not object labels.

**Delivery constraint to design around:** BLE proximity gives 1.5–5m real-world accuracy. The interface must therefore be **room-level first**, narrowing progressively. Never promise object-level precision in copy or UI.

---

## 10. Key Benefits

For **institutions**:
1. Compliance data as a byproduct of normal work — not a separate reporting project.
2. Audio descriptions produced ~10× faster, with curator approval preserved.
3. Grant-ready exports with timestamped accessibility snapshots.
4. Legal-grade audit trail of every description, edit, and approver.
5. No hardware. No devices to charge, sanitize, or lose.

For **visitors**:
1. Independence — no front-desk request, no borrowed device, no disclosure of disability.
2. Works outdoors on public art, where no audio guide has ever gone.
3. Descriptions written for perception, not for cataloguing.
4. A personal collection of everything encountered.

For **funders**:
1. Measured coverage percentages, not testimonials.
2. A proprietary structured dataset that compounds.
3. A social mission with a margin structure competitors can't copy.

---

## 11. Visual Mood

### Light Tier — "The Gallery, Open"

Overwhelming negative space. Museum White walls with a barely-perceptible 40px grid beneath. Objects float with the confidence of a well-hung exhibition. Photography is architectural and unpeopled or, when peopled, documentary rather than staged. Hard, even daylight. No vignettes, no warm filters, no bokeh. The Gestalt Lens (24px backdrop blur, 180% saturate, 0.2 white hairline border) for any panel that sits over reality.

### Dark Tier — "The Gallery, After Hours" *(NEW)*

Gallery Black grounds. Single-source raking light from one side, everything else falling into deep shadow. Materials read as brushed metal, matte stone, and museum glass. Green tracking marks pulse in the dark like instrumentation. Gold serif type glows against the black — the one place the classical accent gets to speak at full volume. Camera moves slowly and deliberately: macro dollies, slow parallax, no whip pans, no drone sweeps.

**Both tiers reject:** stock-photo diversity tableaux, gradients-as-decoration, blob shapes, 3D-rendered abstract spheres, and any visual metaphor involving an eye or an eye-chart.

---

## 12. Motion & Physics

Unchanged from v1, restated as tokens:

```css
--gestalt-duration: 0.35s;
--gestalt-stagger: 0.05s;
--gestalt-easing: cubic-bezier(0.175, 0.885, 0.32, 1.275);
```

Rapid, kinetic, deliberate. Elements waterfall in with spring overshoot. Nothing floats.

**Required exception:** honor `prefers-reduced-motion`. Under that query, all transforms collapse to opacity-only fades at `0.15s` linear, and all looping or pulsing animation stops entirely. For an accessibility company this is table stakes, and reviewers will check.

---

## 13. Website Goal

The marketing site has one job per audience and must not blur them:

- **Institutional visitor** → book a pilot conversation.
- **Consumer visitor** → download Gestalt Lite.
- **Funder / press** → find the impact numbers and the founder in under 30 seconds.

Every page carries exactly one primary CTA in `--gestalt-green` and at most one secondary in outlined Charcoal.

---

## 14. Landing Page Section Structure

1. **Hero** — Display serif statement, one line of Technical sub-copy, single green CTA. Dark tier permitted here.
2. **The problem, in numbers** — Coverage gaps and compliance exposure. Data, not pathos.
3. **How it works** — Three steps: point, recognize, listen. Kinetic staggered entrance.
4. **For institutions** — Dashboard screenshots, scorecard, the compliance byproduct argument.
5. **For visitors** — Independence framing. Real works, real descriptions.
6. **Public art** — The street-art differentiator. Philadelphia mural imagery.
7. **Proof** — Pilot partners, indexed artwork count, quotes from partners.
8. **Trust & accessibility statement** — The product's own conformance, stated plainly.
9. **Close** — Repeat primary CTA. Footer with wordmark-only lockup.

---

## 15. Voice, Tone & Copy Standards

### 15.1 Voice — constant across everything

**Declarative. Specific. Warm at the edges, never at the center.**

Gestalt writes the way a good curator talks: it knows more than it says, it respects your intelligence, and it gets out of the way of the work.

| Do | Don't |
| --- | --- |
| "1,700 artworks indexed." | "Thousands of artworks and counting!" |
| "Descriptions require curator approval." | "Our AI works hand-in-hand with your team." |
| "Point your camera at the mural." | "Simply unlock a world of art!" |
| "BLE proximity resolves to room level." | "Pinpoint accuracy anywhere." |

### 15.2 Disability Language Standards

These are not stylistic preferences. Getting these wrong disqualifies Gestalt with the exact community it serves.

- **Identity-first for blindness:** "blind and low-vision visitors" — not "visually impaired," not "the visually challenged," not "people with sight loss."
- **Never:** "suffers from," "afflicted," "confined to," "differently abled," "special needs," "handicapped."
- **Never frame access as generosity.** Gestalt does not "help" blind visitors or "give" them access. It removes a barrier that should not have existed.
- **Avoid inspiration framing entirely.** No "despite," no "overcoming," no story arc where disability is the obstacle the protagonist transcends.
- **Sight metaphors are off-limits in brand copy:** no "see the difference," "vision for the future," "eye-opening," "blind spot."
- **Say "audio description," not "narration"** — it's a defined term of art, and using it correctly signals competence to accessibility officers.
- **Describe the product's limits honestly.** Overclaiming accuracy is the fastest way to lose a partner in this space.

### 15.3 Tonal Registers by Audience

Same voice, four settings:

| Audience | Register | Example opening line |
| --- | --- | --- |
| **Blind & low-vision users** | Direct, practical, zero ceremony. Front-load the action. | "Point your camera at the artwork. Gestalt will tell you what's there." |
| **Institutions** | Operational and calm. Lead with their workload, not our technology. | "Your accessibility coverage, calculated continuously — and exportable the morning of the board meeting." |
| **Funders & grant reviewers** | Structured and evidentiary. Numbers with denominators. Named methodology. | "Across three pilot sites, audio description coverage rose from 4% to 61% in twelve weeks." |
| **Community & artists** | Collaborative and credit-giving. Their names before ours. | "Nine murals. The artists' words, in the artists' framing, available to everyone standing in front of them." |

### 15.4 Mechanics

- **Sentence case** for all headlines, buttons, and navigation. Title Case only for proper nouns.
- **Em dashes** without surrounding spaces — like this.
- **Oxford comma:** yes.
- **Numerals from zero.** "3 steps," not "three steps." Exception: a number opening a sentence.
- **Percentages always carry the denominator** in institutional and grant copy.
- **No exclamation points.** None. Anywhere.
- **Buttons are verb-first and under four words:** "Book a pilot," "Download Gestalt Lite," "Export scorecard."
- **Contractions:** yes in consumer copy, sparingly in institutional, never in grant narratives.

### 15.5 Alt Text & Description Standards

Gestalt's own materials must model what it sells.

- Every image carries alt text. Decorative images carry `alt=""`, never a missing attribute.
- Alt text leads with subject and composition, then medium, then mood. Under 150 characters unless the image carries data.
- Charts and scorecards require a text alternative stating the actual values, not "chart showing coverage."
- Videos require captions **and** an audio-described track. A Gestalt marketing video without audio description is a self-inflicted wound.

---

## 16. UI Components & Interaction States

### 16.1 Foundational Tokens

```css
:root {
  /* Spacing — 8px base, 40px grid alignment */
  --space-1: 4px;   --space-2: 8px;   --space-3: 16px;
  --space-4: 24px;  --space-5: 40px;  --space-6: 64px;  --space-7: 104px;

  /* Radius */
  --radius-sm: 6px;    /* inputs, chips */
  --radius-md: 12px;   /* cards, the Gestalt Lens */
  --radius-lg: 20px;   /* sheets, modals */
  --radius-full: 999px;/* pills, avatars */

  /* Elevation — light tier */
  --shadow-1: 0 1px 2px rgba(17,24,39,0.05);
  --shadow-2: 0 4px 16px rgba(17,24,39,0.08);
  --shadow-3: 0 12px 40px rgba(17,24,39,0.12);

  /* Focus — brand-critical */
  --focus-ring: 0 0 0 3px rgba(20,184,96,0.45);
  --focus-ring-offset: 2px;
}
```

### 16.2 Universal Interaction States

Every interactive component defines all seven. A component spec without all seven is incomplete.

| State | Treatment |
| --- | --- |
| **Default** | Base token values |
| **Hover** | Fill darkens 8%; transform `translateY(-1px)`; `0.35s` brand easing |
| **Focus-visible** | 3px Green ring at 2px offset. **Never removed. Never replaced by hover styling.** |
| **Active/pressed** | Fill darkens 14%; `translateY(0)`; duration drops to `0.12s` |
| **Disabled** | 40% opacity, `cursor: not-allowed`, no hover response, `aria-disabled` |
| **Loading** | Label replaced by 3-dot pulse in current color; width locked to prevent layout shift; `aria-busy="true"` |
| **Error** | 1.5px `#B42318` border, error text below in `caption`, `aria-describedby` wired to the message |

**The focus ring is a brand asset, not a browser default to be overridden.** Keyboard users are a primary audience. Any PR that removes an outline without replacing it gets rejected.

### 16.3 Buttons

| Variant | Light tier | Dark tier |
| --- | --- | --- |
| **Primary** | `--gestalt-green-deep` fill, Museum White label (5.29:1) | `--gestalt-green` fill, Charcoal label (6.8:1) |
| **Secondary** | Transparent, 1px Charcoal border, Charcoal label | Transparent, 1px `--gestalt-hairline-dark`, White label |
| **Tertiary / text** | `--gestalt-green-deep` label, underline on hover | `--gestalt-green` label, underline on hover |
| **Destructive** | `#B42318` fill, white label | `#F97066` label, transparent fill |

- Height: 44px default, 36px compact, 52px hero. **Minimum touch target 44×44px in all cases** — including icon-only buttons.
- Padding: `--space-4` horizontal.
- Radius: `--radius-sm`.
- Label: Technical 500, sentence case, verb-first.
- One primary button per view. If you need two, one of them isn't primary.

### 16.4 Cards & The Gestalt Lens

**Standard card:** Museum White surface, `--radius-md`, `--shadow-1`, `--gestalt-hairline` border, `--space-4` padding. Hover raises to `--shadow-2` with `translateY(-2px)`.

**The Gestalt Lens** — reserved for panels overlaying camera feed or imagery. Never used on a flat background; the blur has nothing to do there and it just looks like decoration.

```css
.gestalt-lens {
  backdrop-filter: blur(24px) saturate(180%);
  -webkit-backdrop-filter: blur(24px) saturate(180%);
  background: rgba(252, 252, 252, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: var(--radius-md);
}
.gestalt-lens--dark {
  background: rgba(11, 14, 20, 0.72);
  border: 1px solid rgba(252, 252, 252, 0.12);
}
```

**Critical caveat:** backdrop blur destroys text contrast unpredictably over live camera feed. Any Lens panel carrying text must sit on a solid scrim layer beneath the blur — 55% minimum opacity — so contrast is guaranteed regardless of what the camera sees.

### 16.5 Forms

- Label above field, always. No placeholder-as-label — it disappears on focus and defeats screen readers.
- Input: 44px height, `--radius-sm`, 1px `--gestalt-hairline` border, 16px text (prevents iOS zoom-on-focus).
- Focus: border becomes `--gestalt-green-deep` **and** the focus ring appears. Two signals, not one — color alone is never the only indicator.
- Helper text below in `caption` / `--gestalt-charcoal-60`.
- Required fields marked with the word "Required," not an asterisk alone.
- Errors: inline below the field, prefixed with an icon, never color-only.

### 16.6 Data Display — Scorecard & Analytics

The ADA Scorecard is the institutional product's signature surface. Its standards:

- **Status colors carry a second signal.** Green ≥80%, Amber 50–79%, Red <50% — but each also carries a text label and a distinct icon shape. A color-blind accessibility officer must be able to read the scorecard. Failing this on an accessibility product is unforgivable.
- Amber token: `#B54708` on white (5.2:1) — not a light yellow.
- Ring charts require a centered numeric value in `h3` and a `<table>` text alternative.
- Trend deltas use ▲/▼ glyphs plus a sign, never color alone.
- Every metric displays its denominator on hover and in the exported PDF.

### 16.7 AR Overlay Chrome (dark tier, always)

- Tracking indicators: `--gestalt-green-bright` `#1FD873`, 2px stroke, pulsing at 1.2s — suppressed entirely under `prefers-reduced-motion`.
- Confidence below 0.5 renders the reticle as a **dashed** outline, not a different color. Shape carries the meaning.
- All overlay text sits on a Lens-dark scrim. No text directly on camera feed, ever.
- Room-level state is the default visual; object-level lock is the exception the UI earns its way into.

### 16.8 Accessibility Floor for All Components

| Requirement | Standard |
| --- | --- |
| Text contrast | 4.5:1 minimum (AA); target 7:1 (AAA) for body |
| Large text (≥24px or ≥19px bold) | 3:1 minimum |
| Non-text / UI boundaries | 3:1 minimum |
| Touch targets | 44×44px minimum, 8px spacing between |
| Focus indicator | Visible, 3:1 against adjacent colors, never suppressed |
| Color as information | Never the sole carrier — always paired with text, icon, or shape |
| Motion | Full `prefers-reduced-motion` support |
| Screen reader | Every interactive element named, roled, and state-announced |

Target conformance: **WCAG 2.1 Level AA, with AAA text contrast where achievable.** State this publicly and publish an accessibility conformance report. It is a sales asset in this market, not just a compliance document.

---

## 17. Cinematic Video Brief — Dark Tier Hero

*For the marketing hero video. Note: Higgsfield is not currently a connected tool in this workspace; this brief is production-ready for whatever generation or filming path is chosen.*

**Title:** *After Hours*
**Duration:** 12–18s, seamless loop
**Format:** 4K, 24fps, delivered with a muted-autoplay web version and a captioned + audio-described full version

**Concept:** A gallery after closing. One work on the wall. The camera finds it the way recognition finds it — slowly, then all at once.

**Shot sequence:**

1. **0:00–0:04 —** Extreme macro on the surface of a painting or mural. Raking light from camera-left across impasto texture. Slow lateral dolly, 4mm of travel. Nothing identifiable yet.
2. **0:04–0:09 —** Pull back and rack focus. Gallery Black surroundings resolve. `#1FD873` tracking marks bloom at the edges of the work — four corner reticles, snapping in with the brand's spring easing, not fading.
3. **0:09–0:14 —** A Gestalt Lens panel slides in over the lower third. Inside it, Technical-voice text builds line by line: title, artist, year, then the first line of the audio description in Museum White.
4. **0:14–0:18 —** Camera settles. Everything holds. A single Gold serif word in the upper field. Loop point matched to frame one.

**Materials & light:** Matte stone floor, museum glass, brushed steel frame edge. Single key at 45° camera-left, 1:8 fill ratio. Deep falloff into `#0B0E14`. Zero practical warmth — the light is neutral 5600K, clinical, gallery-accurate.

**Camera:** Macro-to-medium. Slow dolly and rack focus only. No handheld, no whip pan, no drone, no orbit.

**Do not include:** human faces, hands reaching toward the artwork, phone screens held up in frame, lens flares, particle dust, warm color grading, or any recognizable existing artwork (rights). Commission or use pilot-partner mural imagery with written permission.

**Audio:** Room tone only for the web loop. The full version carries a single line of real audio description — using an actual Gestalt-generated description, not a written-for-marketing one.

---

## 18. Asset & File Conventions

```
assets/
├── images/
│   ├── logo/          # per §8.8
│   ├── product/       # app + dashboard screenshots, @1x @2x
│   ├── murals/        # pilot imagery — permissions log required
│   └── icons/         # 24px grid, 1.5px stroke, square caps
├── videos/
│   ├── hero/          # web loop + full captioned/AD versions
│   └── demo/
└── references/        # mood boards, competitor teardowns, source research
copy/
├── brand-kit.md       # this file
├── voice-examples.md  # to write
└── boilerplate.md     # to write — press boilerplate, exec bios
website/
```

**Naming:** `gestalt-{context}-{descriptor}-{variant}.{ext}`, lowercase, hyphens only.
Example: `gestalt-dashboard-scorecard-dark@2x.png`

**Permissions:** every mural or artwork image requires a signed permission record filed at `assets/references/permissions/`. No exceptions. Gestalt's entire partnership model depends on being scrupulous here.

---

## 19. Open Items

- [ ] Produce the logo SVG files per §8.8 — the mark is specified but not yet drawn
- [ ] Write `copy/voice-examples.md` — before/after rewrites for each of the four registers
- [ ] Write `copy/boilerplate.md` — 25/50/100-word press boilerplate, founder bio
- [ ] Publish an accessibility conformance statement for gestalt.gallery and the dashboard
- [ ] Audit the live dashboard against §16.8 — the green-on-white contrast issue likely exists in shipped code
- [ ] Decide whether the dark tier applies to `mural.gestalt.gallery` — outdoor daylight use argues against it

---

*Gestalt Technologies, Inc. · "Stripe meets the MoMA."*
