#!/usr/bin/env bash
# Builds the gestalt.gallery deploy folder (dist/).
# The marketing pages come from the Vite project; a few static pages
# (press kit, privacy, terms) live at the repo root and are copied as is.
# Everything else in dist/ (admin, institution, journey, nyc) is prebuilt
# and left untouched.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SITE="$ROOT/concepts/gestalt-brand/website"

cd "$SITE"
[ -d node_modules ] || npm ci
npm run build

cp -R "$SITE/dist/." "$ROOT/dist/"
for f in press/index.html privacy.html terms.html; do
  mkdir -p "$ROOT/dist/$(dirname "$f")"
  cp "$ROOT/$f" "$ROOT/dist/$f"
done
echo "dist/ rebuilt"
