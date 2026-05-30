# Summary: Edge Cases & Error Handling

## Completed
2026-05-30

## Goal
Ensure the site handles every abnormal content state gracefully without crashing or showing blank/undefined content.

## What Was Built
- `Frame`: `onError` handler on `<img>` switches to hatched placeholder on 404; local `imgError` state tracks this
- `WorkBody`: empty/null works list shows "No works yet — check back soon." instead of empty entries
- `WorkBody`: optional chaining on `w.medium`, `w.dimensions`, `w.note`; meta line skips empty parts
- `Detail`: all optional spec fields conditionally rendered; `w.year` coerced with `String(w.year ?? '')`
- `.empty-state` CSS class added to index.html

## Key Decisions
- Frame's `imgError` state is local — each Frame instance tracks its own image failure independently.
- Meta line in WorkBody built with `.filter(Boolean).join(' · ')` to handle any combination of missing fields cleanly.

## Deviations
None.

## Files Changed
- `portfolio.jsx`
- `index.html` (empty-state CSS)
