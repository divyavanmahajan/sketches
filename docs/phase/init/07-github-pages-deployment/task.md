# 07 — GitHub Pages Deployment

## Goal
Deploy the site to GitHub Pages and confirm it loads correctly at the public URL with all content and paths resolving.

## Context
GitHub Pages serves the repo root from the `main` branch with no build step. The main risk is path resolution: the site is served at `https://divyavanmahajan.github.io/sketches/`, so all `fetch()` calls and asset `src` values must be relative to work under the subdirectory prefix. This was enforced throughout implementation (Core Belief #7) — this step verifies it end-to-end.

## Prerequisites
- Steps 01–06 (full implementation complete)

## Tasks

1. Confirm the repo is public on GitHub (or that the account has a paid plan for private Pages).

2. In the GitHub repo: go to **Settings → Pages → Build and deployment → Source**, select **Deploy from a branch**, branch `main`, folder `/ (root)`. Save.

3. Wait for Pages to activate (usually under a minute). The URL will be shown in Settings → Pages: `https://divyavanmahajan.github.io/sketches/`.

4. Open the Pages URL in a browser and verify:
   - The gallery loads with all works and correct images.
   - The About page loads with correct content.
   - The Help page is reachable and all sections are present.
   - Theme toggle works and persists on reload.
   - Keyboard navigation works (arrow keys in detail, Escape back).
   - Detail view opens and prev/next paging works.

5. Verify the GitHub Action runs correctly end-to-end on the live repo:
   - Edit `content/works-new.yaml` in the GitHub UI (e.g. change a note field) and commit.
   - Confirm the Action runs in the Actions tab and succeeds.
   - Confirm `works.yaml` is updated and the site reflects the change within ~30 seconds.

6. Verify the error flow end-to-end:
   - Edit `content/works-new.yaml` to introduce a deliberate YAML syntax error and commit.
   - Confirm the Action runs and writes to `works-error.txt`.
   - Open Help → Troubleshooting on the site and confirm the error message appears.
   - Fix the staging file, commit, confirm the error clears and the update goes live.

7. If the repo name creates a subdirectory prefix, double-check that all `fetch()` paths, image `src` attributes, and the Babel/js-yaml CDN script tags all resolve correctly. (CDN scripts are absolute and always resolve. Relative `fetch()` paths should resolve correctly if they use `./` prefix.)

## Acceptance Criteria
- Site is publicly accessible at the GitHub Pages URL.
- All content loads correctly (no broken images, no "undefined" text, no console errors).
- A valid edit to `works-new.yaml` goes live on the site within ~60 seconds of committing.
- An invalid edit causes a readable error to appear in Help → Troubleshooting.
- No absolute paths or hardcoded hostnames in `index.html` or `portfolio.jsx`.

## Notes
- GitHub Pages can take 1–10 minutes to fully activate on first setup; subsequent deploys are faster (under a minute).
- If images appear broken on Pages but work locally, the cause is almost always a path issue — check that image `src` values use `./content/images/` not `/content/images/` (the latter is absolute from the domain root, which breaks under a subdirectory).
- The `deploy/` folder is a pre-existing mirror of the prototype and is not used for Pages deployment — Pages serves the repo root.
