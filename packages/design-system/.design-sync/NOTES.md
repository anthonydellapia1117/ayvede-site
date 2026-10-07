# design-sync notes for executive-ui

- Package dir: `packages/design-system` (open this directory before running `/design-sync`). Config home is this directory; `.design-sync/` sits inside it.
- Project: pinned in `config.json` as `projectId` `019dda8f-31a4-7a0e-ac9d-d36f7695f77e` (https://claude.ai/design/p/019dda8f-31a4-7a0e-ac9d-d36f7695f77e). The first sync reused a pre-existing empty "Design System" project rather than creating a second one.
- Build first: `npm ci && npm run build`. On node 24 / npm 12 this installs clean. Older npm 10.9 failed resolving jsdom's optional `canvas` peer (`Cannot read properties of null (reading 'edgesOut')`); add `--legacy-peer-deps` only if that error returns.
- Entry: `./dist/index.js` (ESM) with `./dist/index.d.ts`. Stylesheet: `dist/styles.css` (fonts, tokens, base, component layers concatenated). Fonts resolve as `./fonts/*.woff2` next to the stylesheet; the converter copies them from there.
- Tokens are not a sibling package: they ship inside `dist/styles.css` (first layer) and as `dist/tokens.css`. `src/tokens/tokens.json` is the editable source. Expect an empty `tokens/` directory in the bundle; `[TOKENS_MISSING]` should not fire because every `var(--eui-*)` is defined in the shipped stylesheet.
- Provider: every preview needs `ThemeProvider` (configured in `config.json` as `provider`). Without it, components render with no fonts, canvas, or token values.
- Previews: `.design-sync/previews/<Name>.tsx`, one per component, named exports, all sample data inline (no module-level consts) so the generated `.jsx` and `.prompt.md` examples are self-contained. `Tab`, `TabList`, `TabPanel` previews compose the full `Tabs` parent because the parts throw outside it. `Switch` preview uses `useState` (controlled API).
- Hooks (`useTheme`, `useFieldContext`) and helpers (`cssVar`, `space`, `primitiveVar`, `iconNames`, `semantic`, `primitive`) are camelCase exports; the converter's PascalCase filter leaves them out of the component list, which is correct.
- Group names come from `src/components/<group>/`: foundations, controls, display, content.
- Render check: Playwright drives system Chrome on the Mac via `DS_CHROMIUM_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"` (set it on `resync.mjs`, `package-validate.mjs`, `package-capture.mjs`). In a cloud session Chromium lives at `/opt/pw-browsers` and pins Playwright 1.56.1 (`npm i playwright@1.56.1` inside `.ds-sync/`).

## Lib fork: `.design-sync/overrides/dts.mjs`

- Declared in `config.json` as `libOverrides["dts.mjs"]`; `package-build` logs `[OVERRIDE] using .design-sync/overrides/dts.mjs` when it is picked up. The fork imports the bundled helpers through `.design-sync/node_modules -> ../.ds-sync/node_modules` (gitignored symlink; recreate it on a fresh clone with `ln -s ../.ds-sync/node_modules .design-sync/node_modules`).
- Why: the bundled `lib/dts.mjs` emitted props that reference in-package types (`TimelineStage`, `TableColumn`, `TableRow`, `ComparisonOption`, `ComparisonCriterion`, `ThemeMode`, `StageStatus`, ...) without declaring them, left bare React types (`CSSProperties`, `ReactNode`) unqualified, and typed `ref` as `RefObject<El>`. The design agent codes against these `.d.ts` files, so each gap was a real API error in generated designs.
- What it changes: every `<Name>.d.ts` gets a prelude after the Props interface declaring only the in-package types its body uses (fixed-point over references; `typeof` aliases are resolved to the literal union); `import("react").X` becomes `React.X`; `ref` becomes `React.Ref<El>`. `emit.mjs`, `bundle.mjs`, and `sync-hashes.mjs` are not forked.
- The fork is part of the grade key, so changing it re-verifies every component on the next sync. On each skill update, diff the fork against the new bundled `lib/dts.mjs` and port upstream fixes before re-syncing.

## Capture viewports (config `overrides.<Name>.viewport`)

- Default capture is 900x700. `dist/styles.css` collapses `Grid columns={3|4|6|12}` to 2 columns and NavBar to the hamburger below 1024px, and `Container size="content"` (72rem) equals `size="wide"` (90rem) once both clamp to the stage.
- Set: Grid, NavBar, Card at `1100x700`; Container at `1700x700`. NavBar, Metric, ProcessDiagram, Timeline, Table, ComparisonTable, PageHeader, Section stay `cardMode: column` because they are wide by design.
- Multi-up previews elsewhere use `Grid columns="auto" min="11rem"` (or `min="7.5rem"` for the Icon glyph sheet) so they stay on one row at 900px without a viewport override.

## Preview authoring facts

- `ThemeProvider` takes no `style` prop (only `className`, `mode`, `fillViewport`); its root is a block `div.eui-root` that paints the canvas. To frame a themed region, wrap it in a plain `div` with `border`, `borderRadius`, `overflow: hidden`, and `display: grid` so the root stretches to the cell.
- `Button loading` hides the label under a spinner by design. Disabled primary and secondary look identical; use ghost as the second disabled sample.
- `Metric change.sentiment="negative"` means "up is bad", so a falling cost renders green. Correct, not a bug.
- `Text numeric` only reads when figures of different widths are stacked with `align="end"`.
- `Table` caption is visible unless `captionHidden`; keep a realistic caption on the Empty state.
- `Divider label` needs real neighbors (two full-width buttons) to be visible. `ComparisonTable` values are free strings; keep `(illustrative)` in sample captions.
- `DiagramFrame` inline SVG can use `var(--eui-color-data-1)` for fills; `frame={false}` gives a frameless chart.
- `Table rows={[]}` with `emptyMessage`: the colSpan message cell leaves the auto layout with near-equal column widths, so end-aligned headers sit far from their neighbors compared with a populated table. Renders as designed.
- `StatusIndicator size="sm"` vs `md` is only a 13px vs 14px font step (`display.css`), so a Small-only cell looks almost identical to an md row. Not a render fault.
- `VisuallyHidden` content is invisible in a static capture by design. `Skeleton` and `Spinner` are animated; one frame is fine to grade.
- The cell frame is wider than authored `maxWidth` content (Stack, Tabs, TextInput), so underlines and card widths stop short of the frame edge. Preview frame, not a component bug.
- Scoped `package-capture.mjs --components X` refreshes only the gradeable review sheet `ds-bundle/_screenshots/review/<group>__<Name>.png` (labeled rows, one per cell); the flat `ds-bundle/_screenshots/<group>__<Name>.png` gallery card keeps its old timestamp until the next full capture. After a scoped recapture, grade from `review/`.
- `Metric` always renders `unit` with a leading space, so `unit="%"` shows "80 %". Put percent signs in `value` ("80%") and keep `unit` for word or scale units (M, days).
- Tone and specimen previews (Text Tones, Variants, Truncate; Switch Sizes) read as placeholder when the copy names the variant ("Primary text", "Body at 16px") or repeats one label; use distinct decision-brief sentences per row.
- In the flat 3-up card sheet each cell is about 345 px wide: `DefinitionList layout="grid"` (12rem auto-fit min) collapses to one column there, and a 4-step horizontal `ProcessDiagram` inside `DiagramFrame` breaks labels mid-word. Three steps fit.
- `Container` preview needs no `zoom: 0.5` at the 1700x700 viewport: reading, content and wide all fit unclamped, so labels sit inside each container box at full size.

## DS source fixes landed on 2026-10-07 (executive polish pass)

- The five bugs the first sync worked around are fixed in `src/`: radio `:indeterminate` scoped to checkboxes (`controls.css`), `RadioGroup defaultValue` wired as `defaultChecked` when uncontrolled (`Radio.tsx`), `align-content: start` on horizontal Timeline stages and DefinitionList grid items (`content.css`), and a `space-1` gap before the Link external icon. Previews may now use `defaultValue` on radio groups; the current ones still pass `value`, which is fine.
- Visual conventions changed in the same pass, so re-grade against these, not the old sheets: Heading display and size 1 are weight 500 (sizes 2 to 4 stay 600); focus rings keep each component's own radius (only unclassed anchors get radius-sm); table header cells are transparent with sticky headers painted by a separate rule, captions are primary at medium weight, footers are a strong top rule, and the empty-state cell carries `data-empty="true"`; Alert and KeyTakeaways no longer have a 3 px accent left rule; Metric's Illustrative badge is neutral outline; ComparisonTable option columns split 72% evenly with the criterion column at 28%; DiagramFrame renders the source under the caption in the figcaption; ProcessDiagram numbers are outlined circles and emphasis is a text-primary border; Timeline complete markers are a subtle fill with a strong border; Checkbox glyphs are a CSS mask on `::after` colored by `--eui-choice-glyph`; TextInput sets `data-start-kind="glyph"` for a one-character string start adornment; inputs with numeric inputmode use tabular numerals; Switch off track is an outlined surface.
- New preview cells: `Switch.Sizes` and `Text.Truncate`. Grade keys are the export names, so both need grade entries.

## Known render warns

- None expected. The first dry run flagged `[FONT_MISSING]` for the plain "Inter" and "JetBrains Mono" fallback names (removed from the font stacks; only the shipped "Inter Variable" and "JetBrains Mono Variable" faces remain), `[GRID_OVERFLOW]` on Metric, ProcessDiagram, Timeline, NavBar (now `cardMode: column`, along with Table, ComparisonTable, PageHeader, Section which are wide by design), and `[RENDER_THIN]` on RadioGroup (preview authored). `[DTS_STYLE_SYSTEM] filtering @types/react props` is informational and expected.

## Re-sync risks

- `src/tokens/generated.ts` is generated; `npm test` fails if it drifts from `tokens.json`. Regenerate with `npm run build:tokens`.
- The preview under `preview/` is not part of the sync; only `.design-sync/previews/` is.
- The dts fork and the `.design-sync/node_modules` symlink must both be present or the build silently falls back to the bundled `dts.mjs` and every `.d.ts` loses its prelude (check for the `[OVERRIDE]` line in the build log).
- Any edit to `overrides/dts.mjs`, a preview, or a preview-affecting config key re-verifies the affected components (all 45 for the fork).
