# Somesh Zanwar portfolio

The source for the new one-page portfolio is in `app/` (React, TypeScript, Tailwind CSS, Framer Motion, and Lucide React). GitHub Pages serves the **built** `index.html` and `assets/` from the repository root. The previous page URLs redirect to sections of the new site.

## Preview changes locally

```bash
cd app
npm install
npm run dev
```

Open the localhost URL printed by Vite. For a preview of the exact GitHub Pages files after building, run `npm run pages` from `app/`, then in the repository root run `python -m http.server 8765` and visit `http://localhost:8765/index.html`.

## Publish source changes

From `app/`, run `npm run pages`. Commit your source changes **and** the generated root `index.html`, `assets/`, and redirect pages. GitHub Pages serves the root files when the publishing branch is updated. The résumé download refers to the existing root file `Somesh_Zanwar.pdf`.
