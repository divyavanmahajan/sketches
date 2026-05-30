# Summary: Troubleshooting Section

## Completed
2026-05-30

## Goal
Wire up the Troubleshooting section in HelpBody to fetch and display live error files from the repo.

## What Was Built
- HelpBody fetches `./content/works-error.txt` and `./content/about-error.txt` on mount via `Promise.all`
- 404 or non-ok responses treated as "no error" (empty string)
- Network failure sets `errorFetchFailed` flag
- "No errors" confirmation shown when both files are empty
- Per-file error blocks with `err-label`, verbatim `err-pre`, and `err-action` prompt
- "Refresh" button re-fetches without page reload
- All troubleshooting CSS added to index.html

## Key Decisions
- Fetch logic extracted to a `fetchErrors` function called both on mount and by the Refresh button.
- Error text displayed verbatim — no parsing or transformation. The Action (step 04) is responsible for human-readable messages.

## Deviations
- Combined with step 05 in a single commit.

## Files Changed
- `portfolio.jsx` (Troubleshooting section in HelpBody)
- `index.html` (troubleshooting CSS)
