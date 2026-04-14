/**
 * Generate PDF by screenshotting each slide of the live presentation.
 * - Crops out top banner (MOTTO Digital + step numbers)
 * - Adds clickable links on the closing slide
 * - Retina quality (2x)
 *
 * Usage: node scripts/generate-pdf.mjs [--url <base-url>]
 * Default: http://localhost:3000
 */

import { chromium } from "playwright";
import { writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const baseUrl = process.argv.includes("--url")
  ? process.argv[process.argv.indexOf("--url") + 1]
  : "http://localhost:3000";

const outputPath = resolve(__dirname, "../public/aios-presentation.pdf");

const SLIDES = [
  { name: "title", steps: 2 },
  { name: "toolBanner", steps: 1 },
  { name: "caseStudiesIntro", steps: 1 },
  { name: "caseRakuten", steps: 1 },
  { name: "caseNri", steps: 1 },
  { name: "caseClassmethod", steps: 1 },
  { name: "casePanasonic", steps: 1 },
  { name: "caseKnowledgework", steps: 1 },
  { name: "automationFront", steps: 1 },
  { name: "automationBack", steps: 1 },
  { name: "problem", steps: 3 },
  { name: "era2024", steps: 3 },
  { name: "era2025", steps: 3 },
  { name: "brainbody", steps: 3 },
  { name: "cli", steps: 3 },
  { name: "ownership", steps: 2 },
  { name: "selfimprove", steps: 3 },
  { name: "valueProps", steps: 2 },
  { name: "program", steps: 2 },
  { name: "pricing", steps: 2 },
  { name: "guarantee", steps: 1 },
  { name: "closing", steps: 1 },
];

// Top banner height to crop out (progress bar + MOTTO Digital header)
const BANNER_HEIGHT = 42;
const VIEWPORT_W = 1280;
const VIEWPORT_H = 720;
const SLIDE_H = VIEWPORT_H - BANNER_HEIGHT;

async function generatePDF() {
  console.log(`Generating PDF from ${baseUrl}/presentation ...`);
  console.log(`${SLIDES.length} slides to capture (cropping top ${BANNER_HEIGHT}px banner)\n`);

  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: VIEWPORT_W, height: VIEWPORT_H },
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();

  await page.goto(`${baseUrl}/presentation`, {
    waitUntil: "networkidle",
    timeout: 30000,
  });
  await page.waitForTimeout(1500);

  const screenshots = [];
  let currentGlobalStep = 0;

  for (let slideIdx = 0; slideIdx < SLIDES.length; slideIdx++) {
    const slide = SLIDES[slideIdx];
    const targetStep = currentGlobalStep + slide.steps - 1;

    while (currentGlobalStep < targetStep) {
      await page.keyboard.press("ArrowRight");
      await page.waitForTimeout(300);
      currentGlobalStep++;
    }
    await page.waitForTimeout(600);

    // Screenshot below the banner
    const screenshot = await page.screenshot({
      clip: { x: 0, y: BANNER_HEIGHT, width: VIEWPORT_W, height: SLIDE_H },
      type: "png",
    });
    screenshots.push(screenshot);
    console.log(`  [${slideIdx + 1}/${SLIDES.length}] ${slide.name}`);

    if (slideIdx < SLIDES.length - 1) {
      await page.keyboard.press("ArrowRight");
      await page.waitForTimeout(300);
      currentGlobalStep++;
    }
  }

  await browser.close();

  // Assemble into PDF with clickable links on the closing slide
  console.log("\nAssembling PDF...");

  const browser2 = await chromium.launch();
  const context2 = await browser2.newContext();
  const page2 = await context2.newPage();

  const slideWidth = VIEWPORT_W;
  const slideHeight = SLIDE_H;

  const imagesHtml = screenshots
    .map((buf, i) => {
      const b64 = buf.toString("base64");
      // Add clickable links on the closing slide (last slide)
      const isClosing = i === screenshots.length - 1;
      const links = isClosing
        ? `<a href="https://aios.mottodigital.jp/audit" style="position:absolute;left:10%;top:35%;width:35%;height:30%;z-index:10;" title="無料AI活用診断"></a>
           <a href="https://aios.mottodigital.jp/signup" style="position:absolute;right:10%;top:35%;width:35%;height:30%;z-index:10;" title="席を確保する"></a>
           <a href="mailto:aios@mottodigital.jp" style="position:absolute;left:30%;bottom:10%;width:15%;height:5%;z-index:10;" title="Email"></a>
           <a href="https://linkedin.com/in/lewisrice" style="position:absolute;left:45%;bottom:10%;width:20%;height:5%;z-index:10;" title="LinkedIn"></a>
           <a href="https://aios.mottodigital.jp" style="position:absolute;right:25%;bottom:10%;width:15%;height:5%;z-index:10;" title="Website"></a>`
        : "";
      return `<div class="slide" style="position:relative;"><img src="data:image/png;base64,${b64}" />${links}</div>`;
    })
    .join("\n");

  const html = `<!DOCTYPE html>
<html>
<head>
<style>
  @page { size: ${slideWidth}px ${slideHeight}px; margin: 0; }
  * { margin: 0; padding: 0; }
  body { background: white; }
  .slide {
    width: ${slideWidth}px;
    height: ${slideHeight}px;
    page-break-after: always;
    overflow: hidden;
  }
  .slide:last-child { page-break-after: auto; }
  .slide img {
    width: ${slideWidth}px;
    height: ${slideHeight}px;
    display: block;
    object-fit: contain;
  }
  a { display: block; }
</style>
</head>
<body>${imagesHtml}</body>
</html>`;

  await page2.setContent(html, { waitUntil: "load" });
  await page2.waitForTimeout(500);

  const pdf = await page2.pdf({
    width: `${slideWidth}px`,
    height: `${slideHeight}px`,
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
  });

  writeFileSync(outputPath, pdf);
  console.log(`\nPDF saved to ${outputPath} (${(pdf.length / 1024 / 1024).toFixed(1)}MB)`);

  await browser2.close();
}

generatePDF().catch((err) => {
  console.error("PDF generation failed:", err);
  process.exit(1);
});
