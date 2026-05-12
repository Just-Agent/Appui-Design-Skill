---
name: appui-design-skill
description: Create polished mobile app UI concepts, high-fidelity single-screen prototypes, design systems, screenshots, and matching source code for iOS, Android, and mobile web apps. Use when Codex is asked for app UI design, mobile screen concepts, app design case studies, UI inspiration research, README-ready screenshot galleries, or HTML/CSS/React source for mobile app screens.
---

# App UI Design Skill

## Overview

Use this skill to research, design, implement, and package mobile app UI screens with production-minded detail. The expected output is not only a pretty mockup: it should include a reusable design rationale, source code, generated preview images, and verification notes.

## Workflow

1. Define the app surface: platform, screen purpose, user intent, primary action, data density, and navigation model.
2. Research only when useful or requested. Prefer current production references and official platform guidance, then remix patterns into original work instead of copying screenshots.
3. Pick an archetype from `references/case-catalog.md` or create a new one with a distinct product domain, content model, and visual direction.
4. Load `references/app-ui-playbook.md` before implementation when the task needs layout, accessibility, responsive, or screenshot guidance.
5. Implement the UI as working source code. For this repository's cases, use standalone HTML/CSS in `cases/<case-slug>/index.html`; for user projects, follow the target framework already in use.
6. Generate previews from the actual source. In this repository, run `node scripts/render-previews.mjs` to create PNG screenshots in `assets/previews/`.
7. Validate the deliverable: check text fit, touch target size, hierarchy, contrast, bottom navigation meaning, viewport behavior, and whether the screenshot matches the source.
8. Package the result with links from screenshot to source when making a README or gallery.

## Quality Bar

- Make the first viewport immediately legible: app name, current task, primary content, and primary action should be visible without explanation.
- Design for thumb reach: place frequent actions and top-level navigation near the lower half of the screen when appropriate.
- Keep navigation disciplined: bottom tabs are for three to five top-level destinations; avoid mixing them with one-off actions.
- Use realistic content. Avoid placeholder-heavy screens; include numbers, labels, dates, empty/error hints, or state details that fit the domain.
- Keep density intentional. Operational apps can be dense; consumer apps should still have hierarchy and breathing room.
- Include state depth where it matters: selected tabs, active chips, progress, alerts, disabled states, loading hints, or next actions.
- Use accessible tap targets, readable type, and contrast that survives screenshot compression.
- Vary aesthetics by domain. Do not reuse one palette, one card style, or one generic dashboard pattern across unrelated apps.

## Repository Resources

- `references/app-ui-playbook.md`: practical design and implementation workflow.
- `references/case-catalog.md`: ten included mobile app UI examples and the patterns they demonstrate.
- `references/research-notes.md`: source-informed notes from platform guidance and UI inspiration research.
- `cases/`: standalone HTML source code for each mobile app UI case.
- `assets/previews/`: generated screenshots for README and gallery use.
- `themes/`: five multi-screen app themes, each showing several functional screens for one product.
- `assets/theme-previews/`: generated screenshots for every theme screen.
- `scripts/render-previews.mjs`: dependency-free Chrome/Edge screenshot renderer.
- `scripts/verify-assets.mjs`: checks that the case/source/preview set is complete.

## Output Checklist

When using this skill for a deliverable, return:

- A short design rationale tied to the user's product domain.
- Preview image paths or links generated from the implementation.
- Source code paths for every shown UI.
- Verification notes, including what was checked and any remaining risks.
