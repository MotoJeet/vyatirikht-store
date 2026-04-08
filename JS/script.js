/* =====================
MAIN INIT
===================== */

document.addEventListener("DOMContentLoaded", () => {
  initCardNav();
  initCommentary();
  initPageTransitions();
  initVideoHover();
  initScrollAnimations();
  initCinematicCards();
  initFAQ();
  initParallax();
  initTutorialAnimations();
  initCanvas();
  initImageUpload();
  initSplitText();
  initClickSpark();
});

/* =====================
SPLIT TEXT
===================== */

function initSplitText() {
  const heroHeading = document.querySelector('.center-logo h1');

  if (heroHeading && window.SplitTextEffect) {
    window.SplitTextEffect({
      element: heroHeading,
      text: "vyatirikht",
      delay: 50,
      duration: 1.25,
      ease: "power3.out",
      splitType: "chars",
      from: { opacity: 0, y: 40 },
      to: { opacity: 1, y: 0 }
    });
  }
}

/* =====================
CLICK SPARK
===================== */

function initClickSpark() {
  if (window.ClickSpark) {
    window.ClickSpark({
      sparkColor: '#ffffff',
      sparkSize: 10,
      sparkRadius: 20,
      sparkCount: 10,
      duration: 400
    });
  }
}

/* =====================
PAGE TRANSITIONS
===================== */

function initPageTransitions() {
  document.body.classList.add("page-loaded");

  const links = document.querySelectorAll("a[href]");

  links.forEach(link => {
    const url = link.getAttribute("href");

    if (!url || url.startsWith("#") || url.startsWith("http")) return;

    link.addEventListener("click", e => {
      e.preventDefault();

      document.body.classList.remove("page-loaded");
      document.body.classList.add("page-exit");

      setTimeout(() => {
        window.location.href = url;
      }, 400);
    });
  });
}

/* =====================
VIDEO HOVER
===================== */

function initVideoHover() {
  const videos = document.querySelectorAll(".card video");

  if (!videos.length) return;

  videos.forEach(video => {
    const parent = video.parentElement;

    parent.addEventListener("mouseenter", () => video.play());
    parent.addEventListener("mouseleave", () => {
      video.pause();
      video.currentTime = 0;
    });
  });
}

/* =====================
SCROLL ANIMATIONS
===================== */

function initScrollAnimations() {
  const cards = document.querySelectorAll(".card");

  if (!cards.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  cards.forEach(card => observer.observe(card));
}

/* =====================
CINEMATIC CARDS
===================== */

function initCinematicCards() {
  const cinematicCards = document.querySelectorAll(".cinematic-card");

  if (!cinematicCards.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  cinematicCards.forEach(card => observer.observe(card));

  cinematicCards.forEach(card => {
    card.addEventListener("click", () => {
      const slider = document.querySelector(".cinematics-scroll");
      if (!slider) return;

      const cardWidth = card.offsetWidth + 50;

      const sliderCenter = slider.scrollLeft + slider.offsetWidth / 2;
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;

      slider.scrollBy({
        left: cardCenter > sliderCenter ? cardWidth : -cardWidth,
        behavior: "smooth"
      });
    });
  });

  enableDragScroll(".cinematics-scroll");
  enableDragScroll(".photo-scroll");
}

/* =====================
DRAG SCROLL
===================== */

function enableDragScroll(selector) {
  const slider = document.querySelector(selector);
  if (!slider) return;

  let isDown = false;
  let startX;
  let scrollLeft;

  slider.addEventListener("mousedown", e => {
    isDown = true;
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
    slider.style.scrollSnapType = 'none';
  });

  slider.addEventListener("mouseleave", () => {
    isDown = false;
    slider.style.scrollSnapType = 'x mandatory';
  });

  slider.addEventListener("mouseup", () => {
    isDown = false;
    slider.style.scrollSnapType = 'x mandatory';
  });

  slider.addEventListener("mousemove", e => {
    if (!isDown) return;
    e.preventDefault();

    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 2;

    slider.scrollLeft = scrollLeft - walk;
  });
}

/* =====================
FAQ
===================== */

function initFAQ() {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach(item => {
    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    if (!question || !answer) return;

    question.addEventListener("click", () => {
      answer.style.maxHeight = answer.style.maxHeight
        ? null
        : answer.scrollHeight + "px";
    });
  });
}

/* =====================
PARALLAX
===================== */

function initParallax() {
  let lastScroll = 0;

  window.addEventListener("scroll", () => {
    const scroll = window.scrollY;

    const hero = document.querySelector(".hero-overlay");
    const bg = document.querySelector(".parallax-bg");

    const smooth = lastScroll + (scroll - lastScroll) * 0.1;

    if (hero) hero.style.transform = `translateY(${smooth * 0.3}px)`;
    if (bg) bg.style.transform = `translateY(${smooth * 0.25}px)`;

    lastScroll = smooth;
  });
}

/* =====================
TUTORIAL ANIMATIONS
===================== */

function initTutorialAnimations() {
  const sections = document.querySelectorAll(".tutorial-article h2");

  if (!sections.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        observer.unobserve(entry.target);
      }
    });
  });

  sections.forEach(section => {
    section.style.opacity = "0";
    section.style.transform = "translateY(30px)";
    section.style.transition = "all .6s ease";

    observer.observe(section);
  });
}

/* =====================
CANVAS
===================== */

let ctx;

function initCanvas() {
  const canvas = document.getElementById("storyboardCanvas");
  if (!canvas) return;

  ctx = canvas.getContext("2d");

  let drawing = false;

  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;

  canvas.addEventListener("mousedown", () => drawing = true);
  canvas.addEventListener("mouseup", () => {
    drawing = false;
    ctx.beginPath();
  });

  canvas.addEventListener("mousemove", e => {
    if (!drawing) return;

    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.strokeStyle = "white";

    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY);
  });

  document.getElementById("clearCanvas")?.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  });
}

/* =====================
IMAGE UPLOAD
===================== */

function initImageUpload() {
  const upload = document.getElementById("imageUpload");
  if (!upload || !ctx) return;

  upload.addEventListener("change", function () {
    const file = this.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = function (e) {
      const img = new Image();
      img.src = e.target.result;

      img.onload = () => {
        ctx.drawImage(img, 50, 50, 300, 200);
      };
    };

    reader.readAsDataURL(file);
  });
}

/* =====================
VIDEO LOAD HANDLER
===================== */

function handleVideoLoad(iframe) {
  const thumb = document.querySelector(".yt-thumb");

  iframe.addEventListener("load", () => {
    setTimeout(() => {
      if (thumb) thumb.style.opacity = "0";
    }, 800);
  });
}

/* =====================
CARD NAV
===================== */

function initCardNav() {
  const nav = document.getElementById('mainCardNav');
  const toggle = document.getElementById('cardNavToggle');
  const content = document.getElementById('cardNavContent');
  const cards = content ? content.querySelectorAll('.nav-card') : [];

  if (!nav || !toggle || !content) return;

  let isExpanded = false;

  gsap.set(nav, { height: 60 });
  gsap.set(cards, { y: 30, opacity: 0 });

  toggle.addEventListener('click', () => {
    isExpanded = !isExpanded;
    nav.classList.toggle('open', isExpanded);

    if (isExpanded) {
      gsap.to(nav, { height: content.scrollHeight + 80, duration: 0.5 });
      gsap.to(cards, { y: 0, opacity: 1, stagger: 0.05 });
    } else {
      gsap.to(nav, { height: 60, duration: 0.4 });
      gsap.to(cards, { y: 20, opacity: 0, stagger: 0.05 });
    }
  });
}

/* =====================
COMMENTARY
===================== */

function initCommentary() {
  const toggle = document.getElementById("commentaryToggleSwitch");
  const overlay = document.getElementById("commentaryOverlay");

  if (!toggle || !overlay) return;

  toggle.addEventListener("change", function () {
    if (this.checked) {
      overlay.classList.remove("hidden");
      gsap.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.4 });
    } else {
      gsap.to(overlay, {
        opacity: 0,
        duration: 0.3,
        onComplete: () => overlay.classList.add("hidden")
      });
    }
  });
}
