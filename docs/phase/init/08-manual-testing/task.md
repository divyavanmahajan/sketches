# 08 — Manual Testing

## Goal
Verify the complete implementation against the spec's testing checklist before considering the phase done.

## Context
There are no automated tests — the site has no build step. This step is a structured manual pass covering the GitHub Action, site rendering, edge cases, and the full Help/Troubleshooting flow.

## Prerequisites
- All steps 01–07 complete, site live on GitHub Pages.

## Tasks

Work through each checklist item. Note any failures and return to the relevant step to fix.

### GitHub Action

- [ ] Committing a valid `works-new.yaml` promotes it to `works.yaml` within ~30 seconds
- [ ] Committing a valid `works-new.yaml` clears `works-error.txt`
- [ ] Committing a valid `about-new.yaml` promotes it to `about.yaml` within ~30 seconds
- [ ] Committing a valid `about-new.yaml` clears `about-error.txt`
- [ ] Committing an invalid `works-new.yaml` writes a plain-English message to `works-error.txt`
- [ ] Committing an invalid `works-new.yaml` leaves `works.yaml` unchanged
- [ ] Committing an invalid `about-new.yaml` writes to `about-error.txt` and leaves `about.yaml` unchanged
- [ ] Changing both staging files in one commit processes both independently
- [ ] The Action's commit does not re-trigger the workflow (check Actions tab — no second run)
- [ ] Error message in `works-error.txt` names the file, gives line/column (if available), and includes a plain-English "what to do" instruction

### Site — Content rendering

- [ ] Gallery shows all works in the order they appear in `works.yaml`
- [ ] Each work displays correct title, year, medium, dimensions, place, note
- [ ] Works with images show the correct image; works without show the hatched placeholder
- [ ] About page shows correct lede, bio paragraphs, and facts table
- [ ] Removing an entry from `works.yaml` (via a valid staging edit) removes it from the gallery
- [ ] Reordering entries in `works.yaml` reorders them in the gallery

### Site — Edge cases

- [ ] A work entry with only `title` (all other fields absent) renders without errors or "undefined" text
- [ ] An empty `works.yaml` (empty list) shows "No works yet — check back soon."
- [ ] A work with an `image` filename that doesn't exist shows the hatched placeholder (test with devtools → Network → block the image URL)
- [ ] A work with `year: 2024` (unquoted integer) renders "2024" correctly
- [ ] A work with extra unknown fields renders normally

### Site — Help & Troubleshooting

- [ ] "03 Help" appears in the left rail nav and opens the Help view
- [ ] All seven sections are present and readable (How it works, Add, Change, Remove, Reorder, About, YAML reference, Troubleshooting)
- [ ] With both error files empty: "No errors — your last update was successful." is shown
- [ ] With a non-empty `works-error.txt`: the error text appears verbatim in a mono pre block
- [ ] With a non-empty `about-error.txt`: it appears under "About update error"
- [ ] The Refresh button re-fetches without a full page reload
- [ ] A 404 on an error file (delete it temporarily) is treated as "no error"

### Site — Existing interactions

- [ ] Theme toggle switches between light and dark; preference persists on page reload
- [ ] Clicking a gallery entry opens the Detail view for that work
- [ ] Arrow keys navigate prev/next in Detail; Escape returns to gallery
- [ ] Enter/Space on a focused gallery entry opens it
- [ ] "← All work" in Detail returns to the gallery
- [ ] Detail pager wraps around (last → first, first → last)
- [ ] Responsive layout at 980px: gallery and detail collapse to single column
- [ ] About sticky portrait becomes static at ≤980px

### Site — Deployment

- [ ] Site loads at GitHub Pages URL with no console errors
- [ ] No broken images (all use relative paths)
- [ ] No "undefined" or raw JS object text visible anywhere
- [ ] Site works on mobile (test at 375px viewport width)

## Acceptance Criteria
All checklist items pass. Any failure is fixed before the phase is marked complete.

## Notes
- Use browser devtools Network tab to simulate offline (for network failure tests) and to block specific image URLs (for 404 placeholder tests).
- Test both light and dark themes for the Help/Troubleshooting section.
- The full end-to-end error flow (commit bad YAML → Action writes error → Troubleshooting shows it → fix and recommit → error clears) should be run at least once as a complete sequence.
