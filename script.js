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

const gallerySlides = Array.from(document.querySelectorAll("[data-gallery-slide]"));
const galleryThumbs = Array.from(document.querySelectorAll("[data-gallery-thumb]"));
const galleryKicker = document.querySelector("#gallery-kicker");
const galleryTitle = document.querySelector("#gallery-title");
const galleryText = document.querySelector("#gallery-text");
const galleryTags = document.querySelector("#gallery-tags");

function renderGallery(index) {
  gallerySlides.forEach((slide, i) => {
    slide.classList.toggle("active", i === index);
  });

  galleryThumbs.forEach((thumb, i) => {
    thumb.classList.toggle("active", i === index);
  });

  const activeThumb = galleryThumbs[index];
  if (!activeThumb) {
    return;
  }

  if (galleryKicker) {
    galleryKicker.textContent = activeThumb.dataset.kicker || "";
  }

  if (galleryTitle) {
    galleryTitle.textContent = activeThumb.dataset.title || "";
  }

  if (galleryText) {
    galleryText.textContent = activeThumb.dataset.text || "";
  }

  if (galleryTags) {
    const tags = (activeThumb.dataset.tags || "")
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);

    galleryTags.innerHTML = "";
    tags.forEach((tag) => {
      const element = document.createElement("span");
      element.textContent = tag;
      galleryTags.appendChild(element);
    });
  }
}

galleryThumbs.forEach((thumb, index) => {
  thumb.addEventListener("click", () => {
    renderGallery(index);
  });
});

if (galleryThumbs.length > 0) {
  renderGallery(0);
}
