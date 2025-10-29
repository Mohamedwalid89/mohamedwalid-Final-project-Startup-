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

// === Mouse Smooth Stroke Trail ===
let lastX = null, lastY = null;
document.addEventListener('mousemove', (e) => {
  if (lastX === null || lastY === null) {
    lastX = e.pageX;
    lastY = e.pageY;
    return;
  }

  const x = e.pageX;
  const y = e.pageY;

  const line = document.createElement('div');
  line.className = 'mouse-line';
  line.style.left = lastX + 'px';
  line.style.top = lastY + 'px';
  const dx = x - lastX;
  const dy = y - lastY;
  const dist = Math.hypot(dx, dy);
  const angle = Math.atan2(dy, dx) * 180 / Math.PI;
  line.style.width = dist + 'px';
  line.style.transform = `rotate(${angle}deg)`;

  document.body.appendChild(line);
  requestAnimationFrame(() => { line.style.opacity = '1'; });

  setTimeout(() => {
  line.style.opacity = '0';
  setTimeout(() => line.remove(), 1200);
}, 40);


  lastX = x;
  lastY = y;
});

/* === Mouse Neon Curved Trail (Canvas) ===
   - double layer (outer glow + core)
   - long, curved, smooth tail
   - optimized for FullHD quality (scales with devicePixelRatio)
*/

(function () {
  const canvas = document.getElementById('mouse-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d', { alpha: true });
  let dpr = Math.min(window.devicePixelRatio || 1, 2); // FullHD friendly
  let w = 0, h = 0;

  // settings (tweakable)
  const MAX_POINTS = 120;        // tail length (long)
  const SMOOTHING = 0.18;        // higher = smoother curve (0..1)
  const DECAY = 0.018;           // how quickly points fade (smaller = longer visible)
  const CORE_WIDTH = 3 * (dpr);  // inner core stroke width
  const GLOW_WIDTH = 14 * (dpr); // outer glow width
  const OUTER_ALPHA = 0.16;      // outer layer alpha
  const CORE_ALPHA = 0.95;       // core alpha
  const FPS_LIMIT = 60;          // target fps (we use rAF)
  const ACCENT1 = getComputedStyle(document.documentElement).getPropertyValue('--accent1').trim() || '#00e0ff';
  const ACCENT2 = getComputedStyle(document.documentElement).getPropertyValue('--accent2').trim() || '#ff00a8';

  // buffer of points {x,y,age, vx, vy}
  const points = [];

  function resize() {
    // Full viewport with DPR scaling to keep crisp glow
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    const cssW = window.innerWidth;
    const cssH = window.innerHeight;
    canvas.style.width = cssW + 'px';
    canvas.style.height = cssH + 'px';
    canvas.width = Math.round(cssW * dpr);
    canvas.height = Math.round(cssH * dpr);
    w = canvas.width;
    h = canvas.height;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0); // work in CSS pixels
  }

  // smoothing helper (lerp)
  function lerp(a, b, t) {
    return a + (b - a) * t;
  }

  // push a new mouse point (smoothed)
  let lastMouse = null;
  window.addEventListener('mousemove', (e) => {
    const nx = e.clientX;
    const ny = e.clientY;

    if (!lastMouse) {
      lastMouse = { x: nx, y: ny };
    }

    // smooth between last mouse and new
    lastMouse.x = lerp(lastMouse.x, nx, 0.6);
    lastMouse.y = lerp(lastMouse.y, ny, 0.6);

    points.unshift({
      x: lastMouse.x,
      y: lastMouse.y,
      t: 0,       // age
      vx: 0,
      vy: 0
    });

    // keep buffer length bounded
    if (points.length > MAX_POINTS) points.length = MAX_POINTS;
  });

  // touch support (optional)
  window.addEventListener('touchmove', (e) => {
    const t = e.touches[0];
    if (!t) return;
    const nx = t.clientX;
    const ny = t.clientY;
    points.unshift({ x: nx, y: ny, t: 0, vx: 0, vy: 0 });
    if (points.length > MAX_POINTS) points.length = MAX_POINTS;
  }, { passive: true });

  // draw a smooth path using quadratic curves
  function drawTrail() {
    if (points.length < 2) return;

    // compute a gradient along the tail (from last recorded to head)
    const pHead = points[0];
    const pTail = points[points.length - 1];
    const grad = ctx.createLinearGradient(pTail.x, pTail.y, pHead.x, pHead.y);
    grad.addColorStop(0, ACCENT2);
    grad.addColorStop(0.6, ACCENT1);
    grad.addColorStop(1, ACCENT1);

    // Outer glow layer (wider, low alpha)
    ctx.save();
    ctx.globalCompositeOperation = 'lighter'; // additive for neon
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.strokeStyle = grad;
    ctx.globalAlpha = OUTER_ALPHA;
    ctx.lineWidth = GLOW_WIDTH;
    ctx.shadowColor = ACCENT1;
    ctx.shadowBlur = 20;
    ctx.beginPath();

    // Path: use midpoints to create smoother curve
    for (let i = 0; i < points.length - 1; i++) {
      const p = points[i];
      const q = points[i + 1];
      const mx = (p.x + q.x) / 2;
      const my = (p.y + q.y) / 2;
      if (i === 0) {
        ctx.moveTo(p.x, p.y);
        ctx.quadraticCurveTo(p.x, p.y, mx, my);
      } else {
        ctx.quadraticCurveTo(p.x, p.y, mx, my);
      }
    }
    ctx.stroke();
    ctx.restore();

    // Core layer (thin bright)
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.strokeStyle = grad;
    ctx.globalAlpha = CORE_ALPHA;
    ctx.lineWidth = CORE_WIDTH;
    ctx.shadowColor = ACCENT2;
    ctx.shadowBlur = 6;
    ctx.beginPath();
    for (let i = 0; i < points.length - 1; i++) {
      const p = points[i];
      const q = points[i + 1];
      const mx = (p.x + q.x) / 2;
      const my = (p.y + q.y) / 2;
      if (i === 0) {
        ctx.moveTo(p.x, p.y);
        ctx.quadraticCurveTo(p.x, p.y, mx, my);
      } else {
        ctx.quadraticCurveTo(p.x, p.y, mx, my);
      }
    }
    ctx.stroke();
    ctx.restore();

    // optional round head dot for the tip (rounded head)
  //   ctx.save();
  //   ctx.globalCompositeOperation = 'lighter';
  //   ctx.fillStyle = ACCENT1;
  //   ctx.globalAlpha = 1.0;
  //   ctx.beginPath();
  //   ctx.arc(pHead.x, pHead.y, CORE_WIDTH * 0.9, 0, Math.PI * 2);
  //   ctx.fill();
  //   ctx.restore();
   }

  // animation loop (clears with slight alpha to create trailing persistence)
  let lastTime = 0;
  function tick(time) {
    requestAnimationFrame(tick);
    const delta = Math.min(32, time - lastTime);
    lastTime = time;

    // clear with partial alpha to keep smooth persistence
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // age points and remove old ones
    for (let i = points.length - 1; i >= 0; i--) {
      const p = points[i];
      p.t += DECAY * (delta / 16);
      if (p.t > 1.0) {
        points.splice(i, 1);
      }
    }

    // smooth positions inside buffer for stronger curvature
    for (let i = 1; i < points.length; i++) {
      points[i].x = lerp(points[i].x, points[i - 1].x, SMOOTHING);
      points[i].y = lerp(points[i].y, points[i - 1].y, SMOOTHING);
    }

    // ✅ ارسم الجزيئات هنا (أصبح مرئي فوق الخلفية)
    drawParticles();

    // draw trail layers فوق الجزيئات
    drawTrail();
}


  // initial setup + resize handling
  resize();
  window.addEventListener('resize', () => {
    document.body.classList.add('canvas-resizing');
    resize();
    // small timeout to remove hint
    setTimeout(() => document.body.classList.remove('canvas-resizing'), 250);
  });

  // start anim
  requestAnimationFrame((t) => {
    lastTime = t;
    tick(t);
  });
})();


/* === Water Ripple Wave Effect (Hologram Ocean Style) === */
(function () {
  const canvas = document.getElementById('mouse-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const waves = [];

  const RIPPLE_DURATION = 1200; // 1.2s
  const BASE_ALPHA = 0.25;      // شفافية متوسطة
  const COLOR = 'rgba(255,255,255,'; // أبيض شفاف (يمكن تغييره لاحقًا)
  const WAVE_COUNT = 3;         // عدد الحواف الداخلية للموجة

  // عند الضغط
  window.addEventListener('mousedown', (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const start = performance.now();
    waves.push({ x, y, start });
  });

  function drawWaves(time) {
    for (let i = waves.length - 1; i >= 0; i--) {
      const wave = waves[i];
      const age = (time - wave.start) / RIPPLE_DURATION;
      if (age >= 1) {
        waves.splice(i, 1);
        continue;
      }

      const progress = Math.sin(age * Math.PI * 0.5); // smooth-out expansion
      const maxRadius = Math.hypot(canvas.width, canvas.height) * 0.15; // مدى الموجة المتوسط
      const radius = progress * maxRadius;

      // شفافية تتناقص تدريجيًا
      const alpha = BASE_ALPHA * (1 - age);

      // تموّج خفيف في الحواف
      const distort = Math.sin(age * 8) * 4; // يجعل الحافة غير مستقيمة جدًا

      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      ctx.lineWidth = 2;
      ctx.strokeStyle = COLOR + alpha + ')';
      ctx.beginPath();

      // رسم موجة بها تموّج خفيف
      const steps = 80;
      for (let s = 0; s <= steps; s++) {
        const t = (s / steps) * Math.PI * 2;
        const mod = distort * Math.sin(t * 3 + age * 10);
        const r = radius + mod;
        const px = wave.x + Math.cos(t) * r;
        const py = wave.y + Math.sin(t) * r;
        if (s === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.stroke();

      // خطوط إضافية داخلية (موجات فرعية)
      for (let w = 1; w < WAVE_COUNT; w++) {
        const subAlpha = alpha * (1 - w / WAVE_COUNT);
        ctx.lineWidth = 1;
        ctx.strokeStyle = COLOR + subAlpha + ')';
        const innerR = radius * (1 - w * 0.15);
        ctx.beginPath();
        for (let s = 0; s <= steps; s++) {
          const t = (s / steps) * Math.PI * 2;
          const mod = distort * Math.cos(t * 2 + age * 6);
          const r = innerR + mod;
          const px = wave.x + Math.cos(t) * r;
          const py = wave.y + Math.sin(t) * r;
          if (s === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.stroke();
      }
      ctx.restore();
    }
  }

  // دمج الموجات مع الـ trail الحالي
  const _origTick = window.requestAnimationFrame;
  let lastFrame = 0;
  function animate(time) {
    _origTick(animate);
    if (!lastFrame) lastFrame = time;
    const delta = time - lastFrame;
    lastFrame = time;

    // فقط أرسم الموجات فوق الخلفية (الـ trail نفسه يرسم من الكود السابق)
    drawWaves(time);
  }
  requestAnimationFrame(animate);
})();

/* === SOFT FLUID FLOATING PARTICLES (IMPROVED) ===
   - يعتمد على نفس canvas#mouse-canvas و ctx
   - يستخدم CSS pixels (clientWidth/clientHeight)
   - لا ينشئ loop جديد، يعتمد على drawParticles() داخل tick()
   - يتحكم في إعادة توزيع ذكية عند الخروج أو عند تغيير الحجم
*/
(function() {
  const canvas = document.getElementById('mouse-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  // Use CSS pixel sizes (matching how trail draws after ctx.setTransform)
  let w = Math.max(1, canvas.clientWidth || window.innerWidth);
  let h = Math.max(1, canvas.clientHeight || window.innerHeight);

  const MAX_PARTICLES = 120; // عدد الجزيئات (اختيارك: كثافة متوسطة)
  const particleColors = [
    getComputedStyle(document.documentElement).getPropertyValue('--accent1').trim() || '#00e0ff',
    getComputedStyle(document.documentElement).getPropertyValue('--accent2').trim() || '#ff00a8'
  ];

  const particles = [];

  function createParticle() {
    // أحجام ممزوجة: small + medium + few large
    const r = Math.random();
    const size = r < 0.85 ? (Math.random() * 1.6 + 0.6) : (Math.random() * 3 + 2.2);
    return {
      x: Math.random() * w,
      y: Math.random() * h,
      size,
      color: particleColors[Math.floor(Math.random() * particleColors.length)],
      opacity: Math.random() * 0.35 + 0.18, // ناعم وشفاف
      // حركة fluid: أفقي + طفو رأسي + تمايل بسيط (قيمة صغيرة)
      vx: (Math.random() - 0.5) * (0.25 + Math.random() * 0.3),
      vy: (Math.random() - 0.2) * (0.08 + Math.random() * 0.25)
    };
  }

  function initParticles() {
    particles.length = 0;
    for (let i = 0; i < MAX_PARTICLES; i++) particles.push(createParticle());
  }

  initParticles();

  // عند تغيير حجم النافذة: نعدل w/h ونسّلم مواضع الجزيئات بشكل نسبي
  function handleResize() {
    const newW = Math.max(1, canvas.clientWidth || window.innerWidth);
    const newH = Math.max(1, canvas.clientHeight || window.innerHeight);
    // scaling ratio
    const sx = newW / w;
    const sy = newH / h;
    // scale particle positions so أنها تبقى تقريباً في نفس الأماكن
    for (const p of particles) {
      p.x = Math.random() * newW; // بدل محاولة حفظ النسق بدقة، نجعل التوزيع طبيعياً بعد الريسايز
      p.y = Math.random() * newH;
    }
    w = newW; h = newH;
  }
  window.addEventListener('resize', handleResize);

  // دالة رسم الجزيئات - تُستدعى داخل tick() (اللي عندك)
  window.drawParticles = window.drawParticles || function drawParticles() {
    // Important: do NOT clear the canvas here (tick() already clears)
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      // create soft radial glow using CSS-pixel coords
      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      ctx.globalAlpha = p.opacity;

      const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 6);
      grad.addColorStop(0, p.color);
      grad.addColorStop(0.6, p.color + '80'); // semi
      grad.addColorStop(1, 'transparent');

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // update motion - fluid behaviour with light sinusoidal drift
      p.x += p.vx + Math.sin((p.y + performance.now()*0.0002) * 0.02) * 0.12;
      p.y += p.vy + Math.cos((p.x + performance.now()*0.00015) * 0.015) * 0.06;

      // gentle wrapping / re-positioning to avoid clustering at edges
      if (p.x < -30) p.x = w + Math.random() * 20;
      if (p.x > w + 30) p.x = -Math.random() * 20;
      if (p.y < -30) p.y = h + Math.random() * 20;
      if (p.y > h + 30) p.y = -Math.random() * 20;
    }
  };

  // expose helper to re-init or tweak
  window._particlesEngine = {
    init: initParticles,
    setCount: (n) => { MAX_PARTICLES = Math.max(10, Math.floor(n)); initParticles(); },
    enable: () => {}, disable: () => {}
  };

  // ready — note: drawParticles() will be called inside your tick()
})();

//==============================================================================


