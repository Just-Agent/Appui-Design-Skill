import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readdirSync, rmSync, statSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";
import os from "node:os";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const casesDir = path.join(root, "cases");
const previewsDir = path.join(root, "assets", "previews");

const browserCandidates = [
  process.env.CHROME_PATH,
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium-browser",
  "/usr/bin/chromium"
].filter(Boolean);

const browser = browserCandidates.find((candidate) => existsSync(candidate));

if (!browser) {
  console.error("No Chrome or Edge executable found. Set CHROME_PATH to a Chromium browser.");
  process.exit(1);
}

mkdirSync(previewsDir, { recursive: true });

const cases = readdirSync(casesDir)
  .filter((entry) => statSync(path.join(casesDir, entry)).isDirectory())
  .filter((entry) => /^\d{2}-/.test(entry))
  .sort();

if (cases.length === 0) {
  console.error("No case directories found.");
  process.exit(1);
}

for (const caseName of cases) {
  const input = path.join(casesDir, caseName, "index.html");
  const output = path.join(previewsDir, `${caseName}.png`);
  const profile = path.join(os.tmpdir(), `appui-design-skill-${caseName}`);

  if (!existsSync(input)) {
    console.error(`Missing source: ${input}`);
    process.exit(1);
  }

  rmSync(profile, { recursive: true, force: true });

  const args = [
    "--headless=new",
    "--disable-gpu",
    "--no-first-run",
    "--hide-scrollbars",
    "--allow-file-access-from-files",
    "--run-all-compositor-stages-before-draw",
    "--virtual-time-budget=1800",
    "--window-size=430,932",
    `--user-data-dir=${profile}`,
    `--screenshot=${output}`,
    pathToFileURL(input).href
  ];

  const result = spawnSync(browser, args, { encoding: "utf8" });
  rmSync(profile, { recursive: true, force: true });

  if (result.status !== 0) {
    console.error(`Screenshot failed for ${caseName}`);
    console.error(result.stderr || result.stdout);
    process.exit(result.status || 1);
  }

  console.log(`Rendered ${path.relative(root, output)}`);
}
