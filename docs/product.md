> **Initial draft** — scaffolded from spec interview. Updated by spec-execute as each phase completes.

# Product

## Overview

*Sketches from Sweden* is a gallery-style portfolio site for a Gothenburg-based artist showing graphite and watercolour drawings. It has three views — Sketchbook gallery, Immersive artwork detail, and About — with light/dark theme support.

This phase makes the site self-manageable: the artist edits two YAML files in GitHub to update all content, and a built-in Help page guides her through every task.

## Goals

- Artist adds a new work in under 5 minutes with no developer help.
- A YAML mistake produces a readable, actionable error message.
- About page content is fully editable without touching code.
- Help page covers every task the artist will need to perform.

## User Flows

### Adding a new sketch
Upload image to `content/images/` → add entry to `content/works.yaml` → commit → done.

### Updating a sketch
Edit the relevant entry in `content/works.yaml` → commit.

### Reordering works
Cut and paste entry blocks within `content/works.yaml` → commit.

### Removing a work
Delete the entry block from `content/works.yaml` → commit. Optionally delete the image file.

### Updating the About page
Edit `content/about.yaml` → commit.

### Recovering from a YAML error
Read the error panel on the site → open the named file in GitHub → fix the described problem → commit.
