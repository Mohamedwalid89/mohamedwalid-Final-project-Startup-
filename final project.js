// ===== PRELOADER =====
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  if (loader) {
    loader.style.opacity = "0";
    setTimeout(() => loader.remove(), 500);
  }
});

// ===== SELECTORS =====
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navList");
const reveals = document.querySelectorAll(".reveal");
const navbar = document.querySelector(".navbar");
const navBtns = document.querySelectorAll(".nav-links a");
const contactBtn = document.getElementById("contactBtn");
const contactForm = document.getElementById("contactForm");
const popup = document.getElementById("popup");
const yearSpan = document.getElementById("year");

// ===== FOOTER YEAR =====
if (yearSpan) yearSpan.textContent = new Date().getFullYear();

// ===== MOBILE MENU =====
if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
    menuToggle.classList.toggle("active");
  });
}

// ===== SCROLL REVEAL =====
function handleScroll() {
  reveals.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) el.classList.add("active");
  });

  if (navbar) navbar.classList.toggle("scrolled", window.scrollY > 50);

  // highlight active link
  let currentId = "";
  document.querySelectorAll("section[id], header#home").forEach(section => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= 120 && rect.bottom >= 120) currentId = section.id;
  });
  
  navBtns.forEach(a => {
    a.classList.toggle("active", a.getAttribute("href") === `#${currentId}`);
  });
}

window.addEventListener("scroll", handleScroll);
window.addEventListener("load", handleScroll);

// ===== CONTACT FORM =====
if (contactBtn && contactForm && popup) {
  contactBtn.addEventListener("click", () => {
    contactForm.classList.toggle("show");
  });

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name");
    const email = document.getElementById("email");
    
    if (!name.value.trim() || !email.value.trim()) {
      alert("Please fill in the required fields.");
      return;
    }
    
    popup.classList.add("show");
    setTimeout(() => popup.classList.remove("show"), 3000);
    contactForm.reset();
    contactForm.classList.remove("show");
  });
}

// ===== ABOUT CAROUSEL =====
// ===== ABOUT CAROUSEL =====
document.addEventListener('DOMContentLoaded', function () {
  const q = (sel, ctx = document) => ctx.querySelector(sel);
  const qa = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  const track = q('#carouselTrack');
  const slides = qa('#carouselTrack .slide');
  const dotsWrap = q('#carouselDots');
  const autoplayMs = 5000; // 5 ثواني
  const transitionMs = 700;
  let current = 0;
  let timer = null;
  let isAnimating = false;

  if (!track || slides.length === 0) return;

  // إنشاء النقاط
  dotsWrap.innerHTML = '';
  slides.forEach((_, i) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = i === 0 ? 'dot active' : 'dot';
    btn.setAttribute('aria-label', 'Go to slide ' + (i + 1));
    btn.addEventListener('click', () => {
      goTo(i);
      restartTimer();
    });
    dotsWrap.appendChild(btn);
  });

  // تفعيل الشريحة
  function setActive(idx) {
    if (isAnimating) return;
    isAnimating = true;
    current = ((idx % slides.length) + slides.length) % slides.length;

    slides.forEach((s, i) => {
      s.classList.toggle('active', i === current);
      s.setAttribute('aria-hidden', i !== current);
    });

    qa('#carouselDots .dot').forEach((d, i) => {
      d.classList.toggle('active', i === current);
    });

    setTimeout(() => (isAnimating = false), transitionMs);
  }

  function goTo(idx) { setActive(idx); }
  function nextSlide() { goTo(current + 1); }
  function prevSlide() { goTo(current - 1); }

  // ===== الأسهم =====
  qa('.arrow-controls').forEach(wrap => {
    const left = wrap.querySelector('[data-action="prev"]');
    const right = wrap.querySelector('[data-action="next"]');
    if (left) left.addEventListener('click', () => { prevSlide(); restartTimer(); });
    if (right) right.addEventListener('click', () => { nextSlide(); restartTimer(); });
  });

  // ===== AutoPlay =====
  function startTimer() {
    stopTimer();
    timer = setInterval(nextSlide, autoplayMs);
  }
  function stopTimer() {
    if (timer) clearInterval(timer);
    timer = null;
  }
  function restartTimer() {
    stopTimer();
    startTimer();
  }

  // ===== حقن الأشكال 3D =====
  function injectShapes() {
    slides.forEach(slide => {
      const variant = slide.getAttribute('data-variant') || 'v1';
      const viz = slide.querySelector('.viz-3d');
      if (!viz) return;

      viz.innerHTML = ''; // تنظيف الشكل القديم

      // v1
      if (variant === 'v1') {
        const w = document.createElement('div');
        w.className = 'shape wave';
        w.style.left = '40px';
        w.style.top = '150px';
        viz.appendChild(w);

        const b = document.createElement('div');
        b.className = 'shape blob';
        b.style.left = '80px';
        b.style.top = '60px';
        b.style.opacity = '0.95';
        viz.appendChild(b);
      }

      // v2
      if (variant === 'v2') {
        for (let i = 0; i < 6; i++) {
          const s = document.createElement('div');
          s.className = 'shape sq';
          s.style.left = (40 + i * 32) + 'px';
          s.style.top = (30 + (i % 3) * 70) + 'px';
          s.style.opacity = 0.92 - i * 0.08;
          viz.appendChild(s);
        }
      }

      // v3
      if (variant === 'v3') {
        const d = document.createElement('div');
        d.className = 'shape dots';
        d.style.left = '40px';
        d.style.top = '50px';
        viz.appendChild(d);
      }

      // v4
      if (variant === 'v4') {
        for (let r = 0; r < 3; r++) {
          const rb = document.createElement('div');
          rb.className = 'shape wave';
          rb.style.left = (20 + r * 18) + 'px';
          rb.style.top = (120 + r * 36) + 'px';
          rb.style.opacity = 0.95 - r * 0.12;
          viz.appendChild(rb);
        }
      }

      // v5
      if (variant === 'v5') {
        const p = document.createElement('div');
        p.className = 'shape pulse';
        p.style.left = '120px';
        p.style.top = '120px';
        viz.appendChild(p);

        for (let nb = 0; nb < 3; nb++) {
          const m = document.createElement('div');
          m.className = 'shape blob';
          m.style.width = (120 - nb * 18) + 'px';
          m.style.height = (120 - nb * 18) + 'px';
          m.style.left = (40 + nb * 90) + 'px';
          m.style.top = (260 - nb * 40) + 'px';
          m.style.opacity = 0.9 - nb * 0.08;
          viz.appendChild(m);
        }
      }

      // v6
      if (variant === 'v6') {
        const big = document.createElement('div');
        big.className = 'shape blob';
        big.style.left = '60px';
        big.style.top = '60px';
        viz.appendChild(big);

        for (let ms = 0; ms < 4; ms++) {
          const ss = document.createElement('div');
          ss.className = 'shape sq';
          ss.style.left = (200 + ms * 28) + 'px';
          ss.style.top = (160 + (ms % 2 ? 36 : 10)) + 'px';
          ss.style.opacity = 0.9 - ms * 0.08;
          viz.appendChild(ss);
        }
      }

      // v7
      if (variant === 'v7') {
        const w2 = document.createElement('div');
        w2.className = 'shape wave';
        w2.style.left = '40px';
        w2.style.top = '160px';
        w2.style.opacity = 0.95;
        viz.appendChild(w2);

        const dd = document.createElement('div');
        dd.className = 'shape dots';
        dd.style.left = '120px';
        dd.style.top = '60px';
        viz.appendChild(dd);
      }
    });
  }

  injectShapes();
  setTimeout(injectShapes, 400);

  // تفعيل أول كارت
  slides.forEach((s, i) => {
    s.classList.toggle('active', i === 0);
    s.setAttribute('aria-hidden', i !== 0);
  });

  current = 0;
  startTimer();
});


// ===== SMOOTH SCROLLING =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ===== CLOSE MOBILE MENU WHEN CLICKING LINKS =====
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    if (navLinks.classList.contains('open')) {
      navLinks.classList.remove('open');
      menuToggle.classList.remove('active');
    }
  });
});

console.log("🚀 MyStartup website loaded successfully!");

