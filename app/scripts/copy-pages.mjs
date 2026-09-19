import { copyFileSync, cpSync, existsSync, mkdirSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
const app = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const root = resolve(app, '..');
const dist = join(root, 'dist');
if (!existsSync(join(dist, 'index.html'))) throw new Error('Build first: npm run build');
copyFileSync(join(dist, 'index.html'), join(root, 'index.html'));
const sourceAssets = join(dist, 'assets');
const targetAssets = join(root, 'assets');
mkdirSync(targetAssets, { recursive: true });
for (const file of readdirSync(targetAssets)) rmSync(join(targetAssets, file), { recursive: true, force: true });
cpSync(sourceAssets, targetAssets, { recursive: true });
for (const [page,section] of Object.entries({ 'projects.html':'projects', 'experience.html':'experience', 'tools.html':'expertise', 'opensource.html':'open-source' })) {
  writeFileSync(join(root, page), `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta http-equiv="refresh" content="0; url=./index.html#${section}"><title>Somesh Zanwar</title><link rel="canonical" href="https://someshzanwar.github.io/#${section}"></head><body><p>Moved to <a href="./index.html#${section}">the new portfolio section</a>.</p><script>location.replace('./index.html#${section}');</script></body></html>\n`);
}
console.log('GitHub Pages files copied to repository root. Commit index.html, assets/, and redirect pages.');
