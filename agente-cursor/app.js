(function () {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- Smooth scrolling ---- */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const target = document.querySelector(targetId);
        if (!target) return;

        e.preventDefault();
        closeMobileNav();

        const headerHeight = document.getElementById('header').offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: prefersReducedMotion ? 'auto' : 'smooth'
        });

        history.pushState(null, '', targetId);
      });
    });
  }

  /* ---- Mobile navigation ---- */
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');

  function closeMobileNav() {
    if (!navToggle || !mainNav) return;
    navToggle.classList.remove('is-active');
    navToggle.setAttribute('aria-expanded', 'false');
    mainNav.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  function initMobileNav() {
    if (!navToggle || !mainNav) return;

    navToggle.addEventListener('click', function () {
      const isOpen = mainNav.classList.toggle('is-open');
      navToggle.classList.toggle('is-active', isOpen);
      navToggle.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
  }

  /* ---- Sticky header ---- */
  function initStickyHeader() {
    const header = document.getElementById('header');
    if (!header) return;

    function updateHeader() {
      header.classList.toggle('is-scrolled', window.scrollY > 40);
    }

    updateHeader();
    window.addEventListener('scroll', updateHeader, { passive: true });
  }

  /* ---- Active nav link on scroll ---- */
  function initActiveNavLinks() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.header__link[href^="#"]');

    if (!sections.length || !navLinks.length) return;

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach(function (link) {
              link.classList.toggle('is-active', link.getAttribute('href') === '#' + id);
            });
          }
        });
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    );

    sections.forEach(function (section) {
      observer.observe(section);
    });
  }

  /* ---- IntersectionObserver: fade-in reveals ---- */
  function initRevealAnimations() {
    const revealElements = document.querySelectorAll('.reveal');

    if (!revealElements.length) return;

    if (prefersReducedMotion) {
      revealElements.forEach(function (el) {
        el.classList.add('is-visible');
      });
      return;
    }

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    revealElements.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ---- Feature cards: progress bars ---- */
  function initProgressBars() {
    const cards = document.querySelectorAll('.feature-card');

    if (!cards.length) return;

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            const card = entry.target;
            const bar = card.querySelector('.feature-card__meter-bar');
            if (bar) {
              const progress = bar.getAttribute('data-progress') || '0';
              bar.style.setProperty('--progress', progress + '%');
            }
            card.classList.add('is-visible');
            observer.unobserve(card);
          }
        });
      },
      { threshold: 0.3 }
    );

    cards.forEach(function (card) {
      observer.observe(card);
    });
  }

  /* ---- 3D tilt effect on feature cards ---- */
  function initCardTilt() {
    if (prefersReducedMotion || window.matchMedia('(max-width: 767px)').matches) return;

    document.querySelectorAll('[data-tilt]').forEach(function (card) {
      const glow = card.querySelector('.feature-card__glow');

      card.addEventListener('mousemove', function (e) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -6;
        const rotateY = ((x - centerX) / centerX) * 6;

        card.style.transform = 'perspective(800px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) translateY(-4px)';

        if (glow) {
          const percentX = (x / rect.width) * 100;
          const percentY = (y / rect.height) * 100;
          glow.style.setProperty('--mouse-x', percentX + '%');
          glow.style.setProperty('--mouse-y', percentY + '%');
        }
      });

      card.addEventListener('mouseleave', function () {
        card.style.transform = '';
      });
    });
  }

  /* ---- Cursor glow follower ---- */
  function initCursorGlow() {
    const glow = document.querySelector('.cursor-glow');
    if (!glow || prefersReducedMotion || window.matchMedia('(max-width: 767px)').matches) return;

    let mouseX = 0;
    let mouseY = 0;
    let glowX = 0;
    let glowY = 0;

    document.addEventListener('mousemove', function (e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      document.body.classList.add('cursor-active');
    });

    document.addEventListener('mouseleave', function () {
      document.body.classList.remove('cursor-active');
    });

    function animateGlow() {
      glowX += (mouseX - glowX) * 0.08;
      glowY += (mouseY - glowY) * 0.08;
      glow.style.left = glowX + 'px';
      glow.style.top = glowY + 'px';
      requestAnimationFrame(animateGlow);
    }

    animateGlow();
  }

  /* ---- Hero stats counter animation ---- */
  function initCounterAnimation() {
    const stats = document.querySelectorAll('.hero__stat-value[data-count]');
    if (!stats.length || prefersReducedMotion) {
      stats.forEach(function (stat) {
        const target = parseInt(stat.getAttribute('data-count'), 10);
        stat.textContent = target;
        if (target === 100) stat.setAttribute('data-suffix', '%');
      });
      return;
    }

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;

          const el = entry.target;
          const target = parseInt(el.getAttribute('data-count'), 10);
          const duration = 1800;
          const startTime = performance.now();
          const suffix = target === 100 ? '%' : '';

          if (suffix) el.setAttribute('data-suffix', '%');

          function easeOutExpo(t) {
            return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
          }

          function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const value = Math.round(easeOutExpo(progress) * target);
            el.textContent = value;
            if (progress < 1) {
              requestAnimationFrame(update);
            }
          }

          requestAnimationFrame(update);
          observer.unobserve(el);
        });
      },
      { threshold: 0.5 }
    );

    stats.forEach(function (stat) {
      observer.observe(stat);
    });
  }

  /* ---- Terminal typing effect ---- */
  function initTerminalEffect() {
    if (prefersReducedMotion) return;

    const outputs = document.querySelectorAll('.terminal__output, .terminal__success');
    const terminal = document.querySelector('.terminal');

    if (!outputs.length || !terminal) return;

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;

          outputs.forEach(function (line, index) {
            const text = line.textContent;
            line.textContent = '';
            line.style.opacity = '0';

            setTimeout(function () {
              line.style.opacity = '1';
              line.style.transition = 'opacity 0.3s ease';
              let charIndex = 0;

              function typeChar() {
                if (charIndex < text.length) {
                  line.textContent += text.charAt(charIndex);
                  charIndex++;
                  setTimeout(typeChar, 18 + Math.random() * 25);
                }
              }

              typeChar();
            }, index * 600);
          });

          observer.unobserve(terminal);
        });
      },
      { threshold: 0.4 }
    );

    observer.observe(terminal);
  }

  /* ---- Parallax on hero orbs ---- */
  function initParallax() {
    if (prefersReducedMotion) return;

    const orbs = document.querySelectorAll('.hero__orb');

    window.addEventListener('scroll', function () {
      const scrollY = window.scrollY;
      orbs.forEach(function (orb, i) {
        const speed = i === 0 ? 0.15 : 0.1;
        orb.style.transform = 'translateY(' + scrollY * speed + 'px)';
      });
    }, { passive: true });
  }

  /* ---- Contact form (frontend only) ---- */
  function initContactForm() {
    const form = document.getElementById('contactForm');
    const feedback = document.getElementById('formFeedback');

    if (!form || !feedback) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const name = form.querySelector('#name');
      const email = form.querySelector('#email');
      const message = form.querySelector('#message');
      let valid = true;

      [name, email, message].forEach(function (field) {
        field.classList.remove('is-invalid');
        if (!field.value.trim()) {
          field.classList.add('is-invalid');
          valid = false;
        }
      });

      if (email.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        email.classList.add('is-invalid');
        valid = false;
      }

      feedback.className = 'form-feedback';

      if (!valid) {
        feedback.textContent = 'Por favor, completa todos los campos correctamente.';
        feedback.classList.add('is-error');
        return;
      }

      const submitBtn = form.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.style.opacity = '0.7';

      setTimeout(function () {
        feedback.textContent = 'Gracias por compartir tu prompt. Te contactaremos pronto.';
        feedback.classList.add('is-success');
        form.reset();
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';
      }, 800);
    });

    form.querySelectorAll('.form-input').forEach(function (input) {
      input.addEventListener('input', function () {
        this.classList.remove('is-invalid');
      });
    });
  }

  /* ---- Initialize all modules ---- */
  function init() {
    initSmoothScroll();
    initMobileNav();
    initStickyHeader();
    initActiveNavLinks();
    initRevealAnimations();
    initProgressBars();
    initCardTilt();
    initCursorGlow();
    initCounterAnimation();
    initTerminalEffect();
    initParallax();
    initContactForm();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
