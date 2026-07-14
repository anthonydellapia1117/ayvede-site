# DESIGN-TOKENS.md

These tokens are law. Match them exactly, never substitute, never approximate.
Any new element must be built from these tokens and the existing component classes in
`src/ayvede-v2.jsx` (`.card`, `.kick`, `.tag`, `.btn`, `.list`, `.lbl`, `.input`, and
friends) so it reads as native, not bolted on.

## Color

| Token | Value | Use |
|---|---|---|
| Background | `#0b1120` | Page background |
| Surface 1 | `#101828` | Cards |
| Surface 2 | `#161f30` | Inputs, tags, KPI strip, inset surfaces |
| Surface 3 | `#0d1424` | Alternating page bands, mobile menu, dropdown panels, footer |
| Border | `#1e2d44` | Every 1px rule and card border |
| Teal | `#2ec4a8` | Primary actions, active states, teal accents |
| Gold | `#c7a26b` | Kickers, numbers, gold accents, brand line |
| Red | `#ef4444` | Risk, liability, waste. Sparingly. |
| Text primary | `#e8ecf1` | Headings and emphasized text |
| Text secondary | `#7a8ba3` | Subheads, labels, muted copy |
| Text dim | `#4a5568` | Dimmest text, placeholder-grade |

Supporting body tone `#a8b4c6` appears in the existing `.body` class; use the classes,
not new hex values.

## Type

- **Outfit** for body text and labels.
- **JetBrains Mono** for numbers, data, kickers, nav links, and mono labels.
- Loaded via one Google Fonts link (weights: Outfit 300 to 800, JetBrains Mono 400 to 700).
- Fluid sizes via `clamp()` everywhere. No fixed pixel headings.
- No other font, ever.

## Shape and depth

- Border radii between 2 and 6 px. Nothing rounder.
- **NO drop shadows.** Depth comes from surface layering and 1px borders.
- Motion: subtle IntersectionObserver reveals (`.rv` to `.rv.in`, 0.55s ease,
  14px rise). Respect `prefers-reduced-motion`.

## Layout

- Mobile-first and responsive. `.wrap` is max-width 1180px with `clamp()` padding.
- Grids use `repeat(auto-fit, minmax(min(100%, Npx), 1fr))`.
- No horizontal overflow at any viewport. 375px is the floor that gets tested.
- Burger menu at 1024px and below.

## Fixed facts

- Copyright line: **2026**.
- Contact: **anthonydellapia@gmail.com**. The @ayvede.com address is dead and must
  never return. All forms are `mailto:` links prefilled to that gmail address.
- Phone: +1 (215) 384-8335. Location line: Philadelphia, PA.
- Brand line: "Advise. Vet. Deliver."
- Wordmark: AYVEDE with the V in teal, letter-spacing .22em.
