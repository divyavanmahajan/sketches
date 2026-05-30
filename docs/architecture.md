# Architecture

## Stack

No build step. React 18 + Babel Standalone loaded from CDN; JSX is transpiled in the browser. To run: open `index.html` directly, or `npx serve .` / `python3 -m http.server 8080`.

## Files

| File | Role |
|---|---|
| `index.html` | App shell — all CSS (tokens, layout, components, responsive), Google Fonts, CDN script tags |
| `portfolio.jsx` | All React components + static `WORKS` data |
| `deploy/` | Deployment-ready mirror — replicate changes here when updating the prototype |

## Component tree

```
App  (theme, view, page state)
├── ThemeToggle
├── Home
│   ├── WorkBody      gallery entries
│   └── AboutBody     bio + facts table
└── Detail            immersive artwork view + keyboard nav
    └── Frame         aspect-ratio-aware image or hatched placeholder
```

## View system

Client-side state switching, no router. Three views controlled by `view: { name: 'home'|'detail', index }` and `page: 'work'|'about'`:

- **Home / Work** — 330px sticky left rail + fluid gallery grid
- **Home / About** — same rail, bio + facts panel
- **Detail** — full-viewport artwork + metadata, prev/next paging

View transitions: 0.5s opacity fade via `.view-fade` wrapper (keyed on `view.name + index + page`).

## Data model

Content flows through a staging → live promotion pattern:

| File | Written by | Purpose |
|---|---|---|
| `content/works-new.yaml` | Artist | Staging — she edits this |
| `content/about-new.yaml` | Artist | Staging — she edits this |
| `content/works.yaml` | GitHub Action only | Live — site reads this |
| `content/about.yaml` | GitHub Action only | Live — site reads this |
| `content/works-error.txt` | GitHub Action only | Plain-English error; empty when valid |
| `content/about-error.txt` | GitHub Action only | Plain-English error; empty when valid |
| `content/images/` | Artist | Artwork image files |

The site fetches `works.yaml` and `about.yaml` at runtime via `fetch()` and parses with js-yaml (CDN). The Help → Troubleshooting section fetches the two `.txt` error files on demand and displays them verbatim.

Each work entry: `{ title, year?, medium?, dimensions?, place?, image?, note? }`. Works without `image` render a hatched placeholder.

## GitHub Action

`.github/workflows/promote-content.yml` — triggers on push to `main` when either staging file changes. Python script at `.github/scripts/validate-yaml.py` processes all staging files with `yaml.safe_load()`. On success: copies to live file, clears error file. On failure: writes plain-English error to `.txt` file, leaves live file unchanged. Commits back with `[skip ci]` to avoid re-triggering.

## Component tree (current)

```
App  (theme, view, page state + works/about/loading/error state)
├── ThemeToggle
├── Home
│   ├── WorkBody      gallery entries (receives works[])
│   ├── AboutBody     bio + facts (receives about{}, portrait=works[0])
│   └── HelpBody      instructions + live troubleshooting (fetches error files)
│       └── Frame     aspect-ratio-aware image or hatched placeholder
└── Detail            immersive artwork view (receives works[])
    └── Frame
```

## Theme system

CSS custom properties on `[data-theme="light"|"dark"]`, set as a `data-theme` attribute on `.site`. Persisted to `localStorage` key `sfs-theme`. All tokens live in `index.html`'s `<style>` block.

## Responsive

Single breakpoint at **980px** — gallery and detail layouts both collapse to single column.

## Keyboard navigation

Arrow keys (prev/next in detail), Escape (back to gallery), Enter/Space (open entry).
