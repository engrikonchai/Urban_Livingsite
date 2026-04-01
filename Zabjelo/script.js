const hamburger = document.getElementById('hamburger');
const menuOverlay = document.getElementById('menuOverlay');

if (hamburger) {
  hamburger.onclick = () => {
    hamburger.classList.toggle('active');
    menuOverlay.classList.toggle('active');
    document.body.style.overflow = menuOverlay.classList.contains('active') ? 'hidden' : '';
  };
}