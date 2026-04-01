// HERO SLIDER
const heroImages = document.querySelectorAll('.building-hero-triple img');
const dots = document.querySelectorAll('.dot');
let currentIdx = 0;

function nextSlide() {
  if (heroImages.length < 2) return;
  heroImages[currentIdx].classList.remove('active');
  dots[currentIdx].classList.remove('active');
  currentIdx = (currentIdx + 1) % heroImages.length;
  heroImages[currentIdx].classList.add('active');
  dots[currentIdx].classList.add('active');
}
if (heroImages.length > 1) setInterval(nextSlide, 5000);

// LIGHTBOX
document.querySelectorAll('.floor-gallery img').forEach(img => {
  img.addEventListener('click', () => {
    const lb = document.createElement('div');
    lb.className = 'lightbox';
    lb.innerHTML = `<img src="${img.src}"><span class="lightbox-hint">Kliknite za zatvaranje</span>`;
    document.body.appendChild(lb);
    document.body.style.overflow = 'hidden';
    lb.onclick = () => { lb.remove(); document.body.style.overflow = ''; };
  });
});

// ACTIVE NAV SPY
const navLinks = document.querySelectorAll('.floor-nav a');
const sections = document.querySelectorAll('.floor');
window.addEventListener('scroll', () => {
  let current = "";
  sections.forEach(s => {
    if (pageYOffset >= s.offsetTop - 250) current = s.getAttribute("id");
  });
  navLinks.forEach(a => {
    a.classList.remove("active");
    if (a.getAttribute("href") === `#${current}`) a.classList.add("active");
  });
});