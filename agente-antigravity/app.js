/* ============================================================
   AgentDevIA — app.js
   Tecnicatura Superior en Desarrollo de Software
   Autor: Generado por Agente IA (AgentDevIA)
   ============================================================ */

'use strict';

/* ──────────────────────────────────────────────────────────
   1. DOM Ready
   ────────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initNav();
  initHeroParallax();
  initScrollReveal();
  initMeterAnimations();
  initParticles();
  initCursorTrail();
  initCounters();
  initContactForm();
  initTerminalTyping();
  initCardTiltEffect();
});

/* ──────────────────────────────────────────────────────────
   2. Sticky Header — scroll-aware style
   ────────────────────────────────────────────────────────── */
function initHeader() {
  const header = document.getElementById('header');
  if (!header) return;

  const onScroll = () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load
}

/* ──────────────────────────────────────────────────────────
   3. Mobile Navigation Toggle + Smooth Scrolling
   ────────────────────────────────────────────────────────── */
function initNav() {
  const toggle   = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');
  const links    = document.querySelectorAll('.nav-links a[href^="#"]');

  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      toggle.classList.toggle('active', isOpen);
      // Prevent body scroll when menu open
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
  }

  // Smooth scrolling + close mobile menu
  links.forEach(link => {
    link.addEventListener('click', e => {
      const targetId = link.getAttribute('href');
      const target   = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();

      // Close mobile menu
      if (navLinks) {
        navLinks.classList.remove('open');
        toggle && toggle.classList.remove('active');
        document.body.style.overflow = '';
      }

      const headerH = document.getElementById('header')?.offsetHeight || 70;
      const top = target.getBoundingClientRect().top + window.scrollY - headerH;

      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

/* ──────────────────────────────────────────────────────────
   4. Hero Parallax on Mouse Move
   ────────────────────────────────────────────────────────── */
function initHeroParallax() {
  const hero  = document.getElementById('hero');
  const orbs  = hero ? hero.querySelectorAll('.hero-orb') : [];
  const grid  = hero ? hero.querySelector('.hero-grid') : null;

  if (!hero || !orbs.length) return;

  let rafId = null;
  let mx = 0, my = 0;

  hero.addEventListener('mousemove', e => {
    const rect = hero.getBoundingClientRect();
    mx = ((e.clientX - rect.left) / rect.width  - 0.5) * 2;  // -1 to 1
    my = ((e.clientY - rect.top)  / rect.height - 0.5) * 2;

    if (rafId) return;
    rafId = requestAnimationFrame(() => {
      orbs.forEach((orb, i) => {
        const depth = (i + 1) * 14;
        orb.style.transform = `translate(${mx * depth}px, ${my * depth}px)`;
      });
      if (grid) {
        grid.style.transform = `translate(${mx * 6}px, ${my * 6}px)`;
      }
      rafId = null;
    });
  });

  hero.addEventListener('mouseleave', () => {
    orbs.forEach(orb => {
      orb.style.transform = '';
    });
    if (grid) grid.style.transform = '';
  });
}

/* ──────────────────────────────────────────────────────────
   5. IntersectionObserver — Fade-in / Reveal
   ────────────────────────────────────────────────────────── */
function initScrollReveal() {
  const revealClasses = ['.reveal', '.reveal-left', '.reveal-right'];
  const elements = document.querySelectorAll(revealClasses.join(', '));

  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, idx) => {
        if (entry.isIntersecting) {
          // Stagger delay based on element's position in the group
          const siblings = entry.target.parentElement
            ? [...entry.target.parentElement.children].filter(el =>
                el.classList.contains('reveal') ||
                el.classList.contains('reveal-left') ||
                el.classList.contains('reveal-right')
              )
            : [];
          const index = siblings.indexOf(entry.target);
          const delay = Math.max(0, index * 80);

          setTimeout(() => {
            entry.target.classList.add('visible');
          }, delay);

          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
  );

  elements.forEach(el => observer.observe(el));
}

/* ──────────────────────────────────────────────────────────
   6. Progress Meter Animation (Features Cards)
   ────────────────────────────────────────────────────────── */
function initMeterAnimations() {
  const fills = document.querySelectorAll('.meter-fill[data-width]');
  if (!fills.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const fill   = entry.target;
          const target = fill.dataset.width;
          // Small delay to make it feel intentional
          setTimeout(() => {
            fill.style.width = target + '%';
          }, 300);
          observer.unobserve(fill);
        }
      });
    },
    { threshold: 0.5 }
  );

  fills.forEach(fill => observer.observe(fill));
}

/* ──────────────────────────────────────────────────────────
   7. Floating Particles — Hero Background
   ────────────────────────────────────────────────────────── */
function initParticles() {
  const container = document.getElementById('particles');
  if (!container) return;

  const PARTICLE_COUNT = 28;
  const colors = ['#db74cf', '#ffa5f4', '#ffdac0'];

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    createParticle(container, colors);
  }
}

function createParticle(container, colors) {
  const p = document.createElement('div');
  p.classList.add('particle');

  const size     = Math.random() * 4 + 1.5;        // 1.5–5.5 px
  const left     = Math.random() * 100;             // 0–100%
  const delay    = Math.random() * 12;              // 0–12s
  const duration = Math.random() * 10 + 12;         // 12–22s
  const color    = colors[Math.floor(Math.random() * colors.length)];

  p.style.cssText = `
    width: ${size}px;
    height: ${size}px;
    left: ${left}%;
    bottom: -10px;
    background: ${color};
    opacity: 0;
    animation: particleFloat ${duration}s ${delay}s linear infinite;
  `;

  container.appendChild(p);
}

/* ──────────────────────────────────────────────────────────
   8. Cursor Trail (Canvas)
   ────────────────────────────────────────────────────────── */
function initCursorTrail() {
  const canvas  = document.getElementById('cursor-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let points  = [];
  let mouse   = { x: -999, y: -999 };
  let rafId   = null;
  const MAX   = 28;

  const resize = () => {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  };

  resize();
  window.addEventListener('resize', resize, { passive: true });

  window.addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    points.push({ x: mouse.x, y: mouse.y, age: 0 });
    if (points.length > MAX) points.shift();
  }, { passive: true });

  const render = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    points = points.map(p => ({ ...p, age: p.age + 1 }))
                   .filter(p => p.age < MAX);

    for (let i = 1; i < points.length; i++) {
      const alpha  = (1 - points[i].age / MAX) * 0.55;
      const radius = (1 - points[i].age / MAX) * 6;

      // Gradient trail colour
      const t = i / points.length;
      const r = Math.round(219 + (255 - 219) * t);
      const g = Math.round(116 + (165 - 116) * t);
      const b = Math.round(207 + (244 - 207) * t);

      ctx.beginPath();
      ctx.arc(points[i].x, points[i].y, radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
      ctx.fill();
    }

    rafId = requestAnimationFrame(render);
  };

  render();
}

/* ──────────────────────────────────────────────────────────
   9. Animated Counters (Hero Stats)
   ────────────────────────────────────────────────────────── */
function initCounters() {
  const counters = document.querySelectorAll('.stat-number[data-target]');
  if (!counters.length) return;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach(c => observer.observe(c));
}

function animateCounter(el) {
  const target   = parseFloat(el.dataset.target);
  const suffix   = el.dataset.suffix || '';
  const prefix   = el.dataset.prefix || '';
  const duration = 1800;
  const start    = performance.now();

  const step = (now) => {
    const elapsed  = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased    = 1 - Math.pow(1 - progress, 4);
    const current  = eased * target;

    el.textContent = prefix + (Number.isInteger(target)
      ? Math.round(current)
      : current.toFixed(1)) + suffix;

    if (progress < 1) requestAnimationFrame(step);
  };

  requestAnimationFrame(step);
}

/* ──────────────────────────────────────────────────────────
   10. Contact Form — Visual Interaction
   ────────────────────────────────────────────────────────── */
function initContactForm() {
  const form  = document.getElementById('contact-form');
  const toast = document.getElementById('form-toast');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();

    const btn  = form.querySelector('.btn-submit');
    const name = form.querySelector('#f-name').value.trim();
    if (!name) {
      shakeField(form.querySelector('#f-name'));
      return;
    }

    // Loading state
    btn.disabled = true;
    btn.innerHTML = `
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" style="animation:spin 0.8s linear infinite">
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
      </svg>
      Enviando...
    `;

    // Simulate async send
    setTimeout(() => {
      btn.disabled = false;
      btn.innerHTML = `
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
        Mensaje Enviado
      `;
      btn.style.background = 'linear-gradient(135deg,#28c840,#5eff80)';

      if (toast) toast.classList.add('show');
      form.reset();

      setTimeout(() => {
        btn.innerHTML = `Compartir Prompt <span class="btn-arrow">&#x2192;</span>`;
        btn.style.background = '';
        toast && toast.classList.remove('show');
      }, 4000);
    }, 1600);
  });
}

function shakeField(input) {
  if (!input) return;
  input.style.borderColor = '#ff5f57';
  input.style.animation   = 'none';
  requestAnimationFrame(() => {
    input.style.animation = 'shake 0.4s ease';
  });
  setTimeout(() => {
    input.style.borderColor = '';
    input.style.animation   = '';
  }, 800);

  // Inject shake keyframe once
  if (!document.getElementById('shake-style')) {
    const s = document.createElement('style');
    s.id = 'shake-style';
    s.textContent = `
      @keyframes shake {
        0%,100% { transform: translateX(0); }
        20%      { transform: translateX(-8px); }
        40%      { transform: translateX(8px); }
        60%      { transform: translateX(-5px); }
        80%      { transform: translateX(5px); }
      }
    `;
    document.head.appendChild(s);
  }
}

/* ──────────────────────────────────────────────────────────
   11. Terminal Typing Animation
   ────────────────────────────────────────────────────────── */
function initTerminalTyping() {
  const typingEl = document.getElementById('typing-line');
  if (!typingEl) return;

  const lines = [
    { text: 'Evaluating agent autonomy...', delay: 0 },
    { text: 'Prompt precision: 94.7%',     delay: 1800 },
    { text: 'Token context handled: OK',   delay: 3400 },
    { text: 'Deployment ready.',           delay: 5000 },
  ];

  let lineIndex = 0;
  let charIndex = 0;
  let currentEl = null;

  const terminalBody = typingEl.parentElement;

  function typeNextLine() {
    if (lineIndex >= lines.length) {
      // Restart after pause
      setTimeout(() => {
        // Clear typed lines
        const typed = terminalBody.querySelectorAll('.typed-line');
        typed.forEach(el => {
          el.style.transition = 'opacity 0.5s';
          el.style.opacity = '0';
        });
        setTimeout(() => {
          typed.forEach(el => el.remove());
          lineIndex = 0;
          charIndex = 0;
          typeNextLine();
        }, 600);
      }, 3000);
      return;
    }

    const { text, delay } = lines[lineIndex];

    setTimeout(() => {
      currentEl = document.createElement('div');
      currentEl.classList.add('typed-line');
      currentEl.innerHTML = `<span class="t-prompt">$</span> `;
      currentEl.style.marginTop = '2px';

      // Insert before the cursor element
      terminalBody.insertBefore(currentEl, typingEl);

      charIndex = 0;

      const typeChar = () => {
        if (charIndex <= text.length) {
          const typed = text.slice(0, charIndex);
          currentEl.innerHTML = `<span class="t-prompt">$</span> <span class="t-cmd">${typed}</span>`;
          charIndex++;
          setTimeout(typeChar, 45 + Math.random() * 30);
        } else {
          // Add output line
          const out = document.createElement('div');
          out.classList.add('typed-line');
          out.innerHTML = `<span class="t-output">  Done.</span>`;
          terminalBody.insertBefore(out, typingEl);
          lineIndex++;
          typeNextLine();
        }
      };

      typeChar();
    }, delay === 0 ? 800 : 400);
  }

  typeNextLine();
}

/* ──────────────────────────────────────────────────────────
   12. 3D Card Tilt Effect (Feature & Testimonial Cards)
   ────────────────────────────────────────────────────────── */
function initCardTiltEffect() {
  const cards = document.querySelectorAll('.feature-card, .testimonial-card');

  cards.forEach(card => {
    let raf = null;

    card.addEventListener('mousemove', e => {
      const rect   = card.getBoundingClientRect();
      const cx     = rect.left + rect.width  / 2;
      const cy     = rect.top  + rect.height / 2;
      const dx     = (e.clientX - cx) / (rect.width  / 2);
      const dy     = (e.clientY - cy) / (rect.height / 2);

      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        card.style.transform = `
          perspective(800px)
          rotateY(${dx * 6}deg)
          rotateX(${-dy * 6}deg)
          translateY(-6px)
          scale(1.02)
        `;
        // Dynamic highlight
        card.style.background = `radial-gradient(
          circle at ${((e.clientX - rect.left) / rect.width) * 100}% ${((e.clientY - rect.top) / rect.height) * 100}%,
          rgba(219,116,207,.12) 0%,
          rgba(255,250,242,.03) 60%,
          transparent 100%
        )`;
      });
    });

    const reset = () => {
      if (raf) cancelAnimationFrame(raf);
      card.style.transform = '';
      card.style.background = '';
    };

    card.addEventListener('mouseleave', reset);
    card.addEventListener('blur', reset);
  });
}

/* ──────────────────────────────────────────────────────────
   13. Inject spin keyframe for loader icon
   ────────────────────────────────────────────────────────── */
(function injectSpinKeyframe() {
  const s = document.createElement('style');
  s.textContent = `@keyframes spin { to { transform: rotate(360deg); } }`;
  document.head.appendChild(s);
})();
