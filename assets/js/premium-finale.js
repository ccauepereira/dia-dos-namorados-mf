// === PREMIUM FINALE ===
// ✏️ EDITABLE CONSTANTS — all user-facing text lives here at the top of premium-finale.js

const BARBIE_INTRO = 'Porque nenhuma loja do mundo conseguiria vender alguém tão especial.'; // ✏️ EDIT HERE
const BARBIE_TITLE = 'BARBIE FERNANDA™ — Edição Limitada'; // ✏️ EDIT HERE
const BARBIE_SUBTITLE = 'The strongest, most beautiful and most incredible woman in the universe.'; // ✏️ EDIT HERE
const BARBIE_PRICE = 'R$ Incalculável ❤️'; // ✏️ EDIT HERE

const BARBIE_TRAITS = [
  'Forte', // ✏️ EDIT HERE
  'Determinada', // ✏️ EDIT HERE
  'Parceira', // ✏️ EDIT HERE
  'Engraçada', // ✏️ EDIT HERE
  'Dona do sorriso mais bonito do mundo', // ✏️ EDIT HERE
  'Minha pessoa favorita', // ✏️ EDIT HERE
];

const CARD_HOLDER = 'Maria Fernanda ❤️'; // ✏️ EDIT HERE
const CARD_NAME = 'XereCard™ Black Unlimited'; // ✏️ EDIT HERE
const CARD_STATUS = 'Approved for unlimited love.'; // ✏️ EDIT HERE
const CARD_LIMIT = 'Infinite.'; // ✏️ EDIT HERE

const CARD_BENEFITS = [
  'Unlimited hugs', // ✏️ EDIT HERE
  'Unlimited kisses', // ✏️ EDIT HERE
  'Lifetime emotional support', // ✏️ EDIT HERE
  'Priority cuddle access', // ✏️ EDIT HERE
  'Premium girlfriend status', // ✏️ EDIT HERE
];

const APPROVAL_TITLE = '✔ Transaction Approved'; // ✏️ EDIT HERE
const APPROVAL_LINE_1 = 'Purchase approved.'; // ✏️ EDIT HERE
const APPROVAL_LINE_2 = 'This collectible already belongs to the luckiest boyfriend alive.'; // ✏️ EDIT HERE
const APPROVAL_STATUS = 'Already owned by her boyfriend\'s heart.'; // ✏️ EDIT HERE

const FINAL_MESSAGE_EN = `You are the best thing that has ever happened to me.\n\nThank you for choosing me every single day.\n\nI love you, my little white monkey.\n\nForever yours. ❤️🐒🤍`; // ✏️ EDIT HERE
const FINAL_MESSAGE_PT = 'Você merece um final feliz digno de desenho animado. 🎀'; // ✏️ EDIT HERE

const LOVE_TOASTS = [
  '❤️ Você continua sendo meu lugar favorito.', // ✏️ EDIT HERE
  '🐒 O macaquinho preto ainda está apaixonado.', // ✏️ EDIT HERE
  '🎀 Nível de fofura detectado.', // ✏️ EDIT HERE
  '✨ Obrigado por existir.', // ✏️ EDIT HERE
];
const TOAST_INTERVAL_MIN = 30000; // ✏️ EDIT HERE — min ms between toasts (30s)
const TOAST_INTERVAL_MAX = 45000; // ✏️ EDIT HERE — max ms between toasts (45s)

const PREMIUM_SECTION_LABEL = 'Premium Finale'; // ✏️ EDIT HERE
const RATING_LABEL = '★★★★★'; // ✏️ EDIT HERE
const RATING_REVIEWS = '(∞ avaliações do namorado)'; // ✏️ EDIT HERE
const BUY_BUTTON_LABEL = '🛒 Comprar Agora'; // ✏️ EDIT HERE
const CHECKOUT_TITLE = 'Secure Checkout'; // ✏️ EDIT HERE
const CARD_HOLDER_LABEL = 'Card Holder:'; // ✏️ EDIT HERE
const CARD_NAME_LABEL = 'Card:'; // ✏️ EDIT HERE
const CARD_STATUS_LABEL = 'Status:'; // ✏️ EDIT HERE
const CARD_LIMIT_LABEL = 'Available limit:'; // ✏️ EDIT HERE
const BENEFITS_TITLE = 'Benefits'; // ✏️ EDIT HERE
const PAYMENT_TITLE = 'Payment methods'; // ✏️ EDIT HERE
const PAYMENT_METHODS = [
  '💳 XereCard™ Black Unlimited', // ✏️ EDIT HERE
  '❤️ Beijinhos Doces™', // ✏️ EDIT HERE
  '🤗 Abraços Ilimitados™', // ✏️ EDIT HERE
];
const APPROVE_BUTTON_LABEL = '💳 Approve Transaction'; // ✏️ EDIT HERE
const RETURN_BUTTON_LABEL = 'Return'; // ✏️ EDIT HERE
const CLOSE_BUTTON_LABEL = 'Close checkout'; // ✏️ EDIT HERE
const RATING_ARIA_LABEL = 'Rated five out of five stars'; // ✏️ EDIT HERE
const TRAITS_ARIA_LABEL = 'Características da edição limitada'; // ✏️ EDIT HERE
const FINALE_CANVAS_LABEL = 'Grand finale animation with particles, a heart, Hello Kitty silhouette, and a golden burst.'; // ✏️ EDIT HERE
const FINALE_CANVAS_FALLBACK = 'Grand finale animation with particles, a heart, Hello Kitty silhouette, and a golden burst.'; // ✏️ EDIT HERE
const FERNANDA_IMAGE_ALT = 'BARBIE FERNANDA Limited Edition collectible'; // ✏️ EDIT HERE
const XERECARD_IMAGE_ALT = 'XereCard Black Unlimited premium payment card'; // ✏️ EDIT HERE
const BENEFIT_PREFIX = '✅'; // ✏️ EDIT HERE
const AVAILABLE_LIMIT_LABEL = 'Available Limit:'; // ✏️ EDIT HERE
const APPROVAL_LIMITS = ['∞ Love', '∞ Affection', '∞ Patience']; // ✏️ EDIT HERE
const APPROVAL_STATUS_LABEL = 'Status:'; // ✏️ EDIT HERE

(function initPremiumFinaleModule() {
  const FERNANDA_IMAGE = 'assets/images/fernanda.png';
  const XERECARD_IMAGE = 'assets/images/xerecard.jpeg';
  const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  const focusableSelector = [
    'a[href]',
    'area[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
  ].join(',');

  let section;
  let modal;
  let modalPanel;
  let buyButton;
  let approvalCard;
  let finaleOverlay;
  let finaleCanvas;
  let finalMessage;
  let lastFocusedElement;
  let toastTimer;
  let toastHideTimer;
  let finaleStarted = false;

  function prefersReducedMotion() {
    return reducedMotionQuery.matches;
  }

  function escapeHTML(value) {
    return String(value)
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#039;');
  }

  function initPremiumFinale() {
    const finalSurprise = document.getElementById('section-final');
    if (!finalSurprise || document.getElementById('section-premium-finale')) return;

    injectPremiumStyles();
    section = buildPremiumSection();
    finalSurprise.insertAdjacentElement('afterend', section);

    modal = section.querySelector('[data-premium-modal]');
    modalPanel = section.querySelector('[data-premium-modal-panel]');
    buyButton = section.querySelector('[data-premium-buy]');
    approvalCard = section.querySelector('[data-premium-approval]');
    finaleOverlay = section.querySelector('[data-premium-finale-overlay]');
    finaleCanvas = section.querySelector('[data-premium-finale-canvas]');
    finalMessage = section.querySelector('[data-premium-final-message]');

    bindPremiumEvents();
    enableExistingMonkeyEyesIfAvailable();
    syncExistingMusicEqualizerIfAvailable();
    scheduleNextLoveToast();
  }

  function buildPremiumSection() {
    const wrapper = document.createElement('section');
    wrapper.className = 'parte-2b-section premium-finale-section';
    wrapper.id = 'section-premium-finale';
    wrapper.setAttribute('aria-labelledby', 'premium-finale-title');

    wrapper.innerHTML = `
      <div class="parte-2b-wrap premium-finale-wrap">
        <article class="premium-finale-card" aria-label="${escapeHTML(PREMIUM_SECTION_LABEL)}">
          <div class="premium-finale-media">
            <img
              src="${FERNANDA_IMAGE}"
              alt="${escapeHTML(FERNANDA_IMAGE_ALT)}"
              loading="lazy"
            />
          </div>
          <div class="premium-finale-info">
            <p class="premium-finale-eyebrow">${escapeHTML(PREMIUM_SECTION_LABEL)}</p>
            <p class="premium-finale-intro">${escapeHTML(BARBIE_INTRO)}</p>
            <h2 id="premium-finale-title">${escapeHTML(BARBIE_TITLE)}</h2>
            <p class="premium-finale-subtitle">&quot;${escapeHTML(BARBIE_SUBTITLE)}&quot;</p>
            <div class="premium-finale-rating" aria-label="${escapeHTML(RATING_ARIA_LABEL)}">
              <span aria-hidden="true">${escapeHTML(RATING_LABEL)}</span>
              <span>${escapeHTML(RATING_REVIEWS)}</span>
            </div>
            <ul class="premium-finale-traits" aria-label="${escapeHTML(TRAITS_ARIA_LABEL)}">
              ${BARBIE_TRAITS.map((trait) => `<li>${escapeHTML(trait)}</li>`).join('')}
            </ul>
            <p class="premium-finale-price">${escapeHTML(BARBIE_PRICE)}</p>
            <button class="final-btn premium-finale-buy" type="button" data-premium-buy>${escapeHTML(BUY_BUTTON_LABEL)}</button>
          </div>
        </article>

        <article class="premium-finale-approval" data-premium-approval aria-live="polite" hidden>
          <h3>${escapeHTML(APPROVAL_TITLE)}</h3>
          <p>${escapeHTML(APPROVAL_LINE_1)}<br />${escapeHTML(APPROVAL_LINE_2)}</p>
          <dl>
            <div>
              <dt>${escapeHTML(AVAILABLE_LIMIT_LABEL)}</dt>
              <dd>${APPROVAL_LIMITS.map((limit) => escapeHTML(limit)).join('<br />')}</dd>
            </div>
            <div>
              <dt>${escapeHTML(APPROVAL_STATUS_LABEL)}</dt>
              <dd>${escapeHTML(APPROVAL_STATUS)}</dd>
            </div>
          </dl>
        </article>
      </div>

      <div class="premium-finale-modal" data-premium-modal role="dialog" aria-modal="true" aria-hidden="true" aria-labelledby="premium-checkout-title">
        <div class="premium-finale-backdrop" data-premium-close></div>
        <div class="premium-finale-modal-card" data-premium-modal-panel role="document" tabindex="-1">
          <button class="premium-finale-close" type="button" data-premium-close aria-label="${escapeHTML(CLOSE_BUTTON_LABEL)}">×</button>
          <h2 id="premium-checkout-title">${escapeHTML(CHECKOUT_TITLE)}</h2>
          <div class="premium-finale-checkout-grid">
            <div class="premium-finale-card-visual">
              <img
                src="${XERECARD_IMAGE}"
                alt="${escapeHTML(XERECARD_IMAGE_ALT)}"
                loading="lazy"
              />
              <dl class="premium-finale-card-details">
                <div><dt>${escapeHTML(CARD_HOLDER_LABEL)}</dt><dd>${escapeHTML(CARD_HOLDER)}</dd></div>
                <div><dt>${escapeHTML(CARD_NAME_LABEL)}</dt><dd>${escapeHTML(CARD_NAME)}</dd></div>
                <div><dt>${escapeHTML(CARD_STATUS_LABEL)}</dt><dd>${escapeHTML(CARD_STATUS)}</dd></div>
                <div><dt>${escapeHTML(CARD_LIMIT_LABEL)}</dt><dd>${escapeHTML(CARD_LIMIT)}</dd></div>
              </dl>
            </div>
            <div class="premium-finale-checkout-info">
              <h3>${escapeHTML(BENEFITS_TITLE)}</h3>
              <ul class="premium-finale-benefits">
                ${CARD_BENEFITS.map((benefit) => `<li>${escapeHTML(BENEFIT_PREFIX)} ${escapeHTML(benefit)}</li>`).join('')}
              </ul>
              <fieldset class="premium-payment-methods">
                <legend>${escapeHTML(PAYMENT_TITLE)}</legend>
                ${PAYMENT_METHODS.map((method, index) => `
                  <label class="${index === 0 ? 'selected' : ''}">
                    <input type="radio" name="premium-payment" ${index === 0 ? 'checked' : ''} />
                    <span>${escapeHTML(method)}</span>
                  </label>
                `).join('')}
              </fieldset>
              <div class="premium-finale-actions">
                <button class="final-btn premium-finale-approve" type="button" data-premium-approve>${escapeHTML(APPROVE_BUTTON_LABEL)}</button>
                <button class="premium-finale-return" type="button" data-premium-close>${escapeHTML(RETURN_BUTTON_LABEL)}</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="premium-finale-overlay" data-premium-finale-overlay aria-hidden="true">
        <canvas data-premium-finale-canvas role="img" aria-label="${escapeHTML(FINALE_CANVAS_LABEL)}">
          ${escapeHTML(FINALE_CANVAS_FALLBACK)}
        </canvas>
        <div class="premium-finale-message" data-premium-final-message>
          <p>${escapeHTML(FINAL_MESSAGE_EN).replaceAll('\n', '<br />')}</p>
          <small>${escapeHTML(FINAL_MESSAGE_PT)}</small>
        </div>
      </div>
    `;

    return wrapper;
  }

  function bindPremiumEvents() {
    buyButton.addEventListener('click', openCheckoutModal);
    modal.addEventListener('click', (event) => {
      if (event.target.matches('[data-premium-close]')) closeCheckoutModal();
    });
    modal.addEventListener('keydown', handleModalKeydown);
    section.querySelector('[data-premium-approve]').addEventListener('click', () => {
      closeCheckoutModal({ restoreFocus: true });
      triggerApproval();
    });
  }

  function openCheckoutModal() {
    lastFocusedElement = document.activeElement;

    if (window.PortalModal && typeof window.PortalModal.open === 'function') {
      window.PortalModal.open(modal);
    } else if (window.AppModal && typeof window.AppModal.open === 'function') {
      window.AppModal.open(modal);
    } else {
      modal.classList.add('active');
      modal.setAttribute('aria-hidden', 'false');
    }

    document.body.style.overflow = 'hidden';
    focusFirstModalControl();
  }

  function closeCheckoutModal(options = {}) {
    const { restoreFocus = true } = options;

    if (window.PortalModal && typeof window.PortalModal.close === 'function') {
      window.PortalModal.close(modal);
    } else if (window.AppModal && typeof window.AppModal.close === 'function') {
      window.AppModal.close(modal);
    } else {
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
    }

    document.body.style.overflow = '';
    if (restoreFocus && lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
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

    const focusable = getFocusableElements(modalPanel);
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

  function focusFirstModalControl() {
    const focusable = getFocusableElements(modalPanel);
    (focusable[0] || modalPanel).focus();
  }

  function getFocusableElements(container) {
    return Array.from(container.querySelectorAll(focusableSelector))
      .filter((element) => element.offsetParent !== null || element === document.activeElement);
  }

  function triggerApproval() {
    approvalCard.hidden = false;
    approvalCard.classList.add('visible');
    approvalCard.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'center' });
    window.setTimeout(triggerGrandFinale, 1500);
  }

  function triggerGrandFinale() {
    if (finaleStarted) return;
    finaleStarted = true;

    finaleOverlay.classList.add('active');
    finaleOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    if (prefersReducedMotion()) {
      showFinalMessage();
      return;
    }

    if (window.PremiumParticles && typeof window.PremiumParticles.playFinale === 'function') {
      window.PremiumParticles.playFinale(finaleCanvas, showFinalMessage);
      return;
    }

    if (window.HeartParticles && typeof window.HeartParticles.playFinale === 'function') {
      window.HeartParticles.playFinale(finaleCanvas, showFinalMessage);
      return;
    }

    playCanvasFinale(finaleCanvas, showFinalMessage);
  }

  function showFinalMessage() {
    finalMessage.classList.add('visible');
  }

  function playCanvasFinale(canvas, onComplete) {
    const ctx = canvas.getContext('2d');
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
    let frame = 0;
    let startTime = 0;

    function resize() {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * ratio);
      canvas.height = Math.floor(height * ratio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
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
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = 'rgba(10, 2, 6, 0.32)';
      ctx.fillRect(0, 0, width, height);
      ctx.globalCompositeOperation = 'lighter';

      particles.forEach((particle) => {
        const point = getParticlePoint(particle, elapsed, timings);
        const fade = elapsed > timings.explosionEnd ? Math.max(0, 1 - ((elapsed - timings.explosionEnd) / 500)) : 1;
        ctx.globalAlpha = particle.alpha * fade;
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(point.x, point.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      });

      drawHelloKittyGuide(ctx, width, height, elapsed, timings);
      drawGoldenBurst(ctx, width, height, elapsed, timings);
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = 'source-over';

      if (elapsed < timings.done) {
        frame = window.requestAnimationFrame(draw);
      } else {
        window.cancelAnimationFrame(frame);
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
    frame = window.requestAnimationFrame(draw);
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

  function drawHelloKittyGuide(ctx, width, height, elapsed, timings) {
    if (elapsed < timings.dissolveEnd) return;
    const alpha = Math.min(0.18, (elapsed - timings.dissolveEnd) / 1000 * 0.18);
    const scale = Math.min(width, height) / 420;
    const centerX = width / 2;
    const centerY = height / 2;

    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.fillStyle = '#FFF0F3';
    ctx.beginPath();
    ctx.ellipse(centerX, centerY + 10 * scale, 145 * scale, 112 * scale, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(centerX - 118 * scale, centerY - 54 * scale);
    ctx.lineTo(centerX - 82 * scale, centerY - 160 * scale);
    ctx.lineTo(centerX - 36 * scale, centerY - 76 * scale);
    ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(centerX + 118 * scale, centerY - 54 * scale);
    ctx.lineTo(centerX + 82 * scale, centerY - 160 * scale);
    ctx.lineTo(centerX + 36 * scale, centerY - 76 * scale);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = '#D4AF37';
    ctx.beginPath();
    ctx.ellipse(centerX + 86 * scale, centerY - 78 * scale, 34 * scale, 24 * scale, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  function drawGoldenBurst(ctx, width, height, elapsed, timings) {
    if (elapsed < timings.kittyEnd || elapsed > timings.explosionEnd) return;
    const progress = (elapsed - timings.kittyEnd) / (timings.explosionEnd - timings.kittyEnd);
    const eased = easeOutCubic(progress);

    ctx.save();
    ctx.translate(width / 2, height / 2);
    ctx.strokeStyle = '#D4AF37';
    ctx.lineWidth = 2;
    ctx.globalAlpha = 1 - progress;

    for (let index = 0; index < 32; index += 1) {
      const angle = (Math.PI * 2 * index) / 32;
      const inner = 42 * eased;
      const outer = (84 + (index % 4) * 12) * eased;
      ctx.beginPath();
      ctx.moveTo(Math.cos(angle) * inner, Math.sin(angle) * inner);
      ctx.lineTo(Math.cos(angle) * outer, Math.sin(angle) * outer);
      ctx.stroke();
    }

    ctx.restore();
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

  function scheduleNextLoveToast() {
    if (document.hidden) return;
    const delay = TOAST_INTERVAL_MIN + Math.floor(Math.random() * (TOAST_INTERVAL_MAX - TOAST_INTERVAL_MIN + 1));
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => {
      showLoveToast();
      scheduleNextLoveToast();
    }, delay);
  }

  function showLoveToast() {
    if (window.LoveToasts && typeof window.LoveToasts.show === 'function') {
      window.LoveToasts.show(randomToastMessage());
      return;
    }

    if (window.RomanticToasts && typeof window.RomanticToasts.show === 'function') {
      window.RomanticToasts.show(randomToastMessage());
      return;
    }

    const toast = document.getElementById('romantic-toast');
    if (!toast || toast.classList.contains('visible')) return;

    toast.textContent = randomToastMessage();
    toast.classList.add('visible');
    window.clearTimeout(toastHideTimer);
    toastHideTimer = window.setTimeout(() => {
      toast.classList.remove('visible');
    }, prefersReducedMotion() ? 3500 : 5200);
  }

  function randomToastMessage() {
    return LOVE_TOASTS[Math.floor(Math.random() * LOVE_TOASTS.length)];
  }

  function handleVisibilityChange() {
    if (document.hidden) {
      window.clearTimeout(toastTimer);
      return;
    }

    scheduleNextLoveToast();
  }

  function enableExistingMonkeyEyesIfAvailable() {
    if (prefersReducedMotion()) return;

    if (window.Macaquinhos && typeof window.Macaquinhos.enableEyeTracking === 'function') {
      window.Macaquinhos.enableEyeTracking({ intensity: 'subtle' });
    }
  }

  function syncExistingMusicEqualizerIfAvailable() {
    const audio = document.querySelector('audio');
    const widget = document.getElementById('music-widget');
    const equalizer = widget?.querySelector('.equalizer');
    if (!audio || !widget || !equalizer) return;

    function sync() {
      widget.classList.toggle('playing', !audio.paused && !prefersReducedMotion());
    }

    audio.addEventListener('play', sync);
    audio.addEventListener('pause', sync);
    audio.addEventListener('ended', sync);
    sync();
  }

  function injectPremiumStyles() {
    if (document.getElementById('premium-finale-styles')) return;

    const style = document.createElement('style');
    style.id = 'premium-finale-styles';
    style.textContent = `
      .premium-finale-section {
        position: relative;
        overflow: hidden;
        background: radial-gradient(circle at 15% 20%, rgba(212, 175, 55, 0.16), transparent 28%),
          radial-gradient(circle at 85% 10%, rgba(255, 182, 193, 0.13), transparent 30%),
          linear-gradient(180deg, rgba(61, 12, 17, 0.42), rgba(10, 2, 6, 0.9));
      }

      .premium-finale-wrap {
        position: relative;
        z-index: 1;
      }

      .premium-finale-card,
      .premium-finale-modal-card,
      .premium-finale-approval,
      .premium-finale-message {
        border: 1px solid rgba(212, 175, 55, 0.3);
        background: rgba(255, 255, 255, 0.08);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        box-shadow: 0 0 60px rgba(212, 175, 55, 0.15), 0 20px 40px rgba(0, 0, 0, 0.3);
      }

      .premium-finale-card {
        display: grid;
        grid-template-columns: minmax(0, 0.95fr) minmax(0, 1.05fr);
        align-items: center;
        gap: clamp(1.5rem, 5vw, 4rem);
        padding: clamp(1.1rem, 4vw, 3rem);
        border-radius: 24px;
      }

      .premium-finale-media {
        position: relative;
        isolation: isolate;
      }

      .premium-finale-media::before {
        content: '';
        position: absolute;
        inset: 8%;
        z-index: -1;
        border-radius: 24px;
        background: radial-gradient(circle, rgba(212, 175, 55, 0.4), rgba(255, 182, 193, 0.08) 56%, transparent 72%);
        filter: blur(28px);
      }

      .premium-finale-media img,
      .premium-finale-card-visual img {
        display: block;
        max-width: 100%;
        height: auto;
        border-radius: 24px;
      }

      .premium-finale-media img {
        width: min(100%, 28rem);
        margin: 0 auto;
        box-shadow: 0 1.4rem 3.5rem rgba(0, 0, 0, 0.36), 0 0 2.2rem rgba(212, 175, 55, 0.28);
        transition: transform 0.3s ease, box-shadow 0.3s ease;
      }

      .premium-finale-media img:hover {
        transform: translateY(-0.35rem) scale(1.02);
        box-shadow: 0 1.8rem 4rem rgba(0, 0, 0, 0.4), 0 0 3rem rgba(212, 175, 55, 0.42);
      }

      .premium-finale-info h2,
      .premium-finale-modal-card h2,
      .premium-finale-approval h3 {
        margin: 0;
        color: #fff;
        font-family: 'Dancing Script', cursive;
        font-size: clamp(2.4rem, 6vw, 4.6rem);
        line-height: 0.95;
      }

      .premium-finale-eyebrow {
        margin: 0 0 0.7rem;
        color: var(--dourado);
        font-size: 0.78rem;
        font-weight: 700;
        letter-spacing: 0.18em;
        text-transform: uppercase;
      }

      .premium-finale-intro,
      .premium-finale-subtitle {
        color: rgba(255, 240, 243, 0.9);
        font-size: clamp(1rem, 2vw, 1.25rem);
        line-height: 1.7;
      }

      .premium-finale-intro {
        margin: 0 0 0.85rem;
      }

      .premium-finale-subtitle {
        margin: 1.2rem 0 0;
      }

      .premium-finale-rating {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 0.6rem;
        margin: 1.2rem 0;
        color: var(--dourado);
        font-size: 1.45rem;
        letter-spacing: 0.16em;
        text-shadow: 0 0 18px rgba(212, 175, 55, 0.45);
      }

      .premium-finale-rating span:last-child {
        color: rgba(255, 255, 255, 0.6);
        font-size: 0.9rem;
        letter-spacing: 0;
        text-shadow: none;
      }

      .premium-finale-traits,
      .premium-finale-benefits {
        display: flex;
        flex-wrap: wrap;
        gap: 0.7rem;
        margin: 0;
        padding: 0;
        list-style: none;
      }

      .premium-finale-traits li,
      .premium-finale-benefits li,
      .premium-payment-methods label {
        border: 1px solid rgba(212, 175, 55, 0.32);
        border-radius: 999px;
        background: rgba(255, 255, 255, 0.08);
        color: #fff;
        padding: 0.55rem 0.85rem;
      }

      .premium-finale-price {
        margin: 1.6rem 0;
        color: var(--dourado);
        font-family: 'Dancing Script', cursive;
        font-size: clamp(2rem, 4vw, 3rem);
        font-weight: 700;
      }

      .premium-finale-buy,
      .premium-finale-approve,
      .premium-finale-return,
      .premium-finale-close {
        min-width: 44px;
        min-height: 44px;
      }

      .premium-finale-buy,
      .premium-finale-approve {
        background: linear-gradient(135deg, var(--dourado), #f0c040);
        color: #1a0a00;
      }

      .premium-finale-buy:hover,
      .premium-finale-approve:hover {
        transform: scale(1.05);
        box-shadow: 0 0 34px rgba(212, 175, 55, 0.48);
      }

      .premium-finale-modal,
      .premium-finale-overlay {
        position: fixed;
        inset: 0;
        z-index: 10000;
      }

      .premium-finale-modal {
        display: none;
        align-items: center;
        justify-content: center;
        padding: 1rem;
      }

      .premium-finale-modal.active {
        display: flex;
      }

      .premium-finale-backdrop {
        position: absolute;
        inset: 0;
        background: rgba(6, 1, 4, 0.78);
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
      }

      .premium-finale-modal-card {
        position: relative;
        z-index: 1;
        width: min(58rem, 100%);
        max-height: min(92vh, 52rem);
        overflow: auto;
        border-radius: 24px;
        padding: clamp(1rem, 3vw, 2rem);
      }

      .premium-finale-close {
        position: absolute;
        top: 0.75rem;
        right: 0.75rem;
        border: 0;
        border-radius: 999px;
        background: rgba(255, 240, 243, 0.12);
        color: #fff;
        cursor: pointer;
        font-size: 1.6rem;
      }

      .premium-finale-checkout-grid {
        display: grid;
        grid-template-columns: minmax(14rem, 0.78fr) minmax(0, 1fr);
        gap: clamp(1rem, 3vw, 2rem);
        margin-top: 1.2rem;
      }

      .premium-finale-card-details,
      .premium-finale-approval dl {
        display: grid;
        gap: 0.75rem;
        margin: 1rem 0 0;
      }

      .premium-finale-card-details div,
      .premium-finale-approval dl div {
        display: grid;
        grid-template-columns: minmax(7rem, 0.55fr) 1fr;
        gap: 0.8rem;
        border-bottom: 1px solid rgba(255, 240, 243, 0.12);
        padding-bottom: 0.65rem;
      }

      .premium-finale-card-details dt,
      .premium-finale-approval dt,
      .premium-finale-checkout-info h3,
      .premium-payment-methods legend {
        color: var(--dourado);
        font-weight: 800;
      }

      .premium-finale-card-details dd,
      .premium-finale-approval dd {
        margin: 0;
        color: #fff;
      }

      .premium-finale-benefits {
        display: grid;
        margin-bottom: 1.25rem;
      }

      .premium-payment-methods {
        display: grid;
        gap: 0.7rem;
        margin: 0;
        padding: 0;
        border: 0;
      }

      .premium-payment-methods label {
        display: flex;
        align-items: center;
        gap: 0.55rem;
        min-height: 44px;
      }

      .premium-payment-methods label.selected {
        border-color: var(--dourado);
        box-shadow: 0 0 20px rgba(212, 175, 55, 0.2);
      }

      .premium-finale-actions {
        display: flex;
        flex-wrap: wrap;
        gap: 0.8rem;
        margin-top: 1.25rem;
      }

      .premium-finale-return {
        border: 1px solid rgba(255, 240, 243, 0.22);
        border-radius: 999px;
        background: rgba(255, 255, 255, 0.08);
        color: #fff;
        cursor: pointer;
        padding: 0.85rem 1.25rem;
      }

      .premium-finale-approval {
        margin: 1.5rem auto 0;
        padding: clamp(1.2rem, 4vw, 2rem);
        border-radius: 24px;
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.7s ease, transform 0.7s ease;
      }

      .premium-finale-approval.visible {
        opacity: 1;
        transform: translateY(0);
      }

      .premium-finale-approval p {
        color: #fff;
        font-size: clamp(1rem, 2.5vw, 1.25rem);
        line-height: 1.6;
      }

      .premium-finale-overlay {
        display: none;
        place-items: center;
        overflow: hidden;
        background: radial-gradient(circle at center, rgba(90, 18, 32, 0.92), rgba(0, 0, 0, 0.98));
      }

      .premium-finale-overlay.active {
        display: grid;
      }

      .premium-finale-overlay canvas {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
      }

      .premium-finale-message {
        position: relative;
        z-index: 1;
        width: min(46rem, calc(100vw - 2rem));
        border-radius: 24px;
        padding: clamp(1.4rem, 4vw, 2.4rem);
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 1.2s ease, transform 1.2s ease;
        text-align: center;
      }

      .premium-finale-message.visible {
        opacity: 1;
        transform: translateY(0);
      }

      .premium-finale-message p {
        margin: 0;
        color: #fff;
        font-family: 'Dancing Script', cursive;
        font-size: clamp(1.3rem, 4vw, 2rem);
        line-height: 1.35;
      }

      .premium-finale-message small {
        display: block;
        margin-top: 1.1rem;
        color: rgba(255, 255, 255, 0.8);
        font-family: 'Dancing Script', cursive;
        font-size: clamp(1.1rem, 3vw, 1.65rem);
        line-height: 1.35;
        transition: opacity 1.2s ease 0.6s, transform 1.2s ease 0.6s;
      }

      @media (max-width: 820px) {
        .premium-finale-card,
        .premium-finale-checkout-grid {
          grid-template-columns: 1fr;
        }

        .premium-finale-info,
        .premium-finale-modal-card h2 {
          text-align: center;
        }

        .premium-finale-traits,
        .premium-finale-rating,
        .premium-finale-actions {
          justify-content: center;
        }

        .premium-finale-card-details div,
        .premium-finale-approval dl div {
          grid-template-columns: 1fr;
          gap: 0.25rem;
        }
      }

      @media (max-width: 520px) {
        .premium-finale-card,
        .premium-finale-modal-card,
        .premium-finale-approval,
        .premium-finale-message {
          border-radius: 18px;
        }

        .premium-finale-actions > button {
          width: 100%;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .premium-finale-media img,
        .premium-finale-buy,
        .premium-finale-approve,
        .premium-finale-approval,
        .premium-finale-message,
        .premium-finale-message small {
          transition: none !important;
        }

        .premium-finale-media img:hover,
        .premium-finale-buy:hover,
        .premium-finale-approve:hover {
          transform: none;
        }
      }
    `;
    document.head.appendChild(style);
  }

  document.addEventListener('DOMContentLoaded', initPremiumFinale);
  document.addEventListener('visibilitychange', handleVisibilityChange);
  window.addEventListener('beforeunload', () => {
    window.clearTimeout(toastTimer);
    window.clearTimeout(toastHideTimer);
  });
})();

/* HOTFIX: force Buy Now / Comprar Agora to open the static checkout modal with payment methods */
(() => {
  const modal = document.getElementById('premium-checkout-modal');

  if (!modal) return;

  let lastFocusedElement = null;

  const focusableSelector = [
    'button',
    '[href]',
    'input',
    'select',
    'textarea',
    '[tabindex]:not([tabindex="-1"])'
  ].join(',');

  function getFocusableElements() {
    return Array.from(modal.querySelectorAll(focusableSelector))
      .filter((el) => !el.disabled && el.offsetParent !== null);
  }

  function openStaticPremiumModal() {
    lastFocusedElement = document.activeElement;

    modal.style.display = 'flex';
    modal.classList.add('is-open', 'show', 'active');
    modal.setAttribute('aria-hidden', 'false');
    modal.setAttribute('aria-modal', 'true');

    document.body.style.overflow = 'hidden';

    const firstFocusable = getFocusableElements()[0];
    if (firstFocusable) firstFocusable.focus();
  }

  function closeStaticPremiumModal() {
    modal.style.display = 'none';
    modal.classList.remove('is-open', 'show', 'active');
    modal.setAttribute('aria-hidden', 'true');
    modal.removeAttribute('aria-modal');

    document.body.style.overflow = '';

    if (lastFocusedElement) lastFocusedElement.focus();
  }

  document.addEventListener(
    'click',
    (event) => {
      const buyButton = event.target.closest(
        '.premium-finale-buy, #premium-buy-now, [data-premium-buy], [data-premium-open]'
      );

      if (buyButton) {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
        openStaticPremiumModal();
        return;
      }

      const closeButton = event.target.closest('[data-premium-close]');

      if (closeButton || event.target === modal) {
        event.preventDefault();
        closeStaticPremiumModal();
      }
    },
    true
  );

  document.addEventListener('keydown', (event) => {
    if (modal.style.display !== 'flex') return;

    if (event.key === 'Escape') {
      closeStaticPremiumModal();
      return;
    }

    if (event.key !== 'Tab') return;

    const focusableElements = getFocusableElements();
    if (!focusableElements.length) return;

    const first = focusableElements[0];
    const last = focusableElements[focusableElements.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    }

    if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });
})();

/* HOTFIX 2: open the real checkout modal when clicking Buy Now / Comprar Agora */
(() => {
  const modal = document.getElementById('premium-checkout-modal');

  if (!modal) {
    console.warn('[Premium Finale] Modal #premium-checkout-modal não encontrado.');
    return;
  }

  let lastFocus = null;

  function openRealCheckoutModal() {
    lastFocus = document.activeElement;

    modal.style.display = 'flex';
    modal.style.position = 'fixed';
    modal.style.inset = '0';
    modal.style.zIndex = '999999';
    modal.style.alignItems = 'center';
    modal.style.justifyContent = 'center';
    modal.style.padding = '1rem';
    modal.style.background = 'rgba(0, 0, 0, 0.72)';

    modal.classList.add('is-open', 'active', 'show');
    modal.setAttribute('aria-hidden', 'false');
    modal.setAttribute('aria-modal', 'true');

    document.body.style.overflow = 'hidden';

    const panel = modal.querySelector('.premium-modal-panel, .premium-checkout-content, .premium-modal-card');
    if (panel) {
      panel.style.width = 'min(920px, 96vw)';
      panel.style.maxHeight = '90vh';
      panel.style.overflowY = 'auto';
    }

    const payments = modal.querySelector('.premium-payment-methods');
    if (payments) {
      payments.style.display = 'grid';
      payments.style.visibility = 'visible';
      payments.style.opacity = '1';
      payments.style.width = '100%';
      payments.style.height = 'auto';
    }

    const firstInput = modal.querySelector('input, button, [href], [tabindex]:not([tabindex="-1"])');
    if (firstInput) firstInput.focus();
  }

  function closeRealCheckoutModal() {
    modal.style.display = 'none';
    modal.classList.remove('is-open', 'active', 'show');
    modal.setAttribute('aria-hidden', 'true');
    modal.removeAttribute('aria-modal');
    document.body.style.overflow = '';

    if (lastFocus) lastFocus.focus();
  }

  document.addEventListener(
    'click',
    (event) => {
      const clickable = event.target.closest('button, a');

      if (!clickable) return;

      const text = clickable.textContent.trim().toLowerCase();

      if (
        text.includes('buy now') ||
        text.includes('comprar agora') ||
        text.includes('🛒')
      ) {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
        openRealCheckoutModal();
        return;
      }

      if (
        clickable.matches('[data-premium-close]') ||
        text === 'voltar' ||
        text === 'return' ||
        text === '×'
      ) {
        event.preventDefault();
        closeRealCheckoutModal();
      }
    },
    true
  );

  modal.addEventListener('click', (event) => {
    if (event.target === modal) closeRealCheckoutModal();
  });

  document.addEventListener('keydown', (event) => {
    if (modal.style.display !== 'flex') return;

    if (event.key === 'Escape') {
      closeRealCheckoutModal();
    }
  });
})();

/* HOTFIX 2: open the real checkout modal when clicking Buy Now / Comprar Agora */
(() => {
  const modal = document.getElementById('premium-checkout-modal');

  if (!modal) {
    console.warn('[Premium Finale] Modal #premium-checkout-modal não encontrado.');
    return;
  }

  let lastFocus = null;

  function openRealCheckoutModal() {
    lastFocus = document.activeElement;

    modal.style.display = 'flex';
    modal.style.position = 'fixed';
    modal.style.inset = '0';
    modal.style.zIndex = '999999';
    modal.style.alignItems = 'center';
    modal.style.justifyContent = 'center';
    modal.style.padding = '1rem';
    modal.style.background = 'rgba(0, 0, 0, 0.72)';

    modal.classList.add('is-open', 'active', 'show');
    modal.setAttribute('aria-hidden', 'false');
    modal.setAttribute('aria-modal', 'true');

    document.body.style.overflow = 'hidden';

    const panel = modal.querySelector('.premium-modal-panel, .premium-checkout-content, .premium-modal-card');
    if (panel) {
      panel.style.width = 'min(920px, 96vw)';
      panel.style.maxHeight = '90vh';
      panel.style.overflowY = 'auto';
    }

    const payments = modal.querySelector('.premium-payment-methods');
    if (payments) {
      payments.style.display = 'grid';
      payments.style.visibility = 'visible';
      payments.style.opacity = '1';
      payments.style.width = '100%';
      payments.style.height = 'auto';
    }

    const firstInput = modal.querySelector('input, button, [href], [tabindex]:not([tabindex="-1"])');
    if (firstInput) firstInput.focus();
  }

  function closeRealCheckoutModal() {
    modal.style.display = 'none';
    modal.classList.remove('is-open', 'active', 'show');
    modal.setAttribute('aria-hidden', 'true');
    modal.removeAttribute('aria-modal');
    document.body.style.overflow = '';

    if (lastFocus) lastFocus.focus();
  }

  document.addEventListener(
    'click',
    (event) => {
      const clickable = event.target.closest('button, a');

      if (!clickable) return;

      const text = clickable.textContent.trim().toLowerCase();

      if (
        text.includes('buy now') ||
        text.includes('comprar agora') ||
        text.includes('🛒')
      ) {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
        openRealCheckoutModal();
        return;
      }

      if (
        clickable.matches('[data-premium-close]') ||
        text === 'voltar' ||
        text === 'return' ||
        text === '×'
      ) {
        event.preventDefault();
        closeRealCheckoutModal();
      }
    },
    true
  );

  modal.addEventListener('click', (event) => {
    if (event.target === modal) closeRealCheckoutModal();
  });

  document.addEventListener('keydown', (event) => {
    if (modal.style.display !== 'flex') return;

    if (event.key === 'Escape') {
      closeRealCheckoutModal();
    }
  });
})();
