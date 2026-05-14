import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const casesDir = path.join(root, "cases");
const previewsDir = path.join(root, "assets", "previews");
const themesDir = path.join(root, "themes");
const themePreviewsDir = path.join(root, "assets", "theme-previews");
const catalogPath = path.join(root, "assets", "ui-catalog.json");

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

if (!existsSync(catalogPath)) {
  errors.push("Missing catalog: assets/ui-catalog.json");
} else {
  try {
    const catalog = JSON.parse(readFileSync(catalogPath, "utf8"));
    const singleCases = Array.isArray(catalog.singleCases) ? catalog.singleCases : [];
    const themeSuites = Array.isArray(catalog.themeSuites) ? catalog.themeSuites : [];
    const themeScreenCount = themeSuites.reduce((total, theme) => {
      return total + (Array.isArray(theme.screens) ? theme.screens.length : 0);
    }, 0);

    if (catalog.version !== "1.1.0") {
      errors.push(`Catalog version should be 1.1.0, found ${catalog.version || "(missing)"}`);
    }

    if (singleCases.length !== 10) {
      errors.push(`Catalog should list 10 single cases, found ${singleCases.length}`);
    }

    if (themeSuites.length !== 5) {
      errors.push(`Catalog should list 5 theme suites, found ${themeSuites.length}`);
    }

    if (themeScreenCount !== 15) {
      errors.push(`Catalog should list 15 theme screens, found ${themeScreenCount}`);
    }

    for (const item of singleCases) {
      if (!item.id || !item.source || !item.preview) {
        errors.push(`Catalog single case is missing id/source/preview: ${JSON.stringify(item)}`);
        continue;
      }
      if (!existsSync(path.join(root, item.source))) {
        errors.push(`Catalog source missing: ${item.source}`);
      }
      if (!existsSync(path.join(root, item.preview))) {
        errors.push(`Catalog preview missing: ${item.preview}`);
      }
    }

    for (const theme of themeSuites) {
      if (!theme.id || !Array.isArray(theme.screens)) {
        errors.push(`Catalog theme is missing id/screens: ${JSON.stringify(theme)}`);
        continue;
      }
      if (theme.screens.length < 3) {
        errors.push(`Catalog theme ${theme.id} should list at least 3 screens`);
      }
      for (const screen of theme.screens) {
        if (!screen.name || !screen.source || !screen.preview) {
          errors.push(`Catalog theme screen is missing name/source/preview: ${JSON.stringify(screen)}`);
          continue;
        }
        if (!existsSync(path.join(root, screen.source))) {
          errors.push(`Catalog source missing: ${screen.source}`);
        }
        if (!existsSync(path.join(root, screen.preview))) {
          errors.push(`Catalog preview missing: ${screen.preview}`);
        }
      }
    }
  } catch (error) {
    errors.push(`Invalid catalog JSON: ${error.message}`);
  }
}

if (errors.length > 0) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`Verified ${cases.length} cases, ${verifiedPreviews - cases.length} theme screens, and assets/ui-catalog.json.`);
