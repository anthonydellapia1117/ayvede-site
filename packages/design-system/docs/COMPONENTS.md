# Component index

Every export, grouped as in `src/components/`. Props listed are the ones that shape the component; all components also accept the usual HTML attributes, `className`, and `style`.

## Foundations

| Component | Purpose | Key props |
|---|---|---|
| `ThemeProvider` | Root of every tree; applies fonts, canvas, and `data-theme` | `mode` light, dark, system; `applyToDocument`; `fillViewport` |
| `useTheme()` | Read and switch the theme | returns `{ mode, theme, setMode }` |
| `Heading` | Semantic heading with independent visual size | `level` 1 to 6; `size` display, 1 to 4; `balance`; `tone` |
| `Text` | Body and small text | `variant` lead, body, compact, meta, eyebrow; `tone`; `weight`; `numeric`; `mono`; `truncate`; `measure`; `as` |
| `Container` | Centered max-width with gutters | `size` reading, content, wide, full; `gutter` |
| `Stack` | Vertical flow | `gap` 0 to 24; `align`; `divider`; `as` |
| `Inline` | Wrapping row | `gap`; `align`; `justify`; `wrap` |
| `Grid` | Responsive grid | `columns` auto, 1, 2, 3, 4, 6, 12; `min`; `gap` |
| `Divider` | Hairline, optionally labeled | `orientation`; `spacing`; `label` |
| `Section` | Full-width page band | `spacing` sm, md, lg; `tone` canvas, surface, subtle, inverse; `bordered` |
| `Icon` | Inline stroke icon | `name` (see `iconNames`); `size`; `tone`; `label` for meaningful icons |
| `VisuallyHidden` | Screen-reader-only text | `as` |

## Controls

| Component | Purpose | Key props |
|---|---|---|
| `Button` | Actions | `variant` primary, secondary, contrast, ghost, danger; `size`; `iconStart`; `iconEnd`; `loading`; `fullWidth`; `href` |
| `IconButton` | Icon-only action with a required name | `label`; `icon`; `variant`; `size` |
| `Link` | Navigation | `external`; `tone`; `underline`; `standalone` |
| `Field` | Label, description, error wiring for one control | `label`; `description`; `error`; `required`; `showOptional`; `disabled` |
| `TextInput` | Single-line input | `size`; `invalid`; `startAdornment`; `endAdornment`; `mono` |
| `Textarea` | Multi-line input | `rows`; `invalid`; `resize` |
| `Select` | Native select | `options`; `placeholder`; `size`; `invalid` |
| `Checkbox` | Labeled checkbox | `label`; `description`; `indeterminate`; `invalid` |
| `RadioGroup`, `Radio` | Labeled exclusive options | group: `label`, `value`, `defaultValue`, `onChange`, `orientation`, `error`; radio: `value`, `label`, `description` |
| `Switch` | Immediate on/off | `checked`; `onCheckedChange`; `label`; `description`; `size` |

## Display and navigation

| Component | Purpose | Key props |
|---|---|---|
| `Card` | Bounded surface for one object or choice | `title`; `description`; `action`; `footer`; `padding`; `tone`; `interactive`; `href`; `as` |
| `Badge` | Short categorical label | `tone`; `variant` subtle, outline, solid; `size`; `icon` |
| `StatusIndicator` | Glyph plus text for a state | `status` success, warning, danger, info, neutral, pending; `label`; `size` |
| `Alert` | Inline message | `tone`; `title`; `actions`; `onDismiss` |
| `Tabs`, `TabList`, `Tab`, `TabPanel` | Accessible tabs | `value` or `defaultValue`; `onValueChange`; TabList `label`; TabPanel `keepMounted` |
| `Breadcrumbs` | Location trail | `items` `{ label, href? }[]`; `label` |
| `NavBar` | Top navigation that collapses below 1024 px | `brand`; `brandHref`; `links`; `actions`; `sticky`; `width` |
| `PageHeader` | Page title block with the h1 | `eyebrow`; `title`; `description`; `actions`; `breadcrumbs`; `meta`; `size` |
| `Table` | Data table on native semantics | `caption`; `columns` `{ key, header, align, width, isRowHeader, highlight }`; `rows`; `footer`; `density`; `stickyHeader`; `frame`; `emptyMessage` |

## Executive content patterns

| Component | Purpose | Key props |
|---|---|---|
| `SectionHeading` | Opens a section | `eyebrow`; `title`; `description`; `level`; `size`; `align`; `action`; `headingId` |
| `KeyTakeaways` | Numbered summary with a bottom line | `items`; `bottomLine`; `title`; `tone` |
| `ComparisonTable` | Options across, criteria down, one recommended | `caption`; `options` `{ label, recommended? }`; `criteria` `{ label, values }`; `criteriaHeader`; `density` |
| `DefinitionList` | Term and description pairs | `items`; `layout` stacked, inline, grid |
| `Timeline` | Staged roadmap or history | `stages` `{ title, description, meta, status }`; `orientation`; `showStatus` |
| `Metric` | A number with its meaning | `label`; `value`; `unit`; `change` `{ value, direction, sentiment, label }`; `context`; `source`; `illustrative`; `size` |
| `DiagramFrame` | Figure with title, caption, source, text description | `title`; `caption`; `description` (required); `source`; `figureLabel`; `frame` |
| `ProcessDiagram` | Numbered steps with arrows | `steps` `{ label, description, emphasis }`; `direction` |
| `StatePanel` | Empty, loading, error, success for a region | `kind`; `title`; `description`; `actions`; `icon`; `frame` |
| `Spinner` | Indeterminate progress | `size`; `label` (pass "" when a parent announces) |
| `Skeleton` | Loading placeholder shape | `width`; `height`; `lines` |

## Tokens

`primitive`, `semantic`, `semanticVars`, `primitiveVars`, `themes`, `themeAttribute`, `tokenPrefix`, `cssVar()`, `primitiveVar()`, `space()`. See [THEMING.md](THEMING.md).
