function setupDashboardEmbeds() {
  const buttons = Array.from(document.querySelectorAll("[data-dashboard-embed]"));

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const targetId = button.getAttribute("data-dashboard-embed");
      const embedUrl = button.getAttribute("data-embed-url");
      const title = button.getAttribute("data-embed-title") || "Интерактивный пример дашборда";
      const target = targetId ? document.getElementById(targetId) : null;

      if (!target || !embedUrl || target.querySelector("iframe")) {
        return;
      }

      const iframe = document.createElement("iframe");
      iframe.src = embedUrl;
      iframe.title = title;
      iframe.loading = "lazy";
      iframe.referrerPolicy = "no-referrer";
      iframe.className = "dashboard-iframe";

      target.append(iframe);
      button.setAttribute("disabled", "disabled");
      button.textContent = "Интерактивная версия загружена";
    });
  });
}

function setupRevealOnScroll() {
  const items = Array.from(
    document.querySelectorAll(
      [
        ".experience-card",
        ".useful-item",
        ".case-card",
        ".technical-project",
        ".process-card",
        ".leader-role-card",
        ".architecture-stage",
        ".speaking-card",
        ".contact-card"
      ].join(", ")
    )
  );

  if (items.length === 0) {
    return;
  }

  document.documentElement.classList.add("reveal-ready");
  items.forEach((item) => item.classList.add("reveal-item"));

  if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    items.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.16,
      rootMargin: "0px 0px -8% 0px"
    }
  );

  items.forEach((item) => observer.observe(item));
}

setupDashboardEmbeds();
setupRevealOnScroll();
