const content = window.PORTFOLIO_CONTENT;
const yearNode = document.querySelector("#year");

function setMetaContent(selector, value, attribute = "content") {
  const node = document.querySelector(selector);
  if (node && value) {
    node.setAttribute(attribute, value);
  }
}

function renderButton(link) {
  const isExternal = Boolean(link.external);
  const attrs = isExternal
    ? ' target="_blank" rel="noopener noreferrer"'
    : "";

  return `<a class="btn btn-${link.kind || "secondary"}" href="${link.href}"${attrs}>${link.label}</a>`;
}

function escapeAttribute(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function renderSectionHead(section) {
  return `
    <div class="section-head reveal">
      ${section.eyebrow ? `<p class="section-kicker">${section.eyebrow}</p>` : ""}
      <div class="section-head-grid">
        <h2>${section.title}</h2>
        ${section.intro ? `<p>${section.intro}</p>` : ""}
      </div>
    </div>
  `;
}

function renderSafeVisual(caseItem) {
  const visual = caseItem.safeVisual;

  if (!visual) {
    return "";
  }

  if (visual.type === "launch") {
    const items = visual.items
      .map(
        (item) => `
          <div class="visual-stat">
            <strong>${item.value}</strong>
            <span>${item.label}</span>
          </div>
        `
      )
      .join("");

    const bars = visual.items
      .map(
        (item, index) => `
          <span class="visual-bar" style="height:${44 + index * 12}%"></span>
        `
      )
      .join("");

    return `
      <div class="case-visual case-visual-launch">
        <p class="visual-label">${visual.label}</p>
        <div class="visual-stats">${items}</div>
        <div class="visual-bars">${bars}</div>
      </div>
    `;
  }

  if (visual.type === "flow") {
    const items = visual.items
      .map(
        (item, index) => `
          <li class="visual-flow-step">
            <span>${String(index + 1).padStart(2, "0")}</span>
            <strong>${item}</strong>
          </li>
        `
      )
      .join("");

    return `
      <div class="case-visual case-visual-flow">
        <p class="visual-label">${visual.label}</p>
        <ol class="visual-flow">${items}</ol>
      </div>
    `;
  }

  if (visual.type === "bars") {
    const items = visual.items
      .map(
        (item) => `
          <div class="visual-column">
            <span style="height:${item.value}%"></span>
            <strong>${item.label}</strong>
          </div>
        `
      )
      .join("");

    return `
      <div class="case-visual case-visual-bars">
        <p class="visual-label">${visual.label}</p>
        <div class="visual-columns">${items}</div>
      </div>
    `;
  }

  if (visual.type === "control") {
    const items = visual.items
      .map(
        (item) => `
          <div class="visual-control-row">
            <span>${item.label}</span>
            <strong>${item.value}</strong>
          </div>
        `
      )
      .join("");

    return `
      <div class="case-visual case-visual-control">
        <p class="visual-label">${visual.label}</p>
        <div class="visual-control-list">${items}</div>
      </div>
    `;
  }

  return "";
}

function renderMeta() {
  document.title = content.seo.title;
  setMetaContent("#meta-description", content.seo.description);
  setMetaContent("#meta-keywords", content.seo.keywords);
  setMetaContent("#meta-theme", content.seo.themeColor);
  setMetaContent("#og-title", content.seo.title);
  setMetaContent("#og-description", content.seo.description);
  setMetaContent("#og-url", content.seo.url);
  setMetaContent("#og-image", content.seo.ogImage);
  setMetaContent("#og-image-alt", content.seo.ogImageAlt);
  setMetaContent("#twitter-card", content.seo.twitterCard);
  setMetaContent("#twitter-title", content.seo.title);
  setMetaContent("#twitter-description", content.seo.description);
  setMetaContent("#twitter-image", content.seo.ogImage);
  setMetaContent("#canonical-link", content.seo.url, "href");

  const schemaNode = document.querySelector("#schema-person");
  if (schemaNode) {
    schemaNode.textContent = JSON.stringify(content.seo.schema, null, 2);
  }
}

function renderNavigation() {
  const brandNode = document.querySelector("[data-brand]");
  const navNode = document.querySelector("#site-nav");

  if (brandNode) {
    brandNode.textContent = content.brand.name;
  }

  if (!navNode) {
    return;
  }

  navNode.innerHTML = content.navigation
    .map(
      (item) =>
        `<a class="nav-link" href="#${item.id}" data-nav-link="${item.id}">${item.label}</a>`
    )
    .join("");
}

function renderHero() {
  const heroCopy = document.querySelector("#hero-copy");
  const heroMedia = document.querySelector("#hero-media");

  if (!heroCopy || !heroMedia) {
    return;
  }

  heroCopy.innerHTML = `
    <div class="hero-stack">
      <h1 class="hero-headline hero-motion">${content.hero.headline}</h1>
      ${content.hero.summary ? `<p class="hero-summary hero-motion">${content.hero.summary}</p>` : ""}
      <p class="hero-proof hero-motion">${content.hero.proofLine}</p>
    </div>
  `;

  heroMedia.innerHTML = `
    <div class="portrait-frame hero-motion">
      <img src="${content.hero.portrait.src}" alt="${content.hero.portrait.alt}" loading="eager" />
    </div>
    <div class="hero-profile hero-motion">
      <p class="hero-name">${content.hero.name}</p>
      <p class="hero-role">${content.hero.role}</p>
      <div class="cta-row">
        ${content.hero.ctas.map(renderButton).join("")}
      </div>
    </div>
  `;
}

function renderValuePillars() {
  const root = document.querySelector("#value-section");
  if (!root) {
    return;
  }

  root.innerHTML = `
    ${renderSectionHead(content.valuePillars)}
    <div class="value-grid">
      ${content.valuePillars.items
        .map(
          (item, index) => `
            <article class="value-item reveal" style="--reveal-delay:${index * 70}ms">
              <p class="value-index">${item.index}</p>
              <h3>${item.title}</h3>
              <p>${item.body}</p>
            </article>
          `
        )
        .join("")}
    </div>
  `;
}

function renderMetrics() {
  const root = document.querySelector("#impact-section");
  if (!root) {
    return;
  }

  root.innerHTML = `
    ${renderSectionHead(content.metrics)}
    <div class="metric-groups">
      ${content.metrics.groups
        .map(
          (group, groupIndex) => `
            <section class="impact-panel reveal" style="--reveal-delay:${groupIndex * 90}ms">
              <h3>${group.title}</h3>
              <div class="impact-grid">
                ${group.items
                  .map(
                    (item, index) => `
                      <article class="impact-item ${item.tone ? `impact-item-${item.tone}` : ""}" style="--reveal-delay:${index * 40}ms">
                        <strong>${item.value}</strong>
                        <span>${item.label}</span>
                      </article>
                    `
                  )
                  .join("")}
              </div>
            </section>
          `
        )
        .join("")}
    </div>
  `;
}

function renderCaseDetails(item) {
  const details = item.details
    .map(
      (detail) => `
        <section>
          <span>${detail.title}</span>
          ${detail.body ? `<p>${detail.body}</p>` : ""}
          ${
            detail.list
              ? `<ul>${detail.list.map((listItem) => `<li>${listItem}</li>`).join("")}</ul>`
              : ""
          }
        </section>
      `
    )
    .join("");

  return `
    <details class="case-details">
      <summary tabindex="0" aria-label="Подробнее: ${escapeAttribute(item.title)}">
        <span>Подробнее</span>
      </summary>
      <div class="case-facts">
        ${details}
      </div>
    </details>
  `;
}

function renderSimpleGrid(section, rootSelector, className) {
  const root = document.querySelector(rootSelector);
  if (!root) {
    return;
  }

  root.innerHTML = `
    ${renderSectionHead(section)}
    <div class="${className}">
      ${section.items
          .map(
            (item, index) => `
              <article class="${className}-item reveal" style="--reveal-delay:${index * 70}ms">
                <h3>${item.title}</h3>
                ${item.body ? `<p>${item.body}</p>` : ""}
                ${
                  item.items
                    ? `<ul>${item.items.map((listItem) => `<li>${listItem}</li>`).join("")}</ul>`
                    : ""
                }
              </article>
            `
          )
          .join("")}
    </div>
  `;
}

function renderCases() {
  const root = document.querySelector("#cases-section");
  if (!root) {
    return;
  }

  root.innerHTML = `
    ${renderSectionHead(content.cases)}
    <div class="cases-list">
      ${content.cases.items
        .map((item, index) => {
          const resultMetrics = item.businessResultMetrics || [];
          const hasResult = Boolean(item.businessResult) || resultMetrics.length > 0;
          const surfaceMetrics = item.metrics || [];

          return `
            <article class="case-card ${index % 2 === 1 ? "case-card-reverse" : ""} reveal" style="--reveal-delay:${index * 90}ms">
              <div class="case-copy">
                <p class="case-company">${item.company}${item.context ? ` · ${item.context}` : ""}</p>
                <h3>${item.title}</h3>
                <p class="case-summary">${item.summary}</p>
                <div class="case-surface">
                  ${item.problem ? `<section><span>Проблема</span><p>${item.problem}</p></section>` : ""}
                  ${item.role ? `<section><span>Роль</span><p>${item.role}</p></section>` : ""}
                  ${
                    hasResult
                      ? `<section class="case-surface-result">
                          <span>Итог</span>
                          ${item.businessResult ? `<p>${item.businessResult}</p>` : ""}
                          ${
                            resultMetrics.length
                              ? `<ul class="case-result-metrics">${resultMetrics
                                  .map((metric) => `<li>${metric}</li>`)
                                  .join("")}</ul>`
                              : ""
                          }
                        </section>`
                      : ""
                  }
                </div>
                ${
                  surfaceMetrics.length
                    ? `<ul class="case-metric-strip">
                        ${surfaceMetrics.map((metric) => `<li>${metric}</li>`).join("")}
                      </ul>`
                    : ""
                }
                ${renderCaseDetails(item)}
              </div>
              <div class="case-art">
                ${renderSafeVisual(item)}
              </div>
            </article>
          `;
        })
        .join("")}
    </div>
  `;
}

function renderMidCta() {
  const root = document.querySelector("#mid-cta-section");
  if (!root) {
    return;
  }

  root.innerHTML = `
    <div class="cta-band reveal">
      <div>
        <h2>${content.midCta.title}</h2>
        <p>${content.midCta.body}</p>
      </div>
      <div class="cta-row">
        ${content.midCta.actions.map(renderButton).join("")}
      </div>
    </div>
  `;
}

function renderProfitEfficiency() {
  renderSimpleGrid(content.profitEfficiency, "#profit-section", "profit-grid");
}

function renderManagementScope() {
  renderSimpleGrid(content.managementScope, "#management-section", "management-grid");
}

function renderFirst90Days() {
  const root = document.querySelector("#first90-section");
  if (!root) {
    return;
  }

  root.innerHTML = `
    ${renderSectionHead(content.first90Days)}
    <div class="first90-grid">
      ${content.first90Days.periods
        .map(
          (period, index) => `
            <article class="first90-item reveal" style="--reveal-delay:${index * 75}ms">
              <p class="first90-label">${period.label}</p>
              <h3>${period.title}</h3>
              <ul>
                ${period.items.map((item) => `<li>${item}</li>`).join("")}
              </ul>
            </article>
          `
        )
        .join("")}
    </div>
  `;
}

function renderOperatingModel() {
  const root = document.querySelector("#model-section");
  if (!root) {
    return;
  }

  root.innerHTML = `
    ${renderSectionHead(content.operatingModel)}
    <div class="model-overview">
      ${content.operatingModel.surface
        .map(
          (item, index) => `
            <article class="model-signal reveal" style="--reveal-delay:${index * 70}ms">
              <h3>${item.title}</h3>
              <p>${item.body}</p>
            </article>
          `
        )
        .join("")}
    </div>
    <details class="progressive-details model-details reveal">
      <summary tabindex="0" aria-label="Показать полный маршрут delivery">
        <span>Показать полный маршрут delivery</span>
      </summary>
      <div class="model-grid">
        ${content.operatingModel.steps
          .map(
            (item, index) => `
              <article class="model-step" style="--reveal-delay:${index * 55}ms">
                <span>${item.step}</span>
                <h3>${item.title}</h3>
                <p>${item.body}</p>
              </article>
            `
          )
          .join("")}
      </div>
    </details>
  `;
}

function renderDomains() {
  const root = document.querySelector("#domains-section");
  if (!root) {
    return;
  }

  root.innerHTML = `
    <div class="domains-layout reveal">
      <div class="domains-copy">
        ${content.domains.eyebrow ? `<p class="section-kicker">${content.domains.eyebrow}</p>` : ""}
        <h2>${content.domains.title}</h2>
        ${content.domains.intro ? `<p>${content.domains.intro}</p>` : ""}
      </div>
      <div class="domain-bubble-chart" aria-label="Домены аналитических задач">
        ${content.domains.items
          .map(
            (item, index) =>
              `<span class="domain-bubble domain-bubble-${(index % 4) + 1}">${item}</span>`
          )
          .join("")}
      </div>
    </div>
  `;
}

function renderTechContext() {
  const root = document.querySelector("#tech-section");
  if (!root) {
    return;
  }

  const architecture = content.techContext.architecture;
  const architectureHtml = architecture
    ? `
      <div class="architecture-card reveal">
        <div class="architecture-copy">
          <h3>${architecture.title}</h3>
        </div>
        <ol class="architecture-flow">
          ${architecture.stages
            .map(
              (stage) => `
                <li>
                  <strong>${stage.title}</strong>
                  <span>${stage.body}</span>
                </li>
              `
            )
            .join("")}
        </ol>
        <ul class="architecture-rails">
          ${architecture.rails.map((rail) => `<li>${rail}</li>`).join("")}
        </ul>
      </div>
    `
    : "";

  root.innerHTML = `
    ${renderSectionHead(content.techContext)}
    ${architectureHtml}
    <details class="progressive-details tech-details reveal">
      <summary tabindex="0" aria-label="Показать технический контекст">
        <span>Показать технический контекст</span>
      </summary>
      <div class="tech-grid">
      ${content.techContext.items
        .map(
          (item, index) => `
            <article class="tech-item" style="--reveal-delay:${index * 70}ms">
              <h3>${item.title}</h3>
              <p>${item.body}</p>
            </article>
          `
        )
        .join("")}
      </div>
    </details>
  `;
}

function renderSpeaking() {
  const root = document.querySelector("#speaking-section");
  if (!root) {
    return;
  }

  root.innerHTML = `
    ${renderSectionHead(content.speaking)}
    <div class="speaking-grid">
      ${content.speaking.items
        .map(
          (item, index) => `
            <article class="speaking-item reveal" style="--reveal-delay:${index * 70}ms">
              <h3>${item.title}</h3>
              <p>${item.body}</p>
            </article>
          `
        )
        .join("")}
    </div>
  `;
}

function renderTimeline() {
  const root = document.querySelector("#timeline-section");
  if (!root) {
    return;
  }

  root.innerHTML = `
    ${renderSectionHead(content.timeline)}
    <div class="timeline-list">
      ${content.timeline.items
        .map(
          (item, index) => `
            <article class="timeline-item ${item.current ? "timeline-item-current" : ""} reveal" style="--reveal-delay:${index * 90}ms">
              <p class="timeline-period">${item.period}</p>
              <div class="timeline-content">
                <h3>${item.company}</h3>
                <p class="timeline-role">${item.role}</p>
                <p>${item.body}</p>
              </div>
            </article>
          `
        )
        .join("")}
    </div>
  `;
}

function renderBestFit() {
  const root = document.querySelector("#fit-section");
  if (!root) {
    return;
  }

  root.innerHTML = `
    ${renderSectionHead(content.bestFit)}
    <div class="fit-grid">
      ${content.bestFit.items
        .map(
          (item, index) => `
            <article class="fit-item reveal" style="--reveal-delay:${index * 70}ms">
              <h3>${item.title}</h3>
              <p>${item.body}</p>
            </article>
          `
        )
        .join("")}
    </div>
  `;
}

function renderContact() {
  const root = document.querySelector("#contact-section");
  if (!root) {
    return;
  }

  root.innerHTML = `
    ${renderSectionHead(content.contact)}
    <div class="contact-band reveal">
      <div class="contact-copy">
        <p class="contact-roles">${content.contact.roles}</p>
        ${content.contact.closing ? `<p class="contact-note">${content.contact.closing}</p>` : ""}
      </div>
      <div class="contact-actions">
        ${content.contact.actions.map(renderButton).join("")}
      </div>
    </div>
  `;
}

function renderFooter() {
  const node = document.querySelector("[data-footer-note]");
  if (node) {
    node.textContent = content.footer.note;
    node.hidden = !content.footer.note;
  }
}

function setupReveal() {
  const revealNodes = document.querySelectorAll(".reveal");

  if (!("IntersectionObserver" in window)) {
    revealNodes.forEach((node) => node.classList.add("visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("visible");
        obs.unobserve(entry.target);
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -6% 0px"
    }
  );

  revealNodes.forEach((node) => observer.observe(node));
}

function setupActiveNav() {
  const navLinks = Array.from(document.querySelectorAll("[data-nav-link]"));
  const sections = navLinks
    .map((link) => document.querySelector(`#${link.dataset.navLink}`))
    .filter(Boolean);

  if (!("IntersectionObserver" in window) || navLinks.length === 0) {
    return;
  }

  const byId = new Map(navLinks.map((link) => [link.dataset.navLink, link]));
  let lockedNavId = null;
  let lockedUntil = 0;

  function setActive(id) {
    navLinks.forEach((link) => {
      const isActive = link.dataset.navLink === id;
      link.classList.toggle("is-active", isActive);
      if (isActive) {
        link.setAttribute("aria-current", "true");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      lockedNavId = link.dataset.navLink;
      lockedUntil = Date.now() + 1400;
      setActive(lockedNavId);
    });
  });

  window.addEventListener("hashchange", () => {
    const currentId = window.location.hash.replace("#", "");
    if (byId.has(currentId)) {
      lockedNavId = currentId;
      lockedUntil = Date.now() + 1400;
      setActive(currentId);
    }
  });

  const initialId = window.location.hash
    ? window.location.hash.replace("#", "")
    : content.navigation[0]?.id;

  if (byId.has(initialId)) {
    lockedNavId = initialId;
    lockedUntil = Date.now() + 3000;
    setActive(initialId);
  }

  const observer = new IntersectionObserver(
    (entries) => {
      if (lockedNavId && Date.now() < lockedUntil) {
        setActive(lockedNavId);
        return;
      }

      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((left, right) => right.intersectionRatio - left.intersectionRatio)[0];

      if (!visible) {
        return;
      }

      setActive(visible.target.id);
    },
    {
      threshold: [0.08, 0.22, 0.45],
      rootMargin: "-18% 0px -68% 0px"
    }
  );

  sections.forEach((section) => observer.observe(section));

  const firstLink = byId.get(content.navigation[0]?.id);
  const currentId = initialId;

  if (byId.has(currentId)) {
    setActive(currentId);
  } else if (firstLink) {
    setActive(content.navigation[0]?.id);
  }
}

function setupDetailsKeyboard() {
  document.querySelectorAll("details > summary").forEach((summary) => {
    summary.addEventListener("keydown", (event) => {
      const isToggleKey =
        event.key === "Enter" || event.key === " " || event.key === "Spacebar";

      if (!isToggleKey) {
        return;
      }

      const details = summary.parentElement;
      if (!details || details.tagName.toLowerCase() !== "details") {
        return;
      }

      event.preventDefault();
      details.open = !details.open;
    });
  });
}

function init() {
  renderMeta();
  renderNavigation();
  renderHero();
  renderValuePillars();
  renderMetrics();
  renderCases();
  renderProfitEfficiency();
  renderMidCta();
  renderManagementScope();
  renderOperatingModel();
  renderDomains();
  renderTechContext();
  renderSpeaking();
  renderTimeline();
  renderBestFit();
  renderFirst90Days();
  renderContact();
  renderFooter();
  setupDetailsKeyboard();
  setupReveal();
  setupActiveNav();

  if (yearNode) {
    yearNode.textContent = String(new Date().getFullYear());
  }

  window.requestAnimationFrame(() => {
    document.body.classList.add("is-ready");
  });
}

init();
