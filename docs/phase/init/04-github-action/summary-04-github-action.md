# Summary: GitHub Action: Content Validation & Promotion

## Completed
2026-05-30

## Goal
Create the GitHub Actions workflow that validates staging YAML files on every push, promotes valid files to their live counterparts, and writes plain-English error messages back to the repo when validation fails.

## What Was Built
- `.github/workflows/promote-content.yml` — workflow triggered on push to main when staging files change
- `.github/scripts/validate-yaml.py` — Python script that validates with pyyaml, promotes on success, writes plain-English errors on failure

## Key Decisions
- Script processes ALL staging files on every run (not just changed ones) to keep both error files in sync.
- Script does not exit with error code on YAML failure — the workflow must continue to commit the error file back.
- Error messages are humanised: common pyyaml problem strings are replaced with plain-English descriptions.
- [skip ci] in commit message prevents the Action from re-triggering on its own commits.

## Deviations
None from task.md.

## Files Changed
- `.github/workflows/promote-content.yml` (created)
- `.github/scripts/validate-yaml.py` (created)
- `docs/phase/init/04-github-action/summary-04-github-action.md` (created)
