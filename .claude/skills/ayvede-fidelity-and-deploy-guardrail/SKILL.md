---
name: ayvede-fidelity-and-deploy-guardrail
description: >
  Use this skill any time you scan, edit, restructure, extend, or deploy the ayvede.com
  website or its source file ayvede-v2.jsx. It is the guardrail that keeps a restructure
  from turning into a redesign. It locks the exact design tokens, guarantees no content is
  lost, enforces the proven compile-and-embed deployment method, and requires a local
  preview and explicit owner approval before anything goes live. Load it before touching
  the site, and keep it loaded through build and deploy. If a change would violate this
  skill, stop and surface the tradeoff instead of guessing.
---

# Ayvede Fidelity and Deploy Guardrail

## What the site actually is

ayvede.com is not a native Wix site. It is a single-file React SPA (`ayvede-v2.jsx`) compiled
with esbuild into one self-contained bundle and embedded full-bleed inside a blank Wix page.
Wix is only the shell. The Wix visual editor cannot edit the real site. Every change happens
by editing the JSX, recompiling to the single bundle, and re-embedding by the same method.
Do not invent a new stack, do not port it to native Wix, do not switch hosting.

Source file: `~/Downloads/ayvede-v2.jsx` (confirm the path before editing).

## The core principle: restructure, do not redesign

The owner loves the current look and the clean navigation. The job is to reorganize and extend,
not to restyle what already works. Creativity belongs in new structure and new tools, never in
repainting the existing pages. When in doubt, change less.

## Non-negotiable design tokens (match exactly, never substitute)

- Background `#0b1120`. Surfaces `#101828`, `#161f30`, `#0d1424`. Border `#1e2d44`.
- Teal `#2ec4a8`. Gold `#c7a26b`. Red `#ef4444`.
- Text `#e8ecf1`, `#7a8ba3`, `#4a5568`.
- Fonts: Outfit for body and labels, JetBrains Mono for numbers and mono labels.
- Radii 2 to 6px. NO drop shadows, depth comes from layering. Fluid `clamp()` type.
  Subtle IntersectionObserver reveals. Mobile-first and responsive.
- Copyright 2026. Contact email `anthonydellapia@gmail.com` (never the old @ayvede.com).

Any new element, including new tabs and the cost calculator, must be built from these tokens
and the existing component and styling language so it reads as native, not bolted on.

## Content preservation (nothing is lost)

The site has eight content areas: Home, Vision, Solutions, Programs, Platform, Innovation Lab,
Insights, Connect. A restructure may move where a page lives in the navigation, but every piece
of existing copy, every section, and the full Insights newsletter hub (cards, category filter,
keyword search, in-app reader) must survive intact. Moving a page under a submenu is allowed.
Deleting or rewriting its content is not, unless the owner explicitly asks.

## The build-and-embed method (the only approved path)

1. Transpile the JSX to plain JS with esbuild. Not in-browser Babel. React 18 and ReactDOM
   from a CDN. Inline all CSS into `<head>` byte for byte. Keep the inline SVG icon set. Load
   fonts via a Google Fonts link.
2. Produce one self-contained bundle, the same small hosted-script artifact the live site uses.
   Keep it lean. Do not inline heavy assets that bloat it past the proven embed size.
3. Test locally and confirm every section renders, navigation works, reveals fire, forms open a
   prefilled email to the gmail address, and the Insights hub and any new tool work.

## Publish-safety gate (mandatory, every deploy)

Full autonomy is granted for research, audit, restructure, building new tools, and rebuilding
the bundle. The one hard stop is going live. The sequence is fixed:

1. Build everything and rebuild the bundle.
2. Serve a LOCAL preview and show the owner the updated site plus the plan and reasoning.
3. WAIT for explicit approval. The owner approves to publish, or declines and iterates.
4. Only after approval: deploy by the embed method. The Wix Media Manager upload of the new
   bundle uses a native file dialog that no agent can operate, so hand the owner exact upload
   steps, take the returned URL, swap only the Body-End script `src`, leave the Head embed and
   the React script tags untouched, publish, and verify ayvede.com live.
5. Before publishing, capture the current live bundle URL as a one-paste rollback.

Never publish, change the domain, change DNS, or delete a Wix page without explicit approval.
If any step would break the live site or the only path is an unproven method, stop and present
the options.
