# Phase Summary: Init

## Completed
2026-05-30

## What Was Built
The design-handoff prototype has been converted into a self-manageable static site ready for GitHub Pages. The artist edits two YAML staging files in the GitHub UI; a GitHub Action validates and promotes them to live on each commit, or writes a plain-English error file if validation fails. A Help view inside the site gives task-oriented instructions for every editing task, and a Troubleshooting section fetches and displays any error file live — the artist's only feedback channel since she does not use GitHub notifications.

## Key Architectural Decisions
- **Staging → live promotion pattern**: artist edits `*-new.yaml`; GitHub Action (pyyaml) writes `*.yaml` (live) only on success. Live files are never edited directly.
- **Error files as the feedback channel**: `works-error.txt` / `about-error.txt` are committed back to the repo by the Action and fetched by the browser's Troubleshooting section. No email, no GitHub UI required.
- **No build step**: site remains purely static CDN React + Babel. js-yaml 4.x added as CDN dependency for runtime YAML parsing.
- **RATIOS array dropped**: Frame component defaults to `3/4` aspect ratio. Artists do not need to specify ratios in YAML.
- **Portrait from works data**: AboutBody receives `works[0]` as its portrait, preserving the design without hardcoding.

## Folder Structure Changes
```
content/
  works-new.yaml       ← artist edits this
  about-new.yaml       ← artist edits this
  works.yaml           ← Action writes this (live)
  about.yaml           ← Action writes this (live)
  works-error.txt      ← Action writes this on error
  about-error.txt      ← Action writes this on error
  images/
    portrait-01.jpg
    figure-braid.jpg
.github/
  workflows/promote-content.yml
  scripts/validate-yaml.py
```

## How to Run / Test
```bash
# Serve locally (required — fetch() blocked on file://)
npx serve .
# or
python3 -m http.server 8080
```
Then open `http://localhost:8080`.

To test GitHub Pages: push `phase/init` to GitHub, merge to `main`, enable Pages (Settings → Pages → main / root).

Live URL: `https://divyavanmahajan.github.io/sketches/`

## Steps Completed
- [01 — Repo & Content Setup](./01-repo-and-content-setup/summary-01-repo-and-content-setup.md)
- [02 — Runtime YAML Loading](./02-runtime-yaml-loading/summary-02-runtime-yaml-loading.md)
- [03 — Edge Cases & Error Handling](./03-edge-cases-and-error-handling/summary-03-edge-cases-and-error-handling.md)
- [04 — GitHub Action](./04-github-action/summary-04-github-action.md)
- [05 — Help View](./05-help-view/summary-05-help-view.md)
- [06 — Troubleshooting Section](./06-troubleshooting-section/summary-06-troubleshooting-section.md)
- [07 — GitHub Pages Deployment](./07-github-pages-deployment/summary-07-github-pages-deployment.md)
- [08 — Manual Testing](./08-manual-testing/summary-08-manual-testing.md)
