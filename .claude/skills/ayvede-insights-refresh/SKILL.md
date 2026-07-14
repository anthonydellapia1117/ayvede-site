---
description: Pull new "AI, Properly" newsletters from Google Drive (read-only) and rebuild the Ayvede site artifact
---

Refresh the Ayvede Insights hub. Project root: `/Users/anthony/Desktop/3 | Ai & Apps/Ayvede` (quote the path — it contains spaces and a pipe).

1. **Pull from Drive (READ-ONLY — never modify or delete anything in Drive).**
   Using the Google Drive connector, list every Google Doc in the Newsletters folder, ID `1iRf-KWXYoaRCTwzzi0bg5S2T4A4aHu8o` ("AI, Properly > Newsletters"). The local sync at `~/Library/CloudStorage/GoogleDrive-anthonydellapia@gmail.com/My Drive/01 - Ayvede/Ai, Properly/Newsletters/` shows the current `.gdoc` stubs — each stub's JSON contains the `doc_id`; use it to enumerate docs, then fetch each Doc's text via the connector (`read_file_content` with the doc_id). For each Doc, write `docs-raw/<Doc name>.md` containing a first line `<!-- doc_id: <id> -->` followed by the connector's exported text verbatim. Re-export every Doc each run (updates included); remove `docs-raw/*.md` files whose Doc no longer exists in the folder.

2. **Parse:** run `node scripts/pull-insights.mjs` from the project root. It regenerates `site-build/insights-data.js` idempotently. **No photos** — the pipeline is intentionally photoless (removed 2026-07-10 at the owner's request). Cards render an on-brand constellation motif generated client-side from the slug (the site's `CardMotif` component). The Doc's PHOTO DIRECTION field is parsed only so it can't bleed into the body, then discarded. No image sourcing, no API key, no network calls — never error on a missing key.

3. **Rebuild:** run `python3 site-build/build.py html`.

4. **Test locally** (serve `site-build/dist/` and check in the browser): all 8 sections render, nav works, Insights hub shows the motif cards, category pills + keyword search filter live, clicking a card opens the in-app reader (slim motif strip, no photo), back control returns, both forms build mailto: links to anthonydellapia@gmail.com.

5. **Report:** cards generated, malformed Docs skipped, artifact size.

6. **Publish gate:** do NOT push anything to Wix and do NOT touch domain/DNS unless Anthony explicitly approves in this conversation. When he approves, follow `site-build/PUBLISH.md` exactly (upload new `dist/app-embed.js` to Wix Media Manager, update the BODY_END custom embed's script URL, republish the site).
