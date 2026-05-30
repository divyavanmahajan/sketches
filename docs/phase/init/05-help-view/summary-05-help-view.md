# Summary: Help View

## Completed
2026-05-30

## Goal
Add a Help view to the site's navigation with task-oriented instructions for every content editing task.

## What Was Built
- "03 Help" nav item added to the left rail
- `HelpBody` component with 7 sections: How this site works, Add a sketch, Change a sketch, Remove a sketch, Change the order, Update the About page, YAML quick reference
- Help CSS added to index.html (help-section, yaml-eg, code)
- Troubleshooting section implemented inline (combined with step 06)

## Key Decisions
- Steps 05 and 06 combined into one commit — both modify portfolio.jsx and the Troubleshooting section is part of HelpBody, making separation artificial.
- "How this site works" section explicitly states no email/notification will be sent — she must check Troubleshooting herself.

## Deviations
- Combined with step 06 in a single commit.

## Files Changed
- `portfolio.jsx` (HelpBody component added, nav item added)
- `index.html` (help and troubleshooting CSS added)
