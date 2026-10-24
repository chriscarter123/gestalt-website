# Gestalt brand + landing page — local setup

## Where to put this

Unzip anywhere, e.g. `~/Projects/gestalt-brand/`. Everything below is relative
to that folder. Run all scripts from the project ROOT, not from `website/`.

## What's included

    gestalt-brand/
    ├─ copy/brand-kit.md                    master brand kit v2
    ├─ assets/references/image-prompts.md   image prompt pack + video build plan
    ├─ assets/images/                       (empty — see below)
    ├─ assets/videos/                       (empty — see below)
    ├─ scripts/swap-bg-video.sh             all-keyframe re-encode
    └─ website/                             Vite site (no node_modules — run npm install)

## What's NOT included, and why

The Higgsfield media. It lives on Higgsfield's CDN, and the sandbox that built
this project has no network route to that domain, so it could not be bundled.
Download each asset from its widget in the chat, then file it here:

    assets/videos/phase1.mp4     wide approach, no AR overlay
    assets/videos/phase2.mp4     hero push-in, brackets lock on
    assets/videos/phase3.mp4     paint macro, lateral drift

    assets/references/gestalt-hero-reference.png
    assets/references/gestalt-material-reference.png
    assets/references/gestalt-workspace-reference.png

Higgsfield filenames are timestamped, not sequential — rename them to
phase1/2/3 deliberately. The concat step below is order-sensitive and getting
them backwards is easy.

## Build the background video

    cd ~/Projects/gestalt-brand

    printf "file '%s'\n" \
      assets/videos/phase1.mp4 \
      assets/videos/phase2.mp4 \
      assets/videos/phase3.mp4 > /tmp/concat.txt

    ffmpeg -f concat -safe 0 -i /tmp/concat.txt -c copy \
      assets/videos/gestalt-scroll-background.mp4

    ./scripts/swap-bg-video.sh assets/videos/gestalt-scroll-background.mp4

That writes `website/public/bg.mp4`. If ffmpeg rejects `-c copy` because the
clips differ in codec parameters, drop that flag and let it re-encode — the
intermediate file's quality is irrelevant, since swap-bg-video.sh re-encodes
everything anyway.

Requires ffmpeg: `brew install ffmpeg`

## Run the site

    cd website
    npm install
    npm run dev          # http://localhost:5173

The site runs correctly with no bg.mp4 — it falls back to a static pale field.
The scroll-scrub motion is simply inert until the video is in place.

## Read first

`website/README.md` covers the architecture, the four deliberate departures
from the original brief, and the accessibility gaps still outstanding.
`copy/brand-kit.md` §19 lists the open items, including the logo SVGs, which
are specified but not yet drawn.
