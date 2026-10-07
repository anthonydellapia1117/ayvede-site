# executive-ui

A brand-agnostic React design system for executive websites, advisory practices, reports, and decision-support interfaces. Tokens, typography, controls, and content patterns, with light and dark themes.

It carries no company identity. Brand comes in through the theme tokens, the `brand` slot on `NavBar`, and the copy you write.

## Install and use

This package lives inside this repository as `packages/design-system`. It is not published to a registry; consume it from a workspace or a file dependency.

```bash
cd packages/design-system
npm ci --legacy-peer-deps
npm run build          # dist/index.js, dist/index.d.ts, dist/styles.css, dist/tokens.css, dist/fonts/
```

Wrap your app once, link the stylesheet once:

```tsx
import "executive-ui/styles.css";
import { ThemeProvider, Container, PageHeader, Button } from "executive-ui";

export function App() {
  return (
    <ThemeProvider mode="light" fillViewport>
      <Container>
        <PageHeader
          eyebrow="Decision brief"
          title="Consolidate three workflow vendors into one platform"
          description="Which option to pursue, what it costs, and what changes for the teams involved."
          actions={<Button variant="primary">Approve option B</Button>}
        />
      </Container>
    </ThemeProvider>
  );
}
```

`ThemeProvider` renders the `.eui-root` element that applies the font stack, canvas color, and the `data-theme` attribute. Nothing is styled outside it.

## Scripts

| Command | What it does |
|---|---|
| `npm run build` | Tokens, TypeScript, stylesheet, fonts into `dist/` |
| `npm run typecheck` | Strict `tsc` over src, tests, preview, and sync previews |
| `npm test` | Token contrast (every text and UI pair, both themes) and component behavior |
| `npm run build:preview` | Self-contained `preview/dist/index.html` showing the system in context |
| `npm run screenshots` | Renders the preview at 320, 768, 1280, 1680 px in both themes, checks overflow, runs axe-core. Needs Playwright with Chromium. |
| `npm run check` | typecheck, build, test, build:preview |

## Layout of the package

| Path | Purpose |
|---|---|
| `src/tokens/tokens.json` | The only hand-edited token file. Primitives plus semantic roles per theme. |
| `src/tokens/generated.ts` | Generated typed exports (`primitive`, `semantic`, `semanticVars`). Do not edit. |
| `src/styles/*.css` | Base, foundations, controls, display, content layers. Concatenated into `dist/styles.css`. |
| `src/components/<group>/<Name>.tsx` | One component per file with JSDoc. Groups: foundations, controls, display, content. |
| `fonts/` | Inter Variable and JetBrains Mono Variable (latin), SIL Open Font License. |
| `preview/index.tsx` | The representative preview: a full decision-brief composition plus every component state. |
| `test/` | Vitest suites. `tokens.test.ts` is the contrast gate. |
| `docs/` | Theming, accessibility, decisions, component index. |
| `.design-sync/` | Config, conventions header, notes, and authored previews for the Claude Design sync. |

## Documentation

- [docs/THEMING.md](docs/THEMING.md): token architecture, theming, and overriding tokens.
- [docs/COMPONENTS.md](docs/COMPONENTS.md): every component and its main props.
- [docs/ACCESSIBILITY.md](docs/ACCESSIBILITY.md): what is checked automatically, what still needs a human.
- [docs/DECISIONS.md](docs/DECISIONS.md): the design decisions and why.

## Principles in one screen

1. One primary action per view. `Button variant="primary"` is the only filled accent control.
2. Status is never color alone. `StatusIndicator`, `Badge`, `Alert`, and `Timeline` pair text with a distinct glyph or label.
3. Numbers carry their meaning. `Metric` wants a label, a formatted value, context, and a source. `illustrative` marks sample data.
4. Visuals go through `DiagramFrame`: title, caption, source, and an accessible text description.
5. Prose lives in `Container size="reading"`, not in cards. Cards are for distinct objects and choices.
