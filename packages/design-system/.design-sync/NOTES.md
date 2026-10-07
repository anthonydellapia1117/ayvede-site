# design-sync notes for executive-ui

- Package dir: `packages/design-system` (open this directory before running `/design-sync`). Config home is this directory; `.design-sync/` sits inside it.
- Build first: `npm ci --legacy-peer-deps && npm run build`. The `--legacy-peer-deps` flag is needed because npm 10.9 fails resolving jsdom's optional `canvas` peer (`Cannot read properties of null (reading 'edgesOut')`).
- Entry: `./dist/index.js` (ESM) with `./dist/index.d.ts`. Stylesheet: `dist/styles.css` (fonts, tokens, base, component layers concatenated). Fonts resolve as `./fonts/*.woff2` next to the stylesheet; the converter copies them from there.
- Tokens are not a sibling package: they ship inside `dist/styles.css` (first layer) and as `dist/tokens.css`. `src/tokens/tokens.json` is the editable source. Expect an empty `tokens/` directory in the bundle; `[TOKENS_MISSING]` should not fire because every `var(--eui-*)` is defined in the shipped stylesheet.
- Provider: every preview needs `ThemeProvider` (configured in `config.json` as `provider`). Without it, components render with no fonts, canvas, or token values.
- Previews: `.design-sync/previews/<Name>.tsx`, one per component, named exports. `Tab`, `TabList`, `TabPanel` previews compose the full `Tabs` parent because the parts throw outside it. `Switch` preview uses `useState` (controlled API).
- Hooks (`useTheme`, `useFieldContext`) and helpers (`cssVar`, `space`, `primitiveVar`, `iconNames`, `semantic`, `primitive`) are camelCase exports; the converter's PascalCase filter leaves them out of the component list, which is correct.
- Group names come from `src/components/<group>/`: foundations, controls, display, content.
- Render check: Playwright + Chromium. In the cloud session used to build this package, Chromium lives at `/opt/pw-browsers` and pins Playwright 1.56.1 (`npm i playwright@1.56.1` inside `.ds-sync/`).

## Known render warns

- None expected. The first dry run flagged `[FONT_MISSING]` for the plain "Inter" and "JetBrains Mono" fallback names (removed from the font stacks; only the shipped "Inter Variable" and "JetBrains Mono Variable" faces remain), `[GRID_OVERFLOW]` on Metric, ProcessDiagram, Timeline, NavBar (now `cardMode: column`, along with Table, ComparisonTable, PageHeader, Section which are wide by design), and `[RENDER_THIN]` on RadioGroup (preview authored). `[DTS_STYLE_SYSTEM] filtering @types/react props` is informational and expected.

## Re-sync risks

- `src/tokens/generated.ts` is generated; `npm test` fails if it drifts from `tokens.json`. Regenerate with `npm run build:tokens`.
- The preview under `preview/` is not part of the sync; only `.design-sync/previews/` is.
- No `projectId` is pinned yet: the first `/design-sync` run creates the project and records it in `config.json`.
