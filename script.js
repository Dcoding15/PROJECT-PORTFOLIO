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

const contactForm = document.querySelector("#contact-form");

if (contactForm) {
  const attachmentInput = contactForm.querySelector("#attachments");
  const attachmentList = contactForm.querySelector("#attachment-list");
  const formStatus = contactForm.querySelector("#form-status");
  const subjectInput = contactForm.querySelector("#message-subject");
  const mailSubject = contactForm.querySelector("#mail-subject");
  const maxFileSize = 5 * 1000 * 1000;
  const maxTotalSize = 10 * 1000 * 1000;

  attachmentInput.addEventListener("change", () => {
    const files = Array.from(attachmentInput.files);
    attachmentList.textContent = files.length
      ? files.map((file) => `${file.name} (${(file.size / 1000000).toFixed(2)} MB)`).join(", ")
      : "No files selected.";
    formStatus.textContent = "";
  });

  contactForm.addEventListener("submit", (event) => {
    const files = Array.from(attachmentInput.files);
    const oversizedFile = files.find((file) => file.size > maxFileSize);
    const totalSize = files.reduce((total, file) => total + file.size, 0);

    if (oversizedFile) {
      event.preventDefault();
      formStatus.textContent = `${oversizedFile.name} is larger than the 5 MB per-file limit.`;
      attachmentInput.focus();
      return;
    }

    if (totalSize > maxTotalSize) {
      event.preventDefault();
      formStatus.textContent = "The selected attachments exceed the 10 MB total limit.";
      attachmentInput.focus();
      return;
    }

    mailSubject.value = subjectInput.value.trim() || "New portfolio contact form message";
    formStatus.textContent = "Sending your message...";
  });
}

document.querySelectorAll("[data-current-year]").forEach((year) => {
  year.textContent = new Date().getFullYear();
});
