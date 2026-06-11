#!/usr/bin/env bash
#
# Validation for the OKLCH overlay → CSS-variable migration (AUDIT #5).
#
# Run AFTER the parallel agents finish:  bash scripts/validate-oklch.sh
#
# Checks:
#   1. the 3 alpha-overlay families are gone from the target CSS files
#   2. NO dangling var(--glass-*) reference (used but never defined)  ← key parallel-work guard
#   3. defined-but-unused vars (warning only)
#   4. design tokens (surface/accent) still present after the dedup
#   5/6/7. build + typecheck + demo:build all green
#
set -uo pipefail
cd "$(dirname "$0")/.."

FAIL=0
TARGETS="src/styles/glass.css src/styles/buttons.css src/styles/utilities.css"
DEFS="src/styles/global.css"

section() { printf '\n=== %s ===\n' "$1"; }

# ---------------------------------------------------------------------------
section "1. Overlay literals removed from target files"
for pat in 'oklch(1 0 0 / ' 'oklch(0 0 0 / ' 'oklch(0.55 0.2 250 / '; do
  n=$(grep -rF -- "$pat" $TARGETS 2>/dev/null | wc -l | tr -d ' ')
  if [ "$n" -ne 0 ]; then
    echo "❌ still $n occurrence(s) of '$pat':"
    grep -rnF -- "$pat" $TARGETS
    FAIL=1
  else
    echo "✓ none left: '$pat'"
  fi
done

# ---------------------------------------------------------------------------
section "2. No dangling --glass-* references (used but not defined)"
# scan definitions across ALL style files (some --glass-* vars, e.g. blur/saturate,
# are defined in glass.css, not global.css)
defined=$(grep -rhoE '\--glass-[a-z0-9-]+[[:space:]]*:' src/styles/*.css | sed 's/[[:space:]]*:.*//' | sort -u)
used=$(grep -rhoE 'var\(--glass-[a-z0-9-]+' $TARGETS $DEFS 2>/dev/null | sed 's/var(//' | sort -u)
missing=0
while IFS= read -r v; do
  [ -z "$v" ] && continue
  if ! printf '%s\n' "$defined" | grep -qx -- "$v"; then
    echo "❌ used but NOT defined in global.css: $v"
    missing=1; FAIL=1
  fi
done <<< "$used"
[ "$missing" -eq 0 ] && echo "✓ every referenced --glass-* var is defined"

# ---------------------------------------------------------------------------
section "3. Defined-but-unused --glass-* vars (warning only)"
unused=0
while IFS= read -r v; do
  [ -z "$v" ] && continue
  if ! printf '%s\n' "$used" | grep -qx -- "$v"; then
    echo "⚠ defined but unused: $v"
    unused=1
  fi
done <<< "$defined"
[ "$unused" -eq 0 ] && echo "✓ no unused definitions"

# ---------------------------------------------------------------------------
section "4. Design tokens intact after dedup"
for t in --color-surface-500 --color-accent-500; do
  if grep -q -- "$t" $DEFS; then echo "✓ $t present"; else echo "❌ $t MISSING"; FAIL=1; fi
done
# the manual :root surface mirror should be gone (dedup) — surface tokens now
# come solely from @theme. Warn (not fail) if both still present.
theme_cnt=$(grep -c -- '--color-surface-500: oklch' $DEFS)
[ "$theme_cnt" -gt 1 ] && echo "⚠ --color-surface-500 still defined ${theme_cnt}× (dedup not applied?)"

# ---------------------------------------------------------------------------
section "5. build"
if bun run build > /tmp/oklch-build.log 2>&1; then
  echo "✓ build OK"
  if [ -s dist/styles.css ] && grep -q 'glass-light' dist/styles.css; then
    echo "✓ dist/styles.css emitted with overlay palette"
  else
    echo "❌ dist/styles.css missing or palette not emitted"; FAIL=1
  fi
else
  echo "❌ build FAILED:"; tail -25 /tmp/oklch-build.log; FAIL=1
fi

# ---------------------------------------------------------------------------
section "6. typecheck"
if bun run typecheck > /tmp/oklch-tc.log 2>&1; then echo "✓ typecheck OK"; else echo "❌ typecheck FAILED:"; tail -15 /tmp/oklch-tc.log; FAIL=1; fi

# ---------------------------------------------------------------------------
section "7. demo:build (consumer compat)"
if bun run demo:build > /tmp/oklch-demo.log 2>&1; then echo "✓ demo:build OK"; else echo "❌ demo:build FAILED:"; tail -20 /tmp/oklch-demo.log; FAIL=1; fi

# ---------------------------------------------------------------------------
section "diff stat (src/styles)"
git diff --stat -- src/styles

printf '\n'
if [ "$FAIL" -eq 0 ]; then
  echo "✅ ALL CHECKS PASSED"
else
  echo "❌ SOME CHECKS FAILED — see above"
fi
exit "$FAIL"
