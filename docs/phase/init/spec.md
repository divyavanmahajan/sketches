# Sketches from Sweden — Init Phase Specification

## Overview

Convert the existing design-handoff prototype into a production-ready static site hosted on GitHub Pages. The artist edits staging YAML files (`works-new.yaml`, `about-new.yaml`) in the GitHub UI. A GitHub Action validates each commit: if valid, it promotes the file to the live version; if invalid, it writes a plain-English error file back to the repo. A troubleshooting section on the Help page fetches and displays the error file so she knows exactly what to fix.

## Problem Statement

The current prototype has all artwork data hardcoded in `portfolio.jsx`. The artist — a novice GitHub user — cannot add, remove, or reorder works without editing code. She needs a single, safe place to manage content where mistakes can never corrupt the live site, with clear guidance when something goes wrong.

## Goals

- Artist edits a staging file; the live site only updates when the YAML is valid.
- A YAML mistake never breaks the live site — the old content stays until a valid edit is committed.
- Errors are written back to the repo in plain English; the troubleshooting section on the Help page surfaces them directly.
- Artist can add, change, reorder, and remove works, and update the About page, all via YAML — no code changes.
- A Help page gives step-by-step task instructions and a troubleshooting section written for a GitHub novice.
- Site is deployed and publicly accessible via GitHub Pages.

## Non-Goals

- CMS or admin UI (no login, no form interface).
- Image optimisation or CDN.
- Authentication or access control.
- Multi-user editing or conflict resolution.
- Validating image file existence in the GitHub Action (image 404s fall back to placeholder silently at runtime).

## Users & Context

**The artist** — primary and only editor. Comfortable navigating GitHub in a browser, editing simple text files, and uploading image files via the GitHub UI. Not a developer; should never need to touch `.jsx`, `.html`, or workflow files.

## Staging vs Live File Pattern

| File | Who writes it | Purpose |
|---|---|---|
| `content/works-new.yaml` | Artist (edits in GitHub UI) | Staging — what she edits |
| `content/about-new.yaml` | Artist (edits in GitHub UI) | Staging — what she edits |
| `content/works.yaml` | GitHub Action only | Live — what the site reads |
| `content/about.yaml` | GitHub Action only | Live — what the site reads |
| `content/works-error.txt` | GitHub Action only | Error report for works; empty when no error |
| `content/about-error.txt` | GitHub Action only | Error report for about; empty when no error |

The artist **never edits** the live `.yaml` files or the `.txt` error files directly.

## Requirements

### Functional Requirements

**Site (runtime)**

1. On load, the site fetches `content/works.yaml` and `content/about.yaml` via `fetch()`.
2. Both files are parsed with js-yaml (CDN). Parse errors are caught; if either file is unparseable the affected view shows a fallback message (this should rarely happen since the Action guards promotion).
3. Works are rendered in the order they appear in `works.yaml`.
4. Each work entry supports: `title`, `year`, `medium`, `dimensions`, `place`, `image` (filename only), `note`. All fields except `title` are optional.
5. If `image` is omitted or the file is not found, the existing hatched placeholder is shown.
6. About page content is driven by `about.yaml`: `lede`, `bio` (list of paragraphs), `facts` (list of `{label, value}` pairs).
7. A Help view is accessible from the site nav.
8. The Help view has a **Troubleshooting** section that fetches `content/works-error.txt` and `content/about-error.txt` on demand and displays their contents verbatim. If both files are empty (or absent), shows "No errors — your last update was successful."
9. All existing interactions (theme toggle, keyboard navigation, view transitions) are preserved.

**GitHub Action**

10. The Action triggers on any push to `main` that touches `content/works-new.yaml` or `content/about-new.yaml`.
11. For each changed staging file, the Action attempts to parse it with a YAML validator (Python `pyyaml` or Node `js-yaml` — whichever is simpler in the workflow).
12. If valid: copy the staging file over the corresponding live file (`works.yaml` / `about.yaml`), clear the corresponding error file (write empty string), commit and push.
13. If invalid: write a plain-English error message to the corresponding error file (`works-error.txt` / `about-error.txt`), commit and push. The live file is left unchanged.
14. The Action commit message is `"content: promote works"` or `"content: promote about"` (or `"content: validation error — works"` on failure) so the history is readable.
15. The Action must not trigger on its own commits (use `[skip ci]` tag or check commit author).

### Non-Functional Requirements

- **Safe promotion**: the live `.yaml` files are only ever written by the Action, never by the artist directly.
- **Error clarity**: error file content names the staging file, gives the line/column if available, describes the problem in plain English, and tells her what to fix (e.g. *"Line 14 in works-new.yaml: mapping values are not allowed here. Check that every field name is followed by a colon and a space."*).
- **No regressions**: visual design, color tokens, typography, and responsive behaviour are unchanged from the design handoff spec.
- **Forgiving runtime**: a missing optional field never crashes the app; the entry renders with that field absent.
- **Performance**: YAML files are small; no lazy loading needed. Images load natively.

## Architecture

| Concern | Solution |
|---|---|
| Hosting | GitHub Pages (serves repo root, `main` branch) |
| UI framework | React 18 + Babel Standalone (CDN, existing) |
| YAML parsing (runtime) | js-yaml 4.x (CDN) |
| Data fetching | `fetch()` on app mount |
| Live content files | `content/works.yaml`, `content/about.yaml` |
| Staging files | `content/works-new.yaml`, `content/about-new.yaml` |
| Error files | `content/works-error.txt`, `content/about-error.txt` |
| Images | `content/images/` directory in repo |
| Validation + promotion | GitHub Actions workflow (`.github/workflows/promote-content.yml`) |

The `App` component fetches `works.yaml` and `about.yaml` in parallel on mount. The Troubleshooting section of Help fetches the two error files only when that section is viewed (lazy, on demand).

## GitHub Action Design

`.github/workflows/promote-content.yml`

```
Trigger: push to main, paths: content/works-new.yaml, content/about-new.yaml

Steps:
1. Checkout repo (with write token)
2. For each staging file that changed:
   a. Try parsing with pyyaml (strict mode)
   b. If success:
      - Copy staging → live file
      - Overwrite error file with empty string
   c. If failure:
      - Write plain-English error message to error file
      - Leave live file untouched
3. If any file was written: git add, git commit "[skip ci] content: promote/error", git push
```

Use `actions/checkout` with `token: ${{ secrets.GITHUB_TOKEN }}` and `persist-credentials: true`. Set git user to `github-actions[bot]`.

## Deployment

1. Repo → **Settings → Pages → Source**: Deploy from branch → `main` / `/ (root)`.
2. Site is live at `https://divyavanmahajan.github.io/sketches/`.
3. All `fetch()` paths must be relative (e.g. `./content/works.yaml`) so they resolve correctly under the Pages subdirectory.
4. No separate build step — Pages serves files directly from `main`.

## User Flows

### Add a new sketch
1. Go to the repo on GitHub.
2. Navigate to `content/images/`, click **Add file → Upload files**, upload the scan.
3. Navigate to `content/works-new.yaml`, click the pencil (Edit) icon.
4. Add a new entry block at the desired position in the list.
5. Click **Commit changes**.
6. Wait ~30 seconds for the Action to run. The live site updates automatically if the YAML was valid.

### Change an existing sketch
1. Open `content/works-new.yaml` in GitHub, click Edit.
2. Find the entry by title, update the relevant field(s).
3. Commit changes and wait for the Action.

### Remove a sketch
1. Open `content/works-new.yaml`, delete the entire entry block for that work.
2. Commit. (The image file can be deleted separately from `content/images/` if desired.)

### Reorder sketches
1. Open `content/works-new.yaml`, cut an entry block and paste it at the new position.
2. Commit.

### Update the About page
1. Open `content/about-new.yaml`, edit the relevant field(s).
2. Commit and wait for the Action.

### Troubleshoot a failed update
1. Open the site and go to **Help → Troubleshooting**.
2. The section shows the content of the error files. Read the message — it names the file and describes the problem.
3. Go back to `content/works-new.yaml` (or `about-new.yaml`) in GitHub and fix the issue described.
4. Commit again. The Action re-runs; if valid, the live site updates and the error clears.

## YAML File Schemas

### `content/works-new.yaml` (artist edits this)

```yaml
- title: Reverie
  year: 2024
  medium: Graphite on paper
  dimensions: 29.7 × 42 cm
  place: Gothenburg
  image: portrait-01.jpg
  note: A quiet study of stillness.

- title: Looking Away
  year: 2023
  medium: Graphite on paper
  dimensions: 21 × 29.7 cm
  place: Gothenburg
  image: figure-braid.jpg
  note: Figure with braid, afternoon light.
```

### `content/about-new.yaml` (artist edits this)

```yaml
lede: Drawing is how I pay attention.

bio:
  - First paragraph of artist statement here.
  - Second paragraph here.

facts:
  - label: Based in
    value: Gothenburg, Sweden
  - label: Media
    value: Graphite, watercolour
  - label: Working since
    value: "2019"
  - label: Enquiries
    value: studio@sketchesfromsweden.se
```

## Edge Cases & Error Handling

| Situation | Behaviour |
|---|---|
| YAML syntax error in staging file | Action writes plain-English error to `.txt` file; live file unchanged; Help → Troubleshooting shows the message |
| Valid YAML committed | Action promotes to live file, clears error file |
| Artist edits live `.yaml` directly | Discouraged (documented in Help). Action will not overwrite it unless the staging file also changes. |
| Both staging files changed in one commit | Action processes both independently |
| Missing optional field in YAML | Entry renders without that field — no crash |
| `image` filename not found at runtime | Hatched placeholder shown silently |
| Empty `works-new.yaml` (empty list) | Valid — Action promotes it; gallery shows "No works yet" |
| Network failure fetching YAML at runtime | Affected view shows "Couldn't load content — check your connection and refresh" |
| Extra unknown fields in YAML | pyyaml loads without error; runtime ignores unknown keys |
| `year` value unquoted integer | Valid — pyyaml and js-yaml both accept; code coerces to string for display |
| Error files absent (fresh repo) | Troubleshooting section treats missing file as no error |

## Help Page Content

Accessible from the main nav as "Help". Sections:

- **How this site works** — two staging files control content; changes go live after a short validation step; images live in `content/images/`.
- **Add a new sketch** — step-by-step with GitHub UI descriptions, including the wait for the Action.
- **Change a sketch** — how to find and edit an entry in `works-new.yaml`.
- **Remove a sketch** — delete the entry block; optional image cleanup.
- **Change the order** — cut/paste entry blocks.
- **Update the About page** — edit `about-new.yaml`.
- **Troubleshooting** — live section that fetches and displays `works-error.txt` and `about-error.txt`. If both are empty: "No errors — your last update was successful." Explains how to read an error message and re-edit the staging file to fix it.
- **YAML quick reference** — minimal cheat sheet: entry structure, how lists work, when to quote values, common mistakes (missing space after colon, wrong indentation).

## Constraints & Assumptions

- GitHub repo is public (GitHub Pages free tier requires this, or a paid plan for private).
- Image files are reasonably sized (< 20MB each); no optimisation step needed.
- Artist uses the GitHub web UI only — no local git tooling.
- `GITHUB_TOKEN` has write access to commit back to `main` (default for public repos with Actions enabled).
- pyyaml is available in the `ubuntu-latest` Actions runner without additional install.
- The existing visual design is the source of truth; no design changes in this phase.

## Testing

Manual testing checklist:

**GitHub Action**
- [ ] Committing a valid `works-new.yaml` promotes it to `works.yaml` and clears `works-error.txt`
- [ ] Committing a valid `about-new.yaml` promotes it to `about.yaml` and clears `about-error.txt`
- [ ] Committing an invalid `works-new.yaml` writes a plain-English message to `works-error.txt` and leaves `works.yaml` unchanged
- [ ] Committing an invalid `about-new.yaml` writes to `about-error.txt` and leaves `about.yaml` unchanged
- [ ] Action commit does not re-trigger itself (`[skip ci]`)

**Site**
- [ ] Valid `works.yaml` renders all entries in correct order
- [ ] Valid `about.yaml` populates About view correctly
- [ ] Missing `image` field shows placeholder
- [ ] Missing optional fields render without errors
- [ ] Empty `works.yaml` shows "No works yet" message
- [ ] Help → Troubleshooting shows error message when `works-error.txt` has content
- [ ] Help → Troubleshooting shows "No errors" when both error files are empty or absent
- [ ] Help page is reachable from nav and all sections are present
- [ ] Theme toggle, keyboard navigation, and view transitions still work
- [ ] Site loads correctly when served from a GitHub Pages subdirectory path

## Open Questions

- Should the Help page be a separate view within the React app, or a standalone `help.html`? (Recommendation: a view within the app, consistent with existing nav.)

## Resolved
- **Pages URL:** `https://divyavanmahajan.github.io/sketches/`
- **About copy:** use existing content from the design handoff prototype as-is
- **Notifications:** artist does not use GitHub notifications. Help → Troubleshooting is her only feedback channel — the "How this site works" section must explicitly tell her to check it if an update doesn't appear within ~30 seconds.

## Success Metrics

- Artist can add a new work from scratch (upload image + edit staging YAML) in under 5 minutes.
- A YAML mistake never corrupts the live site.
- The error message in Help → Troubleshooting is clear enough for her to fix the problem on her first attempt.
- Site loads and is fully functional at the GitHub Pages URL.
