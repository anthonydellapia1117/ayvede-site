#!/usr/bin/env bash
# Verify this repo still reproduces the bundle that is live on ayvede.com.
#
# Two independent assertions, deliberately separated so a failure is diagnosable:
#
#   A. ARCHIVE INTEGRITY (platform-independent)
#      The committed deploy artifact dist/ayvede-app-<LIVE>.txt hashes to the
#      sha256 recorded in the CHANGELOG entry marked LIVE. This is pure file
#      reading. It always proves something real: the recovery artifact matches
#      its record, so a rollback points at the bytes we think it does.
#
#   B. REPRODUCIBILITY (carries a platform assumption, see below)
#      A fresh `npm run build` from the tracked inputs produces that same hash.
#      This proves src/ + build/ still generate exactly what is deployed.
#
# Assertion B assumes esbuild emits byte-identical output across operating
# systems for a pinned version. That holds in principle (the transform is pure)
# but has not been verified on this project across platforms. If B fails while
# A passes and the source is unchanged, suspect the runner platform before
# suspecting the code, and see the note in the CI workflow.
#
# Usage:  ./scripts/verify-build.sh
# Exit:   0 all good, 1 a check failed.

set -uo pipefail
cd "$(dirname "$0")/.."

sha() {
  if command -v sha256sum >/dev/null 2>&1; then sha256sum "$1" | cut -d' ' -f1
  else shasum -a 256 "$1" | cut -d' ' -f1; fi
}

fail=0
note() { printf '%s\n' "$*"; }

# ---- Parse the CHANGELOG entry marked LIVE -------------------------------
LIVE_VER=$(awk '/^## v[0-9]+ .*\(LIVE\)/ { match($0, /v[0-9]+/); print substr($0, RSTART, RLENGTH); exit }' CHANGELOG.md)
LIVE_SHA=$(awk '/^## v[0-9]+ .*\(LIVE\)/ { f=1; next } f && /\*\*sha256:\*\*/ { print; exit }' CHANGELOG.md | grep -oE '[a-f0-9]{64}' | head -1)

if [ -z "$LIVE_VER" ] || [ -z "$LIVE_SHA" ]; then
  note "FAIL: could not parse a LIVE entry from CHANGELOG.md."
  note "      Expected a heading like '## v6 - YYYY-MM-DD (LIVE)' followed by a"
  note "      '- **sha256:** \`<64 hex>\`' line."
  exit 1
fi
if [ ${#LIVE_SHA} -ne 64 ]; then
  note "FAIL: parsed sha256 for $LIVE_VER is not 64 hex chars: '$LIVE_SHA'"
  exit 1
fi

note "CHANGELOG says LIVE is $LIVE_VER"
note "  expected sha256: $LIVE_SHA"
note ""

# ---- A. Archive integrity ------------------------------------------------
ARTIFACT="dist/ayvede-app-${LIVE_VER}.txt"
if [ ! -f "$ARTIFACT" ]; then
  note "FAIL [A archive]: $ARTIFACT is missing. The LIVE bundle must be committed."
  fail=1
else
  A_SHA=$(sha "$ARTIFACT")
  if [ "$A_SHA" = "$LIVE_SHA" ]; then
    note "PASS [A archive]: $ARTIFACT matches the CHANGELOG hash."
  else
    note "FAIL [A archive]: $ARTIFACT does not match the CHANGELOG hash."
    note "  artifact : $A_SHA"
    note "  changelog: $LIVE_SHA"
    note "  Either the committed artifact is not the deployed bundle, or the"
    note "  CHANGELOG hash is wrong. Fix before trusting any rollback."
    fail=1
  fi
fi
note ""

# ---- B. Reproducibility --------------------------------------------------
note "Building from tracked inputs..."
if ! npm run build >/tmp/ayvede-build.log 2>&1; then
  note "FAIL [B build]: the build itself errored. Output:"
  tail -30 /tmp/ayvede-build.log
  exit 1
fi

if [ ! -f dist/app-embed.js ]; then
  note "FAIL [B build]: dist/app-embed.js was not produced."
  exit 1
fi

B_SHA=$(sha dist/app-embed.js)
if [ "$B_SHA" = "$LIVE_SHA" ]; then
  note "PASS [B reproducibility]: a fresh build reproduces $LIVE_VER exactly."
else
  note "FAIL [B reproducibility]: the build does not match the LIVE hash."
  note "  built    : $B_SHA"
  note "  changelog: $LIVE_SHA"
  note ""
  note "  Diagnose in this order:"
  note "  1. Did src/ayvede-v2.jsx or build/insights-data.js change without the"
  note "     CHANGELOG being updated? That is the usual cause and it means the"
  note "     repo is ahead of, or behind, what is deployed."
  note "  2. Is esbuild still pinned to the version in package.json? A different"
  note "     esbuild version changes output bytes."
  note "  3. If assertion A passed and the source is untouched, this may be a"
  note "     cross-platform byte difference in esbuild output. Reproduce locally"
  note "     on macOS before changing any code."
  fail=1
fi

note ""
if [ "$fail" -eq 0 ]; then
  note "OK: archive and reproducibility both verified against $LIVE_VER."
else
  note "One or more checks failed. See above."
fi
exit "$fail"
