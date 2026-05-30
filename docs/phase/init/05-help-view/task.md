# 05 — Help View

## Goal
Add a Help view to the site's navigation with task-oriented instructions covering every content editing task the artist will need to perform.

## Context
The Help view is a new view within the existing React app — a fourth option alongside Work, About, and Detail. It shares the same left rail as the Home view. Its content is static (written once by the developer); the Troubleshooting section that fetches live error files is handled separately in step 06.

## Prerequisites
- Step 02 (the view/page state system must be in place and working with YAML data)

## Tasks

1. Add `'help'` as a valid value for the `page` state. Add a "03 Help" nav item to the left rail nav list in `Home`, styled consistently with the existing "01 Work" and "02 About" items.

2. Create a `HelpBody` component rendered when `page === 'help'`. It shares the same content column layout as `WorkBody` and `AboutBody`.

3. Implement all of the following sections as scrollable content within `HelpBody`. Use the existing typography hierarchy: section headings in Cormorant (consistent with the rest of the site), body text in EB Garamond, any file names or code references in IBM Plex Mono.

   **Sections (in order):**

   - **How this site works** — Explain: two staging files (`works-new.yaml`, `about-new.yaml`) control all content; images go in `content/images/`; changes go live after a short automated check (~30 seconds). **Explicitly tell her:** if a change doesn't appear after a minute, go to Help → Troubleshooting to see what went wrong. She will not receive any email or notification — Troubleshooting is the only place errors are reported.

   - **Add a new sketch** — Step-by-step:
     1. Go to the repo on GitHub.
     2. Navigate to `content/images/`, click **Add file → Upload files**, upload the scan.
     3. Navigate to `content/works-new.yaml`, click the pencil (Edit) icon.
     4. Add a new entry at the desired position (show the YAML block format).
     5. Click **Commit changes**.
     6. Wait ~30 seconds. The site updates automatically.

   - **Change a sketch** — Edit the relevant fields in `content/works-new.yaml` and commit.

   - **Remove a sketch** — Delete the entire entry block in `content/works-new.yaml` and commit. Optionally delete the image from `content/images/`.

   - **Change the order** — Cut an entry block and paste it in the new position within `content/works-new.yaml`. Commit.

   - **Update the About page** — Edit `content/about-new.yaml` and commit. Show the field names (`lede`, `bio`, `facts`) with a brief example.

   - **YAML quick reference** — Minimal cheat sheet:
     - Each work is a block starting with `- title:`
     - Fields are indented two spaces under their block
     - Text with colons, apostrophes, or special characters should be wrapped in quotes
     - A line that begins with `#` is a comment and is ignored
     - Common mistakes: missing space after `:`, inconsistent indentation, unquoted `&` or `:`

   - **Troubleshooting** — Placeholder section with heading and description only. The live error content is wired up in step 06.

4. The Help view should not show the gallery header row ("Selected work / 2023–2025") — use a simpler header consistent with the About view header style.

## Acceptance Criteria
- "03 Help" appears in the left rail nav and clicking it renders the Help content.
- All seven sections are present and readable.
- File names and YAML snippets are rendered in `IBM Plex Mono`.
- The active nav item styling (1px `--accent` bottom border) works for the Help item.
- All existing nav items (Work, About) continue to function.
- Keyboard navigation and theme toggle are unaffected.

## Notes
- Keep the Help content concise — the artist will read this occasionally, not daily. Prefer short sentences and numbered steps over prose.
- YAML examples in the Help text should use `<pre>` or a styled code block, not inline text, so indentation is preserved visually.
- Do not add Help to the Detail view's "← All work" back button flow — it only applies to the Work/About home views.

> ⚠ **Core Belief #6 — Preserve the design exactly:** The Help view must use existing design tokens and typography. Do not introduce new font sizes, colors, or spacing values.
