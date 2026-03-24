/**
 * Gallery Image Processor
 *
 * Reads all images from public/images/gallery/originals/,
 * processes them with Sharp (resize, optimize, auto-rotate),
 * outputs optimized WebP to public/images/gallery/,
 * and generates a metadata JSON file at src/data/gallery/images.json.
 *
 * Usage:
 *   node scripts/process-gallery.mjs
 *
 * Supported input formats: JPEG, PNG, WebP, AVIF, TIFF, GIF
 *
 * The script:
 *   1. Auto-rotates based on EXIF orientation
 *   2. Resizes to max 1200px on the longest side (preserving aspect ratio)
 *   3. Generates a small 20px blur placeholder for lazy loading
 *   4. Outputs optimized WebP at quality 80
 *   5. Writes metadata (width, height, aspect ratio, blur placeholder) to images.json
 */

import fs from "fs";
import path from "path";
import sharp from "sharp";

const ORIGINALS_DIR = path.resolve("public/images/gallery/originals");
const OUTPUT_DIR = path.resolve("public/images/gallery");
const METADATA_PATH = path.resolve("src/data/gallery/images.json");
const MAX_DIMENSION = 1200;
const WEBP_QUALITY = 80;
const BLUR_SIZE = 20;
const SUPPORTED_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp", ".avif", ".tiff", ".tif", ".gif"];

async function processImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const baseName = path.basename(filePath, ext);
  const slug = baseName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  const outputFileName = `${slug}.webp`;
  const outputPath = path.join(OUTPUT_DIR, outputFileName);

  // Process with sharp — auto-rotate from EXIF, resize, convert to WebP
  const image = sharp(filePath).rotate(); // .rotate() with no args = auto-rotate from EXIF
  const metadata = await image.metadata();

  // Calculate resize dimensions (fit within MAX_DIMENSION box)
  const width = metadata.width || 800;
  const height = metadata.height || 600;
  const isLandscape = width >= height;
  const resizeOpts = isLandscape
    ? { width: Math.min(width, MAX_DIMENSION) }
    : { height: Math.min(height, MAX_DIMENSION) };

  // Generate optimized WebP
  const outputInfo = await image
    .resize(resizeOpts)
    .webp({ quality: WEBP_QUALITY })
    .toFile(outputPath);

  // Generate tiny blur placeholder (base64 data URL)
  const blurBuffer = await sharp(filePath)
    .rotate()
    .resize(BLUR_SIZE)
    .webp({ quality: 20 })
    .toBuffer();
  const blurDataURL = `data:image/webp;base64,${blurBuffer.toString("base64")}`;

  console.log(`  ✓ ${path.basename(filePath)} → ${outputFileName} (${outputInfo.width}×${outputInfo.height})`);

  return {
    src: `/images/gallery/${outputFileName}`,
    width: outputInfo.width,
    height: outputInfo.height,
    aspectRatio: +(outputInfo.width / outputInfo.height).toFixed(4),
    blurDataURL,
    slug,
    // Default title/description — user should update these in images.json
    title: baseName.replace(/[-_]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
    description: "",
  };
}

async function main() {
  // Ensure directories exist
  if (!fs.existsSync(ORIGINALS_DIR)) {
    fs.mkdirSync(ORIGINALS_DIR, { recursive: true });
    console.log(`📁 Created ${ORIGINALS_DIR}`);
    console.log(`   Place your gallery images there and run this script again.`);
    return;
  }

  const files = fs
    .readdirSync(ORIGINALS_DIR)
    .filter((f) => SUPPORTED_EXTENSIONS.includes(path.extname(f).toLowerCase()))
    .sort();

  if (files.length === 0) {
    console.log(`⚠️  No images found in ${ORIGINALS_DIR}`);
    console.log(`   Supported formats: ${SUPPORTED_EXTENSIONS.join(", ")}`);
    return;
  }

  console.log(`🖼️  Processing ${files.length} image(s)...\n`);

  // Load existing metadata to preserve user-edited titles/descriptions
  let existingMetadata = {};
  if (fs.existsSync(METADATA_PATH)) {
    try {
      const existing = JSON.parse(fs.readFileSync(METADATA_PATH, "utf-8"));
      for (const img of existing) {
        existingMetadata[img.slug] = { title: img.title, description: img.description };
      }
    } catch {
      // ignore parse errors
    }
  }

  const results = [];
  for (const file of files) {
    try {
      const result = await processImage(path.join(ORIGINALS_DIR, file));

      // Preserve existing user-edited title/description
      if (existingMetadata[result.slug]) {
        result.title = existingMetadata[result.slug].title || result.title;
        result.description = existingMetadata[result.slug].description || result.description;
      }

      results.push(result);
    } catch (err) {
      console.error(`  ✗ Failed to process ${file}: ${err.message}`);
    }
  }

  // Write metadata JSON
  fs.writeFileSync(METADATA_PATH, JSON.stringify(results, null, 2));
  console.log(`\n✅ Done! ${results.length} image(s) processed.`);
  console.log(`   Optimized images: ${OUTPUT_DIR}`);
  console.log(`   Metadata: ${METADATA_PATH}`);
  console.log(`\n📝 Edit ${METADATA_PATH} to update titles and descriptions.`);
}

main().catch(console.error);
