/* ============================================
   ANJNEYA TECH — main.js  (redesign 2025)
   ============================================ */

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ─── NAV: scroll state + hide on scroll-down ─── */
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMobile = document.getElementById('navMobile');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const y = window.scrollY;
  navbar.classList.toggle('scrolled', y > 30);
  // hide when scrolling down past hero, show when scrolling up
  if (y > 400 && y > lastScroll && !navMobile.classList.contains('open')) {
    navbar.classList.add('hidden');
  } else {
    navbar.classList.remove('hidden');
  }
  lastScroll = y;
}, { passive: true });

hamburger.addEventListener('click', () => {
  const open = navMobile.classList.toggle('open');
  hamburger.classList.toggle('open', open);
  hamburger.setAttribute('aria-expanded', String(open));
});
navMobile.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navMobile.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});

/* ─── SCROLL PROGRESS BAR ─── */
const progress = document.getElementById('scrollProgress');
function updateProgress() {
  const h = document.documentElement;
  const max = h.scrollHeight - h.clientHeight;
  progress.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + '%';
}
window.addEventListener('scroll', updateProgress, { passive: true });
updateProgress();

/* ─── HERO SPOTLIGHT (follows cursor) ─── */
const spotlight = document.getElementById('spotlight');
const hero = document.querySelector('.hero');
if (spotlight && hero && !reduceMotion) {
  hero.addEventListener('pointermove', (e) => {
    const r = hero.getBoundingClientRect();
    spotlight.style.opacity = '1';
    spotlight.style.left = (e.clientX - r.left) + 'px';
    spotlight.style.top = (e.clientY - r.top) + 'px';
  });
  hero.addEventListener('pointerleave', () => { spotlight.style.opacity = '0'; });
}

/* ─── PHONE APP CAROUSEL ─── */
const APPS = [
  { icon: '🧩', name: 'Hexora', cat: 'Word Puzzle', rating: '★ 4.5', g: 'linear-gradient(135deg,#a855f7,#6366f1)' },
  { icon: '🔤', name: 'AlphaLeap', cat: 'ABC Learning', rating: '★ 4.8', g: 'linear-gradient(135deg,#fbbf24,#fb7185)' },
  { icon: '🔒', name: 'Obscura', cat: 'Private Vault', rating: '★ 4.6', g: 'linear-gradient(135deg,#22d3ee,#3b82f6)' },
];
const stage = document.getElementById('phoneStage');
if (stage) {
  stage.innerHTML = APPS.map((a, i) => `
    <div class="ph-slide${i === 0 ? ' active' : ''}" data-i="${i}">
      <div class="ph-app-icon" style="background:${a.g}">${a.icon}</div>
      <div class="ph-app-name">${a.name}</div>
      <div class="ph-app-cat">${a.cat}</div>
      <div class="ph-app-rating">${a.rating}</div>
      <div class="ph-bars"><i></i><i></i></div>
    </div>`).join('');

  if (!reduceMotion) {
    const slides = stage.querySelectorAll('.ph-slide');
    let cur = 0;
    setInterval(() => {
      slides[cur].classList.remove('active');
      cur = (cur + 1) % slides.length;
      slides[cur].classList.add('active');
    }, 2800);
  }
}

/* ─── SCROLL REVEAL (with stagger) ─── */
const revealEls = document.querySelectorAll('.reveal');
revealEls.forEach(el => {
  const d = el.getAttribute('data-delay');
  if (d) el.style.setProperty('--delay', d);
});
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
revealEls.forEach(el => revealObserver.observe(el));

/* ─── STAT COUNTERS ─── */
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const decimals = parseInt(el.dataset.decimals || '0', 10);
  const duration = 1700;
  const start = performance.now();
  function frame(now) {
    const p = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    const val = eased * target;
    el.textContent = decimals
      ? val.toFixed(decimals)
      : Math.floor(val).toLocaleString();
    if (p < 1) requestAnimationFrame(frame);
    else el.textContent = decimals ? target.toFixed(decimals) : target.toLocaleString();
  }
  requestAnimationFrame(frame);
}
const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      document.querySelectorAll('.stat-num').forEach(animateCounter);
      statObserver.disconnect();
    }
  });
}, { threshold: 0.5 });
const statsSection = document.querySelector('.stats');
if (statsSection) statObserver.observe(statsSection);

/* ─── 3D TILT (cards + phone) ─── */
if (!reduceMotion && window.matchMedia('(pointer: fine)').matches) {
  document.querySelectorAll('.tilt').forEach(el => {
    const max = el.classList.contains('phone') ? 8 : 10;
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      const rx = (0.5 - py) * max * 2;
      const ry = (px - 0.5) * max * 2;
      el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px)`;
      el.style.setProperty('--mx', px * 100 + '%');
      el.style.setProperty('--my', py * 100 + '%');
    });
    el.addEventListener('pointerleave', () => { el.style.transform = ''; });
  });
}

/* ─── MAGNETIC BUTTONS ─── */
if (!reduceMotion && window.matchMedia('(pointer: fine)').matches) {
  document.querySelectorAll('.magnetic').forEach(el => {
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      el.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`;
    });
    el.addEventListener('pointerleave', () => { el.style.transform = ''; });
  });
}

/* ─── CONTACT FORM ─── */
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const success = document.getElementById('formSuccess');
    success.classList.add('show');
    form.reset();
    setTimeout(() => success.classList.remove('show'), 5000);
  });
}
