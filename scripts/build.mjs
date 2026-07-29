import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { portfolioContent as content } from "../content.js";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const siteUrl = content.site.baseUrl.replace(/\/$/, "");
const buildVersion = "20260729-display-sync-1";
const currentYear = "2026";

const publishedDashboards = content.dashboardExamples.filter(
  (example) => example.status === "published"
);

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function jsonLd(data) {
  return JSON.stringify(data, null, 2).replace(/</g, "\\u003c");
}

function absoluteUrl(urlPath = "/") {
  if (/^https?:\/\//.test(urlPath)) {
    return urlPath;
  }
  const normalized = urlPath.startsWith("/") ? urlPath : `/${urlPath}`;
  return `${siteUrl}${normalized}`;
}

function assetUrl(urlPath) {
  return urlPath.startsWith("/") ? urlPath : `/${urlPath}`;
}

function versionedAssetUrl(urlPath) {
  const url = assetUrl(urlPath);
  return `${url}${url.includes("?") ? "&" : "?"}v=${buildVersion}`;
}

function sectionHead(section) {
  const hasIntro = Boolean(section.intro);
  return `
    <div class="section-head${hasIntro ? "" : " section-head-compact"}">
      ${section.eyebrow ? `<p class="section-kicker">${escapeHtml(section.eyebrow)}</p>` : ""}
      <div class="section-head-grid">
        <h2>${escapeHtml(section.title)}</h2>
        ${hasIntro ? `<p>${escapeHtml(section.intro)}</p>` : ""}
      </div>
    </div>
  `;
}

function renderIcon(icon) {
  if (icon === "telegram") {
    return `
      <span class="btn-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" focusable="false">
          <path d="M21.8 4.2 18.6 20c-.2 1-.8 1.2-1.6.7l-4.5-3.3-2.2 2.1c-.2.2-.5.4-.9.4l.3-4.7 8.5-7.7c.4-.3-.1-.5-.6-.2L7.1 13.9 2.6 12.5c-1-.3-1-1 .2-1.5L20.4 4.2c.8-.3 1.5.2 1.4 1Z"/>
        </svg>
      </span>
    `;
  }

  if (icon === "resume") {
    return `
      <span class="btn-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" focusable="false">
          <path d="M6.5 3h7.6l3.4 3.4V21h-11V3Zm7 1.9V8h3.1l-3.1-3.1ZM8 10v1.6h8V10H8Zm0 3.4V15h8v-1.6H8Zm0 3.4v1.6h5.6v-1.6H8Z"/>
        </svg>
      </span>
    `;
  }

  if (icon === "headhunter") {
    return `<span class="btn-icon btn-icon-hh" aria-hidden="true">hh</span>`;
  }

  return "";
}

function renderButton(link) {
  const href = link.href.startsWith("/") || link.href.startsWith("#") || /^https?:|^mailto:/.test(link.href)
    ? link.href
    : `/${link.href}`;
  const isExternal = /^https?:\/\//.test(href) && !href.startsWith(siteUrl);
  const attrs = isExternal ? ' target="_blank" rel="noopener noreferrer"' : "";
  const icon = renderIcon(link.icon);
  return `<a class="btn btn-${escapeHtml(link.kind || "secondary")}${link.icon ? ` btn-${escapeHtml(link.icon)}` : ""}" href="${escapeHtml(href)}"${attrs}>${icon}<span class="btn-label">${escapeHtml(link.label)}</span></a>`;
}

function renderHead({ title, description, canonicalPath, type = "website", schema }) {
  const canonical = absoluteUrl(canonicalPath);
  const ogImage = absoluteUrl(content.site.ogImage);
  const socialTitle = canonicalPath === "/" ? content.site.socialTitle || title : title;
  const socialDescription =
    canonicalPath === "/" ? content.site.socialDescription || description : description;

  return `
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(title)}</title>
    <meta name="description" content="${escapeHtml(description)}" />
    <meta name="keywords" content="${escapeHtml(content.site.keywords)}" />
    <meta name="theme-color" content="${escapeHtml(content.site.themeColor)}" />
    <link rel="canonical" href="${escapeHtml(canonical)}" />
    <link rel="icon" href="${assetUrl(content.site.favicon)}" type="image/svg+xml" />
    <meta property="og:type" content="${escapeHtml(type)}" />
    <meta property="og:locale" content="ru_RU" />
    <meta property="og:title" content="${escapeHtml(socialTitle)}" />
    <meta property="og:description" content="${escapeHtml(socialDescription)}" />
    <meta property="og:url" content="${escapeHtml(canonical)}" />
    <meta property="og:image" content="${escapeHtml(ogImage)}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:type" content="image/png" />
    <meta property="og:image:alt" content="${escapeHtml(content.site.ogImageAlt)}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(socialTitle)}" />
    <meta name="twitter:description" content="${escapeHtml(socialDescription)}" />
    <meta name="twitter:image" content="${escapeHtml(ogImage)}" />
    <link rel="stylesheet" href="/styles.css?v=${buildVersion}" />
    <script type="application/ld+json">${jsonLd(schema)}</script>
    <script type="module" src="/script.js?v=${buildVersion}" defer></script>
  `;
}

function layout({ title, description, canonicalPath, type, schema, body }) {
  return `<!doctype html>
<html lang="${escapeHtml(content.site.language)}">
  <head>
${renderHead({ title, description, canonicalPath, type, schema })}
  </head>
  <body>
    <a class="skip-link" href="#main">Перейти к содержанию</a>
${body}
    <footer class="site-footer">
      <div class="container footer-inner">
        ${content.footer.note ? `<p>${escapeHtml(content.footer.note)}</p>` : ""}
        <p>&copy; ${currentYear} ${escapeHtml(content.brand.name)}</p>
      </div>
    </footer>
  </body>
</html>
`;
}

function profileSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    inLanguage: "ru",
    url: absoluteUrl("/"),
    name: content.site.title,
    description: content.site.description,
    mainEntity: {
      "@type": "Person",
      name: content.hero.name,
      jobTitle: content.hero.role,
      description: content.hero.text,
      url: absoluteUrl("/"),
      image: absoluteUrl(content.assets.portrait.src),
      sameAs: [content.contact.telegramUrl, content.contact.hhResume.href]
    }
  };
}

function articleSchema(caseItem) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    inLanguage: "ru",
    headline: caseItem.title,
    description: caseItem.lead,
    author: {
      "@type": "Person",
      name: content.hero.name,
      jobTitle: content.hero.role
    },
    publisher: {
      "@type": "Person",
      name: content.hero.name
    },
    mainEntityOfPage: absoluteUrl(`/cases/${caseItem.slug}/`)
  };
}

function renderHero() {
  return `
    <section class="hero" id="hero" aria-labelledby="hero-title">
      <div class="container hero-grid">
        <div class="hero-copy">
          <p class="hero-role">${escapeHtml(content.hero.role)}</p>
          <h1 class="hero-headline" id="hero-title">${escapeHtml(content.hero.name)}</h1>
          <p class="hero-summary">${escapeHtml(content.hero.text)}</p>
          <ul class="hero-proof-list" aria-label="Ключевые подтверждения">
            ${content.hero.proofPoints.map((point) => `<li>${escapeHtml(point)}</li>`).join("")}
          </ul>
          <div class="cta-row">${content.hero.actions.map(renderButton).join("")}</div>
        </div>
        <figure class="hero-media">
          <img
            src="${versionedAssetUrl(content.assets.portrait.src)}"
            alt="${escapeHtml(content.assets.portrait.alt)}"
            width="${content.assets.portrait.width}"
            height="${content.assets.portrait.height}"
            loading="eager"
          />
        </figure>
      </div>
    </section>
  `;
}

function renderExperience() {
  return `
    <section class="section nav-target" id="experience" aria-labelledby="experience-title">
      <div class="container">
        ${sectionHead({ ...content.experience, title: `<span id="experience-title">${content.experience.title}</span>` }).replace("&lt;span id=&quot;experience-title&quot;&gt;", '<span id="experience-title">').replace("&lt;/span&gt;", "</span>")}
        <div class="experience-list">
          ${content.experience.items
            .map(
              (item) => `
                <article class="experience-card">
                  <div class="experience-main">
                    <p class="timeline-period">${escapeHtml(item.period)}</p>
                    <h3>${escapeHtml(item.company)}</h3>
                    <p class="timeline-role">${escapeHtml(item.role)}</p>
                    <p class="experience-context">${escapeHtml(item.context)}</p>
                    <ul class="responsibility-list">
                      ${item.responsibilities.map((entry) => `<li>${escapeHtml(entry)}</li>`).join("")}
                    </ul>
                  </div>
                  <aside class="experience-side" aria-label="Показатели и технологии">
                    <div class="metric-list">
                      ${item.metrics
                        .map(
                          (metric) => `
                            <div class="metric-item">
                              <strong>${escapeHtml(metric.value)}</strong>
                              <span>${escapeHtml(metric.label)}</span>
                            </div>
                          `
                        )
                        .join("")}
                    </div>
                    <ul class="tech-list" aria-label="Технологии">
                      ${item.technologies.map((tech) => `<li>${escapeHtml(tech)}</li>`).join("")}
                    </ul>
                  </aside>
                </article>
              `
            )
            .join("")}
        </div>
      </div>
    </section>
  `;
}

function formatResult(result) {
  if (result.summary) {
    return result.summary;
  }

  if (result.value === "около 300") {
    return "Около 300 млн рублей в год по оценке бизнес-заказчиков. В расчет входили автоматизация отчетности, сокращение ручных операций и снижение отдельных операционных рисков.";
  }

  if (result.unit === "MAU в BI") {
    const dashboardPhrase = result.dashboardCount
      ? `; в контуре используется более ${result.dashboardCount.replace("+", "")} дашбордов`
      : "";
    return `BI стал регулярным рабочим инструментом для ${result.value} MAU в BI${dashboardPhrase}.`;
  }

  if (result.value === "20+" && result.unit === "бизнес-команд") {
    return "Отчетность и запросы покрывают 20+ бизнес-команд.";
  }

  if (result.value === "6" && result.unit.includes("человек")) {
    return "Сформирована и развивается команда аналитики из 6 человек.";
  }

  if (result.value === "59" && result.unit === "млн рублей") {
    return "59 млн рублей дополнительных продаж в пилоте после изменения выкладки.";
  }

  if (result.value === "200" && result.unit === "млн рублей") {
    return "200 млн рублей дополнительных продаж после масштабирования подхода на X5.";
  }

  if (result.value === "100%" && result.unit === "покрытие") {
    return "Контроль контрактных дополнительных мест продаж довел покрытие до 100 процентов и был масштабирован на Россию.";
  }

  return `${result.value} ${result.unit}: ${result.explanation}.`;
}

function renderUsefulFor() {
  return `
    <section class="useful-strip" aria-label="${escapeHtml(content.usefulFor.title)}">
      <div class="container">
        <div class="useful-grid">
          ${content.usefulFor.items
            .map(
              (item) => `
                <article class="useful-item">
                  <h3>${escapeHtml(item.title)}</h3>
                  <p>${escapeHtml(item.body)}</p>
                </article>
              `
            )
            .join("")}
        </div>
      </div>
    </section>
  `;
}

function renderCasesHome() {
  return `
    <section class="section nav-target" id="cases" aria-labelledby="cases-title">
      <div class="container">
        ${sectionHead({ ...content.casesIntro, title: `<span id="cases-title">${content.casesIntro.title}</span>` }).replace("&lt;span id=&quot;cases-title&quot;&gt;", '<span id="cases-title">').replace("&lt;/span&gt;", "</span>")}
        <div class="cases-list">
          ${content.cases
            .map((caseItem) => {
              const resultText = caseItem.results.map(formatResult).join(" ");
              return `
                <article class="case-card">
                  <div class="case-card-head">
                    <p class="case-company">${escapeHtml(caseItem.company)} · ${escapeHtml(caseItem.period)}</p>
                    <h3>${escapeHtml(caseItem.title)}</h3>
                    <p class="case-situation-label">Ситуация</p>
                    <p>${escapeHtml(caseItem.problem)}</p>
                  </div>
                  <div class="case-card-body">
                    <section>
                      <h4>Задача</h4>
                      <p>${escapeHtml(caseItem.task)}</p>
                    </section>
                    <section>
                      <h4>Действия</h4>
                      <ul>
                        ${caseItem.actions.slice(0, 5).map((action) => `<li>${escapeHtml(action)}</li>`).join("")}
                      </ul>
                    </section>
                    <section class="case-result">
                      <h4>Результат</h4>
                      <p>${escapeHtml(resultText)}</p>
                    </section>
                    <a class="text-link" href="/cases/${escapeHtml(caseItem.slug)}/">Подробнее</a>
                  </div>
                </article>
              `;
            })
            .join("")}
        </div>
      </div>
    </section>
  `;
}

function renderDashboardHome() {
  if (publishedDashboards.length === 0) {
    return "";
  }

  return `
    <section class="section nav-target" id="dashboards" aria-labelledby="dashboards-title">
      <div class="container">
        ${sectionHead({
          eyebrow: "Примеры дашбордов",
          title: '<span id="dashboards-title">Публичные интерактивные примеры</span>',
          intro:
            "Раздел показывает только опубликованные sandbox-примеры на полностью синтетических данных."
        }).replace("&lt;span id=&quot;dashboards-title&quot;&gt;", '<span id="dashboards-title">').replace("&lt;/span&gt;", "</span>")}
        <div class="dashboard-grid">
          ${publishedDashboards.map(renderDashboardCard).join("")}
        </div>
      </div>
    </section>
  `;
}

function renderDashboardCard(example) {
  return `
    <article class="dashboard-card">
      <img src="${assetUrl(example.previewImage)}" alt="${escapeHtml(example.title)}" width="960" height="540" loading="lazy" />
      <h3>${escapeHtml(example.title)}</h3>
      <p><strong>Бизнес-вопрос:</strong> ${escapeHtml(example.businessQuestion)}</p>
      <p><strong>Аудитория:</strong> ${escapeHtml(example.audience)}</p>
      <p>${escapeHtml(example.personalRole)}</p>
      <a class="btn btn-secondary" href="/dashboards/${escapeHtml(example.slug)}/">Открыть пример</a>
    </article>
  `;
}

function renderApproach() {
  return `
    <section class="section nav-target" id="approach" aria-labelledby="approach-title">
      <div class="container">
        ${sectionHead({ ...content.approach, title: `<span id="approach-title">${content.approach.title}</span>` }).replace("&lt;span id=&quot;approach-title&quot;&gt;", '<span id="approach-title">').replace("&lt;/span&gt;", "</span>")}
        <div class="process-layout">
          <section class="process-card" aria-labelledby="process-title">
            <h3 id="process-title">${escapeHtml(content.approach.processTitle)}</h3>
            <ol class="process-list">
              ${content.approach.steps.map((step) => `<li>${escapeHtml(step)}</li>`).join("")}
            </ol>
          </section>
          <section class="leader-role-card" aria-labelledby="leader-role-title">
            <h3 id="leader-role-title">Роль руководителя</h3>
            <ul>
              ${content.approach.leaderRole.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
            </ul>
          </section>
        </div>

        <section class="architecture-section" aria-labelledby="architecture-title">
          <div class="architecture-copy${content.approach.architectureIntro ? "" : " architecture-copy-compact"}">
            <h3 id="architecture-title">${escapeHtml(content.approach.architectureTitle)}</h3>
            ${content.approach.architectureIntro ? `<p>${escapeHtml(content.approach.architectureIntro)}</p>` : ""}
          </div>
          <div class="architecture-scroll" aria-label="Архитектурный контекст аналитической платформы">
            <ol class="architecture-flow">
              ${content.approach.architecture
                .map((stage, index) => {
                  const hasArrow = index < content.approach.architecture.length - 1;
                  return `
                    <li class="architecture-stage">
                      <div class="architecture-stage-head">
                        <h4>${escapeHtml(stage.title)}</h4>
                        <p>${escapeHtml(stage.description)}</p>
                      </div>
                      <ul class="architecture-tools">
                        ${stage.tools
                          .map((tool) => {
                            const icon = content.approach.architectureIcons[tool] || "tool";
                            return `
                              <li>
                                <span class="architecture-tool">
                                  <span class="architecture-tool-icon">
                                    <img src="/assets/icons/architecture/${escapeHtml(icon)}.svg" alt="" width="20" height="20" loading="lazy" />
                                  </span>
                                  <span>${escapeHtml(tool)}</span>
                                </span>
                              </li>
                            `;
                          })
                          .join("")}
                      </ul>
                      ${hasArrow ? '<span class="architecture-arrow" aria-hidden="true">→</span>' : ""}
                    </li>
                  `;
                })
                .join("")}
            </ol>
          </div>
          ${
            content.approach.architectureResponsibility
              ? `<p class="architecture-responsibility">${escapeHtml(content.approach.architectureResponsibility)}</p>`
              : ""
          }
        </section>
      </div>
    </section>
  `;
}

function renderContact() {
  const contact = content.contact;
  return `
    <section class="section nav-target" id="contact" aria-labelledby="contact-title">
      <div class="container">
        ${sectionHead({ ...contact, title: `<span id="contact-title">${contact.title}</span>` }).replace("&lt;span id=&quot;contact-title&quot;&gt;", '<span id="contact-title">').replace("&lt;/span&gt;", "</span>")}
        <div class="contact-layout">
          <article class="speaking-card">
            <p class="section-kicker">Выступление</p>
            <h3>${escapeHtml(contact.speaking.title)}</h3>
            <p>${escapeHtml(contact.speaking.body)}</p>
            <a class="text-link" href="${escapeHtml(contact.speaking.href)}" target="_blank" rel="noopener noreferrer">${escapeHtml(contact.speaking.label)}</a>
          </article>
          <div class="contact-card">
            <div class="contact-actions">
              ${contact.actions.map(renderButton).join("")}
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderIndex() {
  const body = `
    <main id="main">
      ${renderHero()}
      ${renderUsefulFor()}
      ${renderExperience()}
      ${renderCasesHome()}
      ${renderDashboardHome()}
      ${renderApproach()}
      ${renderContact()}
    </main>
  `;

  return layout({
    title: content.site.title,
    description: content.site.description,
    canonicalPath: "/",
    type: "profile",
    schema: profileSchema(),
    activeId: "",
    page: "home",
    body
  });
}

function renderCasePage(caseItem) {
  const title = `${caseItem.title} - Александр Попов`;
  const description = caseItem.lead;
  const body = `
    <main id="main" class="case-page">
      <section class="case-hero">
        <div class="container case-hero-grid">
          <div>
            <a class="back-link" href="/#cases">← К списку кейсов</a>
            <p class="case-company">${escapeHtml(caseItem.company)} · ${escapeHtml(caseItem.period)}</p>
            <h1>${escapeHtml(caseItem.title)}</h1>
            <p>${escapeHtml(caseItem.lead)}</p>
          </div>
        </div>
      </section>

      <section class="section case-detail-section">
        <div class="container case-detail-grid">
          ${renderCaseDetailBlock("Контекст", caseItem.context)}
          ${renderCaseDetailBlock("Проблема", caseItem.problem)}
          ${renderCaseDetailBlock("Задача", caseItem.task)}
          ${renderCaseDetailBlock("Моя роль", caseItem.role)}
          <section class="case-detail-block">
            <h2>Что сделал</h2>
            <ul>
              ${caseItem.actions.map((action) => `<li>${escapeHtml(action)}</li>`).join("")}
            </ul>
          </section>
          <section class="case-detail-block">
            <h2>Результат</h2>
            <ul class="result-list">
              ${caseItem.results
                .map(
                  (result) => `
                    <li>
                      <strong>${escapeHtml(result.value)} ${escapeHtml(result.unit)}</strong>
                      <span>${escapeHtml(formatResult(result))}</span>
                    </li>
                  `
                )
                .join("")}
            </ul>
          </section>
          ${renderCaseDetailBlock("Как измерялся результат", caseItem.measurement)}
          ${renderCaseDetailBlock("Границы ответственности", caseItem.attribution)}
          <section class="case-detail-block">
            <h2>Инструменты</h2>
            <ul class="tech-list case-tech-list">
              ${caseItem.tools.map((tool) => `<li>${escapeHtml(tool)}</li>`).join("")}
            </ul>
          </section>
          ${
            caseItem.additionalProject
              ? `<section class="case-detail-block case-detail-wide">
                  <h2>${escapeHtml(caseItem.additionalProject.title)}</h2>
                  ${renderParagraphs(caseItem.additionalProject.body)}
                </section>`
              : ""
          }
        </div>
      </section>

      <section class="section case-contact">
        <div class="container case-contact-inner">
          <a class="text-link" href="/#cases">Вернуться к списку кейсов</a>
          <div class="case-contact-actions">
            <a class="btn btn-primary" href="${escapeHtml(content.contact.telegramUrl)}" target="_blank" rel="noopener noreferrer">Написать в Telegram</a>
            <a class="btn btn-secondary" href="${assetUrl(content.assets.resume)}">Открыть резюме PDF</a>
            <a class="btn btn-secondary" href="${escapeHtml(content.contact.hhResume.href)}" target="_blank" rel="noopener noreferrer">${escapeHtml(content.contact.hhResume.label)}</a>
          </div>
        </div>
      </section>
    </main>
  `;

  return layout({
    title,
    description,
    canonicalPath: `/cases/${caseItem.slug}/`,
    type: "article",
    schema: articleSchema(caseItem),
    activeId: "cases",
    page: "case",
    body
  });
}

function renderCaseDetailBlock(title, body) {
  return `
    <section class="case-detail-block">
      <h2>${escapeHtml(title)}</h2>
      <p>${escapeHtml(body)}</p>
    </section>
  `;
}

function renderParagraphs(body) {
  return String(body ?? "")
    .split(/\n{2,}/)
    .map((paragraph) => `<p>${escapeHtml(paragraph.trim())}</p>`)
    .join("");
}

function renderRobots() {
  return `User-agent: *
Allow: /

Sitemap: ${absoluteUrl("/sitemap.xml")}
Sitemap: ${absoluteUrl("/analyst/sitemap.xml")}
`;
}

function renderSitemap() {
  const urls = [
    "/",
    ...content.cases.map((caseItem) => `/cases/${caseItem.slug}/`),
    ...(publishedDashboards.length > 0 ? ["/dashboards/", ...publishedDashboards.map((item) => `/dashboards/${item.slug}/`)] : [])
  ];

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (urlPath) => `  <url>
    <loc>${escapeHtml(absoluteUrl(urlPath))}</loc>
  </url>`
  )
  .join("\n")}
</urlset>
`;
}

async function writeHtml(relativePath, html) {
  const target = path.join(rootDir, relativePath);
  await mkdir(path.dirname(target), { recursive: true });
  const normalized = html
    .split("\n")
    .map((line) => line.trimEnd())
    .join("\n");
  await writeFile(target, normalized, "utf8");
}

async function build() {
  await writeHtml("index.html", renderIndex());

  for (const caseItem of content.cases) {
    await writeHtml(path.join("cases", caseItem.slug, "index.html"), renderCasePage(caseItem));
  }

  await writeHtml("robots.txt", renderRobots());
  await writeHtml("sitemap.xml", renderSitemap());
}

await build();

console.log(
  `Built index, ${content.cases.length} case pages, ${publishedDashboards.length} published dashboard pages.`
);
