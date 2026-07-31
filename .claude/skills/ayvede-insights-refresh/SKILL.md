---
description: Refresh the Ayvede Insights hub from Drive, rebuild, deploy by the approved gate, and push the repo so it never falls behind live
---

Refresh The Ayvede Briefing end to end. This command owns the whole path: pull, build,
preview, approval, deploy, and repo push. Do not stop at the build. A run that ends
without pushing the repo has failed, because that is exactly how the repo fell 2
versions behind live in July 2026.

Load the `ayvede-fidelity-and-deploy-guardrail` skill and keep it loaded throughout.

## Paths, exactly

- Working source, the truth: `~/Desktop/2 | Ayvede/ayvede-v2.jsx`
  (the path has a space and a pipe, always quote it)
- Repo mirror: `~/Desktop/2 | Ayvede/ayvede-site/src/ayvede-v2.jsx`
- Repo: https://github.com/anthonydellapia1117/ayvede-site (public, branch main)
- Older paths in any older doc (`~/Downloads/`, `~/Desktop/3 | Ai & Apps/`) are dead.
  A stale copy named `ARCHIVED-*` sits in the folder. Never build from it.

## 1. Sync gate, before anything else

Confirm the working source and the repo mirror are byte-identical (`shasum -a 256`).
Confirm the repo tree is clean and level with `origin/main`.

**If they differ, STOP.** Report which is newer and what changed. Do not build, do not
pull from Drive, do not guess which one is right. A wrong-file build is worse than a
late refresh.

## 2. Capture the rollback URL

Hard-fetch `https://www.ayvede.com/?cb=<timestamp>` and read the third script src out
of the BODY_END embed. That URL is the rollback. Hand it to Anthony before any other
step, and record the live article count while you are there.

## 3. Pull from Drive, read-only

Folder "AI, Properly > Newsletters", ID `1iRf-KWXYoaRCTwzzi0bg5S2T4A4aHu8o`.

Never modify or delete anything in Drive. If the Google Drive connector is not
authorized in the session, say so plainly and stop; do not invent article content.

Enumerate the Docs (search by `parentId`), then export each one's text and write
`docs-raw/<Doc name>.md` with a first line `<!-- doc_id: <id> -->` followed by the
export verbatim. Remove any `docs-raw/*.md` whose Doc no longer exists in the folder.
Re-export Docs whose `modifiedTime` is newer than the local copy.

## 4. Parse

Run `node scripts/pull-insights.mjs` from the project root. It regenerates
`site-build/insights-data.js` idempotently.

**No card may disappear silently.** The script prints every malformed or dropped Doc.
Read that output. If a Doc was dropped, find out why and fix the parser permanently in
`scripts/pull-insights.mjs`, then say what you changed. Known field-shape variations
already handled, do not regress them:

- CATEGORY separated by comma or middle dot (`A, B` or `A · B`)
- The whole header block emitted on ONE line
  (`TITLE: ... TEASER: ... CATEGORY: ... DATE: ... ARTICLE:`), not one field per line
- Markdown tables with blank lines between rows, and `|---|` separator rows
- Google's backslash-escaped formatting characters
- Label-shaped text inside the body, which must never truncate the article
- Duplicate titles, which get stable numbered slugs

Closed category set, exactly: Data Governance, ERP, Legal, Healthcare, Finance,
General AI News. A tag outside it is a content-engine bug, not a parser bug.

The pipeline is photoless on purpose. PHOTO DIRECTION is parsed only so it cannot bleed
into the body, then discarded. Cards render the seeded constellation motif client-side.
Zero img tags, zero external requests, no API key, never error on a missing key.

## 5. Rebuild

Run `python3 site-build/build.py html`. Report the new bundle size against the current
live size. Flag it if the bundle is growing toward a level that would slow first paint;
the fix when that day comes is a recency window or progressive reveal, not dropping
articles.

## 6. Verify locally, then STOP

Serve `site-build/dist/` and check, at minimum:

- every card renders, count matches the parser output
- category filter, including secondary tags
- keyword search across body text, not just titles
- in-app reader opens, renders tables, and returns to the grid
- both empty states
- zero img tags anywhere
- no horizontal overflow at 375px, including the reader and any wide table
- forms still resolve on-page, no console errors

Then **stop and show Anthony a local preview.** Do not publish. The approval gate is
mandatory on every deploy, no exceptions.

## 7. Deploy, only after explicit approval

Anthony uploads the staged `.txt` to Wix Media Manager on the LIVE site "Ayvede"
(`1c0b108a-cd0e-49f0-b492-4a18b882430a`), not "Ayvede Copy", and returns the URL. That
upload uses a native file dialog no agent can drive; it is his step and it doubles as
the gate.

Verify the uploaded bytes match the local build by sha256 before touching the embed.

Then swap **only** the third script tag src in the BODY_END embed
(`7faf73b0-7876-433f-ab52-f7df3468db89`). Leave both React CDN tags, the root div, and
the entire HEAD embed byte-identical. Publish. Hard-fetch both `ayvede.com` and
`www.ayvede.com` with a cache-buster and confirm the new article count is live.

Rollback is one paste: repoint that same src to the URL from step 2.

## 8. Push the repo, same run

This step is not optional and it is not a later task.

- Sync the repo mirror to the shipped source and `insights-data.js`
- Copy the shipped bundle to `ayvede-site/dist/ayvede-app-vN.txt`
- Update `CHANGELOG.md`: version, date, size, sha256, live URL, article count, and what
  changed. Mark the new version LIVE and the prior one superseded
- Copy this command file to `.claude/skills/ayvede-insights-refresh/SKILL.md` if it
  changed
- Commit and push to `main`
- Check the Actions run yourself. The repo is public, so
  `https://api.github.com/repos/anthonydellapia1117/ayvede-site/actions/runs` is
  readable with no token. Confirm the verify-build job passed. If the hash check fails,
  the repo no longer reproduces live; say so plainly rather than reporting a green check

Never write a token into a file, a script, `.git/config`, or the remote URL. The macOS
keychain holds the credential.

## 9. Report

Article count before and after. Every dropped or malformed Doc and why. Any parser
change made permanent. Bundle size against the previous version. The rollback URL. The
commit hash and the CI result.
