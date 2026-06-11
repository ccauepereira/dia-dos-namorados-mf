// === PORTAL ===
function initPortal() {
    function normalizeText(value) {
      return value
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .replace(/&/g, ' e ')
        .replace(/0/g, 'o')
        .replace(/@/g, 'a')
        .replace(/1/g, 'i')
        .replace(/[3]/g, 'e')
        .replace(/[4]/g, 'a')
        .replace(/[5$]/g, 's')
        .replace(/[^a-z0-9\s]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
    }

    function compactText(value) {
      return normalizeText(value).replace(/\s/g, '');
    }

    const acceptedNames = ['Mf', 'Maria Fernanda', 'Bessa', 'Mfbessa', 'mf bessa', 'maria fernanda', 'mariafernanda'].map(normalizeText);
    const acceptedNameKeys = acceptedNames.map((name) => name.replace(/\s/g, ''));
    const acceptedPasswords = ['teamo meu amor', 'te amo meu amor', 'cutie cutie', 'agentefazamorportelepatia', 'a gente faz amor por telepatia', 'agostosona', 'a gostosona'].map(normalizeText);
    const acceptedPasswordKeys = acceptedPasswords.map((password) => password.replace(/\s/g, ''));
    const romanticHints = [
      'Dica 1: o nome pode ser apelido, nome completo ou sobrenome. O portal entende carinho com ou sem acento.',
      'Dica 2: a senha pode ser uma frase nossa, sem se preocupar com maiúsculas, espaços ou pontuação.',
      'Dica 3: tem uma senha que começa com “te amo” e termina chamando de “meu amor”.',
      'Dica 4: outra senha parece brincadeira fofa repetida duas vezes: cutie cutie.',
      'Última dica: se cansar, os macaquinhos vão completar tudo por você. 💌'
    ];
    const easterEggs = [
      { keys: ['macaco', 'macaquinho', 'monkey'], message: 'Easter egg: os macaquinhos ouviram você e mandaram um abraço apertado. 🐒💕', reaction: '🐒' },
      { keys: ['te amo', 'teamomeuamor', 'eu te amo'], message: 'Easter egg: “te amo” sempre abre um sorriso por aqui.', reaction: '🥹' },
      { keys: ['cutie', 'cutiecutie'], message: 'Easter egg: cutie detectada. Nível de fofura no máximo!', reaction: '✨' },
      { keys: ['telepatia', 'agentefazamorportelepatia'], message: 'Easter egg: conexão por telepatia ativada entre dois corações.', reaction: '🔮' },
      { keys: ['gostosa', 'agostosona'], message: 'Easter egg secreto: autoestima desbloqueada com sucesso. 😳', reaction: '💅' }
    ];

    const inputNome = document.getElementById('input-nome');
    const inputSenha = document.getElementById('input-senha');
    const feedbackMsg = document.getElementById('feedback-msg');
    const easterMsg = document.getElementById('easter-msg');
    const monkeyReaction = document.getElementById('monkey-reaction');
    const successOverlay = document.getElementById('success-overlay');
    const accessForm = document.getElementById('access-form');
    const portal = document.getElementById('portal');
    const hero = document.getElementById('hero');
    const hintDots = Array.from(document.querySelectorAll('.hint-dot'));
    const enterButton = document.getElementById('btn-entrar');
    const cinematicTransition = document.getElementById('cinematic-transition');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let attempts = 0;
    let autofilled = false;

    function isAccepted(value, acceptedList, compactList) {
      const normalized = normalizeText(value);
      const compacted = normalized.replace(/\s/g, '');
      return acceptedList.includes(normalized) || compactList.includes(compacted);
    }

    function updateHintMeter() {
      hintDots.forEach((dot, index) => {
        dot.classList.toggle('active', index < Math.min(attempts, hintDots.length));
      });
    }

    function pulsePortal() {
      const card = document.querySelector('.portal-card');
      card.classList.remove('shake');
      window.requestAnimationFrame(() => card.classList.add('shake'));
    }

    function createFloatingHeart(content) {
      const heart = document.createElement('span');
      heart.className = 'floating-heart';
      heart.textContent = content || '💕';
      heart.style.left = `${8 + Math.random() * 84}%`;
      heart.style.bottom = '-2rem';
      heart.style.animationDuration = `${3 + Math.random() * 2}s`;
      document.body.appendChild(heart);
      window.setTimeout(() => heart.remove(), 5200);
    }

    function checkEasterEggs() {
      const joined = `${normalizeText(inputNome.value)} ${normalizeText(inputSenha.value)} ${compactText(inputNome.value)} ${compactText(inputSenha.value)}`;
      const egg = easterEggs.find((item) => item.keys.some((key) => joined.includes(normalizeText(key).replace(/\s/g, '')) || joined.includes(normalizeText(key))));
      if (egg) {
        easterMsg.textContent = egg.message;
        monkeyReaction.textContent = egg.reaction;
        createFloatingHeart('💗');
      }
    }

    function autoFillPortal() {
      autofilled = true;
      inputNome.value = 'Maria Fernanda';
      inputSenha.value = 'te amo meu amor';
      inputNome.classList.add('auto-filled');
      inputSenha.classList.add('auto-filled');
      feedbackMsg.textContent = 'Os macaquinhos completaram para você. Agora é só abrir o coração. 💌';
      easterMsg.textContent = 'Preenchimento automático liberado depois de tantas tentativas cheias de amor.';
      monkeyReaction.textContent = '🙈💕';
      enterButton.textContent = 'Entrar no nosso amor 💖';
      createFloatingHeart('💌');
      window.setTimeout(() => {
        inputNome.classList.remove('auto-filled');
        inputSenha.classList.remove('auto-filled');
      }, 1900);
    }

    function unlockPortal() {
      feedbackMsg.textContent = 'Correto! O coração do macaquinho abriu o caminho...';
      monkeyReaction.textContent = '💖';
      easterMsg.textContent = 'Você venceu o portal do amor!';
      successOverlay.classList.add('active');
      successOverlay.setAttribute('aria-hidden', 'false');
      enterButton.disabled = true;
      enterButton.textContent = 'Portal aberto 💕';
      window.dispatchEvent(new CustomEvent('portal:copy-update'));
      for (let i = 0; i < 12; i++) {
        window.setTimeout(() => createFloatingHeart(i % 3 === 0 ? '💖' : '💕'), i * 90);
      }
      cinematicTransition.classList.add('active');
      window.setTimeout(() => {
        successOverlay.classList.remove('active');
        successOverlay.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('portal-locked');
        portal.classList.add('unlocked');
        hero.removeAttribute('aria-hidden');
        hero.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
        window.setTimeout(() => {
          cinematicTransition.classList.remove('active');
          window.dispatchEvent(new CustomEvent('portal:hero-start'));
        }, 500);
      }, 700);
    }

    function tentarEntrar(event) {
      if (event) event.preventDefault();
      const nomeOk = isAccepted(inputNome.value, acceptedNames, acceptedNameKeys);
      const senhaOk = isAccepted(inputSenha.value, acceptedPasswords, acceptedPasswordKeys);

      if (!normalizeText(inputNome.value) || !normalizeText(inputSenha.value)) {
        feedbackMsg.textContent = 'Preencha seu nome e a senha secreta com carinho.';
        monkeyReaction.textContent = '🤔';
        easterMsg.textContent = '';
        pulsePortal();
        return;
      }

      if (nomeOk && senhaOk) {
        unlockPortal();
        return;
      }

      attempts += 1;
      updateHintMeter();
      pulsePortal();
      checkEasterEggs();

      if (nomeOk) {
        feedbackMsg.textContent = `O nome está certo. ${romanticHints[Math.min(attempts - 1, romanticHints.length - 1)]}`;
        if (!easterMsg.textContent) easterMsg.textContent = 'Você está muito perto; falta só a frase secreta.';
      } else if (senhaOk) {
        feedbackMsg.textContent = `A senha está certa, mas o portal ainda quer reconhecer a melhor namorada. ${romanticHints[Math.min(attempts - 1, romanticHints.length - 1)]}`;
        if (!easterMsg.textContent) easterMsg.textContent = 'A chave já brilhou; ajuste o nome com carinho.';
      } else {
        feedbackMsg.textContent = romanticHints[Math.min(attempts - 1, romanticHints.length - 1)];
        if (!easterMsg.textContent) easterMsg.textContent = attempts >= 3 ? 'O portal ignora acentos, espaços extras e pontuação.' : '';
      }

      if (attempts >= 7 && !autofilled) {
        window.setTimeout(autoFillPortal, 420);
      }
    }

    inputNome.addEventListener('input', checkEasterEggs);
    inputSenha.addEventListener('input', checkEasterEggs);
    accessForm.addEventListener('submit', tentarEntrar);
    function createStars() {
      const starsCanvas = document.getElementById('stars-canvas');
      const starCount = 35;
      for (let i = 0; i < starCount; i++) {
        const star = document.createElement('span');
        star.className = 'star';
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.opacity = `${Math.random() * 0.9}`;
        star.style.width = `${1 + Math.random() * 2}px`;
        star.style.height = star.style.width;
        star.style.animationDuration = `${2 + Math.random() * 3}s`;
        starsCanvas.appendChild(star);
      }
    }

    createStars();
}
