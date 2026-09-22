# Rayvo (رایوو)

**Rayvo** is the official website of **Raybod Akbarlou (رایبد اکبرلو)** — web developer and designer.
رایوو وب‌سایت رسمی رایبد اکبرلو، برنامه‌نویس و طراح وب است.

🌐 **https://rayvo.vercel.app**

Pure front-end, static site: **HTML + Tailwind CSS 3 + vanilla JavaScript**. No framework, no bundler,
no `npm install`, no build step at deploy time — the CSS is already built and committed. Upload the
files to GitHub, connect the repo to Vercel, done.

---

## Project structure

```
index.html                 The whole site — Tailwind utility classes, hand-written, no template engine
assets/
  css/
    tailwind.css            ← Tailwind build. Committed — the browser loads this file directly.
    noscript.css             Shown only if JavaScript is disabled
  js/
    app.js                   Theme toggle · section navigation · project filter · PWA registration
    theme-init.js             Applies the saved theme before first paint (no dark→light flash)
  img/
    logo.jpg, logo-72.webp    Site logo
    projects/*.webp           Project screenshots (optimized WebP, ~85% smaller than the originals)
tailwind/
  input.css                  Tailwind source: design tokens (colors, spacing) + component classes
  tailwind.config.js          Tailwind configuration
sw.js  manifest.webmanifest  robots.txt  sitemap.xml  llms.txt  llms-full.txt
vercel.json                 Security headers + caching rules
.well-known/security.txt
```

Nothing here needs Node.js to **run**. `tailwind/` is only needed if you want to *change* the design —
see below.

## Deploy (GitHub → Vercel, no build)

1. Upload every file in this folder to your GitHub repo (including the hidden `.well-known/` folder).
2. In Vercel → Project Settings → Build & Development Settings: **Framework Preset = Other**,
   **Build Command** and **Output Directory** both **empty**. Vercel will serve the files as they are.
3. Add your favicon (see below), commit, done.

## Favicon

The site intentionally ships **without** a favicon — add your own art. The main favicon is a **PNG**
(no `.ico` file is used or referenced anywhere). `index.html` already has the tags wired up; just add
these files to the project root and to `icons/`:

| File | Size | Used for |
|---|---|---|
| `favicon.png` | square, 48×48 or larger (browsers pick the resolution they need) | **Main favicon** — tab icon, address bar, bookmarks |
| `favicon-96x96.png` | 96×96 | High-DPI tab icon |
| `apple-touch-icon.png` | 180×180, **no transparency** | iOS home-screen icon |
| `icons/icon-192.png` | 192×192 | PWA install icon |
| `icons/icon-512.png` | 512×512 | PWA install icon / splash |
| `icons/icon-maskable-192.png` | 192×192, logo at ~80% with padding | Android adaptive icon |
| `icons/icon-maskable-512.png` | 512×512, same padding rule | Android adaptive icon |

Only `favicon.png` is required for the icon to show up in a browser tab; the rest are optional
refinements (retina tab icon, iOS/Android install icons). A generator like
**realfavicongenerator.net** can produce all of these — including `favicon.png` — from one image in
one pass. Browsers cache favicons aggressively — after replacing them, hard-refresh
(Ctrl/Cmd+Shift+R) or test in a private window.

## Changing the design (optional — only if you edit `tailwind/`)

The committed `assets/css/tailwind.css` is enough to run the site. To change colors, spacing, or add a
utility class and rebuild the CSS, you do **not** need `npm install` — the standalone Tailwind CLI is a
single executable with no dependencies:

```bash
# once — download the standalone CLI (no Node.js/npm needed), pick your OS/arch:
# https://github.com/tailwindlabs/tailwindcss/releases  (Assets → tailwindcss-<platform>)
# Linux/macOS:
curl -sLO https://github.com/tailwindlabs/tailwindcss/releases/latest/download/tailwindcss-linux-x64
chmod +x tailwindcss-linux-x64 && mv tailwindcss-linux-x64 tailwindcss
# Windows: download tailwindcss-windows-x64.exe from the same page and rename it tailwindcss.exe

# rebuild after any edit to index.html or tailwind/input.css
./tailwindcss -c tailwind/tailwind.config.js -i tailwind/input.css -o assets/css/tailwind.css --minify
```

This project was built with Tailwind CSS **3.4.19**; the `/latest/` link above always gets the newest
3.x release, which stays compatible with this config.

Commit the rebuilt `assets/css/tailwind.css` — that file is what Vercel serves, so the CLI never needs
to run on the server.

## Icons

All UI icons are inlined as an SVG `<symbol>` sprite at the top of `<body>` (Font Awesome Free 6 path
data, CC BY 4.0) and referenced with `<use href="#i-name">`. No icon font, no extra request.

## Adding a project

Duplicate one `<article class="project-card">` block in `index.html`, change its text/links, and add a
`.webp` screenshot (≈960px wide) to `assets/img/projects/`.

## Links

- Website: https://rayvo.vercel.app
- Telegram: https://t.me/Rayvoak
- YouTube: https://www.youtube.com/@raybod-akbarlou-Rayvo
- Bale: https://ble.ir/rayvo
- Aparat: https://www.aparat.com/Rayvo
- Resume: https://raybodak.vercel.app
- GitHub: https://github.com/raybod179

## Author

Raybod Akbarlou — رایبد اکبرلو

## License

MIT
