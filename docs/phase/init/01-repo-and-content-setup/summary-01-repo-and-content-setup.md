# Summary: Repo & Content Setup

## Completed
2026-05-30

## Goal
Create the content directory structure, populate the initial YAML files from the existing hardcoded data, and add js-yaml to index.html.

## What Was Built
- `content/images/` — artwork images copied from `assets/`
- `content/works-new.yaml` — staging file with all 6 works migrated from hardcoded WORKS array, using full field names (title, year, medium, dimensions, place, image, note)
- `content/about-new.yaml` — staging file with About copy (lede, bio paragraphs, facts) from hardcoded AboutBody
- `content/works.yaml` — initial live copy (identical to works-new.yaml)
- `content/about.yaml` — initial live copy (identical to about-new.yaml)
- `content/works-error.txt` — empty, signals no error
- `content/about-error.txt` — empty, signals no error
- `index.html` — js-yaml 4.x CDN tag added before React scripts

## Key Decisions
- Year values quoted as strings in YAML (`"2025"`) to avoid integer coercion ambiguity at the source.
- Images remain in `content/images/`; the YAML `image` field stores only the filename (no path prefix). The path prefix (`./content/images/`) will be applied at runtime in Step 02.

## Deviations
None.

## Files Changed
- `content/works-new.yaml` (created)
- `content/works.yaml` (created)
- `content/about-new.yaml` (created)
- `content/about.yaml` (created)
- `content/works-error.txt` (created, empty)
- `content/about-error.txt` (created, empty)
- `content/images/portrait-01.jpg` (copied)
- `content/images/figure-braid.jpg` (copied)
- `index.html` (js-yaml CDN tag added)
