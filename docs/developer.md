> **Initial draft** — scaffolded from spec interview. Updated by spec-execute as each phase completes.

# Developer Guide

## Tech Stack

| Concern | Technology |
|---|---|
| Hosting | GitHub Pages (static, no build) |
| UI | React 18.3.1 (CDN UMD) |
| JSX transpilation | Babel Standalone 7.x (CDN, browser-side) |
| YAML parsing | js-yaml 4.x (CDN) |
| Styling | Vanilla CSS, CSS custom properties |
| Fonts | Google Fonts (Cormorant Garamond, EB Garamond, IBM Plex Mono) |

## Running Locally

No install required. Serve the repo root over HTTP:

```bash
npx serve .
# or
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

**Do not open `index.html` as a `file://` URL** — `fetch()` calls for YAML files will be blocked by the browser's same-origin policy.

## Lint / Format

No automated linting configured (no build step). Code style follows the existing `portfolio.jsx` conventions — no semicolons, 2-space indent, single quotes.

## Content Files

| File | Purpose |
|---|---|
| `content/works.yaml` | Ordered list of artworks |
| `content/about.yaml` | About page content |
| `content/images/` | Artwork image files |

## Deploying to GitHub Pages

1. Repo → **Settings → Pages → Source**: Deploy from branch → `main` / `/ (root)`.
2. Site goes live at `https://divyavanmahajan.github.io/sketches/`.
3. Every commit to `main` is reflected immediately (no build; Pages serves files directly).

## Environment Variables

None. No secrets, no API keys, no `.env` files.
