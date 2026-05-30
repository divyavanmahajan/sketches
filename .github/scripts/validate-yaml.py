#!/usr/bin/env python3
"""Validate staging YAML files and promote them to live, or write error files."""

import os
import sys
import yaml

STAGING_FILES = {
    'content/works-new.yaml': ('content/works.yaml', 'content/works-error.txt'),
    'content/about-new.yaml': ('content/about.yaml', 'content/about-error.txt'),
}

def format_error(staging_file, exc):
    """Format a YAMLError as a plain-English message the artist can act on."""
    mark = getattr(exc, 'mark', None)
    problem = getattr(exc, 'problem', str(exc))

    if mark is not None:
        line = mark.line + 1   # convert 0-indexed to 1-indexed
        col = mark.column + 1
        location = f"Line {line}, column {col}"
    else:
        location = "Unknown position"

    # Make common pyyaml messages more readable
    readable = problem
    if 'mapping values are not allowed' in problem:
        readable = "a colon (:) appears where it shouldn't — check that field names are followed by a colon and a space, and that text containing colons is wrapped in quotes"
    elif 'could not find expected' in problem:
        readable = "the structure is broken here — check for missing colons, incorrect indentation, or an entry block that was cut off"
    elif 'found character' in problem and 'tab' in problem:
        readable = "a tab character was used for indentation — use two spaces instead (tabs are not allowed in YAML)"
    elif 'found duplicate key' in problem:
        readable = "the same field name appears twice in one entry — remove the duplicate"

    return (
        f"Error in {staging_file}\n"
        f"{location} in the file\n\n"
        f"Problem: {readable}\n\n"
        f"What to do: Open content/{os.path.basename(staging_file)} in GitHub, "
        f"go to line {line if mark else '?'}, and check for missing colons, wrong indentation, "
        f"or text that contains special characters (like : or &) without quotes. "
        f"Fix the issue and commit the file again."
    )

def main():
    # Determine which files changed in this push
    changed = os.environ.get('GITHUB_EVENT_PATH', '')
    # Process all staging files regardless — pyyaml is fast and files are small

    for staging_file, (live_file, error_file) in STAGING_FILES.items():
        if not os.path.exists(staging_file):
            continue

        with open(staging_file, 'r', encoding='utf-8') as f:
            content = f.read()

        try:
            yaml.safe_load(content)
            # Valid — promote
            with open(live_file, 'w', encoding='utf-8') as f:
                f.write(content)
            # Clear error file
            with open(error_file, 'w', encoding='utf-8') as f:
                f.write('')
            print(f"✓ {staging_file} is valid — promoted to {live_file}")

        except yaml.YAMLError as exc:
            msg = format_error(staging_file, exc)
            with open(error_file, 'w', encoding='utf-8') as f:
                f.write(msg)
            print(f"✗ {staging_file} has errors — written to {error_file}")
            print(f"  Error: {exc}")
            # Do NOT exit with error code — we want the commit step to run
            # so the error file gets pushed back to the repo

if __name__ == '__main__':
    main()
