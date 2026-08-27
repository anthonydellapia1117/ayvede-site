# ayvede-site

## Project Overview
Ayvede's public website. NOT native Wix - compiled React SPA embedded in a blank Wix shell via two Custom Code embeds. Built with esbuild, bundle uploaded to Wix Media Manager.

## Tech Stack
- Framework: React SPA (single JSX file: ayvede-v2.jsx)
- Bundler: esbuild (scripts in /scripts/, output to /dist/ or /build/)
- Hosting: Wix blank shell - NO Wix editor changes
- No backend - all content compiled at build time

## Architecture - Critical Rules
- Site edited ONLY by modifying JSX source and recompiling. Never use Wix editor.
- Build flow: edit JSX -> esbuild -> upload bundle to Wix Media Manager -> swap BODY_END script src -> publish
- Insights hub built at compile-time from Google Docs metadata. Currently photoless.
- Card categories: Data Governance, ERP, Legal, Healthcare, Finance, General AI News
- Nine routes, six-item nav + Solutions submenu + Tools calculator
- All forms (Subscribe, Inquiry, calculator) use mailto - currently broken, Formspree is fix path

## Design System (AVD Master Design Directive v1.0)
- Colors: Deep Navy #0D1B2A, Emerald #2D6A4F / Teal accent, Gold #C19A6B / #C7A26B
- Gold for thin rules and small labels ONLY - never for big numbers
- Big numbers in KPI strip are white #FFFFFF
- Hero: stacked 2-line headline, two SOLID filled buttons (teal Get Started, graphite Explore Services)

## Coding Conventions
- Single JSX file architecture - keep components in main file unless clearly warranted
- No external API calls at runtime - all data compiled at build time
- Keep bundle minimal (~192KB). Avoid heavy dependencies.

## What NOT To Do
- Do NOT touch the Wix editor
- Do NOT add runtime API dependencies
- Do NOT use gold for large text or big numbers - white only
- Do NOT name Grant Thornton client engagements in any content
- Do NOT bloat bundle with stock photo libraries or heavy UI frameworks
