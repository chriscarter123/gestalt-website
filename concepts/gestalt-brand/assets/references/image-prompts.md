# Gestalt — Reference Image Prompt Pack

**Model:** GPT Image 2 · **Quality:** high · **Aspect:** 16:9 (1792×1024)
**Derived from:** `copy/brand-kit.md` §6.2 (dark tier), §11 (visual mood), §16.7 (AR overlay chrome), §17 (video brief)

---

## Before generating — two decisions to lock

### 1. What is the hero object?

Gestalt's product is software. There is no physical object to photograph, so "the product" in these references must be **the recognition moment** — an artwork under raking light with the AR layer resolving over it. This is what the §17 video brief already storyboards, and it keeps stills and video consistent.

Rejected alternatives: a phone held in frame (reads as generic tech stock photography, and "no people" removes the hand that makes it legible); the dashboard UI (that's a screenshot, not a cinematic reference); a beacon (invisible infrastructure, not a hero).

### 2. The artwork in frame must be original

Per brand kit §17 and §18, no recognizable existing artwork may appear — a rights problem in generated images as much as in photography. All three prompts specify **non-representational, invented** work: impasto texture, abstract sculptural form, and geometric mural. Nothing that resolves as a known painting or a known mural.

### 3. Text conflict

Your brief says no baked-in text; the §17 video brief has the Lens panel carrying title/artist copy. Resolved below by rendering the Lens panel as **glass geometry with a single data glyph and no legible characters**. Type gets composited later in the site build, where it will be real, selectable, and screen-reader accessible — which is where it belongs for this brand anyway.

---

## Prompt 1 — Product Hero Reference

**Save as:** `assets/references/gestalt-hero-reference.png`

```
Cinematic 16:9 hero photograph. A gallery after closing hours. A single
large abstract painting hangs on a dark wall — thick impasto oil texture,
non-representational, deep charcoal and bone-white gestural strokes, no
recognizable subject, no signature. A single hard key light rakes across
the canvas surface from the left at a 45-degree angle, revealing every
ridge of paint; everything else falls into deep shadow at near-black
#0B0E14. Four thin luminous green corner brackets in exactly #14B860 hover
in space a few inches in front of the canvas, precisely aligned to its
corners, glowing faintly like instrumentation — clean 2px vector strokes,
not neon, not glowing haze. A frameless pane of frosted glass floats in
the lower-left third, heavily blurred behind, with an ultra-thin white
1px border and a soft 12px radius; it is empty of text, carrying only a
single small green dot. Matte polished stone floor below, catching a faint
reflection. Shallow depth of field, f/2.0, sharp on the canvas texture,
soft falloff into the room. Neutral 5600K clinical light, zero warmth, no
color grading. Shot on a 50mm prime, medium-wide, eye level, perfectly
level horizon. Immense negative space. Premium, restrained, museum-grade.

Negative: no people, no hands, no faces, no text, no letters, no numbers,
no logos, no watermarks, no recognizable famous artwork, no picture frame
ornamentation, no lens flare, no dust particles, no bokeh balls, no warm
orange grading, no teal-and-orange, no gradient backgrounds, no 3D
abstract spheres, no eye imagery, no phone or device in frame.
```

---

## Prompt 2 — Material Detail Reference

**Save as:** `assets/references/gestalt-material-reference.png`

```
Ultra-premium macro photograph, 16:9. Extreme close-up on the surface of
an abstract oil painting — thick impasto ridges of charcoal-black and
bone-white paint, cracked varnish catching light, canvas weave just
visible at the edge of focus. Non-representational, no recognizable
subject. A single hard raking light from the left grazes the surface at a
near-parallel angle, throwing long micro-shadows off every ridge of paint
and making the material three-dimensional. The right side of the frame
falls into deep near-black #0B0E14. At the far right edge, a thin
brushed-steel frame edge and a sliver of museum glass catch a cold
specular highlight. A single precise green scanning line in exactly
#14B860 crosses the paint surface horizontally — a clean thin vector
line, sharp, no glow bloom, no haze. Macro lens, 100mm, f/4, focus stacked
on the paint texture, background falling away fast. Neutral 5600K light,
clinical, no warmth, no color grading. Tactile, dramatic, extremely
detailed, high-end material realism.

Negative: no people, no hands, no text, no letters, no numbers, no logos,
no watermarks, no recognizable famous artwork, no brush in frame, no
paint tubes, no artist studio clutter, no lens flare, no dust motes, no
warm grading, no gradient overlays, no neon glow, no sci-fi hologram
aesthetic.
```

---

## Prompt 3 — Environment Mood Reference

**Save as:** `assets/references/gestalt-workspace-reference.png`

```
Cinematic 16:9 environmental photograph. A quiet contemporary gallery
interior after hours, empty of people. Wide museum-white wall on the left
holding one large abstract geometric painting — flat blocks of charcoal,
bone-white and muted ochre, non-representational, no recognizable subject.
The room recedes into deep shadow on the right at near-black #0B0E14.
Polished matte concrete floor with a faint soft reflection of the lit
wall. One hard directional light source washes the artwork wall from
camera-left; the rest of the space is unlit, dramatic falloff. Four thin
green tracking brackets in exactly #14B860 float in front of the painting,
crisp 2px vector strokes, precisely aligned, subtle. A second frosted
glass pane floats mid-air at lower right — heavy backdrop blur, ultra-thin
white border, 12px radius, empty of any text, carrying one small green
indicator dot. Enormous negative space; the composition is mostly empty
architecture. 35mm lens, f/2.8, shallow depth on the far wall, level
horizon, one-point perspective. Neutral 5600K, clinical, zero warmth, no
color grading. Restrained, spacious, museum-grade, quietly cinematic.

Negative: no people, no silhouettes, no visitors, no benches with figures,
no text, no letters, no numbers, no wall labels, no signage, no logos, no
watermarks, no recognizable famous artwork, no plants, no warm lamp light,
no lens flare, no volumetric light rays, no dust particles, no
teal-and-orange grading, no sci-fi hologram effects, no phone or device.
```

---

## Consistency controls across the three

To keep the set coherent enough to drive the video:

| Element | Locked value |
| --- | --- |
| Ground / shadow | `#0B0E14` |
| AR accent | `#14B860`, thin vector strokes only, never glowing haze |
| Glass panel | frosted, 1px white border, 12px radius, no text, one green dot |
| Light | single hard key, camera-left, 45° (raking to near-parallel in macro) |
| Color temp | 5600K neutral, no grade |
| Artwork | abstract, charcoal / bone-white palette, invented |
| Camera | level horizon, no dutch angles, no drone perspective |

**Seed strategy:** generate Prompt 1 first, then reuse its seed for 2 and 3 if the model supports it. If not, generate 1, then feed it back as an image reference for 2 and 3.

**Rejection criteria** — regenerate if any image shows: legible text anywhere, a warm or teal-orange grade, glowing neon haze around the green elements, a recognizable real artwork, any human figure or body part, or gold used anywhere. Gold does not appear in this set — the brand kit reserves it for typography in the dark tier (§6.2), and it will be added in the site build, not baked into the plate.

---

# v2 — Lighting Revision & Video Build Plan

## Lighting decision: neutral base + single gold specular

The reference set is regenerated under a revised rule that supersedes the v1 lighting note:

> **Neutral 5600K throughout. Exactly one warm element per frame: a small, tight gold
> specular glint on a machined brushed-metal edge. Not a glow, not a wash, not a light
> source — a highlight on metal.**

Two constraints make this work rather than dilute the palette:

1. **Gold and green never share an element** (brand kit §6.3). The gold specular sits on
   metal hardware; the green brackets sit on the artwork plane. Spatially separated.
2. **The gold does not spill.** A warm bounce onto surrounding surfaces would turn a
   specular accent into a grade, which is the thing §11 rules out.

### Failure modes hardened against in v2

| Mode | Counter-language used |
| --- | --- |
| Green rendering as neon | "flat matte vector stroke, like a printed overlay, completely non-emissive, no bloom, no halo, no spill" |
| Text bleeding into glass panel | "entirely blank, plain empty frosted rectangle, no writing, no symbols, no icons, no glyphs, no characters of any kind" |
| Warm grade creeping in | "strictly neutral 5600K, clinical and cool" + explicit single-warm-element carve-out |
| Recognizable artwork | "entirely non-representational, invented, must not resemble any existing or famous painting" |

---

## Video build plan — scroll-scrub background

### Why this is three clips, not one

12–16s in a single generation is outside what the available video models produce (roughly
5–10s per clip). The brief's own structure — three slow phases through three references —
is a three-shot sequence, so it builds cleanly as:

| Phase | Source plate | Motion | Target |
| --- | --- | --- | --- |
| 1 | Hero | Slow push-in toward the canvas | ~5s |
| 2 | Material macro | Slow lateral drift across paint ridges | ~5s |
| 3 | Environment | Slow pull-back revealing the room | ~5s |

Stitched to ~15s. Each clip generated with its plate as `start_image` so the look carries
across the cut, and the phases are ordered push-in → drift → pull-back so the sequence
breathes rather than pushing continuously in one direction.

### Motion constraints (all three clips)

- Dolly and rack focus only. No handheld, no whip pan, no orbit, no drone.
- Total travel under ~10% of frame width per clip. At scroll-scrub speed, anything faster
  reads as a jump.
- No cuts inside a clip. No speed ramps.
- Green brackets hold still relative to the artwork — they are tracking marks, not motion
  graphics. Any independent animation breaks the fiction.
- Composition holds the left and right thirds clear throughout, so a headline placed at
  scroll position 0 does not collide with the subject at scroll position 0.6.

### Scroll-scrub encoding — do this before wiring it into the site

Generated MP4s ship with long GOPs (often one keyframe every ~250 frames). Scrubbing
backward forces the decoder to rebuild from the last keyframe, which stutters badly and
reads as a broken site rather than a slow one. Frame-accurate scrubbing needs a keyframe
interval of 1:

```bash
ffmpeg -i gestalt-scroll-background.mp4 \
  -vf "fps=30,scale=1920:-2" \
  -c:v libx264 -preset slow -crf 20 \
  -g 1 -keyint_min 1 -sc_threshold 0 \
  -pix_fmt yuv420p -movflags +faststart -an \
  gestalt-scroll-background-scrub.mp4
```

`-g 1` makes every frame a keyframe. Expect roughly 3× the file size — budget for it, and
serve the scrub build only to desktop. Also produce a standard-GOP version as the mobile
fallback, where scroll-scrubbing should be disabled entirely (iOS Safari throttles
`currentTime` seeks and the effect degrades to a slideshow).

`-an` strips audio: a scroll-driven background has no meaningful audio track, and its
presence blocks autoplay in some browsers.

### Accessibility gate before this ships

Brand kit §12 requires `prefers-reduced-motion` support. A scroll-scrubbed video is a
motion effect tied to scroll position, which is exactly the pattern that triggers vestibular
symptoms. Under that query, replace the video with a single static frame. For an
accessibility company this is not optional polish — it is the first thing a knowledgeable
reviewer will check.

---

# v3 — Street Art Pivot

Supersedes the gallery framing in v1/v2. The gallery interior is retired as the reference
environment; the mural street scene replaces it.

## Why this is the stronger direction

It matches the go-to-market. The brand kit's Street Art First thesis (§3, §10) says public
mural work builds the visibility that converts to museum inbound — so leading the visual
identity with a gallery interior was arguing the museum case in pictures while arguing the
street case in words. The site already resolves this: its closing section reads *"Ready to
see what you've been walking past?"* and its hero audio description opens on a towering
blue wall against the sky. The references now match the product's actual first surface.

It also fixes a quieter problem. A gallery interior implies a ticketed, staffed, indoor
institution — the exact framing the accessibility argument works against. A sidewalk is
open to everyone by default, which is the point.

## What changed and why

| Element | Gallery version | Street version | Reason |
| --- | --- | --- | --- |
| Light | Single hard key, gallery after hours | Soft overcast daylight | Outdoors breaks the after-hours premise. 5600K neutral IS daylight-balanced — this is more consistent with the token, not less. |
| Gold specular | Brushed-metal frame rail | Streetlight pole, conduit, bike rack | Same rule, street hardware. |
| Material story | Impasto oil, craquelure, canvas weave | Aerosol over brick, overspray, drips, mortar grain, sun-fade | Stronger and more distinctive than oil paint — nobody else's brand kit has this. |
| Composition | Negative space in empty gallery wall | Open sky (hero) and receding sidewalk (environment) | Sky is a natural headline field in a low-angle mural shot. |
| Scale cue | Gallery architecture | Low 24mm upward angle | Murals read as monumental from below; that is how a pedestrian actually meets one. |

## Three standing constraints for all street-art imagery

**1. The mural must be invented.** Every Philadelphia mural is the work of a named artist,
and Mural Arts is the organization being pitched. A recognizable real mural in Gestalt's
own marketing would be a rights problem with the exact partner the pitch depends on.
Prompts must carry: *"entirely invented, must not resemble any existing or famous mural or
any recognizable artist's style."*

**2. No identifiable person, and specifically no depicted blind user.** "Someone walking
past" is rendered as the pedestrian's point of view — the frame is what the walker sees.
Generated imagery of disability skews hard toward stereotype (canes, dark glasses, guided
arms), and brand kit §15.2 rules out inspiration framing. If a figure is ever needed for
scale, it is distant, motion-blurred, and anonymous.

**3. No legible letterforms anywhere.** Street scenes attract them — shop signage, street
signs, house numbers, graffiti tags, license plates. Each is both a text-in-image failure
and a potential real-world identification. All are named in the negative prompt.

## Video brief revision

The three phases in the v2 build plan carry over, re-set outdoors:

| Phase | Plate | Motion |
| --- | --- | --- |
| 1 | Low-angle mural | Slow push-in up the wall face |
| 2 | Aerosol-on-brick macro | Slow lateral drift across the paint boundary |
| 3 | Sidewalk POV | Slow pull-back down the block |

The §17 *After Hours* brief in the brand kit is now inconsistent with this direction and
should be rewritten as a daylight street piece, or kept as a separate dark-tier execution
for the institutional side of the site. Two briefs is defensible — the brand kit already
runs two tiers — but they should not be blended in one film.
