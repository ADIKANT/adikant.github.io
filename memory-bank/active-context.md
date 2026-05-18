# Active Context

## Current Slice

Current work is the public executive portfolio site for Head of BI / Head of Analytics positioning. The latest implementation is the 2026-05-13 information-architecture refactor: a static GitHub Pages page driven by `content.js`, with layout in `index.html`, behavior in `script.js`, and styles in `styles.css`.

Immediate files for the next site-editing session:

- `content.js` for public copy, navigation, role-linked proof metrics, cases, business-impact infographic, management playbook, platform context, and CTA text.
- `script.js` for rendering hero proof points, experience proof, case details, business impact, management playbook, platform context, navigation state, and keyboard behavior.
- `styles.css` for hero/profile support band, experience proof cards, business-impact cards, management playbook, architecture flow, and responsive behavior.
- `index.html` for static shell, metadata, section order, and cache-busted asset references.
- `assets/images/profile-hero.jpg` for the current portrait.

## Current Public Surface

- Narrative leads with BI as a management function: team, process, self-service, data platform dependencies, and business effect.
- Navigation is now: `Ценность`, `Опыт`, `Кейсы`, `Эффект`, `Управление`, `Платформа`, `Публичность`, `Контакт`.
- Detached metrics were replaced by role-linked proof in `experienceProof`: Atom shows function/team/platform/adoption scale; Mars shows commercial effect.
- Case surface now includes four flagship cards: Atom launch, Atom managed delivery, Atom DataLens dashboard automation, and Mars commercial impact. The automation case keeps the 15+ queue context in the summary and uses a compact `1-3 days -> ~2 hours` result comparison.
- The automation case may additionally show one plain in-progress note about preparing a GitHub repository and DataLens course; no links are published until those materials exist.
- Business impact is a compact infographic for revenue, annual savings, automated hours, and BI adoption.
- Management, delivery route, and first-90-days logic are consolidated into one management playbook with progressive disclosure.
- Platform context remains secondary and high-level: sources include API, ingest and processing are combined with Python/PySpark/SQL tooling, LakeHouse includes PostgreSQL / Microsoft SQL / ClickHouse, and governance is a final visible layer.
- Hero and contact CTA buttons should keep identical pill geometry and equal widths inside their local button groups.
- Hero and contact sections include a HeadHunter resume link for recruiter-only contact access without publishing the phone number directly on the site.

## Working Assumptions

- `materials for future dev/` and `dasboards examples/` are local source/evidence folders and must stay out of the public published surface.
- Public UI copy must avoid internal links, issue identifiers, confidential dashboard details, and direct internal-tool markers.
- DataLens dashboard automation belongs in the Atom case, not as a duplicate platform-context card. It can be described publicly as generalized templates/rules, DataLens API, JavaScript, requirements/S2T, prepared data, and about 2 hours to MVP; do not name local plugin repos, internal paths, private dashboard URLs, Jira markers, or token/debug details.
- GitHub/course preparation for the DataLens automation story can be mentioned only as an in-progress line inside that Atom case and without public URLs until publication.
- The old `/Users/alexandr/Downloads/portfolio_site_codex_brief_ru.md` source is missing and treated as stale unless restored.
- Future DataLens dashboard examples should be built only in a separate live sandbox with synthetic mock data; do not add placeholders to the current page.
- The current portrait remains `assets/images/profile-hero.jpg` unless the user provides a replacement.

## Archive

The pre-compaction detailed 2026-05-07 working notes were preserved in `memory-bank/archive/2026-05-08-active-context-before-compaction.md`.
