// Renders /resume/ to public/Somesh_Zanwar_Resume.pdf. Requires the site served on :4173 (npx serve out -l 4173)
// and playwright installed (npm i -D playwright). Run: npm run build && npx serve out -l 4173 & npm run pdf
import { chromium } from "playwright";
const b = await chromium.launch();
const p = await b.newPage();
await p.goto("http://localhost:4173/resume/");
await p.emulateMedia({ media: "print" });
await p.pdf({ path: "public/Somesh_Zanwar_Resume.pdf", format: "Letter", margin: { top: "0.5in", bottom: "0.5in", left: "0.6in", right: "0.6in" }, printBackground: true });
await b.close();
