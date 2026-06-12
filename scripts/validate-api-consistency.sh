#!/usr/bin/env bash
#
# Validation for the API-consistency chantier (AUDIT #7).
#
# 7a — `loading?: boolean` on Input, Select, DatePicker (mirror of Button/Autocomplete):
#      a `<Spinner size="sm">` is shown in the field's end/icon zone, native icon
#      (chevron/calendar) hidden while loading; input stays editable (not disabled).
# 7b — `size?: ComponentSize` on FileUpload + Accordion (Collapsible intentionally
#      skipped: its trigger is fully consumer-owned, no library chrome to scale).
# 7c — JSDoc on public props of types.ts interfaces (purely additive sweep).
#
# Run AFTER the parallel agents finish:  bash scripts/validate-api-consistency.sh
#
set -uo pipefail
cd "$(dirname "$0")/.."

FAIL=0
section() { printf '\n=== %s ===\n' "$1"; }

# ---------------------------------------------------------------------------
section "7a. loading prop in types (Input + Select share Input/types.ts)"
# Input/types.ts must declare loading for BOTH InputProps and SelectProps* (>=2 hits)
n=$(grep -c 'loading?:' src/components/Input/types.ts)
if [ "$n" -ge 2 ]; then echo "✓ Input/types.ts has loading?: ($n occurrences)"; else echo "❌ Input/types.ts: expected >=2 loading?: (Input+Select), got $n"; FAIL=1; fi
grep -q 'loading?:' src/components/DatePicker/types.ts && echo "✓ DatePicker/types.ts has loading?:" || { echo "❌ DatePicker/types.ts: missing loading?:"; FAIL=1; }

# ---------------------------------------------------------------------------
section "7a. Spinner wired in components (import + local.loading reference)"
for f in Input/Input.tsx Input/Select.tsx DatePicker/DatePicker.tsx; do
  p="src/components/$f"
  ok=1
  grep -q "Spinner" "$p"            || { echo "❌ $f: no Spinner reference"; ok=0; FAIL=1; }
  grep -qE "(local|props)\.loading" "$p" || { echo "❌ $f: no .loading reference"; ok=0; FAIL=1; }
  grep -q "'loading'" "$p"          || { echo "❌ $f: 'loading' not added to splitProps"; ok=0; FAIL=1; }
  [ "$ok" -eq 1 ] && echo "✓ $f (Spinner + loading + splitProps)"
done

# ---------------------------------------------------------------------------
section "7b. size prop in types + default 'md' in component (FileUpload, Accordion)"
for c in FileUpload Accordion; do
  t="src/components/$c/types.ts"
  grep -q 'size?:' "$t" && echo "✓ $c/types.ts has size?:" || { echo "❌ $c/types.ts: missing size?:"; FAIL=1; }
done
# FileUpload component: size lookup + md default
grep -qE "\.size *\?\? *'md'" src/components/FileUpload/FileUpload.tsx && echo "✓ FileUpload.tsx defaults size to 'md'" || { echo "❌ FileUpload.tsx: no \"?? 'md'\" default"; FAIL=1; }
# Accordion: size used in Accordion.tsx (passed to items) + AccordionPanel.tsx
grep -qE "\.size *\?\? *'md'" src/components/Accordion/Accordion.tsx && echo "✓ Accordion.tsx defaults size to 'md'" || { echo "❌ Accordion.tsx: no \"?? 'md'\" default"; FAIL=1; }

# ---------------------------------------------------------------------------
section "7b. Collapsible intentionally NOT given a size prop"
grep -q 'size?:' src/components/Collapsible/types.ts && { echo "❌ Collapsible/types.ts: unexpected size?: (should be skipped)"; FAIL=1; } || echo "✓ Collapsible has no size prop (skip is intentional)"

# ---------------------------------------------------------------------------
section "7c. JSDoc coverage sanity (no public prop interface left fully bare)"
# Heuristic: every types.ts that declares props should contain at least one /** */ block.
bare=0
while IFS= read -r t; do
  if grep -qE '^\s*[A-Za-z_].*\?:' "$t" && ! grep -q '/\*\*' "$t"; then
    echo "⚠ $t: declares props but has NO JSDoc block"; bare=$((bare+1))
  fi
done < <(find src/components -name types.ts)
if [ "$bare" -eq 0 ]; then echo "✓ no types.ts with props is completely undocumented"; else echo "⚠ $bare file(s) still bare (review)"; fi

# ---------------------------------------------------------------------------
section "Demo pages updated (new props demonstrated — CLAUDE.md rule)"
grep -q 'loading' demo/src/pages/forms/Input.tsx     && echo "✓ Input demo shows loading"     || { echo "❌ Input demo: no loading example"; FAIL=1; }
grep -q 'loading' demo/src/pages/forms/Select.tsx    && echo "✓ Select demo shows loading"    || { echo "❌ Select demo: no loading example"; FAIL=1; }
grep -q 'loading' demo/src/pages/forms/DatePicker.tsx && echo "✓ DatePicker demo shows loading" || { echo "❌ DatePicker demo: no loading example"; FAIL=1; }
grep -q 'size'    demo/src/pages/forms/FileUpload.tsx && echo "✓ FileUpload demo shows size"    || { echo "❌ FileUpload demo: no size example"; FAIL=1; }
grep -q 'size'    demo/src/pages/layout/Accordion.tsx && echo "✓ Accordion demo shows size"     || { echo "❌ Accordion demo: no size example"; FAIL=1; }

# ---------------------------------------------------------------------------
section "typecheck"
if bun run typecheck > /tmp/a7-tc.log 2>&1; then echo "✓ typecheck OK"; else echo "❌ typecheck FAILED:"; tail -25 /tmp/a7-tc.log; FAIL=1; fi

section "lint"
if bun run lint > /tmp/a7-lint.log 2>&1; then echo "✓ lint OK"; else echo "❌ lint FAILED:"; tail -25 /tmp/a7-lint.log; FAIL=1; fi

section "build"
if bun run build > /tmp/a7-build.log 2>&1; then echo "✓ build OK"; else echo "❌ build FAILED:"; tail -20 /tmp/a7-build.log; FAIL=1; fi

section "test"
if bun run test > /tmp/a7-test.log 2>&1; then echo "✓ test OK"; else echo "❌ test FAILED:"; tail -25 /tmp/a7-test.log; FAIL=1; fi

section "demo:build"
if bun run demo:build > /tmp/a7-demo.log 2>&1; then echo "✓ demo:build OK"; else echo "❌ demo:build FAILED:"; tail -25 /tmp/a7-demo.log; FAIL=1; fi

# ---------------------------------------------------------------------------
section "diff stat (src/components + demo)"
git diff --stat -- src/components demo/src/pages

printf '\n'
if [ "$FAIL" -eq 0 ]; then echo "✅ ALL CHECKS PASSED"; else echo "❌ SOME CHECKS FAILED — see above"; fi
exit "$FAIL"
