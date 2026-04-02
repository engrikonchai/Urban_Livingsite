// ── DETERMINE PAGE ──
const bodyId = document.body.id;

// ── GALLERY (only on main page) ──
if (bodyId === 'top') {
  const gallery = document.getElementById('gallery');
  const totalImages = 8;

  // Use a document fragment for a single DOM insertion (performance)
  const fragment = document.createDocumentFragment();

  for (let i = 1; i <= totalImages; i++) {
    const galleryItem = document.createElement('div');
    galleryItem.className = 'gallery-item';

    const dayImg   = document.createElement('img');
    dayImg.className = 'day';
    dayImg.src       = `images/R${i}.jpg`;
    dayImg.alt       = `Pogled ${i} - Dan`;
    dayImg.loading   = 'lazy';
    dayImg.decoding  = 'async';

    const nightImg   = document.createElement('img');
    nightImg.className = 'night';
    nightImg.src       = `images/R${i}N.jpg`;
    nightImg.alt       = `Pogled ${i} - Noć`;
    nightImg.loading   = 'lazy';
    nightImg.decoding  = 'async';

    galleryItem.appendChild(dayImg);
    galleryItem.appendChild(nightImg);
    fragment.appendChild(galleryItem);
  }
  gallery.appendChild(fragment);

  // Mobile tap toggle Day ↔ Night (event delegation for better perf)
  gallery.addEventListener('click', e => {
    const item = e.target.closest('.gallery-item');
    if (!item) return;
    const nightImg = item.querySelector('.night');
    const dayImg   = item.querySelector('.day');
    const isNight  = nightImg.style.opacity === '1';
    nightImg.style.opacity = isNight ? '0' : '1';
    dayImg.style.opacity   = isNight ? '1' : '0';
  });
}

// ── HAMBURGER MENU ──
const hamburger   = document.getElementById('hamburger');
const menuOverlay = document.getElementById('menuOverlay');
const menuDim     = document.getElementById('menuDim');

function openMenu() {
  hamburger.classList.add('active');
  hamburger.setAttribute('aria-expanded', 'true');
  menuOverlay.classList.add('active');
  menuDim.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  hamburger.classList.remove('active');
  hamburger.setAttribute('aria-expanded', 'false');
  menuOverlay.classList.remove('active');
  menuDim.classList.remove('active');
  document.body.style.overflow = '';
}

if (hamburger && menuOverlay && menuDim) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.contains('active') ? closeMenu() : openMenu();
  });
  menuDim.addEventListener('click', closeMenu);
  document.querySelectorAll('.menu-link').forEach(link => {
    link.addEventListener('click', closeMenu);
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeMenu();
  });
}

// ── SHRINK HEADER ON SCROLL (throttled) ──
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

// ── STANOVI POPUP (only on main page) ──
if (bodyId === 'top') {
  const floorModal    = document.getElementById('floorModal');
  const openFloorsBtn = document.getElementById('openFloors');
  const closeModalBtn = document.getElementById('closeModal');
  const menuStanovi   = document.getElementById('menuStanovi');
  const floorItems    = document.querySelectorAll('.floor-list li');

  function openModal() {
    if (!floorModal) return;
    floorModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  function closeModal() {
    if (!floorModal) return;
    floorModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (openFloorsBtn) openFloorsBtn.addEventListener('click', e => { e.preventDefault(); openModal(); });
  if (menuStanovi)   menuStanovi.addEventListener('click',   e => { e.preventDefault(); openModal(); });
  if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
  if (floorModal)    floorModal.addEventListener('click', e => { if (e.target === floorModal) closeModal(); });

  floorItems.forEach(item => {
    item.addEventListener('click', () => {
      const floor = item.getAttribute('data-floor');
      window.location.href = `apartments.html#floor${floor}`;
    });
  });
}

// ── APARTMENTS PAGE ──
if (bodyId === 'apartments') {
  window.addEventListener('DOMContentLoaded', () => {
    if (window.location.hash) {
      const target = document.querySelector(window.location.hash);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    }
  });
  document.querySelectorAll('.menu-link').forEach(link => {
    if (link.textContent.trim() === 'Stanovi') link.classList.add('active');
  });

  // Keyboard support for hamburger
  const hb = document.getElementById('hamburger');
  if (hb) {
    hb.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); hb.click(); }
    });
  }
}
