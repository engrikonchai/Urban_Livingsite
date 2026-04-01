// --- DETERMINE PAGE ---
const bodyId = document.body.id;

// --- HAMBURGER MENU ---
const hamburger   = document.getElementById('hamburger');
const menuOverlay = document.getElementById('menuOverlay');
const menuDim     = document.getElementById('menuDim');

function openMenu() {
  hamburger.classList.add('active');
  menuOverlay.classList.add('active');
  menuDim.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  hamburger.classList.remove('active');
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

// --- SHRINK HEADER ON SCROLL ---
window.addEventListener('scroll', () => {
  const header = document.querySelector('.header');
  if (header) {
    header.classList.toggle('scrolled', window.scrollY > 50);
  }
});

// --- OBJEKTI POPUP MODAL (only on main page) ---
if (bodyId === 'top') {
  const floorModal    = document.getElementById('floorModal');
  const openFloorsBtn = document.getElementById('openFloors');
  const closeModalBtn = document.getElementById('closeModal');
  const menuStanovi   = document.getElementById('menuStanovi');

  function openModal() {
    floorModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  function closeModal() {
    floorModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (openFloorsBtn) openFloorsBtn.addEventListener('click', e => { e.preventDefault(); openModal(); });
  if (menuStanovi)   menuStanovi.addEventListener('click',   e => { e.preventDefault(); openModal(); });
  if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);

  if (floorModal) {
    floorModal.addEventListener('click', e => {
      if (e.target === floorModal) closeModal();
    });
  }
}

// --- APARTMENTS PAGE ---
if (bodyId === 'apartments') {
  window.addEventListener('DOMContentLoaded', () => {
    if (window.location.hash) {
      const target = document.querySelector(window.location.hash);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    }
  });

  // Mark Objekti as active in menu
  document.querySelectorAll('.menu-link').forEach(link => {
    if (link.textContent.trim() === 'Objekti') link.classList.add('active');
  });
}
