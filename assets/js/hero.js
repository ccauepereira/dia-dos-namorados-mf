// === HERO ===
function initHero() {
    const inputNome = document.getElementById('input-nome');
    const hero = document.getElementById('hero');
    const heroTitle = document.getElementById('hero-title');
    const dynamicGreeting = document.getElementById('dynamic-greeting');
    const openHeartButton = document.getElementById('open-heart-btn');
    const infiniteLoveButton = document.getElementById('infinite-love-btn');
    const randomReason = document.getElementById('random-reason');
    const musicWidget = document.getElementById('music-widget');
    const musicToggle = document.getElementById('music-toggle');
    const romanticToast = document.getElementById('romantic-toast');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let heroStarted = false;
    let lastReasonIndex = -1;
    let toastTimer;
    let audioContext;
    let musicNodes;

    function updateHeroCopy() {
      const rawName = inputNome.value.trim();
      const displayName = rawName && rawName.length <= 36 ? rawName : 'Maria Fernanda';
      heroTitle.textContent = `Feliz Dia dos Namorados, ${displayName} 💕`;

      const hour = new Date().getHours();
      if (hour >= 5 && hour <= 11) {
        dynamicGreeting.textContent = '☀️ Bom dia, minha melhor namorada do mundo.';
      } else if (hour >= 12 && hour <= 17) {
        dynamicGreeting.textContent = '🌸 Boa tarde, meu macaquinho branquinho.';
      } else {
        dynamicGreeting.textContent = '🌙 Boa noite, meu amor.';
      }
    }

    function startHeroExperience() {
      if (heroStarted) return;
      heroStarted = true;
      updateHeroCopy();
      hero.classList.add('hero-revealed');
      startHeartParticles(() => hero.classList.add('monkeys-visible'));
      startRomanticToasts();
    }

    function startHeartParticles(onCharactersReveal) {
      const canvas = document.getElementById('heart-particles-canvas');
      const context = canvas.getContext('2d');
      const colors = ['#FFB6C1', '#C9748A', '#D4AF37', '#FFF0F3', '#FFFFFF'];
      const particles = [];
      let width = 0;
      let height = 0;
      let density = 0;
      let startTime = 0;
      let revealed = false;
      let pulseCounted = false;

      function resize() {
        const ratio = Math.min(window.devicePixelRatio || 1, 2);
        width = canvas.clientWidth || window.innerWidth;
        height = canvas.clientHeight || window.innerHeight;
        canvas.width = width * ratio;
        canvas.height = height * ratio;
        context.setTransform(ratio, 0, 0, ratio, 0, 0);
        density = Math.min(680, Math.max(190, Math.floor((width * height) / (reducedMotion ? 7600 : 3200))));
      }

      function heartPoint(index, total) {
        const t = (Math.PI * 2 * index) / total;
        const x = 16 * Math.pow(Math.sin(t), 3);
        const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
        const scale = Math.min(width, height) / 36;
        const centerGap = Math.abs(x) < 4.6 && y > -3 && y < 6;
        const gapShift = centerGap ? (x < 0 ? -3.2 : 3.2) : 0;
        return {
          x: width / 2 + (x + gapShift) * scale,
          y: height * 0.43 + y * scale,
        };
      }

      function createParticles() {
        particles.length = 0;
        for (let i = 0; i < density; i++) {
          const target = heartPoint(i, density);
          particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            targetX: target.x,
            targetY: target.y,
            size: 1 + Math.random() * 3,
            color: colors[Math.floor(Math.random() * colors.length)],
            alpha: 0.38 + Math.random() * 0.58,
            delay: Math.random() * 700,
            dustSpeed: 0.22 + Math.random() * 0.75,
            drift: -0.35 + Math.random() * 0.7,
          });
        }
      }

      function draw(timestamp) {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        context.clearRect(0, 0, width, height);
        context.globalCompositeOperation = 'lighter';

        const formationDuration = reducedMotion ? 450 : 4200;
        const pulseStart = formationDuration + 250;
        const pulseDuration = reducedMotion ? 300 : 2100;
        const dustStart = pulseStart + pulseDuration;
        const formationProgress = Math.min(1, Math.max(0, elapsed / formationDuration));
        const eased = 1 - Math.pow(1 - formationProgress, 3);
        let pulseScale = 1;

        if (elapsed > pulseStart && elapsed < dustStart) {
          const pulseProgress = (elapsed - pulseStart) / pulseDuration;
          pulseScale = 1 + Math.sin(pulseProgress * Math.PI * 6) * 0.045;
        }

        if (!revealed && elapsed > formationDuration * 0.86) {
          revealed = true;
          onCharactersReveal();
        }

        if (!pulseCounted && elapsed > dustStart) {
          pulseCounted = true;
        }

        particles.forEach((particle) => {
          const x = particle.x + (particle.targetX - particle.x) * Math.max(0, eased - particle.delay / 5000);
          const y = particle.y + (particle.targetY - particle.y) * Math.max(0, eased - particle.delay / 5000);
          let drawX = width / 2 + (x - width / 2) * pulseScale;
          let drawY = height * 0.43 + (y - height * 0.43) * pulseScale;
          let alpha = particle.alpha;

          if (pulseCounted) {
            const dustAge = elapsed - dustStart;
            drawY -= dustAge * particle.dustSpeed * 0.06;
            drawX += Math.sin((dustAge + particle.delay) / 280) * 3 + particle.drift * dustAge * 0.025;
            alpha *= Math.max(0, 1 - dustAge / 5200);
          }

          context.globalAlpha = alpha;
          context.fillStyle = particle.color;
          context.beginPath();
          context.arc(drawX, drawY, particle.size, 0, Math.PI * 2);
          context.fill();
        });

        context.globalAlpha = 1;
        if (elapsed < dustStart + 5200) {
          window.requestAnimationFrame(draw);
        }
      }

      resize();
      createParticles();
      window.addEventListener('resize', () => {
        resize();
        createParticles();
      }, { passive: true });
      window.requestAnimationFrame(draw);
    }

    function addRipple(event) {
      const button = event.currentTarget;
      const rect = button.getBoundingClientRect();
      const ripple = document.createElement('span');
      const size = Math.max(rect.width, rect.height);
      ripple.className = 'ripple';
      ripple.style.width = `${size}px`;
      ripple.style.height = `${size}px`;
      ripple.style.left = `${event.clientX - rect.left - size / 2}px`;
      ripple.style.top = `${event.clientY - rect.top - size / 2}px`;
      button.appendChild(ripple);
      window.setTimeout(() => ripple.remove(), 700);
    }

    const loveReasons = [
      '[MOTIVO_1]',
      '[MOTIVO_2]',
      '[MOTIVO_3]',
      '[MOTIVO_4]',
      '[MOTIVO_5]',
      '[MOTIVO_6]',
      '[MOTIVO_7]',
      '[MOTIVO_8]',
      '[MOTIVO_9]',
      '[MOTIVO_10]',
      '[MOTIVO_11]',
      '[MOTIVO_12]',
      '[MOTIVO_13]',
      '[MOTIVO_14]',
      '[MOTIVO_15]',
      '[MOTIVO_16]',
      '[MOTIVO_17]',
      '[MOTIVO_18]',
      '[MOTIVO_19]',
      '[MOTIVO_20]',
      '[MOTIVO_21]',
      '[MOTIVO_22]',
      '[MOTIVO_23]',
      '[MOTIVO_24]',
      '[MOTIVO_25]',
      '[MOTIVO_26]',
      '[MOTIVO_27]',
      '[MOTIVO_28]',
      '[MOTIVO_29]',
      '[MOTIVO_30]',
      '[MOTIVO_31]',
      '[MOTIVO_32]',
      '[MOTIVO_33]',
      '[MOTIVO_34]',
      '[MOTIVO_35]',
      '[MOTIVO_36]',
      '[MOTIVO_37]',
      '[MOTIVO_38]',
      '[MOTIVO_39]',
      '[MOTIVO_40]',
      '[MOTIVO_41]',
      '[MOTIVO_42]',
      '[MOTIVO_43]',
      '[MOTIVO_44]',
      '[MOTIVO_45]',
      '[MOTIVO_46]',
      '[MOTIVO_47]',
      '[MOTIVO_48]',
      '[MOTIVO_49]',
      '[MOTIVO_50]'
    ];

    function showRandomReason() {
      let nextIndex = Math.floor(Math.random() * loveReasons.length);
      if (nextIndex === lastReasonIndex) nextIndex = (nextIndex + 1) % loveReasons.length;
      lastReasonIndex = nextIndex;
      randomReason.textContent = loveReasons[nextIndex];
    }

    function startRomanticToasts() {
      const messages = [
        '🚨 Alerta do sistema: nível de fofura excedido.',
        '❤️ O macaquinho preto acabou de pensar em você.',
        '💌 Atualização: você continua sendo o amor da minha vida.',
        '🐒 Status: completamente apaixonado.'
      ];
      let index = 0;

      function showToast() {
        romanticToast.textContent = messages[index % messages.length];
        romanticToast.classList.add('visible');
        index += 1;
        window.setTimeout(() => romanticToast.classList.remove('visible'), 5200);
      }

      window.clearInterval(toastTimer);
      toastTimer = window.setInterval(showToast, 30000);
    }

    function followCursor(clientX, clientY, softness) {
      document.querySelectorAll('.hero-pupil').forEach((pupil) => {
        const svg = pupil.ownerSVGElement;
        const rect = svg.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height * 0.45;
        const dx = Math.max(-1, Math.min(1, (clientX - centerX) / rect.width));
        const dy = Math.max(-1, Math.min(1, (clientY - centerY) / rect.height));
        const originX = Number(pupil.dataset.originX);
        const originY = Number(pupil.dataset.originY);
        pupil.setAttribute('cx', originX + dx * softness);
        pupil.setAttribute('cy', originY + dy * softness);
      });
    }

    function createMusic() {
      if (!audioContext) audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const master = audioContext.createGain();
      const filter = audioContext.createBiquadFilter();
      const oscA = audioContext.createOscillator();
      const oscB = audioContext.createOscillator();
      master.gain.value = 0.035;
      filter.type = 'lowpass';
      filter.frequency.value = 920;
      oscA.type = 'sine';
      oscB.type = 'triangle';
      oscA.frequency.value = 261.63;
      oscB.frequency.value = 392;
      oscA.connect(filter);
      oscB.connect(filter);
      filter.connect(master);
      master.connect(audioContext.destination);
      oscA.start();
      oscB.start();
      musicNodes = { master, oscA, oscB };
    }

    function stopMusic() {
      if (!musicNodes) return;
      musicNodes.master.gain.setTargetAtTime(0, audioContext.currentTime, 0.05);
      window.setTimeout(() => {
        musicNodes.oscA.stop();
        musicNodes.oscB.stop();
        musicNodes = null;
      }, 180);
    }

    function toggleMusic() {
      if (musicNodes) {
        stopMusic();
        musicWidget.classList.remove('playing');
        musicToggle.textContent = '🔇';
        musicToggle.setAttribute('aria-pressed', 'false');
        musicToggle.setAttribute('aria-label', 'Ligar música');
        return;
      }
      createMusic();
      if (audioContext.state === 'suspended') audioContext.resume();
      musicWidget.classList.add('playing');
      musicToggle.textContent = '🎵';
      musicToggle.setAttribute('aria-pressed', 'true');
      musicToggle.setAttribute('aria-label', 'Desligar música');
    }

    openHeartButton.addEventListener('click', (event) => {
      addRipple(event);
      document.getElementById('contador').scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
    });
    infiniteLoveButton.addEventListener('click', (event) => {
      addRipple(event);
      showRandomReason();
    });
    musicToggle.addEventListener('click', toggleMusic);
    window.addEventListener('pointermove', (event) => followCursor(event.clientX, event.clientY, 7), { passive: true });
    window.addEventListener('touchstart', (event) => {
      if (event.touches && event.touches[0]) followCursor(event.touches[0].clientX, event.touches[0].clientY, 3.5);
    }, { passive: true });
    updateHeroCopy();
    hero.setAttribute('aria-hidden', 'true');
    window.addEventListener('portal:copy-update', updateHeroCopy);
    window.addEventListener('portal:hero-start', startHeroExperience);
}
