#!/usr/bin/env bash
set -euo pipefail

# Re-encodes a source video to all-keyframe H.264 for frame-accurate scroll
# scrubbing, and installs it at website/public/bg.mp4
#
#   ./scripts/swap-bg-video.sh assets/videos/gestalt-scroll-background.mp4
#
# -g 1 / -keyint_min 1 / -sc_threshold 0  →  every frame is a keyframe.
#   Without this, seeking backward forces the decoder to rebuild from the
#   last keyframe (often ~250 frames back) and scrubbing stutters badly.
#
# -crf 17 rather than the usual 20: these plates are high-key, and smooth
#   pale skies band visibly before anything else does. Dark footage hides
#   the same artefacts.

INPUT="${1:-}"
OUTPUT="website/public/bg.mp4"

if [[ -z "$INPUT" ]]; then
  echo "usage: $0 <input-video>" >&2
  exit 1
fi

if [[ ! -f "$INPUT" ]]; then
  echo "error: '$INPUT' not found" >&2
  exit 1
fi

mkdir -p "$(dirname "$OUTPUT")"

ffmpeg -y -i "$INPUT" \
  -an \
  -vf "fps=30,scale=1920:-2:flags=lanczos" \
  -c:v libx264 -preset slow -crf 17 \
  -g 1 -keyint_min 1 -sc_threshold 0 \
  -pix_fmt yuv420p -movflags +faststart \
  "$OUTPUT"

echo
echo "→ $OUTPUT"
ffprobe -v error -select_streams v:0 \
  -show_entries stream=width,height,nb_frames,duration,avg_frame_rate \
  -of default=noprint_wrappers=1 "$OUTPUT" || true
echo
echo "Verify in the browser console:  window.__bgv.readyState === 4"
