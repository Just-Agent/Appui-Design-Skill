# App UI Playbook

Use this playbook when turning a mobile app idea into a high-fidelity screen, source code, and screenshot.

## 1. Product Frame

Define these before drawing:

- Audience: casual consumer, professional operator, creator, patient, traveler, shopper, student, or admin.
- Job: what the user is trying to finish in the current screen.
- Moment: morning check-in, urgent decision, browsing, review, checkout, recovery, planning, or monitoring.
- Primary action: one obvious action above or near the thumb zone.
- Risk: money, health, privacy, time pressure, safety, or reputation.

## 2. Screen Architecture

Prefer one dominant structure per screen:

- Dashboard: status summary, high-signal metrics, next action, recent activity.
- Feed: search/filter, repeated items, ranking cues, save/share controls.
- Detail: hero content, key facts, decision controls, related context.
- Planner: timeline, calendar, tasks, confirmations, reminders.
- Studio: canvas/player/editor, mode switcher, tool controls, output state.
- Marketplace: discovery, category chips, product cards, cart or checkout path.

## 3. Mobile Layout Rules

- Start with a 390 x 844 or 430 x 932 viewport, then adapt upward.
- Use safe-area padding and a stable bottom navigation height.
- Keep frequently tapped controls at least 44 px tall.
- Put destructive or high-risk actions behind a second, quieter confirmation.
- Use fixed-format grids for tiles and toolbars so hover or active states do not shift layout.
- Show selected states clearly in tabs, chips, segmented controls, or lists.

## 4. Visual System

- Choose a domain-specific aesthetic instead of a generic app template.
- Pair one readable text face with one display treatment, but avoid relying on remote font loading.
- Keep cards at 8 px radius or less; reserve larger radii for the simulated device shell.
- Use color semantically: risk, success, progress, inactive, selected, and premium should mean different things.
- Use icons or pictograms for repeated tool actions; text buttons are fine for clear commands.

## 5. Content Standards

- Replace lorem ipsum with believable product content.
- Use units, dates, names, statuses, prices, durations, or labels that match the domain.
- Include at least one secondary state such as progress, due soon, selected, delayed, flagged, saved, muted, or verified.
- Make the app understandable without explaining the UI inside the UI.

## 6. Screenshot Workflow

For this repository:

```bash
node scripts/render-previews.mjs
node scripts/verify-assets.mjs
```

The screenshot renderer uses installed Chrome or Edge and writes previews to `assets/previews/`. The verifier confirms that all ten cases have both source and PNG output.

## 7. Review Checklist

- Does the screen communicate the app category in three seconds?
- Is the primary action visible and reachable?
- Are repeated items aligned and scannable?
- Does the bottom navigation contain only top-level destinations?
- Are numbers, statuses, and labels realistic?
- Does text fit in compact viewport screenshots?
- Does the preview image come from the actual source?
