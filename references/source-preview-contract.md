# Source Preview Contract

Use this reference when adding or changing UI examples in this repository.

## Contract

Every UI shown in the README must have:

- One source file committed in `cases/` or `themes/`.
- One PNG preview committed in `assets/previews/` or `assets/theme-previews/`.
- One entry in `assets/ui-catalog.json`.
- A source link beside the preview in `README.md`.

## Naming

- Single-screen case source: `cases/<number>-<slug>/index.html`
- Single-screen preview: `assets/previews/<number>-<slug>.png`
- Theme screen source: `themes/<number>-<theme>/<screen>.html`
- Theme screen preview: `assets/theme-previews/<number>-<theme>-<screen>.png`

Use lowercase slugs, numbers with two digits, and descriptive screen names such as `home`, `checkout`, `visit`, or `analytics`.

## Verification

Run:

```bash
node scripts/verify-assets.mjs
python C:\Users\harzva\.codex\skills\.system\skill-creator\scripts\quick_validate.py .
```

The verifier checks PNG dimensions, minimum file size, source existence, preview existence, theme screen counts, and catalog consistency.

## README Rule

The README is the portfolio surface. Keep it visual, but keep every image honest: if an image is shown, its source path should be adjacent or obvious in the same table.
