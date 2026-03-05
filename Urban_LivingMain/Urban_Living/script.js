// --- DETERMINE PAGE ---
const bodyId = document.body.id;

// --- GALLERY (only on main page) ---
if (bodyId === 'top') {
  const gallery = document.getElementById('gallery');
  const totalImages = 8;

  for (let i = 1; i <= totalImages; i++) {
    const galleryItem = document.createElement('div');
    galleryItem.className = 'gallery-item';
    galleryItem.innerHTML = `
      <img class="day"   src="images/R${i}.jpg"  alt="R${i} Day">
      <img class="night" src="images/R${i}N.jpg" alt="R${i} Night">
    `;
    gallery.appendChild(galleryItem);
  }

  // Mobile tap toggle Day ↔ Night
  document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
      const nightImg = item.querySelector('.night');
      const dayImg   = item.querySelector('.day');
      if (nightImg.style.opacity === '1') {
        nightImg.style.opacity = '0';
        dayImg.style.opacity   = '1';
      } else {
        nightImg.style.opacity = '1';
        dayImg.style.opacity   = '0';
      }
    });
  });
}

// --- HAMBURGER MENU ---
// The hamburger is now the ONLY toggle — it opens AND closes the menu.
// No separate close-btn required.
const hamburger   = document.getElementById('hamburger');
const menuOverlay = document.getElementById('menuOverlay');
const menuDim     = document.getElementById('menuDim');

function openMenu() {
  hamburger.classList.add('active');
  menuOverlay.classList.add('active');
  menuDim.classList.add('active');
  document.body.style.overflow = 'hidden'; // prevent bg scroll
}

function closeMenu() {
  hamburger.classList.remove('active');
  menuOverlay.classList.remove('active');
  menuDim.classList.remove('active');
  document.body.style.overflow = '';
}

if (hamburger && menuOverlay && menuDim) {
  // Toggle on hamburger click
  hamburger.addEventListener('click', () => {
    hamburger.classList.contains('active') ? closeMenu() : openMenu();
  });

  // Close when clicking the dim overlay
  menuDim.addEventListener('click', closeMenu);

  // Close when any menu link is clicked
  document.querySelectorAll('.menu-link').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close on Escape key
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

// --- STANOVI POPUP (only on main page) ---
if (bodyId === 'top') {
  const floorModal    = document.getElementById('floorModal');
  const openFloorsBtn = document.getElementById('openFloors');
  const closeModalBtn = document.getElementById('closeModal');
  const menuStanovi   = document.getElementById('menuStanovi');
  const floorItems    = document.querySelectorAll('.floor-list li');

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

  // Close modal on backdrop click
  if (floorModal) {
    floorModal.addEventListener('click', e => {
      if (e.target === floorModal) closeModal();
    });
  }

  // Floor click → navigate to apartments page
  floorItems.forEach(item => {
    item.addEventListener('click', () => {
      const floor = item.getAttribute('data-floor');
      window.location.href = `apartments.html#floor${floor}`;
    });
  });
}

// --- APARTMENTS PAGE ---
if (bodyId === 'apartments') {
  // Smooth scroll to hash on load
  window.addEventListener('DOMContentLoaded', () => {
    if (window.location.hash) {
      const target = document.querySelector(window.location.hash);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    }
  });

  // Mark Stanovi as active in menu
  document.querySelectorAll('.menu-link').forEach(link => {
    if (link.textContent.trim() === 'Stanovi') link.classList.add('active');
  });
}

