> **Initial draft** — scaffolded from spec interview. Updated by spec-execute as each phase completes.

# Core Beliefs

1. **No build step for the site.** The site must be servable by GitHub Pages without compilation or bundling. The GitHub Action is for content validation only — not a build pipeline.
2. **The artist edits staging files only.** She touches `content/works-new.yaml`, `content/about-new.yaml`, and image uploads. The live `.yaml` files are written exclusively by the GitHub Action. Never instruct or allow her to edit live files directly.
3. **A mistake must never corrupt the live site.** The Action promotes staging → live only on successful validation. On failure, the live file is left untouched and the error is written to the corresponding `.txt` file.
4. **Errors must be recoverable by the artist alone.** Error messages in `.txt` files must name the staging file, give line/column if available, describe the problem in plain English, and say what to fix. Vague or stack-trace-style messages are not acceptable.
5. **Never crash on missing optional data.** A missing field renders silently (omitted or placeholder) — it never breaks the page or throws an unhandled error.
6. **Preserve the design exactly.** Color tokens, typography, spacing, and interactions are defined in the design handoff spec and are not open for reinterpretation. Visual changes require explicit approval.
7. **Relative paths everywhere.** All asset and content URLs must be relative (e.g. `./content/works.yaml`) so the site works correctly under a GitHub Pages subdirectory.
8. **Ignore unknown YAML fields.** Extra keys in a YAML entry are silently discarded — this future-proofs the schema without breaking existing deploys.
9. **Keep dependencies minimal.** The only new runtime dependency is js-yaml (CDN). The Action uses pyyaml (pre-installed on `ubuntu-latest`). Do not introduce additional libraries without clear necessity.
