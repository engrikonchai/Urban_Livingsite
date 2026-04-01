// ── Nav: switch style on scroll ──
const nav = document.getElementById('nav');
const hb  = document.getElementById('hamburger');

window.addEventListener('scroll', () => {
  const scrolled = window.scrollY > 60;
  nav.classList.toggle('scrolled', scrolled);
  hb.classList.toggle('onlight', scrolled);
});

// ── Mobile menu: hamburger toggle ──
const mm = document.getElementById('mobMenu');
const md = document.getElementById('mobDim');

function toggle(open) {
  hb.classList.toggle('active', open);
  mm.classList.toggle('active', open);
  md.classList.toggle('active', open);
  document.body.style.overflow = open ? 'hidden' : '';
}

hb.addEventListener('click', () => toggle(!mm.classList.contains('active')));
md.addEventListener('click', () => toggle(false));
mm.querySelectorAll('a').forEach(a => a.addEventListener('click', () => toggle(false)));