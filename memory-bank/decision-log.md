# Decision Log

## 2026-04-10

- Adopted a lightweight `memory-bank/` because the repo previously had no durable project memory.
- Chosen implementation pattern: static HTML shell plus `content.js` data layer and JS rendering.
- Chosen safety policy: remove all current dashboard screenshots from the public repo and replace them with safe visual abstractions.
- Added dedicated safe SVG assets for favicon and social preview instead of reusing the portrait or internal screenshots.
- Added a resized `profile-hero.jpg` for the live page so the hero does not load the original 2.3 MB portrait.
