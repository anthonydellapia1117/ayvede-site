# Publishing the Ayvede artifact to Wix (the original full-bleed method)

The live site (ayvede.wixsite.com/my-site-1, Wix site id `1c0b108a-cd0e-49f0-b492-4a18b882430a`)
is NOT a native Wix site. It is this compiled app rendered full-bleed over a blank
Wix shell via two **Custom Embeds** (Wix Custom Embeds API):

- HEAD embed `29ef0f71-5657-4cdd-bed9-b1f3fa9ee820`: Google Fonts `<link>` +
  `<style>#SITE_CONTAINER{display:none!important}html,body{margin:0!important;padding:0!important;background:#0b1120!important}</style>`
- BODY_END embed `7faf73b0-7876-433f-ab52-f7df3468db89`:
  `<div id="root"></div>` + React 18.3.1 UMD CDN scripts + `<script src="<hosted app-embed.js>">`

The app bundle (`dist/app-embed.js` — transpiled app that self-injects its CSS) is
hosted in the site's own Wix Media Manager. Notes that matter:

- Media Manager rejects `.html`/`.js` names and `text/html` mime. Upload as
  `mimeType: text/plain`, fileName like `ayvede-app-embed-vN.txt`. usrfiles.com
  serves without `X-Content-Type-Options: nosniff`, so `<script src>` executes it fine.
- Upload flow: `POST https://www.wixapis.com/site-media/v1/files/generate-upload-url`
  (as the Ayvede site) → `curl -X PUT "<uploadUrl>?filename=<name>" -H "Content-Type: text/plain" --data-binary @dist/app-embed.js`
  → response contains the public `https://1c0b108a-....usrfiles.com/ugd/....txt` URL.
- Each upload gets a NEW url, so after uploading: PATCH the BODY_END custom embed
  (`PATCH https://www.wixapis.com/embeds/v1/custom-embeds/7faf73b0-7876-433f-ab52-f7df3468db89`,
  pass current `revision`) replacing the app `<script src>` URL.
- Then publish: `POST https://www.wixapis.com/site-publisher/v1/site/publish` (site id above).
- Verify live: fetch the site, confirm new script URL present; open in a browser and
  spot-check. (Reveal animations don't fire in background tabs — that's a browser
  behavior, not a bug.)
- Staging trick if needed: the copy site `0c3448c9-2daa-4da7-b450-7f6ec4906224`
  (ayvede.wixsite.com/website-1) carries the same two-embed setup
  (HEAD `b9b3f2ee-cb5e-4b26-88aa-3f6680597b6f`, BODY_END `4607d735-df7f-4f29-88c3-90cfac258277`)
  and can be updated + published first to preview safely.

NEVER change domain/DNS without Anthony's explicit approval.

## Manual UI deploy (when the Wix REST tools are degraded)

The Wix MCP REST tools (ExecuteWixAPI/CallWixSiteAPI/ManageWixSite) periodically
present empty `{"type":"object"}` schemas → the harness stringifies the JSON body
and flags → server rejects. When that happens, upload + embed-edit + publish
through the dashboard UI instead (all on manage.wix.com for the site):
1. **Media Manager** (Settings search → nothing; use dashboard → Media, or
   `/dashboard/<siteId>/media-manager`) → **Upload Media** → pick `dist/ayvede-app-v2.txt`
   (a copy of `dist/app-embed.js`; `.txt` is the proven serve format). After it
   lands, open the file → copy its `usrfiles.com/ugd/....txt` URL.
2. **Settings → Custom Code** (`/dashboard/<siteId>/code-embed`) → edit the
   **Body - End** embed "Ayvede App — body (React root + scripts)" → replace the
   `<script src="...usrfiles.com/ugd/...">` URL with the new one → Apply.
3. **Publish** the site (top-right Publish, or the editor's Publish).
4. Verify: `curl -sL <site-url>` shows the new script URL; open in a browser.

Bundle history:
- v1 (2026-07-07, 97KB, 1 briefing, photo): `https://1c0b108a-cd0e-49f0-b492-4a18b882430a.usrfiles.com/ugd/ffe759_3f61ae887e5f422382353efc90fc0837.txt` — ROLLBACK TARGET.
- v2 (2026-07-10, 118KB, 5 briefings): `https://ffe7597e-b66e-40a7-aad2-50f680f4c11a.usrfiles.com/ugd/ffe759_ab74c803df4d4657ae379d1da6568d56.txt` — ROLLBACK TARGET.
- v4 (2026-07-14, 170KB, 6-tab nav with Solutions dropdown [Advisory/Programs/Platform/Innovation Lab], new Tools tab with the Spend Diagnostic, Home diagnostic teaser, Connect interest preset): `https://ffe7597e-b66e-40a7-aad2-50f680f4c11a.usrfiles.com/ugd/ffe759_f961df8dccfb43a7ba675d186a69b8a0.txt` — **CURRENTLY LIVE** on ayvede.com (deployed 2026-07-14 via Wix MCP ExecuteWixAPI: GET embed → PATCH html swapping only the 3rd script src, revision 3→4 → POST site-publisher publish; the MCP schemas were healthy this session, no dashboard UI needed). Console note: Wix loader logs "App not found for script, errorId: 404C" for every custom-embed script — pre-existing platform noise (identical on the staging copy with the old bundle), not an app error.
- v3 (2026-07-14, 137KB, 10 briefings, · category + blank-line table parser fixes): `https://ffe7597e-b66e-40a7-aad2-50f680f4c11a.usrfiles.com/ugd/ffe759_c053b43ada9a4cb79250f0b0ae52a089.txt` — ROLLBACK TARGET for v4 (Body-End embed repointed via dashboard UI 2026-07-14; Wix applies custom-code server-side immediately, no republish). Note: Wix/CDN edge caches the page HTML — use a `?cb=` query to see changes immediately. Tip for finding a UI-uploaded file's URL when the API is degraded: Media Manager fires a frog.wix.com telemetry request containing `fileId=ffe759_<hash>.txt` + `name=`; the public URL is `https://<accountId ffe7597e-…>.usrfiles.com/ugd/<fileId>` — verify with a sha256 match before using.
- v4 (2026-07-21): `https://ffe7597e-b66e-40a7-aad2-50f680f4c11a.usrfiles.com/ugd/ffe759_f961df8dccfb43a7ba675d186a69b8a0.txt` — ROLLBACK TARGET for v5.
- v5 (2026-07-21, 192KB, 16 briefings incl. 07-15/07-17/07-21 batches): `https://ffe7597e-b66e-40a7-aad2-50f680f4c11a.usrfiles.com/ugd/ffe759_0dfab2b190c44cc5aaff3eab005604e5.txt` — **CURRENTLY LIVE** on ayvede.com + www.
