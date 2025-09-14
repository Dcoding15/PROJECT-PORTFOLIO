// =========================
// Theme Toggle
// =========================
const themeToggle = document.getElementById("themeToggle");
const body = document.body;

// Load saved theme if available
if (localStorage.getItem("theme") === "light") {
  body.classList.remove("dark-mode");
  body.classList.add("light-mode");
  themeToggle.textContent = "☀️ Light";
}

themeToggle.addEventListener("click", () => {
  if (body.classList.contains("dark-mode")) {
    body.classList.remove("dark-mode");
    body.classList.add("light-mode");
    themeToggle.textContent = "☀️ Light";
    localStorage.setItem("theme", "light");
  } else {
    body.classList.remove("light-mode");
    body.classList.add("dark-mode");
    themeToggle.textContent = "🌙 Dark";
    localStorage.setItem("theme", "dark");
  }
});

// =========================
// Scroll Reveal Animation
// =========================
const revealCards = () => {
  const cards = document.querySelectorAll(".card");
  const windowHeight = window.innerHeight;

  cards.forEach(card => {
    const cardTop = card.getBoundingClientRect().top;
    if (cardTop < windowHeight - 100) {
      card.classList.add("visible");
    }
  });
};

window.addEventListener("scroll", revealCards);
window.addEventListener("load", revealCards);

// =========================
// Filters
// =========================
const filterButtons = document.querySelectorAll(".filters button");
const projectCards = document.querySelectorAll(".card");
const noResults = document.getElementById("noResults");

const checkNoResults = () => {
  const visibleCards = Array.from(projectCards).filter(
    card => card.style.display !== "none"
  );
  noResults.classList.toggle("hidden", visibleCards.length > 0);
};

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    filterButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    const category = button.getAttribute("data-filter");

    projectCards.forEach(card => {
      if (category === "all" || card.dataset.category === category) {
        card.style.display = "block";
        setTimeout(() => card.classList.add("visible"), 50);
      } else {
        card.style.display = "none";
      }
    });

    checkNoResults();
  });
});

// =========================
// Search Filter
// =========================
const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("keyup", () => {
  const query = searchInput.value.toLowerCase();

  projectCards.forEach(card => {
    const title = card.querySelector("h2").textContent.toLowerCase();
    const description = card.querySelector("p").textContent.toLowerCase();

    if (title.includes(query) || description.includes(query)) {
      card.style.display = "block";
      setTimeout(() => card.classList.add("visible"), 50);
    } else {
      card.style.display = "none";
    }
  });

  checkNoResults();
});
