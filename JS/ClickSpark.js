/**
 * ClickSpark Vanilla Implementation
 * High-performance canvas-based click feedback.
 */

window.ClickSpark = function({
  sparkColor = '#fff',
  sparkSize = 10,
  sparkRadius = 15,
  sparkCount = 8,
  duration = 400,
  easing = 'ease-out',
  extraScale = 1.0
}) {
  const container = document.documentElement; // Root to avoid body transform issues
  const canvas = document.createElement('canvas');
  canvas.id = 'click-spark-canvas';
  
  const dpr = window.devicePixelRatio || 1;

  Object.assign(canvas.style, {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    zIndex: 9999,
    display: 'block',
    userSelect: 'none'
  });
  container.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  let sparks = [];

  const resizeCanvas = () => {
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    ctx.scale(dpr, dpr);
  };

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  const easeFunc = (t) => {
    switch (easing) {
      case 'linear': return t;
      case 'ease-in': return t * t;
      case 'ease-in-out': return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      default: return t * (2 - t);
    }
  };

  const animate = (timestamp) => {
    ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);

    sparks = sparks.filter(spark => {
      const elapsed = timestamp - spark.startTime;
      if (elapsed >= duration) return false;

      const progress = elapsed / duration;
      const eased = easeFunc(progress);

      const distance = eased * sparkRadius * extraScale;
      const lineLength = sparkSize * (1 - eased);

      const x1 = spark.x + distance * Math.cos(spark.angle);
      const y1 = spark.y + distance * Math.sin(spark.angle);
      const x2 = spark.x + (distance + lineLength) * Math.cos(spark.angle);
      const y2 = spark.y + (distance + lineLength) * Math.sin(spark.angle);

      ctx.strokeStyle = sparkColor;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();

      return true;
    });

    requestAnimationFrame(animate);
  };

  requestAnimationFrame(animate);

  window.addEventListener('click', (e) => {
    const now = performance.now();
    for (let i = 0; i < sparkCount; i++) {
      sparks.push({
        x: e.clientX,
        y: e.clientY,
        angle: (2 * Math.PI * i) / sparkCount,
        startTime: now
      });
    }
  });
};
