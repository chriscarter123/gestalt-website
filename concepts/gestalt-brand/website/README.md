# Gestalt — scroll-driven landing page

A single-page motion site built from `copy/brand-kit.md`. The background video is a
fixed full-screen layer scrubbed by scroll position; all content scrolls over it.

## Quick start

```bash
cd website
npm install
npm run dev
```

Opens at **http://localhost:5173**.

Production build:

```bash
npm run build
npx serve dist        # or any static server
```

Do not open `dist/index.html` via `file://` — ES modules and the video layer
both need HTTP.

---

## ⚠ The background video is not yet in place

`website/public/bg.mp4` does not exist. The site runs correctly without it:
`main.js` detects the missing file and leaves a pale static field in place, so
nothing breaks and no console errors are thrown. But the scroll-scrub motion —
the point of the build — is inert until the file lands.

### What still needs to be produced

Three clips were planned; one exists as a 5-second test on Higgsfield's CDN.

| Phase | Plate | Motion | Status |
| --- | --- | --- | --- |
| 1 | Wide block approach | Slow drift / pull-back | Plate generated, clip not |
| 2 | Hero at the wall | Slow push-in | **Clip generated (5s test)** |
| 3 | Paint / brick macro | Slow lateral drift | Plate generated, clip not |

### Installing the video once you have it

```bash
# from the project root, not website/
./scripts/swap-bg-video.sh assets/videos/gestalt-scroll-background.mp4
```

The script re-encodes to all-keyframe H.264 and writes `website/public/bg.mp4`.

**Why the re-encode is mandatory.** Generated MP4s ship with a keyframe roughly
every 250 frames. Seeking backward forces the decoder to rebuild from the last
one, so scrubbing stutters and reads as a broken site rather than a slow one.
`-g 1 -keyint_min 1 -sc_threshold 0` makes every frame a keyframe. Expect
roughly 3× the file size — that is the trade, and it is the correct one here.

The script uses `-crf 17` rather than the more usual 20. These plates are
high-key, and smooth pale skies band visibly long before darker footage would.
If banding still shows in the sky, drop to 15.

Verify in the browser console:

```js
window.__bgv.readyState === 4
window.__bgv.duration
```

---

## Architecture

```
website/
├─ index.html          all section markup + Google Fonts
├─ vite.config.js      base: "./" for portable builds
├─ public/
│  ├─ bg.mp4           ← scroll-scrubbed video (absent; see above)
│  └─ img/poster.svg   pale field fallback, generated as SVG
└─ src/
   ├─ main.js          Lenis, ScrollTrigger pins, video scrub
   ├─ style.css        tokens, layout, sections, responsive, reduced-motion
   └─ glass.css        the Gestalt Lens panels and buttons
```

### Layer stack

| Layer | z-index | Role |
| --- | --: | --- |
| `#bgv` | 0 | Fixed video, `object-fit: cover`, scrubbed by scroll |
| `.bg-fallback` | 0 | Pale static field, shown when no video is loaded |
| `.bg-scrim` | 1 | Pale readability wash |
| `#page` | 10 | All content |
| `.nav` | 50 | Fixed header |

### Sections

`#home` → `#impact` (pinned) → `#showcase` → `#features` → `#workflow`
(pinned gallery) → `#specs` → `#buy` → `footer`

Two pinned ScrollTriggers: the impact statement's word-by-word reveal and the
audience card gallery. Both call `invalidateOnRefresh` because pins change
document height and shift every trigger after them.

---

## Deliberate departures from the skill's defaults

**The site is light, not dark.** The skill defaults to dark cinematic *unless the
brand kit defines otherwise*, and this brand kit names Museum White as the
primary tier, scoping dark to AR overlay chrome and low-light gallery mode. So
`.bg-scrim` is a pale wash rather than a dark tint, and `.glass` is a frosted
white panel rather than `rgba(18,19,25,.46)`. Charcoal on the pale scrim reaches
**17.29:1**, which is better than any white-on-video arrangement would manage.

**Glass panels sit on a solid base.** `backdrop-filter` alone gives
unpredictable contrast, because what's behind it changes as the video scrubs.
Brand kit §16.4 requires an opaque scrim ≥55% underneath, so `.glass` carries
`rgba(255,255,255,.78)` as a floor. The blur is the effect; the base is the
contrast guarantee.

**Primary buttons use `#0C7A3E`, not `#14B860`.** White text on brand green is
2.54:1 and fails WCAG. Green-deep gives 5.29:1. Hover *darkens* to `#0A6B36`
rather than lightening, since lightening would drop back below 4.5:1.

**There is no pre-order.** Gestalt sells a $500/month Starter tier and a free
consumer app. `#buy` is a free-pilot-to-paid conversion, matching brand kit §13,
which names the real CTAs: book a pilot, download Gestalt Lite.

---

## Accessibility

Non-negotiable for this product. A scroll-scrubbed background is a motion
effect tied to scroll position — the pattern most likely to trigger vestibular
symptoms — so it is gated rather than merely tuned.

Under `prefers-reduced-motion: reduce`:

- Lenis is never instantiated; native scrolling takes over. Hijacking scroll for
  someone who asked for less motion is the opposite of accessible, and it also
  keeps keyboard paging and screen-reader virtual cursors behaving normally.
- The video element is hidden and the static field shows instead.
- Both pins are skipped; pinned sections become normal flow.
- The card gallery becomes a vertical stack.
- All reveals resolve to their final state immediately.

Also built in:

- Skip link to main content.
- The video is decorative: `aria-hidden="true"`, `tabindex="-1"`.
- Off-screen gallery cards get `aria-hidden` and lose pointer events, so
  keyboard focus never lands on an invisible blurred card.
- Focus ring is a 3px green outline at all times, never suppressed (§16.2).
- Semantic landmarks: `banner`, `main`, `contentinfo`, plus `aria-labelledby`
  on every section.
- 44px minimum touch targets on all buttons.
- Body copy never below 16px; measure capped at 68 characters.

### Still to do before this ships

- [ ] Real accessibility conformance statement, linked from the footer
- [ ] Screen-reader pass on the pinned sections — pins are the highest-risk
      pattern for reading order, and this has not been tested with NVDA or
      VoiceOver
- [ ] Mobile poster image (currently the generated SVG field)
- [ ] Replace `mailto:` CTAs with a real form, with labels above fields and
      errors that are not colour-only (§16.5)
- [ ] Verify contrast of charcoal text over the *actual* video frames once
      `bg.mp4` is in place — the pale scrim is calculated against the static
      field, and a bright plate could still need the scrim strengthening

---

## Dev hooks

Exposed in development only:

```js
window.__lenis    // Lenis instance (null under reduced-motion)
window.__ST       // ScrollTrigger
window.__bgv      // background video element
window.__ST.refresh()
```

If pinned sections look wrong after an edit, `__ST.refresh()` before assuming
the code is broken — layout shifts from late-loading fonts are the usual cause,
and `document.fonts.ready` already triggers one refresh automatically.
