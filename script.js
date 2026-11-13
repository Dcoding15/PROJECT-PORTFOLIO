"use strict";

const menuToggle = document.querySelector(".menu-toggle");
const siteNavigation = document.querySelector(".site-nav");

if (menuToggle && siteNavigation) {
  menuToggle.addEventListener("click", () => {
    const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isExpanded));
    siteNavigation.classList.toggle("is-open", !isExpanded);
    menuToggle.querySelector(".menu-toggle-label").textContent = isExpanded ? "Menu" : "Close";
    menuToggle.querySelector(".menu-toggle-icon").textContent = isExpanded ? "+" : "−";
  });

  siteNavigation.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      menuToggle.setAttribute("aria-expanded", "false");
      siteNavigation.classList.remove("is-open");
      menuToggle.querySelector(".menu-toggle-label").textContent = "Menu";
      menuToggle.querySelector(".menu-toggle-icon").textContent = "+";
    }
  });
}

const projectSearch = document.querySelector("#project-search");

if (projectSearch) {
  const projectCards = Array.from(document.querySelectorAll(".project-card"));
  const projectCount = document.querySelector("#project-count");
  const emptyState = document.querySelector("#empty-state");

  projectSearch.addEventListener("input", () => {
    const searchTerm = projectSearch.value.trim().toLocaleLowerCase();
    let visibleProjects = 0;

    projectCards.forEach((card) => {
      const searchableText = `${card.dataset.search} ${card.textContent}`.toLocaleLowerCase();
      const matches = searchableText.includes(searchTerm);
      card.hidden = !matches;
      visibleProjects += Number(matches);
    });

    projectCount.textContent = `${String(visibleProjects).padStart(2, "0")} ${visibleProjects === 1 ? "PROJECT" : "PROJECTS"}`;
    emptyState.hidden = visibleProjects !== 0;
  });
}

document.querySelectorAll("[data-current-year]").forEach((year) => {
  year.textContent = new Date().getFullYear();
});
