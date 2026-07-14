# INSIGHTS-PIPELINE.md

How briefings get from a writing session to the live Insights hub.

## The flow

1. **Authoring.** The Cowork agent writes each article as a Google Doc into the Drive
   folder "AI, Properly > Newsletters", folder ID `1iRf-KWXYoaRCTwzzi0bg5S2T4A4aHu8o`.
   One Doc per article, filename `YYYYMMDD - Title`.

2. **Doc format.** Each Doc uses labeled fields, in this order:

   ```
   TITLE
   TEASER
   CATEGORY
   PHOTO DIRECTION
   DATE
   ARTICLE
   ```

   Notes on fields:
   - CATEGORY takes one or two values from the closed set below. Separators accepted:
     comma or middle dot ("Data Governance · ERP"). The first value becomes the card's
     primary tag, the second becomes the secondary tag (also filterable).
   - PHOTO DIRECTION is parsed only so it cannot bleed into the article body, then
     discarded. The pipeline is deliberately photoless (owner decision, 2026-07-10).
   - ARTICLE is markdown. Supported in the in-app reader: headings, bold, italic,
     links, and tables. Tables survive blank lines between rows, and `|---|` separator
     rows are skipped.

3. **Pull.** The `/ayvede-insights-refresh` skill (copied into this repo at
   `.claude/skills/ayvede-insights-refresh/`) reads the folder via the Google Drive
   connector, READ-ONLY, and exports each Doc to `docs-raw/<Doc name>.md` in the
   working folder, with a `<!-- doc_id: ... -->` first line.

4. **Parse.** `node scripts/pull-insights.mjs` regenerates `insights-data.js`
   idempotently from those markdown exports: slug, title, teaser, category,
   secondaryCategory, date, and body per article, sorted for the hub. No photos, no
   API keys, no network calls.

5. **Build.** The build splices `insights-data.js` ahead of the source (the site reads
   a global `INSIGHTS_DATA`), so briefings are baked into the bundle at build time.
   There is no runtime CMS; shipping new briefings means rebuilding and redeploying by
   DEPLOY.md, including its approval gate.

## The closed category set

Exactly these six, spelled exactly like this:

- Data Governance
- ERP
- Legal
- Healthcare
- Finance
- General AI News

The hub's filter pills render from this set (`INS_CATEGORIES` in the source). A new
category is a source change, not a Doc-side improvisation.

## The card visual

Cards and the reader use no photography. Each briefing gets a deterministic
constellation motif (`CardMotif` in the source): a seeded navy, teal, and gold
node-and-edge graph generated client-side from the article slug, 16:9 on cards and a
slim 8:1 strip in the reader. Same slug, same motif, every render, no assets, no
network.

## Known parked issue

The refresh reprocesses the **entire folder every run**: every Doc is re-exported and
the whole data module is regenerated, whether or not anything changed. At 10 briefings
this costs seconds and stays perfectly idempotent, so it is parked on purpose. If the
folder grows to hundreds of Docs, add incremental pulls (compare Drive modified times
against the `doc_id` lines in `docs-raw/`) before it becomes a problem.
