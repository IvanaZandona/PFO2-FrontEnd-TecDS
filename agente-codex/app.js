const body = document.body;
const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector("#nav-menu");
const navLinks = document.querySelectorAll(".nav-menu a");
const revealElements = document.querySelectorAll(".reveal");
const progressBar = document.querySelector(".progress-bar");
const cursorGlow = document.querySelector(".cursor-glow");
const tiltCards = document.querySelectorAll(".tilt-card");
const magneticButtons = document.querySelectorAll(".magnetic");
const metrics = document.querySelectorAll(".metric strong[data-count]");
const contactForm = document.querySelector(".contact-form");
const formNote = document.querySelector(".form-note");

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

menuToggle.addEventListener("click", () => {
  const isOpen = body.classList.toggle("menu-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
});

navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const target = document.querySelector(link.getAttribute("href"));

    if (!target) return;

    body.classList.remove("menu-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menú");

    target.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "start",
    });
  });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.16,
    rootMargin: "0px 0px -70px 0px",
  }
);

revealElements.forEach((element) => revealObserver.observe(element));

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const activeLink = document.querySelector(`.nav-menu a[href="#${entry.target.id}"]`);
      navLinks.forEach((link) => link.classList.remove("active"));

      if (activeLink) {
        activeLink.classList.add("active");
      }
    });
  },
  {
    threshold: 0.45,
  }
);

document.querySelectorAll("main section[id]").forEach((section) => {
  sectionObserver.observe(section);
});

function updateProgress() {
  const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollableHeight > 0 ? (window.scrollY / scrollableHeight) * 100 : 0;
  progressBar.style.width = `${Math.min(progress, 100)}%`;
}

window.addEventListener("scroll", updateProgress, { passive: true });
updateProgress();

if (!prefersReducedMotion) {
  window.addEventListener(
    "pointermove",
    (event) => {
      cursorGlow.style.opacity = "1";
      cursorGlow.style.transform = `translate3d(${event.clientX - 192}px, ${
        event.clientY - 192
      }px, 0)`;
    },
    { passive: true }
  );

  tiltCards.forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const rotateX = ((y / rect.height) - 0.5) * -8;
      const rotateY = ((x / rect.width) - 0.5) * 8;

      card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });

    card.addEventListener("pointerleave", () => {
      card.style.transform = "";
    });
  });

  magneticButtons.forEach((button) => {
    button.addEventListener("pointermove", (event) => {
      const rect = button.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;

      button.style.transform = `translate(${x * 0.08}px, ${y * 0.14}px)`;
    });

    button.addEventListener("pointerleave", () => {
      button.style.transform = "";
    });
  });
}

const metricObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const element = entry.target;
      const target = Number(element.dataset.count);
      const suffix = target === 100 ? "%" : "";

      if (prefersReducedMotion) {
        element.textContent = `${target}${suffix}`;
      } else {
        animateCount(element, target, suffix);
      }

      metricObserver.unobserve(element);
    });
  },
  { threshold: 0.8 }
);

metrics.forEach((metric) => metricObserver.observe(metric));

function animateCount(element, target, suffix) {
  const duration = 900;
  const start = performance.now();

  function frame(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.round(target * eased);

    element.textContent = `${value}${suffix}`;

    if (progress < 1) {
      requestAnimationFrame(frame);
    }
  }

  requestAnimationFrame(frame);
}

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const button = contactForm.querySelector("button");

  button.disabled = true;
  button.textContent = "Prompt recibido";
  formNote.textContent = "Gracias. Tu propuesta quedó lista para ser revisada por el equipo.";

  window.setTimeout(() => {
    button.disabled = false;
    button.innerHTML = `Enviar Prompt
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="m22 2-7 20-4-9-9-4 20-7Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`;
    contactForm.reset();
  }, 2200);
});
