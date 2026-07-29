function setupRevealOnScroll() {
  const selector = [
    ".useful-item",
    ".experience-card",
    ".case-card",
    ".technical-project",
    ".process-card",
    ".leader-role-card",
    ".architecture-stage",
    ".speaking-card",
    ".contact-card",
    ".case-detail-block"
  ].join(", ");
  const items = Array.from(document.querySelectorAll(selector));

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

setupRevealOnScroll();
