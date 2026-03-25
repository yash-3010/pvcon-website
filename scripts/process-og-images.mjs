/**
 * OG Image Processor — Sharp-based pipeline for social sharing images.
 *
 * Produces:
 *   • public/images/og-image.webp          — site-wide OG image (from public/images/og/original.*)
 *   • public/images/blog/og/{slug}.webp    — per-blog OG images with title overlay
 *
 * Usage:
 *   npm run og:process              # process all
 *   npm run og:process -- --blog    # blog images only
 *   npm run og:process -- --site    # site image only
 */

import sharp from "sharp";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const ROOT = process.cwd();
const OG_WIDTH = 1200;
const OG_HEIGHT = 630;
const MAX_SIZE_KB = 500; // target < 600 KB (with safety margin)

// ── Brand colours ───────────────────────────────────────────────────────────
const PRIMARY = "#92b353";
const SECONDARY = "#202f63";

// ── Paths ───────────────────────────────────────────────────────────────────
const SITE_OG_DIR = path.join(ROOT, "public/images/og");
const SITE_OG_OUT = path.join(ROOT, "public/images/og-image.webp");
const BLOG_IMG_DIR = path.join(ROOT, "public/images/blog");
const BLOG_OG_DIR = path.join(ROOT, "public/images/blog/og");
const CONTENT_DIR = path.join(ROOT, "src/content/blog");

// ── Helpers ─────────────────────────────────────────────────────────────────

/** Escape XML special characters */
function esc(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/** Word-wrap text into lines that fit within maxChars */
function wrapText(text, maxChars = 32) {
  const words = text.split(" ");
  const lines = [];
  let line = "";

  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (candidate.length > maxChars && line) {
      lines.push(line);
      line = word;
    } else {
      line = candidate;
    }
  }
  if (line) lines.push(line);
  return lines.slice(0, 3); // max 3 lines
}

/** Build an SVG overlay with gradient, title, PVCON badge, and CTA */
function buildOverlaySvg(titleLines) {
  const fontSize = 38;
  const lineHeight = 50;
  // Position title so the last line is ~90px from bottom
  const titleBlockHeight = titleLines.length * lineHeight;
  const titleStartY = OG_HEIGHT - 90 - titleBlockHeight + fontSize;

  const titleMarkup = titleLines
    .map(
      (line, i) =>
        `<text x="60" y="${titleStartY + i * lineHeight}" ` +
        `font-size="${fontSize}" font-weight="700" fill="white" ` +
        `font-family="'Segoe UI','Helvetica Neue',Arial,sans-serif">${esc(line)}</text>`
    )
    .join("\n    ");

  const ctaY = titleStartY + titleLines.length * lineHeight + 12;

  return `<svg width="${OG_WIDTH}" height="${OG_HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%"   stop-color="rgba(0,0,0,0)" />
      <stop offset="35%"  stop-color="rgba(0,0,0,0.05)" />
      <stop offset="70%"  stop-color="rgba(0,0,0,0.45)" />
      <stop offset="100%" stop-color="rgba(0,0,0,0.85)" />
    </linearGradient>
  </defs>

  <!-- Gradient overlay -->
  <rect width="${OG_WIDTH}" height="${OG_HEIGHT}" fill="url(#g)" />

  <!-- Top accent bar -->
  <rect x="0" y="0" width="${OG_WIDTH}" height="5" fill="${PRIMARY}" />

  <!-- PVCON badge -->
  <rect x="48" y="28" width="110" height="36" rx="6" fill="${SECONDARY}" opacity="0.92" />
  <text x="103" y="52" font-size="16" font-weight="700" fill="white"
        font-family="'Segoe UI','Helvetica Neue',Arial,sans-serif" text-anchor="middle">PVCON</text>

  <!-- Title -->
  ${titleMarkup}

  <!-- CTA -->
  <text x="60" y="${ctaY}" font-size="15" fill="${PRIMARY}" font-weight="600"
        font-family="'Segoe UI','Helvetica Neue',Arial,sans-serif">Read on pvcon-website.vercel.app  →</text>
</svg>`;
}

// ── Site OG ─────────────────────────────────────────────────────────────────

async function processSiteOG() {
  if (!fs.existsSync(SITE_OG_DIR)) {
    console.log("⚠️  No public/images/og/ directory — skipping site OG.");
    return;
  }

  const files = fs
    .readdirSync(SITE_OG_DIR)
    .filter((f) => /\.(jpe?g|png|webp)$/i.test(f));

  if (!files.length) {
    console.log("⚠️  No source image in public/images/og/ — skipping site OG.");
    return;
  }

  const src = path.join(SITE_OG_DIR, files[0]);
  console.log(`📷  Site OG source: ${files[0]}`);

  // Resize + crop to 1200×630 — no badge overlay (source image already has branding)
  let quality = 82;
  await sharp(src)
    .resize(OG_WIDTH, OG_HEIGHT, { fit: "cover", position: "attention" })
    .webp({ quality })
    .toFile(SITE_OG_OUT);

  // Shrink if needed
  let size = fs.statSync(SITE_OG_OUT).size;
  while (size > MAX_SIZE_KB * 1024 && quality > 40) {
    quality -= 10;
    await sharp(src)
      .resize(OG_WIDTH, OG_HEIGHT, { fit: "cover", position: "attention" })
      .webp({ quality })
      .toFile(SITE_OG_OUT);
    size = fs.statSync(SITE_OG_OUT).size;
  }

  console.log(`   ✅  og-image.webp — ${(size / 1024).toFixed(1)} KB (q${quality})\n`);
}

// ── Blog OG ─────────────────────────────────────────────────────────────────

async function processBlogOG() {
  fs.mkdirSync(BLOG_OG_DIR, { recursive: true });

  const mdxFiles = fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".mdx"));

  if (!mdxFiles.length) {
    console.log("⚠️  No blog posts found — skipping blog OG.");
    return;
  }

  console.log(`📝  Processing ${mdxFiles.length} blog OG images…\n`);

  for (const mdxFile of mdxFiles) {
    const slug = mdxFile.replace(".mdx", "");
    const src = path.join(BLOG_IMG_DIR, `${slug}.webp`);

    if (!fs.existsSync(src)) {
      console.log(`   ⚠️  ${slug} — no source image, skipping`);
      continue;
    }

    // Read title from frontmatter
    const raw = fs.readFileSync(path.join(CONTENT_DIR, mdxFile), "utf8");
    const { data } = matter(raw);
    const title = data.title || slug.replace(/-/g, " ");
    const titleLines = wrapText(title, 34);
    const overlaySvg = buildOverlaySvg(titleLines);

    const outPath = path.join(BLOG_OG_DIR, `${slug}.webp`);

    let quality = 80;
    await sharp(src)
      .resize(OG_WIDTH, OG_HEIGHT, { fit: "cover", position: "attention" })
      .composite([{ input: Buffer.from(overlaySvg), gravity: "center" }])
      .webp({ quality })
      .toFile(outPath);

    // Auto-shrink until under budget
    let size = fs.statSync(outPath).size;
    while (size > MAX_SIZE_KB * 1024 && quality > 40) {
      quality -= 10;
      await sharp(src)
        .resize(OG_WIDTH, OG_HEIGHT, { fit: "cover", position: "attention" })
        .composite([{ input: Buffer.from(overlaySvg), gravity: "center" }])
        .webp({ quality })
        .toFile(outPath);
      size = fs.statSync(outPath).size;
    }

    console.log(`   ✅  ${slug} — ${(size / 1024).toFixed(1)} KB (q${quality})`);
  }
}

// ── Main ────────────────────────────────────────────────────────────────────

async function main() {
  const args = process.argv.slice(2);
  const blogOnly = args.includes("--blog");
  const siteOnly = args.includes("--site");

  console.log("\n🖼️  OG Image Processor\n" + "─".repeat(40) + "\n");

  if (!blogOnly) await processSiteOG();
  if (!siteOnly) await processBlogOG();

  console.log("\n" + "─".repeat(40));
  console.log("✅  All done!\n");
}

main().catch((err) => {
  console.error("❌  Error:", err);
  process.exit(1);
});
