# Accessibility

Target: WCAG 2.2 AA. This page separates what the repository checks automatically from what a human still has to review.

## Checked automatically

| Check | Where | What it proves |
|---|---|---|
| Text contrast 4.5:1 and UI contrast 3:1 for every pair the system relies on, both themes | `test/tokens.test.ts` | Tokens cannot regress below AA without a failing test. 60 pairs per theme. |
| Label and description wiring for `Field`, `Checkbox`, `Radio`, `Switch` | `test/components.test.tsx` | Controls have accessible names, descriptions, and error associations. |
| `Tabs` roving focus, arrow keys, Home, End, `aria-selected`, panel labeling | `test/components.test.tsx` | Keyboard operation of the one custom composite widget. |
| Alert and state roles (`alert` for danger and warning, `status` otherwise, `aria-busy` while loading) | `test/components.test.tsx` | Announcements happen with the right urgency. |
| Breadcrumb `aria-current`, `NavBar` disclosure `aria-expanded` and `aria-controls`, `DiagramFrame` `aria-labelledby` and `aria-describedby` | `test/components.test.tsx` | Landmarks and figures are named. |
| axe-core (WCAG 2.x A and AA, 2.2 AA, best practices) on the full preview in both themes | `npm run screenshots` | No violations on the rendered composition. |
| No horizontal overflow at 320, 768, 1280, 1680 px | `npm run screenshots` | Reflow at 320 px holds for every component shown in the preview. |

## Built in, not separately tested

- One focus treatment everywhere: 2 px ring in `color.focus.ring` with 2 px offset on `:focus-visible`. Inputs also change border color on focus.
- Status is never color alone: `StatusIndicator` uses a different glyph per status, `Timeline` adds text labels, `Metric` change arrows carry hidden "increased / decreased" text.
- `prefers-reduced-motion` collapses transitions and the skeleton shimmer; the spinner steps instead of spinning.
- Touch targets: `md` buttons grow to 44 px on coarse pointers; checkboxes and radios sit in rows with 24 px minimum height and clickable labels.
- `Table` uses native semantics (`caption`, `scope`), scrolls horizontally instead of truncating, and right-aligns numeric columns with tabular figures.
- `Select`, `Checkbox`, `Radio` are native elements styled with `appearance: none`, so platform assistive technology behavior is intact.

## Still needs a human

- Screen reader walkthroughs with VoiceOver, NVDA, and TalkBack. jsdom and axe do not hear what a reader says.
- Zoom to 200% and 400% in a real browser. The clamp() scale and 320 px reflow are designed for it but not machine-checked at zoom.
- Focus order on pages you compose. The components are ordered correctly on their own; your layout decides the page.
- Color-vision simulation of chart series (`color.data.*`). Series 1 to 4 pass 3:1 against both canvases; use labels or patterns for more than four series.
- Content: heading hierarchy, link text, alt text, and the text description you write into `DiagramFrame`.

## Known limits

- `NavBar` collapses to a disclosure list, not a dialog; it does not trap focus. That is correct for a short link list and wrong for a long mega-menu.
- No modal dialog, menu, tooltip, or combobox is included. Compose those from an established accessible primitive library if you need them; do not hand-roll them.
