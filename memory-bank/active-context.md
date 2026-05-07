# Active Context

## Current Slice

The executive redesign has been refined for the 2026-05-07 v2 brief:

- hero now leads with BI / analytics as a management function, with the name, role, Telegram CTA, and short-resume CTA grouped under the square portrait;
- impact metrics are grouped into Business impact, Operating scale, and Demand & adoption;
- current public metric surface uses updated Atom scale: 30+ sources, 4500+ objects, 250 data marts, 50+ dashboards, 0 -> 200 monthly BI users;
- cases are consolidated into 3 flagship cards: Atom launch, Atom request/delivery/self-service, and Mars commercial impact;
- cases use short cards plus accessible `<details>` sections for aggregated detail;
- delivery-process and technical-context sections now use progressive `<details>` so long process/tech detail stays off the surface;
- added dedicated profit/efficiency and management-scope sections;
- tech context is intentionally secondary and framed as BI management at the business / data platform boundary;
- tech context now includes a simplified public architecture summary: sources, ingestion, LakeHouse, processing, serving, plus governance/access/quality/monitoring/lineage rails;
- domains are rendered as a compact bubble chart next to the section title instead of a long chip panel;
- dashboard examples are temporarily removed from the public UI until the user prepares final sanitized images; local source PDFs remain ignored and must not be published;
- header navigation is full-width without the name/brand block, and hash-based active navigation is locked briefly on load/click so the selected section is highlighted;
- the first-90-days onboarding section now sits after the best-fit scenarios and includes team/role diagnostics and target team contour planning;
- contact section keeps only role positioning and action buttons; duplicate email/Telegram/resume rows were removed;
- public UI copy avoids internal links, issue identifiers, confidential dashboard details, and direct internal-tool markers.

## Working Assumptions

- Current portrait is `assets/images/profile-hero.jpg`, replaced from the user-provided 20210413 photo, and stays in the hero.
- `30+` is the standardized business-customer-team metric across the page.
- `materials for future dev/` is local brief/evidence material for Codex and is ignored to avoid accidental publication.
- `dasboards examples/` contains local source dashboard PDFs and is ignored; no dashboard preview images are currently published.
- Responsive QA can use the installed Chrome binary in headless mode; it writes screenshots but may time out after the screenshot is saved.
- Latest in-app browser QA verified active navigation click state, 3 case cards, removed public-safety notes from visible UI, and no console errors.
- Latest review pass removed duplicated case metrics on the left surface, moved request-delivery results into visible result chips, and emphasized Mars commercial effect in the right visual block.
