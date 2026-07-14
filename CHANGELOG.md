# CHANGELOG

This file is the recovery record. Each entry pins the exact bundle that served
ayvede.com, its checksum, and its hosted URL. Rolling back means repointing the
Body-End embed's third script src to the URL of the version you want (see DEPLOY.md,
step 9). Never delete entries.

## v4 - 2026-07-14 (LIVE)

- **Bundle URL:** https://ffe7597e-b66e-40a7-aad2-50f680f4c11a.usrfiles.com/ugd/ffe759_f961df8dccfb43a7ba675d186a69b8a0.txt
- **sha256:** `524b57c1804c4204e432c57af68387c0c31df2cc10b6fbe717891eb8389f7dd3`
- **Size:** 169,673 bytes
- **Archived in repo:** `dist/ayvede-app-v4.txt`
- **Changes:**
  - Navigation regrouped from eight flat tabs to six top-level items: Home, Solutions
    (dropdown: Advisory, Programs, Platform, Innovation Lab), Tools, Insights, Vision,
    plus the Connect CTA. Zero pages deleted; the four service pages moved one level
    down with content untouched. Mobile burger menu gained a grouped Solutions section.
    Footer became the full nine-item sitemap.
  - New Tools tab: the Spend Diagnostic. 38-tool catalog across seven categories at
    real list prices verified 2026-07-14 (editable `TOOL_CATALOG` array in the source
    with `PRICING_ASOF` date; unverifiable rates flagged in the UI). Live monthly and
    annual totals, seat steppers, usage inputs for APIs, custom rows, spend-versus-
    stranded bar at the sourced 36 percent benchmark (Zylo 2026 SaaS Management Index),
    suite-aware overlap flags across twelve capability groups, sourced benchmarks
    section, extensible `TOOL_REGISTRY` for future diagnostics, CTAs to Connect (with
    interest preselect) and a prefilled results email.
  - Home: one diagnostic teaser card added after the Problem section.
  - Connect: new "AI & SaaS Spend Diagnostic" interest option; form accepts a preset.
  - New inline icons (ChevronDown, Plus, Minus, TriangleAlert) added to the source
    import block and `build/header.jsx`.
- **Deploy method:** Wix REST API (embed PATCH revision 3 to 4, then site publish).

## v3 - 2026-07-14 (rollback target)

- **Bundle URL:** https://ffe7597e-b66e-40a7-aad2-50f680f4c11a.usrfiles.com/ugd/ffe759_c053b43ada9a4cb79250f0b0ae52a089.txt
- **sha256:** `dc37efacbe725c96d8f68dbdac4342005419d53703fbc12e7b23290516a9d8aa`
- **Size:** 137,383 bytes
- **Changes:**
  - Weekly Insights refresh: hub grew from 5 to 10 briefings (five new dated
    2026-07-14).
  - Parser fixes in the pipeline: CATEGORY accepts a middle-dot separator ("A · B") in
    addition to commas; markdown tables with blank lines between rows and `|---|`
    separator rows render as a single table.
  - Eight flat navigation tabs (the pre-restructure layout).
- **Deploy method:** Media Manager upload plus Body-End URL swap via the dashboard UI
  (the Wix REST tooling was degraded that session).

## Older versions (context only)

- v2 (2026-07-10, 117,769 bytes): contact email moved to anthonydellapia@gmail.com
  everywhere; Insights rebuilt as a newsletter hub with constellation motifs (photos
  removed permanently); 5 briefings.
  URL: https://ffe7597e-b66e-40a7-aad2-50f680f4c11a.usrfiles.com/ugd/ffe759_ab74c803df4d4657ae379d1da6568d56.txt
- v1 (2026-07-07, ~97 KB): first production embed of the compiled SPA over the blank
  Wix shell.
  URL: https://1c0b108a-cd0e-49f0-b492-4a18b882430a.usrfiles.com/ugd/ffe759_3f61ae887e5f422382353efc90fc0837.txt
