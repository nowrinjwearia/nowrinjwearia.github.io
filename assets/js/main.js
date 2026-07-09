/* ===========================================================
   main.js — theme toggle, mobile nav, scroll reveal, lightbox
   =========================================================== */

// ---------- Dark mode (persisted) ----------
(function () {
  const saved = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = saved || (prefersDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', theme);
})();

function toggleTheme() {
  const cur = document.documentElement.getAttribute('data-theme');
  const next = cur === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  updateToggleIcon();
}

function updateToggleIcon() {
  const btn = document.getElementById('themeToggle');
  if (!btn) return;
  const dark = document.documentElement.getAttribute('data-theme') === 'dark';
  btn.textContent = dark ? '☀️' : '🌙';
}

// ---------- Mobile nav ----------
function toggleNav() {
  document.getElementById('navLinks').classList.toggle('open');
}

// ---------- Init ----------
document.addEventListener('DOMContentLoaded', () => {
  updateToggleIcon();

  const toggle = document.getElementById('themeToggle');
  if (toggle) toggle.addEventListener('click', toggleTheme);

  const navToggle = document.getElementById('navToggle');
  if (navToggle) navToggle.addEventListener('click', toggleNav);

  // Highlight current nav link
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    if (a.getAttribute('href') === path) a.classList.add('active');
  });

  // Scroll reveal
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  initLightbox();
});

// ---------- Lightbox (photography) ----------
function initLightbox() {
  const figures = Array.from(document.querySelectorAll('.gallery img'));
  const box = document.getElementById('lightbox');
  if (!figures.length || !box) return;

  const imgEl = box.querySelector('img');
  let index = 0;

  const show = (i) => {
    index = (i + figures.length) % figures.length;
    imgEl.src = figures[index].src;
    imgEl.alt = figures[index].alt;
    box.classList.add('open');
  };

  figures.forEach((img, i) => img.addEventListener('click', () => show(i)));
  box.querySelector('.lightbox-close').addEventListener('click', () => box.classList.remove('open'));
  box.querySelector('.next').addEventListener('click', (e) => { e.stopPropagation(); show(index + 1); });
  box.querySelector('.prev').addEventListener('click', (e) => { e.stopPropagation(); show(index - 1); });
  box.addEventListener('click', (e) => { if (e.target === box) box.classList.remove('open'); });
  document.addEventListener('keydown', (e) => {
    if (!box.classList.contains('open')) return;
    if (e.key === 'Escape') box.classList.remove('open');
    if (e.key === 'ArrowRight') show(index + 1);
    if (e.key === 'ArrowLeft') show(index - 1);
  });
}
