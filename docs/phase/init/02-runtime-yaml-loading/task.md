# 02 — Runtime YAML Loading

## Goal
Replace the hardcoded `WORKS` array and About copy in `portfolio.jsx` with data fetched and parsed at runtime from `content/works.yaml` and `content/about.yaml`.

## Context
The site currently has all content baked into `portfolio.jsx`. This step makes the `App` component fetch both YAML files on mount and feed the parsed data down to the existing components. The visual output must be identical to the current prototype once loaded.

## Prerequisites
- Step 01 (content files and js-yaml CDN must exist)

## Tasks

1. In `App`, add state for the loaded data and loading status:
   - `works`: array (initially `null`)
   - `about`: object (initially `null`)
   - `loading`: boolean (initially `true`)
   - `worksError`: string or null
   - `aboutError`: string or null

2. On mount (`useEffect`), fetch `./content/works.yaml` and `./content/about.yaml` in parallel using `Promise.all`. For each response:
   - Read as text
   - Parse with `jsyaml.load(text)`
   - On success: store the parsed value in state
   - On `jsyaml.YAMLException`: store a human-readable message in the corresponding error state (include filename and `e.message`)
   - On network error: store a "Couldn't load content — check your connection and refresh" message

3. While `loading` is true, render a minimal loading state (e.g. a centred mono text "Loading…" in `--ink-soft`) instead of the full app.

4. Pass `works` and `about` as props down to `WorkBody`, `AboutBody`, and `Detail`, replacing all reads from the hardcoded `WORKS` / `RATIOS` arrays and inline About strings.

5. The `WORKS`, `RATIOS`, and hardcoded About copy in `portfolio.jsx` can be removed once all components consume props instead.

6. Map the YAML field names to the existing component expectations:
   - `title` → was `t`
   - `year` → was `y`
   - `medium` → was `m`
   - `dimensions` → was `d`
   - `image` → was `img` (prepend `./content/images/` to the filename)
   - `note` → was `note`
   - `place` → was `place`
   - Aspect ratios (`RATIOS`) are no longer pre-declared — derive from image natural dimensions on load, or default to `3/4` if unknown.

7. If `worksError` is set, render an error panel in the gallery area instead of `WorkBody`. If `aboutError` is set, render an error panel in the About content area. The panel should display the error message clearly. (Edge cases and polish are handled in step 03.)

## Acceptance Criteria
- Site loads and displays all six works with correct metadata, identical to the current prototype.
- About page shows the correct lede, bio paragraphs, and facts table sourced from `about.yaml`.
- Removing an entry from `works.yaml` and reloading removes it from the gallery.
- Adding a new entry to `works.yaml` and reloading shows it in the gallery.
- The hardcoded `WORKS` array is gone from `portfolio.jsx`.

## Notes
- `jsyaml.load()` returns `null` for an empty file — treat this the same as an empty array for works, and as an empty object for about.
- Image paths must be prepended at runtime: `./content/images/${entry.image}` — never hardcode the full path in the YAML.
- Aspect ratios: the simplest approach is to remove the parallel `RATIOS` array and let `Frame` infer ratio from the image's natural dimensions (or fall back to `3/4`). This avoids requiring the artist to specify ratios in YAML.
- Keep all existing CSS classes and DOM structure intact — this step changes data flow only, not markup or styles.

> ⚠ **Core Belief #7 — Relative paths everywhere:** All `fetch()` calls and image `src` values must use relative paths (e.g. `./content/works.yaml`, `./content/images/portrait-01.jpg`). Never use absolute paths or hardcoded hostnames.

## External References
- `docs/references/js-yaml-reference.txt` — `jsyaml.load()` API and `YAMLException` error shape.
