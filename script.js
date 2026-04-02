// ── Nav: switch style on scroll (throttled with rAF) ──
const nav = document.getElementById('nav');
const hb  = document.getElementById('hamburger');
let ticking = false;

function onScroll() {
  if (!ticking) {
    requestAnimationFrame(() => {
      const scrolled = window.scrollY > 60;
      nav.classList.toggle('scrolled', scrolled);
      hb.classList.toggle('onlight', scrolled);
      ticking = false;
    });
    ticking = true;
  }
}

window.addEventListener('scroll', onScroll, { passive: true });

// ── Mobile menu: hamburger toggle ──
const mm = document.getElementById('mobMenu');
const md = document.getElementById('mobDim');

function toggle(open) {
  hb.classList.toggle('active', open);
  hb.setAttribute('aria-expanded', String(open));
  mm.classList.toggle('active', open);
  md.classList.toggle('active', open);
  document.body.style.overflow = open ? 'hidden' : '';
}

hb.addEventListener('click', () => toggle(!mm.classList.contains('active')));
md.addEventListener('click', () => toggle(false));
mm.querySelectorAll('a').forEach(a => a.addEventListener('click', () => toggle(false)));

// Close on Escape
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && mm.classList.contains('active')) toggle(false);
});
