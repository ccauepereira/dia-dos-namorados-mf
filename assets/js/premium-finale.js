// === PREMIUM FINALE ===
function initPremiumFinale() {
  const buyButton = document.getElementById('premium-buy-btn');
  const modal = document.getElementById('premium-checkout-modal');
  const modalPanel = modal?.querySelector('.premium-modal-panel');
  const approveButton = document.getElementById('premium-approve-btn');
  const approvalCard = document.getElementById('premium-approval-card');
  const finaleOverlay = document.getElementById('premium-finale-overlay');
  const finaleCanvas = document.getElementById('premium-finale-canvas');
  const finalMessage = document.getElementById('premium-final-message');
  const paymentMethods = modal?.querySelector('.premium-payment-methods');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const focusableSelector = [
    'a[href]',
    'area[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
  ].join(',');

  let lastFocusedElement = null;
  let finaleStarted = false;

  if (!buyButton || !modal || !modalPanel || !approveButton || !approvalCard || !finaleOverlay || !finaleCanvas || !finalMessage || !paymentMethods) {
    return;
  }

  function getFocusableElements() {
    return Array.from(modalPanel.querySelectorAll(focusableSelector))
      .filter((element) => element.offsetParent !== null || element === document.activeElement);
  }

  function openCheckoutModal() {
    lastFocusedElement = document.activeElement;
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    syncSelectedPayment();

    const focusable = getFocusableElements();
    (focusable[0] || modalPanel).focus();
  }

  function closeCheckoutModal() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';

    if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
      lastFocusedElement.focus();
    }
  }

  function handleModalKeydown(event) {
    if (event.key === 'Escape') {
      event.preventDefault();
      closeCheckoutModal();
      return;
    }

    if (event.key !== 'Tab') return;

    const focusable = getFocusableElements();
    if (!focusable.length) {
      event.preventDefault();
      modalPanel.focus();
      return;
    }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  function syncSelectedPayment() {
    paymentMethods.querySelectorAll('label').forEach((label) => {
      const input = label.querySelector('input[name="premium-payment"]');
      label.classList.toggle('selected', Boolean(input?.checked));
    });
  }

  function updateSelectedPayment(event) {
    const input = event.target.closest('input[name="premium-payment"]');
    if (!input) return;

    syncSelectedPayment();
  }

  function triggerApproval() {
    closeCheckoutModal();
    approvalCard.hidden = false;
    approvalCard.classList.add('visible');
    approvalCard.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'center' });
    window.setTimeout(triggerGrandFinale, 1500);
  }

  function triggerGrandFinale() {
    if (finaleStarted) return;
    finaleStarted = true;

    finaleOverlay.classList.add('active');
    finaleOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    if (prefersReducedMotion) {
      showFinalMessage();
      return;
    }

    playCanvasFinale(finaleCanvas, showFinalMessage);
  }

  function showFinalMessage() {
    finalMessage.classList.add('visible');
  }

  function playCanvasFinale(canvas, onComplete) {
    const context = canvas.getContext('2d');
    const particles = [];
    const timings = {
      gatherEnd: 1000,
      heartEnd: 2500,
      dissolveEnd: 3000,
      kittyEnd: 4000,
      explosionEnd: 4500,
      done: 5000,
    };
    let width = 0;
    let height = 0;
    let animationFrame = 0;
    let startTime = 0;

    function resize() {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * ratio);
      canvas.height = Math.floor(height * ratio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    }

    function setupParticles() {
      particles.length = 0;
      const count = Math.min(620, Math.max(300, Math.floor((width * height) / 3200)));
      const heartPoints = createHeartPoints(count, width, height);
      const kittyPoints = createKittyPoints(count, width, height);

      for (let index = 0; index < count; index += 1) {
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.max(width, height) * (0.5 + Math.random() * 0.5);
        const heart = heartPoints[index];
        particles.push({
          x0: width / 2 + Math.cos(angle) * distance,
          y0: height / 2 + Math.sin(angle) * distance,
          x1: width / 2 + (Math.random() - 0.5) * width * 0.18,
          y1: height / 2 + (Math.random() - 0.5) * height * 0.18,
          heartX: heart.x,
          heartY: heart.y,
          dissolveX: heart.x + (Math.random() - 0.5) * width * 0.42,
          dissolveY: heart.y + (Math.random() - 0.5) * height * 0.34,
          kittyX: kittyPoints[index].x,
          kittyY: kittyPoints[index].y,
          size: 1.2 + Math.random() * 2.6,
          alpha: 0.55 + Math.random() * 0.45,
          color: Math.random() > 0.28 ? '#FFF0F3' : '#D4AF37',
        });
      }
    }

    function draw(timestamp) {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      context.clearRect(0, 0, width, height);
      context.fillStyle = 'rgba(10, 2, 6, 0.32)';
      context.fillRect(0, 0, width, height);
      context.globalCompositeOperation = 'lighter';

      particles.forEach((particle) => {
        const point = getParticlePoint(particle, elapsed, timings);
        const fade = elapsed > timings.explosionEnd ? Math.max(0, 1 - ((elapsed - timings.explosionEnd) / 500)) : 1;
        context.globalAlpha = particle.alpha * fade;
        context.fillStyle = particle.color;
        context.beginPath();
        context.arc(point.x, point.y, particle.size, 0, Math.PI * 2);
        context.fill();
      });

      drawHelloKittyGuide(context, width, height, elapsed, timings);
      drawGoldenBurst(context, width, height, elapsed, timings);
      context.globalAlpha = 1;
      context.globalCompositeOperation = 'source-over';

      if (elapsed < timings.done) {
        animationFrame = window.requestAnimationFrame(draw);
      } else {
        window.cancelAnimationFrame(animationFrame);
        window.removeEventListener('resize', handleResize);
        onComplete();
      }
    }

    function handleResize() {
      resize();
      setupParticles();
    }

    resize();
    setupParticles();
    window.addEventListener('resize', handleResize, { passive: true });
    animationFrame = window.requestAnimationFrame(draw);
  }

  function getParticlePoint(particle, elapsed, timings) {
    if (elapsed < timings.gatherEnd) {
      return interpolate(particle.x0, particle.y0, particle.x1, particle.y1, easeOutCubic(elapsed / timings.gatherEnd));
    }

    if (elapsed < timings.heartEnd) {
      return interpolate(
        particle.x1,
        particle.y1,
        particle.heartX,
        particle.heartY,
        easeInOutCubic((elapsed - timings.gatherEnd) / (timings.heartEnd - timings.gatherEnd)),
      );
    }

    if (elapsed < timings.dissolveEnd) {
      return interpolate(
        particle.heartX,
        particle.heartY,
        particle.dissolveX,
        particle.dissolveY,
        easeOutCubic((elapsed - timings.heartEnd) / (timings.dissolveEnd - timings.heartEnd)),
      );
    }

    if (elapsed < timings.kittyEnd) {
      return interpolate(
        particle.dissolveX,
        particle.dissolveY,
        particle.kittyX,
        particle.kittyY,
        easeInOutCubic((elapsed - timings.dissolveEnd) / (timings.kittyEnd - timings.dissolveEnd)),
      );
    }

    return {
      x: particle.kittyX + Math.sin((elapsed + particle.kittyX) / 180) * 1.5,
      y: particle.kittyY,
    };
  }

  function drawHelloKittyGuide(context, width, height, elapsed, timings) {
    if (elapsed < timings.dissolveEnd) return;
    const alpha = Math.min(0.18, ((elapsed - timings.dissolveEnd) / 1000) * 0.18);
    const scale = Math.min(width, height) / 420;
    const centerX = width / 2;
    const centerY = height / 2;

    context.save();
    context.globalAlpha = alpha;
    context.fillStyle = '#FFF0F3';
    context.beginPath();
    context.ellipse(centerX, centerY + 10 * scale, 145 * scale, 112 * scale, 0, 0, Math.PI * 2);
    context.fill();
    context.beginPath();
    context.moveTo(centerX - 118 * scale, centerY - 54 * scale);
    context.lineTo(centerX - 82 * scale, centerY - 160 * scale);
    context.lineTo(centerX - 36 * scale, centerY - 76 * scale);
    context.closePath();
    context.fill();
    context.beginPath();
    context.moveTo(centerX + 118 * scale, centerY - 54 * scale);
    context.lineTo(centerX + 82 * scale, centerY - 160 * scale);
    context.lineTo(centerX + 36 * scale, centerY - 76 * scale);
    context.closePath();
    context.fill();
    context.fillStyle = '#D4AF37';
    context.beginPath();
    context.ellipse(centerX + 86 * scale, centerY - 78 * scale, 34 * scale, 24 * scale, 0, 0, Math.PI * 2);
    context.fill();
    context.restore();
  }

  function drawGoldenBurst(context, width, height, elapsed, timings) {
    if (elapsed < timings.kittyEnd || elapsed > timings.explosionEnd) return;
    const progress = (elapsed - timings.kittyEnd) / (timings.explosionEnd - timings.kittyEnd);
    const eased = easeOutCubic(progress);

    context.save();
    context.translate(width / 2, height / 2);
    context.strokeStyle = '#D4AF37';
    context.lineWidth = 2;
    context.globalAlpha = 1 - progress;

    for (let index = 0; index < 32; index += 1) {
      const angle = (Math.PI * 2 * index) / 32;
      const inner = 42 * eased;
      const outer = (84 + (index % 4) * 12) * eased;
      context.beginPath();
      context.moveTo(Math.cos(angle) * inner, Math.sin(angle) * inner);
      context.lineTo(Math.cos(angle) * outer, Math.sin(angle) * outer);
      context.stroke();
    }

    context.restore();
  }

  function createHeartPoints(count, width, height) {
    const points = [];
    const scale = Math.min(width, height) / 34;

    for (let index = 0; index < count; index += 1) {
      const t = (Math.PI * 2 * index) / count;
      const x = 16 * Math.pow(Math.sin(t), 3);
      const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
      points.push({
        x: width / 2 + x * scale,
        y: height / 2 + y * scale,
      });
    }

    return shuffle(points);
  }

  function createKittyPoints(count, width, height) {
    const points = [];
    const centerX = width / 2;
    const centerY = height / 2;
    const scale = Math.min(width, height) / 420;

    addEllipse(points, Math.floor(count * 0.66), centerX, centerY + 10 * scale, 142 * scale, 112 * scale);
    addTriangle(points, Math.floor(count * 0.12), [
      { x: centerX - 120 * scale, y: centerY - 52 * scale },
      { x: centerX - 82 * scale, y: centerY - 160 * scale },
      { x: centerX - 36 * scale, y: centerY - 76 * scale },
    ]);
    addTriangle(points, Math.floor(count * 0.12), [
      { x: centerX + 120 * scale, y: centerY - 52 * scale },
      { x: centerX + 82 * scale, y: centerY - 160 * scale },
      { x: centerX + 36 * scale, y: centerY - 76 * scale },
    ]);
    addEllipse(points, Math.floor(count * 0.1), centerX + 86 * scale, centerY - 78 * scale, 34 * scale, 24 * scale);

    while (points.length < count) {
      addEllipse(points, 1, centerX, centerY, 142 * scale, 112 * scale);
    }

    return shuffle(points).slice(0, count);
  }

  function addEllipse(points, amount, centerX, centerY, radiusX, radiusY) {
    for (let index = 0; index < amount; index += 1) {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.sqrt(Math.random());
      points.push({
        x: centerX + Math.cos(angle) * radiusX * radius,
        y: centerY + Math.sin(angle) * radiusY * radius,
      });
    }
  }

  function addTriangle(points, amount, vertices) {
    for (let index = 0; index < amount; index += 1) {
      const r1 = Math.random();
      const r2 = Math.random();
      const root = Math.sqrt(r1);
      const a = 1 - root;
      const b = root * (1 - r2);
      const c = root * r2;
      points.push({
        x: vertices[0].x * a + vertices[1].x * b + vertices[2].x * c,
        y: vertices[0].y * a + vertices[1].y * b + vertices[2].y * c,
      });
    }
  }

  function interpolate(fromX, fromY, toX, toY, progress) {
    return {
      x: fromX + (toX - fromX) * progress,
      y: fromY + (toY - fromY) * progress,
    };
  }

  function easeOutCubic(value) {
    const clamped = Math.min(Math.max(value, 0), 1);
    return 1 - Math.pow(1 - clamped, 3);
  }

  function easeInOutCubic(value) {
    const clamped = Math.min(Math.max(value, 0), 1);
    return clamped < 0.5 ? 4 * clamped * clamped * clamped : 1 - Math.pow(-2 * clamped + 2, 3) / 2;
  }

  function shuffle(items) {
    for (let index = items.length - 1; index > 0; index -= 1) {
      const target = Math.floor(Math.random() * (index + 1));
      [items[index], items[target]] = [items[target], items[index]];
    }
    return items;
  }

  syncSelectedPayment();

  buyButton.addEventListener('click', openCheckoutModal);
  approveButton.addEventListener('click', triggerApproval);
  modal.addEventListener('click', (event) => {
    if (event.target.matches('[data-premium-close]')) closeCheckoutModal();
  });
  modal.addEventListener('keydown', handleModalKeydown);
  paymentMethods?.addEventListener('change', updateSelectedPayment);
}

document.addEventListener('DOMContentLoaded', initPremiumFinale);
