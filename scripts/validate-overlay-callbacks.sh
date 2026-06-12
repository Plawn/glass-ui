#!/usr/bin/env bash
#
# Validation for the overlay close-callback harmonization (AUDIT #6).
#
# Goal: onOpenChange becomes the canonical close callback on every overlay.
# Modal/Drawer/Window adopt onOpenChange while keeping onClose (now optional,
# @deprecated) for backwards compat. Dialog/Sheet were already canonical and
# must stay untouched.
#
# Run AFTER the parallel agents finish:  bash scripts/validate-overlay-callbacks.sh
#
set -uo pipefail
cd "$(dirname "$0")/.."

FAIL=0
COMPONENTS="Modal Drawer Window"

section() { printf '\n=== %s ===\n' "$1"; }

# ---------------------------------------------------------------------------
section "1. Harmonized props in types.ts (onClose? @deprecated + onOpenChange?)"
for c in $COMPONENTS; do
  t="src/components/$c/types.ts"
  ok=1
  grep -q 'onOpenChange?:' "$t" || { echo "❌ $c: missing 'onOpenChange?'"; ok=0; FAIL=1; }
  grep -q 'onClose?:'      "$t" || { echo "❌ $c: 'onClose' is not optional"; ok=0; FAIL=1; }
  grep -q '@deprecated'    "$t" || { echo "❌ $c: 'onClose' not marked @deprecated"; ok=0; FAIL=1; }
  # the required form must be gone
  grep -qE 'onClose: *\(\) *=> *void' "$t" && { echo "❌ $c: 'onClose' still required"; ok=0; FAIL=1; }
  [ "$ok" -eq 1 ] && echo "✓ $c"
done

# ---------------------------------------------------------------------------
section "2. Unified close handler wired in component"
for c in $COMPONENTS; do
  f="src/components/$c/$c.tsx"
  ok=1
  grep -q 'requestClose' "$f"      || { echo "❌ $c: no 'requestClose' helper"; ok=0; FAIL=1; }
  grep -q "'onOpenChange'" "$f"    || { echo "❌ $c: 'onOpenChange' not added to splitProps"; ok=0; FAIL=1; }
  [ "$ok" -eq 1 ] && echo "✓ $c (requestClose + splitProps)"
done

# ---------------------------------------------------------------------------
section "3. Dialog/Sheet untouched (already canonical)"
changed=$(git diff --name-only -- src/components/Dialog src/components/Sheet)
if [ -n "$changed" ]; then echo "⚠ unexpected changes in:"; echo "$changed"; else echo "✓ Dialog/Sheet unchanged"; fi

# ---------------------------------------------------------------------------
section "4. typecheck"
if bun run typecheck > /tmp/o6-tc.log 2>&1; then echo "✓ typecheck OK"; else echo "❌ typecheck FAILED:"; tail -25 /tmp/o6-tc.log; FAIL=1; fi

section "5. lint"
if bun run lint > /tmp/o6-lint.log 2>&1; then echo "✓ lint OK"; else echo "❌ lint FAILED:"; tail -25 /tmp/o6-lint.log; FAIL=1; fi

section "6. build"
if bun run build > /tmp/o6-build.log 2>&1; then echo "✓ build OK"; else echo "❌ build FAILED:"; tail -20 /tmp/o6-build.log; FAIL=1; fi

section "7. demo:build (consumer compat — demos still pass onClose)"
if bun run demo:build > /tmp/o6-demo.log 2>&1; then echo "✓ demo:build OK"; else echo "❌ demo:build FAILED:"; tail -25 /tmp/o6-demo.log; FAIL=1; fi

# ---------------------------------------------------------------------------
section "diff stat (src/components)"
git diff --stat -- src/components

printf '\n'
if [ "$FAIL" -eq 0 ]; then echo "✅ ALL CHECKS PASSED"; else echo "❌ SOME CHECKS FAILED — see above"; fi
exit "$FAIL"
