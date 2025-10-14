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
