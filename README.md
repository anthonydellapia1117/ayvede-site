# ayvede-site

Source of truth for **ayvede.com**.

## What this site actually is

Read this before touching anything:

- ayvede.com is a **single-file React SPA** (`src/ayvede-v2.jsx`) compiled with **esbuild** into **one self-contained bundle**, embedded **full-bleed in a blank Wix page** via two Custom Embeds (a Head embed for fonts and container-hiding CSS, and a Body-End embed for the React root and three script tags).
- **Wix is the shell only.** The Wix visual editor CANNOT edit this site. There are no Wix pages, sections, or elements to edit. Every change to the real site happens by editing the JSX, recompiling, and re-embedding by the method in [DEPLOY.md](DEPLOY.md).
- The live bundle is hosted in the site's own Wix Media Manager as a `.txt` file (Media Manager rejects `.js`; usrfiles.com serves without nosniff, so a script tag executes it fine).

## Current live version

**v7** (deployed 2026-07-31). A nine-route SPA behind six top-level nav items: Home, Solutions (dropdown: Advisory, Programs, Platform, Innovation Lab), Tools, Insights, Vision, plus Connect as the nav button. Carries the 38-tool Spend Diagnostic, the Insights hub with 30 briefings, and background form submission. See [CHANGELOG.md](CHANGELOG.md) for every bundle URL and checksum.

**Open item at v7:** the three Formspree endpoints in `src/ayvede-v2.jsx` (lines 22-24) still carry `YOUR_*_ID` placeholders. Until real form IDs are pasted and the bundle rebuilt, form submissions resolve to the on-page error state with an email fallback and capture nothing.

## Quickstart

```
git clone <this repo>
cd ayvede-site
npm install
npm run build
```

Output lands in `dist/`:

- `dist/app-embed.js` is the deployable bundle (CSS self-injecting, for the Wix embed).
- `dist/index.html` is a self-contained local preview (React from CDN). Serve it with `python3 -m http.server` from `dist/` and open it in a browser.

A correct build of the current source produces a bundle whose sha256 matches the v7 entry in [CHANGELOG.md](CHANGELOG.md) exactly (`319303cc...`, 251,452 bytes). If it does not match, something drifted; stop and find out what before deploying anything. esbuild is pinned at 0.24.2 because a different version changes output bytes.

## Repository map

| Path | What it is |
|---|---|
| `src/ayvede-v2.jsx` | The entire site. One file. This is what you edit. |
| `build/build.mjs` | The build script (the proven method, asserted at every step). |
| `build/header.jsx` | Inline lucide icon components, spliced in at build time. Any new icon used in the JSX import block must also be defined here. |
| `build/insights-data.js` | Generated Insights data module (see `docs/INSIGHTS-PIPELINE.md`). Committed as-built for reproducibility. |
| `dist/ayvede-app-v7.txt` | The exact bytes live on ayvede.com right now. Recovery record. |
| `dist/ayvede-app-v2..v6.txt` | Every prior published bundle, for rollback. See the bundle policy in CHANGELOG.md. |
| `docs/Ayvede-Master-Design-Directive-v1.1.md` | The canonical design system and architecture directive. Read before touching any visual choice. |
| `docs/` | Also: the July 2026 audit, design tokens, insights pipeline, and the original Wix runbook. |
| `scripts/pull-insights.mjs` | Parser that regenerates `insights-data.js` from Drive-exported newsletter markdown. |
| `.claude/skills/` | Guardrail and refresh skills. Any Claude Code session opened in this repo auto-loads them. |

## Do Not

- Do **not** port this site to native Wix. Wix is a shell, nothing more.
- Do **not** switch hosts casually. A future migration is discussed in DEPLOY.md as prose; it is a deliberate project, not a Friday experiment.
- Do **not** invent a new deploy method. The only approved path is DEPLOY.md, and it has a mandatory owner-approval gate before anything goes live.
- Do **not** redesign. The owner likes the site. Restructure, never redesign. Design tokens in `docs/DESIGN-TOKENS.md` are law: no substitutions, no drop shadows, no new fonts.
- Do **not** commit secrets, API keys, or licensed third-party material to this repo.

## Contact

Site owner: Anthony DellaPia, anthonydellapia@gmail.com. The old @ayvede.com address is dead and must never reappear in the source.
