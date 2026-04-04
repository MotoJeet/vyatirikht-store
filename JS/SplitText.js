/**
 * SplitText Vanilla Implementation (Powered by GSAP)
 * Mimics the logic of the React component provided.
 */

window.SplitTextEffect = function ({
  element,
  text,
  className = '',
  delay = 50,
  duration = 1.25,
  ease = 'power3.out',
  splitType = 'chars', // 'chars' or 'words'
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = '-100px',
  textAlign = 'center',
  onLetterAnimationComplete
}) {
  if (!element) return;

  element.innerHTML = "";
  element.className = `split-parent ${className}`;
  element.style.textAlign = textAlign;
  element.style.display = 'inline-block';
  element.style.whiteSpace = 'normal';
  element.style.wordWrap = 'break-word';
  element.style.padding = '0.1em 0'; /* Prevent vertical clipping */

  // Manual split logic (vanilla alternative to GSAP premium SplitText)
  const segments = splitType === 'words' ? text.split(' ') : text.split('');

  segments.forEach((segment, index) => {
    const span = document.createElement("span");
    span.textContent = segment === ' ' ? '\u00A0' : segment;
    if (splitType === 'words' && index < segments.length - 1) {
      span.textContent += '\u00A0';
    }
    span.className = splitType === 'words' ? 'split-word' : 'split-char';
    span.style.display = "inline-block";
    span.style.willChange = "transform, opacity";
    element.appendChild(span);
  });

  const targets = element.querySelectorAll('span');

  // GSAP Animation with ScrollTrigger
  gsap.fromTo(targets,
    { ...from },
    {
      ...to,
      duration,
      ease,
      stagger: delay / 1000,
      scrollTrigger: {
        trigger: element,
        start: `top ${100 - (threshold * 100)}%`, // Approximate logic for threshold
        once: true,
      },
      onComplete: () => {
        if (onLetterAnimationComplete) onLetterAnimationComplete();
      }
    }
  );
};
