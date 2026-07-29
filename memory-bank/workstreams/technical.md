# Technical Context

### Stack

- Static site served from repo root.
- Main files: `index.html`, `styles.css`, `script.js`, `content.js`.
- Assets live in `assets/images/` and `assets/docs/`.

### Constraints

- No heavy frontend framework.
- Safe visuals should be HTML/CSS/SVG based or otherwise sanitized for public use.
- Repo currently contains user changes in the main site files, so edits must layer on top of the working tree rather than revert it.

# System Patterns

### Content Pattern

- Keep portfolio copy and repeatable content structures in `content.js`.
- Generate `index.html`, case pages, `sitemap.xml`, and `robots.txt` from `scripts/build.mjs`.
- Keep `script.js` for progressive enhancement only; the public content must remain readable without JavaScript.

### Visual Pattern

- Executive editorial layout with strong typography, restrained motion, and limited accent colors.
- Prefer section composition, dividers, and rhythm over dense card mosaics.
- Use safe abstract visuals instead of real employer product screenshots.
