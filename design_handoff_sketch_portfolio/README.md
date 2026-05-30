# Handoff: Sketches from Sweden — Artist Portfolio Site

## Overview
A small, gallery-style portfolio website for showcasing graphite and watercolour drawings. It has two primary views — a **Sketchbook gallery** (home) and an **Immersive artwork-detail** view — plus an **About** page. The whole site supports a **light/dark theme** toggle. The aesthetic is quiet, paper-toned, and typographic: large serif display type, warm cream/charcoal backgrounds, and the artwork shown large with minimal chrome.

## About the Design Files
The files in this bundle are **design references created in HTML/React (via in-browser Babel)** — a working prototype that demonstrates the intended look, layout, and behavior. They are **not** meant to be shipped to production as-is. The HTML loads React, ReactDOM, and Babel from a CDN and transpiles JSX in the browser, which is fine for a prototype but not for a real deployment.

The task is to **recreate this design in a production environment**: a proper React app (Vite or Next.js recommended, since the prototype is already React/JSX), or another framework if the team prefers. Use the codebase's established patterns, a real build step (precompiled JSX, bundled assets), and proper routing. If no codebase exists yet, Vite + React is the most direct path given the existing component structure.

## Fidelity
**High-fidelity (hifi).** Final colors, typography, spacing, and interactions are all specified and should be reproduced pixel-faithfully. Exact tokens are listed below.

## Architecture (as prototyped)
- Single-page app with **client-side view switching** (no router in the prototype — it uses React state: `view = {name: 'home'|'detail', index}` plus `page = 'work'|'about'`). In production, replace with real routes:
  - `/` → Sketchbook gallery (Work)
  - `/about` → About
  - `/work/:slug` → Immersive detail for one drawing
- A single `WORKS` array is the data source. Each entry: `{ t (title), y (year), m (medium), d (dimensions), place, img (optional path), note }`. Drawings without an `img` render a **paper-textured placeholder** showing the medium + size — intentional, so new pieces can be dropped in later.
- `RATIOS` array holds each piece's aspect ratio (parallel to `WORKS` by index).

## Screens / Views

### 1. Sketchbook Gallery (Home / Work)
- **Purpose**: Browse all drawings; click one to open its detail view.
- **Layout**: CSS grid, two columns: a fixed **330px left rail** + fluid content column. Rail is `position: sticky; top: 0; height: 100vh`. On screens ≤980px the grid collapses to a single column and the rail becomes static (border-bottom instead of border-right).
- **Left rail** (top→bottom, flex column):
  - Mono eyebrow: "Sketchbook № 07" (`--mono`, 10.5px, letter-spacing .18em, uppercase, `--ink-soft`)
  - `h1` "Sketches / from / Sweden" — Cormorant Garamond 500, 56px, line-height .96, letter-spacing -.01em, with `<br>` line breaks
  - Description paragraph — EB Garamond 17px, line-height 1.55, `--ink-soft`, max-width 230px
  - Nav list (`01 Work`, `02 About`) — mono 11px uppercase, number in `--ink-faint`; active/hover item has a 1px `--accent` bottom border. These switch the `page` state.
  - Rail foot (margin-top auto): theme toggle + italic signature "— from the studio, Gothenburg" (Cormorant italic 19px, `--ink-soft`)
- **Content column** (padding 60px 64px 0):
  - Header row ("Selected work" / "2023 — 2025") — mono overline, both ends, 1px bottom border, 22px padding-bottom, 48px margin-bottom
  - **Entries**: flex column, gap 30px. Each entry is a clickable/focusable `article` (role=button, tabIndex 0, Enter/Space open it):
    - Grid: `62px` numeral column + content. Numeral is Cormorant 44px, `--ink-faint`.
    - Content row: grid `1.25fr 1fr`, gap 34px — the framed image on the left, text on the right.
    - Text: title (Cormorant **italic** 500, 36px) · meta line (mono 11px uppercase: `medium · size · year`) · note (EB Garamond 18px, line-height 1.55, `--ink-soft`) · "View drawing →" (mono 11px uppercase `--accent`, hidden until hover/focus, fades + slides in).
    - Hover/focus on entry: background → `--paper-2`, image scales to 1.03 (transform transition .6s), "View drawing →" reveals (opacity 0→1, translateX -6px→0).
    - Entry has 22px padding with -22px negative margin so the hover background bleeds nicely.
  - Footer row ("Gothenburg · Sverige" / "N drawings") — mono overline, 1px top border, 64px margin-top.

### 2. Immersive Artwork Detail
- **Purpose**: View one drawing large with its details; page between works.
- **Layout**: CSS grid `1.35fr 1fr`, `height: 100vh`. Collapses to single column, auto height, ≤980px.
- **Left (art-side)**: background `--paper-deep`, centered, padding 70px. Artwork: `height: 100%; max-height: 660px; aspect-ratio: 3/4`, drop shadow `0 30px 60px var(--art-shadow)`. The image uses `object-fit: contain` (not cropped).
- **Right (meta-side)**: padding 46px 70px 54px, flex column.
  - **Top bar**: "← All work" button (mono 11px uppercase; hover `--accent`) + mini theme toggle, space-between.
  - **Middle** (margin auto, vertically centered):
    - Overline "Drawing № 0X" (mono)
    - Title `h2` — Cormorant 500, 78px, line-height .92
    - Year — Cormorant italic 30px, `--ink-soft`
    - Note paragraph — EB Garamond 21px, line-height 1.6, `--ink-soft`, max-width 400px
    - Spec grid — 2×2, gap 24px, max-width 400px. Each cell: mono 10px label + Cormorant 25px value (Medium / Size / Place / Year).
  - **Pager** (bottom): "← {prev title}" / "{next title} →", Cormorant italic 21px, `--ink-soft`, hover `--accent`, 1px top border. Wraps around the array.

### 3. About
- **Purpose**: Short artist statement + contact facts. Shares the same left rail as Home (rail stays; only the content column swaps).
- **Layout**: Content column header ("About" / "Studio · Gothenburg"). Below, a grid `0.85fr 1fr`, gap 60px:
  - **Left**: sticky portrait (`top: 60px`) using the first work's image, 3/4 ratio, with a mono caption "In the studio".
  - **Right** (max-width 520px): lede (Cormorant italic 500, 34px, line-height 1.18, `--ink`), two body paragraphs (EB Garamond 19px, line-height 1.66, `--ink-soft`), then a facts table (rows: Based in / Media / Working since / Enquiries) — mono 10px labels, 18px serif values, hairline row borders — and an italic signature.
- Collapses to single column ≤980px (portrait becomes static).

## Interactions & Behavior
- **Open detail**: click or Enter/Space on a gallery entry → `view = {name:'detail', index:i}`; window scrolls to top.
- **Back**: "← All work" → `view = {name:'home'}`.
- **Paging in detail**: prev/next buttons, and **keyboard**: ArrowLeft = prev, ArrowRight = next, Escape = back. Paging wraps modulo `WORKS.length`.
- **Nav (Work/About)**: sets `page` state; only affects the home view's content column.
- **Theme toggle**: pill control, two buttons (Light / Dark). Active button has `--ink` background, `--paper` text. Sets `data-theme` on the `.site` wrapper.
- **View transition**: a `.view-fade` wrapper keyed on `view.name + index + page` re-runs a 0.5s opacity fade on every navigation.
- **Image hover** in gallery: scale 1.03 over .6s ease.

## State Management
- `theme: 'light' | 'dark'` — persisted to `localStorage` under key **`sfs-theme`**, read on init, written on change. (In production, also respect `prefers-color-scheme` for first visit.)
- `view: { name: 'home' | 'detail', index: number }` — replace with router params in production.
- `page: 'work' | 'about'` — replace with routes.
- No data fetching; `WORKS` is a static array. In production this could come from a CMS or a local data file.

## Design Tokens

### Colors — Light theme
| Token | Hex | Use |
|---|---|---|
| `--paper` | `#f3efe6` | page background |
| `--paper-2` | `#ebe4d6` | frame bg, entry hover |
| `--paper-deep` | `#e6ddcb` | detail art-side bg, placeholder fill |
| `--ink` | `#2b2823` | primary text (warm near-black) |
| `--ink-soft` | `#7a7264` | secondary text |
| `--ink-faint` | `#a59c8b` | tertiary / numerals |
| `--line` | `#d8d0c0` | hairline borders |
| `--line-soft` | `#e4ddce` | lighter inner borders |
| `--accent` | `#9c6850` | sienna — links, hover |
| `--art-shadow` | `rgba(40,30,20,.18)` | detail artwork shadow |
| `--ph-stroke` | `rgba(120,105,80,.16)` | placeholder inner border |
| `--ph-fill` | `rgba(120,105,80,.05)` | placeholder hatch lines |

### Colors — Dark theme
| Token | Hex |
|---|---|
| `--paper` | `#191613` |
| `--paper-2` | `#211d18` |
| `--paper-deep` | `#15120f` |
| `--ink` | `#ece4d6` |
| `--ink-soft` | `#a59a88` |
| `--ink-faint` | `#6f6555` |
| `--line` | `#352f27` |
| `--line-soft` | `#2a251e` |
| `--accent` | `#c89272` |
| `--art-shadow` | `rgba(0,0,0,.55)` |
| `--ph-stroke` | `rgba(210,195,170,.14)` |
| `--ph-fill` | `rgba(210,195,170,.045)` |

Body background behind the site wrapper: `#0c0a08`. Theme transition: `background .5s, color .5s ease`.

### Typography
- **Display**: 'Cormorant Garamond' (weights 400/500/600, italics) — headings, titles, signatures, spec values.
- **Body**: 'EB Garamond' (400/500, italic) — descriptions, notes, paragraphs.
- **Mono**: 'IBM Plex Mono' (400/500) — eyebrows, overlines, labels, nav. Always uppercase with wide letter-spacing (.1em–.34em).
- Google Fonts import string: `Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=EB+Garamond:ital,wght@0,400;0,500;1,400&family=IBM+Plex+Mono:wght@400;500`
- Key sizes: rail h1 56px · gallery title 36px italic · detail h2 78px · about lede 34px italic · body notes 18–21px · overlines/labels 10–11px.

### Placeholder treatment (for drawings without an image)
- Background `--paper-deep` + 45° repeating-linear-gradient hatch using `--ph-fill` (transparent 0–11px, fill 11–12px).
- Inset 14px 1px border in `--ph-stroke` (via `::after`).
- Centered mono label, lowercase: `"{medium} · {dimensions}"`.

### Spacing / radii / shadows
- Rail width 330px; content padding 60px 64px; entry gap 30px; section gaps 34–60px.
- Theme toggle pill: border-radius 999px; active button radius 999px.
- Frames: no border radius (sharp gallery edges).
- Detail artwork shadow: `0 30px 60px var(--art-shadow)`.
- Responsive breakpoint: **980px**.

## Assets
- `assets/portrait-01.jpg` — graphite portrait ("Reverie"), 1354×1806 (3:4). Used as drawing 01 and the About portrait. **User-provided.**
- `assets/figure-braid.jpg` — graphite figure with braid ("Looking Away"). Used as drawing 02. **User-provided.**
- All other works (Morning Wash, Hands, Gotland I, Stillhet) are **placeholders** — no image; they render the hatched placeholder. Swap in real scans by adding an `img` path to those `WORKS` entries.
- Fonts: Google Fonts (Cormorant Garamond, EB Garamond, IBM Plex Mono) — self-host in production for performance/offline.
- No icon library; the only "icons" are text arrows (←, →).

## Copy Notes
- Artist statement, the signature "— from the studio, Gothenburg", and the enquiries email `studio@sketchesfromsweden.se` are **placeholder copy** — confirm real values with the artist before launch.
- Location is **Gothenburg, Sweden** throughout.

## Files
- `index.html` — app shell: all CSS (theme tokens, layout, components, responsive), Google Fonts link, React/Babel CDN script tags, and the bundler-thumbnail template. The single source of styling truth.
- `portfolio.jsx` — all React components and the `WORKS` data:
  - `Frame` — image-or-placeholder renderer
  - `ThemeToggle` — light/dark pill
  - `Home` / `WorkBody` / `AboutBody` — gallery + about
  - `Detail` — immersive detail view
  - `App` — state, keyboard handlers, localStorage theme persistence
- `assets/portrait-01.jpg`, `assets/figure-braid.jpg` — the two real drawings.

> Note: the prototype transpiles JSX in the browser via CDN Babel. For production, set up a real build (Vite/Next), precompile, self-host fonts, bundle the images, and introduce real routing for `/`, `/about`, and per-drawing URLs.

## Screenshots (visual reference)
The `screenshots/` folder contains the design in every view × theme, at 1440px wide:
- `01-gallery-light.png` — Sketchbook gallery (home), light
- `02-detail-light.png` — Immersive artwork detail, light
- `03-detail-dark.png` — Immersive artwork detail, dark
- `04-gallery-dark.png` — Sketchbook gallery (home), dark
- `05-about-dark.png` — About page, dark
- `06-about-light.png` — About page, light

Use these as the visual source of truth alongside the token tables above.
