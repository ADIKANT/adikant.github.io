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
  const isTelegram = /t\.me|telegram/i.test(`${link.href || ""} ${link.label || ""}`);
  const isHeadHunter = /hh\.ru|headhunter/i.test(`${link.href || ""} ${link.label || ""}`);
  const icon = isTelegram
    ? `<span class="btn-icon btn-icon-telegram" aria-hidden="true">
        <svg viewBox="0 0 24 24" focusable="false">
          <path d="M20.7 4.4 3.8 10.9c-1 .4-1 1.7.1 2l4.2 1.3 1.6 4.9c.3.9 1.4 1.1 2 .4l2.3-2.4 4.3 3.2c.8.6 1.9.1 2-1l2.2-13.5c.2-1-.8-1.8-1.8-1.4Zm-4 4.5-6.1 5.5-.3 2.6-1-3.2 7.4-4.9Z" />
        </svg>
      </span>`
    : isHeadHunter
      ? `<span class="btn-icon btn-icon-hh" aria-hidden="true">hh</span>`
      : "";
  const extraClass = isHeadHunter ? " btn-headhunter" : "";

  return `<a class="btn btn-${link.kind || "secondary"}${extraClass}" href="${link.href}"${attrs}>${icon}<span class="btn-label">${link.label}</span></a>`;
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
    </div>
  `;

  heroMedia.innerHTML = `
    <div class="portrait-frame hero-motion">
      <img src="${content.hero.portrait.src}" alt="${content.hero.portrait.alt}" loading="eager" />
    </div>
  `;

  const heroGrid = heroCopy.closest(".hero-grid");
  if (heroGrid) {
    const proofPoints = content.hero.proofPoints?.length
      ? `
        <ul class="hero-proof-list" aria-label="Ключевые доказательства">
          ${content.hero.proofPoints
            .map(
              (item) => `
                <li>
                  <strong>${item.value}</strong>
                  <span>${item.label}</span>
                </li>
              `
            )
            .join("")}
        </ul>
      `
      : "";

    heroGrid.querySelector(".hero-support")?.remove();
    heroGrid.insertAdjacentHTML(
      "beforeend",
      `
      <div class="hero-support hero-motion">
        <div class="hero-proof-card">
          <p class="hero-proof">${content.hero.proofLine}</p>
          ${proofPoints}
        </div>
        <div class="hero-profile">
          <p class="hero-name">${content.hero.name}</p>
          <p class="hero-role">${content.hero.role}</p>
        </div>
        <div class="hero-cta-row cta-row">
          ${content.hero.ctas.map(renderButton).join("")}
        </div>
      </div>
    `
    );
  }
}

function renderValueFit() {
  const root = document.querySelector("#value-section");
  if (!root) {
    return;
  }

  root.innerHTML = `
    ${renderSectionHead(content.valueFit)}
    <div class="value-grid">
      ${content.valueFit.items
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

function renderExperienceProof() {
  const root = document.querySelector("#experience-section");
  if (!root) {
    return;
  }

  root.innerHTML = `
    ${renderSectionHead(content.experienceProof)}
    <div class="experience-list">
      ${content.experienceProof.items
        .map(
          (item, index) => `
            <article class="experience-card ${item.current ? "experience-card-current" : ""} reveal" style="--reveal-delay:${index * 90}ms">
              <div class="experience-meta">
                <p class="timeline-period">${item.period}</p>
                <h3>${item.company}</h3>
                <p class="timeline-role">${item.role}</p>
                <p>${item.context}</p>
              </div>
              <div class="experience-proof">
                <div class="experience-metrics">
                  ${item.metrics
                    .map(
                      (metric) => `
                        <div class="experience-metric">
                          <strong>${metric.value}</strong>
                          <span>${metric.label}</span>
                        </div>
                      `
                    )
                    .join("")}
                </div>
              </div>
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
          const surfaceSections = [
            item.problem ? `<section><span>Задача</span><p>${item.problem}</p></section>` : "",
            item.actions ? `<section><span>Действия</span><p>${item.actions}</p></section>` : ""
          ].filter(Boolean);
          const surfaceMetrics = item.metrics || [];
          const resultItems = item.resultItems || [];
          const resultComparison = item.resultComparison;

          return `
            <article class="case-card reveal" style="--reveal-delay:${index * 90}ms">
              <div class="case-copy">
                <p class="case-company">${item.company}${item.context ? ` · ${item.context}` : ""}</p>
                <h3>${item.title}</h3>
                <p class="case-summary">${item.summary}</p>
                ${
                  surfaceSections.length
                    ? `<div class="case-surface">
                        ${surfaceSections.join("")}
                      </div>`
                    : ""
                }
                ${
                  surfaceMetrics.length
                    ? `<ul class="case-metric-strip">
                        ${surfaceMetrics.map((metric) => `<li>${metric}</li>`).join("")}
                      </ul>`
                    : ""
                }
              </div>
              ${
                resultItems.length || item.result
                  ? `<aside class="case-result-panel">
                      <span>Результат</span>
                      ${
                        resultComparison
                          ? `<div class="case-before-after" aria-label="Было и стало">
                              <div class="case-before-after-item">
                                <small>${resultComparison.before.label}</small>
                                <strong>${resultComparison.before.value}</strong>
                                <em>${resultComparison.before.note}</em>
                              </div>
                              <div class="case-before-after-arrow" aria-hidden="true">→</div>
                              <div class="case-before-after-item case-before-after-item-after">
                                <small>${resultComparison.after.label}</small>
                                <strong>${resultComparison.after.value}</strong>
                                <em>${resultComparison.after.note}</em>
                              </div>
                            </div>`
                          : resultItems.length
                          ? `<div class="case-result-grid">
                              ${resultItems
                                .map(
                                  (resultItem) => `
                                    <div class="case-result-item">
                                      <strong>${resultItem.value}</strong>
                                      <small>${resultItem.label}</small>
                                    </div>
                                  `
                                )
                                .join("")}
                            </div>`
                          : `<p>${item.result}</p>`
                      }
                      ${item.resultNote ? `<p class="case-result-note">${item.resultNote}</p>` : ""}
                    </aside>`
                  : ""
              }
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

function renderBusinessImpact() {
  const root = document.querySelector("#impact-section");
  if (!root) {
    return;
  }

  root.innerHTML = `
    ${renderSectionHead(content.businessImpact)}
    <div class="business-impact-grid">
      ${content.businessImpact.items
        .map(
          (item, index) => `
            <article class="business-impact-card business-impact-${item.tone || "default"} reveal" style="--reveal-delay:${index * 70}ms">
              <div>
                <strong>${item.value}</strong>
                <span>${item.label}</span>
              </div>
              <p>${item.body}</p>
            </article>
          `
        )
        .join("")}
    </div>
  `;
}

function renderManagementPlaybook() {
  const root = document.querySelector("#management-section");
  if (!root) {
    return;
  }

  const playbook = content.managementPlaybook;
  const delivery = playbook.delivery;
  const first90 = playbook.first90Days;

  root.innerHTML = `
    ${renderSectionHead(playbook)}
    <div class="management-playbook-grid">
      ${playbook.pillars
        .map(
          (item, index) => `
            <article class="management-playbook-item reveal" style="--reveal-delay:${index * 70}ms">
              <h3>${item.title}</h3>
              ${
                item.items?.length
                  ? `<ul>${item.items.map((entry) => `<li>${entry}</li>`).join("")}</ul>`
                  : `<p>${item.body}</p>`
              }
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
        ${delivery.steps
          .map(
            (item) => `
              <article class="model-step">
                <span>${item.step}</span>
                <h3>${item.title}</h3>
                <p>${item.body}</p>
              </article>
            `
          )
          .join("")}
      </div>
    </details>
    <details class="progressive-details first90-details reveal">
      <summary tabindex="0" aria-label="${escapeAttribute(first90.title)}">
        <span>${first90.title}</span>
      </summary>
      <div class="first90-grid">
        ${first90.periods
          .map(
            (period) => `
              <article class="first90-item">
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
    </details>
  `;
}

function renderTechContext() {
  const root = document.querySelector("#platform-section");
  if (!root) {
    return;
  }

  const section = content.platformContext;
  const architecture = section.architecture;
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
                  ${
                    stage.tools?.length
                      ? `<ul class="architecture-tools">
                          ${stage.tools
                            .map(
                              (tool) => `
                                <li class="architecture-tool">
                                  <span class="architecture-tool-icon" aria-hidden="true">
                                    ${
                                      tool.iconUrl
                                        ? `<img src="${escapeAttribute(tool.iconUrl)}" alt="" loading="lazy" />`
                                        : tool.icon || ""
                                    }
                                  </span>
                                  <span>${tool.label}</span>
                                </li>
                              `
                            )
                            .join("")}
                        </ul>`
                      : ""
                  }
                </li>
              `
            )
            .join("")}
        </ol>
        ${
          architecture.rails?.length
            ? `<ul class="architecture-rails">
                ${architecture.rails.map((rail) => `<li>${rail}</li>`).join("")}
              </ul>`
            : ""
        }
      </div>
    `
    : "";

  root.innerHTML = `
    ${renderSectionHead(section)}
    ${architectureHtml}
    <details class="progressive-details tech-details reveal">
      <summary tabindex="0" aria-label="Показать платформенный контекст">
        <span>Показать платформенный контекст</span>
      </summary>
      <div class="tech-grid">
      ${section.items
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
  const root = document.querySelector("#publicity-section");
  if (!root) {
    return;
  }

  root.innerHTML = `
    ${renderSectionHead(content.publicity)}
    <div class="speaking-grid">
      ${content.publicity.items
        .map(
          (item, index) => `
            <article class="speaking-item reveal" style="--reveal-delay:${index * 70}ms">
              <h3>${item.title}</h3>
              <p>${item.body}</p>
              ${
                item.href
                  ? `<a class="speaking-link" href="${item.href}" target="_blank" rel="noopener noreferrer">${item.linkLabel || "Открыть запись"}</a>`
                  : ""
              }
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

  const hhResume = content.contact.hhResume;

  root.innerHTML = `
    ${renderSectionHead(content.contact)}
    <div class="contact-band reveal">
      <div class="contact-copy">
        <p class="contact-roles">${content.contact.roles}</p>
        ${content.contact.closing ? `<p class="contact-note">${content.contact.closing}</p>` : ""}
      </div>
      ${
        hhResume
          ? `<a class="contact-hh-card" href="${hhResume.href}" target="_blank" rel="noopener noreferrer" aria-label="${escapeAttribute(hhResume.title)}">
              <span class="contact-hh-icon" aria-hidden="true">
                ${hhResume.iconText || "hh"}
              </span>
              <span class="contact-hh-copy">
                <strong>${hhResume.title}</strong>
                <span>${hhResume.body}</span>
              </span>
            </a>`
          : ""
      }
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
  renderValueFit();
  renderExperienceProof();
  renderCases();
  renderBusinessImpact();
  renderMidCta();
  renderManagementPlaybook();
  renderTechContext();
  renderSpeaking();
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
