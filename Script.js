const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const questionForm = document.getElementById("questionForm");
const questionInput = document.getElementById("questionInput");
const formMessage = document.getElementById("formMessage");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
    menuToggle.textContent = isOpen ? "✕" : "☰";
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Abrir menu");
      menuToggle.textContent = "☰";
    });
  });
}

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const target = document.querySelector(link.getAttribute("href"));
    if (target) {
      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

if (questionForm && questionInput && formMessage) {
  questionForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const question = questionInput.value.trim();

    if (!question) {
      formMessage.textContent = "Por favor, escreva uma pergunta antes de continuar.";
      questionInput.focus();
      return;
    }

    formMessage.textContent = `Pergunta registada nesta demonstração: “${question}”. Para obter uma resposta automática, seria necessário ligar a página a um serviço de IA.`;
    questionForm.reset();
  });
}

const yearElement = document.getElementById("year");
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

const sections = document.querySelectorAll("main section[id]");
const navigationLinks = document.querySelectorAll(".nav-links a");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navigationLinks.forEach((link) => {
          link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
        });
      }
    });
  }, { rootMargin: "-35% 0px -55% 0px" });

  sections.forEach((section) => observer.observe(section));
}
