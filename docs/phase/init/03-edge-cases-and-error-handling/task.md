# 03 — Edge Cases & Error Handling

## Goal
Ensure the site handles every abnormal content state gracefully — missing fields, empty lists, broken image paths, and network failures — without crashing or showing a blank page.

## Context
Step 02 adds the happy path. This step hardens it. Because the live YAML files are only ever written by the validated GitHub Action, parse errors at runtime should be rare — but defensive handling is still required. Missing optional fields are the most common case (the artist omits a field she doesn't need).

## Prerequisites
- Step 02 (runtime YAML loading must be in place)

## Tasks

1. **Missing optional fields** — audit every component that reads work or about fields. For each optional field (`year`, `medium`, `dimensions`, `place`, `image`, `note`, `lede`, `bio`, `facts`): confirm it renders nothing (not "undefined") when absent, and does not throw.

2. **Empty works list** — if `works.yaml` parses to an empty array (or `null`), render a message in the gallery content area: *"No works yet — check back soon."* in the existing body serif style.

3. **Missing image at runtime** — if an `image` filename is given but the file 404s, the `Frame` component should show the hatched placeholder silently (no broken-image icon, no console error visible to the user). Use the `onError` handler on the `<img>` element to switch to placeholder mode.

4. **Network failure fetching YAML** — if `fetch()` rejects (offline, DNS failure), show a clear message: *"Couldn't load content — check your connection and refresh."* This should appear in place of the gallery / About content respectively, styled as the error panel from step 02.

5. **Partially valid YAML** — if `works.yaml` is valid YAML but contains a non-array value (e.g. a plain string), treat it as an empty list and show the "No works yet" message rather than crashing.

6. **`year` as unquoted integer** — confirm that a `year: 2024` value (parsed as a JS number by js-yaml) is coerced to a string before rendering, so it displays as `"2024"` not causing a React warning about rendering a number.

7. **Extra unknown fields** — confirm that a work entry with unrecognised fields (e.g. `price: 500`) is silently ignored and the entry renders normally.

## Acceptance Criteria
- A work entry with only `title` (all other fields absent) renders in the gallery without errors or "undefined" text.
- An empty `works.yaml` shows the "No works yet" message.
- A work with an `image` path that 404s shows the hatched placeholder.
- Disconnecting from the network and reloading shows the connection error message in both gallery and About views.
- A `year: 2024` (integer) renders as the string "2024" without React warnings.
- An entry with extra unknown fields renders identically to one without them.
- No unhandled exceptions in the browser console for any of the above scenarios.

## Notes
- Test the 404 image case by temporarily using a non-existent filename in `works.yaml` locally.
- Test the network failure case using the browser devtools "Offline" mode (Network tab → throttle → Offline).

> ⚠ **Core Belief #5 — Never crash on missing optional data:** Every optional field access must be guarded. Use optional chaining (`entry?.note`) rather than assuming presence.

> ⚠ **Core Belief #8 — Ignore unknown YAML fields:** No validation of field names at runtime — only consume known fields, ignore the rest.
