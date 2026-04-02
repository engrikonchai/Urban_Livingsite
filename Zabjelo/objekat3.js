(function() {
  document.addEventListener('DOMContentLoaded', () => {
    
    // 1. HERO SLIDER LOGIC
    const heroImages = document.querySelectorAll('.building-hero-triple img');
    const dots       = document.querySelectorAll('.dot');
    let currentIdx   = 0;
    let sliderPaused = false;

    if (heroImages.length > 0) {
      function goToSlide(idx) {
        heroImages[currentIdx].classList.remove('active');
        if (dots[currentIdx]) dots[currentIdx].classList.remove('active');
        currentIdx = (idx + heroImages.length) % heroImages.length;
        heroImages[currentIdx].classList.add('active');
        if (dots[currentIdx]) dots[currentIdx].classList.add('active');
      }

      if (heroImages.length > 1) {
        setInterval(() => {
          if (!sliderPaused) goToSlide(currentIdx + 1);
        }, 2000); // Speed set to 4s
      }

      dots.forEach((dot, i) => {
        dot.addEventListener('click', () => goToSlide(i));
      });

      document.addEventListener('visibilitychange', () => {
        sliderPaused = document.hidden;
      });
    }

// 2. MAP-STYLE ZOOM LIGHTBOX
    document.addEventListener('click', e => {
      const img = e.target.closest('.floor-gallery img, .render-card img');
      if (!img) return;

      const lb = document.createElement('div');
      lb.className = 'lightbox';
      lb.innerHTML = `
        <div class="lb-scroll-container">
          <img src="${img.src}" alt="${img.alt || 'Plan'}" class="lb-target-img">
        </div>
        <span class="lightbox-hint">Kliknite na sliku za Zoom | Prevucite za kretanje</span>
      `;
      
      document.body.appendChild(lb);
      document.body.style.overflow = 'hidden';
      requestAnimationFrame(() => { lb.style.opacity = '1'; });

      const targetImg = lb.querySelector('.lb-target-img');
      const container = lb.querySelector('.lb-scroll-container');
      
      // Toggle Zoom and center the view
      targetImg.addEventListener('click', (event) => {
        event.stopPropagation();
        const wasZoomed = targetImg.classList.contains('is-zoomed');
        targetImg.classList.toggle('is-zoomed');
        
        if (!wasZoomed) {
          // Center the plan after zooming in
          setTimeout(() => {
            targetImg.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
          }, 50);
        }
      });

      // Close when clicking the background area
      lb.addEventListener('click', () => {
        lb.style.opacity = '0';
        lb.addEventListener('transitionend', () => {
          lb.remove();
          document.body.style.overflow = '';
        }, { once: true });
      });
    });

    // 3. NAVIGATION SPY
    const navLinks = document.querySelectorAll('.floor-nav a');
    const sections = document.querySelectorAll('.floor');
    let ticking = false;

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          let current = '';
          sections.forEach(s => {
            if (window.pageYOffset >= s.offsetTop - 200) current = s.getAttribute('id');
          });
          navLinks.forEach(a => {
            a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
          });
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });

    // 4. HAMBURGER MENU
    const hamburger = document.getElementById('hamburger');
    const menuOverlay = document.getElementById('menuOverlay');
    if (hamburger && menuOverlay) {
      const toggleMenu = () => {
        const isActive = hamburger.classList.toggle('active');
        menuOverlay.classList.toggle('active');
        document.body.style.overflow = isActive ? 'hidden' : '';
      };
      hamburger.addEventListener('click', toggleMenu);
    }

    // 5. DRAG TO SCROLL
    const addDragScroll = (el) => {
      if (!el) return;
      let isDown = false, startX, scrollLeft;
      el.addEventListener('mousedown', e => {
        isDown = true; el.style.cursor = 'grabbing';
        startX = e.pageX - el.offsetLeft; scrollLeft = el.scrollLeft;
      });
      el.addEventListener('mouseleave', () => isDown = false);
      el.addEventListener('mouseup', () => isDown = false);
      el.addEventListener('mousemove', e => {
        if (!isDown) return;
        e.preventDefault();
        el.scrollLeft = scrollLeft - (e.pageX - el.offsetLeft - startX) * 1.5;
      });
    };

    addDragScroll(document.querySelector('.renders-strip'));
    document.querySelectorAll('.floor-gallery.mobile-scroll').forEach(addDragScroll);
  });
})();