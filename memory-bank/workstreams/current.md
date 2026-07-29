# Current Workstream

## Active Context

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
- Home case cards follow the STAR-like structure from the analyst reference: left side has company, period, title and `Ситуация`; right side has only `Задача`, `Действия`, `Результат`. `Моя роль` stays off home cards.
- Case detail pages follow the order: `Контекст`, `Проблема`, `Задача`, `Моя роль`, `Что сделал`, `Результат`, `Как измерялся результат`, `Границы ответственности`, `Инструменты`, CTA.
- Four public cases are generated: Atom analytics function launch, Atom analytics delivery process, Atom self-service BI and knowledge base, and Mars shelf/execution control.
- Атом experience uses current resume-backed facts plus the user-confirmed conservative dashboard count: team of 6 specialists, 20+ business teams, 200 MAU in BI, more than 30 dashboards in use, corporate reporting for key functions, and about 300 mln RUB annual effect by business-customer estimate in the selected case.
- Mars experience shows growth from analyst intern to lead BI analyst, commercial analytics, sales/KPI reporting, national clients and regions, and a team metric of 3 people.
- Mars public financial metrics are not summed. The old contract-display monetary value was removed from public text pending confirmation.
- Dashboard examples are configured in `content.js`, but none are published. No dashboard section, navigation item, iframe, preview, placeholder, sitemap URL or empty dashboard page is generated at zero published examples.
- The work approach section contains the request process and the required five-column architecture scheme: `Источники -> Обработка -> LakeHouse -> Serving -> Governance`.
- Architecture icons are local monochrome SVG files from `assets/icons/architecture/`; tool names remain visible as text and arrows are decorative.
- Main content and case pages are present in static HTML and remain readable without JavaScript.
- Social preview assets use the current role and non-financial first-screen proof points: `6+ лет опыта`, `6 человек в команде`, `200 MAU в BI`. The active Open Graph PNG is `assets/images/og-preview-v3.png`.

### Working Assumptions

- `materials for future dev/` and `dasboards examples/` are local ignored source/evidence folders and must stay out of the public published surface.
- `materials for future dev/facts_to_confirm.md` is the local ignored place for removed or conflicting metrics that need confirmation before publication.
- `codex-goal/`, `portfolio-goal/`, `lead-portfolio-goal/`, `LEAD_PORTFOLIO_FINAL_REPORT.md`, `memory-bank/archive/`, `demo-data/*.csv`, `__MACOSX/` and `.DS_Store` are working artifacts, not public content; they should stay ignored or removed from the Git index without deleting local files.
- The public page should not expose closed links, issue identifiers, confidential dashboard details, local plugin names, local paths, access data, or implementation-only diagnostics.
- If a metric conflicts between old site copy, older ledger entries, source briefs, and the fresh CV, keep it out of public copy until the period, territory, methodology, and publication approval are confirmed.
- The current portrait remains `assets/images/profile-hero.jpg` unless the user provides a replacement.

### Archive

The pre-compaction detailed 2026-05-07 working notes were preserved in `memory-bank/archive/2026-05-08-active-context-before-compaction.md`.

## Backlog

- Optional future enhancement: add a standalone executive summary PDF.
- Future enhancement: build a separate live DataLens sandbox using an isolated ClickHouse and fully synthetic mock datasets, then embed reviewed dashboards into the portfolio after a dedicated security and privacy QA pass.
- Future enhancement: after the DataLens dashboard automation article and public GitHub repository are actually published, add reviewed public links/examples to the portfolio without exposing closed dashboards or non-public implementation details.
