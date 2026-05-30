# Sketches from Sweden

A simple, free portfolio site for artists — hosted on GitHub Pages, updated by editing text files. No coding required after the initial setup.

The site has three sections: a gallery of works, a detail view for each piece, and an About page. All content is managed through two small text files. A built-in Help page on the site walks through every task step by step.

---

## Make it your own

### 1. Fork this repository

A fork is your own private copy of this site that you control.

1. Make sure you are signed in to [GitHub](https://github.com).
2. At the top of this page, click **Fork** → **Create fork**.
3. Leave the repository name as `sketches` (this keeps the site URL tidy).

You now have your own copy at `github.com/your-username/sketches`.

---

### 2. Turn on GitHub Pages

This makes your site publicly visible on the web.

1. In your forked repository, click **Settings** (top menu).
2. In the left sidebar, click **Pages**.
3. Under *Source*, choose **Deploy from a branch**.
4. Set the branch to **main** and the folder to **/ (root)**.
5. Click **Save**.

Your site will be live at:
```
https://your-username.github.io/sketches/
```
It may take a minute or two to appear the first time.

---

### 3. Add your content

Everything the site displays comes from three files in the `content/` folder:

| File | What it controls |
|---|---|
| `content/works-new.yaml` | Your list of artworks — title, year, medium, image, notes |
| `content/about-new.yaml` | Your About page — portrait image, statement, bio paragraphs, and facts |
| `content/site-new.yaml` | Site-wide text — site title, tagline, sketchbook label, studio signature |

To make a change: open the file in GitHub, click the pencil (edit) icon, make your edits, and click **Commit changes**. Within about 30 seconds the site updates automatically.

**For full step-by-step instructions** — adding a new sketch, uploading an image, removing a work, reordering, updating the About page — open your site and go to the **Help** page from the navigation menu.

---

### 4. Troubleshooting

If your change doesn't appear on the site within a minute, go to **Help → Troubleshooting** on your site. It shows exactly what went wrong and which line to fix. Make the correction, commit again, and the site will update.

---

## Getting code updates later

Occasionally this repository may be updated with improvements to the site design or features. To bring those updates into your fork without touching your content:

1. Go to your forked repository on GitHub.
2. Click **Sync fork** (shown when your fork is behind this one).
3. Click **Update branch**.

Your `content/` files and images are yours — they will not be overwritten by a sync as long as the update goes smoothly.

**If GitHub shows a conflict warning:**

A conflict means the update touched a file you have also changed. This is rare, but if it happens:

1. Click **Resolve conflicts** (GitHub will show the conflicting files).
2. Open each conflicting file. You will see something like this:

   ```
   <<<<<<< HEAD
   - title: My actual painting
     year: "2024"
   =======
   - title: Sample artwork
     year: "2023"
   >>>>>>> upstream/main
   ```

3. Your content is between `<<<<<<< HEAD` and `=======`. The incoming update is between `=======` and `>>>>>>> upstream/main`.
4. Delete the three marker lines (`<<<<<<<`, `=======`, `>>>>>>>`) and the incoming block below the `=======`. Keep only your content.
5. Click **Mark as resolved** → **Commit merge**.

If you are unsure which lines are yours, look for your own titles, text, and image filenames — those are always yours to keep.

---

## Repository layout

```
content/
  works-new.yaml      ← edit this to update your artworks
  about-new.yaml      ← edit this to update your About page
  site-new.yaml       ← edit this to update site-wide text
  images/             ← upload your artwork images here
index.html            ← site shell (no need to edit)
portfolio.jsx         ← site code (no need to edit)
.github/workflows/    ← automation that validates and publishes your edits
```

---

## Credits

Built with [React](https://react.dev) and [js-yaml](https://github.com/nodeca/js-yaml), served via [GitHub Pages](https://pages.github.com). No build step, no dependencies to install.
