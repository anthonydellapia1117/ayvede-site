# Theming

## Token architecture

Three layers, one source file (`src/tokens/tokens.json`):

1. **Primitives**: raw values. Color scales (`neutral`, `ink`, `blue`, `green`, `amber`, `red`), font families, sizes, weights, line heights, tracking, spacing, container widths, radii, control sizes, motion, z-index, focus ring.
2. **Semantic roles**: what a value is for, defined per theme and pointing at primitives with `{path}` references. Examples: `color.background.canvas`, `color.text.secondary`, `color.action.primary`, `color.border.strong`, `color.status.warning`, `shadow.overlay`.
3. **Component tokens**: only where a component needs an adjustable knob. They are CSS custom properties set in the component's stylesheet (`--eui-stack-gap`, `--eui-card-pad`, `--eui-icon-size`), not in tokens.json.

`npm run build:tokens` emits:

- `dist/tokens.css`: every primitive as `--eui-<group>-<name>` on `:root`; every semantic role as `--eui-color-text-primary` and so on, under `:root, [data-theme="light"]` and `[data-theme="dark"]`.
- `src/tokens/generated.ts`: typed `primitive`, `semantic` (resolved per theme), `semanticVars`, `primitiveVars`.

The naming is mechanical: path `color.text.primary` becomes `--eui-color-text-primary`; camelCase segments become kebab-case (`primaryHover` becomes `primary-hover`).

## Themes

`light` is the default and applies on `:root`. `dark` applies wherever `data-theme="dark"` is set. The dark theme is tuned on its own: an ink canvas (`#0f1218`), lifted surfaces, lighter link and status colors, a darker primary hover (lighter blues fail the 4.5:1 label contrast with white text).

```tsx
<ThemeProvider mode="dark">...</ThemeProvider>       // explicit
<ThemeProvider mode="system">...</ThemeProvider>     // follows prefers-color-scheme, live
<ThemeProvider applyToDocument>...</ThemeProvider>   // also sets data-theme on <html> for portals
```

`useTheme()` returns `{ mode, theme, setMode }`. Nest a second `ThemeProvider` to flip one region. `Section tone="inverse"`, `Card tone="inverse"`, and `KeyTakeaways tone="inverse"` flip a block without a second provider; they remap `--eui-color-text-*` and `--eui-color-border-default` locally.

## Branding a deployment

Override semantic roles after the stylesheet, scoped to the root or to a theme:

```css
.eui-root {
  --eui-color-action-primary: #1f5f3a;
  --eui-color-action-primary-hover: #184b2e;
  --eui-color-action-primary-active: #123a24;
  --eui-color-focus-ring: #1f5f3a;
  --eui-color-text-link: #184b2e;
}
.eui-root[data-theme="dark"] {
  --eui-color-action-primary: #2f8f58;
}
```

Keep the contrast gate: `test/tokens.test.ts` checks every pair the system relies on. Run it against your overrides by editing `tokens.json` instead of overriding in CSS when you can.

Fonts: swap the `@font-face` rules in `src/styles/fonts.css` and the `font.family.sans` / `font.family.mono` primitives. The system expects a variable weight axis from 400 to 700.

## Using tokens in code

```ts
import { cssVar, space, primitiveVar, semantic } from "executive-ui";

cssVar("color.text.secondary");   // "var(--eui-color-text-secondary)"
space(4);                          // "var(--eui-space-4)"
primitiveVar("radius.lg");         // "var(--eui-radius-lg)"
semantic.light.color.action.primary; // "#2a52b4"
```

Prefer the components' own props over inline styles. Reach for `cssVar` only for layout glue the components do not cover.

## Scale reference

| Role | Value |
|---|---|
| Display | `clamp(2.25rem, 1.75rem + 2vw, 3.5rem)` (36 to 56 px) |
| Heading 1 | `clamp(1.875rem, 1.55rem + 1.3vw, 2.5rem)` (30 to 40 px) |
| Heading 2 | `clamp(1.5rem, 1.35rem + 0.6vw, 1.875rem)` (24 to 30 px) |
| Heading 3 | 20 to 22 px |
| Lead | 18 to 20 px, line height 1.55 |
| Body | 16 px, line height 1.6, measure 68ch |
| Compact | 14 px |
| Meta, eyebrow | 13 px |
| Spacing | 4 px steps: 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24 |
| Containers | reading 42rem, content 72rem, wide 90rem, gutter `clamp(1rem, 4vw, 2.5rem)` |
| Radii | sm 4 px, md 6 px, lg 10 px, full |
| Controls | sm 32 px, md 40 px (44 px on coarse pointers), lg 48 px |
| Motion | 120 / 180 / 280 ms, standard ease `cubic-bezier(0.2, 0, 0, 1)`; all motion collapses under `prefers-reduced-motion` |
| Z-index | base 0, raised 1, sticky 100, dropdown 200, overlay 300, modal 400, toast 500 |
