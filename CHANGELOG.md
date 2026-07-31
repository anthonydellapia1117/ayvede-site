# CHANGELOG

This file is the recovery record. Each entry pins the exact bundle that served
ayvede.com, its checksum, and its hosted URL. Rolling back means repointing the
Body-End embed's third script src to the URL of the version you want (see DEPLOY.md,
step 9). Never delete entries.

Every published bundle is archived in `dist/` as `ayvede-app-vN.txt` except v1, whose
bytes live only at its hosted URL. The regenerated build outputs (`dist/app-embed.js`,
`dist/index.html`) are deliberately not tracked; see "Bundle policy" at the bottom.

## v7 - 2026-07-31 (LIVE)

- **Bundle URL:** https://ffe7597e-b66e-40a7-aad2-50f680f4c11a.usrfiles.com/ugd/ffe759_d63c523f044143d4a17e9ce18327740b.txt
- **sha256:** `319303cc04e7d2bec0a4d7a7f7ffe27bd4d3ce3440ef6880a9d22fad74a1c00d`
- **Size:** 251,452 bytes
- **Briefings:** 30 (up from 16)
- **Archived:** `dist/ayvede-app-v7.txt`
- **Changes:**
  - **Insights refresh, 16 to 30 briefings.** 14 new Docs dated 2026-07-23 through
    2026-07-31 pulled read-only from the Drive Newsletters folder.
  - **Parser fix, permanent.** Two of the new Docs emit the whole header block on a
    single line (`TITLE: ... TEASER: ... CATEGORY: ... DATE: ... ARTICLE:`) rather than
    one field per line. `scripts/pull-insights.mjs` anchored labels to line starts, so
    it found only TITLE and dropped both Docs as malformed; the run produced 28 of 30
    cards with two briefings silently missing. The label match changed from
    `^(LABELS):` to `(^|\s)(LABELS):`, accepting a label at a line start or after
    whitespace. The existing ARTICLE cutoff still prevents body text from being read as
    a field, which is what keeps the looser match safe. Both header shapes now parse.
  - **Insights grid fix.** The briefing grid shared `.g3`, which uses
    `repeat(auto-fit, ...)`. `auto-fit` collapses empty tracks, so a single filter
    result stretched from 260px to 739px. The grid now uses a dedicated
    `.insGrid` class with `auto-fill` and identical `minmax` sizing, holding the card
    at a constant width and left alignment at 1, 2, 3, 4, or 30 results. `.g3` is
    unchanged, because it is shared by five fixed-count grids (Home risks and services,
    Advisory tiers, Vision philosophy, Tools registry) whose 3-item rows are designed to
    span the full row; switching them to `auto-fill` would have left gaps on four pages.
    Verified by A/B test that the unfiltered view is pixel-identical under both rules.
- **Note on bundle weight:** usrfiles serves this file uncompressed (no
  `content-encoding` on the response), so the full 251 KB crosses the wire. Gzipped it
  would be 76 KB. At roughly 3.5 KB per briefing and two briefings a week, plan the
  recency window or progressive reveal before the bundle doubles again.
- **Deploy method:** Wix REST API, embed PATCH revision 6 to 7, then site publish.

## v6 - 2026-07-30 (superseded)

- **Bundle URL:** https://ffe7597e-b66e-40a7-aad2-50f680f4c11a.usrfiles.com/ugd/ffe759_f4257b2ed3374e25889fd5eedc2d6988.txt
- **sha256:** `f169b1441cb54c398bb0937d0e8986ae44abe174527e1eaeeba344d9c9e426f3`
- **Size:** 198,531 bytes
- **Archived:** `dist/ayvede-app-v6.txt`
- **Changes:**
  - **Forms moved off mailto to background submission.** All three submissions
    (Subscribe, Connect inquiry, Tools results) POST to Formspree with the JSON accept
    header and resolve on-page. Nothing navigates, nothing opens a mail client. Four
    states each: idle, submitting (button disabled with a pending label, inputs
    locked), success (on-page confirmation), error (message plus a direct-email
    fallback). Client-side email validation before submit. Three separate endpoint
    constants sit at the top of the source next to EMAIL.
  - **Tools results nuance:** the itemized results render on-page immediately on
    submit regardless of network outcome. The on-page result is the deliverable; the
    emailed copy is the follow-up.
  - **Contrast sweep:** every readable use of `#4a5568` moved to `#7a8ba3` via the
    `.dim` and `.tcNote` definitions, clearing seventeen WCAG AA failures. The
    decorative hero chip separator dot stays `#4a5568` on purpose.
  - **Footer:** the four non-functional social spans (LinkedIn, X, YouTube, Instagram)
    removed rather than left reading as broken links.
  - **Copy:** the Connect note that claimed "Opens your email client" replaced with
    "Goes straight to Anthony. Confidential by default."
- **Known state at ship:** the three Formspree endpoints carry `YOUR_*_ID`
  placeholders. Submissions therefore resolve to the on-page error state with the
  email fallback until real form IDs are pasted at `src/ayvede-v2.jsx` lines 22-24 and
  the bundle is rebuilt. Nothing is captured before that.
- **Deploy method:** Wix REST API, embed PATCH revision 5 to 6, then site publish.

## v5 - 2026-07-21 (superseded)

- **Bundle URL:** https://ffe7597e-b66e-40a7-aad2-50f680f4c11a.usrfiles.com/ugd/ffe759_0dfab2b190c44cc5aaff3eab005604e5.txt
- **sha256:** `3730d157e41cf33fc46a253ef6a57a65e409dccdb2b496126bbc1d6b8ce944de`
- **Size:** 192,443 bytes
- **Archived:** `dist/ayvede-app-v5.txt`
- **Changes:** Insights refresh from 10 briefings to 16. Site code otherwise identical
  to v4; the only delta is the generated insights data module.
- **Note:** the deploy date is inferred from the local artifact timestamp
  (2026-07-21 11:07). The session that published it left no runbook entry, which is
  the gap this repo exists to close.

## v4 - 2026-07-14 (superseded)

- **Bundle URL:** https://ffe7597e-b66e-40a7-aad2-50f680f4c11a.usrfiles.com/ugd/ffe759_f961df8dccfb43a7ba675d186a69b8a0.txt
- **sha256:** `524b57c1804c4204e432c57af68387c0c31df2cc10b6fbe717891eb8389f7dd3`
- **Size:** 169,650 bytes (an earlier revision of this file recorded 169,673; that
  figure was wrong and is corrected here)
- **Archived:** `dist/ayvede-app-v4.txt`
- **Changes:**
  - Navigation regrouped from eight flat tabs to six top-level items: Home, Solutions
    (dropdown: Advisory, Programs, Platform, Innovation Lab), Tools, Insights, Vision,
    plus the Connect CTA. Zero pages deleted; the four service pages moved one level
    down with content untouched. Mobile burger menu gained a grouped Solutions
    section. Footer became the full nine-item sitemap.
  - New Tools tab: the Spend Diagnostic. 38-tool catalog at list prices verified
    2026-07-14, live totals, seat steppers, custom rows, spend-versus-stranded bar at
    the sourced 36 percent benchmark, suite-aware overlap flags, sourced benchmarks
    section, extensible tools registry.
  - Home gained a diagnostic teaser card; Connect gained the diagnostic interest
    option and a preset mechanism.

## v3 - 2026-07-14 (superseded)

- **Bundle URL:** https://ffe7597e-b66e-40a7-aad2-50f680f4c11a.usrfiles.com/ugd/ffe759_c053b43ada9a4cb79250f0b0ae52a089.txt
- **sha256:** `dc37efacbe725c96d8f68dbdac4342005419d53703fbc12e7b23290516a9d8aa`
- **Size:** 137,383 bytes
- **Archived:** `dist/ayvede-app-v3.txt`
- **Changes:** Insights refresh from 5 to 10 briefings. Two parser fixes: CATEGORY
  accepts a middle-dot separator in addition to commas; markdown tables with blank
  lines between rows render as one table. Eight flat navigation tabs (pre-restructure).

## v2 - 2026-07-10 (superseded)

- **Bundle URL:** https://ffe7597e-b66e-40a7-aad2-50f680f4c11a.usrfiles.com/ugd/ffe759_ab74c803df4d4657ae379d1da6568d56.txt
- **sha256:** `10d933ca298a5233f4ca85f58ad09becef069bf534575d432a9e45c4345a6754`
- **Size:** 117,769 bytes
- **Archived:** `dist/ayvede-app-v2.txt`
- **Changes:** Contact email moved to anthonydellapia@gmail.com everywhere. Insights
  rebuilt as a newsletter hub with client-side constellation motifs; photography
  removed permanently at the owner's decision. 5 briefings.

## v1 - 2026-07-07 (superseded)

- **Bundle URL:** https://1c0b108a-cd0e-49f0-b492-4a18b882430a.usrfiles.com/ugd/ffe759_3f61ae887e5f422382353efc90fc0837.txt
- **sha256:** `1efdb2df79778d199e9186090681e967a1065a7aec76968275503ef9c1c19a71`
- **Size:** 79,010 bytes
- **Archived:** not on disk; the bytes remain retrievable at the URL above
- **Changes:** First production embed of the compiled SPA over the blank Wix shell.
- **Note:** this 79,010-byte figure is the origin of the "roughly 79 KB" bundle size
  that circulated in later sessions and could not be matched to any file. It was v1.

## Bundle policy

The repo tracks the **published deploy artifacts** (`dist/ayvede-app-vN.txt`) and
ignores the **regenerated build outputs** (`dist/app-embed.js`, `dist/index.html`).
This continues the convention the repo started with, and the reasoning holds:

- The versioned `.txt` files are the recovery record. They are the exact bytes that
  served the site, they are what a rollback points at, and they cannot be regenerated
  if the source or the toolchain ever drifts. Roughly 800 KB total across five files.
- `app-embed.js` and `index.html` are deterministic output of `npm run build` from
  tracked inputs. Tracking them would add churn to every commit and duplicate bytes
  already archived under a version name.

Every hash is recorded above whether or not the file is tracked, so rollback stays
traceable either way.
