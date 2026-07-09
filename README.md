# Habibur Rahman — Portfolio

A clean, modern, minimal personal site (photography · blog · academic profile),
built with plain **HTML + CSS + a little JavaScript**. No build step. Deploys to
**GitHub Pages** as-is.

---

## 1. Folder structure

```
portfolio/
├── index.html            # Home (hero, featured photo, nav)
├── about.html            # About / background & goals
├── blog.html             # Blog list (reads posts/posts.json)
├── post.html             # Renders a single post: post.html?post=<slug>
├── photography.html      # Grid gallery + lightbox
├── contact.html          # Contact form (Formspree) + email fallback
├── 404.html              # Friendly not-found page
├── .nojekyll             # Tells GitHub Pages to serve files as-is
├── README.md             # This file
├── assets/
│   ├── css/style.css     # All styling (purple/white theme + dark mode)
│   ├── js/
│   │   ├── main.js       # Theme toggle, mobile nav, scroll reveal, lightbox
│   │   └── blog.js       # Loads + renders markdown posts
│   └── img/              # Your photos  (hero.jpg, featured.jpg, photo1..8.jpg, about.jpg)
└── posts/
    ├── posts.json        # Index of blog posts (metadata)
    ├── welcome.md        # Sample post
    └── clinic-to-lab.md  # Sample post
```

---

## 2. How to add your own content

### Photos
Drop image files into `assets/img/`. The pages look for these names
(and fall back to sample images if missing):

- `hero.jpg`, `featured.jpg`, `about.jpg`
- `photo1.jpg` … `photo8.jpg` for the gallery

To add **more** gallery photos, open `photography.html` and copy a line:

```html
<figure><img src="assets/img/photo9.jpg" alt="Photograph 9"></figure>
```

The lightbox picks up new photos automatically.

### Blog posts — the easy part
Adding a post is **two steps**:

1. Create a markdown file in `posts/`, e.g. `posts/my-first-lab-day.md`.
2. Add an entry to the **top** of `posts/posts.json`:

```json
{
  "slug": "my-first-lab-day",
  "title": "My first day in the lab",
  "date": "2026-07-15",
  "tag": "Science",
  "excerpt": "A short one-line teaser shown in the blog list."
}
```

`slug` must match the filename (without `.md`). That's it — the post appears in
the list and opens at `post.html?post=my-first-lab-day`. Markdown (headings,
lists, links, images, quotes, code) is rendered automatically.

### Contact form
The form uses [Formspree](https://formspree.io) (free):
1. Sign up, create a form, copy your endpoint (looks like `https://formspree.io/f/abcdxyz`).
2. In `contact.html`, replace `YOUR_ID` in the `<form action=...>` line.

Until you do that, the form gracefully falls back to opening the visitor's email app.

### Names, links, colors
- Your name/brand: search for `Habibur` across the `.html` files.
- Social links: edit the `<div class="social">` blocks (GitHub/LinkedIn/Instagram URLs).
- Theme colors: edit the CSS variables at the top of `assets/css/style.css`
  (`--purple`, `--bg`, etc.), including the `[data-theme="dark"]` block.

---

## 3. Deploy to GitHub Pages

### Option A — user site (recommended, gives you `username.github.io`)
1. Create a new repo named **`<your-username>.github.io`** (must match your username exactly).
2. Put the **contents** of this `portfolio/` folder in the repo root
   (so `index.html` is at the top level, not inside a subfolder).
3. Commit and push:
   ```bash
   cd portfolio
   git init
   git add .
   git commit -m "Initial portfolio site"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-username>.github.io.git
   git push -u origin main
   ```
4. In the repo: **Settings → Pages → Build and deployment → Source: Deploy from a branch**,
   branch **`main`**, folder **`/ (root)`**. Save.
5. Wait ~1 minute, then visit **`https://<your-username>.github.io`**.

### Option B — project site (URL is `username.github.io/portfolio`)
Same as above, but name the repo anything (e.g. `portfolio`). Your site will be at
`https://<your-username>.github.io/portfolio/`. Everything works because all
paths in the HTML are **relative** (except `404.html`, which is fine either way).

### Local preview
Because the blog fetches `.md`/`.json` files, open the site through a tiny local
server (opening the file directly with `file://` blocks fetch):

```bash
cd portfolio
python3 -m http.server 8000
# then open http://localhost:8000
```

---

## 4. Features included
- Fixed, blurred navigation bar with active-link underline
- Purple + white theme with soft elegant tones
- **Dark mode** toggle (remembers your choice)
- Responsive (mobile hamburger menu)
- Smooth hover effects + scroll-reveal animations
- Masonry photo grid with keyboard-navigable lightbox
- Markdown blog, posts open on their own page, trivially easy to extend
- Contact form with email fallback
- Footer with social links
