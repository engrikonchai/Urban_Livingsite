// ── HAMBURGER MENU ──
const hamburger   = document.getElementById('hamburger');
const menuOverlay = document.getElementById('menuOverlay');

function openMenu() {
  if (!hamburger || !menuOverlay) return;
  hamburger.classList.add('active');
  hamburger.setAttribute('aria-expanded', 'true');
  menuOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  if (!hamburger || !menuOverlay) return;
  hamburger.classList.remove('active');
  hamburger.setAttribute('aria-expanded', 'false');
  menuOverlay.classList.remove('active');
  document.body.style.overflow = '';
}

if (hamburger && menuOverlay) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.contains('active') ? closeMenu() : openMenu();
  });
  hamburger.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); hamburger.click(); }
  });
  document.querySelectorAll('.menu-link').forEach(l => l.addEventListener('click', closeMenu));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
}

// ── HEADER SHRINK (throttled) ──
let scrollTicking = false;
window.addEventListener('scroll', () => {
  if (!scrollTicking) {
    requestAnimationFrame(() => {
      const header = document.querySelector('.header');
      if (header) header.classList.toggle('scrolled', window.scrollY > 50);
      scrollTicking = false;
    });
    scrollTicking = true;
  }
}, { passive: true });
