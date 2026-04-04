

window.addEventListener("scroll", function(){

let scroll = window.scrollY
let hero = document.querySelector(".hero-overlay")

if(hero){
hero.style.transform = "translateY(" + scroll * 0.3 + "px)"
}

})

document.addEventListener("DOMContentLoaded", () => {
    // Initialize SplitText on index.html heading
    const heroHeading = document.querySelector('.center-logo h1');
    if (heroHeading && window.SplitTextEffect) {
        window.SplitTextEffect({
            element: heroHeading,
            text: "CineTorque Films",
            className: "text-2xl font-semibold text-center",
            delay: 50,
            duration: 1.25,
            ease: "power3.out",
            splitType: "chars",
            from: { opacity: 0, y: 40 },
            to: { opacity: 1, y: 0 },
            onLetterAnimationComplete: () => console.log('All letters have animated!')
        });
    }

    // Initialize ClickSpark
    if (window.ClickSpark) {
        window.ClickSpark({
            sparkColor: '#ffffff',
            sparkSize: 10,
            sparkRadius: 20,
            sparkCount: 10,
            duration: 400
        });
    }

    // Initialize CardNav
    initCardNav();
    // Initialize Commentary
    initCommentary();
});

document.body.classList.add("page-loaded")

const links = document.querySelectorAll("a")

links.forEach(link => {

link.addEventListener("click", e => {

const url = link.getAttribute("href")

if(url && !url.startsWith("#") && !url.startsWith("http")){

e.preventDefault()

document.body.classList.remove("page-loaded")
document.body.classList.add("page-exit")

setTimeout(()=>{
window.location.href = url
},400)

}

})

})

/* =====================
VIDEO HOVER
===================== */

const videos = document.querySelectorAll(".card video")

videos.forEach(video => {

video.parentElement.addEventListener("mouseenter", () => {
video.play()
})

video.parentElement.addEventListener("mouseleave", () => {
video.pause()
video.currentTime = 0
})

})

/* =====================
CARD SCROLL ANIMATION
===================== */

const cards = document.querySelectorAll(".card")

if(cards.length){

const observer = new IntersectionObserver(entries => {

entries.forEach(entry => {

if(entry.isIntersecting){
entry.target.classList.add("show")
}

})

},{ threshold:0.2 })

cards.forEach(card=>{
observer.observe(card)
})

}

/* =====================
CINEMATIC CARDS
===================== */

const cinematicCards = document.querySelectorAll(".cinematic-card")

if(cinematicCards.length){

const cinematicObserver = new IntersectionObserver(entries => {

entries.forEach(entry => {

if(entry.isIntersecting){
entry.target.classList.add("show")
}

})

},{threshold:0.3})

cinematicCards.forEach(card=>{
cinematicObserver.observe(card)
})

}

/* =====================
HORIZONTAL DRAG SCROLL
===================== */

/* =====================
HORIZONTAL DRAG SCROLL
===================== */

function enableDragScroll(selector) {
    const slider = document.querySelector(selector);
    if (!slider) return;

    let isDown = false;
    let startX;
    let scrollLeft;

    slider.addEventListener("mousedown", (e) => {
        isDown = true;
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
        slider.style.scrollSnapType = 'none'; // Disable snap during drag
    });

    slider.addEventListener("mouseleave", () => {
        isDown = false;
        slider.style.scrollSnapType = 'x mandatory';
    });

    slider.addEventListener("mouseup", () => {
        isDown = false;
        slider.style.scrollSnapType = 'x mandatory';
    });

    slider.addEventListener("mousemove", (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 2;
        slider.scrollLeft = scrollLeft - walk;
    });
}

enableDragScroll(".cinematics-scroll");
enableDragScroll(".photo-scroll");

/* =====================
CINEMATIC CLICK NAVIGATION
===================== */

const cinematicCards2 = document.querySelectorAll(".cinematic-card")

cinematicCards2.forEach(card => {

card.addEventListener("click", () => {

const slider = document.querySelector(".cinematics-scroll")
if(!slider) return

const cardWidth = card.offsetWidth + 50

const sliderCenter = slider.scrollLeft + slider.offsetWidth / 2
const cardCenter = card.offsetLeft + card.offsetWidth / 2

if(cardCenter > sliderCenter){

slider.scrollBy({
left: cardWidth,
behavior: "smooth"
})

}else{

slider.scrollBy({
left: -cardWidth,
behavior: "smooth"
})

}

})

})

/* =====================
FAQ SECTION
===================== */

const faqItems = document.querySelectorAll(".faq-item")

faqItems.forEach(item => {

const question = item.querySelector(".faq-question")
const answer = item.querySelector(".faq-answer")

question.addEventListener("click", () => {

if(answer.style.maxHeight){
answer.style.maxHeight = null
}else{
answer.style.maxHeight = answer.scrollHeight + "px"
}

})

})

const bg = document.querySelector(".parallax-bg")

window.addEventListener("scroll", () => {

let scroll = window.scrollY

if(bg){
bg.style.transform = "translateY(" + scroll * 0.25 + "px)"
}

})

const sections = document.querySelectorAll(".tutorial-article h2")

const tutorialObserver = new IntersectionObserver(entries => {

entries.forEach(entry => {

if(entry.isIntersecting){
entry.target.style.opacity = "1"
entry.target.style.transform = "translateY(0)"
}

})

})

sections.forEach(section => {

section.style.opacity = "0"
section.style.transform = "translateY(30px)"
section.style.transition = "all .6s ease"

tutorialObserver.observe(section)

})

const canvas = document.getElementById("storyboardCanvas")

if(canvas){

const ctx = canvas.getContext("2d")

let drawing = false

canvas.width = canvas.offsetWidth
canvas.height = canvas.offsetHeight

canvas.addEventListener("mousedown", () => {
drawing = true
})

canvas.addEventListener("mouseup", () => {
drawing = false
ctx.beginPath()
})

canvas.addEventListener("mousemove", draw)

function draw(e){

if(!drawing) return

ctx.lineWidth = 2
ctx.lineCap = "round"
ctx.strokeStyle = "white"

ctx.lineTo(e.offsetX, e.offsetY)
ctx.stroke()

ctx.beginPath()
ctx.moveTo(e.offsetX, e.offsetY)

}

document.getElementById("clearCanvas").onclick = () => {
ctx.clearRect(0,0,canvas.width,canvas.height)
}

}

const upload = document.getElementById("imageUpload")

if(upload){

upload.addEventListener("change", function(){

const file = this.files[0]
const reader = new FileReader()

reader.onload = function(e){

const img = new Image()
img.src = e.target.result

img.onload = () => {
ctx.drawImage(img,50,50,300,200)
}

}

reader.readAsDataURL(file)

})

}

/**
 * CardNav - Vanilla GSAP Implementation
 */
function initCardNav() {
    const nav = document.getElementById('mainCardNav');
    const toggle = document.getElementById('cardNavToggle');
    const content = document.getElementById('cardNavContent');
    const cards = content ? content.querySelectorAll('.nav-card') : [];
    if (!nav || !toggle || !content) return;

    let isExpanded = false;

    const calculateHeight = () => {
        const isMobile = window.innerWidth <= 768;
        if (isMobile) {
            const topBar = 60;
            const padding = 20;
            const contentHeight = content.scrollHeight;
            return topBar + contentHeight + padding;
        }
        return 340; 
    };

    // Initial state
    gsap.set(nav, { height: 60 });
    gsap.set(cards, { y: 30, opacity: 0 });

    toggle.addEventListener('click', () => {
        isExpanded = !isExpanded;
        nav.classList.toggle('open', isExpanded);
        
        if (isExpanded) {
            const targetHeight = calculateHeight();
            gsap.to(nav, {
                height: targetHeight,
                duration: 0.5,
                ease: "power3.out",
                overwrite: true
            });

            gsap.to(cards, {
                y: 0,
                opacity: 1,
                duration: 0.4,
                stagger: 0.05,
                ease: "power2.out",
                delay: 0.1,
                overwrite: true
            });
        } else {
            gsap.to(nav, {
                height: 60,
                duration: 0.4,
                ease: "power3.inOut",
                overwrite: true
            });

            gsap.to(cards, {
                y: 20,
                opacity: 0,
                duration: 0.3,
                stagger: {
                    each: 0.05,
                    from: "end"
                },
                ease: "power2.in",
                overwrite: true
            });
        }
    });

    // Close on resize if expanded to prevent layout bugs
    window.addEventListener('resize', () => {
        if (isExpanded) {
            isExpanded = false;
            nav.classList.remove('open');
            gsap.set(nav, { height: 60 });
            gsap.set(cards, { y: 30, opacity: 0 });
        }
    });
}

/**
 * Director's Commentary Toggle
 */
function initCommentary() {
    const commentaryToggle = document.getElementById("commentaryToggleSwitch");
    const commentaryOverlay = document.getElementById("commentaryOverlay");
    if (!commentaryToggle || !commentaryOverlay) return;

    commentaryToggle.addEventListener("change", function() {
        if (this.checked) {
            commentaryOverlay.classList.remove("hidden");
            gsap.fromTo(commentaryOverlay, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4 });
        } else {
            gsap.to(commentaryOverlay, { opacity: 0, y: 20, duration: 0.3, onComplete: () => {
                commentaryOverlay.classList.add("hidden");
            }});
        }
    });
}
