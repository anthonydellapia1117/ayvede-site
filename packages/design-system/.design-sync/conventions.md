# executive-ui conventions for the design agent

**Always wrap the tree in `ThemeProvider`.** It renders `.eui-root`, which carries the font stack, canvas color, and every token. Outside it, components render unstyled. Pass `mode="dark"` for a dark design; nest a second `ThemeProvider` to flip one region.

```tsx
import { ThemeProvider, NavBar, Container, PageHeader, Button, Stack } from "executive-ui";

<ThemeProvider mode="light" fillViewport>
  <NavBar brand="Program office" links={[{ label: "Overview", href: "#", current: true }]} actions={<Button size="sm" variant="primary">Approve</Button>} />
  <Container>
    <PageHeader eyebrow="Decision brief" title="Consolidate three workflow vendors" description="Which option, what it costs, what changes." actions={<Button variant="primary">Approve option B</Button>} />
    <Stack gap={12}>...</Stack>
  </Container>
</ThemeProvider>
```

## Styling idiom: props, not classes

There is no utility-class vocabulary. Style through component props (`variant`, `size`, `tone`, `gap`, `columns`, `padding`, `align`, `justify`). Layout glue comes from `Container`, `Section`, `Stack`, `Inline`, `Grid`. For anything those do not cover, use inline `style` with token variables:

| Need | Use |
|---|---|
| Color | `var(--eui-color-text-secondary)`, `var(--eui-color-background-subtle)`, `var(--eui-color-border-default)`, `var(--eui-color-action-primary)`, `var(--eui-color-status-warning)` |
| Spacing | `var(--eui-space-4)` (steps 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24; 1 step = 4 px) |
| Radius | `var(--eui-radius-sm)`, `--eui-radius-md`, `--eui-radius-lg` |
| Type | `var(--eui-font-size-compact)`, `--eui-font-size-meta`, `--eui-font-family-mono` |
| Max widths | `var(--eui-container-reading)` (42rem), `--eui-container-content` (72rem) |

Do not write `className="eui-..."` by hand and do not invent class names: the components own their classes. Do not set hex colors; every color is a token.

## Composition rules

- One `Button variant="primary"` per view. Everything else is `secondary` (outlined), `ghost`, or `contrast` (solid ink). `danger` only for destructive confirms.
- Form controls go inside `Field` (`label`, `description`, `error`). `Field` wires ids and aria for `TextInput`, `Textarea`, `Select`. `Checkbox`, `Radio`, `Switch` carry their own `label`.
- Status always pairs a glyph with text: `StatusIndicator status="warning" label="At risk"`. `Badge` for categories, `Alert` for messages tied to content.
- Decision pages open with `PageHeader`, then `KeyTakeaways` (3 to 5 items plus `bottomLine`), then `Metric`s in a `Grid`, then `ComparisonTable` with one `recommended` option, then `Timeline` or `ProcessDiagram` inside `DiagramFrame` (its `description` prop is required and is the text equivalent).
- Numbers are pre-formatted strings. `Metric` never computes; set `illustrative` on sample data.
- Prose lives in `Container size="reading"` with `Text` and `Heading`, not inside `Card`. `Card` is for one distinct object or choice.
- `Section tone="inverse"` is the closing band for a call to action; use `Heading tone="inverse"` inside it.
- Icons: `Icon name="arrowRight"` (names: check, checkCircle, x, xCircle, info, warning, chevronDown, chevronRight, chevronLeft, arrowRight, arrowUpRight, arrowUp, arrowDown, minus, plus, search, menu, external, circle, clock, document, inbox). Decorative by default; pass `label` only when the icon stands alone.

## Where the truth lives

Read `styles.css` for the token names (the `:root` block at the top lists every primitive and semantic variable) and each component's `.d.ts` for its props. The per-component `.prompt.md` files show verified compositions.
