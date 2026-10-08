/* Anjneya Tech — progressive enhancements. The site works fully without JS. */
(() => {
  'use strict';

  /* Mobile navigation */
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('site-nav');
  if (toggle && nav) {
    const setOpen = (open) => {
      nav.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    };
    toggle.addEventListener('click', () => setOpen(!nav.classList.contains('open')));
    nav.addEventListener('click', (e) => { if (e.target.closest('a')) setOpen(false); });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && nav.classList.contains('open')) { setOpen(false); toggle.focus(); }
    });
  }

  /* App filters */
  const filterButtons = document.querySelectorAll('.filters button');
  const groups = document.querySelectorAll('.app-group');
  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;
      filterButtons.forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
      groups.forEach((group) => { group.hidden = filter !== 'all' && group.dataset.group !== filter; });
    });
  });

  /* Footer year */
  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
