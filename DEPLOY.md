# DEPLOY.md - The Ayvede deploy runbook

This is the only approved path to production. It is the method that has shipped every
version of ayvede.com to date, most recently v7 on 2026-07-31. Follow it in order.
If any step forces you off this path, stop and present options to the owner instead
of improvising.

**Current live:** v7, `319303cc...`, 251,452 bytes. **Rollback target:** v6,
`https://ffe7597e-b66e-40a7-aad2-50f680f4c11a.usrfiles.com/ugd/ffe759_f4257b2ed3374e25889fd5eedc2d6988.txt`.
Full history with every hash is in [CHANGELOG.md](CHANGELOG.md).

**Note on the source path:** the working copy lives at `~/Desktop/2 | Ayvede/ayvede-v2.jsx`.
That path contains a space and a pipe character, so always quote it in shell commands.
The repo copy at `src/ayvede-v2.jsx` must stay byte-identical to it; verify with
`shasum -a 256` before any build you intend to publish.

## The architecture you are deploying into

- Wix site "Ayvede", id `1c0b108a-cd0e-49f0-b492-4a18b882430a`. This is the LIVE site.
  There is also "Ayvede Copy 3/13/26" (`0c3448c9-2daa-4da7-b450-7f6ec4906224`), a staging
  copy. Do not confuse them.
- Two Custom Embeds carry the site:
  - HEAD embed `29ef0f71-5657-4cdd-bed9-b1f3fa9ee820`: Google Fonts link plus CSS that
    hides `#SITE_CONTAINER`. Never touch it during a deploy.
  - BODY_END embed `7faf73b0-7876-433f-ab52-f7df3468db89`: `<div id="root">`, two React
    18.3.1 unpkg script tags, and a third script tag pointing at the hosted app bundle.
    Only that third src ever changes.

## The deploy, step by step

0. **Sync first.** Confirm `src/ayvede-v2.jsx` matches the working copy at
   `~/Desktop/2 | Ayvede/ayvede-v2.jsx`. A stale repo copy is how a wrong-file build
   happens.

1. **Edit `src/ayvede-v2.jsx`.** Keep the import block exactly five lines (the build
   asserts it). New lucide icons go in both the import and `build/header.jsx`.

2. **Build the bundle.**

   ```
   npm run build
   ```

   Under the hood this runs, verbatim:

   ```
   node_modules/.bin/esbuild build/.scratch/app.jsx --loader:.jsx=jsx --outfile=build/.scratch/app.js --charset=utf8
   ```

   after splicing `build/header.jsx` + `build/insights-data.js` + the source body, and
   then emits `dist/app-embed.js` (deployable) and `dist/index.html` (preview).
   esbuild is pinned at 0.24.2; changing the pin changes output bytes.

3. **Serve a local preview and verify.** From `dist/`: `python3 -m http.server 8642`,
   then open `http://127.0.0.1:8642/index.html`. Click through every page. Run the
   verification checklist below against the preview.

4. **WAIT for owner approval. This gate is mandatory, every deploy, no exceptions.**
   Show the owner the preview and what changed. Nothing proceeds until an explicit go.

5. **Owner uploads the bundle.** Copy `dist/app-embed.js` to `dist/ayvede-app-vN.txt`
   (bump N; the `.txt` name is required because Media Manager rejects `.js`). The owner
   uploads it to the Wix **Media Manager on the LIVE site "Ayvede"**
   (`1c0b108a-cd0e-49f0-b492-4a18b882430a`), NOT "Ayvede Copy". The upload uses a native
   file dialog no agent can drive. That is expected and fine; it is the owner's step.

6. **Owner returns the new URL.** It looks like
   `https://ffe7597e-....usrfiles.com/ugd/ffe759_<hash>.txt`. Before using it, verify the
   uploaded bytes: fetch the URL and confirm its sha256 equals the local
   `dist/app-embed.js`. If it does not match, stop.

7. **Swap ONLY the third script tag src in the Body-End embed.** Leave both React script
   tags and the entire Head embed byte-identical. Two proven ways:
   - Wix REST (when the API tooling is healthy): GET
     `https://www.wixapis.com/embeds/v1/custom-embeds/7faf73b0-7876-433f-ab52-f7df3468db89`
     for the current revision, then PATCH the same object with only the bundle URL
     replaced in `embedData.html`, passing that revision.
   - Dashboard UI (when the API is degraded): manage.wix.com, Settings, Custom Code,
     edit the Body-End embed "Ayvede App", replace the URL, Apply.

8. **Publish, then hard-fetch to verify.** Publish via
   `POST https://www.wixapis.com/site-publisher/v1/site/publish` or the dashboard button.
   Note: Wix applies custom-code edits server-side immediately, but publish anyway and
   verify with fresh fetches of BOTH `https://ayvede.com` and `https://www.ayvede.com`
   (append `?cb=<timestamp>` to defeat edge caching). Confirm the new bundle URL is the
   only one served and the old URL appears zero times. Then run the full checklist
   against the LIVE site.

9. **Rollback is one paste.** Repoint that same third script src to the previous bundle
   URL (recorded in CHANGELOG.md), Apply, and confirm with a hard fetch. Always capture
   the current live URL before step 7 so the rollback target is certain.

## Live verification checklist (from the v4 deploy)

- Six-tab nav renders; the Solutions dropdown opens on hover and click, navigates, and
  shows the active state when a child page is open
- All nine destinations render with correct content (Home, Advisory, Programs, Platform,
  Innovation Lab, Tools, Insights, Vision, Connect)
- Tools calculator loads; selections recompute totals live; seat edits recompute
  exactly; overlap flags fire correctly (spot-check the math by hand)
- Insights hub: all cards present, category filter works, keyword search works, reader
  opens and renders tables, back returns to the grid
- Both forms and the footer open a prefilled email to anthonydellapia@gmail.com
- Zero `@ayvede.com` anywhere in the served bundle
- No console errors from the app itself. Known noise: Wix's loader logs
  "App not found for script, errorId: 404C" for every custom-embed script tag. It is
  platform noise, present on every version since v1; it is not an app error.
- 375px mobile: grouped burger menu works, no horizontal overflow on any page including
  the calculator with selections open

## A future Vercel migration (prose only, no config lives in this repo)

If the site ever outgrows the Wix shell, the natural move is static hosting (Vercel or
similar). What it would actually require:

- Serve `dist/index.html` (or a split index.html plus bundle file) as a static site.
  The artifact is already self-contained, so the build needs no framework adapter.
- Point the `ayvede.com` DNS at the new host: an A/ALIAS record for the apex and a CNAME
  for www, per the host's instructions, at the registrar.
- Decide what happens to the Wix subscription and the Media Manager bundle history
  before touching DNS. Export anything worth keeping.
- Re-verify SEO basics after the move (title, description, favicon, and whether
  per-page titles or prerendering are worth adding once off Wix).

**Warning: Wix and Vercel cannot both serve the domain.** DNS points at exactly one
host. Moving it is a hard cutover for ayvede.com, and email or other DNS records at the
registrar must be preserved during the change. This migration is a deliberate project
with its own approval gate, not a side effect of any deploy. Until the owner explicitly
commissions it, the Wix embed method above is the only deploy path.
