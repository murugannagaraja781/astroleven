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
      
      let serviceLabel = '';
      let message = '';
      if (lang === 'ta') {
        switch(service) {
          case 'expert':
            serviceLabel = 'நிபுணத்துவ ஜோதிடர்கள்';
            message = 'வணக்கம் Astro Eleven, நான் "நிபுணத்துவ ஜோதிடர்கள்" சேவைக்கான ஒரு அமர்வை முன்பதிவு செய்ய விரும்புகிறேன்.';
            break;
          case 'personalized':
            serviceLabel = 'தனிப்பயனாக்கப்பட்ட கணிப்புகள்';
            message = 'வணக்கம் Astro Eleven, நான் "தனிப்பயனாக்கப்பட்ட கணிப்புகள்" சேவைக்கான ஒரு அமர்வை முன்பதிவு செய்ய விரும்புகிறேன்.';
            break;
          case 'guidance':
            serviceLabel = 'துல்லியமான வழிகாட்டுதல்';
            message = 'வணக்கம் Astro Eleven, நான் "துல்லியமான வழிகாட்டுதல்" சேவைக்கான ஒரு அமர்வை முன்பதிவு செய்ய விரும்புகிறேன்.';
            break;
          case 'solutions':
            serviceLabel = 'நேர்மறையான தீர்வுகள்';
            message = 'வணக்கம் Astro Eleven, நான் "நேர்மறையான தீர்வுகள்" சேவைக்கான ஒரு அமர்வை முன்பதிவு செய்ய விரும்புகிறேன்.';
            break;
          case 'peace':
            serviceLabel = 'அமைதி, செழிப்பு மற்றும் மகிழ்ச்சி';
            message = 'வணக்கம் Astro Eleven, நான் "அமைதி, செழிப்பு மற்றும் மகிழ்ச்சி" சேவைக்கான ஒரு அமர்வை முன்பதிவு செய்ய விரும்புகிறேன்.';
            break;
          default:
            serviceLabel = 'ஜோதிட ஆலோசனை';
            message = 'வணக்கம் Astro Eleven, நான் ஒரு ஜோதிட ஆலோசனை அமர்வை முன்பதிவு செய்ய விரும்புகிறேன்.';
        }
      } else {
        switch(service) {
          case 'expert':
            serviceLabel = 'Expert Astrologers';
            message = 'Hi Astro Eleven, I would like to book a session for "Expert Astrologers".';
            break;
          case 'personalized':
            serviceLabel = 'Personalized Predictions';
            message = 'Hi Astro Eleven, I would like to book a session for "Personalized Predictions".';
            break;
          case 'guidance':
            serviceLabel = 'Accurate Guidance';
            message = 'Hi Astro Eleven, I would like to book a session for "Accurate Guidance".';
            break;
          case 'solutions':
            serviceLabel = 'Positive Solutions';
            message = 'Hi Astro Eleven, I would like to book a session for "Positive Solutions".';
            break;
          case 'peace':
            serviceLabel = 'Peace, Prosperity, and Happiness';
            message = 'Hi Astro Eleven, I would like to book a session for "Peace, Prosperity, and Happiness".';
            break;
          default:
            serviceLabel = 'Astrology Consultation';
            message = 'Hi Astro Eleven, I would like to book an astrology consultation session.';
        }
      }
      
      const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(message)}`;
      
      const confirmHtml = `
        <div class="booking-confirm-sheet" style="padding: 10px 0;">
          <div style="font-size: 2.2rem; margin-bottom: 12px;">🌟</div>
          <h3 style="font-family: 'Playfair Display', serif; font-size: 1.5rem; color: var(--gold-soft); margin: 0 0 8px 0; font-weight: 800;">
            ${lang === 'ta' ? 'முன்பதிவை உறுதி செய்' : 'Confirm Booking'}
          </h3>
          <p style="font-size: 0.9rem; color: var(--text); line-height: 1.6; margin: 0 0 20px 0;">
            ${lang === 'ta' ? 'எங்களது மூத்த ஜோதிடருடன் நேரடி அமர்வை முன்பதிவு செய்ய விரும்புகிறீர்களா?' : 'You are about to book a premium consultation session with our senior astrologer.'}
          </p>
          <div style="background: rgba(212, 175, 55, 0.05); border: 1.5px dashed rgba(212, 175, 55, 0.4); border-radius: 20px; padding: 16px; margin-bottom: 24px; text-align: left;">
            <strong style="color: var(--orange); display: block; font-size: 0.72rem; font-weight: 800; text-transform: uppercase; margin-bottom: 4px; letter-spacing: 0.05em;">
              ${lang === 'ta' ? 'தேர்ந்தெடுக்கப்பட்ட சேவை' : 'Selected Service'}
            </strong>
            <span style="font-weight: 700; color: var(--text); font-size: 0.95rem;">${serviceLabel}</span>
          </div>
          <button class="popup-btn btn-enter" id="btnConfirmWhatsApp" style="margin-bottom: 12px; border: none; width: 100%;">
            ${lang === 'ta' ? 'வாட்ஸ்அப் மூலம் தொடர்க' : 'Proceed via WhatsApp'}
          </button>
          <button class="popup-btn btn-close" id="btnCancelBooking" style="width: 100%;">
            ${lang === 'ta' ? 'தவிர்' : 'Cancel'}
          </button>
        </div>
      `;
      
      openBottomSheet(confirmHtml);
      
      document.getElementById('btnConfirmWhatsApp').addEventListener('click', function() {
        window.open(whatsappUrl, '_blank');
        closeBottomSheet();
      });
      document.getElementById('btnCancelBooking').addEventListener('click', closeBottomSheet);
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
      const avatarLetters = astrologerName.split(' ').map(n => n[0]).join('');
      
      const confirmHtml = `
        <div class="booking-confirm-sheet" style="padding: 10px 0;">
          <div style="font-size: 2.2rem; margin-bottom: 12px;">🔮</div>
          <h3 style="font-family: 'Playfair Display', serif; font-size: 1.5rem; color: var(--gold-soft); margin: 0 0 8px 0; font-weight: 800;">
            ${lang === 'ta' ? 'ஜோதிட ஆலோசனை' : 'Astrologer Consultation'}
          </h3>
          <p style="font-size: 0.9rem; color: var(--text); line-height: 1.6; margin: 0 0 20px 0;">
            ${lang === 'ta' ? 'தேர்ந்தெடுக்கப்பட்ட பிரீமியம் ஜோதிடருடன் உடனே இணைந்திடுங்கள்.' : 'Connect instantly with your chosen premium astrologer.'}
          </p>
          <div style="background: rgba(212, 175, 55, 0.05); border: 1.5px dashed rgba(212, 175, 55, 0.4); border-radius: 20px; padding: 16px; margin-bottom: 24px; text-align: left; display: flex; align-items: center; gap: 14px;">
            <div style="width: 48px; height: 48px; border-radius: 50%; background: var(--gold-gradient); display: flex; align-items: center; justify-content: center; font-weight: 900; color: white; font-size: 1.1rem; flex-shrink: 0; box-shadow: 0 4px 10px rgba(158, 125, 28, 0.15);">
              ${avatarLetters}
            </div>
            <div>
              <strong style="color: var(--text); display: block; font-size: 1.1rem; font-weight: 800;">${astrologerName}</strong>
              <span style="color: var(--orange); font-weight: 700; font-size: 0.82rem; text-transform: uppercase; letter-spacing: 0.05em;">${actionText}</span>
            </div>
          </div>
          <button class="popup-btn btn-enter" id="btnConfirmWhatsApp" style="margin-bottom: 12px; border: none; width: 100%;">
            ${lang === 'ta' ? 'வாட்ஸ்அப்பில் தொடர்புகொள்' : 'Connect on WhatsApp'}
          </button>
          <button class="popup-btn btn-close" id="btnCancelBooking" style="width: 100%;">
            ${lang === 'ta' ? 'தவிர்' : 'Cancel'}
          </button>
        </div>
      `;
      
      openBottomSheet(confirmHtml);
      
      document.getElementById('btnConfirmWhatsApp').addEventListener('click', function() {
        window.open(whatsappUrl, '_blank');
        closeBottomSheet();
      });
      document.getElementById('btnCancelBooking').addEventListener('click', closeBottomSheet);
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

  // Register PWA Service Worker for offline support
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('sw.js').then((reg) => {
        console.log('Astro Eleven ServiceWorker registered: ', reg.scope);
      }).catch((err) => {
        console.log('Astro Eleven ServiceWorker registration failed: ', err);
      });
    });
  }

  // Helper function to switch active mobile view
  function switchMobileView(viewName) {
    const views = document.querySelectorAll('.app-view');
    views.forEach(v => v.classList.remove('active-view'));
    
    const targetViews = document.querySelectorAll('.app-view-' + viewName);
    targetViews.forEach(v => v.classList.add('active-view'));

    const appTabs = document.querySelectorAll('.app-tab');
    appTabs.forEach(t => t.classList.remove('active'));
    
    const targetHref = viewName === 'home' ? '#' : '#' + viewName;
    const activeTab = document.querySelector(`.bottom-app-bar .app-tab[href="${targetHref}"]`);
    if (activeTab) activeTab.classList.add('active');
    
    // Sync body class for global targeting
    document.body.className = document.body.className.replace(/\bview-active-\S+/g, '');
    document.body.classList.add('view-active-' + viewName);

    // Scroll back to top instantly for clean page switches
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  // Handle mobile bottom navigation tabs active state and view toggles
  const appTabs = document.querySelectorAll('.app-tab');
  appTabs.forEach(tab => {
    tab.addEventListener('click', function(e) {
      if (window.innerWidth <= 720) {
        e.preventDefault();
        const href = this.getAttribute('href');
        const viewName = href === '#' ? 'home' : href.substring(1);
        switchMobileView(viewName);
      }
    });
  });

  // Premium Bottom Sheet Modal Controls
  const bottomSheet = document.getElementById('appBottomSheet');
  const bottomSheetBody = document.getElementById('bottomSheetBody');
  const bottomSheetCloseBtn = document.getElementById('bottomSheetCloseBtn');
  const bottomSheetOverlay = document.getElementById('bottomSheetOverlay');

  function openBottomSheet(htmlContent) {
    if (!bottomSheet || !bottomSheetBody) return;
    bottomSheetBody.innerHTML = htmlContent;
    bottomSheet.style.display = 'flex';
    // Trigger reflow to start CSS transition
    bottomSheet.offsetHeight;
    bottomSheet.classList.add('show');
  }

  function closeBottomSheet() {
    if (!bottomSheet) return;
    bottomSheet.classList.remove('show');
    setTimeout(() => {
      bottomSheet.style.display = 'none';
      if (bottomSheetBody) bottomSheetBody.innerHTML = '';
    }, 380); // Match CSS transition duration
  }

  if (bottomSheetCloseBtn) {
    bottomSheetCloseBtn.addEventListener('click', closeBottomSheet);
  }
  if (bottomSheetOverlay) {
    bottomSheetOverlay.addEventListener('click', closeBottomSheet);
  }

  // Touch gesture handling for dragging down to dismiss the bottom sheet
  let startY = 0;
  let currentY = 0;
  let isDragging = false;
  const sheetContent = document.querySelector('.bottom-sheet-content');

  if (sheetContent) {
    sheetContent.addEventListener('touchstart', (e) => {
      // Only drag down if we are at the top scroll position of the sheet content
      if (sheetContent.scrollTop <= 0) {
        startY = e.touches[0].clientY;
        isDragging = true;
        sheetContent.style.transition = 'none';
      }
    }, { passive: true });

    sheetContent.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      currentY = e.touches[0].clientY;
      const diffY = currentY - startY;
      if (diffY > 0) { // Dragging downwards
        sheetContent.style.transform = `translateY(${diffY}px)`;
      }
    }, { passive: true });

    sheetContent.addEventListener('touchend', (e) => {
      if (!isDragging) return;
      isDragging = false;
      sheetContent.style.transition = '';
      const diffY = currentY - startY;
      if (diffY > 120) { // Dragged far enough down to dismiss
        closeBottomSheet();
      } else {
        sheetContent.style.transform = ''; // Bounce back
      }
      startY = 0;
      currentY = 0;
    });
  }

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

