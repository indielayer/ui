#!/usr/bin/env bash
# Smoke-check vite-ssg docs output. Run from repo root after pnpm build:docs.
set -euo pipefail

DIST="${1:-packages/ui/dist}"

fail() {
  echo "docs-ssg smoke failed: $*" >&2
  exit 1
}

test -d "$DIST" || fail "missing dist dir: $DIST"
test -f "$DIST/index.html" || fail "missing index.html"
test -f "$DIST/getting-started/index.html" || fail "missing getting-started/index.html"
test -f "$DIST/component/button/index.html" || fail "missing component/button/index.html"
test -f "$DIST/llms.txt" || fail "missing llms.txt"
test -f "$DIST/llms-full.txt" || fail "missing llms-full.txt"
test -f "$DIST/md/component/button.md" || fail "missing md/component/button.md"
test -f "$DIST/robots.txt" || fail "missing robots.txt"
test -f "$DIST/sitemap.xml" || fail "missing sitemap.xml"

# Prerendered pages must include real content (not an empty SPA shell).
grep -q '<h1' "$DIST/component/button/index.html" || fail "button page missing <h1>"
grep -q 'Button' "$DIST/component/button/index.html" || fail "button page missing title text"
grep -q 'application/ld+json' "$DIST/component/button/index.html" || fail "button page missing JSON-LD"
grep -q 'Clickable controls' "$DIST/component/button/index.html" || fail "button page missing description body"

# Markdown alternate for agents
grep -q 'Button' "$DIST/md/component/button.md" || fail "button.md missing content"

echo "docs-ssg smoke ok ($DIST)"
