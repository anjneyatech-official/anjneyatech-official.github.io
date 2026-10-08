/* Anjneya Tech: progressive enhancement only. The site works fully without JS. */
(() => {
  'use strict';
  const root = document.documentElement;

  /* Mobile menu */
  const btn = document.querySelector('.menu-btn');
  const nav = document.getElementById('site-nav');
  if (btn && nav) {
    const setOpen = (open) => {
      nav.classList.toggle('open', open);
      btn.setAttribute('aria-expanded', String(open));
      btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    };
    btn.addEventListener('click', () => setOpen(!nav.classList.contains('open')));
    nav.addEventListener('click', (e) => { if (e.target.closest('a')) setOpen(false); });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && nav.classList.contains('open')) { setOpen(false); btn.focus(); }
    });
  }

  /* Legal pages: contents list starts collapsed on small screens and closes after a pick */
  const toc = document.querySelector('.toc details');
  if (toc) {
    const small = window.matchMedia('(max-width: 900px)');
    if (small.matches) toc.removeAttribute('open');
    toc.addEventListener('click', (e) => { if (e.target.closest('a') && small.matches) toc.removeAttribute('open'); });
  }

  if (!('IntersectionObserver' in window)) return;

  /* Legal pages: highlight the section being read */
  const tocLinks = new Map();
  document.querySelectorAll('.toc a[href^="#"]').forEach((a) => tocLinks.set(a.getAttribute('href').slice(1), a));
  if (tocLinks.size) {
    const tocSpy = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        tocLinks.forEach((a) => a.removeAttribute('aria-current'));
        const link = tocLinks.get(entry.target.id);
        if (link) link.setAttribute('aria-current', 'true');
      });
    }, { rootMargin: '-20% 0px -70% 0px' });
    tocLinks.forEach((_, id) => { const s = document.getElementById(id); if (s) tocSpy.observe(s); });
  }

  /* Entrance on scroll, staggered within each parent */
  const items = document.querySelectorAll('.reveal');
  if (items.length) {
    root.classList.add('js');
    items.forEach((el) => {
      const siblings = Array.from(el.parentElement.children).filter((c) => c.classList.contains('reveal'));
      el.style.setProperty('--i', String(Math.min(siblings.indexOf(el), 5)));
    });
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { entry.target.classList.add('in'); io.unobserve(entry.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    items.forEach((el) => io.observe(el));
  }

  /* Mark the nav link for the section in view */
  const links = new Map();
  document.querySelectorAll('.site-nav a[href^="#"]').forEach((a) => links.set(a.getAttribute('href').slice(1), a));
  const sections = Array.from(links.keys()).map((id) => document.getElementById(id)).filter(Boolean);
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const link = links.get(entry.target.id);
      if (link && entry.isIntersecting) {
        links.forEach((a) => a.removeAttribute('aria-current'));
        link.setAttribute('aria-current', 'true');
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  sections.forEach((s) => spy.observe(s));

  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
