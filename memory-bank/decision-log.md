# Decision Log

## 2026-04-10

- Adopted a lightweight `memory-bank/` because the repo previously had no durable project memory.
- Chosen implementation pattern: static HTML shell plus `content.js` data layer and JS rendering.
- Chosen safety policy: remove all current dashboard screenshots from the public repo and replace them with safe visual abstractions.
- Added dedicated safe SVG assets for favicon and social preview instead of reusing the portrait or internal screenshots.
- Added a resized `profile-hero.jpg` for the live page so the hero does not load the original 2.3 MB portrait.

## 2026-05-07

- Keep request evidence out of the public UI as internal-tool wording; use only aggregate task-flow proof such as 180 tasks received, about 150 implemented, and 82% completion.
- Keep case detail in progressive disclosure so the first scan stays executive-level while hiring managers can expand proof when needed.
- Treat technical stack as support for managing BI at the data-platform boundary, not as the center of the portfolio; avoid defensive wording about "sufficient depth".
- Ignore local `materials for future dev/` so internal evidence CSVs and prompt material are not accidentally committed.
- Consolidate cases when overlap weakens the scan: Atom self-service belongs inside request delivery, and both Mars revenue/control stories work better as one commercial-impact case.
- Use the attached architecture deck only as source context for a simplified public diagram; do not reproduce internal architecture pages, internal system details, or operational URLs on the site.
- Prefer right-side visual metric blocks over repeating the same case results in left-side prose when the metric is already visible in the card.
