# Birthday Wish Website

A small interactive birthday wish website built with Vue 3 and static HTML/CSS/JS.

## What it does

- Lets you enter a name and a custom birthday message.
- Shows a live preview of the greeting.
- Updates the URL with `?name=...&message=...` so you can share a personalized link.

## Files

- `index.html` — page structure and Vue app entry.
- `styles.css` — page styling.
- `script.js` — Vue app logic and URL handling.

## Run locally

Open `index.html` in your browser.

## Share on GitHub Pages

1. Create a new GitHub repository for this project.
2. Copy the files from this folder into the repository.
3. Commit and push.
4. In GitHub, go to the repository `Settings` → `Pages`.
5. Set the source to the main branch and the root folder.
6. Save and use the published URL.

## Example URL

When you click "Generate Wish", the site updates the URL, for example:

`https://your-username.github.io/your-repo/?name=Alex&message=Happy%20Birthday!`

Share that link and the recipient will see the customized wish immediately.

## Git commands

If you have Git installed, from this folder run:

```bash
git init
git add .
git commit -m "Initial birthday wish website"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

Then enable GitHub Pages for the repo.
