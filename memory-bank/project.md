# Project Memory

## Purpose

### Goal

Rebuild the public portfolio of Alexander Popov as an executive-profile landing page for head/lead BI and analytics roles.

### Success Criteria

- The first screen explains the value proposition in seconds.
- The page sells Alexander as a function builder, manager, and delivery owner, not only as a hands-on BI specialist.
- The final site is static, GitHub Pages compatible, mobile friendly, and free of placeholders.
- Public assets are safe and do not expose closed tools, task names, or sensitive visuals.

### Scope

- Rework page structure, copy, visual hierarchy, and supporting sections.
- Introduce a structured content layer for easier updates.
- Add basic SEO, social preview, and schema metadata.
- Update repo documentation for future edits.

## Scope

Workspace: `/Users/alexandr/github/adikant.github.io`.

## Critical Constraints

# Repo Rules

- Start with `memory-bank/project-brief.md`, `memory-bank/requirements-ledger.md`, and `memory-bank/active-context.md` before major edits.
- Treat the legacy primary brief outside the repository as lower-priority context if it is available; when it is missing, use the current active source entries in `memory-bank/source-map.md`.
- Preserve the static GitHub Pages stack: plain HTML, CSS, JS, and lightweight assets only.
- Keep the public site fully safe for publishing: no closed Jira screens, no confidential dashboard screenshots, no hidden draft blocks.
- Store editable site copy and structured content in `content.js`; keep layout and styles in `index.html`, `script.js`, and `styles.css`.

## Current State

### Current Slice

Current work is the public portfolio site for Alexander Popov as a руководитель отдела аналитики и BI. The current implementation is the 2026-06-30 lead-portfolio STAR alignment pass on top of the accepted static architecture.

Immediate files for site-editing sessions:

- `content.js` for structured public copy, cases, dashboard example configuration, work approach, architecture, speaking block, and contacts.
- `scripts/build.mjs` for static generation of `index.html`, case pages, `sitemap.xml`, and `robots.txt`.
- `scripts/validate-content.mjs` for content, link, architecture, dashboard-status, SEO, and public-safety checks.
- `script.js` for progressive enhancement only: reveal-on-scroll and future user-triggered dashboard iframe loading.
- `styles.css` for the simplified visual system, case pages, and responsive architecture scheme.
- `assets/docs/popov-resume.pdf` for the public resume PDF.

### Current Public Surface

- Page structure is now: Hero, `Ключевые зоны ответственности`, `Опыт`, `Избранные кейсы`, `Как организована работа аналитики`, `Выступление и контакты`.
- The top navigation bar is intentionally absent. `skip-link`, section anchors, canonical URLs and static SEO remain generated.
- Hero first screen contains `Александр Попов`, `Руководитель отдела аналитики и BI`, the current positioning paragraph, four non-financial confirmations (`6+ лет опыта`, `6 человек в команде`, `20+ бизнес-команд`, `200 MAU в BI`), and large CTA buttons for Telegram, PDF resume and HeadHunter.
- Telegram and HeadHunter are mandatory public CTA channels on the home page, contacts section and case pages.
- Email is not published in generated HTML, JSON-LD, CTA, contact block or case pages.
- Financial metrics are removed from the first screen.
- The standalone `Ценность`, `Эффект`, intermediate CTA, `Первые 90 дней`, `Платформа`, and old `Публичность` sections were removed.
- Experience contains two roles: Атом and Mars.
- Case objects now use a separate `problem` field in addition to `context` and `task`.

See the indexed `current` workstream for the remaining migrated detail.

## Next Actions

- Optional future enhancement: add a standalone executive summary PDF.
- Future enhancement: build a separate live DataLens sandbox using an isolated ClickHouse and fully synthetic mock datasets, then embed reviewed dashboards into the portfolio after a dedicated security and privacy QA pass.
- Future enhancement: after the DataLens dashboard automation article and public GitHub repository are actually published, add reviewed public links/examples to the portfolio without exposing closed dashboards or non-public implementation details.

## Open Questions

No open question was explicitly recorded during migration.
