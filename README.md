# Portfolio

Personal site for Somesh Zanwar. Next.js (static export), self-hosted fonts, no tracking, deployed to GitHub Pages.

## Edit content
Everything lives in `lib/content.ts`. Rule: every claim is linkable or labelled self-reported.

## Run
```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # static site in ./out
```

## Deploy (GitHub Pages)
Push to `main`. The workflow in `.github/workflows/deploy.yml` builds with `NEXT_PUBLIC_BASE_PATH=/<repo-name>`.
In the repo: Settings -> Pages -> Source: GitHub Actions. For a custom domain or a `<user>.github.io` repo, set the base path to empty.

## Resume PDF
`public/Somesh_Zanwar_Resume.pdf` is rendered from `/resume/`. Regenerate with `scripts/make-pdf.mjs` after editing the resume page.
