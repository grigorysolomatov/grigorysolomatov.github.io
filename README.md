# Grigory Solomatov personal website

A minimal, dark, GitHub Pages-ready personal site with an embedded CV.

## Files

- `index.html` — page skeleton and section order.
- `data.js` — all editable content: name, tagline, sections, links, skills.
- `styles.css` — visual design tokens and layout. Start at `:root` to change colors, spacing, radii, and typography.
- `app.js` — renders the content from `data.js` into the page.
- `assets/grigory-solomatov-cv.pdf` — CV PDF.
- `assets/profile.jpg` — profile image.

## Local preview

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## Publish with GitHub Pages

### Option A: user site

Use a repository named exactly:

```text
<your-github-username>.github.io
```

Then commit these files to the repository root and push to `main`.
GitHub Pages will serve it at:

```text
https://<your-github-username>.github.io/
```

### Option B: project site

Use any repository name, e.g. `personal-site`, commit these files to the root, then in GitHub:

```text
Settings → Pages → Build and deployment → Source: Deploy from a branch → Branch: main / root
```

It will be served at:

```text
https://<your-github-username>.github.io/<repository-name>/
```

## Typical git commands

```bash
git init
git add .
git commit -m "Initial personal website"
git branch -M main
git remote add origin https://github.com/<your-github-username>/<repo>.git
git push -u origin main
```

## Experiments to try

- Change `--accent` and `--accent-strong` in `styles.css`.
- Reorder sections in `index.html`.
- Add/remove skill cards in `data.js`.
- Replace `assets/profile.jpg`.
- Replace `assets/grigory-solomatov-cv.pdf` whenever you update your CV.
- Try the built-in theme buttons in the About section.
