# Summary: Runtime YAML Loading

## Completed
2026-05-30

## Goal
Replace the hardcoded WORKS array and About copy with data fetched and parsed at runtime from content/works.yaml and content/about.yaml.

## What Was Built
- App gains loading/error state: `works`, `about`, `loading`, `worksError`, `aboutError`
- `useEffect` on mount fetches both YAML files in parallel, parses with `jsyaml.load()`
- Loading state renders a centred "Loading…" mono message
- Network errors set a connection error message; YAMLException sets a parse error message
- All components updated to receive data as props; hardcoded WORKS/RATIOS/HERO constants removed
- Image paths prepended with `./content/images/` at runtime
- RATIOS array dropped; Frame defaults to `3/4`
- AboutBody receives `portrait` prop (first work) for the sticky portrait image

## Key Decisions
- `portrait` prop passed from Home to AboutBody carrying `works[0]`, preserving the original About portrait behaviour without coupling AboutBody to the works array.
- Non-array result from `jsyaml.load()` treated as empty array (not an error).

## Deviations
- Steps 05 and 06 (Help view and Troubleshooting) were combined into a single commit for efficiency since they both modify portfolio.jsx sequentially.

## Files Changed
- `portfolio.jsx` (rewritten: YAML loading, new data flow)
- `index.html` (loading-state and error-panel CSS added)
