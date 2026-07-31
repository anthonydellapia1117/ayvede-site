# Ayvede Master Design Directive v1.1 (AVD)

Canonical source of truth for every Ayvede artifact.

---

## 1. How to Use This Document

### 1.1 Primary consumer

The primary consumer of this document is **Claude Code**, which edits the website source directly. Claude Code should open this file and know every token, rule, and component spec before touching a line of JSX. The secondary consumers are any designer, developer, or AI tool producing an Ayvede document, image, or deck.

### 1.2 Authority and precedence

This document defines design intent. The shipped `ayvede-v2.jsx` defines what actually renders. Where the two differ:

| Situation | What wins | Required action |
|---|---|---|
| Directive and JSX agree | Both | Proceed |
| Directive and JSX differ on a token | JSX ships as-is | Reconcile, then update this document to match reality |
| Directive specifies something not yet built | Directive is the target | Build it, or log it as pending |
| A change would break fidelity | This document | Stop and surface the tradeoff |

Never silently resolve a conflict. Report it.

### 1.3 How to read the tables

Every color is given as an exact hex. Every type role is given with size, weight, line height, and letter spacing for both screen and print. Every component is given with its fill, border, radius, and spacing. If a value is marked **PROPOSAL**, it has not been confirmed by the owner and should be flagged before it ships.

### 1.4 Change log

| Version | Date | Author | Summary |
|---|---|---|---|
| 1.0 | 2026-07-30 | Anthony V. DellaPia | First canonical release. Consolidates the shipped design system, the technical architecture truth, the Insights hub contract, and the cross-medium rules. |
| 1.1 | 2026-07-30 | Claude Code, per the Appendix B reconciliation | Corrected against the shipped JSX: real source path, restructure recorded as live (not pending), KPI figures gold, nine-route SPA with a per-page map replacing the single-page section 11, true bundle history through v5, four recorded working colors added to section 8, wordmark color divergence flagged, forms updated to background submission (Formspree), load-more and placeholder styling marked not built, Appendices A and B updated. |

---

## 2. The Design Method

Answer these before making any visual choice. If a choice cannot be defended against all six, it is decoration and should be cut.

| # | Question | Test |
|---|---|---|
| 1 | Who is reading this, and in what state of mind? | Design for the managing partner scanning between meetings, not the analyst with an hour |
| 2 | What is the one thing they must take away? | If the artifact has more than one primary message, split it |
| 3 | Does this element earn its space? | Remove it. If nothing is lost, it stays removed |
| 4 | Does it use an existing token or invent a new one? | Inventing a new token requires a written reason and an update to this document |
| 5 | Does it read as quietly expensive, or as loud? | Loud fails. Restraint is the brand |
| 6 | Does it pass contrast and legibility? | WCAG 2.1 AA minimum, no exceptions for body text |

**The governing instinct: subtract before adding.** Depth comes from layering and restraint, never from ornament.

---

## 3. Brand DNA

| Attribute | Value |
|---|---|
| Firm | Ayvede |
| Category | AI governance consulting |
| Founder and operator | Anthony Vincent DellaPia, Philadelphia, PA |
| Positioning line (primary, homepage hero) | The AI Source of Truth for High-Trust Firms |
| Brand tagline | Advise. Vet. Deliver. |
| Supporting campaign line (ads and social only) | AI Adoption Without Risk |
| Newsletter brand | AI, Properly |
| Insights hub brand | The Ayvede Briefing |
| Contact email | anthonydellapia@gmail.com |
| Copyright line | 2026 |

### 3.1 Thesis

Ayvede is an accountable partner for adopting AI with governance, security, and measurable return. The market is adopting faster than it can control. Ayvede closes that gap before it becomes liability.

### 3.2 Audience

Conservative, high-trust professionals who print, sign, and forward. Design for the decision maker, not the practitioner.

| Segment | What they fear | What earns their trust |
|---|---|---|
| Boutique law firms | Malpractice, confidentiality breach, sanctionable error | Precision, citations, defensibility |
| Advisory and accounting practices | Audit exposure, unreviewed output | Process, controls, documentation |
| Wealth management | Regulatory action, client data exposure | Discretion, restraint, track record |
| Municipal and public entities | Public scrutiny, procurement risk | Transparency, clear scope, plain language |
| High-trust professional services | Reputation damage | Quiet competence, no hype |

### 3.3 Register

Authoritative, trustworthy, precise, quietly expensive. Closer to a private banker's foyer than a sportsbook. Never playful, never loud, never a hacker terminal.

**The line that governs every render:** if it looks like a crypto dashboard or a startup landing page, it is wrong.

---

## 4. Technical Architecture (Ground Truth)

### 4.1 What the site actually is

ayvede.com is **not** a native Wix site. It is a compiled React single-page application.

| Layer | Reality |
|---|---|
| Source | `~/Desktop/2 | Ayvede/ayvede-v2.jsx`, a single-file React component. The path contains a space and a pipe character; always quote it. A stale v1-era file was archived 2026-07-30 as `ARCHIVED-2026-07-30-ayvede-website.jsx`; never edit it |
| Shape | A nine-route single-page application (Home, Advisory, Programs, Platform, Innovation Lab, Tools, Insights, Vision, Connect), state-routed, not one scrolling page |
| Build | esbuild transpile to plain JS. Not in-browser Babel |
| Runtime | React 18 and ReactDOM loaded from a CDN (unpkg) |
| Styling | All CSS inlined into the document head, byte for byte from source |
| Icons | Inline SVG only. No icon library at runtime |
| Fonts | Google Fonts link tag |
| Artifact | One self-contained bundle, hosted in Wix Media Manager. Live as of 2026-07-30: v5, 192,443 bytes, sha256 3730d157..., served from `ffe7597e-b66e-40a7-aad2-50f680f4c11a.usrfiles.com/ugd/ffe759_0dfab2b190c44cc5aaff3eab005604e5.txt`. A v6 (background forms, contrast sweep, footer cleanup) is built and awaiting the owner's publish approval |
| Shell | A blank Wix page. Wix is hosting only |
| Injection | Two Custom Code embeds under Wix Settings, Custom Code |

The two embeds:

| Embed | Contents |
|---|---|
| HEAD | Google Fonts link plus takeover CSS that hides the default Wix page container |
| BODY_END | The app root div, the two React CDN script tags, and the app bundle script tag |

Because the bundle is injected through Custom Code, the app renders in the **top-level document**, not inside a sandboxed iframe. This matters for anything involving navigation, popups, or clipboard access.

### 4.2 The rules that follow

1. **The Wix visual editor cannot and must not be used to edit the real site.** There is no native Wix CMS, no Wix page builder, and no Wix blog in this system.
2. **All website changes happen in the JSX.** Edit the source, recompile with esbuild, re-upload the bundle, swap the bundle script src in the BODY_END embed, publish.
3. **The JSX is the source of truth** for the exact current section list, navigation, and component structure.
4. **No automated agent touches the website.** The weekly content engine writes Google Docs into a Drive folder and stops there. Claude Code is the only thing that builds those into the site.
5. **Never invent a new deployment approach.** No porting to native Wix, no switching hosts, no runtime content fetching.

### 4.3 The deploy sequence (the only approved path)

| Step | Owner | Action |
|---|---|---|
| 1 | Claude Code | Edit JSX, recompile to the single bundle, test locally |
| 2 | Claude Code | Capture the current live BODY_END bundle script src as the rollback URL, and hand it to the owner |
| 3 | Claude Code | Serve a local preview and STOP |
| 4 | Owner | Review the local preview and explicitly approve or decline |
| 5 | Owner | Upload the new bundle to Wix Media Manager on the live site named Ayvede, not Ayvede Copy, and return the file URL |
| 6 | Claude Code | Swap ONLY the bundle script src in the BODY_END embed. Leave the two React script tags and the entire HEAD embed untouched |
| 7 | Claude Code | Publish, then hard-fetch ayvede.com and verify |

The Media Manager upload uses a native file dialog. No agent can drive it. That step is always the owner's, and it doubles as the approval gate. Never publish, change the domain, change DNS, or delete a Wix page without explicit approval.

**Rollback is one paste:** restore the previous bundle URL into the same BODY_END script src.

---

## 5. Where This Fits: The Four-Part System

| Part | Tool | Job | Governed by this directive |
|---|---|---|---|
| 1 | Cowork "Batch Content" | Personal LinkedIn batches, personal story voice | No. Explicitly excluded |
| 2 | Claude Chat | Prompt strategist. Turns input and history into prompts for the other tools | Yes |
| 3 | Cowork "Newsletter" | Generates informational AI articles, saves each as its own Google Doc in Drive "AI, Properly > Newsletters". No website work | Yes |
| 4 | Claude Code | Reads those Docs, builds them into the JSX Insights section, recompiles, publishes | Yes |

### 5.1 Brand usage split (locked, do not violate in either direction)

| Surface | Ayvede branding | Reason |
|---|---|---|
| ayvede.com | Required | Owned audience |
| The Ayvede Briefing newsletter | Required | Owned audience |
| Ayvede documents, decks, email | Required | Owned surface |
| Personal LinkedIn (articles, posts, comments, first comment) | **Banned** | Grant Thornton colleagues are connections there |

The LinkedIn ban covers the brand name in the body, the tagline, links to the site, and any Ayvede visual asset. No exceptions. Nobody restores branding to a LinkedIn asset, and nobody strips it from a site asset.

---

## 6. Brand Voice and Copy Rules

### 6.1 Voice by surface

| Surface | Voice |
|---|---|
| Website and brand surfaces | Short lines. Direct. Concise. Quietly expensive. Tabular numerals wherever numbers appear |
| The Ayvede Briefing (newsletter and blog) | Same personality, informal and educational. The AI guy reporting on the field. Curated, scannable, opinionated, always a concrete takeaway |
| Documents and decks | Executive. Lead with the answer. Evidence after |

### 6.2 Punctuation and character rules

| Rule | Detail |
|---|---|
| Dashes | Hyphens only. No em dashes, no en dashes |
| Quotes | Straight quotes only |
| Ellipsis | Three periods. Never the single ellipsis character |
| Emojis | Never, in any professional artifact |
| Exclamation points | Never |
| Encoding | Plain ASCII punctuation throughout |

### 6.3 Banned words (never use)

Accordingly, Moreover, Robust, Synergistic, Transformative, Undoubtedly, Facilitate, Delve, Embark, Utilize, Aligns, Augment, Exceptional, Dynamic, Exemplary, Vibrant, Commendable, Thought-provoking, Leverage, Tapestry, Pivotal, Underscore.

Also banned: the phrase "garbage in, garbage out" and every variant. Also banned: the word "guaranteed" in any claim.

### 6.4 Claim discipline

No guarantees. No invented statistics. Any third-party statistic must name its source in the copy. Licensed research (Gartner and equivalents) may be cited by name with facts and figures extracted, but never with reproduced wording, tables, charts, or exhibits.

---

## 7. The Logo Suite (Locked)

### 7.1 The three lockups

| Asset | Description | Primary use |
|---|---|---|
| Full lockup | Standalone A/V mark plus the AYVEDE wordmark | Site header, document cover, deck title slide |
| Standalone mark | Interlocking A/V triangle. Outer triangle reads A, inner ribbon reads V | App icon tile, avatar, watermark, favicon at larger sizes |
| Wordmark only | The word AYVEDE, six capital letters | Footers, narrow horizontal spaces, email signature |

A full dark suite and a full light suite exist for all three, all in the brushed-metal treatment.

### 7.2 Wordmark construction

| Attribute | Spec |
|---|---|
| Letters | AYVEDE, six capitals |
| Typeface character | Modern geometric sans-serif |
| Letter spacing | Generous and even |
| Texture | Fine brushed-metal satin micro-grain |
| Accent letter | The central V only |
| Underline | A thin champagne gold rule beneath the wordmark, delicate, never heavy |

### 7.3 Wordmark color by ground

| Ground | Letter treatment | Hex |
|---|---|---|
| Dark | Brushed platinum | #E8ECF1 |
| Light | Brushed graphite | #3A3F45 |

Never washed-out silver on either ground.

**Known divergence (open decision):** the shipped site renders the nav and footer wordmark letters in #CFD6DF, not the #E8ECF1 specified above. Reconciled 2026-07-30 and left as shipped. Decide whether the spec moves to #CFD6DF or the site moves to #E8ECF1; until then the site ships as-is. See Appendix A.

### 7.4 The V accent rule (important distinction)

| Context | V color | Hex |
|---|---|---|
| Brushed-metal renders, print, prestige imagery | Anodized emerald | #1E4331 |
| The live screen interface (site nav, favicon, web UI) | Interface teal | #2EC4A8 |

**Emerald is the material-render green. Teal is the interface green.** They are not interchangeable. A screen asset with an emerald V is wrong. A prestige metal render with a teal V is wrong.

### 7.5 Favicon and icon sizes

| Size | Asset |
|---|---|
| 16 px and 32 px favicon | The single letter V, flat vector, teal #2EC4A8 |
| Larger app-icon tile | The A/V monogram |

The A/V monogram is reserved for the larger tile. It does not render legibly at 16 px and must not be used there.

### 7.6 Clear space and prohibitions

- Always keep clear space between the standalone mark and the wordmark, so the word never misreads as starting with an extra letter. Minimum clear space on all sides equals the cap height of the wordmark.
- Never place red on the logo, in any context.
- Never render the whole wordmark in gold.
- Never add a drop shadow, glow, outer stroke, or gradient sweep to any lockup.
- Never rotate, skew, stretch, or recolor outside this specification.

---

## 8. The Color System

Dark-theme brand with a print-safe light document mode. The warm-cream direction was evaluated and retired. The accent decision is resolved: teal.

### 8.1 Screen tokens (dark, primary surface)

| Token | Hex | Role |
|---|---|---|
| Background | #0B1120 | The page ground. Never pure black |
| Surface 1 | #101828 | Cards, panels, raised blocks |
| Surface 2 | #161F30 | Nested surfaces, hover states, inner panels |
| Surface 3 | #0D1424 | Recessed areas, strips, alternating bands |
| Border and divider | #1E2D44 | All 1 px borders, dividers, hairlines |
| Accent teal | #2EC4A8 | The single interface accent |
| Champagne gold | #C7A26B | Trim only |
| Risk red | #EF4444 | Risk, liability, alerts only |
| Text primary | #E8ECF1 | Headings and body |
| Text muted | #7A8BA3 | Secondary copy, labels, captions |
| Text dim | #4A5568 | Non-text use only, see 8.4 |
| Figure white | #FFFFFF | Large data figures |

**Recorded working values (shipped in the JSX, adopted as tokens in v1.1):**

| Token | Hex | Role |
|---|---|---|
| Body tone | #A8B4C6 | The `.body` copy color, between text primary and text muted. 8.97:1 on the page ground |
| Wordmark silver | #CFD6DF | Shipped wordmark letter color. Divergent from 7.3, see the flag there |
| Button ink | #07131F | Text on the teal primary button. 8.54:1 on teal |
| Teal hover | #3AD4B7 | Primary button hover fill, one step up in luminance |

### 8.2 Accent usage rules

**Teal #2EC4A8 (the single interface accent):**

| Allowed | Not allowed |
|---|---|
| Logo V in nav | Body text |
| Primary solid buttons | Large decorative fills |
| Active and selected states | Backgrounds behind long copy |
| Chart lines and data strokes | A second accent alongside it |
| Thin line icons | |
| Smaller KPI figures in a quiet strip | |

**Champagne gold #C7A26B (trim only):**

| Allowed | Not allowed |
|---|---|
| Thin rule lines | Body text, ever |
| Small uppercase labels | Large numbers |
| Dividers | Large fills or panels |
| A single-word headline highlight for premium emphasis, for example "High-Trust" in the hero | More than one highlighted word per view |

**Risk red #EF4444 (semantic only):**

| Allowed | Not allowed |
|---|---|
| Risk and liability meaning | Decoration |
| Alerts and error states | The logo |
| A single semantic word in a headline for rhetorical emphasis tied to meaning, for example "Liability" | More than one instance per view |

**Numbers and data figures:** white #FFFFFF or off-white #E8ECF1 in JetBrains Mono with tabular numerals. Teal is acceptable for smaller KPI figures in a quiet strip, as the live site does. Never gold on large numbers.

### 8.3 Prohibitions

- Never pure black (#000000).
- Never a color outside this set. No blue, no purple, no second accent.
- Never a gradient as a brand surface. Layer solid surfaces instead.

### 8.4 Screen contrast audit (WCAG 2.1)

Measured against the page background #0B1120.

| Foreground | Hex | Ratio | Verdict |
|---|---|---|---|
| Figure white | #FFFFFF | 18.83:1 | Pass AAA |
| Text primary | #E8ECF1 | 15.87:1 | Pass AAA |
| Accent teal | #2EC4A8 | 8.59:1 | Pass AAA |
| Champagne gold | #C7A26B | 7.90:1 | Pass AAA |
| Text muted | #7A8BA3 | 5.42:1 | Pass AA |
| Risk red | #EF4444 | 5.00:1 | Pass AA |
| Text dim | #4A5568 | 2.50:1 | **FAIL for text** |

**Text dim #4A5568 must never carry readable text.** Permitted uses only: disabled control states, decorative dividers, and placeholder glyphs. Where dim-looking secondary copy is wanted, use text muted #7A8BA3 instead.

Status: enforced in code 2026-07-30 (v6 build). All seventeen readable-text uses of #4A5568 were moved to #7A8BA3; the only remaining use is the decorative separator dot between hero chips. Note: the shipped CSS defines no `::placeholder` styling, so input placeholders render at the browser default rather than the #7A8BA3 this document specifies. Logged as a minor open item.

Text primary on Surface 1 #101828 measures 14.96:1, so all card copy passes comfortably.

### 8.5 Document mode (light, print-safe)

| Token | Hex | Role |
|---|---|---|
| Light surface | #F4F6F9 | Page ground for documents |
| Paper white | #FFFFFF | Tables, callout fills, print stock |
| Body ink | #1A2230 | All body copy |
| Heading navy | #0B1120 | Headings |
| Hairline | #D9E0EA | Rules, table borders, dividers |
| Gold ink | #8A6D3B | Heading accent, small labels, rules on light |
| Red ink | #C0392B | Risk and alert meaning on light |
| Teal ink | #12796A | **PROPOSAL.** Small text, links, accents on light |

On white, the screen teal, gold, and red all fail as small text. The ink variants above exist for exactly that reason and must be substituted automatically in any light artifact.

### 8.6 Document contrast audit (against #FFFFFF)

| Foreground | Hex | Ratio | Verdict |
|---|---|---|---|
| Body ink | #1A2230 | 14.75:1 (on #F4F6F9) | Pass AAA |
| Teal ink (proposed) | #12796A | 5.29:1 | Pass AA |
| Red ink | #C0392B | 5.44:1 | Pass AA |
| Gold ink | #8A6D3B | 4.85:1 | Pass AA |
| Screen teal | #2EC4A8 | 2.19:1 | **FAIL. Never on light** |

A deeper teal alternative, #0F6B5C at 6.41:1, is available where the type is very small or the stock is uncoated. Both proposals need owner sign-off before they enter production templates.

---

## 9. Typography

| Family | Role | Fallback stack |
|---|---|---|
| Outfit | Headings, labels, body sans | Outfit, Segoe UI, Calibri, system-ui, sans-serif |
| JetBrains Mono | All numbers and structured data | JetBrains Mono, Consolas, Menlo, monospace |

Tabular numerals are enforced everywhere numbers appear. In CSS: `font-variant-numeric: tabular-nums`. In Office: enable the tabular figures option or use the mono family.

### 9.1 Screen type scale

| Role | Size | Weight | Line height | Letter spacing | Family |
|---|---|---|---|---|---|
| H1 | clamp(2.75rem, 5.5vw, 4.25rem) | 600 | 1.05 | -0.02em | Outfit |
| H2 | clamp(2rem, 3.5vw, 2.75rem) | 600 | 1.15 | -0.015em | Outfit |
| H3 | clamp(1.375rem, 2.2vw, 1.75rem) | 600 | 1.25 | -0.01em | Outfit |
| H4 | clamp(1.0625rem, 1.5vw, 1.25rem) | 600 | 1.35 | 0 | Outfit |
| Lead | clamp(1rem, 1.6vw, 1.1875rem) | 400 | 1.55 | 0 | Outfit |
| Body | 0.875rem (14 px) | 400 | 1.6 | 0 | Outfit |
| Caption | 0.8125rem (13 px) | 400 | 1.5 | 0 | Outfit |
| Label | 0.6875rem (11 px) | 600 | 1.2 | 0.14em, uppercase | Outfit |
| Mono | 0.875rem (14 px) | 400 | 1.5 | 0 | JetBrains Mono |
| KPI figure | clamp(2rem, 4vw, 3rem) | 600 | 1.1 | -0.01em | JetBrains Mono |

Screen body sits at 13 to 14 px with line height 1.5 to 1.6. Do not go below 13 px for readable copy.

### 9.2 Print and document type scale

| Role | Size | Weight | Leading | Letter spacing | Family |
|---|---|---|---|---|---|
| H1 | 28 pt | 600 | 1.10 | -0.01em | Outfit |
| H2 | 20 pt | 600 | 1.15 | -0.01em | Outfit |
| H3 | 15 pt | 600 | 1.25 | 0 | Outfit |
| H4 | 12.5 pt | 600 | 1.30 | 0 | Outfit |
| Lead | 12 pt | 400 | 1.50 | 0 | Outfit |
| Body | 10.5 to 11 pt | 400 | 1.50 | 0 | Outfit |
| Caption | 9 pt | 400 | 1.40 | 0 | Outfit |
| Label | 8 pt | 600 | 1.20 | 0.12em, uppercase | Outfit |
| Mono | 10 pt | 400 | 1.40 | 0 | JetBrains Mono |

Document body sits at 10.5 to 12 pt with leading 1.4 to 1.6.

### 9.3 Font embedding

Embed fonts on save in Word, Excel, and PowerPoint so the artifact survives forwarding. If embedding is unavailable, fall back to Segoe UI and Consolas rather than allowing a substitution to a serif or a condensed face.

### 9.4 Typographic prohibitions

- No italics for emphasis in brand copy. Use weight or a token color instead.
- No all-caps except the Label role.
- No letter spacing on body copy.
- No more than two type families in any artifact.
- No justified text. Left-aligned, ragged right.

---

## 10. Components, Layout, and Motion

### 10.1 Layout system

| Attribute | Spec |
|---|---|
| Approach | Content-first grids. Multi-column where it aids scanning |
| Density | Structured and breathing. Never crammed, never sprawling |
| Max content width | 1200 px, with a 1400 px outer bound for full-bleed strips |
| Gutter | 24 px mobile, 32 px tablet, 40 px desktop |
| Section vertical rhythm | 64 px mobile, 96 px desktop between major sections |
| Breakpoints | 480, 768, 1024, 1280 |
| Approach order | Mobile-first |

### 10.2 Surface and depth

| Rule | Spec |
|---|---|
| Corner radii | 2 to 6 px only |
| Borders | 1 px, color #1E2D44 |
| Shadows | **None anywhere.** No drop shadows, no glow, no outer stroke |
| Depth technique | Surface layering plus 1 px dividers only |

### 10.3 Buttons

| Variant | Fill | Text | Border | Radius | Padding | Use |
|---|---|---|---|---|---|---|
| Primary | #2EC4A8 | #0B1120 | none | 4 px | 12 px vertical, 24 px horizontal | The single dominant action per view |
| Secondary | #1E2D44 | #E8ECF1 | none | 4 px | 12 px vertical, 24 px horizontal | Supporting action beside a primary |
| Outlined | transparent | #E8ECF1 | 1 px #1E2D44 | 4 px | 12 px vertical, 24 px horizontal | Tertiary action, low emphasis |
| Text link | none | #2EC4A8 | none | none | none | Inline navigation |

Both primary and secondary are filled. Primary must visually dominate. Minimum target height 44 px for touch. Hover raises the fill one step in luminance, never adds a shadow. Focus state is a 2 px #2EC4A8 outline offset 2 px, never removed.

### 10.4 Cards

| Attribute | Spec |
|---|---|
| Fill | #101828 |
| Border | 1 px #1E2D44 |
| Radius | 6 px |
| Internal padding | 24 px, 28 px on desktop |
| Dividers | 1 px #1E2D44 |
| Hover | Border shifts to #2EC4A8 at reduced opacity, or surface lifts to #161F30. No shadow, no scale, no lift transform |

### 10.5 Chips and tags

| Attribute | Spec |
|---|---|
| Fill | #161F30 |
| Border | 1 px #1E2D44 |
| Radius | 2 px |
| Type | Label role, 11 px, uppercase, 0.14em tracking |
| Text | #7A8BA3 default, #2EC4A8 when active |
| Active fill | #2EC4A8 at low opacity with #2EC4A8 border |

### 10.6 Forms and inputs

| State | Spec |
|---|---|
| Default | Fill #0D1424, border 1 px #1E2D44, radius 4 px, text #E8ECF1, placeholder #7A8BA3, padding 12 px 16 px |
| Focus | Border #2EC4A8, plus a 2 px offset outline. Never remove focus visibility |
| Submitting | Button disabled at 60 percent opacity, label changes to a pending state, input locked |
| Success | On-page confirmation in #2EC4A8 with a 1 px #2EC4A8 border block. No page navigation |
| Error | Message in #EF4444 with a fallback path so the visitor is never stranded |

**Form submission rule:** forms must submit in the background and resolve on-page. A form must never depend on the visitor having a configured mail client. The mailto mechanism is retired: it captures nothing and fails silently when no mail handler is registered.

Status: implemented in code 2026-07-30 (v6 build). All three submissions (Subscribe, Connect inquiry, Tools results) POST to Formspree with the JSON accept header and resolve on-page through four states (idle, submitting, success, error with a direct-email fallback). Three separate endpoints, defined as constants at the top of the source next to EMAIL. The plain mailto anchors in the footer, the Vision founder card, and the Connect direct block remain, correctly, as links. Free-plan reality: unlimited forms, 50 submissions per month across the account.

### 10.7 Data and tables

| Attribute | Spec |
|---|---|
| Figures | JetBrains Mono, tabular numerals, right-aligned in numeric columns |
| Header row | Label role, #7A8BA3, 1 px #1E2D44 bottom rule |
| Row divider | 1 px #1E2D44 |
| Zebra striping | None. Use dividers |
| Chart strokes | #2EC4A8 primary, #C7A26B secondary, #EF4444 for risk series only |
| Chart chrome | 1 px #1E2D44 axes, no gridline clutter, no 3D, no shadow |

### 10.8 Motion

| Surface | Rule |
|---|---|
| Screen | Subtle, fast, reveal-on-scroll via IntersectionObserver. Duration 200 to 400 ms. Easing ease-out. Opacity and small translate only |
| Documents and print | No motion of any kind |

No bounce. No theatrical easing. No parallax. No autoplay video. Respect `prefers-reduced-motion` and disable reveals when it is set.

### 10.9 JSX implementation note

Express every token as a reusable constant or a token layer near the top of the source, so Claude Code applies values consistently rather than scattering one-off inline hex values through the component tree. New components consume tokens. They never hardcode a color.

### 10.10 Accessibility as quality

| Requirement | Standard |
|---|---|
| Contrast | WCAG 2.1 AA minimum for all text |
| Focus states | Always visible, never suppressed |
| Alt text | Every meaningful image. Decorative images marked as such |
| Semantics | Real headings in order, real buttons, real labels on inputs |
| Touch targets | 44 px minimum |
| Language | Inclusive, plain, jargon defined on first use |
| Motion | Honors reduced-motion preference |

---

## 11. The Live Site as Reference Implementation

Reconciled against the JSX on 2026-07-30. The site is a nine-route SPA behind one persistent nav and footer, not one scrolling page.

### 11.1 Navigation (live since 2026-07-14)

Top-level order as shipped: **Home, Solutions, Tools, Insights, Vision**, plus **Connect** as the solid teal primary button in the nav bar. Solutions is a dropdown containing Advisory (the former Solutions page), Programs, Platform, and Innovation Lab. The mobile burger menu shows a Solutions group label with the four subtabs indented. The footer lists all nine destinations flat. The restructure is not pending; it has been live since v4 shipped on 2026-07-14.

### 11.2 The nine routes

| Route | Nav label | What it carries |
|---|---|---|
| home | Home | Hero (eyebrow "Advise · Vet · Deliver", "High-Trust" in gold), KPI strip, The Problem (three risk cards plus the diagnostic teaser card), The Ayvede Model (four cards), the 4-step system, What we implement (6 service cards), Why Ayvede plus audience row, Structured Programs chips, Subscribe band, closing CTA band |
| solutions | Advisory (under Solutions) | 7 service rows with deliverables, the three-tier engagement model (Diagnostic, Program, Retainer), CTA band |
| programs | Programs (under Solutions) | 8 program cards with tags, formats, and deliverables |
| platform | Platform (under Solutions) | 4 platform modules, the data-to-board flow, deployment facts |
| lab | Innovation Lab (under Solutions) | 6 lab ventures with stage tags, the 4-stage pipeline |
| tools | Tools | The Spend Diagnostic: 38-tool catalog, live totals, overlap flags, benchmarks band, tools registry |
| insights | Insights | The Ayvede Briefing hub, see section 12 |
| vision | Vision | Philosophy, operating principles, long-term view, founder block |
| connect | Connect (nav button) | Inquiry form (background submit), what-happens-next, direct contact block |

Three distinct content lists that must not be conflated: **8 programs** (Programs page), **6 home service cards** (What we implement), **7 Advisory service rows** (Advisory page).

**KPI figures ship gold #C7A26B**, not teal. This is the standing decision; the 8.2 allowance for teal KPI figures describes an option, not the shipped state.

---

## 12. The Insights Hub: The Ayvede Briefing

### 12.1 Data source contract

Each article is one Google Doc in Drive "AI, Properly > Newsletters." The Doc opens with labeled machine-readable fields in this exact order, then the body:

| Field | Format | Notes |
|---|---|---|
| TITLE: | Plain text headline | Becomes the card headline |
| TEASER: | One to two sentences | Becomes the card teaser |
| CATEGORY: | One primary tag, optionally one secondary | Separator may be a comma or a middle dot (U+00B7). The parser must accept both |
| PHOTO DIRECTION: | Plain-language description | Parsed and retained in source, not rendered. See 12.5 |
| DATE: | YYYY-MM-DD | Drives sort order and the card date |
| ARTICLE: | Full body, markdown permitted | Becomes the in-app reader content |

Filename convention: `YYYYMMDD - Title`.

**Parser requirements, all learned from production failures:** accept both category separators; keep a markdown table intact across blank lines between rows; never truncate the body on a line that resembles a field label; generate unique slugs so two similar titles cannot collide; reject an impossible date rather than passing it through.

### 12.2 Pipeline

Build-time only. A script reads the Drive folder, parses each Doc, and writes a bundled data file compiled into the artifact. **No runtime fetch.** The site stays a self-contained artifact. One command re-pulls and rebuilds for each new batch.

The pipeline is read-only against Drive. It never modifies or deletes a Doc.

### 12.3 Card specification

| Attribute | Spec |
|---|---|
| Fill | #101828 |
| Border | 1 px #1E2D44 |
| Radius | 6 px |
| Shadow | None |
| Visual | On-brand geometric constellation motif, generated client-side and seeded by the article slug so each card is distinct and stable. Navy ground, teal #2EC4A8 and gold #C7A26B strokes. Zero image bytes, zero external requests |
| Headline | H4 role, #E8ECF1 |
| Teaser | Caption role, #7A8BA3 |
| Category chip | Chip component, Label role |
| Date | JetBrains Mono, Caption size, #7A8BA3 |

### 12.4 Category taxonomy (canonical, must match the content engine exactly)

Data Governance, ERP, Legal, Healthcare, Finance, General AI News.

A card carries one primary tag and at most one secondary tag. Filtering matches on either. No tag outside this closed set may be introduced without updating both the engine and this document.

### 12.5 Imagery status (reconciliation item)

The photo lane was removed from this pipeline by an explicit owner decision. The stock-photo integration introduced an API key dependency, inflated the bundle by roughly an order of magnitude, and blocked deployment. The shipped hub is **photoless** and uses the constellation motif above.

Restoring photographic cards would reintroduce all three problems. It should not be done without a deliberate decision and a plan for bundle weight. Until then, the constellation motif is the specification.

### 12.6 Behavior

| Feature | Spec |
|---|---|
| Grid | Responsive. One column mobile, two tablet, three desktop |
| Sort | Newest first by DATE |
| Category filter | Chip row, All plus the six categories. Live, client-side, matches primary and secondary tags |
| Keyword search | Live, client-side, across title, teaser, category, and body |
| Load more | Not built. All cards render at once today; add progressive reveal when the archive size warrants it |
| Article view | Opens in-app in the existing state-based navigation. Never an off-site link |
| Reader | Slim constellation accent strip, title, category, date, full body with rendered headings, bold, links, and tables. Back control and scroll-to-top |
| Empty states | Two on-brand states: no articles at all, and filter matched nothing |
| Mobile | No horizontal overflow. Tables scroll inside their own container |

### 12.7 Header

Title: **The Ayvede Briefing.** One-line descriptor in the newsletter voice, immediately clear to a first-time reader.

### 12.8 Known backlog item

The refresh currently reprocesses the entire Newsletters folder on every run. As the archive grows this becomes wasteful and will eventually surface stale articles alongside current ones. The fix is a recency window, newest-first cap, or an incremental pull. Logged, not urgent, not blocking.

---

## 13. Cross-Medium Rules

| Medium | Ground | Type | Logo V | Notes |
|---|---|---|---|---|
| Web (the JSX build) | Dark #0B1120 | Screen scale, section 9.1 | Teal #2EC4A8 | Tokens as constants. No shadows. Reveals honor reduced-motion |
| The Ayvede Briefing | Dark #0B1120 | Screen scale | Teal #2EC4A8 | Card and reader specs in section 12 |
| PDF | Light #F4F6F9 or white | Print scale, section 9.2 | Emerald #1E4331 for prestige covers, gold ink for trim | Ink variants required. Embed or outline fonts |
| Word | White | Print scale | Emerald on cover, gold ink trim | Define real Word styles mapped to the type roles. Embed fonts on save |
| Excel | White | Mono for all figures | Wordmark only in the header | Tabular numerals enforced. Hairline #D9E0EA borders. No fill-color coding except red ink for exceptions |
| PowerPoint | Dark #0B1120 for pitch, light for handout | Screen scale scaled to slide | Teal on dark, emerald on prestige title | 16:9. Master slides carry the tokens. No transitions beyond a cut or a fast fade |
| Email | Light, white body | Print scale, web-safe fallbacks | Wordmark only, flat, no metal texture | Inline CSS. No background images. Single-column at 600 px |
| Social (non-LinkedIn) | Dark #0B1120 | Screen scale, sized up | Teal or emerald depending on render style | Supporting campaign line permitted. Ayvede branding permitted |
| Personal LinkedIn | Not applicable | Not applicable | **None** | No Ayvede branding of any kind. See 5.1 |

### 13.1 Office handoff rules

- Deliver Office binaries with fonts embedded and all styles mapped to the named type roles, not manually formatted runs.
- Never deliver an Office file with a token color applied as an arbitrary custom color. Define the palette in the theme so it is reusable.
- Excel: figures in JetBrains Mono, tabular, right-aligned. Never color-code a cell fill except red ink #C0392B for a genuine exception.
- PowerPoint: build on masters. A deck where slides carry ad hoc formatting is not shippable.

---

## 14. Imagery: Two Separate Lanes

These lanes never mix.

### 14.1 Lane 1: Editorial, article, and card photography

| Rule | Detail |
|---|---|
| Source | Real, properly licensed stock from Unsplash or Pexels only |
| Relevance | Topically relevant to the specific article |
| AI generation | **Never.** No AI-generated image may appear as editorial or card photography |
| Attribution | Record photographer name and source URL. Render visible linked attribution where the license requires it |
| No fit found | Leave it blank and flag it. Never substitute an AI image, and never substitute a loosely related stock photo |

Current status: this lane is inactive on the Insights hub by owner decision. See 12.5.

### 14.2 Lane 2: Brand, logo, and prestige renders only

The premium brushed-metal material aesthetic lives here and nowhere else.

**The Ayvede lens (reusable paragraph for brand renders):**

> Studio product photography of a precision-machined object on a dark obsidian slate surface. Warm champagne gold brushed metal with a fine satin micro-grain, a single anodized emerald accent used once and sparingly, and brushed platinum detailing. Controlled directional studio lighting with soft falloff and a clean specular edge. Matte background, shallow depth of field, no gradients, no glow, no lens flare, no text, no logos other than the specified mark. Restrained, expensive, editorial. Muted contrast, no saturation push.

| Allowed in lane 2 | Never in lane 2 |
|---|---|
| Logo renders and lockups | Article or card photography |
| App icons and tiles | Anything depicting people as if documentary |
| Prestige covers and title slides | Anything implying a real photographed event |
| Abstract brand texture | A second accent color |

**Lane 2 never applies to article or card photography.** A brushed-metal render on a newsletter card is a violation.

---

## 15. What Destroys the Brand (Do Not Do)

| # | Prohibition | Why |
|---|---|---|
| 1 | Editing the site in the Wix visual editor | Wix is a shell. The edit will be lost on the next bundle swap and may break the embed |
| 2 | Inventing a new deployment approach, or porting to native Wix or another host | The compile-and-embed method is proven. Substitutes have failed |
| 3 | AI-generated editorial or card photography | Destroys credibility with an audience that sells trust |
| 4 | Introducing a second accent color | Teal is the only interface accent. A second accent breaks the system |
| 5 | Ayvede branding on personal LinkedIn | Grant Thornton colleagues are connections there |
| 6 | Gold on body text or on large numbers | Gold is trim only |
| 7 | Red used decoratively | Red carries risk meaning. Decorative use destroys the signal |
| 8 | Red anywhere on the logo | Locked |
| 9 | Drop shadows, glow, gradient brand surfaces | Depth comes from layering and 1 px dividers |
| 10 | Pure black, or any color outside the token set | Off-system |
| 11 | Text on #4A5568, or screen teal as small text on white | Both fail WCAG AA |
| 12 | An emerald V on a screen interface, or a teal V on a prestige metal render | Emerald is material, teal is interface |
| 13 | Em dashes, emojis, exclamation points, or any banned word | Voice rules are locked |
| 14 | Reproducing licensed research wording, tables, or exhibits | Legal exposure. Extract facts, write original commentary, cite the source |
| 15 | Fabricating a statistic or making a guarantee | The entire brand is accountability |
| 16 | Publishing without a local preview and explicit owner approval | The publish gate is mandatory |
| 17 | Deleting or rewriting existing site content during a restructure | Restructure moves content. It never removes it |
| 18 | A form that depends on the visitor having a mail client | Captures nothing and fails silently |
| 19 | Runtime content fetching in the site | The artifact must stay self-contained |
| 20 | Redesigning what already works | Restructure, do not redesign |

---

## 16. Validate Before Ship

Run this checklist against every artifact. An artifact that fails any line does not ship.

### 16.1 Brand and voice

- [ ] Positioning line and tagline used correctly for the surface
- [ ] Correct branding posture for the surface, including the LinkedIn ban
- [ ] No banned words present
- [ ] Hyphens only, straight quotes, three-period ellipsis, no emojis, no exclamation points
- [ ] No guarantees, no fabricated statistics, every third-party figure attributed
- [ ] Licensed research paraphrased, never reproduced

### 16.2 Color and type

- [ ] Every color is a token from section 8, with the correct light or dark variant
- [ ] Teal is the only accent. No second accent present
- [ ] Gold is trim only. No gold body text, no gold large figures
- [ ] Red carries meaning, appears at most once per view, and is absent from the logo
- [ ] All text pairs pass WCAG 2.1 AA. Nothing readable sits on #4A5568
- [ ] Type roles used as defined. Outfit and JetBrains Mono only
- [ ] All figures use tabular numerals

### 16.3 Logo

- [ ] Correct lockup for the space
- [ ] Correct V color for the medium: teal for interface, emerald for material renders
- [ ] Clear space respected between the mark and the wordmark
- [ ] No red, no all-gold wordmark, no shadow, no distortion

### 16.4 Layout and components

- [ ] Radii between 2 and 6 px
- [ ] 1 px borders, no shadows anywhere
- [ ] Components consume tokens, not hardcoded values
- [ ] Focus states visible, touch targets 44 px, alt text present
- [ ] Motion subtle and reduced-motion honored, or absent entirely for print

### 16.5 Website specific

- [ ] Source file path confirmed before editing
- [ ] Every existing section and all copy preserved
- [ ] Insights hub intact: cards, category filter, keyword search, in-app reader, both empty states
- [ ] Forms submit in the background and resolve on-page, with success and error states
- [ ] Contact address is anthonydellapia@gmail.com, and no @ayvede.com address remains
- [ ] Rebuilt with esbuild, CSS inlined byte for byte, bundle lean, no runtime fetch
- [ ] Mobile has no horizontal overflow
- [ ] Local preview shown and explicitly approved
- [ ] Rollback URL captured before publishing
- [ ] Only the BODY_END bundle script src changed. React tags and HEAD embed untouched
- [ ] Live site verified after publish

---

## 17. Version Footer

| Field | Value |
|---|---|
| Document | Ayvede Master Design Directive |
| Version | 1.1 (AVD) |
| Status | Canonical. Supersedes all prior design guidance |
| Owner | Anthony Vincent DellaPia |
| Issued | 2026-07-30 |
| Applies to | ayvede.com, The Ayvede Briefing, and all Ayvede documents, decks, email, social, and brand imagery |
| Excluded | Personal LinkedIn content, which carries no Ayvede branding |
| Review cadence | On any structural site change, or quarterly, whichever comes first |
| Precedence | The shipped JSX governs what renders. This document governs intent, and is updated to match reality whenever the two diverge |

---

## Appendix A: Open Items for Owner Confirmation

| # | Item | Status and recommendation |
|---|---|---|
| 1 | Teal ink #12796A for light artifacts (5.29:1) | Open. Approve, or approve the deeper #0F6B5C (6.41:1) for small type |
| 2 | Insights card imagery | Open, default standing: keep the photoless constellation motif. Restoring photos reintroduces the API dependency, the bundle weight, and the deploy failure |
| 3 | Newsletter list mechanism | Resolved 2026-07-30: background capture via Formspree, three endpoints, on-page states. The submission inbox lives in the Formspree dashboard; export or forward from there if a formal list tool comes later |
| 4 | Whether the restructure ships | Resolved: it shipped 2026-07-14 and is live |
| 5 | Logo asset files | Open. Confirm the full dark and light suites exist as production files, not only as descriptions |
| 6 | Office template files | Open. Confirm whether Word, Excel, and PowerPoint templates exist, or need to be built from section 13 |
| 7 | Wordmark letter color | New, open: the site ships #CFD6DF against the 7.3 spec of #E8ECF1. Decide which one is canonical; see 7.3 |
| 8 | Input placeholder styling | New, minor: no `::placeholder` rule exists in the shipped CSS; browsers render their default. Add the #7A8BA3 rule in a future build if wanted |

## Appendix B: Reconcile Against the JSX

Reconciled in full on 2026-07-30 (report: "Ayvede JSX Reconciliation, Appendix B"). Outcomes:

| # | Item | Outcome |
|---|---|---|
| 1 | Source file path | `~/Desktop/2 | Ayvede/ayvede-v2.jsx`. Both previously reported paths are dead. Stale v1 file archived with an ARCHIVED prefix |
| 2 | Structure | The six-item restructure with the Tools tab. Live since 2026-07-14 |
| 3 | Section list | Nine-route SPA; section 11 rewritten to the per-page map |
| 4 | Counts | 8 programs, 6 home service cards, plus 7 Advisory service rows. All confirmed |
| 5 | Bundle | v5 live at 192,443 bytes (URL and hash in 4.1). The 79 KB and 137 KB figures were stale |
| 6 | Forms | Background submission implemented 2026-07-30 (v6 build); zero @ayvede.com anywhere |
| 7 | Token consistency | Four working colors recorded into section 8. Tokens remain inline by deliberate decision; no constant-layer refactor |
| 8 | Insights parser | All contract behaviors confirmed in code: both separators, tables across blank lines, label-truncation guard, unique slugs, strict date validation |
| 9 | Tools calculator | Editable array, as-of date July 14 2026, five unverified rates flagged in the UI, benchmarks attributed |
| 10 | Reduced motion | Honored via the prefers-reduced-motion media query; reveals and hover lift disabled |

---

End of Ayvede Master Design Directive v1.1 (AVD).
