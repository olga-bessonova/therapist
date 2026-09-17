// Regenerates the "Before Our Session" PDFs in public/.
// Run with: node scripts/generate-pdfs.mjs
// Pulls copy straight from src/i18n/content.*.js, so the PDFs stay in sync
// with the site whenever those files change — just rerun this script.
import { chromium } from "playwright";
import { mkdir, mkdtemp, writeFile, rm } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import os from "node:os";

import { en } from "../src/i18n/content.en.js";
import { ru } from "../src/i18n/content.ru.js";
import { SITE_NAME } from "../src/config.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, "..", "public");
const imagesDir = path.join(publicDir, "images");

function imgUrl(name) {
  return `file://${path.join(imagesDir, name)}`;
}

const COVER_IMAGE = imgUrl("pexels-abdullah-asad-154796132-12658683.jpg");
const IMAGE_SPACE = imgUrl("10.jpg");
const IMAGE_WATER = imgUrl("3.jpg");
const IMAGE_INNER = imgUrl("8.jpg");

const LANGS = [
  {
    code: "en",
    dict: en,
    subtitle: "Internationally certified hypnotist and Reiki Master",
    cover: "A short guide to help you arrive ready — in body, space, and mind.",
    footerName: SITE_NAME,
  },
  {
    code: "ru",
    dict: ru,
    subtitle: "Международно сертифицированный гипнотизёр и Мастер Рейки",
    cover: "Короткое руководство, которое поможет вам прийти на сеанс готовыми — телом, пространством и разумом.",
    footerName: SITE_NAME,
  },
];

function esc(s) {
  return String(s).replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" })[c]);
}

function renderSection(section, imageAfter) {
  return `
    <section class="block">
      <h2>${esc(section.heading)}</h2>
      ${section.subheading ? `<p class="subheading">${esc(section.subheading)}</p>` : ""}
      ${section.intro ? `<p>${esc(section.intro)}</p>` : ""}
      ${section.itemsIntro ? `<p>${esc(section.itemsIntro)}</p>` : ""}
      ${
        section.items
          ? `<ul>${section.items.map((i) => `<li>${esc(i)}</li>`).join("")}</ul>`
          : ""
      }
      ${section.note ? `<p class="note">${esc(section.note)}</p>` : ""}
    </section>
    ${imageAfter ? `<div class="figure"><img src="${imageAfter}" /></div>` : ""}
  `;
}

function buildHtml({ code, dict, subtitle, cover }) {
  const { prep } = dict;

  const imageForHeading = (heading) => {
    const isWater = heading === "Water" || heading === "Вода";
    const isInner = heading === "Your Inner State" || heading === "Ваше внутреннее состояние";
    const isSpace = heading === "Space" || heading === "Пространство";
    if (isSpace) return IMAGE_SPACE;
    if (isWater) return IMAGE_WATER;
    if (isInner) return IMAGE_INNER;
    return null;
  };

  const sectionsHtml = prep.sections
    .map((s) => renderSection(s, imageForHeading(s.heading)))
    .join("\n");

  return `<!doctype html>
<html lang="${code}">
<head>
<meta charset="utf-8" />
<title>${esc(prep.heading)}</title>
<style>
  * { box-sizing: border-box; }
  body {
    margin: 0;
    font-family: Georgia, 'Times New Roman', serif;
    color: #1d1f16;
    background: #f6f5ee;
  }

  .cover {
    break-after: page;
    margin-bottom: 4mm;
  }
  .cover-eyebrow {
    font-family: -apple-system, 'Segoe UI', Helvetica, Arial, sans-serif;
    font-size: 10pt;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: #b97650;
    margin: 0 0 4mm;
  }
  .cover-title {
    font-size: 28pt;
    line-height: 1.15;
    color: #262e1c;
    margin: 0 0 6mm;
    font-weight: 500;
  }
  .cover-sub {
    font-family: -apple-system, 'Segoe UI', Helvetica, Arial, sans-serif;
    font-size: 11.5pt;
    line-height: 1.55;
    color: #4a4d3f;
    max-width: 140mm;
    margin: 0 0 10mm;
  }
  .cover-image {
    width: 100%;
    height: 100mm;
    object-fit: cover;
    border-radius: 3mm;
    display: block;
  }

  .content {
    padding: 0;
  }
  .intro {
    font-family: -apple-system, 'Segoe UI', Helvetica, Arial, sans-serif;
    font-size: 11.5pt;
    line-height: 1.6;
    color: #4a4d3f;
    border-left: 3px solid #d99a7c;
    padding-left: 6mm;
    margin: 0 0 10mm;
  }

  .block {
    break-inside: avoid;
    margin-bottom: 7mm;
  }
  h2 {
    font-size: 15pt;
    font-weight: 500;
    color: #262e1c;
    margin: 0 0 3mm;
  }
  .subheading {
    font-family: -apple-system, 'Segoe UI', Helvetica, Arial, sans-serif;
    font-style: italic;
    color: #b97650;
    font-size: 10.5pt;
    margin: 0 0 2.5mm;
  }
  p {
    font-family: -apple-system, 'Segoe UI', Helvetica, Arial, sans-serif;
    font-size: 10.5pt;
    line-height: 1.55;
    color: #333d26;
    margin: 0 0 2.5mm;
  }
  ul {
    font-family: -apple-system, 'Segoe UI', Helvetica, Arial, sans-serif;
    font-size: 10.5pt;
    line-height: 1.5;
    color: #333d26;
    margin: 0 0 2.5mm;
    padding-left: 5mm;
  }
  li { margin-bottom: 1mm; }
  li::marker { color: #d99a7c; }
  .note {
    font-size: 10pt;
    color: #4a4d3f;
    background: #dfe3d2;
    border-radius: 2mm;
    padding: 3mm 4mm;
    margin-top: 2mm;
  }

  .figure {
    break-inside: avoid;
    margin: 0 0 8mm;
  }
  .figure img {
    width: 100%;
    height: 55mm;
    object-fit: cover;
    border-radius: 3mm;
  }
</style>
</head>
<body>
  <div class="cover">
    <p class="cover-eyebrow">${esc(dict.nav.name)} &middot; ${esc(subtitle)}</p>
    <h1 class="cover-title">${esc(prep.heading)}</h1>
    <p class="cover-sub">${esc(cover)}</p>
    <img class="cover-image" src="${COVER_IMAGE}" />
  </div>

  <div class="content">
    <p class="intro">${esc(prep.intro)}</p>
    ${sectionsHtml}
  </div>
</body>
</html>`;
}

async function main() {
  await mkdir(publicDir, { recursive: true });
  const tmpDir = await mkdtemp(path.join(os.tmpdir(), "prep-pdf-"));
  const browser = await chromium.launch();

  for (const lang of LANGS) {
    const page = await browser.newPage();
    const tmpHtmlPath = path.join(tmpDir, `before-session-${lang.code}.html`);
    await writeFile(tmpHtmlPath, buildHtml(lang), "utf8");
    await page.goto(`file://${tmpHtmlPath}`, { waitUntil: "networkidle" });

    const outPath = path.join(publicDir, `before-session-${lang.code}.pdf`);
    await page.pdf({
      path: outPath,
      format: "A4",
      printBackground: true,
      margin: { top: "18mm", bottom: "16mm", left: "20mm", right: "20mm" },
      displayHeaderFooter: true,
      headerTemplate: "<div></div>",
      footerTemplate: `
        <div style="width:100%; font-family: -apple-system, Helvetica, Arial, sans-serif; font-size:8pt; color:#8a8f78; text-align:center; padding-top:2mm;">
          ${esc(lang.footerName)} &nbsp;&middot;&nbsp; <span class="pageNumber"></span> / <span class="totalPages"></span>
        </div>
      `,
    });
    console.log(`Wrote ${outPath}`);
    await page.close();
  }

  await browser.close();
  await rm(tmpDir, { recursive: true, force: true });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
