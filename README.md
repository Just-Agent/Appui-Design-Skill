<div align="center">

# Appui-Design-Skill

**A practical Codex skill for designing mobile app UI screens with real screenshots and matching source code.**  
一个面向移动 App UI 的高质量技能仓库：先研究模式，再产出可复用源码、可验证截图和 README-ready 案例库。

![Skill](https://img.shields.io/badge/Codex-Skill-111111?style=flat-square)
![Cases](https://img.shields.io/badge/UI%20Cases-10-1f6f56?style=flat-square)
![Source](https://img.shields.io/badge/Source-HTML%2FCSS-c98d35?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)

</div>

<p align="center">
  <img src="assets/previews/01-finance-command.png" width="210" alt="Finance Command app UI preview" />
  <img src="assets/previews/04-food-market.png" width="210" alt="Food Market app UI preview" />
  <img src="assets/previews/08-fashion-wardrobe.png" width="210" alt="Fashion Wardrobe app UI preview" />
</p>

## Why This Skill Exists

The original reference idea was useful but too light for real UI work. This repository turns **mobile app UI design** into a repeatable workflow:

- Research platform conventions and current app UI patterns.
- Design screens around product domains, not generic template colors.
- Ship **10 complete mobile UI cases** with generated PNG previews.
- Keep every screenshot connected to source code.
- Package the result as a Codex skill with references, scripts, and validation.

## Case Gallery

| Preview | Case | What It Demonstrates | Source |
|---|---|---|---|
| <img src="assets/previews/01-finance-command.png" width="160" alt="Finance Command" /> | **Finance Command** | Personal finance dashboard, spend review, cash flow bars | [`cases/01-finance-command/index.html`](cases/01-finance-command/index.html) |
| <img src="assets/previews/02-wellness-rhythm.png" width="160" alt="Wellness Rhythm" /> | **Wellness Rhythm** | Mood score, habit recovery, gentle coaching state | [`cases/02-wellness-rhythm/index.html`](cases/02-wellness-rhythm/index.html) |
| <img src="assets/previews/03-travel-scout.png" width="160" alt="Travel Scout" /> | **Travel Scout** | Trip map, itinerary, offline route confidence | [`cases/03-travel-scout/index.html`](cases/03-travel-scout/index.html) |
| <img src="assets/previews/04-food-market.png" width="160" alt="Food Market" /> | **Food Market** | Search, category chips, hero dish, cart intent | [`cases/04-food-market/index.html`](cases/04-food-market/index.html) |
| <img src="assets/previews/05-learning-lab.png" width="160" alt="Learning Lab" /> | **Learning Lab** | Course progress, lesson stack, streak and practice queue | [`cases/05-learning-lab/index.html`](cases/05-learning-lab/index.html) |
| <img src="assets/previews/06-music-studio.png" width="160" alt="Music Studio" /> | **Music Studio** | Audio player, waveform, mix controls, library tabs | [`cases/06-music-studio/index.html`](cases/06-music-studio/index.html) |
| <img src="assets/previews/07-home-energy.png" width="160" alt="Home Energy" /> | **Home Energy** | Smart home dashboard, energy gauge, room controls | [`cases/07-home-energy/index.html`](cases/07-home-energy/index.html) |
| <img src="assets/previews/08-fashion-wardrobe.png" width="160" alt="Fashion Wardrobe" /> | **Fashion Wardrobe** | Outfit planning, closet source, visual merchandising | [`cases/08-fashion-wardrobe/index.html`](cases/08-fashion-wardrobe/index.html) |
| <img src="assets/previews/09-medical-companion.png" width="160" alt="Medical Companion" /> | **Medical Companion** | Care plan, vitals, medication and timeline states | [`cases/09-medical-companion/index.html`](cases/09-medical-companion/index.html) |
| <img src="assets/previews/10-social-events.png" width="160" alt="Social Events" /> | **Social Events** | Event discovery, date filtering, RSVP card | [`cases/10-social-events/index.html`](cases/10-social-events/index.html) |

## Use As A Codex Skill

Clone the repository into your Codex skills directory:

```bash
git clone https://github.com/Just-Agent/Appui-Design-Skill ~/.codex/skills/appui-design-skill
```

Then invoke it with prompts like:

```text
Use $appui-design-skill to design a finance app dashboard with screenshots and source code.
```

```text
Use $appui-design-skill to create three mobile onboarding screen concepts for a travel app.
```

## Regenerate Screenshots

The screenshots are generated from the case HTML files using installed Chrome or Edge. No npm dependencies are required.

```bash
node scripts/render-previews.mjs
node scripts/verify-assets.mjs
```

If the browser is not found automatically, set `CHROME_PATH` to a Chromium-compatible executable.

## Repository Structure

```text
Appui-Design-Skill/
├─ SKILL.md
├─ agents/openai.yaml
├─ references/
│  ├─ app-ui-playbook.md
│  ├─ case-catalog.md
│  └─ research-notes.md
├─ cases/
│  ├─ shared/app-ui.css
│  └─ 01-finance-command ... 10-social-events/
├─ assets/previews/
├─ scripts/render-previews.mjs
└─ scripts/verify-assets.mjs
```

## Research Foundation

The skill draws from platform guidance and current UI pattern research, then produces original screens instead of copying gallery shots.

- [Apple Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines)
- [Apple Layout guidance](https://developer.apple.com/design/Human-Interface-Guidelines/layout)
- [Android adaptive layouts](https://developer.android.com/develop/ui/compose/layouts/adaptive)
- [Android adaptive apps](https://developer.android.com/adaptive-apps)
- [Material Design navigation bar](https://m3.material.io/components/navigation-bar/overview)
- [Awwwards Mobile UI collection](https://www.awwwards.com/awwwards/collections/mobile-ui/)
- [Mobbin overview example](https://www.ui-tools.com/product/mobbin)

## What Makes It Different

Most UI inspiration packs stop at images. This repository keeps the whole chain visible:

| Layer | Included |
|---|---|
| Skill trigger and workflow | `SKILL.md` |
| Research and design rules | `references/` |
| Reusable implementation style | `cases/shared/app-ui.css` |
| 10 original UI cases | `cases/*/index.html` |
| Screenshot output | `assets/previews/*.png` |
| Verification | `scripts/verify-assets.mjs` |

## License

MIT. Use the skill, remix the cases, and adapt the workflow for your own app UI projects.
