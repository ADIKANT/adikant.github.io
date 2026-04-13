# Tech Context

## Stack

- Static site served from repo root.
- Main files: `index.html`, `styles.css`, `script.js`, `content.js`.
- Assets live in `assets/images/` and `assets/docs/`.

## Constraints

- No heavy frontend framework.
- Safe visuals should be HTML/CSS/SVG based or otherwise sanitized for public use.
- Repo currently contains user changes in the main site files, so edits must layer on top of the working tree rather than revert it.
