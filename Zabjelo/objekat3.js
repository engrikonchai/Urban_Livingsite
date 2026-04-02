// ── HERO SLIDER ──
const heroImages = document.querySelectorAll('.building-hero-triple img');
const dots       = document.querySelectorAll('.dot');
let currentIdx   = 0;
let sliderPaused = false;

function goToSlide(idx) {
  heroImages[currentIdx].classList.remove('active');
  dots[currentIdx]?.classList.remove('active');
  currentIdx = (idx + heroImages.length) % heroImages.length;
  heroImages[currentIdx].classList.add('active');
  dots[currentIdx]?.classList.add('active');
}

if (heroImages.length > 1) {
  setInterval(() => { if (!sliderPaused) goToSlide(currentIdx + 1); }, 4000);
}

// Dot click navigation
dots.forEach((dot, i) => dot.addEventListener('click', () => goToSlide(i)));

// Pause slider when tab is hidden (saves CPU)
document.addEventListener('visibilitychange', () => {
  sliderPaused = document.hidden;
});

// ── LAZY LOAD IMAGES ──
document.querySelectorAll('.floor-gallery img, .render-card img').forEach(img => {
  img.setAttribute('loading', 'lazy');
  img.setAttribute('decoding', 'async');
});

// ── LIGHTBOX (event delegation) ──
document.addEventListener('click', e => {
  const img = e.target.closest('.floor-gallery img, .render-card img');
  if (!img) return;

  const lb = document.createElement('div');
  lb.className = 'lightbox';
  lb.setAttribute('role', 'dialog');
  lb.setAttribute('aria-modal', 'true');
  lb.setAttribute('aria-label', 'Uvećana slika');

  const lbImg = document.createElement('img');
  lbImg.src      = img.src;
  lbImg.alt      = img.alt || 'Uvećana slika';
  lbImg.decoding = 'async';

  const hint = document.createElement('span');
  hint.className   = 'lightbox-hint';
  hint.textContent = 'Kliknite za zatvaranje';
  hint.setAttribute('aria-hidden', 'true');

  lb.appendChild(lbImg);
  lb.appendChild(hint);
  document.body.appendChild(lb);
  document.body.style.overflow = 'hidden';

  requestAnimationFrame(() => { lb.style.opacity = '1'; });

  function closeLb() {
    lb.style.opacity = '0';
    lb.addEventListener('transitionend', () => {
      lb.remove();
      document.body.style.overflow = '';
    }, { once: true });
  }

  lb.addEventListener('click', closeLb);
  document.addEventListener('keydown', function onKey(e) {
    if (e.key === 'Escape') { closeLb(); document.removeEventListener('keydown', onKey); }
  });
});

// ── ACTIVE NAV SPY (throttled with rAF) ──
const navLinks = document.querySelectorAll('.floor-nav a');
const sections = document.querySelectorAll('.floor');
let ticking    = false;

function updateNav() {
  let current = '';
  const scrollY = window.pageYOffset;
  sections.forEach(s => {
    if (scrollY >= s.offsetTop - 200) current = s.getAttribute('id');
  });
  navLinks.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
  });
  ticking = false;
}

window.addEventListener('scroll', () => {
  if (!ticking) { requestAnimationFrame(updateNav); ticking = true; }
}, { passive: true });

// ── HAMBURGER MENU ──
const hamburger   = document.getElementById('hamburger');
const menuOverlay = document.getElementById('menuOverlay');

if (hamburger && menuOverlay) {
  function openMenu() {
    hamburger.classList.add('active');
    hamburger.setAttribute('aria-expanded', 'true');
    menuOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  function closeMenu() {
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    menuOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }
  hamburger.addEventListener('click', () => {
    hamburger.classList.contains('active') ? closeMenu() : openMenu();
  });
  hamburger.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); hamburger.click(); }
  });
  document.querySelectorAll('.menu-link').forEach(l => l.addEventListener('click', closeMenu));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
}

// ── HEADER SHRINK ──
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

// ── DRAG TO SCROLL (renders strip + floor galleries) ──
function addDragScroll(el) {
  if (!el) return;
  let isDown = false, startX, scrollLeft;
  el.addEventListener('mousedown', e => {
    isDown = true; el.style.cursor = 'grabbing';
    startX = e.pageX - el.offsetLeft; scrollLeft = el.scrollLeft;
  });
  el.addEventListener('mouseleave', () => { isDown = false; el.style.cursor = 'grab'; });
  el.addEventListener('mouseup',    () => { isDown = false; el.style.cursor = 'grab'; });
  el.addEventListener('mousemove', e => {
    if (!isDown) return;
    e.preventDefault();
    el.scrollLeft = scrollLeft - (e.pageX - el.offsetLeft - startX) * 1.5;
  });
}

addDragScroll(document.querySelector('.renders-strip'));
document.querySelectorAll('.floor-gallery.mobile-scroll').forEach(addDragScroll);
