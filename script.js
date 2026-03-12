const revealNodes = document.querySelectorAll(".reveal");
const filterButtons = document.querySelectorAll(".filter-btn");
const caseCards = document.querySelectorAll(".case-card");
const yearNode = document.querySelector("#year");

if (yearNode) {
  yearNode.textContent = String(new Date().getFullYear());
}

if ("IntersectionObserver" in window) {
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
    { threshold: 0.12 }
  );

  revealNodes.forEach((node) => observer.observe(node));
} else {
  revealNodes.forEach((node) => node.classList.add("visible"));
}

function applyFilter(filter) {
  caseCards.forEach((card) => {
    const tags = (card.dataset.tags || "").split(/\s+/).filter(Boolean);
    const isVisible = filter === "all" || tags.includes(filter);
    card.classList.toggle("is-hidden", !isVisible);
  });
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selected = button.dataset.filter || "all";
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
    applyFilter(selected);
  });
});
