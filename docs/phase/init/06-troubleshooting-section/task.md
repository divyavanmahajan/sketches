# 06 — Troubleshooting Section

## Goal
Wire up the Troubleshooting section in the Help view to fetch and display the live error files, so the artist can see exactly what went wrong without leaving the site.

## Context
The GitHub Action writes plain-English error messages to `content/works-error.txt` and `content/about-error.txt`. This section fetches those files when the artist opens Help → Troubleshooting and displays their contents verbatim. It is the artist's primary feedback loop when an edit doesn't go live.

## Prerequisites
- Step 04 (GitHub Action must write error files)
- Step 05 (Help view and Troubleshooting section placeholder must exist)

## Tasks

1. In `HelpBody`, add local state for the Troubleshooting section:
   - `errorFiles`: `{ works: string|null, about: string|null }` — the fetched file contents
   - `errorLoading`: boolean
   - `errorFetchError`: string|null — if the fetch itself fails

2. Fetch both error files when the Troubleshooting section is rendered (on mount of `HelpBody`, or lazily when the section scrolls into view — mount is simpler and acceptable given file size). Use `Promise.all` to fetch `./content/works-error.txt` and `./content/about-error.txt` in parallel.

3. Render the Troubleshooting section content:

   **While loading:** Show a brief "Checking for errors…" message in `--ink-soft`.

   **If fetch itself fails (network error):** Show "Couldn't check for errors — make sure you're connected and refresh."

   **If both files are empty (or absent / 404):** Show a positive confirmation:
   > "No errors — your last update was successful."
   Styled with `--ink-soft`, italic, Cormorant.

   **If one or both files have content:** For each non-empty file, show:
   - A heading: "Works update error" or "About update error" (mono, uppercase, `--accent`)
   - The error text verbatim in a `<pre>` block styled with IBM Plex Mono, `--ink`, `--paper-2` background, padding, no border radius
   - Below the pre block: a prompt in EB Garamond — *"To fix this: open `content/works-new.yaml` (or `about-new.yaml`) in GitHub, correct the issue described above, and commit again."*

4. Handle the case where an error file returns 404 (e.g. on a fresh repo before the Action has ever run) — treat 404 as "no error" (same as empty file).

5. Add a small "Refresh" button (mono, 11px, `--accent`) near the Troubleshooting heading so the artist can re-fetch without reloading the whole page. It re-runs the same `Promise.all` fetch.

## Acceptance Criteria
- With both error files empty: "No errors — your last update was successful." is shown.
- With a non-empty `works-error.txt`: the error message appears verbatim in a mono pre block with the "To fix this" prompt below it.
- With non-empty `about-error.txt`: same, under "About update error".
- With both files having content: both error blocks are shown.
- The Refresh button re-fetches without a full page reload.
- A 404 on either error file is treated as "no error".
- Network failure during fetch shows the connection error message.
- The section is readable in both light and dark themes.

## Notes
- The error files are tiny (a few lines of text). No streaming or chunking needed — `response.text()` is fine.
- Treat `response.ok === false` (including 404) as "no error" to gracefully handle a fresh repo state.
- The `<pre>` block must preserve whitespace and line breaks from the error file. Use `white-space: pre-wrap` so long lines don't overflow on mobile.
- Do not parse or interpret the error text — display it exactly as written by the Action. The Action is responsible for making it human-readable (step 04).

> ⚠ **Core Belief #4 — Errors must be recoverable by the artist alone:** The display here is purely a read-through of what the Action wrote. Never add technical jargon or transform the message — the Action already made it plain English.

> ⚠ **Core Belief #7 — Relative paths everywhere:** Fetch paths must be `./content/works-error.txt` and `./content/about-error.txt`.
