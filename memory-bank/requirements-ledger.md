# Requirements Ledger

## Confirmed

- The site must stay static and GitHub Pages compatible.
- The public site language is Russian.
- The site is used after resume review and should provide evidence of management experience, not repeat promotional resume copy.
- The target roles are руководитель отдела аналитики, руководитель BI-направления, Head of BI, and Head of Analytics.
- The public page structure is: Hero, Ключевые зоны ответственности, Опыт, Избранные кейсы, optional Примеры дашбордов only when at least one example is published, Как организована работа аналитики, Выступление и контакты.
- The top navigation bar is intentionally absent. Section anchors and `skip-link` remain available in static HTML.
- Telegram and HeadHunter are mandatory visible CTA channels on the home page, contacts section and case pages. PDF resume CTA stays available.
- Email must not be published in generated HTML, JSON-LD, CTA, contact block or case pages.
- Removed as standalone sections: `Ценность`, `Эффект`, intermediate CTA, `Первые 90 дней`, `Платформа`, and the old `Публичность` section.
- Content should remain easy to update from `content.js`.
- Main case objects must include a separate `problem` field. Home case cards use the STAR-like reference structure: company, period, title and `Ситуация` on the left; `Задача`, `Действия`, `Результат` on the right; no `Моя роль` on the home cards. Case detail pages use the order `Контекст`, `Проблема`, `Задача`, `Моя роль`, `Что сделал`, `Результат`, `Как измерялся результат`, `Границы ответственности`, `Инструменты`.
- Case copy should read as external business cases, not as an internal story of request handling.
- SEO baseline must include title, meta description, Open Graph, favicon, and schema.org profile data.
- Unsafe closed dashboard and Jira screenshots must not be published.
- Dashboard examples are configured in `content.js`, but public cards, pages, previews, and navigation are generated only for `published` examples on fully synthetic data.
- The architecture scheme is mandatory inside `Как организована работа аналитики` and must keep five stages: `Источники -> Обработка -> LakeHouse -> Serving -> Governance`.
- Architecture tools must use local SVG icons and visible text names.
- Social preview assets must match the current role and non-financial proof points, with no old preview positioning or financial metric. The active Open Graph PNG is `og-preview-v3.png`.
- `codex-goal/`, `portfolio-goal/`, `lead-portfolio-goal/`, `LEAD_PORTFOLIO_FINAL_REPORT.md`, `memory-bank/archive/`, `demo-data/*.csv`, `__MACOSX` and `.DS_Store` are working artifacts and must not be tracked for public publication.

## Confirmed Metrics / Facts

- Current resume source: `CV_Alexandr_Popov_Lead_DA.pdf`, created 2026-06-29.
- 6+ years of BI and analytics experience.
- Атом: project of the Russian electric vehicle Атом, АО Кама.
- Атом: role is `Руководитель отдела аналитики`, period `03.2023 - н.в.`
- Атом: formed and develops a team of 6 specialists.
- Атом: manages roadmap, бэклог, priorities, requirements, BI quality, data-quality checks, metrics descriptions, release and support of BI solutions.
- Атом: corporate reporting covers finance, HR, procurement, sales, marketing, production, product, telematics, risks, and quality.
- Атом: 200 MAU in BI.
- Атом: current resume says 20+ business teams; public site uses 20+ consistently after the 2026-06-29 polish update and 2026-06-30 STAR alignment.
- Атом: current resume says 50+ dashboards; public site keeps the conservative already-approved wording `more than 30 dashboards` in the Atom launch case.
- Атом: automation of reporting and analytics reduced manual operations; total annual effect by business-customer estimate is about 300 million RUB.
- Mars: role is `Ведущий BI-аналитик`, period `12.2019 - 03.2023`.
- Mars: grew from analyst intern to lead BI analyst over three years.
- Mars: worked on sales analytics, KPI reporting, national clients, regional teams, Power BI reporting, Excel and Power Query data preparation.
- Mars: managed a BI direction with a team of 3 people.
- Mars: shelf-expansion pilot produced 59 million RUB additional sales; scaled X5 effect reached 200 million RUB.
- Mars: contract display control reached 100 percent coverage and was scaled across Russia.
- Speaking: Yandex Data&ML conference talk, candidate's part starts at 23:35.

## Public Copy Constraints

- Do not invent new achievements, numbers, roles, technologies, links, or screenshots.
- Do not place financial metrics on the first screen.
- Do not sum financial effects into a single aggregate.
- Use `бэклог` in public Russian copy.
- Use `процесс разработки`, `поставка решения`, `использование BI`, and `заказчики и руководители` instead of English management terms.
- Explain самостоятельная аналитика at first mention if the English term is used.
- Avoid slogans, rhetorical questions, decorative arrows, and contrast-slogan constructions.
- Avoid repeated achievement claims across multiple sections.
- Keep the technology list compact and aligned with the current resume.
- Use generic public-safe wording for access, quality, governance, monitoring, and platform dependencies unless a concrete tool is confirmed safe.

## Open Follow-up

- `materials for future dev/facts_to_confirm.md` records local ignored questions about removed or conflicting public metrics.
- Confirm current public values for Атом source/object/mart scale before publishing those counts again; the `more than 30 dashboards` count remains approved only for the first Atom case result unless exact `50+ dashboards` wording is approved.
- Confirm whether the old Mars contract-display monetary value is still public and what period, territory, and methodology should accompany it.
- Confirm whether the separate DataLens dashboard-automation case should remain public and what exact tooling/role wording is approved.
