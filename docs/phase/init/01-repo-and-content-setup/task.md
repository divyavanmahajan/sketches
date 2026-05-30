# 01 — Repo & Content Setup

## Goal
Create the content directory structure, populate the initial YAML files from the existing hardcoded data, and add js-yaml to `index.html`.

## Context
All artwork data and About copy currently lives hardcoded in `portfolio.jsx`. This step creates the file layout the rest of the implementation depends on — the `content/` directory with staging files, live files, error files, and the images folder. It also wires in the js-yaml CDN dependency.

## Prerequisites
None — this is the foundation step.

## Tasks

1. Create `content/images/` directory. Move `assets/portrait-01.jpg` and `assets/figure-braid.jpg` into it (update any existing references in `portfolio.jsx` and `index.html` to point to `./content/images/`).

2. Create `content/works-new.yaml` with the six existing works migrated from the `WORKS` array in `portfolio.jsx`. Use the full field names from the spec schema (`title`, `year`, `medium`, `dimensions`, `place`, `image`, `note`). Works without images omit the `image` field.

3. Create `content/works.yaml` with identical content to `works-new.yaml` (this is the initial live version).

4. Create `content/about-new.yaml` with the existing About copy migrated: `lede`, `bio` (list of paragraphs), `facts` (list of `{label, value}` pairs matching the current facts table).

5. Create `content/about.yaml` with identical content to `about-new.yaml`.

6. Create `content/works-error.txt` as an empty file.

7. Create `content/about-error.txt` as an empty file.

8. In `index.html`, add the js-yaml CDN script tag before the `portfolio.jsx` script tag:
   ```html
   <script src="https://cdn.jsdelivr.net/npm/js-yaml@4/dist/js-yaml.min.js"></script>
   ```

## Acceptance Criteria
- `content/` directory exists with: `works-new.yaml`, `works.yaml`, `about-new.yaml`, `about.yaml`, `works-error.txt`, `about-error.txt`, `images/portrait-01.jpg`, `images/figure-braid.jpg`.
- Both `*-new.yaml` and live `.yaml` files are valid YAML containing all six existing works and the full About content.
- `jsyaml` is available as a global in the browser console after loading `index.html` (served via local HTTP, not `file://`).
- Existing image references in the prototype still resolve (images display correctly).

## Notes
- Serve locally with `npx serve .` or `python3 -m http.server 8080` — never open as `file://` since `fetch()` calls will be blocked.
- The `deploy/` directory is a mirror of the prototype. Do not update it in this phase.
- `content/works-error.txt` and `content/about-error.txt` must exist as files (even if empty) so the `fetch()` in the Troubleshooting section returns 200 rather than 404 on a clean state. An empty file is the "no error" signal.

## External References
- `docs/references/js-yaml-reference.txt` — consult for CDN URL and available globals before adding the script tag.
