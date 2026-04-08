document.addEventListener("DOMContentLoaded", () => {

const nav = document.getElementById("mainCardNav");
const toggle = document.getElementById("cardNavToggle");
const content = document.querySelector(".card-nav-content");

if (nav && toggle && content) {

  let isOpen = false;

  toggle.addEventListener("click", () => {
    isOpen = !isOpen;

    nav.classList.toggle("open");

    if (isOpen) {
      nav.style.height = content.scrollHeight + 80 + "px";
    } else {
      nav.style.height = "60px";
    }
  });
}

  /* ===== HERO ANIMATION ===== */
  if (window.gsap) {
    gsap.from(".hero h1", {
      y: 80,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out"
    });

    gsap.from(".hero p", {
      y: 40,
      opacity: 0,
      delay: 0.4
    });

    gsap.from(".buttons a", {
      y: 20,
      opacity: 0,
      delay: 0.8,
      stagger: 0.2
    });
  }

  /* ===== SCROLL REVEAL ===== */
  const sections = document.querySelectorAll(".section");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  }, {
    threshold: 0.2
  });

  sections.forEach(section => observer.observe(section));

});
