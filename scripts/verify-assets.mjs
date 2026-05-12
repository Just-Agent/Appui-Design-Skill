import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const casesDir = path.join(root, "cases");
const previewsDir = path.join(root, "assets", "previews");

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
  } catch (error) {
    errors.push(error.message);
  }
}

if (errors.length > 0) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`Verified ${cases.length} cases with matching PNG previews.`);
