$(function () {
  const englishSigns = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];
  const tamilSigns = ['மேஷம்', 'ரிஷபம்', 'மிதுனம்', 'கடகம்', 'சிம்மம்', 'கன்னி', 'துலாம்', 'விருச்சிகம்', 'தனுசு', 'மகரம்', 'கும்பம்', 'மீனம்'];
  
  const signContainer = document.getElementById('signs');
  const hourHand = document.getElementById('hourHand');
  const minuteHand = document.getElementById('minuteHand');
  const timeDisplay = document.getElementById('timeDisplay');
  const matchPercent = document.getElementById('matchPercent');
  const matchText = document.getElementById('matchText');
  const hourSign = document.getElementById('hourSign');
  const minuteSign = document.getElementById('minuteSign');

  const btnEn = document.getElementById('btn-en');
  const btnTa = document.getElementById('btn-ta');

  let currentLang = 'en';

  function renderZodiacSigns(lang) {
    if (!signContainer) return;
    signContainer.innerHTML = '';
    const activeSigns = lang === 'ta' ? tamilSigns : englishSigns;
    const zodiacSymbols = ['♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓'];
    
    activeSigns.forEach((label, index) => {
      const element = document.createElement('div');
      element.className = 'sign';
      element.innerHTML = `<span class="sign-sym">${zodiacSymbols[index]}</span><br><span class="sign-name">${label}</span>`;
      const angle = index * 30;
      element.style.transform = `rotate(${angle}deg) translateY(-110px) rotate(-${angle}deg)`;
      signContainer.appendChild(element);
    });
  }

  function setLanguage(lang) {
    currentLang = lang;
    if (lang === 'ta') {
      document.body.classList.remove('lang-en');
      document.body.classList.add('lang-ta');
      if (btnTa) btnTa.classList.add('active');
      if (btnEn) btnEn.classList.remove('active');
    } else {
      document.body.classList.remove('lang-ta');
      document.body.classList.add('lang-en');
      if (btnEn) btnEn.classList.add('active');
      if (btnTa) btnTa.classList.remove('active');
    }
    localStorage.setItem('astro-lang', lang);
    renderZodiacSigns(lang);
    updateClock();
    if (typeof updateTarotLanguage === 'function') {
      updateTarotLanguage(lang);
    }
  }

  if (btnEn && btnTa) {
    btnEn.addEventListener('click', () => setLanguage('en'));
    btnTa.addEventListener('click', () => setLanguage('ta'));
  }

  function updateClock() {
    const now = new Date();
    const hours24 = now.getHours();
    const hours = hours24 % 12;
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    const hourIndex = hours;
    const minuteIndex = Math.floor(minutes / 5);
    const hourAngle = (hours * 30) + (minutes / 60) * 30;
    const minuteAngle = minutes * 6;
    const secondAngle = seconds * 6;

    if (hourHand) hourHand.style.transform = `rotate(${hourAngle}deg)`;
    if (minuteHand) minuteHand.style.transform = `rotate(${minuteAngle}deg)`;

    if (timeDisplay) {
      timeDisplay.textContent = now.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
    }

    const activeSigns = currentLang === 'ta' ? tamilSigns : englishSigns;
    if (hourSign) hourSign.textContent = activeSigns[hourIndex];
    if (minuteSign) minuteSign.textContent = activeSigns[minuteIndex];

    if (signContainer) {
      const signElements = signContainer.querySelectorAll('.sign');
      signElements.forEach((el, index) => {
        el.classList.remove('active-hour', 'active-minute');
        if (index === hourIndex) el.classList.add('active-hour');
        if (index === minuteIndex) el.classList.add('active-minute');
      });
    }

    const matchScore = 74 + ((hourIndex + 1) * 3 + (minuteIndex + 1) * 2 + (seconds % 5)) % 26;
    if (matchPercent) matchPercent.textContent = `${matchScore}%`;
    
    if (matchText) {
      const textTa = matchScore >= 90 
        ? 'தேவலோக நல்இணைப்பு!' 
        : matchScore >= 82 
          ? 'அற்புதமான அண்ட சீரமைப்பு!' 
          : 'அண்டவெளியின் தெய்வீக விதிப்பொறி';
      const textEn = matchScore >= 90 
        ? 'A radiant celestial union' 
        : matchScore >= 82 
          ? 'A glowing cosmic alignment' 
          : 'A gentle destiny spark';
      
      matchText.innerHTML = `<span class="lang-en">${textEn}</span><span class="lang-ta">${textTa}</span>`;
    }
    
    document.body.style.setProperty('--glow-angle', `${secondAngle}deg`);
  }

  function revealOnScroll() {
    const revealElements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealElements.forEach((element) => observer.observe(element));
  }

  // Handle booking buttons
  const bookButtons = document.querySelectorAll('.book-btn');
  bookButtons.forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const service = this.getAttribute('data-service');
      const lang = document.body.classList.contains('lang-ta') ? 'ta' : 'en';
      
      let message = '';
      if (lang === 'ta') {
        switch(service) {
          case 'expert':
            message = 'வணக்கம் Astro Eleven, நான் "நிபுணத்துவ ஜோதிடர்கள்" சேவைக்கான ஒரு அமர்வை முன்பதிவு செய்ய விரும்புகிறேன்.';
            break;
          case 'personalized':
            message = 'வணக்கம் Astro Eleven, நான் "தனிப்பயனாக்கப்பட்ட கணிப்புகள்" சேவைக்கான ஒரு அமர்வை முன்பதிவு செய்ய விரும்புகிறேன்.';
            break;
          case 'guidance':
            message = 'வணக்கம் Astro Eleven, நான் "துல்லியமான வழிகாட்டுதல்" சேவைக்கான ஒரு அமர்வை முன்பதிவு செய்ய விரும்புகிறேன்.';
            break;
          case 'solutions':
            message = 'வணக்கம் Astro Eleven, நான் "நேர்மறையான தீர்வுகள்" சேவைக்கான ஒரு அமர்வை முன்பதிவு செய்ய விரும்புகிறேன்.';
            break;
          case 'peace':
            message = 'வணக்கம் Astro Eleven, நான் "அமைதி, செழிப்பு மற்றும் மகிழ்ச்சி" சேவைக்கான ஒரு அமர்வை முன்பதிவு செய்ய விரும்புகிறேன்.';
            break;
          default:
            message = 'வணக்கம் Astro Eleven, நான் ஒரு ஜோதிட ஆலோசனை அமர்வை முன்பதிவு செய்ய விரும்புகிறேன்.';
        }
      } else {
        switch(service) {
          case 'expert':
            message = 'Hi Astro Eleven, I would like to book a session for "Expert Astrologers".';
            break;
          case 'personalized':
            message = 'Hi Astro Eleven, I would like to book a session for "Personalized Predictions".';
            break;
          case 'guidance':
            message = 'Hi Astro Eleven, I would like to book a session for "Accurate Guidance".';
            break;
          case 'solutions':
            message = 'Hi Astro Eleven, I would like to book a session for "Positive Solutions".';
            break;
          case 'peace':
            message = 'Hi Astro Eleven, I would like to book a session for "Peace, Prosperity, and Happiness".';
            break;
          default:
            message = 'Hi Astro Eleven, I would like to book an astrology consultation session.';
        }
      }
      
      const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
    });
  });

  // Handle live astrologer consultation buttons
  const astroButtons = document.querySelectorAll('.astro-btn');
  astroButtons.forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const astrologerName = this.getAttribute('data-astro');
      const action = this.getAttribute('data-action');
      const lang = document.body.classList.contains('lang-ta') ? 'ta' : 'en';
      
      let actionText = '';
      let message = '';
      
      if (lang === 'ta') {
        switch(action) {
          case 'chat':
            actionText = 'அரட்டை (Chat) சேவை';
            break;
          case 'call':
            actionText = 'அழைப்பு (Call) சேவை';
            break;
          case 'video':
            actionText = 'காணொளி (Video Call) சேவை';
            break;
        }
        message = `வணக்கம் Astro Eleven, நான் ஜோதிடர் "${astrologerName}" அவர்களிடம் ஒரு "${actionText}" அமர்வை முன்பதிவு செய்ய விரும்புகிறேன்.`;
      } else {
        switch(action) {
          case 'chat':
            actionText = 'Chat session';
            break;
          case 'call':
            actionText = 'Voice Call session';
            break;
          case 'video':
            actionText = 'Video Call session';
            break;
        }
        message = `Hi Astro Eleven, I would like to book a "${actionText}" with "${astrologerName}".`;
      }
      
      const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
    });
  });

  // Tarot Card Reader Data
  const tarotData = {
    love: {
      title: { en: 'The Lovers', ta: 'காதலர்கள்' },
      badge: { en: 'Love Reading', ta: 'காதல் பலன்' },
      reading: {
        en: 'A beautiful alignment of energy. Your relationships will experience harmony, mutual understanding, and deep emotional growth today.',
        ta: 'அன்பின் தற்காலிகக் கிரகச் சேர்க்கை உகந்ததாக உள்ளது. உங்கள் உறவுகளில் பரஸ்பர புரிதல், மகிழ்ச்சி மற்றும் நெருக்கம் அதிகரிக்கும்.'
      }
    },
    career: {
      title: { en: 'The Star', ta: 'நட்சத்திரம்' },
      badge: { en: 'Career Reading', ta: 'தொழில் பலன்' },
      reading: {
        en: 'Opportunity is knocking. Hope, inspiration, and a new professional path or recognition are aligned with your career goals today.',
        ta: 'தொழில் அல்லது வியாபாரத்தில் புதிய பாதை திறக்கிறது. உத்தியோக உயர்வு, கிரகங்களின் சாதக நிலை மற்றும் புதிய வாய்ப்புகள் தேடி வரும்.'
      }
    },
    wealth: {
      title: { en: 'Wheel of Fortune', ta: 'விதிச் சக்கரம்' },
      badge: { en: 'Wealth Reading', ta: 'செல்வ பலன்' },
      reading: {
        en: 'Financial abundance is flowing towards you. A turn of luck, positive investments, or unexpected cash inflow is indicated.',
        ta: 'தன வரவு மற்றும் பொருளாதார முன்னேற்றத்திற்கான காலம் கனிந்துள்ளது. அதிர்ஷ்ட காற்று வீசும் மற்றும் எதிர்பாராத பண வரவு உண்டாகும்.'
      }
    }
  };

  let activeCategory = '';

  const tarotCards = document.querySelectorAll('.tarot-card-wrapper');
  const tarotRevealPanel = document.getElementById('tarotRevealPanel');
  const revealBadge = document.getElementById('revealBadge');
  const revealTitle = document.getElementById('revealTitle');
  const revealText = document.getElementById('revealText');
  const tarotCtaBtn = document.getElementById('tarotCtaBtn');

  tarotCards.forEach(wrapper => {
    wrapper.addEventListener('click', function() {
      // Unflip all other cards
      tarotCards.forEach(w => {
        if (w !== wrapper) {
          w.querySelector('.tarot-card').classList.remove('flipped');
        }
      });

      const card = this.querySelector('.tarot-card');
      card.classList.toggle('flipped');

      if (card.classList.contains('flipped')) {
        const category = this.getAttribute('data-category');
        activeCategory = category;
        const data = tarotData[category];
        const lang = document.body.classList.contains('lang-ta') ? 'ta' : 'en';

        // Update content
        if (revealBadge) revealBadge.textContent = data.badge[lang];
        if (revealTitle) revealTitle.textContent = data.title[lang];
        if (revealText) revealText.textContent = data.reading[lang];

        // Reveal panel using dynamic animation
        if (tarotRevealPanel) {
          tarotRevealPanel.style.display = 'block';
          tarotRevealPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      } else {
        if (tarotRevealPanel) {
          tarotRevealPanel.style.display = 'none';
        }
      }
    });
  });

  // Handle Tarot CTA button click routing to WhatsApp
  if (tarotCtaBtn) {
    tarotCtaBtn.addEventListener('click', function(e) {
      e.preventDefault();
      const lang = document.body.classList.contains('lang-ta') ? 'ta' : 'en';
      const categoryLabel = activeCategory ? activeCategory.toUpperCase() : 'General';
      let message = '';

      if (lang === 'ta') {
        message = `வணக்கம் Astro Eleven, நான் டாரோட் அட்டையில் "${categoryLabel}" அட்டையைத் தேர்ந்தெடுத்தேன். அதற்கான முழுமையான 1-on-1 ஆலோசனை பெற ஒரு அமர்வை முன்பதிவு செய்ய விரும்புகிறேன்.`;
      } else {
        message = `Hi Astro Eleven, I flipped the "${categoryLabel}" Tarot card and would like to book a detailed 1-on-1 Tarot consultation session.`;
      }

      const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
    });
  }

  // Update tarot text on language switch if panel is open
  function updateTarotLanguage(lang) {
    if (activeCategory && tarotRevealPanel && tarotRevealPanel.style.display === 'block') {
      const data = tarotData[activeCategory];
      if (revealBadge) revealBadge.textContent = data.badge[lang];
      if (revealTitle) revealTitle.textContent = data.title[lang];
      if (revealText) revealText.textContent = data.reading[lang];
    }
  }

  // Handle mobile bottom navigation tabs active state
  const appTabs = document.querySelectorAll('.app-tab');
  appTabs.forEach(tab => {
    tab.addEventListener('click', function() {
      appTabs.forEach(t => t.classList.remove('active'));
      this.classList.add('active');
    });
  });

  // Handle Ganesha Blessing Popup for new visitors
  const ganeshaPopup = document.getElementById('ganeshaPopup');
  const popupEnterBtn = document.getElementById('popupEnterBtn');
  const popupCloseBtn = document.getElementById('popupCloseBtn');

  if (ganeshaPopup && !localStorage.getItem('ganeshaWelcomeSeen')) {
    ganeshaPopup.style.display = 'flex';
  }

  function dismissGaneshaPopup() {
    if (ganeshaPopup) {
      ganeshaPopup.classList.add('fade-out');
      localStorage.setItem('ganeshaWelcomeSeen', 'true');
      setTimeout(() => {
        ganeshaPopup.style.display = 'none';
      }, 400); // Match CSS fade-out animation
    }
  }

  if (popupEnterBtn) {
    popupEnterBtn.addEventListener('click', dismissGaneshaPopup);
  }
  if (popupCloseBtn) {
    popupCloseBtn.addEventListener('click', dismissGaneshaPopup);
  }

  // Load language from localStorage or default to English
  const savedLang = localStorage.getItem('astro-lang') || 'en';
  setLanguage(savedLang);

  setInterval(updateClock, 1000);
  revealOnScroll();
});

