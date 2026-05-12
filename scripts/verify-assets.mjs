import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const casesDir = path.join(root, "cases");
const previewsDir = path.join(root, "assets", "previews");
const themesDir = path.join(root, "themes");
const themePreviewsDir = path.join(root, "assets", "theme-previews");

function readPngSize(file) {
  const buffer = readFileSync(file);
  const signature = buffer.subarray(0, 8).toString("hex");
  if (signature !== "89504e470d0a1a0a") {
    throw new Error(`${file} is not a PNG`);
  }
  return {
    width: buffer.readUInt32BE(16),
    height: buffer.readUInt32BE(20),
    bytes: buffer.length
  };
}

const cases = readdirSync(casesDir)
  .filter((entry) => statSync(path.join(casesDir, entry)).isDirectory())
  .filter((entry) => /^\d{2}-/.test(entry))
  .sort();

const errors = [];
let verifiedPreviews = 0;

if (cases.length !== 10) {
  errors.push(`Expected 10 cases, found ${cases.length}`);
}

for (const caseName of cases) {
  const source = path.join(casesDir, caseName, "index.html");
  const preview = path.join(previewsDir, `${caseName}.png`);

  if (!existsSync(source)) {
    errors.push(`Missing source: ${path.relative(root, source)}`);
  }

  if (!existsSync(preview)) {
    errors.push(`Missing preview: ${path.relative(root, preview)}`);
    continue;
  }

  try {
    const size = readPngSize(preview);
    if (size.width !== 430 || size.height !== 932) {
      errors.push(`${path.relative(root, preview)} is ${size.width}x${size.height}, expected 430x932`);
    }
    if (size.bytes < 12000) {
      errors.push(`${path.relative(root, preview)} looks too small to be a meaningful screenshot`);
    }
    verifiedPreviews += 1;
  } catch (error) {
    errors.push(error.message);
  }
}

if (!existsSync(themesDir)) {
  errors.push("Missing themes directory");
} else {
  const themes = readdirSync(themesDir)
    .filter((entry) => statSync(path.join(themesDir, entry)).isDirectory())
    .filter((entry) => /^\d{2}-/.test(entry))
    .sort();

  if (themes.length !== 5) {
    errors.push(`Expected 5 multi-screen themes, found ${themes.length}`);
  }

  for (const themeName of themes) {
    const screenFiles = readdirSync(path.join(themesDir, themeName))
      .filter((entry) => entry.endsWith(".html"))
      .sort();

    if (screenFiles.length < 3) {
      errors.push(`${themeName} should include at least 3 UI screens, found ${screenFiles.length}`);
    }

    for (const screenFile of screenFiles) {
      const screenName = path.basename(screenFile, ".html");
      const source = path.join(themesDir, themeName, screenFile);
      const preview = path.join(themePreviewsDir, `${themeName}-${screenName}.png`);

      if (!existsSync(source)) {
        errors.push(`Missing theme source: ${path.relative(root, source)}`);
      }

      if (!existsSync(preview)) {
        errors.push(`Missing theme preview: ${path.relative(root, preview)}`);
        continue;
      }

      try {
        const size = readPngSize(preview);
        if (size.width !== 430 || size.height !== 932) {
          errors.push(`${path.relative(root, preview)} is ${size.width}x${size.height}, expected 430x932`);
        }
        if (size.bytes < 12000) {
          errors.push(`${path.relative(root, preview)} looks too small to be a meaningful screenshot`);
        }
        verifiedPreviews += 1;
      } catch (error) {
        errors.push(error.message);
      }
    }
  }
}

if (errors.length > 0) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`Verified ${cases.length} cases and ${verifiedPreviews - cases.length} theme screens with matching PNG previews.`);
