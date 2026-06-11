// === PREMIUM FINALE ===
(function initPremiumFinaleModule() {
  const TOAST_MESSAGES = [
    '❤️ The black monkey just fell in love again.',
    '🐒 System update: girlfriend remains perfect.',
    '✨ Reminder: she is your favorite person.',
    '🚨 Cuteness levels exceeded.',
  ];

  const FINAL_PHASES = {
    gather: 900,
    heart: 1700,
    explode: 2600,
    kitty: 4300,
    fade: 5900,
  };

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
  let toastTimer = null;
  let finaleStarted = false;

  const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function initPremiumFinale() {
    const buyButton = document.getElementById('premium-buy-btn');
    const modal = document.getElementById('premium-checkout-modal');
    const completeButton = document.getElementById('premium-complete-purchase');

    if (!buyButton || !modal || !completeButton) return;

    buyButton.addEventListener('click', () => openCheckout(modal, buyButton));
    modal.addEventListener('click', (event) => {
      if (event.target.matches('[data-premium-close]')) closeCheckout(modal);
    });
    modal.addEventListener('keydown', (event) => handleModalKeydown(event, modal));
    completeButton.addEventListener('click', () => {
      closeCheckout(modal);
      startFinale();
    });

    startLoveToasts();
  }

  function openCheckout(modal, trigger) {
    lastFocusedElement = trigger || document.activeElement;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    const focusable = getFocusableElements(modal);
    (focusable[0] || modal).focus();
  }

  function closeCheckout(modal) {
    if (!modal.classList.contains('is-open')) return;

    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';

    if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
      lastFocusedElement.focus();
    }
  }

  function handleModalKeydown(event, modal) {
    if (event.key === 'Escape') {
      event.preventDefault();
      closeCheckout(modal);
      return;
    }

    if (event.key !== 'Tab') return;

    const focusable = getFocusableElements(modal);
    if (!focusable.length) {
      event.preventDefault();
      modal.focus();
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

  function getFocusableElements(container) {
    return Array.from(container.querySelectorAll(focusableSelector))
      .filter((element) => element.offsetParent !== null || element === document.activeElement);
  }

  function startFinale() {
    if (finaleStarted) return;
    finaleStarted = true;

    const overlay = document.getElementById('premium-finale-overlay');
    const approval = document.getElementById('premium-approval');
    const finalMessage = document.getElementById('premium-final-message');
    const canvas = document.getElementById('premium-finale-canvas');

    if (!overlay || !approval || !finalMessage || !canvas) return;

    overlay.classList.add('is-active');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    window.setTimeout(() => approval.classList.add('is-visible'), 80);

    if (prefersReducedMotion()) {
      canvas.style.display = 'none';
      window.setTimeout(() => finalMessage.classList.add('is-visible'), 900);
      return;
    }

    animateGrandFinale(canvas, () => {
      approval.classList.remove('is-visible');
      finalMessage.classList.add('is-visible');
    });
  }

  function animateGrandFinale(canvas, onComplete) {
    const ctx = canvas.getContext('2d');
    const particles = [];
    let width = 0;
    let height = 0;
    let startTime = 0;
    let animationFrame = 0;

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * ratio);
      canvas.height = Math.floor(height * ratio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    resize();
    window.addEventListener('resize', resize, { passive: true });

    const count = Math.min(780, Math.max(360, Math.floor((width * height) / 2600)));
    const heartPoints = createHeartPoints(count, width, height);
    const kittyPoints = createKittyPoints(count, width, height);

    for (let i = 0; i < count; i += 1) {
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.max(width, height) * (0.55 + Math.random() * 0.45);
      particles.push({
        x: width / 2 + Math.cos(angle) * distance,
        y: height / 2 + Math.sin(angle) * distance,
        originX: width / 2 + Math.cos(angle) * distance,
        originY: height / 2 + Math.sin(angle) * distance,
        heartX: heartPoints[i].x,
        heartY: heartPoints[i].y,
        burstX: heartPoints[i].x + (Math.random() - 0.5) * width * 0.52,
        burstY: heartPoints[i].y + (Math.random() - 0.5) * height * 0.44,
        kittyX: kittyPoints[i].x,
        kittyY: kittyPoints[i].y,
        size: Math.random() * 2.6 + 1.2,
        alpha: Math.random() * 0.45 + 0.55,
        color: Math.random() > 0.28 ? '#fff0f3' : '#d4af37',
      });
    }

    const draw = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;

      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = 'rgba(8, 1, 5, 0.22)';
      ctx.fillRect(0, 0, width, height);

      particles.forEach((particle) => {
        const position = getParticlePosition(particle, elapsed);
        const fade = elapsed > FINAL_PHASES.fade ? Math.max(0, 1 - ((elapsed - FINAL_PHASES.fade) / 900)) : 1;
        ctx.globalAlpha = particle.alpha * fade;
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(position.x, position.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;

      if (elapsed < FINAL_PHASES.fade + 950) {
        animationFrame = window.requestAnimationFrame(draw);
      } else {
        window.cancelAnimationFrame(animationFrame);
        window.removeEventListener('resize', resize);
        onComplete();
      }
    };

    animationFrame = window.requestAnimationFrame(draw);
  }

  function getParticlePosition(particle, elapsed) {
    if (elapsed < FINAL_PHASES.gather) {
      const progress = easeOutCubic(elapsed / FINAL_PHASES.gather);
      return interpolatePoint(particle.originX, particle.originY, particle.heartX, particle.heartY, progress);
    }

    if (elapsed < FINAL_PHASES.heart) {
      const pulse = Math.sin((elapsed - FINAL_PHASES.gather) / 120) * 5;
      return { x: particle.heartX, y: particle.heartY + pulse };
    }

    if (elapsed < FINAL_PHASES.explode) {
      const progress = easeOutCubic((elapsed - FINAL_PHASES.heart) / (FINAL_PHASES.explode - FINAL_PHASES.heart));
      return interpolatePoint(particle.heartX, particle.heartY, particle.burstX, particle.burstY, progress);
    }

    if (elapsed < FINAL_PHASES.kitty) {
      const progress = easeInOutCubic((elapsed - FINAL_PHASES.explode) / (FINAL_PHASES.kitty - FINAL_PHASES.explode));
      return interpolatePoint(particle.burstX, particle.burstY, particle.kittyX, particle.kittyY, progress);
    }

    const shimmer = Math.sin((elapsed + particle.kittyX) / 180) * 2;
    return { x: particle.kittyX + shimmer, y: particle.kittyY };
  }

  function interpolatePoint(fromX, fromY, toX, toY, progress) {
    return {
      x: fromX + (toX - fromX) * progress,
      y: fromY + (toY - fromY) * progress,
    };
  }

  function createHeartPoints(count, width, height) {
    const points = [];
    const scale = Math.min(width, height) / 34;

    for (let i = 0; i < count; i += 1) {
      const t = (i / count) * Math.PI * 2;
      const jitter = 0.92 + Math.random() * 0.16;
      const x = 16 * Math.pow(Math.sin(t), 3);
      const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
      points.push({
        x: width / 2 + x * scale * jitter,
        y: height / 2 + y * scale * jitter,
      });
    }

    return shuffle(points);
  }

  function createKittyPoints(count, width, height) {
    const points = [];
    const cx = width / 2;
    const cy = height / 2;
    const scale = Math.min(width, height) / 420;

    const addEllipse = (amount, centerX, centerY, radiusX, radiusY) => {
      for (let i = 0; i < amount; i += 1) {
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.sqrt(Math.random());
        points.push({
          x: centerX + Math.cos(angle) * radiusX * radius * scale,
          y: centerY + Math.sin(angle) * radiusY * radius * scale,
        });
      }
    };

    const addTriangle = (amount, vertices) => {
      for (let i = 0; i < amount; i += 1) {
        const r1 = Math.random();
        const r2 = Math.random();
        const root = Math.sqrt(r1);
        const a = 1 - root;
        const b = root * (1 - r2);
        const c = root * r2;
        points.push({
          x: (vertices[0].x * a) + (vertices[1].x * b) + (vertices[2].x * c),
          y: (vertices[0].y * a) + (vertices[1].y * b) + (vertices[2].y * c),
        });
      }
    };

    addEllipse(Math.floor(count * 0.66), cx, cy + 10 * scale, 142, 112);
    addTriangle(Math.floor(count * 0.12), [
      { x: cx - 120 * scale, y: cy - 52 * scale },
      { x: cx - 82 * scale, y: cy - 160 * scale },
      { x: cx - 36 * scale, y: cy - 76 * scale },
    ]);
    addTriangle(Math.floor(count * 0.12), [
      { x: cx + 120 * scale, y: cy - 52 * scale },
      { x: cx + 82 * scale, y: cy - 160 * scale },
      { x: cx + 36 * scale, y: cy - 76 * scale },
    ]);
    addEllipse(Math.floor(count * 0.1), cx + 86 * scale, cy - 78 * scale, 34, 24);

    while (points.length < count) addEllipse(1, cx, cy, 140, 105);
    return shuffle(points).slice(0, count);
  }

  function shuffle(items) {
    for (let i = items.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [items[i], items[j]] = [items[j], items[i]];
    }
    return items;
  }

  function easeOutCubic(value) {
    const clamped = Math.min(Math.max(value, 0), 1);
    return 1 - Math.pow(1 - clamped, 3);
  }

  function easeInOutCubic(value) {
    const clamped = Math.min(Math.max(value, 0), 1);
    return clamped < 0.5 ? 4 * clamped * clamped * clamped : 1 - Math.pow(-2 * clamped + 2, 3) / 2;
  }

  function startLoveToasts() {
    toastTimer = window.setInterval(showLoveToast, 30000);
  }

  function showLoveToast() {
    let toast = document.getElementById('premium-love-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'premium-love-toast';
      toast.className = 'premium-love-toast';
      toast.setAttribute('role', 'status');
      toast.setAttribute('aria-live', 'polite');
      document.body.appendChild(toast);
    }

    toast.textContent = TOAST_MESSAGES[Math.floor(Math.random() * TOAST_MESSAGES.length)];
    toast.classList.add('is-visible');

    window.setTimeout(() => {
      toast.classList.remove('is-visible');
    }, prefersReducedMotion() ? 3500 : 5200);
  }

  document.addEventListener('DOMContentLoaded', initPremiumFinale);
  window.addEventListener('beforeunload', () => {
    if (toastTimer) window.clearInterval(toastTimer);
  });
})();
