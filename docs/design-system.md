# Design System

A lightweight reference for the visual language of the portfolio. The aesthetic
is **brutalist greyscale**: hard edges, no rounded corners, oversized type as a
design element, and asymmetric layouts. **Images are the only intended source of
colour** — the UI itself is greyscale end to end.

> Full brand/intent lives in the root `CLAUDE.md`. This doc is the practical
> "how it's built" companion.

## Colour tokens

Defined in [`src/index.css`](../src/index.css) `:root`. Greyscale only — no
accent colours anywhere in the UI.

| Token | Value | Use |
|-------|-------|-----|
| `--black` | `#0a0a0a` | Page background |
| `--dark` | `#1a1a1a` | Card / surface background |
| `--mid` | `#333333` | Hairline borders, dividers (decorative — not text) |
| `--grey` | `#858585` | Muted body text (tags, subtitles, descriptions). Meets WCAG AA 4.5:1 on `--black`/`--dark` |
| `--outline` | `#666666` | Stroke colour for outline headings. Meets AA large-text 3:1 |
| `--light` | `#cccccc` | Secondary emphasis text |
| `--off-white` | `#e8e8e8` | Default body text colour |
| `--white` | `#f5f5f5` | Headings, high-emphasis text |

**Accessibility note:** `--grey` and `--outline` were tuned in the perf/a11y
pass so muted text and outline headings clear WCAG AA. `--mid` is intentionally
faint and is for *non-text* decoration only — don't colour text with it.

**One intentional exception:** the MGKCodes (`#freelance`) section runs its own
`--mgk-*` token set in [`MGKCodes.module.css`](../src/components/MGKCodes.module.css),
including `--mgk-blue` (#0074d9). That blue is **MGKCodes' brand colour**, used
deliberately on the logo wordmark and the primary CTA — it's a sanctioned
exception to the greyscale-only rule (see `CLAUDE.md` section 4). Everywhere else
uses the global tokens above.

## Typography

- **Headings:** `Space Grotesk`, 700–800 weight (`--font-heading`)
- **Body:** `Inter`, 400–500 weight (`--font-body`)
- Loaded from Google Fonts, non-render-blocking (see `architecture.md`).
- Headings use tight tracking (`letter-spacing: -0.02em`) and `line-height: 1.05`.
- Oversized, `clamp()`-scaled headings are used as layout elements, not just labels.

## The two-line heading pattern

Every major section header follows the same three-part structure:

1. **Line 1** — solid `--white` text, smaller (e.g. `SELECTED`, `ABOUT`, `MGK`)
2. **Line 2** — larger **outline** text (`color: transparent; -webkit-text-stroke: 2px var(--outline)`), offset right with `margin-left` (e.g. `WORK`, `ME`, `CODES`)
3. **Bar** — a short `--grey` rule, `120px × 3px`, below the heading

Implemented per-section as `.title` / `.titleOutline` / `.line` in each
component's CSS module. Example: [`Portfolio.module.css:12-30`](../src/components/Portfolio.module.css#L12-L30).

## Spacing & layout

- Section rhythm via the global `.section-padding` utility (`index.css`):
  `8rem 2rem` desktop, `5rem 1.25rem` mobile (≤768px).
- Content max-width ~`1400px`, centred.
- Layouts are deliberately asymmetric — elements bleed off edges, headings offset,
  cards alternate left/right.
- **No `border-radius` anywhere.** Hard edges are part of the brand.

## Interactions & motion

- Smooth-scroll anchor navigation (`html { scroll-behavior: smooth }` + JS
  `scrollIntoView`).
- Hover states on every interactive element (colour/transform shifts to `--white`).
- Spring easing for the card deck: `cubic-bezier(0.34, 1.35, 0.64, 1)`.
- Background geometry animation in the About section (21 floating shapes via CSS
  keyframes).
- Scroll-driven effects: hero parallax slide-out, portfolio card scale, per-card
  background text (see component catalog).

## Component catalog

| Component | Role | Notes |
|-----------|------|-------|
| `IntroScreen` | One-time intro animation | `MK.` scan → fall → exit, ~3.2s, then unmounts. Locks body scroll while active. |
| `Navbar` | Fixed top nav | Logo `MK.`, centre links, right-side social icons; burger + slide-down panel on mobile. |
| `Hero` | Landing | Asymmetric name/headshot, scroll parallax (`useScrollSlide`), `MATTHEW` bg text. Headshot is the LCP image (preloaded). |
| `Portfolio` | Primary section | Scroll-scaled stacked cards (`useCardScale`), filter tabs, per-card bg text. See image variants below. |
| `OpenSource` | Contributions | Dashed-border **empty state** by design (data in `contributions.js`, currently empty). |
| `Skills` | Custom skills | **Live-fetched** at runtime from the skills repo manifest, with a baked fallback. |
| `TechStack` | Tools | Greyscale official logos in asymmetric category rows. |
| `MGKCodes` | Freelance brand | Logo + copy + CTAs; scrolling text/logo tickers. Uses its own `--mgk-*` tokens. |
| `Passions` | About / human side | Bio text + interactive 3-card deck (idle stack → fan → fly-up). Background geometry. |
| `Footer` | Close | Minimal contact links, outline footer text. |
| `icons/MGKIcon` | MGK monogram | Inline SVG used in Navbar + Hero. |

### Project-card image variants (`Portfolio.jsx`)

A project card renders one of several image treatments, chosen by which field
the project defines in [`src/data/projects.js`](../src/data/projects.js):

| Field | Treatment |
|-------|-----------|
| `carouselImages` | Single image at a time, left/right nav, vertical in-window scroll |
| `mobileShowcaseImages` | App-Store-style horizontal strip of portrait phone shots |
| `dualMobileImages` | Two portrait shots side-by-side, scrollable |
| `longImage` (+ `mobileLongImage`) | Tall full-page capture, scrolls within the card; Desktop/Mobile toggle |
| `image` | Single static 16:9 image |

Projects with **both** `carouselImages` and `mobileShowcaseImages` get a
**Desktop/Mobile toggle** (web carousel vs. iOS phone showcase) — e.g. Frunt.

All card images are `loading="lazy"` + `decoding="async"`; only the hero headshot
is eager/high-priority.
