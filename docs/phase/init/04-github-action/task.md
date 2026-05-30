# 04 — GitHub Action: Content Validation & Promotion

## Goal
Create the GitHub Actions workflow that validates `works-new.yaml` and `about-new.yaml` on every push, promotes valid files to their live counterparts, and writes plain-English error messages back to the repo when validation fails.

## Context
This is the safety gate between the artist's edits and the live site. It must never promote invalid YAML, must always write a human-readable error on failure, and must not re-trigger itself on its own commits.

## Prerequisites
- Step 01 (content file structure must exist so the Action has files to work with)

## Tasks

1. Create `.github/workflows/promote-content.yml`.

2. Set the trigger to run on `push` to `main`, filtered to paths `content/works-new.yaml` and `content/about-new.yaml`:
   ```yaml
   on:
     push:
       branches: [main]
       paths:
         - content/works-new.yaml
         - content/about-new.yaml
   ```

3. Use a single job on `ubuntu-latest`. Check out the repo with `actions/checkout@v4` using `token: ${{ secrets.GITHUB_TOKEN }}` and `persist-credentials: true`.

4. Configure the git user for the Action's commits:
   ```
   git config user.name "github-actions[bot]"
   git config user.email "github-actions[bot]@users.noreply.github.com"
   ```

5. Write a Python validation script (inline in the workflow as a `run: python3 -c "..."` block, or as a small script file at `.github/scripts/validate-yaml.py`). For each staging file that was changed in the push:

   a. Read the staging file.
   b. Attempt `yaml.safe_load()`.
   c. **If valid:**
      - Copy the staging file to the live file (`works.yaml` or `about.yaml`).
      - Overwrite the error file with an empty string.
      - Set a flag: changes were made.
   d. **If `yaml.YAMLError`:**
      - Construct a plain-English error message:
        - File name (the staging file, e.g. `works-new.yaml`)
        - Line and column from `e.mark` (1-indexed for human readability)
        - `e.problem` — the technical description, rephrased where possible
        - A "What to do" line: *"Open `content/works-new.yaml` in GitHub, go to line {N}, and check for missing colons, wrong indentation, or unquoted special characters."*
      - Write this message to the error file (`works-error.txt` or `about-error.txt`).
      - Leave the live file untouched.
      - Set a flag: changes were made.

6. After processing both files, if any changes were made: `git add content/`, then commit with message `"[skip ci] content: promote staging files"`, then `git push`.

7. If no files changed (shouldn't happen given the path filter, but be defensive): exit cleanly without committing.

## Acceptance Criteria
- Pushing a valid `works-new.yaml` causes `works.yaml` to be updated and `works-error.txt` to be emptied within ~30 seconds.
- Pushing an invalid `works-new.yaml` leaves `works.yaml` unchanged and writes a readable message to `works-error.txt` (visible in the repo and in the site's Troubleshooting section after step 06).
- Pushing both staging files in one commit processes both independently.
- The Action's own commit does not re-trigger the workflow (`[skip ci]` in the commit message prevents this).
- The workflow appears in the repo's Actions tab with a clear pass/fail status.

## Notes
- `pyyaml` is pre-installed on `ubuntu-latest` — no `pip install` needed.
- Use `yaml.safe_load()`, not `yaml.load()` — the latter requires an explicit Loader and is unsafe for untrusted input.
- `e.mark` on a `YAMLError` is 0-indexed; add 1 to both line and column before displaying to the artist.
- If `e.mark` is `None` (some error types don't have a position), omit the line/column from the message rather than showing `None`.
- The `[skip ci]` prefix in the commit message is the standard GitHub convention for suppressing workflow re-runs.
- Test by pushing a file with a deliberate syntax error (e.g. a line with inconsistent indentation) and checking the Actions tab + `works-error.txt` in the repo.

> ⚠ **Core Belief #3 — A mistake must never corrupt the live site:** The Python script must only write to the live file inside the success branch. The failure branch must only write to the error `.txt` file.

> ⚠ **Core Belief #4 — Errors must be recoverable by the artist alone:** The error message written to `.txt` must be plain English with a concrete "what to do" instruction. A raw Python traceback or `YAMLError` repr is not acceptable.

## External References
- `docs/references/pyyaml-reference.txt` — `yaml.safe_load()` API and `YAMLError` error shape including `.mark` line/column access.
