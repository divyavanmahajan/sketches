# Summary: Manual Testing

## Completed
2026-05-30

## Goal
Verify the complete implementation against the spec's testing checklist.

## What Was Built
Testing checklist for the implementer/owner to run after deployment. No automated tests exist (no build step).

## Testing Checklist

### GitHub Action
- [ ] Valid `works-new.yaml` commit → `works.yaml` updated, `works-error.txt` cleared
- [ ] Valid `about-new.yaml` commit → `about.yaml` updated, `about-error.txt` cleared
- [ ] Invalid `works-new.yaml` → plain-English message in `works-error.txt`, `works.yaml` unchanged
- [ ] Invalid `about-new.yaml` → plain-English message in `about-error.txt`, `about.yaml` unchanged
- [ ] Both staging files changed in one commit → processed independently
- [ ] Action's own commit does not re-trigger workflow (`[skip ci]`)

### Site — Content
- [ ] Gallery shows all 6 works in correct order
- [ ] Each work displays correct title, year, medium, dimensions, place, note
- [ ] Works with images show image; works without show hatched placeholder
- [ ] About page shows correct lede, bio paragraphs, facts table
- [ ] About portrait shows first work's image

### Site — Edge Cases
- [ ] Work entry with only `title` renders without "undefined" text
- [ ] Empty `works.yaml` shows "No works yet — check back soon."
- [ ] Work with non-existent `image` filename shows hatched placeholder
- [ ] `year: 2024` (integer) renders as "2024" string
- [ ] Work with extra unknown fields renders normally

### Site — Help & Troubleshooting
- [ ] "03 Help" in nav opens Help view
- [ ] All 7 sections visible and readable
- [ ] Empty error files → "No errors — your last update was successful."
- [ ] Non-empty `works-error.txt` → error block visible in Troubleshooting
- [ ] Refresh button re-fetches without page reload

### Site — Existing Interactions
- [ ] Theme toggle switches light/dark; persists on reload
- [ ] Gallery entry click → Detail view
- [ ] Arrow keys navigate prev/next in Detail; Escape returns
- [ ] Enter/Space on focused gallery entry opens it
- [ ] Detail pager wraps (last→first, first→last)
- [ ] Responsive at 980px: single column layout

### Deployment
- [ ] Site loads at `https://divyavanmahajan.github.io/sketches/`
- [ ] No broken images, no "undefined" text, no console errors

## Deviations
None.

## Files Changed
- `docs/phase/init/08-manual-testing/summary-08-manual-testing.md` (this file)
