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

function renderSectionHead(section) {
  return `
    <div class="section-head reveal">
      <p class="section-kicker">${section.eyebrow}</p>
      <div class="section-head-grid">
        <h2>${section.title}</h2>
        <p>${section.intro}</p>
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
      <p class="hero-badge hero-motion">${content.hero.badge}</p>
      <p class="hero-name hero-motion">${content.hero.name}</p>
      <p class="hero-role hero-motion">${content.hero.role}</p>
      <h1 class="hero-headline hero-motion">${content.hero.headline}</h1>
      <p class="hero-summary hero-motion">${content.hero.summary}</p>
      <p class="hero-proof hero-motion">${content.hero.proofLine}</p>
      <ul class="trust-strip hero-motion">
        ${content.hero.trustMarks.map((item) => `<li>${item}</li>`).join("")}
      </ul>
      <div class="cta-row hero-motion">
        ${content.hero.ctas.map(renderButton).join("")}
      </div>
    </div>
  `;

  heroMedia.innerHTML = `
    <div class="portrait-frame hero-motion">
      <img src="${content.hero.portrait.src}" alt="${content.hero.portrait.alt}" loading="eager" />
    </div>
    <div class="hero-note hero-motion">
      <p>${content.hero.note}</p>
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
    <div class="impact-panel reveal">
      <div class="impact-grid">
        ${content.metrics.items
          .map(
            (item, index) => `
              <article class="impact-item" style="--reveal-delay:${index * 40}ms">
                <strong>${item.value}</strong>
                <span>${item.label}</span>
              </article>
            `
          )
          .join("")}
      </div>
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
        .map(
          (item, index) => `
            <article class="case-card ${index % 2 === 1 ? "case-card-reverse" : ""} reveal" style="--reveal-delay:${index * 90}ms">
              <div class="case-copy">
                <p class="case-company">${item.company}</p>
                <h3>${item.title}</h3>
                <p class="case-summary">${item.summary}</p>
                <ul class="case-metric-strip">
                  ${item.metrics.map((metric) => `<li>${metric}</li>`).join("")}
                </ul>
                <div class="case-facts">
                  <section>
                    <span>Контекст</span>
                    <p>${item.challenge}</p>
                  </section>
                  <section>
                    <span>Моя роль</span>
                    <p>${item.role}</p>
                  </section>
                  <section>
                    <span>Что сделал</span>
                    <ul>
                      ${item.actions.map((action) => `<li>${action}</li>`).join("")}
                    </ul>
                  </section>
                  <section>
                    <span>Результат</span>
                    <p>${item.result}</p>
                  </section>
                </div>
                <div class="case-takeaway">
                  <span>Почему это важно</span>
                  <p>${item.takeaway}</p>
                </div>
              </div>
              <div class="case-art">
                ${renderSafeVisual(item)}
              </div>
            </article>
          `
        )
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
        <p class="section-kicker">Контактный блок</p>
        <h2>${content.midCta.title}</h2>
        <p>${content.midCta.body}</p>
      </div>
      <div class="cta-row">
        ${content.midCta.actions.map(renderButton).join("")}
      </div>
    </div>
  `;
}

function renderLeadership() {
  const root = document.querySelector("#leadership-section");
  if (!root) {
    return;
  }

  root.innerHTML = `
    ${renderSectionHead(content.leadership)}
    <div class="leadership-layout">
      <aside class="leadership-summary reveal">
        <p class="leadership-summary-copy">${content.leadership.summary}</p>
        <ul class="leadership-stats">
          ${content.leadership.stats.map((item) => `<li>${item}</li>`).join("")}
        </ul>
      </aside>
      <div class="leadership-grid">
        ${content.leadership.items
          .map(
            (item, index) => `
              <article class="leadership-item reveal" style="--reveal-delay:${index * 60}ms">
                <h3>${item.title}</h3>
                <p>${item.body}</p>
              </article>
            `
          )
          .join("")}
      </div>
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
    <div class="model-grid">
      ${content.operatingModel.steps
        .map(
          (item, index) => `
            <article class="model-step reveal" style="--reveal-delay:${index * 55}ms">
              <span>${item.step}</span>
              <h3>${item.title}</h3>
              <p>${item.body}</p>
            </article>
          `
        )
        .join("")}
    </div>
  `;
}

function renderDomains() {
  const root = document.querySelector("#domains-section");
  if (!root) {
    return;
  }

  root.innerHTML = `
    ${renderSectionHead(content.domains)}
    <div class="domains-panel reveal">
      <div class="domain-chip-grid">
        ${content.domains.items
          .map((item) => `<span class="domain-chip">${item}</span>`)
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

  root.innerHTML = `
    ${renderSectionHead(content.techContext)}
    <div class="tech-grid">
      ${content.techContext.items
        .map(
          (item, index) => `
            <article class="tech-item reveal" style="--reveal-delay:${index * 70}ms">
              <h3>${item.title}</h3>
              <p>${item.body}</p>
            </article>
          `
        )
        .join("")}
    </div>
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
            <article class="timeline-item reveal" style="--reveal-delay:${index * 90}ms">
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
        <div class="contact-list">
          <p><strong>Email</strong><a href="mailto:${content.contact.email}">${content.contact.email}</a></p>
          <p><strong>Telegram</strong><a href="${content.contact.telegramUrl}" target="_blank" rel="noopener noreferrer">${content.contact.telegram}</a></p>
          <p><strong>Резюме</strong><a href="${content.contact.resumeUrl}" target="_blank" rel="noopener noreferrer">PDF</a></p>
        </div>
        <p class="contact-note">${content.contact.closing}</p>
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

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((left, right) => right.intersectionRatio - left.intersectionRatio)[0];

      if (!visible) {
        return;
      }

      navLinks.forEach((link) => {
        const isActive = link.dataset.navLink === visible.target.id;
        link.classList.toggle("is-active", isActive);
        if (isActive) {
          link.setAttribute("aria-current", "true");
        } else {
          link.removeAttribute("aria-current");
        }
      });
    },
    {
      threshold: [0.2, 0.45, 0.7],
      rootMargin: "-22% 0px -56% 0px"
    }
  );

  sections.forEach((section) => observer.observe(section));

  const firstLink = byId.get(content.navigation[0]?.id);
  if (firstLink) {
    firstLink.classList.add("is-active");
    firstLink.setAttribute("aria-current", "true");
  }
}

function init() {
  renderMeta();
  renderNavigation();
  renderHero();
  renderValuePillars();
  renderMetrics();
  renderCases();
  renderMidCta();
  renderLeadership();
  renderOperatingModel();
  renderDomains();
  renderTechContext();
  renderSpeaking();
  renderTimeline();
  renderBestFit();
  renderContact();
  renderFooter();
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
