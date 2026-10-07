# Design decisions

Short, in the order they matter.

## 1. One family, one accent, two themes

- **Inter Variable** for everything, **JetBrains Mono Variable** for identifiers and aligned figures only. Both are SIL OFL, self-hosted, latin subset (88 KB total). No second display family: hierarchy comes from scale, weight (500 and 600, never 700 for headings), and tracking that tightens as size grows.
- **One accent** (`blue.600` light, `blue.500` dark) and it is spent on the primary action, selection, links, and the focus ring. Nothing decorative uses it.
- **Dark is tuned, not inverted.** Ink canvas `#0f1218`, lifted surfaces, link and status colors moved up the scale, and a primary hover that darkens because lighter blues fail 4.5:1 with white labels. Inverse bands get their own secondary and tertiary text roles so they stay readable in both themes.

## 2. Contrast is a test, not a review step

`test/tokens.test.ts` enumerates every foreground and background pair the components depend on and fails under 4.5:1 (text) or 3:1 (UI). It caught three issues during the build (dark primary hover, dark inverse secondary text, and a tertiary text value that was 4.2:1). Every token change runs it.

## 3. Depth by layering, not shadows

Cards and panels are a 1 px border on a surface one step lighter than the canvas. The only shadow token is `shadow.overlay`, reserved for menus and dialogs this package does not yet ship. Radii stay between 4 and 10 px.

## 4. Variants are data attributes

`.eui-button[data-variant="primary"]`, `[data-size="sm"]`, `[data-tone="warning"]`. One class per component, variants readable in the DOM, no class-name combinatorics. Layout knobs are CSS variables set inline by the component (`--eui-stack-gap`), so the design agent and engineers never need to invent class names.

## 5. Native first

`Select`, `Checkbox`, `Radio`, `Textarea`, and `Table` are native elements with `appearance: none`. `Tabs` is the only custom composite widget and it implements the full WAI pattern. Modal dialogs, menus, tooltips, and comboboxes are deliberately absent: the right move is an established primitive library, not a fourth hand-rolled one.

## 6. Executive content patterns are first-class

`KeyTakeaways`, `Metric`, `ComparisonTable`, `Timeline`, `ProcessDiagram`, `DefinitionList`, and `DiagramFrame` encode how a decision brief is read: bottom line first, numbers with sources, one recommended option made visible, a figure that always has a text equivalent. `Metric` has an `illustrative` flag because sample data in a preview must say so.

## 7. Scoped, not global

Everything lives under `.eui-root`, which `ThemeProvider` renders. The system can sit inside a host page without touching it, and two providers can coexist for a dark band inside a light page.

## 8. The preview is a page, not a swatch book

`preview/index.tsx` is a complete decision brief (header, takeaways, metrics, comparison, figure, roadmap, cards, closing band) followed by every control and state. Screenshots at four widths in both themes plus axe-core are the review loop.

## Intentional departures from the site this repository hosts

This package is new and independent. It deliberately does not reuse the ayvede.com palette, fonts, or component classes; the site's tokens are locked by its own guardrail and this system must stay brand-agnostic. Nothing under `src/ayvede-v2.jsx`, `build/`, or `dist/` at the repository root is touched.
